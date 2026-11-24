/* ============================================================
   🎤 考場島（2026-11-24 Owen：「我現在要準備啦 那些都一起放進來」→ 選「方法＋詞彙＋題目（不放範文）」「放遊戲裡的口說島」）
   內容來源：
     ・第三題：《口語3備考寶典》的方法（1.2 維度化思考、組織論證、1.3 段落銜接詞）＋每一類的詞彙＋目錄 152 題；另併入 pack3 題庫 → exam_t3_data.js
     ・第二題：《口語2備考寶典》第 1 章（三種問句、疑問詞、開場 ABC、結尾、通用問題角度、自然回應）＋ banque de sujets 的情境 → exam_t2_sits.js
   ⛔ 不放範文（寶典作者自己也不建議背別人的模板）。法文句子都是寶典原句；寶典寫錯的地方改成標準法文並在卡上標出原文（來源三層：標準法文＞課本＞逐字稿）
   ⚠️ 寶典作者寫明題目「來自公開網路資源，不代表真實考題」→ 練思路用，不是押題
   做法：沿用口說群島的畫布引擎（town.html 的 isle*），這支檔包住幾個函式，遇到 ISLE.id==='EXAM' 走考場島自己的流程
   紀錄（都會同步）：clb7_exam_known 跳過／降低出現（物件＋last）、clb7_exam_done 講過、clb7_exam_dims 每題選的維度、clb7_exam_mine 我會這樣講
   ============================================================ */
(function(){
if(typeof ISLE_SCENES==='undefined') return;
var css=document.createElement('style'); css.textContent='ul.phr{list-style:none;margin:4px 0;padding:0} ul.phr li{margin:6px 0;line-height:1.35} ul.phr .fr{color:#fff3c0} ul.phr .spk{margin-left:2px} #exMine{width:100%;box-sizing:border-box}'; document.head.appendChild(css);

/* ⛔ 內容（題目、詞彙、方法卡）不在這支檔：11-24 Owen：「TCF 之前買的那個資料要整理進 Supabase」→ 放私人空間 exam_isle/content.js，登入（📻 通行證）才讀得到。
   本機原始檔在 assets/tcf/exam_isle/（gitignore），改完跑 python3 tools/exam_isle_build.py && python3 tools/upload_exam_isle_supabase.py */
var EXAM_ZONES, EXAM_ZORDER, EXAM_DIMS, EXAM_CARDS, EXAM_ANGLES, EXAM_FOLLOW, EXAM_T2_CATS, EXAM_T2_SITS, EXAM_T3, EXAM_OK=false;
function dimById(k){ return EXAM_DIMS.filter(function(d){ return d[0]===k; })[0]; }
function frList(L){ return '<ul class="phr">'+L.map(function(x){ return '<li><span class="fr">'+esc(x[0])+'</span> '+spk(x[0])+(x[1]?'<div class="muted">'+esc(x[1])+'</div>':'')+'</li>'; }).join('')+'</ul>'; }
function fixNote(t){ return '<div class="muted" style="font-size:.78em;margin-top:4px">✏️ 跟寶典不一樣的地方：'+esc(t)+'</div>'; }
window.ExamIsleUtil={frList:frList, fixNote:fixNote};
function examLoad(cb){
  if(EXAM_OK) return cb();
  vaultGet('exam_isle/content.js', true).then(function(b){ return b.text(); }).then(function(t){
    new Function(t)(); var C=window.EXAM_CONTENT; if(!C) throw new Error('內容格式不對');
    EXAM_ZONES=C.zones; EXAM_ZORDER=C.zorder; EXAM_DIMS=C.dims; EXAM_CARDS=C.cards; EXAM_ANGLES=C.angles; EXAM_FOLLOW=C.follow; EXAM_T2_CATS=C.t2cats; EXAM_T2_SITS=C.t2sits; EXAM_T3=C.t3; EXAM_OK=true; cb();
  }).catch(function(e){ var c=e&&e.code;
    openSheet('<h3>🎤 考場島</h3><div class="story">'+(c==='nologin'||c==='expired'?'考場島的題目放在私人空間，要先接上 📻 收音機（通行證＝考試之塔那組帳號）。':'考場島的題目載不下來（網路？'+esc(e&&e.message||'')+'）。')+'</div>'+
      '<div class="row2"><button class="btn ghost" id="exNo">回去</button>'+(c==='nologin'||c==='expired'?'<button class="btn main" id="exAcct">📻 接上收音機</button>':'')+'</div>', true);
    document.getElementById('exNo').onclick=closeSheet; var a=document.getElementById('exAcct'); if(a) a.onclick=acctPanel; });
}

/* ---------- 小工具 ---------- */
function LS(k, d){ try{ var v=JSON.parse(localStorage.getItem(k)); return v==null?d:v; }catch(e){ return d; } }
function LSset(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
function bump(k, id){ var o=LS(k,{}), r=o[id]||{n:0}; r.n++; r.last=Date.now(); o[id]=r; LSset(k,o); }
function shuf(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)), t=a[i]; a[i]=a[j]; a[j]=t; } return a; }
/* 挑題：最近 3 天跳過的放最後（⛔ 不刪，只是少出現）；講過次數少的優先；同分隨機 */
function pickFrom(list, idOf){
  var kn=LS('clb7_exam_known',{}), dn=LS('clb7_exam_done',{}), now=Date.now();
  var w=function(x){ var id=idOf(x), k=kn[id], d=dn[id]; return (k&&now-k.last<3*86400000?100:0) + (k?k.n*3:0) + (d?d.n:0) + Math.random(); };
  return list.map(function(x){ return {x:x, w:w(x)}; }).sort(function(a,b){ return a.w-b.w; })[0].x;
}
var timerH=null;
function stopTimer(){ if(timerH){ clearInterval(timerH); timerH=null; } }
function fmt(s){ s=Math.max(0,Math.round(s)); return Math.floor(s/60)+':'+('0'+s%60).slice(-2); }
function mineBlock(ref, q){
  return '<details class="minebox"><summary class="muted">✍️ 我會這樣講（記下來，我之後只幫你修語法）</summary><textarea class="fill" id="exMine" rows="3" lang="fr" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="用你自己的話寫你剛剛講的重點，講錯沒關係"></textarea>'+
    '<button class="btn" id="exMineGo" data-ref="'+esc(ref)+'" data-q="'+esc(q)+'">記下來</button><div class="muted" id="exMineOk" style="font-size:.8em"></div></details>';
}
sheet.addEventListener('click', function(e){ var b=e.target.closest && e.target.closest('#exMineGo'); if(!b) return; e.stopPropagation();
  var v=String((document.getElementById('exMine')||{}).value||'').trim(); if(!v) return;
  var a=LS('clb7_exam_mine',[]); a.push({ts:Date.now(), ref:b.dataset.ref, q:b.dataset.q, mine:v}); LSset('clb7_exam_mine', a.slice(-300));
  document.getElementById('exMineOk').textContent='✓ 記下了'; document.getElementById('exMine').value=''; });
