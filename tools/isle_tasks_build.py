#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""isle_tasks_build.py — 每座口說島「能用在哪」：寫作第二題（講一段經驗＋為什麼）的題目對應（2026-11-28）
Owen 選「照這樣改」第 4 點：每座島標出能用在哪（口說第一題＝島自己的 q_fr；寫作第二題＝這裡依主題關鍵字對應）。
來源：assets/tcf/_analyse/TCF_sujets_ecriture.txt 的 TÂCHE 2（48 題，網路題庫 OCR，⛔ 只放私人空間 exam_isle/isle_tasks.js）
關鍵字是人工訂的主題詞；對不到的題不硬塞（寫作第二題多半是「一次活動／旅行／新體驗」）。"""
import json, os, re
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'assets/tcf/_analyse/TCF_sujets_ecriture.txt')
OUT = os.path.join(ROOT, 'assets/tcf/exam_isle/isle_tasks.js')
KW = {
    'AC1': [r'présentez-vous', r'vous présenter\b'],
    'AC2': [r'famill', r'parents', r'enfants?\b', r'anniversaire'],
    'AC3': [r'travail', r'métier', r'profession', r'collègue', r'emploi'],
    'AC4': [r'cours\b', r'études', r'université', r'école', r'apprendre', r'formation', r'étudiant'],
    'AC5': [r'loisir', r'musique', r'concert', r'spectacle', r'musée', r'exposition', r'sport', r'cinéma', r'festival', r'\barts?\b'],
    'AC6': [r'cuisine', r'restaurant', r'repas', r'gastronom', r'plat\b', r'recette'],
    'AC7': [r'voyage', r'vacances', r'séjour', r'touris', r'visite'],
    'AC8': [r'canada', r'québec', r'pays', r's.installer', r'immigr', r'étranger'],
    'AC9': [r'appartement', r'logement', r'maison', r'déménag', r'quartier', r'campagne'],
    'AC10': [r'achat', r'acheté', r'magasin', r'marché', r'produit', r'commande'],
    'AC11': [r'santé', r'sport', r'bien-être', r'médecin'],
    'AC12': [r'téléphone', r'internet', r'numérique', r'réseaux', r'application', r'technolog', r'ordinateur'],
    'AC13': [r'écolog', r'environnement', r'planète', r'nettoyage', r'recycl', r'nature'],
    'AC14': [r'avec (des |vos |ses |un\(e\) )?ami', r'voisin', r'fête', r'rencontr', r'accueilli'],
    'AC15': [r'projet', r'avenir', r'décidé', r'changé', r'nouvelle vie'],
}


def main():
    s = open(SRC, encoding='utf-8').read()
    t2 = s[s.index('TÂCHE 2 —'):s.index('TÂCHE 3 —')]
    items = [re.sub(r'\s+', ' ', x).strip() for x in re.split(r'\n\d+\.\s', t2)[1:]]
    out = {}
    for k, pats in KW.items():
        out[k] = [{'n': i + 1, 'fr': x} for i, x in enumerate(items) if any(re.search(p, x, re.I) for p in pats)]
    js = 'window.ISLE_TASKS=' + json.dumps({'w2': out, 'n2': len(items)}, ensure_ascii=False) + ';\n'
    open(OUT, 'w', encoding='utf-8').write(js)
    print('寫作第二題', len(items), '題；每島：', {k: len(v) for k, v in out.items()}, '對不到任何島：', sum(1 for i in range(len(items)) if not any(any(x['n'] == i + 1 for x in v) for v in out.values())))


if __name__ == '__main__':
    main()
