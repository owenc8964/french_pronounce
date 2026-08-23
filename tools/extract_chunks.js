#!/usr/bin/env node
/* tools/extract_chunks.js — 從 french_notes.html 抽某一課的複習卡，附加到 chunks.js
 *
 * 用法：  node tools/extract_chunks.js 26          （預覽，不寫檔）
 *         node tools/extract_chunks.js 26 --write  （真的寫進 chunks.js）
 *
 * 抽兩種來源（跟筆記格式鐵律一致，其他寫法抽不到）：
 *   ① <ul class="phrase-list"> 的 <li>：.fr / .zh / .note
 *   ② 詞彙表：第一欄是 <td class="m"> 的列
 *
 * ⚠️ id 用 fr 的前 24 字 slug 化，撞到就加 _2/_3——**不能直接 skip**，
 *    2026-07-10 就是靜默漏卡（同一課兩句前 24 字相同）。
 */
const fs = require('fs');

const lesson = process.argv[2];
const WRITE = process.argv.includes('--write');
if (!lesson) { console.log('用法：node tools/extract_chunks.js <課次> [--write]'); process.exit(2); }

const html = fs.readFileSync('french_notes.html', 'utf8');
const start = html.indexOf(`id="lesson-${lesson}"`);
if (start < 0) { console.error(`找不到 lesson-${lesson}`); process.exit(1); }
const end = html.indexOf('<details class="lesson-group"', start + 10);
const seg = html.slice(start, end < 0 ? html.length : end);

const strip = s => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<')
                    .replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

const cards = [];

// ① phrase-list
for (const m of seg.matchAll(/<ul class="phrase-list"[^>]*>([\s\S]*?)<\/ul>/g)) {
  for (const li of m[1].matchAll(/<li>([\s\S]*?)<\/li>/g)) {
    const g = k => (li[1].match(new RegExp(`<span class="${k}">([\\s\\S]*?)</span>`)) || [])[1];
    const fr = g('fr'), zh = g('zh');
    if (!fr || !zh) continue;
    cards.push({ fr: strip(fr), zh: strip(zh), note: strip(g('note') || ''), src: 'phrase' });
  }
}

// ② 詞彙表（第一欄 td class="m"）
for (const tr of seg.matchAll(/<tr>([\s\S]*?)<\/tr>/g)) {
  const tds = [...tr[1].matchAll(/<td([^>]*)>([\s\S]*?)<\/td>/g)];
  if (!tds.length || !/class="m"/.test(tds[0][1])) continue;
  const cells = tds.map(t => strip(t[2]));
  const fr = cells[0];
  // 找中文欄：含 CJK 且不是備注那種長句
  const zhIdx = cells.findIndex((c, i) => i > 0 && /[一-鿿]/.test(c) && c.length <= 18);
  if (zhIdx < 0) continue;
  cards.push({ fr, zh: cells[zhIdx], note: cells.filter((_, i) => i !== 0 && i !== zhIdx).join('｜'), src: 'table' });
}

// 過濾（2026-08-23 收緊：第一版抽出 188 張，是前幾課的三倍，會把複習包灌爆）
//   - 練習題列（有 ......）、空的
//   - 太長：>60 字的句子當複習卡背不起來，那是閱讀材料不是卡片
//   - 對照表的整格（含 ／ 或 (…) 的說明串）：那是「一格塞好幾個詞」，不是一張卡
//   - 表格裡的中文說明欄被誤當法文
const clean = cards.filter(c =>
  c.fr && c.zh &&
  !/\.{3,}|…{2,}/.test(c.fr) &&
  c.fr.length <= 60 &&
  !/[／/]/.test(c.fr) &&
  !/[（(][^)）]*[一-鿿]/.test(c.fr) &&
  !/[一-鿿]/.test(c.fr)
);

/* 選卡（2026-08-23 立規）：一課抽得到 160 句不代表要出 160 張卡。
 * Owen 的複習包每天有上限，灌爆等於逼他略過。優先序：
 *   ① 詞彙表的每一列 —— 單字/詞組，辨識型，腦力消耗低
 *   ② 標了 ⭐ 的句子 —— 筆記裡標星就是「這句要記住」
 *   ③ 老師課堂法語（note 有 🎙）—— 真實口語輸入，最高價值
 *   ④ 短表達（≤34 字）—— 是塊不是句
 * 其餘課文長句留在筆記裡當閱讀材料，不進卡片。 */
const keep = clean.filter(c =>
  c.src === 'table' ||                       // ① 詞彙表全收
  /⭐|🎙/.test(c.note) ||                     // ②③ 標星的句子與老師課堂法語
  (c.fr.length <= 22 && !/[.!?]$/.test(c.fr)) // ④ 真正的「塊」（短、不是完整句）
);

// 既有卡片（全庫）拿來去重
const src = fs.readFileSync('chunks.js', 'utf8');
const existing = new Set();
for (const m of src.matchAll(/"fr":\s*"((?:[^"\\]|\\.)*)"/g)) existing.add(m[1].replace(/\\"/g, '"').trim());
const ids = new Set([...src.matchAll(/"id":\s*"([^"]+)"/g)].map(m => m[1]));

const slug = s => s.replace(/[^\p{L}\p{N}]+/gu, '_').slice(0, 24).replace(/_+$/, '');
const out = [], seen = new Set();
for (const c of keep) {
  if (existing.has(c.fr) || seen.has(c.fr)) continue;
  seen.add(c.fr);
  let id = `L${lesson}_${slug(c.fr)}`, n = 1;
  while (ids.has(id)) { n++; id = `L${lesson}_${slug(c.fr)}_${n}`; }   // ⚠️ 撞號要遞增，不能 skip
  ids.add(id);
  out.push({ id, lesson: Number(lesson), fr: c.fr, zh: c.zh, note: c.note });
}

console.log(`第${lesson}課：候選 ${clean.length} 句 → 選卡 ${keep.length} → 去重後新增 ${out.length} 張（既有庫 ${existing.size} 句）`);
out.slice(0, 8).forEach(c => console.log('   ', c.fr.slice(0, 46), '→', c.zh.slice(0, 20)));
if (out.length > 8) console.log(`    …其餘 ${out.length - 8} 張`);

if (WRITE) {
  const body = out.map(c => ' ' + JSON.stringify(c, null, 1).replace(/\n/g, '\n ')).join(',\n');
  const updated = src.replace(/\n\];\s*$/, ',\n' + body + '\n];\n');
  fs.writeFileSync('chunks.js', updated);
  console.log(`✅ 已寫入 chunks.js`);
}
