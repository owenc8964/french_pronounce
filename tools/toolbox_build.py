"""toolbox_build.py — 🧰 口說寫作工具箱的內容（2026-11-24）
Owen：「會不代表用得出來，口說跟寫作要有一個地方好提取」→ 照「想表達什麼」分類
輸入：assets/tcf/toolbox/patterns_src.js（句型，手寫）＋ Lucas xlsx「高階詞彙」（轉繁體、依主題分組）
輸出：assets/tcf/toolbox/content.js → tools/upload_toolbox_supabase.py 傳到私人空間 toolbox/content.js
⛔ Lucas 學習資料與寶典的衍生內容，永不進公開 repo
用法：python3 tools/toolbox_build.py [xlsx 路徑]"""
import json, os, sys, openpyxl, opencc
R=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
D=R+'/assets/tcf/toolbox'
X=sys.argv[1] if len(sys.argv)>1 else os.path.expanduser('~/Downloads/学习资料 - Owen.xlsx')
cc=opencc.OpenCC('s2twp')
ws=openpyxl.load_workbook(X,read_only=True)['高阶词汇']
FIXW={'suplémentaire':'supplémentaire'}
FIXZ={'diplôme':'學歷、文憑','honnêtement':'誠實地、坦白說','évident / évidente':'明顯的','abonnement':'訂閱、月票','lancer':'推出、發起','prévenir':'預防；通知',
      'réaliser':'實現、做到；意識到','fonctionnement':'運作方式','soutenir':'支持、支撐','appuyer':'支持、支撐','permettre':'讓…能夠、允許','livrer':'交付、送貨',
      'tourner':'轉動；變成','consister':'在於（consister à）；由…組成（consister en）','renvoyer':'退回、送還；開除','compte':'帳戶、帳號'}
# 名詞／形容詞／副詞依主題分組（動詞全部算「論證用動詞」）
TOPIC={
 'work':'embauche carrière emploi professionnalisme diplôme aptitude équipe partenariat qualification chômage grève productivité secteur compétence rentabilité compétitivité motivation compétent expérimenté qualifié performant motivé dynamique créatif innovant efficace responsable flexible',
 'env':'emballage tri déchet préservation ressource environnemental écologique durable polluant embouteillage trajet parcours aménagement',
 'sante':'médicament nourriture aliment ordonnance alimentaire sanitaire sain nocif équilibré psychologique humeur détente épanoui apparence esthétique',
 'soc':'solidarité bénévolat bénévole intégration tolérance amitié sensibilisation pauvre sécurité existence',
 'vie':'hébergement habillement compte facture caution charge abonnement pourboire frais randonnée dépannage concours bourse recette propreté façade immobilier abordable quotidien hebdomadaire mensuel annuel habitude',
 'tech':'algorithme numérique outil',
}
T={}
for k,v in TOPIC.items():
    for w in v.split(): T[w]=k
NAMES={'verb':'🧠 論證用動詞','noun':'📦 通用名詞（現象、趨勢、因素…）','eval':'⭐ 評價（重要、有利、嚴重…）','advf':'⏱️ 時間和頻率副詞','advd':'🔊 程度和語氣副詞',
       'work':'💼 工作職場','env':'🌱 環境交通','sante':'🥗 健康飲食','soc':'🤝 社會','vie':'🧺 生活大小事','tech':'📱 科技'}
FREQ='quotidiennement actuellement habituellement fréquemment récemment auparavant désormais régulièrement rarement progressivement'.split()
V=[]; sec=None
for r in ws.iter_rows(values_only=True):
    c=[x for x in r if x is not None]
    if not c: continue
    if len(c)==1: sec=str(c[0]); continue
    if not isinstance(c[0],(int,float)) or len(c)<4: continue
    fr=FIXW.get(str(c[1]).strip(),str(c[1]).strip()); pos=str(c[2]).strip(); zh=FIXZ.get(fr, cc.convert(str(c[3]).strip()))
    head=fr.split(' /')[0].split(',')[0].strip()
    if '動詞' in cc.convert(sec) and '名詞' not in cc.convert(sec) and '形容' not in cc.convert(sec): g='verb'
    else: g=T.get(head) or ('advf' if head in FREQ else 'advd' if pos=='adv' else 'eval' if pos=='adj' else 'noun')
    V.append({'fr':fr,'pos':pos,'zh':zh,'g':g})
from collections import Counter; print('詞彙',len(V),Counter(v['g'] for v in V))
G=[{'id':k,'name':NAMES[k],'w':[v for v in V if v['g']==k]} for k in ['verb','eval','noun','work','env','sante','soc','vie','tech','advf','advd']]
LUCAS_VERBS=[w.replace('_',' ') for w in 'être avoir aller venir faire prendre vouloir pouvoir devoir falloir partir lire écrire manger boire acheter savoir connaître se_lever envoyer payer agrandir s’appeler finir compléter mettre recevoir valoir déplacer rappeler accueillir perdre paraître plaire rire rendre suivre ennuyer offrir éteindre réduire servir'.split()]
src=open(D+'/patterns_src.js').read()
out=src+'\nvar TB_VOCAB='+json.dumps(G,ensure_ascii=False)+';\nvar TB_VERBS='+json.dumps(LUCAS_VERBS,ensure_ascii=False)+';\nwindow.TOOLBOX_CONTENT={cats:TB_CATS, vocab:TB_VOCAB, verbs:TB_VERBS};\n'
open(D+'/content.js','w').write(out); print('content.js', len(out))
