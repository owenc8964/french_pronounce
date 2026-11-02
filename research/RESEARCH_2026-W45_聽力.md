# RESEARCH 2026-W45 — 👂 聽力 Compréhension orale

> 產出日期：2026-11-02（ISO 第 45 週，45 % 4 = 1 → 聽力）
> 依 `CLAUDE.md` 每週雲端研究例行產出。研究歸研究，**本檔不改任何系統程式**。
> 前兩次聽力輪：[`RESEARCH_2026-W37_聽力.md`](RESEARCH_2026-W37_聽力.md)（2026-09-07）、
> [`RESEARCH_2026-W41_聽力.md`](RESEARCH_2026-W41_聽力.md)（2026-10-05）。
> 其後的聽力專題：`2026-09-21`（挖空聽寫判分）、`2026-09-22`（聽寫題型）、`2026-09-24`（慢速→原速遷移）、
> 以及 `GAME_ROADMAP.md` 的 R62／R63／R66／R68／R69／R72／R73（聽寫 vs 泛聽、窄聽、慢放、插停頓）。
> ⛔ **本檔刻意不重講以上任何一條**——不碰 HVPT、字幕、語速階梯、睡前時段、筆記、選擇題偏斜的修法。
> 本檔只寫一件以前沒查過的事：**「詞」這個單位**。

---

> ## ⚠️⚠️ 本週的查證等級限制（先講，因為它決定每一條能用到什麼程度）
>
> 跟 W37／W39／W40／W41／W42／W44 一樣：這個環境的 egress proxy **擋掉學術站全文**。
> 本週實測 DNS 直接解不出來的：`eric.ed.gov`、`www.kazuyasaito.net`、`discovery.ucl.ac.uk`。
> ⚠️ **所以第 1–3 節的數字全部來自檢索摘要，我沒有讀到任何一篇原文或摘要頁本身。**
> （⭐ 若要補原文，這三個 host 要先進 session 的網路白名單。）
>
> - 🟢 **摘要層級**：作者／年份／樣本數／效果量來自檢索摘要
> - 🟡 **二手層級**：經部落格／備考站／廠商頁轉述
> - 🔴 **待驗證**：數字看起來可用，但要對原始來源
> - ⭐ **唯一的例外是第 4 節**：那一節的數字是**我在這個 repo 裡直接跑出來的，可以當事實。**
>
> ⛔ **在對過原文之前，不要把 1–3 節任何數字寫進系統的說明文字裡。**
> （`CLAUDE.md` 內容鐵律「來源三層優先序」的同一精神：線索不是判準。）
>
> ⚠️ 另一個本週的查證空白要先說：**Reddit 完全搜不到**（連 `site:reddit.com` 都回不出任何討論串）。
> 所以第 1B 節的社群做法**沒有 r/French 的材料**，只有教師部落格、備考站與一篇學習者自述。
> ⛔ 不要把 1B 讀成「社群的共識」，它是**幾個可取得的樣本**。

---

## 1. 這週查到什麼

### 1A. 研究證據（有實證、有樣本數的）

#### ① ⭐⭐⭐ 本週最大的發現：前十二個家族沒有一個的單位是「一個字」

W37 找到 G 家族時，說的是「訊號進來的那一層壞了」——**次詞彙層**（音位、詞界、弱化形）。
W41 找到 J 家族時，說的是「練完之後那段不練習的時間」。
⭐ 本週查到的這一支說的是**夾在兩者中間、而且誰都沒管的一層**：

> **你的每一個字，有沒有一個「聲音版本」？那個版本調得出來有多快？**

這一支（Saito、Matthews、Cheng、Uchihara 那條線）用的詞是
**phonological vocabulary knowledge**／**aural vocabulary knowledge**，對立面是
**orthographic vocabulary knowledge**（文字版的詞彙知識）。它主張的是：

- 你會不會這個字、和你**用耳朵**會不會這個字，是**兩個不同的量**；
- 聽力測驗量到的主要是後者；
- 而**用課本與文字學起來的人，前者遠大於後者**。

⭐ Saito 等人給了一個三階段的發展模型（這部分不需要相信任何效果量也能用）：
**phonologization（這個字的聲音進來了）→ generalization（換人講、換語速也還認得）→ automatization（不用想就認出來）**。
⚠️ 注意第三階段：它不是「會不會」，是「**多快**」。

**證據**：

| 來源 | 樣本 | 數字 |
|---|---|---|
| ⭐⭐ Cheng & Matthews (2018)，*Language Testing* 35(1), 3–25 | **N = 250** 中國大專 EFL | **產出型語音詞彙（ProPhon）對聽力 r = .71**，迴歸解釋 **51%** 的聽力變異；產出型正字法詞彙（ProOrth）對閱讀 r = .57／**33%**。⚠️ 另有引用把閱讀那個數字寫成 .46，**有一處引用錯誤，用前要對原文** |
| ⭐⭐ Saito, Uchihara, Takizawa & Suzukida，*SSLA* 47(1), 26–52（2023 線上／2025 刊出） | 日籍 EFL | **「用在脈絡裡」的詞彙判斷（LJT）預測整體聽力 r = .6–.7**，而 **meaning recognition／recall 只有 r = .4–.5**；未限時版 LJT r = .66 |
| ⭐⭐⭐ Saito, Uchihara, Takizawa & Suzukida，*Applied Psycholinguistics*（2025，**訓練研究**） | **N = 133**（⚠️ 2026-05 的勘誤寫 **126**，兩個數字不一致）日籍 EFL | 兩種訓練（meaning recall vs 詞彙語意判斷）**誰都沒有明顯較優**；⭐⭐ **但只有「自動化」面向的進步跟聽力進步相關，宣告式面向的進步不相關**；自動化組在兩個面向都學得比較穩 |
| ⭐ 同一個團隊的訓練劑量 | 同上 | **每次 30 分鐘／80 個目標詞／160 trials**（一輪判斷＋回饋）。另一篇字幕影片研究用 **20 分鐘** |
| ⚠️⚠️ **反方（最該並陳的一條）**：Bozorgian, Nasari & Matthews (2025)，*Pedagogies*（doi 10.1080/1554480X.2025.2456553） | **N = 100**（聽覺組 33／書面組 31／對照 36）伊朗高中、**6 次課**、KET 聽力前後測 | **兩個實驗組都勝對照組（中等效果量）**，⛔ **但聽覺詞彙教學與書面詞彙教學之間沒有顯著差異** |
| ⚠️ **反方 2**：Saito, Hosaka, Suzukida, Takizawa & Uchihara (2026)，*Second Language Research*（doi 10.1177/02676583261420616） | — | **限時 vs 不限時**的詞彙判斷**沒有**讓「詞彙↔聽力」的關係變強；另有一處報告**反應時間變異（CV）與聽力無關** |
| ⚠️ **重疊度警訊** | 一篇中國 EFL 研究 | 正字法與聽覺詞彙知識 **r = .88** —— ⛔ **兩者高度重疊**，不是兩個獨立的東西 |
| 參照（對照既有地圖） | 100+ 研究的統合分析，*Language Teaching Research* 2022 | 詞彙知識 ↔ 閱讀 **r = .57**／↔ 聽力 **r = .56** —— ⭐ 比 K 家族的內容知識 **.41** 大 |
| 測法 | Milliner, Matthews & McLean (2026)，*Language Testing* | 聽覺版詞彙量表三種題型：**meaning-recall r = .58 ＞ meaning-recognition r = .50** |
| ⚠️ 程度調節 | *System* 2017 等 | 低程度：**高頻詞**就能預測聽力；高程度：高＋中頻都要。另有研究說**高程度組**的聽覺詞彙量影響很小（r = .38） |
| ⚠️ 不一致 | 一篇回顧 | 「聽覺詞彙與 L2 聽力的關聯**仍然 mixed**」 |

