/* gen_town_field_extra.js — 把 questions.js 的 fill 題轉成 town.html 路上用的快速選擇題
 *
 * 用法：node tools/gen_town_field_extra.js            → 寫出 tools/town_field_extra.js
 *       node tools/gen_town_field_extra.js --report   → 另外印出丟棄統計＋每題干擾項來源
 *
 * ⛔ 鐵則：題幹 q 與正解 a 原樣來自 questions.js（BANK[src]），只有干擾項是新產生的，而且必須是錯的。
 *    干擾項只從「結構上一定錯」的地方來：
 *      ① 主詞已固定 → 同一動詞、同一時態的「其他人稱」形式（Je _____ → aimes / aiment）
 *      ② 封閉詞類的「性／數／母音縮寫」錯配，而且只用前後文已經鎖死的那個維度
 *         （mon/ma/mes 只換性數、不換人稱；ce/cet/cette；le/la/l'；de le／à le 這種一定錯的未縮合形）
 *      ③ 題目 hint／aNote 明確點名的錯誤形式，⚠️ 但要過人工白名單（HINT_OK）——
 *         有些點名的其實是合文法的（il est chaud、plus mauvais），不能拿來當錯的
 *    拿不準的維度一律不換；湊不到 2 個干擾項就整題丟掉並記原因。
 *    「cue」＝ 選項本身合文法，要靠題幹裡看得見的線索（(+)/(−)、中文翻譯、(xxx, vous)）才判錯——另外標記，town 可自行決定要不要用。
 */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..');
const ctx = {}; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'questions.js'), 'utf8') + ';this.BANK=BANK;', ctx);
const BANK = ctx.BANK;
const VF = require(path.join(ROOT, 'verbs_full.js'));

/* 跟 town.html 同一張分家表（⚠️ 原樣抄，不改） */
const FAM = {
  verb: /passe|imparfait|conditionnel|futur|subjonctif|reflexive|verbs|etre-avoir|imperative|accord-participe|pouvoir|gerondif|condition-si|discours|ilfaut|recit|duree|negation|restriction|forme-passive|interdiction|cause-consequence|expression-but/,
  pron: /pronom|qui-que|on-vs-nous|cod/,
  noun: /article|adjective|demonstrative-adj|possessives|tout-chaque|comparaison|superlatif|cest-il|mise-en-relief|intensite|preposition|question-words/
};
const famOf = t => { for (const k in FAM) if (FAM[k].test(t)) return k; return null; };

