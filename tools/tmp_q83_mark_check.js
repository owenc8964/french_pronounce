// Q83：照抄 verb_forms.html cellMark() 現在式那段邏輯（第 956-967 行），看新 24 動詞的 ⚠️ 標記落在哪幾格（只讀）
const V = require('../verbs_full.js');
const NEW = 'perdre rendre agrandir manger déplacer acheter lever compléter appeler rappeler envoyer payer ennuyer offrir accueillir servir suivre recevoir valoir paraître plaire rire éteindre réduire'.split(' ');
const stemNous = v => v.pres[3].replace(/ons$/, ''), stemIls = v => v.pres[5].replace(/ent$/, '');
const P = ['je','tu','il','nous','vous','ils'];
for (const inf of NEW) {
  const v = V.VERBS_FULL.find(x => x.inf === inf);
  if (v.grp === '規則樣本') { console.log(inf.padEnd(11), '（規則樣本，不標）'); continue; }
  const marks = v.pres.map((f, i) => {
    if (!f.startsWith(stemNous(v))) return '詞幹變了';
    if (i === 5 && stemIls(v) !== stemNous(v)) return 'ils 詞幹變了';
    if (i === 4 && !/ez$/.test(f)) return '不是 -ez';
    if (i === 5 && !/ent$/.test(f)) return '不是 -ent';
    return '';
  });
  console.log(inf.padEnd(11), v.pres.map((f, i) => P[i] + ' ' + f + (marks[i] ? '【' + marks[i] + '】' : '')).join('  '));
}
