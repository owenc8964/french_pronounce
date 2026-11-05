// Q39：把 1215 題依 hint 分來源層，看形狀。只讀不改。
const fs = require('fs');
const added = JSON.parse(fs.readFileSync(process.argv[2], 'utf8')).filter(q => q.lesson !== 47);
console.log('n', added.length);
function src(q) {
  const h = q.hint || '';
  if (/Cahier\s*A1/.test(h)) return 'A1-cahier';
  if (/Cahier\s*A2/.test(h)) return 'A2-cahier';
  if (/課本\s*A1|A1\s*課本/.test(h)) return 'A1-book';
  if (/課本\s*A2|A2\s*課本/.test(h)) return 'A2-book';
  if (/課本/.test(h)) return 'book-unspecified';
  return 'other';
}
const c = {}, ex = {};
added.forEach(q => { const s = src(q); c[s] = (c[s] || 0) + 1; (ex[s] = ex[s] || []).push(q); });
console.log(c);
for (const s in ex) { console.log('--', s); ex[s].slice(0, 4).forEach(q => console.log(q.lesson, '|', q.hint, '|', q.q)); }
const oth = (ex.other||[]).map(q=>q.hint); const g = {};
oth.forEach(h=>{const k=h.replace(/\d+[a-z]?/g,'#'); g[k]=(g[k]||0)+1;});
console.log(Object.entries(g).sort((a,b)=>b[1]-a[1]).slice(0,30));
const g2 = {};
(ex['book-unspecified']||[]).forEach(q=>{g2[q.lesson]=(g2[q.lesson]||0)+1;});
console.log('book-unspecified by lesson', JSON.stringify(g2));
console.log('with ⚠ in aNote', added.filter(q=>/⚠/.test(q.aNote||'')).length);
console.log('multi-answer fill', added.filter(q=>q.type==='fill'&&/\|/.test(q.a)).length);
