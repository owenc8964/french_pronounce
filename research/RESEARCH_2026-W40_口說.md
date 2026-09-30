# RESEARCH 2026-W40 ｜🗣 口說 Expression orale

> 每週輪替研究第 4 週（ISO W40，40 % 4 = 0 → 口說）。⛔ 研究是**設計依據**，不是待辦清單。
> 前三週：W37 聽力（新家族 G）／W38 閱讀（無新家族）／W39 寫作（新家族 H）。
> ⭐ **本週結論一句話**：口說這一格**不缺方法，缺的是一個地圖上沒有的家族（I 任務型）**；
> 而 2025 年有四篇新研究**直接修正**了我們現行的 4/3/2 與間隔參數——
> 其中最重要的一條是 ⭐⭐ **「換題不換骨架」（procedural repetition）買到的是準確度與複雜度，
> 而我們把它寫成了「最後才做的驗收」**。

---

## ⚠️ 先講查證的限制（跟 W37／W39 同一條）

這個雲端環境的 egress 白名單**擋掉了幾乎所有學術站與多數部落格**：本次實測 `sciencedirect.com`／
`onlinelibrary.wiley.com`／`cambridge.org`／`journals.sagepub.com`／`ncbi.nlm.nih.gov`／`arxiv.org`／
`eric.ed.gov`／`api.semanticscholar.org`／`commeunefrancaise.com`／`french.kwiziq.com`／
`lefrancaisdesaffaires.fr`／`reddit.com` **全部 403**（WebFetch 與 curl 都試過）。

→ **所以本檔所有數字都是【檢索摘要層級】**（🟢 標記），⛔ 不是讀原文逐字查證的。
逐條標了可信度；凡摘要互相衝突的，**並陳，不挑一邊**（見 §1.1 A(5)）。
⚠️ 依 memory `feedback_ask_owen_to_fetch`：**要把某一條變成可靠依據，請 Owen 自己抓 PDF，
⛔ 不要讓 Claude 找鏡像繞路**（那次繞路直接生出了錯誤答案）。

---

## 1. 這週查到什麼

### 1.1 研究證據

#### A. 任務重複：2025 年有四條新證據，其中三條修正我們現在的做法

**(1) 連做的代價被量出來了——而它跟我們的完成門檻互相打架**
🟢 Hanzawa & Suzuki (2022, *SSLA*)「Massed task repetition is a double-edged sword for fluency development」。
EFL 課堂學習者把**同一個口頭敘事任務做 6 次**，三種排程：一堂課內連做 6 次（massed）／
一堂課的頭尾各 3 次（short-spaced）／相隔一週的兩堂課各 3 次（long-spaced）。

| 結果 | 方向 |
|---|---|
| **停頓（breakdown fluency：clause 中與 clause 尾的停頓）** | ⭐ **massed 降得最多** |
| **語速（articulation rate）** | ⛔ **massed 變慢** |
| **修補（repair fluency：逐字重複）** | ⛔ **massed 變多** |
| 一週後用**新的**卡通做延遲後測 | 排程效果有限 |
| 一週後再講**同一個**卡通 | massed 組的逐字重複仍然較多 |

⭐⭐ **這條對我們的直接影響**：`PRACTICE_ORAL.md` 已有「⛔ 只做三輪不要六輪（g = −1.73）」，
**方向對，但機制我們寫錯了**。連做買到的**不是**「整體更流暢」，是**「停頓變少」這一項**，
代價是**語速變慢＋逐字重複變多**。
而 `SPEAKING_METHOD.md` 第十節的完成門檻同時要求 **「停頓 ≤ 3 次」與「語速 55–70 秒穩定」**——
⛔ **這兩個指標在連做的條件下會往反方向走，所以不能在同一輪同時驗收。**
→ 修法：**連做的那一輪只驗停頓；語速要在「隔天／隔幾天的第一次」量**，那才是沒被 massed 汙染的數字。

**(2) ⭐⭐ 本週最重要的一條：exact 與 procedural 重複買的是不同東西**
🟢 轉述自 2025 年一篇口說任務重複研究的文獻回顧（Kim & Li, 2024 等）：

- **exact repetition（同一題講很多次）** → 主要買**流暢度**
- ⭐ **procedural repetition（同一套程序、換內容）** → **整體與過去時的準確度優於 exact，且不論回饋型態**
- 另一條同向證據：**講三個不同故事（varied practice）比同一個故事講三次得到更高的句法複雜度**
- ⚠️ **反面並陳**：Reghioua (2018)／Amiryousefi (2016) 報告 **exact TR 在 CALF 上更好** → 證據是混的

⭐⭐ **這條給我們自己發明的「移植測試」一個新身分。**
`SPEAKING_METHOD.md` 第十節把「同一組骨架搬到別的題目」寫成**階段 6 的驗收**、寫成「分水嶺」。
證據說：**它同時是針對準確度與句法複雜度最有效的練習形態。**
→ ⛔ **不該排在最後**。exact 與 procedural 不是先後關係，是**買不同東西的兩種 rep**，應該並排在同一週裡。

