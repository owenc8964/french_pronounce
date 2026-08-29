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
  4. ⚠️ 法文句子在 repo 裡查無出處 —— 提醒而已，不擋。
     CLAUDE.md 內容鐵律：教材的法文必須出自筆記／課本，Claude 不可以自創。
     （2026-08-29 產第27/28課那批時，32 張裡有 10 張是我改寫或截短過的，
       就是這個檢查抓出來的。）

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

    # ⛔ 題幹必須唯一決定答案（2026-08-17 Owen 指出的設計錯誤：題幹是情境氛圍、
    #    答案卻是一個特定句子，中間的推理只存在 Claude 腦裡，他無法自我評分）
    # 判準不是「開頭是哪個動詞」——「說你五年前在台北定居下來」其實是中翻法，
    # 題幹唯一決定答案，不該擋。真正的問題是題幹沒有指定要哪一句：
    #   ⛔「講你小時候每天早上做的一件事」→ 答案可以有一百種
    #   ✅「說你五年前在台北定居下來」    → 只有一句
    OPEN_START = ('解釋', '描述', '談談', '聊聊')          # 本質上就是開放的
    OPEN_MARK = ('一件', '一個例子', '舉一個', '舉例', '任何', '你想到的', '隨便')
    def is_open(q):
        q = q.strip()
        return q.startswith(OPEN_START) or any(m in q for m in OPEN_MARK)
    open_prompts = [(i, f[0]) for i, f in rows if len(f) > 12 and is_open(f[12])]
    if open_prompts:
        problems += len(open_prompts)
        print('  ⛔ 題幹是開放式的（唯一決定不了答案）：', [p[1] for p in open_prompts[:5]])

    empty = [f[0] for _, f in rows if len(f) > 13 and (not f[12].strip() or not f[13].strip())]
    if empty:
        problems += len(empty)
        print('  ⛔ 題幹或答案是空的：', empty[:5])

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

_CORPUS = None
def corpus():
    """repo 裡所有『合法法文來源』串成一鍋，用來比對卡片的法文是不是抄來的。
    ⚠️ transcripts/ 是課堂逐字稿，gitignore 不進 repo——**本機有才吃得到**。
       所以舊的幾批（從逐字稿挖回鍋字）在別台機器上會查無出處，這是預期內的，
       因此這一項只是提醒不是錯誤。"""
    global _CORPUS
    if _CORPUS is None:
        root = os.path.join(os.path.dirname(__file__), '..')
        paths = ['french_notes.html', 'sentences.js', 'chunks.js', 'questions.js',
                 'scenes.js', 'assets/.textbook_cache.txt']
        tdir = os.path.join(root, 'transcripts')
        if os.path.isdir(tdir):
            paths += [os.path.join('transcripts', f) for f in sorted(os.listdir(tdir))]
        buf = []
        for rel in paths:
            try:
                buf.append(io.open(os.path.join(root, rel), encoding='utf-8', errors='replace').read())
            except Exception:
                pass
        _CORPUS = _fold('\n'.join(buf))
    return _CORPUS

def _fold(s):
    s = s.replace('\u2019', "'").replace('&#x27;', "'").replace("\\'", "'")
    s = re.sub(r'<[^>]+>', ' ', s)
    return re.sub(r'[\s\u00a0]+', ' ', s).strip()

def check_sources(path):
    """⚠️ 提醒：卡片上的法文有沒有出處。Sentence 一律查；
    句子卡（fr::task::produire）的答案本身就是一句法文，也要查。"""
    corp = corpus()
    miss = []
    for line in io.open(path, encoding='utf-8'):
        f = line.rstrip('\n').split('\t')
        if len(f) < 24: continue
        for col in (1, 13):
            if col == 13 and 'task::produire' not in f[23]: continue
            t = _fold(f[col])
            if t and t not in corp:
                miss.append((f[0], t[:56])); break
    if miss:
        print(f'  ⚠️ 有 {len(miss)} 句法文在 repo 裡查無出處（自創？改寫？截短？）：')
        for k, t in miss[:6]:
            print(f'     {k}  {t}')
        if len(miss) > 6: print(f'     …其餘 {len(miss)-6} 句')
    else:
        print('  ✅ 每一句法文都在 repo 裡找得到出處')
    return miss

def check_ownership(paths):
    """⛔ 一個 ExternalID 只能被一個檔案擁有。
    要修一張舊卡就改「原本那個檔案」裡的那一列，不要另開修復檔——
    兩個檔案同時定義一個 ID，就是 2026-08-19 弄丟 3 張卡的那個結構。"""
    own = {}
    for path in paths:
        for line in io.open(path, encoding='utf-8'):
            key = line.split('\t')[0].strip()
            if key:
                own.setdefault(key, []).append(os.path.basename(path))
    dup = {k: v for k, v in own.items() if len(set(v)) > 1}
    if dup:
        print('\n⛔ 同一個 ID 被多個檔案定義（一個 ID 只能有一個擁有者）：')
        for k, v in list(dup.items())[:10]:
            print(f'     {k} ← {", ".join(sorted(set(v)))}')
        return len(dup)
    if len(paths) > 1:
        print(f'\n✅ {len(paths)} 個檔案共 {len(own)} 個 ID，沒有重疊')
    return 0

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(__doc__); sys.exit(2)
    db = load_collection()
    print(f'收藏檔目前 {len(db)} 張 note')
    paths = sys.argv[1:]
    total = 0
    for p in paths:
        total += check(p, db)
        check_sources(p)          # ⚠️ 只提醒，不計入 total
    total += check_ownership(paths)
    sys.exit(1 if total else 0)
