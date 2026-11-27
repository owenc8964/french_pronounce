#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""transcript_clean.py — 清掉聽力逐字稿 script_fr 裡混進來的中文解析／答案（2026-11-27）
Owen：「法文老師中文很差，英文可以讀，要確定那檔案關鍵的字或指示有法文或英文」
→ 老師練習包的 Transcription 就是 script_fr；清單見 research/2026-11-25_模考逐字稿混中文清單.md（Q78）。
規則：
  1. 單獨一行的「–」是原始 PDF 的分隔線，後面全是解析 → 從那裡切掉（⛔ 行首「– Salut…」是對話破折號，不切）
  2. 沒有分隔線的：從第一個出現中文的那一行切掉
  3. HAND：中法文寫在同一行的（co_39 Q2–4）人工給乾淨版本
  切完 tok 只留在新長度內的，script_spk 照行數截短。只動結尾，前面的字位置不變（ctx／片語不受影響）。
跑法：python3 tools/transcript_clean.py [--write]"""
import json, re, sys, shutil, os
P = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'assets/tcf/exam/listening.json')
HAN = re.compile(r'[\u3400-\u9fff]')
ZHP = re.compile(r'[\u3400-\u9fff\u3000-\u303f\uff01-\uff0f\uff1a-\uff20]')   # 中文字或全形標點（。，：）
SEP = re.compile(r'\n\s*[–—-]\s*(\n|$)')
HAND = {   # 中法文寫在同一行，或題目句後面黏著解析：人工給乾淨版本（只留法文原句，答案選項拿掉）
    'co_39#2': "À quelle heure arrivez-vous au travail ?",
    'co_39#3': "Bonjour madame la directrice, vous avez passé un bon week-end ?",
}
TAIL = {'co_8#25': "\nQuestion 25. Quelle est la durée de validité d'un avoir dans cette boutique ?"}   # 切掉後要補回的題目句


def clean(s):
    m = SEP.search(s)
    if m:
        s = s[:m.start()]
    lines = s.split('\n')
    for i, l in enumerate(lines):
        if HAN.search(l) or re.search(r'["”)）]\s*[。）]\s*$', l):   # 中文字，或解析殘尾「")。」
            lines = lines[:i]
            break
    # 題目句（? 結尾）後面又接引號開頭的行＝解析引用原文
    while len(lines) >= 2 and re.match(r'\s*["“«]', lines[-1]) and lines[-2].rstrip().endswith('?'):
        lines = lines[:-1]
    return '\n'.join(lines).rstrip()


def main():
    d = json.load(open(P, encoding='utf-8'))
    ch = []
    for t in d['tests']:
        for q in t['questions']:
            s = q.get('script_fr') or ''
            key = '%s#%s' % (t['id'], q['q'])
            n = HAND.get(key) or clean(s) + TAIL.get(key, '')
            if n != s:
                ch.append((key, s, n))
                q['script_fr'] = n
                if q.get('tok'):
                    q['tok'] = [x for x in q['tok'] if x[1] <= len(n)]
                if q.get('script_spk'):
                    q['script_spk'] = q['script_spk'][:n.count('\n') + 1]
    print('改了', len(ch), '題；還有中文的', sum(bool(HAN.search(q.get('script_fr') or '')) for t in d['tests'] for q in t['questions']))
    if '--show' in sys.argv:
        for k, s, n in ch:
            if HAN.search(s) and not SEP.search(s) or '--all' in sys.argv:
                print('==', k, '| 切掉', len(s) - len(n), '字\n  尾：', repr(n[-120:]), '\n  去：', repr(s[len(n):len(n) + 80]))
    if '--write' in sys.argv:
        shutil.copy(P, P + '.bak-2026-11-27')
        json.dump(d, open(P, 'w', encoding='utf-8'), ensure_ascii=False)
        print('寫入')
    return ch


if __name__ == '__main__':
    main()
