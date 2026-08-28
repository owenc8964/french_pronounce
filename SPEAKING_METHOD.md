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

## 八、第二輪研究：從考試回推、排程參數、時數校準

### 1. ⭐ 最重要的修正：TEF 口說不是「講一段獨白」

查了 TEF Canada 口說的實際形式之後，發現**先前的設計方向有偏**：

| | Section A | Section B |
|---|---|---|
| 時間 | 說 5 分鐘（**準備 1 分鐘**） | 說 10 分鐘（**準備 1 分鐘**） |
| 稱謂 | **vous**（正式） | **tu**（非正式） |
| 任務 | 打電話問廣告細節，**要問出 10–12 個問題** | 根據文件**說服朋友**做某件事 |
| 對手 | 考官扮演店家／專業人士 | 考官扮演朋友，**會一直提出反對** |

評分面向：**理解與互動／詞彙／句法與文法／語音**。
拿 CLB 7+ 需要的語言特徵：進階連接詞（cependant、néanmoins、par ailleurs）、**subjonctif**、**多樣的疑問句式**（倒裝、直接問、客氣請求）。

> ⚠️ **所以真正要練的兩個目標任務是「提問」與「應付反駁」，不是「講一段獨白」。**
> 獨白（4/3/2）是**自動化引擎**，不是目標任務本身。這一條直接修正了先前
> 「給主題 → 自己講一段 → 攤開 pool 核對」的設計。
>
> 另外注意：**考試給的準備時間就是 1 分鐘**——剛好等於研究裡的門檻。
> 練習時給 1 分鐘，同時滿足「有效」與「transfer-appropriate」兩個條件。

⚠️ 分數門檻各家說法不一（310/450 或 393/450 都有人寫），**以官方 CLB 對照表為準**，別用二手數字。

### 2. 間隔要多長：3 天優於 7 天（就自動化而言）

Suzuki（2017）把 60 名學習者分成 **3.3 天間隔**與 **7 天間隔**兩組，練 L2 構詞的口語產出：

- 兩組的反應時間（速度）都顯著下降
- 但 **3.3 天組的「restructuring」明顯較強**——也就是真正的自動化（處理方式被換掉），
  而不只是「同一套流程跑得比較快」

**設計含意：同一個結構／同一個題目，約 3 天後回來一次，比隔一週好。**

### 3. 交錯 vs 集中

- **跨題目**：交錯（interleaving）的長期保留優於集中（blocking）
- **同一次練習內**：立即重複（immediate aural-oral same task repetition）對流利度有效，
  而且**不分程度、不分任務類型**

**設計含意：同一題當場連講三次（集中），但不同題目之間交錯排。** 兩者不衝突。

### 4. 時數校準：700 小時的「組成」比「總量」重要

FSI（美國外交學院）把法文列為 Category I：**600–750 課堂小時**達到 S-3/R-3
（約 CEFR B2–C1），全職約 30 週。

⚠️ 關鍵在於**那些小時的組成**：FSI 的時數是**小班、教師帶領、以互動口說為主**。
Owen 的 700 小時計畫在總量上對得上，但如果其中口說互動只佔 5%，**口說不會到 B2**。

**設計含意：與其增加總時數，不如改變組成。** 每天 15 分鐘的口說產出，
一年約 **91 小時**，佔 700 小時的 13%——這個比例是可以排得出來的。

---

## 九、回推出來的方法（兩階段協定）

> 依據：第八節的考試形式 ＋ 第五節的實作參數 ＋ 第二節的八階順序。
> ⚠️ 這是**方法**，還不是介面設計。介面設計要等第六節那四個問題拍板。

### 階段一（先建 pool）：在支架上開口，不是背熟再開口

**解決的問題**：Owen 說「對 pool 不熟，講不出好東西」。
**解法不是先背再講，是先在支架上講、支架再慢慢抽掉。**

每天 10 分鐘，三步：

| 步驟 | 做什麼 | 打哪一格 |
|---|---|---|
| ① 骨架朗讀 | 看著完整句子唸 2 遍 | Articulator |
| ② Disappearing text | 同一句，字逐步消失，每輪照樣講出來 | Formulator（支架漸退） |
| ③ Substitution | 骨架固定，只換一個元素（人稱／時態／內容） | Formulator ＋ 時態切換 |

