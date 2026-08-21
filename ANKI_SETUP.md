# Anki 設定指南（照著做一次就好）

> 對應架構文件：`ARCH_2026-08_ANKI.md`。這份是**操作步驟**，在 Anki 桌面版做（手機版不能建 Note Type）。
> 全部做完大約 20 分鐘。做完之後 Schema 就固定了，之後只是匯入資料。

---

## 步驟 1：建 Note Type

`工具 → 管理筆記類型 → 新增 → 新增：基本 → 命名為 FR_Mining`

然後 `欄位…`，把預設的「正面／背面」改掉，**照下列順序建 24 個欄位**。

⚠️ **順序不能錯，`ExternalID` 必須是第 1 欄**——Anki 匯入時用第一欄比對來決定「更新既有筆記」還是「新增」。順序錯了會每次匯入都產生重複卡。

```
1   ExternalID
2   Sentence
3   Translation
4   ContextBefore
5   ContextAfter
6   Audio
7   Image
8   Source
9   SourceURL
10  KeyChunk
11  Function
12  Pattern
13  ProductionPrompt
14  ProductionAnswer
15  PersonalExample
16  UsageNotes
17  ClaudeAnalysis
18  KnowledgeGraphNode
19  AnswerCardID
20  Level
21  MakeProductionCard
22  MakeListeningCard
23  Status
24  Tags
```

**欄位設定**（在欄位編輯畫面右側）：
- `Sentence`、`KeyChunk`、`Pattern`、`ProductionAnswer`、`PersonalExample` → **排序欄位可設 Sentence**
- 全部欄位的「使用 HTML 編輯器」不用特別勾。**TSV 內容一律不放 HTML 標籤**（見下方「強調的寫法」），所以匯入時的「允許 HTML」勾不勾都不會壞
- `Sentence` 的語言可設 `fr`（影響拼字檢查，非必要）

---

## 步驟 2：建兩個卡片模板

`管理筆記類型 → FR_Mining → 卡片…`

### 卡片 1：改名為 `Production`

**正面模板**
```html
{{#MakeProductionCard}}
<div class="prompt">{{ProductionPrompt}}</div>
{{#Image}}<div class="img">{{Image}}</div>{{/Image}}
{{#Function}}<div class="fn">{{Function}}</div>{{/Function}}
{{/MakeProductionCard}}
```

**背面模板**
```html
<div class="answer">{{ProductionAnswer}}</div>
<hr id=answer>
<div class="fr">{{Sentence}}</div>
<div class="audio">{{Audio}}</div>
<div class="zh">{{Translation}}</div>
{{#KeyChunk}}<div class="chunk">🔑 {{KeyChunk}}</div>{{/KeyChunk}}
{{#Pattern}}<div class="pat">🧩 {{Pattern}}</div>{{/Pattern}}
{{#UsageNotes}}<div class="note">{{UsageNotes}}</div>{{/UsageNotes}}
{{#PersonalExample}}<div class="mine">✍️ {{PersonalExample}}</div>{{/PersonalExample}}
{{#KnowledgeGraphNode}}<div class="kg">📚 {{KnowledgeGraphNode}}</div>{{/KnowledgeGraphNode}}
```

### 卡片 2：`新增卡片類型` → 命名為 `Listening`

**正面模板**
```html
{{#MakeListeningCard}}
<div class="audio big">{{Audio}}</div>
<div class="hint">先只聽，不要看字</div>
{{/MakeListeningCard}}
```

**背面模板**
```html
<div class="fr">{{Sentence}}</div>
<div class="zh">{{Translation}}</div>
<hr id=answer>
{{#ContextBefore}}<div class="ctx">… {{ContextBefore}}</div>{{/ContextBefore}}
{{#ContextAfter}}<div class="ctx">{{ContextAfter}} …</div>{{/ContextAfter}}
{{#KeyChunk}}<div class="chunk">🔑 {{KeyChunk}}</div>{{/KeyChunk}}
{{#Source}}<div class="src">{{Source}}</div>{{/Source}}
```

⚠️ **`{{#MakeXxxCard}}` 一定要包住整個正面**——正面算出來是空的時候，Anki 就不會生成那張卡。這是條件式生成的關鍵，包錯位置會變成每則都生兩張。

---

## 步驟 3：樣式（貼進 `樣式` 分頁，兩個模板共用）

