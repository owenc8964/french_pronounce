/* Q96 合併模擬（2026-11-26，排程子任務）
   目的：驗證「工具箱挑句型改存編號」草稿的合併行為。
   merge() 原樣抄自 sync_supabase.js 69–108（不 require 原檔，避免碰到 localStorage／fetch）。
   ⛔ 不連網、不讀私人內容；句型一律用假編號 P001… 代表，沒有任何法文。
   跑法：node tools/tmp_q96_merge_sim.js */
'use strict';
function mergeStory(a, b) { return Object.assign({}, a, b); } // 本模擬用不到主線分支
function merge(local, inc) {
  if (Array.isArray(local) && Array.isArray(inc)) {
    var seen = {}, out = [];
    var id = function (e) {
      return e && e.ts != null ? 't' + e.ts
           : e && e.id != null && e.date != null ? e.id + '|' + e.date
           : e && e.week != null ? 'w' + e.week
           : JSON.stringify(e);
    };
    local.concat(inc).forEach(function (e) { var k = id(e); if (!seen[k]) { seen[k] = 1; out.push(e); } });
    return out;
  }
  if (local && inc && typeof local === 'object' && typeof inc === 'object') {
    if ('xp' in local || 'streak' in local) { return Object.assign({}, local, inc); }
    var out = Object.assign({}, local);
    Object.keys(inc).forEach(function (k) {
      var a = out[k], b = inc[k];
      if (a == null) out[k] = b;
      else if (a && b && typeof a === 'object' && typeof b === 'object') out[k] = (b.last || 0) >= (a.last || 0) ? b : a;
      else out[k] = b;
    });
    return out;
  }
  if (typeof local === 'string' && typeof inc === 'string') return inc > local ? inc : local;
  return inc != null ? inc : local;
}
/* apply() 的關鍵分支（sync_supabase.js 113–115）：本機沒有這個 key → 直接寫入雲端的值 */
function applyOne(lsVal, incVal) { return lsVal == null ? incVal : merge(lsVal, incVal); }

var ok = 0, bad = 0;
function check(name, cond, detail) { (cond ? ok++ : bad++); console.log((cond ? 'PASS ' : 'FAIL ') + name + (detail ? '  → ' + detail : '')); }
var S = function (n) { return { fr: '〔句型' + n + '〕', zh: '〔意圖' + n + '〕' }; }; // 假資料，代表「全文」

/* ── 1. 現行：wpick 是陣列 ── */
var A = [S(4), S(5), S(6)];            // A 機換成新的 3 個
var B = [S(1), S(2), S(3)];            // B 機還留著舊的 3 個
var m1 = merge(A, B);
check('1 現行陣列：換掉的會被加回來（預期 6 個，證明問題存在）', m1.length === 6, '合併後 ' + m1.length + ' 個');

/* ── 2. 建議：{cur:{ids,last}} ── */
var A2 = { cur: { ids: ['P004', 'P005', 'P006'], last: 2000 } };
var B2 = { cur: { ids: ['P001', 'P002', 'P003'], last: 1000 } };
var m2a = merge(A2, B2), m2b = merge(B2, A2);
check('2 物件形狀：A 本機合併 B 雲端 → 取較新', JSON.stringify(m2a.cur.ids) === '["P004","P005","P006"]');
check('2 物件形狀：B 本機合併 A 雲端 → 也取較新（兩邊一致）', JSON.stringify(m2b.cur.ids) === '["P004","P005","P006"]');

/* ── 3. 取消全部：空清單＋新 last 當 tombstone ── */
var A3 = { cur: { ids: [], last: 3000 } };
var m3 = merge(B2, A3);
check('3 tombstone：清空（ids=[]，last 較新）不會被舊的加回', m3.cur.ids.length === 0);
/* 對照：直接 removeItem */
var m3x = applyOne(null, B2);
check('3 對照：直接刪掉本機 key → 下次 pull 原樣加回（證明不能用刪的）', m3x === B2);

/* ── 4. 離線後才挑：較新的挑選蓋過較舊的 tombstone（正確的「最後一次動作」） ── */
var B4 = { cur: { ids: ['P007'], last: 3500 } };
check('4 較晚的挑選勝過較早的清空', merge(A3, B4).cur.ids[0] === 'P007');

