# RESEARCH 2026-W47 — ✍️ 寫作 Expression écrite

> 每週輪替研究。ISO 週 47 → 47 % 4 = 3 → ✍️ 寫作。
> 上一輪寫作是 **2026-W39**（找到 H 修訂循環家族）；W43 那一輪沒有產出檔案（見 `INDEX.md`）。
> 本檔**不重複** W39 已寫過的 WCF 統合分析、AI 批改四個統合分析、規劃時間、讀→寫遷移、語塊，
> 也不重複 11-05～11-08 四份寫作專題（FIDELIA、B1→B2 判準、評分員、寫完自查、自己抓得到哪類錯、打字 vs 手寫）。

---

## ⚠️ 本週的證據等級（先講限制，不要讓後面的數字看起來比實際硬）

- 🟢 **全檔都是檢索摘要層級**。這個 session 的網路白名單是**空的**（`allowed_hosts: []`），
  `WebFetch` 對 `lextutor.ca`／`files.eric.ed.gov`／`ncbi.nlm.nih.gov`／`doi.org` 全部 `ENOTFOUND`，
  **本週一篇原文都沒讀到**。所有樣本數與效果量都來自搜尋摘要與索引頁。
  → ⚠️ 跟 11-06／11-07 那幾份「我逐頁讀了 PDF」的檔案**不是同一個證據等級**，引用時要分開看。
  → 要恢復讀原文，Owen 要在環境設定的 Network access 把學術站（至少 `files.eric.ed.gov`、`journals.sagepub.com`、
    `onlinelibrary.wiley.com`、`journals.plos.org`、`arxiv.org`、`tandfonline.com`）加進 Allowed domains。
- 🔴 有一條我**刻意沒用**：某摘要說 WCF「進階 g=.74 / 初學 g=.09」，查第二輪**找不到出處**，
  而且跟另一個摘要（低程度者獲益**最大**，g=0.982）方向相反 → ⛔ 兩邊都不當依據，只記在衝突欄。

---

## 1. 這週查到什麼

> 掃全景的問法：**「判斷一句法文對不對，全世界有哪些互相對立的裁判來源？」**
> 掃出四種：① 規則（課本／文法書）② 一個會給你答案的人（老師／同儕／AI）
> ③ 你自己的語感（＝自查，11-07 已查：純自查只少一成且不顯著）
> ④ ⭐ **真實語料裡的分布**——第四種在這個 repo 的 13 個家族裡**完全沒有**。本週主線就是它。

### 1A. 研究證據（有實證、有樣本數的）

#### ⭐⭐ ① 語料驅動學習（DDL）在寫作上的三個統合分析，效果量都很大——但設計越嚴格越小

| 來源 | 樣本 | 數字 |
|---|---|---|
| **Boulton & Cobb (2017)**, *Language Learning* 67(2), 348–393 | **64 個研究／88 個樣本**（從 205 篇候選篩出） | 實驗對照 **d = 0.95**、前後測 **d = 1.50**；⭐ **自製語料（tailor-made）效果大於公共語料**；混合組設計效果很小且 CI 跨 0 |
| **Ngo & Chen (2024)**, *Language Teaching Research* | **30 個研究／56 個效果量**（2000–2022），專做**寫作** | 整體 **g = 0.95**；顯著調節變項：語系、**程度**、教育階段、**時長**、語料類型、教學活動、**教師角色** |
| ⭐ **Liu & Ma (2025)**, *Educational Technology & Society* 28(2), 53–76，**專做低程度學習者** | **38 個研究／2,085 人**（37 個對照組效果量＋42 個前後測） | 對照組 **g = 0.71**、前後測 **g = 1.43**；⚠️ **時長不顯著** |

⚠️⚠️ **衝突要並陳**：有一篇 2026 年的再分析批評 Boulton & Cobb「把個別效果量直接平均」，
並指出**延後後測的組間效果只有 0.11**（而 Lee et al. 2019 的同一指標是 0.64）。
⚠️ 這篇的期刊地位我沒查清（`braindigitallearning.org`），⛔ 不當結論用，但它點的方向要記住：
**DDL 的「學完當下」很漂亮，「兩週後還記得」的證據弱得多。**

#### ⭐⭐ ② 低程度者的 DDL 有效，但**有效的四個條件裡有三個需要老師** — Liu & Ma (2025)

那篇 38 研究的統合分析列出讓低程度者受益的條件：
① **紙本 concordance**（不是讓他自己操作軟體）② **用母語**理解 concordance
③ **教師口頭引導／回饋** ④ **協作時的教師支援**（降低協作認知負荷）。

⛔ **③④ Owen 沒有，②可以有（中文），①可以有（預先做好的句子清單）。**
→ ⭐ 所以 DDL 要搬進這個系統，**必須先回答「誰當那個引導者」**。下面 ③ 就是那個答案的候選。

#### ⭐⭐ ③ 用 custom GPT 當「語料導覽員」——針對低程度者的直接嘗試 — Liu & Ma (2025), *CALL*

- *Computer Assisted Language Learning*，DOI 10.1080/09588221.2025.2539152。
- **N = 20**，中國某職業學院**低程度** L2 英語學習者；**組內比較**（同一批人做「有 GPT 鷹架」與「沒有」的 CBLP 課）。
- 鷹架依 van de Pol (2010) 分三種意圖：**語言的／後設語言的／認知的**。
- 結果：進步最大的是**用字（use）**，其次形式、再其次意義。
- ⚠️ 侷限：**20 人、個案研究、組內設計、英語為 L2**；兩個來源對設計的描述不一致（有一個寫成有對照組）。
- ⭐ 對 Owen 的意義：這正好是**他的處境的研究版**——沒有老師，但有一個可以被指定成「只負責導覽語料」的 AI。

#### ⭐⭐ ④ 法文側第一次有 DDL 的對照研究了 — Looi, Boulton, Hassan & Riget (2025)

