// Q39：找出 10-30 commit 09d0cc8 新增的題目。只讀不改。
// 用法：node tools/tmp_q39_extract.js <q_before.js> <q_after.js> <current questions.js> <輸出 json>
const fs = require('fs'), vm = require('vm');
function load(p) {
  const src = fs.readFileSync(p, 'utf8') + '\n;globalThis.__BANK = BANK;';
  const ctx = {}; vm.createContext(ctx);
  // 題庫檔可能碰 window/document，給空殼
  ctx.window = ctx; ctx.document = { addEventListener(){}, getElementById(){return null;} };
  vm.runInContext(src, ctx);
  return ctx.__BANK;
}
const [before, after, cur, out] = process.argv.slice(2);
const B = load(before), A = load(after), C = load(cur);
const key = q => JSON.stringify([q.topic, q.type, q.q, q.a, q.opts || null]);
const bset = new Set(B.map(key));
const added = A.filter(q => !bset.has(key(q)));
const cset = new Set(C.map(key));
console.log('before', B.length, 'after', A.length, 'current', C.length, 'added', added.length);
const still = added.filter(q => cset.has(key(q)));
console.log('added still in current exact', still.length);
const lessons = {}; added.forEach(q => { lessons[q.lesson] = (lessons[q.lesson] || 0) + 1; });
console.log('lessons', JSON.stringify(lessons));
const types = {}; added.forEach(q => { types[q.type] = (types[q.type] || 0) + 1; });
console.log('types', JSON.stringify(types));
// 依 hint 字首分來源
const src = {};
added.forEach(q => { const h = (q.hint||'') ; const m = h.match(/(Cahier\s*[AB]\d|Édito\s*[AB]\d|課本\s*[AB]\d|[AB]\d\s*課本|[AB]\d\s*練習本|p\.)/); const k = m ? m[1] : 'NONE'; src[k] = (src[k]||0)+1; });
console.log('hintSrc', JSON.stringify(src));
console.log(JSON.stringify(added.slice(0,3),null,0));
console.log(JSON.stringify(added.slice(-3),null,0));
fs.writeFileSync(out, JSON.stringify(added, null, 0));
