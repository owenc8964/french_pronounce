# Cahier 逐字稿：標頭「<圖示><編號> Page N, …」，圖示常被 OCR 成 8／3／฿／E3 之類 → 用「上一軌＋1」挑正確編號
import re, json, sys
t = open('assets/didier/cahier_a2_transcripts_ocr.txt', encoding='utf-8').read()
t = re.sub(r'\n===== page \d+ =====\n', '\n', t)
ci = t.find('\nCorrigés')
if ci > 0: t = t[:ci]   # 後面是答案頁，不是逐字稿

def unit_at(text, pos, _c={}):
    """pos 之前最後一個「Unité N」標題（只收遞增的，排除頁首頁尾雜訊）"""
    key = id(text)
    if key not in _c:
        seq, last = [], 0
        for u in re.finditer(r'^\s*\|?\s*Unité (\d{1,2})\b', text, re.M):
            n = int(u.group(1))
            if last < n <= last + 1: seq.append((u.start(), n)); last = n
        _c[key] = seq
    n = None
    for a, k in _c[key]:
        if a <= pos: n = k
        else: break
    return n

hdr = re.compile(r'^(.{0,8}?)Page (\d{1,3})\s*,\s*(.*)$', re.M)
ms = list(hdr.finditer(t))
out, prev, log = {}, 0, []
for k, m in enumerate(ms):
    digits = re.sub(r'\D', '', m.group(1))
    cands = {int(digits[i:]) for i in range(len(digits)) if digits[i:]} if digits else set()
    want = prev + 1
    n = want if (want in cands or not cands) else (min((c for c in cands if prev < c <= prev + 3), default=None))
    if n is None:
        n = want; log.append(f'{n}: 編號 OCR 讀錯（「{m.group(0)[:24]}」），照順序補')
    end = ms[k + 1].start() if k + 1 < len(ms) else len(t)
    body = t[m.end():end].strip()
    body = '\n'.join(l for l in body.split('\n') if not re.match(r'^\d{3}\s*[I|l]\s*cent', l) and not re.match(r'^(TRANSCRIPTIONS|Transcriptions)', l) and not re.match(r'^\s*\|?\s*Unité \d+', l) and l.strip() != '|')
    out[n] = {'track': n, 'unit': unit_at(t, m.start()), 'page': int(m.group(2)), 'title': m.group(3).strip(), 'text': body, 'src': 'OCR'}
    if not cands: log.append(f'{n}: 標頭沒有編號，照順序補')
    prev = n
# 手動修正（已對過原頁）：69 的標頭被 OCR 黏到 61 那一行，內文併進 68
if 68 in out and 69 not in out and '\na. Virginie est très fatiguée' in out[68]['text']:
    a, b = out[68]['text'].split('\na. Virginie est très fatiguée', 1)
    out[68]['text'] = a
    out[69] = {'track': 69, 'unit': out[68]['unit'], 'page': 78, 'title': 'Vocabulaire, Activité 4', 'text': 'a. Virginie est très fatiguée' + b, 'src': 'OCR'}
    log.append('69: 從 68 拆出來（標頭被 OCR 黏到 61 那一行）')
if 61 in out: out[61]['title'] = out[61]['title'].split(' (')[0]
for k in [k for k in out if k > 127]: del out[k]   # 127 之後是別的「Page N」文字，不是音軌
out = dict(sorted(out.items()))
print(len(out), '軌；缺：', [i for i in range(1, 128) if i not in out])
print('\n'.join(log[:30]))
json.dump(out, open('assets/didier/transcripts_a2c.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
