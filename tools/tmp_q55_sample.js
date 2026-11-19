// Q55 字典屋 Lucas 詞庫抽查（唯讀）：固定種子 20261119，分兩層各抽 35 字
// 層 A＝只來自 xlsx（ff530ab，高階詞彙，例句＝真題原句）
// 層 B＝含網站詞庫（0bbd2f3，core/tcf/reading，搭配＋Lucas 例句）
// 用法：node tools/tmp_q55_sample.js [--full]
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const D = JSON.parse(fs.readFileSync(path.join(ROOT, 'assets/tcf/exam/vocab/lucas_words.json'), 'utf8'));
function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const rnd = mulberry32(20261119);
const W = D.words.slice().sort((a, b) => a.key < b.key ? -1 : 1);
const A = W.filter(w => w.banks.length === 1 && w.banks[0] === 'xlsx');
const B = W.filter(w => w.banks.some(b => b !== 'xlsx'));
function pick(arr, n) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a.slice(0, n); }
const sA = pick(A, 35), sB = pick(B, 35);
console.log('總字數', W.length, '層A(xlsx only)', A.length, '層B(含網站)', B.length,
  'B 中也在 xlsx', B.filter(w => w.banks.includes('xlsx')).length);
// 真題出處核對：ex.test 檔是否存在、該題文字是否真的含這句
const DATA = path.join(ROOT, 'assets/tcf/exam/data');
const cache = {};
function test(id) {
  if (cache[id] !== undefined) return cache[id];
  const f = fs.readdirSync(DATA).find(x => /^c[oe]_.*\.js$/.test(x) && (() => { const s = fs.readFileSync(path.join(DATA, x), 'utf8'); return s.includes('"id":"' + id + '"') || s.includes('"id": "' + id + '"'); })());
  if (!f) return cache[id] = null;
  const s = fs.readFileSync(path.join(DATA, f), 'utf8');
  return cache[id] = JSON.parse(s.slice(s.indexOf(',') + 1, s.lastIndexOf(')')));
}
const norm = t => t.replace(/[…]/g, '').replace(/\s+/g, ' ').trim();
function srcOK(e) {
  const d = test(e.test); if (!d) return 'NO_TEST';
  const q = d.questions.find(q => q.q === e.q); if (!q) return 'NO_Q';
  const txt = ((d.skill === 'listening' ? q.script_fr : q.text_fr) || '').replace(/\s+/g, ' ');
  const parts = norm(e.fr).split(' ').filter(Boolean);
  const probe = parts.slice(0, Math.min(6, parts.length)).join(' ');
  return txt.includes(probe) && txt.includes(e.w) ? 'OK' : 'MISMATCH';
}
const full = process.argv.includes('--full');
for (const [lab, s] of [['A', sA], ['B', sB]]) {
  s.forEach((w, i) => {
    console.log(`\n### ${lab}${i + 1} ${w.disp} [${w.pos}/${w.praw || ''}] banks=${w.banks.join('+')} say=${w.say}`);
    console.log('  zh:', w.zh);
    if (w.col) console.log('  col:', w.col.fr, '｜', w.col.zh);
    (w.lex || []).forEach(l => console.log('  lex:', l.fr, '｜', l.zh));
    (w.ex || []).forEach(e => console.log(`  ex[${e.test}#${e.q} ${e.skill}] w=${e.w} src=${srcOK(e)}:`, full ? e.fr : e.fr.slice(0, 160)));
    if (!(w.ex || []).length) console.log('  ex: (none)');
  });
}
