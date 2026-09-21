# drafts/story_lesson29.md — D4：第 29 課掛進主線的對照與候選題（2026-09-22 清晨排程）

> 對應 `GAME_ROADMAP.md` 佇列項 **D4**（AUDIT 缺口 2：主線 12 章沒有覆蓋第 29 課）。姊妹篇：[story_lesson34.md](story_lesson34.md)、[story_lesson33.md](story_lesson33.md)。
> ⛔ 這份只是**建議與候選**，沒有改 `story.js`／`questions.js`／`situations.js`。⏸ 入庫前等 Owen 核對。
> 來源紀律：新候選題的法文**逐字取自** `sentences.js`（S_L29_x）或課本 Édito A2（p.85 食譜、p.86 quantités／en、p.89 obligation／interdiction），⛔ 沒有自創任何法文句；中文旁白與 hint 可原創。

---

## 一、結論（先看這段）

1. 第 29 課題庫有 **38 題、3 個 topic**（`vocab-aliments` 18／`pronoms-y-en` 11＋第 21 課的 13／`interdiction-demande` 9＋第 11 課的 5），**缺的是主線沒有節點指向它們**。
2. 跟第 33／34 課不同，這一課的 topic **有一半其實已經在主線的門口**：`interdiction-demande` 早就列在 ch6 的 `topics`（`story.js:254`）與 `situations.js:59` 的 `sante` 情境裡，只是**沒有任何節點用它**；`vocab-aliments` 與 `pronoms-y-en` 則沒有情境（`situations.js:16–19` 刻意把純文法 topic 排除在情境外，但 `story.js` 的節點本來就可以只掛 topic——ch12 的 `strategie-lecture` 節點就是前例，`story.js:484`）。
3. 引擎門檻：**choose ≥ 4、產出型 ≥ 1**（`quest.html:3121`）。以整個 topic 計：

| topic（整個題庫） | choose | fill | trans | 問題 |
|---|---|---|---|---|
| `vocab-aliments` | 15 | **1** | **2** | ⚠️ 產出型幾乎是空的：填空只有 `Préchauffez le four` 一題，每次抽「大招」都是同一題；中翻只有 2 題 |
| `pronoms-y-en` | 9 | 13 | **2** | ⚠️ 中翻只有 2 題（第 29 課的 1 題＋第 21 課的 1 題），en 的「一整句回答」練不到 |
| `interdiction-demande` | 7 | 4 | 3 | ✅ 夠 |

→ 新候選 **13 題**補這兩個洞（fill 6／trans 7），⭐ 每題有出處。

---

## 二、建議掛到哪裡（3 個新節點）

> ⚠️ **節點以「索引」記進度**（`quest.html:1534–1544`）。建議插在該章 **boss 之前**：在途玩家不受影響；已通關章節，新節點會對到舊 boss 的索引而顯示成「已完成」——⚠️ **我沒有開瀏覽器驗證這個顯示行為**，入庫時請互動 session 確認。
> 章的 `lessons` 欄也要補 29（`quest.html:3126`：題量不足時的補題範圍）。

| # | 掛在 | 節點型 | sit／npc | topic | npcLine | 旁白構想（原創中文，⛔ 不含法文） | 為什麼掛這裡 |
|---|---|---|---|---|---|---|---|
| A | **ch3 marche**（Étienne 的 talk 之後、boss 之前） | `trial` | `courses`／Sophie | `pronoms-y-en` | `S_L29_1`（Tu manges de la viande ? — Non, je n'en mange pas.） | Sophie 又問了一次肉。這次她不想再聽你重複那個名詞——她要你用一個小字把它換掉。⭐ 這一格練的是「說話不重複」，而且是整章冠詞主題的延續。 | ⭐⭐ ch3 第 2 節點就是 Sophie 問肉、你用否定回答（`S_L5_2`，主題正是「否定句冠詞變形」）；`french_notes.html:9786–9789` 的 en 表**就是按冠詞種類分**（部分冠詞→不定冠詞→精確量→不精確量），en 是同一條冠詞線的下一站 |
| B | ch3（緊接 A，⏸ 可選） | `talk` | `courses`／Sophie | `vocab-aliments` | `S_L29_9`（Versez la pâte sur les fruits.） | Sophie 攤位上有紅色的小果子。她說週末要做一道甜點，邊裝袋邊念步驟——全是動詞開頭的短句，跟 Karim 的路線指令是同一種語氣。 | 課本 p.85 的食譜（clafoutis）用的三種紅果（framboise／mûre／myrtille）正是市場攤位上的東西；食譜全是命令式，把第 4 章學的命令式接回「吃」。⚠️ 但 ch3 目前 4 個節點，A＋B 會變 6 個，超過 `story.js` 檔頭「3–5 個」；若只留一個，**留 A** |
| C | **ch4 la-ville**（第 3 節點 Karim 談交通工具之後、boss 之前） | `trial` | `se-deplacer`／Karim | `interdiction-demande` | `S_L29_7`（Dans le métro taïwanais, il est interdit de manger et de boire.） | 車上貼著一張規則牌，Karim 用下巴示意你讀。⭐ 規則牌只有兩種說法：禁止的、必須的——而「禁止」後面的動詞前面**要再帶一個 de**。 | ⭐ 這個 topic 的題庫**本來就由兩課組成**：第 11 課（Défense de fumer／Prière de…，也是公共場所告示）＋第 29 課；ch4 的 `lessons` 已含 11，掛在這裡兩課的題自然湊成一組。備案：改掛 ch6 Baptiste（`S_L29_8` Lavez-vous les mains !，ch6 的 `topics` 早已列了這個 topic 但沒節點用） |

