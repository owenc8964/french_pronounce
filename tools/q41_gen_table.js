// Q41：產生第47、48課逐條判定總表，附加到報告末尾（唯讀 chunks.js／french_notes.html／課本快取）
// 用法：node tools/q41_gen_table.js
// 判定與人工出處寫在下面的 VERDICT／SRC；其餘由機器比對課本頁碼。重跑會覆蓋舊的總表。
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const REPORT = path.join(root, 'research/2026-11-05_第47-48課chunks核對.md');
const MARK = '\n---\n\n## 附：145 條逐條總表\n';

const CHUNKS = new Function(fs.readFileSync(path.join(root, 'chunks.js'), 'utf8').replace(/^\s*const CHUNKS\s*=/m, 'return '))();
const norm = s => String(s).replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
  .replace(/[’‘]/g, "'").replace(/[  ]/g, ' ').replace(/\s+/g, ' ').toLowerCase();
const strip = s => norm(s).replace(/[?.!]\s*$/, '').trim();

const lines = fs.readFileSync(path.join(root, 'french_notes.html'), 'utf8').split('\n');
const startOf = n => lines.findIndex(l => l.includes(`id="lesson-${n}"`));
const range = { 47: [startOf(47), startOf(48)], 48: [startOf(48), lines.length] };
const noteLine = (L, fr) => {
  const f = strip(fr);
  for (let i = range[L][0]; i < range[L][1]; i++) if (norm(lines[i]).includes(f)) return i + 1;
  return null;
};

const book = fs.readFileSync(path.join(root, 'assets/.textbook_cache.txt'), 'utf8').split('\n');
const pages = {};
book.forEach((l, i) => { const m = l.match(/^===== \[Edito\.B1\.Owen\.pdf\] page (\d+) =====/); if (m) pages[+m[1]] = i; });
const pageText = {};
for (let p = 30; p <= 36; p++) pageText[p] = norm(book.slice(pages[p], pages[p + 1]).join(' '));
const bookPages = fr => { const f = strip(fr); return Object.keys(pageText).filter(p => pageText[p].includes(f)); };

const BAD = new Set(['47#42', '47#75', '47#76', '47#77', '47#78', '47#79', '47#80']);
const WARN = new Set(['47#22', '47#31', '48#10', '48#16', '48#23', '48#27']);

const T = '不在課本；🎙 課堂（逐字稿未查證）';
const SRC = {
  '47#1': T + '。詞組 avertir d\'un retard 見 p.30 行 51679',
  '47#5': T + '。詞組見 p.30 行 51697–51699',
  '47#6': T + '。faire partie de 見 p.30 行 51697',
  '47#22': 'p.30 行 51690（課本有括號）',
  '47#24': 'p.30 行 51684（標題複數 incivilités）',
  '47#25': '不在課本；課堂內容（筆記）',
  '47#26': '不在課本；課堂內容（筆記）',
  '47#29': 'p.30 行 51678–51679（跨欄斷行）',
  '47#31': 'p.30 行 51677–51678（rentrer/entrer，跨欄斷行）',
  '47#35': 'p.30 行 51697–51699（跨欄斷行）',
  '47#40': '不在課本的詞條；課堂內容（p.30 有 La conscience citoyenne）',
  '47#42': 'p.30 行 51724',
  '47#57': 'p.31 標語 OCR 黏字 行 51863',
  '47#58': 'p.31 標語 OCR 黏字 行 51866',
  '47#59': 'p.31 行 51895（un prince charmant，冠詞不同）',
  '47#66': 'p.32 行 52000–52001（nos commerces de quartier）',
  '47#67': 'p.32 行 51998–51999；p.36 行 52554 (re)créer du lien',
  '47#72': '不在課本的詞組；p.32 行 52032 只有 le personnel',
  '47#75': 'p.34 行 52293–52294（開頭與後半分欄）',
  '47#76': 'p.34 行 52293–52295（開頭與後半分欄）',
  '47#77': 'p.34 行 52293–52295（開頭與後半分欄）',
  '47#78': 'p.34 行 52297–52298（開頭與後半分欄）',
  '47#79': 'p.34 行 52297–52300（開頭與後半分欄）',
  '47#80': 'p.34 行 52297–52300（開頭與後半分欄）',
  '48#28': T + '。prendre soin de 見 p.35 行 52430–52432',
  '48#34': '課堂內容；une réunion des voisins 見 p.34 行 52317',
  '48#35': '不在課本；課堂內容（機器命中 p.30 是 environnement，假命中）',
  '48#44': '🗣 課堂口說 p.34 練習 6 行 52317；開頭句型 行 52293',
  '48#45': '🗣 課堂口說 p.34 練習 6 行 52317；開頭句型 行 52293',
  '48#46': '🗣 課堂口說 p.34 練習 6 行 52317；開頭句型 行 52301',
  '48#54': 'p.35 行 52415；p.36 行 52567',
  '48#57': 'p.35 行 52418、52445（réservé aux entrepreneurs）',
  '48#61': 'p.35 行 52424；p.36 行 52566',
  '48#62': 'p.35 行 52424–52425（des soirées dédicaces，跨行）',
  '48#65': 'p.35 行 52430（thèmes clés，單複數不同）',
};

let out = MARK + '\n判定：✓ 合格／✗ 有錯／⚠️ 要注意。「筆記行」是 `french_notes.html` 第一次出現的行號，機器比對全部命中。「課本」的頁碼是機器比對，帶行號的是人工核對。\n';
let counts = { ok: 0, bad: 0, warn: 0 };
for (const L of [47, 48]) {
  out += `\n### 第 ${L} 課\n\n| # | fr | zh | 判定 | 筆記行 | 課本／出處 |\n|---|---|---|---|---|---|\n`;
  CHUNKS.filter(c => c.lesson === L).forEach((c, i) => {
    const k = `${L}#${i + 1}`;
    const v = BAD.has(k) ? '✗' : WARN.has(k) ? '⚠️' : '✓';
    counts[BAD.has(k) ? 'bad' : WARN.has(k) ? 'warn' : 'ok']++;
    const n = noteLine(L, c.fr);
    if (!n) throw new Error('筆記找不到 ' + k + ' ' + c.fr);
    const bp = bookPages(c.fr);
    const s = SRC[k] || (bp.length ? 'p.' + bp.join('、p.') : T);
    const esc = x => String(x).replace(/\|/g, '｜');
    out += `| ${k} | ${esc(c.fr)} | ${esc(c.zh)} | ${v} | ${n} | ${esc(s)} |\n`;
  });
}
let rpt = fs.readFileSync(REPORT, 'utf8');
const at = rpt.indexOf(MARK);
if (at >= 0) rpt = rpt.slice(0, at);
fs.writeFileSync(REPORT, rpt.replace(/\s*$/, '\n') + out);
console.log(JSON.stringify(counts));
