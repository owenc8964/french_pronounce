/* ============================================================
   📜 主線第三～五章、名冊、對手、早晨（11-04 Owen：「主線要有薩爾達、寶可夢、熱血高校、實況野球的等級」）
   ⚠️ 全本劇透：drafts/STORY_BIBLE_v3_2026-11-04.md（⛔ 回報時不轉述）
   ⭐ 判準 9 條在 bible 第 0 節；一場戲最多三小段就回到遊戲
   ⭐ 跳過合法：每題都有 ↷ 晚點／⏭ 跳過；後果放角色身上（答錯被咬一口），⛔ 不放他身上
   ⚠️ 原創法文照無限城例外，只用已學句型，生字一律進 gloss；出處見 bible 第 6 節與 drafts/story_ch3_draft.js
   ============================================================ */
function stSt(){ S.st=S.st||{name:'', reg:{}, insp:0, rv:{run:7, stone:2, garden:12}, wins:{}, letters:0, letterDay:'', morn:{}, eve:{}}; return S.st; }
/* 行為紀錄：劇情畫面停多久（秒關＝沒看）。評估劇情用，見 bible 第 0 節 */
var stOpenAt=0, stOpenId='';
function stScene(id, html, full){ stClose(); stOpenId=id; stOpenAt=Date.now(); openSheet(html, full); }
function stClose(){ if(stOpenId && window.GameLog){ GameLog.event('story_'+stOpenId+(Date.now()-stOpenAt<3000?'_fast':'_read')); } stOpenId=''; }
function stOk(id, label, fn){ document.getElementById(id).onclick=function(){ stClose(); fn(); }; }
function stEnd(){ closeSheet(); hud(); }
/* 真的選擇（盲讀 11-04：「主角全程是快遞員」）：選了什麼記在 st.pick，後面的台詞會跟著變 */
function stChoose(id, html, opts){
  stScene(id, html+'<div class="opts" style="margin-top:8px">'+opts.map(function(o,i){ return '<button data-c="'+i+'" style="font-family:inherit">'+esc(o.label)+'</button>'; }).join('')+'</div>');
  sheet.querySelectorAll('[data-c]').forEach(function(b){ b.onclick=function(){ var o=opts[+b.dataset.c], st=stSt(); (st.pick=st.pick||{})[id]=o.k; save(); if(window.GameLog) GameLog.event('story_choice_'+id+'_'+o.k); stClose(); o.fn(); }; });
}
function stPick(id){ return (stSt().pick||{})[id]; }
function stFr(fr, gloss){ return '<div class="clue fr">'+esc(fr)+' '+spk(fr)+'</div>'+(gloss?'<div class="muted">'+esc(gloss)+'</div>':''); }

/* ---------- 一題：答錯後果在角色身上、可以重選；只記第一次作答 ---------- */
function stAsk(id, head, T, done){
  var t0=Date.now(), tried=false, ended=false;
  var item={topic:T.topic, _i:id, q:T.fr+'　'+T.ask, aNote:T.why, a:T.opts[T.a], say:T.fr};
  stScene(id, '<h3>'+head+'</h3>'+(T.scene?'<div class="story">'+T.scene+'</div>':'')+stFr(T.fr,T.gloss)+(T.zh?'<details class="hint hzh"><summary>🀄 中文</summary>'+T.zh+'</details>':'')+
    '<div class="qtext">'+esc(T.ask)+'</div><div class="opts">'+T.opts.map(function(o,i){ return '<button data-i="'+i+'" style="font-family:inherit">'+esc(o)+'</button>'; }).join('')+'</div><div class="fb" id="fb"></div>'+
    '<div class="row2"><button class="btn ghost" id="later">↷ 晚點</button><button class="btn ghost" id="skip">⏭ 這題跳過</button><span id="slot"></span></div>', true);
  speak(T.fr);
  sheet.querySelectorAll('.opts button').forEach(function(b){ b.onclick=function(){
    if(ended) return; var i=+b.dataset.i, ok=i===T.a;
    if(!tried){ tried=true; rec('q', item, ok, Date.now()-t0, {chosen:T.opts[i], right:T.opts[T.a], where:'📜 主線'}); }
    if(!ok){ b.classList.add('no'); document.getElementById('fb').innerHTML=(T.wrong&&T.wrong[i]?'<div class="story">'+T.wrong[i]+'</div>':'')+'🔎 '+T.hint; return; }
    ended=true; b.classList.add('ok');
    document.getElementById('fb').innerHTML=(T.okTxt||'✓ 看穿了。')+'<div>🔎 '+esc(T.why)+'</div>';
    document.getElementById('later').style.visibility='hidden'; document.getElementById('skip').style.visibility='hidden';
    document.getElementById('slot').outerHTML='<button class="btn main" id="go">繼續</button>';
    stOk('go','',function(){ done(false); });
  }; });
  document.getElementById('later').onclick=function(){ if(ended) return; stClose(); closeSheet(); };
  document.getElementById('skip').onclick=function(){ if(ended) return; ended=true; if(!tried) rec('q', item, null, Date.now()-t0, {where:'📜 主線'}); stClose(); done(true); };
}

/* ---------- 名冊 ---------- */
function regNames(){
  var st=stSt(), b=S.built, c3=S.ch3||{}, out=[];
  if(st.insp) out.push(st.name||'新來的人');
  if(b.cottage) out.push('Clément Dupré');
  if(S.firstDeal) out.push('Amira');
  if(b.forge) out.push('Gaston');
  if(b.post) out.push('Lucie');
  if(b.bakery) out.push('Bernard');
  if(S.clues&&S.clues.c2) out.push('Hector');
  if(c3.step>=1||S.ch3done) out.push('Margot');
  Object.keys(st.reg).forEach(function(k){ out.push(k); });
  return out;
}
function openRegister(back){
  var n=regNames(), h='<h3>📖 Val-Brume 名冊</h3><div class="muted">不到十二個名字，春天這個鎮就從地圖上拿掉。</div><div style="margin-top:8px">';
  for(var i=0;i<11;i++) h+='<div class="item" style="min-height:26px">'+(n[i]?'<span class="say">'+esc(n[i])+'</span>':'&nbsp;')+'</div>';
  h+='<div class="item" style="min-height:26px;color:rgba(255,255,255,.14)"><i>B ·  ·  ·  ·  ·  ·</i></div></div>';
  if(stSt().pencil) h+='<div class="muted">頁邊有人用鉛筆寫：<span class="say">Zoé</span>，旁邊被 Pelletier 打了一個叉：「未成年」。鉛筆又把叉塗掉了。</div>';
  h+='<div class="row2"><span></span><button class="btn main" id="ok">好</button></div>';
  openSheet(h); document.getElementById('ok').onclick=back||closeSheet;
}
function stSign(name){ var st=stSt(); if(st.reg[name]) return; st.reg[name]=1; save(); toast('📖 名冊上多了一個名字：'+name); }

