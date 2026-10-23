#!/usr/bin/env python3
"""didier_align.py — 課本音檔 × 課本逐字稿對齊，切成 ≤ 60 秒的聽力填空段（2026-10-21）

為什麼：課本一軌是 1–3 分鐘整段對話，聽力填空要短段（Owen 10-21：「最多一分鐘」），
而且原版錄音開頭會唸報題（「Page 13, document C. Bonne nouvelle !」），要切乾淨。
Claude 聽不到聲音 → 借 WhisperKit 抓「每個字的時間點」，**內容一律以課本逐字稿為準**：
  ⛔ 辨識文字只拿來找時間，不拿來出題。Whisper 會漏段、會自己補「Sous-titrage Société Radio-Canada」
     （10-21 實測 MacWhisper 漏了開頭 25 秒、結尾多編一句）→ 對不上的段落直接不出題。

做法：
  1. whisperkit-cli（brew，10-21 安裝）＋ MacWhisper 已下載的 large-v3 模型（不另外下載），--language fr --word-timestamps
     結果快取在 assets/didier/asr/<book>/<NNN>.json（assets/didier/ 整個不入庫）
  2. 課本逐字稿拆成字（⛔ 說話人名字「François :」不會被唸出來，不算），跟辨識的字做序列比對（difflib）
     → 對上的字拿到真實時間；第一個對上的字之前＝報題，切掉
  3. 以句子為單位：一段連續對得上的區段先算要切幾等份（≤ 60 秒），在最接近等分點的句子邊界下刀，\n     換人講話的地方優先；切點＝兩個字中間空檔的中點（最多留 0.6／0.8 秒）。對不上的句子當斷點，不跨過
  4. 每段的課本字對上比例 < 0.8、或頭尾的字沒對上 → ⛔ 不出題（寧缺勿冤）

輸出：assets/didier/segments_<book>.json：[{book, track, seg, start, end, text, match}]
  text＝課本原文那一段（保留說話人標籤，前端不挖它）；start／end 秒數，前端在整軌裡只播這一段。

用法：
  python3 tools/didier_align.py b1 1-8          # B1 第 1–8 軌
  python3 tools/didier_align.py a2 all          # A2 全部能用的軌
"""
import difflib, json, os, re, subprocess, sys, unicodedata

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DID = os.path.join(ROOT, 'assets', 'didier')
MODEL = os.path.expanduser('~/Library/Application Support/MacWhisper/models/whisperkit/models/'
                           'argmaxinc/whisperkit-coreml/openai_whisper-large-v3-v20240930')
MAX_SEG, MIN_SEG, MIN_MATCH = 60.0, 20.0, 0.8
TAIL = 0.4             # 段尾在安靜處再多留的秒數（Owen 10-23）
MIN_DIP = 10.0         # 切點至少要比前後講話低這麼多 dB（有配樂時）
LOUD = -30.0          # 切點音量超過這個＝可能切在講話中間 → 不出題
LABEL = re.compile(r"^([^\n:]{1,40}?)\s?:\s?", re.M)          # 行首「說話人 :」
# 課本在逐字稿尾巴標的出處：「INA, 10/11/2020」「(Le Petit Explorer, 30/06/2020)」——錄音裡沒唸，⛔ 不進題目
SOURCE = re.compile(r'^\(?[^.!?:]{1,60},\s*(\d{1,2}/)?\d{1,2}/\d{4}\)?\.?$|^\([^)]{1,60}\d{4}\)$')
UNSPOKEN = re.compile(r"\([A-Za-zéè']{1,4}\)")
WORD = re.compile(r"[A-Za-zÀ-ÿ0-9]+(?:'[A-Za-zÀ-ÿ]+)?")


def norm(w):
    w = w.lower().replace('’', "'")
    w = unicodedata.normalize('NFD', w)
    return ''.join(c for c in w if unicodedata.category(c) != 'Mn')


def reflow(t):
    """跟前端 listen_decode.js 的 reflow() 同規則：課本欄寬硬斷行接回段落"""
    t = (t or '').replace('’', "'").replace('‘', "'").replace(' ', ' ')
    out = []
    for l in t.split('\n'):
        l = l.strip()
        if not l or SOURCE.match(l):          # 出處行（錄音裡沒唸）
            continue
        new = (not out or re.match(r"^[^\s:][^:]{0,38}\s?:", l) or re.match(r'^(Document|Dialogue|Exercice)\s*\d', l)
               or re.match(r'^[a-h]\.\s', l) or l.startswith('(') or re.match(r'^(Document|Dialogue)\s*\d', out[-1]))
        if new:
            out.append(l)
        else:
            out[-1] += ' ' + l
    return '\n'.join(out)


