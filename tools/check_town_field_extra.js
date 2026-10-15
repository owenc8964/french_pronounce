/* check_town_field_extra.js — 驗證 tools/town_field_extra.js
 * 用法：node tools/check_town_field_extra.js     （有錯 → exit 1）
 *
 * 檢查：
 *  1. 題幹 q、正解 a、aNote、topic 跟 questions.js 的 BANK[src] 一字不差（⛔ 不准改教材）
 *  2. fam 跟 town.html 的 FAM 分家結果一致
 *  3. 題目恰好一個空格；opts 3–4 個；選項裡沒有中文
 *  4. 正解恰好一個：用 town.html askChoose 同一套判定（原字串 or normAns 相等）去數，opts 裡剛好 1 個算對
 *  5. 干擾項不等於任何正解：除了 normAns，也用「縮寫等價」比（que≡qu'、le≡l'…），避免 town 判錯但其實是同一個答案
 *  6. opts 不重複（normAns 之後）
 */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..');
const ctx = {}; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'questions.js'), 'utf8') + ';this.BANK=BANK;', ctx);
const BANK = ctx.BANK;
const { FIELD_EXTRA } = require('./town_field_extra.js');

/* ── 從 town.html 抄來（同一份邏輯，才能保證遊戲裡判得一樣）── */
const html = fs.readFileSync(path.join(ROOT, 'town.html'), 'utf8');
const famSrc = html.match(/var FAM = \{[\s\S]*?\n\};/)[0];
const FAM = vm.runInNewContext(famSrc.replace('var FAM =', '(') .replace(/;\s*$/, ')'));
const famOf = t => { for (const k in FAM) if (FAM[k].test(t)) return k; return null; };
function deacc(x) { return String(x).normalize('NFD').replace(/[̀-ͯ]/g, ''); }
function normAns(x) { return deacc(String(x)).toLowerCase().replace(/[’]/g, "'").replace(/[.,!?;:«»"]/g, '').replace(/\s+/g, ' ').trim(); }
const isRight = (o, alts) => alts.indexOf(o) >= 0 || alts.map(normAns).indexOf(normAns(o)) >= 0;
/* 縮寫等價：que≡qu'、de≡d'、ce≡c'、je≡j'…（只差縮寫的是「同一個選擇」，不能一個算對一個算錯）。
 * ⚠️ le／la vs l' 刻意不算等價：冠詞／受詞代名詞「該縮不縮」本身就是要練的錯（le animal ✗），
 *    而且 le 跟 la 是兩個不同的字。如果題庫兩種都收（例如 a='l'|le'），第 4 條就會抓到。 */
const elideKeys = x => [normAns(x).replace(/(^|\s)(qu|d|j|m|t|s|n|c)'(?=\s|$)/g, (m, sp, a) => sp + ({ qu: 'que', d: 'de', j: 'je', m: 'me', t: 'te', s: 'se', n: 'ne', c: 'ce' }[a])).replace(/\s+/g, ' ').trim()];
const CJK = /[　-〿㐀-鿿＀-￯]/;

const errors = [], perFam = {}, perTopic = {}; let cue = 0;
const seenSrc = new Set();
FIELD_EXTRA.forEach((it, k) => {
  const tag = `#${k} src=${it.src}`;
  const b = BANK[it.src];
  if (!b) { errors.push(`${tag} BANK 沒有這個索引`); return; }
  if (seenSrc.has(it.src)) errors.push(`${tag} src 重複`); seenSrc.add(it.src);
  if (b.type !== 'fill') errors.push(`${tag} 原題不是 fill（${b.type}）`);
  if (it.q !== b.q) errors.push(`${tag} q 跟 BANK 不同`);
  if (it.a !== b.a) errors.push(`${tag} a 跟 BANK 不同`);
  if ((it.aNote || '') !== (b.aNote || '')) errors.push(`${tag} aNote 跟 BANK 不同`);
  if (it.topic !== b.topic) errors.push(`${tag} topic 跟 BANK 不同`);
  if (famOf(b.topic) !== it.fam) errors.push(`${tag} fam=${it.fam} 但 town FAM 判成 ${famOf(b.topic)}`);
  if ((String(it.q).match(/_{2,}/g) || []).length !== 1) errors.push(`${tag} 空格數不是 1`);
  if (!Array.isArray(it.opts) || it.opts.length < 3 || it.opts.length > 4) errors.push(`${tag} opts 數量 ${it.opts && it.opts.length}`);
  const alts = String(it.a).split('|');
  const right = it.opts.filter(o => isRight(o, alts));
  if (right.length !== 1) errors.push(`${tag} 正解數 ${right.length}：${it.opts.join(' / ')}`);
  const altKeys = new Set(alts.flatMap(elideKeys));
  it.opts.filter(o => !isRight(o, alts)).forEach(o => {
    if (elideKeys(o).some(x => altKeys.has(x))) errors.push(`${tag} 干擾項「${o}」縮寫後等於正解`);
  });
  const ns = it.opts.map(normAns);
  if (new Set(ns).size !== ns.length) errors.push(`${tag} opts 重複：${it.opts.join(' / ')}`);
  it.opts.forEach(o => { if (CJK.test(o)) errors.push(`${tag} 選項有中文「${o}」`); if (!String(o).trim()) errors.push(`${tag} 空選項`); });
  if (it.hint && right[0] && new RegExp('(^|[^a-z])' + normAns(right[0]).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '([^a-z]|$)').test(normAns(it.hint)))
    errors.push(`${tag} hint 直接寫出正解「${right[0]}」`);
  perFam[it.fam] = (perFam[it.fam] || 0) + 1;
  perTopic[it.fam + '/' + it.topic] = (perTopic[it.fam + '/' + it.topic] || 0) + 1;
  if (it.cue) cue++;
});

console.log('題數：', FIELD_EXTRA.length);
console.log('各家族：', JSON.stringify(perFam));
console.log('需要題幹線索才判錯（cue）：', cue, '題');
console.log('選項數分佈：', JSON.stringify(FIELD_EXTRA.reduce((m, x) => (m[x.opts.length] = (m[x.opts.length] || 0) + 1, m), {})));
console.log('各 topic：');
Object.entries(perTopic).sort().forEach(([k, v]) => console.log('  ' + String(v).padStart(3), k));
if (errors.length) { console.log('\n❌ 錯誤 ' + errors.length + ' 筆：'); errors.slice(0, 50).forEach(e => console.log('  ' + e)); process.exit(1); }
console.log('\n✅ 全部通過：正解恰好一個、opts 無重複、干擾項不等於任何正解（含去重音／縮寫等價）、q/a/aNote 原樣');
