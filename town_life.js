/* ============================================================
   🏘️ 小鎮居民「活起來」（10-30 Owen：「居民完全不互動很奇怪；我對居民一點也不熟悉，他們也不會來交流、一起解題；
   他們應該要自主活動」「有個性很重要……會想跟他多聊、甚至會懷念；聊天內容最好深入、真實一點」）
   設定稿：drafts/居民設定稿_2026-10-30.md（六人；Margot 第三章才登場，這版不做）
   ⛔ 法文規則：居民說的法文只從課程材料挑（chunks.js 的 id 寫在旁邊），深度靠中文（角色故事是原創，不是教材）
   ⭐ 不卡原則：居民的事「路過可見、點了才停」——聊天是頭上泡泡；來找你最多約 5 分鐘一次，站旁邊揮手，不理他自己走；
      他請你看的題目是「取代」路上題目的一部分，總量不增加
   ============================================================ */
var LIFE=[
  { id:'bernard', name:'Bernard', role:'麵包師傅', spr:['d',85], lot:'bakery', fam:'noun', cards:['AC2'],
    intro:'「來來來，新面孔！你看起來就是會吃可頌的人。」他笑得很大聲，手上的麵粉拍了你一肩膀。',
    lines:[ [0,'今天的長棍烤得剛好。你知道嗎，麵包會告訴你它好了沒——敲一敲，聲音空空的就對了。'],
            [0,'鎮上人少，麵包還是每天烤一樣多。習慣了，改不掉。'],
            [0,'收攤的時候我最喜歡說這句。', 'Il n\'y a plus de pain.', '麵包沒了。'],
            [1,'你女兒多大了？……一歲半啊。那個年紀，每天都會多一個新的字。'],
            [1,'你答錯也沒關係啦，我烤壞的麵包比你答錯的題多。', 'C\'est pas grave.', '沒關係。'],
            [2,'晚上？晚上我很早就睡了。……你為什麼這樣看我？'],
            [2,'有時候我會想，如果鐘還會響，日子是不是就不會停在同一天。'],
            [3,'她小時候最喜歡偷吃麵包的邊。我現在切麵包，還是會把邊留下來。'] ],
    beats:[ {at:3, t:'他把一個還熱的小圓麵包塞給你：「試吃的，不准說不好吃。」<br>你咬了一口。他盯著你看，等你的表情——那個樣子不像老闆，比較像一個想被誇獎的爸爸。', fact:'烤麵包會先給你試吃，很在意你的反應'},
            {at:8, t:'收攤後他沒有馬上進屋，坐在門口的台階上。<br>「你知道我為什麼每天都烤一樣多嗎？」他沒等你回答，「因為以前家裡有三個人吃。」<br>他拍拍褲子站起來：「好啦，明天見。」', fact:'以前家裡有三個人'},
            {at:14, t:'櫃台後面貼著一張褪色的畫，是小孩畫的：一個大鬍子拿著一條很長的麵包，旁邊寫著「Papa」。<br>你看著那張畫，他也看著。<br>「她畫的。後來她說要去看海的另一邊。」他沒有再說下去。', fact:'櫃台後面有一張女兒畫的畫'} ],
    asks:['她會說幾個字了？你都怎麼跟別人介紹你的家？'],
    req:[ '「我要寫今天的價目牌，這裡該填哪個？我老是搞混。」', '「客人留了一張訂單，有一格看不太懂，幫我看一下？」' ] },

  { id:'clement', name:'Clément', role:'森林邊的老人', spr:['d',111], lot:'cottage', fam:'pron', cards:['AC5','AC1'],
    intro:'他站在小屋門口，沒有走過來。「你是新搬來的那位。」語氣不是問句。「進來就不必了，門口講就好。」',
    lines:[ [0,'森林裡的聲音，聽久了會分得出來：風、鳥、還有自己的念頭。'],
            [0,'你說你喜歡把東西分類？我以前也是。後來發現有些東西放不進任何一格。'],
            [0,'學東西會忘，是好事。忘了再撿回來的，才是你的。', 'Il faut continuer, c\'est normal d\'oublier.', '要繼續下去，會忘記是正常的。'],
            [1,'我以前讀很多書。讀到最後，人停在書裡，沒有活在今天。……你也發現了？'],
            [1,'我小時候，這片森林比現在大。', 'Quand j\'étais petit…', '當我小時候……'],
            [2,'你分類東西的時候，有沒有覺得自己在找某種安全感？……不用回答我，問你自己就好。'],
            [2,'我太太泡的茶比我好喝很多。我一直沒學會，大概是不想學會。'],
            [3,'你下次來，可以直接進來。門沒鎖。……以前也沒鎖，只是沒有人來。'] ],
    beats:[ {at:3, t:'他終於讓你在門口的長椅坐下，遞給你一杯茶。很難喝。<br>「難喝吧。」他自己也喝了一口，皺眉，「每天都提醒我一件事。」<br>他沒說是什麼事。', fact:'每天泡很難喝的茶，說是在提醒自己一件事'},
            {at:8, t:'屋裡的書堆到天花板，但桌上只有一本是打開的，旁邊放著一副女用的眼鏡。<br>「她看書比我快。」Clément 把眼鏡收進抽屜，「我一直以為讀得多就懂得多。她走了以後我才知道，我只是讀得多。」', fact:'太太過世了；桌上留著她的眼鏡'},
            {at:14, t:'「你那個『換一種眼光看世界』的說法，」他突然說，「是你自己想出來的？」<br>你點頭。<br>他笑了，你第一次看到他笑。「那你比我早懂。」', fact:'他知道你「換一種眼光」的想法，說你比他早懂'} ],
    asks:['你最近讀了什麼？讀完之後，有沒有哪一句留下來？', '學法文對你來說，是什麼感覺？'],
    req:[ '「我在讀一封老朋友的信，這裡的代名詞指誰，我一時看不出來。」', '「這句話少了一個字，你覺得應該補哪個？」' ] },

  { id:'lucie', name:'Lucie', role:'郵差', spr:['d',99], lot:'post', fam:'pron', cards:['AC8','AC7'],
    intro:'一台腳踏車在你面前急煞。「你就是那個新來的！我是 Lucie，送信的，鎮上的事問我就對了。」她講話很快，像怕來不及。',
    lines:[ [0,'今天的信不多，鎮上人少嘛。不過該送的我都會送到，一封都不會漏。'],
            [0,'你知道嗎，Bernard 每天晚上都提燈出門，我送晚班的信看到好幾次了。噓，別說是我講的。'],
            [0,'我奶奶說，用新東西就要問孫女。所以全鎮的手機都是我在修。', 'Il faut que tu demandes à ta petite-fille comment ça marche.', '你得問問你孫女那個怎麼用。'],
            [1,'你為什麼想去加拿大？……不是，我是說真的，你家人怎麼想？'],
            [1,'蒙特婁那邊的信，我都會多看一眼郵戳。'],
            [2,'我想去城裡念書。我奶奶說好，可是她說好的時候眼睛沒有看我。'],
            [2,'希望我能學會忍住不哭啦。', 'J\'espère que je vais apprendre à résister !', '希望我能學會忍住！'],
            [3,'如果我走了，誰來送信？……你不要說「再找一個就好」，我會生氣。'] ],
    beats:[ {at:3, t:'她把一封信塞給你看，又馬上搶回去。<br>「你什麼都沒看到喔。」<br>你看到了：信封上印著蒙特婁一間大學的校徽。', fact:'收到蒙特婁一間大學的信，還沒告訴任何人'},
            {at:8, t:'她今天沒騎車，用走的，眼睛有點紅。<br>「我跟奶奶吵架了。她說我要去就去，不用管她。」她踢著路邊的石頭，「她每次都這樣，把話講得很大方，害我更走不了。」', fact:'跟奶奶吵架：奶奶要她去，她更走不了'},
            {at:14, t:'「你出國之前，」Lucie 很認真地看著你，「怎麼跟家人說的？」<br>你想了很久才回答。她聽完，把郵差帽戴正。<br>「好。那我也要好好說。」', fact:'問你出國前怎麼跟家人說，決定要好好跟奶奶談'} ],
    asks:['你出國這個決定，家人一開始怎麼想？', '你為什麼想去加拿大？'],
    req:[ '「這封信的地址我看不懂，你幫我看看這一句？」', '「我在寫回信，這裡要用哪個代名詞才對？」' ] },

  { id:'amira', name:'Amira', role:'交貨攤老闆', spr:['d',100], lot:'stall', fam:'noun', cards:['AC8','AC15'],
    intro:'「你要買還是要看？要看的話站旁邊一點，不要擋到我的客人。」她看了一眼空蕩蕩的街，自己先笑出來。「好啦，開玩笑的。你要什麼？」',
    lines:[ [0,'我的東西是全市場最好的。這是事實，不是推銷。', 'Ils sont les meilleurs du marché.', '它們是市面上最好的。'],
            [0,'便宜？我這裡不說便宜，說「划算」。', 'bon marché / pas cher', '便宜的'],
            [0,'殺價是一種藝術。你殺得太狠我會難過，殺得太少我會看不起你。'],
            [1,'我剛來的時候，把「我很熱」講成很奇怪的意思，整個店的人都在笑。我到現在還記得那個人的臉。'],
            [1,'你移民的事，想好了嗎？……不用想好，沒有人想好過。'],
            [2,'第一個冬天，我每天都想回家。真的，每天。'],
            [2,'我女兒現在法文講得比我好。她家長會的通知，我要偷偷查字典才看得懂。'],
            [3,'你知道最難的是什麼嗎？不是語言。是你有一天發現，你回不去原本那個家，這裡也還不是家。'] ],
    beats:[ {at:3, t:'她多塞了一顆蘋果到你的袋子裡。<br>「不要跟別人說。我對每個新來的人都這樣，因為以前也有人這樣對我。」', fact:'會多塞一顆蘋果給新來的人——以前有人這樣對她'},
            {at:8, t:'今天攤子收得很早。她坐在箱子上，手裡捏著一張紙。<br>「女兒學校的家長會。」她把紙折起來，「我每次都坐在最後面，怕老師問我問題。」', fact:'怕家長會，每次都坐在最後面'},
            {at:14, t:'「你那個口說稿，」她說，「講給我聽一次。」<br>你講完。她沒有挑你的錯，只說：「很好。你比我第一年好太多了。」<br>停了一下，她又說：「下次家長會，你陪我先練一次好不好？」', fact:'請你陪她練家長會要說的話'} ],
    asks:['你到了加拿大，第一年最擔心什麼？', '如果移民不成，你的生活會怎樣？'],
    req:[ '「客人點的東西我寫在這，有一格不確定對不對，幫我看一下。」', '「我在寫價目牌，這裡的冠詞是哪個？」' ] },

  { id:'gaston', name:'Gaston', role:'鐵匠', spr:['d',86], lot:'forge', fam:'verb', cards:['AC3'],
    intro:'鐵匠抬頭看了你一眼，點點頭，又低頭繼續敲。過了很久才說了一個字：「嗯。」',
    lines:[ [0,'嗯。'],
            [0,'鐵要燒到對的顏色才能敲。早了會裂，晚了會軟。'],
            [0,'你最近鐵砧敲得不錯。……我只是說說。'],
            [1,'我爸是木匠。我小時候幫他磨木頭。', 'Mon père était menuisier, donc je l\'aidais à poncer.', '我爸是木匠，所以我以前會幫他磨木頭。'],
            [1,'以前這間店很吵，現在只剩我。', 'Plus maintenant, mais avant…', '現在沒有了，但以前……'],
            [2,'你做牙醫，是你自己選的嗎？……沒什麼，隨便問。'],
            [2,'我兒子在城裡做工程師。他說他畫的東西比我打的東西用得久。也許他說得對。'],
            [3,'如果有一天要重新打一口鐘，我想要他在旁邊。不是要他幫忙，只是在旁邊。'] ],
    beats:[ {at:3, t:'他把一根剛打好的釘子放在你手上，什麼都沒說。<br>釘子還有點溫度，打得很直。你猜這大概是他的「你好」。', fact:'送你一根剛打好的釘子，算是打招呼'},
            {at:8, t:'牆上掛著一把小小的鐵鎚，跟其他工具比起來像玩具。<br>「我兒子的。」他順著你的目光說，「他五歲的時候，說要跟我一樣。」<br>他轉身去顧爐子。', fact:'牆上掛著兒子五歲時的小鐵鎚'},
            {at:14, t:'「你當牙醫，你爸媽怎麼說？」他問。<br>你回答了。他聽完，敲了三下鐵砧，很輕。<br>「我應該打個電話給他。」', fact:'聽完你的回答，說應該打電話給兒子'} ],
    asks:['你為什麼當牙醫？是你自己選的嗎？', '工作上最累的是什麼？'],
    req:[ '「這張訂單上的動詞我看不懂是哪個時候的事，幫我看一下？」', '「我在寫交貨單，這裡的動詞要怎麼變？」' ] }
];
var LIFE_PAIRS={   /* 兩個人路上碰到會聊的話（中文為主；⛔ 法文只用課程材料） */
  'bernard|amira':[ ['amira','你的麵包今天又烤太多了吧？'], ['bernard','烤剛好。是鎮上的人太少。'], ['amira','那你就烤少一點啊。'], ['bernard','……習慣了。'] ],
  'lucie|gaston':[ ['lucie','Gaston！你兒子有寄信來喔！'], ['gaston','……放著。'], ['lucie','你都不看一下？'], ['gaston','晚點。'] ],
  'clement|lucie':[ ['lucie','Clément 先生，你的書到了，好重！'], ['clement','謝謝。你最近在讀什麼？'], ['lucie','大學的簡章……啊，我什麼都沒說。'], ['clement','（笑）我什麼都沒聽到。'] ],
  'bernard|gaston':[ ['bernard','你那口爐子比我的烤爐還熱吧？'], ['gaston','嗯。'], ['bernard','哪天我們交換一天試試？'], ['gaston','……你會把鐵烤成麵包。'] ],
  'amira|lucie':[ ['amira','你真的要去蒙特婁？'], ['lucie','還沒決定啦。'], ['amira','去吧。第一個冬天很難，但你會長大。'], ['lucie','你怎麼知道？'], ['amira','因為我也是這樣過來的。'] ],
  'clement|bernard':[ ['bernard','老師，要不要來一條長棍？'], ['clement','不了，一個人吃不完。'], ['bernard','我也是一個人啊，還不是每天烤一樣多。'], ['clement','……那就來一條吧。'] ]
};
var LIFE_REL=[ {at:0,ic:'',zh:'陌生'}, {at:1,ic:'🌱',zh:'認識'}, {at:4,ic:'🌿',zh:'熟悉'}, {at:9,ic:'🌳',zh:'信任'}, {at:15,ic:'🌸',zh:'朋友'} ];
function lifeSt(id){ S.life=S.life||{}; return S.life[id]||(S.life[id]={pts:0, met:0, seen:{}, beats:{}, talkDay:'', last:0}); }
function lifeStage(p){ var s=0; LIFE_REL.forEach(function(r,i){ if(p>=r.at) s=i; }); return s; }
function lifeRes(id){ return LIFE.filter(function(r){ return r.id===id; })[0]; }
function lifeBuilt(R){ return R.lot==='stall' || !!S.built[R.lot]; }