- *International Journal of Applied Linguistics* 35(4), 2148–2171。
- 對象：**多語背景的法文（FLE）學習者**；標的是**法文形容詞的位置與配合**（⭐ 正好是 11-06 說的「B1/B2 的錯七成在名詞組」那一區）。
- 設計：混合方法，**前測／後測／延後後測**＋問卷＋焦點團體＋課堂錄音；DDL 材料由語料分析產生。
- ⭐ 結果：**短期跟傳統教學打平，長期保留 DDL 較好**，另外提高了「對語言漸層性與變異的覺察」、批判思考與自主性。
- ⚠️ 侷限：**參與者人數查不到**（摘要層級）；作者之一是 Boulton（同時是 2017 統合分析作者，⚠️ 不是獨立的第三方）。
- 📌 另有 Looi (2025) 的博士論文同題，⚠️ 未讀到。

#### ⑤ 法文的 DDL 實作研究規模都很小（FLEURON 系列）

- 平台：**FLEURON**（ATILF／Université de Lorraine），⭐ **免費**的多模態「口語法文」語料＋concordancier。
- 研究：M2 論文（Cousinard 2020）**8 位學習者**，標的是時間介系詞 `pendant`；
  *Action didactique* 的文章同樣是 **8 位 B1 學習者（3 組兩人）**；
  VALS/ASLA 2020 的觀察報告描述學習者「從真實出現的例子裡辨認形式、自己歸納用法」。
- ⚠️ **全部是 8 人級的探索性研究**，⛔ 不能拿來承諾效果。

#### ⭐⭐ ⑥ 語料最會修的是哪一類錯：**詞形 93.6%** — PLOS ONE (2025)

- *PLOS ONE*「The efficacy of the corpus-based error correction method on revision in writing classrooms」，PMID 40073029。
- **N = 123**，中國某大學**非英語主修**大學生，逐稿分析修訂。
- ⭐ **詞形（word form）錯用語料修訂的成功率 93.6%**；
  ⭐ 學習者**最常**去查 BAWE 語料的是**搭配與片語錯（62.7%）**。
- ⚠️ 侷限：英語、課堂內、有老師在場、無法區分「語料的功勞」與「被標出錯誤本身的功勞」。
- ⭐⭐ **這條跟這個 repo 自己的 `SOLO_B` 0.2 節接起來就是本週最重要的推論**：
  Ferris 的 **untreatable 類**（用字、搭配、慣用介系詞、句構）被定義成「**沒有規則可查**」，
  而 DDL 的回答是：**查不到規則，但查得到分布。**
  → ⭐ **DDL 是目前唯一一個正面攻擊 untreatable 那一類的方法**，而那一類正是自我改對率最低的（句構 47%）。

#### ⚠️ ⑦ 反方：DDL 對低程度者的認知負荷是真的

- 2025 年 ESP 搭配詞研究（*Educational Research*／Springer）：新手面對大量不熟悉的資料會**超載**——
  **內在負荷**來自語言輸入本身的複雜度、**外在負荷**來自不熟悉 concordance 工具與**被截斷的句子**。
- Boulton & Cobb 自己就記過：中級受試者抱怨 **concordance 輸出的句子被切斷**，整體分數很低，
  他們當時傾向「DDL 可能更適合進階者」，⛔ 但明確反對「因此不讓低程度者接觸語料」。
- Lin (2021), *SAGE Open*：低程度者要同時應付語言與電子語料工具，軟體本身就是負擔；
  ⚠️ 但他的結論是初階文法學習者**也能**受益。
- Boulton 早期研究：**N = 113** 中低程度英語學習者直接看生 concordance 學片語動詞 → 有潛力。
- 理論面：**expertise reversal effect**（知識少的人需要**更多**引導，不是更少）。
- ⭐ 綜合讀法：⛔ 不是「A2 不能做 DDL」，是「**A2 的 DDL 必須被預先處理過**」——
  預選例句、整句不截斷、中文輔助、每次只查幾個點。

#### ⭐ ⑧ 2026 年的主流立場：AI 不是取代 concordancer，是**被語料綁住的那個解釋者**

- *CALL* 2026 社論「Corpus-based language pedagogy in the AI era」（DOI 10.1080/09588221.2026.2727244）。
- 同系列 Springer 專書的章節講得最直接：從「靜態 concordance 行」轉向「AI 驅動的互動對話」，
  ⭐ 但核心原則不變——**學生必須把 AI 給的任何解釋錨定在真實語料證據上**，
  「AI 回饋要引用語料支持的 pattern，並促使學習者把建議拿去跟 concordance 行比對」。
- *Language Teaching*（Cambridge）的研究議程也提到：生成式 AI 可以**當 concordancer 用來查它自己生成的語言**。
- ⭐ 一個已經做成課堂的版本：*CALL* 2025 的 AI＋CBLP 整合研究（**50 位** EFL 學習者）——
  ⭐ **語料被用來修搭配、AI 被用來改句子**。⚠️ 那是使用行為的描述，⛔ 不是準確度比較。
- ⛔ **查無**任何「語料 vs ChatGPT 誰修得比較對」的頭對頭對照實驗（本週第二次查仍無）。

#### ⭐ ⑨ 回饋的新數字：給太多沒人看、看了也改不對

- ⭐⭐ **Coyne 等（arXiv 2607.14591，Springer AIED 專書章節）**：大學 EFL 課，**20,000+ 份草稿**。
  - 老師用評分表評 AI 回饋的品質：平均 **4–5 分（滿分 5）**。
  - ⭐⭐ **但 49.76% 的學生從來沒打開過文法回饋那一頁**；打開的人平均看 **20.4 條**。
  - 結論：**專家評分與學生感受對不上**，專家評分不能代表「這回饋好用」。
- ChatGPT WCF 個案研究（*Humanit Soc Sci Commun* 2024）：**每題拿到 22 條以上回饋**的學生，
  改對率掉到約 **60%**。⚠️ 混合方法個案研究、樣本極小。
- 人 vs ChatGPT 的縱時比較（*AJAL* 2026）：人的回饋**更豐富、更看情境**；
  ⭐ **ChatGPT 的回饋比較一律、而且集中在表層**。
  → ⭐ 這是**獨立**支持 W39 那條 Scherer 警告（只給表層 → FL 深層 −0.23）的第二個來源。
