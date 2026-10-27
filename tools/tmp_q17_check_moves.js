// Q17（2026-10-27）：逐句核對 upgrade_moves.js 例句是否在課本快取裡、頁碼是否正確
// 用法：node tools/tmp_q17_check_moves.js
const fs=require('fs'),path=require('path'),R=path.join(__dirname,'..')+'/';
const cache=fs.readFileSync(R+'assets/.textbook_cache.txt','utf8');
eval(fs.readFileSync(R+'upgrade_moves.js','utf8').replace('var UPGRADE_MOVES','global.UPGRADE_MOVES'));
const norm=s=>s.normalize('NFC').replace(/ﬁ/g,'fi').replace(/ﬂ/g,'fl').replace(/ﬀ/g,'ff').replace(/[’‘`´]/g,"'").replace(/[«»"“”]/g,'').replace(/[\uE000-\uF8FF]/g,'').replace(/-\n/g,'').replace(/\s+/g,'').toLowerCase();
const pages=[];const re=/===== \[(.+?)\] page (\d+) =====/g;let m,last=null;
while((m=re.exec(cache))){ if(last) last.text=cache.slice(last.end,m.index); last={book:m[1],page:+m[2],end:re.lastIndex}; pages.push(last);} last.text=cache.slice(last.end);
pages.forEach(p=>p.n=norm(p.text));
const bookKey=b=>/Communication/.test(b)?'Communication essentielle A2':/B1/.test(b)?'Édito B1':/Cah/i.test(b)?'Cahier:'+b:/A1/.test(b)?'Édito A1':/A2/.test(b)?'Édito A2':b;
const mode=process.argv[2];
if(mode==='page'){ // node x page "Édito B1" 21
  const p=pages.find(p=>bookKey(p.book)===process.argv[3]&&p.page===+process.argv[4]); console.log(p?p.text:'none'); process.exit(0);}
if(mode==='grep'){ const q=norm(process.argv[3]); pages.filter(p=>p.n.includes(q)).forEach(p=>console.log(bookKey(p.book)+' p.'+p.page)); process.exit(0);}
for(const mv of UPGRADE_MOVES){ for(const ex of mv.examples){
  let q=norm(ex.fr.replace(/…$/,''));
  let hits=pages.filter(p=>p.n.includes(q)).map(p=>bookKey(p.book)+' p.'+p.page);
  let partial='';
  if(!hits.length){ let k=q.length; while(k>10){k-=3; const sub=q.slice(0,k); const h=pages.filter(p=>p.n.includes(sub)); if(h.length){partial=Math.round(100*k/q.length)+'%前綴@'+h.map(p=>bookKey(p.book)+' p.'+p.page).join(',');break;}} }
  const ok=hits.includes(ex.src);
  console.log([mv.id,ex.src,ok?'OK':(hits.length?'PAGE?':'MISS'),hits.join(' | '),partial,ex.fr].join('\t'));
}}
console.log([...new Set(pages.map(p=>p.book))].join('\n'));
