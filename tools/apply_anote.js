// 把補寫好的 aNote 寫回 questions.js（只動 aNote，其餘欄位改了就中止）
// 用法：node tools/apply_anote.js notes.json   （notes.json = { "BANK 序號": "新 aNote", ... }）
const fs = require('fs'), vm = require('vm'), path = require('path');
const file = path.join(__dirname, '..', 'questions.js');
const notes = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const src = fs.readFileSync(file, 'utf8'), lines = src.split('\n');
const evalObj = l => vm.runInNewContext('(' + l.trim().replace(/,\s*(\/\/.*)?$/, '') + ')');
// BANK 每題一行：從 const BANK = [ 的下一行起，跳過註解與空行
const start = lines.findIndex(l => /^const BANK = \[/.test(l));
const idx = []; for (let k = start + 1; k < lines.length && !/^\];/.test(lines[k]); k++)
  if (/^\s*\{.*\}\s*,?\s*(\/\/.*)?$/.test(lines[k])) idx.push(k);
const lit = s => "'" + s.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
const RE = /aNote:\s*('(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`)/;
let n = 0;
for (const [i, note] of Object.entries(notes)) {
  const k = idx[+i], before = evalObj(lines[k]);
  let l = lines[k];
  l = RE.test(l) ? l.replace(RE, () => 'aNote:' + lit(note)) : l.replace(/\s*\}(\s*,?\s*(\/\/.*)?)$/, ", aNote:" + lit(note) + ' }$1');
  const after = evalObj(l);
  const strip = o => JSON.stringify(Object.assign({}, o, { aNote: undefined }));
  if (strip(before) !== strip(after) || after.aNote !== note) { console.error('✗ 中止：#' + i + ' 其他欄位會被動到'); process.exit(1); }
  lines[k] = l; n++;
}
fs.writeFileSync(file, lines.join('\n'));
console.log('寫回 ' + n + ' 題');