### 對應的 `story.js` 節點草稿（僅供入庫時複製，⛔ 尚未寫入）

```js
// ch3 marche，boss 之前
{ type:'trial', sit:'courses', npc:'courses', topic:'pronoms-y-en', npcLine:'S_L29_1',
  text:'Sophie 又問了一次肉。這次她不想再聽你重複那個名詞——她要你用一個小字把它換掉。'
    +'⭐ 這一格練的是「說話不重複」。' },
{ type:'talk',  sit:'courses', npc:'courses', topic:'vocab-aliments', npcLine:'S_L29_9',   // ⏸ 可選
  text:'Sophie 攤位上有紅色的小果子。她說週末要做一道甜點，邊裝袋邊念步驟——'
    +'全是動詞開頭的短句，跟 Karim 的路線指令是同一種語氣。' },
// ch4 la-ville，boss 之前
{ type:'trial', sit:'se-deplacer', npc:'se-deplacer', topic:'interdiction-demande', npcLine:'S_L29_7',
  text:'車上貼著一張規則牌，Karim 用下巴示意你讀。⭐ 規則牌只有兩種說法：禁止的、必須的——'
    +'而「禁止」後面的動詞前面要再帶一個 de。' },
```
（章的 `lessons` 補：ch3 加 29、ch4 加 29；`topics` 補 `pronoms-y-en`、`vocab-aliments`。）

---

## 三、每個節點的 3–4 題

> 「既有」欄的行號是 `questions.js` 目前的行號（2026-09-22）；題庫長大會位移，請用 `q` 開頭文字搜尋。

| 節點 | 既有題（可直接用） | 新候選（見第四節） |
|---|---|---|
| A `pronoms-y-en` | 第 29 課：choose 1381／1382／1384／1387／1388／1389／1391；fill 1383／1385／1386；trans 1390。（第 21 課另有 13 題 fill／choose，同 topic 會一起進 pool） | **trans×4（N1–N4）** |
| B `vocab-aliments` | choose 1403–1415／1418–1420（15 題）；fill 1407；trans 1416／1417 | **fill×4（N5–N8）、trans×2（N9、N10）** |
| C `interdiction-demande` | 第 29 課：choose 1393／1394／1396／1397／1400；fill 1395／1401；trans 1398／1399。（第 11 課另有 5 題 627–631） | fill×2（N11、N12）、trans×1（N13） |

---

## 四、新候選題（沿用 `drafts/story_questions.js` 格式）

