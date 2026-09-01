#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""產生「給老師的 TEF 選擇題卷」文件（第二份）。
資料全部來自本機 assets/tcf/tef/_analyse/ 底下已驗證的 JSON，不重新解析 PDF。
跑法（從 repo 根目錄）：python3 tools/tef_gen_prof_qcm.py  → 再 textutil -convert docx"""
import json, html, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # repo 根目錄（本檔在 tools/）
BASE = os.path.join(ROOT, "assets", "tcf", "tef", "_analyse")
def load(p): return json.load(open(os.path.join(BASE, p), encoding="utf-8"))

ex     = {c: load(f"exemples/TEF_exemples_{c}.json") for c in ("CE","CO","LS")}
tb     = {c: load(f"test_blanc/TEF_test_blanc_{c}.json") for c in ("CE","CO","LS")}
pistes = load("test_blanc/TEF_test_blanc_CO_pistes.json")["mapping"]
PISTE  = {r["question"]: r for r in pistes}

CSS = ('body{font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;font-size:10.5pt;line-height:1.45;'
 'margin:38px;color:#111}h1{font-size:20pt;border-bottom:3px solid #222;padding-bottom:7px;margin:0 0 4px}'
 'h2{font-size:15pt;margin-top:30px;background:#eceff3;padding:7px 11px;border-left:5px solid #1F4E79}'
 'h3{font-size:12pt;margin-top:20px;border-bottom:1px solid #ccc;padding-bottom:3px}'
 'h4{font-size:10.5pt;margin:14px 0 4px;color:#1F4E79}.lead{color:#444;margin:3px 0 15px}'
 '.box{background:#f2f4f7;border:1px solid #c8cfd8;padding:11px 15px;margin:13px 0}'
 '.warn{background:#fdf3e7;border:1px solid #e0b184;padding:11px 15px;margin:13px 0}'
 '.doc{background:#f7f8fa;border-left:3px solid #999;padding:8px 13px;margin:6px 0;font-size:10pt}'
 'table{border-collapse:collapse;width:100%;margin:12px 0;font-size:10pt}'
 'th,td{border:1px solid #bbb;padding:6px 9px;text-align:left;vertical-align:top}th{background:#eceff3}'
 'ol{margin:5px 0 0 22px;padding:0}li{margin-bottom:4px}ul{margin:4px 0 0 20px}'
 '.sm{font-size:9.5pt;color:#555}.q{margin:9px 0 0}.o{margin:1px 0 0 18px}'
 '.rep{color:#1F4E79;font-weight:bold}.img{color:#a05a00;font-size:9.5pt;margin-left:18px}')

E = html.escape

import re as _re
def clean_stem(t):
    """題幹清理：OCR 從圖表頁撈到的軸標／圖號不是題幹，換成明確指引。
    判準＝去掉「Graphique N」「°C」「JF MAM」這類碎片後，還剩不剩下真正的字。"""
    t = _re.sub(r"Graphiques?\s*\d", " ", t)
    t = _re.sub(r"[°%]C?", " ", t)
    t = _re.sub(r"\b[A-Z']{1,6}\b", " ", t)          # JF MAM'J' 這種全大寫碎片
    t = _re.sub(r"[\d+\-–]", " ", t)
    reste = _re.findall(r"[a-zà-ÿ]{3,}", t)
    return len(reste) >= 2
out = ['<html><head><meta charset="utf-8"><style>%s</style></head><body>' % CSS]
A = out.append

# ══════════════ en-tête ══════════════
A('<h1>TEF Canada — les épreuves à choix multiple</h1>')
A('<p class="lead">Compréhension écrite · Compréhension orale · Lexique et structure — '
  'format vérifié, barèmes officiels et questions avec corrigé</p>')
A('<div class="box"><b>Ce document complète</b> « TEF Canada — banque de sujets » (expression orale et écrite). '
  'Il porte sur les épreuves à <b>choix multiple</b>, absentes du premier document.<br>'
  '<b>Origine.</b> Partie 3 : <i>Exemples de questions TEF</i>, livrets publiés par le '
  '<b>Centre de langue française de la CCI Paris Ile-de-France</b> (documents officiels, diffusion libre). '
  'Parties 4 à 6 : test blanc de <i>TEF Nouvelle Édition</i> (Hachette FLE, 2023), ouvrage acheté par l\'élève, '
  'reproduit pour un usage pédagogique privé.<br>'
  '<b>Objectif de l\'élève :</b> niveau <b>B2 / NCLC 7</b> avant le 1<sup>er</sup> juin 2027.</div>')

A('<div class="warn"><b>À lire avant d\'utiliser ce document (mise à jour du 31/08/2026).</b> '
  'Deux vérifications faites sur les sites officiels changent la façon d\'utiliser ce matériel :<br>'
  '<b>1.</b> L\'épreuve de <b>lexique et structure n\'est pas exigée</b> pour une demande d\'immigration : '
  'le TEF Canada n\'en comporte que quatre (CE, CO, EE, EO). '
  'La partie 4 reste un excellent matériel de <b>grammaire et de vocabulaire</b>, mais ce n\'est pas une épreuve notée.<br>'
  '<b>2.</b> Il n\'existe <b>aucun centre TEF à Taïwan</b> (vérifié sur la carte officielle des centres, CCI Paris) : '
  'le centre le plus proche est à Tokyo. L\'élève passera donc très probablement le <b>TCF Canada</b>, '
  'proposé à Taipei quatre fois par an.<br>'
  '⭐ <b>Ce matériel garde tout son intérêt</b> : les deux examens évaluent les mêmes quatre compétences, '
  'et les types de documents (annonces, articles de presse, documents administratifs, interviews radio) sont très proches.</div>')

# ══════════════ 1. les deux examens ══════════════
A('<h2>1. Les deux examens en un coup d\'œil</h2>')
A('<p class="sm">Informations vérifiées le 31/08/2026 sur : le français des affaires (CCI Paris Ile-de-France), '
  'France Éducation international / réseau Alliance Française, IRCC (canada.ca) et Alliance Française de Taïwan.</p>')
A('<table><tr><th>&nbsp;</th><th>TEF Canada</th><th>TCF Canada</th></tr>'
  '<tr><td>Compréhension orale</td><td>40 questions · 40 min</td><td>39 questions · 35 min</td></tr>'
  '<tr><td>Compréhension écrite</td><td>40 questions · 60 min</td><td>39 questions · 60 min</td></tr>'
  '<tr><td>Expression écrite</td><td>2 sections · 60 min</td><td>3 tâches · 60 min</td></tr>'
  '<tr><td>Expression orale</td><td>2 sections · 15 min</td><td>3 tâches · 12 min</td></tr>'
  '<tr><td>Épreuve de grammaire / lexique</td><td colspan="2"><b>Aucune dans les deux cas</b> pour l\'immigration</td></tr>'
  '<tr><td>Échelles</td><td>0–699 pour les quatre</td><td>0–699 (CO, CE) · <b>0–20</b> (EE, EO)</td></tr>'
  '<tr><td>Validité</td><td colspan="2">2 ans</td></tr>'
  '<tr><td>À Taipei ?</td><td><b>Non</b> — aucun centre à Taïwan</td>'
  '<td><b>Oui</b> — Alliance Française, 4 sessions par an</td></tr></table>')

A('<h3>1.1 Seuils NCLC 7 (le niveau visé)</h3>')
A('<table><tr><th>Compétence</th><th>TEF Canada</th><th>TCF Canada</th></tr>'
  '<tr><td>Compréhension écrite</td><td>434–461</td><td>453–498</td></tr>'
  '<tr><td>Compréhension orale</td><td>434–461</td><td>458–502</td></tr>'
  '<tr><td>Expression écrite</td><td>428–471</td><td>10–11 (sur 20)</td></tr>'
  '<tr><td>Expression orale</td><td>456–493</td><td>10–11 (sur 20)</td></tr></table>')
A('<div class="box"><b>Deux points décisifs pour organiser le travail :</b><br>'
  '<b>1.</b> Les quatre compétences sont évaluées <b>séparément, sans moyenne</b> — '
  'c\'est <b>la plus faible qui détermine le niveau</b>. Un excellent score en lecture ne rattrape pas l\'oral.<br>'
  '<b>2.</b> Les seuils ne sont <b>pas identiques d\'une compétence à l\'autre</b> '
  '(au TCF : 453 en lecture mais 458 en écoute ; au TEF : 456 à l\'oral contre 428 à l\'écrit).<br>'
  '<span class="sm">Barème TEF valable pour les tests passés après le 10 décembre 2023. '
  'Les barèmes antérieurs (échelles 0–300 / 0–450) sont abandonnés.</span></div>')

# ══════════════ 2. format des QCM ══════════════
A('<h2>2. Format des épreuves à choix multiple du TEF</h2>')
A('<table><tr><th>Épreuve</th><th>Questions</th><th>Durée</th><th>Statut pour l\'immigration</th></tr>'
  '<tr><td>Compréhension écrite (CE)</td><td>40</td><td>60 min</td><td><b>obligatoire</b></td></tr>'
  '<tr><td>Compréhension orale (CO)</td><td>40</td><td>40 min</td>'
  '<td><b>obligatoire</b> — chaque audio n\'est diffusé <b>qu\'une fois</b></td></tr>'
  '<tr><td>Lexique et structure (LS)</td><td>40</td><td>30 min</td>'
  '<td><b>non exigée</b> — matériel d\'entraînement uniquement</td></tr></table>')

A('<h3>2.1 Compréhension écrite</h3>')
A('<table><tr><th>Questions</th><th>Support</th><th>Objectif</th></tr>'
  '<tr><td>1 à 7</td><td>Documents de la vie quotidienne</td><td>Comprendre des documents simples</td></tr>'
  '<tr><td>8 à 17</td><td>Phrases et textes lacunaires</td><td>Comprendre le sens général d\'une phrase et d\'un texte</td></tr>'
  '<tr><td>18 à 22</td><td>Lecture rapide de textes et de graphiques</td><td>Comprendre des séries de documents divers</td></tr>'
  '<tr><td>23 à 32</td><td>Documents administratifs et professionnels</td><td>Comprendre ce type de documents</td></tr>'
  '<tr><td>33 à 40</td><td>Articles de presse</td><td>Comprendre des articles de presse</td></tr></table>')

A('<h3>2.2 Compréhension orale</h3>')
A('<table><tr><th>Questions</th><th>Support</th><th>Objectif</th></tr>'
  '<tr><td>1 à 4</td><td>Conversations avec dessins</td><td>Comprendre des dialogues</td></tr>'
  '<tr><td>5 à 20</td><td>Annonces publiques, messages sur répondeur, micros-trottoirs</td><td>Comprendre des messages courts</td></tr>'
  '<tr><td>21 à 30</td><td>Chroniques radio, interviews, reportage</td><td>Comprendre des interviews</td></tr>'
  '<tr><td>31 à 40</td><td>Documents audios divers</td><td>Comprendre des documents de la vie quotidienne</td></tr></table>')

A('<h3>2.3 Lexique et structure</h3>')
A('<table><tr><th>Questions</th><th>Support</th><th>Objectif</th></tr>'
  '<tr><td>1 à 14</td><td>Phrases lacunaires — lexique</td><td>Sens d\'un mot et son usage dans une phrase</td></tr>'
  '<tr><td>15 à 20</td><td>Textes lacunaires — lexique</td><td>Sens d\'un mot et son usage dans un texte</td></tr>'
  '<tr><td>21 à 34</td><td>Phrases lacunaires — syntaxe</td><td>Sens grammatical d\'une phrase</td></tr>'
  '<tr><td>35 à 40</td><td>Textes lacunaires — cohésion</td><td>Organisation logique de la phrase ou du texte</td></tr></table>')

A('<h3>2.4 Barème du test blanc</h3>')
A('<p class="sm">Barème d\'auto-évaluation de <i>TEF Nouvelle Édition</i> (Hachette, 2023), identique pour les trois épreuves. '
  'Estimation de niveau, et non calcul officiel.</p>')
A('<table><tr><th>Bonnes réponses / 40</th><th>0–6</th><th>7–15</th><th>16–21</th><th>22–28</th><th>29–35</th><th>36–40</th></tr>'
  '<tr><td>Niveau estimé</td><td>A1</td><td>A2</td><td>B1</td><td><b>B2</b></td><td>C1</td><td>C2</td></tr></table>')
A('<div class="box"><b>Cible d\'entraînement : 22 bonnes réponses sur 40.</b> '
  'C\'est le seuil du B2, donc du NCLC 7 visé.</div>')

# ══════════════ blocs de questions ══════════════
TITRES = {"CE":"Compréhension écrite","CO":"Compréhension orale","LS":"Lexique et structure"}
def bloc(qs, note=None, audio=False):
    if note: A('<p class="sm">%s</p>' % note)
    for q in qs:
        n = q["n"]
        tag = ""
        if audio and n in PISTE:
            tag = ' <span class="sm">[piste %03d]</span>' % PISTE[n]["piste"]
        stem = q["enonce"].strip()
        if clean_stem(stem):
            stem = E(stem)
        else:
            m = _re.match(r"^\((\d)\)$", stem)
            stem = ("<i>blanc (%s) du texte imprimé dans l'ouvrage</i>" % m.group(1)) if m else \
                   "<i>(énoncé porté par le document imprimé — voir l'ouvrage)</i>" 
        A('<p class="q"><b>%d.</b> %s%s</p>' % (n, stem, tag))
        opts = q["options"]
        if len(opts) < 4:
            A('<div class="img">⚠️ Les propositions de cette question sont des images imprimées dans le livret '
              '— voir l\'ouvrage.</div>')
        for k in "ABCDabcd":
            if k in opts:
                A('<div class="o">%s. %s</div>' % (k.upper(), E(opts[k])))
        if q.get("reponse"):
            A('<div class="o rep">→ %s</div>' % q["reponse"].upper())

A('<h2>3. Exemples officiels de questions (CCI Paris Ile-de-France)</h2>')
A('<p class="lead">Questions publiées par l\'organisme qui conçoit le TEF. '
  'Elles donnent le <b>format exact</b>, mais pas la difficulté réelle du test.</p>')
for i, c in enumerate(("CE","CO","LS"), start=1):
    qs = ex[c]["questions"]
    A('<h3>3.%d %s — %d questions</h3>' % (i, TITRES[c], len(qs)))
    if c == "CE":
        bloc(qs, "Les questions 1 à 4, 12 et 13 renvoient à des documents ou des graphiques imprimés dans le livret.")
    elif c == "CO":
        bloc(qs, "Les bandes-son sont téléchargeables sur le site du français des affaires ; l'élève les possède.")
    else:
        bloc(qs)

A('<h2>4. Test blanc — lexique et structure (40 questions)</h2>')
A('<p class="lead"><b>Épreuve non exigée pour l\'immigration</b>, mais matériel de grammaire et de vocabulaire '
  'directement exploitable en cours : phrases lacunaires, syntaxe, connecteurs logiques.<br>'
  '<span class="sm">Source : <i>TEF Nouvelle Édition</i>, Hachette FLE 2023, p. 181–188 (corrigé p. 220).</span></p>')
bloc(tb["LS"]["questions"])

A('<h2>5. Test blanc — compréhension écrite (40 questions)</h2>')
A('<p class="lead">Les énoncés et les propositions sont reproduits ci-dessous. '
  '<b>Les documents supports</b> (affiches, courriels, graphiques, articles) <b>restent dans l\'ouvrage</b> : '
  'l\'élève l\'apporte en cours.<br>'
  '<span class="sm">Source : <i>TEF Nouvelle Édition</i>, p. 155–171 (corrigé p. 219).</span></p>')
bloc(tb["CE"]["questions"])

A('<h2>6. Test blanc — compréhension orale (40 questions)</h2>')
A('<p class="lead">Le numéro de piste audio est indiqué à côté de chaque question. '
  'Le dossier audio contient 94 pistes ; <b>les pistes 057 à 094</b> correspondent à ce test blanc.<br>'
  '<span class="sm">Source : <i>TEF Nouvelle Édition</i>, p. 172–180 (corrigé p. 219).</span></p>')
A('<table><tr><th>Partie</th><th>Questions</th><th>Pistes</th></tr>')
_seen = []
for r in pistes:
    if not _seen or _seen[-1][0] != r["section"]:
        _seen.append([r["section"], [], []])
    _seen[-1][1].append(r["question"]); _seen[-1][2].append(r["piste"])
for sec, qs_, ps in _seen:
    rng = "%03d" % min(ps) if min(ps) == max(ps) else "%03d–%03d" % (min(ps), max(ps))
    A('<tr><td>%s</td><td>%d–%d</td><td>%s</td></tr>' % (E(sec), qs_[0], qs_[-1], rng))
A('</table>')
A('<p class="sm">Interviews et reportage : <b>deux questions par piste</b>. Ailleurs : une question par piste. '
  'Les pistes 071 et 075 sont les consignes des deux micros-trottoirs et ne portent aucune question.</p>')
bloc(tb["CO"]["questions"], audio=True)

# ══════════════ corrigés ══════════════
A('<h2>7. Corrigés du test blanc</h2>')
for c in ("CE","CO","LS"):
    k = tb[c]["corrige"]
    A('<h4>%s</h4>' % TITRES[c])
    A('<p>%s</p>' % " · ".join("<b>%d</b> %s" % (n, k.get(str(n), k.get(n, "?"))) for n in range(1, 41)))

# ══════════════ inventaire ══════════════
A('<h2>8. Autres matériaux disponibles</h2>')
A('<p class="lead">Ce que l\'élève possède déjà et que vous pouvez lui demander de préparer.</p>')
A('<table><tr><th>Matériau</th><th>Quantité</th><th>Corrigé ?</th><th>Usage possible en cours</th></tr>'
  '<tr><td>Textes longs avec questions (compréhension écrite)</td><td>102 textes / 394 questions</td>'
  '<td><b>non</b></td><td>Lecture à la maison, correction en cours</td></tr>'
  '<tr><td>Faits divers pour l\'expression écrite section A</td><td>113 faits / 330 détails</td>'
  '<td>sans objet</td><td>Amorces de rédaction : titre + détails à développer</td></tr>'
  '<tr><td>Sujets d\'expression orale sections A et B</td><td>86 + 61 sujets</td><td>sans objet</td>'
  '<td>Jeux de rôles (voir le premier document)</td></tr>'
  '<tr><td>Sujets d\'expression écrite sections A et B</td><td>42 + 61 sujets</td><td>sans objet</td>'
  '<td>Rédactions (voir le premier document)</td></tr>'
  '<tr><td>Activités d\'entraînement de <i>TEF Nouvelle Édition</i></td><td>plus de 340</td>'
  '<td><b>oui</b>, avec transcriptions</td><td>Travail méthodologique par type de question</td></tr></table>')
A('<p class="sm">Document préparé pour le cours particulier de l\'élève. Usage privé.</p>')
A('</body></html>')

dst = os.path.join(ROOT, "assets", "tcf", "tef", "_pour_le_prof", "_remplaces", "TEF_Canada_epreuves_QCM.html")
open(dst, "w", encoding="utf-8").write("\n".join(out))
print("✅", os.path.relpath(dst, ROOT), len("\n".join(out)), "字元")
