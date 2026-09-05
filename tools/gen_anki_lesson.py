#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""一課上完 → 直接生該課的 Anki 卡（只生「要講得出來」的那一批）。

⭐ 設計依據（2026-09-05）：
 ① 單位是「塊」不是「詞」——CLAUDE.md 學習策略第 3 條：不背 mal，背 j'ai mal à la tête。
    → 卡以 chunks.js 的【句子】為單位，用它含有的【最高階字】決定要不要出卡。
 ② 產出／認得分層（tools/vocab_priority.py 的四層）：
    ⭐⭐ 產出級（TCF 聽讀語料 ≥30 次）→ 出 Production 卡（中→法）
    ⭐ 認得級 A／B、專有名詞          → ⛔ 不出卡
 ③ ⚠️ 為什麼認得級不出卡：Listening 卡的正面只有 {{Audio}}（ANKI_SETUP 模板），
    而 repo 裡 154 張既有卡【零張有音檔】——沒有音源就是一張空白卡。
    ⭐ 這剛好也對上 C 路研究：辨識層不做卡、只掃讀（Terai 2021：A2 不要全面翻方向）。
    → 認得級請用 `python3 tools/vocab_priority.py <課次>` 印出來掃過去就好。

⚠️ 每天匯入上限 5 張（memory feedback_production_vs_recognition_load）。本檔照 TCF 頻次排序，
   ⭐ 從上往下每天取 5 張。

跑法：python3 tools/gen_anki_lesson.py 30   →  anki/anki_l30_auto.tsv
"""
import json, re, sys, os, subprocess, collections

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
if len(sys.argv) < 2: raise SystemExit('用法：python3 tools/gen_anki_lesson.py <課次>')
LESSON = sys.argv[1]

# ── TCF 語料頻次 ──
buf = []
for f in ['assets/tcf/exam/listening.json', 'assets/tcf/exam/reading.json']:
    if os.path.exists(f): buf.append(json.dumps(json.load(open(f)), ensure_ascii=False))
FREQ = collections.Counter(re.findall(r"[a-zà-ÿœ'’-]+", ' '.join(buf).lower()))

# ── 該課的塊 ──
chunks = json.loads(subprocess.run(
    ['node','-e','const fs=require("fs");console.log(JSON.stringify(new Function(fs.readFileSync("chunks.js","utf8")+"; return CHUNKS;")()));'],
    capture_output=True, text=True).stdout)
lesson_chunks = [c for c in chunks if str(c.get('lesson')) == LESSON]

# ⚠️ 2026-09-05 修：原本用手寫黑名單擋功能詞，⛔ 擋不乾淨——
#   c'est（語料 1813 次）漏掉了，害「這一塊值得背」的判準變成挑到文法黏著劑。
#   ⭐ 改用原理：依 Zipf，語料自己的前 150 高頻詞必然是功能詞 → 直接整批排掉。
FUNC = {w for w, _ in FREQ.most_common(400)}
PROPER = re.compile(r'^(locmiam|dijon|france|paris|europe|noël|jolie|lauryn|owen|taipei|banqiao)$')

def top_word(fr):
    """這一塊裡最高頻的實詞（決定卡型）"""
    best = ('', 0)
    for w in re.findall(r"[a-zà-ÿœ'’-]+", fr.lower()):
        if len(w) < 3 or w in FUNC or PROPER.match(w): continue
        n = FREQ.get(w, 0)
        if n > best[1]: best = (w, n)
    return best

# ── 既有 ID 最大號，⛔ 不撞號 ──
used = set()
for f in os.listdir('anki'):
    if f.endswith('.tsv'):
        for line in open(os.path.join('anki', f), encoding='utf-8'):
            used.add(line.split('\t')[0])
n = 1
def next_id():
    global n
    while f'FR_L{LESSON}_{n:03d}' in used: n += 1
    i = f'FR_L{LESSON}_{n:03d}'; used.add(i); n += 1
    return i

def clean(t): return (t or '').replace('\t',' ').replace('\n',' ').strip()

rows, skipped = [], collections.Counter()
scored = []
for c in lesson_chunks:
    fr, zh = c.get('fr',''), c.get('zh','')
    if not fr or not zh: skipped['缺 fr/zh'] += 1; continue
    if len(fr.split()) < 3: skipped['太短（單詞卡，不成塊）'] += 1; continue
    w, freq = top_word(fr)
    if freq < 30: skipped['認得級 → 掃讀就好'] += 1; continue
    scored.append((freq, w, c))

scored.sort(key=lambda x: -x[0])
for freq, w, c in scored:
    f = ['']*24
    f[0]  = next_id()
    f[1]  = clean(c['fr'])                                   # Sentence
    f[2]  = clean(c['zh'])                                   # Translation
    f[7]  = f'第{LESSON}課'                                   # Source
    f[9]  = f'{w}（TCF 語料 {freq} 次）'                       # KeyChunk
    f[12] = clean(c['zh'])                                   # ProductionPrompt ＝ 中文
    f[13] = clean(c['fr'])                                   # ProductionAnswer ＝ 法文
    f[15] = clean(c.get('note',''))                          # UsageNotes
    f[19] = 'A2'
    f[20] = 'y'                                              # ⭐ 只出 Production
    f[22] = 'approved'
    f[23] = f'fr::src::cours fr::lesson::l{LESSON} fr::task::phrase fr::tier::production'
    rows.append('\t'.join(f))

out = f'anki/anki_l{LESSON}_auto.tsv'
open(out,'w',encoding='utf-8').write('\n'.join(rows) + ('\n' if rows else ''))

print(f'第 {LESSON} 課：chunks {len(lesson_chunks)} 條')
for k,v in skipped.most_common(): print(f'  ⛔ 略過 {v:3} 條 —— {k}')
print(f'  ✅ 出卡 {len(rows)} 張 → {out}')
bad=[r for r in rows if len(r.split("\t"))!=24]
print(f'  欄位數：{"✅ 全部 24 欄" if not bad else "❌ "+str(len(bad))+" 列不對"}')
print(f'  HTML：{"✅ 無" if not re.search(r"<[a-zA-Z/]", chr(10).join(rows)) else "❌ 有"}')
if rows: print(f'  ⭐ 每天 5 張 → {-(-len(rows)//5)} 天匯完')
print(f'\n⚠️ 認得級的字不做卡，用這個掃讀：python3 tools/vocab_priority.py {LESSON}')
