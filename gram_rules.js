/* ============================================================
   gram_rules.js — 文法學習框架的單一真相來源
   ------------------------------------------------------------
   GRAM_POINTS：每個文法點的定義（涵蓋哪些 quiz topics、規則卡內容）。
   map.html 文法大局觀、gram_trainer.html、quiz.html 選課器標記、
   dashboard.html 步驟②推薦，全部讀這份。
   階段狀態存 localStorage `clb7_gram_stage`（見 PRD.md）：
   0=未開課 1=📖理解 2=🪜半開卷 3=🎯遮規則 4=🧪考題 5=⚡反射
   現役點沒有記錄時預設 stage=2（2026-07-11 Owen 決定全部重走）。
   ⚠️ 課程教到新文法時：unlocked 改 true＋補 lessons/rule（含 why），
   這是「六項連動」之外的第七項（見 HANDOFF.md 卡片庫維護）。
   ------------------------------------------------------------
   rule.why（07-11 加入）＝「為什麼長這樣」由上而下大局觀，呼應
   Owen 的學習哲學：例外要被解釋成歷史的自然結果，不是要背的規定。
   顯示順序刻意是 title → why → points → examples（先大局再細節）。
   語氣紅線：講到「足以解釋規則為什麼長這樣」就停，不說故事。
   ============================================================ */

const GRAM_CATS = {
  'verbe-present': { label: '動詞・現在式', icon: '🔤' },
  'verbe-temps':   { label: '動詞・時態',   icon: '⏱️' },
  'verbe-mode':    { label: '動詞・語氣/建議/被動', icon: '🎭' },
  'pronoms':       { label: '代名詞',       icon: '👤' },
  'base':          { label: '冠詞・疑問・否定・介係詞', icon: '🧱' },
  'adjectifs':     { label: '形容詞・比較', icon: '🎨' },
  'discours':      { label: '連接詞・論述', icon: '🧵' },
};

