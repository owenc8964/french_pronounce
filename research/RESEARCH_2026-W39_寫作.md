# RESEARCH 2026-W39 — ✍️ 寫作 Expression écrite

> 產出日期：2026-09-21（ISO 第 39 週，39 % 4 = 3 → 寫作）
> 依 `CLAUDE.md` 每週雲端研究例行產出。研究歸研究，**本檔不改任何系統程式**。
>
> ⚠️⚠️ **本週的查證等級限制（跟 W37／W38 完全一樣，先講）**
> 搜尋引擎摘要進得來，**`WebFetch` 全滅**。本週實測被 egress proxy 擋掉的：
> `tesl-ej.org`、`link.springer.com`、`scholarsarchive.byu.edu`、`arxiv.org`、`aclanthology.org`、
> `www.nature.com`、`www.frontiersin.org`、`www.sciedupress.com`、`prepmontcfca.com`、
> `bubblesoffrench.substack.com`、`www.polyglossic.com`、`www.francaisavecpierre.com`。
> **一篇原文都沒讀到。** `reddit.com` 這次連搜尋都被擋（user agent 層），所以 r/French 這條線本週是空的。
>
> 沿用 W37／W38 的三級標記：
> - 🟢 **摘要層級**：作者、年份、樣本數、效果量來自檢索摘要，**沒讀到原文**
> - 🟡 **二手層級**：經由部落格／備考站／出版社轉述
> - 🔴 **待驗證**：數字看起來可用，但要對原始來源
>
> ⛔ **在對過原文之前，不要把本檔任何數字寫進系統的說明文字裡。**
> （來源三層優先序的同一精神：線索不是判準。）
>
> 📌 **本檔刻意不重複** `research/2026-09-06_SOLO_B_一個人怎麼練寫.md`（B1–B11 十一條自學寫作法、
> Ferris treatable/untreatable、Graham & Perin 的 0.82／0.82／0.70／0.50／−0.32、自評 r=.466）
> 與 `research/2026-09-04_範文水準與評分標準.md`（TCF 三題字數規格與骨架）。
> 本週只寫**新的東西**，或**推翻／補強舊結論的東西**。

---

## 1. 這週查到什麼

### 1A. 研究證據（有實證、有樣本數的）

#### ⭐⭐ ① 回饋打在哪一層，對「外語學習者」的效果是反的 — Scherer, Graham & Busse (2024) 🟢

*Learning and Instruction* Vol. 93。**跨 200 個比較**的統合分析，把回饋拆成「表層」（文法、拼字、標點）
與「深層」（內容、組織、論證），再把學習者拆成 L1／L2／FL（外語，即不在目標語環境裡學）。

| 回饋打哪層 → 影響哪層 | 效果量 g |
|---|---|
| 表層 → 表層（全體） | **0.58** |
| 表層 → 表層（**FL**） | **0.69** |
| 表層 → 表層（L2） | 0.34 |
| ⛔ **表層 → 深層（FL）** | **−0.23**（負的） |
| 深層 → 深層（全體） | **0.80** |
| 深層 → 深層（L1） | 1.26 |
| 深層 → 深層（FL） | 0.37（**不顯著**） |
| 表層＋深層併用 → 深層 | 0.54 |
| 表層＋深層併用 → 表層 | 0.36 |
| 教師回饋 → 表層（FL） | 0.72（vs L2 0.35） |
| 同儕回饋 → 深層（FL） | 0.76 |
| **演算法回饋 → 表層（FL）** | 0.53（**不顯著**） |
| **自我回饋 → 深層（FL）** | 0.55（**不顯著**） |

⚠️ **侷限**：摘要層級，沒讀到原文；FL 與 L2 的操作型定義沒查到（Owen 在台灣學法文＝典型 FL，但這個歸類要對原文確認）；
標「不顯著」的幾格很可能是 k 太小而不是真的沒效；出版偏誤與異質性數據都沒查到。

⭐ **這條是本週最重要的發現，而且它直接打到我們現在的做法**：
`tcf_writing.html` 的批改 prompt 要的是「最該修的兩個錯（各附正確寫法）＋三面向分數＋重寫最差的一句」——
**幾乎純表層**。而 Owen 正是 FL 學習者，這一格在這份統合分析裡是 **−0.23**。
→ 不是「表層回饋沒用」（它對表層有 0.69，是全表最好的幾格之一），
是**只給表層回饋，會壓到深層（內容／組織／論證）的發展**，而 T3 考的就是論證。
→ 指向的修法是「**併用**」那一列（深層 0.54＋表層 0.36），不是二選一。

⚠️ 同時要注意最後兩列：**演算法回饋與自我回饋在 FL 身上都沒達顯著**。
這跟 `2026-09-06_SOLO_SYNTHESIS_回饋才是瓶頸.md` 的結論同向——但**這次的數字比那份更保守**。

---

#### ② WCF 的主線效果量：三個統合分析並陳（數字彼此不一致） 🟢

| 統合分析 | 收錄 | 整體效果量 | 調節變項結論 |
|---|---|---|---|
| Kang & Han (2015)，*MLJ* | 21 篇 | **g = 0.54** | direct vs indirect **無顯著差異**；focused 比 unfocused 好但**未達顯著** |
| Chen & Renandya (2020)，*TESL-EJ* | 35 篇 | **g = 0.59** | 程度越高受益越多；direct 優於 indirect；focused 優於 unfocused |
| 延遲後測子分析（23 篇，出處為轉述） | 23 篇 | indirect **g = 0.998** vs direct **g = 0.531** | p = .297（隨機效果）／.067（固定效果）→ **不顯著** |

⚠️⚠️ **這三行彼此矛盾，不要挑一行當結論**：Kang & Han 說 direct/indirect 沒差、Chen & Renandya 說 direct 較好、
延遲後測那組的點估計卻是 indirect 幾乎兩倍——但**三個「差異」全都沒達顯著**。
🟢 **可以講的只有一句**：WCF 對文法準確度有中等效果（g ≈ 0.54–0.68），**至於哪一種 WCF 比較好，證據還沒收斂。**

📌 **對 Owen 的意義**：目前 prompt 要 Claude「附正確寫法」＝direct。證據沒有支持這一定比較好，
但**有另一條理由支持改成 indirect（只標位置不給答案）**——見下面第 ③ 與第 5 節的實驗。

---

#### ⭐ ③ Truscott vs Ferris：糾錯會不會遷移到「新的一篇」 🟢

