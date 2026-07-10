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

⚠️ **測試涉及寫入 `clb7_*` 的功能前，一律先把 `sync_supabase.js` 的 `ROOM` 常數暫時改成 `'TEST-DO-NOT-USE-DELETE-BEFORE-COMMIT'`**，測完改回 `'owen-clb7-k9f3a72q'` 並 grep 確認沒有殘留測試字串再 commit。因為 preview 和正式站共用同一個 Supabase ROOM，測試資料會直接污染 Owen 真實雲端（已踩過一次，見下方事故記錄）。

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
| **目前程度** | A1→A2過渡，第16課，約 24+ 小時課時 |
| **每天目標** | 1.5–2 小時有效練習（含通勤被動聽力）|
| **總時數目標** | 700 小時（多方研究數據交叉驗證）|
| **產出能力評估的落差** | 系統目前對「辨識/回想」（quiz正確率、複習卡）評分很扎實，但對「口說/寫作/聽力理解」幾乎沒有真正評分機制——造句是 Claude 口頭給分沒有系統化趨勢，speaking/listening 日誌只記錄有沒有做、不評分內容。若要更準評估，未來可考慮定期做完整模擬 TCF/TEF 口說寫作題並照官方標準評分記錄趨勢（已跟 Owen 提過，尚未實作，見下方「下一步」）|

---

## 現有系統狀態（2026-07-07）

