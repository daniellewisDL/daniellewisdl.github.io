import csv, os
from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
CSV = os.path.join(HERE, "..", "posts", "data", "us_treasury_yields_daily.csv")
OUT = os.path.join(HERE, "yieldCurve3d.png")

TENORS = ["US1M","US3M","US6M","US1Y","US2Y","US3Y","US5Y","US7Y","US10Y","US20Y","US30Y"]
M = len(TENORS)
START_YEAR = 1980      # include the early-80s peak — the iconic "mountain"
STEP_MONTHS = 2        # sample density

# ---- load + monthly sample + gap-fill across maturity (mirrors the viz) ----
rows_by_month = {}
with open(CSV, newline="") as f:
    for row in csv.DictReader(f):
        y, m, d = row["date"].split("-")
        if int(y) < START_YEAR:
            continue
        present = []
        for t in TENORS:
            s = row[t]
            present.append(float(s) if s not in ("", None) else None)
        if sum(v is not None for v in present) < 4:
            continue
        rows_by_month[f"{y}-{m}"] = present   # last day of month wins

def fill(present):
    vals = list(present)
    for j in range(M):
        if vals[j] is not None:
            continue
        l = next((k for k in range(j-1,-1,-1) if present[k] is not None), None)
        r = next((k for k in range(j+1,M) if present[k] is not None), None)
        if l is not None and r is not None:
            t = (j-l)/(r-l); vals[j] = present[l]*(1-t)+present[r]*t
        else:
            vals[j] = present[l if l is not None else r]
    return vals

months = sorted(rows_by_month)
months = months[::STEP_MONTHS]
grid = [fill(rows_by_month[mn]) for mn in months]
T = len(grid)
MAXV = max(max(r) for r in grid)

# ---- blue height ramp (same stops as the viz surface) ----
STOPS = [(0.0,(10,36,64)),(0.25,(28,95,147)),(0.5,(58,160,216)),(0.75,(127,212,245)),(1.0,(205,238,255))]
def ramp(v):
    x = max(0.0, min(1.0, v/MAXV))
    for i in range(len(STOPS)-1):
        x0,c0 = STOPS[i]; x1,c1 = STOPS[i+1]
        if x <= x1:
            t = 0 if x1==x0 else (x-x0)/(x1-x0)
            return tuple(int(c0[k]+(c1[k]-c0[k])*t) for k in range(3))
    return STOPS[-1][1]

# ---- oblique projection: maturity -> right, time -> forward(down+right), yield -> up ----
SS = 3                      # supersample
SIZE = 360 * SS
PAD = 22 * SS
cellM   = 20 * SS
shearX  = (120 * SS) / T
rowStep = (150 * SS) / T
heightS = (120 * SS) / MAXV

def proj(t, m, v):
    return (m*cellM + t*shearX, t*rowStep - v*heightS)

# raw bbox -> fit into the padded square (uniform scale)
pts = [proj(t, m, grid[t][m]) for t in range(T) for m in range(M)]
xs = [p[0] for p in pts]; ys = [p[1] for p in pts]
minx,maxx,miny,maxy = min(xs),max(xs),min(ys),max(ys)
scale = min((SIZE-2*PAD)/(maxx-minx), (SIZE-2*PAD)/(maxy-miny))
offx = (SIZE - (maxx-minx)*scale)/2 - minx*scale
offy = (SIZE - (maxy-miny)*scale)/2 - miny*scale
def screen(t, m):
    x, y = proj(t, m, grid[t][m])
    return (x*scale+offx, y*scale+offy)

img = Image.new("RGBA", (SIZE, SIZE), (13, 17, 23, 255))
dr = ImageDraw.Draw(img)

# painter's algorithm: oldest (back) first, newest (front) last
for t in range(T-1):
    for m in range(M-1):
        a = screen(t, m); b = screen(t, m+1); c = screen(t+1, m+1); d = screen(t+1, m)
        avg = (grid[t][m]+grid[t][m+1]+grid[t+1][m+1]+grid[t+1][m])/4
        col = ramp(avg)
        dr.polygon([a, b, c, d], fill=col + (255,),
                   outline=(min(col[0]+18,255), min(col[1]+18,255), min(col[2]+18,255), 90))

img = img.resize((360, 360), Image.LANCZOS)
img.save(OUT)
print("wrote", OUT, "T=", T, "MAXV=", round(MAXV,2))
