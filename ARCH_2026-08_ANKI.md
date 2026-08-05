# 架構重整：Anki 分工制（2026-08-05 設計）

> **一句話**：Anki 當 Note 資料庫＋卡片模板引擎＋FSRS 排程器；Claude 當語言分析師＋學習策略師＋Knowledge Graph 中樞；asbplayer 當素材擷取器。**Claude 不再自己重做一套 Anki。**
>
> 本檔是架構決策與規格的單一真相來源。動到卡片、複習、排程的任何 session，開工前必讀。
> 相關：`PLAN_2026-08.md`（強化計畫）、`HANDOFF.md`（現況）、`CLAUDE.md`（專案鐵律）。

---

## 1. 現況稽核：哪些功能正在重複實作 Anki

**實測結果（2026-08-05）**：

| 重複項 | 檔案 | 行數 | 說明 |
|---|---|---|---|
| SRS 引擎 ①（複習卡） | `review.html` | 587 | 間隔 1/3/7/14/30、畢業判定、包尾重試 |
| SRS 引擎 ②（造句） | `sentence_drill.html` | 571 | **跟 ① 逐行等價**，只有新卡上限不同（5 vs 10） |
| SRS 引擎 ③（Answer Card） | `answer_card.html` | 594 | **跟 ① 逐行等價**，新卡上限 3 |
| 單題 SRS | `quiz.html` | — | `clb7_<qId>` 每題 {w,c,last} |
| 反射熱力圖 | `verb_sprint.html` | — | 格子歷史（近5筆），另一種變體 |

**三份幾乎一模一樣的複習引擎 ≈ 1750 行**，各自維護三份 localStorage：`clb7_chunk_srs`／`clb7_sentence_srs`／`clb7_answercard_srs`，互不相通。

**資料量**：複習卡 1271、造句句庫 176、題庫 850、Answer Card 15。
⚠️ 其中 `sentences.js` 有 83 句與 `chunks.js` 完全重複（SURVEY 已記錄）——**兩套 SRS 在練同一批句子**，正是這次要根治的病灶。

---

## 2. 應從 Claude 系統移除的功能

移除＝交給 Anki，**不再自己寫**：

| 移除 | 交給 Anki 的什麼 |
|---|---|
| 三套 SRS 的間隔計算與到期判斷 | FSRS |
| 「今天該複習哪些卡」的抽卡邏輯 | Anki 排程器 |
| 新卡上限（10／5／3） | Anki 牌組設定 |
| 包尾重試（答錯排到本輪最後） | Again 按鈕 |
| 畢業判定（3個不同天答對且間隔≥14天） | Anki 卡片狀態 |
| 複習次數／答錯次數／目前間隔的記錄 | Anki 內建統計 |
| 🔴 手動標記不熟（`clb7_hard_flags`） | Anki 的 Marked／Leech 標籤 |
| 卡片正反面版面設計 | Card Template |
| 跨裝置同步（複習進度部分） | AnkiWeb |

**對應要退場的頁面**：`review.html`、`sentence_drill.html`、`answer_card.html`（複習介面部分）。
⚠️ **退場不等於立刻刪檔**——見第 10 節的分期。

---

## 3. Claude 應保留的功能

保留＝Anki 做不到，或做了會變孤島：

### 3a. 語言分析（每則素材）
修正字幕錯字／理解語境／準確翻譯／**判斷素材值不值得留**（保留・合併・只需理解・刪除）／擷取核心語塊／判斷溝通功能／整理可替換句型／產生自然例句／產生口說提示與參考答案／標主題功能能力標籤。

### 3b. Knowledge Graph 中樞
⚡ **重要發現：Knowledge Graph 已經存在，不要另建。**
`codex.js`（9大章50節123條，每條有永久座標如 `5-3-2`）＋ `map.html`（63格課程地圖）＋ `gram_rules.js`（33個文法點）**就是** Knowledge Graph。
→ Schema 的 `KnowledgeGraphNode` **直接填 codex 座標**，不要造新的節點系統。
⚠️ 座標鐵律不變：一經指定永不重編，只能追加。

### 3c. 考試形態訓練（Anki 完全做不到）
這是 Claude 系統存在的**核心理由**——目標是 TEF/TCF，不是泛用語言能力：

