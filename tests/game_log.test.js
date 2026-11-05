/* game_log.js：遊玩時間、跨午夜、連勝（含夏令時間）、題目回報 */
'use strict';
process.env.TZ = 'America/Toronto';   /* Owen 在加拿大；夏令時間的 bug 只有在有 DST 的時區才看得到 */
const test = require('node:test');
const assert = require('node:assert/strict');
const { makeBrowser } = require('./helpers/browser');

const local = (y, mo, d, h, mi) => new Date(y, mo - 1, d, h, mi || 0).getTime();
function boot(now, storage) {
  const b = makeBrowser({ now, storage });
  b.load('game_log.js');
  return b;
}
const times = (b) => JSON.parse(b.win.localStorage.getItem('clb7_game_time') || '[]');
/* 每 5 秒跑一次 interval，同時模擬「有在操作」 */
function play(b, sec) { for (let s = 0; s < sec; s += 5) { b.clock.now += 5000; b.win.GameLog.ping(); b.runIntervals(); } }

test('有操作的時間才算；閒置超過 90 秒不算', () => {
  const b = boot(local(2026, 11, 5, 15));
  b.win.GameLog.start('town');
  play(b, 60);
  b.clock.now += 300000; b.runIntervals();   /* 閒置 5 分鐘 */
  b.win.GameLog.flush();
  const a = times(b);
  assert.equal(a.length, 1);
  assert.equal(a[0].sec, 60);
  assert.equal(a[0].src, 'town');
});

test('開了就走（< 20 秒、沒作答）不留紀錄；同一次遊玩重複 flush 不會變多筆', () => {
  const b = boot(local(2026, 11, 5, 15));
  b.win.GameLog.start('town'); play(b, 10); b.win.GameLog.flush();
  assert.equal(times(b).length, 0);
  play(b, 30); b.win.GameLog.flush(); b.win.GameLog.flush();
  assert.equal(times(b).length, 1);
});

test('⭐ 跨過午夜：切成兩筆、不會無限遞迴（修正前 stack overflow）', () => {
  const b = boot(local(2026, 11, 5, 23, 59));
  b.win.GameLog.start('town');
  b.win.GameLog.answer(true, { topic: 't', kind: 'k', ref: 'q1', ms: 900 });
  play(b, 120);   /* 跨過 00:00 */
  assert.doesNotThrow(() => b.win.GameLog.flush());
  play(b, 60); b.win.GameLog.flush();
  const a = times(b);
  assert.equal(a.length, 2);
  assert.deepEqual(a.map((e) => e.d), ['2026-11-05', '2026-11-06']);
  assert.equal(a[0].n, 1);
  assert.ok(a[1].sec >= 55, '午夜後還在玩的時間記在新的一天');
});

test('作答統計：對錯、題型、錯題、跳過不計分', () => {
  const b = boot(local(2026, 11, 5, 15));
  const G = b.win.GameLog;
  G.start('town');
  G.answer(true, { topic: 'pc', kind: 'mcq', ref: 7, ms: 1200.6 });
  G.answer(false, { topic: 'pc', kind: 'mcq', ref: 7, q: 'Q', a: 'A', pick: 'B' });
  G.answer(null, { kind: 'mcq', ref: 8 });
  G.flush();
  const e = times(b)[0];
  assert.equal(e.n, 2); assert.equal(e.ok, 1); assert.equal(e.skip, 1);
  assert.deepEqual(e.top.pc, [1, 1]);
  assert.deepEqual(e.it['7'], [1, 1, 0]);
  assert.equal(e.miss.length, 1);
  assert.deepEqual(e.sk, [{ kind: 'mcq', ref: '8' }]);
});

function dayLog(days, sec) { return JSON.stringify(days.map((d, i) => ({ ts: i + 1, d, sec }))); }

test('連勝：連續達標天數；今天還沒達標不算斷', () => {
  const b = boot(local(2026, 11, 5, 15), { clb7_game_time: dayLog(['2026-11-02', '2026-11-03', '2026-11-04'], 900) });
  const s = b.win.GameLog.streak();
  assert.equal(s.days, 3); assert.equal(s.done, false); assert.equal(s.need, 900);
});

test('連勝：7 天內漏 1 天自動用休息卡，漏 2 天才斷', () => {
  let b = boot(local(2026, 11, 5, 15), { clb7_game_time: dayLog(['2026-11-01', '2026-11-02', '2026-11-04', '2026-11-05'], 900) });
  assert.equal(b.win.GameLog.streak().days, 4);
  b = boot(local(2026, 11, 5, 15), { clb7_game_time: dayLog(['2026-11-01', '2026-11-04', '2026-11-05'], 900) });
  assert.equal(b.win.GameLog.streak().days, 2);
});

test('⭐ 連勝跨夏令時間開始日（23 小時那天）不跳過日期', () => {
  /* 2027-03-14 加拿大開始夏令時間；凌晨 00:30 往回推 24 小時會直接跳到 03-13 */
  const b = boot(local(2027, 3, 15, 0, 30), { clb7_game_time: dayLog(['2027-03-12', '2027-03-13', '2027-03-14', '2027-03-15'], 900) });
  assert.equal(b.win.GameLog.streak().days, 4);
});

test('每日目標：預設 15 分鐘、可設定', () => {
  const b = boot(local(2026, 11, 5, 15));
  assert.equal(b.win.GameLog.goalMin(), 15);
  b.win.GameLog.setGoal(25);
  assert.equal(b.win.GameLog.goalMin(), 25);
  assert.equal(b.win.GameLog.streak().need, 1500);
});

test('題目回報：存進 clb7_game_reports 並截斷過長內容；esc 會跳脫 HTML', () => {
  const b = boot(local(2026, 11, 5, 15));
  b.win.GameLog.report({ src: 'town', kind: 'mcq', ref: 3, q: 'x'.repeat(500) }, 'why');
  const r = JSON.parse(b.win.localStorage.getItem('clb7_game_reports'))[0];
  assert.equal(r.q.length, 300); assert.equal(r.d, '2026-11-05'); assert.equal(r.why, 'why');
  assert.equal(b.win.GameLog.esc('<a href="x">&</a>'), '&lt;a href=&quot;x&quot;&gt;&amp;&lt;/a&gt;');
});
