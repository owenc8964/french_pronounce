/* 🛎️ 問句選擇題：「你想問＿＿，要選哪個？」（2026-11-27）
   Owen：「遊戲可以設計這個選擇題：如果你想問 XXX（中文）要選哪個，當然要一些更精準的部分」
   - 練的是口說第二題（向考官發問）＝寫作第一題（給朋友資訊）的同一組欄位：時間／地點交通／價格／規定／需求／天氣／內容
   - ⭐「精準」：錯的三個選項都是同一類、意思相近的真問句（開始 vs 結束、折扣 vs 學生折扣…），
     意思一樣的問法標 same，⛔ 不會互當錯誤選項；⛔ 法文一句都不自己寫（全部出自口語寶典）
   - 答完提醒：考試真正計分的是「聽懂考官回答再接話」（11/8 Lucas 諮詢＋官方評分項），這題只練第一步
   - 內容：私人空間 exam_isle/t2_ask.js（寶典衍生，⛔ 不進公開 repo）；沒登入就不出題、不擋路
   - 跳過三層：會了／⏭ 跳過／今天先不要；跳過不計分、不進複習
   - 入口：跟 🏛 宮殿、🧰 句型題同一個（礦石／樹叢／釣魚開始前），town.html 的 palaceServe 那一串 */
