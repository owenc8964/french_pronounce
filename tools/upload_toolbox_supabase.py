#!/usr/bin/env python3
"""upload_toolbox_supabase.py — 🧰 口說寫作工具箱內容上傳到 Supabase 私人空間（2026-11-24）

⛔ 為什麼放私人空間：內容整理自 Lucas 學習資料 xlsx 與口語寶典，屬商業教材衍生；
   repo 是公開的 GitHub Pages → 永不進 repo。bucket `TCF`（登入才讀得到），路徑 `toolbox/content.js`。
前一步：python3 tools/toolbox_build.py（產生 assets/tcf/toolbox/content.js）
金鑰：讀 `.env` 的 SUPABASE_SECRET_KEY（⛔ 永不 commit、永不印出），做法同 tools/upload_listen_supabase.py
用法：python3 tools/upload_toolbox_supabase.py"""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from upload_listen_supabase import secret_key, upload, status_of, URL, BUCKET, PUBLISHABLE, ROOT

def main():
    key = secret_key()
    src = os.path.join(ROOT, 'assets', 'tcf', 'toolbox', 'content.js')
    data = open(src, 'rb').read()
    path = 'toolbox/content.js'
    st, msg = upload(key, path, data, 'text/plain; charset=utf-8', 300)
    print(f'上傳 {path}（{len(data)/1e3:.0f} KB）→ HTTP {st} {msg}')
    pub = status_of(f'{URL}/storage/v1/object/public/{BUCKET}/{path}', {})
    anon = status_of(f'{URL}/storage/v1/object/authenticated/{BUCKET}/{path}', {'apikey': PUBLISHABLE, 'Authorization': 'Bearer ' + PUBLISHABLE})
    mine = status_of(f'{URL}/storage/v1/object/authenticated/{BUCKET}/{path}', {'apikey': key})
    print(f'檢查：公開網址 → HTTP {pub}（要被擋）｜只帶公開 key → HTTP {anon}（要被擋）｜本機 secret key → HTTP {mine}（要 200）')
    ok = st in (200, 201) and pub != 200 and anon != 200 and mine == 200
    print('✓ 完成' if ok else '⚠️ 有問題，看上面'); sys.exit(0 if ok else 1)

if __name__ == '__main__':
    main()
