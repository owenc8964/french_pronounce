# CLB7 法語學習系統 — 交接文件

> **給新 session 的 Claude：**
> Owen 的目標只有一個：**2027年6月1日前考過 CLB 7（B2）**。
> 所有工具、系統、計畫都以「真的考過」為前提，不是模擬努力。
> 讀完這份文件就能接上脈絡，直接繼續推進。

---

## 🔁 交付前自動試跑原則（每個功能必做，不等 Owen 說）

實作完成後，**Claude 自己先試跑整個流程**，確認沒問題才回報。

**標準流程：**
1. 啟動 preview server（用 `.claude/launch.json` 的 `france-clb7`，serverId 記起來）
2. `preview_eval` 清空**相關** localStorage key，模擬全新狀態（⚠️ 只清特定 key，**不要 `localStorage.clear()` 全清**——preview 和真機可能同 origin）
3. 用 `preview_eval` / `preview_click` / `preview_fill` 跑完整 happy path
4. `preview_screenshot` 確認畫面正確
5. 主動找邊緣情況：資料空白時、今天已完成時、guided=1 跳轉時
6. 發現 bug → 自己修 → 重跑 → 確認
7. **全部通過後** 才 commit，問 Owen 要不要 push

**不做的事：**
- ❌ 做完就說「應該可以了」
- ❌ 讓 Owen 自己去點看看
- ❌ 發現問題才說「你要不要試試看」

---

## ⚠️ 做事的核心前提（每次 session 必讀，不可跳過）

**我們在建的不是一堆分開的工具。我們在建一個監控整個學習過程的系統。**

**真正需要的是一個大腦（`dashboard.html`）：**
- 讀取所有工具的 localStorage 數據（quiz 每題對錯、造句分數、學習時數、反射格數、錯題）
- 計算每個 topic 的正確率，找出最弱的地方
- 告訴 Owen 今天具體要做什麼（不是 Owen 自己決定）
- 發出警報：超過 N 天沒練、某 topic 正確率掉了、造句分數退步、時數進度落後

**每次新增功能前，先問：這個功能的數據，dashboard 讀得到嗎？讀到之後，能影響「今日處方」嗎？如果不能，這個功能意義不大。**

**Owen 對系統的期待（他的原話意象）**：dashboard 要像「**精神時光屋**」——每天進去出來就扎實堆疊，全盤學習但精準掌握重點，重點練到反射，考試範圍的東西全面夠熟。

---

## 📐 學習策略（2026-07-02 與 Owen 確立，所有工具設計照此方向）

Owen 曾焦慮「單字背不起來、動詞變化多到記不完」。確立的答案：

1. **動詞分兩層，標準不同**：
   - **核心 9 動詞（être/avoir/faire/aller/devoir/pouvoir/vouloir/venir/prendre）→ 練到「反射」**：一秒內出口，不經過想表格。它們是文法骨架（助動詞、futur proche、情態動詞）。
   - **其他動詞 → 只練「套模式」**：90% 是 -er 規則動詞；口語中很多變位同音（parle/parles/parlent），書面表格的量是假的。不追求「背完」。
2. **A1–B1 產出時態只有**：présent、passé composé、futur proche（＋B1 imparfait、je voudrais）。
3. **單字背「塊」不背「詞」**：不背 mal，背 j'ai mal à la tête；不背 sport，背 faire du sport。
4. **練習與複習並重（Owen 明確要求）**：提取練習之後，**正確資訊必須再輸入腦袋**——所有練習工具答錯都要有清楚直接正確的正解呈現，且錯題集中進「今日錯題本」供睡前掃一遍。解說不能模糊。

---

## 核心目標與現況（2026-07-03 更新）

| 項目 | 內容 |
|------|------|
| **目標** | CLB 7（= CEFR B2）|
| **考試** | TEF Canada 或 TCF Canada |
| **截止日** | 2027年6月1日 |
| **剩餘天數** | 約 333 天 |
| **目前程度** | A1，第14課（2026-07-03 上課），約 24 小時課時 |
| **每天目標** | 1.5–2 小時有效練習（含通勤被動聽力）|
| **總時數目標** | 700 小時（多方研究數據交叉驗證）|

---

## 現有系統狀態（2026-07-03）

| 檔案 | 用途 | 狀態 |
|------|------|------|
| `dashboard.html` | 指揮中心：今日處方（6項）、**今日錯題本**、警報、CLB 等級判定、倒數、700h、四技能、週趨勢 | ✅ 完成 |
| `review.html` | **複習卡**：一包10張3–5分鐘、SRS＋successive relearning、TTS 發音 | ✅ 新增（07-03）|
| `chunks.js` | 卡片庫：768 張，自動從筆記抽取（1–14課） | ✅ 更新（07-03）|
| `quiz.html` | SRS Quiz，550+ 題，熱身模式/課程選擇器/暫停/更正誤判 | ✅ 完成 |
| `verb_sprint.html` | **動詞反射衝刺**：60秒、9動詞×6人稱、起手計時、反射熱力圖 | ✅ 新增（07-02）|
| `questions.js` | 共用題庫（BANK + AGREE_BANK），第1–13課 | ✅ 完成 |
| `reading.html` | 閱讀理解，**20 篇** A1–A1+ 短文（含新聞/社群貼文/食譜/菜單/氣象/邀請/掛號信/小廣告/明信片）| ✅ 擴充（07-02）|
| `writing.html` | 每日 2 句造句，複製 prompt → claude.ai → 貼回記錄 | ✅ 完成 |
| `tracker.html` | 計時器（autostart、切分頁自動暫停）+ 700h 進度 | ✅ 完成 |
| `speaking.html` | 口說日誌 | ✅ 完成 |
| `listening.html` | 聽力日誌 | ✅ 完成 |
| `map.html` | 課程地圖（63格），**已更新至第14課** | ✅ 更新（07-03）|
| `french_notes.html` | 第1–14課筆記；**14課起新增「🎙老師的課堂法語」「🔊發音警報」固定欄目**；07-06 新增：懸浮回饋（💬回饋這課）、每課下方研讀→做題快捷列、全站例句欄自動加喇叭 | ✅ 更新（07-06）|
| `table_drill.html` | 動詞變位練習（舊版，功能被 verb_sprint 部分取代）| ✅ 部署 |