這是 L2 寫作領域吵了 25 年以上的主軸爭議，**必須並陳**：

- **Truscott（1996、1999、2007）**：糾錯對寫作準確度的發展**沒有貢獻，甚至可能有害**，因此不該出現在寫作課裡。
- **Ferris（1999、2003、2004）**：糾錯有效、學習者要它、能提升自我編輯能力。
- **關鍵實證 — Karim & Nassaji (2020)，*Language Teaching Research* 24, 519–539** 🟢
  - **N = 53** 中級 ESL 學習者，隨機分四組：direct／underline only／underline + metalinguistic cues／control
  - 流程七節：寫作 1 → 修訂 1 → 寫作 2 → 修訂 2 → 寫作 3 → 修訂 3 →（兩週後）**寫作 4（延遲、全新題目）**
  - 結果：direct 與 indirect **都**改善，而且**不只在修訂上，也遷移到新寫的文章**
  - ⚠️ **侷限**：53 人分四組 ≈ 每組 13 人；三週；圖片提示寫作、ESL 環境；不是法文、不是考試作文

⭐ **這條的價值不在「誰贏」，在於雙方都同意的那個位置**：
爭議是「糾錯有沒有用」，但**兩邊的實驗設計都把「修訂（revision）」當成效果發生的那一步**。
Truscott 質疑的是修訂能不能**遷移**，不是修訂本身沒事發生。
→ **沒有修訂步驟的系統，連這場爭議的入場券都沒有。**（見第 4 節缺口 1）

---

#### ④ Dynamic Written Corrective Feedback（Hartshorn & Evans，BYU） 🟢

操作型定義極清楚，這是它最有價值的地方：

1. **每堂課寫 10 分鐘一段**（不是長篇作文）
2. 教師**只給錯誤代碼**（位置＋類型），**不給答案**
3. 學生自己統計錯誤、自己改
4. **重複到那一段完全沒錯為止**
5. 隔天新的一段，代碼累積成個人錯誤剖面

結果：**對準確度的效果遠大於對流暢度與複雜度**；2018 年 *TESOL Quarterly* 的後續研究指出用 DWCF 的班級，
學生的**自我編輯能力**與**限時寫作段落的準確度**都優於只有傳統文法教學的班級。

⚠️ **侷限**：效果量數字沒查到（原文全被擋）；BYU 同一個研究群的系列研究，獨立複製沒查到；
課堂情境、有教師；「準確度提升但流暢度／複雜度沒有」這件事本身是個取捨警告。

---

#### ⑤ Written languaging：把「為什麼錯」寫出來 🟢

- Suzuki (2012)，*Language Learning* — written languaging + 直接糾錯 + 修訂
- 後續研究（Writing & Pedagogy；Benjamins LLLT 卷）：**「只寫出注意到什麼」與「寫出注意到什麼＋理由」兩種都和準確度提升有關**
- 機制被歸因為 **noticing 加深＋generation effect（自己生成的比讀來的記得牢）**
- 另有 think-aloud 研究（Kim, 2019, *TESOL Quarterly*）：reformulation + think-aloud 條件下，**對回饋的覺察程度和後續修訂的準確度有關**

⚠️ **侷限**：樣本普遍很小、多為日本／中國 EFL 大學生；沒查到統合分析；
「都有效」這種結論很容易是出版偏誤的形狀。

---

#### ⭐⭐ ⑥ AI 批改：四個統合分析，效果量從 0.27 到 0.86，必須並陳 🟢

| 統合分析 | 收錄 | 樣本 | 效果量 |
|---|---|---|---|
| Fleckenstein et al. (2023)，*Frontiers in AI* | 20 篇、k = 84 | N = 2,828 | **g = 0.55**（三層模型）⚠️ 作者自承異質性大，「AWE 不能當單一一種介入來理解」 |
| Zhai & Ma (2023)，*J. Educational Computing Research* | 26 篇（2010–2022） | N = 2,468 | **g = 0.861**（大）；post-secondary ＞ secondary；EFL/ESL ＞ 母語者 |
| **AI 輔助回饋三層統合分析（2026, *System*）** | 19 篇、**66 個效果量** | **N = 11,875** | ⭐ 整體 **d = 0.271（小）**；**情緒投入 d = 0.628（最大的一格）**；**pilot 研究 d = 1.097** |
| AI 對寫作表現（2026, *Reading and Writing*） | — | — | g = 0.601，95% CI [0.437, 0.766] |

⭐⭐ **讀法（這是本週第二重要的一條）**：
**樣本越大、時間越近、設計越嚴謹，效果量越小**——2,468 人 g=0.861 → 11,875 人 d=0.271。
而那份 2026 的研究自己點出 **pilot 研究是 d = 1.097**，遠高於正式研究，這是典型的**設計品質偏誤訊號**。

⭐ **而且最穩的那一格不是成績，是心情**（情緒投入 d = 0.628 vs 整體 0.271）。
這跟 `METHOD_MAP.md` D 家族在**口說**側查到的東西同構（情意面 0.645 vs 學習表現 0.590），
只是**寫作側的落差更大**：AI 讓人更想寫，但讓人寫得更好的證據**弱很多**。

📌 對 Owen：這不是「別用 AI 批改」。`writing.html`／`tcf_writing.html` 現有的
「產生 prompt → 自己貼去問 Claude」模式零成本零金鑰，**留著**。
但**不要把 AI 給的 X/20 當成能力量測**——它的穩定貢獻是讓他願意繼續寫。

---

#### ⭐⭐ ⑦ 法文批改的準確度依然空白 — 而這次查到了「為什麼」 🟢

`research/2026-09-16_自由產出的回饋.md` 留下「法文批改準確度依然完全空白」。本週往下挖：

- **MultiGEC-2025**（NLP4CALL 主辦，**第一個多語文法糾錯共享任務**）收了 **12 種歐洲語言**：
  Czech、English、Estonian、German、Greek、Icelandic、Italian、Latvian、Russian、Slovene、Swedish、Ukrainian。
  ⭐⭐ **沒有法文。**
  兩個賽道（minimal／fluency）雙冠都是 UAM-CSI，用 Gemma-2 (9B) + 每賽道兩個 LoRA。
