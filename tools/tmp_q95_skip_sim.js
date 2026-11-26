/* Q95（2026-11-26）路上句型題「跳過卻一直出同一題」修正草稿的模擬驗證
   ⛔ 不改 toolbox_game.js：讀原檔 → 在記憶體裡套 drafts/路上句型題跳過修正草稿_2026-11-26.md 的同一組替換 → 原版／修正版各跑一次比較。
   ⛔ 不碰網路、不碰雲端：Toolbox.data() 換成假資料，localStorage 換成記憶體。
   ⚠️ 假資料句子沿用 tools/tmp_q73_toolq_check.js 的 TEST 測試字串（句型名稱取自程式裡已有的 CLOZE_FIX），不是教材。
   用法：node tools/tmp_q95_skip_sim.js */
var fs = require('fs'), vm = require('vm'), path = require('path');
var SRC = fs.readFileSync(path.join(__dirname, '..', 'toolbox_game.js'), 'utf8');

/* ===== 草稿裡的替換（old 必須在原檔剛好出現一次） ===== */
var PATCH = [
  { tag: '改1 norm／normAcc', old:
"function norm(s){ return String(s).toLowerCase().replace(/[’]/g,\"'\").normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[.,!?;:«»\"…]/g,'').replace(/\\s+/g,' ').trim(); }\nfunction normAcc(s){ return String(s).toLowerCase().replace(/[’]/g,\"'\").replace(/[.,!?;:«»\"…]/g,'').replace(/\\s+/g,' ').trim(); }",
    new:
"function lig(s){ return String(s).toLowerCase().replace(/[’‘ʼ]/g,\"'\").replace(/œ/g,'oe').replace(/æ/g,'ae'); }\nfunction norm(s){ return lig(s).normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[.,!?;:«»\"…]/g,'').replace(/\\s+/g,' ').trim(); }\nfunction normAcc(s){ return lig(s).normalize('NFC').replace(/[.,!?;:«»\"…]/g,'').replace(/\\s+/g,' ').trim(); }" },
  { tag: '改2 CLOZE_FIX 帶備選', old:
"'avoir une influence / un impact sur…':'a un impact'",
    new:
"'avoir une influence / un impact sur…':['a un impact','a une influence']" },
  { tag: '改2 CLOZE_FIX 帶備選(2)', old:
"'chercher à / essayer de + 原形':'cherchent à'",
    new:
"'chercher à / essayer de + 原形':['cherchent à','essaient de','essayent de']" },
  { tag: '改3 build 指定挖空', old:
"      var P=pieces(x[1]), hit=null, fx=CLOZE_FIX[x[1]];\n      if(fx){ var fi=wordAt(x[2], fx); if(fi>=0) hit={p:fx, i:fi}; }",
    new:
"      var P=pieces(x[1]), hit=null, fxs=CLOZE_FIX[x[1]]==null?[]:[].concat(CLOZE_FIX[x[1]]), fx=fxs[0];\n      if(fx) fxs.some(function(f){ var fi=wordAt(x[2], f); if(fi<0) fi=wordAt(x[2], f.replace(/’/g,\"'\")); if(fi>=0){ hit={p:f, i:fi}; return true; } });" },
  { tag: '改3 build alts', old:
"alts=fx?[]:P.filter(",
    new:
"alts=fx?fxs.filter(function(f){ return f!==hit.p; }):P.filter(" },
  { tag: '改4 pick 到期段', old:
"  var due=L.filter(function(it){ var r=srs[it.id]; return r && r.due<=now; });",
    new:
"  var due=L.filter(function(it){ var r=srs[it.id]; return r && r.due<=now && !knDay(kn[it.id]); });   /* ⭐ 今天按過跳過／會了的到期題，今天不再出（明天照常回來） */" },
  { tag: '改5 pick 新題段', old:
"    if(k && now-k.last<3*86400000) return;",
    new:
"    if(knDay(k)) return;                                  /* 今天按過跳過／會了 → 今天不再出 */\n    if(k && now-knKd(k)<3*86400000) return;               /* 會了 → 3 天內不出（只看按「會了」的時間，跳過不延長） */\n    if(k && k.skip) w/=1+Math.min(k.skip,4);              /* 跳過次數只降頻，⛔ 不刪 */" },
  { tag: '改6 known 記跳過', old:
"function known(it){ var kn=LS('clb7_toolbox_known',{}), r=kn[it.id]||{n:0}; r.n++; r.last=Date.now(); kn[it.id]=r; LSset('clb7_toolbox_known', kn); }",
    new:
"function known(it, how){ var kn=LS('clb7_toolbox_known',{}), r=kn[it.id]||{n:0}, now=Date.now();\n  if(r.n && !r.kd && r.last) r.kd=r.last;               /* 舊資料 {n,last}：last 就是按會了的時間，先搬到 kd */\n  if(how==='skip') r.skip=(r.skip||0)+1; else { r.n=(r.n||0)+1; r.kd=now; }\n  r.last=now; kn[it.id]=r; LSset('clb7_toolbox_known', kn); }   /* 形狀 {n, skip, kd, last}：一個 key 一個物件＋last，照 sync_supabase.js 合併慣例 */\nfunction knDay(k){ return !!(k && k.last && sod(k.last)===sod(Date.now())); }\nfunction knKd(k){ return k ? (k.kd || (k.n ? k.last : 0)) : 0; }\nfunction knowAdvance(it){ var srs=LS('clb7_toolbox_srs',{}), r=srs[it.id]; if(!r) return; var now=Date.now();   /* 選項 (a)：已進回收的題按「會了」＝往後推一格（不發金幣、不計分、不加 n） */\n  r.step=Math.min(Math.max(r.step,0)+1, GAP.length-1); r.due=sod(now)+GAP[r.step]*86400000; r.last=now; srs[it.id]=r; LSset('clb7_toolbox_srs', srs); }" },
  { tag: '改7 今日計數包物件', old:
"function dayCount(type){ var d=LS('clb7_toolbox_day',{}); if(d.d!==dayKey()) d={d:dayKey(), cloze:0, flash:0, off:0}; return d; }\nfunction dayBump(type){ var d=dayCount(); d[type]=(d[type]||0)+1; LSset('clb7_toolbox_day', d); }\nfunction dayOff(){ var d=dayCount(); d.off=1; LSset('clb7_toolbox_day', d); }",
    new:
"function dayRaw(){ var v=LS('clb7_toolbox_day',{}); return (v && typeof v==='object')?v:{}; }\nfunction dayCount(type){ var raw=dayRaw(), t=raw.today||raw, d=(t.d===dayKey())?{d:t.d, cloze:t.cloze||0, flash:t.flash||0}:{d:dayKey(), cloze:0, flash:0};\n  d.off=(raw.off && raw.off.d===dayKey())?1:((!raw.today && raw.d===dayKey() && raw.off)?1:0); return d; }\nfunction daySave(patch){ var raw=dayRaw(), out={}; if(raw.today) out.today=raw.today; if(raw.off && typeof raw.off==='object') out.off=raw.off; Object.assign(out, patch); LSset('clb7_toolbox_day', out); }\nfunction dayBump(type){ var d=dayCount(); d[type]=(d[type]||0)+1; daySave({today:{d:d.d, cloze:d.cloze, flash:d.flash, last:Date.now()}}); }\nfunction dayOff(){ var d=dayCount(); daySave({off:{d:d.d, last:Date.now()}}); }" },
  { tag: '改8 tail 加 id', old:
"  return '<div class=\"row2\"><button class=\"btn ghost\" id=\"tbKnow\">",
    new:
"  return '<div class=\"row2\" id=\"tbTail\"><button class=\"btn ghost\" id=\"tbKnow\">" },
  { tag: '改9 wireTail', old:
"  document.getElementById('tbKnow').onclick=function(){ known(it); if(window.GameLog) GameLog.answer(null,{kind:kind, ref:'tb:'+it.id}); cont(); };\n  document.getElementById('tbSkip').onclick=function(){ if(window.GameLog) GameLog.answer(null,{kind:kind, ref:'tb:'+it.id}); cont(); };",
    new:
"  function gone(){ var t=document.getElementById('tbTail'); return t && t.style.display==='none'; }   /* 答完就收起來，⛔ 同一題不記兩次 */\n  document.getElementById('tbKnow').onclick=function(){ if(gone()) return; known(it); if(KNOW_ADVANCE) knowAdvance(it); if(window.GameLog) GameLog.answer(null,{kind:kind, ref:'tb:'+it.id}); cont(); };\n  document.getElementById('tbSkip').onclick=function(){ if(gone()) return; known(it,'skip'); if(window.GameLog) GameLog.answer(null,{kind:kind, ref:'tb:'+it.id}); cont(); };" },
  { tag: '改9 KNOW_ADVANCE 開關', old:
"var C=null, ITEMS=null, GAP=[1,3,7,21], CAP={cloze:4, flash:8};",
    new:
"var C=null, ITEMS=null, GAP=[1,3,7,21], CAP={cloze:4, flash:8}, KNOW_ADVANCE=true;   /* 待 Owen 決定：true＝(a) 已進回收的題按會了往後推一格；false＝(b) 只擋今天 */" },
  { tag: '改10 Enter 繼續', old:
"if(e.key==='Enter') check(false); });",
    new:
"if(e.key==='Enter'){ if(fin) cont(); else check(false); } });" },
  { tag: '改11 判分', old:
"    var ok=!idk && (norm(v)===norm(it.ans) || it.alts.some(function(a){ return norm(a)===norm(v); })), acc=ok && normAcc(v)!==normAcc(it.ans) && !it.alts.some(function(a){ return normAcc(a)===normAcc(v); });",
    new:
"    var ok=!idk && match(v, it, norm), acc=ok && !match(v, it, normAcc);" },
  { tag: '改11 判分 helper', old:
"/* ① 填空 */",
    new:
"/* 判分：答案／備選；⭐ 動詞搭配（effet）多收兩種不冤枉的打法：介系詞在不在空格裡都算、順手把主詞一起打也算 */\nfunction match(v, it, f){ var n=f(v), F=[];\n  [it.ans].concat(it.alts).forEach(function(a){ var x=f(a); F.push(x);\n    if(it.cat.id==='effet'){ var s=x.replace(/\\s+(à|a|de|d')$/,''); if(s!==x) F.push(s);\n      var m=f(it.after).match(/^(à|a|de|d')(?=\\s|$)/); if(m) F.push(x+' '+m[1]); } });\n  if(F.indexOf(n)>=0) return true;\n  if(it.cat.id!=='effet') return false;\n  var bw=f(it.before).split(' ').filter(Boolean);\n  for(var k=1; k<=2 && k<=bw.length; k++){ var pre=bw.slice(-k).join(' ')+' '; if(n.indexOf(pre)===0 && F.indexOf(n.slice(pre.length))>=0) return true; }\n  return false; }\n/* ① 填空 */" },
  { tag: '改12 答完收起下排', old:
"    document.getElementById('tbIdk').style.visibility='hidden'; }",
    new:
"    document.getElementById('tbIdk').style.visibility='hidden'; var tt=document.getElementById('tbTail'); if(tt) tt.style.display='none'; }" }
];

