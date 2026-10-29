// Q33：commit b306347 改過的 JS／HTML 有沒有語法錯誤（只編譯、不執行）＋題庫資料抽查
// 用法：node tools/q33_syntax_check.js
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..');
const out = [];
function compile(name, code) { try { new vm.Script(code, { filename: name }); out.push('OK   ' + name); } catch (e) { out.push('ERR  ' + name + '：' + e.message); } }
['questions.js', 'exam_items.js', 'chunks.js', 'sentences.js', 'reading_notes.js', 'upgrade_moves.js', 'verbs_full.js'].forEach(f => compile(f, fs.readFileSync(path.join(ROOT, f), 'utf8')));
['town.html', 'verb_sprint.html', 'french_notes.html'].forEach(f => {
  const h = fs.readFileSync(path.join(ROOT, f), 'utf8'); let i = 0;
  h.replace(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g, (m, c) => { i++; compile(f + ' #script' + i, c); return m; });
});

// ── 載入資料 ──
const ctx = { console }; vm.createContext(ctx);
const load = f => vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/^\s*const\s+/gm, 'var ').replace(/^\s*let\s+/gm, 'var '), ctx);
['questions.js', 'exam_items.js', 'reading_notes.js', 'upgrade_moves.js'].forEach(f => { try { load(f); } catch (e) { out.push('LOAD ERR ' + f + '：' + e.message); } });
const names = Object.keys(ctx);
out.push('globals：' + names.join(', '));

// 題庫：每題 a 必須在 opts 裡（選擇題）；列出要抽查的題
const Q = ctx.QUESTIONS || ctx.QUIZ || ctx.questions;
if (Array.isArray(Q)) {
  let bad = [];
  Q.forEach((q, i) => { if (Array.isArray(q.opts) && q.a !== undefined && typeof q.a === 'string' && !q.opts.includes(q.a)) bad.push(i + ':' + JSON.stringify(q.q).slice(0, 60) + ' a=' + q.a); });
  out.push('選擇題答案不在選項裡：' + bad.length + (bad.length ? '\n  ' + bad.slice(0, 20).join('\n  ') : ''));
  const dup = []; Q.forEach((q, i) => { if (Array.isArray(q.opts)) { const s = new Set(q.opts); if (s.size !== q.opts.length) dup.push(i + ':' + q.opts.join(' / ')); } });
  out.push('選項重複：' + dup.length + (dup.length ? '\n  ' + dup.join('\n  ') : ''));
  const grep = re => Q.filter(q => re.test(JSON.stringify(q))).map(q => JSON.stringify(q).slice(0, 400));
  [/plus mauvais/, /regarder la t/, /des oiseaux/, /toujours de la boxe|fait .{0,10}de la boxe/, /vieil|vieux|neuf/, /châtain|roux/, /Heureux|joyeux anniv/i, /vélo/, /piscine/, /stresse/, /fera/, /qu'ils|que ils/, /qu'à|que à/, /embrasse|emporte/, /Okinawa/, /entrée/, /Argentine/, /achète/, /moi\/toi|me→moi|me → moi/, /paddle/, /gentil/, /\bmets\b/, /J'en ai pas/, /courtes/, /neuve/, /arrêt/, /30 minutes/, /le sport/, /Canada/].forEach(re => out.push('\n[grep ' + re + ']\n  ' + grep(re).slice(0, 6).join('\n  ')));
} else out.push('找不到題庫陣列');

const E = ctx.EXAM_ITEMS;
if (Array.isArray(E)) {
  const neg = E.filter(x => x.type === 'neg' || /^n\d/.test(x.id));
  const cnt = {}; neg.forEach(x => cnt[x.ans] = (cnt[x.ans] || 0) + 1);
  out.push('\n否定題（id n..）' + neg.length + ' 題，答案分布 ' + JSON.stringify(cnt));
  neg.forEach(x => out.push('  ' + x.id + ' | ' + x.fr + ' | ' + x.stmt + ' | ans=' + x.ans + ' | ' + (x.note || x.zh || '').slice(0, 120)));
  E.filter(x => /^(h04|h09)$/.test(x.id)).forEach(x => out.push('  ' + JSON.stringify(x).slice(0, 300)));
}
console.log(out.join('\n'));
