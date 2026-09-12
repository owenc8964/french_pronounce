/* story.js — 主線劇情資料（2026-09-12 新增）
 *
 * 起因：Owen 的原話是「**我是真的在破關，而不是我只是用 RPG 形式做練習**」。
 * quest.html 目前只有隨機地城＋當日關主，沒有故事線——所以玩起來像「披著 RPG 皮的練習」。
 * 這支檔案補的就是那條線：**一條有起點、有中段、有終點的主線**。
 *
 * ⭐ 主線前提（已跟 Owen 敲定）：**「移民者的第一年」**。
 *    故事線就是他真的要走的路——抵達、找住處、買菜、看醫生、找工作……最終章是考場。
 *    起點：他剛下飛機，誰都不認識。終點：2027-09-19 走進 TCF Canada 考場。
 *    ⛔ 這不是隱喻，是行程表。所以每一章都必須回答「這章練到的東西，考試哪裡會出現」。
 *
 * ════════════════════════════════════════════════════════════════
 * ⚠️ 鐵律（違反等於作廢）
 * ════════════════════════════════════════════════════════════════
 * 1. ⛔ **這支檔案不含任何法文句子。** 所有 NPC 台詞一律用 `npcLine`
 *    引用 `sentences.js` 的既有 id（例如 'S_L31_5'）——⛔ 不重打法文、⛔ 不自創法文。
 *    角色名、中文旁白、章名可以原創；法文永遠只能從既有句庫取。
 * 2. ⛔ **後果只放在遊戲角色身上**：角色掉血、金幣散落、NPC 變生疏。
 *    ⛔ 不顯示分母、⛔ 不寫「你還有 N 個沒完成」、⛔ 不出現帶罪惡感的句子
 *    （CLAUDE.md 練習頁鐵律 ＋ memory feedback_fun_is_the_engine）。
 * 3. ⭐ **每章的 `clear` 是劇情條件，不是數值累積**——「說服房東」「Baptiste 記住你的名字」，
 *    ⛔ 不是「累積 300 點經驗」。數值只是達成劇情的手段，不是關卡本身。
 * 4. ⭐ **跳過必須合法**：任何一章、任何一個節點都要能跳過，且不擋住後面的章
 *    （CLAUDE.md「⭐ 跳過必須是合法動作」，黃金範本 table_drill.html）。
 *    跳過記進 `clb7_*_known`，⛔ 不可永久移除該節點。
 *
 * ════════════════════════════════════════════════════════════════
 * 欄位說明
 * ════════════════════════════════════════════════════════════════
 *   ch        章號（1–12）。⚠️ **編號是永久門牌，一經指定不重編**
 *             （CLAUDE.md 第 3 條 codex.js 座標原則，Owen 靠位置記憶）
 *   id        英數代號，程式用
 *   title     中文章名｜titleFr 法文副標（⚠️ 副標是標題不是教材，不進句庫）
 *   logline   一句話的本章梗概（給「主線總覽」用）
 *   conflict  情境與衝突：為什麼這一關會擋住他
 *   sit       主場情境 → `situations.js` 的 id
 *   npc       主場 NPC → `quest.html` 的 `NPC_WHO` key（＝ situation id）
 *   lessons   對應課次（`french_notes.html` / `questions.js` 的 lesson）
 *   topics    對應 topic（⚠️ 每個都必須真的存在於 `questions.js` 的 BANK）
 *   nodes     關卡序列 3–5 個節點：
 *               type    'talk' 遭遇／'fight' 小戰鬥／'trial' 考驗／'boss' 關主
 *               sit     這個節點的情境（可跨章借用別的情境 → 這就是 NPC 重複出場的機制）
 *                       ⚠️ 可以省略：少數節點（例如考場策略）在 17 個情境裡沒有對應的家，
 *                          這時只留 topic，⛔ 不硬塞一個不對的 sit
 *               topic   這個節點抽題用的 topic（存在於 BANK）
 *               npc     這個節點出場的 NPC key（省略＝用章的主場 NPC）
 *               npcLine ⭐ `sentences.js` 的句子 id ——這個節點台上出現的法文。
 *                       ⚠️ 它可能是 NPC 的開場白，也可能是這個考驗的目標句，
 *                          由 type 決定怎麼呈現（talk＝對方說；trial/boss＝你要產出的）
 *               text    中文旁白（原創，⛔ 不含法文教學句）
 *   clear     ⭐ 破關條件。`type:'story'` 一律是劇情條件；`desc` 是人看的，
 *             `check` 是程式可驗的形狀（rel＝關係等級，用 quest.html 的 AFF_LV 名稱）
 *   unlock    needs[] 全部要通關；anyOf[] 只要任一通關（＝分支）
 *   reward    item 道具／rel 關係推進／unlock 解鎖了什麼
 *   exam      ⭐ 這章在 TCF／DELF／TEF 的哪裡出現（一律抄 `situations.js` 的 `exam` 欄位，
 *             ⛔ 不自行發明考試資訊）
 *
 * ⚠️ 素材缺口（誠實記錄，⛔ 不要因為「章要湊滿」就硬編內容）：
 *    完整清單在 `STORY.md`「⚠️ 素材缺口」一節。最痛的三個：
 *    ① `canada` 情境全庫只有 6 題（單一 topic vocab-parcours-vie），
 *       而 `sentences.js` **沒有任何一句在講加拿大或移民動機** → 第 12 章的核心問題沒有語料
 *    ② 行政手續（préfecture／dossier／titre de séjour）與銀行開戶完全沒有素材
 *       （`scenes.js` 有 banque 劇本，但題庫與句庫都沒有對應內容）→ 只能用旁白帶過
 *    ③ `famille`(19題)／`etudes`(15題)／`restaurant`(13題) 撐不起一整章 → 一律降為節點
 *
 * 用法：`<script src="story.js"></script>` 之後可讀全域 `STORY`；
 *       node 端 `require('./story.js').STORY`。
 *       ⛔ 這支檔案是純資料，不含任何行為邏輯——渲染與進度都在使用它的頁面裡做。
 */
