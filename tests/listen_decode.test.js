/* listen_decode.js：逐字稿清理——⛔ 答案與中文不能印到畫面上，也不能被挖成空格 */
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { loadFunctions } = require('./helpers/browser');

const f = loadFunctions('listen_decode.js', ['cleanScript', 'norm']);

test('cleanScript：切掉 Question／答案是／Réponse 之後的內容', () => {
  assert.equal(f.cleanScript('Bonjour, je voudrais un café.\nQuestion 3 : Que veut-il ?'), 'Bonjour, je voudrais un café.');
  assert.equal(f.cleanScript('Il part demain. Question : Quand ?'), 'Il part demain.');
  assert.equal(f.cleanScript('Elle arrive à huit heures. 答案是 B'), 'Elle arrive à huit heures.');
  assert.equal(f.cleanScript('On se voit lundi. Réponse : A'), 'On se voit lundi.');
});

test('cleanScript：整行中文拿掉、結尾破折號拿掉、空值不炸', () => {
  assert.equal(f.cleanScript('Salut !\n這是中文說明\nÇa va ? –'), 'Salut !\nÇa va ?');
  assert.equal(f.cleanScript(null), '');
  assert.equal(f.cleanScript(undefined), '');
});

test('norm：只看聽到什麼——去重音、大小寫、彎撇號', () => {
  assert.equal(f.norm(' L’Été '), "l'ete");
  assert.equal(f.norm(null), '');
});
