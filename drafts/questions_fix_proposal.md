# questions.js 高信心錯題：修正提案（patch 草稿）

> 2026-10-22，稽核 agent（無人值守）。⛔ 沒有改 `questions.js`，這份只是草稿，要套用請 Owen 確認後再改。
> 來源：`research/2026-10-15_題庫品質稽核.md` 第一節「高信心 28 條」逐條複查。
> 對照方式：每條都用 grep 在現在的 `questions.js` 找到原文；課本用 `assets/.textbook_cache.txt` 找對應頁。
> 來源優先序：**標準法文 ＞ 課本 ＞ 逐字稿**。衝突時下面會標出來。

## 先講結論

- 28 條**全部還在**，沒有一條被修過（10-15 之後 questions.js 只在後面加了第 42、43 課的題，前面的索引沒有位移，10-15 報告的索引跟現在一致）。
- 複查後，**27 條維持「高」**，1 條降為「中」（10-15 第 18 條 Ne stresse pas：現有答案沒錯，只是少收口語說法）。10-15 的第 13、14 條是同一題出現兩次，下面合併成一節，所以編號是 1–27。
- 順手多找到 **1 條**同類錯誤：索引 667（`Ce film est _____ que le livre`）的 aNote 也寫「❌ plus mauvais」，跟第 12 條一樣錯。
- ⚠️ 索引會因為插題而位移，**套用時請用「原文」那欄去搜尋**，不要只靠索引。
- 題目沒有 id 欄位，所以用「BANK 索引（從 0 起算）＋ questions.js 行號（今天的）」定位。

判對規則（影響改法）：`quiz.html` 的 `norm()` 會轉小寫、去掉 `.,!?'`、合併空白，**不去斜線、不去箭頭、不去重音**（quiz.html 第 472–478 行）；`quest.html` 選擇題是 `a.split('|')` 逐字比對選項（第 683 行）。所以：
- 選擇題的 `a` 一定要跟某個 `opts` **一字不差**。
- 打字題裡的逗號會被去掉（`courtes, simples` ＝ `courtes simples`），斜線不會。

---

## 一、確認仍然錯、建議修改（27 條）

### A. 判題邏輯錯：錯的答案也會被判對（7 條）

#### 1. 索引 1419（第 1751 行）condition-si，第 28 課
- 原文：`q:'Si Thomas a son bac, il _____ des études d\'ingénieur.'`、`a:'fera|fait'`、`opts:['fait','fera']`
- 改成：`a:'fera'`（opts 不動）
- 依據：課本 p.75 練習 4e（快取第 120267 行）`Si Thomas a / aura son bac, il fait / fera des études d'ingénieur.`，單一一次的未來事件 → si＋現在式＋未來式 → `fera`。題目自己的 aNote 也寫「il fait 這句不合」。現在兩個選項都會判對，這題不可能答錯。
- 信心：**高**

#### 2. 索引 1135（第 1430 行）qui-que，第 23 課
- 原文：`q:'Le salon est la pièce _____ ils préfèrent et où ils regardent la télévision.'`、`a:'que|qu\''`
- 改成：`a:'qu\''`；aNote 刪掉「（題目空格寫 que 或 qu' 都收）」
- 依據：que 在母音前必須省音（qu'ils）——標準法文規則。課本 p.52 練習 1d（快取第 117365 行）是空格題，沒有給 que 的完整形。
- 信心：**高**

#### 3. 索引 1136（第 1431 行）qui-que，第 23 課
- 原文：`q:'Le salon est la pièce que ils préfèrent et _____ ils regardent la télévision.'`
- 改成：`q:'Le salon est la pièce qu\'ils préfèrent et _____ ils regardent la télévision.'`
- 依據：同上，`que ils` 不是法文。題幹本身在示範錯的寫法。
- 信心：**高**

