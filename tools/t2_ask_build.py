#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""t2_ask_build.py — 「如果你想問＿＿，要選哪個？」問句選擇題的題庫（2026-11-27）
Owen：「遊戲可以設計這個選擇題：如果你想問 XXX（中文）要選哪個，當然要一些更精準的部分」
來源（⛔ 一句都不自己寫法文）：
  ① 《口语2备考宝典》Phrases 段（tools/t2_questions_extract.py → t2_questions_raw.json）
  ② 考場島 EXAM_ANGLES（同一本寶典，content_src.js）
分類＝寫作第一題要給的同一組資訊欄位（口說第二題「問」＝寫作第一題「給」，11-27 確認）。
「精準」＝錯的選項都是同一欄位、意思相近但不是你要問的那句（開始 vs 結束、價格 vs 免費…）；
  意思相同的問法標同一組 same，⛔ 同組不會互相當錯誤選項。
輸出：assets/tcf/exam_isle/t2_ask.js（window.T2_ASK），上傳私人空間 exam_isle/t2_ask.js（寶典內容不進公開 repo）"""
import json, os, re, unicodedata
from opencc import OpenCC
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EI = os.path.join(ROOT, 'assets/tcf/exam_isle')
cc = OpenCC('s2twp')

SLOTS = [  # id, 圖示, 名稱（＝寫作第一題要寫進去的那幾項）
    ('temps', '⏰', '時間'), ('lieu', '📍', '地點和交通'), ('prix', '💶', '價格和付款'),
    ('regle', '📜', '規定、取消、退款'), ('besoin', '♿', '特殊需求'), ('meteo', '🌧️', '天氣和突發狀況'),
    ('contenu', '🧩', '內容和設施'), ('fete', '🎉', '跟朋友一起籌劃（用 tu）')]
SLOT_OF = {}
for slot, ids in {
    'temps': [41, 56, 57, 58, 59, 118],
    'lieu': [7, 8, 75],
    'prix': [0, 10, 12, 13, 14, 15, 16, 17, 18, 19, 21, 24, 25, 26, 27, 28, 29, 30, 47, 48, 49, 50, 60, 61, 62],
    'regle': [20, 22, 23, 39, 40, 63, 64],
    'besoin': [31, 32, 33, 34, 65, 66, 67, 68, 69],
    'meteo': [35, 36, 37, 38],
    'contenu': [43, 44, 51, 52, 53, 54, 55, 73, 74],
    'fete': [76, 77] + list(range(79, 105)) + [110, 111, 105, 106, 107, 108, 109, 112, 114, 115, 116, 117, 119],
}.items():
    for i in ids:
        SLOT_OF[i] = slot
ANGLE_SLOT = {'⏰': 'temps', '📍': 'lieu', '💶': 'prix', '👨‍👩‍👧': 'besoin', '🌧️': 'meteo', '📜': 'regle', '🧩': 'contenu'}
# 寶典的中文不是翻譯（是註記）或簡轉繁轉錯的：人工給中文大意
ZH = {0: '可以分期付款嗎？', 8: '哪裡可以免費停車？', 69: '有針對過敏者的設施嗎？', 73: '我的房間有附家具嗎？',
      74: '大樓的維護做得好嗎？', 75: '搭大眾運輸方便嗎？', 61: '訂房需要先付訂金嗎？'}
FR = {8: 'Où peut-on se garer gratuitement ?'}   # 原文（gratuitement）的全形括號是排版
ZFIX = [('型別', '類型'), ('酒店', '飯店'), ('轉賬', '轉帳'), ('選單', '菜單'), ('簽名雞尾酒', '招牌雞尾酒'), ('播放列表', '播放清單'),
        ('設定⼀個', '設一個'), ('⽆', '無'), ('隻有', '只有'), ('殘疾⼈', '身心障礙者'), ('殘疾人', '身心障礙者'), ('酒店有無', '有沒有'), ('數字', '數位'), ('房間里', '房間裡'), ('傢俱', '家具'), ('飯店有無適合身心障礙者的房間', '有適合身心障礙者的房間嗎'), ('請求一間', '要一間')]
# 意思一樣的問法（兩句都算對）→ 同一組，不會互當錯誤選項
SAME = [[10, 12, 'Combien ça coûte ?'], [15, 16, 17, 18], [28, 50, 'Y a-t-il des réductions pour les étudiants ?'],
        [24, 25, 60], [20, 22], [39, 64, 'Quelle est votre politique de remboursement ?'], [41, 56],
        [68, 'Avez-vous un service de garde d’enfants pendant la visite ?'], [21, 'C’est payant ou gratuit ?'],
        [33, 'Proposez-vous des menus végétariens ou sans gluten ?'], [31, 'Y a-t-il des rampes d’accès pour les fauteuils roulants ?'],
        [35, 'Que se passe-t-il si le temps est mauvais pendant l’excursion ?'], [107, 108]]


def zh_clean(z):
    z = cc.convert(unicodedata.normalize('NFKC', z)).replace(' ', '')
    for a, b in ZFIX:
        z = z.replace(a, b)
    z = z.replace('?', '？').replace(',', '，').replace('(', '（').replace(')', '）').replace('：', '：')
    return z if z.endswith(('？', '）')) or '？' in z else z + '？'


def key(fr):
    return re.sub(r'\s+', ' ', fr.replace('’', "'").lower()).strip()


def main():
    raw = json.load(open(os.path.join(EI, 't2_questions_raw.json'), encoding='utf-8'))
    items, by_key = [], {}
    for i, x in enumerate(raw):
        if i not in SLOT_OF:
            continue
        fr = FR.get(i, x['fr'])
        it = {'id': 'g%d' % i, 'fr': fr, 'zh': zh_clean(ZH.get(i, x['zh'])), 'slot': SLOT_OF[i], 'src': '寶典 p.%d' % x['page']}
        items.append(it); by_key[key(fr)] = it
    src = open(os.path.join(EI, 'content_src.js'), encoding='utf-8').read()
    a = src.index('var EXAM_ANGLES'); b = src.index('];', a)
    for m in re.finditer(r"\['(\S+)','([^']+)',\[(.*?)\]\]", src[a:b]):
        slot = ANGLE_SLOT.get(m.group(1))
        for k, (fr, zh) in enumerate(re.findall(r"\['([^']*)','([^']*)'\]", m.group(3))):
            if '…' in fr or key(fr) in by_key or not slot:
                continue
            it = {'id': 'a%s%d' % (slot, k), 'fr': fr, 'zh': zh, 'slot': slot, 'src': '考場島'}
            items.append(it); by_key[key(fr)] = it
    for n, grp in enumerate(SAME):
        for g in grp:
            it = by_key.get(key(g)) if isinstance(g, str) else next((x for x in items if x['id'] == 'g%d' % g), None)
            if it:
                it['same'] = n
    cnt = {s: sum(x['slot'] == s for x in items) for s, _, _ in SLOTS}
    out = 'window.T2_ASK=' + json.dumps({'slots': [{'id': s, 'em': e, 'name': n} for s, e, n in SLOTS], 'items': items}, ensure_ascii=False) + ';\n'
    open(os.path.join(EI, 't2_ask.js'), 'w', encoding='utf-8').write(out)
    print(len(items), '題', cnt)


if __name__ == '__main__':
    main()
