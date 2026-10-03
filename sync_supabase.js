/* ============================================================
   sync_supabase.js — 跨裝置同步（Supabase REST，免 SDK）
   ------------------------------------------------------------
   開頁自動從雲端拉下來合併；本地 clb7_* 一有變動 2.5 秒內自動上傳；
   離開／切走頁面再上傳一次。多裝置共用同一個 ROOM。
   合併規則：陣列去重（用 ts/id/week）、per-key 物件取 last 較新、
   game 數值取大、日期字串取較新——時數不會重複計，各裝置進度都保留。
   ============================================================ */
(function () {
  'use strict';
  var URL  = 'https://hgkqyrglftljxaieberm.supabase.co';
  var KEY  = 'sb_publishable_lPnh46F2Z2wj6qVs5nn56g_RwRpUO8_';
  var ROOM = 'owen-clb7-k9f3a72q';               // 所有裝置用同一個房間鑰匙
  if (URL.indexOf('<') >= 0 || !KEY) return;      // 沒設定就停用，不影響現況

  var H = { apikey: KEY, Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json' };

  function collect() {
    var d = {};
    for (var i = 0; i < localStorage.length; i++) {
      var k = localStorage.key(i);
      if (k && k.indexOf('clb7_') === 0 && k !== 'clb7_session') {
        var raw = localStorage.getItem(k);
        if (TOMB[k]) { var o = sp(raw); if (Array.isArray(o)) raw = JSON.stringify(scrub(k, o)); }   /* 送上雲端前濾掉 */
        d[k] = raw;
      }
    }
    return d;
  }
  function sp(s) { try { return JSON.parse(s); } catch (e) { return s; } }

  /* ── 刪除名單（tombstone，2026-09-13）──────────────────────────
     ⚠️ 為什麼不能直接刪雲端：陣列合併是「各裝置取聯集」，
       只要任何一台裝置的 localStorage 還留著那筆，下次同步就會被加回去。
     ⭐ 所以要刪的紀錄登記在這裡：讀進來、存本地、送上雲端三個關口都濾掉，
       每台裝置下次開頁就自動清乾淨。
     登記內容：clb7_tracker 裡 10 筆「剛好 180 分鐘」的紀錄——
       session_timer.js 關分頁／手機鎖屏後閒置偵測沒在跑，
       下次開頁直接把 3 小時上限整筆記進去（共 30h，佔網站內計時 77%）。
       Owen 09-13：「全刪」。根因已在 session_timer.js 同日修掉。 */
  var TOMB = {
    clb7_tracker: [1783351876339, 1783409815595, 1783740270609, 1784041627314, 1784267710435,
                   1784709941922, 1785386865893, 1786328851922, 1787757994275, 1789197823511]
  };
  function scrub(k, v) {
    var t = TOMB[k];
    if (!t || !Array.isArray(v)) return v;
    return v.filter(function (e) { return !(e && e.ts != null && t.indexOf(e.ts) >= 0); });
  }

  /* 主線進度：章取大；同一章節點取大；done／cleared 聯集（每節點 true 優先於 'skip'） */
  function mergeStory(a, b) {
    var o = Object.assign({}, a, b);
    var ca = a.ch || 1, cb = b.ch || 1;
    o.ch = Math.max(ca, cb);
    o.node = ca === cb ? Math.max(a.node || 0, b.node || 0) : (ca > cb ? (a.node || 0) : (b.node || 0));
    o.done = {};
    [a.done || {}, b.done || {}].forEach(function (d) {
      Object.keys(d).forEach(function (chId) {
        var t = o.done[chId] = o.done[chId] || {};
        Object.keys(d[chId] || {}).forEach(function (i) { if (t[i] !== true) t[i] = d[chId][i]; });
      });
    });
    o.cleared = Object.assign({}, a.cleared || {}, b.cleared || {});
    o.skipped = Math.max(a.skipped || 0, b.skipped || 0);
    return o;
  }

  function merge(local, inc) {
    if (Array.isArray(local) && Array.isArray(inc)) {
      var seen = {}, out = [];
      var id = function (e) {
        return e && e.ts != null ? 't' + e.ts
             : e && e.id != null && e.date != null ? e.id + '|' + e.date
             : e && e.week != null ? 'w' + e.week
             : JSON.stringify(e);
      };
      local.concat(inc).forEach(function (e) { var k = id(e); if (!seen[k]) { seen[k] = 1; out.push(e); } });
      return out;
    }
    if (local && inc && typeof local === 'object' && typeof inc === 'object') {
      if ('xp' in local || 'streak' in local) {
        /* ⭐ 2026-10-03 修（Owen：「主線打贏的那關沒有過、又跳到今日地城」）：
           原本一律「雲端蓋本機」——打完還沒上傳完就換頁／iPad 重新載入，拉回來的舊雲端把主線進度與分頁蓋掉。
           現在：兩邊有存檔時間 _t（quest.html 的 save() 會寫）就以「比較新的那份」為底；
           主線進度只會往前（章、節點取大、完成紀錄聯集），⛔ 永遠不倒退。 */
        var newer = (local._t || 0) > (inc._t || 0) ? local : inc;
        var older = newer === local ? inc : local;
        var out0 = Object.assign({}, older, newer, {
          xp: Math.max(local.xp || 0, inc.xp || 0),
          streak: Math.max(local.streak || 0, inc.streak || 0),
          lastDate: (String(inc.lastDate || '') > String(local.lastDate || '')) ? inc.lastDate : local.lastDate
        });
        if (local.story && inc.story) out0.story = mergeStory(local.story, inc.story);
        return out0;
      }
      var out = Object.assign({}, local);
      Object.keys(inc).forEach(function (k) {
        var a = out[k], b = inc[k];
        if (a == null) out[k] = b;
        else if (a && b && typeof a === 'object' && typeof b === 'object') out[k] = (b.last || 0) >= (a.last || 0) ? b : a;
        else out[k] = b;
      });
      return out;
    }
    if (typeof local === 'string' && typeof inc === 'string') return inc > local ? inc : local;
    return inc != null ? inc : local;
  }

  function apply(rm) {
    if (!rm) return;
    Object.keys(rm).forEach(function (k) {
      var inc = scrub(k, sp(rm[k])), ls = localStorage.getItem(k);   /* 從雲端讀進來時濾掉 */
      if (ls == null) { _si.call(localStorage, k, typeof inc === 'string' ? inc : JSON.stringify(inc)); return; }
      var o = scrub(k, merge(sp(ls), inc));
      _si.call(localStorage, k, typeof o === 'string' ? o : JSON.stringify(o));
    });
  }

  function pull() {
    return fetch(URL + '/rest/v1/clb7_sync?id=eq.' + ROOM + '&select=payload', { headers: H })
      .then(function (r) { return r.ok ? r.json() : []; })
      .then(function (x) { if (x[0] && x[0].payload) apply(x[0].payload); })
      .catch(function () {});
  }
  function push() {
    return fetch(URL + '/rest/v1/clb7_sync', {
      method: 'POST',
      headers: Object.assign({}, H, { Prefer: 'resolution=merge-duplicates' }),
      body: JSON.stringify({ id: ROOM, payload: collect(), updated_at: new Date().toISOString() })
    }).catch(function () {});
  }

  var t = null;
  // 縮短到 700ms：完成一步立刻就有機會推上雲端，減少「還沒推完就被切走/背景」丟失的機率
  function sched() { clearTimeout(t); t = setTimeout(push, 700); }

  // hook setItem：本地 clb7_* 一變就排程上傳（apply 用原生 _si，避免遞迴）
  var _si = localStorage.setItem;
  localStorage.setItem = function (k, v) {
    _si.apply(localStorage, arguments);
    if (String(k).indexOf('clb7_') === 0) sched();
  };

  window.ClbSync = { pull: pull, push: push };

  // 開頁先把本地已登記刪除的紀錄清掉；有清到就排程上傳，讓雲端也跟著乾淨
  Object.keys(TOMB).forEach(function (k) {
    var raw = localStorage.getItem(k); if (raw == null) return;
    var o = sp(raw); if (!Array.isArray(o)) return;
    var c = scrub(k, o);
    if (c.length !== o.length) { _si.call(localStorage, k, JSON.stringify(c)); sched(); }
  });

  pull();                                                   // 開頁先拉遠端合併
  window.addEventListener('pagehide', push);
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) push();
    else pull();  // 切回這個分頁／裝置時，重新拉一次，抓另一台裝置剛做的進度
  });
})();
