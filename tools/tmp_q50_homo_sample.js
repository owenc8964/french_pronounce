// Q50 補充：同音異拼候選抽樣（人工判斷用）＋找出整句照打唯一失敗的那題
// 用法：先跑 node tools/tmp_q50_judge.js（產生 tools/tmp_q50_out.json），再跑本檔
var path=require('path'), fs=require('fs');
var o=JSON.parse(fs.readFileSync(path.join(__dirname,'tmp_q50_out.json'),'utf8'));
// 固定種子抽 40 題，避免每次不同
var seed=50; function rnd(){ seed=(seed*1103515245+12345)%2147483648; return seed/2147483648; }
var h=o.homo.slice(); for(var i=h.length-1;i>0;i--){ var j=Math.floor(rnd()*(i+1)); var t=h[i]; h[i]=h[j]; h[j]=t; }
h.slice(0,40).forEach(function(x,k){ console.log((k+1)+'. ['+x.id+'] '+x.q+'  →答 '+x.w+'  候選：'+x.vs.join(' / ')); });
// 括號、整句失敗
var a=require(path.join(__dirname,'..','assets/didier/clips_a2.json')).concat(require(path.join(__dirname,'..','assets/didier/clips_b1.json')));
console.log('\n含括號的片段：'); a.filter(function(c){ return /\(/.test(c.text); }).slice(0,10).forEach(function(c){ console.log('  ['+c.id+'] '+c.text); });
