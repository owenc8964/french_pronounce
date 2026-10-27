// Q17（2026-10-27）：核對 island_upgrades.js——原句是否真在島上、標的招式 pattern 有沒有命中、其他已學招式是否也命中（四選一可能有兩個對的）
// 用法：node tools/tmp_q17_check_islands.js
const fs=require('fs'),path=require('path'),R=path.join(__dirname,'..')+'/';
eval(fs.readFileSync(R+'upgrade_moves.js','utf8').replace('var UPGRADE_MOVES','global.UPGRADE_MOVES'));
eval(fs.readFileSync(R+'island_upgrades.js','utf8').replace('var ISLAND_UPGRADES','global.ISLAND_UPGRADES'));
eval(fs.readFileSync(R+'answer_cards.js','utf8').replace('const ANSWER_CARDS','global.ANSWER_CARDS'));
const n=s=>String(s).replace(/[’]/g,"'").replace(/\s+/g,' ').trim();
for(const u of ISLAND_UPGRADES){
  const id=u.ref.split(':')[0], card=ANSWER_CARDS.find(c=>c.id===id);
  const v=card?card.versions[card.versions.length-1]:null, txt=v?n(v.fr):'';
  const inB=txt.includes(n(u.base)), inB2=u.base2?txt.includes(n(u.base2)):null;
  const mv=UPGRADE_MOVES.find(m=>m.id===u.move);
  const hitUp=mv&&mv.pattern?new RegExp(mv.pattern,'i').test(u.up):null;
  const hitBase=mv&&mv.pattern?new RegExp(mv.pattern,'i').test(u.base+' '+(u.base2||'')):null;
  const also=UPGRADE_MOVES.filter(m=>m.taught&&m.id!==u.move&&m.pattern&&new RegExp(m.pattern,'i').test(u.up)&&!new RegExp(m.pattern,'i').test(u.base+' '+(u.base2||''))).map(m=>m.id);
  console.log([u.ref,u.move,'taught='+(mv&&mv.taught),'base在島='+inB,'base2在島='+inB2,'招式命中升級版='+hitUp,'原句已命中='+hitBase,'其他已學招式新命中='+(also.join(',')||'-'), 'ver='+(v&&v.level)].join('\t'));
}
console.log('taught moves:', UPGRADE_MOVES.filter(m=>m.taught).length);