**(3) ⭐⭐ 4/3/2 的兩個前提被翻了一半**
🟢 System (2025)「Effects of the 4/3/2 activity revisited: Aptitude matters, but distributed practice does not」
（對象：中國大學英語學習者）：

| 發現 | 對我們的意思 |
|---|---|
| 4/3/2 顯著促進**流暢度的某些面向，但不促進準確度**，⭐ **不論間隔條件** | 4/3/2 是流暢度引擎，⛔ **不要期待它修準確度** |
| ⭐⭐ 流暢度增益（clause 中停頓、過去式錯誤率）與**聽覺處理能力**顯著相關，**而不是工作記憶** | 見下一段 |
| 分散練習（massed vs spaced）**效果有限** | ⚠️ 「3 天間隔」在 4/3/2 這個活動上**看不出差別** |

- ⚠️ **「3 天間隔優於 7 天」要縮回它的適用範圍**：Suzuki (2017) 那個研究練的是**構詞的口語產出自動化**，
  不是 4/3/2 這個活動。`SPEAKING_METHOD.md` 把它當成口說的普適排程參數 → **過度外推**。
  → **排程可以放鬆**，⛔ 不要為了「剛好第 3 天」把行程卡死（這也少一個摩擦點）。
- ⭐⭐ **本週最值得記住的跨家族連線**：如果 4/3/2 的流暢度增益是被**聽覺處理精度**預測的（而不是工作記憶），
  那 **G 家族（感知解碼訓練）就不只是聽力的藥，它是口說流暢度「增益率」的上游**。
  這跟 METHOD_MAP 的 G 段已有的「HVPT → 產出遷移（訓練過項目 +10.5%）」是同一個方向的**第二個獨立證據**。
  ⚠️ 但這是**相關**不是實驗操弄，且樣本是中國大學英語學習者，跨語言外推要打折。

**(4) 「隔幾天再練」這個參數，文獻裡其實沒有被好好研究過**
🟢 Rogers & Li (2025, *LTR*)，**107 篇** 1996–2023 的口說任務重複研究系統性回顧：
**多數研究的間隔設計是照前人做法或實務方便決定的，不是理論推導的。**
→ ⭐ 誠實的結論：⛔ **不要再把「同一題隔 N 天」當鐵律寫進系統。** 它現在的證據等級不支持鐵律。

**(5) ⚠️ 有一篇 2025 的任務重複統合分析，但我拿到兩份互相衝突的摘要**
同一篇（System 2025, *Task repetition and L2 oral performance: A meta-analysis*，三層統合模型）：
一份檢索摘要說「對句法複雜度與準確度影響大，流暢度與詞彙複雜度增益較小」，
另一份說「流暢度穩定改善，複雜度與準確度混雜」。原文被擋。
→ ⛔ **本條不當證據用，只登記它存在。** ⭐ 這是本週最該由 Owen 抓原文的一篇（它是最新、最全的那一份）。

#### B. ⭐⭐ TBLT：地圖上沒有的第九個家族，而且它自己有一場方法論的架

METHOD_MAP 的「還沒查的」明寫：**「尚未查的是 TBLT 在口說側的版本（真實任務帶語言，跟 A 的操練觀不同）」**。
本週查了。它符合新家族的條件，**也符合「證據要並陳」的條件**：

| 來源 | 數字 |
|---|---|
| Bryfonski & McKay (2019, *LTR*)，**52 篇** | TBLT 實施的整體效果 **d = 0.93**（強） |
| ⚠️ Xuan, Cheung & Liu (2025, *LTR*) 技術評論 | 指出三個問題（**納入標準寬鬆／效果量計算過度簡化／忽略調節變項**），重做後 **g = 0.61** |
| ⚠️ Boers & Faez (2023, *LTR*)「Are we there yet?」 | 重新檢視那 **27 篇比較研究**，立場更保守 |
| 口說側系統合成＋統合分析 | 整體 TBLT 對**口語產出 d = 0.78**；且任務重複與 task 前規劃對**流暢／準確／複雜三面向都有正向作用** |
| ⚠️ **科技中介** TBLT 統合分析（*CALICO*） | **g = .384，剔除兩個離群值後 g = .265**（明顯小） |
| Jackson & Suethanapornkul (2013, *Language Learning*)，17 篇綜合／**9 篇進統合** | 提高 resource-directing 任務需求 → **準確度 d = 0.28（小而正）、流暢度 d = −0.02（小而負）**；⛔ **句法複雜度的預測沒被證實** |

**任務的操作型定義（Long；這部分不需要相信效果量也能用）**：
- **target task ＝ 真實生活裡真的要做的事**（例：填一份工作申請）→ **pedagogic task ＝ 它的簡化近似版**
- 排序依**任務複雜度**，⛔ 不是語言複雜度
- ⭐ **「找不同」不算任務**——因為現實生活沒有這件事（Long 的判準字面如此）
- **task-essentialness**：一個任務讓某個語言結構變成「必要／有用／自然」——這是設計旋鈕

