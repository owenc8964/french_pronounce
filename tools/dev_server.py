#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""會回應 Range 的靜態檔伺服器。python -m http.server 不支援 Range，
33 分鐘的聽力 mp3 在它上面「拖動進度條」是壞的（seek 落不了地、緩衝還會整個丟掉），
mock.html 的「模擬考模式不准倒帶」因此在本機根本測不出來。GitHub Pages 支援 Range，沒這問題。

跑法：python3 tools/dev_server.py [port]   （預設 7788，等同 .claude/launch.json 的 french-app）"""
import http.server, json, os, re, socketserver, sys, threading, time

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

class RangeHandler(http.server.SimpleHTTPRequestHandler):
    # 課本 m4a：系統預設會猜成 audio/mp4a-latm，iPad Safari 不一定認（11-10 課本聽力頁）
    extensions_map = {**http.server.SimpleHTTPRequestHandler.extensions_map, '.m4a': 'audio/mp4'}

    def __init__(self, *a, **kw):
        super().__init__(*a, directory=ROOT, **kw)

    def send_head(self):
        rng = self.headers.get('Range')
        if not rng:
            return super().send_head()
        m = re.match(r'bytes=(\d*)-(\d*)$', rng.strip())
        path = self.translate_path(self.path)
        if not m or not os.path.isfile(path):
            return super().send_head()

        size = os.path.getsize(path)
        start, end = m.group(1), m.group(2)
        if start == '':                       # bytes=-N → 最後 N 個位元組
            start, end = max(0, size - int(end)), size - 1
        else:
            start = int(start)
            end = int(end) if end else size - 1
        end = min(end, size - 1)
        if start > end or start >= size:
            self.send_response(416)
            self.send_header('Content-Range', 'bytes */%d' % size)
            self.end_headers()
            return None

        f = open(path, 'rb')
        f.seek(start)
        self.send_response(206)
        self.send_header('Content-type', self.guess_type(path))
        self.send_header('Content-Range', 'bytes %d-%d/%d' % (start, end, size))
        self.send_header('Content-Length', str(end - start + 1))
        self.send_header('Accept-Ranges', 'bytes')
        self.end_headers()
        return _Slice(f, end - start + 1)

    def end_headers(self):
        self.send_header('Accept-Ranges', 'bytes')
        self.send_header('Cache-Control', 'no-store')   # 改完 .js 直接 reload 就看得到新版
        super().end_headers()

    def log_message(self, *a):
        pass

class _Slice:
    """只讓 copyfile 讀走這段範圍就好。"""
    def __init__(self, f, n): self.f, self.left = f, n
    def read(self, n=-1):
        if self.left <= 0: return b''
        if n < 0 or n > self.left: n = self.left
        b = self.f.read(n); self.left -= len(b); return b
    def close(self): self.f.close()

CUE_FILE = os.path.join(ROOT, 'assets/tcf/exam/cues_manual.json')
CUE_LOCK = threading.Lock()


def do_POST(self):
    """mock.html 的手動分割點。只收這一條路徑；要求 JSON 標頭，其他網站的頁面就送不進來。
    檔案在 assets/tcf/exam/（gitignore），不進公開 repo。"""
    if self.path == '/api/mock-report':
        return mock_report(self)
    if self.path == '/api/vocab':
        return vocab_log(self)
    if self.path != '/api/mock-cue' or 'application/json' not in (self.headers.get('Content-Type') or ''):
        return self.send_error(404)
    try:
        n = int(self.headers.get('Content-Length') or 0)
        if not 0 < n < 500:
            raise ValueError
        d = json.loads(self.rfile.read(n))
        test, q, t = d['test'], d['q'], d.get('t')
        if not re.fullmatch(r'co_\d+s?', test) or not (isinstance(q, int) and 1 <= q <= 39):
            raise ValueError
        if t is not None and not (isinstance(t, (int, float)) and 0 <= t < 4000):
            raise ValueError
    except (ValueError, KeyError, TypeError):
        return self.send_error(400)
    with CUE_LOCK:
        try:
            all_ = json.load(open(CUE_FILE, encoding='utf-8'))
        except (OSError, ValueError):
            all_ = {}
        row = all_.setdefault(test, {})
        if t is None:
            row.pop(str(q), None)
        else:
            row[str(q)] = {'t': round(t, 2), 'at': int(time.time())}
        tmp = CUE_FILE + '.tmp'
        json.dump(all_, open(tmp, 'w', encoding='utf-8'), separators=(',', ':'))
        os.replace(tmp, CUE_FILE)
    self.send_response(204)
    self.end_headers()


REPORT_FILE = os.path.join(ROOT, 'assets/tcf/exam/reports.json')


def mock_report(self):
    """mock.html 的 🚩 回報：一題一筆，存在 assets/tcf/exam/（gitignore），下個 session 讀這個檔處理。"""
    if 'application/json' not in (self.headers.get('Content-Type') or ''):
        return self.send_error(404)
    try:
        n = int(self.headers.get('Content-Length') or 0)
        if not 0 < n < 4000:
            raise ValueError
        d = json.loads(self.rfile.read(n))
        test, q, note = d['test'], d['q'], d['note']
        if not re.fullmatch(r'c[oe]_\d+s?', test) or not (isinstance(q, int) and 1 <= q <= 39):
            raise ValueError
        if not (isinstance(note, str) and 0 < len(note) <= 1000):
            raise ValueError
        t = d.get('t')
        if t is not None and not isinstance(t, (int, float)):
            raise ValueError
    except (ValueError, KeyError, TypeError):
        return self.send_error(400)
    with CUE_LOCK:
        try:
            all_ = json.load(open(REPORT_FILE, encoding='utf-8'))
        except (OSError, ValueError):
            all_ = []
        all_.append({'test': test, 'q': q, 'note': note, 't': t, 'at': int(time.time())})
        tmp = REPORT_FILE + '.tmp'
        json.dump(all_, open(tmp, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
        os.replace(tmp, REPORT_FILE)
    self.send_response(204)
    self.end_headers()


# ── 單字庫（11-12，規格 PRD_vocab_bank.md）──────────────────────────────
# 模考查字一次一筆 → log.json（只增）→ 重算 vocab.json → 背景上傳私人空間 tcf/vocab.json 給小鎮讀
# ⛔ 原句是考題內容：只放 assets/tcf/（gitignore）和私人空間
VOCAB_DIR = os.path.join(ROOT, 'assets/tcf/exam/vocab')
VOCAB_LOG = os.path.join(VOCAB_DIR, 'log.json')
VOCAB_OUT = os.path.join(VOCAB_DIR, 'vocab.json')
VOCAB_PHZ = os.path.join(VOCAB_DIR, 'phrase_zh.json')     # 📎 11-13 自己圈的片語，中文之後補在這（{key: 中文}，Claude 或 Owen）
_vocab_timer = None


def vocab_cat(pos, f, w, lemma):
    """卡在哪一類（統計用）"""
    if pos == 'PHR':
        return '片語'
    if pos in ('VERB', 'AUX'):
        return '動詞變化' if f and f not in ('Inf',) and w.lower() != lemma.lower() else '動詞'
    if pos in ('NOUN', 'ADJ', 'ADV', 'PROPN', 'INTJ', 'NUM'):
        return '生字'
    return '小字'


def vocab_build():
    try:
        log = json.load(open(VOCAB_LOG, encoding='utf-8'))
    except (OSError, ValueError):
        log = []
    try:
        phz = json.load(open(VOCAB_PHZ, encoding='utf-8'))
    except (OSError, ValueError):
        phz = {}
    V = {}
    for r in log:
        key = (r.get('lemma') or r['w']).lower() + '|' + r.get('pos', '')
        v = V.setdefault(key, {'key': key, 'lemma': r.get('lemma') or r['w'], 'pos': r.get('pos', ''), 'zh': '', 'forms': [],
                               'n_look': 0, 'tests': [], 'star': False, 'star_ts': 0, 'bank': 'rec', 'ex': [], 'cats': {}, 'first': r['ts'], 'last': 0})
        if r.get('zh'): v['zh'] = r['zh']
        if r.get('ph'): v['ph'] = r['ph']                 # 📎 片語：auto＝系統認的、mine＝自己圈的
        if 'star' in r:                                   # ⭐ 按／取消：以最後一次為準
            v['star'] = bool(r['star']); v['star_ts'] = r['ts']
            continue
        v['n_look'] += 1; v['last'] = max(v['last'], r['ts'])
        if r['w'] not in v['forms']: v['forms'].append(r['w'])
        src = r['test'] + '#' + str(r['q'])
        if src not in v['tests']: v['tests'].append(src)
        c = vocab_cat(v['pos'], r.get('f', ''), r['w'], v['lemma']); v['cats'][c] = v['cats'].get(c, 0) + 1
        if r.get('sent') and not any(e['fr'] == r['sent'] for e in v['ex']) and len(v['ex']) < 5:
            v['ex'].append({'fr': r['sent'], 'w': r['w'], 'test': r['test'], 'q': r['q'], 'skill': r.get('skill', ''), 'res': r.get('res', '')})
    out = sorted(V.values(), key=lambda v: (-len(v['tests']), -v['n_look']))
    for v in out:
        v['cat'] = max(v['cats'], key=v['cats'].get) if v['cats'] else ('片語' if v['pos'] == 'PHR' else '生字')
        if phz.get(v['key']): v['zh'] = phz[v['key']]     # 補寫的中文優先
    tmp = VOCAB_OUT + '.tmp'
    json.dump({'v': 1, 'at': int(time.time() * 1000), 'words': out}, open(tmp, 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
    os.replace(tmp, VOCAB_OUT)


def vocab_upload():
    """背景上傳；失敗就算了，下一筆進來會再傳（log 永遠在本機）"""
    try:
        sys.path.insert(0, os.path.join(ROOT, 'tools'))
        from upload_listen_supabase import upload, secret_key
        upload(secret_key(), 'tcf/vocab.json', open(VOCAB_OUT, 'rb').read(), 'application/json', 60)
    except BaseException as e:                            # secret_key() 找不到會 sys.exit
        print('vocab 上傳失敗', e, file=sys.stderr)


def vocab_log(self):
    global _vocab_timer
    if 'application/json' not in (self.headers.get('Content-Type') or ''):
        return self.send_error(404)
    try:
        n = int(self.headers.get('Content-Length') or 0)
        if not 0 < n < 20000:
            raise ValueError
        d = json.loads(self.rfile.read(n))
        rows = d['rows'] if isinstance(d, dict) and 'rows' in d else [d]
        clean = []
        for r in rows[:200]:
            w, test, q = r['w'], r['test'], r['q']
            lim_w = 120 if r.get('pos') == 'PHR' else 60     # 片語最多 10 個字
            if not (isinstance(w, str) and 0 < len(w) <= lim_w and re.fullmatch(r'c[oe]_\d+s?', test) and isinstance(q, int) and 1 <= q <= 39):
                raise ValueError
            c = {'ts': int(r.get('ts') or time.time() * 1000), 'w': w, 'test': test, 'q': q}
            for k, lim in (('lemma', lim_w), ('pos', 8), ('f', 40), ('zh', 80), ('skill', 12), ('res', 6), ('sent', 400)):
                if isinstance(r.get(k), str): c[k] = r[k][:lim]
            if r.get('ph') in ('auto', 'mine'): c['ph'] = r['ph']
            if isinstance(r.get('star'), bool): c['star'] = r['star']
            clean.append(c)
    except (ValueError, KeyError, TypeError):
        return self.send_error(400)
    with CUE_LOCK:
        os.makedirs(VOCAB_DIR, exist_ok=True)
        try:
            log = json.load(open(VOCAB_LOG, encoding='utf-8'))
        except (OSError, ValueError):
            log = []
        log.extend(clean)
        tmp = VOCAB_LOG + '.tmp'
        json.dump(log, open(tmp, 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
        os.replace(tmp, VOCAB_LOG)
        vocab_build()
        if _vocab_timer: _vocab_timer.cancel()               # 連續查字只傳最後一次（10 秒內）
        _vocab_timer = threading.Timer(10, vocab_upload); _vocab_timer.daemon = True; _vocab_timer.start()
    self.send_response(204)
    self.end_headers()


RangeHandler.do_POST = do_POST


class Server(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 7788
    # 第二個參數：要聽哪些位址（逗號分隔），預設只給本機。
    # iPad 走 Tailscale：python3 tools/dev_server.py 7788 127.0.0.1,100.83.72.21
    # ⛔ 不要用 0.0.0.0：那會開放給同一個 Wi-Fi 上的所有人，題目與音檔不該外流
    hosts = (sys.argv[2] if len(sys.argv) > 2 else '127.0.0.1').split(',')
    servers = [Server((h, port), RangeHandler) for h in hosts]
    for h in hosts:
        print('serving %s on http://%s:%d （支援 Range）' % (ROOT, h, port))
    for srv in servers[1:]:
        threading.Thread(target=srv.serve_forever, daemon=True).start()
    servers[0].serve_forever()
