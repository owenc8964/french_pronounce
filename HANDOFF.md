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
| `french_notes.html` | 第1–14課筆記；**14課起新增「🎙老師的課堂法語」「🔊發音警報」固定欄目** | ✅ 更新（07-03）|
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
- `clb7_speaking` / `clb7_listening` → 口說/聽力日誌
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
- **preview server 快取**：`questions.js` 會被快取，改完後要新開 server 或 hard reload
- **`clb7_snapshots` 絕對不要再寫入非 `{week:...}` 格式**——會讓 dashboard 整頁掛掉（已修一次，有防禦但別再犯）
- **新練習工具的判錯點記得呼叫 `logWrong()`**（格式見 quiz.html，三個檔案各有一份複本）——錯題本才收得到
- **`logWrong` 是複製貼上的三份**（quiz/reading/sprint 各一）＋ dashboard 一份讀取端，改格式要四處同步

---

## 核心原則（每次 session 開始前確認）

> 我們在追一個真實目標。
> 不玩努力的遊戲，不做白努力的事。
> 每一個動作都問：「這讓我更接近 2027年6月1日考過 CLB 7 嗎？」
