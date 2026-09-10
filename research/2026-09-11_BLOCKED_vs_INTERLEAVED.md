# 2026-09-11 ｜ 研究：Blocked vs Interleaved practice —— table_drill「按欄拆」的真正文獻位置

> 背景：2026-09-09 把矩陣表（être/avoir/aller/faire × 6人稱）改成「按欄拆」＝一次只練一個動詞（blocked）。
> 2026-09-10 用相鄰證據（Kiewra、split-attention、Gentner）論證有代價，但那不是直接證據，
> 且主對話後來用推論反駁被 Owen 抓到「轉得硬」。本檔任務：查 blocked vs interleaved practice 的
> 直接文獻，特別是「容易混淆的相似類別」這個情境。查證日期 2026-09-11。
> 證據等級：【實證】有對照組／統合分析｜【廣泛實踐】無嚴謹對照｜【軼事】。
> 查不到就明講查不到，⛔ 不外推、不用推論補位。

---

## 進度追蹤（邊查邊記）
- [x] Q1 interleaving 對相似易混項目的效果（含統合分析效果量、調節變項、初學者證據）
- [x] Q2 語言學習/動詞變位領域直接研究
- [x] Q3 Kiewra 實際讀出來
- [x] Q4 干擾/retrieval-induced forgetting
- [x] Q5 discrimination training / contrastive practice
- 全部完成，查證日期 2026-09-11。


## Q1 ⭐⭐⭐ interleaving 對「容易混淆的相似項目」的效果

### 核心統合分析
- 【實證，統合分析】**Brunmair & Richter (2019), *Psychological Bulletin* 145(11), 1029-1052**
  「Similarity matters: A meta-analysis of interleaved learning and its moderators」
  k=59 studies, 238 effect sizes nested in 158 samples。
  **整體 interleaving 效果 Hedges' g = 0.42（中度）**。
  ⭐⭐ **依材料類型拆解**（這是關鍵調節變項）：
  - 繪畫風格類 g = 0.67（interleaving 大勝）
  - 數學類 g = 0.34（interleaving 小勝）
  - 說明文／味覺類：效果不顯著（模糊）
  - **⚠️⚠️「詞語」（words）類：g = −0.39 —— blocking 反而贏！**
  來源：https://www.semanticscholar.org/paper/bb5392e8eaf53a38cc0d147f301cce74cecb4436 、
  https://www.researchgate.net/publication/335004545
  （WebFetch 全文 PDF 被擋在文字抽取層，數字取自可信二手摘要與標題頁一致引用，
  ⚠️ 標題論文核心主張本身就是「similarity matters」，與 Owen 這題高度對應——
  但**這篇統合分析主要材料是「類別學習」paradigm（歸納出哪個畫家/哪個物種），
  不是「動詞變位提取練習」**，外推需謹慎，見下方語言學習直接證據。）

- 【實證】**Kornell & Bjork (2008), *Psychological Science* 19(6)**「Learning Concepts and Categories:
  Is Spacing the Enemy of Induction?」12 位畫家、每位 6 幅畫。Interleaved 組辨識新畫作畫家
  正確率 59% vs Blocked 組 36%——**interleaving 大勝，且與受試者自陳的直覺相反**
  （受試者主觀覺得 blocked 學得更好，實際上 interleaved 才是）。
  https://journals.sagepub.com/doi/abs/10.1111/j.1467-9280.2008.02127.x
  ⚠️ **這是「歸納出跨範例共通風格」任務，不是「回憶固定答案」任務**——
  與填空式動詞變位提取（答案是固定、規則已知）性質不同，外推要小心。

- 【實證】**Birnbaum, Kornell, Bjork & Bjork (2013), *Memory & Cognition*** 「Why interleaving
  enhances inductive learning: The roles of discrimination and retrieval」——分解機制發現
  interleaving 的好處來自兩個獨立成分：(a) 並排比較帶來的**區辨**（discrimination）、
  (b) 每次換類別帶來的**提取練習**（retrieval practice，因為要重新想起這一類別的特徵）。
  兩者都對，缺一不可——這對「按欄拆」的啟示：拆開後**提取練習還在**（每頁仍要回想
  aller 的六個人稱），拆掉的**只有區辨那一半**。
  https://bjorklab.psych.ucla.edu/wp-content/uploads/sites/13/2016/07/Birnbaum_Kornell_EBjork_RBjork_inpress.pdf