⚠️ 這一階段**不要求想內容**——內容由骨架給。Conceptualiser 被刻意外包掉，
工作記憶才有餘裕處理構句。

### 階段二（自動化）：4/3/2，但任務要長得像考試

每天 15 分鐘：

1. **抽一張題目卡**（TEF 形式：A 型「打電話問到底」／B 型「說服他，他會反駁」）
2. **準備 1 分鐘**（跟考試一樣，不多不少）
3. **4 → 3 → 2 分鐘各講一次**（同一題，當場重複）
4. **每一輪只盯一個指標**（trade-off）：
   - 第 1 輪：**不要停**（流利度）
   - 第 2 輪：**時態對不對**（準確度）
   - 第 3 輪：**有沒有用到連接詞／subjonctif**（複雜度）
5. **自評四維**（各 0–3 分）：語速／停頓次數／自我重複／自我修正
6. **講完才攤開 pool**，核對「哪些我明明會、卻沒撈出來」——那個落差才是要練的
7. **同一題約 3 天後再抽一次**（restructuring 的最佳間隔），不同題目之間交錯

### Anki 在這套方法裡的位置

**只裝功能骨架，不裝主題單字。**

- 主題單字 → 交給**窄輸入**（同一批 chunk 在不同文本裡重複），不要用背的
- 功能骨架（30–50 條萬用句型）→ **中→法產出卡，而且一定要唸出聲**
- 理由：skill specificity——受納訓練不會轉移到產出；不出聲就練不到 Articulator

### 一句話總結這套方法為什麼「快」

不是因為每天練更久，而是因為**每一分鐘都打在缺的那一格**：

1. 目標任務對準考試（提問／應付反駁），不是泛泛的口說
2. 支架讓 Conceptualiser 先閉嘴，工作記憶集中在構句
3. 當場重複＋時間壓縮，逼出整塊產出（不佔工作記憶）
4. 一輪只盯一個指標，避開注意力的排擠效應
5. 3 天間隔回訪，打在自動化真正發生的那個窗口

---

## 十、一座島的完整訓練生命週期（以 AC8「為什麼去加拿大」為範例）

> 2026-08-27 Owen：「**我們就拿這個島來做舉例，設計一下後續怎麼訓練……我們來看怎樣是真的很強大的結果。**」
> 這一節是把前面九節的參數，落到**一座具體的島**上。範例島＝`AC8` v2（149 字 ≈ 68 秒）。

### 設計原則（每一階段只壓一兩格，不要全開）

| 階段 | 天數 | 每天 | 做什麼 | 打 Levelt 哪一格 |
|---|---|---|---|---|
| **1 認得** | D1–D2 | 3 分 | 讀 ＋ 聽 TTS，法中對得起來、沒有生字卡住 | 輸入（不算產出） |
| **2 跟著唸** | D2–D3 | 3 分 | 看著全文**出聲唸 2 遍**，跟 TTS 對節奏 | **Articulator** |
| **⭐3 支架漸退** | D3–D7 | 5 分 | 四段支架，每段講一次全文（見下） | **Formulator**（Conceptualiser 被支架接手） |
| **4 自主檢索** | D8 起 | 3 分 | 只看題目就講，**每 3 天一次** | Formulator ＋ Monitor |
| **5 壓縮** | 島穩之後 | 5 分 | 島版 4/3/2：**90 秒 → 70 秒 → 55 秒** | 全鏈路 ＋ 自動化 |
| **⭐6 移植** | 最後 | — | 骨架搬到別的題目；接反駁 | **Conceptualiser ＋ 策略能力** |

### 階段 3 的四段支架（這是我們系統最缺的一格）

| 支架 | 螢幕上留什麼 |
|---|---|
| ① 全文 | 整段法文 |
| ② 骨架＋主詞 | `D'abord, l'éducation…／Ensuite, le climat…／Il y a aussi les avantages sociaux…／Enfin, la stabilité…／Pour toutes ces raisons…` |
| ③ 只剩連接詞 | `D'abord ／ Ensuite ／ Il y a aussi ／ Enfin ／ Pour toutes ces raisons` |
| ④ 全空 | 只有題目 |

