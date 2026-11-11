// Q44：第49、50課 chunks 逐條比對來源（唯讀，不改任何資料檔）
// 用法：node tools/q44_check_l49_50_chunks.js
// 比對：fr 是否一字不差出現在 (a) french_notes.html 該課區段 (b) 課本快取 Édito B1 全部頁
// 另外：若條目來自表格，印出那張表的表頭，檢查 zh 是不是真的抓到「中文」欄（Q41 根因：extract_chunks.js 不看表頭）
// 輸出欄位：課內號 筆記行 筆記命中 課本頁 表頭(zh欄名) fr zh note
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');

const src = fs.readFileSync(path.join(root, 'chunks.js'), 'utf8');
const CHUNKS = new Function(src.replace(/^\s*const CHUNKS\s*=/m, 'return '))();

const norm = s => String(s)
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#39;|&rsquo;/g, "'")
  .replace(/[’‘]/g, "'").replace(/[  ]/g, ' ')
  .replace(/\s+/g, ' ').toLowerCase();
const strip = s => norm(s).replace(/[?.!]\s*$/, '').trim();
const loose = s => norm(s).replace(/\(e\)|\(s\)/g, '').replace(/[?.!…]/g, '').replace(/\s+/g, ' ').trim();
const plain = s => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

const html = fs.readFileSync(path.join(root, 'french_notes.html'), 'utf8');
const lines = html.split('\n');
const lessonStart = n => lines.findIndex(l => l.includes(`id="lesson-${n}"`));
const range = { 49: [lessonStart(49), lessonStart(50)], 50: [lessonStart(50), lessonStart(51) < 0 ? lines.length : lessonStart(51)] };
const secText = n => norm(lines.slice(range[n][0], range[n][1]).join('\n'));
const notes = { 49: secText(49), 50: secText(50) };
const lineOf = (L, fr) => {
  const f = strip(fr);
  for (let i = range[L][0]; i < range[L][1]; i++) if (norm(lines[i]).includes(f)) return i + 1;
  return '-';
};

// 表頭：找含 fr 的 <tr>，往回找最近的 <tr> 有 <th>
const seg = n => lines.slice(range[n][0], range[n][1]).join('\n');
const tableHeader = (L, fr) => {
  const s = seg(L);
  for (const t of s.matchAll(/<table[\s\S]*?<\/table>/g)) {
    const ths = [...t[0].matchAll(/<th[^>]*>([\s\S]*?)<\/th>/g)].map(m => plain(m[1]));
    for (const tr of t[0].matchAll(/<tr>([\s\S]*?)<\/tr>/g)) {
      const tds = [...tr[1].matchAll(/<td([^>]*)>([\s\S]*?)<\/td>/g)];
      if (!tds.length || !/class="m"/.test(tds[0][1])) continue;
      if (plain(tds[0][2]) === fr) return { ths, cells: tds.map(x => plain(x[2])) };
    }
  }
  return null;
};

const book = fs.readFileSync(path.join(root, 'assets/.textbook_cache.txt'), 'utf8').split('\n');
const pages = [];
book.forEach((l, i) => { const m = l.match(/^===== \[Edito\.B1\.Owen\.pdf\] page (\d+) =====/); if (m) pages.push([+m[1], i]); });
const pageText = {};
pages.forEach(([p, i], k) => {
  const e = k + 1 < pages.length ? pages[k + 1][1] : book.length;
  pageText[p] = norm(book.slice(i, e).join(' ').replace(/-\s+/g, '-'));
});
const bookNorm = book.map(norm);
const b1Start = pages.length ? pages[0][1] : 0;
let b1End = book.length;
for (let i = b1Start + 1; i < book.length; i++) if (/^=====/.test(book[i]) && !/Edito\.B1\.Owen/.test(book[i])) { b1End = i; break; }
const bookLine = fr => {
  const f = strip(fr);
  if (f.length < 4) return '';
  for (let i = b1Start; i < b1End; i++) if (bookNorm[i].includes(f)) return i + 1;
  return '';
};

