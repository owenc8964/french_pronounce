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

四個互相連動的 HTML 檔，部分推上 GitHub Pages：

| 檔案 | 用途 | 部署 |
|------|------|------|
| `french_notes.html` | 課堂筆記（本機查閱） | 本機 only |
| `french_basics.html` | 數字/發音/文法表（三個 tab） | https://owenc8964.github.io/french_pronounce/french_basics.html |
| `quiz.html` | 抽考練習 SRS + 快速測驗 | https://owenc8964.github.io/french_pronounce/quiz.html |
| `map.html` | CLB7 課程地圖（本機查閱） | 本機 only |

**本機路徑：** `/Users/owen/Documents/Claude/Project/CLB test/France CLB7/`

**Git repo：** https://github.com/owenc8964/french_pronounce（main 分支）

---

## 目前進度

- **課程：** CLB7（目標 B2），目前 A1 階段
- **已上：** 第 1–4 課
- **Quiz BANK 題數：** 140 題（課程 SRS 練習，第 1–4 課）
- **AGREE_BANK 題數：** 247 題（⚡ 快速測驗 專用）
- **地圖進度：** 13 / 60 格已解鎖（CURRENT_LESSON = 4）

### 已解鎖的地圖格子

```
A1: greetings, classroom, numbers, nationality, dates, etre-avoir,
    er-verbs, articles, family, couleurs
A2: loisirs, nourriture, ir-re
```

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
- 雙擊加備注

**Tab 2：🎵 Sons du Français**
- IPA 音標卡片 + 時間戳音訊
- 雙擊加備注（localStorage: `fr_sound_notes`）

**Tab 3：📊 文法表**
- 所有格、冠詞、疑問詞、動詞變位（être/avoir/-er/-ger）、職業性別規則、國籍形容詞
- 每個表格有 **✏️ 筆記**（localStorage: `fr_tbl_notes`）
- 點 `.pron` 格（藍色粗體法文）可聽 TTS 發音

### `quiz.html`

#### 課程練習 BANK（114 題，第 1–3 課）

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
- 複習輪（`drillPhase = 'review'`）：錯的題目無縫銜接在主輪後
  - 答對 → 900ms 後自動下一題
  - 答錯 → 1500ms 後重試同題（直到答對）
- 複習輪完成 → 顯示總結（主輪分數 + 複習輪改正題數）

**情境推理（🔗 chain 題）：**
- 以 Nina/Théo 婚禮賓客名單為情境
- 考多步推理：「Théo 的媽媽的姐妹的丈夫 → 他是 → son oncle」
- AGREE_BANK 項目加 `chain: true` 標記，顯示時有藍色 🔗 badge

### `map.html`

- 60 格地圖，4 個區域：A1（15）/ A2（15）/ B1（15）/ B2（15）
- 解鎖：找 tile 的 `id`，把 `unlocked:false` 改成 `unlocked:true, lesson:N`
- 更新 `const CURRENT_LESSON = N;`

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

## 規劃中的功能（尚未實作）

- **Phase 3：** map ↔ quiz 打通（點地圖格子跳到對應 quiz）
- **Phase 4：** 日常練習流程（今日新題 + SRS 弱點混合）
- **文法表擴充：** 每學新語法就往 Tab 3 補表格
- **AGREE_BANK 擴充：** 加入更多情境鏈題（家庭、工作場景等）

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
A：主輪 20 題答完後，錯的題目無縫接續（不顯示中間畫面），review 輪答錯會原地重試直到答對。主輪分數在進入 review 輪前已鎖定。

---

## 下個 Session 啟動 Prompt

> 把以下這段貼給新的 Claude Code session：

```
請先讀 HANDOFF.md（在 /Users/owen/Documents/Claude/Project/CLB test/France CLB7/）。

Owen 在學法語，目標一年內考過 CLB7（B2）。目前完成第4課，系統包含：
- french_notes.html：課堂筆記（第1-4課）
- quiz.html：SRS 題庫（BANK 140題）+ 快速測驗（AGREE_BANK 247題）
- map.html：課程地圖（13/60格已解鎖）
- french_basics.html：數字/發音/文法表

【本次任務】（請從這裡描述要做什麼）
```

常見任務範例：
- 「這是第N課的筆記，請整理並直接寫進檔案」→ Claude 自動加筆記+quiz題+建議解鎖地圖格
- 「請參考 PDF 補充 passé composé 的快速測驗題」
- 「quiz.html 加入 PC vs imparfait 情境判斷題，第5課」