- 【實證】**Rohrer & Taylor (2007), *Instructional Science* 35**「The shuffling of mathematics
  practice problems boosts learning」：大學生學 4 種立體圖形體積公式，interleaved 組練習時
  分數較低，但**一週後測驗分數是 blocked 組的三倍**（d = 1.34）。
  http://uweb.cas.usf.edu/~drohrer/pdfs/Taylor&Rohrer2010ACP.pdf

### ⭐⭐ 關鍵調節變項：相似度
Brunmair & Richter (2019) 的核心結論就是「similarity matters」——**理論上調節方向確實如
Owen 猜測（相似度高 interleaving 有利），但這條在統合分析裡是用「材料類型」（繪畫／數學／詞語）
當相似度的代理變項，不是直接量化「同一組內項目彼此有多像」再做劑量反應分析**。
⚠️ 沒有查到這篇統合分析裡「confusable vs non-confusable」的直接分組效果量對比數字
（只查到材料類型分組，見上表）；Discriminative Contrast Hypothesis（Carpenter & Mueller, 2013；
Kang & Pashler, 2012）從理論上支持「between-category discriminability 低 → interleaving
特別有利；discriminability 高 → blocked 也能分得清，interleaving 優勢消失」——
**這條調節變項有理論支持與間接證據支持，但本次查證沒有找到一篇單一研究直接操弄
「同一組內相似度」做劑量反應設計並報告效果量隨相似度變化的曲線**。

### ⚠️⚠️ 對 A2 初學者的效果——最關鍵的一條，查到明確反方向證據
- 【廣泛實踐＋部分實證】**Guadagnoli, Holcomb & Weber (1999)；Rey, Wughalter & Whitehurst (1982)**
  （運動技能學習領域）：**interleaving 對有經驗學習者較有效，blocking 對新手（novice）較有利**——
  這是 Nakata & Suzuki (2019) 論文文獻回顧引用的既有共識（非本次一手查證，是二手引用，見下）。
- 【理論框架】Porter & Magill (2010) 的 desirable difficulty 框架：對新手，interleaving 造成的
  contextual interference 可能超過負荷、變成「不想要的困難」（undesirable difficulty）而非
  desirable difficulty，導致學習沒效率。
- ⭐⭐⭐ 【直接相關但結果複雜，見 Q2 詳述】**Nakata & Suzuki (2019, Modern Language Journal)**
  ——直接測了「learners' prior knowledge 是否調節 interleaving 效果」，
  發現在 delayed posttest 上**pretest 分數越低的人反而從 interleaving 得到的好處越大**
  （partial r = −.420, p = .009，僅在 interleaved 組顯著；blocked/increasing 組不顯著）——
  **這與「新手該用 blocking」的假設方向相反**。⚠️ 但要注意：
  該研究受試者是 A2-B1（TOEIC Bridge 估計），⛔ **不是完全零基礎的初學者**
  （全員已在中學學過目標文法點，只是「用起來還是常出錯」——性質上接近 Owen 現在的處境：
  規則已學過，但產出時還會混淆，也就是專案鐵律裡的「✂️自動化缺口」而非「🧠概念缺口」）。
- 【直接證據，方向相反】Carpenter & Mueller (2013)：英語母語者學法文發音規則（如 eau 唸長 o），
  受試者**完全零基礎**（no prior knowledge of French）——結果是 **blocking 顯著贏過 interleaving**。
  論文作者（Nakata & Suzuki 2019 引用時）歸因於兩個因素同時發生：
  (a) 目標規則彼此差異大（between-category discriminability 高，interleaving 優勢本來就小）、
  (b) 受試者是完全新手（沒有先備知識，interleaving 帶來的 contextual interference 可能超載）。
  https://www.tandfonline.com/ 相關（原始未能單獨全文核對，數字引自 Nakata & Suzuki 2019 全文，
  該文為【已讀全文】，見下）。

**→ 對 A2 初學者的答案，誠實版本**：文獻不是「初學者一律 blocking 較好」這麼簡單。
運動技能與零基礎音韻規則學習確實支持「新手用 blocking」；但唯一一篇**直接測「L2 文法、
已有先備知識但仍會混淆」的研究**（Nakata & Suzuki 2019，最貼近 Owen 現況）發現方向相反——
**先備知識越低反而從 interleaving 得到的好處越大**。⛔ 這條不能簡化成單一結論，
兩種證據並存且情境不同（完全零基礎 vs 學過但未自動化），Owen 現在的處境明確屬於後者。


