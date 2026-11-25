#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Q85 只讀全庫掃描：reading.json 的 opts_zh 可疑型態（不寫任何檔）
跑法：python3 tools/tmp_q85_scan.py [類別名]   ← 給類別名會列出該類全部題號"""
import json, re, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from reading_opts_zh import blocks, zh_of, norm, P, BAD, CJK

d = json.load(open(P, encoding='utf-8'))
cats = {}


def add(cat, tid, q, i, msg):
    cats.setdefault(cat, []).append(f"{tid} Q{q['q']} {'ABCD'[i] if i is not None else '-'}: {msg}")


def sim(a, b):
    A, B = set(norm(a)), set(norm(b))
    return len(A & B) / max(len(A), len(B)) if A and B else 0


tot_q = tot_slot = filled = 0
for t in d['tests']:
    for q in t['questions']:
        opts = q.get('opts') or []
        z = q.get('opts_zh')
        tot_q += 1
        tot_slot += len(opts)
        if not z:
            add('整題沒有中文', t['id'], q, None, (q.get('opt_zh') or '')[:80].replace('\n', ' ∥ '))
            continue
        if len(z) != len(opts):
            add('長度不符', t['id'], q, None, f'{len(z)} vs {len(opts)}')
        # 解析區塊：字母 → (fr, zh)
        bl = {}
        for L, b in blocks(q.get('opt_zh') or ''):
            fr, zh = zh_of(b)
            bl.setdefault('ABCD'.index(L.upper()), (fr, zh, b))
        for i, o in enumerate(opts):
            s = z[i] if i < len(z) else ''
            if not s:
                why = ''
                if i in bl:
                    fr, zh, b = bl[i]
                    raw = re.search(r'[（(]([^（）()]*[㐀-鿿][^（）()]*)[）)]', b)
                    if zh is None and raw and BAD.match(re.sub(r'\s+', '', raw.group(1))):
                        why = '括號中文以「' + re.sub(r'\s+', '', raw.group(1))[:2] + '」開頭被 BAD 濾掉'
                    elif zh and sim(fr, o) < .6:
                        why = f'法文對不上({sim(fr, o):.2f}) 解析={fr[:40]!r}'
                    else:
                        why = '其他:' + b[:50].replace('\n', ' ')
                else:
                    why = '解析找不到此字母開頭的行'
                add('個別選項空白', t['id'], q, i, f'{o[:40]} ← {why}')
                continue
            filled += 1
            if len(s) > 30:
                add('過長(>30字)', t['id'], q, i, s)
            if re.search(r'答案|正確|錯誤|排除|原文|文中|因為|符合|選項', s):
                add('含解析用語', t['id'], q, i, s)
            if re.match(r'(翻譯|譯|分析|注|意思)[:：]', s):
                add('帶標籤前綴', t['id'], q, i, s)
            if not CJK.search(s):
                add('沒有中文字', t['id'], q, i, s)
            if re.search(r'[A-Za-zÀ-ÿ]{4,}', s):
                add('中文裡夾法文字', t['id'], q, i, s)
            # 數字不符
            nf, nz = set(re.findall(r'\d+', o)), set(re.findall(r'\d+', s))
            if nf != nz and (nf or nz):
                add('數字不一致', t['id'], q, i, f'{o} ⇒ {s}')
            # 字母錯位：解析裡別的字母那行的法文更像這個選項
            if i in bl:
                own = sim(bl[i][0], o)
                for j, (fr2, _, _) in bl.items():
                    if j != i and sim(fr2, o) > own + 1e-9:
                        add('疑似字母錯位', t['id'], q, i, f'{o[:40]} 自己那行{own:.2f} < {"ABCD"[j]}行{sim(fr2, o):.2f}')
                        break
            # 選項法文被污染
            if re.search(r'Correct ?answer|[a-z][A-Z][a-z]', o):
                add('法文選項本身有雜訊', t['id'], q, i, o)
            # 中國用語轉換殘留
            for fr_kw, zh_kw in (('document', '檔案'), ('programme', '專案'), ('numérique', '數字'), ('fait divers', '瑣事'), ('menu', '選單')):
                if fr_kw in o.lower() and zh_kw in s:
                    add('兩岸用語轉換錯', t['id'], q, i, f'{o} ⇒ {s}')
        # 同題重複中文
        nz = [x for x in z if x]
        if len(set(nz)) < len(nz):
            add('同題兩個選項中文相同', t['id'], q, None, ' / '.join(z))

print(f'題數 {tot_q}，選項格 {tot_slot}，有中文的格 {filled}')
for k, v in cats.items():
    print(f'{k}: {len(v)}')
if len(sys.argv) > 1:
    for line in cats.get(sys.argv[1], []):
        print('  ' + line)
