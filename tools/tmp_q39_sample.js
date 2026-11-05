// Q39：分層固定種子抽 80 題（種子 20261105，mulberry32＋Fisher-Yates）。只讀不改。
// 用法：node tools/tmp_q39_sample.js <added.json> <輸出 sample.json>
const fs = require('fs');
const SEED = 20261105;
function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const rand = mulberry32(SEED);
const all = JSON.parse(fs.readFileSync(process.argv[2], 'utf8')).filter(q => q.lesson !== 47);
function stratum(q) {
  const h = q.hint || '';
  if (/Cahier\s*A1/.test(h)) return 'A1練習本';
  if (/Cahier\s*A2/.test(h)) return 'A2練習本';
  if (/課本/.test(h)) return (q.lesson <= 16 ? 'A1課本' : 'A2課本');
  return '其他';
}
const ALLOC = { 'A1練習本': 36, 'A2練習本': 26, 'A1課本': 14, 'A2課本': 4 };
const groups = {};
all.forEach((q, i) => { const s = stratum(q); (groups[s] = groups[s] || []).push(Object.assign({ idx: i }, q)); });
const sample = [];
for (const s of Object.keys(ALLOC)) {
  const g = groups[s].slice();
  for (let i = g.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [g[i], g[j]] = [g[j], g[i]]; }
  g.slice(0, ALLOC[s]).sort((a, b) => a.idx - b.idx).forEach(q => sample.push(Object.assign({ stratum: s }, q)));
  console.log(s, 'N=', groups[s].length, 'n=', ALLOC[s]);
}
sample.forEach((q, i) => { q.no = i + 1; });
fs.writeFileSync(process.argv[3], JSON.stringify(sample, null, 0));
sample.forEach(q => {
  console.log(`#${q.no} [${q.stratum}] L${q.lesson} ${q.topic} ${q.type} | ${q.hint}\n  Q: ${q.q}\n  zh: ${q.zh}\n  A: ${q.a}${q.opts ? '  OPTS: ' + q.opts.join(' / ') : ''}\n  note: ${q.aNote}`);
});
