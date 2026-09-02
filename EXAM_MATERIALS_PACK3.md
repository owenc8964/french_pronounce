# EXAM_MATERIALS_PACK3.md — TCF 第三包材料索引

> 2026-09-01 建立、09-02 收尾。⚠️ **本檔在 repo 裡，材料本身在 `assets/tcf/pack3/`（gitignore，不進 repo）。**
> 來源：LINE 傳來的 `tcf canada 160篇 111.zip`，99 MB／解壓 0.14 GB／28 檔（26 PDF ＋ 2 docx）。
> 安全掃描：**0 危險副檔名、0 路徑穿越、0 加密、0 符號連結，2 個 docx 均無巨集**。
> ⭐ 這包與前兩包性質不同：**幾乎全是文字層 PDF（26 個裡 24 個），而且按月份更新到 2025.11**。

---

## 1　⭐ 口語更新（`TCFCANADA更新/口语更新/`，15 份）

**本包最有價值的一區。** 檔名帶月份：`05.31`／`6.4`／`2025.7+8`／`2025.9`／`2025.10`／`2025.11`。

- **1-1　`口语第三部分按主题分类题目目录.pdf`** ⭐⭐ **最乾淨的一份**
  → `_analyse/T3_sujets_par_theme.json`　**128 題／7 主題**
  `La famille, l'éducation, le bonheur 30｜Technologie 24｜Immigration 22｜`
  `La politique, la société, la justice 18｜Métier 13｜L'environnement… 13｜Culture 8`
- **1-2　T3 更新檔 8 份** → `_analyse/T3_sujets_updates.json`　**45 題**
  ⚠️ **只有 5 份有產出**（最新T3口语稿 15／口语Tach 3更新 12／口语T3-2025更新 10／
  口语T3移民类带分析和替换 6／口语T3部分更新 2）。
  ⛔ **`2025.10 口语TACH 3`、`6.4口语T3更新`、`2025.7+8口语Tâch3更新` 抽出 0 題**
  ——版面與規則不合，**不是沒內容，是還沒處理**。
- **1-3　T2 檔 4 份** → `_analyse/T2_situations.json`
  **法文情境 20 條 ＋ 只有中文標題的 9 條**（博物馆信息咨询／共享汽车／报摊／想买二手车…）
  ⚠️ T2 檔有**三種版面**：①編號後直接是情境 ②只有中文標題＋問句 ③`Tâche 2 :` 明確標記

### ⭐ 去重結果
本包不重複 T3 題目 **164** 題，其中 **126 題不在既有的 167 題裡**
→ **合併後 Tâche 3 題庫可達 293 題**（`_analyse/T3_all_dedup.json`）

---

## 2　寫作更新（`TCFCANADA更新/写作更新/`，3 份）
`2025.9 写作TACH 2&3更新`（5 頁）／`写作T3-2024更新篇`（9 頁）／`写作tâch1`（43 頁）
⚠️ **尚未萃取。**

## 3　備考主資料（`TCF CANADA备考/`，9 份）

- **3-1　`DES　IDEES.pdf`**（51 MB／98 頁）⚠️ **與第一包同一本**，已 OCR 過
  （`assets/.ocr_口语写作语料素材库DES　IDEES.txt`），**不用重跑**
- **3-2　`fle-franais-口语写作T3主题词汇.pdf`**（35.7 MB／143 頁）🖼 掃描檔
  → 2026-09-01 已送 OCR，⚠️ **結果尚未檢查**
- **3-3　`Débattre en FLE 口语写作结构连词都有！.pdf`**（258 頁，有文字層）
  ⭐ 結構與連接詞 —— **形式層材料**（見 `STRATEGY` 原則 5-bis），尚未萃取
- **3-4　`DELF_55热.pdf`**（226 頁，有文字層）DELF 熱門題，尚未判讀
- **3-5　寫作範文** `tâche1 35篇`／`tâche2 37篇`／`tâche3 37篇` = **109 篇**
  ⛔ 依原則 5-bis：**只抽骨架與連接詞，不抽內容**
- **3-6　`T2.T3口语稿.pdf`**（50 頁）＋ `口语Part2 思路.docx` — 別人的口語稿，⛔ 同上

---

## 3-bis　⭐⭐ 這包裡有兩本**正式出版的 B2 教科書**（不是合輯）

### `Débattre en FLE` — Stéphanie Holleville，**Ellipses 2021**，ISBN 9782340-047501
副標：**「Toutes les clés pour argumenter et exprimer son opinion」**，等級 **B1–C2**，258 頁。
⭐⭐ **整本就是論述與表達意見** —— 正是 `STRATEGY` 原則 6 說的 B2 判準（讓步／假設／權衡）。