/* ── 共用 ─────────────────────────────────────────── */
const deacc = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '');
/* 跟 town.html 的 normAns 同一套（去重音、小寫、’→'、去標點）——town 判對錯就是用這個，所以干擾項不可跟正解在這套下相等 */
const norm = x => deacc(String(x)).toLowerCase().replace(/[’]/g, "'").replace(/[.,!?;:«»"]/g, '').replace(/\s+/g, ' ').trim();
/* que ≡ qu'、de ≡ d'、le/la ≡ l' 之類的縮寫變體：比對「是不是同一個答案」時要算同一個 */
const elideKey = x => norm(x).replace(/\b(qu|d|l|j|m|t|s|n|c)'(?=\s|$)/g, (m, a) => ({ qu: 'que', d: 'de', j: 'je', m: 'me', t: 'te', s: 'se', n: 'ne', c: 'ce' }[a] || a + "'")).replace(/\s+/g, ' ').trim();
const CJK = /[　-〿㐀-鿿＀-￯]/;
const isVowel = w => /^[aeiouyâàäéèêëîïôöûùüœæh]/i.test(w || '');
const startsVowelStrict = w => /^[aeiouyâàäéèêëîïôöûùüœæ]/i.test(w || '');
function lev(a, b) {
  a = deacc(a.toLowerCase()); b = deacc(b.toLowerCase());
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}
const capLike = (model, s) => /^[A-ZÀ-Ý]/.test(model) ? s.charAt(0).toUpperCase() + s.slice(1) : s;

/* 不分陰陽的名詞（換性別可能也對 → 不換）、單複同形的名詞（換單複可能也對 → 不換） */
const EPICENE = new Set('enfant enfants élève élèves collègue collègues artiste artistes journaliste journalistes secrétaire camarade touriste touristes propriétaire partenaire adulte adultes bénévole responsable membre membres juge ministre guide guides médecin professeur prof profs cadre concierge dentiste pianiste photographe psychologue sosie sosies star après-midi mannequin mannequins personne'.split(' '));
const INVARIABLE = new Set('pays fois prix choix voix nez gaz fils cours temps corps repas souris bras dos poids bois mois avis ananas jus os croix noix héros discours concours univers tapis colis palais puits radis riz frais gens remords progrès succès procès accès excès'.split(' '));

/* ── 動詞變位表：verbs_full.js 的 25 個 ＋ 規則動詞推導 ＋ 字首衍生 ─────────────── */
const TENSES = ['present', 'imparfait', 'futur-simple', 'conditionnel', 'subjonctif'];
const ETRE_VERBS = new Set('aller venir arriver partir entrer rentrer monter descendre tomber naître mourir rester retourner devenir revenir passer sortir repartir redescendre remonter'.split(' '));
const ETRE_ALSO_TRANSITIVE = new Set('sortir rentrer monter descendre passer retourner'.split(' '));
const TABLE = {};   // inf → {inf, aux, pp, ppr, imper:[tu,nous,vous], t:{present:[6],...}}
function fromVF(v) {
  const cj = VF.conjugate(v), t = {};
  cj.forEach(x => { if (TENSES.includes(x.id)) t[x.id] = x.forms.slice(); });
  return { inf: v.inf, aux: v.aux, pp: v.pp, ppr: VF.participePresent(v), imper: VF.imperatif(v), t };
}
VF.VERBS_FULL.forEach(v => { TABLE[v.inf] = fromVF(v); });
const END = { pres: ['e', 'es', 'e', 'ons', 'ez', 'ent'], imp: ['ais', 'ais', 'ait', 'ions', 'iez', 'aient'], fut: ['ai', 'as', 'a', 'ons', 'ez', 'ont'], subj: ['e', 'es', 'e', 'ions', 'iez', 'ent'] };
function regER(inf) {
  if (!/er$/.test(inf) || inf === 'aller') return null;
  const st = inf.slice(0, -2);
  if (/ayer$/.test(inf)) return null;                         // payer：paie/paye 兩種都對 → 不推
  let boot = st, futSt = inf;
  if (/[ou]yer$/.test(inf)) { boot = st.replace(/y$/, 'i'); futSt = boot + 'er'; }
  else if (/^(appeler|rappeler|épeler|jeter|rejeter|renouveler)$/.test(inf)) { boot = st + st.slice(-1); futSt = boot + 'er'; }
  else if (/é[^aeiouyéèê]+$/.test(st)) { boot = st.replace(/é([^aeiouyéèê]+)$/, 'è$1'); futSt = inf; }
  else if (/e[^aeiouyéèê]+$/.test(st) && /(ach|lev|men|pes|gel|amen|achev|promen|emmen|enlev|soulev|élev)e?t?$/.test(st.replace(/e([^aeiouyéèê]+)$/, '$1'))) { boot = st.replace(/e([^aeiouyéèê]+)$/, 'è$1'); futSt = boot + 'er'; }
  const soft = st.replace(/g$/, 'ge').replace(/c$/, 'ç');       // 在 a/o 前
  const pres = [boot + 'e', boot + 'es', boot + 'e', soft + 'ons', st + 'ez', boot + 'ent'];
  const imp = END.imp.map((e, i) => (i === 3 || i === 4 ? st : soft) + e);
  return { inf, aux: ETRE_VERBS.has(inf) ? 'être' : 'avoir', pp: st + 'é', ppr: soft + 'ant', imper: [boot + 'e', soft + 'ons', st + 'ez'],
    t: { present: pres, imparfait: imp, 'futur-simple': END.fut.map(e => futSt + e), conditionnel: END.imp.map(e => futSt + e),
         subjonctif: END.subj.map((e, i) => (i === 3 || i === 4 ? st : boot) + e) } };
}
function regIR(inf) {           // finir 型（第二組）
  if (!/ir$/.test(inf)) return null;
  const st = inf.slice(0, -2), s2 = st + 'iss';
  return { inf, aux: 'avoir', pp: st + 'i', ppr: s2 + 'ant', imper: [st + 'is', s2 + 'ons', s2 + 'ez'],
    t: { present: [st + 'is', st + 'is', st + 'it', s2 + 'ons', s2 + 'ez', s2 + 'ent'], imparfait: END.imp.map(e => s2 + e),
         'futur-simple': END.fut.map(e => inf + e), conditionnel: END.imp.map(e => inf + e), subjonctif: END.subj.map(e => s2 + e) } };
}
function regPARTIR(inf, aux) {  // partir 型：dormir／sentir／servir／mentir（單數去掉詞幹最後一個子音）
  const st = inf.slice(0, -2), sg = st.slice(0, -1);
  return { inf, aux, pp: st + 'i', ppr: st + 'ant', imper: [sg + 's', st + 'ons', st + 'ez'],
    t: { present: [sg + 's', sg + 's', sg + 't', st + 'ons', st + 'ez', st + 'ent'], imparfait: END.imp.map(e => st + e),
         'futur-simple': END.fut.map(e => inf + e), conditionnel: END.imp.map(e => inf + e), subjonctif: END.subj.map(e => st + e) } };
}
function regOUVRIR(inf) {       // ouvrir／offrir／découvrir／souffrir：現在式長得像 -er
  const st = inf.slice(0, -2);
  return { inf, aux: 'avoir', pp: st.replace(/r$/, '') + 'ert', ppr: st + 'ant', imper: [st + 'e', st + 'ons', st + 'ez'],
    t: { present: END.pres.map(e => st + e), imparfait: END.imp.map(e => st + e), 'futur-simple': END.fut.map(e => inf + e),
         conditionnel: END.imp.map(e => inf + e), subjonctif: END.subj.map(e => st + e) } };
}
function regRE(inf) {           // vendre 型
  const st = inf.slice(0, -2);
  return { inf, aux: ETRE_VERBS.has(inf) ? 'être' : 'avoir', pp: st + 'u', ppr: st + 'ant', imper: [st + 's', st + 'ons', st + 'ez'],
    t: { present: [st + 's', st + 's', st, st + 'ons', st + 'ez', st + 'ent'], imparfait: END.imp.map(e => st + e),
         'futur-simple': END.fut.map(e => st + 'r' + e), conditionnel: END.imp.map(e => st + 'r' + e), subjonctif: END.subj.map(e => st + e) } };
}
/* 手寫的幾個高頻不規則（只當干擾項池；正解一定要在表裡對得上人稱才會用，見 findForm） */
function manual(inf, aux, pp, ppr, pres, impSt, futSt, subj, imper) {
  return { inf, aux, pp, ppr, imper, t: { present: pres, imparfait: END.imp.map(e => impSt + e), 'futur-simple': END.fut.map(e => futSt + e),
    conditionnel: END.imp.map(e => futSt + e), subjonctif: subj } };
}
const MANUAL = {
  suivre: manual('suivre', 'avoir', 'suivi', 'suivant', ['suis', 'suis', 'suit', 'suivons', 'suivez', 'suivent'], 'suiv', 'suivr', ['suive', 'suives', 'suive', 'suivions', 'suiviez', 'suivent'], ['suis', 'suivons', 'suivez']),
  vivre: manual('vivre', 'avoir', 'vécu', 'vivant', ['vis', 'vis', 'vit', 'vivons', 'vivez', 'vivent'], 'viv', 'vivr', ['vive', 'vives', 'vive', 'vivions', 'viviez', 'vivent'], ['vis', 'vivons', 'vivez']),
  courir: manual('courir', 'avoir', 'couru', 'courant', ['cours', 'cours', 'court', 'courons', 'courez', 'courent'], 'cour', 'courr', ['coure', 'coures', 'coure', 'courions', 'couriez', 'courent'], ['cours', 'courons', 'courez']),
  recevoir: manual('recevoir', 'avoir', 'reçu', 'recevant', ['reçois', 'reçois', 'reçoit', 'recevons', 'recevez', 'reçoivent'], 'recev', 'recevr', ['reçoive', 'reçoives', 'reçoive', 'recevions', 'receviez', 'reçoivent'], ['reçois', 'recevons', 'recevez']),
  apercevoir: manual('apercevoir', 'avoir', 'aperçu', 'apercevant', ['aperçois', 'aperçois', 'aperçoit', 'apercevons', 'apercevez', 'aperçoivent'], 'apercev', 'apercevr', ['aperçoive', 'aperçoives', 'aperçoive', 'apercevions', 'aperceviez', 'aperçoivent'], ['aperçois', 'apercevons', 'apercevez']),
  croire: manual('croire', 'avoir', 'cru', 'croyant', ['crois', 'crois', 'croit', 'croyons', 'croyez', 'croient'], 'croy', 'croir', ['croie', 'croies', 'croie', 'croyions', 'croyiez', 'croient'], ['crois', 'croyons', 'croyez']),
  éteindre: manual('éteindre', 'avoir', 'éteint', 'éteignant', ['éteins', 'éteins', 'éteint', 'éteignons', 'éteignez', 'éteignent'], 'éteign', 'éteindr', ['éteigne', 'éteignes', 'éteigne', 'éteignions', 'éteigniez', 'éteignent'], ['éteins', 'éteignons', 'éteignez']),
  peindre: manual('peindre', 'avoir', 'peint', 'peignant', ['peins', 'peins', 'peint', 'peignons', 'peignez', 'peignent'], 'peign', 'peindr', ['peigne', 'peignes', 'peigne', 'peignions', 'peigniez', 'peignent'], ['peins', 'peignons', 'peignez']),
};
const RE_REG = new Set('vendre attendre rendre perdre entendre répondre descendre défendre tendre mordre fondre correspondre'.split(' '));
const PARTIR_T = { dormir: 'avoir', sentir: 'avoir', servir: 'avoir', mentir: 'avoir', ressentir: 'avoir', repartir: 'être' };
const OUVRIR_T = new Set('ouvrir offrir découvrir souffrir couvrir'.split(' '));
const IR_IRREG = new Set('partir sortir dormir venir tenir ouvrir offrir courir mourir servir sentir accueillir cueillir découvrir souffrir mentir acquérir fuir obtenir revenir devenir repartir ressentir couvrir'.split(' '));
function prefixed(inf) {        // apprendre ← prendre、revenir ← venir、inscrire ← écrire、obtenir ← tenir ← venir
  const bases = [['prendre', 'prendre'], ['venir', 'venir'], ['tenir', 'tenir'], ['mettre', 'mettre'], ['crire', 'écrire'], ['faire', 'faire'], ['connaître', 'connaître'], ['partir', 'partir'], ['sortir', 'sortir'], ['voir', 'voir']];
  for (const [suf, base] of bases) {
    if (inf === base || !inf.endsWith(suf)) continue;
    let b = base === 'tenir' ? tenir() : getVerb(base); if (!b) continue;
    const pre = base === 'écrire' ? inf.slice(0, -suf.length) : inf.slice(0, -base.length);
    const cut = base === 'écrire' ? 'é' : '';
    const f = s => pre + (cut && s.startsWith(cut) ? s.slice(1) : s);
    if (base === 'voir' && inf !== 'revoir') return null;       // prévoir 的 futur 不同 → 只認 revoir
    const t = {}; for (const k in b.t) t[k] = b.t[k].map(f);
    return { inf, aux: ETRE_VERBS.has(inf) ? 'être' : 'avoir', pp: f(b.pp), ppr: f(b.ppr || ''), imper: (b.imper || []).map(f), t };
  }
  return null;
}
function tenir() {
  const v = TABLE.venir, f = s => s.replace(/^v/, 't'), t = {};
  for (const k in v.t) t[k] = v.t[k].map(f);
  return { inf: 'tenir', aux: 'avoir', pp: 'tenu', ppr: 'tenant', imper: v.imper.map(f), t };
}
function getVerb(inf) {
  if (!inf) return null;
  inf = inf.replace(/^(se |s'|s’)/, '');
  if (TABLE[inf]) return TABLE[inf];
  let v = MANUAL[inf] || (inf === 'tenir' ? tenir() : null) || prefixed(inf);
  if (!v && PARTIR_T[inf]) v = regPARTIR(inf, PARTIR_T[inf]);
  if (!v && OUVRIR_T.has(inf)) v = regOUVRIR(inf);
  if (!v && RE_REG.has(inf)) v = regRE(inf);
  if (!v && /er$/.test(inf)) v = regER(inf);
  if (!v && /ir$/.test(inf) && !IR_IRREG.has(inf)) v = regIR(inf);
  if (v) TABLE[inf] = v;
  return v;
}
/* 從 pp 反查原形（只查已經在表裡的） */
function verbByPP(pp) {
  for (const k in TABLE) if (TABLE[k].pp === pp) return TABLE[k];
  return null;
}

/* ── 題目解析 ─────────────────────────────────────── */
const BLANK = /_{2,}/g;
function parse(q) {
  const s = String(q.q);
  const m = s.match(BLANK); if (!m || m.length !== 1) return null;
  let i = s.search(BLANK), j = i + s.match(BLANK)[0].length;
  let before = s.slice(0, i), after = s.slice(j);
  /* 只取有空格那一段（→ 右邊）、去掉中文與「」 */
  const arrow = before.lastIndexOf('→'); if (arrow >= 0) before = before.slice(arrow + 1);
  /* 拉丁字尾：最後一段不含中文／冒號的部分 */
  const tailM = before.match(/[^　-〿㐀-鿿＀-￯:：「」]*$/); const tail = tailM ? tailM[0] : '';
  const afterClean = after.replace(/^\s*[（(][^）)]*[）)]/, ' ');
  const nextM = afterClean.match(/^\s*([A-Za-zÀ-ÿœæ'’\-]+)/);
  const next = nextM ? nextM[1].replace(/’/g, "'") : '';
  const next2M = afterClean.match(/^\s*[A-Za-zÀ-ÿœæ'’\-]+\s+([A-Za-zÀ-ÿœæ'’\-]+)/);
  const next2 = next2M ? next2M[1].replace(/’/g, "'") : '';
  const latinBefore = s.slice(0, i).replace(/[\u3000-\u303f\u3400-\u9fff\uff00-\uffef]+/g, ' | ');
  /* 括號提示裡的原形（after 或整題） */
  let inf = null, persCue = null;
  const pm = s.match(/[（(]([^）)]*)[）)]/g) || [];
  for (const p of pm) {
    const inner = p.slice(1, -1);
    const w = inner.match(/(?:^|[\s,，])((?:se |s'|s’)?[a-zàâçéèêëîïôûùüÿœ]+(?:er|ir|re|oir|ïr))(?=$|[\s,，])/);
    if (w && !inf) inf = w[1].replace(/’/g, "'");
    const pc = inner.match(/[,，]\s*(tu|nous|vous)\s*$/); if (pc) persCue = pc[1];
  }
  return { s, before, tail, after, next, next2, latinBefore, inf, persCue };
}
function tokens(tail) {
  return tail.replace(/’/g, "'").replace(/[,;!?.«»"]/g, ' ').split(/\s+/).filter(Boolean)
    .flatMap(w => { const out = []; let m; while ((m = w.match(/^(qu'|j'|n'|m'|t'|s'|l'|c'|d'|jusqu')(.*)$/i))) { out.push(m[1].toLowerCase()); w = m[2]; } if (w) out.push(w); return out; });
}
const SUBJ = { je: 0, "j'": 0, tu: 1, il: 2, elle: 2, on: 2, "c'": 2, ce: 2, ça: 2, cela: 2, nous: 3, vous: 4, ils: 5, elles: 5 };
const CLIT = new Set(['ne', "n'", 'me', "m'", 'te', "t'", 'se', "s'", 'le', 'la', "l'", 'les', 'lui', 'leur', 'y', 'en', 'nous', 'vous']);
const NOT_NOUN = new Set(['que', "qu'", 'si', 'quand', 'et', 'mais', 'ou', 'où', 'qui', 'de', "d'", 'à', 'pour', 'sans', 'en', 'avec', 'dans', 'sur', 'comment', 'pourquoi', 'lorsque', 'puis', 'alors', 'oui', 'non', '—', '-', 'est-ce']);
/* 主詞：從空格往前走過代名詞串，最左邊的主詞代名詞。回傳 {idx} / {noun:true} / null */
function subjectOf(tail, extraPre) {
  const tk = tokens(tail).concat(extraPre || []);
  let k = tk.length - 1; const chain = [];
  while (k >= 0 && (CLIT.has(tk[k].toLowerCase()) || SUBJ.hasOwnProperty(tk[k].toLowerCase()))) { chain.unshift(tk[k].toLowerCase()); k--; }
  for (const c of chain) if (SUBJ.hasOwnProperty(c) && !(c === 'nous' || c === 'vous') ) return { idx: SUBJ[c], pron: c, chain };
  if (chain.length && (chain[0] === 'nous' || chain[0] === 'vous')) return { idx: SUBJ[chain[0]], pron: chain[0], chain };
  const prev = k >= 0 ? tk[k].toLowerCase() : null;
  if (!prev || NOT_NOUN.has(prev) || /^(qu|d|l|j)'$/.test(prev)) return null;
  if (/^[A-Za-zÀ-ÿœ\-]+$/.test(prev)) return { noun: true, chain, prev };
  return null;
}

/* 答案拆成 前綴代名詞串 ＋ 核心動詞 ＋ 後綴 */
function splitVerbAnswer(ans) {
  const tk = tokens(ans); const pre = [];
  while (tk.length > 1 && (CLIT.has(tk[0].toLowerCase()) || tk[0].toLowerCase() === "c'")) pre.push(tk.shift());
  const core = tk.shift(); const rest = tk;
  return { pre, core, rest };
}
function joinPre(pre, core) {
  let s = ''; for (const p of pre) s += /'$/.test(p) ? p : p + ' ';
  return s + core;
}
/* 找核心形式在哪個動詞、哪個時態、哪個人稱 */
const TOPIC_TENSE = { imparfait: 'imparfait', 'futur-simple': 'futur-simple', 'conditionnel-present': 'conditionnel', 'subjonctif-present': 'subjonctif' };
function findForm(form, inf, topic, want) {
  const cands = [];
  const pool = inf ? [getVerb(inf)].filter(Boolean) : Object.values(TABLE);
  const order = TOPIC_TENSE[topic] ? [TOPIC_TENSE[topic]].concat(TENSES) : TENSES;
  for (const v of pool) for (const t of order) {
    const fs_ = v.t[t]; if (!fs_) continue;
    fs_.forEach((f, i) => { if (f && norm(f) === norm(form)) cands.push({ v, t, i }); });
  }
  if (want) { const c = cands.filter(c => want.includes(c.i)); return c[0] || null; }
  return cands[0] || null;
}
const AUXV = () => ({ avoir: TABLE.avoir, être: TABLE['être'] });
function auxInfo(tok) {           // 助動詞形式 → {aux, t, i}
  for (const a of ['avoir', 'être']) for (const t of TENSES) {
    const i = TABLE[a].t[t].findIndex(f => f === tok.toLowerCase()); if (i >= 0) return { aux: a, t, i };
  }
  return null;
}

/* ── 人工白名單：hint／aNote 點名的錯誤形式，逐條看過才放行（key＝BANK 索引） ────────
 * ⛔ 沒列在這裡的 hint 點名形式一律不用。理由寫在旁邊。 */
const HINT_OK = {
  442: ['est'],          // tu est（×）→ tu es：être 的 tu 沒有 t，一定錯
  443: ['vient'],        // je vient（×）
  444: ['veux'],         // elle veux（×）
  453: ['le'],           // le animal（×）：母音前不縮寫一定錯
  586: ['apprendu'],     // 題目自己問「appris 還是 apprendu？」，apprendu 不是法文字
  666: ['plus bon'],     // ❌ plus bon：標準法文確實不說
  1217: ['plus bon'],
  1289: ['plus bon'],
  1192: ['plus bon'],
  1193: ['plus bien'],
  1634: ['moins meilleur'], // aNote：⚠️ 沒有 le moins meilleur
  // ⛔ 刻意不收：456 il est chaud（物是熱的，合文法）、667/1215 plus mauvais（標準法文可說）、6 être（不是同一格的形式）
};

/* 人工逐題看過、決定丟掉的（理由） */
const MANUAL_DROP = {
  945: 'y/en：「je n\'en étais pas heureuse」（對此不開心）也是通順的法文',
};

/* ── 干擾項產生器 ───────────────────────────────────── */
function gVerb(q, P, ans, out) {
  const { pre, core, rest } = splitVerbAnswer(ans);
  if (!core) return;
  const lc = core.toLowerCase();
  /* 主詞：答案自己帶 c' 的話就是 ce */
  let subj = pre.map(x => x.toLowerCase()).includes("c'") ? { idx: 2, pron: 'ce' } : subjectOf(P.tail, []);
  if (pre.map(x => x.toLowerCase()).includes("c'") && rest.length) return;
  const restStr = rest.join(' ').replace(/' /g, "'");
  const okRest = rest.length === 0 || /^(pas|plus|jamais|rien)$/.test(restStr) || /^(de|d')/.test(restStr) ||
                 (rest.length === 1 && /(er|ir|re|oir)$/.test(rest[0])) || (rest.length <= 2 && /^(pas |plus |jamais )?\S+$/.test(restStr));
  if (!okRest) return;
  /* 核心是助動詞（複合過去）？ */
  const ax = auxInfo(lc);
  let hit = null;
  if (ax && rest.length && rest.every(w => !/(er|ir|re|oir)$/.test(w) || /é$/.test(w))) hit = { v: TABLE[ax.aux], t: ax.t, i: ax.i, isAux: true };
  if (!hit) {
    const want = subj ? (subj.noun ? [2, 5] : [subj.idx]) : null;
    if (!want) return;
    hit = findForm(lc, P.inf, q.topic, want) || (P.inf ? null : null);
    if (!hit && P.inf) return;
    if (!hit) hit = findForm(lc, null, q.topic, want);
    if (!hit) return;
  } else {
    if (!subj) return;
    if (subj.noun ? ![2, 5].includes(hit.i) : hit.i !== subj.idx) {
      /* 助動詞形式 je/tu 同形（ai/as 不同；suis/es…）— 用主詞位置重找 */
      const f = TABLE[ax.aux].t[ax.t]; const ii = subj.noun ? null : subj.idx;
      if (ii == null || norm(f[ii]) !== norm(lc)) return;
      hit.i = ii;
    }
  }
  if (!subj) return;
  const forms = hit.v.t[hit.t];
  const okIdx = new Set(); forms.forEach((f, i) => { if (f && norm(f) === norm(lc)) okIdx.add(i); });
  /* 主詞是名詞：只知道是第三人稱；單複由正解決定 */
  const tail = restStr ? ' ' + restStr : '';
  const cands = [];
  forms.forEach((f, i) => {
    if (!f || okIdx.has(i)) return;
    if (subj.pron === 'on' && i === 3) { /* on → nous 形式：錯（標準法文 on 一律第三人稱單數） */ }
    cands.push({ f: capLike(ans, joinPre(pre, f) + tail), d: lev(f, lc) });
  });
  cands.sort((a, b) => a.d - b.d);
  const personOut = cands.map(c => ({ f: c.f, why: hit.isAux ? 'aux-person' : 'person' }));
  const extra = [];
  /* 複合過去額外：être→avoir（嚴格 être 動詞）、pp 換成原形 */
  if (hit.isAux && rest.length) {
    const pp = rest[rest.length - 1];
    const basePP = pp.replace(/(e|s|es)$/, '');
    const v = getVerb(P.inf) || verbByPP(pp) || verbByPP(basePP) || verbByPP(basePP + 'e');
    const reflexive = pre.some(x => /^(se|s'|me|m'|te|t'|nous|vous)$/i.test(x)) && hit.v.inf === 'être';
    if (v && hit.v.inf === 'être' && !reflexive && ETRE_VERBS.has(v.inf) && !ETRE_ALSO_TRANSITIVE.has(v.inf)) {
      const avoirF = TABLE.avoir.t[hit.t][hit.i === undefined ? 2 : hit.i];
      if (avoirF) extra.push({ f: capLike(ans, joinPre(pre, avoirF) + ' ' + rest.slice(0, -1).concat([v.pp]).join(' ')), why: 'aux-etre->avoir' });
    }
    /* 配合變體 */
    agreementVariants(q, P, subj, hit.v.inf, pp, v, pre).forEach(x => extra.push({ f: capLike(ans, joinPre(pre, lc) + ' ' + rest.slice(0, -1).concat([x]).join(' ')), why: 'agreement' }));
    if (v && v.inf) extra.push({ f: capLike(ans, joinPre(pre, lc) + ' ' + rest.slice(0, -1).concat([v.inf]).join(' ')), why: 'pp->infinitif' });
  }
  /* 交錯：最像的人稱錯 1 個 → 複合過去特有的錯（être/avoir、配合、原形）→ 其餘人稱 */
  if (personOut.length) out.push(personOut.shift());
  extra.slice(0, 2).forEach(x => out.push(x));
  personOut.forEach(x => out.push(x));
}
/* 過去分詞配合變體：只換「前後文已鎖死」的維度 */
function agreementVariants(q, P, subj, auxInf, pp, v, pre) {
  if (!v || v.pp === 'été') return [];
  const base = v.pp; if (!new RegExp('^' + base + '(e|s|es)?$').test(pp)) return [];
  if (/s$/.test(base) && pp !== base && !/e/.test(pp.slice(base.length))) return [];   // pris／mis：陽性複數同形
  const suf = pp.slice(base.length); const g = /e/.test(suf) ? 'f' : 'm', n = /s$/.test(suf) || (/s$/.test(base) && false) ? 'pl' : 'sg';
  let knowG = false, knowN = false;
  const fullTail = tokens(P.tail).map(x => x.toLowerCase());
  const hasQue = /(^|[^a-zà-ÿ])qu(e|')/i.test(P.tail);
  const chain = (subj && subj.chain ? subj.chain : []).filter((x, i, arr) => !(i === arr.indexOf(subj.pron) && x === subj.pron));
  const cod = chain.find(x => ['le', 'la', "l'", 'les'].includes(x));
  if (auxInf === 'être' || (pre && pre.some(x => /^(se|s')$/i.test(x)))) {
    if (subj.noun || ['il', 'elle', 'ils', 'elles'].includes(subj.pron)) { knowG = true; knowN = true; }
    else if (['je', "j'", 'tu'].includes(subj.pron)) { knowN = true; }
    else if (subj.pron === 'nous') { knowN = true; }
  } else {               // avoir：只有前置直接受詞才配合
    if (hasQue && !chain.some(x => ['me', "m'", 'te', "t'", 'nous', 'vous', 'lui', 'leur'].includes(x))) { knowG = true; knowN = true; }
    else if (cod === 'les') { knowN = true; }
    else if (cod === 'la') { knowG = true; knowN = true; }
    else if (cod === 'le') { knowG = true; knowN = true; }
    else if (cod === "l'") { knowN = true; }
    else if (!hasQue && !chain.some(x => ['me', "m'", 'te', "t'", 'nous', 'vous'].includes(x))) { knowG = true; knowN = true; }   // 沒有前置受詞 → 不配合，任何配合都錯
  }
  const sp = /s$/.test(base);
  const forms = { 'm,sg': base, 'f,sg': base + 'e', 'm,pl': sp ? base : base + 's', 'f,pl': base + 'es' };
  const outv = [];
  for (const k in forms) {
    const [gg, nn] = k.split(',');
    if (forms[k] === pp) continue;
    const diffG = gg !== g, diffN = nn !== n;
    if ((diffG && !knowG) || (diffN && !knowN)) continue;
    if (!diffG && !diffN) continue;
    if (diffG && !diffN && !knowG) continue;
    if (!diffN && diffG && !knowG) continue;
    if (diffG && diffN && !(knowG && knowN)) continue;
    outv.push(forms[k]);
  }
  return outv;
}
function gPPonly(q, P, ans, out) {          // 空格只有過去分詞：前面是助動詞
  const tk = tokens(P.tail).map(x => x.toLowerCase());
  let k = tk.length - 1; while (k >= 0 && /^(pas|jamais|encore|déjà|bien|toujours|plus)$/.test(tk[k])) k--;
  const ax = k >= 0 ? auxInfo(tk[k]) : null; if (!ax) return;
  if (ans.includes(' ')) return;
  const basePP = ans.replace(/(e|s|es)$/, '');
  const v = getVerb(P.inf) || verbByPP(ans) || verbByPP(basePP) || verbByPP(basePP + 'e');
  if (!v || !(v.pp === ans || new RegExp('^' + v.pp + '(e|s|es)?$').test(ans))) return;
  const subj = subjectOf(tk.slice(0, k + 1).join(' ').replace(/ (?=')/g, ''), []) || subjectOf(P.tail.replace(/\S+\s*$/, ''), []);
  const s2 = subjectOf(tokens(P.tail).slice(0, k).join(' '), []);
  const S = s2 || subj || { noun: false, chain: [] };
  if (v.inf) out.push({ f: v.inf, why: 'pp->infinitif' });
  agreementVariants(q, P, S.pron || S.noun ? S : { chain: [] }, ax.aux, ans, v, []).forEach(x => out.push({ f: x, why: 'agreement' }));
  /* 現在式第三人稱：⚠️ 跟某個配合形同形的不用（dit／fait／peint＝陽性過去分詞，那是「配合」維度，上面已經決定要不要換） */
  const p3 = v.t.present && v.t.present[2];
  const agreeForms = [v.pp, v.pp + 'e', v.pp + 's', v.pp + 'es'].map(norm);
  if (p3 && norm(p3) !== norm(ans) && !agreeForms.includes(norm(p3))) out.push({ f: p3, why: 'pp->present' });
  if (HINT_OK[q._i]) HINT_OK[q._i].forEach(f => out.unshift({ f, why: 'hint' }));
}
function gGerund(q, P, ans, out) {
  const m = ans.match(/^(en )?([a-zàâçéèêëîïôûùüÿœ]+ant)$/i);
  if (!m) return;
  if (!m[1] && !/(^|\s)en( ne)?\s*$/i.test(P.tail)) return;
  const v = getVerb(P.inf); if (!v || norm(v.ppr) !== norm(m[2])) return;
  const pre = m[1] || '';
  out.push({ f: pre + v.inf, why: 'gerondif->infinitif' });
  out.push({ f: pre + v.pp, why: 'gerondif->pp' });
  if (v.t.present) out.push({ f: pre + v.t.present[3], why: 'gerondif->nous' });
}
function gInfinitive(q, P, ans, out) {      // vais faire：空格是原形
  if (ans.includes(' ')) return;
  const tk = tokens(P.tail).map(x => x.toLowerCase()); const prev = tk[tk.length - 1];
  const MODAL = /^(vais|vas|va|allons|allez|vont|veux|veut|voulons|voulez|veulent|peux|peut|pouvons|pouvez|peuvent|dois|doit|devons|devez|doivent|faut)$/;
  if (!prev || !MODAL.test(prev)) return;
  const v = getVerb(ans); if (!v || v.inf !== ans) return;
  if (v.pp && norm(v.pp) !== norm(ans)) out.push({ f: v.pp, why: 'infinitif->pp' });
  if (v.t.present) { out.push({ f: v.t.present[2], why: 'infinitif->present' }); out.push({ f: v.t.present[4], why: 'infinitif->present' }); }
}
function gImperative(q, P, ans, out, flags) {
  const { pre, core, rest } = splitVerbAnswer(ans.replace(/^ne /i, m => m));
  const neg = /^ne /i.test(ans) && / pas$/.test(ans);
  const w = neg ? ans.replace(/^ne /i, '').replace(/ pas$/, '') : ans;
  if (w.includes(' ')) return;
  const tk = tokens(P.tail); if (tk.length && !/^(si|s'il)$/i.test(tk[0])) {
    /* 空格前面要嘛沒東西、要嘛是 Si 子句（逗號後）*/
    const last = P.tail.trim(); if (last && !/[,!?.:]$/.test(last) && !/^Si\b/i.test(last)) return;
  }
  const v = getVerb(P.inf) || Object.values(TABLE).find(x => x.imper && x.imper.some(f => norm(f) === norm(w)));
  if (!v || !v.imper) return;
  const pi = v.imper.findIndex(f => norm(f) === norm(w)); if (pi < 0) return;
  const idx6 = [1, 3, 4][pi];
  const wrap = f => capLike(ans, (neg ? 'ne ' : '') + f + (neg ? ' pas' : ''));
  const ind = v.t.present[idx6]; if (ind && norm(ind) !== norm(w) && !(v.inf === 'aller' && /^-?y/.test(P.next))) out.push({ f: wrap(ind), why: 'imperatif->indicatif' });
  if (pi === 0 && v.t.subjonctif) { const s3 = v.t.subjonctif[2]; if (s3 && norm(s3) !== norm(w) && norm(s3) !== norm(ind || '')) out.push({ f: wrap(s3), why: 'imperatif->subj3' }); }
  /* 其他人稱的命令式：只有題目看得到人稱線索才算錯（cue） */
  const cue = P.persCue || (/\b(tu|t'|ton|ta|tes|te)\b|s'il te plaît/i.test(P.s) ? 'tu' : /\b(vous|votre|vos)\b|s'il vous plaît/i.test(P.s) ? 'vous' : /\b(nous|notre|nos)\b/i.test(P.s) ? 'nous' : null);
  if (cue && ['tu', 'nous', 'vous'][pi] === cue) {
    v.imper.forEach((f, i) => { if (i !== pi && norm(f) !== norm(w)) { out.push({ f: wrap(f), why: 'imperatif-person(cue)' }); flags.cue = true; } });
  }
}

/* 封閉詞類 */
const POSS = [['mon', 'ma', 'mes', 'le mien'], ['ton', 'ta', 'tes', 'le tien'], ['son', 'sa', 'ses', 'le sien'], ['notre', 'notre', 'nos', 'le nôtre'], ['votre', 'votre', 'vos', 'le vôtre'], ['leur', 'leur', 'leurs', 'le leur']];
function gPossDet(q, P, ans, out) {
  if (CLITIC_TOPIC.test(q.topic)) return;
  const a = ans.toLowerCase(); const row = POSS.find(r => r.slice(0, 3).includes(a)); if (!row) return;
  const nx = P.next.toLowerCase(); if (!nx) return;
  const pl = a === row[2], fem = a === row[1] && row[0] !== row[1];
  const inv = INVARIABLE.has(nx), epi = EPICENE.has(nx);
  if (!pl) {
    if (row[0] !== row[1]) {
      const other = fem ? row[0] : row[1];
      if (fem) { if (!epi && !startsVowelStrict(nx)) out.push({ f: other, why: 'poss-gender' }); }
      else { if (startsVowelStrict(nx) || /^h/.test(nx)) { if (!/^h/.test(nx)) out.push({ f: row[1], why: 'poss-elision' }); } else if (!epi) out.push({ f: other, why: 'poss-gender' }); }
    }
    if (!/[sxz]$/.test(nx) && !inv) out.push({ f: row[2], why: 'poss-number' });
  } else {
    if (!inv && /[sxz]$/.test(nx)) { out.push({ f: row[0], why: 'poss-number' }); if (row[1] !== row[0] && !startsVowelStrict(nx)) out.push({ f: row[1], why: 'poss-number' }); }
  }
  /* 代名詞形當限定詞一定錯 */
  const pron = pl ? row[3].replace(/^le /, 'les ') + (row[3].endsWith('leur') ? 's' : 's') : fem ? row[3].replace(/^le /, 'la ') + (/ien$/.test(row[3]) ? 'ne' : '') : row[3];
  out.push({ f: pron, why: 'poss-pronoun-as-det' });
  out.forEach(o => o.f = capLike(ans, o.f));
}
function possPronForms(base) {   // 'mien' → {le mien, la mienne, les miens, les miennes}
  if (/ien$/.test(base)) return { msg: 'le ' + base, fsg: 'la ' + base + 'ne', mpl: 'les ' + base + 's', fpl: 'les ' + base + 'nes' };
  if (/^(nôtre|vôtre|leur)$/.test(base)) return { msg: 'le ' + base, fsg: 'la ' + base, mpl: 'les ' + base + 's', fpl: 'les ' + base + 's' };
  return null;
}
const POSS_DET_OF = { mien: ['mon', 'ma', 'mes'], tien: ['ton', 'ta', 'tes'], sien: ['son', 'sa', 'ses'], nôtre: ['notre', 'notre', 'nos'], vôtre: ['votre', 'votre', 'vos'], leur: ['leur', 'leur', 'leurs'] };
function gPossPron(q, P, ans, out) {
  const m = ans.toLowerCase().match(/^(le|la|les) (mien|mienne|miens|miennes|tien|tienne|tiens|tiennes|sien|sienne|siens|siennes|nôtre|nôtres|vôtre|vôtres|leur|leurs)$/);
  if (!m) return;
  const base = m[2].replace(/(nes|ne|s)$/, '').replace(/^(mie|tie|sie)$/, '$1n');
  const b = /ien/.test(m[2]) ? m[2].match(/^(mien|tien|sien)/)[1] : m[2].replace(/s$/, '');
  const F = possPronForms(b); if (!F) return;
  const cell = Object.keys(F).find(k => F[k] === ans.toLowerCase()); if (!cell) return;
  const pl = /pl$/.test(cell), fem = /^f/.test(cell);
  const genderSwap = F[(fem ? 'm' : 'f') + (pl ? 'pl' : 'sg')];
  if (genderSwap !== ans.toLowerCase()) out.push({ f: genderSwap, why: 'posspron-gender' });
  if (/\bce sont\s*$/i.test(P.tail)) { out.push({ f: F[(fem ? 'f' : 'm') + 'sg'], why: 'posspron-number(ce sont)' }); }
  const det = POSS_DET_OF[b]; if (det) out.push({ f: pl ? det[2] : fem ? det[1] : det[0], why: 'posspron-det-form' });
}
function gDemDet(q, P, ans, out) {
  const a = ans.toLowerCase(); if (!['ce', 'cet', 'cette', 'ces'].includes(a)) return;
  const nx = P.next.toLowerCase(); if (!nx) return;
  const epi = EPICENE.has(nx), inv = INVARIABLE.has(nx), v = startsVowelStrict(nx) || (a === 'cet' && /^h/.test(nx));
  const add = (f, w) => out.push({ f: capLike(ans, f), why: w });
  if (a === 'ce') { add('cet', 'dem-elision'); if (!epi) add('cette', 'dem-gender'); if (!/[sxz]$/.test(nx) && !inv) add('ces', 'dem-number'); }
  if (a === 'cet') { add('ce', 'dem-elision'); if (!epi) add('cette', 'dem-gender'); if (!/[sxz]$/.test(nx) && !inv) add('ces', 'dem-number'); }
  if (a === 'cette') { add('ce', 'dem-gender'); if (v && !epi) add('cet', 'dem-gender'); if (!/[sxz]$/.test(nx) && !inv) add('ces', 'dem-number'); }
  if (a === 'ces') { if (!inv) { add(v ? 'cet' : 'ce', 'dem-number'); add('cette', 'dem-number'); } }
}
const CLITIC_TOPIC = /cod|place-pronoms|imperatif-pronoms|discours/;
const hasAntecedent = P => /(^|[^a-zà-ÿ])(le|la|les|l'|l’|un|une|des|du|au|aux|ce|cet|cette|ces|mon|ma|mes|ton|ta|tes|son|sa|ses|notre|nos|votre|vos|leur|leurs)\s*[a-zà-ÿœ]{2,}/i.test(P.latinBefore) ;
function gArticle(q, P, ans, out) {
  if (CLITIC_TOPIC.test(q.topic)) return;
  const a = ans.toLowerCase().replace(/’/g, "'"); const nx = P.next.toLowerCase();
  if (!nx) return;
  const epi = EPICENE.has(nx), inv = INVARIABLE.has(nx), plN = /[sxz]$/.test(nx), v = startsVowelStrict(nx);
  const add = (f, w) => out.push({ f: capLike(ans, f), why: w });
  const tk = tokens(P.tail).map(x => x.toLowerCase()); const prev = tk[tk.length - 1] || '';
  if (prev === 'à' || prev === 'de' || prev === "d'") return;   // 前面已經有介詞的另外處理太麻煩 → 不做
  switch (a) {
    case 'le': add("l'", 'art-elision'); if (!epi) add('la', 'art-gender'); if (!plN && !inv) add('les', 'art-number'); break;
    case 'la': add("l'", 'art-elision'); if (!epi) add('le', 'art-gender'); if (!plN && !inv) add('les', 'art-number'); break;
    case "l'": if (!v && !/^h/.test(nx)) return; add('le', 'art-elision'); add('la', 'art-elision'); if (!plN && !inv) add('les', 'art-number'); break;
    case 'les': if (inv || !plN) return; add(v ? "l'" : 'le', 'art-number'); if (!v) add('la', 'art-number'); break;
    case 'un': if (!epi) add('une', 'art-gender'); if (!plN && !inv) add('des', 'art-number'); break;
    case 'une': if (!epi) add('un', 'art-gender'); if (!plN && !inv) add('des', 'art-number'); break;
    case 'du': if (v) return; add('de le', 'art-contraction'); if (!epi) add('de la', 'art-gender'); if (!plN && !inv) add('des', 'art-number'); break;
    case 'de la': if (v) return; add('de le', 'art-contraction'); if (!epi) add('du', 'art-gender'); add("de l'", 'art-elision'); break;
    case "de l'": if (!v) return; add('de la', 'art-elision'); add('du', 'art-elision'); add('de le', 'art-contraction'); break;
    case 'des': if (inv || !plN) return; if (/^(pas|plus|jamais|beaucoup|peu|assez|trop)$/.test(prev)) return; add('de les', 'art-contraction'); add('du', 'art-number'); add('de la', 'art-number'); break;
    case 'au': add('à le', 'art-contraction'); if (!epi) add('à la', 'art-gender'); if (!plN && !inv) add('aux', 'art-number'); break;
    case 'aux': if (inv || !plN) return; add('à les', 'art-contraction'); add('au', 'art-number'); break;
    case 'de': case "d'": {
      const quant = /^(beaucoup|peu|assez|trop|pas|plus|jamais)$/.test(prev);
      const etre = /\b(n'est|ne sont|n'était|n'étaient|ce n')\b/i.test(P.tail);
      const adjPl = /des\s*(→|變|要縮|縮)|des→de|des 變成 de|des 要變成 de|des 縮成 de/.test(String(q.aNote) + String(q.hint));
      if (quant && !etre) { add('des', 'art-after-quantity/neg'); add(v ? "de l'" : 'du', 'art-after-quantity/neg'); if (!v) add('de la', 'art-after-quantity/neg'); }
      else if (adjPl) { add(v ? "de l'" : 'du', 'art-adj-plural'); if (!v) add('de la', 'art-adj-plural'); add('de les', 'art-contraction'); }
      break;
    }
  }
}
function gTout(q, P, ans, out) {
  const a = ans.toLowerCase(); const nx = P.next.toLowerCase();
  const T = ['tout', 'toute', 'tous', 'toutes'];
  const add = (f, w) => out.push({ f: capLike(ans, f), why: w });
  const mm = a.match(/^(tout|toute|tous|toutes)( les)?$/); if (!mm) {
    if (a === 'chaque') { add('chacun', 'chaque->pronom'); add('chacune', 'chaque->pronom'); }
    return;
  }
  if (mm[2]) {                    // tous les ＋ 名詞
    if (EPICENE.has(nx)) return;
    T.filter(t => t !== mm[1]).forEach(t => add(t + ' les', 'tout-agreement'));
    return;
  }
  const d = nx;
  if (d === 'le') T.filter(t => t !== 'tout').forEach(t => add(t, 'tout-agreement'));
  else if (d === 'la') T.filter(t => t !== 'toute').forEach(t => add(t, 'tout-agreement'));
  else if (d === "l'") { if (a === 'tout' || a === 'toute') { add('tous', 'tout-number'); add('toutes', 'tout-number'); } }
  else if (/^(les|ces|mes|tes|ses|nos|vos|leurs)$/.test(d)) {
    const n2 = P.next2.toLowerCase();
    if (n2 && !EPICENE.has(n2) && /^(tous|toutes)$/.test(a)) add(a === 'tous' ? 'toutes' : 'tous', 'tout-gender');
    add('tout', 'tout-number'); add('toute', 'tout-number');
  }
}
function gRelative(q, P, ans, out) {
  const a = elideKey(ans) === 'ou' && /où/i.test(ans) ? 'où' : elideKey(ans); const nx = P.next; const v = startsVowelStrict(nx) || /^h[aeiouy]/i.test(nx) && false;
  const add = (f, w) => out.push({ f: capLike(ans, f), why: w });
  const cleft = /\b(c'est|c’est|ce sont|ce n'est)\b/i.test(P.tail) && !/^ce$/i.test(P.tail.trim().split(/\s+/).pop());
  const ceBefore = /(^|\s)ce\s*$/i.test(P.tail);
  const queF = startsVowelStrict(nx) ? "qu'" : 'que';
  /* 「Ce que／Ce qui」整塊在答案裡 */
  let m = ans.match(/^(ce|Ce) (qui|que|qu'|qu’)$/);
  if (m) {
    if (/\b(savoir|demande|demandent|comprend|comprendre|explique|expliquez|expliquez-moi|sais)\b/i.test(P.tail) || q.topic === 'discours-rapporte') {
      if (elideKey(m[2]) === 'qui') { add(m[1] + ' ' + queF, 'cequi/ceque'); add("qu'est-ce qui", 'indirect-quest-est-ce'); }
      else { add(m[1] + ' qui', 'cequi/ceque'); add('qu\'est-ce ' + queF, 'indirect-quest-est-ce'); }
    } else {
      if (elideKey(m[2]) === 'qui') { add(m[1] + ' ' + queF, 'cequi/ceque'); add(m[1] + ' dont', 'relative'); }
      else { add(m[1] + ' qui', 'cequi/ceque'); add(m[1] + ' dont', 'relative'); }
    }
    return;
  }
  if (/^qu'est-ce qui$/i.test(ans)) { add('Ce qui', 'direct-quest'); add("Qu'est-ce que", 'cequi/ceque'); return; }
  if (!['qui', 'que', 'où', 'dont'].includes(a)) return;
  if (q.topic === 'discours-rapporte' || q.topic === 'pronoms-interrogatifs') return;
  if (a === 'que' && q.topic === 'comparaison') return;
  if (a === 'que' && /(^|[^a-zà-ÿ])(plus|moins|aussi|autant|même|mêmes)([^a-zà-ÿ]|$)/i.test(P.tail)) return;
  const pool = (cleft || ceBefore) ? ['qui', 'que', 'dont'] : ['qui', 'que', 'où', 'dont'];
  /* dont ＋ 定冠詞名詞＝「其…」（une résidence dont les espaces communs sont grands）→ 合文法，不能當錯的 */
  const dontOk = !/^(le|la|les|l'|l’)$/i.test(P.next) && !/^(l'|l’)/i.test(P.next) &&
                 a !== 'où';      // 正解是 où 的句子（il y a beaucoup de…／on trouve beaucoup de…）dont 有冷門讀法 → 拿不準就不用

  pool.filter(x => x !== a && (x !== 'dont' || dontOk)).forEach(x => add(x === 'que' ? queF : x, 'relative'));
}
function gYEn(q, P, ans, out) {
  const a = ans.toLowerCase(); if (a !== 'y' && a !== 'en') return;
  if (!P.next || /^[?!.]/.test(P.next)) return;
  out.push({ f: a === 'y' ? 'en' : 'y', why: 'y/en' });
  out.push({ f: 'là', why: 'là-preverbal' });
}
function gClitic(q, P, ans, out) {
  const a = ans.toLowerCase().replace(/’/g, "'");
  const alts = String(q.a).split('|').map(x => x.toLowerCase().replace(/’/g, "'"));
  const add = (f, w) => out.push({ f: capLike(ans, f), why: w });
  if (!P.next) return;
  const v = startsVowelStrict(P.next) || /^h/i.test(P.next);
  /* 不在動詞前（例如 chez lui、c'est lui）的不是受詞代名詞 */
  const tk = tokens(P.tail).map(x => x.toLowerCase()); const prev = tk[tk.length - 1] || '';
  if (/^(chez|à|avec|pour|sans|de|c'est|est|sont|que|qui)$/.test(prev)) return;
  const ante = hasAntecedent(P);     // 性數要靠前文的名詞鎖死；只有中文翻譯的話不換
  if (a === 'le') { if (v) return; add("l'", 'cod-elision'); if (ante) { add('la', 'cod-gender'); add('les', 'cod-number'); } }
  else if (a === 'la') { if (v) return; add("l'", 'cod-elision'); if (ante) { add('le', 'cod-gender'); add('les', 'cod-number'); } }
  else if (a === 'les') { if (!ante) return; add(v ? "l'" : 'le', 'cod-number'); if (!v) add('la', 'cod-number'); }
  else if (a === "l'") { if (!v) return; ['le', 'la'].filter(x => !alts.includes(x)).forEach(x => add(x, 'cod-elision')); if (ante && out.length < 2) add('les', 'cod-number'); }
  else if (a === 'lui') { add('leur', 'coi-number'); add('leurs', 'leur-never-s'); }
  else if (a === 'leur') { add('lui', 'coi-number'); add('leurs', 'leur-never-s'); }
}
function gTonic(q, P, ans, out) {
  const a = ans.toLowerCase(); const add = (f, w) => out.push({ f: capLike(ans, f), why: w });
  const isMeta = /重讀代詞|tonique/.test(P.s) && !/_{2,}/.test(P.s);
  const tk = tokens(P.tail).map(x => x.toLowerCase()); const prev = tk[tk.length - 1] || '';
  const tonicSlot = /^(chez|à|avec|pour|sans|de|est|sont|c'est|moi|toi|et)$/.test(prev) || /c'est|ce sont/i.test(P.tail.slice(-12));
  if (!tonicSlot) return;
  const M = { lui: ['il', 'le'], eux: ['ils', 'les'], moi: ['je', 'me'], toi: ['tu', 'te'], elles: ['les', 'leur'] };
  if (M[a]) { M[a].forEach(f => add(f, 'tonic-vs-clitic')); return; }
  /* C'est nous qui étudions／C'est vous qui réussissez：qui 後面的動詞人稱鎖死 */
  const vm_ = P.after.match(/^\s*qui\s+([a-zàâçéèêëîïôûùüÿœ]+)/i);
  if (a === 'nous' && vm_ && /ons$/.test(vm_[1])) { add('vous', 'tonic-person(verb-agreement)'); add('eux', 'tonic-person(verb-agreement)'); }
  if (a === 'vous' && vm_ && /ez$/.test(vm_[1])) { add('nous', 'tonic-person(verb-agreement)'); add('eux', 'tonic-person(verb-agreement)'); }
}
function gSubjPron(q, P, ans, out) {          // Nous avons／on communique：主詞代名詞，動詞人稱鎖死
  const a = ans.toLowerCase(); if (!['nous', 'on'].includes(a)) return;
  const vm_ = P.after.match(/^\s*([a-zàâçéèêëîïôûùüÿœ]+)/i); if (!vm_) return;
  const vb = vm_[1];
  const add = (f, w) => out.push({ f: capLike(ans, f), why: w });
  if (a === 'nous' && /ons$/.test(vb)) { add('on', 'subj-person(verb-agreement)'); add('ils', 'subj-person(verb-agreement)'); add('vous', 'subj-person(verb-agreement)'); }
  if (a === 'on' && /^(a|est|va|fait)$/.test(vb)) { add('nous', 'subj-person(verb-agreement)'); add('ils', 'subj-person(verb-agreement)'); }
}
function gInterrog(q, P, ans, out) {
  const a = ans.toLowerCase(); const add = (f, w) => out.push({ f: capLike(ans, f), why: w });
  const Q = { quel: ['m', 'sg'], quelle: ['f', 'sg'], quels: ['m', 'pl'], quelles: ['f', 'pl'] };
  const L = { lequel: ['m', 'sg'], laquelle: ['f', 'sg'], lesquels: ['m', 'pl'], lesquelles: ['f', 'pl'] };
  const nx = P.next.toLowerCase();
  const alts = String(q.a).split('|').map(x => x.toLowerCase());
  const pick = (T, g, n) => Object.keys(T).find(k => T[k][0] === g && T[k][1] === n);
  const epiAnte = [...EPICENE].some(w => new RegExp('(^|[^a-zà-ÿ])' + w + '([^a-zà-ÿ]|$)', 'i').test(P.latinBefore));
  if (Q[a]) {
    const [g, n] = Q[a];
    if (/^(est|sont)$/.test(nx)) { add(pick(Q, g === 'm' ? 'f' : 'm', n), 'quel-gender'); return; }
    if (!EPICENE.has(nx)) add(pick(Q, g === 'm' ? 'f' : 'm', n), 'quel-gender');
    if (!INVARIABLE.has(nx)) add(pick(Q, g, n === 'sg' ? 'pl' : 'sg'), 'quel-number');
    add(pick(L, g, n), 'lequel-before-noun');
  } else if (L[a]) {
    const [g, n] = L[a];
    if (!epiAnte) add(pick(L, g === 'm' ? 'f' : 'm', n), 'lequel-gender');
    if ((n === 'sg' && /^(est|a|fait)$/.test(nx)) || (n === 'pl' && /^(sont|ont|font)$/.test(nx))) add(pick(L, g, n === 'sg' ? 'pl' : 'sg'), 'lequel-number(verb)');
  }
  for (let i = out.length - 1; i >= 0; i--) if (alts.includes(out[i].f.toLowerCase())) out.splice(i, 1);
}
function gDemPron(q, P, ans, out) {
  const a = ans.toLowerCase(); const add = (f, w) => out.push({ f: capLike(ans, f), why: w });
  const m = a.match(/^(celui|celle|ceux|celles)(-ci|-là)?$/); if (!m) return;
  const G = { celui: ['m', 'sg'], celle: ['f', 'sg'], ceux: ['m', 'pl'], celles: ['f', 'pl'] };
  const pick = (g, n) => Object.keys(G).find(k => G[k][0] === g && G[k][1] === n);
  const [g, n] = G[m[1]];
  const blob = String(q.hint) + ' ' + String(q.aNote);
  const gKnown = /陰性|陽性|\b(une?|le|la|l')\s+[a-zàâçéèêëîïôûùüÿœ]/i.test(blob) || /\b(un|une|le|la|ce|cet|cette|mon|ma|ton|ta|son|sa)\s+[a-zàâçéèêëîïôûùüÿœ]{3,}/i.test(P.before) || /\b(les|ces|des|mes|tes|ses|nos|vos|leurs)\s+[a-zàâçéèêëîïôûùüÿœ]{3,}/i.test(P.before);
  const epiAnte = [...EPICENE].some(w => new RegExp('(^|[^a-zà-ÿ])' + w + '([^a-zà-ÿ]|$)', 'i').test(P.latinBefore));
  if (gKnown && !epiAnte) add(pick(g === 'm' ? 'f' : 'm', n) + (m[2] || ''), 'dempron-gender');
  if (!m[2]) {
    add({ celui: 'ce', celle: 'cette', ceux: 'ces', celles: 'ces' }[m[1]], 'dempron-det-form');
    const vq = P.after.match(/^\s*qui\s+([a-zàâçéèêëîïôûùüÿœ]+)/i);
    if (vq && ((n === 'pl' && /(ent|ont)$/.test(vq[1])) || (n === 'sg' && /^(est|a|fait|va)$/.test(vq[1])))) add(pick(g, n === 'sg' ? 'pl' : 'sg'), 'dempron-number(verb)');
  }
}
function gCompar(q, P, ans, out, flags) {
  const a = ans.toLowerCase(); const add = (f, w) => out.push({ f: capLike(ans, f), why: w });
  const vis = P.s + ' ' + (q.hint || '');
  const cue = /[（(]\s*[＋+−\-－=＝]|[（(][^）)]*[一-鿿][^）)]*[）)]/.test(vis) || /（[＋+−\-－=＝]）/.test(vis);
  if (['plus', 'moins', 'aussi'].includes(a) && /\bque?\b|qu'/.test(P.after) && /^(que|qu')?/.test(P.after)) {
    if (!/\bqu(e|')/.test(P.after)) return;
    add('autant', 'aussi/autant-before-adj');
    if (cue) { ['plus', 'moins', 'aussi'].filter(x => x !== a).forEach(x => add(x, 'compar-direction(cue)')); flags.cue = true; }
    return;
  }
  const m = a.match(/^(plus|moins|autant) (de|d')$/);
  if (m) {
    add(m[1] === 'autant' ? 'aussi ' + m[2] : 'autant ' + m[2], m[1] === 'autant' ? 'aussi-de' : 'compar-direction(cue)');
    if (m[1] === 'autant') add('autant', 'autant-without-de');
    else add(m[1], 'compar-without-de');
    if (cue && m[1] !== 'autant') flags.cue = true;
    return;
  }
  if (a === 'autant' && /\bqu(e|')/.test(P.after)) { add('aussi', 'aussi-with-verb'); add('autant de', 'autant-de-with-verb'); return; }
  if ((a === 'que' || a === "qu'") && /\b(plus|moins|aussi|autant)\b/i.test(P.tail)) { add('comme', 'compar-que'); add(startsVowelStrict(P.next) ? "d'" : 'de', 'compar-que'); return; }
  const mm = a.match(/^(le|la|les) (même|mêmes)$/);
  if (mm) {
    const nx = P.next.toLowerCase(); if (EPICENE.has(nx)) return;
    if (mm[1] === 'les') { if (INVARIABLE.has(nx)) return; add('le même', 'meme-agreement'); add('la même', 'meme-agreement'); }
    else { add(mm[1] === 'le' ? 'la même' : 'le même', 'meme-agreement'); if (!INVARIABLE.has(nx) && !/[sxz]$/.test(nx)) add('les mêmes', 'meme-agreement'); }
  }
}
function gSuper(q, P, ans, out, flags) {
  const a = ans.toLowerCase(); const add = (f, w) => out.push({ f: capLike(ans, f), why: w });
  const tk = tokens(P.tail).map(x => x.toLowerCase()); const prev = tk[tk.length - 1] || '';
  const vis = P.s + ' ' + (q.hint || '');
  const cue = /[（(]\s*[＋+−\-－]\s*[）)]/.test(vis);
  /* le/la/les ＋ 空格 */
  if (/^(le|la|les)$/.test(prev)) {
    if (a === 'plus' || a === 'moins') { add('meilleur', 'super-meilleur-before-adj'); add('mieux', 'super-mieux-before-adj'); if (cue) { add(a === 'plus' ? 'moins' : 'plus', 'super-direction(cue)'); flags.cue = true; } return; }
    if (/^meilleur(e|s|es)?$/.test(a)) { add('plus', 'super-plus-before-noun'); add('mieux', 'super-mieux-before-noun'); return; }
    if (a === 'mieux') { add('meilleur', 'super-meilleur-adverbial'); add('bien', 'super-bien'); return; }
    const m = a.match(/^(plus|moins) (\S+)$/);
    if (m && !/^(bien|bon)$/.test(m[2])) { add('meilleur ' + m[2], 'super-meilleur-before-adj'); if (cue) { add((m[1] === 'plus' ? 'moins ' : 'plus ') + m[2], 'super-direction(cue)'); flags.cue = true; } return; }
    if (a === 'moins bien') { add('moins meilleur', 'hint'); add('moins mieux', 'super-moins-mieux'); return; }
    return;
  }
  const m = a.match(/^(le|la|les) (plus|moins|meilleur|meilleure|meilleurs|meilleures|mieux)( \S+)?$/);
  if (m) {
    if (m[2] === 'mieux') { add('la mieux', 'mieux-invariable'); add('le meilleur', 'super-meilleur-adverbial'); return; }
    const arts = ['le', 'la', 'les'].filter(x => x !== m[1]);
    const adj = m[3] || '';
    if (/^meilleur/.test(m[2])) {
      const forms = { le: 'meilleur', la: 'meilleure', les: m[2] === 'meilleures' ? 'meilleures' : 'meilleurs' };
      arts.forEach(x => { if (!(x === 'les' && m[1] !== 'les' && false)) add(x + ' ' + forms[x], 'super-agreement'); });
      add(m[1] + ' ' + (m[1] === 'les' ? 'plus bons' : m[1] === 'la' ? 'plus bonne' : 'plus bon'), 'super-plus-bon');
      return;
    }
    if (!adj) {     // la moins ＋ 形容詞在題目裡
      arts.forEach(x => add(x + ' ' + m[2], 'super-article-agreement'));
      return;
    }
    /* le moins intéressant／les plus efficaces：冠詞配合 ＋ 不配合的形容詞 */
    arts.forEach(x => add(x + ' ' + m[2] + adj, 'super-article-agreement'));
    return;
  }
}
function gAdj(q, P, ans, out) {
  if (ans.includes(' ')) return;
  const a = ans.toLowerCase();
  const BAGS = { beau: ['beau', 'bel', 'belle', 'beaux', 'belles'], nouveau: ['nouveau', 'nouvel', 'nouvelle', 'nouveaux', 'nouvelles'], vieux: ['vieux', 'vieil', 'vieille', 'vieux', 'vieilles'] };
  for (const k in BAGS) if (BAGS[k].includes(a)) {
    const nx = P.next.toLowerCase();
    const set = [...new Set(BAGS[k])].filter(x => x !== a);
    const v = startsVowelStrict(nx) || /^h/.test(nx);
    set.forEach(x => {
      if (x === BAGS[k][1] && !v) out.push({ f: x, why: 'bel-before-consonant' });
      else if (x === BAGS[k][0] && a === BAGS[k][1]) out.push({ f: x, why: 'beau-before-vowel' });
      else if (x !== BAGS[k][1]) {
        const xPl = /x$|s$/.test(x) && x !== 'vieux', aPl = /x$|s$/.test(a) && a !== 'vieux';
        if (xPl !== aPl && (INVARIABLE.has(nx))) return;
        if (EPICENE.has(nx) && xPl === aPl) return;
        out.push({ f: x, why: 'adj-agreement' });
      }
    });
    return;
  }
  const base = P.inf && !/(er|ir|re|oir)$/.test(P.inf) ? P.inf : (String(P.s).match(/[（(]([a-zàâçéèêëîïôûùüÿœ]+)[）)]/) || [])[1];
  if (!base) return;
  const IRR = { blanc: 'blanche', long: 'longue', bon: 'bonne', gentil: 'gentille', frais: 'fraîche', doux: 'douce', faux: 'fausse', gros: 'grosse', bas: 'basse', gras: 'grasse', sec: 'sèche', public: 'publique', grec: 'grecque', fou: 'folle', mou: 'molle' };
  let f = IRR[base] || (/e$/.test(base) ? base : /eux$/.test(base) ? base.replace(/x$/, 'se') : /er$/.test(base) ? base.replace(/er$/, 'ère') : /if$/.test(base) ? base.replace(/f$/, 've') : /(ien|on)$/.test(base) ? base + base.slice(-1) + 'e' : /el$/.test(base) ? base + 'le' : base + 'e');
  const mpl = /[sx]$/.test(base) ? base : /eau$/.test(base) ? base + 'x' : /al$/.test(base) && !/^(banal|final|natal|naval|fatal|bancal)$/.test(base) ? base.replace(/al$/, 'aux') : base + 's';
  const forms = { msg: base, fsg: f, mpl, fpl: f + 's' };
  const cell = Object.keys(forms).filter(k => norm(forms[k]) === norm(a));
  if (!cell.length) return;               // 推不出來 → 不做
  const nx = P.next.toLowerCase();
  Object.keys(forms).forEach(k => {
    if (cell.includes(k) || norm(forms[k]) === norm(a)) return;
    out.push({ f: forms[k], why: 'adj-agreement' });
  });
}
function gCestIlEst(q, P, ans, out) {
  const a = ans.toLowerCase().replace(/’/g, "'"); const add = (f, w) => out.push({ f: capLike(ans, f), why: w });
  if (a === "c'est" && /^(un|une|le|la|l'|les|des|mon|ma|ce)$/i.test(P.next)) { add('Il est', 'cest/ilest'); add('Elle est', 'cest/ilest'); }
  if (a === 'il est' && P.next && !/^(un|une|le|la|les|des)$/i.test(P.next)) { add("c'est", 'cest/ilest'); add('elle est', 'cest/ilest-gender'); }
}
function gDiscours(q, P, ans, out) {
  const a = ans.toLowerCase().replace(/’/g, "'");
  if (!(a === 'que' || a === "qu'")) return;
  if (!/\b(affirme|affirment|déclare|déclarent|annonce|annoncent)\s*$/i.test(P.tail)) return;
  out.push({ f: /^il/i.test(P.next) ? "s'" : 'si', why: 'discours-que/si' });
  out.push({ f: startsVowelStrict(P.next) ? "ce qu'" : 'ce que', why: 'discours-que/ce-que' });
}

/* ── 主流程 ───────────────────────────────────────── */
const drops = {}, dropEx = {};
const drop = (why, q) => { drops[why] = (drops[why] || 0) + 1; (dropEx[why] = dropEx[why] || []).push(q._i); };
const items = [];
BANK.forEach((q, i) => {
  q._i = i;
  const fam = famOf(q.topic); if (!fam || q.type !== 'fill') return;
  if (MANUAL_DROP[i]) { drop(MANUAL_DROP[i], q); return; }
  const P = parse(q);
  if (!P) { drop(/_{2,}/.test(q.q) ? '多個空格（一次要填兩格以上）' : '沒有空格（整句改寫／概念問答）', q); return; }
  const alts = String(q.a).split('|').map(s => s.trim()).filter(Boolean);
  /* 空格要填的那一個：字數最少的 alt */
  const ansPool = alts.slice().sort((x, y) => x.split(/\s+/).length - y.split(/\s+/).length || x.length - y.length);
  /* 後面是母音開頭的話，優先用縮寫形（qu'／l'），跟句子拼起來才自然 */
  const ans = (startsVowelStrict(P.next) && ansPool.find(x => /['’]$/.test(x) && x.split(/\s+/).length === ansPool[0].split(/\s+/).length)) || ansPool[0];
  if (/\s\/\s/.test(ans) || /,/.test(ans)) { drop('多個空格（一次要填兩格以上）', q); return; }
  if (CJK.test(ans)) { drop('正解是中文／概念', q); return; }
  const out = [], flags = {};
  if (HINT_OK[i]) HINT_OK[i].forEach(f => out.push({ f, why: 'hint' }));
  const gens = [gPossPron, gPossDet, gDemDet, gDemPron, gArticle, gTout, gRelative, gYEn, gClitic, gTonic, gSubjPron, gInterrog, gCompar, gSuper, gCestIlEst, gDiscours, gGerund, gInfinitive, gPPonly, gAdj];
  for (const g of gens) { const n0 = out.length; g(q, P, ans, out, flags); if (out.length - n0 >= 1 && g !== gAdj) break; }
  if (out.filter(o => o.why !== 'hint').length === 0) {
    if (q.topic === 'imperative-mood' || q.topic === 'condition-si') gImperative(q, P, ans, out, flags);
    if (out.filter(o => o.why !== 'hint').length === 0) gVerb(q, P, ans, out);
    if (out.filter(o => o.why !== 'hint').length === 0 && (q.topic === 'condition-si')) gImperative(q, P, ans, out, flags);
  }
  /* 過濾：不可等於任何正解（去重音、縮寫等價）、不重複、不可是中文 */
  const altKeys = new Set(alts.map(elideKey).concat(alts.map(norm)));
  const seen = new Set([elideKey(ans), norm(ans)]);
  const ds = [];
  for (const o of out) {
    const f = String(o.f).trim(); if (!f || CJK.test(f)) continue;
    const k1 = elideKey(f), k2 = norm(f);
    if (altKeys.has(k1) || altKeys.has(k2) || seen.has(k1) || seen.has(k2)) continue;
    seen.add(k1); seen.add(k2); ds.push({ f, why: o.why });
    if (ds.length === 3) break;
  }
  if (ds.length < 2) { drop(ds.length ? '只湊得到 1 個確定錯的干擾項' : (out.length ? '干擾項都跟正解撞（去重音後相同）' : noGenReason(q, P, ans)), q); return; }
  const answerHint = q.hint && new RegExp('(^|[^a-zà-ÿ])' + norm(ans).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '($|[^a-zà-ÿ])', 'i').test(norm(q.hint));
  items.push({ src: i, fam, topic: q.topic, q: q.q, a: q.a, opts: [ans].concat(ds.map(d => d.f)), aNote: q.aNote || '',
    hint: answerHint ? '' : (q.hint || ''), zh: q.zh || '', why: ds.map(d => d.why), cue: !!flags.cue });
});
function noGenReason(q, P, ans) {
  const fam = famOf(q.topic);
  if (fam === 'verb') {
    if (/^(qui|que|qu'|si|s'|comment|pourquoi|quand|où)$/i.test(ans)) return '疑問詞／連接詞：換掉也可能合文法（si／comment／quand…）';
    const sp = splitVerbAnswer(ans);
    const s = subjectOf(P.tail, []);
    if (!s) return '動詞：主詞不在空格前（命令式、倒裝、或主詞是 qui）→ 換人稱不保證錯';
    if (!getVerb(P.inf) && P.inf) return '動詞：不在變位表、也推不出規則變位';
    return '動詞：形式對不上變位表（時態／特殊結構）';
  }
  if (/^(très|beaucoup|toujours|rarement|souvent)$/i.test(ans)) return '副詞：換掉多半也合文法';
  if (/^(me|m'|te|t'|nous|vous|m’)$/i.test(ans)) return '人稱代名詞 me/te/nous/vous：換人稱合文法（只是意思不同）';
  if (/^(elle|elles)$/i.test(ans)) return '重讀 elle：跟主詞同形，找不到確定錯的形式';
  if (/^(si|s'|comment|pourquoi|quand)$/i.test(ans)) return '疑問詞／連接詞：換掉也可能合文法（si／comment／quand…）';
  return '封閉詞類以外（片語、比較級、介詞…）：沒有安全的干擾項來源';
}

/* ── 輸出 ─────────────────────────────────────────── */
const byFam = {}; items.forEach(x => byFam[x.fam] = (byFam[x.fam] || 0) + 1);
const header = `/* town_field_extra.js — 路上遭遇用的「fill 轉選擇」題（自動產生，⛔ 不要手改；改 tools/gen_town_field_extra.js 再重跑）
 * 產生：node tools/gen_town_field_extra.js（${new Date().toISOString().slice(0, 10)}）
 * 每題：src＝BANK 索引；q／a／aNote 原樣來自 questions.js；opts[0] 是正解（town 會洗牌），其餘是保證錯的干擾項
 * why＝每個干擾項的來源；cue:true＝有干擾項要靠題幹看得到的線索（(+)/(−)、中文翻譯、(xxx, vous)）才判錯，本身合文法
 * hint 已清掉「直接寫出正解」的那種（選擇題會變成送分）
 * 各家族：${JSON.stringify(byFam)}  共 ${items.length} 題
 */
var FIELD_EXTRA = ${JSON.stringify(items, null, 0).replace(/\},\{/g, '},\n{')};
if (typeof module !== 'undefined') module.exports = { FIELD_EXTRA: FIELD_EXTRA };
`;
fs.writeFileSync(path.join(__dirname, 'town_field_extra.js'), header);
console.log('寫出', items.length, '題', byFam);
if (process.argv.includes('--report')) {
  console.log('\n丟棄統計：'); Object.entries(drops).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(String(v).padStart(4), k, ' 例：', dropEx[k].slice(0, 8).join(',')));
  const fills = BANK.filter(q => famOf(q.topic) && q.type === 'fill');
  const byF = {}; fills.forEach(q => { const f = famOf(q.topic); byF[f] = (byF[f] || 0) + 1; });
  console.log('fill 題總數', byF);
  if (process.argv.includes('--dump')) items.forEach(x => console.log(x.src, x.topic, '|', x.q.slice(0, 90), '|', x.opts.join(' ／ '), '|', x.why.join(','), x.cue ? 'CUE' : ''));
}
