// Q46（11-11 排程）：檢查 questions_b1.json 的 note（拿不準的提醒）有沒有被 didier_passage.py 帶進 passages_b1.json。唯讀。
// didier_passage.py from_questions()：選擇題 why=q['a']，note 被丟掉；問答題 why=note。
const Q = require('../assets/didier/_local/questions_b1.json');
const P = require('../assets/didier/passages_b1.json');
const byTrack = {}; P.forEach(p => byTrack[p.track] = p);
let lost = 0, kept = 0;
for (const [k, v] of Object.entries(Q)) {
  const p = byTrack[+k]; if (!p) continue;
  for (const r of v.rounds) for (const q of r.qs) {
    if (!q.note) continue;
    const g = p.qs.find(x => x.q === q.q);
    if (!g) continue;                       // 被篩掉的題
    const has = (g.why || '').includes(q.note);
    if (has) kept++; else { lost++; console.log(`t${k} unit${p.unit} [${q.opts ? '選擇' : '問答'}] ${q.q}\n   note 沒帶進遊戲：${q.note}`); }
  }
}
console.log(`\nnote 帶進遊戲 ${kept}，遺失 ${lost}`);
