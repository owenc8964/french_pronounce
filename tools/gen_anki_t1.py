#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""從 t1_stock.js 生成 T1 背誦卡（Anki TSV，24 欄格式見 ANKI_SETUP.md）。

⭐ Owen 2026-09-05 指定的六步進程：
   ①記誦中文 ②翻譯法文 ③背起來 ④看提示詞快速講完(越快越好) ⑤直接默背 ⑥默背加速版
→ 卡片這樣對應：
   ProductionPrompt = 中文 ＋ 提示詞（前期靠它起頭，熟了自己蓋住）
   ProductionAnswer = 法文全文
   ⭐ 一張卡走完 ④→⑤→⑥：提示詞是「支架」，你熟了就不看它，不需要換卡。

⚠️ 只出 Production 卡（MakeProductionCard=y），⛔ 不出 Listening 卡——
   T1 練的是產出不是辨識。
⚠️ 每天匯入上限 5 張（memory feedback_production_vs_recognition_load：純生成卡很耗腦力）。
   本檔照 level 與 hook 排序輸出，⭐ 從上往下每天取 5 張即可。

跑法：python3 tools/gen_anki_t1.py  →  anki/anki_t1_stock.tsv
匯入前先跑 python3 tools/anki_precheck.py（撞號／HTML／欄位數）
"""
import json, re, subprocess, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

# 用 node 把 t1_stock.js 讀成 JSON（避免自己寫 JS parser）
js = subprocess.run(['node','-e','''
const fs=require("fs");
const M=new Function(fs.readFileSync("t1_stock.js","utf8")+"; return {T1_OPENING,T1_STOCK};")();
console.log(JSON.stringify(M));
'''], capture_output=True, text=True).stdout
M = json.loads(js)

def clean(t):
    """TSV 不能有 tab／換行；⛔ 不放 HTML 標籤（ANKI_SETUP 明訂，2026-08-19 踩過）"""
    return (t or '').replace('\t',' ').replace('\n\n',' ／ ').replace('\n',' ').strip()

rows, seen = [], set()

def add(eid, prompt_zh, cues, fr, hook, level, src, note, ask=''):
    if eid in seen: raise SystemExit(f'撞號：{eid}')
    seen.add(eid)
    cue_line = '　│　'.join(cues) if cues else ''
    f = ['']*24
    f[0]  = eid
    f[1]  = clean(fr)                      # Sentence
    f[2]  = clean(prompt_zh)               # Translation
    f[3]  = clean(ask)                     # ContextBefore ＝ ⭐ 考官問的那句（情境）
    f[7]  = f'T1 {hook} L{level}｜{src}'   # Source
    f[9]  = clean(cue_line)                # KeyChunk ＝ ⭐ 提示詞（支架）
    f[12] = clean(prompt_zh)               # ProductionPrompt ＝ ⭐ 只放中文答案（要翻的東西）
    f[13] = clean(fr)                      # ProductionAnswer ＝ 法文全文
    f[15] = clean(note)                    # UsageNotes
    f[19] = 'A2'
    f[20] = 'y'                            # MakeProductionCard
    f[21] = ''                             # ⛔ 不出 Listening 卡
    f[22] = 'approved'
    f[23] = f'fr::src::island fr::task::t1 fr::t1::{re.sub(r"[^a-z]+","_",hook.lower()).strip("_")} fr::lvl::a2'
    rows.append('\t'.join(f))

# 開場（⭐ 唯一一張「主動講」的卡，其餘都是被問才答）
o = M['T1_OPENING']
add('FR_T1_OPENING', o['zh'], o.get('cues'), o['fr'], 'opening', 0, o['from'],
    f"⭐ T1 開場，{o['mots']} mots／目標 {o['sec']} 秒。⛔ 不要講滿 120 秒——官方評分第一個字是 interaction，講滿就把互動空間佔光了。")

# 存貨：依 level 再依 hook 排，⭐ 從上往下每天取 5 張
stock = [s for s in M['T1_STOCK'] if not s.get('gap')]
stock.sort(key=lambda s: (s.get('level',1), s['hook']))
for i, s in enumerate(stock, 1):
    # ⭐⭐ 問題與中文答案分開放：
    #   ContextBefore ＝ 考官問的那句（情境，不是要翻的東西）
    #   ProductionPrompt ＝ 只有中文答案 → 唯一決定法文答案，⛔ 不是開放式題幹
    #   （2026-09-05：混在一起會讓 anki_precheck 誤判成開放式，而且卡片設計本身也不對）
    note = f"{s['sec']} 秒。追問題：{s['q_fr']}"
    add(f'FR_T1_{i:02d}', s['zh'], s.get('cues'), s['fr'], s['hook'], s.get('level',1),
        s['src'], note, ask=f"（考官問）{s['q_zh']}")

out = 'anki/anki_t1_stock.tsv'
with open(out,'w',encoding='utf-8') as fh:
    fh.write('\n'.join(rows) + '\n')

bad = [r for r in rows if len(r.split('\t')) != 24]
print(f'寫出 {out}：{len(rows)} 張')
print(f'欄位數檢查：{"✅ 全部 24 欄" if not bad else f"❌ {len(bad)} 列欄位數不對"}')
print(f'HTML 標籤：{"✅ 無" if not re.search(r"<[a-zA-Z/]", chr(10).join(rows)) else "❌ 有"}')
print(f'⭐ 每天匯入 5 張 → {-(-len(rows)//5)} 天全部進去')