| 保留的工具 | 為什麼 Anki 做不了 |
|---|---|
| `quiz.html` 850題 | 依課次／topic／弱點的策略選課，考試題型（fill/choose/trans） |
| `table_drill.html` 46表 | 表格填空，非卡片形態 |
| `verb_sprint.html` | 60秒限時反射，Anki 無時間壓力模式 |
| `gram_trainer.html` | 階段式半開卷→遮規則，Anki 無此概念 |
| `writing.html`＋`writing_tasks.js` | 篇章產出任務 |
| `listening.html` | 真人音檔＋原創四選一，模擬考試形態（不可重播） |
| `reading.html` | 閱讀理解＋發音三層 |
| **口說（S4 待建）** | 提問練習、4/3/2 流利度 |

### 3d. 學習策略與診斷
讀 Anki 複習結果 → 判斷是理解不足還是產出不足 → 決定下一步訓練 → 更新 KG →
餵給 `dashboard.html` 的今日處方。**dashboard 仍然是大腦**，只是它的「複習」那一步變成「去 Anki 做完 N 張」。

---

## 4. 最終版 Anki Note Schema

**24 個欄位。⚠️ ExternalID 必須是第 1 欄**——Anki 匯入時用第一欄比對更新，順序錯了會變成一直新增重複 Note。

| # | 欄位 | 誰填 | 說明 |
|---|---|---|---|
| 1 | `ExternalID` | asbplayer/Claude | **主鍵**，唯一且永久。見第 7 節 |
| 2 | `Sentence` | asbplayer→Claude修正 | 法文原句（字幕常有錯字，Claude 修） |
| 3 | `Translation` | Claude | 中文翻譯 |
| 4 | `ContextBefore` | asbplayer | 前一句 |
| 5 | `ContextAfter` | asbplayer | 後一句 |
| 6 | `Audio` | asbplayer | `[sound:xxx.mp3]` |
| 7 | `Image` | asbplayer | `<img src="xxx.jpg">` |
| 8 | `Source` | asbplayer | 如 `Lupin S01E02` |
| 9 | `SourceURL` | asbplayer | 來源網址 |
| 10 | `KeyChunk` | Claude | 核心語塊（要背的那一小段） |
| 11 | `Function` | Claude | 溝通功能，**受控詞彙**見第 4b |
| 12 | `Pattern` | Claude | 可替換句型骨架 |
| 13 | `ProductionPrompt` | Claude | 口說題目（中文情境提示） |
| 14 | `ProductionAnswer` | Claude | 參考答案 |
| 15 | `PersonalExample` | **Owen 本人** | ⚠️ 見下方鐵律 |
| 16 | `UsageNotes` | Claude | 用法提醒、易混淆、語域 |
| 17 | `ClaudeAnalysis` | Claude | **僅限學習者看得懂的解釋**，不是內部備註 |
| 18 | `KnowledgeGraphNode` | Claude | codex 座標，如 `5-3-2`；可多個用 `;` 分隔 |
| 19 | `AnswerCardID` | Claude | 對應 `answer_cards.js` 的 id，無則留空 |
| 20 | `Level` | Claude | **建議新增**：A1/A2/B1/B2 |
| 21 | `MakeProductionCard` | Claude | `y` 或空 |
| 22 | `MakeListeningCard` | Claude | `y` 或空 |
| 23 | `Status` | Claude | 見第 6 節 |
| 24 | `Tags` | Claude | 受控詞彙，空白分隔（Anki 慣例） |

### 我對原始 Schema 的四個調整（附理由）

1. **新增 `Level`**（A1/A2/B1/B2）。整個系統是 CEFR 分階的（`ROADMAP.md`、`CLB_STAGE`、codex 每條都有 lvl）。沒有這欄就沒辦法「B1 之前先不要啟用這批」，會被超綱素材淹沒。
2. **`ClaudeAnalysis` 收窄定義**：只放**卡背要顯示給學習者看的解釋**。原本的描述太像萬用欄位，會變成傾倒場，日後沒人知道裡面該有什麼。內部判斷理由不要寫進 Anki，留在 Claude 側。
3. **`PersonalExample` 標記為 Owen 本人填** ⚠️ 這是專案既有鐵律（`CLAUDE.md` 內容鐵律第2條／memory `feedback_personal_content_authenticity`）：代表 Owen 本人的內容先由他自己講，Claude 只修語法不代筆。Anki 匯入時這欄留空，之後在 Anki 裡自己補。
4. **`Function` 與 `Tags` 必須是受控詞彙**，不能自由發揮——否則三個月後會有 `expressing_doubt`／`doubt`／`express-doubt` 三種寫法，統計全毀。

