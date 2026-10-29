// Q33（10-29）：實際跑 town.html／verb_sprint.html／verbs_full.js 的判分函式，驗證 commit b306347 的修正
// 只讀檔、不寫任何資料。用法：node tools/q33_judge_check.js
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..');
const town = fs.readFileSync(path.join(ROOT, 'town.html'), 'utf8').split('\n');
const L = (a, b) => town.slice(a - 1, b).join('\n');
const find = (re, from = 0) => { for (let i = from; i < town.length; i++) if (re.test(town[i])) return i + 1; return -1; };

const ctx = { console, String, Math, RegExp, JSON };
vm.createContext(ctx);
vm.runInContext(town[find(/^function deacc/) - 1], ctx);
const a = find(/^function frNum/), b = find(/^var NUM_CHAIN/) - 1;
vm.runInContext(L(a, b).replace(/^function numPick[\s\S]*?\n}\n/m, ''), ctx);
// conjugation
vm.runInContext(fs.readFileSync(path.join(ROOT, 'verbs_full.js'), 'utf8').replace(/\bconst\b/g, 'var').replace(/\blet\b/g, 'var'), ctx);
vm.runInContext(L(find(/^var CONJ_SUBJ_RE/), find(/^function conjNorm/)), ctx);
const vs = fs.readFileSync(path.join(ROOT, 'verb_sprint.html'), 'utf8');
vm.runInContext(vs.match(/function normalize\(s\) \{[\s\S]*?\n\}/)[0].replace('function normalize', 'function vsNormalize'), ctx);

let pass = 0, fail = 0; const out = [];
function t(name, got, want) { const ok = got === want; ok ? pass++ : fail++; out.push((ok ? 'PASS ' : 'FAIL ') + name + ' → ' + JSON.stringify(got) + (ok ? '' : '（應為 ' + JSON.stringify(want) + '）')); }
const J = (v, k) => { const I = ctx.numItem(k); const r = ctx.numJudgeAny(v, I.ans, I.soft); return r.ok ? (r.note ? 'ok+note' : 'ok') : 'wrong'; };

