// 遊戲覆蓋盤點（2026-09-20，Owen：「盤點一下吧」）
// 唯讀：只讀資料檔，算「每一課的內容在遊戲裡有沒有出口」，⛔ 不寫任何資料。用法：node tools/audit_coverage.js
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const rd = f => fs.readFileSync(path.join(root, f), 'utf8');
function loadJs(f, names) {           // 讀 .js 檔（const→var 才拿得到）
  const ctx = {}; vm.createContext(ctx);
  vm.runInContext(rd(f).replace(/^const /gm, 'var ').replace(/^let /gm, 'var '), ctx);
  const o = {}; names.forEach(n => o[n] = ctx[n]); return o;
}
function loadBlock(f, startRe, name) { // 從 html 裡抓 `const X = [` … `];`（行首）那一塊
  const lines = rd(f).split('\n'); let s = lines.findIndex(l => startRe.test(l)); if (s < 0) return null;
  let e = s + 1; while (e < lines.length && !/^\];/.test(lines[e])) e++;
  const ctx = {}; vm.createContext(ctx);
  try { vm.runInContext(lines.slice(s, e + 1).join('\n').replace(/^const /, 'var '), ctx); } catch (err) { return null; }
  return ctx[name];
}
const { BANK } = loadJs('questions.js', ['BANK']);
const { SENTENCES } = loadJs('sentences.js', ['SENTENCES']);
const { CHUNKS } = loadJs('chunks.js', ['CHUNKS']);
const { STORY } = loadJs('story.js', ['STORY']);
const { GRAM_POINTS } = loadJs('gram_rules.js', ['GRAM_POINTS']);
const { WRITING_TASKS } = loadJs('writing_tasks.js', ['WRITING_TASKS']);
const TABLES = loadBlock('table_drill.html', /^const TABLES = \[/, 'TABLES') || [];
const ARTICLES = loadBlock('reading.html', /^const ARTICLES = \[/, 'ARTICLES') || [];
const LQ = loadBlock('listening.html', /^const LISTENING_BANK = \[/, 'LISTENING_BANK') || [];

const lessons = [...new Set(BANK.map(q => q.lesson).filter(Boolean))].sort((a, b) => a - b);
const maxL = Math.max(...lessons);
const okN = a => { const n = String(a).split('|')[0].replace(/[’‘]/g, "'").split(/\s+/).filter(t => /[A-Za-zÀ-ÿ0-9]/.test(t)).length; return n >= 3 && n <= 10; };
const sentLike = x => x && x.fr && x.zh && okN(x.fr) && !/\s\/\s|…|\.\.\.|→|[（(]/.test(x.fr);
const by = (arr, f) => { const o = {}; arr.forEach(x => { const k = f(x); if (k != null) (o[k] = o[k] || []).push(x); }); return o; };

const bq = by(BANK, q => q.lesson), sn = by(SENTENCES, x => x.lesson), ch = by(CHUNKS, x => x.lesson), tb = by(TABLES, t => t.lesson);
const wt = by(WRITING_TASKS, t => t.lesson || t.l);
// 主線：每章涵蓋的課
const storyLessons = {}; STORY.forEach(c => (c.lessons || []).forEach(l => storyLessons[l] = (storyLessons[l] || 0) + 1));
const storyTopics = new Set(); STORY.forEach(c => (c.nodes || []).forEach(n => n.topic && storyTopics.add(n.topic)));
const bankTopics = [...new Set(BANK.map(q => q.topic).filter(Boolean))];

const rows = lessons.map(l => {
  const qs = bq[l] || [], t = k => qs.filter(q => q.type === k).length;
  return { l, choose: t('choose'), fill: t('fill'), trans: t('trans'), gender: t('gender'),
    sent: (sn[l] || []).length, chunk: (ch[l] || []).length, tileOK: (ch[l] || []).filter(sentLike).length + (sn[l] || []).filter(sentLike).length + qs.filter(q => q.type === 'trans' && okN(q.a)).length,
    tables: (tb[l] || []).length, story: storyLessons[l] || 0 };
});
console.log('課次數', lessons.length, '最新課', maxL, '| BANK', BANK.length, 'SENTENCES', SENTENCES.length, 'CHUNKS', CHUNKS.length, 'TABLES', TABLES.length, 'STORY章', STORY.length, 'WRITING', WRITING_TASKS.length, 'ARTICLES', ARTICLES.length, 'LISTENING_BANK', LQ.length);
console.log('\n課 | choose fill trans gender | 句庫 筆記卡 可拼句 | 表格 | 主線章');
rows.forEach(r => console.log([r.l, r.choose, r.fill, r.trans, r.gender, r.sent, r.chunk, r.tileOK, r.tables, r.story].join('\t')));
const zero = f => rows.filter(f).map(r => r.l).join(',') || '（無）';
console.log('\n── 缺口 ──');
console.log('沒有 fill 題的課:', zero(r => !r.fill));
console.log('沒有 trans 題的課:', zero(r => !r.trans));
console.log('沒有 gender 題:', '共', rows.filter(r => !r.gender).length, '課沒有');
console.log('沒有句庫句子的課:', zero(r => !r.sent));
console.log('可拼句來源 <5 的課:', zero(r => r.tileOK < 5));
console.log('沒有表格的課:', zero(r => !r.tables));
console.log('主線沒覆蓋的課:', zero(r => !r.story));
const recent4 = lessons.slice(-4);
const oldQ = BANK.filter(q => recent4.indexOf(q.lesson) < 0).length;
console.log('\n── 今日地城可達性 ──');
console.log('地城題池＝最新 4 課', recent4.join(','), '的 choose 題:', BANK.filter(q => recent4.indexOf(q.lesson) >= 0 && q.type === 'choose' && q.opts && q.opts.length >= 3).length, '題');
console.log('不在最新 4 課的題:', oldQ, '/', BANK.length, '=', Math.round(oldQ / BANK.length * 100) + '%  → 這些只有「副本（手動點）」「塔（弱點）」「主線章」能碰到');
console.log('戰利品（loot）掉落來源也只有最新 4 課（除非主線／副本指定）');
console.log('\n── topic ──');
console.log('題庫 topic 數', bankTopics.length, '| 主線節點用到的 topic', storyTopics.size, '| 主線完全沒掛的 topic:', bankTopics.filter(t => !storyTopics.has(t)).length);
console.log('\n── 表格 ──');
const tt = by(TABLES, t => t.type); console.log('table_drill 表格', TABLES.length, '依類型', Object.keys(tt).map(k => k + ':' + tt[k].length).join(' '), '｜遊戲「填表」只涵蓋動詞時態（verbs_full.js 由 A1/A2 動詞產生），其他類型（冠詞／介係詞／形容詞／文法詞／詞彙）遊戲裡沒有出口');
console.log('\n── 四技能 ──');
console.log('閱讀：reading.html 文章', ARTICLES.length, '篇（遊戲裡沒有）；考試之塔閱讀題只在有 assets/tcf 的電腦上');
console.log('聽力：listening.html LISTENING_BANK', LQ.length, '題（遊戲裡沒有）；遊戲「看破」＝TTS 讀 SENTENCES', SENTENCES.length, '句、選中文');
console.log('寫作：writing_tasks.js', WRITING_TASKS.length, '個任務（遊戲裡沒有）');
console.log('口說：遊戲「吶喊」＝唸 SENTENCES（僅 Safari 有語音辨識）；t1_stock.js 24 個追問（遊戲裡沒有）');
