// Q45：35 題課本句型題 → 在 assets/.textbook_cache.txt 找原句與頁碼（唯讀）
// 用法：node tools/tmp_q45_textbook_lookup.js [關鍵字...]
const fs = require('fs');
const path = require('path');
const txt = fs.readFileSync(path.join(__dirname, '..', 'assets', '.textbook_cache.txt'), 'utf8');
const lines = txt.split('\n');
// 建頁索引
const pageOf = [];
let cur = '?';
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/^===== \[(.+?)\] page (\d+) =====/);
  if (m) cur = m[1].replace(/ Owen| \.pdf|\.pdf/g, '') + ' pdf' + m[2];
  pageOf[i] = cur;
}
const norm = s => s.toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, ' ');
// 模式 --page 書名片段:pdf頁 …：列出該 pdf 頁裡像印刷頁碼的行（純數字／「I 125」／「cent…」／Leçon）
if (process.argv[2] === '--page') {
  for (const spec of process.argv.slice(3)) {
    const [book, pg] = spec.split(':');
    console.log('\n######## ' + spec);
    for (let i = 0; i < lines.length; i++) {
      if (pageOf[i].includes(book) && pageOf[i].endsWith(' pdf' + pg)) {
        const t = lines[i].trim();
        if (/^\d{1,3}$/.test(t) || /\bI ?\d{1,3}$/.test(t) || /^\d{1,3} ?I/.test(t) || /cent|Leçon|leçon|Unité|unité|LEÇON/.test(t)) console.log('   L' + (i + 1) + ': ' + t.slice(0, 100));
      }
    }
  }
  process.exit(0);
}
const keys = process.argv.slice(2);
for (const k of keys) {
  const nk = norm(k);
  console.log('\n######## ' + k);
  let n = 0;
  for (let i = 0; i < lines.length; i++) {
    if (norm(lines[i]).includes(nk)) {
      n++;
      if (n > 6) { continue; }
      // 找印刷頁碼：該 pdf 頁內獨立一行的數字
      console.log('--- [' + pageOf[i] + '] L' + (i + 1));
      for (let j = Math.max(0, i - 2); j <= Math.min(lines.length - 1, i + 2); j++) console.log('   ' + lines[j]);
    }
  }
  console.log('  (共 ' + n + ' 筆)');
}
