// Q45：35 題 tcf-phrases 的文法標記與詞彙，在 french_notes.html 出現幾次（唯讀）
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const root = path.join(__dirname, '..');
const src = fs.readFileSync(path.join(root, 'questions.js'), 'utf8');
const ctx = {};
vm.createContext(ctx);
vm.runInContext(src.replace(/^const BANK\s*=/m, 'var BANK ='), ctx);
const items = ctx.BANK.filter(q => q.topic === 'tcf-phrases');
console.log('題數', items.length, '；BANK 總數', ctx.BANK.length, '；第一題 index', ctx.BANK.indexOf(items[0]));

const html = fs.readFileSync(path.join(root, 'french_notes.html'), 'utf8');
// 依 lesson-N 切段，記每個片語第一次出現在哪課
const parts = html.split(/id="lesson-(\d+)"/);
const byLesson = []; // [lessonNo, text]
for (let i = 1; i < parts.length; i += 2) byLesson.push([+parts[i], parts[i + 1].replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/[’]/g, "'").toLowerCase()]);
const all = byLesson.map(x => x[1]).join(' ');
function where(k) {
  const nk = k.toLowerCase().replace(/[’]/g, "'");
  const ls = byLesson.filter(x => x[1].includes(nk)).map(x => x[0]);
  return ls.length ? '第' + ls.slice(0, 6).join('、') + (ls.length > 6 ? '…' : '') + '課' : '✗ 筆記沒有';
}
const markers = ['subjonctif', 'bien que', "bien qu'", 'malgré', 'pourtant', 'même si', 'il faut que', 'il faudrait que', 'pour que', 'conditionnel', 'on pourrait', 'tu pourrais', "j'aimerais", 'ce serait', 'il est possible que', 'il est probable que', 'je doute que', 'douter', 'je ne pense pas que', 'je ne crois pas que', 'je souhaite que', "j'espère que", 'convaincu', 'soit', 'ait', 'puisse', 'fasse', 'vienne', 'subjonctif passé', 'ait été'];
console.log('\n== 文法標記');
for (const m of markers) console.log('  ' + m.padEnd(22) + where(m));

console.log('\n== 各題詞彙（筆記裡找不到的字）');
const stop = new Set('le la les un une des de du d l à au aux et en ne pas que qu il elle on nous vous ils elles je j tu ce c se s son sa ses ma mon mes ta ton tes leur leurs notre nos votre vos lui y est a pour par avec dans sur très plus bien si même cela ça qui'.split(' '));
items.forEach((q, i) => {
  const words = (q.q + ' ' + q.a).toLowerCase().replace(/[’]/g, "'").replace(/\([^)]*\)/g, ' ').split(/[^a-zàâçéèêëîïôûùüÿœæ'-]+/).flatMap(w => w.split("'")).filter(w => w.length > 2 && !stop.has(w));
  const miss = [...new Set(words)].filter(w => !new RegExp('(^|[^a-zàâçéèêëîïôûùüÿœæ])' + w.replace(/[-]/g, '\\-') + '([^a-zàâçéèêëîïôûùüÿœæ]|$)').test(all));
  console.log(String(i + 1).padStart(2) + '. ' + q.q.slice(0, 60) + '\n     缺：' + (miss.join(', ') || '（全在）'));
});
