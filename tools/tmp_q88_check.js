/* Q88 核對（只讀）：模考片語 remettre aux normes／remettre sur le marché ＋ co_4 Q15 查字位置重算
   用法：node tools/tmp_q88_check.js [phr|q15] */
var fs = require('fs'), path = require('path');
var R = path.join(__dirname, '..'), EX = path.join(R, 'assets/tcf/exam');
var mode = process.argv[2] || 'all';
function J(p) { return JSON.parse(fs.readFileSync(p, 'utf8')); }

if (mode === 'phr' || mode === 'all') {
  var P = require(path.join(R, 'tcf_phrases.js'));
  var ids = P.LIST.filter(function (e) { return /^remettre/.test(e.fr); }).map(function (e) { return e.id; });
  console.log('== 片語 pattern ==');
  ids.forEach(function (id) { console.log(id, P.LIST[id].fr, JSON.stringify(P.LIST[id].p)); });
  var stat = {};
  ['reading.json', 'listening.json'].forEach(function (f) {
    var D = J(path.join(EX, f));
    D.tests.forEach(function (t) {
      t.questions.forEach(function (q) {
        var fields = [];
        Object.keys(q).forEach(function (k) {
          if (/_tok$|^tok$/.test(k)) {
            var base = k === 'tok' ? (q.text_fr !== undefined ? 'text_fr' : 'script_fr') : k.replace(/_tok$/, '');
            if (k === 'opts_tok') { (q.opts_tok || []).forEach(function (tk, i) { fields.push(['opt' + 'ABCD'[i], q.opts[i], tk]); }); }
            else if (typeof q[base] === 'string') fields.push([base, q[base], q[k]]);
            else fields.push([k + '(無對應文字欄 ' + base + ')', null, null]);
          }
        });
        fields.forEach(function (fd) {
          if (!fd[1] || !fd[2]) return;
          var hits = P.matchTok(fd[1], fd[2]);
          hits.forEach(function (h) {
            if (ids.indexOf(h.id) < 0) return;
            var s = fd[2][h.i0][0], e = fd[2][h.i1][1];
            stat[h.id] = (stat[h.id] || 0) + 1;
            console.log(t.id, 'Q' + q.q, fd[0], '[' + P.LIST[h.id].fr + ']', JSON.stringify(fd[1].slice(s, e)), '…' + fd[1].slice(Math.max(0, s - 60), e + 40).replace(/\n/g, ' ') + '…');
          });
        });
        if (t.id === 'ce_3' && q.q === 14 && f === 'reading.json') {
          console.log('-- ce_3 Q14 欄位:', Object.keys(q).join(','));
          console.log('text_fr:', q.text_fr);
          console.log('opts:', JSON.stringify(q.opts));
          console.log('opts_zh:', JSON.stringify(q.opts_zh));
          console.log('opt_zh:', q.opt_zh);
          (q.opts_tok || []).forEach(function (tk, i) { console.log('opt' + 'ABCD'[i] + ' tok:', JSON.stringify(tk)); });
        }
      });
    });
  });
  console.log('== 命中統計 ==', JSON.stringify(stat));
  /* 字面搜尋（不靠原形），看有沒有漏抓 */
  ['reading.json', 'listening.json'].forEach(function (f) {
    var s = fs.readFileSync(path.join(EX, f), 'utf8'), re = /(re)?m(et|is|ett)[a-zé]*\s+(aux?\s+norm|sur\s+le\s+march|à\s+la\s+norm)/gi, m, n = 0;
    while ((m = re.exec(s))) { n++; console.log('字面', f, JSON.stringify(s.slice(m.index - 30, m.index + 50))); }
    console.log('字面', f, n);
  });
}