// --md：輸出逐條總表（markdown），判定由人工核對後寫在 WARN
const MD = process.argv.includes('--md');
const WARN = new Set(['49#19', '49#36', '49#62', '49#69', '49#87', '49#103', '50#22']);
const esc = s => String(s).replace(/\|/g, '\\|');
if (MD) {
  for (const L of [48, 49, 50]) {
    const list = CHUNKS.filter(c => c.lesson === L);
    const fromCommit = L === 48 ? list.filter(c => /^L48_(Ça_me_plaît_que_le_centr|empêcher_quelqu_un_de)$/.test(c.id)) : list;
    console.log(`\n### 第 ${L} 課${L === 48 ? '（b078dee 依老師截圖補的 2 條）' : ''}\n\n| # | fr | zh | 判定 | 筆記行 | 課本（機器比對頁／快取行） |\n|---|---|---|---|---|---|`);
    fromCommit.forEach(c => {
      const i = list.indexOf(c) + 1, id = `${L}#${i}`;
      const nl = L === 48 ? (html.split('\n').findIndex(l => norm(l).includes(strip(c.fr))) + 1) : lineOf(L, c.fr);
      const f = strip(c.fr), bp = [];
      for (const p in pageText) if (f.length > 3 && pageText[p].includes(' ' + f)) bp.push(p);
      const bl = bookLine(c.fr);
      const bk = bp.length ? `p.${bp.slice(0, 4).join('、')}${bp.length > 4 ? '…' : ''}${bl ? '（行 ' + bl + '）' : ''}` : '—';
      console.log(`| ${id} | ${esc(c.fr)} | ${esc(c.zh)} | ${WARN.has(id) ? '⚠️' : '✓'} | ${nl} | ${bk} |`);
    });
  }
  process.exit(0);
}

let total = 0, notesMiss = 0, bookMiss = 0, tableCnt = 0;
for (const L of [49, 50]) {
  const list = CHUNKS.filter(c => c.lesson === L);
  list.forEach((c, i) => {
    total++;
    const f = strip(c.fr), fl = loose(c.fr);
    const inN = notes[L].includes(f) ? 'exact' : (notes[L].includes(fl) ? 'loose' : '-');
    const bp = [];
    for (const p in pageText) {
      if (f.length > 3 && pageText[p].includes(' ' + f)) bp.push(p);
      else if (fl.length > 5 && pageText[p].includes(' ' + fl)) bp.push(p + '~');
    }
    if (inN === '-') notesMiss++;
    if (!bp.length) bookMiss++;
    const h = tableHeader(L, c.fr);
    let hs = '';
    if (h) {
      tableCnt++;
      const zi = h.cells.indexOf(c.zh);
      hs = `[${h.ths.join('|')}] zh欄=${zi >= 0 ? (h.ths[zi] || '?' + zi) : '?'}`;
    }
    console.log([`${L}#${i + 1}`, lineOf(L, c.fr), inN, bp.slice(0, 6).join(',') || '-', bookLine(c.fr), hs, c.fr, c.zh, c.note].join('\t'));
  });
}

