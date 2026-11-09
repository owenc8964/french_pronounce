# RESEARCH 2026-W46 — 📖 閱讀 Compréhension écrite

> 每週固定研究例行（`research/INDEX.md`）。ISO 週 **46**，46 % 4 = **2 → 閱讀**。
> 日期：2026-11-09。上一輪閱讀是 [W42](RESEARCH_2026-W42_閱讀.md)、上上輪是 [W38](RESEARCH_2026-W38_閱讀.md)。
>
> ⚠️⚠️ **本檔的證據等級，先講清楚**：這個 session 的 egress proxy 對**所有**出版社主機
> （cambridge.org／mdpi.com／link.springer.com／files.eric.ed.gov／pmc.ncbi.nlm.nih.gov／aclanthology.org…）
> 都回 `403 CONNECT tunnel failed`，實測過。**所以本週一篇原文都沒讀到**，
> 所有樣本數與效果量都是**檢索摘要層級（🟢）**，跟 W38／W42／W44／W45 同樣的侷限。
> ⛔ 任何一個數字要寫進系統文字或拿去做決定之前，請 Owen 自己開原文對一次。
>
> ⭐ 依研究法鐵律先掃全景：這次掃了**成分模型派（簡單觀）／知識派／策略派／流暢度派／
> 版面與配速派／自我提問與回想派／情緒派／AI 派／考試測量派**九條線，
> 才挑了「文法 vs 詞彙誰才是閱讀的瓶頸」與「版面工程」兩條深挖。

---

## 1. 這週查到什麼

### 1A. 研究證據（有實證、有樣本數的）

#### ① ⭐⭐ 本週最大的一條：**閱讀的最強關聯是文法，不是詞彙**——而這翻了社群共識

