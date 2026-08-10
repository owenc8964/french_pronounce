// 時態透視鏡 — tense_xray.html 專用
// ─────────────────────────────────────────────────────────────
// Owen 2026-08-10：「很多東西可以不用用題目做，算是讀／浸潤／體驗式學習。」
//
// 這一頁**沒有題目、沒有計分、沒有 SRS**。就是讀文章。
// 差別只在：可以「開燈」——把每個動詞的時間形狀浮在字上面，
// 讓時態從「要判斷的東西」變成「看得見的質地」。
// 依據 BLOCKS.md：感知塊要在**真實語流**裡反覆遇到才會內化。
//
// ── 為什麼要自己寫短文（例外的依據與界線）─────────────────────
// `reading.html` 23 篇裡只有 a21／a22／a23 是敘事體（過去式動詞 11／8／9 個），
// 其餘 20 篇是 A1 的菜單、廣告、時刻表，全 présent——拿來練時態等於沒素材。
// CLAUDE.md 內容鐵律的已核准例外：**閱讀短文可原創，但詞彙句型要對齊已學課次**
// （`a22 Un souvenir de Lanyu`／`a23 Un été à Kenting` 本來就是這樣寫的）。
//
// 本檔的界線（Owen 2026-08-10 同意）：
//   ✅ **詞彙鎖在第 1–22 課學過的範圍**（市場/食物/天氣/回憶/家人/交通/衣服…）
//   ✅ **時態放到 B2**——他每個字都讀得懂，新的只有文法的質地。
//      這正是「還沒學到的可以用中文思考，是套用思考方法」的閱讀版：
//      先在真實語流裡遇到那個形狀，之後課本教到時只是把名字貼上去。
//   ⛔ 不引入未學詞彙來炫技；不為了塞時態而寫出不自然的句子。
//
// 角色沿用 GPT 圖的 Luc（`time_hall.js` 那一整套），整個系統同一個人。
//
// ── 標記格式 ─────────────────────────────────────────────────
// 內文用 [[動詞原樣|格子]] 標注，例如 [[pleuvait|imp]]。
// 用行內標記而不是另外存位置，是因為位置表很容易跟文字對不上（改一個字就全歪）。

