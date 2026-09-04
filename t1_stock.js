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
  { hook:'analytique', src:null, mots:null, sec:null, level:1, gap:true,
    q_fr:"Être analytique, ça vous aide dans votre travail ?", q_zh:'分析型的個性對你的工作有幫助嗎？',
    fr:null, zh:null,
    note:"⚠️ 島裡沒有現成材料。AC1 有「我是分析型的」、AC3 有工作內容，但**兩者沒有接起來**。⭐ 這一句要 Owen 自己講：分析型的個性在看診時具體幫到什麼。⛔ 不代筆。" },

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
    q_fr:"Vous trouvez le français difficile ?", q_zh:'你覺得法文難嗎？' }
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
