# B1 課本逐字稿（p.197–217）→ 音軌對照。B1 的標頭沒印音軌號，但標頭數＝音軌數＝98，
# 照順序一對一；已用「字數／音檔秒數」驗證（一般對話 14–24 字/秒，偏低的全是 Phonétique 跟讀軌）。
# 用法：python3 tools/didier_transcripts_b1.py assets/didier/transcripts_b1.json
import re, json, sys
txt = open('assets/.textbook_cache.txt', encoding='utf-8').read()
pages = re.split(r'\n\n===== \[(.+?)\] page (\d+) =====\n', txt)
halves = []
for i in range(1, len(pages), 3):
    name, num, body = pages[i], int(pages[i + 1]), pages[i + 2]
    if name != 'Edito.B1.Owen.pdf' or not (197 <= num <= 217): continue
    b = body.split('\n---\n'); halves += [b[1], b[2]]
stream = '\n'.join(halves)

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


def strip_page_marks(s):
    """頁面側邊直排的「Transcriptions」被兩欄切成「Transcr」、頁首「Documents audios」——夾在句子中間，⛔ 不是錄音內容
    （10-21 抽聽 B1 第 2 軌發現；⚠️ 不可誤傷 inscriptions 這種正常字）"""
    s = re.sub(r'(?<![A-Za-zÀ-ÿ])Transcr(?:iptions?)?(?![A-Za-zà-ÿ])', ' ', s)
    s = re.sub(r'(?<![A-Za-zÀ-ÿ])riptions?(?![A-Za-zà-ÿ])', ' ', s)
    s = re.sub(r'\bDocuments? (?:audios?|vidéos?)\b', ' ', s)
    s = re.sub(r'[ \t]{2,}', ' ', s)
    return '\n'.join(l.strip() for l in s.split('\n') if l.strip())

hdr = re.compile(r'^Page (\d{1,3})\s*,\s*(.*)$', re.M)
ms = list(hdr.finditer(stream))
out = []
for k, m in enumerate(ms):
    end = ms[k + 1].start() if k + 1 < len(ms) else len(stream)
    keep = [l for l in stream[m.end():end].strip().split('\n')
            if not re.match(r'^Transcriptions?\b', l) and not re.search(r'^\d{3}\s*I\s*[a-zé -]+$', l.strip())
            and not re.search(r'cent.*I\s*\d{3}\s*$', l) and not re.match(r'^Unité \d+', l) and not re.match(r'^\d{1,2}$', l.strip())]
    keep = strip_page_marks('\n'.join(keep)).split('\n')
    out.append({'unit': unit_at(stream, m.start()), 'page': int(m.group(1)), 'title': m.group(2).strip(), 'text': '\n'.join(keep)})
assert len(out) == 98, f'標頭數 {len(out)} ≠ 98 軌，順序對應不成立，要人工檢查'
out = {i + 1: dict(track=i + 1, **o) for i, o in enumerate(out)}
json.dump(out, open(sys.argv[1], 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(len(out), '個標頭')

