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
// ⚠️ 來源與轉錄範圍（不要憑印象補沒看過的圖）
//   來源：Owen 的 `~/Desktop/ＧＰＴ/`（11 張，HANDOFF 08-07 記載已逐張核對、內容零錯誤）。
//   圖檔每張約 3.7MB、共約 38MB，且這個 repo 會 push 到公開的 GitHub Pages，
//   所以**不搬圖檔，改成文字＋SVG 轉錄**：體積小、可連 codex 座標、手機好讀、
//   而且才能「重複出現」。
//   已實際看過並逐字轉錄：時間劇院 1/9、3/9、4/9、7/9 ＋「四個開關×14 時態」海報的九宮格。
//   ⛔ 尚未轉錄：時間劇院 2/9、5/9、6/9、8/9、9/9（還沒看過，不猜）。
//
// ⚠️ 一個重要對照（08-10 發現）
//   Owen 給的四個開關順序，就是**時間劇院 1/9 的原文**，不是他自己重排的。
//   而「四個開關×14 時態」那張海報用的是 WHEN→CAMERA→REALITY→RELATION，
//   兩張圖本來就不同調。codex 5-9-1 已對齊 1/9（也就是 Owen 的版本）。
//   1/9 的①有**四個**選項，比我原本寫的多一個：推動對方行動 → impératif。

const HALL = [

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

{ id:'H2', kind:'pair', src:'時間劇院 3/9',
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

{ id:'H3', kind:'character', src:'時間劇院 4/9',
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

{ id:'H4', kind:'doors', src:'時間劇院 7/9',
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
  warn:'⚠️ si 後面通常不直接接 conditionnel。',
  soul:'先認出是哪一扇門，再選對時態。',
  cx:'6-6-1' },

{ id:'H5', kind:'grid', src:'「四個開關 × 14 種時態」海報',
  title:'九宮格總覽', sub:'14 種時態住在同一座城市',
  lead:'橫軸是①我這句想做什麼，縱軸是②我站在哪個時間點看。',
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

// ⛔ 待轉錄：時間劇院 2/9、5/9、6/9、8/9、9/9
//    這 5 張還沒實際看過，**不要憑推測補**（違反內容鐵律，而且錯誤會長得跟正確的一模一樣）。
//    補的時候：讀 ~/Desktop/ＧＰＴ/ 剩下的 PNG，照上面 kind 的格式加進來即可。
];

if (typeof module !== 'undefined') module.exports = { HALL };
