// Q58 模考 Test 17–24 中文詳解潤飾抽查：固定種子抽樣，輸出精簡內容供人工核對（唯讀，不改資料）
// 用法：node tools/tmp_q58_sample.js keys | sample
const fs = require('fs');
const path = require('path');
const BASE = path.join(__dirname, '..', 'assets', 'tcf', 'exam');
const SEED = 20261119;
const N_PER_SKILL = 28; // 聽力 28 + 閱讀 28 = 56 題

function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function load(skill) {
  return JSON.parse(fs.readFileSync(path.join(BASE, skill + '.json'), 'utf8'));
}

const mode = process.argv[2] || 'sample';
const L = load('listening'), R = load('reading');

if (mode === 'keys') {
  for (const d of [L, R]) {
    const t = d.tests.find(x => x.test === '17');
    console.log(d.skill, d.tests.map(x => x.id).join(','));
    const q = t.questions[30];
    const o = {};
    for (const k of Object.keys(q)) if (k !== 'tok') o[k] = q[k];
    console.log(JSON.stringify(o, null, 1).slice(0, 4000));
    console.log('top-level test keys', Object.keys(t));
  }
  process.exit(0);
}

if (mode === 'show') {
  // node tools/tmp_q58_sample.js show co_17 15,16 → 印出該題 script_zh 末段／key_zh
  const id = process.argv[3], qs = (process.argv[4] || '').split(',').map(Number);
  const d = id.startsWith('co') ? L : R;
  const t = d.tests.find(x => x.id === id);
  for (const q of t.questions) if (qs.includes(q.q)) {
    const z = q.script_zh || q.key_zh || '';
    console.log(`--- ${id} Q${q.q} ans=${q.answer}\n` + z.slice(-260));
  }
  process.exit(0);
}

if (mode === 'check') {
  // 全量機械檢查 Test 17–24：答案字母一致、引用的法文片段是否出現在原文/選項
  const norm = s => (s || '').toLowerCase().replace(/[’']/g, "'").replace(/[^a-zà-ÿœæç0-9']+/g, ' ').trim();
  let n = 0;
  const bad = [];
  for (const d of [L, R]) for (const t of d.tests) {
    if (!/^(co|ce)_(1[7-9]|2[0-4])$/.test(t.id)) continue;
    for (const q of t.questions) {
      n++;
      const tag = `${t.id} Q${q.q}`;
      let expl = '';
      if (d.skill === 'listening') {
        const m = (q.script_zh || '').match(/答案(?:是)?\s*([A-D])/);
        if (!m) bad.push(`${tag} 找不到「答案X」`);
        else if (m[1] !== q.answer) bad.push(`${tag} 答案字母 ${m[1]} ≠ ${q.answer}`);
        expl = q.script_zh || '';
      } else {
        const m = (q.ans_zh || '').match(/^\s*([A-D])/);
        if (!m) bad.push(`${tag} ans_zh 無字母`);
        else if (m[1] !== q.answer) bad.push(`${tag} ans_zh 字母 ${m[1]} ≠ ${q.answer}`);
        expl = (q.key_zh || '') + '\n' + (q.opt_zh || '');
      }
      const src = norm((q.script_fr || '') + ' ' + (q.text_fr || '') + ' ' + (q.opts || []).join(' ') + ' ' + (q.stem || ''));
      const quotes = [...expl.matchAll(/[«"]\s*([^»"]{6,}?)\s*[»"]/g)].map(x => x[1]);
      for (const qt of quotes) {
        const parts = qt.split(/\.\.\.|…/).map(norm).filter(p => p.length >= 6);
        for (const p of parts) if (!src.includes(p)) bad.push(`${tag} 引文不在原文：«${qt.slice(0, 90)}»`);
      }
    }
  }
  console.log('checked', n);
  console.log(bad.join('\n'));
  process.exit(0);
}

const rnd = mulberry32(SEED);
const pick = (skill, d) => {
  const pool = [];
  for (const t of d.tests) {
    if (!/^(1[7-9]|2[0-4])$/.test(String(t.test))) continue;
    for (const q of t.questions) pool.push({ id: t.id, q });
  }
  // Fisher–Yates with seeded rnd
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return { total: pool.length, chosen: pool.slice(0, N_PER_SKILL).sort((a, b) => a.id.localeCompare(b.id, 'en', { numeric: true }) || a.q.q - b.q.q) };
};

const out = [];
for (const [skill, d] of [['listening', L], ['reading', R]]) {
  const { total, chosen } = pick(skill, d);
  out.push(`## ${skill} pool=${total} chosen=${chosen.length}`);
  for (const { id, q } of chosen) {
    const o = {};
    for (const k of Object.keys(q)) if (!['tok', 'tok_opts', 'tok_text', 'cues'].includes(k) && !/^tok/.test(k)) o[k] = q[k];
    out.push(`### ${id} Q${q.q}`);
    out.push(JSON.stringify(o, null, 1));
  }
}
console.log(out.join('\n'));
