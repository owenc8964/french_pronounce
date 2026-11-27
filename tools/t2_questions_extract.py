#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""t2_questions_extract.py — 從《口语2备考宝典》抽「Phrases」段的考生問句（2026-11-27）
Owen：「遊戲可以設計這個選擇題：如果你想問 XXX（中文）要選哪個，當然要一些更精準的部分」
→ 寶典每個主題有「Phrases」：• Combien ça coûte ?（这个多少钱？），上面有中文小標（关于价格／关于优惠…）。
做法：pdfplumber 左右半頁分開、濾掉浮水印（字級 ≥18、(cid:)），把「• 法文 ?（中文）」接回斷行；簡轉繁（opencc s2twp）。
輸出：assets/tcf/exam_isle/t2_questions_raw.json（⛔ 寶典內容只放 gitignore 的 assets/tcf，上傳私人 Supabase）"""
import pdfplumber, json, re, os, sys
from opencc import OpenCC
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PDF = os.path.join(ROOT, 'assets/tcf/pdf/口语2备考宝典(更新版02）.pdf')
OUT = os.path.join(ROOT, 'assets/tcf/exam_isle/t2_questions_raw.json')
cc = OpenCC('s2twp')
HAN = re.compile(r'[㐀-鿿]')


def half(pg, side):
    w = pg.width
    box = (0, 0, w / 2, pg.height) if side == 0 else (w / 2, 0, w, pg.height)
    c = pg.crop(box).filter(lambda o: o.get('object_type') != 'char' or (o.get('size', 0) < 18 and '(cid:' not in o.get('text', '')))
    return c.extract_text() or ''


def main():
    pdf = pdfplumber.open(PDF)
    out, sec, sub, in_phr = [], '', '', False
    for pn, pg in enumerate(pdf.pages):
        for sd in (0, 1):
            lines = [l.strip() for l in half(pg, sd).split('\n')]
            cur = None
            for l in lines:
                if not l or l.startswith('©') or re.fullmatch(r'\d+', l):
                    continue
                if l == 'Phrases':
                    in_phr = True; continue
                if l in ('Formulaire', 'Mots', 'Vocabulaire') or l.startswith('Candidat') or l.startswith('Examinateur'):
                    in_phr = l != 'Formulaire' and in_phr and False
                    cur = None; continue
                if l.startswith('•'):
                    cur = {'fr': l[1:].strip(), 'sub': sub, 'page': pn + 1}
                    out.append(cur); continue
                if cur is not None and not cur['fr'].rstrip().endswith(('）', ')')):
                    cur['fr'] += ('' if HAN.search(l[:1]) else ' ') + l; continue
                cur = None
                if HAN.search(l) and len(l) <= 16 and not re.search(r'[A-Za-z]', l):
                    sub = l
    qs = []
    for x in out:
        m = re.match(r'^(.*?\?)\s*[（(](.+?)[）)]\s*$', x['fr'])
        if not m or HAN.search(m.group(1)):
            continue
        fr = re.sub(r'\s+', ' ', m.group(1)).replace(' ?', ' ?').strip()
        qs.append({'fr': fr, 'zh': cc.convert(m.group(2).replace(' ', '')), 'sub': cc.convert(x['sub']), 'page': x['page']})
    seen, uniq = set(), []
    for q in qs:
        k = q['fr'].lower()
        if k not in seen:
            seen.add(k); uniq.append(q)
    json.dump(uniq, open(OUT, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print('bullets', len(out), 'questions', len(qs), 'unique', len(uniq))


if __name__ == '__main__':
    main()
