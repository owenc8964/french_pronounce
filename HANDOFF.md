# CLB7 法語學習系統 — 交接文件

> **給新 session 的 Claude：**
> Owen 的目標只有一個：**2027年6月1日前考過 CLB 7（B2）**。
> 所有工具、系統、計畫都以「真的考過」為前提，不是模擬努力。
> 讀完這份文件就能接上脈絡，直接繼續推進。

---

## 🔁 交付前自動試跑原則（每個功能必做，不等 Owen 說）

實作完成後，**Claude 自己先試跑整個流程**，確認沒問題才回報。

**標準流程：**
1. 啟動 preview server（用 `.claude/launch.json` 的 `france-clb7`，serverId 記起來）
2. `preview_eval` 清空相關 localStorage key，模擬全新狀態
3. 用 `preview_eval` / `preview_click` / `preview_fill` 跑完整 happy path
4. `preview_screenshot` 確認畫面正確
5. 主動找邊緣情況：資料空白時、今天已完成時、guided=1 跳轉時
6. 發現 bug → 自己修 → 重跑 → 確認
7. **全部通過後** 才 commit，問 Owen 要不要 push

**不做的事：**
- ❌ 做完就說「應該可以了」
- ❌ 讓 Owen 自己去點看看
- ❌ 發現問題才說「你要不要試試看」

---

## ⚠️ 做事的核心前提（每次 session 必讀，不可跳過）

**我們在建的不是一堆分開的工具。我們在建一個監控整個學習過程的系統。**

**真正需要的是一個大腦（`dashboard.html`）：**
- 讀取所有工具的 localStorage 數據（quiz 每題對錯、造句分數、學習時數）
- 計算每個 topic 的正確率，找出最弱的地方
- 告訴 Owen 今天具體要做什麼（不是 Owen 自己決定）
- 發出警報：超過 N 天沒練、某 topic 正確率掉了、造句分數退步、時數進度落後

**每次新增功能前，先問：這個功能的數據，dashboard 讀得到嗎？讀到之後，能影響「今日處方」嗎？如果不能，這個功能意義不大。**

---

## 核心目標與現況（2026-06-29 更新）

| 項目 | 內容 |
|------|------|
| **目標** | CLB 7（= CEFR B2）|
| **考試** | TEF Canada 或 TCF Canada |
| **截止日** | 2027年6月1日 |
| **剩餘天數** | 約 337 天 |
| **目前程度** | A1，第13課，約 22 小時課時 |
| **每天目標** | 1.5–2 小時有效練習（含通勤被動聽力）|
| **總時數目標** | 700 小時（多方研究數據交叉驗證）|

---

## 現有系統狀態（2026-06-29）

| 檔案 | 用途 | 狀態 |
|------|------|------|
| `dashboard.html` | 指揮中心：今日處方、警報、倒數、700h 進度、四技能視圖 | ✅ 完成，GitHub Pages 部署 |
| `quiz.html` | SRS Quiz，550+ 題，熱身模式/課程選擇器/暫停功能 | ✅ 完成 |
| `questions.js` | 共用題庫（BANK + AGREE_BANK），第1–13課 | ✅ 完成 |
| `reading.html` | 閱讀理解，8 篇 A1–A1+ 短文，計時+記分 | ✅ 完成，dashboard 已連結 |
| `writing.html` | 每日 2 句造句，複製 prompt → claude.ai → 貼回記錄 | ✅ 完成 |
| `tracker.html` | 計時器（autostart、切分頁自動暫停）+ 700h 進度 | ✅ 完成 |
| `speaking.html` | 口說日誌：類型/時長/糾錯次數+類型/逐字稿 | ✅ 完成 |
| `listening.html` | 聽力日誌：來源/時長/理解度滑桿/來源分布圖 | ✅ 完成 |
| `map.html` | 課程地圖（60格），第13課 | ✅ 完成 |
| `french_notes.html` | 第1–13課筆記 | ✅ 完成 |
| `table_drill.html` | 動詞變位練習 | ✅ GitHub Pages 部署 |

**GitHub Pages 網址：** https://owenc8964.github.io/french_pronounce/dashboard.html

---

## 本 session 做了什麼（2026-06-29）

