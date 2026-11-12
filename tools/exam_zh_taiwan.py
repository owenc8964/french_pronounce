#!/usr/bin/env python3
"""exam_zh_taiwan.py — 模考中文詳解轉成台灣用字（2026-11-12）
Owen：「簡體中文的可以翻譯成繁體並台灣口語一點」
1. PDF 抽出來的「部首字」（⻔ ⻝ ⻋…，長得像簡體）換回正常繁體字
2. 台灣詞彙：只換下面確認過的詞。⛔ 不用 OpenCC 整句轉（試過：她系上→她繫上、文件→檔案、對象→物件、它只→它隻，錯太多）
用法：python3 tools/exam_zh_taiwan.py [--write]   （改 assets/tcf/exam/{listening,reading}.json，先備份）
"""
import json, os, re, sys, shutil, collections
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EX = os.path.join(ROOT, 'assets', 'tcf', 'exam')
RAD = dict(zip('⻋⻨⻙⻆⻦⻉⻜⻬⻰⻘⻤⻩⻓⻥⻛⻅⻝⻣⺠⻔⻚⻄⻢⻮⻁', '車麥韋角鳥貝飛齊龍青鬼黃長魚風見食骨民門頁西馬齒虎'))
# 順序有意義：長的詞先換（視頻通話 要在 視頻 前面）
TW = [('視頻通話', '視訊通話'), ('短視頻', '短影片'), ('視頻', '影片'), ('自行車', '腳踏車'), ('出租車', '計程車'), ('公交車', '公車'), ('公交', '公車'),
      ('想象', '想像'), ('互聯網', '網路'), ('網絡', '網路'), ('網上', '網路上'), ('在線', '線上'), ('實時', '即時'), ('軟件', '軟體'), ('硬件', '硬體'),
      ('信息', '資訊'), ('短信', '簡訊'), ('質量', '品質'), ('打印', '列印'), ('屏幕', '螢幕'), ('激光', '雷射'), ('鏈接', '連結'), ('郵箱', '信箱'),
      ('博客', '部落格'), ('鼠標', '滑鼠'), ('硬盤', '硬碟'), ('文件夾', '資料夾'), ('存儲', '儲存'), ('營銷', '行銷'), ('程序員', '程式設計師'),
      ('志願者', '志工'), ('酸奶', '優格'), ('西紅柿', '番茄'), ('衛生間', '洗手間'), ('空調', '冷氣'), ('早上好', '早安'), ('小區', '社區'),
      ('莫扎特', '莫札特'), ('津巴布韋', '辛巴威'), ('密歇根', '密西根'), ('頁巖', '頁岩'), ('周末', '週末'), ('這周', '這週'), ('幾周', '幾週'),
      ('上周', '上週'), ('下周', '下週'), ('每周', '每週'), ('雇主', '僱主'), ('食欲', '食慾'), ('欲望', '慾望'), ('橋樑', '橋梁')]
FIELDS = ('script_zh', 'opts_zh', 'src_zh', 'q_zh', 'key_zh', 'opt_zh', 'ans_zh')

def fix(s):
    s = ''.join(RAD.get(c, c) for c in s)
    for a, b in TW: s = s.replace(a, b)
    return s

def main(write):
    diff = collections.Counter(); n = 0
    for f in ('listening.json', 'reading.json'):
        p = os.path.join(EX, f); D = json.load(open(p, encoding='utf-8'))
        for t in D['tests']:
            for q in t['questions']:
                for k, v in list(q.items()):                       # 部首字也會混在 script_fr 裡（逐字稿夾中文）
                    if isinstance(v, str) and any(c in RAD for c in v): q[k] = ''.join(RAD.get(c, c) for c in v)
                for k in FIELDS:
                    v = q.get(k)
                    if not v: continue
                    new = [fix(x) for x in v] if isinstance(v, list) else fix(v)
                    if new != v:
                        n += 1
                        for a, b in zip(''.join(v) if isinstance(v, list) else v, ''.join(new) if isinstance(new, list) else new):
                            if a != b: diff[a + '→' + b] += 1
                        q[k] = new
        if write:
            shutil.copy(p, p + '.bak-2026-11-12')
            json.dump(D, open(p, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print('改了', n, '個欄位'); print(diff.most_common(80))

if __name__ == '__main__':
    main('--write' in sys.argv)
