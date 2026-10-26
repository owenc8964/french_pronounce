#!/usr/bin/env python3
"""vault_password.py — 查「收音機／聽力解碼頁／考試之塔」那組帳號的信箱，或重設密碼（2026-10-26）

Owen：「你告訴我要怎麼從 supabase 查密碼好了」
⚠️ Supabase 只存密碼的雜湊，⛔ 誰都查不到原本的密碼（後台也看不到）——只能看信箱、或設一個新密碼。

用法（專案根目錄，⭐ Owen 自己在終端機跑；新密碼用隱藏輸入，不會顯示、不會存檔、Claude 看不到）：
  python3 tools/vault_password.py --list     # 只列出帳號信箱（不需要輸入任何密碼）
  python3 tools/vault_password.py            # 重設密碼：選帳號 → 輸入新密碼兩次

金鑰：讀 .env 的 SUPABASE_SECRET_KEY（⛔ 永不 commit、永不印出）。走 Supabase Auth 管理 API。
"""
import getpass, json, os, sys, urllib.request
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from upload_listen_supabase import URL, secret_key


def call(method, path, key, body=None):
    req = urllib.request.Request(URL + path, method=method, data=json.dumps(body).encode() if body is not None else None,
                                 headers={'apikey': key, 'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json'})
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read() or b'{}')


def main():
    key = secret_key()
    users = call('GET', '/auth/v1/admin/users', key).get('users', [])
    if not users:
        sys.exit('後台沒有任何帳號')
    for i, u in enumerate(users, 1):
        print(f'{i}. {u.get("email")}（最近一次登入：{(u.get("last_sign_in_at") or "從沒登入")[:10]}）')
    if '--list' in sys.argv:
        return
    n = 1 if len(users) == 1 else int(input('要重設哪一個？輸入編號：').strip())
    u = users[n - 1]
    p1 = getpass.getpass(f'{u["email"]} 的新密碼（輸入時不會顯示）：')
    p2 = getpass.getpass('再輸入一次：')
    if p1 != p2:
        sys.exit('兩次不一樣，沒有改')
    if len(p1) < 6:
        sys.exit('至少 6 個字元，沒有改')
    call('PUT', f'/auth/v1/admin/users/{u["id"]}', key, {'password': p1})
    print('✓ 改好了。到遊戲右上的 📻（或聽力解碼頁）用這個信箱＋新密碼接上。')


if __name__ == '__main__':
    main()
