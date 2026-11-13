#!/usr/bin/env node
/* 📎 片語表健檢（2026-11-13）：拿 88 套模考原文／逐字稿去數 tcf_phrases.js 每條片語出現幾次，抽樣句子看有沒有認錯
   跑法：node tools/exam_phrases.js            → 每條出現次數（題數）＋一句抽樣
         node tools/exam_phrases.js --zero     → 只列題庫裡一次都沒出現的（考慮刪掉）
         node tools/exam_phrases.js "avoir lieu" → 那一條的全部句子
         node tools/exam_phrases.js --todo     → 單字庫裡還沒中文的片語卡（自己圈的）＋原句，
                                                  補好寫進 assets/tcf/exam/vocab/phrase_zh.json（{key: 中文}），下次查字時 dev_server 會蓋上去
   ⛔ 只讀 listening.json／reading.json，不寫 */
const path = require('path'), fs = require('fs');
const ROOT = path.join(__dirname, '..');
if (process.argv[2] === '--todo') {
  const V = JSON.parse(fs.readFileSync(path.join(ROOT, 'assets/tcf/exam/vocab/vocab.json'), 'utf8')).words.filter(w => w.pos === 'PHR' && !w.zh);
  if (!V.length) { console.log('片語卡都有中文了'); process.exit(0); }
  V.forEach(w => { console.log(JSON.stringify(w.key) + ': ""'); (w.ex || []).slice(0, 2).forEach(e => console.log('    ' + e.test + '#' + e.q + '  ' + e.fr)); });
  console.log('\n→ 補好寫進 assets/tcf/exam/vocab/phrase_zh.json，⭐ 中文是查字輔助，照原句的意思翻，⛔ 不另外造句');
  process.exit(0);
}
const PH = require(path.join(ROOT, 'tcf_phrases.js'));
const T = x => Array.isArray(x) ? x : (x.tests || Object.values(x));
const tests = [...T(require(path.join(ROOT, 'assets/tcf/exam/listening.json'))), ...T(require(path.join(ROOT, 'assets/tcf/exam/reading.json')))];
const arg = process.argv[2];
const n = {}, ex = {};
let qs = 0;
for (const t of tests) for (const q of t.questions) {
  const txt = q.script_fr || q.text_fr; if (!q.tok || !txt) continue; qs++;
  const seen = new Set();
  for (const h of PH.matchTok(txt, q.tok)) {
    const a = q.tok[h.i0][0], b = q.tok[h.i1][1];
    if (!seen.has(h.id)) { seen.add(h.id); n[h.id] = (n[h.id] || 0) + 1; }
    (ex[h.id] = ex[h.id] || []).push(t.id + '#' + q.q + '  …' + txt.slice(Math.max(0, a - 30), a).replace(/\s+/g, ' ') + '【' + txt.slice(a, b) + '】' + txt.slice(b, b + 30).replace(/\s+/g, ' ') + '…');
  }
}
if (arg && arg !== '--zero') {
  const e = PH.LIST.find(x => x.fr === arg); if (!e) { console.log('沒有這條'); process.exit(1); }
  console.log(e.fr, '＝', e.zh, '  原形序列：', e.p.join(' '), '  出現在', n[e.id] || 0, '題');
  (ex[e.id] || []).forEach(s => console.log('  ' + s));
  process.exit(0);
}
console.log('掃了', tests.length, '套、', qs, '題（有分析的）；片語表', PH.LIST.length, '條');
const rows = PH.LIST.map(e => [e, n[e.id] || 0]).sort((a, b) => b[1] - a[1]);
if (arg === '--zero') { rows.filter(r => !r[1]).forEach(([e]) => console.log('  0  ' + e.fr)); process.exit(0); }
rows.forEach(([e, c]) => console.log(String(c).padStart(4) + '  ' + e.fr + '＝' + e.zh + (ex[e.id] ? '\n        ' + ex[e.id][Math.floor(ex[e.id].length / 2)] : '')));
console.log('出現過的：', rows.filter(r => r[1]).length, '條；沒出現的：', rows.filter(r => !r[1]).length, '條');
