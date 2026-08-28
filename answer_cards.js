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
    versions:[
      { level:'A1', d:'2026-07-16',
        fr:"Je suis dentiste. J'aide les gens. Avant le traitement, les patients ont mal aux dents et ils sont inquiets, mais après, ils ont de belles dents et ils sont contents. Je suis content pour eux. J'aime mon travail.",
        zh:'我是牙醫師。我幫助人。治療前，病人牙齒痛而且擔心，但治療後，他們有漂亮的牙齒而且開心。我為他們感到開心。我喜歡我的工作。' }
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
