/* ============================================================
   t1_stock.js — TCF Tâche 1（entretien dirigé）的開場版與追問存貨
   ------------------------------------------------------------
   2026-09-04 建立。⚠️ 這個檔存在的理由（研究依據見 research/2026-09-04_T1_entretien_dirige.md）：

   ⭐ T1 只有 120 秒，而 AC1 v2 講完是 93 秒 → 一座島吃掉 78%。
     官方評分準則第一個字是 `interaction` → 講滿 120 秒＝把互動空間佔光＝拿不到 B2。
     → 正確打法是「45–60 秒開場 ＋ 接 1–2 個追問」。

   ⭐⭐ 而追問是被「剛出口的那個詞」觸發的，不是被主題觸發。
     → 所以存貨照「勾子（hook）」收，不照主題收。
     → 開場放哪些勾子＝你在決定考官會問什麼。存貨薄的主題就不要放勾子。

   ⛔ 內容全部來自既有的八座島（Owen 自己口述的 source_zh → v2）。
     這個檔**沒有新增任何內容**，只是重新標記段落用途。改內容要回去改島。
     ⚠️⚠️ 2026-09-04 建檔當天踩到的坑：修剪時**順手「改進」了法文**——
     把 `quand quelque chose` 換成更高階的 `dès que`、把 `le professeur` 改成 `la professeure`
     （⛔ 那是憑空改事實）。已全部修回島原文。
     ⭐ **只准刪字與合併句子，⛔ 不准換詞、換句法、換事實。** 建檔後有自動驗證會逐句比對島原文。

   欄位：
     opening      45–60 秒的 T1 開場（⭐ 只有 AC1 有，其餘島本身就是存貨）
     stock[]      hook＝開場裡會招來這題的那個詞
                  q_fr/q_zh＝預期的追問
                  fr/zh＝30–40 秒的短答
                  src＝取自哪座島的第幾段
                  gap＝⚠️ 島裡沒有現成材料、要 Owen 自己補的部分（true 時 fr 為 null）

   ⚠️ T1 的短答判準（依 research §5.4 T1-1）：**每個回答至少兩句，
     第二句要有「為什麼／對我的影響」**——只回答事實會被壓在 B1。

   ⚠️⚠️ 2026-09-04 Owen：「**法文我目前沒有什麼太多口語習慣，因為很不會。**」
     ⭐ 所以「這句像不像 Owen 講的」這個檢查，**A2 階段他做不到**——
     他的語氣目前只存在於中文（`source_zh`），**法文版的語氣是 Claude 的選擇**。
     → 驗收要拆成兩層：**中文意思 Owen 驗｜法文自然度老師驗**。
     ⛔ 不要叫他判法文語氣。等他的法文長出自己的習慣，這條再改。
   ============================================================ */

const T1_OPENING = {
  from: 'AC1 §1+§2+§3 ＋ AC2 §1（第二段跨島取自 AC2）',
  mots: 91,
  sec: '53–60',
  // ⛔ 砍掉 57%（206 → 89）。留下的三塊各自的理由見 HANDOFF 2026-09-04。
  fr: "Je m'appelle Owen, j'ai 36 ans et je suis dentiste. Je suis quelqu'un d'analytique : j'aime classer les choses et faire des liens entre elles. Je suis plutôt rationnel, mais pas au point d'être ingénieur !\n\nJ'habite à Banqiao, près de Taipei. Je vis avec ma femme Lauryn et notre fille Jolie.\n\nJ'ai commencé le français en mai, cette année. Je prends des cours et j'écoute le podcast Coffee Break French. Pour moi, apprendre, ce n'est pas seulement passer du temps : le plus important, c'est de trouver la bonne méthode.",
  zh: "我叫 Owen，36 歲，是牙醫。我是一個分析型的人：我喜歡把事情分類、然後把它們連起來。我算是理性的，但還沒到工程師那種程度！\n\n我住在台北附近的板橋。我跟太太 Lauryn 和我們的女兒 Jolie 住在一起。\n\n我今年五月開始學法文。我有上課，也聽 Coffee Break French 這個 podcast。對我來說，學習不只是花時間：最重要的是找到對的方法。",
  // ⭐ 開場裡刻意放的勾子（＝你在設定考官會問什麼）
  hooks: ['dentiste', 'analytique', 'Banqiao', 'Lauryn', 'Jolie', 'en mai', 'Coffee Break French', 'la bonne méthode']
};

