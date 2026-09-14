#!/usr/bin/env python3
"""upload_exam_supabase.py — 把 TCF 閱讀考試題上傳到 Supabase 私人空間（2026-09-14）

Owen 09-14 選：考試原題⛔不進公開 repo，放 Supabase 私人 bucket `TCF`，登入才讀得到。
試煉之塔（quest.html「考試之塔」）登入後從這裡拿題目。

做的事：
  1. assets/tcf/exam/img/r*.png → WebP q60（快取在 assets/tcf/exam/webp/，已被 gitignore）
     ⭐ 396MB → 約 90MB；字最密的一張實看可讀
  2. 每套題目轉成 reading/data/<id>.json，另出 reading/index.json（套數清單）
  3. 上傳到 bucket TCF 的 reading/ 底下（已上傳且內容沒變的檔會跳過，見 .uploaded.json）
  4. 最後檢查：⛔ 沒登入的人讀不到（公開網址、只帶 publishable key 都要被擋）

金鑰：讀專案根目錄 `.env` 的 SUPABASE_SECRET_KEY（⛔ 永不 commit、永不印出）。
  ⚠️ secret key 放 `apikey` header（官方：不是 JWT，不要放 Authorization: Bearer）；它會繞過 RLS，只能在本機用。

用法：
  python3 tools/upload_exam_supabase.py --limit 3   # 先試傳 3 張圖＋題目 JSON
  python3 tools/upload_exam_supabase.py             # 全部
"""
import argparse, concurrent.futures as cf, glob, hashlib, json, os, sys, urllib.error, urllib.request
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EXAM = os.path.join(ROOT, 'assets', 'tcf', 'exam')
CACHE = os.path.join(EXAM, 'webp')
MANIFEST = os.path.join(EXAM, '.uploaded.json')
URL = 'https://hgkqyrglftljxaieberm.supabase.co'
PUBLISHABLE = 'sb_publishable_lPnh46F2Z2wj6qVs5nn56g_RwRpUO8_'   # 本來就公開在 sync_supabase.js
BUCKET = 'TCF'
PREFIX = 'reading'


def secret_key():
    path = os.path.join(ROOT, '.env')
    if not os.path.exists(path):
        sys.exit('找不到 .env')
    for line in open(path, encoding='utf-8'):
        if line.startswith('SUPABASE_SECRET_KEY='):
            k = line.split('=', 1)[1].strip()
            if k.startswith('sb_secret_'):
                return k
    sys.exit('.env 裡沒有 sb_secret_ 開頭的 SUPABASE_SECRET_KEY')


def load_test(path):
    s = open(path, encoding='utf-8').read()
    return json.loads(s[s.index(',') + 1:s.rindex(')')])


def reading_index():
    s = open(os.path.join(EXAM, 'index.js'), encoding='utf-8').read()
    return json.loads(s[s.index('=') + 1:].strip().rstrip(';'))['reading']


def to_webp(png):
    os.makedirs(CACHE, exist_ok=True)
    out = os.path.join(CACHE, os.path.basename(png)[:-4] + '.webp')
    if not os.path.exists(out):
        Image.open(png).convert('RGB').save(out, 'webp', quality=60)
    return out


def upload(key, path, data, ctype):
    req = urllib.request.Request(
        f'{URL}/storage/v1/object/{BUCKET}/{path}', data=data, method='POST',
        headers={'apikey': key, 'Content-Type': ctype, 'x-upsert': 'true', 'cache-control': '86400'})
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return r.status, ''
    except urllib.error.HTTPError as e:
        return e.code, e.read()[:200].decode('utf-8', 'replace')
    except Exception as e:  # 網路錯誤
        return 0, str(e)[:200]


def status_of(url, headers):
    try:
        with urllib.request.urlopen(urllib.request.Request(url, headers=headers), timeout=20) as r:
            return r.status
    except urllib.error.HTTPError as e:
        return e.code
    except Exception:
        return 0


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--limit', type=int, default=0, help='只傳前 N 張圖（試跑用）')
    args = ap.parse_args()
    key = secret_key()
    done = json.load(open(MANIFEST)) if os.path.exists(MANIFEST) else {}

    jobs = []   # (bucket 內路徑, 本機 bytes 取得函式, content-type)
    index = reading_index()
    imgs = []
    for t in index:
        d = load_test(os.path.join(EXAM, 'data', t['id'] + '.js'))
        qs = []
        for q in d['questions']:
            name = os.path.basename(q['img'])[:-4] + '.webp'
            imgs.append(os.path.join(EXAM, q['img']))
            qs.append({k: q.get(k) for k in ('q', 'stem', 'opts', 'answer', 'src_zh', 'q_zh', 'key_zh', 'opt_zh')}
                      | {'img': 'img/' + name})
        body = json.dumps({'id': d['id'], 'label': d['label'], 'n': len(qs), 'questions': qs},
                          ensure_ascii=False).encode('utf-8')
        jobs.append((f'{PREFIX}/data/{d["id"]}.json', body, 'application/json'))
    jobs.append((f'{PREFIX}/index.json',
                 json.dumps([{'id': t['id'], 'label': t['label'], 'n': t['n']} for t in index],
                            ensure_ascii=False).encode('utf-8'), 'application/json'))

    imgs = sorted(set(imgs))
    if args.limit:
        imgs = imgs[:args.limit]
    print(f'轉 WebP：{len(imgs)} 張…', flush=True)
    with cf.ThreadPoolExecutor(6) as ex:
        webps = list(ex.map(to_webp, imgs))
    for w in webps:
        jobs.append((f'{PREFIX}/img/{os.path.basename(w)}', open(w, 'rb').read(), 'image/webp'))

    todo = [j for j in jobs if done.get(j[0]) != hashlib.md5(j[1]).hexdigest()]
    total_mb = sum(len(j[1]) for j in jobs) / 1e6
    print(f'共 {len(jobs)} 個檔（{total_mb:.1f} MB），這次要傳 {len(todo)} 個', flush=True)

    fails = []
    def one(j):
        return j, upload(key, j[0], j[1], j[2])
    with cf.ThreadPoolExecutor(8) as ex:
        for n, (j, (st, msg)) in enumerate(ex.map(one, todo), 1):
            if st in (200, 201):
                done[j[0]] = hashlib.md5(j[1]).hexdigest()
            else:
                fails.append((j[0], st, msg))
            if n % 100 == 0 or n == len(todo):
                print(f'  {n}/{len(todo)}，失敗 {len(fails)}', flush=True)
                json.dump(done, open(MANIFEST, 'w'))
    json.dump(done, open(MANIFEST, 'w'))
    for f in fails[:10]:
        print('  ✗', f)

    # ⛔ 沒登入的人必須讀不到
    probe = f'{PREFIX}/index.json'
    pub = status_of(f'{URL}/storage/v1/object/public/{BUCKET}/{probe}', {})
    anon = status_of(f'{URL}/storage/v1/object/authenticated/{BUCKET}/{probe}',
                     {'apikey': PUBLISHABLE, 'Authorization': 'Bearer ' + PUBLISHABLE})
    mine = status_of(f'{URL}/storage/v1/object/authenticated/{BUCKET}/{probe}', {'apikey': key})
    print(f'檢查：公開網址 → HTTP {pub}（要被擋）｜只帶公開 key → HTTP {anon}（要被擋）｜本機 secret key → HTTP {mine}（要 200）')
    ok = not fails and pub not in (200,) and anon not in (200,) and mine == 200
    print('✓ 完成' if ok else '⚠️ 有問題，看上面')
    sys.exit(0 if ok else 1)


if __name__ == '__main__':
    main()
