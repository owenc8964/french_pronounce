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

# ⭐ 2026-09-05 新增：解析層。Owen 回報「看到法文也不懂為什麼長這樣」——
#   SRS 真正學到東西的時刻是翻答案那一秒，答案看不懂＝那次 rep 空轉。
#   → 解析放在**背面**（正面維持只有中文，不干擾回想那一步）。
#   ⭐ 用的是背面模板本來就在渲染、目前空著的三個欄位，⛔ 不用改 Anki 樣板。
GLOSS = {}
if os.path.exists('t1_gloss.js'):
    GLOSS = json.loads(subprocess.run(['node','-e','''
const fs=require("fs");
const G=new Function(fs.readFileSync("t1_gloss.js","utf8")+"; return T1_GLOSS;")();
console.log(JSON.stringify(G));
'''], capture_output=True, text=True).stdout)

# codex 座標 → 中文名（讓 📚 那欄不只是數字，而是看得懂的門牌）
CODEX_NAME = json.loads(subprocess.run(['node','-e','''
const fs=require("fs");
const C=new Function(fs.readFileSync("codex.js","utf8")+"; return CODEX;")();
const out={};
const walk=a=>a.forEach(x=>{ if(x.n&&x.name) out[x.n]=x.name; (x.sections||[]).forEach(y=>walk([y])); (x.items||[]).forEach(y=>walk([y])); });
walk(C); console.log(JSON.stringify(out));
'''], capture_output=True, text=True).stdout)

def clean(t):
    """TSV 不能有 tab／換行；⛔ 不放 HTML 標籤（ANKI_SETUP 明訂，2026-08-19 踩過）"""
    return (t or '').replace('\t',' ').replace('\n\n',' ／ ').replace('\n',' ').strip()

rows, seen = [], set()

def gloss_fields(key):
    """回傳 (pattern, points_line, kg) 三個字串。⛔ 全部純文字，不放 HTML／tab／換行。"""
    g = GLOSS.get(key)
    if not g: return '', '', ''
    # 🧩 逐塊對照 —— ⭐ 這是核心：讓他看見「這不是陌生的法文，是我自己講過的話」
    pattern = ' ｜ '.join(f"{b['fr']}＝{b['zh']}" for b in g.get('blocks', []))
    # 文法點：一句話 ＋ 門牌
    pts = g.get('points', [])
    points_line = ' ／ '.join(
        f"📍{p['fr']}：{p['note']}" + (f"（{p['n']}）" if p.get('n') else '（codex 尚無此條）')
        for p in pts)
    # 📚 門牌清單（附 codex 中文名）
    kg = ' ／ '.join(
        f"{p['n']} {CODEX_NAME.get(p['n'], '')}".strip()
        for p in pts if p.get('n'))
    return pattern, points_line, kg


def add(eid, prompt_zh, cues, fr, hook, level, src, note, ask='', gkey=None):
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
    _pattern, _points_line, kg = gloss_fields(gkey)   # ⛔ 前兩個刻意不用，見下方註解
    # ⚠️⚠️ 2026-09-05 Owen：「感覺這個不是 anki 的工作，anki 的卡那麼大一張不確定好不好讀耶」
    #   ⭐ 他是對的：SRS 的前提是「你已經懂了」，它只負責排「什麼時候再考你」。
    #     把逐塊對照塞進卡背 = 每次 rep 都夾帶一份說明書 → 拖慢回想又讀不進去。
    #   → 卡背**只留一行門牌當指標**（📚），逐塊對照與文法解釋全部搬到 t1_read.html。
    #   ⛔ 不要再把 pattern／points_line 放回卡片，那是已經否決過的設計。
    f[12] = clean(prompt_zh)               # ProductionPrompt ＝ ⭐ 只放中文答案（要翻的東西）
    f[13] = clean(fr)                      # ProductionAnswer ＝ 法文全文
    f[15] = clean(note)                    # UsageNotes ＝ 秒數／追問題（⛔ 不放解析）
    f[17] = clean(kg)                      # KnowledgeGraphNode ＝ 📚 門牌指標，看不懂就去 t1_read.html
    f[19] = 'A2'
    f[20] = 'y'                            # MakeProductionCard
    f[21] = ''                             # ⛔ 不出 Listening 卡
    f[22] = 'approved'
    f[23] = f'fr::src::island fr::task::t1 fr::t1::{re.sub(r"[^a-z]+","_",hook.lower()).strip("_")} fr::lvl::a2'
    rows.append('\t'.join(f))

# 開場（⭐ 唯一一張「主動講」的卡，其餘都是被問才答）
o = M['T1_OPENING']
add('FR_T1_OPENING', o['zh'], o.get('cues'), o['fr'], 'opening', 0, o['from'],
    f"⭐ T1 開場，{o['mots']} mots／目標 {o['sec']} 秒。⛔ 不要講滿 120 秒——官方評分第一個字是 interaction，講滿就把互動空間佔光了。",
    gkey='opening')

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
        s['src'], note, ask=f"（考官問）{s['q_zh']}", gkey=s['hook'] + '/' + s['src'])

out = 'anki/anki_t1_stock.tsv'
with open(out,'w',encoding='utf-8') as fh:
    fh.write('\n'.join(rows) + '\n')

bad = [r for r in rows if len(r.split('\t')) != 24]
print(f'寫出 {out}：{len(rows)} 張')
print(f'欄位數檢查：{"✅ 全部 24 欄" if not bad else f"❌ {len(bad)} 列欄位數不對"}')
print(f'HTML 標籤：{"✅ 無" if not re.search(r"<[a-zA-Z/]", chr(10).join(rows)) else "❌ 有"}')
cov = sum(1 for r in rows if r.split('\t')[17])
print(f'📚 門牌指標：{cov}/{len(rows)} 張有（⭐ 解析本體在 t1_read.html，卡背只放指標）')
print(f'⭐ 每天匯入 5 張 → {-(-len(rows)//5)} 天全部進去')
