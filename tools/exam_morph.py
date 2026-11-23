#!/usr/bin/env python3
"""exam_morph.py — 模考原文每個字標「原形＋詞性＋時態」（2026-11-12）
Owen：「可以我直接連點兩下原文就能知道翻譯或是哪個動詞的變形及時態」
用 spaCy fr_core_news_md（看上下文判斷），結果存進 listening.json／reading.json 每題的 tok：
  [[起, 迄, 原形(同字面就空字串), 詞性, 形態]]   形態例：Ind.Pres.3.S、PC.1.S（複合時態看助動詞）、Pass.Ind.Pres.3.S、Inf、PartPast；助動詞是 Aux@<主動詞起點>|<主動詞形態>
只標 script_fr（聽力）／text_fr（閱讀）。中文字義另外在 assets/tcf/exam/_gloss/。
用法：python3 tools/exam_morph.py [listening|reading]
      python3 tools/exam_morph.py fix [listening|reading]   ← 不重標原文，只補「倒裝問句拆開」＋「選項也標」（11-23 加）
11-23 Owen：「tire-t-il 不是專有名詞，應該是 tire il 的那個文法」→ spaCy 有時把倒裝問句整塊當一個字（標成專有名詞／形容詞），
      這裡拆成「動詞＋-t-il」，動詞另外用「il tire」的語序重判原形與時態。
11-23 Owen：「選項也要可以點兩下就能翻譯」→ 選項另外標一份 opts_tok：[[第幾個選項的 tok…]…]
"""
import json, os, re, sys, collections
import spacy
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EX = os.path.join(ROOT, 'assets', 'tcf', 'exam')
FIELD = {'listening': 'script_fr', 'reading': 'text_fr'}
ETRE = set('aller venir arriver partir naître mourir rester tomber entrer sortir monter descendre retourner devenir revenir rentrer repartir parvenir intervenir survenir décéder apparaître'.split())
COMP = {('Ind', 'Pres'): 'PC', ('Ind', 'Imp'): 'PQP', ('Ind', 'Fut'): 'FA', ('Cnd', 'Pres'): 'CP', ('Sub', 'Pres'): 'SP', ('Ind', 'Past'): 'PA'}

def feats(t):
    m = t.morph.to_dict(); vf = m.get('VerbForm')
    if t.pos_ not in ('VERB', 'AUX') or not vf: return ''
    pn = (m.get('Person', '') + '.' + m.get('Number', '')[:1]).strip('.')
    if vf == 'Part' and m.get('Tense') == 'Past':
        ch = [c for c in t.children if c.lemma_ in ('avoir', 'être')]
        tense = [c for c in ch if c.dep_ == 'aux:tense']; pas = [c for c in ch if c.dep_ == 'aux:pass']
        if pas and not tense and t.lemma_ in ETRE: tense, pas = pas, []     # 「il est arrivé」spaCy 會標成被動，其實是複合過去式
        def pn_of(a): d = a.morph.to_dict(); return (d.get('Person', '') + '.' + d.get('Number', '')[:1]).strip('.')
        if tense:
            a = tense[-1]; d = a.morph.to_dict()
            if d.get('VerbForm') == 'Inf': return ('Pass.' if pas else '') + 'InfPast'
            code = COMP.get((d.get('Mood'), d.get('Tense')))
            if code: return ('Pass.' if pas else '') + code + ('.' + pn_of(a) if pn_of(a) else '')
        if pas:                                                              # 被動：時態看 être 本身（est validé＝被動現在式）
            a = pas[-1]; d = a.morph.to_dict()
            if d.get('VerbForm') == 'Inf': return 'Pass.Inf'
            return 'Pass.' + '.'.join(x for x in (d.get('Mood', ''), d.get('Tense', ''), pn_of(a)) if x)
        return 'PartPast'
    if vf == 'Part': return 'PartPres'
    if vf == 'Inf': return 'Inf'
    return '.'.join(x for x in (m.get('Mood', ''), m.get('Tense', ''), pn) if x)

