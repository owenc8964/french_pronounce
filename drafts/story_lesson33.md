# drafts/story_lesson33.md — D4：第 33 課掛進主線的對照與候選題（2026-09-22 清晨排程）

> 對應 `GAME_ROADMAP.md` 佇列項 **D4**（AUDIT 缺口 2：主線 12 章沒有覆蓋第 33 課）。姊妹篇：[story_lesson34.md](story_lesson34.md)。
> ⛔ 這份只是**建議與候選**，沒有改 `story.js`／`questions.js`／`situations.js`。⏸ 入庫前等 Owen 核對。
> 來源紀律：新候選題的法文**逐字取自** `sentences.js`（S_L33_x，都能在 `french_notes.html` 或課本 Édito A2 p.113–114 找到），⛔ 沒有自創任何法文句；中文旁白、hint、選擇題的中文選項可原創。

---

## 一、結論（先看這段）

1. 第 33 課在題庫已有 **38 題、3 個 topic**（`cause-consequence` 15／`medias-vocab` 15／`preference-interet` 8），**缺的是主線沒有節點指向它們**；三個 topic 在 `situations.js` 17 個情境裡都沒有家，只有節點明確指定 topic 才抽得到（`quest.html:3109` 起）。
2. 引擎門檻：**choose ≥ 4（不足會補同課別 topic 的題）、產出型 ≥ 1**（`quest.html:3121`）。逐 topic 檢查：

| topic | choose | fill | trans | 問題 |
|---|---|---|---|---|
| `cause-consequence` | 6 | 7 | **2** | ⚠️ 中翻法偏少 |
| `medias-vocab` | 8 | 6 | **1** | ⚠️ 中翻法只有 1 題，打第二場就重複 |
| `preference-interet` | **3** | 4 | **1** | ⚠️ choose 3＜4 → 會被補進同課別 topic 的題（劇情脫節）；中翻法只有 1 題 |

→ 下面新候選 **10 題**就是補這三個洞（choose 2／trans 8），⭐ 每題有出處。

3. 🎯 **意外的好配對**：課本 p.114「Production orale 4」（`assets/.textbook_cache.txt:60219`）就是「回答一場**關於學業或職業選擇的訪談**，用口語連接詞 parce que、alors、c'est pour ça que」——這**正是 ch10 面試章**的情境。所以 `cause-consequence` 掛 ch10 不是硬塞，是課本本來就這樣設計。

---

## 二、建議掛到哪裡（3 個新節點）

> ⚠️ **節點以「索引」記進度**（`quest.html:1534–1544`：`S.story.done[章id][索引]`）。建議插在該章 **boss 之前**：
> 在途玩家不受影響；已通關的章節，新節點會對到舊 boss 的索引而顯示成「已完成」——⚠️ **我沒有開瀏覽器驗證這個顯示行為**，入庫時請互動 session 確認。
> 章的 `lessons` 欄也要補 33（`quest.html:3126`：題量不足時的補題範圍）。

| # | 掛在 | 節點型 | sit／npc | topic | npcLine（`sentences.js`） | 旁白構想（原創中文，⛔ 不含法文） | 為什麼掛這裡 |
|---|---|---|---|---|---|---|---|
| A | **ch10 entretien**（`connectors-pour-parceque` boss 之前，Lucas 形容詞那個 trial 之後） | `trial` | `travail`／Mme Fabre | `cause-consequence` | `S_L33_5`（Tu reçois les nouvelles sur ton téléphone, alors tu n'as pas besoin de les chercher.） | Mme Fabre 不問「你做過什麼」，她問「所以呢」。⭐ 你講完一個理由，她會等你接第二句：因為這樣，所以那樣。原因和結果是兩截，接不起來的面試就只是清單。 | 課本 p.114 Production orale 4 本來就是「職業選擇訪談＋口語連接詞（alors／c'est pour ça que）」；ch10 boss 只練「原因」（parce que／pour），這裡補「結果」（alors／donc／c'est pourquoi），兩截接起來才是完整的理由 |
| B | **ch11 la-dispute**（最後 boss 之前） | `trial` | `opinion`／Julien | `preference-interet` | `S_L33_8`（Je préfère les réseaux sociaux aux médias traditionnels.） | Julien 問你：「所以你比較站哪邊？」⚠️ 「都可以」不是答案。⭐ préférer A à B 這個句型逼你在同一句裡選邊、還要把被放棄的那邊說出口。 | ch11 主題是「有立場而不失禮」；préférer A à B 是最短的立場句型（一句同時表態＋比較），比 ch11 現有節點更基礎，⛔ 不取代任何現有節點 |
| C | **ch7 ça-te-dit**（Étienne talk 之後、boss 之前；⭐ 順序在第 34 課節點 C 之前） | `talk` | `rendez-vous`／Léa | `medias-vocab` | `S_L33_9`（Ah oui, je suis déjà au courant, je lui ai téléphoné hier.） | Léa 傳來一則她朋友的消息，開頭問你「你聽說了嗎」。⭐ 你不用假裝第一次聽到——「我已經知道了」也是一種回答，而且是最省力的一種。 | ch7 是邀約與人際往來，Léa 本來就靠訊息聯絡；être au courant 是朋友間傳消息時最自然的一句。⭐ 與第 34 課節點 C（Léa 說想離開社群網路）連成一個小段落：先聊消息、再聊要不要離線 |