// ── 時刻 ──
t('9:15 neuf heures et quart', J('neuf heures et quart', 't:9:15'), 'ok');
t('9:15 neuf heures quinze', J('neuf heures quinze', 't:9:15'), 'ok');
t('9:30 neuf heures et demie', J('neuf heures et demie', 't:9:30'), 'ok');
t('9:45 dix heures moins le quart', J('dix heures moins le quart', 't:9:45'), 'ok');
t('9:40 dix heures moins vingt', J('dix heures moins vingt', 't:9:40'), 'ok');
t('9:50 dix heures moins dix', J('dix heures moins dix', 't:9:50'), 'ok');
t('1:30 une heure et demie', J('une heure et demie', 't:1:30'), 'ok');
t('12:30 midi et demi', J('midi et demi', 't:12:30'), 'ok');
t('12:30 midi et demie（算對但提醒）', J('midi et demie', 't:12:30'), 'ok+note');
t('12:45 une heure moins le quart', J('une heure moins le quart', 't:12:45'), 'ok');
t('11:45 midi moins le quart', J('midi moins le quart', 't:11:45'), 'ok');
t('12:15 midi et quart', J('midi et quart', 't:12:15'), 'ok');
t('12:15 douze heures et quart（口語少見，未收）', J('douze heures et quart', 't:12:15'), 'wrong');
t('15:15 quinze heures et quart 應判錯', J('quinze heures et quart', 't:15:15'), 'wrong');
t('14:30 quatorze heures et demie 應判錯', J('quatorze heures et demie', 't:14:30'), 'wrong');
t('9:15 neuf heures et demie 應判錯', J('neuf heures et demie', 't:9:15'), 'wrong');
t('9:45 neuf heures moins le quart 應判錯', J('neuf heures moins le quart', 't:9:45'), 'wrong');
t('9:20 neuf heures vingt', J('neuf heures vingt', 't:9:20'), 'ok');
t('9:05 neuf heures cinq', J('neuf heures cinq', 't:9:05'), 'ok');
t('9:55 dix heures moins cinq（題目不出 :55，略）', 'skip', 'skip');
t('11:40 midi moins vingt', J('midi moins vingt', 't:11:40'), 'ok');
t('9:25 dix heures moins trente-cinq 應判錯', J('dix heures moins trente-cinq', 't:9:25'), 'wrong');
// 整句
t('14:30 à quatorze heures trente', J('à quatorze heures trente', 't:14:30'), 'ok');
t('14:30 il est quatorze heures trente', J('Il est quatorze heures trente', 't:14:30'), 'ok');
t('9:15 il est neuf heures et quart', J('il est neuf heures et quart', 't:9:15'), 'ok');
// 日期
t('1/5 c\'est le premier mai', J("c'est le premier mai", 'D:1/5'), 'ok');
t('1/5 on est le premier mai', J('on est le premier mai', 'D:1/5'), 'ok');
t('14/7 le quatorze Juillet（大寫：numJudge 先轉小寫，提醒在 numEncounter 另外加）', J('le quatorze Juillet', 'D:14/7'), 'ok');
t('1/5 le un mai 應判錯', J('le un mai', 'D:1/5'), 'wrong');
t('問句', ctx.numItem('D:1/5').ask, "C'est quelle date ?");
// 價錢
t('75 soixante-quinze', J('soixante-quinze', 75), 'ok');
t('75 soixante-quinze euros', J('soixante-quinze euros', 75), 'ok');
t('75 ça fait soixante-quinze euros', J('ça fait soixante-quinze euros', 75), 'ok');
t('3 ça fait trois euros（整數區 0–20）', J('ça fait trois euros', 3), 'ok');
t('3,50 trois euros cinquante', J('trois euros cinquante', 'p:3.50'), 'ok');
t('3,50 ça fait trois euros cinquante', J('ça fait trois euros cinquante', 'p:3.50'), 'ok');
t('3,50 trois cinquante（沒說 euros）', J('trois cinquante', 'p:3.50'), 'wrong');
t('75 soixante-seize euros 應判錯', J('soixante-seize euros', 75), 'wrong');
// 年份
t('1999 dix-neuf cent quatre-vingt-dix-neuf', J('dix-neuf cent quatre-vingt-dix-neuf', 1999), 'ok');
t('1999 mille neuf cent quatre-vingt-dix-neuf', J('mille neuf cent quatre-vingt-dix-neuf', 1999), 'ok');
t('1999 en mille neuf cent quatre-vingt-dix-neuf', J('en mille neuf cent quatre-vingt-dix-neuf', 1999), 'ok');
t('1900 dix-neuf cents', J('dix-neuf cents', 1900), 'ok');
t('1980 dix-neuf cent quatre-vingts', J('dix-neuf cent quatre-vingts', 1980), 'ok');
t('1999 mil neuf cent… 仍判錯', J('mil neuf cent quatre-vingt-dix-neuf', 1999), 'wrong');
t('2005 deux mille cinq', J('deux mille cinq', 2005), 'ok');
// 小數
t('2,30 舊 key：deux virgule trois', J('deux virgule trois', 'd:2.30'), 'ok');
t('2,30 舊 key：deux virgule trente', J('deux virgule trente', 'd:2.30'), 'ok');
let zero = 0; for (let i = 0; i < 5000; i++) { const k = ctx.numKindKey('d'); const f = k.split('.')[1]; if (f.length === 2 && +f % 10 === 0) zero++; }
t('小數出題 5000 次尾數 0 的次數', zero, 0);
t('小數問句', ctx.numItem('d:2.5').ask, 'Et ce nombre-là ?');
// 句首剝除不會誤吞數字
t('« a » 不會吞掉 « un »：1 un', J('un', 1), 'ok');
t('en 剝首：« en » 只剝句首', J('quinze en', 15), 'wrong');