INV = re.compile(r"^([A-Za-zÀ-ÿœ]+)(-(?:t-)?(?:il|elle|on|ils|elles|je|tu|nous|vous|ce))$", re.I)
PRON_PIECE = re.compile(r"^-(?:t-)?(?:il|elle|on|ils|elles|je|tu|nous|vous|ce)$|^-t$", re.I)
LEXICAL = {'rendez-vous'}

GLOSS_KEYS = None
def _gloss_has(k):
    global GLOSS_KEYS
    if GLOSS_KEYS is None:
        try:
            g = open(os.path.join(EX, 'gloss.js'), encoding='utf-8').read()
            GLOSS_KEYS = set(json.loads(g[g.index('=') + 1:].rstrip().rstrip(';')).keys())
        except Exception: GLOSS_KEYS = set()
    return k in GLOSS_KEYS

def reverb(verb, subj, nlp):
    """倒裝的動詞用「主詞＋動詞」的正常語序重判。spaCy 對 tire／porte 這種單獨出現會給字面當原形 → -er 動詞補 r"""
    d = nlp(('il' if subj in ('ce', 'on', 't') else subj) + ' ' + verb.lower()); v = d[-1]
    if v.pos_ not in ('VERB', 'AUX'): return None
    lem = v.lemma_
    if lem.lower() == verb.lower() and verb.lower().endswith('e') and _gloss_has(verb.lower() + 'r|VERB'): lem = verb.lower() + 'r'
    return ['' if lem.lower() == verb.lower() else lem, v.pos_, feats(v)]

def fix_inv(tok, text, nlp):
    """倒裝問句沒被拆開的（tire-t-il、est-elle）拆成兩個字；拆好的代名詞片段詞性一律改回代名詞；
       倒裝前面那個字（Est-ce 的 Est 曾被標成名詞「東方」）重判成動詞"""
    out = []
    for i, t in enumerate(tok):
        a, b, l, p, f = t
        w = text[a:b]; m = INV.match(w)
        if m and w.lower() not in LEXICAL:
            verb, pron = m.group(1), m.group(2)
            r = reverb(verb, re.sub(r'^-(t-)?', '', pron).lower(), nlp)
            if r:
                out.append([a, a + len(verb)] + r)
                out.append([a + len(verb), b, '', 'PRON', ''])
                continue
        nx = tok[i + 1] if i + 1 < len(tok) else None
        if nx and nx[0] == b and PRON_PIECE.match(text[nx[0]:nx[1]]) and w.lower() != 'rendez' and (p not in ('VERB', 'AUX') or (not l and w.lower().endswith('e'))):
            pw = text[nx[0]:nx[1]]
            if pw.lower() == '-t' and i + 2 < len(tok): pw = text[tok[i + 2][0]:tok[i + 2][1]]
            r = reverb(w, re.sub(r'^-(t-?)?', '', pw).lower() or 'il', nlp)
            if r: t = [a, b] + r
        if PRON_PIECE.match(w) and p != 'PRON':
            prev = out[-1] if out else None
            if not (prev and prev[1] == a and text[prev[0]:prev[1]].lower() == 'rendez'):
                t = [a, b, '', 'PRON', '']
        out.append(t)
    # 11-23：「je n'en revenais pas」spaCy 標成第三人稱 → -ais 結尾不可能是 il／elle，看前面三個字有沒有 je／tu
    for i, t in enumerate(out):
        w = text[t[0]:t[1]].lower(); m = re.match(r'^(Ind\.Imp|Ind\.Pres|Cnd\.Pres|Ind\.Fut)\.3\.S$', t[4] or '')
        if m and w.endswith('ais'):
            prev = [text[x[0]:x[1]].lower() for x in out[max(0, i - 3):i]]
            pn = '1' if any(x in ('je', "j'", 'j\u2019', 'j') for x in prev) else '2' if 'tu' in prev else None
            if pn: out[i] = t[:4] + [m.group(1) + '.' + pn + '.S']
    return out

