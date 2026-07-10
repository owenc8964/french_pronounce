/* ============================================================
   session_timer.js — 跨頁「精神時光屋」連續計時器
   ------------------------------------------------------------
   一次訓練 = 一個 session。從 dashboard 按「開始今日學習」啟動，
   時間以 timestamp 累計，跨頁（quiz / review / reading / writing /
   verb_sprint）持續計時；各練習頁右上角常駐 pill（時間＋暫停＋結算）。
   回 dashboard 按「🏁 結束並記錄」→ 寫入 clb7_tracker 一筆（type:'session'）
   → 自動計入 700h 進度。

   為什麼用 timestamp 而非 setInterval 累加：
   換頁時 JS 會重載，setInterval 會歸零。用 startedAt 時間戳，
   換頁後 elapsed = accSec + (now - startedAt) 依然連續正確。

   資料結構 clb7_session:
     { active:true, running:true, startedAt:<ms>, accSec:<已累計秒> }
   ============================================================ */
(function () {
  'use strict';
  var SKEY = 'clb7_session';
  var TKEY = 'clb7_tracker';
  var MAX_STRETCH_MS = 3 * 3600 * 1000; // 單次不間斷最多算 3 小時，防忘記結算整夜暴衝

  function load() { try { return JSON.parse(localStorage.getItem(SKEY)) || null; } catch (e) { return null; } }
  function save(s) { try { localStorage.setItem(SKEY, JSON.stringify(s)); } catch (e) {} }
  function now() { return Date.now(); }
  function zhDate() { return new Date().toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' }); }

  var API = {
    get: function () { return load(); },
    isActive: function () { var s = load(); return !!(s && s.active); },
    running: function () { var s = load(); return !!(s && s.running); },

    start: function () {
      // 防呆：session 已經在跑（例如另一個分頁/視窗已經開始了）就不要洗掉已累計的時間
      var s = load();
      if (s && s.active) { if (!s.running) { s.startedAt = now(); s.running = true; save(s); } return; }
      save({ active: true, running: true, startedAt: now(), accSec: 0 });
    },

    // 目前 session 累計秒數（含正在跑的那段）；同時做防暴衝夾限
    elapsedSec: function () {
      var s = load();
      if (!s || !s.active) return 0;
      if (s.running) {
        var stretch = now() - s.startedAt;
        if (stretch > MAX_STRETCH_MS) {
          // 超過單段上限：把上限那段收進 accSec 並自動暫停
          s.accSec += MAX_STRETCH_MS / 1000;
          s.running = false;
          save(s);
          return Math.floor(s.accSec);
        }
        return Math.floor(s.accSec + stretch / 1000);
      }
      return Math.floor(s.accSec);
    },

    pause: function () {
      var s = load();
      if (!s || !s.running) return;
      s.accSec += (now() - s.startedAt) / 1000;
      s.running = false;
      save(s);
    },

    resume: function () {
      var s = load();
      if (!s || s.running) return;
      s.startedAt = now();
      s.running = true;
      save(s);
    },

    toggle: function () {
      var s = load();
      if (!s) return;
      if (s.running) this.pause(); else this.resume();
    },

    // 結束 session → 寫入 tracker 一筆；回傳 {sec, recorded}
    finish: function () {
      var sec = this.elapsedSec();
      try { localStorage.removeItem(SKEY); } catch (e) {}
      if (sec < 60) return { sec: sec, recorded: false };
      var data;
      try { data = JSON.parse(localStorage.getItem(TKEY)) || []; } catch (e) { data = []; }
      data.push({ ts: now(), date: zhDate(), type: 'session', sec: Math.round(sec) });
      try { localStorage.setItem(TKEY, JSON.stringify(data)); } catch (e) {}
      return { sec: Math.round(sec), recorded: true };
    },

    // 放棄目前 session（不記錄）
    discard: function () { try { localStorage.removeItem(SKEY); } catch (e) {} },

    // 暫停到「指定的時間點」而非「現在」——用來把閒置那段時間排除在計時之外
    pauseAtTime: function (stopAt) {
      var s = load();
      if (!s || !s.running) return;
      var clamped = Math.max(s.startedAt, Math.min(stopAt, now()));
      s.accSec += (clamped - s.startedAt) / 1000;
      s.running = false;
      save(s);
    }
  };

  window.ClbSession = API;

  // ── 閒置自動暫停（不管 dashboard 還是練習頁都適用）──────────
  // 之前「打開頁面就自動計時」會導致：開著頁面完全沒操作，時間照時鐘一直跑，
  // 最多跑到 3 小時上限才停（Owen 真的遇到「計時跑了三小時但完全沒操作」）。
  // 現在改成：超過 IDLE_LIMIT_MS 沒有任何操作，自動暫停，且用「最後操作時間」
  // 當停止點，正確排除閒置那段，不會把發呆/沒碰的時間也算進去。
  var IDLE_LIMIT_MS = 3 * 60 * 1000; // 3 分鐘沒操作視為閒置
  var lastActivity = now();
  ['keydown', 'pointerdown', 'touchstart', 'scroll', 'click', 'mousemove'].forEach(function (ev) {
    document.addEventListener(ev, function () { lastActivity = now(); }, { passive: true });
  });
  // ⚠️ 2026-07-11 修復：閒置偵測只能認自己這個分頁的操作。如果 Owen 開了第二個分頁
  // （例如另一頁練習頁忘記關），那個背景分頁的 lastActivity 早就過期，它的閒置計時器
  // 還是每5秒繼續跑，會把「剛在別的分頁按繼續」的 session 又立刻暫停回去
  // （症狀：按繼續、3秒後又停住）。修法：分頁切到背景時完全不檢查；切回前景時
  // 把 lastActivity 重置成現在，不要把「切走的這段時間」也當成閒置。
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) lastActivity = now();
  });
  setInterval(function () {
    if (document.hidden) return;
    if (API.running() && (now() - lastActivity > IDLE_LIMIT_MS)) {
      API.pauseAtTime(lastActivity);
    }
  }, 5000);

  function fmt(sec) {
    var h = String(Math.floor(sec / 3600)).padStart(2, '0');
    var m = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
    var s = String(Math.floor(sec % 60)).padStart(2, '0');
    return h + ':' + m + ':' + s;
  }

  // ── dashboard 自己有 session bar，不注入 pill ──
  var isDash = /dashboard\.html/i.test(location.pathname) ||
               /dashboard\.html/i.test(location.href.split('?')[0].split('#')[0]);
  if (isDash) return;

  // ── 練習頁：session active 時右上角常駐 pill ──
  function ensurePill() {
    if (!API.isActive()) return;
    if (document.getElementById('clbSessPill')) return;
    var pill = document.createElement('div');
    pill.id = 'clbSessPill';
    pill.style.cssText =
      'position:fixed;top:8px;right:8px;z-index:99999;' +
      'background:#12351f;color:#7fe0a0;border:1px solid #2c6b45;' +
      'border-radius:22px;padding:7px 12px;' +
      'font:700 14px/1 ui-monospace,Menlo,Consolas,monospace;' +
      'display:flex;gap:10px;align-items:center;' +
      'box-shadow:0 3px 12px rgba(0,0,0,.4);user-select:none;';
    pill.innerHTML =
      '<span id="clbSessTime" title="本次訓練累計時間">00:00:00</span>' +
      '<button id="clbSessPause" title="暫停／繼續計時" ' +
      'style="background:none;border:none;color:#7fe0a0;font-size:15px;cursor:pointer;padding:0 2px;line-height:1;">⏸</button>' +
      '<a href="dashboard.html" title="回指揮中心結算" ' +
      'style="color:#fff;text-decoration:none;font-size:13px;font-weight:700;' +
      'border-left:1px solid #2c6b45;padding-left:10px;">🏁</a>';
    document.body.appendChild(pill);
    document.getElementById('clbSessPause').addEventListener('click', function () {
      API.toggle();
      refresh();
    });
  }

  function refresh() {
    var el = document.getElementById('clbSessTime');
    if (!el) return;
    el.textContent = fmt(API.elapsedSec());
    var b = document.getElementById('clbSessPause');
    var run = API.running();
    if (b) b.textContent = run ? '⏸' : '▶';
    var pill = document.getElementById('clbSessPill');
    if (pill) pill.style.opacity = run ? '1' : '0.55';
  }

  function boot() {
    // 不管是不是從 dashboard「開始今日學習」進來，只要打開任何練習頁就自動起算，
    // 避免「直接點進某個練習」時完全沒被計時（之前只有從 dashboard 按鈕進來才會計時）
    if (!API.isActive()) API.start();
    ensurePill();
    refresh();
    setInterval(function () { ensurePill(); refresh(); }, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
