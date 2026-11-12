#!/usr/bin/env python3
"""exam_ocr_reading.py — 閱讀題原文圖片 → 文字（2026-11-12）
Owen：「詳解不夠詳細，可以我直接連點兩下原文就能知道翻譯或是哪個動詞的變形及時態」
→ 閱讀原文只有圖（img/r<套>_<題>.png），用 macOS Vision 辨識成文字，存進 reading.json 的 text_fr。
  已有 text_fr 的跳過；斷行接回、行尾連字號接回。
用法：python3 tools/exam_ocr_reading.py [--limit N]
"""
import json, os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import Quartz
from Foundation import NSURL
from ocr_pdf import ocr_image
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EX = os.path.join(ROOT, 'assets', 'tcf', 'exam')

def load(path):
    src = Quartz.CGImageSourceCreateWithURL(NSURL.fileURLWithPath_(path), None)
    return Quartz.CGImageSourceCreateImageAtIndex(src, 0, None) if src else None

def join_lines(t):
    t = re.sub(r'(\w)-\n(\w)', r'\1\2', t)            # 行尾連字號
    t = re.sub(r'\n(?=[a-zà-ÿ,;:«»(])', ' ', t)      # 小寫開頭＝同一句接下去
    t = re.sub(r'(?<![.!?:»])\n', ' ', t)             # 前一行沒結束句子
    return re.sub(r'[ \t]+', ' ', t).strip()

def main(limit):
    p = os.path.join(EX, 'reading.json'); D = json.load(open(p, encoding='utf-8')); n = 0
    for t in D['tests']:
        for q in t['questions']:
            if q.get('text_fr') or not q.get('img'): continue
            img = load(os.path.join(EX, q['img']))
            if img is None: print('讀不到', q['img']); continue
            q['text_fr'] = join_lines(ocr_image(img)); n += 1
            if n % 100 == 0:
                print(n, flush=True); json.dump(D, open(p, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
            if limit and n >= limit: break
        if limit and n >= limit: break
    json.dump(D, open(p, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print('辨識', n, '張')

if __name__ == '__main__':
    main(int(sys.argv[sys.argv.index('--limit') + 1]) if '--limit' in sys.argv else 0)
