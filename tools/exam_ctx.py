#!/usr/bin/env python3
"""tools/exam_ctx.py — 模考查字的「在這題的意思」（11-23 Owen：「中文意思感覺要照題目給耶」）

字典意思（gloss.js）是一字一義，常常對不上句子：Je vous sers un café ? 的 sers 字典給「服務；有用」，
這句其實是「（幫您）倒（咖啡）」。這裡替每一套的每個實詞寫一份照原句給的中文。

用法：
  python3 tools/exam_ctx.py prep co_4          → assets/tcf/exam/_ctx/work_co_4.json（給寫的人看：每題原文、中文、要寫的字）
  python3 tools/exam_ctx.py build co_4         → 讀 _ctx/co_4*.json（可分好幾份 part），檢查後寫 ctx/co_4.js（mock.html 載入）

資料格式（_ctx/co_4.json 或 co_4.part1.json…）：{"題號": {"字的起始位置": "中文"}}
⚠️ assets/tcf/ 整個不進 git（考題版權），這支程式進 git。
"""
import json, sys, glob, os, re

ROOT = os.path.join(os.path.dirname(__file__), '..', 'assets', 'tcf', 'exam')
POS = ('VERB', 'NOUN', 'ADJ', 'ADV')


def load_test(tid):
    for f in ('listening.json', 'reading.json'):
        d = json.load(open(os.path.join(ROOT, f), encoding='utf8'))
        for t in d['tests']:
            if t['id'] == tid:
                return t
    sys.exit('找不到 ' + tid)


def text_of(q):
    return q.get('script_fr') or q.get('text_fr') or ''


def zh_of(q):
    return q.get('script_zh') or q.get('src_zh') or ''


def targets(q):
    txt = text_of(q)
    out = []
    for a, b, l, p, f in q.get('tok') or []:
        w = txt[a:b]
        if p in POS and re.search('[a-zA-Zà-ÿÀ-Ý]{2,}', w) and not re.fullmatch(r'[A-D]\.?', w):
            out.append([a, txt[a:b], l or txt[a:b], p, f or ''])
    return out


def prep(tid):
    t = load_test(tid)
    items = []
    for q in t['questions']:
        tg = targets(q)
        if tg:
            items.append({'q': q['q'], 'fr': text_of(q), 'zh': zh_of(q), 'words': tg})
    os.makedirs(os.path.join(ROOT, '_ctx'), exist_ok=True)
    p = os.path.join(ROOT, '_ctx', 'work_' + tid + '.json')
    json.dump({'test': tid, 'items': items}, open(p, 'w', encoding='utf8'), ensure_ascii=False, indent=1)
    print(p, '題數', len(items), '字數', sum(len(i['words']) for i in items))


SIMP = re.compile('[们这个来时说对会过还没让为请发从车钱银间点问题实际东现]')


def build(tid):
    t = load_test(tid)
    merged = {}
    files = sorted(glob.glob(os.path.join(ROOT, '_ctx', tid + '.json')) + glob.glob(os.path.join(ROOT, '_ctx', tid + '.part*.json')))
    if not files:
        sys.exit('沒有 _ctx/' + tid + '*.json')
    for f in files:
        for qn, m in json.load(open(f, encoding='utf8')).items():
            merged.setdefault(str(qn), {}).update({str(k): v for k, v in m.items()})
    want = 0; have = 0; bad = []
    out = {}
    for q in t['questions']:
        tg = {str(w[0]): w for w in targets(q)}
        want += len(tg)
        got = merged.get(str(q['q']), {})
        for s, zh in got.items():
            if s not in tg:
                bad.append(f"第{q['q']}題 位置 {s} 不是要寫的字"); continue
            zh = str(zh).strip()
            if not zh:
                bad.append(f"第{q['q']}題 {tg[s][1]} 空白"); continue
            if SIMP.search(zh):
                bad.append(f"第{q['q']}題 {tg[s][1]} 疑似簡體：{zh}")
            out.setdefault(str(q['q']), {})[s] = zh; have += 1
        miss = [tg[s][1] for s in tg if s not in got]
        if miss:
            bad.append(f"第{q['q']}題 缺 {len(miss)} 個：{' '.join(miss[:8])}")
    # 片語（整塊意思）：_ctx/<套>.phr.json {題號:[[起,迄,法文,中文]]}，fr[起:迄] 要等於法文
    ph = {}
    pf = os.path.join(ROOT, '_ctx', tid + '.phr.json')
    if os.path.exists(pf):
        texts = {str(q['q']): text_of(q) for q in t['questions']}
        for qn, L in json.load(open(pf, encoding='utf8')).items():
            for a, b, fr, zh in L:
                if texts.get(str(qn), '')[a:b] != fr:
                    bad.append(f"第{qn}題 片語位置不符：{fr}"); continue
                if SIMP.search(zh):
                    bad.append(f"第{qn}題 片語疑似簡體：{zh}")
                ph.setdefault(str(qn), []).append([a, b, fr, zh])
        print('片語', sum(len(v) for v in ph.values()))
    os.makedirs(os.path.join(ROOT, 'ctx'), exist_ok=True)
    p = os.path.join(ROOT, 'ctx', tid + '.js')
    open(p, 'w', encoding='utf8').write('/* exam_ctx.py build 產生，⛔ 不要手改 */\nwindow.TCF_CTX_LOAD && TCF_CTX_LOAD(' +
                                        json.dumps(tid) + ',' + json.dumps(out, ensure_ascii=False) + ',' + json.dumps(ph, ensure_ascii=False) + ');\n')
    print(p, f'{have}/{want} 個字有「在這題的意思」')
    for b in bad[:40]:
        print('  ⚠️', b)
    if len(bad) > 40:
        print('  …另外', len(bad) - 40, '條')


if __name__ == '__main__':
    if len(sys.argv) < 3 or sys.argv[1] not in ('prep', 'build'):
        sys.exit(__doc__)
    (prep if sys.argv[1] == 'prep' else build)(sys.argv[2])
