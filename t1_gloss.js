/* ============================================================
   t1_gloss.js — T1 25 段的「讀懂」層（逐塊對照 ＋ 文法點 ＋ codex 門牌）
   ------------------------------------------------------------
   2026-09-05 建立。給 t1_read.html 讀，也餵給 tools/gen_anki_t1.py。

   ⚠️ 這個檔存在的理由（Owen 2026-09-05 回報的卡點）：
     「我看到中文想不出法文後，我先點進去看答案，
       結果**我看到法文也不懂為什麼是長這樣**。」
     「我覺得需要有一個介紹這句是什麼意思或文法解析，不然我也背不起來。」

   ⭐ 診斷：問題不在「回想」那一步，在**翻答案**那一步。
     SRS 真正學到東西的時刻就是翻答案那一秒；答案是看不懂的字串 → 那次 rep 空轉。
     ⭐⭐ 而 SRS 的前提本來就是「你已經懂了」——「第一次搞懂」是另一個動作，
     而且**只需要做一次**。→ 六層框架 L0 → L1 中間缺的就是這一層。

   欄位：
     blocks[]  {fr, zh}  逐塊對照。⭐⭐ zh 優先取自 Owen 自己的 source_zh 原話——
                         讓他發現「這不是陌生的法文，是我自己講過的話」。這是本檔的核心價值。
                         ⛔ fr 必須是該段原文的真實片段（檢查器逐塊驗，全覆蓋不是抽樣）。
     points[]  {fr, note, n}  文法點。n＝codex.js 的永久座標，⛔ 查不到就填 null，**不准編門牌**
                              （錯的門牌比沒門牌更糟——會把他導去完全無關的條目）。

   ⚠️ key ＝ `hook + '/' + src`。⭐ 光靠 src 不唯一（`Owen 2026-09-04 口述` 出現兩次），
     hook 也不唯一，合起來才唯一。

   ⛔ 刻意不解釋的：je suis／j'ai … ans／j'aime + 原形／基本現在式變位。
     依專案教學鐵律——重講他已經反射化的規則「只是浪費，且讓他覺得自己很笨」。
     每段最多 3 個文法點，寧可少不要多。

   ⭐ 有 10 個文法點的 n 是 null ＝ codex 目前沒有那條門牌。
     那份清單本身有價值：它是從他真的在背的句子倒推出來的宮殿缺口，不是憑空盤點。
     （最有價值的兩條：`en ＋時間長度` —— 9-4-1 的 durée 條目直接漏掉，
       而他講「一年內考過」一定用得到；以及 `de plus en plus`，兩段都出現。）

   動這個檔之後一定要跑 node tools/check_t1_stock.js。
   ============================================================ */

