// Q83：列出 b1688e3 新增 24 動詞的全部變位格（只讀 verbs_full.js，不寫任何資料）
const V = require('../verbs_full.js');
const L = 'perdre rendre agrandir manger déplacer acheter lever compléter appeler rappeler envoyer payer ennuyer offrir accueillir servir suivre recevoir valoir paraître plaire rire éteindre réduire'.split(' ');
for (const inf of L) {
  const v = V.VERBS_FULL.find(x => x.inf === inf);
  if (!v) { console.log('MISSING', inf); continue; }
  console.log('=== ' + inf + ' [' + v.grp + '/' + v.lvl + '] aux=' + v.aux);
  for (const t of V.conjugate(v)) console.log(' ' + t.id.padEnd(19) + t.forms.join(', '));
  for (const n of V.nonFinite(v)) console.log(' ' + n.fr.padEnd(19) + n.form);
  console.log(' stems: ' + V.stems(v).map(s => s.key + '=' + s.val).join(' | '));
  const imp = V.conjugate(v).find(t => t.id === 'imparfait');
  console.log(' how-imp: ' + imp.how);
}
console.log('total', V.VERBS_FULL.length);
console.log('groups', [...new Set(V.VERBS_FULL.map(v => v.grp))].join(' / '));
