#!/usr/bin/env node
/* ============================================================
 * check_tcf_writing.js — tcf_writing_sujets.js 的常設檢查器
 * 2026-09-05 建立。慣例同 check_notes.js / check_t1_stock.js：
 *   動過 tcf_writing_sujets.js 之後一定要跑，全綠才算完成。
 *
 * ⚠️ 這支存在的理由：題庫是 OCR 產物，而本專案鐵律是
 *   「來源三層優先序＝標準法文 ＞ 課本 ＞ 逐字稿」——
 *   OCR 等同逐字稿，**可以改，但每一處都要留紀錄**。
 *   ⭐ 所以核心檢查是：對照原始 OCR 檔，凡是與原文不同的地方，
 *      都必須在 ocr_fix 裡有一筆對得上的紀錄。改了沒記 → 抓出來。
 *   （對照 t1_stock 的子序列比對——那邊只准刪字；這邊准修但要留痕。）
 * ============================================================ */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

const SRC_TXT  = path.join(ROOT, 'assets/tcf/_analyse/TCF_sujets_ecriture.txt');
/* ⚠️ 2026-09-05：語料鍋一開始只放了上面那個 txt，導致 pack3 來的 10 題 T1 全部誤報
   「查無出處」。⭐ 這跟 2026-09-04 anki 那次「語料鍋沒有 answer_cards.js」是同一個坑。
   → 溯源檢查的語料鍋，必須涵蓋**所有**建檔時用到的來源。 */
const SRC_JSON = path.join(ROOT, 'assets/tcf/pack3/_analyse/ecrit_T1_sujets.json');
const DATA    = path.join(ROOT, 'tcf_writing_sujets.js');

let errors = 0, warns = 0;
const E = m => { console.log('✗ ' + m); errors++; };
const W = m => { console.log('! ' + m); warns++; };
const O = m => console.log('✓ ' + m);

if (!fs.existsSync(DATA)) { console.log('✗ 找不到 tcf_writing_sujets.js'); process.exit(1); }
const M = require(DATA);
const B = M.TCF_WRITING_SUJETS || M;

/* 官方硬規格 —— ⛔ 這幾個數字不准改，改了就是改考試規則 */
const SPEC = {
  t1: { min: 60,  max: 120 },
  t2: { min: 120, max: 150 },
  t3: { min: 120, max: 180, p1: [40, 60], p2: [80, 120] }
};

console.log('── tcf_writing_sujets.js 檢查 ──\n');

/* 0. meta 的字數規格要跟官方一致 */
if (B.meta && B.meta.spec) {
  ['t1','t2','t3'].forEach(t => {
    const s = B.meta.spec[t];
    if (!s) { E(`meta.spec 缺 ${t}`); return; }
    if (s.min !== SPEC[t].min || s.max !== SPEC[t].max)
      E(`meta.spec.${t} 字數 ${s.min}–${s.max}，官方是 ${SPEC[t].min}–${SPEC[t].max}`);
  });
  if (!errors) O('meta 字數規格對得上官方');
} else W('沒有 meta.spec，字數規格無法自動核對');

/* 1. 欄位完整性 ＋ id 唯一 ＋ 永久門牌不重編 */
const seenIds = new Set();
const REQ = { t1: ['id','fr','zh','theme','ocr_fix','src'],
              t2: ['id','fr','zh','theme','ocr_fix','src'],
              t3: ['id','theme','doc1','doc2','doc1_pos','doc2_pos','zh','tronque','ocr_fix','src'] };
