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

## 本 session 做了什麼（2026-06-28）

1. **Duolingo 週報區塊** — dashboard 新增輸入面板，存 `clb7_duo`，顯示本週數據＋比上週趨勢＋累計 XP/分鐘
2. **四技能視圖優化** — 閱讀改用 BANK + qId 精準計算；四技能全部加本週 vs 上週 ↑↓% 箭頭
3. **週趨勢分析架構** — 自動快照上週數據（`clb7_snapshots`），最多顯示 4 週橫向對比表，7/11 起有真實數據
4. **第12課筆記** — 身體部位、健康詞彙、情緒表達、Passé composé(2)、Pronom y（完整加進 french_notes.html）
5. **第12課 Quiz** — 新增 51 題（body-health 21 + passe-compose 擴充 + pronom-y 6）
6. **閱讀理解題庫開始建立** — 測試 2 批共 8 篇，Owen 全對（24/24）；A1 太簡單，A1+ 文章 OK 但**題幹法文太難**，下次問題需簡化或加中文提示

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

1. **閱讀理解題庫建進系統** — 把 8 篇已測試的短文做成 `reading.html`，計時做題＋記錄分數進 dashboard；題目語言改為中文或加提示
2. **CLB 等級自動判定** — 用 Quiz 正確率判斷 A1/A2/B1 達標（各 topic 均達 75%），顯示在 dashboard
3. **listening/speaking dashboard 警報** — 超過 3 天沒記錄口說/聽力要提醒
4. **閱讀題庫擴充到 20 篇** — 涵蓋更多格式（食譜、新聞短訊、社群貼文）

## 關鍵設計決定（本 session 確認）

- 閱讀理解難度：**文章 A1+ 完全沒問題（24/24 全對）**，難度可繼續升級
- 閱讀題目語言：**保持純法文，不加中文**——讓 Owen 從上下文推敲，答案解說再解釋；這才是真實 TCF 訓練
- 週趨勢：用 ISO week 字串做 key，每次開 dashboard 自動快照上週
- CLB 等級：**不用課數判定，用 Quiz 正確率**（課數只是家教堂數，不對應程度）

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
