/* q22_exam_balance.js — 加速清單 Q22（2026-10-28）唯讀檢查工具
   ① 統計 exam_items.js 各題型答案分布（現況 ＋ 提案後模擬）
   ② 查提案改寫用到的詞，第一次出現在 french_notes.html 第幾課
   用法：node tools/q22_exam_balance.js
   ⛔ 只讀，不寫任何檔案 */
var fs = require('fs'), path = require('path'), vm = require('vm');
var root = path.join(__dirname, '..');
var ctx = {}; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, 'exam_items.js'), 'utf8') + ';this.EXAM_ITEMS=EXAM_ITEMS;this.EXAM_TYPES=EXAM_TYPES;', ctx);
var ITEMS = ctx.EXAM_ITEMS, TYPES = ctx.EXAM_TYPES;

function dist(items, label) {
  console.log('\n== ' + label + ' ==');
  Object.keys(TYPES).forEach(function (t) {
    var list = items.filter(function (x) { return x.type === t; }), n = list.length;
    var c = TYPES[t].opts.map(function () { return 0; });
    list.forEach(function (x) { c[x.ans]++; });
    var mx = Math.max.apply(null, c);
    console.log(TYPES[t].label + '（' + n + ' 題）');
    TYPES[t].opts.forEach(function (o, i) { console.log('  ' + i + ' ' + o.slice(0, 40).padEnd(42) + c[i] + '  ' + (100 * c[i] / n).toFixed(0) + '%'); });
    console.log('  → 一直選最多那個的命中率：' + (100 * mx / n).toFixed(0) + '%（隨機猜 ' + (100 / c.length).toFixed(0) + '%）');
  });
}
dist(ITEMS, '現況');

/* 提案：只改 neg 題的 stmt／ans（模擬，不寫回檔案） */
var PROPOSAL = {
  n01: { stmt: 'Il mange des légumes.', ans: 0 },
  n09: { stmt: 'À neuf heures, le magasin est fermé.', ans: 0 },
  n14: { stmt: 'Le train ne s\'arrête pas à Dijon.', ans: 0 },
  n17: { stmt: 'Il n\'a pas beaucoup de temps pour manger.', ans: 0 },
  n02: { stmt: 'Elle travaille dans un magasin maintenant.', ans: 2 },
  n12: { stmt: 'Ils vont visiter le musée demain.', ans: 2 },
  n06: { stmt: 'Elle boit du thé le soir.', ans: 2 },
  n15: { stmt: 'Il travaille dans un bureau.', ans: 2 },
  n08: { stmt: 'Il a mangé ce matin.', ans: 1 }
};
var sim = ITEMS.map(function (x) { var p = PROPOSAL[x.id]; return p ? Object.assign({}, x, p) : x; });
dist(sim.filter(function (x) { return x.type === 'neg'; }).concat(ITEMS.filter(function (x) { return x.type !== 'neg'; })), '提案後（模擬）');

/* 詞彙第一次出現的課次 */
var notes = fs.readFileSync(path.join(root, 'french_notes.html'), 'utf8').split('\n');
var starts = []; notes.forEach(function (l, i) { var m = l.match(/id="lesson-(\d+)"/); if (m) starts.push({ n: +m[1], line: i }); });
function lessonOf(line) { var r = 0; starts.forEach(function (s) { if (s.line <= line) r = s.n; }); return r; }
var WORDS = ['des légumes', 'fermé', 'neuf heures', 's\'arrête', 'ne s\'arrête pas', 'beaucoup de temps', 'pas beaucoup de',
  'magasin', 'maintenant', 'visiter le musée', 'demain', 'du thé', 'le soir', 'bureau', 'Il a mangé', 'ce matin', 'vont', 'thé', 'musée', 'neuf', 'mangé', 'est fermé', 'ouvert', 'visiter', 'heures', 'ne se lève pas', 'ne s\''];
console.log('\n== 詞彙首見課次（french_notes.html）==');
WORDS.forEach(function (w) {
  var re = new RegExp(w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'), hits = [];
  notes.forEach(function (l, i) { if (i >= (starts[0] || { line: 0 }).line && re.test(l.replace(/<[^>]+>/g, ''))) hits.push(i); });
  console.log('  ' + w.padEnd(20) + (hits.length ? '第 ' + lessonOf(hits[0]) + ' 課（行 ' + (hits[0] + 1) + '），共 ' + hits.length + ' 處' : '⛔ 筆記沒有'));
});