⭐⭐ **為什麼它是新家族而不是 A 的變體**：A 的重複單位是「語言項目」，
C 的單位是「事先打磨好的一段話」，H 的單位是「你寫的那一篇」。
**I 的單位是一個有非語言結果的任務**——語言不是練習對象，是**被任務徵召出來的東西**。
⛔ 我們全站 100% 是練習題，**沒有任何一頁的成功條件是「事情辦成了」**。詳見 §2 與 §4。

#### C. AI 對手（D 家族）：三條更新，其中一條跟 METHOD_MAP 現有敘述衝突

- ⭐⭐ 🟢 **Hou & Min (2026, *ReCALL* 38(1))，16 篇／89 個效果量，專門針對「口說發展」**：
  整體 **g = .61**。**顯著的調節變項只有三個：系統類型、系統的「意義約束」（meaning constraint）、系統模態。**
  ⛔ **不顯著的包括：矯正回饋、L2 程度、學段、介入長度、互動類型、測量方式。**
  → ⚠️ **這跟 METHOD_MAP 的 D 段衝突**：那裡寫「『用 AI 有效』有證據，『怎麼用最有效』還沒有」。
  現在有一部分了，而且**結論反直覺**：**回饋不是關鍵變項，系統形態才是。**
  ⭐ 對 Owen 的意思：⛔ **不要把力氣花在調「請你糾正我的錯誤」那種 prompt**（那是回饋維度），
  ✅ 要花在**讓對手有語音模態、且任務有意義約束**（＝有一個非語言的目標要達成）——⭐ 剛好就是新家族 I。
- ⚠️ **聊天機器人統合分析的數字散得很開**：g = 0.484（28 篇／70 ES）／**0.608**（31 篇／41 ES，METHOD_MAP 已收）／
  0.795（29 篇）。→ ⭐ **同一件事三份統合分析差 1.6 倍**：「AI 有效」可以講，⛔ **「有多有效」不要引單一數字**。
- **ASR（*ReCALL* 統合分析，15 篇／38 ES，2008–2021）**，補上 SOLO_A 的 A10 缺的具體數字：
  整體 **g = 0.69**；**音段 0.82 ＞ 超音段 0.37**；**顯性回饋 0.86 ＞ 隱性 0.50**；
  ⚠️⚠️ **一個人練 g = 0.44、有同伴 g = 0.89**；⚠️⚠️ **1–4 週 g = 0.07（幾乎是零）**。
  → ⭐ 對 Owen 最重要的是最後兩條：**單人用 ASR 的效果只剩一半，而且四週內看不到東西。**
  這不是不要做，是 ⛔ **不要用四週的結果判斷它有沒有用**（我們的「試一個實驗然後看數據」習慣在這裡會誤判）。
- 🟢 機器人輔助口說統合分析（Wang 2026, *European Journal of Education*）：89 篇篩到 **15 篇**，
  Hedges' g，調節變項含焦慮／學段／樣本數。⚠️ **效果量數字沒拿到（Wiley 被擋），只登記存在。**

#### D. 默唸 vs 出聲：專案的鐵律需要一條界線

現行鐵律（`SPEAKING_METHOD.md` 五-1、十一-3）：**「一定要出聲，默唸完全沒碰到 Articulator」**。
**對 Articulator 成立**，但它常被讀成「默唸沒用」——那就過頭了：

| 來源 | 數字／結論 |
|---|---|
| 🟢 提取練習的 mini meta-analysis（4 個研究） | **covert（心裡想）與 overt（講出來）的提取效果量相當** |
| 🟢 L3 **法文**詞彙三實驗（60 組法—英詞對） | overt（實驗1）與 covert（實驗2）**都出現顯著提取效果** |
| ⚠️ 反面 | **沒有回饋的 covert 提取，好處幾乎消失**；且部分近期統合分析仍報告 overt 優於 covert |
| 🟢 Driskell et al. (1994) 心理演練統合分析，**60 篇／146 個效果量** | 整體 **d = 0.48**；⭐ **認知成分重的任務效果大於純動作任務**；對**已有一些經驗**的人效果較好 |

→ ⭐ **修正後的正確說法（建議寫進 `SPEAKING_METHOD.md` 而不是本檔）**：
**Formulator（想得起來、組得出句子）可以用默想練**，而且在通勤／不能出聲的場合是**合法的練習**；
⛔ 但 **Articulator（唸得順）與 Monitor 不能默想**，而且**默想一定要接一個答案鍵**
（＝ `SOLO_A` 的 A8 口說版雙向翻譯，那是我們唯一有答案鍵的自檢迴路）。
⚠️ 這是**界線的補充，不是推翻**——「唸到順為止」那條完全不動。

### 1.2 社群做法（⚠️ 全部是【軼事】／【廣泛實踐】，⛔ 不是實證）

- **每日雙段協定**（多個法語自學部落格同形）：早上**出聲敘述今天的行程 2–3 分鐘**；
  晚上錄一段 **5–10 分鐘的語音備忘**總結這一天。
- ⭐ **B2 階段的週配額，我見過最具體的「準備時間交錯」設計**：
  **一週四段錄音——兩段準備 5 分鐘，兩段只給 30 秒就開始。**
  → ⭐ 對 Owen 特別對得上：考試給的是 **1 分鐘**，而這個設計刻意讓「有準備」與「幾乎沒準備」交錯出現。
