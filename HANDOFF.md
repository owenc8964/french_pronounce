# CLB7 法語學習系統 — 交接文件

> 給新 session 的 Claude：Owen 在學法語（CLB7 課程，目前 A1），
> 這份文件是完整的專案快照，讀完就能直接上手。

---

## 戰略分析：A1 → CLB7（B2）一年路線圖

### 最高優先：接下來必須攻的文法
| 優先 | 主題 | 時間點 |
|------|------|--------|
| ★★★ | Passé composé（être vs avoir + 分詞配合） | 第5課起 |
| ★★★ | PC vs imparfait 情境判斷 | B1 衝刺期 |
| ★★★ | COD/COI 代名詞（le/la/lui/leur/y/en） | A2 後期 |
| ★★ | 否定句 ne...jamais/plus/rien | A2 |
| ★★ | 相對代名詞 qui/que/dont/où | B1 |
| ★ | Subjonctif（B2 必考） | B1 後期 |

### Quiz 系統下一步演進
目前 AGREE_BANK 練「選正確的形」（247 題）。  
下個階段需加：
- **情境判斷題**：給情境選 PC vs IMP
- **錯誤偵測題**：這句哪裡錯？
- **純輸出題**（無選項）：填空/翻譯

### 一年時間表
```
現在（A1）→ 第3個月  : A2 衝刺（PC, IMP, 代名詞, 否定）
第3-6個月             : A2 完成 → B1
第6-9個月             : B1（時態綜合/相對子句/複雜句構）
第9-12個月            : B2/CLB7 衝刺（subjonctif/聽力/寫作）
```
前提：每週上課 + 每天 30 分鐘自學（聽力輸入尤其重要）。

---

## 專案概覽

五個互相連動的 HTML 檔，部分推上 GitHub Pages：

| 檔案 | 用途 | 部署 |
|------|------|------|
| `french_notes.html` | 課堂筆記（本機查閱） | 本機 only |
| `french_basics.html` | 數字/發音/文法表（三個 tab） | https://owenc8964.github.io/french_pronounce/french_basics.html |
| `quiz.html` | 抽考練習 SRS + 快速測驗 | https://owenc8964.github.io/french_pronounce/quiz.html |
| `table_drill.html` | 表格填空練習（動詞/形容詞/冠詞/介係詞） | https://owenc8964.github.io/french_pronounce/table_drill.html |
| `map.html` | CLB7 課程地圖（本機查閱） | 本機 only |

**本機路徑：** `/Users/owen/Documents/Claude/Project/CLB test/France CLB7/`

**Git repo：** https://github.com/owenc8964/french_pronounce（main 分支）

---

## 目前進度

- **課程：** CLB7（目標 B2），目前 A1/A2 交界
- **已上：** 第 1–8 課
- **Quiz BANK 題數：** 342 題（課程 SRS 練習，第 1–8 課）
  - 第1課 63 / 第2課 54 / 第3課 26 / 第4課 39 / 第5課 38 / 第6課 16 / 第7課 56 / 第8課 50
- **AGREE_BANK 題數：** 247 題（⚡ 快速測驗 專用）
- **地圖進度：** 19 / 60 格已解鎖（CURRENT_LESSON = 8）。本次新解鎖：heure、transports（對應第6課）、vetements（對應第7課）、meteo、futur-proche、routine（對應第8課）

### 第8課已涵蓋內容（french_notes Lesson 8，來源：Édito Unité 5-6，0614 課堂逐字稿+講義截圖）
- 形容詞位置（前置 vs 後置）：petit/grand/bon/beau/joli/nouveau 等短形容詞前置，顏色/國籍/材質一律後置；beau→bel/belle/beaux、nouveau→nouvel/nouvelle/nouveaux 母音變形；des→de（形容詞前置+複數時）
- 服飾/配件/材質補充詞彙（imperméable、bijoux、ceinture、parapluie/parasol、en cuir/laine/soie/lin）
- 尺碼量法：faire（衣服）vs chausser（鞋子）、tour de taille/poitrine
- 天氣 météo（il fait/il y a/il pleut/il neige 三種結構）+ 時間定位（en/au + 季節、en + 月份、début/mi/fin + 月份）
- Futur proche 完整變位（aller + infinitif）+ venir 變位
- 指示形容詞 ce/cet/cette/ces（含母音變形 cet，與定冠詞唯一性對比 la tour Eiffel）
- 科技/日常物品詞彙 + "Ça sert à quoi ?" 句型 + se connecter/se repérer 反身動詞 vs 一般動詞對比（類比 appeler/s'appeler）
- 反身動詞日常作息（se réveiller/se doucher/s'habiller/se coiffer/se maquiller/se coucher）