### 4b. Function 受控詞彙（第一版，可增不可亂改）
`expressing_doubt`／`expressing_opinion`／`agreeing`／`disagreeing`／`asking_info`／`making_request`／`suggesting`／`refusing`／`apologizing`／`narrating_past`／`describing`／`comparing`／`hypothesizing`／`expressing_emotion`／`social_ritual`

### 4c. Tags 受控前綴
`fr::src::netflix`／`fr::lvl::a2`／`fr::fn::asking_info`／`fr::kg::5-3-2`／`fr::exam::tef_oral`
（用 `::` 是 Anki 的階層標籤語法，之後可以摺疊篩選。）

---

## 5. 最精簡的卡片模板邏輯

**一個 Note Type：`FR_Mining`。兩個 Card Template。條件式生成。**

### Card 1 — Production（口說生成）
```
Front:  {{#MakeProductionCard}}
        {{ProductionPrompt}}
        {{#Image}}<br>{{Image}}{{/Image}}
        {{/MakeProductionCard}}

Back:   {{ProductionAnswer}}
        <hr>
        {{Sentence}} {{Audio}}
        <div class=zh>{{Translation}}</div>
        <div class=chunk>{{KeyChunk}}</div>
        {{#Pattern}}<div class=pat>{{Pattern}}</div>{{/Pattern}}
        {{#UsageNotes}}<div class=note>{{UsageNotes}}</div>{{/UsageNotes}}
        {{#PersonalExample}}<div class=mine>{{PersonalExample}}</div>{{/PersonalExample}}
```

### Card 2 — Listening（聽力辨識）
```
Front:  {{#MakeListeningCard}}
        {{Audio}}
        <div class=hint>（先只聽，不看字）</div>
        {{/MakeListeningCard}}

Back:   {{Sentence}}
        <div class=zh>{{Translation}}</div>
        {{#ContextBefore}}<div class=ctx>… {{ContextBefore}}</div>{{/ContextBefore}}
        {{#ContextAfter}}<div class=ctx>{{ContextAfter}} …</div>{{/ContextAfter}}
        <div class=chunk>{{KeyChunk}}</div>
```

**設計原則**：
- `{{#MakeXxxCard}}` 包住整個 Front — **Front 空白時 Anki 不生成該卡**，這是條件式生成的標準做法
- 只有兩種模板，不再增加。要新練法先問「Anki 模板做得到嗎」，做不到才回 Claude 系統
- `ClaudeAnalysis` 刻意不放進 Back — 卡背太長會拖慢複習節奏。要看深入解釋去 Claude 系統查 `KnowledgeGraphNode`

---

## 6. 資料生命週期

```
raw          asbplayer 剛擷取，Claude 還沒看
  ↓
analyzing    Claude 處理中（批次中途中斷時的狀態）
  ↓
  ├→ approved         ✅ 值得練 → 匯入 Anki 生成卡片
  ├→ understand_only  看懂就好，不做卡（但保留在素材層供日後檢索）
  ├→ merged           跟既有 Note 重複 → 合併，記錄被併入哪個 ExternalID
  ├→ rejected         沒有學習價值（太簡單／太超綱／字幕壞掉）
  └→ needs_review     Claude 判斷不了，要 Owen 決定
                            ↓
                      reviewed（Anki 側狀態，非本欄位）
                      複習結果回流 → Claude 分析弱點 → 更新 KG／調整訓練
```

**規則**：
- **只有 `approved` 進 Anki**。其餘留在素材中繼層（TSV）
- `understand_only` 不刪除——它是日後「這個字我看過」的證據，也是 KG 覆蓋率的一部分
- `merged` 必須記錄併入目標，否則會變成資料黑洞
- 狀態只能單向前進，唯一例外：`approved` → `needs_review`（複習結果顯示這張卡有問題時）

---

## 7. ID 對應設計

