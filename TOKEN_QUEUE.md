# TOKEN_QUEUE.md — 週額度快用不完時的「加速工作清單」

> 2026-10-15 建立。Owen：「禮拜三發現周額度使用不到 65% 就要準備快速累積到 85%；週四不到 XX% 就要確保在週四 20:00 前用完。」
> 10-15 追加：「週二就要確定有沒有到 50%，那時就開始加速」。
> 週額度在**每週四 19:59（台灣時間）**重置。⭐ 10-15 改版：Owen 指出「週三只到 65%、週四 20 小時要用完 35% 沒辦法吧」——實測一個用滿的 5 小時窗口只≈週額度 14%，固定門檻在白天跑不夠窗口。
> → 改成單一排程 `quota-pacer`（週二～四每天 0/5/10/15/20 點）：算「剩下的窗口補不補得完」，不夠就把這個窗口用滿；保留週二 10 點 <50%、週三 10 點 <65% 必加速。舊的 `quota-tue-boost`／`quota-wed-boost`／`quota-thu-burn` 已停用（未刪）。
> 這不是為了燒而燒：每一項都要對 Owen 考過 TCF Canada B2（2027-09-19）或對遊戲有實際用處。

## 鐵律（加速模式的每一項都要守）
1. ⛔ 只寫 `research/`、`drafts/`、`tools/` 下的**新檔案**，或本清單、HANDOFF.md 的紀錄段。⛔ 不改正在用的頁面與資料：`quest.html`、`town.html`、`questions.js`、`french_notes.html`、`chunks.js`、`sentences.js`、`story.js`、`gram_rules.js`。要改的寫成「提案／草稿」等 Owen 決定。
2. ⛔ 不 push。每完成一項就 `git add <該項產出> && git commit -m "加速清單：<項目>"`（中文，結尾加 Co-Authored-By 行）。
3. ⛔ 不碰 Supabase 雲端、不寫 `clb7_*`、不開 preview 測寫入。
4. 法文：⛔ 不自創教學句；只有標明「原創例外」的劇情線索可以寫，且每句要標文法點與 `french_notes.html` 的課次出處。
5. 研究要附來源 URL；查不到標「未查證」。
6. 完成一項就在下面打勾 `[x]` 並寫一行結果與檔案路徑。

## 佇列（由上往下拿；平行時一次拿最上面幾項，互不碰同一個檔案）

> ⭐⭐ **2026-10-16 Owen 指定，最優先**：「你在最後幾天要把 token 用完這件事情，你可以把 Elon Musk 等等超強學習者做個詳細研究跟分析，還有適合我的應用」。
> 共同要求（Q0a–Q0d 都要守）：① ⛔ 先讀既有專題 `research/2026-10-12_高手怎麼學會的.md`、`research/2026-10-12_專題_學習力與輸入輸出.md`、`research/2026-10-12_專題_第三輪_三派之爭與不會很多時怎麼輸出.md`，不重查已查過的，接著它們的待查清單往下 ② 每個說法分「📐 有研究或一手資料證據」「🗣 本人自述／傳記」「⚠️ 網路流傳、查不到出處」三級，⛔ 名人神話不能當成方法依據 ③ 按 `METHOD_MAP.md` 的家族分類，⛔ 不要只查一個學派 ④ 每份最後一節「對 Owen 的意思」：他是台灣牙醫、A2（第 41 課）、目標 2027-09-19 TCF Canada B2、每週家教 3 小時＋Duolingo＋Anki＋town.html 遊戲（10-16 他說「玩 town 練習的速度快很多」）；⛔ 不要建議 shadowing 當主力（`research/` 已排除）、⛔ 不要把系統改成補習班（memory `project_exam_direction_no_overconverge`）。

- [x] ✅ 10-22 完成：四人流傳說法多查無出處（「費曼四步驟」是 Scott Young 整理的）；有證據的是「自己講解釋再對標準」；第一原理在語言只對一半（陰陽性／不規則只能整塊存）。`research/2026-10-22_超強學習者A_第一原理型.md`
  **Q0a 超強學習者 A：第一原理與「理解型」學習者**——Elon Musk（「語意樹」、讀書量、跨領域自學火箭的實際紀錄）、Richard Feynman（費曼技巧的真實出處與誤傳）、Benjamin Franklin（拆解重寫文章的寫作自學法）、Charlie Munger（思維模型）。產出 `research/2026-xx-xx_超強學習者A_第一原理型.md`。
- [x] ✅ 10-22 完成：七人幾乎沒有 A2→B2 紀錄；有紀錄的三段都是「泡在環境裡不會自己進步」；唯一有考試成績的 Benny 是練什麼長什麼（德文 C2 沒過聽力）；建議借 Kaufmann 用零碎時間加輸入、課文雙向翻譯。`research/2026-10-22_超強學習者B_語言高手.md`
  **Q0b 超強學習者 B：語言高手**——Kató Lomb（16 語、讀小說入門）、Luca Lampariello（雙向翻譯）、Steve Kaufmann（大量輸入、LingQ）、Benny Lewis（第一天就開口）、Alexander Argüelles（⚠️ shadowing 只列事實不推薦）、Matthew Youlden、Olly Richards（故事法）；比較他們「A2→B2」那一段實際怎麼過的、每天花多少時間。產出 `research/2026-xx-xx_超強學習者B_語言高手.md`。
