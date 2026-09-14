# RESEARCH 2026-W38 — 📖 閱讀 Compréhension écrite

> 產出日期：2026-09-14（ISO 第 38 週，38 % 4 = 2 → 閱讀）
> 依 `CLAUDE.md` 每週雲端研究例行產出。研究歸研究，**本檔不改任何系統程式**。
>
> ⚠️⚠️ **本週的查證等級限制（跟 W37 一樣，先講）**
> 這次跑研究的環境仍有網路白名單。**搜尋引擎摘要進得來，但 `WebFetch` 幾乎全滅**——
> 實測被 egress proxy 擋掉的包含：`lefrancaisdesaffaires.fr`（TEF 官方）、`ncbi.nlm.nih.gov`、
> `files.eric.ed.gov`、`arxiv.org`、`en.wikipedia.org`、各家備考站。**一篇原文都沒讀到。**
> 所以本檔沿用 W37 的三級標記，每一條都標：
> - 🟢 **摘要層級**：作者、年份、樣本數、效果量來自檢索摘要，**沒讀到原文或摘要頁本身**
> - 🟡 **二手層級**：經由部落格／備考站／出版社轉述
> - 🔴 **待驗證**：數字看起來可用，但要對原始來源；**本週考試格式全部是這一級，而且來源彼此矛盾**
>
> ⛔ **在對過原文之前，不要把本檔任何數字寫進系統的說明文字裡。**（來源三層優先序的同一精神：線索不是判準。）

---

## 1. 這週查到什麼

### 1A. 研究證據（有實證、有樣本數的）

#### ① 閱讀的三個對立陣營，跟聽力那三個**不是同一組**

W37 找到聽力有「策略派 vs 解碼派」兩軍對峙。閱讀的地形不一樣——這裡是**三角**，而且三邊都有統合分析撐著：

| | **大量閱讀派（ER）** | **流暢度／限時派** | **策略／文本結構派** |
|---|---|---|---|
| 代表 | Day & Bamford、Krashen、Nakanishi | Nation、Macalister、Tran | Alderson 之後的策略教學群、text structure 研究群 |
| 主張 | 讀夠多、讀得夠輕鬆，語言自己長 | 問題是**太慢**：辨識速度沒自動化，工作記憶被吃光 | 問題是**不會挑重點**：不知道文章長什麼形狀、不知道該找什麼 |
| 典型活動 | 分級讀本、自選、大量、不考試 | 限時閱讀、重複閱讀、每篇計時記 wpm | 略讀／掃讀、看標題預測、教說明文的結構型態 |
| 對「做理解測驗」的態度 | ⛔ 傳統上**反對**（考試會殺掉閱讀樂趣） | 中性，測驗只是驗收 | ✅ 支持，測驗就是練習場 |