### 第7課已涵蓋內容（french_notes Lesson 7，來源：Édito Cahier Unité 4 p.46-48 + Unité 5 p.55-66）
- Se déplacer：按距離給建議（marcher/trottinette/vélo/covoiturage）、jusqu'à、arrêt/station/ligne/itinéraire
- 連接詞 pour/parce que/mais/avec/sans + la semaine vs le week-end
- 服裝購物（Vinted 情境）：衣物/配件詞彙、材質 en cuir/coton/laine、neuf vs d'occasion、尺碼問法、時尚表達（il me plaît / il me va bien）
- vendre & mettre 完整變位（mettre 注意 nous/vous/ils 雙 tt）
- 動詞三組分類（-ER/-IR/不規則）
- 大數字（million/milliard 複數規則）

### 🧩 句型框架庫（新功能，2026-06-期間新增）
- 不屬於任何課，獨立放在 `french_notes.html` 最上方（`<div class="unit" id="frame-lib">`，第1課 details 之前）
- 頂部 meta 列有快捷連結 `<a href="#frame-lib">🧩 句型框架庫</a>`
- 動機：Owen 反饋「選字會選，但串不成句」→ 需要先背句型骨架，再換詞練習
- 內容：7 個框架（主詞+動詞+冠詞+名詞 / à+地點 / 否定句 / 形容詞性數一致 / il y a / avoir 感受句 / ce-cet-cette-ces）
- 例句直接取自 Owen 的 Duolingo 截圖錯題（見下方分析），更有記憶點
- **下次可擴充**：可以再加框架（如 COD/COI 代名詞句型、futur proche 等），格式參考現有 7 個

### 已解鎖的地圖格子

```
A1: greetings, classroom, numbers, nationality, dates, etre-avoir,
    er-verbs, articles, family, couleurs, heure
A2: loisirs, nourriture, ir-re, transports, vetements, meteo,
    futur-proche, routine
```

### 建議下次解鎖
- 第9課若教 passé composé → 解鎖 `passe`（A2 區）
- 第9課若教 ne...pas 以外的否定句型已涵蓋（第6課已解鎖否定擴充內容但 `negation` 格子尚未點亮）→ 可評估是否該解鎖 `negation`

### 第6課已涵蓋內容（french_notes Lesson 6）
- L'heure：heure 陰性 / midi / minuit / et quart / et demie / moins le quart / 12h vs 24h 系統
- 否定擴充：ne...jamais / ne...rien / ne...personne / ne...plus
- 城市詞彙：centre-ville / banlieue / quartier / voies（rue/avenue/boulevard）/ lieux（mairie/gare/commissariat 等 14 個）
- voilà/voici 區別 + près de / loin de 距離表達
- Les transports：à（非機動）vs en（機動）完整表 + covoiturage / gratuit
- L'impératif：tu/nous/vous 三人稱、-ER tu 去 s、être/avoir/aller 不規則、否定命令句

### 第5課已涵蓋內容（french_notes Lesson 5）
- 商店與店員（boulangerie/boucherie/épicerie/poissonnerie/fromagerie + chez vs à la）
- 不定量冠詞（du / de la / de l' / des）+ 否定句 → pas de
- 餐廳點餐：菜單結構・料理・點餐句型・牛排熟度・餐桌擺設
- -ir 動詞（choisir/finir）、manger（nous mangeons）
- 不規則動詞總表：être / avoir / aller / faire

---

## 各檔案說明

### `french_notes.html`

- 課程用 `<details class="lesson-group" id="lesson-N">` 包起來（預設收合，最新課 `open`）
- 每堂課有多個 `<div class="unit">` 區塊
- **✏️ 筆記按鈕位置：** 在 `.unit-header` 最右側（unit-lesson span 之後），點擊展開 textarea 緊貼 header 下方
  - Textarea 用 `unit.insertBefore(box, header.nextSibling)` 插在 header 正下方
  - localStorage key: `fr_unit_notes`
