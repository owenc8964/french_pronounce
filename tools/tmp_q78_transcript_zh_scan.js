// Q78：模考聽力 script_fr 混中文／解析殘段 偵測＋清理預覽（只讀，不寫任何檔）
// 用法：node tools/tmp_q78_transcript_zh_scan.js [--json] [--preview N] [--all]
//   --all   連「沒有中文、但分隔線後有法文殘段」的題也列出
// 輸出到 stdout。⛔ 不改 assets/tcf/exam/listening.json（只有 readFileSync）。
// ⚠️ 2026-11-25 排程 session 裡 node 被權限擋，本檔「工具未實跑」；
//    報告裡的數字是用 grep 人工算的，第一次實跑請對照報告總表。
'use strict';
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'assets', 'tcf', 'exam', 'listening.json');
const args = process.argv.slice(2);
const asJson = args.includes('--json');
const showAll = args.includes('--all');
const pi = args.indexOf('--preview');
const previewN = pi >= 0 ? parseInt(args[pi + 1], 10) || 5 : 5;

const HAN = /[㐀-鿿豈-﫿]/;
const FULLWIDTH = /[（）：，。]/;           // （）：，。
// 分隔線：單獨一行的 – （後面接換行或字串結尾）。
// ⚠️ 不能用 /\n– / 這種寬鬆比對：co_1s Q9 的「\n– Salut Yann…」是對話破折號，是真的逐字稿。
const SEP = /\n[–—]\s*(\n|$)/;

function classify(tail) {
  const t = [];
  if (/正確答案|正确答案/.test(tail)) t.push('正確答案行');
  if (/答案是|答案為|答案为|答案\s*[A-D]|選\s*[A-D]|最合適的答案|最佳答案|正確的選項/.test(tail)) t.push('答案是X');
  if (/最符合|因此|所以|提到|說明|表示|關鍵|明確|錯誤|完全符合|恰好相反|對話中|文中/.test(tail)) t.push('中文解析');
  if (/(^|\n)\s*[A-D][.\s)–—-][^\n]*[㐀-鿿]/.test(tail)) t.push('選項＋中譯');
  if (/→/.test(tail)) t.push('箭頭筆記');
  if (!HAN.test(tail) && tail.replace(/[\s–—]/g, '').length) t.push('法文殘段（無中文）');
  if (!t.length && HAN.test(tail)) t.push('中文殘句');
  if (!t.length) t.push('只有分隔線');
  return t;
}

function analyze(s) {
  const r = { cut: -1, how: '', frPart: s, tail: '', types: [], manual: [] };
  const m = s.match(SEP);
  if (m) {
    r.cut = m.index; r.how = '分隔線';
  } else if (HAN.test(s)) {
    // 沒有分隔線：從第一個含漢字的「行」切
    let off = 0;
    for (const ln of s.split('\n')) {
      if (HAN.test(ln)) { r.cut = off; break; }
      off += ln.length + 1;
    }
    r.how = '首個中文行';
    r.manual.push('無分隔線');
    // 對照：切在「首個中文行之前最後一個題目句」之後；兩個切點不同 → 中間夾了行，要人工看
    const before = s.slice(0, Math.max(r.cut, 0)).split('\n');
    let qEnd = -1, o = 0;
    before.forEach(ln => { o += ln.length + 1; if (/^\s*Question|\?\s*$/.test(ln)) qEnd = o; });
    if (qEnd > 0 && qEnd < r.cut) r.manual.push('題目句與中文之間夾了 ' + s.slice(qEnd, r.cut).split('\n').filter(Boolean).length + ' 行');
    if (qEnd < 0) r.manual.push('找不到題目句');
  }
  if (r.cut < 0) return null;
  r.frPart = s.slice(0, r.cut).replace(/\s+$/, '');
  r.tail = s.slice(r.cut);
  r.types = classify(r.tail);

  // ---- 不能自動清、要人工看的情況 ----
  const firstTailLine = r.tail.replace(/^\n?[–—]?\s*\n?/, '').split('\n')[0] || '';
  if (HAN.test(firstTailLine) && /[A-Za-zÀ-ÿ']{3,}(\s+[A-Za-zÀ-ÿ']{2,}){3,}/.test(firstTailLine.split(HAN)[0] || ''))
    r.manual.push('同一行前法後中（逐行對譯，整行刪會丟逐字稿）');
  if (HAN.test(r.frPart)) r.manual.push('切點前仍有中文');
  if (FULLWIDTH.test(r.frPart)) r.manual.push('切點前有全形標點');
  if (!/Question|\?\s*$/.test(r.frPart.split('\n').slice(-3).join('\n'))) r.manual.push('切點前最後幾行不是題目句');
  if (r.frPart.length < 40) r.manual.push('清理後法文過短');
  if (/(^|\n)\s*[A-D][.)]\s/.test(r.tail) && !HAN.test(r.tail)) r.manual.push('尾段是選項清單（確認錄音有沒有念選項）');
  return r;
}