**目標：走到支架 ③ 就能講完整段。** ④ 是驗收，不是練習。

### ⭐ 什麼叫「這座島完成了」——七個可測的門檻

> 這是 Owen 問的「真正強大的結果」。不用感覺判斷，用這七條。

| 指標 | 門檻 | 依據 |
|---|---|---|
| 不看稿講完 | **連續 2 次**成功 | 自主檢索階段 |
| **起手時間** | 題目出現後 **3 秒內**開口 | `verb_sprint` 已有的起手時間概念，搬過來即可 |
| **停頓** | 全程 **≤ 3 次**，每次 < 2 秒 | 4 維 rubric 的 Hesitations |
| **語速** | 68 秒的內容能在 **55–70 秒**講完 | 母語法文約 5–7 音節/秒；不必追平，但要**穩定** |
| **平均語流長度（MLR）** | 每兩次停頓之間至少 **6–8 個音節** | MLR（syllables between pauses ≥0.25s）是預測 L2 流利度最好的變項之一；研究裡「不流利」的學習者 MLR 比母語者低 43%，而留學半年後 MLR 提升 22% |
| **累積產出次數** | **≥ 10 次**完整說出 | 學習曲線：簡單任務約第 4 次飽和，**複雜任務約第 10–11 次進入高原**（power law of practice，γ≈0.4–0.5） |
| **⭐ 移植測試** | **骨架搬到另一個題目還能用** | 島的價值在可調度，不在這一段 |

⚠️⚠️ **最後一條是分水嶺**：如果 `D'abord／Ensuite／Il y a aussi／Enfin／Pour toutes ces raisons`
搬到「為什麼學法文」「為什麼選這份工作」就垮掉，那你只是**背了一段課文**，不是蓋了一座島。

### 移植測試怎麼做（階段 6）

1. **換題目**：用同一組骨架，講「為什麼學法文」——內容全換、架子不動，60 秒
2. **接反駁**（AI 或家教丟三個）：
   - « Mais le Canada, c'est très froid, non ? »
   - « L'immigration, c'est difficile et long. »
   - « Et ton travail de dentiste ? Tu pourras exercer là-bas ? »
   → 用島裡的材料回應，不是重新想
3. 這一步同時就是 **TEF Section B** 的實際任務

### 排程現實：8 座島不能用串的

一座島從認得到移植 **約 3 週**。8 座島如果一座做完再做下一座 ＝ **24 週**，Phase 0 的 8 週根本放不下。

**所以必須交錯並行**（本來交錯的長期保留就優於集中）：
**同時養 3–4 座島，每天輪一座**，各自在不同階段。
Phase 0（8 週）合理的產出是 **4–5 座島**，其餘滾進 Phase 1。

### 系統要補的（最小集合，照階段需要才做）

| 要做的 | 對應階段 | 現況 |
|---|---|---|
| **支架漸退模式（四段）** | 3 | ❌ 完全沒有——**這是最該做的一個** |
| **「講出來」模式**：不打字、計時、講完自評 4 維 | 4–5 | ❌ 現在是文字回想 |
| **起手時間量測** | 完成判定 | 🔸 `verb_sprint` 有現成邏輯可搬 |
| 島版 4/3/2 計時（90→70→55 秒） | 5 | ❌ |
| 反駁對抗（3 個反對意見） | 6 | 🔸 `roleplay.html` 的引擎可以改 |

⚠️ **不要一次做完**。階段 3 的支架漸退先做，其他等島真的走到那一步再說。

---

## 十一、Owen 自己發現的技巧：唸到順為止（choral repetition）

> 2026-08-27 Owen：「我今天聽 Coffee Break French，**我覺得不錯的一句話，我就暫停下來不斷把他唸到順為止**。
> 有時候**我腦袋可以理解的文法跟順序，用唸的就是會不太順**，無論是詞的順序或是依序表達出來。
> 也可能是**舌頭跟不上或亂彈**。這些也是需要訓練的過程，需要快且精準。」

**他自己摸出了一個有名字的技巧，而且他的診斷完全正確。** 記在這裡，因為這是我們自己的發現，不是抄來的。

### 他觀察到的現象＝陳述性／程序性的分裂

