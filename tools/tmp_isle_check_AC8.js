/* AC8 加拿大島草稿驗收（唯讀）：isleSplit／isleField 直接從 town.html 抽出來跑，不另寫一套 */
const fs=require('fs'), path=require('path'), cp=require('child_process');
const R=p=>path.join(__dirname,'..',p);
const town=fs.readFileSync(R('town.html'),'utf8');
function grab(name){ const i=town.indexOf('function '+name+'('); if(i<0) throw name; let d=0,j=town.indexOf('{',i);
  for(;j<town.length;j++){ if(town[j]==='{') d++; else if(town[j]==='}'){ d--; if(!d) break; } } return town.slice(i,j+1); }
const ANSWER_CARDS=new Function(fs.readFileSync(R('answer_cards.js'),'utf8')+';return ANSWER_CARDS;')();
const env=new Function('ANSWER_CARDS', 'var ISLES=null;'+grab('isleSplit')+grab('isles')+grab('isleField')+'return {isles:isles, isleSplit:isleSplit, isleField:isleField};')(ANSWER_CARDS);
const D=new Function(fs.readFileSync(R('drafts/isle_AC8.js'),'utf8')+';return ISLE_DRAFT_AC8;')();
let bad=0; const ok=(c,msg)=>{ console.log((c?'✅ ':'❌ ')+msg); if(!c) bad++; };

// 1. node --check
let chk=''; try{ cp.execFileSync('node',['--check',R('drafts/isle_AC8.js')]); chk='ok'; }catch(e){ chk=String(e.stderr||e); }
ok(chk==='ok','node --check drafts/isle_AC8.js '+chk);

// 2. keys（town.html 的 isles()）＋每個 key 屬於第幾段原文
const I=env.isles().filter(x=>x.id==='AC8')[0];
const keys=I.sents.map(s=>s.key);
const card=ANSWER_CARDS.filter(c=>c.id==='AC8')[0], v=card.versions[card.versions.length-1];
const para={}; let k=0;
String(v.fr).split(/\n\s*\n/).forEach((p,pi)=>{ p.trim().split(/(?<=[.!?…])\s+(?=[A-ZÀ-Ý«])/).forEach(f=>{ if(!f.trim()) return; const parts=env.isleSplit(f.trim());
  parts.forEach((pt,i)=>{ para[parts.length>1?k+'.'+(i+1):String(k)]=pi; }); k++; }); });
const mk=Object.keys(D.marks);
ok(keys.length===28,'站數 '+keys.length);
const miss=keys.filter(x=>!D.marks[x]), extra=mk.filter(x=>keys.indexOf(x)<0);
ok(!miss.length && !extra.length,'key 全有 mark（缺 '+(miss.join(',')||'無')+'；多餘 '+(extra.join(',')||'無')+'）');
ok(D.zones.length===Object.keys(para).reduce((m,x)=>Math.max(m,para[x]),0)+1,'區數 '+D.zones.length+' ＝ 原文段數');

// 3. 陸地
const land=(x,y)=>env.isleField(D,x,y);
const pts=[]; keys.forEach((x,i)=>pts.push(['站'+(i+1)+'('+x+')',D.marks[x][3]]));
D.path.forEach((p,i)=>pts.push(['path'+i,p])); pts.push(['tablet',[D.tablet.x,D.tablet.y]]); pts.push(['board',[D.board.x,D.board.y]]);
D.deco.forEach((d,i)=>pts.push(['deco'+i+d[0],[d[1],d[2]]]));
const wet=pts.filter(p=>!(land(p[1][0],p[1][1])>0));
const minF=pts.reduce((m,p)=>{ const f=land(p[1][0],p[1][1]); return f<m.f?{f:f,n:p[0]}:m; },{f:9});
ok(!wet.length,'座標全在陸地 f>0（地標／path／tablet／board／deco 共 '+pts.length+' 點；最低 f='+minF.f.toFixed(3)+' @'+minF.n+(wet.length?'；落水：'+wet.map(p=>p[0]).join(','):'')+'）');
// 步道線段中間也要是陸地
let segWet=[]; for(let i=0;i+1<D.path.length;i++){ const a=D.path[i],b=D.path[i+1]; for(let t=0;t<=1;t+=.05){ if(!(land(a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t)>0)){ segWet.push(i); break; } } }
ok(!segWet.length,'步道每段沿線都是陸地'+(segWet.length?'（落水段 '+segWet+'）':''));

// 4. 相鄰距離＋全體最小距離
const P=keys.map(x=>D.marks[x][3]), dist=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);
const adj=P.slice(1).map((p,i)=>dist(P[i],p));
ok(Math.min(...adj)>=2.2,'相鄰站距離 min '+Math.min(...adj).toFixed(2)+' / max '+Math.max(...adj).toFixed(2));
let mp={d:99}; for(let i=0;i<P.length;i++) for(let j=i+1;j<P.length;j++){ const d=dist(P[i],P[j]); if(d<mp.d) mp={d:d,a:i+1,b:j+1}; }
ok(mp.d>=2.2,'任兩站最小距離 '+mp.d.toFixed(2)+'（站'+mp.a+'–站'+mp.b+'）');
const others=[[D.tablet.x,D.tablet.y,'tablet'],[D.board.x,D.board.y,'board']].concat(D.deco.map(d=>[d[1],d[2],'deco'+d[0]]));
const crowd=[]; others.forEach(o=>P.forEach((p,i)=>{ if(dist(p,o)<1.4) crowd.push(o[2]+'↔站'+(i+1)); }));
ok(!crowd.length,'tablet／board／deco 離地標 ≥1.4'+(crowd.length?'（'+crowd.join(',')+'）':''));

