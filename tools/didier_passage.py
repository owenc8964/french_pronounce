#!/usr/bin/env python3
"""didier_passage.py — 把課本一整段聽力（考試型，有題目）對齊成「每句的時間」，給小鎮 🎣 深水區用（2026-11-06）

輸入（全在 assets/didier/，整個資料夾被 gitignore，⛔ 商業教材不進公開 repo）：
  transcripts_<book>.json    該軌的錄音原文
  asr/<book>/###.json        該軌每個字的時間（語音辨識）
  _local/passage_q_<book>.json  題目、答案、關鍵字（人工從課本打，答案對過錄音原文）
輸出：passages_<book>.json → 用 upload 傳到私人空間 didier/passages_<book>.json
用法：python3 tools/didier_passage.py b1 [--upload]
"""
import json, os, re, sys, unicodedata, difflib
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DID = os.path.join(ROOT, 'assets', 'didier')

def norm(w):
    w = unicodedata.normalize('NFD', w.lower().replace('’', "'"))
    return re.sub(r'[^a-z0-9]', '', ''.join(c for c in w if unicodedata.category(c) != 'Mn'))

def lines_of(text):
    text = text.replace('’', "'").replace('‘', "'")
    text = re.sub(r'\n\d+ I\n[a-zé ]+\n', '\n', text)          # 頁碼雜訊（200 I deux cents）
    text = re.sub(r'\s*\n\s*', ' ', text)
    turns = re.split(r'\s*([A-ZÉ][a-zéèï]+)\s*:\s*', ' ' + text)
    out = []
    for i in range(1, len(turns) - 1, 2):
        spk, body = turns[i], turns[i + 1].strip()
        for s in re.split(r'(?<=[.!?])\s+', body):
            s = re.sub(r'\s+', ' ', s).strip()
            s = s.replace('déficollectif', 'défi collectif')
            if s: out.append({'spk': spk, 'text': s})
    return out

def main(book, up):
    tr = json.load(open(os.path.join(DID, f'transcripts_{book}.json'), encoding='utf-8'))
    qs = json.load(open(os.path.join(DID, '_local', f'passage_q_{book}.json'), encoding='utf-8'))
    res = []
    for P in qs:
        n = P['track']; asr = json.load(open(os.path.join(DID, 'asr', book, f'{n:03d}.json'), encoding='utf-8'))
        asr = [a for a in asr if a['s'] < P.get('end', 1e9)]
        L = lines_of(tr[str(n)]['text'])
        tw, own = [], []
        for li, l in enumerate(L):
            for w in l['text'].split():
                k = norm(w)
                if k: tw.append(k); own.append(li)
        aw = [norm(a['w']) for a in asr]
        sm = difflib.SequenceMatcher(None, tw, aw, autojunk=False)
        hit = {}
        for b in sm.get_matching_blocks():
            for j in range(b.size): hit[b.a + j] = b.b + j
        for li, l in enumerate(L):
            idx = [hit[i] for i in range(len(tw)) if own[i] == li and i in hit]
            l['s'] = round(asr[min(idx)]['s'], 2) if idx else None
            l['e'] = round(asr[max(idx)]['e'], 2) if idx else None
        for li in range(len(L)):                                     # 沒對上的句子夾在前後之間
            if L[li]['s'] is None:
                prev = next((L[k]['e'] for k in range(li - 1, -1, -1) if L[k]['e']), 0)
                nxt = next((L[k]['s'] for k in range(li + 1, len(L)) if L[k]['s']), prev + 2)
                L[li]['s'], L[li]['e'] = prev, nxt
        cover = sum(1 for i in range(len(tw)) if i in hit) / len(tw)
        for q in P['qs']:
            ev = norm(q['ev'])
            q['line'] = next((i for i, l in enumerate(L) if ev in norm(l['text'].replace(' ', '')) or ev in ''.join(norm(x) for x in l['text'].split())), None)
        res.append(dict(P, book=book, id=f'{book}-{n}', s=round(max(0, L[0]['s'] - .4), 2), e=round(L[-1]['e'] + .6, 2), lines=L))
        print(f'track {n}: {len(L)} 句，字對上 {cover:.0%}，題目找到原句 {sum(q["line"] is not None for q in P["qs"])}/{len(P["qs"])}，{L[0]["s"]}–{L[-1]["e"]} 秒')
    out = os.path.join(DID, f'passages_{book}.json')
    json.dump(res, open(out, 'w', encoding='utf-8'), ensure_ascii=False)
    if up:
        sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
        from upload_listen_supabase import upload, secret_key
        print(upload(secret_key(), f'didier/passages_{book}.json', open(out, 'rb').read(), 'application/json', 60))

if __name__ == '__main__':
    main(sys.argv[1], '--upload' in sys.argv)
