// 唯讀檢查：drafts/isle_AC15.js 對 town.html 的 isleSplit/isles/isleField/isleBuild 規則
const fs = require('fs'), path = require('path'), cp = require('child_process');
const ROOT = path.join(__dirname, '..'), F = path.join(ROOT, 'drafts/isle_AC15.js');
const town = fs.readFileSync(path.join(ROOT, 'town.html'), 'utf8');
const grab = name => { const i = town.indexOf('function ' + name + '('); let d = 0, j = town.indexOf('{', i);
  for (; j < town.length; j++) { if (town[j] === '{') d++; else if (town[j] === '}' && --d === 0) break; } return town.slice(i, j + 1); };
let ANSWER_CARDS; eval(fs.readFileSync(path.join(ROOT, 'answer_cards.js'), 'utf8').replace(/\b(var|const|let)\s+ANSWER_CARDS\s*=/, 'ANSWER_CARDS='));
var ISLES = null; eval(grab('isleSplit') + grab('isles') + grab('isleField'));
const sc = require(F), out = [], bad = [];
const ok = (c, m) => { if (!c) bad.push(m); };
// node --check
try { cp.execFileSync(process.execPath, ['--check', F]); out.push('node --check：通過'); } catch (e) { bad.push('node --check 失敗'); }
const I = isles().find(x => x.id === 'AC15'), keys = I.sents.map(s => s.key);
const mk = Object.keys(sc.marks);
const miss = keys.filter(k => !sc.marks[k]), extra = mk.filter(k => !keys.includes(k));
out.push(`站數 ${keys.length}；marks ${mk.length}；缺 ${miss.length ? miss : '無'}；多餘 ${extra.length ? extra : '無'}`);
ok(!miss.length && !extra.length, 'key 不對');
// tiles（同 isleBuild）
const T = []; for (let y = 0; y < sc.H; y++) { T[y] = []; for (let x = 0; x < sc.W; x++) { const f = isleField(sc, x + .5, y + .5); T[y][x] = f > .16 ? 'g' : f > 0 ? 's' : f > -.14 ? 'w' : 'd'; } }
const land = (x, y) => { const t = T[Math.floor(y)] && T[Math.floor(y)][Math.floor(x)]; return isleField(sc, x, y) > 0 && (t === 'g' || t === 's'); };
const fz = y => sc.zones.find(z => y >= z.y0 && y < z.y1);
// 原文段落 → 區：key 的句號落在哪一段
const v = ANSWER_CARDS.find(c => c.id === 'AC15'); const v2 = v.versions[v.versions.length - 1];
const para = []; String(v2.fr).split(/\n\s*\n/).forEach((p, i) => { p.trim().split(/(?<=[.!?…])\s+(?=[A-ZÀ-Ý«])/).forEach(f => { if (f.trim()) para.push(i); }); });
let minD = 99, rows = [];
keys.forEach((k, i) => { const m = sc.marks[k], [x, y] = m[3], z = fz(y), want = sc.zones[para[parseInt(k)]];
  const L = land(x, y); ok(L, `站${i + 1}(${k}) 不在陸地`); ok(z === want, `站${i + 1}(${k}) 區=${z && z.name} 應=${want.name}`);
  let d = ''; if (i < keys.length - 1) { const n = sc.marks[keys[i + 1]][3]; const dd = Math.hypot(n[0] - x, n[1] - y); d = dd.toFixed(2); }
  rows.push(`${String(i + 1).padStart(2)} ${k.padEnd(5)} ${m[0]}${m[1]} ${m[2]} [${x},${y}] f=${isleField(sc, x, y).toFixed(2)} ${z.name}${d ? ' →' + d : ''}`); });
// 全部兩兩距離
for (let a = 0; a < mk.length; a++) for (let b = a + 1; b < mk.length; b++) { const p = sc.marks[mk[a]][3], q = sc.marks[mk[b]][3]; const d = Math.hypot(p[0] - q[0], p[1] - q[1]); minD = Math.min(minD, d); ok(d >= 2.2, `距離 ${mk[a]}-${mk[b]}=${d.toFixed(2)}`); }
out.push(rows.join('\n')); out.push(`所有地標兩兩最小距離 ${minD.toFixed(2)}（門檻 2.2）`);
// path：點與線段取樣都在陸地
let pBad = 0; sc.path.forEach((p, i) => { if (!land(p[0], p[1])) { pBad++; bad.push(`path[${i}] 不在陸地`); }
  if (i) { const q = sc.path[i - 1]; for (let t = .1; t < 1; t += .1) if (!land(q[0] + (p[0] - q[0]) * t, q[1] + (p[1] - q[1]) * t)) { pBad++; bad.push(`path 段 ${i - 1}-${i} 經過水`); break; } } });