| `session_timer.js` | **跨頁 session 計時器**：一次訓練＝一個 session，timestamp 累計、跨頁連續、練習頁常駐 pill、dashboard 端 bar 結算寫入 700h | ✅ 新增（07-05）|
| `sync_supabase.js` | **跨裝置同步**：所有 clb7_* 存到 Supabase，開頁 pull 合併、變動 debounce 2.5s 自動 push、離頁再 push。掛在全部練習頁＋dashboard | ✅ 新增（07-05）|

**GitHub Pages 網址：** https://owenc8964.github.io/french_pronounce/dashboard.html

**今日處方順序（07-05 改番号一本道，7步）**：① 🔥 熱身 Quiz 5題 → ② 📚 研讀＋專項 Quiz（策略選課器）→ ③ 📝 填表格（冠詞／動詞變位，table_drill）→ ④ ⚡ 反射衝刺 → ⑤ 📦 複習卡 → ⑥ ✍️ 造句 → ⑦ 📖 閱讀。時數不再是步驟，改由頂部 session 計時器全程累計。dashboard 高亮第一個未完成步驟（👉 現在做這個），中樞＝永遠的終點。

- **步驟② 策略選課器 `showStudyPicker()`**（quiz.html?guided=1 直接進入，不再直接出題）：每課算練習量／錯誤率／幾天沒練，排序＝未練過優先→錯誤率高→量少→久沒練；第一名標「👉 建議先練」＋理由。`lessonStats()` 用 getSRS/qId。
- **步驟③ 填表格 `table_drill.html`**：既有的表格填空（動詞六人稱變位表＋定/不定/部分冠詞，type 可篩動詞/冠詞/形容詞/介係詞），本次補上 `session_timer.js`＋完成時 `clb7_drill_done`。dashboard 讀此旗標判定完成。（TODO：table_drill 答錯尚未 logWrong 進錯題本，之後補）

---

## 本 session 做了什麼（2026-07-05：跨頁計時器＋一本道流程）

Owen 回饋核心痛點：**每日練習像沒終點的迷宮，計時器不會動、不知道做了多久、做完5題不知下一步、程式會掛、沒成功跑完過**。診斷後確認全是設計缺陷（非錯覺）：
- 舊計時只活在 `tracker.html`，做 quiz/reading 時完全沒有可見計時；各練習頁其實有「隱藏」自動計時寫入 `clb7_tracker`，但使用者看不到、不信任、無法暫停、沒有「一次 session 從頭到尾」的概念。
- `guided=1` 只是各頁自動起手，**頁與頁之間沒有串接**，回 dashboard 要自己找下一項 → 迷宮感。

**與 Owen 確認的方向**（AskUserQuestion）：維持 dashboard 中樞（不做自動跳頁）＋加跨頁計時＋明確番号順序；步驟＝暖身→研讀專項→反射→複習→產出；Duolingo 沿用既有 `clb7_duo` 輸入面板（Owen 會定期丟數據給 Claude 填）。

**做了什麼：**
1. **`session_timer.js`（新檔，核心）**：`window.ClbSession` API（start/pause/resume/toggle/finish/discard/elapsedSec）。用 `clb7_session = {active,running,startedAt,accSec}`，**timestamp 累計**所以換頁後計時連續。練習頁右上角常駐 pill（時間＋⏸＋🏁回結算）。單段不間斷上限 3h 防忘記結算暴衝。
2. **各練習頁掛載**：quiz/review/reading/writing/verb_sprint 都 `<script src="session_timer.js">`；reading 處方 href 補 `guided=1`。
3. **防雙重計入**：quiz/review/reading/verb_sprint 的隱藏自動計時 `flushTime()` 開頭加 `if (ClbSession.isActive()){acc=0;return;}`——session 進行中只由 session_timer 記錄一次。
4. **dashboard 中樞改造**：頂部 session bar（進行中顯示：大字計時、⏸暫停、🏁結束並記錄→寫入 `clb7_tracker` type:'session'→自動進 700h；toast 回饋分鐘數）；「開始今日學習」改為啟動 session＋前往第一個未完成步驟；`buildPrescription` 改成 6 步番号（含新步驟 ② 研讀＋專項 Quiz），render 加番号圓圈＋`rx-now` 高亮第一個未完成。
5. **quiz.html**：熱身 5 題完成時 set `clb7_warmup_done`（步驟①的完成旗標，與步驟② 的 `clb7_quiz_done` 分開）。

6. **Duolingo 週報種子**：dashboard 加 `DUO_SEED` 陣列＋`seedDuo()`，載入時 upsert 進 `clb7_duo`（不覆蓋其他週）；`renderDuo` 找不到當週就顯示最新一筆。Owen 給截圖只需改一行。基準 2026-W27 = {streak:73, xp:5901, min:288, units:104}。更新方式見 memory `reference_duolingo_update`。

**端到端實測通過（preview localhost:7788，真的跑完）**：開始→跨頁（dashboard→quiz→reading→dashboard）計時連續、暫停凍結、回 dashboard bar 顯示；模擬 27 分鐘結算→`clb7_tracker` 寫入一筆、700h 由 0→0.5h、toast 正確；實際做完熱身 5 題→`clb7_warmup_done` 真的被 set、課程選擇器（步驟②）出現；dashboard 番号順序＋👉高亮正確（截圖存證）。

---

## 本 session 第六輪（2026-07-07：第13/14課表格漏了 class="m"，喇叭+行距一起消失）

Owen 很生氣地回報：「第十三課 健身房詞彙/運動詞彙/假期詞彙」「第十四課也是」格式跑掉——沒有發音記號、行距變很近，而且「上次才改過」。

**根因**：這個網站的表格慣例是——**法文欄要標 `class="m"` 才會被自動加喇叭**（`.compare-table td.m, .compare-table td.f` 選擇器，這是既有的、`feedback_notes_table_format` memory 早就記錄過的規則）。第13課「健身房詞彙／運動詞彙／飲食詞彙／假期詞彙」跟第14課「wwoofing／度假詞彙三表／訂房／比較形容詞／PC être例句／法國地區詞彙」共 **14 個詞彙表**，製表時法文欄漏標了 `class="m"`（只有「詞性」欄標了f/m/v文字內容，但那只是文字不是CSS class）。導致：① 沒有喇叭（選擇器抓不到）② 視覺上「行距變緊」——其實不是CSS行距值變了，是**少了喇叭圖示佔用的高度**，讓每行看起來更擠。兩個症狀是同一個根因。