/* ---------- 區公所的 Pelletier ---------- */
function pelletierFirst(){
  var st=stSt();
  stScene('pelletier1','<h3>🚲 廣場上有人在數人</h3><div class="story">一個穿雨衣的瘦男人站在廣場中間，捧著一本很厚的冊子。數到你的時候他停下來，看了你很久，像在確認你是不是真的。</div>'+
    stFr('Il n\'y a plus personne ici.','ne … plus 不再・personne 沒有人')+
    '<div class="story">「Pelletier，區公所。名冊上不到十二個名字的鎮，春天就從地圖上拿掉。」他把筆遞給你。「你的房子是一塊錢買的吧？難怪。簽。」</div>'+
    '<div class="inrow" style="display:flex;gap:6px;margin-top:6px"><input id="stNm" maxlength="24" autocomplete="off" placeholder="Nom（你的名字）" style="flex:1;font:inherit;padding:8px;border-radius:8px;border:1px solid rgba(255,255,255,.2);background:rgba(0,0,0,.25);color:inherit"></div>'+
    '<div class="row2"><span></span><button class="btn main" id="go">簽名</button></div>');
  stOk('go','',function(){
    var v=document.getElementById('stNm').value.trim(); st.name=v; st.insp=1; save();
    stScene('pelletier1b','<div class="story">他把冊子闔上，打了一個噴嚏。<br>「鐘？那個啊，十年沒響了。沒有鐘，船也不靠岸了。」<br>他跨上腳踏車，按了一下車鈴。沒有聲音。他的臉垮了一下。<br>「下次來，我會再數一次。」</div>'+
      '<div class="muted">點畫面上方的目標列，可以看 📖 名冊。</div><div class="row2"><span></span><button class="btn main" id="ok">好</button></div>');
    stOk('ok','',stEnd);
  });
}
function pelletierAgain(level){
  var st=stSt(), n=regNames().length; st.insp=level; if(level===2) st.pencil=1; save();
  var T=level===2 ? '「'+n+' 個。」他用筆尖一個一個點過去，「上次我以為這個鎮只剩鬼。」<br>他看到碼頭那邊跑過去一個小孩：「那個不算，未成年。」<br>小孩遠遠地對他吐舌頭。'
                  : '他今天沒數人。他站在郵局門口，盯著 Lucie 手上的東西，又看看自己的腳踏車。<br>你把車鈴還給他。他按了一下：叮。<br>他按了很多下。然後他發現你在看，收起笑容：「……名冊還是不夠。」';
  stScene('pelletier'+level,'<h3>🚲 Pelletier 又來了</h3><div class="story">'+T+'</div><div class="row2"><span></span><button class="btn main" id="ok">好</button></div>');
  stOk('ok','',stEnd);
}

