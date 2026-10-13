// tools/check_g3.js — 文法三連（quest.html）的資料檢查（2026-10-13）
// 用法：node tools/check_g3.js [課次]   ← 給課次會把那一課三連可出的題目「交卷後整句」印出來看
// 檢查：
//   ① 三連會出的 topic 都有 G3_AIM（🎯 這三題在練什麼）
//   ② G3_AIM 的 Exemple 一定是 gram_rules.js 裡現成的例句（⛔ 不准自創）＋ 標亮的字找得到
//   ③ 三連會出的題目都有 zh（提示＝中文意思、交卷給整句翻譯）
//   ④ 交卷後的整句一定有把答案填回去
// 加新課、新文法點、新 topic 之後一定要跑。
const fs = require('fs');
const h = fs.readFileSync('quest.html', 'utf8');
const grab = n => { const i = h.indexOf('function ' + n + '('); let d = 0, j = h.indexOf('{', i); for (;; j++) { if (h[j] == '{') d++; if (h[j] == '}' && --d == 0) break; } return h.slice(i, j + 1); };
const aimSrc = h.slice(h.indexOf('var G3_AIM='), h.indexOf('};', h.indexOf('var G3_AIM=')) + 2);
const ctx = new Function(grab('esc') + ';' + aimSrc + ';' + grab('g3Hl') + ';' + grab('g3Usable') + ';' + grab('stemOf') + ';' + grab('g3Short') + ';' + grab('g3Filled') + ';var shownAns=q=>q.a;return {G3_AIM,g3Hl,g3Usable,g3Filled};')();
const BANK = new Function(fs.readFileSync('questions.js', 'utf8') + ';return BANK;')();
const GP = new Function(fs.readFileSync('gram_rules.js', 'utf8').replace(/^const /mg, 'var ') + ';return GRAM_POINTS;')();
const exs = new Set(); GP.forEach(p => ((p.rule || {}).examples || []).forEach(e => exs.add(e.fr)));
const gt = {}; GP.forEach(p => { if (p.unlocked !== false) (p.topics || []).forEach(t => gt[t] = 1); });
const U = BANK.filter(q => gt[q.topic] && ctx.g3Usable(q));
let bad = 0;
const miss = [...new Set(U.map(q => q.topic))].filter(t => !ctx.G3_AIM[t]);
if (miss.length) { bad++; console.log('✗ 這些 topic 會出三連但沒有 G3_AIM：', miss.join('、')); }
for (const [k, a] of Object.entries(ctx.G3_AIM)) {
  if (a.ex && !exs.has(a.ex)) { bad++; console.log('✗ Exemple 不在 gram_rules 例句裡：', k); }
  if (a.ex && !/g3hl/.test(ctx.g3Hl(a.ex, a.hl))) { bad++; console.log('✗ 標亮的字找不到：', k); }
}
const noZh = U.filter(q => !q.zh); if (noZh.length) { bad++; console.log('✗ 沒有中文的三連題：', noZh.length); noZh.slice(0, 10).forEach(q => console.log('   ', q.lesson, q.q)); }
const noAns = U.filter(q => !/g3hl/.test(ctx.g3Filled(q))); if (noAns.length) { bad++; console.log('✗ 交卷整句沒填回答案：', noAns.length); }
console.log('三連可出', U.length, '題｜', bad ? '有問題 ↑' : '✓ 全部通過');
const L = +process.argv[2];
if (L) BANK.filter(q => q.lesson === L && gt[q.topic] && ctx.g3Usable(q)).forEach(q => console.log('  ', ctx.g3Filled(q).replace(/<[^>]+>/g, '')));
process.exit(bad ? 1 : 0);