- AI vs 老師回饋的修訂次數：**1.74 次／篇 vs 1.04 次／篇**（AI 較多）；
  但另一個比較說兩組**寫作分數的進步沒有顯著差異**。

#### ⑩ WCF 統合分析的最新一棒（W39 沒有這一篇）

- **Brown, Liu & Norouzian (2026)**, *Language Teaching Research* 30(3), 1357–1389，**貝氏統合分析**。
  ⭐ 賣點是**第一次在統合分析層級區分短期／中期／長期效果**。
  ⚠️ **效果量與納入篇數本週查不到**（只讀到被引用時的描述「穩健、中等」）。
  📌 下一輪寫作要補讀這一篇，它可能直接改寫 H 家族的時間參數。
- ⚠️ **數字衝突（新發現）**：repo 現在記 Kang & Han (2015) 是 **g = 0.54**，
  但本週多個二手摘要寫 **d = 0.68**。⛔ 兩個都沒讀到原文 → **保留 repo 現值、把衝突記在這裡**，不要改 METHOD_MAP。
- Mohsen (2022) 電腦中介糾錯統合分析：14 篇、**d = 1.21**，⚠️ 但**自動寫作評分工具的效果小於其他電腦回饋**。

#### ⚠️ ⑪ 法文的 LLM 判斷會被「沒打重音」晃動 — 直接打到 11-08 那份

- **arXiv 2610.33493「Small Edits, Shifting Decisions」**：專門測 LLM 對**法文輸入變異**的穩定度——
  **省略撇號、拿掉變音符號（重音）、鍵盤打錯** → 模型的判斷會偏移。
- ⭐⭐ **跟 11-08 的結論連起來**：那份說「練習時要跟考場一樣關掉自動校正、重音要練到手自己會打」。
  本週補上後果：**你沒打重音，不只是扣分，還會讓替你批改的 AI 變得更不可靠**——
  ⭐ 批改品質會跟著他的打字習慣一起退化。
- 旁證：**COLE（2025）** 法文理解評測（23 個任務、95 個 LLM）裡的文法部分是**可接受性判斷**
  （MultiBLiMP-Fr／**QFrBLiMP／QFrCoLA ＝魁北克法文**的最小對比對），⛔ **不是學習者作文的糾錯**。
- ⛔ **W39 的「法文 GEC 評測是空的」本週仍然成立**：MultiGEC-2025 的語言清單裡還是沒有法文，
  查無任何以**法文學習者作文**為基礎的 GEC 評測。⭐ 但魁北克法文的**可接受性**資料集是新的一塊可用素材。

### 1B. 社群做法（🟡 個人經驗、工具說明、備考站，⛔ 全部沒有對照組）

#### 🟡 ⓐ 「查分布」在社群裡早就是標準動作，只是沒人叫它 DDL

- 教學部落格的共識做法：**Reverso Context** 用來確認「母語者是不是真的這樣講」（可查多詞片語）；
  **Linguee** 查正式／技術用法（⚠️ 語料偏 EU 公文與企業文件，體裁會歪）。
- ⭐ 方法學上的三條提醒（跟學術那邊一致）：
  ① 例句本身可能是**翻譯出來的法文**，語域要自己判斷
  ② 工具只會給你**別人真的寫過的句子**，⛔ 它不會替你造句
  ③ ⭐⭐ **查不到 ≠ 錯**（語料沒有收到而已）。
- ⭐⭐ **加拿大法文專用的免費工具（對 TCF Canada 特別對味）**：
  **Le Migou**（加拿大法文單語 concordancer，免費但要註冊）、
  **TradooIT**（免費雙語 concordancer，**8.5 億詞**）。
  一般用途：**Lextutor** 的 concordancer 免費、免註冊、**支援法文**。
- ⚠️ 全部是工具說明與 vendor／部落格頁，⛔ 沒有一個是研究。

#### 🟡 ⓑ r/WriteStreak（français）：每天寫＋被改＋**把錯誤記成卡片**

- 鏡像站資料：約 **4.1k** 成員，宗旨是「每天用法文寫、拿到品質好的訂正」。
- ⭐ 其中一位使用者的流程值得抄：**把每一個被訂正的錯誤記進 Anki，每天複習那些卡**。
  → 這就是 W39 說的「錯誤類型剖面」的手工版，⛔ 而系統目前仍然沒有這一層。
- ⚠️ 鏡像快照約 1,775 天前，現行規則未確認；⚠️ 本週 Reddit 仍然幾乎搜不到（第三週同樣情形）。

#### 🟡 ⓒ 備考站本週新抄到的幾條（與 repo 現值對照）

- 字數：**T1 60–120／T2 120–150／T3 120–180** → ✅ **跟 `tcf_writing.html` 的 `SPEC` 完全一致**，不用改。
- 時間：有站寫 **T1 12 分／T2 18 分／T3 28 分（＋2 分緩衝）**，也有站說 T1 不要超過 10 分鐘。
  ⚠️ 跟 repo 現值（T1 10–15／T2 20–25／T3 20–25）不一致，🔴 **兩邊都是備考站互抄，⛔ 不要據此改系統**。
- T3：**改寫文件會加分、照抄句子會扣分**（⭐ 跟 11-05 查到的官方七條自動不及格第五條同向）。
- 一致建議：「每週三題都寫、照真實時間、**找熟 TCF 評分表的老師改**」
  → ⛔ 最後那半句 Owen 沒有，⭐ 這正是本週要補的那個洞。

#### 🟡 ⓓ 名詞性別：社群共識是「名詞永遠連冠詞一起學」

- 多個教學站一致：⛔ 不要單獨記名詞，要記 `un/une` 或 `le/la` 版本；字尾規則當**猜**的起點（`-tion` 陰、`-ment` 陽）。
  ⚠️ 有站聲稱字尾規則準 **70–90%**，⛔ **沒有出處**，不要引用這個數字。
- ⛔ **查無**任何研究比較「用語料裡 `le X` vs `la X` 的出現次數來確認性別」這個做法的效果。
  → ⭐ 所以下面第 3 節裡那一條是**我的推論**，不是證據（但它便宜、可驗證，見第 5 節實驗）。

