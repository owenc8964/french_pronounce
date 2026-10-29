// 健康島草稿驗收：node tools/tmp_isle_check_AC11.js
const fs=require('fs'), path=require('path'), cp=require('child_process');
const R=path.join(__dirname,'..'), F=path.join(R,'drafts/isle_AC11.js');
let ok=true; const bad=m=>{ ok=false; console.log('  ✗ '+m); };
try{ cp.execFileSync('node',['--check',F]); console.log('node --check：通過'); }catch(e){ bad('node --check 失敗'); }
const sc=require(F);
// 用 town.html 的 isleSplit／isles 邏輯算 AC11 的 key（直接從 town.html 抽函式）
const T=fs.readFileSync(path.join(R,'town.html'),'utf8');
const grab=n=>{ const i=T.indexOf('function '+n+'('); let d=0,j=T.indexOf('{',i); for(;j<T.length;j++){ if(T[j]==='{')d++; else if(T[j]==='}'&&!--d) break; } return T.slice(i,j+1); };
global.window={}; eval(fs.readFileSync(path.join(R,'answer_cards.js'),'utf8').replace(/^\s*(const|let) /mg,'var '));
global.ANSWER_CARDS=typeof ANSWER_CARDS!=='undefined'?ANSWER_CARDS:window.ANSWER_CARDS;
var ISLES=null; eval(grab('isleSplit')); eval(grab('isles'));
const I=isles().find(x=>x.id==='AC11'), keys=I.sents.map(s=>s.key);
console.log('站數：'+keys.length+'　key：'+keys.join(' '));
const mk=Object.keys(sc.marks);
const miss=keys.filter(k=>!sc.marks[k]), extra=mk.filter(k=>!keys.includes(k));
miss.length?bad('缺 mark：'+miss):console.log('key 全有 mark');
extra.length?bad('多餘 mark：'+extra):console.log('無多餘 mark');
const field=(x,y)=>{ let f=-9; sc.blobs.forEach(b=>{ const dx=(x-b[0])/b[2], dy=(y-b[1])/b[3]; f=Math.max(f,1-(dx*dx+dy*dy)); }); return f+.05*Math.sin(x*1.1+y*.4)+.04*Math.cos(y*1.3-x*.7); };
const zoneOf=y=>sc.zones.find(z=>y>=z.y0&&y<z.y1);
console.log('\n站 | key | 地標 | 座標 | f | 區 | 與上一站距離');
let minD=99, prevZi=0, zoneCount={};
keys.forEach((k,i)=>{ const m=sc.marks[k]; if(!m) return; const [x,y]=m[3], f=field(x,y), z=zoneOf(y), zi=sc.zones.indexOf(z);
  let d=''; if(i){ const p=sc.marks[keys[i-1]][3]; d=Math.hypot(x-p[0],y-p[1]); minD=Math.min(minD,d); if(d<2.2) bad('第'+(i+1)+'站距離 '+d.toFixed(2)+' < 2.2'); d=d.toFixed(2); }
  if(f<=0) bad('第'+(i+1)+'站不在陸地 f='+f.toFixed(2));
  if(zi<prevZi) bad('第'+(i+1)+'站區序倒退'); prevZi=zi; zoneCount[z.name]=(zoneCount[z.name]||0)+1;
  console.log(String(i+1).padStart(2)+' | '+k.padEnd(4)+' | '+m[0]+(m[1]||'')+' '+m[2]+' | '+x+','+y+' | '+f.toFixed(2)+' | '+(z?z.name:'無')+' | '+d); });
// 全部地標兩兩距離
let minAll=99; mk.forEach((a,i)=>mk.slice(i+1).forEach(b=>{ const p=sc.marks[a][3],q=sc.marks[b][3]; minAll=Math.min(minAll,Math.hypot(p[0]-q[0],p[1]-q[1])); }));
console.log('\n相鄰最小距離 '+minD.toFixed(2)+'；任兩地標最小距離 '+minAll.toFixed(2)); if(minAll<2.2) bad('有地標兩兩距離 < 2.2');
// 每站區對原文段落：段 1＝key 0–2、段 2＝3–7、段 3＝8–10、段 4＝11–13
const para=k=>{ const n=+k.split('.')[0]; return n<=2?0:n<=7?1:n<=10?2:3; };
keys.forEach((k,i)=>{ const zi=sc.zones.indexOf(zoneOf(sc.marks[k][3][1])); if(zi!==para(k)) bad('第'+(i+1)+'站（'+k+'）在第'+(zi+1)+'區，原文是第'+(para(k)+1)+'段'); });
console.log('每區站數：'+JSON.stringify(zoneCount));
const onDock=p=>Math.abs(p[0]-sc.dock[0])<.55&&p[1]>=sc.dock[1]-.6&&p[1]<=sc.dock[2];
const bad0=sc.path.filter(p=>field(p[0],p[1])<=0&&!onDock(p)); bad0.length?bad('path 點不在陸地：'+JSON.stringify(bad0)):console.log('path '+sc.path.length+' 點全在陸地（起點 13,32.2 在碼頭上，同 AC1／AC2）');
[['tablet',[sc.tablet.x,sc.tablet.y]],['board',[sc.board.x,sc.board.y]]].forEach(([n,p])=>{ if(field(p[0],p[1])<=0) bad(n+' 不在陸地'); });
sc.deco.forEach(d=>{ if(field(d[1],d[2])<=0) bad('deco 不在陸地 '+d); mk.forEach(k=>{ const p=sc.marks[k][3]; if(Math.hypot(p[0]-d[1],p[1]-d[2])<1.2) bad('deco '+d[0]+'('+d[1]+','+d[2]+') 太靠近站 '+k); }); });
console.log('links 長度 '+sc.links.length+'（應為 '+(keys.length-1)+'）'); if(sc.links.length!==keys.length-1) bad('links 長度不對');
sc.links.forEach((s,i)=>{ const n=[...s].length; if(n>26) bad('links['+i+'] '+n+' 字 > 26：'+s); if(/[A-Za-zÀ-ÿ]{3,}/.test(s)) bad('links['+i+'] 疑似含法文'); });
console.log('links 最長 '+Math.max(...sc.links.map(s=>[...s].length))+' 字');
// 主圖不重複 AC1／AC2
const prim=id=>{ const i=T.indexOf('  '+id+':{'); const s=T.slice(i,T.indexOf('deco:',i)); return [...s.matchAll(/'[^']+':\['([^']+)'/g)].map(m=>m[1]); };
const used=new Set([...prim('AC1'),...prim('AC2')]), dup=mk.filter(k=>used.has(sc.marks[k][0]));
dup.length?console.log('主圖與 AC1／AC2 重複：'+dup.map(k=>k+sc.marks[k][0])):console.log('主圖不與 AC1／AC2 重複');
const own=mk.map(k=>sc.marks[k][0]); if(new Set(own).size<own.length) bad('島內主圖重複');
console.log('outline 區數 '+sc.outline.length+'；zones '+sc.zones.length);
console.log(ok?'\n✅ 全部通過':'\n❌ 有未通過項');