function applyPatch(src) {
  var bad = [];
  PATCH.forEach(function (p) {
    var n = src.split(p.old).length - 1;
    if (n !== 1) bad.push(p.tag + '（找到 ' + n + ' 次）'); else src = src.replace(p.old, function () { return p.new; });
  });
  return { src: src, bad: bad };
}

var FAKE = { cats: [
  { id: 'conn', em: '🔗', name: 'TEST連接', items: [
    ['TEST', 'cependant / toutefois / néanmoins', 'TEST1 cependant TEST2.', 'z'],
    ['TEST', 'Bien que + 虛擬式', 'Bien que TEST soit TEST, TEST.', 'z'],
    ['TEST', 'l’un(e) des meilleur(e)s…', 'C\'est l\'une des meilleures TEST.', 'z'],
    ['TEST', 'grâce à', 'TEST grâce à TEST.', 'z']
  ]},
  { id: 'effet', em: '⚙️', name: 'TEST動詞', items: [
    ['TEST', 'permettre à qn de + 原形', 'TEST permet aux TEST de TEST.', 'z'],
    ['TEST', 'chercher à / essayer de + 原形', 'Les TEST cherchent à TEST.', 'z'],
    ['TEST', 'avoir une influence / un impact sur…', 'TEST a un impact sur TEST.', 'z'],
    ['TEST', 'contribuer à + 原形／名詞', 'Les TEST contribuent à TEST.', 'z'],
    ['TEST', 'décider de + 原形', 'Les TEST décident de TEST.', 'z'],
    ['TEST', 'sans exemple', '', '']
  ]}
]};