/* ── 5. clb7_tbx_use：舊全文鍵遷移成編號鍵，用 max 不用加總（兩台各遷一次不會算兩倍） ── */
function migrate(newRec, oldRec, fr2id) {
  var out = Object.assign({}, newRec), left = {};
  Object.keys(oldRec).forEach(function (k) {
    var fr = k.slice(2), id = fr2id[fr];
    if (!id) { left[k] = oldRec[k]; return; }
    var o = oldRec[k], nk = 'p:' + id, r = out[nk] || { pick: 0, used: 0, last: 0 };
    out[nk] = { pick: Math.max(r.pick, o.pick || 0), used: Math.max(r.used, o.used || 0), last: Math.max(r.last || 0, o.last || 0) };
  });
  return { rec: out, left: left };
}
var fr2id = {}; fr2id[S(1).fr] = 'P001'; fr2id[S(2).fr] = 'P002';
var old = {}; old['p:' + S(1).fr] = { pick: 3, used: 2, last: 100 }; old['p:' + S(2).fr] = { pick: 1, used: 0, last: 90 };
old['p:〔改過字的句型〕'] = { pick: 2, used: 1, last: 80 };
var devA = migrate({}, old, fr2id).rec;
var devB = migrate(devA, old, fr2id);            // B 已先拉到 A 的結果，再遷自己那份
check('5 遷移冪等：兩台都遷一次，次數不變成兩倍', devB.rec['p:P001'].pick === 3 && devB.rec['p:P001'].used === 2);
check('5 對不到編號的（改過字）留在本機待處理，不上傳', Object.keys(devB.left).length === 1);
check('5 新紀錄的鍵沒有全文', Object.keys(devB.rec).every(function (k) { return /^p:[PV]\d{3}$/.test(k); }));

/* ── 6. 舊 key 退休：不在 RETIRED 機制下，空物件會被另一台的全文加回 ── */
var m6 = merge({}, old);
check('6 對照：把舊 key 蓋成 {} 擋不住（全文鍵被加回，證明要在同步層退休）', Object.keys(m6).length === 3);
/* RETIRED 機制：collect 跳過、apply 不寫回 clb7_ 名下 */
var RETIRED = { clb7_toolbox_use: 'tbxold_use', clb7_toolbox_wpick: 'tbxold_wpick' };
function collect(ls) { var d = {}; Object.keys(ls).forEach(function (k) { if (k.indexOf('clb7_') === 0 && !RETIRED[k]) d[k] = ls[k]; }); return d; }
function apply(ls, rm) {
  Object.keys(rm).forEach(function (k) {
    var tk = RETIRED[k] || k;                       // 退休的 key 轉存到不同步的本機名下
    ls[tk] = applyOne(ls[tk], rm[k]);
  });
  Object.keys(RETIRED).forEach(function (k) { if (k in ls) { ls[RETIRED[k]] = applyOne(ls[RETIRED[k]], ls[k]); delete ls[k]; } });
}
var lsNew = { clb7_tbx_use: devB.rec };
apply(lsNew, { clb7_toolbox_use: old, clb7_tbx_use: devA });   // 雲端還有舊機推上的全文
var up = collect(lsNew);
check('6 RETIRED：舊 key 不再上傳', !('clb7_toolbox_use' in up));
check('6 RETIRED：舊資料轉進本機 tbxold_use 供遷移', !!lsNew.tbxold_use && Object.keys(lsNew.tbxold_use).length === 3);
check('6 RETIRED：上傳內容（序列化）沒有任何全文標記', JSON.stringify(up).indexOf('〔') < 0);

/* ── 7. 時鐘不準的風險（記錄用，不算失敗）── */
var fast = { cur: { ids: ['P009'], last: 5000 } }, slowLater = { cur: { ids: ['P010'], last: 4000 } };
console.log('INFO 7 時鐘快的裝置較早的挑選會勝過時鐘慢的裝置較晚的挑選 → 結果 ' + merge(fast, slowLater).cur.ids[0] + '（全站共同限制，非本次新增）');

console.log('\n合計 PASS ' + ok + '／FAIL ' + bad);
