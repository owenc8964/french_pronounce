// Q39：印指定書頁的指定行段（grep 關鍵字前後）。只讀不改。
const fs = require('fs');
function parse(file, name) {
  const raw = fs.readFileSync(file, 'utf8'), pages = {};
  const re = /===== \[([^\]]+)\] page (\d+) =====\n/g; let m, last = null;
  while ((m = re.exec(raw))) { if (last && last.b === name) pages[last.p] = raw.slice(last.end, m.index); last = { b: m[1], p: +m[2], end: re.lastIndex }; }
  if (last && last.b === name) pages[last.p] = raw.slice(last.end);
  return pages;
}
const C = 'assets/.textbook_cache.txt';
const A1C = parse(C, 'Edito Cah22 A1 Owen.pdf'), A1B = parse(C, 'Edito22 A1 Owen.pdf'), A2O = parse('assets/.ocr_EditoA2_2022_Cahier_.txt', 'EditoA2 2022 Cahier .pdf');
function show(tag, pg, p, kw, before, after) {
  const L = pg[p].split('\n---')[0].split('\n');
  const i = kw ? L.findIndex(l => l.includes(kw)) : 0;
  console.log(`\n=== ${tag} pdf ${p} [${kw}] hit=${i}`);
  console.log(L.slice(Math.max(0, i - before), i + after).map(l => l.slice(0, 150)).join('\n'));
}
show('p10 ex3', A1C, 10, 'Glasgow', 3, 5);
if (!A1C[10].includes('Glasgow')) show('p10', A1C, 10, '3.', 0, 16);
show('p14 corr cont', A1C, 134, 'Bilan', 0, 2);
for (let p = 133; p <= 135; p++) { const t = A1C[p].split('\n---')[0]; const k = t.indexOf('2. a. la'); if (k >= 0) console.log('p14 bilan2?', p, t.slice(Math.max(0,k-80), k + 90)); }
show('p14 corr', A1C, 134, 'japonaise', 0, 3);
show('p44 corr', A1C, 136, 'Page 44', 8, 14);
show('p67 ex3', A1C, 67, '3.', 0, 12);
show('p67 corr', A1C, 138, 'Page 67', 0, 18);
show('p107 ex4', A1C, 107, '4.', 0, 14);
show('p107 corr', A1C, 141, 'Il faisait très chaud', 0, 6);
for (let p = 133; p <= 145; p++) { const t = A1C[p]; if (/Page 106/.test(t)) { console.log('p106 corr page', p); } }
for (const p of [141, 142]) { const t = A1C[p].split('\n---')[0]; const k = t.indexOf('106'); if (k >= 0) console.log('--', p, t.slice(k - 10, k + 500)); }
show('p91 corr 3', A1C, 140, '3. a', 0, 6);
const t91 = A1C[141].split('\n---')[0]; const k91 = t91.indexOf('Hier'); console.log('p91 3 ans:', t91.slice(Math.max(0,k91-40), k91 + 400));
// A2
show('A2 p3 ex3', A2O, 3, '3.', 0, 10);
show('A2 p127 ex3', A2O, 129, '3.', 0, 10);
// A1 book
show('p36', A1B, 36, 'Jeanne et toi', 12, 4);
show('p42', A1B, 42, 'Tes parents', 14, 3);
show('p50', A1B, 50, 'baguette', 12, 2);
show('p64', A1B, 64, 'La fréquence', 2, 14);
show('p82 ex', A1B, 82, 'Fonctionnement', 0, 30);
show('p90', A1B, 90, 'Fonctionnement', 0, 40);
show('p112', A1B, 112, 'Exemple : Il est interdit', 8, 8);
show('p124', A1B, 124, 'Jardiner', 0, 1);
for (const p of [124, 125, 126]) { const t = A1B[p]; const i = t.indexOf('Fonctionnement'); console.log('--book', p, t.slice(i, i + 1300)); }
show('p151', A1B, 151, 'Elle a un métier', 10, 2);
