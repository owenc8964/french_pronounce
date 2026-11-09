#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""做模考聽力的「人聲加強版」音檔給 mock.html 的開關換檔用（assets/ 不進 repo）。
跑法：python3 tools/tcf_voice_audio.py [只做哪一個檔名片段，例如 test3]
輸出 assets/tcf/exam/audio_voice/，長度跟原檔相同，逐題起點不用重算；已做過的跳過。"""
import concurrent.futures as cf, glob, os, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'assets/tcf/exam/audio')
OUT = os.path.join(ROOT, 'assets/tcf/exam/audio_voice')
AF = ('highpass=f=110,bass=g=-3:f=260,equalizer=f=2800:t=q:w=0.9:g=5,treble=g=2:f=6500,'
      'acompressor=threshold=-20dB:ratio=3:attack=4:release=200:knee=4,volume=8.5dB,alimiter=limit=0.97:level=false')

def dur(p):
    return float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p]))

def one(src):
    dst = os.path.join(OUT, os.path.basename(src))
    if os.path.exists(dst):
        return dst, 'skip'
    tmp = dst + '.tmp.mp3'
    subprocess.check_call(['ffmpeg', '-v', 'error', '-y', '-i', src, '-af', AF, '-ac', '1', '-b:a', '96k', tmp])
    d = abs(dur(src) - dur(tmp))
    if d > 0.25:
        os.remove(tmp)
        return dst, 'BAD 長度差 %.2f' % d
    os.replace(tmp, dst)
    return dst, 'ok %.2f' % d

if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    pick = sys.argv[1] if len(sys.argv) > 1 else ''
    files = [f for f in sorted(glob.glob(SRC + '/*.mp3')) if pick in os.path.basename(f)]
    with cf.ThreadPoolExecutor(3) as ex:
        for dst, st in ex.map(one, files):
            print(os.path.basename(dst), st, flush=True)