⚠️ 節點 B 的取捨：ch11 目前 5 個節點，再加 1 個變 6 個，超過 `story.js` 檔頭「3–5 個節點」的建議；若不想超過，可把 B **取代**現有 `S_L26_6`（Mamie Odette 的 talk，只掛 tout-chaque）。⏸ 請 Owen 決定。
⚠️ 節點 B 的 npcLine ⛔ **不要**改用 `S_L33_10`／`S_L33_11`——那兩句是 **Owen 自己的回答**（老師修過），依 CLAUDE.md「個人化內容不代筆」不適合當 NPC 台詞。

### 對應的 `story.js` 節點草稿（僅供入庫時複製，⛔ 尚未寫入）

```js
// ch10 entretien，boss 之前
{ type:'trial', sit:'travail', npc:'travail', topic:'cause-consequence', npcLine:'S_L33_5',
  text:'Mme Fabre 不問「你做過什麼」，她問「所以呢」。⭐ 你講完一個理由，她會等你接第二句：因為這樣，所以那樣。'
    +'原因和結果是兩截，接不起來的面試就只是清單。' },
// ch11 la-dispute，boss 之前
{ type:'trial', sit:'opinion', npc:'opinion', topic:'preference-interet', npcLine:'S_L33_8',
  text:'Julien 問你：「所以你比較站哪邊？」⚠️ 「都可以」不是答案。'
    +'⭐ préférer A à B 這個句型逼你在同一句裡選邊、還要把被放棄的那邊說出口。' },
// ch7 ça-te-dit，boss 之前（在第 34 課節點 C 之前）
{ type:'talk',  sit:'rendez-vous', npc:'rendez-vous', topic:'medias-vocab', npcLine:'S_L33_9',
  text:'Léa 傳來一則她朋友的消息，開頭問你「你聽說了嗎」。⭐ 你不用假裝第一次聽到——「我已經知道了」也是一種回答，而且是最省力的一種。' },
```
（章的 `lessons` 補：ch7、ch10、ch11 各加 33；`topics` 補對應 topic。）

---

## 三、每個節點的 3–4 題

> 「既有」欄的行號是 `questions.js` 目前的行號（2026-09-22），題庫長大會位移，請用 `q` 開頭文字搜尋。

| 節點 | 既有題（可直接用） | 新候選（見第四節） |
|---|---|---|
| A `cause-consequence` | fill：1512–1518（à cause de／grâce à／alors／car 全有）；choose：1519–1524；trans：1525–1526 | trans×4（N1–N4） |
| B `preference-interet` | fill：1544–1547；choose：1548–1550；trans：1551 | **choose×2（N7、N8，補到 5 題脫離補題區）**、trans×2（N9、N10） |
| C `medias-vocab` | fill：1528–1533；choose：1534–1541；trans：1542 | trans×2（N5、N6） |

⚠️ 節點 A 的 pool 會抽到 1523（「Mais où est donc Ornicar」口訣）與 1524（ni…ni）——那是老師補充的**對等連接詞**，跟「原因／結果」不同一組。留著不會壞，但抽到時會有一點離題感；若入庫時想乾淨，可把這兩題的 topic 拆成 `coord-conjonctions`（⏸ 動 `questions.js`，留給 Owen 決定）。