out.push(`path ${sc.path.length} 點，點與線段離開陸地 ${pBad} 處`);
// 沿步道順序：每站投影到 path 的累積長度要遞增
const cum = [0]; for (let i = 1; i < sc.path.length; i++) cum[i] = cum[i - 1] + Math.hypot(sc.path[i][0] - sc.path[i - 1][0], sc.path[i][1] - sc.path[i - 1][1]);
const proj = ([x, y]) => { let best = 1e9, s = 0; for (let i = 1; i < sc.path.length; i++) { const a = sc.path[i - 1], b = sc.path[i], dx = b[0] - a[0], dy = b[1] - a[1], L2 = dx * dx + dy * dy;
  const t = Math.max(0, Math.min(1, ((x - a[0]) * dx + (y - a[1]) * dy) / L2)), d = Math.hypot(a[0] + dx * t - x, a[1] + dy * t - y); if (d < best) { best = d; s = cum[i - 1] + Math.sqrt(L2) * t; } } return [s, best]; };
let order = true, far = 0; const pr = keys.map(k => proj(sc.marks[k][3])); pr.forEach((p, i) => { far = Math.max(far, p[1]); if (i && p[0] <= pr[i - 1][0]) { order = false; bad.push(`站${i + 1} 沿步道順序倒退`); } });
out.push(`沿步道順序：${order ? '遞增 ✓' : '有倒退'}；地標離步道最遠 ${far.toFixed(2)}`);
// dock：上端在陸地、下端在水裡，且在島下方
const [dx, dy0, dy1] = sc.dock; ok(land(dx, dy0 - .2), 'dock 上端不接陸地'); ok(!land(dx, dy1 - .3), 'dock 下端沒進水'); ok(dy1 <= sc.H, 'dock 超出 H');
ok(Math.max(...mk.map(k => sc.marks[k][3][1])) < dy0, 'dock 不在最下方');
out.push(`dock [${sc.dock}]：上端陸地 ${land(dx, dy0 - .2)}，下端水 ${!land(dx, dy1 - .3)}`);
// tablet / board / deco
ok(land(sc.tablet.x, sc.tablet.y), 'tablet 不在陸地'); ok(land(sc.board.x, sc.board.y), 'board 不在陸地');
const decoBad = sc.deco.filter(d => !land(d[1], d[2])); decoBad.forEach(d => bad.push(`deco ${d} 不在陸地`));
out.push(`tablet/board 陸地 ${land(sc.tablet.x, sc.tablet.y)}/${land(sc.board.x, sc.board.y)}；deco ${sc.deco.length} 個，不在陸地 ${decoBad.length}`);
// links
const lens = sc.links.map(s => [...s].length); ok(sc.links.length === keys.length - 1, 'links 長度不對');
sc.links.forEach((s, i) => { ok([...s].length <= 26, `links[${i}] ${[...s].length} 字`); ok(!/[a-zàâçéèêëîïôûùüÿœ]{3,}/i.test(s.replace(/B2/g, '')), `links[${i}] 疑似法文`); });
out.push(`links ${sc.links.length}（應 ${keys.length - 1}），最長 ${Math.max(...lens)} 字`);
// 主圖重複（本島內、對 AC1/AC2）
const ac = town.slice(town.indexOf('var ISLE_SCENES={'), town.indexOf('var ARCH_ICON'));
const oldMain = new Set([...ac.matchAll(/'[\d.]+':\['([^']+)'/g)].map(m => m[1]));
const mains = mk.map(k => sc.marks[k][0]); const dupIn = mains.filter((e, i) => mains.indexOf(e) !== i), dupOld = mains.filter(e => oldMain.has(e));
out.push(`主圖：島內重複 ${dupIn.length ? dupIn : '無'}；與 AC1/AC2 主圖重複 ${dupOld.length ? dupOld : '無'}`);
out.push(`outline 區數 ${sc.outline.length}（zones ${sc.zones.length}）`); ok(sc.outline.length === sc.zones.length, 'outline 區數≠zones');
console.log(out.join('\n')); console.log(bad.length ? '❌ ' + bad.length + ' 項：\n' + bad.join('\n') : '✅ 全部通過');
