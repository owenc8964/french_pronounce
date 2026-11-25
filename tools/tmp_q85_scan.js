// Q85 只讀全庫掃描：reading.json 的 opts_zh 可疑型態（不寫任何檔）
// 跑法：node tools/tmp_q85_scan.js [類別名]   ← 給類別名會列出該類全部題號
// blocks / zh_of / norm 是照 tools/reading_opts_zh.py 逐行移植（python 在排程裡被擋）
const P = require('path').join(__dirname, '..', 'assets/tcf/exam/reading.json');
const d = JSON.parse(require('fs').readFileSync(P, 'utf8'));
const CJK1 = /[㐀-鿿]/;
const BAD = /^(錯|對|正確|不正確|錯誤|這個選項|此選項|選項|原文|文中|排除|分析|符合|不符|答案|正解|雖然|但)/;
const isDigit = c => /^[0-9]$/.test(c || '');

function* blocks(text) {
  const re = /^\s*([A-D])\s*[\.．、:：)]\s*/gmi; const ms = [];
  let m; while ((m = re.exec(text))) { ms.push({ L: m[1], s: m.index, e: m.index + m[0].length }); if (m[0].length === 0) re.lastIndex++; }
  for (let k = 0; k < ms.length; k++) yield [ms[k].L, text.slice(ms[k].e, k + 1 < ms.length ? ms[k + 1].s : text.length)];
}
function stripSet(s, chars) { let a = 0, b = s.length; while (a < b && chars.includes(s[a])) a++; while (b > a && chars.includes(s[b - 1])) b--; return s.slice(a, b); }
function zh_of(block) {
  const m = CJK1.exec(block);
  if (!m) return [null, null];
  const par = /[（(]([^（）()]*[㐀-鿿][^（）()]*)[）)]/.exec(block);
  let fr, zh;
  if (par && !CJK1.test(block.slice(0, par.index))) { fr = block.slice(0, par.index); zh = par[1].replace(/\s+/g, ''); }
  else {
    let k = m.index;
    while (k > 0 && (isDigit(block[k - 1]) || ':.h'.includes(block[k - 1]))) k--;
    if (k < m.index && !isDigit(block[k])) k++;
    fr = block.slice(0, k);
    const lines = block.slice(k).split('\n');
    zh = lines[0].trim();
    for (let nxt of lines.slice(1)) {
      nxt = nxt.trim();
      if (zh.includes('。') || !nxt || BAD.test(nxt) || (!CJK1.test((nxt[0] || 'x')) && !isDigit(nxt[0]))) break;
      if (/正確|錯|排除|原文|文中/.test(nxt.split('。')[0])) break;
      zh += nxt;
    }
    zh = stripSet(zh.split(/。|[–—⸺]|，(?=錯|對|正確|不正確|排除)|\s{2,}/)[0].trim(), ' 　:：,，');
  }
  fr = stripSet(fr, ' \n.．:：–—⸺-');
  if (!zh || BAD.test(zh) || zh.length > 60) return [fr, null];
  zh = zh.replace(/（選項[^）]*）|這是答案.*$/, '');
  return [fr, zh.replace(/[。.]+$/, '')];
}
const norm = s => (s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').match(/[a-z0-9]+/g) || []);
function sim(a, b) { const A = new Set(norm(a)), B = new Set(norm(b)); if (!A.size || !B.size) return 0; let n = 0; for (const x of A) if (B.has(x)) n++; return n / Math.max(A.size, B.size); }

const cats = {};
const add = (c, t, q, i, msg) => (cats[c] = cats[c] || []).push(`${t} Q${q.q} ${i == null ? '-' : 'ABCD'[i]}: ${msg}`);
let totQ = 0, totSlot = 0, filled = 0, reproOk = 0, reproBad = 0;
for (const t of d.tests) for (const q of t.questions) {
  const opts = q.opts || [], z = q.opts_zh; totQ++; totSlot += opts.length;
  const bl = {};
  for (const [L, b] of blocks(q.opt_zh || '')) { const i = 'ABCD'.indexOf(L.toUpperCase()); if (!(i in bl)) { const [fr, zh] = zh_of(b); bl[i] = { fr, zh, b }; } }
  if (!z) { add('整題沒有中文', t.id, q, null, (q.opt_zh || '').slice(0, 90).replace(/\n/g, ' ∥ ')); continue; }
  opts.forEach((o, i) => {
    const s = z[i] || '';
    // 移植正確性自檢：用移植版重算，跟資料裡的比
    if (bl[i] && bl[i].zh && sim(bl[i].fr, o) >= .6) { if (bl[i].zh === s) reproOk++; else reproBad++; }
    if (!s) {
      let why;
      if (!(i in bl)) why = '解析找不到這個字母開頭的行（常見：四個選項擠在同一行）';
      else {
        const raw = /[（(]([^（）()]*[㐀-鿿][^（）()]*)[）)]/.exec(bl[i].b);
        const rz = raw ? raw[1].replace(/\s+/g, '') : '';
        if (bl[i].zh == null && raw && BAD.test(rz)) why = `括號裡的中文「${rz}」以「${rz.match(BAD)[0]}」開頭被當成解析濾掉`;
        else if (bl[i].zh && sim(bl[i].fr, o) < .6) why = `法文對不上(${sim(bl[i].fr, o).toFixed(2)}) 解析行=${JSON.stringify(bl[i].fr.slice(0, 45))}`;
        else if (bl[i].zh == null) why = '中文被濾掉：' + bl[i].b.slice(0, 50).replace(/\n/g, ' ');
        else why = '其他：' + bl[i].b.slice(0, 50).replace(/\n/g, ' ');
      }
      add('個別選項空白', t.id, q, i, `${o.slice(0, 40)} ← ${why}`); return;
    }
    filled++;
    if (s.length > 30) add('過長(>30字)', t.id, q, i, s);
    if (/答案|正確|錯誤|排除|原文|文中|因為|符合|選項|不對/.test(s)) add('含解析用語', t.id, q, i, `${o} ⇒ ${s}`);
    if (/^(翻譯|譯|分析|注|意思)[:：]/.test(s)) add('帶標籤前綴', t.id, q, i, s);
    if (!CJK1.test(s)) add('沒有中文字', t.id, q, i, s);
    if (/[A-Za-zÀ-ÿ]{4,}/.test(s)) add('中文裡夾法文字', t.id, q, i, `${o} ⇒ ${s}`);
    const nf = new Set(o.match(/\d+/g) || []), nz = new Set(s.match(/\d+/g) || []);
    if ([...nf].sort().join() !== [...nz].sort().join()) add('數字不一致', t.id, q, i, `${o} ⇒ ${s}`);
    if (i in bl) {
      const own = sim(bl[i].fr, o);
      for (const j in bl) if (+j !== i && sim(bl[j].fr || '', o) > own + 1e-9) { add('疑似字母錯位', t.id, q, i, `${o.slice(0, 40)} 自己那行${own.toFixed(2)} < ${'ABCD'[j]}行${sim(bl[j].fr, o).toFixed(2)}`); break; }
      // 中文是不是真的出自「同字母」那一塊
      if (!bl[i].b.replace(/\s+/g, '').includes(s.replace(/\s+/g, '').slice(0, 6))) add('中文不在同字母解析塊', t.id, q, i, `${o} ⇒ ${s}`);
    }
    for (const [fk, zk] of [['document', '檔案'], ['programme', '專案'], ['numérique', '數字'], ['fait divers', '瑣事'], ['menu', '選單'], ['information', '信息'], ['vidéo', '視頻']])
      if (o.toLowerCase().includes(fk) && s.includes(zk)) add('兩岸用語轉換錯', t.id, q, i, `${o} ⇒ ${s}`);
  });
  opts.forEach((o, i) => { if (/correct ?answer|[a-zé][A-Z][a-z]/i.test(o) && /correct ?answer|[a-zé][A-Z][a-z]/.test(o)) add('法文選項本身有雜訊', t.id, q, i, o); });
  const nz = z.filter(Boolean);
  if (new Set(nz).size < nz.length) add('同題兩個選項中文相同', t.id, q, null, z.join(' / '));
  const n = z.filter(Boolean).length;
  if (n < opts.length) (cats['__部分題'] = cats['__部分題'] || []).push(`${t.id} Q${q.q}`);
}
console.log(`題數 ${totQ}，選項格 ${totSlot}，有中文的格 ${filled}；移植自檢 一致 ${reproOk} 不一致 ${reproBad}`);
for (const k in cats) console.log(`${k}: ${cats[k].length}`);
const want = process.argv.slice(2);
for (const w of want) { console.log(`\n== ${w}`); for (const l of cats[w] || []) console.log('  ' + l); }
