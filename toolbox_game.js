/* ============================================================
   🧰 工具箱進遊戲（2026-11-25 Owen：「拿來做遊戲中題目」→「兩種都做」）
   兩種題，混在路上的遭遇裡（跟 🏛 宮殿同一個入口：⛏ 礦石／🌳 樹叢／🎣 釣魚開始前，有機會先被叫住）——⛔ 不做選單讓他自己挑（選單會被選最簡單的）
   ① ✍️ 連接詞填空：Lucas 例句挖掉關鍵句型，提示＝中文意圖＋整句中文 → 打出來。例句只有約 40 句 → 一天最多 4 題
   ② 💬 意圖反射卡：只給中文意圖（「利大於弊」）→ 先講出法文 → 翻牌對 → 自評。寶典沒例句的句型也能出。一天最多 8 題
   ⭐ 優先出：到期的回收 > 工具箱裡挑過但講／寫時沒用到的（clb7_toolbox_use pick>used）> 沒見過的
   回收：clb7_toolbox_srs { key:{ step, due, last, n } }（隔天→3 天→7 天→21 天；答錯／想不到回到隔天；⛔ 不刪）
   三層出口：「會了」（記 clb7_toolbox_known，物件＋last，3 天內不出、⛔ 不刪）／「⏭ 跳過」／「今天先不要」（今天兩種都不出，⛔ 不擋後面的遭遇）
   內容：Toolbox.data()（私人空間 toolbox/content.js，沒登入就不出題、不擋路）
   ============================================================ */
