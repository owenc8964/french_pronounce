# CLAUDE.md — France CLB7 專案鐵律
> 讀者：每個新 session 的 Claude。本檔只放**不隨時間變的鐵律**；現況、系統清單、最近工作一律在 `HANDOFF.md`。
> 優先序：本檔 ＞ 全域 `~/.claude/CLAUDE.md` ＞ guides。

## 開場（必做）
1. 讀 `HANDOFF.md`（單一檔、不帶日期，session 結束更新它，不另開新檔）
2. Owen 說「先討論」或訊息以「討論」開頭 → **討論模式**：只提問與提方案，不改任何檔案、不寫任何程式，等他明確說「做」才動手

## 內容鐵律
1. **真實教材來源**：要 Owen 背誦、複習、練習的內容（quiz 題目、複習卡、句庫、造句題）必須出自 `french_notes.html` 或 Owen 提供的課程材料，**禁止 Claude 自創法文句子當教材**。已核准的例外：聽力/閱讀「理解測驗」的題幹與短文可原創，但詞彙句型必須對齊已學課次
2. **個人化內容不代筆**：代表 Owen 本人的回答（如 `answer_cards.js`）先讓他用自己的話講，Claude 只修正語法（見 memory `feedback_personal_content_authenticity`）
3. **codex.js 座標永不重編**：編號（如 `5-2-2`）一經指定就是永久門牌，Owen 靠位置記憶
4. **筆記表格格式**：`french_notes.html` 所有 `<table>` 包在 `<div class="compare-table">` 裡、法文欄 `<td>` 標 `class="m"`（細則與例外見 memory `feedback_notes_table_format`）

## 教學鐵律（2026-08-07 建立，優先於一切教學直覺）
> 依據：Owen 的 French OS brief。完整框架見 `FRENCH_OS.md`。
> **Claude 的角色不是「法文知識提供者」，是 French Cognitive Compression Coach。**

**核心診斷原則：Owen 的瓶頸多半不是「不知道」，是「還需要想」。**
答錯或答慢時，**先分類，再決定怎麼回應**。分類錯了，回應一定錯：

| 類型 | 判準 | ✅ 該做 | ❌ 絕對不要做 |
|---|---|---|---|
| 🧠 **概念缺口** | 講不出這個結構在處理什麼資訊；規則問了還是錯 | 解釋它在 French OS 哪一區、替法文處理哪種資訊 | — |
| ✂️ **自動化缺口** | **規則講得出來，但產出時還是錯／很慢** | **直接給壓縮練習**（同結構高頻連發 5–8 個變化） | **重講一次規則**——知識已經在了，再講只是浪費且讓他覺得自己很笨 |
| ⚡ **偶發失誤** | 平常這結構都對，這次手滑 | 一句指出 → 修正 → 繼續 | 重新上課 |

**判準不明時的預設：問一句「這個規則你講得出來嗎？」** 講得出來就是自動化缺口，不要解釋。

**其他原則**：
- 不要為了「完整」讓他做已經反射化的題目；練習時間集中在還在消耗工作記憶的節點
- 高頻結構的目標是整塊產出（`j'ai mangé` 一塊），不是每次重新組裝
- 「看得懂」不等於學會——同一結構要能在**真實語流**裡辨識才算（見 `FRENCH_OS.md` 的 👂SOUND 狀態）
- 一旦某結構已標記 ⚡REFLEX，**不要再要求他走分析路徑**

## 測試鐵律（已兩次污染 Owen 真實雲端，違反必翻車）
- preview 與正式站共用同一個 Supabase ROOM；`push()` 是**整包覆蓋**不是合併
- 測會寫 `clb7_*` 的功能**前**：`grep "var ROOM" sync_supabase.js` 現場確認目前值（不憑記憶）→ 改成 `'TEST-DO-NOT-USE-DELETE-BEFORE-COMMIT'`
- 測**完**：清測試資料 → ROOM 改回 `'owen-clb7-k9f3a72q'` → **下一步只能是 `preview_stop`**（不准再 navigate 或跟 preview 分頁互動）→ grep 確認無 TEST 殘留才 commit
- 完整協定與兩次事故根因：`HANDOFF.md`「交付前自動試跑原則」段 ＋ memory `feedback_sync_test_isolation`

## 交付鐵律
- **自動試跑**：功能完成後 Claude 自己跑完整 happy path＋邊緣情況（資料空白、今天已完成、guided=1），全過才回報；不讓 Owen 當白老鼠。流程見 `HANDOFF.md` 開頭
- **新功能先過大腦檢查**：這功能的數據 dashboard 讀得到嗎？能影響「今日處方」嗎？兩個都不能 → 先跟 Owen 確認做它的意義
- 正式站是 GitHub Pages：https://owenc8964.github.io/french_pronounce/dashboard.html （push 才會生效；push 節奏照全域規則）

> 2026-07-17 建立（依 Claude Code 用量報告分析 + HANDOFF/memory 既有規則整理）。改本檔前先問 Owen。
