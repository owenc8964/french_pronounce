// Q46（11-11 排程）：深水區 passages_b1.json 機械核對（唯讀）
//  ① 題幹是否逐字出現在 Édito B1 課本快取（去空白/標點後比對）
//  ② ev / evs 是否逐字出現在該軌逐字稿 transcripts_b1.json
//  ③ 選擇題答案索引合法
//  ④ 講話人切行可疑：單一名字獨立成一行、名字殘片（結尾 -）、正文裡出現「Xxx :」、來源行 (… 20xx)
// 用法：node tools/q46_verify.js [maxUnit，預設 99]
const fs = require('fs'), path = require('path');
const R = p => path.join(__dirname, '..', p);
const P = JSON.parse(fs.readFileSync(R('assets/didier/passages_b1.json'), 'utf8'));
const TR = JSON.parse(fs.readFileSync(R('assets/didier/transcripts_b1.json'), 'utf8'));
const maxU = +(process.argv[2] || 99);
const norm = s => String(s || '').normalize('NFC').replace(/[’‘]/g, "'").toLowerCase().replace(/[^a-z0-9àâäçéèêëîïôöùûüÿœæ]/g, '');
// 課本 B1（學生用書）全文
const lines = fs.readFileSync(R('assets/.textbook_cache.txt'), 'utf8').split('\n');
let inB1 = false, book = [];
for (const l of lines) { const m = l.match(/^===== \[(.*)\] page (\d+) =====$/); if (m) { inB1 = m[1] === 'Edito.B1.Owen.pdf'; continue; } if (inB1) book.push(l); }
const BOOK = norm(book.join(' '));
const out = { qMiss: [], evMiss: [], ansBad: [], spk: [] };
for (const p of P) {
  if (p.unit > maxU) continue;
  const tr = norm((TR[String(p.track)] || {}).text);
  p.qs.forEach((q, i) => {
    const qq = norm(q.q.replace(/^Vrai ou faux \?\s*/i, '').replace(/\s[a-h]\.$/, ''));
    if (qq.length > 8 && !BOOK.includes(qq)) out.qMiss.push(`t${p.track} Q${i + 1}: ${q.q}`);
    const evs = (q.evs && q.evs.length ? q.evs : [q.ev]).filter(Boolean);
    evs.forEach(e => { e.split(/\s*…\s*/).forEach(seg => { const n = norm(seg.replace(/\(n'\)|\(ne\)|\(n’\)/g, '')); const n2 = norm(seg); if (n.length > 3 && !tr.includes(n) && !tr.includes(n2)) out.evMiss.push(`t${p.track} Q${i + 1}: ${seg}`); }); });
    if (!q.open && !(q.a >= 0 && q.a < q.opts.length)) out.ansBad.push(`t${p.track} Q${i + 1}`);
  });
  p.lines.forEach((l, i) => {
    const t = l.text.trim();
    if (/^[A-ZÀ-Ý][\wà-ÿ'-]*-?$/.test(t) && t.split(' ').length === 1) out.spk.push(`t${p.track} L${i} [${l.spk}] 單獨一個名字：「${t}」`);
    else if (/[A-ZÀ-Ý][a-zà-ÿ]+-$/.test(t)) out.spk.push(`t${p.track} L${i} [${l.spk}] 名字殘片結尾：「${t.slice(-40)}」`);
    else if (/ [A-ZÀ-Ý][a-zà-ÿ]+$/.test(t) && !/[.!?…»)]$/.test(t)) out.spk.push(`t${p.track} L${i} [${l.spk}] 句尾黏著名字：「…${t.slice(-40)}」`);
    if (/\b[A-ZÀ-Ý][a-zà-ÿ]+( [a-zà-ÿ]+)* ?: [A-ZÀ-Ý]/.test(t)) out.spk.push(`t${p.track} L${i} [${l.spk}] 正文含「名字 :」：「${t.slice(0, 60)}」`);
    if (/^\(.*\d{4}\)$|^\([A-Z][^)]*\)$/.test(t)) out.spk.push(`t${p.track} L${i} 來源行被當台詞：「${t}」`);
  });
}
for (const k of Object.keys(out)) { console.log(`\n## ${k}（${out[k].length}）`); out[k].forEach(x => console.log('  ' + x)); }