⭐ **怎麼讀這一堆互相打架的數字（這是本條的重點，不是上面任何單一數字）**：

- **相關研究很一致**：耳朵那一側的詞彙知識，對聽力的預測力明顯大於眼睛那一側（.71 vs .39–.55）。
- ⚠️⚠️ **但唯一一個直接比較「教聽覺詞彙 vs 教書面詞彙」的實驗說兩者沒差**（N=100、6 次課）。
- ⚠️ **而唯一一個訓練研究說，誰優不重要，重要的是你有沒有推進到「自動化」那一側。**
- ⚠️ **然後「自動化」怎麼測，同一個團隊自己還在翻案**（CV 無關、限時沒差）。

⭐ **中立的讀法（⚠️ 標明是推論，不是文獻結論）**：
**「字有沒有聲音版本」是一個真的、而且可能很大的瓶頸；但「怎麼練」目前沒有一條被實驗證明比較好。**
→ 所以這一家族現在能給的是**診斷**（你有多少字是啞巴字），⛔ **不是療法**。
⭐ 這剛好是最便宜的那一半——診斷 15 分鐘就能做，見第 5 節。

---

#### ② ⭐ 順便解決 W41 留下的一個懸案：互動式聽力要不要另立家族？→ **不要**

W41 1A ⑧ 把「互動式聽力」列為「地圖上還沒有的構念」但沒結案。本週查完了：

| 來源 | 內容 |
|---|---|
| **Lam & Goh (2026)**，*RELC Journal*（doi 10.1177/00336882261448243） | 用會話分析建了一套 L2 互動式聽力技能分類：**次技能與認知歷程各五大群、屬性三群，共十類**。核心機制是 **other-initiated self-repair**（聽者對對方剛說的話發動修補，逼對方自己把卡住的地方解掉） |
| 一篇 L2 聽力構念的回顧 | **只有 39 篇（24.84%）**對「聽力」給了理論定義，其中 38 篇是籠統或窄的；discriminative／empathetic／analytical listening 幾乎沒人管 |
| Wan 的初級華語研究 | **互動式聽力在標準化測驗裡幾乎不存在**；該研究提了一套會話分析出來的評分尺（回應的多樣性／怎麼展示理解／對序列的掌握） |
| Duolingo English Test 的 Interactive Listening 作業 | 測的是**開場、收場、理解對方、把對話推向目的**，連續好幾個 turn |
| Duolingo 自己的技術文件 | 承認 AI 生成的聽力作業**模擬不了真實互動**：真實情境裡對方會依前一輪調整，需要**協商意義** |

⛔ **結論：不另立家族，理由三條**：
1. **TCF CO 根本不考它**——39 題三選一、只播一次、你對音檔做不了任何事（第 3 節）。
2. 它的**槓桿落在既有家族上**：要你做的事（請對方重說、確認、改述）是 **C 策略能力**；
   要你練的場合是 **I 任務**；要你練的對手是 **D AI 對話夥伴**。⭐ 它是一組技能，不是一支新的槓桿。
3. 證據等級還不到：⚠️ 本週查到的全是**分類學與評量構念的提案**，⛔ **沒有任何對照組訓練實驗**。

⭐ **但它值得在 C 家族底下補一句**：Owen 的 TCF **T2 本身就是互動**，而且他要去的是加拿大。
「聽不懂的時候對人做什麼」在 CO 考卷上值 0 分，在生活裡值很多分。

---

#### ③ ⭐ 另一條查完決定**不立家族**的：音樂／節奏訓練

這一條是本週刻意去掃的「對立家族」候選——如果成立，它會是第一個**完全不碰法文**就能提升聽力的訓練。
**答案是：相關有，因果沒有。**

| 來源 | 樣本 | 數字／結論 |
|---|---|---|
| *Royal Society Open Science* (2025) 統合分析 | — | 音樂能力與 L2 學習成果**正相關但幅度不大**；⛔ **效果量多為相關，作者明說無法確認因果，也不支持「遷移」**；⚠️ 關係可能在**初期的感知與產出**面比較強，對最終程度較弱 |
| *Journal of Phonetics* 線上那篇統合分析 | **109 個研究** | 音樂能力 ↔ 語音韻律感知 **中等正相關**；⭐ **非母語**韻律的相關比母語的大 |
| Zulu 音位學習研究 | — | **節奏感知**與音位任務有關，⛔ **但音樂訓練沒有**；作者直接說「無證據支持音樂訓練遷移到外語語音感知」 |
| 節奏促發（rhythmic priming）研究（2025） | — | 規律節奏對 L2 句法處理**整體無益**；只在**長期受過正式音樂訓練**的人身上出現 |
| 旁證（⚠️ 不同族群） | 聽損者系統性回顧 | **無證據**顯示音樂訓練改善言語感知 |

⛔ **不另立家族，而且這一條要寫進「不要做」的清單**：
⭐ 它的形狀跟 `2026-10-02_節奏唱誦與記憶術記變位.md` 的結論一模一樣（唱誦／手勢／宮殿都無成人 L2 長期證據）——
**本週給了同一個方向第二個獨立的否證。** 相關 ≠ 可訓練：會音樂的人聽力好，不代表練音樂會讓聽力好。

---

#### ④ AI 這一側本週的新東西：**ASR 不夠準，所以不能當判分員**

W41 ⑥ 已經說「AI 融入聽力有效果（合併 0.42）」，⛔ 本檔不重講。本週查到的是**反面的工程事實**，
而它直接決定第 4 節能不能做自動聽寫判分：

| 來源 | 內容 |
|---|---|
| ⭐⭐ McCrocklin (2026)，*Human Behavior and Emerging Technologies*（doi 10.1155/hbe2/5762328） | 測 Google 與 Windows 語音辨識對**帶口音的學習者語音**；其文獻回顧寫着先前兩個研究都報告 **對 L2 語音的辨識不足，無法提供有用而可靠的回饋** |
| *RECALL*（可懂度比較） | ASR 的輸出只在**一位說話者**身上與母語聽者的可懂度判斷吻合 |
| *Nature Human. Soc. Sci.* (2025) 隨機對照試驗 | AI 語音辨識組 vs 教師回饋組：⚠️ **對照組的聽力也顯著進步**，所以 AI 的效果**不乾淨** |
| *Language Learning* (2025)，Hirschi 等 | AI 生成的可懂度回饋（只給視覺 / 視覺＋敘述 / 無回饋）三組比較——⭐ 這條屬 **L 家族**，W44 已處理，此處只記存在 |
| *Nature Human. Soc. Sci.* (2026) 手機 App | 短期 AI 發音練習與**一個難的母音對比**的感知與產出雙雙進步 |

⭐ **對我們的直接含義**：**聽寫判分不要交給 ASR**。
⚠️ 但注意這跟 `2026-09-21_挖空聽寫對解碼的效果與法文判分` 要處理的是不同的東西：
那邊問的是「**Owen 打出來的字**怎麼判對錯」（文字比對，可行）；
本條說的是「**把 Owen 的嘴**或**音檔**交給 ASR 轉寫」不可靠。⛔ 兩件事不要混。