- **四週回聽**：比對相隔四週的兩段錄音。⚠️ 這是**動機主張**，⛔ 不是成績主張。
- ⭐⭐ **一條對我們最有價值的警告（TCF/TEF 備考圈）**：
  **ChatGPT 語音會把你的法文「整理乾淨」——`euh`、`bah` 這些填充詞消失、false start 被平滑掉、猶豫不見了**；
  而且它**不按 TCF 評分表評分、不會替你計時**。
  → ⭐⭐ **含意很硬：AI 可以當對手，⛔ 但不能同時當流暢度的量尺。**
  它抹掉的正好是你要量的那個東西（停頓、修補、false start）。**量流暢度只能靠自己的錄音。**
- 官方 TEF（Le français des affaires）自己有一頁「用 AI 準備 TEF」→ ⚠️ 被 egress 擋掉，
  ⛔ **只登記它存在，內容未讀、不引用。** ⭐ 這是第二個該請 Owen 抓的頁面（它是官方立場）。
- **角色扮演**被自學者回報為「最有轉變的一項」（出國前先在家演咖啡廳對話）。
- 播客派自己的誠實話：「**播客永遠是聽的活動，它不會要你回答、不會等你**」
  → ⭐ 跟專案已排除的「把 podcast 當口說訓練」完全一致，**不必再驗**。
- 補習圈的共識句：「**口說是 TCF 四科裡唯一需要夥伴才能有效練的一科**」。
  ⚠️ 這是商業方在賣課，**當立場不當證據**；⭐ 但它跟 ASR 統合分析的「單練 0.44 vs 有伴 0.89」**方向一致**，
  **兩個獨立來源同向，值得記一筆**（而且它也是 `2026-09-22_單人口說沒有真人聽眾的影響` 那份的延伸）。
- **非同步語音交換**（HelloTalk 形態）：白天互丟語音訊息、把彼此的語言點寫成 notes 留在聊天室。
  → ⭐ 它是「有真人、但沒有即時壓力」的中間態，⚠️ 但它引入外部依賴與社交摩擦，**Owen 對摩擦很敏感，先只記錄**。

---

## 2. 家族歸類

| 發現 | 家族 |
|---|---|
| massed vs spaced 的雙面刃、4/3/2 修正、exact vs procedural | **A 刻意練習**（都是 A 內部的參數修正） |
| Rogers & Li：間隔參數沒被好好研究 | **A**（是 A 的知識邊界，不是新家族） |
| ⭐ 4/3/2 增益由**聽覺處理**預測 | **G 感知解碼** →（上游）→ **A**：⭐ **跨家族連線，本週最值得記的一條** |
| 移植測試 ＝ procedural repetition | **C 語言島**（骨架可調度）＋ **A**（練習形態）⭐ **兩個家族在這裡重疊，這就是它價值高的原因** |
| Hou & Min：模態與**意義約束**才是調節變項 | **D AI 對話夥伴** → ⭐ 指向 **I** |
| ASR 單練 0.44／有伴 0.89／短期 0.07 | **D**（能力邊界） |
| ChatGPT 語音抹掉填充詞 | **D 的反面**：⛔ 它不能當量尺 |
| covert 提取與心理演練 d = 0.48 | **A**（補一條界線：Formulator 可默想、Articulator 不行） |
| 每日敘述／四段錄音週配額／四週回聽 | **F 動機工程** ＋ **A** |
| ⭐⭐ **TBLT／真實任務** | ⛔ **A–H 都沒有** → **新家族 I** |

### ⭐⭐ 新家族 I：任務型／真實任務帶語言（TBLT）

**已補進 [`METHOD_MAP.md`](../METHOD_MAP.md)**（照現有格式：核心機制／證據／優缺點／它適合的位置）。

**它的槓桿是什麼**：A–H 的重複單位分別是語言項目（A）、輸入量（B）、打磨過的獨白（C）、
對手（D）、素材（E）、動機（F）、感知（G）、你寫的那一篇（H）。
**I 的單位是一個有非語言結果的任務**——成功條件不是「講對了」，是「**事情辦成了**」。
⭐⭐ 而這正好是 **TCF T2 的字面定義**：T2 不是「講一段話」，是**要問出足夠資訊把某件事辦成**。
→ **T2 是我們系統裡最空的一段，而它剛好就是唯一一段是「任務」的。這不是巧合。**

### ⚠️ 兩個候選家族，查了但**判斷不另立**（比照 W39 對體裁教學的處理）

1. **具身化／手勢（gesture・enactment）**
   🟢 統合分析（**7 篇／309 人**）：**手勢「觀察」與「自己做」對 L2 詞彙學習效果相當**，
   但**跨研究的真實效果離散度很大**；另一線證據：**限制手勢會讓說話變得比較不流暢**，
   L2 說話時的表意手勢密度高於 L1（＝檢索困難的指標），口譯員的手勢被認為能降低認知負荷。
   → **判斷：它是 A／C 的一個編碼旋鈕，不是另一條路線**（它改變「怎麼編碼」，不改變「練什麼」）。
   ⭐ **但有一條可以馬上用且零成本**：⛔ **練島的時候不要把手插在口袋裡／不要坐著不動**——
   手勢是免費的流暢度支撐，而 Owen 練習時是對著螢幕的（最容易把手關掉的姿勢）。
