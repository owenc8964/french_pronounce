# drafts/story_lesson27.md — D4：第 27 課掛進主線的對照與候選題（2026-09-24 清晨排程）

> 對應 `GAME_ROADMAP.md` 佇列項 **D4**（AUDIT 缺口 2：主線 12 章沒有覆蓋第 27 課）。姊妹篇：[story_lesson34.md](story_lesson34.md)、[story_lesson33.md](story_lesson33.md)、[story_lesson29.md](story_lesson29.md)。
> ⛔ 這份只是**建議與候選**，沒有改 `story.js`／`questions.js`／`situations.js`。⏸ 入庫前等 Owen 核對。
> 來源紀律：新候選題的法文**逐字取自** `sentences.js`（S_L27_x）、課本 Édito A2（p.64 課文 A、p.65 所有格代名詞、p.66 性格填空、p.70 課文 B、p.72 futur simple、p.73 科技詞彙）或 `french_notes.html` 第 27 課的課堂口說段，⛔ 沒有自創任何法文句；中文旁白與 hint 可原創。
> ⛔ **刻意不用** `french_notes.html:9187` 的平行閱讀〈Ma vie à Taipei en 2050〉——筆記自己標了「同級原創短文」，那是 Claude 寫的，不算課本或課堂來源。

---

## 一、結論（先看這段）

1. 第 27 課題庫有 **41 題、5 個 topic**，跟第 29／33／34 課一樣，**缺的是主線沒有節點指向它們**。5 個 topic 裡只有 `vocab-caractere` 在 `situations.js` 有家（`decrire-qqn`，`situations.js:34`），其餘 4 個都沒有。
2. 引擎門檻：**choose ≥ 4、產出型 ≥ 1**（`quest.html:3176`）。以整個 topic 計（含別課同 topic 的題）：

| topic（整個題庫） | choose | fill | trans | 問題 |
|---|---|---|---|---|
| `pronoms-possessifs` | 5 | 4 | **2** | ⚠️ 中翻只有 2 題 |
| `futur-simple`（27＋28 課） | 6 | 8 | **1** | ⚠️⚠️ 中翻只有 1 題（課文標題那句）——未來式「整句說出來」幾乎沒練到；而且 `savoir`（saur-）一題都沒有 |
| `vocab-reseaux` | **3** | **0** | 1 | ⛔ choose 3＜門檻 4：掛節點會被補進別的 topic；填空 0 題 |
| `vocab-innovation` | 6 | **1** | **1** | ⚠️ 產出型幾乎是空的 |
| `vocab-caractere`（26＋27 課） | 12 | 2 | **1** | ⚠️ 中翻只有 1 題 |

→ 新候選 **24 題**補這些洞（choose 3／fill 9／trans 12），⭐ 每題有出處。
3. ⭐ **兩個主文法各有一個「本來就長在主線上」的位置**：
   - 所有格代名詞的出處課文是〈大頭照要看你給誰看〉——**給老闆看的那一張**（`c'est votre tête que l'employeur veut voir`、`il a changé la sienne … il a trouvé un emploi dans la semaine`）。這就是 **ch10 面試章**。
   - 未來式在句庫裡唯一一句「對人說的話」是 `S_L27_7`（我們去展覽的時候，你會一起來嗎？）——**這是一句邀約**。這就是 **ch7 有人約你**。
4. ⚠️ **節點數已經擠了**：前三份草稿已經建議 ch7＋2、ch10＋1。第 27 課再加會讓 ch7 變 7 個、ch10 變 7 個（`story.js` 檔頭寫 3–5 個）。這一課的建議因此附了**取捨順序**（見第二節），⏸ 請 Owen 一次決定這幾課要「加」還是「換」。

---

## 二、建議掛到哪裡（2 個節點＋1 個可選）

> ⚠️ **節點以「索引」記進度**。建議插在該章 **boss 之前**：在途玩家不受影響；已通關章節，新節點會對到舊 boss 的索引而顯示成「已完成」——⚠️ **沒有開瀏覽器驗證這個顯示行為**（排程不開瀏覽器），入庫時請互動 session 確認。
> 章的 `lessons` 欄也要補 27（`quest.html:3180–3181`：題量不足時先補「topic 出現過的課次＋本章課次」）。

