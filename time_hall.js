// 時間劇院（常駐讀本）— time_hall.html 專用
// ─────────────────────────────────────────────────────────────
// Owen 2026-08-10：
//   「很多東西可以不用用題目做，算是讀／浸潤／體驗式學習。
//     題目是驗收或輸入輸出的過程，但學習不是只有題目。」
//   「我給你那個 GPT 資料夾內容，我甚至覺得有需要重複讓我學習／思考。」
//
// 所以這一頁**沒有題目、沒有計分、沒有 SRS**。只有讀，跟「今天讀過了」。
// 它是 BLOCKS.md 說的「感知塊的鏡頭校正表，要一直在旁邊」的實體。
//
// ── 來源 ─────────────────────────────────────────────────────
// Owen 的 `~/Desktop/ＧＰＴ/`（11 張，HANDOFF 08-07 記載已逐張核對、內容零錯誤）。
// 圖檔每張約 3.7MB、共約 38MB，且這個 repo 會 push 到公開的 GitHub Pages，
// 所以**不搬圖檔，改成文字＋SVG 轉錄**：體積小、可連 codex 座標、手機好讀，
// 而且才能「重複出現」。
//
// ✅ 2026-08-10：法文時間劇院 **9 張全部讀過並逐字轉錄完畢**（H1–H9），
//    另加「四個開關 × 14 時態」海報的九宮格（H10）。
//    系列骨架：一個故事貫穿（Luc 今晚會不會來 / Luc 離開 / 我抵達），
//    每張把一組時態寫成角色，附別名、時間軸、對照與一句話靈魂。
//
// ── 兩個對照結果（重要，不要改回去）─────────────────────────────
// 1) Owen 給的四個開關順序，就是時間劇院 1/9 的原文，不是他自己重排的。
//    另一張「四開關×14時態」海報用的是 WHEN 先——兩張圖本來就不同調。
//    codex 5-9-1 已對齊 1/9。
// 2) 1/9 的①有**四個**選項：報告現實 / 保留距離 / 表達立場 / 推動對方行動（impératif）。
//    9/9 另外把 impératif 獨立成框：「不描述世界，直接要世界改變。」
//
// ⚠️ 這份檔案裡的法文全部照圖轉錄，未自創。改內容前先回去看圖。

