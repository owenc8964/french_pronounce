# RESOURCES_AUDIO — 聽力／口說資源庫（持續增補）

> 2026-07-28 建立。Owen 指示：**聽力資源要一直 survey、截錄下來，資源夠完備才練得出效果**；口說要多找資料來源再定奪。
> 這份是**長期累積的檔案**，不是一次性報告——之後每次找到新資源就往對應等級補一列，並更新「驗證狀態」。
> 系統面的診斷在 [`SURVEY_2026-07.md`](SURVEY_2026-07.md) D 段；這份只管**素材本身**。

## 使用規則（沿用 HANDOFF 07-09 確立的版權原則，新資源一律照辦）

1. **音檔用串流嵌入播放，不下載進 repo**（例外：明確標示可自由下載且授權允許的，如 Audio Lingua）。
2. **題目一律自己原創**，不抄對方網站附的練習題。
3. **逐字稿一律連結出去，不存進 repo**。
4. 課文式的長篇真實文章：**摘要＋短引用**，不逐句全文翻譯（07-26 確立，見 SURVEY C-5）。

**驗證狀態欄位說明**：`✅實測` = 前面 session 或本次已確認音檔可播放／內容可用；`🔎待實測` = 從公開描述判斷可用，但還沒真的開過；`⛔擋` = 有機器人防護，工具抓不到，需人工或改用官方 embed。

---

## 一、現況盤點（系統裡已經有的）

| 來源 | 篇數 | 音檔總長 | 題數 | 等級 | 狀態 |
|------|------|----------|------|------|------|
| Podcast Français Facile（真人語速測驗 r01–r10） | 10 | **794 秒＝13.2 分鐘** | 30 | A1–A2 交易對話 | ✅實測 |
| 自出 TTS 測驗（l01–l08） | 8 | — | 24 | 對齊第 1–13 課 | ✅實測，但 Owen 已表示不要再增加 TTS |
| 文化深掘 Podcast（NotebookLM 自製） | 0 | — | — | — | 空陣列，等音檔 |

**這就是全部。** 13.2 分鐘的真人音檔要支撐一個 700 小時、目標 B2 的計畫——這是 Owen 說「資源不夠」的具體數字。而且題型單一（全部是商店交易對話、全部三選一）。

---

## 二、聽力資源庫（依等級排，可直接開發用）

### 🟢 A2（現在就能用，優先擴充這一層）

| 資源 | 網址 | 內容與規模 | 逐字稿 | 適合做成 | 驗證 |
|------|------|-----------|--------|----------|------|
| **Podcast Français Facile** | podcastfrancaisfacile.com | **300+ 免費對話**＋數千個音檔（對話／課文／發音／文法），涵蓋 A1→B2 | ✅ 公開 | 現有「真人語速測驗」直接續攤，**這是短期擴充的主力**（同一套流程、同一套版權處理，前面 session 已驗證可行） | ✅實測 |
| **Audio Lingua** | audio-lingua.eu ／ audio-lingua.ac-versailles.fr | 法國教育部學區（Versailles）維護的協作音檔庫，**4400+ 筆**（含各語言），母語者錄製的真實生活片段；可用**語言＋CEFR 等級＋長度＋說話者年齡/性別**交叉篩選；有 RSS 可依等級訂閱 | ❌ 多數無逐字稿 | **最適合做「聽大意」與聽寫（Dictée）**——因為沒有逐字稿反而逼真；且明確允許教育與個人用途下載、可轉存到播放器 | 🔎待實測（工具抓取被 403 擋，需用真實瀏覽器開） |
| **TV5MONDE Apprendre le français** | apprendre.tv5monde.com | **2000+ 免費線上練習**，A1/A2/B1/B2 分級，以影片／新聞報導為素材，每則配理解題 | ✅ 多數有 | **最接近考試形態的免費資源**（影音＋分級＋現成理解題）。題目我們仍自己出，但它的分級可直接當我們 `level` 欄位的依據 | 🔎待實測（工具抓取被擋） |
| **Le Point du FLE** | lepointdufle.net/p/comprehensionaudio.htm | 不是內容源，是**FLE 聽力資源的總索引**——把全網免費聽力資源依主題／等級編目 | — | **當作「下一批要挖哪裡」的地圖**，每次 survey 從這裡起手 | 🔎待實測 |

