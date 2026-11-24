/* ============================================================
   🧰 口說寫作工具箱（2026-11-24）
   Owen：「會不代表我用得出來，口說跟寫作還是要有一個地方好提取」→「照這個方向做」
   ・照「我想表達什麼」分類（開場、看法、因果、讓步、舉例…），先中文意圖、再法文句型、再一個例句；可以直接搜中文
   ・句型／詞彙／變位查詢三個分頁；變位用 verbs_full.js（已核對），⛔ 不用 Lucas 表裡的變位（錯很多）
   ・挑選模式：講之前／寫之前挑 1–3 個「這次要用」，講完寫完勾「有用到」→ clb7_toolbox_use（同步）
   ⛔ 內容（句型、詞彙）是 Lucas 學習資料＋寶典的衍生，只放 Supabase 私人空間 toolbox/content.js，登入（通行證）才讀得到
      本機原始檔 assets/tcf/toolbox/，改完跑 python3 tools/toolbox_build.py && python3 tools/upload_toolbox_supabase.py
   用法：Toolbox.open()；Toolbox.open({pick:true, max:3, onDone:function(list){…}})；Toolbox.markUsed(list, usedArray)
   這支檔案自己帶介面和樣式，不靠頁面（town.html、tcf_writing.html 都能用）
   ============================================================ */
