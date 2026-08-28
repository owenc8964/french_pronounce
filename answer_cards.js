/* ============================================================
   answer_cards.js — TEF Canada 高頻話題 Answer Card（答案卡）
   ------------------------------------------------------------
   設計依據（2026-07-16 與 Owen 確立）：不是背一段別人寫的範文，
   是 Owen 自己的真實故事，練到「看到問題→法文自然浮現」的
   自動化程度。每張卡的 fr/zh 都是 Owen 親口回答後、Claude 修成
   正確道地的版本（fr 只用他目前學過的文法：現在式為主，
   少量 passé composé／futur proche／qui 關係代名詞）。

   版本成長：每張卡 versions 陣列只放一個目前生效版本（v1=A1），
   之後隨 Owen 程度推進會 push 新版本（A2→B1→B2），舊版本保留
   在陣列前面當歷史紀錄，練習永遠只考最後一版（acActiveVersion）。
   何時該長出下一版＝由 SRS 數據自動判斷（見 answer_card.html
   的 isGraduated／clb7_ac_upgrade_ready），不是日期到了就升級。

   欄位：id / topic（對應主題slug，之後可跟 questions.js 的
   topic 系統對齊）/ title / q_fr／q_zh（TEF風格提問）/
   versions:[{level, d(建立日期), fr, zh}]
   ============================================================ */