| # | 掛在 | 節點型 | sit／npc | topic | npcLine | 旁白構想（原創中文，⛔ 不含法文） | 為什麼掛這裡 |
|---|---|---|---|---|---|---|---|
| A | **ch7 ça-te-dit**（Léa 第 1 個 talk 之後、時間地點 trial 之前） | `trial` | `rendez-vous`／Léa | `futur-simple` | `S_L27_7`（Quand nous irons au salon, tu viendras avec nous ?） | Léa 這次約的不是今晚，是下個月的科技展。⭐ 還沒發生的事，法文兩邊都要往前推——「我們去的時候」跟「你會來嗎」兩個動詞都在未來。 | ⭐⭐ 句庫裡唯一一句「用未來式邀人」的句子，而 ch7 整章就是邀約；ch7 現有 4 個節點**只有 1 個 trial**（時間地點），這裡補的是產出。課本原題是 p.72 Entraînement 3b |
| B | **ch10 entretien**（第 1 節點 Hugo 之後、Mme Fabre 自我介紹之前） | `trial` | `etudes`／Hugo | `pronoms-possessifs` | `S_L27_3`（Il a changé la sienne pour avoir l'air plus sérieux.） | 投履歷前一晚，Hugo 看了你的大頭照，講起他一個朋友：找了好幾個月的工作，換了照片，一週就找到了。⭐ 他說「他換掉**他的**」——那個「他的」指的是照片，不是人。 | ⭐⭐ 課文 A（課本 p.64）的整段故事就是「換履歷照 → 一週內找到工作」，**本來就是面試前的情節**；而且整課最容易錯的那條規則（跟著東西走不是跟著人走，`la sienne`＝sa photo）就在這一句 |
| C | ch5 la-pluie（⏸ 可選；boss「壞掉的暖氣」之前） | `talk` | `meteo`／Camille（`se-presenter`） | `vocab-innovation` | `S_L27_10`（J'ai réparé mon ordinateur, j'espère qu'il va bien fonctionner.） | Camille 在樓梯間抱著一台電腦，說她剛修好。⭐ 「修好」和「希望能運作」是兩件事——接下來你要打給 M. Rivet 講的，正好是反過來那一半：它**不運作**了。 | ch5 的 boss 是「暖氣壞了打電話找房東」，`être/tomber en panne`／`réparer`／`fonctionner` 是這通電話的詞彙；課本 p.73 練習 2e。⚠️ 但 ch5 已經 5 個節點（3 個是天氣 talk），加了會變 6；而且 `vocab-innovation` 的主軸是「科技與未來」，放在暖氣章只用得到它的一小角 |

### 取捨順序（如果 Owen 要守「每章 ≤ 5」）
- **ch7**（現有 4＋第 33 課 C＋第 34 課 C＋本課 A）：⭐ 建議優先留**本課 A**（唯一的 trial、唯一的產出），第 34 課 C（Léa 想離線）次之，第 33 課 C（我已經知道了）可以併進第 34 課 C 當同一個 talk 的前半。
- **ch10**（現有 5＋第 33 課 A＋本課 B）：本課 B 與第 33 課 A 都是 trial。可以考慮**把本課 B 換掉第 1 節點 Hugo 的 talk**（同一個 NPC、同一個情境，只是從「聊學歷」改成「聊履歷照」）——這樣 ch10 只多 1 個。
- `vocab-reseaux`、`vocab-caractere` **不建議開節點**：前者 choose 不到門檻；後者 ch10 已經有 Lucas 的 `character-adjectives` 節點（`story.js:406`），兩個 topic 講的是同一件事。這兩個只補題，讓地城／塔／`decrire-qqn` 情境吃得到。

### 對應的 `story.js` 節點草稿（僅供入庫時複製，⛔ 尚未寫入）

