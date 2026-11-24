// Q65（2026-11-24）字典屋第③階「用出來」判分核對——無人值守排程，⛔ 不改遊戲檔、不開 preview、不碰雲端
// 判分函式逐字抄自 town.html（行號見下），題庫讀本機 assets/tcf/exam/vocab/lucas_words.json（私人，不進公開 repo）
// 用法：node tools/tmp_q65_check.js
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');

// ── 逐字抄自 town.html ──
function deacc(x){ return String(x).normalize('NFD').replace(/[̀-ͯ]/g,''); }                       // town.html:536
function vNorm(x){ return String(x||'').toLowerCase().replace(/[’‘]/g,"'").replace(/\s+/g,' ').replace(/^[\s.,;:!?«»"]+|[\s.,;:!?«»"]+$/g,''); }   // town.html:1805
// town.html:1953-1954 的判分邏輯（包成函式）
function judge(input, a){ var v=vNorm(input); if(!v) return '（空白，不送出）';
  var want=vNorm(a), ok=v===want, acc=!ok && deacc(v)===deacc(want); return ok?'對':acc?'對＋提醒重音':'錯'; }

// ── 一、輸入方式（外殼字，不是教材）──
const cases = [
  ['完全正確', 'soutiennent', 'soutiennent'],
  ['大寫', 'soutiennent', 'Soutiennent'],
  ['句首大寫答案打小寫', 'Malgré', 'malgré'],
  ['漏重音', 'intègre', 'integre'],
  ['重音方向錯 è/é', 'intègre', 'intégre'],
  ['ç 打成 c', 'français', 'francais'],
  ['前後空白', 'logé', '  logé  '],
  ['結尾句點', 'logé', 'logé.'],
  ['句點後空白', 'logé', 'logé. '],
  ['結尾逗號', 'logé', 'logé,'],
  ['法式空格問號', 'logé', 'logé ?'],
  ['引號 « »', 'logé', '« logé »'],
  ['結尾刪節號 …（U+2026）', 'logé', 'logé…'],
  ['結尾連字號', 'logé', 'logé-'],
  ['œ 打成 oe', 'œuvre', 'oeuvre'],
  ['æ 打成 ae', 'curriculum vitæ', 'curriculum vitae'],
  ['拆開的重音字元（NFD）', 'logé', 'logé'],
  ['片語彎撇號 ’ vs 直撇號', "d'ailleurs", 'd’ailleurs'],
  ['片語左彎撇號 ‘', "d'ailleurs", 'd‘ailleurs'],
  ['片語 ʼ（U+02BC）', "d'ailleurs", 'dʼailleurs'],
  ['片語撇號後多空白', "d'ailleurs", "d' ailleurs"],
  ['片語不打撇號', "d'ailleurs", 'dailleurs'],
  ['片語中間多個空白', 'en revanche', 'en   revanche'],
  ['片語中間 nbsp', 'en revanche', 'en revanche'],
  ['片語內逗號少打', 'bref, ', 'bref'],
  ['連省音冠詞一起打', 'économie', "l'économie"],
  ['連冠詞一起打', 'chiffres', 'les chiffres'],
  ['連字號字只打前半', 'peut-être', 'peut'],
  ['連字號打成空白', 'peut-être', 'peut être'],
  ['陰陽性：打陽性', 'innovante', 'innovant'],
  ['單複數：打單數', 'chiffres', 'chiffre'],
  ['動詞：打原形', 'soutiennent', 'soutenir'],
  ['打錯一個字母', 'soutiennent', 'soutienent'],
];
console.log('=== 一、輸入方式 ===');
for (const [k, a, inp] of cases) console.log(k.padEnd(22, '　'), '|', JSON.stringify(a), '←', JSON.stringify(inp), '→', judge(inp, a));

// ── 二、題庫掃描 ──
const F = path.join(ROOT, 'assets/tcf/exam/vocab/lucas_words.json');
if (!fs.existsSync(F)) { console.log('找不到', F); process.exit(0); }
const W = JSON.parse(fs.readFileSync(F, 'utf8')).words;
const plain = t => deacc(String(t).toLowerCase().replace(/’/g, "'"));
function stemOf(w){ w = plain(w.replace(/^(le |la |les |l'|l’|se |s'|s’)/i, '').split(' / ')[0].trim()); return w.slice(0, Math.max(3, w.length - 4)); }  // 抄 lucas_words.py _stem
const TOK = /[A-Za-zÀ-ÖØ-öø-ÿœŒ]+(?:-[A-Za-zÀ-ÖØ-öø-ÿœŒ]+)*/g;   // 抄 lucas_vocab.py TOK
const all = [];
for (const w of W) for (const c of (w.cz || [])) all.push({ w, c });
const prod = W.filter(w => w.prod), prodNoCz = prod.filter(w => !(w.cz && w.cz.length));
console.log('\n=== 二、題庫 ===');
console.log('字數', W.length, '｜要會用(prod)', prod.length, '｜有挖空題的字', W.filter(w => w.cz && w.cz.length).length, '｜要會用但沒挖空題（升不上③）', prodNoCz.length, '｜挖空題總數', all.length);
console.log('要會用但沒挖空題（前 20）：', prodNoCz.slice(0, 20).map(w => w.disp).join('、'));

