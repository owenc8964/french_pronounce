// Q83：模擬 town.html 鐵砧 forgeCells 的權重，看新 24 動詞佔多少、會不會永遠不出（只讀，不寫任何資料）
const fs = require('fs'), vm = require('vm'), path = require('path');
const V = require('../verbs_full.js');
const ctx = {}; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, '../verb_freq.js'), 'utf8') + ';this.VERB_FREQ=VERB_FREQ;', ctx);
const VERB_FREQ = ctx.VERB_FREQ;
const NEW = 'perdre rendre agrandir manger déplacer acheter lever compléter appeler rappeler envoyer payer ennuyer offrir accueillir servir suivre recevoir valoir paraître plaire rire éteindre réduire'.split(' ');
const CONJ_VERBS = ['être','avoir','faire','aller','devoir','pouvoir','vouloir','venir','prendre','savoir','voir'];
console.log('新動詞在 VERB_FREQ 裡的：', NEW.filter(v => VERB_FREQ[v]).map(v => v + JSON.stringify(VERB_FREQ[v].t)).join(' ; ') || '（沒有）');
const oldInVF = V.VERBS_FULL.filter(v => !NEW.includes(v.inf) && !VERB_FREQ[v.inf]).map(v => v.inf);
console.log('舊動詞不在 VERB_FREQ（11-25 改動前回傳 1、改動後 .5）：', oldInVF.join(', ') || '（沒有）');
function corpusNew(inf, t) { const f = VERB_FREQ[inf]; if (!f) return .5; const n = (f.t && f.t[t]) || 0; return n >= 100 ? 3 : n >= 20 ? 2 : n > 0 ? 1.5 : .5; }
function corpusOld(inf, t) { const f = VERB_FREQ[inf]; if (!f) return 1; const n = (f.t && f.t[t]) || 0; return n >= 100 ? 3 : n >= 20 ? 2 : n > 0 ? 1.5 : .5; }
const tenses = ['present','passe-compose','imparfait','futur-simple','conditionnel','subjonctif','plus-que-parfait'];
const verbs = V.VERBS_FULL.filter(v => v.inf !== 'falloir' && v.inf !== 'pleuvoir');
for (const t of tenses) {
  for (const [label, fn] of [['改後', corpusNew], ['改前', corpusOld]]) {
    let tot = 0, nw = 0, minNew = 1e9;
    for (const v of verbs) { const f = V.drillForms(v, t); if (!f) continue;
      for (let pi = 0; pi < 6; pi++) { if (!f[pi]) continue; const w = 3 * fn(v.inf, t) * (CONJ_VERBS.includes(v.inf) ? 1.6 : 1); tot += w; if (NEW.includes(v.inf)) { nw += w; minNew = Math.min(minNew, w); } } }
    console.log(t.padEnd(17), label, '新24動詞佔', (100 * nw / tot).toFixed(1) + '%', ' 單格最小機率', (100 * minNew / tot).toFixed(3) + '%');
  }
}
// 狀態權重差異：已反射(.4) 的舊格 vs 新格(new=3)
console.log('提醒：新格狀態 new 權重 3、舊格若已 reflex 只有 .4 → 實際上新格比例會高於上表（上表假設全部 new）');
// quest 填表 tenseTable：只取 A1/A2、非無人稱
const qv = V.VERBS_FULL.filter(v => !v.imperso && (v.lvl === 'A1' || v.lvl === 'A2'));
console.log('quest 填表池：', qv.length, '個，其中新動詞', qv.filter(v => NEW.includes(v.inf)).map(v => v.inf).join(', '));
console.log('B1 新動詞（quest 填表永遠不出）：', V.VERBS_FULL.filter(v => NEW.includes(v.inf) && v.lvl !== 'A1' && v.lvl !== 'A2').map(v => v.inf).join(', '));
