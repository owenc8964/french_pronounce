/* Q32 口說群島素材盤點：用 town.html 的 isleSplit 同一套切句，列出 AC2–AC15 的片段數（唯讀，不改任何資料） */
const fs=require('fs'), path=require('path');
const src=fs.readFileSync(path.join(__dirname,'..','answer_cards.js'),'utf8');
const ANSWER_CARDS=new Function(src+';return ANSWER_CARDS;')();
function isleSplit(f){
  var n=function(t){ return t.trim().split(/\s+/).length; };
  if(n(f)<=12) return [f];
  var cuts=[], re=/( : | — | ; |, (?=(?:mais|et|parce|donc|alors|car|quand|puis|sinon|ou|pour|comme|si|même|surtout)\b)|, )/g, m;
  while((m=re.exec(f))){ var a=f.slice(0,m.index+m[0].replace(/\s+$/,'').length).trim(), b=f.slice(m.index+m[0].length).trim();
    if(n(a)>=3 && n(b)>=3) cuts.push({a:a, b:b, score:Math.abs(n(a)-n(b))+(/^, $/.test(m[0])?2:0)}); }
  if(!cuts.length) return [f];
  cuts.sort(function(x,y){ return x.score-y.score; });
  return isleSplit(cuts[0].a).concat(isleSplit(cuts[0].b));
}
ANSWER_CARDS.forEach(c=>{
  if(c.id==='AC1') return;
  var v=c.versions[c.versions.length-1];
  console.log('\n#### '+c.id+' '+c.title+' | versions: '+c.versions.map(x=>x.level+'@'+x.d).join(', ')+' | source_zh: '+(c.source_zh?c.source_zh.length+'字':'無')+' | follow_ups: '+(c.follow_ups?c.follow_ups.length:0)+' | keys: '+Object.keys(c).join(','));
  console.log('q_zh: '+c.q_zh);
  var fp=String(v.fr).split(/\n\s*\n/), zp=String(v.zh).split(/\n\s*\n/), k=0, segs=0;
  console.log('段落數 '+fp.length+'；法文字數 '+v.fr.trim().split(/\s+/).length);
  fp.forEach((p,i)=>{ var fsn=p.trim().split(/(?<=[.!?…])\s+(?=[A-ZÀ-Ý«])/);
    console.log(' 【段'+(i+1)+'】zh: '+String(zp[i]||'').trim());
    fsn.forEach(f=>{ if(!f.trim()) return; var parts=isleSplit(f.trim()); parts.forEach((pt,pi)=>{ segs++; console.log('   '+(parts.length>1?k+'.'+(pi+1):k)+' | '+pt); }); k++; }); });
  console.log(' => 句 '+k+'，切段後 '+segs);
  if(c.source_zh) console.log(' source_zh 段名: '+(c.source_zh.match(/【[^】]+】/g)||[]).join(''));
});
