// Q69 第54課連動核對：只讀資料、不改任何檔案
// 用法：node tools/q69_check_l54.js [chunks|bank|field|notes]
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const mode = process.argv[2] || 'chunks';

function load(file, name) {
  const src = fs.readFileSync(path.join(ROOT, file), 'utf8');
  return new Function(src.replace(/^\s*const\s+/m, 'var ') + `\n;return ${name};`)();
}

const notes = fs.readFileSync(path.join(ROOT, 'french_notes.html'), 'utf8');
const s = notes.indexOf('id="lesson-54"');
const e = notes.indexOf('id="lesson-55"') > 0 ? notes.indexOf('id="lesson-55"') : notes.length;
const l54 = notes.slice(s, e);
const plain = l54.replace(/<[^>]+>/g, ' ').replace(/&#39;|&rsquo;|’/g, "'").replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');
const norm = t => t.replace(/[’]/g, "'").replace(/\s+/g, ' ').trim();

if (mode === 'chunks') {
  const C = load('chunks.js', 'CHUNKS').filter(c => c.lesson === 54);
  console.log('L54 chunks:', C.length);
  C.forEach((c, i) => {
    const inNotes = plain.includes(norm(c.fr)) ? '' : '  [!不在筆記原字串]';
    const frHasCJK = /[一-鿿]/.test(c.fr) ? '  [!fr含中文]' : '';
    const zhNoCJK = !/[一-鿿]/.test(c.zh || '') ? '  [!zh無中文]' : '';
    console.log(`${i + 1}. ${c.fr} ｜ ${c.zh} ｜ ${c.note}${inNotes}${frHasCJK}${zhNoCJK}`);
  });
}

if (mode === 'bank') {
  const B = load('questions.js', 'BANK');
  B.forEach((q, i) => {
    if (q.lesson !== 54) return;
    const opts = q.opts || [];
    const flag = q.type === 'choose' && !opts.includes(q.a) ? '  [!答案不在選項]' : '';
    const dup = new Set(opts).size !== opts.length ? '  [!選項重複]' : '';
    console.log(`#${i} ${q.type} ${q.q} → ${q.a}${flag}${dup}`);
  });
}

if (mode === 'field') {
  const B = load('questions.js', 'BANK');
  const F = require(path.join(ROOT, 'tools/town_field_extra.js')).FIELD_EXTRA;
  F.filter(f => B[f.src] && B[f.src].lesson === 54).forEach(f => {
    const b = B[f.src];
    const ok = b.q === f.q && b.a === f.a ? 'src對得上' : '[!src對不上]';
    console.log(`src ${f.src} ${ok}：${f.q} → ${f.opts.join(' / ')}`);
  });
  F.forEach(f => { if (!B[f.src] || B[f.src].q !== f.q) console.log('[!舊題 src 錯位]', f.src, f.q.slice(0, 40)); });
}

if (mode === 'notes') {
  // 句庫與 grammar 例句在不在筆記
  const S = load('sentences.js', 'SENTENCES').filter(x => x.lesson === 54);
  S.forEach(x => console.log((plain.includes(norm(x.fr)) ? '✓ ' : '✗ ') + x.id + ' ' + x.fr));
  console.log('notes L54 chars:', plain.length);
}
