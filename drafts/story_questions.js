/* drafts/story_questions.js — D1 候選題（2026-09-16 清晨排程）
   ════════════════════════════════════════════════════════════════
   對應 GAME_ROADMAP.md 佇列項 D1：STORY.md 健檢列出的節點缺產出題（fill/trans）。

   ⚠️ 09-16 重新核對發現 STORY.md 09-13 的健檢數字已經過期（題庫已長大到第34課）：
   用 tools/tmp_story_node_health.js 重跑後，「完全沒有 fill/trans」從 4 個節點降到只剩 2 個
   （ch2-3 vocab-annonces 已經有 1 題 fill、ch9-3 reservation-hotel 已經有 3 題 trans）。
   本批候選只做**還在榜上**的最嚴重 2 個節點：
     ch4-4（boss · vocab-places-city，最弱的關主，只有 2 題選擇題）
     ch12-4（trial · strategie-lecture，10 題選擇但 0 題產出——「考驗」預設會推薦詠唱，抽不到題會跑去別課）
   choose<4 但已有產出題的 18 個節點（ch1-1, ch1-2, ch1-4, ch5-2, ch6-4, ch8-1, ch8-3, ch8-4,
   ch9-2, ch9-3, ch10-1, ch10-2, ch11-1, ch11-5, ch12-1, ch12-2, ch12-3, ch12-5）留給下一次 D 項，
   優先序：choose=1 的最急（ch5-2/ch9-2/ch10-1/ch10-2）。

   ════════════════════════════════════════════════════════════════
   來源紀律（鐵律 1）：
   · strategie-lecture 的 6 題全部是**逐字**搬用 questions.js 既有 choose 題 aNote 裡
     已經引用過的課本原句（Édito PRÊT POUR L'EXAMEN 段），只是換一種題型考同一句話，
     ⛔ 沒有任何一個字是新造的。
   · vocab-places-city 的 7 題是把 french_notes.html 第2、3課裡**已經出現過的完整句子／片語**
     （見每題 source 欄）拿掉一兩個字挖空，或把課本已示範過的句型換一個已教過的字重組
     （標 askClaude:true，比照 questions.js 裡 reservation-hotel 那幾題「課堂上自己組出來的句子」
     的既有前例——這批全部是候選，⏸ 入庫前必須讓 Owen 逐題核對）。
   ════════════════════════════════════════════════════════════════ */
