# UNWRITTEN asset pipeline: originals -> game-ready files.
# - backs up originals to assets/src/
# - bgs: crop right 6% (watermark), scale to h=360
# - ui: crop right 5%, scale to 1280x720; finale goes to assets/bg/finale.png
# - novelist sheet: auto-slice frames on magenta, pre-key alpha, scale to h=36
# - tile sheets: slice top-row texture cells -> 32x32 ground/fill/plat/water
import os, shutil
from PIL import Image, ImageChops

ROOT = r'C:\Users\danie\Projects\unwrittenGame01'
os.chdir(ROOT)
SRC = 'assets/src'
os.makedirs(SRC, exist_ok=True)

def backup(path):
    dst = os.path.join(SRC, os.path.basename(path))
    if not os.path.exists(dst):
        shutil.copy2(path, dst)
    return dst

# ---------- backgrounds ----------
for n in range(1, 11):
    p = f'assets/bg/{n:02d}.png'
    src = backup(p)
    im = Image.open(src).convert('RGB')
    w, h = im.size
    im = im.crop((0, 0, int(w * 0.94), h))
    s = 360 / im.height
    im = im.resize((round(im.width * s), 360), Image.LANCZOS)
    im.save(p, optimize=True)
    print('bg', n, im.size)

# ---------- full-screen UI ----------
for name, out in [('title', 'assets/ui/title.png'),
                  ('parchment', 'assets/ui/parchment.png'),
                  ('book', 'assets/ui/book.png'),
                  ('finale', 'assets/bg/finale.png')]:
    src = backup(f'assets/ui/{name}.png')
    im = Image.open(src).convert('RGB')
    w, h = im.size
    im = im.crop((0, 0, int(w * 0.95), h))
    im = im.resize((1280, 720), Image.LANCZOS)
    im.save(out, optimize=True)
    print('ui', name, '->', out)
# retire unused alternates / raw sheets from game dirs
for stray in ['assets/ui/book2.png', 'assets/ui/finale.png']:
    if os.path.exists(stray):
        backup(stray)
        os.remove(stray)

# ---------- magenta-sheet slicing ----------
def content_mask(im):
    r, g, b = im.convert('RGB').split()
    rm = r.point(lambda v: 255 if v > 180 else 0)
    bm = b.point(lambda v: 255 if v > 180 else 0)
    gm = g.point(lambda v: 255 if v < 100 else 0)
    mag = ImageChops.multiply(ImageChops.multiply(rm, bm), gm)
    return ImageChops.invert(mag)  # 255 = content

def bands(vals, thr, min_gap):
    raw, inb, s = [], False, 0
    for i, v in enumerate(vals):
        if v > thr and not inb: inb, s = True, i
        elif v <= thr and inb: inb = False; raw.append((s, i))
    if inb: raw.append((s, len(vals)))
    merged = []
    for b0 in raw:
        if merged and b0[0] - merged[-1][1] < min_gap:
            merged[-1] = (merged[-1][0], b0[1])
        else:
            merged.append(b0)
    return merged

def cells(im):
    """Return list of rows, each a list of precise content bboxes."""
    mask = content_mask(im)
    F = 8
    small = mask.resize((im.width // F, im.height // F), Image.NEAREST)
    sw, sh = small.size
    data = list(small.getdata())
    rowp = [sum(1 for x in range(sw) if data[y * sw + x]) for y in range(sh)]
    out = []
    for (y0, y1) in bands(rowp, 1, 4):
        colp = [sum(1 for y in range(y0, y1) if data[y * sw + x]) for x in range(sw)]
        row = []
        for (x0, x1) in bands(colp, 0, 4):
            region = (x0 * F, y0 * F, min(x1 * F, im.width), min(y1 * F, im.height))
            bb = mask.crop(region).getbbox()
            if bb:
                row.append((region[0] + bb[0], region[1] + bb[1], region[0] + bb[2], region[1] + bb[3]))
        out.append(row)
    return out

def keyed_rgba(im):
    im = im.convert('RGBA')
    nd = [(r, g, b, 0) if (r > 180 and b > 180 and g < 100) else (r, g, b, a)
          for (r, g, b, a) in im.getdata()]
    im.putdata(nd)
    return im

# ---------- novelist ----------
src = backup('assets/chars/novelist.png')
sheet = Image.open(src)
rows = cells(sheet)
print('novelist rows:', [len(r) for r in rows])
flat = [bb for row in rows for bb in row]
top, bottom = rows[0], rows[1] if len(rows) > 1 else []
names = {}
if len(top) >= 5:
    names['idle1'] = top[0]; names['idle2'] = top[1]
    names['walk1'] = top[2]; names['walk2'] = top[3]; names['walk3'] = top[4]
    names['walk4'] = top[3]
if bottom:
    names['jump'] = bottom[-1]
for name, bb in names.items():
    fr = keyed_rgba(sheet.crop(bb))
    s = 36 / fr.height
    fr = fr.resize((max(1, round(fr.width * s)), 36), Image.LANCZOS)
    fr.save(f'assets/chars/{name}.png')
    print('char', name, fr.size)
os.remove('assets/chars/novelist.png')  # raw sheet lives in assets/src now

# ---------- tiles ----------
for a in range(1, 5):
    src = backup(f'assets/tiles/act{a}.png')
    sheet = Image.open(src)
    rows = cells(sheet)
    print(f'act{a} rows:', [len(r) for r in rows])
    texrow = rows[0]
    kinds = ['ground', 'fill', 'plat', 'water']
    for kind, bb in zip(kinds, texrow[:4]):
        cell = keyed_rgba(sheet.crop(bb)).resize((32, 32), Image.LANCZOS)
        cell.save(f'assets/tiles/act{a}_{kind}.png')
    print(f'act{a}: saved', kinds[:len(texrow)])
    os.remove(f'assets/tiles/act{a}.png')

print('done')
