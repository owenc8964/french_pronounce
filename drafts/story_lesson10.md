# drafts/story_lesson10.md — D4：第 10 課掛進主線的對照與候選題（2026-09-24 清晨排程）

> 對應 `GAME_ROADMAP.md` 佇列項 **D4**（AUDIT 缺口 2：主線 12 章沒有覆蓋第 10 課）。這是 D4 的最後一課；姊妹篇：[story_lesson27.md](story_lesson27.md)、[story_lesson28.md](story_lesson28.md)、[story_lesson29.md](story_lesson29.md)、[story_lesson33.md](story_lesson33.md)、[story_lesson34.md](story_lesson34.md)。
> ⛔ 這份只是**建議與候選**，沒有改 `story.js`／`questions.js`／`situations.js`。⏸ 入庫前等 Owen 核對。
> 來源紀律：新候選題的法文**逐字取自** `sentences.js`（S_L10_x）或課本 **Édito A1**（p.91 家事詞彙、p.94 〈C'est la vie de…〉性格、p.95 〈Une série à suivre !〉passé récent 與外貌、書末 p.95 聽力逐字稿），⛔ 沒有自創任何法文句；中文旁白與 hint 可原創。
> ⚠️ 第 10 課是早期（A1）的筆記格式：`french_notes.html:3012–3179` 只有表格與 3 句例句，沒有課本頁碼。這次**第一次把第 10 課對到課本**——它是 Édito A1 **Unité 6** 的 p.91／94／95。

---

## 一、結論（先看這段）

1. 第 10 課題庫 **37 題、4 個 topic**，而且這 4 個 topic **全部只有第 10 課在用**（別課沒有同 topic 的題可以補）。
2. ⭐ **有一個 topic 其實已經在主線上**：ch10 第 4 節點 Lucas〈形容自己〉的 topic 就是 `character-adjectives`（`story.js:406`），抽題只看 topic、不看課次（`quest.html:3166–3167`）→ 第 10 課那 7 題性格題**現在就會在 ch10 被抽到**。
3. 引擎門檻：**choose ≥ 4、產出型 ≥ 1**（`quest.html:3176`）。

| topic（整個題庫＝只有第 10 課） | choose | fill | trans | 問題 |
|---|---|---|---|---|
| `passe-recent` | **3** | 5 | 2 | ⛔ choose 3＜門檻 4；trans 2 題都標 `askClaude`（⭐ 但其實兩題都找得到課本出處，見第五節） |
| `household-chores` | 4 | 4 | 2 | ⚠️ trans 2 題都標 `askClaude`、沒有課本整句 |
| `physical-description` | 6 | 2 | **1** | ⚠️ 中翻只有 1 題（且 `askClaude`） |
| `character-adjectives` | 4 | 2 | **1** | ✅ 已在 ch10；⚠️ 中翻只有 1 題（且 `askClaude`） |

→ 新候選 **14 題**（choose 2／fill 7／trans 5），⭐ 全部有課本頁碼，**沒有一題需要 `askClaude`**。

---

## 二、建議掛到哪裡（1 個節點）

> ⚠️ **節點以「索引」記進度**。建議插在該章 **boss 之前**；已通關章節新節點會對到舊 boss 的索引而顯示成「已完成」——⚠️ **沒有開瀏覽器驗證**（排程不開瀏覽器），入庫時請互動 session 確認。

| # | 掛在 | 節點型 | sit／npc | topic | npcLine | 旁白構想（原創中文，⛔ 不含法文） | 為什麼掛這裡 |
|---|---|---|---|---|---|---|---|
| A | **ch1 atterrissage**（第 3 節點 Camille 問你從哪來之後、boss 之前） | `trial` | `se-presenter`／Camille | `passe-recent` | `S_L10_1`（Qu'est-ce que tu viens de dire ?） | Camille 講得太快，你只抓到最後一個字。⭐ 她剛剛說了什麼——那個「剛剛」本身就是一個句型。問出口不丟臉，愣在那裡才會讓她走上樓。 | ⭐⭐ ch1 的 conflict 寫的就是「**反應時間**——愣了三秒」，而破法就是**問回去**；ch1 現在只有 **4 個節點**，加了剛好 5。⭐ 跟終章 boss 形成一條線：終章的破關招是 `S_L1_3`（**Vous** pouvez répéter, s'il vous plaît ?，對考官、正式）——**第一章對鄰居用 tu 的口語版，最後一章對考官用 vous 的正式版**，同一個技能的兩端（R5 研究：敘事本身必須等於目標語言內容才有效） |

