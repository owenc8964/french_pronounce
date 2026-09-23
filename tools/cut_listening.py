#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""cut_listening.py — 把 TCF 聽力的整套 mp3 切成一題一段（2026-09-23）

為什麼做得到：TCF 聽力的**題間停頓是固定的約 5.6 秒**，結構規則到
`silencedetect` 的門檻取 4.0／4.5／5.0 都給同樣的切點數。
⭐ 09-23 驗過 co_test1：切出 39 段 ←→ 39 題完全吻合，
   且「音檔段長 vs 逐字稿字數」相關係數 r = 0.90（對齊錯位會接近 0）。
→ ⛔ HANDOFF 舊判斷「這是聽力進遊戲最花工的一步」不成立。

⛔ 版權：TCF 考題音檔是 Owen 買的教材，**永遠不進公開 repo**。
   輸出目錄 audio/listen_seg/ 已在 .gitignore；成品只放他自己的
   Supabase 私人空間（登入才聽得到），跟 reading 的圖片同一套做法。

跑法：
  python3 tools/cut_listening.py --test 1            # 切第 1 套，順便驗對齊
  python3 tools/cut_listening.py --test 1 --dry-run  # 只驗不切
  python3 tools/cut_listening.py --all               # 全部 44 套
"""
import argparse, json, os, re, statistics, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
JSON = os.path.join(ROOT, 'assets/tcf/exam/listening.json')
AUDIO = os.path.join(ROOT, 'assets/tcf/exam/audio')
OUT = os.path.join(ROOT, 'audio/listen_seg')
SIL_DB, SIL_D, MIN_SEG = '-38dB', 4.5, 1.0


def seg_times(path):
    """靠靜音切出每一題的起訖秒數"""
    r = subprocess.run(['ffmpeg', '-hide_banner', '-nostats', '-i', path,
                        '-af', f'silencedetect=noise={SIL_DB}:d={SIL_D}', '-f', 'null', '-'],
                       capture_output=True, text=True).stderr
    starts = [float(x) for x in re.findall(r'silence_start: ([0-9.]+)', r)]
    ends = [float(x) for x in re.findall(r'silence_end: ([0-9.]+)', r)]
    dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration',
                                '-of', 'csv=p=0', path], capture_output=True, text=True).stdout.strip())
    segs = []
    for i, e in enumerate(ends):
        s = starts[i + 1] if i + 1 < len(starts) else dur
        if s - e > MIN_SEG:
            segs.append((e, s))
    return segs


def corr(x, y):
    if len(x) < 3: return 0.0
    mx, my = statistics.mean(x), statistics.mean(y)
    num = sum((a - mx) * (b - my) for a, b in zip(x, y))
    den = (sum((a - mx) ** 2 for a in x) * sum((b - my) ** 2 for b in y)) ** .5
    return num / den if den else 0.0


def do_test(t, dry):
    tid = t['test']
    src = os.path.join(AUDIO, f'co_test{tid}.mp3')
    if not os.path.exists(src):
        print(f'  ⚠️ 找不到音檔 {src}'); return None
    qs = t['questions']
    segs = seg_times(src)
    n = min(len(segs), len(qs))
    r = corr([segs[i][1] - segs[i][0] for i in range(n)],
             [len(qs[i].get('script_fr', '')) for i in range(n)])
    ok = len(segs) == len(qs)
    flag = '✅' if ok and r >= 0.7 else '⚠️'
    print(f'  {flag} test {tid}：{len(segs)} 段 / {len(qs)} 題　對齊 r={r:.2f}')
    if dry or not ok or r < 0.7:
        if not dry: print(f'     ⛔ 跳過（段數對不上或對齊太差，⚠️ 這套要人工看）')
        return None
    d = os.path.join(OUT, f't{tid}')
    os.makedirs(d, exist_ok=True)
    items = []
    for i, q in enumerate(qs):
        a, b = segs[i]
        name = f'{q["q"]:02d}.mp3'
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(a), '-to', str(b), '-i', src,
                        '-ac', '1', '-c:a', 'libmp3lame', '-q:a', '5', os.path.join(d, name)], check=True)
        items.append({'q': q['q'], 'f': f't{tid}/{name}', 'sec': round(b - a, 1),
                      'script': q.get('script_fr', ''), 'zh': q.get('script_zh', '')})
    return {'test': tid, 'n': len(items), 'r': round(r, 3), 'items': items}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--test', help='只做某一套（例如 1）')
    ap.add_argument('--all', action='store_true')
    ap.add_argument('--dry-run', action='store_true')
    a = ap.parse_args()
    d = json.load(open(JSON, encoding='utf-8'))
    tests = d['tests'] if a.all else [t for t in d['tests'] if str(t['test']) == str(a.test)]
    if not tests:
        print('要 --test <編號> 或 --all'); sys.exit(1)
    os.makedirs(OUT, exist_ok=True)
    out = []
    for t in tests:
        r = do_test(t, a.dry_run)
        if r: out.append(r)
    if out and not a.dry_run:
        idx = os.path.join(OUT, 'index.json')
        old = {}
        if os.path.exists(idx):
            old = {x['test']: x for x in json.load(open(idx, encoding='utf-8')).get('tests', [])}
        for r in out: old[r['test']] = r
        json.dump({'v': 1, 'tests': list(old.values())}, open(idx, 'w', encoding='utf-8'),
                  ensure_ascii=False)
        total = sum(len(x['items']) for x in old.values())
        mb = sum(os.path.getsize(os.path.join(OUT, i['f']))
                 for x in old.values() for i in x['items']) / 1024 / 1024
        print(f'\n✅ index.json：{len(old)} 套、{total} 題、{mb:.1f} MB')


if __name__ == '__main__':
    main()