- **雙擊 `.phrase-list li` 行內備注：** 雙擊任意詞條行開啟/收合小備注欄
  - localStorage key: `fr_li_notes`（key = `li_` + li 文字前 60 字）
- TTS（🔊）自動覆蓋的選擇器：
  - `.phrase-list li` → 念 `.fr` 的文字
  - `.compare-table td.m` / `td.f` → 念單字
  - `.fr-ex` → 念行內法文例子
- TTS 會自動過濾 emoji、⚠️、❤、! 等裝飾符號
- **加新課內容：** 在最後一個 `</details>` 前加新的 `<details>` + `<div class="unit">`

### `french_basics.html`（三個 Tab）

**Tab 1：🔢 數字 / 星期 / 月份**
- 數字卡片（0–99、特殊規律如 71/81）、星期、月份
- **十位數 dizaines 區塊：** 10/20/30/40/50/60/70/80/90 全部獨立展示，含 soixante-dix/quatre-vingts/quatre-vingt-dix 規律說明
- 雙擊加備注

**Tab 2：🎵 Sons du Français**
- IPA 音標卡片 + 時間戳音訊
- 雙擊加備注（localStorage: `fr_sound_notes`）

**Tab 3：📊 文法表**
- 所有格、冠詞、疑問詞、動詞變位（être/avoir/-er/-ger）、職業性別規則、國籍形容詞
- 每個表格有 **✏️ 筆記**（localStorage: `fr_tbl_notes`）
- 點 `.pron` 格（藍色粗體法文）可聽 TTS 發音

### `quiz.html`

#### 課程練習 BANK（236 題，第 1–6 課）

- 題庫在 `const BANK = [...]`，每題格式：

```js
{ lesson:N, type:'fill'|'trans'|'gender'|'choose',
  q:'題目', hint:'提示', a:'答案|別案', aNote:'說明',
  askClaude:true  // 只有 trans 題才加
}
```

- **SRS 系統：** 每題答對/錯記在 `localStorage`（key: `clb7_q_...`），錯 2 次以上 = 弱點題
- **三種模式：** 📚 一般練習 / 🎯 弱點模式 / 🔀 混合複習
- **加新課題目：** append 到 BANK 陣列尾端，`lesson` 填對應課號

**「其實對 ✓」覆蓋按鈕：**
- 當系統判斷錯誤時，答題卡片下方（SRS 模式）和填空格（drill 模式）各有一個「其實對 ✓」按鈕
- 按下後：`srs.w--; srs.c++;`，分數改為答對，同時從錯題複習佇列移除
- 用於口音/拼法微差但語意正確的情況（例如多/少一個空格）
- SRS 模式：`overrideCorrect()`、drill 模式：`overrideDrillCorrect()`

#### ⚡ 快速測驗（AGREE_BANK，119 題）

獨立題庫，專門訓練性數一致（gender / number agreement）的直覺反應。

**題型分布：**
| 類別 | 題數 |
|------|------|
| être 變位 | 10 |
| avoir 變位 | 10 |
| -er 動詞變位 | 20 |
| 所有格形容詞 | 20 |
| 冠詞（定冠詞+不定+國家介係詞） | 13 |
| 形容詞性數變化 | 15 |
| 運動/職業 | 4 |
| 🔥 綜合挑戰 | 15 |
| 🔗 情境推理（Nina/Théo 親戚鏈） | 20 |
| 🌍 國籍形容詞 陰陽/複數（Unité 1） | 20 |
| ✈️ 介係詞＋國家 en/au/aux（Unité 1） | 12 |
| 📰 定冠詞 le/la/l'/les（Unité 1-2） | 10 |
| 🥖 部分冠詞 du/de la/de l'/des（Unité 3） | 10 |
| 🔢 單數/複數（Unité 3） | 8 |
| 🟢 -ir 動詞 choisir/finir（Unité 3） | 11 |
| 🚶 aller 變位（Unité 3） | 8 |
| 🏪 地點介係詞 chez/à/au（Unité 3） | 8 |
| ❓ Quel/quelle/quels/quelles（Unité 1） | 9 |
| 👔 職業陰陽補充（Unité 2） | 6 |
| 🎨 顏色形容詞 陰陽/複數（Unité 4） | 18 |

**機制：**
- 每輪抽 20 題（加權取樣：`weightedSample(arr, 20)`）
- 常錯的題目出現機率更高（錯 3 次以上 → 抽到機率 4×）
- SRS 記在 `localStorage`（key: `clb7_dq_...`）

