/* ============================================================
   tools/town_encounters_draft.js — 🔀 岔路 ＋ 🧑 路人 兩種遭遇的「可直接貼進 town.html」草稿
   2026-10-15。設計文件：research/2026-10-15_岔路與路人遭遇設計.md（先讀那份，這裡只放程式）
   ⛔ 這支檔案沒有接進 town.html。town.html 一行都沒改。

   ── 怎麼用 ──────────────────────────────────────────────
   1. town.html 的 <script src="questions.js"> 後面加 <script src="scenes.js"></script>
   2. 把下面「貼進 town.html」三段（A 資料／B 岔路／C 路人）整段貼在 town.html 的
      fishSpot() 後面、ratSteal() 前面（它們用到 town.html 已有的：
      openSheet closeSheet esc spk speak shuffle pickQ rec clean sayOf frOnly note toast
      floatTxt hud save addBag fade S hero time nodes log bag region solid deco img SPR）。
   3. 再照每段開頭「⚠️ town.html 要改的地方」逐條改（buildWorld、update、newDay、draw、newOrder）。
   4. 驗算題數：node tools/town_encounters_draft.js   （只讀 questions.js／scenes.js，不碰任何存檔）

   ── 教材鐵律（CLAUDE.md 內容鐵律 1）──────────────────────
   ⛔ 這支檔案不含任何自創的法文句子。題目全部來自 questions.js（BANK），
      居民台詞全部來自 scenes.js（SCENES）。
      岔路的「另一條路」若是從封閉集合（en／au／aux／à…）挑一個「別的介系詞」，
      那只是把課本句子的空格換成另一個功能詞當錯誤選項，⛔ 不是新造句子；
      而且只在「上下文能唯一決定答案」的題目才這樣做（見 CUE_REQUIRED）。
   ============================================================ */
'use strict';

/* ============================================================
   A. 資料（題池＋地圖座標＋居民）
   ============================================================ */

/* ---------- A1. 岔路題池 ---------- */
/* 🪧 路牌＝選對「功能詞」路才通；🪵 木板＝連接詞（句子的兩半在兩岸，木板就是連接詞） */
var CROSS_TOPICS = {
  sign:  ['preposition-country','preposition-place-transport','prepositions-lieu2',
          'duree','negation','restriction-ne-que','paires-confusables'],
  plank: ['connectors-pour-parceque','cause-consequence','expression-but']
};
/* 填空題轉成岔路：只在答案屬於「封閉集合」時才轉，錯路從同一個集合挑 */
var CLOSED = {
  'preposition-country':         [['en','au','aux','à'], ['de','du','des',"d'"]],
  'preposition-place-transport': [['à la','au',"à l'",'chez le','chez la'], ['en','à']],
  'prepositions-lieu2':          [['sous','sur','entre','à droite','à gauche'], ['de','du','des']],
  'duree':                       [['depuis','il y a','pendant','dans']],
  /* ⛔ pas 不當錯路：它是萬用否定，放進去常常也說得通（Tu vas parfois… ? – Non, je ne vais pas…） */
  'negation':                    [['plus','jamais','rien','personne']],
  /* que／qu' 只跟彼此比（練省略）；⛔ 不拿 qu'un 當錯路：Il ne me reste qu'un des gâteaux 也合文法 */
  'restriction-ne-que':          [['que',"qu'"], ["qu'un","qu'une","que"]]
};
/* 這幾類光看句子常常「兩條路都說得通」（Mick ne fait ___ de judo：jamais／plus／pas 都合文法）
   → 只收題幹裡有提示的：對話（– —）、改寫（→）、中文意思「…」、括號提示 (no more)／(兩年前…) */
var CUE_REQUIRED = { 'prepositions-lieu2':1, 'duree':1, 'negation':1 };
function hasCue(q){
  var s=String(q.q);
  return /→|—|–|「/.test(s) || /\(([^)_]{2,})\)|（[^）]{2,}）/.test(s.replace(/\((être|avoir|[a-zé]+er|[a-zé]+ir|[a-zé]+re)\)/g,''));
}
function zhIn(x){ return /[一-鿿]/.test(String(x)); }
function normA(x){ return String(x).replace(/[’]/g,"'").trim(); }
function capLike(w, ref){ return /^[A-ZÀ-Ý]/.test(ref) ? w.charAt(0).toUpperCase()+w.slice(1) : w; }

/* 一題 → 岔路物件 {_i, topic, lesson, q, roads:[...], a:'x|y', aNote, hint, conv}；不適合就回傳 null */
function crossFork(q, i){
  var alts=String(q.a).split('|').map(normA);
  if(q.type==='choose'){
    if(!q.opts || q.opts.length<2) return null;
    if(q.opts.some(zhIn)) return null;                       /* 選項是中文＝概念題，⛔ 路上不出（feedback_gram3_textbook_style） */
    var opts=q.opts.map(normA);
    var right=opts.filter(function(o){ return alts.indexOf(o)>=0; });
    if(!right.length) return null;                           /* 答案不在選項裡（資料錯；目前 0 題，防將來） */
    var wrong=opts.filter(function(o){ return alts.indexOf(o)<0; });
    if(!wrong.length) return null;
    return {_i:i, topic:q.topic, lesson:q.lesson, q:q.q, hint:q.hint, aNote:q.aNote, src:q,
            roadsAll:right.concat(wrong), right:right, a:right.join('|'), conv:false};
  }
  if(q.type==='fill' && CLOSED[q.topic]){
    if(!/_{2,}/.test(q.q)) return null;
    if(CUE_REQUIRED[q.topic] && !hasCue(q)) return null;
    var hit=null, set=null;
    alts.forEach(function(a){ CLOSED[q.topic].forEach(function(S0){ if(!hit && S0.indexOf(a.toLowerCase())>=0){ hit=a; set=S0; } }); });
    if(!hit) return null;
    var others=set.filter(function(w){ return w!==hit.toLowerCase() && alts.map(function(x){return x.toLowerCase();}).indexOf(w)<0; })
                  .map(function(w){ return capLike(w, hit); });
    if(!others.length) return null;
    return {_i:i, topic:q.topic, lesson:q.lesson, q:q.q, hint:q.hint, aNote:q.aNote, src:q,
            roadsAll:[hit].concat(others), right:[hit], a:hit, conv:true};
  }
  return null;
}
function buildCrossPool(bank){
  var P={sign:[], plank:[]};
  bank.forEach(function(q,i){
    var k = CROSS_TOPICS.sign.indexOf(q.topic)>=0 ? 'sign' : CROSS_TOPICS.plank.indexOf(q.topic)>=0 ? 'plank' : null;
    if(!k) return;
    var f=crossFork(q,i); if(f) P[k].push(f);
  });
  return P;
}
/* 每次遭遇才決定要露出哪幾條路：正解全部留著（兩條路都通也是真的），錯路最多補到 3 條
   ⭐ 轉換題（conv）只放 1 條錯路：封閉集合裡越多條，越可能有一條其實也說得通 */