---

## Q2 ⭐⭐ 語言學習／動詞變位領域的直接研究——查到了，而且不只一篇

⛔ 上次（2026-09-10）研究完全沒查這條，直接用推論。這次查到**四篇直接相關**的 L2 文法／
變位領域對照實驗，⭐⭐⭐ 其中一篇（Nakata & Suzuki 2019）**已讀全文**（見上方 PDF 逐頁閱讀）。

### 2-1 ⭐⭐⭐【已讀全文】Nakata & Suzuki (2019), *Modern Language Journal* 103(3), 629-647
「Mixing Grammar Exercises Facilitates Long-Term Retention: Effects of Blocking, Interleaving,
and Increasing Practice」
- **受試者**：115 名日本大學生，TOEIC Bridge 估計英語程度落在 **CEFR A2–B1**
  （與 Owen 現在的程度區間高度重疊），jMET 平均 39.76（SD 8.63）。
- **材料**：5 個英語文法結構，**刻意選擇「彼此容易混淆」的結構**
  （simple past vs present perfect——論文原話：學習者常搞混，"My father has come to my school
  last week" 這種錯誤很常見；三種條件句 first/second/third conditional 之間也彼此容易混淆）。
  **這個材料選擇邏輯跟 être/avoir/aller/faire 放同一張表的邏輯完全一致**——都是「故意選會混淆的放一起」。
- **設計**：三組（blocked／interleaved／increasing=先 blocked 後 interleaved），
  皆為**多選題填空**（answer 4 選 1，非自由生成），50 題訓練，前測／立即後測／一週後測
  （文法判斷測驗，量測 d-prime）。
- **結果**（見上方已讀 Table 1/2、Figure 7 逐頁擷取）：
  - 訓練過程中 blocked 組正確率最高（87.2% vs increasing 78.8% vs interleaved 77.0%，
    p=.001，d=0.80/0.83 中度效果）——**練習當下 blocked 表現確實比較好**，這點支持直覺。
  - **但一週後測：interleaved 組（校正後 d-prime M=2.07）顯著贏過 blocked 組
    （M=1.60），p=.021，d=0.64（中度偏大）**；increasing 組（M=1.86）介於中間、
    跟兩邊都無顯著差異。
  - ⭐⭐⭐ **關鍵調節變項結果（RQ3，直接回答 Owen 這題）**：作者原本假設「先備知識低的人該用
    blocking（H3）」，**結果方向相反**——delayed posttest 上，
    **pretest 分數越低的參與者，從 interleaved 練習得到的好處反而越大**
    （partial r = −.420, p = .009，僅在 interleaved 組顯著，blocked/increasing 組無此相關）。
    論文原句（Abstract）："participants with lower pretest scores benefited more from
    interleaving compared to those with higher pretest scores."
  - ⚠️ 但作者自己在文獻回顧裡也誠實列出**反方向證據**：Carpenter & Mueller (2013)
    英語母語者學法文發音規則、**完全零基礎**、規則彼此差異大（discriminability 高）——
    **該研究是 blocking 顯著贏 interleaving**。Nakata & Suzuki 認為兩篇方向不同，可能因為
    (a) 他們的受試者已有先備知識、目標結構彼此**確實相似易混**（discriminability 低），
    (b) Carpenter & Mueller 受試者是**完全新手**、規則彼此**不相似**。
    → **這正好對應 Owen 的情境**：être/avoir/aller/faire 不是完全沒學過的新東西（已上過課、
    已有規則知識），而且四個動詞的人稱變位**確實容易搞混**（ils ont/sont/vont/font）——
    落在 Nakata & Suzuki 這篇「interleaving 有利」的條件區，而不是 Carpenter & Mueller
    「blocking 有利」的條件區（完全零基礎＋規則不相似）。
- **論文原文的教學建議**（Discussion）：grammar learning 應納入 interleaved practice，
  但作者也提醒 increasing practice（先 blocked 再 interleaved）沒有顯著優於純 interleaved，
  ⛔ **不支持「先 blocked 熱身再 interleaved」這個折衷方案有額外好處**——
  這點跟 Owen「按欄拆＝blocked」的設計想達到的「先建立單一動詞完整感」目標有直接張力。

