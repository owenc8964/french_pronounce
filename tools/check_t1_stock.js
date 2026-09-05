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

/* ── 2026-09-05 新增：解析層（gloss）的檢查 ──────────────────────
 * ⚠️ 為什麼 gloss 也要機器驗：Owen 是 A2，**他驗不出文法解釋是不是對的**，
 *   而錯的門牌比沒有門牌更糟（會把他導去完全無關的條目）。
 *   → 兩件事一定要驗：① blocks 的法文是原文的真實片段 ② 座標真的存在於 codex.js
 */
let GLOSS = null;
try {
  if (fs.existsSync('t1_gloss.js'))
    GLOSS = new Function(fs.readFileSync('t1_gloss.js', 'utf8') + '; return T1_GLOSS;')();
} catch (e) { console.log('! t1_gloss.js 讀取失敗：' + e.message); }

/** codex.js 裡所有真實存在的座標 */
function codexCoords() {
  const set = new Set();
  if (!fs.existsSync('codex.js')) return set;
  const src = fs.readFileSync('codex.js', 'utf8');
  /* ⚠️ 只認**真正的條目定義**：n:'x-y-z' 後面要跟著 lvl:。
     ⛔ 寬鬆比對會把 see:['3-6-2'] / vs:[{n:'7-3-1'}] 這些交叉引用也算進來，
     結果是「編出來的門牌」也能通過檢查 —— 那比不檢查更危險。 */
  const re = /\bn:\s*'([0-9]+(?:-[0-9]+){1,2})'\s*,\s*lvl:/g;
  let m; while ((m = re.exec(src))) set.add(m[1]);
  return set;
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

/* ── 解析層（gloss）檢查 ────────────────────────────────────── */
if (GLOSS) {
  console.log('\n── 解析層 gloss ──');
  const coords = codexCoords();
  /* ⚠️ key ＝ hook + '/' + src。⭐ 光靠 src 不唯一（`Owen 2026-09-04 口述` 出現兩次），
     hook 也不唯一（同一個勾子有多層），合起來才唯一。 */
  const segs = [{ key: 'opening', fr: M.T1_OPENING.fr }]
    .concat(M.T1_STOCK.filter(s => !s.gap)
      .map(s => ({ key: s.hook + '/' + s.src, fr: s.fr, hook: s.hook })));

  let missing = 0, badCoord = 0, badBlock = 0, dirty = 0, pts = 0, blks = 0;
  const gapPoints = [];

  segs.forEach(seg => {
    const g = GLOSS[seg.key];
    if (!g) { console.log(`✗ 沒有解析：${seg.key}`); missing++; errors++; return; }

    /* ① blocks 的法文必須是原文的真實片段 —— 同一個子序列判準，
          ⛔ 防的是「解析裡出現原文沒有的法文」（那等於偷偷改稿） */
    (g.blocks || []).forEach(b => {
      blks++;
      const inText = norm(seg.fr).indexOf(norm(b.fr)) >= 0;
      if (!inText) {
        console.log(`✗ ${seg.key}：blocks 這一塊不在原文裡：「${b.fr}」 —— ⛔ 解析不准出現原文沒有的法文`);
        badBlock++; errors++;
      }
      if (!b.zh) { console.log(`✗ ${seg.key}：「${b.fr}」缺中文`); errors++; }
    });
    if (!(g.blocks || []).length) { console.log(`! ${seg.key}：沒有 blocks`); warns++; }

    /* ② 座標必須真的存在 —— ⭐ 錯的門牌比沒門牌更糟 */
    (g.points || []).forEach(pt => {
      pts++;
      if (pt.n == null) { gapPoints.push(`${seg.key}：${pt.fr}`); return; }
      if (!coords.has(pt.n)) {
        console.log(`✗ ${seg.key}：座標 📍${pt.n} 在 codex.js 裡不存在（「${pt.fr}」）—— ⛔ 不准編門牌`);
        badCoord++; errors++;
      }
      if ((pt.note || '').length > 45)
        { console.log(`! ${seg.key}：「${pt.fr}」的 note ${pt.note.length} 字，卡背會擠`); warns++; }
    });
    if ((g.points || []).length > 3)
      { console.log(`! ${seg.key}：${g.points.length} 個文法點 —— ⚠️ 每段最多 3 個，貪多會變成上課`); warns++; }

    /* ③ Anki TSV 硬限制：⛔ 不准有 tab／換行／HTML */
    JSON.stringify(g).match(/\t|\\n|<[a-zA-Z\/]/g) && (() => {
      console.log(`✗ ${seg.key}：含 tab／換行／HTML 標籤 —— ⛔ 進 TSV 會壞`);
      dirty++; errors++;
    })();
  });

  if (!missing && !badBlock) console.log(`✓ ${segs.length} 段都有解析，${blks} 塊法文全部對得回原文`);
  if (!badCoord) console.log(`✓ ${pts} 個文法點的 codex 座標全部真實存在`);
  if (!dirty) console.log('✓ 無 tab／換行／HTML');
  console.log(`  平均每段 ${(pts / segs.length).toFixed(1)} 個文法點（⭐ 目標 1–3，⛔ 不要為了完整而解釋他已經會的）`);

  if (gapPoints.length) {
    console.log(`\n⭐ codex 還沒有門牌的文法點 ${gapPoints.length} 個（n:null）——這是 codex 的缺口清單：`);
    gapPoints.slice(0, 12).forEach(x => console.log('   ' + x));
    if (gapPoints.length > 12) console.log(`   …還有 ${gapPoints.length - 12} 個`);
  }
} else {
  console.log('\n（沒有 t1_gloss.js，跳過解析層檢查）');
}

console.log(`\n檢查 ${checked} 段｜錯誤 ${errors}／提醒 ${warns}`);
process.exit(errors ? 1 : 0);