---

#### ⑤ ⚠️ 一條本週**查無**、而且空白本身就是發現的：法文沒有已驗證的聽覺詞彙量表

| 工具 | 模態 | 語言 |
|---|---|---|
| **TTV**（Test de la taille du vocabulaire，Batista & Horst 2016，*CMLR*） | **書面** | 法文 |
| **LVLT**（Listening Vocabulary Levels Test，McLean 等） | 聽覺 | **英文** |
| Eyckmans (2004) 的聽覺版 yes/no 測驗 | 聽覺 | **荷蘭文**（受試者是法語母語者） |
| 消費級網頁工具（Lenguia 等） | 聽覺 | 法文，⛔ 無驗證資料 🟡 |

⛔ **所以：沒有現成的法文聽覺詞彙量表可以拿來測 Owen。**
⭐ 但這對我們**不是壞消息**：第 4 節會指出，這個 repo 裡**已經有一份 2026-09-03 做好的法文聽力語料詞頻表**，
而且**沒有任何系統頁面在用它**。要自製一份粗糙但夠用的量表，材料是現成的。

---

### 1B. 社群做法（個人經驗分享，⚠️ 沒有對照組）

⚠️ **本節的取樣是壞的**：Reddit 搜不到（連 `site:` 都失敗），所以沒有 r/French／r/languagelearning 的材料。
剩下的是**備考商業網站、教師部落格、Anki 社群指南、一篇學習者自述**。⛔ 不要當共識讀。

**① TCF Canada CO 的考場做法（備考站之間相當一致，但全是商業備考網站）** 🟡
- **聽前先讀題目與選項**，把被動聽變成定向聽（tcfcad）
- **對立連接詞是答案的地標**：`mais`／`pourtant`／`en revanche`／`plutôt`（nclcfrench）
- ⭐ **小心「你剛好聽到的那個字」就在某個干擾項裡**——正解通常是**改述**過的（nclcfrench）
- **漏掉一個字就放掉它**，不要卡在那裡而漏掉下一句（tcfcad）
- 只記**數字／日期／地點／專有名詞**（tcfcad）——⭐ 跟 W41 的筆記結論（只記時間／地點／數字）一致
- **不留空白**，答錯沒有倒扣（nclcfrench）
- **輪練多個口音**：France／Québec／Belgique／Afrique francophone（tcfcad）
- ⭐⭐ **每一組做完，把錯題依「原因」分類，只在檢討時重聽**（tcfenligne）
  → ⭐ 這一條跟第 5 節的實驗是同一個動作，**而且它是本節唯一可以直接接到 M 家族的社群做法**

**② 聽覺優先的卡片設計（Anki 社群指南）** 🟡
- ⭐ **做「只有聲音」的卡：正面是音檔，不看文字就要講出意思**；指南自己說這是在練 bottom-up 聽力、
  並**縮小閱讀能力與聽力能力的差距**
- ⭐ **為什麼法文特別需要**：`les amis` 聽起來跟 `les` ＋ `amis` 分開念完全不同（liaison／élision）
- 音源：TTS add-on（AwesomeTTS）、Forvo、或從真實內容剪片段
- ⚠️ 另有一個**付費**法文牌組把順序排成「先修聲音，再堆詞彙」（字母 → IPA → 最小對立組）——⛔ 廠商說法

**③ 程度對應的素材與「先讀再聽」** 🟡
- 一位法文老師的 newsletter 按程度切：**A2 → Little Talk in Slow French**；**B1+ → InnerFrench**
  （⭐ 跟 `HANDOFF.md` 既有決定一致：InnerFrench 偏 B1+，等 Owen 到 B1 再用）
- 教學資源建議：**先跟著逐字稿聽 → 再不看字聽 → 幾天後拿同一段再聽一次**
- 一位 A2/B1 學習者自述：**用慢速聽 liaison** 時口語理解明顯變好
- **Dictée**（Lawless French）：一次同時練聽力、拼字、詞彙、文法
- ⚠️ 一個商業聽寫課程把目標客群寫成「**到了高 A2 或 B1、但聽不懂口語法文的人**」——⭐ 這剛好是 Owen 的位置

**④ 一篇學習者自述（A2 → B2）** 🟡
- 只有一句可用的：「**找到對你有用的那一件事，然後每天做**」
- ⚠️ 單人、無對照、無細節。⛔ 不要當方法，當**依從性的提醒**：W41 的 Chang 2024 說聽力訓練**時長顯著、方法不顯著**。

---

## 2. 家族歸類

### 2.1 本週每條發現屬於哪個家族

| # | 發現 | 家族 |
|---|---|---|
| ① | 聽覺 vs 書面詞彙知識、三階段模型、自動化才相關 | ⭐⭐ **M（新，見 2.2）** |
| ① 反方 | 聽覺詞彙教學 vs 書面詞彙教學無差異 | M 的邊界 |
| ① 參照 | 詞彙知識 ↔ 聽力 r = .56 | M（並對照 K 的 .41） |
| ② | 互動式聽力分類學、other-initiated repair | **C ＋ I ＋ D**（⛔ 不另立，見 2.3） |
| ③ | 音樂／節奏訓練 | ⛔ **不屬於任何家族，寫進「不要做」** |
| ④ | ASR 對 L2 語音辨識不足 | **D 的工程邊界** |
| ④ | AI 語音辨識 RCT 對照組也進步 | D（效果不乾淨） |
| ⑤ | 法文沒有聽覺詞彙量表 | M 的工具空白 |
| 1B ① | TCF CO 考場做法、**錯因分類** | **C**（策略）；錯因分類⭐ 也服務 M |
| 1B ② | 聲音在正面的卡片 | ⭐ **M 的具體操作** |
| 1B ③ | 先讀逐字稿再聽、慢速聽 liaison、dictée | **G**（W37／W41／`2026-09-24` 已有，⛔ 不重講） |
| 1B ④ | 「每天做」 | **F** |

### 2.2 ⭐⭐ 找到第十三個家族：**M 聽覺詞彙（phonological vocabulary）**

**它跟每一個既有家族的差別，用「單位」一句話講完**：

| 家族 | 它處理的單位 |
|---|---|
| A 刻意練習 | 一個**結構**的自動化（`j'ai mangé` 整塊產出） |
| B 可理解輸入 | **小時數** |
| C 策略／語言島 | 一段**打磨過的話**、一組**應對手段** |
| D AI 對手 | 一個**對手** |
| E 挖句子 | 一份**素材** |
| F 動機工程 | 一個**想打開它的理由** |
| G 感知解碼 | **次詞彙的訊號**（音位／詞界／弱化形） |
| H 修訂循環 | **你剛寫的那一篇** |
| I 任務型 | 一個**非語言的結果** |
| J 離線鞏固 | 練完之後**不練習的那段時間** |
| K 背景知識 | **你對這件事知道多少**（非語言） |
| L 可懂度工程 | 你的錯誤裡**哪些真的讓人聽不懂** |
| ⭐⭐ **M 聽覺詞彙** | ⭐ **一個字，以及它有沒有聲音版本、那個版本調得出來有多快** |