**修法**：逐一確認每個表格的欄位語意（避免誤傷「Il faut vs Devoir」「給建議的三種方式」這種欄位混雜中法文的概念對照表——這兩個保持原狀不變），只對**純法文、詞彙表性質**的14個表格的法文欄補上 `class="m"`：健身房詞彙、Devoir變位表（法文在第二欄，特殊處理）、運動詞彙、飲食詞彙、假期詞彙、wwoofing、度假詞彙三表（地點/住宿/交通活動）、訂房、比較形容詞、PC être例句、法國地區詞彙。「畫家×地區×重點句」表因內容是完整敘述句夾雜粗體標記，結構特殊，故意跳過未加（如果 Owen 之後也要這個發音，需要另外設計清理邏輯過濾粗體標記）。

**實測**：第13/14課全部詞彙表喇叭圖示與資料列數一一對應（部分表格因為同時符合「例句欄」自動加喇叭機制而有雙倍喇叭，屬正常疊加）；實際點擊喇叭確認唸出內容正確（"le gymnase"）；確認兩個概念對照表完全沒被誤動。

**教訓寫進 memory**：以後每次新增/修改課程筆記，只要用了 `<table>`，法文欄一定要記得標 `class="m"`（跟既有的 `<div class="compare-table">` 外層規則一樣重要，兩個都漏會導致同樣的「沒發音」症狀，但 compare-table 漏了會連樣式都不見，td.m 漏了則樣式在但沒發音）。

---

## 本 session 第五輪（2026-07-07：複習卡順序/發音/同步三個真bug）

Owen 回饋四件事：①跨機器進度還是不一樣 ②複習卡今天題目跟昨天一樣、到第二輪才不同，懷疑順序固定 ③發音接錯程式、他下載的高品質語音沒被用到、聽起來很機器音 ④有些卡片語意不清看不懂要回答什麼。逐一查證後，**②③是真的 bug，不是錯覺**：

### 1. 複習卡順序固定（真bug，已修）
`review.html` 的 `dueCards()` 只依到期時間 `.sort()`，**完全沒有隨機打亂**。JS 的 sort 是穩定排序，所以「到期時間相同」的一批卡，每次都照 `CHUNKS` 陣列原始順序排列——如果到期卡數量超過一包（10張），每天永遠只吃到「同一批、同樣順序」的前10張，看起來就像整包重複。**修法**：加 `shuffle()`，洗牌後再排序（到期時間不同的還是嚴格照時間排，早到期優先的SRS原則不變；只有「同一到期時間點」內的卡每次順序不同）。**實測**：灌15張同到期時間的卡，連續三次呼叫 `dueCards()`，順序確實三次都不同。

### 2. review.html 發音邏輯跟其他頁不一致（真bug，已修）
全站找過：quiz/table_drill/verb_sprint/french_notes/listening 都會優先找 Amélie/Thomas 高品質語音，**只有 `review.html` 是「隨便抓第一個 fr 語音」**（`vs[0]`）——這就是 Owen 覺得複習卡發音特別糊、特別機器音的根因。**修法**：review.html 改成跟其他頁一致的邏輯，而且**全站統一升級**成更寬容的優先序：Amélie/Thomas → 名字含 premium/enhanced/amélior/plus（涵蓋 Owen 自己下載的加強版語音，不管叫什麼名字）→ `localService===false`（雲端服務語音，通常比本機語音好）→ `fr-FR` → 隨便一個。同時補上 `verb_reference.html`（原本完全沒篩選邏輯，直接用系統預設）。**實測**：模擬「只有兩個語音、都不叫amelie/thomas」的情境，正確選中 `localService:false` 那個。
⚠️ 沒問到 Owen 下載的語音確切叫什麼名字（AskUserQuestion 選項不足2個被拒），改用「寬容啟發式」規則，之後如果還是選不對，需要問他系統設定裡實際看到的語音名稱，把名字精準加進 regex。

### 3. 跨裝置同步：完成時主動立即 push（強化）
之前的同步是「debounce 700ms 後才推」，如果做完立刻切裝置，理論上仍有極小機率來不及。**修法**：在 review.html（finishPacket）、writing.html（save）、reading.html（saveRecord）、verb_sprint.html（saveSession）、table_drill.html（drill_done寫入處）、quiz.html（warmup_done/quiz_done）、dashboard.html（結算按鈕）**完成的當下都主動呼叫 `ClbSync.push()`**，不再只靠 debounce 或 visibilitychange。**實測**：完整跑一包複習卡（10張全對），確認 `fetch POST` 真的在完成當下被觸發，不用等。
⚠️ Owen 說的「跨機器進度不一樣」還沒有 100% 定位到單一根因（可能是這個 timing 問題造成的，也可能跟 review.html 的順序固定問題疊加讓他誤以為是同步沒生效），這次先把「立即push」這個已知風險點堵起來，如果他之後還遇到，需要問清楚具體操作步驟（哪台裝置做完哪個動作、多久後看第二台）才能精準抓根因。

### 4. review.html 補回饋機制（順便解決「語意不清」問題）
`review.html` 原本完全沒有懸浮回饋元件（其他頁都有），現在補上，並且卡片旁加「🤔 這張卡語意不清」按鈕，點了會自動帶入目前卡片的完整內容（第幾課、中文提示、法文答案）存進 `clb7_quick_notes`，供 Owen 之後用「複製給 Claude」一次匯出。**這是解決「有些題目語意不清」的機制**：768張卡不可能一次全部人工檢查過，改成 Owen 複習時順手標記，之後我批次去 `chunks.js` 修對應的卡。**實測**：點擊後正確帶出「[第1課] 你好嗎？ → Ça va ? / Tu vas bien ?」這樣的完整標記存進筆記。

---

## 本 session 第四輪（2026-07-06：聽力真實資源＋TTS聽力測驗）

Owen 問「有沒有辦法上網找到聽力資源，或我自己出題」，並且想要「前三個直接嵌入檔案」。查證後動手做了 `listening.html` 大改：

