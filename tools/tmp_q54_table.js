// Q54：產生第51課 chunks 逐條總表（markdown，印到 stdout；唯讀）
// 用法：node tools/tmp_q54_table.js
const { execFileSync } = require('child_process');
const path = require('path');
const out = execFileSync('node', [path.join(__dirname, 'tmp_q54_check_l51.js'), 'chunks'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
const mark = { 111: '✗', 107: '⚠️', 108: '⚠️', 109: '⚠️', 110: '⚠️', 112: '⚠️', 24: '⚠️', 37: '⚠️', 81: '⚠️', 102: '⚠️', 43: '⚠️', 30: '⚠️' };
out.trim().split('\n').forEach(l => {
  const [id, , line, bp, fr, zh] = l.split('\t');
  const n = +id.split('#')[1];
  console.log(`| ${id} | ${fr.replace(/\|/g, '\\|')} | ${zh} | ${mark[n] || '✓'} | ${line} | ${bp === '-' ? '—' : 'p.' + bp} |`);
});