var STORY_QUESTION_DRAFTS = [

  /* ── ch12-4／strategie-lecture（trial，第24課）────────────────────
     來源：questions.js 既有 choose 題的 aNote 已引用的 Édito 課本原句，逐字沿用 */
  { lesson:24, topic:'strategie-lecture', type:'fill',
    q:'_____ tous les chiffres.（把所有數字圈起來）',
    hint:'entourer＝圈起來，命令式 vous',
    a:'Entourez',
    aNote:'課本原句（見 questions.js L1157 aNote）：Entourez tous les chiffres.',
    source:'questions.js:1157 aNote（Édito PRÊT POUR L\'EXAMEN）' },
  { lesson:24, topic:'strategie-lecture', type:'fill',
    q:'Repérez les mots-clés (_____ par document).（一份文件抓三個關鍵字）',
    hint:'數字，陽性',
    a:'trois',
    aNote:'課本原句（見 questions.js L1158 aNote）：Repérez les mots-clés (trois par document).',
    source:'questions.js:1158 aNote（Édito）' },
  { lesson:24, topic:'strategie-lecture', type:'fill',
    q:'Si vous ne connaissez pas un mot, ne vous _____ pas.（不懂某個字不要慌）',
    hint:'s\'inquiéter 的命令式 vous',
    a:'inquiétez',
    aNote:'課本原句（見 questions.js L1160 aNote）：Si vous ne connaissez pas un mot, ne vous inquiétez pas.',
    source:'questions.js:1160 aNote（Édito）' },
  { lesson:24, topic:'strategie-lecture', type:'fill',
    q:'Vous ne devez pas faire d\'_____.（你不能出錯）',
    hint:'erreur 的複數',
    a:'erreurs',
    aNote:'課本原句（見 questions.js L1161 aNote）：Vous ne devez pas faire d\'erreurs.',
    source:'questions.js:1161 aNote（Édito）' },
  { lesson:24, topic:'strategie-lecture', type:'trans',
    q:'把所有數字圈起來。',
    hint:'entourer + 命令式',
    a:'Entourez tous les chiffres.',
    aNote:'課本原句，逐字（見 questions.js L1157 aNote）',
    source:'questions.js:1157 aNote（Édito）', askClaude:false },
  { lesson:24, topic:'strategie-lecture', type:'trans',
    q:'如果你不認識一個字，不要擔心。',
    hint:'ne vous inquiétez pas',
    a:'Si vous ne connaissez pas un mot, ne vous inquiétez pas.',
    aNote:'課本原句，逐字（見 questions.js L1160 aNote）',
    source:'questions.js:1160 aNote（Édito）', askClaude:false },

  /* ── ch4-4／vocab-places-city（boss，第2、3課）───────────────────
     來源：french_notes.html 第2、3課裡已出現的句子／片語，見各題 source 欄
     ⚠️ 全部標 askClaude:true——句型取自課本，但字詞組合是重組，入庫前務必給 Owen 核對 */
  { lesson:2, topic:'vocab-places-city', type:'fill',
    q:'Tu _____ dans quelle ville ?（你住在哪個城市？）',
    hint:'habiter，第二人稱',
    a:'habites',
    aNote:'課本原句（見 french_notes.html #lesson-2）：Tu habites dans quelle ville ?',
    source:'french_notes.html #lesson-2（Tu habites dans quelle ville ?）', askClaude:false },
  { lesson:3, topic:'vocab-places-city', type:'fill',
    q:'J\'habite dans un appartement avec _____ amie.（我跟一個朋友（女）住在一間公寓）',
    hint:'不定冠詞，陰性',
    a:'une',
    aNote:'課本原句（見 french_notes.html #lesson-3）：J\'habite dans un appartement avec une amie.',
    source:'french_notes.html #lesson-3（J\'habite dans un appartement avec une amie.）', askClaude:false },
  { lesson:3, topic:'vocab-places-city', type:'fill',
    q:'C\'est _____ rue des Arts.（那是 Arts 街）',
    hint:'定冠詞，陰性',
    a:'la',
    aNote:'課本原句（見 french_notes.html #lesson-3）：C\'est la rue des Arts.',
    source:'french_notes.html #lesson-3（C\'est la rue des Arts.）', askClaude:false },
  { lesson:2, topic:'vocab-places-city', type:'fill',
    q:'Je vais à la _____ pour emprunter un livre.（我去圖書館借書）',
    hint:'⚠️ 假朋友：不是 librairie',
    a:'bibliothèque',
    aNote:'librairie＝書店；bibliothèque＝圖書館（見 french_notes.html #lesson-2 假朋友區塊）',
    source:'french_notes.html #lesson-2（la librairie ≠ library：librairie=書店；bibliothèque=圖書館）', askClaude:true },
  { lesson:2, topic:'vocab-places-city', type:'trans',
    q:'這是一條不錯的街。',
    hint:'C\'est + une rue + sympa',
    a:'C\'est une rue sympa.',
    aNote:'句型取自「C\'est la rue des Arts.」，sympa 取自第2課詞彙（不錯、友善）',
    source:'french_notes.html #lesson-2（sympa）＋#lesson-3（C\'est la rue des Arts. 句型）', askClaude:true },
  { lesson:3, topic:'vocab-places-city', type:'trans',
    q:'那是市長。',
    hint:'C\'est + le/la maire',
    a:'C\'est le maire.',
    aNote:'句型取自「C\'est la rue des Arts.」，maire 取自第3課同音詞組（la mer / la mère / le maire）',
    source:'french_notes.html #lesson-3（la mer/la mère/le maire 同音組）＋（C\'est la rue des Arts. 句型）', askClaude:true },
  { lesson:2, topic:'vocab-places-city', type:'trans',
    q:'你住在哪個街區？',
    hint:'Tu habites dans quel + quartier',
    a:'Tu habites dans quel quartier ?',
    aNote:'句型取自「Tu habites dans quelle ville ?」，quartier 取自第2課詞彙（街區、社區）',
    source:'french_notes.html #lesson-2（le quartier；Tu habites dans quelle ville ? 句型）', askClaude:true },
];