```js
// ch7 ça-te-dit，第 1 個 talk（S_L19_1）之後
{ type:'trial', sit:'rendez-vous', topic:'futur-simple', npcLine:'S_L27_7',
  text:'Léa 這次約的不是今晚，是下個月的科技展。'
    +'⭐ 還沒發生的事，法文兩邊都要往前推——「我們去的時候」跟「你會來嗎」兩個動詞都在未來。' },
// ch10 entretien，第 1 節點（Hugo）之後——或直接取代它
{ type:'trial', sit:'etudes', npc:'etudes', topic:'pronoms-possessifs', npcLine:'S_L27_3',
  text:'投履歷前一晚，Hugo 看了你的大頭照，講起他一個朋友：找了好幾個月的工作，換了照片，一週就找到了。'
    +'⭐ 他說「他換掉他的」——那個「他的」指的是照片，不是人。' },
// ch5 la-pluie，boss 之前（⏸ 可選）
{ type:'talk', sit:'meteo', npc:'se-presenter', topic:'vocab-innovation', npcLine:'S_L27_10',
  text:'Camille 在樓梯間抱著一台電腦，說她剛修好。'
    +'⭐「修好」和「希望能運作」是兩件事——接下來你要打給 M. Rivet 講的，正好是反過來那一半。' },
```
（章的 `lessons` 補：ch7 加 27、ch10 加 27、ch5 加 27（若採 C）；`topics` 補對應 topic。）

---

## 三、每個節點的 3–4 題

> 「既有」欄是 `questions.js` 目前的行號（2026-09-24）；題庫長大會位移，請用 `q` 開頭文字搜尋。

| 節點 | 既有題（可直接用） | 新候選（見第四節） |
|---|---|---|
| A `futur-simple` | choose 1297／1300／1304／1305／1307／1377；fill 1298／1299／1301／1302／1303／1306／1376／1378；trans 1308 | **trans×4（N1–N4）、fill×4（N5–N8）** |
| B `pronoms-possessifs` | choose 1285／1286／1291／1292／1293；fill 1287–1290；trans 1294／1295 | **trans×3（N9–N11）、fill×2（N12、N13）** |
| C `vocab-innovation` | choose 1310–1313／1315／1317；fill 1314；trans 1316 | fill×3（N14–N16）、trans×2（N17、N18） |
| （不開節點）`vocab-reseaux` | choose 1319–1321；trans 1322 | **choose×3（N19–N21）**、trans×1（N22） |
| （不開節點）`vocab-caractere` | 26 課 9 題＋27 課 1324–1329 | trans×2（N23、N24） |

---

## 四、新候選題（沿用 `drafts/story_questions.js` 格式）

