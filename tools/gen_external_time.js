#!/usr/bin/env node
/* tools/gen_external_time.js — 把「網頁外」的學習時間收進來（2026-08-24 新增）
 *
 * 起因：Owen「anki 的時間也要算進去，這些都無法計時」。
 * dashboard 的 700 小時只加 `clb7_tracker`（＝在這個網站裡的時間），
 * 所以他在 Anki 和 Duolingo 上花的時間全部沒被算到——那反而是他最常用的兩個。
 *
 * Anki 的 `revlog.time` 是每一次複習實際花的毫秒數，**完全不需要他手動填**。
 * 這支腳本把它算出來寫成 external_time.js，dashboard 直接讀。
 *
 * 用法：node tools/gen_external_time.js          （預覽）
 *       node tools/gen_external_time.js --write  （寫檔）
 *
 * ⚠️ 只讀收藏檔的複本，而且一定要連 -wal 一起複製（Anki 開著時最新變更在 WAL 裡）。
 */
const fs = require('fs'), os = require('os'), path = require('path'), cp = require('child_process');

const COL = path.join(os.homedir(), 'Library/Application Support/Anki2/使用者 1/collection.anki2');
const WRITE = process.argv.includes('--write');

if (!fs.existsSync(COL)) { console.error('找不到 Anki 收藏檔：' + COL); process.exit(1); }

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'anki-'));
fs.copyFileSync(COL, path.join(tmp, 'c.anki2'));
for (const ext of ['-wal', '-shm']) {
  if (fs.existsSync(COL + ext)) fs.copyFileSync(COL + ext, path.join(tmp, 'c.anki2' + ext));
}

// 用 sqlite3 CLI 取 revlog（macOS 內建），避免相依任何 npm 套件
const raw = cp.execFileSync('sqlite3', [path.join(tmp, 'c.anki2'), 'select id, time from revlog;'], { encoding: 'utf8' });
const rows = raw.trim() ? raw.trim().split('\n').map(l => l.split('|').map(Number)) : [];

const byDate = {};
let totalMs = 0;
for (const [id, ms] of rows) {
  totalMs += ms;
  const d = new Date(id);
  const key = `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
  byDate[key] = (byDate[key] || 0) + Math.round(ms / 1000);
}
const totalSec = Math.round(totalMs / 1000);

/* ── 上課時間（2026-08-24 Owen：「上課也要算時間吧XDDD…保底一週2.5小時」）──
 * 本來想用課堂錄音檔的長度來算（那才精確），但錄音混在他的工作與生活錄音裡，
 * 不去翻。改用他自己定的保底值：**每週 2.5 小時**，從課程起算日開始數整週。
 * ⚠️ 這是三項裡唯一「估計」而非「實測」的，所以取 floor（少算不多算），
 *    dashboard 上也會標明是保底值。 */
const COURSE_START = '2026-06-25';
const COURSE_H_PER_WEEK = 2.5;
const weeksElapsed = Math.floor((Date.now() - new Date(COURSE_START + 'T00:00:00').getTime()) / (7 * 864e5));
const coursSec = Math.round(weeksElapsed * COURSE_H_PER_WEEK * 3600);
console.log(`上課：${COURSE_START} 起算 ${weeksElapsed} 整週 × ${COURSE_H_PER_WEEK}h ＝ ${(coursSec/3600).toFixed(1)} 小時（保底估計）`);
const today = new Date();
const stamp = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

console.log(`Anki：${rows.length} 次複習｜累計 ${(totalSec / 3600).toFixed(2)} 小時（${(totalSec / 60).toFixed(1)} 分）｜${Object.keys(byDate).length} 天`);

const out = `/* external_time.js — 網頁外的學習時間（自動產生，不要手改）
 * 由 tools/gen_external_time.js 產生 · 最後更新 ${stamp}
 * 為什麼要有這支：dashboard 的 700 小時原本只算 clb7_tracker（網站內的時間），
 * Anki 與 Duolingo 這兩個他最常用的完全沒被計入。Anki 的時間來自 revlog.time，
 * 是他每一次複習實際花的毫秒數——不需要任何手動輸入。
 * Duolingo 的分鐘數在 dashboard 的 DUO_SEED（來源是每週的官方週報截圖）。 */
const EXTERNAL_TIME = {
  updated: '${stamp}',
  anki: {
    totalSec: ${totalSec},
    reviews: ${rows.length},
    byDate: ${JSON.stringify(byDate, null, 6).replace(/\n/g, '\n    ')}
  },
  // ⚠️ 保底估計，不是實測：每週 ${COURSE_H_PER_WEEK} 小時，從 ${COURSE_START} 起算整週（取 floor）
  cours: {
    totalSec: ${coursSec},
    weeks: ${weeksElapsed},
    perWeekH: ${COURSE_H_PER_WEEK},
    since: '${COURSE_START}',
    estimated: true
  }
};
if (typeof module !== 'undefined') module.exports = { EXTERNAL_TIME };
`;

if (WRITE) { fs.writeFileSync('external_time.js', out); console.log('✅ 已寫入 external_time.js'); }
else console.log('（預覽模式，加 --write 才會寫檔）');