function roadsFor(f){
  var wrong=shuffle(f.roadsAll.filter(function(r){ return f.right.indexOf(r)<0; }));
  var nWrong=f.conv?1:Math.max(1, 3-f.right.length);
  return shuffle(f.right.concat(wrong.slice(0,nWrong)));
}

/* ---------- A2. 岔路地圖座標（對照 town.html 的 region()／NODE_DEF／LOTS，不重疊） ----------
   region：north y≤7／river y8–9／town y≥23 且 x13–27／forest x≤12／mine x≥28／field 其餘
   ⭐ 新增兩條「小溪」（region 'creek'，水、不能走）把兩個 ★ 區圍起來，木板就搭在溪上：
      東溪 x=36, y=11–30（上端 y=10、下端 y≥31 都能繞過去＝不搭木板也到得了 ★；⚠️ 不能放 x=35：礦石 (35,19) 會泡在水裡）
      西溪 x=5,  y=21–30（上端 y=20、下端 y≥31 繞過去）
      ⚠️ 第一章紙條 c3 (37,28) 變成在東溪的對岸——搭木板或繞下面都到得了，⛔ 不會卡主線                                                     */
var CROSS_DEF=[
  /* 🪧 路牌：站在路口，選對的路＝捷徑（瞬間到 to），選錯＝走到死路（dead）再繞回來 */
  {id:'x1', k:'sign',  x:13, y:17, dest:'🌳 森林深處', to:{x:7.5, y:23.5}, dead:{x:14.5,y:13.5}},
  {id:'x2', k:'sign',  x:27, y:17, dest:'⛏ 礦坑深處', to:{x:32.5,y:25.5}, dead:{x:26.5,y:19.5}},
  {id:'x3', k:'sign',  x:18, y:5,  dest:'🎣 西邊的釣點', to:{x:6.5, y:5.5}, dead:{x:16.5,y:2.5}, north:1},
  {id:'x4', k:'sign',  x:22, y:5,  dest:'🎣 東邊的釣點', to:{x:33.5,y:5.5}, dead:{x:23.5,y:2.5}, north:1},
  /* 🪵 斷橋：站在溪邊，搭對木板＝過溪到 ★ 區；搭錯＝木板斷、掉回這一岸 */
  {id:'p1', k:'plank', x:35, y:15, dest:'⛏ 深礦 ★', to:{x:37.5,y:17.5}},
  {id:'p2', k:'plank', x:35, y:27, dest:'⛏ 深礦 ★', to:{x:38.5,y:26.5}},
  {id:'p3', k:'plank', x:6,  y:24, dest:'🌳 老林 ★', to:{x:4.5, y:25.5}},
  {id:'p4', k:'plank', x:6,  y:27, dest:'🌳 老林 ★', to:{x:3.5, y:27.5}}
];
function isCreek(x,y){ return (x===36 && y>=11 && y<=30) || (x===5 && y>=21 && y<=30); }
/* ⚠️ town.html 要改的地方（地圖）：
   ① region()：在 `if(y<=9) return 'river';` 後面加一行 `if(isCreek(x,y)) return 'creek';`
   ② buildWorld()：`var r=region(x,y), g, d=null, s=false, v=rnd();` 之後
        `if(r==='creek'){ g='water'; s=true; }` 放在 river 那行旁邊；
        ⭐ rnd() 照樣要先被呼叫（它已經在 v=rnd() 呼叫了），後面 forest/mine 的 rnd() 也照舊呼叫一次再丟掉，
        不然整張地圖的樹會全部換位置（Owen 已經走過這張圖、霧也存了）。
   ③ buildWorld() 兩處 `NODE_DEF.concat(CLUES)` 改成 `NODE_DEF.concat(CLUES).concat(CROSS_DEF).concat(CROSS_TARGETS())`；
      清格子的條件 `region(X,Y)!=='river'` 改成 `!/river|creek/.test(region(X,Y))`。
   ④ newDay()：nodes 後面 concat 岔路：`CROSS_DEF.map(function(d){ return {k:d.k,x:d.x,y:d.y,def:d,done:false}; })`
   ⑤ update() 的節點觸發：`if(n.k==='sign'||n.k==='plank'){ crossroad(n); return; }`（放在 mineRock 那行前面）；
      北岸的路牌 `if(n.def&&n.def.north&&!S.built.bridge) continue;`
      ⭐ 已經走通的路（n.open）不再出題：路牌 → openShortcutAsk(n)（問一句要不要走，⛔ 不自動傳送，不然從捷徑那頭走回來會被傳回去）；
         木板 → 什麼都不做（溪那一格今天已經可以走了）：`if(n.open){ if(n.k==='sign'&&!n.asked){ n.asked=1; openShortcutAsk(n); return; } continue; }`
         離開路牌 1.5 格以上把 n.asked 清掉（update 裡順手做）
      ⭐ 「走大路」後 4 秒內不再觸發（節點原本沒有 cool，要加）：`if(n.cool>0){ n.cool-=dt; continue; }`
      ⚠️ 走捷徑落地的點離路牌很遠，不會立刻又踩到；但木板的 to 就在對岸一格，⭐ 回程踩到同一塊木板也要直接過（n.open）
   ⑥ draw()：drawNode 加 sign／plank 的畫法（路牌用 SPR.sign＝Tiny Town 83；溪用 water 同色；木板用橋的木色）    */