#### 4. 索引 1283（第 1600 行）comparaison，第 14 課
- 原文：`q:'Les vacances à la campagne sont plus calmes _____ à la mer.'`、`a:'que'`、aNote `…Cahier Corrigés：plus calmes que…`
- 改成：`a:'qu\''`；aNote 改成「比較對象前面用 que，後面是母音 à 所以省成 qu'（plus calmes qu'à la mer）」
- 依據：que＋à 必須省音，標準法文規則。題目在 Cahier A1 p.103 練習 1b（快取第 39699–39700 行）。⚠️ 課本 Corrigés 的文字快取這一行被截斷（第 46269 行只剩 `b. plus calmes`），**沒辦法確認 Corrigés 原文印的是 que 還是 qu'**；不管哪個，標準法文是 qu'。
- 信心：**高**

#### 5. 索引 1590（第 1940 行）pronoms-cod-coi，第 31 課
- 原文：`q:'Tu embrasses ton frère de ma part ? — Oui, je _____ embrasse.'`、`a:'l\'|le'`
- 改成：`a:'l\''`
- 依據：le 在母音前必須省成 l'（je l'embrasse）。題目自己的 aNote 也這樣講。課本 p.108 練習 1b（快取第 124922 行）。
- 信心：**高**

#### 6. 索引 1592（第 1942 行）pronoms-cod-coi，第 31 課
- 原文：`q:'Tu emportes ton réveil ? — Oui, je _____ emporte.'`、`a:'l\'|le'`
- 改成：`a:'l\''`
- 依據：同上。課本 p.108 練習 1d（快取第 124925 行）。
- 信心：**高**

#### 7. 索引 263（第 351 行）vocab-weather-season，第 7 課
- 原文：`a:'courtes, simples|courtes|simples'`（兩個空格）
- 改成：`a:'courtes, simples'`（quiz 會把逗號去掉，打 `courtes simples` 一樣會對）
- 依據：只填一格也被判對。判題邏輯問題。
- 信心：**高**

### B. 判題邏輯錯：對的答案打不出來（6 條）

#### 8. 索引 66–70（第 80–84 行）＋ 85–88（第 104–107 行）＋ 608（第 817 行）type:'gender' 打字題
- 原文例：`q:'sport → 陽性 or 陰性？冠詞是？'`、`a:'陽性 → le sport'`
- 問題：這 10 題沒有 opts，是打字題，但正解是「中文＋箭頭＋法文」；norm 不去箭頭，**幾乎不可能逐字打對**。
- 改成（每題在 a 前面加可以打的寫法，原本的保留在最後）：

| 索引 | 行 | 改成 a |
|---|---|---|
| 66 | 80 | `le sport\|le\|m\|陽性\|陽性 → le sport` |
| 67 | 81 | `la musique\|la\|f\|陰性\|陰性 → la musique` |
| 68 | 82 | `le\|m\|陽性\|陽性 → l'art` ⚠️ 打 `l'art` 看不出陰陽性，所以不收 `l'art` 單獨一個 |
| 69 | 83 | `la\|f\|陰性\|陰性 → l'histoire`（理由同上） |
| 70 | 84 | `le café\|le\|m\|陽性\|陽性 → le café` |
| 85 | 104 | `en France\|en\|陰性\|陰性 → en France` |
| 86 | 105 | `au Canada\|au\|陽性\|陽性 → au Canada`；另外 **hint `字尾子音` 改成 `字尾不是 -e`**（Canada 結尾是母音 -a，aNote 自己也寫 -a） |
| 87 | 106 | `au Mexique\|au\|陽性\|陽性例外 → au Mexique` |
| 88 | 107 | `aux États-Unis\|aux\|複數\|複數 → aux États-Unis` |
| 608 | 817 | `le vestiaire\|le\|m\|陽性\|陽性 → le vestiaire` |

- 依據：判題程式（quiz.html 第 472–478 行）。索引 68、69 只收「le／la／m／f／陽性／陰性」，因為 `l'art`、`l'histoire` 本身看不出陰陽性；⛔ 不收 `le art` 這種不存在的法文。
- 信心：**高**（判題邏輯確定）；hint 那句：**高**