### 為什麼其他 3 個 topic 不開節點
- `character-adjectives`：已在 ch10（見第一節第 2 條），只補題。
- `physical-description`：它的家是 `decrire-qqn` 情境（`situations.js:34`），主線目前沒有「描述一個人」的場景；句庫裡也沒有第 10 課的外貌句可當 npcLine（只有 `S_L26_2`、`S_L30_3` 間接提到眼睛頭髮）。⛔ 不為了覆蓋而硬開節點（`story.js` 檔頭：「不要因為章要湊滿就硬編內容」）。只補題，讓地城／塔抽得到。
- `household-chores`：ch8 的 `topics` 列了它（`story.js:324`）但沒節點；句庫沒有第 10 課家事句。同上，只補題。

### 對應的 `story.js` 節點草稿（僅供入庫時複製，⛔ 尚未寫入）

```js
// ch1 atterrissage，第 3 節點（S_L2_1）之後、boss 之前
{ type:'trial', sit:'se-presenter', topic:'passe-recent', npcLine:'S_L10_1',
  text:'Camille 講得太快，你只抓到最後一個字。'
    +'⭐ 她剛剛說了什麼——那個「剛剛」本身就是一個句型。問出口不丟臉，愣在那裡才會讓她走上樓。' },
```
（ch1 的 `lessons` 補 10、`topics` 補 `passe-recent`。）

---

## 三、每個節點的 3–4 題

> 「既有」欄是 `questions.js` 目前的行號（2026-09-24）；題庫長大會位移，請用 `q` 開頭文字搜尋。

| 節點 | 既有題（可直接用） | 新候選（見第四節） |
|---|---|---|
| A `passe-recent` | choose 567／568／572；fill 563–566／569；trans 570／571 | **choose×2（N1、N2）**、fill×2（N3、N4）、trans×2（N5、N6） |
| （ch10 既有節點）`character-adjectives` | choose 586／588／590／591；fill 587／589；trans 592 | fill×4（N7–N10）、trans×1（N11） |
| （不開節點）`physical-description` | choose 575–577／579／581／582；fill 578／580；trans 583 | fill×1（N12）、trans×2（N13、N14） |

---

## 四、新候選題（沿用 `drafts/story_questions.js` 格式）

