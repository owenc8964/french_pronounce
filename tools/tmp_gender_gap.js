// D6 盤點：每課筆記有多少「可長 gender 題」的名詞來源、題庫已有幾題 gender
// 用法：node tools/tmp_gender_gap.js
const fs = require('fs');
const html = fs.readFileSync(__dirname + '/../french_notes.html', 'utf8');
const qs = fs.readFileSync(__dirname + '/../questions.js', 'utf8');

const parts = html.split(/<details class="lesson-group" id="lesson-(\d+)"/);
const byLesson = {};
for (let i = 1; i < parts.length; i += 2) byLesson[+parts[i]] = parts[i + 1];

const strip = s => s.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();

for (let n = 1; n <= 36; n++) {
  const body = byLesson[n] || '';
  const tables = (body.match(/<table/g) || []).length;
  const rows = body.split(/<tr>/).slice(1).map(r => {
    const cells = [...r.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map(m => strip(m[1]));
    return cells;
  }).filter(c => c.length);
  // 名詞來源：詞性欄寫 n.m./n.f.，或法文欄以 le/la/un/une 開頭（不含 l'／les，那兩個看不出性別），或標 (m.)/(f.)
  const nouns = [];
  for (const c of rows) {
    const fr = c[0] || '';
    const all = c.join(' | ');
    let g = null;
    if (/\bn\.\s?m\b|\(m\.?\)/.test(all)) g = 'm';
    else if (/\bn\.\s?f\b|\(f\.?\)/.test(all)) g = 'f';
    else if (/^(le|un) [a-zà-ÿ]/i.test(fr)) g = 'm';
    else if (/^(la|une) [a-zà-ÿ]/i.test(fr)) g = 'f';
    if (g) nouns.push(g + ':' + fr.slice(0, 40));
  }
  const gq = (qs.match(new RegExp("lesson:" + n + ", topic:'[^']*', type:'gender'", 'g')) || []).length;
  const opaque = nouns.filter(x => /^[mf]:(l'|les )/i.test(x)).length;
  console.log(`L${n}\ttables=${tables}\tnounRows=${nouns.length}\tgenderQ=${gq}\t` + nouns.slice(0, 60).join(' ; '));
}