### 🟡 B1（A2 後段試水溫，B1 主力）

| 資源 | 網址 | 內容與規模 | 逐字稿 | 備註 | 驗證 |
|------|------|-----------|--------|------|------|
| **RFI — Journal en français facile** | francaisfacile.rfi.fr | 每週一～五、每日新聞，**逐字稿同步顯示＋官方分級練習（含 A2 級）** | ✅ 官方 | 公認 A2→B1 過渡的標竿素材。**它現在有官方練習與 A2 分級**，比 HANDOFF 07-07 記錄的「太快、先不碰」時期友善很多，值得重新評估提前導入 | ⛔擋（主網域有機器人防護；用官方 Spotify/Apple embed 或人工開） |
| **Français avec Pierre — dialogues** | francaisavecpierre.com | 依 A2/B1/B2/C1/C2 分級的對話集 | ✅ 部分 | 商業站，適合當題材參考，嵌入要留意 | 🔎待實測 |
| **InnerFrench** | innerfrench.com | Podcast，整體 B1+ | 部分被帳號牆擋（07-07 已查證）；YouTube 版逐字稿公開但難度偏高 | HANDOFF 既有結論：**等 B1 前後再解鎖**，維持不變 | ⛔部分擋 |

### 🔵 B2（後期）

| 資源 | 說明 |
|------|------|
| RFI 正常語速新聞、France Info、Arte 等 | 進 B2 階段才碰，此時要的是「無輔助的真實語速」 |
| TV5MONDE B2 級練習 | 同上，銜接自 A2/B1 已熟悉的介面 |

### 🎯 官方考題樣本（任何階段都該做，且**必須做**）

| 資源 | 網址 | 內容 | 為什麼重要 |
|------|------|------|-----------|
| **France Éducation International — 官方 TCF 樣題** | france-education-international.fr/en/test/exemples-epreuves-tcf | TCF 各版本（TCF Canada／Québec／tout public）的樣題，含**compréhension orale**、compréhension écrite、expression orale、expression écrite，PDF 可下載 | **這是唯一「真的長得像考試」的免費素材**。老師的話：「一半的分數是你會什麼，另一半是你多會考試」 | 🔎待實測（本次工具連線失敗，需人工開） |
| **Le français des affaires（TEF 官方）** | lefrancaisdesaffaires.fr | TEF 各科準備說明與樣題 | TEF Canada 的官方出題方 | 🔎待實測 |

**規格重點（本次查到、用來設計題型）**：TCF 聽力＝**選擇題、四選一、39 題、約 35 分鐘**，難度由淺到深連續遞增。
👉 系統目前是「單篇 3 題、可無限重播、只聽一句就答」——**跟考試形態完全不同構**。B1 階段要把測驗改成連續多題、只聽兩次、不看逐字稿作答。

---

## 三、口說：先搞清楚考的是什麼，再決定怎麼練

Owen 說對口說不熟。所以先把**目標規格**釘死，再談方法——不然會練錯東西。

### 3-1. 兩個考試的口說實際長什麼樣（本次查證）

**TEF Canada — expression orale，約 15 分鐘，兩節：**

| 節 | 時間 | 任務 |
|----|------|------|
| **Section A** | 5 分鐘 | 拿到一則**日常廣告／公告**（徵才、服務、休閒、租屋…），任務是**向考官提問，盡可能問出最多資訊** |
| **Section B** | 10 分鐘 | 拿到另一則廣告／公告，**介紹給考官並說服對方參加／接受** |

每節前約有 1 分鐘準備。

**TCF — expression orale，11–12 分鐘，三個 tâche：**

| tâche | 時間 | 任務 |
|-------|------|------|
| 1 | ~2 分鐘 | **無準備**，就指定主題談自己的經驗或看法（獨白） |
| 2 | ~5 分 30 | **模擬互動**：跟扮演角色的考官對話，要自己起頭、維持、收尾 |
| 3 | ~4 分 30 | 依一個觸發素材（圖片／標題）**提出有論據的觀點**，2 分鐘準備 |

評分：滿分 20，換算成 CEFR／ALTE 等級；**流利度、詞彙豐富度、論述連貫性**是拉高等級的關鍵；全程錄音，由考場與 France Éducation International 培訓的評分團隊共同評分。