⭐⭐ **M 跟 G 最容易被混在一起，但它們的主張是對立的**：
- **G 說**：字你都認得，是**訊號**沒進來（Field：弱聽者認得的字在紙上都會）。
- **M 說**：訊號進來了也沒用，因為**那個字在你腦裡沒有聲音版本**，或者有但調得太慢。
- ⭐ **這不是學術爭論，它在我們系統裡已經有實際後果**：
  `listen_decode.js` 開頭明文寫着「⛔ 只挖功能詞，不挖內容詞：名詞動詞你猜得到」——
  **那是純 G 的立場**，而 M 說**內容詞能不能用耳朵認出來才是最強的單一預測因子**（第 4 節缺口 2）。

**⚠️⚠️ M 自己的三個弱點，要跟優點一起記**：
1. ⚠️ **因果證據薄**：唯一直接比較的實驗（N=100、6 次課）說聽覺教學不比書面教學好。
2. ⚠️ **跟書面詞彙高度重疊**（r = .88）——⛔ 不要說成「兩個獨立的能力」。
3. ⚠️ **「自動化」怎麼測還在翻案**（CV 無關、限時沒差）→ ⛔ 不要拿反應時間變異當分數。

- ✅ ⭐ **診斷極便宜**：一支手機、20 個字、15 分鐘就能知道有沒有這個病（第 5 節）
- ✅ ⭐ **對 Owen 的先驗機率很高**：他的詞彙全部從**課本與文字筆記**進來（`chunks.js` 由
  `french_notes.html` 抽取），而文獻說的正是這種學習者前者遠大於後者
- ✅ **材料零成本**：3,439 個法文字形已經在 repo 裡，每一個都有 TTS
- ✅ **指標客觀**（認出來／沒認出來／認出來但要想），不吃自評——⭐ 正好補 W37 缺口 4 的熟悉度錯覺
- ⛔ **它不會讓人多會一個結構**，也不會讓人變得有話講
- ⛔ **它只治「字」這一層**：句法沒剖析、功能詞沒收到，M 一點都幫不上（那是 G）
- ⛔ **療法未定**：目前只能當**選靶器**，⛔ 不要排成一個每天的新步驟
- **它適合的位置：⛔ 不另開時段，掛在既有的 3,393 張複習卡上**——
  ⭐ 讓同一張卡多一個「聽得出來嗎」的狀態，而不是多一張卡。
  ⚠️ 是否進每日流程**等第 5 節的體檢結果**（啞巴字比例 < 10% 就別做），⛔ 不要憑空排。

### 2.3 ⭐ 本週結掉的兩個懸案（都是「查完決定不立」）

1. **互動式聽力** → ⛔ 不另立，歸 **C ＋ I ＋ D**（理由見 1A ②）。
   ⭐ 這條結掉的是 **W41 1A ⑧** 留下的開放構念。
2. **音樂／節奏訓練** → ⛔ 不另立，而且進「不要做」清單（理由見 1A ③）。

---

## 3. 可以直接抄的實作參數

> ⚠️ 每一列都標依據等級。🟢 有樣本數的研究／🟡 實務二手／🔴 待驗證。
> ⛔ 第 1–3 節全部是摘要層級，**對過原文再寫進系統文案**。

| 參數 | 數值 | 依據 |
|---|---|---|
| ⭐⭐ **該練到哪一層** | **自動化**（認出來的速度），⛔ 不是「認不認得」 | Saito et al. 2025 *AP* 訓練研究 🟢 |
| ⚠️ **但「自動化」怎麼量** | ⛔ **不要用反應時間變異（CV）**（與聽力無關）；⛔ 也不要加時間壓力（限時 vs 不限時沒差）→ ⭐ **用「平均起手時間」這種最笨的指標就好** | Saito et al. 2026 *SLR* 🟢 ＋ 本檔推論 🔴 |
| ⭐ **測聽覺詞彙用哪種題型** | **meaning-recall（聽到字 → 講出意思）r = .58** ＞ meaning-recognition（四選一）r = .50 | Milliner, Matthews & McLean 2026 *Language Testing* 🟢 |
| ⭐⭐ **最能預測聽力的那一種詞彙知識** | **「用在脈絡裡」的判斷 r = .6–.7** ＞ 單字的 recognition／recall r = .4–.5 | Saito et al. *SSLA* 47(1) 🟢 |
| 聽覺 vs 書面詞彙對聽力 | ProPhon **r = .71／51% 變異** vs ProOrth r ≈ .39–.55 | Cheng & Matthews 2018（N=250）🟢 |
| ⚠️ **但不要期待「改成聽覺」自動變好** | 聽覺詞彙教學 vs 書面詞彙教學 **無顯著差異**（兩者都勝對照、中等效果量） | Bozorgian et al. 2025（N=100／6 次課）🟢 |
| ⚠️ 兩者的重疊 | **r = .88** | 中國 EFL 研究 🟢 |
| **單次訓練劑量** | **30 分鐘／80 個目標詞／160 trials**（判斷＋回饋）；字幕影片版用 **20 分鐘** | Saito et al. 2025 *AP* 🟢 |
| ⭐ 縮到 15 分鐘的換算 | **≈ 40 個目標詞／80 trials** | ⚠️ **按比例推論**，⛔ 無文獻 🔴 |
| **先練哪些字** | **低程度先吃高頻詞**；中頻要等程度上來（Owen 是 A2 ⇒ **只做高頻**） | *System* 2017 高/中頻研究 🟢 |
| 詞彙 ↔ 理解的天花板 | 閱讀 r = .57／**聽力 r = .56**（100+ 研究） | *LTR* 2022 統合分析 🟢（⭐ 對照 K 的內容知識 .41） |
| 卡片設計 | ⭐ **正面＝聲音，背面才給文字**；法文特別需要（`les amis` ≠ `les`＋`amis`） | Anki 社群指南 🟡 |
| ⛔ **不要做** | **音樂／節奏訓練**來改善聽力（只有相關，無因果遷移） | 多篇統合分析＋Zulu 研究 🟢 |
| ⛔ **不要做** | 把音檔或 Owen 的嘴交給 **ASR 自動判分**（對 L2 語音辨識不足） | McCrocklin 2026 🟢 |
| **考試格式（TCF CO）** | **39 題／35 分鐘／只播一次**；**NCLC 7 = 458–502 分**（滿分 699）；題目**由易到難、由慢到快** | 備考站 🟡🔴 **用前對官方（IRCC／France Éducation international）** |
| 考場策略 | 聽前先讀題與選項；對立連接詞（`mais`／`pourtant`／`en revanche`／`plutôt`）常標示答案；⛔ 小心「剛好聽到的字」就在干擾項裡（正解多為改述）；不留空白；漏字就放掉 | 備考站 🟡 |
| ⭐⭐ **錯因分類**（本週最可抄的一條） | 每組做完把錯題依**原因**分成四類：**①沒聽到 ②聽到但不認得 ③認得但太慢 ④聽懂但選錯**；只在檢討時重聽 | 備考站 🟡（四類的切法是本檔依 M 家族寫的 🔴） |
| 口音 | France／Québec／Belgique／Afrique francophone 輪練 | 備考站 🟡 |
| ⚠️ 法文聽覺詞彙量表 | **查無**已驗證工具（TTV 是書面的、LVLT 是英文的）→ 要自製 | 檢索空白 🟢 |
| 素材程度對應 | A2 → Little Talk in Slow French；B1+ → InnerFrench | 教師 newsletter 🟡（⭐ 與 `HANDOFF.md` 既有決定一致） |

---

## 4. 跟現有系統的缺口對照

