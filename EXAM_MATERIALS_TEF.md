# TEF Canada 材料索引
> ⛔ **材料本身留在本機 `assets/tcf/tef/`，不進 repo。本檔只是索引。**


> 🗂 **2026-09-01：本檔搬進 git 版控**（原本在 `assets/tcf/` 底下、被 gitignore 一起擋掉）。
> **索引與工具進 repo，材料本身不進**——`assets/tcf/` 那條 gitignore 原封不動。
> ⚠️ 這個 repo 是**公開**的：本檔只描述材料、不含任何考題本體，考題全在 gitignore 的 JSON 裡。

> 2026-08-31 建立。來源 `~/Downloads/TEF CANADA.zip`（341 MB／解壓 0.40 GB）。
> 安全掃描：**0 危險副檔名、0 路徑穿越、0 加密、0 符號連結**。
> ⚠️ 編號是永久門牌，一經指定不重編。要加就往後追加。
> ⚠️ 原包有兩個坑已處理：`__MACOSX/` 全是資源分支垃圾；每個檔案都有 `(1)` 重複版本。
> **去重後實際 122 個檔：12 個 PDF ＋ 109 個 mp3 ＋ 1 個 m4a。**
> （2026-09-01 更正：原本寫「12 PDF ＋ 109 mp3」＝121，**漏算了一個 `.m4a`**，
> 就是官方樣題音檔裡的 `Enregistrement 11.m4a`。）
>
> ✅ **2026-09-01 再次驗證**：Owen 桌面上又出現一份 `TEF CANADA.zip`（357,806,587 bytes）。
> 全檔 **sha256 逐一比對，122/122 內容完全相同**——**跟本機這份是同一包，沒有新東西**。
> 安全掃描一樣全綠（0 危險副檔名／0 路徑穿越／0 加密／0 符號連結）。
> ⚠️ 比對時要注意兩件事，不然會誤判成「完全不同」：
> ①**本機資料夾當初重新命名過**（`01_Nouvelle_Edition/` 等），照路徑比會 0 筆相同
> ②`Faits divers plus de 100（Section A）.pdf` 本機**改成了半形檔名**，照檔名比會多一筆差異
> → **要比就比內容雜湊，不要比路徑或檔名。**

---

## 1　官方樣題 ⭐ 這區最有價值（`raw/TEF CANADA/02_Exemples_officiels/`）

出版者：**Centre de langue française de la CCI Paris Ile-de-France**（TEF 的官方出題機構）。
⭐ **這是本包唯一的官方文件，其餘都是第三方彙編。**

- **1-1　`Exemples-Epreuves-TEF_CE.pdf`** — 閱讀樣題。**40 題／60 分鐘**
- **1-2　`Exemples-Epreuves-TEF_CO.pdf`** — 聽力樣題。**40 題／40 分鐘**
- **1-3　`Exemples-Epreuves-TEF_LS.pdf`** — **語彙與結構（Lexique-Structure）。40 題／30 分鐘**
  ⛔⛔ **2026-08-31 官網更正：這一科「不是」TEF Canada 移民必考科。**
  移民只考 CE／CO／EE／EO 四科，且必須同一天考完（`lefrancaisdesaffaires.fr` 英法兩版都確認）。
  ~~TCF 沒有這一科~~ → 一般 TCF 其實有「語言結構」18 題，但 **TCF Canada 也沒有**。
  ⭐ **兩個考試的移民版本都不單獨考文法。** 這份材料仍是很好的文法詞彙練習，但不是考科。
- **1-5　`Bandes sons TEF_CO/`** —— 官方聽力樣題的音檔，**`Enregistrement 1`–`16` 全部都在**
  （15 個 mp3 ＋ 1 個 m4a）。樣題手冊的 19 題就是對應這 16 段錄音。
  ⭐ 2026-09-01 才清點到——之前索引沒記，文件裡只含糊寫「音檔可到官網下載」。
