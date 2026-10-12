/* B11 驗證：從 quest.html 抽出 fillTier／fillClean 原始碼，對 questions.js 跑，跟 tmp_fill_quality.js 的數字比對 */
var fs=require('fs'), vm=require('vm'), path=require('path');
var root=path.join(__dirname,'..')+'/';
var html=fs.readFileSync(root+'quest.html','utf8');
var a=html.indexOf('function fillTier(q){'), b=html.indexOf('function battleQSkip(){');
var code=html.slice(a,b);
var ctx={}; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(root+'questions.js','utf8')+';this.__B=(typeof QUESTIONS!=="undefined"?QUESTIONS:BANK);'+code+';this.fillTier=fillTier;this.fillClean=fillClean;',ctx);
var fills=ctx.__B.filter(function(q){return q.type==='fill';}), c=[0,0,0];
fills.forEach(function(q){ c[ctx.fillTier(q)]++; });
console.log('quest.html fillTier：', fills.length, c);
console.log('fillClean 全是0時保留：', ctx.fillClean([{q:'venir 變位：il _____'}]).length===1);
console.log('fillClean 混合時去掉0：', ctx.fillClean([{q:'venir 變位：il _____'},{q:'Je _____ (être) taïwanais.',zh:'我是台灣人。'}]).length===1);