> ⭐⭐ **這一節的數字不是檢索來的，是我在這個 repo 裡直接跑出來的，可以當事實。**
> 盤點對象：`review.html`、`sentence_drill.html`、`answer_card.html`、`chunks.js`、`sentences.js`、
> `listen_decode.js`、`listening.html`、`verb_sprint.html`、`research/data/vocab_*.json`、`verb_freq.js`。

### ⭐⭐⭐ 缺口 1（本週最嚴重）：**三副 SRS 牌組裡，沒有一張卡的正面是聲音**

| 牌組 | 張數 | 卡片正面 | 聲音在哪 |
|---|---|---|---|
| `chunks.js`（複習卡） | **3,393** | `review.html:156` `<div class="fc-front-zh">` ＝ **中文文字** | `review.html:398` `speak(card.fr)` — ⭐ **翻開之後**才響 |
| `sentences.js`（造句） | **498** 句 | `sentence_drill.html:161` 同款 `fc-front-zh` ＝ **中文文字** | 同樣在答案側 |
| `answer_cards.js` | **15** | `answer_card.html:162` `fc-q-zh` | — |

⭐ `review.html:398` 自己的註解寫着：「**翻開自動發音 — 眼睛＋耳朵同步輸入**」。
⚠️ **那句話描述的是一個「輸入」動作，不是一個「取回」動作。**
聲音在**答案揭曉之後**才出現 ⇒ **系統從來沒有要求過 Owen 用耳朵認出任何一個字。**

**規模**：我解析 `chunks.js` ＋ `sentences.js`，法文 token 去重後是 **3,439 個不同字形**。
每一個都接得到 TTS（`tts_reader.js`／`review.html` 的 `speak()`）。
⇒ ⭐ **材料 100% 齊備、使用率 0%。**

📌 **這正是文獻說的那一側**：系統練的是 ProOrth（對聽力 r ≈ .39–.55），
⛔ 完全沒有練到 ProPhon（r = .71／51% 變異）。
⚠️ **但要克制**：Bozorgian et al. 的實驗說「改成聽覺」**不保證**比書面好——
⭐ 所以這條的價值是**先量出差距**（第 5 節），⛔ 不是立刻把 3,393 張卡翻面。

### ⭐⭐ 缺口 2：唯一的解碼頁**明文規定不挖內容詞**，而那正是 M 說最關鍵的東西

`listen_decode.js:7–9` 的註解（原文照抄）：

> ⭐ 只挖功能詞，⛔ 不挖內容詞：名詞動詞你猜得到，功能詞猜不到，
> 而那正是連音吃掉的部分（les_amis／chais pas／t'as）

`TIER` 1–5 全部是功能詞：省音形 → `ne` → 冠詞 → 介系詞 → 代名詞／連接詞。

⭐ **這個設計在 G 家族的邏輯裡完全正確**，W37 也是這樣建議的。
⚠️ **但它同時意味著**：系統裡唯一一個「用耳朵填字」的練習，
**結構性地排除了「內容詞聽不聽得出來」這件事**——而 M 家族說那是最強的單一預測因子。

⇒ ⭐ **兩個家族在同一頁上打架，而系統只實作了其中一邊。**
⚠️ **這不是 bug，是一個要 Owen 決定的取捨**：挖功能詞練的是詞界，挖內容詞練的是聽覺詞彙。
⛔ 本檔不改程式，也不主張哪邊對。

### ⭐⭐ 缺口 3：「自動化＝起手時間」的機器**已經做好了**，只是沒接到耳朵上

`verb_sprint.html` 已經有一整套自動化量測：

- `verb_sprint.html:348` `const REFLEX_MS = 2000;` — 第一個按鍵 2 秒內 ＝ 反射
- `cellState()`：**連 3 次對、且中位起手 < 2s** → 標成 `reflex`
- `WEIGHT = { weak: 4, new: 3, slow: 2, reflex: 1 }` — ⭐ **已經在用自動化程度決定出題頻率**
- `FRENCH_OS.md` 的「反射標準：**起手時間**而非總作答時間」已經是拍定的設計決定

⭐⭐ **也就是說：M 家族要的那個指標，系統已經實作過一次了——但只在產出側（變位格）。**
⚠️ 聽覺詞彙辨識側 **0%**。
→ ⭐ 這是**已有零件的再利用**，不是新功能。
⭐ 而且 Saito 2026 的翻案（⛔ 別用 CV、⛔ 別加時間壓力）剛好跟系統現有做法一致：
`verb_sprint` 用的是**中位起手時間**、**後台記、不倒數**（`2026-10-02_限時練習與反射化` 的結論）。

### ⭐⭐ 缺口 4：**法文聽力語料的詞頻表 2026-09-03 就做好了，兩欄沒人用**

`research/data/vocab_A_listening_reading.json`（2026-09-03 產出）裡有：

| 欄位 | 內容 | 誰在用 |
|---|---|---|
| `top_verbs`（160 個） | 每個動詞的 `n_listening` / `n_reading` | ✅ `verb_freq.js`（註解明寫來源） |
| ⭐ `vocab_gap_top320` | 320 個高頻字，附 `n_listening` 與 `in_chunks_js` | ⛔ **0 個系統頁面** |
| ⭐ `register_listening_skewed`（70 個） | **在聽力語料裡顯著比閱讀語料多**的字，附 z 值與 `known` | ⛔ **0 個系統頁面** |

我跑出來的兩個數字：
- `vocab_gap_top320` 裡，**309 個字**在聽力語料出現 ≥ 20 次**且不在 `chunks.js`**。
- `register_listening_skewed` 的 70 個「偏聽力」的字裡，只有 **3 個**被標為未學（`cela`／`assez`／`surtout`）。

⭐ **怎麼讀這兩個數字（⚠️ 不要讀成「他缺 309 個字」）**：
- 第二個數字說：**最偏向口語的那些字，Owen 幾乎都「學過」**（在紙上）。
- 第一個數字說：但考試聽力語料的高頻字，**大部分不在他的卡片庫裡**。
- ⚠️ 兩者都是**文字層**的盤點 ——⛔ 它們完全不知道這些字 Owen 用耳朵認不認得。
- ⇒ ⭐ **這正是第 5 節要量的東西，而且抽題的清單是現成的。**

📌 另一個順手查到的：`research/data/vocab_plan.json`（2026-09-04 的詞彙組織方案）
把 40 張卡分成 **production 36 張 / listening 4 張** ——⭐ **系統自己的詞彙計畫就是 90% 產出側。**

### 缺口 5（三條舊缺口，⛔ 不重講內容，只記現況）

| 來源 | 缺口 | 現況（2026-11-02 grep） |
|---|---|---|
| W37 缺口 2 | TTS 語速寫死 | `listening.html:689` 仍是 `utt.rate = 0.78` — ⚠️ **兩輪聽力研究未動** |
| W41 缺口 5 | `CULTURE_BANK` 空 | `listening.html:830` 仍只有一行註解掉的範例 — ⚠️ 架構 07-10 定案至今約 **4 個月**，第一桶燃料還沒進來 |
| W41 缺口 7 | `listen_decode.html` 無入口 | `grep -rn listen_decode --include=*.html --include=*.js` → **repo 內 0 個外部引用** — ⚠️ 仍然不在 dashboard、不在 map |
| W41 缺口 1 | 聽力題正解位置偏斜 | `LISTENING_BANK` 仍是 18 篇／54 題，正解位置 **32 / 21 / 1** — ⚠️ **未修**。⛔ 在修好之前，不要用聽力測驗正確率做任何判斷 |