```css
.card {
  font-family: -apple-system, "Helvetica Neue", sans-serif;
  font-size: 20px;
  text-align: center;
  color: #2b2b2b;
  background: #fdfcfa;
  padding: 16px;
}
.nightMode .card { color: #ddd8cc; background: #16181d; }

.prompt   { font-size: 22px; line-height: 1.5; margin-bottom: 10px; }
.fr       { font-size: 26px; font-weight: 600; color: #1a4a7a; margin: 8px 0; line-height: 1.4; }
.nightMode .fr { color: #7ab8e8; }
.answer   { font-size: 24px; font-weight: 600; color: #1a6a3a; line-height: 1.4; }
.nightMode .answer { color: #6ed49a; }
.zh       { font-size: 17px; color: #666; margin: 6px 0; }
.nightMode .zh { color: #999; }
.chunk    { font-size: 17px; color: #b8860b; margin-top: 10px; }
.pat      { font-size: 16px; color: #7a5aa8; margin-top: 4px; }
.note     { font-size: 15px; color: #777; margin-top: 10px; line-height: 1.5; }
.mine     { font-size: 16px; color: #1a6a3a; margin-top: 10px; font-style: italic; }
.kg       { font-size: 13px; color: #999; margin-top: 12px; }
.fn       { font-size: 13px; color: #999; margin-top: 8px; }
.ctx      { font-size: 15px; color: #888; margin: 3px 0; }
.src      { font-size: 12px; color: #aaa; margin-top: 12px; }
.hint     { font-size: 14px; color: #999; margin-top: 12px; }
.img img  { max-width: 90%; max-height: 240px; border-radius: 8px; }
.big      { font-size: 30px; }
hr#answer { border: none; border-top: 1px solid #ddd; margin: 14px 0; }
.nightMode hr#answer { border-top-color: #3a3a3a; }
```

---

## 步驟 4：牌組結構

⚠️ **子牌組不用先建父層**——Anki 靠名字裡的 `::` 決定階層。按「建立牌組」後直接輸入 `Français::Cours`，母牌組 `Français` 會自動生出來。再建一次 `Français::Mining` 即可。

```
Français
├── Français::Mining      ← 影片素材（asbplayer 來的）
└── Français::Cours       ← 課本內容（chunks/sentences 遷移過來的）
```

分兩個子牌組的理由：課本內容跟考試進度綁定、影片素材是額外輸入，**兩者的每日新卡上限應該不同**。

---

## 步驟 5：FSRS 與每日上限

`牌組齒輪 → 選項`

⚠️⚠️ **2026-08-17 Owen 實作時踩到、原本漏寫的一步：每日上限不是掛在牌組上，是掛在「預設組態」（preset）上。**
所有牌組預設都指向同一組 `Default`，所以直接改會兩個牌組一起變，做不出 10／5 的差別。

**正確做法**：打開 `Français::Mining` 的選項 → **視窗最上面的組態下拉選單** → 右邊 `⋮` → **「複製預設組態」** → 命名 `Mining` → 這時改上限才只影響 Mining。改完回去確認 `Français::Cours` 仍是 10。

- **啟用 FSRS**（新版 Anki 有獨立的 FSRS 區塊；舊版在「進階」分頁，再舊要先升級）
- `Français::Cours`：新卡上限 **10／天**、複習上限 **不限**（用預設組態）
- `Français::Mining`：新卡上限 **5／天**、複習上限 **不限**（⚠️ 要用自己的組態，見上）
- 兩者「最大間隔」預設 36500 不用改
- **先不要調 FSRS 參數**——它需要至少幾百筆複習記錄才能最佳化，跑一兩個月後用「最佳化」按鈕自動算

> 新卡上限沿用你原系統的數字（複習卡 10／造句 5），這樣節奏不會突然改變。

---

## 步驟 6：匯入設定（每次都一樣）

`檔案 → 匯入 → 選 TSV 檔`

| 設定 | 值 |
|---|---|
| 筆記類型 | `FR_Mining` |
| 牌組 | 課本 → `Français::Cours`／影片 → `Français::Mining` |
| 欄位分隔 | **Tab** |
| 既有筆記 | **更新**（Update existing notes） |
| 比對欄位 | 第 1 欄（ExternalID） |
| 允許 HTML | 勾不勾都可以（TSV 不含 HTML 標籤；2026-08-19 起） |
| Tags 欄位 | 對應到第 24 欄 |

⚠️ 「既有筆記＝更新」這項如果選錯成「忽略」或「複製」，重新匯入時就不會更新內容，或者會產生重複。

### ExternalID 是永久門牌（2026-08-19 立規，弄丟過 3 張卡）

**第 1 欄的 `FR_COURS_REC_0xx` 一經發出就綁死那張卡，永遠不重用、不重編**——跟 `codex.js` 的座標同一條鐵律。匯入時「既有筆記＝更新」是靠這一欄比對的：**同一個號碼配上不同內容，就是直接覆蓋掉原本那張卡**，Anki 不會問你。

