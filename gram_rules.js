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
    lessons:[9,11,12,15], topics:['pronoms-toniques','cod-pronouns','pronom-y'], unlocked:true,   // 08-28：on-vs-nous 移到獨立的 pronom-on 點（第28課把它拉成完整的一節）
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

  { id:'pronoms-y-en', name:'Pronoms y / en', icon:'📍', zone:'A2', cat:'pronoms',
    lessons:[21,29], topics:['pronoms-y-en'], unlocked:true,
    rule:{
      title:'y 與 en — 兩個地方代名詞',
      why:'法文不喜歡把講過的地方再講一次，所以給了兩個超短的替身。它們的分工不是隨機的：y 來自拉丁文 ibi（在那裡），en 來自 inde（從那裡）——一個管「在／去」，一個管「從」，兩千年沒變過。所以判斷方式不是背表，是問方向：這句是「去那裡」還是「從那裡回來」。而它們之所以插在動詞前面，跟 COD 代名詞同一個原因——都是被磨到沒有重音的小音節，只能靠在動詞身上站著。',
      points:[
        'y ＝ 取代 à／sur／sous／dans ＋ 地點：「在那裡、去那裡」',
        'en ＝ 取代 de／du／de la／des ＋ 地點：「從那裡（來／回來／離開）」',
        '⚡ 判斷口訣：先問「這句是去還是回」——去/在→y，從那裡→en',
        '位置：夾在主詞和動詞中間（J\'y vais／Je m\'y promène）',
        '⚠️ passé composé 放在「助動詞」前面，不是分詞前面：Il en est parti ✅／Il est en parti ❌',
        '⚠️ 否定把 ne…pas 包住「y/en＋助動詞」整組：On n\'y a pas dormi',
        '同一個問句可以用 y 也可以用 en，取決於你自己怎麼造回答句：je n\'en suis pas sorti（沿用 sortir de）vs j\'y suis encore（改講「還在那裡」）',
        'ici（近）／là-bas（遠）也能代替地方，常跟 y 互換：J\'y vais ＝ Je vais là-bas',
        '⚠️ Il part en Australie 的 en 是「去某國」的介係詞，不是代名詞——代名詞要用 y（Il y va）',
        '⭐ 2026-08-31（第29課）：en 的第二個身分是「取代量」——只要那個東西前面是 de／du／de la／des，就用 en 收掉',
        'en 也取代不定冠詞 une／un／des，但⚠️ 數字要留下來：Tu as une grande poêle ? → J\'en ai une',
        '⚠️ 精確數量與數量副詞也一樣留在後面：je n\'en propose pas trois／j\'en consomme beaucoup',
        '⚠️⚠️ passé composé 的 en 放在**助動詞**前面：J\'en ai mangé／Je n\'en ai pas mangé',
        '⚠️⚠️ en vs le/la：不特定的「量」用 en，特定的那一個東西用 le/la（j\'en veux vs je le veux）',
        '⛔ vouloir 後面不能空著：不能只說「Oui, je veux」，要 j\'en veux 或 je le veux',
        '⚠️ 口語常把 ne 吃掉：j\'en ai pas（＝je n\'en ai pas）',
      ],
      examples:[
        { fr:'Le climat est agréable sur cette île ? — Oui, il y est très agréable.', zh:'這島氣候好嗎？——那裡很好。（sur→y）' },
        { fr:"Tu reviens de la plage ? — Oui, j'en reviens à l'instant.", zh:'你從海灘回來？——剛回來。（de→en）' },
        { fr:"Vous avez dormi sous la tente ? — Non, on n'y a pas dormi.", zh:'睡帳篷了嗎？——沒睡那裡。（否定＋PC 的位置）' },
        { fr:'Il est parti du chalet ? — Il en est parti à 6 h.', zh:'他從木屋走了？——6點從那裡走的。' },
        { fr:'Tu as une grande poêle ? — Oui, j\'en ai une.', zh:'你有大平底鍋嗎？——有，我有一個。（⚠️ une 要留下來）' },
        { fr:'Vous consommez beaucoup de fruits ? — Oui, j\'en consomme beaucoup.', zh:'你們吃很多水果嗎？——對，我吃很多。' },
        { fr:'Je n\'en ai pas mangé.', zh:'我沒吃過。（n\' ＋ en ＋ 助動詞 ＋ pas ＋ 分詞）' },
        { fr:'De l\'eau ? j\'en veux. / L\'ordinateur ? je le veux.', zh:'水？我要一些。／那台電腦？我要它。（en 是量、le 是特定那個）' },
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
    lessons:[10,11,14,17,19], topics:['passe-compose','passe-recent'], unlocked:true,
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

  { id:'imparfait', name:"L'imparfait", icon:'🌊', zone:'A2', cat:'verbe-temps',
    lessons:[15,20], topics:['imparfait'], unlocked:true,
    rule:{
      title:'未完成過去式 — 描述過去的狀態與習慣（完整六人稱）',
      why:'法文的兩個過去式不是「兩套要背的規則」，是攝影機的兩顆鏡頭：imparfait 是廣角鏡拍背景（當時天氣如何、場景長怎樣——名字本身就是拉丁文「未完成」，事情攤在那裡沒有起訖），passé composé 是特寫鏡頭拍事件（然後發生了什麼）。問自己「這句是佈景還是劇情」，鏡頭就選對了。至於變位為什麼要繞去 nous 形——因為 nous 形保留了動詞真正的字根（finissons 的 -iss-、écrivons 的 v），原形反而是被磨掉的版本；而字根一律避開 r 音，是為了不跟未來式（-rai/-ras）撞聲音。',
      points:[
        '字尾所有動詞都一樣，零例外：-ais / -ais / -ait / -ions / -iez / -aient',
        '字根＝présent 的 nous 形砍掉 -ons（finir→nous finissons→finiss-；écrire→nous écrivons→écriv-）',
        '⚠️ 不能砍原形！-er 動詞剛好兩種砍法同結果，碰到 -ir / -re 動詞就整組錯',
        'être 是唯一例外字根：ét- → j\'étais',
        '拼字微調：-ger 在 a 開頭字尾前保留 e（je mangeais / nous mangions）、-cer 變 ç（je déplaçais / nous déplacions）',
        '⚠️ 字根本身以 i 結尾的動詞會出現雙 i：nous étudiions、nous riions（寫作扣分點）',
        '用途分工：背景/狀態/過去習慣用 imparfait，「發生了一次的事」用 passé composé，同一段話兩者常並存',
        '時間副詞是路標：souvent／toujours／chaque jour／de temps en temps／à cette époque／quand j\'étais petit → imparfait',
        '🔊 je/tu/il/ils 四個字尾同音（/ɛ/），聽力靠主詞分辨不是靠字尾',
      ],
      examples:[
        { fr:"Hier, il faisait mauvais.", zh:'昨天天氣不好。（描述→imparfait）' },
        { fr:"Quand j'étais petit, je partais en vacances avec mes parents.", zh:'我小時候會跟父母去度假。（過去習慣）' },
        { fr:"Je mangeais beaucoup, mais j'ai grossi.", zh:'我以前吃很多，但我變胖了。（習慣 imparfait ＋ 單次事件 PC）' },
        { fr:"Chaque semaine, nous étudiions ensemble.", zh:'我們每週一起讀書。（⚠️ 雙 i）' },
      ]}},

  { id:'negation', name:'Négation & quantités', icon:'🚫', zone:'A2', cat:'base',
    lessons:[1,6,16,18,19], topics:['negation','frequency-adverbs','intensite'], unlocked:true,
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
    lessons:[7,8,10,19,22], topics:['adjective-agreement','adjective-position'], unlocked:true,
    rule:{
      title:'形容詞 — 性數配合＋位置決定意思',
      why:'形容詞是名詞的衛星，衛星穿主星的制服——這是拉丁文傳下來的整套配合邏輯，跟冠詞、所有格是同一件事。位置的大原則：客觀分類的形容詞放後面（une voiture rouge），少數超高頻的主觀評價字（美醜好壞大小新舊，BAGS）搶到名詞前面的黃金位置。bel/nouvel 母音前變形跟 mon amie 完全同一個理由：法文不准兩個母音相撞。',
      points:[
        '基本配合：陰性+e（grand→grande）、複數+s（grands）、陰複+es（grandes）',
        '常見變形：-eux→-euse（courageux→courageuse）、-if→-ive、-er→-ère；有些不變（rouge, drôle）',
        '大多放名詞後：une robe bleue；BAGS類（美醜好壞大小新舊）放前面：un beau garçon、une nouvelle voiture',
        '母音前特殊形：beau→bel（un bel homme）、nouveau→nouvel（un nouvel ordinateur）',
        '形容詞在前時 des → de：de beaux objets',
        '⚠️ 國籍・顏色・形狀三類「一律」放名詞後（客觀分類）：une île espagnole、des bateaux blancs',
        '⚡ 兩個形容詞同時出現：短的在前、國籍/顏色在後，名詞夾中間——un bon restaurant français、de gros bateaux blancs',
        '✍️ 本該在後的形容詞刻意提前＝強調，句子更有感情：Les boutiques incroyables → Les incroyables boutiques !',
        '⚠️ 少數形容詞位置改變意思，最常見的是 propre：mon propre mug（我自己的）vs un mug propre（乾淨的）',
      ],
      examples:[
        { fr:'Elle porte des jupes courtes.', zh:'她穿短裙。（陰複+es）' },
        { fr:'Un bel homme.', zh:'一個美男子。（母音前beau→bel）' },
        { fr:'De beaux objets.', zh:'一些漂亮的物品。（形容詞在前des→de）' },
        { fr:'un bon restaurant français', zh:'一家好的法式餐廳（短的在前、國籍在後）' },
        { fr:"d'excellentes épices", zh:'一些極好的香料（形容詞在前，母音前 des→d\'）' },
        { fr:'mon propre mug / un mug propre', zh:'我自己的杯子／一個乾淨的杯子（位置改變意思）' },
      ]}},

  { id:'comparaison', name:'La comparaison', icon:'⚖️', zone:'A2', cat:'adjectifs',
    lessons:[14,25,26], topics:['comparaison'], unlocked:true,
    rule:{
      title:'比較級 — 先問「我在比什麼詞類」，詞類決定寫法',
      why:'三個等級（moins／aussi・autant／plus）是固定的，真正決定寫法的是你在比什麼詞類。副詞和形容詞是「性質」，比較詞把它夾在中間；動詞是「動作」，沒辦法被夾住，所以比較詞只能跟在後面；名詞是「數量」，而法文講不確定的數量一律要 de——所以 plus de／moins de／autant de 的那個 de 不是新規則，是 beaucoup de 那條規則在比較句裡的同一張臉。同等級的 aussi 與 autant 也是同一個道理：aussi 修飾性質（形容詞副詞），autant 衡量分量（動作與數量），中文都翻成「一樣」，法文分得很清楚。',
      points:[
        '副詞／形容詞：比較詞夾中間 → moins loin que、aussi grande que、plus grande que',
        '動詞：動詞先出現，比較詞跟在後面 → Les jeunes déménagent moins que les personnes âgées',
        '名詞：一定要加 de → Il y a plus de chambres que dans notre maison',
        '⚠️⚠️ 同等級：形容詞副詞用 aussi，動詞與名詞用 autant（不能說 déménagent aussi que）',
        '⚠️ 只有「優等」有不規則：bon → meilleur、bien → mieux、mauvais → pire／plus mauvais、mal → pire／plus mal',
        'moins 與 aussi 那兩欄完全照原形放，不用背例外',
        '⚠️ bon（東西品質、食物）配 meilleur；bien（感覺、活動）配 mieux。aimer 是動詞 → J\'aime mieux（⛔ 不是 j\'aime meilleur）',
        '⚠️ j\'aime bien ＜ j\'aime ＜ j\'aime beaucoup——加 bien 反而變弱',
        'moins bien ＝ pire（比較不好就是比較糟）；古語 pis 只留在 Tant pis !（算了）',
        '比較對象是代名詞時用重讀形：que moi / que lui / qu\'eux',
      ],
      examples:[
        { fr:'La chambre de Tom est moins grande que la chambre d\'Anna.', zh:'Tom 的房間比 Anna 的小。（形容詞夾中間）' },
        { fr:'Il y a autant de chambres que dans notre maison.', zh:'房間數跟我們家一樣多。（名詞要 de，同等用 autant）' },
        { fr:'On vit bien en ville, mais on vit mieux à la campagne.', zh:'城市過得不錯，鄉下更好。（bien → mieux）' },
        { fr:'J\'aime mieux ce quartier.', zh:'我更喜歡這一區。（aimer 是動詞，配 mieux 不配 meilleur）' },
      ]}},

  { id:'condition-si', name:'La condition (si / quand)', icon:'🔀', zone:'A2', cat:'base',
    lessons:[25,28], topics:['condition-si'], unlocked:true,
    rule:{
      title:'si 條件句（A2 完整版）— 條件永遠用現在式，結果有三種收法',
      why:'法文的 si 句真正的難點不在 si 本身，在「兩邊各用什麼時態」。A2 只需要最單純的一組：條件那半永遠是現在式，結果那半看你想做什麼——陳述一個常態就用現在式，要對方去做某件事就用命令式。命令式那一版之所以語氣更強，不是因為多了什麼標記，而是因為命令式本來就沒有主詞、直接把動作丟給對方。至於 s\'il 的縮寫，也不是文法規定，純粹是 si 和 il 都是 i 開頭、兩個 i 連著唸不順——所以只在 il／ils 前面縮，si on、si elle 都不縮。⚠️ 2026-08-28（第28課）補上第三種收法：結果那半可以用**未來式**（si tu passes une semaine sans smartphone, tu perdras l\'habitude）——第27課學完未來式才有材料，所以課本把它排在這裡。同時要跟 **quand ＋ 未來 ＋ 未來** 分開：si 是「不一定會發生」，quand 是「一定會發生」，中文都翻成「當…就…」所以中文幫不上忙，只能靠確定性判斷。',
      points:[
        'si ＋ 現在式 ＋ 現在式：陳述常態 → Si je veux lire, je vais à la bibliothèque',
        'si ＋ 現在式 ＋ 命令式：語氣更強、帶勸告 → Si tu es malade, va à la pharmacie !',
        'si ＋ 現在式 ＋ 未來式：預測一個還沒發生的結果 → Si tu passes une semaine sans smartphone, tu perdras l\'habitude（第28課新增）',
        '⚠️⚠️ 不管哪一式，**si 後面永遠是現在式**——⛔ si tu achèteras、si tu voudras 都是錯的',
        '⭐ quand ＋ 未來式 ＋ 未來式：講未來「一定會發生」的事 → Quand tu auras 18 ans, je t\'achèterai un ordinateur',
        '⚠️ si vs quand 的判準是**確定性**，不是中文翻譯（兩個都能翻成「當…就…」）',
        '⚠️ 句子裡有 en général 就是在講習慣 → 回到第一式（現在＋現在），不是預測',
        '⚠️ si → s\' 只在 il / ils 前面：S\'il pleut…',
        '⚠️⚠️ si on、si elle、si tu 都不縮寫（老師說很多法國人自己也寫錯成 si il）',
        '兩個子句順序可以對調：Tu peux passer chez moi si ça t\'arrange',
        'B1 之後才會學另外兩式（假設、悔恨），見記憶宮殿 6-6-1',
      ],
      examples:[
        { fr:'Si je veux lire, je vais à la bibliothèque.', zh:'如果我想看書，我就去圖書館。（現在式＋現在式）' },
        { fr:'Si tu es malade, va à la pharmacie !', zh:'如果你不舒服，就去藥局！（現在式＋命令式，語氣強）' },
        { fr:'S\'il pleut, on peut aller au Centre de la BD.', zh:'如果下雨，我們可以去漫畫中心。（si + il → s\'il）' },
        { fr:'Si on part vivre sur une île déserte…', zh:'如果我們去荒島生活…（⚠️ si on 不縮寫）' },
        { fr:'Si tu passes une semaine sans ordi et sans smartphone, tu perdras l\'habitude.', zh:'如果你一週不用電腦跟手機，你就會戒掉這個習慣。（現在式＋未來式，第28課）' },
        { fr:'Quand tu auras 18 ans, je t\'achèterai un ordinateur.', zh:'你18歲的時候，我會買一台電腦給你。（⭐ quand ＋ 未來 ＋ 未來＝確定會發生）' },
        { fr:'En général, si je dois aller dans un endroit que je ne connais pas, je mets mon GPS.', zh:'一般來說，如果我要去不認識的地方，我就開 GPS。（⚠️ en général＝習慣，回到現在＋現在）' },
      ]}},

  { id:'tout-chaque', name:'Tout / chaque (全部 vs 每一個)', icon:'🔢', zone:'A2', cat:'base',
    lessons:[26], topics:['tout-chaque'], unlocked:true,
    rule:{
      title:'tout / toute / tous / toutes vs chaque — 整批看還是一個一個看',
      why:'這兩個字中文都可以翻成「每」，但法文分得很清楚：chaque 是把東西一個一個拆開看，所以後面永遠是單數，而且 chaque 本身完全不變化；tout 是把東西當成一整批看，所以它要跟那批名詞配合性數，後面通常還帶著冠詞（tous les jours）。第三種身分最容易漏掉——tout 也可以單獨當中性代名詞用，意思是「所有東西」（Tout va bien），這時它不配合任何東西，永遠寫 t-o-u-t。⚠️ 真正的陷阱在於 tout 跟 tous 唸起來一模一樣，所以這是一條「用看的」規則不是「用聽的」規則：要寫對只能回頭看名詞是什麼性數。',
      points:[
        'chaque ＋ 單數名詞，chaque 永遠不變化 → Chaque qualité peut cacher un défaut',
        'tout / toute / tous / toutes 要跟名詞配合性數 → J\'aime tous les aspects de sa personnalité',
        '⚠️ tout 跟 tous 同音——只能靠後面的名詞決定寫法',
        'tout 當中性代名詞＝「所有東西」時不變化 → Tout va bien / Tout ira bien',
        'tous les ＋ 數字 ＋ 時間＝每隔多久一次 → tous les trois mois（⚠️ 這個結構不能換 chaque）',
        '很多情況兩個都對：tous les jours ＝ chaque jour、toutes les semaines ＝ chaque semaine',
        '⚠️ chaque 要指到「一個一個」的單位：chaque membre de ma famille，不是 chaque famille',
        'passer ＋ 時間 ＋ à ＋ 原形：J\'ai passé toute l\'année à jouer au golf',
      ],
      examples:[
        { fr:'Chaque qualité peut cacher un défaut.', zh:'每個優點都可能藏著一個缺點。（chaque ＋ 單數）' },
        { fr:'J\'aime tous les aspects de sa personnalité.', zh:'我喜歡他個性的每一面。（tous ＋ 陽性複數）' },
        { fr:'Toutes les qualités ont un opposé positif.', zh:'所有優點都有正面的另一面。（toutes ＋ 陰性複數）' },
        { fr:'Tout va bien.', zh:'一切都好。（中性代名詞，不變化）' },
      ]}},

  { id:'pronoms-possessifs', name:'Pronoms possessifs (le mien…)', icon:'🔖', zone:'A2', cat:'pronoms',
    lessons:[27], topics:['pronoms-possessifs'], unlocked:true,
    rule:{
      title:'所有格代名詞 — 名詞被吃掉了，所以後面什麼都不接',
      why:'英文的 my 跟 mine 是同一件事的兩個形狀：my 後面一定要說出東西（my shoes），mine 後面什麼都不說（it\'s mine）。法文完全一樣——mon／ton／son 是形容詞，後面接名詞；le mien／le tien／le sien 是代名詞，把「所有格＋名詞」整組收掉。因為名詞被收進代名詞裡了，它必須自己帶著那個名詞的性數，所以配合的對象永遠是「東西」不是「人」：一個男生說「我的照片」也是 la sienne，因為 photo 是陰性。定冠詞是這組字的身分證——沒有 le／la／les 就不成立。至於 nôtre／vôtre 頭上那頂帽子，它不只是區分記號，還帶著發音：形容詞 notre／votre 的 o 是開口 [ɔ]，代名詞 nôtre／vôtre 的 o 是閉口 [o]（⚠️ 老師課堂說「聽起來一樣」，那是口語把兩個音中和掉的實際現象，不是標準——寫一定要分，考試與正式場合唸也要分）。leur 那一行則完全不變，沒有這個問題。',
      points:[
        '結構：定冠詞 ＋ mien／tien／sien／nôtre／vôtre／leur，後面不接名詞',
        '⚠️⚠️ 配合的是「被代替的名詞」不是擁有者：sa photo → la sienne（不管他是男是女）',
        'je: le mien / la mienne / les miens / les miennes',
        'tu: le tien / la tienne / les tiens / les tiennes',
        'il·elle·on: le sien / la sienne / les siens / les siennes',
        'nous: le nôtre / la nôtre / les nôtres（陰陽同形）',
        'vous: le vôtre / la vôtre / les vôtres（陰陽同形）',
        'ils·elles: le leur / la leur / les leurs（陰陽同形，且不加帽子）',
        '⚠️ nôtre／vôtre 當代名詞時有 accent circonflexe，形容詞 notre／votre 沒有',
        '⚠️ 複數整組加 s：les leurs、les nôtres、les vôtres（課文的 pas les leurs＝不是他們的臉）',
        'à ＋ les nôtres → aux nôtres（跟一般冠詞縮合一樣）',
      ],
      examples:[
        { fr:"C'est ma photo de profil. → C'est la mienne.", zh:'這是我的大頭照。→ 這是我的。（photo 陰性單數）' },
        { fr:'Ton appareil photo est en panne ? Prends le mien.', zh:'你的相機壞了？拿我的。（appareil 陽性單數）' },
        { fr:'Ce sont mes chats. → Ce sont les miens.', zh:'這些是我的貓。（chat 陽性複數 → les miens）' },
        { fr:"C'est votre texte ? Oui, c'est le vôtre.", zh:'這是您的文章嗎？是的，是您的。（帽子別忘了）' },
        { fr:'Des gens qui ont des intérêts semblables aux nôtres.', zh:'興趣跟我們相近的人。（à ＋ les nôtres）' },
      ]}},

  { id:'futur-simple', name:'Le futur simple', icon:'🚀', zone:'A2', cat:'verbe-temps',
    lessons:[27], topics:['futur-simple'], unlocked:true,
    rule:{
      title:'簡單未來式 — 原形整個留著，字尾就是 avoir 的現在式',
      why:'未完成過去式要先想現在式的 nous 再換字尾，中間隔了一步；簡單未來式沒有那一步——直接拿原形當骨架。字尾也不是新東西，就是 avoir 的現在式 ai／as／a／ons／ez／ont 黏在後面（這是歷史真相：拉丁文用「原形＋habere」表達「我有這件事要做」，久了黏成一個字，所以未來式字面上是「我有得做」）。骨架是原形，代表中間那個 r 一定在，這就是辨認未來式最可靠的訊號：écrivais 有 v 是過去、écrirai 有 r 是未來。不規則的部分只有字根，字尾一個都沒變過，所以背的量比看起來少很多。',
      points:[
        '規則式：原形 ＋ ai / as / a / ons / ez / ont（＝avoir 的現在式）',
        '⚠️ -re 動詞去掉最後的 e：prendre → je prendrai',
        '⚠️⚠️ 骨架是原形不是現在式：écrire → j\'écrirai（⛔ 不是 écriverai；imparfait 才看 nous écrivons）',
        '不規則只在字根：avoir→aur-、être→ser-、faire→fer-、aller→ir-、voir→verr-、savoir→saur-',
        '不規則（續）：devoir→devr-、pouvoir→pourr-、vouloir→voudr-、(de)venir→(de)viendr-',
        '⚠️ 無人稱動詞只有 il 這一格：falloir → il faudra、pleuvoir → il pleuvra',
        '⚠️⚠️ quand ＋ 未來事件時，法文兩邊都用未來式（中文的「當…時」會讓人誤用現在式）',
        '用途：預測、計畫、承諾、書面與正式場合；口語講馬上要做的事仍用 aller ＋ 原形',
        '⚠️ acheter 這類要加 accent：j\'achèterai',
      ],
      examples:[
        { fr:'Demain, je prendrai ma voiture.', zh:'明天我會開我的車。（-re 去掉 e）' },
        { fr:'Quand nous irons au salon, tu viendras avec nous ?', zh:'我們去展覽時你會來嗎？（兩邊都是未來式）' },
        { fr:'Il y aura des robots partout, ce sera comme dans les films.', zh:'到處都會是機器人，就像電影裡一樣。' },
        { fr:'Quand le prof ne pourra pas venir, il donnera ses cours à distance.', zh:'老師不能來的時候，他會遠距上課。' },
        { fr:'Il faudra apprendre vite.', zh:'到時候得學得快。（falloir 只有 il 這一格）' },
      ]}},

  { id:'pronom-on', name:'Le pronom on (三種意思)', icon:'🙋', zone:'A2', cat:'pronoms',
    lessons:[9,28], topics:['on-vs-nous'], unlocked:true,
    rule:{
      title:'le pronom on — 一個字三種意思，但變位只有一種',
      why:'on 不是「nous 的口語版」這麼簡單，它其實是法文用來**把主詞模糊掉**的工具。當你不想說（或不知道）動作是誰做的，法文不像英文有 someone／people／we 三個字可選，它就丟一個 on 出來，讓聽的人自己從情境補。所以判斷 on 是哪一種，靠的不是文法而是**句子在講誰的事**：講一個對所有人成立的通則就是 les gens、講一件不知道誰幹的事就是 quelqu\'un、說話者自己在裡面就是 nous。也因為 on 本質上是個「第三人稱的空位」，它的變位永遠跟 il / elle 一樣——這一格不會因為它代表「我們」就變。',
      points:[
        'on ＝ quelqu\'un（某人）：不知道也不在乎是誰 → On a volé mon téléphone.',
        'on ＝ les gens（大家、人們）：對所有人成立的通則 → Dans ce pays, on aime les nouvelles technologies.',
        'on ＝ nous（我們）：口語幾乎都用 on，nous 太正式 → On va au salon des innovations.',
        '⚠️⚠️ 不管哪一種意思，**變位永遠照 il / elle**：⛔ on visiteras → ✅ on visitera',
        '⭐ 書面唯一的線索：on ＝ nous 時，過去分詞／形容詞可以配合成複數 → On est allés à la RoboCup.',
        '⚠️ 判斷法：把 quelqu\'un／les gens／nous 三個都代進去唸一次，只有一個講得通',
        '⚠️ 句子裡出現 chez moi、mon téléphone 這種「我的東西」時，on 通常不是 nous',
      ],
      examples:[
        { fr:'On a volé mon téléphone.', zh:'有人偷了我的手機。（＝quelqu\'un）' },
        { fr:'Dans ce pays, on aime beaucoup les nouvelles technologies.', zh:'在這個國家，大家很喜歡新科技。（＝les gens）' },
        { fr:'On va au salon des innovations.', zh:'我們要去創新展。（＝nous）' },
        { fr:'Quand on vit sans téléphone, on est plus libre.', zh:'人不用手機的時候比較自由。（＝les gens，⚠️ 不是 nous）' },
        { fr:'Quand on ira à Paris, on visitera le musée.', zh:'我們去巴黎的時候會參觀博物館。（⚠️ on 照 il 變位，沒有 -s）' },
      ]}},

  { id:'conseils', name:'Conseils & obligations', icon:'💡', zone:'A2', cat:'verbe-mode',
    lessons:[11,13,29], topics:['giving-advice','ilfaut-devoir','interdiction-demande'], unlocked:true,
    rule:{
      title:'建議與義務 — il faut / devoir / conseiller',
      why:'兩種義務、兩個來源：il faut 的 il 是假主詞（跟 il pleut 的 il 一樣，沒有人在那裡）——「（世界）需要…」，所以是不針對誰的一般義務；devoir 本義是「欠」（現在還這樣用：il me doit 10 euros 他欠我10歐），你「欠」這個動作＝你個人有義務做——這就是兩者分工的全部邏輯。Défense de / Merci de 是公告體：名詞開頭、不指名道姓，跟中文「禁止吸菸」同一種語氣。',
      points:[
        'il faut + 原形 = 一般性的「必須/該」（不指定誰）：Il faut boire de l\'eau',
        'devoir + 原形 = 個人義務：je dois / tu dois / il doit / nous devons / vous devez / ils doivent',
        '給建議：Je te conseille de + 原形；Tu peux + 原形（軟性建議）',
        '禁止/請求：Défense de + 原形（禁止…）；Merci de + 原形（請…，公告用語）',
        '⭐ 2026-08-31（第29課）義務四式：il faut ＋ 原形／il est nécessaire de／il est indispensable de／vous avez l\'obligation de',
        '⭐ 對應的禁止四式：il ne faut pas ＋ 原形／il est interdit de／il est défendu de／vous ne devez pas',
        '⚠️⚠️ 只有 il faut 與 vous devez 直接接原形，其餘一律 de ＋ 原形（兩個動詞就兩個 de：de manger et de boire）',
        '⚠️ 語感：interdit 比較硬（真的違規），défendu 比較軟（勸阻、對你不好）',
        '⚠️⚠️ 反身動詞的**肯定**命令式，代名詞放動詞後面加連字號、te 變 toi：Lavez-vous les mains !／Brosse-toi les dents.',
        '⚠️ 否定命令式的代名詞又回到動詞前面：Ne vous lavez pas les mains ici.',
      ],
      examples:[
        { fr:'Il faut faire du sport tous les jours.', zh:'每天都要運動。（一般義務）' },
        { fr:'Je te conseille de faire du sport.', zh:'我建議你做運動。（conseiller de）' },
        { fr:'Défense de marcher sur la pelouse.', zh:'禁止踐踏草坪。' },
        { fr:'Dans ce restaurant, il faut réserver la table à l\'avance.', zh:'在這家餐廳必須事先訂位。（il faut 不加 de）' },
        { fr:'Dans le métro taïwanais, il est interdit de manger et de boire.', zh:'台灣捷運裡禁止飲食。（兩個原形各自帶 de）' },
        { fr:'Lavez-vous les mains !', zh:'請洗手！（反身動詞的肯定命令式，代名詞後移）' },
      ]}},

  { id:'duree-temps', name:'La durée (pendant · depuis · il y a)', icon:'⏳', zone:'A2', cat:'base',
    lessons:[16,19], topics:['duree'], unlocked:true,
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

  { id:'heure', name:"L'heure (officielle · courante)", icon:'🕐', zone:'A2', cat:'base',
    lessons:[24], topics:['numbers-dates-heure'], unlocked:true,
    rule:{
      title:'報時的兩套系統 — 半點是分界線，它站在 et 那一邊',
      why:'法文有兩套報時法，不是「正式/隨便」的差別，是兩種不同的計數方式。官方版（24 小時制）是行政與交通系統的產物——火車時刻表不能有 am/pm 的歧義，所以直接把數字唸完，treize heures quarante-cinq。口語版留著更古老的邏輯：人講時間是看鐘面指針，快到整點時你講的不是「一點四十五」，是「差一刻到兩點」。所以 moins 不是文法規則，是「指針已經過半、眼睛自動去看下一個整點」這件事的語言化。半點之所以不能說 moins，是因為指針正好在正中間——它還沒開始往下一個整點靠，你也就還沒有理由改用倒數。',
      points:[
        '官方版（考卷／電視表／車票）：24 小時制，直接唸數字 → treize heures quarante-cinq',
        '口語版（講話）：12 小時制，用鐘面 → deux heures moins le quart',
        '過半之前用 et：et quart（+15）、et demie（+30）、et vingt（+20）',
        '過半之後改看下一個整點差多少，用 moins：moins vingt、moins le quart、moins dix',
        '⚠️⚠️ 半點只能說 et demie，不可以說 moins trente／moins la demie（老師當場糾正過）',
        '⚠️ le quart＝15 分鐘、la demie＝30 分鐘，兩個字不可以混用',
        'heure 是陰性，所以配 une heure、demie 要加 e（見記憶宮殿 9-4-3）',
        '兩套都要會：考題寫官方版（看得懂才找得到答案），老師問你時用口語版（聽得懂才答得出來）',
      ],
      examples:[
        { fr:'Il est treize heures quarante-cinq.', zh:'13:45（官方版，考卷上的寫法）' },
        { fr:'Il est deux heures moins le quart.', zh:'差一刻兩點（口語版，同一個時間）' },
        { fr:'Il est une heure et demie.', zh:'一點半（⚠️ 半點一律 et demie，不能用 moins）' },
        { fr:'À quelle heure commence l\'atelier de cuisine ?', zh:'烹飪工作坊幾點開始？' },
      ]}},

  // ═══ B1（已教的部分） ══════════════════════════════════════
  { id:'relatifs', name:'Pronoms relatifs (qui · que · où)', icon:'🔗', zone:'B1', cat:'pronoms',
    lessons:[16,23], topics:['qui-que'], unlocked:true,
    rule:{
      title:'關係代名詞 qui / que / où — 看子句裡缺的是主詞、受詞還是地方',
      why:'法文早就把拉丁文的「格」（主格/受格字尾）丟光了，唯獨在這裡留了一對活化石：qui 是主格（它自己當子句的主詞），que 是受格（子句另有主詞、它當受詞）。所以選 qui 還是 que 從來不是背搭配，是看你挖掉的那個洞原本是主詞還是受詞——qui 後面直接接動詞（洞在主詞位），que 後面先出現新主詞（洞在受詞位）。où 走的是另一條路：它本來就是疑問詞「哪裡」，被借來補「在那個地方」這個洞，所以先行詞看起來像不像地方不是判準，判準是子句裡缺的到底是哪一格。',
      points:[
        'qui 代替主詞（qui後面直接接動詞）：la France est un pays qui change',
        'que 代替受詞（que後面有新的主詞）：c\'est un métier que j\'adore',
        'où 代替地點補語（原句是「介詞＋地方」）：Voici la chambre où je dors.（= je dors dans la chambre）',
        '判斷口訣：關係子句裡「動詞前有沒有人」——沒有→qui、有→que；講的是「在那個地方」→où',
        '老師的測試法：翻成英文能用 where 才是 où；只能用 that / which 就是 qui / que',
        '⚠️ 最常踩的陷阱：先行詞是地方也不一定用 où——la pièce que je préfère（which I prefer，缺的是受詞）、un studio que mes parents ont acheté（買的是那間房＝受詞）',
        'où 也能接時間：le jour où nous nous sommes rencontrés（quand 不是關係代名詞）',
        'qui 永不縮寫；que 母音前變 qu\'：le livre qu\'il lit、un foyer qu\'il aime',
      ],
      examples:[
        { fr:"L'homme qui parle est mon prof.", zh:'正在說話的那個人是我老師。（qui+動詞）' },
        { fr:"C'est un métier que j'adore.", zh:'這是一個我熱愛的職業。（que+主詞je）' },
        { fr:"Voici la chambre où je dors.", zh:'這就是我睡的房間。（où＝dans la chambre）' },
        { fr:"Le salon est la pièce que je préfère.", zh:'客廳是我最喜歡的房間。（⚠️ 是 que 不是 où）' },
      ]}},

  // ═══ 未開課（B1/B2 佔位，教到才解鎖） ══════════════════════
  // ⚠️ topics 刻意留空：這是 B1「表達立場/論述」的佔位點，之前掛著 connectors-pour-parceque，
  //    導致 quiz.html 的 getPool() 把第7課 pour/parce que/mais 那 5 題整批當成「超前進度」排除。
  //    pour/parce que 第2/7/16課都教過，不該被鎖。教到 B1 論述時再把新 topic 掛回來。
  { id:'opinions',     name:'Opinions & débats',        icon:'💬', zone:'B1', cat:'discours',    lessons:[], topics:[], unlocked:false },
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