const data = JSON.parse(fs.readFileSync(SRC, 'utf8'));
const rows = [];
let total = 0;
for (const t of data.tests || []) {
  for (const q of t.questions || []) {
    total++;
    const s = q.script_fr || '';
    const a = analyze(s);
    if (!a) continue;
    const hasHan = HAN.test(s);
    // 沒中文的題：預設不列；--all 時列出「分隔線後有法文殘段」的，只有一條 – 的不列（無害，清理時順手刪）
    if (!hasHan && (!showAll || a.types.includes('只有分隔線'))) continue;
    // tok = [[起, 迄, 原形, 詞性, 形態]…]，是 script_fr 的字元位置（tools/exam_morph.py 110、152 行）。
    // 只切尾巴 → 切點前的位置不變；切點後的 tok 要一起丟掉（或重跑 exam_morph.py）。
    const tokTail = Array.isArray(q.tok) ? q.tok.filter(k => k[1] > a.frPart.length).length : 0;
    const tokNote = tokTail ? '（清理時要丟 ' + tokTail + ' 個 tok）' : '';
    rows.push({
      test: t.id, q: q.q, answer: q.answer, hasHan, how: a.how, types: a.types, manual: a.manual,
      tokTail, tokNote,
      tail: a.tail.replace(/^\n/, ''), cleanedEnd: a.frPart.slice(-140),
      lenBefore: s.length, lenAfter: a.frPart.length,
    });
  }
}

if (asJson) { process.stdout.write(JSON.stringify({ total, hit: rows.length, rows }, null, 1) + '\n'); process.exit(0); }

console.log('來源：' + SRC + '（唯讀）');
console.log('總題數 ' + total + '；列出 ' + rows.length + ' 題（含漢字 ' + rows.filter(r => r.hasHan).length + '）\n');
const byTest = {};
for (const r of rows) {
  const b = byTest[r.test] || (byTest[r.test] = { n: 0, types: {}, manual: 0, qs: [] });
  b.n++; b.qs.push(r.q); if (r.manual.length) b.manual++;
  for (const ty of r.types) b.types[ty] = (b.types[ty] || 0) + 1;
}
console.log('== 每套統計 ==');
for (const [id, b] of Object.entries(byTest))
  console.log(id + '\t' + b.n + ' 題\t需人工 ' + b.manual + '\t' + JSON.stringify(b.types) + '\tQ ' + b.qs.join(','));
console.log('\n== 逐題 ==');
for (const r of rows)
  console.log([r.test, 'Q' + r.q, '正解' + r.answer, r.how, r.types.join('+'), r.manual.join('／') || '可自動', JSON.stringify(r.tail.slice(0, 100))].join('\t'));
console.log('\n== 清理預覽（前 ' + previewN + ' 題）==');
for (const r of rows.slice(0, previewN)) {
  console.log('--- ' + r.test + ' Q' + r.q + '（' + r.lenBefore + '→' + r.lenAfter + ' 字元）' + r.tokNote);
  console.log('刪除：' + JSON.stringify(r.tail));
  console.log('清理後結尾：' + JSON.stringify(r.cleanedEnd));
}
