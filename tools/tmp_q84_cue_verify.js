// Q84（2026-11-26）只讀：核對 tcf_cue_fix.py 的修正格起點是不是落在正確題號
// 跑法：node tools/tmp_q84_cue_verify.js [--all]   （--all：掃全部 44 套的合併起點，不只修正格）
const fs = require('fs'), path = require('path');
const EX = path.join(__dirname, '..', 'assets/tcf/exam');
const cues = JSON.parse(fs.readFileSync(path.join(EX, 'cues.js'), 'utf8').split('=').slice(1).join('=').trim().replace(/;$/, ''));
const fix = JSON.parse(fs.readFileSync(path.join(EX, 'cues_fix.json'), 'utf8'));
const man = JSON.parse(fs.readFileSync(path.join(EX, 'cues_manual.json'), 'utf8'));
const LJ = JSON.parse(fs.readFileSync(path.join(EX, 'listening.json'), 'utf8'));
const tests = {}; LJ.tests.forEach(t => tests[t.id] = t);
const toks = x => (x.toLowerCase().replace(/’/g, "'").match(/[a-zà-ÿœ]{4,}/g) || []);
const segText = g => g.text.replace(/<\|.*?\|>/g, '').trim();
const segStart = g => (g.words && g.words.length) ? g.words[0].start : g.start;
const MARK = /(?:l['’ ]?image|question)\s*(?:n[°o]\s*|num[ée]ro\s*)?(\d{1,2}|un|une|deux|trois|quatre|cinq|six|sept|huit|neuf|dix)\b/gi;
const WORDS = { un: 1, une: 1, deux: 2, trois: 3, quatre: 4, cinq: 5, six: 6, sept: 7, huit: 8, neuf: 9, dix: 10 };
const score = (script, segs) => { const s = new Set(toks(script)); if (!s.size) return 0; const h = new Set(); segs.forEach(g => toks(segText(g)).forEach(t => h.add(t))); let n = 0; s.forEach(t => h.has(t) && n++); return n / s.size; };
// data/*.js（tcf_listening_cues.py 用的）vs listening.json（tcf_cue_fix.py 用的）逐字稿一不一致
function dataScripts(tid) { const src = fs.readFileSync(path.join(EX, 'data', tid + '.js'), 'utf8'); return JSON.parse(src.slice(src.indexOf(',') + 1, src.lastIndexOf(')'))).questions.map(q => q.script_fr || ''); }
function merged(tid) { const b = cues[tid] || [], m = man[tid] || {}; return Array.from({ length: 39 }, (_, i) => m[i + 1] ? m[i + 1].t : (typeof b[i] === 'number' ? b[i] : null)); }
function judge(tid, q, list, segs, scripts) {
  const i = q - 1, t = list[i];
  if (t == null) return null;
  const next = list.slice(i + 1).find(x => typeof x === 'number' && x > t);
  const win = segs.filter(g => g.start >= t - .5 && g.start < t + 15 && toks(segText(g)).length);
  const body = win.filter(g => !new RegExp(MARK.source, 'i').test(segText(g))).length ? win.filter(g => !new RegExp(MARK.source, 'i').test(segText(g))) : win;
  const rank = [];
  for (let j = Math.max(0, i - 3); j <= Math.min(38, i + 3); j++) if (scripts[j]) rank.push([score(scripts[j], body), j + 1]);
  rank.sort((a, b) => b[0] - a[0]);
  const seg = segs.filter(g => g.start >= t && g.start < (next == null ? 1e9 : next));
  const own = score(scripts[i], seg), prev = i > 0 ? score(scripts[i - 1], seg) : 0;
  const nums = []; win.forEach(g => { let m; const re = new RegExp(MARK.source, 'gi'); while ((m = re.exec(segText(g)))) { const v = m[1].toLowerCase(); nums.push(WORDS[v] || +v); } });
  return { t, next, best: rank[0] ? rank[0][1] : null, bestS: rank[0] ? rank[0][0] : 0, ownS: rank.find(r => r[1] === q)?.[0] || 0, own, prev, nums,
    asr: win.map(segText).join(' / ').slice(0, 150), head: (scripts[i] || '').split('\n').filter(s => s.trim())[0]?.slice(0, 90) || '' };
}
const clock = t => t == null ? '—' : Math.floor(t / 60) + ':' + String((t % 60).toFixed(1)).padStart(4, '0');
let cells = 0, okN = 0, bad = [], inv = 0, notApplied = 0, scriptDiff = 0;
for (const tid of Object.keys(fix).sort((a, b) => +a.slice(3) - +b.slice(3))) {
  const segs = JSON.parse(fs.readFileSync(path.join(EX, '_asr', 'co_test' + tid.slice(3) + '.json'), 'utf8')).segments.filter(g => segText(g));
  const scripts = tests[tid].questions.map(q => q.script_fr || '');
  const ds = dataScripts(tid); const d = scripts.filter((s, k) => s !== ds[k]).length; if (d) { scriptDiff += d; console.log(`  ⚠️ ${tid}: listening.json 與 data/${tid}.js 逐字稿有 ${d} 題不同`); }
  const list = merged(tid);
  // 順序
  let last = -1; list.forEach((c, k) => { if (c == null) return; if (c <= last) { inv++; console.log(`  ✗ ${tid} 第${k + 1}題 ${c} 早於前一個起點 ${last}`); } last = c; });
  for (const q of Object.keys(fix[tid]).map(Number).sort((a, b) => a - b)) {
    cells++;
    const fv = fix[tid][q];
    if ((cues[tid] || [])[q - 1] !== fv) { notApplied++; console.log(`  ✗ ${tid} 第${q}題 cues.js=${cues[tid][q - 1]} ≠ fix=${fv}`); }
    const mine = man[tid] && man[tid][q];
    if (fv === null) { console.log(`${tid} Q${q}: 修正＝null（不給起點）${mine ? '，但有手標 ' + mine.t : ''}`); continue; }
    const r = judge(tid, q, list, segs, scripts);
    const ok = r.best === q && r.own >= .55;
    if (ok) okN++; else bad.push(`${tid} Q${q}`);
    console.log(`${ok ? '✓' : '?'} ${tid} Q${q} ${clock(r.t)}→${clock(r.next)}${mine ? '（手標覆蓋 ' + mine.t + '）' : ''} 開頭15秒最像第${r.best}題(${r.bestS.toFixed(2)}；本題${r.ownS.toFixed(2)}) 全段涵蓋本題${r.own.toFixed(2)}/上一題${r.prev.toFixed(2)} 報號${JSON.stringify(r.nums)}`);
    console.log(`     稿：${r.head}`);
    console.log(`     ASR：${r.asr}`);
  }
}
console.log(`\n修正格 ${cells}（null 不算）；判定落在本題 ${okN}；待人工看 ${bad.length}：${bad.join('、')}；順序倒置 ${inv}；cues.js 沒套到 ${notApplied}；兩份逐字稿不同的題 ${scriptDiff}`);
// 手標 vs 修正是否同格
let clash = []; for (const tid in fix) for (const q in fix[tid]) if (man[tid] && man[tid][q]) clash.push(`${tid} Q${q}`);
console.log('手標與修正同一格：' + (clash.join('、') || '無'));
if (process.argv.includes('--all')) {
  let sus = [];
  for (const tid of Object.keys(cues)) {
    const p = path.join(EX, '_asr', 'co_test' + tid.slice(3) + '.json'); if (!fs.existsSync(p)) continue;
    const segs = JSON.parse(fs.readFileSync(p, 'utf8')).segments.filter(g => segText(g));
    const scripts = tests[tid].questions.map(q => q.script_fr || ''), list = merged(tid);
    for (let q = 1; q <= 39; q++) { const r = judge(tid, q, list, segs, scripts); if (!r) continue;
      if (r.best !== q && r.bestS >= .15 && r.bestS > r.ownS + .05) sus.push(`${tid} Q${q} ${clock(r.t)} 像第${r.best}題(${r.bestS.toFixed(2)} vs ${r.ownS.toFixed(2)})${(fix[tid] || {})[q] !== undefined ? ' [修正格]' : ''}${man[tid] && man[tid][q] ? ' [手標]' : ''}`); }
  }
  console.log(`\n--all 全部合併起點中「開頭像別題」的：${sus.length}`); sus.forEach(s => console.log('  ' + s));
}
