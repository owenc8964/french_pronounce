// Q89 只讀預覽：模考閱讀選項中文（opts_zh）修正草稿 — ⛔ 不寫任何檔，只印到 stdout
// 跑法：node tools/tmp_q89_option_zh_fix_preview.js          ← 摘要＋逐格清單
//       node tools/tmp_q89_option_zh_fix_preview.js --md     ← 逐格清單印成 markdown 表格（草稿用）
// 依據：research/2026-11-26_模考閱讀選項中文抽查.md（Q85）
// 修法只動 opts_zh 字串內容（以及 12 格法文 opts 尾巴的 Correctanswer），不動 answer、不動陣列順序與長度 → 最後有自檢
const fs = require('fs'), path = require('path');
const P = path.join(__dirname, '..', 'assets/tcf/exam/reading.json');
const D = JSON.parse(fs.readFileSync(P, 'utf8'));
const MD = process.argv.includes('--md');
const L = 'ABCD';

// ── 可自動修：規則（簡轉繁詞組替換錯）。fr＝法文選項要含這個字才換，避免誤傷正常用法
const RULES = [
  { from: '計程車氣', to: '士氣' },
  { from: '新增物', to: '添加物' },
  { from: '新增', to: '添加', fr: /ajout/i },
  { from: '擴充套件', to: '擴大', fr: /élargir|développer/i },
  { from: '擴充套件', to: '擴展', fr: /expansion/i },
  { from: '檔案', to: '文件', fr: /document|dossier|textes officiels/i },
  { from: '數字', to: '數位', fr: /numérique/i },
  { from: '選單', to: '菜單', fr: /menu/i },
  { from: '支援', to: '支持', fr: /soutien|soutenir|soutient|miller/i },   // miller＝militer 的辨識錯字（ce_32 Q21 C）
  { from: '連線', to: '連接', fr: /reliés/i },
  { from: '連線', to: '連通', fr: /rallier/i },
  { from: '信息', to: '資訊' },
  { from: '型別', to: '類型' },
  { from: '影象', to: '影像' },
  { from: '心智慧力', to: '心智能力' },
  { from: '計算機', to: '電腦', fr: /informati/i },
  { from: '裝置', to: '設備', fr: /matériel|équipement/i },
  { from: '儲存', to: '保存', fr: /conserv|préserv/i },
  { from: '社群', to: '社區', fr: /quartier/i },
  { from: '觸摸屏', to: '觸控螢幕' },
  { from: '觸控屏', to: '觸控螢幕' },
  { from: '刮花', to: '刮傷' },
  { from: '網絡', to: '網路' },
  { from: '調查物件', to: '調查對象' },
];

// ── 可自動修：逐格指定（被切掉的人名／數字照法文補回、截掉混進來的解析；不涉及譯法判斷）
const CELL_AUTO = {
  'ce_19:5:A': ['Adrien 的朋友', '人名被切'], 'ce_19:5:B': ['Adrien 的家人', '人名被切'],
  'ce_19:5:C': ['Adrien 的醫生', '人名被切'], 'ce_19:5:D': ['Adrien 的鄰居', '人名被切'],
  'ce_17:31:A': ['Amélie 最近搬家了', '人名被切＋混進解析'],
  'ce_17:31:C': ['Florence 工作很多', '人名被切＋混進解析（⚠️洩題）'],
  'ce_17:31:D': ['Florence 喜歡海邊', '人名被切＋混進解析'],
  'ce_23:16:B': ['20 世紀初畫家的作品', '數字被切'],
  'ce_23:23:C': ['因為幼蟲吃得很多', '混進解析（⚠️洩題）'],
};