---

## 四、新候選題（沿用 `drafts/story_questions.js` 格式）

```js
var STORY_L33_DRAFTS = [

  /* ── cause-consequence：補 trans×4（原本只有 2）──────────────────────────── */
  { lesson:33, topic:'cause-consequence', type:'trans',  /* N1 */
    q:'因為網路，紙本報紙經營困難。', hint:'負面原因＋名詞：à cause de；Internet 前面的 de 要縮寫',
    a:"À cause d'Internet, la presse papier a des difficultés.", aNote:'課本 p.114 Fonctionnement 範例句。à cause de ＝ 負面原因；de ＋ 母音開頭 → d\'',
    source:'sentences.js S_L33_3；課本 Édito A2 p.114', askClaude:false },
  { lesson:33, topic:'cause-consequence', type:'trans',  /* N2 */
    q:'我靠社群網路隨時掌握新聞。', hint:'正面原因：grâce à ＋ les → aux；informé(e)',
    a:'Je suis toujours informée grâce aux réseaux sociaux.|Je suis toujours informé grâce aux réseaux sociaux.',
    aNote:'課本 p.114 Fonctionnement 範例句（課本用陰性 informée；說話的人是男生就寫 informé）',
    source:'sentences.js S_L33_4；課本 Édito A2 p.114', askClaude:false },
  { lesson:33, topic:'cause-consequence', type:'trans',  /* N3 */
    q:'新聞自己送到你手機上，所以你不用去找。（用 alors）', hint:'alors＝口說的「所以」；recevoir；avoir besoin de ＋ 原形',
    a:"Tu reçois les nouvelles sur ton téléphone, alors tu n'as pas besoin de les chercher.", aNote:'課本 p.114 暖身 f。alors 主要用在口說、donc 主要用在書面',
    source:'sentences.js S_L33_5；課本 Édito A2 p.114 暖身 f', askClaude:false },
  { lesson:33, topic:'cause-consequence', type:'trans',  /* N4：偏難，可選用 */
    q:'所以 Twitch 會成功一點也不奇怪。', hint:"donc 放在動詞後（書面）；n'avoir rien de ＋ 形容詞",
    a:"Le succès de Twitch n'a donc rien d'étonnant.", aNote:'課本 p.113 文章最後一句。⚠️ 比其他候選難（donc 的位置＋rien de 形容詞），建議只在高階難度抽',
    source:'sentences.js S_L33_12；課本 Édito A2 p.113', askClaude:false },

  /* ── medias-vocab：補 trans×2（原本只有 1）──────────────────────────────── */
  { lesson:33, topic:'medias-vocab', type:'trans',  /* N5 → 節點 C */
    q:'對啊，我已經知道了，我昨天打給她了。', hint:'être au courant；téléphoner à qn 的複合過去（lui 放助動詞前）',
    a:"Ah oui, je suis déjà au courant, je lui ai téléphoné hier.", aNote:'🎙 老師的情境句。⚠️ 逐字稿這段辨識很糊（french_notes.html:12233 曾疑似把兩個動詞疊在一起），正確寫法是 je suis déjà au courant',
    source:'sentences.js S_L33_9；french_notes.html:11771', askClaude:true },
  { lesson:33, topic:'medias-vocab', type:'trans',  /* N6：偏難，可選用 */
    q:'多虧了 Twitch，傳統媒體試著接觸更年輕、更常上網的觀眾。', hint:'grâce à ＋ 專有名詞；les médias classiques；toucher un public',
    a:'Grâce à Twitch, les médias classiques essaient de toucher un public plus jeune et plus connecté.', aNote:'課本 p.113 文章句，同時練 médias／public／connecté 三個本課詞',
    source:'sentences.js S_L33_2；課本 Édito A2 p.113', askClaude:false },

  /* ── preference-interet：補 choose×2（原本只有 3，低於引擎門檻 4）＋ trans×2 ──
     ⛔ 選項全部用中文，避免自己造出錯誤法文當干擾項 */
  { lesson:33, topic:'preference-interet', type:'choose',  /* N7 */
    q:"「J'aime mieux lire la presse en ligne.」是什麼意思？", hint:'aimer 加 mieux',
    a:'我比較喜歡看網路新聞', opts:['我比較喜歡看網路新聞','我很會看網路新聞','我不喜歡看網路新聞','網路新聞比報紙好'],
    aNote:"🎙 老師：j'aime bien、j'aime beaucoup 學過了，j'aime mieux ＝ je préfère",
    source:'sentences.js S_L33_7；課本 Édito A2 p.113；french_notes.html:11777', askClaude:false },
  { lesson:33, topic:'preference-interet', type:'choose',  /* N8 */
    q:"「Je préfère les réseaux sociaux aux médias traditionnels.」被放棄的是哪一邊？", hint:'préférer A à B：B 在 à 後面',
    a:'médias traditionnels（傳統媒體）', opts:['médias traditionnels（傳統媒體）','réseaux sociaux（社群網路）','兩邊都被放棄','句子沒有比較'],
    aNote:'préférer A à B：A 是選的、B 是放棄的；à ＋ les → aux',
    source:'sentences.js S_L33_8；課本 Édito A2 p.113 詞彙欄', askClaude:false },
  { lesson:33, topic:'preference-interet', type:'trans',  /* N9 */
    q:'我比較喜歡看網路新聞。', hint:'aimer mieux ＋ 原形（＝ je préfère）',
    a:"J'aime mieux lire la presse en ligne.|Je préfère lire la presse en ligne.", aNote:"j'aime mieux ＝ je préfère（老師）",
    source:'sentences.js S_L33_7；課本 Édito A2 p.113', askClaude:false },
  { lesson:33, topic:'preference-interet', type:'trans',  /* N10 → 節點 B */
    q:'比起傳統媒體，我比較喜歡社群網路。', hint:'préférer A à B；à ＋ les → aux',
    a:'Je préfère les réseaux sociaux aux médias traditionnels.', aNote:'préférer A à B：à ＋ les → aux',
    source:'sentences.js S_L33_8；課本 Édito A2 p.113', askClaude:false },
];
```