(function(){
var V={ url:'https://hgkqyrglftljxaieberm.supabase.co', key:'sb_publishable_lPnh46F2Z2wj6qVs5nn56g_RwRpUO8_', bucket:'TCF', ls:'tcfvault_session' };
var C=null, st={tab:'pat', q:'', pick:null};
function esc(s){ return String(s==null?'':s).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
function say(t){ if(window.speak) return window.speak(t); try{ if(window.TtsReader&&TtsReader.supported) return TtsReader.speak(t); var u=new SpeechSynthesisUtterance(t); u.lang='fr-FR'; speechSynthesis.cancel(); speechSynthesis.speak(u); }catch(e){} }
function vault(path){
  var s=null; try{ s=JSON.parse(localStorage.getItem(V.ls)); }catch(e){}
  if(!s){ var e0=new Error('尚未登入'); e0.code='nologin'; return Promise.reject(e0); }
  var tokP = Date.now()<(s.expires_at||0)-60000 ? Promise.resolve(s.access_token) :
    fetch(V.url+'/auth/v1/token?grant_type=refresh_token',{method:'POST',headers:{apikey:V.key,'Content-Type':'application/json'},body:JSON.stringify({refresh_token:s.refresh_token})})
      .then(function(r){ return r.json().then(function(j){ if(!r.ok){ var er=new Error('登入過期'); er.code='expired'; throw er; }
        var n={access_token:j.access_token, refresh_token:j.refresh_token, expires_at:Date.now()+(j.expires_in||3600)*1000, email:(j.user&&j.user.email)||s.email};
        try{ localStorage.setItem(V.ls, JSON.stringify(n)); }catch(e){} return n.access_token; }); });
  return tokP.then(function(tok){ return fetch(V.url+'/storage/v1/object/authenticated/'+V.bucket+'/'+path,{headers:{apikey:V.key, Authorization:'Bearer '+tok}}); })
    .then(function(r){ if(!r.ok) throw new Error('HTTP '+r.status); return r.text(); });
}
function load(){ if(C) return Promise.resolve(C);
  return (Toolbox._src ? Toolbox._src() : vault('toolbox/content.js')).then(function(t){ new Function(t)(); C=window.TOOLBOX_CONTENT; if(!C) throw new Error('內容格式不對'); return C; }); }
function login(email, pw){
  return fetch(V.url+'/auth/v1/token?grant_type=password',{method:'POST',headers:{apikey:V.key,'Content-Type':'application/json'},body:JSON.stringify({email:email,password:pw})})
    .then(function(r){ return r.json().catch(function(){ return {}; }).then(function(j){ if(!r.ok) throw new Error(j.error_description||j.msg||'登入失敗');
      try{ localStorage.setItem(V.ls, JSON.stringify({access_token:j.access_token, refresh_token:j.refresh_token, expires_at:Date.now()+(j.expires_in||3600)*1000, email:(j.user&&j.user.email)||email})); }catch(e){} }); });
}
function useRec(){ try{ return JSON.parse(localStorage.getItem('clb7_toolbox_use'))||{}; }catch(e){ return {}; } }
function useSave(o){ try{ localStorage.setItem('clb7_toolbox_use', JSON.stringify(o)); }catch(e){} }

var css=document.createElement('style');
css.textContent='#tbx{position:fixed;inset:0;z-index:2147483000;background:rgba(8,12,18,.6);display:flex;justify-content:center;align-items:stretch;font-family:-apple-system,"PingFang TC",system-ui,sans-serif}'+
'#tbx .bx{background:#141a24;color:#e8e4d8;width:min(720px,100%);display:flex;flex-direction:column;max-height:100%}'+
'#tbx .hd{padding:10px 12px calc(8px) ;border-bottom:1px solid #2b3446;display:grid;gap:8px;padding-top:calc(env(safe-area-inset-top) + 10px)}'+
'#tbx .t1{display:flex;align-items:center;gap:8px} #tbx .t1 b{flex:1;font-size:1.05em;color:#ffe9a8}'+
'#tbx button{font:inherit;color:inherit;background:#222b3a;border:1px solid #3a465c;border-radius:8px;padding:5px 10px;cursor:pointer}'+
'#tbx button.on{background:#f0c95a;color:#1b1406;border-color:#f0c95a} #tbx button.main{background:#2f7d4f;border-color:#2f7d4f;color:#fff}'+
'#tbx input{font:inherit;background:#0e131b;color:#fff;border:1px solid #3a465c;border-radius:8px;padding:8px 10px;width:100%;box-sizing:border-box}'+
'#tbx .tabs{display:flex;gap:6px} #tbx .tabs button{flex:1}'+
'#tbx .bd{overflow:auto;padding:6px 12px calc(env(safe-area-inset-bottom) + 20px);-webkit-overflow-scrolling:touch}'+
'#tbx details{border:1px solid #2b3446;border-radius:10px;margin:7px 0;background:#18202c} #tbx summary{padding:9px 11px;cursor:pointer;font-weight:600}'+
'#tbx .it{padding:9px 11px;border-top:1px solid #232c3b} #tbx .zh{color:#cfd6e4;font-size:.9em} #tbx .fr{color:#ffe9a8;font-size:1.06em;margin:2px 0}'+
'#tbx .ex{color:#aeb7c6;font-size:.85em;margin-top:3px} #tbx .nt{color:#8d97a8;font-size:.76em;margin-top:3px} #tbx .src{font-size:.7em;color:#6f7a8c;margin-left:4px}'+
'#tbx .row{display:flex;gap:6px;align-items:center;flex-wrap:wrap;margin-top:4px} #tbx .sp{background:none;border:none;padding:0 4px;font-size:1em}'+
'#tbx .vw{display:grid;grid-template-columns:1fr 1fr;gap:4px 10px;padding:8px 11px} #tbx .vw div{font-size:.92em} #tbx .vw b{color:#ffe9a8;font-weight:500}'+
'#tbx table{border-collapse:collapse;width:100%;font-size:.9em;margin:6px 0} #tbx td{border-top:1px solid #2b3446;padding:4px 6px;vertical-align:top} #tbx td:first-child{color:#aeb7c6;white-space:nowrap}'+
'#tbx .chips{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0} #tbx .muted{color:#8d97a8;font-size:.85em}'+
'#tbx .pk{position:sticky;bottom:0;background:#141a24;border-top:1px solid #2b3446;padding:8px 12px calc(env(safe-area-inset-bottom) + 8px);display:flex;gap:8px;align-items:center} #tbx .pk span{flex:1;font-size:.85em}';
document.head.appendChild(css);

function itemKey(fr){ return 'p:'+fr; }
function isPicked(fr){ return st.pick && st.pick.list.some(function(x){ return x.fr===fr; }); }
function pickBtn(fr, zh){ if(!st.pick) return ''; return '<button data-pk="'+esc(fr)+'" data-zh="'+esc(zh)+'" class="'+(isPicked(fr)?'on':'')+'">'+(isPicked(fr)?'✓ 這次用':'＋ 這次用')+'</button>'; }
function match(q, arr){ if(!q) return true; q=q.toLowerCase(); return arr.some(function(s){ return String(s||'').toLowerCase().indexOf(q)>=0; }); }

function paintPat(){
  var q=st.q, h='';
  C.cats.forEach(function(c){
    var its=c.items.filter(function(x){ return match(q,[x[0],x[1],x[2],x[3]]); }); if(!its.length) return;
    h+='<details'+(q?' open':'')+'><summary>'+c.em+' '+esc(c.name)+' <span class="muted">'+its.length+'</span></summary>'+its.map(function(x){
      return '<div class="it"><div class="zh">'+esc(x[0])+'<span class="src">'+({L:'Lucas',B:'寶典',B2:'寶典 2'}[x[4]]||'')+'</span></div><div class="fr">'+esc(x[1])+' <button class="sp" data-say="'+esc(x[1])+'">🔊</button></div>'+
        (x[2]?'<div class="ex">例：'+esc(x[2])+' <button class="sp" data-say="'+esc(x[2])+'">🔊</button>'+(x[3]?'<br>'+esc(x[3]):'')+'</div>':'')+
        (x[5]?'<div class="nt">✏️ '+esc(x[5])+'</div>':'')+(st.pick?'<div class="row">'+pickBtn(x[1], x[0])+'</div>':'')+'</div>'; }).join('')+'</details>'; });
  return h||'<p class="muted">找不到「'+esc(q)+'」。試試中文意圖，例如：雖然、因為、例如、越來越。</p>';
}
function paintVoc(){
  var q=st.q, h='';
  C.vocab.forEach(function(g){ var w=g.w.filter(function(x){ return match(q,[x.fr,x.zh]); }); if(!w.length) return;
    h+='<details'+(q?' open':'')+'><summary>'+esc(g.name)+' <span class="muted">'+w.length+'</span></summary><div class="vw">'+w.map(function(x){
      return '<div><b>'+esc(x.fr)+'</b> <button class="sp" data-say="'+esc(x.fr.split(' /')[0])+'">🔊</button><br><span class="muted">'+esc(x.pos)+'</span> '+esc(x.zh)+(st.pick?'<div>'+pickBtn(x.fr, x.zh)+'</div>':'')+'</div>'; }).join('')+'</div></details>'; });
  return (h||'<p class="muted">找不到「'+esc(q)+'」。</p>')+'<p class="muted">詞彙來自 Lucas「高階詞彙」（字典屋裡也有，在這裡是讓你講和寫的時候好找）。</p>';
}
var TENSES=['present','passe-compose','imparfait','futur-simple','conditionnel','subjonctif'];
function vfind(inf){ inf=String(inf).trim().toLowerCase().replace(/^(se |s’|s')/,''); return (typeof VERBS_FULL!=='undefined'?VERBS_FULL:[]).filter(function(v){ return v.inf===inf; })[0]; }
function paintVerb(){
  if(typeof VERBS_FULL==='undefined'){ var s=document.createElement('script'); s.src='verbs_full.js'; s.onload=paint; document.head.appendChild(s); return '<p class="muted">載入變位資料…</p>'; }
  var q=st.q.trim(), v=q&&vfind(q), h='<div class="muted">打動詞原形，或點下面 Lucas 列的常用動詞。變位是系統核對過的變位總覽資料。</div><div class="chips">'+
    C.verbs.map(function(x){ var ok=!!vfind(x); return '<button data-vb="'+esc(x)+'" style="'+(ok?'':'opacity:.45')+'">'+esc(x)+'</button>'; }).join('')+'</div>';
  if(q && !v) h+='<p class="muted">「'+esc(q)+'」變位總覽還沒有這個動詞（灰色的那些也是）。</p>';
  if(v){ var P=['je','tu','il/elle','nous','vous','ils/elles'];
    h+='<div class="fr" style="font-size:1.2em">'+esc(v.inf)+' <button class="sp" data-say="'+esc(v.inf)+'">🔊</button> <span class="muted">過去分詞 '+esc(v.pp)+'・助動詞 '+esc(v.aux)+'</span></div>';
    conjugate(v).filter(function(t){ return TENSES.indexOf(t.id)>=0; }).forEach(function(t){
      h+='<details'+(t.id==='present'?' open':'')+'><summary>'+esc(t.name)+' <span class="muted">'+esc(t.fr)+'</span></summary><table>'+t.forms.map(function(f,i){ return f==null?'':'<tr><td>'+(t.pre?(i===2||i===5?'qu’':'que '):'')+P[i]+'</td><td class="fr">'+esc(f)+'</td></tr>'; }).join('')+'</table><div class="nt" style="padding:0 11px 8px">'+esc(t.how)+'</div></details>'; }); }
  return h;
}
function paint(){
  var o=document.getElementById('tbx'); if(!o) return;
  var body=document.getElementById('tbxBd');
  if(!C){ body.innerHTML='<p class="muted">載入中…</p>'; return; }
  body.innerHTML= st.tab==='pat'?paintPat() : st.tab==='voc'?paintVoc() : paintVerb();
  o.querySelectorAll('.tabs button').forEach(function(b){ b.classList.toggle('on', b.dataset.tab===st.tab); });
  var pk=document.getElementById('tbxPk'); if(pk){ pk.querySelector('span').textContent= st.pick.list.length ? '這次要用：'+st.pick.list.map(function(x){ return x.fr; }).join('　／　') : '點「＋ 這次用」挑 1–'+st.pick.max+' 個，講或寫的時候會一直顯示'; }
}
function shell(){
  var o=document.createElement('div'); o.id='tbx';
  o.innerHTML='<div class="bx"><div class="hd"><div class="t1"><b>🧰 口說寫作工具箱</b><button id="tbxX">關閉</button></div>'+
    '<input id="tbxQ" placeholder="想表達什麼？打中文或法文，例如：雖然、因為、例如、impact" autocomplete="off" autocapitalize="off" spellcheck="false">'+
    '<div class="tabs"><button data-tab="pat">句型</button><button data-tab="voc">詞彙</button><button data-tab="verb">變位</button></div></div>'+
    '<div class="bd" id="tbxBd"></div>'+(st.pick?'<div class="pk" id="tbxPk"><span></span><button class="main" id="tbxOk">好了</button></div>':'')+'</div>';
  document.body.appendChild(o);
  o.addEventListener('keydown', function(e){ e.stopPropagation(); });
  o.addEventListener('click', function(e){ var b=e.target.closest('button'); if(e.target===o) return close(); if(!b) return; e.stopPropagation();
    if(b.id==='tbxX') return close();
    if(b.id==='tbxOk'){ var P=st.pick; close(); if(P.onDone) P.onDone(P.list.slice()); return; }
    if(b.dataset.tab){ st.tab=b.dataset.tab; return paint(); }
    if(b.dataset.say) return say(b.dataset.say);
    if(b.dataset.vb){ st.q=b.dataset.vb; document.getElementById('tbxQ').value=st.q; return paint(); }
    if(b.dataset.pk!=null){ var L=st.pick.list, fr=b.dataset.pk, i=-1; L.forEach(function(x,k){ if(x.fr===fr) i=k; });
      if(i>=0) L.splice(i,1); else { if(L.length>=st.pick.max) L.shift(); L.push({fr:fr, zh:b.dataset.zh}); } return paint(); }
    if(b.id==='tbxGo'){ var m=document.getElementById('tbxMsg'); m.textContent='登入中…'; login(document.getElementById('tbxE').value.trim(), document.getElementById('tbxP').value).then(function(){ m.textContent='✓ 接上了'; start(); }).catch(function(er){ m.textContent='✗ '+er.message; }); }
  });
  document.getElementById('tbxQ').addEventListener('input', function(){ st.q=this.value; paint(); });
}
function close(){ var o=document.getElementById('tbx'); if(o) o.remove(); }
function start(){
  paint();
  load().then(paint).catch(function(e){ var body=document.getElementById('tbxBd'); if(!body) return; var c=e&&e.code;
    body.innerHTML= c==='nologin'||c==='expired' ?
      '<p>工具箱的內容放在私人空間，要先登入（通行證＝考試之塔那組帳號）。</p><div style="display:grid;gap:6px"><input id="tbxE" type="email" placeholder="Email" autocomplete="username"><input id="tbxP" type="password" placeholder="密碼" autocomplete="current-password"><button class="main" id="tbxGo">登入</button><div class="muted" id="tbxMsg"></div></div>' :
      '<p class="muted">載不下來（網路？'+esc(e&&e.message||'')+'）。</p>'; });
}
window.Toolbox={
  open:function(opt){ opt=opt||{}; close(); st.q=''; st.tab=opt.tab||'pat';
    st.pick= opt.pick ? {max:opt.max||3, list:(opt.list||[]).slice(), onDone:opt.onDone} : null;
    shell(); start(); },
  /* 講完／寫完：list＝挑過的，used＝同樣長度的 true/false */
  markUsed:function(list, used){ var o=useRec(), now=Date.now(); list.forEach(function(x,i){ var k=itemKey(x.fr), r=o[k]||{pick:0, used:0}; r.pick++; if(used&&used[i]) r.used++; r.last=now; o[k]=r; }); useSave(o); },
  chips:function(list){ return list.map(function(x){ return '<div style="margin:3px 0"><span style="color:#ffe9a8">'+esc(x.fr)+'</span> <span style="opacity:.7;font-size:.85em">'+esc(x.zh)+'</span></div>'; }).join(''); }
};
})();