function flagBtn(ctx){ return '<button class="btn ghost" id="exFlag" data-ctx="'+esc(ctx)+'" title="回報問題">🚩</button>'; }
sheet.addEventListener('click', function(e){ var b=e.target.closest && e.target.closest('#exFlag'); if(!b) return; e.stopPropagation();
  var t=prompt('這一題有什麼問題？（中文翻錯、法文怪怪的、題目重複…）'); if(!t||!t.trim()) return;
  if(window.GameLog) GameLog.report({src:'town', kind:'考場島', ref:'exam', q:b.dataset.ctx, a:'', pick:''}, t.trim()); toast('🚩 收到了，謝謝'); });

/* ---------- 第三題一站 ---------- */
function examT3(z, q){
  stopTimer();
  var Z=EXAM_ZONES[z], pool=EXAM_T3.filter(function(x){ return x.z===z; }); if(!pool.length) return;
  q=q||pickFrom(pool, function(x){ return x.id; });
  var dims=LS('clb7_exam_dims',{})[q.id]||[], show=false, zh=false;
  function paint(){
    var h='<h3>'+pix(Z.em,26)+' '+esc(Z.name)+' <small>第三題・表達看法</small></h3>'+
      '<div class="story">🦉 考官念題目。<b>先只用聽的</b>，聽不懂再看字。</div>'+
      '<div class="row2" style="margin:4px 0"><button class="btn" id="exSay">🔊 再念一次</button><button class="btn ghost" id="exShow">'+(show?'🙈 收起題目':'👀 看題目')+'</button><button class="btn ghost" id="exZh">'+(zh?'收起中文':'🀄 中文')+'</button></div>'+
      (show?'<div class="clue fr">'+esc(q.fr)+'</div>'+(q.note?fixNote(q.note):''):'')+
      (zh?'<div class="muted">'+(q.zh?esc(q.zh):'題目大意：'+esc(q.t||''))+'</div>':'')+
      '<div class="dexhead">🧭 準備：這題你要從哪 2–3 個維度講？</div><div class="opts" id="exDims" style="flex-direction:row;flex-wrap:wrap">'+
      EXAM_DIMS.map(function(d){ var on=dims.indexOf(d[0])>=0; return '<button data-dim="'+d[0]+'" class="'+(on?'ok':'')+'" style="flex:1 1 30%">'+d[1]+' '+esc(d[3])+'</button>'; }).join('')+'</div>'+
      (dims.length?'<div class="muted" style="font-size:.8em">'+dims.map(function(k){ var d=dimById(k); return d[1]+' '+d[4].slice(0,3).map(function(s){ return s[1]; }).join('、'); }).join('<br>')+'</div>':'')+
      '<details class="movecard"><summary>📦 這一類常用的詞</summary>'+frList(Z.vocab)+'</details>'+
      '<details class="movecard"><summary>🎬 怎麼排：遠景→拉近→特寫→拉遠</summary><div class="muted">① 你怎麼看 ② 為什麼 ③ 一個例子或比較 ④ 回到主張。每個維度走一輪。</div></details>'+
      '<div class="row2"><button class="btn ghost" id="exSkip">⏭ 這題跳過</button>'+flagBtn('🎤 考場島 '+Z.name+'｜'+q.id+'｜'+q.fr)+'<button class="btn main" id="exGo">🎙 開始講（4:30）</button></div>'+
      '<div class="row2"><button class="btn ghost" id="exOther">🔀 同一類換一題</button><button class="btn ghost" id="exBack">回島上</button></div>';
    openSheet(h, true);
    document.getElementById('exSay').onclick=function(){ speak(q.fr); };
    document.getElementById('exShow').onclick=function(){ show=!show; paint(); };
    document.getElementById('exZh').onclick=function(){ zh=!zh; paint(); };
    sheet.querySelectorAll('[data-dim]').forEach(function(b){ b.onclick=function(){ var k=b.dataset.dim, i=dims.indexOf(k); if(i>=0) dims.splice(i,1); else dims.push(k);
      var all=LS('clb7_exam_dims',{}); if(dims.length) all[q.id]=dims.slice(); else delete all[q.id]; LSset('clb7_exam_dims', all); paint(); }; });
    document.getElementById('exSkip').onclick=function(){ bump('clb7_exam_known', q.id); if(window.GameLog) GameLog.answer(null,{kind:'🎤 考場島', ref:'exam:'+q.id}); examT3(z); };
    document.getElementById('exOther').onclick=function(){ examT3(z); };
    document.getElementById('exBack').onclick=function(){ stopTimer(); closeSheet(); };
    document.getElementById('exGo').onclick=talk;
  }
  function talk(){
    var t0=Date.now(), T=270, asked=[], fu=shuf(EXAM_FOLLOW);
    var h='<h3>🎙 講吧 <small>'+pix(Z.em,20)+' '+esc(Z.name)+'</small></h3>'+
      '<div style="text-align:center;font-size:2.6em;font-variant-numeric:tabular-nums;color:#fff3c0" id="exClock">4:30</div>'+
      '<div class="muted" style="text-align:center">講出聲音最好。⛔ 不用講滿也沒關係，講到一個段落就可以停。</div>'+
      (show?'<div class="muted fr" style="margin-top:6px">'+esc(q.fr)+'</div>':'<div class="row2"><button class="btn ghost" id="exPeek">👀 忘記題目了</button></div>')+
      (dims.length?'<div class="story">你選的維度：'+dims.map(function(k){ var d=dimById(k); return d[1]+' '+esc(d[3]); }).join('　')+'</div>':'')+
      '<div class="muted">每個維度：🔭 看法 → 🔎 為什麼 → 📸 例子 → 🔭 收回來</div>'+
      '<div id="exFu"></div>'+
      '<div class="row2"><button class="btn ghost" id="exAsk">🦉 考官追問一句</button><button class="btn main" id="exEnd">講完了</button></div>';
    openSheet(h, true); speak(q.fr);
    var pk=document.getElementById('exPeek'); if(pk) pk.onclick=function(){ pk.outerHTML='<div class="muted fr">'+esc(q.fr)+'</div>'; };
    document.getElementById('exAsk').onclick=function(){ var f=fu[asked.length%fu.length]; asked.push(f[0]); speak(f[0]);
      document.getElementById('exFu').innerHTML='<div class="clue fr">🦉 '+esc(f[0])+' '+spk(f[0])+'</div><div class="muted">'+esc(f[1])+'</div>'; };
    var fuAt=Math.round(110+Math.random()*60), fuDone=false;
    timerH=setInterval(function(){ var el=document.getElementById('exClock'); if(!el){ stopTimer(); return; } var left=T-(Date.now()-t0)/1000;
      el.textContent=fmt(left); if(!fuDone && T-left>=fuAt){ fuDone=true; var b=document.getElementById('exAsk'); if(b) b.click(); }
      if(left<=0){ el.textContent='0:00'; el.style.color='#8fc3ff'; stopTimer(); toast('⏱ 4 分 30 秒到了'); } }, 250);
    document.getElementById('exEnd').onclick=function(){ stopTimer(); done(Math.round((Date.now()-t0)/1000)); };
  }
  function done(sec){
    bump('clb7_exam_done', q.id);
    if(window.GameLog){ GameLog.event('exam_t3'); GameLog.answer(true,{kind:'🎤 考場島', topic:'exam-t3-'+z, ref:'exam:'+q.id, ms:sec*1000, q:q.fr, a:'', pick:''}); }
    S.gold=(S.gold||0)+3; save(); if(typeof hud==='function') hud();
    openSheet('<h3>👍 講完了 <small>'+fmt(sec)+'</small></h3><div class="muted fr">'+esc(q.fr)+'</div>'+
      '<div class="story">回想一下：每個維度有沒有走到 📸 例子？最後有沒有收回主張？</div>'+
      mineBlock('t3:'+q.id, q.fr)+
      '<div class="row2"><button class="btn ghost" id="exAgain">同一題再講一次</button><button class="btn" id="exNext">同一類下一題</button><button class="btn main" id="exBack">回島上</button></div>', true);
    document.getElementById('exAgain').onclick=function(){ examT3(z, q); };
    document.getElementById('exNext').onclick=function(){ examT3(z); };
    document.getElementById('exBack').onclick=closeSheet;
  }
  paint(); speak(q.fr);
}