function mkEnv(src) {
  var store = {}, els = {}, logs = [], toasts = [], sheets = [];
  function el(id) { return els[id] || (els[id] = { id: id, value: '', innerHTML: '', style: {}, dataset: {}, focus: function () {}, addEventListener: function (t, f) { this['on' + t] = f; } }); }
  var ctx = {
    console: console, Date: Date, Math: Object.create(Math), JSON: JSON, String: String, Object: Object, Promise: Promise,
    setTimeout: function () {},
    localStorage: { getItem: function (k) { return k in store ? store[k] : null; }, setItem: function (k, v) { store[k] = String(v); } },
    document: { getElementById: function (id) { return el(id); } },
    sheet: { querySelectorAll: function () { return []; } },
    openSheet: function (h) { sheets.push(h); for (var k in els) delete els[k]; },
    esc: function (s) { return String(s); }, spk: function () { return ''; }, speak: function () {},
    toast: function (t) { toasts.push(t); }, S: { gold: 0 }, save: function () {},
    GameLog: { answer: function (ok, m) { logs.push({ ok: ok, ref: m.ref }); } }
  };
  ctx.window = ctx;
  ctx.Toolbox = { data: function () { return Promise.resolve(FAKE); }, upMove: function () { return ''; } };
  vm.createContext(ctx); vm.runInContext(src, ctx);
  return { ctx: ctx, store: store, els: els, logs: logs, sheets: sheets, el: el };
}
function ready(E) { E.ctx.ToolQ.preload(); return new Promise(function (r) { setImmediate(r); }); }
function J(E, k) { return JSON.parse(E.store[k] || '{}'); }
var DAY = 86400000;