[Jeon & Yamashita 2014](https://onlinelibrary.wiley.com/doi/abs/10.1111/lang.12034)（*Language Learning* 64: 160–212，
L2 閱讀理解相關物的統合分析，[ERIC 記錄](https://eric.ed.gov/?id=EJ1030046)）把相關物依證據量分兩組，
**高證據組（≥18 個累積效果量）**的排序是：

| 相關物 | r |
|---|---|
| ⭐⭐ **L2 文法知識** | **.85** |
| L2 詞彙知識 | **.79** |
| L2 解碼 | **.56** |
| L1 閱讀理解 | （高證據組，數值未撈到） |
| （低證據組）L2 聽力理解 | **.77**（低證據組最強） |
| （低證據組）⛔ 元認知 | **.32**（低證據組最弱） |

⭐ **這對 Owen 的意義非常直接**：W38 當時寫進參數表的是「詞彙量與理解 r = 0.57（Zhang & Zhang 2022）」，
**而文法那一格從來沒有被記過**。按這份統合分析，**文法知識是比詞彙更強的閱讀關聯物**。
→ 系統裡那一大套文法機器（`gram_trainer.html`／`verb_sprint.html`／`table_drill.html`／`tense_lens.html`）
**本來被當成產出側（說／寫）的投資，它其實也是閱讀側最強的那根槓桿**，只是沒人替它記過閱讀的帳。

⚠️⚠️ **但這條有三個必須並陳的反面，⛔ 不要只抄 .85**：

1. **另一篇專門做這題的統合分析給出低得多的數字。**
   [Frontiers in Psychology 2023 的「文法知識與閱讀理解」統合分析](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2023.1098568/xml)
   （[PMC 鏡像](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10042300/)，收 1998–2021，**據轉述 86 篇研究**，
   對象跨小學到大學、含**中文／荷蘭文／英文／法文**學習者）報的是 **Fisher's z = 0.54（≈ r ≈ .49）**。
   ⭐ 跟 .85 差了一大截。差異原因（範圍？測量？L1/L2 混合？）**我沒查到，⛔ 不要猜**。
   ⭐ 這篇的調節變項反而更有用：**grade group 解釋了 59% 的異質性**、語言類型只解釋 13%，
   而且**中學組的效果顯著大於小學組** → 弱弱地指向「**文法對閱讀的貢獻隨成熟度／程度上升**」。
2. ⛔⛔ **因果證據：查無。**
   我專門搜了「文法教學能不能causally 拉高 L2 閱讀理解」的統合分析——**沒有**。
   手上全部是**相關**。⭐ 所以正確的讀法是：
   「文法知識跟閱讀理解一起動」≠「去上文法課就會讀得比較好」。
   ⚠️ 有一條narrative 回顧還直接說：**詞彙量不夠時，單獨的文法教學與策略訓練收益都偏小**
   （[Linguistic Factors Influencing L2 Reading Comprehension](https://www.researchgate.net/publication/366325083_Linguistic_Factors_Influencing_L2_Reading_Comprehension)，🟡 論述非統合）。
3. ⚠️ **r = .85 高到該懷疑構念重疊**：「L2 文法知識」的測驗（選擇題填空、改錯）
   跟「L2 閱讀理解」的測驗長得很像，兩者可能量到同一件事。⛔ 這句是我的推論，不是文獻結論。

**⭐ 怎麼用在 Owen 身上**：⛔ 不是「加一個文法頁」。是**換一個記帳方式**——
他已經在做的文法練習，應該被允許算成**閱讀的進度**；而閱讀答錯時，第一個要問的不是「哪個字不會」，
而是 ⭐ **「這一句的主詞是誰、動詞是哪一個」**（見第 5 節實驗）。

#### ② ⭐ 把閱讀拆成兩塊的那條線（簡單觀）：L2 的缺口在「語言理解」，不在「解碼」

- [Lee, Jung & Lee 2022](https://eric.ed.gov/?id=EJ1370515)（*Scientific Studies of Reading*，**MASEM，67 研究／N = 10,526**）：
  L2 理解能力 ＋ L2 解碼技能一起解釋 **超過 60% 的 L2 閱讀理解變異**，⭐ **理解那一塊的貢獻更大**；
  ⚠️ L1 與 L2 的語言距離**不是**顯著調節變項。
- [Hamada, Shimizu, Hoshino, Takaki & Ushiro 2024](https://www.cambridge.org/core/journals/studies-in-second-language-acquisition/article/robust-evidence-for-the-simple-view-of-second-language-reading-secondary-metaanalysis-of-jeon-and-yamashita-2022/B16B4EF6A48AE17B3E46269FB1972866)
  （*SSLA*，拿 Jeon & Yamashita 2022 的資料重跑 MASEM 的**複製研究**）：
  ⭐ 結論同向——理解技能 ＞ 解碼技能；⭐⭐ 而且 **metalinguistic（後設語言）技能對閱讀理解沒有直接效果**，
  只透過解碼與理解間接作用 → 支持一個**精簡**的 L2 簡單觀。
  ⚠️⚠️ **但它自己說：有些 pooled correlation 複製成功、有些沒有**（原因是重新編碼原始資料＋樣本挑選理由改了）。
  ⭐ 這是對 ① 的 .85 的另一個警告：**這些數字本身沒那麼穩。**
- [Melby-Lervåg & Lervåg 2013](https://pubmed.ncbi.nlm.nih.gov/23937316/)（比較 L1 與 L2 學習者的統合分析）：
  L2 學習者的 **閱讀理解落差 d = −0.62**、**語言理解落差 d = −1.12（大）**，
  ⛔ 但 **解碼只有 −0.12、語音覺識只有 −0.08（都很小）**。
  ⭐⭐ **這是本週最乾淨的「選戰場」證據**：L2 讀不懂不是因為字看不出來，是因為**語言本身**。
- ⚠️ **反方（階段性的）**：[Cassibba et al. 2025](https://www.cambridge.org/core/journals/bilingualism-language-and-cognition/article/reading-comprehension-of-children-acquiring-a-transparent-language-as-l2-a-study-with-the-simple-view-of-reading-model/8BA64925F1B3CA2D81800BF74C61495D)
  （*Bilingualism: Language and Cognition*，透明正字法的 L2 **兒童**）：
  **在習得早期，解碼解釋的變異比語言理解多**；而且 ⭐ **解碼的「正確率」比「速度」更重要**。
  ⚠️ 樣本是兒童、語言是透明正字法（法文只是半透明），**外推到 A2 成人有風險**。
  ⭐ 但它跟 W38 的語言門檻假說、W42 的 Clapham 門檻**是同一個形狀**：早期階段底層還在吃資源。

#### ③ ⭐⭐ 考試真正要的是「仔細讀局部」，⛔ 不是略讀——這跟所有備考站的教法相反

Urquhart & Weir 的四格矩陣把閱讀切成 **careful（仔細）× expeditious（快速）** 與 **local（局部）× global（整體）**；
skimming 與 search reading 是整體快速、scanning 是局部快速
（[careful vs expeditious 整理](https://www.academypublication.com/issues/past/tpls/vol03/06/02.pdf)、
[構念效度研究](https://www.macrothink.org/journal/index.php/ijele/article/download/4018/3334)、
[IELTS 個案](http://www.savap.org.pk/journals/ARInt./Vol.1\(3\)/2011\(1.3-03\).pdf)；
CEFR 本身也分「為定向而讀（skim/scan）」與「為資訊與論證而讀（careful）」，見
[Assessing CEFR level](https://rm.coe.int/assessing-cefr-level/1680a9178c)）。

⭐⭐ 關鍵的那條來自 **Brunfaut & McCray 的 British Council 報告**
（[Looking into test-takers' cognitive processes while completing reading tasks](https://www.britishcouncil.org/sites/default/files/brunfaut_and_mccray_report_final_0.pdf)，
⛔ 主機被擋、**只拿到檢索摘要，樣本數與方法沒讀到**）：

> **B1 的題目絕大多數要求的是 careful local reading（仔細讀局部）；
> skimming 只是偶爾用到；expeditious reading 整體很少見，scanning 只出現在少數幾題。**

⭐ **對 Owen 的意義**：備考站一律教「先抓關鍵字、斜線快讀、略讀抓大意」（見 1B），
但在**他要考的那個程度**，題目主要考的是**把一小段讀仔細**。
→ ⭐ **「練略讀」在 A2→B1 這一段是低價值動作**；該練的是「這三行到底在講什麼」。
⚠️ 並陳反面：careful 與 expeditious 到底是不是兩種分得開的技能，文獻**有爭論**——
有研究說 skimming／search reading／scanning 的歷程**彼此重疊**，也有研究說兩類子技能**之間沒有關係**。

#### ④ 詞彙覆蓋門檻要修三處：⛔ 不是斷崖，而且**說明文更貴**

W38 寫進參數表的是「98% ≈ 8,000 詞族／95% ≈ 4,000–5,000 詞族」
（[Laufer & Ravenhorst-Kalovski 2010](https://files.eric.ed.gov/fulltext/EJ887873.pdf)）。本週三條修正：

1. ⛔ **「門檻」這個比喻被直接質疑**：有研究說把 95%／98% 當成 all-or-nothing 門檻是**過度簡化**
   （[Research investigating lexical coverage and comprehension](https://files.eric.ed.gov/fulltext/EJ1316858.pdf)、
   [the coverage–comprehension model](https://files.eric.ed.gov/fulltext/EJ1296462.pdf)）；
   Schmitt et al. (2011) 這條線甚至報過**有學習者在 90% 覆蓋就能讀得不錯**，
   而**100% 覆蓋也不保證讀懂**。⭐ 要讀成「覆蓋率越高越好的連續曲線」，不是「過了就通」。
2. ⭐⭐ **文體決定要多少覆蓋**：
   [一篇比較敘事體與說明體的 L2 研究](https://www.sciencedirect.com/science/article/abs/pii/S1475158522000741)
   報告 **敘事文 98% 覆蓋就足以滿意理解，說明文可能要 100%**，而且它**沒找到門檻**。
   ⭐ **這對 TCF 的 CE 很重要**：考的是公告、行政文件、報導——**全是說明文那一側**，
   也就是**最貴的那一側**。這跟 W42「說明文 ＋ 螢幕 ＋ 限時是最糟三件事湊一起」是同一個方向的第二條證據。
3. ⚠️ **要求的覆蓋率取決於你要幾分的理解**：理解標準設 60% → 瞄 95%；設 70% → 要 98–99%。
   ⭐ 所以「門檻」其實是**你自己定的及格線的函數**。
4. ⭐ **法文專屬的門檻：第五週確認仍是空白，但終於有一條在路上**——
   [Van Parys & Montero Perez 的 EuroSLA 34 研究](https://biblio.ugent.be/publication/01JZ85FRT457KVMBAHRMKYGH31)
   （[另一筆記錄](https://biblio.ugent.be/publication/01JZ87AEXX08AD6AP8587XW80N)）明確在問
   「95–98% 這組數字適不適用於**青少年法語與英語學習者**」。⛔ 只拿到會議摘要，**沒有結果**。
   ⭐ 這是第一次有一個**指名的**法文覆蓋率來源可以追；建議列進 W50 的待追清單。

#### ⑤ ⭐ 版面與配速：**把句子切好給低程度讀者有效，給高程度讀者無效**

這一條是本週挑來深挖的第二線，也是**新家族的證據基礎**（見 2.2）。
它的共同機制是：**不訓練讀者，改造文本在畫面上的形狀。**

| 證據 | 數字／結論 | 侷限 |
|---|---|---|
| ⭐⭐ [文本切塊（text segmentation）對 L2 讀者的效果](https://files.eric.ed.gov/fulltext/EJ901547.pdf) | **切得好的文本能幫到較低程度的 L2 讀者；對較高程度讀者則沒有幫助**；⛔ **切錯位置會干擾**，中級讀者受害最明顯 | 🟢 單一研究、樣本數未撈到 |
| [句法剖析訓練（2018，日語與華語 EFL）](https://files.eric.ed.gov/fulltext/EJ1193158.pdf) | 訓練後**閱讀速度顯著上升**；⚠️ 不同訓練方式之間沒差；作者說**要練夠久**自動剖析才出現 | 🟢 小樣本、速度非理解 |
| [切塊閱讀策略訓練（2024，*System*，L1 日語）](https://www.sciencedirect.com/science/article/pii/S0346251X2400277X) ＋ [切塊訓練與句法覺識](https://files.eric.ed.gov/fulltext/EJ1399504.pdf) | 目標是**不教顯性文法也能建立句子處理**；⚠️ Kosaka 那一支的組間差異**不顯著** | 🟢 結果混合 |
| ⚠️ **VSTF（視覺句法排版）**：[Park & Warschauer 2016 *LLT* 20(3)](https://scholarspace.manoa.hawaii.edu/server/api/core/bitstreams/9ccd5dfa-d045-45cb-b52c-d63f98e40817/content)、[VSTF 與青少年讀寫](https://escholarship.org/content/qt4vw2g0m6/qt4vw2g0m6_noSplash_8a1f7918c6bb6f2baf2a27575fc2e3a9.pdf)、[以 VSTF 鷹架語言結構](https://escholarship.org/content/qt6235t25b/qt6235t25b.pdf) | 用軟體把句子依句法階層排版。⚠️⚠️ **結果混合**：英語學習者**整體 ELA 沒有效益**，只在分組分析看到「中等程度的好處」；**六年級有、四年級沒有** | 🟢 學校場域、兒童／青少年 |
| ⛔⛔ **一篇 VSTF 的 EFL 複製研究已被撤稿** | [RETRACTED: Visual-Syntactic Text Formatting: Developing EFL Learners' Reading Fluency Components](https://link.springer.com/article/10.1007/s10936-021-09823-x) | ⛔ **不可引用**，但要寫出來——這個家族最像樣的證據裡有一篇撤稿 |
| ⭐ **切塊不夠，還要連得起來** | [TextMix 一文引 Pulido (2021) 眼動](https://files.eric.ed.gov/fulltext/ED617890.pdf)：切塊改善**效率**，⛔ 但**單靠切塊不太可能改善理解**，還需要準確連接與剖析塊與塊之間的關係 | 🟢 轉述 |
| 實務起源 | [Rasinski 1994 phrase-cued texts](https://eric.ed.gov/?id=EJ479336)：標出片語邊界，把逐字讀的人推向以意義片語讀 | 🟡 實務文章非實驗 |

⭐ **怎麼用在 Owen 身上**：他**正好**落在這條證據說有效的那一格（低程度 L2 讀者）。
⭐ 而且這是**不用他多做任何練習**就能拿到的那種好處——改的是題目的呈現，不是他的行為。
⚠️ **但要先回答一個這些研究都沒回答的問題：拆掉鷹架之後還在嗎？**（考試不會幫他切句子。）
→ ⭐ 所以它只能當**學習模式**的開關，⛔ 不能進驗收模式。

#### ⑥ 自己出題（self-questioning）：**通用題幹**是整份文獻裡效果量最大的一格

- ⭐⭐ Rosenshine et al. (1996) 這條線（經
  [自我提問文獻回顧](https://www.researchgate.net/publication/276238566_The_Effects_of_Self-Questioning_on_Reading_Comprehension_A_Literature_Review)
  與 [閱讀策略統合分析](https://files.eric.ed.gov/fulltext/ED493483.pdf) 轉述）：
  自我提問介入在**實驗者自編測驗**上的**中位數 ES ≈ 0.86**；
  ⭐⭐ **其中最大的一格是「通用問句／題幹（generic question stems）」ES = 1.12**，其次是訊號詞 ES = 0.85。
- ⚠️ **但「提問」整體只有 d = 0.21**（Liu 的統合分析，同上轉述）——
  ⭐ 差別在於**誰在提問**：學習者自己生成問題 ≠ 老師／題庫給問題。
- ⚠️⚠️ **L2 這一側不一致**：
  [2002 年菲律賓 ESL 讀者的研究](https://scispace.com/papers/self-questioning-and-prose-comprehension-a-sample-case-of-1xkc8bxo42)**沒有顯著效果**；
  [伊朗 EFL 研究](https://www.researchgate.net/publication/303444948_The_Effect_of_the_Self-Questioning_Strategy_as_a_Generative_Learning_Strategy_on_Iranian_Intermediate_EFL_Learners%27_Reading_Comprehension)
  說有效、⭐ **對低程度學習者尤其有效**；
  [Liu 2021](https://www.researchgate.net/publication/347625720_Does_questioning_strategy_facilitate_second_language_L2_reading_comprehension_The_effects_of_comprehension_measures_and_insights_from_reader_perception)
  在控制了 **L1 閱讀、L2 詞彙量、主題熟悉度**之後仍看到提問策略有助益，
  ⭐ 但**效果量在「有鷹架的密集互動教學」裡更大**。
- ⚠️ [另一篇策略統合分析](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8371629/)報告：
  **監控策略與理解的相關在 L1 文本顯著大於 L2 文本**。
- ⛔ **L2 專門的 self-questioning pooled 效果量：查無。**

⭐ **怎麼用在 Owen 身上**：這是本週**最便宜、最好玩**的一條，而且它跟 W42 的「蒙對偵測」互補——
⭐ 要他**先出題再答題**，而且給他**固定的通用題幹**（不是叫他「想一個問題」）。遊戲化版本見第 6 節做法一。

#### ⑦ 讀完回想（retrieval／free recall）：方向對，但 L2 文本證據薄，而且**有反例**

- ⭐ L2 側最接近的一條（經 [retrieval-based learning 十年回顧](https://files.eric.ed.gov/fulltext/ED599273.pdf) 與
  [L2 詞彙提取研究](https://www.researchgate.net/publication/227793575_Effects_of_Opportunities_for_Word_Retrieval_During_Second_Language_Vocabulary_Learning) 一帶）：
  測驗效應**可能延伸到 L2 篇章理解**，但**文本複雜度、測驗格式、重學策略都是邊界條件**；
  ⭐⭐ 其中 **「free recall ＋ 自我解釋」組在複雜文本的推論題上表現最好**。
- 參照：[Bisra et al. 2018 自我解釋統合分析](https://gwern.net/doc/psychology/spaced-repetition/2018-bisra.pdf)
  隨機效果 **g = .55**（⚠️ 跨領域、非 L2）。
- ⚠️⚠️ **反例要並陳**：
  [ADHD 學生的 free recall 研究](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10715433/)——
  整段回想與分段回想**都沒有贏過重讀**；
  [控制變項策略研究](https://www.tandfonline.com/doi/full/10.1080/00220973.2024.2392684)甚至出現
  **負向測驗效應**（重讀勝過 free recall）。
- ⛔ 常被引的「一週後 61% vs 40%」出自二手部落格，🔴 **未對原文**。

⭐ **怎麼用在 Owen 身上**：⛔ 不要把「讀完回想」做成一個新步驟。
⭐ 它最該出現的位置是 **W42 第 5 節那個「蒙對偵測」實驗的升級版**：
回想**要用中文**（W42 已拍板：回述用母語，否則閱讀測驗變成寫作測驗），
而且 ⭐ 要**加一句自我解釋**（「我為什麼覺得是這個答案」），因為那一格才是推論題上最強的組合。

#### ⑧ ⭐ 閱讀焦慮是一個**獨立構念**，而且它的數字直接對上 Owen 放棄練習那件事

| 來源 | 數字 | 樣本／侷限 |
|---|---|---|
| ⭐ [Li 2022 外語閱讀焦慮統合分析](https://www.researchgate.net/publication/355031375_Foreign_language_reading_anxiety_and_its_correlates_a_meta-analysis)（經 [2025 Frontiers 回顧](https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2025.1576224/full) 轉述） | 外語閱讀焦慮 × 閱讀成就 **r = −.28** | **40 篇研究** |
| [Zhang 2019 *MLJ* 外語焦慮統合分析](https://onlinelibrary.wiley.com/doi/abs/10.1111/modl.12590) | 整體 **r = −.34**；⚠️ **閱讀焦慮與考試焦慮跟表現的相關比其他焦慮類型「弱」** | **55 個樣本** |
| ⚠️ [2025 華語學習者統合分析](https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2025.1576224/full) | ⭐ **閱讀焦慮是各技能焦慮中與分數相關最強的，r = −0.427** | ⚠️ **與 Zhang 2019 正面衝突** |
| [原始研究（ESL，工作記憶 ＋ 焦慮）](https://www.sciencedirect.com/science/article/abs/pii/S1041608021001291) | 理解 × 焦慮 **r = −.41（特質）／−.48（狀態）**；理解 × 言語工作記憶 **r = 0.34** | 單一研究 |
| ⚠️ [L1 閱讀焦慮統合分析](https://pmc.ncbi.nlm.nih.gov/articles/PMC13225606/) | 主張 **L1 與外語閱讀焦慮可能是不同構念**；在理解／流暢度／正確率上的量級相近 | ⛔ **排除**外語閱讀焦慮 |

⭐⭐ **怎麼用在 Owen 身上**（這條最該被認真對待）：
`CLAUDE.md` 的「練習頁鐵律」整段的來由，就是他說
「**我幾乎沒辦法填完，非常挫折……那我乾脆不完成了**」。
⭐ 那是一次**情緒事件**，而文獻說這一格跟分數的相關大約 **−.28 到 −.43**——
**比元認知（r = .32）還大，跟解碼（.56）同量級**。
→ ⭐ **「不要讓他挫折」不是軟性的體貼，它是一個跟解碼同量級的變項。**
⚠️ 但 ⛔ 系統**一筆情緒資料都沒有**（見第 4 節缺口）。

#### ⑨ ER（大量閱讀）有了 2025 年的新統合分析——結論沒變，但多了一個紅旗

[Sangers, van der Sande, Welie, Dobber & van Steensel (2025)](https://link.springer.com/article/10.1007/s10648-025-10068-6)，
*Educational Psychology Review* 37, art. 96（[ERIC EJ1488706](https://eric.ed.gov/?id=EJ1488706)）：

- 短期效果在**所有語言領域與所有對象族群**都是正向，**效果量小到中**
  （涵蓋閱讀理解、詞彙、解碼與流暢度、動機、寫作、口語、整體語言能力）。
- 調節變項：**樣本的 L1 不同質時效果更大**、EFL 情境效果更大；
  ⚠️⚠️ ⭐ **效果量隨出版年份上升**——這通常是**發表偏誤或方法漂移**的訊號，不是真的越來越有效。
- ⭐ **研究品質不是顯著調節變項**（品質好壞沒改變結論）。
- ⛔ **pooled d／g 的確切數字沒撈到**（主機被擋）；W38／W42 記的 d ≈ 0.41–0.46 仍是目前最好的估計
  （參照 [Nakanishi 2015 ＋ 傾向分數法](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7188915/)）。

#### ⑩ AI 用在閱讀：2025 多了幾個小實驗，⭐ 其中一個的「玩法」很值得抄

| 研究 | 數字 | ⚠️ 侷限 |
|---|---|---|
| ⭐⭐ [競爭式提問（*CALL* 2025）](https://doi.org/10.1080/09588221.2025.2577356) | **87 名**中國大學新生、**五週**、準實驗：讓學生**跟 ChatGPT 比賽對同一篇文章出問題**。實驗組閱讀理解**顯著進步**、⭐ **對照組反而退步**；學生自己出的問題隨時間變得更進階 | 準實驗、單一場地、五週 |
| [ChatGPT 心智圖（*PLOS ONE* 2025）](https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0336185) | 用 AI 抓主旨與支持細節再畫心智圖 | ⚠️ 小樣本、單一性別（阿拉伯語男生）、⛔ **學生抱怨漏細節與排序不一致** |
| [ChatPRCS（arXiv 系統論文）](https://arxiv.org/pdf/2309.12808) | 自動生成的題目「與專家題相當」、報 **+12%** | 🔴 **預印本、系統論文非課堂試驗、自報結果** |
| [ChatGPT 閱讀平台與焦慮](https://www.researchgate.net/publication/395898848_Original_Research_Training_Language_and_Culture_TRAINING_LANGUAGE_AND_CULTURE) | 實驗組**外語閱讀焦慮與認知負荷都低於**對照組 | 小樣本；⭐ 但跟 ⑧ 同向 |
| [學生用自己的 prompt 生成文本（*HSSC* 2025）](https://www.nature.com/articles/s41599-025-06265-x) | 閱讀、理解、動機三項都顯著優於對照 | ⚠️ 非 L2 專門 |

⚠️⚠️ **CEFR 對齊：W38 的 ⛔ 維持不變，而且證據更多了**：
[ChatGPT-4o 的文本複雜度無法穩定對應 CEFR，給範例也只是略微改善](https://files.eric.ed.gov/fulltext/EJ1466280.pdf)、
[西班牙語家教的「對齊漂移」](https://arxiv.org/pdf/2505.08351)說連「小模型能不能產出 CEFR 對齊文本」都還是混合證據。
⚠️ 反方兩條：[一篇 2026 arXiv 預印本](https://arxiv.org/pdf/2606.01592)說 **LLM 生成的文法練習**對得上 CEFR-J
（⭐ **文法題 ≠ 閱讀文本**），[一篇 2025 *Educ Sci* 準實驗](https://doi.org/10.3390/educsci16071068)用 CEFR 校準的
AI 文本做 ER，B2 延伸閱讀組理解最好。
⭐ **結論：生成「題目」比生成「分級文本」可靠；⛔ 分級文本仍然不要自動信。**
（另見 [BEA 2023 的 A1–B2 生成系統](https://aclanthology.org/2023.bea-1.52.pdf)：絕對年齡段對齊**依模型而異**；
以及 [LLM 能不能像 L2 學習者一樣答閱讀測驗](https://ceur-ws.org/Vol-3894/paper7.pdf)。）

#### ⑪ ⚠️ 窄讀（narrow reading）要修正——W38 的「追連載」玩法有反面證據

W38 第 6 節做法三提議「窄讀追連載，用系列感取代題庫感」。本週查到的證據是**分歧的**：

- **支持**：窄讀組在接受型與產出型詞彙測驗上都明顯優於隨機閱讀組
  （[窄讀與 L2 詞彙學習](https://www.researchgate.net/publication/277910589_Promoting_L2_Vocabulary_Learning_through_Narrow_Reading)、
  [Abdollahi 2016 *Education Research International*](https://onlinelibrary.wiley.com/doi/10.1155/2016/5454031)、
  [窄讀與閱讀理解](https://files.eric.ed.gov/fulltext/EJ1479905.pdf)、
  [窄讀推進 L2 能力](https://www.researchgate.net/publication/369839931_THE_POTENTIALS_OF_NARROW_READING_TO_ADVANCE_L2_PROFICIENCY)）。
  機制就是**重複**：主題相關的新聞比不相關的新聞更常重複實詞。
- ⚠️⚠️ **反面**：有研究報告讀**同一書名**的文本，詞彙分數**顯著低於**讀隨機書名；
  而且學習者**覺得重複讀很無聊**（🔴 經二手摘要轉述，⛔ 未對原文）。
- ⭐⭐ **而且「同一主題」與「同一作者」不是同一件事**：
  [兒童真實閱讀素材的詞彙再現研究](https://files.eric.ed.gov/fulltext/EJ793218.pdf)指出，
  **同一作者的小說主要重複的是角色名、地名這類一般敘事詞彙**，
  **主題式閱讀才會重複專門的內容詞**。
  ⚠️ 這跟 W38 記的 Gardner 2008（主題聚焦利說明文／單一作者聚焦利敘事文）**不衝突但更精確**：
  ⭐ **要詞彙效益就選主題，不要選作者。**

⭐ **怎麼用在 Owen 身上**：窄讀留著，但 ⭐ **按主題窄讀（住房／求職／社保），⛔ 不要按「作者／連載」窄讀**，
而且 ⚠️ **要防無聊**——這正好跟 ⑧ 的焦慮／情緒那條接上。

#### ⑫ 法文本身：**第五週連續確認是空白**

W38／W42 都寫了「法文專屬閱讀研究查無」。本週再掃一次，仍然：
⛔ 沒有法文的覆蓋率門檻數字、⛔ 沒有法文的 wpm 常模、⛔ 沒有法文 CE 的子技能實徵研究。
⭐ **唯一的進展是 ④ 那條**：終於有一個**指名的、正在做法文**的研究（Van Parys & Montero Perez, EuroSLA 34）。
⚠️ 建議：**這一格不要每週再掃一次**（五次都空），改成「追那一篇」。

---

### 1B. 社群做法（⚠️ 個人經驗與商業備考站，無對照組）

⚠️⚠️ **跟 W42 一樣，Reddit 完全撈不到**（`reddit.com` 被 proxy 擋、搜尋也搜不出討論串）。
本節**幾乎全部是賣課的備考站與閱讀產品部落格**，請照 🟡／🔴 看。

#### ⭐ 考試格式：這週終於把 W38 留下的兩個矛盾收斂了（但官方仍未對）

| 項目 | 本週查到 | 等級 |
|---|---|---|
| TCF CE 題數與時間 | **39 題／60 分鐘**、四選一、**難度遞增** | 🟡 [tcf-canada.ca CE 頁](https://tcf-canada.ca/comprehension-ecrite/)（⚠️ 未確認是否 FEI 官方）、與 W38／W42 一致 |
| ⭐⭐ **CE 可以回頭改前面的題** | **閱讀可以回去改跳過或答錯的題；聽力不行** | 🟡 同上。⭐ **這是本週最實用的一條考試事實，而系統完全沒有這種練習形態** |
| 🔴 **逐題配分** | Q1–4 各 **3** 分／Q5–10 各 **9**／Q11–19 各 **15**／Q20–29 各 **21**／Q30–35 各 **26**／Q36–39 各 **33**。⭐ 我自己加總：**正好 699**；⭐ **Q20–39 ≈ 71% 的分數** | 🔴 [備考站](http://preparer-tcfcanada.com/public/blog/comprehension-ecrite-tcf-canada-lecture-strategique-pour-29-questions-parfaites)、[format 與 notation](https://www.flexilingo.com/fr/tcf-canada/guide/tcf-canada-format-et-notation)。⛔⛔ **官方從未公布逐題配分**，官方只說「難度遞增」。⚠️ 而且分數是 100–699 的**級距**，逐題分未必線性對應 |
| CLB/NCLC 7 門檻（閱讀） | **453 / 699**（聽力 458） | 🔴 備考站，與 W38 記的 453–498 相容 |
| ⭐ **TEF CE：W38 的「40 題 vs 50 題」矛盾收斂到 40** | **40 題／60 分鐘／滿分 300**、四選一、**可自由跳題**；⭐ 有一個備考站直接說「**很多備考站錯寫成 50 題**」 | 🟡 [TEF Canada reading 指南](https://www.languagenext.com/blog/tef-canada-reading/)、[format](https://nclcfrench.com/tef-canada-exam-format)、[完整指南](https://www.prepmyfrench.com/tef-canada)。⛔ 未對 CCI Paris 官方 |
| ⚠️ 「空白不扣分」 | 一個站說答錯或留空都不扣分 | 🔴 **無官方來源，⛔ 用前必對 FEI** |

⭐ **本週找到官方手冊的 PDF 鏡像**（[Manuel du candidat TCF Canada](https://www.afsf.com/exams/tcf/Manuel_du_candidat_TCF_Canada.pdf)），
⛔ 但主機被擋沒讀到。→ ⭐ **建議：這一份請 Owen 自己開一次**，它應該能一次解掉上面所有 🔴。

#### 備考站教的閱讀戰術（⚠️ 與 ③ 的研究證據衝突）

- 先找題目裡的關鍵字 → 再**斜線快讀（lecture en diagonale）**抓大意。
- 分開「整體掃讀抓大意」與「選擇性尋讀找特定資訊」。
- ⭐ **小心「同字不同意」的錯誤選項**：用了跟原文一樣的字，但改掉一個細節或否定。
  （⭐ 這條跟 W42 記的「限定詞強度 `certain` vs `possible`、因果方向 `cause` vs `conséquence`」同一族，
  是**具體可以直接變成題目**的辨識點。）
- 時間管理：39 題／60 分鐘、難度遞增，不要在前面耗太久。
- ⚠️⚠️ **衝突**：這些站一律教「先略讀」，而 ③ 的 Brunfaut & McCray 說 **B1 的題幾乎都要 careful local reading、
  expeditious reading 很少見**。⭐ 我的處理：**兩邊並陳，但 A2→B1 這一段以研究那邊為準**
  （備考站的對象是已經能讀、要衝 C1 題的人）。
- ⛔ **證詞不可信**：兩個站的「成功故事」（圖書館員 Sarah 420 分、Sophie 420 分）**敘事高度相似、兩站都在賣課**。

#### 閱讀產品／教師部落格的具體流程（🟡 全部是賣閱讀素材的站）

- ⭐ **每天 15 分鐘 ＞ 一週一次兩小時**；另一站說 10–20 分鐘／天勝過偶爾長時間
  （[A2→B1 突破](https://getlectura.com/blog/how-to-go-from-a2-to-b1-french)、
  [每一級的法文閱讀練習](https://motsactu.com/blog/french-reading-practice-improve-every-level/)）。
  ⭐ 這跟系統現在的「今日閱讀 5 題」量級相容，**不需要改**。
- ⭐ **升級的判準：第一遍讀懂約 90% 才往上跳一級**
  （[A2 到 B1 會變什麼](https://www.frequence.academy/blog/french-a2-to-b1-what-changes-and-how-to-get-there)）。
  ⚠️ 有趣的是這個數字**比研究的 95–98% 低**，而且正好落在 Schmitt 那條「有人 90% 就讀得不錯」上（見 ④）。
- 四遍流程：① 不查字讀一遍 → ② 查了再讀 → ③ 複習生字 → ④ 只用法文再讀一遍；
  ⭐ **翻譯當「對答案」用，不要當對照文並排看**。
- ⭐ **重讀自己喜歡的東西**：A2–B1 階段「熟悉的情節 ＋ 重複」價值高（⚠️ 但見 ⑪ 的無聊反例）。
- ⚠️⚠️ **一條直接跟 ① 衝突的社群共識**：這些站說
  「A2–B1 讀不懂**幾乎都是詞彙缺口，不是文法**」（[改善法文閱讀](https://getlectura.com/blog/improve-french-reading-comprehension)）。
  ⭐ 而 Jeon & Yamashita 的統合分析說**文法 r = .85 ＞ 詞彙 .79**。
  → ⭐⭐ **這正好是第 5 節那個實驗要測的東西**：在 Owen 身上到底是哪一個。
- 🔴 ⛔ 「每天 60 分鐘，A2 到 B1 只要 4–6 個月」出自賣課的學校，**無來源，不要信**。

---

## 2. 家族歸類

### 2.1 本週每條發現屬於哪個家族

| 發現 | METHOD_MAP 家族 |
|---|---|
| ⭐⭐ 文法 r = .85 ＞ 詞彙 .79 ＞ 解碼 .56；文法 z = 0.54 的反面；⛔ 因果查無 | **A 刻意練習**——⭐ 但不是「多做文法題」，是**重新計算 A 的收益歸屬**（見 2.4） |
| 簡單觀 MASEM（理解 ＞ 解碼、>60% 變異）；後設語言無直接效果 | **跨家族的結構約束**（告訴你變異在哪，不告訴你練什麼）；⛔ 不另立 |
| Melby-Lervåg 2013：L2 落差在語言理解（−1.12）不在解碼（−0.12） | ⭐ **選戰場的證據**——弱化 **G（視覺側）**、強化 **A ＋ K** |
| Cassibba 2025：早期階段解碼解釋更多、正確率 ＞ 速度 | **G 感知解碼**的階段性反方；＋ W38 語言門檻／W42 Clapham 同一形狀 |
| ⭐⭐ B1 的題主要要 careful local reading、略讀很少用到 | **C 策略能力（考試側）的修正**——⭐ 它**刪掉**了 C 的一部分（見 2.4） |
| 詞彙覆蓋不是斷崖；⭐ 說明文可能要 100% | **跨家族的量的約束**（同 W37／W38 對覆蓋率的處理）；⛔ 不另立 |
| ⭐ 文本切塊／句法排版／phrase-cued／強制配速 | ⭐⭐ **N 版面與配速工程（新家族，見 2.2）** |
| 句法剖析訓練 → 閱讀速度上升 | **A**（訓練讀者那一側）；⭐ 跟 N（改造文本那一側）是同一題的兩個答法 |
| ⭐⭐ 自我提問；**通用題幹 ES 1.12**；L2 不一致 | **C 策略能力** ＋ ⭐ **D（當對手是 AI 時，見第 6 節）** |
| 讀完回想／free recall ＋ 自我解釋；⚠️ 有負向測驗效應 | **A**（提取練習）＋ ⭐ **診斷工具**（測量用，同 W42 對回述的處理） |
| ⭐ 閱讀焦慮 r = −.28 ～ −.43；AI 平台降焦慮 | **F 動機工程**——⭐ 但它給了 F 第一個**可量化的效果量**（見 2.4） |
| ER 2025 新統合分析（小到中、⚠️ 效果隨年份上升） | **B 可理解輸入**（閱讀版）——數字再確認，結論不變 |
| AI 競爭式提問（N=87）、心智圖、生成題目 | **D AI 對話夥伴**（⭐ 用在接收端）；⚠️ CEFR 分級文本維持 ⛔ |
| ⚠️ 窄讀：主題式有效、同書名反而更差、會無聊 | **B ＋ E 內容驅動**——⭐ 修正 W38 的玩法（見 2.4） |
| 🔴 TCF 逐題配分、⭐ **CE 可以回頭**、同字不同意的干擾選項 | **C 策略能力（考試側）**；⭐ 考前用不是平常用 |

### 2.2 ⭐⭐ 找到新家族：**N 版面與配速工程** → 已補進 [`METHOD_MAP.md`](../METHOD_MAP.md)

**判定理由（照 W42 建立的三條門檻，三條都要成立）**：

1. **機制跟 A–M 都不一樣。** 十三個家族的重複單位分別是：
   語言項目（A）、輸入量（B）、打磨過的獨白（C）、對手（D）、素材（E）、動機（F）、感知（G）、
   你寫的那一篇（H）、一個有非語言結果的任務（I）、練完之後不練習的那段時間（J）、
   你對這個主題知道多少（K）、聽者的損失函數（L）、一個字有沒有聲音版本（M）。
   ⭐⭐ **N 的單位是「這段文字在畫面上長什麼形狀」——而且它改的不是學習者，是素材。**
   A–M 全部在改變**人**（或改變人練習的安排）；⭐ **N 是唯一一個「人完全不動」也會改變分數的家族。**
2. ⭐ **它有一個自己的反直覺**：
   J 是「不練習也會變強」、K 是「不碰這個語言也會變強」、L 是「有些錯誤不用修」，
   ⭐ **N 是「把同一篇文章換個排版，分數就不一樣——而且程度越低差越多」。**
3. **它跟既有家族有明確衝突，而且衝突有證據**：
   - 跟 **A** 衝突：A 說能力要長在讀者身上；N 說**把句子切好給他就行**。
     ⭐⭐ 而**兩邊都有證據**：句法剖析訓練讓**讀者**變快（1A ⑤ 第二列），
     文本切塊讓**文本**變好讀（第一列）——⚠️ **沒有研究直接比較過這兩條路。**
   - 跟 **B** 衝突：B 說量大就好；N 說 RWL 的整體 g 只有 .18，
     ⭐ **而實驗者強制配速時 g = 0.41、自己控速沒有可靠效果**（W38 已記的 RWL 統合分析，30 研究／1,945 人）
     ——也就是說 **B 的工具真正起作用的成分是 N**。
   - **最關鍵的那個未解衝突**：⚠️⚠️ **鷹架拆掉之後還在嗎？** 考試不會替他切句子。
     ⛔ 這些研究**都沒測遷移**，所以 N 目前只能當**學習模式的開關，不能進驗收模式**。

⚠️⚠️ **誠實說三件對 N 不利的事（⛔ 不要因為它是新家族就高估它）**：

- **它是這張地圖上證據最弱的一個家族。** VSTF 的結果混合（英語學習者整體無效益、六年級有四年級沒有）、
  切塊研究樣本小、**而且有一篇 EFL 複製研究已被撤稿**。
- ⭐ **它跟 W42 §2.3 的裁定正面相撞。** W42 當時把「螢幕 vs 紙本」**刻意不另立家族**，理由是
  「它是**條件**不是**槓桿**——它不告訴你要做什麼練習」。
  ⭐ **我認為本週的證據改變了這個判斷**：切塊／排版／配速**不是環境條件，是你可以主動施加的介入**，
  有效果量、有調節變項（**低程度有效、高程度無效**）。
  → 所以 N 吸收的是 **W42 的媒介效應 ＋ W38 的 RWL 配速 ＋ W37 的 TTS 速率 ＋ 本週的切塊與排版**，
  ⭐ 也就是 **W42 缺口 6 自己說的那件事**：「我們一直沒有一個統一的『配速／載體』旋鈕，
  三條指向同一個設計決定……建議這件事不要再每週各自提一次」。
  ⭐⭐ **立一個家族就是「不要再每週各自提一次」的做法**——給它一個格子，而不是每輪重新發現它。
- ⭐⭐ **所以：如果 Owen 認為 N 不該算一個家族（例如認為它只是 A 的呈現層、或認為 W42 的裁定本來就對），
  請直接否決，`METHOD_MAP.md` 的 N 節可以整段刪掉。** 這跟 W42 對 K 的處理一樣。

### 2.3 ⚠️ 三個**刻意不**另立家族的（寫出來，避免下次又撞）

- **簡單觀／成分模型（SVR）**：它是**會計科目**不是槓桿——它把變異拆給「解碼」與「語言理解」，
  但不告訴你拿什麼去補。⛔ 不另立；⭐ 但它值得一條**約束**：
  **L2 的缺口壓倒性地在「語言理解」那一欄（d = −1.12 vs 解碼 −0.12）**。
- **閱讀焦慮**：它是 **F 動機工程**的子構念，不是新槓桿。⭐ 但它讓 F 第一次有了效果量（見 2.4）。
- **提取練習／free recall**：L2 文本證據薄又有負向反例，而且它跟 A 的機制同源（提取）。
  ⛔ 不另立；⭐ 當**診斷工具**用（配合 W42 的「蒙對偵測」）。

### 2.4 ⚠️ 本週修正了前幾輪的四條

| 原本寫的 | 本週的證據 | 處理 |
|---|---|---|
| W38 參數表只有「詞彙量與理解 r = 0.57」，**沒有文法那一格** | Jeon & Yamashita 2014：**文法 .85 ＞ 詞彙 .79**；⚠️ 另一篇只給 z = 0.54；⛔ 因果查無 | ⭐ **補上，但兩個數字並列**。⛔ 不要據此新增文法頁——要改的是**歸屬**：既有文法練習應該算進閱讀的帳 |
| W38／W42 的 🔴 清單裡有「略讀／掃讀、先讀題」當考試戰術（C 家族） | Brunfaut & McCray：**B1 的題幾乎都要 careful local reading，expeditious reading 很少見** | ⚠️ **降級**：⛔ A2→B1 這一段不要投資「練略讀」；⭐ 留到接近考試再當時間管理用 |
| W38 第 6 節做法三「窄讀**追連載**，用系列感取代題庫感」 | ⭐ 同一作者主要重複的是角色／地名，**主題式才重複內容詞**；⚠️ 同書名反而詞彙分數更低、而且無聊 | ⭐ **改成按主題窄讀**（住房／求職／社保），⛔ 不要按作者／連載；⚠️ 並且要防無聊 |
| W38 參數表「98% ≈ 8,000 詞族」被當成門檻 | ⛔ 不是斷崖（有人 90% 就讀得不錯、100% 也不保證懂）；⭐ **說明文可能要 100%** | ⭐ 改寫成**連續曲線 ＋ 文體條件**；⭐ 並標注 TCF CE 全是說明文＝最貴的那一側 |

⭐ **另外補一句給 F 家族**：`METHOD_MAP.md` 的 F（動機工程）一直沒有自己的效果量，
本週給了它一個：**閱讀焦慮 × 閱讀成就 r ≈ −.28（Li 2022, 40 篇）到 −.43（2025 華語）**。
⚠️ ⛔ 我**沒有**改 F 那一節（授權只到「新家族補一節」），這條留給 Owen 決定要不要寫進去。

---

## 3. 可以直接抄的實作參數

> ⚠️ 每一列都標依據等級。🟢＝有樣本數的研究（**本週全部只到檢索摘要**）；🟡＝實務／二手；🔴＝待驗證。
> ⛔ 🔴 的那幾列**用前必須對官方**。

| 參數 | 數值 | 依據 |
|---|---|---|
| ⭐⭐ **閱讀最強的語言關聯物** | **文法 r = .85 ＞ 詞彙 .79 ＞ 解碼 .56**；聽力 .77；⛔ 元認知 .32（最弱） | Jeon & Yamashita 2014（*Lang Learn* 64）🟢 |
| ⚠️ 同一題的另一個數字 | 文法 × 理解 **Fisher's z = 0.54**；⭐ **中學 ＞ 小學**；grade group 解釋 59% 異質性 | Frontiers Psych 2023（據轉述 86 研究，含法文學習者）🟢 |
| ⛔ **文法教學 → 閱讀的因果效果量** | **查無**（⛔ 不要把 .85 當成「去上文法課」的理由） | 本週專搜未得 |
| ⭐ 閱讀變異的拆法 | 解碼 ＋ 語言理解解釋 **>60%**，⭐ **理解那一塊更大**；後設語言**無直接效果** | Lee/Jung/Lee 2022（MASEM，67 研究／N=10,526）＋ Hamada et al. 2024 *SSLA* 🟢 |
| ⭐⭐ **L2 的缺口在哪一欄** | 語言理解 **d = −1.12（大）**、閱讀理解 −0.62、⛔ 解碼只有 **−0.12**、語音覺識 −0.08 | Melby-Lervåg & Lervåg 2013 🟢 |
| ⚠️ 早期階段的例外 | 習得早期**解碼解釋的變異更多**；⭐ 解碼**正確率 ＞ 速度** | Cassibba et al. 2025 *BLC*（⚠️ 兒童、透明正字法）🟢 |
| ⭐⭐ **B1 題目要的閱讀型態** | **以 careful local（仔細讀局部）為主**；skimming 偶爾；expeditious 整體少見、scanning 只有少數題 | Brunfaut & McCray（British Council）🟢（⛔ 樣本數未讀到） |
| **詞彙覆蓋（修正版）** | ⛔ 不是門檻是曲線；**敘事 98% 足夠、說明文可能要 100%**；有人 90% 就讀得不錯；理解標準 60% → 95%、70% → 98–99% | 覆蓋率研究群 🟢（⚠️ 皆非法文） |
| ⭐ **文本切塊給誰用** | **切得好 → 幫到較低程度 L2 讀者；高程度無效**；⛔ 切錯位置會干擾（中級受害最深） | 文本切塊研究 🟢（小樣本） |
| 句法剖析訓練 | **閱讀速度顯著上升**；⚠️ 訓練方式間無差；⭐ **要練夠久**自動剖析才出現 | 2018 EFL 研究 🟢 |
| ⚠️ **VSTF（句法排版）** | 結果混合：英語學習者**整體無效益**、分組分析有「中等好處」；**六年級有、四年級沒有**；⛔⛔ 一篇 EFL 複製研究**已撤稿** | Park & Warschauer 2016 等 🟢／⛔ |
| ⭐ 切塊的邊界 | 切塊改善**效率**，⛔ 單靠切塊**不太可能改善理解**——還要連得起塊與塊的關係 | Pulido 2021 眼動（轉述）🟢 |
| ⭐⭐ **自我提問的最佳形式** | 自我提問介入中位數 **ES ≈ 0.86**；⭐⭐ **通用題幹 ES = 1.12**、訊號詞 0.85；⚠️ 「提問」整體只有 **d = 0.21** | Rosenshine et al. 1996 這條線（轉述）🟢 |
| ⚠️ 自我提問在 L2 | **不一致**：菲律賓 ESL 無顯著；伊朗 EFL 有效、⭐ **低程度尤其**；Liu 2021 控制 L1 閱讀／詞彙／主題熟悉度後仍有助益、⭐ 有鷹架的密集互動效果更大 | 🟢（⛔ L2 pooled 查無） |
| 回想的最佳組合 | ⭐ **free recall ＋ 自我解釋**在複雜文本的**推論題**最好；自我解釋整體 g = .55；⚠️ 有負向測驗效應的反例 | 🟢（⚠️ 非 L2 專門） |
| ⭐ 回想用哪個語言 | **用中文**（W42 已拍板，本週無新證據推翻） | 🟢 |
| ⭐ **閱讀焦慮 × 成就** | **r = −.28**（40 研究）；整體外語焦慮 −.34（55 樣本，⚠️ 閱讀焦慮算「較弱」）；⚠️ 2025 華語 **−.427**（最強）；原始研究 −.41／−.48 | Li 2022／Zhang 2019／2025 Frontiers 🟢（⚠️ **彼此衝突**） |
| ER 效果（2025 最新） | 所有領域**小到中**；⭐ 混合 L1 樣本效果更大、EFL 更大；⚠️⚠️ **效果量隨出版年上升**（偏誤訊號）；研究品質非調節變項 | Sangers et al. 2025 *EPR* 🟢（⛔ 確切 d 未讀到） |
| ⭐ **AI 的最佳用法（接收端）** | **跟 AI 比賽對同一篇文章出問題**：N=87／五週，實驗組顯著進步、⭐ **對照組退步** | *CALL* 2025 🟢（準實驗、單場地） |
| ⚠️ AI 分級文本 | ⛔ **維持不信**：文本複雜度無法穩定對 CEFR、給範例只略改善、有「對齊漂移」；⭐ **但生成「題目」比生成「文本」可靠** | 🟢 多條 |
| ⭐ **主題窄讀 vs 作者窄讀** | **主題式重複內容詞**；⛔ 同一作者主要重複角色名／地名；⚠️ 同書名詞彙分數反而更低、而且無聊 | 🟢／🔴（反面那條是二手） |
| 🟡 每日劑量（社群） | **15 分鐘／天 ＞ 一週一次兩小時**；10–20 分鐘／天 | 閱讀產品部落格 🟡 |
| 🟡 升級判準（社群） | **第一遍讀懂約 90%** 才往上一級 | 🟡（⭐ 與 Schmitt 的 90% 巧合吻合） |
| **TCF CE 格式** | 39 題／60 分鐘／四選一／難度遞增；⭐⭐ **可以回頭改前面的題**（聽力不行） | 🟡 TCF Canada 站（⚠️ 未確認 FEI） |
| 🔴 **TCF CE 逐題配分** | 3／9／15／21／26／33 分（六段）；⭐ 加總正好 **699**；⭐ **Q20–39 ≈ 71% 分數** | 🔴 備考站。⛔⛔ **官方只說「難度遞增」，從未公布配分** |
| **TEF CE 格式** | **40 題／60 分鐘／滿分 300**、可自由跳題；⭐ W38 的「40 vs 50」收斂到 **40** | 🟡 多個備考站（⛔ 未對 CCI Paris） |
| 🔴 空白是否扣分 | 一站說不扣 | 🔴 ⛔ 必對官方 |

---

## 4. 跟現有系統的缺口對照

> 以下**全部是這個 session 實際讀程式碼／跑腳本算出來的**，不是憑記憶。

### 4.0 現況

**① 題庫（`reading_articles.js`，跑腳本算的）**

| 項目 | W38 當時 | **現在（2026-11-09）** |
|---|---|---|
| 文章數 | 33 | **61** |
| 題數 | 99 | **183** |
| 總字數 | 3,290 | **6,328** |
| 平均／中位數字長 | 99.7／72 | **103.7／105**（最短 38、最長 258） |
| 等級分布 | A1×5、A1+×15、A2×13 | A1×5、A1+×15、**A2×38**、A2+×3 |
| ⛔ **B1 以上** | **0 篇** | ⛔ **仍然 0 篇**（第四輪確認） |
| 主題數 | 27 | **34**（Travail 6、Logement 4、Réseaux sociaux／Invitation／Loisirs／Santé 各 3…） |

⭐ 一年來題庫幾乎翻倍（＋28 篇／＋3,038 字），**但等級天花板沒動**。

**② 今日閱讀（`quest.html` 1496–1600 行）** — 用 Supabase 私人空間的 TCF 真題，
每天 5 題（目標題號 `[7,12,17,22,27]` ＋ `shift = day % 3`）、三層跳過都有、答錯才出中文解析。

**③ ⭐ 系統已經有「句子解剖」的硬體，只是沒指向閱讀**
`tense_xray.html`／`tense_xray.js`（讀短文，可以「開燈」把每個動詞的時間形狀浮在字上面，⛔ 無題目無計分）
＋ `tense_lens.html`／`tense_lens.js`（把句子裡**一個動詞**挑出來跑四個開關，素材 100% 取自 `codex.js`）。

### 缺口（按嚴重度排）

**✅ 先報好消息：W42 的缺口 1（真 bug）已經修好了**

`quest.html:1585` 現在是 `function readSkipQ(){ … towerMarkKnown(q.key); … }`，
而且 `readRank()`（1591–1596 行）把跳過的題排到最後（14 天內 rank 3），`READ_SKIP_DAYS=14`。
⭐ 1583 行還留了註解寫明是「每週研究 W42 抓到」。**這條結案。**

---

**⛔⛔ 缺口 1（三輪未修，而且是測量的根）：`reading.html` 的計時器**仍然**沒有重置**

- `startTimer()` 在 `reading.html:267` 定義，⭐ **只在 `DOMContentLoaded` 被呼叫一次（263 行）**。
- `openArticle()`（379 行）**沒有**重新計時。
- 所以存進 `clb7_reading` 的 `sec`（487 行 `sec: timeTaken`）量的是
  ⛔ **「從打開這個頁面到按下送出」**，不是「讀這一篇用了多久」。
  開著頁面去倒杯水 → 那一篇的 `sec` 就廢了。
- ⚠️ **W38 就寫過這條、W42 沒重查、本週實測仍在。** 而且本週 ④ 與 ⑤ 兩條新證據都需要這個數字
  （文體×覆蓋率、切塊對速度的效果都只能用時間量）。
- ⭐ 修法（**⛔ 不在本 session 授權內**）：`openArticle()` 裡加一行 `startTimer()`。一行。
- ⭐ 而且 `wpm` 全站只出現在 `french_basics.html`（跟閱讀無關）→ **系統到今天還是沒有一筆可用的閱讀速度資料**。

**⭐⭐ 缺口 2（本週最大的新缺口）：最強的那根槓桿（文法）沒有接到閱讀**

- 1A ① 說文法是閱讀最強的關聯物（r = .85，⚠️ 另一說 z = 0.54）。
- 系統有一整套文法機器，**但它們全部跑在產出側的素材上**：
  `tense_lens` 的句子 100% 來自 `codex.js`、`tense_xray` 讀的是**為了練時態自己寫的短文**
  （`tense_xray.js` 檔頭自己說明了為什麼要自創：當時 23 篇裡只有 3 篇是敘事體）。
- ⛔ **沒有任何一個工具會對「今日閱讀的那 5 題考試文本」做句子解剖。**
- ⭐ 而且 `tense_xray`／`tense_lens` 只處理**時態**——⛔ 不處理 1A ③ 說 B1 題目真正要的
  「**這一句的主詞是誰、動詞配合誰、有沒有否定**」。
- ⭐⭐ **好消息是硬體已經做好了**：要的是把它指向考試文本、並多兩個開關（主詞／否定），
  ⛔ 不是從零做一頁。

**⭐ 缺口 3（新，來自 1B 官方格式）：沒有「可以回頭」的練習形態**

- TCF CE **可以回去改前面的題**（聽力不行）——這是一個**真實考試裡存在、而系統從未練過**的動作。
- `quest.html` 的今日閱讀是**單向**的：`readNext()` 只有 `RD.i++`（1586 行），⛔ 沒有回上一題。
- ⭐ 加上 🔴 的配分（Q20–39 ≈ 71%），真實的最佳策略是「**先掃一遍、難題留著、回頭補**」，
  ⛔ 而系統練的是「一題一題往前、不准回頭」。
- ⚠️ 但這是**驗收形態**不是學習形態（W42 第 4 條開放問題已經問過 Owen 要不要另開一個驗收形態，**還沒回答**）。

**⭐ 缺口 4（新，來自 1A ⑧）：⛔ 系統一筆情緒／焦慮資料都沒有**

- 閱讀焦慮跟成就的相關（−.28 ～ −.43）**比元認知（.32）大、跟解碼（.56）同量級**，
  而且 `CLAUDE.md` 整段「練習頁鐵律」就是因為一次挫折事件寫出來的。
- 但 `clb7_reading` 只存 `{id, title, date, correct, total, sec}`——⛔ **沒有任何一欄是「這篇讀起來怎樣」**。
- ⭐ 既有的零件其實夠了：`clb7_hard_flags`（🔴 手動標記，不看對錯）已經是這個形狀，
  ⛔ 但 `reading.html`／今日閱讀**都沒有接**。
- ⚠️ ⛔ 不要做成問卷（那會變成另一個要填完的東西＝正是他放棄練習的原因）。
  ⭐ 最小版本：答完那一篇只問**一個**可跳過的二元問題。

**缺口 5（R37／R38 的建議，第三輪確認仍未進去）**

| 建議 | 狀態（本週實測） |
|---|---|
| R37：`examRecord()` 默默多存每題 `sec` | ⬜ **仍未實作**——`quest.html:1341` 還是 `a[key]={ok:!!ok, last:Date.now()}` |
| R38：`readQ()` 題幹移到圖片**上方**、⛔ 選項不動 | ⬜ **仍未實作**——`readQ()`（1558–1567 行）順序仍是 `eximg` → `.q` → `.opts` |
| R38：答完才提供可選的「整篇再看一次」 | ⬜ 仍未實作 |

**缺口 6（第四輪確認）：題庫 0 篇 B1**

- W38 的結論是只剩「接真實素材」一條路（RFI／1jour1actu／TV5Monde），W42 補了「真實報刊素材＋現成練習」的書。
- ⭐ **本週多一條約束**：④ 說**說明文可能要 100% 覆蓋**，而 TCF CE 全是說明文。
  → ⛔ 直接丟 B1 說明文給他會踩在最貴的那一格；⭐ 中間步應該是
  **A2+ 的說明文（公告／廣告／行政短文）先變多**，而現在這一格只有 3 篇（A2+）。
- ⚠️ 而 ⑩ 再次確認 ⛔ **AI 生成分級文本仍不可信**（⭐ 但生成**題目**可以）。

**缺口 7（跨技能，第四次出現）：載體與配速沒有旋鈕**

- W37 要「TTS 速率當訓練變數」、W38 要「RWL 配速器」、W42 要「螢幕／說明文／限時」、
  本週要「文本切塊」。⭐ **四輪都指向同一件事**，這就是我立 N 家族的原因（2.2）。
- ⭐ 建議：⛔ 不要再每週各自提一次。**等 Owen 對 N 家族表態**，要嘛做一次統一的旋鈕，要嘛把這條關掉。

---

## 5. 一個 15 分鐘就能試的實驗（明天就能做，⛔ 不用等我改程式）

### 🧪「五句解剖」——測出 Owen 的閱讀瓶頸到底是**詞彙**還是**文法**

**為什麼要做這個**：本週最大的矛盾是 ⭐ **研究說文法（r = .85）＞ 詞彙（.79），
而社群一致說「A2–B1 讀不懂幾乎都是詞彙缺口」**（1B）。
⛔ 這兩個說法在「一般學習者」身上誰對，我查不到定論。
⭐⭐ **但在 Owen 一個人身上，15 分鐘就能測出來**——而且這個分類**直接決定教學鐵律要走哪一欄**。

**怎麼做（總共 15 分鐘）**

1. **選素材（1 分鐘）**：打開 `reading.html`，挑**一篇已經讀過、而且當時答錯過題**的 A2 文章。
   （⭐ 要讀過的，因為我們不是在測理解，是在測**他能不能剖析句子**。）
2. **挑五句（1 分鐘）**：從那篇裡挑**最長的五句**（字數最多的五句，不要挑簡單的）。
3. ⭐ **對每一句，只回答這五個問題，全部用中文講出來（每句 2 分鐘）**：
   | # | 問題 | 這一格在測什麼 |
   |---|---|---|
   | ① | **主詞是誰？**（指出那個字） | 句法 |
   | ② | **主要動詞是哪一個？**（指出那個字） | 句法 |
   | ③ | **這句在講過去、現在還是未來？** | 形態 |
   | ④ | **有沒有否定？否定的是哪一件事？** | 形態 |
   | ⑤ | **這句裡有幾個字你不認識？** | 詞彙 |
4. **記成一張表（2 分鐘）**：五句 × ①–④ 答對幾個、⑤ 總共幾個生字。

**怎麼判讀（這是重點，⛔ 不要只收集資料）**

| 結果 | 判定 | 照教學鐵律該做什麼 |
|---|---|---|
| ①–④ 幾乎全對，⑤ 生字很多 | **詞彙瓶頸**（社群那邊對） | 詞彙側（M 家族／覆蓋率），⛔ 不要再加文法練習 |
| ⑤ 生字很少，但 ①–④ 會錯或**要想很久** | ⭐⭐ **文法瓶頸，而且是「自動化缺口」** | ⛔ **不要重講規則**（鐵律：知識已經在了，再講只是浪費）→ **直接給壓縮練習**：同結構連發 5–8 個 |
| ①–④ 講不出規則就是錯 | **概念缺口** | 解釋它在 French OS 哪一區 |
| 兩邊都還行，但**五句讀下來很累** | 指向 **N 家族**（版面／配速）或工作記憶 | 看第 6 節做法二 |

⭐ **為什麼這個實驗值得做**：它不是「多練一次」，是 ⭐ **把「我讀不懂」拆成兩個可以分開處理的東西**。
而且 ①②④ 這三格**是選擇題量不到的**——1A ③ 說 B1 的題要 careful local reading，
但答對一題選擇題可以靠內容詞蒙（W42 缺口 2）。⭐ **這個實驗是蒙不過去的。**

⚠️ **侷限（寫出來）**：n=1、一篇、五句，⛔ 不是測驗。
它的用途是**選戰場**，不是打分數。做兩三篇不同主題的會比一篇可信。

⭐ **變體（如果想順手測第二件事）**：在步驟 3 之前，先用**通用題幹**自己出兩題
（「這段的主要論點是什麼？」「X 跟 Y 有什麼關係？」「為什麼會發生 X？」），
再去看原本的題目。1A ⑥ 說**通用題幹是整份文獻裡效果量最大的那一格（ES 1.12）**。

---

## 6. 🎮 怎麼讓它更好玩

> ⚠️ Owen 的鐵律：「學得又快又好玩又好」。⛔ 以下每一條都要能進遊戲（交付鐵律的大腦檢查見本節末）。

### 做法一：⭐⭐ **「跟 Luc 搶著出題」——把 1A ⑥ ＋ ⑩ 合起來，這是本週最強的一條**

**依據**：*CALL* 2025 的競爭式提問（N=87、五週、⭐ **實驗組進步、對照組退步**）
＋ 自我提問的**通用題幹 ES = 1.12**（兩條都在 1A）。

**玩法**：讀完今日閱讀的那段文本之後，⛔ 先不要看題目。

1. 畫面給他**三個通用題幹**（固定的，不要他自己想）：
   「這份文件要我做什麼？」「X 跟 Y 的關係是？」「如果 ___ 會怎樣？」
2. ⭐ **他挑一個、填完，變成一道題。** 然後 **Luc（系統裡既有的角色）也出一道。**
3. **兩道題並排，他先答 Luc 那題、Luc 答他那題。**
4. ⭐⭐ **計分是反過來的**：
   - 他答對 Luc 的題 → 一般得分
   - ⭐⭐ **Luc 答錯他的題，或答得吞吞吐吐 → 他得「出題分」，而且分數更高**
5. ⭐ **他出的題進題庫**（標 `src:'owen'`），之後當老朋友回來。

**為什麼這個好玩而且合鐵律**：
- ⭐ **他從被考的人變成出題的人**——這直接打中他放棄練習的那個感覺（「我沒填完就無法完成」）。
  **出題沒有「填完」這個概念，不會卡住。**
- ⭐ 完全符合內容鐵律：**他出的題是針對課程／考試文本問的問題**，⛔ Claude 沒有自創法文教材句。
- ⭐ 符合 ⑧（降焦慮）：出題時**沒有對錯**，而「AI 閱讀平台降低閱讀焦慮」那條證據同向。
- ⭐ 跳過仍然合法：三個題幹都可以「這題跳過」。

### 做法二：⭐ **「句子解剖台」——把第 5 節的實驗變成一格，而且硬體已經有了**

**依據**：文法 r = .85（①）＋ B1 要 careful local reading（③）＋ 第 5 節的五個問題。

**玩法**：把 `tense_xray.html` 的「開燈」機制**指向今日閱讀那篇考試文本的最長一句**，
但把開關從「只有時態」擴成四個：
**①點出主詞 ②點出主要動詞 ③這句在哪個時間 ④有沒有否定**。

- ⭐ **計分用起手時間**（跟 `verb_sprint` 同一套反射標準，系統已經有這個機器）——
  ⛔ 不是正確率，因為正確率在這裡會很快就滿分，而「要想幾秒」才是真正在變的量。
- ⭐ **「開燈」留著當求助**：想不出來可以開燈看答案，⛔ 但開燈那次不計分（而且不算錯）。
- ⭐ **成長感**：解剖對的句子，**那一篇文章在地圖上就「亮」一格**。

**為什麼**：⭐ 這是本週唯一一條「最強槓桿 ＋ 現成硬體」重疊的地方。
⛔ 而且它刻意**不是**一個新的文法頁——它是把閱讀文本餵給既有的文法鏡頭。

### 做法三：**「搶分模式」——把 🔴 的配分變成一個有終局的玩法**

**依據**：🔴 TCF CE 配分 3／9／15／21／26／33（Q20–39 ≈ 71% 分數）
＋ ⭐ **官方說 CE 可以回頭改題**（1B）＋ 缺口 3。

**玩法**：一個**獨立的驗收模式**（⛔ 不要混進每日練習）：
一次給 10 題、**題號照真實難度段分布**、分數照上面那組配分，
⭐ **而且可以回頭改**——畫面上有一條題號列，哪題沒答、哪題標記待回頭，一眼看到。
終局是「這一輪拿到幾分 / 699 的等比例」。

- ⭐ 為什麼好玩：**它有一個真正的策略選擇**（先掃一遍還是按順序走），而每日練習沒有策略。
- ⚠️⚠️ ⛔ **但配分是 🔴 未經官方確認的**。所以這個模式**只能在畫面上寫「依備考站流傳的配分，非官方」**，
  ⛔ 不可以當成真實分數預估。⭐ 或者：**等 Owen 開了官方手冊（1B 末）再做**。

### ⚠️ 大腦檢查（交付鐵律：「這功能的資料能進遊戲嗎」）

| 做法 | 產生什麼資料 | 能進遊戲嗎 |
|---|---|---|
| 一 搶著出題 | 他出的題（`src:'owen'`）＋ Luc 答錯率 | ✅ **題目本身就進題庫**；出題分可以餵夥伴成長 |
| 二 句子解剖台 | 每句四個開關的**起手時間**（跟 `clb7_sprint_cells` 同形狀） | ✅ 哪個開關慢 → 遊戲優先出那類句子；站穩的讓夥伴長大 |
| 三 搶分模式 | 一輪的得分與「回頭改了幾題」 | ✅ 可以當終局挑戰；⚠️ 但分數是 🔴 的，⛔ 不要寫成預估分 |
| （缺口 4 的）情緒一問 | 「這篇讀起來怎樣」一個二元值 | ⚠️ **能進，但要先確認意義**——⛔ 它不決定出什麼題，只決定**要不要降低某主題的頻率** |

---

## 7. 來源清單

### 研究（🟢 摘要層級：作者／年份／樣本數／效果量**全部來自檢索摘要**，⛔ 本週一篇原文都沒讀到）

**閱讀的相關物與結構**
- [Jeon & Yamashita 2014, *Language Learning* 64:160–212](https://onlinelibrary.wiley.com/doi/abs/10.1111/lang.12034)（[ERIC](https://eric.ed.gov/?id=EJ1030046)）— 文法 .85／詞彙 .79／解碼 .56／聽力 .77／元認知 .32
- [Jeon & Yamashita 2022 更新版章節](https://benjamins.com/catalog/bpa.13.03jeo) — 加 30 研究／40 獨立樣本（2011–2017）
- [Frontiers in Psychology 2023「文法知識與閱讀理解」統合分析](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2023.1098568/xml)（[PMC](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10042300/)）— z = 0.54、86 研究（轉述）、含法文學習者
- [Lee, Jung & Lee 2022, *Scientific Studies of Reading*](https://eric.ed.gov/?id=EJ1370515) — MASEM、67 研究／N=10,526、>60% 變異
- [Hamada, Shimizu, Hoshino, Takaki & Ushiro 2024, *SSLA*](https://www.cambridge.org/core/journals/studies-in-second-language-acquisition/article/robust-evidence-for-the-simple-view-of-second-language-reading-secondary-metaanalysis-of-jeon-and-yamashita-2022/B16B4EF6A48AE17B3E46269FB1972866) — 複製研究、後設語言無直接效果、⚠️ 部分相關未複製成功
- [Melby-Lervåg & Lervåg 2013](https://pubmed.ncbi.nlm.nih.gov/23937316/) — 語言理解 d=−1.12／解碼 −0.12
- [Cassibba et al. 2025, *Bilingualism: Language and Cognition*](https://www.cambridge.org/core/journals/bilingualism-language-and-cognition/article/reading-comprehension-of-children-acquiring-a-transparent-language-as-l2-a-study-with-the-simple-view-of-reading-model/8BA64925F1B3CA2D81800BF74C61495D) — 早期解碼權重更大、正確率 ＞ 速度
- [L2 閱讀相關係數統合分析的回顧（*Educ Sci* 2024, 14(7), 715）](https://www.mdpi.com/2227-7102/14/7/715) — ⛔ 主機被擋，只用於定位
- [Linguistic Factors Influencing L2 Reading Comprehension](https://www.researchgate.net/publication/366325083_Linguistic_Factors_Influencing_L2_Reading_Comprehension) — 🟡 論述：詞彙不足時文法與策略收益小

**careful vs expeditious／測驗側**
- [Brunfaut & McCray, British Council — 閱讀作答時的認知歷程](https://www.britishcouncil.org/sites/default/files/brunfaut_and_mccray_report_final_0.pdf) — ⭐⭐ B1 以 careful local 為主（⛔ 樣本數未讀到）
- [careful vs expeditious reading 研究](https://www.academypublication.com/issues/past/tpls/vol03/06/02.pdf)、[構念效度](https://www.macrothink.org/journal/index.php/ijele/article/download/4018/3334)、[IELTS 個案](http://www.savap.org.pk/journals/ARInt./Vol.1\(3\)/2011\(1.3-03\).pdf)
- [Assessing CEFR level（歐洲理事會）](https://rm.coe.int/assessing-cefr-level/1680a9178c)
- [L2 閱讀理解測驗信度的統合分析（*SSLA*）](https://www.cambridge.org/core/journals/studies-in-second-language-acquisition/article/metaanalysis-of-the-reliability-of-second-language-reading-comprehension-assessment-tools/D5404A631C50E65FC7912C0B930F62EF)

**詞彙覆蓋**
- [Laufer & Ravenhorst-Kalovski 2010](https://files.eric.ed.gov/fulltext/EJ887873.pdf)
- [敘事 vs 說明文的覆蓋率](https://www.sciencedirect.com/science/article/abs/pii/S1475158522000741) — ⭐ 說明文可能要 100%
- [Research investigating lexical coverage](https://files.eric.ed.gov/fulltext/EJ1316858.pdf)、[coverage–comprehension model](https://files.eric.ed.gov/fulltext/EJ1296462.pdf)、[詞彙與小學覆蓋率](https://link.springer.com/article/10.1007/s11145-022-10385-0)
- ⭐ [Van Parys & Montero Perez（EuroSLA 34）法文與英文青少年學習者的覆蓋率](https://biblio.ugent.be/publication/01JZ85FRT457KVMBAHRMKYGH31)（[另一筆](https://biblio.ugent.be/publication/01JZ87AEXX08AD6AP8587XW80N)）— ⛔ 只有摘要、無結果

**版面與配速（N 家族的證據）**
- [文本切塊對 L2 讀者的效果](https://files.eric.ed.gov/fulltext/EJ901547.pdf) — ⭐ 低程度有效、高程度無效、切錯會干擾
- [句法剖析訓練與閱讀速度（2018）](https://files.eric.ed.gov/fulltext/EJ1193158.pdf)
- [切塊閱讀策略訓練（2024, *System*）](https://www.sciencedirect.com/science/article/pii/S0346251X2400277X)、[切塊訓練與句法覺識](https://files.eric.ed.gov/fulltext/EJ1399504.pdf)
- [Park & Warschauer 2016, *LLT* 20(3)](https://scholarspace.manoa.hawaii.edu/server/api/core/bitstreams/9ccd5dfa-d045-45cb-b52c-d63f98e40817/content)、[VSTF 與青少年讀寫](https://escholarship.org/content/qt4vw2g0m6/qt4vw2g0m6_noSplash_8a1f7918c6bb6f2baf2a27575fc2e3a9.pdf)、[以 VSTF 鷹架語言結構](https://escholarship.org/content/qt6235t25b/qt6235t25b.pdf)
- ⛔⛔ [**已撤稿**：VSTF 與 EFL 閱讀流暢度](https://link.springer.com/article/10.1007/s10936-021-09823-x) — **不可引用**，列出只為誠實
- [TextMix（引 Pulido 2021 眼動）](https://files.eric.ed.gov/fulltext/ED617890.pdf)、[Rasinski 1994 phrase-cued texts](https://eric.ed.gov/?id=EJ479336)

**自我提問與回想**
- [自我提問對閱讀理解的文獻回顧](https://www.researchgate.net/publication/276238566_The_Effects_of_Self-Questioning_on_Reading_Comprehension_A_Literature_Review)、[閱讀策略統合分析](https://files.eric.ed.gov/fulltext/ED493483.pdf) — Rosenshine et al. 1996 中位數 0.86／⭐ 通用題幹 1.12
- [Liu 2021：提問策略對 L2 閱讀理解](https://www.researchgate.net/publication/347625720_Does_questioning_strategy_facilitate_second_language_L2_reading_comprehension_The_effects_of_comprehension_measures_and_insights_from_reader_perception)
- [自我提問對困難讀者的綜整](https://www.researchgate.net/publication/336378078_Self-Questioning_Strategy_for_Struggling_Readers_A_Synthesis)、[菲律賓 ESL（無效）](https://scispace.com/papers/self-questioning-and-prose-comprehension-a-sample-case-of-1xkc8bxo42)、[伊朗 EFL（有效、低程度尤其）](https://www.researchgate.net/publication/303444948_The_Effect_of_the_Self-Questioning_Strategy_as_a_Generative_Learning_Strategy_on_Iranian_Intermediate_EFL_Learners%27_Reading_Comprehension)
- [閱讀策略與理解的統合分析](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8371629/) — ⚠️ 監控策略在 L1 ＞ L2
- [Bisra et al. 2018 自我解釋統合分析 g=.55](https://gwern.net/doc/psychology/spaced-repetition/2018-bisra.pdf)、[retrieval-based learning 十年回顧](https://files.eric.ed.gov/fulltext/ED599273.pdf)
- ⚠️ 反例：[ADHD 的 free recall 未勝重讀](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10715433/)、[負向測驗效應](https://www.tandfonline.com/doi/full/10.1080/00220973.2024.2392684)
- [L2 詞彙提取機會](https://www.researchgate.net/publication/227793575_Effects_of_Opportunities_for_Word_Retrieval_During_Second_Language_Vocabulary_Learning)

**閱讀焦慮**
- [Li 2022 外語閱讀焦慮統合分析（40 研究、r=−.28）](https://www.researchgate.net/publication/355031375_Foreign_language_reading_anxiety_and_its_correlates_a_meta-analysis)
- [Zhang 2019 *MLJ*（55 樣本、r=−.34）](https://onlinelibrary.wiley.com/doi/abs/10.1111/modl.12590)
- ⚠️ [2025 Frontiers in Education（華語學習者，閱讀焦慮 r=−.427，與 Zhang 衝突）](https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2025.1576224/full)
- [L1 閱讀焦慮統合分析（主張不同構念）](https://pmc.ncbi.nlm.nih.gov/articles/PMC13225606/)、[ESL 焦慮與工作記憶原始研究](https://www.sciencedirect.com/science/article/abs/pii/S1041608021001291)

**ER 與窄讀**
- [Sangers et al. 2025, *Educational Psychology Review* 37:96](https://link.springer.com/article/10.1007/s10648-025-10068-6)（[ERIC EJ1488706](https://eric.ed.gov/?id=EJ1488706)）
- [Nakanishi 2015 ＋ 傾向分數法](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7188915/)
- [窄讀與 L2 詞彙](https://www.researchgate.net/publication/277910589_Promoting_L2_Vocabulary_Learning_through_Narrow_Reading)、[Abdollahi 2016](https://onlinelibrary.wiley.com/doi/10.1155/2016/5454031)、[窄讀與閱讀理解](https://files.eric.ed.gov/fulltext/EJ1479905.pdf)、[窄讀推進 L2 能力](https://www.researchgate.net/publication/369839931_THE_POTENTIALS_OF_NARROW_READING_TO_ADVANCE_L2_PROFICIENCY)
- ⭐ [兒童真實素材的詞彙再現](https://files.eric.ed.gov/fulltext/EJ793218.pdf) — 同一作者重複的是角色／地名

**AI**
- ⭐⭐ [競爭式提問（*CALL* 2025, N=87, 五週）](https://doi.org/10.1080/09588221.2025.2577356)
- [ChatGPT 心智圖（*PLOS ONE* 2025）](https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0336185)、[ChatPRCS（arXiv）](https://arxiv.org/pdf/2309.12808)
- [學生 prompt 生成文本（*HSSC* 2025）](https://www.nature.com/articles/s41599-025-06265-x)、[ChatGPT 平台與閱讀焦慮](https://www.researchgate.net/publication/395898848_Original_Research_Training_Language_and_Culture_TRAINING_LANGUAGE_AND_CULTURE)
- CEFR 對齊：[GenAI 與 CEFR 準確度](https://files.eric.ed.gov/fulltext/EJ1466280.pdf)、[對齊漂移（西語家教）](https://arxiv.org/pdf/2505.08351)、[LLM 生成文法練習（arXiv 2026）](https://arxiv.org/pdf/2606.01592)、[CEFR 校準 AI 閱讀文本（*Educ Sci* 2025）](https://doi.org/10.3390/educsci16071068)、[BEA 2023 生成系統](https://aclanthology.org/2023.bea-1.52.pdf)、[LLM 當 L2 考生](https://ceur-ws.org/Vol-3894/paper7.pdf)

### 實務／社群（🟡 無對照組；⚠️ 本週的「社群」幾乎全是備考商家與閱讀產品站，Reddit 完全撈不到）

- 🟡 [TCF Canada 閱讀頁（題數／時間／⭐ 可回頭改題）](https://tcf-canada.ca/comprehension-ecrite/)（⚠️ 未確認是否 FEI 官方）
- 🔴 [逐題配分（3/9/15/21/26/33）](http://preparer-tcfcanada.com/public/blog/comprehension-ecrite-tcf-canada-lecture-strategique-pour-29-questions-parfaites)、[format 與 notation](https://www.flexilingo.com/fr/tcf-canada/guide/tcf-canada-format-et-notation)、[TCF Canada 2026](https://francaisprep.com/fr/tcf-canada)
- 🟡 TEF CE 格式：[LanguageNext](https://www.languagenext.com/blog/tef-canada-reading/)、[NCLC French](https://nclcfrench.com/tef-canada-exam-format)、[PrepMyFrench](https://www.prepmyfrench.com/tef-canada)、[francaisprep](https://francaisprep.com/blog/tef-canada-reading)
- 🟡 閱讀流程與劑量：[A2→B1 突破](https://getlectura.com/blog/how-to-go-from-a2-to-b1-french)、[改善法文閱讀（⚠️ 主張詞彙才是瓶頸）](https://getlectura.com/blog/improve-french-reading-comprehension)、[各級閱讀練習](https://motsactu.com/blog/french-reading-practice-improve-every-level/)、[A2 到 B1 會變什麼](https://www.frequence.academy/blog/french-a2-to-b1-what-changes-and-how-to-get-there)、[法文學習routine](https://frenchforsuccess.com/the-perfect-french-learning-routine/)

### 🔴 待驗證（⛔ 用前必須對官方，⛔ 不要寫進系統文字）

1. **TCF CE 逐題配分 3/9/15/21/26/33**（⭐ 加總正好 699、Q20–39 ≈ 71%）——⛔ 官方只說「難度遞增」。
2. **TEF CE 是 40 題**（本週收斂，但仍未對 CCI Paris 官方）。
3. **空白／答錯是否扣分**。
4. ⭐ **解法已經在手上**：[Manuel du candidat TCF Canada（官方手冊 PDF）](https://www.afsf.com/exams/tcf/Manuel_du_candidat_TCF_Canada.pdf)
   ——⛔ 本 session 的 proxy 擋住了，**請 Owen 自己開一次，上面三條應該一次解完**。

---

## 8. 下一輪閱讀（**W50**）之前，這份留下的開放問題

1. ⭐⭐ **N 家族該不該存在？** 本檔已依動作邊界在 `METHOD_MAP.md` 補了一節。
   ⚠️ 但它是地圖上**證據最弱**的家族（VSTF 結果混合、有一篇複製研究撤稿），
   而且它**推翻了 W42 §2.3 自己的裁定**（當時決定媒介效應「是條件不是槓桿，不另立」）。
   → ⭐ **如果 Owen 認為 W42 當時是對的，請否決，整節刪掉。**
2. ⭐⭐ **第 5 節的實驗結果決定下一步往哪走**（詞彙瓶頸 vs 文法瓶頸）。
   ⛔ 在他做過之前，**不要**據 r = .85 去加任何文法頁。
3. ⛔⛔ **缺口 1 是一行可以修的 bug，而它已經三輪沒修**
   （`reading.html` 的 `startTimer()` 要在 `openArticle()` 裡再呼叫一次）。
   ⭐ 這一條請交給互動 session；⚠️ **在它修好之前，任何關於閱讀速度／時間的研究建議都沒有資料可以驗。**
4. ⭐ **「可以回頭改題」要不要做成一個驗收形態？**（缺口 3）
   ⚠️ 這跟 W42 第 4 條開放問題是同一題，**Owen 還沒回答**；
   本週多了一個理由（官方明說 CE 可以回頭）與一個障礙（配分是 🔴）。
5. ⭐ **情緒要不要記一欄？**（缺口 4）閱讀焦慮的相關（−.28 ～ −.43）比元認知大，
   而系統一筆都沒有；⛔ 但不可以做成問卷。⭐ 要 Owen 決定「答完一篇問一個可跳過的問題」可不可接受。
6. ⚠️ **法文專屬閱讀研究連續五輪空白** → ⭐ 建議停止每週重掃，改成**追 Van Parys & Montero Perez 那一篇**。
7. ⚠️ **社群那一塊連續三輪只拿到商家那一半**（Reddit 被擋）。
   ⭐ 建議照 W42 的提議二選一：接受這一塊只有商業來源，或請 Owen 自己貼幾個他看過的討論串進來。
8. ⚠️ **10-02 那個待拍板的提案仍然開著**（`GAME_ROADMAP.md`：
   暫停新的 R 研究與遊戲功能，直到雲端 `updated_at` 連續 7 天有新值）。
   本檔是每週固定的技能研究例行，所以照跑；⭐ 但如果 Owen 同意暫停，這條例行也該一起停。