const others = {};
CHUNKS.filter(c => c.lesson !== 49 && c.lesson !== 50).forEach(c => { (others[strip(c.fr)] = others[strip(c.fr)] || []).push(c.lesson); });
for (const L of [49, 50]) {
  CHUNKS.filter(c => c.lesson === L).forEach((c, i) => {
    if (others[strip(c.fr)]) console.error(`DUP ${L}#${i + 1} ${c.fr} ← 課 ${others[strip(c.fr)].join(',')}`);
  });
}
const seen = {};
CHUNKS.filter(c => c.lesson === 49 || c.lesson === 50).forEach(c => {
  const k = strip(c.fr);
  if (seen[k]) console.error(`DUP(內部) ${c.lesson} ${c.fr} ← ${seen[k]}`);
  seen[k] = seen[k] || String(c.lesson);
});
// zh 沒有中文、或是很短的標籤（正面／負面這類）
CHUNKS.filter(c => c.lesson === 49 || c.lesson === 50).forEach(c => {
  if (!/[一-鿿]/.test(c.zh) || /^(正面|負面|陽性|陰性|口語|正式|書面|中性|[mf]\.)$/.test(c.zh)) console.error(`ZH? ${c.lesson} ${c.fr} → ${c.zh}`);
});
console.error(`total=${total} notes_miss=${notesMiss} book_miss=${bookMiss} table=${tableCnt}`);
// 漏抽檢查：該課所有 td.m 表格列，不在 chunks（任何課）的列出表頭與原因猜測
const allFr = new Set(CHUNKS.map(c => c.fr));
for (const L of [49, 50]) {
  const s = seg(L);
  for (const t of s.matchAll(/<table[\s\S]*?<\/table>/g)) {
    const ths = [...t[0].matchAll(/<th[^>]*>([\s\S]*?)<\/th>/g)].map(m => plain(m[1]));
    for (const tr of t[0].matchAll(/<tr>([\s\S]*?)<\/tr>/g)) {
      const tds = [...tr[1].matchAll(/<td([^>]*)>([\s\S]*?)<\/td>/g)];
      if (!tds.length || !/class="m"/.test(tds[0][1])) continue;
      const cells = tds.map(x => plain(x[2]));
      if (allFr.has(cells[0])) {
        const ex = CHUNKS.filter(c => c.fr === cells[0]);
        if (!ex.some(c => c.lesson === L)) console.error(`DEDUP ${L} ${cells.join(' ｜ ')} ⇐ 已有 ${ex.map(c => c.lesson + ':' + c.zh).join(' / ')}`);
        continue;
      }
      const zi = cells.findIndex((c, i) => i > 0 && /[一-鿿]/.test(c) && c.length <= 18);
      const why = zi < 0 ? '無≤18字中文格' : cells[0].length > 60 ? '>60字' : /[／/]/.test(cells[0]) ? '含／' : /\.{3,}|…{2,}/.test(cells[0]) ? '練習空格' : /[一-鿿]/.test(cells[0]) ? 'fr含中文' : '其他(去重或未知)';
      const ln = lines.findIndex((l, i) => i >= range[L][0] && i < range[L][1] && l.includes(tds[0][2].slice(0, 30))) + 1;
      console.error(`MISS ${L} 行${ln} [${ths.join('|')}] ${why} :: ${cells.join(' ｜ ')}`);
    }
  }
}
// 漏抽檢查②：td.m 不在第一欄的表（extract_chunks.js 只收第一欄是 td.m 的列 → 整張表被跳過）
const lowerAll = new Map(CHUNKS.map(c => [strip(c.fr), c]));
for (const L of [49, 50]) {
  const s = seg(L);
  for (const t of s.matchAll(/<table[\s\S]*?<\/table>/g)) {
    const ths = [...t[0].matchAll(/<th[^>]*>([\s\S]*?)<\/th>/g)].map(m => plain(m[1]));
    for (const tr of t[0].matchAll(/<tr>([\s\S]*?)<\/tr>/g)) {
      const tds = [...tr[1].matchAll(/<td([^>]*)>([\s\S]*?)<\/td>/g)];
      if (!tds.length || /class="m"/.test(tds[0][1])) continue;
      const mi = tds.findIndex(x => /class="m"/.test(x[1]));
      if (mi < 0) continue;
      const fr = plain(tds[mi][2]);
      const ex = lowerAll.get(strip(fr));
      console.error(`SKIPCOL ${L} [${ths.join('|')}] ${tds.map(x => plain(x[2])).join(' ｜ ')} ⇒ chunks: ${ex ? ex.lesson + ':' + ex.zh : '（無）'}`);
    }
  }
}
// 近似重複：去冠詞、去 (e)、去標點後與其他課相同
const bare = s => loose(s).replace(/^(le|la|les|l'|un|une|des|du)\s*/, '').replace(/['’]/g, "'").trim();
const otherBare = {};
CHUNKS.filter(c => c.lesson !== 49 && c.lesson !== 50).forEach(c => { (otherBare[bare(c.fr)] = otherBare[bare(c.fr)] || []).push(`${c.lesson}:${c.fr}→${c.zh}`); });
CHUNKS.filter(c => c.lesson === 49 || c.lesson === 50).forEach(c => {
  if (otherBare[bare(c.fr)]) console.error(`NEAR ${c.lesson} ${c.fr}→${c.zh} ≈ ${otherBare[bare(c.fr)].join(' / ')}`);
});
let tdm = 0, tbl = 0;
for (const L of [49, 50]) { const s = seg(L); tbl += (s.match(/<table/g) || []).length; tdm += (s.match(/<tr>\s*<td class="m"/g) || []).length; }
console.error(`tables=${tbl} td.m-rows≈${tdm}`);
const keys = {};
CHUNKS.filter(c => c.lesson === 49 || c.lesson === 50).forEach(c => Object.keys(c).forEach(k => { keys[k] = (keys[k] || 0) + 1; }));
console.error('keys', JSON.stringify(keys));
