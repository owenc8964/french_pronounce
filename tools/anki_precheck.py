#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""匯入 Anki 前的守門員（2026-08-19 建立，因為踩過一次）。

用法：  python3 tools/anki_precheck.py ~/Desktop/某個檔.tsv [更多檔...]

會擋下三種會造成資料損失或畫面壞掉的情況：
  1. ⛔ 撞號但內容不同 —— 同一個 ExternalID 在收藏檔裡已經是「別張卡」，
     匯下去會直接覆蓋掉原本那張（2026-08-19 就是這樣弄丟 3 張）。
  2. ⛔ 檔案裡含 HTML 標籤 —— 匯入沒勾「允許 HTML」時會在卡片正面印出裸露的 <b>。
     慣例是一律用全形括號，見 ANKI_SETUP.md「強調的寫法」。
  3. ⛔ 欄位數不是 24 —— 欄位會整排位移。

⚠️ 只讀收藏檔的複本，不會動到 Anki 的任何資料。
"""
import sys, os, io, re, shutil, sqlite3, tempfile, html

COL = os.path.expanduser('~/Library/Application Support/Anki2/使用者 1/collection.anki2')
NFIELDS = 24

def load_collection():
    if not os.path.exists(COL):
        print('⚠️  找不到收藏檔，只做檔案本身的檢查：', COL)
        return {}
    # ⚠️ Anki 開著的時候，最新的變更還在 collection.anki2-wal 裡，
    #    只複製主檔會讀到舊資料（2026-08-19 踩過：匯完卻查到沒進去）。
    d = tempfile.mkdtemp()
    tmp = os.path.join(d, 'collection.anki2')
    shutil.copy(COL, tmp)
    for ext in ('-wal', '-shm'):
        if os.path.exists(COL + ext):
            shutil.copy(COL + ext, tmp + ext)
    con = sqlite3.connect(tmp)
    out = {}
    for (flds,) in con.execute('select flds from notes'):
        f = [html.unescape(x) for x in flds.split('\x1f')]
        out[f[0]] = f
    con.close()
    return out

def norm(s):
    return re.sub(r'\s+', ' ', s).strip()

def check(path, db):
    print('\n══════ ' + path)
    rows = []
    for i, line in enumerate(io.open(path, encoding='utf-8'), 1):
        line = line.rstrip('\n')
        if line.strip():
            rows.append((i, line.split('\t')))

    problems = 0

    bad_cols = [(i, len(f)) for i, f in rows if len(f) != NFIELDS]
    if bad_cols:
        problems += len(bad_cols)
        print(f'  ⛔ 欄位數不是 {NFIELDS} 的行：', bad_cols[:5])

    tagged = [(i, f[0]) for i, f in rows if re.search(r'<[a-zA-Z/][^>]*>', '\t'.join(f))]
    if tagged:
        problems += len(tagged)
        print('  ⛔ 含 HTML 標籤的行：', [t[1] for t in tagged[:5]],
              '…' if len(tagged) > 5 else '')

    new, upd, clash = [], [], []
    for i, f in rows:
        key = f[0]
        if key not in db:
            new.append(key)
        elif norm(db[key][1]) == norm(f[1]):
            upd.append(key)
        else:
            clash.append((key, db[key][1], f[1]))

    print(f'  新卡 {len(new)}｜純更新 {len(upd)}｜⛔ 撞號但內容不同 {len(clash)}')
    for key, old, newv in clash:
        problems += 1
        print(f'     {key}\n        收藏檔現在是：{old[:56]}\n        這個檔想寫入：{newv[:56]}')

    if problems == 0:
        print('  ✅ 可以匯入')
    else:
        print(f'  ❌ 有 {problems} 個問題，先修再匯')
    return problems

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(__doc__); sys.exit(2)
    db = load_collection()
    print(f'收藏檔目前 {len(db)} 張 note')
    total = sum(check(p, db) for p in sys.argv[1:])
    sys.exit(1 if total else 0)