/* ---------- 作息：照遊戲裡一天的時段（早上上工、中午廣場、下午河邊或串門子、晚上回家亮燈） ---------- */
var people=[], lifeApproach={t:0, who:null, wait:0}, lifeChat=null, lifeChatCool=0;
function lifeDoor(R){ var L=LOTS[R.lot], d=L?L.door:[20,29]; return freeNear(d[0]+.5, d[1]+1.2); }
function lifeSpots(R){
  var ix=LIFE.indexOf(R), home=lifeDoor(R), pl=lifeSlot('pl'+ix, PLAZA.x+[-1.6,1.6,-.6,.8,0][ix%5], PLAZA.y+[0,0,1.4,1.4,-1.2][ix%5]), riv=lifeSlot('rv'+ix, 17.5+ix*1.6, 24.2);
  var ph=(1-time/dayLen()), P;
  if(night) P=home; else if(ph<.33) P=home; else if(ph<.62) P=pl; else P= (R.id==='clement'||R.id==='gaston') ? home : riv;
  return P;
}
/* 每個人在廣場／北口有自己的位子（不會兩個人疊在同一格） */
var LIFE_SLOTS={};
function lifeSlot(k, x, y){ if(LIFE_SLOTS[k]) return LIFE_SLOTS[k]; var used=Object.keys(LIFE_SLOTS).map(function(q){ return LIFE_SLOTS[q]; }).concat(CHALLENGES.map(function(c){ return {x:c.x+.5, y:c.y+.5}; }));
  for(var r=0;r<5;r++) for(var dy=-r;dy<=r;dy++) for(var dx=-r;dx<=r;dx++){ var P=freeNear(x+dx, y+dy); if(!used.some(function(u){ return Math.hypot(u.x-P.x,u.y-P.y)<1; })) return (LIFE_SLOTS[k]=P); }
  return (LIFE_SLOTS[k]=freeNear(x,y)); }