// 每個格子怎麼畫、叫什麼、為什麼
// alias 取自時間劇院 2/9 的職業別名（記憶掛勾，全系統共用）
const SHAPES = {
  present   : { label:'présent',              alias:'現場主播',     fam:'now', done:false, cx:'5-1-1',
                why:'站在現在直接看它。習慣、事實、正在發生，都在這一格。' },
  pc        : { label:'passé composé',        alias:'紀錄官',       fam:'event', done:false, cx:'5-2-1',
                why:'有頭有尾的一整件事，推動故事往前走。' },
  imp       : { label:'imparfait',            alias:'長鏡頭攝影師', fam:'scene', done:false, cx:'5-3-1',
                why:'鏡頭進到事情裡面，拍背景、習慣、狀態，不交代起訖。' },
  pqp       : { label:'plus-que-parfait',     alias:'檔案管理員',   fam:'event', done:true, cx:'5-4-1',
                why:'站在一個過去點，再往前看：那時以前就已經完成了。' },
  fproche   : { label:'futur proche',         alias:'蓄勢待發式',   fam:'fut', done:false, cx:'5-5-1',
                why:'未來的影子已經出現在現在——已經有計畫或跡象。' },
  fsimple   : { label:'futur simple',         alias:'未來建築師',   fam:'fut', done:false, cx:'5-5-2',
                why:'直接站進未來，說那裡會發生什麼。預測／承諾／安排。' },
  fanterieur: { label:'futur antérieur',      alias:'驗收經理',     fam:'fut', done:true, cx:'5-5-2',
                why:'先站到未來，再回頭看哪件事已經完成。' },
  precent   : { label:'passé récent',         alias:'剛剛完成',     fam:'event', done:false, cx:'5-6-1',
                why:'剛結束、餘溫還連著現在。venir de + 原形。' },
  psimple   : { label:'passé simple',         alias:'文學敘事',     fam:'event', done:false, cx:'5-7-1',
                why:'跟 passé composé 同一格，差別只在語域：書面文學專用。' },
  condpoli  : { label:'conditionnel présent（禮貌）', alias:'退後半步', fam:'dist', done:false, cx:'6-2-1',
                why:'不把話壓在現實正中央——往後退一步，語氣就軟了。' },
  condhypo  : { label:'conditionnel présent（假設結果）', alias:'可能世界式', fam:'dist', done:false, cx:'6-2-2',
                why:'假設成立的話會發生的結果。' },
  condpasse : { label:'conditionnel passé',   alias:'錯過世界式',   fam:'dist', done:true, cx:'6-2-3',
                why:'本來會，但沒有發生。後悔、責備、反事實。' },
  subj      : { label:'subjonctif présent',   alias:'心願立場式',   fam:'stance', done:false, cx:'6-3-1',
                why:'這件事被另一個立場包住了——願望、必要、情緒、懷疑、讓步、時間界線。' },
  subjpasse : { label:'subjonctif passé',     alias:'已完成立場式', fam:'stance', done:true, cx:'6-3-1',
                why:'在主句的立場之前，從句動作已經完成。' },
  siimp     : { label:'si + imparfait',       alias:'與現在不同的世界', fam:'dist', done:false, cx:'6-6-1',
                why:'⚠️ 這個 imparfait 跟過去無關，是「這不是真的」。現在事實通常不是這樣。' },
  sipqp     : { label:'si + plus-que-parfait', alias:'與過去事實不同', fam:'dist', done:true, cx:'6-6-1',
                why:'⚠️ 反事實：那條世界線已經關上了。' },
  sipres    : { label:'si + présent',         alias:'真實可能世界', fam:'now', done:false, cx:'6-6-1',
                why:'條件被視為真實可能，所以還在「報告現實」。si 後面用 présent，即使講的是明天。' },
  imperatif : { label:'impératif',            alias:'推動行動',     fam:'act', done:false, cx:'6-1-1',
                why:'不描述世界，直接要世界改變。' },
};

