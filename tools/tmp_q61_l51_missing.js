// Q61 唯讀掃描：第 51 課筆記（french_notes.html 第 18763–19155 行）裡，
// phrase-list 的 <span class="fr"> 與含 class="m" 的表格列，哪些在 chunks.js 沒有一字不差的 fr。
// 用法：node tools/tmp_q61_l51_missing.js
const fs = require('fs');
const path = require('path');
const R = path.join(__dirname, '..');
const L = fs.readFileSync(path.join(R, 'french_notes.html'), 'utf8').split('\n');
const C = fs.readFileSync(path.join(R, 'chunks.js'), 'utf8');
const frs = new Set([...C.matchAll(/"fr": "((?:[^"\\]|\\.)*)"/g)].map(m => m[1].replace(/\\"/g, '"')));
const strip = s => s.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();
for (let i = 18762; i < 19156; i++) {
  const l = L[i];
  for (const m of l.matchAll(/<span class="fr">(.*?)<\/span>(?:<span class="zh">(.*?)<\/span>)?(?:<span class="note">(.*?)<\/span>)?/g)) {
    const fr = strip(m[1]);
    if (!frs.has(fr)) console.log('LI', i + 1, '|', fr, '|', strip(m[2] || ''), '|', strip(m[3] || '').slice(0, 90));
  }
  if (/<tr>/.test(l) && /class="m"/.test(l)) {
    const cells = [...l.matchAll(/<td[^>]*>(.*?)<\/td>/g)].map(x => strip(x[1]));
    const miss = cells.filter((c, k) => /class="m"/.test((l.match(/<td[^>]*>/g) || [])[k] || '') && !frs.has(c));
    if (miss.length) console.log('TR', i + 1, '|', cells.join(' ｜ ').slice(0, 170), '|| 缺:', miss.join(' / '));
  }
}