function lifeSpawn(){ people=[];
  LIFE.forEach(function(R){ if(!lifeBuilt(R)) return; var p=lifeDoor(R);
    people.push({rid:R.id, R:R, x:p.x, y:p.y, path:[], goal:null, face:1, idle:Math.random()*3, chat:null, walk:false}); }); }
/* 格子 BFS（只走不擋路的格子），算出一串路點 */
function lifePath(x0,y0,x1,y1){
  var sx=Math.floor(x0), sy=Math.floor(y0), tx=Math.floor(x1), ty=Math.floor(y1); if(sx===tx&&sy===ty) return [[x1,y1]];
  var prev={}, q=[[sx,sy]], k0=sy*W+sx; prev[k0]=-1; var found=false;
  while(q.length){ var c=q.shift(); if(c[0]===tx&&c[1]===ty){ found=true; break; }
    [[1,0],[-1,0],[0,1],[0,-1]].forEach(function(d){ var X=c[0]+d[0], Y=c[1]+d[1], k=Y*W+X; if(X<0||Y<0||X>=W||Y>=H||prev[k]!==undefined||isSolidAt(X+.5,Y+.5)) return; prev[k]=c[1]*W+c[0]; q.push([X,Y]); }); }
  if(!found) return [[x1,y1]];
  var out=[], k=ty*W+tx; while(k!==k0 && k!==-1 && k!==undefined){ out.unshift([k%W+.5, Math.floor(k/W)+.5]); k=prev[k]; }
  out[out.length-1]=[x1,y1]; return out;
}
function lifeUpdate(dt){
  if(!people.length) return false;
  lifeChatCool-=dt;
  people.forEach(function(p){
    if(p.chat){ p.chat.t-=dt; if(p.chat.t<=0) p.chat=null; return; }
    if(lifeApproach.who===p){ return lifeApproachStep(p, dt); }
    var G=lifeSpots(p.R);
    if(!p.goal || Math.hypot(p.goal.x-G.x, p.goal.y-G.y)>.5){ p.goal=G; p.path=lifePath(p.x,p.y,G.x,G.y); }
    lifeWalk(p, dt, 1.5);
    if(!p.path.length){ p.idle-=dt; if(p.idle<=0){ p.idle=3+Math.random()*4; var w=freeNear(G.x+(Math.random()*2-1), G.y+(Math.random()*1.2-.6));
      if(!people.some(function(o){ return o!==p && Math.hypot(o.x-w.x,o.y-w.y)<1.1; }) && !CHALLENGES.some(function(c){ return Math.hypot(c.x+.5-w.x,c.y+.5-w.y)<1; })) p.path=[[w.x,w.y]]; } }
  });
  lifeTryChat(); lifeTryApproach(dt);
  /* 主角停在居民旁邊不動 0.5 秒 → 打開聊天（⛔ 走路經過不會被攔） */
  if(!pending && hero.moving<.1){ for(var i=0;i<people.length;i++){ var p=people[i];
    if(Math.hypot(p.x-hero.x, p.y-hero.y)<.9 && (p.talkCool||0)<clock){ p.stand=(p.stand||0)+dt; if(p.stand>.8){ p.stand=0; p.talkCool=clock+6; pending={t:.1, x:p.x, y:p.y-.5, fn:(function(p){ return function(){ lifeTalk(p); }; })(p)}; return true; } } else p.stand=0; } }
  return false;
}
function lifeWalk(p, dt, sp){ var wp=p.path[0]; if(!wp){ p.walk=false; return; }
  var dx=wp[0]-p.x, dy=wp[1]-p.y, L=Math.hypot(dx,dy), st=sp*dt;
  if(L<=st){ p.x=wp[0]; p.y=wp[1]; p.path.shift(); } else { p.x+=dx/L*st; p.y+=dy/L*st; }
  if(Math.abs(dx)>.05) p.face=dx<0?-1:1; p.walk=true; }
