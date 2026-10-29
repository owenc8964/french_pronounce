// 驗收 drafts/isle_AC7.js：key 對齊、陸地、相鄰距離、區、links、node --check
const fs=require('fs'), path=require('path'), cp=require('child_process');
const root=path.join(__dirname,'..'), draftF=path.join(root,'drafts/isle_AC7.js');
const sc=require(draftF);
const html=fs.readFileSync(path.join(root,'town.html'),'utf8');
const grab=n=>{ const i=html.indexOf('function '+n+'('); let d=0,j=html.indexOf('{',i); for(;j<html.length;j++){ if(html[j]=='{')d++; else if(html[j]=='}'){ d--; if(!d) break; } } return html.slice(i,j+1); };
eval(grab('isleSplit')); eval(grab('isleField'));
global.window={}; let src=fs.readFileSync(path.join(root,'answer_cards.js'),'utf8').replace(/^\s*(const|let) /mg,'var ');
eval(src); var ISLES=null; eval(grab('isles'));
const I=isles().find(x=>x.id==='AC7'), keys=I.sents.map(s=>s.key);
let ok=true; const bad=m=>{ ok=false; console.log('✗ '+m); };
console.log('站數',keys.length);
keys.forEach(k=>{ if(!sc.marks[k]) bad('缺 mark '+k); });
Object.keys(sc.marks).forEach(k=>{ if(!keys.includes(k)) bad('多餘 mark '+k); });
const land=(x,y)=>{ const f=isleField(sc,x,y), t=isleField(sc,Math.floor(x)+.5,Math.floor(y)+.5); return {f,t}; };
let minF=9;
keys.forEach(k=>{ const [x,y]=sc.marks[k][3], L=land(x,y); minF=Math.min(minF,L.f); if(!(L.f>0)) bad('mark '+k+' 不在陸地 f='+L.f.toFixed(2)); if(!(L.t>0)) bad('mark '+k+' 所在格不是陸地 '+L.t.toFixed(2)); if(x<0||y<0||x>sc.W||y>sc.H) bad('超出 W/H '+k); });
sc.path.forEach((p,i)=>{ const L=land(p[0],p[1]); minF=Math.min(minF,L.f); if(!(L.f>0)||!(L.t>0)) bad('path['+i+'] 不在陸地 '+L.f.toFixed(2)+'/'+L.t.toFixed(2)); });
[['board',sc.board.x,sc.board.y],['tablet',sc.tablet.x,sc.tablet.y]].forEach(([n,x,y])=>{ if(!(land(x,y).t>0)) bad(n+' 不在陸地'); });
console.log('最小 f（地標＋步道）', minF.toFixed(3));
const d=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]); let minAdj=99, minAll=99;
for(let i=0;i+1<keys.length;i++){ const v=d(sc.marks[keys[i]][3],sc.marks[keys[i+1]][3]); minAdj=Math.min(minAdj,v); if(v<2.2) bad('相鄰太近 '+keys[i]+'–'+keys[i+1]+' '+v.toFixed(2)); }
for(let i=0;i<keys.length;i++) for(let j=i+1;j<keys.length;j++){ const v=d(sc.marks[keys[i]][3],sc.marks[keys[j]][3]); if(v<minAll) minAll=v; if(v<2.2) bad('任兩站太近 '+keys[i]+'–'+keys[j]+' '+v.toFixed(2)); }
console.log('相鄰最小距離',minAdj.toFixed(2),'任兩站最小距離',minAll.toFixed(2));
// 每站所在區：照原文段落
const paraOf={}; let k=0; const v=I && require(draftF) && null;
global.ANSWER_CARDS = typeof ANSWER_CARDS!=='undefined'?ANSWER_CARDS:window.ANSWER_CARDS;
const card=ANSWER_CARDS.find(c=>c.id==='AC7'), fp=card.versions[card.versions.length-1].fr.split(/\n\s*\n/);
let n=0; fp.forEach((p,pi)=>{ p.trim().split(/(?<=[.!?…])\s+(?=[A-ZÀ-Ý«])/).forEach(f=>{ if(!f.trim())return; n++; isleSplit(f.trim()).forEach((_,qi,arr)=>{ paraOf[arr.length>1?(n-1)+'.'+(qi+1):String(n-1)]=pi; }); }); });
const zoneOf=y=>sc.zones.findIndex(z=>y>=z.y0&&y<z.y1);
const perZone=sc.zones.map(()=>[]);
keys.forEach(k=>{ const z=zoneOf(sc.marks[k][3][1]); perZone[z]&&perZone[z].push(k); if(z!==paraOf[k]) bad('站 '+k+' 在區 '+z+' 但原文第 '+paraOf[k]+' 段'); });
sc.zones.forEach((z,i)=>console.log(' 區',z.name,perZone[i].length+'站',perZone[i].join(' ')));
if(sc.outline.length!==sc.zones.length) bad('outline 區數不符');
// 沿步道順序：每站投影到 path 的累計長度須遞增
const seg=[]; let acc=0; for(let i=0;i+1<sc.path.length;i++){ const a=sc.path[i],b=sc.path[i+1],l=d(a,b); seg.push([a,b,acc,l]); acc+=l; }
const proj=p=>{ let best=[1e9,0]; seg.forEach(([a,b,s,l])=>{ let t=((p[0]-a[0])*(b[0]-a[0])+(p[1]-a[1])*(b[1]-a[1]))/(l*l); t=Math.max(0,Math.min(1,t)); const q=[a[0]+t*(b[0]-a[0]),a[1]+t*(b[1]-a[1])], dd=d(p,q); if(dd<best[0]) best=[dd,s+t*l]; }); return best; };
let prev=-1, maxOff=0; keys.forEach(k=>{ const [dd,s]=proj(sc.marks[k][3]); if(process.env.DBG) console.log(k,s.toFixed(1),dd.toFixed(2)); maxOff=Math.max(maxOff,dd); if(s<=prev) bad('步道順序倒退 '+k); prev=s; });
console.log('步道總長',acc.toFixed(1),'地標離步道最遠',maxOff.toFixed(2));
// dock
if(!(sc.dock[1]>sc.marks[keys[0]][3][1] && sc.dock[2]<=sc.H)) bad('dock 不在下方');
// links
if(sc.links.length!==keys.length-1) bad('links 長度 '+sc.links.length+' ≠ '+(keys.length-1));
sc.links.forEach((l,i)=>{ const len=[...l].length; if(len>26) bad('link '+(i+1)+' 太長 '+len); if(/[a-zA-Zàâçéèêëîïôûùüœ]{3,}/.test(l)) bad('link '+(i+1)+' 像法文'); });
console.log('links',sc.links.length,'最長',Math.max(...sc.links.map(l=>[...l].length)),'字');
// 主圖重複
const used=new Set(); html.slice(html.indexOf('var ISLE_SCENES={'),html.indexOf('var ARCH_ICON')).replace(/'([^'\w\s]{1,12})','[^']*','[^']*',\[/g,(m,e)=>used.add(e));
const dup=keys.map(k=>sc.marks[k][0]).filter(e=>used.has(e)); console.log('主圖與 AC1/AC2 重複',dup.length?dup.join(' '):'無');
const self=keys.map(k=>sc.marks[k][0]); if(new Set(self).size!==self.length) bad('島內主圖重複');
try{ cp.execFileSync('node',['--check',draftF]); console.log('node --check 通過'); }catch(e){ bad('node --check 失敗'); }
console.log(ok?'✅ 全部通過':'❌ 有問題');