function CROSS_TARGETS(){ var a=[]; CROSS_DEF.forEach(function(d){ a.push({x:Math.floor(d.to.x),y:Math.floor(d.to.y)}); if(d.dead) a.push({x:Math.floor(d.dead.x),y:Math.floor(d.dead.y)}); }); return a; }

/* ---------- A3. 居民（路人）—— 每位居民＝scenes.js 裡「對方」那個角色 ----------
   role：你（Owen，剛搬來的人）在這個劇本扮演哪個角色；另一個角色就是居民
   ⭐ 居民名字沿用劇本裡的名字（台詞裡會叫到，例：Moi, c'est Clément Dupré.），⛔ 不改台詞      */
var PLAYER_ROLE={
  boulangerie:'client', restaurant:'client', 'restaurant-a2':'client', vetements:'client', tshirt:'client',
  chemin:'touriste', hotel:'touriste', 'hotel-modif':'client', medecin:'patient', pharmacie:'client',
  logement:'locataire', agence:'client', voisin:'nouveau', banque:'client', aeroport:'loic',
  'rendez-vous':'perrine', sport:'moi', entretien:'candidat'
};
var RESIDENTS=[
  /* 第一批（先做這 6 位）。lot＝住哪棟（蓋好之後白天會站在門口）；sit＝situations.js 的情境（插話題從這裡抽） */
  {id:'clement',  name:'Clément Dupré',      spr:['d',99],  lot:'home',   scenes:['voisin'],                        sit:['logement','se-presenter'], first:1},
  {id:'boulanger',name:'La boulangère',      spr:['d',85],  lot:'bakery', scenes:['boulangerie'],                   sit:['courses'],                 first:1},
  {id:'proprio',  name:'La propriétaire',    spr:['d',100], lot:'home',   scenes:['logement'],                      sit:['logement']},
  {id:'thomas',   name:'Thomas',             spr:['d',98],  lot:null,     scenes:['rendez-vous','sport'],           sit:['rendez-vous','loisirs']},
  {id:'pharma',   name:'La pharmacienne',    spr:['d',100], lot:null,     scenes:['pharmacie'],                     sit:['sante']},
  {id:'docteure', name:'La docteure',        spr:['d',99],  lot:null,     scenes:['medecin'],                       sit:['sante']},
  /* 第二批（v2）：Marina（aeroport）、Le serveur（restaurant／restaurant-a2）、Le vendeur（vetements／tshirt）、
     Le monsieur（chemin，只問路不交朋友）、鎮長（entretien，第一天登記用）。
     ⚠️ hotel／hotel-modif／banque／agence 台詞裡報的是外地的店名（Hôtel Atlantique、Hôtel Solis、Banque du Nord、
        Le monde en voyages）→ 不是鎮上的居民，建議做成「📮 郵局的公用電話」：打電話出去，⛔ 不算路人、不算關係值 */
];
/* 對方叫你的名字跟你不是同一個人（劇本裡你叫 M. Rousseau／monsieur Norin／Michel Barbier）：
   ① 居民說的話裡有這些名字 → 照樣顯示（那是他說的話，⛔ 不改）但標「（劇本裡的名字）」
   ② 「你」要說出別人的名字（Oui. Michel Barbier.）→ 這一格不出題，居民直接接下一句        */
var NOT_ME=/Michel Barbier|Norin|Rousseau|Joan|Loïc|Perrine/;
var REL_STAGE=[ {at:0,ic:'',   zh:'陌生'}, {at:1,ic:'🌱',zh:'認識'}, {at:6,ic:'🌿',zh:'熟客'},
                {at:14,ic:'🌳',zh:'信任'}, {at:24,ic:'🌸',zh:'朋友'} ];
var REL_GAIN={good:2, ok:1, bad:0, sceneDone:3};   /* ⛔ 沒有負數：關係只會停，不會退 */

/* ============================================================
   B. 🔀 岔路：crossroad(n)
   ============================================================ */
var CROSS_POOL=(typeof BANK!=='undefined') ? buildCrossPool(BANK) : null;
var DEAD_END=['前面是一片爛泥地，路斷了。','走到底是一道倒掉的籬笆，過不去。','這條路繞了一大圈又回到原地。'];
var PLANK_BREAK=['喀——木板斷了，你掉進淺水裡，爬回這一岸。','木板接不上對岸，一腳踩空。'];

