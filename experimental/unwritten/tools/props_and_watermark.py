# 1) Slice needed props from assets/tiles/extraassets.png (6x4 grid on magenta)
# 2) Detect + clone-patch the Gemini sparkle watermark in processed full-screen art
import os
from PIL import Image, ImageChops

ROOT = r'C:\Users\danie\Projects\unwrittenGame01'
os.chdir(ROOT)

def content_mask(im):
    r, g, b = im.convert('RGB').split()
    rm = r.point(lambda v: 255 if v > 180 else 0)
    bm = b.point(lambda v: 255 if v > 180 else 0)
    gm = g.point(lambda v: 255 if v < 100 else 0)
    mag = ImageChops.multiply(ImageChops.multiply(rm, bm), gm)
    return ImageChops.invert(mag)

def keyed_rgba(im):
    im = im.convert('RGBA')
    nd = [(r, g, b, 0) if (r > 180 and b > 180 and g < 100) else (r, g, b, a)
          for (r, g, b, a) in im.getdata()]
    im.putdata(nd)
    return im

# ---- props ----
import shutil
if not os.path.exists('assets/src/extraassets.png'):
    shutil.copy2('assets/tiles/extraassets.png', 'assets/src/extraassets.png')
sheet = Image.open('assets/src/extraassets.png')
W, H = sheet.size
mask = content_mask(sheet)
# grid cells: 6 cols x 4 rows, refine bbox per cell
def cell(r, c):
    q = (W * c // 6, H * r // 4, W * (c + 1) // 6, H * (r + 1) // 4)
    bb = mask.crop(q).getbbox()
    return (q[0] + bb[0], q[1] + bb[1], q[0] + bb[2], q[1] + bb[3]) if bb else None

WANT = {  # prop kind -> (row, col) in the sheet
    'crate':  (0, 0), 'barrel': (0, 2), 'candle': (1, 0), 'clock': (2, 2),
    'lamp':   (3, 4), 'wreath': (3, 2), 'bones':  (1, 5), 'reeds':  (2, 4),
}
os.makedirs('assets/props', exist_ok=True)
for kind, (r, c) in WANT.items():
    bb = cell(r, c)
    if not bb:
        print('prop', kind, 'EMPTY'); continue
    im = keyed_rgba(sheet.crop(bb))
    s = 64 / im.height
    im = im.resize((max(1, round(im.width * s)), 64), Image.LANCZOS)
    im.save(f'assets/props/{kind}.png')
    print('prop', kind, im.size)
os.remove('assets/tiles/extraassets.png')

# ---- watermark patch ----
def patch(path):
    im = Image.open(path).convert('RGB')
    W, H = im.size
    x0, y0 = int(W * 0.80), int(H * 0.60)
    reg = im.crop((x0, y0, W, H)).convert('L')
    px = list(reg.getdata())
    rw, rh = reg.size
    med = sorted(px)[len(px) // 2]
    mx = max(px)
    if mx < med + 40:
        print(os.path.basename(path), 'no watermark found'); return
    mi = px.index(mx)
    cx, cy = mi % rw, mi // rw
    xs, ys = [], []
    for y in range(max(0, cy - 40), min(rh, cy + 40)):
        for x in range(max(0, cx - 40), min(rw, cx + 40)):
            if px[y * rw + x] > med + 30:
                xs.append(x); ys.append(y)
    bx0, bx1, by0, by1 = min(xs), max(xs), min(ys), max(ys)
    if bx1 - bx0 > 70 or by1 - by0 > 70:
        print(os.path.basename(path), 'cluster too big — skipped', (bx1 - bx0, by1 - by0)); return
    pad = 8
    rx0, ry0 = x0 + bx0 - pad, y0 + by0 - pad
    rx1, ry1 = x0 + bx1 + pad, y0 + by1 + pad
    w = rx1 - rx0
    src_box = (rx0 - w - 12, ry0, rx1 - w - 12, ry1)
    im.paste(im.crop(src_box), (rx0, ry0))
    im.save(path, optimize=True)
    print(os.path.basename(path), 'patched at', (rx0, ry0, rx1, ry1))

for p in ['assets/ui/title.png', 'assets/ui/book.png', 'assets/ui/parchment.png', 'assets/bg/finale.png'] + \
         [f'assets/bg/{n:02d}.png' for n in range(1, 11)]:
    patch(p)
print('done')