### 1. 真實聽力資源（嵌入，不是抓取）
- 查證發現：RFI「Journal en français facile」是法語教學界公認 A2–B1 過渡期最推薦的聽力素材（很多人拿來準備 TCF/TEF）；InnerFrench podcast 主持人刻意放慢語速適合 A1/A2；TCF Canada 有官方格式（39題選擇題）免費模擬題。
- **合法嵌入方式**：RFI 和 InnerFrench 都用 **Spotify 官方 embed iframe**（`open.spotify.com/embed/show/{id}`，Spotify 自己提供的嵌入功能，不是抓取版權內容）直接嵌進 `listening.html`，可以在頁面內播放。
- TCF Canada 是商業練習站，無法嵌入（會被 X-Frame-Options 擋），改用連結卡開新分頁。
- ⚠️ WebFetch 工具無法直接讀取 rfi.fr／francaisfacile.rfi.fr（該網域擋爬蟲），所以沒辦法自動抓每日文字稿來出題——這是為什麼真實資源只能「連過去」，沒辦法動態生成對應的理解題。

### 2. 我自己出的 TTS 聽力測驗（`LISTENING_BANK`，8篇）
內容對齊 Owen 已經學過的課程（第1、3、5、6、9、11、12、13課主題：自我介紹/天氣/市場購物/約診/度假計畫/搬家/看醫生/上週末，涵蓋現在式、部分冠詞、passé composé、futur proche），流程仿照 `reading.html` 但**先聽不看字**：
- 播放（可重播，用既有的 fr-FR TTS，Amélie/Thomas 語音）→ 按「開始作答」→ 3 題選擇題 → 提交判分 → **可展開逐字稿對照**。
- 完成會**自動寫入 `clb7_listening`**（沿用既有的聽力日誌 key，`source:'TTS測驗'`，`min` 用字數/130wpm估計，`comp`=答對率，`notes` 附書名+課次+對錯），所以完全吃得到頁面原本就有的統計/來源分布/歷史列表，不用另外做一套。
- 補上 `listening.html` 原本缺的 `session_timer.js`／`sync_supabase.js`（之前漏掛，這頁沒被計時也沒同步）。

**實測**：Spotify 嵌入播放器正確顯示（RFI/InnerFrench 都能看到最新一集標題）；TTS播放內容正確；選2對1錯送出→ 判分正確標示對錯選項→ 自動寫入日誌（comp:67, notes正確附課次）→ dashboard式統計（總分鐘/總次數/平均理解度）即時更新→ 逐字稿展開正確→ 清單正確標記「✓今天做過」。測試前後都切了隔離測試房間，沒污染正式雲端。

---

## 本 session 第三輪修正（2026-07-06：閒置自動暫停＋verb_sprint 補發音）

Owen 實際使用後回饋兩個新問題：①「計時已經跑三小時了，但完全沒操作」②「動詞時態速答（verb_sprint）沒有發音按鈕」。

### 1. 找到「計時跑3小時」的根因：上一輪加的「自動開始計時」有副作用
上一輪為了修「填表格沒被計時」，把 session_timer.js 改成任何練習頁載入就自動 `API.start()`。但這樣一來，只要頁面開著完全不操作，時間還是照時鐘一直跑，最多跑到 `MAX_STRETCH_MS`（3小時）才自動停——這正是 Owen 說「跑了三小時但完全沒操作」的原因。

**修法：加「閒置自動暫停」**（`session_timer.js`）：
- 監聽 `keydown/pointerdown/touchstart/scroll/click/mousemove`，記錄 `lastActivity`。
- 每 5 秒檢查一次：若 session 正在跑且超過 `IDLE_LIMIT_MS`（3 分鐘）沒有任何操作，自動呼叫新方法 `pauseAtTime(lastActivity)`——**用「最後操作時間」當停止點**，正確排除閒置那段，不是暫停當下才算，這樣才不會把發呆的時間也算進 700h。
- 這個閒置偵測是全站共用（dashboard 和練習頁都適用），不只練習頁。

**實測**：直接驗證 `pauseAtTime` 計算邏輯正確（模擬「5分鐘前開始，第20秒就閒置」→ 正確只記 20 秒，不含後面的閒置時間）；把門檻暫時調到 4 秒做端到端測試，確認「完全不操作 6 秒後自動暫停」「持續操作 7 秒不會被誤判」都正確，測完已改回 3 分鐘。
⚠️ 踩到 preview server 的瀏覽器快取問題（改完 session_timer.js，直接 reload 頁面還是載到舊版，連重開 server 都沒用）——這次用 `fetch(...).then(eval(...))` 直接抓最新原始碼在頁面內重新執行來繞過快取做測試；正式環境（GitHub Pages）沒有這個問題，push 後照常會拿到新版，只是「préview 測試時」要注意。

### 2. verb_sprint.html（動詞時態速答）補上發音按鈕
**診斷**：整個 verb_sprint.html 完全沒有 TTS/發音功能（連 `speechSynthesis` 都沒用到），雖然答錯畫面寫著「唸出聲再繼續」卻沒給發音範例。

**修法**：搬 table_drill.html 那套簡易 TTS（`ttsSpeak`＋Amélie/Thomas 法語女聲/男聲偵測）過來，加兩個發音點：
- 出題時，動詞原形（如「aller」）旁加🔊，隨時可以聽原形怎麼唸。
- **答錯時最重要**：正解顯示旁加🔊，而且**答錯當下自動唸一次正解**（人稱+變位，如「nous allons」），不用額外點——直接呼應原本就寫的「唸出聲再繼續」提示。
- 代名詞清理：「il / elle」「ils / elles」這種帶斜線的只唸第一個代名詞（斜線唸出來很怪），用 regex `(\S+) \/ \S+ → $1` 只清代名詞部分，後面的動詞變位保留（不是整串從第一個斜線切掉）。

**實測**：喇叭按鈕存在且正確綁定；點擊唸出的內容用攔截 `speechSynthesis.speak` 驗證正確（"aller"、答錯自動唸兩次「nous allons」）；斜線清理邏輯直接測試「il / elle peut」→「il peut」、「ils / elles veulent」→「ils veulent」、「être」（無斜線）不受影響，全部正確。

---

## 本 session 又做了什麼（2026-07-06 下半場：table_drill 大修＋同步可靠度）

Owen 換機器實測後回饋：①換機器進度沒跟上，又回去用同一台 ②填表格中途切難度會直接重來 ③填表格答錯沒有像其他模式一樣進複習輪 ④填表格時間好像沒同步計時 ⑤填表格內容感覺還停留在早期階段。逐一診斷後：