1. **`reading.html` 新增** — 8 篇 A1–A1+ 法文短文，純法文題目（3題/篇），計時，答錯有解說，分數存 `clb7_reading`，dashboard 已加連結
2. **Quiz 流程重設計** — 「開始今日學習」改為：熱身 5 題 → 課程選擇器（複習筆記 + 開始該課 Quiz） → 完成後回 dashboard 造句
3. **Quiz 暫停功能** — 新增 ⏸ 暫停鍵，題目鎖定，隨時繼續
4. **快速筆記改進** — 存筆記時自動抓當前題目文字＋第幾課 topic，不再脈絡不明
5. **答案 bug 修正** — 第2課「介詞+國家組合」選擇題 `a` 欄位與 opts 不一致（永遠判錯）→ 已修正
6. **aNote 補充** — 「遲到了」→ 法文用現在式（非 PC）；「忘記關門了」→ 標示是 passé composé
7. **第13課筆記** — 健身房詞彙、il faut vs devoir、給建議三種方式、飲食詞彙（gras/salé/sucré）、假期詞彙（Unité 9 開頭）
8. **第13課 Quiz** — 新增 27 題，涵蓋本課所有主題

---

## 關鍵 localStorage keys

- `clb7_quiz_done` → 今日日期字串（quiz 完成標記）
- `clb7_reading` → [{id, title, date, correct, total, sec}]（閱讀理解記錄）
- `clb7_writing` → [{date, s1, s2, score, reply}]
- `clb7_tracker` → [{ts, date, type, sec}]
- `clb7_speaking` → [{date, type, min, errCount, errTypes, transcript, notes}]
- `clb7_listening` → [{date, source, min, comp, notes}]
- `clb7_<qId>` → {w, c, last}（SRS 單題記錄）
- `clb7_game` → {xp, streak, lastDate}
- `clb7_quick_notes` → [{date, time, page, note}]（懸浮筆記，現在含題目脈絡）

---

## 智慧引導流程（已完成）

- dashboard → **開始今日學習** → `quiz.html?mode=warmup&guided=1`（5 題熱身）
- 熱身完 → **課程選擇器**（第1–12課，各有「複習筆記」+「開始 Quiz」）
- 點「複習筆記」→ `french_notes.html#lesson-X`（直接跳到對應課）
- 點「開始 Quiz」→ `quiz.html?lesson=X&guided=1`（該課專項練習）
- Quiz 完成 → banner「回今日學習 →」→ dashboard → 造句

---

## 下一步（依優先序）

1. **閱讀理解加進 dashboard 今日處方** — 讀取 `clb7_reading`，今天還沒做就出現在今日任務；閱讀成績加進四技能視圖的「閱讀」欄
2. **CLB 等級自動判定** — 用 Quiz 正確率判斷 A1/A2/B1 達標（各 topic 均達 75%），顯示在 dashboard
3. **listening/speaking dashboard 警報** — 超過 3 天沒記錄口說/聽力要提醒
4. **閱讀題庫擴充到 20 篇** — 涵蓋更多格式（食譜、新聞短訊、社群貼文）
5. **map.html 更新到第13課** — 目前地圖停在第11課

---

## 關鍵設計決定（已確認）

- 閱讀題目語言：**保持純法文**——讓 Owen 從上下文推敲，答錯有解說；這才是真實 TCF 訓練
- 週趨勢：用 ISO week 字串做 key，每次開 dashboard 自動快照上週
- CLB 等級：**不用課數判定，用 Quiz 正確率**（課數只是家教堂數，不對應程度）
- 熱身後的課程選擇器：**不強迫選哪課**，Owen 自己決定今天要複習哪課

---

## 注意事項

- **懸浮筆記 snippet** 在 quiz/dashboard/writing/speaking/tracker/listening 六頁都有，未來新增頁面記得加
- **quiz.html `choose` 類型題** 的 `a` 欄位必須和 `opts` 裡的字串**完全一致**，不能用 `|` 分隔（`|` 是多答案格式，`choose` 不適用）
- **tracker autostart** 只有從 dashboard「開始計時」才會帶 `?autostart=1`，直接開 tracker.html 不會自動啟動
- **preview server 快取問題**：`questions.js` 會被瀏覽器快取，改完後 preview 裡測試需要新開 server 或 hard reload；實際在 GitHub Pages 用 Cmd+Shift+R 即可

---

## 核心原則（每次 session 開始前確認）

> 我們在追一個真實目標。
> 不玩努力的遊戲，不做白努力的事。
> 每一個動作都問：「這讓我更接近 2027年6月1日考過 CLB 7 嗎？」