---

## 5. 一個 15 分鐘就能試的實驗（明天就能做，⛔ 不用等我改程式）

### 🧪「**啞巴字體檢**」——量出「眼睛會、耳朵不會」的字有多少

⭐ **它不是一個練習，是一次抽血。** 目的只有一個：**M 家族對 Owen 本人成不成立。**
如果啞巴字很少，這整份研究就該被擱置；如果很多，它是目前最便宜的一塊。

#### 準備（Claude 可以代勞，⛔ 不涉及自創法文）
從 `chunks.js` **已學課次**裡抽 **20 個內容詞**（名詞／動詞／形容詞，⛔ 不要功能詞）。
⚠️ 依內容鐵律，這是**從既有教材抽樣**，不是創作新句。
⭐ 抽樣可以偏向 `research/data/vocab_A_listening_reading.json` 的 `n_listening` 高的字（缺口 4）。

#### A 輪：眼睛（約 3 分鐘）
看到**法文字**（不播音）→ **3 秒內**講出中文。記 ✓／✗。

#### ⏸ 中間隔 ≥ 30 分鐘，並把順序打亂
⚠️ 不隔開＝在測「剛剛那個字」，不是在測聽覺詞彙。

#### B 輪：耳朵（約 5 分鐘）
用 `french_notes.html` 的發音鍵或手機 TTS **只聽**（⛔ 不看字）→ **3 秒內**講出中文。
每個字記三格之一：**✓ 幾乎立刻** ／ **△ 聽出來但想了一下（超過 3 秒）** ／ **✗ 沒認出來**。
⭐ **那個 △ 很重要**：依 Saito，那一維（自動化）才是跟聽力相關的那一維。

#### 結算：把 20 個字分進四格（約 2 分鐘）

| | 耳朵 ✓ | 耳朵 △ | 耳朵 ✗ |
|---|---|---|---|
| **眼睛 ✓** | 🟢 真的會 | 🟡 **慢**（＝自動化缺口） | 🔴 **啞巴字**（＝M 家族要治的病） |
| **眼睛 ✗** | （少見，記一下） | — | ⚪ **還沒學會**，⛔ 不是聽力問題 |

#### ⭐ 這個實驗要回答的具體問題
1. 🔴 **啞巴字的比例是多少？**
   - **< 10%** → ⛔ **M 對 Owen 不是瓶頸，這條就先擱著**，不要做任何功能。
   - **10–30%** → 值得掛在既有卡片上（缺口 1 的做法），⛔ 但不要另開步驟。
   - **> 30%** → ⭐ 這是目前最便宜的一塊，優先序要往上拉。
2. 🟡 **慢的比例是多少？** 如果 🔴 少但 🟡 多 ⇒ 問題不是「有沒有聲音版本」而是「調得太慢」
   ⇒ ⭐ 那指向缺口 3（把 `verb_sprint` 的起手時間機器接到耳朵上），不是指向新卡片。
3. ⚪ **有多少是根本還沒學會的？** 這一格要從分母扣掉——⛔ 不然會把「沒學過」誤判成「聽不出來」。

#### ⚠️⚠️ 這個實驗的侷限（要先寫出來，不然結果會被過度解讀）
- **20 個字、一個人、沒有對照組、沒有盲測**（Owen 自己判自己對不對）
- ⚠️ **只能告訴你「有沒有這個病」，⛔ 不能告訴你任何療法有效**
- ⚠️ TTS 不是真人：`les amis` 這類連音 TTS 唸得比真人**清楚**
  ⇒ ⭐ **TTS 測出來的啞巴字比例是下限**，真人只會更糟
- ⚠️ 單字離開句子 ⇒ 它測不到詞界切分（那是 G）
- ⭐ **依第 3 節，真正最能預測聽力的是「用在脈絡裡」的判斷（r = .6–.7）而不是單字（.4–.5）**
  ⇒ 這個 20 字版是**便宜版**，⛔ 不要把它當成完整的量表

#### ⭐ 免費的加條件（0 分鐘成本）
⭐ **把 B 輪安排在睡前，隔天早上起床 5 分鐘內重測 🔴 那幾個字**——
這樣同一次抽血順便驗 **J 家族**（W41 第 5 節的實驗至今沒做過）。⛔ 不要為此加任何新動作。

---

## 6. 🎮 怎麼讓它更好玩

> ⚠️ 三個做法都遵守 `CLAUDE.md`「練習頁鐵律」：⭐ **跳過必須是合法動作**（三層出口）、
> 跳過不計分、不進複習輪、重來時保持跳過、**badge 用灰色、措辭中性**。
> ⛔ 不准出現「你有 N 個字聽不出來」這種句子。

### ⭐⭐ 做法一：**金幣與銅幣**——同一張卡多一層進度，不多一張卡

現在 3,393 張複習卡只有一種狀態：會／不會。
⭐ 改成**兩種貨幣**：

| 貨幣 | 怎麼拿到 | 語意 |
|---|---|---|
| 🥉 **銅** | 看中文 → 寫出法文（＝現在的玩法） | 「紙上會了」 |
| 🥇 **金** | **只聽聲音** → 認出意思 | 「耳朵也會了」 |

- ⭐ **同一張卡可以從銅升級成金**——⛔ 不是新卡，是**同一張卡的第二面**。
- ⭐ **遊戲／夥伴只吃金幣**：這直接通過交付鐵律的「大腦檢查」——
  `clb7_chunk_srs` 多一個聽覺欄位 ⇒ 遊戲可以挑「還是銅的字」出題、金幣讓夥伴長大
  （跟 `clb7_vf_cells` 餵遊戲的既有做法同一個形狀）。
- ⭐ **為什麼這會好玩**：它讓**已經做完的 3,393 張卡憑空多出一整條進度條**，
  而且**不需要任何新教材、不需要 Owen 多背一個字**。
  ⚠️ 這也是它唯一的風險：如果第 5 節測出啞巴字 < 10%，這條進度條一開就幾乎全金 ⇒ ⛔ 不好玩，別做。

### ⭐ 做法二：**「3 秒鈴」**——借 `verb_sprint` 已經做好的那台機器

- 播一個字的聲音 → Owen 按「我知道」→ 計**起手時間**（⛔ 畫面不倒數，後台記，照
  `2026-10-02_限時練習與反射化` 的既有結論）。
- ⭐ **超過 3 秒也算對**，只標成「想過的」——⛔ 不扣分、不進錯題本。
- 畫面上只給**一個數字**：**今天有幾個字是不用想的。**
- ⭐ 直接沿用 `REFLEX_MS = 2000` 與 `WEIGHT = { weak:4, new:3, slow:2, reflex:1 }`：
  **站穩的字自動變少出現**，Owen 的時間自動流向還要想的字（教學鐵律「練習時間集中在還在消耗工作記憶的節點」）。
- ⚠️ **依 Saito 2026，⛔ 不要用反應時間變異（CV）當分數**，也⛔ 不要加時間壓力的懲罰——
  ⭐ 系統現有的「中位起手時間」就是對的那個指標。

### ⭐ 做法三：**「會說話的字」清單**——把第 5 節的四格做成可收集的東西

- 第 5 節那張 2×3 的表就是一個**天然的收集介面**。把 🔴 那一格命名成
  ⭐ **「還沒開口的字」**（⛔ 不是「你聽不出來的字」）。
