#!/usr/bin/env python3
"""exam_morph.py — 模考原文每個字標「原形＋詞性＋時態」（2026-11-12）
Owen：「可以我直接連點兩下原文就能知道翻譯或是哪個動詞的變形及時態」
用 spaCy fr_core_news_md（看上下文判斷），結果存進 listening.json／reading.json 每題的 tok：
  [[起, 迄, 原形(同字面就空字串), 詞性, 形態]]   形態例：Ind.Pres.3.S、PC.1.S（複合時態看助動詞）、Pass.Ind.Pres.3.S、Inf、PartPast；助動詞是 Aux@<主動詞起點>|<主動詞形態>
只標 script_fr（聽力）／text_fr（閱讀）。中文字義另外在 assets/tcf/exam/_gloss/。
用法：python3 tools/exam_morph.py [listening|reading]
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
        q['tok'] = tok
    json.dump(D, open(p, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    os.makedirs(os.path.join(EX, '_gloss'), exist_ok=True); out = os.path.join(EX, '_gloss', f'lemmas_{skill}.json')   # ⛔ 放 gitignore 的考題資料夾，不進公開 repo
    json.dump([[k[0], k[1], n] for k, n in lem.most_common()], open(out, 'w', encoding='utf-8'), ensure_ascii=False)
    print(skill, len(qs), '題', sum(len(q['tok']) for q in qs), '字', len(lem), '個原形＋詞性')

if __name__ == '__main__':
    main(sys.argv[1])