const STORY = [

/* ───────────────────────────── 第一幕：活下來 ───────────────────────────── */

{ ch:1, id:'atterrissage',
  title:'落地', titleFr:'Le premier jour',
  logline:'他下了飛機，行李還在手上，第一句法文就要用來證明自己是誰。',
  conflict:'他會的法文夠應付課本，不夠應付一個真的在等他回答的人。'
    +'第一關不是文法，是**反應時間**——Camille 在樓梯間問一句 Ça va，他愣了三秒，'
    +'那三秒就是整個故事的起點。',
  sit:'se-presenter', npc:'se-presenter',
  lessons:[1,2,18],
  topics:['greetings-politeness','etre-avoir','question-words','on-vs-nous','cest-il-est'],
  nodes:[
    { type:'talk',  sit:'canada', npc:'canada', topic:'vocab-parcours-vie', npcLine:'S_L18_4',
      text:'入境櫃檯。Marie-Ève 翻著前一份檔案，隨口說了一句別人的故事——去年，有人也是這樣在這裡定居下來的。'
        +'然後她抬頭看你。輪到你了。' },
    { type:'talk',  sit:'se-presenter', topic:'greetings-politeness', npcLine:'S_L1_1',
      text:'樓梯間。Camille 抱著一箱東西側身讓你過，順口丟了三個字。'
        +'她不是在考你，她只是在打招呼——但你必須在她走上樓之前回答。' },
    { type:'trial', sit:'se-presenter', topic:'question-words', npcLine:'S_L2_1',
      text:'Camille 停下來了。她真的想知道你從哪裡來、住哪一層。'
        +'⚠️ 這裡沒有選項可以挑——問句一出來，你得自己生出答案。' },
    { type:'boss',  sit:'se-presenter', topic:'etre-avoir', npcLine:'S_L1_5',
      text:'〔關主：第一次被問「你是誰」〕'
        +'這隻怪物只有一招，但它會一直問：你是誰、你從哪裡來、你在這裡做什麼。'
        +'答不出來它不會傷你——它只是站在門口不讓開。' },
  ],
  clear:{ type:'story',
    desc:'Camille 從「陌生」變成「認得你」——而且你要能在她開口之後兩秒內接話，不是查完筆記才回答。',
    check:{ npc:'se-presenter', rel:'認得你' } },
  unlock:{ needs:[] },
  reward:{ item:'門牌鑰匙（解鎖第 2 章的看房邀約）', rel:'Camille → 認得你',
           unlock:['logement'] },
  exam:'DELF/TEF 口說第一部分 entretien dirigé 幾乎必考——考官一開口就是這個' },

{ ch:2, id:'une-chambre',
  title:'一張睡得著的床', titleFr:'Se loger',
  logline:'他有四天的旅館錢，和一個聽不懂他要什麼的房東。',
  conflict:'M. Rivet 講話快、用 qui/que 把兩句黏成一句，而且他一天要見六個看房的人。'
    +'⚠️ 問題不是他不友善——是他**沒空重複第二次**。聽漏一個關係代名詞，'
    +'你就搞不清楚「含雜費」到底含的是哪些。',
  sit:'logement', npc:'logement',
  lessons:[11,23,24,25],
  topics:['vocab-logement','vocab-housing','vocab-annonces','vocab-meubles','vocab-quartier',
          'prepositions-lieu2','qui-que'],
  nodes:[
    { type:'talk',  sit:'logement', topic:'vocab-logement', npcLine:'S_L23_1',
      text:'第一間。M. Rivet 站在門口報房型，一句話裡塞了兩個子句。'
        +'他說完看著你——他在等你點頭還是搖頭，不是在等你消化。' },
    { type:'talk',  sit:'logement', npc:'se-presenter', topic:'vocab-quartier', npcLine:'S_L11_5',
      text:'Camille 陪你走了一趟街區。她講到自己有多喜歡這裡的時候整個人亮起來——'
        +'⭐ 你聽懂了她為什麼喜歡，不只是聽懂她喜歡。那是兩件事。' },
    { type:'trial', sit:'logement', topic:'vocab-annonces', npcLine:'S_L23_8',
      text:'廣告上那一行數字後面跟著一個詞，決定你這個月是不是還有飯錢。'
        +'⚠️ 猜錯不會有人罵你——只是月底錢會不見。' },
    { type:'boss',  sit:'logement', topic:'qui-que', npcLine:'S_L23_7',
      text:'〔關主：房東 M. Rivet〕'
        +'他要你用一句話講清楚你要的是什麼樣的房子。一句。'
        +'⭐ 這隻關主不打人——他只是看錶。' },
  ],
  clear:{ type:'story',
    desc:'M. Rivet 把鑰匙交給你。條件有兩個：他聽懂你要哪一種房子，而你聽懂他開的條件——'
      +'⛔ 不是 Camille 代你講完的。',
    check:{ npc:'logement', rel:'認得你', mustSelfAnswer:true } },
  unlock:{ needs:['atterrissage'] },
  reward:{ item:'一把自己的鑰匙（存檔點：從此地城從家裡出發）', rel:'M. Rivet → 認得你',
           unlock:['marche'] },
  exam:'DELF A2 閱讀最愛出租屋廣告；口說也常問你住哪、住什麼樣的地方' },

{ ch:3, id:'marche',
  title:'吃飯這件事', titleFr:'Faire les courses',
  logline:'冰箱是空的，而他連「一條」和「一些」都還會混。',
  conflict:'市場不等人。Sophie 一天講兩百次同樣的句子，語速是課本的一點五倍。'
    +'⚠️ 這一章的難點不在單字，在**冠詞**——du / de la / un / de 選錯，句子還是通，'
    +'但你會發現自己買回了一整塊乳酪而不是一片。',
  sit:'courses', npc:'courses',
  lessons:[4,5,6,7,8],
  topics:['vocab-shopping','vocab-clothing-size','articles','demonstrative-adj','intensite',
          'voici-voila','vocab-tech-objects'],
  nodes:[
    { type:'talk',  sit:'courses', topic:'vocab-shopping', npcLine:'S_L4_1',
      text:'Sophie 的攤位前排了五個人。輪到你的時候她已經把手伸出來了——'
        +'⭐ 這裡用 je veux 不會錯，但會讓她少看你一眼。禮貌用語本身就是給分點。' },
    { type:'trial', sit:'courses', topic:'articles', npcLine:'S_L5_2',
      text:'她問你要不要肉。你得用否定句回答——⚠️ 而否定句裡的冠詞會變形。'
        +'這一格是整章最容易掉下去的地方。' },
    { type:'talk',  sit:'restaurant', npc:'restaurant', topic:'vocab-alimentation', npcLine:'S_L5_4',
      text:'轉角的小餐館。Étienne 沒給你菜單，直接報今日主菜。'
        +'⛔ 你不能說「隨便」——法文裡那句話沒有你以為的那個意思。' },
    { type:'boss',  sit:'courses', topic:'vocab-shopping', npcLine:'S_L4_2',
      text:'〔關主：收銀台前的三秒〕'
        +'它的招式是報一串數字然後等。'
        +'⭐ 你不用聽懂全部，你只要抓住那個數字——這就是聽力題的解法本身。' },
  ],
  clear:{ type:'story',
    desc:'Sophie 在你開口之前就把東西拿出來了——她記得你買什麼。'
      +'（⚠️ 這代表你已經在同一個攤位用同一套句型買過好幾次，不是背過一次就算。）',
    check:{ npc:'courses', rel:'認得你' } },
  unlock:{ needs:['une-chambre'] },
  reward:{ item:'零錢包（商人節點打折）', rel:'Sophie → 認得你；Étienne → 陌生→認得你',
           unlock:['la-ville'] },
  exam:'⭐ DELF A2 口說第三部分 dialogue simulé 最常抽到的情境（附道具假鈔那個）' },

{ ch:4, id:'la-ville',
  title:'這座城市的路', titleFr:'Se déplacer',
  logline:'手機沒訊號，他得靠一個公車司機的四句命令式走回家。',
  conflict:'命令式是他在課本上最沒感覺的一課——因為課本裡沒有人真的在命令他。'
    +'⚠️ 但 Karim 開車的時候只會給你動詞開頭的短句，沒有主詞、沒有緩衝。'
    +'聽不懂就是坐過站。',
  sit:'se-deplacer', npc:'se-deplacer',
  lessons:[4,6,7,11],
  topics:['preposition-place-transport','vocab-places-city','imperative-mood'],
  nodes:[
    { type:'talk',  sit:'se-deplacer', topic:'imperative-mood', npcLine:'S_L6_2',
      text:'Karim 從駕駛座上頭也不回地給了你一個動詞。'
        +'⭐ 命令式沒有主詞——這不是他沒禮貌，這是這個語氣的樣子。' },
    { type:'trial', sit:'se-deplacer', topic:'imperative-mood', npcLine:'S_L6_4',
      text:'第二個指令裡藏著一個站名。⚠️ 你要同時處理動詞和地名——'
        +'工作記憶被塞滿的那一秒，就是你會坐過站的那一秒。' },
    { type:'talk',  sit:'se-deplacer', topic:'preposition-place-transport', npcLine:'S_L7_1',
      text:'紅燈。Karim 講起自己怎麼上班。'
        +'⭐ 交通工具前面的介系詞會變——這件事只有在真的有人講的時候才記得住。' },
    { type:'boss',  sit:'se-deplacer', topic:'vocab-places-city', npcLine:'S_L6_1',
      text:'〔關主：沒有地圖的十字路口〕'
        +'四個方向都有人給你不同的答案。'
        +'⭐ 破它的方法不是全部聽懂，是問一次「遠不遠」然後相信答案。' },
  ],
  clear:{ type:'story',
    desc:'你不看地圖走完 Karim 給的那一段路：四個指令全部落地，人真的回到家門口。'
      +'（⛔ 不是「答對四題」——是最後一個節點的終點要是你家。）',
    check:{ npc:'se-deplacer', route:'karim-route-1', noMap:true } },
  unlock:{ needs:['marche'] },
  reward:{ item:'月票（地城多一次移動）', rel:'Karim → 認得你',
           unlock:['la-pluie'] },
  exam:'聽力題常見（車站廣播、問路對話）；命令式在這裡最自然' },

/* ───────────────────────────── 第二幕：住下來 ───────────────────────────── */

{ ch:5, id:'la-pluie',
  title:'第一場雨', titleFr:'La pluie',
  logline:'暖氣壞了，而修暖氣需要的不是工具，是一通講得清楚的電話。',
  conflict:'⭐ 這一章的敵人是**閒聊**。Papy Jean 在公園坐了四十年，他不會考你文法，'
    +'他只是講天氣——而你如果只會回「是」和「不是」，這段關係就到此為止。'
    +'⚠️ 然後暖氣壞了，你才發現閒聊不是浪費時間：M. Rivet 願不願意今天就來，'
    +'取決於他覺不覺得你是個他認得的人。',
  sit:'meteo', npc:'meteo',
  lessons:[7,8,22,25],
  topics:['vocab-meteo','vocab-weather-season'],
  nodes:[
    { type:'talk',  sit:'meteo', topic:'vocab-meteo', npcLine:'S_L22_1',
      text:'公園長椅。Papy Jean 問了一句每個人都會問、但你從來沒認真答過的問題。' },
    { type:'talk',  sit:'meteo', npc:'courses', topic:'vocab-weather-season', npcLine:'S_L8_3',
      text:'Sophie 在收攤，雨開始下。她抬頭講了兩個字——'
        +'⭐ 兩個字的句子也是句子，而且法文的天氣句主詞永遠是那個空的 il。' },
    { type:'talk',  sit:'meteo', npc:'famille', topic:'vocab-meteo', npcLine:'S_L8_1',
      text:'樓下的 Mme Bonnet 站在門口。她講的是昨天的好天氣，不是今天的雨——'
        +'⚠️ 時間點錯了你就會答非所問。' },
    { type:'trial', sit:'meteo', topic:'vocab-meteo', npcLine:'S_L22_3',
      text:'氣象預報。⭐ 這一格是真的聽力題：一段話裡只有一個資訊你需要，其他都是雜訊。' },
    { type:'boss',  sit:'meteo', npc:'logement', topic:'vocab-meteo', npcLine:'S_L25_9',
      text:'〔關主：壞掉的暖氣〕'
        +'你得打給 M. Rivet，用「如果…就…」把狀況和需求綁成一句。'
        +'⚠️ 這隻關主看的不是文法——是他今天要不要為你跑一趟。' },
  ],
  clear:{ type:'story',
    desc:'暖氣修好，而且是**你**說服 M. Rivet 的——⛔ 不是 Camille 幫你打的電話。'
      +'附帶條件：Papy Jean 認得你（沒有那幾次閒聊，這通電話他不會接）。',
    check:{ npc:'logement', event:'chauffage-reparee', mustSelfAnswer:true,
            also:{ npc:'meteo', rel:'認得你' } } },
  unlock:{ needs:['la-ville'] },
  reward:{ item:'毛毯（地城開場多 1 HP）', rel:'Papy Jean → 認得你；M. Rivet → 熟了',
           unlock:['urgences'] },
  exam:'小型對話與聽力常見；il fait / il y a 兩套系統別混' },

{ ch:6, id:'urgences',
  title:'半夜的急診', titleFr:'Aux urgences',
  logline:'凌晨兩點，他必須用外語準確說出哪裡痛——這是全遊戲風險最高的一章。',
  conflict:'⚠️ 這一章沒有第二次機會。講錯部位、聽漏一個建議，'
    +'後果不是分數，是 Baptiste 開錯處方。'
    +'⭐ 而且醫生講話有兩層：一層是問診，一層是建議——建議句型（il est conseillé de / je vous recommande de）'
    +'是整個 B1 的分水嶺，他在這裡第一次被迫聽懂。',
  sit:'sante', npc:'sante',
  lessons:[12,13,31,32],
  topics:['body-health','ilfaut-devoir','giving-advice','interdiction-demande',
          'corps-sante-vocab','medecine-urgences-vocab'],
  nodes:[
    { type:'talk',  sit:'sante', topic:'body-health', npcLine:'S_L12_1',
      text:'候診室。Baptiste 是實習醫生，看起來比你還累。他問了一句話，然後掏出筆。' },
    { type:'talk',  sit:'sante', npc:'se-deplacer', topic:'medecine-urgences-vocab', npcLine:'S_L32_9',
      text:'Karim 也在。他是打電話叫救護車的那個人——'
        +'⭐ 他講的那組號碼你一年前根本不知道要撥哪一個。' },
    { type:'trial', sit:'sante', topic:'corps-sante-vocab', npcLine:'S_L12_3',
      text:'「哪裡痛？」⚠️ 身體部位前面的那個介系詞會跟冠詞縮合——'
        +'講錯不會怎樣，但 Baptiste 會多問一次，而他後面還有十一個人。' },
    { type:'trial', sit:'sante', topic:'giving-advice', npcLine:'S_L31_3',
      text:'他開始給建議。⭐ 這一格的目標不是「答對」，是**聽懂之後照做**——'
        +'建議句型的重點在後面那個原形動詞。' },
    { type:'boss',  sit:'sante', topic:'medecine-urgences-vocab', npcLine:'S_L32_7',
      text:'〔關主：三個緊急號碼〕'
        +'牆上貼著三組數字。它問的是：哪一個。'
        +'⛔ 這一題沒有「大概是」——選錯的後果落在打電話的那個角色身上，不在你身上。' },
  ],
  clear:{ type:'story',
    desc:'離開急診前，Baptiste 記住了你的名字（關係到「認得你」）。'
      +'達成條件是兩件事同時發生：你講得出哪裡痛，而且你聽懂了他給的建議並複述一次。',
    check:{ npc:'sante', rel:'認得你', event:'conseil-repete' } },
  unlock:{ needs:['la-pluie'] },
  reward:{ item:'處方箋（藥水上限 +1）', rel:'Baptiste → 認得你',
           unlock:['ca-te-dit','le-terrain'] },
  exam:'口說情境卡與聽力（藥局對話）；建議句型 il faut / devoir 的主場' },

/* ── 第三幕：有人在等你（⭐ 分支：兩條都會開，做完任一條就能進第 9 章） ── */

{ ch:7, id:'ca-te-dit',
  title:'有人約你', titleFr:'Ça te dit ?',
  logline:'他第一次收到邀約——也第一次必須拒絕一個他其實想見的人。',
  conflict:'⭐ 拒絕比答應難十倍。答應只要會說「好」，拒絕要同時做三件事：'
    +'說不、給理由、把門留著。⚠️ 而 Owen 的直覺是台灣式的迂迴，'
    +'法文的迂迴長得不一樣——太委婉 Léa 會以為你在敷衍。',
  sit:'rendez-vous', npc:'rendez-vous',
  lessons:[1,6,9,19],
  topics:['social-invitations','numbers-dates-heure','pouvoir-vouloir'],
  nodes:[
    { type:'talk',  sit:'rendez-vous', topic:'social-invitations', npcLine:'S_L19_1',
      text:'Léa 是你的語言交換夥伴。她傳了兩個短句過來，第二句在問今晚。' },
    { type:'trial', sit:'rendez-vous', topic:'numbers-dates-heure', npcLine:'S_L19_2',
      text:'地點和時間。⚠️ 時間講錯不會有人糾正你——你只會發現自己一個人站在那裡。' },
    { type:'talk',  sit:'restaurant', npc:'restaurant', topic:'vocab-alimentation', npcLine:'S_L13_7',
      text:'Étienne 認出你了，還記得你上次沒點什麼。'
        +'⭐ 他問你的口味——這是「他記得你」的證據，不是客套。' },
    { type:'boss',  sit:'rendez-vous', topic:'pouvoir-vouloir', npcLine:'S_L19_3',
      text:'〔關主：必須拒絕的那一次〕'
        +'你有事，真的有事。'
        +'⭐ 破關的不是拒絕本身，是拒絕之後她還會再約你第二次。' },
  ],
  clear:{ type:'story',
    desc:'你拒絕 Léa 一次，而關係沒有退——判準很具體：**她會再約你第二次**。'
      +'（⛔ 不是「答對三題」，是下一次邀約真的出現。）',
    check:{ npc:'rendez-vous', event:'refus-puis-2e-invitation' } },
  unlock:{ needs:['urgences'] },
  reward:{ item:'手機（每天一次重抽節點）', rel:'Léa → 熟了（她改口用 tu）',
           unlock:['le-passe'] },
  exam:'⭐ 口說協商情境＋寫作 tâche 1（回覆邀約的訊息）都考這個' },

{ ch:8, id:'le-terrain',
  title:'球場上的位置', titleFr:'Les loisirs',
  logline:'要被排進先發，他得先讓一群人知道他多常來、會什麼。',
  conflict:'⭐ 這一章練的是**頻率**：souvent / de temps en temps / tous les jours。'
    +'⚠️ 聽起來像小事，但這組詞決定別人怎麼看你——'
    +'說「我有時候來」和說「我每週三來」，Théo 會做出不同的決定。',
  sit:'loisirs', npc:'loisirs',
  lessons:[9,13,19],
  topics:['vocab-loisirs','vocab-sport-gym','vocab-sport-activities','likes-hobbies-sports',
          'frequency-adverbs','household-chores','daily-routine-vocab'],
  nodes:[
    { type:'talk',  sit:'loisirs', topic:'likes-hobbies-sports', npcLine:'S_L19_5',
      text:'Théo 在場邊問你看不看球。他不是在閒聊——他在算這週人夠不夠。' },
    { type:'trial', sit:'loisirs', topic:'vocab-sport-gym', npcLine:'S_L13_3',
      text:'更衣室的規則牌。⭐ 這是閱讀題的原型：公告文的句型只有三種，'
        +'il faut / il ne faut pas / 命令式。看懂三種就看懂全部。' },
    { type:'talk',  sit:'loisirs', npc:'rendez-vous', topic:'vocab-loisirs', npcLine:'S_L9_2',
      text:'Léa 也在。她提議賽後去看電影——'
        +'⭐ 你這次沒有愣住，因為第 7 章已經練過這個句型了。' },
    { type:'boss',  sit:'loisirs', topic:'likes-hobbies-sports', npcLine:'S_L19_8',
      text:'〔關主：先發名單〕'
        +'Théo 要你講一個理由：你為什麼想打。'
        +'⚠️ 「因為我喜歡」不夠——理由要有目的，pour + 原形動詞。' },
  ],
  clear:{ type:'story',
    desc:'Théo 把你排進先發。條件是他知道你多常來（頻率副詞講得出來）'
      +'而且你給得出一個理由句，不只是形容詞。',
    check:{ npc:'loisirs', event:'titulaire' } },
  unlock:{ needs:['urgences'] },
  reward:{ item:'球隊背心（連續出場的日子不中斷關係衰減）', rel:'Théo → 熟了',
           unlock:['le-passe'] },
  exam:'口說高頻話題；頻率副詞（souvent / de temps en temps）在這裡用得最多' },

/* ───────────────────────────── 第四幕：站穩 ───────────────────────────── */

{ ch:9, id:'le-passe',
  title:'想家的那個月', titleFr:'Raconter au passé',
  logline:'第一次有人請他講自己的過去——而他發現自己講到一半就掉回現在式。',
  conflict:'⭐ 這是全劇的技術核心：**passé composé 與 imparfait 的分工**。'
    +'⚠️ 不是「哪個對」，是「你要講的是一個事件還是一段背景」。'
    +'Mamie Odette 不會糾正你，她只會在你時態掉下去的時候聽不懂，然後問「所以後來呢」。',
  sit:'passe', npc:'passe',
  lessons:[3,11,14,15,17,20,21],
  topics:['passe-compose','imparfait','vocab-souvenirs','passe-recent','duree'],
  nodes:[
    { type:'talk',  sit:'passe', topic:'vocab-souvenirs', npcLine:'S_L20_1',
      text:'Mamie Odette 講起她奶奶做的果醬。'
        +'⭐ 注意那個子句的時態——她在描述一個**習慣**，不是一次事件。' },
    { type:'talk',  sit:'famille', npc:'famille', topic:'family-possessives', npcLine:'S_L3_3',
      text:'Mme Bonnet 問你家裡有誰。'
        +'⚠️ 這是他一年來第一次用法文講自己的家人——所有格在這裡會全部翻出來檢查。' },
    { type:'talk',  sit:'vacances', npc:'vacances', topic:'reservation-hotel', npcLine:'S_L14_4',
      text:'旅行社櫃台。Chloé 在幫你查回台灣的日期。'
        +'⛔ 這一格不考文法——它只是讓你聽見自己說出那兩個日期時的聲音。' },
    { type:'trial', sit:'passe', topic:'imparfait', npcLine:'S_L20_2',
      text:'「你小時候都做什麼？」⭐ 關鍵字是「都」——那是 imparfait 的領地。' },
    { type:'boss',  sit:'passe', topic:'passe-compose', npcLine:'S_L21_9',
      text:'〔關主：一段講得完的故事〕'
        +'它不問單句，它要一整段。'
        +'⚠️ 掉回現在式不會扣血——它只會歪頭問「所以後來呢」，然後你得重講。' },
  ],
  clear:{ type:'story',
    desc:'你講完一段自己的過去，Mamie Odette 沒有打斷你——'
      +'判準是整段講完時態沒有掉回現在式，⛔ 不是單題正確率。',
    check:{ npc:'passe', event:'recit-complet-sans-interruption' } },
  unlock:{ anyOf:['ca-te-dit','le-terrain'] },
  reward:{ item:'相簿（解鎖「回憶」節點：可重播任一章的關鍵句）',
           rel:'Mamie Odette → 朋友；Mme Bonnet → 熟了',
           unlock:['entretien'] },
  exam:'⭐ 四場考試都要——口說講經驗、寫作講事件、閱讀聽力都在講過去' },

{ ch:10, id:'entretien',
  title:'履歷與面試', titleFr:"L'entretien",
  logline:'他要在三十分鐘裡，用第二語言講清楚十年的第一語言人生。',
  conflict:'⭐ 面試問的不是「你會什麼」，是「為什麼是你」。'
    +'⚠️ 這需要兩樣他還沒自動化的東西：**時間長度**（depuis / pendant 的分工）'
    +'與**因果連接詞**（parce que / pour）。前者講錯，你的年資就變成別人的；'
    +'後者缺席，你的回答就只剩下名詞。',
  sit:'travail', npc:'travail',
  lessons:[15,16,17,18,26],
  topics:['metier-travail-vocab','vocab-parcours-vie','duree','qui-que','connectors-pour-parceque'],
  nodes:[
    { type:'talk',  sit:'etudes', npc:'etudes', topic:'universite-vocab', npcLine:'S_L15_9',
      text:'Hugo 在語言學校認識的。他講自己在讀什麼——'
        +'⭐ 順手把你的學歷該怎麼翻成法文問了一遍。' },
    { type:'talk',  sit:'travail', topic:'metier-travail-vocab', npcLine:'S_L16_3',
      text:'Mme Fabre 自我介紹的方式就是一句年資。'
        +'⚠️ 她用的那個介系詞，代表「到現在還在做」。' },
    { type:'trial', sit:'travail', topic:'duree', npcLine:'S_L17_8',
      text:'「你在台灣待了多久？」⭐ depuis 還是 pendant——'
        +'差別不在長短，在**那件事結束了沒有**。' },
    { type:'trial', sit:'decrire-qqn', npc:'decrire-qqn', topic:'character-adjectives', npcLine:'S_L26_10',
      text:'Lucas 幫你練了一輪「形容自己」。'
        +'⛔ 別背形容詞表——挑三個，然後各給一個例子。' },
    { type:'boss',  sit:'travail', topic:'connectors-pour-parceque', npcLine:'S_L16_8',
      text:'〔關主：為什麼是你〕'
        +'它只問一次，然後安靜地等。'
        +'⭐ 破它的不是詞彙量，是一個撐得住整句的理由。' },
  ],
  clear:{ type:'story',
    desc:'Mme Fabre 問「為什麼是這份工作」，而你答的是**理由**不是名詞——'
      +'一個完整的 parce que / pour 子句撐完整句，中途沒有換成中文語序。',
    check:{ npc:'travail', event:'raison-complete' } },
  unlock:{ needs:['le-passe'] },
  reward:{ item:'工作證（金幣每日收入 +1）', rel:'Mme Fabre → 認得你；Hugo → 熟了',
           unlock:['la-dispute'] },
  exam:'口說高頻話題；TEF 議論題常出「遠端工作贊不贊成」這類' },

{ ch:11, id:'la-dispute',
  title:'吵一架', titleFr:'Donner son avis',
  logline:'他第一次在法文裡有立場——也第一次發現有立場而不失禮是一門技術。',
  conflict:'⚠️ Julien 嘴很利，而且他不是壞人——他只是把「反對你」當成正常社交。'
    +'⭐ 這一章要練的是**降級**：同一個意見，用 c\'est 開頭是評論，'
    +'用 il est 開頭是判斷，用「只能說它的好話」這種說法是反話。語域選錯，'
    +'掉的不是分數，是 Julien 明天還坐不坐你這桌。',
  sit:'opinion', npc:'opinion',
  lessons:[22,25,26,30],
  topics:['connectors-pour-parceque','cest-il-est','condition-si','tout-chaque'],
  nodes:[
    { type:'talk',  sit:'opinion', topic:'cest-il-est', npcLine:'S_L30_7',
      text:'Julien 在批評一家餐廳，用的是反話。'
        +'⚠️ 你如果照字面理解，就會以為他在稱讚。' },
    { type:'trial', sit:'opinion', topic:'condition-si', npcLine:'S_L25_7',
      text:'他丟給你一個假設題。⭐ si 後面不能用未來式——這條規則你講得出來，'
        +'但產出時還是會滑，所以這一格是壓縮練習不是講解。' },
    { type:'talk',  sit:'meteo', npc:'meteo', topic:'vocab-meteo', npcLine:'S_L22_4',
      text:'公園。Papy Jean 聽你抱怨完，說了一句慣用語——'
        +'⭐ 那句話的字面是天氣，意思是「我們剛剛只是在閒聊而已」。'
        +'他在教你一件比文法重要的事：不是每一場對話都要贏。' },
    { type:'talk',  sit:'opinion', npc:'passe', topic:'tout-chaque', npcLine:'S_L26_6',
      text:'Mamie Odette 的版本更狠一點。她講的是人，不是餐廳。' },
    { type:'boss',  sit:'opinion', topic:'cest-il-est', npcLine:'S_L30_8',
      text:'〔關主：一個你必須守住的立場〕'
        +'它會一直推你。'
        +'⭐ 破關的不是把它駁倒——是你講完之後，你們還在同一張桌子上。' },
  ],
  clear:{ type:'story',
    desc:'跟 Julien 吵完，兩個人還坐在同一張桌子上：你有明確立場（不是「我無所謂」），'
      +'而且全程語域沒有掉到失禮。⛔ 不是「說服他」——說服不是破關條件。',
    check:{ npc:'opinion', event:'desaccord-sans-rupture' } },
  unlock:{ needs:['entretien'] },
  reward:{ item:'一張固定的座位（關係不再因為久沒見而退）',
           rel:'Julien → 熟了；Papy Jean → 朋友',
           unlock:['examen'] },
  exam:'⭐ TEF/DELF 口說第二部分與寫作 tâche 2 的核心；沒有這個過不了 B2' },

/* ───────────────────────────── 終章 ───────────────────────────── */

{ ch:12, id:'examen',
  title:'為什麼是加拿大', titleFr:"Le jour de l'examen",
  logline:'一年前他誰都不認識。今天他走進考場，而考官問的就是這一年。',
  conflict:'⚠️ 最後一關的敵人不是題目，是**倒帶**：'
    +'考官問的每一題，都是前面十一章某個 NPC 已經問過他的。'
    +'⭐ 如果那些對話真的發生過，這一章就只是複述；如果沒有，這一章就是硬背。'
    +'這就是為什麼前面十一章不能跳著做——但⭐ **任何一章都可以跳過，'
    +'跳過的章不擋路，只是終章的回憶會少幾格**。',
  sit:'canada', npc:'canada',
  lessons:[1,2,16,18,24,31],
  topics:['vocab-parcours-vie'],
  nodes:[
    { type:'talk',  sit:'canada', topic:'vocab-parcours-vie', npcLine:'S_L18_9',
      text:'Marie-Ève 又出現了，這次是在考場外。'
        +'⭐ 她說的那句話，是你一年前的狀態——現在它已經不是真的了。' },
    { type:'talk',  sit:'se-presenter', npc:'se-presenter', topic:'etre-avoir', npcLine:'S_L2_7',
      text:'Camille 在門口等你。她用的是第 2 課那個自我介紹模板——'
        +'⭐ 一年前你要想三秒，現在它是一整塊。' },
    { type:'talk',  sit:'sante', npc:'sante', topic:'giving-advice', npcLine:'S_L31_2',
      text:'考前一晚，Baptiste 傳來一句建議。'
        +'⛔ 他沒有問你準備好了沒——他只是叫你睡覺。' },
    { type:'trial', topic:'strategie-lecture', npcLine:'S_L24_8',
      text:'考場。⭐ 這一句是老師課堂上講的應試原則，也是這整套系統的鐵律：'
        +'**可以先跳過，等一下再回來**。'
        +'⚠️ 這個節點沒有對應的生活情境（17 個情境裡沒有「考場」）——所以它只掛 topic。' },
    { type:'boss',  sit:'canada', topic:'greetings-politeness', npcLine:'S_L1_3',
      text:'〔關主：考官〕'
        +'你聽漏了一句。'
        +'⭐ 破關的招式是第 1 課就學過、但你一年來從來不敢用的那一句：請他再說一次。'
        +'會問「可以再說一次嗎」，比假裝聽懂高一個等級。' },
  ],
  clear:{ type:'story',
    desc:'你走進考場，而且十七位街坊裡至少有八位已經到「認得你」以上——'
      +'⭐ 破關條件是**這一年真的發生過**，不是分數。'
      +'（⛔ 沒到八位也不擋你進考場：終章永遠可進，只是回憶格會是空的。）',
    check:{ relCount:{ atLeast:8, level:'認得你' }, blocking:false } },
  unlock:{ needs:['entretien','la-dispute'], anyOf:['ca-te-dit','le-terrain'] },
  reward:{ item:'考場門票（主線完成；解鎖「第二年」空章）',
           rel:'全體街坊 → 記得你',
           unlock:[] },
  exam:'⭐⭐ 這是你考試的理由，考官一定會問「為什麼是加拿大」——沒有任何觀光課會教這題' },

];
if (typeof module !== 'undefined') module.exports = { STORY };
