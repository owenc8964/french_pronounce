/* ============================================================
   return_to.js — 從遊戲點進練習頁，做完要能回遊戲（2026-09-14）
   ------------------------------------------------------------
   ⚠️ Owen：「遊戲頁面進去 sprint de verbs 玩完沒辦法跳回去 只能回 dashboard」
   練習頁（verb_sprint／quiz／review）的「回指揮中心」全部寫死連 dashboard.html，
   其中 quiz.html 還有完成時才用 innerHTML 動態產生的連結。

   ⭐ 做法：
     · quest.html 訓練場的連結帶 `from=quest`，進來時記進 sessionStorage
       （quiz 的 guided 流程會換頁，只看網址參數會掉）
     · 有記號時：頁面上所有連 dashboard.html 的連結改標成「回訓練場」，
       點下去實際回 quest.html（用 capture 攔截，動態產生的連結也吃得到）
     · ⛔ 不動計時器的 🏁 結算鈕（#clbSessPill 裡的）——結算要在 dashboard 做
     · quest.html 一載入就清掉記號，所以之後從 dashboard 進練習頁不受影響
   ============================================================ */
(function () {
  'use strict';
  var KEY = 'clb7_return';
  var TAB_KEY = 'clb7_return_tab';
  try {
    var qs = new URLSearchParams(location.search);
    if (qs.get('from') === 'quest') {
      sessionStorage.setItem(KEY, 'quest');
      sessionStorage.setItem(TAB_KEY, qs.get('tab') || 'train');
    }
  } catch (e) {}
  /* ⚠️ 返回網址要直接帶分頁：遊戲記住的分頁（clb7_quest.mode）換頁時會被雲端上較舊的值蓋回去，
     09-14 實測回來落在「主線」而不是「訓練場」。 */
  var tab = 'train';
  try { tab = sessionStorage.getItem(TAB_KEY) || 'train'; } catch (e) {}
  var TARGET = 'quest.html?tab=' + encodeURIComponent(tab);
  var on = false;
  try { on = sessionStorage.getItem(KEY) === 'quest'; } catch (e) {}
  if (!on) return;

  function isDashLink(a) {
    if (!a || a.tagName !== 'A') return false;
    if (a.closest && a.closest('#clbSessPill')) return false;           // 計時器結算鈕不動
    var h = a.getAttribute('href') || '';
    return h === 'dashboard.html' || h.indexOf('dashboard.html?') === 0 || h.indexOf('dashboard.html#') === 0;
  }
  function relabel(root) {
    var links = (root.querySelectorAll ? root.querySelectorAll('a') : []);
    Array.prototype.forEach.call(links, function (a) {
      if (!isDashLink(a) || a.dataset.retq) return;
      a.dataset.retq = '1';
      a.setAttribute('href', TARGET);
      var t = a.textContent;
      if (/Retour au tableau de bord/.test(t)) a.textContent = '← 回訓練場';
      else if (/指揮中心|今日/.test(t)) a.textContent = t.replace(/回?指揮中心|回今日[^\s，。]*/, '回訓練場');
    });
  }
  // 點擊一律攔下來導回遊戲（連 relabel 還沒掃到的動態連結也吃得到）
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a') : null;
    if (a && (isDashLink(a) || a.dataset.retq)) { e.preventDefault(); location.href = TARGET; }
  }, true);

  function boot() {
    relabel(document);
    if (window.MutationObserver) {
      new MutationObserver(function (ms) {
        ms.forEach(function (m) { Array.prototype.forEach.call(m.addedNodes, function (n) { if (n.nodeType === 1) relabel(n.parentNode || n); }); });
      }).observe(document.body, { childList: true, subtree: true });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
