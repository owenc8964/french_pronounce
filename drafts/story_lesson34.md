# drafts/story_lesson34.md — D4：第 34 課掛進主線的對照與候選題（2026-09-22 清晨排程）

> 對應 `GAME_ROADMAP.md` 佇列項 **D4**（AUDIT 缺口 2：主線 12 章沒有覆蓋第 34 課）。
> ⛔ 這份只是**建議與候選**，沒有改 `story.js`／`questions.js`／`situations.js`。⏸ 入庫前等 Owen 核對。
> 來源紀律：新候選題的法文**逐字取自** `sentences.js`（S_L34_x）或課本 Édito A2，⛔ 沒有自創任何法文句；中文旁白與 hint 可原創。

---

## 一、結論（先看這段）

1. 第 34 課在題庫已經有 **50 題、4 個 topic**，題量不是問題；**缺的只是主線沒有節點指向它們**（`story.js` 12 章的 `lessons`／`topics` 都沒有第 34 課）。
2. 這 4 個 topic 在 `situations.js` 的 17 個情境裡**都沒有家**（跟第 33 課的 3 個 topic 同一個問題）——所以主線抽題（`quest.html:3109` 起：`q.topic===B.topic && q.type===m.type`）只有節點明確指定 topic 才抽得到。
3. 引擎的抽題門檻是 **choose ≥ 4（不足會補同課別 topic 的題）、產出型（fill／trans）≥ 1**（`quest.html:3121`）。照這個標準：

| topic | choose | fill | trans | 主線抽題會遇到的問題 |
|---|---|---|---|---|
| `subjonctif-present` | 4 | 8 | 4 | ✅ 剛好夠 |
| `medias-audio-reseaux` | 5 | 9 | **1** | ⚠️ 中翻法只有一題，打第二場就重複（`B.used` 用完會重置） |
| `critique-film` | 5 | **3** | **1** | ⚠️ 填空偏少、中翻法只有一題 |
| `place-pronoms-cod-coi` | **2** | 4 | 4 | ⚠️ choose 不到 4 → 會被補進同課其他 topic 的題（劇情脫節） |

→ 下面「新候選題」就是補這幾個洞，⭐ 每題都有出處。

---

## 二、建議掛到哪裡（4 個新節點）

> ⚠️ **節點以「索引」記進度**（`quest.html:1534–1544`：`S.story.done[章id][索引]`、`S.story.node`）。
> 建議插在該章 **boss 之前**（boss 永遠是最後一個）：在途的玩家不受影響（指標還沒走到那裡）；
> 已通關的章節，新節點會對到舊 boss 的索引而顯示成「已完成」——⚠️ **我沒有開瀏覽器驗證這個顯示行為**，入庫時請互動 session 確認。
> 章的 `lessons` 欄也要補 34（`quest.html:3126` 用它當「題量不足時補題」的課次範圍）。

| # | 掛在 | 節點型 | sit／npc | topic | npcLine（`sentences.js`） | 旁白構想（原創中文，⛔ 不含法文） | 為什麼掛這裡 |
|---|---|---|---|---|---|---|---|
| A | **ch8 le-terrain**（第 3 節點 Léa 提議賽後看電影之後、boss 之前） | `talk` | `rendez-vous`／Léa | `critique-film` | `S_L34_9`（Ce film m'a beaucoup plu.） | 賽後看完電影。Léa 沒問你懂不懂劇情，她問的是「好看嗎」。⭐ 那個「電影」是主詞、「你」是被取悅的人——中文的順序整個倒過來。 | ch8 第 3 節點原本就是 Léa 提議看電影（`S_L9_2`），這是自然的下一步；且 ch8 的 exam 欄寫「口說高頻話題」，影評句型就是 |
| B | ch8（緊接 A） | `trial` | `rendez-vous`／Léa | `place-pronoms-cod-coi` | `S_L34_10`（Les premières scènes, je les ai trouvées nulles.） | 她追問開頭那幾場。⚠️ 你要一次處理三件事：把「那幾場」換成代名詞、放到助動詞前面、過去分詞跟著變。 | 代名詞位置是本課第二個主文法，題材（電影）跟 A 相同，不需要另起情境 |
| C | **ch7 ça-te-dit**（第 3 節點 Étienne 之後、boss 之前） | `talk` | `rendez-vous`／Léa | `medias-audio-reseaux` | `S_L34_6`（Je ne veux pas être connecté tout le temps.） | Léa 傳訊息說她這週想離開社群網路。⭐ 這不是在抱怨，是在邀你——不上線的時候她才有空。 | ch7 主題是邀約與拒絕，Léa 本來就是靠訊息聯絡；「離線」是把邀約合理化的自然理由 |
| D | **ch12 examen**（第 3 節點 Baptiste 之後、`strategie-lecture` trial 之前） | `talk` | `canada`／Marie-Ève | `subjonctif-present` | `S_L34_5`（Il est important que j'aie le diplôme pour aller au Canada.） 或 `S_L34_4`（…il faut absolument que j'aille voir l'immigration.） | 考前一週，Marie-Ève 問你還缺哪份文件。⭐ 她說的不是「你有沒有」，是「你**必須**去辦」——虛擬式就是「必須」的語氣。 | ⭐⭐ 這兩句是全庫**唯一**直接講移民手續與文憑的句子（`STORY.md` 素材缺口 ② 說行政手續完全沒素材，這是第一批），跟 ch12 的「為什麼是加拿大」主軸吻合；備案：改掛 ch6 Baptiste（il faut que＝建議句型升級版） |