| ID | 誰產生 | 用途 | 可變？ |
|---|---|---|---|
| `ExternalID` | 擷取時產生 | **跨系統主鍵** | ❌ 永不變 |
| `AnkiNoteID` | Anki 匯入時 | Anki 內部識別 | Anki 管，Claude 只讀 |
| `AnkiCardID` | Anki 生成卡片時 | 單張卡識別 | Anki 管，Claude 只讀 |
| `KnowledgeGraphNode` | Claude 指定 | 連到 codex 座標 | 可增不可重編 |
| `AnswerCardID` | Claude 指定 | 連到 `answer_cards.js` | — |

### ExternalID 格式
```
FR_<來源>_<作品>_<集數>_<時間碼>
FR_NETFLIX_LUPIN_S01E02_001243
FR_YOUTUBE_INNERFRENCH_EP112_000517
FR_COURS_EDITO_L22_003            ← 課本素材也用同一套
```
規則：全大寫、底線分隔、時間碼 `HHMMSS` 去掉冒號、同一時間碼多句用尾碼 `_2`。

### 對應表
Claude 側維護一份 `anki_map.json`（或 TSV）：
```
external_id  →  anki_note_id  |  anki_card_ids[]  |  kg_nodes[]  |  answer_card_id
```
**由複習結果匯出時回填**，Claude 從不猜測 Anki 的內部 ID。

⚠️ **單一真相來源原則**：`ExternalID` 是唯一跨系統的錨。Anki 的 ID 只在對應表出現，絕不寫進 Claude 側的其他檔案。

---

## 8. Claude → Anki 的固定輸出格式

**第一版：TSV，無表頭，欄位順序嚴格照第 4 節的 1–24。**

### escaping 規則（不遵守會整批匯入錯位）
| 情況 | 處理 |
|---|---|
| 欄位內有 Tab | **禁止**，一律換成空格 |
| 欄位內有換行 | 換成 `<br>`（Anki 欄位吃 HTML） |
| 欄位內有雙引號 | 直接保留，TSV 不需跳脫 |
| 空欄位 | 留空，**不要填 `-` 或 `N/A`** |
| 布林欄（MakeXxxCard） | `y` 或空字串，不用 `true/false` |

### Anki 匯入設定（固定，每次一樣）
- Type：`FR_Mining`
- Deck：`Français::Mining`
- Fields separated by：Tab
- **Existing notes：Update**（靠第1欄 ExternalID 比對）
- Allow HTML in fields：✅ 勾選
- Tags 欄位：對應到第 24 欄

### 輸出前 Claude 的自我檢查（每批必做）
1. 欄位數 = 24（用 Tab 數 = 23 驗證）
2. ExternalID 無重複、格式正確
3. `Status` 全部是 `approved`
4. `Function` 在受控詞彙內
5. `KnowledgeGraphNode` 的座標在 codex 裡真的存在
6. `MakeProductionCard` 和 `MakeListeningCard` **至少一個是 `y`**（兩個都空 = 不會生成任何卡，等於白做）

---

## 9. Anki → Claude 的固定輸入格式

每則一個 JSON 物件，一次一個陣列：

```json
{
  "external_id": "FR_NETFLIX_LUPIN_S01E02_001243",
  "card_type": "production",
  "function": "expressing_doubt",
  "kg_nodes": ["5-3-2"],
  "level": "A2",
  "review_count": 6,
  "lapse_count": 3,
  "current_interval_days": 2,
  "ease_factor": 1.9,
  "last_result": "again",
  "last_review_date": "2026-08-04",
  "due_date": "2026-08-06",
  "mastery_status": "unstable"
}
```

**比原提案多的四欄**（都是判斷弱點必要的）：
- `kg_nodes`：不然 Claude 沒辦法把弱點聚合到文法點層級
- `level`：判斷是不是超綱造成的失敗
- `ease_factor`：FSRS 的難度訊號，比 lapse_count 更早反映問題
- `due_date`：判斷是不是排程本身有問題

### mastery_status 判定（Claude 側算，不是 Anki 給的）
| 狀態 | 條件 |
|---|---|
| `new` | review_count = 0 |
| `learning` | interval < 7 天 |
| `unstable` | lapse_count ≥ 3 **或** interval 曾經 >7 天又掉回 <3 天 |
| `stable` | interval ≥ 21 天且近3次無 again |
| `mastered` | interval ≥ 60 天 |

