// Q84 只讀：🔊 會念的「片語」文字裡，有沒有語音引擎念不好的符號／縮寫（qqch、/、括號、…）
// 跑法：node tools/tmp_q84_say_scan.js
const fs = require('fs'), path = require('path'), vm = require('vm');
const R = path.join(__dirname, '..');
const win = {}; const ctx = { window: win, console }; ctx.self = win; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(R, 'tcf_phrases.js'), 'utf8'), ctx);
const P = win.TCF_PHRASES || ctx.TCF_PHRASES;
const BAD = /qqch|qqn|\bqn\b|\bqch\b|\bsth\b|\bsb\b|[\/()\[\]+…=]|\.\.\.|\binf\b|\bX\b/i;
const list = (P && P.LIST) || [];
console.log('tcf_phrases.js 片語數', list.length);
const hit = list.filter(e => BAD.test(e.fr));
console.log('有怪符號的', hit.length); hit.slice(0, 40).forEach(e => console.log('  ', e.fr, '｜', e.zh));
// 這題自己的片語（ctx/*.js 的第三個參數）
const CTX = {}; win.TCF_CTX_LOAD = ctx.TCF_CTX_LOAD = (id, d, ph) => { CTX[id] = ph || {}; };
const dir = path.join(R, 'assets/tcf/exam/ctx');
fs.readdirSync(dir).filter(f => f.endsWith('.js')).forEach(f => vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), ctx));
let n = 0, bad = [];
for (const id in CTX) for (const q in CTX[id]) for (const x of CTX[id][q]) { n++; if (BAD.test(x[2])) bad.push(`${id} Q${q}：${x[2]}｜${x[3]}`); }
console.log('這題片語（ctx）共', n, '條，有怪符號的', bad.length); bad.slice(0, 40).forEach(s => console.log('  ' + s));
