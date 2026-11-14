#!/usr/bin/env python3
"""Lucas「高階詞彙」→ 字典屋（2026-11-14）

Owen：「Lucas 那個閱讀詞庫跟寫作口語詞庫都很好，幫我整理起來進遊戲」→ 先用 xlsx 的 293 字。
- 來源：Owen 給的 Lucas 課程材料 assets/tcf/lucas/学习资料_Owen_*.xlsx「高阶词汇」（法文＋詞性＋中文，沒有例句）
- 例句：⛔ 不自己造，從 88 套模考（assets/tcf/exam/data）用 spaCy 原形比對撈真題原句
- 輸出：assets/tcf/exam/vocab/lucas_words.json（⛔ 本機＋私人空間，不進公開 repo：Lucas 教材＋考題原句）
  dev_server.vocab_build() 會把它併進 vocab.json（預設 ⭐ 放上書架），再上傳私人空間 tcf/vocab.json

用法：python3 tools/lucas_vocab.py            # 產生並印統計
      python3 tools/lucas_vocab.py --upload   # 產生＋重算 vocab.json＋上傳私人空間
"""
import glob, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, 'assets/tcf/exam/data')
OUT = os.path.join(ROOT, 'assets/tcf/exam/vocab/lucas_words.json')

# 原表的拼字錯誤（標準法文 ＞ 來源；照來源三層優先序，改了要記下來）
FIX = {'suplémentaire': 'supplémentaire'}
POS = {'vt': 'VERB', 'vi': 'VERB', 'v.pr': 'VERB', 'vt, vi': 'VERB', 'vt，vi': 'VERB',
       'm': 'NOUN', 'f': 'NOUN', 'n': 'NOUN', 'm.pl': 'NOUN', 'adj': 'ADJ', 'adv': 'ADV'}
GENDER = {'m': '(m.) ', 'f': '(f.) ', 'm.pl': '(m.pl.) '}


def load_xlsx():
    import openpyxl
    from opencc import OpenCC
    cc = OpenCC('s2twp')
    f = sorted(glob.glob(os.path.join(ROOT, 'assets/tcf/lucas/学习资料_Owen_*.xlsx')))[-1]
    ws = openpyxl.load_workbook(f, data_only=True)['高阶词汇']
    out = []
    for r in ws.iter_rows(values_only=True):
        if not isinstance(r[1], (int, float)) or not r[2]:
            continue
        disp = str(r[2]).strip()
        for a, b in FIX.items():
            disp = disp.replace(a, b)
        p = str(r[3] or '').strip()
        pos = POS.get(p)
        if not pos:
            print('⚠️ 不認得詞性', r, file=sys.stderr); continue
        first = re.split(r'\s*[/,，]\s*', disp)[0].strip()          # innovant / innovante → innovant
        say = first
        lemma = re.sub(r"^(se |s')", '', first) if pos == 'VERB' else first   # s'intégrer → intégrer（spaCy 原形）
        zh = cc.convert(str(r[4] or '').strip()).replace(',', '，').replace('負擔的起', '負擔得起')
        out.append({'disp': disp, 'say': say, 'lemma': lemma, 'pos': pos, 'zh': GENDER.get(p, '') + zh, 'praw': p})
    return out, os.path.basename(f)


def load_corpus():
    """[(test, q, skill, text, tok)]；tok＝[start, end, 原形（跟字面一樣時空白）, POS, feat]"""
    rows = []
    for f in sorted(glob.glob(os.path.join(DATA, 'c[oe]_*.js'))):
        s = open(f, encoding='utf-8').read()
        d = json.loads(s[s.index(',') + 1:s.rindex(')')])
        for q in d['questions']:
            text = q.get('script_fr') if d['skill'] == 'listening' else q.get('text_fr')
            if text and q.get('tok'):
                rows.append((d['id'], q['q'], d['skill'], text, q['tok']))
    return rows


SENT = re.compile(r'[^.!?\n]*[.!?]?')


def sentence_at(text, s, e):
    text = re.sub(r'(?<!\n)\n(?!\n)', ' ', text)                 # PDF／逐字稿的單一換行不是句尾（長度不變，tok 位置照用）
    a = max(text.rfind(c, 0, s) for c in '.!?\n') + 1
    ends = [i for i in (text.find(c, e) for c in '.!?\n') if i >= 0]
    b = (min(ends) + 1) if ends else len(text)
    sent = re.sub(r'\s+', ' ', text[a:b]).strip()
    sent = re.sub(r'^[A-D]\.\s*', '', sent)                        # 聽力選項的「A. 」
    return sent, s - a


