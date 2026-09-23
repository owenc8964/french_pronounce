# drafts/story_lesson28.md — D4：第 28 課掛進主線的對照與候選題（2026-09-24 清晨排程）

> 對應 `GAME_ROADMAP.md` 佇列項 **D4**（AUDIT 缺口 2：主線 12 章沒有覆蓋第 28 課）。姊妹篇：[story_lesson27.md](story_lesson27.md)、[story_lesson29.md](story_lesson29.md)、[story_lesson33.md](story_lesson33.md)、[story_lesson34.md](story_lesson34.md)。
> ⛔ 這份只是**建議與候選**，沒有改 `story.js`／`questions.js`／`situations.js`。⏸ 入庫前等 Owen 核對。
> 來源紀律：新候選題的法文**逐字取自** `sentences.js`（S_L28_x、S_L11_2）或課本 Édito A2（p.75 si 條件句、p.77 電話與網路詞彙、p.79 le pronom on、p.80 複習頁），⛔ 沒有自創任何法文句；中文旁白與 hint 可原創。
> ⛔ **刻意不用** `french_notes.html:9635` 的平行閱讀〈Une journée sans portable〉——筆記自己標了「同級原創短文」。

---

## 一、結論（先看這段）

1. ⭐⭐ **第 28 課其實「半個」已經在主線上了**：抽題只看 topic、不看課次（`quest.html:3166–3167`），而 ch11 第 2 節點就是 `condition-si` 的 trial（`story.js:437`）——所以第 28 課那 14 題 si／quand 題**現在就會在 ch11 被抽到**。AUDIT 說「主線沒覆蓋第 28 課」是用 `lessons` 欄判斷的，對 `condition-si` 來說不精確。
2. ⚠️⚠️ **順手抓到一個既有節點的錯位（最值錢的一條，而且不用加節點）**：ch5 boss〈壞掉的暖氣〉的旁白寫「你得打給 M. Rivet，**用『如果…就…』把狀況和需求綁成一句**」，npcLine 也是 si 句（`S_L25_9` S'il fait froid, on met le chauffage.），**但它的 `topic` 是 `vocab-meteo`**（`story.js:230`）→ 這隻關主實際抽的是**天氣詞彙題**，一題 si 都不會出。旁白承諾的練習和實際出招對不起來。→ 建議把 `topic` 改成 `condition-si`（25＋28 課共 21 題：choose 12／fill 6／trans 3）。
3. 真正沒有家的是另外兩個 topic：

| topic（整個題庫） | choose | fill | trans | 問題 |
|---|---|---|---|---|
| `condition-si`（25＋28 課） | 12 | 6 | 3 | ✅ 夠；見上面兩條 |
| `vocab-technologies`（只有 28 課） | 17 | **2** | **2** | ⚠️ 選擇題很多、產出型很少——打電話的整句（接不到、掛我電話、關機了）幾乎沒練到 |
| `on-vs-nous`（2＋9＋28 課） | 7 | 3 | 3 | ✅ 夠；⚠️ 但**主線台詞裡 on 到處都是**（`S_L19_2`、`S_L22_4`、`S_L24_8`、`S_L9_2`…），卻沒有任何節點在練它——ch1 的 `topics` 列了它，沒有節點用 |

→ 新候選 **14 題**（fill 7／trans 7），⭐ 每題有出處。

---

## 二、建議掛到哪裡（1 個改動＋2 個新節點）

> ⚠️ **節點以「索引」記進度**。建議插在該章 **boss 之前**；已通關章節新節點會對到舊 boss 的索引而顯示成「已完成」——⚠️ **沒有開瀏覽器驗證**（排程不開瀏覽器），入庫時請互動 session 確認。