- 產新一批卡時，**號碼從收藏檔目前的最大號 +1 開始**，不要從 1 或從上一批的開頭重新數。
- 同一批卡改寫後要重出檔，**沿用原本的號碼**（那才是「更新」）。
- 2026-08-19 的事故：`anki_batch02_recycled.tsv` 跟 `anki_recycled_v2.tsv` 各自從 REC_001 開始編，中間差了一號，兩個檔一起匯之後 35 張被錯位覆蓋、3 張內容完全消失（已用新號碼 REC_067~069 補回）。

### 匯入前一定要先跑守門員

```bash
python3 tools/anki_precheck.py ~/Desktop/要匯的檔.tsv
```

會擋下三件事：**撞號但內容不同**（覆蓋別張卡）、**含 HTML 標籤**（正面印出裸露的 `<b>`）、**欄位數不是 24**（整排位移）。全綠才匯。它只讀收藏檔的複本，不會動到 Anki 任何資料。

**這是 Claude 的責任不是 Owen 的**：TSV 交出去之前 Claude 要先跑到全綠（2026-08-21 Owen：「以後你產卡要自己先檢查」）。

⚠️ **讀收藏檔時一定要連 `collection.anki2-wal` 一起複製**。Anki 開著的時候最新的變更還在 WAL 裡，只複製 `collection.anki2` 會讀到舊資料——2026-08-19 就因此誤判成「Owen 沒匯入」。`anki_precheck.py` 已經處理掉這件事。

### 檔案放哪

TSV 一律放專案的 `anki/`（**已 gitignore**，只留本機）：真相來源是 Anki 收藏檔本身（有 AnkiWeb 同步當備份），TSV 只是工作區。已作廢、跟收藏檔衝突的檔案丟 `anki/_已匯入作廢/`，**不要留在桌面**——一個誤點就會覆蓋掉一批卡。

### 強調的寫法（2026-08-19 立規，踩過一次）

**TSV 裡永遠不要放 `<b>`、`<br>` 或任何 HTML 標籤。** 要強調就用全形括號：

| 符號 | 用途 | 例 |
|---|---|---|
| `【】` | **單字卡的群組前綴**（保留用途，不可挪作他用） | `【住宅】閣樓` |
| `〔〕` | **句子裡要對焦的字** | `「Je n'ai pas 〔le temps〕」跟「Quel 〔temps〕 fait-il ?」` |

**原因**：匯入時若沒勾「允許 HTML」，Anki 會把 `<` 轉成 `&lt;`，卡片正面就直接印出 `<b>le temps</b>` 這種東西給你看。2026-08-19 就是這樣壞掉 18 張——**檔案沒錯、AnkiWeb 沒錯，是一個勾選框**。全形括號在勾與不勾兩種情況下都正常，直接把這個地雷拆掉。

**如果哪天又看到裸露的標籤**：在瀏覽器搜尋 `&lt;` 就知道中了幾張；修法是把 TSV 的標籤換成全形括號後重新匯入（第 1 欄比對、更新既有筆記，排程進度不受影響），或用「尋找並取代」勾正則跑 `&lt;(/?b)&gt;` → `<$1>`。

---

## 步驟 7：驗收（建完馬上做）

> **什麼時候可以跳過**：如果第一批卡是 Claude 用產生器產的，第 1～3 點已經由產生器的自檢擋掉了（每筆保證至少一個 `MakeXxxCard=y`）。直接匯入真檔、確認筆數對、抽一張看正反面即可。手動測試筆記只在「自己手動建卡」或「懷疑模板包錯位置」時才需要。

手動新增一則測試筆記，確認：

1. `MakeProductionCard` 填 `y`、`MakeListeningCard` 留空 → **只生成 1 張 Production 卡**
2. 兩欄都填 `y` → **生成 2 張卡**
3. 兩欄都留空 → **不生成任何卡**（Anki 會提示「空白卡片」）
4. `Audio` 欄填 `[sound:test.mp3]` 且檔案在媒體資料夾 → 卡片會自動播放
5. 手機同步後，卡片樣式正常、音檔能播

第 3 點特別重要——確認之後，就知道「Claude 忘了填 MakeXxxCard」時是安靜地不生成卡，而不是生出壞卡。所以 **Claude 側的自檢清單要擋這件事**（見 `ARCH_2026-08_ANKI.md` 第 8 節）。

---

## 完成後

回報「Note Type 建好了」，我就開始產第一批 TSV——建議拿**第 22 課**當白老鼠（15–20 則），跑通完整循環再談遷移 1271 張。
