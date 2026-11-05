// Q41：第47、48課 chunks 逐條比對來源（唯讀，不改任何資料檔）
// 用法：node tools/q41_check_l47_48_chunks.js
// 比對：fr 是否一字不差出現在 (a) french_notes.html 該課 <details id="lesson-N"> 區段 (b) 課本快取 Édito B1 p.30–36
// 欄位：序號 課內號 筆記命中 課本頁 fr zh note（筆記命中：exact／loose／-；課本頁 ~ 表示寬鬆比對）
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');

const src = fs.readFileSync(path.join(root, 'chunks.js'), 'utf8');
const CHUNKS = new Function(src.replace(/^\s*const CHUNKS\s*=/m, 'return '))();

const norm = s => String(s)
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#39;|&rsquo;/g, "'")
  .replace(/[’‘]/g, "'").replace(/[  ]/g, ' ')
  .replace(/\s+/g, ' ').toLowerCase();

const html = fs.readFileSync(path.join(root, 'french_notes.html'), 'utf8');
const section = n => {
  const a = html.indexOf(`id="lesson-${n}"`);
  const b = html.indexOf(`id="lesson-${n + 1}"`);
  return html.slice(a, b === -1 ? undefined : b);
};
const notes = { 47: norm(section(47)), 48: norm(section(48)) };

const book = fs.readFileSync(path.join(root, 'assets/.textbook_cache.txt'), 'utf8').split('\n');
const pages = {};
book.forEach((l, i) => { const m = l.match(/^===== \[Edito\.B1\.Owen\.pdf\] page (\d+) =====/); if (m) pages[+m[1]] = i; });
const pageText = {};
for (let p = 30; p <= 36; p++) pageText[p] = norm(book.slice(pages[p], pages[p + 1]).join(' ').replace(/-\s+/g, '-'));

const strip = s => norm(s).replace(/[?.!]\s*$/, '').trim();
const loose = s => norm(s).replace(/\(e\)|\(s\)/g, '').replace(/[?.!…]/g, '').replace(/\s+/g, ' ').trim();

let total = 0, notesMiss = 0, bookMiss = 0;
for (const L of [47, 48]) {
  const list = CHUNKS.filter(c => c.lesson === L);
  list.forEach((c, i) => {
    total++;
    const f = strip(c.fr), fl = loose(c.fr);
    const inN = notes[L].includes(f) ? 'exact' : (notes[L].includes(fl) ? 'loose' : '-');
    const bp = [];
    for (const p in pageText) {
      if (pageText[p].includes(f)) bp.push(p);
      else if (fl.length > 3 && pageText[p].includes(fl)) bp.push(p + '~');
    }
    if (inN === '-') notesMiss++;
    if (!bp.length) bookMiss++;
    console.log([`${L}#${i + 1}`, inN, bp.join(',') || '-', c.fr, c.zh, c.note].join('\t'));
  });
}

const others = {};
CHUNKS.filter(c => c.lesson !== 47 && c.lesson !== 48).forEach(c => { (others[strip(c.fr)] = others[strip(c.fr)] || []).push(c.lesson); });
for (const L of [47, 48]) {
  CHUNKS.filter(c => c.lesson === L).forEach((c, i) => {
    if (others[strip(c.fr)]) console.error(`DUP ${L}#${i + 1} ${c.fr} ← 課 ${others[strip(c.fr)].join(',')}`);
  });
}
const seen = {};
CHUNKS.filter(c => c.lesson === 47 || c.lesson === 48).forEach((c, i) => {
  const k = strip(c.fr);
  if (seen[k]) console.error(`DUP(內部) ${c.lesson} ${c.fr} ← ${seen[k]}`);
  seen[k] = seen[k] || String(c.lesson);
});
console.error(`total=${total} notes_miss=${notesMiss} book_miss=${bookMiss}`);
// 額外欄位檢查：除 fr/zh/note/lesson 之外的 key
const keys = {};
CHUNKS.filter(c => c.lesson === 47 || c.lesson === 48).forEach(c => Object.keys(c).forEach(k => { keys[k] = (keys[k] || 0) + 1; }));
console.error('keys', JSON.stringify(keys));
