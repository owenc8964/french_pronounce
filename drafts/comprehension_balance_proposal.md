# 理解題 Vrai／Faux 偏差修正提案（加速清單 Q22）

> 2026-10-28 無人值守排程產出。**只是提案**：`exam_items.js`、`town.html` 都沒有動，要 Owen 點頭才改。
> 前一份：`research/2026-10-27_考試樣式理解題核對.md`（Q15）的「整批問題 A」。
> 統計用的工具：`tools/q22_exam_balance.js`（唯讀；`node tools/q22_exam_balance.js` 會印出現況分布、提案後的模擬分布、改寫用詞在筆記第幾課）。

## 一句話結論
否定陷阱 17 題裡 **Faux 佔 71%**，一直按 Faux 就有七成，比亂猜（33%）高一倍多。改 9 題的敘述句（題目原句一個字都不動）就能變成 **Vrai 7／Faux 6／On ne sait pas 4**，一直選同一個最多只剩 41%。「On ne sait pas」選項**已經有了**，建議保留，但要守一條規則：只用在「原句完全沒提到」的資訊。

---

## ① 現況分布（`exam_items.js`，57 題）

| 題型 | 題數 | 各選項答案數 | 最多的那個 | 一直選它的命中率 | 亂猜 |
|---|---|---|---|---|---|
| ⏳ 時間判斷 | 24 | 已經做了 7／現在或習慣 5／之後 6／過去狀態 6 | 已經做了 | 29% | 25% |
| 🚫 否定陷阱 | 17 | **Vrai 3／Faux 12／On ne sait pas 2** | **Faux** | **71%** ⚠️ | 33% |
| 💭 真的還是假設 | 16 | 事實 4／可能 5／想像或願望 7 | 想像或願望 | 44% | 33% |

- **時間判斷**：平均，不用改。
- **否定陷阱**：嚴重偏。這是本提案的主要對象。
- **假設**：輕微偏「想像或願望」（44%）。若照 Q15 的建議先停用 h09（à ta place，還沒學），會變 4／5／6（40%），就夠了，不另外改。

### 為什麼偏差在這個遊戲裡特別傷
看了 `town.html` 的出題與計分（第 1135–1160 行），有兩個放大器：
1. **答得快有獎**：6 秒內答對會跳「一眼看懂」。看到否定就秒按 Faux，七成會拿到這個獎勵 → 系統在**獎勵猜測策略**。
2. **答錯才出中文和原因**：猜 Faux 猜對的那七成，Owen 完全沒看到 why，等於沒學到「否定到底否定了什麼」。

---

## ② 文獻怎麼說

| 主張 | 來源 | 對我們的意思 |
|---|---|---|
| 二選一（是非）題，完全不懂的人平均也能猜對約一半 | Fordham 大學博士論文（1935），猜測對是非題信效度的影響：https://research.library.fordham.edu/dissertations/AAI29282618 | 是非題本來就容易被猜；如果答案還偏一邊，猜的效益更高 |
| 不會的時候偏好選「對」或「錯」的**作答風格**，可以讓是非題總分失效 | Wright & Grosse（1985），是非題信效度分析（只看到摘要／搜尋摘錄）：https://katalog.lib.cas.cz/KNAV/EdsRecord/edsair,edsair.doi...........cf503fe61e233b6e4530eb745409d861 | 答案分布不平均時，作答風格會直接變成分數 → 分數量到的是「習慣按哪個」，不是理解 |
| 出題者和考生都有位置偏好；出題機構會刻意把答案鍵**平衡**，偏好幾乎就消失。答案在偏好位置的題目比較簡單、**鑑別力比較低** | Attali & Bar-Hillel（2003），*Journal of Educational Measurement* 40:109–128；摘要：https://www.nite.org.il/wp-content/uploads/2018/06/e286_abstract.pdf | 正式考試的做法就是平衡答案鍵；不平衡的那邊題目鑑別力下降 |
| 有人質疑：真正拉著考生跑的可能是強干擾項，不是答案位置本身 | Frontiers in Education（2021）簡報：https://www.frontiersin.org/articles/10.3389/feduc.2021.731763/full | 平衡答案之外，干擾項本身也要合理（見下面 n06、n15） |
| 只用「反向計分」題組成的量表，效度約是「正向」題的兩倍；正反平衡的量表表現最好（附和偏誤會壓低效度） | Primi 等（2020），*International Journal of Testing*：https://lpsslab.ucr.edu/wp-content/uploads/2024/09/Primi-True-or-False-Keying-Direction-and-Acquiescence-I.pdf | ⚠️ 這是人格量表不是成就測驗，只能當旁證：方向要平衡 |
| 選擇題撰寫準則：答案位置要變化、平衡；三個有效選項通常就夠 | Haladyna, Downing & Rodriguez（2002），*Applied Measurement in Education* 15(3):309–333；準則整理：https://bookdown.org/stefanmosjos/manualesitems/_book/haladyna-2002.html | 三個選項（Vrai／Faux／On ne sait pas）的設計本身沒問題，問題在答案鍵 |
| 「Not Given」＝文章**沒有提到**這個資訊，不是「看起來不太可能」 | IELTS（IDP）官方準備文章：https://ielts.idp.com/taiwan/prepare/article-n-is-for-not-given/en-gb | 支持 Q15 對 n06、n15 的判斷：靠排除含意推出來的「不知道」不是標準用法 |
| TCF Canada 聽力、閱讀都是 39 題、**四選一**、只有一個答案，沒有是非題 | France Éducation international 官網：https://www.france-education-international.fr/test/tcf-canada?langue=fr | 是非題是**練習工具**不是考試題型；所以不必追求像考試的比例，追求的是「猜不到」 |

