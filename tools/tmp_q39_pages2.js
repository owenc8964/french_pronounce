// Q39：第二輪查原文。只讀不改。
const fs = require('fs');
function parse(file, name) {
  const raw = fs.readFileSync(file, 'utf8'), pages = {};
  const re = /===== \[([^\]]+)\] page (\d+) =====\n/g; let m, last = null;
  while ((m = re.exec(raw))) { if (last && last.b === name) pages[last.p] = raw.slice(last.end, m.index); last = { b: m[1], p: +m[2], end: re.lastIndex }; }
  if (last && last.b === name) pages[last.p] = raw.slice(last.end);
  return pages;
}
const C = 'assets/.textbook_cache.txt';
const A1C = parse(C, 'Edito Cah22 A1 Owen.pdf'), A1B = parse(C, 'Edito22 A1 Owen.pdf'), A2B = parse(C, 'Edito22 A2 Owen 7:21.pdf');
const first = t => t.split('\n---')[0];
const near = (tag, t, kw, b, a) => { const k = t.indexOf(kw); console.log(`\n=== ${tag} [${kw}] ${k}`); if (k >= 0) console.log(t.slice(Math.max(0, k - b), k + a)); };
console.log('=== 134 top\n' + first(A1C[134]).split('\n').slice(0, 7).join('\n'));
console.log('=== 137 top\n' + first(A1C[137]).split('\n').slice(0, 7).join('\n'));
near('p67 ex3 text', first(A1C[67]), 'Tous les matins', 60, 500);
near('p44 corr ex3-4', first(A1C[136]) + first(A1C[137]), 'souhaitez', 0, 10);
for (const p of [136, 137]) { const t = first(A1C[p]); const k = t.search(/propose souvent/); if (k >= 0) console.log('found propose', p, t.slice(k - 100, k + 330)); }
near('p91 corr', first(A1C[140]) + first(A1C[141]), 'bu du sirop', 50, 200);
for (const p of [140, 141]) { const t = first(A1C[p]); const k = t.search(/m’a dit|m'a dit/); if (k >= 0) console.log('found m a dit', p, t.slice(Math.max(0, k - 250), k + 150)); }
near('p106 corr', first(A1C[141]), 'Page 106', 0, 800);
const rev = s => s.split('').reverse().join('');
console.log('=== p107 tail reversed:\n' + first(A1C[107]).split('\n').filter(l => /…|\. |,/.test(l)).slice(-16).map(rev).join('\n'));
for (const p of Object.keys(A1B)) { if (/jogging/.test(A1B[p])) { const t = first(A1B[p]); const k = t.indexOf('jogging'); console.log('jogging in book p', p, JSON.stringify(t.slice(Math.max(0, k - 60), k + 40))); } }
console.log('=== p90 Entraînement\n' + first(A1B[90]).split('\n').slice(30, 60).join('\n'));
near('p112 obligation', A1B[112], 'obligation', 200, 600);
for (const p of [111, 112]) { const k = A1B[p].indexOf('Fonctionnement'); if (k >= 0) console.log('--Fonct', p, A1B[p].slice(k, k + 700)); }
near('p124 ex2', A1B[124], 'Entraînement', 0, 500);
near('p126', first(A1B[126]), 'Faites votre jardin', 500, 60);
near('p148', first(A1B[148]), 'Le / professeur', 350, 10);
near('A2 p170 ex5', first(A2B[170]), 'Donne-leur', 300, 60);
near('A2 p164', first(A2B[164]), 'Mettez en relief', 40, 60);
