# CLB7 法語學習系統 — 交接文件

> **給新 session 的 Claude：**
> Owen 的目標只有一個：**2027年6月1日前考過 CLB 7（B2）**。
> 所有工具、系統、計畫都以「真的考過」為前提，不是模擬努力。
> 讀完這份文件就能接上脈絡，直接繼續推進。

---

## 🔁 交付前自動試跑原則（每個功能必做，不等 Owen 說）

實作完成後，**Claude 自己先試跑整個流程**，確認沒問題才回報。

**標準流程：**
1. 啟動 preview server（`python3 -m http.server 7788`，serverId 記起來）
2. `preview_eval` 清空相關 localStorage key，模擬全新狀態
3. 用 `preview_eval` / `preview_click` / `preview_fill` 跑完整 happy path
4. `preview_screenshot` 確認畫面正確
5. 主動找邊緣情況：資料空白時、今天已完成時、guided=1 跳轉時
6. 發現 bug → 自己修 → 重跑 → 確認
7. **全部通過後** 才 commit + push，再回報 Owen

**不做的事：**
- ❌ 做完就說「應該可以了」
- ❌ 讓 Owen 自己去點看看
- ❌ 發現問題才說「你要不要試試看」

---

## ⚠️ 做事的核心前提（每次 session 必讀，不可跳過）

**我們在建的不是一堆分開的工具。我們在建一個監控整個學習過程的系統。**

目前已有的頁面（quiz、筆記、造句、計時器、地圖、口說、聽力）各自獨立，互相不認識。這不夠。

**真正需要的是一個大腦（`dashboard.html`）：**
- 讀取所有工具的 localStorage 數據（quiz 每題對錯、造句分數、學習時數）
- 計算每個 topic 的正確率，找出最弱的地方
- 告訴 Owen 今天具體要做什麼（不是 Owen 自己決定）
- 發出警報：超過 N 天沒練、某 topic 正確率掉了、造句分數退步、時數進度落後
- 顯示領先指標，讓 Owen 知道自己是否真的在進步，而不只是「感覺有在努力」

**每次新增功能前，先問：這個功能的數據，dashboard 讀得到嗎？讀到之後，能影響「今日處方」嗎？如果不能，這個功能意義不大。**

---

## 核心目標與現況（2026-06-27 更新）

| 項目 | 內容 |
|------|------|
| **目標** | CLB 7（= CEFR B2）|
| **考試** | TEF Canada 或 TCF Canada |
| **截止日** | 2027年6月1日 |
| **剩餘天數** | 340 天 |
| **目前程度** | A1，第11課，約 20 小時課時 |
| **每天目標** | 1.5–2 小時有效練習（含通勤被動聽力）|
| **總時數目標** | 700 小時（多方研究數據交叉驗證）|

---

## 現有系統狀態（2026-06-27）

| 檔案 | 用途 | 狀態 |
|------|------|------|
| `dashboard.html` | 指揮中心：今日處方、警報、倒數、700h 進度、**四技能視圖** | ✅ 完成，GitHub Pages 部署 |
| `quiz.html` | SRS Quiz，432+ 題，URL 參數 guided 流程 | ✅ 完成 |
| `questions.js` | 共用題庫（BANK + AGREE_BANK）| ✅ 完成 |
| `writing.html` | 每日 2 句造句，複製 prompt → claude.ai → 貼回記錄 | ✅ 完成 |
| `tracker.html` | 計時器（autostart、切分頁自動暫停）+ 700h 進度 | ✅ 完成 |
| `speaking.html` | 口說日誌：類型/時長/糾錯次數+類型/逐字稿 | ✅ 完成 |
| `listening.html` | 聽力日誌：來源/時長/理解度滑桿/來源分布圖 | ✅ 完成 |
| `map.html` | 課程地圖（60格），第11課 | ✅ 完成 |
| `french_notes.html` | 第1–11課筆記 | ✅ 完成 |
| `table_drill.html` | 動詞變位練習 | ✅ GitHub Pages 部署 |

**GitHub Pages 網址：** https://owenc8964.github.io/french_pronounce/dashboard.html

---

## 本 session 做了什麼（2026-06-27）

1. **speaking.html 新增** — 口說日誌，含糾錯熱點長條圖（6種類型）、chip 雙觸發 bug 修正
2. **三個 bug 修正：**
   - Quiz fill-in：中文 IME Enter 誤送出 → `compositionstart/end` 修正
   - 懸浮 📝 快速筆記：貼到 quiz/dashboard/writing/speaking/tracker 五頁，含「複製全部給 Claude」
   - 計時器：dashboard → `tracker.html?autostart=1` 自動開始；切換分頁自動暫停
3. **listening.html 新增** — 聽力日誌，含理解度滑桿、來源分布圖
4. **dashboard 四技能視圖** — 聽力/閱讀/寫作/口說本週現況卡片，點擊跳對應頁面
5. **code review 死碼清除** — `tracker.html` 的 `tick()` 函式和 `startTs` 變數

---

## 關鍵 localStorage keys

- `clb7_quiz_done` → 今日日期字串（quiz 完成標記）
- `clb7_writing` → [{date, s1, s2, score, reply}]
- `clb7_tracker` → [{ts, date, type, sec}]
- `clb7_speaking` → [{date, type, min, errCount, errTypes, transcript, notes}]
- `clb7_listening` → [{date, source, min, comp, notes}]
- `clb7_<qId>` → {w, c, last}（SRS 單題記錄）
- `clb7_game` → {xp, streak, lastDate}
- `clb7_quick_notes` → [{date, time, page, note}]（懸浮筆記）

---

## 智慧引導流程（已完成）

- dashboard → 開始今日學習 → quiz（最弱 topic，?topic=xxx&guided=1）
- quiz 完成 → banner「回今日學習 →」→ dashboard（Quiz ✓ 完成）
- dashboard → 每日造句（?guided=1）→ 存檔後自動跳回 dashboard（造句 ✓ 完成）

---

## 下一步（依優先序）

1. **Duolingo 週報輸入區** — 每週貼 Duolingo 總結，dashboard 讀取（streak、XP、時數）
2. **四技能視圖優化** — 目前閱讀欄掃描全部 localStorage key 效能稍差，可改用 questions.js BANK 做正確率計算；另外考慮加「最近7天趨勢」小箭頭
3. **兩週後（2026-07-11）** 匯出 quiz 數據做第一次趨勢分析
4. **listening/speaking dashboard 警報** — 超過 3 天沒記錄口說/聽力要提醒

---

## 注意事項

- **懸浮筆記 snippet** 在 quiz/dashboard/writing/speaking/tracker/listening 六頁都有，未來新增頁面記得加
- **四技能閱讀欄** 目前用掃 `clb7_` 開頭的 localStorage key 計算，正確但稍慢；資料多了再優化
- **tracker autostart** 只有從 dashboard「開始計時」才會帶 `?autostart=1`，直接開 tracker.html 不會自動啟動

---

## 核心原則（每次 session 開始前確認）

> 我們在追一個真實目標。
> 不玩努力的遊戲，不做白努力的事。
> 每一個動作都問：「這讓我更接近 2027年6月1日考過 CLB 7 嗎？」