function analyse({ w, c }){
  const f = [];
  if (c.fr.slice(c.s, c.s + c.a.length) !== c.a) f.push('位置對不上');
  // 答案在句中出現幾次（不分大小寫、去重音、整字）
  const re = new RegExp('(?<![\\p{L}])' + plain(c.a).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?![\\p{L}])', 'gu');
  const n = (plain(c.fr).match(re) || []).length;
  if (n > 1) f.push('答案在句中出現 ' + n + ' 次（另一處會洩題）');
  if (w.pos !== 'PHR') {
    const st = stemOf(w.lemma);
    const toks = [...c.fr.matchAll(TOK)].map(m => m[0]).filter(t => plain(t).startsWith(st));
    if (toks.length > 1) f.push('句中有 ' + toks.length + ' 個字符合字根「' + st + '」：' + toks.join('／') + '（挖第一個）');
    // 挖到的字跟原形差很多 → 可能挖錯字
    const pa = plain(c.a), pl = plain(w.lemma.replace(/^(se |s'|s’)/, '').split(' / ')[0]);
    if (st.length <= 4 && Math.abs(pa.length - pl.length) >= 4) f.push('字根短（' + st + '）且挖到的「' + c.a + '」跟原形長度差很多，疑似挖錯字');
  }
  if (/[œæ]/i.test(c.a)) f.push('答案有 œ/æ（打 oe 會判錯）');
  if (/-/.test(c.a)) f.push('答案有連字號');
  if (/[’']/.test(c.a)) f.push('答案有撇號');
  if (c.s > 0 && /[’']$/.test(c.fr.slice(0, c.s))) f.push('前面緊貼省音（' + c.fr.slice(Math.max(0, c.s - 3), c.s) + '___）');
  return f;
}
const flagged = all.map(x => ({ x, f: analyse(x) }));
const cnt = {};
for (const { f } of flagged) for (const s of f) { const k = s.replace(/[「（].*$/, '').replace(/\d+/g, 'N'); cnt[k] = (cnt[k] || 0) + 1; }
console.log('全庫旗標統計：', cnt);
console.log('\n疑似挖錯字（全庫）：');
for (const { x, f } of flagged) if (f.some(s => /疑似挖錯字|個字符合字根/.test(s))) console.log(' -', x.w.disp, '|', x.c.a, '|', x.c.fr, '|', f.filter(s => /疑似|字根/.test(s)).join('；'));
console.log('\n答案出現多次（全庫）：');
for (const { x, f } of flagged) if (f.some(s => /出現 \d+ 次/.test(s))) console.log(' -', x.w.disp, '|', x.c.a, '|', x.c.fr);
console.log('\n有 œ/æ（全庫）：');
for (const { x, f } of flagged) if (f.some(s => /œ/.test(s))) console.log(' -', x.w.disp, '|', x.c.a);
console.log('\n前面緊貼省音（全庫，若連 l\' 一起打會判錯）：', flagged.filter(({ f }) => f.some(s => /省音/.test(s))).length, '題');

// 名詞／形容詞／副詞：挖到的字不是「原形去掉最後 2 個字母」開頭 → 列出來人工看（可能挖到別的字）
console.log('\n非動詞、挖到的字跟原形對不太上（人工看）：');
for (const { w, c } of all) { if (w.pos === 'VERB' || w.pos === 'PHR') continue;
  const pl = plain(w.lemma.replace(/^(le |la |les |l'|l’)/i, '').split(' / ')[0].trim()), pa = plain(c.a);
  if (!pa.startsWith(pl.slice(0, Math.max(3, pl.length - 2)))) console.log(' -', w.disp, '|', c.a, '|', c.fr); }
console.log('\n動詞：挖到的字列表（原形→挖到，去重）：');
const vm = {};
for (const { w, c } of all) if (w.pos === 'VERB') { (vm[w.lemma] = vm[w.lemma] || new Set()).add(c.a); }
console.log(Object.entries(vm).map(([k, s]) => k + '→' + [...s].join('/')).join('；'));

console.log('\n動詞挖到的字可能其實是名詞／形容詞（人工看）：');
for (const { w, c } of all) if (['résider', 'adresser', 'émerger', 'satisfaire', 'impressionner', 'provoquer'].includes(w.lemma) && c.a !== w.lemma) console.log(' -', w.lemma, '|', c.a, '|', c.fr);

// ── 三、固定種子抽 45 題人工看 ──
function mulberry32(a){ return function(){ a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const rnd = mulberry32(20261124), pool = all.slice();
for (let k = pool.length - 1; k > 0; k--) { const j = Math.floor(rnd() * (k + 1)); [pool[k], pool[j]] = [pool[j], pool[k]]; }
console.log('\n=== 三、抽樣 45 題（種子 20261124）===');
pool.slice(0, 45).forEach(({ w, c }, i) => {
  const shown = c.fr.slice(0, c.s) + '______' + c.fr.slice(c.s + c.a.length);
  console.log(String(i + 1).padStart(2), '[' + c.k + ']', w.disp, '(' + w.pos + ')', '｜答案', JSON.stringify(c.a), '｜', shown, '｜旗標：', analyse({ w, c }).join('；') || '—');
});