- 英文側的參照數字（**只能當參照，不能外推到法文**）：
  - GPT-3.5／GPT-4 在 GEC 上，**replacement（改錯字）與 unnecessary（多餘）處理得好，
    但 missing（該有卻漏掉）類「將近一半沒有被妥善處理」**
  - 另一篇指出 reference-based 指標**低估** LLM：GPT-4o 與標準答案不同的修改裡，**73.76% 其實一樣正確**
- 規則式檢查器：**LanguageTool recall 0.948／precision 0.442** → 抓得全但**亂報一半**
  🟡 這個數字出現在一篇談規則生成的論文轉述裡，不是針對學習者法文的評測

⭐⭐ **對 Owen 的意義（這條是今年最該記住的一條）**：
LLM 最弱的是 **missing 類錯誤**——而**法文最常錯的正好就是 missing 類**：
漏冠詞（`du / de la / des`）、漏 `de`、漏配合的 `-e / -s`、漏 `y / en`、漏助動詞的 `être`。
→ **AI 批改對法文的盲區，跟 Owen 的盲區高度重疊**，這是 `SOLO_B` 的 B9 對文法檢查器下的同一個判斷，
現在在 LLM 上也成立。
→ **批改結果＝線索，不是判準。**（同 `CLAUDE.md` 的來源三層優先序精神。）

---

#### ⑧ 規劃時間（pre-task planning）對寫作的效果——比想像中窄 🟢

- Johnson & Abdi Tabari (2023)，*System*「Planning in L2 writing: A research synthesis and meta-analysis」
  → 前置規劃對**句法複雜度** **d = 0.60**
- 同一組人 2022 年在 *Applied Linguistics* 做過口說版
- ⚠️ **但對準確度與流暢度，結果分歧甚至相反**：有研究發現有規劃的人**反而寫得比較不準**；
  也有研究發現**不給規劃時間反而更流暢**。詞彙複雜度那一格也有負向報告。

🟢 **能講的只有**：規劃時間**最穩的是讓句子變複雜**，不是讓句子變對。
⛔ 不可以宣稱「先規劃就寫得更好」。

---

#### ⑨ 讀 → 寫的遷移：B／E 家族在寫作側唯一一條硬數字 🟢

Graham, Liu, Bartlett, Ng, Harris, Aitken, Barkel, Kavanaugh, Talukdar (2018)，
*Review of Educational Research*「Reading for Writing: A Meta-Analysis of the Impact of Reading Interventions on Writing」：

| 產出指標 | 效果量 |
|---|---|
| 寫作整體 | **0.57** |
| 寫作品質 | **0.63** |
| 寫出來的字數 | **0.37** |

⚠️ 主體是母語（英語）教學研究，二語遷移要打折（跟 `SOLO_B` 對 Graham & Perin 的警告同一條）。
⭐ 但它跟 `RESEARCH_2026-W38_閱讀.md` 查到的「ER 統合分析：**限制選書＋加問責，效果更大**」是**同一個研究群的同一組結論**：
**讀要有約束才會變成寫。**

---

#### ⑩ 公式化語塊（formulaic sequences／lexical bundles）＝寫作側的「語言島」 🟢

- **語塊類指標是文本品質最好的預測子**，而且「特定貢獻遠高於單詞層的多樣性與艱深度指標」
- 高分組使用的三詞語塊**跟題目直接相關**（不是通用萬用句）
- 針對語塊的**聚焦教學**（意識提升：呈現＋練習兩階段）能提升寫作，給學習者一個 **"zone of safety"**
- ⚠️ 大多是**相關研究**（語塊多 ↔ 分數高），因果證據弱；情境幾乎全是學術英語寫作；
  也有研究指出**程度越高，長語塊用得越少**——所以「多背語塊」不是單調遞增的策略

⭐ **這正是 C 家族（Shekhtman 語言島）在寫作側的長相**，而且它同時解釋了
`SOLO_B` 第 4 節「借骨架可以、借內容不行」為什麼站得住：
**高分組的語塊是「跟題目相關的」，不是背來的萬用句**——借萬用句會被看出來，借功能骨架不會。

---

#### ⑪ 回饋的動機效果（Cen & Zheng, 2023, *Journal of Second Language Writing*） 🟢

13 篇量化研究的統合分析：
- **多來源回饋（multiple sources）對寫作動機的效果最大**（報為「顯著的大效果」），單一來源次之
- **commentary（評論式／敘述式）回饋**是關鍵調節變項
- ⚠️ 只有 13 篇；動機是自陳量表

📌 對 Owen：他的回饋來源目前**只有一個**（Claude）。這條不是叫他去找同儕
（`2026-09-18_社群同儕批改對L2寫作準確度的效度.md` 已判定同儕批改的強項不是他要的），
而是說**「AI 批改 ＋ 一個客觀的自動指標（字數/時間/錯誤代碼清單）」本身就算兩個來源**——
成本為零，且第二個來源不吃 LLM 的法文準確度。

---

### 1B. 社群做法（個人經驗與備考站，⚠️ 全部沒有對照組）

#### 🔴 ⓐ TCF Canada 寫作的時間預算（repo 目前沒有這組數字）

| 任務 | 字數（repo 已有） | 🔴 **時間預算（本週新查到）** |
|---|---|---|
| Tâche 1 | 60–120 | **12–15 分**：2 分規劃／8–10 分寫／2 分檢查 |
| Tâche 2 | 120–150 | **17–20 分**：3 分規劃／12–14 分寫／2 分檢查 |
| Tâche 3 | 120–180 | **20–23 分**：4 分**分析文件**／14–16 分寫／2 分檢查 |
| 總計 | — | 60 分鐘 |

🔴 **待驗證**：多個備考站（prepmontcfca、reussir-tcfcanada、tcfca、primo-tcf、tcfcapractice）數字一致，
但**沒有一個引用官方來源，而且很可能彼此互抄**。⛔ 不要寫進系統文字，可以當自己練習的計時參考。

#### 🟡 ⓑ 備考站反覆講的幾條（可當 heuristic，不當規則）
- 字數不足 → **自動 A1 non atteint**（repo 已有，與官方說法一致度較高）
- 抄題目原文 ＝ 抄襲 → 低分；⭐ 這對 T3 特別重要（第一段必須改寫不是照抄）
- 有 **objet／標題**、有分段、有結尾語 → 評分者觀感直接上升
- 🔴 **「subjonctif 用對＝立刻給 C1 印象」**——講得很篤定，但這是補習班的反推，**官方格柵沒有公開細項**
  （`SOLO_B` 第 5 節第 8 點已經標記過這件事）