#### 9. 索引 1612（第 1964 行）corps-sante-vocab，第 31 課
- 原文：`type:'fill'`、`a:'30分鐘，étape cruciale de récupération（身體恢復的關鍵階段）'`
- 改成：`a:'30 minutes|30 min|30分鐘|30 分鐘|30分鐘，étape cruciale de récupération（身體恢復的關鍵階段）'`；或整題改成 choose（四個時長選項）
- 依據：判題邏輯，一長串中法混寫不可能打對。原始內容（課文 C 睡眠週期表）沒有在課本快取裡核對（未查證「30 分鐘」本身）。
- 信心：**高**（判題）；數字內容：未查證

#### 10. 索引 297（第 400 行）vocab-clothing-size，第 7 課
- 原文：`q:'「全新的」法文：_____ / _____ （陽性 / 陰性）'`、`a:'neuf, neuve|neuf|neuve'`
- 改成：`a:'neuf, neuve|neuf / neuve|neuf/neuve'`
- 依據：只填一個也判對；照題目的斜線打 `neuf / neuve` 反而判錯（norm 不去斜線）。
- 信心：**高**

#### 11. 索引 1187（第 1492 行）vocab-annonces，第 24 課
- 原文：`a:'du|au|du...au'`
- 改成：`a:'du, au|du au|du...au|du ... au|du / au'`
- 依據：只填一個也判對；`du...au` 被 norm 去掉點之後變成 `duau`，打 `du au` 反而判錯。
- 信心：**高**

#### 12. 索引 256（第 340 行）preposition-place-transport，第 7 課
- 原文：`q:'公車站或地鐵站的兩種說法：l\'_____ 和 la _____'`、`a:'arrêt|station|arrêt et la station'`
- 改成：`a:'arrêt, station|arrêt et station|arrêt et la station|arrêt / station'`
- 依據：同上，只填一個也判對，打兩個字反而判錯。
- 信心：**高**

#### 13. 索引 1017（第 1305 行）adjective-position，第 22 課
- 原文：`a:'bon / français'`
- 改成：`a:'bon, français|bon / français|bon/français'`（`bon français` 會被 norm 當成同一個）
- 依據：唯一正解要打斜線；其他雙空格題都收逗號版。
- 信心：**高**

### C. 題幹或說明裡的法文本身錯（5 條）

#### 14. 索引 137（第 171 行）vocab-shopping，第 4 課
- 原文：`q:'「Je _____ du poisson. (acheter)」填哪個？'`
- 改成：`q:'「J\'_____ du poisson. (acheter)」填哪個？'`（hint 的「je 單數」可不動）
- 依據：填回去變 `Je achète`，應為 `J'achète`（je 在母音前必須省音）。四個選項都是母音開頭，改題幹不影響選項。
- 信心：**高**

#### 15. 索引 2202（第 2610 行）vocab-environnement，第 41 課
- 原文：`q:'Par exemple, tu peux dire que Okinawa, c\'est un _____.'`
- 改成：`q:'Par exemple, tu peux dire qu\'Okinawa, c\'est un _____.'`
- 依據：que 在母音開頭的專有名詞前也要省音（標準法文）。aNote 標「🎙 老師的例子」——這句來自逐字稿，逐字稿的 `que Okinawa` 是語音辨識產物，**以標準法文為準**。`archipel` 本身課本有（快取第 133164 行 `l'archipel (m.)`），答案沒問題。
- 信心：**高**

#### 16. 索引 222（第 287 行）adjective-agreement（gender），第 5 課
- 原文：`q:'_____ entrée (le / la)'`、`a:'l\''`
- 改成：`q:'_____ entrée (l\' / le / la)'`
- 依據：括號只給 le / la，正解卻是 l'，提示把人導向錯的答案。
- 信心：**高**