def asr(book, track):
    path = os.path.join(DID, 'asr', book, f'{track:03d}.json')
    if os.path.exists(path):
        return json.load(open(path))
    os.makedirs(os.path.dirname(path), exist_ok=True)
    audio = os.path.join(DID, 'm4a', book, f'{track:03d}.m4a')
    tmp = os.path.join(DID, 'asr', book, '_tmp')
    os.makedirs(tmp, exist_ok=True)
    subprocess.run(['whisperkit-cli', 'transcribe', '--model-path', MODEL, '--audio-path', audio,
                    '--language', 'fr', '--word-timestamps', '--report', '--report-path', tmp],
                   check=True, capture_output=True)
    rep = json.load(open(os.path.join(tmp, f'{track:03d}.json')))
    words = [{'w': x['word'].strip(), 's': x['start'], 'e': x['end'], 'p': x.get('probability')}
             for seg in rep['segments'] for x in seg.get('words', [])]
    json.dump(words, open(path, 'w'), ensure_ascii=False)
    for f in os.listdir(tmp):
        os.remove(os.path.join(tmp, f))
    return words


def book_tokens(text):
    """課本字串 → [(norm, start_char, end_char)]，跳過說話人標籤"""
    skip = []
    for m in LABEL.finditer(text):
        skip.append((m.start(1), m.end()))
    # ⛔ B1 逐字稿用括號標「錄音裡沒唸的字」：(ne)／(n')／(e)（R57 讀檔發現 17 處）→ 不對齊、前端也不挖
    for m in UNSPOKEN.finditer(text):
        skip.append((m.start(), m.end()))
    toks = []
    for m in WORD.finditer(text):
        if any(a <= m.start() < b for a, b in skip):
            continue
        toks.append((norm(m.group()), m.start(), m.end()))
    return toks


def asr_tokens(words):
    toks = []
    for i, w in enumerate(words):
        for m in WORD.finditer(w['w']):
            toks.append((norm(m.group()), i))
    return toks


def align(book, t):
    text = reflow(t['text'])
    bt = book_tokens(text)
    words = asr(book, t['track'])
    at = asr_tokens(words)
    sm = difflib.SequenceMatcher(None, [x[0] for x in bt], [x[0] for x in at], autojunk=False)
    tmap = {}                                   # 課本第 i 個字 → (start, end)
    for a, b, n in sm.get_matching_blocks():
        for k in range(n):
            w = words[at[b + k][1]]
            tmap[a + k] = (w['s'], w['e'])
    return text, bt, tmap


