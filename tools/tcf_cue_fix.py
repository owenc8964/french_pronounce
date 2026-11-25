#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""tcf_cue_fix.py — 修正自動分割點「標到上一題」的錯位（2026-11-25）

Owen 回報 co_4 第 17 題：「時間錯了! 這是十六題吧」。原因：tcf_listening_cues.py 靠音檔報題號找起點，
報題號被辨識錯（例：「Question 20」其實是第 21 題、「Question pour vous」）時，起點會落在上一題的對話上。
做法：用 tcf_cue_check.check() 找出「這裡聽起來是別題內容」的題，改用逐字稿內容在語音辨識裡第一次出現的位置。
上一題沒有起點（null）時一起補。結果寫進 cues_fix.json，tcf_listening_cues.py 產生 cues.js 時最後套用。
⛔ 不動 cues_manual.json（那是 Owen 手標的，優先於這裡）。

跑法：python3 tools/tcf_cue_fix.py   → 寫 cues_fix.json 並套進 cues.js
"""
import json, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from tcf_listening_cues import ASR, EX, MARK, WORDS, PRE_ROLL, seg_text, seg_start, toks
from tcf_cue_check import check

CUES = os.path.join(EX, 'cues.js')
# co_16 38–39＝保留 11-25 以前線上版的值（重算會變，原因不明，先不動）。其餘：自動找的位置逐條對過語音辨識後，這 4 格要再手動校正（第一句被辨識漏掉，或只對到「Bonjour madame」）
HAND = {'co_16': {'38': None, '39': 1843.16}, 'co_15': {'21': 856.0}, 'co_11': {'12': 418.3}, 'co_19': {'22': 973.8}, 'co_31': {'11': 402.1}}
FIX = os.path.join(EX, 'cues_fix.json')


def load_cues():
    return json.loads(open(CUES, encoding='utf-8').read().split('=', 1)[1].strip().rstrip(';'))


def hit(g, sset, need):
    w = toks(seg_text(g))
    return len(w) >= 3 and sum(x in sset for x in w) / len(w) >= need


def first_content(segs, script, lo, hi):
    """逐字稿第一行要對得上（≥60%），而且後面兩句至少一句也對得上整題（≥50%）——只對到「madame」這種單字不算。"""
    lines = [l for l in script.split('\n') if l.strip()]
    head = set(toks(' '.join(lines[:2]))) if lines else set()
    sset = set(toks(script))
    for k, g in enumerate(segs):
        s = seg_start(g)
        if s < lo or s > hi:
            continue
        if hit(g, head, .6) and any(hit(x, sset, .5) for x in segs[k + 1:k + 3]):
            return k
    return None


def start_of(segs, k, q):
    """內容第一句的位置；如果前面 8 秒內有報這一題的題號（前 10 題的結構），從題號開始。"""
    s = seg_start(segs[k])
    for j in range(k - 1, max(-1, k - 4), -1):
        g = segs[j]
        if s - seg_start(g) > 8:
            break
        for m in MARK.finditer(seg_text(g)):
            v = m.group(1).lower()
            if (WORDS.get(v) or (int(v) if v.isdigit() else 0)) == q:
                s = seg_start(g)
    return round(max(0.0, s - PRE_ROLL), 2)


def main():
    cues = load_cues()
    man = json.load(open(os.path.join(EX, 'cues_manual.json'), encoding='utf-8'))
    tests = {t['id']: t for t in json.load(open(os.path.join(EX, 'listening.json'), encoding='utf-8'))['tests']}
    # 累加：已經修過的格保留（重跑時 cues.js 已套過修正，偵測不到它們）
    fix = json.load(open(FIX, encoding='utf-8')) if os.path.exists(FIX) else {}
    for tid, c in cues.items():
        segs = [g for g in json.load(open(os.path.join(ASR, 'co_test' + tid[3:] + '.json'), encoding='utf-8'))['segments'] if seg_text(g)]
        scripts = [q.get('script_fr') or '' for q in tests[tid]['questions']][:39]
        m = man.get(tid, {})
        eff = [m[str(i + 1)]['t'] if str(i + 1) in m and m[str(i + 1)].get('t') is not None else c[i] for i in range(39)]
        for i in range(39):
            if eff[i] is None or str(i + 1) in m:
                continue
            kind, msg = check(tid, i + 1, eff[i], segs, scripts, [None] * 39)
            if kind != 'other':
                continue
            nxt = next((eff[j] for j in range(i + 1, 39) if eff[j] is not None and eff[j] > eff[i] + 5), eff[i] + 300)
            k = first_content(segs, scripts[i], eff[i] + 3, nxt + 5)
            if k is None:
                print(tid, i + 1, '找不到這題內容，起點拿掉', msg)
                fix.setdefault(tid, {})[str(i + 1)] = None
                continue
            new = start_of(segs, k, i + 1)
            fix.setdefault(tid, {})[str(i + 1)] = new
            print('%s Q%d %.1f → %.1f（%s）' % (tid, i + 1, eff[i], new, msg))
            # 上一題沒有起點、而舊起點其實就是上一題 → 一起補
            if i > 0 and eff[i - 1] is None and str(i) not in m:
                prev = next((eff[j] for j in range(i - 2, -1, -1) if eff[j] is not None), 0)
                kp = first_content(segs, scripts[i - 1], prev + 3, new)
                if kp is not None:
                    fix[tid][str(i)] = start_of(segs, kp, i)
                    print('   補 Q%d = %.1f' % (i, fix[tid][str(i)]))
    for tid, d in HAND.items():
        fix.setdefault(tid, {}).update(d)
    json.dump(fix, open(FIX, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    apply(cues, fix)
    print('修正', sum(len(v) for v in fix.values()), '格')


def apply(cues=None, fix=None):
    cues = cues or load_cues()
    if fix is None:
        fix = json.load(open(FIX, encoding='utf-8')) if os.path.exists(FIX) else {}
    for tid, d in fix.items():
        for q, t in d.items():
            if tid in cues:
                cues[tid][int(q) - 1] = t
    open(CUES, 'w', encoding='utf-8').write('window.TCF_CUES=' + json.dumps(cues, separators=(',', ':')) + ';\n')


if __name__ == '__main__':
    main()
