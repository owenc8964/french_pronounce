#!/usr/bin/env python3
"""exam_gloss_build.py — 合併中文字義表 → assets/tcf/exam/gloss.js（模考頁點兩下查字用，2026-11-12）
輸入：assets/tcf/exam/_gloss/gloss_*.json（{"原形|詞性": "中文"}，背景助手照 lemmas_*.json 寫的）
⛔ 整個 assets/tcf/ 被 gitignore（字表從考題抽出來的，跟考題放一起）
用法：python3 tools/exam_gloss_build.py
"""
import glob, json, os, re
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EX = os.path.join(ROOT, 'assets', 'tcf', 'exam')
G = {}
for p in sorted(glob.glob(os.path.join(EX, '_gloss', 'gloss_*.json'))):
    for k, v in json.load(open(p, encoding='utf-8')).items():
        if '|' in k and re.search(r'[一-鿿]', v): G[k.lower().rsplit('|', 1)[0] + '|' + k.rsplit('|', 1)[1].upper()] = v.strip()
for k, v in list(G.items()):                         # 只查原形的備援：spaCy 詞性判錯時（bonjour|ADV）還查得到
    G.setdefault(k.rsplit('|', 1)[0], v)
open(os.path.join(EX, 'gloss.js'), 'w', encoding='utf-8').write('window.TCF_GLOSS=' + json.dumps(G, ensure_ascii=False, separators=(',', ':')) + ';\n')
print('字義', len(G), '筆')