2. **心理演練（mental practice）**：見 §1.1 D。→ **判斷：它是 A 的一個界線補充**，不是家族。

---

## 3. 可以直接抄的實作參數

| 參數 | 數值 | 依據 |
|---|---|---|
| 同一題連做的輪數 | **3 輪**（上限；學習者自評 **4–5 次**最理想） | 既有 g = −1.73 ＋ 🟢 Hanzawa (2023, MLJ) N=64 |
| 連做那一輪**只驗**什麼 | ⭐ **只驗停頓次數** | 🟢 massed 降停頓最多、但語速變慢 |
| 語速在哪一次量 | ⭐ **隔天／隔幾天的「第一次」**，⛔ 不是連做的第三次 | 同上（避開 massed 汙染） |
| exact repetition 買什麼 | **流暢度** | 🟢 2025 TR 文獻回顧 |
| ⭐ procedural repetition（換題不換骨架）買什麼 | **準確度（含過去時）＋ 句法複雜度** | 🟢 Kim & Li (2024) 轉述 |
| 兩種 rep 怎麼排 | ⭐ **同一週並排，⛔ 不是先 exact 後 procedural** | 上兩列（買不同東西） |
| 同一題的間隔 | ⚠️ **不設鐵律**（4/3/2 上「間隔效果有限」；107 篇回顧說這參數沒被好好研究） | 🟢 System 2025 ＋ Rogers & Li (2025) |
| 準備時間 | **1 分鐘**（＝考試值）；⭐ 但每週刻意混入**只給 30 秒**的幾次 | 既有門檻效應 ＋ 社群週配額 |
| 每週錄音段數 | **4 段**：2 段準備 5 分鐘 ＋ 2 段只給 30 秒 | 🟢 社群（【軼事】） |
| 任務複雜度往上調 | 準確度 **d = 0.28**、流暢度 **d = −0.02**、⛔ 句法複雜度**沒有** | 🟢 Jackson & Suethanapornkul (2013) |
| AI 對手的設定優先序 | ⭐ **語音模態 ＋ 任務有意義約束 ＞ 調糾錯 prompt** | 🟢 Hou & Min (2026) g=.61，回饋**不是**顯著調節變項 |
| ASR 當可懂度鏡子 | 只信**音段**（g=0.82），⛔ 不信語調（0.37）；⚠️ **單人只有 0.44**、**四週內 g=0.07** | 🟢 *ReCALL* ASR 統合分析 |
| ⛔ 流暢度的量尺 | **只能用自己的錄音** | 社群：ChatGPT 語音會抹掉 `euh`／false start |
| 默想練習的合法範圍 | **Formulator 可以**（且必須接答案鍵）；⛔ **Articulator 不行** | 🟢 covert≈overt 提取 ＋ Driskell d=0.48（認知任務效果更大） |
| 練島時的身體 | ⭐ **手要能動**（⛔ 不要插口袋、不要完全靜止） | 🟢 限制手勢→流暢度下降 |
| ⭐ 新：任務的判準 | **成功條件是「事情辦成了」，⛔ 不是「講對了」**；⛔「找不同」不算任務 | Long 的 target/pedagogic task 定義 |

---

## 4. 跟現有系統的缺口對照

讀了 `HANDOFF.md`、`PRACTICE_ORAL.md`、`SPEAKING_METHOD.md` 與實際頁面（`speaking.html`／
`roleplay.html`／`t1_read.html`／`answer_card.html`／`dashboard.html`）之後：