```js
var STORY_L27_DRAFTS = [

  /* ── futur-simple：補 trans×4、fill×4（整個 topic 中翻只有 1 題、savoir 0 題）──── */
  { lesson:27, topic:'futur-simple', type:'trans',  /* N1 → 節點 A */
    q:'我們去展覽的時候，你會跟我們一起來嗎？', hint:'quand ＋ 還沒發生的事：兩邊都未來式',
    a:'Quand nous irons au salon, tu viendras avec nous ?', aNote:'⭐⭐ aller→ir-、venir→viendr-；quand 後面⛔不能用現在式（課本 p.72 Entraînement 3b）',
    source:'sentences.js S_L27_7；課本 Édito A2 p.72 Entraînement 3b', askClaude:false },
  { lesson:27, topic:'futur-simple', type:'trans',  /* N2 */
    q:'明天我會開我的車去上班。', hint:'-re 動詞：原形去掉 e ＋ -ai',
    a:'Demain, je prendrai ma voiture pour aller au travail.', aNote:'⭐ prendre → prendr- ＋ ai（課本 p.72 Entraînement 3a）',
    source:'sentences.js S_L27_6；課本 Édito A2 p.72 Entraînement 3a', askClaude:false },
  { lesson:27, topic:'futur-simple', type:'trans',  /* N3 */
    q:'未來到處都會是機器人，就像電影裡一樣。', hint:'兩塊整組記：將會有／那將會是',
    a:'Dans le futur, il y aura des robots partout, ce sera comme dans les films.', aNote:'⭐⭐ il y aura ＋ ce sera——本課最高頻的兩塊（課本 p.72 Entraînement 4d）',
    source:'sentences.js S_L27_9；課本 Édito A2 p.72 Entraînement 4d', askClaude:false },
  { lesson:27, topic:'futur-simple', type:'trans',  /* N4 */
    q:'在不久的將來，機器人會為我們服務。', hint:'寫作好用的時間標記；servir 的未來式',
    a:'Dans un avenir proche, des robots nous serviront.', aNote:'⭐ dans un avenir proche＝在不久的將來（比 bientôt 正式）。課本原句後面還有「, à la maison et au restaurant.」',
    source:'課本 Édito A2 p.70 課文 A 第 19–20 行；french_notes.html:9073', askClaude:false },
  { lesson:27, topic:'futur-simple', type:'fill',   /* N5 */
    q:'Elles _____ (savoir) leur chemin.（那些接駁艙自己認得路）', hint:'savoir 的未來字根',
    a:'sauront', aNote:'⭐⭐ savoir → saur- ＋ -ont。⚠️ 題庫目前一題 savoir 都沒有（memory：不規則字根才是瓶頸）',
    source:'課本 Édito A2 p.70 課文 A 第 11 行；french_notes.html:9066', askClaude:false },
  { lesson:27, topic:'futur-simple', type:'fill',   /* N6 */
    q:'Quand le prof ne _____ (pouvoir) pas venir, il _____ (donner) ses cours à distance avec un hologramme.', hint:'quand ＋ 未來 ＋ 未來；pouvoir 雙 r',
    a:'pourra / donnera|pourra, donnera', aNote:'⭐ pouvoir→pourr-；à distance＝遠距（課本 p.72 Entraînement 3d）',
    source:'課本 Édito A2 p.72 Entraînement 3d；french_notes.html:9026', askClaude:false },
  { lesson:27, topic:'futur-simple', type:'fill',   /* N7 */
    q:'Un jour, nous nous _____ (déplacer) en voiture autonome.', hint:'代動詞：反身代名詞留在前面',
    a:'déplacerons', aNote:'⭐ se déplacer（移動）→ nous nous déplacerons（課本 p.72 Entraînement 4a）',
    source:'課本 Édito A2 p.72 Entraînement 4a；french_notes.html:9033', askClaude:false },
  { lesson:27, topic:'futur-simple', type:'fill',   /* N8 */
    q:"L'année prochaine, j'_____ (acheter) une imprimante 3D.", hint:'acheter 的 e 要加重音',
    a:'achèterai', aNote:'⚠️ achèter-（accent grave），不是 acheterai（課本 p.72 Entraînement 4b）',
    source:'課本 Édito A2 p.72 Entraînement 4b；french_notes.html:9034', askClaude:false },

  /* ── pronoms-possessifs：補 trans×3、fill×2（整個 topic 中翻只有 2 題）─────────── */
  { lesson:27, topic:'pronoms-possessifs', type:'trans',  /* N9 → 節點 B */
    q:'老闆想看的是你的臉，不是他們的。', hint:'「他們的（臉）」：複數整組加 s',
    a:"C'est votre tête que l'employeur veut voir, pas les leurs.", aNote:'⭐⭐ les leurs＝leurs têtes。⚠️ 不是 les leur（課本 p.64 課文 A、p.65 Échauffement 1d）',
    source:'課本 Édito A2 p.64 課文 A；french_notes.html:8861', askClaude:false },
  { lesson:27, topic:'pronoms-possessifs', type:'trans',  /* N10 */
    q:'這些是我的！（照片）', hint:'photo 陰性，這裡是複數',
    a:'Voici les miennes !', aNote:'⭐ les miennes＝mes photos（陰性複數）（課本 p.64 課文 A 結尾、p.65 Échauffement 1a）',
    source:'課本 Édito A2 p.64 課文 A；french_notes.html:8875', askClaude:false },
  { lesson:27, topic:'pronoms-possessifs', type:'trans',  /* N11 */
    q:'我們都想認識跟自己興趣相近的人。', hint:'semblable à ＋ 「我們的（興趣）」：à ＋ les 會縮合',
    a:'Nous avons tous envie de rencontrer des gens qui ont des intérêts semblables aux nôtres.', aNote:'⭐⭐ aux nôtres＝à ＋ les nôtres（帽子別忘）。長句，當「整塊產出」的挑戰題（課本 p.64、p.65 Échauffement 1c）',
    source:'課本 Édito A2 p.64 課文 A；french_notes.html:8873', askClaude:false },
  { lesson:27, topic:'pronoms-possessifs', type:'fill',   /* N12 */
    q:"C'est ton idée. → C'est _____.", hint:'idée 是陽性還是陰性？',
    a:'la tienne', aNote:'⚠️ idée 陰性（-ée 結尾）→ la tienne，不是 le tien（課本 p.65 Entraînement 3d）',
    source:'課本 Édito A2 p.65 Entraînement 3d；french_notes.html:8927', askClaude:false },
  { lesson:27, topic:'pronoms-possessifs', type:'fill',   /* N13 */
    q:"C'est leur projet. → C'est _____.", hint:'leur 這一行加不加帽子？',
    a:'le leur', aNote:'projet 陽性單數；leur 這一行完全不變、不加帽子（課本 p.65 Entraînement 3e）',
    source:'課本 Édito A2 p.65 Entraînement 3e；french_notes.html:8928', askClaude:false },

  /* ── vocab-innovation：補 fill×3、trans×2（整個 topic fill 1／trans 1）──────────
     填空全出自課本 p.73 Vocabulaire 3（配對題），答案照筆記 french_notes.html:9142–9147 */
  { lesson:27, topic:'vocab-innovation', type:'fill',   /* N14 → 節點 C */
    q:'Bientôt, les robots deviendront _____.（不可或缺的）', hint:'dispenser＝免除 → 免不了的',
    a:'indispensables', aNote:'⚠️ 形容詞跟著 les robots 加 s。devenir → deviendront（未來式不規則字根）',
    source:'課本 Édito A2 p.73 Vocabulaire 3a；french_notes.html:9142', askClaude:false },
  { lesson:27, topic:'vocab-innovation', type:'fill',   /* N15 */
    q:'Un jour, les voitures seront _____.（自動駕駛的）', hint:'也可以形容一個人很「自主」',
    a:'autonomes', aNote:'⭐ autonome＝自主的、自動駕駛的（課本 p.73 Vocabulaire 3b）',
    source:'課本 Édito A2 p.73 Vocabulaire 3b；french_notes.html:9143', askClaude:false },
  { lesson:27, topic:'vocab-innovation', type:'fill',   /* N16 */
    q:"J'ai acheté une imprimante 3D, c'est très _____.（方便好用）", hint:'c\'est 後面的形容詞用陽性',
    a:'pratique', aNote:'課本 p.73 Vocabulaire 3d。imprimer＝列印 → une imprimante',
    source:'課本 Édito A2 p.73 Vocabulaire 3d；french_notes.html:9145', askClaude:false },
  { lesson:27, topic:'vocab-innovation', type:'trans',  /* N17 */
    q:'我修好我的電腦了，希望它能正常運作。', hint:'fonctionner＝marcher',
    a:"J'ai réparé mon ordinateur, j'espère qu'il va bien fonctionner.", aNote:'⭐ réparer＝修理；espérer que ＋ 直陳式（課本 p.73 Vocabulaire 2e，空格答案 fonctionner）',
    source:'sentences.js S_L27_10；課本 Édito A2 p.73 Vocabulaire 2e', askClaude:false },
  { lesson:27, topic:'vocab-innovation', type:'trans',  /* N18 */
    q:'依我看，AI 是革命性的。', hint:'表達意見的固定開場；⚠️ 法文縮寫的字母順序',
    a:"Selon moi, l'IA est révolutionnaire.", aNote:'⚠️⚠️ 法文是 IA 不是 AI（形容詞在後）。🎙 老師的口說題 Selon vous, quelle innovation est révolutionnaire ?',
    source:'french_notes.html:9169（課堂口說題）', askClaude:true },

  /* ── vocab-reseaux：補 choose×3（原本 3 題、低於引擎門檻 4）、trans×1 ──────────
     選項全部是課本 p.64 理解題的原文或中文，⛔ 沒有自創法文干擾項 */
  { lesson:27, topic:'vocab-reseaux', type:'choose',   /* N19 */
    q:'課文〈Quelles photos pour vos profils ?〉：哪一條建議是給「職業社群」（réseau professionnel）的？', hint:'要給老闆看的那一張',
    a:"Il faut avoir l'air sérieux.", aNote:'⭐ 課本 p.64 理解題 3：職業社群＝a、d；個人社群＝b、c。avoir l\'air ＋ 形容詞＝看起來…',
    opts:["Il faut avoir l'air sérieux.","Il faut avoir l'air sympathique.","On peut montrer ses goûts et ses loisirs."],
    source:'課本 Édito A2 p.64 Compréhension écrite 3', askClaude:false },
  { lesson:27, topic:'vocab-reseaux', type:'choose',   /* N20 */
    q:'根據課文，為什麼要準備不同的大頭照？下面哪一個「不是」課文給的理由？', hint:'課文說要「對得上給誰看」',
    a:'Pour montrer toute sa vie.', aNote:'課本 p.64 理解題 2（複選）：正解是 b、c——適應不同社群、保持更新。a「展示整個人生」課文沒說',
    opts:['Pour montrer toute sa vie.',"Pour s'adapter aux différents réseaux.",'Pour actualiser son profil.'],
    source:'課本 Édito A2 p.64 Compréhension écrite 2', askClaude:false },
  { lesson:27, topic:'vocab-reseaux', type:'choose',   /* N21 */
    q:'「N\'hésitez pas à vous mettre en scène.」的 n\'hésitez pas à 是什麼意思？', hint:'hésiter＝猶豫',
    a:'儘管去…、別客氣', aNote:'⭐ 超高頻客氣說法，DELF 寫作建議句可直接搬（french_notes.html:8871、8878）',
    opts:['儘管去…、別客氣','不要猶豫太久，快決定','請不要這樣做','你沒有必要…'],
    source:'課本 Édito A2 p.64 課文 A；french_notes.html:8871', askClaude:false },
  { lesson:27, topic:'vocab-reseaux', type:'trans',  /* N22 */
    q:'在那邊，重點是要讓人有好感。', hint:'無人稱句「重點在於」＋ 原形',
    a:"Là, il s'agit d'attirer la sympathie.", aNote:'⭐⭐ il s\'agit de ＋ 原形＝重點在於（只有 il 這個形式）；attirer＝吸引',
    source:'課本 Édito A2 p.64 課文 A；french_notes.html:8868', askClaude:false },

  /* ── vocab-caractere：補 trans×2（整個 topic 中翻只有 1 題）──────────────────── */
  { lesson:27, topic:'vocab-caractere', type:'trans',  /* N23 */
    q:'Antoine 不會改變主意，因為他真的很固執。', hint:'「改變主意」後面不用所有格',
    a:"Antoine ne va pas changer d'avis parce qu'il est vraiment têtu.", aNote:'⭐ changer d\'avis（不是 changer son avis）；têtu 來自 la tête（課本 p.66 Vocabulaire 4c）',
    source:'課本 Édito A2 p.66 Vocabulaire 4c；french_notes.html:8812', askClaude:false },
  { lesson:27, topic:'vocab-caractere', type:'trans',  /* N24 */
    q:'Tatiana 從不說謊，她永遠很誠實。', hint:'mentir 的 il 形；honnête 的 h 不發音',
    a:'Tatiana ne ment jamais, elle est toujours honnête.', aNote:'⭐ mentir：il ment（t 不發音）。課本原句用逗號連接（筆記寫成兩句，句號）',
    source:'課本 Édito A2 p.66 Vocabulaire 4b；french_notes.html:8805', askClaude:false },
];
```