- 每把一個字從 🔴 搬到 🟢，動畫一次 ＋ 計數 +1。灰色 badge、中性措辭。
- ⭐ **三層出口照 `table_drill.html` 的黃金範本**：
  單字「這個會了」／整輪「⏭ 這題跳過」（只跳**還沒答**的）／今日步驟「今天跳過」且**不擋後面的步驟**。
  跳過記進 `clb7_*_known`（物件形狀 ＋ `last` 欄位）**降低出現頻率**，⛔ 不刪掉那個字。
- ⭐ **為什麼這條特別適合 Owen**：它把一個聽起來像壞消息的診斷（「你有一堆字是啞的」）
  變成一個**明確會變短的清單**。⚠️ 而這也是它要小心的地方——
  ⛔ 清單不能顯示總長度帶來的壓迫感，只顯示**今天搬走了幾個**。

### ⚠️ 一個刻意不提的玩法
⛔ **不要做「聽音樂／節奏遊戲來練耳朵」**——1A ③ 查完是只有相關、無因果遷移，
而且跟 `2026-10-02_節奏唱誦與記憶術記變位.md` 的結論撞在一起。它會很好玩，但它不會有效。

---

## 7. 來源清單

### 研究（🟢 摘要層級：作者／年份／樣本數來自檢索摘要，⛔ 本週全部未讀到原文，egress proxy 擋掉）

**M 家族（聽覺詞彙）**
- Cheng, J. & Matthews, J. (2018). The relationship between three measures of L2 vocabulary knowledge and L2 listening and reading. *Language Testing*, 35(1), 3–25. N = 250. — https://eric.ed.gov/?id=EJ1163897 ／ https://www.researchgate.net/publication/322195612_The_relationship_between_three_measures_of_L2_vocabulary_knowledge_and_L2_listening_and_reading
- Saito, K., Uchihara, T., Takizawa, K. & Suzukida, Y. Individual differences in L2 listening proficiency revisited: Roles of form, meaning, and use aspects of phonological vocabulary knowledge. *Studies in Second Language Acquisition*, 47(1), 26–52. — https://www.cambridge.org/core/services/aop-cambridge-core/content/view/0AB54264DF81D0A2CC5A30D8F699BDFE/S027226312300044Xa.pdf/individual-differences-in-l2-listening-proficiency-revisited-roles-of-form-meaning-and-use-aspects-of-phonological-vocabulary-knowledge.pdf
- ⭐ Saito, K., Uchihara, T., Takizawa, K. & Suzukida, Y. Declarative and automatized phonological vocabulary knowledge in L2 listening proficiency: A training study. *Applied Psycholinguistics*. N = 133（⚠️ 勘誤寫 126）。 — https://www.cambridge.org/core/journals/applied-psycholinguistics/article/declarative-and-automatized-phonological-vocabulary-knowledge-in-l2-listening-proficiency-a-training-study/51142963AC07BF241EDF0F2C2ADA1586 ／勘誤：https://www.researchgate.net/publication/404656743_Declarative_and_automatized_phonological_vocabulary_knowledge_in_L2_listening_proficiency_A_training_study_-_CORRIGENDUM
- ⚠️ **反方**：Bozorgian, H., Nasari, A. & Matthews, J. (2025). The effects of aural and written vocabulary instruction on second language listening comprehension. *Pedagogies*. N = 100、6 次課。 — https://www.tandfonline.com/doi/full/10.1080/1554480X.2025.2456553 ／ https://researchers.une.edu.au/en/publications/the-effects-of-aural-and-written-vocabulary-instruction-on-second/
- ⚠️ **反方 2**：Saito, K., Hosaka, I., Suzukida, Y., Takizawa, K. & Uchihara, T. (2026). Timed vs. untimed lexicosemantic judgement task for measuring automatized phonological vocabulary knowledge. *Second Language Research*. — https://doi.org/10.1177/02676583261420616
- Milliner, B., Matthews, J. & McLean, S. (2026). Exploring the capacity of three item formats for an aural vocabulary levels test (VLT) to predict L2 listening comprehension. *Language Testing*. — https://doi.org/10.1177/02655322261428738
- 詞彙知識 ↔ 閱讀/聽力統合分析（100+ 研究），*Language Teaching Research* 2022：閱讀 r = .57／聽力 r = .56。 — https://eric.ed.gov/?id=EJ1342379 ／ https://www.researchgate.net/publication/340326397_The_relationship_between_vocabulary_knowledge_and_L2_readinglistening_comprehension_A_meta-analysis
- 高/中頻詞與程度的調節：*System* (2017). Vocabulary for listening: Emerging evidence for high and mid-frequency vocabulary knowledge. — https://www.sciencedirect.com/science/article/abs/pii/S0346251X17300532
- 個別差異（聽覺詞彙 ＞ 工作記憶 ＞ 書面詞彙），N = 130。 — https://www.researchgate.net/publication/330588579_Exploring_the_impact_of_individual_differences_in_aural_vocabulary_knowledge_written_vocabulary_knowledge_and_working_memory_capacity_on_explaining_L2_learners'_listening_comprehension
- 跨模態與 meaning recall：Hamada，*International Journal of Applied Linguistics*。 — https://onlinelibrary.wiley.com/doi/10.1111/ijal.70200
- 近身複製：Matthews et al. (2024), *TESOL Quarterly*（Cheng, Matthews, Lange & McLean 2022 的近身複製）。 — https://onlinelibrary.wiley.com/doi/full/10.1002/tesq.3212
- 法文**書面**詞彙量表 TTV：Batista & Horst (2016), *Canadian Modern Language Review*。 — https://doi.org/10.3138/cmlr.2820 ／ https://www.lextutor.ca/tests/batista_horst_2016.pdf

**互動式聽力（⛔ 查完不另立家族）**
- Lam, D. M. K. & Goh, C. C. M. (2026). Listening beyond comprehension: Towards a taxonomy of second language interactive listening skills. *RELC Journal*. — https://doi.org/10.1177/00336882261448243
- 初級華語的互動式聽力評量：Wan，*Chinese as a Second Language*。 — https://www.jbe-platform.com/content/journals/10.1075/csl.00051.wan
- Duolingo English Test, Interactive Listening（技術文件）。 — https://duolingo-papers.s3.amazonaws.com/other/Interactive+Listening+%E2%80%93+The+Duolingo+English+Test.pdf
- L2 聽力評量的構念回顧（*The Handbook of Second Language Listening*, ch.13）。 — https://onlinelibrary.wiley.com/doi/10.1002/9781394312375.ch13
- AI 與聽說的發展／評量回顧，*Annual Review of Applied Linguistics*。 — https://www.cambridge.org/core/journals/annual-review-of-applied-linguistics/article/developing-and-assessing-second-language-listening-and-speaking-does-ai-make-it-better/8F12356CE315EDC807C1C82F3DBCB7A9

**音樂／節奏（⛔ 查完不另立家族，進「不要做」清單）**
- Is musical ability related to second-language acquisition? A meta-analysis. *Royal Society Open Science* 12(1), 241193. — https://royalsocietypublishing.org/rsos/article/12/1/241193/92888/Is-musical-ability-related-to-second-language
- 音樂能力 ↔ 語音韻律感知統合分析（109 研究），*Journal of Phonetics*。 — https://www.sciencedirect.com/science/article/pii/S0095447023000670
- 節奏促發在 L2 感知依賴音樂背景。 — https://www.sciencedirect.com/science/article/pii/S0001691825011588
- Zulu 音位：節奏感知有關、音樂訓練無關。 — https://pubmed.ncbi.nlm.nih.gov/28204984
- ⚠️ 旁證（不同族群）：聽損者無證據。 — https://journals.sagepub.com/doi/10.1177/2331216520985678

