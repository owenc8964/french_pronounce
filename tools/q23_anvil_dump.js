/* Q23（2026-10-29）鐵砧變位資料核對：唯讀抽資料，不寫任何 clb7_*、不改既有檔
 * 用法：node tools/q23_anvil_dump.js
 * ① 照 town.html forgeVerbs()／conjModes() 的範圍，印出 drillForms 每一格（含 town.html withPron／forgeSay 的顯示）
 * ② 用 town.html conjNorm() 的同一條正規化，模擬幾種「標準法文正確、但可能被判錯」的輸入 */
const path = require('path');
const { VERBS_FULL, drillForms } = require(path.join(__dirname, '..', 'verbs_full.js'));

const TENSES = ['present', 'passe-compose', 'imparfait', 'futur-simple', 'conditionnel', 'subjonctif', 'plus-que-parfait'];
const P = ['je', 'tu', 'il', 'nous', 'vous', 'ils'];
const verbs = VERBS_FULL.filter(v => v.inf !== 'falloir' && v.inf !== 'pleuvoir');   // = town.html forgeVerbs()

// ⬇ 逐字照抄 town.html 的三個函式（line 1125、1126、1174）
function conjNorm(s){ return String(s).toLowerCase().trim().replace(/[’]/g,"'").normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/^(j|je|tu|il|elle|on|nous|vous|ils|elles)['\s]+/,'').replace(/\s+/g,''); }
function withPron(pi, form){ return (pi===0 && /^[aeiouâàéèêëîïôöûüùh]/i.test(form)) ? "j'"+form : ['je','tu','il','nous','vous','ils'][pi]+' '+form; }
function forgeSay(tense, pi, form){ const s=withPron(pi, form); if(tense!=='subjonctif') return s; return (/^[aeiouh]/i.test(s)?"qu'":"que ")+s; }
const accepts = (alts, input) => alts.some(a => conjNorm(a) === conjNorm(input));

let cells = 0;
const mode = process.argv[2] || 'dump';
if (mode === 'dump') {
  for (const t of TENSES) {
    console.log('\n## ' + t);
    for (const v of verbs) {
      const fs = drillForms(v, t);
      if (!fs) { console.log(v.inf + ': (null)'); continue; }
      console.log(v.inf.padEnd(10) + ' ' + fs.map((f, i) => forgeSay(t, i, String(f).split('|')[0]) + (String(f).includes('|') ? ' [' + f + ']' : '')).join(' ／ '));
      cells += fs.filter(Boolean).length;
    }
  }
  console.log('\n總格數：' + cells);
}

if (mode === 'probe') {
  const etreVerbs = verbs.filter(v => v.aux === 'être');
  const out = [];
  for (const v of etreVerbs) for (const t of ['passe-compose', 'plus-que-parfait']) {
    const alts = String(drillForms(v, t)[2]).split('|');
    const fem = 'elle ' + alts[0] + 'e';
    out.push(`${v.inf} ${t} il/elle：題目接受 [${alts.join('|')}]；輸入「${fem}」→ ${accepts(alts, fem) ? '✓ 接受' : '✗ 判錯'}`);
  }
  // subjonctif：打「que je …」「qu'il …」
  for (const inf of ['être', 'avoir', 'aller', 'faire']) {
    const v = verbs.find(x => x.inf === inf), fs = drillForms(v, 'subjonctif');
    for (const pi of [0, 2]) {
      const alts = String(fs[pi]).split('|'), typed = forgeSay('subjonctif', pi, alts[0]);
      out.push(`${inf} subjonctif ${P[pi]}：輸入「${typed}」→ ${accepts(alts, typed) ? '✓ 接受' : '✗ 判錯'}；輸入「${withPron(pi, alts[0])}」→ ${accepts(alts, withPron(pi, alts[0])) ? '✓' : '✗'}`);
    }
  }
  // 選擇題干擾項會不會跟正解同形（同動詞同人稱別時態）
  let clash = 0;
  for (const v of verbs) for (const t of TENSES) { const fs = drillForms(v, t); for (let pi = 0; pi < 6; pi++) {
    for (const t2 of TENSES) { if (t2 === t) continue; const o = String(drillForms(v, t2)[pi]).split('|')[0];
      if (conjNorm(o) === conjNorm(String(fs[pi]).split('|')[0])) clash++; } } }
  out.push('跨時態同形（選擇題會被 seen 去重，不會出現兩個正解按鈕）：' + clash + ' 組');
  console.log(out.join('\n'));
}
