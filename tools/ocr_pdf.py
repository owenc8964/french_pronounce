#!/usr/bin/env python3
"""tools/ocr_pdf.py — 把「掃描檔 PDF」用 macOS 內建 OCR 轉成文字（2026-08-25 新增）

為什麼要有這支：`assets/` 裡有些 PDF 是掃描的圖片，沒有文字層，
`tools/extract_textbook.py`（pdfplumber）抽出來是 0 個字——
`le-delf-a2-100-reussite-2e-edition_compress.pdf`（DELF A2 全真題）與
`EditoA2 2022 Cahier .pdf`（A2 練習本）都是這種。這兩本正好是最值錢的素材。

用 **Apple 內建的 Vision OCR**（pyobjc-framework-Vision）：
- 完全離線，不上傳任何東西到外部服務（教材是商業內容，也是 Owen 的個人資料）
- 法文辨識率比 tesseract 好，而且不用另外裝 500MB 的語言包

⚠️ 產出的 `.txt` 跟 `.textbook_cache.txt` 一樣是商業教材內容，**只留本機、不進 git**。
⚠️ OCR 一定有錯字。所以劇本引用時**照樣要跑 `tools/check_scenes.js` 比對**，
   而且 OCR 來源的句子要更小心——看起來怪就回去翻原書那一頁。

用法：
    python3 tools/ocr_pdf.py "assets/le-delf-a2-100-reussite-2e-edition_compress.pdf"
    python3 tools/ocr_pdf.py --all          # 掃 assets/ 裡所有「抽不到文字」的 PDF
輸出：assets/.ocr_<檔名>.txt（**不**併進 .textbook_cache.txt，見 done() 的說明）
"""
import os, sys, glob

try:
    import pdfplumber
    import Quartz
    import Vision
    from Foundation import NSURL
except ImportError as e:
    sys.exit(f"缺套件：{e}\n請先跑：pip3 install pyobjc-framework-Vision pyobjc-framework-Quartz pdfplumber")

CACHE = "assets/.textbook_cache.txt"
DPI = 200               # 200dpi 對印刷體夠用，再高只是變慢
LANGS = ["fr-FR", "en-US"]


def page_image(pdf_url, index):
    """用 Quartz 把 PDF 的第 index 頁 render 成 CGImage"""
    doc = Quartz.CGPDFDocumentCreateWithURL(pdf_url)
    page = Quartz.CGPDFDocumentGetPage(doc, index + 1)
    if page is None:
        return None
    rect = Quartz.CGPDFPageGetBoxRect(page, Quartz.kCGPDFMediaBox)
    scale = DPI / 72.0
    w, h = int(rect.size.width * scale), int(rect.size.height * scale)
    if w <= 0 or h <= 0:
        return None
    cs = Quartz.CGColorSpaceCreateDeviceRGB()
    ctx = Quartz.CGBitmapContextCreate(None, w, h, 8, 0, cs, Quartz.kCGImageAlphaNoneSkipLast)
    Quartz.CGContextSetRGBFillColor(ctx, 1, 1, 1, 1)
    Quartz.CGContextFillRect(ctx, Quartz.CGRectMake(0, 0, w, h))
    Quartz.CGContextScaleCTM(ctx, scale, scale)
    Quartz.CGContextDrawPDFPage(ctx, page)
    return Quartz.CGBitmapContextCreateImage(ctx)


def ocr_image(img):
    """Vision 文字辨識，回傳這一頁的所有文字（一行一個 observation）"""
    handler = Vision.VNImageRequestHandler.alloc().initWithCGImage_options_(img, None)
    req = Vision.VNRecognizeTextRequest.alloc().init()
    req.setRecognitionLevel_(Vision.VNRequestTextRecognitionLevelAccurate)
    req.setRecognitionLanguages_(LANGS)
    req.setUsesLanguageCorrection_(True)
    ok, err = handler.performRequests_error_([req], None)
    if not ok:
        return ""
    out = []
    for obs in (req.results() or []):
        cand = obs.topCandidates_(1)
        if cand:
            out.append(cand[0].string())
    return "\n".join(out)


def has_text_layer(path):
    try:
        with pdfplumber.open(path) as pdf:
            probe = pdf.pages[:min(20, len(pdf.pages))]
            return sum(len(p.extract_text() or "") for p in probe) > 500
    except Exception:
        return False


def ocr_pdf(path):
    name = os.path.basename(path)
    out_path = "assets/.ocr_" + os.path.splitext(name)[0].replace(" ", "_") + ".txt"
    url = NSURL.fileURLWithPath_(os.path.abspath(path))
    doc = Quartz.CGPDFDocumentCreateWithURL(url)
    n = Quartz.CGPDFDocumentGetNumberOfPages(doc)
    print(f"OCR {name}：{n} 頁（200dpi，Apple Vision，離線）")
    chars = 0
    with open(out_path, "w", encoding="utf-8") as f:
        for i in range(n):
            img = page_image(url, i)
            t = ocr_image(img) if img is not None else ""
            chars += len(t)
            f.write(f"\n\n===== [{name}] page {i+1} =====\n{t}\n")
            if (i + 1) % 20 == 0:
                print(f"  …{i+1}/{n} 頁，{chars} 字")
    print(f"✅ {out_path}：{chars} 字")
    return out_path


def done(paths):
    """⚠️ 刻意**不**把 OCR 內容合併進 .textbook_cache.txt。
    `tools/check_scenes.js` 會把每個 .ocr_*.txt 當成**獨立來源**載入，
    這樣報表才分得出哪些句子是 OCR 來的——OCR 一定有錯字，
    那些句子需要多一層人工校對，混進課本快取就看不出來了。"""
    if paths:
        print("✅ " + "、".join(os.path.basename(p) for p in paths)
              + " 已產生；check_scenes.js 會自動把它們當獨立來源載入（報表會標 OCR）")


if __name__ == "__main__":
    args = sys.argv[1:]
    if not args:
        sys.exit(__doc__)
    if args[0] == "--all":
        targets = [p for p in sorted(glob.glob("assets/*.pdf")) if not has_text_layer(p)]
        if not targets:
            sys.exit("assets/ 裡每一本都抽得到文字，不需要 OCR")
        print("需要 OCR 的：" + "、".join(os.path.basename(t) for t in targets))
    else:
        targets = args
    done([ocr_pdf(t) for t in targets])