### 2-2 ⭐⭐【二手摘要，未讀全文】Pan, Tajran, Lovelett, Osuna & Rickard (2019),
*Journal of Educational Psychology* 111(7), 1172-1188
「Does Interleaved Practice Enhance Foreign Language Learning? The Effects of Training Schedule
on Spanish Verb Conjugation Skills」
- **這是「西班牙語動詞變位」的直接研究**——比 Owen 的情境（法語動詞變位）更貼近，材料是
  preterite vs imperfect 過去式兩種變位規則（論文形容為 highly similar and confusable，
  且他們分析 25 本西語課本發現 24 本都用 blocked 方式分開兩章教）。
- 四個實驗：
  - **Exp 1-2（單次 session 訓練）**：blocked 組與 interleaved 組在後測**無顯著差異**
    （數值上 blocked 略高，未達顯著）。
  - **Exp 3-4（訓練量增加，分兩週、跨兩次 session）**：**訓練當下 blocked 正確率較高，
    但延遲測驗（verb conjugation ability）逆轉，interleaved 顯著勝出**——
    模式與 Nakata & Suzuki (2019)、Rohrer & Taylor (2007) 完全一致
    （練習當下 blocked 贏，延遲保留 interleaved 贏）。
  - ⚠️ **重大限制，作者自己承認**：受試者是**西班牙語完全零基礎**的英語母語者
    （"the participants did not have any prior knowledge of the target language"）——
    這點被 Nakata & Suzuki (2019) 引用時特別點出是限制，「結果不一定能外推到非完全新手的 L2 學習者」。
  - ⛔ **沒有查到精確的 F/p/d 統計數字**（WebFetch 被來源網站擋、PDF 連線逾時，
    多次嘗試 stevencpan.bol.ucla.edu／rickardlab.ucsd.edu 主機連線失敗），
    以上結果方向引自 WebSearch 摘要與二手引用（Nakata & Suzuki 2019 全文對此篇的複述），
    **未能一手核對精確數字，誠實列為未讀全文**。

### 2-3 ⭐⭐【二手摘要，未讀全文】Pan et al. (2025), *Learning and Instruction* 95
「Interleaved practice enhances grammar skill learning for similar and dissimilar tenses
in Romance languages」
- ⭐⭐⭐ **這篇是本次五題裡最直接命中「相似度調節」這個具體問題的論文**——
  專門設計來測試「interleaving 的好處是否僅限於高相似時態組」。
  多個實驗涵蓋西班牙語與法語不同時態組合。
- **摘要結論**：interleaving 在所有實驗都提升動詞變位能力；⭐⭐ **好處不限於高度相似的時態組**
  （"those benefits are not limited to highly similar tenses"）——
  ⚠️ 這與 Discriminative Contrast Hypothesis 的「相似度越高、interleaving 優勢越大」
  預測**不完全一致**：如果 interleaving 對不相似的時態組**也**有效，代表相似度可能不是
  唯一或主要的調節變項，⛔ **本次未能取得全文（ScienceDirect 403），無法核對這句摘要背後
  的效果量對比數字（相似組 vs 不相似組的 d 值差異），這條的精確調節量化程度誠實列為查不到**。

### 2-4 其他查到但未深入的相關研究（列出但未讀全文，供 Owen 之後自行核對）
- Suzuki, Yokosawa & Aline (2022), *Language Teaching Research*——blocked/interleaved 語法練習中
  工作記憶容量的角色，L2 句法 proceduralization。
- Buhl & Rasmussen (2023), *Journal of Second Language Studies*——L2 contextualized grammar learning
  的 interleaving vs blocking。
- 一篇 60 人的英語關係子句研究：blocked 組練出來的產出**較流暢**（少中斷停頓），
  interleaved 組**較準確**但較不流暢——⭐ 這條提醒 interleaving 的好處可能是「準確度」，
  代價可能是「流暢度／自動化速度」，兩者不是同一件事，Owen 系統若目標是「整塊產出」
  （CLAUDE.md 教學鐵律：高頻結構要能整塊產出、不重新組裝），這個 trade-off 值得注意。
  ⛔ 未讀全文，作者/期刊細節未核實。

### → Q2 小結
**有直接研究，且結論指向「Owen 這個情境（已學過但混淆的相似動詞變位）落在 interleaving
有利的區間」**——但最強的一篇一手證據（Nakata & Suzuki 2019）测的是英語文法結構
（時態／條件句），不是嚴格意義的「動詞人稱變位表格填空」；最貼近「動詞變位」的
Pan et al. (2019, 2025) 兩篇因為連線問題只能引二手摘要，精確效果量⛔查不到，
建議 Owen 之後自行找管道核對 Pan et al. 兩篇原文數字再做最終判斷。