function crossroad(n){
  var d=n.def, isSign=n.k==='sign', star=!isSign;            /* 木板後面是 ★ 區 → 偏後面的課（pickQ 的 star 參數） */
  S.xknown=S.xknown||{};
  /* 「走大路」過的題目出現頻率降低（⛔ 不刪掉：自評 r≈.46，「我覺得會了」不能當事實） */
  var pool=CROSS_POOL[n.k].filter(function(f){ var k=S.xknown[f._i]; return !(k && Math.random()<Math.min(.8, .3*k.n)); });
  var f=pickQ(pool.length?pool:CROSS_POOL[n.k], star); if(!f){ n.done=true; return; }
  var roads=roadsFor(f), t0=Date.now(), done=false;
  var parts=String(f.q).split(/_{2,}/);
  var sentence = isSign
    ? '<div class="clue">🪧 '+esc(f.q).replace(/_{2,}/,'<b style="color:var(--gold)">？</b>')+'</div>'
    : '<div class="clue">🪵 <span class="muted">這一岸</span> '+esc(parts[0]||'')+' <b style="color:var(--gold)">［　］</b> '+esc(parts.slice(1).join('___'))+' <span class="muted">對岸</span></div>';
  var arrows=['⬅','⬆','➡'];
  var html='<h3>'+(isSign?'🔀 岔路 <small>往 '+esc(d.dest)+' 的捷徑</small>':'🪵 斷橋 <small>過溪到 '+esc(d.dest)+'</small>')+'</h3>'+sentence+
    (f.hint?'<div class="hint">💡 '+esc(f.hint)+'</div>':'')+
    '<div class="opts">'+roads.map(function(r,i){ return '<button data-i="'+i+'">'+(isSign?arrows[i%3]+' ':'🪵 ')+esc(clean(r)||r)+'</button>'; }).join('')+'</div>'+
    '<div class="fb" id="fb"></div><div class="row2"><button class="btn ghost" id="skip">↷ '+(isSign?'走大路':'繞到溪的盡頭')+'</button><span id="slot"></span></div>';
  openSheet(html);
  sheet.querySelectorAll('.opts button').forEach(function(b){ b.onclick=function(){
    if(done) return; done=true;
    var pick=roads[+b.dataset.i], ok=f.right.indexOf(pick)>=0, ms=Date.now()-t0;
    var said=frOnly(sayOf(f, f.right[0]));
    rec('q', f, ok, ms, {chosen:pick, right:f.right[0], where:isSign?'🔀 岔路':'🪵 斷橋'});
    sheet.querySelectorAll('.opts button').forEach(function(x){ if(f.right.indexOf(roads[+x.dataset.i])>=0) x.classList.add('ok'); });
    if(!ok) b.classList.add('no');
    if(said) speak(said);
    var fb=document.getElementById('fb');
    document.getElementById('skip').style.visibility='hidden';
    if(ok){
      fb.innerHTML='✓ '+(ms<5000?'<b style="color:var(--gold)">一眼看穿</b> ':'')+(said?'<span class="say">'+esc(said)+'</span> '+spk(said):'');
      setTimeout(function(){ closeSheet(); n.done=true; n.open=true; takeShortcut(n, ms<5000); }, said?1100:500);
    } else {
      /* 後果在角色身上：走冤枉路（時間）／掉進水裡（時間＋閃一下）。⛔ 背包、分數、紀錄都不扣 */
      var story=isSign?DEAD_END[Math.floor(Math.random()*DEAD_END.length)]:PLANK_BREAK[Math.floor(Math.random()*PLANK_BREAK.length)];
      time=Math.max(0, time-(isSign?8:6)); hero.flash=.6;
      fb.innerHTML='<div class="story">'+story+'</div>'+(said?'<div>👉 <span class="say">'+esc(said)+'</span> '+spk(said)+'</div>':'<div>👉 '+esc(f.right[0])+'</div>')+
        (f.aNote?'<div class="muted">'+note(f.aNote)+'</div>':'');
      if(isSign && d.dead){ hero.x=d.dead.x; hero.y=d.dead.y; }       /* 先站到死路那頭，按下面的鍵再回來 */
      document.getElementById('slot').outerHTML='<span><button class="btn" id="around">走大路</button> <button class="btn main" id="retry">'+(isSign?'改走對的路':'換對的木板')+'</button></span>';
      /* ⭐ 答案已經揭曉了，照正解走過去是合法的——錯的代價只是剛剛那幾秒，⛔ 不鎖住他 */
      document.getElementById('retry').onclick=function(){ closeSheet(); n.done=true; n.open=true; takeShortcut(n, false); };
      document.getElementById('around').onclick=function(){ closeSheet(); n.done=true; hero.x=n.x+.5; hero.y=n.y+1.5; };
    }
  }; });
  /* ⭐ 跳過：走大路。不計分、不進回顧；記次數（物件形狀＋last）只拿來降低出現頻率 */
  document.getElementById('skip').onclick=function(){ if(done) return; done=true;
    var k=S.xknown[f._i]||{n:0}; k.n++; k.last=Date.now(); S.xknown[f._i]=k; save();
    closeSheet(); n.cool=4; hero.y+=.6; };
}
/* 捷徑：路牌＝跳到目的地、只花 1 秒（本來要走 15–25 秒）；木板＝今天這座橋都在（溪那一格變成可走） */
function takeShortcut(n, crit){
  var d=n.def;
  fade(function(){ hero.x=d.to.x; hero.y=d.to.y; cam.x=hero.x; cam.y=hero.y; time=Math.max(0,time-1); });
  if(n.k==='plank'){ var cx0=[n.x-1,n.x+1].filter(function(x){ return isCreek(x,n.y); })[0];   /* 東溪在右邊、西溪在左邊 */
    if(cx0!==undefined){ solid[n.y][cx0]=false; n.bridgeCell=[cx0,n.y]; } }                       /* 今天這格可以走；draw 在這格畫木板 */
  if(crit){ var g=n.k==='plank'?4:2; S.gold+=g; floatTxt(d.to.x,d.to.y-.6,'+'+g+'🪙 捷徑','#ffd76a'); save(); hud(); }
}
function openShortcutAsk(n){
  openSheet('<h3>🪧 往 '+esc(n.def.dest)+' 的捷徑今天已經通了</h3><div class="row2"><button class="btn ghost" id="no">不用</button><button class="btn main" id="yes">走捷徑</button></div>');
  document.getElementById('no').onclick=closeSheet;
  document.getElementById('yes').onclick=function(){ closeSheet(); takeShortcut(n,false); };
}
/* ⚠️ newDay() 換日時要把昨天搭的木板收掉：nodes 重建前 `nodes.forEach(function(n){ if(n.bridgeCell) solid[n.bridgeCell[1]][n.bridgeCell[0]]=true; });` */

