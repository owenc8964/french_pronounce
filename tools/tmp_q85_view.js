// Q85 只讀：看指定題；或 --grep 詞 掃 opts_zh
// node tools/tmp_q85_view.js ce_17:30 ce_28:7      node tools/tmp_q85_view.js --grep 計程車 新增 連線
const P = require('path').join(__dirname, '..', 'assets/tcf/exam/reading.json');
const d = JSON.parse(require('fs').readFileSync(P, 'utf8'));
const a = process.argv.slice(2);
if (a[0] === '--grep') {
  for (const w of a.slice(1)) {
    const hit = [];
    for (const t of d.tests) for (const q of t.questions) (q.opts_zh || []).forEach((s, i) => { if (s && s.includes(w)) hit.push(`${t.id} Q${q.q} ${'ABCD'[i]}: ${q.opts[i]} ⇒ ${s}`); });
    console.log(`== ${w}: ${hit.length}`); hit.forEach(h => console.log('  ' + h));
  }
  let ca = 0; const L = [];
  for (const t of d.tests) for (const q of t.questions) (q.opts || []).forEach((o, i) => { if (/correct\s*answer/i.test(o)) { ca++; L.push(`${t.id} Q${q.q} ${'ABCD'[i]}(答案${q.answer}): ${o}`); } });
  console.log(`== 法文選項含 Correctanswer: ${ca}`); L.forEach(x => console.log('  ' + x));
} else for (const k of a) {
  const [id, n] = k.split(':'); const t = d.tests.find(x => x.id === id); const q = t.questions.find(x => x.q === +n);
  console.log(`#### ${id} Q${n} 答案=${q.answer}  stem=${q.stem}`);
  q.opts.forEach((o, i) => console.log(`  ${'ABCD'[i]}. ${o} ⇒ 「${(q.opts_zh || [])[i] || ''}」`));
  console.log('  解析:\n    ' + (q.opt_zh || '').replace(/\n/g, '\n    ').slice(0, 1500));
}
