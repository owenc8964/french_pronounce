// Q90：比對 verb_forms.html cellMark()（現行，抄第 955-977 行）與修正草稿版本，並試跑 drillForms 的 payer 多解（只讀，不改任何檔）
// 用法：node tools/tmp_q90_fix_check.js
const V = require('../verbs_full.js');
const { VERBS_FULL, conjugate, imparfait, imperatif, drillForms } = V;
const stemNous = v => v.pres[3].replace(/ons$/, ''), stemIls = v => v.pres[5].replace(/ent$/, '');
const regFut = v => /re$/.test(v.inf) ? v.inf.slice(0, -1) : v.inf;
const regSubj = v => { const ils = stemIls(v), imp = imparfait(v); return [ils + 'e', ils + 'es', ils + 'e', imp[3], imp[4], ils + 'ent']; };
const regImper = v => { let tu = v.pres[1]; if (/er$/.test(v.inf) || v.inf === 'aller') tu = tu.replace(/es$/, 'e').replace(/as$/, 'a'); return [tu, v.pres[3], v.pres[4]]; };
const BIG4 = ['être', 'avoir', 'aller', 'faire'];

/* ── 現行（照抄） ── */
function cellMarkOld(v, t, i) {
  const f = t.forms[i]; if (f == null || v.imperso) return '';
  const regular = v.grp === '規則樣本';
  switch (t.id) {
    case 'present':
      if (regular) return '';
      if (BIG4.includes(v.inf) && !/ons$/.test(v.pres[3])) return '要背';
      if (!f.startsWith(stemNous(v))) return '詞幹變了';
      if (i === 5 && stemIls(v) !== stemNous(v)) return 'ils 詞幹變了';
      if (i === 4 && !/ez$/.test(f)) return '不是 -ez';
      if (i === 5 && !/ent$/.test(f)) return '不是 -ent';
      return '';
    case 'imparfait': return v.imp ? `詞幹 ${v.imp}-` : '';
    case 'futur-simple': case 'conditionnel': return v.fut !== regFut(v) ? `詞幹 ${v.fut}-` : '';
    case 'subjonctif': return v.subj && v.subj[i] !== regSubj(v)[i] ? '要背' : '';
  }
  return '';
}

/* ── 草稿版本（跟 drafts/變位總覽標記與payer修正草稿_2026-11-26.md 第一節同一段） ── */
const ER_END = ['e', 'es', 'e', 'ons', 'ez', 'ent'];
const IMPF_END = ['ais', 'ais', 'ait', 'ions', 'iez', 'aient'];
function spellNote(reg, f) {
  if (/ge/.test(f) && !/ge/.test(reg)) return 'g → ge（保持 [ʒ]）';
  if (/ç/.test(f) && !/ç/.test(reg)) return 'c → ç（保持 [s]）';
  if (/ç/.test(reg) && !/ç/.test(f)) return 'i 前面不用 ç';
  if (/ge/.test(reg) && !/ge/.test(f)) return 'i 前面不用 e';
  if (/ll/.test(f)) return 'l → ll';
  if (/tt/.test(f)) return 't → tt';
  if (/è/.test(f)) return /é/.test(reg) ? 'é → è' : 'e → è';
  if (/i/.test(f) && /y/.test(reg)) return 'y → i';
  return '拼字變了';
}
function cellMarkNew(v, t, i) {
  const f = t.forms[i]; if (f == null || v.imperso) return '';
  const regular = v.grp === '規則樣本';
  const spell = v.grp === '-er 拼字會變';
  switch (t.id) {
    case 'present':
      if (regular) return '';
      if (BIG4.includes(v.inf) && !/ons$/.test(v.pres[3])) return '要背';
      if (spell) { const reg = v.inf.slice(0, -2) + ER_END[i]; return f !== reg ? spellNote(reg, f) : ''; }
      if (!f.startsWith(stemNous(v))) return '詞幹變了';
      if (i === 5 && stemIls(v) !== stemNous(v)) return 'ils 詞幹變了';
      if (i === 4 && !/ez$/.test(f)) return '不是 -ez';
      if (i === 5 && !/ent$/.test(f)) return '不是 -ent';
      return '';
    case 'imparfait':
      if (v.impf) { const reg = stemNous(v) + IMPF_END[i]; return f !== reg ? spellNote(reg, f) : ''; }
      return v.imp ? `詞幹 ${v.imp}-` : '';
    case 'futur-simple': case 'conditionnel': return v.fut !== regFut(v) ? `詞幹 ${v.fut}-` : '';
    case 'subjonctif': return v.subj && v.subj[i] !== regSubj(v)[i] ? '要背' : '';
  }
  return '';
}

const P = ['je', 'tu', 'il', 'nous', 'vous', 'ils'];
console.log('=== cellMark 現行 vs 草稿（只列有差異的動詞×時態）===');
let diffN = 0;
for (const v of VERBS_FULL) {
  for (const t of conjugate(v)) {
    if (!['present', 'imparfait', 'futur-simple', 'conditionnel', 'subjonctif'].includes(t.id)) continue;
    const a = [0, 1, 2, 3, 4, 5].map(i => cellMarkOld(v, t, i)), b = [0, 1, 2, 3, 4, 5].map(i => cellMarkNew(v, t, i));
    if (a.join('|') === b.join('|')) continue;
    diffN++;
    const show = m => t.forms.map((f, i) => f == null ? '' : P[i] + ' ' + f + (m[i] ? '【' + m[i] + '】' : '')).filter(Boolean).join('  ');
    console.log(`\n${v.inf} · ${t.id}\n  現行：${show(a)}\n  草稿：${show(b)}`);
  }
}
console.log(`\n共 ${diffN} 個 動詞×時態 有差異`);

/* ── drillForms 多解（草稿第二節） ── */
function withAlt(v, tenseId, forms) {
  if (!v.alt) return forms;
  const t2 = conjugate(Object.assign({}, v, v.alt)).find(x => x.id === tenseId);
  if (!t2) return forms;
  return forms.map((f, i) => (f != null && t2.forms[i] && t2.forms[i] !== f) ? f + '|' + t2.forms[i] : f);
}
const payer = Object.assign({}, VERBS_FULL.find(x => x.inf === 'payer'), { alt: { pres: ['paye', 'payes', 'paye', 'payons', 'payez', 'payent'], fut: 'payer' } });
console.log('\n=== payer 加 alt 之後 drillForms 的樣子 ===');
for (const tid of ['present', 'passe-compose', 'imparfait', 'futur-simple', 'conditionnel', 'subjonctif', 'plus-que-parfait']) {
  const base = drillForms(payer, tid);
  console.log(tid.padEnd(17), withAlt(payer, tid, base).join('  ／  '));
}
// 其他動詞不受影響：沒有 alt 的動詞 withAlt 原樣回傳
let touched = 0;
for (const v of VERBS_FULL) for (const tid of ['present', 'imparfait', 'futur-simple', 'conditionnel', 'subjonctif']) {
  const b = drillForms(v, tid); if (b && withAlt(v, tid, b).join() !== b.join()) touched++;
}
console.log('\n沒有 alt 的動詞被改到的時態數：', touched, '（應為 0）');
console.log('命令式（payer 加 alt 後 imperatif）：', imperatif(Object.assign({}, payer, payer.alt)).join(' ／ '));
