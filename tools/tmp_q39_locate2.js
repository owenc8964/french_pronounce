// Q39：A2 練習本對 assets/.ocr_EditoA2_2022_Cahier_.txt；A1 練習本與 A2 練習本都撈 Corrigés 段。只讀不改。
const fs = require('fs');
function parse(file, name) {
  const raw = fs.readFileSync(file, 'utf8');
  const pages = {};
  const re = /===== \[([^\]]+)\] page (\d+) =====\n/g;
  let m, last = null;
  while ((m = re.exec(raw))) {
    if (last && last.b === name) pages[last.p] = raw.slice(last.end, m.index);
    last = { b: m[1], p: +m[2], end: re.lastIndex };
  }
  if (last && last.b === name) pages[last.p] = raw.slice(last.end);
  return pages;
}
const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’]/g, "'").replace(/œ/g, 'oe').replace(/[^a-z0-9' ]+/g, ' ').replace(/\s+/g, ' ').trim();
const A2 = parse('assets/.ocr_EditoA2_2022_Cahier_.txt', 'EditoA2 2022 Cahier .pdf');
const A1 = parse('assets/.textbook_cache.txt', 'Edito Cah22 A1 Owen.pdf');
const a2pdf = p => p <= 26 ? p : p <= 76 ? p + 1 : p + 2;
const sample = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
let out = '';
function ansWords(a) { return a.split('|')[0]; }
for (const q of sample) {
  if (q.stratum !== 'A2練習本' && q.stratum !== 'A1練習本') continue;
  const hp = +(q.hint.match(/p\.(\d+)/) || [])[1];
  out += `\n#### #${q.no} ${q.stratum} ${q.hint} | ${q.q} | A=${q.a}\n`;
  if (q.stratum === 'A2練習本') {
    const stem = q.q.replace(/（[^）]*）/g, ' ').replace(/\([^)]*\)/g, ' ');
    const segs = stem.split(/_+|→/).map(norm).filter(s => s.length >= 4);
    const probes = [];
    segs.forEach(s => { const w = s.split(' '); if (w.length >= 3) { probes.push(w.slice(0, 3).join(' ')); probes.push(w.slice(-3).join(' ')); } else probes.push(s); });
    const score = {};
    for (const p in A2) { const t = norm(A2[p]); let sc = 0; probes.forEach(pr => { if (t.includes(pr)) sc++; }); if (sc) score[p] = sc; }
    const exp = a2pdf(hp);
    const best = Object.entries(score).sort((a, b) => b[1] - a[1] || Math.abs(a[0] - exp) - Math.abs(b[0] - exp)).slice(0, 3);
    out += `expected pdf ${exp}; best ${best.map(b => b.join(':')).join(', ')}\n`;
    const usePage = A2[exp] ? exp : (best[0] && best[0][0]);
    const lines = (A2[usePage] || '').split('\n');
    let hit = -1;
    for (const pr of probes.slice().sort((a, b) => b.length - a.length)) { hit = lines.findIndex(l => norm(l).includes(pr)); if (hit >= 0) break; }
    out += `-- pdf p.${usePage} footer: ${JSON.stringify(lines.filter(l => /^\s*\d{1,3}\s*[|I]|[|I]\s*\d{1,3}\s*$/.test(l)).slice(-2))}\n`;
    const from = hit >= 0 ? Math.max(0, hit - 4) : 0, to = hit >= 0 ? hit + 5 : 12;
    out += lines.slice(from, to).map(l => l.slice(0, 130)).join('\n') + '\n';
    // Corrigés：找 "Page N" 或 "p. N"
    const corr = [];
    for (let p = 155; p <= 172; p++) if (A2[p]) {
      const L = A2[p].split('\n');
      L.forEach((l, i) => { if (new RegExp(`\\b(page|p\\.?)\\s*${hp}\\b`, 'i').test(l)) corr.push([p, i]); });
    }
    corr.slice(0, 2).forEach(([p, i]) => { out += `-- Corrigés pdf ${p}:\n` + A2[p].split('\n').slice(i, i + 16).map(l => l.slice(0, 120)).join('\n') + '\n'; });
  } else {
    const corr = [];
    for (let p = 127; p <= 145; p++) if (A1[p]) {
      const L = A1[p].split('\n');
      L.forEach((l, i) => { if (new RegExp(`Page ${hp}\\b`).test(l)) corr.push([p, i]); });
    }
    corr.slice(0, 2).forEach(([p, i]) => { out += `-- Corrigés pdf ${p}:\n` + A1[p].split('\n').slice(i, i + 14).map(l => l.slice(0, 120)).join('\n') + '\n'; });
  }
}
fs.writeFileSync(process.argv[3], out);
console.log('ok', out.length);