if (mode === 'mis') {
  ['reading.json', 'listening.json'].forEach(function (f) {
    J(path.join(EX, f)).tests.forEach(function (t) { t.questions.forEach(function (q) {
      var s = (q.script_fr || '') + ' ' + (q.text_fr || '') + ' ' + (q.opts || []).join(' ');
      if (/\bmis[e]?\s+sur\s+le\s+march/i.test(s)) console.log(f, t.id, 'Q' + q.q);
      if (/Terre est belle/.test(s)) console.log('節目名', f, t.id, 'Q' + q.q, JSON.stringify(s.slice(0, 70)));
    }); });
  });
}
if (mode === 'q15' || mode === 'all') {
  var NEW = J(path.join(EX, 'listening.json')), OLD = J(path.join(EX, 'listening.json.bak-2026-11-26'));
  function T(D) { return D.tests.filter(function (t) { return t.id === 'co_4'; })[0]; }
  var tn = T(NEW), to = T(OLD);
  console.log('== co_4 題數', tn.questions.length, to.questions.length);
  tn.questions.forEach(function (qn, i) {
    var qo = to.questions[i];
    var diff = Object.keys(Object.assign({}, qn, qo)).filter(function (k) { return JSON.stringify(qn[k]) !== JSON.stringify(qo[k]); });
    if (diff.length) console.log('co_4 Q' + qn.q, '改了欄位:', diff.join(','));
  });
  /* 其他套有沒有被動到 */
  NEW.tests.forEach(function (t, i) {
    if (t.id === 'co_4') return;
    if (JSON.stringify(t) !== JSON.stringify(OLD.tests[i])) console.log('⚠️ 別套也變了:', t.id);
  });
  var q = tn.questions.filter(function (x) { return x.q === 15; })[0], qo = to.questions.filter(function (x) { return x.q === 15; })[0];
  console.log('Q15 欄位:', Object.keys(q).join(','));
  ['script_fr', 'script_zh', 'script_spk', 'lined'].forEach(function (k) { if (q[k] !== undefined) { console.log('NEW', k, JSON.stringify(q[k])); console.log('OLD', k, JSON.stringify(qo[k])); } });
  /* tok 對齊：新文字切出來的字 vs 舊文字切出來的字 */
  var txt = q.script_fr, otxt = qo.script_fr;
  var nw = q.tok.map(function (t) { return txt.slice(t[0], t[1]); }), ow = qo.tok.map(function (t) { return otxt.slice(t[0], t[1]); });
  console.log('tok 數 新/舊', nw.length, ow.length);
  console.log('新 tok 前 14 字:', JSON.stringify(nw.slice(0, 14)));
  console.log('舊 tok 前 14 字:', JSON.stringify(ow.slice(0, 14)));
  /* 新 tok 的字面是否都是「字」（不含空白、不切在字中間） */
  var bad = [];
  q.tok.forEach(function (t, i) {
    var w = txt.slice(t[0], t[1]), pre = txt[t[0] - 1] || ' ', post = txt[t[1]] || ' ';
    if (/\s/.test(w) || !w || (/[A-Za-zÀ-ÿœ]/.test(pre) && /[A-Za-zÀ-ÿœ]/.test(w[0])) || (/[A-Za-zÀ-ÿœ]/.test(post) && /[A-Za-zÀ-ÿœ]/.test(w[w.length - 1]))) bad.push([i, t[0], t[1], w]);
  });
  console.log('新 tok 切壞的:', JSON.stringify(bad));
  /* 舊→新 對應：找第一個差異處，後面的舊 tok 應該 +4 */
  var ins = 0; while (ins < txt.length && txt[ins].toLowerCase() === otxt[ins].toLowerCase()) ins++;   /* 大小寫改（bienvenue→Bienvenue）不算插入 */
  var delta = txt.length - otxt.length;
  console.log('插入點', ins, 'delta', delta, '附近新:', JSON.stringify(txt.slice(ins - 25, ins + 20)), '舊:', JSON.stringify(otxt.slice(ins - 25, ins + 20)));
  var tail = otxt.slice(ins), ntail = txt.slice(ins + delta);
  console.log('插入點後文字相同?', tail === ntail);
  /* 舊 tok 中位置 >= ins 的，+delta 後應該在新 tok 裡找得到同字 */
  var nset = {}; q.tok.forEach(function (t) { nset[t[0] + ',' + t[1]] = t; });
  var miss = [];
  qo.tok.forEach(function (t) {
    var s = t[0] >= ins ? t[0] + delta : t[0], e = t[0] >= ins ? t[1] + delta : t[1];
    var m = nset[s + ',' + e];
    if (!m) miss.push(['舊', t, otxt.slice(t[0], t[1])]);
    else if (JSON.stringify(m.slice(2)) !== JSON.stringify(t.slice(2))) miss.push(['原形/詞性改', t, m]);
  });
  console.log('舊 tok 平移後對不到/屬性改:', JSON.stringify(miss));
  var extra = q.tok.filter(function (t) {
    return !qo.tok.some(function (o) { var s = o[0] >= ins ? o[0] + delta : o[0]; return s === t[0]; });
  }).map(function (t) { return [t, txt.slice(t[0], t[1])]; });
  console.log('新增 tok:', JSON.stringify(extra));
  /* opts_tok 有沒有變 */
  console.log('opts_tok 相同?', JSON.stringify(q.opts_tok) === JSON.stringify(qo.opts_tok));

  /* _ctx 檔：key＝字元位置 */
  function ctxCheck(name) {
    var pn = path.join(EX, '_ctx', 'co_4.' + name + '.json');
    var a = J(pn), b = J(pn + '.bak-2026-11-26');
    console.log('== _ctx', name);
    Object.keys(Object.assign({}, a, b)).forEach(function (qq) {
      if (JSON.stringify(a[qq]) === JSON.stringify(b[qq])) return;
      console.log(' 題', qq, '有變');
      if (qq !== '15') console.log('  ⚠️ 非 Q15 變了', JSON.stringify(b[qq]), '→', JSON.stringify(a[qq]));
    });
    var A = a['15'], B = b['15'];
    if (!A && !B) return;
    if (Array.isArray(A) || Array.isArray(B)) {   /* phr: [s,e,fr,zh] */
      (A || []).forEach(function (r) { var lit = txt.slice(r[0], r[1]); console.log('  新', JSON.stringify(r), '字面', JSON.stringify(lit), lit === r[2] ? '✓' : '✗'); });
      (B || []).forEach(function (r) { var lit = otxt.slice(r[0], r[1]); console.log('  舊', JSON.stringify(r), '字面', JSON.stringify(lit), lit === r[2] ? '✓' : '✗'); });
    } else {
      var tokStart = {}; q.tok.forEach(function (t) { tokStart[t[0]] = t; });
      var otokStart = {}; qo.tok.forEach(function (t) { otokStart[t[0]] = t; });
      Object.keys(B || {}).forEach(function (k) {
        var kk = +k, nk = kk >= ins ? kk + delta : kk;
        var ow2 = otokStart[kk] ? otxt.slice(otokStart[kk][0], otokStart[kk][1]) : '(舊非tok起點)';
        var nw2 = tokStart[nk] ? txt.slice(tokStart[nk][0], tokStart[nk][1]) : '(新非tok起點)';
        var have = A && A[nk] === B[k];
        console.log('  ', k, '→', nk, JSON.stringify(ow2), '→', JSON.stringify(nw2), have ? '✓' : '✗ 新檔沒有對應', JSON.stringify(B[k]));
      });
      Object.keys(A || {}).forEach(function (k) {
        var ok = Object.keys(B || {}).some(function (o) { var nk = +o >= ins ? +o + delta : +o; return nk === +k; });
        if (!ok) console.log('   新增', k, JSON.stringify(tokStart[k] ? txt.slice(tokStart[k][0], tokStart[k][1]) : '(非tok起點)'), JSON.stringify(A[k]));
      });
    }
  }
  ['part1', 'part9', 'phr'].forEach(ctxCheck);
  /* ctx/co_4.js（build 產物）裡 Q15 與 _ctx 合併後是否一致：只印 Q15 段 */
  var cj = fs.readFileSync(path.join(EX, 'ctx/co_4.js'), 'utf8');
  var args = null, LD = function () { args = [].slice.call(arguments); }, sb = { window: { TCF_CTX_LOAD: LD }, TCF_CTX_LOAD: LD };
  require('vm').runInNewContext(cj, sb);
  console.log('ctx/co_4.js 參數數', args.length);
  var p1 = J(path.join(EX, '_ctx/co_4.part1.json')), p9 = J(path.join(EX, '_ctx/co_4.part9.json')), ph = J(path.join(EX, '_ctx/co_4.phr.json'));
  console.log('build 產物 Q15 字義:', JSON.stringify(args[1]['15']));
  console.log('build 產物 Q15 片語:', JSON.stringify(args[2] && args[2]['15']));
  var merged = Object.assign({}, p1['15'] || {}, p9['15'] || {});
  console.log('part1+part9 合併 == 產物?', JSON.stringify(Object.keys(merged).sort()) === JSON.stringify(Object.keys(args[1]['15']).sort()),
    Object.keys(args[1]['15']).every(function (k) { return args[1]['15'][k] === merged[k]; }));
  console.log('phr == 產物?', JSON.stringify(ph['15']) === JSON.stringify(args[2] && args[2]['15']));
  /* 產物裡每個 key 都要是新 tok 的起點 */
  var starts = {}; q.tok.forEach(function (t) { starts[t[0]] = 1; });
  console.log('產物 Q15 key 不是 tok 起點的:', JSON.stringify(Object.keys(args[1]['15']).filter(function (k) { return !starts[k]; })));
  /* data/co_4.js（模考資料）裡 Q15 的文字與 tok 是否跟 listening.json 一致 */
  var dj = fs.readFileSync(path.join(EX, 'data/co_4.js'), 'utf8');
  console.log('data/co_4.js 含新原文?', dj.indexOf('Bienvenue dans La Terre est belle') >= 0, '含舊原文?', dj.indexOf('bienvenue dans la terre belle') >= 0);
  console.log('data/co_4.js 含新中文?', dj.indexOf('歡迎收聽《La Terre est belle》節目') >= 0, '含舊中文?', dj.indexOf('歡迎上節目') >= 0);
  console.log('data/co_4.js 含新 tok 片段?', dj.indexOf(JSON.stringify(q.tok.slice(5, 9))) >= 0 || dj.indexOf(JSON.stringify(q.tok.slice(5, 9)).replace(/,/g, ', ')) >= 0);
  /* 片語表在新原文上會亮哪些 */
  var P2 = require(path.join(R, 'tcf_phrases.js'));
  console.log('tcf_phrases 在 Q15 新原文命中:', JSON.stringify(P2.matchTok(txt, q.tok).map(function (h) { return P2.LIST[h.id].fr + '=' + JSON.stringify(txt.slice(q.tok[h.i0][0], q.tok[h.i1][1])); })));
  console.log('tcf_phrases 在 Q15 舊原文命中:', JSON.stringify(P2.matchTok(otxt, qo.tok).map(function (h) { return P2.LIST[h.id].fr + '=' + JSON.stringify(otxt.slice(qo.tok[h.i0][0], qo.tok[h.i1][1])); })));
}
