# FIDELIA 自動批改：有沒有包含 TCF Canada、它看什麼、會不會抓到背好的文本（R86）

> 2026-11-05 清晨排程 R86〔排程提案〕。出自 [R83](2026-11-04_背誦條款版本與背過的語塊算多少.md)「還沒回答的問題」第 5 條。
> 用在哪裡：`tcf_writing.html`（第 141–142、442–444 行）、打法協要問的事、之後的寫作批改提示。
> ⚠️ 本 repo 已查過的不重查：R83（手冊版本比對、暫停重新批改）、R81、`research/2026-10-22_TCF寫作題型地圖.md`。

---

## 一、一句話結論

**不用替機器改寫法。** FIDELIA 只碰電腦考的寫作，第二次批改仍是真人；已發表的研究顯示類似系統整體至少跟單一真人一樣準（B2 的 F1 是 .74，但各等級沒有真人可比）；跟等級最相關的東西（錯誤少、用字多樣）也是評分標準本來就要的。

三個要點：

1. **有沒有包含 TCF Canada：很可能有，但沒有官方逐字確認。** 手冊只寫電腦考的「某些」寫作。最接近的證據是 FEI 共同作者的論文：訓練資料涵蓋 TCF 各版本，也按版本（舉例含 Canada）比較過，沒有明顯差異。⚠️ 那篇沒有寫「FIDELIA」這個名字；它是同一套系統是我的推論。
2. **離題它看不出來，得靠真人。** 論文自己寫了：真人抓得到離題這種異常，模型不行。背好的文本、抄題目，⚠️ **沒有任何公開資料講它怎麼處理**。
3. **這次讀檔發現一個該修的舊東西：** `tcf_writing.html` 還是寫「四條」自動不及格，2026-04 版手冊紅框已經是**七條**（多了照抄題目或文件的句子、寫背好的文本、寫在草稿紙上）。

---

## 二、證據

### 1. ⭐ 官方手冊 P 版（2026-04）p.22（我親自看了頁面）

- 註腳 4：電腦考（TCF SO）**某些**寫作，第一次批改可能由 FIDELIA 做，第二次仍是真人。不想被它批改的人，要向考場或其他認可考場申請考紙本。
- 正文：3 個 tâche 各給一個等級，2 位批改者獨立、雙盲，6 個等級跑計算規則；差距很大時一定會第三次批改。
- 評分面向：語言（詞彙範圍、文法、拼字、句子複雜度）、語用（連貫、主題發展）、社會語言（符合情境）。
- 紅框 7 條：字跡（紙本）、字數、離題、有題沒寫、照抄題目或文件的句子、寫背好的文本、寫在草稿紙上。
- ⚠️ 同頁也沒有提 TCF Canada 跟 FIDELIA 的關係。手冊的讀者是所有 TCF。

### 2. ⭐⭐ Wilkens, Cardon, Folny & François 2026，*TACL* 14（全文 p.983–1007，我逐頁看了）

⚠️ **作者含 FEI 的 Folny，資料由 FEI 提供，受資助於跟 FEI 的研究合約**，所以不是獨立評估。結果無法重現，語料也不公開。

| 項目 | 內容 |
|---|---|
| 資料 | 450,000 篇電腦考作文清理、抽樣成 27,683 篇，852 題，164 種語言；另有 961 篇校準語料（每篇 9–55 位評分者）|
| ⭐ 版本 | 明寫 TCF 有一般、歸化居留、**加拿大移民**等版本；p.994：比較各版本（舉例 Canada、法國入籍），**沒有明顯差異** |
| 標準答案 | ⚠️ 考生等級（三題合算），不是單篇等級 ⇒ 模型學的是「寫這種文字的人整體多高」 |
| 模型 | 8 種架構，以法文 BERT（CamemBERT）加 48 個語言特徵；最好的是 soft-labeling（SL）|
| 真人彼此 | κ=.40、QWK=.83；27,683 篇裡同級 14,141、差一級 12,750、差兩級 791 |
| ⭐ 校準語料 | SL：完全一致 .67、差一級以內 .99、QWK .92；隨機兩位真人：.59／.65、.96、.88／.89 |
| ⭐ 各等級 F1（校準語料）| A1 .57、A2 .59、B1 .71、**B2 .74**、C1 .71、C2 .68 |
| 模型偏差 | 期望 ≤B2 時傾向評高，C1、C2 時傾向評低（p.992，核心語料，SL）|
| 公平 | 語言、性別、題型：校準語料無偏差；核心語料只在真人意見分歧的子集有小偏差 |

**48 個特徵跟等級的相關（Spearman；⚠️ 是跟等級的相關，⛔ 不是模型的權重）**：

