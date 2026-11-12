/* sw.js — 加到主畫面（PWA）用的離線小程式（2026-10-12）
   Owen：「先做加到主畫面那種，主力會是 iPad，iPhone 偶爾」
   ⭐ 策略：一律先拿網路上最新的（network-first），拿不到（沒網路）才用上次存的那份。
     ⛔ 不用 cache-first：Owen 常常推更新，cache-first 會讓他一直看到舊版。
   ⛔ 只碰同一個網站的 GET：Supabase（同步、題目、登入）等外部請求一律不攔、不存。
   ⛔ 音檔／影片不存（檔案大、而且是分段請求，存了會壞）。
   改了這支檔案要把 CACHE 的版本號加一，舊的存檔才會被清掉。 */
var CACHE = 'clb7-v2';   /* 11-13 v2：清掉 iPad 存著的舊模考頁 */

self.addEventListener('install', function (e) {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function (c) {
    return c.addAll(['./quest.html', './manifest.webmanifest', './assets/app/icon-192.png']);
  }).catch(function () {}));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  var r = e.request;
  if (r.method !== 'GET') return;
  var u = new URL(r.url);
  if (u.origin !== self.location.origin) return;
  if (r.destination === 'audio' || r.destination === 'video' || r.headers.has('range')) return;
  /* ⛔ 11-13 模考頁（Mac mini 7799）不存：Owen 回報「聽力卡住沒聲音、前進後退暫停都不能用、沒看到新功能」——
     iPad 連不到 Mac mini 時拿到的是存著的舊頁面，音檔又沒存，整頁看起來正常卻不能用。連不到就讓它直接顯示連不到。 */
  if (/^\/(mock\.html|assets\/tcf\/|assets\/didier\/|api\/)/.test(u.pathname)) return;
  e.respondWith(fetch(r).then(function (res) {
    if (res.status === 200 && res.type === 'basic') {
      var copy = res.clone();
      caches.open(CACHE).then(function (c) { c.put(r, copy); });
    }
    return res;
  }).catch(function () {
    return caches.match(r, { ignoreSearch: true }).then(function (m) {
      return m || (r.mode === 'navigate' ? caches.match('./quest.html') : undefined);
    });
  }));
});
