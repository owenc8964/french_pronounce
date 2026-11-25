/* Q73（2026-11-25）toolbox_game.js 判分／跳過／回收 實跑檢查
   ⛔ 不碰網路、不碰雲端：Toolbox.data() 換成假資料，localStorage 換成記憶體。
   ⚠️ 下面的「假資料」句子只是測試字串（取自程式註解裡已有的句型名稱拼成），不是教材，不進任何頁面。
   用法：node tools/tmp_q73_toolq_check.js */
var fs = require('fs'), vm = require('vm'), path = require('path');
var SRC = fs.readFileSync(path.join(__dirname, '..', 'toolbox_game.js'), 'utf8');

/* 假資料：cats[].items[] = [中文意圖, 句型, 例句, 例句中文, 來源, 註] */
var FAKE = { cats: [
  { id: 'conn', em: '🔗', name: 'TEST連接', items: [
    ['TEST', 'cependant / toutefois / néanmoins', 'TEST1 cependant TEST2.', 'z'],
    ['TEST', 'Bien que + 虛擬式', 'Bien que TEST soit TEST, TEST.', 'z'],
    ['TEST', 'non seulement… mais aussi…', 'TEST non seulement TEST mais aussi TEST.', 'z'],
    ['TEST', 'C’est… que…', 'C’est TEST qu’il TEST.', 'z'],         /* 省音：que→qu’ */
    ['TEST', 'l’un(e) des meilleur(e)s…', 'C\'est l\'une des meilleures TEST.', 'z'],  /* 句子用直撇號、FIX 用彎撇號 */
    ['TEST', 'parce que', 'TEST parce qu’il TEST.', 'z']             /* 省音 */
  ]},
  { id: 'effet', em: '⚙️', name: 'TEST動詞', items: [
    ['TEST', 'permettre à qn de + 原形', 'TEST permet aux TEST de TEST.', 'z'],
    ['TEST', 'chercher à / essayer de + 原形', 'Les TEST cherchent à TEST.', 'z'],
    ['TEST', 'avoir une influence / un impact sur…', 'TEST a un impact sur TEST.', 'z'],
    ['TEST', 'contribuer à + 原形／名詞', 'Les TEST contribuent à TEST.', 'z'],
    ['TEST', 'nuire à…', 'TEST', 'z'],                                 /* 例句裡沒有 → 不出填空 */
    ['TEST', 'sans exemple', '', '']                                  /* 沒例句 → 只出反射卡 */
  ]},
  { id: 'vie', em: '☀️', name: 'TEST基本', items: [['TEST', 'bonjour', 'bonjour TEST', 'z']] }
]};

function mkEnv() {
  var store = {}, els = {}, logs = [], toasts = [], sheets = [];
  function el(id) { return els[id] || (els[id] = { id: id, value: '', innerHTML: '', style: {}, dataset: {}, focus: function () {}, addEventListener: function (t, f) { this['on' + t] = f; } }); }
  var ctx = {
    console: console, Date: Date, Math: Math, JSON: JSON, String: String, Object: Object, Promise: Promise,
    setTimeout: function () {}, // 不自動 preload
    localStorage: { getItem: function (k) { return k in store ? store[k] : null; }, setItem: function (k, v) { store[k] = String(v); } },
    document: { getElementById: function (id) { return el(id); } },
    sheet: { querySelectorAll: function () { return []; } },
    openSheet: function (h) { sheets.push(h); for (var k in els) delete els[k]; },
    esc: function (s) { return String(s); }, spk: function () { return ''; }, speak: function () {},
    toast: function (t) { toasts.push(t); }, S: { gold: 0 }, save: function () {},
    GameLog: { answer: function (ok, m) { logs.push({ ok: ok, ref: m.ref, pick: m.pick }); } }
  };
  ctx.window = ctx;
  ctx.Toolbox = { data: function () { return Promise.resolve(FAKE); }, upMove: function () { return ''; } };
  vm.createContext(ctx);
  vm.runInContext(SRC, ctx);
  return { ctx: ctx, store: store, els: els, logs: logs, toasts: toasts, sheets: sheets, el: el };
}

function waitReady(E) { E.ctx.ToolQ.preload(); return new Promise(function (r) { setImmediate(r); }); }

var out = [];
function row(a, b, c, d) { out.push([a, b, c, d].join(' | ')); }

