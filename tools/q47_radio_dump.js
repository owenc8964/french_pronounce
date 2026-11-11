// Q47：把收音機上線版（assets/podcast/radio/easyfrench_<id>.json）每段原文＋題目攤平成純文字，方便人工逐題核對。
// 用法：node tools/q47_radio_dump.js 212 > out.txt   （唯讀，不改任何檔）
var fs = require('fs'), path = require('path');
var id = process.argv[2] || '212';
var root = path.join(__dirname, '..', 'assets', 'podcast');
var ep = JSON.parse(fs.readFileSync(path.join(root, 'radio', 'easyfrench_' + id + '.json'), 'utf8'));
var notes = {};
try { notes = JSON.parse(fs.readFileSync(path.join(root, 'easyfrench', 'notes', id + '.json'), 'utf8')); } catch (e) {}
console.log('# ' + ep.title + '  segs=' + ep.segs.length + '  keys=' + Object.keys(ep.segs[0]).join(','));
ep.segs.forEach(function (s) {
  console.log('\n===== seg ' + s.n + ' (' + s.id + ') ' + s.s + '–' + s.e);
  (s.lines || []).forEach(function (l) { console.log('  ' + l.t); });
  var q = s.q || ((notes.segs || {})[s.n] || {}).q;
  if (q && !Array.isArray(q)) q = [q.q, q.o, q.a, q.line, q.why];
  if (q) {
    console.log('  ---- Q: ' + q[0]);
    (q[1] || []).forEach(function (o, i) { console.log('     ' + (i === q[2] ? '*' : ' ') + 'ABCD'[i] + '. ' + o); });
    console.log('     evid: ' + q[3]);
    console.log('     zh: ' + q[4]);
  } else console.log('  ---- (no q) keys=' + Object.keys(s).join(','));
});