(function(){
if(!window.Toolbox) return;
var C=null, ITEMS=null, GAP=[1,3,7,21], CAP={cloze:4, flash:8};
function LS(k,d){ try{ var v=JSON.parse(localStorage.getItem(k)); return v==null?d:v; }catch(e){ return d; } }
function LSset(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
function sod(t){ var d=new Date(t); d.setHours(0,0,0,0); return d.getTime(); }
function dayKey(){ return new Date().toDateString(); }
function norm(s){ return String(s).toLowerCase().replace(/[’]/g,"'").normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[.,!?;:«»"…]/g,'').replace(/\s+/g,' ').trim(); }
function normAcc(s){ return String(s).toLowerCase().replace(/[’]/g,"'").replace(/[.,!?;:«»"…]/g,'').replace(/\s+/g,' ').trim(); }

/* 從句型字串拆出可以挖的片段：「cependant / toutefois / néanmoins」→ 三個；「Bien que + 虛擬式」→ Bien que；「non seulement… mais aussi…」→ non seulement */
function pieces(p){
  return String(p).split(/\s*\/\s*|…|\s\+\s|\(|\)|；|;/).map(function(x){ return x.replace(/\b(qn|qch)\b/g,'').replace(/[A-Za-zÀ-ÿ]*[一-鿿].*$/,'').replace(/\s+/g,' ').trim(); })
    .filter(function(x){ return x.length>=2 && /[a-zà-ÿ]/i.test(x); });
}
/* 自動挖空挖不好的（動詞有變位、片段太短或會切到字中間）→ 指定要挖哪一塊；⭐ 動詞搭配挖「變位後的動詞」（11-25 Owen：關鍵動詞要多出） */
var CLOZE_FIX={'permettre à qn de + 原形':'permet','contribuer à + 原形／名詞':'contribuent','avoir une influence / un impact sur…':'a un impact','jouer un rôle important dans…':'joue un rôle important',
  'empêcher qn de + 原形':'empêchent','profiter de…':'profiter','offrir qch à qn':'offrir','chercher à / essayer de + 原形':'cherchent à','décider de + 原形':'décident de','participer à…':'participer',
  'C’est… qui…':'qui','C’est… que…':'que','l’un(e) des meilleur(e)s…':'l’une des meilleures','en + 現在分詞（-ant）':'En faisant','Je voudrais souligner l’importance de…':'Je voudrais','nuire à…':'nuire'};
function wordAt(ex, p){ var lo=ex.toLowerCase(), q=p.toLowerCase(), i=-1, from=0;
  while((i=lo.indexOf(q, from))>=0){ var b=lo.charAt(i-1), e=lo.charAt(i+q.length); if(!/[a-zà-ÿœ]/.test(b) && !/[a-zà-ÿœ]/.test(e)) return i; from=i+1; } return -1; }
function build(){
  ITEMS=[];
  C.cats.forEach(function(c){ if(c.id==='vie') return;   /* 天氣、祝福太基本（memory feedback_skip_too_basic_items） */
    c.items.forEach(function(x){
      var key=x[1], base={key:key, cat:c, zh:x[0], fr:x[1], ex:x[2], exzh:x[3], note:x[5]};
      ITEMS.push(Object.assign({type:'flash', id:'f:'+key}, base));
      if(!x[2]) return;
      var P=pieces(x[1]), hit=null, fx=CLOZE_FIX[x[1]];
      if(fx){ var fi=wordAt(x[2], fx); if(fi>=0) hit={p:fx, i:fi}; }
      else P.slice().sort(function(a,b){ return b.length-a.length; }).forEach(function(p){ if(hit) return; var i=wordAt(x[2], p); if(i<0) i=wordAt(x[2], p.replace(/’/g,"'")); if(i>=0) hit={p:p, i:i}; });
      if(!hit) return;
      var ans=x[2].substr(hit.i, hit.p.length), alts=fx?[]:P.filter(function(p){ return x[1].split('/').some(function(seg){ return seg.indexOf(p)>=0 && seg.indexOf(hit.p)<0; }) && p.split(' ').length<=3 && x[1].indexOf(' / ')>=0; });
      ITEMS.push(Object.assign({type:'cloze', id:'c:'+key, ans:ans, alts:alts, before:x[2].slice(0,hit.i), after:x[2].slice(hit.i+hit.p.length)}, base));
    }); });
}
function ready(){ return !!ITEMS; }
function preload(){ if(C) return; Toolbox.data().then(function(c){ C=c; build(); }).catch(function(){}); }

function pick(type){
  var srs=LS('clb7_toolbox_srs',{}), kn=LS('clb7_toolbox_known',{}), use=LS('clb7_toolbox_use',{}), now=Date.now();
  var L=ITEMS.filter(function(it){ return it.type===type; });
  var due=L.filter(function(it){ var r=srs[it.id]; return r && r.due<=now; });
  if(due.length){ var dv=due.filter(function(it){ return it.cat.id==='effet'; }); if(dv.length && Math.random()<.5) return dv[Math.floor(Math.random()*dv.length)]; return due[Math.floor(Math.random()*due.length)]; }
  var best=null, bw=-1;
  L.forEach(function(it){ var r=srs[it.id], k=kn[it.id], u=use['p:'+it.fr], w=1;
    if(r) return;                                         /* 見過的交給回收排程 */
    if(k && now-k.last<3*86400000) return;
    if(u && u.pick>u.used) w*=3;                          /* 挑過、但還沒用出來 */
    if(it.cat.id==='effet') w*=3;                          /* 11-25 Owen：「讓關鍵動詞的出現比例提升」→ 動詞搭配（permettre à qn de、contribuer à、nuire à…）多出 */
    w*=Math.random()+.2; if(w>bw){ bw=w; best=it; } });
  return best;
}
function grade(it, ok){
  var srs=LS('clb7_toolbox_srs',{}), r=srs[it.id]||{step:-1, n:0}, now=Date.now();
  r.n++; r.last=now;
  if(ok){ r.step=Math.min(r.step+1, GAP.length-1); } else r.step=0;
  r.due=sod(now)+GAP[Math.max(0,r.step)]*86400000; srs[it.id]=r; LSset('clb7_toolbox_srs', srs);
}
function known(it){ var kn=LS('clb7_toolbox_known',{}), r=kn[it.id]||{n:0}; r.n++; r.last=Date.now(); kn[it.id]=r; LSset('clb7_toolbox_known', kn); }
function dayCount(type){ var d=LS('clb7_toolbox_day',{}); if(d.d!==dayKey()) d={d:dayKey(), cloze:0, flash:0, off:0}; return d; }
function dayBump(type){ var d=dayCount(); d[type]=(d[type]||0)+1; LSset('clb7_toolbox_day', d); }
function dayOff(){ var d=dayCount(); d.off=1; LSset('clb7_toolbox_day', d); }

function tail(cont, it, extra){
  return '<div class="row2"><button class="btn ghost" id="tbKnow">會了</button><button class="btn ghost" id="tbSkip">⏭ 跳過</button><button class="btn ghost" id="tbOff">今天先不要</button></div>';
}
function wireTail(cont, it, kind){
  document.getElementById('tbKnow').onclick=function(){ known(it); if(window.GameLog) GameLog.answer(null,{kind:kind, ref:'tb:'+it.id}); cont(); };
  document.getElementById('tbSkip').onclick=function(){ if(window.GameLog) GameLog.answer(null,{kind:kind, ref:'tb:'+it.id}); cont(); };
  document.getElementById('tbOff').onclick=function(){ dayOff(); toast('🧰 今天先不出句型題了'); cont(); };
}
function upLine(it){ var m=Toolbox.upMove && Toolbox.upMove(it.fr); return m?'<div class="muted" style="font-size:.8em">🔧 升級工坊也有這招：'+esc(m)+'</div>':''; }
function explain(it){ return '<div class="clue fr">'+esc(it.fr)+' '+spk(it.fr)+'</div>'+(it.ex?'<div class="muted fr">'+esc(it.ex)+' '+spk(it.ex)+'</div><div class="muted">'+esc(it.exzh||'')+'</div>':'')+
  (it.note?'<div class="ex-rule">💡 '+esc(it.note)+'</div>':'')+upLine(it); }

/* ① 填空 */
function cloze(it, cont){
  var t0=Date.now(), fin=false, kind='🧰 句型填空';
  openSheet('<h3>🧰 這句少了什麼？ <small>'+it.cat.em+' '+esc(it.cat.name)+'</small></h3>'+
    '<div class="story">想表達：<b>'+esc(it.zh)+'</b></div>'+
    '<div class="qtext fr" style="line-height:1.7">'+esc(it.before)+'<span style="display:inline-block;min-width:4em;border-bottom:2px solid #f0c95a">　</span>'+esc(it.after)+'</div>'+
    '<div class="muted">'+esc(it.exzh||'')+(it.cat.id==='effet'?'<br>💡 動詞要照主詞變位':'')+'</div>'+
    '<input class="fill" id="tbIn" lang="fr" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="打出空格裡的字">'+
    '<div class="fb" id="tbFb"></div><div class="row2"><button class="btn ghost" id="tbIdk">想不到，看答案</button><span id="tbSlot"><button class="btn main" id="tbGo">對答案</button></span></div>'+tail(cont,it), true);
  var inp=document.getElementById('tbIn'); setTimeout(function(){ inp.focus(); },60);
  inp.addEventListener('keydown', function(e){ e.stopPropagation(); if(e.key==='Enter') check(false); });
  function check(idk){ if(fin) return; var v=inp.value.trim(); if(!v && !idk) return; fin=true;
    var ok=!idk && (norm(v)===norm(it.ans) || it.alts.some(function(a){ return norm(a)===norm(v); })), acc=ok && normAcc(v)!==normAcc(it.ans) && !it.alts.some(function(a){ return normAcc(a)===normAcc(v); });
    grade(it, ok); dayBump('cloze');
    if(window.GameLog) GameLog.answer(ok, {kind:kind, topic:'toolbox-'+it.cat.id, ref:'tb:'+it.id, ms:Date.now()-t0, q:it.before+'___'+it.after, a:it.ans, pick:v});
    if(ok){ S.gold=(S.gold||0)+1; save(); }
    speak(it.ex);
    document.getElementById('tbFb').innerHTML=(ok?'✓ '+(acc?'對了（注意重音：<b class="fr">'+esc(it.ans)+'</b>）':'對了'):'👉 答案：<b class="fr">'+esc(it.ans)+'</b>'+(it.alts.length?'（也可以：'+it.alts.map(esc).join('、')+'）':''))+explain(it)+
      (ok?'':'<div class="muted" style="font-size:.8em">🔁 明天會再出一次</div>');
    document.getElementById('tbSlot').innerHTML='<button class="btn main" id="tbNext">繼續</button>'; document.getElementById('tbNext').onclick=cont;
    document.getElementById('tbIdk').style.visibility='hidden'; }
  document.getElementById('tbGo').onclick=function(){ check(false); };
  document.getElementById('tbIdk').onclick=function(){ check(true); };
  wireTail(cont, it, kind);
}
/* ② 反射卡 */
function flash(it, cont){
  var t0=Date.now(), kind='🧰 句型反射';
  openSheet('<h3>🧰 你會怎麼說？ <small>'+it.cat.em+' '+esc(it.cat.name)+'</small></h3>'+
    '<div class="story" style="font-size:1.25em;text-align:center">「'+esc(it.zh)+'」</div>'+
    '<div class="muted" style="text-align:center">先用法文講出來（講出聲音最好），再翻牌。</div>'+
    '<div class="fb" id="tbFb"></div><div class="row2"><span></span><span id="tbSlot"><button class="btn main" id="tbFlip">翻牌</button></span></div>'+tail(cont,it), true);
  document.getElementById('tbFlip').onclick=function(){ var ms=Date.now()-t0; speak(it.fr);
    document.getElementById('tbFb').innerHTML=explain(it);
    document.getElementById('tbSlot').innerHTML='<button class="btn ghost" data-r="0">想不到</button> <button class="btn ghost" data-r="1">差一點</button> <button class="btn main" data-r="2">講出來了</button>';
    sheet.querySelectorAll('[data-r]').forEach(function(b){ b.onclick=function(){ var r=+b.dataset.r, ok=r===2;
      grade(it, ok); dayBump('flash'); if(ok){ S.gold=(S.gold||0)+1; save(); }
      if(window.GameLog) GameLog.answer(r===1?false:ok, {kind:kind, topic:'toolbox-'+it.cat.id, ref:'tb:'+it.id, ms:ms, q:it.zh, a:it.fr, pick:['想不到','差一點','講出來了'][r]});
      cont(); }; }); };
  wireTail(cont, it, kind);
}
/* 路上的入口：回傳 true＝這次被句型題叫住了（之後會呼叫 cont 繼續原本的遭遇） */
function serve(cont){
  if(!ready()){ preload(); return false; }
  var d=dayCount(); if(d.off) return false;
  if(Math.random()>.22) return false;
  var types=['cloze','flash'].filter(function(t){ return (d[t]||0)<CAP[t]; }); if(!types.length) return false;
  var type= types.length===2 ? (Math.random()<.35?'cloze':'flash') : types[0], it=pick(type); if(!it) return false;
  toast(type==='cloze'?'🧰 有一句話少了一塊':'🧰 這句法文怎麼說？');
  if(type==='cloze') cloze(it, cont); else flash(it, cont); return true;
}
window.ToolQ={serve:serve, preload:preload, _items:function(){ return ITEMS; }, _cloze:cloze, _flash:flash};
setTimeout(preload, 3000);
})();