(async function () {
  var E = mkEnv(); await waitReady(E);
  var items = E.ctx.ToolQ._items();
  console.log('== 一、build 出了哪些填空 ==');
  items.filter(function (i) { return i.type === 'cloze'; }).forEach(function (i) { console.log('  ', i.fr, '→ ans=' + JSON.stringify(i.ans), 'alts=' + JSON.stringify(i.alts)); });
  var noCloze = FAKE.cats.filter(function (c) { return c.id !== 'vie'; }).reduce(function (a, c) { return a.concat(c.items); }, [])
    .filter(function (x) { return !items.some(function (i) { return i.type === 'cloze' && i.fr === x[1]; }); }).map(function (x) { return x[1]; });
  console.log('  沒有填空的：', noCloze);
  console.log('  vie 類有沒有被排除：', !items.some(function (i) { return i.cat.id === 'vie'; }));

  function tryAns(fr, typed) {
    var E2 = mkEnv(); E2.ctx.ToolQ.preload();
    return new Promise(function (r) { setImmediate(function () {
      var it = E2.ctx.ToolQ._items().filter(function (i) { return i.type === 'cloze' && i.fr === fr; })[0];
      if (!it) return r('（沒這題）');
      E2.ctx.ToolQ._cloze(it, function () {});
      E2.el('tbIn').value = typed; E2.el('tbGo').onclick();
      var fb = E2.el('tbFb').innerHTML;
      r((E2.logs[0] && E2.logs[0].ok ? '對' : '錯') + (fb.indexOf('注意重音') >= 0 ? '（提醒重音）' : ''));
    }); });
  }
  console.log('\n== 二、判分 ==');
  var cases = [
    ['cependant / toutefois / néanmoins', 'cependant'], ['cependant / toutefois / néanmoins', 'Cependant'],
    ['cependant / toutefois / néanmoins', 'toutefois'], ['cependant / toutefois / néanmoins', 'neanmoins'],
    ['cependant / toutefois / néanmoins', ' cependant, '], ['cependant / toutefois / néanmoins', 'cependant…'],
    ['Bien que + 虛擬式', 'bien que'], ['Bien que + 虛擬式', 'Bien que'], ['Bien que + 虛擬式', 'bienque'],
    ['Bien que + 虛擬式', 'quoique'],
    ['l’un(e) des meilleur(e)s…', 'l’une des meilleures'], ['l’un(e) des meilleur(e)s…', "l'une des meilleures"],
    ['permettre à qn de + 原形', 'permet'], ['permettre à qn de + 原形', 'Permet'], ['permettre à qn de + 原形', 'TEST permet'],
    ['permettre à qn de + 原形', 'permettent'], ['permettre à qn de + 原形', 'permet aux'],
    ['chercher à / essayer de + 原形', 'cherchent à'], ['chercher à / essayer de + 原形', 'cherchent'],
    ['chercher à / essayer de + 原形', 'essaient de'], ['chercher à / essayer de + 原形', 'essayent de'],
    ['avoir une influence / un impact sur…', 'a un impact'], ['avoir une influence / un impact sur…', 'a une influence'],
    ['avoir une influence / un impact sur…', 'a un  impact'], ['contribuer à + 原形／名詞', 'contribuent'],
    ['contribuer à + 原形／名詞', 'contribuent à'], ['contribuer à + 原形／名詞', 'les TEST contribuent'],
    ['non seulement… mais aussi…', 'non seulement'], ['non seulement… mais aussi…', 'mais aussi'],
    ['C’est… que…', 'que'], ['C’est… que…', 'qu’'], ['parce que', 'parce qu’'], ['parce que', 'parce que'],
    ['permettre à qn de + 原形', 'permét'], ['permettre à qn de + 原形', 'PERMET'], ['permettre à qn de + 原形', 'permet ']
  ];
  for (var i = 0; i < cases.length; i++) console.log('  ', cases[i][0], '| 打', JSON.stringify(cases[i][1]), '→', await tryAns(cases[i][0], cases[i][1]));

  console.log('\n== 三、跳過／會了 對到期回收題的影響 ==');
  var E3 = mkEnv(); await waitReady(E3);
  var Q = E3.ctx.ToolQ, all = Q._items(), c1 = all.filter(function (i) { return i.type === 'cloze' && i.fr === 'permettre à qn de + 原形'; })[0];
  Q._cloze(c1, function () {}); E3.el('tbIn').value = 'xxx'; E3.el('tbGo').onclick();
  var srs = JSON.parse(E3.store.clb7_toolbox_srs); console.log('  答錯後 srs：', JSON.stringify(srs[c1.id]));
  // 把 due 撥到現在 → 到期
  srs[c1.id].due = Date.now() - 1; E3.store.clb7_toolbox_srs = JSON.stringify(srs);
  // 讓 serve 一定出：Math.random 固定小
  var realR = E3.ctx.Math.random; E3.ctx.Math = Object.create(Math); E3.ctx.Math.random = function () { return 0.01; };
  var seen = [];
  for (var k = 0; k < 6; k++) {
    var shown = Q.serve(function () {});
    var h = E3.sheets[E3.sheets.length - 1] || '';
    seen.push(shown ? (h.indexOf('這句少了什麼') >= 0 ? 'cloze' : 'flash') : '-');
    if (shown) E3.el('tbSkip').onclick();
  }
  console.log('  按「⏭ 跳過」連 6 次遭遇出了什麼：', seen.join(','));
  var day = JSON.parse(E3.store.clb7_toolbox_day || '{}'); console.log('  今日計數：', JSON.stringify(day));
  console.log('  跳過有沒有記在 clb7_toolbox_known：', E3.store.clb7_toolbox_known || '（沒有）');
  console.log('  GameLog 記了幾筆 null：', E3.logs.filter(function (l) { return l.ok === null; }).length);

  // 會了 on due cloze
  var E4 = mkEnv(); await waitReady(E4); var Q4 = E4.ctx.ToolQ; E4.ctx.Math = Object.create(Math); E4.ctx.Math.random = function () { return 0.01; };
  var s4 = {}; Q4._items().forEach(function (it) { if (it.type === 'cloze') s4[it.id] = { step: 0, due: Date.now() - 1, last: 1, n: 1 }; });
  E4.store.clb7_toolbox_srs = JSON.stringify(s4);
  var firstId = null, again = 0;
  for (var k2 = 0; k2 < 8; k2++) { if (!Q4.serve(function () {})) continue; var h4 = E4.sheets[E4.sheets.length - 1]; if (h4.indexOf('這句少了什麼') < 0) { E4.el('tbSkip').onclick(); continue; }
    E4.el('tbKnow').onclick(); }
  var kn4 = JSON.parse(E4.store.clb7_toolbox_known || '{}'), s4b = JSON.parse(E4.store.clb7_toolbox_srs);
  var stillDue = Object.keys(kn4).filter(function (id) { return s4b[id] && s4b[id].due <= Date.now(); });
  console.log('  到期題按「會了」後：known 記了', Object.keys(kn4).length, '題；其中 srs 仍到期（下一次遭遇照樣會出）：', stillDue.length, '題；known 內容範例', JSON.stringify(kn4[Object.keys(kn4)[0]]));

  console.log('\n== 四、答完之後下排三顆鈕還能按 ==');
  var E5 = mkEnv(); await waitReady(E5); var c5 = E5.ctx.ToolQ._items().filter(function (i) { return i.type === 'cloze'; })[0];
  E5.ctx.ToolQ._cloze(c5, function () {}); E5.el('tbIn').value = 'xxx'; E5.el('tbGo').onclick(); E5.el('tbKnow').onclick();
  console.log('  答錯後再按「會了」：GameLog 筆數', E5.logs.length, JSON.stringify(E5.logs.map(function (l) { return l.ok; })), '；known=', E5.store.clb7_toolbox_known ? '有寫' : '沒寫', '；srs step=', JSON.parse(E5.store.clb7_toolbox_srs)[c5.id].step);

  console.log('\n== 五、沒登入 ==');
  var E6 = mkEnv(); E6.ctx.Toolbox.data = function () { var e = new Error('尚未登入'); e.code = 'nologin'; return Promise.reject(e); };
  var r6 = []; for (var k6 = 0; k6 < 3; k6++) { r6.push(E6.ctx.ToolQ.serve(function () {})); await new Promise(function (r) { setImmediate(r); }); }
  console.log('  serve 回傳：', r6.join(','), '（false＝不擋路，原遭遇照走）；有沒有開 sheet：', E6.sheets.length);
  var E7 = mkEnv(); E7.ctx.Toolbox.data = function () { return Promise.resolve({ wrong: 1 }); };
  E7.ctx.ToolQ.preload(); await new Promise(function (r) { setImmediate(r); });
  var r7; try { r7 = E7.ctx.ToolQ.serve(function () {}); } catch (e) { r7 = 'THROW ' + e.message; }
  console.log('  內容格式不對（沒有 cats）：serve →', r7, '；_items=', JSON.stringify(E7.ctx.ToolQ._items()));
})();