- **1-6　`_analyse/exemples/TEF_exemples_{CE,CO,LS}.json`**（2026-08-31 新增）
  三份樣題已解析成結構化題庫：**CE 21 題／CO 19 題／LS 15 題，共 55 題，全部含正解**。
  ⚠️ CE 的第 8–11 題是兩欄版面，pdfplumber 直接抽會把左右欄併成一行；已用 x 座標分欄修正。
  ⚠️ CE 1–4／12–13 與 CO 1–2 的選項本身是圖，JSON 只有題幹（55 題中 7 題如此，已標明）。
- **1-4　`Sujets-EE.pdf`** — 寫作樣題與**官方評分說明**（兩位閱卷者獨立評分）
- **1-5　`Sujets-EO.pdf`** — 口說樣題與官方評分說明

## 2　口說（`04_Oral/`）

- **2-1　`TEF-Canada-Expression-Orale-150-Topics.pdf`** → 已萃取成兩份：
  - **2-1-1　`_analyse/TEF_sujets_oral_sectionA.json`** — **86 題**。
    ⭐ 每題含 `titre` ＋ `document`（廣告／啟事原文）＋ `reponses`（建議問句清單）
    → **這是本包對 Owen 最有用的東西**：Section A 要問 10 個問題，這裡連範例問句都有
  - **2-1-2　`_analyse/TEF_sujets_oral_sectionB.json`** — `avec_document` **37 題**（含原始文件）
    ＋ `sujets_supplementaires` **24 題**（只有主題句）

## 3　寫作（`05_Ecrit_A/`、`06_Ecrit_B/`）

- **3-1　`Faits-divers-plus-de-100-Section-A.pdf`** → **`_analyse/TEF_faits_divers_sectionA.json`**
  ✅ **2026-08-31 查明：這本是 113 則新聞素材（標題＋330 個細節點，21 個主題），不是 42 題的來源。**
  檔名的「plus de 100」是準確的。每則＝一個標題＋2–4 個 bullet 細節，是**寫作素材庫**不是題目。
  ⚠️ 舊索引把它跟 3-1-1 接錯了，見第 6 區缺口 1。
- **3-1-1　`_analyse/TEF_sujets_ecrit_sectionA.json`　42 題**（來源其實是 3-2 那本的「Topics for Section A」清單）
  新聞開頭一句，要續寫。
- **3-2　`TEF-Canada-Expression-Ecrite-150-Topics.pdf`** → **`TEF_sujets_ecrit_sectionB.json`　61 題**
  報紙上的一句主張，要寫信表達立場
- **3-3　`TEF Section A.pdf`**／**3-4　`TEF Canada Expression Ecrite.pdf`** — 補充材料，尚未細分

## 4　閱讀（`03_Lecture/`）

- **4-1　`tef-les-102-textes-longs.pdf`** — 102 篇長文。已抽純文字到 `_raw_text/`
- **4-1-1　`_analyse/TEF_102_textes_longs.json`**（2026-08-31 新增）✅ **已切分**
  **102 篇（編號 1–102 連續無缺）／394 題**，每篇含 `titre`／`source`／`article`／`questions`。
  其中 **17 篇是 `texte à trous`**（填空型，題目標記是 `Phrase N` 不是 `Question N`）。
  383/394 題四選項齊全（97%）；第 98 篇原檔就沒有題目。
  ⛔ **全部沒有標準答案——原始 PDF 就沒有 corrigé。** 要用得自己判或請老師對。

## 5　教材與音檔（`01_Nouvelle_Edition/`）