**答題流程（Phase State Machine）：**
- 主輪（`drillPhase = 'main'`）：答完 20 題 → 分數鎖定
- 主輪結束後，若有錯題 → 進入複習輪（`drillPhase = 'review'`）
- 複習輪採**分輪制**（不在當場立即重試）：
  - 答對 → 顯示解說，等待手動按「下一題」
  - 答錯 → 顯示解說，等待手動按「下一題」，**錯題累積到子輪結束才開下一輪重考**
  - 若整個子輪只有 1 題且答錯 → 「↺ 重試此題」按鈕，原題重試
- 每一輪結束後，若還有新錯題 → 再開一個子輪；直到全部答對才顯示完成畫面
- 主輪分數在進入複習輪前已鎖定

**疑慮旗標功能（⚑）：**
- 每題右上角有一個小紅圓點按鈕
- 點擊 → 標記此題有疑慮（題目錯誤 or 答案有疑問）；再按取消
- 旗標存入 `localStorage`（key: `clb7_drill_flags`，格式：題目 ID 的 Set）
- 完成畫面會列出所有被標記的題目，供下次更新時審查

**練習回饋功能（完成後）：**
- 完成畫面下方有 textarea，可輸入本次練習的目標 / 狀況 / 心得
- 支援語音輸入（🎙 按鈕，Web Speech API，語言 zh-TW）
- 回饋存入 `localStorage`（key: `clb7_drill_sessions`，格式：最近 50 筆，含日期 / 分數 / 旗標清單）

**情境推理（🔗 chain 題）：**
- 以 Nina/Théo 婚禮賓客名單為情境
- 考多步推理：「Théo 的媽媽的姐妹的丈夫 → 他是 → son oncle」
- AGREE_BANK 項目加 `chain: true` 標記，顯示時有藍色 🔗 badge

### `table_drill.html`

表格填空練習，練習動詞變位、形容詞、冠詞、介係詞等需要大量機械記憶的內容。

**三個難度：**
| 難度 | 空格規則 |
|------|----------|
| 初級 | 僅顯示 `h:true`（較難）的格子為空白，`h:false`（核心）格有提示 |
| 中級 | 演算法：找最後一個含 `h:false` 格的列（`midHintRow`），只顯示該列的 `h:false` 格，其餘全空 |
| 高級 | 全部空白 |

**資料結構：** 每列為陣列，元素可為字串（固定顯示）或 `{a:'答案', h:bool}` 物件  
- `h:false` = 核心知識（初級會顯示作為提示）  
- `h:true` = 延伸知識（初級就要填）

**目前 21 個表格：**
- 動詞：être / avoir / aller / faire / parler / aimer / s'appeler / acheter / choisir / finir / manger + 四動詞綜合（être/avoir/aller/faire × 6 人稱）
- 形容詞：vert / blanc / violet / orange+marron / français / tunisien / espagnol + 所有格（6×3 完整表）
- 冠詞：部分冠詞（du/de la/de l'/des/de）/ 定冠詞 / 不定冠詞
- 介係詞：交通（à/en × 6 種）/ 商店（chez/à la/au/à l'）

**特色功能：** 口音輸入列（é/è/ê/ë/à/â/ç/ù/û/î/ï/ô/œ/æ）、TTS、每格 ✓/✗ 即時反饋、完成摘要、進度條

**加新表格：** 在 `const TABLES = [...]` 尾端加新物件，格式參考現有表格。

---

### `map.html`

- 60 格地圖，4 個區域：A1（15）/ A2（15）/ B1（15）/ B2（15）
- 解鎖：找 tile 的 `id`，把 `unlocked:false` 改成 `unlocked:true, lesson:N`
- 更新 `const CURRENT_LESSON = N;`

---

## 題庫更新前的 SOP（Claude 每次必做）

**⚠️ Owen 在 GitHub Pages 上練習（手機或其他裝置），不在這台電腦上。**
**因此無法自動讀取練習資料，更新前請先請 Owen 做這件事：**

> 「請開 quiz.html → 完成畫面按「📊 弱點分析」→ 按「📋 複製全部」→ 貼給我」

