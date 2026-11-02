// 一次性（R82）：統計口說卡目前版本裡「句子開頭的連接詞」分布，規則照 town.html ISLE_CONN
const fs = require('fs'), vm = require('vm');
const ctx = {}; vm.createContext(ctx);
vm.runInContext(fs.readFileSync('answer_cards.js', 'utf8') + ';this.AC=ANSWER_CARDS;', ctx);
const CONN = /^(d'abord|ensuite|enfin|mais|et|alors|quand|aussi|parce que|donc|pour moi|puis|sinon|car|surtout|même si|le plus important)\b/i;
const total = {}; let sents = 0, joined = 0;
ctx.AC.forEach(c => {
  const v = c.versions[c.versions.length - 1];
  const S = String(v.fr).split(/(?<=[.!?])\s+/).filter(Boolean);
  const hit = {};
  S.forEach(s => {
    sents++;
    const m = s.replace(/^[«"\s]+/, '').match(CONN);
    if (m) { joined++; const w = m[1].toLowerCase(); hit[w] = (hit[w] || 0) + 1; total[w] = (total[w] || 0) + 1; }
  });
  console.log(c.id, 'level', v.level, 'sents', S.length, JSON.stringify(hit));
});
console.log('TOTAL sents', sents, 'with initial connector', joined, JSON.stringify(total));
// 整句任何位置（只看 A2 以上那幾張，A1 短版另計）
const ANY = ['et', 'mais', 'parce que', 'donc', 'alors', 'car', 'même si', 'pourtant', 'cependant', 'par contre', 'en plus', "d'ailleurs", 'par exemple', "c'est pourquoi", 'puis', 'ensuite', 'enfin', "d'abord", 'aussi', 'surtout', 'quand'];
const big = ctx.AC.filter(c => c.versions[c.versions.length - 1].level !== 'A1');
const any = {}; let words = 0;
big.forEach(c => {
  const t = ' ' + c.versions[c.versions.length - 1].fr.toLowerCase().replace(/’/g, "'").replace(/parce qu'/g, 'parce que ').replace(/[.,;:!?«»"—]/g, ' ').replace(/\s+/g, ' ').trim() + ' ';
  words += t.trim().split(/\s+/).length;
  ANY.forEach(w => { const n = t.split(' ' + w + ' ').length - 1; if (n) any[w] = (any[w] || 0) + n; });
});
console.log('A2 cards', big.length, 'words', words, JSON.stringify(any));