- **5-1　`TEF Nouvelle Edition.pdf`**（88 MB／222 頁）✅ **2026-08-31 判讀完畢**
  **Hachette FLE 2023 官方備考書**（`ISBN 978-2-01-628667-8`，與 CCI Paris 合作）。
  全書是掃描圖、**沒有文字層**（pdfplumber 抽出 0 字）→ 用 `tools/ocr_pdf.py`（Apple Vision，離線）
  OCR 成 `assets/.ocr_TEF_Nouvelle_Edition.txt`（39 萬字，⛔ gitignore）。
  ⭐ **本包最有價值的一份**：340+ 練習 ＋ **1 套完整模擬考** ＋ **正解與逐字稿全都在書裡**。
  頁面地圖：
  | 區塊 | 頁 |
  |---|---|
  | Je découvre le TEF（考試總覽）| 5–10 |
  | 閱讀 CE（découvre／entraîne／évalue）| 11–54 |
  | 聽力 CO | 55–84 |
  | **語彙與結構 LS** | 85–104 |
  | 寫作 EE | 105–126 |
  | 口說 EO | 127–154 |
  | **模擬考 CE 40 題** | 155–171 |
  | **模擬考 CO 40 題** | 172–180 |
  | **模擬考 LS 40 題** | 181–188 |
  | 模擬考 EE／EO | 189–190 |
  | 逐字稿與正解 | 191–222 |
- **5-1-1　`_analyse/test_blanc/TEF_test_blanc_{CE,CO,LS}.json`**（2026-08-31 新增）
  抽取腳本：**`tools/tef_extract_test_blanc.py`**（可重跑，改抽法改它不要手改 JSON）
  ⭐ **完整模擬考 120 題，全部對上正解**（正解表在書第 219–220 頁）。
  113/120 題四選項齊全；不齊的 7 題是選項本身就是圖（CO 的 dessin 題 6 題＋CE 1 題）。
- **5-1-3　`_analyse/test_blanc/TEF_test_blanc_CO_pistes.json`**（2026-08-31 新增）
  模擬考聽力 **40 題 → 音軌對照表**。音檔資料夾叫「91 pistes」但**實際有 94 個 mp3**，
  其中 **057–094 這 38 軌就是這套模擬考**。
  30 題是書上直接標的，10 題是推出來的（欄位 `confiance` 有標）。
  **驗算閉合**：38 軌 ＝ 36 軌帶題目 ＋ 2 軌是導引音（071／075，兩個 micro-trottoir 的指令），沒有餘數。
  ⚠️ 一開始推成「079 是導引音」，是被 OCR 把兩個音軌號疊成一行騙了；
  **用 `afinfo` 量長度**（079/080 都 55 秒＝兩則完整 chronique，071/075 才是 37 秒的指令）
  ＋回頭看版面才看到「Chronique 1／Chronique 2」是兩則不同的。
- **5-1-2　分數→等級對照表**（書第 222 頁，三科同一把尺，每科 40 題）
  | 答對數 | 0–6 | 7–15 | 16–21 | **22–28** | 29–35 | 36–40 |
  |---|---|---|---|---|---|---|
  | 等級 | A1 | A2 | B1 | **B2** | C1 | C2 |
  ⭐ **Owen 的具體標靶：每科 40 題答對 22 題＝B2＝CLB 7。**
  ⚠️ 這是書上的「估算」尺，不是官方計分方式；官方 NCLC 分數門檻另見 `EXAM_TCF_VS_TEF.md`。
- **5-2　mp3 × 109**（含 `02_Exemples_officiels` 底下的官方樣題音檔）

## 6　⚠️ 已知缺口（誠實記錄，2026-08-31 更新）

1. ~~**Section A 的 42 題 vs 檔名說的「plus de 100」**~~ ✅ **結案**：兩者根本是兩份東西。
   `Faits-divers-plus-de-100-Section-A.pdf` 實際有 **113 則**（檔名沒誇大），
   42 題來自另一本 `TEF-Canada-Expression-Ecrite-150-Topics.pdf` 的「Topics for Section A」清單。
   **是舊索引把來源接錯，不是抽取漏掉。** 見 3-1／3-1-1。
