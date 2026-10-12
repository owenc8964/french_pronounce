/* pwa.js — 加到主畫面（PWA）共用的小腳本（2026-10-12）
   ① 註冊離線小程式 sw.js
   ② ⭐ 主畫面模式下沒有瀏覽器的「上一頁」——有些練習頁沒有回去的連結，進去就出不來。
      所以只在主畫面模式、而且有上一頁可回時，左下角放一顆小小的「←」。
      （放左下：右下是快速筆記鈕、右上是計時器，不跟它們打架；用 safe-area 避開 iPad／iPhone 的圓角與底部橫條） */
(function () {
  'use strict';
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
  }
  var standalone = (window.navigator.standalone === true) ||
    (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches);
  if (!standalone) return;
  function addBack() {
    if (history.length < 2 || document.getElementById('pwaBack')) return;
    var b = document.createElement('button');
    b.id = 'pwaBack'; b.type = 'button'; b.setAttribute('aria-label', '上一頁'); b.textContent = '←';
    b.style.cssText = 'position:fixed;left:calc(12px + env(safe-area-inset-left));bottom:calc(14px + env(safe-area-inset-bottom));' +
      'z-index:2147483000;width:40px;height:40px;border-radius:50%;border:1px solid rgba(255,255,255,.18);' +
      'background:rgba(20,24,34,.72);color:#f3dc9a;font-size:18px;line-height:1;cursor:pointer;' +
      '-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);box-shadow:0 2px 10px rgba(0,0,0,.35);';
    b.addEventListener('click', function () { history.back(); });
    document.body.appendChild(b);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addBack); else addBack();
})();
