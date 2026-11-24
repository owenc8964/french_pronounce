// tools/tmp_q66_sample.js — Q66 唯讀抽查：模考第4套（co_4）查字「在這題的意思」＋片語
// 用法：node tools/tmp_q66_sample.js [keys|words|phr] > 輸出
// ⛔ 唯讀，不改任何資料。種子 20261124。
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..', 'assets', 'tcf', 'exam');
const L = JSON.parse(fs.readFileSync(path.join(ROOT, 'listening.json'), 'utf8'));
const T = L.tests.find(t => t.id === 'co_4');
const src = fs.readFileSync(path.join(ROOT, 'ctx', 'co_4.js'), 'utf8');
let CTX, PH;
global.window = { TCF_CTX_LOAD: 1 };
global.TCF_CTX_LOAD = (id, a, b) => { CTX = a; PH = b; };
eval(src);
const mode = process.argv[2] || 'keys';
const Q = {}; T.questions.forEach(q => Q[String(q.q)] = q);
const txt = q => q.script_fr || q.text_fr || '';
// mulberry32
function rng(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const R = rng(20261124);
function around(s, a, b, n) { n = n || 70; return s.slice(Math.max(0, a - n), a) + '【' + s.slice(a, b) + '】' + s.slice(b, b + n); }
if (mode === 'keys') {
  const q = T.questions[0];
  console.log(Object.keys(q));
  console.log(JSON.stringify(Object.fromEntries(Object.entries(q).filter(([k]) => k !== 'tok')), null, 1).slice(0, 3000));
  console.log('題數', T.questions.length, '有ctx題', Object.keys(CTX).length, '字', Object.values(CTX).reduce((s, m) => s + Object.keys(m).length, 0), '片語', Object.values(PH).reduce((s, m) => s + m.length, 0));
} else if (mode === 'words') {
  const all = [];
  for (const [qn, m] of Object.entries(CTX)) for (const [s, zh] of Object.entries(m)) all.push([qn, +s, zh]);
  // 洗牌取 110
  for (let i = all.length - 1; i > 0; i--) { const j = Math.floor(R() * (i + 1)); [all[i], all[j]] = [all[j], all[i]]; }
  const N = +(process.argv[3] || 110);
  all.slice(0, N).sort((x, y) => x[0] - y[0] || x[1] - y[1]).forEach(([qn, s, zh], i) => {
    const q = Q[qn], t = txt(q); const m = t.slice(s).match(/^[\wÀ-ÿ'’-]+/); const w = m ? m[0] : '?';
    console.log(`W${i + 1}\tQ${qn}@${s}\t${w}\t=> ${zh}\n\t${around(t, s, s + w.length, 60).replace(/\s+/g, ' ')}`);
  });
} else if (mode === 'phr') {
  let i = 0;
  for (const [qn, arr] of Object.entries(PH)) {
    const q = Q[qn], t = txt(q);
    for (const [a, b, fr, zh] of arr) {
      i++;
      console.log(`P${i}\tQ${qn}@${a}-${b}\t${fr}\t=> ${zh}\t${t.slice(a, b) === fr ? 'OK' : 'MISMATCH'}\n\t${around(t, a, b, 50).replace(/\s+/g, ' ')}`);
    }
  }
} else if (mode === 'sys') {
  // 系統片語表 tcf_phrases.js 在 co_4 的命中（mock.html 第 1185 行：跟「這題片語」一起顯示）
  const TP = require(path.join(__dirname, '..', 'tcf_phrases.js'));
  let n = 0;
  for (const q of T.questions) {
    const t = txt(q), tok = q.tok || [];
    const cp = PH[String(q.q)] || [];
    TP.matchTok(t, tok).forEach(h => {
      const e = TP.LIST[h.id], a = tok[h.i0][0], b = tok[h.i1][1];
      const same = cp.some(c => c[2].toLowerCase().replace(/\s+/g, ' ') === e.fr.toLowerCase());
      const inCtx = cp.some(c => a < c[1] && b > c[0]);
      n++;
      console.log(`S${n}\tQ${q.q}@${a}-${b}\t#${h.id} ${e.fr}＝${e.zh}${same ? '\t[同ctx→不重複]' : inCtx ? '\t[跟ctx片語重疊]' : ''}\n\t${around(t, a, b, 45).replace(/\s+/g, ' ')}`);
    });
  }
} else if (mode === 'look') {
  // look 題號 關鍵字：印出原文含關鍵字的片段、該位置附近的 ctx 字義、整段中文
  const [qn, kw] = process.argv.slice(3); const q = Q[qn], t = txt(q);
  let i = t.indexOf(kw); console.log('FR:', i >= 0 ? around(t, i, i + kw.length, 120).replace(/\s+/g, ' ') : '(找不到)');
  for (const [s, zh] of Object.entries(CTX[qn] || {})) if (i >= 0 && +s >= i - 40 && +s <= i + kw.length + 40) console.log('  ctx', s, t.slice(+s, +s + 16).split(/\s/)[0], '=>', zh);
  console.log('ZH:', q.script_zh);
} else if (mode === 'glued') {
  // 句點後沒空格，兩個字被切成一個 token（如 consommer.Il）：點後面那個字會借到前一個字的中文
  let n = 0;
  for (const q of T.questions) { const t = txt(q), m = CTX[String(q.q)] || {};
    (q.tok || []).forEach(([a, b]) => { const w = t.slice(a, b); if (/[a-zà-ÿ0-9][.!?][A-ZÀ-Ýa-zà-ÿ]/.test(w)) { n++; console.log(`G${n}\tQ${q.q}@${a}\t${w}\t=> ${m[String(a)] || '(無ctx)'}`); } }); }
} else if (mode === 'q') {
  // 顯示某題選項與答案
  for (const qn of process.argv.slice(3)) { const q = Q[qn]; const o = Object.fromEntries(Object.entries(q).filter(([k]) => !['tok', 'script_fr', 'script_zh'].includes(k))); console.log(qn, JSON.stringify(o)); }
}
