#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""gen_voice_audio.py — 把全站「會發音的法文」預先錄成音檔（2026-09-22）

為什麼有這支：Owen 的 iPhone 上，網頁語音 API 只給 `Amélie super-compact`／`Thomas compact`
（iOS 最低音質；Apple 論壇證實網頁拿不到另外下載的高音質聲音）→ 改成 Mac 高音質聲音預錄。

⛔ 授權（research/2026-09-21_預錄語音音檔的授權.md）：macOS 系統聲音只准「個人、非商業」，
   ⛔ 音檔永遠不進公開 repo。輸出資料夾 `audio/voice/` 已在 .gitignore；
   成品只放 Owen 自己的 Supabase 私人空間（tools/upload_voice_supabase.py）。

做的事：
  1. 從資料檔抽出要發音的法文：sentences.js（句庫）／listening.html（沒真人音檔的短文）／chunks.js（複習卡）
  2. 每一條先做「跟遊戲朗讀時一樣的文字清理」，得到 key 文字；同樣的文字只錄一次
  3. `say` 錄成 AIFF → ffmpeg 轉單聲道 AAC → audio/voice/<key>.m4a
     （key＝清理後文字 sha1 的前 12 碼，純 ASCII，Supabase 物件路徑不會出問題）
  4. 產 audio/voice/index.json（上傳用，網站讀它：清理後文字 → key）
     與 audio/voice/.manifest.json（本機用，記每檔的設定雜湊，文字／聲音／語速沒變就跳過）

⚠️ 網站端查表用的「清理」必須跟這裡 `voice_key()` 完全一樣，見下面 JS 對照。

跑法（都在專案根目錄）：
  python3 tools/gen_voice_audio.py --list                 # 列出這台 Mac 的法文聲音（先確認有沒有 Premium／Enhanced）
  python3 tools/gen_voice_audio.py --dry-run              # 只算條數／字數／預估容量，不錄音
  python3 tools/gen_voice_audio.py --only 5               # ⭐ 先平均抽 5 句試聽（afplay audio/voice/xxx.m4a）
  python3 tools/gen_voice_audio.py                        # 預設：句庫＋聽力短文
  python3 tools/gen_voice_audio.py --sources sentences,listening,chunks   # 連複習卡一起
  python3 tools/gen_voice_audio.py --voice "Amélie (Premium)"             # 指定聲音（名字要跟 --list 顯示的完全一樣）

