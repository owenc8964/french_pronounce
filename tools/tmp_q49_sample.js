// Q49 模考選項翻譯核對：固定種子 20261112 抽樣（唯讀，不改任何資料檔）
// 用法：node tools/tmp_q49_sample.js [抽幾題=64]
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const DATA = path.join(ROOT, 'assets/tcf/exam/data');

// 讀 data/co_*.js（TCF_LOAD("co_4",{...})）
const pool = [];
const files = fs.readdirSync(DATA).filter(f => /^co_\d+\.js$/.test(f))
  .sort((a, b) => parseInt(a.slice(3)) - parseInt(b.slice(3)));
for (const f of files) {
  const src = fs.readFileSync(path.join(DATA, f), 'utf8');
  const m = src.match(/^TCF_LOAD\("([^"]+)",([\s\S]*)\);?\s*$/);
  if (!m) { console.error('parse fail', f); continue; }
  const t = JSON.parse(m[2]);
  for (const q of t.questions) {
    if (q.opts_zh) pool.push({ test: t.id, q });
  }
}

// mulberry32 固定種子
function rng(seed) {
  return function () {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
const r = rng(20261112);
const idx = pool.map((_, i) => i);
for (let i = idx.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
const N = parseInt(process.argv[2] || '64');
const pick = idx.slice(0, N).map(i => pool[i])
  .sort((a, b) => parseInt(a.test.slice(3)) - parseInt(b.test.slice(3)) || a.q.q - b.q.q);

// 與 mock.html reflowFr 同邏輯（mock.html 2026-11-10 版）
function reflowFr(s) {
  return String(s || '').split('\n').map(l => l.trim()).filter(Boolean).join(' ')
    .replace(/([.?!…])\s+(?=[«"A-ZÀ-Ý–—-])/g, '$1\n')
    .replace(/\s+(Question\s*\d)/g, '\n$1');
}

console.log('pool(有 opts_zh 的題)=', pool.length, ' 抽', pick.length);
const phZh = pool.filter(p => /^(Proposition|Réponse) [a-d]/.test(p.q.opts[0])).length;
console.log('其中佔位選項卻有 opts_zh（顯示「答案 a」之類）：', phZh);
if (process.argv.includes('--flags')) {
  const agg = { 黏句: 0, 混中文: 0, 縮寫誤切: 0, 題號沒切: 0, 乾淨: 0 };
  for (const { test, q } of pick) {
    const rf = reflowFr(q.script_fr), f = [];
    if (/[a-zà-ÿ0-9][.?!:](?=[A-ZÀ-Ýa-zà-ÿ])/.test(rf)) f.push('黏句');
    if (/[一-鿿]/.test(rf)) f.push('混中文');
    if (/\bM\.\n/.test(rf)) f.push('縮寫誤切');
    if (/Question\s*\d*\s*[.:：]\s*\S/.test(rf) && /\S\s*Question/.test(rf.replace(/\n/g, ' ')) === false) {}
    if (/Question\s*\d+\.[A-ZÀ-Ýa-z]/.test(rf) || /Question\s*:[a-z]/i.test(rf)) f.push('題號沒切');
    f.forEach(k => agg[k]++); if (!f.length) agg.乾淨++;
    console.log(test + ' Q' + q.q + '：' + (f.join('、') || '乾淨'));
  }
  console.log(JSON.stringify(agg));
  process.exit(0);
}
for (const { test, q } of pick) {
  console.log('\n===== ' + test + ' Q' + q.q + '  answer=' + q.answer);
  q.opts.forEach((o, i) => console.log('  ' + 'ABCD'[i] + '. ' + o + '  ||  ' + (q.opts_zh[i] || '(缺)')));
  if (process.argv.includes('--script')) {
    console.log('  --- reflow ---');
    reflowFr(q.script_fr).split('\n').forEach(l => console.log('  | ' + l));
  }
}
