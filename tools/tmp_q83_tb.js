// Q83：在課本快取找 -ger/-cer 等拼字例外的出處頁碼（只讀）
const fs = require('fs'), path = require('path');
const L = fs.readFileSync(path.join(__dirname, '../assets/.textbook_cache.txt'), 'utf8').split('\n');
const pats = [/nous voyageons/i, /commençons/i, /je mangeais/i, /nous mangeons/i, /mangions/i, /\b-ger\b/i, /\b-cer\b/i, /j.appellerai/i, /enverr/i, /reçoiv/i, /paierai|payerai/i, /achèterai/i];
let page = '';
const seen = new Set();
L.forEach((ln, i) => {
  const m = ln.match(/^===== \[(.+?)\] page (\d+) =====/); if (m) { page = m[1] + ' p.' + m[2]; return; }
  for (const p of pats) if (p.test(ln)) { const k = p + page; if (seen.has(k)) continue; seen.add(k); console.log(String(p).padEnd(22), page, '|', ln.trim().slice(0, 90)); }
});
