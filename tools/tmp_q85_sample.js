// Q85 只讀抽樣：固定種子 20261126 抽 N 題（有 opts_zh 的），印法文選項＋opts_zh＋解析 opt_zh
// 跑法：node tools/tmp_q85_sample.js [起] [迄]   （列印第 起..迄 題，預設 0..40）
const P = require('path').join(__dirname, '..', 'assets/tcf/exam/reading.json');
const d = JSON.parse(require('fs').readFileSync(P, 'utf8'));
function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const rnd = mulberry32(20261126);
const pool = [];
for (const t of d.tests) for (const q of t.questions) if (q.opts_zh) pool.push({ id: t.id, q });
for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
const N = 90;
const sample = pool.slice(0, N);
const a = +(process.argv[2] || 0), b = +(process.argv[3] || 40);
sample.slice(a, b).forEach((s, k) => {
  const q = s.q;
  console.log(`#${a + k + 1} ${s.id} Q${q.q} 答案=${q.answer}`);
  q.opts.forEach((o, i) => console.log(`  ${'ABCD'[i]}. ${o}  ⇒ 「${q.opts_zh[i] || ''}」`));
  console.log('  解析: ' + (q.opt_zh || '').replace(/\n/g, ' ∥ ').slice(0, 600));
});
