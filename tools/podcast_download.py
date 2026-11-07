#!/usr/bin/env python3
"""podcast_download.py — 從 podcast 公開節目清單（RSS）下載最近 N 集（2026-11-07）

Owen 11-07 同意先下 Easy French、InnerFrench 各 20 集。用途：原速聽力素材（狂聽狂熟悉）。
為什麼選這兩個：research/2026-11-07_podcast難度實測對照TCF.md（認得的字≈TCF 第 11–19 題，語速比考試快）。
⛔ 個人收聽用；不轉載 → 存 assets/podcast/（gitignore），永不進公開 repo。
輸出：assets/podcast/<show>/mp3/<編號>.mp3、assets/podcast/<show>/episodes.json（title、date、mp3、file、secs、desc）
用法：python3 tools/podcast_download.py easyfrench 20
"""
import html, json, os, re, subprocess, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SHOWS = {
    'easyfrench': 'https://feeds.fireside.fm/easyfrench/rss',
    'innerfrench': 'https://podcast.innerfrench.com/feed.xml',
}

def curl(url, out=None):
    cmd = ['curl', '-sfL', '-m', '600', url] + (['-o', out] if out else [])
    r = subprocess.run(cmd, capture_output=not out)
    if r.returncode: raise RuntimeError(f'curl {r.returncode}: {url}')
    return r.stdout

def tag(it, name):
    m = re.search(rf'<{name}[^>]*>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?</{name}>', it, re.S)
    return html.unescape(m.group(1).strip()) if m else ''

def secs(d):
    if not d: return None
    p = [int(x) for x in d.split(':') if x.isdigit()]
    s = 0
    for x in p: s = s * 60 + x
    return s

def main(show, n):
    out = os.path.join(ROOT, 'assets', 'podcast', show); mp3d = os.path.join(out, 'mp3')
    os.makedirs(mp3d, exist_ok=True)
    x = curl(SHOWS[show]).decode('utf-8', 'replace')
    eps = []
    for it in re.findall(r'<item>(.*?)</item>', x, re.S):
        e = re.search(r'<enclosure[^>]*url="([^"]+)"', it)
        if not e: continue
        title = tag(it, 'title')
        num = re.match(r'\s*E?(\d+)', title)
        fid = f'{int(num.group(1)):03d}' if num else re.sub(r'\W+', '_', title)[:40]
        desc = re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', tag(it, 'description')))[:600]
        eps.append({'id': fid, 'title': title, 'date': tag(it, 'pubDate'), 'mp3': html.unescape(e.group(1)),
                    'secs': secs(tag(it, 'itunes:duration')), 'desc': desc})
        if len(eps) >= n: break
    for ep in eps:
        f = os.path.join(mp3d, ep['id'] + '.mp3'); ep['file'] = os.path.relpath(f, out)
        if os.path.exists(f) and os.path.getsize(f) > 100000: continue
        curl(ep['mp3'], f)
        print(show, ep['id'], round(os.path.getsize(f) / 1e6, 1), 'MB', ep['title'][:60], flush=True)
    json.dump(eps, open(os.path.join(out, 'episodes.json'), 'w'), ensure_ascii=False, indent=1)
    print(show, len(eps), 'episodes')

if __name__ == '__main__':
    main(sys.argv[1], int(sys.argv[2]) if len(sys.argv) > 2 else 20)