**PARTIE 1 Méthodologie 的結構**（已抽出 → `_analyse/debattre_structure.json`）
| 頁 | 章節 |
|---|---|
| p10 | **TROUVER DES ARGUMENTS** ← 含 ⭐ **méthode QQOQCP**（Qui, Quoi, Où, Quand, Comment, Pourquoi）|
| p13 | PRATIQUE — *Comment trouver des arguments ?* |
| p15 | **EXPRIMER L'OPINION** |
| p19 | **EXPRIMER SON ACCORD ET SON DÉSACCORD** |
| p22 | Exprimer l'accord |

⭐ **QQOQCP 跟備考寶典的「維度化思考」是同一類技巧**（解決「腦袋空白」），
但這本是正式方法論書，且等級到 C2。

**全書 258 頁的論述連接詞頻次**（⭐ 比 180 篇範文那批**語域更高**）：
`par ailleurs 38｜en effet 28｜toutefois 26｜or 15｜néanmoins 15｜bien que 14｜certes 10｜`
`dès lors 10｜dans la mesure où 7｜en revanche 6｜même si 6｜étant donné que 6｜cependant 5｜`
`de ce fait 5｜force est de constater 2`

⚠️ 對照 180 篇範文抽出的（`également 50｜de plus 46｜ainsi 39｜car 35｜tandis que 30`）：
**範文那批是 B1–B2 的基本連接詞，這本是 B2–C2 的高階連接詞**（`or`／`dès lors`／`néanmoins`／
`force est de constater`）。→ **升級層（原則 6）的工具箱應該以這本為主。**

### `fle-franais-口语写作T3主题词汇` = 《FLE Objectif B2 — Vocabulaire thématique》
Laure Garnier／**Ellipses**，143 頁，2026-09-01 已 OCR（245 KB）。
每節結構固定：`L'essentiel` → `Pour mémoire` → `La liste` → ⭐ **`Cap sur le B2`**（A/B/C 子節）
已知章節：`Section 1 Le travail`／`Section 2 L'environnement et l'écologie`／`Section 3 Le cinéma et les séries`…
→ `_analyse/vocab_b2_toc.json`

⚠️ **這兩本是商業出版品**（Ellipses），跟前面的淘寶合輯性質不同。

---

## 3-ter　2026-09-01 續：寫作與 DELF 已萃取

### `DELF_55热`（226 頁，Macorrection.fr）
⭐ **`_analyse/DELF_55_themes.json`：55 / 55 主題全數抽出，法中對照、零缺漏。**
標示 `Niveau B1/B2`，每主題約 4 頁。**這份的中文標題品質最好**（原本就是法中雙欄目錄）。
樣本：`Le paiement mobile 移動支付 p7`／`Le télétravail 遠端辦公 p11`／
`L'Intelligence Artificielle 人工智慧 p35`／`La télémédecine 遠端醫療 p99`／
`Le robot, le meilleur ennemi de humain? 機器人，人類就業的最大敵人？ p151`

⚠️ **萃取這份踩到兩個坑，都是版面問題**：
1. **雙欄排版**（法文 x0≈164–310／中文 352–436／頁碼 473+），按行重建會讓法中**錯開一格**
2. **每頁的欄位起點會位移**（p1 標記在 x0≈164、p2 在 x0≈146）→ 前 9 條之後直接跳到第 20 條
→ 改成**每頁自動偵測標記欄的眾數 x**，再依此推算法文欄起點，才 55/55 全中。

### 寫作
- **`写作tâch1.pdf`（43 頁）** → `_analyse/ecrit_T1_sujets.json`　**52 條法文題目**（含中文情境標題）
  樣本：*Votre ami Mehdi vient d'emménager dans votre ville et cherche des renseignements
  sur les moyens de transports. Écrivez un message…*
- ⚠️ **`2025.9 写作TACH 2&3更新`（5 頁）與 `写作T3-2024更新篇`（9 頁）只有範文＋主題標題，
  沒有法文題目** —— 依原則 5-bis 範文不採用，可用內容僅主題標題。

---

## 4　⚠️ 已知缺口（誠實記錄）

