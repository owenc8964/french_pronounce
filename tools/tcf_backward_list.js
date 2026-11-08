#!/usr/bin/env node
// tcf_backward_list.js — 從 TCF 聽讀題庫回推「還沒學、又常擋路」的字與句型（GAME_ROADMAP D8，2026-11-09）
//
// 跑法：node tools/tcf_backward_list.js          印候選（給人看，用來補中文）
//       node tools/tcf_backward_list.js --write  依 tools/tcf_backward_gloss.json 產出 drafts/tcf_backward_list.md
//
// ⚠️ 語料只用 Test 1–34（＋兩套 Sample）：Test 35–44 留給 2027-04 診斷考（PLAN_TCF_2026-11 第二節），不拿來回推。
// ⚠️ 閱讀的短文是圖片，只算得到題幹與選項；聽力才有完整原文。
// ⛔ 輸出只放字、句型與次數，不放考題句子（repo 公開，assets/tcf/ 不外流）。

const fs = require('fs');
const WRITE = process.argv.includes('--write');

// ── 題號 → 等級（跟 mock.html 的 LEVELS 同一張表）──
const LEVELS = [['A1', 1, 4], ['A2', 5, 10], ['B1', 11, 19], ['B2', 20, 29], ['C1', 30, 35], ['C2', 36, 39]];
const BANDS = LEVELS.map(l => l[0]);
const bandOf = n => (LEVELS.find(l => n >= l[1] && n <= l[2]) || ['?'])[0];

const noAcc = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/œ/g, 'oe').replace(/æ/g, 'ae');

