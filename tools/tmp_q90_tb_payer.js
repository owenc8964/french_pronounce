// Q90：在課本快取找 paie／paye 型兩種寫法的出處頁碼（只讀）
const fs = require('fs'), path = require('path');
const L = fs.readFileSync(path.join(__dirname, '../assets/.textbook_cache.txt'), 'utf8').split('\n');
const pats = [/\b(je|tu|il|elle|on|ils|elles|qui|qu.il)\s+pa(ie|ye)(s|nt)?\b/i, /\bpa(ie|ye)r(ai|as|a|ons|ez|ont|ais|ait)\b/i, /\bappell?er\b.*\bll\b/i];
let page = '';
L.forEach(ln => {
  const m = ln.match(/^===== \[(.+?)\] page (\d+) =====/); if (m) { page = m[1] + ' p.' + m[2]; return; }
  for (const p of pats) { const h = ln.match(p); if (h) console.log(h[0].padEnd(16), page, '|', ln.trim().slice(0, 90)); }
});
