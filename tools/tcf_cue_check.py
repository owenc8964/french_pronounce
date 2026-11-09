#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""tcf_cue_check.py — 核對 Owen 在 mock.html 手動標的聽力分割點（2026-11-09）

Owen：「我希望我標完之後你可以做 double confirm」
做法：看標記之後實際講的內容（語音辨識）跟這題逐字稿對不對得上，再看前後幾題，抓出標錯題或標晚了。
⛔ 只寫 chk／msg 欄位、不改他標的時間：要不要改由他決定。

跑法：python3 tools/tcf_cue_check.py [--file 測試用的檔] [--dry-run]
"""
import json, os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from tcf_listening_cues import ASR, EX, MARK, WORDS, marks, seg_start, seg_text, toks

TOL = 4.0      # 跟內容真正開始的位置差幾秒內算對
WINDOW = 14.0  # 往後聽幾秒來判斷是哪一題


def clock(t):
    return '%d:%02d' % (t // 60, t % 60)


def content_hit(seg, sset):
    w = toks(seg_text(seg))
    return len(w) >= 2 and sum(x in sset for x in w) / len(w) >= .6


def score(script, segs):
    s = set(toks(script))
    return len(s & set(t for g in segs for t in toks(seg_text(g)))) / max(1, len(s))


def check(tid, q, t, segs, scripts, auto):
    i = q - 1
    near = [g for g in segs if t - .5 <= g['start'] < t + WINDOW and toks(seg_text(g))]
    if not near:
        return 'none', '標記後 %d 秒內沒有講話，可能標在題目之間的空檔' % WINDOW
    # 這段話最像哪一題（只看內容，不看報題號）
    body = [g for g in near if not MARK.search(seg_text(g))] or near
    rank = sorted(((score(scripts[j], body), j) for j in range(max(0, i - 4), min(39, i + 5)) if scripts[j]), reverse=True)
    best, j = rank[0] if rank else (0, i)
    a = auto[i]
    if a is not None and abs(t - a) <= TOL:
        return 'ok', '跟內容開始的位置一致'
    sset = set(toks(scripts[i]))
    # 這題的內容第一次出現在哪
    start = next((g for g in segs if abs(seg_start(g) - t) < 90 and content_hit(g, sset)), None)
    if j != i and best >= .15 and best > score(scripts[i], body) + .05:
        return 'other', '這裡聽起來是第 %d 題的內容' % (j + 1)
    if start is not None:
        d = t - seg_start(start)
        if -TOL <= d <= TOL:
            return 'ok', '內容對得上'
        if d > TOL:
            return 'late', '這題內容大約在 %s 就開始了，標記晚了 %d 秒' % (clock(seg_start(start)), d)
        return 'early', '這題內容大約在 %s 才開始，標記早了 %d 秒' % (clock(seg_start(start)), -d)
    return 'unsure', '語音辨識對不上這題的原文，請再聽一次確認'


def main():
    f = sys.argv[sys.argv.index('--file') + 1] if '--file' in sys.argv else os.path.join(EX, 'cues_manual.json')
    data = json.load(open(f, encoding='utf-8'))
    tally, pending = {}, []
    for tid, row in data.items():
        base = 'co_test' + tid[3:]
        if not os.path.exists(os.path.join(ASR, base + '.json')):
            pending.append(tid)
            continue
        src = open(os.path.join(EX, 'data', tid + '.js'), encoding='utf-8').read()
        scripts = [x.get('script_fr') or '' for x in json.loads(src[src.index(',') + 1:src.rindex(')')])['questions']]
        segs = [g for g in json.load(open(os.path.join(ASR, base + '.json'), encoding='utf-8'))['segments'] if seg_text(g)]
        auto = marks(base, scripts)
        for q in sorted(row, key=int):
            r = row[q]
            r['chk'], r['msg'] = check(tid, int(q), r['t'], segs, scripts, auto)
            tally[r['chk']] = tally.get(r['chk'], 0) + 1
            print('%s 第%s題 %s %-6s %s' % (tid, q, clock(r['t']), r['chk'], r['msg']))
    print('合計', tally, '尚未辨識', pending)
    if '--dry-run' not in sys.argv:
        tmp = f + '.tmp'
        json.dump(data, open(tmp, 'w', encoding='utf-8'), separators=(',', ':'), ensure_ascii=False)
        os.replace(tmp, f)


if __name__ == '__main__':
    main()
