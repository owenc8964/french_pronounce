// Q39：每題到 assets/.textbook_cache.txt 對應書裡定位。只讀不改。
// 用法：node tools/tmp_q39_locate.js <sample.json> <輸出 txt>
const fs = require('fs');
const raw = fs.readFileSync('assets/.textbook_cache.txt', 'utf8');
const pages = {}; // book -> {pdfPage: text}
const re = /===== \[([^\]]+)\] page (\d+) =====\n/g;
let m, last = null;
while ((m = re.exec(raw))) {
  if (last) pages[last.b][last.p] = raw.slice(last.end, m.index);
  (pages[m[1]] = pages[m[1]] || {});
  last = { b: m[1], p: +m[2], end: re.lastIndex };
}
pages[last.b][last.p] = raw.slice(last.end);
const BOOK = { 'A1練習本': 'Edito Cah22 A1 Owen.pdf', 'A2練習本': 'EditoA2 2022 Cahier .pdf', 'A1課本': 'Edito22 A1 Owen.pdf', 'A2課本': 'Edito22 A2 Owen 7:21.pdf' };
const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’]/g, "'").replace(/œ/g, 'oe').replace(/[^a-z0-9' ]+/g, ' ').replace(/\s+/g, ' ').trim();
const sample = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
let out = '';
for (const q of sample) {
  const book = pages[BOOK[q.stratum]];
  const hp = +(q.hint.match(/p\.(\d+)/) || [])[1];
  // 取題幹裡空格前後的片段當探針
  const stem = q.q.replace(/（[^）]*）/g, ' ').replace(/\([^)]*\)/g, ' ');
  const segs = stem.split(/_+|→/).map(norm).filter(s => s.length >= 6);
  const probes = [];
  segs.forEach(s => { const w = s.split(' '); if (w.length >= 3) { probes.push(w.slice(0, 3).join(' ')); probes.push(w.slice(-3).join(' ')); } else probes.push(s); });
  const score = {};
  for (const p in book) {
    const t = norm(book[p]);
    let sc = 0; probes.forEach(pr => { if (t.includes(pr)) sc++; });
    if (sc) score[p] = sc;
  }
  const best = Object.entries(score).sort((a, b) => b[1] - a[1] || Math.abs(a[0] - hp) - Math.abs(b[0] - hp)).slice(0, 4);
  out += `\n#### #${q.no} ${q.stratum} hint=${q.hint}\nQ: ${q.q}\nA: ${q.a}\nprobes=${JSON.stringify(probes)}\nbest pdf pages (page:score): ${best.map(b => b.join(':')).join(', ')}\n`;
  if (best.length) {
    const p = best[0][0];
    const lines = book[p].split('\n');
    const pr0 = probes.slice().sort((a, b) => b.length - a.length);
    let hit = -1;
    for (const pr of pr0) { hit = lines.findIndex(l => norm(l).includes(pr)); if (hit >= 0) break; }
    if (hit < 0) hit = 0;
    out += `-- pdf p.${p} lines ${Math.max(0, hit - 3)}–${hit + 3}:\n` + lines.slice(Math.max(0, hit - 3), hit + 4).join('\n') + '\n';
    // 印刷頁碼線索：頁尾數字
    const tail = lines.filter(l => /^\s*\d{1,3}\s*$|^\s*\d{1,3}\s+[a-zéèêç-]+/.test(l)).slice(-3);
    out += `-- page-num clues: ${JSON.stringify(tail)}\n`;
  }
}
fs.writeFileSync(process.argv[3], out);
console.log('ok', out.length);
// 找 Corrigés 頁
for (const k of ['Edito Cah22 A1 Owen.pdf', 'EditoA2 2022 Cahier .pdf', 'Edito22 A1 Owen.pdf', 'Edito22 A2 Owen 7:21.pdf']) {
  const ps = Object.keys(pages[k]).filter(p => /corrig/i.test(pages[k][p]));
  console.log(k, 'pages', Object.keys(pages[k]).length, 'corrig pages', ps.slice(0, 20).join(','), '...', ps.slice(-5).join(','));
}