// 5. 沿步道順序：每站投影到 path 折線上的位置要遞增
function proj(p){ let best={d:99,s:0}, acc=0; for(let i=0;i+1<D.path.length;i++){ const a=D.path[i],b=D.path[i+1], L=dist(a,b);
  let t=((p[0]-a[0])*(b[0]-a[0])+(p[1]-a[1])*(b[1]-a[1]))/(L*L); t=Math.max(0,Math.min(1,t));
  const q=[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t], d=dist(p,q); if(d<best.d) best={d:d,s:acc+t*L}; acc+=L; } return best; }
const pr=P.map(proj), order=pr.slice(1).filter((x,i)=>!(x.s>pr[i].s)).map((x,i)=>i);
ok(pr.every((x,i)=>!i||x.s>pr[i-1].s),'沿步道順序遞增（離步道最遠 '+Math.max(...pr.map(x=>x.d)).toFixed(2)+'）');

// 6. 每站所在區＝它的原文段
const zoneOf=y=>D.zones.findIndex(z=>y>=z.y0&&y<z.y1);
const zbad=keys.filter(x=>zoneOf(D.marks[x][3][1])!==para[x]);
ok(!zbad.length,'每站所在區＝原文段落'+(zbad.length?'（不符：'+zbad.join(',')+'）':''));
D.zones.forEach((z,zi)=>{ const ks=keys.map((x,i)=>[x,i+1]).filter(a=>zoneOf(D.marks[a[0]][3][1])===zi); console.log('   '+z.name+'：站 '+ks[0][1]+'–'+ks[ks.length-1][1]+'（'+ks.length+' 站）｜告示牌寫 '+D.outline[zi][1]); });
const circ=n=>String.fromCodePoint(n<=20?0x245F+n:0x3250+n-20);
const obad=D.zones.map((z,zi)=>{ const ks=keys.map((x,i)=>i+1).filter(i=>zoneOf(P[i-1][1])===zi); const want=ks.length>1?circ(ks[0])+'–'+circ(ks[ks.length-1]):circ(ks[0]); return D.outline[zi][1]===want&&D.outline[zi][0]===z.name?null:z.name+' 應為 '+want; }).filter(Boolean);
ok(!obad.length,'告示牌區名＋站號對得上'+(obad.length?'（'+obad.join('；')+'）':''));

// 7. 碼頭在下方
const maxY=Math.max(...P.map(p=>p[1]));
ok(D.dock[1]>maxY && D.dock[2]<=D.H && Math.abs(D.dock[0]-D.path[0][0])<.01,'碼頭在下方（dock y '+D.dock[1]+'–'+D.dock[2]+'，最低地標 y '+maxY+'，H '+D.H+'）');
ok(P.every(p=>p[0]>=0&&p[0]<D.W&&p[1]>=0&&p[1]<D.H),'全部在 W×H '+D.W+'×'+D.H+' 內');

// 8. links
const len=s=>Array.from(s).length;
ok(D.links.length===keys.length-1,'links 長度 '+D.links.length+'（應 '+(keys.length-1)+'）');
const lbad=D.links.map((s,i)=>[i+1,s]).filter(a=>len(a[1])>26||/[A-Za-zÀ-ÿ]/.test(a[1]));
ok(!lbad.length,'links 每句 ≤26 字且無法文（最長 '+Math.max(...D.links.map(len))+' 字）'+(lbad.length?'：'+lbad.map(a=>a[0]).join(','):''));

// 9. 主圖不重複 AC1／AC2、島內不重複
const sc=new Function(town.slice(town.indexOf('var ISLE_SCENES={'),town.indexOf('var ARCH_ICON='))+';return ISLE_SCENES;')();
const used={}; ['AC1','AC2'].forEach(id=>Object.values(sc[id].marks).forEach(m=>used[m[0]]=id));
const dup=keys.filter(x=>used[D.marks[x][0]]).map(x=>x+D.marks[x][0]+'＝'+used[D.marks[x][0]]);
const mains=keys.map(x=>D.marks[x][0]), self=mains.filter((m,i)=>mains.indexOf(m)!==i);
ok(!dup.length,'主圖不跟 AC1／AC2 重複'+(dup.length?'（'+dup.join(',')+'）':''));
ok(!self.length,'島內主圖不重複'+(self.length?'（'+self.join(',')+'）':''));

console.log('\n'+(bad?'❌ '+bad+' 項沒過':'✅ 全部通過'));
process.exitCode=bad?1:0;