/* ---------- 第三章・河對岸（文法設計與出處：drafts/story_ch3_draft.js） ---------- */
var CH3=[
  { scene:'碼頭邊，一個曬得很黑的女人在補一艘舊船。你問她有沒有看過一艘載著鐘的船往下游去，她抬頭看了看鐘樓：',
    fr:'On n\'entend plus la cloche depuis dix ans.', gloss:'la cloche 鐘・entendre 聽到・ne … plus 不再・depuis 從…起（到現在）',
    ask:'她的意思是——', opts:['十年來都沒人聽到鐘聲，到現在還是','十年前，大家聽到過一次鐘聲','再過十年，才會聽到鐘聲'], a:0, topic:'duree',
    why:'depuis＋一段時間＝從那時候一直到現在都還是這樣；ne … plus＝不再。十年前發生一次會用 il y a：on a entendu la cloche il y a dix ans；十年後會用 dans：on entendra la cloche dans dix ans。',
    hint:'看 <span class="fr">depuis</span>：從那時候「一直到現在」。（<span class="fr">n\'</span> 唸起來聽不到，否定靠後面的 <span class="fr">plus</span>）' },
  { fr:'Pour ceux qui reviennent.', gloss:'la cloche 鐘・ceux qui …的那些人・revenir 回來（ils reviennent）',
    ask:'這行字是寫給誰的？', opts:['所有回來的人（不只一個）','某一個回來的人','所有離開的人'], a:0, topic:'pronoms-demonstratifs',
    why:'ceux＝「那些人」，是複數；寫給一個人會是 celui qui revient（男）／celle qui revient（女）。離開是 partir：ceux qui partent。',
    hint:'看 <span class="fr">ceux</span> 跟 <span class="fr">reviennent</span>：兩個都是複數；revenir＝回來。' },
  { scene:'Gaston 把碎片翻過來敲了一下，聲音又細又亮。他看了碎掉的那一邊很久，還給你：',
    fr:'Si tu trouves les autres morceaux, je ferai une nouvelle cloche.', gloss:'la cloche 鐘・un morceau 一塊・je ferai（faire 的未來式）',
    ask:'Gaston 確定你找得到其他碎片嗎？', opts:['不確定——他說的是「要是你找得到」','確定——他知道你一定會找到','他已經把新的鐘打好了'], a:0, topic:'condition-si',
    why:'si＝如果（不一定會發生）：si＋現在式（trouves），結果用未來式（ferai）。確定會發生要用 quand＋未來式：quand tu trouveras les autres morceaux…；已經打好會說 j\'ai fait une nouvelle cloche。',
    hint:'看開頭的 <span class="fr">si</span>：「要是」——還不一定。<span class="fr">ferai</span> 是未來式，還沒打。' }
];
var CH3_FISH=4;
function ch3St(){ S.ch3=S.ch3||{step:0, frag:null, fish:0}; return S.ch3; }
function ch3Dock(){
  if(!S.ch2done || S.ch3done || ch3St().step>=1) return false;
  stAsk('ch3-0','⛵ 第三章・河對岸',CH3[0],function(){ ch3St().step=1; save(); zoeArrives(); });
  return true;
}
function zoeArrives(){
  stScene('zoe1','<div class="story">船艙裡跳出一個大概十一歲的女孩，背包比她還大。她聽你跟那個女人講了兩句，皺起眉頭：</div>'+stFr('Tu parles comme un livre.','你講話像一本書。')+
    '<div class="story">「而且是很舊的那種。」她伸出手。<span class="fr">« Zoé. Avec un accent. »</span><br>「Margot。」補船的女人頭也不抬，「她暫時住我船上。別問。」<br>Zoé 拿粉筆在碼頭柱子上畫了三格：🚪 跑酷、🪨 過河、🌻 守園，每格寫一個數字。「這是我的。你一定比不過。」</div>'+
    '<div class="muted">碎片不在船上。河裡、島上都可能漂到。</div><div class="row2"><span></span><button class="btn main" id="ok">好</button></div>');
  stOk('ok','',function(){ lifeSpawn(); stEnd(); });
}
function ch3IsleDone(){ return isles().some(function(I){ var u=palRoom(I); return u.length && u.every(function(g){ return pst(g.ref).seen; }); }); }
function ch3Frag(how){
  var c=ch3St(); c.frag=how; save();
  var T=Object.assign({}, CH3[1], {scene: how==='isle'?'你在島的另一頭、浪打上來的沙灘上，撿到一塊沉甸甸的金屬。邊緣刻著一行字：':'收網的時候，網子裡卡著一塊沉甸甸的金屬。邊緣刻著一行字：'});
  stAsk('ch3-1','⛵ 河裡撈到的東西',T,function(){ c.step=2; save(); stEnd(); toast('拿去 ⚒ 鐵匠鋪給 Gaston 看'); });
}
function storyFish(){ if(!S.ch2done||S.ch3done) return; var c=ch3St(); if(c.step<1||c.frag) return; c.fish++; save(); if(c.fish>=CH3_FISH) c.pend=1; }
function storyIsleCheck(){ if(!S.ch2done||S.ch3done) return; var c=ch3St(); if(c.step<1||c.frag) return; if(ch3IsleDone()) c.pendIsle=1; }
function ch3End(){
  if(!S.ch3done){ S.ch3done=1; S.gold+=40; save(); hud(); }
  stScene('ch3end','<h3>⛵ 第三章完</h3><div class="story">鐘不是整口被載走的。它碎了，碎片順著河漂到下游。<br>你回到碼頭。Margot 看了碎片上的字一眼，繼續補她的船：</div>'+stFr('Elle n\'est jamais revenue.','revenir 回來（être 當助動詞）・ne … jamais 從來沒有')+
    '<div class="story">Zoé 坐在船頭，假裝沒在聽。</div><div class="row2"><span></span><button class="btn main" id="ok">離開碼頭</button></div>');
  stOk('ok','',baronSteals);
}

/* ---------- 第四章・戴帽子的老鼠 ---------- */
function baronSteals(){
  var st=stSt(); st.ch4=1; save();
  stScene('baron1','<h3>🐀 ……？</h3><div class="story">你手上突然變輕了。<br>一隻老鼠站在路中間，戴著一頂很小的帽子，兩隻前腳抱著你的碎片。牠對你脫帽，鞠了一個躬。<br>然後跑了。</div>'+stFr('Le rat l\'a pris !','prendre 拿（過去分詞 pris）・l\' ＝ 那塊碎片')+
    '<div class="story">Zoé 從後面追上來，喘著氣：「那是男爵。牠住礦坑最裡面。Pelletier 的車鈴也是牠偷的。」她想了一下：「帽子我不知道。」</div><div class="muted">第四章・戴帽子的老鼠</div><div class="row2"><span></span><button class="btn main" id="ok">追</button></div>');
  stOk('ok','',stEnd);
}
var NEST={x:35, y:27};
var NEST_Q={ scene:'礦坑最裡面有一個洞，塞滿碎紙。男爵坐在一個鼓鼓的舊袋子上，面前擺著三樣東西，牆上有人用爪子刮了一行字。',
  fr:'Ton morceau ? Il est dans celle qui est ouverte.', gloss:'un morceau 一塊・celle qui …的那一個（陰性）・ouvert／ouverte 開著的',
  ask:'碎片在哪一個裡面？', opts:['📦 la boîte（盒子）','🎩 le chapeau（帽子）','👜 le sac（袋子）'], a:0, topic:'pronoms-demonstratifs',
  wrong:{1:'你把手伸進帽子。男爵咬了你一口，並且脫帽致意。',2:'你把手伸進袋子。裡面有東西動了一下，你決定把手收回來。'},
  why:'celle 代替陰性名詞；三樣裡只有 la boîte 是陰性，ouverte 的 -e 也對得上。指陽性的東西會說 celui qui est ouvert。',
  hint:'<span class="fr">celle</span> 是陰性的「那一個」。三樣東西裡哪一個是陰性？' };
function nestScene(){
  stAsk('ch4-0','🐀 男爵的巢',NEST_Q,function(){
    var st=stSt(); st.nest=1; save();
    stScene('nest2','<div class="story">你從盒子裡撈出碎片，還有一個腳踏車鈴。<br>男爵氣得跳腳，一跳起來，你看到牠屁股底下那個袋子上印著字：<b>POSTES</b>。<br>你把口袋裡的半塊麵包丟遠。牠追過去了，跟所有老鼠一樣。跑到一半牠回頭，又脫了一次帽。</div>'+
      '<div class="muted">你扛起那個袋子。很重，都是紙。</div><div class="row2"><span></span><button class="btn main" id="ok">帶回 📮 郵局</button></div>');
    stOk('ok','',stEnd);
  });
}
var LUCIE_Q={ scene:'Lucie 看到袋子，話講到一半停了。你第一次看到她沒在講話。',
  fr:'Ce sac, je l\'ai perdu il y a trois ans.', gloss:'perdre 弄丟（過去分詞 perdu）・il y a ＋時間＝…之前',
  ask:'這袋信是——', opts:['三年前弄丟的','三年來一直在弄丟','三年後才會弄丟'], a:0, topic:'duree',
  why:'il y a＋時間＝…之前，一次結束的事。持續到現在會用 depuis；還沒發生會用 dans。',
  hint:'<span class="fr">il y a</span> 指過去的某個時間點，<span class="fr">perdu</span> 是已經發生的事。' };