// ── 時刻全掃：230 種 key 有幾種「12 小時制口語」現在收得到 ──
let cov = { tot: 0, acc: 0 };
for (let h = 1; h <= 12; h++) for (const m of [15, 30, 45, 40, 50]) { cov.tot++; const I = ctx.numItem('t:' + h + ':' + String(m).padStart(2, '0')); if (I.ans.length > (h === 12 ? 2 : 1)) cov.acc++; }
t('1–12 點的 :15 :30 :45 :40 :50 都有口語說法（60 種）', cov.acc + '/' + cov.tot, '60/60');

// ── 鐵砧 conjNorm ──
const tense = (inf, t) => ctx.drillForms(ctx.VERBS_FULL.find(v => v.inf === inf), t);
const okConj = (typed, inf, t, pi) => { const alts = String(tense(inf, t)[pi]).split('|'); const subj = t === 'subjonctif'; const n = ctx.conjNorm(typed, subj); return alts.some(a => ctx.conjNorm(a) === n) ? 'ok' : 'wrong'; };
t('subj que je sois', okConj('que je sois', 'être', 'subjonctif', 0), 'ok');
t("subj qu'il soit", okConj("qu'il soit", 'être', 'subjonctif', 2), 'ok');
t('subj qu’il soit（彎引號）', okConj('qu’il soit', 'être', 'subjonctif', 2), 'ok');
t("subj que j'aie", okConj("que j'aie", 'avoir', 'subjonctif', 0), 'ok');
t("subj qu'elles aillent", okConj("qu'elles aillent", 'aller', 'subjonctif', 5), 'ok');
t('subj sois（不打 que）', okConj('sois', 'être', 'subjonctif', 0), 'ok');
t('présent que je suis 不放寬', okConj('que je suis', 'être', 'present', 0), 'wrong');
t('subj que je suis 應判錯', okConj('que je suis', 'être', 'subjonctif', 0), 'wrong');
t('pqp elle était allée', okConj('elle était allée', 'aller', 'plus-que-parfait', 2), 'ok');
t('pc elle est venue', okConj('elle est venue', 'venir', 'passe-compose', 2), 'ok');
t('pc il est allé', okConj('il est allé', 'aller', 'passe-compose', 2), 'ok');
t('pc il est allée（⚠️ 放寬：人稱代名詞被剝掉，陽性主詞配陰性也算對）', okConj('il est allée', 'aller', 'passe-compose', 2), 'ok');
t('pc ils sont allés', okConj('ils sont allés', 'aller', 'passe-compose', 5), 'ok');
t('pc avoir 動詞 il a parlé', okConj('il a parlé', 'parler', 'passe-compose', 2), 'ok');
t('pc avoir 動詞 il a parlée 應判錯', okConj('il a parlée', 'parler', 'passe-compose', 2), 'wrong');
// 數一下 être 動詞 il 格現在有幾格收陰性
let ee = 0; ctx.VERBS_FULL.filter(v => v.aux === 'être').forEach(v => ['passe-compose', 'plus-que-parfait'].forEach(tn => { const f = ctx.drillForms(v, tn); if (f && /e$/.test(String(f[2]).split('|')[1] || '')) ee++; }));
out.push('INFO être 動詞數：' + ctx.VERBS_FULL.filter(v => v.aux === 'être').map(v => v.inf).join(',') + '；pc／pqp 的 il 格收 -ée：' + ee + ' 格');

// ── verb_sprint normalize ──
const vsOk = (typed, alt) => ctx.vsNormalize(typed) === ctx.vsNormalize(alt) ? 'ok' : 'wrong';
t('verb_sprint que je sois', vsOk('que je sois', 'sois'), 'ok');
t("verb_sprint qu'il soit", vsOk("qu'il soit", 'soit'), 'ok');
t('verb_sprint qu’il soit（彎引號）', vsOk('qu’il soit', 'soit'), 'ok');
t('verb_sprint j’ai（彎引號）', vsOk('j’ai', 'ai'), 'ok');
t('verb_sprint présent que je suis（⚠️ 所有時態都剝 que）', vsOk('que je suis', 'suis'), 'ok');

console.log(out.join('\n'));
console.log('\n合計 PASS ' + pass + '／FAIL ' + fail);