/* ============================================================
   C. 🧑 路人：villager(v)
   ============================================================ */
var SCENE_BY_ID={}; (typeof SCENES!=='undefined'?SCENES:[]).forEach(function(s){ SCENE_BY_ID[s.id]=s; });

/* 存檔：S.rel[居民id] = { pts, met, sc:目前劇本, at:目前節點, done:{劇本:次數}, path:{劇本:{節點:1}}, last, mood:{d:日期, v:'warm'|'meh'} }
         S.vknown[劇本:節點] = { n:次數, last }   ← 「↷ 這句我會」的紀錄（物件形狀＋last，配合 sync 的物件合併慣例） */
function relOf(id){ S.rel=S.rel||{}; S.vknown=S.vknown||{}; return S.rel[id]||(S.rel[id]={pts:0, met:0, sc:null, at:null, done:{}, path:{}, last:0, mood:null}); }
function stageOf(pts){ var s=0; REL_STAGE.forEach(function(r,i){ if(pts>=r.at) s=i; }); return s; }
function residentById(id){ return RESIDENTS.filter(function(r){ return r.id===id; })[0]; }

/* 一個劇本裡「你」要開口的格子；good 有 1 個以上、而且有一個不是 good 的選項才算「有對錯」 */
function playerNodes(scene){
  var role=PLAYER_ROLE[scene.id], out=[];
  Object.keys(scene.nodes).forEach(function(id){ var n=scene.nodes[id];
    if(n.speaker!==role || !n.choices) return;
    var goods=n.choices.filter(function(c){ return c.tag==='good' && !c.constructed; });
    var graded=n.choices.some(function(c){ return c.tag!=='good'; });
    var clash=goods.some(function(c){ return NOT_ME.test(c.fr); });
    out.push({id:id, graded:graded, free:!graded && goods.length>=2, clash:clash});
  });
  return out;
}
/* 選下一個劇本：先把還沒走完的走完；都走過 → 回到走過的劇本，⭐ 從「還沒走過的分岔」那一格開始（feedback_play_then_memorize） */
function nextScene(R, st){
  for(var i=0;i<R.scenes.length;i++){ if(!st.done[R.scenes[i]]) return {sc:R.scenes[i], at:SCENE_BY_ID[R.scenes[i]].start}; }
  var sc=R.scenes[Math.floor(Math.random()*R.scenes.length)], S0=SCENE_BY_ID[sc], seenP=st.path[sc]||{};
  var unseen=Object.keys(S0.nodes).filter(function(k){ return !seenP[k] && S0.nodes[k].speaker===PLAYER_ROLE[sc]; });
  return {sc:sc, at:unseen.length ? findEntryBefore(S0, unseen[0]) : S0.start};
}
/* 從某個沒走過的格子往回找一個「居民先說話」的入口，讓這段對話有頭 */
function findEntryBefore(scene, target){
  var parent={}; Object.keys(scene.nodes).forEach(function(k){ var n=scene.nodes[k];
    (n.choices||[{next:n.next}]).forEach(function(c){ if(c.next && !parent[c.next]) parent[c.next]=k; }); });
  var p=parent[target]; return p || target;
}

