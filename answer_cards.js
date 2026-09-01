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
    // ⭐ 2026-08-28 Owen 的中文口述全文（逐字保留，⛔ 不要精簡）。慣例同 AC2／AC3。
    // ⚠️ v2 刻意沒收進去的（＝之後升級 B1/B2 的材料）：
    //    ・「對事情有自己獨到的切入角度、解方與價值觀」← 抽象化，B2 的料
    //    ・板橋「棟距大／生活機能／有人專門維護」的細節（中版可加回）
    //    ・「法文富有感情」「從遠到近」「更細膩的美感」← 這段最美但最抽象，A2 只保住了
    //      「換一種眼光／模糊時看見更大的世界」；B2 版要把整段還原
    //    ・「幫小朋友準備上學用品、生活環境與遊樂空間」（細節，→ AC2 也可用）
    //    ・結尾「陪伴家庭、思索人生、照顧身體」三段式總結 ← B1 版收尾可用
    source_zh:"【我是什麼樣的人】如果要跟第一次見面的人形容我自己，我覺得我是個分析型的人。我對事情有自己獨到的切入角度、解方與價值觀，會把不同的事情整理出來做連結，也會把同一件事情分門別類、用不同視角去看。有時候我相對比較理性，但我不覺得自己是個工程仔，還沒到那個程度；個性上相對比較木訥，喜歡思考與閱讀。\n\n【住哪裡】我住在新北板橋的特區，離百貨很近。這個地方棟距比較大，相對來說生活機能不算太好，不像其他棟距小的地方有很多商店或小吃，這邊小吃的選擇比較少、物價也相對高一些。但好處是整體很空曠，而且離車站與各種大眾運輸都很近，所以我滿喜歡這裡的。我家住的是大樓，住戶都很友善，環境也非常整潔、有人專門維護。\n\n【為什麼學法文／怎麼學】我今年 5 月開始學法文，除了找家教，也用 Duolingo 和 AI 協助提升法文能力。我聽很多 Podcast、看很多法文電影，讓自己對法文有更多的認知與敏銳度，並且不斷調整學習方法。我覺得學習一門新事物，不單只是花時間，讓自己浸泡在環境中並用對方法才是最重要的。學到現在，我覺得法文非常特別且富有感情；說法文時彷彿會切換視角，從遠到近、聚焦時而模糊時而清楚。模糊的時候能看見更完整的世界觀，相對也有更多細膩的美感。\n\n【沒看診的時候】沒在看診的時候，我通常會花很多時間照顧自己的身體，例如運動，或是留點時間思索人生。現在有了小孩，我也花很多時間整理家裡，幫小朋友準備上學用品、生活環境與遊樂空間，讓他能更快樂地成長。\n陪伴家庭、思索人生、照顧身體與自己，大概就能完整描繪出我目前的生活模式與樣態。",
    versions:[
      { level:'A1', d:'2026-07-16',
        fr:"Je m'appelle Owen. J'ai 36 ans. Je suis taïwanais. J'habite à Xinbei. Je suis dentiste.",
        zh:'我叫Owen。我36歲。我是台灣人。我住新北市。我是牙醫師。' },
      // ── 2026-08-28 v2：語言島第四座，也是**樞紐島**（考官從這裡分岔到 AC2／AC3／AC8）。
      // 10 秒 → 202 字 / 約 93 秒。四段：我是什麼樣的人／住哪／學法文／法文的感覺＋生活。
      // ⭐ 這座島刻意**不重述工作與家庭**（那是 AC3／AC2 的事），只留「勾子」讓考官追問。
      // 四個「加分」點：
      //   ・「我是分析型的人：分類、換角度、把事情連起來」——自我定位，不是職業標籤
      //   ・「但還沒到工程師那種程度！」——⭐ 幽默，考官會笑，這在口說評分裡是加分的
      //   ・⭐「學習不只是花時間，最重要的是浸泡＋找到對的方法」——他真正的信念
      //     （跟他 08-28 說的「把方法弄對比死命苦讀重要」是同一件事）
      //   ・⭐「講法文時好像會換一種眼光，模糊的時候反而看見更大的世界」
      //     ——全系統最特別的一句，別人沒有。⚠️ 中文原句更美（「從遠到近／時而模糊時而清楚／
      //     更細膩的美感」），A2 只能保住骨架，**B2 版要把整段還原**，是升級的第一順位。
      // 用上的結構：quelqu'un d'analytique（de＋形容詞）、moins de … que（25/26課比較級）、
      //   mais（讓步雛形）、j'ai l'impression de＋不定式、le plus important, c'est de…（26課 c'est 強調）
      // ⚠️ 「五月開始學」是硬事實：到 2027-06 考試那時剛好滿一年多，考官問起來這是很強的一句。
      { level:'A2', d:'2026-08-28',
        fr:"Je m'appelle Owen, j'ai 36 ans et je suis dentiste. Je suis quelqu'un d'analytique : j'aime classer les choses, les regarder sous différents angles et faire des liens entre elles. Je suis plutôt rationnel, mais pas au point d'être ingénieur ! Je suis assez réservé, et j'aime réfléchir et lire.\n\nJ'habite à Banqiao, près de Taipei, dans un immeuble. Le quartier est très ouvert et la gare est tout près. Il y a moins de petits restaurants qu'ailleurs et c'est un peu plus cher, mais j'aime vivre ici : les voisins sont gentils et tout est propre.\n\nJ'ai commencé le français en mai, cette année. Je prends des cours, et j'utilise aussi Duolingo et l'IA. J'écoute le podcast Coffee Break French et je regarde la série Extra French. Pour moi, apprendre, ce n'est pas seulement passer du temps : le plus important, c'est de se plonger dans la langue et de trouver la bonne méthode.\n\nLe français est une langue très spéciale. Quand je le parle, j'ai l'impression de changer de regard : parfois c'est flou, parfois c'est net — et quand c'est flou, je vois le monde plus largement. Le reste du temps, je fais du sport, je réfléchis, et je m'occupe de ma fille.",
        zh:'我叫 Owen，36 歲，是牙醫。我是一個分析型的人：我喜歡把事情分類、從不同角度看它們、然後把它們連起來。我算是理性的，但還沒到工程師那種程度！我個性比較木訥，喜歡思考和閱讀。\n\n我住在台北附近的板橋，住大樓。這一區很空曠，車站也很近。這裡的小吃比別的地方少，物價也高一點，但我很喜歡住這裡：鄰居很友善，環境也很乾淨。\n\n我今年五月開始學法文。我有上家教，也用 Duolingo 和 AI。我聽 Coffee Break French 這個 podcast，也看 Extra French 這部影集。對我來說，學習不只是花時間：最重要的是讓自己浸泡在這個語言裡，還有找到對的方法。\n\n法文是一個很特別的語言。我講法文的時候，好像會換一種眼光看事情：有時候是模糊的，有時候是清楚的——而模糊的時候，我反而看見更大的世界。其他時間我會運動、思考，還有照顧我女兒。' }
    ],
    // 2026-08-28 預測追問。cover：'ok'＝島接得住｜'part'＝要轉一下｜'gap'＝沒材料
    // ✅ 08-28 已解除的兩題危險 gap：原本只寫「看很多法文電影／聽很多 podcast」，考官必追問是哪些。
    //    Owen 當天補了具體名字，且**直接寫進島的正文**（比放在追問裡好：具體名字讓整段更可信）：
    //    影集 Extra French（repo 其他地方寫作「Extra Français」）／podcast Coffee Break French。
    follow_ups:[
      { fr:"Pourquoi vous apprenez le français ?", zh:'你為什麼學法文？', cover:'ok', from:'AC8 加拿大' },
      { fr:"Vous trouvez le français difficile ?", zh:'你覺得法文難嗎？', cover:'part', from:null },
      { fr:"Vous regardez quoi comme séries ou films français ?", zh:'你看哪些法文影集或電影？', cover:'ok', from:null },  // 08-28 Owen 補：Extra French
      { fr:"Quels podcasts vous écoutez ?", zh:'你聽哪些 podcast？', cover:'ok', from:null },  // 08-28 Owen 補：Coffee Break French
      { fr:"Être analytique, ça vous aide dans votre travail ?", zh:'分析型的個性對你的工作有幫助嗎？', cover:'part', from:'AC3 工作' },
      { fr:"Qu'est-ce que vous lisez en ce moment ?", zh:'你最近在看什麼書？', cover:'ok', from:'AC5 興趣嗜好' },  // 09-01 AC5 v2 第①段：gap→ok
      { fr:"Vous faites quel sport ?", zh:'你做什麼運動？', cover:'ok', from:'AC11 健康' },  // 09-01 AC11 v2 第①段整段：gap→ok
      { fr:"Vous habitez à Banqiao depuis longtemps ?", zh:'你在板橋住很久了嗎？', cover:'gap', from:'AC9 住家' },
      { fr:"Vous parlez d'autres langues ?", zh:'你還會其他語言嗎？', cover:'gap', from:null },
      { fr:"Vous préférez la ville ou la campagne ?", zh:'你比較喜歡城市還是鄉下？', cover:'part', from:'AC9 住家' }
    ] },

  { id:'AC2', topic:'family', title:'家庭',
    q_fr:'Parlez-moi de votre famille : qui sont les membres, ce qu\'ils font, comment ils sont.',
    q_zh:'跟我說說你的家庭：有哪些人、做什麼、個性怎樣。',
    // ⭐ 2026-08-28 Owen 的中文口述全文（逐字保留，⛔ 不要精簡）。慣例同 AC3。
    // ⚠️ v2 法文版刻意沒收進去的段落（＝之後升級 B1/B2 的第一批材料）：
    //    ・「雙薪家庭」「體操課／感統課」「跟朋友聚餐、帶女兒吃不同餐廳」（細節，中版可加回）
    //    ・「不侷限於科技、醫療、財經才有市場，各種才能都有發揮空間」← 抽象化，B2 的料
    //    ・「未來不一定要留在加拿大，去美國也很好」← 讓步／權衡段的料
    //    ・「台灣工時長、總是要快快快，希望有更充實人生與自我實現」← 對比段的料
    //    ・v1 有但 v2 沒帶的：父母（台語老師）、姊姊（新竹工程師）→ 追問「你父母怎麼想」是真 gap
    source_zh:"【家庭成員】我家裡有太太和女兒。女兒現在 1 歲多，剛學會講話和走路，個性蠻冒險犯難的，對有興趣的東西會想辦法拿到並不斷探索，我覺得這是很棒的特質。太太目前也在工作，我們是雙薪家庭，她是做科技產業相關的服務。\n\n【太太怎麼想】太太聽到出國計畫時其實蠻開心的，覺得如果有機會去國外生活、去理想的國家體驗，相對來說是不錯的選項。\n我們覺得在臺灣生活其實算舒適，真的很方便，便利商店也很多，去其他國家可能都沒這麼方便。但臺灣有環境的壓力，房價越來越高，以小孩的生活和成長發展來說，我覺得不是太理想，所以出國發展反而是一個可以考慮的方向。\n\n【週末】我們家的週末生活，週六太太下班後就是家庭時間。禮拜天早上我甚至會跟太太一起去上瑜伽，女兒就在教室裡面玩；老師很開放，女兒也不會隨便打擾其他同學，在過程中玩得很開心、能自由探索。我們也會陪女兒去上體操課或感統課，有機會就跟朋友聚餐、帶女兒去吃不同的餐廳，享受陽光和大自然，這是平常生活比較難得的。\n\n【對女兒的期望】我希望女兒在加拿大可以自我探索、表達自己的想法。她不見得一定要成為工程師、醫生，或是傳統定義上對世界有用的人。希望在加拿大不侷限於科技、醫療或財經才有市場，而是各種才能都有發揮的空間，讓她能找到自己想走的方向。未來求學或發展也不一定要留在加拿大，去美國或其他地方都很好，能找到適合她的方向才是最重要的。\n\n【對我們自己】至於我和太太是否適合加拿大，真的要去了之後才知道。但我們希望可以好好享受這個世界與自然環境，有更多相處的時間。不像在臺灣工時長、各種壓力大，總是要不斷追求快快快，希望我們能有更多充實人生與自我實現的方法。",
    versions:[
      { level:'A1', d:'2026-07-16',
        fr:"Dans ma famille, il y a mon père, ma mère, ma sœur, ma femme et ma fille. Mes parents sont professeurs de taïwanais. Ma sœur est ingénieure à Hsinchu. Je suis marié. Ma femme s'appelle Lauryn et ma fille s'appelle Jolie. Ma vie, c'est ma famille.",
        zh:'我家有爸爸、媽媽、姊姊、太太、女兒。我爸媽是台語老師。我姊姊在新竹當工程師。我已婚。我太太叫Lauryn，我女兒叫Jolie。我的生活重心是我的家人。' },
      // ── 2026-08-28 v2：語言島第三座。187 字 / 約 86 秒（AC3 是 174/80，同一規格）。
      // 四段：①太太女兒是誰（Jolie 的個性）②太太對移民的反應＋台灣的張力
      //       ③週末（瑜伽那個畫面）④對女兒的期望
      // 四個「加分」點：
      //   ・Jolie「有興趣的東西會想盡辦法拿到」——1 歲半的具體畫面，考官記得住
      //   ・「週日全家去瑜伽，她在教室裡玩」——別人沒有的細節
      //   ・「很舒適、到處便利商店，但房子越來越貴」——⭐ 讓步的雛形，B2 升級的天然接口
      //     （之後換成 Certes, la vie est confortable… mais / Bien que + subjonctif）
      //   ・「不一定要當工程師或醫生」——⭐ 第三座橋：接回 AC8／AC3 的「小孩該探索自己的理想」
      // 用上的結構：vient d'apprendre（venir de＋不定式）、était contente（imparfait）、
      //   de plus en plus chers（25/26課比較級，AC8 也用過 de plus en plus chaud）、
      //   Chaque dimanche matin（26課 chaque＋單數）、pourra／verra（27課 futur simple）、
      //   le plus important, c'est de…（26課 c'est 強調）
      // ⚠️ 「我希望她能找到自己的路」若寫 j'espère qu'elle trouve 會踩到 subjonctif（B1），
      //    這版用 le plus important, c'est de trouver son propre chemin（不定式）繞開。
      //    → 這句是升級 B2 時換成 subjonctif 的位置（見 STRATEGY 原則 6）。
      { level:'A2', d:'2026-08-28',
        fr:"Je vis avec ma femme Lauryn et notre fille Jolie. Jolie a un an et demi : elle vient d'apprendre à marcher et à parler. Elle est très aventurière — quand quelque chose l'intéresse, elle fait tout pour l'attraper. Lauryn travaille aussi : elle est dans le secteur de la technologie.\n\nQuand je lui ai parlé du Canada, elle était contente. À Taïwan, la vie est très confortable, il y a des supérettes partout, mais les logements sont de plus en plus chers. Pour élever un enfant, ce n'est pas idéal.\n\nLe week-end, c'est le temps de la famille. Chaque dimanche matin, on fait du yoga tous les deux et Jolie joue dans la salle : le professeur est très ouvert, alors elle explore librement. On profite aussi du soleil et de la nature — à Taïwan, on n'a pas souvent le temps.\n\nAu Canada, j'espère qu'elle pourra s'exprimer et se chercher. Elle n'est pas obligée de devenir ingénieur ou médecin : le plus important, c'est de trouver son propre chemin. Et nous ? On verra une fois là-bas. Mais on espère avoir plus de temps ensemble.",
        zh:'我跟太太 Lauryn、女兒 Jolie 住在一起。Jolie 一歲半，剛學會走路和講話。她個性很冒險——只要有什麼東西她有興趣，她就會想盡辦法拿到。Lauryn 也在工作，她做科技產業相關的。\n\n我跟她講加拿大的計畫時，她很開心。在台灣生活很舒適，到處都是便利商店，但房子越來越貴。以養小孩來說，這不太理想。\n\n週末是家庭時間。每個禮拜天早上我們兩個去上瑜伽，Jolie 就在教室裡玩：老師很開放，所以她可以自由探索。我們也會享受陽光和大自然——在台灣不常有這個時間。\n\n到了加拿大，我希望她可以表達自己、探索自己。她不一定要當工程師或醫生：最重要的是找到自己的路。那我們呢？要去了才知道。但我們希望能有更多相處的時間。' }
    ],
    // 2026-08-28 預測追問。cover：'ok'＝島接得住｜'part'＝要轉一下｜'gap'＝沒材料
    // ⭐ gap／part 這幾題就是 B2 升級層的施工圖，見 STRATEGY 原則 6
    follow_ups:[
      { fr:"Et votre femme, qu'est-ce qu'elle en pense ?", zh:'那你太太怎麼想？', cover:'ok', from:null },
      { fr:"Votre fille a quel âge ?", zh:'你女兒幾歲？', cover:'ok', from:null },
      { fr:"À Taïwan, les parents mettent beaucoup de pression sur les enfants ?", zh:'在台灣，父母給小孩很大壓力嗎？', cover:'part', from:'AC8 加拿大' },
      { fr:"Qu'est-ce qui vous manquera le plus de Taïwan ?", zh:'你最會想念台灣的什麼？', cover:'ok', from:'AC5 興趣嗜好' },  // 09-01 AC5 v2 第③段整段：part→ok
      { fr:"Votre fille apprend le français aussi ?", zh:'你女兒也在學法文嗎？', cover:'gap', from:null },
      { fr:"Votre femme parle français ?", zh:'你太太會說法文嗎？', cover:'gap', from:null },
      { fr:"Vos parents, qu'est-ce qu'ils pensent de votre départ ?", zh:'你爸媽對你們要走怎麼想？', cover:'gap', from:null },
      { fr:"Ce sera difficile pour votre fille de changer de pays ?", zh:'換國家對你女兒會不會很難？', cover:'gap', from:null },
      { fr:"Si votre femme ne trouve pas de travail au Canada ?", zh:'如果你太太在加拿大找不到工作呢？', cover:'gap', from:'AC3 工作' },
      { fr:"Comment vous imaginez votre vie de famille au Canada ?", zh:'你怎麼想像你們在加拿大的家庭生活？', cover:'part', from:null }
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
      { fr:"Si vous ne réussissez pas l'examen canadien, qu'est-ce que vous ferez ?", zh:'如果你沒考過加拿大的考試，你會怎麼做？', cover:'ok', from:'AC15 未來計畫' },  // 09-01 AC15 v2 第②段直接回答：gap→ok
      { fr:"Vous n'avez jamais pensé à changer de métier, comme votre camarade ?", zh:'你沒想過像你同學那樣轉行嗎？', cover:'part', from:null },
      { fr:"Vous conseilleriez ce métier à votre fille ?", zh:'你會建議你女兒做這一行嗎？', cover:'part', from:'AC2 家庭' },
      { fr:"Le stress au travail, comment vous le gérez ?", zh:'工作的壓力你怎麼處理？', cover:'ok', from:'AC11 健康' }  // 09-01 AC11 v2 第③段：gap→ok
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
    q_fr:"Qu'est-ce que vous aimez faire pendant votre temps libre ?",
    q_zh:'你空閒時間喜歡做什麼？',
    // ⭐ 2026-09-01 Owen 的中文口述全文（逐字保留，⛔ 不要精簡）。⭐ 第八座島，Phase 0 到齊。
    // ⚠️ 2026-09-01：口述原句有「還有看畫冊」四個字，**經 Owen 本人確認是口誤、要求刪除**，已從
    //    source_zh 拿掉（「我完全想不起來了，你可以直接刪掉那幾個字」）。
    //    ⭐ 記在這裡是因為 source_zh 的慣例是**逐字保留**——這是唯一的例外情形，
    //    而且只有「本人否認這段內容」才適用。⛔ 不要擴大解釋。
    //    ⚠️ 對照組：AC15 的「40 歲錢財」是語音辨識把「前才」聽錯，那是**看得懂的錯字、不是假內容**，
    //    → 保留原句＋加註，不刪。兩種情形處理方式不同。
    // ⚠️ v2 法文版刻意沒收進去的段落（＝之後升級 B1/B2 的第一批材料）：
    //    ・「慢慢變強大會是什麼樣子」← v2 收了「期待看她長大變成一個人」那半，這半留著當升級料。
    //      ⚠️ 跟 AC2「希望她找到自己的路」是同一條線但角度不同（AC2 是期望，這裡是「看著」的驚奇），
    //      不算重述；升級時兩座島可以互相呼應
    //    ・「瑜伽、冥想、泡湯」← AC11 已經講了瑜伽與冥想，這裡⛔ 不重複（原則 7）
    //    ・「信義區那麼小一區就有超多百貨公司」← 細節，中版可加回
    //    ・⭐「台灣其實真的很不錯，但教育方式是文化精鑄出來的，很難避免亞洲那種競爭填鴨」←
    //      ⭐⭐ 這是**教科書等級的讓步段**（先讓步再轉折），但 AC8 已經講完教育論點了，
    //      這裡收進去會重複 → 留給 **AC8 升級 B2 時**用，那才是它的位置
    //    ・「做治療不一定百分之百痊癒，但過程很開心」← 留給 AC3 升級用
    //    ・「24 小時便利商店超多」← ⛔ AC2 v2 已經講過 des supérettes partout，這裡刻意換成電商
    source_zh:"【最近在讀什麼】然後，我最近看了什麼？其實我最近都在讀法文為主。我之前最喜歡看的就是一些生命的書，或者是世界觀、關於時間的探索，還有佛法。這些東西都有一些概念與設定。冥想我之前練很多，因為我自己的心思蠻亂的，但這東西有時候真的看太多，反而會落在知識的框架中，沒有真的在當下、在心上。不過我最近也很忙，我就是花時間去閱讀這些東西。\n\n【空下來做什麼】如果我空下來的話，我會想陪伴我的家人、小孩跟太太，希望他們的生命中可以刻滿我的痕跡。我想要陪伴小孩長大，很期待看到一個嬰兒慢慢有自己的思想與想法，慢慢變強大會是什麼樣子。\n我也會想給自己一些留白：去咖啡店坐著、去野外喝茶看看景色，享受自己跟環境的交流，還有瑜伽、冥想、泡湯等等，這些都是我想做的。\n\n【最想念台灣的什麼】我也會想念臺灣的很多東西。第一個就是方便：\n・24 小時便利商店超多，隨時想買什麼都可以。\n・電商非常厲害，現在已經競爭到隔天清晨前就會到貨；如果女兒明天上學需要準備什麼，今天晚上買一早就會有，甚至過年期間連初一都會送貨，真的很驚人。\n・食物方面，便當好吃、選擇又多，而且餐廳都離很近。\n・逛街也很棒，像是信義區那麼小一區就有超多百貨公司，吃東西也很方便，是很棒的商業環境。\n・像臺南也是美食到處都是，風景優美、步調又慢。\n去加拿大算是一個環境、生活方式與教育方式的轉變。臺灣其實真的很不錯，但教育方式畢竟是文化精鑄出來的東西，很難完全避免亞洲那種比較競爭、填鴨、壓力蠻大的環境。\n我也會很懷念在臺灣的家人，他們是我生命中很重要的一環；去加拿大就得重新建立自己的生活圈，那是很不一樣的面向。我也會懷念以前的工作環境，大部分我都適應得很好，同事夥伴和病人都很可愛。雖然做治療不一定百分之百都能痊癒，但整個過程很開心；即便以後去加拿大當牙醫，可能一切都要重新適應。\n\n【最近覺得好玩的事】1. 學法文：這一直都是個很好玩的過程。要在一年內學會一個語言、去考試並達到蠻高的程度，不可能用以往拖很長、學很慢的方式。在這種壓力下，我必須堆疊出新的技巧，去研究和搜尋，是非常有趣的過程。\n2. 看球賽：我很喜歡看各種球賽，看到新的技巧出現，或是有些人會利用規則去創造對球賽的掌握，這些都很有趣。",
    versions:[
      { level:'A1', d:'2026-07-16',
        fr:"J'aime regarder des séries et des films. J'aime aussi la musique. Le week-end, je fais du sport avec ma femme. Et maintenant, j'apprends le français — c'est mon nouveau passe-temps !",
        zh:'我喜歡看影集和電影。我也喜歡音樂。週末我跟太太一起運動。現在我在學法文——這是我的新嗜好！' },
      // ── 2026-09-01 v2：⭐ 語言島第八座，**Phase 0 的八座島到齊**。178 字 / 約 82 秒。
      // ⭐ 補掉 AC1「你最近在看什麼書？」＋ AC8／AC2 的「你最會想念台灣的什麼？」——三題都升成 'ok'。
      //    ⚠️ 那題原本是 **AC8 唯一剩下的 gap**，補完之後 **AC8 掛零**。
      // 四段：①最近在讀什麼（＋冥想的自省）②空下來做什麼 ③⭐最想念台灣的什麼 ④最近覺得什麼好玩
      // 五個「加分」點：
      //   ・⭐「讀太多之後，人會停在觀念裡，就不是真的在當下了」——**自省**，
      //     這種話考官幾乎不會從 A2 考生嘴裡聽到，而且是 B2 抽象段最好的接口
      //   ・⭐「我希望能在他們的生命裡留下很多痕跡」——情緒，全段最強的一句
      //   ・⭐⭐「晚上下單，早上之前就送到，連過年初一都送」——**別人絕對不會講的細節**。
      //     ⛔ 這一項不能換成「便利商店很多」：那句 AC2 已經講過，而且是所有人都會講的。
      //   ・「便當好吃又不貴」「台南東西很好吃、步調又慢」——具體地名＋具體食物
      //   ・⭐「就是法文啊」——⭐⭐ 當著考官的面說「我現在覺得最好玩的事就是學你的語言」，
      //     這是這座島最划算的一句話。而且後半「一年內學一個語言，逼我去想別的方法」是真的，不是討好。
      // ⛔ 刻意不重述舊島（原則 7）：AC11 講了瑜伽與冥想的**做法** → 這裡只講冥想的**自省**；
      //    AC2 講了便利商店 → 這裡換電商；AC8 講了教育 → 這裡完全不碰（那段留給 AC8 升 B2）；
      //    AC7 講了旅行 → 這裡的「留白」只留咖啡與戶外喝茶，不展開風景。
      // 用上的近期結構（刻意）：
      //   ・je lisais／je méditais（20課 imparfait 的「以前都這樣」）
      //   ・Ce qui me manquera le plus（26課 ce qui 強調句 ＋ 27課 futur simple）
      //   ・Ce que je trouve amusant（26課 ce que）
      //   ・on commande… c'est livré／on mange／on vit（28課 on ＝ les gens）
      //   ・à force de lire（B1 用法，見下方註記）
      //   ・ça me plaît beaucoup（19課 plaire，「Il me plaît」那組）
      // ⚠️ 一個超出 A2 的用法：`à force de` + 不定式（「因為一直…以至於」）。
      //    A2 沒有等價講法（`Parce qu'on lit trop` 講不出「累積到某個程度」的意思）。
      //    ⭐ 它就是這句話的重點，換掉就沒有味道了 → 保留，並標成升級層要熟悉的第一批連接詞。
      { level:'A2', d:'2026-09-01',
        fr:"En ce moment, je lis surtout en français. Avant, je lisais beaucoup sur le temps, sur le sens de la vie, sur le bouddhisme, et je méditais souvent. Mais à force de lire, on reste dans les idées — et on n'est plus vraiment là.\n\nQuand j'ai du temps libre, je le passe avec ma famille : j'aimerais laisser beaucoup de traces dans leur vie. J'ai hâte de voir ma fille grandir et devenir quelqu'un. Et parfois je m'arrête seul — un café, un thé dehors, en regardant le paysage.\n\nCe qui me manquera le plus à Taïwan ? On commande le soir et c'est livré avant le matin, même le premier jour du Nouvel An. Les bentos sont bons et pas chers. À Tainan, on mange très bien et on vit lentement. Et surtout ma famille — et mes patients.\n\nCe que je trouve amusant en ce moment ? Le français, justement. Apprendre une langue en un an, ça m'oblige à inventer d'autres méthodes. Et regarder du sport : voir quelqu'un utiliser une règle pour prendre le contrôle du jeu, ça me plaît beaucoup.",
        zh:'我最近主要都在讀法文。以前我讀很多關於時間、關於生命意義、關於佛法的書，也常常冥想。但讀太多之後，人會停在觀念裡——就不是真的在當下了。\n\n有空的時候，我都跟家人在一起：我希望能在他們的生命裡留下很多痕跡。我很期待看著女兒長大、慢慢變成一個人。有時候我也會一個人停下來——一杯咖啡、在戶外喝茶、看看風景。\n\n我最會想念台灣的什麼？晚上下單，早上之前就送到了，連過年初一都送。便當好吃又不貴。在台南，東西很好吃，步調又慢。最重要的還是我的家人——還有我的病人。\n\n最近覺得什麼好玩？就是法文啊。一年內學一個語言，逼我去想別的方法。還有看球賽：看到有人利用規則去掌握整場比賽，我很喜歡。' }
    ],
    // 2026-09-01 預測追問。cover：'ok'＝島接得住｜'part'＝要轉一下｜'gap'＝沒材料
    follow_ups:[
      { fr:"Qu'est-ce que vous lisez en ce moment ?", zh:'你最近在看什麼書？', cover:'ok', from:'AC1 自我介紹' },
      { fr:"Qu'est-ce qui vous manquera le plus de Taïwan ?", zh:'你最會想念台灣的什麼？', cover:'ok', from:'AC8 加拿大' },
      { fr:"Pourquoi vous avez arrêté de méditer ?", zh:'你為什麼不冥想了？', cover:'part', from:'AC11 健康' },  // ⚠️ 陷阱題：他沒有停，是「讀太多」。要能澄清
      { fr:"Vous regardez quel sport ?", zh:'你看什麼球賽？', cover:'gap', from:null },
      { fr:"Vous aimez la musique ? Quel genre ?", zh:'你喜歡音樂嗎？哪一種？', cover:'part', from:null },  // v1 有「喜歡音樂」，v2 沒帶
      { fr:"Vous regardez des séries en français ?", zh:'你看法文影集嗎？', cover:'part', from:'AC1 自我介紹' },
      { fr:"Au Canada, vous ferez quoi de votre temps libre ?", zh:'到加拿大你空閒時間會做什麼？', cover:'part', from:'AC15 未來計畫' },
      { fr:"Le bouddhisme, ça vous aide dans la vie ?", zh:'佛法對你的生活有幫助嗎？', cover:'gap', from:null },
      { fr:"Vous avez le temps pour tout ça, avec un enfant ?", zh:'有小孩還有時間做這些嗎？', cover:'part', from:'AC2 家庭' },
      { fr:"La vie au Canada sera moins pratique. Ça ne vous fait pas peur ?", zh:'加拿大的生活沒那麼方便，你不怕嗎？', cover:'part', from:'AC8 加拿大' }  // ⭐ 讓步段：這題就是這座島的 B2 施工圖
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
    // ⭐ 2026-09-01 Owen 的中文口述全文（逐字保留，⛔ 不要精簡）。慣例同 AC2／AC3／AC8。
    // ⚠️ v2 法文版刻意沒收進去的段落（＝之後升級 B1/B2 的第一批材料）：
    //    ・「慢活、不追求過多待辦事項，單純感受自己在這個世界上存在的感覺」← 抽象化，B2 的料
    //    ・「光是跟自然界互動就能得到很多，也會自然地對大自然產生敬畏」← 抽象化＋論證，B2 的料
    //    ・「冰島是疫情前最後一次長途旅行」← 時間錨點，中版可加回（avant la pandémie）
    //    ・「爬到非常高的地方」「拍美照」「達成目標很重要」← 細節，中版可加回
    //    ・「一歲前開車去南部、中南部、宜蘭，在外面住很多天」← 細節，中版可加回
    //    ・「吃東西受限制」「要找嬰兒車好推的地方」← 細節（換尿布已收進 v2）
    //    ・「至少現在不會有明確的景點概念」← 讓步的雛形，B2 接口
    source_zh:"【去過加拿大嗎】我還沒去過加拿大。其實我以前一直沒踏進美洲過，直到 36 歲的聖誕節才去過美國，主要原因也是距離太遠。\n但我很嚮往那樣的行程：慢活、享受跟自然的互動，不追求過多的待辦事項，單純感受自己在這個世界上存在的感覺。\n我想優先去溫哥華，然後再去國家公園。去溫哥華體驗一下大家說的氣候宜人是什麼感覺；國家公園更不用提，這就是我想去加拿大的原因，有太多自然景觀了。光是在跟自然界的互動中我們就能得到很多，也會自然地對大自然產生敬畏。\n\n【冰島】說到冰島，冰島是疫情前最後一次長途旅行，也是我第一次自駕。我印象最深刻的就是各種瀑布，還有爬到非常高的地方。瀑布非常壯觀，而且在沒有任何圍欄阻礙的情況下，能直接跟大自然交流。\n\n【我喜歡怎麼玩】我自己喜歡怎麼玩呢？\n・城市：我會認真好好規劃，因為很多地方都很廣，而且達成目標很重要。\n・自然景觀：我不會排太多行程，會留很多餘裕去跟大自然交流，在那個地方喝杯咖啡、觀察大家怎麼玩、踩踩落葉、拍拍美照。\n\n【有了 Jolie 之後】我女兒出生之後，我帶她去過滿多地方。一歲前都是開車去南部、中南部、宜蘭等等，在外面住很多天。一歲之後帶她去日本北海道，算是相對比較長途的旅行。\n跟她一起出門蠻開心的，但行程跟以前完全不同：她很早睡、很早就得吃晚餐（5 點多就得吃），早上也很早起。以前那種 7、8 點吃飯、逛街逛到 10 點、再去藥妝店買東西的行程完全不會有。吃東西受限制、能吃的比較少，而且隨時隨地都要找地方換尿布，也要找嬰兒車方便推的地方。\n你說她會不會記得？我認為不會，至少現在不會有明確的景點概念。但我覺得這些體驗都刻在身體裡面，感受一定都在。\n這些東西都非常值得。",
    versions:[
      { level:'A1', d:'2026-07-16',
        fr:"Le voyage le plus mémorable, c'est l'Islande et la Grotte Bleue en Italie. La nature est incroyable — je me sens tout petit. En Islande, j'ai voyagé avec un groupe d'amis plus jeunes. Il n'y a pas beaucoup de restaurants, alors on a mangé dans la voiture. Pour la Grotte Bleue, la mer était très agitée. J'ai attendu longtemps sur le bateau. À l'intérieur, c'était incroyable !",
        zh:'印象最深的旅行是冰島跟義大利的藍洞。大自然太不可思議了——我覺得自己很渺小。冰島是跟一群學弟妹一起去的。餐廳很少，所以我們在車上吃飯。藍洞那次，海浪很大。我在船上等了很久。裡面真的太神奇了！' },
      // ── 2026-09-01 v2：語言島第五座。192 字 / 約 88 秒（AC3 是 174/80、AC2 是 187/86，同一規格）。
      // 這座島是為了補掉 AC8 最後一個 gap 而蓋的（「你去過加拿大嗎」）→ 已把 AC8 那題升成 'ok'。
      // 四段：①沒去過加拿大＋為什麼＋想先去哪 ②冰島的「一個瞬間」 ③城市 vs 自然的玩法對比
      //       ④有了 Jolie 之後旅行怎麼變
      // 五個「加分」點：
      //   ・⭐「三十六歲才第一次踏上美洲」——誠實又具體，考官記得住（不是「我很喜歡旅行」這種誰都能講的）
      //   ・⭐「巨大的瀑布，沒有任何圍欄，我跟大自然之間什麼都沒有」——別人沒有的畫面，
      //     而且是往加拿大國家公園的伏筆（同一個嚮往，兩個大陸）
      //   ・「城市全部排好／大自然幾乎不排」——⭐ 對比結構，B2 讓步段最天然的接口
      //   ・「晚上十點還在逛街這種事已經沒有了」——具體、帶點幽默，考官會笑
      //   ・⭐「她會記得嗎？不會。但我相信這些都留在她身體裡。」——情緒，全段最強的收尾
      // ⛔ 刻意不重述舊島（原則 7）：Vancouver 的氣候「論證」AC8 已經講完（暖化、三十年後），
      //    這裡只留體感勾子「大家都在說，我想自己感受看看」；Jolie 是誰 AC2 講過，這裡只講「旅行怎麼變」。
      // 用上的近期結構（刻意）：
      //   ・si j'y vais un jour, je commencerai…（28課 si＋現在式＋未來式，本課才補上的第三式）
      //   ・Des cascades, il y en a partout（29課 en 數量版＋前置提示）
      //   ・partout, il faut trouver un endroit…（29課 obligation：il faut＋不定式）
      //   ・s'en souviendra（27課 futur simple ＋ 29課 en）
      //   ・on voyage / on est allés（28課 on ＝ nous，含性數配合）
      //   ・je me souviens d'un moment précis（21課 se souvenir＋20課 Je me souviens 那課的主題句）
      //   ・j'étais / il n'y avait（20課 imparfait）、aucune barrière（18課 la négation）
      //   ・je suis allé pour la première fois（17課 passé composé）
      { level:'A2', d:'2026-09-01',
        fr:"Non, je ne suis jamais allé au Canada. Je suis allé en Amérique pour la première fois à trente-six ans, aux États-Unis : c'est simplement trop loin. Si j'y vais un jour, je commencerai par Vancouver — tout le monde parle de son climat, je veux le sentir moi-même — et ensuite les parcs nationaux. C'est vraiment pour ça.\n\nMon plus beau souvenir, c'est l'Islande. Des cascades, il y en a partout, mais je me souviens d'un moment précis : j'étais devant une cascade immense, et il n'y avait aucune barrière. Rien entre la nature et moi. C'était aussi ma première fois au volant.\n\nEn ville, je prépare tout, parce que je veux tout voir. Dans la nature, au contraire, je ne prévois presque rien : je prends un café, je marche dans les feuilles.\n\nDepuis la naissance de ma fille, on voyage autrement. On est allés à Hokkaido : elle dîne à cinq heures et elle dort tôt. Fini les magasins à dix heures du soir. Et partout, il faut trouver un endroit pour la changer. Est-ce qu'elle s'en souviendra ? Non. Mais je crois que tout ça reste dans son corps. Et ça, ça vaut la peine.",
        zh:'沒有，我還沒去過加拿大。我第一次去美洲是三十六歲，去美國：單純就是太遠了。如果哪天我去，我會先去溫哥華——大家都在說那裡的氣候，我想自己感受看看——然後是國家公園。我想去，真的就是為了這個。\n\n我最難忘的旅行是冰島。瀑布到處都是，但我記得一個很具體的瞬間：我站在一座巨大的瀑布前面，沒有任何圍欄。我跟大自然之間什麼都沒有。那也是我第一次自己開車。\n\n在城市，我會把所有東西都規劃好，因為我想全部看到。在大自然裡剛好相反，我幾乎什麼都不排：喝杯咖啡、踩著落葉走。\n\n女兒出生之後，我們旅行的方式就不一樣了。我們去了北海道：她五點就吃晚餐、很早睡。晚上十點還在逛街這種事已經沒有了。而且到哪裡都要找地方換尿布。她會記得嗎？不會。但我相信這些都留在她身體裡。這一切真的很值得。' }
    ],
    // 2026-09-01 預測追問。cover：'ok'＝島接得住｜'part'＝要轉一下｜'gap'＝沒材料
    // ⭐ gap／part 這幾題就是 B2 升級層的施工圖，見 STRATEGY 原則 6
    follow_ups:[
      { fr:"Pourquoi vous n'êtes jamais allé au Canada ?", zh:'你為什麼一直沒去過加拿大？', cover:'ok', from:null },
      { fr:"Vous préférez la ville ou la nature ?", zh:'你比較喜歡城市還是大自然？', cover:'ok', from:null },
      { fr:"Voyager avec un bébé, c'est difficile ?", zh:'帶著寶寶旅行很難嗎？', cover:'ok', from:null },
      { fr:"Vous conduisez à l'étranger ? Vous louez une voiture ?", zh:'你在國外會開車嗎？會租車嗎？', cover:'part', from:null },
      { fr:"Aux États-Unis, vous êtes allé où exactement ?", zh:'美國你到底去了哪裡？', cover:'part', from:null },
      { fr:"Vous préférez voyager seul, en couple ou en groupe ?", zh:'你喜歡一個人、兩個人還是一群人去？', cover:'part', from:null },  // v1 有「跟一群學弟妹去冰島」可以調
      { fr:"Au Canada, vous voyagerez beaucoup ?", zh:'到了加拿大，你會常常旅行嗎？', cover:'part', from:'AC8 加拿大' },
      { fr:"Quel sera votre prochain voyage ?", zh:'你下一趟旅行會是哪裡？', cover:'gap', from:null },
      { fr:"Vous avez déjà eu un problème pendant un voyage ?", zh:'你旅行中出過什麼狀況嗎？', cover:'gap', from:null },
      { fr:"Voyager, ça coûte cher. Est-ce que ça vaut vraiment la peine ?", zh:'旅行很花錢，真的值得嗎？', cover:'gap', from:null }  // ⭐ 讓步段：這題就是這座島的 B2 施工圖
    ] },

  { id:'AC8', topic:'canada', title:'加拿大／移民動機',
    q_fr:"Pourquoi voulez-vous aller au Canada ? Pourquoi ce pays ?",
    q_zh:'你為什麼想去加拿大？為什麼選這個國家？',
    // ⭐ 2026-08-28 補上 Owen 的中文口述全文。⚠️ AC8 是 08-27 蓋的，當時 source_zh 的慣例還沒建立，
    //    所以它一度是唯一沒有中文母本的島（升級 B2 時會少一手材料）。這天回填。
    //    ⚠️ 逐字保留，⛔ 不要精簡。v2 法文版已經幾乎全收（四個理由＋兩個具體場景都在）。
    source_zh:"【四個理由】我覺得去加拿大的話，有幾個優點：\n1. 教育環境比較開放、注重自我探索，不像臺灣那麼填鴨，這可以讓女兒有一個相對好的環境生活跟成長。\n2. 氣候比較宜人：在未來地球暖化的狀況下，臺灣會越來越熱，但加拿大（特別是溫哥華等緯度相對低的地方）幾十年後其實是相對適合居住的地方。\n3. 福利很好：有各種很不錯的政策、教育環境，還有相對合理的房價。\n4. 局勢安定穩定：現在全世界的政經和軍事威脅很多，加拿大相對起來安定又穩定。\n所以去加拿大其實是一個蠻理想的選擇。\n\n【具體場景一：新聞】每次看到兩岸或者是烏克蘭、俄羅斯的新聞的時候，我就對於安定的社會跟政治關係更嚮往，所以那時候就會燃起我去加拿大移民的心。\n\n【具體場景二：同事小孩】我也常常看到我的同事的小孩在幼稚園時期就開始補習，為了考進私校，為了在之後長大考大學的時候有個好的證明而努力。我覺得這個環境壓迫太大了，這也會讓我想要營造一個好的教育環境給我女兒。",
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
      { fr:"Vous êtes déjà allé au Canada ?", zh:'你去過加拿大嗎？', cover:'ok', from:'AC7 旅行' },  // 09-01 AC7 v2 第①段整段就是這題：gap→ok（AC8 四個 gap 全數補完）
      { fr:"Pourquoi Vancouver plutôt que Montréal ou Toronto ?", zh:'為什麼是溫哥華，不是蒙特婁或多倫多？', cover:'part', from:null },
      { fr:"Votre fille a quel âge ? Elle apprend le français aussi ?", zh:'你女兒幾歲？她也在學法文嗎？', cover:'part', from:'AC2 家庭' },  // 08-28 AC2 v2 補了年齡與個性；「學法文」仍缺
      { fr:"Et votre femme, qu'est-ce qu'elle en pense ?", zh:'那你太太怎麼想？', cover:'ok', from:'AC2 家庭' },  // 08-28 AC2 v2 ②段補上了：gap→ok
      { fr:"Vous êtes dentiste : vous pourrez travailler au Canada ?", zh:'你是牙醫，你能在加拿大執業嗎？', cover:'part', from:'AC3 工作' },  // 08-28 AC3 v2 末段補上了：gap→part
      { fr:"Mais au Canada, il fait très froid, non ?", zh:'可是加拿大很冷吧？', cover:'part', from:null },
      { fr:"Taïwan aussi a de bonnes écoles, non ?", zh:'台灣也有好學校啊，不是嗎？', cover:'ok', from:null },
      { fr:"Qu'est-ce qui vous manquera le plus de Taïwan ?", zh:'你最會想念台灣的什麼？', cover:'ok', from:'AC5 興趣嗜好' },  // 09-01 AC5 v2 第③段整段：gap→ok（⭐ AC8 最後一個 gap，補完掛零）
      { fr:"L'immigration, c'est long et difficile. Vous êtes prêt ?", zh:'移民很久又很難，你準備好了嗎？', cover:'part', from:'AC15 未來計畫' },  // 09-01 AC15 第③段的心態接得住，但「準備好了嗎」還要轉一下：gap→part
      { fr:"Si vous ne pouvez pas partir, qu'est-ce que vous ferez ?", zh:'如果你走不成，你會怎麼做？', cover:'ok', from:'AC15 未來計畫' }  // 09-01 AC15 v2 第③段整段就是這題：gap→ok
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
    q_fr:"Est-ce que vous faites du sport ? Comment vous prenez soin de votre santé ?",
    q_zh:'你有運動嗎？你怎麼照顧自己的健康？',
    // ⭐ 2026-09-01 Owen 的中文口述全文（逐字保留，⛔ 不要精簡）。慣例同 AC2／AC3／AC7／AC8／AC15。
    // ⚠️ v2 法文版刻意沒收進去的段落（＝之後升級 B1/B2 的第一批材料）：
    //    ・「觀察聯動性去調整身體狀況」「整骨、經絡更順暢」← 細節＋中醫概念，中版可加回（法文不好講，要先查詞）
    //    ・「找一些成功的案例讓自己穩定，用好的方法把狀況拿回來」← ⭐ 抽象化＋方法論，B2 的料
    //    ・「拳擊一有雜念就漏洞百出」← v2 收了「有危險」那半，「漏洞百出」這個比喻留著當升級料
    //    ・⭐「如果心裡活在這世界上，卻沒有跟自己的內心相連結，只是一直在追求目標」← B2 的抽象段，
    //      而且跟 AC15 的「聽聽自己的聲音」是同一條線——升級時兩座島可以互相呼應
    //    ・「這個問題到現在還沒有完全解決」← 讓步的雛形，B2 接口
    source_zh:"【運動】我最近做了不少運動。我的運動習慣在疫情前就開始建立了，一開始是重訓，後來發現我身體的聯動性不是那麼好，就開始做一些功能性訓練、瑜伽，現在還開始游泳。之前有做一些拳擊，拳擊是為了要產生一些爆發力，讓心裡可以不要有太多雜念，因為打拳擊一有雜念就可能有危險，容易漏洞百出。\n很多時候我大概都是靠運動、觀察聯動性，去調整自己身體的狀況。另外就是我會定期去推拿、整骨、按摩，讓自己身體的經絡更順暢。\n\n【工作壓力】工作壓力我怎麼排解？除了工作本身，因為彎腰駝背產生的身體壓力，這些部分我就是靠運動、靠做那些事情。另外，在工作壓力很大的狀況下，我有接觸一段時間的正念、冥想和瑜伽，我覺得也很不錯，可以讓自己有自由的時間：不是說這整段時間在放假，而是在思緒與思緒之中，有機會讓自己停下來、不被別人打斷。這些東西都可以讓我的壓力變小。\n另外就是要找一些成功的案例讓我自己可以比較穩定，或者是用好的方法，讓自己在遇到困難或遇到狀況的時候，可以比較容易把自己的狀況拿回來，或者快速地排解這些問題。\n\n【健康狀況】「你有過什麼健康狀況嗎？」這個問題很尖銳。倒也沒有嚴重到什麼程度，但我的身體從小就不是很好，可能跟我的坐姿不良有關。我的腰、下背、長期都處在一個不是很對的位置，我甚至曾經有一次大腿麻了三個月，一直都沒有好，後來發現其實是身體坐姿有問題，導致神經的壓迫。這個問題到現在還沒有完全解決，當然至少現在沒有麻了，只是身體的姿勢真的差很多。所以我才會那麼重視運動、瑜伽、游泳、拳擊和筋膜的狀況。\n\n【健康是什麼】對我來說，健康到底是什麼？我覺得就是身心合一吧。身體知道自己是什麼、在幹嘛？我有沒有聽牠的聲音？如果心裡雖然活在這個世界上，但沒有跟自己的內心相連結，只是一直在追求目標，而沒有跟自己合一，我覺得這很重要。",
    versions:[
      { level:'A1', d:'2026-07-16',
        fr:"Je fais du sport deux ou trois fois par semaine. Je fais du yoga avec ma femme. C'est bon pour le dos, parce que je travaille assis toute la journée. Je dors bien, mais pas assez longtemps.",
        zh:'我一週運動兩三次。我跟太太一起做瑜伽。這對背很好，因為我整天坐著工作。我睡得好，但睡不夠久。' },
      // ── 2026-09-01 v2：語言島第七座。180 字 / 約 83 秒。
      // ⭐ 一座補兩個 gap：AC1「你做什麼運動？」＋ AC3「工作的壓力你怎麼處理？」——兩題都升成 'ok'。
      // 四段：①運動的演變（重訓→功能性→瑜伽→游泳→拳擊）②為什麼這麼在意（大腿麻三個月）
      //       ③牙醫的身體負擔＋冥想 ④健康是什麼
      // 五個「加分」點：
      //   ・「拳擊台上只要你在想別的事，你就有危險」——別人沒有的細節，而且把運動接到專注上
      //   ・⭐⭐「大腿麻了三個月，是坐姿造成的神經壓迫」——具體到會被記住，
      //     而且它是整座島的因果核心：**先有這件事，才有後面所有的運動**。⛔ 不要拿掉。
      //   ・「現在是沒事了，但我的背還是不正」——誠實，沒有把故事收成勵志結局
      //   ・⭐「那不是放假：那只是在兩個念頭之間，一個我停下來、沒有人打斷我的時刻」——
      //     情緒＋抽象，全段最強的一句，而且是 B2 抽象段最好的接口
      //   ・「身體知道自己在做什麼。真正的問題是：我有沒有在聽它？」——收尾用問句，考官會停一下
      // ⛔ 刻意不重述舊島（原則 7）：
      //   ・AC2 講過「每個禮拜天全家去上瑜伽、Jolie 在教室裡玩」→ 這裡的瑜伽只是運動演變裡的一站，
      //     ⛔ 不重講那個畫面。v1 的「跟太太一起做瑜伽」也因此不帶進 v2。
      //   ・AC3 講過牙醫的工作內容 → 這裡只取「整天彎著腰」這個身體面向
      // 用上的近期結構（刻意）：
      //   ・depuis avant la pandémie／depuis l'enfance（21課 depuis）
      //   ・j'ai commencé／j'ai compris／j'ai eu／je suis passé（17課 passé composé，含 être 動詞 passer）
      //   ・mon corps ne travaillait pas／c'était un nerf comprimé（20課 imparfait）
      //   ・si tu penses à autre chose, tu es en danger（28課 si＋現在式＋現在式，常態）
      //   ・on est penché toute la journée（28課 on ＝ les gens/nous）
      //   ・un moment où je m'arrête et où personne ne me coupe（où 關係代名詞）
      //   ・ce qu'il fait（26課 ce que）
      { level:'A2', d:'2026-09-01',
        fr:"Je fais du sport deux ou trois fois par semaine, et ça a commencé avant la pandémie. J'ai commencé par la musculation, puis j'ai compris que mon corps ne travaillait pas ensemble : je suis passé au training fonctionnel, au yoga, et maintenant je nage. J'ai fait de la boxe aussi, pour l'explosivité — et parce que sur le ring, si tu penses à autre chose, tu es en danger.\n\nPourquoi j'y tiens autant ? Depuis l'enfance, je me tiens mal. Une fois, j'ai eu la cuisse engourdie pendant trois mois : c'était un nerf comprimé, à cause de ma position assise. Aujourd'hui ça va, mais mon dos n'est toujours pas droit. C'est pour ça que j'y fais autant attention.\n\nDentiste, on est penché toute la journée. Alors je vais régulièrement chez le masseur, et je médite. Ce ne sont pas des vacances : c'est juste, entre deux pensées, un moment où je m'arrête et où personne ne me coupe.\n\nPour moi, la santé, c'est l'unité du corps et de l'esprit. Le corps sait ce qu'il fait. La vraie question, c'est : est-ce que je l'écoute ?",
        zh:'我一週運動兩三次，從疫情前就開始了。一開始是重訓，後來發現我身體不是一起在動的：於是轉去做功能性訓練、瑜伽，現在還游泳。我也打過拳擊，為了爆發力——也因為在拳擊台上，只要你在想別的事，你就有危險。\n\n為什麼我這麼在意？我從小坐姿就不好。有一次我的大腿麻了三個月：是神經被壓迫，因為坐姿的關係。現在是沒事了，但我的背還是不正。我就是因為這樣才這麼在意。\n\n當牙醫，整天都是彎著腰。所以我會定期去推拿，也會冥想。那不是放假：那只是在兩個念頭之間，一個我停下來、而且沒有人打斷我的時刻。\n\n對我來說，健康就是身心合一。身體知道自己在做什麼。真正的問題是：我有沒有在聽它？' }
    ],
    // 2026-09-01 預測追問。cover：'ok'＝島接得住｜'part'＝要轉一下｜'gap'＝沒材料
    follow_ups:[
      { fr:"Vous faites du sport combien de fois par semaine ?", zh:'你一週運動幾次？', cover:'ok', from:null },  // v1 的「兩三次」已接進 v2 第一句
      { fr:"Le yoga, ça vous a aidé pour le dos ?", zh:'瑜伽對你的背有幫助嗎？', cover:'ok', from:null },
      { fr:"Comment vous gérez le stress au travail ?", zh:'工作的壓力你怎麼處理？', cover:'ok', from:'AC3 工作' },
      { fr:"La boxe, ce n'est pas dangereux ?", zh:'拳擊不危險嗎？', cover:'ok', from:null },
      { fr:"Vous dormez bien ?", zh:'你睡得好嗎？', cover:'part', from:null },  // v1 有「睡得好但不夠久」
      { fr:"Vous faites attention à ce que vous mangez ?", zh:'你會注意自己吃什麼嗎？', cover:'gap', from:'AC6 飲食' },
      { fr:"Au Canada, il fait froid : vous pourrez continuer le sport ?", zh:'加拿大很冷，你還能繼續運動嗎？', cover:'gap', from:'AC8 加拿大' },
      { fr:"La médecine chinoise, vous y croyez ?", zh:'你相信中醫嗎？', cover:'part', from:null },  // source_zh 有推拿整骨經絡，v2 只留 masseur
      { fr:"Vos patients aussi ont mal au dos ?", zh:'你的病人也會背痛嗎？', cover:'gap', from:'AC3 工作' },
      { fr:"Être en bonne santé, c'est le plus important dans la vie ?", zh:'健康是人生最重要的事嗎？', cover:'part', from:null }  // ⭐ 讓步段：這題就是這座島的 B2 施工圖
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
    // ⭐ 2026-09-01 Owen 的中文口述全文（逐字保留，⛔ 不要精簡）。慣例同 AC2／AC3／AC7／AC8。
    // ⚠️ 逐字保留的代價：「我可以在 40 歲錢財開始學一個新的語言」——「錢財」是語音轉文字
    //    把「前才」聽錯了（他 2026 年是 36 歲，AC7 有「三十六歲第一次去美洲」可交叉驗證）。
    //    ⛔ 原句不改（那是母本），法文版按「四十歲之前」寫。
    // ⚠️ v2 法文版刻意沒收進去的段落（＝之後升級 B1/B2 的第一批材料）：
    //    ・「利用 AI、家教等各種資源，不斷調整學習方向和方法」← 具體方法，中版可加回
    //    ・「這就是緣分」← ⭐ 抽象化＋宿命觀，B2 的料（法文寫得好會很加分。「考試也有考運」已收進 v2）
    //    ・「我只能針對政策，選擇機率高的方法去嘗試」← ⭐ 權衡兩個立場，B2 讓步段的核心料
    //    ・「我的生命就是不斷在發現自己的可能性」「其實我可以服務更多人」← 抽象化，B2
    //    ・「一切都不容易，但一切都需要發生」← 對仗，B2 的料
    //    ・「瑜伽、管理職的努力後來都放掉，專心當牙醫加讀法文，冥冥之中有次序性」← ⭐ 整段都是 B1/B2 敘事材料
    //    ・「最重要還是聽聽自己的聲音」← 收尾金句的備選（v2 選了「不想改變就是變老了」，兩句擇一，不要都用）
    source_zh:"【時間表與考試】我學法文的時間大概是一年，大概是從 2026 年的 5 月開始學。\n考試的話，預計在 2027 年的 4 月和 9 月都會去考。在這過程中，我會不斷調整學習方向和方法，利用 AI、家教等各種資源，讓自己準備得更好。我的目標是一年內要考過，但希望至少兩年內要考到 B2。\n\n【考不過怎麼辦】我一定會非常努力去考，不過很多事情不是我想怎樣就怎樣的，如果考不過，那就是能力不足，把能力補足就可以。當然考試也有考運，但如果語言說不順、聽不懂，那就是需要多練。\n\n【就算考過也可能去不成】也有可能考過之後，最後還是沒有辦法去加拿大，我覺得這就是緣分。因為政策隨時在改變，我只能針對政策，選擇機率高的方法去嘗試。不管最後有沒有去成，我的生活還是繼續過。我目前並沒有急著要舉家搬到加拿大去的想法，心裡想的還是在臺灣繼續過生活，只是做了一些這樣的調整和嘗試。我不希望這對生活有太大的影響，純粹是利用閒暇，或者是在工作、照顧小孩之餘，把握一段時間來努力。\n\n【到了加拿大的第一年】如果到了加拿大的第一年，我打算怎麼過？那時候我應該還是在準備牙醫考試，假日或空閒時間就多往戶外走。適應和調適也很重要，一定要想辦法讓自己融入。\n\n【移民之外，我自己想做什麼】除了移民以外，我自己想做什麼呢？\n我覺得我的生命就是不斷在發現自己的可能性。以前覺得當了牙醫、終老就好，但現在發現，其實我可以服務更多人。我可以在 40 歲錢財開始學一個新的語言、去挑戰新生活。一切都不容易，但一切都需要發生。我覺得當我開始不想改變的時候，應該就是變老了。所以不論是學習瑜伽，還是之前在工作管理職上的努力與發現，後來我把這些東西都放掉，專心當牙醫加上讀法文，我覺得這些安排都很特別，冥冥之中也有些次序性。\n最重要還是聽聽自己的聲音，在這樣的前提下，繼續往前走。",
    versions:[
      { level:'A1', d:'2026-07-16',
        fr:"Dans le futur, je vais voyager avec ma fille dans des pays que je ne connais pas. Avant l'école, je veux montrer le monde à ma fille. J'espère que ça va l'inspirer.",
        zh:'未來，我要帶女兒去我自己也沒去過的國家旅行。趁上學之前，我想讓女兒看看世界。我希望這可以啟發她。' },
      // ── 2026-09-01 v2：語言島第六座。189 字 / 約 87 秒（同 AC3 174/80、AC2 187/86、AC7 192/88 那條線）。
      // ⭐ 這座島一次補兩個 gap：AC3「如果你沒考過加拿大的考試，你會怎麼做？」＋
      //    AC8「如果你走不成，你會怎麼做？」——兩題都升成 'ok'。
      // 五段：①時間表與考試 ②考不過怎麼辦 ③⭐就算考過也可能去不成（讓步）
      //       ④到了加拿大的第一年 ⑤移民之外的我自己
      // 五個「加分」點：
      //   ・「2027 年四月考一次、九月再一次」——具體時間表，考官一定會追，含糊會被聽出來
      //   ・「沒考過就是程度不夠，多下功夫再考」——誠實、不悲情、不找藉口
      //   ・⭐「我並不急著全家搬過去，我的生活在這裡。不管走不走得成，我的生活照樣過」——
      //     ⭐⭐ 這段是這座島最貴的東西：**天然的讓步**，而且極少考生會這樣講（大部分人講得像非去不可）。
      //     B2 升級時整段換成 Certes… mais／Bien que＋subjonctif 就成立，不用另外想材料。
      //   ・「第一年還在準備牙醫考試，週末往戶外走」——具體，而且接回 AC3（重考執照）與 AC7（戶外）
      //   ・⭐「等到哪天我不想改變了，那天我就老了」——情緒＋抽象，全段最強的收尾
      // ⛔ 刻意不重述舊島（原則 7）：
      //   ・AC8 講完「為什麼去加拿大」（四個理由）→ 這裡一個理由都不重講
      //   ・AC3 講完「加拿大要重考執照」→ 這裡只用一句當第一年的節奏，不展開
      //   ・AC7 講完戶外與自然 → 這裡只留 j'irai dehors 一個動作，不描寫
      //   ・v1 的「帶女兒去沒去過的國家」現在跟 AC7 重疊 → v2 不帶，v1 留著當歷史
      // 用上的近期結構（刻意）：
      //   ・je passerai／je travaillerai／je recommencerai／je préparerai／j'irai／je serai（27課 futur simple 連發）
      //   ・Si je ne réussis pas, … je travaillerai（28課 si＋現在式＋未來式）
      //   ・le jour où je n'aurai plus envie de changer, ce jour-là je serai vieux（28課 quand/le jour où ＋未來式＋未來式）
      //   ・Il faudra vraiment s'intégrer（29課 obligation il faut，這裡用未來式）
      //   ・Avant, je pensais que… c'était（20課 imparfait 的「以前都這樣」用法）
      //   ・Que je parte ou non（⚠️ subjonctif，見下方註記）
      // ⚠️ 一個要 Owen 知道的翻譯決定：「不管最後有沒有去成」寫成 Que je parte ou non，
      //    parte 是 subjonctif（B1）。這是法文表達「不管…或…」的固定說法，
      //    A2 範圍內沒有等價講法（Si je pars ou si je ne pars pas 又長又拗口）。
      //    ⭐ 它同時就是這座島升級 B2 時第一個要擴寫的位置——整個第③段是讓步段的骨架。
      { level:'A2', d:'2026-09-01',
        fr:"J'ai commencé le français en mai 2026. En 2027, je passerai l'examen deux fois : en avril et en septembre. Mon objectif, c'est de réussir en un an — et au maximum en deux ans, d'atteindre le B2.\n\nSi je ne réussis pas, c'est simplement que mon niveau n'est pas encore assez bon : alors je travaillerai plus et je recommencerai. Il y a aussi une part de chance. Mais si je ne comprends pas, il faut pratiquer, c'est tout.\n\nEt même si je réussis, je ne partirai peut-être pas : les politiques changent tout le temps. Je ne suis pas pressé de déménager avec toute ma famille — ma vie est ici, à Taïwan. Je fais tout ça sur mon temps libre, entre le travail et ma fille. Que je parte ou non, ma vie continue.\n\nLa première année au Canada, je préparerai encore l'examen de dentiste, et le week-end j'irai dehors. Il faudra vraiment s'intégrer.\n\nÀ part ça ? Avant, je pensais qu'être dentiste, c'était toute ma vie. Aujourd'hui, avant mes quarante ans, j'apprends une nouvelle langue. Rien n'est facile, mais le jour où je n'aurai plus envie de changer, ce jour-là je serai vieux.",
        zh:'我 2026 年五月開始學法文。2027 年我會考兩次：四月一次、九月一次。我的目標是一年內考過——最慢兩年內要到 B2。\n\n如果沒考過，那就單純是我的程度還不夠：那我就多下點功夫，再考一次。考試當然也有考運。但如果聽不懂，那就是要練，就這樣。\n\n而且就算考過了，我也可能走不成：政策一直在變。我並不急著全家搬過去——我的生活在這裡，在台灣。這些都是我用空閒時間做的，在工作和帶小孩之間。不管走不走得成，我的生活照樣過。\n\n到加拿大的第一年，我應該還在準備牙醫考試，週末就往戶外走。一定要想辦法融入。\n\n除了這些呢？以前我以為當牙醫就是我的一輩子。現在，四十歲之前，我在學一個新的語言。沒有一件事是容易的，但等到哪天我不想改變了，那天我就老了。' }
    ],
    // 2026-09-01 預測追問。cover：'ok'＝島接得住｜'part'＝要轉一下｜'gap'＝沒材料
    // ⭐ gap／part 這幾題就是 B2 升級層的施工圖，見 STRATEGY 原則 6
    follow_ups:[
      { fr:"Vous apprenez le français depuis quand ?", zh:'你學法文多久了？', cover:'ok', from:null },
      { fr:"Si vous ne réussissez pas l'examen, qu'est-ce que vous ferez ?", zh:'如果考不過，你會怎麼做？', cover:'ok', from:'AC3 工作' },
      { fr:"Et si vous ne pouvez pas partir au Canada ?", zh:'那如果最後去不成加拿大呢？', cover:'ok', from:'AC8 加拿大' },
      { fr:"Comment vous apprenez le français ? Avec un professeur ?", zh:'你怎麼學法文的？有老師嗎？', cover:'part', from:null },  // source_zh 有「AI、家教」，v2 砍掉了
      { fr:"Vous trouvez le temps d'étudier avec votre travail et votre fille ?", zh:'工作又要顧小孩，你怎麼找時間念？', cover:'part', from:'AC2 家庭' },
      { fr:"Vous n'êtes pas pressé ? Pourquoi faire tout ça alors ?", zh:'你不急？那為什麼還要做這些？', cover:'part', from:'AC8 加拿大' },  // ⭐ 這題會逼出讓步段
      { fr:"L'examen de dentiste au Canada, c'est difficile ?", zh:'加拿大的牙醫考試很難嗎？', cover:'part', from:'AC3 工作' },
      { fr:"Qu'est-ce qui est le plus difficile en français pour vous ?", zh:'法文對你來說最難的是什麼？', cover:'gap', from:null },
      { fr:"Dans dix ans, vous vous voyez où ?", zh:'十年後你覺得自己會在哪？', cover:'gap', from:null },
      { fr:"Et votre fille, quels sont vos projets pour elle ?", zh:'那你女兒呢？你對她有什麼打算？', cover:'gap', from:'AC2 家庭' }
    ] },
];

function acActiveVersion(card) { return card.versions[card.versions.length - 1]; }