- 寫作由 France Éducation International 認證的**人類評分員**批改，不是自動批改

#### 🟡 ⓒ 日記派（五個來源講法高度一致）
bubblesoffrench、Polyglottist Language Academy、Migaku、Preply、FluentU、fle.re 的共同處方：
- **每天 5–10 句／約 100 字**，固定時段（早上／午休／睡前擇一，當成不可打擾的約會）
- **不要停下來查字典、不要追求完美**，先讓它流出來
- 進階者才慢慢把整篇轉成目標語
- ⭐ 一致的理由是：「日記強迫大腦**提取**，而不是**認得**」
- ⚠️ 全是部落格，零對照組。**跟 `SOLO_B` 的 B8 計時速寫是同一件事的軟版本**，
  而 B8 的實證警告仍然適用：**它只練速度不練正確性，必須跟對照型方法配對**

#### 🟡 ⓓ FLE 老師用 AI 的做法（Français avec Pierre 等）
- 先**告訴 AI 你的程度**（「我在學法文，A2／B1」），它會調整回覆
- 「精確的 prompt（程度、角色、批改要求）才能把工具變成一個要求嚴格的個人家教」
- ⭐ 但同一批來源都附警告：**它補課不取代課，要對它的錯誤保持批判**
- 📌 `tcf_writing.html` 的 prompt **已經做到了這三件事**（角色、程度、輸出格式），這條不是缺口，是確認

#### 🟡 ⓔ 寫作遊戲化的坊間做法
字數／時間換點數再「兌換」獎勵、streak、milestone、寫作 app（Indie Author Magazine 那類清單）。
⚠️ **全部部落格層級**，真正的數字看 `research/2026-09-20_數位遊戲式語言學習統合分析.md`
（Dixon 2022：組間 d=0.50，但**延遲後測 d=0.09 跨零**）。⛔ 不要用這節去論證任何遊戲化決定。

---

## 2. 家族歸類

### 2.1 本週每條發現屬於哪個家族

| # | 發現 | 家族 |
|---|---|---|
| ① | Scherer 2024 表層／深層 × L1/L2/FL | **H（新）** ＋ A |
| ② | WCF 三個統合分析 | **H（新）** |
| ③ | Truscott vs Ferris／Karim & Nassaji | **H（新）** |
| ④ | DWCF 每天 10 分鐘＋代碼＋改到全對 | **H（新）** ＋ A |
| ⑤ | Written languaging | **H（新）**（回饋處理的深度） |
| ⑥ | AI 批改四個統合分析 | **D**（AI 對話夥伴，寫作側） |
| ⑦ | MultiGEC 沒有法文／LLM 漏字弱 | **D** 的能力邊界 |
| ⑧ | 前置規劃 d=0.60（只在句法複雜度） | **A**（任務設計層） |
| ⑨ | 讀 → 寫遷移 0.57／0.63／0.37 | **B ＋ E** |
| ⑩ | 公式化語塊是品質最佳預測子 | **C**（語言島的寫作版） |
| ⑪ | 多來源回饋的動機效果 | **F** |
| ⓐ–ⓑ | TCF 時間預算與備考 heuristic | **C**（策略能力：把現有能力調度進考試格式） |
| ⓒ | 日記派 | **F ＋ A** 的軟版本 |
| ⓓ | FLE 老師的 AI prompt 做法 | **D** |
| ⓔ | 寫作遊戲化 | **F** |

### 2.2 ⭐⭐ 找到一個地圖上沒有的家族：**H 修訂循環（過程寫作）**

**判準**：METHOD_MAP 現有七個家族，沒有一個處理「**同一篇文本被重寫第二次**」這件事。

- **A 刻意練習**＝同一個**結構**練很多次 → 自動化。它的重複單位是**練習項目**。
- **H 修訂循環**＝同一**篇文本**改很多次 → 錯誤被「用掉」而不是被「看過」。它的重複單位是**自己寫的那一篇**。

這兩件事在操作上完全不同，在證據上也分屬不同的爭議：A 的爭議是「練習遷移」，
H 的爭議是「Truscott vs Ferris：糾錯會不會遷移到新的一篇」。

⭐ 而且 **H 有一個 A–G 都沒有的特性：它的回饋是「你自己動手改對」，不是「有人告訴你答案」。**
這正好接上 `2026-09-06_SOLO_SYNTHESIS_回饋才是瓶頸.md` 的核心問題——
**單人自學的瓶頸是回饋，而 H 是唯一一個把「回饋落地」本身當成訓練動作的家族。**

📌 **已依 `CLAUDE.md` 的研究法鐵律，在 `METHOD_MAP.md` 補了 H 那一節**（含衝突並陳與位置建議）。

### 2.3 ⚠️ 兩個**沒有**另立家族的東西，理由寫下來

1. **Genre pedagogy／體裁教學（雪梨學派的 teaching-learning cycle：拆解範文 → 共同建構 → 獨立建構）**
   → **不另立，歸 C（策略能力／語言島）**。
   理由：它的機制是「把文本的**結構圖式**講明白，讓學習者照著生成」，跟 Shekhtman 的島是同一個槓桿
   （不是把能力變強，是把能力**變得可調度**），只是島是「一段練熟的話」、體裁是「一張可生成很多篇的骨架」。
   ⚠️ 而且它的證據品質不好：查到的比較多是「process-genre 比 product 好」這種單篇小型研究，
   **沒有查到統合分析的整體效果量**。⛔ 不要為了湊家族而立一個證據薄的家族。
   📌 `SOLO_B` 第 4 節的「借骨架 vs 借內容」表，本質上已經是體裁教學的專案版。

2. **Swain 的輸出假說（Output Hypothesis）**
   → **不另立**。它已經寫在 `research/2026-09-02_C_聽懂與說得出的落差.md` 與 `_D_介入手段實證效果.md` 裡，
   而且它是「為什麼要產出」的**理論依據**，不是一套**做法**——它推導出的做法會落回 A 與 H。

---

## 3. 可以直接抄的實作參數

