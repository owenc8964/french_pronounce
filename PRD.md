# PRD — 文法學習框架（Grammar Path）

> 2026-07-11 與 Owen 確立。動機：Owen 回饋「記不熟就直接進考題，一直把正確錯誤的答案混在一起；有時候題目出錯又一直被洗錯的選項」。現有系統只有「測驗」沒有「學習」——筆記看完直接被丟進考題，中間沒有階梯；且低熟練度時選擇題的錯誤選項會污染記憶（negative suggestion effect）。

## 誰用、要解決什麼

Owen（A1→A2）。文法題錯誤率高、多規則疊加時互相干擾、錯誤選項洗腦。要一個「每個文法點都有明確學習階段」的大框架，取代「直接進考題」。

## 已確認的三個設計決定（Owen 拍板）

1. **已學過的文法點全部重走一遍**（不是只挑弱的）——初始狀態全部設在第2階段。
2. **半開卷練習沿用現有題庫**（questions.js），換介面呈現，不另寫新題組。
3. **🚩「這題有問題」一鍵停用待審機制這次一起做**。

## 五階段狀態機（每個文法點一個狀態）

| 階段 | 名稱 | 做什麼 | 過關標準 |
|------|------|--------|----------|
| 0 | 未開課 | 課程還沒教到（B1/B2佔位） | 教到該課自動進入階段1 |
| 1 | 📖 理解 | 讀 french_notes 對應課次 | 手動打卡「我讀過了」 |
| 2 | 🪜 半開卷 | 規則卡固定顯示在畫面上方＋做填空/翻譯題（**絕不出選擇題**），答錯立即示範規則怎麼套用 | 一輪6題首次作答 ≥80% |
| 3 | 🎯 遮規則 | 同題池，規則卡收起（答錯才彈出） | 一輪6題首次作答 ≥80% |
| 4 | 🧪 考題 | 現有 quiz.html 混考＋SRS | 該點所有topic正確率 ≥75% 且 ≥5題次（沿用CLB判定標準）→ 顯示「熟」 |
| 5 | ⚡ 反射 | 限時反射（動詞類由 verb_sprint 既有數據自動點亮；其他類 v2） | verb_sprint 反射判定 |

- 答錯的題排到該輪最後重考，磨到全對才能結束該輪（沿用 sentence_drill 的包尾重試邏輯）。
- 每階段提供「我已經熟了→跳過」手動按鈕（不強迫，符合既有設計哲學）。
- 階段 2/3 只出**打字題**（fill/trans/gender，即沒有 opts 的題），杜絕錯誤選項污染。

## 文法點清單（19個現役＋13個未開課）

現役19個 = map.html 已解鎖的13個 gram tile ＋ 6個新增點（已教過但地圖上沒有對應文法格的）：

| 新增點 id | 名稱 | 涵蓋 topics |
|-----------|------|-------------|
| determinants | 限定詞（所有格/指示詞） | possessives, family-possessives, demonstrative-adj |
| reflechis | 反身動詞 | reflexive-verbs |
| imperatif | 命令式 | imperative-mood |
| prepositions | 介係詞（國家/地點/交通） | preposition-country, preposition-place-transport, prepositions-lieu2 |
| adjectifs-accord | 形容詞性數配合＋位置 | adjective-agreement, adjective-position |
| duree-temps | 時間表達（durée） | duree |

既有13個 tile 的 topic 對應（含歸併決定）：etre-avoir（+cest-il-est）、er-verbs、articles、pronouns（+pronoms-toniques/cod-pronouns/on-vs-nous/pronom-y）、questions（question-words）、comparaison、conseils（giving-advice/ilfaut-devoir/interdiction-demande）、ir-re（+irregular-verbs-3rd-group/pouvoir-vouloir）、passe（passe-compose/passe-recent）、imparfait、futur-proche、negation（+frequency-adverbs/intensite）、relatifs（qui-que）。

純詞彙/情境類 topic（vocab-*、greetings、numbers、social-invitations…）**不納入框架**，quiz 行為照舊不受影響。