let n = 0;
['t1','t2','t3'].forEach(t => {
  const arr = B[t] || [];
  if (!arr.length) { E(`${t.toUpperCase()} 是空的`); return; }
  arr.forEach(s => {
    n++;
    REQ[t].forEach(f => {
      if (s[f] === undefined || s[f] === null || s[f] === '')
        E(`${s.id || '(無 id)'}：缺欄位 ${f}`);
    });
    if (!/^W-T[123]-\d{2}$/.test(s.id || '')) E(`${s.id}：id 格式不對（應為 W-T1-01 這種）`);
    if (seenIds.has(s.id)) E(`${s.id}：id 重複`);
    seenIds.add(s.id);
    if (!Array.isArray(s.ocr_fix)) E(`${s.id}：ocr_fix 不是陣列`);
    else s.ocr_fix.forEach((f, i) => {
      if (!f.from || f.to === undefined || !f.why)
        E(`${s.id}：ocr_fix[${i}] 缺 from/to/why —— ⭐ 說不出理由的改動要還原回原文`);
    });
    if (!/:\d+$/.test(s.src || '')) W(`${s.id}：src 沒有行號`);
  });
});
O(`欄位檢查完成，共 ${n} 題（T1 ${(B.t1||[]).length}／T2 ${(B.t2||[]).length}／T3 ${(B.t3||[]).length}）`);

