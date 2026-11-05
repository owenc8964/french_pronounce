/* 各頁的答案比對（直接從 HTML 原檔撈函式）：
   ⭐ iPhone 鍵盤預設打出彎撇號 ’，題庫寫的是直撇號 '——兩種都要算對（HANDOFF 2026-10-29 報告記過 quest.html 這個冤枉） */
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { loadFunctions } = require('./helpers/browser');

test('quiz.html isCorrect：彎撇號、大小寫、標點、多解', () => {
  const f = loadFunctions('quiz.html', ['norm', 'isCorrect']);
  assert.equal(f.isCorrect('J’ai mangé.', "j'ai mangé"), true);
  assert.equal(f.isCorrect("  j'ai   mangé ", 'J’ai mangé'), true);
  assert.equal(f.isCorrect('premier', 'le premier|premier'), true);
  assert.equal(f.isCorrect('j’ai mange', "j'ai mangé"), false, '抽考要嚴格：重音不能少');
});

test('gram_trainer.html isCorrect 與 quiz.html 規則一致', () => {
  const f = loadFunctions('gram_trainer.html', ['norm', 'isCorrect']);
  assert.equal(f.isCorrect('qu’il', "qu'il"), true);
  assert.equal(f.isCorrect('Qu’il vienne !', "qu'il vienne"), true);
});

test('table_drill.html norm：彎撇號統一成直撇號', () => {
  const f = loadFunctions('table_drill.html', ['norm']);
  assert.equal(f.norm(' J’AI  '), f.norm("j'ai"));
  assert.equal(f.norm('l‘ami'), "l'ami");
});

test('quest.html normAns：去重音、去標點、彎撇號不冤枉', () => {
  const f = loadFunctions('quest.html', ['deacc', 'normAns']);
  assert.equal(f.normAns('Qu’il vienne.'), f.normAns("qu'il vienne"));
  assert.equal(f.normAns('Élève  à  Paris !'), 'eleve a paris');
});

test('town.html normAns：彎撇號統一', () => {
  const f = loadFunctions('town.html', ['deacc', 'normAns']);
  assert.equal(f.normAns('J’ai été'), f.normAns("j'ai ete"));
});

test('verb_sprint.html normalize：去重音、去開頭代名詞與 que', () => {
  const f = loadFunctions('verb_sprint.html', ['normalize']);
  assert.equal(f.normalize('J’ai mangé'), f.normalize('ai mange'));
  assert.equal(f.normalize("qu'il soit"), 'soit');
  assert.equal(f.normalize('que je sois'), 'sois');
  assert.equal(f.normalize('nous allons'), 'allons');
});
