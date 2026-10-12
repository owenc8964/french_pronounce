/* 排程用：把 quest.html 裡沒有 src 的 <script> 區塊抽出來只編譯不執行（等同 node --check），
   用法：node tools/tmp_quest_syntax.js [檔名，預設 quest.html] */
var fs=require('fs'), vm=require('vm'), path=require('path');
var f=path.join(__dirname,'..',process.argv[2]||'quest.html');
var html=fs.readFileSync(f,'utf8'), re=/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g, m, n=0, bad=0;
while((m=re.exec(html))){
  n++;
  try{ new vm.Script(m[1],{filename:'inline#'+n}); }
  catch(e){ bad++; console.log('✗ inline#'+n+'：'+e.message); }
}
console.log((bad?'✗':'✓')+' '+path.basename(f)+'：inline script '+n+' 段，語法錯誤 '+bad);
process.exit(bad?1:0);