const HALL = [

// ═══ 1/9 ═════════════════════════════════════════════════════
{ id:'H1', kind:'framework', src:'時間劇院 1/9',
  title:'四個開關', sub:'先不要背時態，先學會法文怎麼看一件事',
  lead:'Luc 今晚會不會來？—— Une seule histoire, plusieurs regards.',
  switches:[
    { n:'①', q:'我這句話想做什麼？', opts:[
      {label:'報告現實', to:'indicatif', cx:'5-1-1'},
      {label:'保留距離／可能性', to:'conditionnel', cx:'6-2-1'},
      {label:'把事情放進願望、情緒、必要、判斷裡', to:'subjonctif', cx:'6-3-1'},
      {label:'推動對方行動', to:'impératif', cx:'6-1-1'} ] },
    { n:'②', q:'我站在哪個時間點看？', opts:[
      {label:'過去'},{label:'現在'},{label:'未來'} ] },
    { n:'③', q:'我要怎麼拍它？', opts:[
      {label:'完整事件（從外面看）'},{label:'展開中的畫面（進到裡面看）'} ] },
    { n:'④', q:'到那個時間點，它已經完成了嗎？', opts:[
      {label:'直接看它'},{label:'看見它在參考點之前已完成'} ] },
  ],
  soul:'法文不只告訴你事情發生在何時，還要求你選擇鏡頭、距離、情緒與視角。',
  cx:'5-9-1' },

// ═══ 2/9 ═════════════════════════════════════════════════════
{ id:'H2', kind:'cast', src:'時間劇院 2/9',
  title:'Indicatif：我把它當作現實來報告',
  sub:'現實攝影團登場',
  lead:'不是猜想，不是命令，而是把事情當成成立的世界來描述。',
  colHead:['直接看它','看見它在參考點之前已完成'],
  worlds:[
    { name:'現在世界', a:{ n:'1', tense:'présent', alias:'現場主播',
        desc:'描述現在、習慣、事實，也可表示已排定的未來。',
        fr:'Luc arrive.', zh:'Luc 正在抵達／Luc 到了。', cell:'present' },
      b:{ n:'2', tense:'passé composé', alias:'紀錄官',
        desc:'把過去事件當成完整整體來登記。',
        fr:'Luc est arrivé à vingt heures.', zh:'Luc 二十點到了。', cell:'pc' } },
    { name:'過去世界', a:{ n:'3', tense:'imparfait', alias:'長鏡頭攝影師',
        desc:'拍背景、習慣、狀態、進行中的畫面。',
        fr:'Il pleuvait et les invités parlaient.', zh:'當時下著雨，客人們正在聊天。', cell:'imp' },
      b:{ n:'4', tense:'plus-que-parfait', alias:'檔案管理員',
        desc:'站在過去往前看，那時以前已完成。',
        fr:'Quand je suis arrivé, Luc était déjà parti.', zh:'我到的時候，Luc 已經離開了。', cell:'pqp' } },
    { name:'未來世界', a:{ n:'5', tense:'futur simple', alias:'未來建築師',
        desc:'直接站進未來，說那裡會發生什麼。',
        fr:'Luc arrivera à vingt heures.', zh:'Luc 二十點會到。', cell:'fsimple' },
      b:{ n:'6', tense:'futur antérieur', alias:'驗收經理',
        desc:'先站到未來，再回頭看哪件事已完成。',
        fr:'À vingt et une heures, Luc sera déjà arrivé.', zh:'到二十一點，Luc 應該已經到了。', cell:'fanterieur' } },
  ],
  extra:{ title:'現在附近的兩個特寫工具', items:[
    { label:'passé récent / venir de + 不定詞', fr:"Luc vient d'arriver.", zh:'Luc 剛到。' },
    { label:'être en train de', fr:"Luc est en train de monter l'escalier.", zh:'Luc 正在上樓梯。' } ] },
  soul:'Indicatif 的核心：我把事情當作成立的世界來報告。',
  cx:'5-1-1' },

// ═══ 3/9 ═════════════════════════════════════════════════════
{ id:'H3', kind:'pair', src:'時間劇院 3/9',
  title:'Passé composé vs Imparfait', sub:'事件與畫面的分工',
  lead:'不是「長短之分」，而是「完整事件」與「展開中的畫面」。',
  left:{ name:'Passé composé', tag:'事件鏡頭', cell:'pc',
    points:['從外面看整件事','看到前後邊界','推動故事往前走'],
    ex:[{fr:'Luc a ouvert la porte.',zh:'Luc 打開了門。'},
        {fr:'Luc est arrivé.',zh:'Luc 到了。'}] },
  right:{ name:'Imparfait', tag:'畫面鏡頭', cell:'imp',
    points:['進入事情內部','拍背景、習慣、狀態、感受','不急著交代開始與結束'],
    ex:[{fr:'Il pleuvait.',zh:'當時下著雨。'},
        {fr:'Les invités parlaient.',zh:'客人們正在聊天。'}] },
  clash:{ fr:'Je dormais quand le téléphone a sonné.',
    a:{t:'je dormais', note:'背景／展開中的畫面'},
    b:{t:'a sonné', note:'新事件／劇情前進'} },
  warn:'⚠️ 不要簡化成「長動作用 imparfait、短動作用 passé composé」。J\'ai vécu dix ans à Paris.（我在巴黎住了十年）十年很長，但說話者仍可把它包成一個完整事件。真正差別是：**你怎麼拍它**。',
  soul:'Passé composé 與 imparfait，是法文過去敘事最重要的一對鏡頭。',
  cx:'5-3-3' },

// ═══ 4/9 ═════════════════════════════════════════════════════
{ id:'H4', kind:'character', src:'時間劇院 4/9',
  title:'Plus-que-parfait', sub:'過去的前傳',
  lead:'它不是「很久以前」，而是「站在一個過去點，再往前看」。',
  alias:'檔案管理員（Archives du passé）',
  timeline:['Luc 離開','我抵達','現在說故事'],
  anchor:{ fr:'Quand je suis arrivé, Luc était déjà parti.', zh:'我到的時候，Luc 已經離開了。' },
  points:['一定要先有一個過去參考點','它負責打開「那時以前」的檔案','形式上常是 imparfait 助動詞 + 過去分詞'],
  vs:{ left:{name:'imparfait', q:'在那個過去當時，世界是什麼樣子？',
             fr:'Luc était fatigué.', zh:'Luc 當時很累。'},
       right:{name:'plus-que-parfait', q:'在那以前，已經發生了什麼？',
             fr:'Il avait mal dormi.', zh:'他之前睡得不好。'} },
  combo:{ fr:'Luc était fatigué parce qu\'il avait mal dormi.',
    a:{t:'était fatigué', note:'過去當時的狀態'},
    b:{t:'avait mal dormi', note:'更早以前已完成的原因'} },
  soul:'先給我一個過去點，我再帶你回到那之前。',
  cell:'pqp', cx:'5-4-1' },

// ═══ 5/9 ═════════════════════════════════════════════════════
{ id:'H5', kind:'doors', src:'時間劇院 5/9',
  title:'三種看未來的方法', sub:'未來不只一種',
  lead:'有的是正在醞釀，有的是直接藍圖，有的是站到未來回頭看。',
  doors:[
    { n:'1', name:'futur proche ／ 蓄勢待發式', rule:'未來的影子已經出現在現在。',
      cell:'fproche',
      ex:[{fr:'Luc va arriver.',zh:'Luc 要到了。'},
          {fr:"Je vais déménager l'année prochaine.",zh:'我明年要搬家。'}],
      foot:'不一定是「馬上」；也可以是已經有計畫或跡象。' },
    { n:'2', name:'futur simple ／ 未來藍圖式', rule:'我直接站進未來世界，說那裡會發生什麼。',
      cell:'fsimple',
      ex:[{fr:'Luc arrivera à vingt heures.',zh:'Luc 二十點會到。'}],
      foot:'用途：預測／承諾／安排。' },
    { n:'3', name:'futur antérieur ／ 未來回望式', rule:'我先站到未來，再回頭看哪件事已完成。', cell:'fanterieur',
      ex:[{fr:'À vingt et une heures, Luc sera déjà arrivé.',zh:'到二十一點，Luc 應該已經到了。'}],
      foot:'時間視角的樓梯：現在 → Luc 抵達 → 21:00 回頭看。' },
  ],
  warn:'🥚 **B2 彩蛋**：futur antérieur 也可用來**推測過去**。Il aura oublié.（他大概是忘了。）',
  soul:'法文看未來時，也會選擇距離與視角。',
  cx:'5-5-2' },

// ═══ 6/9 ═════════════════════════════════════════════════════
{ id:'H6', kind:'uses', src:'時間劇院 6/9',
  title:'Conditionnel：退後半步的距離語式',
  sub:'它不只是「條件式」，更是在現實之外保留一點距離',
  lead:'Conditionnel 的共同感覺：我不直接把命題壓在現實正中央。',
  cols:[
    { n:'1', name:'conditionnel présent', alias:'可能世界式', cell:'condhypo', items:[
      {label:'假設結果', fr:'Si Luc avait le temps, il viendrait.', zh:'如果 Luc 有時間，他就會來。'},
      {label:'禮貌', fr:'Je voudrais un café.', zh:'我想要一杯咖啡。'},
      {label:'過去看未來', fr:"Il a dit qu'il viendrait.", zh:'他說他會來。'},
      {label:'建議', fr:'Tu devrais partir plus tôt.', zh:'你應該更早出發。'} ] },
    { n:'2', name:'conditionnel passé', alias:'錯過世界式', cell:'condpasse', items:[
      {label:'反事實（錯過的可能）', fr:'Si Luc avait eu le temps, il serait venu.', zh:'如果 Luc 當時有時間，他本來就會來。'},
      {label:'後悔', fr:"J'aurais dû l'appeler.", zh:'我當時應該打給他的。'},
      {label:'責備', fr:'Tu aurais pu me prévenir.', zh:'你本來可以先告訴我的。'},
      {label:'傳聞／未證實', fr:'Le ministre aurait démissionné.', zh:'據說部長已經辭職了。'} ] },
  ],
  chips:{ title:'距離可以是', list:['假設距離','禮貌距離','資訊距離','時間視角距離'] },
  soul:'Conditionnel 的核心，不是單純「有條件」，而是「保留距離」。',
  cx:'6-2-1' },

// ═══ 7/9 ═════════════════════════════════════════════════════
{ id:'H7', kind:'doors', src:'時間劇院 7/9',
  title:'Si 句的三扇門', sub:'不是每一個 si 都通往條件式',
  lead:'要先看它屬於哪個世界。',
  doors:[
    { n:'1', name:'真實可能世界', rule:'si + présent → présent / futur simple / impératif',
      cell:'sipres',
      ex:[{fr:'Si je suis fatigué, je me couche tôt.',zh:'如果我累，我就早點睡。',tag:'présent → présent'},
          {fr:'Si Luc vient, nous dînerons ensemble.',zh:'如果 Luc 來，我們就會一起吃飯。',tag:'présent → futur simple'},
          {fr:'Si Luc vient, appelle-moi.',zh:'如果 Luc 來，打給我。',tag:'présent → impératif'}],
      foot:'條件被視為真實可能。' },
    { n:'2', name:'與現在不同的可能世界', rule:'si + imparfait → conditionnel présent',
      cell:'siimp',
      ex:[{fr:'Si Luc avait le temps, il viendrait.',zh:'如果 Luc 有時間，他就會來。'}],
      foot:'現在事實通常不是這樣。' },
    { n:'3', name:'與過去事實不同的世界', rule:'si + plus-que-parfait → conditionnel passé',
      cell:'sipqp',
      ex:[{fr:'Si Luc avait eu le temps, il serait venu.',zh:'如果 Luc 當時有時間，他本來就會來。'}],
      foot:'那條世界線已經關上了。' },
  ],
  warn:'⚠️ si 後面通常**不直接接 conditionnel**。',
  soul:'先認出是哪一扇門，再選對時態。',
  cx:'6-6-1' },

// ═══ 8/9 ═════════════════════════════════════════════════════
{ id:'H8', kind:'uses', src:'時間劇院 8/9',
  title:'Subjonctif：事情被另一個立場包住了',
  sub:'它不是「虛假」，而是從句不再被獨立拿來報告事實',
  lead:'Subjonctif 的重點不是真假，而是：這件事現在依附在願望、必要、情緒、懷疑、目的、讓步或時間界線之下。',
  cols:[
    { n:'1', name:'subjonctif présent', alias:'心願／立場世界式', cell:'subj', items:[
      {label:'願望', fr:'Je veux que Luc vienne.', zh:'我希望 Luc 來。'},
      {label:'必要', fr:'Il faut que Luc vienne.', zh:'Luc 必須來。'},
      {label:'懷疑', fr:'Je doute que Luc vienne.', zh:'我懷疑 Luc 會來。'},
      {label:'目的', fr:'pour que …', zh:''},
      {label:'讓步', fr:'bien que …', zh:''},
      {label:'時間界線', fr:'avant que …', zh:''} ],
      foot:'通常表示與主句同時或在其之後。' },
    { n:'2', name:'subjonctif passé', alias:'已完成事件的立場式', cell:'subjpasse', items:[
      {label:'', fr:'Je suis contente que Luc soit venu.', zh:'我很高興 Luc 來了。'},
      {label:'', fr:"Je regrette qu'il soit parti.", zh:'我遺憾他已經離開。'} ],
      foot:'表示在主句立場之前，從句動作已完成。' },
  ],
  clash:{ fr:'Je pense qu’il vient. ／ Je ne pense pas qu’il vienne.',
    a:{t:'qu\'il vient', note:'我認為他會來（直陳）'},
    b:{t:'qu\'il vienne', note:'我不認為他會來（虛擬）'} },
  soul:'請記住：subjonctif 不是「虛假」，而是「從句被另一個語意框架支配」。',
  cx:'6-3-1' },

// ═══ 9/9 ═════════════════════════════════════════════════════
{ id:'H9', kind:'summary', src:'時間劇院 9/9',
  title:'總結：遇到動詞，先問這四句話',
  sub:'時態不是背出來的，而是被你導演出來的',
  lead:'當你先懂這張地圖，之後每個形式都只是把角色放回正確的位置。',
  steps:[
    {n:'1', q:'我這句話想做什麼？',            hint:'先定意圖，再談語法。'},
    {n:'2', q:'我站在哪個時間點看？',          hint:'先找鏡頭站位，再定視角。'},
    {n:'3', q:'我要怎麼拍它？',                hint:'先選鏡頭與構圖，再決定形式。'},
    {n:'4', q:'到那個時間點，它已經完成了嗎？', hint:'先判斷「完成與否」，再選完成系。'},
  ],
  sym:{ title:'法文最迷人的整齊感', head:['','直接看它','看見它在參考點之前已完成'],
    rows:[
      ['現在世界','présent','passé composé'],
      ['過去世界','imparfait','plus-que-parfait'],
      ['未來世界','futur simple','futur antérieur'],
      ['可能世界','conditionnel présent','conditionnel passé'],
      ['立場世界','subjonctif présent','subjonctif passé'] ],
    note:'這裡的「已完成」，是相對於參考點的完成。' },
  boxes:[
    { title:'Impératif', desc:'不描述世界，直接要世界改變。',
      ex:[{fr:'Viens !',zh:''},{fr:'Allons-y !',zh:''},{fr:'Attendez ici !',zh:''}] },
    { title:'文學閱讀補充（B2 先看得懂即可）', desc:'',
      ex:[{fr:'Luc entra dans la salle.', zh:'passé simple ≈ 文學中的 passé composé'},
          {fr:"Lorsqu'il eut fini, Luc sortit.", zh:'passé antérieur ≈ 文學中的「在那以前已完成」'}] },
  ],
  soul:'法文不只告訴你事情發生在何時，還要求你選擇鏡頭、距離、情緒與視角。',
  cx:'5-9-1' },

// ═══ 另一張海報：四個開關 × 14 時態 ═══════════════════════════
{ id:'H10', kind:'grid', src:'「四個開關 × 14 種時態」海報',
  title:'九宮格總覽', sub:'14 種時態住在同一座城市',
  lead:'橫軸是①我這句想做什麼，縱軸是②我站在哪個時間點看。跟 9/9 的「整齊感」是同一批時態的另一種切法。',
  head:['','現實世界 Indicatif','平行宇宙 Conditionnel','內心世界 Subjonctif'],
  rows:[
    ['現在',        'Présent',            '—',                      'Subjonctif présent'],
    ['過去（背景）','Imparfait',          '—',                      '—'],
    ['過去（事件）','Passé composé',      '—',                      '—'],
    ['過去的過去',  'Plus-que-parfait',   'Conditionnel passé',     'Subjonctif passé'],
    ['未來',        'Futur simple',       'Conditionnel présent',   '—'],
    ['未來的未來',  'Futur antérieur',    '—',                      '—'],
  ],
  soul:'學法文時，先別急著背變化。先打開這四個開關：時間 → 角度 → 現實層次 → 關係。你就能知道：為什麼要用這個時態。',
  cx:'5-9-1' },

];

if (typeof module !== 'undefined') module.exports = { HALL };