// ── 要人工看：要判斷譯法或要不要留空（只列建議，不自動套）
const PRICE = '選項只是價錢，現在放的是解析', CITY = '選項只是城市名，現在放的是解析';
const SUPPORT = 'Fournir un support：同題各套譯法不一（提供媒材或支援／支援材料／支援），要看原文';
const MENU = '自動規則已改成「菜單」；法國餐廳 menu 多指套餐';
const CELL_MANUAL = {
  'ce_12:2:A': ['9 歐元（或留空）', PRICE], 'ce_12:2:B': ['12.5 歐元（或留空）', PRICE],
  'ce_12:2:C': ['16 歐元（或留空）', PRICE + '（⚠️現在寫「附礦泉水和咖啡」洩題）'], 'ce_12:2:D': ['20 歐元（或留空）', PRICE],
  'ce_13:15:A': ['留空', CITY], 'ce_13:15:B': ['留空', CITY],
  'ce_13:15:C': ['留空', CITY + '（⚠️現在寫「現在就在那裡」洩題）'], 'ce_13:15:D': ['留空', CITY],
  'ce_33:2:B': ['索取活動表', 'programme＝節目表／活動表，不是專案'],
  'ce_33:22:B': ['談起一則社會新聞', 'fait divers＝社會版小新聞'],
  'ce_39:25:D': ['付款錯誤', '「的宣告」是多出來的（règlement＝付款）'],
  'ce_33:13:A': ['談論個人優點', 'qualités personnelles；「個人品質」在中文偏「人品」'],
  'ce_36:18:B': ['報名手續指南', 'démarches＝手續；「程式」是「程序」轉錯'],
  'ce_1s:21:C': ['參與社團活動', 'vie associative＝協會／社團生活，不是「社群」'],
  'ce_42:21:C': ['參與社團活動', 'vie associative＝協會／社團生活，不是「社群」'],
  'ce_25:32:D': ['渴望過群體生活（未查證，要看原文）', 'communauté：社區／群體／共同體看上下文'],
  'ce_36:38:D': ['重新帶動特定街區的夜間人潮（未查證）', 'fréquentation＝來客量，不是「訪問」；quartiers réservés 指哪種街區要看原文'],
  'ce_41:16:B': ['來一趟特別的參觀', 'visite＝參觀；另有「翻譯：」前綴（自動規則會先去掉）'],
  'ce_24:22:C': ['未查證', SUPPORT],
  'ce_25:22:C': ['未查證', SUPPORT], 'ce_27:22:C': ['未查證', SUPPORT], 'ce_29:23:C': ['未查證', SUPPORT],
  'ce_33:22:C': ['未查證', SUPPORT], 'ce_37:22:C': ['未查證', SUPPORT], 'ce_38:23:C': ['未查證', SUPPORT],
  'ce_26:27:A': ['讓人認識道地的旅遊地點', 'Q85 △：faire découvrir 是「讓別人」發現'],
  'ce_26:27:D': ['把利潤撥給協會', 'Q85 △'],
  'ce_38:11:B': ['提議和自己的女伴一起去看他（未查證語氣）', 'Q85 △：son amie 是寫信人自己的女伴'],
  'ce_42:19:C': ['客戶買票時選錯了', 'Q85 △：「目的地」是解析補的，選項沒寫'],
  'ce_39:24:D': ['套餐的價格（可選）', MENU],
  'ce_33:1:D': ['推出套餐（可選）', MENU],
};

