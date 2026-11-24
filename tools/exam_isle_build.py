"""考場島第三題題目檔：寶典3目錄的題目（assets/tcf/_analyse/g3_toc_questions.json，pdfplumber 濾掉浮水印抽出）
＋ pack3/_analyse/T3_new_126_bilingue.json（已有中文）合併去重 → exam_t3_data.js
用法：python3 tools/exam_isle_build.py"""
import json,re,difflib,os
R=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
G=json.load(open(R+'/assets/tcf/_analyse/g3_toc_questions.json'))
B=json.load(open(R+'/assets/tcf/pack3/_analyse/T3_new_126_bilingue.json'))
def clean(s):
    s=re.sub(r'\s+(II|III|IV|VI|VII|VIII|IX|V)\b.*$','',s); s=re.sub(r'\s*##### .*$','',s); s=re.sub(r'\s+\d{2,3}$','',s)
    for a,b in [('- vous','-vous'),('bien- être','bien-être'),("d'’","d’"),('voitur e','voiture'),('Êtes- vous','Êtes-vous'),('Etes-vous','Êtes-vous'),
                ('Qu’en pensez vous','Qu’en pensez-vous'),("Qu'en pensez vous","Qu'en pensez-vous"),('Selon-vous','Selon vous'),(' new pays',' nouveau pays'),
                ('compagine','compagnie'),('éduquer vt ','éduquer '),('L’internet','Internet'),('payés.Qu','payés. Qu'),('emploi.Êtes','emploi. Êtes')]: s=s.replace(a,b)
    s=re.sub(r'\s*\.\s*\.+\s*$','',s).strip(' |'); s=re.sub(r'\s*([?!:;])',r' \1',s); s=re.sub(r'\s+',' ',s).replace(' . ',' ')
    return (s[0].upper()+s[1:]).strip()
HEADS={91,92,94,95,96,97,98,99,104,105,106,107,141}
FIX={  # 寶典原文不合標準法文 → 改寫，並把原文標出來（來源三層：標準法文＞課本＞逐字稿）
 43:("Il faut obliger les enfants à faire du sport. Êtes-vous d’accord ? Pourquoi ?",None),
 47:("Certains parents donnent de l'argent à leurs enfants quand ils ont de bonnes notes. Qu'en pensez-vous ?","寶典原文：…pour avoir des bonnes notes. Que pensez-vous ?（標準是 de bonnes notes、Qu’en pensez-vous）"),
 83:("Pour gagner beaucoup d'argent, il est indispensable d'avoir fait des études. Êtes-vous d'accord avec cette affirmation ?","寶典原文漏了 avec"),
 119:("La plupart des gens veulent paraître plus jeunes que leur âge. Qu'en pensez-vous ?","寶典原文：…veulent paraître jeune que leur âge（漏了 plus，jeune 也要配複數）"),
 126:("La voiture est indispensable en ville. Qu'en pensez-vous ?","寶典原文：…indispensable dans ville（標準是 en ville）"),
 147:("Quelles actions citoyennes (aide alimentaire, visite à des malades, projet écologique, etc.) jugez-vous admirables ?","寶典原文語序不完整：Les actions citoyennes (…) vous jugez admirables."),
 112:("De plus en plus de personnes choisissent de devenir végétariennes. Qu'en pensez-vous ?",None),
 121:("Trier ses déchets : tout le monde peut le faire. Qu'en pensez-vous ?",None),
 71:("Aimer son métier est-il nécessaire pour réussir sa carrière professionnelle ?",None),
 58:("L’importance du travail dans la vie. Qu'en pensez-vous ?",None),
}
def zq(q):  # 目錄缺「4 Travail」章名，章號不可靠 → 用題號分區
    for hi,z in [(24,'tech'),(54,'rel'),(85,'work'),(107,'cult'),(120,'sante'),(136,'env'),(152,'soc')]:
        if q<=hi: return z
Z={'2':'tech','3':'rel','4':'work','5':'cult','6':'sante','7':'env','8':'soc'}
out=[]
for g in G:
    if g['q'] in HEADS: continue
    fr,note=FIX.get(g['q'],(clean(g['fr']),None)); fr=clean(fr)
    o={'id':'G%d'%g['q'],'z':zq(g['q']),'fr':fr,'t':g['zh'].rstrip('：:?？ '),'src':'寶典 Q%d'%g['q']}
    if note: o['note']=note
    out.append(o)
def zof(fr,theme):
    f=fr.lower()
    for k,z in [('stress','sante'),('poids','sante'),('végétarien','sante'),('médic','sante'),('soins','sante'),('vêtement','work'),('voyage','cult'),('voyager','cult'),
                ('immigr','cult'),('étranger','cult'),('pays d','cult'),('culture','cult'),('théâtre','cult'),('animal','env'),('voiture','env'),
                ('action solidaire','soc'),('bénévole','soc'),('femmes','soc'),('état','soc'),('métier','work'),('travail','work'),('salaire','work'),
                ('téléphone','tech'),('internet','tech'),('réseaux','tech'),('télévision','tech'),('matières','rel'),('enfants','rel'),('jeunes','rel'),('études','rel')]:
        if k in f: return z
    return {'Technologie':'tech','La famille, l’éducation, le bonheur':'rel','Immigration':'cult','La politique, la société, la justice':'soc','Métier':'work','L’environnement, Les animaux, la nature':'env','Culture':'cult'}.get(theme,'soc')
nz=lambda s: re.sub(r'[^a-zà-ÿ]','',s.lower())
n=0
for b in B:
    nb=nz(b['fr']); r,bid=max((difflib.SequenceMatcher(None,nb,nz(o['fr'])).ratio(),o['id']) for o in out)
    if r>0.72:
        o=[x for x in out if x['id']==bid][0]; o.setdefault('zh',b['zh']); continue
    n+=1; out.append({'id':'B%d'%b['n'],'z':zof(b['fr'],b.get('theme')),'fr':clean(b['fr']),'zh':b['zh'],'src':'題庫'})
from collections import Counter
print(len(out),'題',Counter(o['z'] for o in out),'補',n)
open(R+'/exam_t3_data.js','w').write('/* 考場島第三題題目（tools/exam_isle_build.py 產生，⛔ 不要手改）。G＝寶典3目錄（t＝寶典的中文短標題）；B＝pack3 題庫（zh 全句中文）；note＝跟寶典原文不同的地方 */\nvar EXAM_T3='+json.dumps(out,ensure_ascii=False,indent=0)+';\n')
