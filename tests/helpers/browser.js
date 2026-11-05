/* tests/helpers/browser.js — 在 Node 的 vm 裡模擬「剛好夠用」的瀏覽器，直接載入專案原檔測試
   ⭐ 不改寫、不複製被測程式：讀的就是 repo 裡那支 .js／.html 裡的函式。
   提供：localStorage、sessionStorage、document（事件＋hidden）、window、fetch（可注入）、
        可控的時鐘（Date／Date.now）、不會自己跑的 setInterval／setTimeout（測試手動觸發）。 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..', '..');

function makeStorage(init) {
  const m = new Map(Object.entries(init || {}));
  return {
    get length() { return m.size; },
    key(i) { return Array.from(m.keys())[i] ?? null; },
    getItem(k) { k = String(k); return m.has(k) ? m.get(k) : null; },
    setItem(k, v) { m.set(String(k), String(v)); },
    removeItem(k) { m.delete(String(k)); },
    clear() { m.clear(); },
    _map: m,
  };
}

function makeEvents() {
  const ls = {};
  return {
    addEventListener(t, f) { (ls[t] = ls[t] || []).push(f); },
    removeEventListener(t, f) { ls[t] = (ls[t] || []).filter((x) => x !== f); },
    dispatch(t, ev) { (ls[t] || []).slice().forEach((f) => f(ev || { type: t })); },
  };
}

/* opts：{ now:毫秒, storage:{k:v}, fetch:fn, pathname } */
function makeBrowser(opts) {
  opts = opts || {};
  const clock = { now: opts.now != null ? opts.now : Date.UTC(2026, 10, 5, 15, 0, 0) };
  const timers = [];
  const docEv = makeEvents(), winEv = makeEvents();
  const head = { appendChild() {} };
  const document = Object.assign(docEv, {
    hidden: false,
    readyState: 'complete',
    head, documentElement: head,
    body: { appendChild() {}, querySelectorAll() { return []; } },
    createElement() { return { style: {}, dataset: {}, appendChild() {}, querySelector() { return null; }, addEventListener() {} }; },
    getElementById() { return null; },
    querySelectorAll() { return []; },
  });
  const fetchCalls = [];
  const sandbox = {
    console,
    localStorage: makeStorage(opts.storage),
    sessionStorage: makeStorage(),
    document,
    location: { pathname: opts.pathname || '/index.html', href: 'https://example.test' + (opts.pathname || '/index.html'), search: '' },
    URLSearchParams,
    setInterval(f, ms) { timers.push({ f, ms, kind: 'interval' }); return timers.length; },
    clearInterval() {},
    setTimeout(f, ms) { timers.push({ f, ms, kind: 'timeout' }); return timers.length; },
    clearTimeout() {},
    fetch(url, init) {
      fetchCalls.push({ url, init });
      return opts.fetch ? opts.fetch(url, init) : Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
    },
    __clock: clock,
  };
  sandbox.window = sandbox;
  sandbox.addEventListener = winEv.addEventListener;
  sandbox.removeEventListener = winEv.removeEventListener;
  const ctx = vm.createContext(sandbox);
  /* 假時鐘：new Date()／Date.now() 都看 __clock.now；有參數的 new Date(...) 照常 */
  vm.runInContext(`(function(){
    var R = Date;
    function D(){ if (!(this instanceof D)) return new R(__clock.now).toString();
      var a = arguments; return a.length === 0 ? new R(__clock.now) : new (Function.prototype.bind.apply(R, [null].concat([].slice.call(a))))(); }
    D.prototype = R.prototype; D.now = function(){ return __clock.now; }; D.UTC = R.UTC; D.parse = R.parse;
    globalThis.Date = D;
  })();`, ctx);

  return {
    ctx, win: sandbox, clock, timers, fetchCalls, document, winEvents: winEv,
    load(rel) { vm.runInContext(fs.readFileSync(path.join(ROOT, rel), 'utf8'), ctx, { filename: rel }); },
    run(code) { return vm.runInContext(code, ctx); },
    runIntervals() { timers.filter((t) => t.kind === 'interval').forEach((t) => t.f()); },
    runTimeouts() { const ts = timers.filter((t) => t.kind === 'timeout'); ts.forEach((t) => { timers.splice(timers.indexOf(t), 1); t.f(); }); },
  };
}

/* 從 HTML／JS 原檔撈出某個 function 的原始碼（大括號配對），在乾淨的 context 裡建出來。
   deps：同一檔裡它依賴的其他函式名稱。 */
function extractFunction(rel, name) {
  const src = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  const re = new RegExp('function\\s+' + name + '\\s*\\(');
  const m = re.exec(src);
  if (!m) throw new Error(rel + ' 找不到 function ' + name);
  let i = src.indexOf('{', m.index), depth = 0;
  for (let j = i; j < src.length; j++) {
    const c = src[j];
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) return src.slice(m.index, j + 1); }
  }
  throw new Error(rel + ' 的 function ' + name + ' 大括號不成對');
}
function loadFunctions(rel, names) {
  const ctx = vm.createContext({});
  names.forEach((n) => vm.runInContext(extractFunction(rel, n), ctx, { filename: rel + '#' + n }));
  return ctx;
}

module.exports = { makeBrowser, extractFunction, loadFunctions, ROOT };