/* 2. ⭐⭐ 核心：與原始 OCR 比對，凡有差異必須在 ocr_fix 有紀錄 */
if (!fs.existsSync(SRC_TXT)) {
  W('找不到原始 OCR 檔，跳過溯源比對（⚠️ 這是最重要的一項檢查）');
} else {
  let raw = fs.readFileSync(SRC_TXT, 'utf8');
  if (fs.existsSync(SRC_JSON)) raw += '\n' + fs.readFileSync(SRC_JSON, 'utf8');
  // 正規化：只留字母數字，用來判斷「這段文字在原檔裡找得到嗎」
  const norm = s => (s || '').toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[^a-zà-ÿ0-9']/g, '');
  const rawN = norm(raw);
  let traced = 0, untraced = 0;

  /* ⚠️ 2026-09-05：反推時**必須只套用屬於這一份的 ocr_fix**（f.doc 欄位）。
     一開始寫成全域反推，結果 W-T3-38 doc1 的「en la voie → en voie」被套到 intro 上，
     把本來正確的 intro 反推成原檔沒有的字串 → 誤報。
     ⭐ 教訓：修正是有作用域的，反推也必須有同一個作用域。 */
  const check = (id, txt, ocrFix, field) => {
    if (!txt) return;
    let back = txt;
    (ocrFix || []).forEach(f => {
      if (f.doc && field && f.doc !== field) return;   // 不是這一份的修正，跳過
      if (f.to) back = back.split(f.to).join(f.from);
    });
    // 抽三段各 40 字的樣本比對，避免長文一處小差就整段判失敗
    const bn = norm(back);
    if (bn.length < 40) return;
    const samples = [bn.slice(0, 40), bn.slice(Math.floor(bn.length/2), Math.floor(bn.length/2)+40),
                     bn.slice(-40)];
    const miss = samples.filter(s => s.length >= 20 && rawN.indexOf(s) < 0);
    if (miss.length === 0) traced++;
    else {
      untraced++;
      E(`${id}：有 ${miss.length}/3 段文字在原始 OCR 檔裡找不到 —— ` +
        `⛔ 改了但沒記進 ocr_fix，或是自己寫的法文`);
      console.log(`   找不到的片段：「${miss[0].slice(0, 40)}…」`);
    }
  };

  (B.t1 || []).forEach(s => check(s.id, s.fr, s.ocr_fix, 'fr'));
  (B.t2 || []).forEach(s => check(s.id, s.fr, s.ocr_fix, 'fr'));
  (B.t3 || []).forEach(s => {
    check(s.id + '/doc1', s.doc1, s.ocr_fix, 'doc1');
    check(s.id + '/doc2', s.doc2, s.ocr_fix, 'doc2');
    if (s.intro) check(s.id + '/intro', s.intro, s.ocr_fix, 'intro');
  });
  // ⚠️ T1 有一部分題目來自 pack3 的 JSON，不在這個 txt 裡 —— 那些溯源不到是正常的
  if (untraced === 0) O(`溯源比對通過：${traced} 段文字都對得回原始 OCR 檔`);
  else console.log(`   ⚠️ 溯源不到的請確認是不是來自 pack3/ecrit_T1_sujets.json（那份不在此檔內）`);
}

/* 3. ⛔ 不准出現「補完斷句」——標了 tronque 就不該以句號收尾 */
(B.t3 || []).forEach(s => {
  const tr = s.tronque || [];
  ['doc1','doc2','intro'].forEach(k => {
    if (k === 'intro' && !s.intro) return;
    const txt = (s[k] || '').trim();
    if (!txt) return;
    /* ⭐ 判準不是「有沒有句號」，是**長度**：原始 OCR 每份文件有 598–600 字元硬上限，
       達上限者必定被截斷。短文件沒句號多半只是 OCR 掉了標點，或本來就以人名署名收尾
       （例如 W-T3-08 的「scala zeans」「David. Journaliste de la Frm」）。 */
    const endsClean = /[.!?»)"”'’]$/.test(txt);
    const nearCap = txt.length >= 560;
    if (tr.indexOf(k) >= 0 && endsClean && !nearCap)
      E(`${s.id}/${k}：標了 tronque、又以標點收尾、長度只有 ${txt.length} —— ⛔ 是不是自己把它補完了？`);
    if (tr.indexOf(k) < 0 && !endsClean && nearCap)
      W(`${s.id}/${k}：長度 ${txt.length} 貼近 OCR 硬上限且未以標點收尾，⚠️ 可能漏標 tronque`);
  });
});

/* 4. 浮水印／雜訊殘留 */
/* ⚠️ 浮水印一定是雜訊；⛔ 但一般網址不是——W-T2-43 的 www.manger-international.com
   就是真題本文的一部分（要你寫給那個網站的讀者看）。所以分兩級。 */
const DIRT_ERR  = ['reussir-tcfcanada', 'tcfcanada.com', '=====', ' page '];
const DIRT_WARN = ['http', 'www.'];
[['t1','fr'],['t2','fr'],['t3','doc1'],['t3','doc2'],['t3','intro']].forEach(([t, f]) => {
  (B[t] || []).forEach(s => {
    const low = (s[f] || '').toLowerCase();
    DIRT_ERR.forEach(d => { if (low.indexOf(d) >= 0) E(`${s.id}：${f} 裡還有浮水印／雜訊「${d}」`); });
    DIRT_WARN.forEach(d => { if (low.indexOf(d) >= 0) W(`${s.id}：${f} 含網址「${d}」——確認是真題本文還是雜訊`); });
  });
});

/* 5. T3 的立場摘要不准寫空話 */
const VAGUE = ['支持', '反對', '正面', '負面', '好處', '壞處'];
(B.t3 || []).forEach(s => {
  ['doc1_pos','doc2_pos'].forEach(k => {
    const v = (s[k] || '').trim();
    if (v.length < 12) E(`${s.id}：${k} 只有 ${v.length} 字 —— ⭐ 要講清楚站哪一邊、理由是什麼，不是「支持/反對」`);
    else if (VAGUE.some(x => v === x || v === x + '。')) E(`${s.id}：${k} 是空話`);
  });
});

/* 6. 主題分布（提醒用，不是錯誤） */
['t1','t2','t3'].forEach(t => {
  const c = {};
  (B[t] || []).forEach(s => { c[s.theme] = (c[s.theme] || 0) + 1; });
  const ks = Object.keys(c).sort((a,b) => c[b] - c[a]);
  console.log(`\n${t.toUpperCase()} 主題（${ks.length} 種）：` +
              ks.slice(0, 8).map(k => `${k} ${c[k]}`).join('　') + (ks.length > 8 ? ' …' : ''));
});

/* 7. ⭐ 覆蓋率提醒：八座島能餵到哪些 T3 主題 */
const ISLANDS = ['travail','famille','éducation','santé','voyage','loisirs','technologie','écologie','ville','alimentation'];
const t3themes = [...new Set((B.t3 || []).map(s => s.theme))];
const uncovered = t3themes.filter(t => !ISLANDS.includes(t));
if (uncovered.length)
  console.log(`\n⭐ T3 有 ${uncovered.length} 個主題不在八座島的射程內：${uncovered.join('、')}` +
              `\n   → 這些題要靠現場想，不是靠存貨。⛔ 不是錯誤，是提醒你哪裡最花時間。`);

console.log(`\n檢查 ${n} 題｜錯誤 ${errors}／提醒 ${warns}`);
process.exit(errors ? 1 : 0);