function villager(v){
  var R=residentById(v.rid), st=relOf(R.id), today0=today();
  if(!st.sc || !SCENE_BY_ID[st.sc] || !st.at || st.at==='end'){ var nx=nextScene(R, st); st.sc=nx.sc; st.at=nx.at; }
  var scene=SCENE_BY_ID[st.sc], role=PLAYER_ROLE[scene.id];
  var MAX=2, asked=0, gained=0, anyBad=false, chat=[];
  var firstMeet=!st.met; st.met=1; if(firstMeet) st.pts=Math.max(st.pts,1);
  function head(){ var s=stageOf(st.pts); return '🧑 '+esc(R.name)+' '+(REL_STAGE[s].ic||'')+' <small>'+esc(scene.icon||'')+' '+esc(scene.fr||'')+'</small>'; }
  function bubble(who, fr){ chat.push('<div class="item"><b>'+esc(who)+'</b>：<span class="say">'+esc(fr)+'</span> '+spk(fr)+'</div>'); }
  function goodOf(n){ var g=n.choices.filter(function(c){ return c.tag==='good' && !c.constructed; }); return g[Math.floor(Math.random()*g.length)]||n.choices[0]; }
  function mark(id){ (st.path[st.sc]=st.path[st.sc]||{})[id]=1; }

  function step(){
    var n=scene.nodes[st.at];
    if(!n || n.speaker==='system' || st.at==='end') return sceneEnd();
    if(n.speaker!==role){                                   /* 居民說話：固定台詞，或居民那一方的 good 選項 */
      var c=n.line?{fr:n.line,next:n.next}:goodOf(n);
      bubble(R.name, c.fr); mark(st.at); st.at=c.next; return step();
    }
    if(n.line){ bubble('你', n.line); mark(st.at); st.at=n.next; return step(); }
    if(asked>=MAX) return pause();
    var goods=n.choices.filter(function(c){ return c.tag==='good' && !c.constructed; });
    if(goods.some(function(c){ return NOT_ME.test(c.fr); })){ var g0=goods[0]; bubble('你', g0.fr); mark(st.at); st.at=g0.next; return step(); }
    return ask(n);
  }
  function ask(n){
    var t0=Date.now(), done=false, opts=shuffle(n.choices.filter(function(c){ return !(c.constructed && c.tag==='good'); }));
    var last=chat.slice(-3).join('');
    openSheet('<h3>'+head()+'</h3>'+last+
      (n.tip?'<details class="hint"><summary>💡 情境</summary>'+esc(n.tip)+'</details>':'')+   /* 預設收起來（feedback_orientation_collapsed_by_choice） */
      '<div class="opts">'+opts.map(function(c,i){ return '<button data-i="'+i+'">'+esc(c.fr)+'</button>'; }).join('')+'</div>'+
      '<div class="fb" id="fb"></div><div class="row2"><span><button class="btn ghost" id="known">↷ 這句我會</button> <button class="btn ghost" id="bye">👋 點頭走過</button></span><span id="slot"></span></div>', true);
    sheet.querySelectorAll('.opts button').forEach(function(b){ b.onclick=function(){
      if(done) return; done=true;
      var c=opts[+b.dataset.i], ms=Date.now()-t0, graded=n.choices.some(function(x){ return x.tag!=='good'; });
      var good=c.tag==='good', best=good?c:goodOf(n);
      asked++; mark(st.at);
      /* 紀錄：沿用 town.html 的 rec（topic 用 'scene:<id>'，回顧那裡才分得出是哪個劇本） */
      if(graded) rec('q', {topic:'scene:'+scene.id, _i:'v:'+scene.id+':'+st.at, q:(chat.length?chat[chat.length-1].replace(/<[^>]+>/g,''):'')+'　→ 你要回什麼？',
                           a:best.fr, aNote:c.tag==='good'?(best.note||''):(c.note||''), say:best.fr, lesson:0},
                     c.tag!=='bad', ms, {chosen:c.fr, right:best.fr, where:'🧑 '+R.name});
      var gain=REL_GAIN[c.tag]||0; st.pts+=gain; gained+=gain; if(c.tag==='bad') anyBad=true;
      bubble('你', c.fr); speak(c.fr);
      sheet.querySelectorAll('.opts button').forEach(function(x){ var o=opts[+x.dataset.i]; if(o.tag==='good') x.classList.add('ok'); });
      if(c.tag==='bad') b.classList.add('no');
      var fb=document.getElementById('fb');
      /* 反應在居民身上：good＝笑、ok＝照樣接話但有一點怪、bad＝愣一下（⛔ 不罵他、不扣關係） */
      fb.innerHTML = c.tag==='good' ? '😊 <span class="muted">'+esc(c.zh||'')+'</span>'
        : c.tag==='ok' ? '🙂 '+esc(R.name)+' 照樣接話了。<div class="muted">'+note(c.note||'')+'</div><div>更自然：<span class="say">'+esc(best.fr)+'</span> '+spk(best.fr)+'</div>'
        : '😕 '+esc(R.name)+' 愣了一下。<div class="muted">'+note(c.note||'')+'</div><div>👉 <span class="say">'+esc(best.fr)+'</span> '+spk(best.fr)+'</div>';
      document.getElementById('known').parentNode.style.visibility='hidden';
      document.getElementById('slot').outerHTML='<button class="btn main" id="go">繼續</button>';
      document.getElementById('go').onclick=function(){ st.at=c.next; save(); step(); };
      if(c.tag==='good') setTimeout(function(){ var g=document.getElementById('go'); if(g) g.click(); }, 900);
    }; });
    /* ⭐ 跳過第一層：這一句我會 → 居民自己把話接下去（照 good 那條走），⛔ 不計分、不進回顧，記次數只拿來降低出現頻率 */
    document.getElementById('known').onclick=function(){ if(done) return; done=true;
      var k=scene.id+':'+st.at, o=S.vknown[k]||{n:0}; o.n++; o.last=Date.now(); S.vknown[k]=o;
      var g=goodOf(n); bubble('你', g.fr); mark(st.at); st.at=g.next; asked++; save(); step(); };
    /* ⭐ 跳過第二層：點頭走過 → 這段對話停在這裡，下次遇到從這裡接，⛔ 關係不變 */
    document.getElementById('bye').onclick=function(){ if(done) return; done=true; save(); closeSheet(); v.calm=999; v.wave=1.2; };
  }
  function pause(){                                          /* 一次遭遇最多回 2 句：劇本沒走完也先停，下次接著 */
    finishEncounter(false);
  }
  function sceneEnd(){
    st.done[st.sc]=(st.done[st.sc]||0)+1; st.pts+=REL_GAIN.sceneDone; gained+=REL_GAIN.sceneDone;
    st.sc=null; st.at=null; finishEncounter(true);
  }
  function finishEncounter(full){
    var before=stageOf(st.pts-gained), after=stageOf(st.pts);
    st.last=Date.now(); st.mood={d:today0, v:anyBad?'meh':'warm'}; save();
    var gift='';
    /* 禮物用金幣，⛔ 不塞進背包（背包的 obj 有陰陽性，老鼠題會拿它出題） */
    if(!anyBad && gained>0){ var g=2+stageOf(st.pts); S.gold+=g; hud(); gift='<div>🎁 '+esc(R.name)+' 請你喝了杯咖啡，還塞給你 '+g+' 🪙。</div>'; }
    var up = after>before ? '<div class="story">'+esc(R.name)+' 現在跟你是「'+REL_STAGE[after].zh+'」'+REL_STAGE[after].ic+(after===2?'——之後會到 🏪 交貨攤下訂單。':after===3?'——他好像有話想跟你說。':'')+'</div>' : '';
    openSheet('<h3>'+head()+'</h3>'+chat.slice(-4).join('')+gift+up+
      '<div class="muted">'+(full?'這段對話說完了。':'他還有話沒說完，下次遇到會接著聊。')+'</div>'+
      '<div class="row2"><span></span><button class="btn main" id="ok">再見</button></div>');
    document.getElementById('ok').onclick=function(){ closeSheet(); v.calm=999; v.wave=1.2; };
  }
  step();
}

