// Q49 全庫統計：選項翻譯與逐字稿切行的機械性問題（唯讀）
// 用法：node tools/tmp_q49_stats.js [--list]
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const DATA = path.join(ROOT, 'assets/tcf/exam/data');
const LIST = process.argv.includes('--list');

function reflowFr(s) {   // 同 mock.html reflowFr
  return String(s || '').split('\n').map(l => l.trim()).filter(Boolean).join(' ')
    .replace(/([.?!…])\s+(?=[«"A-ZÀ-Ý–—-])/g, '$1\n')
    .replace(/\s+(Question\s*\d)/g, '\n$1');
}

const files = fs.readdirSync(DATA).filter(f => /^co_\d+\.js$/.test(f))
  .sort((a, b) => parseInt(a.slice(3)) - parseInt(b.slice(3)));
const st = { tests: 0, qs: 0, withZh: 0, placeholder: 0, noZhReal: [], badLen: [], dupZh: [],
  emptyZh: [], optLeak: [], frTypo: [], halfPunct: 0, noSpaceQs: 0, noSpaceJoins: 0,
  cjkInScript: [], loneDash: 0, longLine: 0, lines: 0, splitQuestionNum: 0, abbrevSplit: [] };
const jsonSrc = JSON.parse(fs.readFileSync(path.join(ROOT, 'assets/tcf/exam/listening.json'), 'utf8'));
let jsonMismatch = 0, jsonCompared = 0;
const jsonMap = {};
(function walk(o) {
  if (!o || typeof o !== 'object') return;
  if (o.id && Array.isArray(o.questions)) { jsonMap[o.id] = o; return; }
  for (const k in o) walk(o[k]);
})(jsonSrc);

for (const f of files) {
  const src = fs.readFileSync(path.join(DATA, f), 'utf8');
  const m = src.match(/^TCF_LOAD\("([^"]+)",([\s\S]*)\);?\s*$/);
  const t = JSON.parse(m[2]); st.tests++;
  for (const q of t.questions) {
    st.qs++;
    const tag = t.id + ' Q' + q.q;
    const ph = /^(Proposition|Réponse) [a-d]$/.test(q.opts[0] || '');
    if (ph) st.placeholder++;
    if (!q.opts_zh) { if (!ph) st.noZhReal.push(tag); }
    else {
      st.withZh++;
      if (q.opts_zh.length !== q.opts.length) st.badLen.push(tag);
      if (new Set(q.opts_zh).size !== q.opts_zh.length) st.dupZh.push(tag);
      q.opts_zh.forEach((z, i) => { if (!String(z).trim()) st.emptyZh.push(tag + 'ABCD'[i]); });
      q.opts.forEach((o, i) => {
        if (/correct\s*answer|correctanswer|bonne réponse/i.test(o)) st.optLeak.push(tag + 'ABCD'[i] + '（答案=' + q.answer + '）：' + o);
      });
      if (q.opts_zh.some(z => /[,:;]/.test(z))) st.halfPunct++;
      const jt = jsonMap[t.id];
      const jq = jt && jt.questions.find(x => x.q === q.q);
      if (jq) { jsonCompared++; if (JSON.stringify(jq.opts_zh) !== JSON.stringify(q.opts_zh)) jsonMismatch++; }
    }
    if (!q.opts_zh || !q.script_fr) continue;
    const rf = reflowFr(q.script_fr);
    const joins = rf.match(/[a-zà-ÿ0-9][.?!](?=[A-ZÀ-Ýa-zà-ÿ])/g) || [];
    // 排除縮寫 / 網址 / 數字（如 M.Dupont 少見，主要是句點後沒空白）
    if (joins.length) { st.noSpaceQs++; st.noSpaceJoins += joins.length; }
    if (/[一-鿿]/.test(rf)) st.cjkInScript.push(tag);
    const lines = rf.split('\n');
    st.lines += lines.length;
    lines.forEach((l, i) => {
      if (/^[–—-]\s*$/.test(l)) st.loneDash++;
      if (l.length > 220) st.longLine++;
      if (/^Question\s*\d+\s*\.?\s*$/.test(l)) st.splitQuestionNum++;
      if (/\b(M|Mme|Dr|St|etc)\.$/.test(l)) st.abbrevSplit.push(tag + '：' + l.slice(-40));
    });
  }
}
const out = {
  套數: st.tests, 總題數: st.qs, 有選項翻譯: st.withZh, 佔位選項題: st.placeholder,
  真選項卻沒翻譯: st.noZhReal.length, 翻譯條數不等於選項數: st.badLen.length, 四個翻譯有重複: st.dupZh.length,
  空白翻譯: st.emptyZh.length, 選項法文混入答案標記: st.optLeak.length, 含半形標點的翻譯題: st.halfPunct,
  與listening_json不一致: jsonMismatch + '/' + jsonCompared,
  逐字稿含句點後沒空白而沒切開的題: st.noSpaceQs, 這類黏句處: st.noSpaceJoins,
  逐字稿混入中文: st.cjkInScript.length, 單獨一個破折號的行: st.loneDash,
  超過220字的長行: st.longLine + '/' + st.lines, 題號單獨成行: st.splitQuestionNum, 縮寫後誤切: st.abbrevSplit.length,
};
console.log(JSON.stringify(out, null, 1));
if (LIST) {
  console.log('\n真選項沒翻譯：', st.noZhReal.join(', '));
  console.log('\n條數不等：', st.badLen.join(', '));
  console.log('\n重複：', st.dupZh.join(', '));
  console.log('\n空白：', st.emptyZh.join(', '));
  console.log('\n答案標記混入：\n  ' + st.optLeak.join('\n  '));
  console.log('\n逐字稿混入中文：', st.cjkInScript.join(', '));
  console.log('\n縮寫誤切：\n  ' + st.abbrevSplit.join('\n  '));
}
