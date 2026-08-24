/* external_time.js — 網頁外的學習時間（自動產生，不要手改）
 * 由 tools/gen_external_time.js 產生 · 最後更新 2026-08-24
 * 為什麼要有這支：dashboard 的 700 小時原本只算 clb7_tracker（網站內的時間），
 * Anki 與 Duolingo 這兩個他最常用的完全沒被計入。Anki 的時間來自 revlog.time，
 * 是他每一次複習實際花的毫秒數——不需要任何手動輸入。
 * Duolingo 的分鐘數在 dashboard 的 DUO_SEED（來源是每週的官方週報截圖）。 */
const EXTERNAL_TIME = {
  updated: '2026-08-24',
  anki: {
    totalSec: 3593,
    reviews: 104,
    byDate: {
          "2026/08/17": 957,
          "2026/08/18": 1042,
          "2026/08/19": 665,
          "2026/08/20": 99,
          "2026/08/22": 451,
          "2026/08/23": 381
    }
  },
  // ⚠️ 保底估計，不是實測：每週 2.5 小時，從 2026-06-25 起算整週（取 floor）
  cours: {
    totalSec: 72000,
    weeks: 8,
    perWeekH: 2.5,
    since: '2026-06-25',
    estimated: true
  }
};
if (typeof module !== 'undefined') module.exports = { EXTERNAL_TIME };