2. ~~**`TEF Nouvelle Edition.pdf`（88 MB）完全沒判讀**~~ ✅ **結案**，見 5-1。
3. ~~**102 篇長文沒有切分**~~ ✅ **已切分**（4-1-1，102 篇／394 題），
   ⛔ 但**原檔就沒有答案**，這點沒法補，只能請老師對或自己判。
4. **CLB 分數對照表** —— 🔸 **部分補上**：拿到的是書上的「答對題數→CEFR 等級」估算尺（5-1-2），
   **不是官方 NCLC 分數表**。官方門檻仍以 `EXAM_TCF_VS_TEF.md` 為準，且要跟 IRCC 官網核對。
5. **口說／寫作沒有標準答案或範文**（這是好事，符合我們「不用範文」的原則）。
6. 🔸 **模擬考 CE／CO 的「支撐材料」仍在書裡** —— 2026-08-31 傍晚已把兩科的**題幹與選項全文**
   放進 7-2（各 40 題全含正解），但**文件、圖表、音檔本身沒有也不會複製**，上課要翻書／放音檔。
   ⚠️ 有 14 題題幹本來就印在圖裡（OCR 撈不到），文件標成
   「énoncé porté par le document imprimé」；另有 22 題是填空型，標成「blanc (n)」。
7. ~~**91 個 mp3 沒有跟模擬考 CO 題號對起來**~~ ✅ **結案**，見 5-1-3。

---

## 7　📄 給老師的文件（`_pour_le_prof/`）

### ⭐ 7-3　`TEF_Canada_dossier_complet.docx`（2026-08-31 晚，**唯一要傳給老師的 TEF 檔案**）

Owen：「TEF 的題目跟應試策略，我也希望你整理成一個檔，既然都花錢買了，整理一下吧！」
→ 把 7-1 與 7-2 合併＋補上方法論章。**全法文、七章、約 21.8 萬字元。**

| 章 | 內容 |
|---|---|
| 1 | **格式**：四科必考（LS 不考）、**電腦考／不准帶字典**、A1–C2 平均分佈、兩位獨立閱卷、NCLC 7 門檻 |
| 2 | ⭐ **方法論**（新章，**書上 conseils méthodologiques 改寫**）：寫作 A／寫作 B／口說 A／口說 B／閱讀題型，各標頁碼 |
| 3 | **三件一個人練不了的事**（提問並追問／被反駁還守得住／看著文件但不能唸） |
| 4 | 口說 Section A **86 題**（含文件與示範問句）＋ Section B **37＋24 題** |
| 5 | 寫作 Section A **42 題** ＋ **113 則 faits divers 素材** ＋ Section B **61 題** |
| 6 | 選擇題：題型分段表＋官方樣題 **55 題**＋**模擬考 120 題**（含音軌號）＋三科正解表 |
| 7 | 全部內容的清點表 |

產生器：**`tools/tef_gen_prof_dossier.py`**（讀所有 JSON 產 HTML）→ `textutil -convert docx`。

⚠️ **第 2 章是這份最有價值的新東西**：書上的方法論有一半在講「**不要做**什麼」——
不要抄題目開頭、不要寫信頭、不要長篇開場白、不要唸文件。那些都是認真的考生會自己做、
但一分都拿不到的動作。

### ⛔ 7-1、7-2 已被 7-3 取代（移到 `_pour_le_prof/_remplaces/`）
- `TEF_Canada_banque_de_sujets.docx`（口說寫作題庫，2026-08-31 上午）
- `TEF_Canada_epreuves_QCM.docx`（選擇題，2026-08-31 下午）

**沒有刪除，只是搬走**，並附 `LISEZ-MOI.txt` 說明。
這樣 `_pour_le_prof/` 底下只剩一個 docx，不會傳錯檔給老師。
⚠️ 7-1 那份**沒有產生器**（當初是手改 HTML），所以留著當備份；7-3 的內容已完全涵蓋它。
