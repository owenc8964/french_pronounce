#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""isle_vocab.py — 口說島（ANSWER_CARDS）的單字進字典屋（2026-11-28）
Owen：「口說島跟 TCF 差很多，花時間背不太對」＋「但不管怎麼說，背單字很重要」→ 選「照這樣改」：
  島不再背整段稿（改「講重點」），⭐ 但島上的字照背 → 放上字典屋書架，例句＝他自己島上的那句（⛔ 不另外造句）。
做法：answer_cards.js 每座島最新版的法文 → spaCy 斷詞 → 只收實詞（名詞／動詞／形容詞／副詞），去掉太基本的（BASIC）；
  中文用模考字義表 gloss.js（lemma|詞性），查不到的不收（不憑空寫字義）。
輸出 assets/tcf/exam/vocab/isle_words.json → dev_server.vocab_build() 併進 vocab.json（跟 Lucas 詞庫同一套）
跑法：python3 tools/isle_vocab.py [--upload]"""
import json, os, re, subprocess, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'assets/tcf/exam/vocab/isle_words.json')
POS = {'NOUN', 'VERB', 'ADJ', 'ADV'}
# A1 常用字：照樣收進字典屋（可以自己按 ⭐），但預設不放上書架——書架只放真的要背的（Lucas 444 字已經在上面）
A1 = set('''manger boire dormir habiter travailler étudier apprendre lire écrire regarder écouter jouer acheter payer marcher
courir partir sortir rentrer arriver rester commencer finir aider chercher trouver penser croire connaître comprendre
préférer adorer détester visiter voyager cuisiner nager vivre choisir demander répondre appeler attendre
facile difficile content heureux triste beau joli cher important intéressant différent possible simple calme
vraiment surtout seulement ensemble parfois rarement vite lentement tard tôt demain hier
dentiste médecin professeur étudiant ami amie famille père mère fille fils mari femme frère sœur parent enfant bébé
école université classe cours examen livre film musique sport vélo voiture train bus métro avion
magasin restaurant café marché supermarché parc rue quartier appartement chambre cuisine
eau pain fruit légume viande poisson déjeuner dîner petit-déjeuner repas
matin soir nuit semaine mois heure minute janvier février mars avril mai juin juillet août septembre octobre novembre décembre
lundi mardi mercredi jeudi vendredi samedi dimanche été hiver printemps automne
argent prix travail métier emploi santé corps tête main'''.split())
# 太基本、早就反射化的（feedback：太基本的題不要放）
BASIC = set('''être avoir faire aller pouvoir vouloir devoir dire venir voir prendre savoir mettre donner parler aimer
bien très aussi plus moins beaucoup peu trop encore toujours jamais déjà souvent ici là maintenant aujourd'hui
bon grand petit nouveau premier autre même tout chose fois jour an année temps personne gens homme femme enfant
vie monde pays ville maison travail français france langue mot oui non alors donc ensuite après avant puis comme
être aller'''.split())


def cards():
    js = "global.window=global;process.stdout.write(eval(require('fs').readFileSync('answer_cards.js','utf8')+';JSON.stringify(ANSWER_CARDS)'))"
    return json.loads(subprocess.check_output(['node', '-e', js], cwd=ROOT))


def gloss():
    s = open(os.path.join(ROOT, 'assets/tcf/exam/gloss.js'), encoding='utf-8').read()
    return json.loads(s[s.index('=') + 1:].strip().rstrip(';'))


def main():
    import spacy
    nlp = spacy.load('fr_core_news_md', disable=['ner'])
    G = gloss(); W = {}; miss = set()
    for c in cards():
        v = c['versions'][-1]
        sents = [x.strip() for p in re.split(r'\n\s*\n', v['fr']) for x in re.split(r'(?<=[.!?…])\s+(?=[A-ZÀ-Ý«])', p.strip()) if x.strip()]
        for k, s in enumerate(sents):
            for t in nlp(s):
                if t.pos_ not in POS or t.is_stop and t.pos_ != 'NOUN':
                    continue
                lem = t.lemma_.lower().strip()
                if len(lem) < 3 or lem in BASIC or not re.match(r"^[a-zàâçéèêëîïôûùüÿœ'’-]+$", lem):
                    continue
                key = lem + '|' + t.pos_
                zh = G.get(key) or G.get(lem)
                if not zh:
                    miss.add(key); continue
                w = W.setdefault(key, {'key': key, 'lemma': lem, 'pos': t.pos_, 'zh': zh, 'forms': [], 'n_look': 0, 'tests': [],
                                       'star': lem not in A1, 'star_ts': 0, 'bank': 'rec', 'ex': [], 'cats': {'生字': 1}, 'cat': '生字',
                                       'first': 0, 'last': 0, 'src': 'isle', 'isles': []})
                if t.text not in w['forms']: w['forms'].append(t.text)
                if c['id'] not in w['isles']: w['isles'].append(c['id'])
                if len(w['ex']) < 3 and not any(e['fr'] == s for e in w['ex']):
                    w['ex'].append({'fr': s, 'w': t.text, 'test': c['id'], 'q': k + 1, 'skill': 'isle'})
    out = sorted(W.values(), key=lambda w: (-len(w['isles']), w['lemma']))
    json.dump({'v': 1, 'words': out}, open(OUT, 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
    print('島', len(cards()), '字', len(out), '字義表查不到（不收）', len(miss))
    if '--upload' in sys.argv:
        sys.path.insert(0, os.path.join(ROOT, 'tools'))
        import dev_server
        dev_server.vocab_build(); dev_server.vocab_upload(); print('vocab.json 重算並上傳')


if __name__ == '__main__':
    main()
