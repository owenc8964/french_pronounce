/* ============================================================
   game_log.js — 小鎮（town.html）＋守園（tower.html）共用紀錄層（2026-10-17）
   ------------------------------------------------------------
   Owen 10-17 的兩個建議：
     b. 題目回報鍵：題目有錯直接按，原因可填可不填 → clb7_game_reports
     c. 遊戲時間＋學習分析：每次玩多久、答了什麼、錯在哪 → clb7_game_time
   ⭐ 兩個都是 clb7_* 陣列（每筆有 ts）→ sync_supabase.js 用 ts 去重合併，Claude 每週讀雲端分析。
   ⚠️ 測試前照測試鐵律把 sync_supabase.js 的 ROOM 改成 TEST 值。

   時間怎麼算：只算「真的在玩」——頁面看得到、且 90 秒內有操作（按、打字、拖曳）。
   守園嵌在小鎮裡（tower.html?embed=1）時，守園直接用小鎮的 GameLog（parent.GameLog），
   ⛔ 不另開一筆，免得同一段時間算兩次。

   clb7_game_time 每筆＝一次遊玩：
     { ts:開始時間, src:'town'|'tower', d:'YYYY-MM-DD', sec:有效秒數, n:作答數, ok:答對, skip:跳過,
       top:{ topic:[對,錯] }, kind:{ 題型:[對,錯] }, miss:[ {q,a,pick,topic,kind} ]（最多 30 筆）, end:最後更新 }
   clb7_game_reports 每筆＝一次回報：
     { ts, d, src, kind, ref, q, a, pick, why }
   ============================================================ */