---

## Q3 ⭐ 把 Kiewra 那篇實際讀出來

⚠️ **誠實說明查證過程的限制**：2026-09-10 研究引用的是 **Jairam, Kiewra, Kauffman & Zhao (2012),
"How to study a matrix", *Contemporary Educational Psychology* 37, 128-135**。本次多次嘗試
（ResearchGate WebFetch 兩次 403、Semantic Scholar 空白、ERIC 連線中斷、ScienceDirect 403）
⛔ **未能取得這篇 2012 論文的全文**，仍然只有 WebSearch 摘要（但這次摘要來源更集中、
多個獨立條目重複同樣描述，可信度高於上次的零散摘要）。

**本次改為完整讀了同一實驗室、同一系列研究的前一篇全文可得的論文**：
**Kauffman & Kiewra (2010), "What makes a matrix so effective?", *Instructional Science* 38,
679-705**（8 頁 PDF 全文逐頁讀完，見上方工具紀錄）。這篇不是 2012 年那篇本人，
但方法論、受試者母體、測驗設計幾乎完全共用（同一實驗室、同一材料庫、相近的 N），
可以拿來**部分回答**「這類研究實際測什麼」，同時誠實標出哪些細節是 2012 篇本身
（僅有摘要）、哪些是 2010 篇（已讀全文）。

### 3-1 它實際測什麼？

**已讀全文的 2010 篇**：
- **任務性質**：**靜態閱讀＋理解**，不是提取練習。受試者拿到一張**已經填好、完整**的矩陣
  （或文字／大綱），研讀固定時間（Exp1 15 分鐘、Exp2 6 分鐘，無筆記），然後接受三種測驗：
  **fact test**（單一事實回憶，如「老虎最重多少磅」）、**local relationship test**
  （同一類別內跨主題的關係，如「哪兩隻貓叫聲一樣」）、**global relationship test**
  （跨多個類別的關係，如「叫聲與體重的關係」）。
- ⭐⭐⭐ **這是「閱讀理解＋關係推論」任務，不是「回想並產出答案」的提取練習**——
  受試者從頭到尾都看得到答案（矩陣內容本來就印在紙上），測的是「讀完之後記不記得、
  推不推得出關係」，不是「能不能自己想出動詞變位」。

**2012 篇本身（僅摘要）**：受試者研讀「同一張矩陣」的三種**閱覽順序**——topically（一欄一欄看）、
categorically（一列一列看）、unified（全部一起看）——測驗同樣是關係測驗＋事實測驗＋
（摘要提到）「associative strategy use」（受試者讀矩陣時用了哪種心理策略）。
結果：categorical 和 unified 兩組在關係與事實測驗、材料滿意度、associative strategy use
上都優於 topical 組，用 cognitive load theory 解釋。

### 3-2 受試者是誰、材料是什麼？

- 兩篇都是**美國中西部大學的大學生**（junior 為主，平均 21-23 歲），**一般教育心理系選修生**，
  不是語言學習者、不是 L2 學習脈絡。
- 材料是**野貓知識**（老虎/獅子/獵豹/美洲豹/豹貓/山貓 × 屬名/叫聲/體重/壽命/棲地/社會行為），
  受試者對這個主題**先備知識極少**（自陳平均只修過一門生物課、對野貓「知道一點點」）——
  這點跟語言學習有一個相似處：都是「對材料本身生疏」，但**不相似處更大**：
  野貓知識點之間沒有「容易搞混、會答錯」的特性（沒人會把「老虎」跟「獅子」的體重搞混到答錯），
  這篇矩陣研究的「關係學習」測的是「有沒有注意到 pattern」，不是「能不能正確分辨相似項目」。

### 3-3 ⭐⭐ 它能不能外推到「填空式提取練習」？——誠實回答，不幫任何一邊講話

**外推有問題的部分**：
1. **任務性質不同**。Kiewra 系列測的是「閱讀＋記憶＋推論」，`table_drill.html` 測的是
   「主動提取＋產出正確形式」。這是完全不同的認知歷程——閱讀理解的「看到並排」讓你
   「注意到規律」，跟提取練習的「看不到答案、要自己想」讓你「練出檢索路徑」，
   兩者機制不保證等價。Owen 這題本身的框架已經預見到這點（table_drill 是提取練習，
   Kiewra 是閱讀研究），**這正是上次（2026-09-10）研究被抓到「推論硬拗」的破口**。