function lucieScene(){
  stAsk('ch4-1','📮 郵局',LUCIE_Q,function(){
    var st=stSt(); st.sorted=1; save();
    stChoose('bundle','<div class="story">「我第一個禮拜。騎太快，袋子掉了，找不到。我跟大家說信都送到了。」<br>「一封都不會漏——我每天都這樣講。」<br>她把信一疊一疊分好，手很快。其中一疊特別厚，用麻繩綁著，全部寄給麵包店。她把那疊推到你面前。<br>「你順路吧？……我不敢。」</div>',[
      {k:'you', label:'我幫你送', fn:function(){ stEnd(); toast('把那疊信送去 🍞 麵包店'); }},
      {k:'lucie', label:'這要你自己去', fn:function(){ stScene('bundle-l','<div class="story">她瞪著你。瞪了一陣子，把郵差帽戴正，拿起那疊信。<br>走到門口，她回頭：「你陪我走到門口。只到門口。」</div><div class="row2"><span></span><button class="btn main" id="ok">去 🍞 麵包店</button></div>'); stOk('ok','',stEnd); }},
      {k:'open', label:'先拆一封看看是誰寫的', fn:function(){ stScene('bundle-o','<div class="story">你趁她轉身，用指甲挑開最上面那封的封口。第一個字是 <span class="fr">Papa</span>，署名是 <span class="fr">Béa</span>。<br>你把封口壓回去。壓不太平。</div><div class="row2"><span></span><button class="btn main" id="ok">拿去 🍞 麵包店</button></div>'); stOk('ok','',stEnd); }}
    ]);
  });
}
function deliverScene(){
  var st=stSt(); st.delivered=1; st.deliverDay=today(); S.gold+=40; save(); hud();
  var way=stPick('bundle');
  var open=way==='lucie' ? 'Lucie 站在門口，腳沒有跨進去。她把那疊信舉高，講了很長一串，比平常快兩倍，最後兩個字是「對不起」。<br>Bernard 沒有聽她講完。'
    : '「麵包為什麼什麼都不肯說？」Bernard 對著空店問，自己接：「因為它被烤問過了！」他笑得很大聲。<br>他看到你手上那疊信。';
  var close=way==='lucie' ? '他把信收進圍裙，塞了一條長棍給 Lucie。「三年算什麼。拿去。」<br>Lucie 抱著長棍走出來，走到轉角才開始哭。<br>店裡傳來他的聲音：「麵包為什麼什麼都不肯說？……因為它……烤焦了。」'
    : '他把信收進圍裙，拍拍口袋。「謝啦！來，長棍帶一條走。」<br>「你知道麵包為什麼什麼都不肯說嗎？……因為它……烤焦了。」<br>他自己笑了。';
  stScene('deliver','<h3>🍞 麵包店</h3><div class="story">'+open+'<br>他擦手，擦了很久，才接過去。他抽出最上面一封，拿到眼前。<br>郵票在左下角。</div>'+stFr('Elle écrit bien.','她字寫得很好。')+
    '<div class="story">'+close+'</div><div class="row2"><span></span><button class="btn main" id="ok">好</button></div>');
  stOk('ok','',function(){ stEnd(); toast('第四章完　+40 🪙'); });
}