| 檔案 | 用途 | 狀態 |
|------|------|------|
| `dashboard.html` | 指揮中心：今日處方（**9步番号**，07-07新增造句練習、07-09新增聽力真人語速測驗）、📊每日完成率分析、今日錯題本、警報、CLB等級判定、倒數、700h、四技能、週趨勢、Duolingo週報、🔒鎖定順序開關 | ✅ |
| `session_timer.js` | 跨頁 session 計時器：`window.ClbSession` API，timestamp累計跨頁連續、練習頁常駐pill、**閒置3分鐘自動暫停**（用最後操作時間當停止點，不算閒置時間）、dashboard結算寫入700h、**07-11修復多分頁閒置搶跑＋start()洗掉進度兩個bug**（背景分頁不做閒置檢查、start()對已啟動session防呆） | ✅ 修復（07-11）|
| `sync_supabase.js` | 跨裝置同步：所有 `clb7_*` 存到 Supabase，開頁pull合併、變動debounce **700ms**（原2.5s縮短）自動push、**切前景也會pull**（原本只有切背景push）、離頁再push、各頁完成關鍵動作時**主動立即push**（不等debounce）|✅|
| `quiz.html` | SRS Quiz 550+題，熱身模式、**策略選課器**（未練過/錯誤率高/量少/久沒練 排序）、暫停、更正誤判 | ✅ |
| `table_drill.html` | 表格填空：40個表格（涵蓋第1–16課，含passé composé系列、imparfait無人稱動詞表、**07-10新增「文法詞」類型**：durée/qui-que/intensité 3表），**錯題複習輪**（答錯進複習輪直到全對，主輪成績不被洗掉）、切難度/類型有進度時confirm確認、一輪6個表 | ✅ 大修（07-06/07/10）|
| `verb_sprint.html` | 動詞反射衝刺：60秒、9動詞×6人稱、起手計時、反射熱力圖，**已補TTS發音**（原形+答錯自動唸正解） | ✅ |
| `review.html` | 複習卡：一包10張、SRS+successive relearning，**到期卡池已加洗牌**（避免同一批到期卡每天同順序重複）、發音邏輯已跟其他頁統一、卡片旁加「🤔語意不清」回饋按鈕 | ✅ 修復（07-07）|
| `reading.html` | 閱讀理解 20篇 A1–A1+短文，純法文+解說 | ✅ |
| `writing.html` | 每日2句造句，複製prompt→claude.ai→貼回記錄 | ✅ |
| `sentence_drill.html` | **新增（07-07）**：中翻法造句練習，每天固定5句新句＋到期複習，沿用review.html同一套SRS引擎（1/3/7/14/30天），**答錯排到這輪最後重考，磨到全部答對才算完成**，跟review.html的卡片機制共用「包尾重試」邏輯 | ✅ 新建 |
| `sentences.js` | **新增（07-07）**：常用句庫（目前108句，第1–16課），**人工精選**跟chunks.js不同（chunks是自動抽取全部筆記，這裡只放真正常用、值得先背的完整句子）| ✅ 新建 |
| `listening.html` | 聽力：**真實資源**（RFI + InnerFrench Spotify embed；Podcast Français Facile的A1對話系列連結卡）+ **自出TTS聽力測驗**（8篇，對齊已學課程）+ **07-09/07-10新增「真人語速測驗」**（LISTENING_BANK的`audioUrl`類型：真實mp3直接播放＋Claude原創TCF/TEF風格選擇題，目前7篇：麵包店/車站/市場/肉店/魚店/藥局/問路，逐字稿核對用連結卡連到來源、不存對方文字）+ **07-10新增「文化深掘Podcast」板塊**（見下方07-10記錄，目前CULTURE_BANK是空陣列，等Owen放音檔進來）| ✅ 大改（07-06～07-10）|
| `french_notes.html` | 第1–16課筆記，懸浮回饋（💬回饋這課）、每課下方研讀→做題快捷列、全站例句欄自動加喇叭、**第13/14課表格漏標class="m"已修復**（14個詞彙表）、**第13/14課排版大修**（見下方07-07記錄：note-box無樣式CSS bug、課文填空改逐句、choisir改verb-card、文化框補發音） | ✅ 修復（07-07）|
| `chunks.js` | 複習卡庫：936張，自動從筆記抽取（1–16課，07-07補第15課88張、07-10補第16課80張） | ✅ |
| `questions.js` | 共用題庫（BANK 664題 + AGREE_BANK 247題），第1–16課（07-07新增imparfait/vocab-nature/universite-vocab、07-10新增duree/qui-que/intensite/metier-travail-vocab四個topic） | ✅ |
| `verb_reference.html` | 動詞參考表，發音邏輯已跟其他頁統一（原本完全沒篩選） | ✅ 修復（07-07）|
| `tracker.html` | 舊版計時器（autostart、切分頁自動暫停）+ 700h 進度，功能已被 session_timer.js 取代但保留 | 舊版 |
| `speaking.html` | 口說日誌（僅記錄有無/時長，不評分內容） | ✅ |
| `map.html` | 課程地圖（63格），已更新至第16課（解鎖imparfait+études&école+travail+relatifs）；**07-11新增「📐文法大局觀」分頁**——把63格裡`gram:true`的26個純文法格重新依7大類（動詞現在式/時態/語氣建議被動、代名詞、冠詞疑問句否定、形容詞比較、連接詞論述）分組展示，每格保留原本CEFR配色，已解鎖格可點連結跳回`french_notes.html`對應課次複習 | ✅ |

**GitHub Pages 網址：** https://owenc8964.github.io/french_pronounce/dashboard.html

**今日處方順序（9步番号，中間6步依日期自動輪替）**：① 🔥 熱身 Quiz 5題 → ②–⑦ 研讀＋專項Quiz／填表格／反射衝刺／複習卡／造句練習（背5句常用句）／**聽力真人語速測驗（1篇）** 每天輪替順序 → ⑧ ✍️ 造句（產出）→ ⑨ 📖 閱讀。①⑧⑨固定頭尾，中間6步輪替（`clb7_order_lock`可鎖定）。時數不是步驟，由頂部 session bar 全程累計，完成按🏁結算才寫入700h。

---

## 最近工作記錄（2026-07-05 ～ 07-07，時間順序）

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
- `clb7_session` → {active, running, startedAt, accSec}（session計時器狀態，不同步到雲端，結束時清除）
- `clb7_order_lock` → '1'表示鎖定處方順序
- `clb7_duo` → Duolingo週報，`DUO_SEED`種子upsert進去

