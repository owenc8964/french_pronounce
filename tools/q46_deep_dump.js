// Q46（11-11 排程）：把深水區 passages_b1.json 可抽段（unit<=3）印成精簡文字，方便人工對課本核對。唯讀。
// 用法：node tools/q46_deep_dump.js [maxUnit] [trackFilter]
const fs = require('fs'), path = require('path');
const P = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'assets/didier/passages_b1.json'), 'utf8'));
const maxU = +(process.argv[2] || 3), only = process.argv[3] ? process.argv[3].split(',').map(Number) : null;
console.log('總段數', P.length, '總題數', P.reduce((a, p) => a + p.qs.length, 0));
const pick = P.filter(p => p.unit <= maxU && (!only || only.includes(p.track)));
console.log('可抽', pick.length, '段', pick.reduce((a, p) => a + p.qs.length, 0), '題');
for (const p of pick) {
  console.log(`\n=== track ${p.track} unit ${p.unit} p.${p.page} ${p.title} notime=${p.notime || 0} s=${p.s} e=${p.e} lines=${p.lines.length} words=${p.words.length}`);
  const spk = {}; p.lines.forEach(l => spk[l.spk] = (spk[l.spk] || 0) + 1);
  console.log('  講話人:', JSON.stringify(spk));
  p.lines.forEach((l, i) => console.log(`  L${i} [${l.spk}] ${l.text}`));
  p.qs.forEach((q, i) => {
    console.log(`  Q${i + 1} ${q.q}\n     zh: ${q.zh}`);
    if (q.open) console.log(`     ANS(open): ${q.ans}`); else console.log(`     OPTS: ${q.opts.map((o, k) => (k === q.a ? '*' : '') + o).join(' | ')}`);
    console.log(`     ev: ${q.ev} | line=${q.line}${q.evs && q.evs.length > 1 ? ' | evs=' + q.evs.join(' … ') : ''}`);
    if (q.why) console.log(`     why: ${q.why}`);
  });
}