| # | 缺口 | 現況 |
|---|---|---|
| 1 | ⛔ **`speaking.html` 是手寫日誌，不是練習頁** | 欄位只有：型態下拉、分鐘數手填、錯誤數手填、六個錯誤類型 chip、逐字稿貼上、一句備註。⛔ **沒有計時、沒有錄音、沒有起手時間、沒有 4/3/2 輪次、沒有支架漸退** → **前四週研究的參數一條都落不進去** |
| 2 | ⛔⛔ **全站只有 `quest.html` 碰過語音**（`SpeechRecognition`），**沒有任何一頁用 `MediaRecorder`** | 「錄音」是文獻裡最便宜的自檢手段（社群協定的核心、也是我們自己 `2026-09-19_自我錄音比較` 那份的主題），**系統裡是 0**。⭐ 而 §1.2 那條「ChatGPT 語音會抹掉填充詞」意味著**這一格沒有替代品** |
| 3 | ⭐⭐ **procedural repetition 在系統裡沒有任何入口** | `t1_stock.js` 收的是勾子與存貨（＝**內容**），`sentence_drill` 是句子層，`table_drill` 是文法層。**「同一組骨架搬到新題目」只存在於 `SPEAKING_METHOD.md` 的文字裡，沒有頁面** —— 而本週證據說它是準確度與複雜度的主力 |
| 4 | ⚠️ **「3 天間隔」被當鐵律寫進了設計依據** | `SPEAKING_METHOD.md` 八-2 與第十節都用它排程。本週兩條證據（4/3/2 間隔無效、107 篇回顧）說 **它不該是鐵律** → ⭐ **這是一個可以刪掉的約束**，刪掉等於少一個摩擦點 |
| 5 | ⚠️ **完成門檻裡有兩個會互相打架的指標** | 第十節同時要求「停頓 ≤ 3 次」與「語速 55–70 秒」，而 massed 連做會**讓前者變好、後者變差** → 需要分開在不同次量 |
| 6 | ⭐ **計時器缺口第四次跨技能出現** | W37 聽力、W38 閱讀（`sec` 計時器沒重置、量錯東西）、W39 寫作、本週口說。→ ⭐⭐ **這已經不是某一頁的 bug，是系統缺一個共用的「計時／量測層」**。⛔ 本檔不改程式，但這條該進下一次跟 Owen 的討論 |
| 7 | ⚠️ **沒有任何一頁是「任務」** | 全站 100% 是練習題：成功條件都是「答對／講對」。⛔ **沒有一頁的成功條件是「事情辦成了」** —— 這正是新家族 I 指出的空白，而它剛好對著**最空的 T2** |
| 8 | ✅ **大腦檢查這一項是過的**（跟 W39 寫作相反） | `clb7_speaking`（`dashboard.html:891`）／`clb7_t1_sessions`（:1429）／`clb7_t1_read`（:1431）／`clb7_rp_sessions`（:1647）**dashboard 都讀得到**。⭐ 所以口說這條線**不必再補接線，只缺量到的東西** |
| 9 | ⚠️ **三層跳過鐵律的適用性** | `speaking.html` 是自由表單、沒有「判定完成」，現況不違規。⭐ **但若照 §5／§6 做出任何有「作答→判定完成」的口說頁，三層出口必須同時有**（格／整題／今日步驟；跳過不計分、不進複習輪、重來保持跳過、badge 用灰色） |

---

## 5. 一個 15 分鐘就能試的實驗（明天就能做，⛔ 不需要任何新工具）

### ⭐「同一骨架，兩個題目」——一次同時測 exact 與 procedural

**材料**：手機錄音 ＋ 一張紙。骨架用 `AC8` 現成的
`D'abord ／ Ensuite ／ Il y a aussi ／ Enfin ／ Pour toutes ces raisons`。

| 時間 | 做什麼 |
|---|---|
| 0:00–1:00 | 準備 **1 分鐘**（跟考試一樣，不多不少） |
| 1:00–2:00 | **A 題（練過的島）**：`AC8` 為什麼去加拿大，**講 60 秒，錄音** |
| 2:00–3:00 | **同一題再講一次**（＝ exact rep）。⭐ 這一輪的唯一目標：**不要停** |
| 3:00–4:00 | ⭐⭐ **換題不換骨架**（＝ procedural rep）：用同一組連接詞講「**為什麼學法文**」60 秒，錄音 |
| 4:00–5:00 | **同一個新題目再講一次** |
| 5:00–6:00 | 只記**四個數字**，⛔ 不聽錄音：兩題各自的**起手秒數**與**停頓次數** |
| — | **今天到此為止。** ⛔ 不聽錄音、⛔ 不評好壞（專案既有鐵律：當天的「感覺」會騙人） |
| 隔天 5 分鐘 | ⭐ **只用一個鏡頭聽**（今天選「時態」）：數第 3、4 段裡的時態錯誤，再對第 1、2 段做同一件事 |

**要看的結果（這才是實驗的重點）**：

| 如果看到 | 意思 |
|---|---|
| ⭐ exact 那兩段**更順**，但**時態錯誤數跟 procedural 差不多或更多** | Kim & Li 那條在你身上成立 → **移植測試要提前，不是放在階段 6** |
| procedural 那兩段**更卡**，但你**當場發現了自己不會的東西** | 那個「卡」就是它的價值——⭐ **它在暴露缺口，exact 在磨已經會的** |
| 兩題的**起手秒數差很多** | 骨架還沒可調度 → C 家族的工作還沒完成（⛔ 不是內容不夠） |
| 兩題的起手秒數**差不多** | ⭐⭐ 骨架真的是骨架了 → 可以開始往更不像的題目搬（見 §6） |

⭐ **為什麼值得做**：它一次測掉本週最重要的兩條（exact vs procedural、骨架可不可調度），
用的全是現成材料，而且**它產生的四個數字剛好是 `clb7_speaking` 現在就能存的東西**。

---

## 6. 🎮 怎麼讓它更好玩

### ⭐ 先講一條會讓人意外的證據：重複**不是**無聊的

🟢 Hanzawa (2023, *The Modern Language Journal*)，**N = 64**，同一張圖片描述任務做 **6 次**，
三種排程（massed／short-spaced／long-spaced），做完問卷量**元認知判斷**與**情緒投入**（愉悅、專注）：

