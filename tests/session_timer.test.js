/* session_timer.js：700 小時的計時——不能把閒置／忘記關的時間算進去（09-13 那 10 筆 180 分鐘） */
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { makeBrowser } = require('./helpers/browser');

const MIN = 60000;
function boot(storage) {
  const b = makeBrowser({ pathname: '/dashboard.html', storage });   /* dashboard 不注入 pill，只測計時本身 */
  b.load('session_timer.js');
  return { b, S: b.win.ClbSession };
}
const tracker = (b) => JSON.parse(b.win.localStorage.getItem('clb7_tracker') || '[]');

test('正常計時、暫停、繼續', () => {
  const { b, S } = boot();
  S.start(); b.clock.now += 2 * MIN;
  assert.equal(S.elapsedSec(), 120);
  S.pause(); b.clock.now += 10 * MIN;
  assert.equal(S.elapsedSec(), 120);
  S.resume(); b.clock.now += MIN;
  assert.equal(S.elapsedSec(), 180);
});

test('start() 在已經跑的 session 上不會洗掉累計時間', () => {
  const { b, S } = boot();
  S.start(); b.clock.now += 2 * MIN; S.start();
  assert.equal(S.elapsedSec(), 120);
});

test('關分頁後很久才回來：只算到最後一次操作', () => {
  const { b, S } = boot();
  S.start();
  b.clock.now += 2 * MIN;
  const s = S.get(); s.lastAct = b.clock.now; b.win.localStorage.setItem('clb7_session', JSON.stringify(s));
  b.clock.now += 5 * 3600 * 1000;
  assert.equal(S.elapsedSec(), 120);
  assert.equal(S.running(), false);
});

test('⭐ 閒置後直接按暫停，也只算到最後一次操作（修正前會把閒置算進去）', () => {
  const { b, S } = boot();
  S.start(); b.clock.now += MIN;
  const s = S.get(); s.lastAct = b.clock.now; b.win.localStorage.setItem('clb7_session', JSON.stringify(s));
  b.clock.now += 60 * MIN;
  S.pause();
  assert.equal(S.elapsedSec(), 60);
});

test('單段最多 3 小時', () => {
  const { b, S } = boot();
  S.start();
  for (let i = 0; i < 40; i++) {   /* 一直有操作，連續 4 小時以上 */
    b.clock.now += 7 * MIN;
    const s = S.get(); if (!s.running) break; s.lastAct = b.clock.now; b.win.localStorage.setItem('clb7_session', JSON.stringify(s));
  }
  assert.equal(S.elapsedSec(), 3 * 3600);
});

test('結算：滿 60 秒寫一筆 tracker（type:session），不滿不記；結算後 session 清掉', () => {
  let { b, S } = boot();
  S.start(); b.clock.now += 30000;
  assert.deepEqual(JSON.parse(JSON.stringify(S.finish())), { sec: 30, recorded: false });
  assert.equal(tracker(b).length, 0);
  S.start(); b.clock.now += 2 * MIN;
  const r = S.finish();
  assert.equal(r.recorded, true);
  const t = tracker(b);
  assert.equal(t.length, 1); assert.equal(t[0].type, 'session'); assert.equal(t[0].sec, 120);
  assert.equal(S.isActive(), false);
});

test('tracker 是壞 JSON 時結算不會丟例外', () => {
  const { b, S } = boot({ clb7_tracker: '{oops' });
  S.start(); b.clock.now += 2 * MIN;
  assert.equal(S.finish().recorded, true);
  assert.equal(tracker(b).length, 1);
});

test('閒置偵測：前景頁 3 分鐘沒操作自動暫停在最後操作那刻', () => {
  const { b, S } = boot();
  S.start();
  b.clock.now += 30000; b.document.dispatch('pointerdown');
  b.clock.now += 4 * MIN; b.runIntervals();
  assert.equal(S.running(), false);
  assert.equal(S.elapsedSec(), 30);
});
