// Q30：第46課 chunks 逐條比對來源（唯讀，不改任何資料檔）
// 用法：node tools/q30_check_l46_chunks.js <notes_diff.txt>
//   notes_diff.txt = `git show 834e1b8 -- french_notes.html` 的輸出（取 + 行當第46課筆記內容）
// 比對：fr 是否一字不差出現在 (a) 第46課筆記新增內容 (b) 課本快取 Édito B1 p.22–29
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');

const src = fs.readFileSync(path.join(root, 'chunks.js'), 'utf8');
const CHUNKS = new Function(src.replace(/^\s*const CHUNKS\s*=/m, 'return ') )();
const L46 = CHUNKS.filter(c => c.lesson === 46);

const norm = s => s
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#39;|&rsquo;/g, "'")
  .replace(/[’‘]/g, "'").replace(/[  ]/g, ' ')
  .replace(/\s+/g, ' ').toLowerCase();

const diffPath = process.argv[2];
const notesAdded = fs.readFileSync(diffPath, 'utf8').split('\n')
  .filter(l => l.startsWith('+') && !l.startsWith('+++')).map(l => l.slice(1)).join('\n');
const notesN = norm(notesAdded);

const book = fs.readFileSync(path.join(root, 'assets/.textbook_cache.txt'), 'utf8').split('\n');
// 找 Édito B1 各頁起點
const pages = {};
book.forEach((l, i) => { const m = l.match(/^===== \[Edito\.B1\.Owen\.pdf\] page (\d+) =====/); if (m) pages[+m[1]] = i; });
const pageText = {};
for (let p = 22; p <= 29; p++) pageText[p] = norm(book.slice(pages[p], pages[p + 1]).join(' ').replace(/-\s+/g, '-'));

// 去掉 (e)、括號附註，做寬鬆比對
const loose = s => norm(s).replace(/\(e\)|\(s\)/g, '').replace(/[?.!]/g, '').trim();

const rows = L46.map((c, i) => {
  const f = norm(c.fr).replace(/[?.!]\s*$/, '').trim();
  const fl = loose(c.fr);
  const inNotes = notesN.includes(f) ? 'exact' : (notesN.includes(fl) ? 'loose' : '-');
  const bookPages = [];
  for (const p in pageText) {
    if (pageText[p].includes(f)) bookPages.push(p);
    else if (fl.length > 3 && pageText[p].includes(fl)) bookPages.push(p + '~');
  }
  return { n: i + 1, fr: c.fr, zh: c.zh, note: c.note, inNotes, book: bookPages.join(',') || '-' };
});

for (const r of rows) console.log([r.n, r.inNotes, r.book, r.fr, r.zh, r.note].join('\t'));
// 跨課重複（同一 fr 早已出現在別課）
const others = {};
CHUNKS.filter(c => c.lesson !== 46).forEach(c => { const k = norm(c.fr).replace(/[?.!]\s*$/, '').trim(); (others[k] = others[k] || []).push(c.lesson); });
const dups = L46.map((c, i) => [i + 1, c.fr, others[norm(c.fr).replace(/[?.!]\s*$/, '').trim()]]).filter(x => x[2]);
for (const d of dups) console.error(`DUP #${d[0]} ${d[1]} ← 課 ${d[2].join(',')}`);
console.error(`total=${rows.length} notes_miss=${rows.filter(r => r.inNotes === '-').length} book_miss=${rows.filter(r => r.book === '-').length}`);
