#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""把所有課次的自動卡合併成一份【補課檔】，照 TCF 頻次排、去重。

⚠️ 為什麼需要這支（2026-09-05 Owen：「不是只有 30 課吧，你看一下有幾課沒出 anki 了」）：
   實際盤點 —— 30 課 1946 條 chunks，既有卡只涵蓋 34 條；
   **21 課完全沒有卡**（L1–L15、L17、L20、L21、L24、L25、L29），
   有卡的 9 課涵蓋率也都 <30%。既有的 FR_COURS_REC_* 是「回鍋字」批次，
   挑的是老師說「看過了」的字，不是照課次系統性出卡。

⭐ 排序不照課次，照 TCF 語料頻次：
   ① memory project_recycled_vocab_priority：回鍋字優先於新字
   ② 高頻先背，覆蓋率提升最快
   ③ L1–L15 是幾個月前學的，本來就該當回鍋複習

⛔ 去兩種重複：課與課之間同句（4 組）、跟既有手工卡同句（9 張，會變重複卡）。

跑法：python3 tools/gen_anki_backlog.py  →  anki/anki_backlog_all.tsv
"""
import os, re, json, collections, subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

# 先確保每課的自動檔都在
for L in range(1, 31):
    if not os.path.exists(f'anki/anki_l{L}_auto.tsv'):
        subprocess.run(['python3','tools/gen_anki_lesson.py',str(L)],
                       capture_output=True, text=True)

# 既有手工卡的句子（⛔ 不重出）
manual = set()
for f in os.listdir('anki'):
    if f.endswith('.tsv') and not re.match(r'anki_l\d+_auto\.tsv|anki_backlog', f):
        for line in open('anki/'+f, encoding='utf-8'):
            fl = line.split('\t')
            if len(fl) > 1: manual.add(fl[1].strip())

rows, seen, skipped = [], set(), collections.Counter()
for L in range(1, 31):
    p = f'anki/anki_l{L}_auto.tsv'
    if not os.path.exists(p): continue
    for line in open(p, encoding='utf-8'):
        fl = line.rstrip('\n').split('\t')
        if len(fl) != 24: continue
        s = fl[1].strip()
        if s in manual: skipped['跟既有手工卡同句'] += 1; continue
        if s in seen:   skipped['課與課之間重複'] += 1; continue
        seen.add(s)
        n = int(re.search(r'(\d+) 次', fl[9]).group(1)) if re.search(r'(\d+) 次', fl[9]) else 0
        rows.append((n, fl))

rows.sort(key=lambda x: -x[0])                       # ⭐ 高頻先背
out = [fl for _, fl in rows]

with open('anki/anki_backlog_all.tsv','w',encoding='utf-8') as fh:
    fh.write('\n'.join('\t'.join(fl) for fl in out) + '\n')

print(f'補課檔：{len(out)} 張 → anki/anki_backlog_all.tsv')
for k,v in skipped.most_common(): print(f'  ⛔ 去掉 {v} 張 —— {k}')
print(f'\n  ⭐ 每天 5 張 → {-(-len(out)//5)} 天（約 {len(out)/5/30:.1f} 個月）')
by = collections.Counter(fl[7] for fl in out)
print(f'  涵蓋 {len(by)} 課')
print('\n  前 8 張（最高頻）：')
for fl in out[:8]:
    print(f'    {fl[7]:8} {fl[9]:26} {fl[1][:44]}')