### 建議比例
- **文獻沒有給「是非題 Vrai 要幾成」的精確數字**（未查證：常被引用的 Frisbie & Becker 1991 是非題教科書建議回顧、Ebel「假的敘述鑑別力較高」的說法，都只查到書目、沒看到原文，這兩點標「未查證」）。
- 能確定的共識是：**答案鍵要平衡、不能讓單一策略明顯勝過亂猜**。
- 本提案採用的操作標準：**三個選項各 25–40%，任何一個不超過 40% 左右**。On ne sait pas 最難寫得乾淨，放在偏低端（約 1/4）。
- 否定陷阱以後新增題目時，照這個比例補；`tools/q22_exam_balance.js` 可以每次重算。

---

## ③ 改寫提案（只改敘述句 `stmt` 和答案 `ans`；原句 `fr` 全部不動）

> ⭐ 所有新敘述句都屬 CLAUDE.md 內容鐵律 1 的**原創例外**（理解測驗題幹）。課次出處是 `french_notes.html` 的 `id="lesson-N"` 分段，用 `tools/q22_exam_balance.js` 查的（第一次出現的課）。
> ⚠️ 人稱問題（Q15 整批 B）：下表沿用原本「敘述用第三人稱」的寫法。如果 Owen 選了「逐題改成同人稱」，n17 要改成 `Je n'ai pas beaucoup de temps pour manger.`、n12 改 `Nous allons visiter le musée demain.`。

### A. Faux → **Vrai**（4 題）——重點：考「看起來像否定，其實是肯定」

| 題 | 原句（不動） | 原敘述（Faux） | **新敘述（Vrai）** | 為什麼這樣更好 | 課次出處（原創例外） |
|---|---|---|---|---|---|
| n01 | Il ne mange que des légumes. | Il mange de la viande. | **Il mange des légumes.** | 正好考 ne…que＝「只有」不是「不吃」，跟原本的 why 完全對上；看到 ne 就按 Faux 的人會錯 | des légumes 第 13 課；ne…que 第 14／30 課 |
| n09 | Le magasin n'ouvre qu'à dix heures. | On peut faire des courses … à neuf heures. | **À neuf heures, le magasin est fermé.** | 考 ne…qu'à＝「直到…才」→ 之前是關的；敘述句本身沒有否定詞，答 Vrai 要真的懂 | fermé：第 35 課（« les magasins sont fermés le dimanche »）；magasin 第 17 課；heures 第 6 課、neuf 第 7 課 |
| n14 | Ce train ne s'arrête qu'à Lyon. | Le train s'arrête à Dijon. | **Le train ne s'arrête pas à Dijon.** | 敘述句也是否定 → 「兩邊都有 ne，答案卻是 Vrai」，打破「有否定就 Faux」的反射 | s'arrêter 第 27 課；代動詞否定 ne se…pas 第 26 課（Ils ne se sentent pas bien） |
| n17 | Je n'ai que dix minutes pour manger. | Il a beaucoup de temps pour manger. | **Il n'a pas beaucoup de temps pour manger.** | 同上，只多一個 pas，答案就翻轉；why 原本寫「只有十分鐘，很趕」直接適用 | beaucoup de temps 第 33 課；pas beaucoup de 第 29 課 |

（n14 是選配。若 Owen 覺得 Vrai 太多，只改 n01、n09、n17 也可以：Vrai 6／Faux 7／不知道 4，最高 41%。）

### B. Faux → **On ne sait pas**（2 題）——重點：原句完全沒提到

| 題 | 原句（不動） | 原敘述（Faux） | **新敘述（不知道）** | 為什麼不會冤枉 | 課次出處（原創例外） |
|---|---|---|---|---|---|
| n02 | Elle ne travaille plus à la banque. | Elle travaille à la banque maintenant. | **Elle travaille dans un magasin maintenant.** | ne…plus 只說「不在銀行了」，現在在哪工作、有沒有工作都沒提 → 這是 TCF 很常見的陷阱：「不再 A」不代表「現在 B」 | magasin 第 17 課；maintenant 第 16 課 |
| n12 | Nous n'avons pas encore visité le musée. | Ils ont visité le musée. | **Ils vont visiter le musée demain.** | pas encore 暗示「打算去」，但**什麼時候**完全沒說 → 會想選 Vrai 的人正好學到「暗示 ≠ 說了」 | visiter 第 14 課；musée 第 6 課；近未來 aller＋原形 第 4 課；demain 第 1 課 |