const GRAM_POINTS = [

  // ═══ A1 ═══════════════════════════════════════════════════
  { id:'etre-avoir', name:'Être & Avoir', icon:'⚡', zone:'A1', cat:'verbe-present',
    lessons:[1,4], topics:['etre-avoir','cest-il-est'], unlocked:true,
    rule:{
      title:'être（是）/ avoir（有）— 法文兩大骨架動詞',
      why:'全語言通則：越常用的字被唸得越多、磨損得越兇，所以最不規則——être/avoir 是法文使用頻率最高的兩個動詞，變位是千年口語磨出來的形狀，本來就不該套公式。而「我25歲」說 J\'ai 25 ans，是因為法文把年齡、餓、冷、熱當成「身上帶著的東西」（承襲拉丁文的講法）——你「擁有」25年的歲數，不是你「是」25歲。',
      points:[
        'être：je suis / tu es / il est / nous sommes / vous êtes / ils sont',
        'avoir：j\'ai / tu as / il a / nous avons / vous avez / ils ont',
        '年齡、感受（冷熱餓）用 avoir 不用 être：J\'ai 25 ans、Il a chaud',
        'c\'est + 冠詞 + 名詞（C\'est une ville）；il est + 形容詞/職業無冠詞（Il est grenoblois）',
      ],
      examples:[
        { fr:"Je suis taïwanais.", zh:'我是台灣人。' },
        { fr:"J'ai 25 ans.", zh:'我25歲。（年齡用 avoir）' },
        { fr:"Rouen ? C'est une ville française.", zh:'盧昂？那是一座法國城市。' },
      ]}},

  { id:'er-verbs', name:'Verbes en -ER', icon:'📝', zone:'A1', cat:'verbe-present',
    lessons:[2], topics:['er-verbs'], unlocked:true,
    rule:{
      title:'-ER 規則動詞 — 90% 的法文動詞都長這樣',
      why:'口語法文早就把拉丁文的字尾唸掉了——parle/parles/parlent 同音不是巧合，是同一個口語形狀配三種拼法；那張六格變位表其實是「拼字表」不是「發音表」，真正用耳朵要記的只有 nous -ons 和 vous -ez 兩格。也因為這組最簡單，所有新動詞一律加入這組（googler、liker），所以它才佔 90%。',
      points:[
        '去掉 -er，加字尾：je -e / tu -es / il -e / nous -ons / vous -ez / ils -ent',
        '口語同音：parle / parles / parlent 唸起來一模一樣，-ent 完全不發音',
        '拼寫小變化：nous mangeons（-geons 保留 g 的軟音）、j\'achète（è 開音節）',
        '母音開頭動詞 je → j\'：j\'aime、j\'habite',
      ],
      examples:[
        { fr:'Je parle chinois et anglais.', zh:'我說中文和英文。' },
        { fr:'Nous mangeons au restaurant.', zh:'我們在餐廳吃飯。（-geons！）' },
        { fr:"J'habite à Taipei.", zh:'我住在台北。（j\' 母音縮寫）' },
      ]}},

  { id:'articles', name:'Articles', icon:'📚', zone:'A1', cat:'base',
    lessons:[2,3,5], topics:['articles'], unlocked:true,
    rule:{
      title:'冠詞 — 每個名詞前面都要有一頂帽子',
      why:'拉丁文根本沒有冠詞——法文的 le/la 是從「那個」（指示詞 ille）磨出來的，un/une 是從「一個」磨出來的，講久了變成每個名詞的義務配件。部分冠詞 du/de la 字面就是「de＋冠詞」＝「那東西的一部分」——吃「一些」魚而不是整條魚。du/au 這些縮合是快速口語把 de+le、à+le 黏成一個音，不是新規則。',
      points:[
        '定冠詞（特定/都知道的）：le / la / l\' / les',
        '不定冠詞（第一次提到）：un / une / des',
        '部分冠詞（不定量，吃喝常用）：du / de la / de l\' / des',
        '縮合：de+le=du、à+le=au、de+les=des、à+les=aux',
        '量詞與否定後全部變 de：beaucoup de pâtes、pas de viande',
      ],
      examples:[
        { fr:"J'aime la musique.", zh:'我喜歡音樂。（泛指用定冠詞）' },
        { fr:'Je mange du poisson.', zh:'我吃魚。（不定量陽性 du）' },
        { fr:'Je ne mange pas de viande.', zh:'我不吃肉。（否定後變 de）' },
      ]}},

  { id:'determinants', name:'Possessifs & Démonstratifs', icon:'🏷️', zone:'A1', cat:'base',
    lessons:[2,3,7,8], topics:['possessives','family-possessives','demonstrative-adj'], unlocked:true,
    rule:{
      title:'所有格與指示詞 — 跟著「後面的名詞」變，不跟著人變',
      why:'文法上這些字是「形容詞」，而法文形容詞永遠跟自己修飾的名詞配合——所以 sa femme 的 sa 看的是 femme 是陰性，不管主人是他還是她（英文 his/her 看主人，法文相反，這是中文使用者最大的坑）。mon amie、cet hôtel 這些母音前變形只有一個理由：法文極度討厭兩個母音相撞（ma amie 唸起來卡），寧可借陽性形來墊。',
      points:[
        '所有格：mon/ma/mes、ton/ta/tes、son/sa/ses、notre/nos、votre/vos、leur/leurs',
        '⚠️ sa femme = 他的太太也可以是她的太太——看名詞性別不看主人性別',
        '陰性名詞遇母音開頭改用陽性形：mon amie（不說 ma amie）',
        '指示詞：ce（陽）/ cet（陽+母音：cet hôtel）/ cette（陰）/ ces（複數）',
      ],
      examples:[
        { fr:'Sa femme est fleuriste.', zh:'他的太太是花店老闆。（femme陰性→sa）' },
        { fr:"C'est mon amie Sophia.", zh:'這是我朋友蘇菲亞。（amie母音開頭→mon）' },
        { fr:'Cet ordinateur est cher.', zh:'這台電腦很貴。（母音前 ce→cet）' },
      ]}},

  { id:'pronouns', name:'Pronoms (toniques · COD · y)', icon:'👤', zone:'A1', cat:'pronoms',
    lessons:[9,11,12,15], topics:['pronoms-toniques','cod-pronouns','on-vs-nous','pronom-y'], unlocked:true,
    rule:{
      title:'代名詞三家族 — 重讀、直接受詞、地點',
      why:'法文的 je/tu/il 被磨到只剩輕輕一個音，虛弱到不能單獨站著、不能被強調（不能只回答 "je"）——所以保留了一套有重音的「加強版」moi/toi/lui/eux 專門扛這些場合。受詞代名詞放動詞前面也是同一件事：它們是黏在動詞上的輕音節，像磁鐵吸在動詞前。on 原本是「人」這個名詞（拉丁 homo），「人們都這樣」講久了就變成口語的「我們」，所以動詞跟 il 同形。',
      points:[
        '重讀代名詞（強調/介詞後）：moi, toi, lui, elle, nous, vous, eux, elles — chez lui、et toi ?',
        'COD 直接受詞（放動詞前）：me/te/le/la/nous/vous/les — Je le connais',
        'COD 母音前縮寫：me→m\'、te→t\'、le/la→l\' — Le droit m\'intéresse',
        'on = 口語的 nous，動詞跟 il/elle 同形：On habite à Lyon',
        'y 代替地點：J\'y vais（我去那裡）',
      ],
      examples:[
        { fr:'Chez eux, on mange bien.', zh:'在他們家吃得很好。（ils→eux）' },
        { fr:'Je ne la connais pas.', zh:'我不認識她。（COD放動詞前）' },
        { fr:"Tu m'aides ?", zh:'你幫我嗎？（me→m\'）' },
      ]}},

  { id:'questions', name:'Questions simples', icon:'❓', zone:'A1', cat:'base',
    lessons:[1,2], topics:['question-words'], unlocked:true,
    rule:{
      title:'問句三招＋疑問詞 quel 要配合',
      why:'三種問法其實是三個歷史地層：倒裝（Viens-tu ?）最老、最書面；est-ce que 字面是「是不是說…」，是後來發明的萬用問句支架——插上去之後後面維持正常語序，什麼都不用動；語調上揚是日常口語。考試寫作用倒裝加分，口說用 est-ce que 和語調就夠。quel 是形容詞，所以照形容詞的天性跟名詞配合。',
      points:[
        '三種問法：①語調上揚 Tu viens ? ②Est-ce que tu viens ? ③倒裝 Viens-tu ?',
        '疑問詞：qui（誰）que/quoi（什麼）où（哪裡）quand（何時）comment（如何）combien（多少）pourquoi（為何）',
        'quel 像形容詞要配合：quel âge（陽單）/ quelle ville（陰單）/ quels artistes（陽複）/ quelles langues（陰複）',
      ],
      examples:[
        { fr:'Tu habites dans quelle ville ?', zh:'你住在哪個城市？（ville陰性→quelle）' },
        { fr:'Quelles langues tu parles ?', zh:'你說哪些語言？（複數陰性）' },
      ]}},

  { id:'prepositions', name:'Prépositions (lieu · pays · transport)', icon:'📍', zone:'A1', cat:'base',
    lessons:[2,4,6,11], topics:['preposition-country','preposition-place-transport','prepositions-lieu2'], unlocked:true,
    rule:{
      title:'介係詞 — 國家看性別、地點看縮合、人用 chez',
      why:'國家介係詞的分裂其實只有一條歷史線：本來都是「à＋冠詞」，陰性的 en la France 講快了冠詞被吃掉剩 en France；陽性的 à le Canada 黏成 au Canada——所以「en＝陰性、au＝陽性」不是兩條規則，是同一次縮合的兩種下場。城市沒有冠詞所以維持乾淨的 à。chez 來自拉丁文 casa（家）——「在某人家/某人的店」，所以只能接人不能接地方。交通工具 en/à 的分界是「進得去的用 en（在裡面），跨上去的用 à」。',
      points:[
        '國家：en + 陰性國（en France）、au + 陽性國（au Canada）、aux + 複數（aux États-Unis）、à + 城市/島（à Taipei, à Taiwan）',
        '⚠️ 字尾 -e 大多陰性，但 le Mexique 例外 → au Mexique',
        '去店家：à la boucherie / au marché / aux caisses；去「某人那裡」用 chez：chez le poissonnier、chez moi',
        '交通：en + 有廂體（en bus, en voiture）、à + 騎跨/步行（à pied, à vélo）',
        '方位：à droite de / à gauche de / en face du / entre A et B',
      ],
      examples:[
        { fr:'Je vais en France.', zh:'我去法國。（la France 陰性→en）' },
        { fr:'Pour le poisson, je vais chez le poissonnier.', zh:'買魚我去魚販那裡。（人→chez）' },
        { fr:"Je vais à l'école en bus.", zh:'我搭公車上學。' },
      ]}},

  // ═══ A2 ═══════════════════════════════════════════════════
  { id:'reflechis', name:'Verbes pronominaux', icon:'🔁', zone:'A2', cat:'verbe-present',
    lessons:[1,8,9], topics:['reflexive-verbs'], unlocked:true,
    rule:{
      title:'反身動詞 — 動作回到自己身上，代詞跟人稱走',
      why:'法文的邏輯很直白：laver 是「洗（某個東西）」，你洗自己就得說出來——se laver＝「洗自己」。英文把這個標記丟了（wash 自帶洗自己的意思），法文保留了拉丁文的 se，所以中文使用者會覺得「多了一個字」，其實是法文比較誠實：動作有沒有射出去、射到誰，句子裡都看得到。代詞跟人稱走（me/te/se…）是因為「自己」當然是誰做就是誰。',
      points:[
        '反身代詞：je me / tu te / il se / nous nous / vous vous / ils se',
        '母音前縮寫：je m\'appelle、tu t\'habilles、il s\'appelle',
        '否定包法：ne + 反身代詞 + 動詞 + pas → Je ne me réveille pas à 7h',
        '常用：se lever（起床）se doucher（洗澡）s\'habiller（穿衣）se coucher（睡覺）',
      ],
      examples:[
        { fr:"Je m'appelle Owen.", zh:'我叫 Owen。' },
        { fr:'Nous nous habillons.', zh:'我們穿衣服。（nous 不縮寫）' },
        { fr:'Je ne me réveille pas à 7h.', zh:'我沒有在7點醒來。（ne放反身代詞前）' },
      ]}},

  { id:'ir-re', name:'Verbes -IR / -RE / modaux', icon:'🔧', zone:'A2', cat:'verbe-present',
    lessons:[4,5,7,9], topics:['ir-re-verbs','irregular-verbs-3rd-group','pouvoir-vouloir'], unlocked:true,
    rule:{
      title:'第二、三組動詞 — 套模式不硬背',
      why:'這些是拉丁文其他變位家族的倖存者：-IR 組的 -iss-（finissons）是拉丁文「逐漸變成」的詞綴化石，-RE 組是另一支。第三組的「不規則」動詞（faire/prendre/venir…）全是超高頻字——跟 être/avoir 同一個道理，用得越兇磨得越怪，但也因為天天聽得到，靠輸入量自然會熟，不值得拿表格硬背。pouvoir/vouloir 是「情態動詞」：自己變位、後面的動詞永遠原形，跟英文 can/want to 同一個架構。',
      points:[
        '-IR 規則（finir/choisir）：je -is / tu -is / il -it / nous -issons / vous -issez / ils -issent',
        '-RE 規則（vendre/répondre）：je -s / tu -s / il -（無字尾）/ nous -ons / vous -ez / ils -ent',
        'mettre 雙t只在複數：je mets / nous mettons；prendre 複數丟d：nous prenons / ils prennent',
        'faire 特殊：vous faites（不是 faisez！）/ ils font；aller + 原形 = 即將要做',
        'pouvoir（能）/ vouloir（想要）：je peux / veux、il peut / veut、ils peuvent / veulent＋原形動詞',
      ],
      examples:[
        { fr:'Nous choisissons le menu.', zh:'我們選套餐。（-issons）' },
        { fr:'Vous faites la cuisine ce soir ?', zh:'你們今晚煮飯嗎？（faites！）' },
        { fr:'Elle veut partir.', zh:'她想離開。（elle veut 不是 veux）' },
      ]}},

  { id:'imperatif', name:"L'impératif", icon:'📣', zone:'A2', cat:'verbe-mode',
    lessons:[6], topics:['imperative-mood'], unlocked:true,
    rule:{
      title:'命令式 — 去掉主詞直接說',
      why:'命令的對象就站在你面前，主詞是廢話——所以全世界的命令式都砍主詞，法文也一樣。-ER 動詞 tu 形要去掉 s（Mange !）看起來像例外，其實是命令式保留了更古老的形狀：拉丁文命令式本來就沒有 s，是後來直述句的 tu manges 自己長出 s，命令式沒跟上而已——老的才是本尊。',
      points:[
        '只有三個人稱：tu / nous / vous，把主詞拿掉：Montez dans le bus !',
        '-ER 動詞 tu 形去掉 s：Tu manges → Mange !（其他組保留 s：Finis !）',
        '否定命令：N\'achetez pas de tickets !（ne...pas 照包）',
        '常見招牌/廣播用語：Venez nombreux !（歡迎大家來）',
      ],
      examples:[
        { fr:'Montez dans le bus !', zh:'上公車！（vous形去主詞）' },
        { fr:"N'achetez pas de tickets !", zh:'不要買票！（否定命令）' },
      ]}},

  { id:'futur-proche', name:'Futur proche', icon:'🔮', zone:'A2', cat:'verbe-temps',
    lessons:[8], topics:['futur-proche'], unlocked:false,  // 07-16：Owen反映還沒學到，暫鎖（原本標lesson8教過，跟實際進度對不上）
    rule:{
      title:'近未來 — aller 變位 + 原形動詞',
      why:'跟英文 "I\'m going to..." 一模一樣的演化：「走去做某事」的移動動詞，講久了移動的意思淡掉、只剩「即將」。口語法文偏愛它勝過未來式，理由很實際：只要會 aller 的六格，任何動詞的未來都能講——不用學新字尾。這是口語永遠的方向：用「幫手字＋原形」取代「背新變位」。',
      points:[
        '公式：aller（現在式變位）+ 動詞原形 = 即將/打算做',
        'aller：je vais / tu vas / il va / nous allons / vous allez / ils vont',
        '⚠️ 只有 aller 變位，後面動詞永遠原形：je vais finir（不是 je vais finis）',
        '否定包 aller：Je ne vais pas partir.',
      ],
      examples:[
        { fr:'Demain soir, je vais finir la robe.', zh:'明晚我要把洋裝做完。' },
        { fr:'Mes filles vont être contentes.', zh:'我女兒們會很開心。（ils/elles vont）' },
      ]}},

  { id:'passe', name:'Passé composé & passé récent', icon:'⏮️', zone:'A2', cat:'verbe-temps',
    lessons:[10,11,14,17], topics:['passe-compose','passe-recent'], unlocked:true,
    rule:{
      title:'複合過去式 — 助動詞（avoir/être）+ 過去分詞',
      why:'J\'ai mangé 字面是「我擁有 被吃完的東西」——用「有＋完成品」表達過去，這樣就不用為過去式背一整套新變位（又是口語的偷懶智慧，英文 have eaten 同款）。être 家族的動詞（去/來/出生/死…）不是「做了什麼」而是「主詞自己變成了什麼狀態、移到了哪裡」——所以分詞像形容詞一樣描述主詞，也因此要跟主詞配合（elle est sortie 加 e，跟 elle est grande 同一個道理）。venir de + 原形是 aller + 原形的鏡像：「從做完某事走過來」＝剛剛做完。',
      points:[
        '大多數動詞用 avoir：J\'ai mangé、Ils ont acheté、Vous avez trouvé',
        '17個移動/狀態動詞用 être（A2課本清單：aller, venir, revenir, arriver, partir, rentrer, retourner, monter, descendre, entrer, sortir, tomber, naître, mourir, devenir, rester, passer）＋全部反身動詞：Je suis allé(e)',
        '⚠️ 用 être 時過去分詞要配合主詞：Elle est sortie（+e）、Ils sont partis（+s）',
        '過去分詞：-er→é（mangé）、-ir→i（fini）、-re→u（vendu）',
        '否定包助動詞：On n\'a pas trouvé de lit',
        '剛剛做完 = venir de + 原形：Je viens de finir（我剛結束）',
      ],
      examples:[
        { fr:'Vous avez trouvé des meubles ?', zh:'你們找到家具了嗎？' },
        { fr:'Elle est sortie.', zh:'她出去了。（être＋陰性配合+e）' },
        { fr:'Je viens de finir.', zh:'我剛剛結束。（passé récent）' },
      ]}},

  { id:'imparfait', name:"L'imparfait (impersonnel)", icon:'🌊', zone:'A2', cat:'verbe-temps',
    lessons:[15], topics:['imparfait'], unlocked:true,
    rule:{
      title:'未完成過去式 — 描述過去的狀態（目前只學無人稱三兄弟）',
      why:'法文的兩個過去式不是「兩套要背的規則」，是攝影機的兩顆鏡頭：imparfait 是廣角鏡拍背景（當時天氣如何、場景長怎樣——名字本身就是拉丁文「未完成」，事情攤在那裡沒有起訖），passé composé 是特寫鏡頭拍事件（然後發生了什麼）。問自己「這句是佈景還是劇情」，鏡頭就選對了。',
      points:[
        '本課只考三個無人稱：il fait → il faisait、il y a → il y avait、c\'est → c\'était',
        '用途分工：描述背景/狀態用 imparfait，講「發生了什麼動作」用 passé composé',
        '完整人稱變化（je mangeais…）B1 才教，現在不用背',
      ],
      examples:[
        { fr:"Hier, il faisait mauvais.", zh:'昨天天氣不好。（描述→imparfait）' },
        { fr:"C'était super !", zh:'（那時）超棒的！' },
      ]}},

  { id:'negation', name:'Négation & quantités', icon:'🚫', zone:'A2', cat:'base',
    lessons:[1,6,16,18], topics:['negation','frequency-adverbs','intensite'], unlocked:true,
    rule:{
      title:'否定家族＋頻率＋強度 — ne...X 換尾巴',
      why:'原本真正的否定詞只有 ne，後面那些字全是加強語氣的名詞：pas＝一步（「連一步都不走」）、personne＝一個人、rien＝一件東西（拉丁 rem）、jamais＝永遠。講了幾百年，加強的字反而搶走了否定的意義——這就是為什麼今天「換尾巴」就換否定意思，也是為什麼口語常把 ne 丟掉（je sais pas）：真正扛意義的是尾巴。否定後冠詞變 de 跟 beaucoup de 同邏輯——數量歸零也是一種數量。',
      points:[
        'ne...pas（不）ne...jamais（從不）ne...plus（不再）ne...rien（什麼都不）ne...personne（誰都不）',
        '否定後 un/une/du/des → de：pas de pain、plus de sport',
        '頻率光譜：toujours（總是）> souvent > parfois > rarement > jamais',
        '強度光譜：un peu < assez < très/beaucoup < trop（過頭，帶負面）',
        'très + 形容詞（très grand）；beaucoup + 動詞後（je mange beaucoup）',
        'passé composé 裡 pas/plus/rien/jamais 夾在助動詞和分詞中間（il n\'a rien mangé）；personne是例外，放分詞後面（il n\'a vu personne）',
        'personne 當主詞放動詞/助動詞前（Personne n\'est venu）；當受詞（COD）放動詞/分詞後（Je n\'ai vu personne）——跟一般主詞位置規則一致，不是特例',
      ],
      examples:[
        { fr:'On ne va jamais au musée le mardi.', zh:'我們星期二從不去博物館。' },
        { fr:'Je ne connais personne à Paris.', zh:'我在巴黎誰都不認識。' },
        { fr:'Il travaille trop.', zh:'他工作過頭了。（trop帶負面）' },
        { fr:"Je n'ai rencontré personne à la fête.", zh:'我在派對上誰都沒遇到。（PC中personne放分詞後）' },
        { fr:"Il ne fait plus de boxe.", zh:'他不再打拳了。（狀態改變）' },
      ]}},

  { id:'adjectifs-accord', name:'Accord & place des adjectifs', icon:'🎨', zone:'A2', cat:'adjectifs',
    lessons:[7,8,10], topics:['adjective-agreement','adjective-position'], unlocked:true,
    rule:{
      title:'形容詞 — 性數配合＋大多放名詞後面',
      why:'形容詞是名詞的衛星，衛星穿主星的制服——這是拉丁文傳下來的整套配合邏輯，跟冠詞、所有格是同一件事。位置的大原則：客觀分類的形容詞放後面（une voiture rouge），少數超高頻的主觀評價字（美醜好壞大小新舊，BAGS）搶到名詞前面的黃金位置。bel/nouvel 母音前變形跟 mon amie 完全同一個理由：法文不准兩個母音相撞。',
      points:[
        '基本配合：陰性+e（grand→grande）、複數+s（grands）、陰複+es（grandes）',
        '常見變形：-eux→-euse（courageux→courageuse）、-if→-ive、-er→-ère；有些不變（rouge, drôle）',
        '大多放名詞後：une robe bleue；BAGS類（美醜好壞大小新舊）放前面：un beau garçon、une nouvelle voiture',
        '母音前特殊形：beau→bel（un bel homme）、nouveau→nouvel（un nouvel ordinateur）',
        '形容詞在前時 des → de：de beaux objets',
      ],
      examples:[
        { fr:'Elle porte des jupes courtes.', zh:'她穿短裙。（陰複+es）' },
        { fr:'Un bel homme.', zh:'一個美男子。（母音前beau→bel）' },
        { fr:'De beaux objets.', zh:'一些漂亮的物品。（形容詞在前des→de）' },
      ]}},

  { id:'comparaison', name:'La comparaison', icon:'⚖️', zone:'A2', cat:'adjectifs',
    lessons:[14], topics:['comparaison'], unlocked:true,
    rule:{
      title:'比較級 — plus / aussi / moins + 形容詞 + que',
      why:'拉丁文用字尾變化做比較級，法文把那套丟了，改用三個副詞當萬用零件（plus/aussi/moins）——所以法文比較級比英文還規則（英文還要分 -er 和 more）。唯二的「例外」meilleur 和 pire 根本不是例外：它們是拉丁文比較級（melior/pejor）整顆字活下來的化石，太常用所以沒被新系統取代——跟英文 good→better 是同一個故事。',
      points:[
        'plus...que（更）、aussi...que（一樣）、moins...que（較不）',
        '⚠️ 兩個例外絕不說 plus：bon → meilleur、mauvais → pire',
        '形容詞照樣要跟主詞配合：Elle est plus grande que moi',
        '比較對象是代名詞時用重讀形：que moi / que lui / qu\'eux',
      ],
      examples:[
        { fr:'Le thé est meilleur que le café.', zh:'茶比咖啡好。（bon→meilleur）' },
        { fr:'Elle est plus grande que moi.', zh:'她比我高。（que + moi重讀形）' },
      ]}},

  { id:'conseils', name:'Conseils & obligations', icon:'💡', zone:'A2', cat:'verbe-mode',
    lessons:[11,13], topics:['giving-advice','ilfaut-devoir','interdiction-demande'], unlocked:true,
    rule:{
      title:'建議與義務 — il faut / devoir / conseiller',
      why:'兩種義務、兩個來源：il faut 的 il 是假主詞（跟 il pleut 的 il 一樣，沒有人在那裡）——「（世界）需要…」，所以是不針對誰的一般義務；devoir 本義是「欠」（現在還這樣用：il me doit 10 euros 他欠我10歐），你「欠」這個動作＝你個人有義務做——這就是兩者分工的全部邏輯。Défense de / Merci de 是公告體：名詞開頭、不指名道姓，跟中文「禁止吸菸」同一種語氣。',
      points:[
        'il faut + 原形 = 一般性的「必須/該」（不指定誰）：Il faut boire de l\'eau',
        'devoir + 原形 = 個人義務：je dois / tu dois / il doit / nous devons / vous devez / ils doivent',
        '給建議：Je te conseille de + 原形；Tu peux + 原形（軟性建議）',
        '禁止/請求：Défense de + 原形（禁止…）；Merci de + 原形（請…，公告用語）',
      ],
      examples:[
        { fr:'Il faut faire du sport tous les jours.', zh:'每天都要運動。（一般義務）' },
        { fr:'Je te conseille de faire du sport.', zh:'我建議你做運動。（conseiller de）' },
        { fr:'Défense de marcher sur la pelouse.', zh:'禁止踐踏草坪。' },
      ]}},

  { id:'duree-temps', name:'La durée (pendant · depuis · il y a)', icon:'⏳', zone:'A2', cat:'base',
    lessons:[16], topics:['duree'], unlocked:true,
    rule:{
      title:'時間表達四天王 — 問自己「事情結束了沒」',
      why:'法文切時間只看一件事：括號閉合了沒。pendant 是閉合的括號（一段有頭有尾的時間），il y a 是往回量到過去的一個點，depuis 是開口的括號——起點在過去、另一端還連著現在。「depuis 要配現在式」不是例外，是法文最誠實的地方：事情現在還在發生，當然用現在式（J\'habite ici depuis deux ans＝我現在還住著）。中文和英文都用過去式講這種句子，所以這格才需要特別練。',
      points:[
        'pendant + 時長 = 一段（已結束或明確起訖）：J\'ai travaillé pendant trois ans',
        'depuis + 起點/時長 = 到現在還在繼續：J\'habite ici depuis deux ans（動詞用現在式！）',
        'il y a + 時長 = …之前（過去一個時間點）：Ils ont déménagé il y a dix jours',
        'à + 年紀 = 在幾歲時：Je suis arrivée en France à deux ans',
        'longtemps（很久）/ toujours（一直）當副詞直接放動詞後',
      ],
      examples:[
        { fr:"J'habite ici depuis deux ans.", zh:'我住在這裡兩年了（還住著→depuis+現在式）。' },
        { fr:'Ils ont déménagé il y a dix jours.', zh:'他們十天前搬家了。（il y a=之前）' },
      ]}},

  // ═══ B1（已教的部分） ══════════════════════════════════════
  { id:'relatifs', name:'Pronoms relatifs (qui · que)', icon:'🔗', zone:'B1', cat:'pronoms',
    lessons:[16], topics:['qui-que'], unlocked:true,
    rule:{
      title:'關係代名詞 qui / que — 看後面缺主詞還是缺受詞',
      why:'法文早就把拉丁文的「格」（主格/受格字尾）丟光了，唯獨在這裡留了一對活化石：qui 是主格（它自己當子句的主詞），que 是受格（子句另有主詞、它當受詞）。所以選 qui 還是 que 從來不是背搭配，是看你挖掉的那個洞原本是主詞還是受詞——qui 後面直接接動詞（洞在主詞位），que 後面先出現新主詞（洞在受詞位）。',
      points:[
        'qui 代替主詞（qui後面直接接動詞）：la France est un pays qui change',
        'que 代替受詞（que後面有新的主詞）：c\'est un métier que j\'adore',
        '判斷口訣：關係子句裡「動詞前有沒有人」——沒有→qui、有→que',
        'qui 永不縮寫；que 母音前變 qu\'：le livre qu\'il lit',
      ],
      examples:[
        { fr:"L'homme qui parle est mon prof.", zh:'正在說話的那個人是我老師。（qui+動詞）' },
        { fr:"C'est un métier que j'adore.", zh:'這是一個我熱愛的職業。（que+主詞je）' },
      ]}},

  // ═══ 未開課（B1/B2 佔位，教到才解鎖） ══════════════════════
  { id:'opinions',     name:'Opinions & débats',        icon:'💬', zone:'B1', cat:'discours',    lessons:[], topics:['connectors-pour-parceque'], unlocked:false },
  { id:'futur',        name:'Futur & conditionnel',     icon:'🌟', zone:'B1', cat:'verbe-temps', lessons:[], topics:[], unlocked:false },
  { id:'subjonctif',   name:'Subjonctif présent',       icon:'🌀', zone:'B1', cat:'verbe-mode',  lessons:[], topics:[], unlocked:false },
  { id:'discours',     name:'Discours indirect',        icon:'💭', zone:'B1', cat:'discours',    lessons:[], topics:[], unlocked:false },
  { id:'pluperfect',   name:'Plus-que-parfait',         icon:'⏪', zone:'B2', cat:'verbe-temps', lessons:[], topics:[], unlocked:false },
  { id:'cond-passe',   name:'Conditionnel passé',       icon:'😔', zone:'B2', cat:'verbe-temps', lessons:[], topics:[], unlocked:false },
  { id:'subj-passe',   name:'Subjonctif passé',         icon:'🌀', zone:'B2', cat:'verbe-mode',  lessons:[], topics:[], unlocked:false },
  { id:'passe-simple', name:'Passé simple',             icon:'📜', zone:'B2', cat:'verbe-temps', lessons:[], topics:[], unlocked:false },
  { id:'concordance',  name:'Concordance des temps',    icon:'🔄', zone:'B2', cat:'verbe-temps', lessons:[], topics:[], unlocked:false },
  { id:'passive',      name:'Voix passive',             icon:'🔃', zone:'B2', cat:'verbe-mode',  lessons:[], topics:[], unlocked:false },
  { id:'gerondif',     name:'Gérondif & part. présent', icon:'🌊', zone:'B2', cat:'verbe-mode',  lessons:[], topics:[], unlocked:false },
  { id:'pron-avances', name:'Pronoms avancés (y·en·doubles)', icon:'🔗', zone:'B2', cat:'pronoms', lessons:[], topics:[], unlocked:false },
  { id:'connecteurs',  name:'Connecteurs avancés',      icon:'🧵', zone:'B2', cat:'discours',    lessons:[], topics:[], unlocked:false },
];

