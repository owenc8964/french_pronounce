#!/usr/bin/env node
/* tools/q51_scan_skipped_tables.js — 唯讀掃描（Q51，2026-11-12）
 * 找出 french_notes.html 每一課裡「有 td class="m"，但不在第一欄」的表，
 * 也就是 tools/extract_chunks.js 第 44 行會整張跳過的表。
 * 同時列出每個 td.m 的法文在 chunks.js 有沒有一字不差的卡。
 * 用法：node tools/q51_scan_skipped_tables.js [--json]   （不寫任何檔）
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(ROOT, 'french_notes.html'), 'utf8');
const chunks = fs.readFileSync(path.join(ROOT, 'chunks.js'), 'utf8');

const strip = s => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const lineOf = idx => html.slice(0, idx).split('\n').length;

const existing = new Map();
for (const m of chunks.matchAll(/"lesson":\s*(\d+),\s*"fr":\s*"((?:[^"\\]|\\.)*)"/g)) {
  const fr = m[2].replace(/\\"/g, '"').trim();
  if (!existing.has(fr)) existing.set(fr, []);
  existing.get(fr).push(Number(m[1]));
}

// 課次區段：跟 extract_chunks.js 一樣，從 id="lesson-N" 到下一個 lesson-group
const lessonStarts = [...html.matchAll(/id="lesson-(\d+)"/g)].map(m => ({ n: m[1], i: m.index }));
const results = [];
for (const { n, i } of lessonStarts) {
  const end = html.indexOf('<details class="lesson-group"', i + 10);
  const segEnd = end < 0 ? html.length : end;
  const seg = html.slice(i, segEnd);
  for (const t of seg.matchAll(/<table[^>]*>([\s\S]*?)<\/table>/g)) {
    const tStart = i + t.index;
    const ths = [...t[1].matchAll(/<th[^>]*>([\s\S]*?)<\/th>/g)].map(x => strip(x[1]));
    // 往前找最近的 compare-title
    const before = html.slice(Math.max(0, tStart - 600), tStart);
    const titleM = [...before.matchAll(/class="compare-title"[^>]*>([\s\S]*?)<\/div>/g)].pop();
    const rows = [];
    for (const tr of t[1].matchAll(/<tr>([\s\S]*?)<\/tr>/g)) {
      const tds = [...tr[1].matchAll(/<td([^>]*)>([\s\S]*?)<\/td>/g)];
      if (!tds.length) continue;
      const mIdx = tds.findIndex(x => /class="m"/.test(x[1]));
      if (mIdx <= 0) continue;               // 沒有 td.m，或 td.m 在第一欄（抽取器收得到）
      if (/class="m"/.test(tds[0][1])) continue;
      const cells = tds.map(x => strip(x[2]));
      rows.push({ line: lineOf(i + t.index + 0 + t[0].indexOf(tr[0])), mIdx, cells,
        fr: cells[mIdx], inChunks: existing.get(cells[mIdx]) || null });
    }
    if (rows.length) results.push({ lesson: Number(n), tableLine: lineOf(tStart), title: titleM ? strip(titleM[1]) : '', ths, rows });
  }
}

if (process.argv.includes('--json')) { console.log(JSON.stringify(results, null, 1)); process.exit(0); }
if (process.argv.includes('--summary')) {
  // 分類：有沒有「中文」表頭欄（＝抽得出背面）、是不是變位表（第一欄是主詞）
  const SUBJ = /^(je|j'|tu|il|elle|on|nous|vous|ils|elles|il\/elle|il \/ elle|ils\/elles|ils \/ elles)/i;
  let T = 0, R = 0, M = 0;
  for (const r of results) {
    const zhCol = r.ths.findIndex(h => /中文|意思|翻譯/.test(h));
    const conj = r.rows.filter(x => SUBJ.test(x.cells[0])).length >= r.rows.length / 2;
    const miss = r.rows.filter(x => !x.inChunks).length;
    T++; R += r.rows.length; M += miss;
    const kind = conj ? '變位表' : (zhCol >= 0 ? '有中文欄' : '無中文欄');
    console.log(`${r.lesson}\t${r.tableLine}\t${kind}\t${r.rows.length}\t${miss}\t${r.title}\t[${r.ths.join('｜')}]\t例:${r.rows.slice(0, 3).map(x => x.fr).join(' / ')}`);
  }
  console.log(`\n共 ${T} 張表、${R} 列；chunks 無一字不差的卡 ${M} 列`);
  process.exit(0);
}
let total = 0, missing = 0;
for (const r of results) {
  const miss = r.rows.filter(x => !x.inChunks).length;
  total += r.rows.length; missing += miss;
  console.log(`第${r.lesson}課 行${r.tableLine}「${r.title}」表頭[${r.ths.join('｜')}] 列數${r.rows.length} 無卡${miss}`);
  for (const x of r.rows) console.log(`   行${x.line} 欄${x.mIdx + 1} ${x.fr}  ${x.inChunks ? '已有(課' + x.inChunks.join(',') + ')' : '無卡'}  ｜${x.cells.join('｜')}`);
}
console.log(`\n共 ${results.length} 張表、${total} 列；chunks 無一字不差的卡 ${missing} 列`);