| # | 掛在 | 動作 | sit／npc | topic | npcLine | 旁白構想（原創中文，⛔ 不含法文） | 為什麼掛這裡 |
|---|---|---|---|---|---|---|---|
| **0** | **ch5 la-pluie boss**〈壞掉的暖氣〉 | ⭐ **改既有節點的 topic**：`vocab-meteo` → `condition-si`（旁白、npcLine 都不用動） | 不變 | `condition-si` | 不變（`S_L25_9`） | 不變 | 見第一節第 2 條。⭐ 零新節點、零新題，這隻關主就從「天氣單字」變成它旁白說的「如果…就…」。`lessons` 補 28（已有 25） |
| A | **ch5 la-pluie**（boss 之前；⭐ 建議取代第 3 節點 Mme Bonnet 的天氣 talk，見下） | 新 `trial` | `meteo`／M. Rivet（`logement`） | `vocab-technologies` | `S_L28_9`（Internet marche mal, je n'arrive pas à me connecter.） | 你先打給 M. Rivet——轉進語音信箱。想寄信給他，暴雨讓網路也斷了。⭐ 你得在留言裡講清楚：不是你不想用別的方式聯絡，是**做不到**。 | ⭐⭐ ch5 的 logline 就是「修暖氣需要的不是工具，是一通講得清楚的電話」，**整章本來就是一通電話**，而電話詞彙整個缺席。`ne pas arriver à ＋ 原形`（做不到）是筆記標「超高頻」的整塊，課本 p.77 練習 4c |
| B | **ch2 une-chambre**（第 2 節點 Camille 陪逛街區之後、boss 之前） | 新 `trial` | `logement`／Camille（`se-presenter`） | `on-vs-nous` | `S_L11_2`（On n'a pas trouvé de lit, mais on a trouvé deux fauteuils.） | 搬進去的第一晚，Camille 幫你搬東西。房間是空的。⭐ 她說「我們」的時候用的不是 nous——而那個字在別的句子裡也可以是「有人」或「大家」。 | ch2 現在只有 **4 個節點**（加了剛好 5，不超過檔頭上限）；`S_L11_2` 是第 11 課課文、ch2 的 `lessons` 本來就含 11；「空房間找家具」就是搬家的場景 |

### ch5 節點數
ch5 現在 5 個節點（其中 **3 個是天氣 talk**，都是零練習題——`GAME_ROADMAP` B10 說的「純對話節點」）。加 A 會變 6 個。⭐ 建議 **A 取代第 3 節點**（Mme Bonnet 講昨天天氣，`story.js:225–227`）：天氣閒聊前面已經有 Papy Jean 與 Sophie 兩段，第三段的邊際價值最低，而 A 是 trial（有題）。
⚠️ 這也**取代**了 [story_lesson27.md](story_lesson27.md) 第二節的可選節點 C（Camille 修好電腦）——同一個位置，A 的情節直接接關主，C 只是鋪陳。兩個選一個，建議 A。

### 對應的 `story.js` 草稿（僅供入庫時複製，⛔ 尚未寫入）

```js
// ch5 la-pluie：boss 只改 topic
{ type:'boss',  sit:'meteo', npc:'logement', topic:'condition-si', npcLine:'S_L25_9',   // ← 原本 'vocab-meteo'
  text:'…（旁白不變）' },
// ch5 la-pluie：boss 之前（建議取代 Mme Bonnet 的 talk）
{ type:'trial', sit:'meteo', npc:'logement', topic:'vocab-technologies', npcLine:'S_L28_9',
  text:'你先打給 M. Rivet——轉進語音信箱。想寄信給他，暴雨讓網路也斷了。'
    +'⭐ 你得在留言裡講清楚：不是你不想用別的方式聯絡，是做不到。' },
// ch2 une-chambre：boss 之前
{ type:'trial', sit:'logement', npc:'se-presenter', topic:'on-vs-nous', npcLine:'S_L11_2',
  text:'搬進去的第一晚，Camille 幫你搬東西。房間是空的。'
    +'⭐ 她說「我們」的時候用的不是 nous——而那個字在別的句子裡也可以是「有人」或「大家」。' },
```
（章的 `lessons` 補：ch5 加 28；ch2 已含 11，另加 28。`topics` 補：ch5 加 `condition-si`、`vocab-technologies`；ch2 加 `on-vs-nous`。）

---

