#!/usr/bin/env python3
"""exam_polish_slim.py — 模考詳解潤飾：替背景助手做精簡輸入檔（2026-11-13，省 token）
用法：python3 tools/exam_polish_slim.py <scratchpad> co_25 ce_25 ...
產出 <scratchpad>/in/slim_<id>.json（不含 tok）、<scratchpad>/out/、<scratchpad>/POLISH_SPEC.md（輸入路徑已改成精簡檔）
"""
import json, sys, os, re
EX = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'assets', 'tcf', 'exam')
SP = sys.argv[1]
OUT = SP + '/in'; os.makedirs(OUT, exist_ok=True); os.makedirs(SP + '/out', exist_ok=True)
ids = sys.argv[2:]
KEEP = {'listening': ['q', 'stem', 'opts', 'answer', 'script_fr', 'script_zh'],
        'reading': ['q', 'stem', 'opts', 'answer', 'text_fr', 'src_zh', 'q_zh', 'key_zh', 'opt_zh', 'ans_zh']}
for skill in ('listening', 'reading'):
    D = json.load(open(f'{EX}/{skill}.json', encoding='utf-8'))
    for t in D['tests']:
        if t['id'] not in ids: continue
        qs = [{k: q[k] for k in KEEP[skill] if q.get(k) not in (None, '', [])} for q in t['questions']]
        fp = f'{OUT}/slim_{t["id"]}.json'
        json.dump({'id': t['id'], 'skill': skill, 'questions': qs}, open(fp, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
        print(t['id'], len(qs), os.path.getsize(fp))

# 規格：改成讀精簡檔、輸出到 scratchpad/out
s = open(EX + '/_polish/POLISH_SPEC.md', encoding='utf-8').read()
s = s.replace('`/Users/owen/Documents/Claude/Project/CLB test/France CLB7/assets/tcf/exam/<skill>.json`（skill＝listening 或 reading），`tests` 陣列裡 `id` 等於你負責那套的那一筆，裡面 39 題。',
              f'精簡輸入檔 `{OUT}/slim_<id>.json`（已從題庫抽出你那一套 39 題，只留需要的欄位）。⛔ 不要去讀 listening.json／reading.json 整個檔（太大、浪費）。')
s = re.sub(r'（<scratchpad> = `[^`]+`）', f'（<scratchpad> = `{SP}/out`）', s)
open(SP + '/POLISH_SPEC.md', 'w', encoding='utf-8').write(s)