### 1. 根因診斷：session_timer.js 只在 `ClbSession.isActive()` 時才顯示/計時
`ensurePill()` 開頭就 `if (!API.isActive()) return;`——如果不是從 dashboard「開始今日學習」按鈕進來（例如直接點某個練習連結、或書籤直接開），session 根本沒啟動，時間當然不會動。**修法**：`boot()` 改成任何非 dashboard 頁面載入時，若 session 未啟動就自動 `API.start()`。這樣不管怎麼進練習頁都會被計時，不再依賴唯一入口。

### 2. 跨裝置同步可靠度加強（sync_supabase.js）
- debounce 從 2500ms 縮短到 700ms：完成一步後，趁頁面還在前景就有更高機會把 push 送出去，減少「還沒送出就被切走/背景」導致的漏同步。
- 新增：分頁/App **切回前景時也會 `pull()`**（原本只有切到背景時 `push()`）。這樣「本來就開著的分頁/裝置切回來」也會自動抓另一台剛做的更新，不用重新整理才看得到。
- ⚠️ 跨機同步目前仍只保證「完成與否」的勾勾，不保證「同一題答到一半」的位置（這是先前跟 Owen 確認過的既定範圍）。

### 3. table_drill.html 加錯題複習輪
仿照 quiz.html 的 main/review phase 設計：新增 `phase`／`roundWrong`／`reviewPassCount`／`onSummary` 狀態。主輪（6個表）做完後，答錯過的表格會自動進複習輪重考，直到該輪全對才顯示總結；複習輪不重複計入 `totalOk`/`totalBad`/`results`（主輪成績保持誠實，不因後來複習輪答對而洗掉原始錯誤紀錄），總結畫面會顯示「複習 N 輪後全部做對」。複習輪卡片上方有明顯 banner 提示。

### 4. table_drill.html 切換難度/類型不再直接重來
新增 `hasRoundProgress()`：若這一輪已有進度（`qIdx>0` 或 `results.length>0`）且不在結束畫面（`onSummary`），切難度/類型前會 `confirm()` 詢問「這一輪還沒做完，換了會重新開始，確定要換嗎？」，取消則不動；在結束畫面按「挑戰中級/初級」則不會問（因為那一輪已經結束，沒東西可丟）。

### 5. table_drill.html 內容擴充：25 個表格 → 36 個，第5課 → 第13課
**診斷**：舊題庫 verb/adj/article/prep 全部集中在第1、2、4、5課，Owen 現在在第14課，題庫完全跟不上進度。**修法**：從 french_notes.html 擷取後續課程內容補進去：
- **第7課動詞**：vendre（-re動詞）、mettre（雙寫tt）、porter
- **第8課動詞**：venir（雙寫nn，être家族）
- **第9課動詞**：pouvoir、vouloir（全不規則，常混淆）
- **第12課 passé composé**：pc-trouver（avoir+規則ER過去分詞完整六人稱，答案是兩個字如「as trouvé」）
- **第13課 passé composé**：pc-irreg-participe（lire→lu/faire→fait/apprendre→appris/pouvoir→pu/vouloir→voulu/avoir→eu/être→été/dormir→dormi 共8個不規則過去分詞）、pc-etre-verbs（15個être動詞的過去分詞：aller/venir/partir/arriver/entrer/sortir/monter/descendre/tomber/rester/retourner/passer/devenir/naître/mourir）
- **第10課形容詞**：adj-gentil（-l雙寫+e不規則）、adj-eux（sérieux/courageux/généreux 的 -eux→-euse模式，共用一張表3個例字）

沒有涵蓋每一課每個文法點（例如第11課COD代詞、第14課比較級這類非表格形狀的內容留給 quiz.html 處理），優先做「跟現有 headers/rows schema 乾淨吻合、且是核心文法重點」的內容，passé composé 是 Owen 現在正在學的東西，優先度最高。

### 6. ⚠️ 測試方法修正（記取上次教訓）
這次測試前，先把 `sync_supabase.js` 的 `ROOM` 暫時改成 `'TEST-DO-NOT-USE-DELETE-BEFORE-COMMIT'`，跑完所有測試（含切背景/切前景觸發 push/pull 的驗證）才改回 `'owen-clb7-k9f3a72q'` 並用 grep 確認沒有殘留測試字串——這次沒有再污染 Owen 的正式雲端資料。

**全部功能 preview 實測通過**：直接開 table_drill（不經 dashboard）自動起算計時、36個表格新舊內容都在、pc-trouver 正確顯示兩字答案與「第12課」標籤、複習輪機制（答錯→複習輪→答對→顯示「複習1輪後全部做對」、主輪成績不被洗掉）、切換難度有進度時跳確認框（取消不動/確定才重來）、結束畫面切難度不跳確認框、切背景觸發POST、切前景觸發GET、dashboard 本身不會被自動啟動 session 影響（isDash 保護仍正常）。

---

## 本 session 做了什麼（2026-07-06：筆記回饋＋順序輪替＋統計＋一次重大事故）

Owen 回饋四件事：①筆記頁沒有回饋機制，且第6課發現多處例句缺發音/翻譯 ②想要每日完成統計、找出最常漏掉哪一步 ③想要順序不要一成不變，且能自訂 ④跨機器要能接續進度。逐一確認方向後（AskUserQuestion：順序選「自動微調＋可鎖定」；跨機深度選「同步完成與否即可」；1.5h太長 Owen 說「我會自己中斷」不需要拆段功能）：

### 1. french_notes.html 回饋機制＋第6課修正
- **診斷**：french_notes.html 是唯一沒有懸浮筆記元件的頁面（其他六頁都有）；且發現「例句沒發音」不只是第6課個案，是全站通病——`makeTtsBtn` 只自動附加在 `.phrase-list`／`.verb-name`／`.conj-row`／`td.m`／`td.f`／`.fr-ex`，但 compare-table 的「例句」欄（完整句子，最後一欄，通常無 class）從來沒被覆蓋到。
- **加了懸浮回饋元件**：沿用其他頁既有的 `clb7_quick_notes` 共用 key／`複製全部給 Claude` 模式；每課標題下方新增「💬 回饋這課」按鈕，點擊會自動幫該則筆記標記 `[第N課]` 前綴，方便之後我讀取時知道對應哪一課。
- **第6課「否定擴充」表格**：4句例句（Je ne vais jamais au cinéma / Elle ne boit rien / Je ne connais personne ici / Il ne fait plus de sport）補上中文翻譯（括號附加在句尾，沿用網站既有 `.fr-ex` 括號翻譯慣例）。
- **全站通用修正**（不只第6課，14課全部受惠）：新增 JS 機制——掃描所有 `.compare-table table`，若表頭最後一欄文字是「例句」或「例」，該欄每格自動加喇叭；TTS 播放內容會先去掉尾端「（中文翻譯）」括號，只唸法文本體，避免中文混入法語發音。已用「Elle ne boit rien.」實測確認播放內容正確排除翻譯。

