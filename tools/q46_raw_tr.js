// Q46（11-11 排程）：印出 transcripts_b1.json 指定軌的原始逐字稿開頭，查講話人格式。唯讀。
// 用法：node tools/q46_raw_tr.js 1,4,20 [字數]
const T = require('../assets/didier/transcripts_b1.json');
const n = +(process.argv[3] || 900);
for (const k of process.argv[2].split(',')) console.log(`\n# ${k}\n` + (T[k] ? T[k].text.slice(0, n) : '(無)'));
