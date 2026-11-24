"""exam_prof_build.py — 給老師的 TCF 聽力／閱讀練習包（2026-11-24）
Owen：「老師也想要那個聽力及閱讀的檔案；mock.html 比較適合我自己練習；依照 mock.html 的做法做一個可以讓他單機打開的東東」
→ 選「題目＋音檔＋答案＋法文原文」（⛔ 不放給 Owen 看的中文解析）、「做成資料夾 Owen 自己傳」
輸出：assets/tcf/_pour_le_prof/TCF_entrainement/（⛔ 在 gitignore 的 assets/tcf 裡；考題不進公開 repo）
  index.html＋data/<id>.js（用 <script> 載入，雙擊 index.html 從 file:// 開也能用）＋img/（webp）＋audio/（另由 ffmpeg 壓成單聲道 48k）
用法：python3 tools/exam_prof_build.py"""
import json, os, shutil
from PIL import Image
R=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
E=R+'/assets/tcf/exam'; O=R+'/assets/tcf/_pour_le_prof/TCF_entrainement'
os.makedirs(O+'/data',exist_ok=True); os.makedirs(O+'/img',exist_ok=True)
cues=json.loads(open(E+'/cues.js').read().split('=',1)[1].strip().rstrip(';'))
man=json.load(open(E+'/cues_manual.json'))
def img(src):
    b=os.path.splitext(os.path.basename(src))[0]; dst=O+'/img/'+b+'.webp'
    if not os.path.exists(dst):
        w=E+'/webp/'+b+'.webp'
        if os.path.exists(w): shutil.copy(w,dst)
        else: Image.open(E+'/'+src).convert('RGB').save(dst,'WEBP',quality=80)
    return 'img/'+b+'.webp'
idx={'co':[],'ce':[]}
for skill,key,txt in [('listening','co','script_fr'),('reading','ce','text_fr')]:
    for t in json.load(open(E+'/'+skill+'.json'))['tests']:
        c=list(cues.get(t['id'],[]))
        for q,v in (man.get(t['id']) or {}).items():
            i=int(q)-1
            while len(c)<=i: c.append(None)
            c[i]=v['t'] if v.get('t') is not None else None
        Q=[{'n':int(q['q']),'img':img(q['img']) if q.get('img') else '','stem':q.get('stem',''),'opts':q['opts'],'a':q['answer'],'t':q[txt]} for q in t['questions']]
        d={'id':t['id'],'skill':key,'label':t['label'],'audio':('audio/'+os.path.basename(t['audio'])) if key=='co' else '','cues':c,'q':Q}
        open(O+'/data/'+t['id']+'.js','w').write('TCF_LOAD('+json.dumps(d,ensure_ascii=False)+');\n')
        idx[key].append({'id':t['id'],'label':t['label'],'n':len(Q)})
open(O+'/data/index.js','w').write('TCF_INDEX('+json.dumps(idx,ensure_ascii=False)+');\n')
shutil.copy(R+'/tools/exam_prof_index.html', O+'/index.html')
print('ok', len(idx['co']), len(idx['ce']), 'img', len(os.listdir(O+'/img')))