/* ---------- 第五章・橋下的燈：天黑才看得到；一天一封 ---------- */
var LETTERS=[
  { fr:'Papa, je suis arrivée. J\'ai eu très froid sur le bateau, et Margot chante très mal. J\'ai trouvé une petite chambre près du port. Le matin, je travaille dans une boulangerie. Leur pain ? Ne le dis à personne, mais il n\'est pas aussi bon que le tien. Ne t\'inquiète pas. Béa',
    zh:'爸，我到了。船上冷死了，而且 Margot 唱歌超難聽。我在港口附近找到一間小房間。早上我在一間麵包店工作。他們的麵包？別跟任何人說，沒有你的好吃。別擔心。Béa',
    gloss:'le port 港口・ne … à personne 不對任何人・le tien 你的（那個）・s\'inquiéter 擔心',
    ask:'他抬頭：「她寫什麼？」你告訴他——', opts:['她到了，在麵包店工作，說他們的麵包沒有你的好吃','她到了，在麵包店工作，說他們的麵包比你的好吃','她到了，開了一間自己的麵包店'], a:0, topic:'pronoms-possessifs',
    wrong:{1:'他的肩膀垮了一下，點點頭：「也對。」<br>你低頭再看一次。<span class="fr">n\'est pas</span>。不對，你講錯了。',2:'「她開店了？」他的眼睛亮起來。<br>你低頭再看一次。<span class="fr">je travaille dans</span>。不對，你講太快了。'},
    okTxt:'他沒有說話。', why:'pas aussi bon que＝沒有…那麼好；le tien＝「你的那個」，這裡代替 pain。陰性會是 la tienne。',
    hint:'看 <span class="fr">il n\'est pas aussi bon que le tien</span>：誰比較好吃？她是「在」一間麵包店工作。',
    after:'過了很久：「『別跟任何人說』那句，再唸一次。」<br>你又唸了一次。他笑了一聲，用手背擦臉，麵粉沾到鼻子上。<br>你伸手去拿下一封。他按住你的手。<br>「明天。一次一封就好。」他把盒子蓋起來。「我怕看完了，就沒有了。」' },
  { fr:'Papa, ça fait un an que je suis ici. Tu ne m\'as jamais répondu. Je sais, tu es encore en colère. Moi aussi. Mais lis cette lettre jusqu\'au bout, s\'il te plaît. Je t\'écrirai quand même, chaque mois. Tu ne peux pas m\'arrêter. Béa',
    zh:'爸，我來這裡一年了。你從來沒回過我。我知道，你還在生氣。我也是。但拜託把這封信讀到最後。我還是會每個月寫信給你。你擋不住我。Béa',
    gloss:'répondre 回覆・en colère 生氣・lis（lire 的命令式）・jusqu\'au bout 到最後・quand même 還是・arrêter 擋住',
    ask:'他抬頭：「她寫什麼？」你告訴他——', opts:['她覺得你還在生氣，說她也在生氣，但還是會每個月寫信','她不生氣了，以後不會再寫信','她問你為什麼生氣，要你馬上回信'], a:0, topic:'comprehension',
    wrong:{1:'他愣住：「不寫了？」手上的信抖了一下。<br>你低頭再看一次。<span class="fr">Je t\'écrirai</span>，未來式。不對，你講錯了。',2:'他張開嘴，又閉上。<br>你低頭再看一次。她沒有問，她說 <span class="fr">Je sais</span>。'},
    okTxt:'他聽完了。', why:'Je sais＝我知道（不是問句）；Moi aussi＝我也是；Je t\'écrirai＝我會寫給你（未來式）；ne … jamais＝從來沒有。',
    hint:'看 <span class="fr">Je sais</span>、<span class="fr">Moi aussi</span>、<span class="fr">Je t\'écrirai</span> 這三處。' }
];
function bridgePoint(){ return {x:BRIDGE.door[0]-1.4, y:BRIDGE.door[1]-.2}; }
function bridgeScene(){
  var st=stSt();
  if(st.letters===0){
    stScene('bridge','<h3>🏮 橋下</h3><div class="story">Bernard 坐在石頭上，旁邊一盞提燈、一個生鏽的餅乾盒。盒子裡的信比你拿來的那疊還舊，摺痕都磨白了。他沒有嚇一跳，好像早就知道你會來。<br>他拿起一封信。這次拿反了，他也沒有改。<br>「我每天晚上來看她的字。」</div>'+stFr('Tu peux la lire pour moi ?','la ＝ 這封信（la lettre）・lire 唸、讀')+
      '<div class="story">'+(stPick('bundle')==='open'?'他的拇指摸過封口，停了一下。「這封開過。」他看你一眼。「那你已經知道一點了。」<br>':'')+'「你不會笑。」</div><div class="row2"><button class="btn ghost" id="no">今天先不要</button><button class="btn main" id="ok">接過信</button></div>');
    document.getElementById('no').onclick=function(){ stClose(); st.bridgeCool=1; closeSheet(); };
    stOk('ok','',readLetterAloud);
  } else if(st.letters===1 && !stPick('line')) secondLetterChoice();
  else readLetterAloud();
}
/* 第二封：唸之前先看到那一句，要不要照唸是你決定的 */
function secondLetterChoice(){
  stChoose('line','<h3>🏮 第 2 封信</h3><div class="story">你先自己看了一遍。第三行寫著：</div>'+stFr('Je sais, tu es encore en colère. Moi aussi.','en colère 生氣・Moi aussi 我也是')+'<div class="story">他在等你開口，手放在膝蓋上。</div>',[
    {k:'all', label:'照唸', fn:readLetterAloud},
    {k:'skip', label:'那一行跳過不唸', fn:readLetterAloud}
  ]);
}
function secondLetterAfter(){
  var skip=stPick('line')==='skip';
  var T=skip ? '他的手指按在信的第三行。「這裡。」<br>你沒有說話。<br>「這封我看了九年，它有幾行我知道。」他把信推回來，「唸。」<br>你唸了。<br>「我沒有生氣。」他把信摺回去，沿著舊的摺痕。「下次不用替我跳。」<br>盒子裡還有很多封。「……下一封，等我準備好。」'
             : '「我沒有生氣。」<br>他把信摺回去，沿著舊的摺痕。摺到一半又打開，手指停在第三行，又摺回去。<br>盒子裡還有很多封。「……下一封，等我準備好。」';
  stScene('letter-1-after','<div class="story">'+T+'</div><div class="row2"><span></span><button class="btn main" id="ok">好</button></div>');
  stOk('ok','',stEnd);
}
function readLetterAloud(){
  var st=stSt(), L=LETTERS[st.letters], i=st.letters;
  stAsk('letter-'+i,'🏮 第 '+(i+1)+' 封信',{fr:L.fr, gloss:L.gloss, zh:L.zh, ask:L.ask, opts:L.opts, a:L.a, topic:L.topic, why:L.why, hint:L.hint, wrong:L.wrong, okTxt:L.okTxt},function(){
    st.letters=i+1; st.letterDay=today(); save();
    if(i===1) return secondLetterAfter();
    stScene('letter-'+i+'-after','<div class="story">'+L.after+'</div><div class="row2"><span></span><button class="btn main" id="ok">好</button></div>');
    stOk('ok','',stEnd);
  });
}

