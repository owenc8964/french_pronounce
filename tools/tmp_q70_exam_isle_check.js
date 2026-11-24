// Q70：只跑純函式（從原始檔切出來 eval，不連網、不碰真實 localStorage／雲端）
var fs=require('fs'), R='/Users/owen/Documents/Claude/Project/CLB test/France CLB7/';
var sy=fs.readFileSync(R+'sync_supabase.js','utf8');
eval(sy.slice(sy.indexOf('function mergeStory('), sy.indexOf('function apply(')));
var ex=fs.readFileSync(R+'exam_isle.js','utf8');
var store={}; global.localStorage={getItem:function(k){return k in store?store[k]:null;}, setItem:function(k,v){store[k]=String(v);}};
eval(ex.slice(ex.indexOf('function LS('), ex.indexOf('function mineBlock(')));
var a={x:{n:3,last:100}}, b={x:{n:1,last:200}, y:{n:1,last:50}};
console.log('known merge', JSON.stringify(merge(a,b)));
console.log('dims merge local-newer-edit', JSON.stringify(merge({q1:['a','b']},{q1:['a']})));
console.log('dims merge local-deleted', JSON.stringify(merge({},{q1:['a']})));
var L=[{id:'A'},{id:'B'},{id:'C'}], idf=function(x){return x.id;};
bump('clb7_exam_known','A'); bump('clb7_exam_known','B');
var cnt={A:0,B:0,C:0}; for(var i=0;i<200;i++) cnt[pickFrom(L,idf).id]++;
console.log('pick after skip A,B', JSON.stringify(cnt));
bump('clb7_exam_known','C'); cnt={A:0,B:0,C:0}; for(i=0;i<200;i++) cnt[pickFrom(L,idf).id]++;
console.log('pick all skipped', JSON.stringify(cnt));
var k=JSON.parse(store.clb7_exam_known); Object.keys(k).forEach(function(id){k[id].last-=4*86400000;}); store.clb7_exam_known=JSON.stringify(k);
console.log('known after 4 days still kept', Object.keys(JSON.parse(store.clb7_exam_known)).join(','));
try{ pickFrom([], idf); console.log('empty ok'); }catch(e){ console.log('empty list ->', e.constructor.name, e.message); }
console.log('fmt', fmt(270), fmt(-3), fmt(59.6));