⚠️ 節點 D 的取捨：ch12 目前已有 5 個節點；再加 1 個變 6 個，超過 `story.js` 檔頭「3–5 個節點」的建議。若不想超過，可把 D 換成**取代**現有的 `S_L31_2`（Baptiste 考前一晚那個 talk，只掛 giving-advice）——⏸ 請 Owen 決定。

### 對應的 `story.js` 節點草稿（僅供入庫時複製，⛔ 尚未寫入）

```js
// ch8 le-terrain，boss 之前
{ type:'talk',  sit:'rendez-vous', npc:'rendez-vous', topic:'critique-film', npcLine:'S_L34_9',
  text:'賽後看完電影。Léa 沒問你懂不懂劇情，她問的是「好看嗎」。'
    +'⭐ 那個「電影」是主詞、「你」是被取悅的人——中文的順序整個倒過來。' },
{ type:'trial', sit:'rendez-vous', npc:'rendez-vous', topic:'place-pronoms-cod-coi', npcLine:'S_L34_10',
  text:'她追問開頭那幾場。⚠️ 你要一次處理三件事：把「那幾場」換成代名詞、放到助動詞前面、過去分詞跟著變。' },
// ch7 ça-te-dit，boss 之前
{ type:'talk',  sit:'rendez-vous', npc:'rendez-vous', topic:'medias-audio-reseaux', npcLine:'S_L34_6',
  text:'Léa 傳訊息說她這週想離開社群網路。⭐ 這不是在抱怨，是在邀你——不上線的時候她才有空。' },
// ch12 examen，strategie-lecture 之前
{ type:'talk',  sit:'canada', npc:'canada', topic:'subjonctif-present', npcLine:'S_L34_5',
  text:'考前一週，Marie-Ève 問你還缺哪份文件。⭐ 她說的不是「你有沒有」，是「你必須去辦」——虛擬式就是「必須」的語氣。' },
```
（章的 `lessons` 補：ch7 加 34、ch8 加 34、ch12 加 34；`topics` 補對應 topic。）

---

## 三、每個節點的 3–4 題（既有題庫為主，新候選補洞）

> 「既有」欄的行號是 `questions.js` 目前的行號（2026-09-22），之後題庫長大會位移，用 `q` 開頭文字搜尋。

| 節點 | 既有題（可直接用） | 新候選（見第四節） |
|---|---|---|
| A `critique-film` | choose：1586（plu 是哪個動詞）／1587（leur 是誰）／1588（哪句是負面評論）；fill：1589／1590／1591 | fill×2（N1、N2）、trans×2（N3、N4） |
| B `place-pronoms-cod-coi` | fill：1596–1599；trans：1600–1603；choose：1604／1605 | **choose×3**（N5–N7，補到 ≥5 題脫離補題區） |
| C `medias-audio-reseaux` | fill：1570–1578（九題，含 connecté 那題就是 S_L34_6 的前半）；choose：1580–1584 | trans×2（N8、N9） |
| D `subjonctif-present` | fill：1554–1561；choose：1553／1562／1563／1564；trans：1565–1568 | trans×4（N10–N13，其中 N12、N13 對應移民主軸） |

---

## 四、新候選題（沿用 `drafts/story_questions.js` 格式）

