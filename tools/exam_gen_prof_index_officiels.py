#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""產生「官方文件索引」——一頁 A4，跟四份官方檔案一起傳給老師。

⭐ 設計決定（2026-09-04 與 Owen 討論後）：**不重寫官方內容，只做導航。**
理由：官方原文的價值就在於它是原文，轉述一次多一層失真。

⭐⭐ 2026-09-04 晚間更新：Owen 自己從 coe.int 下載到 CECR 官方檔（Claude 這邊 403），
「cependant 是 B1+ 不是 B2」已用官方 Excel 驗證 → 索引第 3 節從「請老師幫忙驗證」
改成「已驗證的發現」。⚠️ 只剩 FEI 手冊仍是鏡像（該站 443 埠不通）。

跑法（從 repo 根目錄）：
    python3 tools/exam_gen_prof_index_officiels.py
    textutil -convert docx "assets/tcf/_pour_le_prof/Index_documents_officiels.html"

⚠️ 頁碼已實際驗證：PDF 頁碼 = 印刷頁碼（見 HANDOFF 2026-09-04）。改內容改這支，不要手改 HTML。
"""
import os

CSS = ('body{font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;font-size:10.5pt;line-height:1.45;'
 'margin:34px;color:#111}h1{font-size:18pt;border-bottom:3px solid #222;padding-bottom:6px;margin:0 0 4px}'
 'h2{font-size:13pt;margin-top:22px;background:#eceff3;padding:6px 10px;border-left:5px solid #1F4E79}'
 '.lead{color:#444;margin:3px 0 14px}'
 '.box{background:#f2f4f7;border:1px solid #c8cfd8;padding:10px 14px;margin:12px 0}'
 '.warn{background:#fdf3e7;border:1px solid #e0b184;padding:10px 14px;margin:12px 0}'
 '.key{background:#eaf1f8;border:1px solid #9dbdd9;padding:10px 14px;margin:12px 0}'
 'table{border-collapse:collapse;width:100%;margin:10px 0;font-size:10pt}'
 'th,td{border:1px solid #bbb;padding:6px 9px;text-align:left;vertical-align:top}th{background:#eceff3}'
 'ol{margin:5px 0 0 20px;padding:0}li{margin-bottom:5px}ul{margin:4px 0 0 18px}'
 '.sm{font-size:9pt;color:#555}code{background:#eee;padding:1px 4px;font-size:9.5pt}')

o = ['<html><head><meta charset="utf-8"><style>%s</style></head><body>' % CSS]
A = o.append

A("<h1>Documents officiels — index de lecture</h1>")
A('<p class="lead">Quatre fichiers officiels sont joints. Cette page indique seulement <b>ce qui '
  'concerne réellement le TCF&nbsp;Canada</b>, et où le trouver.</p>')

A('<div class="key"><b>Ce document ne demande aucun engagement de votre part.</b> '
  'Il ne contient aucune interprétation de ma part&nbsp;: ce sont les textes officiels qui parlent. '
  "Je les transmets parce qu'ils précisent <b>comment les épreuves d'expression sont notées</b>, "
  "ce qui n'apparaît nulle part dans les manuels de préparation du commerce. "
  "Le rythme et la progression restent votre domaine.</div>")

# ── 1. les deux fichiers ──
A("<h2>1. Les quatre fichiers joints</h2>")
A('<table>'
  '<tr><th>Fichier</th><th>Ce que c\'est</th><th>Pages</th></tr>'
  '<tr><td><code>Manuel_du_candidat_TCF_VersionE_dec2022.pdf</code></td>'
  "<td><b>Manuel du candidat au TCF</b>, Version E, décembre 2022 — France Éducation international. "
  "⚠️ Couvre <b>toutes les déclinaisons</b> du TCF (tout public, Canada, Québec, ANF, IRN)&nbsp;: "
  "la partie Canada y est dispersée.</td><td>56</td></tr>"
  '<tr><td><code>Manuel_du_candidat_TCF_Canada.pdf</code></td>'
  "<td><b>Version spécifique TCF Canada</b>. Plus courte, mais elle <b>ne contient ni le barème /20 → CECR, "
  "ni la règle de calcul</b>&nbsp;: pour cela, il faut le document ci-dessus.</td><td>31</td></tr>"
  '<tr><td><code>CEFR Descriptors (2020).xlsx</code></td>'
  "<td>⭐ <b>Les descripteurs officiels du CECR en tableur</b> (Conseil de l'Europe). "
  "Onglet «&nbsp;Francais&nbsp;»&nbsp;: <b>1&nbsp;834 descripteurs</b>, avec les colonnes "
  "<i>Échelle</i> et <i>Niveau</i>. <b>Cherchable directement</b> — bien plus pratique que le PDF.</td>"
  "<td>—</td></tr>"
  '<tr><td><code>CEFR Companion volume_fra.pdf</code></td>'
  "<td><i>CECR — Volume complémentaire</i> (2020), version française. Le texte intégral, "
  "si le contexte d'un descripteur est nécessaire.</td><td>292</td></tr>"
  '</table>')

A('<div class="warn"><b>Une précision sur la provenance.</b> '
  "Les fichiers du <b>CECR</b> ont été <b>téléchargés directement sur <code>coe.int</code></b> "
  "(site du Conseil de l'Europe)&nbsp;: provenance officielle, aucune réserve. "
  "En revanche, <code>france-education-international.fr</code> est <b>injoignable depuis notre connexion</b> "
  "(le port 443 ne répond pas)&nbsp;; les <b>deux manuels du TCF</b> proviennent donc de <b>miroirs tiers</b>. "
  "La page de garde porte bien «&nbsp;Version E, décembre 2022 — Bureau des tests&nbsp;» et les passages clés "
  "ont été <b>recoupés entre deux hébergeurs indépendants</b>, "
  "mais <b>si vous parvenez à ouvrir le site de France Éducation international, une confirmation serait utile.</b></div>")

# ── 2. les pages qui comptent ──
A("<h2>2. Les quatre pages à consulter (Manuel Version E)</h2>")
A('<p class="sm">Numérotation du PDF = numérotation imprimée (vérifié).</p>')
A('<table>'
  '<tr><th>Page</th><th>Contenu</th><th>Pourquoi c\'est important</th></tr>'
  "<tr><td><b>p.&nbsp;19</b></td><td>Définition officielle des <b>3 tâches de l'expression orale</b></td>"
  "<td>Durées et consignes exactes&nbsp;: tâche&nbsp;1 = entretien dirigé, <b>2&nbsp;min, sans préparation</b>&nbsp;; "
  "tâche&nbsp;2 = interaction&nbsp;; tâche&nbsp;3 = point de vue, <b>sans préparation</b>.</td></tr>"
  "<tr><td><b>p.&nbsp;21–22</b></td><td>⭐ <b>La règle de notation</b></td>"
  "<td>Passage décisif&nbsp;: «&nbsp;<i>L'examinateur et le correcteur attribuent à chacune des 3 tâches "
  "un niveau allant du niveau A1 non atteint au niveau C2. Une règle de calcul prenant en compte "
  "les 6 niveaux attribués donne lieu à une note finale et un niveau final.</i>&nbsp;» "
  "<b>Donc&nbsp;: 3 tâches × 2 évaluateurs = 6 jugements de niveau</b>, et non un total de points. "
  "En cas d'écart important, une troisième correction est déclenchée.</td></tr>"
  "<tr><td><b>p.&nbsp;22</b></td><td>⚠️ <b>Les motifs d'annulation à l'écrit</b></td>"
  "<td>Écriture illisible, <b>nombre de mots non respecté</b>, hors-sujet, tâche non traitée&nbsp;→ "
  "«&nbsp;A1 non atteint&nbsp;». <b>Le nombre de mots a un minimum <i>et</i> un maximum.</b></td></tr>"
  "<tr><td><b>p.&nbsp;25</b></td><td>⭐ <b>Grille d'interprétation des notes /20</b></td>"
  "<td>La note /20 des épreuves d'expression <b>n'est pas un pourcentage</b>, c'est une conversion de niveau&nbsp;: "
  "<b>6–9 = B1</b>, <b>10–13 = B2</b>. L'objectif visé (NCLC&nbsp;7) commence donc exactement à <b>10/20</b>.</td></tr>"
  '</table>')

A('<div class="box"><b>Le reste du manuel concerne d\'autres déclinaisons du TCF</b> '
  "(TCF IRN, TCF Intégration, TCF tout public, TCF Québec) et n'est pas nécessaire ici.</div>")
A('<div class="key">⭐ <b>Pour les niveaux du CECR, utilisez le tableur plutôt que le PDF.</b> '
  "Dans <code>CEFR Descriptors (2020).xlsx</code>, onglet «&nbsp;Francais&nbsp;», il suffit de filtrer "
  "les colonnes <i>Échelle</i> et <i>Niveau</i>. "
  "⚠️ <b>Le PDF est piégeux</b>&nbsp;: dans les tableaux, l'étiquette de niveau et le descripteur "
  "se décalent d'une ligne à l'extraction — on risque de lire un descripteur au mauvais niveau.</div>")

# ── 3. deux questions ──
A("<h2>3. Deux questions concrètes, si vous avez le temps</h2>")
A('<div class="key"><ol>'
  "<li><b>Un point que le tableur rend très net</b> (vérifié le 4 septembre 2026 dans "
  "<code>CEFR Descriptors (2020).xlsx</code>, onglet Francais)&nbsp;:<br>"
  "• Échelle <i>Cohérence et cohésion</i>, niveau <b>B1+</b>&nbsp;: "
  "«&nbsp;<i>Peut introduire un contre argument dans un texte simple discursif (par exemple avec «&nbsp;cependant&nbsp;»).</i>&nbsp;»<br>"
  "• Échelle <i>Discussion informelle</i>, niveau <b>B2</b>&nbsp;: "
  "«&nbsp;<i>Peut exprimer et exposer ses opinions dans une discussion et <b>les défendre avec pertinence</b>.</i>&nbsp;»<br>"
  "<b>→ Introduire un contre-argument reste B1+&nbsp;; c'est le retour pour défendre sa position qui relève du B2.</b> "
  "Cela donne un objectif d'entraînement très concret. <b>Ce raisonnement vous semble-t-il exploitable en cours&nbsp;?</b></li>"
  "<li><b>Une demande.</b> La <b>tâche&nbsp;2</b> évalue l'<i>interaction</i>&nbsp;: c'est le candidat qui pose les questions, "
  "et il doit <b>rebondir sur les réponses</b> de l'examinateur. "
  "<b>Cela ne peut pas se travailler seul&nbsp;;</b> il faut quelqu'un qui réponde — et qui réponde de façon imprévue. "
  "<b>Serait-il envisageable d'y consacrer une partie d'un cours de temps en temps&nbsp;?</b></li>"
  '</ol></div>')

A('<p class="sm" style="margin-top:22px">Document préparé pour le cours particulier. '
  'Passages du manuel vérifiés le <b>4 septembre 2026</b> par extraction directe des deux PDF. '
  "Aucune information de cette page ne provient d'un site de préparation commercial.</p>")

A("</body></html>")

out = "assets/tcf/_pour_le_prof/Index_documents_officiels.html"
os.makedirs(os.path.dirname(out), exist_ok=True)
open(out, "w", encoding="utf-8").write("\n".join(o))
print("寫出：", out)
