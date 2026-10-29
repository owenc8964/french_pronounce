/* AC5 興趣嗜好島草稿檢查（唯讀）：isleField／isleSplit／isles 直接從 town.html 抽出來跑，跟遊戲同一套判定 */
const fs=require('fs'), path=require('path'), cp=require('child_process');
const root=path.join(__dirname,'..'), draftPath=path.join(root,'drafts','isle_AC5.js');
const town=fs.readFileSync(path.join(root,'town.html'),'utf8');
function grab(start,end){ const a=town.indexOf(start), b=town.indexOf(end,a); if(a<0||b<0) throw new Error('抓不到 '+start); return town.slice(a,b); }
const code=grab('function isleSplit(f){','function isleSt(')+'\n'+grab('function isleField(sc,x,y){','function isleBuild(');
const cards=fs.readFileSync(path.join(root,'answer_cards.js'),'utf8');
const draftSrc=fs.readFileSync(draftPath,'utf8');
const env=new Function(cards+'\nvar ISLES=null;\n'+code+'\n'+draftSrc+'\nreturn {isles:isles, isleField:isleField, D:ISLE_DRAFT_AC5};')();
const D=env.D, I=env.isles().find(x=>x.id==='AC5'), keys=I.sents.map(s=>s.key);
let bad=0; const ok=(c,msg)=>{ console.log((c?'✅ ':'❌ ')+msg); if(!c) bad++; };

// 1. node --check
let chk=''; try{ cp.execFileSync('node',['--check',draftPath],{stdio:'pipe'}); chk='通過'; }catch(e){ chk='失敗 '+e.stderr; }
ok(chk==='通過','node --check：'+chk);
// 2. key 覆蓋
const mk=Object.keys(D.marks), miss=keys.filter(k=>!D.marks[k]), extra=mk.filter(k=>!keys.includes(k));
ok(!miss.length && !extra.length, `key：站 ${keys.length}／marks ${mk.length}；缺 [${miss}]；多 [${extra}]`);
// 3. 陸地
const land=(x,y)=>env.isleField(D,x,y)>0;
const offM=keys.filter(k=>D.marks[k]&&!land(D.marks[k][3][0],D.marks[k][3][1]));
ok(!offM.length,'地標全在陸地'+(offM.length?'：不在 '+offM:'（最小 f='+Math.min(...keys.map(k=>env.isleField(D,...D.marks[k][3]))).toFixed(3)+'）'));
const onDock=p=>Math.abs(p[0]-D.dock[0])<.55&&p[1]>=D.dock[1]-.6&&p[1]<=D.dock[2]; // 跟 isleWalk 一樣：碼頭木棧道可走
const offP=D.path.filter(p=>!land(p[0],p[1])&&!onDock(p));
ok(!offP.length,'步道點全在陸地或碼頭上'+(offP.length?'：不在 '+JSON.stringify(offP):''));
ok(land(D.board.x,D.board.y)&&land(D.tablet.x,D.tablet.y),'告示牌、石碑在陸地');
const offD=D.deco.filter(d=>!land(d[1],d[2])); ok(!offD.length,'裝飾在陸地'+(offD.length?'：不在 '+JSON.stringify(offD):''));
// 4. 間距（所有地標兩兩 ≥2.2）＋相鄰站距離
const P=keys.map(k=>D.marks[k][3]); let minAll=99, pair='';
for(let i=0;i<P.length;i++) for(let j=i+1;j<P.length;j++){ const d=Math.hypot(P[i][0]-P[j][0],P[i][1]-P[j][1]); if(d<minAll){ minAll=d; pair=keys[i]+'↔'+keys[j]; } }
ok(minAll>=2.2,`所有地標兩兩最小距離 ${minAll.toFixed(2)}（${pair}）`);
const adj=P.slice(1).map((p,i)=>Math.hypot(p[0]-P[i][0],p[1]-P[i][1]));
console.log('   相鄰站距離：'+adj.map(d=>d.toFixed(1)).join(' ')+`（最小 ${Math.min(...adj).toFixed(2)}、最大 ${Math.max(...adj).toFixed(2)}）`);
// 5. 第 1 站最靠碼頭
const dock=[D.dock[0],D.dock[1]], dd=P.map(p=>Math.hypot(p[0]-dock[0],p[1]-dock[1]));
const nearest=dd.indexOf(Math.min(...dd));
console.log(`   碼頭距離：第1站 ${dd[0].toFixed(2)}；最近的是第${nearest+1}站 ${dd[nearest].toFixed(2)}`);
ok(dd[0]<=dd[nearest]+0.3,'第 1 站最靠碼頭（容差 0.3）');
// 6. 每站所在區 vs 原文段落
const fr=I.sents; let para=[], pi=0; // 依 isles() 的原文段落推每站段號
{ const c=new Function(cards+';return ANSWER_CARDS;')().find(x=>x.id==='AC5'), v=c.versions[c.versions.length-1];
  String(v.fr).split(/\n\s*\n/).forEach((p,i)=>{ p.trim().split(/(?<=[.!?…])\s+(?=[A-ZÀ-Ý«])/).forEach(f=>{ if(!f.trim()) return; env.isles; }); });
  let k=0; String(v.fr).split(/\n\s*\n/).forEach((p,i)=>{ const n=p.trim().split(/(?<=[.!?…])\s+(?=[A-ZÀ-Ý«])/).filter(f=>f.trim()).length; for(let j=0;j<n;j++){ para[k++]=i; } }); }