/* 兩個人靠近、都閒著 → 停下來聊一段（頭上輪流冒泡泡） */
function lifeTryChat(){
  if(lifeChat || lifeChatCool>0) return;
  for(var i=0;i<people.length;i++) for(var j=i+1;j<people.length;j++){ var a=people[i], b=people[j];
    if(a.chat||b.chat||lifeApproach.who===a||lifeApproach.who===b||Math.hypot(a.x-b.x,a.y-b.y)>3.2) continue;
    var key=LIFE_PAIRS[a.rid+'|'+b.rid]?a.rid+'|'+b.rid:(LIFE_PAIRS[b.rid+'|'+a.rid]?b.rid+'|'+a.rid:null); if(!key) continue;
    a.path=[]; b.path=[];
    lifeChat={lines:LIFE_PAIRS[key], i:0, t:0, a:a, b:b}; a.face=b.x>a.x?1:-1; b.face=a.x>b.x?1:-1; return; }
}
function lifeChatStep(dt){ var C=lifeChat; if(!C) return; C.t-=dt; if(C.t>0) return;
  if(C.i>=C.lines.length){ lifeChat=null; lifeChatCool=40; [C.a,C.b].forEach(function(p){ p.chat=null; }); return; }
  var L=C.lines[C.i++], sp=L[0]===C.a.rid?C.a:C.b, other=sp===C.a?C.b:C.a; sp.chat={tx:L[1], t:3.2}; other.chat=other.chat&&other.chat.t>0?other.chat:{tx:'', t:3.2}; C.t=3.2; }
