#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""tcf_listening_cues.py — 找出 TCF 聽力整套音檔裡每一題的起點（2026-11-09）

為什麼不用靜音：44 套裡只有 4 套切得準（HANDOFF 三之十五）。
音檔自己會報題號（「Regardez l'image 1」「Question 6」），所以用語音辨識找報題號的位置。
⛔ 版權：辨識結果與 cues.js 都在 assets/tcf/exam/（gitignore），永遠不進公開 repo。

跑法：python3 tools/tcf_listening_cues.py [--asr]   有 --asr 才會辨識還沒做過的音檔
輸出：assets/tcf/exam/cues.js → window.TCF_CUES = {"co_1":[起點秒數 × 39，找不到的是 null]}
"""
import glob, json, os, re, subprocess, sys, tempfile
from concurrent.futures import ThreadPoolExecutor

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EX = os.path.join(ROOT, 'assets/tcf/exam')
ASR = os.path.join(EX, '_asr')
MODEL = os.path.expanduser('~/Library/Application Support/MacWhisper/models/whisperkit/models/argmaxinc/whisperkit-coreml/openai_whisper-large-v3-v20240930')
WORDS = {'un':1,'une':1,'deux':2,'trois':3,'quatre':4,'cinq':5,'six':6,'sept':7,'huit':8,'neuf':9,'dix':10}
MARK = re.compile(r"(?:l['’ ]?image|question)\s*(?:n[°o]\s*|num[ée]ro\s*)?(\d{1,2}|un|une|deux|trois|quatre|cinq|six|sept|huit|neuf|dix)\b", re.I)
PRE_ROLL = 1.5   # 從內容前一點開始，把提示音也播進去
MIN_OVERLAP = .55


def run_asr(mp3):
    name = os.path.basename(mp3)[:-4]
    out = os.path.join(ASR, name + '.json')
    if os.path.exists(out):
        return name
    with tempfile.TemporaryDirectory() as tmp:
        subprocess.run(['whisperkit-cli', 'transcribe', '--model-path', MODEL, '--audio-path', mp3, '--language', 'fr',
                        '--word-timestamps', '--report', '--report-path', tmp], check=True, capture_output=True)
        os.replace(os.path.join(tmp, name + '.json'), out)
    print('done', name, flush=True)
    return name


def toks(x):
    return re.findall(r"[a-zà-ÿœ]{4,}", x.lower().replace('’', "'"))


def seg_text(seg):
    return re.sub(r'<\|.*?\|>', '', seg['text']).strip()


def seg_start(seg):
    return seg['words'][0]['start'] if seg.get('words') else seg['start']


def overlap(script, segs):
    """這幾段辨識文字涵蓋了多少逐字稿的字（0–1）"""
    s = set(toks(script))
    return len(s & set(t for g in segs for t in toks(seg_text(g)))) / max(1, len(s))


def marks(name, scripts):
    """回傳每題的起點。
    ⚠️ 兩種結構（2026-11-09 實測）：前 10 題多半先報題號再放內容；第 11 題起先放對話、後報「Question N＋題目」。
    所以報題號的位置不一定是起點，要看逐字稿內容落在題號前面還是後面。"""
    segs = json.load(open(os.path.join(ASR, name + '.json'), encoding='utf-8'))['segments']
    segs = [g for g in segs if seg_text(g)]
    at = [None] * 39
    want, last = 1, -1
    for k, g in enumerate(segs):
        for m in MARK.finditer(seg_text(g)):
            v = m.group(1).lower()
            n = WORDS.get(v) or (int(v) if v.isdigit() else 0)
            # 只往前走；允許辨識漏掉最多 3 題，錯的大數字不會把進度帶跑
            if want <= n <= want + 3 and n <= 39 and k > last:
                at[n - 1], want, last = k, n + 1, k
    cues = [None] * 39
    for i, k in enumerate(at):
        if k is None or not scripts[i]:
            continue
        prev = next((at[x] for x in range(i - 1, -1, -1) if at[x] is not None), -1)
        nxt = next((at[x] for x in range(i + 1, 39) if at[x] is not None), len(segs))
        before = segs[prev + 1:k]
        after = segs[k:nxt]
        if overlap(scripts[i], before) > overlap(scripts[i], after):
            sset = set(toks(scripts[i]))
            first = next((g for g in before if len(toks(seg_text(g))) >= 2 and
                          sum(t in sset for t in toks(seg_text(g))) / len(toks(seg_text(g))) >= .5), None)
            if first is not None:
                cues[i] = round(max(0.0, seg_start(first) - PRE_ROLL), 2)
        else:
            cues[i] = round(max(0.0, seg_start(segs[k]) - PRE_ROLL), 2)
    # 題號沒報或沒辨識到的題：直接用逐字稿內容往後找（44 套裡有幾套完全不報題號）
    pos = 0
    for i in range(39):
        if cues[i] is not None:
            pos = max(pos, next((k for k, g in enumerate(segs) if g['start'] >= cues[i]), pos))
            continue
        if not scripts[i]:
            continue
        sset, need = set(toks(scripts[i])), len(toks(scripts[i]))
        nxt = next((x for x in cues[i + 1:] if x is not None), 1e9)
        for k in range(pos, len(segs)):
            if segs[k]['start'] >= nxt:
                break
            words = toks(seg_text(segs[k]))
            if len(words) < 2 or sum(t in sset for t in words) / len(words) < .6:
                continue
            w, n = k, 0
            while w < len(segs) and n < need * 1.3:
                n += len(toks(seg_text(segs[w]))); w += 1
            if overlap(scripts[i], segs[k:w]) >= MIN_OVERLAP:
                cues[i] = round(max(0.0, seg_start(segs[k]) - PRE_ROLL), 2)
                pos = k + 1
                break
    # 必須一路往後；順序錯的不採用
    last = -1.0
    for i, c in enumerate(cues):
        if c is None:
            continue
        if c <= last:
            cues[i] = None
        else:
            last = c
    # 品質閘門：這題起點到下一題起點之間，要真的聽得到這題的內容；對不上的寧可不給按鈕
    for i, c in enumerate(cues):
        if c is None:
            continue
        end = next((x for x in cues[i + 1:] if x is not None), 1e9)
        if overlap(scripts[i], [g for g in segs if c <= g['start'] < end]) < MIN_OVERLAP:
            cues[i] = None
    return cues


def main():
    os.makedirs(ASR, exist_ok=True)
    mp3s = sorted(glob.glob(os.path.join(EX, 'audio/*.mp3')))
    if '--asr' in sys.argv:
        with ThreadPoolExecutor(3) as p:
            list(p.map(run_asr, mp3s))
    out, full = {}, 0
    for f in mp3s:
        base = os.path.basename(f)[:-4]
        if not os.path.exists(os.path.join(ASR, base + '.json')):
            continue
        tid = 'co_' + base[len('co_test'):]
        src = open(os.path.join(EX, 'data', tid + '.js'), encoding='utf-8').read()
        qs = json.loads(src[src.index(',') + 1:src.rindex(')')])['questions']
        c = marks(base, [q.get('script_fr') or '' for q in qs])
        out['co_' + base[len('co_test'):]] = c
        n = sum(x is not None for x in c)
        full += n == 39
        if n < 39:
            print(base, 'found', n, 'missing', [i + 1 for i, x in enumerate(c) if x is None])
    open(os.path.join(EX, 'cues.js'), 'w', encoding='utf-8').write('window.TCF_CUES=' + json.dumps(out, separators=(',', ':')) + ';\n')
    print('sets', len(out), 'complete', full)


if __name__ == '__main__':
    main()