- **ER 的實證**：Nakanishi (2015, *TESOL Quarterly* 49(1), 6–37) 的統合分析，**34 個研究／43 個效果量**：
  對照組比較 **d = 0.46（中等）**、前後測比較 **d = 0.71**。（[Wiley](https://onlinelibrary.wiley.com/doi/10.1002/tesq.157)、[ERIC EJ1052150](https://eric.ed.gov/?id=EJ1052150)）🟢
  ⚠️ 檢索摘要在「34 個研究」與「36 個研究／3,942 人」之間**自己就不一致**，兩個數字都出現過，以原文為準。
- ⭐⭐ **2025 年新的 ER 統合分析，而且它的調節變項直接打臉 ER 的正統**：
  Sangers, van der Sande, Welie, Dobber & van Steensel (2025, *Educational Psychology Review* 37:96)，**86 個實驗比較**，整體 **d = 0.41（小到中等）**，七個領域（閱讀理解、詞彙、解碼／流暢度、動機、寫作、口語、整體能力）全部正向。
  ⭐ **關鍵在調節變項**：效果**比較大**的情況是——**(a) 學習者的選書自由被「限制」時，(b) 有某種「問責／驗收」機制時**。
  （[Springer](https://link.springer.com/article/10.1007/s10648-025-10068-6)、[VU 研究入口](https://research.vu.nl/en/publications/learning-a-language-through-reading-a-meta-analysis-of-studies-on/)）🟢
  - ⭐ **這一條對我們特別重要，因為它跟「ER 教條」相反**。Day & Bamford 的經典十原則是「學習者自選、為樂趣而讀、**不考試**」。
    這篇統合分析的調節分析說：**限制選書 ＋ 有驗收，效果更大。**
  - 📌 **對 Owen 的意思**：`reading.html` 現在的形態（**固定題庫、不能自選、讀完必答 3 題**）
    **剛好就是效果比較大的那一版**。⛔ 不要因為「ER 說要自由閱讀」就把它改成自由選讀——證據在現況這邊。
    （⚠️ 但這不代表現況沒問題，問題在第 4 節，是**量**和**難度**，不是這個形態。）
- **流暢度／限時派的實證**：
  - 限時閱讀課程讓 L2 學習者的閱讀速度提升約 **13–27 standard words per minute**；
    另一個研究裡限時閱讀組讀完 **52 篇（約 16,800 字）後提升約 50 wpm**。
    三組（限時重複閱讀／限時＋朗讀重複／純限時）**全部**都有速度增益，其中**限時重複閱讀組顯著優於純限時組**。
    （[《System》2022 限時與重複閱讀](https://www.sciencedirect.com/science/article/abs/pii/S0346251X22000835)、[ERIC EJ1316861 全文 PDF](https://files.eric.ed.gov/fulltext/EJ1316861.pdf)、[ERIC EJ887882 速讀課程效果](https://files.eric.ed.gov/fulltext/EJ887882.pdf)）🟢
  - **速度會遷移**：Macalister (2010) 與 Tran (2012) 指出速讀課程的效果**不限於受控教材，會遷移到真實文本**。
    （[Reading in a Foreign Language 相關整理](https://scholarspace.manoa.hawaii.edu/server/api/core/bitstreams/4546e325-83f5-44c7-93e7-8cab5d339859/content)）🟢
  - **目標值**：Nation 給的參考是**細讀（careful silent reading）約 250 wpm**，前提是文本裡沒有生字和生文法。🟢
- **策略／文本結構派的實證**：
  - 文本結構教學（教說明文的組織型態：比較對照／問題解決／因果）對說明文理解，
    在「有學習障礙或高風險」族群的統合分析裡效果量 **ES = 0.96（大）**；
    另一份 45 個研究（2–12 年級）指出**跟較強的對照組比，效果會縮水**。
    （[ASHA 證據地圖](https://apps.asha.org/EvidenceMaps/Articles/ArticleSummary/61fb58ef-54ff-4a0f-a6f3-ae318f6ea0d5)、[ERIC EJ1105625](https://eric.ed.gov/?id=EJ1105625)）🟢
  - ⚠️⚠️ **反方一定要並陳**：高年級小學的統合分析（Bogaerds-Hazenberg et al., 2021, *RRQ*）效果小很多，
    而且**分測驗差很大**：理解題 **g = 0.25**、摘要 **g = 0.57**、回憶 **g = 0.37**、對文本結構的知識 **g = 0.38**；
    ⭐ **延遲後測時，實驗組不再優於對照組。**
    （[Wiley RRQ](https://ila.onlinelibrary.wiley.com/doi/10.1002/rrq.311)）🟢
    → **讀法：文本結構教學會讓你「更會摘要」，但「更會答理解題」的證據弱，而且撐不過延遲。**
      對 TCF 這種**當場答題**的考試，這一派的投報率比它的宣傳低。

#### ② ⭐⭐ 語言門檻假說：Owen 的中文閱讀能力現在幫不上忙，而這是可以被跨過的

Alderson (1984) 的經典提問是「**外語閱讀：是閱讀問題還是語言問題？**」。
衍生出的兩個說法：

- **語言門檻假說（linguistic threshold hypothesis）**：L1 的閱讀能力要遷移到 L2，
  必須先跨過一個 **L2 語言能力的門檻**；沒跨過就遷移不了。
- **短路假說（short-circuit hypothesis）**：L2 語言知識不足會「**短路**」掉你原本很好的 L1 閱讀策略。
  一個常被引的觀察是：在 L1 裡「好讀者 vs 差讀者」的差距很大，**到了 L2 這個差距會縮小**
  ——因為語言能力不足把大家壓到同一個地板上。
  （[Yamashita, 名古屋大學 PDF](https://www.lang.nagoya-u.ac.jp/proj/genbunronshu/23-1/yamashita.pdf)、[Lee & Schallert 1997, *TESOL Quarterly*](https://onlinelibrary.wiley.com/doi/abs/10.2307/3587757)、[重訪門檻假說](https://www.researchgate.net/publication/271336770_Relations_among_L1_Reading_L2_Knowledge_and_L2_Reading_Revisiting_the_Threshold_Hypothesis)）🟢
- ⚠️ **限制要寫出來**：檢索摘要自己說「**測試這個假說的實證研究少得可惜，而且結果出乎意料地分歧**」，
  近年還有研究主張要重新建模門檻（[*Bilingualism: Language and Cognition*](https://www.cambridge.org/core/journals/bilingualism-language-and-cognition/article/abs/rethinking-the-linguistic-threshold-hypothesis-modeling-the-linguistic-threshold-among-young-spanishenglish-bilinguals/614311FB345E06376688FC96A0FF4D1C)）。
  **當成一個有用的框架，不是一條定律。**

⭐ **為什麼這條值得單獨列**：Owen 的中文閱讀能力是成人水準——理解長篇、推論、抓重點、忍受不懂的字，這些**他早就會了**。
所以他在法文閱讀卡住時，**幾乎可以確定不是「不會閱讀」，是「法文不夠」**。
→ 這直接決定資源要投哪：**⛔ 不要花時間教他閱讀策略**（那是他 L1 早就有的東西，而且短路假說說它現在遷移不過來），
**✅ 要花時間把 L2 那一側墊高到門檻以上**（詞彙覆蓋率、句法辨識速度）。

#### ③ 詞彙覆蓋率：閱讀的門檻比聽力高很多，這是本週最硬的一條約束

| 覆蓋率 | 需要的詞族數 | 說明 |
|---|---|---|
| **98%**（自在、不需協助） | **8,000 詞族**（含專有名詞） | Laufer & Ravenhorst-Kalovski 稱為 optimal threshold |
| **95%**（最低可用） | **4,000–5,000 詞族** | minimal threshold |

（[Laufer & Ravenhorst-Kalovski (2010), *Reading in a Foreign Language*](https://scholarspace.manoa.hawaii.edu/items/eaead47e-853e-4797-ba6f-596df150c1d7)、[ERIC EJ887873](https://eric.ed.gov/?id=EJ887873)、[Nation (2006) 整理](https://www.researchgate.net/publication/239928724_How_Large_a_Vocabulary_Is_Needed_for_Reading_and_Listening)）🟢

- ⭐ **跟 W37 的聽力數字並排看，落差很清楚**：
  | 技能 | 95% 覆蓋 | 98% 覆蓋 |
  |---|---|---|
  | 👂 聽力（W37） | 2,000–3,000 詞族 | 5,000–6,000 |
  | 📖 **閱讀（本週）** | **4,000–5,000 詞族** | **8,000–9,000** |
  → **同樣的 98%，閱讀要的字彙量大約是聽力的 1.5 倍。**
  原因很直觀：口語的詞彙分佈比書面窄得多，書面語會用到大量低頻詞。
- ⚠️⚠️ **全部是英語資料，法語的覆蓋率門檻本週一樣沒查到**（W37 同一個坑）。
  ⛔ **不要假設可以直接搬**——法語的詞形變化比英語多，「詞族」的界定本身就不同。
- **詞彙量與理解的相關性**：Zhang & Zhang (2022, *Language Teaching Research*) 統合分析，
  詞彙知識與 **L2 閱讀理解 r = 0.57**、與 **L2 聽力理解 r = 0.56**。
  （[SAGE](https://journals.sagepub.com/doi/10.1177/1362168820913998)、[ERIC EJ1342379](https://eric.ed.gov/?id=EJ1342379)）🟢

#### ④ 速度：L2 的限時閱讀有效，但「速讀」是假的——兩件事要分開

這是本週最容易搞混、也最值得寫清楚的一組**衝突證據**：

| | 說什麼 | 證據 |
|---|---|---|
| **L2 限時閱讀研究** | 限時訓練**真的**讓 L2 讀者加快 13–50 wpm，而且會遷移 | 前面 ① 的那幾篇 🟢 |
| **認知心理學的速讀回顧** | 「又快又懂」的速讀主張**被誇大、不符合我們對視覺與認知處理的理解**；速度與理解**有取捨**；速讀課程有時有用，但**不是因為廣告說的那個理由**——人被逼到遠超正常速度時，**其實學到的是略讀（skimming）** | Rayner, Schotter, Masson, Potter & Treiman (2016), *Psychological Science in the Public Interest*（[SAGE](https://journals.sagepub.com/doi/10.1177/1529100615623267)、[APS 摘要](https://www.psychologicalscience.org/publications/speed_reading.html)）🟢 |

⭐ **怎麼同時成立（這是關鍵的讀法）**：
Rayner 那一派否定的是「**把已經正常的母語者加速到 600–1000 wpm 還能全懂**」。
L2 限時閱讀處理的是**完全不同的問題**：L2 讀者的速度**本來就在正常以下**，
是詞形辨識還沒自動化把工作記憶吃光了。
→ **把地板拉到正常，跟把天花板拱破，是兩件事。前者有證據，後者沒有。**
→ ⛔ **所以不要碰 RSVP／消除默讀那一套**（那些數字幾乎都來自商業速讀網站，本週檢索到的
   「RSVP 訓練六週提升 53%」「提升 25–100%」全部出自速讀產品站，[例](https://cognitivetrain.com/does-speed-reading-work/)）🟡🔴
   ——⛔ **不要引用這些數字。**
✅ **但 Rayner 那篇順手送了一個對考試有用的結論**：被逼快的時候，人學到的是**略讀**。
   而 TCF/TEF 的閱讀就是要略讀。**所以「限時」這件事本身就在練考試需要的技能。**

- **眼動的旁證**：L2 讀者比 L1 讀者**注視時間更長、注視次數更多（+21%）、掃視距離更短（−12%）、整句閱讀時間多 20%**，
  且**跳讀的字更少（少 4.6%）**；但**程度越高，短的高頻字就越會被跳過**。
  （[PLOS ONE 單／雙語自然閱讀比較](https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0134008)、[L2 跳讀的個別差異](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11680623/)、[「Big Three」效應](https://pmc.ncbi.nlm.nih.gov/articles/PMC12565054/)）🟢
  ⭐ **「跳讀率」是一個很誠實的自動化指標**：你會跳過 `de / le / que` 這些高頻功能詞，
  代表它們已經不需要逐字處理了。**這跟 W37 聽力那邊的功能詞問題是同一個結構的兩面。**

#### ⑤ ⭐⭐ 法語的獨門特徵：閱讀是唯一看得到「沉默文法」的通道

這是本週最「剛好打在法語上」的一條，而且它跟 W37 的發現**正好互為鏡像**：

- 法語有大量**只存在於文字、完全沒有語音形式的屈折變化**。
  最典型的例子：**`tu parles` / `il parle` / `ils parlent` 三個形，發音完全一樣。**
- 文獻的說法：處理書面法語必須處理**大量沒有外顯語音對應的屈折形態**，
  現在式規則變化就是這種「語音不透明」的代表；
  而**書面法語缺少可聽見的區別，正是動詞一致性（accord）產出錯誤的主要來源**——
  有可聽見的形態標記時，**兒童與熟練成人讀者的一致性錯誤都會大幅減少**。
  （[Frontiers in Psychology 2014，L1/L2 法語屈折形態的 ERP 證據](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2014.00888/full)、[法語形態知識與拼寫的發展 (PMC)](https://pmc.ncbi.nlm.nih.gov/articles/PMC7031411/)）🟢

⭐⭐ **鏡像關係（這是 W37 ＋ W38 合起來才看得到的東西）**：

| | 法語把什麼藏起來 | 結果 |
|---|---|---|
| 👂 **聽力**（W37） | 文字上分得開的詞界被 liaison／縮讀**抹掉** | `les_amis`、`chais pas` → 耳朵切不開 |
| 📖 **閱讀**（本週） | 聲音上分不開的文法被正字法**顯示出來** | `parle / parles / parlent` → 眼睛才分得開 |

→ **同一個語言，在兩個通道剛好反向失真。**
→ ⭐ **可操作的推論**：**閱讀是 Owen 唯一能「看見」動詞人稱、性數配合的通道。**
  他在聽力裡永遠收不到 `-s` 和 `-ent`，在閱讀裡卻**每一次都看得到**。
  → 這代表「靠讀法文把配合系統練起來」在資訊理論上是**成立的**，
    而「靠聽法文把配合系統練起來」**在物理上就不可能**（訊號裡根本沒有那個資訊）。
  → 📌 對應 `FRENCH_OS.md` 的 **⑤ 配合系統**：那一格的訓練**應該走眼睛，不是走耳朵**。

#### ⑥ 附帶學習的速率：讀得到，但慢，而且需要重複

- **需要幾次相遇**：常被引的區間是 **8–10 次**；
  Waring & Takaki (2003) 的觀察是 8 次之後，L2 讀者能辨認**詞形 86%／詞義 75%**，但**回憶詞義只有 55%**。
  ⚠️ 但各研究的建議從 **6、8、10、12 到 20 次以上**都有，**這個數字沒有共識**。
  重複與附帶詞彙學習的相關統合分析（**26 個研究／45 個效果量**）給的是 **r = .34（中等）**。
  （[EAP Foundation 整理](https://www.eapfoundation.com/vocab/learn/incidental/)、[重複效果統合分析](https://www.academia.edu/38264254/The_Effects_of_Repetition_on_Incidental_Vocabulary_Learning_A_Meta_Analysis_of_Correlational_Studies)）🟢
- **一年能長多少**：持續的分級閱讀約可習得 **1,000 個詞族／年**（Nation 2015 的估算）。🟡
- ⚠️⚠️ **反方**：單篇文本的附帶詞彙學習率**很低**——文獻回顧給的區間是
  「**28 個字裡學到 2 個**」到「**12 個字裡學到 6 個**」。
  批評者指出附帶學習假說在 L2 情境的實證支持有限，**程度較低的學習者更需要外顯教學**。
  （[ERIC EJ1176843 解構「附帶」](https://files.eric.ed.gov/fulltext/EJ1176843.pdf)、[顯性 vs 隱性詞彙教學](https://www.academypublication.com/issues2/tpls/vol05/08/11.pdf)）🟢
- ⭐ **中立的讀法（跟 W37 對 CI 的處理一致）**：
  **量負責廣度，外顯負責深度。** 對 A2 的 Owen，**單靠讀是不夠的**，這一條站在「還是要有卡片」那一邊。

#### ⑦ 註解（gloss）：效果量看起來很大，但要小心

- 多重註解（文字＋圖像）對詞彙習得的效果量 **+0.83**，優於純文字註解；
  另有統合分析給出**整體 Hedges' g = 1.27（大）**，但效果**隨學習者程度變化很大**。
  電腦輔助註解對**閱讀理解中等效果、對附帶詞彙學習大效果**。
  （[Yanagisawa 等 gloss 統合分析 (ERIC EJ1135927)](https://eric.ed.gov/?id=EJ1135927)、[多媒體註解第二輪統合分析 (ScienceDirect)](https://www.sciencedirect.com/science/article/pii/S000169182400218X)、[電腦輔助註解統合分析 (CALL)](https://www.tandfonline.com/doi/full/10.1080/09588220802090246)）🟢
- ⚠️ **這些效果量大得要存疑**：g = 1.27 在應用語言學裡是極端值，而且註解研究的後測
  幾乎都是**剛讀完就考的立即詞彙測驗**——那是最有利於註解的測法。
  ⛔ **不要拿 1.27 去說服自己做一個註解功能。**

#### ⑧ ⭐ 邊聽邊讀（RWL）：本週推翻了 W37 寫下的其中一條

W37 的第 ⑤ 條寫了「RWL 對書寫系統距離大的母語者（中文）效果較好 ⇒ 對 Owen 是加分項」。
本週查到一篇**直接針對 RWL vs 只讀**的系統回顧與統合分析，結論比那句話冷得多：

- **30 個研究／1,945 名參與者**，RWL 相對「只讀」對理解的整體效果是 **g = .18（微不足道）**，p = .01。
- ⭐⭐ **但調節分析是關鍵**：效果**只出現在「由實驗者控速」的研究裡（g = 0.41）**；
  **自己控速（self-paced）時沒有可靠效果。**
  （[RWL 系統回顧與統合分析](https://www.researchgate.net/publication/374055410_Does_Reading_while_Listening_to_Text_Improve_Comprehension_Compared_to_Reading_Only_A_Systematic_Review_and_Meta-Analysis)；另見 [Hui (2024), *MLJ*，RWL 的鷹架作用與閱讀速度／文本複雜度](https://onlinelibrary.wiley.com/doi/full/10.1111/modl.12905)）🟢

⭐ **重新詮釋**：**RWL 真正的作用機制不是「兩個通道一起進」，是「音檔拖著你走，不准你停」。**
它是一個**節拍器**，不是一個雙通道理解器。
→ 📌 **這直接修正 W37 的建議**：RWL 對 Owen 有沒有用，**不取決於他是中文母語，取決於他有沒有被迫跟上速度**。
  他自己按暫停、自己回頭看的那種「邊聽邊讀」，**統合分析說沒有效果**。
→ ⚠️ 這一條與 W37 引的 Koh (2024)（書寫系統距離越大 RWL 獲益越多）**並不完全矛盾**
  （那篇談的是調節變項，這篇談的是主效果），但**方向上是降溫的**。⛔ 兩篇都要留著，不要只留支持的那篇。

#### ⑨ AI 用在閱讀：跟聽力一樣薄，而且原因被說出來了

- 系統回顧的說法：**閱讀的增益主要出現在聊天機器人「支援自我調節閱讀」或「即時提供詞彙與文法鷹架」時**；
  而且**閱讀與聽力的增益比口說／寫作小**，原因是「**聊天機器人的互動本質上重產出輕輸入**」。
  （[AI 聊天機器人在二語教育的系統回顧 (ScienceDirect 2025)](https://www.sciencedirect.com/science/article/pii/S2215039025000086)、[ChatGPT 在語言學習的系統回顧](https://www.sciencedirect.com/science/article/pii/S2590291125010885)）🟢
- 另有準實驗把「圖像化摘要策略＋語音辨識＋語意理解」的智慧型聊天機器人用在閱讀，
  測理解表現、學習體驗、批判思考與認知負荷。（[*ETR&D* 2025](https://link.springer.com/article/10.1007/s11423-025-10583-x)）🟢
- ⭐⭐ **AI 產生分級文本這條路目前不可靠，而且有論文明說**：
  - 「儘管 LLM 進展很大且 zero-shot 能力強，**它們仍然無法可靠地產出精準對應特定程度的文本**」，
    所以近期研究改用**強化學習**（GRPO ＋ 語言學設計的 reward）來控制可讀性。
    （[Right at My Level：多語 proficiency-aware 文本簡化](https://arxiv.org/html/2604.05302)、[TSAR 2025 受控 CEFR 簡化](https://aclanthology.org/2025.tsar-1.10.pdf)）🟢
  - 有研究專門測 **CEFR-prompted LLM 的「對齊漂移」**——你叫它寫 A2，它會慢慢飄走。
    （[Alignment Drift in CEFR-prompted LLMs](https://arxiv.org/html/2505.08351v1)）🟢
  - 已有 **CEFR 標註的 WordNet** 與 **Ace-CEFR 難度資料集**在做這件事的基礎建設。
    （[CEFR-Annotated WordNet](https://arxiv.org/pdf/2510.18466)、[Ace-CEFR](https://arxiv.org/html/2506.14046v1)）🟢
- ⭐ **對 Owen 的結論（標明是推論）**：
  「叫 Claude 生一篇 A2 法文短文」**在文獻上是一個已知不可靠的動作**——它會飄。
  ⚠️⚠️ 而且這跟 `CLAUDE.md` 的**內容鐵律**是同一個方向：**禁止 Claude 自創法文句子當教材。**
  → **證據與鐵律在這裡完全同向。** 已核准的例外（理解測驗的題幹與短文可原創）**要更小心地用**：
    既然 LLM 的 CEFR 對齊會漂移，原創短文**必須對齊已學課次的詞彙句型**這條限制就不是形式，是**唯一的防線**。

---

### 1B. 社群做法（個人經驗分享，⚠️ 沒有對照組）

> ⛔ 這一節與上一節**嚴格分開**：以下沒有任何一條有實證等級的證據，全部是老師／學習者／備考站／出版社的做法分享。

- **考生社群一致的 TCF CE 方法論：先讀題，再回文章找**。
  兩個被反覆點名的技巧：**skimming**（快讀標題、首段、結論抓大意）與 **scanning**（拿題目的關鍵詞去文章裡定位，不逐字讀）。
  時間管理的說法是「**簡單題快答，把時間留給難題，因為難題分數更高**」、
  「**追求更有選擇性的閱讀，不是盲目加速**」、「**絕不留空白**」。
  （[go-tcfcanada 方法論](https://go-tcfcanada.com/methodologie-comprehension-ecrite-tcf-canada/)、[tcfenligne 7 個訣竅](https://www.tcfenligne.com/comprehension-ecrite-tcf-canada/)、[preparer-tcfcanada 策略閱讀](https://www.preparer-tcfcanada.com/blog/comprehension-ecrite-tcf-canada-lecture-strategique-pour-29-questions-parfaites)）🟡
  - ⭐ **注意這跟 W37 的聽力結論是同一句話的兩個版本**：聽力那邊是「只播一次 ⇒ 先看題目是格式決定的必然」；
    閱讀這邊是「**一題一篇新文章 ⇒ 先看題目也是格式決定的必然**」。
- **備考站對 TCF CE 的難點描述**：「問題通常不只是文法，而是**速度、理解、詞彙辨識，以及在時間壓力下抓到意思的能力**」；
  並宣稱「**從 B1 起，約需 3–5 個月的密集閱讀練習才到 CLB 7**」。
  ⚠️ **這是招生文案的時程估計，沒有方法學，不要當數字用。**
  （[languagenext TCF reading](https://www.languagenext.com/blog/tcf-canada-reading/)）🟡🔴
- **法語分級閱讀素材生態（B 家族的閱讀版礦脈，`METHOD_MAP.md` 目前一個都沒點名）**：
  - **RFI《Journal en français facile》**——每日十分鐘、**免費逐字稿**、被形容為 B1 程度的清晰法語。⭐ 同一份素材同時供聽力與閱讀。
  - **1jour1actu**——法國給兒童看的新聞，「短、主題具體、而且**它有替自己的難字下定義的習慣**」，被形容為「意外地很適合成人學習者」。
  - **Le Petit Quotidien**（6–10 歲日報，⚠️ 只有訂閱制）、**Mon Quotidien**、**TV5Monde 的 A1 文章**（受控詞彙＋音檔）。
  （[frenchtoenglish 依難度排序的法語新聞來源](https://frenchtoenglish.com/beginner-french-news-sources-ranked-difficulty/)、[lecon.ai 法語閱讀階梯 A1–C1](https://www.lecon.ai/blog/french-reading-ladder-graded-resources-a1-to-c1)、[FluentU 法語新聞資源](https://www.fluentu.com/blog/french/learn-french-news/)）🟡
  - 📌 **對照 `HANDOFF.md`**：innerFrench 被判定 B1+ 暫不使用——**但上面這幾個是 A1–A2 起跳的**，
    而且 RFI 有逐字稿，**跟 W37 對聽力 CI 生態的結論完全一致**（不必因為 innerFrench 太難就排除整個生態）。
- **polyglot 圈的「精讀 vs 泛讀」分工說法**：
  「**精讀替你的語言工具箱補工具，泛讀讓你能不費力地使用那些工具**」；
  Lampariello、Arguelles 等人的做法是**拿原文與譯文逐段對照推進**，直到能整章整本讀下去。
  Kató Lomb 則被描述為主要靠「**解碼**」小說學語言、不大量查字典。
  （[Luca Lampariello：精讀 vs 泛讀](https://www.lucalampariello.com/intensive-reading-vs-extensive-reading/)、[Alexander Arguelles 的比較](https://www.alexanderarguelles.com/question-answer/thoughts-on-comparing-techniques-for-reading-literature-in-foreign-languages/)、[Learn Any Language wiki：讀書策略](https://learnanylanguage.fandom.com/wiki/Strategies_for_Reading_Books)）🟡
  - ⚠️ **全部是軼事**，而且 Lomb／Arguelles 是極端天賦與極端時數的案例，**⛔ 不要拿來當方法證據**
    （同 `research/2026-09-06_SOLO_D` 對「蒸餾實際做到的人」的警告）。
- **Conti 的窄讀／窄聽**：同一批詞彙與結構在**不同文本裡刻意重複循環**，
  他把窄讀與窄聽並列為「透過聚焦而有目的的循環來強化接收技能」。
  （[The Language Gym：narrow reading and narrow listening](https://gianfrancoconti.com/2015/06/21/narrow-reading-and-narrow-listening-enhancing-receptive-skills-through-focused-and-purposeful-recycling/)）🟡
  - **窄讀的研究側**：Krashen 定義為「讀同一個作者的好幾本書，或讀同一個有興趣的主題」；
    Kang (2015, *RELC Journal*) 提供了主題聚焦可最大化 L2 詞彙學習的證據。
    ⚠️ 但語料庫研究指出**優勢比想像中複雜、而且對語域很敏感**：
    **主題**在說明文合集裡效果最好，**單一作者**在敘事文合集裡效果最好。
    （[ERIC EJ1071845 Kang 2015](https://eric.ed.gov/?id=EJ1071845)、[Gardner (2008), *RFL* 語料庫研究](http://www2.hawaii.edu/~readfl/rfl/April2008/gardner/gardner.html)）🟢

---

## 2. 家族歸類

### 2.1 本週每條發現屬於哪個家族

| 發現 | METHOD_MAP 家族 |
|---|---|
| 大量閱讀（ER）、分級讀本、法語分級新聞生態 | **B 可理解輸入**（閱讀版） |
| ⭐ ER 的調節變項（限制選書＋有問責 → 效果更大） | **B ＋ F**（F 的反直覺版：約束與驗收**提升**效果，不是扼殺動機） |
| 窄讀（narrow reading） | **B**（＋ `SPEAKING_METHOD.md` 第五節「窄而重複」的同一原則） |
| 限時閱讀、重複閱讀、wpm 訓練 | **A 刻意練習**（＝聽力那邊時間壓縮訓練的閱讀對應物） |
| 略讀／掃讀、先讀題、時間分配、文本結構教學 | **C 策略能力**（接收端版本，同 W37 對元認知循環的判定） |
| 註解（gloss）、逐字稿、雙語對照 | **B**（工具面）＋ **E 內容驅動**（挖句子的入口） |
| RWL 邊聽邊讀 | **B 的工具**，⚠️ 但真正機制是**強制配速** → 其實更接近 **A** |
| AI 產生分級文本、CEFR 對齊、AI 閱讀鷹架 | **D AI 對話夥伴**的擴張用法（⚠️ 證據薄，且 CEFR 對齊會漂移） |
| 詞彙覆蓋率門檻（98% / 8,000 詞族）、語言門檻假說 | **跨家族的量的約束**，不屬於任一家族（同 W37 對覆蓋率的處理） |
| ⭐ 法語沉默形態、詞形辨識自動化、功能詞跳讀率 | **G 感知解碼訓練**——但**是眼睛那一側**，見 2.2 |
| 閱讀焦慮／愉悅感、遊戲化閱讀紀錄 | **F 動機工程** |

### 2.2 ⭐ 本週**沒有**找到新家族——而且這件事本身要寫出來

依研究法鐵律，我先掃了全景才挑深挖：大量閱讀派、流暢度／限時派、策略派、文本結構派、
註解／輔助閱讀派、速讀／RSVP 派、AI 生成分級文本派、polyglot 精讀泛讀派，八條線都掃過。

**結論：八條全部落得進 A–G，沒有一條需要開新家族。**

- 文本結構教學**不是新家族**：它跟 W37 判定元認知循環的理由一樣——
  「重新組織既有能力」就是 **C**，只是從產出端搬到接收端、再從「讀者的策略」搬到「文本的形狀」。
- 速讀／RSVP **不是家族，是一個被證據否掉的主張**（見 1A ④）。
- AI 生成分級文本是 **D** 的擴張，不是新槓桿。

⚠️ **這是一個弱的正面訊號，不是強的**：連續兩週用全景掃法去撞這張地圖，第二週沒撞出新東西，
**弱證據指向 A–G 大致覆蓋得住**。⛔ 但 n=2，不要當成地圖已經完備。

### 2.3 ⭐⭐ 但 **G 家族需要擴寫**：它現在只寫了耳朵，少了眼睛

`METHOD_MAP.md` 的 G 節（W37 建立）現在的定義是
「修訊號進來的那一層（**音位・詞界・弱化形**）」，證據全是 HVPT、LAM、逐字聽寫——**全部是聽覺**。

但本週的 1A ⑤ 顯示，**同一個機制在文字通道有一個完整的對應物**：

| | 👂 聽覺側（W37 已寫） | 📖 **視覺側（本週發現，地圖上沒有）** |
|---|---|---|
| 壞掉的那一層 | 音位沒建立、詞界切不開、縮讀形沒進意識 | **詞形辨識沒自動化、沉默形態沒被登錄、功能詞逐字處理** |
| 法語的特殊之處 | liaison／enchaînement **抹掉**詞界 | 正字法**顯示出**聽不見的文法（`parle/parles/parlent`） |
| 客觀指標 | 逐字聽寫正確率、功能詞漏收數 | **wpm、功能詞跳讀率、一致性標記的偵測率** |
| 訓練手段 | HVPT、逐字聽寫、功能詞挖空、速度階梯 | **限時閱讀、重複閱讀、動詞形對比辨識** |

⭐ **兩側的核心主張一模一樣**：「你的『理解』本來就是靠猜的，猜得越順，錯的表徵越穩固。」
閱讀版的講法是：**你可以在完全沒解析句法的情況下，靠內容詞＋常識答對一題理解測驗**
（＝ `research/2026-09-02_C` 的 good-enough processing，選擇題最容易蒙混）。

📌 **建議的 `METHOD_MAP.md` 修訂（⛔ 本 session 沒有改，等 Owen 拍板）**：
把 G 的標題從「感知解碼訓練（bottom-up decoding／HVPT／LAM）」
擴成 **「感知解碼訓練（兩個通道：聽覺解碼 ＋ 正字法解碼）」**，並補上本節這張對照表與 1A ⑤ 的法語鏡像。

⚠️ **為什麼這次不自己改**：`CLAUDE.md` 的動作邊界寫的是「**發現新家族時**可以編輯 `METHOD_MAP.md` 補一節」。
本週**沒有發現新家族**，只是要擴寫既有的一節——**這超出了授權的字面範圍，所以留給 Owen 決定。**

---

## 3. 可以直接抄的實作參數

> ⚠️ 每一列都標了依據等級。🟢＝有樣本數的研究；🟡＝實務／二手；🔴＝待驗證。
> ⛔ 🔴 的那幾列**用前必須對官方**，尤其本週考試格式的來源**彼此矛盾**。

| 參數 | 數值 | 依據 |
|---|---|---|
| **閱讀詞彙門檻** | **98% 覆蓋 ≈ 8,000 詞族**（自在閱讀）；**95% ≈ 4,000–5,000**（最低可用） | Laufer & Ravenhorst-Kalovski 2010 🟢（⚠️ 英語資料，法語未查證） |
| ⭐ 閱讀 vs 聽力的門檻差 | 同樣 98%，**閱讀要的字彙量約為聽力的 1.5 倍**（8,000 vs 5,000–6,000） | W37 ＋ 本週並列 🟢 |
| 詞彙量與理解的相關 | **r = 0.57**（閱讀）／0.56（聽力） | Zhang & Zhang 2022 🟢 |
| **細讀目標速度** | **約 250 wpm**（前提：文本無生字無生文法） | Nation 🟡 |
| **限時閱讀的預期增益** | **+13 ～ +50 wpm**；52 篇／約 16,800 字的課程量級 | 限時閱讀研究群 🟢 |
| **限時 vs 限時＋重複** | 三種都有效；**限時重複閱讀 > 純限時**（顯著） | 三組比較研究 🟢 |
| ⛔ **速讀／RSVP** | **不要做**。「又快又懂」的主張不成立；有效的部分其實是**學會略讀** | Rayner et al. 2016 🟢（反方數字全出自速讀產品站 🔴） |
| **ER 的整體效果量** | 對照 **d = 0.46**／前後測 **d = 0.71**（Nakanishi 2015）；**d = 0.41**（Sangers et al. 2025，86 個比較） | 兩篇統合分析 🟢 |
| ⭐ **ER 的調節變項** | **限制選書 ＋ 有問責 → 效果更大**（⛔ 與 ER 正統相反） | Sangers et al. 2025 🟢 |
| **附帶學習需要幾次相遇** | 常引 **8–10 次**；⚠️ 各研究從 6 到 20+ 都有，**無共識**；重複×學習 r = .34 | Waring & Takaki 等 🟢 |
| **附帶學習的單篇效率** | 很低：**28 字學到 2 個 ～ 12 字學到 6 個** | 附帶學習回顧 🟢 |
| 分級閱讀的年增益 | 約 **1,000 詞族／年** | Nation 2015 🟡 |
| ⭐ **RWL 只在強制配速時有效** | 整體 **g = .18（微弱）**；**實驗者控速 g = 0.41**、**自己控速無可靠效果** | RWL 統合分析（30 研究／1,945 人）🟢 **修正 W37** |
| 註解（gloss）的效果量 | 多重註解 **+0.83** > 純文字；整體 **g = 1.27**（⚠️ 極端值，後測多為立即測驗） | gloss 統合分析群 🟢 |
| 文本結構教學 | 高風險族群 **ES = 0.96**；⚠️ 一般族群分測驗差很大（理解題 **g = 0.25**），**延遲後測優勢消失** | 兩篇統合分析並陳 🟢 |
| 眼動的自動化指標 | L2 比 L1：注視 **+21%**、句閱讀時間 **+20%**、掃視 **−12%**、**跳讀少 4.6%**；程度越高越會跳過短高頻字 | 眼動研究群 🟢 |
| 窄讀怎麼排 | **主題**聚焦利於說明文；**單一作者**聚焦利於敘事文（⛔ 不能混用） | Gardner 2008 語料庫研究 🟢 |
| **AI 生成分級文本** | ⛔ **目前不可靠**：LLM 無法穩定對齊 CEFR，會發生「對齊漂移」 | 文本簡化／CEFR 對齊研究群 🟢 |
| **考試格式**（TCF CE） | **39 題／60 分鐘 ≈ 92 秒/題**；四選一；難度 A1→C2 遞增；**CLB 7 ≈ 453–498 / 699** | 備考站 🔴 **用前對官方（FEI）** |
| **考試格式**（TEF CE） | **60 分鐘**；題數來源**互相矛盾：40 題 vs 50 題**（⇒ 72–90 秒/題） | 備考站與出版社 PDF 🔴 **矛盾，必對官方** |
| ⭐ **TCF vs TEF 的結構差異** | TCF **幾乎一題一篇新文件**；TEF **同一份文件問多題**（行政文件／新聞各 2 題） | 備考站 🔴 **未經官方確認，但若屬實則訓練形態完全不同** |

---

## 4. 跟現有系統的缺口對照

現況盤點（實際讀 `reading.html` 1,440 行 ＋ `dashboard.html` ＋ `HANDOFF.md`，數字是跑腳本算的）：

| 項目 | 實際數字 |
|---|---|
| 文章數 | **33 篇** |
| 題數 | **99 題**（每篇固定 3 題、固定四選一） |
| 等級分布 | **A1 × 5、A1+ × 15、A2 × 13**　⇒ **B1 以上 0 篇** |
| 篇幅 | 平均 **99.7 字**、中位數 **72 字**、最短 47、最長 264 |
| **全題庫總字數** | **3,290 字** |
| 主題 | **27 個主題／33 篇** |
| 計時 | 有 `timer-strip`，`sec` 有存進 `clb7_reading` |
| 文章可見性 | 作答時**原文一直在畫面上**（可以掃讀） |

### 缺口（按嚴重度排）

1. **⭐⭐⭐ 難度分布與考試完全錯開：題庫 0 篇 B1 以上，而 TCF CE 的配分重心在 B1/B2**
   33 篇全部 A1–A2。而備考站對 TCF 的描述是難度 A1→C2 遞增、**B1＋B2 合計佔多數配分**（🔴 同 W37 的待驗證項）。
   ⇒ **他現在練的每一篇，都在考試裡屬於「本來就該全對」的那一段。**
   練 100% 正確率的題目，正是教學鐵律明寫的 ⛔「不要為了完整讓他做已經反射化的題目」。
   ⚠️ 這一條**不是叫 Claude 去生 B1 文章**——1A ⑨ 說 LLM 的 CEFR 對齊會漂移，內容鐵律也禁止自創教材。
   **正解是接真實素材**（RFI / 1jour1actu / TV5Monde），這是 Owen 要決定的事。

2. **⭐⭐⭐ 量差了兩到三個數量級**
   全題庫 **3,290 字**。以 250 wpm 算，**整個閱讀題庫讀完約 13 分鐘**。
   對照 1A ①：限時閱讀課程的量級是**約 16,800 字**；分級閱讀要長 1,000 詞族／年需要的量遠不止於此。
   ⇒ **現在的 `reading.html` 在量的尺度上不是「大量閱讀」，它是「閱讀測驗」。**
   ⚠️ 這不一定是缺陷——ER 統合分析說「限制選書＋有問責」效果更大，現在的形態剛好對。
   **但它不能同時兼任 B 家族的輸入來源。B 那一格目前是 0。**

3. **⭐⭐⭐ 速度完全沒有被量測，而且現有的 `sec` 欄位量錯了東西**
   `reading.html:1147` 的 `startTimer()` **只在 `DOMContentLoaded` 呼叫一次**，
   `openArticle()` **不會重置計時器**（全檔只有這一個呼叫點）。
   ⇒ **存進 `clb7_reading` 的 `sec` 是「從開啟頁面到按下驗證」的累計秒數，不是這一篇花的時間。**
   同一次坐下讀第 3 篇時，那筆 `sec` 包含了前兩篇。
   ⇒ **系統目前沒有任何一筆可用的閱讀速度資料**，而速度正是 1A ④ 唯一有硬證據的可訓練參數，
     也是備考站說 TCF CE 真正的難點。
   📌 這是本週**最便宜**的一條：計時器改成每篇重置，`sec` 就立刻變成有意義的資料；
     再配上每篇的字數（腳本算得出來），**wpm 是免費的**。
   ⚠️ 但 `sec` 的語意一改，歷史資料的意義就變了——**要不要遷移是 Owen 的決定。**

4. **⭐⭐ 沒有時間壓力，所以練不到考試真正在考的東西**
   計時器只是**碼錶**，沒有目標、沒有上限、沒有倒數。
   而 TCF 是 **92 秒/題**、TEF 是 **72–90 秒/題**（🔴）。
   ⇒ 略讀／掃讀這兩個社群一致點名、而且 Rayner 那篇也承認「被逼快時真正學到的東西」，
     **在無限時間下根本不會發生**——時間充裕時人就會逐字讀。
   ⚠️ 同 W37 的結論：**練習可以慢，驗收不行**，兩種模式要分開。

5. **⭐⭐ 「一題一篇」的形態沒有被練到（若 TCF 結構的說法屬實）**
   現在是**每篇 3 題**——這是 **TEF 的形狀**。
   若備考站說的「TCF 幾乎一題一篇新文件」屬實，那 TCF 練的是完全不同的能力：
   **每 92 秒要重新進入一個陌生語境**，切換成本比理解成本還高。
   ⇒ 現在的形態在**攤薄**這個成本（一次進入語境、答三題）。
   🔴 **這一條完全建立在未驗證的來源上，⛔ 在對過官方之前不要照它改任何東西。**

6. **⭐⭐ 27 主題／33 篇 ＝ 窄讀的反面**
   平均**每個主題只有 1.2 篇**。而窄讀的機制就是同一批詞彙在不同文本裡重複出現（8–10 次才學得起來）。
   ⇒ 現在的排列讓每一篇的新詞都**只出現一次**，附帶學習率被壓到 1A ⑥ 那個「28 字學到 2 個」的下限。
   📌 **這跟 W37 對 `LISTENING_BANK` 的診斷一字不差**（18 篇每篇主題都不同）——
     **是同一個設計習慣在兩個題庫裡犯了兩次**，而 `SPEAKING_METHOD.md` 第五節早就寫了「窄而重複」。
   ⚠️ 語域限制要記得：主題聚焦利於說明文、作者聚焦利於敘事文（Gardner 2008），**⛔ 不能混著排。**

7. **⭐ 閱讀是唯一看得到「沉默文法」的通道，而系統完全沒有利用這件事**
   99 題全部是**內容理解題**（誰做了什麼、哪個是真的）。
   **沒有任何一題在問 `parle / parles / parlent` 的差別、性數配合、時態標記。**
   ⇒ 依 1A ⑤：那些資訊**在聽力裡物理上收不到，只有閱讀看得到**。
     `FRENCH_OS.md` 的 **⑤ 配合系統**目前在系統裡沒有專屬的接收端訓練——
     **而閱讀是唯一可能的通道，現在被閒置了。**
   ⚠️ ⛔ **不需要新增法文句子**：題庫裡現成的 33 篇文章、3,290 字裡已經有大量 `-s`／`-ent`／配合形，
     **對既有句子提問不是創作教材**。但要不要做仍是 Owen 決定。

8. **⭐ 違反 2026-09-11 的 ⭐ 跳過鐵律**
   `reading.html` 全檔 **grep `跳過`／`會了`／`_known` ＝ 0 次**（對照 `table_drill.html` 有 24 處）。
   而那條鐵律明寫「**適用所有現有與新增頁面**」，`reading.html` 是有「作答 → 判定完成」的頁面，
   而且**就在每日處方的第 6 步**。
   ⇒ 三層出口（格／題／今日步驟）一層都沒有。答不完只能硬答或按「Réessayer」重來。
   📌 這是**規則層面的缺口，不是研究發現**，但既然這次逐行讀了這個檔案，就寫下來。

9. **🔸 RWL（邊聽邊讀）有殼但沒有配速**
   `reading.html` 已經掛了 `tts_reader.js`，有整段連續朗讀＋高亮。
   ⇒ 形式上就是 RWL。**但依 1A ⑧，自己控速的 RWL 統合分析測不到效果**——
     有效的是**音檔拖著你走**那一種。目前 TTS 是「輔助發音」的角色，不是「配速器」。
   ⚠️ 而且 `listening.html` 的 TTS 固定 `rate = 0.78`（W37 缺口 2）；
     若要當配速器，**速率必須是訓練變數**，而且這是跨兩個頁面的同一個問題。

---

## 5. 一個 15 分鐘就能試的實驗（明天就能做，不用等我改程式）

### 🧪「三次同一篇」——量出你的閱讀速度地板，以及你有沒有在解析句法

**為什麼是這個實驗**：本週唯一有硬證據、又完全沒被系統量到的東西就是**速度**（1A ④），
而第 4 節缺口 3 說明**系統現在量不出來**（計時器沒重置）。
所以第一步不是改程式，是**先拿到 Owen 的基線數字**——沒有基線，速度階梯的起點就是瞎猜。

**素材**：`reading.html` 裡**還沒做過**的任一篇 A2 文章（選沒做過的，才測得到真實速度）。
**器材**：手機碼錶 ＋ 一張紙。⛔ 不要開 TTS 朗讀（那會把速度鎖在語速上，不是閱讀速度）。

| 分鐘 | 做什麼 | 在測什麼 |
|---|---|---|
| 0–2 | **第一次讀**：按碼錶，正常讀一遍，讀完停錶。⛔ 不准回頭重讀。記秒數。然後**闔上**，用中文寫下你記得的三件事 | **基線 wpm ＋ 真實理解**（先寫再看，避免熟悉度錯覺） |
| 2–5 | 回去**答那 3 題**，照常做 | 正確率（對照組：這是他平常做的事） |
| 5–8 | ⭐ **句法解析檢查**：不看題目，回文章圈出**每一個動詞**，在旁邊標「誰做的」（je／tu／il／nous／ils）。⛔ 只准看動詞字尾，不准靠上下文猜 | **1A ⑤ 的沉默形態**：`-s`／`-ent`／`-ons` 你有沒有真的在讀，還是整段跳過去 |
| 8–11 | **第二次讀同一篇**，一樣計時。記秒數 | **重複閱讀的增益**（1A ①：限時重複 > 純限時） |
| 11–14 | 換一篇**沒做過的**，這次**給自己 92 秒**（＝ TCF 的一題時間），時間到就停，不管讀不讀得完，直接答題 | **時間壓力下會發生什麼**（缺口 4：無限時間下永遠練不到略讀） |
| 14–15 | 記四個數字：①第一次 wpm ②第二次 wpm ③動詞主詞標對幾個／共幾個 ④限時那篇的正確率 | 建立**客觀指標**，取代「我覺得我讀懂了」 |

**wpm 怎麼算**：文章字數 ÷ 秒數 × 60。
📌 字數不用自己數——`reading.html` 的 `ARTICLES` 陣列裡每篇都有 `text`，
Owen 跟 Claude 說篇名，我可以直接算給他（本檔第 4 節那些字數就是這樣來的）。

**⭐ 這個實驗要回答的四個問題**（回答完才知道系統該先做哪一格）：
1. **基線 wpm 是多少？** → 決定速度階梯的起點（Nation 的 250 wpm 是天花板參考，不是起點）
2. **讀第二次快多少？** → 快很多 ＝ 瓶頸在**詞形辨識**（G 家族視覺側）；幾乎沒變 ＝ 瓶頸在**理解**
3. **動詞主詞標對幾成？** → 低 ＝ 他在讀法文時**根本沒在處理沉默形態**，那 `FRENCH_OS.md` ⑤ 配合系統的接收端是空的
4. **92 秒限時掉多少分？** → 掉很多 ＝ 現在的「答對率高」是**時間充裕買來的**，不是能力

⛔ **不要在這一輪順便查生字。** 這一輪只量速度與解析，查字典會污染所有四個數字。
（同 W37 那句：⛔ 不要在同一輪同時想「我文法對不對」。）

---

## 6. 🎮 怎麼讓它更好玩

> 依 `METHOD_MAP.md` F 家族：**FLE（外語愉悅感）是進步的正向預測因子，無聊與焦慮是反向的**。
> 本週補一條閱讀專屬的證據：**外語閱讀焦慮（FLRAS 量表）與閱讀表現在三個時間點都顯著負相關**
> （北京某大學、18 週、三次施測）；另一份 **880 名非英語主修新生**的研究顯示
> FLE 與表現正相關、FLCA 與 FLB（無聊）與表現負相關。
> （[*Asia-Pacific Education Researcher* 2023 縱貫研究](https://link.springer.com/article/10.1007/s40299-022-00694-x)、[FLE/FLCA/FLB 的聯合預測 (PMC)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9831005/)）🟢
> ⭐ **對閱讀特別重要的一點**：閱讀是**一個人、無聲、沒有對手**的活動——
> 它沒有口說那種社交型愉悅感可用，**只剩下私人型愉悅感**（`METHOD_MAP.md` F 節那兩型裡的後者）。
> ⇒ **閱讀的好玩必須內建在活動本身，借不到別人的力。**

### 做法一：⭐ **「破速」取代「答對」**——把閱讀的主指標從正確率換成 wpm

現在的迴路是「讀 → 答 3 題 → 拿 3/3」。問題是**他幾乎都會 3/3**（題庫全是 A1–A2），
所以這個分數**不會動**，而不會動的分數就沒有玩的空間。

**wpm 是一個會動的數字。** 而且它有三個好性質：
- **每一次都有新紀錄可破**（正確率封頂在 100%，速度沒有上限）
- ⭐ **它會進步得很明顯**——限時閱讀研究說一個課程量級就 +13～50 wpm（1A ①），**這是看得見的曲線**
- **它不需要答對就能拿到**——⭐ 這直接繞開焦慮：**測速度不評價你懂不懂**

配一條刻度尺讓他知道自己在哪：
```
現在的你  →  ?? wpm（第 5 節量出來）
TCF 生存線 →  92 秒讀完一篇 + 答一題
細讀天花板 → 250 wpm（Nation，前提是沒有生字）
```
⚠️ **但一定要配一個防呆**：⛔ 只追速度會退化成亂掃。
**規則：那篇的題目沒有全對，這次的 wpm 不算數。** 速度與理解綁在一起才是分數。
（這也是 Rayner 那篇的取捨警告在介面上的具體化。）

### 做法二：⭐⭐ **「找出說謊的動詞」**——把法語的沉默形態變成找碴遊戲

1A ⑤ 那條「`parle / parles / parlent` 發音一樣，只有眼睛分得出來」，**本身就是一個梗**，
而且它跟 W37 那個已經被驗證會讓 Owen 有反應的笑點（`les siens` 聽成 `les chiens`）是**同一類快感**：
**「法文在這裡偷偷藏了東西」**。

玩法極簡，**而且完全不需要新增法文句子**（用題庫現成的 33 篇）：
- 從文章挑一句，**把動詞的字尾改掉**（`parlent` → `parle`），問：**「這句話被動過手腳了嗎？」**
- 三個答案：**沒動過 / 動過（人稱錯了）/ 動過（時態錯了）**
- ⭐ **揭曉時放一句話**：「**這兩個字唸起來一模一樣。只有讀的人抓得到。**」

為什麼這個框架對：
- **它是 W37「破譯」框架的閱讀版**——聽力那邊是「法文把字藏起來了」，閱讀這邊是「**法文只在紙上說真話**」
- ⭐ 它讓 Owen 的閱讀**有一件耳朵做不到的事**——閱讀不再只是「比較簡單的聽力」，它有**獨佔的超能力**
- **它繞開「我法文不夠好」**：判斷 `-ent` 對不對不需要懂整句在說什麼
- ⛔ **它不是自創教材**：對既有句子提問、標注既有句子的形態，不是創作新的法文句子

### 做法三：**窄讀「追連載」**——用系列感取代題庫感（E ＋ F 合流）

缺口 6 說現在是 27 主題／33 篇。窄讀要的是反過來。
但**「為了詞彙重複而讀同一個主題」聽起來就很像作業**，所以換一個包裝：
- **同一個主題連續 4–5 篇，當成一個「章節」**，有名字（例如「Montréal 的冬天」）
- ⭐ **只有讀完整個章節才解鎖下一章**——⭐ 這剛好就是 ER 統合分析說效果更大的那兩個條件：
  **限制選書 ＋ 有問責**（1A ①）。**好玩的設計跟證據在這裡同向，不用取捨。**
- ⚠️ 語域要分開排：**說明文用主題聚焦、敘事文用同一個人物**（Gardner 2008），⛔ 不要混著來

### ⚠️ 依交付鐵律「新功能先過大腦檢查」

| 做法 | dashboard 讀得到嗎 | 能影響今日處方嗎 | 判定 |
|---|---|---|---|
| 一、wpm 主指標 | ✅ `clb7_reading` 已經有 `sec` 欄（⚠️ 但要先修計時器語意，缺口 3） | ✅ 可以推「今天練速度還是練難度」 | ⭐ **兩個都過，而且最便宜** |
| 二、找出說謊的動詞 | 🔸 需要新的記錄 key | ✅ 可以餵 `FRENCH_OS.md` ⑤ 配合系統的狀態 | 🔸 **要先確認第 5 節實驗的第 3 個數字**（他到底有沒有在讀字尾）——⛔ 沒資料就不要做 |
| 三、窄讀章節 | ✅ 用現有的 `clb7_reading` 就看得出章節完成度 | ✅ 可以推「下一篇讀哪篇」 | ✅ 過，但**要先有 B1 素材**（缺口 1），否則只是把 33 篇 A2 重排 |

⭐ **三個做法的共同前提都是第 5 節那個 15 分鐘實驗。** ⛔ 先量，再決定，不要憑空排。

---

## 7. 來源清單

### 研究（🟢 摘要層級：作者／年份／樣本數／效果量來自檢索摘要，**本週一篇原文都沒讀到**）

**大量閱讀**
- Nakanishi (2015)，ER 統合分析（34 研究／43 效果量；d = 0.46 對照、0.71 前後測），*TESOL Quarterly* 49(1) 6–37：https://onlinelibrary.wiley.com/doi/10.1002/tesq.157 ／ https://eric.ed.gov/?id=EJ1052150
- ⭐ Sangers, van der Sande, Welie, Dobber & van Steensel (2025)，ER 統合分析（86 個比較；d = 0.41；**限制選書＋問責 → 效果更大**），*Educational Psychology Review* 37:96：https://link.springer.com/article/10.1007/s10648-025-10068-6 ／ https://research.vu.nl/en/publications/learning-a-language-through-reading-a-meta-analysis-of-studies-on/
- 窄讀：Kang (2015), *RELC Journal*：https://eric.ed.gov/?id=EJ1071845
- 窄讀的語料庫檢驗（主題 vs 作者、語域敏感）：Gardner (2008), *Reading in a Foreign Language*：http://www2.hawaii.edu/~readfl/rfl/April2008/gardner/gardner.html

**流暢度與速度**
- 限時與重複閱讀（+13～27 wpm），*System* 2022：https://www.sciencedirect.com/science/article/abs/pii/S0346251X22000835
- 限時閱讀＋朗讀重複三組比較（52 篇／16,800 字；+50 wpm）：https://files.eric.ed.gov/fulltext/EJ1316861.pdf
- 速讀課程效果與遷移（Macalister 2010／Tran 2012 相關）：https://files.eric.ed.gov/fulltext/EJ887882.pdf ／ https://scholarspace.manoa.hawaii.edu/server/api/core/bitstreams/4546e325-83f5-44c7-93e7-8cab5d339859/content
- ⛔ **反方**：Rayner, Schotter, Masson, Potter & Treiman (2016)，速讀主張被誇大、被逼快時學到的是略讀，*Psychological Science in the Public Interest*：https://journals.sagepub.com/doi/10.1177/1529100615623267 ／ https://www.psychologicalscience.org/publications/speed_reading.html

**門檻與詞彙**
- Laufer & Ravenhorst-Kalovski (2010)，覆蓋率門檻（98%/8,000；95%/4,000–5,000），*Reading in a Foreign Language*：https://scholarspace.manoa.hawaii.edu/items/eaead47e-853e-4797-ba6f-596df150c1d7 ／ https://eric.ed.gov/?id=EJ887873
- Nation (2006)，閱讀與聽力各需多少詞彙：https://www.researchgate.net/publication/239928724_How_Large_a_Vocabulary_Is_Needed_for_Reading_and_Listening
- Zhang & Zhang (2022)，詞彙知識與 L2 閱讀/聽力理解（r = .57／.56），*Language Teaching Research*：https://journals.sagepub.com/doi/10.1177/1362168820913998 ／ https://eric.ed.gov/?id=EJ1342379
- 語言門檻／短路假說：Yamashita（名古屋大學）：https://www.lang.nagoya-u.ac.jp/proj/genbunronshu/23-1/yamashita.pdf ／ Lee & Schallert (1997), *TESOL Quarterly*：https://onlinelibrary.wiley.com/doi/abs/10.2307/3587757 ／ 重訪：https://www.researchgate.net/publication/271336770_Relations_among_L1_Reading_L2_Knowledge_and_L2_Reading_Revisiting_the_Threshold_Hypothesis ／ ⚠️ 重新建模：https://www.cambridge.org/core/journals/bilingualism-language-and-cognition/article/abs/rethinking-the-linguistic-threshold-hypothesis-modeling-the-linguistic-threshold-among-young-spanishenglish-bilinguals/614311FB345E06376688FC96A0FF4D1C

**附帶學習**
- 附帶詞彙學習需要幾次相遇（8–10，⚠️ 無共識）：https://www.eapfoundation.com/vocab/learn/incidental/
- 重複與附帶詞彙學習的統合分析（26 研究／45 效果量，r = .34）：https://www.academia.edu/38264254/The_Effects_of_Repetition_on_Incidental_Vocabulary_Learning_A_Meta_Analysis_of_Correlational_Studies
- ⛔ **反方**：解構「附帶」學習（單篇學習率 2/28 ～ 6/12）：https://files.eric.ed.gov/fulltext/EJ1176843.pdf ／ 顯性 vs 隱性詞彙教學：https://www.academypublication.com/issues2/tpls/vol05/08/11.pdf

**法語專屬**
- ⭐ L1/L2 法語屈折形態的語音與正字法線索（ERP 證據），*Frontiers in Psychology* 2014：https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2014.00888/full
- 法語形態知識與拼寫的發展（PMC）：https://pmc.ncbi.nlm.nih.gov/articles/PMC7031411/

**輔助手段**
- ⭐ RWL 系統回顧與統合分析（30 研究／1,945 人；g = .18；**控速 g = 0.41／自控速無效**）：https://www.researchgate.net/publication/374055410_Does_Reading_while_Listening_to_Text_Improve_Comprehension_Compared_to_Reading_Only_A_Systematic_Review_and_Meta-Analysis
- Hui (2024)，RWL 的鷹架作用與閱讀速度、文本複雜度，*MLJ*：https://onlinelibrary.wiley.com/doi/full/10.1111/modl.12905
- 註解統合分析（單 vs 多重註解，+0.83）：https://eric.ed.gov/?id=EJ1135927
- 多媒體註解第二輪統合分析：https://www.sciencedirect.com/science/article/pii/S000169182400218X
- 電腦輔助註解與閱讀理解／詞彙，*CALL* 21(3)：https://www.tandfonline.com/doi/full/10.1080/09588220802090246
- 文本結構教學統合分析（ES = 0.96，高風險族群）：https://apps.asha.org/EvidenceMaps/Articles/ArticleSummary/61fb58ef-54ff-4a0f-a6f3-ae318f6ea0d5 ／ https://eric.ed.gov/?id=EJ1105625
- ⚠️ **反方**：Bogaerds-Hazenberg et al. (2021)，*RRQ*（理解題 g = 0.25；延遲後測優勢消失）：https://ila.onlinelibrary.wiley.com/doi/10.1002/rrq.311
- 閱讀策略與理解的統合分析：https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8371629/

**眼動**
- 單語／雙語自然閱讀的眼動比較（PLOS ONE）：https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0134008
- L2 跳讀的個別差異（PMC）：https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11680623/
- 典型距離 L1 背景 L2 讀者的「Big Three」效應（PMC）：https://pmc.ncbi.nlm.nih.gov/articles/PMC12565054/

**AI**
- AI 聊天機器人在二語教育的系統回顧（閱讀增益較小，因互動重產出輕輸入）：https://www.sciencedirect.com/science/article/pii/S2215039025000086
- ChatGPT 在語言學習的系統回顧：https://www.sciencedirect.com/science/article/pii/S2590291125010885
- 圖像化摘要＋聊天機器人對閱讀理解的準實驗，*ETR&D* 2025：https://link.springer.com/article/10.1007/s11423-025-10583-x
- ⭐ **LLM 無法可靠對齊 CEFR**：Right at My Level（多語 proficiency-aware 簡化）：https://arxiv.org/html/2604.05302 ／ TSAR 2025 受控 CEFR 簡化：https://aclanthology.org/2025.tsar-1.10.pdf ／ CEFR-prompted LLM 的對齊漂移：https://arxiv.org/html/2505.08351v1 ／ CEFR-Annotated WordNet：https://arxiv.org/pdf/2510.18466 ／ Ace-CEFR 資料集：https://arxiv.org/html/2506.14046v1

**動機與情意**
- 外語閱讀焦慮的縱貫研究（FLRAS，18 週三次施測），*Asia-Pacific Education Researcher* 2023：https://link.springer.com/article/10.1007/s40299-022-00694-x
- FLE／FLCA／FLB 對成就的聯合預測（880 名新生）：https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9831005/
- 遊戲化與動機的統合分析（35 個介入／2,500 人）：https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11163042/

### 實務／社群（🟡 個人經驗與教師分享，無對照組）
- Conti，窄讀與窄聽：https://gianfrancoconti.com/2015/06/21/narrow-reading-and-narrow-listening-enhancing-receptive-skills-through-focused-and-purposeful-recycling/
- 法語分級閱讀素材（RFI *Journal en français facile*／1jour1actu／Le Petit Quotidien／Mon Quotidien／TV5Monde A1）：https://frenchtoenglish.com/beginner-french-news-sources-ranked-difficulty/ ／ https://www.lecon.ai/blog/french-reading-ladder-graded-resources-a1-to-c1 ／ https://www.fluentu.com/blog/french/learn-french-news/
- Luca Lampariello，精讀 vs 泛讀：https://www.lucalampariello.com/intensive-reading-vs-extensive-reading/
- Alexander Arguelles，外語文學閱讀技巧比較：https://www.alexanderarguelles.com/question-answer/thoughts-on-comparing-techniques-for-reading-literature-in-foreign-languages/
- Learn Any Language wiki，讀書策略：https://learnanylanguage.fandom.com/wiki/Strategies_for_Reading_Books
- TCF CE 方法論（先讀題／skimming／scanning／時間分配）：https://go-tcfcanada.com/methodologie-comprehension-ecrite-tcf-canada/ ／ https://www.tcfenligne.com/comprehension-ecrite-tcf-canada/ ／ https://www.preparer-tcfcanada.com/blog/comprehension-ecrite-tcf-canada-lecture-strategique-pour-29-questions-parfaites

### 🔴 待驗證（⛔ 用前必須對官方，⛔ 不要寫進系統文字）
- **TCF Canada CE 格式**（39 題／60 分鐘／四選一／難度遞增／CLB 7 ≈ 453–498）：https://www.languagenext.com/blog/tcf-canada-reading/ ／ https://www.tcfenligne.com/score-tcf-canada/ ／ https://hitcf.com/en/guide/tcf-reading
  ——**官方應對 France Éducation international 的 TCF 頁面**（本週 egress 擋掉）
- ⚠️⚠️ **TEF Canada CE 題數，來源互相矛盾**：
  - **40 題／60 分鐘**：Hachette FLE 的 TEF 空白試題 PDF 標題頁：https://tef.hachettefle.fr/ressources/tef-pdf/TEF_test_blanc.pdf
  - **50 題／60 分鐘**：多個備考站，並給出分項（4 篇對應資訊 4 題／5 份行政文件各 2 題／4 篇新聞各 2 題）：https://www.languagenext.com/blog/tef-canada-reading/ ／ https://tefcanadaonline.com/comprehension-ecrite/
  - ⛔ **在對過 lefrancaisdesaffaires.fr 官方頁之前，不要採用任何一個數字。**
- **「TCF 幾乎一題一篇、TEF 同篇多題」**（第 4 節缺口 5 整條建立在這上面）：https://www.tcfca.com/tcf-canada-ou-tef-canada-comparatif-complet/ ／ https://prepmontcfca.com/tcf-vs-tef-comprendre-les-differences/
- 備考站宣稱「從 B1 起 3–5 個月到 CLB 7」：⛔ **招生文案，無方法學，不要引用**
- ⛔ 速讀產品站的「RSVP 六週提升 53%」「提升 25–100%」：https://cognitivetrain.com/does-speed-reading-work/ ——⛔ **商業來源，且與 Rayner 2016 直接衝突，不要引用**

---

## 8. 下一週（W39 → 餘 3 → ✍️ 寫作）之前，這份留下的四個開放問題

1. ⭐⭐ **G 家族要不要擴寫成「兩個通道」？** 本週沒發現新家族，但發現 G 少了眼睛那一側（2.3 節）。
   ⛔ 依動作邊界本 session 沒改 `METHOD_MAP.md`——**這一條要 Owen 拍板。**
2. ⭐⭐ **`reading.html` 的計時器語意要不要修？** 現在的 `sec` 量的是「開頁面到現在」，不是單篇時間（缺口 3）。
   修了才有 wpm，但**歷史資料的意義會變**。⚠️ **這是改系統，屬於 Owen 另外決定的事。**
3. **B1 素材從哪來？** 題庫 0 篇 B1（缺口 1），而 AI 生成分級文本在文獻上不可靠（1A ⑨）＋內容鐵律禁止自創。
   → 只剩「接真實素材」一條路（RFI／1jour1actu／TV5Monde）。**要不要接、怎麼接，是 Owen 的決定。**
4. **W37 留下的三個開放問題，本週一個都沒動**（G 家族的時間佔比／口語縮讀能否入庫／速度階梯的 1.0× 素材）。
   📌 其中第三個現在變成**跨技能**的同一個問題了：
   聽力要「TTS 速率變成訓練變數」，閱讀要「RWL 的配速器」——**是同一件事在兩個頁面。**