⚠️ 題池偏薄的點（之後補題）：relatifs 非選擇題僅3題、duree-temps 僅4題、imparfait 僅5題。

## 使用者流程

1. **入口 = map.html「📐文法大局觀」**：每格顯示目前階段 badge；點格 → 面板顯示「下一步：去半開卷練習」按鈕 → 跳 gram_trainer.html?point=xxx。
2. **gram_trainer.html（新頁）**：依該點階段自動進入 2 或 3；規則卡（中文要點＋法文例句可發音）＋一輪6題；輪末總結→過關升階／未過關重練。
3. **dashboard 今日處方步驟②** 改指向文法路徑：自動推薦「階段最低、錯誤率最高」的點，guided=1 直接開練。完成一輪 = 步驟②完成（沿用 clb7_quiz_done/clb7_quiz_log，歷史統計不斷裂）。
4. **quiz.html 策略選課器**：屬於「階段<4」文法點的 topic 顯示 🪜 標記＋建議先去 trainer（軟性提示，不硬鎖——避免癱瘓每日流程；熱身5題不受影響）。
5. **🚩檢舉**：quiz/trainer 答題結果區都有「🚩這題有問題」按鈕，按了該題立即從所有出題池排除，記入待審清單；dashboard 顯示待審數量；Claude 每次 session 開頭審核修復後移回。

## 完成後 Owen 看到什麼

- 文法大局觀每格有階段進度（🪜2/🎯3/🧪4/熟/⚡），一眼看到「每個文法點我走到哪」。
- 每天步驟②不再是直接被丟進考題，而是被安排在正確的階梯上。
- 被檢舉的爛題不會再出現。

# SDD

## 資料

- **新檔 `gram_rules.js`**：`const GRAM_POINTS = [{id, name, icon, zone, cat, lessons:[..], topics:[..], unlocked, rule:{title, why, points:[中文要點], examples:[{fr, zh}]}}]`。19現役＋13未開課（未開課只有基本欄位無rule）。單一真相來源：map文法大局觀、trainer、quiz gating、dashboard 都讀它。`why`（07-11 Owen 要求全系統化）＝「為什麼長這樣」由上而下大局觀，顯示順序 title→why→points→examples，語氣紅線：解釋到規則為止、不說故事。
- **新 localStorage key `clb7_gram_stage`**：`{pointId: {stage, hist:[{d, stage, acc}]}}`（per-key物件，sync自動同步）。沒有記錄的現役點預設 stage=2（= Owen 的「全部重走」，不用寫初始化資料）。
- **新 localStorage key `clb7_flagged_qs`**：`[{id: qId(q), d, src, q}]`（陣列，sync以id去重）。

## 頁面

- **新 `gram_trainer.html`**：掛 session_timer.js＋sync_supabase.js＋懸浮回饋snippet；讀 questions.js＋gram_rules.js；出題過濾 `!q.opts && topics.includes(q.topic) && 未被flag`；判分沿用 quiz 的規則（a 以 | 分隔多答案）；答錯 logWrong（src:'gram'）＋包尾重試；輪末依首次作答正確率升階；完成寫 clb7_quiz_done＋clb7_quiz_log＋立即 ClbSync.push()。
- **改 `map.html`**：文法大局觀分頁改由 GRAM_POINTS 渲染（原26格邏輯替換），格上加階段badge，面板加「去練習→」按鈕。課程地圖分頁不動。
- **改 `quiz.html`**：出題池排除 flagged；結果區加🚩按鈕；策略選課器對階段<4的topic加🪜標記。
- **改 `dashboard.html`**：步驟②改推薦文法點＋連結 gram_trainer；警報區加「🚩待審題目 N 題」。

## 不做（v2）

- 階段5非動詞類的反射練習、干擾配對自動偵測＋對照卡（前一段討論的方向，等框架跑順再上）、locked點的自動解鎖偵測（教到新課時照既有六項連動人工更新 unlocked）。