/* ---------- 地圖上的點 ---------- */
function storyPoints(){
  var st=stSt(), o=[];
  if(st.ch4 && !st.nest) o.push({id:'nest', x:NEST.x, y:NEST.y, em:'🎩', fn:nestScene});
  if(st.delivered && night && st.letters<LETTERS.length && st.letterDay!==today()){ var B=bridgePoint(); o.push({id:'bridge', x:B.x, y:B.y, em:'🏮', fn:bridgeScene}); }
  return o;
}
var stCool={}, stWait=0;
function storyTick(dt){
  var st=stSt(); stWait+=dt;
  if(pending) return false;
  if(stWait>3){
    if(!st.insp && (S.firstDeal||S.day>1)){ stWait=0; pending={t:.25, x:hero.x, y:hero.y, fn:pelletierFirst}; return true; }
    if(st.insp===1 && S.ch3done && st.nest){ stWait=0; pending={t:.25, x:hero.x, y:hero.y, fn:function(){ pelletierAgain(2); }}; return true; }
    if(st.insp===2 && st.delivered){ stWait=0; pending={t:.25, x:hero.x, y:hero.y, fn:function(){ pelletierAgain(3); }}; return true; }
    var c=S.ch3; if(c && !c.frag && (c.pend||c.pendIsle)){ var how=c.pendIsle?'isle':'river'; c.pend=c.pendIsle=0; stWait=0; pending={t:.25, x:hero.x, y:hero.y, fn:function(){ ch3Frag(how); }}; return true; }
  }
  var P=storyPoints();
  for(var i=0;i<P.length;i++){ var p=P[i]; if(stCool[p.id]>0){ stCool[p.id]-=dt; continue; }
    if(Math.hypot(p.x+.5-hero.x,p.y+.5-hero.y)<.9){ stCool[p.id]=4; pending={t:.25, x:p.x+.5, y:p.y, fn:p.fn}; return true; } }
  return false;
}
function storyDrawList(list,ox,oy,ts){
  storyPoints().forEach(function(p){ list.push({y:p.y+1, f:function(){
    var px=ox+p.x*ts+ts/2, py=oy+p.y*ts+ts/2, g=.5+.5*Math.sin(clock*3);
    cx.fillStyle='rgba(240,201,90,'+(.25+.25*g)+')'; cx.beginPath(); cx.arc(px,py,ts*.5,0,7); cx.fill();
    cx.font=Math.round(ts*.6)+'px system-ui'; cx.textAlign='center'; cx.textBaseline='middle'; cx.fillText(p.em,px,py); cx.textBaseline='alphabetic'; }}); });
  /* 鐘樓：看得到的空塔，鐘不在 */
  list.push({y:21.6, f:function(){ var px=ox+18.5*ts, py=oy+20.6*ts; cx.font=Math.round(ts*1.9)+'px system-ui'; cx.textAlign='center'; cx.textBaseline='middle'; cx.fillText('⛪',px,py); cx.textBaseline='alphabetic'; }});
  /* 從第一天起，天黑時橋邊就有一點光（還沒人告訴你那是什麼） */
  if(night && !(stSt().letters>=LETTERS.length)) list.push({y:9, f:function(){ var B=bridgePoint(), px=ox+(B.x+.5)*ts, py=oy+(B.y+.5)*ts, g=.5+.5*Math.sin(clock*2.2); cx.fillStyle='rgba(255,190,90,'+(.18+.18*g)+')'; cx.beginPath(); cx.arc(px,py,ts*1.1,0,7); cx.fill(); cx.fillStyle='rgba(255,220,150,.9)'; cx.beginPath(); cx.arc(px,py,ts*.08,0,7); cx.fill(); }});
}

/* ---------- 走進房子 ---------- */
function storyDoor(k){
  var st=stSt(), c=S.ch3;
  if(k==='forge' && c && c.frag && c.step===2 && !S.ch3done){ stAsk('ch3-2','⚒ 鐵匠鋪',CH3[2],function(){ c.step=3; save(); ch3End(); }); return true; }
  if(k==='post' && st.nest && !st.sorted){ lucieScene(); return true; }
  if(k==='bakery' && st.sorted && !st.delivered){ deliverScene(); return true; }
  return false;
}

/* ---------- 目標列：主線這一步優先，不被今日委託蓋掉（Owen 11-03：「我還是搞不清楚主線是什麼」） ---------- */
function storyQuest(){
  if(!S.ch2done) return null;
  var st=stSt(), c=ch3St();
  if(!S.ch3done){
    if(c.step<1) return {t:'第三章：去 <b>⛵ 碼頭</b>，問問那艘船', to:{x:24.5,y:10.5}};
    if(!c.frag) return {t:'第三章：找 <b>鐘的碎片</b>——🎣 河邊撈，或 🏝 走完一座島', to:{x:24.5,y:9}};
    return {t:'第三章：拿碎片去 <b>⚒ 鐵匠鋪</b>', to:door('forge')};
  }
  if(st.ch4 && !st.nest) return {t:'第四章：追 <b>🎩 戴帽子的老鼠</b>，牠往礦坑最裡面去了', to:{x:NEST.x+.5,y:NEST.y+.5}};
  if(st.nest && !st.sorted) return {t:'第四章：把袋子帶回 <b>📮 郵局</b>', to:door('post')};
  if(st.sorted && !st.delivered) return {t:'第四章：把那疊信送去 <b>🍞 麵包店</b>', to:door('bakery')};
  if(st.delivered && st.letters<LETTERS.length && st.letterDay!==today()){ var B=bridgePoint(); return {t:night?'第五章：<b>🏮 橋邊有光</b>':'第五章：等天黑，去 <b>橋邊</b>看看', to:{x:B.x+.5,y:B.y+.5}}; }
  return null;
}
function storyChaptersExtra(){
  var st=stSt(), c=S.ch3||{};
  return [
    {t:'第三章・河對岸', steps:[['去 ⛵ 碼頭', c.step>=1||!!S.ch3done],['找到鐘的碎片（🎣 河邊，或 🏝 走完一座島）', !!c.frag||!!S.ch3done],['拿去 ⚒ 鐵匠鋪', !!S.ch3done]]},
    {t:'第四章・戴帽子的老鼠', steps:[['追上牠', !!st.nest],['回 📮 郵局', !!st.sorted],['去 🍞 麵包店', !!st.delivered]]},
    {t:'第五章・橋下的燈', steps:[['天黑以後，去橋邊', st.letters>=1],['一天一封', st.letters>=LETTERS.length]]},
    {t:'第六章', soon:1}
  ];
}

/* ---------- 🌅 早晨：睡一覺世界會不一樣（Owen 10-28：「睡覺跟醒來基本上沒變」）。一天一句，看過的不重複 ---------- */
function storyMorning(){
  var st=stSt(), b=S.built, cand=[];
  if(st.letters>=1) cand.push(['papa','麵包店的櫃台上有一層薄薄的麵粉。有人用手指在上面寫了四個字母，歪歪的：P A P A。']);
  if(st.letters>=2) cand.push(['papa2','麵包店今天晚開門。Bernard 手上有墨水。']);
  if((S.ch3||{}).step>=1) cand.push(['crust','麵包店後窗的窗台上，放著切下來的麵包邊。中午就不見了。隔天，窗台上的麵包邊變多了。']);
  if((S.ch3||{}).step>=1) cand.push(['chalk','碼頭柱子上的粉筆字被人改過了。']);
  if(st.delivered) cand.push(['lucie','Lucie 今天把那袋信一封一封送完，每一家都道了歉。你聽到全鎮的門開開關關。']);
  if(st.nest) cand.push(['baron','你的門口放著半塊麵包，上面有牙印。旁邊有一個很小的腳印，和一個更小的鞠躬痕跡。']);
  if(b.bakery) cand.push(['bread','窗外有烤麵包的味道。鎮上的人還是不多，他還是烤一樣多。']);
  if(b.cottage) cand.push(['smoke','森林邊的小屋冒著煙。今天的茶大概還是很難喝。']);
  if(st.insp) cand.push(['notice','門縫裡塞了一張區公所的通知，蓋著紅章。內容看不太懂，紅章看得懂。']);
  if(b.post) cand.push(['bike','一台腳踏車從窗外飛過去，有人一邊騎一邊唱歌，走音走得很認真。']);
  var un=cand.filter(function(c){ return !st.morn[c[0]]; }); if(!un.length) return '';
  st.morn[un[0][0]]=1; save(); return un[0][1];
}