```js
var STORY_L34_DRAFTS = [

  /* ── critique-film：補 fill×2、trans×2（原本 fill 3／trans 1）──────────────── */
  { lesson:34, topic:'critique-film', type:'fill',   /* N1 */
    q:"Ce film m'a beaucoup _____.", hint:'plaire 的過去分詞；主詞是電影',
    a:'plu', aNote:'🎙 ça me plaît → ça m’a plu。喜歡的人是 me，主詞是「電影」',
    source:'sentences.js S_L34_9；french_notes.html 第 34 課 note 欄', askClaude:false },
  { lesson:34, topic:'critique-film', type:'fill',   /* N2 */
    q:'Les premières scènes, je les ai _____ nulles.', hint:'COD les（陰性複數）在 avoir 前 → 過去分詞配合',
    a:'trouvées', aNote:'課本 p.121 暖身 c。⚠️ 課本印成「Les première scènes」少了 s，標準拼法是 premières（`sentences.js` 與題庫已用標準拼法）',
    source:'sentences.js S_L34_10；課本 Édito A2 p.121', askClaude:false },
  { lesson:34, topic:'critique-film', type:'trans',  /* N3 */
    q:'這部電影我很喜歡。', hint:'plaire，主詞是電影',
    a:"Ce film m'a beaucoup plu.", aNote:'⚠️ 中文「我喜歡」，法文卻是「電影取悅了我」——me 是受詞',
    source:'sentences.js S_L34_9', askClaude:false },
  { lesson:34, topic:'critique-film', type:'trans',  /* N4 */
    q:'開頭那幾場，我覺得很爛。', hint:'COD 放助動詞前；過去分詞要配合',
    a:'Les premières scènes, je les ai trouvées nulles.', aNote:'課本 p.121 暖身 c（負面影評）',
    source:'sentences.js S_L34_10；課本 Édito A2 p.121', askClaude:false },

  /* ── place-pronoms-cod-coi：補 choose×3（原本只有 2，低於引擎門檻 4）──────────
     ⛔ 選項全部用中文，避免自己造出錯誤法文當干擾項 */
  { lesson:34, topic:'place-pronoms-cod-coi', type:'choose',  /* N5 */
    q:"「Ce film, je le conseille à tous les fans de Romain Duris.」句中的 le 代替什麼？", hint:'conseiller qch à qn',
    a:'ce film（直接受詞 COD）', opts:['ce film（直接受詞 COD）','les fans（間接受詞 COI）','Romain Duris','je'],
    aNote:'conseiller ＋ 東西（COD）＋ à ＋ 人（COI）：le＝電影，à tous les fans 是接收的人',
    source:'sentences.js S_L34_8；課本 Édito A2 p.121 暖身 a', askClaude:false },
  { lesson:34, topic:'place-pronoms-cod-coi', type:'choose',  /* N6 */
    q:"「Un journaliste a interviewé ma sœur. Il lui a posé des questions intéressantes.」lui 指誰？", hint:'poser des questions à qn',
    a:'ma sœur（間接受詞 COI）', opts:['ma sœur（間接受詞 COI）','le journaliste','les questions','moi'],
    aNote:'poser des questions à qn → lui；放在助動詞 a 前面',
    source:'questions.js:1597（課本 p.121 練習 2b 的完整句子，換成選擇題）', askClaude:false },
  { lesson:34, topic:'place-pronoms-cod-coi', type:'choose',  /* N7 */
    q:"「Je leur ai conseillé de regarder cette série.」leur 是直接受詞還是間接受詞？", hint:'conseiller à qn',
    a:'間接受詞 COI（à mes parents）', opts:['間接受詞 COI（à mes parents）','直接受詞 COD（cette série）','主詞','副詞'],
    aNote:'課本練習 3d：J’ai conseillé à mes parents de regarder cette série → leur＝à mes parents',
    source:'questions.js:1603（課本 p.121 練習 3d，換成選擇題）', askClaude:false },

  /* ── medias-audio-reseaux：補 trans×2（原本只有 1）──────────────────────── */
  { lesson:34, topic:'medias-audio-reseaux', type:'trans',  /* N8 */
    q:'我不想一直掛在網上。', hint:'être connecté(e)；tout le temps',
    a:'Je ne veux pas être connecté tout le temps.|Je ne veux pas être connectée tout le temps.',
    aNote:'課本 p.119 練習 2b 的句子；connecté 看說話的人是男是女',
    source:'sentences.js S_L34_6；課本 Édito A2 p.119', askClaude:false },
  { lesson:34, topic:'medias-audio-reseaux', type:'trans',  /* N9 */
    q:'有時候我整個週末都把手機關機。', hint:'éteindre 的 je 形；tout le week-end',
    a:"Parfois, j'éteins mon smartphone tout le week-end.|Parfois j'éteins mon smartphone tout le week-end.",
    aNote:'éteindre → j’éteins（課本 p.119 練習 2b 的後半句）',
    source:'sentences.js S_L34_7；課本 Édito A2 p.119', askClaude:false },

  /* ── subjonctif-present：補 trans×4（對應 sentences.js 還沒被做成中翻法的四句）── */
  { lesson:34, topic:'subjonctif-present', type:'trans',  /* N10 */
    q:'它們要適應不同的受眾，這很重要。（它們＝社群網路；用 il est important que）', hint:"que ＋ ils → qu'ils；s'adapter 的 ils 形",
    a:"Il est important qu'ils s'adaptent aux différents publics.", aNote:'⚠️ 課本原句主詞是 les réseaux sociaux（p.117 暖身 b），`sentences.js` 簡化成 ils——兩種寫法都是標準法文',
    source:'sentences.js S_L34_2；課本 Édito A2 p.117 暖身 b', askClaude:false },
  { lesson:34, topic:'subjonctif-present', type:'trans',  /* N11 */
    q:'她教你怎麼用，很好。（用 c\'est bien que）', hint:'評價（不是必要）也用虛擬式；montrer 的 elle 形',
    a:"C'est bien qu'elle te montre comment ça marche.", aNote:'課本 p.117 Fonctionnement 範例句：評價類表達（c’est bien que）也接虛擬式',
    source:'sentences.js S_L34_3；課本 Édito A2 p.117', askClaude:false },
  { lesson:34, topic:'subjonctif-present', type:'trans',  /* N12 → 節點 D */
    q:'今天我一定得去一趟移民局。', hint:'aller 不規則；absolument 放 il faut 後面',
    a:"Aujourd'hui, il faut absolument que j'aille voir l'immigration.", aNote:'🎙 老師的例句：aller → que j’aille',
    source:'sentences.js S_L34_4', askClaude:true },
  { lesson:34, topic:'subjonctif-present', type:'trans',  /* N13 → 節點 D */
    q:'要去加拿大，拿到文憑很重要。', hint:'avoir 不規則（je 形，跟 j’ai 同音）；pour ＋ 原形',
    a:"Il est important que j'aie le diplôme pour aller au Canada.", aNote:'🎙 老師口說成 j’ai；寫要用虛擬式 aie',
    source:'sentences.js S_L34_5', askClaude:true },
];
```

