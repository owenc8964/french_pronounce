# CLB7 法語學習系統 — 交接文件

> **給新 session 的 Claude：**
> Owen 的目標只有一個：**2027年6月1日前考過 CLB 7（B2）**。
> 所有工具、系統、計畫都以「真的考過」為前提，不是模擬努力。
> 讀完這份文件就能接上脈絡，直接繼續推進。

---

## 🔁 交付前自動試跑原則（每個功能必做，不等 Owen 說）

實作完成後，**Claude 自己先試跑整個流程**，確認沒問題才回報。

**標準流程：**
1. 啟動 preview server（`.claude/launch.json` 的 `french-app`，serverId 記起來）
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

⚠️ **測試涉及寫入 `clb7_*` 的功能前，一律先把 `sync_supabase.js` 的 `ROOM` 常數暫時改成 `'TEST-DO-NOT-USE-DELETE-BEFORE-COMMIT'`**，測完改回 `'owen-clb7-k9f3a72q'` 並 grep 確認沒有殘留測試字串再 commit。因為 preview 和正式站共用同一個 Supabase ROOM，測試資料會直接污染 Owen 真實雲端（已踩過兩次，見下方事故記錄）。

⚠️⚠️ **07-16 新增鐵律：ROOM 改回正式值之後，立刻 `preview_stop`，中間不要再 navigate 或跟 preview 分頁互動**——`push()` 是把「當下這個分頁的 localStorage 整包蓋過去」（不是跟雲端合併，合併邏輯只用在 pull），`var ROOM` 是頁面載入當下綁定的值，只要改完檔案後又重新導覽/留著分頁在背景，新頁面會用檔案目前值重新綁定；如果這個 preview 來源當下的 localStorage 不是正式資料的完整鏡像（幾乎必然不是），任何背景事件（`visibilitychange`/`pagehide`/debounce）都會把它整包蓋掉正式雲端。**改完 ROOM 後的下一步只能是 `preview_stop`，不能是任何形式的頁面互動或再次 navigate。**

⚠️ **preview server 會快取 `.js` 檔**（`questions.js`／`session_timer.js`／`sync_supabase.js` 等），改完直接 reload 甚至重開 server 都可能還是舊版。最可靠驗證方式：`fetch(url,{cache:'no-store'}).then(r=>r.text()).then(eval)` 直接在頁面內重新執行最新原始碼。正式環境（GitHub Pages）沒有這個快取問題。

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

## 核心目標與現況（2026-07-07 更新）

| 項目 | 內容 |
|------|------|
| **目標** | CLB 7（= CEFR B2）|
| **考試** | TEF Canada 或 TCF Canada |
| **截止日** | 2027年6月1日 |
| **目前程度** | A2（07-16已切換CLB_STAGE），第22課 |
| **每天目標** | 1.5–2 小時有效練習（含通勤被動聽力）|
| **總時數目標** | 700 小時（多方研究數據交叉驗證）|
| **產出能力評估的落差** | 系統目前對「辨識/回想」（quiz正確率、複習卡）評分很扎實，但對「口說/寫作/聽力理解」幾乎沒有真正評分機制——造句是 Claude 口頭給分沒有系統化趨勢，speaking/listening 日誌只記錄有沒有做、不評分內容。若要更準評估，未來可考慮定期做完整模擬 TCF/TEF 口說寫作題並照官方標準評分記錄趨勢（已跟 Owen 提過，尚未實作，見下方「下一步」）|

---

## 現有系統狀態（2026-07-07）

| 檔案 | 用途 | 狀態 |
|------|------|------|
| `dashboard.html` | 指揮中心：**08-27 起是「安靜首頁」——第一屏只有今日一句＋一個按鈕，其餘全部收在「▾ 看全部」裡**（見下方 08-27 記錄）。今日處方（**9步番号**，07-07新增造句練習、07-09新增聽力真人語速測驗）、📊每日完成率分析、今日錯題本、警報、CLB等級判定、倒數、700h、四技能、週趨勢、Duolingo週報、🔒鎖定順序開關 | ✅ |
| `session_timer.js` | 跨頁 session 計時器：`window.ClbSession` API，timestamp累計跨頁連續、練習頁常駐pill、**閒置3分鐘自動暫停**（用最後操作時間當停止點，不算閒置時間）、dashboard結算寫入700h、**07-11修復多分頁閒置搶跑＋start()洗掉進度兩個bug**（背景分頁不做閒置檢查、start()對已啟動session防呆） | ✅ 修復（07-11）|
| `sync_supabase.js` | 跨裝置同步：所有 `clb7_*` 存到 Supabase，開頁pull合併、變動debounce **700ms**（原2.5s縮短）自動push、**切前景也會pull**（原本只有切背景push）、離頁再push、各頁完成關鍵動作時**主動立即push**（不等debounce）|✅|
| `quiz.html` | SRS Quiz 550+題，熱身模式、**策略選課器**（未練過/錯誤率高/量少/久沒練 排序）、暫停、更正誤判、**07-11新增`.q-zh`區塊**：fill題型若有`zh`欄位直接顯示中文句意（不用點提示）、**07-16新增`getPool()`過濾**：topic對應的文法點若在`GRAM_POINTS`被鎖（`unlocked:false`）就不出題 | ✅ 修復（07-11/16）|
| `table_drill.html` | 表格填空：**46個表格**（涵蓋第1–22課，含passé composé系列、imparfait無人稱動詞表、durée/qui-que/intensité/**négation（07-21新增）**「文法詞」類型），**錯題複習輪**（答錯進複習輪直到全對，主輪成績不被洗掉）、切難度/類型有進度時confirm確認、一輪6個表 | ✅ 大修（07-06/07/10/17/21）|
| `verb_sprint.html` | 動詞反射衝刺：60秒、9動詞×6人稱、起手計時、反射熱力圖，**已補TTS發音**（原形+答錯自動唸正解）、**07-21修復2個bug**（空白提交卡死不前進、單題想太久卡住不揭曉，見下方07-24記錄）、**07-26新增passé composé模式**（Présent/PC切換按鈕，`VERBS_PC`含être動詞陰陽性雙解，獨立localStorage key `clb7_sprint_cells_pc`/`clb7_sprint_sessions_pc`不跟présent混，isCorrect支援`\|`多解比對） | ✅ 修復＋新模式（07-21/26）|
| `review.html` | 複習卡：一包10張、SRS+successive relearning，**到期卡池已加洗牌**（避免同一批到期卡每天同順序重複）、發音邏輯已跟其他頁統一、卡片旁加「🤔語意不清」回饋按鈕、**07-11新增🔴手動標記不熟**（`clb7_hard_flags`，累加次數，未到期的標記卡會加碼塞進當天包，最多`FLAG_BONUS_MAX`張） | ✅ 修復（07-07/11）|
| `reading.html` | 閱讀理解 **23篇**（A1–A1+ 20篇＋**A2 3篇**：`a21` Le marché du samedi（08-02）、`a22` Un souvenir de Lanyu（08-03）、`a23` Un été à Kenting（08-05，皆同時是該課的「平行閱讀」）——都是原創短文非原文照抄，見08-02／08-03／08-05記錄），純法文+解說、**08-04新增發音三層**（整段連讀＋高亮／點句／點字，靠 `tts_reader.js`；本頁原本一個字都唸不出來） | ✅ 新增發音（08-04）|
| `writing.html` | 每日2句造句，複製prompt→claude.ai→貼回記錄 | ✅ |
| `sentence_drill.html` | **新增（07-07）**：中翻法造句練習，每天固定5句新句＋到期複習，沿用review.html同一套SRS引擎（1/3/7/14/30天），**答錯排到這輪最後重考，磨到全部答對才算完成**，跟review.html的卡片機制共用「包尾重試」邏輯、**07-11同步補上🔴手動標記不熟**（跟review.html共用同一個`clb7_hard_flags`，id前綴不同不會撞） | ✅ 新建（07-11補標記功能）|
| `sentences.js` | **新增（07-07）**：常用句庫（目前176句，第1–22課），**人工精選**跟chunks.js不同（chunks是自動抽取全部筆記，這裡只放真正常用、值得先背的完整句子）| ✅ 新建 |
| `listening.html` | 聽力：**真實資源**（RFI + InnerFrench Spotify embed；Podcast Français Facile的A1對話系列連結卡）+ **自出TTS聽力測驗**（8篇，對齊已學課程）+ **07-09/07-10/07-11新增「真人語速測驗」**（LISTENING_BANK的`audioUrl`類型：真實mp3直接播放＋Claude原創TCF/TEF風格選擇題，目前10篇：麵包店/車站/市場/肉店/魚店/藥局/問路/**起司店/咖啡廳/郵局**，逐字稿核對用連結卡連到來源、不存對方文字）+ **07-10新增「文化深掘Podcast」板塊**（見下方07-10記錄，目前CULTURE_BANK是空陣列，等Owen放音檔進來）+ **07-16新增「🎬影集精讀Shadowing」板塊**（記錄集數/第幾遍/第2遍可貼整理的句型，`?shadow=1`從dashboard進來自動捲到這張卡）| ✅ 大改（07-06～07-16）|
| `french_notes.html` | 第1–19課筆記，懸浮回饋（💬回饋這課）、每課下方研讀→做題快捷列、全站例句欄自動加喇叭、**第13/14課表格漏標class="m"已修復**（14個詞彙表）、**第13/14課排版大修**（見下方07-07記錄：note-box無樣式CSS bug、課文填空改逐句、choisir改verb-card、文化框補發音）、**07-11新增選字標記**（選取文字後可標🔴不熟／⭐重點，存`clb7_notes_marks`，重整頁面用文字比對重新套用，懸浮面板有「複製標記給Claude」）、**08-04第21課平行閱讀加「整段連續朗讀」**（只加整段層、刻意不加單字層，原因見08-04記錄） | ✅ 修復（07-07/11）＋整段朗讀（08-04）|
| `chunks.js` | 複習卡庫：**1794張**，自動從筆記抽取（1–22課，07-07補第15課88張、07-10補第16課80張、07-17補第17課40張含課文慣用語、07-21補第18課35張、07-26補第19課24張、08-02補第20課70張、08-03補第21課63張、08-04補32張老師課堂口語、08-05補第22課66張），**07-11修正2張第14課語意不清的卡** | ✅ |
| `questions.js` | 共用題庫（**BANK 1079題** + AGREE_BANK 247題），第1–22課，**07-11新增53個`zh`欄位**（fill題型無中文語境的補句意）、**07-17新增第17課24題**（passé composé/duree，含10題課文改編句）、**07-21新增第18課16題**（vocab-parcours-vie新topic + negation完整版）、**07-26新增第19課21題**（vocab-loisirs新topic、passé composé/negation/duree/adjective-position/social-invitations總複習）、**08-02新增第20課26題**（imparfait完整變位 + vocab-souvenirs新topic）、**08-03新增第21課27題**（pronoms-y-en＋vocab-sens 兩個新topic）、**08-04新增41題跨課「易混淆詞對」**（新topic paires-confusables，見08-04記錄）、**08-05新增第22課24題**（vocab-meteo新topic＋adjective-position補題） | ✅ |
| `gram_rules.js` | **新增（07-11）**：文法框架單一真相來源——`GRAM_POINTS` 32個文法點（19現役+13未開課佔位）含 topics 對應與規則卡（中文要點+法文例句）、`GRAM_CATS`7大類、`gramStageOf`/`gramSetStage`/`gramFlaggedIds`/`gramFlagQuestion` helpers。map/gram_trainer/quiz/dashboard 四頁共用。**07-21**：`negation`點補lesson 18＋passé composé中的位置規則／personne主詞vs受詞兩條rule points。**07-26**：`negation`/`duree-temps`/`passe`/`adjectifs-accord`四點的`lessons`陣列補19 | ✅ 新建 |
| `gram_trainer.html` | **新增（07-11）**：文法路徑練習器——階段2半開卷（規則卡固定顯示）/階段3遮規則（答錯自動翻開），只出打字題杜絕選項污染，包尾重試磨到全對，首次作答≥80%升階，每階段可手動跳過；完成寫`clb7_quiz_done`（=步驟②）；階段2不寫SRS（開卷不灌精熟統計）、階段3寫；guided=1自動挑「階段最低+錯誤率最高」的點 | ✅ 新建 |
| `codex.js` | **新增（07-11晚）**：📚文法資料庫（記憶宮殿）資料層——9大章50節**132條**，A1→B2全境（08-03新增3-4-5後：A1:29/A2:50/B1:32/B2:12），每條永久座標（如`5-2-2`）＋brief＋說明＋例句＋⚠️例外＋🆚相似對比＋topic對應（37個topic有門牌）。**座標鐵律：一經指定永不重編**（Owen靠位置記憶）。`codexLocate(topic)`給練習頁定位用。**07-21**：7-2-2補「personne當主詞vs受詞位置」pts（座標數不變，122條）。**08-02**：5-3-2／5-3-3 的 lvl B1→A2（實際已教到，座標不動）。**08-03**：新增 `3-4-5`「en＝從那個地方」補上 3-4 節唯一缺口（122→123，3-4-1~4 完全沒動）。**08-28**：新增 `6-6-3`「si vs quand」與 `3-1-3`「on 換得掉的三個字」（130→132，既有座標一個都沒動）。⚠️ **數條目要 parse `CODEX→sections→items`，用 grep 會多算交叉引用** | ✅ 新建 |
| `verb_reference.html` | 動詞參考表，發音邏輯已跟其他頁統一（原本完全沒篩選） | ✅ 修復（07-07）|
| `verb_forms.html`＋`verbs_full.js` | **新增（08-22）**：動詞變位總覽——22 個動詞（核心9＋高頻不規則10＋規則樣本3）× 13 個時態到 B2。**不是變位表大全，是「詞幹經濟學」**：資料只存四個詞幹（futur 詞幹／現在式 nous／現在式 ils／過去分詞）＋現在式六格＋passé simple 型，其餘 40 幾格由 `conjugate()` 現場推導——頁面用計算證明它在教的規則。每個時態掛 📍 codex 座標（13 個全部驗過有對應元素）、🔊 整組唸六個人稱、等級篩選（考前 A1–B1／全部到 B2／只看 B2）、`?v=prendre` 深連結、列印友善 | ✅ 新建 |
| `answer_cards.js` | **新增（07-16）**：TEF Canada 高頻話題 Answer Card 資料——15個主題（自我介紹/家庭/工作/教育/興趣/飲食/旅行/加拿大/住家/購物/健康/科技/環保/社交/未來計畫），內容是 Owen 真實回答經 Claude 修成正確法文的 A1 種子版本，`versions[]` 之後會長出 A2/B1/B2 | ✅ 新建 |
| `answer_card.html` | **新增（07-16）**：Answer Card 練習頁，完全複用 sentence_drill.html 的 SRS 引擎（1/3/7/14/30天、包尾重試、🔴手動標記），差異：新卡上限3/天（內容較重）、卡片首次畢業自動記進 `clb7_ac_upgrade_ready`（下次 session 要檢查，幫該卡寫下一版本）。**07-16 當天 Owen 決定排進每日9步番号**（中間輪替群組6→7步：study/drill/sprint/review/sentence/answercard/listen），📊每日完成率分析同步加入此步驟 | ✅ 新建，已排進處方 |
| `tracker.html` | 舊版計時器（autostart、切分頁自動暫停）+ 700h 進度，功能已被 session_timer.js 取代但保留；**07-16新增：`clb7_tracker` 記錄清單補上 ✏️改時長／🗑刪除**（Owen 發現記錯了以前只能存進去無法修正），順便補上 `sync_supabase.js`（原本完全沒同步）；dashboard session bar 加連結入口 | ✅ 修復（07-16）|
| `speaking.html` | 口說日誌（僅記錄有無/時長，不評分內容） | ✅ |
| `map.html` | 課程地圖（63格），已更新至第19課；**07-11新增「📐文法大局觀」分頁**（7大類文法點階段badge）＋**07-11晚新增第三分頁「📚文法資料庫」**（codex.js的9章122條，見林/見樹展開、等級篩選、搜尋、`#cx-5-2-2`座標直達）；**07-21**：`travail`tile的detail補上第18課「chercher/trouver」「專業artistique」職業詞彙；**07-26**：`loisirs`tile的detail補上第19課活動詞彙＋visiter/voir區分＋邀約用語 | ✅ |
| `ROADMAP.md` | **新增（07-12）**：CLB7考試路線圖，**以課程等級（A1/A2/B1/B2）分野，不用月曆**——每階段定訓練配比、輸出練習形態、畢業條件、進場動作。**07-13補「老師課堂實測資訊」**：DELF/TEF考試結構完整記錄、口說三部曲、字卡題池、老師應試哲學。dashboard讀`CLB_STAGE`常數決定處方文案，換階段=改這一行+照該階段進場動作逐條做 | ✅ 新建 |
| `RUBRICS.md` | **新增（07-12）**：寫作/口說分級評分尺（A2/B1/B2三把尺，各自問不同問題——A2問「溝通成立嗎」不用B2標準打擊人）＋批改者守則（一次最多糾2-3錯、錯誤標📍codex座標、禁泛泛鼓勵）。writing.html的複製prompt已內建A2尺批改指令 | ✅ 新建 |
| `writing_tasks.js` | **新增（07-12）**：依課出題寫作題庫，取代「憑空造2句」——情境任務＋指定材料＋下筆順序。**第1–21課共42題**（每課2題）；第17課起是A2 tâche1形態（40-60字訊息），**08-04第18課起再升級成「指定篇章結構」**（frame欄以⭐開頭者強制用連接詞串段落，目前7題） | ✅ 新建 |
| `creed.js` | **新增（07-12）**：學習心法14條＋通關理由14條（每條有依據，禁雞湯），dashboard「🧭今日心法」卡每天輪播，Owen自己寫的`clb7_creed_own`優先於內建條目 | ✅ 新建 |
| `daily_line.js` | **新增（08-27）**：dashboard 第一屏「今日一句」的策展清單——41 則，**只放 `sentences.js` 的 id ＋ 一行中文鉤子，檔案裡沒有任何法文**（法文靠 id 去 `SENTENCES` 撈，來源永遠是筆記／課本）。依日期輪播，⚠️ 要加就往後追加、不要重排 | ✅ 新建 |
| `tts_reader.js` | **新增（08-04）**：發音顆粒度三層共用模組（PLAN A-9／S7）——`TtsReader.mount()`（純文字→段落/句/字三層）、`mountList()`（既有「一句一元素」結構只加整段層、不動 DOM）、`speak()`、`stopAll()`。語音篩選沿用全站統一優先序；語速偏好存 `ttsr_rate`（**刻意不用 `clb7_` 前綴，不進 Supabase 同步負載**）。目前掛在 `reading.html` 與 `french_notes.html` 第21課平行閱讀兩處；**其餘 12 個各自實作 TTS 的頁面沒有動**（要重構先問 Owen）| ✅ 新建 |
| `CODEX_STYLE.md` | **新增（07-12）**：codex.js條目撰寫規範——固定房間佈局（🎧錨句/📖規則+表格+💡記法/🕐使用時機/⚠️例外/🆚易混淆/💬更多例句/🔗相關），任何session擴寫條目前必讀 | ✅ 新建 |
| `roleplay.html`＋`scenes.js` | **新增（08-24，08-25 大擴充）**：🎭 情境角色扮演——**18 個場景／755 句台詞**逐字出自筆記或 Édito 課本原文，標 A1／A2 等級。三種玩法：①**讀懂模式**（看選項挑一個，誘答教你語域）②🔥**特訓模式**（遮選項＋量起手時間＋自評，練產出與反射）③🎭**兩邊都我演**（每句都輪到你，練整段切換立場）；另有 📚**背台詞**（332 張卡，含所有分岔，SRS 1/3/7/14/30，獨立池 `clb7_rp_srs`）。預設純法語，選錯才翻中文；每句標出處；`alts` 支援「同一問題多種問法」 | ✅ 大擴充（08-25）|
| `situations.js` | **新增（08-24）**：17 個生活情境索引（掛既有 topic／課次／Answer Card，標明在考試哪裡出現，涵蓋 66/77 topic）。⚠️ **目前沒有任何頁面在讀它**，純資料層，要接哪一頁等 Owen 決定 | ⚠️ 未接線 |
| `tools/check_scenes.js`＋`tools/extract_textbook.py`＋`tools/ocr_pdf.py` | **新增（08-24／08-25）**：劇本檢查器——①每一句法文必須逐字出自 `french_notes.html` 或 `assets/.textbook_cache.txt`（課本快取，由 extract 腳本產生，**gitignore 不進 repo**）②劇本結構（出口／可達性／孤兒節點／角色都要有選擇節點／checklist 對得上）。**寫完場景必跑，兩段全綠才算完成**。`ocr_pdf.py`（08-25）用 macOS 內建 Vision OCR（離線）把掃描檔 PDF（DELF A2 全真題、A2 Cahier）轉成文字附加進同一份快取——⚠️ extract 會覆寫、ocr 是附加，順序不能顛倒 | ✅ 新建 |

**GitHub Pages 網址：** https://owenc8964.github.io/french_pronounce/dashboard.html

**今日處方順序（⚠️ 2026-07-28 更正：實際是 13 步，不是舊版寫的 9 步）**：① 🔥 熱身 Quiz 5題 → ②–⑪ 中間 10 步依日期自動輪替（`dashboard.html:751` 的 `MIDDLE` 9 項：📐文法路徑／📚研讀＋專項Quiz／填表格／反射衝刺／複習卡／造句練習／Answer Card／聽力真人語速／影集精讀，其中 `study`（文法路徑）在 `:1009` 被展開成「📚文法閱讀＋📐文法路徑」兩步、永遠成對移動）→ ⑫ ✍️ 寫作（產出）→ ⑬ 📖 閱讀。頭尾固定，中間輪替（`clb7_order_lock` 可鎖定）。時數不是步驟，由頂部 session bar 全程累計，完成按🏁結算才寫入700h。
⚠️ **13 步估時 110–145 分鐘，等於或超過系統自己設的每日 1.5–2h 上限，而 `buildPrescription()` 完全沒有算時間的邏輯**——加預算與動態配速的規格見 [`SURVEY_2026-07.md`](SURVEY_2026-07.md) A-1／A-2，等 Owen 拍板。

---

## 最近工作記錄（2026-07-05 ～ 07-07，時間順序）

- 📊 2026-08-24 週檢討報告：系統一直在長但使用量沒跟上，近28天 6.9h／實際速率差目標近 10 倍，寫作口說仍是 0 → `reports/2026-08-24-weekly.md`

### 07-05：跨頁計時器＋一本道流程（起點）
Owen 核心痛點：**每日練習像沒終點的迷宮，計時器不會動、不知道做了多久、做完5題不知下一步**。診斷確認是設計缺陷：舊計時只活在tracker.html，各頁guided=1只是自動起手、頁與頁沒有串接。

做了：新增 `session_timer.js`（`window.ClbSession` API，timestamp累計跨頁連續）；各練習頁掛載＋防雙重計入（隱藏auto-timer偵測到session進行中就停用）；dashboard改造成頂部session bar+7步番号處方（`buildPrescription`）+ 高亮下一步；quiz熱身完成set `clb7_warmup_done`；Duolingo週報種子機制（`DUO_SEED`+`seedDuo()`，Owen給截圖改一行即可，見memory `reference_duolingo_update`）。

實測：跨頁計時連續、暫停凍結、結算寫入700h、熱身完成正確跳轉。

### 07-05：跨裝置同步上線（Supabase）
Owen 多裝置使用，要時間/進度一起記錄。localStorage是單機本地，接 Supabase 當雲端中繼：後端 `hgkqyrglftljxaieberm` 專案，表 `clb7_sync(id, payload jsonb, updated_at)`，RLS開，用 publishable key（設計可公開）+ ROOM鑰匙 `owen-clb7-k9f3a72q`。合併規則：陣列用ts/id/week去重、per-key物件取last較新、時數不重複計。**已知限制**：last-write-wins，兩台同時互動可能互蓋（單人不同時用沒問題）。

### 07-06 上半：策略選課器＋table_drill整合＋內容擴充
Owen 回饋：研讀點進去會直接出題（沒有選課策略）；填表格題目太舊。做了：quiz.html `showStudyPicker()`策略選課器（未練過優先→錯誤率高→量少→久沒練，`lessonStats()`）；table_drill整合進每日流程＋補session_timer；table_drill題庫**擴充到第13課**（後續又擴充到36個表格，見07-06下半）。

### 07-06 下半：table_drill大修＋同步可靠度
Owen 換機器實測回饋5件事：①進度沒跟上又用回同一台 ②填表格切難度直接重來 ③答錯沒有複習輪 ④時間沒同步計時 ⑤內容停留早期。

**根因＋修法：**
- **時間沒計時的根因**：`session_timer.js` 的 `ensurePill()` 只在 `ClbSession.isActive()` 才顯示/計時，若不是從dashboard「開始今日學習」進來（直接點某練習連結），session根本沒啟動。→ 改成任何練習頁載入時若未啟動就自動 `API.start()`。
- **同步可靠度**：debounce從2.5s縮短到700ms；新增「切回前景也會pull()」（原本只有切背景push）。
- **table_drill加錯題複習輪**：仿quiz.html的main/review phase，主輪成績不被複習輪洗掉，複習到全對才顯示總結。
- **table_drill切難度/類型加confirm**：有進度時confirm確認，結束畫面切換不用問（`hasRoundProgress()`+`onSummary`）。
- **table_drill題庫25→36個表格**：擴充第7-13課內容（vendre/mettre/porter/venir/pouvoir/vouloir、passé composé系列3表、性格形容詞2表）。

⚠️ 測試方法問題首次出現：這輪還沒用隔離ROOM測試。

### 07-06 晚：筆記回饋機制＋每日完成率統計＋順序輪替＋**雲端污染事故**
Owen回饧四件事：①筆記頁沒回饋機制、第6課例句缺發音翻譯 ②想要每日完成統計找出最常漏掉哪步 ③順序不要一成不變且能自訂 ④跨機器要能接續進度。

做了：french_notes補懸浮回饋（💬回饋這課）；第6課否定擴充表格補翻譯；**全站通用修正**——`.compare-table`表頭最後一欄是「例句/例」時該欄自動加喇叭（惠及全部14課，不只第6課）；dashboard新增📊每日完成率分析（步驟①②③補歷史陣列`clb7_warmup_log`等，`renderHabitAnalysis()`抓近14天活躍日算完成率找出最常漏掉的步驟）；處方中間4步依日期自動輪替＋🔒鎖定開關；session bar加切裝置提醒。

**⚠️ 事故**：測試時preview的假資料透過debounce自動推上了Owen真實雲端（因為preview和正式站共用同一ROOM），污染了`clb7_writing`等多個key。發現後用UPDATE把該ROOM payload蓋成`{}`修復（DELETE因RLS沒開delete policy會靜默失敗，這也是踩到的坑）——手機本機資料沒被動到，雲端變空後手機下次開啟會自動推回真實資料自我修復。**自此建立「測試前先切隔離ROOM」的鐵律**（見上方交付前自動試跑原則）。

### 07-06 深夜：閒置自動暫停＋verb_sprint補發音
07-06上半的「自動開始計時」有副作用：Owen回報「計時跑了三小時但完全沒操作」——頁面開著沒操作，時間照時鐘一直跑到`MAX_STRETCH_MS`（3小時）才停。

修法：`session_timer.js`加閒置偵測（監聽keydown/pointerdown/touchstart/scroll/click/mousemove記錄`lastActivity`，每5秒檢查一次，超過`IDLE_LIMIT_MS`=3分鐘沒操作就呼叫`pauseAtTime(lastActivity)`——用最後操作時間當停止點，正確排除閒置時間）。全站共用（dashboard和練習頁都適用）。

同時發現verb_sprint.html完全沒有發音功能，補上ttsSpeak：動詞原形可點聽、答錯自動唸一次正解、代名詞斜線清理（"il / elle peut"→"il peut"，只清代名詞部分保留動詞變位）。

### 07-07：聽力真實資源＋TTS聽力測驗
Owen問「有沒有辦法找到聽力資源，或自己出題」，且想要「前三個直接嵌入」。查證：RFI Journal en français facile是公認A2-B1過渡期最推薦素材；InnerFrench適合A1/A2起步；TCF Canada有官方格式免費模擬題（約6份，量少不需特別整合追蹤）。**RFI/InnerFrench主網域被機器人防護擋住WebFetch**，改用Spotify官方embed iframe合法嵌入（非抓取版權內容）；TCF Canada是商業站無法嵌入，用連結卡開新分頁。

新增`LISTENING_BANK`8篇TTS聽力測驗，內容對齊已學課程（第1/3/5/6/9/11/12/13課），流程：先聽（可重播）不看字→作答3選擇題→判分→展開逐字稿對照，完成自動寫入`clb7_listening`（`source:'TTS測驗'`），沿用既有統計/來源分布UI。

**曾嘗試用 claude-in-chrome 瀏覽器直接讀取InnerFrench完整逐字稿**：確認能繞過Cloudflare機器人驗證（真實瀏覽器連線），但InnerFrench的podcast逐字稿本身被**帳號牆**擋住（免費或付費不明，Claude不會/不應代為註冊帳號）。後來發現InnerFrench的**YouTube影片逐字稿**（跟podcast逐字稿是不同的兩批內容）完全公開免費（Google Drive PDF連結，不用登入），但內容難度偏中階（B1+，比Owen現在程度A1-A2高），**決定暫不使用**，等Owen到B1再回頭考慮。

### 07-07：複習卡順序固定＋發音不一致＋同步強化＋語意不清回饋（4個真bug）
Owen回饋4件事：①跨機器進度還是不一樣 ②複習卡今天題目跟昨天一樣、到第二輪才不同 ③發音接錯程式，他下載的高品質語音沒被用到 ④有些卡片語意不清。逐一查證，**②③是真的bug**：

- **複習卡順序固定**：`review.html`的`dueCards()`只依到期時間`.sort()`，完全沒洗牌。JS sort是穩定排序，同一到期時間的一批卡永遠照`CHUNKS`陣列原始順序排列——到期卡超過一包（10張）時，每天只吃到同一批同順序的前10張。→ 加`shuffle()`後再排序（到期時間不同仍嚴格照時間排，SRS原則不變；同一到期時間點內每次順序不同）。
- **review.html發音跟其他頁不一致**：全站只有review.html是「隨便抓第一個fr語音」（`vs[0]`），其他頁都優先找Amélie/Thomas。→ 統一升級成更寬容的優先序：Amélie/Thomas→名字含premium/enhanced/amélior/plus→`localService===false`（雲端語音）→fr-FR→隨便一個。同時補上verb_reference.html（原本完全沒篩選）。⚠️ 沒問到Owen下載的語音確切名字，用啟發式規則頂著，若還是不對需要問他系統設定裡的確切名字。
- **同步強化**：review/writing/reading/verb_sprint/table_drill/quiz/dashboard完成關鍵動作時主動立即呼叫`ClbSync.push()`，不再只靠debounce。⚠️ Owen說的「跨機器進度不一樣」沒有100%定位到單一根因，這次先堵住已知風險點，若還遇到需要問清楚具體操作步驟才能精準抓。
- **review.html補回饋機制**：補懸浮回饋元件（原本沒有）+ 卡片旁「🤔這張卡語意不清」按鈕，自動帶入完整卡片內容存進`clb7_quick_notes`，供之後批次修chunks.js。

### 07-07：第13/14課表格漏class="m"（喇叭消失+行距變緊是同根因）
Owen很生氣地回報第13、14課格式跑掉——沒發音記號、行距變近。查證：這個網站規則是法文欄要標`class="m"`才會自動加喇叭，第13課（健身房/運動/飲食/假期詞彙）+第14課（wwoofing/度假詞彙三表/訂房/比較形容詞/PC être例句/法國地區詞彙）共14個詞彙表製表時漏標了。「行距變緊」不是CSS跑掉，是少了喇叭圖示佔用的高度視覺上顯得擠——兩症狀同根因。逐表核對欄位語意後只修14個純詞彙表，2個概念對照表（Il faut vs Devoir、給建議的三種方式）欄位混雜中法文故意不動。已寫進memory `feedback_notes_table_format`（規則從1條擴成2條）。

### 07-07：第13/14課排版大修（note-box系統性CSS bug＋choisir/文化框/課文填空重做）
Owen回饋4件事：①很多例句沒發音 ②課文填空排版太擠、字全部黏一起、沒發音 ③choisir變位呈現跟其他頁動詞不一樣 ④拉力賽車/法式露營的文化說明呈現不好看，以前比較像對話框。

**根因找到一個系統性bug**：第13/14課全部17個`<div class="note-box">`（健身房規定、Devoir變位、給建議、文化說明…幾乎每個小節的補充框）用的`note-box`這個class**在CSS裡根本沒有定義**——整份文件只有`.note`（黃底、左邊框、💡風格，第1–12課都用這個）有樣式。第13/14課筆記者當初打錯class名字，17個框全部裸奔變成無背景無邊框的純文字，這就是「跟以前不同、不像對話框、沒質感」的真正原因，不是CSS被誰改壞。

**修法**：
- CSS `.note {` 改成 `.note, .note-box {`（[french_notes.html:84](french_notes.html:84)）——一行修好全部17個框，不用逐一改HTML的class名稱，風險最低。
- **課文填空**（L13飲食）：原本整段法文塞在一個`<span class="fr">`裡、答案用`<u>`底線標，改成`<ul class="phrase-list">`逐句拆開，每句配中文翻譯＋答案改`<b>`加粗（跟全站慣例一致），自動吃到`.phrase-list li`喇叭規則。
- **choisir變位**：原本是`<b>`+斜線分隔的純文字塞在note-box裡，改成跟être/avoir同款的`.verb-grid > .verb-card`卡片（[french_notes.html:3892](french_notes.html:3892)附近），自動吃到`.verb-name`/`.conj-row`喇叭規則；命令式例句拆成獨立phrase-list一行。
- **24 heures du Mans／法式露營文化框**：從`note-box`+純`<b>`文字改成`.note`+💡圖示+`<br>`分行，內嵌關鍵詞（24 heures du Mans、une journée au circuit du Mans、mobil-home、caravane、camping-car）包`<span class="fr-ex">`吃到全站`.fr-ex`喇叭規則。
- **順手補的例句喇叭缺口**（全域掃描第13/14課後發現的，不只Owen點名的）：「給建議的三種方式」表格`例句`欄不是最後一欄，不會被全站的「表頭=例句/例自動加喇叭」規則抓到，手動包`.fr-ex`補上；「Il faut vs Devoir」對照表是轉置表格（例句是列不是欄），同樣手動補；「畫家×地區×PC」表格表頭原本寫「重點句（全是passé composé！）」不match自動偵測的精確字串，改名`例句`＋額外備註移到`compare-title`（沿用「Les lieux」那種寫法），4句畫家例句就自動吃到喇叭；「🇫🇷順帶學到」裡裸露的「Le Maroc a battu les Pays-Bas.」補`.fr-ex`。

**已用preview實測**：開lesson-13/14、逐一screenshot確認17個note-box都變黃底樣式、choisir卡片渲染正確且喇叭可點、課文填空逐句顯示、畫家表格例句欄喇叭出現、console無錯誤。

### 07-07：新增造句練習（sentence_drill.html）——中翻法背誦，磨到全對
Owen想到一個新方法：先背課本例句（中翻法），當天考，隔幾天再考。討論後確立設計：
- **內容來源**：不是自動抽取chunks.js，是**人工精選**的常用句庫（新建`sentences.js`，這次先手動從第1–14課筆記挑了88句真正實用、完整的句子種子起來，之後跟`chunks.js`/`table_drill.html`一樣，Owen每次給新課筆記/逐字稿時要一起補進去，見上方「卡片庫維護」）。
- **獨立新頁面**：`sentence_drill.html`，跟`review.html`分開（不共用同一個抽卡池），但**直接沿用review.html整套SRS引擎**（1/3/7/14/30天間隔、包尾重試機制）——發現review.html的`grade(false)`本來就會把答錯的卡`packet.push()`回這一輪的最後面重考，直到答對才放過，這正好完全符合「磨到完全正確為止」的需求，不用另外設計新邏輯。
- **每天固定5句新句**（`NEW_PER_DAY=5`，Owen指定的數字）＋所有到期複習句（句庫規模小，不像chunks需要分包，一次全部做完）。
- **dashboard整合**：加入處方中間的輪替群組（從4步變5步，`study/drill/sprint/review/sentence`一起輪替），今日處方從7步變8步；`HABIT_STEPS`、今日錯題本的`SRC`來源標籤都同步加上。
- **已用preview實測**：清空`clb7_sentence_*`、跑完整流程確認新句正確抽取（第1課優先）、翻卡發音正常、故意答錯一句確認packet從5筆變6筆且該句重新排到最後、最終跑完顯示「4/5」正確反映首次答對率、dashboard正確顯示8步且新步驟✓完成、錯題本正確記錄。全程用隔離ROOM測試，完後已改回正式ROOM並grep確認無殘留。

### 07-07：第15課筆記整理＋六項連動全部補齊（首次完整走一次擴充版流程）
Owen貼了第15課逐字稿（英中法混雜、老師課堂即時翻譯），附8張截圖（`~/Desktop/0707/`，課本原頁掃描）。內容：明信片寫法、passé composé(être)複習、**imparfait無人稱動詞**（本課主要新文法：il fait/il y a/c'est → il faisait/il y avait/c'était）、自然詞彙（地點/植物/動物/活動）、肉類詞彙與英法同源文化背景、Château d'If文化、大學生大使閱讀文本＋詞彙（Parcoursup、licence/master/doctorat）、談論學業、**COD代名詞me/te/nous/vous**（延伸自之前學過的le/la/les）。

**筆記整理方式**：逐字稿本身很亂（老師中英法夾雜口語翻譯、語音辨識雜訊），改用**8張課本截圖當作準確的法文原文來源**核對，逐字稿只拿來抓「老師實際強調什麼、Owen在哪裡卡關」。四件套照`skill_transcript_notes`格式全部產出：筆記本體（13個unit，見`french_notes.html` lesson-15）、🎙老師課堂法語、🔊發音警報（bronze/bronzer詞性混淆、vous dites不規則）、📋糾錯摘要（重點：passé composé的être/avoir選擇反覆卡關，這是本課最大困難點；COD代名詞兩個家族搞混；il fait vs c'était主動發問——這題問得好）。

**六項連動第一次完整走過一遍**（見上方「卡片庫維護」清單，07-07討論造句練習時才擴充成六項）：
1. `chunks.js`：這次沒寫自動parser，改用hand-curated node腳本（scratchpad一次性腳本）直接生成88張新卡append進去，用跟既有卡一致的id規則（`L15_{fr前24字}`slug化）算出id、跟現有768張的id集合比對去重。768→856張。
2. `questions.js`：新增23題（imparfait 8題、passe-compose複習3題、cod-pronouns延伸4題、vocab-nature 4題、universite-vocab 4題），`BANK`615→638。同步在`dashboard.html`和`quiz.html`的`TOPIC_LABELS`加上三個新topic（`imparfait`/`vocab-nature`/`universite-vocab`）。**順便發現**quiz.html的TOPIC_LABELS本來就比dashboard.html少很多key（vocab-vacances、passe-compose等好幾個topic都沒有，會fallback顯示英文原始key）——這是既有的小bug不在本次範圍，已用`spawn_task`記錄成獨立任務給Owen之後決定要不要修。
3. `table_drill.html`：新增1個表格`imparfait-impersonnel`（il fait/il y a/c'est三格填空，type:verb, lesson:15）。
4. `sentences.js`：新增10句（S_L15_1~10），88→98句。
5. `map.html`：**沒有新建tile**，改成把地圖裡本來就存在、`unlocked:false`的兩個「未來規劃佔位格」（`imparfait`、`etudes`，B1區的Études&école）直接改成`unlocked:true, lesson:15`並更新detail文字對齊實際教的內容——地圖本來就有預先規劃63格涵蓋到B2，很多超前的格子是佔位，只要真的教到了就解鎖，不用另外新增格子。`CURRENT_LESSON`14→15。
6. **驗證方式踩到一個preview工具的已知限制並解決**：quiz.html/dashboard.html的`questions.js`是用`<script src>`載入、`const BANK = [...]`宣告——想用`fetch+eval`重新載入验证時，因為`const`在同一個global lexical scope不能重複宣告，會拿到「表面上执行成功、但實際上還是舊binding」的偽陽性（這比HANDOFF原本記錄的「單純快取」更陰險，是JS作用域問題不是快取問題）。最後改用**注入iframe或直接把測試用的假資料push進當前頁面已載入的`BANK`陣列、用`filterLesson=15; restart()`直接驅動UI渲染**來驗證quiz.html的渲染／評分邏輯正確，另外用**Node直接eval檔案內容**（不經過瀏覽器）驗證資料本身語法正確、count正確——两条路径互補，都通過。⚠️ 以後驗證這類`const`宣告的共用.js檔案，不要迷信fetch+eval，直接Node驗證資料+瀏覽器內用`.push()`注入測UI比較可靠。

### 07-09/07-10：聽力真人語速測驗——排進每日處方＋擴充到7篇
Owen釐清listening.html的核心定位：不是只做TTS練習，而是「真人音檔（來自網路）＋Claude自己出的TCF/TEF風格模擬題」，而且**一定要排進每日處方**，不能只是選做的頁面連結。並且明確要求：新內容盡量用真人來源，不要再用TTS生成；既有TTS若保留要確保用高品質語音（既有的Amélie/Thomas優先邏輯已經滿足這點，不用改）。

**技術設計**：`LISTENING_BANK`新增`audioUrl`類型（跟原本`script`的TTS類型並存於同一陣列）：
- 有`audioUrl`的卡：播放真實mp3（`<audio controls>`），不用TTS
- 題目全部是**Claude自己寫的原創題**，不是抄對方網站附的簡單練習題
- 逐字稿核對步驟：有`audioUrl`的卡改成連結卡連到`sourceUrl`（對方原頁面），**不把對方逐字稿存進本站程式碼**——這是刻意的版權考量，跟TTS類型「直接顯示script文字」的呈現方式不同
- 記錄到`clb7_listening`時`source`欄位標`真人語速測驗`（跟原本`TTS測驗`區分），時長用手動量測的`durationSec`而非字數估算

**排進每日處方**：`dashboard.html`新增`listenDoneToday()`（檢查今天有無`source:'真人語速測驗'`的記錄）、加入`MIDDLE`輪替群組（study/drill/sprint/review/sentence/**listen**，6項輪替）、`stepDefs.listen`、`HABIT_STEPS`。今日處方變成9步番号。`listening.html`補上`?guided=1`參數處理（自動挑一篇今天沒做過的真人語速測驗開始，跟其他頁面guided模式一致）。

**內容擴充**：用claude-in-chrome瀏覽器逐篇造訪 podcastfrancaisfacile.com 的對話庫（該站有上百篇免費A1~進階日常對話，音檔+逐字稿+理解題都公開），確認每篇的真實mp3連結（不用猜的），自己聽懂內容後寫3題原創選擇題。目前做了7篇（麵包店/車站/市場/肉店/魚店/藥局/問路，涵蓋A1~A2的購物/交通/健康/問路情境），全部在preview逐篇實測過音檔真的能播放（用`new Audio()`量測實際秒數）、題目渲染正確、評分正確、記錄正確寫入。⚠️ 這只是先做7篇，之後可以照同一套模式繼續擴充更多主題/更高難度（B1+）的真人音檔。

**版權處理原則（這次確立，之後比照辦理）**：真人音檔可以直接embed播放（串流對方伺服器，不下載存本地）；題目一律自己原創，不抄對方的；逐字稿一律連結出去，不存進repo。

### 07-10：文化深掘Podcast——瀏覽器TTS版本被否決，改用NotebookLM

見上方「下一步」第0項的完整記錄。摘要：第一版用瀏覽器SpeechSynthesis逐行朗讀兩人對話稿（中文+法文語音交替），Owen實測回饋「像Google翻譯、機器人感很重」，長度也不夠。討論後改成Owen用已付費的NotebookLM Audio Overview自己生成音檔，Claude負責寫prompt方向指南（`assets/podcast/NOTEBOOKLM_PROMPT.md`）＋接住結果登記進系統。`listening.html`的「🎙️文化深掘Podcast」板塊改成純本地mp3播放（`CULTURE_BANK`目前是空陣列），已用preview測試過空狀態、假資料播放面板、標記完成寫入紀錄都正常，且已確認沒有污染Owen真實Supabase雲端。詳見memory `feedback_tts_quality`、`feedback_content_restructure_philosophy`。

### 07-10：第16課筆記整理＋六項連動全部補齊

Owen貼了第16課逐字稿（英中法混雜、老師課堂即時口語翻譯）＋9張課本截圖（`~/Desktop/0710/`）。內容：**la durée**（pendant/longtemps/toujours三分工，本課主要新文法）、易混淆的à+年紀/il y a/depuis三種時間結構、大學科系詞彙（les études et les personnes、les disciplines）、**pronoms relatifs qui/que**（另一個主要新文法）、閱讀文本《L'exposition Hexagone》（攝影展，Elsa/Hana/Cyril三人物訪談）、職場詞彙大宗（lieux de travail/professions/tâches/outils/personnes）、**l'intensité**強度副詞（un peu/assez/très/beaucoup/trop）、pour ou contre le télétravail表達意見句型。

**筆記整理方式**：跟第15課同樣流程，用9張課本截圖核對法文原文，逐字稿只拿來抓老師實際強調什麼、Owen在哪裡卡關。四件套照`skill_transcript_notes`格式全部產出：筆記本體（11個unit，見`french_notes.html` lesson-16）、🎙老師課堂法語、🔊發音警報（droit/drôle搞混、outils發音、mail假朋友）、📋糾錯摘要（重點：pendant/longtemps/toujours/depuis四者反覆確認是本課最大困難點；亮點是Owen用爸爸的真實故事主動組出完整段落描述台灣醫療接送服務，還有qui/que轉換練習幾乎全對）。

**六項連動**：
1. `chunks.js`：hand-curated node腳本（scratchpad一次性腳本）生成80張新卡append進去，用`L16_{fr前24字}slug化`規則算id、跟現有id集合比對去重。⚠️ **踩到一個新坑並修好**：初版slug只取fr前24字，導致「Je suis arrivée en France à deux ans」跟「...il y a deux ans」這種長共同前綴的句子slug撞在一起，第二筆被誤判成「已存在」而靜默漏加——腳本邏輯原本是撞到就skip，改成撞到就在id後面加`_2`/`_3`遞增，不再漏資料。856→936張。
2. `questions.js`：新增26題（duree 8題、qui-que 7題、intensite 5題、metier-travail-vocab 5題、其餘算作duree延伸），`BANK` 638→664。同步在`dashboard.html`和`quiz.html`的`TOPIC_LABELS`加上四個新topic。
3. `table_drill.html`：新增3個表格（durée選填、qui/que選填、intensité選填），這三個是「文法功能詞填空」不是動詞/形容詞/冠詞/介係詞，**新增了一個表格類型`gram`（文法詞）**——原本的4個類型（verb/adj/article/prep）都不合適，加了新的filter按鈕+CSS顏色（`#c02a5c`）。36→39個表格。
4. `sentences.js`：新增10句（S_L16_1~10），98→108句。
5. `map.html`：**沒有新建tile**，把兩個本來就存在、`unlocked:false`的B1區佔位格（`travail`「Travail & emploi」、`relatifs`「Pronoms relatifs」）改成`unlocked:true, lesson:16`，並改寫detail文字對齊實際教的內容（relatifs保留「dont/où還沒教，之後才會教」的備註，跟L15的imparfait tile处理方式一致）。`CURRENT_LESSON` 15→16。
6. **驗證方式**：全部用preview逐一實測——`french_notes.html`確認11個unit渲染正確、表格喇叭圖示正常；`map.html`確認CURRENT_LESSON顯示16、travail/relatifs兩個tile的class變成`tile unlocked`；`quiz.html?lesson=16`跑了一題choose題確認答案比對正確（綠色高亮）；`table_drill.html`切「文法詞」篩選器，三個新表格逐一填完，15/15全對；`sentence_drill.html`確認總數108句、開始一輪不crash。全程用隔離ROOM測試，測完已改回正式ROOM並grep確認無殘留字串。

### 07-11：修好「計時動不動就斷掉」——兩個真bug（多分頁閒置搶跑＋開始鍵洗掉進度）

Owen回饋：儀表板計時器很不穩，「動不動就斷掉」，具體是「數字整個重置回0或直接消失」，而且「按繼續，三秒後又停了變回原樣」。逐一查證`session_timer.js`後找到兩個獨立的真bug：

- **Bug 1（對應「按繼續三秒後又停」）**：閒置偵測（`IDLE_LIMIT_MS`=3分鐘，每5秒檢查一次）的`lastActivity`是**每個分頁自己的記憶體變數**，但它控制的`clb7_session.running`是**跨分頁共用**的localStorage狀態。如果Owen開了第二個分頁（例如忘記關的舊練習頁），那個背景分頁的`lastActivity`早就過期，但它的5秒檢查迴圈還是持續在跑——一旦偵測到「running && 閒置超過3分鐘」就會呼叫`pauseAtTime`把session暫停回去，完全不管是不是另一個分頁剛剛按了「繼續」。這解釋了「按繼續、幾秒後又斷」：不是繼續鍵本身壞了，是另一個背景分頁的舊計時器把它蓋回去。
  **修法**：加`document.hidden`判斷——閒置檢查迴圈開頭直接`if (document.hidden) return;`（背景分頁完全不檢查閒置）；分頁從背景切回前景時（`visibilitychange`且非hidden）把`lastActivity`重置成現在，避免把「切走的這段時間」誤判成閒置。

- **Bug 2（對應「數字整個重置回0」）**：`ClbSession.start()`原本是無條件`save({accSec:0,...})`，完全不檢查是否已經有session在跑。目前唯一呼叫點是dashboard的「開始今日學習」按鈕，理論上session一啟動該按鈕就會被隱藏，但如果Owen開了第二個dashboard分頁/視窗（那個分頁的DOM還沒被告知session已啟動，按鈕依然顯示），在那邊誤按下去就會把正在跑、已經累積的時間直接洗成0。
  **修法**：`start()`加防呆——如果session已經`active`，不重置`accSec`，頂多把`running`重新設回true（等同resume），不會再把已累積的時間洗掉。

**驗證**：用`fetch(url,{cache:'no-store'}).then(eval)`重新載入最新`session_timer.js`（避開preview的.js快取，這是HANDOFF已知的坑）後直接在console模擬兩個情境——① 呼叫兩次`start()`確認累計秒數不會被洗成0 ② 用`Object.defineProperty(document,'hidden',{get:()=>true})`偽裝分頁進入背景，確認閒置檢查迴圈跑過一次tick後`running`依然是true。兩個情境都通過。另外也在dashboard實測正常情況下的暫停/繼續，確認沒有因為這次修改而弄壞原本就正常的行為。

### 07-11：查了每個分頁是否都有計時器＋新增map.html「文法大局觀」分頁

Owen問「確定現有的每個分頁都有計時嗎？」，沒有直接信HANDOFF舊清單，改用`grep`逐一查證每個`.html`檔案是否include `session_timer.js`。結論：**9步今日處方用到的頁面（quiz/table_drill/verb_sprint/review/sentence_drill/listening/writing/reading+dashboard）全部都有**；`speaking`/`tracker`/`map`/`verb_reference`故意不計時（合理，不是練習頁）；但發現一個真缺口——`french_basics.html`（發音練習：數字/星期/月份/Sons du Français/文法表，是`french_notes.html`頂部導覽列直接連過去的真實互動工具）完全沒有計時器，在裡面練習的時間不會算進700h。另外也發現4個孤兒檔案（`french_sounds.html`/`index.html`/`time_editor.html`/`french_notes拷貝.html`，都未加入git、沒有任何頁面連過去）。Owen當下選擇「先不用」處理這兩件事，留待之後決定。

**後續聊到買書/免費資源找文法練習**，Owen自己意識到一個更根本的問題：他沒有「文法大局觀」，不知道法語文法的全貌跟自己卡在哪裡，所以不確定該去外面找什麼內容整理進系統。查了現況發現：`questions.js`的`BANK`已經有40+個`topic`在追蹤正確率（`dashboard.html`的`getTopicStats()`），但只被攤成一條扁平的「嚴重弱點」警示文字，沒有分類、沒有大局觀視覺化。

**做的事**：不新增資料源，直接重組`map.html`既有的63格`TILES`——幫其中26格純文法點（動詞現在式/時態/語氣建議被動、代名詞、冠詞疑問句否定、形容詞比較、連接詞論述，7大類）標記`gram:true, cat:'...'`，新增「📐文法大局觀」分頁（跟原本「🗺課程地圖」分頁切換），依文法類別重新分組展示，**每格保留自己原本的CEFR等級配色**（用新的`tz-a1/a2/b1/b2`class，不依賴外層容器的zone class，所以同一個文法類別裡可以同時看到A2綠、B1橙、B2紫混在一起，直接呈現「這塊文法我從哪裡學到哪裡」的進度感）。已解鎖的格子在detail面板新增「📖回筆記完整複習這個文法點→」連結，直接跳`french_notes.html#lesson-N`。

**驗證**：preview測試——分頁切換正常、文法大局觀render出全部26格分7類、已解鎖格點擊面板正確顯示連結（href正確指向對應課次）、未解鎖格正確隱藏連結、切回原本課程地圖分頁功能沒有被破壞（面板點擊/開合都正常）。

⚠️ **待Owen決定的兩件事（沒有動，留給下次）**：①`french_basics.html`要不要補`session_timer.js` ②4個孤兒檔案（`french_sounds.html`/`index.html`/`time_editor.html`/`french_notes拷貝.html`）要清掉還是接進系統。

### 07-11：複習卡＋造句練習新增🔴手動標記「不熟」

Owen提出的功能：複習不熟的單字時可以直接點紅點標記，隨複習次數累加，讓他知道要抓哪個重點看，系統也能依標記次數多考幾次。

**設計決定**：這是Owen主觀認定「沒抓穩」的信號，刻意跟SRS的對錯（w/c）分開存，不影響既有SRS的間隔演算法——避免「明明因為運氣答對但其實還是不熟」跟「明明答錯只是手滑」這兩種情況被系統誤判。

**實作**（`review.html`＋`sentence_drill.html`，共用同一套邏輯跟同一個`clb7_hard_flags` key，chunks.js的id前綴`L{n}_`跟sentences.js的`S_L{n}_`不會撞）：
- 卡片右上角新增🔴按鈕，點一次該卡的count+1，累計次數直接顯示在按鈕旁（🔴×N）
- `bonusFlaggedCards()`：抓出「有標記、但今天不會自然到期」的卡（用SRS到期時間判斷，不用是否已經被排進當次packet判斷——後者會受`shuffle()`影響，每次呼叫可能給出不同的「已在包內」名單，導致提示數字跟實際加碼數量對不起來，這個坑是這次寫的時候自己踩到又修好的），依標記次數排序，取前`FLAG_BONUS_MAX`張（review.html=2、sentence_drill.html=1）額外塞進當天的包，UI標示「🔴加碼複習（你標記過不熟）」
- 開始畫面的提示文字也會先預告「+N張你標記過不熟的卡會加碼考」

**驗證**：用console模擬「同一批flag連續呼叫`bonusFlaggedCards()`8次結果是否一致」確認修好shuffle不一致的問題（修好後穩定回傳同一個數字）；也用真實UI點擊（不只是console）跑過一次「開始複習→點紅點→看到🔴×1即時更新」的完整互動。

⚠️ **測試中意外驗證到一個既有的sync系統限制（不是這次新增的bug）**：切換`sync_supabase.js`的`ROOM`前後，如果本機剛`removeItem`清掉某個`clb7_*` key，但之前那個key在還沒切換ROOM時已經被debounce push到舊ROOM的雲端，之後任何頁面的`pull()`時機只要跟這次清除有時間差，舊值有可能又從舊ROOM雲端被拉回本機（因為`apply()`邏輯是「本機沒有這個key就直接寫回」，不分辨是「本來沒有」還是「剛被使用者清掉」）。這次因此在本機重新看到已經清掉的測試資料，但直接查詢**真實**Supabase payload確認沒有污染到正式雲端。已經寫進上面「注意事項」的Supabase教訓小節，以後要更嚴謹驗證「真的清乾淨」的話，要直接查雲端payload，不能只看本機localStorage或畫面沒異常。

### 07-11：文法學習框架（Grammar Path）上線——五階段狀態機＋🚩檢舉機制

Owen 的核心回饋（這次最大的方向轉變）：「記不熟就直接進考題，一直把正確錯誤的答案混在一起；有時候題目出錯我又一直被洗錯的選項」「先把整個大學習框架建立好再說」。診斷：現有系統只有「測驗」沒有「學習」，筆記讀完直接進考題中間沒有階梯；且低熟練度做選擇題有 negative suggestion effect——錯誤選項會跟正確答案一起被記住。

**三個 Owen 拍板的設計決定**：①已學過的19個文法點**全部重走**（初始stage=2，用「沒有記錄=stage 2」實現，不用寫初始化資料）②半開卷題目**沿用現有題庫**換介面 ③🚩檢舉機制一起做。完整 PRD 見 [`PRD.md`](PRD.md)。

**五階段**：0未開課→1📖理解→2🪜半開卷（規則卡全程可見+打字題）→3🎯遮規則（答錯才翻開）→4🧪考題（quiz混考，精熟=沿用CLB標準≥75%且≥5題次）→5⚡反射（v2）。階段2/3**絕不出選擇題**。

**實作**（詳見上方系統狀態表 gram_rules.js / gram_trainer.html 兩列）：
- `map.html` 文法大局觀分頁改由 `GRAM_POINTS` 渲染（26→32格，含6個新增點：determinants/reflechis/imperatif/prepositions/adjectifs-accord/duree-temps——這些是教過但原地圖沒有對應文法格的），每格顯示階段pill，面板加「去練習→」按鈕。**map.html 原本自己的 `const GRAM_CATS` 陣列已刪除**（跟 gram_rules.js 的同名常數相撞），課程地圖分頁不受影響（63格照舊）。
- `quiz.html`：`getPool()`/`startTopicSprint()` 排除被檢舉的題；結果區加🚩按鈕（`flagCurrentQ()`：分數回正、錯題本移除、複習輪複本一併拔掉）；策略選課器每課列出「還沒走完路徑的文法點」（🪜連結直達trainer，軟性提示不硬鎖——硬鎖會癱瘓每日流程）。
- `dashboard.html`：步驟②從「研讀+專項Quiz」改成「📐文法路徑」（`gramRecText()`推薦邏輯跟trainer的guided一致；完成判定沿用`clb7_quiz_done`，歷史統計不斷裂）；警報區加「🚩有N題被檢舉停用中」；錯題本SRC加`gram:'📐 文法路徑'`。
- **檢舉審核流程**：Owen按🚩→題目立即從quiz/trainer所有出題池消失→dashboard警報顯示待審數→**下次session Claude要主動查`clb7_flagged_qs`（從Supabase payload或請Owen報數字），修好題目後把該筆從陣列移除，題目自動回池**。
- **題池偏薄待補**（已spawn_task）：relatifs打字題僅3題、duree-temps僅4題、imparfait僅5題。
- **v2待做**：干擾配對自動偵測+對照卡（Owen說「一句話A/B/C三個文法，第一次錯B第二次錯A」的互相干擾問題，等框架跑順再上）；階段5非動詞類反射。
- **07-11 加碼：🧭「為什麼長這樣」層（why layer）**。Owen 把學習哲學說完整（《駭客任務》式由上而下、上下夾攻、不說故事——詳見 memory `feedback_content_restructure_philosophy` 07-11補充＋`assets/podcast/NOTEBOOKLM_PROMPT.md`），並明確要求這方向不只給 podcast、**整個系統都要有**。實作：19個現役點的 `rule` 各加 `why` 欄位（一段由上而下的設計邏輯：拉丁文遺產/發音侵蝕/高頻磨損/母音相撞禁忌等，把「例外」解釋成歷史必然），gram_trainer 規則卡與 map 大局觀面板都顯示，**順序刻意是 title→why→points→examples（先大局再細節，順序本身就是哲學）**。同時更新 podcast 指南為 Owen 親排的四大模組15集課綱，每集標了對應文法點（podcast 由上而下＋trainer 由下而上＝上下夾攻）。

**驗證**（全程隔離ROOM）：trainer完整跑過「選點→階段2答錯重考→規則提醒→首次5/6升階→階段3規則卡收起→答錯自動翻開→SRS只在階段3寫入→🚩檢舉從池移除」；map大局觀32格7類、面板三種狀態（現役/未開課/課程地圖格）都對；quiz檢舉後分數回正+錯題本移除；dashboard步驟②推薦與✓完成、🚩警報。測完清掉preview的`clb7_gram_stage`/`clb7_flagged_qs`、切回正式ROOM、grep無殘留、**直接curl真實Supabase payload確認326個key裡沒有測試key**。

### 07-16（事故記錄）：正式雲端第二次被推成空 `{}`，已自我修復，測試protocol已補強

當晚在做完好幾個功能（Answer Card、📚文法閱讀、tracker編輯/刪除、🎬影集精讀）之後，例行 curl 確認正式雲端時發現 `owen-clb7-k9f3a72q` 這個房間的 payload 變成空的 `{}`。查證後確認：**每一輪「ROOM切TEST→測試→清資料→ROOM切回正式→grep確認」都有照做**，但漏掉一步——切回正式值之後，preview 分頁還開著、還在被 navigate/互動，而 `push()` 的設計是把「當下分頁的 localStorage 整包蓋過去」（不是跟雲端合併，合併只發生在 `pull()`），所以某次分頁背景事件（`visibilitychange`/`pagehide`/debounce）觸發的自動上傳，就把一份不完整的內容整包蓋掉了正式雲端資料。

**判斷資料沒事的依據**：①Owen 真實裝置（手機/電腦）的 localStorage 是完全不同網域，不會被 preview 碰到 ②`apply({})` 對空 payload 是 no-op（`Object.keys({})` 是空陣列，迴圈不會執行，不會刪除本機任何 key）——所以就算 Owen 的裝置在雲端空的時候拉取一次，本機資料也毫髮無傷 ③請 Owen 開一次正式網站後，`updated_at` 更新、payload 恢復（342 keys，`clb7_tracker` 從事故前 1934 筆變 2072 筆——不只恢復還持續成長，證實資料全程沒有流失，只是雲端中繼站短暫被蓋空）。

**協定補強**（已寫進上方「交付前自動試跑原則」跟 memory `feedback_sync_test_isolation`）：**ROOM 改回正式值之後，下一步只能是 `preview_stop`，不能再 navigate 或跟分頁互動**——這是這次補上的關鍵鐵律，之前的協定只顧到「檔案值」有沒有切對，沒顧到「已經開著的分頁背景事件」這個風險窗口。

---

### 07-16：恢復「研讀＋專項Quiz」每日步驟，跟文法路徑分開獨立追蹤

之前討論「研讀+quiz移除」時 Owen 一度認同這個改動（07-11被📐文法路徑取代），但後來想清楚後反悔：**「研讀一課+quiz練習」（挑一課、開筆記研讀、做該課題目）跟「文法路徑」（單一文法點的規則卡陪練）切入角度不同，兩個都值得每天練，不是取代關係**。

**根因**：`gram_trainer.html` 完成時寫的是 `clb7_quiz_done`/`clb7_quiz_log`（07-11設計時刻意共用quiz的key，圖歷史統計不斷裂），這表示只要做了gram_trainer**或**quiz.html任一個，兩者都會顯示「完成」——這正是為什麼07-11之後「研讀+quiz」這個獨立需求感覺消失了：它其實還在，只是完成判定被gram_trainer共用掉了。

**修法**：`gram_trainer.html` 改寫專屬的 `clb7_gramtrainer_done`/`clb7_gramtrainer_log`；`clb7_quiz_done`/`clb7_quiz_log` 恢復原本專屬quiz.html的意義。dashboard新增 `lesson_quiz` 步驟（📚研讀＋專項Quiz（挑一課），href `quiz.html?guided=1`）跟 `study` 步驟（📐文法路徑）各自獨立判定完成，中間輪替群組加入 `lesson_quiz`（9項）。

**驗證**：preview模擬「只做gram_trainer」確認📐文法路徑✓、📚研讀+Quiz仍未完成；再模擬「做quiz.html」確認📚研讀+Quiz也✓、📐文法路徑不受影響地維持✓（兩者互不干擾）；📊每日完成率統計正確拆成兩欄（📚研讀＋📐文法路徑）。測完清資料、ROOM還原、確認雲端無殘留。

### 07-16：CLB_STAGE 切到 A2＋鎖住 futur-proche（跟真實課程進度校準）

兩件事都是同一個主題——**系統內部標記的教學進度要跟 Owen 真實上課進度對齊，不能各自假設**：

1. **CLB_STAGE 'A1'→'A2'**：老師確認 A1 課本教完、已進 A2 內容。Owen 拍板「換階段以真實課程進度為準，不強求內部精熟度100%達標」——完整討論過程、進場動作待辦清單都在 [`ROADMAP.md`](ROADMAP.md)「老師課堂實測資訊」段落，這裡不重複。
2. **鎖住 `futur-proche`**：Owen 反映「還沒學到未來式」，但 `gram_rules.js` 標記它 `lessons:[8]` 已教過、`unlocked:true`，導致📐文法路徑／📚文法閱讀一直推薦它。改法：①`gram_rules.js` 該點 `unlocked` 改 `false` ②**光改這個還不夠**——`quiz.html` 的 `getPool()` 原本完全不檢查 `GRAM_POINTS.unlocked`（只濾 type/lesson/檢舉），所以就算文法點被鎖，`topic:'futur-proche'` 的題目還是會在warmup/topic sprint隨機抽到。補上過濾：`gramPointOfTopic(q.topic)` 對應的點若 `unlocked:false` 就直接排除，不只是不推薦。table_drill.html/sentences.js/writing_tasks.js 掃過沒有futur-proche相關內容，不用動。
   **驗證方式**：preview的.js快取讓瀏覽器內驗證看到假的`true`（已知坑），改用 **Node直接require/eval `gram_rules.js`** 確認資料本身正確（`unlocked:false`），再用**隔離的mock物件單元測試** `getPool()` 新加的過濾判斷式三種情境（鎖住的topic排除／沒鎖的topic保留／沒對應文法點的詞彙類topic保留）皆正確，不依賴會被快取誤導的瀏覽器即時驗證。
   ⚠️ **未做但值得問 Owen 的後續**：`GRAM_POINTS` 裡其他18個現役點的 `lessons` 標記會不會也有同樣「跟實際教學進度對不上」的情況？這次只修了 Owen 主動點名的 futur-proche，沒有逐一覆核其他點。

### 07-16：新增「🎬影集精讀 Shadowing」每日步驟——Extra Français/Peppa Pig反覆看＋句型整理＋跟讀

Owen 提出一套以「影片反覆觀看＋Language Reactor雙字幕＋shadowing跟讀」為核心的輸入方法論（詳見他貼的完整設計文件：不追新集數、同一集看5-10次榨乾內容、四遍分工：①理解劇情②整理10個核心句型③跟讀3-5次④隔天複習）。討論後把這份文件裡另外兩個大概念做了收斂決定：

- **「Topic Card」（6時態固定欄位框架）併入 Answer Card 的版本成長藍圖**，不另建系統——15題現在都是A1版，之後升級依序補passé composé／imparfait+futur／conditionnel+opinion，沿用現有 `answer_cards.js`/`answer_card.html` 引擎，不重複問 Owen 同一批主題兩次。**當晚已問了14題passé composé版本的問題等 Owen 回答**（見上方對話，V2內容尚未生成，是下一步待做）。
- **「Core Sentence Library」（跨主題高頻連接語句庫）併入 `sentences.js`**，不重建新系統——之後 Owen 從影片整理出的句型，用同一套「人工精選、共用SRS引擎」模式收進去，差別只是來源從課堂變成自主看片。
- **影集/Language Reactor/shadowing 本身不需要新系統**——那是 Owen 在 Chrome 上的操作流程，Claude 接手的環節只有「整理他抓出來的句型」這個動作。

**唯一真的排進系統的新東西**：`listening.html` 新增「🎬 影集精讀 Shadowing」卡片——記錄集數/第幾遍（①理解②整理句型③跟讀④複習）、第2遍可貼上整理的句型原文（存進 log 供之後整理，還沒自動化，要等 Claude 之後手動處理）；`dashboard.html` 加入獨立輪替步驟（中間輪替群組6→7→**8**項：study/drill/sprint/review/sentence/answercard/listen/shadowing，跟現有🎧聽力步驟並存，Owen明確選擇「新增獨立項目，接受每天最多12步」而不是合併取代）。

**驗證**（隔離ROOM，用真實UI事件觸發存檔按鈕而非只呼叫函式）：填表單→選第2遍→貼3句→點擊真實儲存按鈕→確認`clb7_listening`正確寫入含`sentences[]`陣列；進度提示文字正確算出「下次建議第幾遍」；歷史清單正確顯示；dashboard正確顯示第8步「✓完成」、📊每日完成率統計新增「🎬影集精讀 1/9」欄位。測完清除測試key、ROOM還原——**但這輪測試後續发现了上面那則「正式雲端被推空」的事故，時間點就在這次測試之後，已經記錄並補強協定。**

⚠️ **待Owen提供真實內容才能做的後續**：等 Owen 用 Extra Français/Peppa Pig 實際做完一次「第2遍整理句型」並貼上真實內容，Claude 要把這些句型手動整理進 `sentences.js`（比照現有「人工精選」維護模式），這是「後續整理」承諾的具體動作，現在還沒有真實資料可以整理。

---

### 07-16：Answer Card 系統上線——高頻話題答案卡，內容是 Owen 自己的真實故事

Owen 貼了一份自己寫的 AI prompt構想：不是背別人寫的範文，而是建立「同一份答案持續長大（A1→A2→B1→B2）」的高頻話題答案庫，練到「看到問題→法文自然浮現」。討論後定案三個設計分岔點（AskUserQuestion 問的）：①練習模式＝**文字回想**，先做這個（複用 sentence_drill.html 引擎，不做錄音口說）②版本升級＝**系統依SRS數據自動建議**（卡片畢業時記進待辦清單，不是日期到就換）③範圍＝**一次搭好 TEF Canada 15 個高頻主題**的骨架。

**內容產出方式（這次最關鍵的設計調整，Owen 主動提出）**：不是 Claude 編故事，是 **Claude 先出問題（中文）→ Owen 用中文/破碎法文真實回答自己的人生→ Claude 修成正確道地的 A1 版本**。15題一次問完，Owen 一次答完（自我介紹/家庭/工作/教育/興趣/飲食/旅行/加拿大移民動機/住家/購物/健康/科技/環保/社交/未來計畫），Claude 逐題核對修正（過程中 Owen 挑出3處問題：工作那句兩句話沒連接詞太生硬、AI寫成IA才對法文縮寫順序、社交那句意思弄反——都是根據 Owen 真實回答二次修正，不是憑空生成）。

**實作**：
- `answer_cards.js`：15張卡，每張 `{id, topic, title, q_fr, q_zh, versions:[{level,d,fr,zh}]}`，目前每張只有 A1 版本（Owen 的真實內容，文法限制在他學過範圍：現在式為主+少量passé composé/futur proche/qui關係代名詞）。
- `answer_card.html`：完全複刻 sentence_drill.html 的引擎（SRS 1/3/7/14/30天、包尾重試磨到全對、🔴手動標記共用 `clb7_hard_flags`、懸浮回饋、自動計時）；差異點——新卡上限**3/天**（比單句重）；卡片首次畢業（3不同天答對+iv≥3）自動記進 `clb7_ac_upgrade_ready`，dashboard 警報會提醒「下次開 Claude session 請他升級」。
- dashboard.html：快速入口加「🗣️ Answer Card」連結（顯示到期複習數）；alerts 區加 ⭐ 升級待辦提醒。**這次沒有排進9步番号處方**——是新東西，先讓 Owen 試用幾天再決定要不要正式綁進每日流程（跟07-10文化深掘podcast「先做幾篇試效果再決定」是同一個保守模式）。
- 這是一套**獨立內容池**，不掛六/七項連動清單（跟 sentence_drill.html 當初上線時一樣，先獨立驗證，之後若併入每日流程再評估要不要接 last_lesson 等機制）。

**驗證**（隔離ROOM）：preview 跑完整流程——3張新卡（1新1複習1加碼位置都測過）、翻卡渲染問題/答案/中文對，故意答錯1張確認排到本輪最後重考、二次答對後 packet 正確結束、完成畫面 2/3 分數正確、SRS record 三卡都正確寫入（due=明天）、wrong_log 正確記錄答錯的家庭卡、newcount 正確計數3；用 JS 直接驗證 `isGraduated`/`markUpgradeReady` 邏輯（畢業判定 true/false 各一案例、重複呼叫不重複加入清單）；dashboard 端驗證快速入口 sub 文字顯示、⭐升級提醒 alert 正確渲染、📕今日錯題本正確顯示 answercard 來源。測完清除 `clb7_answercard_*`／`clb7_ac_upgrade_ready`／wrong_log 裡的 answercard 筆，ROOM 切回正式值，grep 確認 repo 無殘留字串，curl 真實 Supabase payload（330 keys）確認沒有 answercard 相關 key 洩漏。

**07-16 當天追加**：Owen 確認要把 Answer Card 排進每日9步番号（已完成，見上方系統表＋下面「排程」小節），中間輪替群組從6步變7步（study/drill/sprint/review/sentence/answercard/listen）；問清楚「還有文法部分」的意思後確認是指既有的📐文法路徑（gram_trainer，`study`鍵）——Owen 提醒不要漏掉/打散它，這次調整維持它原位不動，只是把 Answer Card 加進同一個輪替群組。已用 preview 驗證（隔離ROOM）：`#rxList` 正確顯示10步含「Answer Card 高頻話題答案卡」、📊每日完成率分析grid正確顯示「🗣️答案卡 0/9」新欄位、原有欄位數字不受影響、無 console 錯誤。測完 ROOM 還原、grep+curl 確認雲端無殘留。

⚠️ **仍待 Owen 決定**：A2/B1/B2 版本的內容也要走「Owen 先答、Claude 再修」的流程，還是等 SRS 判定畢業後 Claude 直接主動加深？（目前設計是後者：卡片畢業進 `clb7_ac_upgrade_ready`，Claude 主動生成下一版本；如果 Owen 想要每次升級都親自重新回答一次會更貼近真實想法，需要再問一次要不要改流程）

### 07-16（續）：📚文法閱讀補上——文法框架的「階段1理解」原來從沒被走過

Owen 追問「文法閱讀似乎還沒排齁」。查證後發現：`gram_rules.js` 的五階段設計裡本來就有「1📖理解」，但 07-11 拍板「現役19點全部重走」時實作成「沒記錄=直接視為階段2」，**階段1從未被實際走過**——`codex.js`（記憶宮殿122條深度內容）目前只能靠自己點進 `map.html` 📚文法資料庫分頁翻，沒有排進每日流程、沒有完成紀錄。

確認兩個設計決定（AskUserQuestion）：①選哪一條讀＝**跟當天📐文法路徑推薦的點配對**（讀完接著練，上下呼應）②排程位置＝**固定接在📐文法路徑前面**（不是獨立輪替項，是跟著 study 一起移動的配對，讀完才練）。

**實作**：
- `codex.js`：新增 `CODEX_BY_GRAM` 反查索引＋`codexEntriesForGram(gramId)`——用條目既有的 `gram` 欄位（本來就存在，連去練習用）反查某個文法點對應哪些記憶宮殿座標。
- `dashboard.html`：`gramRecText()` 拆出 `gramRecPoint()`（回傳推薦點物件本身，不只是文字），供新步驟複用同一個推薦邏輯；新增 `stepDefs.gramread`（連到 `map.html?read={座標}#cx-{座標}`，用既有 hash 直達機制自動展開捲動）；`getMiddleOrder()` 輪替陣列不變，改在攤平順序時把 `study` 展開成 `['gramread','study']`（無論 study 那天轉到哪個位置，文法閱讀永遠緊接在它前面）；`HABIT_STEPS`／📊每日完成率分析加入這一欄；新增 `codex.js` script include。
- `map.html`：新增 `?read=座標` 參數處理——帶著這個參數進來時，頁面底部浮現「📚今天的文法閱讀：讀完這條了嗎？」條，點「✓讀完了」寫入 `clb7_gramread_done`/`clb7_gramread_log` 並 `ClbSync.push()`；**順便補上 `session_timer.js`＋`sync_supabase.js`**（map.html 之前完全沒有這兩個，因為它一直被當成「不在主流程」的參考頁，現在文法閱讀變成每日必做步驟，時間該算進700h、完成狀態也要跨裝置同步）。

**驗證**（隔離ROOM）：dashboard 正確顯示「讀 5-5-1（Futur proche）」且與同一天📐文法路徑推薦的「Futur proche」完全配對一致；點連結進 map.html 確認自動切到文法資料庫分頁、展開第5章、捲動並閃爍 5-5-1 條目、底部完成條正確顯示；點「✓讀完了」後 `clb7_gramread_done`/`log` 正確寫入、按鈕消失、文字變「✅ 已完成」；回 dashboard 確認步驟5顯示「✓ 完成」、📊每日完成率分析grid正確新增「📚文法閱讀 1/10」欄位。測完清除 `clb7_gramread_*`、ROOM 還原、grep+curl 確認無殘留。

⚠️ **待確認**：`map.html` 新增計時器後，Owen 之後如果只是想「隨便逛逛地圖/文法大局觀」（不是走每日文法閱讀步驟）也會被算時間——這是合理的（逛文法資料庫也是真實學習時間），但如果 Owen 覺得不對可以再拿掉。

### 07-12（三）：路線圖＋依課出題寫作＋🧭今日心法卡（Fable 最終批）

Owen 三個定案：①里程碑**以課程等級分野（A1/A2/B1/B2）不用月曆** ②「每天寫2句」廢除（要憑空發揮創意，自然不會寫）→ **依今天念的課出題** ③學習方法＋通關理由要每天在 dashboard 跳出來提醒，**而且他自己寫的要優先於 Claude 寫的**（他原話：「我更知道我自己要的或相信的」）。

**新檔三份（Fable 親寫的判斷核心）**：
- [`ROADMAP.md`](ROADMAP.md)：A1/A2/B1/B2 各階段的訓練配比（70/30→60/40→50/50→30/70）、輸出階梯（A1 依課寫3-4句→A2 tâche1→B1 tâche1+2＋**中段診斷性首考**→B2 論說文＋真人口說）、畢業條件、進場動作。鐵則：挫折感是儀表（出現在剛好高一小步＝正常）；換階段才換任務形態。**換階段＝dashboard 的 `CLB_STAGE` 改一行＋照該階段進場動作逐條做**。
- [`RUBRICS.md`](RUBRICS.md)：分級評分尺（A2/B1/B2 寫作＋口說），批改者守則（一次最多糾2-3錯、錯誤標📍codex座標、禁泛泛鼓勵/超綱建議）。**之後任何 session 批改 Owen 產出前必讀**。
- [`writing_tasks.js`](writing_tasks.js)：16課×2題寫作題庫（情境＋指定材料＋下筆順序）。第七項連動再+1：新課要補2題。
- [`creed.js`](creed.js)：學習心法14條＋通關理由14條（每條有依據，禁雞湯）。

**接線（原派 Sonnet，因月額度上限改 Fable 親做，已全部實測）**：
- `clb7_last_lesson` = {lesson, d}：quiz.html 帶 `?lesson=N` 進入時＋gram_trainer `startPoint()` 時寫入（取該點最新課次）。
- writing.html：guided 顯示任務卡（今天課次的2題依日期輪替；今天沒念課→16課選課列），複製的 prompt 含任務全文＋**A2尺批改指令**（回覆首行維持「分數：X/10」相容既有解析），記錄多存 lesson/taskId 欄位。
- dashboard.html：新「🧭 今日心法」卡（Owen自己的 `clb7_creed_own` 輪播優先＋💪why＋🛠️how 各一條依日輪播＋📐文法路徑階段統計＋輸入框「＋收進清單」）；`CLB_STAGE='A1'` 常數＋各階段摘要；步驟⑧文案改「針對今天的課寫一則」。
- 新 keys：`clb7_last_lesson`、`clb7_creed_own`（皆走既有 sync）。
- 驗證：隔離ROOM 實測 quiz→last_lesson 寫入、writing 任務卡 W16a＋prompt 含 A2 尺＋記錄含 lesson/taskId、dashboard 三元素（階段tag/心法輪播/文法統計）＋自寫條目優先顯示。測後清測試 key、ROOM 還原、curl 真實雲端確認無殘留。
- ⚠️ **Claude 訂閱月額度已撞上限**（背景 subagent 跑不動了）——之後的 session 開場先確認額度狀態再派工。

### 07-12（續）：條目升級 v3「維基式小文章」

Owen 看完 v2 再回饋：「見樹的狀況不夠細緻，好像只是告訴我這顆樹叫什麼名字，剩下一問三不知」「註解太攏統或太隨性」，點名要維基式詳盡＋條目內開合＋「文法規則/例外/使用時機/例句/相近比較/易混淆」＋互相連結。

**v3 設計**（規範全文見 [`CODEX_STYLE.md`](CODEX_STYLE.md)，寫任何條目前必讀）：固定房間佈局 🎧錨句(常開)→📖規則(常開，含`grid`表格＋`mnem`記法欄)→🕐usage→⚠️exc→🆚vs(可帶對照grid)→💬more→🔗see互連，後四段可開合（`.cx-sec2`）。**比喻/口訣一律進 mnem 欄，pts 正文只准準確完整的敘述**——這是 Owen 批評的核心。渲染器 `cxItemBody()` 向下相容 v1字串/v2物件格式。

**進度**：1-3 冠詞六條＝v3黃金範本（已實測：grid表格、vs對照表、開合段、see互連、⚡按鈕全通過並上線）。**第2-9章103條已派 Sonnet worktree 任務照 CODEX_STYLE 升級 v3**（每章 commit 一次防中斷，會回報最沒把握的法文例句座標清單供抽查）。先前的 v2 轉換任務被 Owen 中止、已被此任務取代（其 worktree 裡2-4章的v2半成品不用撈）。第1章除1-3節外仍是v2，深度待補（可併入下次任務或抽查後手動補）。

⚠️ **preview驗證這頁的坑**：preview server 連 map.html 都會快取——用 `map.html?v=N` cache-busting 參數重載最省事；黑屏截圖問題照舊用 DOM/get_page_text 驗證。

### 07-12：資料庫可讀性改版——先句後規＋術語字典＋⚡讀完馬上考

Owen 看了上線的資料庫回饋「頗有claude的風格，但我看完是有看沒有懂」，要求加例句並徵求方案。診斷：初版是寫給B1的密度（規則先行、例句少、術語裸奔）。Owen 選了三案並行：
1. **先句後規**：每條開頭「🎧先看句子唸出聲」錨句區（2句完整句，大字可發音），規則條列退後，且每條規則物件化 `{r,fr,zh}` 內嵌自己的示範例句。渲染器**向下相容**字串pts（分章轉換期間安全）。
2. **術語白話字典**：`codex.js` 的 `CODEX_TERMS`（21個術語：COD/部分冠詞/變位/助動詞…），渲染時自動把 pts/exc 文字裡的術語包成可點 `.cx-term` 標籤（`cxTermify`，用`\x01`佔位符兩段替換、長術語優先、每段每術語只包一次），點了彈 `#cxTip` 白話解釋。⚠️ 注意：cxTermify 的佔位符是**控制字元 \x01**，Read工具顯示不出來、Bash指令放不進原始字元——要驗證用 scratchpad 腳本（見 termify_test.js 模式）。
3. **⚡讀完馬上考**：條目底部按鈕連 `quiz.html?topic=X`（quiz 本來就支援 topic 參數直接進該topic衝刺，零改動）。
第1章19條已親手轉成黃金範本並實測（錨句在前/每規則帶例句/術語tooltip/⚡按鈕全過）；**第2–9章派了 Sonnet 背景 worktree 任務照範本轉換**（嚴禁動座標/lvl/topics等欄位，node驗證座標集合不變），完成後主session要抽查它自報「最沒把握」的法文例句再merge。

### 07-11 晚：📚文法資料庫（記憶宮殿）上線——編號座標樹＋練習題📍定位

Owen 把需求說得非常明確（他強調這對考試非常關鍵）：要一個「像資料庫」的頁面，扎扎實實可以展開縮起，B2等級全境、資料要夠、例句例外都要有；**全縮＝見林**（一眼看完全部大方向）、**點開＝見樹**（連細紋都不放過）；相似相異要清楚；最關鍵的是**要能 locate**——做題時能知道「啊！這是1-5-2」。他自述記憶特性：「腦袋習慣記憶有明確分類方法、有明確位置容易具象化的東西，想到那個位置就比較好翻出來」。目前的痛：「學像是地面上散一堆的資訊，撿起來啃，放回去又雜亂在一起」。

**實作**：
- `codex.js`（見上方系統表）：9章編號樹。章的分法＝法文文法的權威骨架：1名詞與限定詞/2形容詞/3代名詞/4動詞變位/5時態/6語氣/7句型/8介係詞連接詞/9副詞與時間。
- `map.html` 第三分頁「📚文法資料庫」：工具列（全部展開/縮起、A1-B2等級chip篩選、搜尋）；章可開合、條目一行摘要點開見細節（說明/例句🔊/⚠️例外/🆚對比跳轉/📐去練習）；`#cx-5-2-2` hash 直達（自動切分頁+展開+捲動+閃框）；大局觀面板也加「📚資料庫門牌」連結。
- `quiz.html`/`gram_trainer.html` 答題結果區：`codexLocate(q.topic)` 顯示「📍 9-4-1 durée 四天王」連到 `map.html#cx-9-4-1`——撿起來的資訊放回固定架位。
- **Owen 同場提出的方向**（記憶宮殿是實作的一部分）：他說這個「由上而下」方向不只podcast，「整個複習手冊都需要」——所以先做了規則卡🧭why層（前一個commit），這次再做資料庫。
- **韓國多語者研究**（Owen問的，派了背景agent查證）：結論＝韓國整體英語其實中段班且口說墊底（EF EPI #48），可借鑑的是脫離補習主流的個人方法：①shadowing只在聽懂80%+的素材上做（接在聽力測驗後跟讀2-3遍）②句型骨架輪替換詞（正好就是sentence_drill的方向，可再強化為「週主題句型」）③SRS實證最硬不可犧牲④輸出不足是亞洲考試型學習的通病，反射衝刺後可加60-90秒「盲說」。報告連結已存對話記錄，尚未實作任何一項，等Owen挑。
- **驗證**：node驗證座標唯一/巢狀正確/topic不重複；preview實測分頁切換、見林9章、cxJump展開捲動、hash直達、搜尋（depuis→5-1-1+9-4-1）、等級篩選、quiz與trainer的📍連結（隔離ROOM）。⚠️ preview面板捲動後截圖會全黑（合成瑕疵），版面量測與文字擷取證實頁面本身正常——以後驗證這頁別依賴scrolled screenshot，用`get_page_text`/DOM量測。
- **⚠️ 併行注意**：這段時間 Owen 本人正在真機使用系統（雲端出現今天的真實 warmup/tracker記錄），同時背景有一個「補薄題池」任務在自己的 worktree 跑（`.claude/worktrees/`裡它自己的 sync_supabase.js 是 TEST ROOM，正常隔離行為）。主 repo 的 ROOM 已確認切回正式值。

### 07-11：french_notes.html 選字標記＋listening.html 補3篇缺題目的真人語速音檔

Owen回饋兩件事：①筆記「白花花一片」，想要能在上面選字標記重點/不熟，而且「如果Claude讀得到感覺更好」②聽力頁有些嵌入的音檔沒有配題目，「看得到逐字稿的應該都要出題」。

**筆記選字標記**：跟review.html的🔴標記是不同機制（那個是整張卡一鍵標記，這個是筆記裡任意選一段文字）。做法：監聽`mouseup`偵測文字選取，選取範圍要落在`details.lesson-group`裡才顯示浮動工具列（🔴不熟／⭐重點），點擊後用`Range.extractContents()`+`insertNode()`把選取的文字包進`<mark>`（這個方法比`surroundContents()`更穩，選取範圍跨越多個element邊界也不會丟例外），同時記錄`{lesson, type, text, date}`進`clb7_notes_marks`。**持久化的難題**：`<mark>`包住的DOM在重新整理頁面後就消失了（筆記本體是靜態HTML，不是從資料庫渲染），解法是頁面載入時對每一筆記錄，在對應`lesson-N`容器內用純文字比對（TreeWalker掃過所有文字節點串起來找子字串位置）重新定位、重新包一次`<mark>`——找不到就跳過（例如筆記內容之後被改寫，舊標記的文字不存在了），不強求。點已存在的標記可以移除（跳確認對話框）。這次還沿用了既有的懸浮回饋面板（`qnotePanel`），加了一小節顯示標記數量+「複製標記給Claude」按鈕，呼應Owen說的「如果你讀得到感覺更好」。

**listening.html補題目**：查了「真實聽力資源」區塊的Podcast Français Facile六篇（麵包店/車站/起司店/市場/咖啡廳/郵局），發現麵包店/車站/市場三篇因為07-09/07-10已經被搬進`LISTENING_BANK`重新出過題（同一個mp3，兩處都有），但**起司店（fromager1.mp3）、咖啡廳（cafe-situation1.mp3）、郵局（a-la-poste.mp3）這三篇只有播放器+連結卡，完全沒有配題目**——這就是Owen說的缺口。用瀏覽器實際造訪對方三個頁面讀逐字稿（chez-le-fromager-13.html／au-caf-1.html／dialogue-a-la-poste.html），確認內容後照HANDOFF既有的版權原則（自己原創題目、不抄對方的、不存逐字稿進repo）各寫3題選擇題，新增`r08`/`r09`/`r10`進`LISTENING_BANK`。音檔實際秒數用`new Audio()`量測（起司店35秒、咖啡廳12秒、郵局36秒）。

**驗證**：兩個功能都在preview跑過完整流程——筆記標記測了🔴跟⭐兩種類型、確認`<mark>`正確渲染、重整頁面後標記正確重新套用（持久化驗證通過）、點擊移除也正常；listening.html三篇新題目都跑了「聽→答題→3/3全對→正確寫入`clb7_listening`」的完整流程。⚠️ **這次也踩到一個自己的疏忌**：開始測試前忘記檢查`sync_supabase.js`的ROOM是不是還在TEST，結果整段測試都是在正式ROOM上跑的——事後直接查詢真實Supabase payload確認沒有污染（`clb7_notes_marks`不存在、`clb7_listening`只有原本真實的1筆），這次算運氣好没出事，但這提醒**下次每次要測試寫入`clb7_*`的功能前，都要重新確認ROOM現在是什麼值，不能假設前一個任務测完就會自動還原成TEST**。

---

### 07-17：建立專案級 CLAUDE.md（規則從 HANDOFF/memory 收攏成鐵律）

起因：Owen 丟 Claude Code 用量報告（5/29–7/12）要求分析。報告點出三大摩擦：①幻覺/bug 程式碼（21次）②沒對齊方向就狂寫（16次）③領域鐵律被反覆遺忘（真實教材來源提醒 3+ 次、牙位左右顛倒多次）。對照後發現①②大多已被後來建立的制度（自動試跑、ROOM 隔離協定）修掉，但③有結構缺口：**本專案一直沒有 CLAUDE.md**，硬規則散在 HANDOFF 和 memory，新 session 容易漏。

做了：新增 `CLAUDE.md`（本專案首個），收四類鐵律——內容鐵律（真實教材來源／個人化內容不代筆／codex 座標永不重編／compare-table 表格格式）、測試鐵律（ROOM 切換＋preview_stop 協定摘要，細節仍指回本檔）、交付鐵律（自動試跑／dashboard 大腦檢查）、**新增「討論模式」約定：Owen 說「先討論」→ 只提問提案不動檔案**。同場也補了牙科專案（專屬牙科看診系統生成）的 CLAUDE.md：加討論模式＋「牙位左右鐵律」section（FDI 象限病人視角、鏡像呈現、用 dental MCP `get_tooth_orientation` 查方位、改動後截圖用基準牙驗證），該專案改動已照其維護協議備份至 `backups/CLAUDE.md.bak-20260717`。

### 07-17：第17課（A2・passé composé 完整版）入庫——DELF口說實測劇本＋17個être動詞＋不規則分詞全表

Owen 貼了兩堂課的資料：07-13 一見鐘情閱讀（該堂逐字稿未入庫，只留痕跡在 ROADMAP）＋07-17 這堂的完整逐字稿（含跟老師的口說模擬對話）、A2課本 passé composé 單元頁面截圖、DELF A1 口說考官文件PDF。這是 **A2 課程第一課**，內容量特別大（DELF考試結構＋17個être動詞完整清單＋16個不規則過去分詞＋DELF口說第1部分14句個人答案劇本），連帶四項連動的資料量也跟著放大。

**筆記內容**（`french_notes.html` lesson-17，9個unit）：DELF A1口說三部曲（結構表＋第2部分字卡題池19個主題＋第3部分角色扮演套路）、口說實測劇本（老師實問→Owen真實答案修正版14句，直接可當DELF第1部分個人答案庫）、passé composé助動詞二分（avoir/être/反身動詞三分表）、**17個être動詞清單**（課本原文，訂正舊筆記寫的「19個」為官方17個＋反身動詞另計）、過去分詞三條規則線＋16個不規則分詞全表、il y a vs dans／depuis vs pendant時間結構總對決、口語文化角（MDR、encore的兩個意思）、老師課堂法語、發音警報、糾錯摘要。

**八項連動**：
1. `questions.js`：新增14題（passe-compose 11題+duree 3題），`BANK` 664→678。
2. `sentences.js`：新增10句（S_L17_1~10），108→118句。
3. `chunks.js`：hand-curated腳本生成40張新卡（19個不規則分詞原形/分詞對+21個句子塊），936→976張；踩到一次逗號語法錯誤（腳本 join 邏輯漏掉陣列最後一元素前的逗號），`node --check`當場抓到並修正。
4. `table_drill.html`：新增2個表格（`participes-irreguliers-1/2`，各8列，涵蓋16個不規則分詞），36→38個表格。
5. `gram_rules.js`：`passe` 點 `lessons` 補17、`why`/`points` 的「14個」全部訂正為「17個」（跟課本官方清單校準）。
6. `codex.js`：`5-2-2`（être家族＋配合）的規則內容同步「14→17」訂正，`exc` 提及14常客的三處也一併修正。
7. `map.html`：`CURRENT_LESSON` 16→17；沒有新增/解鎖tile（第17課是A2課本的延續單元，沒有對應A1地圖佔位格）。
8. **驗證**（隔離ROOM）：quiz.html 14題全部渲染正確（choose選項合法性、q-zh區塊顯示）；table_drill 兩個新表格rows數正確；map.html 三處資料點（CURRENT_LESSON/gram_rules的17個/codex的17個/座標總數181不變）全過；console無錯誤。**這次確實踩到07-16事故後補強的鐵律**：ROOM改回正式值後下一步立刻 `preview_stop`，沒有再navigate或互動，curl確認雲端353 keys、updated_at是Owen真機活動、無殘留測試字串。

✅ **07-13課文缺口已補（同日追加）**：Owen 貼了課文截圖《Une histoire d'amour comme au cinéma》（Leïla Bekhti/Tahar Rahim真實故事，Julia Duranton, *Cosmopolitan*, 24 juin 2021），整理進 lesson-17 新增的「📖課文閱讀」unit——逐句法中對照＋課本標記的passé composé動詞形用`<b>`加粗（一次示範avoir/être/反身三種助動詞情境，剛好對上5-2章節）＋詞彙筆記（coup de foudre、faire connaissance、prendre son temps等5個高頻慣用語）。這5個慣用語同步補進`chunks.js`（981→986張，注意這是**課文附帶的可重用語塊**，不是課文敘事本身——課文講的是名人的故事不是Owen會講的話，沒有整批塞進sentences.js，這個判斷依據跟memory `feedback_personal_content_authenticity`一致：不代替Owen講話）。lesson-17 summary 標題同步補上課文書名號。preview驗證：18句全部正確掛TTS喇叭、bold動詞形正確渲染、視覺排版確認。這次筆記瀏覽沒有寫入風險資料，未切TEST ROOM（純靜態內容展示，不涉及quiz/SRS等會寫`clb7_*`的互動）。

另外把課文的10個passé composé句子（真實課文原句，不是編的）改成填空/選擇題補進`questions.js`（678→688），涵蓋avoir/être家族/反身動詞/否定PC四種助動詞情境——preview用真實UI注入驗證了兩題最容易判錯的（否定句`n'ont pas voulu`含撇號、反身動詞choose題`se sont`），SRS判分邏輯都正確。

### 07-20（事故記錄）：正式雲端第三次被推空（353→2 keys），已自我修復，找到部分根因

在驗證上述10題quiz題目時，**忘記先把`sync_supabase.js`的ROOM切成TEST**就直接用真實ROOM在preview跑了`checkAnswer()`兩次（測否定句與反身動詞choose題），各寫入一筆SRS記錄。發現疏失後立刻`removeItem`清掉本機的兩筆測試key、`preview_stop`。但事後curl確認真實雲端時，payload從353個key暴跌到只剩2個（`clb7_duo`、`clb7_snapshots`），時間戳跟這輪測試時間相近。

**根因分析（跟07-16同機制，但這次量級對不上我的測試範圍）**：我這兩筆測試SRS記錄的寫入/清除不足以解釋353→2這麼大的落差——當時這個preview分頁本身有332個`clb7_*` key（是先前分頁遺留、從雲端pull過的完整鏡像），就算debounce真的在移除前後各推了一次，也應該是332或334個key，不是2個。**推測**：中斷期間（context compaction/session gap）可能有另一個完全乾淨、沒有pull過任何資料的分頁或環境，用真實ROOM開啟了`dashboard.html`——`clb7_snapshots`是dashboard載入時自動產生的週快照、`clb7_duo`是舊的種子殘留，這兩個key會在「近乎全新的localStorage」下自然存在，其他351個key則完全沒有，跟推空後的payload形狀吻合。**沒有找到那個分頁/環境的直接證據**，只是形狀比對出的合理推測，不是確認的根因。

**判斷資料沒事的依據（沿用07-16建立的邏輯）**：apply()對雲端payload是「有的key才覆蓋本機，沒有的key不刪本機」，Owen真實裝置的本機資料完全不受影響。請Owen直接打開正式網站後，`updated_at`更新、payload從2恢復到353（跟事故前key數完全一致），curl確認259個quiz SRS key、21張複習卡進度、`clb7_gram_stage`、`clb7_last_lesson`全部完整，兩筆測試污染key確認不存在。**全程沒有真實資料遺失**，只是雲端中繼站又被短暫推空。

**協定缺口（07-16補強後仍然發生第三次，說明「記得切ROOM」這件事本身不可靠）**：這次是**忘記切TEST ROOM**才直接動手測試——不是協定執行有漏洞，是根本沒啟動協定。07-16的補強（ROOM切正式值後立刻preview_stop）解決的是「切換後的風險窗口」，但沒解決「一開始就忘記切」這個更前面的失誤點。**下一個 session 起：任何要跑`checkAnswer()`/`grade()`/會寫SRS或`clb7_*`的操作前，先執行`grep "var ROOM" sync_supabase.js`確認現在是不是TEST值再動手，不要憑記憶判斷「這應該不會寫入」——這條已經是CLAUDE.md鐵律但這次證明光有鐵律不夠，要養成「動手前先grep確認」的具體動作**，而不是「應該有切」的印象。

---

### 07-21：第18課（A2・Parcours de vie＋La négation完整版）入庫——DELF/A2課本人生大事詞彙＋假期閱讀文＋否定句位置規則

Owen 貼了 `~/Desktop/0721/` 5張課本截圖（Parcours de vie 詞彙頁、Vacances en famille 課文、法語縮字文化框、表達喜好句型框、La phrase négative 文法頁）＋一份英中法混雜的課堂逐字稿。內容：**Parcours de vie**（戀愛/結婚/生子/搬家/離婚等人生階段動詞、la vie personnelle 名詞、學業職涯詞彙、professions artistiques 陰陽性例外）、課文《Vacances en famille》（全家運動活動：canoë-kayak/stand-up paddle/vélo/via ferrata）、Pour parler de ses goûts（喜好強度光譜）、**La négation 完整版**（延續第1/6/16課的 ne...pas/jamais/plus/rien/personne，這次補齊四組「肯定↔否定」對照＋passé composé 裡的位置規則＋personne 當主詞 vs 受詞的差異，這是本課最重要的新增文法細節）。

**九項連動全部補齊**（沿用07-11起確立的清單，逐一核對）：
1. `french_notes.html`：新增 `lesson-18`，8個unit（Parcours de vie動詞/vie personnelle名詞、學業職涯+professions artistiques、課文閱讀、表達喜好、La négation完整版、老師課堂法語、發音警報、糾錯摘要），106處喇叭、30則phrase-list、8個compare-table。
2. `questions.js`：新增16題（vocab-parcours-vie新topic 6題、likes-hobbies-sports 2題、negation 8題），`BANK` 688→704；`quiz.html`/`dashboard.html`的`TOPIC_LABELS`同步補`vocab-parcours-vie`。
3. `chunks.js`：hand-curated腳本生成35張新卡（沿用07-10確立的id碰撞遞增後綴規則），981→1016張。
4. `table_drill.html`：新增1個「文法詞」表格`negation-mots`（rien/personne/jamais/plus選填，6列），42→43個表格。
5. `sentences.js`：新增10句（S_L18_1~10），126→136句。
6. `gram_rules.js`：既有`negation`點（07-11已建立，涵蓋pas/jamais/plus/rien/personne+頻率/強度）補`lessons`陣列加18、新增2條rule points（PC中的位置規則、personne主詞vs受詞）＋2個新example。**這是延伸既有文法點，不是新建**——因為négation框架本來就橫跨多課逐步加深，不是每次都要開新點。
7. `map.html`：`CURRENT_LESSON` 17→18；否定句已透過GRAM_POINTS驅動的「📐文法大局觀」分頁自動反映，不用手動改tile；`travail`（B1 zone，lesson:16）tile的detail欄位補上這次的chercher/trouver區分＋professions artistiques完整例子（沒有新建tile，跟L17「內容是既有主題延伸就不硬造新格子」的處理方式一致）。
8. `codex.js`：7-2-2（jamais/plus/rien/personne换尾巴）補1條新pts——personne當主詞放動詞前、當受詞放動詞後，跟一般主詞位置規則一致（不是新座標，122條總數不變）。
9. **驗證**（隔離ROOM，開始preview前已用`grep "var ROOM"`確認並手動切TEST——這是07-20事故後補上的具體動作，這次確實先做了）：quiz.html topic sprint模式顯示「⚡衝刺模式：人生大事詞彙（Parcours de vie）（6題）」且用真實UI作答「Elle cherche du travail...→trouvé」顯示「✓正確！」（SRS寫入路徑全通）；table_drill.html「文法詞」篩選器確認4個表格（含negation-mots）都在池中；review.html/sentence_drill.html console驗證CHUNKS/SENTENCES正確載入18課新資料；map.html console驗證CURRENT_LESSON=18、GRAM_POINTS的negation.lessons含18、codex.js總座標仍122條。測完ROOM改回正式值後**立刻preview_stop，沒有再navigate或互動**（07-16/07-20鐵律），grep確認repo無`TEST-DO-NOT-USE`殘留字串。

---

### 07-24：兩個真bug——文法路徑連兩天出同題目＋動詞衝刺答不出來就卡死

Owen回饋「文法路徑這兩天都出現同樣的題目，是bug嗎？」。追問確認是「durée」（toujours/il y a/pendant）這個文法點。查證：`gram_trainer.html`的`poolOf()`只吃打字題（`!q.opts`，排除選擇題，避免選項污染半開卷/遮規則階段），而`duree`topic的打字題（fill/trans）當時只有5題，`ROUND_SIZE=6`一輪就等於整個池子被吃光，洗牌也還是同一批5題。**根因記錄**：這正是HANDOFF從07-11就標記過的「題池偏薄待補」清單裡的項目（relatifs 3題、imparfait 5題、duree-temps 5題），一直沒真的動手補。這次補了7題新打字題（`questions.js`），typed pool 5→12。

同一則訊息裡Owen又追加一個回饋：「動詞反射那個有點沒效益。如果我都沒答題就不會往前進」。查`verb_sprint.html`的`submit()`發現：空白輸入直接`if (inp.disabled || !inp.value.trim()) return;`，按Enter完全沒反應。**第一版修法**：拿掉空白擋板，讓空白提交比照答錯流程（顯示正解＋暫停＋手動繼續）。Owen驗收後追加澄清：他講的其實是「想很久、完全發呆、連Enter都沒按」，這樣60秒會整個空耗在同一格——這是**單題沒有計時器**的問題，跟「空白提交」是兩個不同的洞。**第二版修法**：新增`THINK_TIMEOUT_MS`(6秒)單題計時器，超時未提交任何答案就自動觸發`submit()`（視為沒答出來），揭曉正解＋暫停，跟手動答錯同一套繼續流程；`nextQuestion()`起頭清舊計時器重新起算、`submit()`一開頭清計時器避免重複觸發。

**驗證**（隔離ROOM）：durée文法點打字池node驗證12題；verb_sprint空白提交／發呆7秒兩種情況都在preview用console模擬確認正確揭曉正解並暫停等待手動繼續，正常快速答對不受影響。ROOM測完立刻改回正式值+preview_stop，grep確認無殘留，兩次個別commit並push。

---

### 07-26/27：第19課（A2・Les loisirs＋indicateurs de temps複習＋passé composé/négation總複習）入庫＋verb_sprint新增passé composé模式

Owen貼了`~/Desktop/0726/`5張課本截圖（Les loisirs詞彙頁、Les indicateurs de temps文法複習頁、Envie de sortir對話課文、L'essentiel總複習頁含passé composé轉換題+phrase négative重組題+parcours de vie/loisirs詞彙vrai-faux/找出intrus、J'ai participé aux Jeux de la Francophonie運動員訪談課文）＋一份英中法混雜逐字稿＋一份361頁的Cahier PDF（僅供參考，實際內容已從截圖取得，未深入翻閱361頁）。Owen明確要求：①之前內容也要一併整理進去 ②「文法每次更新都要跟上當下的進度」——確認gram_rules.js的lessons陣列每次都要補到位 ③「動詞的練習也要跟上，現在已經到過去式了」——這是要求verb_sprint.html擴充passé composé模式的明確指示。

**⚠️ 版權處理**：J'ai participé aux Jeux de la Francophonie是一篇真實訪談文章（CIJF, 21 mai 2019出處）。這次改變做法，**不再逐句全文翻譯**（07-13處理《Une histoire d'amour》的方式），改成**摘要+少量短引用**（每則引用不超過15字並標出處），主要篇幅放在文法示範句（il y a onze ans/pendant deux semaines/depuis hier）跟內容重點摘要（中文）。之後遇到類似的雜誌/新聞式課文，比照這次的做法（摘要為主，不整段照抄）。

**九項連動全部補齊**：
1. `french_notes.html`：新增`lesson-19`，9個unit（Les loisirs詞彙+visiter/voir區分+le paddle陷阱、indicateurs de temps複習表、課文摘要J'ai participé aux Jeux de la Francophonie、Envie de sortir邀約對話、老師課堂法語、發音警報、糾錯摘要）。
2. `questions.js`：新增21題（vocab-loisirs新topic 5題、duree 3題、passe-compose 5題、negation重組4題、adjective-position 2題、social-invitations 2題），`BANK` 711→732；`quiz.html`/`dashboard.html`的`TOPIC_LABELS`同步補`vocab-loisirs`。
3. `chunks.js`：hand-curated腳本生成24張新卡，1016→1040張。
4. `sentences.js`：新增10句（S_L19_1~10），136→146句。
5. `table_drill.html`：這課沒有新的「文法詞」類型內容（négation重組/passé composé轉換用quiz.html的trans/fill題型已足夠涵蓋），沒有新增表格。
6. `gram_rules.js`：`negation`/`duree-temps`/`passe`/`adjectifs-accord`四個既有文法點的`lessons`陣列都補上19（呼應Owen「文法每次更新都要跟上當下進度」的要求，逐一核對而非只補明顯提到的點）。
7. `map.html`：`CURRENT_LESSON` 18→19；`loisirs`（A2 zone，lesson:3）tile的detail補上第19課活動詞彙、visiter/voir區分、邀約用語（沒有新建tile）。
8. `codex.js`：9-4-1（durée四天王）本來就完整涵蓋il y a/pendant/depuis三分工，這次內容是複習沒有新增座標，未變動。
9. **verb_sprint.html新增passé composé模式**（Owen明確要求）：`VERBS_PC`新增9動詞的aux+分詞形式（être動詞用`|`分隔陰陽性兩解，如`suis allé|suis allée`）；`mode`變數＋`V()`helper函式讓所有既有邏輯（cellKey/isCorrect/pickCell/renderHeatmap/nextQuestion/recordAttempt/showDone）改吃當前模式的動詞表，不用複製一份邏輯；`isCorrect()`改用`split('|').some()`比對多解；新增`primaryForm()`只在顯示/發音時取第一個解（陽性），避免UI出現`|`符號；獨立localStorage key（`clb7_sprint_cells_pc`/`clb7_sprint_sessions_pc`）跟présent完全分開，不互相污染反射熱力圖統計；start screen新增Présent/Passé composé切換按鈕。
10. **驗證**（隔離ROOM，開始前已grep確認並手動切TEST）：mode切換按鈕UI正確反映active狀態＋熱力圖標題文字；PC模式`isCorrect`用node獨立測試4種情境（陽性/陰性/帶代名詞/去重音）全過；瀏覽器內用console強制指定être動詞（aller/venir）測試陰性解「suis allée」「sommes venues」都正確判對且sprintCorrect正確累加；分別驗證avoir家族動詞（faire）陽性單解也正確；showDone()的missedTables渲染PC分詞表無報錯、primaryForm正確拔掉`|`符號。⚠️ 測試時因為工具呼叫間有真實延遲，數次撞到6秒單題計時器自動觸發（跟07-24新增的THINK_TIMEOUT_MS機制打架），確認是測試方式的產物不是真bug，改用「同一次js_exec內完成設值+提交+讀結果」的原子操作重測後結果乾淨。ROOM測完立刻改回正式值+preview_stop，grep確認無殘留。

---

### 07-28：系統性 Survey（Opus 5）——報告見 [`SURVEY_2026-07.md`](SURVEY_2026-07.md)，修了 2 個低風險 bug

Owen 派工要求做一次三面向（教學法／使用體驗／技術健康度）的全系統檢視，**先出報告再動手**，中高風險項目一律只寫報告不實作。**全程沒開 preview、沒有任何寫入 `clb7_*` 的操作**，ROOM 從頭到尾是正式值；對雲端只做唯讀 GET。

⚠️ **報告的定位（Owen 中途明確校正過，之後 session 沿用）**：**檢視對象是這套程式，不是使用者**。不看「哪一步沒做完」，只看「這套機器哪裡出力不足、哪裡會在半路失效」。Owen 同時點名**聽力／口說明顯很弱，要求持續研究並安排進度**——報告因此加了 **D 段：聽力／口說補強路線圖**。

**三個最影響達標能力的系統缺陷**：
1. **聽力庫只有 13.2 分鐘音檔／10 篇／30 題，而且會無限重播**——`listening.html:955` 的 guided 只檢查「今天做過沒」，10 篇跑完一輪後每天從 `r01` 重來、每篇永遠同樣 3 題。**第 11 天起這個步驟測的是記憶不是聽力**，`comp` 欄位跟著失真。另外沒有 `level` 欄位（做不出等級進程）、沒有 SRS（唯一沒有 SRS 的練習類型）、題型全是商店交易對話（TEF/TCF 的公告/留言/訪談一篇都沒有）。
2. **口說三面全空**：練習面不存在（`grep 盲說` 全 repo 只有 dashboard 兩行階段文案）、記錄面 `speaking.html` 只是日誌沒有評分欄位、評分面 RUBRICS 的三把口說尺**沒有任何檔案實作**。四技能卡因此有一格永遠是空的。**另有一個設計落差**：`answer_cards.js` 練的是「回答」（DELF 口說第1部分），但第2部分要的是**向考官提問**、且老師說字卡池固定輪替（最能提前準備），系統完全沒有練提問。
3. **處方產生器沒有預算概念**：`dashboard.html:751` 的 `MIDDLE` 9 項＋`:1009` 展開 study＋頭尾 3 步＝**實際 13 步**（HANDOFF 從 07-09 寫的「9步番号」連續兩輪沒跟上程式），依各頁參數估時 110–145 分鐘，已吃滿系統自己設的 1.5–2h 上限。`buildPrescription()` 從頭到尾沒有一行在算時間；`:1186` 的 `paceNeeded` 算完就只印出來，不回饋給處方——是開迴路不是閉迴路。

**已修（各自獨立 commit）**：
- `8195270` — `gram_rules.js` 的 `opinions`（B1 未開課佔位點）掛著 `connectors-pour-parceque`，害 quiz 的 `getPool()` 把第 7 課 5 題 pour/parce que/mais **從 07-16 起整批排除**。清空該佔位點的 topics（跟其他 12 個佔位點一致）。node 驗證：該 topic 可出題數 0→5，`futur-proche` 維持鎖住未受波及。
- `fb63a48` — `dashboard.html` 錯題本 `SRC` 對照表缺 `answercard`，答案卡錯題顯示成原始英文 key。

**查完確認「沒問題」的項目（省下次 session 重查）**：
- 四套 SRS 參數**一致**：review／sentence_drill／answer_card 的 `INTERVALS`、畢業判定、包尾重試邏輯逐行等價，只有新卡上限不同（10／5／3）。
- `french_notes.html` **沒有**重複的懸浮回饋 script（`#qnotePanel` 僅 1 份、script/style 標籤配對正確、重複 id 0 個）；唯一同名的 `saveNotes` 兩份各自包在獨立 IIFE 裡，不是 bug。`<table>` 123 個 vs `compare-table` 123 個，表格鐵律 100% 遵守。
- `table_drill.html` 雖然不吃 `?guided=1`，但它的 `init()` 本來就無條件 `startSession()`，開頁即開練——不是缺口。真正沒處理 guided 的只有 `reading.html`。

**📚 新檔 [`RESOURCES_AUDIO.md`](RESOURCES_AUDIO.md)（07-28 建立，持續增補）**：Owen 指示「聽力素材要一直找、資源夠完備才練得出效果」，另開一份專門管素材的檔案（只管聽力素材，不放系統設計）。內容＝選片標準／來源清單／取材流程／已收錄清單。

**⭐ 最重要的發現：Audio Lingua（`audio-lingua.eu`，法國教育部 Versailles 學區維護）**——實際開站確認：**法文有 931 筆錄音**（我們現在 10 筆），而且**它內建的篩選器就是我們要的那個**：CEFR 等級（A1–C2）× 長度（0-30/30-60/60-90/90-120/120-180/>180 秒）× 說話者性別 × 年齡（兒童/青少年/成人/銀髮）。站上顯示法文 0-30 秒 152 筆、60-90 秒 139 筆、90-120 秒 126 筆。母語者真實片段（非教學朗讀）、明確聲明教育與個人用途免權利金、**每筆都附官方可外嵌 iframe 播放器**、可依等級訂 RSS。法文區入口 `spip.php?rubrique1`。

**⚠️⚠️ 取材方式的鐵律（本次查到，之後每個 session 都適用）**：**Audio Lingua 與 Podcast Français Facile 的 `robots.txt` 都明確寫 `User-agent: ClaudeBot → Disallow: /`。不可以用程式批次抓它們的目錄或音檔。** 本次我一度寫了爬蟲，發現後已停手、抓到的東西沒有進 repo。但這不影響實際流程，因為兩站的內容訊號都是 `search=yes, use=reference`：**Owen 本人用瀏覽器＋站方篩選器挑片沒問題，嵌入播放＋連回原頁也沒問題**（Audio Lingua 甚至主動提供 iframe 播放器）。**流程是分工不是自動化**：Owen 挑片貼連結 → Claude 逐篇聽、寫 3 題原創選擇題、標 level、進 `LISTENING_BANK`、驗證播放。這也正好符合 07-09 既定的版權鐵律（串流不下載／題目原創／逐字稿連結出去）。

**選片標準（比找到一堆連結重要）**：真人正常語速（不要為學習者放慢）、**30–90 秒**（考題長度帶，也是每日一步裝得下的量）、成人自然口語、日常情境、可合法嵌入；沒有逐字稿反而好（逼真聽）。⚠️ 現有 10 篇的問題：**全部是商店交易對話、全部三選一**，而且 `r04`(244秒)／`r06`(232秒) 遠超考題長度、`r09`(12秒) 太短。目標先補到 30 篇、補齊完全沒有的**公告／電話留言／簡短訪談**三種題型。

**D 段（聽力／口說路線圖）的四階段規格重點**——完整版見報告，這裡只留下次 session 接手需要的骨架：
⚠️ **口說設計中途被我自己推翻過一次，別再走回頭路**：初版提「盲說 2 分鐘」，查完 TEF/TCF 實際題型後作廢——**四種考試任務裡只有 TCF tâche 1 是自由獨白，其餘全是任務型**（提問、說服、互動、論述），練自由發揮考不到任務執行。查到的規格：**TEF Canada 口說約 15 分鐘兩節——Section A（5 分鐘）拿一則日常廣告/公告「向考官提問、問出最多資訊」；Section B（10 分鐘）拿另一則「介紹並說服考官參加」**；**TCF 口說 11–12 分鐘三個 tâche——① ~2 分無準備獨白 ② ~5.5 分模擬互動（要自己起頭維持收尾）③ ~4.5 分依觸發素材提出有論據的觀點**，滿分 20 換算 CEFR，流利度／詞彙豐富度／論述連貫性是拉高等級的關鍵。**TCF 聽力＝四選一、39 題、約 35 分鐘、難度連續遞增**（我們現在「單篇 3 題、可無限重播」跟它完全不同構）。

- **階段 0（現在就該補）**：`0-1` 聽力加 `level` 欄位＋輪播改「未做過優先、第二輪換題」（修掉重播失效）｜**`0-2` 🃏提問練習**（抽一則廣告/公告→5 分鐘內打出最多問句→**系統自動數疑問詞、數面向覆蓋（價格/時間/地點/條件/對象/方式）、檢查三種問法 est-ce que／倒裝／語調**）｜`0-3` 📢說服論述＋**4/3/2 流利度**（同一題講 4→3→2 分鐘記錄每輪詞速；SLA 有實證的流利度訓練法，純前端一個計時器就能做）｜`0-4` 聽力 SRS（`clb7_listen_srs`，引擎複用三支卡片頁）。
- **⭐ 兩個關鍵洞見**：① **`answer_cards.js` 練的是「回答」，但 TEF Section A／TCF tâche 2／DELF 第2部分三個形態都考「提問」——系統一題都沒有**；而提問**可以自動客觀計分**（數疑問詞／面向／問法），是全系統第一個不需人也不需 AI 就有數字的口說指標。② **素材一魚兩吃**：TEF Section A/B 的題目素材是「日常廣告／公告」，正好就是我們聽力庫最缺的題型之一——**建一條內容管線補兩個洞**。
- **技術決定（研究過，別再重走）**：語音輸入**不用 Web Speech API**（`webkitSpeechRecognition` 在 iOS Safari 支援歷來不穩），改用**手機鍵盤內建聽寫直接打進 `<textarea>`**，跨瀏覽器、零相容風險、零成本，產出的就是要送去評分的文字；**自動語音評分不碰**（低等級準確度不可靠、要 API 要錢）。評分照 `writing.html` 已驗證的「複製 prompt→貼回分數」迴路，配 RUBRICS 既有的口說尺。
- **Shadowing 要換素材**：系統回顧顯示 shadowing 對可理解度／流利度／韻律／聽力理解都有效（同步聽說啟動工作記憶默讀，強化由下而上的音素辨識），但現在綁在 Extra Français／Peppa Pig 上**跟考試與聽力題庫都無關**。建議改綁「當天聽的那一篇」，且只在聽懂 80%+ 的素材上做（07-11 查韓國多語者研究就得到、一直沒實作的結論）。
- **階段 1（A2 後半）**：真人音檔 10→30 篇並補齊公告／電話留言／訪談三種題型；**📝聽寫 Dictée 工具**（HANDOFF 下一步第3條，投報率最高且**完全複用現有 146 句不需新素材**；Audio Lingua 那批沒有逐字稿的真實錄音也正好適合）。
- **階段 2（B1）**：RFI Journal en français facile（現在有同步逐字稿＋官方分級練習含 A2 級，比 07-07 記錄的「太快先不碰」友善很多，值得重新評估）；聽力測驗改 TCF 形態；口說升級成 Section A/B 完整計時演練；官方樣題（France Éducation International 的 TCF／Le français des affaires 的 TEF，免費）。**階段 3（B2）**：全真模擬＋italki 真人。
- **建議動手順序**：第一批 **`0-1`＋`0-2`**（一個修復既有步驟不需新素材、一個補最划算的洞且能自動計分）→ 第二批 `0-3`＋`0-4` → 第三批階段 1 內容擴充與 Dictée。**`0-2`／`0-3` 會動到新頁面／新 key，依 CLAUDE.md 新功能三步驟要先寫 PRD。**

**報告文末列了 17 條待 Owen 決定的項目**（聽力口說 5 條在最前面）。系統結構面的其餘重點：`sentences.js` 有 83/146 句跟 `chunks.js` 完全重複（兩套 SRS 練同一句、呈現方式逐行相同）、⚡快速測驗 247 題 dashboard 完全讀不到（`clb7_dq_*` 有 64 筆真實資料但 `grep clb7_dq dashboard.html` = 0）、手寫筆記的 6 個 `fr_*`／`vr_*` key 從來不同步也不在備份裡（全系統最不可重新生成的內容）、雲端縮水保護（比備份更根本：三次推空都是「不完整的 localStorage 整包蓋掉雲端」，`push()` 加一道 key 數縮水閘就堵住機制本身）、4 個孤兒檔案的處置建議（含 `index.html` 目前就是正式站首頁）。

---

### 08-02：第20課（A2・Je me souviens・l'imparfait 完整變位）入庫收尾＋課文改編進閱讀題庫

Owen 貼了第20課逐字稿＋4張課本截圖（`~/Desktop/0728/`：Unité 2 扉頁、Saveurs de Corse 課文頁、Madeleine de Proust 文化框＋「Pour raconter un souvenir」表達框、l'imparfait 完整文法頁含他手寫的 Entraînement 答案）。同一則訊息他提出本次的新想法：**「課文都可以納入做閱讀題目」**。

⚠️ **開場踩到的判斷錯誤（之後 session 注意）**：一開始沒有先看 `git status` 的未 commit 內容就規劃工作，把 Owen 說的「只改那非常非常微量的部分，不要大改」誤讀成「改寫幅度要極小」。實際上他的意思是**第20課大部分已經做完了、只要補缺口**——`git status` 那批 `M` 檔案就是前一個 session 未 commit 的成果。**教訓：開場檢查的 `git status` 不是只看「是不是 repo」，要實際看未 commit 的 diff 內容。**

**前一個 session 已完成（本次未動）**：`french_notes.html` 的 `lesson-20`（11 個 unit、382 行：回憶詞彙／saveurs 味道與食物／姿勢與夜晚場景／imparfait 完整變位／imparfait vs PC／-er-é-ais 三胞胎的 mordre 代換法／課文摘要／文化小知識／老師課堂法語／發音警報／糾錯摘要）、`questions.js`（+26題，`imparfait`＋新 topic `vocab-souvenirs`，BANK 732→758）、`sentences.js`（S_L20_1~10，146→156）、`quiz.html`／`dashboard.html` 的 `TOPIC_LABELS`（imparfait 標籤從「無人稱動詞」改成「完整變位」＋新增 vocab-souvenirs）。

**本次補完的 6 個缺口**：
1. `chunks.js`：hand-curated node 腳本生成 70 張 L20 卡，**1040→1110**。⚠️ 踩到新坑：腳本用 `/\n\];\s*$/` 取代插入時，原檔結尾已有 `},` 導致產生 `},,` 語法錯誤——**之後寫這類注入腳本，取代後一定要立刻回讀並實際 parse 驗證**（本次腳本內建的回讀只數 id 沒 parse，所以沒當場抓到）。
2. `table_drill.html`：新增 `imparfait-radical`（type:verb, lesson:20, 8 row），**43→44 個表格**。8 個 row 刻意各收一種字根陷阱：parler(-er 規則)／finir(-iss-)／écrire(v)／prendre／voir(voy-)／être(ét- 唯一例外)／manger(-ger 保留 e)／étudier(雙 i)。
3. `gram_rules.js`：`imparfait` 點從 `L'imparfait (impersonnel)`／`lessons:[15]` **升級成完整版**——改名 `L'imparfait`、`lessons:[15,20]`、規則要點 3→9 條、`why` 補上兩層原理（為什麼字根要繞道 nous 形＝nous 形保留了真字根；為什麼字根都避開 r 音＝不跟未來式 -rai/-ras 撞聲音）、examples 補到 4 句。
4. `map.html`：`CURRENT_LESSON` 19→20；`imparfait` tile 的 `lesson` 15→20、hint 改成 `Je me souviens · C'était · Il faisait`、detail 改寫（**移除了原本寫的「L'usage complet arrive en B1」**，並補上 L15/L20 分野與三個拼字陷阱）。
5. `codex.js`：`5-3-2`（imparfait 的變位）與 `5-3-3`（PC vs imparfait 鏡頭論）的 `lvl` **B1→A2**（實際已教到）。**座標鐵律遵守：只改 lvl 欄位，編號一個都沒動，前後都是 122 條**。內容本來就寫得完整，沒有改寫。
6. `reading.html`：見下方獨立段落。

**📖 課文進閱讀題庫（Owen 本次的新想法，已實作）**：
- **動機成立且補到真缺口**：`reading.html` 原本 20 篇**全部是 A1／A1+ 的原創短文**，但 Owen 已在 A2 第20課——閱讀是今日處方第⑬步（最後一步），內容卻停在他早就跨過的程度，這一步等於在空轉。課文入題還有原創短文給不了的好處：**跟筆記／句庫／quiz 是同一批詞彙**，能互相加固。
- **⚠️ 版權處理（本次確立，之後每課比照）**：課本（Edito A1）是商業教材，而這個 repo 是**公開的 GitHub Pages**，所以**課文原文不進 `reading.html`**。做法是**改寫版＋原創題**：保留本課詞彙、句型與文法點，但人物／地點／情節全部換掉。這跟 07-09 聽力已確立的「串流不下載／題目原創／逐字稿連結出去」是同一條原則，也跟 07-26 第19課課文改用「摘要＋短引用」一致。**筆記本體（`french_notes.html`）裡引用課文短句做講解不受影響**，那是教學摘引。額外好處：課文 Owen 上課已讀過，原文照抄只測得到記憶，改寫版才測得出真的看懂。
- **成品**：`a21`「Le marché du samedi」（`level:'A2'`，**全庫第一篇 A2**；theme `Souvenirs`）——布列塔尼 Quimper 的週六市集童年回憶，14 個 imparfait 形＋2 個 passé composé 作對比，鋪滿本課詞彙（se rappeler／à cette époque／parfois／de temps en temps／humide／délicieux／odeur／debout／replonger dans mon enfance／madeleine de Proust）。3 題原創理解題，**第2題直接考 imparfait vs PC 的辨別**（四個選項裡只有一個是 PC）。

**驗證**（照交付鐵律，隔離 ROOM 全程遵守）：
- **資料層**：寫了一支 `verify_l20.js` 一次驗 8 個檔（scratchpad），涵蓋卡數／題數／句數／表格結構／文法點欄位／座標數不變／文章欄位／答案索引範圍／ROOM 是否正式值。全綠。
- **瀏覽器層**（ROOM 已切 `TEST-DO-NOT-USE-DELETE-BEFORE-COMMIT`，並用 `fetch(cache:'no-store')` **實際確認 preview 供應的就是 TEST 值**才開始測）：`table_drill` 新表 8 格答案正確載入＋note 顯示＋評分正確（故意填「nous étudions」少一個 i 被判錯 ✅）；`reading` a21 清單顯示 A2 徽章、面板標題正確、故意 2對1錯 → 分數 2/3、✓✗ 正確、錯題給出完整解說、`clb7_reading` 寫入欄位齊全；`map` 顯示「第 20 課」、tile lesson=20、codex 5-3-1/2/3 都是 A2 且座標無重複。
- **收尾**：清掉測試寫入的 a21 紀錄 → ROOM 改回 `owen-clb7-k9f3a72q` → **下一步立刻 `preview_stop`**（中間沒有再 navigate 或跟分頁互動）→ grep 全 repo 確認無 `TEST-DO-NOT-USE` 殘留、`sync_supabase.js` diff 為零。

**📌 一則自我更正（避免之後 session 被誤導）**：驗證中我一度用 `grep -c "n:'[0-9]*-[0-9]*-[0-9]*'"` 數 codex 座標得到 149，因此誤判「HANDOFF 寫的 122 條已過期」。**實際 parse `CODEX` 結構得到的是 122 條，HANDOFF 一直是對的**——grep 把交叉引用之類的字串也算進去了。**數 codex 條目要 parse 結構（`CODEX → sections → items`），不要用 grep 數。**

---

### 08-03：第21課（A2・Le souvenir・les pronoms y et en）完整入庫

Owen 貼了第21課逐字稿＋5張課本截圖（`~/Desktop/0802/`：Le souvenir 詞彙頁含 La mémoire／Les sens／Les souvenirs／Qualifier un souvenir 四個方框、Emploi des pronoms y et en 規則表、Les pronoms y et en 完整文法頁含他手寫的 Entraînement 答案、課文 Une vue de rêve）。**本課主文法是 y／en 兩個地方代名詞**，詞彙主軸是五感與回憶的種類/形容。

**開場先查了既有覆蓋（避免重複造點）**，結果決定了本次的做法：
- `gram_rules.js` 原本只有 A1 的 `pronouns` 點（toniques/COD/on），裡面**只有一條 y 的規則、完全沒有 en** → 不夠承載本課，**新增獨立文法點 `pronoms-y-en`**（沒有動原本的 `pronouns` 點）。
- `codex.js` 的 `3-4「y 與 en」`節已有 4 條（3-4-1 y=那裡／3-4-2 y=à+事物／3-4-3 en=部分量／3-4-4 en=de+事物），**唯獨缺「en＝從那個地方」**——正好是本課核心 → 新增 `3-4-5`。**座標鐵律遵守：3-4-1~4 完全沒動，只在節末追加。**
- `map.html` 的 A2 區沒有 y/en 佔位格（只有 B2 的 `pron-avances` 順帶提到）→ 這次是**真的新增一格** tile（前幾課多半是把 `unlocked:false` 佔位格打開，這次沒有可用的佔位）。

**九項連動全部補齊**：
1. `french_notes.html`：新增 `lesson-21`，11 個 unit（開場 Gabriel imparfait 整段轉換複習題／La mémoire 詞彙／**五感完整表**＋voir vs regarder＋goût/saveur/goûter＋ça sent mauvais 的預感用法／souvenirs 種類與形容詞＋enfance-adolescence-jeunesse 年齡帶／**y 與 en 主文法**含位置與否定與 PC 位置／re- 家族與 venir vs revenir／課文摘要／平行閱讀／老師課堂法語／發音警報／糾錯摘要）。
2. `questions.js`：新增 **27 題**（`pronoms-y-en` 新topic 13題、`vocab-sens` 新topic 6題、`vocab-souvenirs` 5題、`imparfait` 複習 3題），BANK 758→**785**；`quiz.html`／`dashboard.html` 的 `TOPIC_LABELS` 同步補兩個新 topic。
3. `chunks.js`：腳本生成 **63 張** L21 卡，1110→**1173**。
4. `sentences.js`：S_L21_1~10，156→**166**。
5. `table_drill.html`：新增 `pronoms-y-en` 選填表（type:gram, lesson:21, 8 row，y/en 各 4 題交錯），44→**45**。
6. `gram_rules.js`：新增 `pronoms-y-en` 點（9 條規則要點，`why` 寫了兩層原理——y/en 來自拉丁文 ibi/inde 所以天生就是「在那裡/從那裡」的分工；以及它們插在動詞前跟 COD 同因，都是沒重音的小音節）。
7. `codex.js`：新增 `3-4-5`「en ＝ 從那個地方」，122→**123 條**，照 CODEX_STYLE 補齊 grid／exc／vs／see 房間。
8. `map.html`：`CURRENT_LESSON` 20→21；新增 A2 tile `pronoms-y-en`。
9. `reading.html`：新增 `a22`「Un souvenir de Lanyu」（A2），21→**22 篇**。

**📖 關於「課文整段放進筆記」（Owen 本次提出，需要記錄清楚免得之後 session 反覆）**：
- Owen 的訴求是**能順著讀完整篇、比較好讀懂**，他的論點是「這是我的筆記，做筆記抄整段很正常，難道做筆記要改寫文章嗎」——**這個論點本身是對的，私人抄寫課文完全正常**。
- 我沒有把課本課文（Edito A1《Saveurs de Corse》）與部落格文章（voyageavecnous.fr《Une vue de rêve》）原文整段貼進 `french_notes.html`，唯一理由是**這個 repo 會 push 到公開的 GitHub Pages**，跟「筆記」無關，是「公開發佈」。已明確告訴 Owen：**那是他的網站他的決定，他要自己貼進去我不會再提**。
- **改成提供他真正要的東西**（這才是重點，之後比照辦理）：① **課文逐句全文中譯**（第20課15句、第21課10句，可以順著讀完等於讀完整篇）② 關鍵法文句附文法註解 ③ 完整詞彙表 ④ **一篇我自己寫的同級完整法文短文**（`Un souvenir de Lanyu`），用本課全套文法與詞彙、可以整段從頭讀到尾，同時放進 `french_notes.html` 當「平行閱讀」與 `reading.html` 當 `a22`。**回頭也把第20課的課文摘要改成同樣的逐句全文中譯。**
- 課本 PDF 在 `assets/` 且已被 `.gitignore` 擋住——**不會上公開站但一直在本機**，原文對照隨時打得開。

**驗證**（隔離 ROOM 全程遵守）：
- **資料層**：`verify_l21.js`（scratchpad）一次驗 9 個檔全綠——卡數/題數/句數/表格結構/文法點欄位/codex 座標數與 3-4-1~4 仍在/文章欄位/筆記表格鐵律/ROOM 是正式值。另外特地驗了 **choose 題的正解都在 opts 裡**（不然會出現永遠答不對的題目）。
- **瀏覽器層**（切 TEST ROOM，並用 `fetch(cache:'no-store')` 確認 preview 實際供應的就是 TEST 值才開始）：table_drill 新表 8 格正確載入＋故意把 `sous la tente` 填成 en 被判錯；reading a22 故意 2對1錯 → 分數與 ✓✗ 與解說都正確、紀錄欄位齊全；french_notes lesson-21 渲染 11 unit／11 表格全包 compare-table／**161 個 🔊 tts-btn**／導覽列 21 個按鈕含第21課；quiz `?lesson=21` 實際出到 y/en 題目並答對計分；**`getPool()` 放行全部 27 題**（確認沒踩到 07-16 那個「文法點被鎖導致整批題目消失」的坑）；map 顯示第21課、tile 與 codex 3-4-5 都正確。
- **收尾**：清掉測試寫入的 a22 紀錄與該題 SRS key → ROOM 改回正式值 → **立刻 `preview_stop`** → grep 確認無 `TEST-DO-NOT-USE` 殘留。

### ⏭ 下個 session：繼續蓋島（2026-08-28 收尾更新）

**✅ 四座島已蓋好**（Phase 0 目標 8 座，還差 4 座）：

| 島 | 長度 | source_zh | follow_ups |
|---|---|---|---|
| `AC8 加拿大／移民動機` | 230 字 / 106 秒 | ✅ 410 字（08-28 回填）| ok2 / part4 / gap4 |
| `AC3 工作` | 174 / 80 | ✅ 1062 字 | ok2 / part4 / gap4 |
| `AC2 家庭` | 187 / 86 | ✅ 690 字 | ok2 / part3 / gap5 |
| `AC1 自我介紹`（樞紐）| 206 / 95 | ✅ 663 字 | ok3 / part3 / gap4 |

⭐ **島互相補洞已經驗證**：AC8 原本 4 個 `gap`，蓋完 AC3／AC2 之後剩 **1 個**
（「你去過加拿大嗎」← 指向 `AC7 旅行`）。

**建議下一座：`AC7 旅行`**（補掉 AC8 最後一個 gap），或 `AC5 興趣嗜好`／`AC15 未來計畫`。
⚠️ **由 Owen 決定，不要自己排。**

✅ **08-28 收尾補完的兩件事**：`AC8` 的 `source_zh` 已回填（410 字，四個理由＋兩個具體場景）；
`AC1` 兩題危險 gap 已解除（Extra French／Coffee Break French，寫進正文）。
**四座島現在全部都有中文母本**，升級層的素材齊了。

⭐ **由此得到一條通則**：追問如果是「**他知道答案、只是沒寫進去**」的那種，
**直接補進島的正文**，不要留在 `follow_ups` 裡當 gap——具體的專有名詞（片名、節目名、地名）
會讓整段更可信，而且字數成本幾乎是零。`follow_ups` 留給真正需要另外準備材料的。

**做法（四座島都驗證過的流程，照這個走就對）**
1. **請他對著手機口述中文**（麥克風鍵語音轉文字，⚠️ Claude 聽不了音檔）。
   **⛔ 不要求他組織好**，講亂一點才挖得到細節（四座島最強的句子都是這樣挖到的）
2. **Claude 轉法文，⛔ 絕對不要照翻。目標 170–200 字 ≈ 80–95 秒。**
   > Owen 08-28：「**我覺得我說的中文內容都可以留下來，但你寫要抓重點。簡明扼要，
   > 情緒單字文法都到位，不饒口且加分，這樣的內容才有意義。**」
   只留三種東西：**別人沒有的細節**＋**情緒／幽默**＋**考官必問**
3. **⭐ 中文口述全文用 `source_zh` 欄位逐字留在卡片裡**，並在註解列出「刻意砍掉哪些、
   各自是哪一層的升級材料」——這是 B1/B2 升級層的素材庫（見 `STRATEGY` 原則 6）
4. 寫進 `versions`（v2, level 'A2'），⛔ 不要重寫 v1；v1 的既有事實（名字、年齡、職業）接進 v2
5. 補 `follow_ups` 10 題，**並回頭把其他卡被補到的追問 `gap` 升級成 `part`/`ok`**
6. 刻意用上最近幾課的結構，並在註解標出哪一句是哪一課
7. ⭐ **新島不要重述舊島已經講過的東西**（AC1 就是這樣設計的）——留勾子，不要重複

**⚠️ 蓋島時不要順手加功能。** 08-17 體檢的結論還沒過期：系統早就蓋過使用量。
`answer_card.html` 的「支架漸退」四段模式等島夠多了再說。

**⛔ 不要對這個方法做過早的風險稽核**（08-28 教訓，見 memory
`feedback_method_first_no_premature_audit`）：Owen「**昨天才想出來的方法，不要今天就開始焦慮**」。
⚠️ 特別是**別替 TEF Section A 之類的單一題型最佳化——考 TCF 還是 TEF 根本還沒決定**。
島剛好是唯一不用先決定考哪個試就能蓋的東西（四個出口全餵得到）。

---

### 📌 每課入庫的九項連動（常駐參考，每次做筆記都照這份走）

> 08-26 第27課已照這份做完一輪（記錄見下方 08-26 那段），**最近一次完整範例改看第27課**。
> ⚠️ 08-26 新發現的**第十一項**：如果新課教到**新時態**，要把 `verb_sprint.html` 的 `MODES`
> 與 `dashboard.html` 的 `SPRINT_MODES` 裡那一列的 `gram:` 改指到**新開的 A2 文法點**——
> 它們原本掛在 B1 佔位點（`futur` 那種永遠不解鎖的 id），不改的話動詞衝刺永遠長不出新時態。

**⚠️ 動手前一定要先做的三件事（順序不能顛倒）**
1. **先開一課現成的筆記看格式**（建議最近一課 `lesson-26`），照著寫，不要憑記憶——
   這是 CLAUDE.md 的鐵律，Owen 講過「筆記怎麼每次都會變動，做筆記時要有習慣先去看格式跟做法吧」
2. 表格鐵律兩條：`<table>` 一定包在 `<div class="compare-table">` 裡、法文欄 `<td>` 標 `class="m"`；
   **法文句子的載體是 `<ul class="phrase-list">` 的 `<li><span class="fr">`**，不可以用 `<p class="fr">`
3. **寫完必跑 `node tools/check_notes.js`，全綠才算完成**

**九項連動清單**（每一項都要動，漏一項＝新課內容進不了對應的練習系統）
1. `french_notes.html` 新增 `lesson-NN`
2. `questions.js` 加題（新 topic 要同時在 `quiz.html` 與 `dashboard.html` 補 `TOPIC_LABELS`
   ——⚠️ 兩份風格不同：dashboard 用法文短名、quiz 用中文說明式，照各自的來）
3. `chunks.js`：跑 `node tools/extract_chunks.js`
4. `sentences.js`：**人工精選** `S_LNN_1~10`
5. `table_drill.html` 加表
6. `gram_rules.js`：新文法點（必含 `why` 欄位）
7. `codex.js`：⚠️ 既有座標永不重編，只在節末追加
8. `map.html`：`CURRENT_LESSON` ＋ 新 tile
9. `reading.html`：新增一篇同級原創短文（同時當該課「平行閱讀」）

**這一課還可以順手做的第十件事（08-25 之後新增）**：
新課如果出現**成對台詞的對話**（課文對話、老師示範的來回），可以直接做成 `scenes.js` 的情境劇本——
目前 18 場、755 句。做法見下方 08-25 各段；寫完跑 `node tools/check_scenes.js`。

---

### 08-25（續4）：補齊 TOPIC_LABELS（dashboard 28 個、quiz 17 個）

重構 dashboard 時發現 `TOPIC_LABELS` 沒跟上題庫：**77 個 topic，dashboard 只有 53 個名字、
quiz 只有 64 個**，缺的會直接印出 raw id（`daily-routine-vocab`、`passe-recent`…）。兩份都補齊了。

⚠️ **兩份刻意用不同風格，不要合併**：`dashboard.html` 用**法文短名**（Routine quotidienne、
Place de l'adjectif）因為那是掃一眼的儀表板；`quiz.html` 用**中文說明式**（日常作息詞彙、
il faut / devoir（必須））因為那是答完題要看懂自己錯在哪。
**每次加新 topic 都要同時補這兩份**（已寫進上面的九項連動第 2 項）。
---

### 08-25（續）：Owen 一邊玩一邊改，工具被推了四輪

早上交接完之後 Owen 沒有離開，而是**一邊玩一邊丟回饋**，每一則都改變了設計。
照時間順序記，因為後面的決定都建立在前面那則回饋上。

#### 回饋一：「你應該有A1 A2 課本及Cahier pdf檔」→ 素材通道打通
他把 **A2 課本、A2 Cahier、DELF A1 官方考官文件、DELF A2 全真題** 全部丟進 `assets/`。
- `Edito22 A2 Owen 7:21.pdf`（218頁）抽得到文字 → **108 萬字的 A2 原文**進來了
- `exemple-4-sujet-delf-a1-…-production-orale.pdf`＝**官方考官文件**：
  第一部分的例題清單、第二部分的字卡、**第三部分 10 個 dialogue simulé 題目＋價目表**
- ⚠️ `EditoA2 2022 Cahier .pdf` 與 `le-delf-a2-100-reussite…pdf` **是掃描檔，抽不到字**
  → 加了 `tools/ocr_pdf.py`（macOS 內建 Vision OCR，離線、不上傳）
  → OCR 出 28 萬字（DELF A2 真題）＋36 萬字（A2 Cahier），附加進快取
  → 需要 `pip3 install pyobjc-framework-Vision pyobjc-framework-Quartz`（已裝）

#### 回饋二：「中文輔助太多了」「可以考慮開fork」→ 純法語＋真分岔（已記在前一段）

#### 回饋三：「我目標是對這些對答跟可能的問題需要的能力足夠熟練，不只是會依序看懂這樣而已」
**這句話點破了原本設計的天花板**：看三個選項挑一個＝辨識，而且順序固定，玩第二次會記得。
跟他確認過作答方式（他選「講出來後自評」，不要打字比對）之後做了 **🔥 特訓模式**：
- 選項全部遮住，只給中文提示 → 先開口講 → 按「揭曉答案」
- **量起手時間**（題目出現→按揭曉），3 秒內＝⚡不用想，超過＝🐢還在組裝
- 三鍵自評；結算報 **反射率＋中位起手秒數＋「還在消耗工作記憶的句子」清單**
- ⭐ 設計重點：**答對但想 5 秒，跟答不出來，是兩種不同的缺口**，清單分開標
  （對應教學鐵律的「自動化缺口 vs 概念缺口」——前者要壓縮練習，後者要回筆記）
- 資料 `clb7_rp_cells`（每節點最近5筆，仿 verb_sprint）、`clb7_rp_sessions`

#### 回饋四：「我希望我可以做到整段應對流暢，可以瞬間切換角色那種」
→ **🎭 兩邊都我演**：對方那一側不再自動代打，每一句都輪到你，整段一個人跑完。
配特訓模式＝整段每一句都要自己產出。左右仍照角色分邊，讀起來還是一段對話。

#### 回饋五：「每句旁邊標注一下來源」
→ 泡泡與參考答案下面顯示「📖 課本 A2 p.102」「📖 筆記第17課」。
資料本來就有 `src` 欄位，只是之前沒顯示出來。

#### 回饋六（最重要的一則）：「純粹玩完不會有太多輸入耶，感覺還是要有個背誦的過程」
> 「但像剛剛 有些分岔路沒走 我就自然會沒看到 重走一次有點搞笑」
> 「感覺可以進去先玩，然後好好背誦 體驗一下，像是anki那種感覺」

**他說得對，而且這一則同時解掉了分岔的副作用。** 做了 **📚 背台詞**：
- 把**整場的所有台詞展開成卡片**，**包含沒走到的分岔**（不用為了看某句再演一遍）
- 卡片**不另外維護資料**，直接從 `scenes.js` 生成 → 劇本改了卡片自動跟著改
- 誘答（ok/bad）**不進卡片**——那是反面教材，不能拿去背
- 正面＝中文＋誰說的＋情境；先自己講法文再翻開；背面＝法文＋🔊＋解說＋出處
- SRS 間隔 1/3/7/14/30，獨立池 `clb7_rp_srs`（id 前綴 `RP_`），共用 `clb7_hard_flags`
- ⚠️ 兩條刻意的規則：**①新卡第一次答對＝明天再出現**（不是 3 天）
  **②今天卡住過的卡，包尾重試答對也不准往上跳間隔**——當天第二次成功只證明「剛看過還記得」
- 入口：選角畫面 ＋ 演完的結算頁（**先玩再背**的順序）

#### 另外做的：🔀 換句話問
`line` 節點可以掛 `alts`＝同一個問題的其他問法，每次隨機挑，泡泡標「這句有 N 種問法」。
entretien 用 **DELF A1 官方考官文件**補了 6 種變體（`Vous vous appelez comment ?`／
`Votre nom, comment ça s'écrit ?`／`Est-ce que vous avez des enfants ?`／
`Vous avez des enfants ? Quel âge ont-ils ?`／`Parlez-moi d'une journée habituelle.`／
`Qu'est-ce que vous faites le samedi et le dimanche ?`）。
目的：**不能靠「背下一句是什麼」過關**。

#### 場景 4 → 15（08-25 一天之內）
| id | lvl | 節點/分岔 | 卡片 | 出處 |
|---|---|---|---|---|
| boulangerie | A1 | 12 / 0 | 12 | 筆記1、4、5課 |
| entretien | A1 | 22 / 3 | 32 | 筆記17課＋DELF 官方考官文件 |
| rendez-vous | A1 | 18 / 2 | 21 | 課本 A1 Unité 6＋筆記9、19課 |
| restaurant | A1 | 17 / 1 | 22 | 課本 A1 p.54＋Cahier p.36 |
| vetements | A1 | 19 / 2 | 19 | 課本 A1 p.78 |
| chemin | A1 | 13 / 1 | 13 | 課本 A1 p.66、p.71 |
| hotel | A1 | 21 / 2 | 22 | 課本 A1 p.131 |
| medecin | A1 | 24 / 1 | 25 | 課本 A1 p.117 |
| **pharmacie** | **A2** | 22 / 2 | 24 | 課本 A2 p.102 |
| **restaurant-a2** | **A2** | 22 / 2 | 25 | 課本 A2 p.92 |
| **logement** | **A2** | 16 / 2 | 15 | 課本 A2 p.43 |
| **agence** | **A2** | 16 / 2 | 16 | 課本 A2 p.141 |
| voisin | A1 | 15 / 1 | 14 | 課本 A1 p.112 |
| banque | A1 | 9 / 0 | 8 | 課本 A1 p.114 |
| aeroport | A1 | 16 / 1 | 16 | 課本 A1 p.132 |

**合計 638 句逐字有出處**（筆記241／課本397）、**284 張卡片**、誘答仍只有 3 句。
場景卡上有 **A1（灰）／A2（金）** 等級標籤——他現在是 A2，一眼看得出哪些是他的程度。

#### dashboard
情境角色扮演那格顯示「本週 反射 N/M · 背 X 張」（讀 `clb7_rp_sessions` 與 `clb7_rp_card_sessions`）。

#### 驗證
- Node 端窮舉所有路徑：**無循環、無死路**
- 瀏覽器（TEST ROOM 全程隔離）：**15 場景 × 3 角色（含雙角）× 10 次隨機＝450 場全部走到結束、零 console error**；
  15 場的背誦卡片各跑一整輪（刻意 2/3 答錯，確認包尾重試會收斂）、SRS 建立 284 張；
  SRS 階梯實測 1→3 天正確、當天失敗的卡明天到期
- 收尾：清 key → ROOM 改回正式值 → 立刻 `preview_stop` → grep 主樹無殘留

#### 08-25（續2）：挖 DELF A2 真題 → 場景 15→18

Owen：「**去挖 DELF A2 真題，再多寫幾個場景**」。OCR 出來的兩本第一次被拿來用：

| id | lvl | 節點/分岔 | 出處 | 為什麼值得做 |
|---|---|---|---|---|
| `sport` | A2 | 19 / 1 | DELF A2 真題本 p.114 **官方示範** | 考官演你朋友、全程 tu。重點是**連接詞**（car/donc/alors/parce que/grâce à）——A2 拿分的關鍵是句子要串起來。也練「被拒絕之後怎麼接」 |
| `tshirt` | A2 | 16 / 0 | DELF A2 真題本 p.111 **官方示範** | ⭐ **誘答全部是官方寫的**：問 taille 答體重、問顏色答大小、問預算答年齡。練的不是禮貌，是**有沒有聽懂問題** |
| `hotel-modif` | A2 | 12 / 1 | A2 練習本 p.112 | 跟第 7 場「訂房」成對：那場是訂，這場是**改**（改房型、改日期、確認晚數、餐食） |

**真題本裡還剩什麼**：聽力逐字稿多半是 2-3 行的短片段（做不成場景，但可以當聽力題材）；
`Exercice en interaction` 的 sujets 清單很豐富（做菜教學、地鐵買票、圖書館/媒體館報名、
辦驚喜派對、跟主管要器材、游泳池報名、紀念品店、電影院、銀行開戶）——**但只有題目沒有台詞**，
要做得先從別處找對話素材。

**工具改動兩項**：
- `ocr_pdf.py` **不再把 OCR 併進課本快取**；`check_scenes.js` 改成把每個 `.ocr_*.txt`
  當獨立來源 → 報表分得出「筆記 / 課本 / **OCR**」，並警告 OCR 那些句子有錯字風險。
  ⚠️ **這批 74 句 OCR-only 已逐句用眼睛校過法文正確性**（沒有髒字）；之後引用 OCR 來源也要照做。
- `roleplay.html` 場景多了之後加**等級篩選**（全部 18 / 只看 A2 7）。
  刻意**只隱藏不重排**——Owen 靠位置記東西（memory `user_memory_palace_style`），順序一動就找不到。

**現況**：18 場景／755 句（筆記256／課本406／OCR93）／**332 張背誦卡**／A2 場景 7 個。
驗證：432 場隨機演出全部走完、18 場背誦各跑一整輪、零 console error。

#### 08-25（續3）：dashboard 版面重構——12.7 個螢幕 → 4.1 個

Owen：「**東西太多了，感覺要有序列式排放比較好讀**」。**先量再改**（手機 375px 實測）：

改版前整頁 **10,299px＝12.7 個螢幕**、27 個區塊，而「快速入口」排在**第 10 個螢幕**。
診斷出來的病灶**不是東西多，是沒有分層、而且順序跟使用頻率相反**——
日更（處方/錯題本）、週更（Duolingo/趨勢/完成率）、月更（倒數/700h/等級）全部攤平成一條。

**新的序列（照時間顆粒度排，⚠️ 順序定了就別亂動——Owen 靠位置記東西）**：
```
⚑ 現在      警報 → 今日處方 → 今日錯題本
🚪 去哪練    快速入口（從第 10 屏搬到第 2 屏）
🧭 每天看一眼 今日心法 → 法語時區（兩個都刻意不收合）
📈 進度      收合｜摘要：距考 280 天 · 76.4/700h
📅 本週回顧  收合｜摘要：本週 0.0h · Duo 275 分     （Duolingo/完成率/週趨勢/四技能）
🔬 診斷      收合｜摘要：最弱兩個 topic            （Topic 健康度）
💬 給 Claude 收合｜摘要：共 26 則筆記              （心聲總覽）
```

⭐ **設計原則：收合層的摘要行一定要帶數字**。收合不能等於看不到，
不然就是把功能刪掉——這是這次重構最重要的一條，之後再加區塊照做。
收合狀態存 `dash_open`（不用 `clb7_` 前綴，顯示偏好不占同步負載）。

**順便瘦掉三個肥區塊**：
- **今日處方**：只有「下一步」完整展開，其餘 14 項收成一行（`.rx-slim`，已完成加刪除線）。1,965px→約 700px
- **Topic 健康度**：77 個全列佔 3.2 螢幕 → 只列**最弱 12 個**＋一顆「顯示其餘 65 個」
- **嚴重弱點警報**：原本把 25 個 topic 串在一條警報裡、一條吃掉 600px（第一屏的一半）
  → 只報最弱 3 個＋總數，細節導到 🔬 診斷層

| | 前 | 後 |
|---|---|---|
| 手機整頁 | 10,299px / 12.7 屏 | **3,311px / 4.1 屏** |
| 全部展開 | 10,299px | 7,635px（比原本還短） |
| 快速入口 | 第 10 屏 | **第 2.1 屏** |
| 桌機 1280 | — | 2,860px / 3.6 屏，無橫向溢出 |

走 branch `dashboard-restructure` 做完驗證才 merge（大重構鐵律）。

**⚠️ 順手發現、還沒修**：`TOPIC_LABELS` 少了幾個 topic 的中文名，
dashboard 上會直接顯示 raw id（例如 `daily-routine-vocab`、`passe-recent`）。不影響功能，但看起來不一致。

#### ⚠️ 兩個踩到的坑，記下來
- **shell 的反引號**：`git commit -m "…"` 的訊息裡寫了反引號包住的變數名，
  被 zsh 當成命令替換執行掉，commit 訊息裡那幾個字直接消失（已 amend 修回）。
  **commit 訊息用 `-F 檔案` 或不要在雙引號裡用反引號。**
- **分頁被切到背景時 setTimeout 會被凍住**，用「按一步等一下」的驅動腳本會卡在半路，
  看起來像 bug 其實不是。驗證時把 `window.setTimeout` 暫時換成同步執行，整場在一次 exec 內跑完。

---

### 08-25：情境劇本 1→8 個，並打通「課本原文」這條素材通道

這個 session 做完之後，`roleplay.html` 從一個原型變成有 8 個場景的系統。中間 Owen 丟進來三則回饋，每一則都改變了設計，照時間順序記：

#### ① 起手：照 08-24 盤點的順序寫了三個場景
先做的是自我介紹（entretien）、約朋友出門（rendez-vous）、餐廳點餐（restaurant）。素材來自筆記第17課（老師實測的 DELF 口說題＋Owen 自己的答案）、第19/9課（提議/接受/婉拒三欄＋老師示範的喬時間來回）、第5課（點餐句型）。

**entretien 的誘答是這個場景最值錢的地方**：`e14`／`e16`／`e18` 三個 bad 選項不是我編的，是**第17課糾錯摘要裡他當天真的講錯的三句**——`Je me lever à six heures.`（反身動詞沒變位）、`Je mange un café au lait.`（喝的要用 boire）、`Je vais revenir à 18 heures.`（回家用 rentrer）。這是自動化缺口不是概念缺口，**重講一次規則沒有用，讓他在選項裡再遇到一次才有用**。

#### ② Owen：「你應該有A1 A2 課本及Cahier pdf檔，可以直接利用其中的內容」
**這句話解決了一個我原本準備繞過的限制。** 筆記是課堂重點整理，**沒有完整對話逐字稿**——服務生、店員、路人、櫃檯的台詞筆記幾乎沒收，所以我原本只能靠「把筆記句子接起來」硬撐對手戲。課本後面的 **transcriptions** 就是整批的真實對話。

於是加了 `tools/extract_textbook.py`（pdfplumber）：
- 掃 `assets/*.pdf` → 寫成 `assets/.textbook_cache.txt`（**已加進 .gitignore**：商業教材內容，repo 是公開的 GitHub Pages）。
- ⚠️ **兩欄排版的坑**：Édito 的逐字稿是左右兩欄，整頁抽取會把兩欄的句子交錯，一個句子被切成兩半（「Je voudrais de la blanquette de veau」／「avec du riz.」跑到不同地方）。**解法是每頁抽三次：整頁＋左半＋右半，三份都寫進快取。** 檢查器只做子字串比對，多寫幾份沒有副作用。
- 兩份 A1 檔抽得到文字（193＋145 頁）；`Online classe 1 (1).pdf`／`french class 2.pdf` **是掃描檔，抽不到字**。

`tools/check_scenes.js` 跟著改：來源從「只有 `french_notes.html`」變成「筆記 ＋ 課本快取」，並做兩邊正規化（課本用彎引號 `’`、筆記用直引號 `'`；`…`→`...`；換行處被拆開的連字號 `messieurs- dames` 補回去；去尾標點時連空白一起去）。報表會標**每一句是從哪個來源找到的**——目前 352 句：筆記 186／課本 166。

**怎麼挖課本（下個 session 照做）**：
1. `grep -n "Le serveur\|La docteure\|Le vendeur" assets/.textbook_cache.txt` 找角色名，逐字稿都在書末 `transcriptions`。
2. 找到頁碼後用 pdfplumber 單獨抽那一頁的左右半欄（整頁抽會交錯），對照著讀。
3. 把想用的句子寫成一行一句的清單，用 scratchpad 的 `probe.js`（跟檢查器同一套正規化）跑一遍，**只留 ✅ 的**。
4. 再開始寫劇本。

#### ③ Owen：「玩起來學習滿有趣的，如果資料多一點可以考慮開fork讓學習更多元」＋「中文輔助太多了，感覺應該要純法語去做我會學習更快」
兩件事都照做了，而且都改到底層：

**純法語優先**（`roleplay.html`）：預設 `zhOn=false`。法文句子底下**不掛中文**，選項也只有法文；**只有選到 `ok`／`bad` 時才自動翻出中文與解說**——因為那是回饋不是拐杖。其餘泡泡想看中文要點 💬。標籤也改法文（`naturel`／`correct`／`impoli`），切到「中文輔助」才變回自然／可以／失禮。頂部可隨時切換，**切換會把已經講過的對話整批重畫**（不用重來一次）。偏好存 `rp_zh`，**刻意不用 `clb7_` 前綴**（顯示偏好不需要占 Supabase 同步負載，跟 `ttsr_rate` 同款）。

**真的分岔**（不是換句話說的分岔）：選項的 `next` 指向不同節點。目前 8 個場景共 **10 個分岔點**，例如：
- `rendez-vous` v4 三條路：答應 → 喬時間／不想去 → 對方負責提替代方案（課本 Perrine 提展覽那段）／有別的事 → 「我可以跟你一起去嗎」那條線。
- `restaurant` r4：先問今日主菜／直接點燉小牛肉／點牛排（多一步問熟度）。
- `medecin` m3：感冒線 vs 膝蓋線，就是課本的兩段對話。
- `hotel` h10：先問價錢再選 vs 直接用比較級講出理由。

**分岔帶出的兩個連帶修正**：
- `checklist` 改成**只亮你這條路真的走到的步驟**（節點加 `chk` 欄位），沒亮的會附一句「這是你這條路沒走到的，換個選擇會走到不同劇情」。原本的寫法是走完就全部打勾，分岔之後那樣等於說謊。
- **對方那一側的自動台詞原本永遠挑第一個 `good`** → 分岔點如果落在對方身上，另一條路**永遠走不到**（演問路的人就永遠不會被叫去搭公車）。改成在 `good` 選項裡隨機挑，重玩才會遇到不同劇情。

**順手接上大腦**：選到 `ok`／`bad` 會寫進 `clb7_wrong_log`（`src:'情境扮演'`），**今日錯題本收得到**，睡前掃得到。結算頁也會把這一場選錯的句子列成小複習卡。

#### 這次新增的 8 個場景一覽

| id | 場景 | 節點/分岔 | 台詞出處 | 這個場景在教什麼 |
|---|---|---|---|---|
| `boulangerie` | 🥖 麵包店 | 12 / 0 | 筆記1、4、5課 | （08-24 原型）je voudrais vs je veux、店員↔顧客台詞歸屬 |
| `entretien` | 🎤 口說考試第一部分 | 22 / 3 | 筆記17課 | 考官題池＋**他自己犯過的三個錯當誘答** |
| `rendez-vous` | 📅 約朋友出門 | 18 / 2 | 課本 Unité 6＋筆記9、19課 | veux vs peux、ça marche vs ça fonctionne、婉拒要給理由 |
| `restaurant` | 🍽 餐廳點餐 | 17 / 1 | 課本 p.54＋Cahier p.36＋筆記5課 | 不定量冠詞、carafe d'eau、l'addition、牛排熟度 |
| `vetements` | 👗 買衣服（婚禮） | 19 / 2 | 課本 p.78 | **faire du 40（衣服）vs chausser du 45（鞋）**、顏色形容詞位置 |
| `chemin` | 🚇 街上問路 | 13 / 1 | 課本 p.66、p.71 | 命令式 vous 形、Excusez-moi 才攔得住人、en bus vs à pied |
| `hotel` | 🏨 打電話訂房 | 21 / 2 | 課本 p.131 | du…au…、nous sommes 人數、**比較級 moins cher que**、拼名字 |
| `medecin` | 🏥 看醫生 | 24 / 1 | 課本 p.117 兩段 | avoir mal à + 部位、passer une bonne nuit、命令式醫囑 |

**352 句全部逐字有出處**（筆記 186／課本 166）；**只有 3 句是刻意的誘答**（`constructed:true`，檢查器會逐條印出來不讓它們隱形）。

#### 檢查器現在會擋什麼（08-25 加的結構檢查）
`tools/check_scenes.js` 除了原本的教材出處，還會檢查：節點有沒有出口（會不會卡死）、`next` 指向的節點存不存在、有沒有從 `start` 走不到的孤兒節點、`speaker` 有沒有在 `roles` 裡、**每個角色是不是都至少有一個選擇節點**（不然演那一邊只能一直按）、`chk` 與 `checklist` 對不對得上、選項有沒有漏 `zh`／`note`。
**第一次跑就抓到一個真的問題**：`medecin` 的 checklist「結束看診」沒有任何節點會點亮它。

#### 驗證
- **Node 端**：窮舉所有場景的所有路徑（最多 2 萬條）確認**無循環、無死路**，全部走得到 `end`。
- **瀏覽器端**（TEST ROOM 全程隔離，開場先 `fetch(cache:'no-store')` 確認 preview 供應的就是 TEST 值）：8 場景 × 2 角色 × 12 次隨機＝**192 場全部走到結束、零 console error**；純法語模式下選錯會自動翻出中文與 `impoli` 標籤、選對維持全法文；`clb7_wrong_log` 寫入格式正確；中文輔助切換會即時重畫已講過的對話；375px 版面正常。
- **收尾**：清掉測試寫入的 3 個 key → ROOM 改回 `owen-clb7-k9f3a72q` → **立刻 `preview_stop`** → grep 主樹無 `TEST-DO-NOT-USE` 殘留。
- ⚠️ **驗證方法上的一個坑，記下來免得重踩**：分頁被切到背景時 `setTimeout` 會被節流甚至凍住，用「按一步等一下」的驅動腳本會卡在半路，看起來像 bug 其實不是。**解法是驅動時暫時把 `window.setTimeout` 換成同步執行**，整場對話在一次 `javascript_exec` 內跑完，不依賴分頁在前景。

#### 留下來的兩個小尾巴
- `situations.js`（17 個生活情境索引，08-24 建的）**目前沒有任何頁面在讀它**，純資料層。要嘛把它接進 `map.html` 當第四個分頁，要嘛接進 `roleplay.html` 當「這個情境還可以練什麼」的側欄——等 Owen 決定。
- `.claude/worktrees/` 底下有 4 份舊 worktree 的 `sync_supabase.js` **還留著 TEST ROOM 值**（它們被 `.git/info/exclude` 擋著、不影響主樹，grep 殘留時會跳出來嚇人）。要清的話直接刪那些 worktree 目錄。

---

### 08-24：情境角色扮演（RPG 對話樹）——Owen 看了一門線上課之後長出來的東西

Owen 貼了 `sat.cool/course/202`（Fabio 口袋法文，25 單元 × 15 分＝6 小時，A1 觀光句），說「我的目標跟他不一樣，他是讓大家敢於講法文，我的目標是考過考試……但照他的脈絡整理也許是我學好的契機」。

**評估結論：內容不必買，脈絡值得偷。** 他已經在第 26 課、Duolingo Section 4（＝A2），那門課天花板約 A1+。但他的直覺對在一個地方——**情境化不是離開考試，那就是口說考試的題型本身**（DELF A2 口說第三部分 dialogue simulé：抽情境、角色扮演、附道具假鈔；老師課堂實測過的套路是打招呼→問價錢→決定→付款→道謝告別，而且**禮貌用語本身就是給分點**）。

**中途他把需求講得更精確**（這句改變了整個設計）：
> 「我進麵包店 然後我有幾種講話的選擇，或是我其實也可以選我自己是店員，**很像RPG**」

所以做的不是索引，是**對話樹**。

**三個檔**
1. `situations.js`：17 個生活情境的索引層，每個掛既有的 quiz topic／課次／Answer Card，並標明**它在考試哪裡出現**（`exam` 欄）。涵蓋 66/77 個 topic；⚠️ 沒收進來的 11 個都是純文法與應試技巧（negation、pronoms-y-en、strategie-lecture…），它們有自己的軸線（文法大局觀／資料庫），情境索引只回答「這個場合要用什麼」。
2. `scenes.js`：對話樹劇本。第一個場景 `boulangerie`（麵包店買法棍），**顧客 5 個選擇節點、店員 4 個**，兩邊都能演。
3. `roleplay.html`：引擎。聊天泡泡（左＝對方／右＝你）、每個選項標 `自然／可以／失禮` 並附筆記原文解釋、走完顯示老師的五步套路檢查表、可**換角色再演一次**。

**設計上兩個關鍵決定**
- **失禮選項是刻意放的誘答**，而且都是筆記明講會扣分的講法（`Salut` 對店員、`je veux` 而不是 `je voudrais`、`À demain` 當道別）。
- **演店員時的選擇考「誰該說哪一句」**：誘答全部是**顧客的台詞**（把 `Je voudrais…`、`Ça coûte combien ?` 丟給店員說）。這比自己開口更接近聽力考試——要先聽懂對方在問什麼才接得上。

**教材鐵律怎麼守（新增檢查器 `tools/check_scenes.js`）**
劇本的法文不可以自己編，但對話難免要把筆記句子接起來，所以**檢查單位是「句」不是「整行」**：每行拆句，每句都要逐字出現在 `french_notes.html`。目前 25 句全過。⚠️ 唯一例外是標 `constructed:true` 的**誘答**（`Je veux une baguette.`／`Une baguette !`），檢查器會**逐條列印出來不讓它們隱形**，而且它們永遠只出現在 bad／ok 且附警告。

**踩到的坑**：模板字串裡用反引號寫 `` `tools/check_scenes.js` ``，把字串提前結束 → 整頁 SyntaxError 白畫面。⚠️ 在 template literal 裡寫檔名不要用反引號。

**驗證**（TEST ROOM 隔離）：兩個角色各跑完整流程；失禮／自然標記正確渲染；結算顯示 3 自然 1 可以 1 失禮＋五步檢查表＋換角色按鈕；手機 375px 版面正常；`clb7_roleplay_done` 寫入後清乾淨。dashboard 加了入口。

**⚠️ 這是原型，只有一個場景**。要不要擴充到餐廳、藥局、問路等，等 Owen 玩過再決定——`situations.js` 已經標好哪些情境有素材撐得起劇本。

---

### 08-24：把「網頁外的時間」收進 700 小時——總時數 28.4h → **56.4h**

Owen 丟了 `~/Desktop/Duolinguo/進度/` 六張 Duolingo 週報截圖，並說：「**anki 的時間也要算進去 這些都無法計時**」。

**他是對的，而且漏算的比想像中大。** `dashboard.html` 的 700 小時只加 `clb7_tracker`＝**這個網站裡的頁面停留時間**。但他最常用的兩個工具都在網站外：
- **Anki**：`revlog.time` 就是每一次複習實際花的毫秒數——**完全不需要他手動填**，一直都在那裡沒人去讀。
- **Duolingo**：官方週報上就印著「275 分鐘」，而 `DUO_SEED` 裡**只有一週**（W27），其餘五張截圖從來沒人輸入。

| | 補之前 | 補之後 |
|---|---|---|
| 本站 | 28.4 h | 28.4 h |
| Anki | — | **1.0 h**（104 次複習、6 天，單張平均 34.5 秒）|
| Duolingo | — | **26.9 h**（六週，平均 **4.5 h/週**）|
| **合計** | **28.4 h** | **56.4 h / 700 h** |

⚠️ **這個發現直接改寫了當天週報的結論**：報告寫「近 28 天只有 6.9 小時、實際速率 1.7 h/週」——那只算了網站內。加上 Duolingo 的 4.5 h/週之後，他的實際投入是 **6 h/週上下**，離目標 16.7 h/週還是有距離，但**不是原本以為的差十倍**。

**做法**
1. **`tools/gen_external_time.js`**（新）：複製收藏檔（連 `-wal`）→ 讀 `revlog.time` → 產出 `external_time.js`（`totalSec`／`reviews`／`byDate`）。用系統內建的 `sqlite3` CLI，不相依任何 npm 套件。
2. **`dashboard.html`**：新增 `ankiSec()`／`duoSec()`／`externalSec()`，總時數改成 `tracker ＋ 外部`；700 小時進度條下方**列出來源明細**（「本站 28.4h ＋ Anki 1.0h ＋ Duolingo 26.9h」）——不然總時數突然多出 28 小時會讓人不信任這個數字。
3. **`DUO_SEED` 補齊六週**（W26/27/28/29/31/34，來源都是截圖，逐張核對過連勝天數是否連續）。⚠️ 缺 W30（連勝 94）與 W32/33 的截圖，**沒有推估補洞**——寧可少算也不要假資料。
4. **`clb7-weekly-review` 排程加一個固定步驟**：每週先跑 `gen_external_time.js --write`，再去 `~/Desktop/Duolinguo/進度/` 撿比 `DUO_SEED` 最後一週還新的截圖、讀圖補一筆。這兩件事算在「不准自行修改系統」的例外裡（純資料刷新）。**所以他之後只要繼續把截圖丟進那個資料夾就好，Anki 完全不用管。**

⚠️ **Duolingo 週報的分鐘數是唯一的來源**：Duolingo 沒有可讀的本機資料，只有那封週報信。截圖沒丟＝那一週就是少算。

**追加：上課時間（同一天稍晚）** — Owen：「上課也要算時間吧XDDD 錄音檔的時間應該也要記錄進去XD 我看影片的時間就算了orz」
- 本來要用**課堂錄音檔的長度**來算（那才精確），但一查 iCloud，錄音混在他的工作與生活錄音裡（漢生東路、水利局、coaching…）。**沒有去翻**，直接回報並問方向，他說「好啦 不用 保底一週2.5小時」。
- 實作：`gen_external_time.js` 加 `cours` 區塊——`2026-06-25` 起算**整週**（取 floor，少算不多算）× **2.5 h/週**。目前 8 週＝**20.0 h**。
- ⚠️ 這是三項裡**唯一「估計」不是「實測」**的，所以 dashboard 的明細特別標了「（保底 2.5h/週）」。
- **看影片的時間他明確說不算**，不要自作主張加進去。

| | 值 | 性質 |
|---|---|---|
| 本站 | 28.4 h | 實測（頁面停留） |
| Duolingo | 26.9 h | 實測（官方週報分鐘數） |
| **上課** | **20.0 h** | **保底估計** |
| Anki | 1.0 h | 實測（revlog.time） |
| **合計** | **76.4 / 700 h** | 原本顯示 28.4 h |

**「需每天 X 小時才能達標」也跟著從 2.3h 降到 2.2h**——這個數字本來就被低估的時數推高了。

---

### 08-24：排程健檢——**三個「動腦」的排程全部失效，而且原因各不相同**

Owen：「我之前有個要求 定期有排程要做系統健檢 更新規劃 還要查找可能可用的資源……目前這部分是被略過了嗎？」

**查證結果：沒有被略過，七個 CLB7 排程全部啟用中、都有準時跑。但三個會動腦的全部沒有產出。**

| 排程 | 失效原因 |
|---|---|
| `clb7-weekly-review`（每週日 20:00） | SKILL.md 第一行就是「**請 Owen 貼上 quiz 匯出的 JSON**」，但它跑在**無人在線**的時段 → 每次醒來、發現沒人貼、結束 |
| `clb7-biweekly-optimization`（1、15 號） | 同一個病 |
| `clb7-research-survey`（每週四） | 不需要 Owen 的資料、**會真的跑完研究**，但輸出寫的是「整理成給 Owen 的提案」，**沒有寫成任何檔案** → 留在一個沒人會打開的 session 裡 |

**而且它們的前提早就過期了**：唯一留下檔案的 `ANALYSIS_2026-07-01.md` 自己寫著「行為數據儲存在 localStorage，**自動任務無法讀取**」——那句話在 07-01 是對的，但 **07-05 Supabase 同步就上線了**。從那天起數據頭端完全抓得到（08-17 的使用率體檢就是這樣做的），**沒有人回頭更新這三個排程**。

**修法（Owen 選「三個全修」）**
1. **資料自己抓**：三份 SKILL.md 都改成從 `sync_supabase.js` 現場讀出 URL/KEY/ROOM → 唯讀 GET `clb7_sync`；Anki 收藏檔複製時**連 `-wal` 一起**；加 git log。⛔ 明文寫死「只准 GET，永遠不要 POST/PATCH」（三次事故的教訓）。
2. **產出落地**：寫成 `reports/YYYY-MM-DD-<類型>.md` ＋ **在 HANDOFF「最近工作記錄」最上面插一行指標** ＋ 發通知。`reports/` 已加進 `.gitignore`（報告含學習數據與個人回答，repo 是公開的）。
3. **仍然不准自行實施系統修改**——報告只提案，等 Owen 拍板。

**實測整條管線**（不是只改文件就收工）
- 唯讀 GET 成功：雲端 **409 個 key**，時數／錯題／反射熱力圖／閱讀紀錄全部讀得到。
- 直接跑出**修好後的第一份週報** → `reports/2026-08-24-weekly.md`，HANDOFF 指標行也已插入。

**⚠️ 第一份報告就照出三件事**
1. **累計 32.3 h / 700 h（4.6%）**，近 28 天只有 **6.9 h／6 天**——比 08-17 體檢時的「10 天」還往下掉。剩約 40 週，需要 16.7 h/週，**實際 1.7 h/週，差近 10 倍**。
2. **反射熱力圖 0/54**，但原因是**量不夠**不是不會：48 格裡 33 格作答不到 3 次，判定門檻沒滿足。真正在動的數字是答對率 **53%**、起手中位 **2565 ms**。→ **dashboard 的頭條指標「反射格數」在這種投入量下會長期顯示 0**，等於一個永遠不動的儀表，建議換成答對率／起手中位數。
3. **寫作 0、口說 0**，跟 08-17 完全一樣——四場考試有兩場零投入。
4. 順帶：`clb7_wrong_log` 242 筆裡有 **135 筆沒有 topic 欄位**，超過一半的錯題進不了任何弱點診斷。

---

### 08-24：動詞衝刺「題目永遠不更新」的根因與修法——資料改成從 verbs_full.js 生成

Owen：「dashboard 有個每日練習項目是動詞變化的速答……題目也好像都沒有更新，只有幾個動詞且都是現在式。我過去式 perfect/imperfect 都學了……請幫我定期更新，每個月更新到最近進度。」

**先查再修，結果有兩個問題疊在一起**
1. `verb_sprint.html` 的變位表是**兩份手寫的常數**（`VERBS` présent 一份、`VERBS_PC` passé composé 一份）。所以「不會更新」是**結構決定的**，不是誰忘了更新。
2. **PC 模式其實 07-26 就做了**，但 **dashboard 的每日連結永遠是 `verb_sprint.html?guided=1`（＝présent）**——他每天照著處方點進去，看到的一定是現在式。所以他以為只有現在式，完全合理。**imparfait 則是真的沒有。**

**修法：拿掉「需要有人記得回來更新」這件事**
- 資料層改成從 **`verbs_full.js`（08-22 建的 22 動詞 × 13 時態推導引擎）** 生成。新增 `drillForms(v, tenseId)`：跟 `conjugate()` 唯一的差別是 être 動詞的複合時態要展開成 `a|b` 多解（衝刺是打字比對）。實測 aller 的 PC 六格跟原本手寫的那份**逐字相同**。
- 模式表 `MODES` 綁 **`gram_rules.js` 的解鎖狀態**：`passe`／`imparfait` 已解鎖 → 按鈕出現；`futur`／`subjonctif` 還鎖著 → 不出現。**這就是「定期更新到最近進度」的機制**——以後課程教到未來式，我們照慣例解鎖那個文法點，衝刺頁的按鈕自己就長出來，沒有人需要回來改這支檔。
- `verb_sprint.html?mode=imparfait` 可以直接指定時態。
- **dashboard 每天輪一個時態**（Présent → Passé composé → Imparfait → …），處方文字會寫「今天輪到 Imparfait」，連結帶 `&mode=`。
- ⚠️ **完成判定改成看所有時態的 session key**，否則練了 imparfait 那一步永遠不會變綠。

**Owen 決定不排每月排程**（「不用，靠自動就好」）。改成把「解鎖新文法點時確認衝刺有沒有跟上」加進**每課九項連動的檢查清單**（已寫進 memory `skill_transcript_notes`）——因為每課入庫本來就會碰 `gram_rules.js`，順手開一次衝刺頁看按鈕有沒有出現就好，不需要多一個排程。

**同一天的第二個回報：「有些字母真的很多 上面又一堆撇 打字時間不太夠」**
查了才發現——**衝刺的 `normalize()` 本來就會去掉重音再比對**（`NFD` 拆解後移除結合符號），連開頭的代名詞也會去掉。所以他打 `etais` 一直都算對，只是**頁面從來沒說**。這不是功能缺失，是資訊沒傳達。
- 修法：`placeholder` 改成「輸入變位，按 Enter（不用打重音）」，並在開始鍵下方加一塊常駐說明（étais → `etais`／j'ai été → `ai ete`／commençais → `commencais`），最後一句點明分工：**這一關練的是多快講得出來，不是打字；拼寫細節在填表格與抽考練。**
- 實測九種寫法：`étais`／`etais`／`j'étais`／`j etais`／`ETAIS` 全部算對，`etait` 正確判錯；PC 的 `suis allée`／`suis allee`／`je suis alle` 也都算對。

⚠️ **各頁對重音的態度不一致（現況記錄，沒動）**：
| 頁面 | 比對去重音 | 重音鍵列 |
|---|---|---|
| `verb_sprint` | ✅ 會 | ❌ 沒有（不需要） |
| `table_drill` | ❌ 不會 | ✅ 有 |
| `quiz`／`sentence_drill`／`gram_trainer` | ❌ 不會 | ❌ 沒有 |

衝刺寬鬆是刻意的（計時、練反射），其他頁嚴格也合理（練拼寫）。**Owen 選了「補重音鍵列」而不是「也去重音」**——痛點解掉但拼寫還是有地方在練。

**新增 `accent_bar.js`（共用模組）**：輸入框聚焦時，浮動鍵列出現在框的正下方（下方空間不夠自動翻到上方），13 個字元 `é è ê à â ç ù û î ï ô ë œ`。用 `mousedown` ＋ `preventDefault` 插入，所以**焦點不會跑掉、游標位置正確**。掛法一行：`AccentBar.mount('#ansInput')`。
- 已掛：`quiz.html`、`gram_trainer.html`（兩頁的輸入框剛好都是 `#ansInput`）。
- **`sentence_drill.html` 不用掛**——它是自評式的，根本沒有輸入框（原本的調查把它列進去是看錯了）。
- ⚠️ **踩到的坑**：第一版只用 `focusin` 事件代理，結果鍵列不出現——因為 quiz／gram_trainer **渲染題目時會自己 `focus()` 輸入框**，那個 focus 發生在使用者互動之前。改成 `MutationObserver` 盯著新生出來的輸入框，發現它已經是 `document.activeElement` 就直接顯示。
- 驗證：兩頁都實測「點 é → `mang` 變 `mangé`、游標在第 5 位、焦點沒跑掉」；手機寬度（375px）下鍵列 353px 不溢出、完整在畫面內。

**⚠️ 動詞維持核心 9 個、順序不動**——熱力圖的格子 key 是 `動詞_人稱`，換順序或加動詞會讓既有反射紀錄對不上。而且教學鐵律本來就是「核心 9 練到反射、其他只練套模式」。要擴充動詞應該另開一個模式，不是塞進這 9 個。

**踩到的坑：`const` 撞名**
`verbs_full.js` 也宣告了 `PERSONS`，跟衝刺頁自己的 `PERSONS`（顯示 `il / elle` 雙寫）在同一個 global lexical scope 重複宣告 → **整支腳本停掉、頁面全白**。已把頁面那份改名 `PERSONS_UI`。⚠️ **以後在既有頁面引入共用 .js 檔，先 grep 有沒有同名的頂層 const。**

**驗證**（TEST ROOM 隔離）
- 三個模式按鈕正確出現（futur／subjonctif 因為鎖著所以不出現）、`?mode=imparfait` 進來直接選中、熱力圖 54 格、儲存 key 分別是 `clb7_sprint_cells`／`_pc`／`_imp`。
- imparfait 六格抽查全對（être → étais…étaient；faire → faisais…faisaient）。
- 實跑作答：答對計分、寫進 `clb7_sprint_cells_imp`，**présent 的 37 格舊紀錄一格沒被動到**。
- dashboard：今天輪到 Passé composé、連結 `?guided=1&mode=pc`、未來三天輪 Imparfait → Présent → PC；模擬「只練了 imparfait」→ 完成判定正確變 true。
- ⚠️ 測試方法本身也踩一個坑：第一次分兩次工具呼叫作答，中間題目**逾時自動揭曉**了，紀錄變成答錯（`f:9999` 就是「沒有按鍵」的標記）。要在同一次執行內作答才測得準。

---

### 08-23：第26課（A2・比較的第二層・tout vs chaque・外貌與性格・拉封丹）入庫＋九項連動

Owen 貼了 08-23 那堂的完整逐字稿＋8 張課本截圖（`~/Desktop/0823/`）。這一課是**三篇課文一次上完**（非典型模特兒後半、拿破崙的替身、缺點的優點），加上 Unité 4 的全部外貌與性格詞彙、兩個文法點、還有拉封丹寓言的文化段。**份量大約是平常一課的兩倍。**

**兩個文法的關係要先講清楚（這決定了怎麼寫筆記）**
- 第25課教的是「比多少」（plus／moins／aussi・autant ＋ que），這一課補的是「比相同」——**判準完全一樣，還是看詞類**：形容詞副詞 aussi、動詞名詞 autant、名詞要講「相似」換 `le/la/les même(s) … que`、講「數量相等」用 `autant de … que`，另外 `pareil(le)` 是形容詞不接 que。所以筆記把它定位成「比較的**第二層**」而不是新東西。
- `tout / toute / tous / toutes` vs `chaque`：一個整批看（要配合性數）、一個一個一個看（永遠不變化＋單數）。⚠️ 真正的陷阱是 **tout 跟 tous 同音**——這是條「用看的」規則。

**九項連動**
1. `french_notes.html`：新增 `lesson-26`，**16 個 unit**（三篇課文各一、外貌詞彙三組、相似、主文法、tout/chaque、性格詞彙總表、拉封丹＋動物性格表、平行閱讀、老師課堂法語、發音警報、糾錯摘要）。129 句法文、12 張表、246 個發音鍵。
2. `questions.js`：**+39 題**，955→**994**。新 topic `tout-chaque`(10)、`vocab-apparence`(8)、`vocab-caractere`(9)，既有 `comparaison` 補 12。
3. `chunks.js`：**+100 張**，1499→**1599**。
4. `sentences.js`：`S_L26_1~10`，206→**216**。
5. `table_drill.html`：**+2 表**，52→**54**（`comparaison-egalite` 8 題、`tout-chaque-drill` 7 題）。
6. `gram_rules.js`：`comparaison` 的 `lessons` 補 26＋**新增 `tout-chaque`**（A2，8 條要點）。
7. `codex.js`：**新增 2 條**，128→**130**——`1-6-4`「chaque 與 tout」（1-6 節末追加）、`2-3-5`「le même que 與 pareil」（2-3 節末追加）。⚠️ 既有座標一條都沒動。
8. `map.html`：`CURRENT_LESSON` 25→**26**；新增 3 格 A2 tile（`tout-chaque`／`apparence`／`caractere`）。
9. `reading.html`：新增 `a27`「Deux frères, deux caractères」（A2／Caractère），26→**27 篇**。三題全打在本課痛點（aussi vs autant 的判準、chaque＋單數 vs tout 配合、sec vs mince）。
- `quiz.html`／`dashboard.html` 補三個新 topic 標籤。

**新工具：`tools/extract_chunks.js`（複習卡抽取器，這次終於進 repo）**
之前每課都說「重跑 chunks.js 抽取腳本」，但那支腳本從來沒進版控（跟 Anki 產生器一樣寫在 scratchpad 就沒了）。這次寫進 `tools/`：
- 抽兩種來源（跟筆記格式鐵律綁在一起）：`ul.phrase-list` 的 li、以及第一欄是 `td class="m"` 的詞彙表列。
- **id 撞號要遞增 `_2`／`_3`，不能 skip**（07-10 靜默漏卡的那個坑寫進註解了）。
- ⚠️ **加了選卡規則**：第一版抽出 **188 張**，是前幾課的三倍，會把複習包灌爆。現在只收「詞彙表全部＋標 ⭐/🎙 的句子＋真正的短塊（≤22 字且不是完整句）」，其餘課文長句留在筆記裡當閱讀材料。**這條規則以後每課都適用。**

**驗證**
- `node tools/check_notes.js` 11 條全綠。
- 資料層：BANK 994、CHUNKS 1599（**舊課 1498 張一張沒被動到**）、句庫 216、表格 54、codex 130 條**零空洞**、tile 72 格、文章 27 篇，各檔 id 皆無重複。
- 瀏覽器層（TEST ROOM 隔離，開頭攔 fetch 確認房間）：**`getPool()` 放行全部 39 題**（沒踩到 07-16「文法點被鎖整批題目消失」的坑）、39 題逐一渲染 0 個 HTML 跳脫 0 個空解說、tout-chaque 題的 📍 連到 `map.html#cx-1-6-4`、兩張新表實填實判（含故意答錯看提示）、a27 完整作答、筆記 16 unit／12 表全包 `compare-table`、`#cx-1-6-4` 深連結會展開 flash、review.html 讀得到 100 張新卡。
- ⚠️ **又抓到一次 `<b>` 跳脫**：`codex.js` 的 `pts` 在 `map.html` 是走 `cxEsc()` 的，我第一版在 2-3-5 寫了 `<b>不接 que</b>`，會直接印出裸露標籤（跟 Anki 那次同一類問題）。已改成「」。**codex.js 現在全檔 0 個 HTML 標籤。**

**⚠️ 這一課的份量問題（要跟 Owen 確認）**
100 張複習卡是平常的 1.5 倍（前幾課 60–70）。原因是這課有三篇課文＋Unité 4 全部詞彙。review.html 每天有包量上限所以不會單日爆掉，但**排隊會變長**。如果他覺得太重，最快的調法是把選卡規則再收緊（只收詞彙表＋⭐句）。

**第26課的 Anki 卡（28 張，Owen 說「ok」之後產的）**
- `anki/anki_l26.tsv`，**ID 從 REC_070 接續**（收藏檔最大號 069 +1，照永久門牌鐵律）。
- 卡型照 08-17 的三卡型鐵律混合：**單字卡 14／辨識卡 7／句子卡 7**——不是整批產出型（`feedback_production_vs_recognition_load`）。群組標籤：apparence 10、caractere 7、gram 10、polysemes 1。
- **產生器內建自檢先擋一次**（題幹開放式／HTML 標籤／欄位數／空題幹），再跑 `tools/anki_precheck.py` 到全綠才交出去——這是 Owen 08-21 的指示「以後你產卡要自己先檢查」。
- ⚠️ **教材鐵律的檢查抓到 11 張**：法文錨句不是逐字出自筆記（我自己順手改寫了課本句）。**11 張全部改成筆記裡的原句**再驗一次才 0 筆。這條檢查每課都要跑（第25課也是靠它抓到違規）。

**匯入後驗證（08-23，Claude 讀收藏檔）：97 張全對**
- **69 → 97 張**、裸露 HTML 標籤 **0**、ID 無重複、REC_070~097 二十八張全部到齊、REC_049 的題幹已更新成唯一決定答案的版本。
- **複習紀錄完好**：24 張複習過、revlog 72 筆（匯入前是 19／53，代表這期間他有在練）。
- 6 組「錨句重複」是**刻意的**：同一句拿來教不同的字（Il est barbu et dégarni. 同時是 dégarni／chauve／兩者對比三張卡的錨句），每張的題幹都不同，不是重複卡。
- 收尾：兩個 TSV 已從桌面移回 `anki/`，桌面清空。

**`tools/anki_precheck.py` 加了第四道閘：題幹必須唯一決定答案**
- 第一版判準太粗（開頭是「說／講」就擋），把「說你五年前在台北定居下來」這種**中翻法**也擋下來——那其實唯一決定答案，不該擋。改成只抓真正開放的：開頭是 解釋／描述／談談／聊聊，或句中有 一件／舉例／任何／你想到的。
- 收斂後在**已經匯入的 batch02 抓到 1 張真的違規**：`REC_049`「講你小時候『每天早上』都做的一件事（用未完成式）」→ 答案卻是特定句 `Je mangeais mes tartines tous les matins.`，答案可以有一百種。**先產了一個獨立的修復檔 `anki_fix_049.tsv`——這是錯的**，Owen 一句「分兩個檔案是因為？」就問出來了：那會讓 REC_049 同時被 batch02 和修復檔定義，**正是 08-19 弄丟 3 張卡的同一個結構**（一個 ID 兩個擁有者）。已改成<b>就地修改 batch02 裡那一列</b>並刪掉修復檔。<br>→ 立規進 `ANKI_SETUP.md`：**修舊卡就改原本那個檔，不要另開修復檔**；`anki_precheck.py` 一次餵多個檔會自動檢查 ID 有沒有重疊（現在 3 個檔 74 個 ID，零重疊）。
- ⚠️ **順帶發現**：REC_049 的那句法文**不在筆記裡**，也找不到 `transcripts/`（08-17 建的目錄現在是空的或不存在），所以無法確認出處。沒有擅自改答案，留給 Owen 判斷。

**⚠️ 順手發現（沒動）**
- `chunks.js` 有 **41 組法文重複**的卡片（都是舊課之間互相撞的，第26課沒有貢獻任何一組）。哪天可以清一次。
- `quiz.html` 的 `TOPIC_LABELS` 有 **13 個舊 topic 沒有標籤**（`vocab-vacances`、`body-health`、`passe-compose`…），畫面會直接印出英文 id。純顯示問題，不影響出題。

---

### 08-22：動詞變位總覽上線——不是變位表大全，是「詞幹經濟學」

Owen 提的：「動詞變位的介紹或考前快速複習表單……一個 prendre，所有有可能的變化形式什麼。」

**先改了切入角度再動手。** 一個動詞到 B2 攤平是 13 個時態 × 6 人稱 ≈ 80 格，那正好是教學鐵律要避開的「背表格」。但同一份資料換個組法就變成壓縮：法文所有時態只從**四個詞幹**長出來——futur 詞幹（→futur simple＋conditionnel）、現在式 nous（→imparfait、現在分詞、subj 的 nous/vous）、現在式 ils（→subj 的 je/tu/il/ils）、過去分詞（→全部複合時態）。所以「80 格」實際上是 **4 個要記的 ＋ 已經會的字尾**。

**架構決定：資料只存要記的，其餘推導**
- `verbs_full.js` 每個動詞只手寫：présent 六格、futur 詞幹、過去分詞、助動詞、passé simple 詞幹＋型，加上真的不規則的 subj／impératif／imparfait 詞幹。
- `conjugate()` 現場算出 13 個時態。**這樣做不只是省事——頁面是用計算證明它在教的那條規則**，而且改規則＝改一個函式，不是校對 1700 個手寫格子（22×13×6）。
- 每個時態卡都附「怎麼長出來的」一行，例如 imparfait 那張直接寫「現在式 nous『prenons』去掉 -ons ＝ pren- ＋ -ais/-ais/-ait…」。

**⚠️ 中途抓到自己的一個教學錯誤**：第一版的詞幹面板對 être 顯示「現在式 nous ＝ sommes-」「現在式 ils ＝ sont-」——那是把規則硬套在例外上，**會教錯**。改成不規則動詞直接顯示真正的來源（être 的 imparfait 詞幹是 ét-、subjonctif 標「不規則」並列出 que je sois／que nous soyons）。

**收錄 22 個動詞**（Owen 選的範圍）：核心 9（être/avoir/faire/aller/pouvoir/devoir/vouloir/venir/prendre）＋高頻不規則 10（savoir/voir/dire/mettre/partir/sortir/écrire/lire/boire/connaître）＋規則樣本 3（attendre -re／parler -er／finir 第二組 -ir）。

**定位（Owen 也選了）：先做純參考表，不加自測。** 理由是 08-17 的使用率體檢——他固定在用的只有兩個工具，再加一個要作答的頁很可能變藏書閣。所以這頁不產數據、不進今日處方，是「考前掃一眼」的工具，跟 `map.html` 同一類。⚠️ **這代表 dashboard 讀不到它**，之後若要讓它進處方，得先加遮欄自測。

**跟既有工具的分工**（頁尾直接放了三個連結）：`tense_lens`／`time_theatre` 管「該用哪個時態」（感知），`verb_sprint` 管「形式反射」，`verb_reference` 管「用法慣用語」，這頁補的是第三塊：**形式與生成邏輯**。

**驗證**
- Node 端把 22 個動詞的 futur／imparfait／subjonctif／passé composé／passé simple 第一人稱全部印出來逐行核對，22 行全對。
- 瀏覽器端：22 動詞 × 13 時態 × 6 人稱全部生成無 undefined／空格錯誤；切動詞、三段等級篩選（9／13／4 張卡）、`?v=être` 深連結、詞幹面板的例外標示、dashboard 新入口都實測過。
- **13 個 codex 座標全部驗過在 `map.html` 有對應元素**（`#cx-5-3-1` 實測會展開並 flash）。
- ROOM 隔離照協定走完（本頁有掛 session_timer＋sync，會寫 clb7_*）。

⚠️ 順手發現：`verb_reference.html` 是全站唯一沒掛 `session_timer.js` 的練習頁（07-11 那次全站清查漏掉它），在那頁讀動詞不計時數。沒動，留給下次。

---

### 08-19（續2）：Anki 卡片正面印出裸露的 `<b>` —— 是匯入的勾選框，不是檔案也不是 AnkiWeb

Owen 在手機 AnkiWeb 上看到卡片正面直接印出 `「Je n'ai pas <b>le temps</b>」`，問是檔案有誤還是網頁版 bug。

**診斷（讀他的 Anki 收藏檔比對來源檔，唯讀複本，沒有動到原檔）**
- 收藏檔在 `~/Library/Application Support/Anki2/使用者 1/collection.anki2`，是 SQLite，`notes.flds` 用 `\x1f` 分隔欄位——**不需要 AnkiConnect 或任何外掛就能讀**（這條之前 08-17 就驗過，這次實際用上）。
- TSV 裡是正常的 `<b>le temps</b>`，但資料庫裡存的是 `&lt;b&gt;le temps&lt;/b&gt;`，連撇號都變成 `&#x27;`——**這是 Anki 匯入時 escape HTML 的固定特徵**，也就是「允許 HTML」沒勾。`ANKI_SETUP.md` 本來就寫了必須勾，這次漏了。
- 影響 59 張裡的 **18 張**（REC_017／025~031／033~038／043／045／046／056）。撇號被跳脫的有 25 張，但 `&#x27;` 在畫面上會正常顯示成 `'`，看不出來。

**修法：拿掉依賴，不是加提醒**（Owen：「看哪個準確」）
- 勾選框已經漏一次，加「匯入後驗收」只能事後抓；所以**改成 TSV 永遠不放 HTML 標籤**，勾不勾都不會壞。
- 兩個桌面檔的 `<b>x</b>` 全部換成 `〔x〕`（v2 29 組、batch02 46 組），原檔備份成 `.bak-html`。⚠️ **不能用 `【】`**——那個已經是單字卡的群組前綴（v2 有 24 行在用）。
- 轉換後驗證：兩檔都仍是 24 欄、行數不變（59／43）、全檔沒有任何 `<` 或 `>`。
- `ANKI_SETUP.md` 立規：新增「強調的寫法」一節（`【】`＝群組前綴不可挪用、`〔〕`＝句子裡對焦的字），步驟 6 的「允許 HTML｜必須勾」改成「勾不勾都可以」，並寫下「哪天又看到裸露標籤」的兩種修法。

**順帶查到：`anki_batch02_recycled.tsv` 的 7 張從沒匯入過**（REC_060~066）。資料庫裡剛好就是 v2 的 59 張，batch02 獨有的那 7 張不在裡面。

**Owen 匯入後的檢查結果（Claude 讀收藏檔驗的）——裸露標籤修好了，但暴露出更嚴重的第二個問題**

- ✅ 66 張 note、**裸露標籤 0 張**、batch02 的 7 張新卡全部進來、沒有重複句子。
- ⛔ **但「兩個檔一起匯」這個建議是錯的（Claude 的判斷失誤）**：`anki_batch02_recycled.tsv` 跟 `anki_recycled_v2.tsv` **各自從 REC_001 開始編號，中間差一號**——同一個 ExternalID 在兩個檔裡是不同的卡。當初只比對了「ID 有沒有重疊」（36 個），沒有比對「同一個 ID 的內容是不是同一張卡」，結果 batch02 蓋掉 35 張錯位的卡。
- **實際損失：3 張內容完全消失**（`La cave est sous la maison.`／`Un séjour de 7 jours en Corse.`／`un magazine hebdomadaire`），另 3 張被合併進別張卡的說明裡。**排程沒有受損**——被覆蓋的 36 個 ID 當時複習紀錄都是 0（revlog 53 筆、19 張複習過的卡都不在受影響範圍）。
- **修復**：3 張用全新號碼 REC_067~069 重發成 `~/Desktop/anki_repair_lost3.tsv`；`anki_recycled_v2.tsv` 已改名成 `.已作廢-請勿匯入`（**它現在跟收藏檔全面衝突，再匯一次會把 35 張重新打散**）。收藏檔目前的權威編號＝batch02 那一套。

**制度性修法（這次的重點，不是修那 3 張）**
1. `tools/anki_precheck.py`：匯入前的守門員。擋三件事——**撞號但內容不同**（覆蓋別張卡）、**含 HTML 標籤**（正面印出裸露 `<b>`）、**欄位數不是 24**。只讀收藏檔複本。實測：repair 檔與 batch02 全綠、v2 直接被擋下 35 個衝突。
2. `ANKI_SETUP.md` 新增兩節：「**ExternalID 是永久門牌**」（跟 codex 座標同一條鐵律：永不重用重編，新一批從收藏檔最大號 +1 開始）與「**匯入前一定要先跑守門員**」。

**收尾（08-21 Owen 匯完，Claude 驗過）**：**69 張 note、裸露標籤 0、無重複句子、REC_067~069 三張都回來了、複習紀錄完好**（19 張複習過、revlog 53 筆）。

- ⚠️ **驗證時踩到 WAL 坑**：第一次查到還是 66 張，以為他沒匯——其實 Anki 開著，最新變更還在 `collection.anki2-wal`，只複製主檔會讀到舊資料。`anki_precheck.py` 已修成連 `-wal`／`-shm` 一起複製。
- **桌面清乾淨了**：TSV 移進專案 `anki/`（**已加進 .gitignore**，只留本機；真相來源是收藏檔本身，AnkiWeb 同步就是備份），作廢的 v2 丟 `anki/_已匯入作廢/`，兩個 `.bak-html` 備份確認跟現行檔逐字元等價後刪除。
- Owen 的指示已寫進 memory `feedback_self_test`：**產卡交出去之前 Claude 自己先跑 precheck**，不要再讓他當地雷偵測器。

---

### 08-19（續）：第25課瀏覽器層補測——**抓到一個真 bug（第24課就埋下的）**

上一段結尾寫「本課沒有做瀏覽器層實測」，這個 session 把它補完。全程照隔離協定：先 grep 確認 ROOM 是正式值 → 改成 TEST → **用攔截 `window.fetch` 的方式確認頁面實際打出去的 URL 是 `id=eq.TEST-DO-NOT-USE-...`**（比讀檔案內容更硬，直接證明執行中的那份不是快取的舊檔）→ 測完清資料 → ROOM 改回 → 立刻 `preview_stop` → grep 確認無殘留。

**🐛 找到的 bug：多解格的「顯示格」會把 `S'il|s'il` 原始字串印給使用者看**
- `table_drill.html` 的「初級一顯關格」會送一格答案當範例，那格直接印 `cell.a`。答案含 `|` 多解時，畫面就出現 `S'il|s'il`、`Lisez|lisez`、`une heure|une heure de l'après-midi`。
- **不只第25課**：全站 13 個含 `|` 的格子分佈在 3 張表，其中 3 個是顯示格——`heure-officielle-courante`（L24）、`consignes-examen`（L24）、`condition-si-drill`（L25）。**第24課入庫時就埋下了，當時沒測到。**
- 修法：顯示格只印第一個寫法（`String(cell.a).split('|')[0]`）。判分完全沒動（`checkAll` 仍拿完整 `dataset.ans` 去 split 比對），答錯時的 `✓ a / b` 提示本來就有 `.replace(/\|/g,' / ')`，也沒動。
- 修完三張表都重驗：顯示格分別變成 `S'il`／`Lisez`／`une heure`；`si`／`SI`／`s'il` 三種寫法仍然全判對；單解表的顯示格（`moins`）不受影響。

**其餘全部通過**
- **quiz `?lesson=25`**：38 題全數載入（comparaison 13／condition-si 7／vocab-meubles 8／vocab-quartier 10），實跑答錯→正解與 📖第25課／📍2-3 座標連結都出來、答錯的題目推進包尾重試（20題變21題）、答對加 XP。**用頁面自己的 `isCorrect()` 把 38 題的標準答案逐一回打，全過**；29 題 choose 全部有 opts、每題恰好一個選項算對、無重複選項。
- **table_drill**：新表 `comparatif-mots`(8)／`condition-si-drill`(7) 正常渲染（第25課 badge、文法詞類型、note 提示框），故意把「Les jeunes déménagent ...... que」填 aussi 被判錯並顯示 `✓ autant`——正是本課最容易錯的那格。全站 51 張表、id 無重複。
- **reading a26**「Mon quartier à Taipei」：26 篇、id 無重複；三層發音鍵（朗讀全文／點句／點字／0.75×）都在；實跑 2對1錯 → 高亮與 `expl` 解說正確、`clb7_reading` 寫入 `{id:'a26',correct:2,total:3}` 欄位齊全。
- `node tools/check_notes.js` 11 條全綠。

**Owen 說「補」之後的第二輪（同一天）：補解說＋又抓到兩個 codex 的問題**

1. **第25課 3 題 `trans` 的 `aNote` 補上**（原本是空字串）。解說全部取自筆記裡老師的原話，不是自己編：
   - 「房間數跟我們家一樣多」→ 名詞同等比較的兩個陷阱（用 autant 不用 aussi ／名詞前一定要 de）
   - 「如果你有空，可以來我家一趟」→ si ＋現在式＋現在式；si 只在 il／ils 前縮寫，si tu／si on／si elle 都不縮；passer＝順道過去
   - 「會沒事的，別擔心」→ T'inquiète 是 Ne t'inquiète pas 連 ne 和 pas 都省掉的超口語版，字面像肯定但意思是別擔心；**老師特別說寫作文不能這樣寫**
   三題都在瀏覽器實跑答錯，確認 `<b>` 有粗體、撇號沒被吃掉、📌 解說完整顯示。
2. **🐛 `codex.js` 的 `6-6-1` 後面多打一個逗號（`},,`）** → items 陣列出現一個 sparse hole，`6-6` 節長度算成 3 個但實際只有 2 條。`forEach` 會跳過 hole 所以沒炸，但**任何用 index 取值的程式碼都會拿到 undefined**，條目統計也會多算一條。已修，全檔 128 條、零空洞。
3. **🐛 `6-6-2` 沒掛 `topics`** → `codexLocate('condition-si')` 回 null，**si 條件句的題目答完沒有 📍 座標鍵可以跳回記憶宮殿**（比較級那些題有，因為 2-3 節有掛）。補上 `topics:['condition-si']` 後，該題的連結正確變成 `map.html#cx-6-6-2 → 📍 6-6-2 si 的基本式（A2）`。
   ⚠️ **這是新課連動的一個系統性漏點**：新增 codex 條目時如果只寫 `gram:` 沒寫 `topics:`，練習頁就定位不到它。之後每課驗證要加一條「新 topic 都 `codexLocate()` 得到座標（詞彙類 topic 除外）」。

⚠️ **preview 的 `.js` 快取這次真的咬人**：改完 `codex.js` 後，分頁重新載入（連 `force` 導覽、加 query string 都試過）拿到的還是舊版，害我一度以為修沒生效。**可靠的驗法**：`fetch('/codex.js?v='+Date.now(),{cache:'no-store'})` 抓原始碼，再用 `new Function(src+'; return codexLocate;')()` 在函式作用域裡跑（不能用 `eval`，`const CODEX` 會撞重複宣告）。正式站是 GitHub Pages，沒這個問題。

**第三輪（Owen：「把那 33 題沒有 aNote 的翻譯題也補完」）→ 全站 154 題 trans 100% 有解說**

補完的 33 題分佈：L1(7)／L3(1)／L6(1)／L14(1)／L15(9)／L16(8)／L19(2)／L20(3)／L23(2)。**每一條解說都先在 `french_notes.html` 裡撈到對應段落才寫**，不是自己編——做法是寫一支小工具把答案字串丟進筆記做上下文比對（scratchpad `ctx.js`），撈不到的就換關鍵詞再找，33 題全部找得到出處。

寫解說時的取捨（之後補 aNote 照這個標準）：
- **文法題**：講「為什麼是這個形」，不是重述答案。例：qui 後面直接接動詞／que 後面要接主詞＋動詞，並附「拆回兩句看主詞還受詞」的判斷法。
- **詞彙題**：一律補 <b>詞性冠詞</b>＋同組詞＋容易撞的鄰居。例：le champ（田野）補上「別跟 le chemin 搞混，只差一個字母」；le boucher 補上「去店用 à la boucherie、去人用 chez le boucher」。
- **老師講過的對比優先寫進去**：colocation（事）vs colocataire（人）、il fait（天氣）vs c'est（整體感覺，Owen 當堂問過的問題）、location vs locataire。
- 沒有把握出自筆記的話一律不寫。

**驗證**：`node --check` 通過；BANK 仍是 955 題（沒有誤刪誤增）；**用頁面自己的 `renderCard()` 把 154 題 trans 逐一渲染**，檢查 0 題出現 `&lt;b&gt;`（HTML 被跳脫）、0 題殘留反斜線、0 題空解說、每題都有 📌 區塊；另外挑一題實跑答錯截圖確認版面。ROOM 隔離照協定走完（開頭攔 fetch 確認是 TEST 房間、測完清資料並把乾淨狀態 push 回 TEST 房、改回正式值、`preview_stop`、grep 無殘留）。

⚠️ 清資料時發現的細節：**上一輪清掉的錯題又出現了**——因為當時只清本機 localStorage，資料早已被 debounce push 到 TEST 雲端房間，新分頁一開又 pull 回來。**所以測試清理要清完再 push 一次**（在 ROOM 還是 TEST 的時候），不然清了等於沒清。

全庫現在只剩 1 題沒有 `aNote`：L1 的 gender 題「japonais → 女性形？」——那題答案本身就是重點，不需要解說。

**⚠️ 順手發現（沒動，留給下個 session 判斷）**
- `.claude/worktrees/` 下有 4 個舊 worktree，其中 3 個的 `sync_supabase.js` 還停在 TEST ROOM。它們不在 git 追蹤內、也沒人會去開，但 `python3 -m http.server` 是從專案根目錄起的，理論上那些路徑也被服務出去。**建議哪天順手清掉沒在用的 worktree。**

### 08-19：第25課（A2・La comparaison・La condition）入庫＋九項連動

Owen 貼了 08-18 那堂的完整逐字稿＋8 張課本截圖（`~/Desktop/0818/`）。主文法是**比較級**，第二文法是 **si 條件句**，詞彙收掉 Unité 3 的家具／設備／街區，最後開了 Unité 4。

**開場先查既有覆蓋，結果決定了做法（這次省下最多工的一步）**
- `codex.js` 的 **2-3-4「名詞與動詞的比較」已經完整涵蓋 plus de／autant de／動詞+plus**——正是本課教的東西。**所以比較級一條座標都沒新增**，2-3 節完全沒動。⚠️ 但 2-3-4 標 **B1** 而課本在 A2 教（跟 `relatifs` 同樣的情況）。
- `6-6` 節只有 6-6-1「三式總表」(B1)，**A2 最基本的 si + présent 沒有** → 節末追加 **6-6-2**。
- `gram_rules` 的 `comparaison` 只有 4 條要點、`lessons:[14]`，不夠承載本課 → 升級。si 沒有任何點 → 新增 `condition-si`。

**九項連動**
1. `french_notes.html`：新增 `lesson-25`，12 個 unit（比較級四種搭配×三等級／四組不規則＋bon vs bien／si 條件句／家具／裝飾與家電／街區描述／失望與安慰的口語／課文 Les mannequins atypiques＋Oh le cliché／平行閱讀／老師課堂法語／發音警報／糾錯摘要）。
2. `questions.js`：**+38 題**，917→**955**。新 topic `condition-si`(7)、`vocab-meubles`(8)、`vocab-quartier`(10)，既有 `comparaison` 補 13。
3. `chunks.js`：**+60 張**，1438→**1498**。
4. `sentences.js`：`S_L25_1~10`，196→**206**。
5. `table_drill.html`：**+2 表**，49→**51**（`comparatif-mots` 8 題、`condition-si-drill` 7 題）。
6. `gram_rules.js`：`comparaison` 升級（`lessons:[14,25]`、要點 4→**10** 條、why 重寫成「詞類決定寫法」）＋**新增 `condition-si`**（A2，7 條要點）。
7. `codex.js`：**只加 6-6-2**「si 的基本式（A2）」，122→**128** 條。⚠️ 6-6-1 與 2-3 全節未動。
8. `map.html`：`CURRENT_LESSON` 24→**25**；新增 3 格 A2 tile：`condition-si`／`meubles`／`quartier`（65→68 格）。
9. `reading.html`：新增 `a26`「Mon quartier à Taipei」（A2／Quartier），25→**26 篇**。三題全部打在本課痛點（autant de 的兩個陷阱、mieux vs meilleur、s'il 的縮寫條件）。
- `quiz.html`／`dashboard.html` 補三個新 topic 標籤。

**本課的三個教學重點（之後出 Anki 卡要照這個分）**
- **比較級的難點不在三個等級，在「詞類決定寫法」**：形容詞副詞夾中間、動詞放後面、名詞要加 de；同等級形容詞副詞用 aussi，動詞名詞用 **autant**。
- **不規則只有「優等」那一格**：meilleur／mieux／pire。moins 和 aussi 那兩欄完全照原形放。
- **bon vs bien 是老師花最久講的**：bon 講東西品質與食物、bien 講感覺與活動；aimer 是動詞所以配 mieux。⚠️ 而且 **j'aime bien ＜ j'aime ＜ j'aime beaucoup**——加 bien 反而變弱，這點違反直覺。

**驗證**
- `node tools/check_notes.js` 11 條全綠。
- 資料層逐項驗證全綠，其中**驗證器抓到一個真問題**：`J'aime mieux ce quartier.` 進了句庫但筆記裡沒有逐字出現（違反教材鐵律「句子必須出自筆記」）→ 已把老師課堂原話補進筆記的 bon/bien 那個 note-box。⚠️ 這條檢查每課都要跑。
- 另驗了：舊課 1438 張卡未被動到、卡片與 tile id 唯一、2-3 節與 6-6-1 座標未動、getPool 放行全部 38 題、ROOM 是正式值。
- ~~⚠️ 本課沒有做瀏覽器層實測~~ → **08-19（續）已補測完畢**（quiz L25／table_drill 兩張新表／reading a26 全過，並抓到一個第24課就埋下的多解顯示格 bug，見上一段）。

**⚠️ 累積待 Owen 決定的 lvl／zone 問題（已經第三次遇到）**
課本在 A2 教、但系統標 B1 的點越來越多：`relatifs`(gram zone B1)、codex `3-5` 全節、codex `2-3-4`。**建議下次一次問一次改完**，不要每課再問一遍。

---

### 08-17：Anki 分工制真的落地了＋**使用率體檢：系統遠遠蓋過使用量（下個 session 要處理的主線）**

**Anki 建置完成、第一批卡上線**
- Owen 自己在 Mac 建好 `FR_Mining`（24 欄）＋兩個模板＋兩個牌組。踩到三個 `ANKI_SETUP.md` 沒寫的坑，已補進文件（見 commit `d29e11b`）：**每日上限掛在「預設組態 preset」不是牌組上**（要先複製一份給 Mining，否則做不出 10／5 的差別）、子牌組用 `::` 一次建、第7步驗收在卡片是產生器產的情況下可整步跳過。
- 產了 `anki_recycled_v2.tsv`（**59 張**，桌面）。匯入實測：更新 23、新增 36，總數 59 ✓。
- **⚠️ Owen 指出的設計錯誤（重要，之後產卡一律遵守）**：第一版的題幹是「情境氛圍」（例如「解釋閣樓跟地下室分別在房子的哪個位置」），答案卻是一個特定句子——**中間那段推理只存在 Claude 腦裡，所以他無法自我評分**。他的原話：「你答案的描述方法跟題幹的描述方法有落差，沒有辦法直接對應。」
- **→ 新鐵律：題目必須唯一決定答案。** 只允許三種卡型：**單字卡**（`【群組】中文釋義` → 法文單字）24 張、**辨識卡**（精確問句 → 明確判斷）14 張、**句子卡**（完整中文句＋結構提示 → 那一句法文）21 張。已寫成產生器的自動檢查：題幹開頭是「說／講／解釋／描述…」就擋下不輸出（第一次跑真的擋下來了）。
- 另加 `fr::grp::` 群組標籤（logement／mots／gram／souvenir／travail／polysemes／sport…），Owen 可以開濾鏡牌組一次只練一組——這是他要求的「分成不同群組讓我練習背」。
- **他的第二個回饋**：「背單字的消耗比較少，**生出句子滿耗腦力的**，可能可以交錯使用。」→ 已寫進 memory `feedback_production_vs_recognition_load`。第一版 23 張全是產出型是設計失誤；v2 已改成單字/辨識/句子三型混合。
- **卡片內容的來源**：Owen 這天貼了 L16~L24 共 7 堂課的完整逐字稿。**「老師說我們看過了」的那些回鍋字全部從裡面挖出來**（naître「we've seen it many times」、se balader、goûter、au quotidien、le feu…）。⚠️ 已建 `transcripts/` 並加進 `.gitignore`——逐字稿含他的家庭/工作/生活對話，repo 是公開的，**永遠只留本機**。以後每堂課的逐字稿存進去，就能自動抓回鍋字，不用他再貼。

**📊 使用率體檢（用唯讀 GET 從 Supabase 拉 `clb7_sync` 分析，沒有寫入）**

| 工具 | 累計 | 最後一次 |
|---|---|---|
| ①熱身 | 18 次 | 08-17 |
| ⚡動詞衝刺 | 15 次 | 08-17 |
| ②專項 Quiz | 6 次 | 08-02 |
| 👂聽力 | 5 次 | 07-17 |
| 📖閱讀 | 4 篇 | 07-15 |
| ③填表格 | 2 次 | 07-07 |
| 🗣️**口說** | **0** | **從未** |
| ✍️**寫作** | **0** | **從未** |

- 總時數 **31.8h／700h（4.5%）**；近 28 天有練 **10 天**；平均每次 **96 分鐘**。
- **系統有 917 題 quiz、25 篇閱讀、49 張表格、寫作題庫、口說工具，他固定在用的是兩個。**
- **口說與寫作是 DELF/TEF 四場考試的兩場、佔一半分數，一次都沒碰過。**
- **這是 Claude 的節奏問題不是 Owen 的**：08-16、08-17 兩天又加了第23、24課的九項連動，但第24課的 quiz 他連開都還沒開過。**接下來停止蓋新功能**，除非 Owen 點名；只做「新課筆記＋連動」與「Anki 卡片」兩件事。

**⏭ 下個 session 的主線：dashboard 今日處方重新設計（Owen 提出，尚未動工）**

Owen 的話：「dashboard 那邊有點沒辦法直接確認真的有點雞肋，也不精準。」

**08-17 他回答了需求，三條，第三條是設計的紅線：**
1. **要快速看到「複習進度」**——打開就看到，不用點進去算
2. **要看到「哪些東西該補足」**——弱點/缺口，而不是一堆已完成的統計
3. ⛔ **不要任何需要他手動填的東西**。他原話：「除了那種聽力或看影片的時間，那些都是自己填進去的，**我很懶得填，也常常沒在計時**」
   → **這條解釋了 dashboard 為什麼「不精準」**：它現在顯示的東西有一部分本來就靠手動記錄，他沒填 → 數字失真 → 他更不想看 → 更不填。是個負向循環。
   → **設計原則：dashboard 只呈現「自動抓得到」的資料。** 自動的有：Anki 的 `revlog`／`cards`（每一次複習）、`clb7_quiz_log`／`clb7_tracker` 的 auto-* 紀錄、reading/sprint 的作答結果。手動的（聽力時數、影片時數、口說日誌）要嘛拿掉、要嘛改成不影響主畫面的次要區塊。

要先跟他討論清楚再動手（**這是大腦，不要直接改**）。已知的三個問題與方向：
1. **處方開太重** → 平均每次 96 分鐘，重到「今天沒空就整天跳過」。建議改成「每天 20 分鐘固定版」（Anki 5 張＋一個小工具），有空再加。斷續比份量傷。
2. **複習那一步要改指向 Anki** → `ARCH_2026-08_ANKI.md` 3d 早就定好「dashboard 仍然是大腦，只是它的『複習』那一步變成『去 Anki 做完 N 張』」。⚠️ 但這牽涉到 `review.html`（1438 張卡、自己一套 SRS）要不要退場——**Owen 決定先讓兩套並存，試 Anki 是否比較順手再說**。
3. **口說與寫作要進處方** → 目前處方沒有強制它們，所以永遠排不到。
4. **dashboard 讀不到 Anki 資料**：GitHub Pages（https）打不到本機 AnkiConnect（http://localhost:8765），手機上更不可能。**能做的是**：Anki 的收藏檔就是 SQLite（`~/Library/Application Support/Anki2/使用者 1/collection.anki2`），Claude 可以直接讀 `cards`／`revlog` 兩張表做弱點分析（本 session 已實測可讀，不需任何外掛）——這正好就是 `ARCH` 第9節要的所有欄位，比原訂「Owen 手動匯出 CSV」更省事。要在 dashboard 上呈現則要把統計推進 Supabase（第二版，等 schema 確定不再改）。

---

### 08-16：第24課（DELF A2 閱讀實戰）入庫＋九項連動＋**筆記格式的第二次制度性修法**

**這堂不是課本新課，是考試訓練**——老師拿《Le DELF A2 100% réussite》帶 Owen 跑一次 compréhension des écrits。

**⚠️ 先記一條 Owen 當場給的糾正（比這課內容更重要）**

他丟了逐字稿＋8 張截圖＋整本 PDF，同時問「老師要我把單字丟進 Anki，你可以幫我嗎」。我一開始只去讀 Anki 架構文件，他馬上說：

> 「我沒有把重點都放在 anki 今天的筆記也好好做，**解題方法在這種專攻考試的課程中也很重要**」

→ **他丟課堂材料進來，預設就是要走完整的筆記＋九項連動**，不要因為他同時問了別的事就把筆記降級。而且**解題方法＝教材**，要跟文法詞彙一樣有 unit、有題目、有地圖門牌。已寫進 memory `feedback_exam_strategy_is_content`。

**九項連動**
1. `french_notes.html`：新增 `lesson-24`，14 個 unit／13 表格（四張考卷與四種題型／⭐老師的五條解題法／考試指令動詞 consignes／**時刻兩套說法**／價格與週期／電視節目／運動廣告／餐廳描述／行程與文化活動關鍵字／明信片題型的四個陷阱／平行閱讀／老師課堂法語／發音警報／糾錯摘要）。
2. `questions.js`：+36 題，881→**917**。三個新 topic：`strategie-lecture`（**10 題，解題法自成一個 topic**）、`vocab-consignes`（8）、`vocab-annonces`（12），另外 `numbers-dates-heure` 補 6 題。
3. `chunks.js`：+81 張，1357→**1438**（解題法的五條指令也做成卡）。
4. `sentences.js`：`S_L24_1~10`，186→**196**。
5. `table_drill.html`：+2 表，47→**49**——`heure-officielle-courante`（官方版→口語版換算，8 題）、`consignes-examen`（中文→法文指令動詞，8 題）。
6. `gram_rules.js`：**新增文法點 `heure`**（A2，8 條要點）。`why` 寫的是「moins 不是文法規則，是指針過半、眼睛自動去看下一個整點這件事的語言化；半點還沒開始往下一個整點靠，所以還沒有理由改用倒數」。
7. `codex.js`：**新增 `9-4-5`「官方時刻 vs 口語時刻」**，122→**127 條**。⚠️ 9-4-1~4 完全沒動，只在節末追加；含官方／口語對照 grid。
8. `map.html`：`CURRENT_LESSON` 23→**24**；**新增 A2 tile `delf-lecture`**（解題方法終於有門牌）；`heure` tile **沒有另開新格**——查到 A1 區早就有一格，改成把既有那格補強（lesson 6→24、補兩套系統說明）。
9. `reading.html`：新增 `a25`「Programme de la Maison de la culture」（A2／Examen），24→**25 篇**。這篇刻意做成**節目表型文件**而不是散文，三題全部在練今天的技能（時刻換算／換算後比價／週末定位）。
- `quiz.html`／`dashboard.html` 補三個新 topic 標籤，並補上 dashboard 一直缺的 `numbers-dates-heure`。

---

### 08-16：筆記格式第二次修法——`span.note` 撞 `div.note`（**改筆記 CSS 前必讀**）

> Owen 當天看到成品：「**今天筆記格式很有問題喔**」

**分成兩類，要分清楚**：

**(A) 我當天弄壞的（已修）**
- 時刻表**三欄全標 `class="m"`** → 第一欄「13 h 00」根本不是法文卻長出喇叭，一列三個 🔊。第23課一列只有一個。
- 五條解題法整段塞在 `note-box`＋長備注的 `phrase-list` 裡；**第23課的主結構是表格**。已把「五條解題法」「明信片四個陷阱」改回 `compare-table`。
- `<td class="m">① Lire pour s'orienter</td>` 把圈圈編號包進法文格 → TTS 會唸出「①」。

**(B) 從第 3 課就存在、被這課放大的（Owen 說「改」，已修）**
- **`<span class="note">` 跟 `<div class="note">`（黃色注意框）共用同一個 class 名** → 每一則條列的備注都被套上黃底＋左金線＋整塊撐滿，🔊 被擠到下一行單獨站著。**21、23 課全都這樣**，`check_notes.js` 前 10 條抓不到（它只檢查「class 有沒有定義」，不檢查「同一個名字被當兩種東西用」）。
- 修法：加 `.phrase-list li > span.note{}` 覆蓋成行內灰字＋可收縮，再用 `order` 把 🔊 排到法文正後方。⚠️ **不要去改 `.note{}` 本身**——那會把全站的黃色注意框一起弄壞。
- 結果：全站 1043 個條列，**0 個還是黃塊**；剩 43 個 🔊 換行的都是法文句本身超過 100 字自然折行，正常。

**→ `check_notes.js` 新增第 11 條：「同名 class 不可以同時當區塊與行內用」**（有撞名就要求 CSS 裡有 `span.X` 的覆蓋規則）。**它一跑就抓到另一個**：`aNote` 用了 3 次但全站沒有這個 class 的樣式，那三段一直是裸的 → 已改成 `note`。

**驗證**
- 資料層 `verify_l24.js`（scratchpad）九項全綠。除了各檔數量／id 唯一，特別驗了：**a25 的比價題用程式實算過**（danse 240 < cuisine 25×12=300 < natation 120×4=480，答案指向 danse）——第一版我把答案寫成 cuisine，就是這條檢查抓出來的；還有「14 h 45 的口語說法」不可以寫成 `quinze heures moins le quart`（混用兩套系統，筆記裡同一處也一起修了）；9-4-1~4 座標沒動；10 句 sentences 逐句比對確認出自 lesson-24 筆記。
- `node tools/check_notes.js` 11 條全綠。
- 瀏覽器層（隔離 ROOM，全程遵守）：`table_drill` 新表**故意把 13 h 30 填成 moins trente（就是他今天講錯的那句）被判錯** ✓、consignes 表故意填 Reparez 被判錯 ✓；`reading` a25 走真實 UI 三題全對、`clb7_reading` 欄位齊全、解說有出現換算式；`quiz ?lesson=24` 池子 36 題四個 topic 標籤都在；`map` 顯示第 24 課、delf-lecture 與 heure 兩格都指到第 24 課；`gram_trainer` 的 heure 規則卡 9 題半開卷、半點規則有出現；筆記全站重掃 0 個黃塊。
- 收尾：清掉 a25 測試紀錄 → ROOM 改回正式值 → **立刻 `preview_stop`** → grep 確認主工作區無 `TEST-DO-NOT-USE`、`sync_supabase.js` diff 為零。

**⏭ 下一步（Owen 的 Anki 需求，還沒動）**
老師要他把學過的單字全部丟進 Anki 背熟。**這件事專案早就設計好了**：`ARCH_2026-08_ANKI.md`（分工契約：記憶提取交給 Anki／考試形態訓練留在這套系統）＋`ANKI_SETUP.md`（24 欄 Note Type 與兩個模板的建置步驟）。**卡在第一步：Owen 還沒在 Anki 桌面版建 `FR_Mining` Note Type**。他建好回報之後，就照 `ARCH` 第 10 節先拿一課當白老鼠產 TSV（原訂第 22 課），跑通完整循環再談遷移 1438 張。

**📌 順手記下的既有問題（沒動，之後可處理）**：`verify_l24.js` 掃到 6 個已解鎖文法點在地圖上沒有對應 tile（determinants／prepositions／reflechis／imperatif／adjectifs-accord／duree-temps），點開只會顯示「之後的課程會教到。」；另外 codex 的 `imparfait` topic 掛在兩個地方。

---

### 08-12（續）：第23課剩下的 7 項連動全部補完（九項到齊）

接上一則的接手點做完。**下面每一項都跑過資料層驗證＋瀏覽器實測，全綠。**

3. **`chunks.js`**：新增 **86 張** L23 卡，1271→**1357**。
   - ⚠️ **抽取腳本不在 repo 裡，每次都是現寫的**。這次先用 L19~L22 的 237 張卡**反推出 id 規則並全數驗證通過**，再拿來生 L23，確保新舊規則一致：`id = 'L' + 課 + '_' + fr.slice(0,24).replace(/[^a-zA-Z0-9À-ÿ]+/g,'_')`，撞名補 `_2`。（更早期的課用的是「逐字元替換、不合併連續底線」的舊版，所以 L1 的 `L1__a_va_____Tu_vas_bien__` 長那樣——**舊卡 id 一律不動**，SRS 記錄靠它。）
   - **不是純機器抽取，是抽取＋人工汰選**（L22 也是這樣做的）：跟舊課完全重複的字丟掉（`la chambre`／`la cuisine`／`le salon`／`le balcon`／`le grenier`／`l'ascenseur`／`le local à vélos` 等第11課早就有了、`faire le ménage` 第10課有），只留本課真正新增的區辨（`la salle d'eau`、`une cuisine américaine`、`le rez-de-chaussée`、`rénové vs aménagé`、`neuf ≠ nouveau`、`colocation vs cohabitation`…）。
4. **`sentences.js`**：`S_L23_1~10`，176→**186**。10 句全部是 qui/que/où 的實句＋住宿詞彙，其中 4 句就是老師課堂反覆講的陷阱句。
5. **`table_drill.html`**：新增 `relatifs-qui-que-ou`（type:gram, lesson:23，9 列＝首列示範＋8 格填空，qui 3／que 3／où 2＋一格考 `qu'il` 縮寫），46→**47** 表。
6. **`gram_rules.js`**：`relatifs` 點**升級**（沒有新開點）——名稱補 où、`lessons:[16]`→`[16,23]`、規則要點 4→**8 條**（加 où 代替地點補語、老師的 where 測試法、⚠️ 先行詞是地方也可能要 que 的陷阱、où 可接時間）、`why` 補寫 où 的來歷、例句 2→4 句。
7. **`codex.js`**：**確認不用動**，3-5-1/2/3 已完整涵蓋 qui/que/où，座標鐵律遵守（驗證腳本有專門檢查這三個座標還在）。
8. **`map.html`**：`CURRENT_LESSON` 22→**23**；`relatifs` tile 的 hint／detail／lesson 全部更新（指到第23課，detail 補 où 與陷阱）；**新增 A2 tile `location`「🔑 Se loger & louer」**（64→65 格）。
   - **為什麼要新開一格**（上一則留的問題，這次的判斷）：`maison`(L11) 是房間與家具、`vacances`(L14) 是度假住宿，**租屋這一整套（廣告怎麼讀、每月付什麼、房東房客室友）沒有任何一格裝得下**。記憶宮殿要有門牌才記得住，所以開新格而不是把 L23 塞進 `maison`。
9. **`reading.html`**：新增 `a24`「Ma colocation à Taipei」（A2／Logement），23→**24** 篇。內文就是筆記裡的平行閱讀同一篇（驗證腳本會比對兩邊是不是同一篇），3 題理解題全部打在本課痛點上（que vs où 的陷阱、où 代替什麼、charges comprises）。
- 另外：`quiz.html`／`dashboard.html` 兩處 `TOPIC_LABELS` 補 `vocab-logement`，並把 `qui-que` 的顯示名改成「qui/que/où」。

**⚠️ 兩個留給 Owen 決定、這次刻意沒動的**（都會搬動記憶位置，所以不自作主張）：
- `gram_rules.js` 的 `relatifs.zone` 目前是 **B1**，但課本在 **A2** 教。改了會讓這個點在地圖上換區。
- `codex.js` 的 3-5 全節 `lvl` 標 **B1**，同樣問題；`CODEX_STYLE` 也規定 `lvl` 未經 Owen 同意不改。
- 兩個要改就一起改（同一個文法點的兩個門面），要嘛都留 B1。

**驗證**（隔離 ROOM 全程遵守）：
- **資料層**：`verify_l23.js`（scratchpad）一次驗九個檔＋額外檢查，**全綠 0 錯 0 提醒**。除了各檔數量／欄位／id 唯一，特別驗了：舊課卡片仍是 1271 張沒被重編（SRS 不掉）、**10 句 sentences 逐句比對確認真的出自 lesson-23 筆記**（教材鐵律：禁止自創法文教材）、codex 3-5-1~3 還在、a24 每題 `ans` 都指到有效選項、`getPool()` 放行全部 31 題 L23 題目（沒踩到 07-16「文法點被鎖題目整批消失」的坑）、ROOM 是正式值。
- **`node tools/check_notes.js`**：10 條全綠（第23課筆記本來就是上一則修好的狀態，這次沒再漂）。
- **瀏覽器層**（ROOM 已切 TEST，並用 `fetch(cache:'no-store')` 確認 preview 實際供應的就是 TEST 值才開始）：table_drill 新表 8 格正確載入，**故意把「la pièce ...... je préfère」填成 où 被判錯並顯示 ✓que**、`qu'il` 縮寫被接受；reading a24 從清單點進去（走真實 UI 不是直接呼叫函式）、故意 2對1錯 → `clb7_reading` 寫入 `{id:'a24', correct:2, total:3, sec, date}` 欄位齊全＋錯題給出完整解說；french_notes lesson-23 渲染 14 unit／12 表格全包 compare-table／**166 個 🔊**／`p.fr` 0 個／導覽列 23 個按鈕；map 顯示「第 23 課 / 預計 35 課」、location 與 relatifs 兩格都是「第 23 課」、筆記連結指向 `#lesson-23`；gram_trainer 的 relatifs 規則卡 8 條要點與 4 例句全部渲染；quiz `?lesson=23` 池子 31 題（vocab-logement 19＋qui-que 12）、標籤兩處都有、第一題就出到 L23 的句子（**只看池子沒作答，不寫 SRS**）；sentence_drill 句庫 186；review 卡庫 1357；dashboard 無 console error、無 undefined。
- **收尾**：清掉測試寫入的 a24 紀錄與錯題本那一筆（`clb7_reading` 還原成進來時的 4 筆）→ ROOM 改回 `owen-clb7-k9f3a72q` → **下一步立刻 `preview_stop`** → grep 確認主工作區無 `TEST-DO-NOT-USE` 殘留（只剩文件裡在講這條規則的文字）、`sync_supabase.js` diff 為零。

---

### 08-12：第23課入庫（做到一半）＋筆記格式檢查器

> ✅ **下面列的 7 項已經在上一則補完了**，這則保留當紀錄，不要再做一次。

**⚠️ 這一課只做了 2/9，其餘 7 項還沒做。** 下面寫清楚做了什麼、還缺什麼。

**已完成**
1. `french_notes.html` 新增 `lesson-23`（Unité 3 Comme à la maison），14 個 unit。
2. `questions.js` +31 題，BANK 850→**881**（`vocab-logement` 新 topic 19 題、`qui-que` 既有 topic 補 12 題含 où）。

**⛔ 還沒做（照九項連動補完）**
3. `chunks.js` — 跑抽取腳本補 L23 卡片
4. `sentences.js` — 人工精選 S_L23_1~10
5. `table_drill.html` — 加 qui/que/où 選填表
6. `gram_rules.js` — `relatifs` 點要**升級**：目前 `lessons:[16]`、名稱只有「qui · que」、**缺 où**。補 lesson 23 與 où 的規則/例句。⚠️ `zone` 目前是 B1 但課本在 A2 教，**要不要改 zone 先問 Owen**（動 zone 會搬動地圖上的位置，影響記憶宮殿）
7. `codex.js` — **不用動**（已查證 3-5-1/2/3 完整涵蓋 qui/que/où）。⚠️ 但 3-5 全節標 B1，課本在 A2 教；`lvl` 依 CODEX_STYLE 未經 Owen 同意不改，先問
8. `map.html` — `CURRENT_LESSON` 22→**23**；住宿主題要不要新增 tile
9. `reading.html` — 新增 `a24`（用筆記裡的平行閱讀 Ma colocation à Taipei）
另外：`quiz.html` 與 `dashboard.html` 兩處 `TOPIC_LABELS` 要補 `vocab-logement`

**課本重點（截圖在 `~/Desktop/0811/`，5 張）**：主文法 qui/que/où；詞彙是住宿與租屋。老師的判斷法：後面直接接動詞→qui、先出現主詞→que、講地方→où（**用英文 where 測試**）。兩個他反覆卡住的陷阱：`la pièce que je préfère`（是 que 不是 où）、`un studio que mes parents ont acheté`（買的是房子＝受詞）。

---

### 08-12：筆記格式漂移的制度性修法——`tools/check_notes.js`（**寫新課筆記前必讀**）

> Owen：「我覺得很奇特 筆記怎麼每次都會變動，做筆記時要有習慣先去看格式跟做法吧！」

**他是對的，而且根因是制度不是手誤**：`CLAUDE.md` 的筆記鐵律只寫了表格兩條，沒寫平行閱讀要用 `phrase-list`、沒寫哪些 class 該有樣式。規則沒寫全 ＋ 沒先看範本 ＝ 每次都會漂一點。

**→ 新增 `tools/check_notes.js`。加完新課筆記必跑：`node tools/check_notes.js`，全綠才算連動完成。**

10 條檢查：標籤平衡／表格包 `compare-table`／法文欄標 `class="m"`／**法文句不可用 `<p class="fr">`**／平行閱讀要用 `phrase-list`／summary 與 unit 結構／**class 一定要有 CSS 定義**／課次連號／`phrase-list` 裡的法文要包 `span.fr`。

⚠️ **規則是照系統實際的發音掛載寫的，不是照假設**（`french_notes.html` 的 JS：`.compare-table td.m` / `td.f` / `.fr-ex` 才會長喇叭）。所以「法文放在 `fr-ex` 裡」是合法寫法；「純中文的 li」也合法（課文逐句中譯刻意只放中文，法文原文有版權不上公開站）。寫規則時我一開始用內容猜，誤報到 122 條，最後改成**用欄位位置判定**才收斂。

**它一跑就抓出的既有漂移（都已修）**：
- **5 個表格把 class 標在 `<table>` 自己身上** → `.compare-table table/th/td` 全部失效，樣式一直沒生效
- **`compare-title` 全站用 107 次卻沒有 CSS 定義**（從第 3 課就這樣）；`unit-intro`、`verb-title` 同樣沒定義 → 已補樣式
- **25 個 li 的法文裸放或包在 `<b>` 裡**（lesson-5/9/12/13 等）→ 沒有 🔊、`chunks.js` 也撈不到 → 已改包 `<span class="fr">`
- lesson-5 牛排熟度表的法文欄沒標 `m`

⚠️ **我自己也犯了同一個錯**：第23課的平行閱讀本來寫成 `<p class="fr">` 段落，等於沒發音、進不了複習卡。已改回 21/22 課的 `phrase-list` 一句一 `<li>`。**下次寫筆記前先開一課現成的看，再動手。**

📌 **建議（要 Owen 點頭）**：把「加完筆記必跑 `node tools/check_notes.js`」寫進 `CLAUDE.md` 的內容鐵律第 4 條。CLAUDE.md 註明改前要先問，所以這次沒動。

---

### 08-10：時態感知塊落地成兩個工具——時態鏡頭 ＋ 時間劇場（**下個 session 必讀**）

08-07 把「感知塊要靠反覆喚醒」寫成了框架，但那天只有文件沒有工具。這兩天把它做出來，而且**中途被 Owen 修正了三次，每次都改到設計的根**。三次修正比工具本身重要，先寫：

**① Owen 重排了四個開關（08-08）**
他自己給的順序是 ①我這句想做什麼（報告現實／保留距離／表達立場）②我站在哪個時間點看 ③我要怎麼拍它 ④到那個點完成了嗎。比我原本的 WHEN→CAMERA→REALITY→RELATION 好，因為①決定跳到哪一列、是最大的分岔該先問。而且巧的是 A2 階段一樣只跑②③（①恆為報告現實、④還沒學），**編號不用改就自洽，座標記憶不受影響**。`codex.js` 5-9-1 已改成他的版本。

**② 「不是非學過法文文法才能用，是套用思考方法」（08-08）**
我原本把未學時態設成「只認不產」——那是把法文知識當入場券。他說反了：**看懂時間的形狀不需要法文**。所以場景庫/題庫**四個開關從第一天全開，不按「學過沒」篩選**。⚠️ 下個 session 不要再往「先學會才能練」的方向退。

**③ 「思考過程還是可以先用中文建立，硬要純法文肯定失敗」（08-10）**
這條直接打臉我第一版的標語「沒有中文可以依賴」。正確的分界是：
- ❌ 要拆掉的：**中文句子 → 翻成法文**（中文的「正在」「了」會替他扛掉鏡頭，他就永遠不用自己選）
- ✅ 要留著的：**用中文推理「這是長條還是點」**（他法文還不夠好，硬要純法文思考會當場卡死）
→ 每個場景加 `shapeZh`＝**形狀的中文描述**，不是那句法文的中文翻譯。已驗證提示不會洩漏 `zh`。**這兩者的差別就是整個工具成不成立的分界線，改這支程式前先讀懂這句。**

**產出的兩個工具（定位不同，不要合併）**
| | `tense_lens.html` 🔭 時態鏡頭 | `time_theatre.html` 🎬 時間劇場 |
|---|---|---|
| 給什麼 | 一個法文句子，標黃一個動詞 | 只有時間的形狀，沒有句子 |
| 做什麼 | 跑四個開關（點①②③④） | 直接打出一整句法文 |
| 練的是 | **裝鏡頭**（認得出來） | **用鏡頭**（產出整塊） |
| 四開關 | 就是主路徑 | 降級成答錯才展開的除錯工具 |
| 題數 | 133 題 / 15 格 | 32 場景 / 15 格 |
| key | `clb7_lens_*` | `clb7_theatre_*` |

⚠️ 時態鏡頭是**鷹架不是終點**——它讓你點①②③④，那正是 Owen 說的「一點一點串成」。長期要往時間劇場那端走。

**素材來源（重要，之後擴充照這個做）**：法文 100% 取自 `codex.js` 第5章時態＋第6章語氣的既有例句，Claude 未自創任何一句。發現 **codex 的節結構就是現成的標籤**（5-4 底下全是 PQP、6-3 全是 subjonctif），比正則判時態可靠得多。原本以為素材不夠（`sentences.js`＋`chunks.js`＋`reading.html` 對 futur simple/PQP/subjonctif 幾乎是 0 句），是 codex 補上的。

**兩個 si 子句獨立成格（設計重點）**：`Si j'étais riche` 的 imparfait 跟③鏡頭完全無關，是①保留距離；`Si j'avais su` 的 PQP 是①距離＋④完成。純看形式判時態就會在這裡錯，所以 `siimp`／`sipqp`／`sipres` 各自成格。

**⚠️ 兩個字串比對的坑（會靜默給出錯誤診斷，最難抓）**
1. **不可用 `includes()` 比對動詞，一律用詞邊界**：`deja vu` 含 `a vu`、`arrivera` 含 `arrive`、`resterai` 含 `reste`、`acheterais` 含 `achete`——子字串會把**正確答案診斷成別的格子**。
2. **詞邊界的字元類不可把撇號算成字母**：用 `[^a-z0-9']` 會讓 `j'étais` 永遠對不上 `étais`，32 場有 **7 場變成無解**。要用 `[^a-z0-9]`。這條是法文特有（élision），**只有「拿參考句去模擬作答」才抓得到，結構檢查抓不到**。之後任何法文自動批改都先寫這個模擬。

**⚠️ preview 快取：不只 `.js`，HTML 本身也會被快取（08-10 新發現）**
改了 `time_hall.html` 的 `render()` 新增三種版型後，preview 跑出來三種版型全部空白——**不是程式錯，是頁面還是舊的 HTML**。
- **診斷法**（沿用 08-04 那條）：比對「頁面已載入的陣列長度」vs `fetch(路徑,{cache:'no-store'})` 抓到的檔案內容，不一致就是快取。這次 `HALL.length` 是 5、檔案裡是 10。
- **`.js` 的解法**：`const` 不能重新宣告，但陣列物件可以改——`HALL.length=0; fresh.forEach(c=>HALL.push(c))`。
- **HTML 的解法**：`navigate` 到 `xxx.html?v=<隨便一個新字串>`，換 URL 才會重抓（單純 reload 沒用）。改完要驗證「頁面上的函式是不是新版」可以直接看 `render.toString().includes('新分支')`。

**⚠️ preview localStorage 會在 preview_stop→preview_start 之間被清空（本次新發現）**
第二輪測試開始時，preview 瀏覽器的 `clb7_*` 從 ~350 個變成 **0 個**。不是程式 bug，是 in-app 瀏覽器清了 site data。**本次無害**（全程 ROOM=TEST，且我是先 `preview_stop` 才復原 ROOM）。但這正是「雲端被推空三次」的機制現形：**空的 localStorage ＋ 正式 ROOM ＝ `push()` 直接把雲端洗掉**。→ 這是 SURVEY C-1「push 縮水保護」該做的實證，建議提高優先序。
**同時修正一條收尾順序**：測完**先 `preview_stop` 再復原 ROOM** 比反過來安全（頁面記憶體裡還是舊的 TEST 值，先關掉就完全不可能推到正式）。
**唯讀查核正式雲端的正確寫法**（HANDOFF 舊敘述漏了欄位名）：`clb7_sync` 的主鍵欄位是 **`id`** 不是 `room` → `/rest/v1/clb7_sync?id=eq.<ROOM>&select=payload,updated_at`。本次查核：正式雲端 **374 個 key**、`clb7_tracker` 51 筆、無 lens/theatre 殘留。

**⚠️ 順手發現：四個背景 worktree 的 ROOM 停在 TEST 值**
`adoring-mccarthy`／`suspicious-mclaren`／`focused-morse`／`exciting-volhard` 的 `sync_supabase.js` 都是 `TEST-DO-NOT-USE`。測試中很正常，但**那些 session 若沒復原就 commit、再 merge 進 main，Owen 的同步會直接死掉**。合併 S2–S6 前先跑 `grep -rn "var ROOM" .claude/worktrees/*/sync_supabase.js`。我沒動別人的 worktree。

**④ 「學習不是只有題目」（08-10 第四次修正，最根本的一次）**
> 「很多東西可以不用用題目做，算是讀／浸潤／體驗式學習。題目是驗收或輸入輸出的過程，但學習不是只有題目。」
> 「我給你那個 GPT 資料夾內容，我甚至覺得有需要重複讓我學習／思考。」

前面兩個工具本質都是**測量儀器**，把「答對」當成學習本身。→ 新增第三個，`time_hall.html`（時間劇院）：**沒有題目、沒有計分、沒有 SRS**，只有讀 ＋「今天讀過了」。卡片可前後翻、記住上次讀到哪張、下次接著給下一張（重複但不重複同一張）、點法文可發音。

**GPT 資料夾的處理方式（之後擴充照這個做）**
- ⚠️ **不搬圖檔**：11 張共約 38MB，且 repo 會 push 到公開 GitHub Pages。改成**文字＋SVG 轉錄**——體積小、可連 codex 座標、手機好讀，而且才能「重複出現」。
- ✅ **9 張全部轉錄完成**（Owen 當天要求「你把剩下那五張圖補完」）。`time_hall.js` 現在有 **10 張卡**（時間劇院 1/9–9/9 ＋「四開關×14 時態」海報的九宮格）、48 句法文，順序照系列排。頁面版型：`framework`／`cast`／`pair`／`character`／`doors`（5/9 與 7/9 共用）／`uses`（6/9 與 8/9 共用）／`summary`／`grid`。
- **2/9 是整組職業別名的來源**（記憶掛勾，之後寫解說可以直接引用）：présent 現場主播／passé composé 紀錄官／imparfait 長鏡頭攝影師／plus-que-parfait 檔案管理員／futur simple 未來建築師／futur antérieur 驗收經理。
- **9/9 的「法文最迷人的整齊感」**是 5×2 對稱表（現在/過去/未來/可能/立場 × 直接看它／在參考點之前已完成），跟海報的九宮格是同一批時態的**另一種切法**，兩張都留著。
- ⚠️ **絕對不要憑印象補圖的內容**——BLOCKS.md 已警告「LLM 生成的圖，錯誤會長得跟正確的一模一樣」。要改內容先回去看 `~/Desktop/ＧＰＴ/` 的原圖。
- 系列的骨架：一個故事貫穿（Luc 今晚會不會來／Luc 離開／我抵達），每張把一個時態寫成一個角色（別名＋時間軸＋vs 對照＋一句話靈魂）。

**📌 核對出兩件事（重要）**
1. **Owen 給的四個開關順序，就是時間劇院 1/9 的原文**，不是他自己重排的。另一張「四開關×14 時態」海報用的是 WHEN 先——**兩張圖本來就不同調**。codex 5-9-1 現在對齊 1/9。
2. **1/9 的①有四個選項，我原本漏了第四個：推動對方行動 → impératif**。已補齊：`CELLS` 新增 `imperatif` 格、`tense_lens.html`／`time_theatre.html` 兩頁①都加按鈕與標籤、codex 5-9-1 ① 改寫、`tense_lens.js` 補 4 題（取自 codex 6-1-1）。題庫 133→**137**，格子 15→**16**，無空格子。

**⑤ 時態透視鏡 `tense_xray.html`（浸潤的主力，08-10 當天做完）**
預設就是一篇乾淨的法文短文，**沒有題目、沒有計分、沒有 SRS**；想看時間的形狀再按「💡開燈」，每個動詞浮出底線：藍實線＝展開中的畫面／紅實線＝完整事件／金虛線＝保留距離（不是真的）／雙線＝表達立場／綠線＝未來／橘線＝推動行動，右上角 ✓＝到參考點已完成。點動詞出說明卡，再點可進 codex。
- **六篇、89 個標註動詞，質地是刻意鋪的**：X1 場景6/事件3（交錯）· X2 事件8含4個✓（挖更早的過去）· X3 未來11（整篇右移）· X4 距離7（si 三扇門）· X5 立場8（subjonctif）· X6 命令4（impératif＋passé récent）。
- **標記格式 `[[動詞|格子]]` 寫在內文裡**，不要改成「另存位置表」——改一個字整篇就歪掉。
- `SHAPES` 是 18 格的字典，各帶 `fam`（①③是哪一族）＋ `done`（④完成沒）**兩欄**；單一 shape 字串沒辦法同時表達這兩個維度，之前踩過。
- 驗證腳本有一條特別的檢查：**拿動詞字尾反推標籤**（標成 imp 的字尾就該是 ais/ait/…），專抓貼錯格子。加新文章一定要跑。

**⑥ 「點標題進文法記憶宮殿」（Owen 08-10 提出）**
`time_hall.html` 的卡片標題改成可點，直接跳 `map.html#cx-<座標>`；2/9 的角色名、5/9・7/9 的門名、6/9・8/9 的欄名只要有對應格子也都可點。為了由格子反查座標，**`time_hall.html` 現在會載入 `tense_lens.js`（要在 `time_hall.js` 之前）**。`tense_xray.html` 的說明卡也有同一個入口。

**⚠️ codex 有兩個真的缺口（做連結時暴露出來的）**
`futur antérieur` 與 `subjonctif passé` **在 codex 裡沒有座標**，所以時間劇院 2/9・5/9・8/9 裡這兩個名稱是唯一連不出去的。`5-5` 只有 5-5-1 futur proche／5-5-2 futur simple；`6-3` 只有觸發／形／vs 直陳。兩張 GPT 圖都把它們當正式成員（9/9 的整齊感表、海報的九宮格都有）。**建議在節末追加 `5-5-3` 與 `6-3-4`**——是往後追加不是重編，不違反座標鐵律。素材現成：`time_hall.js` 的 2/9・5/9・8/9 已經有例句與說明。

**⚠️ 浸潤素材的真實缺口（下個 session 會撞到）**
`reading.html` 23 篇裡**只有 a21／a22／a23 三篇是敘事體**（過去式動詞 11／8／9 個），其餘 20 篇都是 A1 的菜單、廣告、時刻表，全présent——**拿來做時態浸潤等於沒有素材**。要做「時態透視鏡」（讀文章時把時態的形狀浮在文字上）之前，得先補敘事текст。內容鐵律允許原創閱讀短文（a22／a23 本來就是 Claude 寫的），建議的做法：**詞彙鎖在已學課次，時態放到 B2**——他每個字都讀得懂，新的只有文法的質地。這個想法已跟 Owen 說過，他沒有反對，但**還沒實作**。

**✅ 已接進今日處方（08-10 當天完成）**：照 Owen 自己的「浸潤 vs 驗收」區分接成**兩步**，不是四步——
- 🎭 `tense_read`：時間劇院／時態透視鏡交替，任一支讀了就算完成，badge 用藍色「去讀」不是紅色「未完成」（它不是作業）
- 🔭 `tense_drill`：時態鏡頭／時間劇場交替，任一支做了就算完成，why 顯示該支到期數

兩步進 `MIDDLE` 每日輪替（**MIDDLE 只換順序不換成員，所以每天都會出現**），也進了 `HABIT_STEPS`。每日步數 13→**15**，若 Owen 覺得太長，最小改法是把兩步改成隔日出現（在 `stepDefs` 外面用 `evenDay` 過濾 MIDDLE）。
⚠️ **刻意不在 dashboard 載入題庫檔**：到期數直接從 SRS 記錄算（有 due/days/iv 就夠），所以不用加 script 標籤，整個 diff 只有 +53/-3，跟其他在改 dashboard 的 session 衝突面最小。

**✅ 記憶宮殿 ↔ 時態工具已接成雙向（08-10 收尾）**
- **map.html 條目出口**：時態/語氣條目在「⚡用這條考我」那一排多兩個——「🔭 用四個開關練這條」「🎭 時間劇院怎麼講它」。26 個座標會長出來，冠詞/否定那些不會。map 因此載入 `tense_lens.js` 與 `time_hall.js`，**只用來判斷有沒有對應工具**，不參與地圖渲染。
- **`?cx=<座標>` 聚焦**：`tense_lens.html?cx=5-4-1` 只出該座標的題，**刻意不受每日新題上限與到期排程限制**（從條目跳過來就是想馬上練這條），有聚焦提示與退路；`time_hall.html?cx=5-4-1` 直接翻到那張卡。
- ⚠️ 兩個坑（已修，改這段前先看註解）：① 聚焦標籤要抓「座標對應的格子」，不能抓池子第一題——5-4-1 的雙動詞句同時含 pc，會顯示成 passé composé。② `time_hall` 的 `?cx=` 要有**四層優先序**（整張卡 → 角色主角 → 門/欄 → 總覽格），否則總覽卡什麼都沾得到邊，5-4-1 會開到 2/9 而不是 4/9。

**✅ 🕐法語時區（Owen 的「dashboard 模式」）**
dashboard 常駐一張卡：四個開關 2×2 印在上面，每天輪播一張時間劇院的卡當「今日校正」並可點進。dashboard 因此載入 `time_hall.js`（處方的到期數仍是從 SRS 算，沒有載入其他題庫檔）。

**還沒做**：時態透視鏡的敘事素材只有 6 篇，之後要擴要照 `tense_xray.js` 開頭那條界線（詞彙鎖已學課次、時態放到 B2）。

---

### 08-07：教學典範轉移——認知壓縮框架＋Anki 分工制

這天沒有寫新課，做的是**整套系統的方向調整**。產出四份文件，`CLAUDE.md` 也改了。

**起點**：Owen 提出 French OS brief（見 `FRENCH_OS.md` 第1節）——核心診斷是「**瓶頸不是不知道，是還需要想**」。目標不是更會算法文，是讓法文逐漸不需要算。

**① `CLAUDE.md` 新增「教學鐵律」（行為層，即刻生效）**
答錯時**先分類再回應**：概念缺口（解釋）／自動化缺口（**直接給壓縮練習，禁止重講規則**）／偶發失誤（一句帶過）。判準不明時問「這規則你講得出來嗎」——講得出來就不要解釋。

**② `FRENCH_OS.md`（認知壓縮框架）**
診斷核心是**區塊拆解**：一句話由哪幾塊疊起來、哪塊壞了。⚠️ 中途踩到一個大坑：**初版把核心寫成「量延遲＋算變異係數」，被 Owen 指出漂掉了**——他要的是「推測/詢問大腦走了哪幾步」，我卻翻譯成裝計時器，那是工程解法不是教學解法。已改寫成以「錯誤的形狀」與「問一句」為主，量測降級成事後佐證。**下個 session 不要再往量測方向走。**

**③ `BLOCKS.md`（26 塊區塊清單，系統骨架）**
系統的最小單位從「題目」換成「**區塊**」＝產出時要跑的運算。跟 codex 的 123 條知識點不同層。
⚠️ **最重要的分類：形式塊 vs 感知塊**——形式塊（élision/過去分詞/冠詞縮合）靠**提速**壓縮；感知塊（時態選擇/冠詞選擇/語氣選擇/形容詞位置/回指追蹤/連接詞）被自動化的是**視角本身**，**提速練習無效**，要靠在真實句子出現時反覆喚醒。初版沒分這兩類是設計錯誤。

**④ `ARCH_2026-08_ANKI.md` ＋ `ANKI_SETUP.md`（資料架構）**
Owen 決定不再讓 Claude 自建 Anki。分工：**Anki**＝Note庫＋卡片模板＋FSRS排程；**Claude**＝語言分析＋策略＋Knowledge Graph；**asbplayer**＝素材擷取。
稽核發現：`review.html`／`sentence_drill.html`／`answer_card.html` 是**三份逐行等價的 SRS 引擎**（587/571/594 行），加 quiz 單題 SRS 與 verb_sprint 格子歷史＝**五套排程系統**。
⚠️ **Knowledge Graph 已經存在**——`codex.js` 就是，`KnowledgeGraphNode` 直接填座標，不要另建。
⚠️ **課本內容也遷進 Anki**（Owen 拍板）。分界：**記憶與提取→Anki；考試形態訓練（quiz/填表格/動詞衝刺/寫作/聽力/閱讀/口說）→Claude 系統**。
**下一步**：Owen 要先在 Anki 建 24 欄 Note Type（步驟見 `ANKI_SETUP.md`），建好後拿第22課 15–20 則產第一批 TSV 跑通循環，**才**談遷移 1271 張與自動化。

**⑤ `codex.js` 新增 `5-9` 節／`5-9-1`「選時態的四個開關」**（123→124 條，既有座標未動）
WHEN／CAMERA／REALITY／RELATION 四問，是時態與語氣選擇的上層決策程序。A2 階段只需跑②③兩問。內含對「長動作用 imparfait」這個常見誤解的明確反駁。

**實測診斷（第一次用新方法）**：Owen 寫四句，發現 ①`J'ai mangé`／`Je suis allé` 五塊全對但標「想」→ COMPRESS；②`Je besoin de ça` **只缺一塊**（besoin 是名詞要 avoir 扛，他的 `de ça` 是對的）；③`J'ai allé` **秒答但錯**——**同一結構想過就對、秒答就錯，代表 être/avoir 是算出來的不是反射，速度一上來就被預設的 `j'ai` 蓋掉**。
⚠️ 又踩一坑：第一版壓縮練習排成**完美交錯**（avoir/être/avoir/être），Owen 三四題就抓到節奏照輪——**練到的變成模式辨識不是提取**。已寫進 `FRENCH_OS.md` 設計鐵律：**亂序、連段長度不規則**。改成亂序後他回報瓶頸移動到**分詞提取**（單字要想）。

**Owen 的 GPT 資料夾（`~/Desktop/ＧＰＴ/`，11 張系統圖）**：已**逐張核對完畢，內容零錯誤**（連 `Il aura oublié.` 推測過去、conditionnel 新聞未證實用法、passé antérieur 搭配都正確）。定位＝**感知塊的鏡頭校正表，不是看懂就收起來的參考書**。現在該用的只有 3 張（3/9 PC vs imparfait、1/9＋9/9 四問），其餘 6 張講的是還沒學的時態，等課本教到再拿出來。

---

### 08-05：第22課（A2・Quel temps fait-il？・la place de l'adjectif）完整入庫

Owen 貼了第22課逐字稿＋10張課本截圖（`~/Desktop/0804/`：Parlons météo 課文頁、La météo 詞彙方框、À la mer／à la campagne／à la montagne 三組地點詞、各地天氣方言文化框、La place de l'adjectif 完整文法頁含手寫答案、Pourquoi on achète des souvenirs 課文頁、y/en 練習含手寫答案）。

**開場先查既有覆蓋**，決定了本次做法：
- `gram_rules.js` 已有 `adjectifs-accord` 點（含 `des→de`），`questions.js` 已有 10 題 `adjective-position` → **升級既有點、不新增**，只補本課真正新增的規則。
- `map.html` 已有 `meteo` 佔位 tile（原 lesson:8）→ **解鎖更新即可**（跟第15/16課的做法一致，不新建格子）。
- 天氣是全新領域（`grep météo questions.js` = 0）→ 新 topic `vocab-meteo`。

**九項連動全部補齊**：
1. `french_notes.html`：新增 `lesson-22`，**12 個 unit**（天氣詞彙＋三組容易混的字／海邊-鄉間-山區三組地點詞／**形容詞位置主文法**／propre 位置改變意思／課文①②各自逐句全文中譯／平行閱讀／文化／y-en 複習練習／老師課堂法語／發音警報／糾錯摘要）。9 表格全包 `compare-table`、84 個 `class="m"`。
2. `questions.js`：新增 **24 題**（`vocab-meteo` 新topic 14題、`adjective-position` 既有topic 10題），BANK 826→**850**；`quiz.html`／`dashboard.html` 兩處 TOPIC_LABELS 同步。
3. `chunks.js`：新增 **66 張**，1205→**1271**（腳本自動跳過 5 張已存在的：la météo／la plage／le champ／la ferme／le lac）。
4. `sentences.js`：S_L22_1~10，166→**176**。
5. `table_drill.html`：新增 `place-adjectif`（type:adj, 6 row，直接用課本 Entraînement 第3題），45→**46**。
6. `gram_rules.js`：`adjectifs-accord` 補 lesson 22，規則 5→**9 條**，新增：國籍/顏色/形狀一律在後、兩形容詞同現的排序（短的在前名詞夾中間）、強調時提前、**propre 位置改變意思**。
7. `map.html`：`CURRENT_LESSON` 21→22；`meteo` tile 從 lesson:8 更新成 lesson:22 並改寫 detail（補三組易混淆對比、地點詞、慣用語、各地方言）。
8. `codex.js`：**未動**——形容詞位置的座標本來就存在且內容涵蓋，本課沒有新概念需要新座標。
9. `reading.html`：新增 `a23`「Un été à Kenting」（A2），22→**23 篇**，同時是 lesson-22 的「平行閱讀」。

**📖 兩篇課文的處理**：`Parlons météo`（caminteresse.fr）與 `Pourquoi on achète des souvenirs de vacances`（leparisien.fr）都是有版權的媒體文章，照 08-02 確立的原則——**逐句全文中譯（可順著讀完）＋關鍵句短引用附文法註解＋完整詞彙表**，法文原文不進公開站。另附一篇自己寫的同級完整短文當「平行閱讀」，同一篇也放進 `reading.html`。第二篇課文特別有價值：**它幾乎每個名詞都帶形容詞，等於本課文法的答案卷**（une jolie paire、d'excellentes épices、un mug londonien、la marinière bretonne…），筆記裡整理成獨立區塊。

**⚠️ 本課文法的關鍵洞察（寫進筆記了）**：`des→de` 這條規則 Owen 已經是**第三次**遇到——第一次是否定（pas de）、第二次是量詞（beaucoup de）、這次是形容詞插到名詞前。三個情境背後是同一件事（des 的完整形式被擠掉），筆記建議把三個一起複習，不要當三條新規則背。這也呼應 `PLAN_2026-08.md` A-3 標記的「冠詞是中文母語者永久弱點」。

**驗證**：node 驗 8 個檔全綠（含 choose 題正解須在 opts 裡）。preview 實測（隔離 ROOM）：新表格 6 格正確載入、**故意把 `d'excellentes` 寫成 `des excellentes` 被判錯**（正中本課核心規則）；reading a23 故意 2對1錯評分與解說都正確；quiz `?lesson=22` 的 24 題全部通過 `getPool()`、兩個 topic 標籤都對得上、三選項題渲染與評分正確。測完清掉 a23 紀錄與該題 SRS key → ROOM 復原 → `preview_stop`。

**⚠️ 平行 session 的 port 衝突（第二次遇到，已成常態）**：Owen 同時開了 6 個背景 session，7788 長期被佔用。**標準解法**：在主 worktree 的 `.claude/launch.json` 暫時加一筆 `french-app-alt`（port 7799），測完還原（各 worktree 有自己的副本，不會影響其他 session）。副作用仍然是好的：**換 port＝換 origin＝沒有舊快取**，兩次都直接拿到最新的 BANK。

---

### 08-04：S1 收割既有內容（易混淆詞對訓練器＋寫作題型升級＋課堂法語入卡）

執行 `PLAN_2026-08.md` 的 **S1**（A-1／A-6／A-8）。這個 session 的特點是**純收割、零新素材**——所有內容都來自 21 課筆記既有的對比框與 🎙 區塊。

**A-1 易混淆詞對訓練器（本次主軸）**
- **動機**：抽出 21 課全部「本課糾錯摘要」統計行後，跨課出現頻率**最高**的錯誤類型就是易混淆詞對，幾乎每課 2–3 對；但 quiz 的 topic 按知識領域切，**沒有任何工具把兩個會混的東西並排逼選**，這些對照只以散文躺在 note-box 裡。
- **收割方法**：寫 node 腳本掃 `french_notes.html`，抓所有 `note-box` 裡標題含 vs／≠／混／差別／分工 且有 ≥2 個 `phrase-list` 項目的區塊 → 撈到 12 組完整解說；再針對糾錯摘要點名、但不在 note-box 格式裡的（散在表格備注欄）逐一補撈。
- **成果**：`questions.js` 新增 **41 題**、新 topic `paires-confusables`，BANK 785→**826**。橫跨第 4/6/9/14/18/19/20/21 共 8 個課次。題型全用 `choose`，每題必有 `aNote` 對照解說。`quiz.html`／`dashboard.html` 兩處 TOPIC_LABELS 同步。
- 收錄的代表性詞對：chez/à la、à/en（交通）、librairie/bibliothèque（假朋友）、bon→meilleur・mauvais→pire、des 兩身分、bronze/bronzer、location（假朋友）、connaître/connaissance、tomber amoureux/coup de foudre、se séparer/divorcer、déménager/s'installer、encore/toujours、ne...plus/ne...jamais、chercher/trouver du travail、visiter/voir、amateur/amateur de、faire du vélo/une randonnée、paddle/stand-up paddle、entraîner/entraîneur、se souvenir de/se rappeler、imparfait/PC、souvenir 名詞vs動詞、dire/parler/raconter、voir/regarder、entendre/écouter、goût-saveur/goûter、venir/revenir、partir/repartir、odorat/odeur、marquer、enchanté 兩義、jeunesse 年齡帶、heureux/joyeux、ça sent mauvais。

**A-6 `writing_tasks.js` 補課＋題型升級**
- 補上第 18–21 課共 8 題（原本停在第17課、落後4課），34→**42 題**。
- **題型升級（第18課起）**：除了原本的「指定材料」再加**「指定篇章結構」**——`frame` 欄以 ⭐ 開頭者強制要求用時序／轉折／因果連接詞把句子串成段落（如 d'abord→ensuite→enfin、imparfait→mais+PC→donc+現在式、論證的先結論→兩個理由→讓步→建議）。目前 7 題有 ⭐。
- 理由：舊題型只到「寫幾個正確的句子」（項目層），B1→B2 考的是把想法串起來（篇章層）。這是 A-5 的前哨，完整的第二層工具留給 S5。
- W20a 直接對應課本 Production écrite → DELF 的題型（描述一段回憶，50字以上）。

**A-8 老師課堂法語入卡**
- 掃出 8 課有 🎙 區塊、共 63 句，其中 **32 句還沒進 `chunks.js`**（只有第20、21課的部分因當時順手加了才有）。
- 腳本一次完成抽取→過濾已存在→生成→注入→parse 驗證，1173→**1205 張**。課次分布 15:7／17:4／18:7／19:3／20:5／21:6。
- 每張 note 統一加 `🎙老師課堂口語` 標記，方便日後篩選這一類。
- 價值：B1–B2 開始考語域（registre）與口語省略，這批是老師真實輸出的口語語料，補課本教不到的部分。

**驗證**：node 驗三項全綠（含**每題正解都在 opts 裡**、每題有實質 aNote、卡片無重複 id）。preview 實測（隔離 ROOM）：新 topic 41 題全部通過 `getPool()`、標籤正確顯示、**三選項 choose 題渲染正確**（題目＋3按鈕＋提示＋發音鍵）、故意答錯會顯示 ✗ 並揭曉正解與解說。測完清掉該題 SRS key 與錯題本那筆 → ROOM 復原 → `preview_stop`。

**⚠️ 平行 session 的 port 衝突（本次新遇到）**：Owen 同時開了 6 個背景 session，其中一個佔用了 7788，`preview_start` 直接失敗。解法：**各 worktree 有自己的 `.claude/launch.json` 副本**，所以在主 worktree 暫時加一筆 `french-app-alt`（port 7799）就能並存（`python3 -m http.server` 的 port 是位置參數、吃不到 PORT 環境變數，所以官方建議的 `autoPort` 對這個設定無效）。測完已把 launch.json 還原。**副作用發現：換 port＝換 origin＝沒有舊快取**，這次 BANK 直接就是最新的 826，反而避開了 C-1 那個 `.js` 快取問題。

**⚠️ 兩個重複踩到的坑（下次直接照做）**：
1. **preview 的 `.js` 快取又出現**：quiz 頁面載入的 `BANK` still 758，但 `fetch('/questions.js',{cache:'no-store'})` 抓到的檔案確實有 27 題第21課。**判斷方法**：比對「頁面已載入的陣列長度」vs「fetch 到的檔案內容」，兩者不一致就是快取不是資料問題。**驗證 UI 的做法**：把 fetch 到的新題目 `BANK.push()` 進頁面已載入的陣列（`const` 不能重新宣告，eval 整檔會是偽陽性）。
2. **生成腳本的逗號坑**（08-02 踩過）：這次腳本改成「不補前導逗號」＋**寫入後立刻 eval 實際 parse**，順利避開。之後寫這類注入腳本一律要有寫入後的 parse 驗證，只數 id 不夠。

---

### 08-04：發音顆粒度三層上線（PLAN S7／A-9）——新增共用模組 `tts_reader.js`

Owen 08-03 的需求原話：「如果是整段文章，可以的話發音除了整段唸完，還有只念單句甚至單字的功能」。最大缺口是 **`reading.html` 完全沒有 TTS**——22 篇閱讀短文一個字都唸不出來，而閱讀是今日處方第⑬步。

**做法：寫成共用模組，不是第 14 份複製貼上的 TTS。** 全站已有 13 頁各自實作 `SpeechSynthesisUtterance`，這次新增 `tts_reader.js` 一支，只掛在兩個地方（reading.html、french_notes.html 第21課平行閱讀），**其餘 12 頁一個字都沒動**（重構既有頁面要先問 Owen，見 PLAN 實作要點 3）。

**三層的實際長相（reading.html）**：文章卡上方一條 sticky 控制列（手機優先，按鈕都 40px 高、在文字上方不擋字）：
- **整段**：`▶ 朗讀全文` → 逐句 speak，句與句之間 420ms 停頓、**換段落 800ms**，同時高亮當前句並在捲出畫面時自動捲回來。再按一次是 `⏸ 暫停`，變成 `▶ 續播（第 N 句）`。另有 `⏹ 停止`、`🐢 語速`（0.6/0.75/0.9/1.0 循環，存 `ttsr_rate`）。
- **單句**：預設「🔊 點句」模式，點段落裡任一句就只唸那句、唸完停住不會續唸下一句。
- **單字**：切「🔤 點字」模式，點任一個法文單字唸該字。
- 兩種點讀用**模式切換**而非「點字=長按」之類的隱藏手勢——手機上手指點不準，兩者疊在同一個 tap 會互搶。

**四個實作上的判斷（之後改這支模組前先看這裡）**：
1. **暫停用 `cancel()`＋記住句號，不用 `speechSynthesis.pause()`**——`pause()/resume()` 在 iOS Safari 不可靠。代價是續播會**從那一句的開頭重唸**（不是從中間接），對語言學習反而是好事，已在按鈕文字寫明第幾句。
2. **切字不能用空白切**：正則是「字母序列＋可含內部撇號/連字號」，所以 `l'odeur`／`aujourd'hui`／`peut-être`／`est-ce` 都是**一個 token**（唸起來才對），標點與 emoji 不會被當字。22 篇實測切出 182 句、1435 個可點單字，還原純文字跟原文逐字比對零遺漏。
3. **斷句有縮寫白名單**：`M.`／`Mme`／`Dr.`／`etc.` 與「數字.」後面不切，避免 `M. Dupont` 被切成兩句。
4. **語速偏好用 `ttsr_rate` 不用 `clb7_` 前綴**——`sync_supabase.js` 是**看前綴**決定要不要上傳（`k.indexOf('clb7_')===0`），一個 UI 偏好沒必要進雲端負載。

**french_notes.html 只加整段層，刻意不加單字層（重要，之後不要「順手補上」）**：單字層必須把句子 `innerHTML` 改寫成一個個 span，但本頁的選字標記（`clb7_notes_marks`）重整頁面時是用 `TreeWalker` 純文字比對 + `Range.extractContents()` 重新套用標記——範圍一旦切到 span 中間就會把 DOM 攪爛。本頁單句層本來就有（每句後面的 🔊），所以只補真正缺的整段連讀。另外**包了一層 `ttsSpeak()`**：本頁原本的單句喇叭只做 `speechSynthesis.cancel()`，模組不會知道自己被打斷、會誤以為那句唸完而自動接下一句 → 包一層先 `TtsReader.stopAll()`，兩邊不會搶著唸（已實測）。
> 順帶一提：兩篇「課文摘要」（第20課 Saveurs de Corse、第21課 Une vue de rêve）**沒有掛**，因為那兩塊是純中文逐句翻譯、沒有法文可以連讀。第21課平行閱讀是筆記裡唯一真正「整篇法文可順著讀」的段落。

**驗證**（隔離 ROOM 全程遵守）：
- **資料層**：`verify_tts.js`（scratchpad）把模組在 Node 裡 stub 起來跑——斷句 6 個 case（含縮寫、無句點結尾）、切字 5 個 case（élision／連字號／數字）、22 篇文章逐篇比對純文字無遺漏＋句子編號連續、頁面接線（兩頁都有載入與呼叫、french_notes 的 `wordLayer:false` 還在）、模組不寫任何 `clb7_*` key、語音篩選三段優先序都在、ROOM 是正式值。全綠。
- **瀏覽器層**（375×812 手機視窗；先 `fetch('/sync_supabase.js',{cache:'no-store'})` **確認 preview 供應的就是 TEST ROOM** 才開始測）：
  - a22 整段朗讀**14 句一路唸到底**（記錄每一次 `speak()` 的文字，順序完全正確、用的是 Amélie、rate 0.75）；
  - 暫停→**沒有任何新 utterance**、高亮停在那一句、按鈕顯示「續播（第 4 句）」；續播→**從第 4 句重新唸**再接著往下（log 裡那句出現兩次，符合設計）；
  - 點第 8 句 → 只唸那一句、唸完不續唸下一句、高亮清掉；
  - 切「點字」→ 點 `L'odeur` → 唸出的正是 `L'odeur`（élision 沒被拆開）；
  - `⏹ 停止` 與朗讀中按「← Liste」→ 都立刻靜音、無殘留 utterance（**不疊音**）；切到另一篇文章時模式重置回「點句」；
  - french_notes 第21課平行閱讀：整段連讀高亮跑在 `.fr` 上、**只唸法文不唸中文翻譯**、15 個單句 🔊 全數保留、DOM 沒有被插入任何 `.ttsr-w`；朗讀中按某句 🔊 → 整段朗讀正確中止、只唸那一句；
  - console 無錯誤。
- **收尾**：清掉測試留下的 `ttsr_rate` → 確認今天沒有任何 `clb7_reading`／`clb7_tracker`／`clb7_wrong_log`／`clb7_notes_marks` 測試寫入（全程沒交卷、沒標記）→ ROOM 改回 `owen-clb7-k9f3a72q` → **下一步立刻 `preview_stop`** → grep 確認無 `TEST-DO-NOT-USE` 殘留、`sync_supabase.js` diff 為零。

**⚠️ 一個 preview 自動化的坑（不是產品 bug，但會浪費時間）**：`scrollIntoView()` 之後**同一個 JS 呼叫裡**讀 `getBoundingClientRect()` 拿到的可能是捲動前的座標，照著點會點空。要嘛分兩次呼叫（先捲、再量），要嘛量完立刻點、中間不要插入 screenshot。這次在 french_notes 上就因此連兩次點空，誤以為按鈕壞了——實際上 `elementFromPoint` 顯示按鈕就在那裡，直接呼叫 `btn.onclick()` 一次就動。

**還沒做、留給之後的**：其餘 12 個各自實作 TTS 的頁面（review/quiz/table_drill/verb_sprint/…）仍是各自一份程式碼，**要不要收攏到這支模組要先問 Owen**（一次動 12 個檔案風險不低，且那些頁面都是單句層、現況沒壞）。

#### 08-25（續5）：📽 待看清單上線——老師推薦的電影收進 listening.html 影集精讀卡

Owen 丟了新一課的逐字稿後只交代一句：「**請把老師介紹的電影放入待看清單**」（les chiens／les siens 那部）。
**repo 裡原本沒有任何待看清單**——影集精讀卡只有一個自由輸入框＋從歷史記錄長出來的 datalist，
老師推薦的片沒地方放，講完就散在逐字稿裡。所以這次是**把清單這個東西做出來**，不是往現成清單補一列。

**做法**（`listening.html` 🎬影集精讀 Shadowing 卡片內，輸入框正上方）：
- 靜態 `WATCHLIST` 陣列，每部片存 `title / year / match / why / tip`。
  `why` 寫的是**老師當下為什麼提它**，不是劇情簡介——之後回頭看才知道這部片在學什麼。
- **「▸ 選這部」按鈕直接把片名填進 `#shEpisode` 並 focus**，接上既有的四遍流程，不另開系統。
- **「✓ 精讀過」不新增 localStorage key**：拿精讀記錄的 `episode` 字串比對 `match` 推出來。
  刻意不做 `clb7_watchlist`——多一個 key 就多一份同步風險，而這個狀態本來就能從既有資料算。

**收錄兩部（都是老師這堂課講的）**：
| 片 | 為什麼收 |
|---|---|
| **Bienvenue chez les Ch'tis**（2008） | 老師講 `le mien／le tien／le sien` 時放的片段：ch'ti 口音 s→ch，「parti avec **les siens**」聽起來變成 **les chiens**（狗），主角才會一臉「家具怎麼被狗搬走」。**這是本課文法點的活教材** |
| **Intouchables**（2011） | 老師同一段順口提到、Owen 說看過 → 標了「劇情已知，可以直接從②整理句型開始」 |

**驗證**（照測試鐵律：先 grep → ROOM 切 TEST → 測 → 清 → 還原 → `preview_stop` → grep 確認無殘留）：
清單兩列正確渲染；點「▸ 選這部」→ 片名填入輸入框、focus 正確、toast 正確；
用**真實儲存按鈕**存一筆 Ch'tis ①理解 → 該列即時翻成「✓ 精讀過」、按鈕消失、進度提示正確接到「建議下次②整理句型（同一集）」；
console 零錯誤；測試那筆已從 `clb7_listening` 清除（保留 7 月既有的 5 筆本機舊資料）。

**⚠️ 順帶記一筆**：這份逐字稿的內容（性格優缺點／pronoms possessifs／**futur simple 完整變位**／
innovation 詞彙／`le même que`·`autant de` 複習）**還沒入庫**——性格詞與 `le même` 第26課已經有，
但 **pronoms possessifs（le mien 系列）與 futur simple 是全新文法點**，要走九項連動。
Owen 這次只叫我做待看清單，所以我只做了這件事；下次做筆記時這課是待辦。

### 08-26：第27課（A2・les pronoms possessifs ＋ le futur simple）完整入庫——九項連動 ＋ 補上第十一項

Owen 丟了整份逐字稿，交代兩件事：先把老師介紹的電影放進待看清單（見上一段），然後「**入庫喔**」。

**這一課的內容座標**：課本 Unité 4 尾巴（性格詞彙完整清單＋動物比喻）＋ **Unité 5「Vers le futur !」整個開頭**。
兩個主文法都是新的——**所有格代名詞**（le mien／le tien／le sien，課文出處是「大頭照怎麼挑」那篇）
與 **futur simple**（課文出處是三個小孩想像 2050 年）。詞彙主軸是科技與創新。
⚠️ 動手前先跑了 `tools/extract_textbook.py` 的快取（`assets/.textbook_cache.txt`），
**課本 p.63–73 的原文、Fonctionnement 表、Entraînement 題目與答案全部對照過**，不是只靠逐字稿。

**九項連動（全部做完）**
| # | 檔案 | 這次做了什麼 |
|---|---|---|
| 1 | `french_notes.html` | `lesson-27`：**14 個 unit／17 個表格／293 個 🔊**。含性格優缺點完整表、動物比喻（⚠️ **tête de cochon 是魁北克說法、歐洲用 tête de mule**——我們考加拿大，這條特別標了）、兩篇課文逐句、兩個主文法單元（含課本 Entraînement 全部答案）、科技詞彙四張表、講未來的時間標記、老師課堂法語、發音警報、糾錯摘要、平行閱讀 |
| 2 | `questions.js` | **41 題**（possessifs 11／futur 12／innovation 8／réseaux 4／caractère 6）；`quiz.html` 與 `dashboard.html` 的 `TOPIC_LABELS` 各補 4 個新 topic（照各自風格：中文說明式 vs 法文短名） |
| 3 | `chunks.js` | `node tools/extract_chunks.js 27 --write` → **118 張卡**（總庫 1717） |
| 4 | `sentences.js` | 人工精選 `S_L27_1~10` |
| 5 | `table_drill.html` | 兩個新表：所有格代名詞（10 列）、futur simple（12 列，含兩個只有 il 的無人稱動詞） |
| 6 | `gram_rules.js` | 兩個新文法點 `pronoms-possessifs`／`futur-simple`，都 `unlocked:true` ＋ 完整 `why` |
| 7 | `codex.js` | ⚠️ **沒有新增座標也沒有重編**——`1-5-3`（所有格代名詞）與 `5-5-2`（futur simple）本來就在，只是標 B1；這次改成 **A2** 並掛上 `topics`／`gram`，順便把老師強調的點補進 `pts`。改完 quiz 答題區的 📍 定位就會指到 1-5-3／5-5-2 |
| 8 | `map.html` | `CURRENT_LESSON` 26→**27**；新增 4 個 tile：Pronoms possessifs／Le futur simple／Sciences & techniques／Photo de profil（detail 一律法文長文，照既有慣例） |
| 9 | `reading.html` | 新增 `a28`《Ma vie à Taipei en 2050》——**我自己寫的同級原創短文**（futur simple 從頭到尾、所有格代名詞出現五次），三題理解測驗；同一篇也放進筆記當「平行閱讀」 |

**第十一項（這次才發現的缺口，已補並寫進上面的常駐清單）**：
`verb_sprint.html` 的 `MODES` 與 `dashboard.html` 的 `SPRINT_MODES` 裡，Futur simple 那一列的 `gram:` 掛的是
**B1 佔位點 `futur`**（`unlocked:false`、topics 永遠空）——所以就算課程教到未來式，動詞衝刺也不會長出這個模式。
兩處都改成 `gram:'futur-simple'`。⚠️ 資料本來就齊：`verbs_full.js` 每個動詞都有 `fut` 詞幹，
`drillForms(v,'futur-simple')` 對 CORE9 九個動詞都推得出正確六格（serai／aurai／irai／ferai／prendrai…）。
**沒做第十項（`scenes.js` 情境劇本）**：這一課沒有成對台詞的對話，只有課文與練習題，硬做會變成假場景。

**驗證**（資料層 33 條 ＋ 瀏覽器層，全程隔離 ROOM）
- **資料層**：`verify_l27.js`（scratchpad）**33 條全過**——含「choose 題正解都在 opts 裡」「第27課題目不會被 `getPool()` 的超前進度濾掉」「codex 座標無重複（沒有重編）」「map 的 gram tile id 對得上 gram_rules 的文法點」。
- **瀏覽器層**（先 `fetch(cache:'no-store')` 確認 preview 供應的是 TEST ROOM 才開始）：
  筆記 lesson-27 渲染 14 unit／17 表格全包 compare-table／293 個 🔊／導覽列有第27課；
  `quiz.html?lesson=27` 池子 41 題全進得來，答對一題（honnête）✓、故意答錯一題 → **錯題本正確收到（topic: vocab-reseaux）**、解說與 📖 複習連結都對；
  `codexLocate` 對 pronoms-possessifs／futur-simple 正確回 **1-5-3／5-5-2**；
  table_drill 兩個新表各故意錯一格 → **11 格中 10 對、9 格中 8 對**，錯的正是刻意寫錯的那格（viendra／le sien）；
  reading a28 兩對一錯 → 紀錄寫成 `{id:'a28', correct:2, total:3}`；
  `verb_sprint.html?mode=futur` 出現第四個模式且六格形式正確；map 顯示「第 27 課」與四個新 tile；
  gram_trainer 的 futur-simple 規則卡（含 why）正常渲染；dashboard 零 console error、**沒有印出任何 raw topic id**。
- **收尾**：清掉測試寫入（兩個 SRS key、錯題本那筆、a28 閱讀紀錄）→ ROOM 改回正式值 → **立刻 `preview_stop`** →
  grep 確認無 `TEST-DO-NOT-USE` 殘留 → **另外讀了一次正式雲端**：410 個 key、`updated_at` 還停在 08-25，**沒有被這次測試碰到**。

**已知的既有小問題（不是這次造成的，沒動）**：`codex.js` 的 topic `imparfait` 同時掛在節 `5-3` 與 `5-9`，
`codexLocate` 會回傳先找到的那個。要不要收斂等 Owen 決定。

---

### 08-26（續）：Owen 拍板兩條原則，兩條都落地了

> 他的原話：「**逐字稿要對應課本，不要瞎做。當然要符合法文文法，不是只有我們對話或課本說得算。
> 當然課本可以當 guideline 沒問題，但也是有可能有錯誤。**」
> 「**規則多，邏輯好可以解決；不規則真的比較讓人頭大。要直接成為反應，在沒有法文環境下就更不容易做到了。**」

#### ① 來源三層優先序 → 寫進 CLAUDE.md 內容鐵律第1條（他同意）

**標準法文正確性 ＞ 課本 ＞ 逐字稿**。逐字稿是語音辨識產物、課本是商業教材，兩者都是**線索不是判準**。
衝突時以標準法文寫，但**要把課本／老師的說法標出來，不要沉默改掉**——Owen 手上就是那本課本。

**當場抓到並修掉的實例（第27課）**：老師課堂說 `notre` 跟 `le nôtre`「發音完全一樣」，
第一版筆記就跟著寫成「口說幾乎聽不出來，所以是用眼睛的規則」。
標準法文其實是 **notre／votre 開口 [ɔ] vs nôtre／vôtre 閉口 [o]**，帽子就是在標這個音；
老師說的「一樣」是**口語把兩個音中和掉**的真實現象，不是標準。三處一起改：
筆記的 note-box 與發音警報表、`questions.js` 那題的選項與 aNote、`gram_rules.js` 的 `why`。
memory 也開了一則 `feedback_source_hierarchy`。

#### ② 不規則要變反射 → 先擴充 verb_sprint（他選的方向）

**查到的缺口**：`verb_sprint.html` 的 `CORE9` 只有 être／avoir／faire／aller／devoir／pouvoir／vouloir／venir／prendre。
第27課教的不規則 futur 詞幹裡，**savoir（saur-）與 voir（verr-）從來不會出現在衝刺頁**——
等於「規則式那半有反射練習、不規則那半沒有」，剛好跟他的瓶頸相反。

- `verb_sprint.html` 的 `CORE9` 與 `dashboard.html` 的 `SPRINT_VERBS` **同步加入 savoir／voir**（9→11 個動詞，54→66 格）。
  ⚠️ **這兩份清單是複本，改一份一定要改另一份**（已各自加註解互指）。頁面副標「核心 9 動詞」也改成 11。
  cell key 是 `動詞_人稱` 且**每個時態各自一份**（`clb7_sprint_cells_fut`），所以加動詞不會動到既有資料。
- `verbs_full.js` 補三個動詞（22→25）：**devenir**（跟 venir 同型）＋ **falloir／pleuvoir 兩個無人稱動詞**。
  無人稱動詞用新欄位 `imperso:true`，`pres`／`subj` 只填 il 那一格、其餘 `null`；
  推導引擎算完之後把六格遮成只剩 il（`conjugate()` 末尾），`display()` 把 null 印成「—」，
  `participePresent` 改讀 `ppr`（falloir 沒有現在分詞），`stems()` 的訊息也防了 null。
  ⚠️ **重點是絕對不能讓頁面印出 je faux／nous pleuvons 這種不存在的形式**——那正是 Owen 這則回饋在防的事。
  ⚠️ falloir／pleuvoir **不進衝刺頁**（那是六人稱的格子），只進 `verb_forms.html` 當查詢用，分在新的「無人稱」群組。

**驗證**（一樣隔離 ROOM 全程）：`verb_forms.html?v=falloir` 只顯示 il faut／il a fallu／il faudra…其餘「—」、
現在分詞與命令式都正確顯示「沒有」；pleuvoir 九個時態的 il 形全對（il pleut／il a plu／il pleuvra／qu'il pleuve…）；
`verb_sprint.html?mode=futur` 動詞清單 11 個、savoir=saurai…／voir=verrai…，**開場第一題就是 savoir · je ___**；
真實按鍵答對一題計分正確；25 個動詞 × 13 時態的資料層回歸掃描 **0 問題**；console 零錯誤。
收尾清掉測試寫入（`clb7_sprint_cells_fut`／`clb7_sprint_sessions_fut`，這兩個 key 之前不存在）→ ROOM 還原 → `preview_stop` → grep 無殘留。

⚠️ **這條之後還沒做完的**：真正的「字根速射」壓縮練習（只打不規則字根、跨時態混打）還沒做，
Owen 選的是「先擴充 verb_sprint」，速射頁留給之後。另外 `dashboard.html` 的 `sprintReflexCount()`
只讀 `clb7_sprint_cells`（présent 那份），所以儀表板的反射格數不含其他時態——既有行為，沒動。


---

### 08-28：策略補上「升級層」＋三座島（`AC3 工作`／`AC2 家庭`／`AC1 自我介紹`）

#### ① Owen 一句話問出策略的洞

> 「**不過你之後會需要把這些東西再轉換成 B2 等級的口說嗎？等到我學到、且要考試的時候？**」

查了一遍 `STRATEGY_PRODUCTION_9M.md`：**四個階段裡沒有任何地方寫「升級」**。
Phase 3 第一行還是「⛔ 不學新東西」。所以照原本的文件走，島會永遠停在 A2。
→ 補成**第六條原則**「島是往上長的，不是重蓋的」。四個要點：

1. **⛔ 不能等到 Phase 2/3 一次升級**——那是在剩不到三個月時丟內容炸彈，
   字寫出來但嘴巴沒跑過。七個門檻裡有一條是「累積產出 ≥ 10 次」，沒講過 10 次的 B2 版
   派不上用場，**還會擠掉已經練熟的 A2 版**。
2. **B2 不是「換難字」，是多做幾個動作**：讓步（`Certes… mais`／`Bien que`+subjonctif）、
   假設（`Si`+imparfait→conditionnel）、權衡兩個立場、抽象化。
   → **升級＝往島上加房間，不是重蓋島。** AC8 那四個理由一個都不丟。
3. ⭐ **施工圖已經在檔案裡了**：`follow_ups` 標 `cover:'gap'` 的那幾題，**答出來剛好就是 B2 要的段落**——
   「加拿大很冷吧」「移民很難你準備好了嗎」＝讓步段；「如果走不成你會怎麼做」＝假設段。
   **升級一座島 ＝ 把它的 gap 追問寫成答案接在後面**，不用另外想題目。
   ⚠️ 這回頭修正了 08-27 那句「追問是排序不是補丁」——**排序給還沒蓋的島，施工圖給蓋好的島**，兩個用途並存。
4. **時機跟課程走，不排在考前**：每學到一個 B1/B2 結構就回頭挑 2–3 座島種進去。
   這是原則 2「寫先於說」的直接延伸——島的寫版就是新結構裝穩的地方。
   ⚠️ **寫版升句法複雜度，說版只加內容深度**（Levelt：口說 Monitor 沒時間）。

**動到的檔**：`STRATEGY_PRODUCTION_9M.md`（標題五條→六條、新增原則 6、Phase 0/1/2/3 四張表各補一列、
缺口清單補一條）、`SPEAKING_METHOD.md`（島生命週期六階段後補交叉引用）。

**⚠️ 順手記下的系統坑**（已進缺口清單，標「升級層開工前(Phase 1)要修」）：
`acActiveVersion()`（`answer_cards.js` 檔尾）**只回傳 `versions` 最後一版** →
之後加了 B2 版，練習頁就**再也練不到 A2 短版**。但依原則 6，短版是口說要保留的資產。

#### ② 第二座島 `AC3 工作`（17 秒 → 174 字 / 約 80 秒）

Owen 口述四塊：為什麼當牙醫／我的一天／那個年輕病人／到加拿大會怎樣。

**⚠️ 初稿寫太長被退了兩次，這是這次最重要的教訓**：
第一版 466 字（≈ 3 分鐘），砍成 280 字（129 秒）還是被退：

> 「**我覺得我說的中文內容都可以留下來，但你寫要抓重點。簡明扼要，情緒單字文法都到位，
> 不饒口且加分，這樣的內容才有意義。**」／「**280字聽起來真的很長，你沒辦法再縮短嗎？**」

→ 最終 **174 字 / 80 秒**，只留四個「加分」的點：
- ⭐ **「在台灣是分數在決定，我不是因為熱情選的」**——誠實，而且考官記得住
- ⭐ **同學念完牙醫去紐約當攝影師**——別人沒有的細節
- ⭐ **「你隨時都可以停。最重要的不是趕快做完，是讓你想繼續。」**——情緒
- **加拿大要重考執照**——考官必問

⭐ **並且確立一個新慣例：`source_zh` 欄位**。Owen：「我說的留下來是指你留在檔案裡。」
→ 卡片新增 `source_zh`，**逐字保留他的中文口述全文（1062 字）**。
用途有二：①升級 B1/B2 時的素材庫——法文版刻意砍掉的東西全在裡面
②他自己的話就是這張卡的真相來源（memory `feedback_personal_content_authenticity`）。
註解裡標明了砍掉哪些、以及各自是哪一層的升級材料（治療項目清單／「沒幫助我會拒絕」／
「分段、隨時嘉許」的工作哲學／「與其這樣不如一開始就想好」）。

**⭐ 島與島的橋**：第②段結尾「所以我覺得小孩應該早一點探索自己的理想」直接接回 AC8 的教育論點。
末段補上 AC8 的執業追問後，**AC8 那題 `cover` 從 `gap` 改成 `part`**。

**用上的近期結構**：`ce sont les notes qui décident`／`c'est aussi pour ça que`／`Ce que j'aime…, c'est`
（26課強調句）、`si je veux exercer, je devrai`（25課 si）、`devrai／sera／ferai`（27課 futur simple）、
`y arriver`（21課 y）、`avait`（imparfait）。

**⚠️ 兩個要 Owen 確認的翻譯決定**（已寫進檔案註解）：
1. **末段用了 `Si` + présent → futur simple**。25課筆記把 si 句的 A2 範圍框在「現在式＋現在式／命令式」，
   並註明「結果那半用未來式是 B1 的第一式」。si 那半仍是現在式（合規），
   結果用 futur 是**標準法文的第一條件式**，而 futur simple 正是 27 課剛學的——**刻意往上一步，不是筆誤**。
2. 「我的目標是**讓你願意接受這個治療**」原句要 subjonctif（`je veux que vous acceptiez`，B1），
   這版改寫成 `c'est de vous donner envie de continuer`（不定式），語意微調成「**讓你想繼續**」。
   → **這句就是之後升級 B2 時換回 subjonctif 的位置。**

**新增 `follow_ups` 10 題**（cover：ok 2／part 4／gap 4），其中
「如果你沒考過加拿大的考試，你會怎麼做？」（假設段）與「你最不喜歡工作的哪個部分？」（讓步段）
就是這座島的 B2 施工圖。

#### ③ 第三座島 `AC2 家庭`（187 字 / 約 86 秒）

同一天口述、同一套流程，這次一稿就落在規格內（沒有再重寫）。四段：太太女兒是誰／
太太對移民的反應＋台灣的張力／週末／對女兒的期望。四個「加分」點：

- **Jolie 一歲半，「有興趣的東西會想盡辦法拿到」**——具體畫面，考官記得住
- **「每個禮拜天早上我們兩個去上瑜伽，Jolie 就在教室裡玩」**——別人沒有的細節
- ⭐ **「台灣很舒適、到處便利商店，但房子越來越貴」**——**讓步的雛形**，
  這是 B2 升級最天然的接口（之後換成 `Certes, la vie est confortable… mais` / `Bien que`+subjonctif）
- ⭐ **「她不一定要當工程師或醫生」**——**第三座橋**，接回 AC8／AC3 的「小孩該探索自己的理想」

v1 裡的名字（Lauryn／Jolie）接進 v2；v1 有但 v2 沒帶的父母（台語老師）與姊姊（新竹工程師），
正好變成一題真 gap 追問「你爸媽對你們要走怎麼想？」。
⚠️ 「希望她找到自己的路」若寫 `j'espère qu'elle trouve` 會踩 subjonctif（B1），
這版用 `le plus important, c'est de trouver son propre chemin` 繞開——**升級 B2 時換回來的位置**。

#### ⭐ 三座島之後，「橋」的效果已經可以驗證

AC8 原本 4 個 `cover:'gap'` 的追問，蓋完 AC3／AC2 之後**剩 1 個**：

| AC8 的追問 | 08-27 | 08-28 | 誰補的 |
|---|---|---|---|
| 那你太太怎麼想？ | `gap` | **`ok`** | AC2 ②段 |
| 你女兒幾歲？她也在學法文嗎？ | `gap` | **`part`** | AC2 ①段（年齡個性有了，「學法文」仍缺）|
| 你是牙醫，能在加拿大執業嗎？ | `gap` | **`part`** | AC3 末段 |
| 你去過加拿大嗎？ | `gap` | `gap` | 待 `AC7 旅行` |

**→ 這就是「島與島之間的橋」實際運作的樣子**，不是理論。

#### ⑤ 第四座島 `AC1 自我介紹`（202 字 / 約 94 秒）——這座是**樞紐**

⭐ **設計上跟其他座不同：它刻意不重述工作與家庭**（那是 AC3／AC2 的事），
只留「勾子」讓考官分岔過去。四段：我是什麼樣的人／住哪／學法文／法文的感覺＋生活。

四個「加分」點：
- **「我是分析型的人：分類、換角度、把事情連起來」**——自我定位，不是職業標籤
- **「但還沒到工程師那種程度！」**——⭐ 幽默。口說評分裡這是加分的，而且他原話就是「工程仔」
- ⭐ **「學習不只是花時間，最重要的是浸泡＋找到對的方法」**——他真正的信念，
  跟他同一天講的「把方法弄對比死命苦讀來得重要」是同一件事
- ⭐ **「講法文時好像會換一種眼光，模糊的時候反而看見更大的世界」**
  ——**全系統最特別的一句**，別人不可能有。⚠️ 中文原句更美（「從遠到近／時而模糊時而清楚／
  更細膩的美感」），A2 只保住骨架，**B2 版要把整段還原，這是升級的第一順位**。

**硬事實**：他 **2026 年 5 月開始學法文**。到 2027-06 考試剛好一年出頭——考官問起來這句很強。

✅ **兩題危險 gap 當天就解除了**：原本只寫「看很多法文電影／聽很多 podcast」，考官必追問是哪些。
Owen 補了具體名字，且**直接寫進島的正文**，不是放在追問裡——⭐ **具體名字讓整段更可信，
而且成本幾乎是零**（206 字，只多 3 字）：影集 **Extra French**、podcast **Coffee Break French**。
⚠️ repo 其他地方（shadowing 那一塊）寫作「Extra Français」，是同一部。

---

#### ④ Owen 對我這天一份「反思」的糾正（已存 memory）

我在報告裡把 **TEF Section A**（主動問考官 10–12 題）列為「最大風險」。他的回應：

> 「**不要急著 section A 啦！我們連要考 TCF/TEF 都不確定，先把島搞定再說。
> 島是我們昨天找出來的方法，我還是相信，把方法弄對比死命苦讀來得重要。
> 昨天才想出來的方法，不要今天就開始焦慮。**」

**他是對的，兩點都對**：①Section A 是 **TEF 專屬**題型，TCF 口說是三個 tâche、結構不同，
而**考哪個還沒決定**——等於替不存在的問題做規劃 ②島前一天才成形、總共兩座，
reps 一次都還沒跑，卻用「已經跑一陣子該檢討了」的框架去稽核它。
→ 存成 memory `feedback_method_first_no_premature_audit`。
⭐ 補一句當時該說的：**島剛好是唯一不用先決定考哪個試就能開始蓋的東西**
（TEF Section B／TCF Tâche 2／Tâche 3／口說四個出口全餵得到），所以「考試還沒選」
是繼續蓋島的理由，不是暫停的理由。

---

### 08-27：口說策略成形——六個家族地圖、九個月策略、每週研究例行、第一座語言島

這一段很長，因為 Owen 這天把**方法論**整個重打了一次。照時間順序記，後面的決定都建立在前面那則上。

#### ① 他先否決了我第一版的口說方法

我查了口說文獻（DeKeyser／Conti EPI／4-3-2），回推出「支架產出 → 4/3/2」的兩階段協定，寫成
`SPEAKING_METHOD.md`。他的回應：「**這算合理，但好像還是沒跳脫我們舊有方法太多。還是很吃背誦跟重複。
這應該只是其中一個學習法吧！**」

**他是對的，而且原因很具體：我只查了一個學派。** 技能習得理論的世界觀本來就是刻意練習＋重複，
在裡面怎麼最佳化都會長得像舊做法。→ 全景重查，產出 `METHOD_MAP.md`（**六個家族**）：
A 刻意練習／B 大量可理解輸入／**C 策略能力·語言島**／D AI 對話夥伴／E 內容驅動挖句子／F 動機工程。
- ⭐ **C 語言島（Shekhtman）是最被低估的**：不是把能力變強，是把現有能力**變得可調度**。
  五條規則條條對得上 TEF（You Ask for It＝Section A 問 10–12 題、Shifting Gears＝Section B 被反駁時）
- Owen 一句話抓到本質：「**很像蔣萬安，問A答B，怎麼扯都拉回到我熟練的那些句子**」——就是那個，
  但要提醒天花板：Section A 逼你主動問，島救不了；純閃避會被考官抓
- D 有硬數據（2025 IJAL 統合分析）：整體 g=0.608，**語音 0.809＞文字 0.425、
  生成式 0.833＞規則式 0.473、手機 0.790＞電腦 0.189**
- F 有實證：**外語愉悅感是口說進步的唯一正向預測因子**（效果量小），**無聊會扣分**

#### ② 研究法變成鐵律

他說：「**讓全世界有的東西，分門別類協助我們打造系統。**」→ 寫進每週研究例行的指令，也存成
memory `feedback_survey_families_not_one_school`：**先掃全景分家族，⛔ 不要只查一個學派再最佳化**。

#### ③ 每週研究例行（雲端 routine）上線

`trig_01WwYqQodLQjqbU7d3iwJfwG`｜每週一 08:00 台北｜Opus｜有 WebSearch/WebFetch。
ISO 週數 %4 輪替聽說讀寫；每週固定查三塊（實證參數／AI 能做什麼／網路上的實作）；
產出 `research/RESEARCH_年-W週_技能.md` 六段，**第 5 段強制是「🎮 怎麼讓它更好玩」**。
⛔ 動作邊界：只准新增 `research/`（＋發現新家族時可補 `METHOD_MAP.md`），**不准改系統程式**。
細節見 memory `project_weekly_research_routine`。

#### ④ 九個月策略 `STRATEGY_PRODUCTION_9M.md`

四階段（建島→接得住並會問問題→對準考試量化→收斂維持）、每天 15 分鐘產出、
建議 **2027 年 2–3 月先實考一次當診斷**（TCF 隔 30 天可重考）。
兩次重要修正：
- **Owen 更正**：「我其實**每天都有用 Duolingo 聊天**，只是不會輸入進 dashboard」
  → 家族 D 不是零是每天；⛔ **系統的空白 ≠ 他沒做**（已寫進 memory `feedback_fun_is_the_engine`）
- **查完 TEF/TCF 寫作題型後**：一座島其實是**四個出口、三種長度**——
  TEF Section B（≥200字3論點，AC8 現在就是一篇合格答卷）／TCF Tâche 3（120–180，要砍短）／
  Tâche 2 用場景段／⛔ **TEF Section A（fait divers）完全用不上**，那題要練「壓掉個人語氣」。
  ⚠️ **TCF 字數高於或低於範圍都可能不及格**

#### ⑤ 第一座語言島：`AC8 加拿大／移民動機`（17 秒 → 105 秒）

Owen 口述四個理由（教育／氣候／福利／局勢安定）＋ 兩個具體場景（**同事小孩幼稚園就補習**、
**每次看兩岸與烏俄新聞就更嚮往安定**）。Claude 只轉法文不改內容。
刻意用上剛學的結構：futur simple、se poser une question（27課）、chaque fois que／
c'est…que 強調句／toutes ces raisons（26課）、pire（25課）。
- 他逐句核對過中文，**六個翻譯決定他確認了第1條**（兩岸→les tensions entre la Chine et Taïwan）
- ⭐ 最強的一句是「幼稚園就開始補習」——**別人沒有的細節**，考官會記得
- 附 `follow_ups` 10 題預測追問＋覆蓋率（目前 ok 1／part 2／**gap 7**），
  `from` 欄位標出可以從哪張卡調材料——**追問是島與島之間的橋**

#### ⑥ Owen 自己發現的技巧：唸到順為止

他聽 Coffee Break French 時「**覺得不錯的一句話就暫停，不斷唸到順為止**」，並且觀察到
「**腦袋懂的文法跟順序，用唸的就是不順**」「**舌頭跟不上或亂彈**」。
→ 這正是陳述性／程序性的分裂，而「舌頭」那部分是**動作技能**（發音在文獻裡是 motor skill，
dorsal stream 把聲音映射成發音動作計畫）。技巧的名字是 **choral repetition training**。
已寫成 `SPEAKING_METHOD.md` 第十一節，含五個參數（連續3次無誤不減速才算過／一次只挑1–2句／
一定出聲／先慢後快再超速／卡住先切開音節交界）。⚠️ 它打 Articulator，**不能取代島**。

**這天新增的文件**：`METHOD_MAP.md`、`STRATEGY_PRODUCTION_9M.md`、
`SPEAKING_METHOD.md`（第十節島的訓練生命週期＋七個完成門檻、第十一節唸到順為止）。
**新增 memory**：`feedback_survey_families_not_one_school`、`project_weekly_research_routine`、
`feedback_fun_is_the_engine`、`feedback_source_hierarchy`、`project_irregulars_are_the_bottleneck`。

---

### 08-27：dashboard 安靜首頁上線——第一屏只剩一句話跟一個按鈕

**為什麼做這個**（Owen 08-26～27，兩段話要合起來看）：
「我會想玩 Duolingo、Anki 而不是進系統。**我想到那個龐大的資訊我就頭痛**，而且純粹考試，
**沒有真的跟我的情緒共感連上的感覺**。」／「我希望在學習過程中**保持熱情跟娛樂性**……
那也會是我學習的**永動機動力源**。」
→ 700 小時的真實公式是 **時數 × 效率**。系統做的每件事都在優化右邊那一項，
但決定左邊那一項的是「他願不願意打開」。這次改的就是「打開的那一秒」。
（依據 memory `feedback_fun_is_the_engine`；他 08-26 明確授權「我想全權交給你處理這件事情」）

**做了五件事：**

1. **新增「今日一句」＝第一屏唯一的內容**（新檔 `daily_line.js`，41 則）
   - ⛔ **這個檔裡一個法文字都沒有**：只放 `sentences.js` 的 id ＋ 一行中文鉤子，
     法文與中文一律靠 id 去 `SENTENCES` 撈。句子的來源永遠是筆記／課本
     （CLAUDE.md 內容鐵律 1），Claude 只寫中文鉤子。
   - 鉤子挑的是**有東西可講的句子**：字面層（`coup de foudre`＝一記雷擊、
     `se sentir bien dans sa peau`＝在自己的皮膚裡舒不舒服、`compter sur qqn`＝把我算進去）、
     法文的世界觀（`Il me plaît` 主詞是東西不是你）、一個字差很多（`fraîcheur` vs `froid`）。
   - ⚠️ **刻意不做成「每句都有字面層」**：他否決過那個提議（「每一句都這樣做又有點多了」），
     深刻感來自稀有與選擇性，不是密度。要加就往後**追加**，不要重排（day % length 輪播，重排會換掉今天的句子）。
   - 🔊 鍵接 `tts_reader.js` 的 `TtsReader.speak()`，沿用全站統一語音優先序。

2. **其餘版面整包收進「▾ 看全部」**：從 alerts 到 `lyVoice` 全部包進 `details.allwrap#lyAll`，
   **裡面順序一格都沒有動**（memory `user_memory_palace_style`：他靠位置記東西）。
   收合狀態沿用既有的 `dash_open`（不帶 `clb7_` 前綴、不占 Supabase 同步負載）。

3. **⛔ 拿掉所有用缺口定義他的文案**——`buildAlerts()` 整段重寫，刪掉：
   「已有 N 天沒有記錄學習時數」「📝 已有 N 天沒有造句，輸出能力會退步」「🎧/🗣 N 天沒記錄」
   「🔴 嚴重弱點 N 個」「📉 本週時數落後」「✅ 目前沒有警報」。
   **只留兩條中性待辦**（🚩 檢舉待審、⭐ Answer Card 待升級），沒有就整塊 `display:none`。
   ⚠️ 理由要記住：**系統的數據天生不完整**——他每天用 Duolingo 聊天、上家教、看影集，那些不會進 localStorage。
   dashboard 顯示「N 天沒記錄」時，那是**記錄的空白，不是他的空白**。弱點數字沒有消失，
   仍然在 🔬 診斷層裡給 Claude 決定出題用，只是不再每天推到他臉上。

4. **不秀分母**：處方與入口副標的到期數／總格數全部改寫——
   複習卡「N 張到期＋新卡」→「這一包 10 張，3–5 分鐘」；造句「N 句到期＋5 句新句」→「這一輪 5 句」；
   Answer Card「N 張到期＋最多3張新卡」→「這一包 3 張」；
   動詞衝刺「還有 N 格未達反射（N/66）」→「**已反射 N 格**」（改成講已達成，不是講欠多少）；
   時態浸潤「已讀 N/6 篇」、時態開關「（N 題到期）」→ 直接拿掉。

5. **按鈕底下只講下一步**：`#startSub` 顯示「接下來：🔥 熱身 Quiz 5 題」，
   全部做完顯示「今天的處方都走完了 🎉 額外練習一樣會計時」。13→15 步的全景收在「▾ 看全部」裡。
   session timer（`sessBar`）**留在 `<details>` 外面**，計時中照樣看得到。

**順手修掉的過期字串**：快速入口的「課程地圖 第 11 課」→ 第 27 課、「筆記 第 1–13 課」→ 第 1–27 課、
「閱讀理解 20 篇短文」→「純法文短文」（改成不寫死數字，之後加篇數不會再過期）、
開始鍵的 toast「今日六步已完成」→「今天的處方都走完了」（早就不是六步了）。

**驗證**（照測試鐵律：ROOM 先改成 `TEST-DO-NOT-USE-…` 才開 preview）：
手機 375px 第一屏＝標題＋今日一句＋按鈕＋「▾ 看全部」一行，**沒有第二件事**；
展開「看全部」後 15 步處方／錯題本／15 個入口／心法／時區／4 個收合層**全部還在、順序不變**；
🔊 鍵不報錯；連續 5 天的輪播確認每天換一句（第12→9→18→23→20 課）；
注入 `clb7_flagged_qs`／`clb7_ac_upgrade_ready` 確認兩條中性待辦會出現、清掉後整塊隱藏；
把處方全部標成完成確認 `#startSub` 換成完成文案；`sessBar` 不在 `#lyAll` 裡且計時中可見；
desktop 1280px 無橫向捲動；console 零錯誤。
收尾清掉測試寫入（那兩個 key ＋ 測試用 session，`clb7_tracker` 沒有多出記錄）
→ ROOM 還原 → **`preview_stop`** → grep 無 TEST 殘留。

⚠️ **之後要動 dashboard 的人注意**：新卡片照舊放進「▾ 看全部」裡對應的位置，
不要為了「看起來乾淨」把裡面重排，也不要把新東西加到第一屏——
**第一屏只有一件事，是這次改版的全部重點**。

---

### 08-28：第28課（A2・La condition avec si ＋ Le pronom on ＋ 電話與網路詞彙）完整入庫

Owen 丟進 2026-08-28 的課堂逐字稿＋6 張課本截圖（Édito A2 Unité 5，課本 p.74–80）。
⚠️ **全部先對過 `assets/.textbook_cache.txt`**：Fonctionnement 表、Entraînement 題目、
詞彙框逐條核過，逐字稿糊掉的地方（「laissez votre marché」之類的語音辨識錯誤）一律以課本為準。

**這一課教了什麼**
- **主文法①：la condition avec si 的完整三式**——第25課只給了前兩式（現在＋現在／現在＋命令），
  這一課補上 **si ＋ 現在式 ＋ 未來式**（要等第27課的未來式學完才有材料）。
  ⭐ 主軸只有一條：**si 後面永遠是現在式，變的只有右半邊**。
- **si vs quand**：課本 Remarque 用 `quand ＋ 未來 ＋ 未來` 表達 **une certitude dans le futur**。
  ⚠️ Owen 當堂問「這兩個中文翻譯有不一樣嗎」——**沒有**，中文都是「當…就…」，
  **差別在確定性**，這一條寫進筆記、codex 6-6-3 與 gram_rules 的 why。
- **主文法②：le pronom on 的三種意思**（quelqu'un／les gens／nous），但**變位永遠照 il / elle**。
- **詞彙**：電話（appel／batterie／SMS／fixe／portable ＋ 瑞士 natel／比利時 gsm／**魁北克 cellulaire**）、
  打電話的動詞（décrocher≠raccrocher、allumer≠éteindre、être joignable、raccrocher au nez）、
  資訊（clavier／souris／imprimante／clé USB）、網路（appli／se connecter／se désabonner／en ligne／
  courriel／télécharger／visio）、科技（GPS／reconnaissance faciale／hologramme／imprimante 3D）。
- **課文兩篇**：wikiHow 的「怎麼活得不靠手機」（si 句的出處）、太空人 **Thomas Pesquet** 從太空發推特
  （on 的實戰場，ESA 團隊整段用 on 講自己）。

**九項連動全部做完（＋兩項順手的）**
1. `french_notes.html` 新增 `lesson-28`：13 個 unit、10 張表、17 個 phrase-list、115 句法文。
   ⭐ 記憶掛鉤是老師寫在白板上的 **Je suis Mbappé sur Instagram**——`je suis` 同時是 être 跟 suivre。
2. `questions.js` **＋44 題**（BANK 1035→1079）：condition-si 14／on-vs-nous 7／
   **新 topic `vocab-technologies` 20**／futur-simple 3。TOPIC_LABELS 兩邊都補
   （dashboard 用法文短名 `Technologies de la communication`、quiz 用中文說明式）。
3. `chunks.js`：`node tools/extract_chunks.js 28 --write` → **＋77 張**（1717→1794）。
4. `sentences.js`：人工精選 `S_L28_1~10`（236 句）。
5. `table_drill.html` **＋3 表**：si/quand 時態（12 列）、on ＝ 哪個字（8 列）、
   電話與網路詞彙（21 列）。⚠️ 順手新增了 **`vocab` 這個表格類型**（TYPE_LABEL／篩選鈕／badge CSS 一起補），
   之前只有 verb/adj/article/prep/gram 五類，中翻法的詞彙表沒有地方放。
6. `gram_rules.js`：`condition-si` 補 lesson 28 ＋ 4 條新 rule points ＋ 3 個新例句，
   名稱改成 **La condition (si / quand)**；⚠️ 舊 why 寫「條件那半永遠是現在式，不用未來式（B1 才出現 futur simple）」
   **是錯的**（那是在講結果那半），已改寫並標明 08-28 補了第三式。
   **新增文法點 `pronom-on`**（含 why），並把 `on-vs-nous` 這個 topic 從 `pronouns` 移過去
   ——第28課把它拉成完整的一節，不該再埋在「代名詞三家族」裡。
7. `codex.js` **122→132 條**：新增 **6-6-3「si vs quand（確定性的分岔）」**與
   **3-1-3「on 換得掉的三個字」**；6-6-2 補上第三式那一列（座標一個都沒動）。
8. `map.html`：`CURRENT_LESSON` 27→28，新增三張 tile（Si et quand／Le pronom on／
   Technologies de la communication），detail 全部用法文寫成長條目。
9. `reading.html` **a29「Une journée sans portable」**（原創短文＋3 題理解測驗），
   同一篇也放進筆記當第28課的**平行閱讀**。
10.（順手）`writing_tasks.js` **＋2 題**（W28a 四個建議 DELF tâche 1／W28b 我的十年後）。
   ⚠️ **22–27 課的寫作題目還是空的**（這份檔停在第21課），下次可以補。
11.（本課沒有新時態）`verb_sprint.html` 的 `MODES` 不用動。

**順手修掉的一個舊 bug**：`french_notes.html` 底部的「整段連續朗讀」掛載寫死了 `l21-parallel`，
所以 **第26、27 課的平行閱讀一直沒有那條朗讀列**。改成掃 `ul.phrase-list[id$="-parallel"]`，
現在 21／26／27／28 四篇都有，之後新課只要沿用 `lNN-parallel` 命名就自動長出來。
⚠️ 這裡踩到兩個坑，寫下來免得重踩：
① `TtsReader.mountList()` 會把 `barEl.className` **整個覆寫成 `ttsr-bar`**，所以外面自己標的 class 會被洗掉；
② CSS 要寫成 **`details.lesson-group .ttsr-bar`**——模組自己的 `.ttsr-bar` 是後注入的，
同權重的選擇器會輸給它，淺色覆寫吃不到。

**驗證**（照測試鐵律：先 grep 確認 ROOM → 改 TEST 值 → 測完還原 → `preview_stop` → grep 無殘留）
- `node tools/check_notes.js` **全綠**（28 課／232 表／257 unit，錯誤 0 提醒 0）
- 筆記頁：lesson-28 的 13 unit／10 表／115 個 `span.fr`／190 個 🔊 全部長出來；
  四條整段朗讀列的背景確認是白底、`position: static`（不跟頂部導覽列打架）
- quiz：第28課按鈕在、44 題全部進 pool、連續作答 8 題（choose／fill 混合）全部正常判分
- table_drill：`詞彙` 篩選鈕可用、第28課三張表出得來、對答案顯示所有可接受寫法
- reading：a29 三題全對得到 3/3
- map：`第 28 課 / 預計 35 課`、三張新 tile 在、`#cx-3-1-3` 與 `#cx-6-6-3` 都渲染得出來
- gram_trainer：`La condition (si / quand)` 顯示「第 25、28 課 · 9 題」、
  `Le pronom on (三種意思)` 顯示「第 9、28 課 · 6 題」（只算打字題，數字對得上）
- dashboard：15 步處方正常、console 零錯誤
- 收尾清掉試跑寫入的 12 筆第28課題目 SRS ＋ a29 的閱讀紀錄 ＋ 今天的完成標記

⚠️ **這一課沒做的第十件事**：`scenes.js` 的情境劇本——第28課的課文是 wikiHow 的建議清單
跟一篇報導，**沒有成對台詞的對話**，沒有素材可以做。下一課如果有對話再補。

---

## 之前 session 做了什麼（2026-07-02 ～ 07-03）

### Commit `6ffcf6a`
1. 閱讀進今日處方；CLB等級判定卡（正確率≥75%且≥5題次）；聽力/口說3天沒記錄警報；閱讀題庫8→20篇；map.html到第13課；修reading.html `todayStr()` UTC時區bug

### Commit `235c03b` — 動詞反射衝刺初版
`verb_sprint.html`：60秒衝刺、起手時間量測（連3次答對+中位起手<2秒=反射）、9×6熱力圖、SRS加權出題、答錯暫停+提示唸出聲+手動繼續

### Commit `25ab840` — 今日錯題本
統一錯題日誌`clb7_wrong_log`；dashboard「📕今日錯題本」；**重大bug修復**：quiz的topic快照與dashboard週趨勢快照共用`clb7_snapshots`格式混入導致dashboard整頁掛掉→topic快照改用`clb7_topic_snapshots`+`migrateSnapshots()`自動搬遷

---

## 複習卡系統設計依據（2026-07-03，survey後確立）

- Successive relearning（提取+跨天間隔）是文獻最強組合技；3×5分鐘>1×15分鐘
- 卡片流：pretest（先回想再翻開）+ production（唸出聲）+ TTS（翻開自動發音）
- 間隔1/3/7/14/30天；畢業=3個不同天答對+間隔≥14天；新卡上限10/天
- 答錯→包尾重試（當日至少一次成功）+進錯題本+明天再到期

**卡片庫維護**：`chunks.js`由french_notes.html自動抽取。每次新增課程筆記後要重跑抽取腳本（node逐列解析phrase-list/三欄表/四欄表）。id格式`L{課}_{fr前24字}`，重生成時既有卡id不變（SRS記錄不丟失）。

**⚠️ 07-07新增：`sentences.js`跟`chunks.js`維護方式不同——每次 Owen 給新課筆記/逐字稿時，這三份都要一起補**：①`chunks.js`（自動抽取，跑腳本）②`table_drill.html`的`TABLES`題庫（人工加表格）③`sentences.js`（**人工精選**，不是自動抽取——從新課內容挑「真的常用、值得先背」的完整句子，過濾掉單字/詞組對，id格式`S_L{課}_{序號}`接續該課現有最大序號）。這是 Owen 明確要求的（07-07討論造句練習設計時提出），忘記其中一項＝新課內容沒進到對應練習系統。

**⚠️ 07-11新增第七項連動：`gram_rules.js`**——新課教到新文法時：對應 `GRAM_POINTS` 佔位點改 `unlocked:true`＋補 `lessons`/`topics`/`rule`（規則卡，**必含 `why` 欄位**——「為什麼長這樣」的由上而下解釋，例外要寫成歷史的自然結果不是要背的規定，語氣紅線：講到足以解釋規則就停、不說故事，見 memory `feedback_content_restructure_philosophy`）；若是全新文法點（地圖佔位裡沒有的）就新增一個點。忘記＝新文法進不了文法路徑，quiz選課器也不會給🪜提示。

---

## 關鍵 localStorage keys

- `clb7_quiz_done` → 今日日期字串（步驟②研讀+專項quiz完成標記）
- `clb7_warmup_done` → 今日日期字串 zh-TW（步驟①熱身完成旗標）
- `clb7_drill_done` → 今日日期字串 zh-TW（步驟③填表格完成旗標）
- `clb7_warmup_log` / `clb7_quiz_log` / `clb7_drill_log` → [日期字串,…]（①②③完成歷史，供dashboard每日完成率分析用，只存最近90筆）
- `clb7_reading` → [{id, title, date, correct, total, sec}]（date為**本地ISO** `2026-07-02`）
- `clb7_writing` → [{date, s1, s2, score, reply}]
- `clb7_tracker` → [{ts, date, type, sec}]；`type:'session'`一筆＝一次完整訓練總時間（結算寫入，計入700h）
- `clb7_speaking` / `clb7_listening` → 口說/聽力日誌；`clb7_listening`可能有`source:'TTS測驗'`（含`quizId`對應`LISTENING_BANK`）或`source:'文化深掘'`（含`cultureId`對應`CULTURE_BANK`，07-10新增）自動記錄
- `clb7_<qId>` → {w, c, last}（SRS單題記錄）
- `clb7_game` → {xp, streak, lastDate}
- `clb7_quick_notes` → 懸浮筆記，每則{date, time, page, note}；french_notes/review會自動加`[第N課]`前綴
- `clb7_sprint_cells` → {"être_0": {h:[{o,f,t}…最近5筆]}}
- `clb7_sprint_sessions` → [{date, att, cor, avgFk, reflex, sec, fb?}]（date為**zh-TW**）
- `clb7_wrong_log` → [{d, t, src, q, a, note, hint?, title?, n}]（d為zh-TW）
- `clb7_snapshots` → **只放週趨勢格式** [{week, totalH, …}]；`clb7_topic_snapshots` → quiz每日topic快照（本地ISO）
- `clb7_chunk_srs` → 複習卡SRS {cardId: {iv, due, days, ok, no, last}}
- `clb7_review_sessions` → [{date, cards, ok, ts}]（最近100）
- `clb7_chunk_newcount` → {date, n}（今日新卡數，上限10）
- `clb7_sentence_srs` → 造句練習SRS，跟`clb7_chunk_srs`同結構但完全獨立的key（不共用池子）
- `clb7_sentence_sessions` → [{date, cards, ok, ts}]（最近100，供dashboard判斷步驟完成＋habit分析）
- `clb7_sentence_newcount` → {date, n}（今日新句數，固定上限5，這是Owen明確要求的數字）
- `clb7_hard_flags` → {cardId: {count, last}}（07-11新增，Owen在review.html/sentence_drill.html手動點🔴累加，不看對錯，跟SRS的w/c完全獨立；未到期的標記卡會被`bonusFlaggedCards()`加碼塞進當天包，卡數上限見各檔`FLAG_BONUS_MAX`）
- `clb7_last_lesson` → {lesson, d}（07-12新增，quiz帶lesson參數/gram_trainer startPoint時寫入，writing.html依課出題用）
- `clb7_creed_own` → [{text, d}]（07-12新增，Owen自己寫的心法/信念，dashboard輪播優先於creed.js內建條目）
- `clb7_notes_marks` → [{id, lesson, type:'weak'|'key', text, date}]（07-11新增，french_notes.html選字標記，重整頁面靠純文字比對重新找到位置套用`<mark>`，找不到就跳過不強求）
- `clb7_gram_stage` → {pointId: {stage, hist:[{d, stage, acc}]}}（07-11文法框架，現役點沒記錄=stage 2「全部重走」預設，見gram_rules.js `gramStageOf`）
- `clb7_flagged_qs` → [{id: qId(q), d, src, q}]（07-11檢舉待審題，quiz/gram_trainer出題池都排除；**Claude每次session要檢查這份清單**，修好題後移除該筆放回題池）
- `clb7_answercard_srs` / `clb7_answercard_sessions` / `clb7_answercard_newcount` → Answer Card（07-16新增）的 SRS 狀態，跟 `clb7_sentence_srs` 同結構但獨立的池子，id 格式 `AC{n}`（跟 `L{n}_`/`S_L{n}_` 不會撞，可共用 `clb7_hard_flags`）
- `clb7_ac_upgrade_ready` → [cardId,…]（07-16新增，Answer Card 首次畢業時記進來；**Claude每次session要檢查這份清單**，幫該卡寫出下一個 CEFR 版本 push 進 `answer_cards.js` 的 `versions[]`，寫完移除該筆）
- `clb7_gramread_done` / `clb7_gramread_log` → 今日日期字串／歷史陣列（07-16新增，📚文法閱讀步驟，在 map.html 點「✓讀完了」寫入，跟 clb7_warmup_done 同款式）
- `clb7_session` → {active, running, startedAt, accSec}（session計時器狀態，不同步到雲端，結束時清除）
- `clb7_order_lock` → '1'表示鎖定處方順序
- `clb7_duo` → Duolingo週報，`DUO_SEED`種子upsert進去

**⚠️ 日期格式地雷**：dashboard/tracker/writing/sprint/wrong_log用zh-TW（`2026/07/02`）；reading記錄和topic快照用本地ISO（`2026-07-02`）。跨工具比對日期要用同一格式helper。所有todayStr一律本地時間，**禁用toISOString()**（UTC偏移已炸過兩次）。

---

## 下一步（依優先序，2026-07-28 更新）

**⚠️ 2026-07-28 起：完整的待辦與待決定清單請看 [`SURVEY_2026-07.md`](SURVEY_2026-07.md) 文末「需要 Owen 決定的清單」（14 條，附優先序與風險等級）。下面這份舊清單保留，但已被 survey 涵蓋的項目會標註。**

**⭐⭐⭐ 最高優先：雲端已經被推空三次（07-06/07-16/07-20），該考慮自動備份**
> 📌 2026-07-28 補：survey C-1 提出比備份更根本的一層——**`push()` 加「縮水保護」**（推之前先看雲端 key 數，本機不到一半就拒推）。三次事故都是「不完整的 localStorage 整包蓋掉完整雲端」，這道閘直接堵住機制本身，而備份只是事後救。建議順序：縮水保護 → repo 每日快照 → （非必要）Supabase 第二張表。

三次事故都靠「Owen真機一開自我修復」僥倖過關，沒有真的丟資料，但這是運氣不是設計。Owen 07-20 已同意「之後可以考慮」，還沒動手。方案構想：每天（或每次 push 前）把雲端 payload 存一份快照到別的地方（例如另一個 Supabase 表、或存進 git repo 的一個 json 檔），這樣萬一哪次真的沒能自我修復也有得救。**不急，但下次有空檔可以問 Owen 要不要現在做。**

**⭐⭐ ROADMAP.md「待補」清單即時狀態**（見該檔「這次切換還沒做、待補的東西」段落，07-20核對）：
- ~~writing_tasks.js只到第16課~~ ✅ 已補第17課（W17a/W17b，A2 tâche1形態）
- 口說盲說要拉長到2分鐘＋開始用AI口說app：**還沒做**，目前系統仍是60-90秒盲說的A1版建議
- InnerFrench聽力解鎖：**還沒做**，等Owen到B1前後再議

**待 Owen 回覆（07-11舊題，優先度降低，如果他沒再提就不用主動追）**：quiz.html 是否還有其他「題目感覺翻錯」的具體例子——`clb7_quick_notes` 裡只有 2026/06/30 一則沒附題目文字的舊回報，可能已被後續修正覆蓋。

---

### ✅ 已完成（07-11 下半場）：quiz.html fill 題型補中文語意＋兩張語意不清的複習卡

Owen 回饋：「抽考很多題目 句子挖空 其實是翻譯 沒有中文會翻不出來」「不應該是我去點提示才知道怎麼寫，有些提示也不太清楚，寫都在猜題目的意思」。問清楚修法方向後（Owen 選「直接顯示中文句意」，不要藏在點擊提示後面），做了：

- **範圍界定**：`questions.js` 的 `BANK` 裡 `type:'fill'` 共 261 題，其中 **208 題的 `q` 本身已經內嵌中文語境**（例如「打掃家裡：faire _____ ménage」），這些不用動。真正「畫面只有法文挖空句、完全沒有任何中文線索」的只有 **53 題**（集中在第1–6課的舊式動詞/介詞/冠詞練習，用 `hint` 給的是法文文法公式或英文單字如 `"his = ?"`、`"never"`、`"nobody"`）。
- **修法**：幫這 53 題各補一個 `zh` 欄位（完整中文句意，必要時把文法重點用括號帶進句子裡，例如 `"我來自法國。（陰性國家：de la 要縮成 de，不說 de la France）"`），`quiz.html` 在題目下方新增 `.q-zh` 區塊**直接顯示**（不需點擊），`💡提示`按鈕保留給法文文法公式（如「nous → achetons」這種變位提示）。
- **順手修的兩張語意不清複習卡**（Owen 07-10 深夜在 review.html 用🤔回報過）：
  - `chunks.js` 的 `L14_de_la___de`：原本 `fr` 是抽象規則「de la → de」、`zh` 是「陰性國家 la 直接拿掉」——複習卡的正面/反面機制設計是「看中文回想完整法文句子」，但這張卡的反面根本不是一個可以造出來的句子，導致 Owen 完全看不懂在問什麼。改成真正的句子：`fr:"Je viens de France."`、`zh:"我來自法國。（陰性國家：de la 要縮成 de，不說 de la France）"`。
  - `L14_Je_viens_de_Taïwan_`：原本 `zh` 只有「台灣不加冠詞」，沒有完整句意，改成「我來自台灣。（國名不加冠詞，跟城市一樣處理）」，跟其他卡片格式一致（正面就是完整可翻譯的中文句子）。
- **驗證**：preview 用隔離 ROOM 測試——直接注入真實資料到 quiz.html 的 `queue`/`renderCard()`、review.html 的 `packet`/`renderCard()` 走實際渲染邏輯（不是憑空造 UI），screenshot 確認新的 `.q-zh` 區塊正確顯示、兩張複習卡正反面都正確；同時重跑了 07-03 那則「拒絕邀約並表達歉意要說？」的舊回報（第9課 pouvoir-vouloir topic），確認題目資料完整、4個選項都正常渲染，判定是當時的暫時性問題，非資料缺陷。測完已把 `sync_supabase.js` 的 ROOM 改回正式值，grep 確認無殘留測試字串。
- **範例效果**（改前 vs 改後）：`Mon frère est marié. _____ femme est fleuriste.` 原本只有 `hint:"his = ?"`，現在畫面直接顯示「🈶 我哥哥結婚了。他的太太是花店老闆。」，不用先懂英文再倒推法文。

---

0. **⭐ 文化/語源深掘 podcast（07-10 定案，架構已改成 NotebookLM 產出，不再用瀏覽器 TTS）**：
   - **動機**：Owen覺得現有筆記（french_notes.html）是老師課堂上為了一年內考過而快速抓重點的筆記，不夠深；他想要「為什麼法文長這樣」的理解——語言背後的歷史/社會/文化脈絡，建立法文底蘊，但仍要服務於「快速學會法文」這個主軸。
   - **⚠️ 07-10 走過一輪失敗經驗，記下來避免重踩**：第一版做了瀏覽器 SpeechSynthesis 逐行朗讀（CULTURE_BANK 陣列存對話稿，中文zh語音+法文fr語音交替），Owen 實測後回饋「聽起來像Google翻譯、機器人感很重、聽不下去」，長度也不夠（原本才4-6分鐘，Owen要通勤10-15分鐘）。討論付費TTS API（ElevenLabs/Google Cloud/OpenAI）方案後，Owen 提出更好的做法：**他本來就有付費NotebookLM，直接用NotebookLM的Audio Overview生成，音質是Google正規pipeline，不用另外弄API金鑰、不用我操心成本**。
   - **最終架構（已實作）**：
     - Claude的角色不是寫深度內容或逐字稿，而是**寫好「prompt方向」**——NotebookLM自己做deep research通常比手動查資料更快更廣，重點是告訴它「為什麼要聽」「要聽成什麼樣子」。Prompt指南見 [`assets/podcast/NOTEBOOKLM_PROMPT.md`](assets/podcast/NOTEBOOKLM_PROMPT.md)，核心精神是 Owen 原話：「把我排好的書櫃翻倒，再用更好更適合我的方式重新排列上去，翻倒重整的過程協助我用各種角度寫入，我更能四面八方的串上」——不是要NotebookLM複述已知規則，是要它用歷史/文化/語源角度重新organize、幫他建立更多記憶掛勾（可以用口訣/諧音/故事聯想）。
     - Owen 用該prompt去NotebookLM生成音檔（可以順便上傳`french_notes.html`內容或`assets/`裡的課本PDF當素材），下載mp3後放進 **`assets/podcast/`資料夾**，跟Claude說一聲標題/檔名/聽感，Claude把它登記進 `listening.html` 的 `CULTURE_BANK` 陣列。
     - `listening.html`的「🎙️文化深掘Podcast」板塊（07-10新增）目前是**空陣列**，純粹讀取本地mp3檔播放（`<audio controls>`）＋「✓標記聽完」寫入`clb7_listening`（`source:'文化深掘'`，時長取`audio.duration`），完全不涉及任何TTS或API呼叫，零成本。已用preview實測過空狀態渲染、假資料播放面板、標記完成寫入紀錄，都正常，且已確認沒有污染Owen真實Supabase雲端（測試後直接查雲端payload驗證過）。
     - 目標長度10-15分鐘（單段通勤），還沒決定要不要排進每日處方——Owen說先做幾篇試效果再決定，不用急著綁進9步番号處方。
   - **下一步**：等 Owen 用 `NOTEBOOKLM_PROMPT.md` 生成第一篇音檔（候補主題已列在該檔案裡，陰陽性由來排第一），放進`assets/podcast/`後通知 Claude 登記。

1. **verb_reference.html 語音名稱確認**：Owen下載了比較好的語音，目前用啟發式規則猜（premium/enhanced/amélior/localService===false），若還是選不對，需要問他系統設定裡看到的確切語音名稱，寫死進regex。
2. **chunks.js 批次修正**：Owen會用review.html的「🤔這張卡語意不清」持續標記卡片，累積到一定數量後，去`clb7_quick_notes`裡撈出這些回饋，批次修chunks.js對應的卡（中文提示語意不清、上下文缺失等）。
3. **聽寫（Dictée）工具**：已與Owen討論、方向確認，尚未實作。TTS唸題庫句子→Owen聽寫→比對。
4. **table_drill.html 答錯未寫入 clb7_wrong_log**：（📌 07-28 重新核對：`logWrong()` 現在有 **7 份複本**——quiz/reading/sprint/review/sentence_drill/answer_card/gram_trainer，`table_drill` 仍然沒有。補之前先決定要「抄第 8 份」還是「抽成共用的 `wrong_log.js`」，見 SURVEY B-4／C-2。）
5. **「法國地區×畫家」表格發音**：內容是完整敘述句夾雜粗體標記，目前故意跳過沒加喇叭，如果Owen要，需要另外設計清理邏輯過濾粗體符號再TTS。
6. **verb_sprint擴充**（等54格大面積變綠後）：passé composé助動詞+participes、imparfait。
7. ~~產出能力真實評分~~ ✅ **已被07-12的RUBRICS.md+ROADMAP.md取代**——分級評分尺（A2/B1/B2）＋writing.html內建批改指令的prompt已解決這個問題，不用再列待辦。
8. **錯題本延伸**：昨日錯題回顧（隔日再測）。
9. **french_basics.html 缺計時器**（07-11發現）：`french_notes.html`頂部導覽直接連過去的發音練習真實互動工具（數字/星期/月份/Sons du Français/文法表），完全沒有`session_timer.js`，裡面練習的時間不會算進700h。Owen說先不用處理，之後要做的話只要照其他練習頁的模式補一行`<script src="session_timer.js">`即可。
10. **4個孤兒檔案待決定**（07-11發現）：📌 **07-28 已逐檔查完內容並給出具體建議，見 SURVEY B-5**——`french_notes拷貝.html`（只有 lesson-1~3、內容 100% 已被現行筆記涵蓋）建議刪；`french_sounds.html`（370KB 裡 352KB 是單一內嵌 base64 音檔、內容是 `french_basics.html` 的子集）建議刪；`index.html`（**已被 git 追蹤，而且它就是正式站根目錄首頁**——現在打開網站根目錄看到的是一頁發音表不是 dashboard）建議改寫成轉址／入口頁；`time_editor.html`（音檔剪輯小工具）建議保留但搬進 `assets/tools/`。**四項都是動檔案＝中高風險，等 Owen 點頭再做。**

---

## 關鍵設計決定（已確認）

- 閱讀題目語言：**保持純法文**——讓Owen從上下文推敲，答錯有解說；這才是真實TCF訓練
- 週趨勢：用ISO week字串做key，每次開dashboard自動快照上週
- CLB等級：**不用課數判定，用Quiz正確率**（≥75%且≥5題次，全topic達標）
- 熱身後的課程選擇器：**不強迫選哪課**，Owen自己決定
- 反射標準：**起手時間**（第一鍵延遲）而非總作答時間
- 錯題不立即重試，**整輪結束才複習**（quiz分輪制、sprint/table_drill複習輪皆同）；答錯後**手動**按下一題
- 跨裝置同步範圍：**只同步「完成與否」的勾勾**，不同步「同一題答到一半」的位置（Owen已確認這樣夠用）
- 每日7步順序：中間4步自動輪替避免練到麻木，可鎖定；1.5h不特別拆分時段，Owen會自己中斷
- 真實聽力素材（RFI/InnerFrench）用Spotify官方embed嵌入，不抓取版權內容；TCF Canada量少不特別整合追蹤
- InnerFrench整體難度偏B1+，暫不使用，等Owen到B1再考慮

---

## 注意事項

- **懸浮回饋 snippet 覆蓋**（2026-07-28 重新 grep 核對）：answer_card/dashboard/french_notes/gram_trainer/listening/quiz/review/sentence_drill/speaking/tracker/writing 共 **11 頁**有；**table_drill／reading／verb_sprint（三者都在每日處方裡）＋ verb_reference／map 沒有**——前三頁是真缺口，需要時補
- **session_timer.js 覆蓋**（2026-07-28 重新核對）：answer_card/dashboard/french_notes/gram_trainer/listening/map/quiz/reading/review/sentence_drill/table_drill/verb_sprint/writing 共 **13 頁**有；speaking/tracker/verb_reference/**french_basics** 沒有（前三個是日誌或參考頁可不補；`french_basics.html` 是真缺口，見「下一步」第9條）
- **sync_supabase.js 覆蓋**：上述 13 頁＋tracker 共 14 頁；⚠️ 它只收集 `clb7_` 開頭的 key——`french_notes`／`french_basics`／`verb_reference` 的 6 個 `fr_*`／`vr_*` 手寫筆記 key **完全不同步、也不在任何備份裡**（見 SURVEY C-3）
- **quiz.html `choose` 類型題** 的`a`欄位必須和`opts`裡的字串**完全一致**，不能用`|`分隔
- **`clb7_snapshots` 絕對不要再寫入非 `{week:...}` 格式**——會讓dashboard整頁掛掉（已修一次，有防禦但別再犯）
- **新練習工具的判錯點記得呼叫 `logWrong()`**（quiz/reading/sprint各一份複本，格式要四處同步）——錯題本才收得到
- **french_notes.html 表格規則（兩條都要滿足）**：①`<table>`包在`<div class="compare-table">`裡，否則無樣式無發音 ②法文欄`<td>`要標`class="m"`，否則有樣式但沒發音、視覺上行距顯得緊（見memory `feedback_notes_table_format`）
- **table_drill.html 一輪只出6個表**（`ROUND_SIZE`），答錯進複習輪直到全對；切難度/類型有進度時會confirm確認
- **Supabase測試污染教訓**：任何會寫`clb7_*`的preview測試，開頭先把`sync_supabase.js`的`ROOM`改成測試值，測完改回並grep確認無殘留
- **⚠️ 07-11新增：切回正式ROOM後，localStorage裡清掉的測試key可能被pull()又拉回來**——如果在還是TEST ROOM時setItem過某個clb7_*key（會排程debounce push到TEST雲端），之後即使用removeItem清掉本機，只要之後任何頁面的pull()時機跟這個清除有時間差（例如切分頁觸發visibilitychange），舊值還是可能從TEST雲端被拉回本機（apply()邏輯是「本機沒有這個key就直接寫入」，不管本機是「本來沒有」還是「剛被清掉」）。改完ROOM後不要只看畫面沒異常就當作乾淨，要直接查詢真實Supabase payload（`curl`該ROOM的`clb7_sync`）確認雲端真的没有殘留字串，比只信本機localStorage清空更保險。

---

## 核心原則（每次 session 開始前確認）

> 我們在追一個真實目標。
> 不玩努力的遊戲，不做白努力的事。
> 每一個動作都問：「這讓我更接近 2027年6月1日考過 CLB 7 嗎？」