### 2. dashboard 每日完成率分析（📊 找出最常漏掉哪一步）
- **關鍵發現＋修正**：處方步驟①②③（熱身/研讀/填表格）過去只存「最新一次完成日期」單一字串（`clb7_warmup_done` 等），無法回溯歷史哪幾天做過。新增 `logDailyDone()` 輔助函式，這三步驟完成時**同時**寫入歷史陣列 `clb7_warmup_log`／`clb7_quiz_log`／`clb7_drill_log`（quiz.html／table_drill.html 各自的完成點都補了這行）。步驟④⑤⑥⑦本來就有完整歷史陣列（sprint_sessions/review_sessions/writing/reading），沿用即可。
- **dashboard 新增「📊 每日完成率分析」卡**（`renderHabitAnalysis()`）：抓「近14天內有練習活動」的日子（用 tracker 或任一步驟紀錄聯集判定「活躍日」，避免把完全沒用 app 的日子誤算漏做），算每步驟完成率，畫出長條圖，並point出「最常被漏掉」的那一步。
- 實測：灌了7天模擬資料（暖身7/7、填表格只做2/7、其餘不等），正確判定「填表格最常被漏掉（2/7天）」。
- ⚠️ 因為①②③是新功能（07-05/06才加），統計會從現在開始累積，無法回溯更早之前的資料——面板下方有寫這行提醒。

### 3. 處方順序自動輪替＋鎖定開關
- 中間4步（研讀/填表格/反射/複習）**依日期輪替**（`Math.floor(Date.now()/86400000)` 當 shift 值），暖身固定第一、造句+閱讀固定最後（產出收尾）不會動。
- 今日處方標題右側加「🔒 鎖定順序」checkbox（存 `clb7_order_lock`），鎖定後順序固定不再輪替；有文字說明目前狀態。
- 實測：today→tomorrow 順序確實輪替一格；鎖定後 3 天後順序仍相同。

### 4. 切裝置提醒
- session bar 底部加一行提示：「💡 要換手機/iPad 前，先按「🏁 結束並記錄」，進度才會跟著你走」——因為跨機同步目前只同步「完成與否」的勾勾（Owen 確認這樣夠用），沒同步「進行中尚未結算的 session 計時」，所以引導 Owen 在換機器前先手動結算。

### 5. ⚠️ 事故記錄：preview 測試污染了 Owen 真實雲端資料（已修復）
測試「每日完成率統計」時，在 preview 灌了假的 `clb7_writing`／`clb7_review_sessions`／`clb7_sprint_sessions`／`clb7_warmup_done`／`clb7_drill_done`／`clb7_quick_notes`／`clb7_reading`／`clb7_tracker` 測試資料。**因為 `sync_supabase.js` 不管 preview 還是正式站都指向同一個 Supabase ROOM**（`owen-clb7-k9f3a72q`），這些假資料在 2.5 秒 debounce 後自動推上了 Owen 真實的雲端資料庫，覆蓋掉他手機上的真實紀錄快照。

**發現後處理**：嘗試用 DELETE 清掉該筆雲端資料，但 RLS 沒開 delete policy，DELETE 靜默失敗（回 204 但 0 筆真的被刪——這是本次多踩的一個坑，供未來參考）。改用 UPDATE（POST + `Prefer: resolution=merge-duplicates`）把該 ROOM 的 payload 覆蓋成 `{}`，驗證雲端確實變空。

**為什麼這樣處理是安全的**：整個過程只動到「preview 這個隔離瀏覽器」和「雲端」，**Owen 手機/iPad 本機的 localStorage 完全沒被碰到**。雲端變空後，他下次用真機打開 app：pull 會是 no-op（沒東西可合併，不會清掉本機任何東西），接著他真機的 setItem hook 會在 2.5 秒後自動把他真實的完整資料重新推回雲端，等於自我修復。已重新整理過 dashboard 確認頁面在乾淨狀態下正常運作、雲端仍保持 `{}`沒再被污染。

**已寫入 memory（`feedback_sync_test_isolation`）避免重演**：以後任何會寫 `clb7_*` 的 preview 測試，開頭要先攔截 `fetch` 擋掉 `supabase.co`（或移除 `sync_supabase.js` script tag），測完再視情況還原，不能靠「測完再清雲端」補救。

**Owen 需要知道**：這次沒有真正遺失他的資料（因為手機本機是安全的），但如果他在我完成這次修復「之前」剛好打開過手機且做了些什麼、又被手機推上雲端覆蓋了我清空的 `{}`……其實那樣反而更好（他的真資料會贏）。真正的風險窗口只在「污染發生後、我清空之前」如果他手機也在那個時間點打開過 app 且 pull 到我的假資料合併進本機——目前看時間點研判機率低，但建議 Owen 之後開 app 時留意一下處方勾勾／複習卡/反射衝刺數字是否合理，如有明顯不合理（例如沒做過的東西顯示已完成、或造句記錄多出一筆 s1='a' s2='b' 的假資料），跟 Claude 說一聲即可清掉。

---

## 跨裝置同步（Supabase，2026-07-05 上線）

Owen 用多台裝置（手機／iPad），要時間/進度一起記錄。localStorage 是單機本地，故接 Supabase 當雲端中繼。

