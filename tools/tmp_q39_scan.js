// Q39：全批 1215 題粗篩原型（只讀不改 questions.js）。輸出命中數與前幾例，門檻偏寬，命中≠有問題。
// 用法：node tools/tmp_q39_scan.js <added.json> [輸出 json]
const fs = require('fs');
function parse(file, name) {
  const raw = fs.readFileSync(file, 'utf8'), pages = {};
  const re = /===== \[([^\]]+)\] page (\d+) =====\n/g; let m, last = null;
  while ((m = re.exec(raw))) { if (last && last.b === name) pages[last.p] = raw.slice(last.end, m.index); last = { b: m[1], p: +m[2], end: re.lastIndex }; }
  if (last && last.b === name) pages[last.p] = raw.slice(last.end);
  return pages;
}
const C = 'assets/.textbook_cache.txt';
const BK = {
  'A1練習本': { pg: parse(C, 'Edito Cah22 A1 Owen.pdf'), map: p => p },
  'A2練習本': { pg: parse('assets/.ocr_EditoA2_2022_Cahier_.txt', 'EditoA2 2022 Cahier .pdf'), map: p => p <= 26 ? p : p <= 76 ? p + 1 : p + 2 },
  'A1課本': { pg: parse(C, 'Edito22 A1 Owen.pdf'), map: p => p },
  'A2課本': { pg: parse(C, 'Edito22 A2 Owen 7:21.pdf'), map: p => p },
};
const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’]/g, "'").replace(/œ/g, 'oe').replace(/[^a-z0-9' ]+/g, ' ').replace(/\s+/g, ' ').trim();
const all = JSON.parse(fs.readFileSync(process.argv[2], 'utf8')).filter(q => q.lesson !== 47);
function stratum(q) { const h = q.hint || ''; if (/Cahier\s*A1/.test(h)) return 'A1練習本'; if (/Cahier\s*A2/.test(h)) return 'A2練習本'; return q.lesson <= 16 ? 'A1課本' : 'A2課本'; }
const R = {};
const hit = (k, q, extra) => { (R[k] = R[k] || []).push({ idx: q._i, s: q._s, hint: q.hint, q: q.q, a: q.a, extra }); };
const PRON = new Set(['le', 'la', "l'", 'les', 'lui', 'leur', 'me', 'te', 'nous', 'vous', "m'", "t'", 'y', 'en', "n'y", "n'en", 'se', "s'"]);
const DET = new Set(['ce', 'cet', 'cette', 'ces', 'mon', 'ma', 'mes', 'ton', 'ta', 'tes', 'son', 'sa', 'ses', 'le', 'la', 'les', "l'", 'un', 'une', 'des', 'notre', 'votre', 'leur', 'nos', 'vos', 'leurs']);
const stat = { pageChecked: 0, pageMiss: 0 };
all.forEach((q, i) => {
  q._i = i; q._s = stratum(q);
  const stem = q.q, a0 = q.a.split('|')[0].trim().toLowerCase().replace(/’/g, "'");
  const hasArrow = /→/.test(stem), isFill = q.type === 'fill';
  // S1 詞庫被改成原形：題幹括號裡有 / 且多個原形
  if (isFill && /\([^)]*\/[^)]*\)/.test(stem) && /(er|ir|re)\s*\//.test(stem)) hit('S1_詞庫改原形', q);
  // S2 代名詞／限定詞空格但題幹沒有先行詞（無箭頭）
  if (isFill && !hasArrow && PRON.has(a0) && !/\(/.test(stem) && stem.split(/\s+/).length <= 7) hit('S2_代名詞沒先行詞', q);
  if (isFill && !hasArrow && DET.has(a0) && !/\(/.test(stem) && stem.split(/\s+/).length <= 7) hit('S3_限定詞沒詞庫', q);
  // S5 說明關鍵字
  const n = q.aNote || '';
  if (/h\s*不發音/.test(n)) hit('S5a_h不發音講窄', q);
  if (/命令式[^。]{0,8}(＝|=)\s*(義務|obligation)/.test(n)) hit('S5b_命令式等於義務', q);
  if (/de [A-ZÉ][a-zé]+ 限定|限定是誰/.test(n)) hit('S5c_de人名限定', q);
  if (/。。/.test(n)) hit('S6_雙句號', q);
  if (/只能|一定|只有|都是|永遠/.test(n)) hit('S5d_絕對語氣', q, n.slice(0, 80));
  // S4／S7 出處：題幹片段要出現在所引頁（A2 練習本走 OCR）
  const b = BK[q._s], m = (q.hint || '').match(/p\.(\d+)/);
  if (m) {
    const pdf = b.map(+m[1]), t = norm((b.pg[pdf] || '') + ' ' + (b.pg[pdf + 1] || '') + ' ' + (b.pg[pdf - 1] || ''));
    const own = norm(b.pg[pdf] || '');
    const stemCore = stem.replace(/（[^）]*）/g, ' ').replace(/\([^)]*\)/g, ' ');
    const segs = stemCore.split(/_+|→/).map(norm).filter(s => s.split(' ').length >= 3);
    if (segs.length) {
      stat.pageChecked++;
      const anyW3 = segs.some(s => { const w = s.split(' '); for (let j = 0; j + 3 <= w.length; j++) if (own.includes(w.slice(j, j + 3).join(' '))) return true; return false; });
      if (!anyW3) { stat.pageMiss++; const elsewhere = Object.keys(b.pg).filter(p => { const tt = norm(b.pg[p]); return segs.some(s => tt.includes(s)); }).slice(0, 3); hit('S7_題幹不在所引頁', q, 'elsewhere=' + elsewhere.join(',')); }
    }
  } else hit('S7b_hint無頁碼', q);
});
// S8 練習指令分類（練習本）：找 N. 開頭行與下一行
const instrCount = {};
all.forEach(q => {
  if (!/Cahier/.test(q.hint || '')) return;
  const m = q.hint.match(/p\.(\d+)[^練]*練習(\d+)/); if (!m) return;
  const b = BK[q._s], pg = (b.pg[b.map(+m[1])] || '').split('\n---')[0];
  const L = pg.split('\n');
  let i = L.findIndex(l => new RegExp(`^\\s*${m[2]}[.\\s]`).test(l));
  const text = i >= 0 ? (L[i] + ' ' + (L[i + 1] || '') + ' ' + (L[i + 2] || '')) : '';
  let k = '未辨識';
  if (/Remettez|dans l'ordre|dans l’ordre/.test(text)) k = '重組';
  else if (/Transformez|Mettez|passé composé|futur|conditionnel|imparfait/.test(text)) k = '變換';
  else if (/Soulignez|Entourez|Choisissez|bonne réponse/.test(text)) k = '選擇';
  else if (/Complétez|Conjuguez/.test(text)) k = '填空';
  else if (/Associez|Écrivez/.test(text)) k = '其他';
  instrCount[k] = (instrCount[k] || 0) + 1;
  q._instr = k;
  if (k === '重組' && q.type === 'fill') hit('S9_重組題改填空', q);
  if (k === '變換' && q.type === 'fill' && !/(passé composé|imparfait|futur|conditionnel|subjonctif|plus-que|présent|impératif)/i.test(q.q)) hit('S10_變換題題幹沒講時態', q);
  if (/Complétez/.test(text) && /\bavec\b/.test(text) && q.type === 'fill' && !/\(/.test(q.q) && !/\//.test(q.q)) hit('S11_封閉詞庫被拿掉', q, text.slice(0, 90));
});
// 分層統計
const out = {};
for (const k of Object.keys(R).sort()) {
  const by = {}; R[k].forEach(x => { by[x.s] = (by[x.s] || 0) + 1; });
  console.log(k, R[k].length, JSON.stringify(by));
  R[k].slice(0, 4).forEach(x => console.log('   ', x.hint, '|', x.q.slice(0, 80), '| A=', x.a, x.extra ? '| ' + x.extra : ''));
  out[k] = R[k];
}
console.log('page check', stat, 'instr', instrCount);
if (process.argv[3]) fs.writeFileSync(process.argv[3], JSON.stringify(out));
