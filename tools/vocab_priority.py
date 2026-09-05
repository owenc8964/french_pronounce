#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""課本／課堂單字 × TCF 真實語料頻次 → 哪些非背不可，哪些可以放過。

⭐ 回答 Owen 2026-09-05 的問題：「我家教課每次的單字，哪些要熟記？」
   課本一課教幾十個字，但**不是每個字在考試裡都會出現**。
   把 chunks.js（＝從 french_notes.html 抽出來的課本／課堂字句）
   拿去對 TCF 真實語料（88 套聽讀題庫）數頻次，就知道該把力氣放哪。

⚠️ 這支只排「該先背什麼」的順序，⛔ 不是說低頻字沒用——
   課本的字有它的教學順序，老師教的東西照上。這份只解決「時間不夠時先背哪個」。

跑法：python3 tools/vocab_priority.py [課次]
      python3 tools/vocab_priority.py 30      只看第 30 課
      python3 tools/vocab_priority.py         全部課次的總表
"""
import json, re, sys, os, collections

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

# ── 1. TCF 真實語料（88 套聽讀題庫）──
def tcf_corpus():
    buf = []
    for f in ['assets/tcf/exam/listening.json', 'assets/tcf/exam/reading.json']:
        if not os.path.exists(f): continue
        buf.append(json.dumps(json.load(open(f), ), ensure_ascii=False))
    return ' '.join(buf).lower()

CORP = tcf_corpus()
words = re.findall(r"[a-zà-ÿœ'’-]+", CORP)
FREQ = collections.Counter(words)
print(f'TCF 語料：{len(words):,} 個詞（88 套聽讀題庫）\n')

# ── 2. 課本／課堂的字（chunks.js）──
chunks = json.loads(__import__('subprocess').run(
    ['node','-e','const fs=require("fs");console.log(JSON.stringify(new Function(fs.readFileSync("chunks.js","utf8")+"; return CHUNKS;")()));'],
    capture_output=True, text=True).stdout)

want = sys.argv[1] if len(sys.argv) > 1 else None
rows = []
# ⚠️ 2026-09-05 修：原本用手寫黑名單擋功能詞，⛔ 擋不乾淨——
#   c'est（語料 1813 次）漏掉了，害「這一塊值得背」的判準變成挑到文法黏著劑。
#   ⭐ 改用原理：依 Zipf，語料自己的前 150 高頻詞必然是功能詞 → 直接整批排掉。
FUNC = {w for w, _ in FREQ.most_common(150)}

for c in chunks:
    if want and str(c.get('lesson')) != str(want): continue
    for w in re.findall(r"[a-zà-ÿœ'’-]+", (c.get('fr') or '').lower()):
        if len(w) < 3 or w in FUNC: continue
        rows.append((w, c.get('lesson'), c.get('fr','')[:44]))

seen, out = set(), []
for w, lesson, ex in rows:
    if w in seen: continue
    seen.add(w)
    out.append({'mot': w, 'n': FREQ.get(w, 0), 'lesson': lesson, 'ex': ex})
out.sort(key=lambda x: -x['n'])

title = f'第 {want} 課' if want else '全部課次'
print(f'══ {title}：課本教過的字 {len(out)} 個，按 TCF 語料頻次排 ══\n')

# ⚠️⚠️ 2026-09-05 Owen 指正，這一段整個改過：
#   初版把「該不該背」壓成一條頻次軸 → ⛔ 把【產出】跟【認得】混在一起了。
#   Owen：「我是在想聽力跟閱讀是否會出現，感覺還是要聽懂跟認。」他是對的，理由有兩個：
#   ① 「88 套裡 0 次」≠「不會考」——88 套是抽樣不是全部，TCF 聽讀是日常主題輪替，
#      這次沒抽到餐廳不代表你考那天不抽。moutarde／brasserie／nappe 完全可能出現。
#   ② ⭐ 產出（說寫）內容是自己的 → 少而精；接受（聽讀）主題是隨機的 → 廣而淺。
#   → 所以分層要看「背到什麼程度」，不是「該不該背」。
PROPER = re.compile(r'^(locmiam|dijon|france|paris|europe|noël|jolie|lauryn|owen|taipei|banqiao)$')

def tier(o):
    if PROPER.match(o['mot']): return 3          # 專有名詞：⛔ 真的不用管
    if o['n'] >= 30:            return 0          # 產出級
    if o['n'] >= 5:             return 1          # 認得級（有出現過）
    return 2                                      # 認得級（本次抽樣沒出現，但主題字仍可能考）

LABELS = [
 ('⭐⭐ 產出級 —— 要「講得出來」（≥30 次）', '中→法 卡（Production）'),
 ('⭐ 認得級 A —— 看到／聽到要懂（5–29 次）', '法→中 卡（Listening／Recognition）'),
 ('🔸 認得級 B —— 本次抽樣沒出現，但主題字仍可能考', '⛔ 不做卡，掃讀過去就好'),
 ('⛔ 專有名詞 —— 真的不用管', '—'),
]
groups = {i: [] for i in range(4)}
for o in out: groups[tier(o)].append(o)

for i, (label, how) in enumerate(LABELS):
    grp = groups[i]
    print(f'{label}　{len(grp)} 個')
    if how != '—': print(f'    → {how}')
    for o in grp[:20]:
        les = f"L{o['lesson']}" if o['lesson'] else '  '
        print(f"    {o['mot']:20} {o['n']:5} 次  {les:5} {o['ex']}")
    if len(grp) > 20: print(f'    …其餘 {len(grp)-20} 個')
    print()

print('⭐ 一句話：' + f"這一課要「講得出來」的只有 {len(groups[0])} 個；"
      f"另外 {len(groups[1])+len(groups[2])} 個【認得就好】，⛔ 不要花力氣背拼字。")
print('⚠️ 但書：語料只有聽讀 88 套（無口說寫作），且比對的是字形不是詞元；')
print('   ⛔ 低頻不等於沒用——老師教的照上，這份只解決「時間不夠時先背哪個、背到什麼程度」。')