---

## 五、來源核對（入庫前 Owen 要對的地方）

課本檔：`assets/.textbook_cache.txt`（Édito A2）。

| 候選 | 課本位置 | 核對結果 |
|---|---|---|
| N1、N3 | p.121 暖身 d 是 `le film leur a beaucoup plu`；N1/N3 用的 `Ce film m'a beaucoup plu` **不在課本這頁**，出自 `french_notes.html:12525`（第 34 課筆記，note 欄「正面」）與 `:12689`（同一句被標為 🧠 概念缺口：plaire 的主詞是被喜歡的東西） | ✅ 筆記有這句；⚠️ 12689 那行標「概念缺口」——照教學鐵律，這句進遊戲前 Owen 可能要先有一次 plaire 的概念講解，遊戲只負責之後的壓縮練習 |
| N2、N4、N5 | p.121 暖身 a、c | ✅ 逐字相符。⚠️ 課本 c 句印成 `Les première scènes`（少 s），是課本筆誤，本草稿與 `sentences.js` 用標準拼法 `premières` |
| N6、N7 | p.121 練習 2b、3d | ✅ 逐字相符（`questions.js` 已收） |
| N8、N9 | p.119 練習 2b | ✅ 逐字相符（題庫既有 fill 是同一句拆開） |
| N10 | p.117 暖身 b | ⚠️ 課本原句是 `les réseaux sociaux s'adaptent`，`sentences.js` 是 `qu'ils s'adaptent`——差在主詞代名詞化。草稿 q 裡標明「它們＝社群網路」，⏸ 請 Owen 決定要跟課本還是跟句庫 |
| N11 | p.117 Fonctionnement | ✅ 逐字相符 |
| N12、N13 | 不在課本；出自 `french_notes.html:12369`（S_L34_4，🎙 老師示範 aller → aille）與 `:12370`（S_L34_5，🎙 老師口說成 que j'ai、寫要用 aie） | ⚠️ 只有課堂筆記出處，`askClaude:true`（比照 `questions.js` 既有慣例：課堂上組出來的句子）；⏸ 請 Owen 對過筆記再入庫 |

## 六、還沒做／需要 Owen 決定

1. ⏸ 節點 D 要不要超過 5 個節點，或取代現有的 `S_L31_2` 節點（見第二節）。
2. ⏸ 第 34 課的 4 個 topic 要不要在 `situations.js` 新增一個「媒體與影評」情境，讓它們有家（現在只能靠節點硬指定 topic）。⚠️ 那是動 `situations.js` 與 `quest.html` 的 `NPC_WHO`，屬於 B 類，排程不做。
3. ⚠️ 我沒有驗證「已通關章節新增節點後的顯示」（見第二節警語）。
