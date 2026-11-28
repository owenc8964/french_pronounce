#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""listening_faithful_apply.py — 聽力逐字稿的中文換成忠實翻譯（2026-11-28）
Owen：「聽力也改」（同閱讀：每個法文字的意思都在、不刪不加、仍是通順中文；⛔ 不照法文字序硬排）
輸入：assets/tcf/exam/_trans/<套>.json {"題號": "第一行\n第二行…"}——⭐ 一行對 script_fr 的一行
      （script_fr 有字母或數字的非空行；mock.html 逐句對照就是照這個切）
做的事：備份 listening.json → 舊中文存 script_zh_free（只存第一次）→ script_zh＝新翻譯（原本「答案…」以後的解析行接在後面保留）
       → lined=True（照行分段）→ 重跑 exam_build_mock_data.py
跑法：python3 tools/listening_faithful_apply.py co_5"""
import json, os, re, shutil, subprocess, sys, time
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EX = os.path.join(ROOT, 'assets/tcf/exam')


def rows(fr):
    return [l.strip() for l in str(fr or '').split('\n') if re.search(r'[A-Za-zÀ-ÿ0-9]', l)]


def main(tid):
    src = os.path.join(EX, 'listening.json')
    shutil.copy2(src, src + '.bak-faithful-' + tid + '-' + time.strftime('%Y%m%d%H%M'))
    d = json.load(open(src, encoding='utf-8')); tr = json.load(open(os.path.join(EX, '_trans', tid + '.json'), encoding='utf-8'))
    t = [x for x in d['tests'] if x['id'] == tid][0]; ok, bad = 0, []
    for q in t['questions']:
        k, fr = str(q['q']), q.get('script_fr')
        if not fr: continue
        if k not in tr: bad.append((k, '沒有翻譯')); continue
        new = [l.strip() for l in tr[k].split('\n') if l.strip()]
        if len(new) != len(rows(fr)): bad.append((k, '行數 法%d 中%d' % (len(rows(fr)), len(new)))); continue
        old = str(q.get('script_zh') or '').split('\n')
        j = next((i for i, l in enumerate(old) if re.match(r'^\s*答案', l)), None)
        ex = '\n'.join(old[j:]).strip() if j is not None else ''
        if 'script_zh_free' not in q: q['script_zh_free'] = q.get('script_zh')
        q['script_zh'] = '\n'.join(new) + ('\n' + ex if ex else ''); q['lined'] = True; ok += 1
    json.dump(d, open(src, 'w', encoding='utf-8'), ensure_ascii=False)
    print(tid, '套用', ok, '題；沒套用', bad)
    subprocess.run([sys.executable, os.path.join(ROOT, 'tools/exam_build_mock_data.py')], check=True)


if __name__ == '__main__':
    main(sys.argv[1])
