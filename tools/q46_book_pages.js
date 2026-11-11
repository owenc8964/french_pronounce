// Q46（11-11 排程）：從 assets/.textbook_cache.txt 印出 Édito B1 課本指定頁（只取第一次出現），供人工核對。唯讀。
// 用法：node tools/q46_book_pages.js 13,15,20 [書名關鍵字，預設 Edito.B1.Owen.pdf]
const fs = require('fs'), path = require('path');
const txt = fs.readFileSync(path.join(__dirname, '..', 'assets/.textbook_cache.txt'), 'utf8').split('\n');
const pages = process.argv[2].split(',').map(Number), book = process.argv[3] || 'Edito.B1.Owen.pdf';
const seen = new Set(); let cur = null;
for (const line of txt) {
  const m = line.match(/^===== \[(.*)\] page (\d+) =====$/);
  if (m) { cur = (m[1] === book && pages.includes(+m[2]) && !seen.has(+m[2])) ? +m[2] : null; if (cur) { seen.add(cur); console.log(line); } continue; }
  if (cur) console.log(line);
}
