# SPEAKING_METHOD.md — 口說怎麼練（文獻整理與設計依據）

> 2026-08-26 建立。起因是 Owen 的兩個問題：
> ①「先講再看順序沒問題，但這樣我對 pool 就很不熟，我猜大略也講不出什麼好東西。」
> ②「要靠 Anki 背句型嗎？還是有什麼更好的方法？」
> 他同時交代：**學習法先研究，不要急著講答案**。這份就是研究的結果。
>
> ⚠️ 這份文件的定位跟 `FRENCH_OS.md` 一樣：**設計依據**，不是待辦清單。
> 之後要做任何口說功能，先回來對照「這個練習打的是哪一格」，打不到就別做。

---

## 一、先有一張診斷用的圖：說一句話的腦內流程

Levelt（1989）的語言產出模型，Kormos（2006）把它擴充到 L2。**說一句話會經過四關**：

| 關卡 | 在做什麼 | 卡住時的症狀 |
|------|---------|-------------|
| **Conceptualiser** | 想「我要講什麼」（還沒有語言） | 腦袋空白、不知道要說什麼 |
| **Formulator** | 選字、組句、變位 | 知道要講什麼但講不出來、句子拼不起來 |
| **Articulator** | 實際發音 | 想得出來但唸不順、口腔動作跟不上 |
| **Monitor** | 邊講邊檢查、修正 | 一直自我打斷、越修越亂 |

⚠️ **L2 的困難在於這四關會搶同一份注意力資源**。這就是為什麼一開口要求「又流利又正確又有內容」一定失敗。

**這張表的用法：任何口說練習，先問它打的是哪一格。** 打不到的格子不會因為多練而變好。

---

## 二、從零到自由口說有八個階段（MARS EARS）

Conti 的 EPI（Extensive Processing Instruction）把整條路徑拆成八階：

| | 階段 | 在做什麼 |
|---|------|---------|
| **M** | Modelling | 看示範，整塊呈現，不拆解 |
| **A** | Awareness-raising | 注意到模式（規則被「看見」，不被「教」） |
| **R** | Receptive processing | 同一批 chunk 反覆聽讀到認得很穩 |
| **S** | **Structured production** | **有支架的產出**：骨架給你，只換內容 |
| **E** | Expansion | 加變化、加長度 |
| **A** | Autonomous recall | 拿掉支架，自己撈出來 |
| **R** | Routinization | 重複 ＋ 時間壓縮，練到自動 |
| **S** | Spontaneity | 自由講 |

理論根基是 **DeKeyser 的技能習得理論**（陳述性 → 程序性 → 自動化）加上**認知負荷理論**：
程序化的初期很脆弱，必須刻意壓低工作記憶負擔。

> **對 Owen 那個問題的直接回答：** 「給主題 → 自己講 → 再攤開 pool 核對」是**第 7–8 階**的活動。
> 他覺得「這樣我講不出什麼好東西」是對的——因為第 4 階（有支架的產出）與第 7 階（時間壓縮）
> 在我們系統裡是空的，等於被從第 3 階直接丟到第 8 階。

---

## 三、我們系統目前的覆蓋（2026-08-26 盤點）

| 階段 | 現況 | 對應工具 |
|------|------|---------|
| Modelling／Awareness | ✅ 強項 | `french_notes.html`（含 why、字面層、老師原話） |
| Receptive processing | ✅ 有，但偏「認得」 | `review.html` 複習卡 1717 張、`reading.html` |
| **Structured production** | ❌ **幾乎沒有** | `sentence_drill.html` 最接近，但**支架不會漸退** |
| Expansion | 🔸 部分 | `table_drill.html`（文法層，不是話語層） |
| Autonomous recall | ✅ 有 | `sentence_drill.html`、`answer_card.html` |
| **Routinization（時間壓縮）** | ❌ **沒有** | `verb_sprint.html` 有「起手時間」概念，但只到單字層 |
| Spontaneity | 🔸 雛形 | `roleplay.html` 特訓模式（18 場景） |

**缺口非常明確：第 4 階與第 7 階。**

---