const zoneOf=y=>D.zones.findIndex(z=>y>=z.y0&&y<z.y1);
const zbad=[]; const rows=keys.map((k,i)=>{ const sn=+k.split('.')[0], z=zoneOf(D.marks[k][3][1]); if(z!==para[sn]) zbad.push(k); return `${i+1}:${k}→${z>=0?D.zones[z].name.split(' ')[1]:'?'}`; });
console.log('   '+rows.join('  '));
ok(!zbad.length,'每站 y 帶對到它的區'+(zbad.length?'：錯 '+zbad:''));
// 7. outline 站號範圍 vs 區
const cnt=D.zones.map((z,i)=>keys.filter(k=>para[+k.split('.')[0]]===i).length);
console.log('   各區站數：'+cnt.join('／')+'；outline 範圍：'+D.outline.map(o=>o[1]).join(' '));
// 8. links
ok(Array.isArray(D.links)&&D.links.length===keys.length-1,`links 長度 ${D.links.length}（應 ${keys.length-1}）`);
const longL=D.links.map((s,i)=>[i+1,[...s].length]).filter(x=>x[1]>26);
ok(!longL.length,'links 每條 ≤26 字（最長 '+Math.max(...D.links.map(s=>[...s].length))+'）'+(longL.length?'：超過 '+JSON.stringify(longL):''));
ok(D.links.every(s=>!/[àâçéèêëîïôûùüœ]|\b(le|la|les|je|on|et)\b/i.test(s)),'links 無法文');
// 9. 主圖不跟 AC1／AC2 重複、島內不重複
const scenes=new Function(grab('var ISLE_SCENES={','var ARCH_ICON=')+';return ISLE_SCENES;')();
const used=new Set([...Object.values(scenes.AC1.marks),...Object.values(scenes.AC2.marks)].map(m=>m[0]));
const dupOld=keys.filter(k=>used.has(D.marks[k][0])), mains=keys.map(k=>D.marks[k][0]), dupIn=mains.filter((m,i)=>mains.indexOf(m)!==i);
ok(!dupOld.length&&!dupIn.length,'主圖不重複 AC1／AC2'+(dupOld.length?'：撞 '+dupOld:'')+(dupIn.length?'；島內重複 '+dupIn:''));
console.log(bad?`\n❌ ${bad} 項沒過`:'\n✅ 全部通過');
process.exit(bad?1:0);