---

## 五、來源核對（入庫前 Owen 要對的地方）

課本檔：`assets/.textbook_cache.txt`（Édito A2；p.113 文章＋詞彙、p.114 Grammaire「La cause et la conséquence」）。

| 候選 | 課本位置 | 核對結果 |
|---|---|---|
| N1 | p.114 Fonctionnement（`:60197`） | ✅ 逐字相符 |
| N2 | p.114 Fonctionnement（`:60199`） | ✅ 逐字相符（課本用陰性 informée，已給男女兩種 `a`） |
| N3 | p.114 暖身 f（`:60191–60192`） | ✅ 逐字相符 |
| N4、N6 | p.113 文章（`:60164–60171`） | ✅ 逐字相符 |
| N7、N9 | p.113「J'aime mieux lire la presse en ligne」（`:60025, 60045, 60149`） | ✅ 課本有（＝ je préfère 是老師的說明，見 `french_notes.html:11777`） |
| N8、N10 | p.113 詞彙欄「Je préfère les réseaux sociaux aux médias traditionnels」（`:60150`） | ✅ 逐字相符 |
| N5 | 課本 p.113、p.115 只有詞條 `être au courant (de)`；**整句**是老師課堂情境句（`french_notes.html:11771`） | ⚠️ 整句出處只有課堂筆記，`askClaude:true`；⚠️ `:12233` 註明逐字稿這段辨識糊（je suis être déjà…）——⏸ 請 Owen 對過筆記再入庫 |

### 與標準法文／課本的差異
- 無。這一課的候選句全部符合標準法文；唯一要注意 N2 的性別（informé／informée），已在 `a` 給兩種。

## 六、還沒做／需要 Owen 決定

1. ⏸ 節點 B 要不要超過 5 個節點，或取代現有 `S_L26_6`（見第二節）。
2. ⏸ `cause-consequence` 裡 1523／1524 兩題（Ornicar 口訣、ni…ni）要不要拆成獨立 topic（見第三節）。
3. ⏸ 第 33、34 課共 7 個 topic 沒有 `situations.js` 情境；若要新增「媒體」情境（含 NPC），屬 B 類，排程不做。
4. ⚠️ 我沒有驗證「已通關章節新增節點後的顯示」（見第二節警語）。