**⚠️ 日期格式地雷**：dashboard/tracker/writing/sprint/wrong_log用zh-TW（`2026/07/02`）；reading記錄和topic快照用本地ISO（`2026-07-02`）。跨工具比對日期要用同一格式helper。所有todayStr一律本地時間，**禁用toISOString()**（UTC偏移已炸過兩次）。

---

## 下一步（依優先序，2026-07-10 更新）

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
4. **table_drill.html 答錯未寫入 clb7_wrong_log**：目前只有quiz/reading/sprint三處logWrong，table_drill的錯題沒有進今日錯題本，待補。
5. **「法國地區×畫家」表格發音**：內容是完整敘述句夾雜粗體標記，目前故意跳過沒加喇叭，如果Owen要，需要另外設計清理邏輯過濾粗體符號再TTS。
6. **verb_sprint擴充**（等54格大面積變綠後）：passé composé助動詞+participes、imparfait。
7. **產出能力真實評分**（見上方核心目標與現況表）：若要更準評估口說/寫作程度，可考慮定期完整模擬TCF/TEF口說寫作題並照官方標準評分記錄趨勢。
8. **錯題本延伸**：昨日錯題回顧（隔日再測）。
9. **french_basics.html 缺計時器**（07-11發現）：`french_notes.html`頂部導覽直接連過去的發音練習真實互動工具（數字/星期/月份/Sons du Français/文法表），完全沒有`session_timer.js`，裡面練習的時間不會算進700h。Owen說先不用處理，之後要做的話只要照其他練習頁的模式補一行`<script src="session_timer.js">`即可。
10. **4個孤兒檔案待決定**（07-11發現，都未加入git、沒有任何頁面連過去）：`french_sounds.html`、`index.html`（兩個title都是"Sons du Français"，內容可能跟french_basics.html重複）、`time_editor.html`、`french_notes拷貝.html`（筆記備份/複本）。要清掉還是接進系統，問過Owen他說先不用，留著晚點決定。

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

- **懸浮回饋 snippet 覆蓋**（2026-07-07現況）：dashboard/quiz/writing/speaking/tracker/listening/review/french_notes/**sentence_drill** 共9頁有；**verb_sprint/reading/table_drill/verb_reference 這4頁還沒有**，未來需要時記得補
- **session_timer.js 覆蓋**：quiz/writing/listening/review/french_notes/verb_sprint/reading/table_drill/**sentence_drill** 共9頁有；speaking/tracker/verb_reference 沒有（speaking/tracker是獨立日誌工具不在處方流程內，可不補；verb_reference不在主流程，視需要補）
- **quiz.html `choose` 類型題** 的`a`欄位必須和`opts`裡的字串**完全一致**，不能用`|`分隔
- **`clb7_snapshots` 絕對不要再寫入非 `{week:...}` 格式**——會讓dashboard整頁掛掉（已修一次，有防禦但別再犯）
- **新練習工具的判錯點記得呼叫 `logWrong()`**（quiz/reading/sprint各一份複本，格式要四處同步）——錯題本才收得到
- **french_notes.html 表格規則（兩條都要滿足）**：①`<table>`包在`<div class="compare-table">`裡，否則無樣式無發音 ②法文欄`<td>`要標`class="m"`，否則有樣式但沒發音、視覺上行距顯得緊（見memory `feedback_notes_table_format`）
- **table_drill.html 一輪只出6個表**（`ROUND_SIZE`），答錯進複習輪直到全對；切難度/類型有進度時會confirm確認
- **Supabase測試污染教訓**：任何會寫`clb7_*`的preview測試，開頭先把`sync_supabase.js`的`ROOM`改成測試值，測完改回並grep確認無殘留

---

## 核心原則（每次 session 開始前確認）

> 我們在追一個真實目標。
> 不玩努力的遊戲，不做白努力的事。
> 每一個動作都問：「這讓我更接近 2027年6月1日考過 CLB 7 嗎？」