---

## 五、來源核對（入庫前 Owen 要對的地方）

課本檔：`assets/.textbook_cache.txt`（Édito A2；p.64 從 `:53468`、p.65 從 `:53604`、p.66 從 `:53745`、p.70 從 `:54146`、p.72 從 `:54454`、p.73 從 `:54584`）。

| 候選 | 課本位置 | 核對結果 |
|---|---|---|
| N1 | p.72 Entraînement 3b（`:54488`） | ⚠️ 課本原句是 `au salon des innovations technologiques`，句庫 S_L27_7 與筆記都截成 `au salon`——截取不改字，但請知悉 |
| N2、N3 | p.72 Entraînement 3a、4d（`:54487`、`:54495`） | ✅ 相符（答案取自筆記 `:9023`、`:9036`） |
| N4 | p.70 第 19–20 行（`:54168–54169`） | ✅ 取自課本，截掉句尾 `, à la maison et au restaurant` |
| N5 | p.70 第 11 行（`:54160`） | ✅ 課本 `elles sauront leur chemin`（原文是長句的一部分，前面是 `Elles seront sous terre, dans des tubes, et`） |
| N6、N7、N8 | p.72 Entraînement 3d、4a、4b（`:54490`、`:54492`、`:54493`） | ✅ 相符；⚠️ 筆記 `:9026` 把 3d 截成「…à distance」少了 `avec un hologramme`，草稿用課本完整版 |
| N9、N10、N11 | p.64 課文 A（`:53479–53480`、`:53498`、`:53493–53494`）＋ p.65 Échauffement 1（`:53624–53627`） | ✅ 逐字相符 |
| N12、N13 | p.65 Entraînement 3d、3e（`:53656`、`:53658`） | ✅ 題目相符；答案取自筆記 `:8927–8928`（老師帶做） |
| N14–N16 | p.73 Vocabulaire 3a／3b／3d（`:54589–54599`） | ✅ 題目相符（PDF 抽字把配對兩欄攪在一起，已對照筆記 `:9142–9145` 的配對結果） |
| N17 | p.73 Vocabulaire 2e（`:54639`） | ✅ 題目相符；空格答案 `fonctionner` 取自筆記 `:9135` |
| N18 | 課本沒有；出自 `french_notes.html:9169`（老師的口說題、老師接受的說法） | ⚠️ 只有課堂出處，`askClaude:true`，⏸ 請 Owen 對過筆記 |
| N19、N20 | p.64 Compréhension écrite 2、3（`:53509–53515`、`:53591–53597`） | ✅ 選項逐字取自課本；⚠️ 正解是我依課文判讀（課本沒印答案），請 Owen 確認 |
| N21、N22 | p.64 課文 A（`:53491`、`:53489`） | ✅ 相符 |
| N23、N24 | p.66 Vocabulaire 4c、4b（`:53889`、`:53888`） | ✅ 題目相符；⚠️ 課本兩句都用標點連接（`:` 與 `,`），筆記寫成兩句；草稿 N24 照課本用逗號 |

