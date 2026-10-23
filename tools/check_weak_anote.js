// 列出 questions.js 裡「只是把答案重寫一次」的弱解說（aNote）
// 判準與 town.html 的 noteWeak 相同：清掉「Corrigés：…。」後中文少於 6 字
// 用法：node tools/check_weak_anote.js [--all] [--topic=xxx] [--json]
(function () {
const fs = require('fs'), vm = require('vm'), path = require('path');
const src = fs.readFileSync(path.join(__dirname, '..', 'questions.js'), 'utf8');
const ctx = {}; vm.createContext(ctx);
vm.runInContext(src + '\n;this.BANK=BANK;', ctx);
const BANK = ctx.BANK;

const CONJ = new Set(['er-verbs','ir-re-verbs','irregular-verbs-3rd-group','etre-avoir','reflexive-verbs',
  'passe-compose','imparfait','futur-simple','conditionnel-present','subjonctif-present']);
const clean = n => String(n||'').replace(/^\s*Corrigés\s*[：:][^。]*。?\s*/,'').replace(/\s*Corrigés\s*[：:][^。]*。?/g,'').trim();
const weak = n => (String(n).match(/[一-鿿]/g)||[]).length < 6;
// 純變位題：topic 在變位類，且題幹有「(原形)」提示 → town.html 會自動列六個人稱
const pureConj = q => CONJ.has(q.topic) && /\(\s*[a-zàâçéèêëîïôûùüÿœ' ]+\s*\)/i.test(q.q);

const args = process.argv.slice(2), all = args.includes('--all'), asJson = args.includes('--json');
const tArg = (args.find(a => a.startsWith('--topic=')) || '').slice(8);
const rows = [];
BANK.forEach((q, i) => {
  if (q.type !== 'choose' && q.type !== 'fill') return;
  if (!weak(clean(q.aNote))) return;
  const conj = pureConj(q);
  if (conj && !all) return;
  if (tArg && q.topic !== tArg) return;
  rows.push({ i, topic: q.topic, type: q.type, conj, q: q.q, a: q.a, aNote: q.aNote || '' });
});
if (asJson) { fs.writeSync(1, JSON.stringify(rows, null, 1) + '\n'); return; }
const by = {};
rows.forEach(r => (by[r.topic] = by[r.topic] || []).push(r));
const total = BANK.filter(q => q.type === 'choose' || q.type === 'fill').length;
const allWeak = BANK.filter(q => (q.type === 'choose' || q.type === 'fill') && weak(clean(q.aNote)));
console.log(`choose＋fill ${total} 題；弱解說共 ${allWeak.length} 題（其中純變位 ${allWeak.filter(pureConj).length}、非純變位 ${allWeak.filter(q => !pureConj(q)).length}）`);
console.log(all ? '（--all：含純變位題）' : '以下只列非純變位題（加 --all 看全部）');
Object.entries(by).sort((a, b) => b[1].length - a[1].length).forEach(([t, rs]) => {
  console.log(`\n■ ${t}（${rs.length}）`);
  if (tArg || args.includes('-v')) rs.forEach(r => console.log(`  #${r.i} [${r.type}] ${r.q}  → ${r.a}  ｜ ${r.aNote}`));
});
})();