| 參數 | 數值 | 依據 | 等級 |
|---|---|---|---|
| **一次寫作訓練的長度** | **10 分鐘一段**（不是整篇作文） | DWCF（Hartshorn & Evans）核心設計 | 🟢 |
| **修訂輪數** | **改到那一段沒錯為止**（不設上限） | DWCF | 🟢 |
| **回饋形式** | **只給位置＋錯誤類型代碼，不給答案** | DWCF；且 direct vs indirect 在統合分析上無顯著差異，所以「不給答案」不會比較差 | 🟢 |
| **回饋要涵蓋的層次** | ⭐ **表層＋深層併用**，⛔ 不要只給表層 | Scherer 2024：表層→深層（FL）**−0.23**；併用→深層 0.54、→表層 0.36 | 🟢 |
| **有標記時的自我改對率基準線** | **47%（句構）–60%（冠詞）** | Ferris & Roberts (2001)，N=72（已在 `SOLO_B`，此處當**量測基準**用） | 🟢 |
| **修訂後要不要寫新的一篇** | **要**，且間隔約 **2 週** | Karim & Nassaji (2020) 的延遲寫作 4 設計 | 🟢 |
| **規劃時間** | T1 2 分／T2 3 分／T3 4 分 | 🔴 備考站（彼此互抄）；⚠️ 文獻只支持「規劃 → 句法更複雜 d=0.60」，**不支持「更準確」** | 🔴＋🟢 |
| **單題時間上限** | T1 12–15 分／T2 17–20 分／T3 20–23 分 | 🔴 備考站 | 🔴 |
| **日記型自由書寫** | 每天 **5–10 句／約 100 字**，不查字典不回頭改 | 🟡 六個部落格一致；⚠️ 必須配對照型方法，否則把錯誤練流利（`SOLO_B` B8） | 🟡 |
| **語塊目標** | 與**題目相關**的三詞語塊，⛔ 不是通用萬用句 | 🟢 高分組特徵；也符合專案「不准自創教材／不借內容」鐵律 |🟢 |
| **AI 批改的定位** | **線索不是判準**；穩定貢獻是**情緒**不是成績 | 三層統合分析 N=11,875：整體 d=0.271／情緒 d=0.628 | 🟢 |
| **⛔ 不要做的事** | 用 AI 給的 X/20 當能力量測 | 同上 ＋ MultiGEC 沒有法文、LLM missing 類錯誤近半處理不好 | 🟢 |

---

## 4. 跟現有系統的缺口對照

**盤過的東西**：`writing.html`（依課出題，`clb7_writing`）、`tcf_writing.html`（TCF 三題，`clb7_tcf_writing`）、
`writing_tasks.js`（第 1–21 課題庫）、`tcf_writing_sujets.js`（真題燃料層）、`dashboard.html`、`HANDOFF.md`。

**先講好的**：燃料層很完整（真題洗乾淨、有 `ocr_fix` 稽核、有 `check_tcf_writing.js`），
prompt 工程也已經做對了三件事（角色、程度、輸出格式），而且 `reply` 全文有存 → **歷史資料可以回溯重新解析**。
下面講缺的。

### 缺口（按嚴重度排）

#### ⭐⭐ 缺口 1：**整個 H 家族在系統裡是 0%** — 沒有「重寫」那一步
現在的流程是：選題 → 寫 → 複製 prompt → 貼回批改 → **存分數 → 結束**。
`btnSave` 之後沒有任何動作。**回饋被讀過，但沒有被用掉。**

而本週三條線（Truscott/Ferris 的共同前提、Karim & Nassaji 的七節設計、DWCF 的「改到全對」）
全都把學習定位在**修訂那一步**。
→ 系統目前買了門票但沒進場：我們付出了寫作的成本，卻跳過了證據指向的那個動作。

#### ⭐⭐ 缺口 2：批改 prompt 幾乎純**表層**，而 Owen 是 FL 學習者
`buildPrompt()` 要的是：字數判定／X\_20 分數／三面向分數／**最該修的兩個錯（附正確寫法）**／做得好的一點／重寫最差的一句。
除了「pragmatique 分數」這一格，**幾乎沒有深層回饋**（內容夠不夠、論證有沒有站住、段落安排合不合理）。
Scherer 2024 在 FL 這一格給的是 **−0.23**。
→ ⚠️ **這不是「prompt 寫壞了」**——它對表層是好的（0.69 是全表最好的幾格之一）。
問題是**只有表層**。修法是**加一段深層**，不是改掉表層。

#### ⭐ 缺口 3：`clb7_tcf_writing` **dashboard 根本讀不到**
`dashboard.html:862` 只有 `getWritingData()` 讀 `clb7_writing`；
全 repo grep `clb7_tcf_writing`，**只出現在 `tcf_writing.html` 自己裡面**。
→ ⛔ 這直接違反 `CLAUDE.md` 交付鐵律的「新功能先過大腦檢查：dashboard 讀得到嗎？能影響今日處方嗎？」
**兩個都是否。** TCF 寫作頁是系統裡最貼近考試的產出工具，但它的資料是孤島。
（它會被 `sync_supabase.js` 同步上雲——因為 key 以 `clb7_` 開頭——所以資料沒丟，只是沒人看。）

#### ⭐ 缺口 4：沒有錯誤類型的累積剖面
`clb7_tcf_writing` 每筆存：`date / tache / sujetId / theme / mots / motsOk / text / score / reply`。
`reply` 是整段文字，**「最該修的兩個錯」沒有被結構化**。
→ 所以回答不了最該回答的問題：**「我這三個月一直在錯的是哪一類？」**
DWCF 的整個價值就在這個累積剖面（patterned errors），我們有原料（reply 全文）但沒有萃取。
📌 好消息：**歷史資料可回溯**，這件事以後要做不用從零開始。

#### 缺口 5：沒有計時 → 兩件事同時做不到
`grep Date.now|setInterval|timer` 在 `tcf_writing.html` **一個都沒有**（`writing.html` 只有拿來輪題的 `day`）。
- 做不到 **wpm／字數曲線**（`SOLO_B` B8 唯一那條「回饋完全客觀、不需任何語言判斷」的方法）
- 練不到**考試的時間壓力**（60 分鐘三題）
📌 ⚠️ 這跟 `RESEARCH_2026-W38_閱讀.md` 缺口 3 的 `sec` 計時器問題**是同一件事在另一個頁面**——
現在它變成**跨三個技能**的同一個缺口了（聽力要語速、閱讀要 wpm、寫作要 wpm＋時間壓力）。

#### 缺口 6：沒有規劃步驟
`writing_tasks.js` 有 `frame`（下筆順序）——這是好的；但 `tcf_writing.html` 那邊
（也就是真正考試格式那邊）**完全沒有規劃階段**，直接就是輸入框。
⚠️ 但**先別急著做**：文獻只支持「規劃 → 句法更複雜」，不支持「規劃 → 更準確」，
而備考站的 2/3/4 分鐘是 🔴 等級。**這條的優先度低於 1–3。**

