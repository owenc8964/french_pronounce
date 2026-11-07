#!/usr/bin/env python3
"""podcast_segment.py — 把一集 podcast 的辨識結果切成 1–2 分鐘的段、每段再拆成句（2026-11-07）

給收音機用（HANDOFF 三之一百一十七）。切點選在「句尾＋停頓最長」的地方，目標每段約 80 秒（50–120）。
⚠️ 辨識文字還沒抽查：低信心（p<0.5）的字在草稿裡標成 ⟦字⟧，抽查時優先看。
輸出：assets/podcast/<show>/draft/<id>.json → {id, title, segs:[{n, s, e, lines:[{s,e,t}]}]}
用法：python3 tools/podcast_segment.py easyfrench 212 [213 …]
"""
import json, os, re, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TARGET, MIN, MAX = 80.0, 50.0, 120.0
END = re.compile(r'[.!?…]["»]?$')

def sentences(words):
    out, cur = [], []
    for i, w in enumerate(words):
        cur.append(w)
        nxt = words[i + 1]['s'] if i + 1 < len(words) else w['e'] + 9
        if END.search(w['w']) or nxt - w['e'] > 1.2 or (len(cur) > 45 and w['w'].endswith(',')):
            out.append(cur); cur = []
    if cur: out.append(cur)
    return out

def text(ws, mark=True):
    t = ' '.join(('⟦' + w['w'] + '⟧') if mark and (w.get('p') or 1) < 0.5 else w['w'] for w in ws)
    return re.sub(r"\s+([,.!?;:…])", r'\1', t).replace(" '", "'").replace("' ", "'").replace(' -', '-')

def segment(show, eid):
    base = os.path.join(ROOT, 'assets', 'podcast', show)
    eps = {e['id']: e for e in json.load(open(os.path.join(base, 'episodes.json')))}
    W = [w for w in json.load(open(os.path.join(base, 'asr', eid + '.json'))) if w['w']]
    S = sentences(W)
    segs, cur = [], []
    for k, s in enumerate(S):
        cur.append(s)
        dur = cur[-1][-1]['e'] - cur[0][0]['s']
        gap = (S[k + 1][0]['s'] - s[-1]['e']) if k + 1 < len(S) else 9
        if dur >= MAX or (dur >= MIN and (dur >= TARGET or gap > 1.5) and END.search(s[-1]['w'])):
            segs.append(cur); cur = []
    if cur:
        if segs and cur[-1][-1]['e'] - cur[0][0]['s'] < MIN: segs[-1] += cur
        else: segs.append(cur)
    out = {'id': eid, 'title': eps[eid]['title'], 'segs': []}
    for n, sg in enumerate(segs, 1):
        out['segs'].append({'n': n, 's': round(sg[0][0]['s'], 2), 'e': round(sg[-1][-1]['e'], 2),
                            'lines': [{'s': round(l[0]['s'], 2), 'e': round(l[-1]['e'], 2), 't': text(l)} for l in sg]})
    d = os.path.join(base, 'draft'); os.makedirs(d, exist_ok=True)
    json.dump(out, open(os.path.join(d, eid + '.json'), 'w'), ensure_ascii=False, indent=1)
    lens = [round(s['e'] - s['s']) for s in out['segs']]
    print(show, eid, len(out['segs']), 'segs', lens)

if __name__ == '__main__':
    for e in sys.argv[2:]: segment(sys.argv[1], e)