### 3-2. 我對這件事的判斷（critical thinking，含推翻我自己上一版的提案）

**① 我上一版提的「盲說 2 分鐘」練不到考試要的東西——這點我要修正。**
盲說是「自由講」，但上面四種任務裡，**只有 TCF tâche 1 是自由獨白**。TEF 的兩節、TCF 的 tâche 2/3 全都是**任務型**：提問、說服、互動、論述。練自由發揮，考的是任務執行——中間有落差。
👉 修正後的設計：口說練習**從第一天就要是任務型的**，而且第一個要練的是「**提問**」。

**② 「提問」是全系統投報率最高、卻完全空白的一塊。**
- TEF **Section A 整整 5 分鐘就只做一件事：問問題**。
- TCF **tâche 2** 也要自己起頭、維持對話——同樣靠提問。
- 老師課堂實測的 DELF 第 2 部分（抽字卡向考官提問）也是同一個能力。
- 而系統現有的 `answer_cards.js` 練的是**回答**。**三個考試形態都考提問，系統一題都沒有。**

**③ 提問這件事，系統可以「自動客觀計分」，不需要 AI 也不需要人。**
TEF Section A 的分數本質上跟「你在 5 分鐘內問出多少個有效問題、涵蓋多少面向」高度相關。這是**可以用程式數出來的**：
- 數問號、數疑問詞（qui/que/quoi/où/quand/comment/combien/pourquoi/quel…）
- 檢查是否涵蓋六個面向（價格、時間、地點、條件、對象、方式）
- 檢查有沒有用到 est-ce que／倒裝／語調問句三種問法
👉 這是**全系統第一個能自動評分的口說指標**，不用等 Claude 批改就有數字，dashboard 立刻讀得到、立刻能影響處方。**大腦檢查兩項全過。**

**④ 素材可以一魚兩吃——這是這次最有價值的發現。**
TEF Section A/B 的素材是「**日常廣告／公告**」。而 D-1 查出來系統聽力庫最缺的三種題型之一，正是「**廣播／店內公告、電話留言**」。
👉 **同一批素材（法文廣告、公告、語音留言）既是缺的聽力題型，也是口說 Section A/B 的題目。** 建一條內容管線，補兩個洞。

**⑤ 流利度要靠「同一個任務重複講」，不是靠講更多不同的東西——這有研究支持。**
**4/3/2 技術**（同一段內容講三次，時間從 4 分鐘壓到 3 分鐘再到 2 分鐘）是 SLA 領域被反覆驗證的流利度訓練法：重複＋時間壓縮＋換聽眾三個要素，能提高語速、減少猶豫。研究也指出「換任務重複」（procedural repetition）對語速的效果相當，且對句法複雜度更有幫助。
👉 這對我們**極其適合**：一個計時器 ＋ 同一個題目跑三輪，純前端就能做，零成本、有實證。

**⑥ Shadowing 有效，但目前綁錯素材了。**
系統性回顧的結論：shadowing 對**可理解度、流利度、韻律（節奏/語調）**有效，對**聽力理解**也有效（同步聽說會啟動工作記憶裡的默讀，強化由下而上的音素辨識）；但對「個別音素的準確度」證據不足。
👉 系統現在的 🎬影集精讀把 shadowing 綁在 Extra Français／Peppa Pig 上，**素材跟考試無關、也跟聽力題庫無關**。應該改成綁在**我們自己的聽力題庫**上：今天聽的那一篇，聽完就跟讀 2–3 遍。一份素材，聽力＋口說＋韻律三件事一起做。這也呼應 07-11 查韓國多語者研究時就得到、但一直沒實作的結論：**shadowing 只在聽懂 80%+ 的素材上做**。

**⑦ 自動語音評分不要碰。**
低等級學習者的自動發音／流利度評分準確度不可靠，而且要 API、要錢、要金鑰。系統已經有一條被驗證過的替代路徑：`writing.html` 的「複製 prompt → 貼進 claude.ai → 貼回分數」。口說照抄這條路，配 [`RUBRICS.md`](RUBRICS.md) 已經寫好但從沒被實作的口說尺。
**語音輸入用手機鍵盤內建聽寫**打進 textarea——跨瀏覽器、零相容性風險、零成本，而且產出的就是要送去評分的文字。（不用 `webkitSpeechRecognition`：iOS Safari 支援歷來不穩。）