---

## 2. 家族歸類

### 2.1 本週每條發現落在哪個家族

| # | 發現 | 家族 |
|---|---|---|
| ① | DDL 三個統合分析（寫作 g=0.95／低程度 g=0.71） | ⭐ **N（新）** |
| ② | 低程度者有效的四個條件（三個要老師） | **N**＋F（鷹架＝維持得下去的條件） |
| ③ | custom GPT 當語料導覽員（N=20） | **N × D**（AI 不當答案源，當導覽員） |
| ④ | 法文形容詞 DDL：短期打平、長期較好 | **N**（⭐ 法文側第一條） |
| ⑤ | FLEURON 8 人級研究 | **N**（⚠️ 證據薄） |
| ⑥ | 詞形 93.6%、搭配 62.7% | **N × H**（語料當修訂輪的答案驗證層） |
| ⑦ | 認知負荷／expertise reversal | **N 的邊界**（⚠️ A2 風險） |
| ⑧ | AI 要被語料綁住 | **N × D** |
| ⑨ | 49.76% 從來沒打開回饋 | ⭐ **F**（不是品質問題，是到不到得了他眼前） |
| ⑩ | 貝氏 WCF 統合分析、Mohsen d=1.21 | **H**（更新，不改現值） |
| ⑪ | 沒打重音會晃動 LLM 判斷 | **H 的前置條件**（回饋品質取決於輸入乾淨度） |
| ⓐ–ⓓ | 社群工具與做法 | **N**（ⓐ）、**H**（ⓑ 錯誤卡片）、C／I（ⓒ 備考策略）、A（ⓓ 連冠詞一起記） |

### 2.2 ⭐⭐ 找到地圖上沒有的家族：**N 用法查證／語料驅動（DDL）**

**它跟現有十三個的差別在「誰當裁判」**：

| 家族 | 「這樣寫對不對」由誰回答 |
|---|---|
| A 刻意練習 | 規則（你已經知道答案，只是還不夠快） |
| D AI 對手 | ⚠️ 一個會**編**答案的對話者 |
| E 挖句子 | 你**碰到**的那一句（被動撿到的） |
| H 修訂循環 | 一個外部回饋源說「這裡有東西」，**但答案還是得有人給** |
| 自查（11-07） | 你自己的語感（⛔ 純自查只少一成、不顯著） |
| ⭐ **N 語料驅動** | **真實語料裡的分布**——它不編，但它會沉默（查不到 ≠ 錯） |

⭐ **它補的正好是 W39 自己留下的那個洞**：W39 的結論是
「**只信 AI 的『這裡怪』，不信它的答案**」——那時候沒說**答案要去哪裡拿**。
N 就是那個答案源，而且它**結構上不會幻覺**（它只能給你別人真的寫過的句子）。

⭐⭐ **而且它是唯一攻擊 untreatable 錯誤的家族**（見 1A ⑥）：
搭配、用字、慣用介系詞這些「沒有規則可查」的錯，自我改對率最低（句構 47%），
A／H 都處理不了（A 要有規則可練、H 要有人給答案），N 可以。

→ ✅ **已補進 `METHOD_MAP.md` 第 N 節**（家族數 13 → 14）。

### 2.3 ⚠️ 本週掃到但**刻意不另立家族**的四個，理由寫下來

1. **自動寫作評分（AWE／FIDELIA 這一類）** → 歸 **D＋H**。
   它是**工具**不是槓桿（Mohsen 2022 的統合分析裡它甚至是效果較小的那一格）。11-05 已查過。
2. **體裁教學（genre／雪梨學派）** → **維持 W39 的判定**（歸 C）。
   本週掃到的新東西只有備考站的「T3 改寫優於照抄」，⛔ 不足以翻案。
3. **計時速寫／寫作流暢度（freewriting、quick write）** → 歸 **A（流暢層）**。
   `SOLO_B` B8 已經收過，本週沒有新證據。
4. **打字 vs 手寫（轉錄執行層）** → ⛔ 不是槓桿，是**條件**（同 W42 對「媒介效應」的判定）。
   11-08 已查完，本週只補上「沒打重音會讓 AI 批改變差」這條**後果**。

### 2.4 ⚠️ N 家族自己帶著一個未解的矛盾

Liu & Ma (2025) 說低程度者要**紙本 concordance**才有效；
但 Owen 的語料在 `chunks.js`／`french_notes.html` 裡，**只能在螢幕上查**。
⚠️ 而 W42 查到的媒介效應說「**說明文＋螢幕＋限時 ＝ 最糟的三件事湊在一起**」。
→ ⭐ 折衷讀法：「紙本」在那篇研究裡真正的作用應該是**預先選過、整句、不截斷、不用操作軟體**，
  而不是「紙」這個材質本身。⚠️ **這是我的推論，不是結論**，⛔ 不要寫進系統文字當依據。

---

## 3. 可以直接抄的實作參數

