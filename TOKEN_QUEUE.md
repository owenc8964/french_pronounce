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

- [x] ✅ 10-27 完成：格式全綠、引用句與課本逐字相符；4 個實質問題（facile à manger 中文譯錯、媳婦其實有 la bru、《Trois》plus-que-parfait 是三個不是兩個、pendant／pour 跟 p.19 打架）＋約 7 個小問題，6 點待 Owen 決定。`research/2026-10-27_第44-45課筆記複核.md`
  **Q13 第 44–45 課筆記對課本複核**（排程自補 10-27）：`french_notes.html` 第 44、45 課（B1 p.14–21）每條法文與 `assets/.textbook_cache.txt` 逐條對照，找錯字、漏項、與標準法文衝突處，寫 `research/2026-10-27_第44-45課筆記複核.md`（✓／✗＋改法）。⛔ 不改筆記。
- [x] ✅ 10-27 完成：U2＝p.25–38，三個文法重點（問句口語／正式、表達必須、表達感受）＋節奏群；標出課本 3 處與標準不一致（p.28 sommes→soyons、p.34 少 ne、nous／vous 虛擬式＝imparfait 對不規則不成立）。`drafts/preview_b1_unite2.html`
  **Q14 Édito B1 Unité 2 預習單草稿**（排程自補 10-27）：照 `drafts/preview_b1_unite1.html` 格式，內容只出自課本快取 B1 Unité 2 頁面，產出 `drafts/preview_b1_unite2.html`。
- [x] ✅ 10-27 完成：57 題 0 錯、44 合格、13 要注意（7 題換了人稱、n06／n08／n15 嚴格講是「不知道」、h04／h09 用到還沒上的頁）；否定題 Faux 佔 71%，一直選 Faux 就有七成。`research/2026-10-27_考試樣式理解題核對.md`
  **Q15 考試樣式理解題 57 題核對**（排程自補 10-27）：找出 10-23 新增進礦坑與樹叢的理解題（時間判斷／否定陷阱／真的還是假設），逐題查答案唯一、干擾項真的錯、法文正確、詞彙在已學課次，寫 `research/2026-10-27_考試樣式理解題核對.md`。⛔ 不改題庫。
- [x] ✅ 10-27 完成：五個論證動作都找到課本原句；最集中在 Édito B1 p.117、118、125（alors que／tandis que／pourtant／malgré／bien que 全在 p.125，還沒上到）；d'un côté… de l'autre、en conclusion 整套找不到；第 44 課筆記收 p.15 原句時剪掉了前半句。`research/2026-10-27_口說T3論證句型課本素材索引.md`
  **Q16 口說 T3 論證句型的課本素材索引**（排程自補 10-27）：依 `research/2026-10-22_口說素材缺口.md`（T3 缺表態／論證動作與連接詞），從 `assets/` 教材快取找現成的表態、次級論點、舉例、回應反方句型，只列頁碼與原文，寫 `research/2026-10-27_口說T3論證句型課本素材索引.md`。
- [x] ✅ 10-27 完成：30 招 121 句出處頁碼全對；問題在中文說明，7 招講太窄（其中 4 招會讓咖啡館題目說明跟答案對不上）；AC1:8、AC13:4 四選一可能兩個都對；où 其實 A2 p.44 教過。`research/2026-10-27_升級工坊招式卡出處核對.md`（＋檢查工具 `tools/tmp_q17_check_*.js`）
  **Q17 升級工坊 30 招例句出處核對**（排程自補 10-27）：10-23 升級工坊招式卡宣稱例句全出自課本，逐招查出處頁碼是否屬實、例句法文正確，寫 `research/2026-10-27_升級工坊招式卡出處核對.md`。⛔ 不改遊戲檔。

