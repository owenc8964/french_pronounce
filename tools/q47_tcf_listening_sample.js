// Q47：抽 TCF 聽力真題（assets/tcf/exam/listening.json）的題幹／選項樣式，跟收音機題比對用。唯讀。
// 用法：node tools/q47_tcf_listening_sample.js [起始題號=20] [測驗序=0]
var L = require('../assets/tcf/exam/listening.json');
var from = +(process.argv[2] || 20), ti = +(process.argv[3] || 0), t = L.tests[ti];
console.log('tests=' + L.tests.length + ' 這份=' + t.label + ' 題數=' + t.questions.length);
t.questions.filter(function (q) { return q.q >= from; }).forEach(function (q) {
  console.log('\n' + q.q + ' | ' + q.stem + ' | ' + JSON.stringify(q.opts) + ' | ans=' + q.answer);
  console.log('   ' + (q.script_fr || '').slice(0, 500).replace(/\n/g, ' / '));
});