| 參數 | 數值 | 依據 | 等級 |
|---|---|---|---|
| **一次查幾個懷疑點** | **2–3 個**，每個約 2 分鐘 | 低程度者的認知負荷證據＋「22 條以上回饋 → 改對率掉到 60%」 | 🟢＋推論 |
| **例句怎麼呈現** | ⭐ **整句、不截斷**，⛔ 不用 KWIC 截斷行 | Boulton & Cobb 受試者抱怨 cut-off sentences；Liu & Ma 2025「紙本」調節 | 🟢 |
| **要不要中文** | ⭐ **要**（用中文寫判斷與結論） | Liu & Ma 2025：用 L1 是低程度者有效的四條件之一 | 🟢 |
| **先查哪個語料** | ⭐ **先查自己的課本語料**（`chunks.js` 3,762 筆／`sentences.js`／`french_notes.html`），查不到再查外部 | Boulton & Cobb 2017：**自製語料效果大於公共語料** | 🟢 |
| **外部語料選哪個** | 加拿大法文：**Le Migou**／**TradooIT**（8.5 億詞）；日常用法：**Reverso Context**；法文 concordancer：**Lextutor**；口語法文：**FLEURON**。⛔ Linguee 只在正式文體用 | 🟡 工具說明 | 🟡 |
| **哪些錯送去查語料** | ⭐ **詞形、搭配與片語、動詞＋介系詞、名詞性別** | PLOS ONE 2025（N=123）：詞形修訂 93.6%、搭配是學習者最常查的（62.7%） | 🟢 |
| **哪些錯⛔ 不要送語料** | 任務完成度、連貫、語域、字數 | 語料裡沒有這些資訊（推論） | 推論 |
| **AI 的角色** | ⭐ **只標「這裡怪」＋提候選寫法；答案一律要語料背書** | CALL 2026 社論與專書：AI 的解釋必須錨定在語料證據上 | 🟢 |
| **「查不到」怎麼解讀** | ⭐ **查不到 ≠ 錯**（換個說法再查一次，仍查不到就標「不確定」存著） | 工具說明一致 | 🟡 |
| **期待值** | ⛔ 不要期待「學完當下」那種效果量；**延後後測可能只有 0.11** | 2026 再分析（⚠️ 期刊地位不明） | ⚠️ |
| **回饋量上限** | **一次 ≤ 一位數個點**；⭐ 現在 prompt 的「最該修的兩個錯」**已經符合**，不要加多 | 20,000 草稿研究（平均看 20.4 條）＋22 條 → 60% | 🟢 |
| **寫作時的輸入衛生** | ⭐ **重音一定要打**（不只為了分數，也為了讓 AI 批改可靠） | arXiv 2610.33493 法文輸入變異；11-08 | 🟢 |

---

## 4. 跟現有系統的缺口對照

**本週實際讀過的檔**：`writing.html`（462 行）、`tcf_writing.html`（547 行）、`writing_tasks.js`、
`tcf_writing_sujets.js`、`dashboard.html`、`chunks.js`、`sentences.js`、`METHOD_MAP.md`、`HANDOFF.md`（尾段）。

### ⭐⭐ 缺口 1（本週新發現）：**語料已經在 repo 裡了，但沒有任何地方可以查它**

- `chunks.js` **3,762 筆**（`"fr"` 欄位計數）、`sentences.js`、`french_notes.html`（19,000+ 行）＋ `tcf_writing_sujets.js`（2,128 行真題）。
  ⭐ 這就是 Boulton & Cobb 說的**自製語料（tailor-made）**，而且文獻說它**效果大於公共語料**。
- ⛔ **全站沒有任何一個「輸入一個法文字 → 列出我學過的所有例句」的介面。**
  `grep` 過全部 `.html`：只有 `qnoteTxt`（問題筆記的 textarea）和課文裡的 `faire des recherches` 這個詞條，
  沒有任何搜尋框。⇒ **N 家族這一格是 0%，但素材已經 100% 備好了。**
- ⭐ 這是本週唯一一個「**不用新增任何教材、不違反鐵律 1、不用 Claude 造句**」就能補的缺口——
  查出來的每一句都是他自己課本裡的句子。

### ⭐⭐ 缺口 2：`buildPrompt()` 現在**直接要答案**，跟 W39 的結論相反

`tcf_writing.html:409–452` 的回覆格式要求：
`最該修的兩個錯：（各附正確寫法）` ＋ `重寫示範：（只重寫最差的一句）`。

- ✅ **做對的部分**：**只要兩個錯**——正好符合本週「回饋給多了沒人看、看了也改不對」的證據。
- ⛔ **跟 W39 衝突的部分**：W39 的結論是「只信它的『這裡怪』」，但現在的 prompt 是**直接拿它的答案**，
  而本週 *AJAL* 2026 又獨立證實 **ChatGPT 的回饋偏一律、偏表層**。
- ⚠️ **仍未落實的 W39 項目**：Scherer 2024 的「表層＋深層**併用**」那一行還是沒進 prompt
  （現在的三面向是官方評分面向，不是「深層回饋」）。
- 📌 另外 `⛔ 先檢查四條自動不及格` 這一行**仍然是四條**，而 11-05（R86）已查明 2026-04 版手冊是**七條**。
  ⚠️ 這是 11-05 就指出、至今未修的既有項，⛔ 本週不改程式（動作邊界），只記錄。

### 缺口 3：W39 的七個缺口，兩個月後現狀

| W39 缺口 | 現在 |
|---|---|
| 1 **沒有「重寫」那一步**（H 家族 0%） | ⛔ **仍然 0**（`grep 重寫|第二稿|改一遍` 只命中 prompt 裡的「重寫示範」） |
| 2 批改 prompt 幾乎純表層 | ⛔ 仍然如此（見缺口 2） |
| 3 `clb7_tcf_writing` dashboard 讀不到 | ⛔ **仍然讀不到**：`dashboard.html:536` 只有**導覽連結**，資料面只讀 `clb7_writing`（`:900`） |
| 4 沒有錯誤類型累積剖面 | ⛔ 仍然沒有（⭐ 而社群的做法就是把錯誤記成 Anki 卡，見 1B ⓑ） |
| 5 沒有計時 | ⛔ 仍然沒有（⚠️ 跨技能第五次） |
| 6 沒有規劃步驟 | ⛔ 仍然沒有 |
| 7 兩個寫作頁沒有「⭐ 跳過」三層出口 | ⛔ **仍然 0**（`grep -c 跳過 writing.html tcf_writing.html` → `0` `0`）⚠️ 違反練習頁鐵律 |

### ⭐ 缺口 4（本週新發現的風險）：**回饋存了沒被打開，這件事有數字了**

20,000 份草稿的研究裡 **49.76% 的學生從來沒打開文法回饋那一頁**。
而這個系統的形狀更危險：`tcf_writing.html` 把批改結果存進 `clb7_tcf_writing`，
**dashboard 不讀它、沒有任何地方把「你上次被指出的錯」再拿出來**。
⇒ ⭐ **這不是「回饋品質」問題，是 F 家族（到不到得了他眼前）問題**，
而 F 在 W41 已經從配菜升成主要調節變項（Chang 2024：聽力教學只有**時長**顯著）。

---

## 5. 一個 15 分鐘就能試的實驗（明天就能做，⛔ 不用等我改程式）

