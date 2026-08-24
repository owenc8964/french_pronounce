#!/usr/bin/env node
/* tools/check_scenes.js — 情境劇本的教材鐵律檢查（2026-08-24 新增）
 *
 * 規則：劇本裡的法文**不可以是 Claude 編的**。但對話難免要把筆記裡的句子接起來
 * （「Merci」＋「Bonne journée !」＝ 一句台詞），所以檢查的單位是**句**不是整行：
 * 把每行拆成句子，每一句都必須逐字出現在 french_notes.html 裡。
 *
 * 用法：node tools/check_scenes.js
 */
const fs = require('fs');
const { SCENES } = require('../scenes.js');

const notes = fs.readFileSync('french_notes.html', 'utf8')
  .replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ')
  .replace(/\s+/g, ' ');

const norm = s => s.replace(/\s+/g, ' ').trim().replace(/^[«»"']|[«»"']$/g, '');
// 拆句：句號/驚嘆號/問號後面接空白就切
const split = s => norm(s).split(/(?<=[.!?])\s+/).map(norm).filter(Boolean);

let total = 0, bad = [], constructed = [];
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
      const probe = part.replace(/[!?.]+$/, '');
      if (probe.length < 2) continue;
      if (!notes.includes(probe)) bad.push({ scene: sc.id, where, part });
    }
  }
}

console.log(`劇本 ${SCENES.length} 個｜檢查 ${total} 句`);
if (constructed.length) {
  console.log(`\n⚠️ 刻意的誘答選項 ${constructed.length} 句（不是教材，永遠附警告顯示）：`);
  constructed.forEach(c => console.log('   ' + c));
}
if (bad.length) {
  console.log(`\n❌ 以下句子在 french_notes.html 找不到逐字出處（不准自己編）：`);
  bad.forEach(b => console.log(`   [${b.scene} ${b.where}] ${b.part}`));
  process.exit(1);
}
console.log('✅ 每一句都出自筆記');
