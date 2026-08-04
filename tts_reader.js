/* tts_reader.js — 發音顆粒度三層共用模組（2026-08-03，PLAN A-9 / S7）
   ------------------------------------------------------------------
   目的：整段連續朗讀／單句點讀／單字點讀三層，一份程式碼給全站用，
        不要再像既有 13 個頁面那樣各寫一份 TTS。

   對外 API（window.TtsReader）：
     TtsReader.supported                  是否支援 speechSynthesis
     TtsReader.speak(text[, opts])        單次朗讀（等同各頁既有的 speak()）
     TtsReader.mount({ textEl, text, barEl })
         把 text 切成「段落→句子→單字」渲染進 textEl，並在 barEl（省略則插在
         textEl 前面）長出控制列。回傳 controller。
     TtsReader.mountList({ listEl, itemSelector, textOf, barEl })
         已經是一句一個元素的既有結構（例如 french_notes 的 .phrase-list），
         不重排 DOM，只加「整篇連續朗讀」與單字點讀。回傳 controller。
     TtsReader.stopAll()                  中止任何朗讀（切文章／離頁都要叫）

   controller：{ play(), pause(), stop(), speakIndex(i), setRate(r), destroy() }

   語音篩選沿用全站統一邏輯（review.html / french_notes.html 同一套）：
     Amélie/Thomas → 名字含 premium/enhanced/amélior/plus → 雲端語音
     （localService===false）→ fr-FR → 任一個 fr 語音
*/
(function () {
  'use strict';

  var SUPPORTED = typeof window !== 'undefined' && 'speechSynthesis' in window;

  // ── 語音篩選（全站統一，勿另寫）──────────────────────────────
  var frVoice = null;
  function pickVoice() {
    if (!SUPPORTED) return;
    var vs = speechSynthesis.getVoices().filter(function (v) {
      return v.lang && v.lang.toLowerCase().indexOf('fr') === 0;
    });
    frVoice = vs.filter(function (v) { return /am[eé]lie|thomas/i.test(v.name); })[0]
           || vs.filter(function (v) { return /premium|enhanced|amélior|plus/i.test(v.name); })[0]
           || vs.filter(function (v) { return v.localService === false; })[0]
           || vs.filter(function (v) { return v.lang === 'fr-FR'; })[0]
           || vs[0] || null;
  }
  if (SUPPORTED) {
    pickVoice();
    speechSynthesis.onvoiceschanged = pickVoice;
  }

  // ── 語速（本機偏好；刻意不用 clb7_ 前綴，不進 Supabase 同步負載）──
  var RATE_KEY = 'ttsr_rate';
  var RATES = [0.6, 0.75, 0.9, 1.0];
  function loadRate() {
    var r = parseFloat(localStorage.getItem(RATE_KEY));
    return RATES.indexOf(r) >= 0 ? r : 0.75;
  }
  function saveRate(r) { try { localStorage.setItem(RATE_KEY, String(r)); } catch (e) {} }

  // ── 文字清理（沿用 french_notes 的 cleanForTts 精神）───────────
  function cleanForSpeech(text) {
    return String(text)
      .replace(/\s*\([mf]\.?p?l?\.?\)/gi, '')        // (m) (f) (f.pl) 詞性註記
      .replace(/[\u{1F300}-\u{1FAFF}]/gu, '')         // emoji
      .replace(/[☀-➿️]/g, '')          // ⚠ ★ ✓ ✗ 等符號
      .replace(/[«»"“”]/g, '')                        // 引號不用唸
      .replace(/\s{2,}/g, ' ')
      .trim();
  }

  // ── 單次朗讀 ────────────────────────────────────────────────
  var token = 0;              // 每次 cancel 就 +1，用來作廢舊的 onend callback
  function newUtterance(text, rate) {
    var u = new SpeechSynthesisUtterance(cleanForSpeech(text));
    u.lang = 'fr-FR';
    u.rate = rate || loadRate();
    if (frVoice) u.voice = frVoice;
    return u;
  }
  function speak(text, opts) {
    if (!SUPPORTED) return;
    opts = opts || {};
    stopAll();
    var clean = cleanForSpeech(text);
    if (!clean) return;
    speechSynthesis.speak(newUtterance(clean, opts.rate));
  }

  // ── 斷句 ────────────────────────────────────────────────────
  // 縮寫白名單：切在這些點後面是誤切，要跟下一塊黏回去
  var ABBR = /(?:^|[\s(])(?:MM|M|Mme|Mlle|Dr|Pr|St|Ste|etc|env|ex|cf|vol|no|nos|art|av|ap|J\.-C)\.\s*$/i;

  function splitSentences(par) {
    var chunks = par.match(/[^.!?…]*[.!?…]+[”"»')\]]*\s*|[^.!?…]+$/g) || [par];
    var out = [];
    for (var i = 0; i < chunks.length; i++) {
      var c = chunks[i];
      var prev = out.length ? out[out.length - 1] : null;
      var mergeIntoPrev = prev !== null && (
        ABBR.test(prev) ||                       // 前一塊結尾是縮寫（M. Dupont）
        /(?:^|\s)\d+\.\s*$/.test(prev) ||        // 前一塊結尾是「數字.」（1. 2.）
        !/[A-Za-zÀ-ÖØ-öø-ÿŒœÆæ]/.test(prev)      // 前一塊根本沒有字母（純標點）
      );
      if (mergeIntoPrev) out[out.length - 1] = prev + c;
      else out.push(c);
    }
    return out.filter(function (s) { return s.trim(); });
  }

  // ── 切字（élision 與連字號要黏在一起：l'odeur / aujourd'hui / est-ce）──
  var L = 'A-Za-zÀ-ÖØ-öø-ÿŒœÆæ';
  function wordRe() {
    return new RegExp('[' + L + ']+(?:[\'’\\-][' + L + ']+)*|\\d+(?:[.,]\\d+)*', 'g');
  }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function wordsHtml(s) {
    var re = wordRe(), out = '', last = 0, m;
    while ((m = re.exec(s)) !== null) {
      out += esc(s.slice(last, m.index));
      out += '<span class="ttsr-w">' + esc(m[0]) + '</span>';
      last = m.index + m[0].length;
    }
    return out + esc(s.slice(last));
  }

  // 把純文字轉成「段落 → 句子 → 單字」的 HTML
  function markup(text) {
    var paras = String(text).split(/\n+/).map(function (p) { return p.trim(); })
                            .filter(function (p) { return p; });
    var idx = 0, html = '';
    paras.forEach(function (par, pi) {
      html += '<div class="ttsr-p"' + (pi === 0 ? '' : ' data-newpara="1"') + '>';
      splitSentences(par).forEach(function (sent) {
        var trail = sent.match(/\s*$/)[0];
        var core = sent.slice(0, sent.length - trail.length);
        html += '<span class="ttsr-s" data-i="' + idx + '">' + wordsHtml(core) + '</span>' + (trail ? ' ' : '');
        idx++;
      });
      html += '</div>';
    });
    return html;
  }

  // ── 樣式（模組自帶，頁面不用複製 CSS）────────────────────────
  var STYLE = [
    '.ttsr-bar{position:sticky;top:0;z-index:5;display:flex;flex-wrap:wrap;gap:8px;align-items:center;',
    '  padding:8px 0 10px;background:var(--ttsr-bg,#0d1020);margin-bottom:8px}',
    '.ttsr-btn{min-height:40px;padding:0 14px;border-radius:9px;cursor:pointer;font-family:inherit;',
    '  font-size:0.82rem;font-weight:600;border:1px solid var(--ttsr-line,#2a3446);',
    '  background:var(--ttsr-btn-bg,#141928);color:var(--ttsr-fg,#c8c4b8);line-height:38px}',
    '.ttsr-btn:hover{border-color:var(--ttsr-accent,#f0c060);color:var(--ttsr-accent,#f0c060)}',
    '.ttsr-btn.primary{border-color:var(--ttsr-accent,#f0c060);color:var(--ttsr-accent,#f0c060)}',
    '.ttsr-seg{display:inline-flex;border:1px solid var(--ttsr-line,#2a3446);border-radius:9px;overflow:hidden}',
    '.ttsr-seg button{min-height:40px;padding:0 12px;border:0;cursor:pointer;font-family:inherit;',
    '  font-size:0.78rem;background:var(--ttsr-btn-bg,#141928);color:var(--ttsr-dim,#7a8598)}',
    '.ttsr-seg button.on{background:var(--ttsr-accent,#f0c060);color:#141018;font-weight:700}',
    '.ttsr-hint{font-size:0.68rem;color:var(--ttsr-dim,#556);width:100%;margin-top:-2px}',
    '.ttsr-p+.ttsr-p{margin-top:0.85em}',
    '.ttsr-s{border-radius:4px;padding:1px 0}',
    '.ttsr-body.mode-sent .ttsr-s{cursor:pointer}',
    '.ttsr-body.mode-word .ttsr-w{cursor:pointer}',
    '.ttsr-body.mode-word .ttsr-w:hover{background:rgba(96,160,208,0.22);border-radius:3px}',
    '.ttsr-body.mode-sent .ttsr-s:hover{background:rgba(240,192,96,0.10)}',
    '.ttsr-s.on{background:rgba(240,192,96,0.20);box-shadow:0 0 0 2px rgba(240,192,96,0.20)}',
    '.ttsr-w.on{background:rgba(96,160,208,0.35);border-radius:3px}',
    '@media (max-width:420px){.ttsr-btn{padding:0 11px;font-size:0.78rem}}'
  ].join('');

  function injectStyle() {
    if (document.getElementById('ttsr-style')) return;
    var st = document.createElement('style');
    st.id = 'ttsr-style';
    st.textContent = STYLE;
    document.head.appendChild(st);
  }

  // ── 全域播放狀態（同一時間只有一個 controller 在播）─────────
  var active = null;     // 目前在播的 controller
  var gapTimer = null;

  function stopAll() {
    token++;
    clearTimeout(gapTimer);
    gapTimer = null;
    if (SUPPORTED) speechSynthesis.cancel();
    if (active && active._onStopped) active._onStopped();
    active = null;
  }

  // ── 核心：給一組「句子單元」做連續朗讀 ──────────────────────
  // units: [{ text, el, newPara }]
  function makeEngine(units, hooks) {
    var rate = loadRate();
    var idx = 0;
    var playing = false;

    function clearMark() {
      units.forEach(function (u) { if (u.el) u.el.classList.remove('on'); });
    }
    function mark(i) {
      clearMark();
      var u = units[i];
      if (!u || !u.el) return;
      u.el.classList.add('on');
      var r = u.el.getBoundingClientRect();
      if (r.top < 60 || r.bottom > window.innerHeight - 40) {
        u.el.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
    }

    var ctl = {
      _onStopped: function () {
        playing = false;
        clearMark();
        if (hooks.onState) hooks.onState('idle', idx);
      },
      isPlaying: function () { return playing; },
      index: function () { return idx; },
      setRate: function (r) { rate = r; saveRate(r); },
      getRate: function () { return rate; },

      // 只唸第 i 句（單句層）
      speakIndex: function (i) {
        if (!SUPPORTED || !units[i]) return;
        stopAll();
        active = ctl;
        idx = i;
        playing = false;
        var my = token;
        var u = newUtterance(units[i].text, rate);
        mark(i);
        u.onend = u.onerror = function () {
          if (my !== token) return;
          clearMark();
          if (hooks.onState) hooks.onState('idle', idx);
        };
        if (hooks.onState) hooks.onState('single', idx);
        speechSynthesis.speak(u);
      },

      // 從第 i 句開始連續唸到最後（整段層）
      playFrom: function (i) {
        if (!SUPPORTED || !units.length) return;
        stopAll();
        active = ctl;
        idx = Math.max(0, Math.min(i, units.length - 1));
        playing = true;
        var my = token;
        if (hooks.onState) hooks.onState('playing', idx);
        (function step() {
          if (my !== token || !playing) return;
          if (idx >= units.length) {
            playing = false;
            clearMark();
            if (hooks.onState) hooks.onState('idle', 0);
            idx = 0;
            active = null;
            return;
          }
          var unit = units[idx];
          mark(idx);
          var u = newUtterance(unit.text, rate);
          u.onend = u.onerror = function () {
            if (my !== token || !playing) return;
            idx++;
            // 句與句之間留自然停頓；換段落停久一點
            var gap = (units[idx] && units[idx].newPara) ? 800 : 420;
            gapTimer = setTimeout(step, gap);
          };
          speechSynthesis.speak(u);
        })();
      },

      play: function () { ctl.playFrom(idx); },

      // 暫停＝中止但記住目前這句（跨平台可靠；iOS Safari 的 pause() 不可靠）
      pause: function () {
        if (!playing) return;
        playing = false;
        stopAll();
        mark(idx);                       // 暫停時保留高亮，讓人看得到停在哪一句
        if (hooks.onState) hooks.onState('paused', idx);
      },

      stop: function () {
        playing = false;
        idx = 0;
        stopAll();
        if (hooks.onState) hooks.onState('idle', 0);
      }
    };
    return ctl;
  }

  // ── 控制列 ──────────────────────────────────────────────────
  function buildBar(barEl, ctl, bodyEl, opts) {
    barEl.className = 'ttsr-bar';
    barEl.innerHTML =
      '<button class="ttsr-btn primary ttsr-play">▶ 朗讀全文</button>' +
      '<button class="ttsr-btn ttsr-stop">⏹ 停止</button>' +
      (opts.tapModes === false ? '' :
        '<span class="ttsr-seg ttsr-mode">' +
        '<button data-mode="sent" class="on">🔊 點句</button>' +
        '<button data-mode="word">🔤 點字</button>' +
        '</span>') +
      '<button class="ttsr-btn ttsr-rate"></button>' +
      '<div class="ttsr-hint"></div>';

    var playBtn = barEl.querySelector('.ttsr-play');
    var stopBtn = barEl.querySelector('.ttsr-stop');
    var rateBtn = barEl.querySelector('.ttsr-rate');
    var hint = barEl.querySelector('.ttsr-hint');

    function paintRate() { rateBtn.textContent = '🐢 ' + ctl.getRate().toFixed(2).replace(/0$/, '') + '×'; }
    paintRate();

    function setHint(mode) {
      if (opts.hint) { hint.textContent = opts.hint; return; }   // 呼叫端指定的說明優先
      hint.textContent = mode === 'word'
        ? '點任一個法文單字 → 只唸那個字'
        : '點任一句 → 只唸那一句；朗讀中會高亮目前這句';
    }
    setHint('sent');

    playBtn.onclick = function () {
      if (ctl.isPlaying()) ctl.pause();
      else ctl.play();
    };
    stopBtn.onclick = function () { ctl.stop(); };
    rateBtn.onclick = function () {
      var next = RATES[(RATES.indexOf(ctl.getRate()) + 1) % RATES.length];
      ctl.setRate(next);
      paintRate();
      if (ctl.isPlaying()) ctl.playFrom(ctl.index());   // 立刻用新語速接著唸
    };

    var modeSeg = barEl.querySelector('.ttsr-mode');
    if (modeSeg) {
      modeSeg.onclick = function (e) {
        var b = e.target.closest('button[data-mode]');
        if (!b) return;
        modeSeg.querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === b); });
        bodyEl.classList.toggle('mode-word', b.dataset.mode === 'word');
        bodyEl.classList.toggle('mode-sent', b.dataset.mode === 'sent');
        setHint(b.dataset.mode);
      };
    }

    // controller 狀態變化 → 按鈕文字跟著變
    return function onState(state, i) {
      if (state === 'playing') { playBtn.textContent = '⏸ 暫停'; playBtn.classList.add('primary'); }
      else if (state === 'paused') { playBtn.textContent = '▶ 續播（第 ' + (i + 1) + ' 句）'; }
      else if (state === 'single') { playBtn.textContent = '▶ 朗讀全文'; }
      else { playBtn.textContent = '▶ 朗讀全文'; }
    };
  }

  // ── mount：純文字 → 三層 ────────────────────────────────────
  function mount(opts) {
    injectStyle();
    stopAll();

    var textEl = opts.textEl;
    textEl.innerHTML = markup(opts.text);
    textEl.classList.add('ttsr-body', 'mode-sent');
    textEl.classList.remove('mode-word');

    var sentEls = Array.prototype.slice.call(textEl.querySelectorAll('.ttsr-s'));
    var units = sentEls.map(function (el) {
      var p = el.parentNode;
      return {
        el: el,
        text: el.textContent,
        newPara: p && p.dataset && p.dataset.newpara === '1' && p.firstElementChild === el
      };
    });

    var barEl = opts.barEl;
    if (!barEl) {
      barEl = document.createElement('div');
      textEl.parentNode.insertBefore(barEl, textEl);
    }

    var onState = null;
    var ctl = makeEngine(units, { onState: function (s, i) { if (onState) onState(s, i); } });
    onState = buildBar(barEl, ctl, textEl, opts);

    textEl.onclick = function (e) {
      if (textEl.classList.contains('mode-word')) {
        var w = e.target.closest('.ttsr-w');
        if (!w) return;
        stopAll();
        w.classList.add('on');
        var my = token;
        var u = newUtterance(w.textContent, ctl.getRate());
        u.onend = u.onerror = function () { w.classList.remove('on'); };
        setTimeout(function () { if (my === token) w.classList.remove('on'); }, 4000);
        speechSynthesis.speak(u);
      } else {
        var s = e.target.closest('.ttsr-s');
        if (!s) return;
        ctl.speakIndex(parseInt(s.dataset.i, 10));
      }
    };

    ctl.destroy = function () { ctl.stop(); textEl.onclick = null; };
    if (!SUPPORTED) barEl.innerHTML = '<div class="ttsr-hint">此瀏覽器不支援語音合成，無法朗讀。</div>';
    return ctl;
  }

  // ── mountList：既有「一句一元素」結構（不重排 DOM）────────────
  function mountList(opts) {
    injectStyle();
    stopAll();

    var listEl = opts.listEl;
    var items = Array.prototype.slice.call(listEl.querySelectorAll(opts.itemSelector || 'li'));
    var textOf = opts.textOf || function (el) { return el.textContent; };

    var units = items.map(function (el) {
      var target = opts.markEl ? (el.querySelector(opts.markEl) || el) : el;
      return { el: target, text: textOf(el), newPara: false };
    });

    // 單字層：把每個句子元素內的法文切成可點的字
    if (opts.wordLayer !== false) {
      units.forEach(function (u) {
        if (u.el.querySelector('.ttsr-w')) return;
        u.el.innerHTML = wordsHtml(u.el.textContent);
      });
      listEl.classList.add('ttsr-body', 'mode-sent');
    }

    var barEl = opts.barEl;
    if (!barEl) {
      barEl = document.createElement('div');
      listEl.parentNode.insertBefore(barEl, listEl);
    }

    var onState = null;
    var ctl = makeEngine(units, { onState: function (s, i) { if (onState) onState(s, i); } });
    onState = buildBar(barEl, ctl, listEl, opts);

    listEl.addEventListener('click', function (e) {
      if (!listEl.classList.contains('mode-word')) return;
      var w = e.target.closest('.ttsr-w');
      if (!w) return;
      e.stopPropagation();
      stopAll();
      w.classList.add('on');
      var u = newUtterance(w.textContent, ctl.getRate());
      u.onend = u.onerror = function () { w.classList.remove('on'); };
      speechSynthesis.speak(u);
    }, true);

    ctl.destroy = function () { ctl.stop(); };
    if (!SUPPORTED) barEl.innerHTML = '<div class="ttsr-hint">此瀏覽器不支援語音合成，無法朗讀。</div>';
    return ctl;
  }

  // 離頁／切到背景一律中止，避免朗讀跟著跑到下一頁疊音
  window.addEventListener('pagehide', stopAll);
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') stopAll();
  });

  window.TtsReader = {
    supported: SUPPORTED,
    speak: speak,
    markup: markup,
    splitSentences: splitSentences,
    mount: mount,
    mountList: mountList,
    stopAll: stopAll,
    voice: function () { return frVoice; }
  };
})();
