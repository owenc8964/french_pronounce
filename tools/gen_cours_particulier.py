#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""產生「上家教用的單頁」——Owen 帶去上課，中文給他看、法文給老師看。

⭐ 只放【只有老師能做】的事。⛔ 自己練得起來的一律不放（那會浪費課堂時間）。
2026-09-05 建立。內容自動從 t1_stock.js 撈，改內容改那個檔不要改這裡。

跑法：python3 tools/gen_cours_particulier.py
      → assets/tcf/_pour_le_prof/Cours_a_faire.html ＋ 桌面同名 docx
"""
import json, subprocess, os, shutil

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

M = json.loads(subprocess.run(['node','-e','''
const fs=require("fs");
const M=new Function(fs.readFileSync("t1_stock.js","utf8")+"; return {T1_OPENING,T1_STOCK};")();
console.log(JSON.stringify(M));
'''], capture_output=True, text=True).stdout)

owen_said = [s for s in M['T1_STOCK'] if str(s.get('src','')).startswith('Owen')]

CSS = ('body{font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;font-size:10.5pt;line-height:1.5;'
 'margin:32px;color:#111}h1{font-size:17pt;border-bottom:3px solid #222;padding-bottom:6px;margin:0 0 3px}'
 'h2{font-size:12.5pt;margin-top:20px;background:#eceff3;padding:6px 10px;border-left:5px solid #1F4E79}'
 '.lead{color:#444;margin:2px 0 12px}.zh{background:#fffbe9;border-left:4px solid #e0b184;padding:8px 12px;margin:8px 0}'
 '.fr{background:#f2f6fa;border:1px solid #c8cfd8;padding:10px 13px;margin:8px 0}'
 '.key{background:#eaf1f8;border:1px solid #9dbdd9;padding:10px 14px;margin:11px 0}'
 'table{border-collapse:collapse;width:100%;margin:9px 0;font-size:10pt}'
 'th,td{border:1px solid #bbb;padding:6px 9px;text-align:left;vertical-align:top}th{background:#eceff3}'
 '.sm{font-size:9pt;color:#555}ol{margin:4px 0 0 20px}li{margin-bottom:6px}'
 'code{background:#eee;padding:1px 4px;font-size:9.5pt}')

o = ['<html><head><meta charset="utf-8"><style>%s</style></head><body>' % CSS]; A = o.append

A("<h1>Cours particulier — trois choses à faire ensemble</h1>")
A('<p class="lead">TCF Canada, Tâche 1 (entretien dirigé, 2 min, sans préparation)</p>')
A('<div class="zh"><b>【給 Owen 的說明，老師不用看這格】</b><br>'
  '這頁只放<b>你自己練不了、非要老師不可</b>的三件事。⛔ 自己練得起來的一律不放——'
  '課堂時間拿去做那些是浪費。</div>')

A('<div class="key"><b>Contexte en une phrase&nbsp;:</b> j\'ai préparé une présentation de '
  f'<b>{M["T1_OPENING"]["mots"]} mots</b> (environ 55 secondes) et <b>24 réponses courtes</b> '
  'pour les relances possibles. Tout vient de mes propres textes. '
  "<b>Je peux mémoriser seul&nbsp;; ce que je ne peux pas faire seul, c'est ce qui suit.</b></div>")

# ── 1 ──
A("<h2>1. Est-ce qu'une phrase est incompréhensible&nbsp;? (5 min)</h2>")
A('<div class="zh"><b>【中文】</b>⭐ 這是<b>唯一致命的失分方式</b>——官方 B2 判準是「不犯<b>導致誤解</b>的錯」。'
  '每 100 字錯 1–2 個沒關係，但<b>只要有一句完全聽不懂就會掉一級</b>。'
  '⚠️ 而這件事<b>我自己驗不了</b>：我聽自己講永遠都懂。</div>')
A('<div class="fr">Je vous lis ma présentation (55 s). '
  "<b>Une seule question&nbsp;: y a-t-il une phrase où vous ne comprenez pas ce que je veux dire&nbsp;?</b><br>"
  "⚠️ Ce n'est pas «&nbsp;est-ce correct&nbsp;» — les petites fautes ne me font pas perdre de niveau. "
  "<b>C'est «&nbsp;est-ce que ça reste compréhensible&nbsp;»</b>, ce qui, lui, en fait perdre.</div>")

# ── 2 ──
A("<h2>2. Deux phrases que j'ai composées moi-même (5 min)</h2>")
A('<div class="zh"><b>【中文】</b>其他 23 段都是從我以前寫過的稿子剪出來的，'
  '<b>這兩段是我口述、Claude 幫我翻的</b>——所以只有這兩段沒被人看過。'
  '⚠️ 我現在的程度<b>判斷不了「這樣講自不自然」</b>，所以要問。</div>')
for s in owen_said:
    A(f'<div class="fr"><b>Q&nbsp;: {s["q_fr"]}</b><br>{s["fr"]}'
      f'<br><span class="sm">（中文原意：{s["zh"]}）</span></div>')
A('<div class="key">Deux questions&nbsp;: <b>(a)</b> est-ce que ça sonne naturel&nbsp;? '
  "<b>(b)</b> y a-t-il un mot trop rare ou trop savant pour mon niveau&nbsp;? "
  "⭐ <b>Je préfère plus simple et sûr que plus joli et fragile.</b></div>")

# ── 3 ──
A("<h2>3. Tâche&nbsp;2&nbsp;: il me faut quelqu'un qui réponde (10–15 min)</h2>")
A('<div class="zh"><b>【中文】</b>⭐ T2 佔口說<b>六個等級判定裡的兩個</b>，而它考的是「<b>接住對方的回答再問下去</b>」'
  '——官方方法論明講「不接對方的回答＝打斷互動」。<b>⛔ 這件事我一個人絕對練不了</b>，'
  '任何 app、任何頁面都做不到。這是整個口說準備裡<b>唯一非要真人不可</b>的一塊。</div>')
A('<div class="fr">Format réel&nbsp;: vous jouez un rôle (vendeur, voisin, collègue…), '
  "<b>c'est moi qui pose les questions</b>, 2 min de préparation puis 3 min 30 d'échange.<br><br>"
  "<b>Ce que je dois travailler&nbsp;:</b><ol>"
  "<li><b>Rebondir</b> — ma question suivante doit reprendre un mot de votre réponse, "
  "et non enchaîner une liste préparée.</li>"
  "<li><b>Varier les formes</b> — <code>est-ce que</code>, inversion, mots interrogatifs.</li>"
  "<li><b>Marquer que j'ai écouté</b> — <i>D'accord, donc…</i> / <i>Ah, intéressant, et…</i></li></ol>"
  "⚠️ Si je récite une liste sans réagir à vos réponses, <b>dites-le-moi</b>&nbsp;: "
  "c'est exactement l'erreur qui fait perdre des points ici.</div>")

A('<hr><p class="sm">⛔ <b>Ce document ne demande aucun engagement sur un niveau à une date donnée.</b> '
  'La progression et le rythme restent votre domaine. '
  f'Généré le 5 septembre 2026 à partir de mes propres textes ({len(M["T1_STOCK"])} segments).</p>')
A("</body></html>")

out = 'assets/tcf/_pour_le_prof/Cours_a_faire.html'
open(out,'w',encoding='utf-8').write("\n".join(o))
print('寫出：', out)
