#!/usr/bin/env node
/* ============================================================
   check_notes.js — french_notes.html 格式檢查
   ------------------------------------------------------------
   Owen 2026-08-12：「我覺得很奇特 筆記怎麼每次都會變動，
                     做筆記時要有習慣先去看格式跟做法吧！」

   他是對的。之前 CLAUDE.md 的筆記鐵律只寫了「表格兩條」，
   沒有寫平行閱讀要用 phrase-list、沒有寫哪些 class 必須有樣式，
   所以每次靠記憶寫就會漂一點。規則沒寫全 ＋ 沒先看範本 ＝ 一定漂。

   → 這支就是把「格式」變成可以跑的東西。
     **加完新課筆記後必跑：node tools/check_notes.js**
     全綠才算連動完成。

   加新規則時：直接在 CHECKS 陣列加一條，不要改其他地方。
   ============================================================ */

const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'french_notes.html');
const html = fs.readFileSync(FILE, 'utf8');
const styleEnd = html.indexOf('</style>');
const css  = html.slice(0, styleEnd);
const body = html.slice(styleEnd);

const problems = [];
const warns    = [];
const fail = m => problems.push(m);
const warn = m => warns.push(m);

// 切出每一課
const ids = [...body.matchAll(/id="(lesson-\d+)"/g)];
const lessons = ids.map((m, i) => ({
  id: m[1],
  num: +m[1].replace('lesson-', ''),
  seg: body.slice(m.index, i + 1 < ids.length ? ids[i + 1].index : body.length),
}));

