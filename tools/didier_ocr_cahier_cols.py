# Cahier 逐字稿頁是三欄排版：用 Vision 每行的座標分欄（1D k-means，k=3），欄內由上往下
import sys, os
sys.path.insert(0, 'tools')
import ocr_pdf, Vision
from Foundation import NSURL
ocr_pdf.DPI = 300
url = NSURL.fileURLWithPath_(os.path.abspath('assets/EditoA2 2022 Cahier .pdf'))
def lines(img):
    h = Vision.VNImageRequestHandler.alloc().initWithCGImage_options_(img, None)
    r = Vision.VNRecognizeTextRequest.alloc().init()
    r.setRecognitionLevel_(Vision.VNRequestTextRecognitionLevelAccurate)
    r.setRecognitionLanguages_(ocr_pdf.LANGS); r.setUsesLanguageCorrection_(True)
    h.performRequests_error_([r], None)
    out = []
    for o in (r.results() or []):
        c = o.topCandidates_(1)
        if not c: continue
        b = o.boundingBox()          # 0–1，原點在左下
        out.append((b.origin.x, 1 - (b.origin.y + b.size.height), c[0].string()))
    return out
def kmeans(xs, k=3):
    cs = [0.08, 0.38, 0.67]
    for _ in range(20):
        g = [[] for _ in cs]
        for x in xs: g[min(range(k), key=lambda i: abs(x - cs[i]))].append(x)
        cs = [sum(v) / len(v) if v else cs[i] for i, v in enumerate(g)]
    return cs
out = open(sys.argv[1], 'w', encoding='utf-8')
for p in range(int(sys.argv[2]), int(sys.argv[3]) + 1):
    L = lines(ocr_pdf.page_image(url, p - 1))
    cs = kmeans([x for x, _, _ in L])
    cols = [[] for _ in cs]
    for x, y, t in L: cols[min(range(3), key=lambda i: abs(x - cs[i]))].append((y, t))
    out.write(f'\n===== page {p} =====\n')
    for c in cols:
        out.write('\n'.join(t for _, t in sorted(c)) + '\n')
    print('page', p, [round(c, 2) for c in cs], flush=True)
