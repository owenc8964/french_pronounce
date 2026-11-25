// Q85 只讀：看 reading.json 結構
const P = require('path').join(__dirname, '..', 'assets/tcf/exam/reading.json');
const d = JSON.parse(require('fs').readFileSync(P, 'utf8'));
let n = 0, z = 0, withOpts = 0;
for (const t of d.tests) for (const q of t.questions) { n++; if ((q.opts || []).length) withOpts++; if (q.opts_zh) z++; }
console.log('題數', n, '有選項', withOpts, '有opts_zh', z, '套數', d.tests.length);
console.log('test keys', Object.keys(d.tests[0]));
console.log('q keys', Object.keys(d.tests[0].questions[0]));
console.log(JSON.stringify(d.tests[2].questions[7], null, 1).slice(0, 3000));