(function () {
  'use strict';
  var IDLE = 90000, TICK = 5000;
  function rd(k) { try { var v = JSON.parse(localStorage.getItem(k)); return Array.isArray(v) ? v : []; } catch (e) { return []; } }
  function wr(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function day() { var d = new Date(); return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  var cur = null, lastAct = 0, lastTick = 0, dirty = false;

  function start(src) {
    cur = { ts: Date.now(), src: src, d: day(), sec: 0, n: 0, ok: 0, skip: 0, top: {}, kind: {}, miss: [], end: Date.now() };
    lastAct = lastTick = Date.now();
  }
  function ping() { lastAct = Date.now(); }
  function tick() {
    if (!cur) return;
    var now = Date.now();
    if (!document.hidden && now - lastAct < IDLE) cur.sec += Math.round((now - lastTick) / 1000);
    lastTick = now;
    if (cur.d !== day()) { flush(); start(cur.src); }   /* 跨過午夜就切成新的一筆，每天的時間才對得上 */
  }
  /* ok：true 答對／false 答錯／null 跳過。m：{ topic, kind, q, a, pick, src } */
  function answer(ok, m) {
    if (!cur) return; m = m || {}; ping();
    if (ok === null) { cur.skip++; dirty = true; return; }
    cur.n++; if (ok) cur.ok++;
    var t = m.topic || '?', k = m.kind || '?';
    (cur.top[t] = cur.top[t] || [0, 0])[ok ? 0 : 1]++;
    (cur.kind[k] = cur.kind[k] || [0, 0])[ok ? 0 : 1]++;
    if (!ok && cur.miss.length < 30) cur.miss.push({ q: String(m.q || '').slice(0, 160), a: String(m.a || '').slice(0, 80), pick: String(m.pick == null ? '' : m.pick).slice(0, 80), topic: t, kind: k, src: m.src || cur.src });
    dirty = true;
  }
  function flush() {
    if (!cur) return; tick();
    if (cur.sec < 20 && !cur.n) return;   /* 開了就走、沒玩 → 不記 */
    cur.end = Date.now();
    var a = rd('clb7_game_time'), i = -1;
    for (var j = a.length - 1; j >= 0; j--) if (a[j] && a[j].ts === cur.ts) { i = j; break; }
    var copy = JSON.parse(JSON.stringify(cur));
    if (i >= 0) a[i] = copy; else a.push(copy);
    wr('clb7_game_time', a.slice(-400)); dirty = false;
  }

  /* ---------- 🚩 題目回報 ---------- */
  var CTX = {}, seq = 0;
  /* ctx：{ src, kind, ref, q, a, pick }。回傳一顆按鈕的 HTML，放進作答後的回饋區 */
  function repBtn(ctx) {
    var id = 'r' + (++seq); CTX[id] = ctx;
    return '<button type="button" class="gl-rep" data-glrep="' + id + '">🚩 題目有問題</button>';
  }
  function report(ctx, why) {
    var a = rd('clb7_game_reports');
    a.push({ ts: Date.now(), d: day(), src: ctx.src || (cur && cur.src) || '?', kind: ctx.kind || '', ref: ctx.ref == null ? '' : ctx.ref,
             q: String(ctx.q || '').slice(0, 300), a: String(ctx.a || '').slice(0, 120), pick: String(ctx.pick == null ? '' : ctx.pick).slice(0, 120), why: String(why || '').slice(0, 300) });
    wr('clb7_game_reports', a.slice(-300));
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-glrep]');
    if (b) {
      e.stopPropagation(); e.preventDefault();
      var id = b.dataset.glrep;
      var box = document.createElement('div'); box.className = 'gl-repbox';
      box.innerHTML = '<input type="text" class="gl-why" maxlength="300" placeholder="哪裡怪？（可不填）" autocomplete="off">' +
        '<button type="button" class="gl-send">送出</button><button type="button" class="gl-no">算了</button>';
      b.replaceWith(box);
      var inp = box.querySelector('.gl-why'); setTimeout(function () { try { inp.focus(); } catch (er) {} }, 30);
      function send() { report(CTX[id] || {}, inp.value.trim()); box.innerHTML = '<span class="gl-done">已記下，我之後會檢查這題</span>'; }
      box.querySelector('.gl-send').onclick = function (ev) { ev.stopPropagation(); send(); };
      box.querySelector('.gl-no').onclick = function (ev) { ev.stopPropagation(); box.innerHTML = ''; };
      inp.addEventListener('keydown', function (ev) { ev.stopPropagation(); if (ev.key === 'Enter') send(); });
      return;
    }
  }, true);

  /* 樣式：兩頁共用，自己帶（灰、小，⛔ 不搶答題的視線） */
  var st = document.createElement('style');
  st.textContent = '.gl-rep{background:none;border:none;color:#9aa39c;font-size:.78em;padding:4px 0;margin-top:6px;cursor:pointer;text-decoration:underline;font-family:inherit}' +
    '.gl-repbox{display:flex;gap:6px;margin-top:6px;align-items:center;flex-wrap:wrap}' +
    '.gl-why{flex:1;min-width:140px;padding:6px 8px;border-radius:8px;border:1px solid rgba(255,255,255,.25);background:rgba(0,0,0,.25);color:inherit;font-size:16px;font-family:inherit}' +
    '.gl-send,.gl-no{padding:5px 10px;border-radius:8px;border:1px solid rgba(255,255,255,.25);background:rgba(255,255,255,.08);color:inherit;font-size:.82em;font-family:inherit}' +
    '.gl-done{color:#9aa39c;font-size:.82em}';
  (document.head || document.documentElement).appendChild(st);

  ['pointerdown', 'keydown', 'touchstart'].forEach(function (ev) { window.addEventListener(ev, ping, { passive: true, capture: true }); });
  setInterval(function () { tick(); if (dirty) flush(); }, TICK);
  window.addEventListener('pagehide', flush);
  document.addEventListener('visibilitychange', function () { if (document.hidden) flush(); else { lastTick = Date.now(); ping(); } });

  window.GameLog = { start: start, ping: ping, answer: answer, flush: flush, repBtn: repBtn, report: report, esc: esc };
})();