```js
var STORY_L29_DRAFTS = [

  /* ── pronoms-y-en：補 trans×4（整個 topic 原本只有 2）──────────────────────── */
  { lesson:29, topic:'pronoms-y-en', type:'trans',  /* N1 → 節點 A */
    q:'你吃肉嗎？——不，我不吃。（回答用 en）', hint:'en 取代 de la viande；否定時夾在 ne 跟動詞之間',
    a:"Tu manges de la viande ? — Non, je n'en mange pas.", aNote:'⭐ 課本 p.86 Fonctionnement 範例對話。en 取代「部分冠詞＋名詞」',
    source:'sentences.js S_L29_1；課本 Édito A2 p.86', askClaude:false },
  { lesson:29, topic:'pronoms-y-en', type:'trans',  /* N2 */
    q:'你有大平底鍋嗎？——有，我有一個。', hint:'數字要不要留？',
    a:"Tu as une grande poêle ? — Oui, j'en ai une.", aNote:'⚠️⚠️ une 要留下來——這裡的 une 是「一個」不是冠詞（課本 p.86）',
    source:'sentences.js S_L29_2；課本 Édito A2 p.86', askClaude:false },
  { lesson:29, topic:'pronoms-y-en', type:'trans',  /* N3 */
    q:'我沒吃過。（用 en）', hint:'複合過去：en 放助動詞前；否定夾住 ne … pas',
    a:"Je n'en ai pas mangé.", aNote:'⭐⭐ 順序：n\' ＋ en ＋ 助動詞 ＋ pas ＋ 分詞（課本 p.86 Fonctionnement）',
    source:'sentences.js S_L29_4；課本 Édito A2 p.86', askClaude:false },
  { lesson:29, topic:'pronoms-y-en', type:'trans',  /* N4 */
    q:'水嗎？——好，我要一些。', hint:'⛔ 不能只說 je veux——vouloir 後面一定要有東西',
    a:"De l'eau ? Oui, j'en veux.", aNote:'🎙 老師的判準：不特定的「量」用 en，特定的那一個東西用 le / la（french_notes.html:9805）',
    source:'sentences.js S_L29_5；french_notes.html:9805', askClaude:true },

  /* ── vocab-aliments：補 fill×4、trans×2（整個 topic 原本 fill 1／trans 2）─────
     食譜句全部出自課本 p.85 clafoutis 食譜（第 5、8 步與第 3、6、9 步）*/
  { lesson:29, topic:'vocab-aliments', type:'fill',   /* N5 → 節點 B */
    q:'Versez la pâte sur les _____.（把麵糊倒在水果上）', hint:'食譜 clafoutis 的主角',
    a:'fruits', aNote:'課本 p.85 食譜第 5 步。⭐ la pâte＝混好還沒烤的狀態',
    source:'sentences.js S_L29_9；課本 Édito A2 p.85', askClaude:false },
  { lesson:29, topic:'vocab-aliments', type:'fill',   /* N6 */
    q:'Sortez le gâteau du _____ quand le dessus est doré et laissez refroidir.（烤箱）', hint:'食譜倒數第三步；du ＝ de ＋ le',
    a:'four', aNote:'課本 p.85 食譜第 8 步。sortir du four ↔ enfourner',
    source:'sentences.js S_L29_10；課本 Édito A2 p.85', askClaude:false },
  { lesson:29, topic:'vocab-aliments', type:'fill',   /* N7 */
    q:'Sortez le gâteau du four quand le dessus est _____ et laissez refroidir.（金黃的）', hint:'來自 or（金）',
    a:'doré', aNote:'⭐ doré＝金黃（來自 or＝金）；laisser refroidir＝讓它冷卻',
    source:'sentences.js S_L29_10；課本 Édito A2 p.85', askClaude:false },
  { lesson:29, topic:'vocab-aliments', type:'fill',   /* N8 */
    q:'Mélangez le lait avec la crème liquide, la farine, le sucre en poudre et une _____ de sel.（一撮）', hint:'少量的鹽用什麼量詞',
    a:'pincée', aNote:'課本 p.85 食譜第 3 步。⭐ une pincée de sel／un bouquet de menthe／une boule de glace（見 questions.js:1408）',
    source:'課本 Édito A2 p.85 第 3 步', askClaude:false },
  { lesson:29, topic:'vocab-aliments', type:'trans',  /* N9 */
    q:'把奶油切成小塊，放在上面。', hint:'食譜第 6 步；「放在上面」的「它們」用代名詞，放動詞後面加連字號',
    a:'Coupez le beurre en petits morceaux et posez-les dessus.', aNote:'課本 p.85 食譜第 6 步。⭐ posez-les：肯定命令式，代名詞放動詞後面（跟 Lavez-vous 同一條規則）',
    source:'課本 Édito A2 p.85 第 6 步', askClaude:false },
  { lesson:29, topic:'vocab-aliments', type:'trans',  /* N10 */
    q:'加幾片薄荷葉或醋栗來裝飾。', hint:'les groseilles＝紅醋栗；pour ＋ 原形（目的）',
    a:'Ajoutez des feuilles de menthe ou des groseilles pour décorer.', aNote:'課本 p.85 食譜第 9 步',
    source:'課本 Édito A2 p.85 第 9 步', askClaude:false },

  /* ── interdiction-demande：補 fill×2、trans×1（本來就夠，補的是第 29 課句庫還沒用來出產出題的句子）── */
  { lesson:29, topic:'interdiction-demande', type:'fill',   /* N11 → 節點 C */
    q:"Dans le métro taïwanais, il est interdit _____ manger et de boire.", hint:'「禁止」後面接原形要加什麼？（il faut 就不用）',
    a:'de', aNote:'⚠️⚠️ 兩個原形都要各自帶 de：de manger et de boire',
    source:'sentences.js S_L29_7；french_notes.html:9866', askClaude:true },
  { lesson:29, topic:'interdiction-demande', type:'fill',   /* N12 */
    q:"Ne _____ pas entrer d'animal.（請勿帶動物進入）", hint:'faire 的否定命令式 vous',
    a:'faites', aNote:'課本 p.89 Fonctionnement 範例：否定命令式（ne … pas 夾住動詞）',
    source:'課本 Édito A2 p.89 Fonctionnement', askClaude:false },
  { lesson:29, topic:'interdiction-demande', type:'trans',  /* N13 */
    q:'請洗手！', hint:'反身動詞的肯定命令式：代名詞放動詞後面加連字號',
    a:'Lavez-vous les mains !', aNote:'⭐⭐ 只有肯定命令式代名詞才會後移；否定要放回前面（見 questions.js:1397）',
    source:'sentences.js S_L29_8；課本 Édito A2 p.89', askClaude:false },
];
```