「腦袋懂但嘴巴不順」正是 DeKeyser 技能習得理論的核心預測：
**理解那個語序是陳述性知識，說出那個語序是程序性技能，兩者不會自動轉換。**
（本檔第五節「skill specificity」是同一件事的另一面。）

而「舌頭跟不上或亂彈」更精確地說是**動作技能**的問題：
發音在文獻裡被當成 **motor skill**（articulatory approach），
大腦的 **dorsal stream** 負責把聽到的聲音映射成發音動作的計畫——
這條路徑跟「懂不懂意思」是分開的，只能靠**實際做出動作**來練。

### 這個技巧的名字與證據

課堂上的版本叫 **choral repetition training**（也就是密集版的 shadowing）。
研究顯示它能顯著提升**可理解度（comprehensibility）**，而進步幅度跟
「能不能記住並重現聲音」（audio-motor integration）相關。

### 打哪一格

| Levelt 關卡 | 有沒有打到 |
|---|---|
| Conceptualiser | ❌ |
| Formulator | 🔸 部分（語序被整塊化） |
| **Articulator** | ✅✅ **主戰場** |
| Monitor | 🔸 |

⚠️ **所以它不能取代島**：它讓你「講得順」，不會讓你「有話講」。兩個要並存。

### 把它變得更鋒利的五個參數

1. **「順」要有定義**：**連續 3 次無誤、而且不減速**才算過。⛔ 不要用「感覺順了」判斷——那個標準會隨疲勞漂移
2. **一次只挑 1–2 句**。動作學習要的是**密集重複**，不是覆蓋量。整段一起唸＝每句都只練到一點
3. **一定要出聲**。默唸完全不碰 Articulator（沒有動作就沒有動作學習）
4. **先慢後快**：0.75× 聽一次 → 正常速跟 → **再逼自己比正常速快一點**。
   最後那一步是關鍵：只有超速過，正常速才會有餘裕
5. **卡住的時候先切開**：唸不順通常卡在**一個特定的音節交界**（例如 `qu'il y ait`、`je ne sais pas`）。
   把那兩個字單獨唸 5 次，再放回整句——比整句重來 20 次有效

### 這件事跟系統的關係

`answer_card.html` 與 `french_notes.html` 都已經有 🔊 TTS，**所以這個技巧現在就能做，不用等我做工具**。
之後如果要做，最小的加法是「**這句我要唸到順**」的暫存清單——把當下打到他的那一句丟進去，
⚠️ 但要嚴格限量（見 memory `feedback_fun_is_the_engine`：稀有才有力量）。

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
- 流利度指標（articulation rate／MLR／停頓）與 L2 French：https://www.researchgate.net/publication/301296350_Fluency_in_second_language_assessment
- Power law of practice（重複次數與反應時間）：https://en.wikipedia.org/wiki/Power_law_of_practice
- 練習曲線何時進入高原（簡單約 4 次、複雜約 10–11 次）：https://link.springer.com/article/10.3758/BF03212979
- Choral repetition training 與可理解度（TESOL Quarterly 2023）：https://onlinelibrary.wiley.com/doi/full/10.1002/tesq.3120
- 發音是動作技能（articulatory approach）：https://en.wikipedia.org/wiki/Articulatory_approach_for_teaching_pronunciation
- TEF Canada 口說形式與 CLB 7 語言特徵：https://www.prepmyfrench.com/blogs/the-ultimate-tef-canada-speaking-section-guide-2026-formats-strategies-and-clb-7-samples
- TEF Canada 官方成績說明：https://www.lefrancaisdesaffaires.fr/en/candidate/test-evaluation-francais/tef-canada/results/
- 間隔 3.3 天 vs 7 天與自動化（Suzuki 2017, SSLA）：https://yuichisuzuki.net/wp-content/uploads/2023/04/Suzuki-2018-SSLA.pdf
- 交錯 vs 集中（Nakata & Suzuki 2019, MLJ）：https://yuichisuzuki.net/wp-content/uploads/2023/04/Nakata-Suzuki-2019-MLJ.pdf
- 練習分配的整體框架（Suzuki, Nakata & DeKeyser 2019, MLJ）：https://www.academia.edu/40119025/
- FSI 語言時數分級：https://www.fsi-language-courses.org/blog/fsi-language-difficulty/
