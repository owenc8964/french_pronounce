#!/usr/bin/env python3
"""radio_build.py — 收音機的一集：草稿＋抽查修正＋題目 → 遊戲用資料，壓縮音檔並上傳私人空間（2026-11-07）

輸入：assets/podcast/<show>/draft/<id>.json（podcast_segment.py）＋ assets/podcast/<show>/notes/<id>.json（Claude 抽查＋出題）
  notes 格式：{skip:[段號], fix:[[段號, 舊字串, 新字串]], segs:{段號:{q:[題幹, [4 選項], 正解 index, 原句, 詳解(中), 原句提示], w:[[字, 中文, 所在句提示]]}}}
  ⛔ 題目 TCF 樣式：選項換句話說、四個平行；⛔ 沒有 notes 的段不上線（Owen 11-07：「我先抽查才上」）
輸出：assets/podcast/radio/<show>_<id>.json、assets/podcast/<show>/m4a/<id>.m4a（單聲道 40kbps）
上傳：podcast/<show>/<id>.m4a、podcast/<show>_<id>.json、podcast/index.json
用法：python3 tools/radio_build.py easyfrench 213 [--upload]
"""
import json, os, re, subprocess, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NAMES = {'easyfrench': 'Easy French', 'innerfrench': 'InnerFrench'}

def clean(t): return re.sub(r'\s{2,}', ' ', t.replace('⟦', '').replace('⟧', '')).strip()

def build(show, eid):
    base = os.path.join(ROOT, 'assets', 'podcast', show)
    D = json.load(open(os.path.join(base, 'draft', eid + '.json')))
    N = json.load(open(os.path.join(base, 'notes', eid + '.json')))
    skip = set(N.get('skip', []))
    segs = []
    for s in D['segs']:
        k = str(s['n'])
        if s['n'] in skip or k not in N['segs']: continue
        lines = [dict(l, t=clean(l['t'])) for l in s['lines']]
        lines = [l for l in lines if re.search(r'[A-Za-zÀ-ÿ]', l['t'])]
        for n, old, new in N.get('fix', []):
            if n != s['n']: continue
            hit = False
            for l in lines:
                if old in l['t']: l['t'] = clean(l['t'].replace(old, new)); hit = True; break
            if not hit:
                j = ' '.join(l['t'] for l in lines)
                assert old in j, f'fix 找不到：段 {n}「{old}」'
                # 跨句的修正：併到第一句命中的位置
                for i in range(len(lines) - 1):
                    two = lines[i]['t'] + ' ' + lines[i + 1]['t']
                    if old in two:
                        lines[i] = {'s': lines[i]['s'], 'e': lines[i + 1]['e'], 't': clean(two.replace(old, new))}
                        del lines[i + 1]; break
        lines = [l for l in lines if l['t']]
        def at(p):   # 句數，或「從含這段字的那一句」
            if isinstance(p, int): return p
            i = next((i for i, l in enumerate(lines) if p in l['t']), None); assert i is not None, f'段 {k} 找不到「{p}」'; return i
        cut = N.get('trim', {}).get(k)   # 段首裁掉（前一段跳過時留下的尾巴）
        if cut is not None: lines = lines[at(cut):]
        end = N.get('tail', {}).get(k)   # 從這一句起裁掉（段尾的廣告）
        if end is not None: lines = lines[:at(end)]
        A = N['segs'][k]
        q = A['q']; assert len(q[1]) == 4 and 0 <= q[2] < 4, k
        txt = ' '.join(l['t'] for l in lines).lower()
        assert q[5].lower() in txt, f'段 {k} 原句提示對不到：{q[5]}'
        for w in A['w']: assert w[2].lower() in txt, f'段 {k} 字的提示對不到：{w}'
        segs.append({'id': f'{show}-{eid}-{k}', 'n': s['n'], 's': lines[0]['s'], 'e': lines[-1]['e'], 'lines': lines,
                     'q': {'q': q[0], 'o': q[1], 'a': q[2], 'line': q[3], 'why': q[4], 'hint': q[5]},
                     'w': A['w']})
    out = {'show': show, 'name': NAMES.get(show, show), 'id': eid, 'title': D['title'],
           'audio': f'podcast/{show}/{eid}.m4a', 'tags': N.get('tags', []), 'segs': segs}
    rd = os.path.join(ROOT, 'assets', 'podcast', 'radio'); os.makedirs(rd, exist_ok=True)
    jp = os.path.join(rd, f'{show}_{eid}.json'); json.dump(out, open(jp, 'w'), ensure_ascii=False)
    m4a = os.path.join(base, 'm4a', eid + '.m4a'); os.makedirs(os.path.dirname(m4a), exist_ok=True)
    if not os.path.exists(m4a):
        eps = {e['id']: e for e in json.load(open(os.path.join(base, 'episodes.json')))}
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', os.path.join(base, eps[eid]['file']),
                        '-vn', '-ac', '1', '-c:a', 'aac', '-b:a', '40k', '-movflags', '+faststart', m4a], check=True)
    print(show, eid, len(segs), 'segs', f'{os.path.getsize(m4a)/1e6:.1f}MB')
    return out, jp, m4a

def index():
    rd = os.path.join(ROOT, 'assets', 'podcast', 'radio')
    idx = []
    for f in sorted(os.listdir(rd)):
        if not f.endswith('.json') or f == 'index.json': continue
        d = json.load(open(os.path.join(rd, f)))
        idx.append({'file': f'podcast/{f}', 'show': d['show'], 'name': d['name'], 'id': d['id'],
                    'title': d['title'], 'tags': d['tags'], 'segs': [s['id'] for s in d['segs']]})
    p = os.path.join(rd, 'index.json'); json.dump(idx, open(p, 'w'), ensure_ascii=False); return p

if __name__ == '__main__':
    show, ids, up = sys.argv[1], [a for a in sys.argv[2:] if not a.startswith('--')], '--upload' in sys.argv
    built = [build(show, e) for e in ids]
    ip = index()
    if up:
        sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
        from upload_listen_supabase import upload, secret_key
        k = secret_key()
        for out, jp, m4a in built:
            print(out['audio'], upload(k, out['audio'], open(m4a, 'rb').read(), 'audio/mp4', 31536000))
            print(os.path.basename(jp), upload(k, 'podcast/' + os.path.basename(jp), open(jp, 'rb').read(), 'application/json', 60))
        print('index', upload(k, 'podcast/index.json', open(ip, 'rb').read(), 'application/json', 60))
