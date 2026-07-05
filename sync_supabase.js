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
      if (k && k.indexOf('clb7_') === 0 && k !== 'clb7_session') d[k] = localStorage.getItem(k);
    }
    return d;
  }
  function sp(s) { try { return JSON.parse(s); } catch (e) { return s; } }

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
        return Object.assign({}, local, inc, {
          xp: Math.max(local.xp || 0, inc.xp || 0),
          streak: Math.max(local.streak || 0, inc.streak || 0),
          lastDate: (String(inc.lastDate || '') > String(local.lastDate || '')) ? inc.lastDate : local.lastDate
        });
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
      var inc = sp(rm[k]), ls = localStorage.getItem(k);
      if (ls == null) { _si.call(localStorage, k, rm[k]); return; }
      var o = merge(sp(ls), inc);
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
  function sched() { clearTimeout(t); t = setTimeout(push, 2500); }

  // hook setItem：本地 clb7_* 一變就排程上傳（apply 用原生 _si，避免遞迴）
  var _si = localStorage.setItem;
  localStorage.setItem = function (k, v) {
    _si.apply(localStorage, arguments);
    if (String(k).indexOf('clb7_') === 0) sched();
  };

  window.ClbSync = { pull: pull, push: push };

  pull();                                                   // 開頁先拉遠端合併
  window.addEventListener('pagehide', push);
  document.addEventListener('visibilitychange', function () { if (document.hidden) push(); });
})();
