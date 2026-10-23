#!/usr/bin/env python3
"""didier_clips.py — 把聽力填空的段落再切成「一句一句」的短音檔區間，給小鎮遊戲用（2026-10-23）

Owen 10-23：「我覺得可以把聽力題整理進遊戲中了，邊玩邊微調」
→ 遊戲是「走一走一直有題」，一段一分鐘太重；一次只播一句（約 1.5–8 秒）、挖一格。

來源：只用 segments_<book>.json 裡 ok=true 的段（切點都經 Owen 抽聽過），在段內照句子切。
做法：沿用 didier_align.py 的對齊（課本字 ↔ whisper 字的時間），每句的頭尾刀放在前後空檔最安靜的地方。
⛔ 跟段落一樣是商業教材 → 只寫到 assets/didier/clips_<book>.json（不入庫），上傳私人空間 didier/clips_<book>.json

用法（專案根目錄）：
  python3 tools/didier_clips.py a2
  python3 tools/didier_clips.py b1
"""
import json, os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from didier_align import DID, LABEL, UNSPOKEN, WORD, align, quietest, cut_quality

MIN_W, MAX_W = 4, 18          # 一句幾個字
MIN_D, MAX_D = 1.2, 8.0       # 一句幾秒


def clips_of(book, t, segs):
    text, bt, tmap = align(book, t)
    out = []
    pos = 0
    for line in text.split('\n'):
        m0 = LABEL.match(line)
        spk = m0.group(1).strip() if m0 else ''
        for m in re.finditer(r'[^.!?…]+(?:[.!?…]+[»"]?|$)', line):
            frag = m.group()
            if not frag.strip(): continue
            ca, cb = pos + m.start(), pos + m.end()
            idx = [i for i, x in enumerate(bt) if ca <= x[1] < cb]
            if len(idx) < MIN_W or len(idx) > MAX_W: continue
            a, b = idx[0], idx[-1]
            if a not in tmap or b not in tmap: continue                    # 頭尾一定要對上時間
            hit = sum(1 for i in idx if i in tmap) / len(idx)
            if hit < 0.8: continue
            s, e = tmap[a][0], tmap[b][1]
            if not (MIN_D <= e - s <= MAX_D): continue
            seg = next((g for g in segs if g['start'] - 0.05 <= s and e <= g['end'] + 0.05), None)
            if not seg: continue                                           # ⛔ 只用 Owen 抽聽過的段
            prev_e = tmap.get(a - 1, (None, None))[1]
            next_s = tmap.get(b + 1, (None, None))[0]
            lo = prev_e if prev_e is not None and prev_e < s else s - 0.5
            hi = next_s if next_s is not None and next_s > e else e + 0.6
            cs = quietest(book, t['track'], max(lo, s - 0.6, seg['start']), s + 0.03)[0]
            ce = quietest(book, t['track'], e - 0.03, min(hi, e + 0.6, seg['end']))[0]
            ce = min(ce + 0.15, seg['end'])                                 # 尾巴多留一點
            d_in, dip_in = cut_quality(book, t['track'], cs)
            d_out, dip_out = cut_quality(book, t['track'], ce - 0.15)
            if not all(d <= -35 or dip >= 10 for d, dip in ((d_in, dip_in), (d_out, dip_out))):
                continue                                                   # 刀可能落在人聲裡 → 不要
            say = frag.strip()
            if m.start() == 0 and m0: say = line[m0.end():m.end()].strip()
            say = re.sub(r'\s+', ' ', say)
            if not re.search(r'[A-Za-zÀ-ÿ]', say) or UNSPOKEN.search(say) and len(UNSPOKEN.findall(say)) > 1: continue
            out.append({'book': book, 'track': t['track'], 'seg': seg['seg'], 'unit': t.get('unit'), 'page': t.get('page'),
                        'title': t.get('title'), 'spk': spk, 's': round(cs, 2), 'e': round(ce, 2), 'text': say,
                        'n': len(idx)})
        pos += len(line) + 1
    return out


def main():
    book = sys.argv[1]
    tr = json.load(open(os.path.join(DID, f'transcripts_{book}.json'), encoding='utf-8'))
    segs = [s for s in json.load(open(os.path.join(DID, f'segments_{book}.json'), encoding='utf-8')) if s['ok']]
    by_track = {}
    for s in segs: by_track.setdefault(s['track'], []).append(s)
    allc = []
    for n in sorted(by_track):
        c = clips_of(book, tr[str(n)], by_track[n])
        print(f'{book} {n:3d}：{len(c)} 句', flush=True)
        allc += c
    for i, c in enumerate(allc): c['id'] = f'{book}-{c["track"]}-{i}'
    out = os.path.join(DID, f'clips_{book}.json')
    json.dump(allc, open(out, 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
    print(f'→ {out}：{len(allc)} 句')


if __name__ == '__main__':
    main()
