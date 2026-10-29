// Q33：升級工坊「用了哪一招」的干擾項排除（town.html upAlsoUses）實際跑一次（只讀）
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..');
const ctx = { console }; vm.createContext(ctx);
['upgrade_moves.js', 'island_upgrades.js'].forEach(f => vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/^(\s*)(const|let)\s+/gm, '$1var '), ctx));
const town = fs.readFileSync(path.join(ROOT, 'town.html'), 'utf8');
vm.runInContext(town.match(/function upAlsoUses\(m, u\)\{[\s\S]*?\n[^\n]*\n/)[0], ctx);
const M = ctx.UPGRADE_MOVES, U = ctx.ISLAND_UPGRADES;
console.log('moves', M.length, 'upgrades', U.length);
const byId = id => M.find(m => m.id === id);
const taught = M.filter(m => m.taught);
let rows = [], noOpt = [];
U.forEach(u => { const r = byId(u.move); if (!r || !r.taught) return;
  const ex = taught.filter(m => m.id !== u.move && m.name !== r.name && ctx.upAlsoUses(m, u));
  // 其餘干擾項中，偵測式在升級版與原句都命中的（升級前就有，不會造成兩個答案）
  const left = taught.filter(m => m.id !== u.move && m.name !== r.name && !ctx.upAlsoUses(m, u));
  if (ex.length) rows.push(u.ref + ' 正解 ' + r.id + ' 排除 ' + ex.map(m => m.id).join(',') + '｜' + u.up.slice(0, 90));
  if (left.length < 3) noOpt.push(u.ref + ' 剩 ' + left.length + ' 個干擾項');
  // 正解的偵測式本身有沒有命中升級版
  if (r.pattern) { try { if (!new RegExp(r.pattern, 'i').test(u.up)) rows.push('  ⚠️ ' + u.ref + ' 正解 ' + r.id + ' 的偵測式沒命中升級版'); } catch (e) {} }
});
console.log(rows.join('\n'));
console.log('干擾項不足 3 個：' + (noOpt.join('；') || '無'));