### 🧪 「三個問號」——先押注，再查證

**為什麼是這個實驗**：11-07 已經證明「純自查」沒用（只少一成、不顯著），
而「指定看一類」才有用。本實驗把「指定」做到最細：**只處理他自己標出來的三個懷疑點**，
而且 ⭐ **先押注再查**（repo 自己 2026-09-18 查過：賭注式評分會改善元認知準確度）。

**材料**：他**最近寫過的任何一段法文**（`tcf_writing.html` 的歷史、或今天寫的 5 句話）。⛔ 不要為這個實驗另寫一篇。

**步驟（總共 15 分鐘）**

| 分鐘 | 動作 |
|---|---|
| 0–3 | 重讀自己那段，⭐ **標出三個「我不確定」的地方**（只標三個，不夠就停在兩個）。⛔ 這一步不准問 AI |
| 3–5 | 每一個都先**押注**：寫下「我猜 ✅ 對 / ❌ 錯 / 🤷 不知道」，再寫一句**理由** |
| 5–11 | 每個點查兩層：① ⭐ **先查自己的課本**（在 `french_notes.html` 用瀏覽器 Ctrl+F 查關鍵詞）② 查不到才查外部（Reverso Context／Le Migou），⭐ **只看整句的例子** |
| 11–14 | 每個點寫下**判決**：✅ 課本裡就有（我學過）／🔶 課本沒有但語料有（真實但沒學過）／❓ 兩邊都查不到（⛔ 不等於錯，標不確定）／❌ 語料顯示另一種寫法才常見 |
| 14–15 | 記三個數字：**押對幾個 / 3**、**課本裡就查到幾個 / 3**、**花最久的是哪一個點** |

### ⭐⭐ 怎麼讀這三個數字（這才是實驗的重點，不是「改對幾句」）

| 結果 | 診斷 | 依 `CLAUDE.md` 教學鐵律該做什麼 |
|---|---|---|
| **課本裡就查到 ≥ 2/3** | ✂️ **自動化缺口**——他學過，只是產出時調不出來 | ⭐ 給壓縮練習（同結構連發 5–8 個），⛔ **不要重講規則** |
| **課本查不到 ≥ 2/3** | 🧠 **概念／詞彙缺口**——這些東西他真的沒學過 | 補那個結構，⛔ 不要罵他「忘了」 |
| **押注對 ≤ 1/3** | ⚠️ **校準問題**（自評 r ≈ .46 的現場版）——他的「我覺得這樣對」資訊量低 | ⭐ 那就**不能**靠自查，必須有外部標記（這是 H 家族成立的前提） |
| **三個問號裡沒有一個是搭配／用字** | ⚠️ 他只敢懷疑文法（treatable 那一類） | ⭐ 下次指定「至少一個要是**用字或搭配**」——那是改對率最低的一類 |

⭐ **跑 3 次就有資料**（`2026-09-20_單一受試者設計最少資料點與效果量.md` 那份的下限）。
⛔ **不要為這個實驗先做功能**；要等這三個數字出來，才知道要不要做查詢介面。

---

## 6. 🎮 怎麼讓它更好玩

> 鐵律：好玩不是裝飾（FLE 是口說進步的唯一正向預測因子、無聊會扣分）。
> 而本週多了一個硬數字支持這一節：**49.76% 的人從來沒打開過回饋頁**——⭐ 回饋好不好看，決定它存不存在。

### ⭐⭐ 做法一：「分布對決」——兩句都是真的，猜哪一句比較常見

**玩法**：從**他自己的語料**抽兩個真實寫法（例如 `chunks.js` 裡同時出現的 `aller à la plage` 與 `aller à la mer`），
問：**哪一個在我的課本裡出現得多？** 猜完揭曉次數與出處課次。

- ⭐ **為什麼是「哪個常見」而不是「哪個對」**：兩邊都是真的法文 → ⛔ **不會違反鐵律 1**（不需要 Claude 造假句當干擾項），
  而且學到的東西正好是 DDL 的核心（**分布**，不是對錯）。
- ⭐ 它把 N 家族最枯燥的動作（看 concordance）變成一個**兩選一、2 秒就能押的動作**。
- ⭐ 資料零成本：答案由 `chunks.js`／`sentences.js` 的出現次數直接算出來，⛔ 不用人工建題。

### ⭐ 做法二：「三個問號」做成牌 — 押注 → 開牌 → 蓋章

把第 5 節的實驗直接做成三張牌：**① 嫌疑句 ② 你的押注 ③ 證據（課本第幾課有／語料有幾筆）**。
- 押對了亮一個章；**押錯但查清楚了也亮章**（⭐ 查清楚才是目標，⛔ 不是猜對）。
- ⭐ 配 repo 已有的賭注式評分研究（2026-09-18），這是**元認知校準**本身變成玩法。
- ⛔ **措辭中性**：押錯不是失敗（灰色），⛔ 不准出現「你又猜錯了」。

### 做法三：查證過的點，變成遊戲的燃料（⭐ 這是交付鐵律要求的「大腦檢查」）

> 鐵律：新功能先問「**這功能的資料能進遊戲嗎**」。

- **能**。每個查證過的點產生一筆：`{ 詞或結構, 判決, 來源課次, 日期 }`。
  - **判決 = ✅ 課本裡就有** → ⭐ 那一課的卡片／格子**降低出現頻率**（他其實會，只是慢）
  - **判決 = 🔶 課本沒有但語料有** → ⭐ 丟進「真實但沒學過」清單，⚠️ **只當出題線索，⛔ 不自動變成教材**（鐵律 1：要 Owen 或課本點頭）
  - **判決 = ❌ 語料顯示另一種寫法常見** → ⭐ 進錯題本，而且是**最值錢的那一類**（untreatable 類，自己最抓不到）
- ⭐ 存法照慣例：`clb7_*_known` 的物件形狀＋`last` 欄位，配合 `sync_supabase.js` 的物件合併。
- ⭐ 新頁面／新步驟一律照 **`table_drill.html`** 的三層出口（格／整題 ⏭／今天跳過），
  ⛔ 跳過不計分、不進複習輪、重來時保持跳過、badge 用灰色。