/* ---------- 第二題櫃台 ---------- */
function examT2(cat, sit){
  stopTimer();
  var pool=EXAM_T2_SITS.map(function(s,i){ return {i:i, c:s[0], fr:s[1], zh:s[2]}; }).filter(function(s){ return !cat || s.c===cat; });
  sit=sit||pickFrom(pool, function(x){ return 't2:'+x.i; });
  var id='t2:'+sit.i, tu=/\bami/i.test(sit.fr) && !/^Je (travaille|suis (agent|professeur|propriétaire|la secrétaire|l’assistante|le gardien|responsable|parent))/i.test(sit.fr);   /* 朋友→tu；工作人員、鄰居、同事→vous（寶典：新環境的鄰居同事算不認識的人） */
  var show=false, picked={};
  function paint(){
    var h='<h3>🛎️ 第二題櫃台 <small>'+esc(EXAM_T2_CATS[sit.c]||'')+'</small></h3>'+
      '<div class="story">🦉 考官念情境，你要扮演發問的人。'+(tu?'對方是<b>朋友 → 用 tu</b>':'對方<b>不熟或是工作人員 → 用 vous</b>')+'</div>'+
      '<div class="row2" style="margin:4px 0"><button class="btn" id="exSay">🔊 再念一次</button><button class="btn ghost" id="exShow">'+(show?'🙈 收起':'👀 看情境')+'</button></div>'+
      (show?'<div class="clue fr">'+esc(sit.fr)+'</div>':'')+'<div class="muted">情境大意：'+esc(sit.zh)+'</div>'+
      '<div class="dexhead">🧰 準備（考試有 2 分鐘）：這題你要問哪些角度？</div><div class="opts" style="flex-direction:row;flex-wrap:wrap">'+
      EXAM_ANGLES.map(function(a,i){ return '<button data-ang="'+i+'" class="'+(picked[i]?'ok':'')+'" style="flex:1 1 30%">'+a[0]+' '+esc(a[1])+'</button>'; }).join('')+'</div>'+
      Object.keys(picked).map(function(i){ var a=EXAM_ANGLES[i]; return '<details class="movecard"><summary>'+a[0]+' '+esc(a[1])+' 的問法</summary>'+frList(a[2])+'</details>'; }).join('')+
      '<details class="movecard"><summary>👋 開場和結尾</summary><div class="muted">A 打招呼（＋背景）→ B 你的興趣或目的 → C 請對方幫忙。完整句子在碼頭告示牌的「開場 ABC」。</div>'+
        frList(tu?[['Salut ! J’ai entendu dire que…',''],['Tu peux m’en dire plus ?',''],['Merci beaucoup pour toutes ces informations !','']]:[['Bonjour, je viens d’arriver au Canada.',''],['J’aimerais vous poser quelques questions.',''],['Merci beaucoup pour toutes ces informations !','']])+'</details>'+
      '<div class="row2"><button class="btn ghost" id="exSkip">⏭ 這題跳過</button>'+flagBtn('🛎️ 考場島 第二題｜'+sit.fr)+'<button class="btn main" id="exGo">🎙 開始問（3:30）</button></div>'+
      '<div class="row2"><button class="btn ghost" id="exCat">換類別</button><button class="btn ghost" id="exOther">🔀 換一個情境</button><button class="btn ghost" id="exBack">回島上</button></div>';
    openSheet(h, true);
    document.getElementById('exSay').onclick=function(){ speak(sit.fr); };
    document.getElementById('exShow').onclick=function(){ show=!show; paint(); };
    sheet.querySelectorAll('[data-ang]').forEach(function(b){ b.onclick=function(){ var i=b.dataset.ang; if(picked[i]) delete picked[i]; else picked[i]=1; paint(); }; });
    document.getElementById('exSkip').onclick=function(){ bump('clb7_exam_known', id); if(window.GameLog) GameLog.answer(null,{kind:'🛎️ 考場島', ref:'exam:'+id}); examT2(cat); };
    document.getElementById('exOther').onclick=function(){ examT2(cat); };
    document.getElementById('exCat').onclick=catPick;
    document.getElementById('exBack').onclick=function(){ stopTimer(); closeSheet(); };
    document.getElementById('exGo').onclick=talk;
  }
  function catPick(){
    openSheet('<h3>🛎️ 選一類情境</h3><div class="opts">'+Object.keys(EXAM_T2_CATS).map(function(k){ return '<button data-c="'+k+'">'+esc(EXAM_T2_CATS[k])+'</button>'; }).join('')+'<button data-c="">🎲 不分類，隨便抽</button></div>', true);
    sheet.querySelectorAll('[data-c]').forEach(function(b){ b.onclick=function(){ examT2(b.dataset.c||null); }; });
  }
  function talk(){
    var t0=Date.now(), T=210, n=0;
    openSheet('<h3>🎙 問吧 <small>'+esc(sit.zh)+'</small></h3>'+
      '<div style="text-align:center;font-size:2.6em;font-variant-numeric:tabular-nums;color:#fff3c0" id="exClock">3:30</div>'+
      '<div class="muted" style="text-align:center">每問一題就按一下 ➕。考官回答後先回一句（<span class="fr">D’accord ! / C’est parfait !</span>）再問下一題。</div>'+
      '<div style="text-align:center;margin:10px 0"><button class="btn main" id="exPlus" style="font-size:1.3em">➕ 問了一題</button> <span id="exN" class="muted"></span></div>'+
      '<div class="muted">角度：'+(Object.keys(picked).length?Object.keys(picked).map(function(i){ return EXAM_ANGLES[i][0]+' '+esc(EXAM_ANGLES[i][1]); }).join('　'):EXAM_ANGLES.map(function(a){ return a[0]; }).join(' '))+'</div>'+
      '<div class="row2"><span></span><button class="btn main" id="exEnd">問完了</button></div>', true);
    speak(sit.fr);
    document.getElementById('exPlus').onclick=function(){ n++; document.getElementById('exN').textContent='已經問了 '+n+' 題'; };
    timerH=setInterval(function(){ var el=document.getElementById('exClock'); if(!el){ stopTimer(); return; } var left=T-(Date.now()-t0)/1000; el.textContent=fmt(left);
      if(left<=0){ el.textContent='0:00'; el.style.color='#8fc3ff'; stopTimer(); toast('⏱ 3 分 30 秒到了'); } }, 250);
    document.getElementById('exEnd').onclick=function(){ stopTimer(); done(Math.round((Date.now()-t0)/1000), n); };
  }
  function done(sec, n){
    bump('clb7_exam_done', id);
    if(window.GameLog){ GameLog.event('exam_t2'); GameLog.answer(true,{kind:'🛎️ 考場島', topic:'exam-t2-'+sit.c, ref:'exam:'+id, ms:sec*1000, q:sit.fr, a:String(n), pick:''}); }
    S.gold=(S.gold||0)+3; save(); if(typeof hud==='function') hud();
    openSheet('<h3>👍 問完了 <small>'+fmt(sec)+(n?'・'+n+' 題':'')+'</small></h3><div class="muted">'+esc(sit.zh)+'</div>'+
      '<div class="story">回想一下：有沒有哪個角度一直卡住、想不出問法？下次先點那個角度看問法。</div>'+
      mineBlock(id, sit.fr)+
      '<div class="row2"><button class="btn ghost" id="exAgain">同一個情境再問一次</button><button class="btn" id="exNext">下一個情境</button><button class="btn main" id="exBack">回島上</button></div>', true);
    document.getElementById('exAgain').onclick=function(){ examT2(cat, sit); };
    document.getElementById('exNext').onclick=function(){ examT2(cat); };
    document.getElementById('exBack').onclick=closeSheet;
  }
  paint(); speak(sit.fr);
}

