#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""從 TEF Nouvelle Edition 的 OCR 文字抽出「完整模擬考」120 題＋正解。

前置：python3 tools/ocr_pdf.py "assets/tcf/tef/raw/.../TEF Nouvelle Edition.pdf"
      → 產生 assets/.ocr_TEF_Nouvelle_Edition.txt（⛔ gitignore）
跑法（從 repo 根目錄）：python3 tools/tef_extract_test_blanc.py

⚠️ 兩個踩過的坑，改這支之前先看：
1. 題號正則若允許「前綴吃字元」，`10.` 會被吃成 `0.` → 用兩段式比對（純題號 / 音軌號+題號）
2. 圖表頁（p162）的軸標 `22+`、`°C` 會被誤判成題號，先建立空題幹的佔位，
   之後 `setdefault` 就擋掉真正的題幹 → 遇到更好的題幹一律覆蓋（見 better_stem）
"""
import re, json, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))   # repo 根目錄（本檔在 tools/）
OCR = os.path.join(ROOT, "assets", ".ocr_TEF_Nouvelle_Edition.txt")
OUT = os.path.join(ROOT, "assets", "tcf", "tef", "_analyse", "test_blanc")
RANGES = {"CE": range(155, 172), "CO": range(172, 181), "LS": range(181, 189)}
BAREME = {"A1":"0-6","A2":"7-15","B1":"16-21","B2":"22-28","C1":"29-35","C2":"36-40"}

if not os.path.exists(OCR):
    sys.exit(f"找不到 {OCR}——先跑 tools/ocr_pdf.py")
txt = open(OCR, encoding="utf-8").read()
pp = re.split(r"===== \[TEF Nouvelle Edition\.pdf\] page (\d+) =====", txt)
P = {int(pp[i]): pp[i + 1] for i in range(1, len(pp), 2)}

def parse_key(page, section, stops):
    body = P[page]; start = body.find(section)
    ends = [body.find(s, start + 1) for s in stops]; ends = [e for e in ends if e > start]
    seg = body[start: min(ends) if ends else len(body)]
    return {int(a): b for a, b in re.findall(r"\b(\d{1,2})\s*([a-d])\s*\.?\s*[;\n]", seg)}

KEY = {"CE": parse_key(219, "COMPRÉHENSION ÉCRITE", ["COMPRÉHENSION ORALE"]),
       "CO": parse_key(219, "COMPRÉHENSION ORALE", ["LEXIQUE"]),
       "LS": parse_key(220, "LEXIQUE ET STRUCTURE", ["EXPRESSION ÉCRITE"])}

Q1  = re.compile(r"^(\d{1,2})\s*[.\-–]\s*(.*)$")                    # 純題號開頭
Q2  = re.compile(r"^\D{0,4}\d{1,3}\s+(\d{1,2})\s*[.\-–]\s*(.*)$")   # 音軌號 + 題號
OPT = re.compile(r"^\s*([a-d])\.\s*[O•|L]?\s*(.*)$")

def qmatch(l):
    for r in (Q1, Q2):
        m = r.match(l)
        if m and 1 <= int(m.group(1)) <= 40:
            return m

def letters(s):
    return len(re.findall(r"[A-Za-zÀ-ÿ]", s))

def better_stem(old, new):
    """新題幹要「更像句子」才覆蓋——擋掉圖表軸標那種噪音。"""
    return letters(new) >= 4 and letters(new) > letters(old)

def parse(pages):
    qs = {}; cur = None; pend = None
    for n in pages:
        for l in P.get(n, "").split("\n"):
            l = l.rstrip()
            mo = OPT.match(l)
            if mo and cur:
                val = mo.group(2).strip().lstrip("O•| ").strip()
                qs[cur]["options"][mo.group(1)] = val
                pend = (cur, mo.group(1)) if not val else None
                continue
            m = qmatch(l)
            if m:
                cur = int(m.group(1)); pend = None
                stem = m.group(2).strip()
                if cur not in qs:
                    qs[cur] = {"n": cur, "page": n, "enonce": stem, "options": {}}
                elif better_stem(qs[cur]["enonce"], stem):
                    qs[cur]["enonce"] = stem; qs[cur]["page"] = n
                continue
            s = l.strip().lstrip("•|O ").strip()
            if not s or s.isdigit():
                continue
            if pend:                                   # 上一個選項是空的 → 換行值
                qs[pend[0]]["options"][pend[1]] = s; pend = None
            elif cur and not qs[cur]["options"] and letters(s) >= 4:
                qs[cur]["enonce"] = (qs[cur]["enonce"] + " " + s).strip()
    return qs

os.makedirs(OUT, exist_ok=True)
tot = f4 = 0
for code, rng in RANGES.items():
    qs = parse(rng)
    for q in qs.values():
        q["reponse"] = KEY[code].get(q["n"])
    miss  = [i for i in range(1, 41) if i not in qs]
    empty = [q["n"] for q in qs.values() if letters(q["enonce"]) < 4]
    n4 = sum(1 for q in qs.values() if len(q["options"]) == 4)
    tot += len(qs); f4 += n4
    print(f"{code}: {len(qs)}/40 題｜四選項齊 {n4}｜有正解 {sum(1 for q in qs.values() if q['reponse'])}"
          f"｜缺號 {miss}｜題幹仍空 {empty}")
    json.dump({"epreuve": code,
               "source": "TEF Nouvelle Edition (Hachette 2023) — test blanc",
               "niveau_bareme": BAREME,
               "questions": [qs[k] for k in sorted(qs)],
               "corrige": KEY[code]},
              open(f"{OUT}/TEF_test_blanc_{code}.json", "w", encoding="utf-8"),
              ensure_ascii=False, indent=1)
print(f"合計 {tot}/120 題，四選項齊全 {f4}")