const CHECKS = [

  ['標籤平衡', () => {
    const o = (body.match(/<details/g) || []).length;
    const c = (body.match(/<\/details>/g) || []).length;
    if (o !== c) fail(`<details> ${o} 個但 </details> ${c} 個`);
    const to = (body.match(/<table[ >]/g) || []).length;
    const tc = (body.match(/<\/table>/g) || []).length;
    if (to !== tc) fail(`<table> ${to} 個但 </table> ${tc} 個`);
  }],

  ['表格鐵律①：每個 table 都要被 <div class="compare-table"> 包住', () => {
    // class 標在 <table> 自己身上會讓 .compare-table table / th / td 全部失效
    const onTable = (body.match(/<table class="compare-table"/g) || []).length;
    if (onTable) fail(`有 ${onTable} 個 table 把 class 標在自己身上，應該標在外層 div`);
    let unwrapped = 0;
    body.replace(/<table[ >]/g, (m, pos) => {
      if (!/compare-table/.test(body.slice(Math.max(0, pos - 300), pos))) unwrapped++;
      return m;
    });
    if (unwrapped) fail(`有 ${unwrapped} 個 table 沒有被 compare-table 包住（會沒樣式、沒發音）`);
  }],

  ['表格鐵律②：標題是「法文/法語」的那一欄，td 要標 class="m"', () => {
    // 用欄位位置判定，不猜內容：找到 th 是 法文/法語 的欄索引，
    // 檢查同索引的 td 有沒有 class="m"。沒有這種表頭的表結構不同，跳過。
    // 發音實際掛在 td.m / td.f / .fr-ex（見 french_notes.html 的 JS）。
    lessons.forEach(L => {
      const tables = L.seg.split(/<table[ >]/).slice(1);
      tables.forEach((t, i) => {
        const tbl = t.slice(0, t.indexOf('</table>'));
        const rows = tbl.match(/<tr>[\s\S]*?<\/tr>/g) || [];
        if (!rows.length) return;
        const ths = rows[0].match(/<th[^>]*>[\s\S]*?<\/th>/g) || [];
        const col = ths.findIndex(th => /法文|法語/.test(th.replace(/<[^>]+>/g, '')));
        if (col < 0) return;
        let missing = 0;
        rows.slice(1).forEach(r => {
          const tds = r.match(/<td[^>]*>[\s\S]*?<\/td>/g) || [];
          if (tds[col] && !/class="[^"]*\b[mf]\b[^"]*"/.test(tds[col])) missing++;
        });
        if (missing) warn(`${L.id} 第 ${i + 1} 個表格的法文欄有 ${missing} 格沒標 class="m"`);
      });
    });
  }],

  ['法文句子的載體：必須是 phrase-list 的 <li><span class="fr">，不可以用 <p class="fr">', () => {
    // 段落式寫法不會長出 🔊 發音鍵，也不會被 chunks.js 的抽取腳本撈到
    lessons.forEach(L => {
      const n = (L.seg.match(/<p class="fr">/g) || []).length;
      if (n) fail(`${L.id} 用了 ${n} 個 <p class="fr"> 段落（沒發音鍵、進不了複習卡）`);
    });
  }],

  ['平行閱讀單元要用 phrase-list', () => {
    lessons.forEach(L => {
      const k = L.seg.indexOf('平行閱讀');
      if (k < 0) return;
      const after = L.seg.slice(k, k + 2500);
      if (!/class="phrase-list"/.test(after))
        fail(`${L.id} 的平行閱讀沒有用 phrase-list`);
    });
  }],

  ['每課都要有 summary-num 與 summary-title', () => {
    lessons.forEach(L => {
      if (!/class="summary-num"/.test(L.seg))  fail(`${L.id} 缺 summary-num（導覽列會顯示 id）`);
      if (!/class="summary-title"/.test(L.seg)) fail(`${L.id} 缺 summary-title`);
    });
  }],

  ['每個 unit 要有 unit-header / unit-tag / unit-title', () => {
    lessons.forEach(L => {
      const units = (L.seg.match(/class="unit"/g) || []).length;
      const hdr   = (L.seg.match(/class="unit-header"/g) || []).length;
      const tag   = (L.seg.match(/class="unit-tag"/g) || []).length;
      const ttl   = (L.seg.match(/class="unit-title"/g) || []).length;
      if (!(units === hdr && hdr === tag && tag === ttl))
        warn(`${L.id} unit ${units}／header ${hdr}／tag ${tag}／title ${ttl} 數量對不上`);
    });
  }],

  ['用到的 class 一定要有 CSS 定義', () => {
    const used = new Set();
    [...body.matchAll(/class="([^"]+)"/g)].forEach(m =>
      m[1].split(/\s+/).forEach(c => c && used.add(c)));
    const defined = new Set();
    [...css.matchAll(/\.([a-zA-Z][\w-]*)/g)].forEach(m => defined.add(m[1]));
    // 這幾個是 JS 動態產生或外部注入的，不在 CSS 裡是正常的
    const OK = new Set(['aNote', 'fn-fb-btn', 'mk-toolbar']);
    const undef = [...used].filter(c => !defined.has(c) && !OK.has(c)).sort();
    if (undef.length) fail(`這些 class 沒有 CSS 定義（會沒樣式）：${undef.join(', ')}`);
  }],

  ['課次要連號、不重複', () => {
    const nums = lessons.map(L => L.num);
    const dup = nums.filter((n, i) => nums.indexOf(n) !== i);
    if (dup.length) fail(`課次重複：${[...new Set(dup)].join(', ')}`);
    for (let i = 1; i < nums.length; i++)
      if (nums[i] !== nums[i - 1] + 1) warn(`課次不連續：${nums[i - 1]} → ${nums[i]}`);
  }],

  ['phrase-list 裡的法文一定要包在 <span class="fr"> 裡', () => {
    // ⚠️ 純中文的 li 是合法的——課文逐句全文中譯就是刻意只放中文
    //    （法文原文有版權、不上公開站，見 HANDOFF 08-02）。
    //    所以只抓「這個 li 有法文字母、卻沒有 span.fr」的情況：那才會掉發音。
    lessons.forEach(L => {
      const lists = L.seg.split('class="phrase-list"').slice(1);
      lists.forEach((blk, i) => {
        const ul = blk.slice(0, blk.indexOf('</ul>'));
        (ul.match(/<li>[\s\S]*?<\/li>/g) || []).forEach(li => {
          if (/<span class="fr">/.test(li)) return;
          // 把中文欄與註解欄挖掉，剩下的還有拉丁字母就是沒包好的法文
          const rest = li.replace(/<span class="(zh|note)">[\s\S]*?<\/span>/g, '')
                         .replace(/<[^>]+>/g, '');
          if (/[A-Za-zÀ-ÿ]{3,}/.test(rest))
            warn(`${L.id} 第 ${i + 1} 個 phrase-list 有 li 的法文沒包 span.fr：「${rest.trim().slice(0, 40)}」`);
        });
      });
    });
  }],
];

console.log('── french_notes.html 格式檢查 ──');
console.log(`課次 ${lessons.length}｜表格 ${(body.match(/<table[ >]/g) || []).length}｜unit ${(body.match(/class="unit"/g) || []).length}\n`);
CHECKS.forEach(([name, fn]) => {
  const before = problems.length + warns.length;
  fn();
  const added = problems.length + warns.length - before;
  console.log(`${added ? '✗' : '✓'} ${name}`);
});
if (problems.length) { console.log('\n【錯誤】'); problems.forEach(p => console.log('  ✗ ' + p)); }
if (warns.length)    { console.log('\n【提醒】'); warns.forEach(w => console.log('  ⚠ ' + w)); }
console.log(`\n錯誤 ${problems.length}／提醒 ${warns.length}`);
process.exit(problems.length ? 1 : 0);
