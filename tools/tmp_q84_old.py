#!/usr/bin/env python3
# Q84 只讀：重算自動起點（不寫任何檔），跟 cues_fix.json 的修正值並排，看原本錯在哪
# 跑法：python3 tools/tmp_q84_old.py
import json, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from tcf_listening_cues import EX, marks

fix = json.load(open(os.path.join(EX, 'cues_fix.json'), encoding='utf-8'))
for tid in sorted(fix, key=lambda x: int(x[3:])):
    src = open(os.path.join(EX, 'data', tid + '.js'), encoding='utf-8').read()
    qs = json.loads(src[src.index(',') + 1:src.rindex(')')])['questions']
    raw = marks('co_test' + tid[3:], [q.get('script_fr') or '' for q in qs])
    for q in sorted(fix[tid], key=int):
        i = int(q) - 1
        print('%s Q%s 重算原值=%s 修正=%s  （前一題原值=%s）' % (tid, q, raw[i], fix[tid][q], raw[i - 1] if i else '-'))
