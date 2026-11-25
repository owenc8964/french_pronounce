// Q81（唯讀）：mock.html「倒裝問句」說明套到的每一處 → 分類，寫 drafts/倒裝說明分類清單_2026-11-25.md
// 判斷照 mock.html frTokHtml() 的 INV 區塊（c9a953b）：VERB/AUX 後面緊接 -il/-elle/-on/-ils/-elles/-je/-tu/-nous/-vous/-ce（可夾 -t）
// 用法：node tools/tmp_q81_inversion_classify.js          → 寫清單＋stdout 統計
//       node tools/tmp_q81_inversion_classify.js sample   → 每類固定種子抽 12 處（人工抽查用）
// ⛔ 只讀 assets/tcf/exam/*.json，只寫 drafts/ 那一份清單
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const EX = path.join(ROOT, 'assets', 'tcf', 'exam');
const OUT = path.join(ROOT, 'drafts', '倒裝說明分類清單_2026-11-25.md');
const FIELD = { listening: 'script_fr', reading: 'text_fr' };
const mode = process.argv[2] || 'write';

// 說話／想法類動詞（插入句 dit-il、semble-t-il、lisait-on）
const SAY = new Set(('dire expliquer ajouter avouer poursuivre lancer répondre déclarer affirmer préciser souligner raconter confier ' +
  'estimer indiquer conclure rappeler exclamer demander interroger sembler paraître lire écrire noter observer insister répliquer ' +
  'assurer reconnaître admettre constater remarquer résumer commenter ironiser sourire plaisanter murmurer continuer reprendre ' +
  'juger penser croire raconter annoncer témoigner prévenir regretter détailler résume s\'exclamer s\'interroger affirmer ' +
  'analyser nuancer conseiller avertir confirmer signaler rire soupirer s\'amuser s\'étonner étonner admettre lâcher martèle marteler ' +
  'insiste explique rapporter relever énumérer argumenter défendre protester entendre répéter raconter souffler').split(/\s+/));
// 副詞開頭倒裝的開頭詞
const ADV = /(?:^|[,;:]\s*|\b(?:et|mais|or|donc)\s+)(peut-être|peut-etre|sans doute|sans aucun doute|aussi|ainsi|à peine|a peine|encore|du moins|au moins|tout au plus|rarement|toujours|en vain|à plus forte raison|tout juste|de même|difficilement|probablement)\b[^.!?…]*$/i;
const IND_ONLY = new Set('avez avons êtes sommes pouvez pouvons voulez voulons savez savons devez devons connaissez pensez croyez trouvez'.split(' '));
const CONC = new Set('soit soient fût fussent dût dussent'.split(' '));
const COMPOUND = new Set(['rendez-vous']);

const CAT = {
  Q: '真倒裝問句', IMP: '祈使句', INC: '插入句', ADV: '副詞開頭倒裝', CMP: '連字號複合詞（誤判）', OTH: '其他',
};
// 建議說明類型（只講規則；例子一律用該處原文）
const SUG = {
  'Q-simple': '問句・代名詞主詞倒裝：主詞代名詞放到動詞後面，中間加連字號',
  'Q-complex': '問句・複合倒裝：名詞主詞留在前面，動詞後面用代名詞再說一次（不是把主詞搬過去）',
  'Q-estceque': 'Est-ce que＝問句開頭記號，整塊不用翻',
  'Q-nestcepas': "n'est-ce pas＝句尾附加問句「不是嗎／對吧」",
  'IMP': '命令句：動詞後面的 -nous／-vous／-toi 是受詞或反身代名詞，不是主詞；不是問句',
  'INC': '插入句：引述或插入語放在話後面時主詞倒過來（＝某人說／似乎），不是問句',
  'ADV': '書面語倒裝：句首是 peut-être／ainsi／aussi／à peine 這類副詞時主詞倒過來，不是問句',
  'CMP': '這是一個完整的詞，不是倒裝；不要顯示倒裝說明',
  'OTH-noq': '疑似問句但原文沒有問號（逐字稿／抄錄可能漏）：先對原音或原文，確認是問句才用問句說明',
  'OTH-conc': '讓步倒裝：si／aussi＋形容詞＋soit-il＝「不管多…」，不是問句',
  'OTH-nesc': 'ne serait-ce que＝固定片語「哪怕只是…」，不是問句',
  'OTH-ce': '書面語：ce＋être 倒裝出現在非問句（多半跟前面副詞或片語連用），不是問句（待人工）',
  'OTH-misc': '待人工判斷',
};
// 附加句（跟主類別一起建議）
function addons(sf, v, sj) {
  const a = [];
  if (/-t-/i.test(sf)) a.push('-t-：動詞拼字以 -e／-a 結尾、後接 il／elle／on 才加，沒有意思');
  else if (/d$/i.test(v) && /^(il|elle|on)$/.test(sj)) a.push('-d 結尾：d 在這裡唸 [t]');
  if (sj === 'ce' && !/^[aeiouéèêh]/i.test(v)) a.push("修 bug：顯示 ce " + v.toLowerCase() + "（不是 c'）");
  if (sj === 'je' && /^[aeiouéèêh]/i.test(v)) a.push("修 bug：顯示 j'" + v.toLowerCase() + '（不是 je ' + v.toLowerCase() + '）');
  if (sj === 'je' && /^puis$/i.test(v)) a.push('puis：平常說 je peux，倒裝時才用 puis');
  return a;
}