**ASR 與 AI 的工程邊界**
- ⭐ McCrocklin, S. (2026). ASR-Dictation Accuracy for Second Language Speech. *Human Behavior and Emerging Technologies*. — https://onlinelibrary.wiley.com/doi/10.1155/hbe2/5762328
- ASR vs 母語聽者的可懂度判斷，*ReCALL*。 — https://www.cambridge.org/core/journals/recall/article/abs/assessment-of-l2-intelligibility-comparing-l1-listeners-and-automatic-speech-recognition/7E499AD990383AC65A9688BB5BE17887
- AI 語音辨識對 EFL 聽力／flow／焦慮的 RCT，*Humanities & Social Sciences Communications*。⚠️ 對照組也進步。 — https://www.nature.com/articles/s41599-025-04672-8
- ASR 在 L2 學習的 PRISMA 回顧，*Languages* 8(4), 242。 — https://doi.org/10.3390/languages8040242
- AI App 改善母音對比的感知與產出。 — https://www.nature.com/articles/s41599-026-07186-z
- （⭐ L 家族、W44 已處理，此處只記存在）Hirschi et al. (2025), *Language Learning*。 — https://onlinelibrary.wiley.com/doi/10.1111/lang.12719

**其他（檢索過但本檔只當旁證）**
- 檢索「retrieval practice × L2 listening」→ ⚠️ **查無**直接實驗；最近的是土耳其語口語對話研究與閱讀側的 free recall 研究。 — https://link.springer.com/article/10.1007/s12144-024-06481-9 ／ https://link.springer.com/article/10.3758/s13423-013-0450-z
- 字幕影片建立宣告式與自動化詞彙知識的潛力與極限，*Language Teaching Research* (2026)。 — https://journals.sagepub.com/doi/10.1177/13621688251413734

### 實務／社群（🟡 無對照組）
- TCF Canada 聽力三組免費練習與考場建議（商業備考站）。 — https://tcfcad.com/en/comprehension-orale.html
- NCLC 7 的分數與 CRS（商業備考站）。 — https://tcfcad.com/blog/niveau-nclc-7-tcf-canada.html
- TCF Canada 聽力「7 個秘訣」＋錯因分類（商業備考站）。 — https://www.tcfenligne.com/comprehension-orale-tcf-canada/
- NCLC 7 指南（商業備考站，⚠️ 同一站內有自相矛盾的敘述）。 — https://www.tcfenligne.com/nclc-7-tcf-canada/
- TCF Canada 聽力練習與干擾項陷阱（商業備考站）。 — https://nclcfrench.com/tcf-canada-listening-practice
- TCF Canada 分數對照（商業備考站）。 — https://www.tcfcanada.ai/en/guide/nclc-score-guide
- TEF（Wikipedia，格式參照）。 — https://en.wikipedia.org/wiki/Test_d%27%C3%A9valuation_de_fran%C3%A7ais
- 法文老師 newsletter 的分級 podcast 清單。 — https://myfrenchroutine.substack.com/p/mes-podcasts-preferes-en-francais
- 用訪談練理解（同一位老師）。 — https://myfrenchroutine.substack.com/p/comprendre-une-interview-camille
- Lawless French 的 dictées。 — https://www.goodreads.com/author_blog_posts/14931544-scribe-dict-es
- 商業聽寫課程（⚠️ 廠商說法，只取其客群描述「高 A2／B1 聽不懂口語法文」）。 — https://cathyintro.gumroad.com/l/2-weeks-dictations-program
- Anki 語言學習指南（⭐「只有聲音」的卡、liaison 的理由、AwesomeTTS／Forvo）。 — https://slidetoanki.com/blog/anki-for-language-learning
- 法文 Anki 牌組指南。 — https://speakada.com/anki-french-flashcards/
- 5000 高頻法文字共享牌組（AnkiWeb）。 — https://ankiweb.net/shared/info/893324022
- 一位學習者的 A2 → B2 自述。 — https://stuartwiffin.substack.com/p/from-a2-to-b2
- 魁北克法文的學習者向說明（⚠️ 部落格估計值，⛔ 不是研究）。 — https://www.italki.com/en/blog/how-to-learn-quebec-french
- 消費級法文聽覺詞彙量工具（⛔ 無驗證）。 — https://www.lenguia.com/tools/vocabulary-size-test/french

### 🔴 待驗證 / ⛔ 不要引用
- **TCF Canada 的 39 題／35 分鐘／458–502 分**：全部來自**商業備考站**，且站與站之間（甚至同一站內）
  有互相矛盾的敘述。⛔ **在對過 IRCC 與 France Éducation international 官方頁之前，不要寫進系統文字。**
- **Cheng & Matthews 2018 的閱讀相關**：一處寫 **r = .57**、另一處引用寫 **.46**。⛔ 用前對原文。
- **Saito et al. 2025 訓練研究的樣本數**：摘要 **133**、勘誤 **126**。⛔ 用前對勘誤。
- **「15 分鐘 ≈ 40 詞／80 trials」**：⚠️ 本檔自己按比例推的，⛔ 無任何文獻支持。
- **魁北克口音「2–4 週集中暴露就能適應」**：⛔ 部落格估計值，無研究。本週**查無**歐洲法文學習者
  理解魁北克法文的對照實驗。
- ⚠️ **Reddit 本週完全無法檢索** → 1B 節缺少學習者社群的材料，⛔ 不要把 1B 當共識。

---

## 8. 下一週（W46 → 餘 2 → 📖 閱讀）之前，這份留下的四個開放問題

1. ⭐⭐⭐ **第 5 節的體檢要先做，其他全部等它。** 🔴 啞巴字 < 10% ⇒ M 家族對 Owen 不成立，
   ⛔ 第 4 節的缺口 1／2／3 一條都不要動。**這是本檔唯一的前置條件。**
2. ⭐⭐ **`listen_decode.js` 要不要開始挖內容詞？**（缺口 2）
   這是 **G 與 M 的正面衝突**，⛔ 本檔不主張任何一邊。⭐ 而且有一個更便宜的前提問題：
   **這一頁至今 0 個入口、Owen 一題都沒做過**（W41 缺口 7 仍未修）——
   ⚠️ 依 Chang 2024（方法不顯著、時長顯著），**「他會不會打開它」比「挖哪種字」更決定結果**。
3. ⭐ **「聽覺欄位」要加在 `clb7_chunk_srs` 裡還是另開一個 key？**
   ⚠️ 這牽到 `sync_supabase.js` 的物件合併慣例與雲端被推空三次的歷史 ⇒ ⛔ 不是研究問題，
   是 Owen 與實作的決定。⭐ 但方向上，第 6 節做法一（同一張卡的第二面）比「新牌組」便宜得多。
4. ⚠️ **本週三個被擋的 host（`eric.ed.gov`／`www.kazuyasaito.net`／`discovery.ucl.ac.uk`）要不要進白名單？**
   ⭐ 這是第七次全檔停在摘要層級。Saito 那三篇的**真實訓練設計與效果量**就在被擋的 PDF 裡，
   ⚠️ 而第 3 節的劑量參數（30 分鐘／80 詞／160 trials）目前只有一行檢索摘要支撐。