const out = { prefix: [], rule: [], quote: [], cellAuto: [], ca: [], manual: [] };
const ruleHits = {}; let optZhSame = 0;
const before = JSON.stringify(D.tests.map(t => t.questions.map(q => [q.q, q.answer, (q.opts || []).length, (q.opts_zh || []).length])));
const C = JSON.parse(JSON.stringify(D));   // 只在記憶體裡改副本
for (const t of C.tests) for (const q of t.questions) {
  const z = q.opts_zh;
  (q.opts || []).forEach((o, i) => {
    const key = `${t.id}:${q.q}:${L[i]}`, isAns = q.answer === L[i] ? '（正解）' : '';
    // 法文選項尾巴的 Correctanswer
    if (/\s*Correct\s*answer\s*$/i.test(o)) { const n = o.replace(/\s*Correct\s*answer\s*$/i, ''); out.ca.push([key, o, n, `答案是 ${q.answer}，這格是錯的選項`]); q.opts[i] = n; }
    if (!z || !z[i]) return;
    let s = z[i];
    const s0 = s;
    if (/^(翻譯|譯)[:：]\s*/.test(s)) { s = s.replace(/^(翻譯|譯)[:：]\s*/, ''); out.prefix.push([key + isAns, s0, s]); }
    if (CELL_AUTO[key]) { out.cellAuto.push([key + isAns, s0, CELL_AUTO[key][0], CELL_AUTO[key][1]]); s = CELL_AUTO[key][0]; }
    else if (!s.includes('「') && s.includes('」')) { const n = s.split('」')[0]; out.quote.push([key + isAns, s0, n]); s = n; }
    const sr = s;
    for (const r of RULES) if (s.includes(r.from) && (!r.fr || r.fr.test(o))) {
      s = s.split(r.from).join(r.to); ruleHits[r.from + '→' + r.to] = (ruleHits[r.from + '→' + r.to] || 0) + 1;
      if ((q.opt_zh || '').includes(r.from)) optZhSame++;
    }
    if (s !== sr) out.rule.push([key + isAns, o, sr, s]);
    if (CELL_MANUAL[key]) out.manual.push([key + isAns, o, s, CELL_MANUAL[key][0], CELL_MANUAL[key][1]]);
    z[i] = s;
  });
}
// 自檢：answer／題號／陣列長度一格都沒變；法文 opts 只有 Correctanswer 那 12 格變
const after = JSON.stringify(C.tests.map(t => t.questions.map(q => [q.q, q.answer, (q.opts || []).length, (q.opts_zh || []).length])));
let optsChanged = 0, zhChanged = 0, zhMoved = 0;
D.tests.forEach((t, a) => t.questions.forEach((q, b) => {
  const q2 = C.tests[a].questions[b];
  (q.opts || []).forEach((o, i) => { if (o !== q2.opts[i]) optsChanged++; });
  (q.opts_zh || []).forEach((s, i) => { if (s !== q2.opts_zh[i]) { zhChanged++; if (!s !== !q2.opts_zh[i]) zhMoved++; } });
}));
let leftPrefix = 0; for (const t of C.tests) for (const q of t.questions) (q.opts_zh || []).forEach(s => { if (/^(翻譯|譯)[:：]/.test(s || '')) leftPrefix++; });
// opts_tok：Correctanswer 那格的 token 長什麼樣（決定要不要重標）
const tokPeek = [];
for (const t of D.tests) for (const q of t.questions) (q.opts || []).forEach((o, i) => {
  if (/correct\s*answer/i.test(o) && q.opts_tok) {
    const tk = q.opts_tok[i], newLen = o.replace(/\s*Correct\s*answer\s*$/i, '').length;
    const drop = Array.isArray(tk) ? tk.filter(x => x[0] >= newLen) : [], keepOver = Array.isArray(tk) ? tk.filter(x => x[0] < newLen && x[1] > newLen) : [];
    tokPeek.push(`${t.id}:${q.q}:${L[i]} 要拿掉的 token ${drop.length} 個 ${JSON.stringify(drop)}；跨界 token ${keepOver.length} 個`);
  }
});

const cell = s => String(s == null ? '' : s).replace(/\|/g, '｜').replace(/\n/g, ' ');
function show(title, rows, head) {
  console.log(`\n### ${title}（${rows.length} 格）\n`);
  if (MD) { console.log('| ' + head.join(' | ') + ' |'); console.log('|' + head.map(() => '---').join('|') + '|'); rows.forEach(r => console.log('| ' + r.map(cell).join(' | ') + ' |')); }
  else rows.forEach(r => console.log('  ' + r.map(cell).join('  ⇒  ')));
}
console.log(`題數 ${D.tests.reduce((n, t) => n + t.questions.length, 0)}；預覽後 opts_zh 改動 ${zhChanged} 格（其中空↔非空 ${zhMoved}）、法文 opts 改動 ${optsChanged} 格`);
console.log(`自檢：題號／answer／選項數 ${before === after ? '一致 ✓（正解字母 0 處改變）' : '⚠️ 不一致'}；改完還帶「翻譯：」前綴 ${leftPrefix} 格`);
console.log('規則命中：', JSON.stringify(ruleHits));
console.log(`規則改到的詞在同題解析 opt_zh 裡也出現：${optZhSame} 次（解析要一起修，否則「選項分析」跟「這個選項」不一致）`);
show('A1 去「翻譯：」前綴', out.prefix, ['位置', '現在', '改成']);
show('A2 去單邊引號 」（含接進來的解析）', out.quote, ['位置', '現在', '改成']);
show('A3 簡轉繁用語錯（規則）', out.rule, ['位置', '法文選項', '現在', '改成']);
show('A4 逐格指定（人名／數字被切、混進解析）', out.cellAuto, ['位置', '現在', '改成', '原因']);
show('A5 法文選項尾巴 Correctanswer', out.ca, ['位置', '現在', '改成', '說明']);
show('B 要人工看', out.manual, ['位置', '法文選項', '套完自動規則後', '建議', '理由']);
console.log(`\nopts_tok（Correctanswer 那 ${tokPeek.length} 格；位置在截斷點之前的 token 不受影響）：`); tokPeek.forEach(x => console.log('  ' + x));