def tag(nlp, texts):
    res = []
    for doc in nlp.pipe(texts, batch_size=64):
        tok = []
        for t in doc:
            if t.is_punct or t.is_space or not re.search(r'[A-Za-zÀ-ÿœ]', t.text): continue
            l = t.lemma_ if t.lemma_.lower() != t.text.lower() and t.pos_ != 'PRON' else ''
            f = feats(t)
            if t.dep_ in ('aux:tense', 'aux:pass') and t.head.i != t.i and feats(t.head):
                f = 'Aux@' + str(t.head.idx) + '|' + feats(t.head)
            tok.append([t.idx, t.idx + len(t.text), l, t.pos_, f])
        res.append(fix_inv(tok, doc.text, nlp))
    return res

def opt_ok(o):
    return isinstance(o, str) and o.strip() and not re.match(r'^Proposition\s+[a-dA-D]\b', o.strip())

def fix(skill):
    nlp = spacy.load('fr_core_news_md', disable=['ner'])
    p = os.path.join(EX, f'{skill}.json'); D = json.load(open(p, encoding='utf-8'))
    n_inv = 0; lem = collections.Counter()
    for t in D['tests']:
        for q in t['questions']:
            txt = q.get(FIELD[skill]) or ''
            if q.get('tok'):
                before = len(q['tok']); q['tok'] = fix_inv(q['tok'], txt, nlp); n_inv += len(q['tok']) - before
            opts = q.get('opts') or []
            if any(opt_ok(o) for o in opts):
                tt = tag(nlp, [o if opt_ok(o) else '' for o in opts])
                q['opts_tok'] = tt
                for o, tk in zip(opts, tt):
                    for a, b, l, pp, f in tk: lem[((l or o[a:b]).lower(), pp)] += 1
    json.dump(D, open(p, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    out = os.path.join(EX, '_gloss', f'lemmas_{skill}_opts.json')
    json.dump([[k[0], k[1], n] for k, n in lem.most_common()], open(out, 'w', encoding='utf-8'), ensure_ascii=False)
    print(skill, '倒裝拆開', n_inv, '處；選項原形＋詞性', len(lem), '→', out)

def main(skill):
    nlp = spacy.load('fr_core_news_md', disable=['ner'])
    p = os.path.join(EX, f'{skill}.json'); D = json.load(open(p, encoding='utf-8'))
    qs = [q for t in D['tests'] for q in t['questions'] if q.get(FIELD[skill])]
    lem = collections.Counter()
    for q, doc in zip(qs, nlp.pipe((q[FIELD[skill]] for q in qs), batch_size=64)):
        tok = []
        for t in doc:
            if t.is_punct or t.is_space or not re.search(r'[A-Za-zÀ-ÿœ]', t.text): continue
            l = t.lemma_ if t.lemma_.lower() != t.text.lower() and t.pos_ != 'PRON' else ''   # 代名詞 spaCy 會把 elle 標成 lui，不顯示原形
            f = feats(t)
            if t.dep_ in ('aux:tense', 'aux:pass') and t.head.i != t.i and feats(t.head):   # 助動詞：指向它幫忙組成的那個動詞
                f = 'Aux@' + str(t.head.idx) + '|' + feats(t.head)
            tok.append([t.idx, t.idx + len(t.text), l, t.pos_, f])
            lem[((l or t.text).lower(), t.pos_)] += 1
        q['tok'] = fix_inv(tok, q[FIELD[skill]], nlp)
    json.dump(D, open(p, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    os.makedirs(os.path.join(EX, '_gloss'), exist_ok=True); out = os.path.join(EX, '_gloss', f'lemmas_{skill}.json')   # ⛔ 放 gitignore 的考題資料夾，不進公開 repo
    json.dump([[k[0], k[1], n] for k, n in lem.most_common()], open(out, 'w', encoding='utf-8'), ensure_ascii=False)
    print(skill, len(qs), '題', sum(len(q['tok']) for q in qs), '字', len(lem), '個原形＋詞性')

if __name__ == '__main__':
    fix(sys.argv[2]) if sys.argv[1] == 'fix' else main(sys.argv[1])