const ANSWER_CARDS = [
  { id:'AC1', topic:'intro', title:'自我介紹',
    q_fr:"Présentez-vous : comment vous vous appelez, quel âge vous avez, d'où vous venez, et ce que vous faites dans la vie.",
    q_zh:'自我介紹一下：你叫什麼名字、幾歲、來自哪裡、你是做什麼的。',
    versions:[
      { level:'A1', d:'2026-07-16',
        fr:"Je m'appelle Owen. J'ai 36 ans. Je suis taïwanais. J'habite à Xinbei. Je suis dentiste.",
        zh:'我叫Owen。我36歲。我是台灣人。我住新北市。我是牙醫師。' }
    ] },

  { id:'AC2', topic:'family', title:'家庭',
    q_fr:'Parlez-moi de votre famille : qui sont les membres, ce qu\'ils font, comment ils sont.',
    q_zh:'跟我說說你的家庭：有哪些人、做什麼、個性怎樣。',
    versions:[
      { level:'A1', d:'2026-07-16',
        fr:"Dans ma famille, il y a mon père, ma mère, ma sœur, ma femme et ma fille. Mes parents sont professeurs de taïwanais. Ma sœur est ingénieure à Hsinchu. Je suis marié. Ma femme s'appelle Lauryn et ma fille s'appelle Jolie. Ma vie, c'est ma famille.",
        zh:'我家有爸爸、媽媽、姊姊、太太、女兒。我爸媽是台語老師。我姊姊在新竹當工程師。我已婚。我太太叫Lauryn，我女兒叫Jolie。我的生活重心是我的家人。' }
    ] },

  { id:'AC3', topic:'work', title:'工作',
    q_fr:"Que faites-vous dans la vie ? Pourquoi avez-vous choisi ce métier ?",
    q_zh:'你的工作是什麼？為什麼選這份工作？',
    // ⭐ 2026-08-28 Owen 的中文口述全文（逐字保留，⛔ 不要精簡）。
    // 用途有二：①這座島升級 B1/B2 時的素材庫——法文版刻意砍掉的東西都在這裡
    //          ②Owen 自己的話就是這張卡的真相來源（見 memory feedback_personal_content_authenticity）
    // ⚠️ v2 法文版刻意沒收進去的段落（＝之後升級的第一批材料）：
    //    ・治療項目清單（假牙／拔智齒／補牙／洗牙／檢查／牙周維護／植牙／美白貼片）
    //    ・「治療對病人沒幫助我會拒絕，即使病人願意」← 25課 si 句的好素材
    //    ・「把事情分段、隨時嘉許、給彼此機會」← 他的核心工作哲學，讓步段的材料
    //    ・「與其這樣，不如一開始就先想好」← B2 讓步／權衡段的材料
    source_zh:"【為什麼當牙醫】我覺得這就是我想去加拿大的一個原因。我覺得小朋友應該要好好探索自己的理想。我是很幸運地照著讀書，然後盡量考高分去選到這個職業的。等到唸完、真的實際上做的時候，發現這個東西其實對人真的有幫助。但我當初不是因為真的很想幫助人而選擇這個職業，而是看這個職業有前景、有未來，分數到哪裡就決定去選哪裡。\n我覺得這個過程會有一些風險，就是我對這件事可能沒有熱情。我在很多同學身上看到這件事，甚至我的同學他念完牙醫之後直接轉行當攝影師，現在在紐約做得不錯，幫很多名人、雜誌跟明星做拍攝。但也就是走了牙醫這一遭之後，有可能對這件事有不同的認知，或對人生的志向有些不同的想法。與其這樣，不如一開始就先把這件事想好、探索好。\n\n【我的一天】我現在一個禮拜看五天診，一天大概看 8 到 12 小時的門診。這樣排班下來，一天看的病人量大約從 10 個到 20 個都有可能。最常做的治療可能就是假牙、拔智齒、補牙、洗牙、幫病人做檢查、牙周病的維護，還有植牙、美學等等（像是美白、貼片）。我覺得這個工作從頭到尾都在幫助人。如果做的事情對病人來說沒有什麼太大的幫助，其實我很有可能會拒絕病人，即便病人願意配合。\n\n【那個病人】印象最深刻的例子其實有很多。有一個病人很年輕，二十幾歲，滿嘴是牙結石，牙齒很暴。他對於自己的外形其實很沒有自信，很想處理牙齒但又不敢。\n那一次他第一次來的時候，我跟他說：「你隨時都可以停，只要你說你受不了了。我的目標是讓你可以願意接受這個治療，而不是趕快把事情做完卻把你嚇走。」\n他在這樣的過程中，先經歷了洗牙，然後也把矯正完成了。他後來因為這次的經驗，慢慢接受治療，真的可以把洗牙和矯正這件事給完成。雖然他還是很擔心、很憂慮，但至少不再那麼害怕，能夠勇敢地把這件事做完。\n我覺得這才是真正讓病人變好的關鍵。除了我們口頭上知道說「我應該要做洗牙」、「我應該要勇敢接受治療」，但更多時候，是我們在跟病人的這個過程中都有努力退讓，把事情分段、勇敢做完，然後隨時嘉許、隨時給彼此機會，願意讓彼此繼續往下一步前進。這個過程我覺得是很重要的。願意洗牙、願意做矯正這件事，對他的外觀有很大的影響，也讓他的人生變得不一樣。\n\n【到加拿大之後】如果要過去的話，我必須要重新考當地的牙醫執照。我也有去研究需要準備哪些事情，甚至去設計、規劃考試流程。我打算先把語言考試準備好，通過之後就會開始著手準備考試。雖然過程中很艱辛，也需要很有紀律地完成，但為了讓這件事情可以持續下去，不管在臺灣或在加拿大都能做好，我會把這件事情盡全力完成。",
    versions:[
      { level:'A1', d:'2026-07-16',
        fr:"Je suis dentiste. J'aide les gens. Avant le traitement, les patients ont mal aux dents et ils sont inquiets, mais après, ils ont de belles dents et ils sont contents. Je suis content pour eux. J'aime mon travail.",
        zh:'我是牙醫師。我幫助人。治療前，病人牙齒痛而且擔心，但治療後，他們有漂亮的牙齒而且開心。我為他們感到開心。我喜歡我的工作。' },
      // ── 2026-08-28 v2：語言島第二座。40 秒 → 174 字 / 約 80 秒（島的規格 60–120 秒）。
      // ⚠️ 初稿寫到 280 字被 Owen 退掉：「280字聽起來真的很長」「要抓重點，簡明扼要，
      //    情緒單字文法都到位，不饒口且加分」。→ 砍掉一半，只留四個「加分」的點：
      //    ①分數決定的、不是熱情（誠實，考官記得住）②同學轉行去紐約當攝影師（別人沒有的細節）
      //    ③「你隨時都可以停」那句（情緒）④加拿大要重考執照（考官必問，直接補掉 AC8 的 gap）
      // ⭐ ②段結尾接回 AC8 的教育論點「小孩該早點探索理想」＝島與島之間的橋。
      // 用上的結構：ce sont les notes qui décident／c'est aussi pour ça que／Ce que j'aime…, c'est
      //   （26課 c'est…qui/que 強調句）、si je veux exercer, je devrai（25課 si）、
      //   devrai／sera／ferai（27課 futur simple）、y arriver（21課 y）、avait（imparfait）
      // ⚠️ 末段是 Si + présent → futur simple。25課筆記把 si 句的 A2 範圍框在「現在式＋現在式／命令式」，
      //    註明「結果那半用未來式是 B1 的第一式」。si 那半仍是現在式（合規），結果用 futur 是標準法文的
      //    第一條件式，而 futur simple 正是 27 課剛學的——刻意往上一步，不是筆誤。
      // ⚠️ 「我的目標是讓你願意接受治療」原句要 subjonctif（je veux que vous acceptiez，B1），
      //    這版寫成 c'est de vous donner envie de continuer（不定式），語意微調成「讓你想繼續」。
      //    → 這句就是升級 B2 時換回 subjonctif 的位置（見 STRATEGY 原則 6）。
      { level:'A2', d:'2026-08-28',
        fr:"Je suis dentiste. Je travaille cinq jours par semaine et je vois une quinzaine de patients par jour.\n\nMais honnêtement, je n'ai pas choisi ce métier par passion : à Taïwan, ce sont les notes qui décident. La passion est venue après, quand j'ai commencé à travailler. J'ai même un camarade qui a fait les mêmes études et qui est devenu photographe à New York. Alors je pense que les enfants doivent explorer leurs rêves plus tôt — et c'est aussi pour ça que je veux partir au Canada.\n\nCe que j'aime dans mon métier, c'est donner confiance. Un jour, un jeune patient avait trop peur pour se soigner. Je lui ai dit : « Vous pouvez arrêter quand vous voulez. Le plus important, ce n'est pas de finir vite, c'est de vous donner envie de continuer. » Il a terminé son traitement. Aujourd'hui, son sourire a changé, et sa vie aussi.\n\nEt au Canada, si je veux exercer, je devrai repasser les examens. Ce sera long, mais je ferai tout pour y arriver.",
        zh:'我是牙醫。我一週看五天診，一天大概看十五個病人。\n\n但老實說，我不是因為熱情才選這一行：在台灣，是分數在決定。熱情是後來、真的開始工作以後才出現的。我甚至有一個同學，跟我念一樣的書，後來去紐約當了攝影師。所以我覺得小孩應該早一點探索自己的理想——這也是我想去加拿大的原因。\n\n我喜歡這份工作的地方，是給人信心。有一次，一個年輕病人怕到不敢治療。我跟他說：「你隨時都可以停。最重要的不是趕快做完，是讓你想繼續。」他把療程做完了。今天他的笑容不一樣了，他的人生也是。\n\n那到加拿大呢？如果我想執業，我就必須重考。過程會很久，但我會盡全力做到。' }
    ],
    // 2026-08-28 預測追問。cover：'ok'＝島接得住｜'part'＝要轉一下｜'gap'＝沒材料
    // ⭐ gap／part 這幾題就是 B2 升級層的施工圖（讓步段＋假設段），見 STRATEGY 原則 6
    follow_ups:[
      { fr:"Vous êtes dentiste : vous pourrez travailler au Canada ?", zh:'你是牙醫，你能在加拿大執業嗎？', cover:'ok', from:null },
      { fr:"Vos patients ont souvent peur du dentiste ?", zh:'你的病人常常怕看牙醫嗎？', cover:'ok', from:null },
      { fr:"Qu'est-ce que vous faites exactement dans une journée ?", zh:'你一天實際上都在做什麼？', cover:'part', from:null },
      { fr:"Vous travaillez dans un cabinet privé ou à l'hôpital ?", zh:'你在私人診所還是醫院工作？', cover:'gap', from:null },
      { fr:"Qu'est-ce que vous aimez le moins dans votre travail ?", zh:'你最不喜歡工作的哪個部分？', cover:'gap', from:null },
      { fr:"Combien de temps il faut pour avoir la licence canadienne ?", zh:'拿到加拿大執照要多久？', cover:'part', from:null },
      { fr:"Si vous ne réussissez pas l'examen canadien, qu'est-ce que vous ferez ?", zh:'如果你沒考過加拿大的考試，你會怎麼做？', cover:'gap', from:'AC15 未來計畫' },
      { fr:"Vous n'avez jamais pensé à changer de métier, comme votre camarade ?", zh:'你沒想過像你同學那樣轉行嗎？', cover:'part', from:null },
      { fr:"Vous conseilleriez ce métier à votre fille ?", zh:'你會建議你女兒做這一行嗎？', cover:'part', from:'AC2 家庭' },
      { fr:"Le stress au travail, comment vous le gérez ?", zh:'工作的壓力你怎麼處理？', cover:'gap', from:'AC11 健康' }
    ] },

  { id:'AC4', topic:'education', title:'教育／學歷',
    q_fr:"Qu'est-ce que vous avez étudié ? Quel est votre souvenir le plus marquant ?",
    q_zh:'你讀什麼學校/科系？印象最深的是什麼？',
    versions:[
      { level:'A1', d:'2026-07-16',
        fr:"J'ai étudié à TMU, en médecine dentaire. Avant l'université, j'ai beaucoup étudié pour l'examen. Encore aujourd'hui, je rêve de cet examen ! À l'université, j'ai rencontré beaucoup d'amis.",
        zh:'我在TMU讀牙醫系。上大學之前，我為了考試唸了很多書。到現在我還會夢到那個考試！在大學，我認識了很多朋友。' }
    ] },

  { id:'AC5', topic:'hobby', title:'興趣嗜好',
    q_fr:"Qu'est-ce que vous aimez faire pendant votre temps libre ? Pourquoi ?",
    q_zh:'你平常喜歡做什麼？多久做一次、為什麼喜歡？',
    versions:[
      { level:'A1', d:'2026-07-16',
        fr:"J'aime faire du yoga et de la méditation. Je fais ça une ou deux fois par semaine, pendant une heure. Ça m'aide à prendre soin de mon corps et de mon esprit. J'aime aussi bien organiser ma vie.",
        zh:'我喜歡做瑜伽跟冥想（頌缽）。我一週做一到兩次，每次一小時。這讓我照顧好我的身心。我也喜歡把生活安排得有條理。' }
    ] },

  { id:'AC6', topic:'food', title:'飲食',
    q_fr:"Qu'est-ce que vous aimez manger ? Où mangez-vous d'habitude ?",
    q_zh:'你喜歡吃什麼？不喜歡吃什麼？平常在哪裡吃飯？',
    versions:[
      { level:'A1', d:'2026-07-16',
        fr:"J'aime le riz, la viande et les légumes. Je n'aime pas beaucoup la pizza et les pâtes. Maintenant, je mange souvent à la maison. Récemment, je mange le déjeuner de ma voisine — c'est bon, sain et pas cher. Parfois, ma femme cuisine pour nous.",
        zh:'我喜歡飯、肉、菜。我不太喜歡披薩跟義大利麵。現在我常在家吃飯。最近我吃鄰居做的便當——好吃、健康又便宜。有時候我太太會煮飯給我們吃。' }
    ] },

  { id:'AC7', topic:'travel', title:'旅行',
    q_fr:"Quel est le voyage le plus mémorable pour vous ? Avec qui ? Qu'est-ce que vous avez fait ?",
    q_zh:'你去過哪裡印象最深？跟誰去、做了什麼？',
    versions:[
      { level:'A1', d:'2026-07-16',
        fr:"Le voyage le plus mémorable, c'est l'Islande et la Grotte Bleue en Italie. La nature est incroyable — je me sens tout petit. En Islande, j'ai voyagé avec un groupe d'amis plus jeunes. Il n'y a pas beaucoup de restaurants, alors on a mangé dans la voiture. Pour la Grotte Bleue, la mer était très agitée. J'ai attendu longtemps sur le bateau. À l'intérieur, c'était incroyable !",
        zh:'印象最深的旅行是冰島跟義大利的藍洞。大自然太不可思議了——我覺得自己很渺小。冰島是跟一群學弟妹一起去的。餐廳很少，所以我們在車上吃飯。藍洞那次，海浪很大。我在船上等了很久。裡面真的太神奇了！' }
    ] },

  { id:'AC8', topic:'canada', title:'加拿大／移民動機',
    q_fr:"Pourquoi voulez-vous aller au Canada ? Pourquoi ce pays ?",
    q_zh:'你為什麼想去加拿大？為什麼選這個國家？',
    versions:[
      { level:'A1', d:'2026-07-16',
        fr:"Je veux aller au Canada parce que Taïwan, c'est très stressant. Il y a beaucoup de pression. Le Canada a une belle nature. L'éducation est différente — les enfants pensent par eux-mêmes. Je veux ça pour ma fille. Le travail de dentiste au Canada, c'est bien aussi, je pense.",
        zh:'我想去加拿大，因為台灣壓力很大。有很多壓力。加拿大自然很美。教育方式不一樣——孩子可以自己思考。我希望我女兒有這個機會。加拿大的牙醫工作我覺得應該也不錯。' },
      // 2026-08-27 v2：Owen 重新口述的四理由版（語言島第一座）。
      // 17 秒 → 約 70 秒。刻意用上他剛學的：futur simple（第27課）、se poser une question（第27課）、
      // toutes ces raisons（第26課 tout）、pire（第25課比較級不規則）、de bonnes（形容詞前置 des→de）。
      // 2026-08-27 補上兩個具體場景（Owen 口述）：同事小孩幼稚園就補習／看到兩岸與烏俄新聞。
      // 場景用的結構也是剛學的：Chaque fois que（26課 chaque＋單數）、
      // C'est ... que 強調句（26課 c'est nous qui）、à ces moments-là（27課 à ce moment-là）。
      { level:'A2', d:'2026-08-27',
        fr:"Je veux partir au Canada avec ma famille. Il y a quatre raisons.\n\nD'abord, l'éducation. À Taïwan, les enfants apprennent tout par cœur : c'est un système très fermé. Je vois souvent les enfants de mes collègues : ils prennent déjà des cours supplémentaires à la maternelle, pour entrer dans une école privée, et plus tard pour avoir un bon dossier à l'université. Je trouve que cette pression est trop forte. Au Canada, l'école est plus ouverte. On encourage les enfants à se poser des questions et à trouver leur propre chemin. C'est pour ça que je veux offrir un autre environnement à ma fille.\n\nEnsuite, le climat. Taïwan est de plus en plus chaud, et avec le réchauffement climatique, ce sera pire. Dans trente ans, des villes comme Vancouver seront probablement plus agréables à vivre.\n\nIl y a aussi les avantages sociaux : de bonnes politiques publiques, un bon système scolaire, et des prix de l'immobilier plus raisonnables qu'ici.\n\nEnfin, la stabilité. Aujourd'hui, il y a beaucoup de tensions politiques et militaires dans le monde. Chaque fois que je vois les nouvelles — les tensions entre la Chine et Taïwan, ou la guerre en Ukraine — j'ai encore plus envie d'une société calme et stable. C'est vraiment à ces moments-là que j'ai envie de partir au Canada.\n\nPour toutes ces raisons, le Canada est pour moi un choix idéal.",
        zh:'我想跟家人一起去加拿大。有四個理由。\n\n首先是教育。在台灣，小孩什麼都用背的，那是一個很封閉的系統。我常看到同事的小孩，幼稚園就已經在補習了，為了考進私立學校，之後為了大學有好的資歷。我覺得這種壓力太大了。在加拿大，學校比較開放，會鼓勵小孩自己提問、找自己的路。所以我想給我女兒另一種環境。\n\n再來是氣候。台灣越來越熱，加上暖化，之後只會更糟。三十年後，像溫哥華這樣的城市大概會比較適合居住。\n\n還有社會福利：不錯的公共政策、好的教育體系，還有比這裡合理的房價。\n\n最後是安定。現在世界上有很多政治和軍事的緊張。每次我看到新聞——兩岸的緊張、或是烏克蘭的戰爭——我就更嚮往一個平靜穩定的社會。就是在那些時候，我特別想去加拿大。\n\n基於這些理由，加拿大對我來說是一個理想的選擇。' }
    ],
    // ⭐ 2026-08-27 Owen：「考官可能會有興趣的問題，感覺也是個很好的延伸方向？」——對。
    // 這批是預測的追問，用途有兩個：①階段6「反駁對抗」的題目來源 ②檢查這座島的覆蓋率。
    // cover 欄位：'ok'＝現在的島接得住｜'part'＝接得住但要轉一下｜'gap'＝沒材料，要補
    // from 欄位：可以從哪一張既有的 answer card 調材料過來（⭐ 島與島之間的橋）
    follow_ups:[
      { fr:"Vous êtes déjà allé au Canada ?", zh:'你去過加拿大嗎？', cover:'gap', from:'AC7 旅行' },
      { fr:"Pourquoi Vancouver plutôt que Montréal ou Toronto ?", zh:'為什麼是溫哥華，不是蒙特婁或多倫多？', cover:'part', from:null },
      { fr:"Votre fille a quel âge ? Elle apprend le français aussi ?", zh:'你女兒幾歲？她也在學法文嗎？', cover:'gap', from:'AC2 家庭' },
      { fr:"Et votre femme, qu'est-ce qu'elle en pense ?", zh:'那你太太怎麼想？', cover:'gap', from:'AC2 家庭' },
      { fr:"Vous êtes dentiste : vous pourrez travailler au Canada ?", zh:'你是牙醫，你能在加拿大執業嗎？', cover:'part', from:'AC3 工作' },  // 08-28 AC3 v2 末段補上了：gap→part
      { fr:"Mais au Canada, il fait très froid, non ?", zh:'可是加拿大很冷吧？', cover:'part', from:null },
      { fr:"Taïwan aussi a de bonnes écoles, non ?", zh:'台灣也有好學校啊，不是嗎？', cover:'ok', from:null },
      { fr:"Qu'est-ce qui vous manquera le plus de Taïwan ?", zh:'你最會想念台灣的什麼？', cover:'gap', from:null },
      { fr:"L'immigration, c'est long et difficile. Vous êtes prêt ?", zh:'移民很久又很難，你準備好了嗎？', cover:'gap', from:null },
      { fr:"Si vous ne pouvez pas partir, qu'est-ce que vous ferez ?", zh:'如果你走不成，你會怎麼做？', cover:'gap', from:null }
    ] },

  { id:'AC9', topic:'home', title:'住家',
    q_fr:"Décrivez votre logement. Vous aimez votre maison ? Pourquoi ?",
    q_zh:'你現在住哪種房子？有幾個房間？你喜歡自己的家嗎、為什麼？',
    versions:[
      { level:'A1', d:'2026-07-16',
        fr:"J'habite dans un appartement. Il y a trois chambres. Une chambre, c'est pour ma fille, mais elle dort avec nous. J'aime ma maison — c'est grand et les voisins sont sympas.",
        zh:'我住公寓大樓。有三個房間。一間是女兒的房間，但她跟我們一起睡。我喜歡我的家——很寬敞，鄰居也很好。' }
    ] },

  { id:'AC10', topic:'shopping', title:'購物',
    q_fr:"Vous faites les courses souvent ? Où ? Qu'est-ce que vous avez acheté récemment ?",
    q_zh:'你多久買一次東西？喜歡在哪裡買（網路/實體）？最近買了什麼？',
    versions:[
      { level:'A1', d:'2026-07-16',
        fr:"J'achète souvent sur Coupang. Récemment, j'ai acheté une bouteille d'eau pour ma fille et des produits de nettoyage. Je ne fais pas souvent les magasins. D'abord, je regarde, et après je compare les prix sur mon téléphone.",
        zh:'我常在Coupang買東西。最近我買了女兒的水壺跟清潔用品。我不常去實體店買。我會先看，然後用手機比價。' }
    ] },

  { id:'AC11', topic:'health', title:'健康',
    q_fr:"Comment restez-vous en bonne santé ? Vous faites du sport ?",
    q_zh:'你平常怎麼保持健康？有沒有運動習慣？',
    versions:[
      { level:'A1', d:'2026-07-16',
        fr:"Je fais du yoga et de la méditation une ou deux fois par semaine. Je mange sain. J'ai un coach sportif une fois par semaine, et je nage une ou deux fois par semaine.",
        zh:'我一週做一到兩次瑜伽跟冥想。我吃得健康。我一週有一次健身教練課，也游泳一到兩次。' }
    ] },

  { id:'AC12', topic:'tech', title:'科技',
    q_fr:"Quels outils technologiques utilisez-vous chaque jour ? Comment ils vous aident ?",
    q_zh:'你每天用哪些科技產品/App？它們怎麼幫到你？',
    versions:[
      { level:'A1', d:'2026-07-16',
        fr:"J'utilise mon iPad, mon iPhone et mon MacBook. J'utilise aussi une application d'IA (Claude) pour organiser ma vie. J'utilise Insight Timer pour ma méditation.",
        zh:'我用iPad、iPhone跟MacBook。我也用AI應用程式（Claude）來組織生活。我用Insight Timer記錄我的冥想。' }
    ] },

  { id:'AC13', topic:'environment', title:'環保',
    q_fr:"Est-ce que vous faites des gestes pour l'environnement ? Qu'est-ce que vous pensez de l'écologie ?",
    q_zh:'你平常有沒有做什麼環保的事？你怎麼看環保議題？',
    versions:[
      { level:'A1', d:'2026-07-16',
        fr:"J'apporte ma propre boîte pour le déjeuner. Je réutilise les sacs en plastique. J'apporte ma tasse pour le café. Il y a seulement une Terre. Je pense que c'est important de ne pas utiliser trop de produits jetables.",
        zh:'我自備餐盒裝午餐。我重複利用塑膠袋。我帶自己的杯子裝咖啡。地球只有一個。我認為不要用太多一次性產品很重要。' }
    ] },

  { id:'AC14', topic:'social', title:'社交／朋友',
    q_fr:"Comment rencontrez-vous vos amis ? Vous vous voyez souvent ? Qu'est-ce que vous faites ensemble ?",
    q_zh:'你怎麼認識朋友？多久跟朋友聚一次、都做什麼？',
    versions:[
      { level:'A1', d:'2026-07-16',
        fr:"Mes amis, ce sont mes camarades d'université, les amies de ma femme, et mes camarades de classe. Maintenant, avec le bébé, on sort avec des amis qui ont un bébé du même âge. On se voit une fois toutes les une ou deux semaines.",
        zh:'我的朋友是大學同學、太太的朋友、還有上課的同伴。現在有寶寶了，我們會找寶寶年紀相仿的以前朋友一起出去玩。大概一到兩週見一次面。' }
    ] },

  { id:'AC15', topic:'future', title:'未來計畫',
    q_fr:"Quels sont vos projets pour les 1 à 3 prochaines années ? Pourquoi ?",
    q_zh:'你未來（1-3年）有什麼計畫？為什麼想做這件事？',
    versions:[
      { level:'A1', d:'2026-07-16',
        fr:"Dans le futur, je vais voyager avec ma fille dans des pays que je ne connais pas. Avant l'école, je veux montrer le monde à ma fille. J'espère que ça va l'inspirer.",
        zh:'未來，我要帶女兒去我自己也沒去過的國家旅行。趁上學之前，我想讓女兒看看世界。我希望這可以啟發她。' }
    ] },
];

function acActiveVersion(card) { return card.versions[card.versions.length - 1]; }
