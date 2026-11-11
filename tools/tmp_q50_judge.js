// Q50 守園聽力打字填空判分核對（2026-11-12）
// 純本機：讀 chunks.js / sentences.js / assets/didier/clips_*.json，⛔ 不碰雲端、不開 preview。
// 判分函式逐字抄自 tower.html（行號標在旁邊），出題挖空函式抄自 town.html。
// 用法：node tools/tmp_q50_judge.js
var fs=require('fs'), vm=require('vm'), path=require('path');
var ROOT=path.join(__dirname,'..');

/* ---------- tower.html 判分（逐字抄） ---------- */
function norm(x){ return String(x).toLowerCase().replace(/[’`]/g,"'").replace(/\s+/g,' ').replace(/[.!?。]+$/,'').trim(); }   // tower.html:100
function deacc(x){ return x.normalize('NFD').replace(/[̀-ͯ]/g,''); }                                                          // tower.html:101
function sayOf(qq, ans){ return String(qq).replace(/_{2,}(\s*\([^)]*\))?/, ans).replace(/\s*\([^)]*\)\s*$/,'').replace(/\s+/g,' ').trim(); } // tower.html:102
function judge(c, v){                                                                                                        // tower.html:461-465（answerType 的比對段）
  if(!v.trim()) return 'empty';
  var n=norm(v), res='no';
  c.alts.forEach(function(a){ [a, sayOf(c.q,a)].forEach(function(t){ if(norm(t)===n) res='ok'; else if(res!=='ok' && deacc(norm(t))===deacc(n)) res='accent'; }); });
  return res;
}
function makeQ(clip, bl){ return {q:clip.text.slice(0,bl.a)+'_____'+clip.text.slice(bl.b), right:bl.w, alts:[bl.w, bl.w.replace(/'$/,'')], show:bl.w}; } // tower.html:386

/* ---------- town.html 挖空（逐字抄） ---------- */
function deaccT(x){ return String(x).normalize('NFD').replace(/[̀-ͯ]/g,''); }                                              // town.html:534
function normAns(x){ return deaccT(String(x)).toLowerCase().replace(/[’]/g,"'").replace(/[.,!?;:«»"]/g,'').replace(/\s+/g,' ').trim(); } // town.html:535
var ctx={}; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT,'chunks.js'),'utf8')+';globalThis.CHUNKS=CHUNKS;', ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT,'sentences.js'),'utf8')+';globalThis.SENTENCES=SENTENCES;', ctx);
var CHUNKS=ctx.CHUNKS, SENTENCES=ctx.SENTENCES;
var CLIP_FUNC={}, CLIP_LEARN=null;
('le la les l un une des du de d au aux à a en dans sur sous pour par avec chez sans vers et ou mais donc or ni car que qu qui quoi dont où ce c cet cette ces se s il ils elle elles on je j tu vous nous me m te t lui leur leurs y ne n pas plus moins très bien aussi si est sont ai as avons avez ont suis es sommes êtes était été être avoir mon ma mes ton ta tes son sa ses notre nos votre vos comme alors puis ça cela oui non quand tout tous toute toutes même autre autres peu trop bon voilà ah oh eh euh ben bah hein là ici déjà encore faire fait font va vais vas allez aller vont dit dire peut peux veut veux moi toi soi eux').split(' ').forEach(function(w){ CLIP_FUNC[normAns(w)]=1; }); // town.html:1497
var CLIP_SMALL=["l'","d'","qu'","n'","j'","c'","s'","m'","le","la","les","un","une","des","du","au","aux","à","de","en","dans","sur","pour","avec","chez","ne","y"];
function clipLearn(){                                                                                                        // town.html:1499-1505
  if(CLIP_LEARN) return CLIP_LEARN; CLIP_LEARN={};
  function add(fr){ var ws=String(fr||'').replace(/[’‘]/g,"'").replace(/\([^)]*\)/g,' ').match(/[A-Za-zÀ-ÿ]+/g)||[];
    ws.forEach(function(w){ var k=normAns(w); if(k.length>=3 && !CLIP_FUNC[k]) CLIP_LEARN[k]=1; }); }
  CHUNKS.forEach(function(c){ add(String(c.fr||'').replace(/^(le |la |les |l'|un |une |se |s')/i,'')); });
  SENTENCES.forEach(function(x){ add(x.fr); });
  return CLIP_LEARN;
}
function clipBlankAll(text){                                                                                                 // town.html:1507-1517
  var L=clipLearn(), out=[], re=/[A-Za-zÀ-ÿ]+'?/g, m, first=true;
  while((m=re.exec(text))){
    var w=m[0], a=m.index, b=a+w.length, k=normAns(w.replace(/'$/,''));
    if(text[a-1]==='(' || (!first && /^[A-ZÀ-Ý]/.test(w))){ first=false; continue; }
    first=false;
    if(CLIP_SMALL.indexOf(w.toLowerCase())>=0) out.push({a:a,b:b,w:w,t:'s'});
    else if(k.length>=3 && L[k]) out.push({a:a,b:b,w:w,t:'w'});
  }
  return out;
}

/* ---------- 一、輸入方式實測 ---------- */
var CASES=[
  // [說明, 句子, 要挖的字, Owen 的輸入]
  ['完全正確','Finalement, vous avez changé de vie.','changé','changé'],
  ['大寫','Finalement, vous avez changé de vie.','changé','Changé'],
  ['句首字（原文大寫）打小寫','Finalement, vous avez changé de vie.','Finalement','finalement'],
  ['重音漏打','Finalement, vous avez changé de vie.','changé','change'],
  ['重音打錯方向','Finalement, vous avez changé de vie.','changé','changè'],
  ['前後多空白','Finalement, vous avez changé de vie.','changé','  changé  '],
  ['句點結尾','Finalement, vous avez changé de vie.','changé','changé.'],
  ['空白＋句點（iPhone 連按兩下空白會出 ". "）','Finalement, vous avez changé de vie.','changé','changé. '],
  ['逗號結尾','Finalement, vous avez changé de vie.','changé','changé,'],
  ['法式空格問號','Finalement, vous avez changé de vie.','changé','changé ?'],
  ['拆開的重音（NFD，e＋組合符號）','Finalement, vous avez changé de vie.','changé','changé'],
  ['打錯一個字母','Finalement, vous avez changé de vie.','changé','chamgé'],
  ['連冠詞一起打 l\'＋字','Je vais à l\'école demain.','école',"l'école"],
  ['連冠詞（iPhone 彎撇號）','Je vais à l\'école demain.','école','l’école'],
  ['連冠詞（左彎撇號 ‘）','Je vais à l\'école demain.','école','l‘école'],
  ['連前面的字一起打','Finalement, vous avez changé de vie.','changé','avez changé'],
  ['整句照打（標點全對）','Finalement, vous avez changé de vie.','changé','Finalement, vous avez changé de vie.'],
  ['整句照打（漏逗號）','Finalement, vous avez changé de vie.','changé','Finalement vous avez changé de vie'],
  ['挖到的字帶撇號 jusqu\'：打 jusqu\'','Il marche jusqu\'au parc.',"jusqu'","jusqu'"],
  ['挖到的字帶撇號：打 jusqu（沒撇號）','Il marche jusqu\'au parc.',"jusqu'","jusqu"],
  ['挖到的字帶撇號：iPhone 彎撇號 jusqu’','Il marche jusqu\'au parc.',"jusqu'","jusqu’"],
  ['挖到的字帶撇號：左彎 jusqu‘','Il marche jusqu\'au parc.',"jusqu'","jusqu‘"],
  ['連字號字被拆半：打完整 rendez-vous','On a rendez-vous demain.','rendez','rendez-vous'],
  ['同音不同拼（陰陽性）','Elle est fatiguée.','fatiguée','fatigué'],
  ['同音不同拼（單複數）','Ils sont contents.','contents','content'],
  ['同音不同拼（-er/-é）','Je vais manger.','manger','mangé'],
  ['同音不同拼（-ais/-ait）','Il parlait vite.','parlait','parlais'],
  ['œ 打成 oe','Ma sœur arrive.','sœur','soeur'],
];
function blankOf(text, w){ var a=text.indexOf(w); return {a:a, b:a+w.length, w:w}; }
console.log('=== 一、輸入方式實測 ===');
var caseOut=[];
CASES.forEach(function(r){
  var bl=blankOf(r[1], r[2]); var c=makeQ({text:r[1]}, bl); var res=judge(c, r[3]);
  caseOut.push({desc:r[0], q:c.q, right:r[2], input:r[3], res:res});
  console.log([r[0], JSON.stringify(c.q), '答案='+r[2], '輸入='+JSON.stringify(r[3]), '→ '+res].join(' | '));
});
// 備註：œ 這列只是測判分；實際出題時 œ 不在 [A-Za-zÀ-ÿ] 裡，sœur 會被切成 s + ur，根本挖不到（見下）
console.log('œ 切字測試：', JSON.stringify(('Ma sœur arrive.').match(/[A-Za-zÀ-ÿ]+'?/g)));

/* ---------- 二、真實題庫掃描 ---------- */
var B1_UNITS_DONE=3;                                                                                                         // town.html:1483
var all=require(path.join(ROOT,'assets/didier/clips_a2.json')).concat(require(path.join(ROOT,'assets/didier/clips_b1.json')))
  .filter(function(c){ return !(c.book==='b1' && (c.unit>B1_UNITS_DONE || c.page>=189)); });                               // town.html:1487
all.forEach(function(c){ c.text=String(c.text).replace(/[’‘]/g,"'"); c.blank=clipBlankAll(c.text); });                      // town.html:1488
var clips=all.filter(function(c){ return c.blank.some(function(x){ return x.t==='w'; }); });
var items=[]; clips.forEach(function(c){ c.blank.filter(function(x){ return x.t==='w'; }).forEach(function(bl){ items.push({clip:c, bl:bl, q:makeQ(c,bl)}); }); });
console.log('\n=== 二、真實題庫 ===');
console.log('片段總數（過濾後）', all.length, '｜能出聽力題的片段', clips.length, '｜可挖的字（題目）', items.length);

function ex(list, n){ return list.slice(0,n||6).map(function(i){ return '['+i.clip.id+'] '+i.q.q+'  →答 '+i.bl.w; }); }
var nfd=all.filter(function(c){ return /[̀-ͯ]/.test(c.text); });
console.log('原文含拆開的重音（NFD）片段：', nfd.length);
var oeClips=all.filter(function(c){ return /œ/i.test(c.text); });
console.log('原文含 œ 的片段：', oeClips.length, '（這些字永遠挖不到）', oeClips.slice(0,5).map(function(c){ return (c.text.match(/\S*œ\S*/gi)||[]).join(','); }));
var oeWritten=items.filter(function(i){ return /oe/i.test(i.bl.w); });
console.log('答案含 oe 拼法：', oeWritten.length, ex(oeWritten));

var apos=items.filter(function(i){ return /'$/.test(i.bl.w); });
console.log('\n答案以撇號結尾（jusqu\' 類）：', apos.length); ex(apos,10).forEach(function(s){ console.log('  ',s); });

var elid=items.filter(function(i){ var t=i.clip.text; return /[A-Za-zÀ-ÿ]'$/.test(t.slice(0,i.bl.a)); });
console.log('\n空格前緊貼省音（l\'_____ / d\'_____ / j\'_____）：', elid.length, '題'); ex(elid,6).forEach(function(s){ console.log('  ',s); });
var elidTest=elid.map(function(i){ var pre=i.clip.text.slice(0,i.bl.a).match(/[A-Za-zÀ-ÿ]+'$/)[0]; return judge(i.q, pre+i.bl.w); });
console.log('  → 這些題如果連省音一起打（如 l\'école）判定：', JSON.stringify(count(elidTest)));

var hyph=items.filter(function(i){ var t=i.clip.text; return t[i.bl.b]==='-' || t[i.bl.a-1]==='-'; });
console.log('\n空格緊貼連字號（rendez-_____ / _____-vous 類）：', hyph.length, '題'); ex(hyph,10).forEach(function(s){ console.log('  ',s); });
var hyphTest=hyph.map(function(i){ var t=i.clip.text, m=t.slice(0,i.bl.b).match(/[A-Za-zÀ-ÿ'-]+$/)[0]+t.slice(i.bl.b).match(/^[A-Za-zÀ-ÿ'-]*/)[0]; return judge(i.q, m); });
console.log('  → 如果打出整個連字號字判定：', JSON.stringify(count(hyphTest)));

var cap=items.filter(function(i){ return /^[A-ZÀ-Ý]/.test(i.bl.w); });
console.log('\n答案是句首大寫字：', cap.length, '題（norm 有轉小寫，小寫輸入判', judge(cap[0]?cap[0].q:{alts:['X'],q:'_____'}, cap[0]?cap[0].bl.w.toLowerCase():'x'), '）');

// 原文後面緊接著括號：sayOf 會把括號一起吃掉（不影響單字判分，只影響顯示）
var paren=items.filter(function(i){ return /^\s*\(/.test(i.clip.text.slice(i.bl.b)); });
console.log('空格後緊接括號（顯示答案時括號被吞）：', paren.length);

// 同一片段同一個字出現兩次以上（顯示的空格位置對，但原文另一處也有同字 → 不影響判分）
// 整句照打：真實題庫抽測「整句一字不差」與「整句但省掉逗號」
var full=items.map(function(i){ return judge(i.q, i.clip.text); });
var fullNoComma=items.map(function(i){ return judge(i.q, i.clip.text.replace(/,/g,'')); });
console.log('\n整句照打（原文一字不差）：', JSON.stringify(count(full)), '｜整句但拿掉逗號：', JSON.stringify(count(fullNoComma)));

// 正確答案本身 → 必須全是 ok（自我檢查）
var self=items.map(function(i){ return judge(i.q, i.bl.w); });
console.log('正確答案自測：', JSON.stringify(count(self)));
var selfUp=items.map(function(i){ return judge(i.q, i.bl.w.toUpperCase()); });
console.log('正確答案全大寫：', JSON.stringify(count(selfUp)));
var selfDe=items.filter(function(i){ return deacc(i.bl.w)!==i.bl.w; });
console.log('答案含重音的題：', selfDe.length, '｜漏打重音判：', JSON.stringify(count(selfDe.map(function(i){ return judge(i.q, deacc(i.bl.w)); }))));
var selfComma=items.map(function(i){ return judge(i.q, i.bl.w+','); });
console.log('答案後多打逗號：', JSON.stringify(count(selfComma)));
var selfSpDot=items.map(function(i){ return judge(i.q, i.bl.w+'. '); });
console.log('答案後「. 」（句點＋空白）：', JSON.stringify(count(selfSpDot)));

/* ---------- 三、同音異拼候選（只用拼字規則找候選，⚠️ 是否真的聽不出來未逐條查證） ---------- */
var L=clipLearn();
var VERB_END=[['er','é','ez','ée','és','ées','ai','ais','ait','aient'],['ais','ait','aient'],['é','ée','és','ées'],['ent','e','es']];
var GEN=[['','e','s','es']];
function variants(w){
  var lw=w.toLowerCase(), out={};
  VERB_END.concat(GEN).forEach(function(g){ g.forEach(function(e1){ if(e1 && !lw.endsWith(e1)) return; if(!e1 && g!==GEN[0]) return;
    var stem=e1?lw.slice(0,-e1.length):lw; if(stem.length<3) return;
    g.forEach(function(e2){ var v=stem+e2; if(v!==lw) out[v]=1; }); }); });
  // 去掉 GEN 規則從 -e/-s 結尾再拆
  ['e','s','es'].forEach(function(e1){ if(lw.endsWith(e1)){ var st=lw.slice(0,-e1.length); if(st.length>=3) ['','e','s','es'].forEach(function(e2){ if(st+e2!==lw) out[st+e2]=1; }); } });
  return Object.keys(out);
}
// 候選要「也是真實法文字」→ 用學過字表＋全部片段原文當字典
var DICT={}; Object.keys(L).forEach(function(k){ DICT[k]=1; });
all.forEach(function(c){ (c.text.toLowerCase().match(/[a-zà-ÿ]+/g)||[]).forEach(function(w){ DICT[normAns(w)]=1; }); });
var homo=[];
items.forEach(function(i){
  var w=i.bl.w.replace(/'$/,'');
  var vs=variants(w).filter(function(v){ return DICT[normAns(v)] && normAns(v)!==normAns(w); });
  // 只留「發音相同」的那群：-é/-ée/-és/-ées/-er/-ez、-ais/-ait/-aient、-e/-es/-ent、陽/陰（字尾子音不發音時）
  var lw=w.toLowerCase();
  vs=vs.filter(function(v){
    var A=lw, B=v;
    function cls(x){ if(/(er|é|ée|és|ées|ez)$/.test(x)) return 'E'; if(/(ais|ait|aient)$/.test(x)) return 'AI'; return null; }
    if(cls(A)&&cls(A)===cls(B)) return true;
    // -é 跟 -ais/-ait 不同音（標準法文 [e] vs [ɛ]，口語常中和）→ 不列
    var sa=A.replace(/(es|e|s|ent)$/,''), sb=B.replace(/(es|e|s|ent)$/,'');
    if(sa===sb){ // 加 e 會不會改變讀音：前面是母音或 é/i/u/l/r 時多半同音；子音結尾加 e 會唸出來（petit/petite）
      var last=sa.slice(-1); return /[aeiouyéèêlr]/.test(last) || /(ent)$/.test(A)||/(ent)$/.test(B);
    }
    return false;
  });
  if(vs.length) homo.push({i:i, vs:vs});
});
console.log('\n=== 三、同音異拼候選（規則找的，未逐條人工確認） ===');
console.log('題數：', homo.length, '/', items.length, '(', (homo.length/items.length*100).toFixed(1), '% )');
homo.slice(0,25).forEach(function(h){ console.log('  ['+h.i.clip.id+'] '+h.i.q.q+'  →答 '+h.i.bl.w+'   同音候選：'+h.vs.join(' / ')+'  判定：'+h.vs.map(function(v){ return judge(h.i.q,v); }).join(',')); });

/* ---------- 四、原文品質抽查：題目文字是否像語音辨識產物（怪字） ---------- */
var weird=items.filter(function(i){ return /\b(euh|hum|mm+)\b/i.test(i.clip.text); });
console.log('\n原文含 euh/hum 等口語填充（題目句子會出現）：', weird.length);

function count(arr){ var o={}; arr.forEach(function(x){ o[x]=(o[x]||0)+1; }); return o; }
fs.writeFileSync(path.join(__dirname,'tmp_q50_out.json'), JSON.stringify({cases:caseOut, n:{clips:all.length, listenClips:clips.length, items:items.length}, apos:apos.map(function(i){ return {id:i.clip.id,q:i.q.q,w:i.bl.w}; }), hyph:hyph.map(function(i){ return {id:i.clip.id,q:i.q.q,w:i.bl.w}; }), elid:elid.length, homo:homo.map(function(h){ return {id:h.i.clip.id,q:h.i.q.q,w:h.i.bl.w,vs:h.vs}; })}, null, 1));