const T1_STOCK = [
  // ── dentiste ────────────────────────────────────────────────
  { hook:'dentiste', src:'AC3 §1+§3', mots:58, sec:35, level:1,
    q_fr:"Vous êtes dentiste ? Parlez-moi de votre travail.", q_zh:'你是牙醫？跟我說說你的工作。',
    // ⭐ 事實 → 「我喜歡什麼」→ 一個有人有情境的例子（B2 的 exemples pertinents）
    // ⭐ 刻意保留直接引述：文法比間接引述簡單，而且更有畫面
    fr:"Je suis dentiste. Je travaille cinq jours par semaine et je vois une quinzaine de patients par jour.\n\nCe que j'aime, c'est donner confiance. Un jour, un jeune patient avait trop peur pour se soigner. Je lui ai dit : « Vous pouvez arrêter quand vous voulez. » Il a terminé son traitement. Aujourd'hui, son sourire a changé.",
    zh:"我是牙醫。我一週看五天診，一天大概看十五個病人。\n\n我喜歡的是給人信心。有一次，一個年輕病人怕到不敢治療。我跟他說：「你隨時都可以停。」他把療程做完了。今天，他的笑容不一樣了。" },

  { hook:'dentiste', src:'AC3 §2', mots:71, sec:43, level:2,
    q_fr:"Pourquoi avez-vous choisi ce métier ?", q_zh:'你為什麼選這一行？',
    fr:"Mais honnêtement, je n'ai pas choisi ce métier par passion : à Taïwan, ce sont les notes qui décident. La passion est venue après, quand j'ai commencé à travailler. J'ai même un camarade qui a fait les mêmes études et qui est devenu photographe à New York. Alors je pense que les enfants doivent explorer leurs rêves plus tôt — et c'est aussi pour ça que je veux partir au Canada.",
    zh:"但老實說，我不是因為熱情才選這一行：在台灣，是分數在決定。熱情是後來、真的開始工作以後才出現的。我甚至有一個同學，跟我念一樣的書，後來去紐約當了攝影師。所以我覺得小孩應該早一點探索自己的理想——這也是我想去加拿大的原因。" },

  { hook:'dentiste', src:'AC3 §4', mots:21, sec:13, level:3,
    q_fr:"Vous pourrez travailler comme dentiste au Canada ?", q_zh:'你到加拿大能當牙醫嗎？',
    fr:"Au Canada, si je veux exercer, je devrai repasser les examens. Ce sera long, mais je ferai tout pour y arriver.",
    zh:"到加拿大，如果我想執業，我就必須重考。過程會很久，但我會盡全力做到。" },

  // ── analytique ──────────────────────────────────────────────
  { hook:'analytique', src:'Owen 2026-09-04 口述', mots:42, sec:25, level:1,
    q_fr:"Être analytique, ça vous aide dans votre travail ?", q_zh:'分析型的個性對你的工作有幫助嗎？',
    // ⭐ 這一筆是唯一不出自八座島的——2026-09-04 Owen 現場口述，Claude 只翻成他學過的結構。
    // Owen 原話：「分析型當然有好處啊！牙科工作的細節及問題需要分析編排後才能找出解方，
    //             讓病人的問題能被妥善處理」
    // ⭐ 刻意重用 AC1 開場裡他自己的動詞（classer / faire des liens）→ 跟開場扣在一起
    // 用上的結構：il faut＋原形（29課）／les classer 代名詞前置／C'est comme ça que（26課 c'est 強調）
    // ⚠️ 中文原話「被妥善處理」是被動；法文改成主動 je peux bien soigner——被動是 B1+，
    //    而說版的原則是「簡單但不斷」（STRATEGY 原則 1）。
    fr:"Oui, beaucoup. Dans mon travail, il y a beaucoup de détails et de problèmes. Il faut d'abord les classer et faire des liens entre eux, et après on peut trouver une solution. C'est comme ça que je peux bien soigner mes patients.",
    zh:"有，很有幫助。我的工作裡有很多細節和問題。要先把它們分類、然後把它們連起來，之後才找得到解方。就是這樣我才能好好照顧我的病人。" },

  // ── Banqiao ─────────────────────────────────────────────────
  { hook:'Banqiao', src:'AC1 §2', mots:42, sec:25, level:1,
    q_fr:"C'est comment, votre quartier ?", q_zh:'你住的那一區怎麼樣？',
    fr:"J'habite dans un immeuble. Le quartier est très ouvert et la gare est tout près. Il y a moins de petits restaurants qu'ailleurs et c'est un peu plus cher, mais j'aime vivre ici : les voisins sont gentils et tout est propre.",
    zh:"我住大樓。這一區很空曠，車站也很近。這裡的小吃比別的地方少，物價也高一點，但我很喜歡住這裡：鄰居很友善，環境也很乾淨。" },

  // ── Lauryn ──────────────────────────────────────────────────
  { hook:'Lauryn', src:'AC2 §1尾+§2', mots:52, sec:31, level:1,
    q_fr:"Votre femme, elle fait quoi ?", q_zh:'你太太做什麼？',
    fr:"Lauryn travaille aussi : elle est dans le secteur de la technologie.\n\nQuand je lui ai parlé du Canada, elle était contente. À Taïwan, la vie est très confortable, il y a des supérettes partout, mais les logements sont de plus en plus chers. Pour élever un enfant, ce n'est pas idéal.",
    zh:"Lauryn 也在工作，她做科技產業相關的。\n\n我跟她講加拿大的計畫時，她很開心。在台灣生活很舒適，到處都是便利商店，但房子越來越貴。以養小孩來說，這不太理想。" },

  // ── Jolie ───────────────────────────────────────────────────
  { hook:'Jolie', src:'AC2 §1', mots:29, sec:17, level:1,
    q_fr:"Elle a quel âge, votre fille ?", q_zh:'你女兒幾歲？',
    fr:"Jolie a un an et demi : elle vient d'apprendre à marcher et à parler. Elle est très aventurière — quand quelque chose l'intéresse, elle fait tout pour l'attraper.",
    zh:"Jolie 一歲半，剛學會走路和講話。她個性很冒險——只要有什麼東西她有興趣，她就會想盡辦法拿到。" },

  { hook:'Jolie', src:'AC2 §3', mots:52, sec:31, level:2,
    q_fr:"Qu'est-ce que vous faites le week-end avec elle ?", q_zh:'週末你們跟她做什麼？',
    fr:"Le week-end, c'est le temps de la famille. Chaque dimanche matin, on fait du yoga tous les deux et Jolie joue dans la salle : le professeur est très ouvert, alors elle explore librement. On profite aussi du soleil et de la nature — à Taïwan, on n'a pas souvent le temps.",
    zh:"週末是家庭時間。每個禮拜天早上我們兩個去上瑜伽，Jolie 就在教室裡玩：老師很開放，所以她可以自由探索。我們也會享受陽光和大自然——在台灣不常有這個時間。" },

  // ── en mai（學法文多久）─────────────────────────────────────
  { hook:'en mai', src:'AC15 §1', mots:38, sec:23, level:1,
    q_fr:"Vous apprenez le français depuis quand ?", q_zh:'你學法文多久了？',
    fr:"J'ai commencé le français en mai 2026. En 2027, je passerai l'examen deux fois : en avril et en septembre. Mon objectif, c'est de réussir en un an — et au maximum en deux ans, d'atteindre le B2.",
    zh:"我 2026 年五月開始學法文。2027 年我會考兩次：四月一次、九月一次。我的目標是一年內考過——最慢兩年內要到 B2。" },

  // ── Coffee Break French ─────────────────────────────────────
  { hook:'Coffee Break French', src:'AC1 §3', mots:23, sec:14, level:1,
    q_fr:"Comment vous apprenez le français ?", q_zh:'你怎麼學法文的？',
    fr:"Je prends des cours, et j'utilise aussi Duolingo et l'IA. J'écoute le podcast Coffee Break French et je regarde la série Extra French.",
    zh:"我有上家教，也用 Duolingo 和 AI。我聽 Coffee Break French 這個 podcast，也看 Extra French 這部影集。" },

  // ── la bonne méthode ────────────────────────────────────────
  { hook:'la bonne méthode', src:'AC1 §4', mots:35, sec:21, level:1,
    // ⭐⭐ 全系統最特別的一句。刻意從開場砍下來放這裡：
    //    它抽象、長、最容易講崩，而開場崩掉最傷。放在追問位，你有時間，風險小得多。
    fr:"Le français est une langue très spéciale. Quand je le parle, j'ai l'impression de changer de regard : parfois c'est flou, parfois c'est net — et quand c'est flou, je vois le monde plus largement.",
    zh:"法文是一個很特別的語言。我講法文的時候，好像會換一種眼光看事情：有時候是模糊的，有時候是清楚的——而模糊的時候，我反而看見更大的世界。",
    q_fr:"Vous trouvez le français difficile ?", q_zh:'你覺得法文難嗎？' },

  /* ══ 以下是「考官直接問」的標準題（direct:true）══
     ⭐ 這一批不靠開場的勾子觸發——官方列的 T1 提問範圍是
        身分／現況／婚姻家庭／學經歷／喜好／計畫，就算開場沒提到，考官也會問。
     ⚫ 其中 `une journée typique` 是研究點名的最大缺口：最高頻主題題 ＋ 唯一具名的追問範例。 */

  { hook:'une journée typique', direct:true, src:'AC3 §1 + AC11 §3 + AC2 §3', mots:40, sec:24, level:1,
    q_fr:"Parlez-moi d'une journée typique.", q_zh:'跟我說說你平常的一天。',
    // ⚫ 材料本來就散在三座島，這裡只是重組——不是新內容
    fr:"Je travaille cinq jours par semaine et je vois une quinzaine de patients par jour. Dentiste, on est penché toute la journée. Alors je vais régulièrement chez le masseur, et je médite. Le week-end, c'est le temps de la famille.",
    zh:"我一週看五天診，一天大概看十五個病人。當牙醫，整天都是彎著腰。所以我會定期去推拿，也會冥想。週末是家庭時間。" },

  { hook:'temps libre', direct:true, src:'AC5 §2', mots:36, sec:22, level:1,
    q_fr:"Qu'est-ce que vous faites pendant votre temps libre ?", q_zh:'你空閒時間都做什麼？',
    fr:"Quand j'ai du temps libre, je le passe avec ma famille. J'ai hâte de voir ma fille grandir et devenir quelqu'un. Et parfois je m'arrête seul — un café, un thé dehors, en regardant le paysage.",
    zh:"有空的時候，我都跟家人在一起。我很期待看著女兒長大、慢慢變成一個人。有時候我也會一個人停下來——一杯咖啡、在戶外喝茶、看看風景。" },

  { hook:'sport', direct:true, src:'AC11 §1', mots:28, sec:17, level:1,
    q_fr:"Vous faites du sport ?", q_zh:'你有運動嗎？',
    fr:"Je fais du sport deux ou trois fois par semaine. J'ai commencé par la musculation, puis je suis passé au training fonctionnel, au yoga, et maintenant je nage.",
    zh:"我一週運動兩三次。一開始是重訓，後來轉去做功能性訓練、瑜伽，現在還游泳。" },

  { hook:'sport', direct:true, src:'AC11 §2', mots:37, sec:22, level:2,
    q_fr:"Pourquoi c'est important pour vous ?", q_zh:'為什麼這對你很重要？',
    // ⭐ 這一段是全島最強的：有時間（三個月）、有具體病症、有因果
    fr:"Depuis l'enfance, je me tiens mal. Une fois, j'ai eu la cuisse engourdie pendant trois mois : c'était un nerf comprimé, à cause de ma position assise. Aujourd'hui ça va, mais mon dos n'est toujours pas droit.",
    zh:"我從小坐姿就不好。有一次我的大腿麻了三個月：是神經被壓迫，因為坐姿的關係。現在是沒事了，但我的背還是不正。" },

  { hook:'voyage', direct:true, src:'AC7 §2', mots:37, sec:22, level:1,
    q_fr:"Vous aimez voyager ? Racontez-moi un voyage.", q_zh:'你喜歡旅行嗎？講一次旅行給我聽。',
    fr:"Mon plus beau souvenir, c'est l'Islande. Je me souviens d'un moment précis : j'étais devant une cascade immense, et il n'y avait aucune barrière. Rien entre la nature et moi. C'était aussi ma première fois au volant.",
    zh:"我最難忘的旅行是冰島。我記得一個很具體的瞬間：我站在一座巨大的瀑布前面，沒有任何圍欄。我跟大自然之間什麼都沒有。那也是我第一次自己開車。" },

  { hook:'projets', direct:true, src:'AC15 §5', mots:36, sec:22, level:1,
    q_fr:"Vous avez des projets ?", q_zh:'你有什麼計畫嗎？',
    // ⭐ 收尾金句：情緒＋抽象，T1 少見的深度
    fr:"Avant, je pensais qu'être dentiste, c'était toute ma vie. Aujourd'hui, avant mes quarante ans, j'apprends une nouvelle langue. Rien n'est facile, mais le jour où je n'aurai plus envie de changer, ce jour-là je serai vieux.",
    zh:"以前我以為當牙醫就是我的一輩子。現在，四十歲之前，我在學一個新的語言。沒有一件事是容易的，但等到哪天我不想改變了，那天我就老了。" },

  { hook:'Canada', direct:true, src:'AC8 §1+§2', mots:25, sec:15, level:1,
    q_fr:"Pourquoi le Canada ?", q_zh:'為什麼是加拿大？',
    // ⚠️ AC8 是 T3 規格的四段論證（230 mots）。T1 只要最短的一個理由，⛔ 不要在 T1 講完整版
    fr:"Je veux partir au Canada avec ma famille. D'abord, l'éducation : à Taïwan, les enfants apprennent tout par cœur. Au Canada, l'école est plus ouverte.",
    zh:"我想跟家人一起去加拿大。首先是教育：在台灣，小孩什麼都用背的。在加拿大，學校比較開放。" },

  { hook:'études', direct:true, src:null, mots:null, sec:null, level:1, gap:true,
    q_fr:"Vous avez fait quelles études ?", q_zh:'你念的是什麼？',
    fr:null, zh:null,
    note:"⚠️ 學經歷是官方列的 T1 提問範圍之一，但 AC4 教育／學歷只有 A1 短版（28 mots）。⭐ 這一題要 Owen 講：牙醫系念哪裡、幾年、印象最深的是什麼。⛔ 不代筆。" },
];

/* ── 用法 ────────────────────────────────────────────────────
   t1StockFor('dentiste')      → 該勾子的所有短答，依 level 排序（第幾次被追）
   t1Gaps()                    → 還沒有材料、要 Owen 自己講的那幾題
   ⚠️ level 的意思：同一個勾子被追問第 N 次時用哪一段。
      AC3 剛好是「一段開場勾子 ＋ 三段存貨」——那不是巧合，是當初寫島時一段一個重點。
   ────────────────────────────────────────────────────────── */
function t1StockFor(hook) {
  return T1_STOCK.filter(s => s.hook === hook && !s.gap)
                 .sort((a, b) => (a.level || 1) - (b.level || 1));
}
function t1Gaps() { return T1_STOCK.filter(s => s.gap); }
