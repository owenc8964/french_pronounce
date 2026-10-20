import re,json,sys
txt=open('assets/.textbook_cache.txt',encoding='utf-8').read()
pages=re.split(r'\n\n===== \[(.+?)\] page (\d+) =====\n',txt)
# pages: [pre, name, num, body, name, num, body...]
halves=[]
for i in range(1,len(pages),3):
    name,num,body=pages[i],int(pages[i+1]),pages[i+2]
    if not name.startswith('Edito22 A2'): continue
    blocks=body.split('\n---\n')
    if len(blocks)<3: continue
    if num < 195: continue
    halves.append((num,blocks[1])); halves.append((num,blocks[2]))
stream='\n'.join(b for _,b in halves)
vi=stream.find('Documents vidéos')
if vi>0: stream=stream[:vi]   # 影片逐字稿的編號（1 Page 22…）跟音軌撞號，切掉
# 標頭：「118 Page 182, Compréhension de l'oral, Exercice 1」

def unit_at(text, pos, _c={}):
    """pos 之前最後一個「Unité N」標題（只收遞增的，排除頁首頁尾雜訊）"""
    key = id(text)
    if key not in _c:
        seq, last = [], 0
        for u in re.finditer(r'^\s*\|?\s*Unité (\d{1,2})\b', text, re.M):
            n = int(u.group(1))
            if last < n <= last + 1: seq.append((u.start(), n)); last = n
        _c[key] = seq
    n = None
    for a, k in _c[key]:
        if a <= pos: n = k
        else: break
    return n

hdr=re.compile(r'^(\d{1,3}) Page (\d{1,3})\s*,?\s*(.*)$',re.M)
ms=list(hdr.finditer(stream))
out={}
for k,m in enumerate(ms):
    n=int(m.group(1)); end=ms[k+1].start() if k+1<len(ms) else len(stream)
    body=stream[m.end():end]
    keep=[]
    for ln in body.strip().split('\n'):
        if re.match(r'^Transcriptions?\b',ln) or re.search(r'(cent|vingt|deux|trois|quatre|cinq|six|sept|huit|neuf|dix)[\w-]*\s*I\s*\d+\s*$',ln) or re.match(r'^Unité \d+',ln) or re.match(r'^\d{3}\s*I\s*[a-z-]+$',ln.strip()) or re.match(r'^\d{1,2}$',ln.strip()):
            continue
        keep.append(ln)
    body='\n'.join(keep)
    # ⚠️ p.211 左欄底部就開始是影片逐字稿（「Page 22, Les Jeux…」沒有音軌號）→ 遇到就截斷（10-20 抓到黏在 120 尾巴）
    vm=re.search(r'^Page \d+\s*,', body, re.M)
    if vm: body=body[:vm.start()].rstrip()
    if n in out: continue
    out[n]={'track':n,'unit':unit_at(stream,m.start()),'page':int(m.group(2)),'title':m.group(3).strip(),'text':body.strip()}
print(len(out),'軌；缺：',[i for i in range(1,122) if i not in out][:40])
json.dump(out,open(sys.argv[1],'w',encoding='utf-8'),ensure_ascii=False,indent=1)
for n in (1,2,118,121):
    if n in out: print(n,out[n]['page'],out[n]['title'],'|',out[n]['text'][:120].replace('\n',' / '))
