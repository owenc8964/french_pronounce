// gen_topic_labels.js — 從 dashboard.html 的 TOPIC_LABELS（法文標籤）產生 topic_labels.js，給 quest.html（遊戲）用
// 2026-09-14 B8：試煉之塔每一層是一個弱點結構，要顯示結構名稱；遊戲介面走法文，所以取 dashboard 的法文版
// （quiz.html 另有一份中文版 TOPIC_LABELS）。
// ⚠️ 新課入庫、dashboard 加了新 topic 標籤之後重跑：node tools/gen_topic_labels.js
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const s = fs.readFileSync(path.join(root, 'dashboard.html'), 'utf8');
const head = 'const TOPIC_LABELS = ';
const i = s.indexOf(head + '{'), j = s.indexOf('\n};', i);
if (i < 0 || j < 0) { console.error('找不到 dashboard.html 的 TOPIC_LABELS'); process.exit(1); }
const obj = eval('(' + s.slice(i + head.length, j + 2) + ')');
const out = '/* 自動產生，勿手改：node tools/gen_topic_labels.js（來源：dashboard.html 的 TOPIC_LABELS） */\n' +
            'var TOPIC_LABELS_FR = ' + JSON.stringify(obj, null, 1) + ';\n';
fs.writeFileSync(path.join(root, 'topic_labels.js'), out);
console.log('✓ topic_labels.js，' + Object.keys(obj).length + ' 個 topic');