// ── 切字：去省音、拆連字號 ──
const ELISION = /^(?:l|d|j|n|s|t|m|c|qu|jusqu|lorsqu|puisqu|quelqu)'/;
function tokens(text) {
  const out = [];
  for (const raw of (text.replace(/’/g, "'").match(/[A-Za-zÀ-ÿœŒæ'-]+/g) || [])) {
    for (let part of raw.split('-')) {
      const lower = part.toLowerCase().replace(ELISION, '').replace(/^'+|'+$/g, '');
      if (lower.length < 2 || lower.includes("'")) continue;
      const capital = /^[A-ZÀ-Þ]/.test(part.replace(/^[a-z]+'/i, ''));
      out.push({ w: lower, capital });
    }
  }
  return out;
}

// ── 字族：把變位、性數變化併成同一個鍵（沒有 NLP 套件，規則法，會有少量誤併）──
const ENDINGS = ['issaient', 'issions', 'issent', 'issant', 'issons', 'issez', 'eraient', 'erions', 'eriez', 'erons', 'erait', 'erais', 'eront', 'aient',
  'antes', 'ante', 'ants', 'ents', 'erez', 'eras', 'erai', 'era', 'ant', 'ent', 'ons', 'ais', 'ait', 'ees', 'ee', 'es', 'ez', 'er', 'ir', 'is', 'it', 'e', 's', 'x'];
function stem(word) {
  let w = noAcc(word);
  if (w.length >= 6) w = w.replace(/euses?$/, '').replace(/eux$/, '');
  w = w.replace(/ives?$/, 'if').replace(/ifs$/, 'if').replace(/([^e])aux$/, '$1al').replace(/ennes?$/, 'en');
  for (const e of ENDINGS) {
    if (w.endsWith(e) && w.length - e.length >= 3) return w.slice(0, -e.length);
  }
  return w;
}

// ── 考題語料 ──
const L = JSON.parse(fs.readFileSync('assets/tcf/exam/listening.json', 'utf8'));
const R = JSON.parse(fs.readFileSync('assets/tcf/exam/reading.json', 'utf8'));
const reserved = t => { const n = parseInt(t.test, 10); return n >= 35 && n <= 44; };
const PLACEHOLDER = /^(proposition|réponse|reponse)\s+[a-d]$/i;

const units = [], seen = new Set();
let dropped = 0, reservedQ = 0;
for (const [src, skill] of [[L, 'CO'], [R, 'CE']]) {
  for (const t of src.tests) {
    if (reserved(t)) { reservedQ += t.questions.length; continue; }
    for (const q of t.questions) {
      const opts = (q.opts || []).filter(o => o && !PLACEHOLDER.test(o.trim()));
      const text = [q.script_fr || '', q.stem || '', opts.join(' ')].join(' \n ')
        .replace(/[–-]?\s*(Écoutez|Ecoutez|Choisissez)\b[^.\n]*[.\n]/g, ' ')   // 考試指示語不算內容
        .replace(/[–-]?\s*答案是[^\n]*/g, ' ').replace(/\bQuestion\s+\d+\b/gi, ' ');
      const key = skill + noAcc(text.toLowerCase()).replace(/[^a-z]/g, '');
      if (key.length < 12) continue;
      if (seen.has(key)) { dropped++; continue; }
      seen.add(key);
      units.push({ test: t.test, skill, band: bandOf(q.q), text });
    }
  }
}

// ── Owen 學過的東西 ──
function learnedText(file) {
  let s = fs.readFileSync(file, 'utf8');
  if (file.endsWith('.html')) s = s.replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ');
  return s.replace(/&nbsp;/g, ' ').replace(/&#?\w+;/g, ' ');
}
const LEARNED = ['french_notes.html', 'chunks.js', 'sentences.js', 'questions.js', 'verbs_full.js', 'answer_cards.js', 't1_stock.js', 'isle_more.js'];
const learned = LEARNED.map(learnedText).join('\n');
const knownForm = new Set(), knownStem = new Set();
for (const { w } of tokens(learned)) { knownForm.add(noAcc(w)); knownStem.add(stem(w)); }
const articleStem = new Set(tokens(learnedText('reading_articles.js')).map(x => stem(x.w)));
const learnedPlain = ' ' + noAcc(learned.replace(/’/g, "'").toLowerCase()).replace(/[.,;:!?«»"()\/]/g, ' ').replace(/\s+/g, ' ') + ' ';

// 課本上過的範圍（Édito A1、A2 全本與練習本，B1 到 p.42）：出現過但沒進筆記的字，標「課本見過」
const bookStem = new Set(), bookNames = new Map();
{
  const parts = fs.readFileSync('assets/.textbook_cache.txt', 'utf8').split(/^===== \[(.+?)\] page (\d+) =====$/m);
  for (let i = 1; i + 2 < parts.length; i += 3) {
    const [name, page, body] = [parts[i], +parts[i + 1], parts[i + 2]];
    bookNames.set(name, (bookNames.get(name) || 0) + 1);
    const covered = /[EÉé]dito.*A[12]/i.test(name) || (/[EÉé]dito.*B1/i.test(name) && page <= 42);
    if (covered) for (const { w } of tokens(body)) bookStem.add(stem(w));
  }
}

// ── 數字族 ──
const fam = new Map();
units.forEach((u, i) => {
  for (const { w, capital } of tokens(u.text)) {
    const k = stem(w);
    if (!fam.has(k)) fam.set(k, { k, forms: new Map(), n: 0, caps: 0, qs: new Set(), tests: new Set(), band: {}, skill: {} });
    const f = fam.get(k);
    f.forms.set(w, (f.forms.get(w) || 0) + 1);
    f.n++;
    if (capital) f.caps++;
    if (!f.qs.has(i)) {
      f.qs.add(i);
      f.band[u.band] = (f.band[u.band] || 0) + 1;
      f.skill[u.skill] = (f.skill[u.skill] || 0) + 1;
    }
    f.tests.add(u.test);
  }
});

// 等級：最低的、佔該字出現題數至少四分之一（且 ≥2 題）的那一級
function levelOf(f) {
  const df = f.qs.size;
  for (const b of BANDS) if ((f.band[b] || 0) >= Math.max(2, df / 4)) return b;
  return BANDS.reduce((best, b) => ((f.band[b] || 0) > (f.band[best] || 0) ? b : best), 'A1');
}
function headword(f) {
  const forms = [...f.forms.entries()].sort((a, b) => b[1] - a[1]);
  const inf = forms.find(([w]) => /(er|ir|re)$/.test(w) && w.length > 4);
  return inf && inf[1] >= forms[0][1] / 4 ? inf[0] : forms[0][0];
}

const rows = [...fam.values()].filter(f => {
  if (knownStem.has(f.k)) return false;
  if ([...f.forms.keys()].some(w => knownForm.has(noAcc(w)))) return false;
  if (f.qs.size < 3 || f.tests.size < 2) return false;
  if (f.caps / f.n >= 0.6) return false;              // 專有名詞（人名、地名）
  return f.k.length >= 3;
}).map(f => ({ ...f, head: headword(f), level: levelOf(f), df: f.qs.size }));
rows.sort((a, b) => b.df - a.df || b.n - a.n);

// ── 句型：n-gram ＋ 候選清單（候選只是搜尋鍵，留下的都要在考題裡真的出現）──
const plain = units.map(u => ' ' + noAcc(u.text.replace(/’/g, "'").toLowerCase()).replace(/[.,;:!?«»"()]/g, ' ').replace(/\s+/g, ' ') + ' ');
const gram = new Map();
plain.forEach((p, i) => {
  const ws = p.trim().split(' ');
  const here = new Set();
  for (let n = 2; n <= 4; n++) for (let j = 0; j + n <= ws.length; j++) here.add(ws.slice(j, j + n).join(' '));
  for (const g of here) {
    if (!gram.has(g)) gram.set(g, { g, qs: 0, tests: new Set() });
    const x = gram.get(g);
    x.qs++;
    x.tests.add(units[i].test);
  }
});
const patternStat = key => {
  // 鍵可用 | 列出變形；結尾是省音（d'）的，比對時後面不補空白
  const needles = key.split('|').map(k => ' ' + noAcc(k.toLowerCase()) + (k.endsWith("'") ? '' : ' '));
  const band = {};
  let df = 0;
  const tests = new Set();
  plain.forEach((p, i) => { if (needles.some(n => p.includes(n))) { df++; band[units[i].band] = (band[units[i].band] || 0) + 1; tests.add(units[i].test); } });
  return { df, band, tests: tests.size, known: needles.some(n => learnedPlain.includes(n)) };
};

if (!WRITE) {
  console.log([...bookNames.entries()].map(([k, v]) => `${k}:${v}`).join(' ｜ '));
  console.log(`語料：${units.length} 題（去重 ${dropped}；Test 35–44 保留未算 ${reservedQ} 題）`);
  console.log(`其中課本見過的：${rows.filter(r => bookStem.has(r.k)).length}`);
  console.log(`還沒學的字族（≥3 題、≥2 套）：${rows.length}`);
  for (const b of BANDS) {
    const g = rows.filter(r => r.level === b);
    console.log(`\n== ${b}：${g.length} 個 ==`);
    console.log(g.filter(r => !bookStem.has(r.k)).slice(0, 110).map(r => `${r.head}(${r.df})`).join(' '));
    console.log('  〔課本見過〕' + g.filter(r => bookStem.has(r.k)).slice(0, 50).map(r => `${r.head}(${r.df})`).join(' '));
  }
  const fnStart = /^(de|du|des|le|la|les|un|une|et|a|au|aux|en|je|il|elle|on|nous|vous|ils|ce|ca|que|qui|pour|dans|sur|par|est|ne|pas|se|mais)\b/;
  const grams = [...gram.values()].filter(x => x.qs >= 12 && x.tests.size >= 5 && !learnedPlain.includes(' ' + x.g + ' ')).sort((a, b) => b.qs - a.qs);
  console.log('\n== 學過的語料裡沒有的詞組（高頻 220）==');
  console.log(grams.slice(0, 220).map(x => `${x.g}(${x.qs})`).join(' | '));
  process.exit(0);
}

// ── --write：產出草稿（字與中文來自 gloss，題數一律現算）──
const G = JSON.parse(fs.readFileSync('tools/tcf_backward_gloss.json', 'utf8'));
const bandCell = f => BANDS.map(b => f.band[b] || 0).join('／');
const byHead = new Map(rows.map(r => [r.head, r]));
const missing = [], items = [];
for (const e of G.items) {
  const r = byHead.get(e.w);
  if (r) items.push({ e, r }); else missing.push(e.w);
}
const forms = r => [...r.forms.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(x => x[0]).join(' ');
if (process.argv.includes('--forms')) for (const { e, r } of items) console.log(`${e.w} [${r.level}] ${r.df}: ${forms(r)}`);

const HEAD = '| 字 | 中文 | 題數 | 各級題數 A1／A2／B1／B2／C1／C2 | 怎麼背 |\n|---|---|---:|---|---|';
const out = [G.header.join('\n')
  .replace('{UNITS}', units.length).replace('{DROPPED}', dropped).replace('{RESERVED}', reservedQ).replace('{ROWS}', rows.length)];
for (const s of G.sections) {
  const g = items.filter(x => s.bands.includes(x.r.level)).sort((a, b) => b.r.df - a.r.df);
  out.push(`## ${s.title}（${g.length} 個）`, '', s.note, '', HEAD);
  for (const { e, r } of g) out.push(`| ${e.show || e.w}${bookStem.has(r.k) ? ' ·課本見過' : ''} | ${e.zh} | ${r.df} | ${bandCell(r)} | ${e.how || '聽懂'} |`);
  out.push('');
}
const pats = [];
for (const p of G.patterns) {
  const st = patternStat(p.key);
  if (st.df < 3 || st.known) { missing.push(p.key.split('|')[0] + (st.known ? '（已學）' : `（只有 ${st.df} 題）`)); continue; }
  pats.push({ p, st });
}
pats.sort((a, b) => ((b.st.band.B1 || 0) + (b.st.band.B2 || 0)) - ((a.st.band.B1 || 0) + (a.st.band.B2 || 0)));
out.push(`## 句型（${pats.length} 個）`, '', G.pattern_note, '', HEAD.replace('| 字 |', '| 句型 |'));
for (const { p, st } of pats) out.push(`| ${p.show || p.key} | ${p.zh} | ${st.df} | ${bandCell(st)} | ${p.how || '聽懂'} |`);
out.push('', G.footer.join('\n'));
fs.writeFileSync('drafts/tcf_backward_list.md', out.join('\n'));
console.log(`寫入 drafts/tcf_backward_list.md：字 ${items.length}、句型 ${pats.length}`);
console.log('對不上或已學而略過：', missing.length ? missing.join('、') : '無');
