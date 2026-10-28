// Q25：把 town.html 的數字題生成器原封不動抽出來（只讀，不改原檔），
// 窮舉四種新題型的所有可能 key，檢查標準答案＋常見標準說法是否被判對。
// 用法：node tools/q25_num_kinds_check.js
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const src = fs.readFileSync(path.join(__dirname, '..', 'town.html'), 'utf8');
const a = src.indexOf('function frNum(n){'), b = src.indexOf('var NUM_CHAIN');
const deaccLine = src.match(/function deacc\(x\)\{[^\n]*\}/)[0];
if (a < 0 || b < 0) throw new Error('找不到生成器區段');
const ctx = { S: {}, Math, String };
vm.createContext(ctx);
vm.runInContext(deaccLine + '\n' + src.slice(a, b) + '\nthis.numItem=numItem;this.numJudgeAny=numJudgeAny;this.numKindKey=numKindKey;this.frNum=frNum;this.numPick=numPick;', ctx);
const { numItem, numJudgeAny, numKindKey, frNum, numPick } = ctx;

const out = [];
const log = s => out.push(s);
const ok = (k, v) => numJudgeAny(v, numItem(k).ans);

// ---------- 1. 窮舉 key 空間 ----------
const P_CENTS = ['50','20','90','99','75','30','10','95','45','80'];
const T_MIN = ['00','15','30','45','05','10','20','40','50','25'];
const keys = { p: [], d: [], t: [], D: [] };
for (let e = 1; e <= 49; e++) for (const c of P_CENTS) keys.p.push('p:' + e + '.' + c);
for (let i = 0; i <= 20; i++) { for (let f = 1; f <= 9; f++) keys.d.push('d:' + i + '.' + f); for (let f = 11; f <= 99; f++) keys.d.push('d:' + i + '.' + f); }
for (let h = 1; h <= 23; h++) for (const m of T_MIN) keys.t.push('t:' + h + ':' + m);
const ML = [31,28,31,30,31,30,31,31,30,31,30,31];
for (let mo = 1; mo <= 12; mo++) for (let d = 1; d <= ML[mo-1]; d++) keys.D.push('D:' + d + '/' + mo);
for (const t in keys) log(`[空間] ${t}: ${keys[t].length} 種 key`);

// 確認隨機生成器只會產出窮舉空間內的 key
const all = new Set([].concat(...Object.values(keys)));
let stray = 0;
for (let n = 0; n < 20000; n++) for (const t of ['p','d','t','D']) { const k = numKindKey(t); if (!all.has(k)) { stray++; if (stray < 5) log('[超出空間] ' + k); } }
log(`[隨機抽樣 80000 筆] 超出窮舉空間：${stray}`);

// ---------- 2. 樣本 ----------
const sample = arr => arr.filter((_, i) => i % Math.max(1, Math.floor(arr.length / 12)) === 0);
for (const t in keys) { log(`\n== 樣本 ${t} ==`); for (const k of sample(keys[t])) { const I = numItem(k); log(`${k}\tshow=${I.show}\task=${I.ask}\tans=${JSON.stringify(I.ans)}`); } }