## 三、每個節點的 3–4 題

> 「既有」欄是 `questions.js` 目前的行號（2026-09-24）；題庫長大會位移，請用 `q` 開頭文字搜尋。

| 節點 | 既有題（可直接用） | 新候選（見第四節） |
|---|---|---|
| 0 `condition-si` | 第 25 課 1213–1219；第 28 課 choose 1332–1334／1337–1339／1342／1345，fill 1335／1336／1340／1341，trans 1343／1344 | fill×3（N12–N14） |
| A `vocab-technologies` | choose 1355–1359／1361／1362／1364–1369／1372–1374；fill 1360／1363；trans 1370／1371 | **fill×4（N1–N4）、trans×5（N5–N9）** |
| B `on-vs-nous` | 第 2 課 75／87／202；第 9 課 497–499；第 28 課 choose 1347–1351，fill 1352，trans 1353 | trans×2（N10、N11） |

---

## 四、新候選題（沿用 `drafts/story_questions.js` 格式）

```js
var STORY_L28_DRAFTS = [

  /* ── vocab-technologies：補 fill×4、trans×5（整個 topic fill 2／trans 2）───────
     fill 全出自課本 p.77 Vocabulaire 2「Choisissez le verbe qui convient」，答案照筆記 french_notes.html:9501–9504 */
  { lesson:28, topic:'vocab-technologies', type:'fill',   /* N1 → 節點 A */
    q:"Julie a _____ son téléphone, elle n'est pas joignable.（關機）", hint:'éteindre 的過去分詞（不規則）',
    a:'éteint', aNote:'⚠️ éteindre → éteint。課本選項是 allumé / éteint——聯絡不上，所以是關機（課本 p.77 Vocabulaire 2a）',
    source:'課本 Édito A2 p.77 Vocabulaire 2a；french_notes.html:9501', askClaude:false },
  { lesson:28, topic:'vocab-technologies', type:'fill',   /* N2 */
    q:"Je t'ai appelé trois fois mais tu n'as pas _____.（接起來）", hint:'字根 crochet＝掛鉤：拿下來 vs 掛回去',
    a:'décroché', aNote:'⭐ décrocher＝接起 ≠ raccrocher＝掛斷（課本 p.77 Vocabulaire 2b）',
    source:'課本 Édito A2 p.77 Vocabulaire 2b；french_notes.html:9502', askClaude:false },
  { lesson:28, topic:'vocab-technologies', type:'fill',   /* N3 */
    q:"Marine n'est pas là ? Je vais la _____.（聯絡）", hint:'la 是直接受詞——哪個動詞直接接人？',
    a:'contacter', aNote:'⚠️⚠️ 課本選項 contacter / répondre：la＝COD，所以只能是 contacter（répondre 要用 lui）（課本 p.77 Vocabulaire 2c）',
    source:'課本 Édito A2 p.77 Vocabulaire 2c；french_notes.html:9503', askClaude:false },
  { lesson:28, topic:'vocab-technologies', type:'fill',   /* N4 */
    q:"J'ai téléphoné à Pierre mais il était très énervé, il m'a _____ au nez.（掛斷）", hint:'不客氣地當面掛人電話',
    a:'raccroché', aNote:'⭐⭐ raccrocher au nez 整塊記。課本選項 allumé / raccroché（課本 p.77 Vocabulaire 2d）',
    source:'sentences.js S_L28_8；課本 Édito A2 p.77 Vocabulaire 2d', askClaude:false },
  { lesson:28, topic:'vocab-technologies', type:'trans',  /* N5 */
    q:'我打給 Pierre 但他很火，直接把我電話掛掉。', hint:'téléphoner à；imparfait 描述他的狀態',
    a:"J'ai téléphoné à Pierre mais il était très énervé, il m'a raccroché au nez.", aNote:'⭐ 一句三個時態角色：PC（我打）＋ imparfait（他當時很火）＋ PC（掛掉）',
    source:'sentences.js S_L28_8；課本 Édito A2 p.77 Vocabulaire 2d', askClaude:false },
  { lesson:28, topic:'vocab-technologies', type:'trans',  /* N6 */
    q:'我不想再用社群網站了，我要取消訂閱。', hint:'ne … plus；se désabonner',
    a:'Je ne veux plus utiliser les réseaux sociaux, je vais me désabonner.', aNote:'⚠️ réseaux sociaux 兩個字都變複數；反身動詞 me désabonner（課本 p.77 Vocabulaire 4a）',
    source:'課本 Édito A2 p.77 Vocabulaire 4a；french_notes.html:9548', askClaude:false },
  { lesson:28, topic:'vocab-technologies', type:'trans',  /* N7 */
    q:'他不喜歡實體店，他都線上購物。', hint:'en ligne＝線上（⛔ 不是排隊）',
    a:"Il n'aime pas les magasins, il fait des achats en ligne.", aNote:'faire des achats＝購物（un achat 來自 acheter）（課本 p.77 Vocabulaire 4b）',
    source:'課本 Édito A2 p.77 Vocabulaire 4b；french_notes.html:9554', askClaude:false },
  { lesson:28, topic:'vocab-technologies', type:'trans',  /* N8 */
    q:'你拿到展覽的地址以後，可以傳訊息給我嗎？', hint:'quand ＋ 未來 ＋ 未來',
    a:"Quand tu auras l'adresse du salon, tu pourras m'envoyer un message ?", aNote:'⭐⭐ 本課文法直接出現在詞彙題裡：quand 後面也要未來式（課本 p.77 Vocabulaire 1b，空格答案 message）',
    source:'課本 Édito A2 p.77 Vocabulaire 1b；french_notes.html:9498', askClaude:false },
  { lesson:28, topic:'vocab-technologies', type:'trans',  /* N9 */
    q:'我 8 月 7 日到 27 日聯絡不上。', hint:'être joignable；從…到… 用 du … au …',
    a:'Je ne suis pas joignable du 7 au 27 août.', aNote:'🎙 老師說法國人放假常這樣講（自動回覆、語音信箱）',
    source:'sentences.js S_L28_7；french_notes.html:9505（課堂）', askClaude:true },

  /* ── on-vs-nous：補 trans×2（第 28 課的三種意思裡，「有人」這一種沒有產出題）── */
  { lesson:28, topic:'on-vs-nous', type:'trans',  /* N10 → 節點 B */
    q:'有人偷了我的手機。（用 on）', hint:'不知道是誰、也不在乎是誰',
    a:'On a volé mon téléphone.', aNote:'⭐ on＝quelqu\'un。⚠️ 不可能是「我們」——手機是我的（課本 p.79 Fonctionnement）',
    source:'課本 Édito A2 p.79 Fonctionnement；french_notes.html:9431', askClaude:false },
  { lesson:28, topic:'on-vs-nous', type:'trans',  /* N11 */
    q:'我沒有我們兩個的照片，我們拍張自拍？', hint:'口語的「我們」；自拍直接用英文字',
    a:"Je n'ai pas de photo de toi et moi, on fait un selfie ?", aNote:'⭐ 這個 on＝nous。否定的 pas de（課本 p.77 Vocabulaire 1d，空格答案 selfie）',
    source:'課本 Édito A2 p.77 Vocabulaire 1d；french_notes.html:9500', askClaude:false },

  /* ── condition-si：補 fill×3（夠用了，補的是跨課連結：si ＋ 命令式、si ＋ 未來＋所有格代名詞）── */
  { lesson:28, topic:'condition-si', type:'fill',   /* N12 → 節點 0 */
    q:'Si vous devez aller au supermarché, _____ (laisser) votre smartphone à la maison.', hint:'第二式：右半邊叫人去做',
    a:'laissez', aNote:'⭐ si ＋ 現在式 ＋ 命令式（vous）（課本 p.75 Échauffement 1c）',
    source:'課本 Édito A2 p.75 Échauffement 1c', askClaude:false },
  { lesson:28, topic:'condition-si', type:'fill',   /* N13 */
    q:'Si tu _____ (changer) de téléphone, tu me _____ (donner) ton ancien smartphone ?', hint:'si 後面永遠現在式；右半邊是還沒發生的結果',
    a:'changes / donneras|changes, donneras', aNote:'⭐ 第三式（現在＋未來）。changer de＋無冠詞名詞＝換一支',
    source:'課本 Édito A2 p.80 複習頁 Si et quand 2a', askClaude:true },
  { lesson:28, topic:'condition-si', type:'fill',   /* N14 */
    q:'Demain si vous _____ (oublier) votre ordinateur, je vous _____ (prêter) le mien.', hint:'第三式；le mien＝第 27 課的所有格代名詞',
    a:'oubliez / prêterai|oubliez, prêterai', aNote:'⭐⭐ 一句接兩課：si 條件句（28）＋ le mien＝mon ordinateur（27）',
    source:'課本 Édito A2 p.80 複習頁 Si et quand 2b', askClaude:true },
];
```