#### 17. 索引 145（第 181 行）adjective-agreement（gender），第 1 課
- 原文：`aNote:'-in → -ine（de Argentine）'`
- 改成：`aNote:'-in → -ine（d\'Argentine）'`
- 依據：de 在母音前必須省音（同組題就寫 `d'Espagne`）。
- 信心：**高**

#### 18. 索引 1502（第 1844 行）interdiction-demande，第 29 課
- 原文：`aNote:'⚠️⚠️ 肯定命令式後面用<b>重讀代名詞</b>：moi／toi／lui／nous／vous／leur。⛔ 不是 brosse-te'`
- 改成：`aNote:'⚠️⚠️ 肯定命令式的代名詞放動詞後面，<b>只有 me→moi、te→toi 會變</b>（其他 le／la／lui／nous／vous／leur 照原樣）。所以反身動詞對 tu 用 toi：Brosse-toi les dents。⛔ 不是 brosse-te'`
- 依據：標準法文文法（lui、leur 是間接受詞代名詞，不是重讀代名詞；leur 的重讀形是 eux）。題目本身的 a（`toi：Brosse-toi les dents.`）沒錯，只改 aNote。未附外部 URL（通行文法規則，未另外上網查證）。
- 信心：**高**

### D. 「另一個選項其實也對」，跟課本衝突（6 條＋順手找到 1 條）

#### 19. 索引 967（第 1252 行）paires-confusables，第 14 課
- 原文：`q:'「更糟」的法文是？'`、`a:'pire'`、`aNote:'❌ plus mauvais ✅ pire。…'`、`opts:['plus mauvais','pire']`
- 改法（二選一）：
  - (甲) 改問法：`q:'mauvais 有一個「特殊形」的比較級，是哪個？'`，a 維持 `pire`，aNote 改「mauvais → plus mauvais 或 pire 都可以；pire 是特殊形，跟 bon→meilleur 同一組」
  - (乙) 題目不動，`a:'pire|plus mauvais'`，aNote 刪掉「❌ plus mauvais」
- 依據：課本 Édito A2 比較級 Exceptions 表兩處都寫 `mauvais(e) → plus mauvais(e)/pire`（快取第 71361、116659 行），例句 `Mon lave-vaisselle est pire / plus mauvais que mon four.`（第 116661 行）。題庫第 1195 題也說兩個都可以 → 題庫自己互相矛盾。⭐ 推薦 (甲)：兩選一的題如果兩個都對就沒意義。
- 信心：**高**

#### 19b.（10-15 報告沒列，今天順手找到）索引 667（第 899 行）comparaison，第 14 課
- 原文：`q:'Ce film est _____ que le livre.（更糟）'`、`a:'pire'`、`aNote:'mauvais → pire；❌ plus mauvais'`
- 改成：`a:'pire|plus mauvais'`、`aNote:'mauvais → pire 或 plus mauvais（兩個都對，pire 比較常用）'`
- 依據：同第 19 條（課本快取第 71361、116659–116661 行）。
- 信心：**高**

#### 20. 索引 990（第 1275 行）＋ 索引 948（第 1228 行）「我看了一部電影」voir 還是 regarder
- 原文（990）：`a:'regarder'`、`aNote:'regarder＝刻意盯著看、專注在上面（電影一定用這個）…'`、`opts:['voir','regarder']`；948 同題，aNote 稍不同
- 改法：兩題都換掉例句，或兩題 a 都改成 `voir|regarder` 並把 aNote 的「電影一定用這個」刪掉。⛔ 依專案鐵律不由我自創新例句；建議從課本挑一句只有 regarder 成立的（例如課本裡 regarder la télévision 這類），由 Owen 決定。
- 依據：課本大量用 `voir un film`：`Hier soir, Émilie a vu un film`（快取第 10268 行）、`Ça te dit de voir un film en plein air ? Hier, j'ai vu…`（第 23466 行）、`voir un film`（第 36404 行）、`j'ai vu un film de Jim Jarmusch`（第 148334 行）。題庫第 980 題的 aNote 自己也寫「voir ＋ un film」→ 互相矛盾。
- 信心：**高**