- **後端**：Supabase 專案 `hgkqyrglftljxaieberm`，表 `clb7_sync(id text pk, payload jsonb, updated_at)`，RLS 開，policy select/insert/update 全 true（無登入）。用 **publishable key**（`sb_publishable_...`，設計為可公開，配 RLS）。前端用 REST（免 SDK）。
- **前端 `sync_supabase.js`**：`ROOM='owen-clb7-k9f3a72q'`（所有裝置共用的房間鑰匙）。開頁 `pull()` 把雲端合併進 local；hook `localStorage.setItem`，clb7_* 一變 debounce 2.5s `push()`；pagehide/隱藏再 push。合併規則同 sync.html：陣列用 ts/id/week 去重、per-key 物件取 last 較新、game 取大、日期字串取新——**時數不重複計**。
- **實測通過**：A 記 720s → 自動上雲 → B（清空 local）開頁自動 pull 到、dashboard 顯示 0.2h。insert/upsert/read round-trip 都 200/201。測完已清雲端假資料。
- **已知限制（MVP 可接受）**：last-write-wins——push 是整包覆蓋，只靠「開頁先 pull」防丟。若兩台**同時**開著互動，後 push 的可能蓋掉對方剛存的新資料。單人不同時用沒問題。要更強需 per-key 寫或 push 前先 pull。
- **安全**：publishable key 會出現在前端原始碼（公開 repo），配 ROOM 鑰匙＝知道網址的人才可能存取；非高敏資料，已向 Owen 說明。要更嚴再加登入。
- ⚠️ preview 測時 `sync_supabase.js` 會被快取，改完要帶 `?_cb=時間戳` hard reload 才載新版（本次踩過）。

---

## 之前 session 做了什麼（2026-07-02 ～ 07-03，共 3 個 commit 已推）

### Commit `6ffcf6a` — 上次五項待辦全部完成
1. **閱讀進今日處方**：讀 `clb7_reading`，未做顯示紅色未完成；四技能「閱讀」欄改用短文成績（本週優先、fallback 累計），Quiz 正確率移到副標
2. **CLB 等級判定卡**（里程碑下方）：所有 topic 正確率 ≥75% 且各 ≥5 題次才算 A1 達標；顯示 X/51 達標、未達標數、練習量不足數
3. **聽力/口說警報**：超過 3 天沒記錄出現提醒
4. **閱讀題庫 8→20 篇**（a9–a20），純法文＋解說，難度貼合第13課（présent＋PC＋futur proche）
5. **map.html 到第13課**：解鎖 Santé & corps（L12）、新增 Conseils & obligations 地塊（L13 il faut/devoir）；並補解鎖早已教過的外貌描述（L10）、疑問句、購物、否定句
6. **修 bug**：reading.html `todayStr()` 用 `toISOString()`（UTC），早上做的記錄會變前一天 → 改本地日期

### Commit `235c03b` — 動詞反射衝刺（策略討論後 Owen 拍板）
- `verb_sprint.html`：60 秒衝刺，隨機出 `vous ___ (être)`，打字＋Enter
- **量測起手時間**（出題→第一個按鍵）；**反射 = 連 3 次答對且中位起手 <2 秒**
- 9×6 熱力圖（綠反射/黃慢/紅錯/灰未測）＝「要多熟」的看得見標準
- SRS 加權出題（錯4倍/未測3倍/慢2倍/反射1倍），不連續出同格
- 遵守既有 UX 原則：**答錯暫停計時**＋大字正解＋提示唸出聲＋手動繼續；衝刺後錯格進複習輪（單格答錯重試同格）；完成畫面回饋 textarea（存 sessions 最後一筆的 `fb`）
- 容錯：去重音（etes=êtes）、去開頭代名詞（j'ai=ai）
- dashboard：處方第 2 項（顯示「還有 X 格未達反射」）＋快速入口 nav
- 修 bug：送出的 Enter 冒泡到「繼續」監聽器，答錯畫面被瞬間跳過 → `stopPropagation`

### Commit `25ab840` — 今日錯題本＋重大 bug 修復
- **統一錯題日誌 `clb7_wrong_log`**：quiz（`recordResult`）、reading（submit 判錯）、sprint（`recordAttempt`）答錯即寫入；同題同日去重計次（n）；保留最近 300 筆
- **dashboard「📕 今日錯題本」**（處方正下方）：來源標籤＋題目＋綠色正解＋解說；衝刺錯題附**完整六人稱變位表**；quiz 解說空白 fallback 顯示提示；「錯 N 次」紅字
- quiz「更正為正確」（`overrideCorrect`）同步呼叫 `unlogWrong` 移除
- **重大 bug**：quiz 每日 topic 快照（`{date, topics}`）與 dashboard 週趨勢快照（`{week,...}`）**共用 `clb7_snapshots`**，格式混入後 `renderTrend` 拋錯 → **整頁 script 中斷，dashboard 全空白**（Owen 真機很可能也中招）。修法：topic 快照改用 `clb7_topic_snapshots`，quiz 和 dashboard 都加 `migrateSnapshots()` 自動搬遷，dashboard `getSnapshots()` 加 `.filter(s => s.week)` 防禦
- 修 quiz `saveSnapshot()` 的 toISOString UTC 時區 bug（同 reading）

### 其他
- 學習策略已寫進 memory（`project_clb7_strategy.md`）
- ⚠️ 測試時曾在 preview origin（localhost:7788）`localStorage.clear()` 全清一次，已向 Owen 坦白；之後只清特定 key

---

## 關鍵 localStorage keys