async function scenario(label, src) {
  console.log('\n######## ' + label + ' ########');
  /* A. 到期題連按 6 次跳過 */
  var E = mkEnv(src); await ready(E); E.ctx.Math.random = function () { return 0.01; };
  var Q = E.ctx.ToolQ, items = Q._items(), c1 = items.filter(function (i) { return i.type === 'cloze' && i.fr === 'permettre à qn de + 原形'; })[0];
  var s = {}; s[c1.id] = { step: 0, due: Date.now() - 1, last: Date.now() - DAY, n: 1 }; E.store.clb7_toolbox_srs = JSON.stringify(s);
  var seen = [];
  for (var k = 0; k < 6; k++) { if (!Q.serve(function () {})) { seen.push('-'); continue; } var h = E.sheets[E.sheets.length - 1]; seen.push(h.indexOf(' aux TEST de TEST.') >= 0 ? '同一題' : '別題'); E.el('tbSkip').onclick(); }
  console.log('A 到期題連按 6 次「⏭ 跳過」：', seen.join(','));
  console.log('  跳過有沒有記進 clb7_toolbox_known：', E.store.clb7_toolbox_known ? JSON.stringify(J(E, 'clb7_toolbox_known')[c1.id] || '（這題沒記）') : '（沒有）');
  console.log('  GameLog：null', E.logs.filter(function (l) { return l.ok === null; }).length, '筆、作答', E.logs.filter(function (l) { return l.ok !== null; }).length, '筆；srs 有沒有被動：', JSON.stringify(J(E, 'clb7_toolbox_srs')[c1.id]));
  /* A2. 隔天：把 known.last 撥回昨天 → 到期題回來 */
  var kn = J(E, 'clb7_toolbox_known'); Object.keys(kn).forEach(function (id) { kn[id].last -= DAY; if (kn[id].kd) kn[id].kd -= DAY; }); E.store.clb7_toolbox_known = JSON.stringify(kn);
  Q.serve(function () {}); var h2 = E.sheets[E.sheets.length - 1];
  console.log('A2 隔天第一次遭遇是不是這題回來：', h2.indexOf(' aux TEST de TEST.') >= 0 ? '是（不刪、明天回來）' : '不是');

  /* B. 到期題按「會了」 */
  var E2 = mkEnv(src); await ready(E2); E2.ctx.Math.random = function () { return 0.01; };
  var s2 = {}; s2[c1.id] = { step: 0, due: Date.now() - 1, last: 1, n: 1 }; E2.store.clb7_toolbox_srs = JSON.stringify(s2);
  var same = 0;
  for (var k2 = 0; k2 < 6; k2++) { if (!E2.ctx.ToolQ.serve(function () {})) continue; var hh = E2.sheets[E2.sheets.length - 1]; if (hh.indexOf(' aux TEST de TEST.') >= 0) same++; E2.el('tbKnow').onclick(); }
  console.log('B 到期題連按 6 次「會了」，同一題出現', same, '次；known=', JSON.stringify(J(E2, 'clb7_toolbox_known')[c1.id]), '；srs=', JSON.stringify(J(E2, 'clb7_toolbox_srs')[c1.id]));

  /* C. 舊資料 {n,last}（2 天前按會了）再按跳過 → 會了的 3 天不被跳過延長，也不因跳過變成 3 天 */
  var E3 = mkEnv(src); await ready(E3); var f1 = E3.ctx.ToolQ._items().filter(function (i) { return i.type === 'flash'; })[0];
  var k3 = {}; k3[f1.id] = { n: 1, last: Date.now() - 2 * DAY }; E3.store.clb7_toolbox_known = JSON.stringify(k3);
  E3.ctx.ToolQ._flash(f1, function () {}); E3.el('tbSkip').onclick();
  console.log('C 舊資料按跳過後：', JSON.stringify(J(E3, 'clb7_toolbox_known')[f1.id]));

  /* D 降頻：見 weightCheck（D2） */

  /* E. 判分 */
  var cases = [
    ['avoir une influence / un impact sur…', 'a une influence'], ['avoir une influence / un impact sur…', 'a un impact'],
    ['chercher à / essayer de + 原形', 'essaient de'], ['chercher à / essayer de + 原形', 'essayent de'], ['chercher à / essayer de + 原形', 'cherchent'],
    ['chercher à / essayer de + 原形', 'cherchent à'], ['contribuer à + 原形／名詞', 'contribuent à'], ['contribuer à + 原形／名詞', 'contribuent'],
    ['contribuer à + 原形／名詞', 'les TEST contribuent'], ['permettre à qn de + 原形', 'TEST permet'], ['permettre à qn de + 原形', 'permet aux'],
    ['permettre à qn de + 原形', 'permettent'], ['décider de + 原形', 'décident'], ['décider de + 原形', 'decident de'],
    ['l’un(e) des meilleur(e)s…', 'l’une des meilleures'], ['l’un(e) des meilleur(e)s…', "l‘une des meilleures"],
    ['grâce à', 'grâce'], ['grâce à', 'grâce à'], ['cependant / toutefois / néanmoins', 'toutefois'], ['cependant / toutefois / néanmoins', 'neanmoins']
  ];
  var line = [];
  for (var i = 0; i < cases.length; i++) {
    var E5 = mkEnv(src); await ready(E5);
    var it = E5.ctx.ToolQ._items().filter(function (x) { return x.type === 'cloze' && x.fr === cases[i][0]; })[0];
    if (!it) { line.push('  ' + cases[i][0] + ' | （沒有填空題）'); continue; }
    E5.ctx.ToolQ._cloze(it, function () {}); E5.el('tbIn').value = cases[i][1]; E5.el('tbGo').onclick();
    var fb = E5.el('tbFb').innerHTML;
    line.push('  ' + cases[i][0] + ' | 空格=' + JSON.stringify(it.ans) + ' | 打 ' + JSON.stringify(cases[i][1]) + ' → ' + (E5.logs[0] && E5.logs[0].ok ? '對' : '錯') + (fb.indexOf('注意重音') >= 0 ? '（提醒重音）' : ''));
  }
  console.log('E 判分：\n' + line.join('\n'));

  /* F. 答錯後再按「會了」 */
  var E6 = mkEnv(src); await ready(E6); var c6 = E6.ctx.ToolQ._items().filter(function (i) { return i.type === 'cloze'; })[0];
  E6.ctx.ToolQ._cloze(c6, function () {}); E6.el('tbIn').value = 'xxx'; E6.el('tbGo').onclick(); E6.el('tbKnow').onclick();
  console.log('F 答錯後再按「會了」：GameLog', JSON.stringify(E6.logs.map(function (l) { return l.ok; })), '；known', E6.store.clb7_toolbox_known ? '有寫' : '沒寫', '；下排', E6.el('tbTail').style.display === 'none' ? '已收起' : '還在');

  /* G. 今天先不要：舊格式相容、按了之後 serve 不出、也不擋 cont */
  var E7 = mkEnv(src); await ready(E7); E7.ctx.Math.random = function () { return 0.01; };
  var old = { d: new Date().toDateString(), cloze: 4, flash: 2, off: 0 }; E7.store.clb7_toolbox_day = JSON.stringify(old);
  E7.ctx.ToolQ.serve(function () {}); var h7 = E7.sheets[E7.sheets.length - 1] || '';
  console.log('G 舊格式今日計數（填空已 4 題滿）：這次出', h7.indexOf('這句少了什麼') >= 0 ? '填空（✗ 上限沒擋）' : (h7 ? '反射卡（上限有接上）' : '沒出'));
  var E8 = mkEnv(src); await ready(E8); E8.ctx.Math.random = function () { return 0.01; };
  var cc = 0; E8.ctx.ToolQ.serve(function () { cc++; }); E8.el('tbOff').onclick();
  var after = []; for (var g = 0; g < 3; g++) after.push(E8.ctx.ToolQ.serve(function () {}));
  console.log('  按「今天先不要」：原遭遇 cont 被呼叫', cc, '次；之後 serve →', after.join(','), '；存的形狀', E8.store.clb7_toolbox_day);
  var d8 = J(E8, 'clb7_toolbox_day'); if (d8.off) { d8.off.d = 'Mon Jan 01 2001'; E8.store.clb7_toolbox_day = JSON.stringify(d8); console.log('  隔天（off 是舊日期）serve →', E8.ctx.ToolQ.serve(function () {})); }
}

