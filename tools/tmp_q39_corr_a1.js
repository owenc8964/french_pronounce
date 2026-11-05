// Q39：A1 練習本 Corrigés 只看 p.133 起（p.127–132 是聽力逐字稿）。只讀不改。
const fs = require('fs');
const raw = fs.readFileSync('assets/.textbook_cache.txt', 'utf8');
const name = 'Edito Cah22 A1 Owen.pdf', pages = {};
const re = /===== \[([^\]]+)\] page (\d+) =====\n/g;
let m, last = null;
while ((m = re.exec(raw))) { if (last && last.b === name) pages[last.p] = raw.slice(last.end, m.index); last = { b: m[1], p: +m[2], end: re.lastIndex }; }
const sample = JSON.parse(fs.readFileSync(process.argv[2], 'utf8')).filter(q => q.stratum === 'A1練習本');
const seen = new Set();
for (const q of sample) {
  const hp = +(q.hint.match(/p\.(\d+)/) || [])[1];
  console.log(`\n#${q.no} ${q.hint} | A=${q.a}`);
  if (seen.has(hp)) { console.log('(同上頁)'); continue; }
  seen.add(hp);
  let found = 0;
  for (let p = 133; p <= 145 && found < 1; p++) {
    if (!pages[p]) continue;
    // 只用第一欄視圖（--- 之前）
    const L = pages[p].split('\n---')[0].split('\n');
    const i = L.findIndex(l => new RegExp(`Page ${hp}\\b`).test(l));
    if (i >= 0) { found++; console.log(`-- pdf ${p}`); console.log(L.slice(i, i + 11).map(l => l.slice(0, 140)).join('\n')); }
  }
}
