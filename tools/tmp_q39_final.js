// Q39：最後補查＋分層推估＋S7 精修。只讀不改。
const fs = require('fs');
function parse(file, name) {
  const raw = fs.readFileSync(file, 'utf8'), pages = {};
  const re = /===== \[([^\]]+)\] page (\d+) =====\n/g; let m, last = null;
  while ((m = re.exec(raw))) { if (last && last.b === name) pages[last.p] = raw.slice(last.end, m.index); last = { b: m[1], p: +m[2], end: re.lastIndex }; }
  if (last && last.b === name) pages[last.p] = raw.slice(last.end);
  return pages;
}
const C = 'assets/.textbook_cache.txt';
const A1C = parse(C, 'Edito Cah22 A1 Owen.pdf'), A1B = parse(C, 'Edito22 A1 Owen.pdf'), A2B = parse(C, 'Edito22 A2 Owen 7:21.pdf'), A2O = parse('assets/.ocr_EditoA2_2022_Cahier_.txt', 'EditoA2 2022 Cahier .pdf');
// 補查
const t141 = A1C[141]; let k = t141.indexOf('Page 106'); console.log('p106 corr:', t141.slice(k, k + 420));
let t136 = A1C[136].split('\n---')[0]; k = t136.indexOf('Avec ma classe'); console.log('p44 4d:', k >= 0 ? t136.slice(k - 30, k + 60) : 'not in first view');
k = t136.indexOf('Le théâtre propose'); console.log('p44 ctx:', t136.slice(k, k + 700));
const t126 = A1B[126]; k = t126.indexOf('Prenez les escaliers'); console.log('p126 heading:', t126.slice(Math.max(0, k - 260), k + 30));
// 分層推估
const N = { A1C: 578, A2C: 407, A1B: 220, A2B: 10 }, n = { A1C: 36, A2C: 26, A1B: 14, A2B: 4 };
const tiers = {
  '全部有問題（含輕微）': { A1C: 10, A2C: 6, A1B: 4, A2B: 0 },
  '實質問題（會冤枉）': { A1C: 5, A2C: 5, A1B: 3, A2B: 0 },
  '說明講窄（含順帶）': { A1C: 2, A2C: 0, A1B: 1, A2B: 0 },
  '答案／法文錯': { A1C: 0, A2C: 0, A1B: 0, A2B: 0 },
};
const NT = 1215;
for (const t in tiers) {
  let p = 0, v = 0;
  for (const s in N) {
    const ps = tiers[t][s] / n[s], w = N[s] / NT;
    p += w * ps;
    v += w * w * (1 - n[s] / N[s]) * ps * (1 - ps) / (n[s] - 1);
  }
  const se = Math.sqrt(v), se15 = Math.sqrt(v * 1.5);
  const x = Object.values(tiers[t]).reduce((a, b) => a + b, 0), nn = 80, z = 1.96, ph = x / nn;
  const den = 1 + z * z / nn, ctr = (ph + z * z / (2 * nn)) / den, half = z * Math.sqrt(ph * (1 - ph) / nn + z * z / (4 * nn * nn)) / den;
  console.log(t, `x=${x}/80 加權=${(p * 100).toFixed(1)}% 約${Math.round(p * NT)}題 ±1.96SE=[${((p - z * se) * 100).toFixed(1)}, ${((p + z * se) * 100).toFixed(1)}] DE1.5=[${((p - z * se15) * 100).toFixed(1)}, ${((p + z * se15) * 100).toFixed(1)}] Wilson未加權=[${((ctr - half) * 100).toFixed(1)}, ${((ctr + half) * 100).toFixed(1)}]`);
}
console.log('0/80 Clopper-Pearson 雙側上界', (1 - Math.pow(0.025, 1 / 80)) * 100);
// S7 精修：題幹字袋 ≥70% 出現在所引頁才算在
const added = JSON.parse(fs.readFileSync(process.argv[2], 'utf8')).filter(q => q.lesson !== 47);
const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’]/g, "'").replace(/œ/g, 'oe').replace(/[^a-z0-9' ]+/g, ' ').replace(/\s+/g, ' ').trim();
const a2map = p => p <= 26 ? p : p <= 76 ? p + 1 : p + 2;
const miss = [];
let checked = 0;
for (const q of added) {
  const m = (q.hint || '').match(/p\.(\d+)/); if (!m) continue; const p = +m[1];
  let txt;
  if (/Cahier\s*A1/.test(q.hint)) txt = A1C[p];
  else if (/Cahier\s*A2/.test(q.hint)) txt = A2O[a2map(p)];
  else txt = q.lesson <= 16 ? A1B[p] : A2B[p];
  const own = new Set(norm(txt || '').split(' '));
  // 版面倒排的頁（明信片）另外試反向字
  const rev = new Set(norm((txt || '').split('').reverse().join('')).split(' '));
  const core = norm(q.q.split('→')[0].replace(/（[^）]*）/g, ' ').replace(/\([^)]*\)/g, ' ').replace(/_+/g, ' ')).split(' ').filter(w => w.length >= 4);
  if (core.length < 2) continue;
  checked++;
  const f = core.filter(w => own.has(w)).length / core.length, fr = core.filter(w => rev.has(w)).length / core.length;
  if (Math.max(f, fr) < 0.7) miss.push([q.hint, q.q.slice(0, 90), f.toFixed(2)]);
}
console.log('S7精修 checked', checked, 'miss', miss.length);
miss.slice(0, 25).forEach(x => console.log('  ', x.join(' | ')));
// S9 擴到課本：抓題幹 stem 在頁上是 "a / b / c" 斜線重組
let bookReorder = 0; const bookEx = [];
for (const q of added) {
  if (/Cahier/.test(q.hint || '') || q.type !== 'fill') continue;
  const m = (q.hint || '').match(/p\.(\d+)\s*練習(\d+)/); if (!m) continue;
  const txt = (q.lesson <= 16 ? A1B : A2B)[+m[1]] || '';
  if (new RegExp(m[2] + '\\s+Remettez').test(txt)) { bookReorder++; bookEx.push(q.hint); }
}
console.log('課本重組改填空', bookReorder, bookEx.slice(0, 6).join('；'));
