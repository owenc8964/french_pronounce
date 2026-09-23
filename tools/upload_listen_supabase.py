#!/usr/bin/env python3
"""upload_listen_supabase.py — 把切好的 TCF 聽力片段上傳到 Supabase 私人空間（2026-09-23）

前一步：python3 tools/cut_listening.py --test 1
        產出 audio/listen_seg/index.json 與 audio/listen_seg/t<套>/<題>.mp3

⛔ 為什麼放私人空間：這是 Owen 買的 TCF 考題音檔，**永不進公開 repo／Pages**。
   跟考題圖片同一個 bucket `TCF`（登入才讀得到），路徑 `listen/…`。

金鑰：讀專案根目錄 `.env` 的 SUPABASE_SECRET_KEY（⛔ 永不 commit、永不印出）。
  ⚠️ secret key 放 `apikey` header（不是 Authorization: Bearer）；它會繞過 RLS，只能在本機用。

已上傳且內容沒變的會跳過（audio/listen_seg/.uploaded.json）。

用法（專案根目錄）：
  python3 tools/upload_listen_supabase.py --test 1 --limit 3   # 先試傳 3 個
  python3 tools/upload_listen_supabase.py --test 1             # 傳整套
  python3 tools/upload_listen_supabase.py                      # 傳 index 裡全部的套
"""
import argparse, concurrent.futures as cf, hashlib, json, os, sys, urllib.error, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SEG = os.path.join(ROOT, 'audio', 'listen_seg')
MANIFEST = os.path.join(SEG, '.uploaded.json')
URL = 'https://hgkqyrglftljxaieberm.supabase.co'
PUBLISHABLE = 'sb_publishable_lPnh46F2Z2wj6qVs5nn56g_RwRpUO8_'   # 本來就公開在 sync_supabase.js
BUCKET = 'TCF'
PREFIX = 'listen'


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


def upload(key, path, data, ctype, cache):
    req = urllib.request.Request(
        f'{URL}/storage/v1/object/{BUCKET}/{path}', data=data, method='POST',
        headers={'apikey': key, 'Content-Type': ctype, 'x-upsert': 'true', 'cache-control': str(cache)})
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
    ap.add_argument('--test', help='只傳某一套（例如 1 或 2s）')
    ap.add_argument('--limit', type=int, default=0, help='只傳前 N 個音檔（試跑用）')
    args = ap.parse_args()
    key = secret_key()

    index_path = os.path.join(SEG, 'index.json')
    if not os.path.exists(index_path):
        sys.exit('找不到 audio/listen_seg/index.json，請先跑 python3 tools/cut_listening.py --test 1')
    index = json.load(open(index_path, encoding='utf-8'))
    tests = index['tests']
    if args.test:
        tests = [t for t in tests if str(t['test']) == str(args.test)]
        if not tests:
            sys.exit(f'index.json 裡沒有 test {args.test}')

    items = [i for t in tests for i in t['items']]
    missing = [i['f'] for i in items if not os.path.exists(os.path.join(SEG, i['f']))]
    if missing:
        sys.exit(f'index 列了 {len(missing)} 個本機不存在的音檔（例如 {missing[0]}）')
    if args.limit:
        items = items[:args.limit]

    done = json.load(open(MANIFEST)) if os.path.exists(MANIFEST) else {}
    jobs = [(f'{PREFIX}/{i["f"]}', open(os.path.join(SEG, i['f']), 'rb').read(), 'audio/mpeg', 86400)
            for i in items]
    # ⚠️ index 一定要放最後：網站看到新 index 時，它列的音檔必須已經在
    index_bytes = json.dumps(index, ensure_ascii=False).encode('utf-8')
    jobs.append((f'{PREFIX}/index.json', index_bytes, 'application/json', 300))

    todo = [j for j in jobs if done.get(j[0]) != hashlib.md5(j[1]).hexdigest()]
    total_mb = sum(len(j[1]) for j in jobs) / 1e6
    print(f'套數 {len(tests)}　音檔 {len(items)} 個（合計 {total_mb:.1f} MB），這次要傳 {len(todo)} 個', flush=True)

    fails = []
    def one(j):
        return j, upload(key, j[0], j[1], j[2], j[3])
    audio_todo = [j for j in todo if j[0] != f'{PREFIX}/index.json']
    index_todo = [j for j in todo if j[0] == f'{PREFIX}/index.json']
    for batch in (audio_todo, index_todo):
        with cf.ThreadPoolExecutor(6) as ex:
            for n, (j, (st, msg)) in enumerate(ex.map(one, batch), 1):
                if st in (200, 201):
                    done[j[0]] = hashlib.md5(j[1]).hexdigest()
                else:
                    fails.append((j[0], st, msg))
                if n % 10 == 0 or n == len(batch):
                    print(f'  {n}/{len(batch)}，失敗 {len(fails)}', flush=True)
                    json.dump(done, open(MANIFEST, 'w'))
        if fails:
            break        # ⛔ 有音檔失敗就不傳 index，避免網站讀到指向不存在檔案的索引
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