/* ── 共用 helper ──────────────────────────────────────────── */

// 階段定義（顯示用）
const GRAM_STAGES = {
  0: { label:'未開課', icon:'🔒' },
  1: { label:'理解',   icon:'📖' },
  2: { label:'半開卷', icon:'🪜' },
  3: { label:'遮規則', icon:'🎯' },
  4: { label:'考題',   icon:'🧪' },
  5: { label:'反射',   icon:'⚡' },
};

// 讀取某文法點目前階段：未開課=0；現役沒記錄=2（全部重走的預設）
function gramStageOf(pointId) {
  const p = GRAM_POINTS.find(x => x.id === pointId);
  if (!p || !p.unlocked) return 0;
  try {
    const st = JSON.parse(localStorage.getItem('clb7_gram_stage') || '{}');
    const rec = st[pointId];
    return rec && typeof rec.stage === 'number' ? rec.stage : 2;
  } catch (e) { return 2; }
}

// 寫入階段（附歷史）
function gramSetStage(pointId, stage, acc) {
  let st;
  try { st = JSON.parse(localStorage.getItem('clb7_gram_stage') || '{}'); } catch (e) { st = {}; }
  const rec = st[pointId] || { hist: [] };
  rec.stage = stage;
  rec.hist = (rec.hist || []).concat([{ d: new Date().toLocaleDateString('zh-TW'), stage, acc: (acc == null ? null : acc) }]).slice(-30);
  st[pointId] = rec;
  localStorage.setItem('clb7_gram_stage', JSON.stringify(st));
}

// topic → 所屬文法點（quiz 選課器標記用）；找不到回傳 null（詞彙類不受框架管）
function gramPointOfTopic(topic) {
  return GRAM_POINTS.find(p => p.topics.indexOf(topic) >= 0) || null;
}

// 檢舉題目池（陣列，元素 {id, d, src, q}）
function gramFlaggedIds() {
  try { return (JSON.parse(localStorage.getItem('clb7_flagged_qs') || '[]')).map(f => f.id); }
  catch (e) { return []; }
}
function gramFlagQuestion(qid, src, qText) {
  let arr;
  try { arr = JSON.parse(localStorage.getItem('clb7_flagged_qs') || '[]'); } catch (e) { arr = []; }
  if (!arr.some(f => f.id === qid)) {
    arr.push({ id: qid, d: new Date().toLocaleDateString('zh-TW'), src: src, q: (qText || '').slice(0, 80) });
    localStorage.setItem('clb7_flagged_qs', JSON.stringify(arr));
  }
  return arr.length;
}
