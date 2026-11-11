// Q48 一次性稽核：課本聽力 B1 題目對照課本快取與逐字稿。只讀不寫。
// 用法：node tools/tmp_q48_b1_check.js <模式> [參數]
const fs = require('fs'), path = require('path');
const ROOT = path.dirname(__dirname);
const CACHE = path.join(ROOT, 'assets/.textbook_cache.txt');
const QF = path.join(ROOT, 'assets/didier/_local/questions_b1.json');
const TF = path.join(ROOT, 'assets/didier/_local/b1.json');
function loadPages() {
  const pages = []; let cur = null;
  const lines = fs.readFileSync(CACHE, 'utf8').split('\n');
  lines.forEach((ln, i) => {
    const m = ln.match(/^===== \[(.+?)\] page (\d+) =====/);
    if (m) { cur = { book: m[1], p: +m[2], start: i + 1, lines: [] }; pages.push(cur); return; }
    if (cur) cur.lines.push(ln);
  });
  return pages;
}
const norm = s => (s || '').normalize('NFC').replace(/[’‘]/g, "'").replace(/[«»]/g, '"').replace(/[  ]/g, ' ').replace(/œ/g, 'oe').replace(/\s+/g, ' ').trim().toLowerCase();
const mode = process.argv[2] || 'books';
if (mode === 'books') {
  const c = {}; loadPages().forEach(p => c[p.book] = (c[p.book] || 0) + 1); console.log(c);
} else if (mode === 'qsummary') {
  const Q = JSON.parse(fs.readFileSync(QF, 'utf8')); const T = JSON.parse(fs.readFileSync(TF, 'utf8'));
  console.log('tracks', Object.keys(Q).length, Array.isArray(T) ? 'T list ' + T.length : 'T obj');
  if (Array.isArray(T)) console.log(Object.fromEntries(Object.entries(T[0]).map(([k, v]) => [k, typeof v === 'string' ? v.slice(0, 80) : v])));
  let tot = 0;
  for (const [k, v] of Object.entries(Q)) {
    const n = v.rounds.reduce((a, r) => a + r.qs.length, 0); tot += n;
    const keys = new Set(); v.rounds.forEach(r => r.qs.forEach(q => Object.keys(q).forEach(x => keys.add(x))));
    console.log(k, 'p' + v.page, v.rounds.map(r => r.label).join('|'), 'n' + n, [...keys].join(','), Object.keys(v).filter(x => !['page', 'rounds'].includes(x)).join(','));
  }
  console.log('total', tot);
} else if (mode === 'page') {
  const book = process.argv[3]; const ps = process.argv.slice(4).map(Number);
  loadPages().filter(p => p.book.includes(book) && ps.includes(p.p)).forEach(p => {
    console.log('#', p.book, 'p' + p.p, 'L' + p.start);
    p.lines.forEach((ln, j) => { if (ln.trim()) console.log(p.start + 1 + j, ln); });
  });
} else if (mode === 'grep') {
  const re = new RegExp(process.argv[3], 'i'); const book = process.argv[4] || '';
  loadPages().filter(p => p.book.includes(book)).forEach(p => p.lines.forEach((ln, j) => { if (re.test(ln)) console.log(p.book.slice(0, 30), 'p' + p.p, 'L' + (p.start + 1 + j), ln.slice(0, 200)); }));
} else if (mode === 'track') {
  const Q = JSON.parse(fs.readFileSync(QF, 'utf8'));
  process.argv.slice(3).forEach(t => {
    const v = Q[t]; if (!v) { console.log('NO', t); return; }
    console.log(`=== track ${t} p${v.page}` + (v.note ? ' NOTE:' + v.note : ''));
    Object.keys(v).filter(x => !['page', 'rounds', 'note'].includes(x)).forEach(x => console.log('  extra', x, JSON.stringify(v[x])));
    v.rounds.forEach(r => {
      console.log(' [' + r.label + ']' + (r.note ? ' note:' + r.note : ''));
      r.qs.forEach((q, i) => {
        console.log(`  ${i}. ${q.q}`);
        if (q.opts) console.log('     opts: ' + q.opts.map((o, j) => 'ABCDEFGHIJ'[j] + '.' + o).join(' / ') + '  ans=' + JSON.stringify(q.ans) + (typeof q.ans === 'number' ? '(' + 'ABCDEFGHIJ'[q.ans] + ')' : ''));
        console.log('     a: ' + q.a + (q.note ? '  NOTE: ' + q.note : ''));
        Object.keys(q).filter(x => !['q', 'zh', 'opts', 'ans', 'a', 'ev', 'note'].includes(x)).forEach(x => console.log('     ' + x + ': ' + JSON.stringify(q[x])));
      });
    });
  });
} else if (mode === 'transcript') {
  const T = JSON.parse(fs.readFileSync(TF, 'utf8'));
  process.argv.slice(3).forEach(t => { const x = T.find(e => String(e.n ?? e.track ?? e.id) === t || String(e.f || '').includes('_' + t.padStart(2, '0'))); console.log('=== T', t, x ? JSON.stringify(Object.fromEntries(Object.entries(x).filter(([k]) => k !== 'text'))) : 'NONE'); if (x) console.log(x.text); });
} else if (mode === 'match') {
  // 題幹／選項是否出現在課本該頁（含前後一頁）。比對前去標點、去空白。
  const Q = JSON.parse(fs.readFileSync(QF, 'utf8'));
  const pages = loadPages().filter(p => p.book === 'Edito.B1.Owen.pdf');
  const sq = s => norm(s).replace(/[^a-z0-9àâäçéèêëîïôöùûüÿ]/g, '');
  const pt = {}; pages.forEach(p => pt[p.p] = (pt[p.p] || '') + sq(p.lines.join(' ')));
  let ok = 0, bad = 0, ook = 0, obad = 0;
  for (const [k, v] of Object.entries(Q)) {
    const txt = [v.page - 1, v.page, v.page + 1].map(x => pt[x] || '').join('|');
    v.rounds.forEach(r => r.qs.forEach((q, i) => {
      // 拆成片段：以 ? . ; 分段，每段 >=12 字元要能找到
      const segs = q.q.replace(/^Vrai ou faux ?\s*\?\s*/i, '').split(/[?;:]|\s[a-h]\.\s|^[a-h]\.\s/).map(sq).filter(s => s.length >= 12);
      const miss = segs.filter(s => !txt.includes(s));
      if (miss.length) { bad++; console.log('Q-MISS', k, 'p' + v.page, r.label, i, '|', q.q.slice(0, 120), '| missing', miss.length + '/' + segs.length); } else ok++;
      (q.opts || []).forEach((o, j) => {
        if (/^(vrai|faux)$/i.test(o)) return;
        const s = sq(o); if (s.length < 4) return;
        if (txt.includes(s)) ook++; else { obad++; console.log('OPT-MISS', k, i, 'ABCDEFGHIJ'[j], o.slice(0, 100)); }
      });
    }));
  }
  console.log({ ok, bad, ook, obad });
} else if (mode === 'order') {
  // 選項在課本該頁出現的先後順序，是否和資料的 A/B/C… 順序一致
  const Q = JSON.parse(fs.readFileSync(QF, 'utf8'));
  const pages = loadPages().filter(p => p.book === 'Edito.B1.Owen.pdf');
  const sq = s => norm(s).replace(/[^a-z0-9àâäçéèêëîïôöùûüÿ]/g, '');
  // 只取每頁第一份抽取（第一個 --- 之前），避免重複抽取造成順序混亂
  const pt = {}; pages.forEach(p => { const i = p.lines.indexOf('---'); pt[p.p] = sq((i > 0 ? p.lines.slice(0, i) : p.lines).join(' ')); });
  for (const [k, v] of Object.entries(Q)) {
    v.rounds.forEach(r => r.qs.forEach((q, i) => {
      if (!q.opts || q.opts.every(o => /^(vrai|faux)$/i.test(o))) return;
      const txt = pt[v.page] || '';
      const stem = sq(q.q).slice(0, 30); const from = Math.max(0, txt.indexOf(stem));
      const pos = q.opts.map(o => txt.indexOf(sq(o), from));
      const ok = pos.every((p, j) => p >= 0 && (j === 0 || p > pos[j - 1]));
      console.log(ok ? 'ORDER-OK ' : 'ORDER-?? ', k, i, pos.join(','), '|', q.q.slice(0, 60));
    }));
  }
} else if (mode === 'count') {
  // 有「1re écoute」的軌：數課本題號（單獨一行的數字、或「數字 + 大寫字開頭」），從 1re écoute 到下一個區塊標題為止
  const Q = JSON.parse(fs.readFileSync(QF, 'utf8'));
  const pages = loadPages().filter(p => p.book === 'Edito.B1.Owen.pdf');
  const used = {};
  for (const [k, v] of Object.entries(Q)) {
    if (!v.rounds.some(r => /écoute/.test(r.label) && /^\d/.test(r.label))) continue;
    const pg = pages.find(p => p.p === v.page); if (!pg) continue;
    const i0 = pg.lines.indexOf('---'); const L = i0 > 0 ? pg.lines.slice(i0 + 1) : pg.lines; // 第二份抽取通常是單欄
    const starts = L.map((x, i) => /^1re écoute/.test(x.trim()) ? i : -1).filter(i => i >= 0);
    const nth = used[v.page] = (used[v.page] || 0); used[v.page]++;
    const s = starts[nth]; if (s === undefined) { console.log(k, 'p' + v.page, 'no 1re écoute #' + nth); continue; }
    const nums = [];
    for (let i = s; i < L.length; i++) {
      const t = L[i].trim();
      if (i > s && /^(Vocabulaire|Production|Phonétique|Compréhension|Grammaire|Entrée en matière|[A-L] [A-ZÀ-Ü])/.test(t)) break;
      const m = t.match(/^(\d{1,2})(\s|$)/); if (m) nums.push(+m[1]);
    }
    const n = v.rounds.reduce((a, r) => a + r.qs.length, 0);
    console.log(k, 'p' + v.page, 'book nums', nums.join(','), '| data', n);
  }
} else if (mode === 'ev') {
  const Q = JSON.parse(fs.readFileSync(QF, 'utf8')); const T = JSON.parse(fs.readFileSync(TF, 'utf8'));
  const keyOf = e => String(e.n ?? e.track ?? e.id);
  const by = {}; T.forEach(e => by[keyOf(e)] = norm(e.text));
  console.log('transcript keys sample', Object.keys(by).slice(0, 8));
  let miss = 0, nq = 0, nopt = 0, noev = 0;
  for (const [k, v] of Object.entries(Q)) {
    const tx = by[k] || '';
    if (!tx) console.log('NO-TRANSCRIPT', k);
    v.rounds.forEach(r => r.qs.forEach((q, i) => {
      nq++; if (q.opts) nopt++;
      if (!q.ev || !q.ev.length) { noev++; }
      (q.ev || []).forEach(e => { if (!tx.includes(norm(e))) { miss++; console.log('EV-MISS', k, r.label, i, e.slice(0, 100)); } });
      if (q.opts && (typeof q.ans !== 'number' || q.ans < 0 || q.ans >= q.opts.length)) console.log('ANS-RANGE', k, r.label, i, q.ans, q.opts.length);
      if (!q.opts && 'ans' in q) console.log('ANS-NO-OPTS', k, r.label, i);
      if (!q.a) console.log('NO-A', k, r.label, i);
      if (!q.zh) console.log('NO-ZH', k, r.label, i);
    }));
  }
  console.log({ nq, nopt, miss, noev });
}
