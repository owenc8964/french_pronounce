#!/usr/bin/env python3
"""rfi_download.py — 下載 RFI《Journal en français facile》最近 N 集：音檔＋原文（2026-11-07）

Owen 11-07 同意先下 30 集。用途：小鎮聽力的「新聲音」來源（每天一集、約 10 分鐘、附完整原文）。
⛔ 授權：RFI 條款允許個人下載到自己的裝置；⛔ 不轉載 → 存 assets/rfi/（gitignore），上傳私人空間 rfi/，永不進公開 repo。
輸出：assets/rfi/mp3/YYYYMMDD.mp3、assets/rfi/episodes.json（date、title、url、paras[]）
用法：python3 tools/rfi_download.py 30 [--upload]
"""
import html, json, os, re, sys, time, urllib.request, urllib.parse
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'assets', 'rfi'); MP3 = os.path.join(OUT, 'mp3')
BASE = 'https://francaisfacile.rfi.fr/fr/podcasts/journal-en-fran%C3%A7ais-facile/'

def get(url):
    # 用系統 curl 讀（Python 預設的請求被站方回 403；curl 用它自己的身分，不偽裝瀏覽器）
    import subprocess
    r = subprocess.run(['curl', '-sfL', '-m', '120', url], capture_output=True)
    if r.returncode: raise RuntimeError(f'curl {r.returncode}: {url}')
    return r.stdout

def episodes(n):
    seen = {}
    for p in range(1, 8):
        s = get(BASE + ('' if p == 1 else f'{p}/')).decode('utf-8')
        for m in re.findall(r'journal-en-fran%C3%A7ais-facile/(20\d{6})-([^"#?\s]+)', s):
            seen.setdefault(m[0], BASE + m[0] + '-' + m[1])
        if len(seen) >= n: break
        time.sleep(1)
    return sorted(seen.items(), reverse=True)[:n]

def parse(s):
    title = html.unescape(re.search(r'<title>(.*?)</title>', s, re.S).group(1)).split(' - Journal')[0].strip()
    mp3 = re.search(r'https://aod-fle\.akamaized\.net/[^"\'\s]+?\.mp3', s).group(0)
    i = s.find('m-transcription__content'); seg = s[i:]
    j = seg.find('m-transcription__load-pdf'); seg = seg[:j] if j > 0 else seg[:80000]
    paras = [re.sub(r'\s+', ' ', html.unescape(re.sub('<[^>]+>', '', p))).strip() for p in re.findall(r'<p[^>]*>(.*?)</p>', seg, re.S)]
    paras = [p for p in paras if p]
    k = next((i for i, p in enumerate(paras) if p.startswith('Poursuivez votre lecture')), None)
    return title, mp3, paras[:k] if k is not None else paras

def main(n, up):
    os.makedirs(MP3, exist_ok=True)
    path = os.path.join(OUT, 'episodes.json')
    have = {e['date']: e for e in json.load(open(path, encoding='utf-8'))} if os.path.exists(path) else {}
    for date, url in episodes(n):
        f = os.path.join(MP3, date + '.mp3')
        if date in have and os.path.exists(f): continue
        title, mp3, paras = parse(get(url).decode('utf-8'))
        if not os.path.exists(f): open(f, 'wb').write(get(mp3))
        have[date] = {'date': date, 'title': title, 'url': urllib.parse.unquote(url), 'mp3': mp3, 'paras': paras}
        print(date, f'{os.path.getsize(f)/1e6:.1f}MB', len(paras), '段', title[:60]); time.sleep(1)
    eps = sorted(have.values(), key=lambda e: e['date'], reverse=True)
    json.dump(eps, open(path, 'w', encoding='utf-8'), ensure_ascii=False)
    print('共', len(eps), '集')
    if up:
        sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
        from upload_listen_supabase import upload, secret_key
        k = secret_key()
        for e in eps:
            print(e['date'], upload(k, f"rfi/{e['date']}.mp3", open(os.path.join(MP3, e['date'] + '.mp3'), 'rb').read(), 'audio/mpeg', 31536000))
        print('episodes', upload(k, 'rfi/episodes.json', json.dumps([{x: e[x] for x in ('date', 'title', 'url', 'paras')} for e in eps], ensure_ascii=False).encode('utf-8'), 'application/json', 60))

if __name__ == '__main__':
    main(int(sys.argv[1]), '--upload' in sys.argv)
