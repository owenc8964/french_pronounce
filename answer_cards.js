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
      { fr:"Qu'est-ce que vous lisez en ce moment ?", zh:'你最近在看什麼書？', cover:'gap', from:null },
      { fr:"Vous faites quel sport ?", zh:'你做什麼運動？', cover:'gap', from:'AC11 健康' },
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
      { fr:"Qu'est-ce qui vous manquera le plus de Taïwan ?", zh:'你最會想念台灣的什麼？', cover:'part', from:null },
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
