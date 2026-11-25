#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""reading_opts_zh.py — 閱讀題補 opts_zh（每個選項的中文）（2026-11-25）
Owen 回報 ce_3 Q8：「Chômage 怎麼沒翻譯」→ 閱讀選項點兩下只有字典意思，沒有像聽力那樣的「這個選項」整句中文，
因為 reading.json 1716 題全部沒有 opts_zh。中文其實已經在解析 opt_zh 裡（「C. Une conférence sur le chômage（失業問題講座）– 錯…」），
這裡只是抽出來，⛔ 不新寫翻譯。法文部分要跟選項對得上才收。
跑法：python3 tools/reading_opts_zh.py [--write]"""
import json, re, sys, unicodedata, shutil, os
P = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'assets/tcf/exam/reading.json')
MARK = re.compile(r'(?mi)^\s*([A-D])\s*[\.．、:：)]\s*')
CJK = re.compile(r'[㐀-鿿]')
BAD = re.compile(r'^(錯|對|正確|不正確|錯誤|這個選項|此選項|選項|原文|文中|排除|分析|符合|不符|答案|正解|雖然|但)')


def blocks(text):
    ms = list(MARK.finditer(text))
    for k, m in enumerate(ms):
        yield m.group(1), text[m.end(): ms[k + 1].start() if k + 1 < len(ms) else len(text)]


def zh_of(block):
    """法文在前、中文翻譯緊接在後：（括號）／– 破折號／換行。PDF 斷行（一句被切成兩行）要接回來。"""
    m = CJK.search(block)
    if not m:
        return None, None
    par = re.search(r'[（(]([^（）()]*[㐀-鿿][^（）()]*)[）)]', block)
    if par and not CJK.search(block[:par.start()]):
        fr, zh = block[:par.start()], re.sub(r'\s+', '', par.group(1))
    else:
        k = m.start()
        while k > 0 and (block[k - 1].isdigit() or block[k - 1] in ':.h'):   # 「19點」「8:30開始」數字也是中文那半
            k -= 1
        if k < m.start() and not block[k].isdigit():
            k += 1
        fr = block[:k]
        lines = block[k:].split('\n')
        zh = lines[0].strip()
        for nxt in lines[1:]:                       # 這行沒講完（沒有句號）、下一行也不是解析開頭 → 是斷行，接回來
            nxt = nxt.strip()
            if '。' in zh or not nxt or BAD.match(nxt) or not CJK.match(nxt[:1] or 'x') and not nxt[:1].isdigit():
                break
            if re.search(r'正確|錯|排除|原文|文中', nxt.split('。')[0]):   # 下一行其實是解析（ce_23 這種「翻譯換行接解析」的排法）
                break
            zh += nxt
        zh = re.split(r'。|[–—⸺]|，(?=錯|對|正確|不正確|排除)|\s{2,}', zh)[0].strip(' 　:：,，')
    fr = fr.strip(' \n.．:：–—⸺-')
    if not zh or BAD.match(zh) or len(zh) > 60:
        return fr, None
    zh = re.sub(r'（選項[^）]*）|這是答案.*$', '', zh)   # 解析裡夾的註記不是翻譯
    return fr, zh.rstrip('。.')


def norm(s):
    s = unicodedata.normalize('NFKD', s.lower())
    return [w for w in re.findall(r"[a-z0-9]+", ''.join(c for c in s if not unicodedata.combining(c)))]


def similar(a, b):
    A, B = set(norm(a)), set(norm(b))
    return bool(A) and len(A & B) / max(len(A), len(B)) >= .6


def main():
    d = json.load(open(P, encoding='utf-8'))
    full = part = none = 0
    for t in d['tests']:
        for q in t['questions']:
            opts = q.get('opts') or []
            if not opts:
                continue
            got = [''] * len(opts)
            for L, b in blocks(q.get('opt_zh') or ''):
                i = 'ABCD'.index(L.upper())
                fr, zh = zh_of(b)
                if zh and i < len(opts) and not got[i] and similar(fr, opts[i]):
                    got[i] = zh
            n = sum(bool(x) for x in got)
            full += n == len(opts); part += 0 < n < len(opts); none += n == 0
            if n:
                q['opts_zh'] = got
    print('全部選項都有', full, '部分', part, '沒有', none)
    if '--write' in sys.argv:
        shutil.copy(P, P + '.bak-2026-11-25')
        json.dump(d, open(P, 'w', encoding='utf-8'), ensure_ascii=False)
        print('寫入', P)


if __name__ == '__main__':
    main()
