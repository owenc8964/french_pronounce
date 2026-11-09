#!/usr/bin/env python3
"""upload_t3_listen.py — 把「廣播問答」的題目傳到 Supabase 私人空間 t3q/topics.json（2026-11-09）

題目來自備考資料，⛔ 不進公開 repo：來源檔 assets/tcf/pack3/_analyse/T3_listen.json（已被 gitignore）。
金鑰：讀專案根目錄 .env 的 SUPABASE_SECRET_KEY（⛔ 永不 commit、永不印出）。

用法（專案根目錄）：python3 tools/upload_t3_listen.py
"""
import json, os, sys, urllib.error, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'assets', 'tcf', 'pack3', '_analyse', 'T3_listen.json')
URL = 'https://hgkqyrglftljxaieberm.supabase.co/storage/v1/object/TCF/t3q/topics.json'


def secret_key():
    for line in open(os.path.join(ROOT, '.env'), encoding='utf-8'):
        if line.startswith('SUPABASE_SECRET_KEY='):
            return line.split('=', 1)[1].strip()
    sys.exit('.env 裡沒有 SUPABASE_SECRET_KEY')


data = open(SRC, 'rb').read()
n = len(json.loads(data)['items'])
req = urllib.request.Request(URL, data=data, method='POST', headers={
    'apikey': secret_key(), 'Content-Type': 'application/json', 'x-upsert': 'true', 'cache-control': '300'})
try:
    with urllib.request.urlopen(req, timeout=60) as r:
        print('上傳完成', r.status, n, '題')
except urllib.error.HTTPError as e:
    sys.exit('上傳失敗 %s' % e.code)
