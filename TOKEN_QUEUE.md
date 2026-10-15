# TOKEN_QUEUE.md — 週額度快用不完時的「加速工作清單」

> 2026-10-15 建立。Owen：「禮拜三發現周額度使用不到 65% 就要準備快速累積到 85%；週四不到 XX% 就要確保在週四 20:00 前用完。」
> 週額度在**每週四 19:59（台灣時間）**重置。排程 `quota-wed-boost`／`quota-thu-burn` 照這份清單拿工作。
> 這不是為了燒而燒：每一項都要對 Owen 考過 TCF Canada B2（2027-09-19）或對遊戲有實際用處。

## 鐵律（加速模式的每一項都要守）
1. ⛔ 只寫 `research/`、`drafts/`、`tools/` 下的**新檔案**，或本清單、HANDOFF.md 的紀錄段。⛔ 不改正在用的頁面與資料：`quest.html`、`town.html`、`questions.js`、`french_notes.html`、`chunks.js`、`sentences.js`、`story.js`、`gram_rules.js`。要改的寫成「提案／草稿」等 Owen 決定。
2. ⛔ 不 push。每完成一項就 `git add <該項產出> && git commit -m "加速清單：<項目>"`（中文，結尾加 Co-Authored-By 行）。
3. ⛔ 不碰 Supabase 雲端、不寫 `clb7_*`、不開 preview 測寫入。
4. 法文：⛔ 不自創教學句；只有標明「原創例外」的劇情線索可以寫，且每句要標文法點與 `french_notes.html` 的課次出處。
5. 研究要附來源 URL；查不到標「未查證」。
6. 完成一項就在下面打勾 `[x]` 並寫一行結果與檔案路徑。

## 佇列（由上往下拿；平行時一次拿最上面幾項，互不碰同一個檔案）

- [ ] **Q1 第二～四章劇本逐句複核**：讀 `STORY_BIBLE.md` 與 `tools/story_ch2_4_draft.js`（10-15 agent 草稿），每句法文對 `french_notes.html` 查課次、查標準法文正確性，產出 `research/2026-xx-xx_劇本法文複核.md`（✓／✗＋改法）。⛔ 不直接改草稿。
- [ ] **Q2 題庫高信心錯題 → 修正提案**：讀 `research/2026-10-15_題庫品質稽核.md` 的高信心清單，每條對課本快取 `assets/.textbook_cache.txt` 再驗一次，寫成可直接套用的 patch 草稿 `drafts/questions_fix_proposal.md`（題目 index、原文、改成什麼、依據）。
- [ ] **Q3 town.html 修正清單合併**：把 `research/2026-10-15_town_審查.md` 與 `research/2026-10-15_手感與回饋時機.md` 的建議合併成一張去重、依嚴重度排序的實作清單 `drafts/town_fix_plan.md`（每條附行號與改法）。⛔ 不改 town.html。
- [ ] **Q4 下一單元預習單**：照 `preview_unite12.html` 的格式，替 Édito A2 的下一個單元（Unité 13）做預習單 `preview_unite13.html`（內容一律出自課本快取）。
- [ ] **Q5 TCF Canada 口說 Tâche 2／3 弱項素材**：讀 `PRACTICE_ORAL.md` 與 `research/` 既有口說研究，找出「還沒有練習素材」的題型，整理成 `research/2026-xx-xx_口說素材缺口.md`。
- [ ] **Q6 專題「高手怎麼學會的」第三輪待查**：讀 `research/2026-10-12_專題_第三輪_三派之爭與不會很多時怎麼輸出.md` 文末待查清單，挑最有用的 2 題深查，寫新研究檔。
- [ ] **Q7 岔路／路人遭遇資料核對**：讀 `research/2026-10-15_岔路與路人遭遇設計.md` 與 `tools/town_encounters_draft.js`，逐題確認用到的 questions.js／scenes.js 題目真的存在、答案正確，寫 `research/2026-xx-xx_遭遇資料核對.md`。
- [ ] **Q8 路上題庫擴充抽查加量**：讀 `tools/town_field_extra.js`，再抽 60 題人工檢查干擾項是否真的錯，結果追加到 `research/2026-10-15_路上題庫擴充.md`。
- [ ] **Q9 GAME_ROADMAP 研究類佇列**：從 `GAME_ROADMAP.md` 第三節拿「研究」類、尚未完成的項目做（⛔ 實作類不做）。
- [ ] **Q10 TCF 寫作 Tâche 1–3 題型地圖**：讀 `tcf_writing_sujets.js`、`writing_tasks.js`，整理每種題型的評分重點與 Owen 目前缺的句型（只用筆記既有句子當例），寫研究檔。

> 清單快用完時：排程可以自己補 3 項新題，但只能補「研究／稽核／草稿」類，補的時候在項目後面標「（排程自補）」。
