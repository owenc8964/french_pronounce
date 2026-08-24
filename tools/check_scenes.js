#!/usr/bin/env node
/* tools/check_scenes.js — 情境劇本的教材鐵律檢查（2026-08-24 新增，08-25 加課本來源）
 *
 * 規則：劇本裡的法文**不可以是 Claude 編的**。但對話難免要把來源裡的句子接起來
 * （「Merci」＋「Bonne journée !」＝ 一句台詞），所以檢查的單位是**句**不是整行：
 * 把每行拆成句子，每一句都必須逐字出現在來源裡。
 *
 * 兩個來源（08-25 起）：
 *   ① french_notes.html —— 課堂筆記（老師講過、Owen 自己的答案）
 *   ② assets/.textbook_cache.txt —— Édito A1 課本＋Cahier 的原文（含**聽力逐字稿**，
 *      服務生／店員／朋友邀約的真實台詞都在那裡，筆記沒有收）
 *      這份快取由 `python3 tools/extract_textbook.py` 產生，是商業教材內容，不進 git。
 *      沒有這個檔也能跑，只是只剩筆記可比對（會提示怎麼產生）。
 *
 * 用法：node tools/check_scenes.js
 */
const fs = require('fs');
const { SCENES } = require('../scenes.js');

// 兩邊都要正規化：課本 PDF 用彎引號 ’、筆記用直引號 '，不統一會整批誤判
const normSrc = s => s
  .replace(/[‘’ʼ]/g, "'").replace(/[“”]/g, '"')
  .replace(/…/g, '...').replace(/[   ]/g, ' ')
  .replace(/\s+/g, ' ')
  .replace(/([a-zà-ÿ])-\s+([a-zà-ÿ])/g, '$1-$2'); // 換行處被拆開的連字號（messieurs- dames）

const sources = [];
sources.push({
  name: '筆記',
  text: normSrc(fs.readFileSync('french_notes.html', 'utf8')
    .replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'")),
});
const CACHE = 'assets/.textbook_cache.txt';
if (fs.existsSync(CACHE)) {
  sources.push({ name: '課本', text: normSrc(fs.readFileSync(CACHE, 'utf8')) });
} else {
  console.log(`⚠️ 找不到 ${CACHE}——只用筆記比對。要納入課本原文請先跑：python3 tools/extract_textbook.py\n`);
}

const norm = s => normSrc(String(s)).trim().replace(/^[«»"']|[«»"']$/g, '');
// 拆句：句號/驚嘆號/問號後面接空白就切
const split = s => norm(s).split(/(?<=[.!?])\s+/).map(norm).filter(Boolean);

let total = 0, bad = [], constructed = [];
const hits = {};
for (const sc of SCENES) {
  const lines = [];
  for (const [id, nd] of Object.entries(sc.nodes)) {
    if (nd.line && nd.speaker !== 'system') lines.push([id, nd.line]);
    (nd.choices || []).forEach((c, i) => {
      if (c.constructed) { constructed.push(`[${sc.id} ${id}#${i}] ${c.fr}（${c.tag}）`); return; }
      lines.push([`${id}#${i}`, c.fr]);
    });
  }
  for (const [where, line] of lines) {
    for (const part of split(line)) {
      total++;
      const probe = part.replace(/[!?.\s]+$/, '');
      if (probe.length < 2) continue;
      const src = sources.find(s => s.text.includes(probe));
      if (src) hits[src.name] = (hits[src.name] || 0) + 1;
      else bad.push({ scene: sc.id, where, part });
    }
  }
}

console.log(`劇本 ${SCENES.length} 個｜檢查 ${total} 句`
  + `｜出處：${sources.map(s => `${s.name} ${hits[s.name] || 0}`).join(' / ')}`);
if (constructed.length) {
  console.log(`\n⚠️ 刻意的誘答選項 ${constructed.length} 句（不是教材，永遠附警告顯示）：`);
  constructed.forEach(c => console.log('   ' + c));
}
if (bad.length) {
  console.log(`\n❌ 以下句子在筆記與課本裡都找不到逐字出處（不准自己編）：`);
  bad.forEach(b => console.log(`   [${b.scene} ${b.where}] ${b.part}`));
  process.exit(1);
}
console.log('✅ 每一句都出自筆記或課本原文');
