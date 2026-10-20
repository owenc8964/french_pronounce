#!/usr/bin/env python3
"""upload_didier_supabase.py — 把 Édito 課本／Cahier 音檔＋逐字稿上傳到 Supabase 私人空間（2026-10-20）

前一步（見 HANDOFF「三之七十八」）：
  tools/didier_download.sh／didier_download_b1.sh → assets/didier/raw/（原檔已刪）
  轉 64k 單聲道 → assets/didier/m4a/{a2,a2c,b1}/###.m4a
  tools/didier_transcripts_{a2,a2c,b1}.py → assets/didier/transcripts_{a2,a2c,b1}.json

⛔ 為什麼放私人空間：Didier 的商業教材（音檔＋逐字稿），**永不進公開 repo／Pages**。
   跟 TCF 考題同一個 bucket `TCF`（登入才讀得到），路徑 `didier/…`；帳號跟考試之塔、聽力解碼頁共用。

上傳內容：
  didier/<book>/###.m4a        音檔（book = a2 課本／a2c Cahier／b1 課本）
  didier/<book>.json           該本每一軌：track、unit、page、title、dur（秒）、text（逐字稿；沒有的是 null）
  didier/index.json            書目清單（最後才傳：網站看到 index 時，它列的檔案必須已經在）

金鑰：讀專案根目錄 `.env` 的 SUPABASE_SECRET_KEY（⛔ 永不 commit、永不印出）。
  ⚠️ secret key 放 `apikey` header（不是 Authorization: Bearer）；它會繞過 RLS，只能在本機用。

已上傳且內容沒變的會跳過（assets/didier/.uploaded.json，assets/didier/ 整個被 gitignore）。

用法（專案根目錄）：
  python3 tools/upload_didier_supabase.py --limit 3   # 先試傳 3 個音檔＋清單
  python3 tools/upload_didier_supabase.py             # 全部
"""
import argparse, concurrent.futures as cf, hashlib, json, os, subprocess, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from upload_listen_supabase import URL, PUBLISHABLE, BUCKET, secret_key, upload, status_of

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DID = os.path.join(ROOT, 'assets', 'didier')
MANIFEST = os.path.join(DID, '.uploaded.json')
PREFIX = 'didier'
BOOKS = [
    {'id': 'a2',  'name': 'Édito A2（課本）',  'code': 'neda2'},
    {'id': 'a2c', 'name': 'Édito A2 Cahier',  'code': 'neda2c'},
    {'id': 'b1',  'name': 'Édito B1（課本）',  'code': 'nedb1'},
]


def duration(path):
    out = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', path],
                         capture_output=True, text=True).stdout.strip()
    return round(float(out), 1) if out else None


def build_book(b):
    tr = json.load(open(os.path.join(DID, f'transcripts_{b["id"]}.json'), encoding='utf-8'))
    folder = os.path.join(DID, 'm4a', b['id'])
    items = []
    for f in sorted(os.listdir(folder)):
        if not f.endswith('.m4a'):
            continue
        n = int(f[:3]); t = tr.get(str(n))
        items.append({'track': n, 'f': f'{b["id"]}/{f}', 'dur': duration(os.path.join(folder, f)), 'unit': t and t.get('unit'),
                      'page': t and t['page'], 'title': t and t['title'],
                      'text': t and (t['text'] or None), 'ocr': bool(t and t.get('src') == 'OCR')})
    return items


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--limit', type=int, default=0, help='只傳前 N 個音檔（試跑用）')
    args = ap.parse_args()
    key = secret_key()

    books = {b['id']: build_book(b) for b in BOOKS}
    audio = [(b, i) for b in books for i in books[b]]
    if args.limit:
        audio = audio[:args.limit]
    done = json.load(open(MANIFEST)) if os.path.exists(MANIFEST) else {}

    jobs = [(f'{PREFIX}/{i["f"]}', open(os.path.join(DID, 'm4a', i['f']), 'rb').read(), 'audio/mp4', 86400)
            for _, i in audio]
    meta = [(f'{PREFIX}/{b}.json', json.dumps(books[b], ensure_ascii=False).encode('utf-8'), 'application/json', 300)
            for b in books]
    index = {'updated': '2026-10-20', 'books': [dict(b, tracks=len(books[b['id']]),
                                                    with_text=sum(1 for i in books[b['id']] if i['text']))
                                               for b in BOOKS]}
    idx = [(f'{PREFIX}/index.json', json.dumps(index, ensure_ascii=False).encode('utf-8'), 'application/json', 300)]

    def pending(js):
        return [j for j in js if done.get(j[0]) != hashlib.md5(j[1]).hexdigest()]
    total_mb = sum(len(j[1]) for j in jobs) / 1e6
    print(f'音檔 {len(jobs)} 個（合計 {total_mb:.1f} MB），這次要傳 {len(pending(jobs))} 個音檔＋清單', flush=True)

    fails = []
    def one(j):
        return j, upload(key, j[0], j[1], j[2], j[3])
    # ⚠️ 順序：音檔 → 每本的清單 → index；前一批有失敗就停，避免網站讀到指向不存在檔案的清單
    # ⚠️ 試傳（--limit）時不傳清單：清單列了全部 370 軌，只傳 3 個音檔就上清單＝網站會讀到不存在的檔（09-23 踩過）
    batches = (pending(jobs),) if args.limit else (pending(jobs), pending(meta), pending(idx))
    for batch in batches:
        with cf.ThreadPoolExecutor(4) as ex:
            for n, (j, (st, msg)) in enumerate(ex.map(one, batch), 1):
                if st in (200, 201):
                    done[j[0]] = hashlib.md5(j[1]).hexdigest()
                else:
                    fails.append((j[0], st, msg))
                if n % 20 == 0 or n == len(batch):
                    print(f'  {n}/{len(batch)}，失敗 {len(fails)}', flush=True)
                    json.dump(done, open(MANIFEST, 'w'))
        if fails:
            break
    json.dump(done, open(MANIFEST, 'w'))
    for f in fails[:10]:
        print('  ✗', f)

    # ⛔ 沒登入的人必須讀不到（音檔和逐字稿都要擋）
    ok = not fails
    for probe in ((jobs[0][0],) if args.limit else (f'{PREFIX}/index.json', jobs[0][0])):
        pub = status_of(f'{URL}/storage/v1/object/public/{BUCKET}/{probe}', {})
        anon = status_of(f'{URL}/storage/v1/object/authenticated/{BUCKET}/{probe}',
                         {'apikey': PUBLISHABLE, 'Authorization': 'Bearer ' + PUBLISHABLE})
        mine = status_of(f'{URL}/storage/v1/object/authenticated/{BUCKET}/{probe}', {'apikey': key})
        print(f'檢查 {probe}：公開網址 → HTTP {pub}（要被擋）｜只帶公開 key → HTTP {anon}（要被擋）｜本機 secret key → HTTP {mine}（要 200）')
        ok = ok and pub != 200 and anon != 200 and mine == 200
    print('✓ 完成' if ok else '⚠️ 有問題，看上面')
    sys.exit(0 if ok else 1)


if __name__ == '__main__':
    main()