> **學習者認為任務重複是「有效且投入」的活動，而且他們自己判斷 4–5 次最理想。**
> 研究的動機正是：**老師不敢用任務重複，因為他們假設學生會覺得煩——而學生並沒有。**

⭐⭐ **這條直接對上 METHOD_MAP 的 F 家族**：「無聊是反向預測因子」成立，
但**「重複＝無聊」這個等式沒有被學習者的回報支持**。
→ ⛔ **所以不需要為了「好玩」把重複拿掉**，要做的是**讓重複的每一輪看起來在買不同的東西**。
⚠️ 侷限：它量的是**當下的知覺**（不是長期黏著度），樣本 64 人，且 **6 次是上限不是起點**。

### ⭐⭐ 具體玩法：「同一個骨架，十個題目」的**踢館板**

不是新遊戲機制，是把 §5 那個實驗的第二半做成一張板子：

- 左欄固定一組骨架（`D'abord ／ Ensuite ／ Il y a aussi ／ Enfin ／ Pour toutes ces raisons`）
- 右邊 **10 格 ＝ 10 個題目**，⭐ **刻意從「很像」排到「很不像」**：
  為什麼學法文 → 為什麼當牙醫 → 為什麼住這裡 → 為什麼喜歡蘭嶼 → 為什麼想給女兒這個 →
  …→ 最後兩格是**明顯不搭的題目**（例如「為什麼你覺得手機讓人變笨」）
- 一格的通過條件只有一個：**用這個骨架講完 60 秒**。翻面後顯示**那一格的起手秒數**
- ⭐⭐ **樂趣的來源要講清楚**：不是「我又背了一段」，是
  **「同一個架子搬到越來越不像的題目上，居然還撐得住」** ——
  那是**「我的能力是可調度的」的體感**，而 `feedback_fun_is_the_engine` 想要的正是這種體感
- 最後兩格**本來就設計成會垮**。⭐ **垮掉才是資訊**（那是 `SPEAKING_METHOD.md` 自己寫的分水嶺），
  ⛔ 所以介面**不可以把垮掉畫成失敗**——那一格的文字應該是「這個架子到這裡就搬不動了」
- ⭐ 接既有系統：十格全翻 ＝ 這座島**升級**（`clb7_ac_upgrade_ready` 這個 key 已經在了，不必新造概念）
- ⭐ **三層跳過鐵律照做**：任何一格都能按「⏭ 這題跳過」→ **分母要扣掉**（8 格跳 2 顯示 `x/8`）、
  ⛔ 不進複習輪、重來時保持跳過、**badge 用灰色**
- ⛔ **不要加的**：計分排行榜、連續天數、「你跳過了 N 題」。
  `feedback_fun_is_the_engine` 的「稀有才有力量」＋ ⭐ 鐵律「系統不可以罵他」

⭐ **一句話**：這個板子的獎賞不是分數，是**看著自己的架子越搬越遠**。

---

## 來源

### A. 任務重複與 4/3/2（本週修正我們參數的四條）
- Hanzawa & Suzuki (2022)，Massed task repetition is a double-edged sword for fluency development（*SSLA*）：https://www.cambridge.org/core/journals/studies-in-second-language-acquisition/article/massed-task-repetition-is-a-doubleedged-sword-for-fluency-development/D28EDD7E3D0FA15630165538D706E80F ／ ERIC：https://eric.ed.gov/?id=EJ1337148
- ⭐⭐ Effects of the 4/3/2 activity revisited: Aptitude matters, but distributed practice does not（*System* 2025）：https://www.sciencedirect.com/science/article/abs/pii/S0346251X2500346X
- ⭐ Rogers & Li (2025)，The time between tasks in task repetition research: A systematic review（107 篇，*LTR*）：https://journals.sagepub.com/doi/10.1177/13621688251323047
- ⚠️ Task repetition and L2 oral performance: A meta-analysis（*System* 2025，**兩份摘要互相衝突，本檔不採用**）：https://sciencedirect.com/science/article/abs/pii/S0346251X25002787
- procedural vs exact repetition（Bygate 系列／Kim & Li 2024 轉述來源）：https://www.sciencedirect.com/science/article/abs/pii/S0346251X13001140 ／ https://www.sciencedirect.com/science/article/pii/S2772766125000539
- ⭐ Hanzawa (2023)，學習者怎麼看任務重複（N=64，*MLJ*）：https://onlinelibrary.wiley.com/doi/10.1111/modl.12843

### B. 新家族 I：TBLT
- Bryfonski & McKay (2019)，TBLT 統合分析（52 篇，d=0.93，*LTR*）：https://journals.sagepub.com/doi/10.1177/1362168817744389
- ⚠️ 對立面：Xuan, Cheung & Liu (2025)，技術評論（重做後 g=0.61，*LTR*）：https://journals.sagepub.com/doi/abs/10.1177/13621688221131127
- ⚠️ 對立面：Boers & Faez (2023)，Are we there yet?（重審 27 篇比較研究，*LTR*）：https://journals.sagepub.com/doi/10.1177/13621688231167573
- TBLT 對口說的系統合成與統合分析（d=0.78）：https://zenodo.org/records/5670048
- ⚠️ 科技中介 TBLT 統合分析（g=.384→.265，*CALICO*）：https://utppublishing.com/doi/abs/10.3138/calico-2024-0029
- Long 的 task-based needs analysis 與 target/pedagogic task：https://benjamins.com/catalog/bpa.14.12gro ／ https://www.cambridge.org/core/elements/taskbased-language-teaching/395B3D3B0F7078DF325579CC8314E38B
- Jackson & Suethanapornkul (2013)，Cognition Hypothesis 統合分析（17 篇／9 篇，準確度 d=0.28、流暢度 d=−0.02，*Language Learning*）：https://onlinelibrary.wiley.com/doi/abs/10.1111/lang.12008

