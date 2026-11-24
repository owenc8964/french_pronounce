// Q67 抽查用（唯讀）：① 列出模考資料裡所有倒裝問句與 mock.html 會顯示的說明 ② 固定種子抽 gloss_G.json
// 用法：node tools/tmp_q67_sample.js inv | node tools/tmp_q67_sample.js gloss
const fs = require('fs'), path = require('path');
const EX = path.join(__dirname, '..', 'assets', 'tcf', 'exam');
const FIELD = { listening: 'script_fr', reading: 'text_fr' };
const mode = process.argv[2];

// 照 mock.html frTokHtml 的 INV 判斷＋wordPopShow 的說明字串
function invs(text, tok) {
  const out = [];
  tok.forEach((t, ti) => {
    const n1 = tok[ti + 1]; if (!n1 || n1[0] !== t[1] || !/^(VERB|AUX)$/.test(t[3])) return;
    let w1 = text.slice(n1[0], n1[1]), end = n1[1];
    if (/^-t$/i.test(w1)) { const n2 = tok[ti + 2]; if (!n2 || n2[0] !== n1[1]) return; w1 = '-t' + text.slice(n2[0], n2[1]); end = n2[1]; }
    const m = /^-(?:t-)?(il|elle|on|ils|elles|je|tu|nous|vous|ce)$/i.exec(w1); if (!m) return;
    const sf = text.slice(t[0], end), v = text.slice(t[0], t[1]), sj = m[1].toLowerCase();
    const msg = '倒裝問句：' + sf + '＝' + (sj === 'ce' ? "c'" + v.toLowerCase() : sj + ' ' + v.toLowerCase()) +
      '（問句把主詞搬到動詞後面）' + (/-t-/i.test(sf) ? '；中間的 -t- 沒有意思，只是兩個母音碰在一起時加來好念的' : '');
    const ctx = text.slice(Math.max(0, t[0] - 50), Math.min(text.length, end + 40)).replace(/\s+/g, ' ');
    out.push({ sf, lemma: t[2], pos: t[3], f: t[4], msg, ctx });
  });
  return out;
}
// 粗掃：原文裡所有「字-t-il / 字-il」形狀，看有沒有漏掉沒被說明的
const RAW = /\b([A-Za-zÀ-ÿœ]+)-(t-)?(il|elle|on|ils|elles|je|tu|nous|vous|ce)\b/gi;

if (mode === 'inv') {
  let n = 0, raw = 0; const seen = new Set();
  for (const sk of ['listening', 'reading']) {
    const D = JSON.parse(fs.readFileSync(path.join(EX, sk + '.json'), 'utf8'));
    for (const t of D.tests) t.questions.forEach((q, qi) => {
      const txt = q[FIELD[sk]] || '';
      const hit = invs(txt, q.tok || []);
      hit.forEach(h => { n++; console.log(['INV', sk, t.id, 'Q' + (qi + 1), h.sf, h.lemma, h.pos, h.f, h.msg, '…' + h.ctx + '…'].join('\t')); seen.add(t.id + '|' + qi + '|' + h.sf); });
      (q.opts_tok || []).forEach((tk, oi) => invs((q.opts || [])[oi] || '', tk || []).forEach(h => { n++; console.log(['OPT', sk, t.id, 'Q' + (qi + 1), 'opt' + oi, h.sf, h.lemma, h.pos, h.f, h.msg].join('\t')); }));
      let m; RAW.lastIndex = 0;
      while ((m = RAW.exec(txt))) { raw++; if (!seen.has(t.id + '|' + qi + '|' + m[0])) console.log(['MISS', sk, t.id, 'Q' + (qi + 1), m[0], '…' + txt.slice(Math.max(0, m.index - 40), m.index + m[0].length + 30).replace(/\s+/g, ' ') + '…'].join('\t')); }
    });
  }
  console.log('合計說明', n, '原文倒裝形狀', raw);
}

// 摘要：不同形狀各幾次（INV＝有說明、MISS＝原文有倒裝形狀但沒說明），每種附第一個位置與 tok
if (mode === 'sum') {
  const inv = {}, miss = {};
  for (const sk of ['listening', 'reading']) {
    const D = JSON.parse(fs.readFileSync(path.join(EX, sk + '.json'), 'utf8'));
    for (const t of D.tests) t.questions.forEach((q, qi) => {
      const txt = q[FIELD[sk]] || '', tok = q.tok || [];
      const got = new Set();
      invs(txt, tok).forEach(h => { const k = h.sf.toLowerCase(); got.add(k); (inv[k] = inv[k] || { n: 0, at: sk + ' ' + t.id + ' Q' + (qi + 1), msg: h.msg, tag: h.lemma + '/' + h.pos + '/' + h.f }).n++; });
      let m; RAW.lastIndex = 0;
      while ((m = RAW.exec(txt))) { const k = m[0].toLowerCase(); if (got.has(k) || k === 'rendez-vous') continue;
        const a = m.index, b = a + m[0].length; const tt = tok.filter(x => x[0] >= a && x[1] <= b).map(x => txt.slice(x[0], x[1]) + '[' + x[2] + '/' + x[3] + '/' + x[4] + ']').join(' ');
        (miss[k] = miss[k] || { n: 0, at: sk + ' ' + t.id + ' Q' + (qi + 1), tok: tt }).n++; }
    });
  }
  const pr = (o, lab) => Object.entries(o).sort((a, b) => b[1].n - a[1].n).forEach(([k, v]) => console.log([lab, v.n, k, v.at, v.msg || v.tok, v.tag || ''].join('\t')));
  pr(inv, 'INV'); pr(miss, 'MISS');
  console.log('INV 種類', Object.keys(inv).length, '次數', Object.values(inv).reduce((s, v) => s + v.n, 0), '｜MISS 種類', Object.keys(miss).length, '次數', Object.values(miss).reduce((s, v) => s + v.n, 0));
}

