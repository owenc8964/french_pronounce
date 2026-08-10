// 時間劇場 — time_theatre.html 專用
// ─────────────────────────────────────────────────────────────
// Owen 2026-08-08：「讓我融入法國人思考時態的世界觀…非得那樣思考」
//                「自然而然跳出一句完整的話語，減少一點一點串成」
//                「還沒學到的可以用中文思考…是套用思考方法」
//
// 設計核心：題目本身不給中文句子，只給「時間的形狀」。
//   要拆掉的是「中文句子→翻成法文」那條路——中文的「正在」「了」會替他扛掉鏡頭，
//   他就永遠不用自己做那個選擇。形狀不會替他做，所以他非得自己選。
//
// ⚠️ Owen 2026-08-10 修正（不要再往「純法文思考」的方向走）：
//   「說穿了就是法文腦，但思考過程還是可以先用中文建立（畢竟法文不夠好），
//     硬要這樣去想肯定失敗」
//   → 用中文推理「這是長條還是點」完全合法，那是必要的鷹架。
//   → 所以每個場景都有 shapeZh：**形狀的中文描述**，不是那句法文的中文翻譯。
//     兩者的差別就是這整個工具成不成立的分界線。
//
// ⚠️ 兩條鐵律：
//   1) 法文 100% 沿用 codex.js 既有例句（跟 tense_lens.js 同源），Claude 未自創。
//   2) 場景不按「學過沒」篩選——四個開關從第一天全開。讀形狀不需要法文知識，
//      沒學過的格子，揭曉時直接把法文的形給他看（思考在前，形式在後）。
//
// ── 形狀語言（shape）──────────────────────────────────────────
//   band  ▬▬▬  持續中、不交代起訖的背景        → imparfait 那一類
//   dot   ●    發生的那一下、有邊界的事件       → passé composé 那一類
//   done  ✓    到旗子之前就已經結束            → ④完成（PQP／futur antérieur…）
//   flag  ⚑    參考點（說話者站的位置）
//   world 'real'   實線＝報告現實
//         'unreal' 虛線＝保留距離（假設、禮貌、反事實）
//         'stance' 雲朵＝表達立場（意志、情緒、懷疑）
//
// ── 資料格式 ─────────────────────────────────────────────────
// { id, era, world, flagAt, items[], slots[], fr, zh, cx, lvl, note }
//   era    : 'past' | 'now' | 'future'  → 軸的底色與旗子標籤
//   items  : [{ kind:'band'|'dot', icon, from, to }]  from/to 是 0–100 的軸座標
//   slots  : [{ ref, cell, accept[], confuse{} }]
//            ref     = 對應 items 的索引（哪個圖形要說出來）
//            cell    = 正確的格子（對到 tense_lens.js 的 CELLS）
//            accept  = 可接受的動詞寫法（比對時忽略大小寫/重音/撇號）
//            confuse = { 錯誤寫法: 那個寫法屬於哪一格 } → 用來精準指出錯在第幾關
//   fr     : 參考整句（揭曉用）
//   note   : 揭曉時的一句話，只講「這個形狀為什麼長這樣」

