/* accent_bar.js — 重音輸入輔助列（2026-08-24 新增）
 *
 * 起因：Owen「有些字母真的很多 上面又一堆撇 打字時間不太夠」。
 * 動詞衝刺是計時的反射練習，所以那一頁的比對直接去重音；
 * 但抽考／文法路徑是在練「寫得對」，比對必須嚴格——嚴格就得給輸入工具，
 * 否則等於用打字速度懲罰他。table_drill 早就有一排重音鍵，這支把它抽成共用模組。
 *
 * 用法：  <script src="accent_bar.js"></script>
 *         AccentBar.mount('#ansInput');        // 選擇器或元素都可以
 *
 * 行為：輸入框聚焦時，浮動鍵列出現在框的正下方（下方空間不夠就翻到上方）；
 *       用 mousedown + preventDefault 插入字元，所以焦點不會跑掉、游標位置正確。
 */
(function () {
  const CHARS = ['é','è','ê','à','â','ç','ù','û','î','ï','ô','ë','œ'];
  let bar = null, current = null, hideTimer = null;

  function styleOnce() {
    if (document.getElementById('clb-accent-style')) return;
    const st = document.createElement('style');
    st.id = 'clb-accent-style';
    st.textContent = `
      .clb-accent-bar{position:fixed;z-index:9999;display:none;gap:4px;flex-wrap:wrap;
        padding:6px;border-radius:10px;background:#fff;border:1px solid #d8d8d4;
        box-shadow:0 6px 20px rgba(0,0,0,.18);max-width:min(94vw,420px)}
      .clb-accent-bar.on{display:flex}
      .clb-accent-bar button{min-width:34px;height:34px;border:1px solid #ddd;border-radius:7px;
        background:#fff;color:#2c2c2c;font-size:1rem;font-family:inherit;cursor:pointer;
        display:flex;align-items:center;justify-content:center;padding:0}
      .clb-accent-bar button:hover{border-color:#4a90d9;background:#f0f7ff;color:#4a90d9}
      .clb-accent-bar button:active{transform:translateY(1px)}
      @media (max-width:520px){.clb-accent-bar button{min-width:30px;height:32px;font-size:0.95rem}}
    `;
    document.head.appendChild(st);
  }

  function build() {
    if (bar) return bar;
    styleOnce();
    bar = document.createElement('div');
    bar.className = 'clb-accent-bar';
    CHARS.forEach(ch => {
      const b = document.createElement('button');
      b.type = 'button'; b.textContent = ch;
      // ⚠️ 一定要 mousedown + preventDefault：click 會先讓輸入框失焦，游標位置就沒了
      b.addEventListener('mousedown', e => { e.preventDefault(); insert(ch); });
      bar.appendChild(b);
    });
    document.body.appendChild(bar);
    return bar;
  }

  function insert(ch) {
    const i = current;
    if (!i || i.disabled) return;
    const s = i.selectionStart ?? i.value.length;
    const e = i.selectionEnd ?? s;
    i.value = i.value.slice(0, s) + ch + i.value.slice(e);
    i.selectionStart = i.selectionEnd = s + ch.length;
    i.focus();
    i.dispatchEvent(new Event('input', { bubbles: true }));
  }

  function place() {
    if (!current || !bar) return;
    const r = current.getBoundingClientRect();
    bar.style.left = Math.max(6, Math.min(r.left, window.innerWidth - bar.offsetWidth - 6)) + 'px';
    const below = r.bottom + 6;
    // 下方放不下（手機鍵盤／畫面底部）就翻到輸入框上方
    bar.style.top = (below + bar.offsetHeight > window.innerHeight - 4)
      ? Math.max(6, r.top - bar.offsetHeight - 6) + 'px'
      : below + 'px';
  }

  function show(inp) {
    current = inp;
    build().classList.add('on');
    place();
  }
  function hide() { if (bar) bar.classList.remove('on'); current = null; }

  window.AccentBar = {
    mount(target) {
      const sel = typeof target === 'string' ? target : null;
      if (!sel) { if (target) attach(target); return target; }

      // ⚠️ 光靠 focusin 代理不夠：quiz／gram_trainer 渲染題目時會「自己」focus 輸入框，
      //    那個 focus 發生在使用者互動之前，代理監聽收不到（2026-08-24 實測踩到）。
      //    所以另外用 MutationObserver 盯著新生出來的輸入框，發現時若它已經是焦點就直接顯示。
      document.addEventListener('focusin', e => {
        if (e.target.matches && e.target.matches(sel)) show(e.target);
      });
      document.addEventListener('focusout', e => {
        if (e.target.matches && e.target.matches(sel)) {
          clearTimeout(hideTimer); hideTimer = setTimeout(hide, 120);
        }
      });

      const scan = () => {
        const el = document.querySelector(sel);
        if (el && el === document.activeElement && !el.disabled) show(el);
        else if (!el || el.disabled) hide();
      };
      new MutationObserver(scan).observe(document.body, { childList: true, subtree: true });
      scan();
      return null;
    }
  };

  function attach(el) {
    el.addEventListener('focus', () => show(el));
    el.addEventListener('blur', () => { clearTimeout(hideTimer); hideTimer = setTimeout(hide, 120); });
    if (el === document.activeElement) show(el);
  }

  window.addEventListener('resize', place);
  window.addEventListener('scroll', place, true);
})();
