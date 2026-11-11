// Q47：比較 TCF 聽力真題 vs 收音機故事題的兩個「樣式」指標。唯讀。
// ① 選項是否照字母排序（TCF 真題慣例？）
// ② 字面重疊：正解／干擾項的實詞（≥4 字母、去停用詞）有幾成出現在原文——正解重疊高、干擾項低＝「抓關鍵字就能答」
// 用法：node tools/q47_style_stats.js
var fs = require('fs'), path = require('path');
var root = path.join(__dirname, '..', 'assets');
function norm(s) { return (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’']/g, ' '); }
var STOP = 'dans pour avec sans elle elles ils sont etre avoir fait faire plus tres tout tous toute toutes cette celle celui leur leurs mais aussi comme quand selon entre apres avant parce quoi seulement chez autres autre sont qu il est une des les que qui'.split(' ');
function words(s) { return norm(s).split(/[^a-z]+/).filter(function (w) { return w.length >= 4 && STOP.indexOf(w) < 0; }); }
function overlap(opt, script) { var ws = words(opt); if (!ws.length) return null; var sc = ' ' + norm(script).replace(/[^a-z]+/g, ' ') + ' ';
  return ws.filter(function (w) { return sc.indexOf(' ' + w) >= 0; }).length / ws.length; }
function sorted(opts) { var n = opts.map(norm); for (var i = 1; i < n.length; i++) if (n[i - 1].localeCompare(n[i]) > 0) return false; return true; }
function avg(a) { a = a.filter(function (x) { return x != null; }); return a.length ? (a.reduce(function (s, x) { return s + x; }, 0) / a.length) : NaN; }

// TCF
var L = JSON.parse(fs.readFileSync(path.join(root, 'tcf', 'exam', 'listening.json'), 'utf8'));
var tq = [], tSorted = 0, tN = 0, tA = [], tD = [], tWin = 0, tWinN = 0;
L.tests.forEach(function (t) { t.questions.forEach(function (q) {
  if (!q.opts || /^(Proposition|Réponse) [a-d]$/i.test(q.opts[0])) return;   // 看圖／只念選項的題沒有書面選項
  tN++; if (sorted(q.opts)) tSorted++;
  var ai = 'ABCD'.indexOf(q.answer), sc = q.script_fr || ''; if (ai < 0 || !sc) return;
  var ov = q.opts.map(function (o) { return overlap(o, sc); });
  tA.push(ov[ai]); ov.forEach(function (x, i) { if (i !== ai) tD.push(x); });
  var dmax = Math.max.apply(null, ov.filter(function (x, i) { return i !== ai && x != null; })); if (ov[ai] != null && isFinite(dmax)) { tWinN++; if (ov[ai] > dmax) tWin++; }
}); });
console.log('TCF 聽力（有書面選項的題）n=' + tN + '｜選項照字母排 ' + tSorted + '（' + (100 * tSorted / tN).toFixed(0) + '%）');
console.log('   字面重疊：正解 ' + avg(tA).toFixed(2) + '｜干擾項 ' + avg(tD).toFixed(2) + '｜正解重疊嚴格最高的題 ' + tWin + '/' + tWinN + '（' + (100 * tWin / tWinN).toFixed(0) + '%）');

['212', '195'].forEach(function (id) {
  var ep = JSON.parse(fs.readFileSync(path.join(root, 'podcast', 'radio', 'easyfrench_' + id + '.json'), 'utf8'));
  var n = 0, so = 0, A = [], D = [], win = 0, wn = 0, pos = [0, 0, 0, 0];
  ep.segs.forEach(function (s) { var q = s.q; if (!q) return; n++; if (sorted(q.o)) so++; pos[q.a]++;
    var sc = s.lines.map(function (l) { return l.t; }).join(' ');
    var ov = q.o.map(function (o) { return overlap(o, sc); }); A.push(ov[q.a]); ov.forEach(function (x, i) { if (i !== q.a) D.push(x); });
    var dmax = Math.max.apply(null, ov.filter(function (x, i) { return i !== q.a && x != null; })); if (ov[q.a] != null && isFinite(dmax)) { wn++; if (ov[q.a] > dmax) win++; }
    console.log('   ' + id + '-' + s.n + ' 正解重疊=' + (ov[q.a] == null ? '-' : ov[q.a].toFixed(2)) + ' 干擾=' + ov.filter(function (x, i) { return i !== q.a; }).map(function (x) { return x == null ? '-' : x.toFixed(2); }).join('/'));
  });
  // ③ 錨點檢查：答案頁 ▶ 用 hint 找原句、認字頁用 w[2] 找原句（同 town.html passNorm：去重音、小寫、只留 a-z0-9）
  var pn = function (s) { return norm(s).replace(/[^a-z0-9]/g, ''); };
  ep.segs.forEach(function (s) { var L = s.lines.map(function (l) { return pn(l.t); });
    var has = function (k) { k = pn(k); return k && L.some(function (x) { return x.indexOf(k) >= 0; }); };
    if (s.q && !has(s.q.hint)) console.log('   ⚠️ ' + id + '-' + s.n + ' hint 對不到任何一行：' + s.q.hint);
    (s.w || []).forEach(function (w) { if (!has(w[2] || w[0])) console.log('   ⚠️ ' + id + '-' + s.n + ' 生字錨點對不到：' + (w[2] || w[0])); });
  });
  console.log('收音機 ' + id + ' n=' + n + '｜照字母排 ' + so + '｜正解位置 A/B/C/D=' + pos.join('/') + '｜重疊：正解 ' + avg(A).toFixed(2) + '｜干擾 ' + avg(D).toFixed(2) + '｜正解嚴格最高 ' + win + '/' + wn);
});
