# Re-slice tile texture cells: top band, 4 equal columns, refine bbox per quarter.
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

for a in range(1, 5):
    sheet = Image.open(f'assets/src/act{a}.png')
    W, H = sheet.size
    mask = content_mask(sheet)
    # top band: rows 0 .. midline gap; assume texture row lives in the top half
    top = (0, 0, W, H // 2 + 40)
    kinds = ['ground', 'fill', 'plat', 'water']
    for i, kind in enumerate(kinds):
        q = (W * i // 4, 0, W * (i + 1) // 4, H // 2 + 40)
        bb = mask.crop(q).getbbox()
        if not bb:
            print(f'act{a} {kind}: EMPTY quarter'); continue
        region = (q[0] + bb[0], q[1] + bb[1], q[0] + bb[2], q[1] + bb[3])
        cell = keyed_rgba(sheet.crop(region)).resize((32, 32), Image.LANCZOS)
        cell.save(f'assets/tiles/act{a}_{kind}.png')
        print(f'act{a} {kind}: {region}')
print('done')