- [x] ✅ 10-22 完成：練習時數只解釋部分差異（Macnamara 2014：遊戲 26%、職業 <1%），品質＞時數；Scott Young 成績是自述、自改考卷；「刻意練習不好玩」沒站住 → town 有理但要看隔週記憶。`research/2026-10-22_超強學習者C_超學習與刻意練習.md`
  **Q0c 超強學習者 C：超學習與刻意練習（含反方證據）**——Scott Young（MIT 挑戰、一年四語言、《超學習》九原則）、Josh Waitzkin（《學習之道》）、Anders Ericsson（刻意練習）＋反方：Macnamara 等 2014／2016 統合分析（刻意練習只解釋一部分差異）、Hambrick 等。產出 `research/2026-xx-xx_超強學習者C_超學習與刻意練習.md`。
- [x] ✅ 10-22 完成（檔案混在 commit f179c0d 裡）：跨學派有證據的做法 7 個，他已做 4 個半，town 方向站得住；下週試 3 件：錯時分「推得出／只能存」、每週 3–5 句課文對話重建、家教 1 分鐘把規則講給老師聽。`research/2026-10-22_超強學習者_給Owen的應用.md`
  **Q0d 合成：適合 Owen 的應用**（⚠️ 等 Q0a–c 都完成才做）：讀三份＋既有專題，找出跨學派重複出現、而且有證據的做法，對照 Owen 現有系統（HANDOFF 開頭、`FRENCH_OS.md`、town.html），寫「他已經在做的／該加的／不適合他的」三欄，每條附證據等級與一個具體的下週可試做法。產出 `research/2026-xx-xx_超強學習者_給Owen的應用.md`，並在 HANDOFF 開頭加一行指標。

- [x] ✅ 10-22 完成：10 句劇情法文無文法錯；第三章線索三的選錯說明要改（si＋imparfait 配 futur 是錯搭配，且應為 ne sonnera plus）；5 句超出已學課次（cloche 等）。`research/2026-10-22_劇本法文複核.md`
  **Q1 第二～四章劇本逐句複核**：讀 `STORY_BIBLE.md` 與 `tools/story_ch2_4_draft.js`（10-15 agent 草稿），每句法文對 `french_notes.html` 查課次、查標準法文正確性，產出 `research/2026-xx-xx_劇本法文複核.md`（✓／✗＋改法）。⛔ 不直接改草稿。
- [x] ✅ 10-22 完成：28 條高信心錯題全部還在 questions.js 沒修；27 條維持高、1 條降中，另找到 1 條同類（索引 667 plus mauvais）；3 題要 Owen 從課本挑例句。`drafts/questions_fix_proposal.md`
  **Q2 題庫高信心錯題 → 修正提案**：讀 `research/2026-10-15_題庫品質稽核.md` 的高信心清單，每條對課本快取 `assets/.textbook_cache.txt` 再驗一次，寫成可直接套用的 patch 草稿 `drafts/questions_fix_proposal.md`（題目 index、原文、改成什麼、依據）。
- [x] **Q3 town.html 修正清單合併**（10-15 主 session 已直接修進 town.html，見 HANDOFF 三之六十二；剩下的低嚴重度項目列在那裡）：把 `research/2026-10-15_town_審查.md` 與 `research/2026-10-15_手感與回饋時機.md` 的建議合併成一張去重、依嚴重度排序的實作清單 `drafts/town_fix_plan.md`（每條附行號與改法）。⛔ 不改 town.html。
- [x] ✅ 10-22 完成（改做說明頁）：Édito A2 沒有 Unité 13，只到 U12；說明頁列兩條路（A2 模擬考 p.181–190／Édito B1 Unité 1 p.11–24），待 Owen 說下一堂上哪個。`drafts/preview_unite13.html`
  **Q4 下一單元預習單**：照 `preview_unite12.html` 的格式，替 Édito A2 的下一個單元（Unité 13）做預習單 `preview_unite13.html`（內容一律出自課本快取）。
- [x] ✅ 10-22 完成：T2／T3 考題還沒進任何頁面；T2 缺上課、工作、寵物、日常四類（約 23%）且沒練追問；T3 缺表態／論證的動作與連接詞；主力素材建議《Communication essentielle A2》；EXAM_MATERIALS_TCF.md 的 T3 準備時間寫錯待修。`research/2026-10-22_口說素材缺口.md`
  **Q5 TCF Canada 口說 Tâche 2／3 弱項素材**：讀 `PRACTICE_ORAL.md` 與 `research/` 既有口說研究，找出「還沒有練習素材」的題型，整理成 `research/2026-xx-xx_口說素材缺口.md`。