| 特徵 | ρ |
|---|---|
| ⭐ 錯誤總數 | −.79（其中文法 −.73、拼寫類 −.69）|
| 詞彙多樣性 | .64 |
| A1 字比例 | −.61 |
| 每字音節數 | .60 |
| 語句連貫（LSA）| .46 |
| 句子長度 | .43 |

⚠️ 這是 A1 到 C2 全範圍算的。B1→B2 這一段的相關應該會低很多，論文沒有分段給。
⚠️ 表 7 裡沒有全文總字數這個特徵，但模型本身看得到全文，論文**沒有測過**長度會不會影響。

**它怎麼錯（p.994、附錄 G）**：

- 人判 B1 的文章因為拼字錯很多被判成 A1。人讀得出流暢度和句法，模型被拼字蓋過去。
- 一篇系統性把 e 打成 è 的文章，人判 B1／B2，模型判 A1。作者懷疑是鍵盤問題。
- ⚠️ 但表 9：錯字與模型誤差的顯著相關**只出現在 A1、A2、C2**。B1、B2 的相關是 −.03、−.07，**不顯著**。所以不能說他這個程度會被拼字害到，除非拼字錯到很極端。

**結論段（p.996）**：真人能抓離題這種異常，模型不能；FEI 不斷換題也是要監控的風險。

### 3. Folny 2025，*Revue internationale d'éducation de Sèvres* 98（全文，由抓取工具讀）

27,000 篇校準作文、48 個語言變數加 CamemBERT、六個等級。⇒ 跟 TACL 那篇的數字幾乎一樣，⇒ **我推論兩者是同一套或非常接近**，⚠️ 但 TACL 論文的頁面裡我沒看到 FIDELIA 這個名字。立場：替系統辯護，沒有提供成效數字。意見不合時的處理寫的是「人工雙批」，跟其他來源的「第三次人工」用字不同。

### 4. 其他來源

| 來源 | 內容 | 可信度 |
|---|---|---|
| Alliance française de Kunming，TCF Canada 部落格 | 2024-05 起；真人跟 FIDELIA 70% 一致；對不尋常的文章有困難；同一份永遠同結果 | ⚠️ 備考中心，「一致」沒定義 |
| FEI 官網 FIDELIA、評分頁（⚠️ 擋排程，只看到檢索摘要）| 只有電腦考可能被它批；分歧大才第三次人工；FEI 與考場依 GDPR 和 AI 法規要告知考生 | 官方，但只有摘要 |
| Coexya（廠商）| 混合評估、做過偏差研究，沒有數字 | 行銷頁 |
| Lottridge 等 2021（經 Xiong 等 2026 轉述）| 英語：打亂字序、胡謅、離題、重複文字都騙得過特徵型與 BERT 型，長度影響不小 | ⚠️ 二手，⛔ 不是 FIDELIA |
| Xiong 等 2026（AIME-Con，全文讀到討論段）| 英文短答：意思不變、把語言寫複雜，微調過的 BERT 類模型分數略升（0–3 分制，係數約 .01–.04，調整後 .04–.08）| ⚠️ 英文、科學短答、跟 TCF 差很多 |

### 5. ⚠️ 查不到

- 官方逐字寫「TCF Canada 使用 FIDELIA」。
- 台北法協是紙本還是電腦。目前看到的：Ottawa 兩種都有，吉隆坡紙本，**台北查無**。
- FIDELIA 對背好的文本、抄題目、換關鍵字範本的處理。

---

## 三、推論（我的，不是研究結果）

- **背好的文本**：FIDELIA 是語言特徵與語意模型，只看一篇，公開資料沒有比對範本的跡象。⇒ 背好的文本更可能由第二位真人或另外的比對抓到。⚠️ **不代表可以背**：第二位還是真人，條文也寫得很清楚，而且現在收到成績後不能申請重新批改（R83）。
- **第三次批改可能不常發生**：論文寫人工雙評差超過一級才第三評，模型跟等級差一級以內已經 .99。⚠️ 那是模型對標準答案，不是模型對真人，FIDELIA 實際門檻也沒有公開。

---

## 四、各家族怎麼看

| 家族 | 立場 | 對這題 |
|---|---|---|
| **H 修訂循環** | 自己寫的改到對 | ✅ 錯誤是最強的相關；也是真人標準的一部分 |
| **A 刻意練習** | 把常錯的點自動化 | ✅ 同上，尤其拼字與重音 |
| **I 任務型** | 把事情辦成 | ✅ 離題要靠人抓，但真人會抓；任務完成度仍是評分面向 |
| **考試攻略派**（備考站） | 寫長句、塞難字 | ⛔ 論文的相關不等於操作建議；Xiong 的小效果是英文短答 |
| **L 可懂度工程** | 先修害人讀不懂的 | 🔸 論文例子支持：人讀得懂、機器不一定，拼字極端時才有差 |