const SCENES = [

// ═══ 背景條 ＋ 事件點：③鏡頭的主戰場 ═══════════════════════════
{ id:'SC01', shapeZh:'一條雨一直下著（不交代幾點下幾點停）＋出門是切進來的那一下', era:'past', world:'real', flagAt:null,
  items:[ {kind:'band', icon:'🌧', from:8,  to:92},
          {kind:'dot',  icon:'🚪', from:55} ],
  slots:[ {ref:0, cell:'imp', accept:['pleuvait'],
            confuse:{'a plu':'pc','pleut':'present'}},
          {ref:1, cell:'pc',  accept:['suis sorti','suis sortie'],
            confuse:{'sortais':'imp','sors':'present'}} ],
  fr:'Il pleuvait quand je suis sorti.', zh:'我出門時正在下雨。', cx:'5-3-3', lvl:'A2',
  note:'雨是一條沒有起訖的長條，出門是切進來的那一個點。同一句話兩個形狀。' },

{ id:'SC02', shapeZh:'睡覺一直持續著＋電話響是插進來的那一下', era:'past', world:'real', flagAt:null,
  items:[ {kind:'band', icon:'😴', from:6,  to:94},
          {kind:'dot',  icon:'📞', from:62} ],
  slots:[ {ref:0, cell:'imp', accept:['dormais'],
            confuse:{'ai dormi':'pc','dors':'present'}},
          {ref:1, cell:'pc',  accept:['as telephone','as téléphoné'],
            confuse:{'telephonais':'imp','téléphonais':'imp'}} ],
  fr:'Je dormais quand tu as téléphoné.', zh:'你來電時我正在睡。', cx:'5-3-3', lvl:'A2',
  note:'睡覺是持續的狀態，電話響是打斷它的那一下。' },

{ id:'SC03', shapeZh:'讀書持續著＋聽到聲音是突然的那一下', era:'past', world:'real', flagAt:null,
  items:[ {kind:'band', icon:'📖', from:8,  to:90},
          {kind:'dot',  icon:'🔊', from:70} ],
  slots:[ {ref:0, cell:'imp', accept:['lisait'],
            confuse:{'a lu':'pc','lit':'present'}},
          {ref:1, cell:'pc',  accept:['a entendu'],
            confuse:{'entendait':'imp'}} ],
  fr:'Elle lisait un livre. Soudain, elle a entendu un bruit.',
  zh:'她在讀書。突然，她聽到一個聲音。', cx:'5-3-3', lvl:'A2',
  note:'跨兩句也一樣：先舖底，再放那一下。soudain 幾乎是事件點的信號燈。' },

{ id:'SC04', shapeZh:'吃晚餐持續著＋敲門是插進來的那一下', era:'past', world:'real', flagAt:null,
  items:[ {kind:'band', icon:'🍽', from:8,  to:88},
          {kind:'dot',  icon:'🚪', from:66} ],
  slots:[ {ref:0, cell:'imp', accept:['dinions','dînions'],
            confuse:{'avons dine':'pc','avons dîné':'pc'}},
          {ref:1, cell:'pc',  accept:['a frappe','a frappé'],
            confuse:{'frappait':'imp'}} ],
  fr:'Nous dînions tranquillement quand quelqu’un a frappé à la porte.',
  zh:'我們正安靜地吃晚餐時有人敲門。', cx:'5-3-3', lvl:'A2',
  note:'吃飯佔滿整條軸，敲門只佔一個點。' },

{ id:'SC05', shapeZh:'天氣好是背景條件＋因此出門是發生的那一下', era:'past', world:'real', flagAt:null,
  items:[ {kind:'band', icon:'☀️', from:8,  to:60},
          {kind:'dot',  icon:'🚶', from:74} ],
  slots:[ {ref:0, cell:'imp', accept:['faisait'],
            confuse:{'a fait':'pc','fait':'present'}},
          {ref:1, cell:'pc',  accept:['sommes sortis','sommes sorti'],
            confuse:{'sortions':'imp'}} ],
  fr:'Il faisait beau, alors nous sommes sortis.', zh:'天氣很好，所以我們出門了。',
  cx:'5-3-3', lvl:'A2',
  note:'沒有 quand 也一樣——是條件/背景在前，因此發生的動作在後。串接詞會換，形狀邏輯不變。' },

// ⚠️ 陷阱：兩條都是 band，沒有事件點
{ id:'SC06', shapeZh:'兩件事都是反覆的習慣，沒有任何一個「那一下」', era:'past', world:'real', flagAt:null,
  items:[ {kind:'band', icon:'🙂', from:6, to:94},
          {kind:'band', icon:'💬', from:6, to:94} ],
  slots:[ {ref:0, cell:'imp', accept:['souriait'],
            confuse:{'a souri':'pc'}},
          {ref:1, cell:'imp', accept:['parlait'],
            confuse:{'a parle':'pc','a parlé':'pc'}} ],
  fr:'Elle souriait toujours quand elle parlait de son enfance.',
  zh:'她講起童年時總是面帶微笑。', cx:'5-3-3', lvl:'A2',
  note:'⚠️ 兩條都是長條，沒有任何一個點。看到 quand 不要反射去找事件——這裡兩件事都是反覆的習慣。' },

// ⚠️ 陷阱：短的是 band、長的是 dot
{ id:'SC07', shapeZh:'年輕時是一整片模糊的背景＋住兩年是有明確邊界的一塊', era:'past', world:'real', flagAt:null,
  items:[ {kind:'band', icon:'🧒', from:4,  to:96},
          {kind:'dot',  icon:'🗼', from:40, to:66} ],
  slots:[ {ref:0, cell:'imp', accept:['etais','étais'],
            confuse:{'ai ete':'pc','ai été':'pc'}},
          {ref:1, cell:'pc',  accept:['ai vecu','ai vécu'],
            confuse:{'vivais':'imp'}} ],
  fr:"Quand j'étais jeune, j'ai vécu deux ans à Paris.",
  zh:'我年輕時在巴黎住過兩年。', cx:'5-3-3', lvl:'A2',
  note:'⚠️ 整套系統的試金石。住兩年比「年輕時」短，卻是有邊界的一塊。長短不決定形狀，有沒有邊界才決定。' },

{ id:'SC08', shapeZh:'小時候住鄉下，一直住著，不交代搬進搬出', era:'past', world:'real', flagAt:null,
  items:[ {kind:'band', icon:'🏠', from:4, to:96} ],
  slots:[ {ref:0, cell:'imp', accept:['vivais','habitais'],
            confuse:{'ai vecu':'pc','ai vécu':'pc','ai habite':'pc','ai habité':'pc'}} ],
  fr:"Quand j'étais enfant, je vivais à la campagne.", zh:'我小時候住在鄉下。',
  cx:'5-3-1', lvl:'A2',
  note:'不交代哪年搬去哪年搬走——鏡頭在裡面，不在外面看邊界。' },

{ id:'SC09', shapeZh:'昨天參觀博物館，一次有頭有尾的事', era:'past', world:'real', flagAt:null,
  items:[ {kind:'dot', icon:'🏛', from:50} ],
  slots:[ {ref:0, cell:'pc', accept:['ai visite','ai visité'],
            confuse:{'visitais':'imp'}} ],
  fr:"Hier, j'ai visité le musée.", zh:'昨天我參觀了博物館。', cx:'5-2-1', lvl:'A2',
  note:'單獨一個點：去了、看了、結束了。' },

// ⚠️ 陷阱：很長，但仍是一個點
{ id:'SC10', shapeZh:'待在家整個週末——很長，但被包成有邊界的一塊', era:'past', world:'real', flagAt:null,
  items:[ {kind:'dot', icon:'🏡', from:20, to:80} ],
  slots:[ {ref:0, cell:'pc', accept:['est reste','est resté'],
            confuse:{'restait':'imp'}} ],
  fr:'Il est resté chez lui tout le week-end.', zh:'他整個週末都待在家。',
  cx:'5-2-2', lvl:'A2',
  note:'⚠️ 整個週末很長，但被包成一塊有邊界的事。這格畫成粗一點的點，不是長條。' },

// ═══ ④完成：旗子左邊的勾 ═════════════════════════════════════
{ id:'SC11', shapeZh:'旗子＝我抵達那一刻；他們吃飯整個落在旗子左邊而且已結束', era:'past', world:'real', flagAt:70,
  items:[ {kind:'dot',  icon:'🍽', from:30, done:true},
          {kind:'dot',  icon:'🚶', from:70} ],
  slots:[ {ref:0, cell:'pqp', accept:['avaient deja mange','avaient déjà mangé','avaient mange','avaient mangé'],
            confuse:{'ont mange':'pc','ont mangé':'pc','mangeaient':'imp'}},
          {ref:1, cell:'pc',  accept:['suis arrive','suis arrivé','suis arrivee','suis arrivée'],
            confuse:{'arrivais':'imp'}} ],
  fr:'Quand je suis arrivé, ils avaient déjà mangé.',
  zh:'我到的時候，他們已經吃過了。', cx:'5-4-1', lvl:'B1',
  note:'旗子＝我抵達那一刻。吃飯這件事整個落在旗子左邊並且打了勾——④開關開了，這就是 PQP 唯一的工作。' },

{ id:'SC12', shapeZh:'旗子＝那時；她離開發生在旗子之前並且已完成', era:'past', world:'real', flagAt:75,
  items:[ {kind:'dot', icon:'🚪', from:35, done:true} ],
  slots:[ {ref:0, cell:'pqp', accept:['etait deja partie','était déjà partie','etait partie','était partie'],
            confuse:{'est partie':'pc','partait':'imp'}} ],
  fr:'Elle était déjà partie.', zh:'她（那時）已經走了。', cx:'5-4-1', lvl:'B1',
  note:'旗子沒有明講，但語境裡有一個「那時」。déjà 是這一格的常見伴侶。' },

{ id:'SC13', shapeZh:'旗子＝去電影院那次；看過這部片在那之前就完成了', era:'past', world:'real', flagAt:72,
  items:[ {kind:'dot', icon:'🎬', from:30, done:true} ],
  slots:[ {ref:0, cell:'pqp', accept:['avait deja vu','avait déjà vu','avait vu'],
            confuse:{'a vu':'pc','voyait':'imp'}} ],
  fr:'Il avait déjà vu ce film avant d’aller au cinéma avec nous.',
  zh:'他在跟我們去電影院之前就已經看過這部電影了。', cx:'5-4-1', lvl:'B1',
  note:'兩層過去疊起來，先發生的那層退到旗子左邊。' },

// ═══ ②時間點：未來 ══════════════════════════════════════════
{ id:'SC14', shapeZh:'明天天氣好——整條軸移到未來，正式預報口吻', era:'future', world:'real', flagAt:null,
  items:[ {kind:'dot', icon:'☀️', from:60} ],
  slots:[ {ref:0, cell:'fsimple', accept:['fera'],
            confuse:{'va faire':'fproche','fait':'present','faisait':'imp'}} ],
  fr:'Demain, il fera beau.', zh:'明天天氣會好。（氣象預報體）', cx:'5-5-2', lvl:'B1',
  note:'軸整條往未來移。這格跟 futur proche 同一格，差在語域——預報、公告、承諾走 futur simple。' },

{ id:'SC15', shapeZh:'馬上就要遲到——點緊貼在現在的右邊', era:'future', world:'real', flagAt:null,
  items:[ {kind:'dot', icon:'⏰', from:22} ],
  slots:[ {ref:0, cell:'fproche', accept:['va etre','va être','allons etre','allons être'],
            confuse:{'sera':'fsimple','serons':'fsimple','est':'present'}} ],
  fr:'On va être en retard !', zh:'我們要遲到了！', cx:'5-5-1', lvl:'A2',
  note:'點就貼在「現在」的右邊——眼前就要發生、跟現在還連著，這是 futur proche 的主場。' },

{ id:'SC16', shapeZh:'他到（未來）＋我們出發（未來），兩個都在未來軸上', era:'future', world:'real', flagAt:null,
  items:[ {kind:'dot', icon:'🚉', from:35},
          {kind:'dot', icon:'🚗', from:65} ],
  slots:[ {ref:0, cell:'fsimple', accept:['arrivera'],
            confuse:{'arrive':'present','va arriver':'fproche','arriverait':'condhypo'}},
          {ref:1, cell:'fsimple', accept:['partira'],
            confuse:{'part':'present','va partir':'fproche'}} ],
  fr:'Dès qu’il arrivera, on partira.', zh:'他一到我們就出發。', cx:'5-5-2', lvl:'B1',
  note:'⚠️ 中文「他一到」聽起來像現在式，但兩個點都在未來軸上，所以兩邊都是 futur。這是中文母語者的固定陷阱。' },

// ═══ 剛剛完成：貼著現在的左邊 ═══════════════════════════════
{ id:'SC17', shapeZh:'他剛走——點緊貼在旗子（現在）左邊，餘溫還在', era:'now', world:'real', flagAt:60,
  items:[ {kind:'dot', icon:'🚪', from:48, done:true} ],
  slots:[ {ref:0, cell:'precent', accept:['vient de partir'],
            confuse:{'est parti':'pc','partait':'imp','va partir':'fproche'}} ],
  fr:'Il vient de partir.', zh:'他剛走。', cx:'5-6-1', lvl:'A2',
  note:'點緊貼在旗子左邊、餘溫還在。venir 本身是現在式，別被騙了——看的是整組 venir de + 原形。' },

{ id:'SC18', shapeZh:'剛跑完（貼著現在的左邊）＋現在很累（旗子右邊的狀態）', era:'now', world:'real', flagAt:62,
  items:[ {kind:'dot',  icon:'🏃', from:50, done:true},
          {kind:'band', icon:'😮‍💨', from:62, to:94} ],
  slots:[ {ref:0, cell:'precent', accept:['viens de courir'],
            confuse:{'ai couru':'pc','courais':'imp'}},
          {ref:1, cell:'present', accept:['suis'],
            confuse:{'etais':'imp','étais':'imp','ai ete':'pc'}} ],
  fr:'Je suis fatigué, je viens de courir.', zh:'我很累，我剛跑完步。', cx:'5-6-1', lvl:'A2',
  note:'剛結束的點，用來解釋旗子右邊那條狀態——這正是 passé récent 存在的理由：把過去接到現在。' },

// ═══ 現在：depuis 的陷阱 ════════════════════════════════════
{ id:'SC19', shapeZh:'住這裡的長條穿過旗子繼續往右——還住著', era:'now', world:'real', flagAt:70,
  items:[ {kind:'band', icon:'🏠', from:6, to:96} ],
  slots:[ {ref:0, cell:'present', accept:['habite'],
            confuse:{'ai habite':'pc','ai habité':'pc','habitais':'imp'}} ],
  fr:"J'habite ici depuis cinq ans.", zh:'我住這裡五年了（到現在還住）。', cx:'5-1-1', lvl:'A1',
  note:'⚠️ 長條穿過旗子繼續往右——還在持續。中文「五年了」聽起來像完成，但只要條子沒斷在旗子上，法文就是 présent。' },

{ id:'SC20', shapeZh:'住里昂的長條停在旗子之前，而且不交代邊界', era:'past', world:'real', flagAt:null,
  items:[ {kind:'band', icon:'🏙', from:6, to:70} ],
  slots:[ {ref:0, cell:'imp', accept:['habitais'],
            confuse:{'habite':'present','ai habite':'pc','ai habité':'pc'}} ],
  fr:"J'habitais à Lyon avant.", zh:'我以前住里昂。', cx:'5-3-1', lvl:'A2',
  note:'跟上一個場景對照著看：那條穿過旗子（présent），這條停在旗子之前而且不交代邊界（imparfait）。' },

// ═══ ①保留距離：虛線世界 ═══════════════════════════════════
{ id:'SC21', shapeZh:'虛線框＝不是在報告事實，是把話往後退一步變客氣', era:'now', world:'unreal', flagAt:null,
  items:[ {kind:'dot', icon:'☕', from:50} ],
  slots:[ {ref:0, cell:'condpoli', accept:['voudrais'],
            confuse:{'veux':'present','ai voulu':'pc','voulais':'imp'}} ],
  fr:'Je voudrais un café, s’il vous plaît.', zh:'我想要一杯咖啡，謝謝。', cx:'6-2-1', lvl:'A2',
  note:'整個框變虛線＝①開關轉到「保留距離」。je veux 太直接像命令，往後退一步就有禮貌了。跟時間無關。' },

{ id:'SC22', shapeZh:'虛線框：有錢是假的（不是過去！）＋買房是假設成立才會發生的結果', era:'future', world:'unreal', flagAt:null,
  items:[ {kind:'band', icon:'💰', from:6,  to:45},
          {kind:'dot',  icon:'🏡', from:70} ],
  slots:[ {ref:0, cell:'siimp', accept:['etais','étais'],
            confuse:{'suis':'present','ai ete':'pc','ai été':'pc','serais':'condhypo'}},
          {ref:1, cell:'condhypo', accept:['acheterais','achèterais'],
            confuse:{'achete':'present','achète':'present','acheterai':'fsimple','achèterai':'fsimple'}} ],
  fr:'Si j’étais riche, j’achèterais une maison.', zh:'如果我有錢就買房。', cx:'6-6-1', lvl:'B1',
  note:'⚠️ 最重要的一個。左邊那條是 imparfait 的形，但整個世界是虛線——它跟「過去」完全無關，是①距離。si 後面的 imparfait 標記的是「這不是真的」。' },

{ id:'SC23', shapeZh:'虛線框＋旗子左邊打勾：知道這件事是假的，而且我確實已經來了', era:'past', world:'unreal', flagAt:60,
  items:[ {kind:'dot', icon:'🧠', from:25, done:true},
          {kind:'dot', icon:'🚫', from:75} ],
  slots:[ {ref:0, cell:'sipqp', accept:['avais su'],
            confuse:{'ai su':'pc','savais':'imp','saurais':'condhypo'}},
          {ref:1, cell:'condpasse', accept:['ne serais pas venu','serais pas venu','ne serais pas venue'],
            confuse:{'ne suis pas venu':'pc','ne venais pas':'imp'}} ],
  fr:'Si j’avais su, je ne serais pas venu.', zh:'早知道我就不會來了。', cx:'6-2-3', lvl:'B2',
  note:'虛線＋在旗子左邊打勾：①距離疊上④完成。事實是「我不知道，而且我來了」——反事實。' },

{ id:'SC24', shapeZh:'虛線框＋旗子左邊打勾：本來該早點走，但沒有', era:'past', world:'unreal', flagAt:65,
  items:[ {kind:'dot', icon:'⏱', from:30, done:true} ],
  slots:[ {ref:0, cell:'condpasse', accept:['aurais du','aurais dû'],
            confuse:{'ai du':'pc','ai dû':'pc','devais':'imp','devrais':'condhypo'}} ],
  fr:'J’aurais dû partir plus tôt.', zh:'我早該早點走。', cx:'6-2-3', lvl:'B2',
  note:'沒有 si，但「本來該做卻沒做」本身就是虛線世界。悔恨的固定形。' },

// ═══ si 三式的第一式：真實條件（實線！）═══════════════════════
{ id:'SC25', shapeZh:'實線框：明天真的可能下雨＋那我就會待在家', era:'future', world:'real', flagAt:null,
  items:[ {kind:'dot', icon:'🌧', from:30},
          {kind:'dot', icon:'🏠', from:65} ],
  slots:[ {ref:0, cell:'sipres', accept:['pleut'],
            confuse:{'pleuvra':'fsimple','pleuvait':'siimp','va pleuvoir':'fproche'}},
          {ref:1, cell:'fsimple', accept:['resterai'],
            confuse:{'reste':'present','resterais':'condhypo','vais rester':'fproche'}} ],
  fr:'S’il pleut demain, je resterai chez moi.', zh:'明天下雨我就待在家。', cx:'6-6-1', lvl:'A2',
  note:'⚠️ 這個框是實線——真的有可能發生，所以①還在「報告現實」。si 後面用 présent（即使講明天），主句才放 futur。' },

// ═══ ①表達立場：雲朵世界 ═══════════════════════════════════
{ id:'SC26', shapeZh:'雲朵框＝我在施加意志，不是報導他來不來這件事實', era:'now', world:'stance', flagAt:null,
  items:[ {kind:'dot', icon:'🚶', from:55} ],
  slots:[ {ref:0, cell:'subj', accept:['viennes'],
            confuse:{'viens':'present','viendras':'fsimple','venais':'imp'}} ],
  fr:'Il faut que tu viennes.', zh:'你必須來。', cx:'6-3-1', lvl:'B1',
  note:'雲朵＝①轉到「表達立場」：說話者在下判斷、施加意志，不是報導事實。②時間點由主句決定，這個動詞自己不帶時間。' },

{ id:'SC27', shapeZh:'雲朵框＝這件事掛在我的情緒底下，不是單純陳述', era:'now', world:'stance', flagAt:null,
  items:[ {kind:'band', icon:'🙂', from:20, to:80} ],
  slots:[ {ref:0, cell:'subj', accept:['sois'],
            confuse:{'es':'present','etais':'imp','étais':'imp','seras':'fsimple'}} ],
  fr:'Je suis content que tu sois là.', zh:'我很高興你在這裡。', cx:'6-3-1', lvl:'B1',
  note:'「你在這裡」是事實沒錯，但它掛在我的情緒底下，所以整塊進雲朵。情緒＝立場。' },

// ⚠️ 陷阱：肯定的確信要回到實線
{ id:'SC28', shapeZh:'實線框：我很確定，所以是在報告現實，不是表態', era:'future', world:'real', flagAt:null,
  items:[ {kind:'dot', icon:'🏆', from:65} ],
  slots:[ {ref:0, cell:'fsimple', accept:['reussira','réussira'],
            confuse:{'reussisse':'subj','réussisse':'subj','reussit':'present','réussit':'present'}} ],
  fr:'Je suis sûr qu’elle réussira.', zh:'我確定她會成功。', cx:'6-3-3', lvl:'B2',
  note:'⚠️ 陷阱：框是實線。sûr / certain / évident 這種「我很確定」是在報告現實，走直陳式，不是虛擬。' },

{ id:'SC29', shapeZh:'實線框：espérer 雖然是希望，法文把它當成報告現實', era:'future', world:'real', flagAt:null,
  items:[ {kind:'dot', icon:'🤞', from:62} ],
  slots:[ {ref:0, cell:'fsimple', accept:['viendra'],
            confuse:{'vienne':'subj','vient':'present','viendrait':'condhypo'}} ],
  fr:'J’espère qu’il viendra.', zh:'我希望他會來。', cx:'6-3-3', lvl:'B2',
  note:'⚠️ espérer 是最有名的例外——中文英文直覺都覺得「希望」該進雲朵，法文卻是實線直陳。souhaiter que 反而配虛擬。這題單純要記。' },

// ═══ 時態呼應：主句一退，從句整排跟著退 ═══════════════════════
{ id:'SC30', shapeZh:'旗子＝他說話那一刻；「他很累」是那時持續的狀態，被主句拖著退位', era:'past', world:'real', flagAt:55,
  items:[ {kind:'dot',  icon:'💬', from:55},
          {kind:'band', icon:'😩', from:35, to:80} ],
  slots:[ {ref:0, cell:'pc',  accept:['a dit'],
            confuse:{'disait':'imp','dit':'present'}},
          {ref:1, cell:'imp', accept:['etait','était'],
            confuse:{'est':'present','a ete':'pc','a été':'pc'}} ],
  fr:'Il a dit qu’il était fatigué.', zh:'他說他很累。', cx:'5-8-1', lvl:'B2',
  note:'⚠️ 這裡的長條不是③鏡頭挑出來的，是被主句拖下去的：原話是 je suis fatigué，主句一變過去，從句整排退位。' },

{ id:'SC31', shapeZh:'旗子＝她心裡那時；「你會來」是站在那個過去往後看的未來', era:'past', world:'real', flagAt:50,
  items:[ {kind:'band', icon:'🤔', from:20, to:70},
          {kind:'dot',  icon:'🚶', from:82} ],
  slots:[ {ref:0, cell:'imp', accept:['pensait'],
            confuse:{'a pense':'pc','a pensé':'pc','pense':'present'}},
          {ref:1, cell:'condhypo', accept:['viendrais'],
            confuse:{'viendras':'fsimple','venais':'imp','viens':'present'}} ],
  fr:'Elle pensait que tu viendrais.', zh:'她以為你會來。', cx:'5-8-1', lvl:'B2',
  note:'⚠️ 右邊那個點長得像條件式，功能卻是「過去裡的未來」——原話 tu viendras 退位而來。形式相同、來路不同，B2 最容易誤判的一格。' },

{ id:'SC32', shapeZh:'兩個接連發生的那一下（書面敘事的口吻）', era:'past', world:'real', flagAt:60,
  items:[ {kind:'dot', icon:'📖', from:25},
          {kind:'dot', icon:'🚶', from:45} ],
  slots:[ {ref:0, cell:'psimple', accept:['ouvrit'],
            confuse:{'a ouvert':'pc','ouvrait':'imp'}},
          {ref:1, cell:'psimple', accept:['sortit'],
            confuse:{'est sorti':'pc','sortait':'imp'}} ],
  fr:'Il ouvrit la porte et sortit.', zh:'他開門出去了。（小說體）', cx:'5-7-1', lvl:'B2',
  note:'形狀跟 passé composé 完全一樣——兩個點。差別純粹是語域：這一格只出現在書面文學敘事，口語永遠不用。認得出來就夠了。' },

];

if (typeof module !== 'undefined') module.exports = { SCENES };
