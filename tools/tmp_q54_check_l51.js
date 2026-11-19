// Q54：第51課連動資料核對（唯讀，不改任何資料檔）
// 用法：node tools/tmp_q54_check_l51.js [chunks|bank|sent|zhlabel]
// 比對 fr 是否出現在 french_notes.html 第51課區段、課本快取 Édito B1 p.48–58
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const load = (file, name) => {
  const src = fs.readFileSync(path.join(root, file), 'utf8');
  return new Function(src + `\n;return ${name};`)();
};
const norm = s => String(s)
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#39;|&rsquo;/g, "'")
  .replace(/[’‘]/g, "'").replace(/[  ]/g, ' ')
  .replace(/\s+/g, ' ').toLowerCase();
const html = fs.readFileSync(path.join(root, 'french_notes.html'), 'utf8');
const a = html.indexOf('id="lesson-51"'), b = html.indexOf('id="lesson-52"');
const sec = html.slice(a, b === -1 ? undefined : b);
const secStartLine = html.slice(0, a).split('\n').length;
const notes = norm(sec);
const rawLines = html.split('\n');
const lineOf = s => {
  const k = norm(s).replace(/[?.!]\s*$/, '').trim();
  for (let i = secStartLine - 1; i < rawLines.length; i++) if (norm(rawLines[i]).includes(k)) return i + 1;
  return '-';
};
const book = fs.readFileSync(path.join(root, 'assets/.textbook_cache.txt'), 'utf8').split('\n');
const pages = {};
book.forEach((l, i) => { const m = l.match(/^===== \[Edito\.B1\.Owen\.pdf\] page (\d+) =====/); if (m) pages[+m[1]] = i; });
const pageText = {};
for (let p = 48; p <= 58; p++) pageText[p] = norm(book.slice(pages[p], pages[p + 1]).join(' ').replace(/-\s+/g, '-'));
const strip = s => norm(s).replace(/[?.!]\s*$/, '').trim();
const loose = s => norm(s).replace(/\(e\)|\(s\)|\(te\)/g, '').replace(/[?.!…]/g, '').replace(/\s+/g, ' ').trim();
const where = s => {
  const f = strip(s), fl = loose(s);
  const inN = notes.includes(f) ? 'exact' : (notes.includes(fl) ? 'loose' : '-');
  const bp = [];
  for (const p in pageText) {
    if (pageText[p].includes(f)) bp.push(p);
    else if (fl.length > 3 && pageText[p].includes(fl)) bp.push(p + '~');
  }
  return [inN, bp.join(',') || '-'];
};
const mode = process.argv[2] || 'chunks';
if (mode === 'chunks') {
  const C = load('chunks.js', 'CHUNKS');
  const list = C.filter(c => c.lesson === 51);
  let nm = 0, bm = 0;
  list.forEach((c, i) => {
    const [n, bp] = where(c.fr);
    if (n === '-') nm++; if (bp === '-') bm++;
    console.log([`51#${i + 1}`, n, n === '-' ? '-' : lineOf(c.fr), bp, c.fr, c.zh, c.note || ''].join('\t'));
  });
  const others = {};
  C.filter(c => c.lesson !== 51).forEach(c => { (others[strip(c.fr)] = others[strip(c.fr)] || []).push(c.lesson); });
  list.forEach((c, i) => { if (others[strip(c.fr)]) console.error(`DUP 51#${i + 1} ${c.fr} ← 課 ${others[strip(c.fr)].join(',')}`); });
  const seen = {};
  list.forEach((c, i) => { const k = strip(c.fr); if (seen[k]) console.error(`DUP(內部) 51#${i + 1} ← 51#${seen[k]}`); seen[k] = seen[k] || i + 1; });
  const keys = {}; list.forEach(c => Object.keys(c).forEach(k => { keys[k] = (keys[k] || 0) + 1; }));
  console.error(`total=${list.length} notes_miss=${nm} book_miss=${bm} keys=${JSON.stringify(keys)}`);
} else if (mode === 'zhlabel') {
  // 欄位錯位嫌疑：zh 沒有中文、太短的標籤、zh 裡有法文長串
  const C = load('chunks.js', 'CHUNKS');
  C.filter(c => c.lesson === 51).forEach((c, i) => {
    const z = String(c.zh || '');
    const flags = [];
    if (!/[一-鿿]/.test(z)) flags.push('zh無中文');
    if (/^(正面|負面|口語|正式|書面|句首|名詞|句子|陰性|陽性|單數|複數|不變化)/.test(z)) flags.push('zh像標籤');
    if (/[a-zàâçéèêëîïôûùüÿœ]{4,}/i.test(z)) flags.push('zh含拉丁字');
    if (/[一-鿿]/.test(c.fr)) flags.push('fr含中文');
    if (flags.length) console.log(`51#${i + 1}\t${flags.join(',')}\t${c.fr}\t${z}\t${c.note || ''}`);
  });
} else if (mode === 'bank') {
  const B = load('questions.js', 'BANK');
  B.filter(q => q.lesson === 51).forEach((q, i) => {
    const f = q.type === 'fill' ? q.q.replace('_____', q.a) : (q.q.includes('_____') ? q.q.replace('_____', q.a) : q.q.replace(/ (這句|這個|她當時|apercevoir|contempler|une toile|traiter).*$/, ''));
    const [n, bp] = where(f.replace(/\s+'/g, "'"));
    const optOk = q.type === 'choose' ? (q.opts.filter(o => o === q.a).length === 1 ? 'a∈opts' : 'a∉opts!') : 'fill';
    console.log([`Q${i + 1}`, optOk, n, bp, f].join('\t'));
  });
} else if (mode === 'sent') {
  const S = load('sentences.js', 'SENTENCES');
  S.filter(s => s.lesson === 51).forEach(s => {
    const [n, bp] = where(s.fr);
    console.log([s.id, n, n === '-' ? '-' : lineOf(s.fr), bp, s.fr].join('\t'));
  });
}