---

## 五、這對系統的具體設計決定

1. ⭐ **⛔ 不做「給機器看」的訓練**：不教塞難字、不教拉長句子。評分標準和機器相關的東西方向一樣，就照原本的練。
2. ⭐ **`tcf_writing.html` 第 141–142 行與第 444 行的「四條」改成七條**〔B 類小改；排程只能自補研究題，⇒ 留給互動 session〕：加「照抄題目或文件的句子」「寫背好的文本」「寫在草稿紙上」。第 444 行批改提示要多檢查前兩條。⚠️ 字句照 P 版 p.22。
3. **重音打字**〔先確認，再決定〕：`tcf_writing.html` 目前查不到重音輸入輔助。只有他考電腦考才有意義，⇒ 先問法協是紙本還電腦；是電腦考就要知道考場鍵盤怎麼打重音。⚠️ 表 9 指出 B1、B2 的影響不顯著，⇒ 這是防極端，不是主力。
4. **報名時的選擇**：有得選的話，紙本或電腦都不必為了 FIDELIA 改。⚠️ 紙本還有字跡這條風險；電腦考可能只有電腦能選。這是實務判斷，⛔ 沒有研究比較兩者分數。
5. **`HANDOFF.md` 的考試段不用改**；打法協的問題清單已經有「紙本或電腦」（第五節 R83 條），這篇只補一句：順便問考場鍵盤。

---

## 六、要問 Owen 的

1. ⏸ 打法協時多問一句：如果是電腦考，鍵盤是哪一種、重音怎麼打（跟 R83 的問題一起問）。
2. 📥 選做：FEI 官網的 FIDELIA 頁擋排程，要確認 TCF Canada 有沒有明寫，可以用瀏覽器開這頁看一眼：https://www.france-education-international.fr/article/fidelia-la-solution-daide-la-correction-automatisee

---

## 七、還沒回答的問題

1. ⭐ **官方是否明寫 TCF Canada 使用 FIDELIA**：FEI 官網擋排程。
2. ⭐ **台北法協紙本還是電腦**：只能問。
3. **FIDELIA 對範本、背誦、抄題目的處理**：查無，也可能不公開。
4. **B1 到 B2 這一段，哪些特徵最能區分**：論文沒有分段；`cental.uclouvain.be/fabra` 有特徵清單，但要資料才算得出來。⇒ 這是他寫作要往哪裡加力的真正問題，文獻可以再查法文 B1／B2 寫作區分特徵。
5. **70% 的定義與資料年份**：只有備考站與官網摘要。
6. **紙本與電腦考的成績差異**：本篇沒有查。

---

## 來源

1. ⭐ France Éducation international. *Manuel du candidat au TCF*, Version P, avril 2026, p.22（看頁面）. https://www.univ-smb.fr/accents/wp-content/uploads/sites/9/2026/07/manuel-du-candidat.pdf
2. ⭐ Wilkens, R., Cardon, R., Folny, V., & François, T. (2026). Automated Essay Scoring and Language Certification: Assessing Generalizability, Agreement and Validity for French. *TACL* 14, 983–1007. https://aclanthology.org/2026.tacl-1.44.pdf
3. Folny, V. (2025). L'évaluation automatisée de l'expression écrite en langue française : mythes et réalité. *RIES* 98, 36–40. https://journals.openedition.org/ries/16514
4. Alliance française de Kunming. FIDELIA. https://kunming-afchine.org/decouvrir/nos-blogs/blog-tcf-canada/fidelia-loutil-daide-a-la-correction-automatisee-de-lepreuve-dexpression-ecrite-du-tcf-sur-ordinateur
5. FEI 官網（只有檢索摘要）. https://www.france-education-international.fr/article/fidelia-la-solution-daide-la-correction-automatisee ；https://www.france-education-international.fr/en/node/197
6. Coexya. Fidelia project. https://www.coexya.eu/en/references/fidelia/
7. Xiong, X. 等 (2026). When Language Becomes a Shortcut in Automated Short-Answer Scoring. *AIME-Con* vol.3, 146–163（轉引 Lottridge 等 2021）. https://aclanthology.org/2026.aimecon-sessions.16.pdf
8. Alliance Française Ottawa（兩種考法）. https://af.ca/ottawa/en/tests_et_examens/tcf/ ；Alliance française de Kuala Lumpur（紙本）. https://www.alliancefrancaise.org.my/backup-2024/diplomas/tcf/