// 句界：標點 . ! ? … ？；換行只在後面接破折號（聽力「– 答案」解析分隔）時才算（資料 lined 會在句中換行）
const isB = (txt, i) => (/[.!?…？]/.test(txt[i]) && !(txt[i] === '.' && /(?:^|[\s(])(?:M|Mme|Mlle|Dr|St|etc)$/.test(txt.slice(Math.max(0, i - 5), i)))) || (txt[i] === '\n' && /^\s*[–—-]/.test(txt.slice(i + 1, i + 4)));
function sentBounds(txt, a, end) {
  let s = a; while (s > 0 && !isB(txt, s - 1)) s--;
  let k = end; while (k < txt.length && !isB(txt, k)) k++;
  const ch = k < txt.length ? txt[k] : '';
  return { s, endCh: ch === '？' ? '?' : ch, e: k };
}

// 分類一處。a=動詞起點 vEnd=動詞終點 end=整個倒裝終點
function classify(txt, a, vEnd, end, sj, lemma, feats, tok, ti) {
  const sf = txt.slice(a, end), v = txt.slice(a, vEnd), lsf = sf.toLowerCase(), lv = v.toLowerCase();
  const { s, endCh } = sentBounds(txt, a, end);
  const pre = txt.slice(s, a);
  const preTrim = pre.replace(/(?:\b(?:se|s'|ne|n'|me|m'|te|t'|nous|vous|le|la|les|l'|lui|leur|y|en)\s*)+$/i, '').replace(/\s+$/, '');
  const prevCh = preTrim.slice(-1);
  const after = txt.slice(end, end + 30);
  // 連字號複合詞
  if (COMPOUND.has(lsf) || txt[end] === '-' || txt[a - 1] === '-') return ['CMP', 'CMP', '複合詞'];
  // est-ce 系列
  if (sj === 'ce' && /^est$/i.test(v)) {
    if (/n['’]\s*$/i.test(pre) && /^\s+pas\b/i.test(after)) return ['Q', 'Q-nestcepas', "n'est-ce pas"];
    if (/^\s+qu/i.test(after)) return ['Q', 'Q-estceque', 'est-ce que'];
  }
  if (/^serait$/i.test(v) && sj === 'ce' && /\bne\s*$/i.test(pre) && /^\s+qu/i.test(after)) return ['OTH', 'OTH-nesc', 'ne serait-ce que'];
  // 說話動詞（含複合時態 a-t-elle dit）
  let lem = (lemma || '').toLowerCase();
  if (/^(avoir|être)$/.test(lem) && tok) { const nx = tok[ti + (/-t-/i.test(sf) ? 3 : 2)]; if (nx && SAY.has(String(nx[2]).toLowerCase())) lem = String(nx[2]).toLowerCase(); }
  const say = SAY.has(lem) || SAY.has(lv);
  const quoteBefore = /[«»"”“–—]\s*,?$/.test(preTrim);           // 緊接在引號（或引號＋逗號）後
  const commaBefore = prevCh === ',';
  const nv = /^(nous|vous)$/.test(sj);
  if (!nv && quoteBefore && (say || endCh !== '?')) return ['INC', 'INC', '引號後' + (say ? '＋說話動詞' : '')];
  if (!nv && commaBefore && say && endCh !== '?') return ['INC', 'INC', '逗號後＋說話動詞＋無問號'];
  if (!nv && say && endCh !== '?' && /^\s*[.,]/.test(txt.slice(end, end + 3))) return ['INC', 'INC', '說話動詞放句尾＋無問號'];
  const PRE = pre.trim();
  if (endCh !== '?' && CONC.has(lv)) return ['OTH', 'OTH-conc', '虛擬式 soit／fût'];
  if (endCh !== '?' && ADV.test(PRE)) return ['ADV', 'ADV', '句首副詞：' + ADV.exec(PRE)[1]];
  // 子句開頭（最後一個逗號／冒號之後）是疑問詞 → 就算原文漏問號也當問句
  const clause = PRE.replace(/^.*[,:;]\s*/, '').replace(/^[«»"“”'\s]+/, '').replace(/^.*[»”"]\s*$/, '');
  const qStart = /^(?:(?:mais|et|alors|donc)\s+)?(?:que|qu['’]|pourquoi|comment|où|quand|combien|quel\w*|lequel|laquelle|à quel\w*|dans quel\w*|pour quel\w*|de quel\w*)/i.test(clause);
  const qBefore = /(?:^|[\s'’])(?:que|qu['’](?:\s*en)?|pourquoi|comment|où|quand|combien)\s*(?:(?:se|s['’]|ne|n['’]|y|en|le|la|les|lui|leur|vous|nous)\s*)*$/i.test(clause);
  const isImpForm = nv && !IND_ONLY.has(lv) && !/(iez|ait)$|^.{3,}ais$/i.test(lv) && !(/ions$/i.test(lv) && endCh !== '!');
  const vStart = clause === '' && !isImpForm;                       // 動詞就在句首／逗號後（Pouvez-vous…、Faut-il…）
  if (endCh === '?' || (!isImpForm && (qStart || qBefore || vStart))) {
    const noq = endCh !== '?';
    // 複合倒裝：動詞前最後一個實詞是名詞／專名，且前一個不是 quel 類
    let cx = false;
    if (tok) { const bef = tok.filter(x => x[1] <= a && x[0] >= a - clause.length - 2 &&!/^(ADV|PART)$/.test(x[3]) && !/^(ne|n'|pas|se|s')$/i.test(txt.slice(x[0], x[1])));
      let L = bef[bef.length - 1], L2 = bef[bef.length - 2], L3 = bef[bef.length - 3];
      if (L && L[3] === 'ADJ' && L2 && /^(NOUN|PROPN)$/.test(L2[3])) { L = L2; L2 = L3; L3 = bef[bef.length - 4]; }   // 名詞＋形容詞（le syndrome … professionnel）
      const w = x => x ? txt.slice(x[0], x[1]).toLowerCase() : '';
      const QD = /^(quel|quelle|quels|quelles|combien|lequel|laquelle)$/;
      if (L && /^(NOUN|PROPN)$/.test(L[3]) && !/^(diable|question|selon)$/i.test(w(L)) && !QD.test(w(L2)) && !(/^(de|d')$/.test(w(L2)) && /^(combien|beaucoup|peu|trop|plus|moins)$/.test(w(L3)))) cx = true;
      if (L && L[3] === 'PRON' && /^(cela|ceci|ça|tout|chacun|personne|rien|celui|celle|ceux|celles)$/i.test(txt.slice(L[0], L[1]))) cx = true; }
    return ['Q', cx ? 'Q-complex' : 'Q-simple', (noq ? (vStart && !qStart && !qBefore ? '動詞開頭（原文沒有問號）' : '疑問詞開頭（原文漏問號）') : '同句以 ? 收尾') + (cx ? '＋前有名詞主詞' : '')];
  }
  if (/^(nous|vous|tu)$/.test(sj)) {
    if (isImpForm) return ['IMP', 'IMP', (/Imp/.test(feats || '') ? 'Mood=Imp' : '形態像命令') + '＋無問號'];
    return ['OTH', 'OTH-noq', '直陳／條件形態＋無問號'];
  }
  if (CONC.has(lv)) return ['OTH', 'OTH-conc', '虛擬式 soit／fût'];
  if (sj === 'ce') return ['OTH', 'OTH-ce', 'ce 倒裝無問號'];
  return ['OTH', 'OTH-noq', '無問號、無副詞開頭'];
}

function scanText(txt, tok, push) {
  tok.forEach((t, ti) => {
    const n1 = tok[ti + 1]; if (!n1 || n1[0] !== t[1] || !/^(VERB|AUX)$/.test(t[3])) return;
    let w1 = txt.slice(n1[0], n1[1]), end = n1[1];
    if (/^-t$/i.test(w1)) { const n2 = tok[ti + 2]; if (!n2 || n2[0] !== n1[1]) return; w1 = '-t' + txt.slice(n2[0], n2[1]); end = n2[1]; }
    const m = /^-(?:t-)?(il|elle|on|ils|elles|je|tu|nous|vous|ce)$/i.exec(w1); if (!m) return;
    const sj = m[1].toLowerCase();
    const [cat, sug, why] = classify(txt, t[0], t[1], end, sj, t[2], t[4], tok, ti);
    const sf = txt.slice(t[0], end);
    const ctx = (txt.slice(Math.max(0, t[0] - 45), t[0]) + '**' + sf + '**' + txt.slice(end, end + 35)).replace(/\s+/g, ' ').replace(/\|/g, '/');
    push({ sf, v: txt.slice(t[0], t[1]), sj, cat, sug, why, ctx, add: addons(sf, txt.slice(t[0], t[1]), sj) });
  });
}

const rows = [], miss = [];
const RAW = /([A-Za-zÀ-ÿœ]+)-(t-)?(il|elle|on|ils|elles|je|tu|nous|vous|ce)(?![A-Za-zÀ-ÿ-])/gi;
for (const sk of ['listening', 'reading']) {
  const D = JSON.parse(fs.readFileSync(path.join(EX, sk + '.json'), 'utf8'));
  for (const t of D.tests) t.questions.forEach((q, qi) => {
    const where = sk + ' ' + t.id + ' Q' + (qi + 1);
    const txt = q[FIELD[sk]] || '', got = new Set();
    scanText(txt, q.tok || [], r => { r.at = where; rows.push(r); got.add(r.ctx); });
    const gotSf = new Set(rows.filter(r => r.at === where).map(r => r.sf.toLowerCase()));
    (q.opts_tok || []).forEach((tk, oi) => scanText((q.opts || [])[oi] || '', tk || [], r => { r.at = where + ' 選項' + (oi + 1); rows.push(r); }));
    // 有倒裝形狀卻沒說明（-tu／-elles 等）：只掃原文
    let m; RAW.lastIndex = 0;
    while ((m = RAW.exec(txt))) {
      if (txt[m.index - 1] === '-' ) continue;
      const sf = m[0], lsf = sf.toLowerCase(); if (gotSf.has(lsf)) continue;
      const v = m[1], sj = m[3].toLowerCase(), a = m.index, end = a + sf.length;
      const [cat, sug, why] = classify(txt, a, a + v.length, end, sj, '', '', null, 0);
      if (cat === 'CMP') continue;
      const ctx = (txt.slice(Math.max(0, a - 45), a) + '**' + sf + '**' + txt.slice(end, end + 35)).replace(/\s+/g, ' ').replace(/\|/g, '/');
      miss.push({ at: where, sf, v, sj, cat, sug, why, ctx, add: addons(sf, v, sj) });
    }
  });
}

// 原文形狀粗掃會把 é／è 開頭的字切壞（\b 不認 é）——上面已改成不用 \b 起頭；仍可能有名詞 + -vous（rendez-vous 已排除）

const order = ['Q', 'IMP', 'INC', 'ADV', 'CMP', 'OTH'];
const cnt = {}, sugCnt = {};
rows.forEach(r => { cnt[r.cat] = (cnt[r.cat] || 0) + 1; sugCnt[r.sug] = (sugCnt[r.sug] || 0) + 1; });
const uniq = new Set(rows.map(r => r.cat + '|' + r.ctx)).size;

if (mode === 'qsample') {   // 真倒裝問句再按建議類型各抽 15＋列出全部「原文沒問號」的
  let s = 20261126 >>> 0;
  const rnd = () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  for (const g of ['Q-simple', 'Q-complex', 'Q-estceque', 'Q-nestcepas']) {
    const L = rows.filter(r => r.sug === g && !/原文/.test(r.why));
    const idx = L.map((_, i) => i); for (let i = idx.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
    console.log('== ' + g + ' n=' + L.length); idx.slice(0, 15).forEach((i, k) => console.log([k + 1, L[i].at, L[i].why, L[i].ctx, L[i].add.join('；')].join('\t')));
  }
  const N = rows.filter(r => r.cat === 'Q' && /原文/.test(r.why));
  console.log('== Q 原文沒問號 n=' + N.length); N.forEach((r, k) => console.log([k + 1, r.at, r.sug, r.why, r.ctx].join('\t')));
  process.exit(0);
}
if (mode === 'sample') {
  let s = 20261125 >>> 0;
  const rnd = () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  for (const c of order) {
    const L = rows.filter(r => r.cat === c);
    const idx = L.map((_, i) => i); for (let i = idx.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
    console.log('== ' + c + ' ' + CAT[c] + ' n=' + L.length);
    idx.slice(0, process.argv[3] === 'all' && c !== 'Q' ? 999 : 12).forEach((i, k) => console.log([k + 1, L[i].at, L[i].sug, L[i].why, L[i].ctx].join('\t')));
  }
  console.log('== MISS n=' + miss.length);
  miss.forEach((r, k) => console.log([k + 1, r.at, r.cat, r.sug, r.ctx].join('\t')));
  process.exit(0);
}

let md = '';
md += '# Q81 模考「倒裝問句」說明誤套分類清單（2026-11-25，無人值守）\n\n';
md += '> 工具：`tools/tmp_q81_inversion_classify.js`（唯讀，`node tools/tmp_q81_inversion_classify.js` 產生本檔；`sample` 模式印抽查樣本）。\n';
md += '> 判斷邏輯照 `mock.html` `frTokHtml()` INV 區塊（commit `c9a953b`）：只要 VERB/AUX 後面緊接 -il／-elle／-on／-ils／-elles／-je／-tu／-nous／-vous／-ce，就顯示「倒裝問句：…（問句把主詞搬到動詞後面）」。\n';
md += '> 資料：`assets/tcf/exam/listening.json`（script_fr＋選項）、`reading.json`（text_fr＋選項）。⛔ 本檔只是清單與建議，沒有改任何模考資料或 mock.html。\n';
md += '> 前一份：`research/2026-11-24_模考倒裝與選項字義抽查.md`（Q67）。聽力有多套共用同一段錄音，同一句會在多個題號重複出現，下表逐處都列。\n\n';
md += '## 各類統計\n\n';
md += `全部套到說明的地方：**${rows.length} 處**（去掉重複的同一句後 ${uniq} 處）。\n\n`;
md += '| 分類 | 處數 | 佔比 |\n|---|---|---|\n';
order.forEach(c => { md += `| ${CAT[c]} | ${cnt[c] || 0} | ${((cnt[c] || 0) / rows.length * 100).toFixed(1)}% |\n`; });
md += '\n### 建議說明類型分布\n\n| 建議說明類型 | 處數 | 建議說明（只講規則；例子用該處原文） |\n|---|---|---|\n';
Object.keys(SUG).forEach(k => { if (sugCnt[k]) md += `| ${k} | ${sugCnt[k]} | ${SUG[k]} |\n`; });
const addCnt = {}; rows.forEach(r => r.add.forEach(x => { const k = x.split('：')[0]; addCnt[k] = (addCnt[k] || 0) + 1; }));
md += '\n### 附加說明（跟主類型一起顯示）\n\n| 附加 | 處數 |\n|---|---|\n';
Object.entries(addCnt).forEach(([k, n]) => { md += `| ${k} | ${n} |\n`; });
md += '\n<!--SAMPLE-->\n\n';
md += '## 逐處清單\n\n欄位：位置（技能 套 題號［選項］）｜原文片段（**粗體**＝被說明的那塊）｜判定依據｜建議說明類型｜附加\n';
order.forEach(c => {
  const L = rows.filter(r => r.cat === c);
  md += `\n### ${CAT[c]}（${L.length} 處）\n\n| # | 位置 | 原文片段 | 依據 | 建議說明類型 | 附加 |\n|---|---|---|---|---|---|\n`;
  L.forEach((r, i) => { md += `| ${i + 1} | ${r.at} | …${r.ctx}… | ${r.why} | ${r.sug} | ${r.add.join('；')} |\n`; });
});
md += `\n## 附錄：有倒裝形狀但目前沒有說明（${miss.length} 處，原文粗掃）\n\n`;
md += '多半是 -tu／-elles：分詞時連字號沒黏在代名詞上，`frTokHtml` 認不到。分類用同一套規則（沒有詞性資料，準確度較低，未抽查）。\n\n';
const mc = {}; miss.forEach(r => { mc[r.cat] = (mc[r.cat] || 0) + 1; });
md += '| 分類 | 處數 |\n|---|---|\n'; order.forEach(c => { if (mc[c]) md += `| ${CAT[c]} | ${mc[c]} |\n`; });
md += '\n| # | 位置 | 原文片段 | 分類 | 建議說明類型 |\n|---|---|---|---|---|\n';
miss.forEach((r, i) => { md += `| ${i + 1} | ${r.at} | …${r.ctx}… | ${CAT[r.cat]} | ${r.sug} |\n`; });
fs.writeFileSync(OUT, md);
console.log('寫入', OUT); order.forEach(c => console.log(c, CAT[c], cnt[c] || 0)); console.log('合計', rows.length, '去重', uniq, 'MISS', miss.length, JSON.stringify(sugCnt));