2. **材料性質不同**。野貓事實之間沒有「答錯」的混淆風險，être/avoir/aller/faire 的變位
   **本來就是容易誤植的相似項**——2012 篇比較接近的「categorical 優於 topical」結論
   是在「不特別混淆的材料」上得到的，沒有測過「容易混淆的材料」是否讓這個差距更大或更小。
3. **受試者不是技能學習者**。矩陣研究受試者是「讀一次考一次」的學術知識吸收情境，
   不是「反覆練習直到自動化」的程序性技能習得情境（table_drill 屬於後者）。

**外推合理的部分**：
1. ⭐⭐ **「topical（按欄）在關係學習上最差」這個方向性結論，兩篇（已讀的 2010 + 摘要的 2012）
   高度一致**，且與本次 Q1 查到的 Discriminative Contrast Hypothesis、Q4 的 RIF 相似度調節
   理論方向一致——**至少三條獨立證據線都指向同一方向**，不是單篇孤證。
   即使機制不完全等價，方向一致本身有參考價值。
2. **「並排才看得到差異」這個核心直覺，在「閱讀理解」與「提取練習」兩種任務上都有各自的
   實證支持**（前者是 Kiewra 系列、後者是 Q1/Q2 查到的 Discriminative Contrast /
   interleaved retrieval 文獻）——**兩條證據線分開看都成立，但它們是兩條不同的證據線，
   不能把其中一條的效果量直接套到另一條上**。

**→ 誠實結論**：2026-09-10 引用 Kiewra 支持「拆表有代價」的**方向判斷不算錯**
（後來被 Q1/Q2 的 interleaving 直接文獻獨立佐證），但**把 Kiewra 的效果量／確定性
當作「提取練習」的直接證據是外推過度**——Kiewra 測的是閱讀理解，不是提取練習；
真正該用來判斷 table_drill 的，是 Q1/Q2 查到的 interleaved retrieval practice 文獻
（Nakata & Suzuki 2019、Pan et al. 2019/2025），這些才是同任務類型的直接證據。


---

## Q4 ⭐ 相似形式之間的干擾（interference）——記憶研究怎麼說

### 4-1 Retrieval-induced forgetting（RIF）基礎
- 【實證，統合分析】**Murayama et al. (2014), *Psychological Bulletin***——RIF 現象的統合分析
  （首篇針對 RIF 機制對比理論陣營的統合分析；⛔ 本次查證未取得全文，k／整體效果量數字未核對，
  只確認這篇統合分析存在且是這個領域的主要參考點，⛔ 不編造數字）。
- **機制**：選擇性提取某個目標項目時，同一線索下的競爭項目會被抑制/壓制，
  導致這些「沒被練到」的競爭項目之後更難想起——這是「練習提取 A 會讓 B/C/D 更難想起」的效應。

### 4-2 ⭐⭐ 相似度是雙向調節變項，方向很細緻——這條最重要
- 【實證】**Anderson, Green & McCulloch (2000)（Anderson 團隊 RIF 相似度研究，常被稱為
  Anderson et al. 2000，具體篇名與期刊本次未逐一核對，⚠️ 標記為二手摘要整理）**：
  區分了兩種相似度，**方向剛好相反**：
  - **target–competitor 相似度高**（目標項目跟競爭項目本身很像）→ **RIF 被削弱甚至逆轉**
    （不會產生選擇性遺忘的傷害）。
  - **competitor–competitor 相似度高**（競爭項目彼此很像，例如 ont/sont/vont/font
    這種同韻尾、同人稱形式）→ **RIF 被放大**（選擇性練習某一個會讓其他幾個更難想起）。

  ⭐⭐⭐ **套用到 être/avoir/aller/faire 這張表**：四個動詞在「ils ___」這個線索下的六個答案
  （ont/sont/vont/font 屬於 competitor-competitor 高相似）——**如果練習方式是「選擇性只練
  某一個動詞、放著另外三個不練」（也就是按欄拆＝blocked，每次只練一欄，其他三欄完全不出現），
  理論上正好符合「competitor-competitor 相似、且做選擇性提取」這個組合，是 RIF 風險最高的情境**：
  練 aller 的時候完全不去想 faire/être/avoir，可能讓這幾個「該想起卻沒被要求想起」的形式
  更難被記住。**interleaved（同一線索輪流問到四個動詞）則因為所有競爭項目都定期被提取到，
  不會出現「誰被選擇性冷落」的狀況，理論上 RIF 風險較低**。
  ⚠️ **這是理論套用，不是直接對「動詞變位表格」做過的 RIF 實驗**——本次沒有查到一篇
  「用 RIF 典範直接測動詞變位混淆」的研究，這段是把 Anderson 團隊的一般記憶機制理論
  套到 Owen 的具體情境，⛔ 套用合理但不是文獻直接驗證過的個案。