⚠️ n12 比 n02 刁一點（「打算去」的暗示很強）。如果 Owen 試玩後覺得被冤枉，退回原本的 Faux 版即可。

### C. 已經是 On ne sait pas、但有爭議的 2 題（沿用 Q15 的建議，答案不變）

| 題 | 原句 | 原敘述 | **新敘述（仍是不知道）** | 理由 | 課次出處（原創例外） |
|---|---|---|---|---|---|
| n06 | Elle ne boit pas de café le soir. | Elle boit du café le matin. | **Elle boit du thé le soir.** | 原本「晚上不喝 → 早上？」一般人會推出有喝，容易冤枉；改成原句完全沒提的「茶」 | thé 第 14 課（le thé est meilleur）；le soir 第 17 課 |
| n15 | Je ne travaille pas le lundi. | Il travaille le mardi. | **Il travaille dans un bureau.** | 同上；工作地點完全沒提 | bureau 第 11 課 |

### D. 答案不變、只修敘述的 1 題

| 題 | 原句 | 原敘述 | **新敘述（Faux）** | 理由 | 課次出處（原創例外） |
|---|---|---|---|---|---|
| n08 | Il n'a rien mangé ce matin. | Il a pris son petit déjeuner. | **Il a mangé ce matin.** | Q15 發現第 17 課筆記就有「早餐什麼都不吃、只喝咖啡」，原敘述答案不唯一 | mangé（複合過去）第 17 課；ce matin 第 32 課 |

### 改完之後（`tools/q22_exam_balance.js` 模擬結果）

| | Vrai | Faux | On ne sait pas | 一直選同一個 |
|---|---|---|---|---|
| 現在 | 3（18%） | 12（71%） | 2（12%） | 71% |
| **提案後** | **7（41%）** | **6（35%）** | **4（24%）** | **41%** |

- Vrai：n01、n05、n09、n11、n14、n16、n17
- Faux：n03、n04、n07、n08、n10、n13
- On ne sait pas：n02、n06、n12、n15

### why（答錯才出的原因）也要跟著改的
（中文說明，不是法文教材，列出方向就好）
- n01：「ne … que＝只有，不是不吃 → 他確實吃蔬菜」
- n09：「ne … qu'à dix heures＝十點才開 → 九點還關著」
- n14：「ne … qu'à Lyon＝只停里昂 → 第戎不停，對」
- n17：「ne … que dix minutes＝只有十分鐘 → 時間不多，對」
- n02：「ne … plus 只說不在銀行了，現在做什麼沒說 → 不知道」
- n12：「pas encore＝還沒去，但沒說哪天去 → 不知道」
- n06／n15：「原句完全沒提到茶／工作地點 → 不知道」

---

## ④ 要不要加「不知道（On ne sait pas）」選項？

**已經有了**（`EXAM_TYPES.neg.opts` 第三個），問題不是有沒有，是怎麼用。建議：

1. **否定陷阱：保留，而且要「養」起來**——目前只有 2 題（12%），而且 2 題都是 Q15 說會冤枉人的那種 → 現在等於是一個「不太會對、對了也覺得被耍」的死選項。提案後 4 題（24%），全部是「原句完全沒提」的乾淨版本。
2. **規則（以後新增題也照這條）**：On ne sait pas ＝**原句完全沒有提到這件事**（照 IELTS 對 Not Given 的定義）。⛔ 不用在「靠排除含意才推得出來」的地方（n06、n15 舊版就是反例）。
3. **時間判斷、假設題：⛔ 不要加**。這兩型問的是「句子用了什麼形式表達什麼時間／真假」，答案永遠在句子裡，沒有「不知道」的情境；硬加只會多一個干擾項。
4. **跟考試的關係**：TCF Canada 本身是四選一、沒有是非題（見 ② 官網來源）。這個三選項格式是練「否定到底否定了什麼」的工具，不是模擬考題型——所以只要「猜不到」就達標，不需要追求某個考試的比例。

---

## 需要 Owen 決定的
1. 照 ③ 改 9 題的敘述句（A 四題變 Vrai、B 兩題變不知道、C 兩題換乾淨的不知道、D 一題修正）？還是只做 A 的三題（不含 n14）？
2. n12（「還沒去博物館」→「明天要去？」不知道）會不會太刁？想先試玩再決定也可以。
3. 「答得快就跳『一眼看懂』」在否定題要不要拿掉？（要改 `town.html`，這次不能動；只是點出它在獎勵猜測。分布改平均之後問題會小很多。）

> 未查證：Frisbie & Becker（1991）對是非題 Vrai／Faux 比例的建議、Ebel 對「假敘述鑑別力較高」的主張——只查到書目，沒看到原文。Wright & Grosse（1985）只看到搜尋摘錄。
> ⛔ 本次沒改：exam_items.js、town.html、french_notes.html、任何遊戲資料檔。