/* ---------- 碼頭告示牌：方法卡 ---------- */
function examBoard(){
  stopTimer(); S.examBoardSeen=1; save();
  var L=[['dims','arg','conn'],['ask','open','angles','react']];
  openSheet('<h3>🪧 考場島・方法告示牌</h3>'+
    '<div class="story">這座島練的是考試的口說第二題、第三題：<br>🛎️ 碼頭旁的櫃台＝第二題（看情境問問題）<br>島上七區＝第三題七大類（聽題目、選維度、講 4 分半）。</div>'+
    '<div class="dexhead">🎤 第三題：表達看法</div><div class="opts">'+L[0].map(function(k){ return '<button data-card="'+k+'">'+esc(EXAM_CARDS[k].t)+'</button>'; }).join('')+'</div>'+
    '<div class="dexhead">🛎️ 第二題：問問題</div><div class="opts">'+L[1].map(function(k){ return '<button data-card="'+k+'">'+esc(EXAM_CARDS[k].t)+'</button>'; }).join('')+'</div>'+
    '<div class="muted" style="font-size:.8em;margin-top:8px">⚠️ 寶典作者寫明：題目來自公開的網路資源，不代表真實考題。拿來練思路和問法，不是押題。⛔ 這裡不放範文。</div>'+
    '<div class="row2"><span></span><button class="btn main" id="bdok">出發</button></div>', true);
  sheet.querySelectorAll('[data-card]').forEach(function(b){ b.onclick=function(){ var C=EXAM_CARDS[b.dataset.card];
    openSheet('<h3>'+esc(C.t)+'</h3>'+C.h()+'<div class="row2"><button class="btn ghost" id="cdB">回告示牌</button><button class="btn main" id="cdX">關閉</button></div>', true);
    document.getElementById('cdB').onclick=examBoard; document.getElementById('cdX').onclick=closeSheet; }; });
  document.getElementById('bdok').onclick=function(){ ISLE.boardAway=0; closeSheet(); };
}
/* 🦉 島主＝考官 */
function examHost(){
  var H=ISLE.host; if(!H) return; H.met=true; S.isleHost=S.isleHost||{}; S.isleHost.EXAM=1; save();
  var b0=document.getElementById('ibub'); if(b0) b0.remove();
  openSheet('<h3>'+pix(H.em,28)+' '+esc(H.name)+'</h3><div class="story">我是考官。走到哪一區，我就出那一類的題目；也可以直接叫我隨便出一題。</div>'+
    '<div class="opts"><button id="hT3">🎲 第三題：隨便一類出一題</button><button id="hT2">🛎️ 第二題：抽一個情境</button><button id="hBd">🪧 看方法告示牌</button><button id="hBye">👋 先自己逛</button></div>', true);
  document.getElementById('hT3').onclick=function(){ examT3(EXAM_ZORDER[Math.floor(Math.random()*EXAM_ZORDER.length)]); };
  document.getElementById('hT2').onclick=function(){ examT2(null); };
  document.getElementById('hBd').onclick=examBoard;
  document.getElementById('hBye').onclick=closeSheet;
}
function examOpen(g){ var b=document.getElementById('ibub'); if(b) b.remove(); if(g.exam==='t2') examT2(null); else examT3(g.exam); }