---

## 五、來源核對（入庫前 Owen 要對的地方）

課本檔：`assets/.textbook_cache.txt`（Édito A2；p.75 從 `:54895`、p.77 從 `:55184`、p.79 從 `:55424`、p.80 從 `:55554`）。

| 候選 | 課本位置 | 核對結果 |
|---|---|---|
| N1–N4 | p.77 Vocabulaire 2a–2d（`:55222–55233`） | ✅ 題目相符；答案取自筆記 `:9501–9504`（老師帶做） |
| N5 | 同 N4（`:55232–55233`）＝ sentences.js S_L28_8 | ✅ |
| N6、N7 | p.77 Vocabulaire 4a、4b（`:55207–55211`，PDF 抽字把兩欄攪在一起） | ✅ 對照筆記 `:9548`、`:9554` 的配對結果 |
| N8 | p.77 Vocabulaire 1b（`:55206–55207`） | ✅ 題目相符；空格答案 `message` 取自筆記 `:9498` |
| N9 | 課本沒有；出自 `french_notes.html:9505`（🎙 老師） | ⚠️ 只有課堂出處，`askClaude:true` |
| N10 | p.79 Fonctionnement（`:55460–55462`） | ✅ |
| N11 | p.77 Vocabulaire 1d（`:55209`） | ✅ 題目相符；空格答案 `selfie` 取自筆記 `:9500` |
| N12 | p.75 Échauffement 1c（`:54902`） | ✅ 逐字相符 |
| N13、N14 | p.80 複習頁「Si et quand」2a、2b（`:55603–55607`） | ⚠️⚠️ **筆記沒有收這一頁**（`french_notes.html` 第 28 課找不到），**答案是我照規則推的、課本沒印答案、老師也沒帶做**，`askClaude:true`，⏸ 請 Owen 對過或下次課問老師 |

### 與標準法文／課本的差異
- 無。

### 順手發現（不在本項範圍，記錄給互動 session）
- `questions.js:1343` 的 trans 題〈如果我明天迷路，我會跟人問路〉答案 `Si je me perds demain, je demanderai mon chemin à quelqu'un.` 出自筆記的**平行閱讀**（`french_notes.html:9640`，筆記自標「同級原創短文」＝Claude 寫的），不是課本原句（課本 p.75 是 `Si vous vous perdez, vous pourrez demander votre chemin à quelqu'un.`）。法文本身沒錯，但依內容鐵律 1 它不算合法教材來源——⏸ 要不要換成課本版請 Owen 決定。

---

## 六、還沒做／需要 Owen 決定

1. ⭐ **節點 0（ch5 boss 改 topic）建議優先做**：改一個欄位、零新題，旁白與出招就對齊了。
2. ⏸ ch5 的 A 是「加」（變 6 節點）還是「取代 Mme Bonnet 的 talk」（建議取代）。A 與第 27 課草稿的 C 二選一（建議 A）。
3. ⏸ N13／N14 的答案沒有老師或筆記背書。
4. ⚠️ 沒有驗證「已通關章節新增節點後的顯示」。
5. ⏸ D4 剩第 10 課。
