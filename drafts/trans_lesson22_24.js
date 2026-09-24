/* drafts/trans_lesson22_24.js — D5 候選題（2026-09-25 清晨排程）
   ════════════════════════════════════════════════════════════════
   對應 GAME_ROADMAP.md 佇列項 D5（＝AUDIT 的 P4 2/3）：
   第 22、24 課在 questions.js 裡**一題 trans 都沒有**（22 課 25 題全是 choose／fill；
   24 課 37 題同樣沒有 trans），而拼句與試煉之塔都吃 trans 型。

   ⏸ 全部是候選，⛔ 沒有改 questions.js。入庫前請 Owen 逐題看過。
   格式照 questions.js 既有 trans 題（lesson／topic／type／q 中文／hint／a 用 | 分隔多解／aNote），
   另加 src 欄寫出處，入庫時刪掉 src 即可。

   ════════════════════════════════════════════════════════════════
   來源紀律（鐵律 1）：
   · 第 22 課：全部取自 french_notes.html 第 22 課＋課本 Édito A2 p.35（Vocabulaire 練習 4）、
     p.37（Grammaire Entraînement 3＋Remarques）、p.38（Entraînement 2 y/en）。
     ⚠️ 課本練習 3（p.37）只給題目沒給答案；答案是照同頁 Fonctionnement 規則填出來的
     （短形容詞在前、國籍／顏色在後、形容詞在前時 des→de／d'、配性數），標「答案依課本規則」。
     ⛔ 刻意沒用筆記的平行閱讀〈Un été à Kenting〉——那篇是筆記自己寫的同級短文，不是課本或老師的句子。
   · 第 24 課：用的書是《Le DELF A2 100% réussite》，⚠️ 不在 assets/.textbook_cache.txt 裡，
     所以只能對 french_notes.html 第 24 課與 sentences.js（S_L24_x）。
     ⛔ 同樣沒用筆記的平行閱讀〈自製節目表〉（S_L24_4／5／6 就是從那篇來的，所以也沒用）。
     ⛔ 沒有重複 drafts/story_questions.js（D1）已經出過的兩題 trans：
       「Entourez tous les chiffres.」「Si vous ne connaissez pas un mot, ne vous inquiétez pas.」

   ════════════════════════════════════════════════════════════════
   順手發現的筆記問題（排程不改，給 Owen 看）：
   ⚠️ french_notes.html 第 24 課「老師當場糾正你的兩件事」第一條（約 7505 行）寫
     「quatorze heures moins le quart（＝13h45）」——這是把 24 小時制（官方版）和
     moins le quart（口語 12 小時制）混在一起。標準法文：官方版 treize heures quarante-cinq、
     口語版 deux heures moins le quart（同一課上面的表格＝7496 行也是這樣寫）。
     而且 quatorze heures moins le quart 按字面是 13h45 沒錯，但一般不這樣講。
     → 建議那一條改成 deux heures moins le quart；questions.js:1178 本來就是對的，不用動。
   ════════════════════════════════════════════════════════════════ */
