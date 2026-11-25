// Q84 只讀：印出某套某段時間的語音辨識＋指定題逐字稿開頭
// 跑法：node tools/tmp_q84_dump.js co_16 1700 1900 37,38,39
const fs = require('fs'), path = require('path');
const EX = path.join(__dirname, '..', 'assets/tcf/exam');
const [tid, a, b, qs] = process.argv.slice(2);
const segs = JSON.parse(fs.readFileSync(path.join(EX, '_asr', 'co_test' + tid.slice(3) + '.json'), 'utf8')).segments;
const st = g => (g.words && g.words.length) ? g.words[0].start : g.start;
segs.filter(g => g.start >= +a && g.start < +b).forEach(g => console.log(st(g).toFixed(1).padStart(7), g.text.replace(/<\|.*?\|>/g, '').trim().slice(0, 110)));
const T = JSON.parse(fs.readFileSync(path.join(EX, 'listening.json'), 'utf8')).tests.find(t => t.id === tid);
(qs || '').split(',').filter(Boolean).forEach(q => { const s = T.questions[+q - 1].script_fr || ''; console.log(`--- 第${q}題稿（前200字）：` + s.replace(/\n/g, ' / ').slice(0, 200)); });
const cues = JSON.parse(fs.readFileSync(path.join(EX, 'cues.js'), 'utf8').split('=').slice(1).join('=').trim().replace(/;$/, ''));
console.log('cues.js:', JSON.stringify(cues[tid]));