def build():
    words, src = load_xlsx()
    corpus = load_corpus()
    idx = {}                                                       # (lemma, pos) → [(test,q,skill,sent,w)]
    for test, q, skill, text, tok in corpus:
        for t in tok:
            surf = text[t[0]:t[1]]
            lem = (t[2] or surf).lower().replace('’', "'")
            pos = 'VERB' if t[3] in ('VERB', 'AUX') else t[3]
            idx.setdefault((lem, pos), []).append((test, q, skill, text, t[0], t[1], surf))
    out, miss = [], []
    for w in words:
        key_l = w['lemma'].lower()
        hits = idx.get((key_l, w['pos']), [])
        if not hits and w['pos'] == 'ADJ':                         # 過去分詞當形容詞（motivé）spaCy 常還原成動詞 motiver
            hits = idx.get((key_l, 'VERB'), [])
            for inf in (re.sub(r'é$', 'er', key_l), re.sub(r'i$', 'ir', key_l)):
                if not hits and inf != key_l:
                    hits = [h for h in idx.get((inf, 'VERB'), []) if re.search(r'(é|i)e?s?$', h[6].lower())]
        tests, forms, ex, seen = [], [], [], set()
        for test, q, skill, text, s, e, surf in hits:
            k = test + '#' + str(q)
            if k not in tests: tests.append(k)
            if surf not in forms and len(forms) < 5: forms.append(surf)
        # 例句：每套最多一句、短句優先（10–25 字最好聽懂）、閱讀聽力都收，最多 3 句
        cands = []
        for test, q, skill, text, s, e, surf in hits:
            sent, off = sentence_at(text, s, e)
            n = len(sent.split())
            if len(sent) > 220:                                    # 長句：只留那個字前後各約 12 個字
                left, right = sent[:off].split(), sent[off:].split()
                sent = ('… ' if len(left) > 12 else '') + ' '.join(left[-12:] + right[:13]) + (' …' if len(right) > 13 else '')
                n = len(sent.split())
            if n < 4 or sent in seen: continue
            if not re.search(r"(?<![\w'’-])" + re.escape(surf) + r"(?![\w-])", sent): continue   # PDF 斷字（g aspiller）
            if re.search(r"(?<![\w'’])[b-xz] [a-zàâçéèêëîïôûù]{2,}", sent): continue           # 句中有其他斷字也不要
            if re.search(r'[\u3000-\u9fff]|^Question\b|\bII\b', sent): continue               # 夾中文解說、題號句、OCR 把 Il 認成 II
            seen.add(sent)
            score = abs(n - 14) + (8 if '…' in sent else 0) + (0 if re.match(r'[A-ZÀÂÇÉÈÊÎÔ«"]', sent) and re.search(r'[.!?»"]$', sent) else 5)
            cands.append((score, test, q, skill, sent, surf))
        cands.sort()
        used = set()
        for _, test, q, skill, sent, surf in cands:
            if test in used: continue
            used.add(test); ex.append({'fr': sent, 'w': surf, 'test': test, 'q': q, 'skill': skill})
            if len(ex) >= 3: break
        if not ex: miss.append(w['disp'])
        out.append({'key': key_l + '|' + w['pos'], 'lemma': w['lemma'], 'disp': w['disp'], 'say': w['say'], 'pos': w['pos'],
                    'zh': w['zh'], 'forms': forms, 'n_look': 0, 'tests': tests, 'star': True, 'star_ts': 0, 'bank': 'rec',
                    'ex': ex, 'cats': {}, 'cat': '動詞' if w['pos'] == 'VERB' else '生字', 'src': 'lucas'})
    # 同一原形＋詞性在表上出現兩次（同字不同義）→ 中文併成一張
    merged = {}
    for v in out:
        if v['key'] in merged:
            m = merged[v['key']]
            if v['zh'] not in m['zh']: m['zh'] += '；' + v['zh']
        else:
            merged[v['key']] = v
    res = list(merged.values())
    tmp = OUT + '.tmp'
    json.dump({'src': src, 'n': len(res), 'words': res}, open(tmp, 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
    os.replace(tmp, OUT)
    print(f'{len(words)} 列 → {len(res)} 字；有真題例句 {len(res) - len(miss)}；沒例句 {len(miss)}：{miss}')
    print('出現套數最多：', [(v["disp"], len(v["tests"])) for v in sorted(res, key=lambda v: -len(v['tests']))[:8]])
    print('出現最少（≤2 題）：', [(v["disp"], len(v["tests"])) for v in res if len(v['tests']) <= 2])
    return res


if __name__ == '__main__':
    build()
    if '--upload' in sys.argv:
        sys.path.insert(0, os.path.join(ROOT, 'tools'))
        import dev_server
        dev_server.vocab_build(); dev_server.vocab_upload(); print('vocab.json 重算並上傳')