## 四、各種練習法分別打哪一格（這是本文件最該記住的一張表）

| 練習 | Conceptualiser | Formulator | Articulator | Monitor | 自動化 |
|------|:---:|:---:|:---:|:---:|:---:|
| Anki 法→中卡 | — | — | — | — | — |
| **Anki 中→法卡（唸出聲）** | — | ✅ 單塊 | 🔸 | — | 🔸 |
| Shadowing（跟讀） | — | — | ✅✅ | — | 🔸 |
| 讀範文／背文章 | 🔸 借別人的 | 🔸 | 🔸 | — | — |
| **Structured production（支架產出）** | ✅ 被支架接手 | ✅✅ | ✅ | 🔸 | ✅ |
| **4/3/2（重複＋壓縮）** | ✅ | ✅ | ✅ | ✅ | ✅✅ |
| 自由對話 | ✅✅ | ✅✅ | ✅✅ | ✅✅ | — |

⚠️ **自由對話那一列每一格都是滿的——所以它最難，也最不適合當「練習」。**
它是**驗收**，不是訓練。訓練要一次只壓一兩格。

---

## 五、關鍵發現與實作參數

### 1. Anki 的正確定位：只有一格，而且方向不能錯

DeKeyser 的 **skill specificity**：受試者分別接受產出訓練或受納訓練，之後測**反方向**技能，
表現明顯下降——同一份陳述性知識會長出**兩套不同的程序性技能**。

- **法→中卡**：練辨識，對口說幾乎沒有轉移
- **中→法卡**：練單塊檢索，對 Formulator 有用
- ⚠️ **一定要唸出聲**，否則完全沒碰到 Articulator

另一條佐證：受納詞彙量通常是產出詞彙量的 **2–3 倍**，而且**落差隨程度提高而變大**。
所以「我明明認得卻講不出來」是常態，不是退步。

**結論：Anki 是必要的一格，但它只是一格。**

### 2. pool 怎麼變熟：窄而重複，不是背清單

EPI 的核心機制是 **highly patterned input flooding**：
同一批 chunk 在**不同文本**裡反覆出現（narrow reading / narrow listening），
在「讀懂內容」的過程中被動吃進去。

⚠️ 這跟「背一份 200 句的清單」正好相反——**窄，但重複很多次**。
（也剛好避開 Owen 明確說過的「想到龐大資訊就頭痛」。）

### 3. Structured production：可以一個人做的活動清單

支架逐步抽掉是重點。以下是可單人操作的（原本是課堂活動，標註為口說版）：

| 活動 | 口說版怎麼做 |
|------|-------------|
| **Disappearing text** | 句子的字逐步消失，每消失一輪就照樣講一次 → 最後全空 |
| **Translation pyramid** | 同一句逐行加長：`Je pense.` → `Je pense que c'est bien.` → `Je pense que c'est bien parce que…` |
| **Initial letters** | 只留每個字的首字母當提示，講出整句 |
| **Mosaic / sentence chaos** | 詞塊打散，口頭重組成正確語序 |
| **Substitution drill** | 骨架固定只換一個元素（時間／人稱／時態） |
| **1 pen 1 dice** | 擲骰決定要換哪個元素，強迫變化 |
| **Delayed dictation** | 聽完延遲幾秒再複述／寫下 |
| **Oral ping-pong** | 需要對手——**但程式可以當對手** |

### 4. 自動化的引擎：4/3/2（重複 ＋ 時間壓縮）

同一主題連講三次：**4 分鐘 → 3 分鐘 → 2 分鐘**。

- 機制：時間被壓縮，來不及重新組裝句子 → **被迫整塊丟出來**（逼出 formulaic sequence）
- 效果：語速上升、停頓減少
- 佐證：immediate aural-oral **same task repetition** 對流利度的提升**不分程度、不分任務類型**
- ⭐ **單人可做**，錄音即可

**自評 rubric（研究裡實際用的）**：四個維度，各 0–3 分，滿分 12

| 維度 | 看什麼 |
|------|-------|
| Rate | 講了多少（字／音節數） |
| Hesitations | 停頓次數 |
| Repetitions | 自我重複次數 |
| Corrections | 自我修正次數 |