### ⚠️ 課本自己的筆誤（照內容鐵律標出來，⛔ 不沉默採用）
- **p.65 Fonctionnement 表下方的例子寫 `notre profil (masculin pluriel) → le nôtre`**（`:53645`）。`notre profil` 是**陽性單數**，`le nôtre` 也是單數——「masculin pluriel」是課本標錯。筆記 `:8914` 寫的是 `notre profil → le nôtre`（沒抄那個標籤），是對的。⭐ Owen 手上的課本會看到這個標籤，看到不一致時以筆記為準。

### 與標準法文／課本的差異
- 無（除上面兩條截取與一條課本筆誤）。

---

## 六、還沒做／需要 Owen 決定

1. ⏸ **ch7／ch10 的節點數**：連同第 33、34 課的建議一起決定「加」還是「換」（取捨建議見第二節）。
2. ⏸ 節點 C（ch5 暖氣章）要不要：它只用到 `vocab-innovation` 裡「故障／修理」那一小角，主軸「科技與未來」在 12 章主線裡**沒有自然的家**——我認為這個 topic 留給地城／塔就夠了，C 標可選。
3. ⏸ N19／N20 的正解是我依課文判讀，課本沒有印答案。
4. ⚠️ 沒有驗證「已通關章節新增節點後的顯示」（見第二節警語）。
5. ⏸ D4 剩下第 28、10 課。
