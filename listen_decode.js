/* listen_decode.js — 聽力解碼練習（2026-09-23）
   ⚠️ 挖空邏輯跟 tools/cut_listening.py 無關，是前端算的——這樣換題能重算、之後能調難度。
   ⭐ 2026-10-20 加「課本」來源：Édito A2／B1 課本音檔＋原版逐字稿（私人空間 didier/，見 HANDOFF 三之七十八）。
      課本一軌是 1–3 分鐘的整段對話 → 播放器要能暫停／續播／倒退，挖空平均分散在整段。 */

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
/* ⛔ 說話人標籤（「La journaliste :」）與段落標記（「Document 1」）不是錄音內容，不挖 */
var LABEL_CTX = [/^[^\n:]{1,40}\s?:/gm, /^(Document|Dialogue|Exercice)\s*\d+.*$/gm];
var WORD_RE = /[A-Za-zÀ-ÿ]+'|[A-Za-zÀ-ÿ]+/g;
var Q_WORD = /^(Que|Qu'est-ce|Quel|Quelle|Quels|Quelles|Pourquoi|Comment|Où|Combien|Qui|Quand)\b/;

/* ⚠️⚠️ script_fr 不是乾淨的逐字稿——09-23 實測 1716 題裡：
     24% 混了「Question N :」、28% 混了中文、10% 直接寫了「答案是 B…」。
   ⛔ 不清掉的話答案會印在畫面上，而且會挖到不是音檔內容的字。
   （課本逐字稿是乾淨的，不走這一關，見 bookItem） */
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

/* 課本逐字稿是照課本欄寬硬斷行的 → 接回段落：新的說話人／Document／a. 才換行 */
function reflow(t) {
  t = String(t || '').replace(/[’‘]/g, "'").replace(/ /g, ' ');
  var out = [];
  t.split('\n').forEach(function (l) {
    l = l.trim(); if (!l) return;
    var newPara = !out.length || /^[^\s:][^:]{0,38}\s?:/.test(l) || /^(Document|Dialogue|Exercice)\s*\d/.test(l) ||
                  /^[a-h]\.\s/.test(l) || /^\(/.test(l) || /^(Document|Dialogue)\s*\d/.test(out[out.length - 1]);
    if (newPara) out.push(l); else out[out.length - 1] += ' ' + l;
  });
  return out.join('\n');
}

function protectedStarts(body, list) {
  var skip = {};
  list.forEach(function (re) {
    re.lastIndex = 0; var m;
    while ((m = re.exec(body))) {
      var sub = body.slice(m.index, m.index + m[0].length), w, r2 = new RegExp(WORD_RE.source, 'g');
      while ((w = r2.exec(sub))) skip[m.index + w.index] = 1;
      if (!m[0].length) re.lastIndex++;
    }
  });
  return skip;
}

/* spread=true：長篇（課本整段對話）——把全文切成 cap 個區間，每區挑一格最熱的，⛔ 不要全擠在開頭 */
function pickBlanks(body, cap, spread) {
  cap = cap || 8;
  var skip = protectedStarts(body, spread ? SKIP_CTX.concat(LABEL_CTX) : SKIP_CTX);
  var toks = [], m2, re2 = new RegExp(WORD_RE.source, 'g');
  while ((m2 = re2.exec(body))) toks.push({ w: m2[0], a: m2.index, b: m2.index + m2[0].length });
  var cands = [];
  toks.forEach(function (t, i) {
    if (skip[t.a]) return;
    var lw = t.w.toLowerCase();
    for (var tier in TIER) if (TIER[tier].indexOf(lw) >= 0) { cands.push({ tier: +tier, i: i, w: t.w, a: t.a, b: t.b }); return; }
  });
  if (!spread || cands.length <= cap) {
    cands.sort(function (x, y) { return x.tier - y.tier || x.i - y.i; });
    return cands.slice(0, cap).sort(function (x, y) { return x.a - y.a; });
  }
  var out = [], L = body.length;
  for (var k = 0; k < cap; k++) {
    var lo = L * k / cap, hi = L * (k + 1) / cap;
    var win = cands.filter(function (c) { return c.a >= lo && c.a < hi; });
    if (!win.length) continue;
    /* 同一區裡：熱度優先，同熱度挑靠中間的（離區間邊界遠，前後文比較完整） */
    var mid = (lo + hi) / 2;
    win.sort(function (x, y) { return x.tier - y.tier || Math.abs(x.a - mid) - Math.abs(y.a - mid); });
    out.push(win[0]);
  }
  return out.sort(function (x, y) { return x.a - y.a; });
}

/* ── 狀態 ──────────────────────────────────────────────────── */
var IDX = null, CUR = null, BLANKS = [], REVEALED = false, RATE = 1;
var AUDIO_EL = null, AUDIO_URL = {}, UNLOCKED = false, PLAYS = 0, SLOW_PLAYS = 0;
var SKIPPED = {};   /* 這一題裡「算了」的格 */
/* 來源：'tcf'（TCF 考題短段）／'book'（課本整段對話）。選擇記在本機就好（⚠️ 刻意不用 clb7_ 開頭，不必同步） */
var SRC = lsGet('ld_source') || 'book';   /* 10-20 起預設課本：學過的字、乾淨的逐字稿 */
var BOOK_IDX = null, BOOK_DATA = {}, BOOK_SEL = lsGet('ld_book_sel') || '';

function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

function audioEl() {
  if (!AUDIO_EL) {
    AUDIO_EL = new Audio(); AUDIO_EL.preload = 'auto';
    AUDIO_EL.addEventListener('timeupdate', tick);
    AUDIO_EL.addEventListener('pause', tick); AUDIO_EL.addEventListener('play', tick);
  }
  return AUDIO_EL;
}
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

function render(h) { document.getElementById('app').innerHTML = srcTabs() + h; }
function srcTabs() {
  return '<div class="src-tabs">' +
    '<button class="src' + (SRC === 'book' ? ' on' : '') + '" onclick="setSrc(\'book\')">📗 課本（上過的課）</button>' +
    '<button class="src' + (SRC === 'tcf' ? ' on' : '') + '" onclick="setSrc(\'tcf\')">🎧 TCF 考題</button></div>';
}
function setSrc(s) {
  if (s === SRC && CUR) return;
  SRC = s; lsSet('ld_source', s); CUR = null; stopAudio(); boot();
}
function stopAudio() { try { if (AUDIO_EL) AUDIO_EL.pause(); } catch (e) {} }

/* ── 登入（跟考試之塔共用同一組帳號）───────────────────────── */
function showLogin(msg) {
  render('<div class="box"><div class="box-t">先登入</div>' +
    '<div class="hint" style="margin:0 0 12px">聽力音檔（TCF 考題、課本音檔）都是你買的教材，放在你自己的私人空間，⛔ 不在公開網站上。帳號跟「考試之塔」共用，登入一次會記住。</div>' +
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

function loadFail(e, folder) {
  if (e.status === 401 || e.status === 400) { vaultStore(null); return showLogin('登入過期了，再登一次'); }
  render('<div class="box"><div class="err">載入不到題庫：' + esc(e.message) + '</div>' +
    '<div class="hint">⚠️ 如果是 404，代表音檔還沒上傳到私人空間（<code>' + folder + '/</code>）。</div>' +
    '<button class="btn" style="margin-top:12px" onclick="boot()">再試一次</button></div>');
}

/* ── 載入索引 ──────────────────────────────────────────────── */
function boot() {
  if (!vaultSession()) return showLogin('');
  if (SRC === 'book') return bookBoot();
  render('<div class="box">載入題庫中…</div>');
  vaultGet('listen/index.json').then(function (j) {
    IDX = j; nextQ();
  }).catch(function (e) { loadFail(e, 'listen'); });
}

function allItems() {
  if (SRC === 'book') return bookPool();
  var out = [];
  (IDX.tests || []).forEach(function (t) {
    (t.items || []).forEach(function (i) { out.push({ f: i.f, path: 'listen/' + i.f, sec: i.sec, zh: i.zh, script: i.script }); });
  });
  return out;
}

/* 沒做過的優先；⛔ 不顯示分母（memory feedback_fun_is_the_engine）*/
function nextQ() {
  var items = allItems(), s = stat();
  if (!items.length) return SRC === 'book' ? bookPicker('這個範圍沒有可以練的對話，換一個單元。') : render('<div class="box">沒有題目。</div>');
  var fresh = items.filter(function (i) { return !s['q_' + i.f]; });
  var pool = fresh.length ? fresh : items;
  /* ⚠️ 清理後太短、或挖不出 4 格的題目不能用（稿被污染切掉太多）→ 換一題，最多試 40 次 */
  for (var tries = 0; tries < 40; tries++) {
    var c = pool[Math.floor(Math.random() * pool.length)];
    var sp = c.book ? { body: c.script, ask: '' } : splitScript(c.script);
    var bl = c.book ? pickBookBlanks(sp.body) : pickBlanks(sp.body, 8, false);
    if (sp.body.length >= 40 && bl.length >= 4) {
      CUR = c; CUR._body = sp.body; CUR._ask = sp.ask; BLANKS = bl;
      REVEALED = false; PLAYS = 0; SLOW_PLAYS = 0; SKIPPED = {};
      stopAudio();
      return drawQ();
    }
  }
  render('<div class="box">這一批題目的逐字稿清理後都太短了，⛔ 沒有可用的題。' +
         '<div class="hint">（1716 題裡有兩成多的稿混了題目編號、中文解析或答案，那些會被清掉。）</div></div>');
}

function fmt(t) { t = Math.max(0, Math.floor(t || 0)); return Math.floor(t / 60) + ':' + ('0' + t % 60).slice(-2); }
function tick() {
  if (AUDIO_EL && CUR && CUR.t1 && loaded() && AUDIO_EL.currentTime >= CUR.t1) {   /* 只播這一段 */
    AUDIO_EL.pause(); AUDIO_EL.currentTime = CUR.t1;
  }
  var el = document.getElementById('clock'); if (!el || !AUDIO_EL) return;
  var t0 = (CUR && CUR.t0) || 0;
  el.textContent = fmt(AUDIO_EL.currentTime - t0) + ' / ' + fmt(CUR && CUR.sec);
  var pb = document.getElementById('pp'); if (pb) pb.textContent = AUDIO_EL.paused ? '⏯ 繼續' : '⏸ 暫停';
}

function drawQ() {
  var body = CUR._body, h = '', last = 0;
  BLANKS.forEach(function (g, gi) {
    h += '<span class="plain">' + plainHtml(body.slice(last, g.a)) + '</span>';
    h += '<span class="gap" id="g' + gi + '"><input id="i' + gi + '" autocapitalize="off" autocorrect="off" spellcheck="false">' +
         (CUR.book ? '' :   /* Owen 10-21：填空「沒啥需要跳過的，就只是不會而已」→ 課本段落不放每格 ✕，空著＝不會 */
         '<button class="gap-x" id="x' + gi + '" title="這格算了（不算錯）" onclick="gapSkip(' + gi + ')">✕</button>') + '</span>';
    last = g.b;
  });
  h += '<span class="plain">' + plainHtml(body.slice(last)) + '</span>';
  h = h.replace(/\n/g, '<br>');

  var head = CUR.book ? '<div class="crumb">' + esc(CUR.label) +
      ' <button class="btn mini" onclick="bookPicker()">換範圍</button></div>' : '';
  var controls = CUR.book
    ? '<button class="big-play" onclick="play(RATE, true)">▶ 從頭聽</button>' +
      '<button class="btn" id="pp" onclick="togglePause()">⏯ 繼續</button>' +
      '<button class="btn" onclick="back5()">⏪ 退 5 秒</button>' +
      '<button class="btn" id="rt" onclick="toggleRate()">' + (RATE < 1 ? '🐢 0.75x（按回原速）' : '🐢 放慢 0.75x') + '</button>' +
      '<span class="spd" id="clock">0:00 / ' + fmt(CUR.sec) + '</span>'
    : '<button class="big-play" onclick="play(1)">▶ 聽一次</button>' +
      '<button class="btn" onclick="play(0.75)">🐢 放慢 0.75x</button>' +
      '<span class="spd">長度 <b>' + CUR.sec + '</b> 秒</span>';

  render(
    '<div class="box">' + head +
      '<div class="play-row' + (CUR.book ? ' sticky' : '') + '">' + controls + '</div>' +
      (CUR.book
        ? '<div class="hint" style="margin-top:0">挖的大多是<b>你學過的單字</b>，少數是連音、省音的小字。聽不出來就放慢或退 5 秒，空著就是不會，⛔ 不要用文法推。<span class="unsp">(ne)</span> 這種灰色括號＝錄音裡其實沒唸。</div>'
        : '<div class="hint" style="margin-top:0">填空只挖<b>功能詞</b>——名詞動詞都留著。聽不出來就放慢，⛔ 不要用文法推。</div>') +
      '<div class="script">' + h + '</div>' +
      (CUR._ask ? '<div class="ask">❓ 這題考的是：' + esc(CUR._ask) + '</div>' : '') +
      '<div class="row" style="margin-top:14px">' +
        '<button class="btn go" onclick="check()">對答案</button>' +
        (CUR.book ? '<button class="btn-link" onclick="skipQ()">這段跳過</button>'
                  : '<button class="btn warn" onclick="skipQ()">⏭ 這題跳過</button>') +
      '</div>' +
      '<div id="res"></div>' +
    '</div>');
  var f = document.getElementById('i0'); if (f && !CUR.book) f.focus();
}

function voiceUrl(item) {
  var p = item.path;
  if (AUDIO_URL[p]) return Promise.resolve(AUDIO_URL[p]);
  return vaultGet(p, true).then(function (b) { return (AUDIO_URL[p] = URL.createObjectURL(b)); });
}
/* fromStart=false 且同一軌已載入 → 續播（課本長段用）；TCF 短段一律從頭 */
function play(rate, fromStart) {
  RATE = rate; if (rate === 1) PLAYS++; else SLOW_PLAYS++;
  if (window.TtsReader && TtsReader.supported) TtsReader.stopAll();
  voiceUrl(CUR).then(function (u) {
    var a = audioEl();
    try { a.pause(); } catch (e) {}
    if (a.src !== u) a.src = u;
    a.playbackRate = rate;
    if (fromStart !== false) a.currentTime = CUR.t0 || 0;
    var p = a.play(); if (p && p.catch) p.catch(function () {});
  }).catch(function (e) {
    document.getElementById('res').innerHTML = '<div class="err">音檔載入失敗：' + esc(e.message) + '</div>';
  });
}
function loaded() { return AUDIO_EL && CUR && AUDIO_EL.src === AUDIO_URL[CUR.path]; }
function togglePause() {
  if (!loaded()) return play(RATE, true);
  if (AUDIO_EL.paused) {
    if (CUR.t1 && AUDIO_EL.currentTime >= CUR.t1 - 0.05) AUDIO_EL.currentTime = CUR.t0 || 0;   /* 播完了 → 從段頭再來 */
    var p = AUDIO_EL.play(); if (p && p.catch) p.catch(function () {});
  } else AUDIO_EL.pause();
}
function back5() {
  if (!loaded()) return play(RATE, true);
  AUDIO_EL.currentTime = Math.max(CUR.t0 || 0, AUDIO_EL.currentTime - 5);
  if (AUDIO_EL.paused) { var p = AUDIO_EL.play(); if (p && p.catch) p.catch(function () {}); }
}
function toggleRate() {
  RATE = RATE < 1 ? 1 : 0.75; if (RATE < 1) SLOW_PLAYS++;
  if (AUDIO_EL) AUDIO_EL.playbackRate = RATE;
  var b = document.getElementById('rt'); if (b) b.textContent = RATE < 1 ? '🐢 0.75x（按回原速）' : '🐢 放慢 0.75x';
}

/* 比對時去掉重音與大小寫差異——⛔ 這一關練的是聽到什麼，不是拼寫 */
function norm(s) {
  return String(s || '').toLowerCase().trim()
    .replace(/[’‘`´]/g, "'").normalize('NFD').replace(/[̀-ͯ]/g, '');
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
  if (REVEALED) return;
  if (CUR.book) return checkBook();
  REVEALED = true;
  var ok = 0, bad = 0, skip = 0, missTier = {}, missed = [];
  BLANKS.forEach(function (g, gi) {
    var el = document.getElementById('g' + gi), inp = document.getElementById('i' + gi);
    if (SKIPPED[gi]) { skip++; return; }
    var good = norm(inp.value) === norm(g.w);
    el.className = 'gap ' + (good ? 'ok' : 'bad');
    inp.disabled = true;
    var x = document.getElementById('x' + gi); if (x) x.remove();
    if (good) ok++; else {
      bad++; missTier[g.tier] = (missTier[g.tier] || 0) + 1; missed.push(g.w);
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
  if (missed.length) {
    /* ⭐ 鏡子：讓他看得到「這段我漏掉的是哪些字」（Owen 10-19：「我沒有到聽得懂哪個部分」）*/
    msg += '<div class="miss">這段漏掉的字：<b>' + missed.map(esc).join('、') + '</b><br>分類：' +
      Object.keys(missTier).sort().map(function (t) { return TIER_NAME[t] + ' ×' + missTier[t]; }).join('、') + '</div>';
  }
  /* ⭐ 慢速 vs 原速：兩種問題的練法完全不同，所以分開講 */
  if (bad && SLOW_PLAYS === 0) msg += '<div class="miss">⭐ 還沒試過放慢——先按 🐢 再聽一次，如果慢速填得出來，代表音你認得，問題在處理速度。</div>';
  else if (bad && SLOW_PLAYS > 0) msg += '<div class="miss">⭐ 慢速也沒填出來的那幾個，代表那個音還沒建立——那是要單獨練的，不是多聽就會好。</div>';
  msg += '<div class="zh">' + esc(CUR.zh || '') + '</div>';
  msg += '<div class="row" style="margin-top:14px"><button class="btn go" onclick="nextQ()">下一段 →</button>' +
         '<button class="btn" onclick="RATE=0.75;SLOW_PLAYS++;play(0.75, true)">🐢 慢速從頭再聽</button></div>';
  document.getElementById('res').innerHTML = msg;
}

function skipQ() {
  bump('q_' + CUR.f, 'skip');   /* ⛔ 跳過不算錯、不進複習（練習頁鐵律）*/
  nextQ();
}

/* ══ 課本來源（2026-10-20）══════════════════════════════════════
   私人空間 didier/index.json＋didier/<book>.json（每軌 track／unit／page／title／dur／text）。
   ⛔ Cahier（a2c）先不放：它是掃描檔，逐字稿是 OCR，抽查就有漏行 → 挖空會「稿錯了卻判你錯」＝冤枉。
   ⛔ 發音練習軌（Phonie-graphie／Phonétique）與詞彙朗讀軌不放：兩欄單字表抽出來順序是亂的，也不是對話。 */
var BOOKS_USE = ['a2', 'b1'];
/* 單元 → 大約是第幾課（依 french_notes 各課提到的 Unité 推的，⚠️ 只是參考）*/
var UNIT_LESSONS = {
  a2: { 1:'17–19', 2:'20–22', 3:'23–25', 4:'25–27', 5:'27–28', 6:'29–31', 7:'31–32', 8:'33–34',
        9:'35–36', 10:'36–38', 11:'38–40', 12:'40–42' },
  b1: { 1:'43 課起' }
};
var B1_UNITS_DONE = 1;   /* B1 上到第幾單元（10-19 第43課開始 Unité 1）；之後的單元先不出 */

/* 段落清單（tools/didier_align.py 產生、上傳到 didier/segments_<book>.json）：
   每段 ≤ 60 秒、頭尾切在安靜處（已把開頭唸的報題「Page 13, document C…」切掉）；ok=false 的段 ⛔ 不出題 */
var SEGS = {};
function bookBoot() {
  render('<div class="box">載入課本音檔清單中…</div>');
  var jobs = [];
  BOOKS_USE.forEach(function (b) {
    if (!BOOK_DATA[b]) jobs.push(vaultGet('didier/' + b + '.json').then(function (j) { BOOK_DATA[b] = j; }));
    if (!SEGS[b]) jobs.push(vaultGet('didier/segments_' + b + '.json').then(function (j) { SEGS[b] = j; }));
  });
  Promise.all(jobs).then(function () {
    buildLex();
    if (BOOK_SEL && bookPool().length) nextQ(); else bookPicker();
  }).catch(function (e) { loadFail(e, 'didier'); });
}

function trackOf(b, n) {
  var arr = BOOK_DATA[b] || [];
  for (var i = 0; i < arr.length; i++) if (arr[i].track === n) return arr[i];
  return null;
}
function usable(b, sg) {
  if (!sg.ok) return false;
  if (/Phon|Vocabulaire/.test(sg.title || '')) return false;
  if (b === 'b1' && (sg.unit > B1_UNITS_DONE || sg.page >= 189)) return false;   /* 還沒上的 B1 單元、B1 的 DELF 模擬考先不出 */
  return true;
}
function bookItem(b, sg) {
  var t = trackOf(b, sg.track) || {};
  var path = 'didier/' + (t.f || (b + '/' + ('00' + sg.track).slice(-3) + '.m4a'));
  return { book: b, path: path, f: path + '#' + sg.seg,
           t0: sg.start, t1: sg.end, sec: Math.round(sg.end - sg.start),
           script: sg.text.replace(/[’‘]/g, "'"), zh: '', unit: sg.unit, page: sg.page,
           label: (b === 'a2' ? 'Édito A2' : 'Édito B1') + '・Unité ' + sg.unit + '・p.' + sg.page + '　' + (sg.title || '') };
}
function bookAll() {
  var out = [];
  BOOKS_USE.forEach(function (b) {
    (SEGS[b] || []).forEach(function (sg) { if (usable(b, sg)) out.push(bookItem(b, sg)); });
  });
  return out;
}
/* BOOK_SEL：'' / 'all' / 'a2:5' / 'b1:1' */
function bookPool() {
  var all = bookAll();
  if (!BOOK_SEL || BOOK_SEL === 'all') return all;
  var p = BOOK_SEL.split(':');
  return all.filter(function (i) { return i.book === p[0] && String(i.unit) === p[1]; });
}
function bookPicker(msg) {
  stopAudio(); CUR = null;
  var all = bookAll(), s = stat(), groups = {};
  all.forEach(function (i) {
    var k = i.book + ':' + i.unit;
    (groups[k] = groups[k] || { n: 0, done: 0 }).n++;
    if (s['q_' + i.f]) groups[k].done++;
  });
  function btn(k, title, sub) {
    var g = groups[k]; if (!g) return '';
    /* ⛔ 不秀分母：只說「還有幾段沒聽過」，全聽過就說「都聽過了，可以再聽」 */
    var left = g.n - g.done;
    return '<button class="unit-btn" onclick="pickBook(\'' + k + '\')"><b>' + esc(title) + '</b>' +
           '<span>' + esc(sub) + '</span><span class="u-n">' + (left ? '還有 ' + left + ' 段沒聽過' : '都聽過了，可以再聽') + '</span></button>';
  }
  var h = '<div class="box"><div class="box-t">選範圍</div>' + (msg ? '<div class="err">' + esc(msg) + '</div>' : '') +
    '<div class="hint" style="margin:0 0 10px">都是你課本的原版錄音和逐字稿（真人、不同的人講）。⭐ 一段最多一分鐘。</div>' +
    '<button class="unit-btn wide" onclick="pickBook(\'all\')"><b>🎲 從上過的全部隨機</b><span>' + all.length + ' 段</span></button>';
  h += '<div class="box-t" style="margin-top:14px">Édito B1（新課本）</div><div class="units">';
  for (var u = 1; u <= B1_UNITS_DONE; u++) h += btn('b1:' + u, 'Unité ' + u, '第 ' + UNIT_LESSONS.b1[u]);
  h += '</div><div class="box-t" style="margin-top:14px">Édito A2</div><div class="units">';
  for (u = 12; u >= 1; u--) h += btn('a2:' + u, 'Unité ' + u, '約第 ' + UNIT_LESSONS.a2[u] + ' 課');
  h += '</div></div>';
  render(h);
}
function pickBook(k) { BOOK_SEL = k; lsSet('ld_book_sel', k); nextQ(); }

/* ══ 課本段落的挖空（2026-10-23，依 Owen 10-21 規格＋R57／R58）══════════
   ⭐ 大部分挖「你學過的單字」（複習卡 CHUNKS＋常用句 SENTENCES 出現過的字），少數挖連音／省音的小字
     （R58：挖學過的內容詞跟聽力 r=.77；約 75%／25%）。
   ⭐ 格子之間至少隔 MIN_GAP 個字（R58：同一個片語裡挖兩格，一個沒聽到另一個也跟著掉，等於只量到一次）。
   ⛔ 不挖：說話人標籤、(ne)／(n')／(e) 這種「錄音裡沒唸」的括號字（R57：B1 逐字稿有 17 處，挖了＝冤枉）。 */
var MIN_GAP = 8;
var FUNC = {};   /* 功能詞：不當「單字」挖（但可以在功能詞那一層挖） */
('le la les l un une des du de d au aux à a en dans sur sous pour par avec chez sans vers et ou mais donc or ni car ' +
 'que qu qui quoi dont où ce c cet cette ces se s il ils elle elles on je j tu vous nous me m te t lui leur leurs y ' +
 'ne n pas plus moins très bien aussi si est sont ai as avons avez ont suis es sommes êtes était été être avoir ' +
 'mon ma mes ton ta tes son sa ses notre nos votre vos comme alors puis ça cela oui non quand tout tous toute toutes ' +
 'même autre autres peu trop bon voilà ah oh eh euh ben bah hein là ici déjà encore ' +
 'faire fait font va vais vas allez aller vont dit dire peut peux veut veux ' +
 'moi toi soi eux celui celle ceux celles quel quelle quels quelles').split(' ').forEach(function (w) { FUNC[norm(w)] = 1; });

var LEX = null;   /* { learned: {norm: 1}, dict: {norm: {zh, lesson}}, lessonOf: {norm: lesson} } */
function buildLex() {
  if (LEX) return;
  LEX = { learned: {}, dict: {}, lessonOf: {}, phrase: {} };   /* phrase：這個字出現在哪張學過的片語卡（給詳解對照用法） */
  var art = /^(le |la |les |l'|un |une |des |du |de la |de l'|se |s'|à |au |aux )/i;
  function addWords(fr, lesson) {
    var ws = String(fr || '').replace(/[’‘]/g, "'").replace(/\([^)]*\)/g, ' ').match(/[A-Za-zÀ-ÿ]+/g) || [];
    ws.forEach(function (w) {
      var k = norm(w); if (k.length < 3 || FUNC[k]) return;
      LEX.learned[k] = 1;
      if (lesson && !(k in LEX.lessonOf)) LEX.lessonOf[k] = lesson;
    });
  }
  (typeof CHUNKS !== 'undefined' ? CHUNKS : []).forEach(function (c) {   /* ⚠️ const 宣告不會掛到 window 上 */
    addWords(c.fr, c.lesson);
    var fw = String(c.fr || '').replace(/[’‘]/g, "'").match(/[A-Za-zÀ-ÿ]+/g) || [];
    if (fw.length >= 2 && fw.length <= 8 && c.zh) fw.forEach(function (w) {
      var k = norm(w); if (k.length >= 3 && !FUNC[k] && !LEX.phrase[k]) LEX.phrase[k] = { fr: c.fr, zh: c.zh, lesson: c.lesson };
    });
    /* 單字卡（去掉冠詞後只剩一個字）→ 拿來當詳解的中文 */
    var head = String(c.fr || '').replace(/[’‘]/g, "'").split(/[\/,;]/)[0].trim().replace(art, '').replace(/\(.*?\)/g, '').trim();
    if (/^[A-Za-zÀ-ÿ'-]+$/.test(head)) {
      var k = norm(head);
      /* ⚠️ 同一個字可能有好幾個意思（chouette＝貓頭鷹／很棒；truc＝訣竅／東西）→ 收最多兩個，讓他對照上下文（10-23 試跑抓到） */
      if (k.length >= 3) {
        var d = LEX.dict[k] || (LEX.dict[k] = { zh: [], lesson: c.lesson });
        var z = String(c.zh || '').trim();
        if (z && d.zh.length < 2 && d.zh.indexOf(z) < 0) d.zh.push(z);
      }
    }
  });
  (typeof SENTENCES !== 'undefined' ? SENTENCES : []).forEach(function (x) { addWords(x.fr, x.lesson); });
}

function plainHtml(t) {
  return esc(t).replace(/\(([A-Za-zéè']{1,4})\)/g, '<span class="unsp" title="這裡錄音沒唸">($1)</span>');
}

function bookTokens(body) {
  var skip = protectedStarts(body, SKIP_CTX.concat(LABEL_CTX).concat([/\([A-Za-zéè']{1,4}\)/g]));
  var toks = [], m, re = new RegExp(WORD_RE.source, 'g');
  while ((m = re.exec(body))) toks.push({ w: m[0], a: m.index, b: m.index + m[0].length, skip: !!skip[m.index] });
  return toks;
}

function pickBookBlanks(body) {
  buildLex();
  var toks = bookTokens(body), words = toks.filter(function (t) { return !t.skip; }).length;
  var N = Math.max(4, Math.min(14, Math.round(words / 10)));
  var nWord = Math.round(N * 0.75);
  var content = [], func = [];
  toks.forEach(function (t, i) {
    if (t.skip) return;
    var lw = norm(t.w);
    var proper = /^[A-ZÀ-Ý]/.test(t.w) && i > 0 && !/[.!?:\n]\s*$/.test(body.slice(Math.max(0, t.a - 3), t.a));
    if (lw.length >= 3 && !FUNC[lw] && LEX.learned[lw] && !proper && t.w.indexOf("'") < 0) {
      content.push({ i: i, w: t.w, a: t.a, b: t.b, kind: 'word', pri: (LEX.dict[lw] ? 2 : 1) + Math.min(lw.length, 10) / 10 + Math.random() * 0.8 });
    } else {
      for (var tier in TIER) if (TIER[tier].indexOf(lw) >= 0) { func.push({ i: i, w: t.w, a: t.a, b: t.b, kind: 'func', tier: +tier, pri: 6 - tier + Math.random() }); break; }
    }
  });
  var picked = [];
  /* 隔得夠遠＋同一段不重複挖同一個字（10-23 試跑：enfance、piano 各被挖兩次） */
  function far(c) { return picked.every(function (p) { return Math.abs(p.i - c.i) >= MIN_GAP && norm(p.w) !== norm(c.w); }); }
  content.sort(function (x, y) { return y.pri - x.pri; });
  content.forEach(function (c) { if (picked.length < nWord && far(c)) picked.push(c); });
  func.sort(function (x, y) { return y.pri - x.pri; });
  func.forEach(function (c) { if (picked.length < N && far(c)) picked.push(c); });
  content.forEach(function (c) { if (picked.length < N && far(c) && picked.indexOf(c) < 0) picked.push(c); });
  return picked.sort(function (x, y) { return x.a - y.a; });
}

/* 同音不同拼（R58）：-er／-é／-ée／-ez 唸起來一樣、-ais／-ait／-aient 一樣、字尾 s／x 不發音
   → 判「聽到了」，只另外提醒拼法；⛔ 不算聽力錯、不進「聽不出」清單 */
function soundKey(w) {
  var k = String(w || '').toLowerCase().trim().replace(/[’‘]/g, "'");
  k = k.replace(/(ées|ée|és|ez|er|é)$/, 'É').replace(/(aient|ais|ait)$/, 'È').replace(/[sx]$/, '');
  k = k.replace(/([aiouéy])e$/, '$1');
  return k.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/É/g, '#E').replace(/È/g, '#e');
}

/* 為什麼可能沒聽出來：從逐字稿自動判斷這個字在語流裡怎麼變形 */
function soundTags(body, g) {
  var tags = [], w = norm(g.w), before = body.slice(Math.max(0, g.a - 20), g.a);
  var prev = (before.match(/([A-Za-zÀ-ÿ']+)\s+$/) || [])[1] || '';
  if (/[sxztdn]$/i.test(prev) && /^[aeiouyàâéèêîôûh]/i.test(g.w) && !/[.!?,;:]\s*$/.test(before))
    tags.push('前面的「' + prev + '」連音黏過來（' + prev + '‿' + g.w + '）');
  if (g.w.indexOf("'") > 0) tags.push('省音：跟下一個字黏在一起');
  if (/(ent|[stdxpg]|es)$/i.test(g.w) && w.length > 3) tags.push('字尾不發音');
  if (/(an|am|en|em|in|im|on|om|un|um|ain|ein)(?![aeiouyéèê]|n|m)/i.test(w)) tags.push('有鼻母音');
  return tags.slice(0, 2);
}

function checkBook() {
  REVEALED = true;
  var ok = 0, near = 0, bad = 0, missed = [], s = stat(), now = Date.now();
  BLANKS.forEach(function (g, gi) {
    var el = document.getElementById('g' + gi), inp = document.getElementById('i' + gi);
    var v = inp.value.trim(), good = norm(v) === norm(g.w), sound = !good && v && soundKey(v) === soundKey(g.w);
    inp.disabled = true;
    if (good) { ok++; el.className = 'gap ok'; }
    else if (sound) { near++; el.className = 'gap near';
      el.insertAdjacentHTML('beforeend', '<span class="sol">✓ 聽到了，拼法：' + esc(g.w) + '</span>'); }
    else { bad++; el.className = 'gap bad'; missed.push(g);
      el.insertAdjacentHTML('beforeend', '<span class="sol">→ ' + esc(g.w) + '</span>'); }
    /* 每個字的紀錄（物件＋last，配合 sync 合併）：之後做「看得懂、聽不出」清單與週報用 */
    var key = (g.kind === 'word' ? 'w_' : 'f_') + norm(g.w), r = s[key] || { n: 0, miss: 0, last: 0 };
    r.n++; if (!(good || sound)) r.miss++; if (sound) r.spell = (r.spell || 0) + 1;
    if (SLOW_PLAYS > 0) r.slow = (r.slow || 0) + 1;
    r.last = now; s[key] = r;
  });
  var q = s['q_' + CUR.f] || { n: 0, miss: 0, last: 0 }; q.n++; if (bad) q.miss++; q.last = now; s['q_' + CUR.f] = q;
  saveStat(s);

  /* ⛔ 空著＝不會，算進分母（Owen 10-21 例外）；⛔ 不同段落之間的百分比不拿來比進步（R58） */
  var msg = '<div class="res">聽出 <b>' + (ok + near) + '</b>／' + BLANKS.length + (near ? '　（其中 ' + near + ' 格是拼法不同）' : '') + '</div>';
  if (missed.length) {
    msg += '<div class="detail"><div class="d-t">這段沒聽出來的字</div>';
    missed.forEach(function (g) {
      var lw = norm(g.w), d = LEX.dict[lw], les = (d && d.lesson) || LEX.lessonOf[lw];
      var tags = soundTags(CUR._body, g);
      msg += '<div class="d-row"><b>' + esc(g.w) + '</b>' +
        (d && d.zh.length ? '　' + esc(d.zh.join('／')) : '') + (les ? '<span class="d-les">第 ' + les + ' 課</span>' : '') +
        (g.kind === 'func' ? '<span class="d-les">' + esc(TIER_NAME[g.tier] || '小字') + '</span>' : '') +
        (LEX.phrase[lw] ? '<div class="d-why">也學過：' + esc(LEX.phrase[lw].fr) + '（' + esc(LEX.phrase[lw].zh) + '）</div>' : '') +
        (tags.length ? '<div class="d-why">可能沒聽出的原因：' + tags.map(esc).join('；') + '</div>' : '') + '</div>';
    });
    msg += '</div>';
  }
  if (bad && SLOW_PLAYS === 0) msg += '<div class="miss">⭐ 還沒試過放慢——按 🐢 慢速從頭再聽，慢速聽得出來＝音你認得，問題在處理速度。</div>';
  else if (bad && SLOW_PLAYS > 0) msg += '<div class="miss">⭐ 慢速也沒聽出來的字，代表那個音還沒建立——要針對它練，不是多聽就會好。</div>';
  msg += '<div class="row" style="margin-top:14px"><button class="btn go" onclick="nextQ()">下一段 →</button>' +
         '<button class="btn" onclick="RATE=0.75;SLOW_PLAYS++;play(0.75, true)">🐢 慢速從頭再聽</button></div>';
  document.getElementById('res').innerHTML = msg;
}

boot();