1. ✅ **已釐清：3 個 T3 更新檔抽出 0 題是「正確結果」，不是失敗。**
   實際檢視版面後確認它們**只有範文，沒有題目**：
   `2025.10 口语TACH 3` 與 `2025.7+8口语Tâch3更新` 是「`1.` ＋ 直接接答案」；
   `6.4口语T3更新` 只有**中文主題標籤**（如「年轻人拒绝变老（医美整容主题）」）＋答案。
   → 依原則 5-bis **範文不採用**，這三份的可用內容僅為中文主題標籤。
2. ✅ **寫作更新已處理**（見 3-ter）：`写作tâch1` 抽出 52 題；另兩份只有範文
3. 🔸 **`Débattre en FLE` 已抽章節與連接詞頻次**（見 3-bis），⚠️ 但**內文方法論尚未細讀**（QQOQCP 的實際操作步驟）
4. ✅ **`DELF_55热` 已判讀**：55/55 主題法中對照全抽出（見 3-ter）
5. ✅ **3-2 的 OCR 已完成並檢查**（245 KB，確認是 Ellipses 出版的 B2 詞彙書，見 3-bis）
6. **這 293 題還沒有中文翻譯**（既有 167 題有，新增的 126 題沒有）


---

## 7　✅ 2026-09-02 收尾：六個缺口全清完

| 原缺口 | 結果 |
|---|---|
| 3 個 T3 檔抽出 0 題 | ✅ **是正確結果**：那三份只有範文沒有題目（依原則 5-bis 不採用）|
| 寫作更新 3 份沒動 | ✅ `写作tâch1` 抽出 **52 條法文題目**；另兩份只有範文 |
| `Débattre en FLE` 沒萃取 | ✅ 方法論全抽 → `_analyse/METHODE_ARGUMENTATION.md` |
| `DELF_55热` 沒判讀 | ✅ **55/55 主題法中對照，零缺漏** |
| OCR 結果沒檢查 | ✅ 確認是 Ellipses 出版的《FLE Objectif B2 Vocabulaire thématique》|
| 新增題目沒有中文 | ✅ **已翻譯，見下** |

### 7-1　⭐ Tâche 3 題庫最終數字（⚠️ 取代先前的「293 題」）

| | 題數 | 中文來源 |
|---|---|---|
| 既有（材料原附中文）| 167 | 材料 |
| 本包新增（已翻譯）| **113** | **Claude（標記 `zh_src:"claude"`）** |
| **合併去重後** | **280** | — |

⚠️ **先前交接檔寫的「293 題」是去重前的數字**。跨兩份來源共抓到 **12 組重複**
（含 `Tâche 3:` 前綴那批，以及只差一個長音符 `Êtes`／`Etes` 的——第一次指紋沒去重音所以漏抓）。

**⭐ 已發布 Artifact（法／繁中對照、可搜尋、九大主題篩選）**：
`https://claude.ai/code/artifact/9e84cf3c-1225-437c-b7ce-dc0ff3de915c`
主題分佈：`移民・文化・旅遊 51｜教育・家庭 46｜科技・網路 41｜工作・職業 33｜社會・政治 27｜環境・動物 26｜其他 22｜人際・自我 20｜健康・生活 14`

### 7-2　⭐⭐ 法文來源驗證（Owen 09-02 要求）

把所有原始 PDF 抽成 **54 萬字語料**，逐條比對新增的 119 題：

- **118 條完全逐字符合**
- **1 條僅修長音符**（原檔 `Etes-vous`／標準法文 `Êtes-vous`）→ 原文存在 `fr_source` 欄位並註明
- **2 條原本被行末截斷** → 回原檔取完整版，**非自行補寫**

**題目與範文分離檢查**：0 條含範文結構詞（`Premièrement`／`En conclusion`／`Personnellement, je pense`）、
0 條超過 150 字、0 條沒有問句標記。**⛔ 範文一律留在原檔，沒有進題庫。**

### 7-3　⚠️ 這一輪踩到的坑（都是版面問題，值得記住）

1. **一把抓抽出 1215 條** → 大量是**別人寫的口語稿不是題目**。三種檔案結構完全不同
   （純題目／題目＋範文／情境＋稿子），**必須先開檔看版面再寫規則**。
2. **文字抽出來會黏在一起**（`Qu'enpensez-vous?`）→ 要用 `extract_words` 依座標重建行。
3. **雙欄表格按行讀會錯開一格**（`L'inflation` 配到「通貨膨脹**社交媒體**」）→ 要按 x 座標分欄。
4. **每頁欄位起點會位移**（p1 標記在 x0≈164、p2 在 146）→ 要**每頁自動偵測標記欄的眾數 x**。
5. **去重指紋要先去重音**，否則 `Êtes` 與 `Etes` 會被當成兩題。
