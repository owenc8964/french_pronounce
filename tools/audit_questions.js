/* 題庫品質稽核（2026-10-15）——只讀不寫，可重跑
   用法：node tools/audit_questions.js            → 印統計＋每類前幾筆
         node tools/audit_questions.js --all      → 每類全部列出
         node tools/audit_questions.js --json F   → 另把全部結果寫成 JSON 檔 F
   對照判題邏輯：
     quiz.html  isCorrect(): 小寫、去 .,!?' 標點、不去重音；選擇題 opts 不洗牌（照原順序顯示）
     quest.html isAns(): 選擇題選項必須和 a 用 | 拆開後的某一段「逐字相等」（不做任何正規化）
   檢查項（編號對應報告）：
     C1  choose：正解不在 opts（quiz 判法／quest 判法分開算）、opts 裡有 ≥2 個被判對、opts 重複
     C2  選項洩漏：只有正解夾中文／破折號解釋、只有正解特別長；另算 quiz.html 正解位置分布
     C3  規則概念題：選項主要是中文
     C4  fill：空格數 vs a 的形狀、a 裡有整句、省音（le/la/de/je… + 母音）、a 有空段
     C5m 法文機械錯：à le / de le / à les / de les / si il / je+母音 等
     C7  陰陽性：BANK 裡出現的 un/une/le/la + 名詞 vs chunks.js 抽出的陰陽性 */
var fs = require('fs'), vm = require('vm'), path = require('path');
var ROOT = path.join(__dirname, '..');
var argv = process.argv.slice(2), SHOW_ALL = argv.indexOf('--all') >= 0;
var jsonOut = argv.indexOf('--json') >= 0 ? argv[argv.indexOf('--json') + 1] : null;

function load(file, name) {
  var ctx = {}; vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(ROOT, file), 'utf8') + ';this.__X=' + name + ';', ctx);
  return ctx.__X;
}
var BANK = load('questions.js', 'BANK');
var CHUNKS = load('chunks.js', 'CHUNKS');

var CJK = /[㐀-鿿（）、。：]/;
function cjkRatio(s) { s = String(s).replace(/\s/g, ''); if (!s) return 0; var n = 0; for (var c of s) if (/[㐀-鿿]/.test(c)) n++; return n / [...s].length; }
function quizNorm(s) { return String(s).toLowerCase().trim().replace(/[.,!?'`'’]/g, '').replace(/\s+/g, ' ').trim(); }
function alts(q) { return String(q.a).split('|'); }
function stripTags(s) { return String(s).replace(/<[^>]+>/g, ''); }

var R = { C4_partialAlt: [], C4_untypable: [], C1_noAnsQuiz: [], C1_noAnsQuest: [], C1_multiCorrect: [], C1_dupOpts: [], C1_multiAltInOpts: [],
          C2_onlyCorrectHasZh: [], C2_onlyCorrectHasDash: [], C2_correctLongest: [],
          C3_ruleConcept: [], C4_shape: [], C4_multiBlank: [], C4_elision: [], C4_emptyAlt: [], C4_noBlankFill: [],
          C5_mech: [], C7_gender: [] };
function add(k, i, msg) { R[k].push({ i: i, lesson: BANK[i].lesson, topic: BANK[i].topic, type: BANK[i].type, q: stripTags(BANK[i].q), a: BANK[i].a, opts: BANK[i].opts, msg: msg }); }