/* ---------- 地形：沿用自我介紹島的島形和步道；八站＝櫃台＋七類 ---------- */
ISLE_SCENES.EXAM={ name:'考場島', exam:true, W:26, H:35,
  blobs:[[12.5,17,10.3,14.6],[7,25,5.5,5],[19,10,5,5],[13,5,6,4]],
  zones:[ {name:'🛎️ 第二題櫃台', y0:25.5, y1:99, tint:'#8cc06a'}, {name:'🎤 第三題・生活與工作', y0:15, y1:25.5, tint:'#7fbf5f'}, {name:'🎤 第三題・社會與世界', y0:-9, y1:15, tint:'#93b8a4'} ],
  path:[[13,32.2],[13,29.2],[11,28],[7.5,27],[5.2,24.6],[6,21.2],[13,21],[20,21],[20.4,17],[19.5,15],[13,15],[6,15],[5.6,11],[7,9],[13,8.6],[18.5,9],[18,6],[13,4.4]],
  dock:[13,30.4,33.6], tablet:{x:13,y:18.1}, board:{x:14.8, y:29.4}, boardLab:'方法告示牌', tabletLab:'🦉 考官出題', outline:[],
  deco:[['🌴',3.2,28.6],['🌴',20.2,25.4],['🌴',3.0,18.4],['🌴',22.6,13.0],['🌳',16.6,25.8],['🌸',14.6,24.4],['🪨',22.0,19.2],['🌳',8.2,18.4],['🌳',17.4,18.6],['🌲',9.2,5.4],['🌲',17.6,4.0],['🪨',5.8,7.0],['🌸',11.0,11.6],['🌳',16.6,12.0]],
  st:[ ['t2','🛎️','🦉','第二題櫃台',[9.6,26.6]], ['tech','📱','','科技與媒體',[4.6,23.0]], ['rel','👪','','家庭、關係與教育',[10.2,22.2]], ['work','💼','','工作',[19.2,20.0]],
       ['cult','🌍','','文化與移民',[18.4,16.0]], ['sante','🥗','','健康、飲食與生活',[8.2,16.0]], ['env','🌱','','環境、交通與動物',[9.0,9.8]], ['soc','⚖️','','政治與社會',[15.0,9.8]] ] };