/* ---------- 主動來找你（約 5 分鐘最多一次；站旁邊揮手，點他才開始；不理他 15 秒自己走） ---------- */
function lifeTryApproach(dt){
  lifeChatStep(dt);
  if(lifeApproach.who || pending || wild || !inTown(hero) || clock-lifeApproach.t<300) return;
  var cand=people.filter(function(p){ return !p.chat && lifeSt(p.rid).met && Math.hypot(p.x-hero.x,p.y-hero.y)<12; }); if(!cand.length) return;
  var p=cand[Math.floor(Math.random()*cand.length)]; lifeApproach={t:clock, who:p, wait:15}; p.path=lifePath(p.x,p.y,hero.x+.8,hero.y);
}
function lifeApproachStep(p, dt){
  var near=Math.hypot(p.x-hero.x,p.y-hero.y);
  if(near>1.2 && p.path.length){ lifeWalk(p, dt, 2.4); if(!p.path.length || Math.hypot(p.path[p.path.length-1][0]-hero.x, p.path[p.path.length-1][1]-hero.y)>2.5) p.path=lifePath(p.x,p.y,hero.x+.8,hero.y); return; }
  p.waving=true; p.face=hero.x<p.x?-1:1; lifeApproach.wait-=dt;
  if(lifeApproach.wait<=0){ p.waving=false; lifeApproach.who=null; p.goal=null; }
}
function lifeHelp(p){
  var R=p.R, st=lifeSt(R.id), q=pickQ(POOL[R.fam].choose, false); p.waving=false; lifeApproach.who=null; p.goal=null;
  if(!q){ return lifeTalk(p); }
  var wrap=R.req[Math.floor(Math.random()*R.req.length)];
  askChoose('🙋 '+esc(R.name)+'：'+esc(wrap)+' <small>'+esc(R.role)+'請你幫忙</small>', q, function(ok,ms,ch,right){
    rec('q', q, ok, ms, {chosen:ch, right:right, where:'🙋 '+R.name});
    if(ok===null) return;
    st.pts+=ok?2:1; save();
    toast(ok?'🙋 '+R.name+'：「太好了，謝謝你！」':'🙋 '+R.name+'：「原來是這樣，好險有問你。」');
  });
}
/* ---------- 點居民聊天：越熟講越深；到門檻會解鎖一幕故事 ---------- */
function lifeTalk(p){
  var R=p.R, st=lifeSt(R.id), first=!st.met, td=today();
  if(lifeApproach.who===p) return lifeHelp(p);
  st.met=1; if(first) st.pts=Math.max(st.pts,1);
  if(st.talkDay!==td){ st.talkDay=td; if(!first) st.pts+=1; }
  var beat=R.beats.filter(function(b,i){ return st.pts>=b.at && !st.beats[i]; })[0], bi=R.beats.indexOf(beat), stg=lifeStage(st.pts), body;
  if(first) body='<div class="story">'+R.intro+'</div>';
  else if(beat){ st.beats[bi]=1; st.pts+=1; body='<div class="story">'+beat.t+'</div><div class="muted">📖 '+esc(R.name)+' 的居民頁多了一行</div>'; }
  else { var pool=R.lines.filter(function(l){ return l[0]<=stg-1 || (stg<=1 && l[0]===0); }), un=pool.filter(function(l){ return !st.seen[R.lines.indexOf(l)]; }); if(!un.length){ st.seen={}; un=pool; }
    var L=un[Math.floor(Math.random()*un.length)]; st.seen[R.lines.indexOf(L)]=1;
    body='<div class="story">「'+esc(L[1])+'」</div>'+(L[2]?'<div class="clue fr">'+esc(L[2])+' '+spk(L[2])+'</div><div class="muted">'+esc(L[3])+'</div>':''); }
  save();
  var hasAsk=stg>=2 && R.asks.length;
  openSheet('<h3>'+esc(R.name)+' <small>'+esc(R.role)+' '+(LIFE_REL[lifeStage(st.pts)].ic||'')+' '+LIFE_REL[lifeStage(st.pts)].zh+'</small></h3>'+body+
    '<div class="opts" style="margin-top:8px">'+(hasAsk?'<button id="lfAsk">💬 他想問你一件事</button>':'')+(R.id==='clement'&&typeof villager==='function'?'<button id="lfFr">🇫🇷 用法文跟他聊一段</button>':'')+'<button id="lfBook">📖 居民頁</button><button id="lfBye">👋 再見</button></div>', true);
  document.getElementById('lfBye').onclick=closeSheet;
  document.getElementById('lfBook').onclick=function(){ lifePage(R, function(){ lifeTalk(p); }); };
  if(hasAsk) document.getElementById('lfAsk').onclick=function(){ lifeAsk(p); };
  var fr=document.getElementById('lfFr'); if(fr) fr.onclick=function(){ closeSheet(); villager({rid:'clement', x:p.x, y:p.y, calm:3, face:p.face}); };
}
/* 💬 他問你：朋友口吻問，問題本身＝你口說卡的考官追問（法文是卡上原本的），⛔ 不給參考回答 */
function lifeAsk(p){
  var R=p.R, cards=(typeof ANSWER_CARDS!=='undefined'?ANSWER_CARDS:[]).filter(function(c){ return R.cards.indexOf(c.id)>=0; }), fu=[];
  cards.forEach(function(c){ (c.follow_ups||[]).forEach(function(f){ fu.push(f); }); });
  var q=fu[Math.floor(Math.random()*fu.length)], zhAsk=R.asks[Math.floor(Math.random()*R.asks.length)];
  openSheet('<h3>💬 '+esc(R.name)+' 想問你</h3><div class="story">「'+esc(zhAsk)+'」</div>'+(q?'<div class="muted" style="margin-top:6px">考官也可能這樣問：</div><div class="clue fr">'+esc(q.fr)+' '+spk(q.fr)+'</div><div class="muted">'+esc(q.zh||'')+'</div>':'')+
    '<div class="story" style="margin-top:6px">用你自己的話講給他聽——中文先順一遍，再用法文講。講完他會記得。</div>'+
    '<div class="row2"><button class="btn ghost" id="laSkip">今天不聊這個</button><button class="btn main" id="laDone">我講完了</button></div>', true);
  document.getElementById('laSkip').onclick=function(){ lifeTalk(p); };
  document.getElementById('laDone').onclick=function(){ var st=lifeSt(R.id); st.pts+=2; save(); closeSheet(); toast('💬 '+R.name+' 很認真地聽完了'); };
}
/* 📖 居民頁＋居民圖鑑 */
function lifePage(R, back){
  var st=lifeSt(R.id), stg=lifeStage(st.pts), facts=R.beats.filter(function(b,i){ return st.beats[i]; }).map(function(b){ return b.fact; });
  openSheet('<h3>📖 '+esc(R.name)+' <small>'+esc(R.role)+'</small></h3><div class="muted">'+(LIFE_REL[stg].ic||'')+' '+LIFE_REL[stg].zh+'</div>'+
    '<ul style="margin:8px 0 0 1.2em;padding:0">'+(facts.length?facts.map(function(f){ return '<li>'+esc(f)+'</li>'; }).join(''):'<li class="muted">還不太認識他。多聊幾次、幫他一點忙。</li>')+'</ul>'+
    '<div class="row2"><span></span><button class="btn main" id="lpOk">好</button></div>');
  document.getElementById('lpOk').onclick=back||closeSheet;
}
function lifeBook(back){
  openSheet('<h3>👥 鎮上的人</h3>'+LIFE.map(function(R){ var st=lifeSt(R.id), here=lifeBuilt(R);
      return '<button class="st" data-r="'+R.id+'" style="display:flex;gap:8px;width:100%;align-items:center;margin-top:6px;text-align:left;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:9px;padding:7px;color:inherit;font-family:inherit"'+(st.met?'':' disabled')+'>'+
        '<b>'+(st.met?esc(R.name):'？？？')+'</b><span class="muted">'+(st.met?esc(R.role)+'　'+(LIFE_REL[lifeStage(st.pts)].ic||'')+' '+LIFE_REL[lifeStage(st.pts)].zh:(here?'在鎮上，還沒說過話':'還沒回到鎮上'))+'</span></button>'; }).join('')+
    '<div class="row2"><span></span><button class="btn main" id="lbOk">好</button></div>');
  sheet.querySelectorAll('[data-r]').forEach(function(b){ b.onclick=function(){ lifePage(lifeRes(b.dataset.r), function(){ lifeBook(back); }); }; });
  document.getElementById('lbOk').onclick=back||closeSheet;
}
/* ---------- 畫：人物＋頭上的泡泡（聊天文字只在你靠近時顯示，遠處只看到 💬） ---------- */
function lifeDraw(list,ox,oy,ts){
  people.forEach(function(p){ list.push({y:p.y, f:function(){
    drawSprite(p.R.spr,p.x,p.y,ox,oy,ts,p.face,p.walk?Math.abs(Math.sin(clock*8))*.05:Math.abs(Math.sin(clock*2+p.x))*.02)();
    var px=ox+p.x*ts, py=oy+p.y*ts-ts*1.05, near=Math.hypot(p.x-hero.x,p.y-hero.y)<4;
    cx.textAlign='center';
    if(p.waving){ cx.font='bold '+Math.round(ts*.42)+'px system-ui'; cx.fillText('❗', px, py-Math.abs(Math.sin(clock*5))*ts*.1); return; }
    if(p.chat && p.chat.tx){
      if(!near){ cx.font=Math.round(ts*.34)+'px system-ui'; cx.fillText('💬', px, py); return; }
      cx.font=Math.round(ts*.24)+'px Cubic11, system-ui'; var t=p.chat.tx, tw=Math.min(cx.measureText(t).width, ts*5.2), lines=[];
      var cur=''; for(var i=0;i<t.length;i++){ var c2=cur+t[i]; if(cx.measureText(c2).width>ts*5.2){ lines.push(cur); cur=t[i]; } else cur=c2; } lines.push(cur);
      var bh=lines.length*ts*.3+ts*.16, bw=Math.min(ts*5.4, Math.max.apply(null, lines.map(function(l){ return cx.measureText(l).width; }))+ts*.3);
      cx.fillStyle='rgba(255,250,235,.95)'; cx.fillRect(px-bw/2, py-bh, bw, bh); cx.fillStyle='rgba(255,250,235,.95)'; cx.beginPath(); cx.moveTo(px-ts*.1,py); cx.lineTo(px+ts*.1,py); cx.lineTo(px,py+ts*.14); cx.fill();
      cx.fillStyle='#2a1a08'; lines.forEach(function(l,i){ cx.fillText(l, px, py-bh+ts*.27+i*ts*.3); });
    } else if(!lifeSt(p.rid).met && near){ cx.font=Math.round(ts*.3)+'px system-ui'; cx.fillText('💬', px+ts*.3, py+ts*.1); }
    cx.font='bold '+Math.round(ts*.2)+'px system-ui'; cx.fillStyle='rgba(0,0,0,.5)'; var nm=lifeSt(p.rid).met?p.R.name:'？'; var nw=cx.measureText(nm).width+ts*.14; cx.fillRect(px-nw/2, oy+p.y*ts+ts*.08, nw, ts*.26); cx.fillStyle='#fff'; cx.fillText(nm, px, oy+p.y*ts+ts*.27);
  }}); });
}
/* ---------- 接上主程式：取代舊的站樁 NPC 與 Clément 劇本點 ---------- */
var _spawnNpcs0=spawnNpcs;
spawnNpcs=function(){ npcs=[]; lifeSpawn(); };
spawnVillagers=function(){ villagers=[]; };
(function boot(){ villagers=[]; npcs=[]; lifeSpawn(); })();
spawnVillagers=function(){ villagers=[]; lifeSpawn(); };   /* 小屋蓋好（moveIn）時也要讓 Clément 出現 */
/* 森林小屋：蓋好後點門口＝找 Clément 聊；舊的目標鏈看 relOf('clement').met */
var _openLot0=openLot;
openLot=function(k, inside){ if(k==='cottage' && S.built.cottage){ var c=people.filter(function(p){ return p.rid==='clement'; })[0]; if(c) return lifeTalk(c); } return _openLot0(k, inside); };
var _lifeTalk0=lifeTalk;
lifeTalk=function(p){ if(p.rid==='clement' && typeof relOf==='function'){ relOf('clement').met=1; } return _lifeTalk0(p); };
