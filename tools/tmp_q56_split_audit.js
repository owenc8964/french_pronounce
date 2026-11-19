// Q56 唯讀：模考聽力逐字稿分段抽查（不寫任何資料檔）
// 用法：node tools/tmp_q56_split_audit.js [scan|sample|show co_N:q ...]
//   scan   ：936 題全掃自動規則
//   sample ：固定種子 20261119 抽 60 題，印出法中對照給人工看
const fs = require('fs');
const P = __dirname + '/../assets/tcf/exam/listening.json';
const d = JSON.parse(fs.readFileSync(P, 'utf8'));
const tests = d.tests.filter(t => /^co_\d+$/.test(t.id) && +t.test >= 1 && +t.test <= 24);
const all = [];
for (const t of tests) for (const q of t.questions) all.push({ id: t.id, q });

function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

function parts(q) {
  const fr = (q.script_fr || '').split('\n');
  const zhAll = (q.script_zh || '').split('\n');
  let ai = zhAll.findIndex(l => /^\s*答案/.test(l));
  if (ai < 0) ai = zhAll.length;
  const zh = zhAll.slice(0, ai).filter(l => l.trim() !== '');
  const ans = zhAll.slice(ai).join('\n');
  return { fr, zh, ans, spk: q.script_spk || '' };
}
const CJK = /[㐀-鿿＀-￯]/;
const latinRatio = s => { const s2 = s.replace(/«[^»]*»|"[^"]*"|“[^”]*”|（[^）]*）|\([^)]*\)/g, ''); const L = (s2.match(/[A-Za-zÀ-ÿ]/g) || []).length; const C = (s2.match(/[㐀-鿿]/g) || []).length; return L + C ? L / (L + C) : 0; };

function check(id, q) {
  const iss = [];
  const { fr, zh, ans, spk } = parts(q);
  if (!q.lined) iss.push('沒有 lined');
  if (spk.length !== fr.length) iss.push(`說話人長度 ${spk.length} ≠ 法文行數 ${fr.length}`);
  if (/[^A-D-]/.test(spk)) iss.push('說話人含非法字元');
  if (zh.length !== fr.length) iss.push(`中文行數 ${zh.length} ≠ 法文行數 ${fr.length}`);
  if (!ans) iss.push('沒有「答案」解析段');
  if ((q.opts || []).some(o => /correct\s*answer/i.test(o))) iss.push('選項含 Correctanswer');
  if (/正確答案/.test(q.script_fr || '')) iss.push('法文含「正確答案」');
  fr.forEach((l, i) => {
    if (/[㐀-鿿]/.test(l)) iss.push(`法文第${i + 1}行含中文字：${l.slice(0, 60)}`);
    else if (/[＀-￯　-〿]/.test(l)) iss.push(`法文第${i + 1}行含全形標點：${(l.match(/[＀-￯　-〿]/g) || []).join('')}`);
    if (/bonne réponse|réponse (correcte|est)|la réponse/i.test(l)) iss.push(`法文第${i + 1}行疑似解析：${l.slice(0, 80)}`);
    if (/correct\s*answer/i.test(l)) iss.push(`法文第${i + 1}行含 Correctanswer`);
    if (/[a-zà-ÿ]\.[A-ZÀ-Ý]/.test(l)) iss.push(`法文第${i + 1}行句點黏句：${(l.match(/.{0,25}[a-zà-ÿ]\.[A-ZÀ-Ý].{0,25}/) || [''])[0]}`);
    if (/–\s*\S/.test(l) && i === fr.length - 1) iss.push(`法文末行「–」後還有字：${l.slice(-60)}`);
    if (/ChatGPT|said:/i.test(l)) iss.push(`法文第${i + 1}行雜訊：${l.slice(0, 60)}`);
    if (/^\s*Question\s*\d+/i.test(l) && spk[i] !== '-') iss.push(`Question 行說話人不是 -（第${i + 1}行=${spk[i]}）`);
    // 一行內問句後接另一句（可能混兩人）
    if (/\?\s+[A-ZÀ-Ý][^?]{3,}/.test(l.replace(/^Question.*$/, ''))) iss.push(`法文第${i + 1}行問句後續接句子（可能兩人）：${l.slice(0, 90)}`);
  });
  zh.forEach((l, i) => {
    if (/正確答案|答案是|答案為/.test(l)) iss.push(`中文第${i + 1}行（翻譯區）含解析：${l.slice(0, 60)}`);
    if (latinRatio(l) > 0.5 && (l.match(/[A-Za-z]/g) || []).length > 15) iss.push(`中文第${i + 1}行大多是法文：${l.slice(0, 60)}`);
  });
  if (zh.length === fr.length) {
    fr.forEach((l, i) => {
      const fl = l.replace(/\s/g, '').length, zl = zh[i].replace(/\s/g, '').length;
      if (fl > 25 && zl / fl < 0.12) iss.push(`第${i + 1}行中文過短（法${fl}/中${zl}）`);
      if (fl < 15 && zl > 40) iss.push(`第${i + 1}行中文過長（法${fl}/中${zl}）`);
    });
  }
  // 獨白但 spk 有 B 不檢查；同一說話人連續超過 6 行標記
  { const seen = new Set(); let dup = 0; for (const l of fr) { const k = l.replace(/[\s–]/g, ''); if (k.length > 40) { if (seen.has(k)) dup++; seen.add(k); } } if (dup) iss.push(`整段重複 ${dup} 行`); }
  if (/([AB])\1{6,}/.test(spk)) iss.push('同一人連續 7 行以上');
  const nA = (spk.match(/A/g) || []).length, nB = (spk.match(/B/g) || []).length;
  return { iss, nA, nB };
}

const mode = process.argv[2] || 'scan';
if (mode === 'scan') {
  let n = 0, bad = 0; const cnt = {};
  for (const { id, q } of all) {
    n++; const { iss } = check(id, q);
    if (iss.length) { bad++; console.log(`${id}:${q.q}`, iss.join(' | ')); }
    for (const s of iss) { const k = s.replace(/第\d+行/, '第N行').replace(/[：（].*$/, ''); cnt[k] = (cnt[k] || 0) + 1; }
  }
  console.log('\n總題數', n, '有標記', bad);
  console.log(cnt);
} else if (mode === 'sample') {
  const r = mulberry32(20261119);
  const idx = all.map((_, i) => i);
  for (let i = idx.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
  const N = +(process.argv[3] || 60);
  const pick = idx.slice(0, N).sort((a, b) => a - b);
  console.log('SAMPLE', pick.map(i => `${all[i].id}:${all[i].q.q}`).join(' '));
  for (const i of pick) show(all[i]);
} else if (mode === 'tail') {
  // 問題行之後還有非選項的法文行（解析引文殘留／重複殘句）、超長單行、獨白標成全 A 但有問句行
  let nTail = 0, nLong = 0, nLongQ = 0;
  for (const { id, q } of all) {
    const { fr, spk } = parts(q);
    const qi = fr.findIndex(l => /^\s*Question\b/i.test(l));
    const qIdx = qi >= 0 ? qi : spk.lastIndexOf('-');
    if (qIdx >= 0) {
      const rest = fr.slice(qIdx + 1).filter(l => !/^\s*[A-D]\s*[.)\-–:]/.test(l) && l.replace(/[–\s]/g, '') !== '');
      if (rest.length && !/^-+$/.test(spk.slice(0, qIdx + 1).replace(/[A-D]/g, '')) === false) { }
      if (rest.length && /^[A-D]/.test(spk)) { nTail++; console.log('TAIL', `${id}:${q.q}`, rest.map(s => s.slice(0, 70)).join(' ‖ ')); }
    }
    const long = fr.filter(l => l.length > 450).length;
    if (long) { nLongQ++; nLong += long; }
  }
  console.log('問題行後有殘留法文的題數', nTail, '／超過450字元的單行', nLong, '行，分布在', nLongQ, '題');
} else if (mode === 'same') {
  // 同一段錄音出現在不同套：比對切行與說話人是否一致（客觀的一致性檢查）
  const g = {};
  for (const { id, q } of all) {
    const { fr, spk } = parts(q);
    const qi = fr.findIndex(l => /^\s*Question\b/i.test(l));
    const body = (qi > 0 ? fr.slice(0, qi) : fr).join('\n');
    const key = body.replace(/[\s–]/g, '').replace(/[^A-Za-zÀ-ÿ]/g, '').slice(0, 200);
    if (key.length < 60) continue; // 選項題、太短的不比
    (g[key] = g[key] || []).push({ k: `${id}:${q.q}`, lines: body.split('\n').map(l => l.replace(/[\s–]/g, '')), spk: spk.slice(0, qi > 0 ? qi : spk.length) });
  }
  let groups = 0, same = 0, diff = 0; const cntTag = {};
  for (const arr of Object.values(g)) {
    if (arr.length < 2) continue; groups++;
    const a = arr[0];
    for (const b of arr.slice(1)) {
      const eqText = a.lines.join('') === b.lines.join('');
      const eqSplit = eqText && a.lines.join('|') === b.lines.join('|');
      const ok = eqSplit && a.spk === b.spk;
      // 換人點比較：把每個換人位置換算成「在全文第幾個字元」比較
      const turns = x => { const pos = []; let c = 0; for (let i = 0; i < x.lines.length; i++) { if (i > 0 && x.spk[i] !== x.spk[i - 1]) pos.push(c); c += x.lines[i].length; } return pos.join(','); };
      const sameTurns = eqText && turns(a) === turns(b);
      if (ok) same++; else { diff++; const tag = eqText ? (sameTurns ? '只差同一人內再切行（無害）' : '⚠️換人位置不同') : '文字不完全相同'; cntTag[tag] = (cntTag[tag] || 0) + 1; console.log('DIFF', a.k, a.spk, '<>', b.k, b.spk, tag); }
    }
  }
  console.log('重複錄音組', groups, '一致的配對', same, '不一致', diff, cntTag);
} else if (mode === 'show') {
  for (const a of process.argv.slice(3)) { const [id, qq] = a.split(':'); const x = all.find(o => o.id === id && String(o.q.q) === qq); if (x) show(x); }
}
function show({ id, q }) {
  const { fr, zh, ans, spk } = parts(q);
  console.log(`\n===== ${id}:${q.q}  spk=${spk}  ans=${q.answer}`);
  fr.forEach((l, i) => console.log(`[${spk[i] || '?'}] ${l}\n     ${zh[i] === undefined ? '（無中文）' : zh[i]}`));
  if (zh.length > fr.length) zh.slice(fr.length).forEach(l => console.log('     多出中文：' + l));
  console.log('  解析：' + ans.slice(0, 160).replace(/\n/g, ' / '));
}
