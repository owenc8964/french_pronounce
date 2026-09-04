#!/usr/bin/env node
/* tools/check_t1_stock.js — 驗 t1_stock.js 的每一句都真的出自八座島
 *
 * ⚠️ 這支存在的理由（2026-09-04 建 t1_stock.js 當天踩到的坑）：
 *   砍島做短答時，我「順手改進」了法文——把 `quand quelque chose` 換成更高階的 `dès que`、
 *   把 `le professeur` 改成 `la professeure`（⛔ 憑空改事實）。
 *   ⭐ 那違反 CLAUDE.md 內容鐵律：教材必須出自既有材料，Claude 不自創法文。
 *
 * ⭐ 核心判準：**只准刪字與合併句子，⛔ 不准換詞、換句法、換事實。**
 *   → 用「子序列比對」：短答的每個字必須依序出現在某座島的原文裡。
 *     刪字 → 仍是子序列 → ✅ 通過
 *     換詞／加字 → 不是子序列 → ⚠️ 抓到
 *
 * 跑法：node tools/check_t1_stock.js
 */
const fs = require('fs');

const A = new Function(fs.readFileSync('answer_cards.js', 'utf8') + '; return ANSWER_CARDS;')();
const M = new Function(fs.readFileSync('t1_stock.js', 'utf8') + '; return {T1_OPENING,T1_STOCK};')();

// 標點與大小寫都不算差異（合併句子時句號會變逗號）
const norm = s => s.toLowerCase()
  .replace(/[«»""'']/g, "'")
  .replace(/[.,:;!?—–-]/g, ' ')
  .replace(/\s+/g, ' ').trim();

const islands = A.filter(c => c.versions.length > 1)
  .map(c => ({ id: c.id, words: norm(c.versions.at(-1).fr).split(' ') }));

/** 一段文字是否依序出現在某座島裡（允許中間跳過＝刪字） */
function subseqOf(text, isl) {
  const t = norm(text).split(' ');
  let i = 0;
  for (const w of isl.words) { if (i < t.length && w === t[i]) i++; }
  return i === t.length;
}

/** ⭐ 逐句比對：每一句必須出自「某一座」島，但不同句可以來自不同島
 *  （T1 開場本來就是跨島合併——身分取自 AC1、家庭取自 AC2） */
function traceSentences(text) {
  const sents = text.split(/(?<=[.!?»])\s+/).map(x => x.trim()).filter(x => norm(x).length > 3);
  const from = [], bad = [];
  for (const sent of sents) {
    const hit = islands.find(isl => subseqOf(sent, isl));
    if (hit) { if (!from.includes(hit.id)) from.push(hit.id); }
    else bad.push(sent);
  }
  return { from, bad };
}

/** 找出第一個對不上的字，方便定位 */
function firstMismatch(text) {
  const t = norm(text).split(' ');
  let best = { n: -1, id: null, word: null };
  for (const isl of islands) {
    let i = 0;
    for (const w of isl.words) { if (i < t.length && w === t[i]) i++; }
    if (i > best.n) best = { n: i, id: isl.id, word: t[i] || '(結尾)' };
  }
  return best;
}

let errors = 0, warns = 0, checked = 0;

console.log('── t1_stock.js 內容溯源檢查 ──\n');

// 1. 開場（⭐ 跨島合併是合法的，所以逐句比對）
checked++;
{
  const r = traceSentences(M.T1_OPENING.fr);
  if (!r.bad.length) console.log(`✓ 開場（${M.T1_OPENING.mots} mots）逐句出自 ${r.from.join(' + ')}`);
  else {
    r.bad.forEach(b => console.log(`✗ 開場這一句不在任何島裡：「${b.slice(0, 60)}…」`));
    errors += r.bad.length;
  }
}

