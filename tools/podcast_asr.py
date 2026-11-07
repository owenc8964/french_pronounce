#!/usr/bin/env python3
"""podcast_asr.py — podcast 每集轉文字＋每字時間點（2026-11-07）

用本機 whisperkit-cli＋MacWhisper 已下載的 large-v3（離線，不另外下載模型，見 HANDOFF 三之八十一）。
⚠️ 辨識文字可能有錯：拿來當「原文」給 Owen 看之前，要先過抽查；專有名詞與數字最容易錯。
輸出：assets/podcast/<show>/asr/<id>.json → [{w, s, e, p}]（已存在就跳過，可中斷續跑）
用法：python3 tools/podcast_asr.py easyfrench innerfrench
"""
import json, os, subprocess, sys, time
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL = os.path.expanduser('~/Library/Application Support/MacWhisper/models/whisperkit/models/'
                           'argmaxinc/whisperkit-coreml/openai_whisper-large-v3-v20240930')

def run(show):
    base = os.path.join(ROOT, 'assets', 'podcast', show)
    eps = json.load(open(os.path.join(base, 'episodes.json')))
    asr = os.path.join(base, 'asr'); tmp = os.path.join(asr, '_tmp'); os.makedirs(tmp, exist_ok=True)
    for ep in eps:
        out = os.path.join(asr, ep['id'] + '.json')
        if os.path.exists(out): continue
        wav = os.path.join(tmp, ep['id'] + '.wav')
        t0 = time.time()
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', os.path.join(base, ep['file']),
                        '-ac', '1', '-ar', '16000', wav], check=True)
        subprocess.run(['whisperkit-cli', 'transcribe', '--model-path', MODEL, '--audio-path', wav,
                        '--language', 'fr', '--word-timestamps', '--report', '--report-path', tmp],
                       check=True, capture_output=True)
        rep = json.load(open(os.path.join(tmp, ep['id'] + '.json')))
        words = [{'w': x['word'].strip(), 's': round(x['start'], 2), 'e': round(x['end'], 2),
                  'p': round(x.get('probability') or 0, 3)}
                 for seg in rep['segments'] for x in seg.get('words', [])]
        json.dump(words, open(out, 'w'), ensure_ascii=False)
        for f in os.listdir(tmp): os.remove(os.path.join(tmp, f))
        print(show, ep['id'], len(words), 'words', round(time.time() - t0), 's', flush=True)

if __name__ == '__main__':
    for s in sys.argv[1:] or ['easyfrench', 'innerfrench']: run(s)
