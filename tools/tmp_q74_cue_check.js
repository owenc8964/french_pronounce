// Q74 稽核用（只讀）：檢查模考聽力的題號／停點假設，並把 mock.html 的停點純邏輯抽出來餵假資料
// 用法：node tools/tmp_q74_cue_check.js
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..'), EX = path.join(ROOT, 'assets/tcf/exam');
const out = [];
const log = (...a) => { out.push(a.join(' ')); console.log(...a); };

// ── 1. 資料假設：每套聽力題號是否 = idx+1、是否 39 題 ──
const L = JSON.parse(fs.readFileSync(path.join(EX, 'listening.json'), 'utf8'));
const tests = Array.isArray(L) ? L : (L.tests || Object.values(L));
let bad = 0, not39 = 0;
for (const t of tests) {
  const qs = t.questions || [];
  if (qs.length !== 39) not39++;
  qs.forEach((q, i) => { if (q.q !== i + 1) bad++; });
}
log('聽力套數', tests.length, '／不是 39 題的套', not39, '／題號≠位置+1 的題', bad);

// ── 2. 自動停點是否單調遞增；手動停點是否造成倒序 ──
const sb = { window: {} }; vm.createContext(sb);
vm.runInContext(fs.readFileSync(path.join(EX, 'cues.js'), 'utf8'), sb);
const CUES = sb.window.TCF_CUES || sb.TCF_CUES || {};
let manual = {};
try { manual = JSON.parse(fs.readFileSync(path.join(EX, 'cues_manual.json'), 'utf8')); } catch (e) { log('cues_manual.json 讀不到', e.message); }
const cueListOf = (id) => {
  const base = CUES[id] || [], m = manual[id] || {};
  return Array.from({ length: 39 }, (_, i) => m[i + 1] ? m[i + 1].t : (typeof base[i] === 'number' ? base[i] : null));
};
let autoInv = 0, mixInv = 0, manualKeys = 0;
for (const id of Object.keys(CUES)) {
  const b = CUES[id].filter(x => typeof x === 'number');
  for (let i = 1; i < b.length; i++) if (b[i] <= b[i - 1]) autoInv++;
}
for (const id of Object.keys(manual)) {
  manualKeys += Object.keys(manual[id]).length;
  const c = cueListOf(id).map((x, i) => [i + 1, x]).filter(p => typeof p[1] === 'number');
  for (let i = 1; i < c.length; i++) if (c[i][1] <= c[i - 1][1]) { mixInv++; log('  倒序：', id, '第' + c[i - 1][0] + '題', c[i - 1][1], '>= 第' + c[i][0] + '題', c[i][1]); }
}
log('自動停點倒序處', autoInv, '／手動標記筆數', manualKeys, '／合併後倒序處', mixInv);

// ── 3. 純邏輯模擬（照抄 mock.html 787–827、1062–1080 的判斷） ──
function sim(base, manualRow) {
  const S = { m: Object.assign({}, manualRow), qEnd: null, stoppedAt: null, t: 0, paused: true, idx: 0 };
  const cl = () => Array.from({ length: 39 }, (_, i) => S.m[i + 1] ? S.m[i + 1].t : (typeof base[i] === 'number' ? base[i] : null));
  const nextOf = (i) => { const s = cl()[i]; return cl().slice(i + 1).find(x => typeof x === 'number' && x > s); };
  S.playQuestion = () => { const s = cl()[S.idx]; if (s === null) return; const n = nextOf(S.idx); S.qEnd = typeof n === 'number' ? n : null; S.stoppedAt = null; S.t = s; S.paused = false; };
  S.tick = (dt) => { if (S.paused) return; S.t += dt; if (S.qEnd !== null && S.t >= S.qEnd) { S.stoppedAt = S.qEnd; S.qEnd = null; S.paused = true; } };
  S.togglePlay = () => {
    if (!S.paused) { S.paused = true; return; }
    const s = cl()[S.idx], at0 = S.t;
    if (S.stoppedAt !== null && Math.abs(at0 - S.stoppedAt) < 2) { S.stoppedAt = null; S.qEnd = null; S.paused = false; return; }
    S.stoppedAt = null;
    if (s !== null) { const n = nextOf(S.idx); const end = typeof n === 'number' ? n : null;
      if (S.t < s - 1 || (end !== null && S.t >= end - 0.3)) { S.qEnd = end; S.t = s; S.paused = false; return; } S.qEnd = end; }
    S.paused = false;
  };
  S.markNext = () => { const q = S.idx + 1, s = cl()[S.idx]; const t = Math.max(0, S.t - 0.5); if (s !== null && t <= s + 2) return 'rejected'; S.m[q + 1] = { t }; if (S.qEnd !== null) S.qEnd = t; return t; };
  S.undoNext = () => { delete S.m[S.idx + 2]; };
  S.cl = cl; S.nextOf = nextOf;
  return S;
}
const base = Array.from({ length: 39 }, (_, i) => 10 + i * 30);   // 第1題 10 秒、每題 30 秒
log('\n— 情境 A：停點太早，按 ⏯ 越過後忘了按 🏁');
let S = sim(base, {}); S.idx = 4; S.playQuestion(); for (let k = 0; k < 200; k++) S.tick(0.25);
log('  第5題起', S.cl()[4], '自動停在', S.t, 'stoppedAt', S.stoppedAt);
S.togglePlay(); for (let k = 0; k < 400; k++) S.tick(0.25);
log('  越過後再播 100 秒：現在位置', S.t, '（第6題起', S.cl()[5], '第7題起', S.cl()[6], '第8題起', S.cl()[7], '）paused=', S.paused, '→ 沒有任何停點');

