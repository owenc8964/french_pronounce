#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""把 assets/tcf/exam/{reading,listening}.json 切成 mock.html 吃得下的
   index.js ＋ data/<id>.js（每套一檔，用 <script> 載入，file:// 也能開）。

跑法（從 repo 根目錄）：python3 tools/exam_build_mock_data.py

⚠️ 程式進 git、資料不進 repo（assets/tcf/ 整包被 .gitignore 擋住，2.3 GB 商業教材）。
   所以這支在別台機器上跑會直接報錯，那是正常的。

⚠️ 2026-09-01 為什麼會有這支：原本的切檔動作是一次性的、沒留下來。
   8/30 切完之後，8/31 才把兩份 JSON 從簡體轉成台灣正體，
   結果 data/*.js 一直停在簡體版——而 mock.html 讀的就是 data/*.js。
   ⭐ 以後 JSON 一改（轉換、修答案、補解析），就重跑這支，不要手改 data/*.js。"""
import json, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EXAM = os.path.join(ROOT, 'assets', 'tcf', 'exam')
DATA = os.path.join(EXAM, 'data')

def die(msg):
    sys.exit('✗ ' + msg + '\n  （程式進 git、材料不進 repo：assets/tcf/ 要自己從原始 zip 重建）')

def main():
    if not os.path.isdir(EXAM):
        die('找不到 ' + EXAM)
    index = {}
    total_q = 0
    os.makedirs(DATA, exist_ok=True)
    written = set()
    for skill in ('reading', 'listening'):
        path = os.path.join(EXAM, skill + '.json')
        if not os.path.exists(path):
            die('找不到 ' + path)
        doc = json.load(open(path, encoding='utf-8'))
        tests = doc.get('tests') or die(path + ' 裡沒有 tests')
        rows = []
        for t in tests:
            tid = t['id']
            rows.append({'id': tid, 'test': t['test'], 'label': t['label'],
                         'n': len(t['questions'])})
            body = json.dumps(t, ensure_ascii=False, separators=(',', ':'))
            out = os.path.join(DATA, tid + '.js')
            with open(out, 'w', encoding='utf-8') as f:
                f.write('TCF_LOAD(' + json.dumps(tid) + ',' + body + ');\n')
            written.add(tid + '.js')
            total_q += len(t['questions'])
        index[skill] = rows
        print('  %-9s %2d 套 · %d 題' % (skill, len(tests), sum(r['n'] for r in rows)))

    with open(os.path.join(EXAM, 'index.js'), 'w', encoding='utf-8') as f:
        f.write('window.TCF_INDEX=' + json.dumps(index, ensure_ascii=False,
                                                 separators=(',', ':')) + ';\n')

    # 舊的、這輪沒重新產出的檔要講出來，不要靜靜留著讓人以為是現行資料
    stale = [n for n in sorted(os.listdir(DATA)) if n.endswith('.js') and n not in written]
    if stale:
        print('⚠️ data/ 裡有 %d 個這次沒產生的舊檔：%s' % (len(stale), ', '.join(stale[:8])))

    print('✓ index.js ＋ data/*.js 共 %d 檔、%d 題' % (len(written), total_q))

if __name__ == '__main__':
    main()