#### 21. 索引 669（第 901 行）comparaison，第 14 課
- 原文：`q:'形容「舊旅館（物品）」用哪個字？'`、`a:'ancien'`、`aNote:'物品用 neuf/ancien；人用 jeune/vieux'`、`opts:['ancien','vieux','jeune','âgé']`
- 改法：`a:'ancien|vieux'`，aNote 改成「物品用 ancien 或 vieux 都可以（un vieil hôtel、un hôtel ancien）；⚠️ ancien 放名詞前＝『以前的』（mon ancien hôtel＝我以前住的旅館）」；或把干擾項 vieux 換成別的字（如 `neuf`）
- 依據：課本 `Le restaurant Chez Jeanne est plus vieux que le café de la Plage`（快取第 40343 行）、`avec leur vieille voiture`（第 5644 行）、`une vieille voiture`（第 149158 行）→ vieux 用在物品是課本自己的用法。「人用 vieux、物用 ancien」這條規則是錯的。
- 信心：**高**

#### 22. 索引 976（第 1261 行）paires-confusables，第 18 課
- 原文：`q:'「他依然在打拳」（習慣持續）——Il fait _____ de la boxe.'`、`a:'toujours'`、`aNote:'toujours 強調「持續狀態」（依然）；encore 強調「重複發生」（又一次）…'`、`opts:['encore','toujours']`
- 改法（二選一）：
  - (甲) `a:'toujours|encore'`，aNote 改「toujours／encore 都可以表示『還在、依然』（課本這句用 toujours）；encore 另外還有『又一次』的意思：Il a encore gagné」
  - (乙) 換一個 encore 不能用的句子（由 Owen 從課本挑，我不自創）
- 依據：課本否定表（快取第 112833–112834 行）`un changement de situation : Il fait toujours de la boxe. (= Il continue).` 對應的那一格寫 `toujours / encore ≠ ne… plus`——**課本自己把 toujours 和 encore 列在同一格**，所以 encore 也表示「依然」。題目的例句是照課本寫的（toujours 沒錯），錯的是 aNote 說 encore 只表示「又一次」、以及把 encore 當錯誤選項。
- 信心：**高**（aNote 錯）；改法選 (甲) 或 (乙)：中，請 Owen 決定

#### 23. 索引 491（第 660 行）physical-description，第 10 課
- 原文：`q:'頭髮是棕色要用哪個詞？'`、`a:'brun / brune'`、`opts:['brun / brune','marron','châtain','blond']`
- 改法：干擾項 `châtain` 換掉（例如 `roux`——課本有沒有這個字未查證；或用 `gris`，課本第 117784 行有 `/châtains /gris`），aNote 補「châtain＝一般的棕髮（偏淺）、brun＝深褐近黑；兩個都是頭髮的顏色」。或 `a:'brun / brune|châtain'`
- 依據：課本 châtain 一直用在頭髮：`J'ai les cheveux châtains`（快取第 37246 行）、`les cheveux longs et châtains`（第 43050 行）、`une barbe et une moustache châtains`（第 36684 行）；brun 也有：`Il/Elle est brun(e). = Il/Elle a les cheveux bruns.`（第 95098 行）。所以 brun 和 châtain 都對，現在 châtain 被當成錯的。
- ⚠️ 選 `a:'brun / brune|châtain'` 的話，quest 的選擇題逐字比對會讓兩個選項都對（等於兩個正解），所以比較推薦換干擾項。
- 信心：**高**

### E. 選項洩漏答案、重複（3 條）

#### 24. 索引 498（第 669 行）character-adjectives，第 10 課
- 原文：`opts:['gentille','gentile','gentile','gentils']`
- 改成：`opts:['gentille','gentile','gentil','gentils']`
- 依據：選項 `gentile` 重複兩次。
- 信心：**高**

