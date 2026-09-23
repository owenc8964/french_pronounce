/* listen_decode.js — 聽力解碼練習（2026-09-23）
   ⚠️ 挖空邏輯跟 tools/cut_listening.py 無關，是前端算的——這樣換題能重算、之後能調難度。 */

/* ── 挖哪些字：連音／弱化的熱區優先 ─────────────────────────────
   ⭐ 只挖功能詞，⛔ 不挖內容詞：名詞動詞你猜得到，功能詞猜不到，
      而那正是連音吃掉的部分（les_amis／chais pas／t'as）。 */
var TIER = {
  1: ["l'","d'","qu'","n'","j'","c'","m'","t'"],            /* 省音形：直接抹掉詞界 */
  2: ["ne"],                                                 /* 口語常被整個吞掉 */
  3: ["le","la","les","un","une","des","du","au","aux"],     /* 冠詞 */
  4: ["à","de","en","dans","sur","pour","par","avec","chez"],/* 介系詞 */
  5: ["que","qui","y","se","ce","il","elle","vous","je","on"]
};
var TIER_NAME = { 1:'省音形（l’ d’ qu’ n’）', 2:'ne（否定的前半）', 3:'冠詞', 4:'介系詞', 5:'代名詞／連接詞' };
/* ⛔ 這些片語裡的字不挖：固定塊，挖了沒有辨音價值 */
var SKIP_CTX = [/s'il\s+(vous|te)\s+pla/gi, /est-ce\s+que/gi, /qu'est-ce/gi];
var WORD_RE = /[A-Za-zÀ-ÿ]+'|[A-Za-zÀ-ÿ]+/g;
var Q_WORD = /^(Que|Qu'est-ce|Quel|Quelle|Quels|Quelles|Pourquoi|Comment|Où|Combien|Qui|Quand)\b/;

/* ⚠️⚠️ script_fr 不是乾淨的逐字稿——09-23 實測 1716 題裡：
     24% 混了「Question N :」、28% 混了中文、10% 直接寫了「答案是 B…」。
   ⛔ 不清掉的話答案會印在畫面上，而且會挖到不是音檔內容的字。 */
function cleanScript(s) {
  s = String(s || '');
  /* ⚠️ Question 後面不一定有數字——「Question :」「Question 21 :」都有（09-23 實測漏掉前者）*/
  var cut = s.search(/Questions?\s*\d*\s*[:：]|答案是|正解|正確答案|R[ée]ponses?\s*[:：]|選項|解析/);
  if (cut >= 0) s = s.slice(0, cut);
  s = s.split('\n').filter(function (l) { return !/[一-鿿]/.test(l); }).join('\n');
  return s.replace(/\s*[–—-]\s*$/, '').replace(/\s+$/, '').trim();
}

/* 把「對話內容」跟結尾的「考題問句」分開——⛔ 考題那句不挖空 */
function splitScript(s) {
  s = cleanScript(s);
  var lines = s.split('\n'), tail = (lines[lines.length - 1] || '').trim();
  if (Q_WORD.test(tail) && /\?$/.test(tail)) return { body: lines.slice(0, -1).join('\n').replace(/\s+$/, ''), ask: tail };
  return { body: s, ask: '' };
}

function pickBlanks(body, cap) {
  cap = cap || 8;
  var skip = {};
  SKIP_CTX.forEach(function (re) {
    re.lastIndex = 0; var m;
    while ((m = re.exec(body))) {
      var sub = body.slice(m.index, m.index + m[0].length), w, r2 = new RegExp(WORD_RE.source, 'g');
      while ((w = r2.exec(sub))) skip[m.index + w.index] = 1;
    }
  });
  var toks = [], m2, re2 = new RegExp(WORD_RE.source, 'g');
  while ((m2 = re2.exec(body))) toks.push({ w: m2[0], a: m2.index, b: m2.index + m2[0].length });
  var cands = [];
  toks.forEach(function (t, i) {
    if (skip[t.a]) return;
    var lw = t.w.toLowerCase();
    for (var tier in TIER) if (TIER[tier].indexOf(lw) >= 0) { cands.push({ tier: +tier, i: i, w: t.w, a: t.a, b: t.b }); return; }
  });
  cands.sort(function (x, y) { return x.tier - y.tier || x.i - y.i; });
  return cands.slice(0, cap).sort(function (x, y) { return x.a - y.a; });
}

/* ── 狀態 ──────────────────────────────────────────────────── */
var IDX = null, CUR = null, BLANKS = [], REVEALED = false, RATE = 1;
var AUDIO_EL = null, AUDIO_URL = {}, UNLOCKED = false, PLAYS = 0, SLOW_PLAYS = 0;
var SKIPPED = {};   /* 這一題裡「算了」的格 */

function audioEl() { if (!AUDIO_EL) { AUDIO_EL = new Audio(); AUDIO_EL.preload = 'auto'; } return AUDIO_EL; }
/* ⚠️ iOS Safari 會擋掉 await 之後的 play() → 第一次點畫面就先解鎖 */
function unlock() {
  if (UNLOCKED) return; UNLOCKED = true;
  try { var a = audioEl();
    a.src = 'data:audio/wav;base64,UklGRsQAAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
    var p = a.play(); if (p && p.catch) p.catch(function () {}); } catch (e) {}
}
document.addEventListener('pointerdown', unlock, true);
document.addEventListener('touchstart', unlock, true);

function stat() { try { return JSON.parse(localStorage.getItem('clb7_listen_decode')) || {}; } catch (e) { return {}; } }
function saveStat(s) { try { localStorage.setItem('clb7_listen_decode', JSON.stringify(s)); } catch (e) {} }
/* 記錄用物件形狀＋last，配合 sync_supabase.js 的物件合併慣例 */
function bump(key, field) {
  var s = stat(); var r = s[key] || { n: 0, miss: 0, last: 0 };
  r.n++; if (field === 'miss') r.miss++;
  r.last = Date.now(); s[key] = r; saveStat(s);
}

function render(h) { document.getElementById('app').innerHTML = h; }

/* ── 登入（跟考試之塔共用同一組帳號）───────────────────────── */
function showLogin(msg) {
  render('<div class="box"><div class="box-t">先登入</div>' +
    '<div class="hint" style="margin:0 0 12px">聽力音檔是你買的考題，放在你自己的私人空間，⛔ 不在公開網站上。帳號跟「考試之塔」共用。</div>' +
    '<div class="login"><input id="em" type="email" placeholder="Email" autocomplete="username">' +
    '<input id="pw" type="password" placeholder="密碼" autocomplete="current-password">' +
    '<button class="btn go" onclick="doLogin()">登入</button></div>' +
    (msg ? '<div class="err">' + esc(msg) + '</div>' : '') + '</div>');
}
function doLogin() {
  var em = document.getElementById('em').value.trim(), pw = document.getElementById('pw').value;
  if (!em || !pw) return showLogin('帳號密碼都要填');
  render('<div class="box">登入中…</div>');
  vaultAuth('password', { email: em, password: pw })
    .then(boot).catch(function (e) { showLogin(e.message || '登入失敗'); });
}

/* ── 載入索引 ──────────────────────────────────────────────── */
function boot() {
  if (!vaultSession()) return showLogin('');
  render('<div class="box">載入題庫中…</div>');
  vaultGet('listen/index.json').then(function (j) {
    IDX = j; nextQ();
  }).catch(function (e) {
    if (e.status === 401 || e.status === 400) { vaultStore(null); return showLogin('登入過期了，再登一次'); }
    render('<div class="box"><div class="err">載入不到題庫：' + esc(e.message) + '</div>' +
      '<div class="hint">⚠️ 如果是 404，代表音檔還沒上傳到私人空間（<code>listen/</code>）。</div>' +
      '<button class="btn" style="margin-top:12px" onclick="boot()">再試一次</button></div>');
  });
}

function allItems() {
  var out = [];
  (IDX.tests || []).forEach(function (t) {
    (t.items || []).forEach(function (i) { out.push(i); });
  });
  return out;
}

/* 沒做過的優先；⛔ 不顯示分母（memory feedback_fun_is_the_engine）*/
function nextQ() {
  var items = allItems(), s = stat();
  var fresh = items.filter(function (i) { return !s['q_' + i.f]; });
  var pool = fresh.length ? fresh : items;
  /* ⚠️ 清理後太短、或挖不出 4 格的題目不能用（稿被污染切掉太多）→ 換一題，最多試 40 次 */
  for (var tries = 0; tries < 40; tries++) {
    var c = pool[Math.floor(Math.random() * pool.length)];
    var sp = splitScript(c.script);
    var bl = pickBlanks(sp.body, 8);
    if (sp.body.length >= 40 && bl.length >= 4) {
      CUR = c; CUR._body = sp.body; CUR._ask = sp.ask; BLANKS = bl;
      REVEALED = false; PLAYS = 0; SLOW_PLAYS = 0; SKIPPED = {};
      return drawQ();
    }
  }
  render('<div class="box">這一批題目的逐字稿清理後都太短了，⛔ 沒有可用的題。' +
         '<div class="hint">（1716 題裡有兩成多的稿混了題目編號、中文解析或答案，那些會被清掉。）</div></div>');
}

function drawQ() {
  var body = CUR._body, h = '', last = 0;
  BLANKS.forEach(function (g, gi) {
    h += '<span class="plain">' + esc(body.slice(last, g.a)) + '</span>';
    h += '<span class="gap" id="g' + gi + '"><input id="i' + gi + '" autocapitalize="off" autocorrect="off" spellcheck="false">' +
         '<button class="gap-x" id="x' + gi + '" title="這格算了（不算錯）" onclick="gapSkip(' + gi + ')">✕</button></span>';
    last = g.b;
  });
  h += '<span class="plain">' + esc(body.slice(last)) + '</span>';
  h = h.replace(/\n/g, '<br>');

  render(
    '<div class="box">' +
      '<div class="play-row">' +
        '<button class="big-play" onclick="play(1)">▶ 聽一次</button>' +
        '<button class="btn" onclick="play(0.75)">🐢 放慢 0.75x</button>' +
        '<span class="spd">長度 <b>' + CUR.sec + '</b> 秒</span>' +
      '</div>' +
      '<div class="hint" style="margin-top:0">填空只挖<b>功能詞</b>——名詞動詞都留著。聽不出來就放慢，⛔ 不要用文法推。</div>' +
      '<div class="script">' + h + '</div>' +
      (CUR._ask ? '<div class="ask">❓ 這題考的是：' + esc(CUR._ask) + '</div>' : '') +
      '<div class="row" style="margin-top:14px">' +
        '<button class="btn go" onclick="check()">對答案</button>' +
        '<button class="btn warn" onclick="skipQ()">⏭ 這題跳過</button>' +
      '</div>' +
      '<div id="res"></div>' +
    '</div>');
  var f = document.getElementById('i0'); if (f) f.focus();
}

function voiceUrl(f) {
  if (AUDIO_URL[f]) return Promise.resolve(AUDIO_URL[f]);
  return vaultGet('listen/' + f, true).then(function (b) { return (AUDIO_URL[f] = URL.createObjectURL(b)); });
}
function play(rate) {
  RATE = rate; if (rate === 1) PLAYS++; else SLOW_PLAYS++;
  if (window.TtsReader && TtsReader.supported) TtsReader.stopAll();
  voiceUrl(CUR.f).then(function (u) {
    var a = audioEl();
    try { a.pause(); } catch (e) {}
    a.src = u; a.playbackRate = rate; a.currentTime = 0;
    var p = a.play(); if (p && p.catch) p.catch(function () {});
  }).catch(function (e) {
    document.getElementById('res').innerHTML = '<div class="err">音檔載入失敗：' + esc(e.message) + '</div>';
  });
}

/* 比對時去掉重音與大小寫差異——⛔ 這一關練的是聽到什麼，不是拼寫 */
function norm(s) {
  return String(s || '').toLowerCase().trim()
    .replace(/[''`´]/g, "'").normalize('NFD').replace(/[̀-ͯ]/g, '');
}

/* 三層出口的第一層：這一格我放棄 ⛔ 不算錯、不進複習、分母要扣掉 */
function gapSkip(gi) {
  if (REVEALED) return;
  SKIPPED[gi] = 1;
  var el = document.getElementById('g' + gi), inp = document.getElementById('i' + gi),
      x = document.getElementById('x' + gi);
  if (el) el.className = 'gap skip';
  if (inp) { inp.value = '—'; inp.disabled = true; }
  if (x) x.remove();
}

function check() {
  REVEALED = true;
  var ok = 0, bad = 0, skip = 0, missTier = {};
  BLANKS.forEach(function (g, gi) {
    var el = document.getElementById('g' + gi), inp = document.getElementById('i' + gi);
    if (SKIPPED[gi]) { skip++; return; }
    var good = norm(inp.value) === norm(g.w);
    el.className = 'gap ' + (good ? 'ok' : 'bad');
    inp.disabled = true;
    if (good) ok++; else {
      bad++; missTier[g.tier] = (missTier[g.tier] || 0) + 1;
      el.insertAdjacentHTML('beforeend', '<span class="sol">→ ' + esc(g.w) + '</span>');
    }
  });
  var total = ok + bad;   /* ⛔ 分母扣掉跳過的（練習頁鐵律）*/
  bump('q_' + CUR.f, bad ? 'miss' : 'ok');
  var s = stat();
  Object.keys(missTier).forEach(function (t) {
    var k = 'tier_' + t, r = s[k] || { n: 0, miss: 0, last: 0 };
    r.miss += missTier[t]; r.n += missTier[t]; r.last = Date.now(); s[k] = r;
  });
  saveStat(s);

  var msg = '<div class="res">填對 <b>' + ok + '</b>／' + total + (skip ? '　（跳過 ' + skip + ' 格不算）' : '') + '</div>';
  if (Object.keys(missTier).length) {
    msg += '<div class="miss">這次漏掉的是：' +
      Object.keys(missTier).sort().map(function (t) { return TIER_NAME[t] + ' ×' + missTier[t]; }).join('、') + '</div>';
  }
  /* ⭐ 慢速 vs 原速：兩種問題的練法完全不同，所以分開講 */
  if (bad && SLOW_PLAYS === 0) msg += '<div class="miss">⭐ 還沒試過放慢——先按 🐢 再聽一次，如果慢速填得出來，代表音你認得，問題在處理速度。</div>';
  else if (bad && SLOW_PLAYS > 0) msg += '<div class="miss">⭐ 慢速也沒填出來的那幾個，代表那個音還沒建立——那是要單獨練的，不是多聽就會好。</div>';
  msg += '<div class="zh">' + esc(CUR.zh || '') + '</div>';
  msg += '<div class="row" style="margin-top:14px"><button class="btn go" onclick="nextQ()">下一題 →</button>' +
         '<button class="btn" onclick="play(0.75)">🐢 再聽一次（慢）</button></div>';
  document.getElementById('res').innerHTML = msg;
}

function skipQ() {
  bump('q_' + CUR.f, 'skip');   /* ⛔ 跳過不算錯、不進複習（練習頁鐵律）*/
  nextQ();
}

boot();
