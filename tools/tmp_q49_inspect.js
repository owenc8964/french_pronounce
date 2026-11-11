// Q49 看單題原始欄位（唯讀）：node tools/tmp_q49_inspect.js co_36 37
const fs = require('fs'), path = require('path');
const [id, n] = process.argv.slice(2);
const src = fs.readFileSync(path.join(__dirname, '..', 'assets/tcf/exam/data', id + '.js'), 'utf8');
const t = JSON.parse(src.match(/^TCF_LOAD\("[^"]+",([\s\S]*)\);?\s*$/)[1]);
const q = t.questions.find(x => x.q === +n);
console.log(JSON.stringify(q, null, 1));
