#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""reading_zh_align.py — 閱讀題「原文翻譯」照原文分段（2026-11-28）
Owen：「原文跟翻譯分段的問題呢」→ mock.html 原文和翻譯段數一樣時一段配一段（11-28 先做了 520 題），
其餘 src_zh 是一整塊或分段不同。這裡只在中文裡插入／移動換行，⛔ 一個字都不改：
  ① 中法句數相同 → 照每段法文有幾句，把中文句子分給同一段（精準）
  ② 句數不同（翻譯合句／拆句）→ 依每段法文在全文的長度比例，斷在最接近的中文句號（。！？），太遠才退到逗號
  原文只有一段的不動（左右兩塊本來就對得上）。
跑法：python3 tools/reading_zh_align.py [--write]"""
import json, re, sys, shutil, os
P = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'assets/tcf/exam/reading.json')
FR = re.compile(r'(?<=[.!?…»])\s+(?=[A-ZÀ-ÝÉ«"0-9])')
ZH = re.compile(r'(?<=[。！？])')


def align(fr_text, zh_text):
    fp = [l.strip() for l in fr_text.split('\n') if l.strip()]
    zp = [l.strip() for l in zh_text.split('\n') if l.strip()]
    if len(fp) <= 1 or len(fp) == len(zp):
        return None, ''
    z = ''.join(zp)
    if not re.search(r'[\u3400-\u9fff]', z):
        return None, 'notzh'
    fs_per = [[s for s in FR.split(p) if s.strip()] for p in fp]
    zs = [s for s in ZH.split(z) if s.strip()]
    if sum(len(x) for x in fs_per) == len(zs):
        out, k = [], 0
        for x in fs_per:
            out.append(''.join(zs[k:k + len(x)])); k += len(x)
        return out, 'sent'
    # ② 逐句對齊（Gale-Church 式長度配對，允許 1–1／1–2／2–1／1–3／3–1／2–2），段界落在對應的中文句子之後
    fs, para_end = [], []
    for x in fs_per:
        fs += x; para_end.append(len(fs))
    if not zs:
        return None, 'fail'
    k = sum(len(x) for x in zs) / max(1, sum(len(x) for x in fs))
    INF = float('inf'); nF, nZ = len(fs), len(zs)
    C = [[INF] * (nZ + 1) for _ in range(nF + 1)]; B = [[None] * (nZ + 1) for _ in range(nF + 1)]; C[0][0] = 0
    BEADS = [(1, 1, 0), (1, 2, .4), (2, 1, .4), (1, 3, .9), (3, 1, .9), (2, 2, .6), (1, 0, 2.5), (0, 1, 2.5)]
    for i in range(nF + 1):
        for j in range(nZ + 1):
            if C[i][j] == INF: continue
            for di, dj, pen in BEADS:
                I, J = i + di, j + dj
                if I > nF or J > nZ: continue
                lf = sum(len(x) for x in fs[i:I]) * k; lz = sum(len(x) for x in zs[j:J])
                cost = C[i][j] + pen + abs(lf - lz) / max(8, (lf + lz) / 2)
                if cost < C[I][J]: C[I][J] = cost; B[I][J] = (i, j)
    if C[nF][nZ] == INF:
        return None, 'fail'
    zmap = {}                                   # 法文第 i 句（累計）結束 → 中文累計句數
    i, j = nF, nZ
    while (i, j) != (0, 0):
        zmap[i] = j; i, j = B[i][j]
    cuts = []
    for e in para_end[:-1]:
        c = zmap.get(e)
        if c is None:                           # 段界在一個多對一的中間：找最近的對齊點
            c = zmap[min(zmap, key=lambda x: abs(x - e))]
        cuts.append(c)
    if cuts != sorted(cuts) or len(set(cuts)) != len(cuts) or cuts[0] == 0 or cuts[-1] >= nZ:
        return None, 'fail'
    out, a = [], 0
    for c in cuts + [nZ]:
        out.append(''.join(zs[a:c])); a = c
    return out, 'dp'


def main():
    d = json.load(open(P, encoding='utf-8')); n = {}
    for t in d['tests']:
        for q in t['questions']:
            if not q.get('text_fr') or not q.get('src_zh'):
                continue
            out, how = align(q['text_fr'], q['src_zh'])
            n[how or 'skip'] = n.get(how or 'skip', 0) + 1
            if out:
                assert ''.join(out) == ''.join(l.strip() for l in q['src_zh'].split('\n') if l.strip())   # ⛔ 字不能變
                q['src_zh'] = '\n'.join(out)
    print(n)
    if '--write' in sys.argv:
        shutil.copy(P, P + '.bak-2026-11-28b')
        json.dump(d, open(P, 'w', encoding='utf-8'), ensure_ascii=False); print('寫入')


if __name__ == '__main__':
    main()