拿到分析資料後：
1. 找出 `topWrong` 的共同錯誤模式
2. 看 `recentSessions.feedback` 用戶感知的困難
3. 看 `flagged` 有問題的題目
4. 根據分析改題、補題，結果寫進 memory

---

## 每堂課後的 SOP

### Step 1：貼上課堂筆記

直接把筆記（文字 + 截圖）貼進 Claude Code：

> 「這是第 N 課的筆記，請整理並直接寫進檔案。」

Claude 會自動：
1. 把筆記 HTML 寫入 `french_notes.html`（新 `<details>` 加在最後一個 `</details>` 前）
2. 把 quiz 題目 append 到 `quiz.html` BANK 尾端
3. 回報建議解鎖的地圖格子 id

### Step 2：確認 + 解鎖地圖

> 「地圖點亮這些：[id 清單]，CURRENT_LESSON 改成 N」

### Step 3：推上 GitHub

```bash
cd "/Users/owen/Documents/Claude/Project/CLB test/France CLB7"
git add quiz.html french_basics.html
git commit -m "第N課：XXX"
git push
```

（`french_notes.html` 和 `map.html` 只在本機用，不用 push）

---

## 筆記 HTML 格式參考

```html
<details class="lesson-group" id="lesson-N" open>
<summary><span class="summary-num">第N課</span><span class="summary-title">【主題】</span></summary>

<div class="unit">
  <div class="unit-header">
    <span class="unit-tag">第N課</span>
    <span class="unit-title">【小節標題】</span>
    <span class="unit-lesson">Unité N</span>
  </div>

  <h3>小節名稱</h3>
  <ul class="phrase-list">
    <li><span class="fr">法文</span><span class="zh">中文說明</span></li>
  </ul>

  <div class="rule">
    <div class="label">重點</div>
    規則說明，法文例子用 <span class="fr-ex">exemple</span> 包起來
  </div>

  <div class="compare-table">
    <div class="compare-title">表格標題</div>
    <table>
      <tr><th>欄1</th><th>欄2</th></tr>
      <tr><td>je</td><td class="m">suis</td></tr>
    </table>
  </div>

  <div class="note">
    備注說明（不加 emoji，會被 TTS 讀出）
  </div>
</div>

</details>
```

## Quiz 題目格式參考

```js
{ lesson:N, type:'fill',   q:'題目 _____ (動詞)',   hint:'提示', a:'完整答案|只填空白', aNote:'解釋' },
{ lesson:N, type:'trans',  q:'中文句子',            hint:'提示', a:'法文答案|別案',     aNote:'', askClaude:true },
{ lesson:N, type:'gender', q:'單字 → 女性形？',     hint:'規則', a:'女性形',           aNote:'說明' },
{ lesson:N, type:'choose', q:'問題',                hint:'',     a:'答案|別案',         aNote:'說明' },
```

每課題量：fill × 4–8、trans × 4–6、gender × 3–5（有教才出）、choose × 3–5

---

## 技術細節備忘

### TTS（兩個檔案通用原則）
- 聲音：Amélie（fr-FR）優先
- 速度：`rate = 0.8`（basics）/ `0.7`（notes）
- 自動過濾：`(m)` `(f)` `(f.pl)` / ` / ` 轉逗號 / 所有 emoji 與裝飾符號
- 電話號碼：偵測 `XX XX XX XX XX` 格式 → 轉法文讀法（0–99 查找表）

### localStorage 結構
```
clb7_q_{key}      → { w: 錯誤次數, c: 答對次數, last: timestamp }  ← quiz SRS（課程練習）
clb7_dq_{key}     → { w: 錯誤次數, c: 答對次數 }                   ← drill SRS（快速測驗）
clb7_game         → { xp, streak, lastDate }
fr_card_notes     → { card-id: '備注文字' }  ← Tab 1 卡片
fr_sound_notes    → { son-0: '備注' ... }    ← Tab 2 Sons
fr_tbl_notes      → { tbl_xxx: '備注' }      ← Tab 3 文法表
fr_unit_notes     → { u_標題: '備注' }       ← french_notes.html unit（header 按鈕）
fr_li_notes       → { li_文字前60字: '備注' } ← french_notes.html phrase-list 行內雙擊備注
```

