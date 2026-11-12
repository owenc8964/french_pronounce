#!/usr/bin/env python3
"""exam_zh_polish_apply.py — 把潤好的中文詳解寫回模考資料（2026-11-12）
Owen：「簡體中文的可以翻譯成繁體並台灣口語一點」→ 背景助手一套一套對照法文重翻
輸入：assets/tcf/exam/_polish/polish_<id>.json：{"<題號>": {"<欄位>": "新中文"}}（⛔ 考題資料夾，gitignore）
檢查不過的題整題不收（答案字母要一致、原本引用的法文片段要還在、不能有大陸用詞）。
用法：python3 tools/exam_zh_polish_apply.py [--write]   寫完要再跑 tools/exam_build_mock_data.py
"""
import difflib, glob, json, os, re, shutil, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EX = os.path.join(ROOT, 'assets', 'tcf', 'exam')
FIELDS = {'listening': ('script_zh',), 'reading': ('src_zh', 'q_zh', 'key_zh', 'opt_zh', 'ans_zh')}
BAD = re.compile('视频|視頻|質量|信息|網絡|打車|屏幕|軟件')
norm = lambda s: re.sub(r'\s+', ' ', s.replace('’', "'")).strip()

def frags(s): return [norm(x) for x in re.findall(r"[A-Za-zÀ-ÿœ'’][A-Za-zÀ-ÿœ'’ \n]{7,}", s) if len(norm(x)) >= 8]

def check(skill, q, f, new):
    old = q.get(f)
    if not old: return '原本沒有這欄'
    if BAD.search(new): return '大陸用詞'
    if f != 'ans_zh' and not re.search(r'[一-鿿]', new): return '沒有中文'
    if f == 'script_zh':
        m = re.findall(r'答案\s*[：:]?\s*([A-D])', new)
        if m and any(x != q['answer'] for x in m): return '答案字母不一致'
    if f == 'ans_zh' and not new.strip().startswith(q['answer']): return 'ans_zh 開頭不是答案字母'
    nn = norm(new)
    def near(x):                                          # 修正拼字（Boneau→Bonneau、補重音）也算保留
        m = difflib.SequenceMatcher(None, x.lower(), nn.lower(), autojunk=False)
        return sum(b.size for b in m.get_matching_blocks()) >= 0.85 * len(x) and m.find_longest_match(0, len(x), 0, len(nn)).size >= 0.5 * len(x)
    lost = [x for x in frags(old) if x not in nn and not near(x)]
    if lost: return '法文片段不見：' + lost[0][:40]
    return ''

def main(write):
    files = sorted(glob.glob(os.path.join(EX, '_polish', 'polish_*.json')))
    for skill in ('listening', 'reading'):
        p = os.path.join(EX, f'{skill}.json'); D = json.load(open(p, encoding='utf-8'))
        byid = {t['id']: t for t in D['tests']}; changed = 0
        for fp in files:
            tid = os.path.basename(fp)[7:-5]
            if tid not in byid: continue
            t = byid[tid]; Q = {str(q['q']): q for q in t['questions']}; P = json.load(open(fp, encoding='utf-8'))
            ok = bad = 0
            for qn, fs in P.items():
                q = Q.get(str(qn))
                if not q: print(tid, qn, '沒有這題'); bad += 1; continue
                errs = []
                for f, v in fs.items():
                    e = check(skill, q, f, v) if f in FIELDS[skill] else '欄位不對'
                    if e: errs.append(f + '：' + e)
                if errs: print(tid, qn, '；'.join(errs)); bad += 1; continue
                for f, v in fs.items(): q[f] = v.strip()
                ok += 1; changed += 1
            print(f'{tid}: 收 {ok} 題，退 {bad} 題')
        if write and changed:
            bk = p + '.bak-polish'
            if not os.path.exists(bk): shutil.copy(p, bk)
            json.dump(D, open(p, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

if __name__ == '__main__':
    main('--write' in sys.argv)
