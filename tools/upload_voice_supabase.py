#!/usr/bin/env python3
"""upload_voice_supabase.py — 把預錄的法文音檔上傳到 Supabase 私人空間（2026-09-22）

前一步：python3 tools/gen_voice_audio.py 產出 audio/voice/*.m4a 與 audio/voice/index.json。

為什麼放私人空間：這些是 Mac 系統聲音錄的，macOS 授權只准個人非商業，⛔ 不能公開放。
放跟考試題圖片同一個 bucket `TCF`（登入才讀得到），路徑 `voice/<key>.m4a` 與 `voice/index.json`。
⚠️ 「私人空間、只有 Owen 一人使用」是否算個人使用，條文有「發布／轉散布」字眼，屬灰色地帶
   （見 research/2026-09-21_預錄語音音檔的授權.md），非法律意見。

金鑰：讀專案根目錄 `.env` 的 SUPABASE_SECRET_KEY（⛔ 永不 commit、永不印出）。
  ⚠️ secret key 放 `apikey` header（不是 Authorization: Bearer）；它會繞過 RLS，只能在本機用。

只上傳 index.json 有列到的音檔；已上傳且內容沒變的會跳過（audio/voice/.uploaded.json，已被 gitignore）。

用法（專案根目錄）：
  python3 tools/upload_voice_supabase.py --limit 3   # 先試傳 3 個音檔＋index
  python3 tools/upload_voice_supabase.py             # 全部
"""
import argparse, concurrent.futures as cf, hashlib, json, os, sys, urllib.error, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VOICE = os.path.join(ROOT, 'audio', 'voice')
MANIFEST = os.path.join(VOICE, '.uploaded.json')
URL = 'https://hgkqyrglftljxaieberm.supabase.co'
PUBLISHABLE = 'sb_publishable_lPnh46F2Z2wj6qVs5nn56g_RwRpUO8_'   # 本來就公開在 sync_supabase.js
BUCKET = 'TCF'
PREFIX = 'voice'


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
    ap.add_argument('--limit', type=int, default=0, help='只傳前 N 個音檔（試跑用）')
    args = ap.parse_args()
    key = secret_key()

    index_path = os.path.join(VOICE, 'index.json')
    if not os.path.exists(index_path):
        sys.exit('找不到 audio/voice/index.json，請先跑 python3 tools/gen_voice_audio.py')
    index_bytes = open(index_path, 'rb').read()
    index = json.loads(index_bytes)
    keys = sorted(set(index['items'].values()))
    missing = [k for k in keys if not os.path.exists(os.path.join(VOICE, k + '.m4a'))]
    if missing:
        sys.exit(f'index.json 列了 {len(missing)} 個本機不存在的音檔（例如 {missing[0]}），請重跑 gen_voice_audio.py')
    if args.limit:
        keys = keys[:args.limit]

    done = json.load(open(MANIFEST)) if os.path.exists(MANIFEST) else {}
    jobs = [(f'{PREFIX}/{k}.m4a', open(os.path.join(VOICE, k + '.m4a'), 'rb').read(), 'audio/mp4', 86400) for k in keys]
    # index 放最後、快取短一點（新增音檔後很快就要讓網站看到）
    jobs.append((f'{PREFIX}/index.json', index_bytes, 'application/json', 300))

    todo = [j for j in jobs if done.get(j[0]) != hashlib.md5(j[1]).hexdigest()]
    total_mb = sum(len(j[1]) for j in jobs) / 1e6
    print(f'聲音：{index.get("voice")}　共 {len(jobs)} 個檔（{total_mb:.1f} MB），這次要傳 {len(todo)} 個', flush=True)

    fails = []
    def one(j):
        return j, upload(key, j[0], j[1], j[2], j[3])
    # 音檔先傳、index 最後傳：網站看到新 index 時，它列的音檔一定已經在
    audio_todo = [j for j in todo if j[0] != f'{PREFIX}/index.json']
    index_todo = [j for j in todo if j[0] == f'{PREFIX}/index.json']
    for batch in (audio_todo, index_todo):
        with cf.ThreadPoolExecutor(8) as ex:
            for n, (j, (st, msg)) in enumerate(ex.map(one, batch), 1):
                if st in (200, 201):
                    done[j[0]] = hashlib.md5(j[1]).hexdigest()
                else:
                    fails.append((j[0], st, msg))
                if n % 100 == 0 or n == len(batch):
                    print(f'  {n}/{len(batch)}，失敗 {len(fails)}', flush=True)
                    json.dump(done, open(MANIFEST, 'w'))
        if fails:
            break        # 有音檔失敗就不傳 index，避免網站讀到指向不存在檔案的索引
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
