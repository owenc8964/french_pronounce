/* sync_supabase.js 的合併規則——這支壞掉就是 Owen 的雲端資料壞掉（測試鐵律那兩次事故），所以測最多 */
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { makeBrowser } = require('./helpers/browser');

function boot(storage, payload) {
  const b = makeBrowser({
    storage,
    fetch: () => Promise.resolve({ ok: true, json: () => Promise.resolve(payload ? [{ payload }] : []) }),
  });
  b.load('sync_supabase.js');
  return b;
}
const J = (x) => JSON.stringify(x);
const get = (b, k) => JSON.parse(b.win.localStorage.getItem(k));
/* vm 裡建出來的物件原型跟這邊不同，比對前先轉成一般物件 */
const plain = (x) => JSON.parse(JSON.stringify(x));
const flush = () => new Promise((r) => setImmediate(r));

test('ROOM 是正式值（測試鐵律：commit 前不可留 TEST 值）', () => {
  const src = require('fs').readFileSync(require('path').join(__dirname, '..', 'sync_supabase.js'), 'utf8');
  assert.match(src, /var ROOM = 'owen-clb7-k9f3a72q'/);
  assert.doesNotMatch(src, /TEST-DO-NOT-USE/);
});

test('陣列：用 ts／id+date／week 去重取聯集，兩邊的進度都留下', () => {
  const { _merge } = boot().win.ClbSync;
  const out = _merge([{ ts: 1, a: 'L' }, { id: 'q1', date: 'd1' }, { week: 3 }],
                     [{ ts: 1, a: 'R' }, { ts: 2 }, { id: 'q1', date: 'd1' }, { id: 'q1', date: 'd2' }, { week: 3 }, 'x']);
  assert.deepEqual(plain(out), [{ ts: 1, a: 'L' }, { id: 'q1', date: 'd1' }, { week: 3 }, { ts: 2 }, { id: 'q1', date: 'd2' }, 'x']);
});

test('per-key 物件：每格取 last 較新的；只有一邊有的格子保留', () => {
  const { _merge } = boot().win.ClbSync;
  const out = _merge({ a: { n: 1, last: 10 }, b: { n: 5, last: 50 }, onlyL: { last: 1 } },
                     { a: { n: 2, last: 20 }, b: { n: 4, last: 40 }, onlyR: { last: 2 } });
  assert.deepEqual(plain(out), { a: { n: 2, last: 20 }, b: { n: 5, last: 50 }, onlyL: { last: 1 }, onlyR: { last: 2 } });
});

test('單筆紀錄自己帶 last（clb7_game_goal）：整筆取較新的，⛔ 不被舊裝置蓋回去', () => {
  const { _merge } = boot().win.ClbSync;
  assert.deepEqual(plain(_merge({ min: 20, last: 200 }, { min: 15, last: 100 })), { min: 20, last: 200 });
  assert.deepEqual(plain(_merge({ min: 20, last: 100 }, { min: 30, last: 300 })), { min: 30, last: 300 });
});

test('遊戲存檔：xp／streak 取大、lastDate 取新、以 _t 較新的那份為底', () => {
  const { _merge } = boot().win.ClbSync;
  const out = _merge({ xp: 100, streak: 2, lastDate: '2026-11-04', mode: 'train', _t: 5 },
                     { xp: 80, streak: 3, lastDate: '2026-11-05', mode: 'story', _t: 9 });
  assert.equal(out.xp, 100);
  assert.equal(out.streak, 3);
  assert.equal(out.lastDate, '2026-11-05');
  assert.equal(out.mode, 'story');
});

test('主線進度永遠不倒退：章取大、同章節點取大、完成紀錄 true 優先於 skip', () => {
  const { _merge } = boot().win.ClbSync;
  const local = { xp: 1, _t: 9, story: { ch: 2, node: 1, done: { c1: { 0: true, 1: 'skip' } }, cleared: { a: 1 }, skipped: 1 } };
  const inc = { xp: 1, _t: 1, story: { ch: 1, node: 7, done: { c1: { 0: 'skip', 1: true, 2: true } }, cleared: { b: 1 }, skipped: 3 } };
  const s = _merge(local, inc).story;
  assert.equal(s.ch, 2);
  assert.equal(s.node, 1, '章不同時，節點跟著章比較大的那份');
  assert.deepEqual(plain(s.done), { c1: { 0: true, 1: true, 2: true } });
  assert.deepEqual(plain(s.cleared), { a: 1, b: 1 });
  assert.equal(s.skipped, 3);
  const same = _merge({ xp: 0, story: { ch: 3, node: 4 } }, { xp: 0, story: { ch: 3, node: 2 } }).story;
  assert.equal(same.node, 4);
});

test('字串取較新（日期）；型別不同時以雲端為準、雲端沒有就保留本地', () => {
  const { _merge } = boot().win.ClbSync;
  assert.equal(_merge('2026-11-04', '2026-11-05'), '2026-11-05');
  assert.equal(_merge('2026-11-05', '2026-11-04'), '2026-11-05');
  assert.equal(_merge(3, 5), 5);
  assert.equal(_merge(3, null), 3);
});

test('刪除名單：tracker 那 10 筆 180 分鐘紀錄在開頁、拉雲端時都被濾掉', async () => {
  const bad = 1783351876339;
  const b = boot({ clb7_tracker: J([{ ts: bad, sec: 10800 }, { ts: 1, sec: 60 }]) },
                 { clb7_tracker: J([{ ts: bad, sec: 10800 }, { ts: 2, sec: 120 }]), clb7_new: J({ x: { last: 1 } }) });
  await flush(); await flush();
  assert.deepEqual(get(b, 'clb7_tracker').map((e) => e.ts), [1, 2]);
  assert.deepEqual(get(b, 'clb7_new'), { x: { last: 1 } });
});

test('上傳內容：只送 clb7_*、不送 clb7_session，tombstone 也不會送上去', () => {
  const b = boot({ clb7_a: '1', other: 'no', clb7_session: J({ active: true }), clb7_tracker: J([{ ts: 1783351876339 }, { ts: 7 }]) });
  b.win.ClbSync.push();
  const body = JSON.parse(b.fetchCalls.find((c) => c.init && c.init.method === 'POST').init.body);
  assert.deepEqual(Object.keys(body.payload).sort(), ['clb7_a', 'clb7_tracker']);
  assert.deepEqual(JSON.parse(body.payload.clb7_tracker), [{ ts: 7 }]);
  assert.equal(body.id, 'owen-clb7-k9f3a72q');
});

test('雲端回傳壞資料或網路錯誤時不丟例外、本地不變', async () => {
  for (const f of [() => Promise.reject(new Error('offline')),
                   () => Promise.resolve({ ok: false, json: () => Promise.resolve({}) }),
                   () => Promise.resolve({ ok: true, json: () => Promise.resolve({ message: 'err' }) })]) {
    const b = makeBrowser({ storage: { clb7_a: J([1]) }, fetch: f });
    b.load('sync_supabase.js');
    await flush(); await flush();
    assert.equal(b.win.localStorage.getItem('clb7_a'), J([1]));
  }
});

test('本地 clb7_* 一改就排程上傳；非 clb7_ 的 key 不排程', () => {
  const b = boot();
  const before = b.timers.filter((t) => t.kind === 'timeout').length;
  b.win.localStorage.setItem('foo', '1');
  assert.equal(b.timers.filter((t) => t.kind === 'timeout').length, before);
  b.win.localStorage.setItem('clb7_x', '1');
  assert.equal(b.timers.filter((t) => t.kind === 'timeout').length, before + 1);
});