### 3-3. 口說子系統的設計結論

| 練什麼 | 對應考試 | 系統怎麼做 | 能自動評分？ | dashboard 讀得到？ |
|--------|----------|-----------|:---:|:---:|
| **🃏 提問**（最優先） | TEF Section A／TCF tâche 2／DELF 第2部分 | 抽一則廣告/公告 → 5 分鐘內打出最多問句 → 系統數疑問詞、數面向覆蓋、檢查三種問法 | ✅ **完全可以** | ✅ |
| **📢 說服／論述** | TEF Section B／TCF tâche 3 | 同一則素材 → 講 2 分鐘 → 聽寫成文字 → 複製 prompt 給 Claude 用 RUBRICS 尺批改 | ⚠️ 半自動（字數/秒數/連接詞可自動數） | ✅ 分數欄位 |
| **🗣️ 獨白** | TCF tâche 1 | 現有 Answer Card 的 15 個高頻主題直接用，加計時 | ⚠️ 半自動 | ✅ |
| **⏱️ 流利度** | 全部 | 4/3/2：同一題講 4→3→2 分鐘，記錄每輪詞速 | ✅ 詞速可自動算 | ✅ 趨勢 |
| **🎧 韻律／跟讀** | 全部 | Shadowing 綁在當天的聽力篇章上（聽懂 80%+ 才跟讀） | ❌ | ✅ 完成數 |

---

## 四、下一次 survey 該挖哪裡（給下一個 session 的待辦）

1. **用真實瀏覽器**（工具抓取會被 403／機器人防護擋）實際開這四個站，把可用篇目截錄進本檔：`apprendre.tv5monde.com`、`audio-lingua.eu`、`francaisfacile.rfi.fr`、`lepointdufle.net`。
2. **官方樣題**：把 France Éducation International 的 TCF 樣題與 Le français des affaires 的 TEF 樣題實際下載檢視，確認題型結構（尤其聽力題目呈現方式），據此改寫我們的測驗形態。
3. **廣告／公告類素材**：專門找一批法文的徵才／租屋／課程／活動公告（這是 TEF Section A/B 的素材形態，也是我們最缺的聽力題型），一次補齊聽力＋口說兩邊。
4. 每批新素材入庫時，**一律補 `level` 欄位**（A2／A2+／B1／B2），否則等級進程機制沒有依據。

---

## 參考來源

- [France Education international — Examples of TCF tests](https://www.france-education-international.fr/en/test/exemples-epreuves-tcf)
- [Le français des affaires — Se préparer à l'épreuve d'expression orale du TEF](https://www.lefrancaisdesaffaires.fr/se-preparer-a-lepreuve-dexpression-orale-du-tef/)
- [TCF Canada — Expression orale（題型與計分說明）](https://www.tcfca.com/se-preparer/tcf-canada-expression-orale/)
- [Audio Lingua — banque collaborative d'enregistrements MP3](https://www.audio-lingua.eu/)
- [Audio-Lingua：4400+ 資源（Académie d'Amiens 說明）](https://langues-vivantes.ac-amiens.fr/357-audio-lingua-plus-de-4400-ressources.html)
- [Apprendre le français avec TV5MONDE（Parlons français 介紹）](https://parlonsfrancais.francophonie.org/ressources/apprendre-le-francais-avec-tv5monde/)
- [Podcast Français Facile](https://www.podcastfrancaisfacile.com/)
- [Le Point du FLE — Compréhension audio 索引](https://www.lepointdufle.net/p/comprehensionaudio.htm)
- [RFI — Journal en français facile](https://podcasts.apple.com/us/podcast/journal-en-fran%C3%A7ais-facile/id1573764973)
- [Improving Speaking Fluency Through 4/3/2 Technique and Self-Assessment（TESL-EJ）](https://tesl-ej.org/wordpress/issues/volume26/ej102/ej102a1/)
- [A Systematic Review of Research on the use of Shadowing for Second Language Pronunciation Teaching](https://www.tandfonline.com/doi/full/10.1080/29984475.2025.2546827)
- [Effects of the Shadowing Technique on Listening（ERIC 全文）](https://files.eric.ed.gov/fulltext/EJ1479870.pdf)