ISLE_HOSTS.EXAM=['🦉','考官 Hibou'];
ARCH_ICON.EXAM='🎤';

/* ---------- 包住島引擎的函式 ---------- */
var _units=isleUnits;
isleUnits=function(id){ var sc=isleSpec(id); if(!sc||!sc.exam) return _units(id);
  return sc.st.map(function(s,i){ return {n:i+1, exam:s[0], em:s[1], prop:s[2], lab:s[3], x:s[4][0], y:s[4][1], ref:'EXAM:'+s[0], s:{fr:'', zh:s[3], key:s[0], part:''}, R:{name:sc.name}}; }); };
var _visit=storyIsleVisit;
storyIsleVisit=function(id){ if(id==='EXAM') return; return _visit.apply(this, arguments); };   /* 考場島不算第三章「走完一座島」 */
var _board=isleBoard;
isleBoard=function(){ if(ISLE.id!=='EXAM') return _board(); if(ISLE.examSkipAuto){ ISLE.examSkipAuto=false; return; } examBoard(); };   /* 上島自動打開只有第一次；之後走回告示牌旁才打開 */
var _host=isleHostTalk;
isleHostTalk=function(){ if(ISLE.id!=='EXAM') return _host(); examHost(); };
var _enter=isleEnter;
isleEnter=function(id){ ISLE.examSkipAuto= id==='EXAM' && !!S.examBoardSeen; _enter(id); if(id!=='EXAM') return;
  ['izh','ilist','irun','ijoint'].forEach(function(k){ var e=document.getElementById(k); if(e) e.style.display='none'; });
  var nav=ihud.querySelector('.inav'); if(nav){ var b=document.createElement('button'); b.id='iexam'; b.textContent='🎲 抽一題'; b.onclick=function(){ if(!busy) examHost(); }; nav.insertBefore(b, document.getElementById('inext')); }
  var r=document.getElementById('irail'); if(r) r.style.display='none';
  var h=document.getElementById('ihint'); if(h) h.textContent='⛵ 靠岸了。🛎️ 碼頭旁是第二題櫃台；往上走七區是第三題七大類。走到地標旁點一下就出題，🦉 考官也可以直接出題。';
  document.getElementById('iflag').onclick=function(){ if(window.GameLog) GameLog.quickReport('town','🎤 考場島'); };
};
var _rail=isleRailPaint;
isleRailPaint=function(){ if(ISLE.id==='EXAM') return; return _rail(); };
var _bubble=isleBubble;
isleBubble=function(ox,oy,ts,d){ if(ISLE.id!=='EXAM') return _bubble(ox,oy,ts,d);
  var b=document.getElementById('ibub'), g=ISLE.near;
  if(!g || ISLE.still<.3 || busy){ if(b) b.remove(); return; }
  if(!b){ b=document.createElement('div'); b.id='ibub'; b.className='ibub'; document.body.appendChild(b); }
  if(b.dataset.sig!==g.ref){
    var Z=EXAM_ZONES[g.exam], n=g.exam==='t2'?EXAM_T2_SITS.length:EXAM_T3.filter(function(x){ return x.z===g.exam; }).length;
    b.innerHTML='<div class="muted" style="font-size:.78em">第 '+g.n+' 站・'+(g.exam==='t2'?'第二題・看情境問問題':'第三題・表達看法')+'</div>'+
      '<div style="color:#fff3c0;font-size:1.05em">'+esc(g.lab)+(Z?' <small class="fr" style="opacity:.75">'+esc(Z.fr)+'</small>':'')+'</div>'+
      '<div class="muted" style="font-size:.78em">這裡有 '+n+' 個'+(g.exam==='t2'?'情境':'題目')+'・點我出一題</div>'+
      '<div class="ilink">'+(g.n>1?'<button data-act="prev">◀</button>':'')+'<span></span>'+(g.n<ISLE.units.length?'<button data-act="next">下一站 ▶</button>':'')+'</div>';
    b.dataset.sig=g.ref;
    b.onclick=function(e){ var t=e.target.closest && e.target.closest('[data-act]'); if(t){ e.stopPropagation(); b.remove(); return isleStep(t.dataset.act==='prev'?-1:1); } examOpen(g); };
  }
  var X=(ox+g.x*ts)/d, Y=(oy+g.y*ts)/d; b.style.left=Math.max(8, Math.min(innerWidth-b.offsetWidth-8, X-b.offsetWidth/2))+'px'; b.style.top=Math.max(64, Y-ts/d*1.6-b.offsetHeight)+'px';
};
var _tap=isleTap;
isleTap=function(cx, cy){ if(ISLE.id!=='EXAM') return _tap(cx, cy);
  var V=ISLE.view; if(!V || busy) return;
  var wx=(cx*V.d-V.ox)/V.ts, wy=(cy*V.d-V.oy)/V.ts, sc=isleSpec('EXAM'), best=null, bd=1.1;
  ISLE.units.forEach(function(g){ var dd=Math.min(Math.hypot(g.x-wx, g.y-wy), Math.hypot(g.x-wx, g.y-.6-wy)); if(dd<bd){ bd=dd; best=g; } });
  if(ISLE.host && Math.hypot(ISLE.host.x-wx, ISLE.host.y-.4-wy)<.8) return examHost();
  if(best && best===ISLE.near && !ISLE.auto) return examOpen(best);
  if(best) return isleGo(best);
  if(Math.hypot(sc.board.x-wx, sc.board.y-.5-wy)<1) return examBoard();
  if(Math.hypot(sc.tablet.x-wx, sc.tablet.y-.5-wy)<1) return examHost();
};
/* 群島總覽：在海上多一座「考場島」（不在 15 座口說島的固定位置裡，放右下角） */
var _arch=archOpen;
archOpen=function(){ _arch(); var A=ihud.querySelector('.arch'); if(!A) return;
  var b=document.createElement('button'); b.className='aisle live'; b.style.left='86%'; b.style.top='84%';
  b.innerHTML='<span class="ablob" style="border-radius:48% 52% 44% 56%">'+pix('🎤',26)+'</span><span class="aname">考場島<small>第二、三題</small></span>';
  b.onclick=function(){ examLoad(function(){ isleEnter('EXAM'); }); }; A.appendChild(b); };
var _exit=isleExit;
isleExit=function(){ stopTimer(); return _exit.apply(this, arguments); };
window.ExamIsle={t3:examT3, t2:examT2, board:examBoard};
})();