// 2. 每一筆存貨
M.T1_STOCK.forEach(s => {
  if (s.gap) {
    if (s.fr !== null || s.zh !== null) { console.log(`✗ ${s.hook}：標了 gap 卻有內容`); errors++; }
    else if (!s.note) { console.log(`! ${s.hook}：gap 沒寫清楚缺什麼`); warns++; }
    return;
  }
  checked++;
  // ⭐ Owen 現場口述的內容不出自島，但那是**最正統的來源**（內容鐵律 2：他本人講、Claude 只修文法）
  if (/^Owen /.test(s.src || '')) {
    // ⚠️ 2026-09-04 Owen：「法文我目前沒有什麼太多口語習慣，因為很不會。」
    //   → ⛔ 不要叫他檢查「這句法文像不像我講的」——A2 階段他做不到這個判斷。
    //   ⭐ 他能檢查的是【中文意思對不對】；【法文自不自然】要留給老師。
    console.log(`○ ${s.hook}：來源「${s.src}」——⭐ Owen 口述，不比對島。`);
    console.log(`   ⚠️ 待驗：中文意思由 Owen 確認｜法文自然度由老師確認（⛔ 別叫 Owen 判法文語氣）`);
    const w0 = s.fr.split(/\s+/).length, sec0 = Math.round(w0 / 100 * 60);
    if (w0 !== s.mots || sec0 !== s.sec) { console.log(`! ${s.hook}：字數/秒數標 ${s.mots}/${s.sec}s，實際 ${w0}/${sec0}s`); warns++; }
    return;
  }
  const r = traceSentences(s.fr);
  if (r.bad.length) {
    r.bad.forEach(b => {
      const m = firstMismatch(b);
      console.log(`✗ ${s.hook}（${s.src}）：「${m.word}」不在島裡 —— ⛔ 換詞或加字了`);
    });
    errors += r.bad.length;
    return;
  }
  // 字數與秒數（用 100 mots/min，見 PRACTICE_ORAL）
  const w = s.fr.split(/\s+/).length;
  const sec = Math.round(w / 100 * 60);
  if (w !== s.mots || sec !== s.sec) {
    console.log(`! ${s.hook}：字數/秒數標 ${s.mots}/${s.sec}s，實際 ${w}/${sec}s`);
    warns++;
  }
  if (!s.q_fr || !s.q_zh || !s.zh || !s.src) { console.log(`✗ ${s.hook}：缺欄位`); errors++; }
});

// 3. 開場的每個勾子都要有存貨
console.log('');
M.T1_OPENING.hooks.forEach(h => {
  const live = M.T1_STOCK.filter(s => s.hook === h && !s.gap).length;
  const gap  = M.T1_STOCK.filter(s => s.hook === h && s.gap).length;
  if (!live && !gap) { console.log(`✗ 勾子「${h}」在開場裡，但沒有任何存貨`); errors++; }
  else if (!live)    { console.log(`! 勾子「${h}」目前只有 gap，⚠️ 被問到會沒東西講`); warns++; }
});

// 4. T1 時間預算
const op = 53;
// ⭐ 務實版：實際考場是「開場 ＋ 兩個第一層追問」，不會一次問到最深那層
const lvl1 = M.T1_STOCK.filter(s => !s.gap && (s.level || 1) === 1).map(s => s.sec).sort((a, b) => b - a);
const two = (lvl1[0] || 0) + (lvl1[1] || 0);
const worst = M.T1_STOCK.filter(s => !s.gap).map(s => s.sec).sort((a, b) => b - a).slice(0, 2).reduce((a, b) => a + b, 0);
console.log('');
if (op + two > 120) { console.log(`! 開場 ${op}s ＋ 兩個第一層追問 ${two}s = ${op + two}s，⚠️ 超過 120 秒`); warns++; }
else console.log(`✓ 開場 ${op}s ＋ 兩個最長的第一層追問 ${two}s = ${op + two}s（T1 上限 120s）`);
if (op + worst > 120) console.log(`  （⚠️ 最壞情況：被追到最深的兩段 ${worst}s → ${op + worst}s，⭐ 那時要自己收短，不要講完）`);

console.log(`\n檢查 ${checked} 段｜錯誤 ${errors}／提醒 ${warns}`);
process.exit(errors ? 1 : 0);