var TRANS_L22_L24_DRAFTS = [

  /* ═══════════ 第 22 課（16 題）═══════════ */

  /* ── adjective-position（本課主文法）── */
  { lesson:22, topic:'adjective-position', type:'trans',
    q:'我看到一些漂亮的觀光海報。',
    hint:'joli 在前、touristique 在後',
    a:"J'ai vu de jolies affiches touristiques.",
    aNote:'課本 p.37 練習 3 的示範題。joli 在前 → des 變 de；後面的 touristiques 不影響這條規則',
    src:'課本 Édito A2 p.37 Entraînement 3「Exemple」（題目＋答案都是課本給的）；筆記 第22課主文法 des affiches → de jolies affiches touristiques' },

  { lesson:22, topic:'adjective-position', type:'trans',
    q:'她帶回來一件漂亮的彩色襯衫。',
    hint:'beau 在前、coloré 在後，都配陰性',
    a:'Elle a ramené une belle chemise colorée.',
    aNote:'belle（短、主觀）在前；colorée（顏色類）在後。ramener＝帶回來（課文②詞彙）',
    src:'課本 p.37 Entraînement 3a（答案依課本規則）；筆記 第22課表① une belle chemise' },

  { lesson:22, topic:'adjective-position', type:'trans',
    q:'他們去了一座西班牙小島。',
    hint:'partir sur une île',
    a:'Ils sont partis sur une petite île espagnole.',
    aNote:'petite 在前、espagnole（國籍）在後，兩個都配陰性。partir 用 être 當助動詞',
    src:'課本 p.37 Entraînement 3b（答案依課本規則）；筆記 第22課表② une petite île espagnole' },

  { lesson:22, topic:'adjective-position', type:'trans',
    q:'觀光客們嚐了一些極好的摩洛哥香料。',
    hint:'excellent 在前 → des 變成？',
    a:"Les touristes ont goûté d'excellentes épices marocaines.",
    aNote:"excellentes 在前 → des 變 d'（母音前）；marocaines（國籍）在後。⚠️ épice 是陰性，兩個形容詞都要 -es",
    src:"課本 p.37 Entraînement 3c（答案依課本規則）＋Remarques「D'excellentes épices」；筆記 第22課 des épices → d'excellentes épices" },

  { lesson:22, topic:'adjective-position', type:'trans',
    q:'我們看到一些白色大船。',
    hint:'gros 在前、blanc 在後',
    a:'Nous avons vu de gros bateaux blancs.',
    aNote:'gros 在前 → des 變 de；blancs 陽性複數（⚠️ 不是 blanches）',
    src:'課本 p.37 Entraînement 3d；sentences.js S_L22_7；筆記 第22課表②' },

  { lesson:22, topic:'adjective-position', type:'trans',
    q:'我們在一家好的法式餐廳吃飯。',
    hint:'兩個形容詞一前一後',
    a:'Nous avons mangé dans un bon restaurant français.',
    aNote:'短形容詞在前、國籍在後，名詞夾中間——考題最愛的組合',
    src:'sentences.js S_L22_5；筆記 第22課「兩種都有時的順序」＋糾錯摘要' },

  { lesson:22, topic:'adjective-position', type:'trans',
    q:'這家人在這間很棒的土魯斯餐廳吃得很好。',
    hint:'ce ＋ bon ＋ 名詞 ＋ toulousain',
    a:'La famille a très bien mangé dans ce bon restaurant toulousain.',
    aNote:'toulousain＝土魯斯的（地方形容詞，跟國籍一樣放後面）',
    src:'課本 p.37 Entraînement 3e（答案依課本規則）；筆記 第22課表② 國籍列有 toulousain' },

  { lesson:22, topic:'adjective-position', type:'trans',
    q:'我用我自己的杯子。',
    hint:'propre 放哪邊＝「自己的」',
    a:"J'utilise mon propre mug.",
    aNote:'propre 在名詞前＝自己的；放後面 un mug propre＝乾淨的',
    src:'課本 p.37 Remarques；sentences.js S_L22_8；筆記 第22課「propre 的兩張臉」' },

  { lesson:22, topic:'adjective-position', type:'trans',
    q:'我用一個乾淨的杯子。',
    hint:'propre 放哪邊＝「乾淨的」',
    a:"J'utilise un mug propre.",
    aNote:"跟上一題成對：propre 在後＝le mug n'est pas sale",
    src:'課本 p.37 Remarques；筆記 第22課「propre 的兩張臉」' },

  /* ── vocab-meteo ── */
  { lesson:22, topic:'vocab-meteo', type:'trans',
    q:'今天天氣怎麼樣？',
    hint:'疑問形容詞＋倒裝',
    a:"Quel temps fait-il aujourd'hui ?|Quel temps fait-il ?",
    aNote:'回答一律 Il fait…（下雨下雪例外：Il pleut／Il neige）',
    src:'sentences.js S_L22_1；筆記 第22課天氣詞彙 note＋老師課堂法語' },

  { lesson:22, topic:'vocab-meteo', type:'trans',
    q:'是熱浪！白天晚上都很熱！',
    hint:'不是 chaleur',
    a:"C'est la canicule ! Il fait très chaud la journée et la nuit aussi !|C'est la canicule ! Il fait très chaud le jour et la nuit aussi !",
    aNote:'canicule＝太熱＋持續太久；單純的熱是 la chaleur',
    src:'課本 p.35 Vocabulaire 4a（填空答案＝la canicule）；sentences.js S_L22_2 近似句' },

  { lesson:22, topic:'vocab-meteo', type:'trans',
    q:'氣象預報說會有雷雨。把狗帶進來，牠會害怕。',
    hint:'orage 不是 tonnerre；rentrer 及物',
    a:'La météo annonce des orages. Rentre le chien, il va avoir peur.',
    aNote:'orage＝整場雷雨；rentrer 在這裡是「把…帶進來」',
    src:'課本 p.35 Vocabulaire 4b（填空答案＝orages）；sentences.js S_L22_3；筆記 第22課老師課堂法語' },

  { lesson:22, topic:'vocab-meteo', type:'trans',
    q:'夏天，我找的是涼爽！',
    hint:'不是 froid',
    a:"L'été, je cherche la fraîcheur !|L'été, je cherche la fraîcheur.",
    aNote:'fraîcheur＝舒服的涼（課本：18 到 20 度剛好）；froid 才是冷',
    src:'課本 p.35 Vocabulaire 4e（填空答案＝fraîcheur）；sentences.js S_L22_9' },

  { lesson:22, topic:'vocab-meteo', type:'trans',
    q:'我們就隨便閒聊。（用天氣的慣用語）',
    hint:'la pluie et le beau temps',
    a:'On a parlé de la pluie et du beau temps.|On parle de la pluie et du beau temps.',
    aNote:'慣用語，跟中文「聊天氣」一樣的社交功能。de＋le beau temps → du beau temps',
    src:'sentences.js S_L22_4；筆記 第22課文化小知識＋老師課堂法語' },

  /* ── pronoms-y-en（第 22 課 y/en 複習，接第 21 課）── */
  { lesson:22, topic:'pronoms-y-en', type:'trans',
    q:'我們要在那裡定居！（那裡＝加拿大，用代名詞）',
    hint:'反身動詞＋y 的順序',
    a:'Nous nous y installons !|Nous nous y installons.',
    aNote:'au Canada（在）→ y；順序 nous nous y installons。⭐ 這句剛好就是你的目標',
    src:'課本 p.38 Entraînement 2a；筆記 第22課 y/en 複習練習' },

  { lesson:22, topic:'pronoms-y-en', type:'trans',
    q:'他一週前從那裡回來。（那裡＝史特拉斯堡，用代名詞）',
    hint:'從＋地點 → ？；passé composé',
    a:'Il en est revenu il y a une semaine.',
    aNote:'de Strasbourg（從）→ en，放助動詞前',
    src:'課本 p.38 Entraînement 2d；筆記 第22課 y/en 複習練習' },

  /* ═══════════ 第 24 課（11 題）═══════════ */

  /* ── strategie-lecture ── */
  { lesson:24, topic:'strategie-lecture', type:'trans',
    q:'先讀題目。（考試指令，vous 命令式）',
    hint:"d'abord 放哪",
    a:"Lisez d'abord les questions.",
    aNote:'⭐⭐⭐ 老師的第一鐵律。lire → lisez',
    src:'sentences.js S_L24_1；筆記 第24課 五條解題法第 1 條＋老師課堂法語' },

  { lesson:24, topic:'strategie-lecture', type:'trans',
    q:'試著靠其他字去理解。',
    hint:'essayer de ＋ grâce à',
    a:'Essayez de comprendre grâce aux autres mots.',
    aNote:'grâce à＋les → grâce aux。課本原句（接在「不認識一個字不要慌」後面）',
    src:'sentences.js S_L24_3；筆記 第24課 五條解題法第 4 條（課本原句）' },

  { lesson:24, topic:'strategie-lecture', type:'trans',
    q:'你們不可以出錯。',
    hint:"devoir 否定＋de 縮寫",
    a:"Vous ne devez pas faire d'erreurs.",
    aNote:"否定後 des 變 de → d'erreurs。老師講這場閱讀的標準：資訊都在紙上",
    src:'sentences.js S_L24_7；筆記 第24課 老師課堂法語' },

  { lesson:24, topic:'strategie-lecture', type:'trans',
    q:'可以先跳過，等一下再回來。',
    hint:'on peut ＋ 兩個原形',
    a:'On peut sauter et revenir après.',
    aNote:'卡住時的正確動作：不要停在同一題',
    src:'sentences.js S_L24_8；筆記 第24課 老師課堂法語' },

  { lesson:24, topic:'strategie-lecture', type:'trans',
    q:'要繼續下去，會忘記是正常的。',
    hint:"il faut ＋ c'est normal de",
    a:"Il faut continuer, c'est normal d'oublier.",
    aNote:"c'est normal de＋原形；oublier 母音開頭 → d'oublier",
    src:'sentences.js S_L24_9；筆記 第24課 老師課堂法語' },

  /* ── vocab-consignes ── */
  { lesson:24, topic:'vocab-consignes', type:'trans',
    q:'找出關鍵字。（考試指令）',
    hint:'不是 réparer',
    a:'Repérez les mots-clés.',
    aNote:'repérer＝在一堆東西裡把它認出來；mots-clés 複數兩個字都加 s',
    src:"筆記 第24課 五條解題法第 3 條＋課本 PRÊT POUR L'EXAMEN（Repérer les mots-clés）" },

  { lesson:24, topic:'vocab-consignes', type:'trans',
    q:'請勾選正確答案。',
    hint:'打勾的動詞',
    a:'Cochez la bonne réponse.',
    aNote:'cocher＝打勾。新版 DELF A2 閱讀全部是選擇題',
    src:'筆記 第24課 Les consignes 表' },

  /* ── vocab-annonces ── */
  { lesson:24, topic:'vocab-annonces', type:'trans',
    q:'哪個行程最便宜？',
    hint:'séjour＋le moins cher',
    a:'Quel est le séjour le moins cher ?',
    aNote:'⚠️ 比之前先換成同一個週期（par an／par mois／par trimestre）',
    src:'筆記 第24課 Les tarifs 表（廣告題必考句）' },

  { lesson:24, topic:'vocab-annonces', type:'trans',
    q:'Manuel 到哪裡都騎腳踏車。',
    hint:'se déplacer à vélo',
    a:'Manuel se déplace toujours à vélo.',
    aNote:'se déplacer＝移動、通勤；à vélo（騎車）',
    src:'筆記 第24課 Le sport 表（DELF 書 Exercice 2 原文）' },

  { lesson:24, topic:'vocab-annonces', type:'trans',
    q:'我跟他開車去上班。',
    hint:'partir au travail ＋ 交通工具',
    a:'Je pars avec lui au travail en voiture.',
    aNote:'明信片題陷阱：三個交通工具各去不同地方，要看目的地',
    src:'筆記 第24課 Lire une correspondance 陷阱表（DELF 書 Exercice 5 原文）' },

  { lesson:24, topic:'vocab-annonces', type:'trans',
    q:'下午我去看展覽。',
    hint:'aller voir',
    a:"L'après-midi, je vais voir des expositions.",
    aNote:'exposition 對應選項的 musée——第二題的答案藏在這句',
    src:'筆記 第24課 Lire une correspondance 陷阱表（DELF 書 Exercice 5 原文）' },

  /* ⛔ 刻意沒出：sentences.js S_L24_10「Je peux t'envoyer ce livre aussi.」——老師的課堂閒聊，
     第 24 課四個 topic 都對不上，硬掛會讓主線抽題劇情脫節。
     ⛔ numbers-dates-heure 沒出 trans：筆記裡的時刻都是片語（une heure et demie…），不是句子；
     既有 6 題 choose／fill 已涵蓋。 */
];