### Claude 依此判斷什麼
| 觀察 | 推論 | 動作 |
|---|---|---|
| listening 卡穩、production 卡一直 again | **聽得懂但說不出來** | 加強提示、拆成更小的 KeyChunk |
| 同一 `Function` 多張都 unstable | 溝通功能層級的缺口 | 升級成完整 Answer Card |
| 同一 `kg_node` 多張都 unstable | 文法點沒真的懂 | 回 `gram_trainer.html` 練該點 |
| 少數卡 lapse ≥ 8 | Leech，卡片本身有問題 | 改成 `needs_review`，重寫或拆卡 |
| 大量 stable | 該升難度 | 調整素材 Level 門檻 |

---

## 10. 第一版做什麼／之後再自動化

### ✅ 第一版（手動為主，不碰 AnkiConnect）
1. 建 `FR_Mining` Note Type（24 欄）＋ 兩個 Card Template
2. 定 Deck 結構與 FSRS 參數
3. Claude 產 TSV → Owen 手動匯入
4. 走通 **10–20 則**素材的完整流程，確認卡片實際複習起來順手
5. 複習兩週後，Owen 從 Anki 匯出 CSV → Claude 轉成第 9 節的 JSON → 做第一次弱點分析

### ⏸ 明確不做（等 Schema 穩定）
AnkiConnect 雙向自動化／自動讀 raw Notes／自動回寫／自動更新 KG／即時同步

**理由**：Schema 一改，自動化全部要跟著改。先讓 20 則跑過完整循環，確認欄位夠用也沒多餘，再談自動化。

### 🔜 第二版（Schema 穩定後）
AnkiConnect 讀 raw → Claude 分析 → 自動更新同一 Note；複習結果自動回流；KG 自動更新。

---

## 11. 雙重真實來源稽核

| 風險 | 現況 | 處置 |
|---|---|---|
| **`chunks.js` vs `sentences.js`** | 83 句完全重複，兩套 SRS 在練同一批 | 遷移時合併成一批 Anki Note，**兩個檔案都退出複習用途** |
| **課本內容 vs Anki** | ⚠️ **最大風險**：若課本卡留在 `review.html`、影片卡進 Anki → 又是兩個系統 | **見下方決策** |
| Knowledge Graph | `codex.js` 已是唯一來源 | ✅ 不新建，Schema 直接引用座標 |
| Answer Card | `answer_cards.js` 唯一來源 | ✅ Anki 只存 `AnswerCardID` 指標，不複製內容 |
| 複習排程 | 目前三份 localStorage | 全部退場，Anki 唯一 |
| 音檔／圖片 | asbplayer → Anki media | Anki 唯一，Claude 不存副本 |

### ⚠️ 必須現在決定的一件事：課本內容去哪？

**建議：課本的「記憶型」內容也遷進 Anki，用同一套 Schema**（ExternalID 前綴 `FR_COURS_`）。

理由：如果課本卡留在 `review.html`、影片卡在 Anki，你每天要在兩個地方複習，就是你這次要消滅的問題。

**分界線很清楚**：
- **記憶與提取**（複習卡、造句、Answer Card 複習）→ **Anki**
- **考試形態訓練**（quiz、填表格、動詞衝刺、文法路徑、寫作、聽力測驗、閱讀、口說）→ **Claude 系統**

`chunks.js`／`sentences.js` 變成**素材來源檔**（生成 Anki Note 用），不再是複習資料庫。

---

## 12. 複雜度與維護成本

| 指標 | 現在 | 之後 |
|---|---|---|
| SRS 實作 | **5 套** | **0 套**（Anki 全包） |
| 複習介面程式碼 | ~1750 行三份重複 | 兩個 Card Template |
| 排程相關 localStorage key | 6 個以上 | 0（Anki 管） |
| 跨裝置同步風險 | **已推空 3 次** | AnkiWeb |
| 修改一處影響他處 | 高（三份要同步改） | 低（Schema 是唯一契約） |

**最大的收穫不是省程式碼，是消滅「規則不一致」這一類 bug**——三份引擎各改各的，本來就遲早會漂移。

---

## 開工前必讀
- 本檔（架構契約）＋ `CLAUDE.md`（專案鐵律）＋ `HANDOFF.md`（現況）
- ⚠️ **Schema 未穩定前不要做自動化**
- ⚠️ `PersonalExample` 由 Owen 本人填，Claude 不代筆
- ⚠️ codex 座標鐵律：可增不可重編
- ⚠️ 測會寫 `clb7_*` 的功能前一律先切隔離 ROOM（協定見 `CLAUDE.md`）