### map.html tile id 完整清單
```
A1: greetings, classroom, alphabet, numbers, heure,
    nationality, family, description, dates, couleurs,
    etre-avoir, er-verbs, articles, pronouns, questions

A2: maison, routine, nourriture, transports, ville,
    vetements, meteo, loisirs, achats, sante,
    ir-re, passe, imparfait, futur-proche, negation

B1: travail, etudes, voyages, actualites, culture,
    opinions, problemes, experiences, lecture, rediger,
    futur, subjonctif, relatifs, discours, idiomes

B2: pluperfect, cond-passe, subj-passe, passe-simple, concordance,
    passive, gerondif, pron-avances, registres, connecteurs,
    argumentation, textes-longs, vocab-pro, nuances, autonomie
```

---

## 本次 Session 修復的 Bug（2026-05-29）

| 問題 | 根本原因 | 修法 |
|------|----------|------|
| quiz choose 題沒有選項按鈕 | BANK 的 choose 題沒有 `opts` 陣列，`renderCard()` 只有文字輸入框 | 全部 40/41 題加上 `opts`；新增 `pickBankOpt()` 函式；`renderCard()` 有 opts 就顯示按鈕 |
| quiz 一次出 220 題 | `restart()` 把整個 BANK 全丟入 queue，沒有 session 上限 | 加 `SESSION_SIZE = 20`，改用 `buildSession()` 分層抽樣，確保 choose 每次出現 3–4 題 |
| quiz 提示直接洩題 | hint 預設顯示，`hint:'je + habiter'` 這種等於答案 | 改為「💡 提示」按鈕，點擊才顯示 |
| table_drill 完全空白 | `note` 欄位中的法文縮寫 `s'il vous plaît` 和 `s'appelle` 的單引號截斷 JS 字串 → 整個 script 解析失敗 | 移除衝突文字 / 改用雙引號包字串 |
| table_drill easy 模式全空格 | 部分冠詞、商店介係詞表格全部 h:true，easy 模式沒有任何提示格 | 各表格改 2 個格子為 h:false，提供基礎範例作為提示 |

## 本次 Session 修復的 Bug（第7課那次）

| 問題 | 根本原因 | 修法 |
|------|----------|------|
| table_drill 完全沒題目（cardArea 空白） | `TYPE_LABEL` 用 `const` 宣告在第671行，但頁面載入的 IIFE 在第602行就執行 `startSession()`→`renderCard()`，存取尚未初始化的 `const` → temporal dead zone ReferenceError，靜默失敗 | 把 `TYPE_LABEL` 宣告移到 IIFE 之前（狀態變數區） |
| quiz 新增第7課題目後，瀏覽器讀到 0 題 | 瀏覽器快取住舊版 JS，沒有反映檔案最新內容 | `window.location.reload(true)` 強制重新整理 |

### quiz 錯題複習機制改版（本次調整）

舊機制：答錯的題目集中到 `resurface` 陣列，主隊列跑完後彈出「複習錯題」分隔卡，按按鈕才開始複習輪；複習輪裡再答錯就直接消失，不會再考。

新機制（Owen 要求：「錯的題目應該直接接續在後頭作答，再錯就排到下一輪後頭，做到對為止」）：
- 移除 `resurface` / `resurfaceDone` 變數
- 答錯時直接 `queue.push({ ...q, _review: true })` — 題目立刻接到當前隊列尾端，同一個 session 內會自動再考一次
- 再答錯 → 再 push 一次，持續累積在隊列尾端，直到答對才會被 `overrideCorrect()` 從後方隊列移除
- `renderCard()` 不再檢查 resurface，純粹看 `current >= queue.length` 就結束
- 影響範圍：只動了課程練習 BANK 的 SRS 流程（`recordResult` + `pickBankOpt` 的答錯分支 + `overrideCorrect`），**沒有動到 ⚡快速測驗（AGREE_BANK）的分輪複習機制**，那邊維持原本「子輪結束才開下一輪」的設計

---

## 規劃中的功能（尚未實作）

- **Phase 3：** map ↔ quiz 打通（點地圖格子跳到對應 quiz）
- **Phase 4：** 日常練習流程（今日新題 + SRS 弱點混合）
- **文法表擴充：** 每學新語法就往 Tab 3 補表格
- **AGREE_BANK 擴充：** 加入更多情境鏈題（家庭、工作場景等）
- **句型框架庫擴充：** 目前只有 7 個框架，可視 Owen 學習進度加入新框架（futur proche、COD/COI 代名詞句型等）

---