### 4-3 ⭐⭐ 實務問題：容易混淆的放一起練，是加強區辨還是加深混淆？兩派證據都列

**支持「放一起加強區辨」**：
- Discriminative Contrast Hypothesis（Carpenter & Mueller 2013 理論提出方；
  Kang & Pashler 2012 實證支持）——mixing 讓差異更顯著，是本次 Q1/Q2 反覆出現的主流理論。
- Q1 的 Kornell & Bjork (2008)、Birnbaum et al. (2013)：並排／交錯顯著提升「區辨出類別」能力。
- Anderson 團隊：target-competitor 相似時，**同時提取**（而非選擇性練其中一個）能避免傷害。

**支持「放一起加深混淆」**（⚠️ 這是文獻裡確實存在、不能省略的反方向證據）：
- Nakata & Suzuki (2019) 訓練過程中的數據：**interleaved 組練習當下正確率最低**
  （77.0% vs blocked 87.2%），論文明確說這是 contextual interference 的直接證據——
  **練習當下確實更容易搞混、答錯率更高**，這是真實成本，只是長期保留有反轉。
  ⭐ **對 Owen 的實務意義**：如果 table_drill 的即時回饋設計讓「答錯」這件事對 Owen
  的心情有負面影響（CLAUDE.md「好玩是永動機」鐵律提到系統不可以罵他、不要秀分母），
  interleaved 版本上線初期的錯誤率上升需要跟 Owen 說清楚是正常現象、不是退步。
- Carpenter & Mueller (2013)：完全零基礎＋規則彼此不像時，blocking 顯著贏——
  代表「放一起」不是任何情境都有利，混淆風險真實存在，只是這篇的兩個前提
  （零基礎、規則不像）跟 Owen 現況（已學過、規則像）都對不上。
- 【理論】Cognitive load theory 一般預測：同時處理多個彼此需要比較的項目會增加
  working memory 負荷，對工作記憶資源有限的學習者（新手、疲勞時）可能造成 overload
  而不是促進學習——這條是 Kauffman & Kiewra (2010) 論文原文援引的理論框架
  （見 Q3 已讀全文段落），也是 Porter & Magill (2010) desirable difficulty 框架
  警告「新手可能把 desirable difficulty 用成 undesirable difficulty」的理論基礎。

**→ Q4 小結**：兩派證據都真實存在，不是其中一派是錯的。**關鍵區辨變項似乎是
「受試者先備知識程度」與「材料相似度」的組合**（呼應 Q1、Q2 的結論）——
Owen 現在的組合（已學過規則、材料高度相似、A2 程度）在查到的直接證據裡
（Nakata & Suzuki 2019）落在「interleaving 長期較有利、但練習當下錯誤率會上升」這一類。


---

## Q5 discrimination training／contrastive practice 的實務證據

- 【廣泛實踐＋部分實證】**Minimal pairs training**（語音領域，如 speech-language pathology
  的 minimal/maximal/multiple oppositions approach）：刻意把只差一個音位的詞放一起做區辨訓練，
  是言語治療與發音教學的標準法，有臨床對照研究支持（ASHA 相關文獻，*Language, Speech, and
  Hearing Services in Schools* 2021 综述），⚠️ 這是**語音**領域（辨識/發音層次），
  跟**構詞／變位**（型態層次）不是同一種語言單位，外推需要打折扣，但方法論精神
  （刻意並排容易混淆的最小對比項）與 table_drill 的表格設計理念一致。
- 【實證，本次 Q3 已讀全文】Kauffman & Kiewra (2010)、Jairam et al. (2012)：categorical／
  unified 呈現優於 topical——支持「並排」，但材料不是刻意選過的易混項，是任意分類知識，
  見 Q3 完整討論。