- [x] ✅ 10-28 完成：引用句與練習答案全對；3 條要修（「名詞主詞不能直接倒裝」太死——Que fait ton frère ? 是對的；-t- 不是「很少」，-er 動詞 il 倒裝都要加；tout au plus 那句中文主詞弄反）＋8 個小問題；check_notes.js 排程環境跑不了。`research/2026-10-28_第46課筆記複核.md`
  **Q18 第 46 課筆記對課本複核**（排程自補 10-28）：`french_notes.html` 第 46 課（B1 p.22–29：交友詞彙、網路禮儀、問句三種語域＋倒裝、必要與義務）每條法文與 `assets/.textbook_cache.txt` 逐條對照，寫 `research/2026-10-28_第46課筆記複核.md`（✓／✗＋改法）。⛔ 不改筆記。
- [x] ✅ 10-28 完成：U3「Cultivons les arts」＝p.41–54；條件式現在時（p.44 六種用法）、ne … que（p.49）、原因與結果（p.51）、字尾子音不發音（p.46）；67 句皆課本原句＋頁碼；標出課本與標準不一致處（條件式字根只講一半、étant donné 等）；PDF 掉 fi／ff 連字處標未查證；沒在瀏覽器打開過。`drafts/preview_b1_unite3.html`
  **Q19 Édito B1 Unité 3 預習單草稿**（排程自補 10-28）：照 `drafts/preview_b1_unite2.html` 格式，內容只出自課本快取 B1 Unité 3 頁面，產出 `drafts/preview_b1_unite3.html`。
- [x] ✅ 10-28 完成：32 題 0 錯、25 題沒問題、7 題要注意（5 題干擾項也是合法法文→兩個都對；第 21 題「名詞不能直接倒裝」講太窄、第 25 題 tu 不加 -t- 理由寫錯）；出處頁碼全屬實。`research/2026-10-28_第46課新題核對.md`
  **Q20 第 46 課新增題目核對**（排程自補 10-28）：commit 834e1b8 進 questions.js 的 +32 題（topic interrogation-registres 等），逐題查答案唯一、干擾項真的錯、法文正確、出處頁碼屬實，寫 `research/2026-10-28_第46課新題核對.md`。⛔ 不改題庫。
- [x] ✅ 10-28 完成：23 段法文一字不改出自 AC1、無文法錯、15 島對得上；地標 15 相符、8 個輕微不符（如 🏡 獨棟但他住大樓、🔭 看遠≠看廣、第 15 站切斷 le plus important, c'est de…）；第 5、17 站放錯區；🦷 等 5 個圖跟別島招牌重複。`research/2026-10-28_自我介紹島核對.md`
  **Q21 自我介紹島地標與句子出處核對**（排程自補 10-28）：commit 65aad85 的口說群島樣品，自我介紹島 23 個地標與島上句子，逐條查法文正確、是否出自 Owen 的島稿（answer_cards／口說島資料）一字不改、地標意思是否相符，寫 `research/2026-10-28_自我介紹島核對.md`。⛔ 不改 town.html。
- [x] ✅ 10-28 完成：否定陷阱題 17 題 Vrai 3／Faux 12／不知道 2；提案只改 9 題敘述句（原句不動、標原創例外＋課次）→ 7／6／4，一直選同一個最多 41%；文獻沒有固定比例，自訂每選項 25–40%；另發現 6 秒內答對跳「一眼看懂」等於獎勵秒按 Faux（要改 town.html，未動）。`drafts/comprehension_balance_proposal.md`（＋`tools/q22_exam_balance.js`）
  **Q22 理解題 Vrai／Faux 偏差修正提案**（排程自補 10-28）：Q15 發現否定題 Faux 佔 71%（一直選 Faux 就有七成），查考試題型的答案分布研究／測驗設計文獻，寫平衡提案 `drafts/comprehension_balance_proposal.md`（哪些題可改為 Vrai 版、只用已學詞彙、不自創教學句，原句改寫需標「原創例外」並標課次）。⛔ 不改題庫。

> 清單快用完時：排程可以自己補 3 項新題，但只能補「研究／稽核／草稿」類，補的時候在項目後面標「（排程自補）」。