/* ---------- C2. 居民在地圖上走路 ----------
   ⚠️ town.html 要改的地方：
   ① newDay()：`villagers=spawnVillagers();`
   ② update() 老鼠那段後面：`updateVillagers(dt); for(...) if(碰到) { joy=null; keys={}; villager(v); return; }`
   ③ draw()：villagers 跟 npcs 一起排序畫；名字（stage≥1）畫在頭上，stage 圖示 🌱🌿🌳🌸 畫在名字旁，⛔ 不畫數字
   ④ 右上角 HUD 不加任何關係數字（feedback_fun_is_the_engine：不要秀分母）                         */
var VILLAGER_PATHS=[ /* 居民只走路上：鎮→橋的小路、北岸、麥田邊 */
  [[20,22],[20,11]], [[19,6],[8,5],[30,5]], [[14,20],[26,20]], [[14,12],[26,12]]
];
function spawnVillagers(){
  if(S.rel===undefined) S.rel={};
  var todayStr=today(), out=[];
  /* 腦袋挑人（⛔ 不讓他自己挑）：還有沒走完的劇本 ×1；他最近在這個居民的情境答錯過 ×1.8；
     新居民一天最多多 1 位（第一天：Clément＋La boulangère，因為你剛搬來、要買麵包） */
  var met=RESIDENTS.filter(function(r){ return relOf(r.id).met; });
  var fresh=RESIDENTS.filter(function(r){ return !relOf(r.id).met; }).sort(function(a,b){ return (b.first?1:0)-(a.first?1:0); });
  var cand=met.slice(); if(fresh.length) cand.push(fresh[0]); if(!met.length && fresh[1]) cand.push(fresh[1]);
  cand=cand.map(function(r){ var st=relOf(r.id), w=1;
    var pend=r.scenes.some(function(s){ return !st.done[s]; }); if(pend) w*=1.5;
    (r.scenes||[]).forEach(function(s){ var t=S.topic['scene:'+s]; if(t && t.lastWrong && Date.now()-t.lastWrong<3*86400000) w*=1.8; });
    return {r:r, w:w*(Math.random()+.3)}; }).sort(function(a,b){ return b.w-a.w; });
  cand.slice(0,3).forEach(function(c,i){
    var p=VILLAGER_PATHS[i%VILLAGER_PATHS.length], a=p[0];
    out.push({rid:c.r.id, s:c.r.spr, x:a[0]+.5, y:a[1]+.5, path:p, seg:1, calm:2, wave:0, face:1});
  });
  return out;
}
function updateVillagers(dt){
  villagers.forEach(function(v){
    if(v.wave>0) v.wave-=dt; if(v.calm>0 && v.calm<900) v.calm-=dt;
    var near=Math.hypot(hero.x-v.x, hero.y-v.y);
    var tgt = (v.calm<=0 && near<3.5 && !inTown(hero)) ? {x:hero.x, y:hero.y} : {x:v.path[v.seg][0]+.5, y:v.path[v.seg][1]+.5};
    var spd = v.calm<=0 && near<3.5 ? 1.6 : 1.0;   /* ⭐ 比主角（4.3）慢很多：不想聊直接走開就好＝走開也是合法的跳過 */
    var dx=tgt.x-v.x, dy=tgt.y-v.y, L=Math.hypot(dx,dy)||1;
    if(L<.2 && !(v.calm<=0 && near<3.5)){ v.seg=(v.seg+1)%v.path.length; return; }
    var nx=v.x+dx/L*spd*dt, ny=v.y+dy/L*spd*dt;
    if(!blocked(nx,v.y)) v.x=nx; if(!blocked(v.x,ny)) v.y=ny;
    if(Math.abs(dx)>.05) v.face=dx<0?-1:1;
  });
}
function touchVillager(){ for(var i=0;i<villagers.length;i++){ var v=villagers[i];
  if(v.calm<=0 && Math.hypot(hero.x-v.x, hero.y-v.y)<.7) return v; } return null; }
/* ⭐ 跳過第三層：今天不想聊天 → HUD 的 🌙 收工面板旁加一顆「🙊 今天不聊天」，按了 villagers 全部 calm=999，⛔ 不擋其他遭遇 */
function muteVillagersToday(){ villagers.forEach(function(v){ v.calm=999; }); toast('今天居民只會跟你揮手'); }

/* ---------- C3. 關係 → 訂單／主線 ----------
   ⚠️ town.html 要改的地方：newOrder() 的 who 改成從「熟客以上」的居民抽；沒有熟客時才用原本的 NPCS
   熟客的訂單：每件多 1🪙／階（熟客 +1、信任 +2、朋友 +3）。⛔ 不認識的人不會因為你沒理他而少給錢——只是還沒來下單 */
