/* 檢查 drafts/isle_AC3.js：key 對應、陸地、距離、區、links（isleField／isleSplit／isles 從 town.html 原樣抽出） */
const fs=require('fs'), path=require('path'), R=path.join(__dirname,'..');
const html=fs.readFileSync(path.join(R,'town.html'),'utf8');
const grab=n=>{ const i=html.indexOf('function '+n+'('); let d=0,j=html.indexOf('{',i); for(;j<html.length;j++){ if(html[j]=='{')d++; else if(html[j]=='}'&&--d==0) break; } return html.slice(i,j+1); };
eval(fs.readFileSync(path.join(R,'answer_cards.js'),'utf8').replace(/^\s*(const|let) /mg,'var '));
var ISLES=null; eval(grab('isleField')+grab('isleSplit')+grab('isles'));
const sc=require(path.join(R,'drafts/isle_AC3.js')), I=isles().find(x=>x.id=='AC3');
let bad=0; const ok=(c,m)=>{ if(!c){bad++; console.log('✗ '+m);} };
const keys=I.sents.map(s=>s.key), mk=Object.keys(sc.marks);
console.log('段數',keys.length,'marks',mk.length); ok(keys.every(k=>sc.marks[k]),'缺 mark: '+keys.filter(k=>!sc.marks[k])); ok(mk.every(k=>keys.includes(k)),'多的 mark: '+mk.filter(k=>!keys.includes(k)));
const zoneOf=y=>sc.zones.findIndex(z=>y>=z.y0&&y<z.y1);
// 區＝原文段落序號（看 versions 最後一版 fr 的空行分段，按 key 主號歸段）
const v=ANSWER_CARDS.find(c=>c.id=='AC3').versions.slice(-1)[0]; let cnt=0; const para={};
String(v.fr).split(/\n\s*\n/).forEach((p,i)=>p.trim().split(/(?<=[.!?…])\s+(?=[A-ZÀ-Ý«])/).filter(x=>x.trim()).forEach(()=>{ para[cnt++]=i; }));
// 步道累積長度，算每站投影位置（檢查沿步道順序）
const P=sc.path; const proj=(x,y)=>{ let best=1e9,at=0,acc=0; for(let i=0;i<P.length-1;i++){ const [ax,ay]=P[i],[bx,by]=P[i+1],L=Math.hypot(bx-ax,by-ay); let t=((x-ax)*(bx-ax)+(y-ay)*(by-ay))/(L*L); t=Math.max(0,Math.min(1,t)); const d=Math.hypot(ax+t*(bx-ax)-x,ay+t*(by-ay)-y); if(d<best){best=d;at=acc+t*L;} acc+=L; } return [at,best]; };
let prev=-1, minD=1e9;
keys.forEach((k,i)=>{ const m=sc.marks[k]; if(!m) return; const [x,y]=m[3], f=isleField(sc,x,y), z=zoneOf(y), want=para[parseInt(k)], [at,off]=proj(x,y);
  let near=Infinity; keys.forEach((k2,j)=>{ if(j!==i&&sc.marks[k2]) near=Math.min(near,Math.hypot(sc.marks[k2][3][0]-x,sc.marks[k2][3][1]-y)); }); minD=Math.min(minD,near);
  const dn= i<keys.length-1&&sc.marks[keys[i+1]] ? Math.hypot(sc.marks[keys[i+1]][3][0]-x,sc.marks[keys[i+1]][3][1]-y).toFixed(2) : '—';
  console.log(`${String(i+1).padStart(2)} ${k.padEnd(4)} ${m[0]}${m[1]} ${m[2].padEnd(9,'　')} (${x},${y}) f=${f.toFixed(2)} 區=${sc.zones[z]?sc.zones[z].name:'無'} 步道位置=${at.toFixed(1)} 離步道=${off.toFixed(1)} 到下一站=${dn} 最近=${near.toFixed(2)}`);
  ok(f>0,k+' 不在陸地'); ok(z===want,k+' 區不對（應為 '+sc.zones[want].name+'）'); ok(near>=2.2,k+' 太近'); ok(at>prev,k+' 沒沿步道順序'); prev=at; });
const onDock=(x,y)=>Math.abs(x-sc.dock[0])<.55&&y>=sc.dock[1]-.6&&y<=sc.dock[2]; /* 跟 isleWalk 一樣：碼頭也算可走 */
P.forEach(p=>{ const f=isleField(sc,p[0],p[1]); ok(f>0||onDock(p[0],p[1]),'步道點不在陸地 '+p); if(f<=0) console.log('  步道點',p,'在碼頭上（f='+f.toFixed(2)+'）'); });
[['tablet',sc.tablet.x,sc.tablet.y],['board',sc.board.x,sc.board.y]].concat(sc.deco.map(d=>[d[0],d[1],d[2]])).forEach(d=>ok(isleField(sc,d[1],d[2])>0,d[0]+' 不在陸地 '+d.slice(1)));
const d0=Math.hypot(sc.marks[keys[0]][3][0]-sc.dock[0],sc.marks[keys[0]][3][1]-sc.dock[1]); const dAll=keys.map(k=>Math.hypot(sc.marks[k][3][0]-sc.dock[0],sc.marks[k][3][1]-sc.dock[1]));
ok(d0===Math.min(...dAll),'第 1 站不是離碼頭最近'); console.log('第 1 站離碼頭',d0.toFixed(2),'；全部最小相鄰距離',minD.toFixed(2));
ok(sc.links.length===keys.length-1,'links 長度 '+sc.links.length+' ≠ '+(keys.length-1));
sc.links.forEach((l,i)=>{ const n=[...l].length; ok(n<=26,'links['+i+'] '+n+' 字'); ok(!/[a-zA-Zàâçéèêëîïôûùüÿœ]{3,}/.test(l),'links['+i+'] 有法文'); });
console.log('links',sc.links.length,'條，字數',sc.links.map(l=>[...l].length).join(','));
console.log(bad?('✗ 共 '+bad+' 項不過'):'✓ 全部通過');