#### ⚠️ 缺口 7（是問題不是缺口）：兩個寫作頁都沒有「⭐ 跳過」三層出口
`grep 跳過`：`writing.html` **0**、`tcf_writing.html` **0**、`table_drill.html` **19**。
`CLAUDE.md` 的練習頁鐵律說「**任何有『作答 → 判定完成』的頁面**」都要有三層出口。
寫作頁確實有「判定完成」（存檔、streak、guided=1 會跳回 dashboard）。
→ ⚠️ 但**自由產出頁要怎麼套「這一格我會了」是不明顯的**（沒有格子）。
**這條我不自行判定，列為要 Owen 拍板的問題**（第 8 節）。

---

## 5. 一個 15 分鐘就能試的實驗（明天就能做，不用等我改程式）

### 🧪「改到全對」——DWCF 的最小版，同時是一次診斷

**為什麼是這個**：它一次驗證本週最重要的兩條（缺口 1 的修訂步驟、缺口 2 的併用回饋），
而且**完全不需要改程式**——只要改貼給 Claude 的那段話。

| 時間 | 做什麼 |
|---|---|
| **0:00–0:01** | 開 `tcf_writing.html`，選 **T1**（60–120 字）。手機碼表按下去。 |
| **0:01–0:09** | 寫。⛔ 不查字典、不回頭改。寫完**記下秒數與字數**（頁面已經會數字數）。 |
| **0:09–0:10** | 按「📋 複製批改提示」，貼進 Claude，**但在最後自己加這三行**： |

```
⚠️ 這次改法不一樣，請照做：
1. 先講一句「深層」的：任務有沒有完成、資訊有沒有漏、段落安排合不合理。
2. 再列錯誤：⛔ 只給【位置 + 錯誤類型代碼】，不要給正確答案。
   代碼用：[ACC]動詞變位 [GEN]陰陽性/單複數配合 [ART]冠詞 [PREP]介系詞
   [MOT]用字選擇 [ORT]拼字/重音 [SYN]句子結構 [REG]語域(tu/vous)
3. 最後一行只寫：「共 N 處」。
```

| 時間 | 做什麼 |
|---|---|
| **0:10–0:14** | ⭐ **自己改**。改完把新版貼回去問：「還有嗎？一樣只給代碼。」重複到 0 處或時間到。 |
| **0:14–0:15** | 記四個數字（寫在哪都行，紙上也可以）。 |

**要記的四個數字**：

| 數字 | 怎麼得到 | 拿來幹嘛 |
|---|---|---|
| 初稿字數 | 頁面上的計數 | 之後才有字數曲線（缺口 5 的手動版） |
| 初稿秒數 | 碼表 | 同上；也對照 🔴 的「T1 8–10 分鐘寫完」 |
| **第一輪標出 N 處，自己改對 M 處** | 第二輪的「共 N 處」比第一輪少幾個 | ⭐⭐ **M/N 就是診斷** |
| 哪幾個代碼重複出現 | 肉眼 | 這是錯誤剖面的第一筆（缺口 4 的手動版） |

### ⭐⭐ 怎麼讀 M/N（這才是實驗的重點）

Ferris & Roberts (2001) 的基準線是：**錯誤已經被標出來時，學習者能改對 47%（句構）–60%（冠詞）**。

| M/N | 判讀 | 依 `CLAUDE.md` 教學鐵律該做什麼 |
|---|---|---|
| **≳ 60%** | 規則在腦裡，只是產出時沒調用 → **✂️ 自動化缺口** | ⛔ **不要重講規則**。直接給壓縮練習（同結構連發 5–8 個變化） |
| **≈ 40–60%** | 正常範圍，跟文獻一致 | 繼續跑這個循環，累積代碼剖面 |
| **⚠️ ≲ 40%** | 標出來了還是改不動 → **🧠 概念缺口** | 那幾個代碼要回去補概念（去 `french_notes.html` 對應課次），不是練更多 |

⭐ **這是同一個 15 分鐘同時做完「練習」與「分類」**——而分類錯了回應一定錯，是教學鐵律的第一條。

⚠️ **一次不算數**。至少跑 3–5 次（不同題目）再看 M/N 的平均，單次波動很大。
（`2026-09-20_單一受試者設計最少資料點與效果量.md` 已經說過：每階段 ≥5 點，而且我們只能做探索性視覺分析。）

---

## 6. 🎮 怎麼讓它更好玩

⚠️ 先聲明：`2026-09-20_數位遊戲式語言學習統合分析.md` 的結論還算數——
**延遲後測 d=0.09 跨零、⛔ 不宣稱遊戲更有動力**。所以下面三條的理由**不是「遊戲化有效」**，
而是各自有獨立的機制理由。

### ⭐⭐ 做法一：「賞金獵人」——把批改從「給答案」改成「發通緝令」

**怎麼玩**：Claude 只給**位置＋錯誤代碼**（就是第 5 節那段 prompt）。每一個 Owen **自己改對**的代碼 ＝ 賞金入袋；
第二輪還在的 ＝ 上**通緝名單**。頁面顯示的不是 `X/20`，是 **`抓到 M / 通緝 N`**。

**為什麼好玩**：把「被批改」（被動、像被改考卷）翻轉成「找犯人」（主動、有獵物）。
⭐ 而 `feedback_fun_is_the_engine` 的「系統不可以罵他」在這裡是自然滿足的——
**通緝名單上的不是他，是錯誤**。

**為什麼有證據**：
- 這**同時**是缺口 1（修訂步驟）與缺口 2（不給答案＝indirect，統合分析上不比 direct 差）的解法
- 賞金 M/N 就是 Ferris 的 47–60% 基準線，**它本身是診斷指標**（第 5 節那張判讀表）
- 通緝名單累積＝DWCF 的 patterned errors 剖面（缺口 4）
- ⭐ 而且它**不吃 LLM 的法文準確度**：LLM 只要指出「這裡怪」（高 recall），判斷對不對是 Owen 自己做。
  ⚠️ 這正好繞開第 ⑦ 條那個「LLM 對 missing 類錯誤近一半處理不好」的問題——
  **我們不再信任它的答案，只信任它的「這裡有東西」。**

