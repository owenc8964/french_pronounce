#!/usr/bin/env node
/* Q57 唯讀稽核：tcf_phrases.js 每條片語在題庫的出現次數＋抽樣（最多 6 句，平均分佈）
   跑法：node tools/tmp_q57_audit.js > 輸出；⛔ 只讀不寫 */
const path = require('path');
const ROOT = path.join(__dirname, '..');
const PH = require(path.join(ROOT, 'tcf_phrases.js'));
const T = x => Array.isArray(x) ? x : (x.tests || Object.values(x));
const tests = [...T(require(path.join(ROOT, 'assets/tcf/exam/listening.json'))), ...T(require(path.join(ROOT, 'assets/tcf/exam/reading.json')))];
const N = +(process.argv[2] || 6);
const n = {}, ex = {}, span = {};
let qs = 0;
for (const t of tests) for (const q of t.questions) {
  const txt = q.script_fr || q.text_fr; if (!q.tok || !txt) continue; qs++;
  const seen = new Set();
  for (const h of PH.matchTok(txt, q.tok)) {
    const a = q.tok[h.i0][0], b = q.tok[h.i1][1];
    if (!seen.has(h.id)) { seen.add(h.id); n[h.id] = (n[h.id] || 0) + 1; }
    const m = txt.slice(a, b).replace(/\s+/g, ' ');
    (span[h.id] = span[h.id] || {})[m.toLowerCase()] = ((span[h.id] || {})[m.toLowerCase()] || 0) + 1;
    (ex[h.id] = ex[h.id] || []).push(t.id + '#' + q.q + ' …' + txt.slice(Math.max(0, a - 40), a).replace(/\s+/g, ' ') + '【' + m + '】' + txt.slice(b, b + 40).replace(/\s+/g, ' ') + '…');
  }
}
console.log('tests', tests.length, 'qs', qs, 'list', PH.LIST.length);
for (const e of PH.LIST) {
  const xs = ex[e.id] || [];
  console.log('\n#' + e.id, e.fr, '＝', e.zh, '| p=', e.p.join(' '), '| 題數', n[e.id] || 0, '| 命中', xs.length);
  const sp = Object.entries(span[e.id] || {}).sort((a, b) => b[1] - a[1]).slice(0, 12).map(([k, v]) => k + '×' + v).join(' / ');
  if (sp) console.log('  字面:', sp);
  const pick = xs.length <= N ? xs : Array.from({ length: N }, (_, i) => xs[Math.floor(i * xs.length / N)]);
  pick.forEach(s => console.log('   ' + s));
}