- 【理論＋部分實證】**Gentner 的 structure-mapping / alignable differences**
  （2026-09-10 已查、本次未重查）：結構相似的兩者並排比較時，對應位置的差異會變得更顯著，
  這是「刻意並排」的理論基礎，主要驗證在類比推理／概念學習，非語言技能訓練本身。
- 【實證，本次新查】**Contrasting cases**（Schwartz & Bransford 傳統，教育心理學）：
  拿到並排比較材料＋比較提示的組別學得更多、後續認知負荷更低——但這是「先比較、
  再接受講解」的教學序列設計（preparation for future learning），跟「填空表格本身要不要
  拆開」不是同一個介入點，2026-09-10 已查過，本次不重複。

**→ Q5 小結**：⛔ **沒有查到一篇專門針對「L2 動詞變位表」做「刻意並排混淆項 vs 拆開練」的
直接對照實驗**——這條文獻缺口跟 Q1 的「語言學動詞變位直接研究稀少」互相印證。
最貼近的直接證據還是 Q2 查到的 interleaved practice 語言學習研究（Nakata & Suzuki 2019、
Pan et al. 2019/2025），這些雖然不是嚴格意義的「discrimination training」典範
（它們操弄的是練習時間序列，不是同時視覺並排），但材料選擇邏輯
（刻意選容易混淆的結構）與 Owen 這題的精神一致。

---

## ⛔ 查不到的清單（誠實列出，不外推填補）

1. 一篇單一統合分析／實驗，直接操弄「同一組內項目相似度」做劑量反應設計、
   報告效果量隨相似度連續變化的曲線（Brunmair & Richter 2019 只用材料類型當相似度代理變項）。
2. Pan et al. (2019) JEP 論文與 Pan et al. (2025) Learning and Instruction 論文的**精確統計數字**
   （F/p/d 值）——多次嘗試官方 PDF 連線失敗（ECONNREFUSED / 403），只有二手摘要可用。
3. Pan et al. (2025) 「好處不限於高相似時態組」這句話背後，**高相似組 vs 低相似組的
   效果量對比數字**——全文被 ScienceDirect 擋，無法核對調節效果量。
4. 「刻意並排容易混淆的 L2 動詞變位表 vs 拆開練」的**直接教學介入對照實驗**
   （型態層次，非語音層次）——查不到，這是本次五題裡最大的一塊文獻空缺。
5. Murayama et al. (2014) RIF 統合分析的整體效果量與 k／N——只確認論文存在，未取得數字。
6. 「先 blocked 熱身、再換 interleaved」（Owen「按欄拆」隱含的漸進邏輯）
   在語言學習領域的直接效果證據——唯一直接測過的 Nakata & Suzuki (2019) increasing 條件
   **沒有顯著優於純 interleaved 或純 blocked**，但這只是一篇，⛔ 不足以下「漸進法沒用」的結論。
7. Brunmair & Richter (2019) 全文 PDF 的完整內容（WebFetch 對該 PDF 的文字抽取失敗，
   數字全部來自搜尋引擎摘要與標題頁引用，本檔已標註）。

---

## 一句話結論（給 Owen）

⭐⭐⭐ 這題查完後，**方向判斷跟 2026-09-10 的結論一致（拆表確實有代價），但論證基礎完全換了一套**——
不再是類比推理的相鄰證據（Kiewra 閱讀研究、split-attention），而是**直接測「已學過但會混淆的
L2 文法結構」的 interleaved vs blocked 實驗**（Nakata & Suzuki 2019 已讀全文，Pan et al.
2019/2025 二手摘要），且這些研究的受試者程度、材料相似度組合都跟 Owen 現況（A2、已學過規則、
四動詞人稱形式確實常混淆）高度重疊——**这条证据链比上次的類比推理更硬**。
但同時也查到了兩個上次沒有的、誠實的限制：
(1) 練習「當下」的錯誤率會上升是真實代價，不是錯覺；
(2) 「先 blocked 熱身再 interleaved」這個折衷方案，唯一一篇直接測過的研究顯示**沒有顯著額外好處**——
如果要改，可能不該做「漸進」版本，而是直接考慮 4-1 提案的「整張表可見、熱區輪替」這種
**同時保留 paradigm 完整可見性＋不物理拆散**的做法（2026-09-10 研究 4-1 節已提過，
本次查證結果傾向支持這個方向優於單純的「先按欄練、之後再混」）。