```js
var STORY_L10_DRAFTS = [

  /* ── passe-recent：補 choose×2（原本 3、低於門檻 4）、fill×2、trans×2 ─────────── */
  { lesson:10, topic:'passe-recent', type:'choose',   /* N1 → 節點 A */
    q:'「Je viens de faire la vaisselle et je regarde un film.」——洗碗這件事現在是？', hint:'課本 Échauffement 的問題：finies ou en cours ?',
    a:'已經做完了（剛剛才結束）', aNote:'⭐ 課本 Fonctionnement：La vaisselle est finie. Maintenant, je regarde un film.——passé récent 講的是「剛結束」的動作',
    opts:['已經做完了（剛剛才結束）','正在做','等一下要做','每天都會做'],
    source:'課本 Édito A1 p.95 Échauffement 1a＋Fonctionnement', askClaude:false },
  { lesson:10, topic:'passe-recent', type:'choose',   /* N2 */
    q:'聽力〈Une série à suivre !〉：Jade 和 Stan 剛剛看完哪一部影集的一集？', hint:'nous venons de regarder…',
    a:'Baron noir', aNote:'逐字稿：Stan et moi, nous venons de regarder un épisode de Baron noir.（課本 p.95 聽力第 4 題）',
    opts:['Baron noir','Dix pour cent','Le Bureau des légendes'],
    source:'課本 Édito A1 p.95 Compréhension orale 4＋書末 p.95 逐字稿', askClaude:false },
  { lesson:10, topic:'passe-recent', type:'fill',   /* N3 */
    q:'Je _____ (rencontrer) John au supermarché.（剛剛遇到）', hint:'venir（je）＋ de ＋ 原形',
    a:'viens de rencontrer', aNote:'⭐ 只有 venir 變位，後面原形不動（課本 p.95 Entraînement 3a）',
    source:'課本 Édito A1 p.95 Entraînement 3a', askClaude:false },
  { lesson:10, topic:'passe-recent', type:'fill',   /* N4 */
    q:'Mes amis _____ (acheter) des places pour un concert.（剛剛買了）', hint:'venir 的 ils 形；de 碰到母音要省音',
    a:"viennent d'acheter", aNote:'⚠️ viennent（雙 n）；de ＋ acheter → d\'acheter（課本 p.95 Entraînement 3c）',
    source:'課本 Édito A1 p.95 Entraînement 3c', askClaude:false },
  { lesson:10, topic:'passe-recent', type:'trans',  /* N5 */
    q:'我剛洗完碗，現在在看電影。', hint:'剛做完的用 venir de；正在做的用現在式',
    a:'Je viens de faire la vaisselle et je regarde un film.', aNote:'⭐ 一句同時有「剛結束」與「正在做」——這就是課本用來教 passé récent 的那一句',
    source:'課本 Édito A1 p.95 Échauffement 1a；書末 p.95 逐字稿（Léa）', askClaude:false },
  { lesson:10, topic:'passe-recent', type:'trans',  /* N6 */
    q:'Stan 跟我剛看完 Baron noir 的一集。', hint:'主詞是「Stan 和我」＝nous',
    a:'Stan et moi, nous venons de regarder un épisode de Baron noir.', aNote:'⭐ 「A et moi」後面口語常再用 nous 重述一次主詞',
    source:'課本 Édito A1 書末 p.95 逐字稿（Jade）；p.95 Échauffement 1b（Nous venons de regarder un épisode.）', askClaude:false },

  /* ── character-adjectives：補 fill×4、trans×1（已在 ch10 Lucas 節點被抽到）─────
     fill 全出自課本 p.94 Vocabulaire 5（Complétez avec : gentil, sérieuse, courageux, bavards.） */
  { lesson:10, topic:'character-adjectives', type:'fill',   /* N7 */
    q:'Elle étudie beaucoup. Elle est _____.', hint:'課本給的字：gentil, sérieuse, courageux, bavards',
    a:'sérieuse', aNote:'-eux → -euse（課本 p.94 Vocabulaire 5a）',
    source:'課本 Édito A1 p.94 Vocabulaire 5a', askClaude:false },
  { lesson:10, topic:'character-adjectives', type:'fill',   /* N8 */
    q:'Ils parlent beaucoup. Ils sont _____.', hint:'主詞是複數',
    a:'bavards', aNote:'bavard＝話多（課本 p.94 Vocabulaire 5b）',
    source:'課本 Édito A1 p.94 Vocabulaire 5b', askClaude:false },
  { lesson:10, topic:'character-adjectives', type:'fill',   /* N9 */
    q:'Il aide les autres. Il est _____.', hint:'陰性要雙寫 l',
    a:'gentil', aNote:'gentil → gentille（課本 p.94 Vocabulaire 5c）',
    source:'課本 Édito A1 p.94 Vocabulaire 5c', askClaude:false },
  { lesson:10, topic:'character-adjectives', type:'fill',   /* N10 */
    q:"Il aime l'aventure. Il est _____.", hint:'Lucky Luke 那一型',
    a:'courageux', aNote:'課文：C\'est un cow-boy gentil et courageux.（課本 p.94 Vocabulaire 5d）',
    source:'課本 Édito A1 p.94 Vocabulaire 5d', askClaude:false },
  { lesson:10, topic:'character-adjectives', type:'trans',  /* N11 */
    q:'她很慷慨：她為朋友做很多事。', hint:'généreux 的陰性；冒號後面給證據',
    a:'Elle est généreuse : elle fait beaucoup de choses pour ses amies.', aNote:'⭐ 筆記 gentil vs généreux 的定義就是這句（généreux＝行動上常為別人做事）。⚠️ amies 陰性複數（Aya 的朋友是女生）',
    source:'課本 Édito A1 p.94 課文〈C\'est la vie de…〉（Aya）；french_notes.html:3158', askClaude:false },

  /* ── physical-description：補 fill×1、trans×2（整個 topic 中翻只有 1 題）─────── */
  { lesson:10, topic:'physical-description', type:'fill',   /* N12 */
    q:"Mais elle n'est pas blonde, elle a les cheveux _____.（栗色的）", hint:'頭髮專用的顏色詞之一',
    a:'châtains', aNote:'⚠️ cheveux 陽性複數 → châtains 加 s（逐字稿：Léa 糾正 Jade，Camille Cottin 不是金髮）',
    source:'課本 Édito A1 書末 p.95 逐字稿（Léa）', askClaude:false },
  { lesson:10, topic:'physical-description', type:'trans',  /* N13 */
    q:'他是棕髮，有鬍子，而且有點禿。', hint:'頭髮用 être brun；鬍子用 avoir',
    a:'Il est brun, il a la barbe et il est un peu chauve.', aNote:'⭐ 課本 Pour décrire une personne：Il est brun. ＝ Il a les cheveux bruns.（逐字稿原句前面還有 Mais tu sais,）',
    source:'課本 Édito A1 書末 p.95 逐字稿（Jade 描述 Kad Merad）；p.95 Pour décrire une personne', askClaude:false },
  { lesson:10, topic:'physical-description', type:'trans',  /* N14 */
    q:'她很高、很瘦、金髮，眼睛是綠色的。', hint:'三個 être 形容詞＋一個 avoir 句',
    a:'Elle est grande, mince, blonde et elle a les yeux verts.', aNote:'⚠️ grande／blonde 配陰性；mince 陰陽同形；眼睛用 avoir les yeux ＋ 顏色（複數）',
    source:'課本 Édito A1 書末 p.95 逐字稿（Jade）；p.95 Pour décrire une personne', askClaude:false },
];
```