(function(){
var DATA=null, CAP=6, LOADING=false;
function LS(k,d){ try{ var v=JSON.parse(localStorage.getItem(k)); return v==null?d:v; }catch(e){ return d; } }
function LSset(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
function sod(t){ var d=new Date(t); d.setHours(0,0,0,0); return d.getTime(); }
function dayKey(){ return new Date().toDateString(); }
function shuf(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)), t=a[i]; a[i]=a[j]; a[j]=t; } return a; }
function words(s){ return String(s).toLowerCase().replace(/[’']/g,' ').replace(/[?!.,;:()«»]/g,' ').split(/\s+/).filter(function(w){ return w.length>2; }); }
function sim(a,b){ var A=words(a), B=words(b), n=0; A.forEach(function(w){ if(B.indexOf(w)>=0) n++; }); return n/Math.max(1, Math.min(A.length,B.length)); }

function ready(){ return !!(DATA && DATA.items && DATA.items.length); }
function preload(){
  if(DATA || LOADING || typeof vaultGet!=='function') return; LOADING=true;
  vaultGet('exam_isle/t2_ask.js', true).then(function(b){ return b.text(); }).then(function(t){ new Function(t)(); DATA=window.T2_ASK||null; })
    .catch(function(){}).then(function(){ LOADING=false; });
}
function slotOf(id){ return (DATA.slots||[]).filter(function(s){ return s.id===id; })[0] || {em:'❓', name:''}; }
function dayCount(){ var d=LS('clb7_ask_day',{}); if(d.d!==dayKey()) d={d:dayKey(), n:0, off:0}; return d; }
function dayBump(){ var d=dayCount(); d.n++; LSset('clb7_ask_day', d); }
function dayOff(){ var d=dayCount(); d.off=1; LSset('clb7_ask_day', d); }
/* 間隔：答錯隔天、答對 3／7／21 天（同句型題） */
var GAP=[1,3,7,21];
function grade(it, ok){ var s=LS('clb7_ask_srs',{}), r=s[it.id]||{s:0}; r.s=ok?Math.min(r.s+1,GAP.length-1):0; r.due=sod(Date.now())+GAP[ok?r.s:0]*864e5; r.last=Date.now(); s[it.id]=r; LSset('clb7_ask_srs', s); }
function known(it){ var k=LS('clb7_ask_known',{}), r=k[it.id]||{n:0}; r.n++; r.last=Date.now(); k[it.id]=r; LSset('clb7_ask_known', k); }

/* 出哪一題：到期的先；新題先平均挑類別再挑句子（各類題數差很多，不平均會一直出派對） */
function pick(){
  var srs=LS('clb7_ask_srs',{}), kn=LS('clb7_ask_known',{}), now=Date.now();
  var ok=DATA.items.filter(function(it){ var k=kn[it.id]; return !(k && now-k.last<3*864e5) && pool(it).length>=3; });
  var due=ok.filter(function(it){ return srs[it.id] && srs[it.id].due<=now; });
  if(due.length) return due[Math.floor(Math.random()*due.length)];
  var fresh=ok.filter(function(it){ return !srs[it.id]; });
  if(!fresh.length) return null;
  var slots=[]; fresh.forEach(function(it){ if(slots.indexOf(it.slot)<0) slots.push(it.slot); });
  var sl=slots[Math.floor(Math.random()*slots.length)], c=fresh.filter(function(it){ return it.slot===sl; });
  return c[Math.floor(Math.random()*c.length)];
}
/* 錯誤選項：同一類、⛔ 不同意思（same 不同組），越像的越優先 */
function pool(it){ return DATA.items.filter(function(x){ return x.id!==it.id && x.slot===it.slot && !(it.same!=null && x.same===it.same) && x.zh!==it.zh; }); }
function distract(it){
  var p=pool(it).map(function(x){ return {x:x, s:sim(it.fr,x.fr)+Math.random()*.35}; }).sort(function(a,b){ return b.s-a.s; });
  var out=[], usedSame={};
  p.forEach(function(o){ if(out.length>=3) return; if(o.x.same!=null){ if(usedSame[o.x.same]) return; usedSame[o.x.same]=1; } out.push(o.x); });
  return out;
}

function tail(){ return '<div class="row2"><button class="btn ghost" id="akKnow">會了</button><button class="btn ghost" id="akSkip">⏭ 跳過</button><button class="btn ghost" id="akOff">今天先不要</button></div>'; }
function ask(it, cont){
  var t0=Date.now(), fin=false, kind='🛎️ 問句選擇', sl=slotOf(it.slot), opts=shuf([it].concat(distract(it)));
  var who=it.slot==='fete'?'對朋友（tu）':'對櫃台、店員（vous）';
  openSheet('<h3>🛎️ 你想問…… <small>'+sl.em+' '+esc(sl.name)+'</small></h3>'+
    '<div class="story" style="font-size:1.2em;text-align:center">「'+esc(it.zh)+'」</div>'+
    '<div class="muted" style="text-align:center">'+who+'，要選哪一句？</div>'+
    '<div class="opts" id="akOpts">'+opts.map(function(o,k){ return '<button class="opt fr" data-k="'+k+'" style="text-align:left">'+esc(o.fr)+'</button>'; }).join('')+'</div>'+
    '<div class="fb" id="akFb"></div><div class="row2"><span></span><span id="akSlot"></span></div>'+tail(), true);
  sheet.querySelectorAll('#akOpts [data-k]').forEach(function(b){ b.onclick=function(){ if(fin) return; fin=true;
    var o=opts[+b.dataset.k], ok=o.id===it.id;
    grade(it, ok); dayBump(); if(ok){ S.gold=(S.gold||0)+1; save(); }
    if(window.GameLog) GameLog.answer(ok, {kind:kind, topic:'t2ask-'+it.slot, ref:'ask:'+it.id, ms:Date.now()-t0, q:it.zh, a:it.fr, pick:o.fr});
    speak(it.fr);
    /* 四句都攤開：對的那句＋其他三句各自在問什麼——差別在哪裡就是這題要學的 */
    sheet.querySelectorAll('#akOpts [data-k]').forEach(function(x){ var y=opts[+x.dataset.k];
      x.disabled=true; x.style.opacity=y.id===it.id||y===o?'1':'.75';
      x.innerHTML=(y.id===it.id?'✓ ':(y===o?'✗ ':''))+esc(y.fr)+' '+spk(y.fr)+'<div class="muted" style="font-size:.85em">'+esc(y.zh)+'</div>';
      if(y.id===it.id) x.style.borderColor='#6fcf8a'; else if(y===o) x.style.borderColor='#e07a7a'; });
    document.getElementById('akFb').innerHTML=(ok?'✓ 對了':'👉 要問的是上面打 ✓ 的那句')+
      '<div class="muted" style="font-size:.8em;margin-top:4px">💡 考試時這只是第一步：考官回答後，要接著<b>他的回答</b>再問或回應——接話才是第二題的評分重點。</div>'+
      (ok?'':'<div class="muted" style="font-size:.8em">🔁 明天會再出一次</div>');
    document.getElementById('akSlot').innerHTML='<button class="btn main" id="akNext">繼續</button>'; document.getElementById('akNext').onclick=cont; }; });
  document.getElementById('akKnow').onclick=function(){ known(it); cont(); };
  document.getElementById('akSkip').onclick=function(){ cont(); };
  document.getElementById('akOff').onclick=function(){ dayOff(); toast('🛎️ 今天先不出問句題了'); cont(); };
}
/* 路上的入口：回傳 true＝這次被問句題叫住了 */
function serve(cont){
  if(!ready()){ preload(); return false; }
  var d=dayCount(); if(d.off || d.n>=CAP) return false;
  if(Math.random()>.2) return false;
  var it=pick(); if(!it) return false;
  toast('🛎️ 這句想問的話，法文怎麼問？'); ask(it, cont); return true;
}
window.AskQ={serve:serve, preload:preload, _ask:ask, _pick:pick, _distract:distract, _data:function(){ return DATA; }, _set:function(d){ DATA=d; }};
setTimeout(preload, 3500);
})();