### ⭐ 做法二：「一稿兩分」——只看 Δ，不看絕對分數

**怎麼玩**：同一篇存兩個分數：**初稿分**與**改完分**。dashboard 上顯示的主數字是 **Δ**（差值），
絕對分數收進細節裡。連續幾篇的 Δ 畫成一條線。

**為什麼好玩**：現在的 `X/20` 對 A2 的 Owen 來說幾乎永遠是 8–11 分——**幾乎不會動的數字最無聊**，
而「無聊是反向預測因子」（`METHOD_MAP.md` F 家族）。Δ 每一篇都會動，而且**是他自己造成的**。

**為什麼有證據**：⭐ 這是本週發現 ⑦ 的直接推論——
**我們不知道 Claude 給法文打的 11/20 準不準，但同一個評分者、同一篇、前後兩次，誤差方向大致一致，會在相減時抵消。**
→ Δ 是這個系統裡**唯一一個不吃 LLM 法文準確度、也不吃自評（r=.466）的寫作指標**。
⚠️ 侷限要老實說：Δ 會有天花板（初稿越好 Δ 越小），所以 Δ 是**修訂能力**的指標，不是寫作能力的指標。

### 做法三：「時間預算條」——倒數但不擋人

**怎麼玩**：T1/T2/T3 各一條倒數條（🔴 12–15／17–20／20–23 分）。⭐ **超時不擋、不扣分、不跳警告**，只是顏色從綠變灰。

**為什麼好玩**：它把「考試的壓力」變成一個**可以觀察的東西**而不是一個**威脅**。
⛔ 反例就是它的設計約束：不准做成 Duolingo 那種「你要失去 streak 了」的情緒勒索
（`2026-09-15_養成機制.md` 已點名為反例）。

**為什麼有證據**：`2026-09-17_自控式休息vs排定式休息.md` 的 Maastricht N=176 RCT——
**自控組在學習成果上沒有優勢（d=0.24 不顯著），但心情面全面佔優（d=0.36–0.55）**。
→ 倒數條該給的是資訊，不是強制。
📌 順帶：這條一旦做了，缺口 5 的 wpm 就自動有了（計時器存在＝字數曲線可算）。

### ⚠️ 依交付鐵律「新功能先過大腦檢查」

| 做法 | dashboard 讀得到？ | 能影響今日處方？ | 判定 |
|---|---|---|---|
| 一：賞金獵人 | ⚠️ **要先修缺口 3**（dashboard 根本沒接 `clb7_tcf_writing`） | 可以：通緝名單前三名 → 指定明天練哪個結構 | ✅ 但**缺口 3 是前置** |
| 二：一稿兩分 Δ | 同上 | 可以：Δ 連續三次 ≈ 0 → 該換難度 | ✅ 同上 |
| 三：時間預算條 | 可以（時間是數字） | 可以：wpm 進 700h 與流暢度追蹤 | ✅ |

⭐ **所以三條都指向同一個前置動作：先把 `clb7_tcf_writing` 接進 dashboard。**
⛔ 但那是改系統，是 Owen 另外決定的事。

---

## 7. 來源清單

### 研究（🟢 摘要層級：作者／年份／樣本／效果量皆來自檢索摘要，**本週一篇原文都沒讀到**）

- Scherer, Graham & Busse (2024)，回饋對 L1/L2/FL 寫作的統合分析，*Learning and Instruction* 93：
  https://www.sciencedirect.com/science/article/pii/S0959475224000884
- Kang & Han (2015)，WCF 統合分析（21 篇，g=0.54），*MLJ*：
  https://onlinelibrary.wiley.com/doi/abs/10.1111/modl.12189
- Chen & Renandya (2020)，WCF 統合分析（35 篇，g=0.59），*TESL-EJ* 24(3)：
  https://tesl-ej.org/wordpress/issues/volume24/ej95/ej95a3/ ／ https://eric.ed.gov/?id=EJ1275821
- Karim & Nassaji (2020)，修訂與遷移效果（N=53），*Language Teaching Research* 24：
  https://journals.sagepub.com/doi/10.1177/1362168818802469 ／ https://eric.ed.gov/?id=EJ1261701
- Truscott vs Ferris 爭議（25 年後的 Truscott 訪談，2021）：
  https://link.springer.com/article/10.1186/s40862-021-00110-9
- Ferris，"Grammar Correction" Debate（*JSLW* 2004）：
  https://www.sciencedirect.com/science/article/abs/pii/S1060374304000086
- Hartshorn et al. (2010)，Dynamic Corrective Feedback，*TESOL Quarterly*：
  https://onlinelibrary.wiley.com/doi/abs/10.5054/tq.2010.213781
- DWCF 在多語寫作課（2018），*TESOL Quarterly*：https://eric.ed.gov/?id=EJ1170172
- Suzuki (2012)，Written Languaging、直接糾錯與修訂，*Language Learning*：
  https://onlinelibrary.wiley.com/doi/10.1111/j.1467-9922.2012.00720.x
- Kim (2019)，學習者處理 WCF 的深度（think-aloud），*TESOL Quarterly*：
  https://onlinelibrary.wiley.com/doi/abs/10.1002/tesq.522
- Fleckenstein et al. (2023)，自動回饋與寫作三層統合分析（20 篇 / k=84 / N=2,828 / g=0.55），*Frontiers in AI*：
  https://www.frontiersin.org/journals/artificial-intelligence/articles/10.3389/frai.2023.1162454/full
- Zhai & Ma (2023)，AWE 對寫作品質統合分析（26 篇 / N=2,468 / g=0.861），*JECR*：
  https://journals.sagepub.com/doi/10.1177/07356331221127300 ／ https://eric.ed.gov/?id=EJ1380424
- ⭐ AI 輔助回饋三層統合分析（2026；19 篇 / 66 ES / N=11,875；整體 d=0.271、情緒 d=0.628、pilot d=1.097），*System*：
  https://www.sciencedirect.com/science/article/abs/pii/S0346251X26000497
- AI 對學生寫作表現的統合分析（2026；g=0.601, 95% CI [0.437, 0.766]），*Reading and Writing*：
  https://link.springer.com/article/10.1007/s11145-026-10884-4
- MultiGEC-2025 多語文法糾錯共享任務（12 種語言，**不含法文**），NLP4CALL：
  https://aclanthology.org/2025.nlp4call-1.1/ ／ https://spraakbanken.gu.se/en/compsla/multigec-2025