/* ── C1 / C2 / C3：選擇題 ───────────────────────────── */
var posDist = {}, chooseN = 0;
BANK.forEach(function (q, i) {
  if (q.type !== 'choose' || !q.opts) return;
  chooseN++;
  var A = alts(q), An = A.map(quizNorm);
  var okQuiz = q.opts.filter(function (o) { return An.indexOf(quizNorm(o)) >= 0; });
  var okQuest = q.opts.filter(function (o) { return A.indexOf(o) >= 0; });
  if (!okQuiz.length) add('C1_noAnsQuiz', i, '正解不在選項裡（quiz.html 判法也找不到）');
  else if (!okQuest.length) add('C1_noAnsQuest', i, 'quest/town 逐字比對找不到正解（quiz 正規化後才對得上）：' + okQuiz.join(' / '));
  if (okQuiz.length >= 2) add('C1_multiCorrect', i, '選項裡有 ' + okQuiz.length + ' 個都被判對：' + okQuiz.join(' / '));
  var seen = {}; q.opts.forEach(function (o) { var k = quizNorm(o); if (seen[k]) add('C1_dupOpts', i, '選項重複：' + o); seen[k] = 1; });
  if (A.length >= 2 && okQuiz.length === 1) { /* 多解但只有一個在選項——無害，不記 */ }
  /* 位置分布（quiz.html 不洗牌） */
  var pos = q.opts.findIndex(function (o) { return An.indexOf(quizNorm(o)) >= 0; });
  var key = q.opts.length + '選:' + pos; posDist[key] = (posDist[key] || 0) + 1;
  /* C3 規則概念題 */
  var zhOpts = q.opts.filter(function (o) { return cjkRatio(o) >= 0.5; }).length;
  if (zhOpts >= Math.ceil(q.opts.length / 2)) add('C3_ruleConcept', i, '選項中文為主（' + zhOpts + '/' + q.opts.length + '）');
  /* C2 洩漏 */
  if (pos >= 0 && q.opts.length >= 2) {
    var c = q.opts[pos], others = q.opts.filter(function (_, k) { return k !== pos; });
    var hasZh = function (o) { return CJK.test(o); };
    var hasDash = function (o) { return /——|—|–| - |（|\(/.test(o); };
    if (hasZh(c) && !others.some(hasZh) && cjkRatio(c) < 0.5) add('C2_onlyCorrectHasZh', i, '只有正解夾中文：' + c);
    else if (hasDash(c) && !others.some(hasDash)) add('C2_onlyCorrectHasDash', i, '只有正解帶破折號／括號說明：' + c);
    var maxO = Math.max.apply(null, others.map(function (o) { return o.length; }));
    if (c.length >= 12 && c.length >= maxO * 1.5) add('C2_correctLongest', i, '正解長度 ' + c.length + '，其他最長 ' + maxO);
  }
});

/* ── C4：填空題 ───────────────────────────────────── */
var VOWEL = /^[aeiouyàâäéèêëîïôöùûüœh]/i;
var H_ASPIRE = /^(haut|hall|hamburger|handicap|haricot|hasard|hâte|hausse|héros|hibou|hockey|homard|honte|hors|hotte|houx|huit|hamac|hanche|harpe|hache|haine|hareng|hérisson|hiérarchie|huée|hurl|hublot|hongr|hollan|hong)/i;
var ELIDE = /(^|[\s«"(])(le|la|de|je|me|te|se|ne|que|jusque|lorsque|puisque)\s+([a-zàâäéèêëîïôöùûüœ][\wÀ-ſ'-]*)/gi;
function elisionHits(s) {
  var out = [], m; ELIDE.lastIndex = 0;
  while ((m = ELIDE.exec(s))) {
    var w = m[3];
    if (!VOWEL.test(w)) continue;
    if (/^h/i.test(w) && H_ASPIRE.test(w)) continue;
    if (/^(oui|onze|onzième|yaourt|yoga|uh)/i.test(w)) continue;
    if (/^(le|la)$/i.test(m[2]) && /^(un|une)$/i.test(w)) continue; /* le un / la une（報紙頭版）罕見，略過 */
    out.push(m[2] + ' ' + w);
  }
  return out;
}
BANK.forEach(function (q, i) {
  if (q.type !== 'fill') return;
  var stem = stripTags(q.q), blanks = (stem.match(/_{2,}|…{2,}|\.{4,}/g) || []).length;
  var A = alts(q);
  if (A.some(function (x) { return !x.trim(); })) add('C4_emptyAlt', i, 'a 有空段（|| 或結尾 |）');
  if (!blanks) { add('C4_noBlankFill', i, 'fill 題幹沒有空格（改寫題／問答題）'); return; }
  var frame = stem.replace(/（[^）]*）|\([^)]*\)/g, ' ').replace(/_{2,}|…{2,}|\.{4,}/g, ' ').replace(/[^\sA-Za-zÀ-ÿœŒ'’-]/g, ' ').split(/\s+/).filter(function (w) { return /[A-Za-zÀ-ÿ]{2,}/.test(w); });
  var frameWords = frame.length;
  /* 每個 alt 的字數；若所有 alt 都包含題幹大部分字 → 使用者要在一個空格打整句 */
  var shortAlt = A.some(function (x) {
    var ws = x.split(/\s+/).filter(Boolean);
    var overlap = ws.filter(function (w) { return frame.indexOf(w.replace(/[.,!?]/g, '')) >= 0; }).length;
    return overlap < Math.max(2, frameWords * 0.6);
  });
  if (!shortAlt && frameWords >= 2) add('C4_shape', i, '題幹 ' + blanks + ' 個空格，但每個正解都是整句（得在空格打整句才對）');
  if (blanks >= 2) {
    R.C4_partialAlt = R.C4_partialAlt || [];
    var part = A.filter(function (x) { return x.trim().split(/[\s,／/]+/).filter(Boolean).length < blanks; });
    if (part.length) R.C4_partialAlt.push({ i: i, lesson: q.lesson, topic: q.topic, type: q.type, q: stem, a: q.a, msg: blanks + ' 個空格，但只填一部分也判對：' + part.join(' / ') });
    var sepAlt = A.filter(function (x) { return /\s\/\s|…|\.\.\.|,|\s/.test(x); });
    if (!sepAlt.length) add('C4_multiBlank', i, blanks + ' 個空格但正解只有單字：' + q.a);
  }
  /* 省音：把每個 alt 填回題幹（單空格時），或 alt 本身是整句 */
  var hits = [];
  A.forEach(function (x) {
    var sent = blanks === 1 && shortAlt ? stem.replace(/（[^）]*）|\([^)]*\)/g, '').replace(/_{2,}|…{2,}|\.{4,}/, x) : x;
    elisionHits(sent).forEach(function (h) { if (hits.indexOf(h) < 0) hits.push(h); });
  });
  if (hits.length) add('C4_elision', i, '填回後出現未省音：' + hits.join('、'));
});

/* C4b：空格後接母音／子音，正解卻收了相反的省音形（例：je _____ embrasse 收 le；_____ ils 收 que） */
R.C4_elisionAlt = [];
var ELI = { "l'": ['le', 'la'], "qu'": ['que'], "d'": ['de'], "j'": ['je'], "n'": ['ne'], "s'": ['se', 'si'], "m'": ['me'], "t'": ['te'] };
BANK.forEach(function (q, i) {
  if (q.type !== 'fill' && q.type !== 'choose') return;
  var stem = stripTags(q.q); if ((stem.match(/_{2,}/g) || []).length !== 1) return;
  var after = (stem.split(/_{2,}/)[1] || '').replace(/^\s*(\([^)]*\)|（[^）]*）)?\s*/, '');
  var nextVowel = /^[aeiouyàâéèêëîïôöùûœ]/i.test(after) || (/^h/i.test(after) && !H_ASPIRE.test(after));
  var A = q.type === 'choose' ? alts(q) : alts(q).filter(function (x) { return x.split(/\s+/).length <= 2; });
  A.forEach(function (x) {
    var last = x.trim().split(/\s+/).pop().toLowerCase();
    if (nextVowel && /^(le|la|que|de|je|ne|se|me|te)$/.test(last)) R.C4_elisionAlt.push({ i: i, lesson: q.lesson, topic: q.topic, type: q.type, q: stem, a: q.a, opts: q.opts, msg: '空格後接母音「' + after.slice(0, 15) + '」，正解卻收「' + x + '」（應省音）' });
    if (!nextVowel && /'$/.test(last) && after && /^[a-zç]/i.test(after) && !/^h/i.test(after)) R.C4_elisionAlt.push({ i: i, lesson: q.lesson, topic: q.topic, type: q.type, q: stem, a: q.a, opts: q.opts, msg: '空格後接子音「' + after.slice(0, 15) + '」，正解卻收省音形「' + x + '」' });
  });
});

/* C6m：aNote 裡寫了「Corrigés：X」（課本解答），X 卻不含任何一個正解 → 可能 aNote 與 a 矛盾 */
R.C6_corriges = [];
BANK.forEach(function (q, i) {
  var note = stripTags(q.aNote || ''), m = note.match(/Corrig[ée]s\s*[：:]\s*([^。（(⚠️]+)/);
  if (!m) return;
  var cor = quizNorm(m[1]).replace(/…/g, ' ');
  var hit = alts(q).some(function (x) { var n = quizNorm(x); return n && (cor.indexOf(n) >= 0 || n.indexOf(cor) >= 0); });
  if (!hit) R.C6_corriges.push({ i: i, lesson: q.lesson, topic: q.topic, type: q.type, q: stripTags(q.q), a: q.a, opts: q.opts, msg: 'aNote 的課本解答「' + m[1].trim().slice(0, 60) + '」不含正解' });
});

/* C4c：打字題（沒有 opts）的每個正解都夾「→」或「中文＋法文混寫」→ 實際上打不出來 */
R.C4_untypable = [];
BANK.forEach(function (q, i) {
  if (q.opts) return;
  var bad = alts(q).every(function (x) { return /→/.test(x) || (/[\u4e00-\u9fff]/.test(x) && /[A-Za-zÀ-ÿ]{2,}/.test(x)); });
  if (bad) R.C4_untypable.push({ i: i, lesson: q.lesson, topic: q.topic, type: q.type, q: stripTags(q.q), a: q.a, msg: '打字題，但正解只有「中文／箭頭＋法文」的寫法，幾乎不可能逐字打對' });
});

/* ── C5m：法文機械錯（所有題型的 a、法文 q、aNote） ─────── */
var L = '[A-Za-zÀ-ÿœŒ]'; /* JS 的 \b 不認重音字母（même 會被當成 me），自己做邊界 */
function W(src, flags) { return new RegExp('(?<!' + L + ')' + src + '(?!' + L + ')', flags || 'i'); }
var MECH = [
  [W('à le'), 'à le → au'], [W('à les'), 'à les → aux'], [W('de le(?! (?:mien|tien|sien|nôtre|vôtre|leur)(?!' + L + '))'), 'de le → du'],
  [W('de les'), 'de les → des'], [W('si ils?'), 'si il → s\'il'],
  [new RegExp('(?<!' + L + ')(?:je|me|te|se|ne|que|le|la|de|jusque|lorsque|puisque) (?=[aeiouyàâéèêëîïôöùûœh])', 'i'), '未省音（le/la/de/que/je/me/te/se/ne ＋母音）'],
  [/\s{2,}\S/, '連續空白'], [W('ca va'), 'ça 少 cédille']
];
/* 選擇題的「錯誤選項」本來就可以是錯的法文（如 se ont、de les）→ 只查正解、題幹、填回後的句子 */
BANK.forEach(function (q, i) {
  var fields = [];
  var stem = stripTags(q.q);
  alts(q).forEach(function (x) {
    fields.push(['a', x]);
    var isWhole = x.split(/\s+/).length >= 3 && x.split(/\s+/).filter(function (w) { return stem.indexOf(w.replace(/[.,!?]/g, '')) >= 0; }).length >= 2;
    if (/_{2,}/.test(stem) && (stem.match(/_{2,}/g) || []).length === 1 && !isWhole)
      fields.push(['填回', stem.replace(/（[^）]*）|\([^)]*\)/g, '').replace(/_{2,}/, x).replace(/\s+/g, ' ')]);
  });
  if (!CJK.test(stem)) fields.push(['q', stem]);
  var msgs = [];
  fields.forEach(function (f) {
    MECH.forEach(function (m) {
      var mm = f[1].match(m[0]); if (!mm) return;
      if (/未省音/.test(m[1])) { /* h aspiré、「le un」、題幹本身留空的 _____ 之前 */
        var after = f[1].slice(mm.index + mm[0].length); if (H_ASPIRE.test(after) || /^(oui|onze|un |une |yoga)/i.test(after)) return; }
      if (f[0] === 'q' && /連續空白/.test(m[1])) { msgs.push('q：題幹有連續空白（排版，無害）'); return; }
      msgs.push(f[0] + '：' + m[1] + '「' + f[1].slice(0, 80) + '」');
    });
  });
  if (msgs.length) add('C5_mech', i, msgs.join('；'));
});

/* ── C7：陰陽性 ───────────────────────────────────── */
var G = {}; /* word → {m:n, f:n, ex:[]} 來自 chunks */
function gTag(det) { det = det.toLowerCase(); return (det === 'un' || det === 'le' || det === 'du' || det === 'au' || det === 'ce' || det === 'mon' || det === 'ton' || det === 'son') ? 'm' : 'f'; }
var DETRE = /(?:^|[\s«"(’'])(un|une|le|la)\s+([a-zàâäéèêëîïôöùûüœç][a-zàâäéèêëîïôöùûüœç-]{2,})/gi;
var NOT_NOUN = /^(plus|moins|très|trop|bien|mieux|même|seul|seule|premier|première|dernier|dernière|petit|petite|grand|grande|bon|bonne|beau|belle|nouveau|nouvelle|vieux|vieille|jeune|gros|grosse|meilleur|meilleure|mauvais|mauvaise|faire|voir|dire|prendre|mettre|donner|lui|leur|leurs|plupart|moitié|veille|fois|sien|sienne|mien|mienne|tien|tienne|nôtre|vôtre|quel|quelle|lequel|laquelle|autre|même|vraie|vrai|haute|haut|long|longue|joli|jolie|cher|chère|demi|demie|deux|trois|quatre|cinq|six|sept|huit|neuf|dix|cent|mille)$/i;
CHUNKS.forEach(function (c) {
  var s = String(c.fr || ''), m; DETRE.lastIndex = 0;
  while ((m = DETRE.exec(s))) {
    var w = m[2].toLowerCase(); if (NOT_NOUN.test(w)) continue;
    /* le/la 後面是動詞的（代名詞 le/la）：略過以 -er/-ir/-re 結尾且前一個字是主詞代名詞 */
    var before = s.slice(0, m.index).trim().split(/\s+/).pop() || '';
    if (/^(le|la)$/i.test(m[1]) && /^(je|tu|il|elle|on|nous|vous|ils|elles|ne|pour|de|à|me|te|se|j'|n'|peux|veux|dois|vais|va)$/i.test(before)) continue;
    G[w] = G[w] || { m: 0, f: 0, ex: [] }; G[w][gTag(m[1])]++; if (G[w].ex.length < 3) G[w].ex.push(c.id);
  }
});
var BOTH = /^(tour|livre|poste|mode|manche|voile|critique|physique|mémoire|moule|page|vase|somme|mort|aide|garde|guide|œuvre|personne|vapeur|pendule|mousse|merci|radio|photo|moto|interne|élève|journaliste|artiste|collègue|secrétaire|ministre|enfant|touriste|médecin|dentiste|pianiste|camarade|malade|cadre|cuisinière)$/i;
function bankGenderClaims(q) {
  var claims = [], texts = [];
  alts(q).forEach(function (x) { texts.push(x); });
  if (!CJK.test(q.q) || q.type === 'fill') texts.push(stripTags(q.q).replace(/_{2,}/g, ' ___ '));
  if (q.type === 'choose' && q.opts) { /* 只看正解 */ }
  texts.forEach(function (s) {
    var m; DETRE.lastIndex = 0;
    while ((m = DETRE.exec(s))) {
      var w = m[2].toLowerCase(); if (NOT_NOUN.test(w)) continue;
      var before = s.slice(0, m.index).trim().split(/\s+/).pop() || '';
      if (/^(le|la)$/i.test(m[1]) && /^(je|tu|il|elle|on|nous|vous|ils|elles|ne|pour|de|à|me|te|se|j'|n'|peux|veux|dois|vais|va|___)$/i.test(before)) continue;
      claims.push({ w: w, g: gTag(m[1]), det: m[1] });
    }
  });
  /* gender 題的明文宣告 */
  var t = stripTags(q.aNote || '') + ' ' + q.a;
  var re = /([a-zàâäéèêëîïôöùûüœç-]{3,})（(m|f)[,，）\s]/g, mm;
  while ((mm = re.exec(t))) claims.push({ w: mm[1].toLowerCase(), g: mm[2], det: '（' + mm[2] + '）' });
  return claims;
}
var C7stat = { claims: 0, inChunks: 0 }, BG = {};
BANK.forEach(function (q, i) {
  var seen = {};
  bankGenderClaims(q).forEach(function (c) {
    C7stat.claims++; if (G[c.w]) C7stat.inChunks++;
    BG[c.w] = BG[c.w] || { m: [], f: [] }; if (BG[c.w][c.g].indexOf(i) < 0) BG[c.w][c.g].push(i);
    var g = G[c.w]; if (!g || seen[c.w]) return;
    var other = c.g === 'm' ? 'f' : 'm';
    if (g[other] >= 1 && g[c.g] === 0 && !BOTH.test(c.w)) {
      seen[c.w] = 1;
      add('C7_gender', i, '「' + c.det + ' ' + c.w + '」→ 題庫當 ' + c.g + '，chunks 裡只出現 ' + other + '（' + g[other] + ' 次，例 ' + g.ex[0] + '）');
    }
  });
});

/* C7b：題庫內部自己矛盾（同一個名詞在不同題被當成 m 和 f） */
R.C7b_bankInternal = [];
Object.keys(BG).forEach(function (w) {
  var x = BG[w]; if (!x.m.length || !x.f.length || BOTH.test(w)) return;
  R.C7b_bankInternal.push({ i: x.m[0], lesson: BANK[x.m[0]].lesson, topic: BANK[x.m[0]].topic, type: BANK[x.m[0]].type, q: w, a: '', msg: '題庫內 ' + w + '：當 m 的題 #' + x.m.slice(0, 6).join(',#') + '；當 f 的題 #' + x.f.slice(0, 6).join(',#') + '｜chunks m/f=' + (G[w] ? G[w].m + '/' + G[w].f : '無') });
});

/* ── 輸出 ─────────────────────────────────────────── */
console.log('BANK 總題數', BANK.length, '｜choose', chooseN, '｜chunks', CHUNKS.length, '｜chunks 抽出有冠詞的名詞', Object.keys(G).length);
console.log('C7 比對：題庫裡抽到冠詞＋名詞 ' + C7stat.claims + ' 次，其中 ' + C7stat.inChunks + ' 次能在 chunks 找到同字');
var order = Object.keys(R);
console.log('\n=== 各類數量 ===');
order.forEach(function (k) { console.log(k.padEnd(24), R[k].length); });
var c3v = R.C3_ruleConcept.filter(function (x) { return /意思|是什麼|是？|指的是|指什麼|是哪|什麼運動|什麼溫度/.test(x.q) && !/差|為什麼|放哪|位置|規則|時態|哪一式|語氣|用什麼/.test(x.q); }).length;
console.log('  └ C3 粗分：問字義（中文選項＝翻譯）' + c3v + '｜問規則／用法概念 ' + (R.C3_ruleConcept.length - c3v) + '（關鍵字粗分，有誤差）');
var c3set = {}; R.C3_ruleConcept.forEach(function (x) { c3set[x.i] = 1; });
var leakU = {}; ['C2_onlyCorrectHasZh', 'C2_onlyCorrectHasDash', 'C2_correctLongest'].forEach(function (k) { R[k].forEach(function (x) { leakU[x.i] = 1; }); });
var lk = Object.keys(leakU); console.log('  └ C2 三項聯集 ' + lk.length + ' 題：其中法文選項題 ' + lk.filter(function (i) { return !c3set[i]; }).length + '、中文選項題 ' + lk.filter(function (i) { return c3set[i]; }).length);
console.log('\n=== quiz.html 選擇題正解位置分布（opts 不洗牌，0＝第一個） ===');
Object.keys(posDist).sort().forEach(function (k) { console.log('  ' + k.padEnd(8), posDist[k]); });
var qmarkN = BANK.filter(function (q) { return alts(q).some(function (x) { return /[a-zé]\?$/.test(x); }); }).length;
console.log('\n（排版統計）a 裡問號前沒空格的題數：', qmarkN);
order.forEach(function (k) {
  var list = R[k]; if (!list.length) return;
  console.log('\n── ' + k + '（' + list.length + '）');
  (SHOW_ALL ? list : list.slice(0, 8)).forEach(function (x) {
    console.log('  #' + x.i + ' L' + x.lesson + ' ' + x.topic + ' [' + x.type + ']｜' + x.q.slice(0, 80) + '｜a=' + x.a + (x.opts ? '｜opts=' + JSON.stringify(x.opts) : '') + '\n      → ' + x.msg);
  });
  if (!SHOW_ALL && list.length > 8) console.log('  …（--all 看全部）');
});
if (jsonOut) { fs.writeFileSync(jsonOut, JSON.stringify(R, null, 1)); console.log('\nJSON →', jsonOut); }