log('\n— 情境 B：停住後不動、直接按 🏁（暫停中也扣 0.5 秒）');
S = sim(base, {}); S.idx = 4; S.playQuestion(); for (let k = 0; k < 200; k++) S.tick(0.25);
const before = S.cl()[5]; const r1 = S.markNext(); const r2 = S.markNext();
log('  原第6題起', before, '→ 按一次', r1, '→ 再按一次', r2, '（暫停中 currentTime 不動，每次都是 停點−0.5）');

log('\n— 情境 C：越過停點聽太久，🏁 標到第7題起點之後');
S = sim(base, {}); S.idx = 4; S.playQuestion(); for (let k = 0; k < 200; k++) S.tick(0.25);
S.togglePlay(); for (let k = 0; k < 160; k++) S.tick(0.25);   // 多聽 40 秒，跨過第7題起點 190
const tC = S.markNext();
log('  標在', tC, '；合併後 第6題起', S.cl()[5], '第7題起', S.cl()[6]);
S.idx = 5; log('  到第6題：起點', S.cl()[5], '停點', S.nextOf(5), '（跳過第7題，直接停在第8題起點）');
S.idx = 6; log('  到第7題：起點', S.cl()[6], '停點', S.nextOf(6), '（起點在第6題之前，▶ 會播到第6題的內容）');

log('\n— 情境 D：連改兩次再復原（原值是自動值）');
S = sim(base, {}); S.idx = 4; S.t = 175; S.markNext(); S.t = 180; S.markNext(); S.undoNext();
log('  自動值 160 → 標 174.5 → 標 179.5 → 復原後', S.cl()[5], '（回到自動值，不是第一次標的 174.5）');

log('\n— 情境 E：原值本來是手動（例如在第6題用 📍 標過並核對過）');
S = sim(base, { 6: { t: 158, chk: 'ok' } }); S.idx = 4; S.t = 175; S.markNext(); S.undoNext();
log('  手動 158（已核對）→ 在第5題按 🏁 標 174.5 → 復原後', S.cl()[5], '（自動值 160；原本手動的 158 與核對紀錄都沒了）');

log('\n— 情境 F：第一題自動起點缺（null），🏁 不檢查');
const b2 = base.slice(); b2[0] = null; S = sim(b2, {}); S.idx = 0; S.t = 3; log('  第1題起點 null，在 3 秒按 🏁 →', S.markNext(), '（第2題起點被設到 2.5 秒）');

log('\n— 情境 G：復原後正在播的 qEnd 沒更新');
S = sim(base, {}); S.idx = 4; S.playQuestion(); for (let k = 0; k < 20; k++) S.tick(0.25); S.markNext();
const qe = S.qEnd; S.undoNext(); log('  🏁 後 qEnd', qe, '→ 復原後 qEnd 仍是', S.qEnd, '（應回到', S.nextOf(4), '）');
// 注意：情境 G 裡 🏁 在 15 秒處按，t=14.5 < start+2? start=130 → 被擋。改在題中按：
S = sim(base, {}); S.idx = 4; S.playQuestion(); for (let k = 0; k < 40; k++) S.tick(0.25);
log('  （補）題中 10 秒按 🏁 →', S.markNext(), 'paused 下一拍', (S.tick(0.25), S.paused), 'qEnd', S.qEnd);
S.undoNext(); log('  復原後 qEnd', S.qEnd, '（已停，stoppedAt=', S.stoppedAt, '；再按 ⏯ 會越過、整段不停）');