## Duolingo 錯題分析（2026-06 期間，113 張截圖）

Owen 反饋：Duolingo 的句子很有學習意義（會糾正出他以為對的誤區），但截圖之後不知道怎麼歸納整理、加深記憶。已分析 `/Users/owen/Desktop/duolinguo/` 下 113 張截圖（用 Agent 逐張讀取），整理出 5 大誤區並寫入句型框架庫：

1. **冠詞選擇**（錯誤率最高）：le/la/un/une/du/de la/des 混用，尤其音樂類（du jazz）、不可數液體（du lait）
2. **動詞變位**：tu/vous/il/elle 形混淆（tu est→tu es、je vient→je viens、elle veux→elle veut）
3. **介詞 à + 地點**：常漏掉 à（On va la piscine → On va à la piscine）
4. **ce/cet/cette/ces**：陽性母音開頭名詞忘記用 cet（le animal → cet animal）
5. **avoir vs être 感受句**：il est chaud（物熱）vs il a chaud（人覺得熱）混用

**已處理：** 上述 5 大誤區的代表句已整理進 `french_notes.html` 的句型框架庫（框架1-7）。

**尚未處理：** 截圖裡還有其他次要錯誤類型（代詞 ça/eux、副詞位置、pas du tout vs pas d'accord 等），若 Owen 之後想要更完整的錯題本或想把這些補進 quiz 題庫，可以重新 Agent 讀取同一批截圖（路徑不變），或請 Owen 持續把新的 Duolingo 截圖存進同一個資料夾，下次一次處理。

**桌面資料夾：** `/Users/owen/Desktop/duolinguo/`（Owen 持續儲存新截圖的地方，目前 113 張，命名格式 IMG_XXXX.PNG）

---

## 常見問題

**Q：quiz 在手機打不開？**
A：用 Safari 開 GitHub Pages 網址，不能從「檔案」app 開本機 HTML。

**Q：french_notes.html TTS 沒聲音？**
A：用電腦 Chrome/Safari，iOS 本機 HTML 不支援 JS。

**Q：新加的 quiz 題目課堂按鈕沒出現？**
A：`buildLessonButtons()` 自動從 BANK 讀取 lesson 值，加了新題重新整理即可。

**Q：文法表的法文格點了沒有發音？**
A：確認在 Tab 3（📊 文法表），點藍色粗體 `.pron` 格。Tab 1/2 不適用此功能。

**Q：快速測驗的錯題怎麼處理？**
A：主輪 20 題答完後，錯的題目進入複習輪（分輪制）。每輪結束後才集中重考錯題，而不是當下立即重試。若子輪只剩 1 題且答錯，才會原題重試（避免永遠循環）。每題右上角有紅點可標記疑慮，完成後可輸入練習回饋。

---

## 下個 Session 啟動 Prompt

> 把以下這段貼給新的 Claude Code session：

```
請先讀 HANDOFF.md（在 /Users/owen/Documents/Claude/Project/CLB test/France CLB7/）。

Owen 在學法語，目標一年內考過 CLB7（B2）。目前完成第8課，系統包含：
- french_notes.html：課堂筆記（第1-8課）+ 句型框架庫（不分課，頂部快捷連結 #frame-lib）
- quiz.html：SRS 題庫（BANK 342題，第1-8課，錯題會直接接續在隊列後重考至答對）+ 快速測驗（AGREE_BANK 247題）
- table_drill.html：表格填空練習（動詞/形容詞/冠詞/介係詞，21個表格，三難度）
- map.html：課程地圖（19/60格已解鎖，CURRENT_LESSON = 8）
- french_basics.html：數字/發音/文法表（含十位數 dizaines）

GitHub Pages：https://owenc8964.github.io/french_pronounce/
（注意：french_notes.html 和 map.html 只在本機，不會出現在 GitHub Pages 上）

如果 Owen 提到「handout」，先確認他是指「下一堂課的課文 PDF」還是「HANDOFF.md 交接文件」— 這兩個詞容易聽混。

【本次任務】（請從這裡描述要做什麼）
```

常見任務範例：
- 「這是第N課的筆記，請整理並直接寫進檔案」→ Claude 自動加筆記+quiz題+建議解鎖地圖格
- 「請參考 PDF 補充 passé composé 的快速測驗題」
- 「quiz.html 加入 PC vs imparfait 情境判斷題，第5課」