function orderFromResidents(){
  var regulars=RESIDENTS.filter(function(r){ return stageOf(relOf(r.id).pts)>=2; });
  if(!regulars.length || Math.random()<.35) return null;
  var r=regulars[Math.floor(Math.random()*regulars.length)];
  return {who:r.name, rid:r.id, bonus:stageOf(relOf(r.id).pts)-1};
}
/* 主線：stage 3（信任）＝這位居民的「證詞格」解鎖（STORY_DESIGN 的 A 看穿格／B 開口格）。
   ⚠️ 證詞內容寫在 STORY_BIBLE.md（劇透，Owen 不看），這裡只留插槽：TESTIMONY[居民id][章] = {fr, ask, opts, a, why, wrong}
   ⭐ 嫌疑人一定是居民之一 → 你跟誰熟，誰的證詞就先拿到；⛔ 但每章的推理不能只靠一位居民的證詞（不然沒聊到的人＝卡關） */
var TESTIMONY={};
function testimonyReady(rid, chapter){ return stageOf(relOf(rid).pts)>=3 && TESTIMONY[rid] && TESTIMONY[rid][chapter]; }

/* ============================================================
   D. 驗算（node tools/town_encounters_draft.js）——只在 node 跑，瀏覽器裡不會執行
   ============================================================ */
if(typeof module!=='undefined' && require.main===module){
  var fs=require('fs'), vm=require('vm'), path=require('path'), root=path.join(__dirname,'..');
  var ctx={}; vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(root,'questions.js'),'utf8')+';this.BANK=BANK;', ctx);
  vm.runInContext(fs.readFileSync(path.join(root,'scenes.js'),'utf8')+';this.SCENES=SCENES;', ctx);
  vm.runInContext(fs.readFileSync(path.join(root,'situations.js'),'utf8')+';this.SITUATIONS=SITUATIONS;', ctx);
  var B=ctx.BANK, P=buildCrossPool(B);
  function by(list){ var o={}; list.forEach(function(f){ var k=f.topic+(f.conv?'（填空轉）':'（選擇）'); o[k]=(o[k]||0)+1; }); return o; }
  var raw={}; B.forEach(function(q){ [].concat(CROSS_TOPICS.sign,CROSS_TOPICS.plank).forEach(function(t){ if(q.topic===t) raw[t]=(raw[t]||0)+1; }); });
  console.log('== 🔀 岔路 ==');
  console.log('題庫原始題數（這 10 個 topic，含翻譯題）', Object.values(raw).reduce(function(a,b){return a+b;},0), raw);
  console.log('🪧 路牌可用', P.sign.length, by(P.sign));
  console.log('🪵 木板可用', P.plank.length, by(P.plank));
  console.log('合計', P.sign.length+P.plank.length, '（其中填空轉岔路', P.sign.concat(P.plank).filter(function(f){return f.conv;}).length, '）');
  var bad=B.map(function(q,i){ return [q,i]; }).filter(function(x){ var q=x[0]; return q.type==='choose' && q.opts && !String(q.a).split('|').some(function(a){ return q.opts.map(normA).indexOf(normA(a))>=0; }); });
  console.log('⚠️ 全題庫「答案不在選項裡」的選擇題', bad.length, bad.slice(0,12).map(function(x){ return x[1]+':'+x[0].topic; }).join(' '));
  if(process.argv[2]==='--list') P.sign.concat(P.plank).forEach(function(f){ console.log(f._i, f.topic, f.conv?'轉':'選', '|', f.q.slice(0,80), '|', f.roadsAll.join(' / '), '| ✓', f.right.join('|')); });

  SCENE_BY_ID={}; ctx.SCENES.forEach(function(s){ SCENE_BY_ID[s.id]=s; });
  console.log('\n== 🧑 路人（scenes.js）==');
  var tot={nodes:0, graded:0, free:0, clash:0};
  RESIDENTS.forEach(function(R){
    var r={nodes:0, graded:0, free:0, clash:0};
    R.scenes.forEach(function(sc){ playerNodes(SCENE_BY_ID[sc]).forEach(function(p){ r.nodes++; if(p.clash) r.clash++; else if(p.graded) r.graded++; else if(p.free) r.free++; }); });
    for(var k in r) tot[k]+=r[k];
    console.log(R.name.padEnd(18), R.scenes.join('+').padEnd(26), '你要開口的格', r.nodes, '｜有對錯', r.graded, '｜自由選（都是 good）', r.free, '｜名字衝突跳過', r.clash, '｜≈遭遇數（每次 2 句）', Math.ceil((r.graded+r.free)/2));
  });
  console.log('第一批 6 位合計', tot);
  var all={nodes:0, graded:0, free:0, clash:0};
  ctx.SCENES.forEach(function(s){ if(!PLAYER_ROLE[s.id]) return; playerNodes(s).forEach(function(p){ all.nodes++; if(p.clash) all.clash++; else if(p.graded) all.graded++; else if(p.free) all.free++; }); });
  console.log('18 個劇本全部（含第二批）', all);
  /* 插話題：情境 topic 裡「中文是你想說的話、選項是整句法文」的選擇題 */
  var SIT_T=['social-invitations','greetings-politeness','interdiction-demande','giving-advice','reservation-hotel','message-formel','preference-interet','pouvoir-vouloir','ilfaut-devoir'];
  var inter=B.filter(function(q){ return SIT_T.indexOf(q.topic)>=0 && q.type==='choose' && q.opts && !q.opts.some(zhIn)
    && String(q.a).split('|').some(function(a){ return q.opts.map(normA).indexOf(normA(a))>=0; }); });
  var rawSit=B.filter(function(q){ return SIT_T.indexOf(q.topic)>=0; }).length;
  var o={}; inter.forEach(function(q){ o[q.topic]=(o[q.topic]||0)+1; });
  console.log('questions.js 情境 topic 原始', rawSit, '｜路上可用的選擇題（選項是法文）', inter.length, o);
  var fill=B.filter(function(q){ return SIT_T.indexOf(q.topic)>=0 && q.type==='fill'; }).length;
  console.log('同 topic 的填空題（回城交貨「寫下來」用，不上路）', fill);
}
