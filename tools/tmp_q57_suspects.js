#!/usr/bin/env node
/* Q57 唯讀：可疑片語的全部命中＋分類計數；⛔ 只讀不寫
   跑法：node tools/tmp_q57_suspects.js */
const path = require('path');
const ROOT = path.join(__dirname, '..');
const PH = require(path.join(ROOT, 'tcf_phrases.js'));
const T = x => Array.isArray(x) ? x : (x.tests || Object.values(x));
const tests = [...T(require(path.join(ROOT, 'assets/tcf/exam/listening.json'))), ...T(require(path.join(ROOT, 'assets/tcf/exam/reading.json')))];
const WANT = ['est-ce que', 'bien que', 'plus de', 'moins de', 'en plus de', 'une dizaine de', 'une centaine de', 'au cours de', 'ça va', 'en train de', 'ne … que', 'ne … personne', 'ne … plus', 'se passer de', 'avoir l\'occasion de', 'se passer', 'rendre visite à', 'venir de', 'se trouver', 's\'inscrire', 'plein de', 'au moins'];
const ids = new Set(WANT.map(f => { const e = PH.LIST.find(x => x.fr === f); if (!e) console.log('沒有', f); return e && e.id; }));
const all = {};
for (const t of tests) for (const q of t.questions) {
  const txt = q.script_fr || q.text_fr; if (!q.tok || !txt) continue;
  for (const h of PH.matchTok(txt, q.tok)) {
    if (!ids.has(h.id)) continue;
    const a = q.tok[h.i0][0], b = q.tok[h.i1][1];
    const nx = q.tok[h.i1 + 1] || [], nxw = nx.length ? txt.slice(nx[0], nx[1]) : '', nxp = nx[3] || '', nxm = nx[4] || '';
    (all[h.id] = all[h.id] || []).push({ ref: t.id + '#' + q.q, m: txt.slice(a, b).replace(/\s+/g, ' '), pre: txt.slice(Math.max(0, a - 30), a).replace(/\s+/g, ' '), post: txt.slice(b, b + 30).replace(/\s+/g, ' '), nxw, nxp, nxm });
  }
}
for (const f of WANT) {
  const e = PH.LIST.find(x => x.fr === f); if (!e) continue;
  const xs = all[e.id] || [];
  console.log('\n=====', f, '命中', xs.length);
  const show = x => console.log('   ' + x.ref + ' …' + x.pre + '【' + x.m + '】' + x.post + '…  [next=' + x.nxw + '/' + x.nxp + '/' + x.nxm + ']');
  if (f === 'ça va') {
    const inf = xs.filter(x => x.nxp === 'VERB' || x.nxp === 'AUX');
    console.log('  後面接動詞（近未來 ça va + 原形）:', inf.length); inf.forEach(show);
    continue;
  }
  if (f === 'est-ce que') { xs.filter(x => !/^est[- ]ce/i.test(x.m)).forEach(show); continue; }
  if (f === 'plus de' || f === 'en plus de') {
    const inside = xs.filter(x => /plus en plus/i.test(x.pre.slice(-12) + x.m)); console.log('  在 de plus en plus de 裡:', inside.length);
    const neg = xs.filter(x => /\bn(e |')\S*\s*$|\bn'y a\s*$|\bn'\S+\s*$/i.test(x.pre) || /\bne\b|n'/i.test(x.pre.slice(-15))); console.log('  前面有 ne（可能是「不再有」）:', neg.length); neg.slice(0, 12).forEach(show);
    xs.filter(x => !/^plus d|^en plus d/i.test(x.m)).forEach(show);
    if (f === 'en plus de') xs.filter(x => !/plus\s*$/i.test(x.pre)).forEach(show);
    continue;
  }
  if (f === 'moins de') { xs.filter(x => !/^moins d/i.test(x.m)).forEach(show); continue; }
  if (f === 'se passer' || f === 'venir de' || f === 'se trouver' || f === 'au moins') { xs.slice(0, 0).forEach(show); if (f === 'se trouver') xs.filter(x => /^il\s*$/i.test(x.pre.trim().split(' ').pop()) && x.nxw.startsWith('qu')).forEach(show); continue; }
  xs.forEach(show);
}
