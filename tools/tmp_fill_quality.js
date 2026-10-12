/* B11（2026-10-13 排程）：填空題品質盤點——可重跑
   用法：node tools/tmp_fill_quality.js
   分類規則與 quest.html 的 fillTier() 一致（改一邊要改另一邊）：
     2 ＝ 完整句子＋中文（zh 欄有值，題幹去掉空格與括號後至少 3 個法文字）
     1 ＝ 完整句子、沒有中文
     0 ＝ 練習卡（題幹不到 3 個法文字，例如「vouloir 變位：ils _____」） */
var fs=require('fs'), vm=require('vm'), path=require('path');
var src=fs.readFileSync(path.join(__dirname,'..','questions.js'),'utf8');
var ctx={}; vm.createContext(ctx);
vm.runInContext(src+';this.__B=(typeof QUESTIONS!=="undefined"?QUESTIONS:(typeof BANK!=="undefined"?BANK:null));',ctx);
var BANK=ctx.__B;
if(!BANK){ console.log('找不到題庫陣列'); process.exit(1); }

function frWords(q){
  var s=String(q.q||'')
    .replace(/（[^）]*）|\([^)]*\)/g,' ')          /* 括號提示 */
    .replace(/_{2,}|…+|\.{3,}/g,' ')               /* 空格 */
    .replace(/[^\sA-Za-zÀ-ÿœŒæÆ'’-]/g,' ');         /* 中文、標點 */
  return s.split(/\s+/).filter(function(w){ return /[A-Za-zÀ-ÿ]{2,}/.test(w); });
}
function fillTier(q){
  var stem=String(q.q||''), n=frWords(q).length;
  var zhCtx=!!(q.zh && String(q.zh).trim()) || /[一-鿿]/.test(stem.replace(/（[^）]*）|\([^)]*\)/g,''));
  if(!/_{2,}|…{2,}|\.{4,}/.test(stem)) return n>=3 ? 1 : 0;   /* 沒空格：改寫題（整句法文）算 1；概念問答（「trouver → 過去分詞是？」）算 0 */
  if(/變位\s*[：:]/.test(stem) && n<3) return 0;          /* 「vouloir 變位：ils _____」 */
  if(zhCtx && n>=1) return 2;                             /* 有空格＋知道意思（句子或「背部：le _____」） */
  if(n>=2) return 1;                                      /* 有句子但沒中文（「J'aime _____ musique. (定冠詞)」） */
  return 0;
}

var fills=BANK.filter(function(q){ return q.type==='fill'; });
var cnt=[0,0,0], byLesson={}, samples={0:[],1:[],2:[]};
fills.forEach(function(q){
  var t=fillTier(q); cnt[t]++;
  var L=q.lesson; byLesson[L]=byLesson[L]||[0,0,0]; byLesson[L][t]++;
  if(samples[t].length<(t===0?200:12)) samples[t].push('L'+q.lesson+' '+q.topic+'｜'+q.q+(q.zh?'｜'+q.zh:''));
});
console.log('fill 總數', fills.length, '｜tier2 句子＋中文', cnt[2], '｜tier1 句子無中文', cnt[1], '｜tier0 練習卡', cnt[0]);
console.log('\n課次  tier2 tier1 tier0');
Object.keys(byLesson).map(Number).sort(function(a,b){return a-b;}).forEach(function(L){
  var r=byLesson[L]; console.log(String(L).padStart(3), String(r[2]).padStart(6), String(r[1]).padStart(5), String(r[0]).padStart(5));
});
[0,1,2].forEach(function(t){ console.log('\n── tier'+t+' 樣本'); samples[t].forEach(function(s){ console.log('  '+s); }); });
/* topic 層級：大招在主線節點會鎖 topic，看哪些 topic 只有 tier0 */
var byTopic={};
fills.forEach(function(q){ var t=fillTier(q); byTopic[q.topic]=byTopic[q.topic]||[0,0,0]; byTopic[q.topic][t]++; });
var only0=Object.keys(byTopic).filter(function(k){ return byTopic[k][0]>0 && !byTopic[k][1] && !byTopic[k][2]; });
console.log('\n只有練習卡、沒有句子型的 topic（'+only0.length+'）：', only0.join('、')||'無');
