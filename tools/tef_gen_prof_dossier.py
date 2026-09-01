#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""給老師的 TEF Canada 單一檔案：格式 ＋ 應試方法 ＋ 全部題目 ＋ 選擇題與正解。
取代先前分開的 TEF_Canada_banque_de_sujets 與 TEF_Canada_epreuves_QCM。
跑法（從 repo 根目錄）：python3 tools/tef_gen_prof_dossier.py → textutil -convert docx
⚠️ 方法論那章來自 TEF Nouvelle Edition（Hachette 2023）的 conseils méthodologiques，
   **改寫不照抄**；頁碼標在各節末，方便老師回書。"""
import json, html, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # repo 根目錄（本檔在 tools/）
BASE = os.path.join(ROOT, "assets", "tcf", "tef", "_analyse")   # ⛔ 材料在 gitignore 的資料夾裡
if not os.path.isdir(BASE):
    raise SystemExit(f"找不到題庫資料夾 {BASE}\n"
                     "→ 這支只有程式碼進 git，資料在 assets/tcf/（商業教材，不進 repo）。")
L = lambda p: json.load(open(os.path.join(BASE, p), encoding="utf-8"))

oralA  = L("TEF_sujets_oral_sectionA.json")
oralB  = L("TEF_sujets_oral_sectionB.json")
ecritA = L("TEF_sujets_ecrit_sectionA.json")
ecritB = L("TEF_sujets_ecrit_sectionB.json")
faits  = L("TEF_faits_divers_sectionA.json")
ex     = {c: L(f"exemples/TEF_exemples_{c}.json") for c in ("CE","CO","LS")}
tb     = {c: L(f"test_blanc/TEF_test_blanc_{c}.json") for c in ("CE","CO","LS")}
pistes = L("test_blanc/TEF_test_blanc_CO_pistes.json")["mapping"]
PISTE  = {r["question"]: r for r in pistes}

CSS = ('body{font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;font-size:10.5pt;line-height:1.45;'
 'margin:38px;color:#111}h1{font-size:20pt;border-bottom:3px solid #222;padding-bottom:7px;margin:0 0 4px}'
 'h2{font-size:15pt;margin-top:30px;background:#eceff3;padding:7px 11px;border-left:5px solid #1F4E79}'
 'h3{font-size:12pt;margin-top:20px;border-bottom:1px solid #ccc;padding-bottom:3px}'
 'h4{font-size:10.5pt;margin:14px 0 4px;color:#1F4E79}.lead{color:#444;margin:3px 0 15px}'
 '.box{background:#f2f4f7;border:1px solid #c8cfd8;padding:11px 15px;margin:13px 0}'
 '.warn{background:#fdf3e7;border:1px solid #e0b184;padding:11px 15px;margin:13px 0}'
 '.key{background:#eaf1f8;border:1px solid #9dbdd9;padding:11px 15px;margin:13px 0}'
 '.doc{background:#f7f8fa;border-left:3px solid #999;padding:8px 13px;margin:6px 0;font-size:10pt}'
 'table{border-collapse:collapse;width:100%;margin:12px 0;font-size:10pt}'
 'th,td{border:1px solid #bbb;padding:6px 9px;text-align:left;vertical-align:top}th{background:#eceff3}'
 'ol{margin:5px 0 0 22px;padding:0}li{margin-bottom:4px}ul{margin:4px 0 0 20px}'
 '.sm{font-size:9.5pt;color:#555}.q{margin:9px 0 0}.o{margin:1px 0 0 18px}'
 '.rep{color:#1F4E79;font-weight:bold}.img{color:#a05a00;font-size:9.5pt;margin-left:18px}')
E = html.escape
import re as _re
def has_words(t):
    t = _re.sub(r"Graphiques?\s*\d", " ", t); t = _re.sub(r"[°%]C?", " ", t)
    t = _re.sub(r"\b[A-Z']{1,6}\b", " ", t); t = _re.sub(r"[\d+\-–]", " ", t)
    return len(_re.findall(r"[a-zà-ÿ]{3,}", t)) >= 2

o = ['<html><head><meta charset="utf-8"><style>%s</style></head><body>' % CSS]; A = o.append

A('<h1>TEF Canada — dossier complet</h1>')
A('<p class="lead">Format de l\'examen · méthodologie · banque de sujets · épreuves à choix multiple avec corrigés</p>')
A('<div class="box"><b>Un seul document.</b> Il réunit tout ce dont nous disposons sur le TEF Canada : '
  'le format officiel, les conseils méthodologiques, l\'ensemble des sujets d\'expression orale et écrite, '
  'et les épreuves à choix multiple avec leurs corrigés.<br>'
  '<b>Origine des contenus.</b> Format et méthodologie : <i>Le français des affaires</i> (CCI Paris Ile-de-France) '
  'et <i>TEF Nouvelle Édition</i> (Hachette FLE, 2023), ouvrage acheté par l\'élève — '
  '<b>reformulés, non recopiés</b>. Sujets : compilation d\'entraînement achetée en ligne. '
  'Exemples officiels : livrets publiés librement par la CCI Paris.</div>')
A('<div class="warn"><b>À savoir avant de vous en servir.</b> '
  'Il n\'existe <b>aucun centre TEF à Taïwan</b> ; l\'élève passera donc le <b>TCF Canada</b>, '
  'proposé à Taipei (voir le document « L\'examen visé »). '
  'Ce dossier reste néanmoins utile : les deux examens évaluent les mêmes quatre compétences et '
  'les mêmes gestes — poser des questions pour obtenir une information, défendre un avis face à des objections — '
  'et les types de documents sont très proches. <b>Tout ce qui suit peut donc servir d\'entraînement</b>, '
  'à condition de garder en tête les différences de format signalées au fil du texte.</div>')

# ══ 1 format ══
A('<h2>1. Le format officiel</h2>')
A('<h3>1.1 Les quatre épreuves obligatoires</h3>')
A('<table><tr><th>Épreuve</th><th>Format</th><th>Durée</th><th>Notation</th></tr>'
  '<tr><td>Compréhension écrite</td><td>40 questions à choix multiple</td><td>60 min</td><td>0–699</td></tr>'
  '<tr><td>Compréhension orale</td><td>40 questions à choix multiple</td>'
  '<td>40 min — chaque audio n\'est diffusé <b>qu\'une fois</b></td><td>0–699</td></tr>'
  '<tr><td>Expression écrite</td><td>2 sections</td><td>60 min</td><td>0–699</td></tr>'
  '<tr><td>Expression orale</td><td>2 sections, en face à face</td><td>15 min</td><td>0–699</td></tr></table>')
A('<div class="warn"><b>L\'épreuve de lexique et structure (40 questions, 30 min) n\'est pas exigée</b> '
  'pour une demande d\'immigration. Elle existe dans le TEF, mais ne compte pas ici. '
  'Nous la donnons quand même au chapitre 6 : c\'est un bon matériel de grammaire et de vocabulaire.<br>'
  'Les quatre épreuves ci-dessus doivent en revanche être passées <b>le même jour</b>.</div>')
A('<h3>1.2 Conditions de passation</h3>')
A('<ul><li>Les épreuves à choix multiple se passent <b>sur ordinateur</b>.</li>'
  '<li><b>Aucun document ni appareil électronique</b> n\'est autorisé (pas de dictionnaire).</li>'
  '<li>Les documents proposés couvrent <b>les six niveaux du CECR (A1 à C2) de façon équilibrée</b> : '
  'c\'est ce qui permet de situer le candidat. Il est normal de ne pas tout comprendre.</li>'
  '<li>Correction automatique pour les QCM ; l\'expression écrite est corrigée par <b>deux correcteurs indépendants</b>.</li>'
  '<li>Résultats <b>valables 2 ans</b>.</li></ul>')
A('<h3>1.3 Le score visé</h3>')
A('<table><tr><th>Compétence</th><th>Échelle</th><th><b>NCLC 7 — la cible</b></th></tr>'
  '<tr><td>Compréhension écrite</td><td>0–699</td><td><b>434 – 461</b></td></tr>'
  '<tr><td>Compréhension orale</td><td>0–699</td><td><b>434 – 461</b></td></tr>'
  '<tr><td>Expression écrite</td><td>0–699</td><td><b>428 – 471</b></td></tr>'
  '<tr><td>Expression orale</td><td>0–699</td><td><b>456 – 493</b></td></tr></table>')
A('<p class="sm">Barème d\'IRCC applicable aux tests passés après le 10 décembre 2023. '
  'Les quatre compétences sont évaluées <b>séparément, sans moyenne</b> : c\'est la plus faible qui compte. '
  'Les anciennes échelles (0–300 / 0–360 / 0–450), encore très présentes sur Internet, sont périmées.</p>')

# ══ 2 méthodologie ══
A('<h2>2. Méthodologie — ce que l\'examen attend concrètement</h2>')
A('<p class="lead">Synthèse des conseils méthodologiques publiés dans <i>TEF Nouvelle Édition</i> '
  '(Hachette FLE, 2023). Reformulés. Les pages sont indiquées pour retrouver l\'original.</p>')

A('<h3>2.1 Expression écrite — section A : terminer un article</h3>')
A('<table><tr><th>Critère</th><th>Ce qui est attendu</th></tr>'
  '<tr><td>Objectif</td><td>Raconter <b>la suite</b> de l\'histoire et lui donner <b>une fin</b>. '
  'Apporter des informations <b>nouvelles</b> qui font avancer le récit.</td></tr>'
  '<tr><td>À ne pas faire</td><td><b>Recopier le début de l\'article</b> : cela prend du temps et n\'est pas noté.</td></tr>'
  '<tr><td>Longueur</td><td>80 mots est un <b>minimum</b>, pas un objectif. En dessous, les correcteurs '
  'ne peuvent pas évaluer. Beaucoup plus long fait perdre du temps et multiplie les erreurs.</td></tr>'
  '<tr><td>Style</td><td><b>Formel, journalistique</b> — comme si le texte paraissait vraiment dans un journal. '
  'L\'humour est permis, la vulgarité non. <b>Respecter le temps du début de l\'article</b> : '
  's\'il commence au passé, continuer au passé.</td></tr>'
  '<tr><td>Cohésion</td><td>Marquer l\'enchaînement des faits : <i>ensuite, peu après, le lendemain, '
  'quelques heures plus tard, la veille, trois jours plus tôt</i>…</td></tr>'
  '<tr><td>Langue</td><td>Chercher des phrases <b>riches et complexes</b> plutôt que nombreuses. '
  '<b>Éviter le vocabulaire oral</b> (<i>vachement</i>, <i>trop</i>…).</td></tr>'
  '<tr><td>Détail utile</td><td>Le lieu est souvent indiqué dans le sujet. On peut en tenir compte ou non, '
  'mais le texte doit rester <b>cohérent</b> : si le sujet se passe au Cameroun, ne pas le situer sous la neige. '
  'En cas de doute sur le lieu, rester neutre.</td></tr></table>')
A('<p class="sm">D\'après les pages 110–111 et 115 de l\'ouvrage.</p>')

A('<h3>2.2 Expression écrite — section B : donner son avis</h3>')
A('<table><tr><th>Critère</th><th>Ce qui est attendu</th></tr>'
  '<tr><td>Objectif</td><td>Traiter la thématique et <b>proposer plusieurs arguments</b>. '
  '⭐ On peut être pour, contre, <b>ou sans avis tranché</b> : ce qui est évalué, c\'est le développement des idées.</td></tr>'
  '<tr><td>Longueur</td><td>200 mots <b>minimum</b>. Même remarque que pour la section A sur les textes trop longs.</td></tr>'
  '<tr><td>Style</td><td>Formel — comme un courrier des lecteurs. Aucune familiarité, aucune insulte.</td></tr>'
  '<tr><td>Introduction</td><td>Une phrase simple qui va à l\'essentiel : '
  '<i>« Je souhaite réagir à l\'idée selon laquelle… »</i>, <i>« Je me permets d\'apporter ma contribution au sujet de… »</i>.<br>'
  '⛔ <b>Ne pas rédiger d\'en-tête</b> (nom, adresse, coordonnées du journal) : ce n\'est pas noté. '
  '⛔ Pas de longue présentation de soi ni de compliments au journal : hors sujet.</td></tr>'
  '<tr><td>Cohésion</td><td><i>en premier lieu, de plus, en outre, au contraire, a contrario, par ailleurs</i>…</td></tr>'
  '<tr><td>Conclusion</td><td>Simple et cordiale : <i>« Merci pour votre lecture. »</i>, <i>« Bien cordialement. »</i> '
  'Pas de longue conclusion.</td></tr></table>')
A('<p class="sm">D\'après les pages 118–119 de l\'ouvrage.</p>')
A('<div class="key"><b>Ce qui frappe dans ces deux fiches :</b> une bonne partie des conseils consiste à '
  '<b>ne pas faire</b> ce qu\'un candidat consciencieux ferait spontanément — recopier l\'énoncé, '
  'soigner un en-tête, écrire une longue introduction, faire le plus long possible. '
  'Ce sont des réflexes coûteux qui ne rapportent aucun point.</div>')

A('<h3>2.3 Expression orale — section A : obtenir des informations</h3>')
A('<table><tr><th>Critère</th><th>Ce qui est attendu</th></tr>'
  '<tr><td>Avant de commencer</td><td>La consigne et le document sont lus <b>avec l\'examinateur</b>. '
  'On peut lui poser des questions et demander des explications si ce n\'est pas clair.</td></tr>'
  '<tr><td>Objectif</td><td>Poser des questions, <b>faire préciser les réponses</b>, aborder toutes les '
  'thématiques importantes, réagir naturellement. ⛔ <b>Ne pas parler de soi</b> ni d\'autre chose.</td></tr>'
  '<tr><td>Durée</td><td>5 minutes. <b>C\'est l\'examinateur qui gère le temps</b>, pas le candidat.</td></tr>'
  '<tr><td>Pour démarrer</td><td>C\'est l\'examinateur qui commence. Dire simplement qu\'on a vu une annonce '
  'pour X et qu\'on souhaite des informations, puis <b>poser la première question qui vient</b> '
  '(le prix, les dates, le public concerné). La conversation devient ensuite naturelle.</td></tr>'
  '<tr><td>Ton</td><td><b>Formel : « vous »</b>, comme un vrai appel à une entreprise.</td></tr>'
  '<tr><td>⭐ Conseils</td><td>Écouter les réponses et <b>demander des précisions</b> si elles sont incomplètes.<br>'
  'Si on ne connaît pas une activité mentionnée ou illustrée, <b>demander de quoi il s\'agit — '
  'ce n\'est pas pénalisant, au contraire</b>.<br>'
  '<b>Aucune question n\'est idiote</b> ; les examinateurs sont préparés à tout.<br>'
  'On peut demander des renseignements <b>pour quelqu\'un d\'autre</b> (un ami, une voisine, une personne âgée).<br>'
  'C\'est un jeu de rôles : aucune obligation réelle, donc aucune raison de se censurer.</td></tr></table>')
A('<p class="sm">D\'après les pages 132–133 de l\'ouvrage.</p>')

A('<h3>2.4 Expression orale — section B : convaincre</h3>')
A('<table><tr><th>Critère</th><th>Ce qui est attendu</th></tr>'
  '<tr><td>Objectif</td><td><b>Présenter la situation</b>, répondre aux questions, aborder toutes les '
  'thématiques importantes, réagir naturellement.</td></tr>'
  '<tr><td>Durée</td><td>10 minutes — cela peut sembler long, mais c\'est ce qui permet d\'évaluer correctement. '
  'Là encore, le temps est géré par l\'examinateur.</td></tr>'
  '<tr><td>Le rôle du jury</td><td>Il <b>fait comme s\'il ne connaissait pas la situation</b>. C\'est lui qui commence.</td></tr>'
  '<tr><td>Pour démarrer</td><td>1) Expliquer de quoi il s\'agit <b>avec ses propres mots</b>, avec un maximum de détails — '
  '⛔ on peut s\'aider du document <b>mais pas le lire</b>. '
  '2) Dire à l\'examinateur qu\'on a pensé à lui pour cette activité et <b>lui demander son avis</b>.</td></tr>'
  '<tr><td>Ton</td><td>Naturel, comme avec quelqu\'un qu\'on connaît. Plutôt <b>« tu »</b>, sans excès de familiarité.</td></tr>'
  '<tr><td>Transitions</td><td><i>« J\'ai un autre argument à te proposer. »</i>, <i>« J\'ai oublié de te dire… »</i>, '
  '<i>« Je comprends tes réticences, mais… »</i></td></tr></table>')
A('<p class="sm">D\'après les pages 144–145 de l\'ouvrage.</p>')

A('<h3>2.5 Compréhension écrite — sur quoi portent les questions</h3>')
A('<ul><li><b>La nature du document</b> : publicité, facture, mode d\'emploi…</li>'
  '<li><b>Où on peut le trouver</b> : dans la rue, dans un restaurant, dans une école…</li>'
  '<li><b>Son objectif</b> : vendre, informer, recruter, promouvoir…</li>'
  '<li><b>Un élément précis</b> : le type d\'offre, le public concerné, les modalités…</li></ul>')
A('<div class="warn"><b>Piège classique :</b> la question peut porter sur ce qui <b>n\'est pas</b> précisé '
  'dans le document (<i>« Ce document ne précise pas… »</i>). Il faut alors chercher l\'information absente, '
  'pas l\'information présente.</div>')
A('<p class="sm">D\'après la page 16 de l\'ouvrage.</p>')

# ══ 3 pistes pour le cours ══
A('<h2>3. Trois choses qui se travaillent mal seul</h2>')
A('<p class="lead">Ces remarques découlent du format de l\'examen. Le rythme et la progression '
  'restent entièrement à votre appréciation — l\'élève travaille par ailleurs seul et avec des outils numériques, '
  'mais les points ci-dessous supposent un interlocuteur.</p>')
A('<ol>'
 '<li><b>Poser des questions, et faire préciser les réponses.</b> La section A demande une dizaine de questions '
 'en 5 minutes, et surtout des <b>relances</b> quand la réponse est incomplète. '
 'Un partenaire qui répond de façon volontairement vague oblige à relancer ; seul, on ne s\'entraîne pas à cela.</li>'
 '<li><b>Tenir un avis quand l\'autre objecte.</b> En section B, l\'examinateur oppose des objections. '
 'La difficulté n\'est pas d\'avoir des arguments, c\'est de <b>ne pas abandonner le sien</b> sous la pression. '
 'C\'est ce qu\'aucun exercice écrit ne reproduit.</li>'
 '<li><b>Présenter un document sans le lire.</b> La consigne est explicite : s\'aider du document, ne pas le lire. '
 'Reformuler à l\'oral ce qu\'on a sous les yeux est un geste précis, qui se corrige de l\'extérieur.</li>'
 '</ol>')
A('<div class="box">Sur la correction des productions écrites, une remarque de notre côté : '
 'l\'élève dispose déjà de beaucoup de retours automatisés sur la <b>forme</b> (conjugaison, accords, orthographe). '
 'Ce qui lui manque, ce sont les retours sur ce qu\'une machine ne voit pas : '
 '<b>le registre, la pertinence des arguments, et ce qui « sonne » français ou non</b>.</div>')

# ══ 4 EO ══
def doc_block(lines):
    if lines: A('<div class="doc">%s</div>' % E(" — ".join(l.strip() for l in lines if l.strip())))

A('<h2>4. Expression orale — banque de sujets</h2>')
A('<h3>4.1 Section A : obtenir des informations (%d sujets)</h3>' % len(oralA))
A('<p class="lead">Le candidat lit l\'annonce et pose une dizaine de questions ; l\'examinateur joue '
  'l\'interlocuteur au téléphone.<br><span class="sm">Les questions listées sous chaque annonce '
  'figurent dans la compilation à titre indicatif — elles peuvent servir de corrigé, ou être cachées '
  'pour laisser l\'élève chercher.</span></p>')
for i, s in enumerate(oralA, 1):
    A('<h4>%d. %s</h4>' % (i, E(s.get("titre",""))))
    doc_block(s.get("document") or [])
    reps = s.get("reponses") or []
    if reps:
        A('<ul>' + "".join('<li>%s</li>' % E(r) for r in reps) + '</ul>')

A('<h3>4.2 Section B : convaincre — sujets avec document (%d)</h3>' % len(oralB.get("avec_document", [])))
for i, s in enumerate(oralB.get("avec_document", []), 1):
    A('<h4>%d. %s</h4>' % (i, E(s.get("titre",""))))
    doc_block(s.get("document") or [])
sup = oralB.get("sujets_supplementaires", [])
A('<h3>4.3 Section B : sujets supplémentaires (%d)</h3>' % len(sup))
A('<p class="sm">Énoncés seuls, sans document.</p>')
A('<ol>' + "".join('<li>%s</li>' % E(s if isinstance(s,str) else s.get("titre","")) for s in sup) + '</ol>')

# ══ 5 EE ══
A('<h2>5. Expression écrite — banque de sujets</h2>')
A('<h3>5.1 Section A : terminer un article (%d sujets)</h3>' % len(ecritA))
A('<p class="sm">Chaque ligne est le début d\'un article ; il faut écrire la suite (80 mots minimum).</p>')
A('<ol>' + "".join('<li>%s</li>' % E(s if isinstance(s,str) else str(s)) for s in ecritA) + '</ol>')

A('<h3>5.2 Réserve de faits divers pour la section A (%d faits)</h3>' % len(faits))
A('<p class="lead">Matériel supplémentaire, classé par thème : un titre suivi des éléments de l\'histoire. '
  'Utilisable de deux façons — donner le titre seul et faire inventer la suite, '
  'ou donner titre et détails et faire rédiger l\'article.</p>')
cur = None
for f in faits:
    if f.get("theme") != cur:
        cur = f.get("theme"); A('<h4>%s</h4>' % E(cur or "—"))
    A('<p class="q"><b>%s</b></p>' % E(f.get("titre","")))
    A('<ul>' + "".join('<li>%s</li>' % E(d) for d in f.get("details", [])) + '</ul>')

A('<h3>5.3 Section B : donner son avis (%d sujets)</h3>' % len(ecritB))
A('<p class="sm">Chaque ligne est une affirmation lue dans un journal ; il faut écrire au journal '
  'pour donner son avis (200 mots minimum, au moins 3 arguments).</p>')
A('<ol>' + "".join('<li>%s</li>' % E(s if isinstance(s,str) else str(s)) for s in ecritB) + '</ol>')

# ══ 6 QCM ══
TITRES = {"CE":"Compréhension écrite","CO":"Compréhension orale","LS":"Lexique et structure"}
def bloc(qs, audio=False):
    for q in qs:
        n = q["n"]; tag = ""
        if audio and n in PISTE: tag = ' <span class="sm">[piste %03d]</span>' % PISTE[n]["piste"]
        stem = q["enonce"].strip()
        if has_words(stem): stem = E(stem)
        else:
            m = _re.match(r"^\((\d)\)$", stem)
            stem = ("<i>blanc (%s) du texte imprimé dans l'ouvrage</i>" % m.group(1)) if m \
                   else "<i>(énoncé porté par le document imprimé — voir l'ouvrage)</i>"
        A('<p class="q"><b>%d.</b> %s%s</p>' % (n, stem, tag))
        if len(q["options"]) < 4:
            A('<div class="img">⚠️ Propositions sous forme d\'images — voir l\'ouvrage.</div>')
        for k in "ABCDabcd":
            if k in q["options"]: A('<div class="o">%s. %s</div>' % (k.upper(), E(q["options"][k])))
        if q.get("reponse"): A('<div class="o rep">→ %s</div>' % q["reponse"].upper())

A('<h2>6. Les épreuves à choix multiple</h2>')
A('<h3>6.1 Découpage des trois épreuves</h3>')
A('<table><tr><th>Compréhension écrite</th><th>Compréhension orale</th><th>Lexique et structure</th></tr>'
  '<tr><td>1–7 documents de la vie quotidienne<br>8–17 phrases et textes lacunaires<br>'
  '18–22 lecture rapide de textes et graphiques<br>23–32 documents administratifs et professionnels<br>'
  '33–40 articles de presse</td>'
  '<td>1–4 conversations avec dessins<br>5–20 annonces, répondeur, micros-trottoirs<br>'
  '21–30 chroniques, interviews, reportage<br>31–40 documents audios divers</td>'
  '<td>1–14 phrases lacunaires — lexique<br>15–20 textes lacunaires — lexique<br>'
  '21–34 phrases lacunaires — syntaxe<br>35–40 textes lacunaires — cohésion<br>'
  '<span class="sm">(épreuve non exigée pour l\'immigration)</span></td></tr></table>')

A('<h3>6.2 Exemples officiels (CCI Paris Ile-de-France)</h3>')
A('<p class="sm">Questions publiées par l\'organisme qui conçoit le TEF : elles donnent le format exact, '
  'mais pas la difficulté réelle du test.<br>'
  '🔊 <b>Les enregistrements de la compréhension orale sont disponibles</b> : les 16 pistes '
  '(« Enregistrement 1 » à « Enregistrement 16 ») correspondant aux 19 questions ci-dessous '
  'sont dans les fichiers de l\'élève.</p>')
for c in ("CE","CO","LS"):
    A('<h4>%s — %d questions</h4>' % (TITRES[c], len(ex[c]["questions"])))
    bloc(ex[c]["questions"])

A('<h3>6.3 Test blanc complet — barème</h3>')
A('<p class="sm">Barème d\'auto-évaluation de l\'ouvrage, identique pour les trois épreuves. '
  'Estimation de niveau, non calcul officiel.</p>')
A('<table><tr><th>Bonnes réponses / 40</th><th>0–6</th><th>7–15</th><th>16–21</th><th>22–28</th><th>29–35</th><th>36–40</th></tr>'
  '<tr><td>Niveau estimé</td><td>A1</td><td>A2</td><td>B1</td><td><b>B2</b></td><td>C1</td><td>C2</td></tr></table>')
A('<div class="box"><b>Repère d\'entraînement : 22 bonnes réponses sur 40</b> correspond au seuil du B2.</div>')

A('<h4>Compréhension écrite — 40 questions</h4>')
A('<p class="sm">Les documents supports (affiches, courriels, graphiques, articles) restent dans l\'ouvrage, '
  'pages 155–171. Corrigé page 219.</p>')
bloc(tb["CE"]["questions"])

A('<h4>Compréhension orale — 40 questions</h4>')
A('<p class="sm">Pistes 057 à 094 du dossier audio. Les pistes 071 et 075 sont les consignes des deux '
  'micros-trottoirs et ne portent aucune question. Interviews et reportage : deux questions par piste. '
  'Pages 172–180, corrigé page 219.</p>')
bloc(tb["CO"]["questions"], audio=True)

A('<h4>Lexique et structure — 40 questions</h4>')
A('<p class="sm">Épreuve non exigée pour l\'immigration ; matériel de grammaire et de vocabulaire. '
  'Pages 181–188, corrigé page 220.</p>')
bloc(tb["LS"]["questions"])

A('<h3>6.4 Corrigés du test blanc</h3>')
for c in ("CE","CO","LS"):
    k = tb[c]["corrige"]
    A('<h4>%s</h4>' % TITRES[c])
    A('<p>%s</p>' % " · ".join("<b>%d</b> %s" % (n, k.get(str(n), k.get(n, "?"))) for n in range(1, 41)))

A('<h2>7. Récapitulatif de ce dossier</h2>')
A('<table><tr><th>Contenu</th><th>Quantité</th><th>Corrigé ?</th></tr>'
  '<tr><td>Sujets d\'expression orale — section A</td><td>%d</td><td>questions types fournies</td></tr>'
  '<tr><td>Sujets d\'expression orale — section B</td><td>%d avec document + %d supplémentaires</td><td>sans objet</td></tr>'
  '<tr><td>Sujets d\'expression écrite — section A</td><td>%d</td><td>sans objet</td></tr>'
  '<tr><td>Réserve de faits divers</td><td>%d faits</td><td>sans objet</td></tr>'
  '<tr><td>Sujets d\'expression écrite — section B</td><td>%d</td><td>sans objet</td></tr>'
  '<tr><td>Exemples officiels de QCM</td><td>%d questions</td><td><b>oui</b></td></tr>'
  '<tr><td>Test blanc complet</td><td>120 questions</td><td><b>oui</b></td></tr></table>'
  % (len(oralA), len(oralB.get("avec_document",[])), len(sup), len(ecritA), len(faits), len(ecritB),
     sum(len(ex[c]["questions"]) for c in ex)))
A('<p class="sm">L\'élève dispose par ailleurs de 102 textes longs avec 394 questions de compréhension écrite '
  '(sans corrigé) et de plus de 340 activités d\'entraînement dans l\'ouvrage, celles-ci avec corrigés '
  'et transcriptions.</p>')
A('<p class="sm">Document préparé pour le cours particulier de l\'élève. Usage privé. '
  'Informations vérifiées le 31 août 2026.</p>')
A('</body></html>')

dst = os.path.join(ROOT, "assets", "tcf", "tef", "_pour_le_prof", "TEF_Canada_dossier_complet.html")
open(dst, "w", encoding="utf-8").write("\n".join(o))
print("✅", os.path.relpath(dst, ROOT), len("\n".join(o)), "字元")
