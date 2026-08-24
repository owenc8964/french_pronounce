#!/usr/bin/env python3
"""tools/extract_textbook.py — 把 assets/ 裡的課本 PDF 抽成純文字快取（2026-08-25 新增）

為什麼要有這支：情境劇本的法文**不可以是 Claude 編的**（教材鐵律）。原本 `tools/check_scenes.js`
只拿 `french_notes.html` 當唯一出處，但筆記是課堂重點整理，**沒有完整的對話逐字稿**——
Owen 的 Édito A1 課本後面就有全部聽力的 transcriptions（服務生／店員／朋友邀約的真實台詞），
那才是對話樹真正該引用的來源。

⚠️ 產出的 `assets/.textbook_cache.txt` 是**商業教材內容**，已寫進 .gitignore，永遠不 commit。
   PDF 本身也是（`assets/*.pdf`）。這支工具只在本機跑。

⚠️ 兩欄排版的坑：Édito 的 transcriptions 是左右兩欄，整頁抽取會把兩欄的句子交錯混在一起，
   一個句子被硬生生切斷（「Je voudrais de la blanquette de veau」／「avec du riz.」分屬兩處）。
   所以每頁抽三次：整頁 ＋ 左半 ＋ 右半，三份都寫進快取。
   檢查器只做「這句話存不存在」的子字串比對，多寫幾份不會有副作用，卻能讓任一種版面都對得上。

用法：python3 tools/extract_textbook.py
"""
import glob, os, sys

try:
    import pdfplumber
except ImportError:
    sys.exit("需要 pdfplumber：pip3 install pdfplumber")

OUT = "assets/.textbook_cache.txt"

def main():
    pdfs = sorted(glob.glob("assets/*.pdf"))
    if not pdfs:
        sys.exit("assets/ 裡沒有 PDF")
    total_pages = 0
    with open(OUT, "w", encoding="utf-8") as out:
        for path in pdfs:
            try:
                pdf = pdfplumber.open(path)
            except Exception as e:
                print(f"  ⚠️ 跳過 {path}：{e}")
                continue
            with pdf:
                n = len(pdf.pages)
                chars = 0
                for i, page in enumerate(pdf.pages):
                    w, h = page.width, page.height
                    out.write(f"\n\n===== [{os.path.basename(path)}] page {i+1} =====\n")
                    for box in (None, (0, 0, w / 2, h), (w / 2, 0, w, h)):
                        try:
                            t = (page.crop(box).extract_text() if box else page.extract_text()) or ""
                        except Exception:
                            t = ""
                        chars += len(t)
                        out.write(t + "\n---\n")
                total_pages += n
                print(f"  {os.path.basename(path)}：{n} 頁，{chars} 字"
                      + ("　（掃描檔？抽不到文字）" if chars < 200 else ""))
    print(f"✅ 寫入 {OUT}（{total_pages} 頁，{os.path.getsize(OUT)} bytes）")

if __name__ == "__main__":
    main()