- GPT-3.5／GPT-4 在 GEC 的表現分析（missing 類近半未妥善處理）：https://arxiv.org/abs/2303.14342
- LLM GEC 多維評測（GPT-4o 與標準答案不同的修改中 73.76% 一樣正確），AIED 2026：
  https://arxiv.org/html/2605.07635
- Johnson & Abdi Tabari (2023)，Planning in L2 writing 統合分析（句法複雜度 d=0.60），*System*：
  https://www.sciencedirect.com/science/article/abs/pii/S0346251X23001744
- Graham et al. (2018)，Reading for Writing 統合分析（0.57／0.63／0.37），*RER*：
  https://journals.sagepub.com/doi/10.3102/0034654317746927
- 公式化語塊是文本品質最佳預測子，*System*：
  https://www.sciencedirect.com/science/article/abs/pii/S0346251X1730684X
- 語塊聚焦教學提升學術寫作（"zone of safety"），*JEAP*：
  https://www.sciencedirect.com/science/article/abs/pii/S1475158515000077
- 詞塊與寫作品質的關係，*JSLW*：
  https://www.sciencedirect.com/science/article/abs/pii/S1075293521000787
- Cen & Zheng (2023)，回饋與 L2 寫作動機統合分析（13 篇），*JSLW*：
  https://www.sciencedirect.com/science/article/abs/pii/S1075293523001101
- 體裁教學系統性回顧（52 篇＋2 篇博論），*SAGE Open*：
  https://journals.sagepub.com/doi/10.1177/21582440221147255

### 實務／社群（🟡 個人經驗與備考站，無對照組）

- TCF Canada 寫作方法論（時間預算）：https://prepmontcfca.com/expression-ecrite-methodologie/
- 同上：https://reussir-tcfcanada.com/tcf-methodologie-expression-ecrite/ ／ https://tcf-canada.ca/expression-ecrite/
- 三題拆解：https://primo-tcf.cloud/blog/expression-ecrite-tcf-canada-3-taches ／
  https://www.tcfcapractice.com/fr-ca/immigration/taches-expression-ecrite-tcf-canada
- 法文日記法：https://bubblesoffrench.substack.com/p/how-to-keep-journaling-in-french
- 語言日記：https://www.polyglottistlanguageacademy.com/language-culture-travelling-blog/2025/2/23/daily-language-journaling-tracking-progress-and-reflecting-on-mistakes
  ／ https://migaku.com/blog/language-fun/language-learning-journal-guide ／ https://preply.com/en/blog/language-learning-journal/
- 寫作進步建議（FLE）：https://www.fle.re/blog/ecrire-francais-progresser/
- 用 ChatGPT 改法文（Français avec Pierre）：https://www.francaisavecpierre.com/corriger-un-texte-avec-chatgpt/
- 日記＋AI 的工作流：https://www.polyglossic.com/journal-writing-language-learners-ai-prompts/
- 法文校對器比較（Antidote／LanguageTool／WProofreader）：https://blog.wproofreader.com/a-quick-comparison-of-french-text-checkers/
- 寫作遊戲化（⚠️ 部落格層級）：https://gsrc.ucr.edu/blog/2022/08/10/level-your-writing-3-ways-gamify-your-writing-practice
  ／ https://indieauthormagazine.com/seven-apps-to-gamify-your-writing-sessions-and-other-author-approved-methods-for-boosting-your-word-count/

### 🔴 待驗證（⛔ 用前必須對官方，⛔ 不要寫進系統文字）

1. **每題的時間預算**（12–15／17–20／20–23 分）：五個備考站一致，**零官方引用**，疑似互抄。
2. **「subjonctif 用對＝C1 信號」**：補習班反推，官方格柵沒有公開細項（`SOLO_B` §5.8 已標）。
3. **「有 objet／標題會拉高分數」**：同上，是觀感說法不是評分欄位。
4. **LanguageTool recall 0.948／precision 0.442**：出現在一篇談規則生成的論文轉述裡，
   **不是針對學習者法文的評測**，⛔ 不可當法文檢查器的效能宣稱。
5. **Chen & Renandya 的 g=0.59 與「direct 優於 indirect」**：跟 Kang & Han 的「無顯著差異」衝突，
   兩邊原文都沒讀到，⛔ 先不要選邊。

---

## 8. 下一週（W40 → 40 % 4 = 0 → 🗣 口說）之前，這份留下的開放問題

1. ⭐⭐ **要不要在 `tcf_writing.html` 加一個「改一遍」步驟？** 這是缺口 1，也是本週唯一一個
   「三條獨立證據線同時指向同一個動作」的發現。⚠️ **改系統＝Owen 決定。**
   📌 但第 5 節的實驗**不需要改程式就能先跑**——建議先跑 3–5 次看 M/N，再決定要不要寫進頁面。
2. ⭐⭐ **`clb7_tcf_writing` 要不要接進 dashboard？** 這是明確違反交付鐵律「大腦檢查」的既有狀態，
   而且第 6 節三個玩法裡有兩個以它為前置。⚠️ **改系統＝Owen 決定。**
3. ⭐ **批改 prompt 要不要加「深層」那一段？** Scherer 2024 的 −0.23 是本週最強的單一數字，
   但它是摘要層級、FL 的定義還沒對到原文。
   → 建議：**先在第 5 節的實驗裡手動試**（那段 prompt 已經包含深層那一行），不急著改 `buildPrompt()`。
4. **寫作頁要不要套「⭐ 跳過」三層出口？** 練習頁鐵律說「任何有作答→判定完成的頁面」都要有，
   兩個寫作頁目前都是 0。但自由產出頁沒有「格子」，「這一格我會了」要對應到什麼不明顯。
   ⚠️ **這條我不自行判定，要 Owen 拍板。**
5. 📌 **跨技能的同一個缺口第三次出現了**：計時器語意。
   聽力要「TTS 語速當訓練變數」（W37）、閱讀要「單篇計時才有 wpm」（W38）、寫作要「秒數才有字數曲線＋時間壓力」（本週）。
   → **這已經不是三個頁面的三個小問題，是一個共用元件的缺席。**
6. W37／W38 留下的開放問題，本週**只動了一個**：W38 第 1 條（G 家族要不要擴寫成兩個通道）仍待 Owen 拍板；
   本週我另外**新增了 H 家族**到 `METHOD_MAP.md`——如果 Owen 認為 H 應該併進 A，回來刪掉那一節即可。