const TEXTS = [

{ id:'X1', title:'Le samedi de Luc', zh:'呂克的星期六', lvl:'A2',
  focus:'présent · imparfait · passé composé',
  intro:'最基本的三個鏡頭擠在同一篇裡：現在的習慣、小時候的背景、上週六發生的事。開燈之後你會看到——長條跟點是交錯出現的，不是分段落的。',
  paras:[
    "Le samedi, Luc [[se lève|present]] tôt. Il [[aime|present]] le marché de son quartier : il y [[a|present]] des fleurs, du poisson et du bon fromage.",
    "Quand il [[était|imp]] petit, son grand-père l'[[emmenait|imp]] au marché chaque semaine. Il [[faisait|imp]] souvent froid, mais Luc [[était|imp]] content. Son grand-père [[parlait|imp]] avec tout le monde, et Luc [[regardait|imp]] les gens.",
    "Samedi dernier, Luc [[a acheté|pc]] du fromage et des fleurs. Il [[a vu|pc]] son voisin devant le stand de poisson et ils [[ont parlé|pc]] pendant vingt minutes.",
    "Ce soir, il [[va préparer|fproche]] un dîner simple : une soupe, du pain, un peu de fromage.",
  ],
  zhParas:[
    '星期六，呂克很早起床。他喜歡他社區的市場：那裡有花、有魚、還有好吃的乳酪。',
    '他小時候，他的祖父每個星期都帶他去市場。天氣常常很冷，但呂克很開心。他的祖父跟所有人聊天，而呂克就看著大家。',
    '上個星期六，呂克買了乳酪和花。他在魚攤前面看到他的鄰居，他們聊了二十分鐘。',
    '今天晚上，他要準備一頓簡單的晚餐：一份湯、麵包、一點乳酪。',
  ] },

{ id:'X2', title:'La lettre oubliée', zh:'被遺忘的那封信', lvl:'A2+',
  focus:'加進 plus-que-parfait',
  intro:'同樣是回憶，但這篇多了一層：故事停在某個過去點，然後往更早以前挖。開燈後注意那些帶勾的——它們全部落在「他找到盒子」那一刻的左邊。',
  paras:[
    "L'été dernier, Luc [[est retourné|pc]] dans la maison de ses grands-parents. Personne n'y [[habitait|imp]] plus depuis trois ans.",
    "Dans la cuisine, il [[a trouvé|pc]] une vieille boîte. Sa grand-mère l'[[avait cachée|pqp]] derrière les assiettes, et personne ne l'[[avait ouverte|pqp]] depuis longtemps.",
    "Dedans, il y [[avait|imp]] des photos et une lettre. Son grand-père l'[[avait écrite|pqp]] en 1962, avant son mariage. Luc ne [[savait|imp]] pas que ses grands-parents [[s'étaient rencontrés|pqp]] à Paris.",
    "Il [[a lu|pc]] la lettre deux fois. Dehors, il [[pleuvait|imp]]. Quand il [[est sorti|pc]], le ciel [[était|imp]] encore gris, mais il [[souriait|imp]].",
  ],
  zhParas:[
    '去年夏天，呂克回到他祖父母的房子。已經三年沒有人住在那裡了。',
    '在廚房裡，他找到一個舊盒子。他的祖母把它藏在盤子後面，而且很久沒有人打開過它。',
    '裡面有一些照片和一封信。他的祖父在 1962 年、結婚之前寫了這封信。呂克不知道他的祖父母當年是在巴黎認識的。',
    '他把信讀了兩次。外面正在下雨。他出門的時候，天空還是灰的，但他微笑著。',
  ] },

{ id:'X3', title:'Le train de sept heures', zh:'七點的火車', lvl:'B1',
  focus:'三種未來 · futur antérieur',
  intro:'整篇往右邊移。三種看未來的方法會一起出現：已經在醞釀的（箭頭短）、直接畫藍圖的（箭頭長）、還有站到未來回頭看的（箭頭加勾）。',
  paras:[
    "Demain, Luc [[va partir|fproche]] en Bretagne. Son train [[part|present]] à sept heures ; il [[va donc se lever|fproche]] très tôt.",
    "Il [[fera|fsimple]] froid le matin, mais il n'[[aura|fsimple]] pas le temps de prendre un café à la gare. Quand il [[arrivera|fsimple]] à Quimper, sa cousine l'[[attendra|fsimple]] devant la sortie.",
    "À midi, il [[sera déjà arrivé|fanterieur]] chez elle. Ils [[iront|fsimple]] ensemble au marché, et le soir ils [[mangeront|fsimple]] des crêpes.",
    "Si le temps [[est|sipres]] beau dimanche, ils [[feront|fsimple]] du vélo au bord de la mer. Sinon, ils [[resteront|fsimple]] à la maison.",
  ],
  zhParas:[
    '明天，呂克要去布列塔尼。他的火車七點開；所以他要很早起床。',
    '早上會很冷，但他不會有時間在車站喝咖啡。他到坎佩爾的時候，他的表妹會在出口前面等他。',
    '到中午，他就已經到她家了。他們會一起去市場，晚上他們會吃可麗餅。',
    '如果星期天天氣好，他們會去海邊騎腳踏車。不然的話，他們就待在家裡。',
  ] },

{ id:'X4', title:"Si j'avais su", zh:'早知道的話', lvl:'B1+',
  focus:'si 三扇門 · conditionnel',
  intro:'一段對話，三扇門全部出現。開燈後注意虛線——虛線標的不是時間，是「這不是真的」。si 後面那些 imparfait 跟過去完全沒關係。',
  paras:[
    "Luc [[voulait|imp]] aller à la fête de Marie, mais il n'y [[est pas allé|pc]].",
    "« Si j'[[avais su|sipqp]] qu'elle [[partait|imp]] le lendemain, je [[serais venu|condpasse]] », [[dit|present]]-il à son frère. « J'[[aurais dû|condpasse]] l'appeler. »",
    "Son frère [[répond|present]] : « Si tu [[veux|sipres]], on lui [[écrit|present]] demain. Elle [[sera|fsimple]] contente. »",
    "« Tu [[crois|present]] ? Moi, si j'[[étais|siimp]] elle, je ne [[répondrais|condhypo]] pas. »",
    "« Tu [[exagères|present]]. Tu [[pourrais|condpoli]] au moins essayer. À ta place, j'[[enverrais|condhypo]] un message ce soir. »",
    "Luc [[a réfléchi|pc]] un moment. Puis il [[a pris|pc]] son téléphone.",
  ],
  zhParas:[
    '呂克本來想去瑪麗的派對，但他沒有去。',
    '「早知道她隔天就要走，我就會來了，」他對他哥哥說。「我當時應該打給她的。」',
    '他哥哥回答：「你要的話，我們明天寫信給她。她會很高興。」',
    '「你覺得嗎？如果我是她，我不會回。」',
    '「你太誇張了。你至少可以試試看。如果是我，我今天晚上就傳訊息。」',
    '呂克想了一會兒。然後他拿起他的手機。',
  ] },

{ id:'X5', title:'Il faut que tu viennes', zh:'你一定要來', lvl:'B1+',
  focus:'subjonctif · 以及它的例外',
  intro:'又一段對話，這次幾乎每句都被一個立場包住。開燈看波浪線在哪裡——然後注意最後一句：espérer 明明是「希望」，卻是直線。那是最有名的例外。',
  paras:[
    "« Il faut que tu [[viennes|subj]] dimanche », [[dit|present]] Marie. « Je [[veux|present]] que tout le monde [[soit|subj]] là. »",
    "« Je ne [[suis|present]] pas sûr que ce [[soit|subj]] possible », [[répond|present]] Luc. « Il faut que je [[travaille|subj]] samedi soir. »",
    "« Bien qu'il y [[ait|subj]] du travail, tu [[peux|present]] venir une heure. Je [[suis|present]] contente que tu [[sois rentré|subjpasse]] à Paris ; je [[regrette|present]] que nous ne nous [[voyions|subj]] plus. »",
    "« Tu [[as|present]] raison. Je [[viendrai|fsimple]] avant qu'il [[fasse|subj]] nuit. »",
    "« Parfait. J'[[espère|present]] qu'il [[fera|fsimple]] beau. »",
  ],
  zhParas:[
    '「你星期天一定要來，」瑪麗說。「我要所有人都在。」',
    '「我不確定那有沒有可能，」呂克回答。「我星期六晚上必須工作。」',
    '「雖然有工作，你還是可以來一個小時。我很高興你回巴黎了；我很遺憾我們不再見面了。」',
    '「你說得對。我會在天黑之前來。」',
    '「太好了。我希望天氣會好。」',
  ] },

{ id:'X6', title:'Au marché, dimanche matin', zh:'星期天早上，在市場', lvl:'A2',
  focus:'impératif · passé récent',
  intro:'一段市場上的對話。這篇沒有難的時態，但有兩個你天天會用到卻很少注意的：叫對方做事的（橘線）、還有「剛剛才發生」的（紅線）。注意 venir 明明是現在式，整組卻是在講過去。',
  paras:[
    "— Bonjour ! Vous [[avez|present]] du poisson aujourd'hui ?",
    "— Oui, [[regardez|imperatif]] : il [[vient d'arriver|precent]] ce matin. [[Prenez|imperatif]] celui-ci, il [[est|present]] très frais.",
    "— D'accord. Et les fleurs, elles [[sont|present]] à combien ?",
    "— Trois euros. Ma femme [[vient de les couper|precent]] dans le jardin. [[N'attendez pas|imperatif]] trop, il [[va faire|fproche]] chaud cet après-midi.",
    "— Parfait. [[Donnez|imperatif]]-moi aussi du fromage, s'il vous plaît. Je [[voudrais|condpoli]] en emporter pour ma sœur.",
  ],
  zhParas:[
    '——您好！您今天有魚嗎？',
    '——有，您看：牠今天早上剛到。拿這條吧，很新鮮。',
    '——好。那花呢，多少錢？',
    '——三歐元。我太太剛從花園裡剪下來的。別等太久，今天下午會變熱。',
    '——太好了。也請給我一些乳酪。我想帶一些回去給我妹妹。',
  ] },

];

if (typeof module !== 'undefined') module.exports = { TEXTS, SHAPES };