---

## 五、來源核對（入庫前 Owen 要對的地方）

課本檔：`assets/.textbook_cache.txt`（Édito A2；p.85 食譜、p.86 Grammaire「Les quantités et le pronom en」、p.89 Grammaire「L'obligation et l'interdiction」）。

| 候選 | 課本位置 | 核對結果 |
|---|---|---|
| N1、N2、N3 | p.86 Fonctionnement（`:56691`、`:56695`、`:56700`） | ✅ 逐字相符 |
| N4 | 課本沒有；出自 `french_notes.html:9805`（老師的 en vs le 判準表） | ⚠️ 只有課堂出處，`askClaude:true`，⏸ 請 Owen 對過筆記 |
| N5、N6、N7 | p.85 食譜第 5、8 步（`:56534`、`:56538`） | ✅ 逐字相符 |
| N8 | p.85 第 3 步（`:56530–56531`）；⚠️ 課本原句前面還有 `Dans un saladier,`，草稿 q 從 `Mélangez` 開始截取 | ✅ 取自課本，截取不改字 |
| N9、N10 | p.85 第 6、9 步（`:56536`、`:56540`） | ✅ 逐字相符（`groseilles` 課本原文就是這個字） |
| N11 | 課本沒有；出自 `french_notes.html:9866`（老師的台灣捷運例句） | ⚠️ 只有課堂出處，`askClaude:true`，⏸ 請 Owen 對過筆記 |
| N12 | p.89 Fonctionnement（`:57100`；⚠️ 抽出的文字是 `Ne faites pasentrer d'animal`，`pasentrer` 是 PDF 抽字時少了空格，不是課本筆誤） | ✅ 原文是 `Ne faites pas entrer d'animal` |
| N13 | p.89 Fonctionnement 例句（`:57103`）；同時是 `sentences.js` S_L29_8 | ✅ 逐字相符 |

### 與標準法文／課本的差異
- 無。N9 的 `posez-les`、N13 的 `Lavez-vous` 都是標準的肯定命令式代名詞後置寫法，跟課本一致。

## 六、還沒做／需要 Owen 決定

1. ⏸ ch3 要不要同時放 A＋B（會變 6 個節點），或只放 A（建議）。
2. ⏸ `pronoms-y-en` 是 `situations.js:16–19` 刻意排除的「純文法 topic」——只掛 topic 的節點有 ch12 `strategie-lecture` 先例，我認為可行；但這代表玩家在 ch3 遇到的是「文法練習點」而不是「生活情境」。要不要這樣做請 Owen 決定（`story.js` 檔頭鐵律 4：先是遊戲，題目只是出招方式——節點 A 的旁白已經把文法包進「Sophie 要你別重複名詞」的動機裡）。
3. ⚠️ 我沒有驗證「已通關章節新增節點後的顯示」（見第二節警語）。
4. ⏸ D4 剩下第 27、28、10 課（AUDIT 缺口 2 列的是 27／28／29／33／34／10；第 28 課請一併做，因為題庫與主線都沒有看到它）。