/* ---------- 🏁 對手：Zoé 的粉筆黑板（用已經在玩的小遊戲比，⛔ 不是只有台詞） ---------- */
var RV_NAME={run:'🚪 跑酷', stone:'🪨 過河', garden:'🌻 守園'};
function storyRival(game, score){
  var st=stSt(); if(!((S.ch3||{}).step>=1)) return;
  var z=st.rv[game], win=score>z;
  if(win){ st.wins[game]=(st.wins[game]||0)+1; st.rv[game]=score+1; save();
    setTimeout(function(){ toast('🏁 Zoé 瞪著柱子：「'+RV_NAME[game]+' '+score+'？……運氣。」她把自己的數字改成 '+(score+1)+'。'); }, 1200);
  } else setTimeout(function(){ toast('🏁 Zoé：「'+RV_NAME[game]+'我 '+z+'。」她沒有抬頭。'); }, 1200);
}
function rivalBoard(){ var st=stSt(); return '<div class="muted" style="margin-top:6px">碼頭柱子上的粉筆：'+Object.keys(RV_NAME).map(function(k){ return RV_NAME[k]+' '+st.rv[k]; }).join('　')+'</div>'; }
function rivalWins(){ var w=stSt().wins, n=0; for(var k in w) n+=w[k]; return n; }