- [x] ✅ 10-22 完成：同題同堂重講效果最大；口語糾正「提示他自己改」＞「直接給正解」，是家教最值得調的地方；只輸入當下理解好、幾週後的產出輸給有產出的組 → 說寫要少量有回饋的產出；多篇原文在付費牆後，效果量待查。`research/2026-10-22_專題_第四輪_準備重講糾正與只輸入夠不夠.md`
  **Q6 專題「高手怎麼學會的」第三輪待查**：讀 `research/2026-10-12_專題_第三輪_三派之爭與不會很多時怎麼輸出.md` 文末待查清單，挑最有用的 2 題深查，寫新研究檔。
- [x] ✅ 10-22 完成：岔路 164 題都找得到原文；123 題沒問題、35 題要注意、6 題錯（其中 4 題的說明教錯規則，跟 Q2 提案重疊）；居民第一批 57 格台詞都對；第二批 11 個劇本還沒逐格核對。`research/2026-10-22_遭遇資料核對.md`
  **Q7 岔路／路人遭遇資料核對**：讀 `research/2026-10-15_岔路與路人遭遇設計.md` 與 `tools/town_encounters_draft.js`，逐題確認用到的 questions.js／scenes.js 題目真的存在、答案正確，寫 `research/2026-xx-xx_遭遇資料核對.md`。
- [x] ✅ 10-22 完成：再抽 60 題（種子 20261022）全部合格，168 個干擾項都不會也對；兩批合計 90 題 0 錯。另寫成新檔，沒有追加到舊檔。`research/2026-10-22_路上題庫抽查第二批.md`
  **Q8 路上題庫擴充抽查加量**（⚠️ 10-16 已接進 town.html，抽查發現錯的要寫成提案，不直接改）：讀 `tools/town_field_extra.js`，再抽 60 題人工檢查干擾項是否真的錯，結果追加到 `research/2026-10-15_路上題庫擴充.md`。
- [x] ✅ 10-22 完成（第三節研究項都已做完，改挑圖鑑主題）：「缺角幫記憶」站不住，它的作用是讓人想回來玩；集點進度效應（34% vs 19%）→ 圖鑑建議按地點分 8–12 格一組；缺什麼說成地方或角色缺；隱藏要素用沒預告的驚喜。`research/2026-10-22_遊戲研究_圖鑑收集與隱藏要素.md`
  **Q9 GAME_ROADMAP 研究類佇列**：從 `GAME_ROADMAP.md` 第三節拿「研究」類、尚未完成的項目做（⛔ 實作類不做）。
- [x] ✅ 10-22 完成：三題字數有上下限（T1 60–120／T2 120–150／T3 120–180），字數不合可能直接判不及格；T1、T2 要的句子筆記裡大多有（第 15、36、37 課）；真正缺的在 T3（一方面…另一方面、alors que、pourtant、轉述文件、結論句）。`research/2026-10-22_TCF寫作題型地圖.md`
  **Q10 TCF 寫作 Tâche 1–3 題型地圖**：讀 `tcf_writing_sujets.js`、`writing_tasks.js`，整理每種題型的評分重點與 Owen 目前缺的句型（只用筆記既有句子當例），寫研究檔。
- [x] ✅ 10-22 完成：課本快取有 B1 p.11–24 完整內頁 → 做成完整預習單（passé composé vs imparfait、il y a／dans／pendant／pour／depuis、plus-que-parfait、重音節）；所有法文標課本頁碼；課本與標準不一致處已標出。`drafts/preview_b1_unite1.html`
  **Q11 Édito B1 Unité 1 預習單草稿**（排程自補）：Q4 發現 A2 沒有 Unité 13；照 `preview_unite12.html` 格式做 `drafts/preview_b1_unite1.html`，內容只出自課本快取 B1 p.11–24。
- [x] ✅ 10-22 完成：上課進修、工作的素材很多（CE A2 第 20–24 課逐字稿 p.190–196、Grammaire en dialogues p.12）；日常生活對得上一半；寵物類沒有完整對話；整理出 15 條課本裡的追問句型。另更正 Q5：Grammaire en dialogues 第 18 章不在 PDF 裡。`research/2026-10-22_口說T2四類課本素材索引.md`
  **Q12 口說 T2 缺口四類的課本素材索引**（排程自補）：依 Q5 報告，替上課進修、工作、寵物、日常生活四類，從 `assets/` 的《Communication essentielle A2》等教材找現成對話／句型頁碼，寫 `research/2026-10-22_口說T2四類課本素材索引.md`（只列頁碼與原文出處，不自創）。

> 清單快用完時：排程可以自己補 3 項新題，但只能補「研究／稽核／草稿」類，補的時候在項目後面標「（排程自補）」。