### ⚠️ 但本週**不建議**先做頁面

第 5 節的實驗**不需要任何程式**（瀏覽器 Ctrl+F ＋ Reverso 就能跑），
而 Liu & Ma (2025) 那四個「讓低程度者受益」的條件有三個是**人的引導**——
⭐ **先用三次實驗確認「他查得動」，再決定要不要做查詢介面。** ⛔ 不要先蓋房子。

---

## 7. 來源清單

### 研究（🟢 ⚠️ **全部為檢索摘要層級，本週一篇原文都沒讀到**）

**N 家族（DDL／語料驅動）**
- Boulton, A. & Cobb, T. (2017). Corpus Use in Language Learning: A Meta-Analysis. *Language Learning* 67(2), 348–393（64 研究／88 樣本；d=0.95 組間、1.50 前後測）：https://onlinelibrary.wiley.com/doi/abs/10.1111/lang.12224 ／ https://eric.ed.gov/?id=EJ1142085
- Ngo, T. T.-N. & Chen, H. H.-J. (2024). The effectiveness of corpus use in ESL/EFL writing: A meta-analysis. *Language Teaching Research*（30 研究／56 效果量；g=0.95）：https://journals.sagepub.com/doi/abs/10.1177/13621688241260183
- ⭐ Liu, J. & Ma, Q. (2025). Examining CBLP practices in DDL for low-proficiency L2 English learners: A meta-analysis. *Educational Technology & Society* 28(2), 53–76（38 研究／2,085 人；g=0.71 組間、1.43 前後測）：https://eric.ed.gov/?id=EJ1469778 ／ https://repository.eduhk.hk/en/publications/examining-corpus-based-language-pedagogy-cblp-practices-in-data-d/
- Lee, H., Warschauer, M. & Lee, J. H. (2019). 語料使用對 L2 詞彙的多層次統合分析（延後後測組間 0.64，被 2026 再分析引用）：https://www.researchgate.net/publication/325824490_The_Effects_of_Corpus_Use_on_Second_Language_Vocabulary_Learning_A_Multilevel_Meta-analysis
- ⚠️ 對立面（期刊地位不明）：2026 年再分析批評 Boulton & Cobb 的平均法、指出延後後測組間僅 **0.11**：https://www.braindigitallearning.org/wp-content/uploads/2026/09/BDL-1402-10.pdf
- ⭐ **法文**：Looi, J., Boulton, A., Hassan, H. & Riget, P. N. (2025). Data-Driven Learning: A Linguistically Authentic Complement to Coursebooks for Foreign Language Learners. *International Journal of Applied Linguistics* 35(4), 2148–2171（法文形容詞位置；短期打平、長期較好）：https://onlinelibrary.wiley.com/doi/10.1111/ijal.12753
- **法文**／FLEURON（8 人級探索研究）：Cousinard (2020) M2 論文 https://projet-fleuron.atilf.fr/wp-content/uploads/2022/08/Memoire-M2-FLE_COUSINARD-Clara_2020.pdf ／ https://hal.univ-lorraine.fr/hal-03880701 ／ https://hal.science/hal-02479971v1
- ⭐ 錯誤類型：The efficacy of the corpus-based error correction method on revision in writing classrooms. *PLOS ONE* (2025)，N=123（詞形 93.6%、搭配 62.7%）：https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0317574 ／ https://pubmed.ncbi.nlm.nih.gov/40073029/
- ⭐ Liu, J. & Ma, Q. (2025). Supporting low-proficiency L2 learners' vocabulary learning with custom GPT-scaffolded CBLP: a case study. *CALL*（N=20，組內）：https://www.tandfonline.com/doi/full/10.1080/09588221.2025.2539152 ／ 會議版 https://www.castledown.com/proceedings/call-research/article/view/97817637116240-11
- AI＋CBLP 整合（50 位學習者：語料修搭配、AI 改句子）：https://www.tandfonline.com/doi/full/10.1080/09588221.2025.2539160
- ⭐ 立場：Corpus-based language pedagogy in the AI era（2026 社論，*CALL*）：https://www.tandfonline.com/doi/full/10.1080/09588221.2026.2727244 ／ 專書章節（AI 解釋必須錨定語料）https://link.springer.com/chapter/10.1007/978-981-92-2716-7_8 ／ https://link.springer.com/chapter/10.1007/978-981-92-2716-7_7 ／ https://link.springer.com/chapter/10.1007/978-981-92-2716-7_3
- 研究議程：Corpus linguistics for language teaching and learning: A research agenda（*Language Teaching*, Cambridge）：https://www.cambridge.org/core/journals/language-teaching/article/corpus-linguistics-for-language-teaching-and-learning-a-research-agenda/CABC78CDD77B7799BE293F7F66A48352
- ⚠️ 反方／邊界：DDL 與低程度者的認知負荷（ESP 搭配詞，2025）https://link.springer.com/article/10.1007/s44217-025-01048-7 ／ Lin, M.-H. (2021), *SAGE Open* https://journals.sagepub.com/doi/full/10.1177/21582440211029936 ／ Boulton 低程度者實證（N=113）https://www.researchgate.net/publication/29598960_Looking_for_empirical_evidence_of_data-driven_learning_at_lower_levels ／ https://www.researchgate.net/publication/29598959_Testing_the_limits_of_data-driven_learning_Language_proficiency_and_training ／ 理論：expertise reversal effect https://en.wikipedia.org/wiki/Expertise_reversal_effect