// ---------- 3. 指定情境檢查 ----------
log('\n== 指定情境 ==');
const cases = [
  // 價錢
  ['p:1.50', 'un euro cinquante'], ['p:21.50', 'vingt et un euros cinquante'], ['p:3.80', 'trois euros quatre-vingts'],
  ['p:3.99', 'trois euros quatre-vingt-dix-neuf'], ['p:3.50', 'trois euros et cinquante centimes'],
  ['p:3.50', 'trois euros et cinquante'], ['p:3.50', 'trois virgule cinquante'], ['p:3.50', 'trois virgule cinquante euros'],
  ['p:3.50', 'trois euro cinquante'],
  // 小數
  ['d:2.5', 'deux virgule cinq'], ['d:0.5', 'zéro virgule cinq'], ['d:3.75', 'trois virgule soixante-quinze'],
  ['d:3.75', 'trois virgule sept cinq'], ['d:2.30', 'deux virgule trente'], ['d:2.30', 'deux virgule trois'],
  ['d:12.71', 'douze virgule soixante et onze'],
  // 時刻
  ['t:14:30', 'quatorze heures trente'], ['t:14:30', 'deux heures et demie'], ['t:9:15', 'neuf heures quinze'],
  ['t:9:15', 'neuf heures et quart'], ['t:9:30', 'neuf heures et demie'], ['t:9:45', 'dix heures moins le quart'],
  ['t:9:45', 'neuf heures quarante-cinq'], ['t:9:50', 'dix heures moins dix'], ['t:1:05', 'une heure cinq'],
  ['t:21:00', 'vingt et une heures'], ['t:12:00', 'midi'], ['t:12:00', 'douze heures'], ['t:12:30', 'midi et demi'],
  ['t:12:30', 'midi et demie'], ['t:12:30', 'midi trente'], ['t:12:15', 'midi et quart'], ['t:12:45', 'une heure moins le quart'],
  ['t:21:05', 'vingt et une heures cinq'], ['t:8:00', 'huit heures'], ['t:8:00', "huit heures du matin"],
  // 日期
  ['D:1/5', 'le premier mai'], ['D:1/5', 'premier mai'], ['D:1/5', 'le 1er mai'], ['D:1/5', 'le un mai'],
  ['D:2/5', 'le deux mai'], ['D:8/5', 'le huit mai'], ['D:11/11', 'le onze novembre'], ['D:11/11', "l'onze novembre"],
  ['D:21/3', 'le vingt et un mars'], ['D:21/3', 'le vingt et unième mars'], ['D:31/12', 'le trente et un décembre'],
  ['D:14/7', 'le quatorze Juillet'], ['D:15/8', 'le quinze aout'], ['D:2/2', 'le deux fevrier'],
  // 年份（既有題型，順便看）
  [1999, 'mille neuf cent quatre-vingt-dix-neuf'], [1999, 'dix-neuf cent quatre-vingt-dix-neuf'], [1999, 'mil neuf cent quatre-vingt-dix-neuf'],
  [2024, 'deux mille vingt-quatre'], [1980, 'mille neuf cent quatre-vingts'], [1980, 'mille neuf cent quatre-vingt'],
];
for (const [k, v] of cases) { const J = ok(k, v); log(`${J.ok ? '✓判對' : '✗判錯'}\t${k}\t「${v}」\t${J.note || ''}`); }

// ---------- 4. 全域體檢 ----------
log('\n== 全域體檢 ==');
let selfFail = 0, dupAns = 0;
for (const k of all) { const I = numItem(k); for (const x of I.ans) if (!numJudgeAny(x, I.ans).ok) selfFail++; if (new Set(I.ans).size !== I.ans.length) dupAns++; }
log(`標準答案自己判自己失敗：${selfFail}；答案清單有重複：${dupAns}`);
// 小數尾數 0（2,30 這種）
const tz = keys.d.filter(k => /\.\d0$/.test(k));
log(`小數出現尾數 0（例 2,30）：${tz.length}/${keys.d.length} 種 key，例 ${tz.slice(0,3).map(k=>numItem(k).show).join('、')}`);
// 時刻：哪些 key 有 et quart / et demie / moins le quart 的標準替代說法卻被判錯
const H = ['','une','deux','trois','quatre','cinq','six','sept','huit','neuf','dix','onze'];
let tRej = [];
for (const k of keys.t) { const [h, m] = k.slice(2).split(':').map(Number); if (h > 12) continue;
  const name = n => n === 12 ? 'midi' : (n === 1 ? 'une heure' : (n===13?'une heure':H[n] + ' heures'));
  const alts = [];
  if (m === 15) alts.push(name(h) + ' et quart');
  if (m === 30) alts.push(name(h) + (h === 12 ? ' et demi' : ' et demie'));
  if (m === 45) alts.push(name(h + 1 > 12 ? h + 1 - 12 : h + 1).replace(/^midi$/, 'midi') + ' moins le quart');
  if ([40, 50].includes(m)) alts.push(name(h + 1 > 12 ? h + 1 - 12 : h + 1) + ' moins ' + (m === 40 ? 'vingt' : 'dix'));
  for (const v of alts) if (!ok(k, v).ok) tRej.push(numItem(k).show + '→' + v);
}
log(`1–12 點的 quart／demie／moins 說法被判錯：${tRej.length} 種，例 ${tRej.slice(0,6).join('；')}`);
// 頻率：numPick 一萬次的分布（S.numWrong 空）
const cnt = {}; for (let n = 0; n < 100000; n++) { const k = numPick(); const t = typeof k === 'number' ? (k >= 1900 ? 'year' : 'int') : k[0]; cnt[t] = (cnt[t] || 0) + 1; }
log('numPick 十萬次分布：' + JSON.stringify(cnt));

console.log(out.join('\n'));