// 每次出現粗分：Q＝同句以 ? 收尾；I＝前面緊接逗號／引號（插入語 dit-il）；O＝其他（祈使、副詞開頭倒裝…）
if (mode === 'cls') {
  const R = {};
  for (const sk of ['listening', 'reading']) {
    const D = JSON.parse(fs.readFileSync(path.join(EX, sk + '.json'), 'utf8'));
    for (const t of D.tests) t.questions.forEach((q, qi) => {
      const txt = q[FIELD[sk]] || '', tok = q.tok || [];
      tok.forEach((x, ti) => {
        const n1 = tok[ti + 1]; if (!n1 || n1[0] !== x[1] || !/^(VERB|AUX)$/.test(x[3])) return;
        let w1 = txt.slice(n1[0], n1[1]), end = n1[1];
        if (/^-t$/i.test(w1)) { const n2 = tok[ti + 2]; if (!n2 || n2[0] !== n1[1]) return; w1 = '-t' + txt.slice(n2[0], n2[1]); end = n2[1]; }
        if (!/^-(?:t-)?(il|elle|on|ils|elles|je|tu|nous|vous|ce)$/i.test(w1)) return;
        const sf = txt.slice(x[0], end).toLowerCase(); if (sf === 'est-ce') return;
        const after = txt.slice(end, end + 200), stop = after.search(/[.!?…»]/), ch = stop < 0 ? '' : after[stop];
        const before = txt.slice(Math.max(0, x[0] - 4), x[0]);
        const c = /[,«»"”“]\s*$/.test(before) ? 'I' : ch === '?' ? 'Q' : 'O';
        const r = (R[sf] = R[sf] || { Q: 0, I: 0, O: 0, ex: {} }); r[c]++;
        if (!r.ex[c]) r.ex[c] = sk + ' ' + t.id + ' Q' + (qi + 1) + ' …' + txt.slice(Math.max(0, x[0] - 45), end + 35).replace(/\s+/g, ' ') + '…';
      });
    });
  }
  Object.entries(R).forEach(([k, r]) => { if (r.I || r.O) console.log([k, 'Q' + r.Q, 'I' + r.I, 'O' + r.O, r.ex.I || '', r.ex.O || ''].join('\t')); });
}

// 11-23 fix 實際改了哪些：比對 .bak-2026-11-23
if (mode === 'diff') {
  for (const sk of ['listening', 'reading']) {
    const D = JSON.parse(fs.readFileSync(path.join(EX, sk + '.json'), 'utf8'));
    const B = JSON.parse(fs.readFileSync(path.join(EX, sk + '.json.bak-2026-11-23'), 'utf8'));
    const bm = {}; B.tests.forEach(t => { bm[t.id] = t; });
    for (const t of D.tests) t.questions.forEach((q, qi) => {
      const bq = bm[t.id] && bm[t.id].questions[qi]; if (!bq || !bq.tok || !q.tok) return;
      const txt = q[FIELD[sk]] || '';
      const key = x => x.join('|'); const old = new Set(bq.tok.map(key));
      q.tok.forEach(x => { if (!old.has(key(x))) { const o = bq.tok.find(y => y[0] <= x[0] && y[1] > x[0]);
        console.log([sk, t.id, 'Q' + (qi + 1), txt.slice(x[0], x[1]), JSON.stringify(x.slice(2)), '舊:' + (o ? txt.slice(o[0], o[1]) + JSON.stringify(o.slice(2)) : '-')].join('\t')); } });
    });
  }
}

if (mode === 'gloss') {
  const G = JSON.parse(fs.readFileSync(path.join(EX, '_gloss', 'gloss_G.json'), 'utf8'));
  const W = JSON.parse(fs.readFileSync(path.join(EX, '_gloss', 'work_opts_missing.json'), 'utf8'));
  const ex = {}; W.forEach(x => { ex[x.key] = x.example; });
  const keys = Object.keys(G);
  let s = 20261124 >>> 0;   // mulberry32
  const rnd = () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const idx = keys.map((k, i) => i);
  for (let i = idx.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
  console.log('gloss_G 總數', keys.length, 'work 例句', W.length);
  idx.slice(0, 85).forEach((i, r) => { const k = keys[i]; console.log([r + 1, '#' + (i + 2), k, G[k], ex[k] || '(無例句)'].join('\t')); });
}