### C. AI 對手（D 家族更新）
- ⭐⭐ Hou & Min (2026)，對話式 CALL 對 L2 口說發展的三層統合分析（16 篇／89 ES，g=.61，*ReCALL* 38(1)）：https://www.cambridge.org/core/journals/recall/article/dialoguebased-computerassisted-language-learning-systems-for-second-language-speaking-development-a-threelevel-metaanalysis/31847710516602398819C5E594038E7B
- 聊天機器人統合分析 g=0.484（28 篇／70 ES，*RER*）：https://journals.sagepub.com/doi/abs/10.3102/00346543241255621
- 聊天機器人統合分析 g=0.795（29 篇，*ILE*）：https://www.tandfonline.com/doi/full/10.1080/10494820.2025.2598061
- ASR 對發音的統合分析（15 篇／38 ES；單人 0.44 vs 有伴 0.89；1–4 週 0.07，*ReCALL*）：https://www.cambridge.org/core/journals/recall/article/effectiveness-of-automatic-speech-recognition-in-eslefl-pronunciation-a-metaanalysis/A915444CF252B61D14961D2FE733822D
- ⚠️ 機器人輔助口說統合分析（Wang 2026，**效果量未取得**，*EJE*）：https://onlinelibrary.wiley.com/doi/10.1111/ejed.70416

### D. 默唸 vs 出聲的界線
- covert 與 overt 提取對 L3（**法文**）詞彙同等有效（*IJM* 2025）：https://www.tandfonline.com/doi/full/10.1080/14790718.2024.2443593
- covert／overt 提取的教室回顧（*Educational Psychology Review*）：https://link.springer.com/article/10.1007/s10648-023-09809-2
- Driskell et al. (1994) 心理演練統合分析（60 篇／146 ES，d=0.48）：https://www.researchgate.net/publication/228118028_The_Effects_of_Mental_Practice_on_Motor_Skill_Learning_and_Performance_A_Meta-analysis ／ 24 年後的複製與擴充：https://www.sciencedirect.com/science/article/abs/pii/S1469029219301530

### E. 候選家族（判斷不另立）
- 手勢「做」與「看」對 L2 詞彙的統合分析（7 篇／309 人）：https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10669578/
- 手勢與 L1/L2 詞彙檢索：https://www.jbe-platform.com/content/journals/10.1075/gest.1.2.04had
- 口譯學生的手勢與口語流暢度（*Frontiers in Psychology* 2025）：https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2025.1568341/full

### F. 社群做法（⚠️【軼事】／【廣泛實踐】）
- 法語單人口說練習（含每日雙段協定、週四段錄音配額、四週回聽）：https://spokira.com/french-speaking-practice ／ https://www.learnfrenchwithclemence.com/blog/practice-speaking-french-alone-tips-for-improving-without-a-partner ／ https://www.commeunefrancaise.com/blog/practice-speaking-french-alone ／ https://french.kwiziq.com/learn/speaking/solo-french-speaking-practice
- ⭐⭐ 用 ChatGPT 準備 TEF/TCF 口說，以及它的侷限（會抹掉 `euh`／false start、不按評分表評分、不計時）：https://www.prepmyfrench.com/blogs/use-chatgpt-ai-prepare-tef-tcf-speaking ／ https://www.ouizami.com/blog/ouizami-vs-chatgpt-tcf-canada-speaking-practice
- ⚠️ 官方 TEF 的「用 AI 準備 TEF」頁（**被 egress 擋掉、未讀，僅登記存在**）：https://www.lefrancaisdesaffaires.fr/en/get-ready-for-the-tef-with-ai/
- 「口說是唯一需要夥伴的一科」（⚠️ 商業立場）：https://www.languagenext.com/blog/tcf-canada-speaking/
- 中級高原期與「放慢、注意形式」的建議：https://www.thefrenchexperiment.com/best-way-to-learn-french/intermediate-plateau
- 非同步語音交換的工作流（⚠️ 僅記錄）：https://www.hellotalk.com/en/blog/language-exchange-international

> ⚠️ **以上全部是【檢索摘要層級】的查證**（本環境的 egress 白名單擋掉所有學術站與多數部落格，
> WebFetch 與 curl 皆 403）。⭐ **最該由 Owen 自己抓原文的兩份**：
> ① *System* 2025 的任務重複統合分析（兩份摘要互相衝突）
> ② 官方 TEF 的「用 AI 準備 TEF」頁（官方立場，其餘 AI 說法都是第三方）。