/* ---------- 居民：Margot、Zoé 登場；每個人多兩幕（一天只能深聊一個人＝時間要取捨） ---------- */
LIFE.push(
  { id:'margot', name:'Margot', role:'船夫', spr:['d',87], spot:[24.5,11.6], on:function(){ return (S.ch3||{}).step>=1; }, fam:'pron', cards:[],
    intro:'「你就是那個一塊錢買房子的？」她把線咬斷。「有膽。或者有病。」',
    lines:[ [0,'船不怕浪，怕人。人上了船就開始想要回頭。'],
            [0,'今天的事我都寫在臉上了，你看這些皺紋。', 'Aujourd\'hui, j\'ai pris le bateau.', '今天我搭了船。'],
            [0,'太難？那就到時候再說。', 'Et si c\'est trop dur, on verra bien.', '如果太難，到時候再看吧。'],
            [1,'你確定要走？走了，就回不來原本的自己喔。'],
            [1,'你太認真了。法文又不會跑掉。……會，它會跑掉，但你追得上。'],
            [2,'我跟那個烤麵包的吵過一百次。他覺得人應該留下來，我覺得人應該走出去。我們都沒贏過。'] ],
    beats:[ {at:3, t:'你問她這艘船載過誰。<br>她把繩子打了一個結。「什麼人都載。想走的，我從來不問為什麼。」', fact:'載過很多人，從不問為什麼'},
            {at:8, t:'「十年前有個冬天晚上，霧大到看不到自己的手。沒有鐘，正常人不開船的。」<br>她把針穿回布裡。<br>「我不是正常人。」', fact:'十年前的霧夜開過一次船'},
            {at:14, t:'她從船艙拿出一雙小小的舊手套，放在膝蓋上。<br>「那個人留下的。我一直想還。」<br>她看了一眼麵包店的方向，又把手套收回去。', fact:'船艙裡留著一雙別人的舊手套'} ],
    asks:['你走的時候，有人送你嗎？'],
    req:[ '「這張船票上有一格我看不懂，幫我看一下。」' ] },
  { id:'zoe', name:'Zoé', role:'粉筆黑板的主人', spr:['d',98], spot:[26.5,12.4], on:function(){ return (S.ch3||{}).step>=1; }, fam:'verb', cards:[],
    intro:'她上下打量你。「你剛剛那句，動詞錯了。」你沒有講話。「喔，那是之前那句。」',
    lines:[ [0,'你念 r 的時候好像在漱口。不是罵你。好啦，有一點。'],
            [0,'我不用背。我聽就會了。你怎麼不聽就好？'],
            [0,'你為什麼要來這裡？這裡又沒有東西。……我？我只是路過。'],
            [1,'你女兒以後講法文會比你好，你知道吧？她會一直糾正你。很煩的。……我是說，對她來說很煩。'],
            [1,'這個鎮的麵包還可以啦。'],
            [2,'大人都說會回信。'] ],
    beats:[ {at:3, need:function(){ return rivalWins()>=1; }, t:'她看著柱子上你的數字看了很久。「你作弊。」<br>然後她在你那格旁邊畫了一顆很醜的星星，畫完馬上走掉。', fact:'在你的數字旁邊畫了一顆很醜的星星'},
            {at:8, need:function(){ return rivalWins()>=2; }, t:'天黑以後她一個人坐在碼頭，用手指在水泥地上一直寫東西。<br>你走近，她用腳抹掉。<br>「看什麼。」<br>你看到最後一個字母，是 i。', fact:'晚上會在碼頭的水泥地上寫東西，看到人就抹掉'},
            {at:14, need:function(){ return rivalWins()>=3; }, t:'她把粉筆塞給你。<br>「我媽說法文要學好，才不會跟她一樣，寫了信都沒人回。」<br>她馬上閉嘴，瞪你。<br>「你什麼都沒聽到。」', fact:'她說她媽媽寫的信都沒人回'} ],
    asks:[], req:[ '「這題我當然會。我只是想看你會不會。」' ] }
);
LIFE_PAIRS['bernard|zoe']=[ ['zoe','那個邊邊你不要了嗎？'], ['bernard','……你說什麼？'], ['zoe','麵包邊。最好吃的地方。'], ['bernard','……'], ['bernard','拿去。'] ];
LIFE_PAIRS['bernard|margot']=[ ['bernard','你又回來幹嘛。'], ['margot','買麵包。'], ['bernard','沒有了。'], ['margot','架上那麼多。'], ['bernard','……一條兩塊。'] ];
LIFE_PAIRS['margot|zoe']=[ ['margot','你到底什麼時候要說？'], ['zoe','說什麼？'], ['margot','……隨便你。'] ];
LIFE_PAIRS['gaston|zoe']=[ ['zoe','你為什麼都不講話？'], ['gaston','……'], ['zoe','好酷。'] ];
(function(){
  function add(id, list){ var R=lifeRes(id); if(R) R.beats=R.beats.concat(list); }
  function L(n){ return function(){ return stSt().letters>=n; }; }
  add('bernard',[
    {at:6, need:L(1), t:'他把價目牌推到你面前，手指按著第一個字。<br>「這個。」<br>你念給他聽：<span class="fr">pain</span>。<br>他跟著念了一次，看著那四個字母，像第一次見到。<br>「我賣了四十年。」', fact:'請你念價目牌上的 pain'},
    {at:9, need:L(2), t:'他從圍裙口袋掏出一張紙，上面是他自己寫的：B-É-A。É 的那一撇畫反了。<br>「對嗎？」<br>你拿筆改過來。他看了很久，又擦掉，自己再寫一次。<br>「再一次。」', fact:'自己寫了女兒的名字'} ]);
  add('clement',[
    {at:17, t:'你在廣場看到他，手上拿著兩杯茶。<br>「我走過來的。四十分鐘。以前她走這段路只要二十。」<br>他遞給你一杯，還是很難喝。<br>「明天我大概不會來。」<br>隔天他來了。', fact:'第一次走進鎮上'},
    {at:21, need:L(1), t:'他在交貨攤旁的台階上放了一塊小黑板，寫著字母。<br>「Lucie 說，鎮上有人想認字，不好意思問。」他看著你。<br>「不用告訴我是誰。」', fact:'開始在廣場擺字母黑板'} ]);
  add('lucie',[
    {at:17, t:'奶奶 Odette 叫你進屋，從餅乾盒裡拿出一本存摺，存了十年，每一筆都很小。封面寫著 <i>Lucie</i>。<br>「她以為我不知道她想走。」奶奶把存摺收好，「別告訴她。讓她自己跟我吵完。」', fact:'奶奶存了十年的學費，還沒告訴她'},
    {at:21, sign:'Odette', t:'今天全鎮都看到一件事：Odette 拄著拐杖，一步一步走到廣場，在 Pelletier 的名冊上簽了名。<br>Lucie 追在後面：「奶奶你幹嘛！」<br>「你走了，鎮上要有人補。」奶奶把筆還回去，「去吧。」<br>Lucie 第二次沒在講話。', fact:'奶奶自己去名冊簽名，叫她去'} ]);
  add('amira',[
    {at:17, t:'她把家長會要講的話寫在訂單背面，對著一箱蘋果練習。<br>「老師您好。」蘋果沒有反應。<br>她看到你。「看什麼。你當老師。」<br>你當了。她講完，瞪你：「笑什麼？」你沒有笑。她才發現自己手在抖。', fact:'對著蘋果練家長會要講的話'},
    {at:21, sign:'Inès', t:'今天的蘋果特別大。<br>「老師問了我一個問題。我答了。講錯兩個字。」她丟一顆給你。<br>「沒有人笑。我女兒在桌子底下捏我的手。」<br>攤子後面探出一個女孩的頭，對你揮手。「她說要簽你們那個名冊，說鎮上的小孩不能只有那個寫粉筆的。」', fact:'在家長會上開口了；女兒 Inès 也簽了名冊'} ]);
  add('gaston',[
    {at:17, t:'你從門口看到他握著電話，站了整整一爐的時間，沒有撥。<br>你走進去，他把話筒放回去。<br>「……晚點。」<br>爐子快熄了，他第一次讓爐子快熄了。', fact:'握著電話站了很久，沒有撥'},
    {at:21, sign:'Théo', t:'鐵匠鋪門口站著一個穿西裝的年輕人，不知道手要放哪裡。<br>Gaston 沒抬頭，從牆上拿下那把小鐵鎚丟過去。<br>年輕人接住。太小了。兩個人都看著那把鎚子。<br>「……你手變大了。」<br>「嗯。」', fact:'兒子 Théo 回來了'} ]);
  /* ⚠️ 只能往後加、不能排序：存檔 st.beats 記的是陣列位置 */
  /* 盲讀 11-04：線索跟答案放太近，一讀就猜到 → 這幾句等主線走到才開放（L[4]＝條件） */
  var B=lifeRes('bernard');
  B.lines.forEach(function(l){ if(l[1].indexOf('麵包的邊')>=0) l[4]=function(){ return (S.ch3||{}).step>=1; }; });
  if(B.beats[2]) B.beats[2].need=function(){ return !!S.ch3done; };
  B.lines.push([0,'麵包為什麼什麼都不肯說？因為它被烤問過了！……好笑吧？'],
    [0,'那一行，你沒有跳過。', '', '', function(){ return stPick('line')==='all'; }],
    [0,'你下次再替我跳，我就算你兩倍價錢。', '', '', function(){ return stPick('line')==='skip'; }]);
  var Lu=lifeRes('lucie');
  if(Lu) Lu.lines.push([0,'我自己去了。腿在抖。他給我一條長棍，我這輩子沒吃過那麼難吞的麵包。', '', '', function(){ return stPick('bundle')==='lucie'; }],
    [0,'那疊信是你幫我送的。我欠你。總有一天我要自己跟他說。', '', '', function(){ return stPick('bundle')==='you'; }],
    [0,'最上面那封的封口好像開過？……我沒問喔。我什麼都沒問。', '', '', function(){ return stPick('bundle')==='open'; }]);
})();
function lifeBeatReady(id){ var R=lifeRes(id), st=lifeSt(id); return R.beats.filter(function(b,i){ return st.pts>=b.at && !st.beats[i] && (!b.need||b.need()); })[0]||null; }
/* ⭐ 一天只能深聊一個人（實況野球的取捨）：另一個人的事往後延，⛔ 不會消失、不扣任何東西 */
function eveFree(id){ var e=stSt().eve; return e.d!==today() || e.who===id; }
function eveMark(id){ var st=stSt(); st.eve={d:today(), who:id}; save(); }
lifeSpawn();