**H 家族更新與回饋量**
- ⭐ Brown, D. M., Liu, Q. & Norouzian, R. (2026). Effectiveness of written corrective feedback in developing L2 accuracy: A Bayesian meta-analysis. *Language Teaching Research* 30(3), 1357–1389（⚠️ 效果量未讀到）：https://journals.sagepub.com/doi/abs/10.1177/13621688221147374
- Mohsen, M. A. (2022). Computer-Mediated Corrective Feedback to Improve L2 Writing Skills: A Meta-Analysis（14 篇，d=1.21；AWE 較小）：https://dx.doi.org/10.1177/07356331211064066
- ⚠️ 數字衝突：Kang & Han (2015) 被二手引為 **d=0.68**（repo 現記 g=0.54）：https://onlinelibrary.wiley.com/doi/abs/10.1111/modl.12189 ／ https://tesl-ej.org/wordpress/issues/volume24/ej95/ej95a3/
- ⭐⭐ Coyne 等，AI 回饋橫跨 20,000+ 份 EFL 草稿（老師評 4–5／5，**49.76% 從未打開**、平均看 20.4 條）：https://arxiv.org/abs/2607.14591 ／ https://link.springer.com/chapter/10.1007/978-3-032-29788-4_35
- ChatGPT WCF 個案（>22 條 → 改對率約 60%），*Humanities & Social Sciences Communications* 2024：https://www.nature.com/articles/s41599-024-03543-y
- 人 vs ChatGPT 回饋的縱時比較（ChatGPT 偏一律、偏表層），*AJAL* 2026：https://www.castledown.com/journals/ajal/article/view/ajal.2026.103200
- AI 與老師回饋的修訂次數（1.74 vs 1.04／篇）：https://www.researchgate.net/publication/388972242_Enhancing_EFL_Writing_Revision_Practices_The_Impact_of_AI-_and_Teacher-Generated_Feedback_and_Their_Sequences

**法文側的 AI 能力邊界**
- ⭐ Small Edits, Shifting Decisions: Benchmarking LLM Accuracy and Reliability on French Input Variants（省撇號／拿掉重音／打錯字 → 判斷偏移）：https://arxiv.org/abs/2610.33493
- COLE: a Comprehensive Benchmark for French Language Understanding Evaluation（23 任務／95 個 LLM；QFrBLiMP／QFrCoLA ＝**魁北克法文**可接受性）：https://arxiv.org/pdf/2510.05046
- ⛔ 仍然查無：以**法文學習者作文**為基礎的 GEC 評測（W39 的結論本週未翻案）

### 實務／社群（🟡 無對照組）

- 用語料查「母語者是不是真的這樣講」的方法說明：https://languavibe.com/language-corpora
- Reverso Context／Linguee 的定位與侷限：https://www.languagenext.com/blog/french-dictionaries-translators/ ／ https://frenchtoenglish.com/best-french-to-english-dictionary-online-complete-guide/ ／ https://en.wikipedia.org/wiki/Reverso_(language_tools)
- ⭐ 加拿大法文 concordancer（**Le Migou** 免費需註冊、**TradooIT** 8.5 億詞雙語）：https://ecampusontario.pressbooks.pub/translatingforcanada/chapter/bilingual-concordancers/
- 免費 concordancer 盤點（**Lextutor** 支援法文、CorpusEye、Chambers-Rostand 法文報刊語料）：https://www.eapfoundation.com/news/reviews/concordancers/
- r/WriteStreak（français）：每天寫＋訂正，約 4.1k 成員；⭐ 有人把每個錯誤記進 Anki：https://reddit.artemislena.eu/r/writeStreak
- TCF Canada 寫作備考站（字數 ✅ 與 repo 一致；時間 🔴 彼此不一致；T3 改寫 vs 照抄）：https://www.tcfca.com/se-preparer/tcf-canada-expression-ecrite/ ／ https://www.flexilingo.com/fr/blog/tcf-canada-expression-ecrite-taches ／ https://www.languagenext.com/blog/tcf-canada-writing/ ／ https://www.tcfenligne.com/tcf-canada-expression-ecrite/
- 名詞性別：社群共識「連冠詞一起學」；⚠️ 字尾規則「70–90% 準」⛔ 無出處：https://lexi-nest.com/blog/le-or-la-french-noun-gender/ ／ https://lilata.com/en/blog/french-noun-gender/

### 🔴 待驗證（⛔ 用前必須對官方，⛔ 不要寫進系統文字）

- 備考站的單題時間（T1 12／T2 18／T3 28 分 ＋2 分緩衝）——與 repo 現值不一致，兩邊都是備考站
- 字尾規則猜性別的準確率 70–90%
- Brown 等 (2026) 貝氏統合分析的效果量與納入篇數
- Kang & Han (2015) 到底是 g=0.54 還是 d=0.68
- `tcf_writing.html` prompt 裡的「四條自動不及格」→ 11-05 查到官方 2026-04 版是七條（既有未修項）

---

## 8. 下一週之前，這份留下的開放問題

1. ⭐⭐ **要不要做「查我的課本」這個查詢框？** 這是缺口 1，也是本週唯一一個
   「素材已經備好、不違反鐵律 1、不用造任何句子」的功能。⚠️ **改系統＝Owen 決定。**
   📌 但第 5 節的實驗**不需要它**（Ctrl+F 就能跑）→ ⭐ 建議先跑 3 次再決定。
2. ⭐ **批改 prompt 要不要改成「只標位置、答案去查語料」？** 這是 W39 結論＋本週 ⑧ 的直接推論，
   ⚠️ 但會讓批改變慢、變費力（H 家族本來就硬）→ ⛔ 不要在沒有第 1 條的查詢框之前先拔掉答案。
3. 📌 **Brown 等 (2026) 要讀原文**。它是目前最新的 WCF 統合分析，而且主打「區分短／中／長期」，
   ⚠️ 可能直接改寫 H 家族「每週 2–3 次」那一行。⛔ 本週網路被擋，沒讀到。
4. ⚠️ **N 家族的紙本矛盾**（2.4 節）——「紙本 concordance 效果較好」到底是材質還是「預先選過」？
   這決定查詢框要不要做成「預先整理好的清單」而不是即時搜尋。
5. ⚠️ **法文 DDL 的樣本數**：Looi 等 (2025) 的參與者人數與 Looi 的博士論文本週都沒讀到。
6. **W39 的七個缺口兩個月後有六個半還在**（見缺口 3）。⚠️ 其中「⭐ 跳過三層出口」是**違反練習頁鐵律**的狀態，
   ⛔ 這條不是研究問題，是待辦。
7. 📌 計時器語意**第五次**跨技能出現（W37 聽力／W38 閱讀／W39 寫作／W40 口說／本週）。