const T1_GLOSS = {

  'opening': {
    blocks: [
      {fr:"Je m'appelle Owen, j'ai 36 ans et je suis dentiste", zh:"我叫 Owen，36 歲，是牙醫"},
      {fr:"Je suis quelqu'un d'analytique", zh:"我是個分析型的人"},
      {fr:"j'aime classer les choses", zh:"我喜歡把同一件事情分門別類"},
      {fr:"et faire des liens entre elles", zh:"把不同的事情整理出來做連結"},
      {fr:"Je suis plutôt rationnel", zh:"我相對比較理性"},
      {fr:"mais pas au point d'être ingénieur", zh:"但我不覺得自己是工程仔，還沒到那個程度"},
      {fr:"J'habite à Banqiao, près de Taipei", zh:"我住在台北附近的板橋"},
      {fr:"Je vis avec ma femme Lauryn et notre fille Jolie", zh:"我跟太太 Lauryn 和女兒 Jolie 住在一起"},
      {fr:"J'ai commencé le français en mai, cette année", zh:"我今年五月開始學法文"},
      {fr:"Je prends des cours et j'écoute le podcast Coffee Break French", zh:"除了找家教，我也聽 Coffee Break French 這個 podcast"},
      {fr:"Pour moi, apprendre, ce n'est pas seulement passer du temps", zh:"我覺得學習一門新事物，不單只是花時間"},
      {fr:"le plus important, c'est de trouver la bonne méthode", zh:"用對方法才是最重要的"}
    ],
    points: [
      {fr:"quelqu'un d'analytique", note:"代名詞掛不住形容詞，要插 de 當橋；形容詞永遠陽性單數", n:"3-6-2"},
      {fr:"entre elles", note:"介詞後面一律用重讀形，elles 指前面的 les choses", n:"3-2-1"},
      {fr:"pas au point d'être ingénieur", note:"au point de+原形＝到…的程度；職業放 être 後裸用不加冠詞", n:"1-3-6"}
    ]
  },

  'dentiste/AC3 §1+§3': {
    blocks: [
      {fr:"Je suis dentiste", zh:"我是牙醫"},
      {fr:"Je travaille cinq jours par semaine", zh:"我現在一個禮拜看五天診"},
      {fr:"et je vois une quinzaine de patients par jour", zh:"一天大概看十五個病人"},
      {fr:"Ce que j'aime, c'est donner confiance", zh:"我喜歡的是給人信心"},
      {fr:"Un jour, un jeune patient avait trop peur pour se soigner", zh:"有一個病人很年輕，很想處理牙齒但又不敢"},
      {fr:"Je lui ai dit", zh:"我跟他說"},
      {fr:"« Vous pouvez arrêter quand vous voulez. »", zh:"「你隨時都可以停」"},
      {fr:"Il a terminé son traitement", zh:"他後來慢慢接受治療，真的把療程做完了"},
      {fr:"Aujourd'hui, son sourire a changé", zh:"今天，他的笑容不一樣了"}
    ],
    points: [
      {fr:"Ce que j'aime, c'est donner confiance", note:"Ce que…, c'est… 把重點推到句尾的聚光燈句型", n:"7-4-1"},
      {fr:"avait trop peur pour se soigner", note:"trop…pour+原形＝太…以致做不了；se soigner 動作回到自己", n:"4-4-1"},
      {fr:"Je lui ai dit", note:"dire à 某人 → 人變 lui，卡在助動詞前面", n:"3-3-2"}
    ]
  },

  'dentiste/AC3 §2': {
    blocks: [
      {fr:"Mais honnêtement, je n'ai pas choisi ce métier par passion", zh:"但老實說，我當初不是因為熱情才選這個職業"},
      {fr:"à Taïwan, ce sont les notes qui décident", zh:"在台灣，分數到哪裡就決定去選哪裡"},
      {fr:"La passion est venue après, quand j'ai commencé à travailler", zh:"等到唸完、真的實際上做的時候，才發現這件事對人真的有幫助"},
      {fr:"J'ai même un camarade qui a fait les mêmes études", zh:"我甚至有一個同學，跟我念一樣的書"},
      {fr:"et qui est devenu photographe à New York", zh:"念完牙醫之後直接轉行當攝影師，現在在紐約做得不錯"},
      {fr:"Alors je pense que les enfants doivent explorer leurs rêves plus tôt", zh:"我覺得小朋友應該要早一點好好探索自己的理想"},
      {fr:"et c'est aussi pour ça que je veux partir au Canada", zh:"這就是我想去加拿大的一個原因"}
    ],
    points: [
      {fr:"ce sont les notes qui décident", note:"c'est…qui 把主詞打上聚光燈；主詞是複數就用 ce sont", n:"7-4-1"},
      {fr:"un camarade qui a fait … et qui est devenu", note:"qui 帶的子句缺主詞，所以 qui 後面直接接動詞", n:"3-5-1"},
      {fr:"est venue / est devenu", note:"venir、devenir 用 être 當助動詞，分詞要跟主詞配合", n:"5-2-2"}
    ]
  },

  'dentiste/AC3 §4': {
    blocks: [
      {fr:"Au Canada, si je veux exercer", zh:"如果要過去的話，我想執業的話"},
      {fr:"je devrai repasser les examens", zh:"我必須要重新考當地的牙醫執照"},
      {fr:"Ce sera long", zh:"雖然過程中很艱辛"},
      {fr:"mais je ferai tout pour y arriver", zh:"但我會把這件事情盡全力完成"}
    ],
    points: [
      {fr:"si je veux exercer, je devrai", note:"si 後面永遠不用未來式；未來式留給結果那半句", n:"6-6-2"},
      {fr:"je devrai / ce sera / je ferai", note:"未來式三個不規則字根：devr-、ser-、fer-", n:"5-5-2"},
      {fr:"pour y arriver", note:"y arriver＝辦到；y 頂替「到達那件事」的 à", n:"3-4-2"}
    ]
  },

  'analytique/Owen 2026-09-04 口述': {
    blocks: [
      {fr:"Oui, beaucoup", zh:"分析型當然有好處啊"},
      {fr:"Dans mon travail, il y a beaucoup de détails et de problèmes", zh:"牙科工作有很多細節及問題"},
      {fr:"Il faut d'abord les classer et faire des liens entre eux", zh:"需要先分析編排、把它們連起來"},
      {fr:"et après on peut trouver une solution", zh:"之後才能找出解方"},
      {fr:"C'est comme ça que je peux bien soigner mes patients", zh:"讓病人的問題能被妥善處理"}
    ],
    points: [
      {fr:"les classer", note:"受詞代名詞站在它管的那個原形前面，不是動詞後面", n:"3-3-1"},
      {fr:"entre eux", note:"介詞後用重讀形；指陽性的 détails，所以是 eux 不是 elles", n:"3-2-1"},
      {fr:"C'est comme ça que", note:"c'est…que 強調句的固定用法＝「就是這樣我才…」", n:"7-4-1"}
    ]
  },

  'Banqiao/AC1 §2': {
    blocks: [
      {fr:"J'habite dans un immeuble", zh:"我家住的是大樓"},
      {fr:"Le quartier est très ouvert", zh:"這個地方棟距比較大，整體很空曠"},
      {fr:"et la gare est tout près", zh:"離車站與各種大眾運輸都很近"},
      {fr:"Il y a moins de petits restaurants qu'ailleurs", zh:"不像其他地方有很多小吃，這邊選擇比較少"},
      {fr:"et c'est un peu plus cher", zh:"物價也相對高一些"},
      {fr:"mais j'aime vivre ici", zh:"但我滿喜歡這裡的"},
      {fr:"les voisins sont gentils et tout est propre", zh:"住戶都很友善，環境也非常整潔"}
    ],
    points: [
      {fr:"moins de petits restaurants qu'ailleurs", note:"比名詞的量：moins de＋名詞＋que，de 後面不放冠詞", n:"2-3-4"},
      {fr:"un peu plus cher", note:"un peu 放 plus 前面把強度調弱＝只是「稍微」貴一點", n:"9-2-1"},
      {fr:"tout est propre", note:"tout 當主詞＝「一切」，動詞用第三人稱單數", n:"3-6-1"}
    ]
  },

  'Lauryn/AC2 §1尾+§2': {
    blocks: [
      {fr:"Lauryn travaille aussi", zh:"太太目前也在工作，我們是雙薪家庭"},
      {fr:"elle est dans le secteur de la technologie", zh:"她是做科技產業相關的服務"},
      {fr:"Quand je lui ai parlé du Canada, elle était contente", zh:"太太聽到出國計畫時其實蠻開心的"},
      {fr:"À Taïwan, la vie est très confortable", zh:"在臺灣生活其實算舒適，真的很方便"},
      {fr:"il y a des supérettes partout", zh:"便利商店也很多"},
      {fr:"mais les logements sont de plus en plus chers", zh:"但房價越來越高"},
      {fr:"Pour élever un enfant, ce n'est pas idéal", zh:"以小孩的生活和成長發展來說，我覺得不是太理想"}
    ],
    points: [
      {fr:"je lui ai parlé du Canada", note:"parler à 某人 de 某事：人變 lui，事情留在 de 後面", n:"3-3-2"},
      {fr:"elle était contente", note:"當時的心情是背景畫面，用 imparfait 不用 passé composé", n:"5-3-3"},
      {fr:"de plus en plus chers", note:"de plus en plus＋形容詞＝越來越…，整組固定不拆", n:null}
    ]
  },

  'Jolie/AC2 §1': {
    blocks: [
      {fr:"Jolie a un an et demi", zh:"女兒現在一歲多"},
      {fr:"elle vient d'apprendre à marcher et à parler", zh:"剛學會講話和走路"},
      {fr:"Elle est très aventurière", zh:"個性蠻冒險犯難的"},
      {fr:"quand quelque chose l'intéresse", zh:"對有興趣的東西"},
      {fr:"elle fait tout pour l'attraper", zh:"會想辦法拿到並不斷探索"}
    ],
    points: [
      {fr:"vient d'apprendre", note:"venir de＋原形＝剛剛才做完，不是「來自」", n:"5-6-1"},
      {fr:"apprendre à marcher et à parler", note:"apprendre 要 à 當橋才接原形；兩個原形各帶一個 à", n:"8-3-3"},
      {fr:"l'intéresse / l'attraper", note:"la 在母音前縮成 l'，受詞放在它管的動詞前面", n:"3-3-1"}
    ]
  },

  'Jolie/AC2 §3': {
    blocks: [
      {fr:"Le week-end, c'est le temps de la famille", zh:"我們家的週末就是家庭時間"},
      {fr:"Chaque dimanche matin, on fait du yoga tous les deux", zh:"禮拜天早上我會跟太太一起去上瑜伽"},
      {fr:"et Jolie joue dans la salle", zh:"女兒就在教室裡面玩"},
      {fr:"le professeur est très ouvert, alors elle explore librement", zh:"老師很開放，她玩得很開心、能自由探索"},
      {fr:"On profite aussi du soleil et de la nature", zh:"享受陽光和大自然"},
      {fr:"à Taïwan, on n'a pas souvent le temps", zh:"這是平常生活比較難得的"}
    ],
    points: [
      {fr:"Chaque dimanche matin", note:"chaque 不變化，後面一定接單數名詞", n:"1-6-4"},
      {fr:"on fait du yoga", note:"做運動用 faire du／de la，⛔ 不說 faire yoga", n:"1-3-3"}
    ]
  },

  'en mai/AC15 §1': {
    blocks: [
      {fr:"J'ai commencé le français en mai 2026", zh:"大概是從 2026 年的 5 月開始學"},
      {fr:"En 2027, je passerai l'examen deux fois : en avril et en septembre", zh:"預計在 2027 年的 4 月和 9 月都會去考"},
      {fr:"Mon objectif, c'est de réussir en un an", zh:"我的目標是一年內要考過"},
      {fr:"et au maximum en deux ans, d'atteindre le B2", zh:"但希望至少兩年內要考到 B2"}
    ],
    points: [
      {fr:"je passerai", note:"未來式規則式＝原形＋ai/as/a…，passer 就是 passerai", n:"5-5-2"},
      {fr:"Mon objectif, c'est de réussir", note:"抽象主詞先擺出來，再用 c'est de＋原形交出內容", n:"7-4-1"},
      {fr:"en un an", note:"en＋時間長度＝「花多久做完」，⛔ 不是 pendant 也不是 dans", n:null}
    ]
  },

  'Coffee Break French/AC1 §3': {
    blocks: [
      {fr:"Je prends des cours", zh:"我有找家教上課"},
      {fr:"et j'utilise aussi Duolingo et l'IA", zh:"也用 Duolingo 和 AI 協助提升法文能力"},
      {fr:"J'écoute le podcast Coffee Break French", zh:"我聽很多 Podcast"},
      {fr:"et je regarde la série Extra French", zh:"也看很多法文影集"}
    ],
    points: [
      {fr:"J'écoute le podcast / je regarde la série", note:"écouter、regarder 後面直接接受詞，⛔ 不加 à", n:null}
    ]
  },

  'la bonne méthode/AC1 §4': {
    blocks: [
      {fr:"Le français est une langue très spéciale", zh:"法文非常特別且富有感情"},
      {fr:"Quand je le parle, j'ai l'impression de changer de regard", zh:"說法文時彷彿會切換視角"},
      {fr:"parfois c'est flou, parfois c'est net", zh:"時而模糊時而清楚"},
      {fr:"et quand c'est flou, je vois le monde plus largement", zh:"模糊的時候能看見更完整的世界觀"}
    ],
    points: [
      {fr:"je le parle", note:"le 代替 le français，受詞代名詞放在動詞前面", n:"3-3-1"},
      {fr:"j'ai l'impression de changer", note:"avoir l'impression de＋原形＝好像、彷彿，整組背", n:null},
      {fr:"plus largement", note:"陰性形容詞 large＋ment 變副詞，比較就把 plus 放前面", n:"9-3-1"}
    ]
  },

  'une journée typique/AC3 §1 + AC11 §3 + AC2 §3': {
    blocks: [
      {fr:"Je travaille cinq jours par semaine", zh:"我現在一個禮拜看五天診"},
      {fr:"et je vois une quinzaine de patients par jour", zh:"一天大概看十五個病人"},
      {fr:"Dentiste, on est penché toute la journée", zh:"當牙醫，整天都彎腰駝背"},
      {fr:"Alors je vais régulièrement chez le masseur", zh:"所以我會定期去推拿、整骨、按摩"},
      {fr:"et je médite", zh:"我也有接觸正念和冥想"},
      {fr:"Le week-end, c'est le temps de la famille", zh:"週末是家庭時間"}
    ],
    points: [
      {fr:"Dentiste, on est penché", note:"on 這裡＝「我們這一行的人」，不是特定某個人", n:"3-1-3"},
      {fr:"chez le masseur", note:"chez＋人＝去那個人的地方；⛔ 不用 à", n:"8-1-2"},
      {fr:"toute la journée", note:"tout 要跟名詞配合性數：toute la journée＝一整天", n:"1-6-4"}
    ]
  },

  'temps libre/AC5 §2': {
    blocks: [
      {fr:"Quand j'ai du temps libre, je le passe avec ma famille", zh:"如果我空下來的話，我會想陪伴我的家人"},
      {fr:"J'ai hâte de voir ma fille grandir et devenir quelqu'un", zh:"我很期待看到一個嬰兒慢慢有自己的思想、慢慢變強大"},
      {fr:"Et parfois je m'arrête seul", zh:"我也會想給自己一些留白"},
      {fr:"un café, un thé dehors", zh:"去咖啡店坐著、去野外喝茶"},
      {fr:"en regardant le paysage", zh:"看看景色"}
    ],
    points: [
      {fr:"J'ai hâte de voir", note:"avoir hâte de＋原形＝迫不及待想…，整組背", n:null},
      {fr:"je m'arrête", note:"s'arrêter 是代動詞，me 跟著主詞一起換", n:"4-4-1"},
      {fr:"en regardant le paysage", note:"en＋現在分詞＝一邊…一邊…，主詞要跟主句同一個", n:"6-5-1"}
    ]
  },

  'sport/AC11 §1': {
    blocks: [
      {fr:"Je fais du sport deux ou trois fois par semaine", zh:"我一週運動兩三次"},
      {fr:"J'ai commencé par la musculation", zh:"一開始是重訓"},
      {fr:"puis je suis passé au training fonctionnel, au yoga", zh:"後來開始做一些功能性訓練、瑜伽"},
      {fr:"et maintenant je nage", zh:"現在還開始游泳"}
    ],
    points: [
      {fr:"je suis passé", note:"passer 表示移動時用 être，分詞要跟主詞配合", n:"5-2-2"},
      {fr:"au training fonctionnel, au yoga", note:"passer à＋le 縮成 au；每個項目都要各帶一個 au", n:"1-3-4"}
    ]
  },

  'sport/AC11 §2': {
    blocks: [
      {fr:"Depuis l'enfance, je me tiens mal", zh:"我的身體從小就不是很好，可能跟坐姿不良有關"},
      {fr:"Une fois, j'ai eu la cuisse engourdie pendant trois mois", zh:"我曾經有一次大腿麻了三個月"},
      {fr:"c'était un nerf comprimé, à cause de ma position assise", zh:"後來發現是坐姿有問題，導致神經的壓迫"},
      {fr:"Aujourd'hui ça va", zh:"至少現在沒有麻了"},
      {fr:"mais mon dos n'est toujours pas droit", zh:"只是身體的姿勢真的差很多"}
    ],
    points: [
      {fr:"Depuis l'enfance … pendant trois mois", note:"depuis＝到現在還沒結束；pendant＝已經閉合的一段", n:"9-4-1"},
      {fr:"je me tiens mal", note:"se tenir＝保持姿勢，代動詞；tenir 走 venir 那組變位", n:"4-3-4"},
      {fr:"n'est toujours pas droit", note:"ne…toujours pas＝到現在還沒；pas toujours 意思相反", n:null}
    ]
  },

  'voyage/AC7 §2': {
    blocks: [
      {fr:"Mon plus beau souvenir, c'est l'Islande", zh:"我印象最深刻的旅行是冰島"},
      {fr:"Je me souviens d'un moment précis", zh:"我印象最深刻的是一個很具體的瞬間"},
      {fr:"j'étais devant une cascade immense", zh:"瀑布非常壯觀"},
      {fr:"et il n'y avait aucune barrière", zh:"沒有任何圍欄阻礙"},
      {fr:"Rien entre la nature et moi", zh:"能直接跟大自然交流"},
      {fr:"C'était aussi ma première fois au volant", zh:"那也是我第一次自駕"}
    ],
    points: [
      {fr:"j'étais / il n'y avait / C'était", note:"整段是回憶的背景畫面，所以三個動詞都用 imparfait", n:"5-3-3"},
      {fr:"Je me souviens d'un moment", note:"se souvenir 是代動詞，而且一定要接 de 才帶得出受詞", n:"4-4-1"},
      {fr:"il n'y avait aucune barrière", note:"ne…aucun＝一個都沒有，比 pas de 更強，後面接單數", n:null}
    ]
  },

  'projets/AC15 §5': {
    blocks: [
      {fr:"Avant, je pensais qu'être dentiste, c'était toute ma vie", zh:"以前覺得當了牙醫、終老就好"},
      {fr:"Aujourd'hui, avant mes quarante ans, j'apprends une nouvelle langue", zh:"我可以在 40 歲前開始學一個新的語言"},
      {fr:"Rien n'est facile", zh:"一切都不容易"},
      {fr:"mais le jour où je n'aurai plus envie de changer", zh:"當我開始不想改變的時候"},
      {fr:"ce jour-là je serai vieux", zh:"應該就是變老了"}
    ],
    points: [
      {fr:"je pensais que … c'était", note:"主句退到過去，從句也要跟著退成 imparfait", n:"5-8-1"},
      {fr:"Rien n'est facile", note:"rien 當主詞放句首，動詞前面仍然要留一個 ne", n:"7-2-2"},
      {fr:"le jour où je n'aurai plus envie", note:"où 也管時間；「那一天」之後法文一定用未來式", n:"3-5-3"}
    ]
  },

  'Canada/AC8 §1+§2': {
    blocks: [
      {fr:"Je veux partir au Canada avec ma famille", zh:"我想跟家人一起去加拿大"},
      {fr:"D'abord, l'éducation", zh:"第一個優點是教育環境"},
      {fr:"à Taïwan, les enfants apprennent tout par cœur", zh:"台灣比較填鴨，小孩什麼都用背的"},
      {fr:"Au Canada, l'école est plus ouverte", zh:"加拿大比較開放、注重自我探索"}
    ],
    points: [
      {fr:"au Canada / à Taïwan", note:"陽性國家用 au；Taïwan 當島名走城市規則，用 à", n:"8-1-1"},
      {fr:"apprennent tout par cœur", note:"tout 當受詞放動詞後面；par cœur＝用背的，固定詞組", n:"3-6-1"}
    ]
  },

  'études/Owen 2026-09-04 口述': {
    blocks: [
      {fr:"J'ai étudié six ans à l'université médicale de Taipei", zh:"我在臺北醫學大學 TMU 讀六年"},
      {fr:"En première et en deuxième année, les livres étaient très épais", zh:"大一大二看到原文書很厚"},
      {fr:"et je ne savais pas par où commencer", zh:"不知從何讀起"},
      {fr:"C'est seulement après mes études que j'ai compris comment j'apprends le mieux", zh:"一直到畢業之後才慢慢體會到自己適合的學習方法"},
      {fr:"d'abord voir les grandes lignes, puis comprendre l'ensemble", zh:"提綱挈領、全面式的理解"}
    ],
    points: [
      {fr:"C'est seulement après mes études que", note:"c'est…que 把時間點打上聚光燈＝「一直到…才」", n:"7-4-1"},
      {fr:"les livres étaient / je ne savais pas", note:"當年的狀態用 imparfait；j'ai compris 是事件才用 PC", n:"5-3-3"},
      {fr:"comment j'apprends le mieux", note:"le mieux 是 bien 的最高級，⛔ 不是 le meilleur", n:"9-5-2"}
    ]
  },

  'Canada/AC7 §1': {
    blocks: [
      {fr:"Non, je ne suis jamais allé au Canada", zh:"我還沒去過加拿大"},
      {fr:"Si j'y vais un jour, je commencerai par Vancouver", zh:"我想優先去溫哥華"},
      {fr:"tout le monde parle de son climat", zh:"大家都說那裡氣候宜人"},
      {fr:"je veux le sentir moi-même", zh:"我想自己去體驗一下那是什麼感覺"},
      {fr:"et ensuite les parcs nationaux", zh:"然後再去國家公園"}
    ],
    points: [
      {fr:"je ne suis jamais allé", note:"jamais 卡在助動詞和分詞中間：ne suis jamais allé", n:"7-2-2"},
      {fr:"Si j'y vais", note:"y 頂替地點 au Canada；si 後面用現在式不用未來式", n:"3-4-1"},
      {fr:"moi-même", note:"重讀代名詞＋même＝親自，⛔ 不能說 je-même", n:"3-2-1"}
    ]
  },

  'Canada/AC8 §3+§4': {
    blocks: [
      {fr:"Ensuite, le climat", zh:"再來是氣候比較宜人"},
      {fr:"Taïwan est de plus en plus chaud", zh:"在未來地球暖化的狀況下，臺灣會越來越熱"},
      {fr:"et avec le réchauffement climatique, ce sera pire", zh:"幾十年後只會更糟"},
      {fr:"Il y a aussi les avantages sociaux", zh:"還有福利很好"},
      {fr:"de bonnes politiques publiques, un bon système scolaire", zh:"有各種很不錯的政策、教育環境"},
      {fr:"et des prix de l'immobilier plus raisonnables qu'ici", zh:"還有相對合理的房價"}
    ],
    points: [
      {fr:"ce sera pire", note:"mauvais 的比較級是 pire，⛔ 不說 plus mauvais", n:"2-3-2"},
      {fr:"de bonnes politiques publiques", note:"形容詞跑到名詞前面時，des 塌成裸 de", n:"1-3-5"},
      {fr:"de plus en plus chaud", note:"de plus en plus＋形容詞＝越來越…，整組固定不拆", n:null}
    ]
  },

  'voyage/AC7 §4': {
    blocks: [
      {fr:"Depuis la naissance de ma fille, on voyage autrement", zh:"我女兒出生之後，行程跟以前完全不同"},
      {fr:"On est allés à Hokkaido", zh:"一歲之後帶她去日本北海道"},
      {fr:"elle dîne à cinq heures et elle dort tôt", zh:"她五點多就得吃晚餐，很早睡"},
      {fr:"Fini les magasins à dix heures du soir", zh:"以前逛街逛到 10 點那種行程完全不會有"},
      {fr:"Est-ce qu'elle s'en souviendra ? Non", zh:"你說她會不會記得？我認為不會"},
      {fr:"Mais je crois que tout ça reste dans son corps", zh:"但我覺得這些體驗都刻在身體裡面"}
    ],
    points: [
      {fr:"On est allés", note:"aller 用 être；on 指「我們」時分詞可以配合成複數 allés", n:"5-2-2"},
      {fr:"elle s'en souviendra", note:"se souvenir de → 那件事縮成 en，站在動詞前面", n:"3-4-4"},
      {fr:"Fini les magasins", note:"Fini＋名詞＝「…到此為止」，口語的省略句", n:null}
    ]
  },

  'lecture/AC5 §1': {
    blocks: [
      {fr:"En ce moment, je lis surtout en français", zh:"我最近都在讀法文為主"},
      {fr:"Avant, je lisais beaucoup sur le temps, sur le sens de la vie, sur le bouddhisme", zh:"我之前最喜歡看關於時間、生命意義、佛法的書"},
      {fr:"et je méditais souvent", zh:"冥想我之前練很多"},
      {fr:"Mais à force de lire, on reste dans les idées", zh:"但這東西看太多，反而會落在知識的框架中"},
      {fr:"et on n'est plus vraiment là", zh:"沒有真的在當下、在心上"}
    ],
    points: [
      {fr:"je lisais / je méditais", note:"過去的習慣用 imparfait：那時常常做，不說做了幾次", n:"5-3-1"},
      {fr:"à force de lire", note:"à force de＋原形＝因為一直做…，久了就變成…", n:null},
      {fr:"on n'est plus vraiment là", note:"ne…plus＝不再；plus 在這裡不發尾音 s", n:"7-2-2"}
    ]
  },

  'temps libre/AC5 §4': {
    blocks: [
      {fr:"Ce que je trouve amusant en ce moment ? Le français, justement", zh:"最近覺得什麼好玩？就是學法文"},
      {fr:"Apprendre une langue en un an, ça m'oblige à inventer d'autres méthodes", zh:"要在一年內學會一個語言，我必須堆疊出新的技巧"},
      {fr:"Et regarder du sport", zh:"還有看球賽"},
      {fr:"voir quelqu'un utiliser une règle pour prendre le contrôle du jeu", zh:"看到有人利用規則去創造對球賽的掌握"},
      {fr:"ça me plaît beaucoup", zh:"這些都很有趣"}
    ],
    points: [
      {fr:"Ce que je trouve amusant", note:"ce que＝「…的那件事」，que 後面缺的是受詞", n:"3-5-2"},
      {fr:"ça m'oblige à inventer", note:"obliger 要 à 當橋才接原形；me 提到動詞前面", n:"8-3-3"},
      {fr:"ça me plaît beaucoup", note:"plaire à＝討某人喜歡，人用 me/te/lui 這一排", n:"3-3-2"}
    ]
  }

};

if (typeof module !== 'undefined' && module.exports) { module.exports = { T1_GLOSS }; }
