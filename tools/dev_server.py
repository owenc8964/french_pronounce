#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""會回應 Range 的靜態檔伺服器。python -m http.server 不支援 Range，
33 分鐘的聽力 mp3 在它上面「拖動進度條」是壞的（seek 落不了地、緩衝還會整個丟掉），
mock.html 的「模擬考模式不准倒帶」因此在本機根本測不出來。GitHub Pages 支援 Range，沒這問題。

跑法：python3 tools/dev_server.py [port]   （預設 7788，等同 .claude/launch.json 的 french-app）"""
import http.server, os, re, socketserver, sys, threading

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

class RangeHandler(http.server.SimpleHTTPRequestHandler):
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