#### 25. 索引 1410（第 1741 行）condition-si，第 28 課
- 原文：`a:'mets（現在式）——en général 表示這是習慣'`、`opts:['mets（現在式）——en général 表示這是習慣','mettrai（未來式）','mettais（imparfait）','mettre（原形）']`
- 改成：`a:'mets（現在式）'`、`opts:['mets（現在式）','mettrai（未來式）','mettais（imparfait）','mettre（原形）']`，把「en général 表示這是習慣」移進 aNote 開頭
- 依據：正解自帶解釋，一眼就知道是它。⚠️ a 和 opts[0] 一定要同時改、一字不差，不然 quest 會判不到正解。
- 信心：**高**

#### 26. 索引 1482（第 1821 行）pronoms-y-en，第 29 課
- 原文：`a:'J\'en ai pas.（ne 被吃掉）'`、`opts:['J\'en ai pas.（ne 被吃掉）','Je n\'ai pas en.','J\'ai pas en.','Je en ai pas.']`
- 改成：`a:'J\'en ai pas.'`、`opts:['J\'en ai pas.','Je n\'ai pas en.','J\'ai pas en.','Je en ai pas.']`，aNote 開頭加「ne 被吃掉。」
- 依據：只有正解帶中文說明。a 和 opts[0] 要同時改。
- 信心：**高**

### F. 降為「中」的（1 條）

#### 27. 索引 643（第 868 行）imperative-mood，第 6 課
- 原文：`type:'trans'`、`q:'不要緊張！（對 tu）'`、`a:'Ne te stresse pas !'`、`aNote:'se stresser = 緊張（反身動詞）…'`
- 改成：`a:'Ne te stresse pas !|Ne stresse pas !'`，aNote 補「口語也常說 Ne stresse pas !（stresser 不加 te）」
- 依據：`Ne stresse pas !` 是口語非常常見的說法，打這個會被判錯。⚠️ 但 `Ne te stresse pas !` 也是對的，所以這題現在**不是錯**，只是少收一個答案。stresser 不及物用法屬口語——**未查證**（沒有上網查 Larousse／Robert；課本快取裡也沒找到這兩句，只有第 14799 行 `stresser` 原形）。
- 信心：**中**（10-15 報告列「高」，複查後降級：現有答案沒錯）

---

## 二、已被修過、或複查後其實沒錯的

- **已被修過：0 條。** 10-15 列的 28 條今天全部原樣還在 questions.js。
- **複查後其實沒錯：0 條。** 只有第 27 條（Ne te stresse pas）降級：現有答案是對的法文，問題只是少收一個口語說法。
- 第 22 條（toujours／encore）：題目例句本身照課本、沒錯；錯的是 aNote 和「encore 算錯」這件事。

## 三、套用時注意

1. 選擇題改 `a` 時，對應的 `opts` 那一項要**同時改成一模一樣**（第 25、26 條）。
2. 改完建議重跑 `node tools/audit_questions.js`，確認 C1_multiCorrect、C4_partialAlt、C4_untypable、C4_elisionAlt 都歸零（本次 session 不能執行 node，**沒有實跑驗證**）。
3. 第 20、22、23 條的「換例句」選項，依專案鐵律要從課本或 Owen 的材料挑，我沒有自創。

## 四、做法與限制

- 定位：用 grep 在今天的 questions.js 找原文，再數 `{ lesson:` 開頭的行換算 BANK 索引；換算結果跟 10-15 報告的索引全部一致（例如第 1751 行＝索引 1419）。
- 這次 session 不能跑 node（被拒），所以**沒有用程式模擬判題**，判題結論是讀 `quiz.html` 第 472–478 行、`quest.html` 第 683 行的程式碼推出來的。
- 課本快取行號是今天的 `assets/.textbook_cache.txt`（已加進 B1 等新書，跟 10-15 報告引用的行號不同）。
- 沒有上網查外部字典，沒附外部 URL 的文法規則屬通行規則；個別需要外部佐證的（第 27 條）已標「未查證」。