網站端的對照（quest.html 用）：
  function voiceKey(t){ return String(t)
    .replace(/[\\u{1F300}-\\u{1FAFF}\\u2600-\\u27BF\\uFE0F]/gu,'').replace(/<[^>]*>/g,'')
    .replace(/[\\u2018\\u2019]/g,"'").replace(/ \\/ /g,', ')
    .replace(/\\s*\\([mf]\\.?p?l?\\.?\\)/gi,'').replace(/[«»"\\u201C\\u201D]/g,'')
    .replace(/\\s+/g,' ').trim().normalize('NFC'); }
"""
import argparse, concurrent.futures as cf, hashlib, json, os, re, shutil, subprocess, sys, tempfile, time, unicodedata

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'audio', 'voice')
MANIFEST = os.path.join(OUT, '.manifest.json')
INDEX = os.path.join(OUT, 'index.json')
CONFIG_VERSION = 1          # 改了轉檔方式就 +1，全部重錄


# ── 文字清理（跟網站 voiceKey() 一模一樣）────────────────────────
def voice_key(t):
    t = str(t)
    t = re.sub('[\U0001F300-\U0001FAFF☀-➿️]', '', t)   # emoji／符號
    t = re.sub(r'<[^>]*>', '', t)                                       # html 標籤
    t = t.replace('’', "'").replace('‘', "'")                 # 彎撇號 → 直撇號
    t = t.replace(' / ', ', ')                                          # 「Bonjour / Bonsoir」→ 兩個都唸
    t = re.sub(r'\s*\([mf]\.?p?l?\.?\)', '', t, flags=re.I)             # (m) (f) (f.pl)
    t = re.sub('[«»"“”]', '', t)                              # 引號不用唸
    t = re.sub(r'\s+', ' ', t).strip()
    return unicodedata.normalize('NFC', t)


def file_key(text):
    return hashlib.sha1(text.encode('utf-8')).hexdigest()[:12]


def unesc(s):
    """JS 字串跳脫還原：\\' → '　\\n → 空白"""
    return re.sub(r'\\(.)', lambda m: ' ' if m.group(1) in 'nt' else m.group(1), s)


def read(name):
    with open(os.path.join(ROOT, name), encoding='utf-8') as f:
        return f.read()


# ── 資料來源 ───────────────────────────────────────────────────
def load_sentences():
    # ⚠️ fr 有兩種寫法：單引號（句中 ' 用 \\' 跳脫）與雙引號（句中 ' 直接寫）
    s = read('sentences.js')
    pat = (r"\{\s*id:\s*'([^']+)'[^{}]*?\bfr:\s*"
           r"(?:'((?:[^'\\]|\\.)*)'|\"((?:[^\"\\]|\\.)*)\")")
    return [(m.group(1), unesc(m.group(2) if m.group(2) is not None else m.group(3)), 'sentences')
            for m in re.finditer(pat, s)]


def load_chunks():
    s = read('chunks.js')
    arr = json.loads(s[s.index('[', s.index('const CHUNKS')):s.rindex(']') + 1])
    return [(c['id'], c['fr'], 'chunks') for c in arr if c.get('fr')]


def load_listening():
    s = read('listening.html')
    return [(f'LQ_{i}', unesc(m.group(1)), 'listening')
            for i, m in enumerate(re.finditer(r'\bscript:\s*"((?:[^"\\]|\\.)*)"', s), 1)]


SOURCES = {'sentences': (load_sentences, 304),   # 第二欄＝預期條數（對不上就警告，不中止）
           'listening': (load_listening, 8),
           'chunks': (load_chunks, 2353)}


# ── 聲音 ───────────────────────────────────────────────────────
def list_voices():
    out = subprocess.run(['say', '-v', '?'], capture_output=True, text=True).stdout
    vs = []
    for line in out.splitlines():
        m = re.match(r'^(.+?)\s+([a-z]{2}_[A-Z]{2})\s+#', line)
        if m and m.group(2).startswith('fr_'):
            vs.append({'name': m.group(1).strip(), 'loc': m.group(2)})
    return vs


def quality(v):
    n = v['name'].lower()
    if 'premium' in n:
        return 3
    if 'enhanced' in n or 'amélior' in n:
        return 2
    return 1


def pick_voice(vs):
    named = lambda v: 1 if re.match(r'(am[eé]lie|thomas)', v['name'], re.I) else 0
    return max(vs, key=lambda v: (quality(v), named(v))) if vs else None


def show_voices(vs):
    tag = {3: 'Premium', 2: 'Enhanced', 1: '一般'}
    print('這台 Mac 的法文聲音：')
    for v in sorted(vs, key=lambda v: -quality(v)):
        print(f"  {tag[quality(v)]:8} {v['name']}　({v['loc']})")
    best = pick_voice(vs)
    if not vs:
        print('  （一個都沒有）→ 系統設定→輔助使用→語音內容→系統語音→管理聲音，下載法文（Amélie／Thomas 的 Premium 或 Enhanced）')
    elif quality(best) == 1:
        print(f"\n⚠️ 只有一般音質。建議先下載 Premium／Enhanced 再錄（系統設定→輔助使用→語音內容→系統語音→管理聲音）。")
    if best:
        print(f"\n→ 自動會選：{best['name']}")


# ── 錄音 ───────────────────────────────────────────────────────
def config_sha(text, voice, rate, kbps):
    return hashlib.sha1(f'{CONFIG_VERSION}|{text}|{voice}|{rate}|{kbps}'.encode('utf-8')).hexdigest()


def synth(text, voice, rate, kbps, out_path):
    with tempfile.TemporaryDirectory() as d:
        txt, aiff = os.path.join(d, 't.txt'), os.path.join(d, 't.aiff')
        with open(txt, 'w', encoding='utf-8') as f:
            f.write(text)
        subprocess.run(['say', '-v', voice, '-r', str(rate), '-f', txt, '-o', aiff], check=True)
        tmp_out = out_path + '.part.m4a'
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', aiff, '-ac', '1', '-ar', '24000',
                        '-c:a', 'aac', '-b:a', f'{kbps}k', '-movflags', '+faststart', tmp_out], check=True)
        os.replace(tmp_out, out_path)      # 寫到一半中斷也不會留下壞檔
    return os.path.getsize(out_path)


def estimate(texts, kbps):
    chars = sum(len(t) for t in texts)
    sec = chars / 14 + 0.6 * len(texts)                 # 正常語速約 14 字元/秒，每檔頭尾 0.6 秒
    mb = (sec * kbps / 8 + 1.5 * len(texts)) / 1024      # AAC 位元率 → KB/秒，加每檔容器約 1.5KB
    return chars, sec / 60, mb


def main():
    ap = argparse.ArgumentParser(description='預錄全站法文音檔（Mac say → AAC）')
    ap.add_argument('--list', action='store_true', help='列出這台 Mac 的法文聲音後結束')
    ap.add_argument('--dry-run', action='store_true', help='只算條數與預估容量，不錄音')
    ap.add_argument('--only', type=int, default=0, help='平均抽 N 條來錄（試聽用）')
    ap.add_argument('--sources', default='sentences,listening', help='逗號分隔：sentences,listening,chunks')
    ap.add_argument('--voice', default='', help='指定聲音（名字要跟 --list 顯示的完全一樣）')
    ap.add_argument('--rate', type=int, default=160, help='say 語速（預設 160；遊戲端再用 playbackRate 調慢）')
    ap.add_argument('--kbps', type=int, default=32, help='AAC 位元率（預設 32）')
    ap.add_argument('--jobs', type=int, default=4, help='同時錄幾條（預設 4）')
    args = ap.parse_args()

    if args.list:
        show_voices(list_voices())
        return

    # 1. 收集文字
    wanted = {}      # file_key → {'fr': 清理後文字, 'src': [來源標記…]}
    for name in [s.strip() for s in args.sources.split(',') if s.strip()]:
        if name not in SOURCES:
            sys.exit(f'不認得的來源：{name}（可用：{", ".join(SOURCES)}）')
        fn, expect = SOURCES[name]
        rows = fn()
        flag = '' if len(rows) == expect else f'  ⚠️ 預期 {expect} 條，資料檔可能已變動或解析有誤'
        print(f'{name}：{len(rows)} 條{flag}')
        for rid, fr, _ in rows:
            t = voice_key(fr)
            if not t or not re.search(r'[A-Za-zÀ-ÿ]', t):
                continue
            wanted.setdefault(file_key(t), {'fr': t, 'src': []})['src'].append(f'{name}:{rid}')
    texts = [v['fr'] for v in wanted.values()]
    chars, mins, mb = estimate(texts, args.kbps)
    print(f'去重後 {len(texts)} 條、{chars:,} 字元 ≈ {mins:.0f} 分鐘、預估 {mb:.1f} MB（{args.kbps}k）')
    if args.dry_run:
        return

    # 2. 環境檢查
    for tool in ('say', 'ffmpeg'):
        if not shutil.which(tool):
            sys.exit(f'找不到 {tool}（ffmpeg 可用 brew install ffmpeg）')
    vs = list_voices()
    voice = args.voice or (pick_voice(vs) or {}).get('name')
    if not voice:
        show_voices(vs)
        sys.exit('沒有法文聲音可用')
    if args.voice and args.voice not in [v['name'] for v in vs]:
        show_voices(vs)
        sys.exit(f'找不到聲音「{args.voice}」，上面是這台 Mac 有的')
    q = quality(next((v for v in vs if v['name'] == voice), {'name': voice}))
    print(f'聲音：{voice}（{ {3: "Premium", 2: "Enhanced", 1: "一般音質"}[q] }）　語速 {args.rate}　{args.kbps}k')
    if q == 1 and not args.voice:
        print('⚠️ 這是一般音質，可能跟手機內建差不多。建議先 --list 看有沒有 Premium／Enhanced 再繼續。')

    os.makedirs(OUT, exist_ok=True)
    manifest = json.load(open(MANIFEST, encoding='utf-8')) if os.path.exists(MANIFEST) else {}

    # 3. 決定要錄哪些（設定雜湊沒變且檔案在 → 跳過）
    keys = list(wanted)
    if args.only:
        step = max(1, len(keys) // args.only)
        keys = keys[::step][:args.only]
    todo = []
    for k in keys:
        sha = config_sha(wanted[k]['fr'], voice, args.rate, args.kbps)
        path = os.path.join(OUT, k + '.m4a')
        if not (os.path.exists(path) and manifest.get(k, {}).get('sha') == sha):
            todo.append((k, sha, path))
    print(f'這次要錄 {len(todo)} 條（其餘 {len(keys) - len(todo)} 條沒變、跳過）', flush=True)

    fails, t0 = [], time.time()

    def one(job):
        k, sha, path = job
        try:
            return job, synth(wanted[k]['fr'], voice, args.rate, args.kbps, path), None
        except Exception as e:      # 單條失敗不中止
            return job, 0, str(e)[:120]

    with cf.ThreadPoolExecutor(max(1, args.jobs)) as ex:
        for n, (job, size, err) in enumerate(ex.map(one, todo), 1):
            k, sha, _ = job
            if err:
                fails.append((k, wanted[k]['fr'], err))
            else:
                manifest[k] = {'fr': wanted[k]['fr'], 'src': wanted[k]['src'][:3], 'sha': sha, 'bytes': size}
            if n % 50 == 0 or n == len(todo):
                print(f'  {n}/{len(todo)}　失敗 {len(fails)}　{time.time() - t0:.0f} 秒', flush=True)
                json.dump(manifest, open(MANIFEST, 'w', encoding='utf-8'), ensure_ascii=False)
    json.dump(manifest, open(MANIFEST, 'w', encoding='utf-8'), ensure_ascii=False)
    for f in fails[:10]:
        print('  ✗', f)

    # 4. index.json：只收「檔案在、而且是目前這個聲音／語速／位元率錄的」
    items = {}
    for k, v in manifest.items():
        path = os.path.join(OUT, k + '.m4a')
        if os.path.exists(path) and v.get('sha') == config_sha(v['fr'], voice, args.rate, args.kbps):
            items[v['fr']] = k
    json.dump({'v': CONFIG_VERSION, 'voice': voice, 'rate': args.rate, 'kbps': args.kbps, 'items': items},
              open(INDEX, 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
    total = sum(os.path.getsize(os.path.join(OUT, k + '.m4a')) for k in items.values())
    print(f'\n✅ index.json：{len(items)} 條、音檔合計 {total / 1e6:.1f} MB')
    if args.only and todo:
        print('試聽：')
        for k, _, path in todo[:5]:
            print(f"  afplay '{path}'    # {wanted[k]['fr'][:60]}")
    if fails:
        sys.exit(1)


if __name__ == '__main__':
    main()
