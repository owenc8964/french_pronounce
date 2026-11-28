#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""reading_faithful_apply.py — 把閱讀題的「原文翻譯」換成忠實翻譯（2026-11-28）
Owen：「翻譯沒有照著字義翻，而是翻成比較順的中文，會讓我學習有點困難」→ 確認「忠實翻譯」：
  每個法文字的意思都在中文裡找得到，不刪、不加、不換說法；語氣、時態、推測、否定、連接詞都譯出來；
  但仍是自然通順的中文（⛔ 不照法文字序硬排，他否決了「我希望做一個實習在您的出版社」這種）。
  範例：Les repas servis dans les avions de ligne ont toujours été tristement réputés pour leur fadeur.
        → 客機上供應的餐點，一向以淡而無味而惡名昭彰。（舊：飛機上的餐點一直以來都以淡而無味出名。）
輸入：assets/tcf/exam/_trans/<套>.json {"題號": "第一段\n第二段…"}，段數要跟 text_fr 的非空行一樣（一段配一段並排）
做的事：備份 reading.json → 舊的意譯存進 src_zh_free（只存第一次）→ src_zh 換新 → 重跑 exam_build_mock_data.py
跑法：python3 tools/reading_faithful_apply.py ce_5"""
import json, os, shutil, subprocess, sys, time
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EX = os.path.join(ROOT, 'assets/tcf/exam')
nl = lambda s: [l.strip() for l in str(s or '').split('\n') if l.strip()]


def main(tid):
    src = os.path.join(EX, 'reading.json')
    shutil.copy2(src, src + '.bak-faithful-' + tid + '-' + time.strftime('%Y%m%d%H%M'))
    d = json.load(open(src, encoding='utf-8')); tr = json.load(open(os.path.join(EX, '_trans', tid + '.json'), encoding='utf-8'))
    t = [x for x in d['tests'] if x['id'] == tid][0]; ok, bad = 0, []
    for q in t['questions']:
        k, fr = str(q['q']), q.get('text_fr')
        if not fr: continue
        if k not in tr: bad.append((k, '沒有翻譯')); continue
        if len(nl(fr)) != len(nl(tr[k])): bad.append((k, '段數 法%d 中%d' % (len(nl(fr)), len(nl(tr[k]))))); continue
        if 'src_zh_free' not in q: q['src_zh_free'] = q.get('src_zh')
        q['src_zh'] = '\n'.join(nl(tr[k])); ok += 1
    json.dump(d, open(src, 'w', encoding='utf-8'), ensure_ascii=False)
    print(tid, '套用', ok, '題；沒套用', bad)
    subprocess.run([sys.executable, os.path.join(ROOT, 'tools/exam_build_mock_data.py')], check=True)


if __name__ == '__main__':
    main(sys.argv[1])
