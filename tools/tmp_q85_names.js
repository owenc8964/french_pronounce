// Q85 只讀：中文前面緊貼著的法文人名／地名被切掉（「– Amélie 最近搬家了」→「最近搬家了」）
const P = require('path').join(__dirname, '..', 'assets/tcf/exam/reading.json');
const d = JSON.parse(require('fs').readFileSync(P, 'utf8'));
let n = 0;
for (const t of d.tests) for (const q of t.questions) (q.opts_zh || []).forEach((s, i) => {
  if (!s) return;
  const src = q.opt_zh || '';
  const k = src.indexOf(s.slice(0, Math.min(4, s.length)));
  if (k < 0) return;
  const before = src.slice(Math.max(0, k - 25), k);
  const m = before.match(/(?:[（(–—⸺-]|\.\s)\s*((?:M\.|Mme|[A-ZÀ-Ý][a-zà-ÿ]+)(?:\s+[A-ZÀ-Ý][a-zà-ÿ]+)*)\s*$/);
  if (m && q.opts[i].includes(m[1].replace(/^M\.$/, 'M.'))) { n++; console.log(`${t.id} Q${q.q} ${'ABCD'[i]}: ${q.opts[i]} ⇒ ${s}   （解析：${m[1]} ${s.slice(0, 12)}…）`); }
});
console.log('合計', n);