def segments(book, t):
    text, bt, tmap = align(book, t)
    if not bt or not tmap:
        return [], 0
    # 單位＝句子（句號／問號／驚嘆號／刪節號後，或換行）；記錄哪些是「換人講話／新段落」的開頭
    units, pos = [], 0
    for line in text.split('\n'):
        for m in re.finditer(r'[^.!?…]+(?:[.!?…]+[»"]?|$)', line):
            if not m.group().strip(): continue
            ca, cb = pos + m.start(), pos + m.end()
            idx = [i for i, x in enumerate(bt) if ca <= x[1] < cb]
            if idx: units.append({'a': idx[0], 'b': idx[-1] + 1, 'line': m.start() == 0})
        pos += len(line) + 1

    def t0(i):   # 第 i 個字的開始時間（往後找最近對上的，最多 3 字）
        for j in range(i, min(i + 4, len(bt))):
            if j in tmap: return tmap[j][0]
    def t1(i):   # 第 i 個字的結束時間（往前找最近對上的，最多 3 字）
        for j in range(i, max(i - 4, -1), -1):
            if j in tmap: return tmap[j][1]

    # 只有題號的「句子」（L'essentiel 的「5.」）併進下一句，⛔ 不要讓題號掛在上一段尾巴
    merged_u = []
    for u in units:
        if merged_u and merged_u[-1].get('num'):
            u = {'a': merged_u[-1]['a'], 'b': u['b'], 'line': merged_u[-1]['line']}; merged_u.pop()
        if u['b'] - u['a'] == 1 and re.fullmatch(r'\d{1,2}', bt[u['a']][0]): u['num'] = True
        merged_u.append(u)
    units = merged_u
    for u in units:
        u['s'], u['e'] = t0(u['a']), t1(u['b'] - 1)
    # 連續可用的區段（run）：頭尾都對得上時間、時間往前走；⛔ 對不上的句子當斷點，不跨過它
    runs, cur = [], []
    for u in units:
        good = u['s'] is not None and u['e'] is not None and u['e'] > u['s'] and (not cur or u['s'] >= cur[-1]['e'] - 0.3)
        if good: cur.append(u)
        else:
            if cur: runs.append(cur)
            cur = []
    if cur: runs.append(cur)

    groups = []
    for run in runs:
        D = run[-1]['e'] - run[0]['s']
        k = max(1, -(-int(D * 10) // int(MAX_SEG * 10)))          # ceil(D / 60)
        cuts = []
        for j in range(1, k):
            target = run[0]['s'] + D * j / k
            def gap_db(i):   # 第 i 句開頭跟前一句結尾之間，最安靜的那一點有多安靜
                return quietest(book, t['track'], run[i - 1]['e'] - 0.05, run[i]['s'] + 0.05)[1] or 0
            # 分數越小越好：離等分點的秒數；換人講話 −4；切點不夠安靜（> −35 dB）+40（幾乎不選）
            cand = [(abs(u['s'] - target) - (4 if u['line'] else 0) + (40 if gap_db(i) > -35 else 0), i)
                    for i, u in enumerate(run) if i > (cuts[-1] if cuts else 0)
                    and abs(u['s'] - target) < MAX_SEG / 2]
            if cand: cuts.append(min(cand)[1])
        bounds = [0] + cuts + [len(run)]
        for x, y in zip(bounds, bounds[1:]):
            if y > x: groups.append({'a': run[x]['a'], 'b': run[y - 1]['b'], 's': run[x]['s'], 'e': run[y - 1]['e']})

    out = []
    for g in groups:
        n = g['b'] - g['a']
        hit = sum(1 for i in range(g['a'], g['b']) if i in tmap) / n
        prev_e = t1(g['a'] - 1) if g['a'] > 0 else None
        next_s = t0(g['b']) if g['b'] < len(bt) else None
        start = (prev_e + g['s']) / 2 if prev_e is not None and prev_e < g['s'] else max(0, g['s'] - 0.25)
        end = (g['e'] + next_s) / 2 if next_s is not None and next_s > g['e'] else g['e'] + 0.4
        start, end = max(start, g['s'] - 0.6), min(end, g['e'] + 0.8)      # 空檔太長時不要留一大段靜音
        lo = prev_e if prev_e is not None and prev_e < g['s'] else g['s'] - 0.6
        hi = next_s if next_s is not None and next_s > g['e'] else g['e'] + 0.8
        start = quietest(book, t['track'], max(lo, g['s'] - 0.8) - 0.05, g['s'] + 0.05)[0]
        end = quietest(book, t['track'], g['e'] - 0.05, min(hi, g['e'] + 0.8) + 0.05)[0]
        # 尾巴多留一點空白（Owen 10-23：「尾巴可以再多留一點點空白」）：往後延 0.4 秒，
        # ⛔ 但只延進安靜的地方——延伸範圍內有聲音（下一句開始了）就停在那之前
        db_curve, floor = rms_curve(book, t['track'])
        quiet = max(-35.0, floor + 6)
        k0 = int(end * 100); k1 = min(len(db_curve), int((end + TAIL) * 100))
        k = k0
        while k < k1 and db_curve[k] <= quiet: k += 1
        end = max(end, k / 100 - (0.2 if k < k1 else 0)) if k > k0 else end
        ca = bt[g['a']][1]
        # 段頭：如果是一行的開頭，把說話人標籤一起帶進來（前端不挖它，但要看得到誰在講）
        lb = text.rfind('\n', 0, ca) + 1
        if not text[lb:ca].strip() or re.match(r"^[^\n:]{1,40}\s?:\s?$", text[lb:ca]): ca = lb
        cb = bt[g['b'] - 1][2]
        m2 = re.match(r'[^\w\n]*', text[cb:]); cb += len(m2.group()) if m2 else 0
        dur = end - start
        out.append({'book': book, 'track': t['track'], 'seg': len(out) + 1, 'start': round(start, 2), 'end': round(end, 2),
                    'dur': round(dur, 1), 'text': text[ca:cb].strip(), 'match': round(hit, 3),
                    'ok': hit >= MIN_MATCH and t0(g['a']) is not None and t1(g['b'] - 1) is not None and 8 <= dur <= MAX_SEG + 1})
    return out, len(tmap) / len(bt)


_PCM = {}
def rms_curve(book, track):
    """整軌 → 每 10ms 一點的音量（dB，40ms 窗）"""
    key = (book, track)
    if key in _PCM: return _PCM[key]
    import numpy as np
    audio = os.path.join(DID, 'm4a', book, f'{track:03d}.m4a')
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', audio, '-ac', '1', '-ar', '16000', '-f', 's16le', '-'],
                         capture_output=True).stdout
    x = np.frombuffer(raw, dtype=np.int16).astype(np.float32) / 32768
    hop, win = 160, 640
    n = max(1, (len(x) - win) // hop)
    fr = np.lib.stride_tricks.as_strided(x, shape=(n, win), strides=(x.strides[0] * hop, x.strides[0]))
    pw = (fr ** 2).mean(axis=1)
    # ⚠️ 平滑成 120ms 的平均功率（10-23）：講話中間 p／t／k 的閉氣只有 20–80ms 很安靜，
    #    用單點最小值會把刀放進字裡；120ms 窗只有真正的停頓才會整段安靜
    k = 12
    pw = np.convolve(pw, np.ones(k) / k, mode='same')
    db = 10 * np.log10(pw + 1e-18)
    floor = float(np.percentile(db, 10))       # 這一軌的背景音量（有配樂的訪談會比較高）
    _PCM[key] = (db, floor)
    return _PCM[key]


def quietest(book, track, lo, hi):
    """在 [lo, hi] 秒之間找最安靜的點 → (秒, dB)"""
    db, _ = rms_curve(book, track)
    a, b = max(0, int(lo * 100)), min(len(db), int(hi * 100) + 1)
    if b <= a: return lo, None
    i = a + int(db[a:b].argmin())
    return i / 100 + 0.02, float(db[i])


def cut_quality(book, track, at):
    """切點那一刻的音量（跟挑切點用同一條曲線，±50ms 取最小）與「比前後 2 秒講話低多少 dB」"""
    import numpy as np
    db, _ = rms_curve(book, track)
    i = min(len(db) - 1, max(0, int(at * 100)))
    cut = float(db[i])                         # db 已是 120ms 平滑後的曲線
    win = db[max(0, i - 200):i + 200]
    sp = win[win > -60]
    med = float(np.median(sp)) if len(sp) >= 20 else cut
    return round(cut, 1), round(med - cut, 1)


def edge_db(book, track, at):
    """切點前後 0.2 秒的平均音量（dB）。講話中通常 > -30；靜音／換氣 < -35"""
    audio = os.path.join(DID, 'm4a', book, f'{track:03d}.m4a')
    r = subprocess.run(['ffmpeg', '-hide_banner', '-ss', str(max(0, at - 0.1)), '-t', '0.2', '-i', audio,
                        '-af', 'volumedetect', '-f', 'null', '-'], capture_output=True, text=True)
    m = re.search(r'mean_volume: (-?[\d.]+) dB', r.stderr)
    return float(m.group(1)) if m else None


def usable(t):
    return t.get('text') and len(t['text']) >= 150 and not re.search(r'Phon|Vocabulaire', t.get('title') or '')


def main():
    book, rng = sys.argv[1], sys.argv[2]
    tr = json.load(open(os.path.join(DID, f'transcripts_{book}.json'), encoding='utf-8'))
    tracks = sorted(int(k) for k in tr)
    if rng != 'all':
        a, b = map(int, rng.split('-')); tracks = [n for n in tracks if a <= n <= b]
    delf_from = {'a2': 181, 'b1': 189}.get(book, 999)
    out_path = os.path.join(DID, f'segments_{book}.json')
    allsegs = json.load(open(out_path)) if os.path.exists(out_path) else []
    allsegs = [s for s in allsegs if s['track'] not in tracks]
    for n in tracks:
        t = tr[str(n)]
        if not usable(t) or (t.get('page') or 0) >= delf_from:   # DELF 模擬考整段留給「原版題」，不切填空
            continue
        segs, hit = segments(book, t)
        for s in segs:
            s['unit'], s['page'], s['title'] = t.get('unit'), t.get('page'), t.get('title')
        for sg in segs:
            (sg['db_in'], sg['dip_in']), (sg['db_out'], sg['dip_out']) = cut_quality(book, n, sg['start']), cut_quality(book, n, sg['end'])
            # 合格：切點真的安靜（≤ −35 dB），或比前後兩秒講話低 ≥ 10 dB（有配樂的訪談，但明顯是句子間的空檔）
            # ⛔ 落差不到 10 dB＝可能切在人聲裡 → 不出題（10-23 B1 後段大量電台訪談有配樂，舊的絕對門檻把 99 段擋掉）
            if sg['ok'] and not all(d <= -35 or dip >= MIN_DIP for d, dip in ((sg['db_in'], sg['dip_in']), (sg['db_out'], sg['dip_out']))):
                sg['ok'] = False; sg['why'] = '切點跟人聲的落差不夠'
        allsegs += segs
        print(f'{book} {n:3d} p.{t["page"]:<3} 全軌對上 {hit:5.1%}｜切 {len(segs)} 段，可用 {sum(1 for x in segs if x["ok"])}：' +
              ' '.join(f'{s["dur"]:.0f}s{"" if s["ok"] else "✗"}' for s in segs), flush=True)
    allsegs.sort(key=lambda s: (s['track'], s['seg']))
    json.dump(allsegs, open(out_path, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(f'→ {out_path}：可用 {sum(1 for s in allsegs if s["ok"])} 段／共 {len(allsegs)} 段')


if __name__ == '__main__':
    main()