---

## 五、來源核對（入庫前 Owen 要對的地方）

課本檔：`assets/.textbook_cache.txt`（**Édito A1**；p.91 從 `:29177`、p.94 從 `:29591`、p.95 從 `:29729`；書末 p.95 聽力逐字稿在 `:42095–42134`，PDF 抽字把兩欄對話交錯在一起，已逐句分開核對）。

| 候選 | 課本位置 | 核對結果 |
|---|---|---|
| N1 | p.95 Échauffement 1a＋Fonctionnement（`:29767–29771`） | ✅ 題幹句逐字相符；正解取自課本 Fonctionnement 的說明 `La vaisselle est finie.` |
| N2 | p.95 聽力第 4 題（`:29743`）＋逐字稿（`:42100–42101`） | ✅ 三個選項是課本第 2 題列的三部影集名 |
| N3、N4 | p.95 Entraînement 3a、3c（`:29777`、`:29781–29783`） | ✅ 題目相符；⚠️ 答案是照課本 Fonctionnement 表推的（筆記沒收這組練習、老師帶做紀錄沒有），但只有唯一解 |
| N5 | p.95 Échauffement 1a（`:29771–29772`）＋逐字稿（`:42099`） | ✅ 逐字相符 |
| N6 | 逐字稿（`:42100–42101`） | ✅ 逐字相符 |
| N7–N10 | p.94 Vocabulaire 5a–d（`:29709–29714`） | ✅ 題目相符；答案由課本給的四個字一對一填入（唯一解） |
| N11 | p.94 課文 Aya 段（`:29704–29706`） | ✅ 課本原文是 `Elle est généreuse : elle fait beaucoup de choses pour ses amies.`（PDF 換行在 `fait／beaucoup`、`ses／amies`，接回後逐字相符） |
| N12 | 逐字稿（`:42117–42119`） | ✅ 截取 `Mais elle n'est pas blonde, elle a les cheveux châtains.`（前面是 `Camille Cottin ?`） |
| N13 | 逐字稿（`:42104–42105`） | ✅ 截掉句首 `Mais tu sais,` |
| N14 | 逐字稿（`:42115`） | ✅ 逐字相符 |

### ⭐ 順手發現：題庫裡兩題 `askClaude:true` 其實有課本出處
- `questions.js:570`（trans）`Ils viennent d'acheter des places.` → 對應課本 p.95 Entraînement 3c（`Mes amis (acheter) …… des places pour un concert.`）與筆記表格 `:3086`。
- `questions.js:571`（trans）`Je viens de découvrir une nouvelle série.` → **課本 p.95 Production orale 4 的範例句**（`:29795–29797`，逐字相符）。
→ 這兩題的 `askClaude` 可以改成 `false`（⏸ 請 Owen 決定；這是正式資料，排程不改）。

### 與標準法文／課本的差異
- 無。

---

## 六、還沒做／需要 Owen 決定

1. ⏸ ch1 加節點 A（加了剛好 5 個，不超過上限）。
2. ⏸ `questions.js:570／571` 的 `askClaude` 要不要改掉（見第五節）。
3. ⚠️ 沒有驗證「已通關章節新增節點後的顯示」。
4. ✅ **D4 六課到此全部有草稿**（34／33／29／27／28／10）。建議互動 session 一次看完六份再決定節點數，因為 ch7／ch10／ch11／ch12 被多課同時建議加節點（彙整見 `GAME_ROADMAP.md` 第五節）。
