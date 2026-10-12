/* story_reader.js — 故事書共用的翻頁程式（2026-10-12）
   從 y_en_story.html 抽出來，給所有「只用讀的故事」共用（y 與 en、être 之家、地點介系詞……）。
   用法：頁面先載入本檔，再寫 CH 陣列，最後呼叫 storyStart(CH, '這本書的讀到哪 key')。
   每一章：{ ch:'第一章', t:'標題', soul:'一句靈魂', body:'HTML', real:'📐 文法本身（有所本）', meta:'🎭 只是比喻' }
   ⭐ 規則（memory feedback_story_label_fact_vs_metaphor）：每章都要分開寫 real／meta，比喻不可以把規則講窄。
   ⛔ 例句一律取自筆記／課本／句庫；ex() 只負責排版，不負責內容來源。
   讀到哪的 key ⛔ 不用 clb7_ 開頭（只是這台裝置的方便，不需要同步）。 */
function ex(fr, zh, note){ return '<li><span class="fr">'+fr+'</span><span class="zh">'+zh+'</span>'+(note?'<span class="note">'+note+'</span>':'')+'</li>'; }

function storyStart(CH, POS_KEY){
  var cur=0;
  try{ var p=parseInt(localStorage.getItem(POS_KEY),10); if(p>=0&&p<CH.length) cur=p; }catch(e){}
  var q=new URLSearchParams(location.search).get('ch'); if(q!==null&&!isNaN(+q)&&+q>=0&&+q<CH.length) cur=+q;
  function render(){
    var c=CH[cur];
    document.getElementById('card').innerHTML='<div class="ch">'+c.ch+'</div><h2>'+c.t+'</h2><div class="soul">'+c.soul+'</div>'+c.body+
      ((c.real||c.meta)?'<div class="truth">'+(c.real?'<div><b>📐 文法本身（有所本）</b>　'+c.real+'</div>':'')+(c.meta?'<div><b>🎭 只是比喻</b>　'+c.meta+'</div>':'')+'</div>':'');
    document.getElementById('chips').innerHTML=CH.map(function(x,i){ return '<button class="'+(i===cur?'on':'')+'" data-i="'+i+'">'+x.ch+'</button>'; }).join('');
    document.getElementById('prev').disabled=(cur===0);
    var nx=document.getElementById('next'); nx.disabled=(cur===CH.length-1); nx.textContent=(cur===CH.length-1)?'讀完了':'下一章 →';
    try{ localStorage.setItem(POS_KEY,String(cur)); }catch(e){}
  }
  function go(i){ if(i<0||i>=CH.length) return; cur=i; render(); window.scrollTo({top:0,behavior:'smooth'}); }
  window.go=go;   /* 給測試與章內連結用 */
  document.getElementById('prev').addEventListener('click',function(){ go(cur-1); });
  document.getElementById('next').addEventListener('click',function(){ go(cur+1); });
  document.getElementById('chips').addEventListener('click',function(e){ var b=e.target.closest('button'); if(b) go(+b.dataset.i); });
  document.getElementById('card').addEventListener('click',function(e){
    var f=e.target.closest('.fr'); if(!f) return;
    if(window.TtsReader&&TtsReader.speak) TtsReader.speak(f.textContent);
  });
  render();
}