⚠️ 該研究樣本小（24 人）、對象是青少年、只有五週，效果量雖大（d≈2.65）但別當保證。
**它的價值在於「這四個維度是可以自評的」——不需要老師也能量。**

### 5. 準備時間：1 分鐘就有門檻效應

- **pre-task planning**（先想再講）→ 流利度與複雜度上升
- **on-line planning**（邊講邊想、不限時）→ 偏向準確度
- 研究指出 **1 分鐘**就是產生顯著改善的門檻

**設計含意：給 1 分鐘準備，不要不給，也不用給更多。**

### 6. Trade-off Hypothesis：一輪只能盯一個指標

注意力無法同時分配給**複雜度、準確度、流利度**；
壓其中一項必然犧牲另一項。

**設計含意：每一輪只設一個目標。** 例如
第一輪只求「講滿時間不要停」（流利度），
第二輪才管「時態有沒有對」（準確度）。
⛔ 不要在同一輪同時要求。

### 7. Shadowing 的定位：發音與韻律，不是產出

證據支持 shadowing 改善**節奏、語調、可理解度、流利度與聽力**；
但對**自發產出**的證據較弱，分段音素（單音）的證據不明確。

**含意：`listening.html` 的 🎬 影集精讀 shadowing 是 Articulator 的工具，不是口說產出工具。**
不能靠它解決「講不出來」。

---

## 六、還沒決定的設計問題（等 Owen 拍板）

1. **要不要錄音**？研究裡「錄音＋回看自評」效果好，但增加摩擦，而 Owen 對摩擦很敏感。
2. **主題從哪裡來**？`answer_cards.js` 的 15 個高頻主題／他的真實生活（女兒、工作、蘭嶼）／DELF 題庫。
   ⚠️ 主題若用他的生活，內容要**他自己先講**（見 memory `feedback_personal_content_authenticity`）。
3. **一輪的時間預算**：4/3/2 是 9 分鐘＋1 分鐘準備 ≈ **10 分鐘**。這在每日 1.5 小時裡佔多少、排在哪。
4. **支架從哪裡長出來**：需要一份「功能骨架庫」（30–50 條萬用句型，標好時間軸），
   這是目前資料層唯一真正缺的東西。

---

## 七、來源

- MARS EARS 八階：https://gianfrancoconti.com/2022/05/18/the-real-marsears-how-an-epi-sequence-truly-unfolds/
- EPI 原則與研究基礎：https://gianfrancoconti.com/2025/03/18/beyond-sentence-builders-the-process-the-research-and-principles-underpinning-extensive-processing-instruction/
- Structured production 活動清單：https://www.fraubastowmfl.co.uk/post/structured-production-and-expansion-phase-g-conti-e-p-i-methodology-1
- Skill Acquisition Theory（DeKeyser & Suzuki 2025）：https://www.academia.edu/136849439/
- 4/3/2 ＋ 自評 rubric（TESL-EJ 2022）：https://tesl-ej.org/wordpress/issues/volume26/ej102/ej102a1/
- Task repetition 與口說處理（SSLA）：https://www.cambridge.org/core/journals/studies-in-second-language-acquisition/article/abs/task-repetition-and-second-language-speech-processing/0EA95A4C7D9E90CD2AB30043F84A4635
- Pre-task planning（Yuan & Ellis 2003, Applied Linguistics）：https://academic.oup.com/applij/article-abstract/24/1/1/167573
- Lexical chunks 與口說流利度實驗：https://pmc.ncbi.nlm.nih.gov/articles/PMC9379275/
- Formulaic sequences 與流利度面向（TESOL Quarterly）：https://onlinelibrary.wiley.com/doi/10.1002/tesq.556
- Shadowing 系統性回顧（2025）：https://www.tandfonline.com/doi/full/10.1080/29984475.2025.2546827
- 口說的腦內流程（Levelt／Kormos，Conti 整理）：https://gianfrancoconti.com/2025/04/06/how-the-speaking-process-unfolds-in-the-brain-and-the-five-pillars-of-speaking-instruction/
