// Q46（11-11 排程）：passages_b1.json 每段 lines 的字數 vs 逐字稿字數——抓「講話人誤判把開頭整段丟掉」的軌。唯讀。
// 原因：didier_passage.py lines_of() 用 re.split，turns[0]（第一個「名字 :」之前的文字）會被丟掉；
//       11-10 新 regex 允許「大寫字＋一個小寫字」，「Conseil suivant :」「Il dit :」「Jura bernois :」被當成講話人。
const P = require('../assets/didier/passages_b1.json');
const T = require('../assets/didier/transcripts_b1.json');
const wc = s => String(s || '').split(/\s+/).filter(Boolean).length;
const rows = P.map(p => { const a = p.lines.reduce((n, l) => n + wc(l.text), 0), b = wc(T[String(p.track)].text); return { t: p.track, u: p.unit, a, b, r: a / b, spk: [...new Set(p.lines.map(l => l.spk))].join('/') }; });
rows.sort((x, y) => x.r - y.r);
rows.slice(0, 15).forEach(x => console.log(`t${x.t} unit${x.u} 台詞字數 ${x.a}/${x.b} = ${(x.r * 100).toFixed(0)}%  講話人：${x.spk}`));
