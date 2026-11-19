#!/usr/bin/env node
/* Q57 唯讀補查：alors que＋qu'est-ce、同一處疊 3 條以上片語、de plus en plus de 疊幾條；⛔ 只讀 */
const path = require('path');
const ROOT = path.join(__dirname, '..');
const PH = require(path.join(ROOT, 'tcf_phrases.js'));
const T = x => Array.isArray(x) ? x : (x.tests || Object.values(x));
const tests = [...T(require(path.join(ROOT, 'assets/tcf/exam/listening.json'))), ...T(require(path.join(ROOT, 'assets/tcf/exam/reading.json')))];
const id = f => PH.LIST.find(x => x.fr === f).id;
const AQ = id('alors que');
let aq = [], stack = {}, total = 0;
for (const t of tests) for (const q of t.questions) {
  const txt = q.script_fr || q.text_fr; if (!q.tok || !txt) continue;
  const hs = PH.matchTok(txt, q.tok); total += hs.length;
  for (const h of hs) {
    const a = q.tok[h.i0][0], b = q.tok[h.i1][1];
    if (h.id === AQ && /^\s*est/i.test(txt.slice(b, b + 6))) aq.push(t.id + '#' + q.q + ' …【' + txt.slice(a, b) + '】' + txt.slice(b, b + 25));
    // 每個字被幾條片語蓋到
    for (let i = h.i0; i <= h.i1; i++) { const k = t.id + '#' + q.q + '@' + i; (stack[k] = stack[k] || new Set()).add(PH.LIST[h.id].fr); }
  }
}
console.log('全部命中', total);
console.log('alors que 接 est-ce：', aq.length); aq.forEach(s => console.log('  ' + s));
const combos = {};
for (const s of Object.values(stack)) if (s.size >= 3) { const k = [...s].sort().join(' ＋ '); combos[k] = (combos[k] || 0) + 1; }
console.log('同一個字被 ≥3 條片語蓋到的組合：');
Object.entries(combos).sort((a, b) => b[1] - a[1]).slice(0, 20).forEach(([k, v]) => console.log('  ' + v + '  ' + k));