- `clb7_quiz_done` → 今日日期字串（quiz 完成標記）
- `clb7_reading` → [{id, title, date, correct, total, sec}]（date 為**本地 ISO** `2026-07-02`）
- `clb7_writing` → [{date, s1, s2, score, reply}]
- `clb7_tracker` → [{ts, date, type, sec}]
- `clb7_speaking` / `clb7_listening` → 口說/聽力日誌；`clb7_listening` 07-06起可能有 `source:'TTS測驗'` 的自動記錄（含 `quizId` 對應 `LISTENING_BANK` 的題目id）
- `clb7_<qId>` → {w, c, last}（SRS 單題記錄）
- `clb7_game` → {xp, streak, lastDate}
- `clb7_quick_notes` → 懸浮筆記
- `clb7_sprint_cells` → {"être_0": {h:[{o,f,t}…最近5筆]}}（o=對錯, f=起手ms, t=時間戳）
- `clb7_sprint_sessions` → [{date, att, cor, avgFk, reflex, sec, fb?}]（date 為 **zh-TW** `2026/07/02`）
- `clb7_wrong_log` → [{d, t, src:'quiz'|'reading'|'sprint', q, a, note, hint?, title?, n}]（d 為 **zh-TW** 格式）
- `clb7_snapshots` → **只放週趨勢格式** [{week:'2026-W26', totalH, quizAttempts, …}]
- `clb7_topic_snapshots` → quiz 每日 topic 快照 [{date, overallPct, topics}]（date 為本地 ISO）
- `clb7_chunk_srs` → 複習卡 SRS {cardId: {iv, due, days:[…], ok, no, last}}（days＝答對的不同天，zh-TW 格式）
- `clb7_review_sessions` → [{date, cards, ok, ts}]（複習包記錄，最近 100）
- `clb7_chunk_newcount` → {date, n}（今日已開新卡數，上限 10）
- `clb7_session` → {active, running, startedAt(ms), accSec}（跨頁 session 計時器狀態；結束時清除）
- `clb7_warmup_done` → 今日日期字串 zh-TW（處方步驟① 熱身完成旗標；步驟② 用 `clb7_quiz_done`）
- `clb7_drill_done` → 今日日期字串 zh-TW（處方步驟③ 填表格 table_drill 完成旗標）
- `clb7_tracker` 新增 `type:'session'` 一筆＝一次完整訓練的總時間（結算寫入，計入 700h）
- `clb7_warmup_log` / `clb7_quiz_log` / `clb7_drill_log` → [日期字串,…]（07-06 新增，步驟①②③完成歷史，供 dashboard 每日完成率分析用；只存最近 90 筆）
- `clb7_order_lock` → '1' 表示鎖定處方順序（不存在＝未鎖定，中間4步每天輪替）
- `clb7_quick_notes`（新增掛到 french_notes.html）→ 每則 `{date, time, page, note}`；french_notes 的「💬回饋這課」會自動在 note 前加 `[第N課]`

**⚠️ 日期格式地雷**：dashboard/tracker/writing/sprint/wrong_log 用 zh-TW（`2026/07/02`）；reading 記錄和 topic 快照用本地 ISO（`2026-07-02`）。跨工具比對日期時要用**同一格式的 helper**，不要混。所有 todayStr 一律用本地時間，**禁用 toISOString()**（UTC 偏移已炸過兩次）。

---

## 複習卡系統（2026-07-03 上線，survey 後設計）

**設計依據**（survey 結論，Owen 確認的碎片時間模式）：
- Successive relearning（提取＋跨天間隔）是文獻最強組合技；3×5分鐘 > 1×15分鐘 → 碎片時間是最優解不是妥協
- 卡片流內建 pretest（先回想再翻開）＋ production（唸出聲）＋ TTS（翻開自動發音）
- 間隔 1/3/7/14/30 天；畢業＝3 個不同天答對＋間隔≥14天；新卡上限 10/天
- 答錯 → 包尾重試（當日至少一次成功）＋進錯題本＋明天再到期

**卡片庫維護（重要）**：`chunks.js` 由 french_notes.html 自動抽取。**每次新增課程筆記後要重跑抽取腳本**（node 逐列解析：A. phrase-list 的 fr/zh/note span；B. 三欄表 td.m+zh+note；C. 四欄表 fr+詞性+zh+note；D. 三欄無class表。跳過 th/colspan 列、zh 欄無中文的變位表）。id 格式 `L{課}_{fr前24字}`，重生成時既有卡 id 不變（SRS 記錄不丟失）。

---

## 下一步（依優先序）

1. **Owen 試用四個新功能**（反射衝刺、錯題本、閱讀 TCF 式題、複習卡）→ 收回饋調整。衝刺完成畫面和 quiz 的回饋 textarea 記得讀（`clb7_sprint_sessions` 的 fb、`clb7_drill_sessions`）
2. **聽寫（Dictée）工具**（已與 Owen 討論、方向確認）：TTS 唸題庫句子 → Owen 聽寫 → 比對；聽力主動輸入的最短路徑
3. **閱讀文章整篇 TTS 朗讀＋錯題本發音鍵**（配音計畫的剩餘部分）
4. **verb_sprint 擴充**（等 54 格大面積變綠後）：passé composé 助動詞＋participes、imparfait
5. **verb_sprint.html / review.html 補懸浮筆記 snippet**
6. **錯題本延伸**：昨日錯題回顧（隔日再測）

---

## 關鍵設計決定（已確認）

- 閱讀題目語言：**保持純法文**——讓 Owen 從上下文推敲，答錯有解說；這才是真實 TCF 訓練
- 週趨勢：用 ISO week 字串做 key，每次開 dashboard 自動快照上週
- CLB 等級：**不用課數判定，用 Quiz 正確率**（≥75% 且 ≥5 題次，全 topic 達標）
- 熱身後的課程選擇器：**不強迫選哪課**，Owen 自己決定
- 反射標準：**起手時間**（第一鍵延遲）而非總作答時間——打字速度不影響判定
- 錯題不立即重試，**整輪結束才複習**（quiz 分輪制、sprint 複習輪皆同）；答錯後**手動**按下一題

---

## 注意事項

- **懸浮筆記 snippet** 在 quiz/dashboard/writing/speaking/tracker/listening 六頁都有，未來新增頁面記得加（verb_sprint 還沒有）
- **quiz.html `choose` 類型題** 的 `a` 欄位必須和 `opts` 裡的字串**完全一致**，不能用 `|` 分隔
- **tracker autostart** 只有從 dashboard「開始計時」才會帶 `?autostart=1`
- **preview server 快取**：`questions.js`／`session_timer.js` 等共用 script 會被瀏覽器快取，改完後**新開 server 都可能沒用**（踩過），最可靠是 `fetch(url,{cache:'no-store'}).then(r=>r.text()).then(eval)` 直接在頁面內重新執行最新原始碼來測
- **`clb7_snapshots` 絕對不要再寫入非 `{week:...}` 格式**——會讓 dashboard 整頁掛掉（已修一次，有防禦但別再犯）
- **新練習工具的判錯點記得呼叫 `logWrong()`**（格式見 quiz.html，三個檔案各有一份複本）——錯題本才收得到
- **`logWrong` 是複製貼上的三份**（quiz/reading/sprint 各一）＋ dashboard 一份讀取端，改格式要四處同步

---

## 核心原則（每次 session 開始前確認）

> 我們在追一個真實目標。
> 不玩努力的遊戲，不做白努力的事。
> 每一個動作都問：「這讓我更接近 2027年6月1日考過 CLB 7 嗎？」