/* D2：降頻手算——直接在修正版 context 裡呼叫內部 pick（用 vm 取出閉包外不到 → 另外暴露一份） */
async function weightCheck(src) {
  var s2 = src.replace("window.ToolQ={serve:serve,", "window.ToolQ={_pick:pick, serve:serve,");
  var E = mkEnv(s2); await ready(E); var Q = E.ctx.ToolQ;
  if (!Q._pick) { console.log('D2 （取不到 pick）'); return; }
  var fl = Q._items().filter(function (i) { return i.type === 'flash' && i.cat.id === 'effet'; }), tgt = fl[0];
  function rate(kn) { E.store.clb7_toolbox_known = JSON.stringify(kn); var h = 0, N = 4000; for (var t = 0; t < N; t++) if (Q._pick('flash').id === tgt.id) h++; return (h / N * 100).toFixed(1) + '%'; }
  var a = {}; var b = {}; b[tgt.id] = { n: 0, skip: 4, last: Date.now() - DAY }; var c = {}; c[tgt.id] = { n: 0, skip: 1, last: Date.now() };
  console.log('D2 同類 ' + fl.length + ' 張反射卡，目標卡被挑中比例：沒跳過過', rate(a), '／昨天以前跳過 4 次', rate(b), '／今天剛跳過', rate(c), '（今天剛跳過應為 0%，跳過多次應下降但不為 0）');
}

(async function () {
  var P = applyPatch(SRC);
  console.log('替換檢查：', P.bad.length ? '✗ ' + P.bad.join('；') : '✓ 全部 ' + PATCH.length + ' 處都在原檔剛好出現一次');
  try { new vm.Script(P.src); console.log('修正版語法：✓'); } catch (e) { console.log('修正版語法：✗', e.message); }
  await scenario('原版 toolbox_game.js', SRC);
  if (!P.bad.length) { await scenario('修正版（記憶體裡套草稿）', P.src); await weightCheck(P.src); }
  if (process.argv[2] === '--dump') fs.writeFileSync(process.argv[3], P.src);
})();
