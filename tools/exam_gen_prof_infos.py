#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""產生「給老師的考試說明」文件：我們要考什麼、什麼時候、在哪裡、考什麼內容。
TCF Canada 為主（實際會考的），TEF Canada 為輔（台灣沒考場，但材料是好練習）。
跑法（從 repo 根目錄）：python3 tools/exam_gen_prof_infos.py → 再 textutil -convert docx
⚠️ 所有數字都在 2026-08-31 上官網查證過，來源見文件最後一節。改內容改這支，不要手改 HTML。"""
import os

CSS = ('body{font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;font-size:10.5pt;line-height:1.45;'
 'margin:38px;color:#111}h1{font-size:20pt;border-bottom:3px solid #222;padding-bottom:7px;margin:0 0 4px}'
 'h2{font-size:15pt;margin-top:30px;background:#eceff3;padding:7px 11px;border-left:5px solid #1F4E79}'
 'h3{font-size:12pt;margin-top:20px;border-bottom:1px solid #ccc;padding-bottom:3px}'
 'h4{font-size:10.5pt;margin:14px 0 4px;color:#1F4E79}.lead{color:#444;margin:3px 0 15px}'
 '.box{background:#f2f4f7;border:1px solid #c8cfd8;padding:11px 15px;margin:13px 0}'
 '.warn{background:#fdf3e7;border:1px solid #e0b184;padding:11px 15px;margin:13px 0}'
 '.key{background:#eaf1f8;border:1px solid #9dbdd9;padding:11px 15px;margin:13px 0}'
 'table{border-collapse:collapse;width:100%;margin:12px 0;font-size:10pt}'
 'th,td{border:1px solid #bbb;padding:6px 9px;text-align:left;vertical-align:top}th{background:#eceff3}'
 'ol{margin:5px 0 0 22px;padding:0}li{margin-bottom:5px}ul{margin:4px 0 0 20px}'
 '.sm{font-size:9.5pt;color:#555}')

o=['<html><head><meta charset="utf-8"><style>%s</style></head><body>'%CSS]; A=o.append

A('<h1>L\'examen visé — informations pratiques et contenu</h1>')
A('<p class="lead">Ce que l\'élève doit passer, où, quand, et ce qui est évalué</p>')
A('<div class="key"><b>Ce document est informatif.</b> Il ne demande aucun engagement de votre part '
  'sur un niveau atteint à une date donnée. Il sert seulement à ce que nous partagions la même image '
  'de l\'examen : ce qui est évalué, sous quelle forme, et avec quelles contraintes pratiques. '
  'La progression et le rythme restent votre domaine.</div>')
A('<div class="box">Document préparé pour le cours particulier. '
  'Toutes les informations ont été vérifiées le <b>31 août 2026</b> sur les sites officiels '
  '(IRCC, le français des affaires / CCI Paris, France Éducation international, Alliance Française de Taïwan). '
  'Les sources sont listées à la dernière page.</div>')

# ── 1. l'essentiel ──
A('<h2>1. L\'essentiel en dix lignes</h2>')
A('<div class="key"><ol>'
 '<li><b>But :</b> une demande d\'immigration économique au Canada. '
 'Le niveau exigé est le <b>NCLC 7</b> (équivalent CLB 7, soit environ B2) <b>dans les quatre compétences</b>.</li>'
 '<li><b>Horizon visé :</b> l\'élève s\'est fixé <b>juin 2027</b> comme repère. '
 'C\'est un objectif personnel lié à son dossier, <b>pas une échéance imposée au cours</b> : '
 'l\'examen peut être repassé, et une attestation reste valable deux ans. '
 'Si le niveau n\'est pas là, on décale — ce n\'est pas un examen qu\'on passe une seule fois dans sa vie.</li>'
 '<li><b>Examen retenu : le TCF Canada</b>, à l\'Alliance Française de Taipei.</li>'
 '<li><b>Pourquoi pas le TEF Canada :</b> il n\'existe <b>aucun centre TEF à Taïwan</b> '
 '(le plus proche est à Tokyo). Ce n\'est pas un choix pédagogique, c\'est une contrainte pratique.</li>'
 '<li>⭐ <b>Les quatre compétences sont notées séparément, sans moyenne.</b> '
 'C\'est <b>la plus faible qui détermine le niveau retenu</b> : un excellent score en lecture '
 'ne compense pas un oral insuffisant.</li>'
 '<li><b>Aucune épreuve de grammaire</b> dans les deux examens (version immigration) : '
 'la grammaire n\'est évaluée qu\'à travers les quatre compétences.</li>'
 '<li><b>Validité des résultats : 2 ans.</b></li>'
 '<li><b>Fréquence à Taipei : 4 sessions par an</b> (février, avril, septembre, décembre).</li>'
 '<li><b>À noter pour la logistique :</b> les sessions du premier semestre 2027 tomberont '
 'probablement en <b>février et en avril</b>. C\'est une information d\'organisation '
 '(inscription à ne pas manquer), pas une contrainte pédagogique.</li>'
 '<li><b>Tarif :</b> 8 000 NT$ pour les quatre épreuves (forfait, non dissociable).</li>'
 '</ol></div>')

# ── 2. TCF ──
A('<h2>2. TCF Canada — l\'examen que l\'élève passera</h2>')

A('<h3>2.1 Où, quand, combien</h3>')
A('<table><tr><th>Lieu</th><td>Alliance Française de Taïwan, centre de <b>Taipei</b><br>'
  'N° 107, section 4, Roosevelt Rd, district de Da\'an, Taipei 106 — (02) 2364-8833</td></tr>'
  '<tr><th>Sessions</th><td><b>4 par an</b> : février, avril, septembre, décembre</td></tr>'
  '<tr><th>Inscription</th><td>Elle ferme <b>environ 6 à 8 semaines avant</b> l\'examen. '
  'Les places sont limitées.</td></tr>'
  '<tr><th>Tarif</th><td><b>8 000 NT$</b> — forfait des quatre épreuves</td></tr>'
  '<tr><th>Durée totale</th><td>environ <b>2 h 47</b> d\'épreuves</td></tr>'
  '<tr><th>Résultats</th><td>attestation envoyée par courriel ; <b>valable 2 ans</b></td></tr></table>')

A('<p class="sm">Calendrier 2026 relevé sur le site de l\'Alliance Française, à titre de repère pour le rythme de 2027 :</p>')
A('<table><tr><th>Session TCF Canada 2026</th><th>Période d\'inscription</th></tr>'
  '<tr><td>8 février</td><td>22 déc. 2025 – 2 janv. 2026</td></tr>'
  '<tr><td>19 avril</td><td>5 – 15 mars</td></tr>'
  '<tr><td>20 septembre</td><td>6 – 16 août</td></tr>'
  '<tr><td>20 décembre</td><td>5 – 15 novembre</td></tr></table>')
A('<div class="warn"><b>Attention à ne pas confondre deux examens qui portent presque le même nom.</b> '
  'L\'Alliance Française propose aussi le <b>TCF « tout public »</b> (5 autres sessions par an, '
  'expression orale et écrite en option, et une épreuve de <i>structures de la langue</i> de 18 questions). '
  '<b>Cette version-là n\'est pas recevable pour l\'immigration.</b> '
  'Seules les sessions explicitement marquées « TCF CANADA » conviennent.</div>')

A('<h3>2.2 Les quatre épreuves</h3>')
A('<table><tr><th>Épreuve</th><th>Format</th><th>Durée</th><th>Notation</th></tr>'
  '<tr><td>Compréhension orale</td><td>39 questions à choix multiple</td><td>35 min</td><td>0–699</td></tr>'
  '<tr><td>Compréhension écrite</td><td>39 questions à choix multiple</td><td>60 min</td><td>0–699</td></tr>'
  '<tr><td>Expression écrite</td><td><b>3 tâches</b></td><td>60 min</td><td>0–20</td></tr>'
  '<tr><td>Expression orale</td><td><b>3 tâches</b>, en face à face</td><td>≈ 12 min</td><td>0–20</td></tr></table>')
A('<p class="sm">Les quatre épreuves se passent le même jour. L\'entretien oral est enregistré et évalué '
  'par le centre et par des correcteurs formés par France Éducation international.</p>')

A('<h3>2.3 Expression écrite — le détail des trois tâches</h3>')
A('<table><tr><th>Tâche</th><th>Ce qui est demandé</th><th>Longueur</th><th>Temps conseillé</th></tr>'
  '<tr><td><b>1</b></td><td>Écrire un message pour décrire, raconter ou expliquer '
  '(registre familier, destinataire proche)</td><td><b>60–120 mots</b></td><td>10–15 min</td></tr>'
  '<tr><td><b>2</b></td><td>Raconter et commenter une expérience (article de blog, récit)</td>'
  '<td><b>120–150 mots</b></td><td>20–25 min</td></tr>'
  '<tr><td><b>3</b></td><td>⭐ <b>Deux documents de points de vue opposés</b> sont fournis : '
  'il faut d\'abord les confronter, puis défendre sa propre opinion</td>'
  '<td><b>120–180 mots</b><br><span class="sm">≈ 40–60 mots de synthèse, 80–120 mots d\'opinion</span></td>'
  '<td>20–25 min</td></tr></table>')
A('<div class="warn"><b>Les fourchettes de mots font partie de la consigne, ce ne sont pas des indications.</b> '
  'Écrire nettement <b>plus</b> que la limite haute est pénalisé, au même titre qu\'écrire trop peu. '
  'C\'est un point d\'entraînement en soi : savoir dire la même chose en version longue et en version courte.</div>')

A('<h3>2.4 Expression orale — le détail des trois tâches</h3>')
A('<table><tr><th>Tâche</th><th>Ce qui est demandé</th><th>Durée</th><th>Préparation</th></tr>'
  '<tr><td><b>1</b> — entretien dirigé</td><td>L\'examinateur pose des questions sur le candidat lui-même '
  '(identité, parcours, quotidien). Il s\'agit d\'échanger avec une personne inconnue.</td>'
  '<td>≈ 2 min</td><td><b>aucune</b></td></tr>'
  '<tr><td><b>2</b> — exercice en interaction</td><td>⭐ <b>C\'est le candidat qui pose les questions.</b> '
  'L\'examinateur joue un rôle et le candidat doit obtenir des informations précises '
  'dans une situation de la vie courante.</td><td>≈ 5 min 30</td><td><b>2 minutes</b></td></tr>'
  '<tr><td><b>3</b> — expression d\'un point de vue</td><td>⭐⭐ Un sujet de société est tiré au sort ; '
  'le candidat doit exprimer et défendre une opinion de façon continue et convaincante.</td>'
  '<td>≈ 4 min 30</td><td><b>aucune</b></td></tr></table>')
A('<div class="key"><b>La tâche 3 est la plus exigeante de tout l\'examen pour cet élève :</b> '
  'aucun document en main, aucun temps de préparation, un sujet abstrait, et il faut tenir '
  '<b>4 minutes 30 en continu</b>. C\'est le seul moment de l\'examen où rien ne vient soutenir la production.</div>')

A('<h3>2.5 Le score à atteindre</h3>')
A('<table><tr><th>Compétence</th><th>Échelle</th><th><b>NCLC 7 — la cible</b></th></tr>'
  '<tr><td>Compréhension écrite</td><td>0–699</td><td><b>453 – 498</b></td></tr>'
  '<tr><td>Compréhension orale</td><td>0–699</td><td><b>458 – 502</b></td></tr>'
  '<tr><td>Expression écrite</td><td>0–20</td><td><b>10 – 11</b></td></tr>'
  '<tr><td>Expression orale</td><td>0–20</td><td><b>10 – 11</b></td></tr></table>')
A('<p class="sm">Source : tableaux d\'équivalence d\'IRCC (canada.ca). '
  'À noter : <b>les seuils ne sont pas identiques d\'une compétence à l\'autre</b> — '
  '453 en lecture mais 458 en écoute.</p>')

# ── 3. TEF ──
A('<h2>3. TEF Canada — l\'autre examen reconnu</h2>')
A('<p class="lead">Il est reconnu par les mêmes autorités et évalue les mêmes compétences, '
  'mais <b>aucun centre n\'existe à Taïwan</b>. Il n\'est donc pas retenu. '
  'Nous le documentons pour deux raisons : le matériel de préparation TEF que l\'élève possède est '
  'd\'excellente qualité et reste utilisable comme entraînement, et l\'option reste ouverte '
  'si un déplacement devenait envisageable.</p>')

A('<h3>3.1 Les quatre épreuves obligatoires</h3>')
A('<table><tr><th>Épreuve</th><th>Format</th><th>Durée</th></tr>'
  '<tr><td>Compréhension écrite</td><td>40 questions à choix multiple</td><td>60 min</td></tr>'
  '<tr><td>Compréhension orale</td><td>40 questions à choix multiple</td>'
  '<td>40 min — <b>chaque audio n\'est diffusé qu\'une fois</b></td></tr>'
  '<tr><td>Expression écrite</td><td>2 sections</td><td>60 min</td></tr>'
  '<tr><td>Expression orale</td><td>2 sections, en face à face</td><td>15 min</td></tr></table>')
A('<div class="warn"><b>Point souvent mal compris :</b> le TEF comporte aussi une épreuve de '
  '<b>lexique et structure</b> (40 questions, 30 minutes), mais <b>elle n\'est pas exigée</b> '
  'pour une demande d\'immigration. Les quatre épreuves ci-dessus doivent en revanche être passées '
  '<b>le même jour</b> pour que l\'attestation soit reconnue par les autorités canadiennes.</div>')

A('<h3>3.2 Expression écrite — les deux sections</h3>')
A('<table><tr><th>Section</th><th>Ce qui est demandé</th><th>Longueur</th></tr>'
  '<tr><td><b>A</b></td><td>Le début d\'un article de presse est donné : '
  '<b>terminer l\'article</b>, en plusieurs paragraphes. '
  '⚠️ Registre journalistique, ton neutre, <b>pas d\'opinion personnelle</b>.</td>'
  '<td><b>≥ 80 mots</b></td></tr>'
  '<tr><td><b>B</b></td><td>Une affirmation lue dans un journal : '
  '<b>écrire au journal</b> pour donner son avis, avec <b>au moins 3 arguments</b>.</td>'
  '<td><b>≥ 200 mots</b></td></tr></table>')
A('<p class="sm">L\'épreuve est corrigée par deux correcteurs de façon indépendante.</p>')

A('<h3>3.3 Expression orale — les deux sections</h3>')
A('<table><tr><th>Section</th><th>Ce qui est demandé</th><th>Durée</th><th>Registre</th></tr>'
  '<tr><td><b>A</b></td><td>Le candidat a lu une annonce (emploi, logement, services, loisirs) '
  'et <b>téléphone pour obtenir des informations</b>. Consigne officielle : '
  '<b>« posez une dizaine de questions »</b>. L\'examinateur joue l\'interlocuteur.</td>'
  '<td>5 min</td><td><b>vous</b></td></tr>'
  '<tr><td><b>B</b></td><td>Le candidat présente un document à l\'examinateur, qui joue un ami, '
  'et doit <b>le convaincre</b> de participer. L\'examinateur oppose des objections.</td>'
  '<td>10 min</td><td><b>tu</b></td></tr></table>')
A('<p class="sm">Chaque section est précédée d\'<b>une minute</b> de préparation. '
  'Dans les deux sections, le candidat a <b>un document sous les yeux</b>.</p>')

A('<h3>3.4 Le score à atteindre</h3>')
A('<table><tr><th>Compétence</th><th>Échelle</th><th>NCLC 7</th></tr>'
  '<tr><td>Compréhension écrite</td><td>0–699</td><td>434 – 461</td></tr>'
  '<tr><td>Compréhension orale</td><td>0–699</td><td>434 – 461</td></tr>'
  '<tr><td>Expression écrite</td><td>0–699</td><td>428 – 471</td></tr>'
  '<tr><td>Expression orale</td><td>0–699</td><td>456 – 493</td></tr></table>')
A('<p class="sm">Barème applicable aux tests passés <b>après le 10 décembre 2023</b>. '
  'Les anciennes échelles (0–300 / 0–360 / 0–450) circulent encore beaucoup sur Internet : elles sont périmées.</p>')

# ── 4. comparaison ──
A('<h2>4. Les deux examens côte à côte</h2>')
A('<table><tr><th>&nbsp;</th><th>TCF Canada <span class="sm">(retenu)</span></th><th>TEF Canada</th></tr>'
  '<tr><td>Disponible à Taipei</td><td><b>oui</b>, 4 fois par an</td><td><b>non</b> — centre le plus proche : Tokyo</td></tr>'
  '<tr><td>Compréhension orale</td><td>39 q. / 35 min</td><td>40 q. / 40 min</td></tr>'
  '<tr><td>Compréhension écrite</td><td>39 q. / 60 min</td><td>40 q. / 60 min</td></tr>'
  '<tr><td>Expression écrite</td><td>3 tâches / 60 min — <b>fourchettes de mots strictes</b></td>'
  '<td>2 sections / 60 min — <b>minimums seulement</b></td></tr>'
  '<tr><td>Expression orale</td><td>3 tâches / 12 min</td><td>2 sections / 15 min</td></tr>'
  '<tr><td><b>Document en main à l\'oral ?</b></td>'
  '<td>tâche 2 seulement ; <b>tâches 1 et 3 sans support</b></td>'
  '<td><b>oui, dans les deux sections</b></td></tr>'
  '<tr><td>Temps de préparation à l\'oral</td><td>2 min (tâche 2) ; <b>rien pour les tâches 1 et 3</b></td>'
  '<td>1 min avant chaque section</td></tr>'
  '<tr><td>Le candidat doit poser des questions</td><td>oui — tâche 2</td>'
  '<td>oui — section A, <b>une dizaine</b> en 5 minutes</td></tr>'
  '<tr><td>Épreuve de grammaire</td><td colspan="2"><b>aucune dans les deux cas</b></td></tr>'
  '<tr><td>Validité</td><td colspan="2">2 ans</td></tr></table>')

A('<div class="key"><b>Ce que la comparaison montre, en une phrase :</b> les deux examens demandent '
  'les mêmes gestes — <b>poser des questions pour obtenir une information</b>, et '
  '<b>défendre un avis face à quelqu\'un qui objecte</b>. '
  'La différence tient surtout au soutien disponible : au TEF, le candidat a toujours un document sous les yeux ; '
  'au TCF, les tâches 1 et 3 se font sans rien.</div>')

# ── 5. implications ──
A('<h2>5. Ce que ces règles impliquent pour le cours</h2>')
A('<p class="lead">Ces remarques découlent uniquement du format de l\'examen. '
  'Le rythme et la progression restent bien entendu à votre appréciation.</p>')
A('<ol>'
 '<li><b>C\'est la compétence la plus faible qui décide.</b> Puisqu\'il n\'y a pas de moyenne, '
 'progresser là où l\'élève est déjà à l\'aise ne change rien au résultat.</li>'
 '<li><b>Deux gestes reviennent dans les deux examens</b> et ne s\'improvisent pas : '
 '<b>poser des questions</b> (TCF tâche 2 / TEF section A) et '
 '<b>tenir un avis face à des objections</b> (TCF tâche 3 / TEF section B).</li>'
 '<li><b>La tâche 3 du TCF est le point le plus dur</b> : 4 min 30, sans préparation ni document. '
 'C\'est le seul exercice où il n\'y a aucun support.</li>'
 '<li><b>Les fourchettes de mots sont des consignes.</b> Savoir traiter un même contenu '
 'en 60–120 mots puis en 120–180 mots est un exercice à part entière.</li>'
 '<li><b>La tâche 3 de l\'expression écrite n\'est pas une simple dissertation :</b> '
 'deux documents opposés sont fournis et doivent être confrontés avant la prise de position.</li>'
 '<li><b>Aucune épreuve de grammaire</b> : la grammaire compte, mais uniquement à travers ce que '
 'l\'élève produit et comprend.</li>'
 '</ol>')

# ── 6. calendrier ──
A('<h2>6. Le calendrier des sessions</h2>')
A('<p class="lead">Quelques repères d\'organisation. Rien ici n\'est un objectif à tenir en cours.</p>')
A('<ul>'
 '<li>Les sessions TCF Canada de Taipei ont lieu <b>quatre fois par an</b>. '
 'Si 2027 suit le rythme de 2026, les deux premières tomberont en <b>février</b> et en <b>avril</b>.</li>'
 '<li><b>L\'examen peut être repassé.</b> Les sources officielles mentionnent un délai minimum '
 'de 20 à 30 jours entre deux passations — à Taipei la question est théorique, puisque les sessions '
 'sont de toute façon espacées de plusieurs mois.</li>'
 '<li><b>Une attestation reste valable deux ans.</b> Un résultat obtenu tôt ne se perd donc pas.</li>'
 '<li>Les inscriptions ferment <b>6 à 8 semaines avant</b> l\'examen et les places sont limitées : '
 'c\'est le point sur lequel il ne faut pas se laisser surprendre.</li>'
 '<li>Le calendrier 2027 n\'était pas publié au 31 août 2026 : il sera à vérifier sur le site du centre.</li>'
 '</ul>')
A('<div class="key"><b>Une remarque, pour éviter un malentendu.</b> '
 'Passer de son niveau actuel à un NCLC 7 dans les quatre compétences est un objectif exigeant, '
 'et personne ne peut le garantir pour une date précise — ce n\'est pas ce qui est demandé ici. '
 'L\'intérêt de connaître le format le plus tôt possible est ailleurs : '
 'il permet de <b>travailler dans la bonne direction</b> dès maintenant, et de <b>mesurer où on en est</b> '
 'plutôt que de le deviner. Une première passation, même en dessous de la cible, vaut mieux qu\'une estimation : '
 'elle donne un score réel par compétence, et il reste ensuite d\'autres sessions.</div>')

# ── 7. sources ──
A('<h2>7. Sources</h2>')
A('<ul class="sm">'
 '<li><b>Seuils NCLC / CLB</b> — Immigration, Réfugiés et Citoyenneté Canada (canada.ca), '
 'tableaux d\'équivalence des tests linguistiques.</li>'
 '<li><b>Format et épreuves du TEF Canada</b> — Le français des affaires, CCI Paris Ile-de-France '
 '(pages consultées en français et en anglais).</li>'
 '<li><b>Centres d\'examen TEF</b> — carte officielle des centres agréés, CCI Paris Ile-de-France.</li>'
 '<li><b>Format et épreuves du TCF Canada</b> — France Éducation international et réseau Alliance Française.</li>'
 '<li><b>Sessions, tarifs et lieu à Taipei</b> — Alliance Française de Taïwan, page TCF.</li>'
 '</ul>')
A('<p class="sm">Informations vérifiées le 31 août 2026. '
  'Les calendriers et les tarifs sont susceptibles de changer : à reconfirmer auprès du centre avant inscription.</p>')
A('</body></html>')

ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))   # repo 根目錄（本檔在 tools/）
dst=os.path.join(ROOT,"assets","tcf","_pour_le_prof","Examen_vise_informations.html")
open(dst,"w",encoding="utf-8").write("\n".join(o))
print("✅",dst,len("\n".join(o)),"字元")
