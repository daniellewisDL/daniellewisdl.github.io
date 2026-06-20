import csv, os
from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
CSV = os.path.join(HERE, "..", "posts", "data", "hadcrut5_global_monthly.csv")
OUT = os.path.join(HERE, "warmingStripes.png")

M = 12                  # months Jan..Dec form the depth axis
START_YEAR = 1850       # the full record — cold blue rising to deep red
STEP_YEARS = 1

# ---- load monthly anomalies, keep complete calendar years (mirrors the viz) ----
by_year = {}
with open(CSV, newline="") as f:
    for row in csv.DictReader(f):
        t = row["Time"]                       # "YYYY-MM"
        try:
            v = float(row["Anomaly (deg C)"])
        except (TypeError, ValueError):
            continue
        y, m = int(t[:4]), int(t[5:7]) - 1
        if y < START_YEAR:
            continue
        by_year.setdefault(y, [None] * M)[m] = v

years = sorted(yr for yr, vals in by_year.items() if all(v is not None for v in vals))
years = years[::STEP_YEARS]
grid = [by_year[yr] for yr in years]
T = len(grid)
LO = min(min(r) for r in grid)
HI = max(max(r) for r in grid)

# ---- diverging warming ramp (RdBu reversed), centred on the 1961-90 baseline (0) ----
COLD = (5, 48, 97)        # deep blue
MID  = (235, 238, 242)    # pale
HOT  = (103, 0, 31)       # deep red
def lerp(a, b, t):
    return tuple(int(a[k] + (b[k] - a[k]) * t) for k in range(3))
def ramp(v):
    if v < 0:
        return lerp(MID, COLD, min(1.0, v / LO)) if LO < 0 else MID
    return lerp(MID, HOT, min(1.0, v / HI)) if HI > 0 else MID

# ---- oblique projection: month -> right, year -> forward(down+right), anomaly -> up ----
SS = 3
SIZE = 360 * SS
PAD = 22 * SS
cellM   = 22 * SS
shearX  = (150 * SS) / T
rowStep = (150 * SS) / T
heightS = (95 * SS) / (HI - LO)

def proj(t, m, v):
    return (m * cellM + t * shearX, t * rowStep - (v - LO) * heightS)

pts = [proj(t, m, grid[t][m]) for t in range(T) for m in range(M)]
xs = [p[0] for p in pts]; ys = [p[1] for p in pts]
minx, maxx, miny, maxy = min(xs), max(xs), min(ys), max(ys)
scale = min((SIZE - 2 * PAD) / (maxx - minx), (SIZE - 2 * PAD) / (maxy - miny))
offx = (SIZE - (maxx - minx) * scale) / 2 - minx * scale
offy = (SIZE - (maxy - miny) * scale) / 2 - miny * scale
def screen(t, m):
    x, y = proj(t, m, grid[t][m])
    return (x * scale + offx, y * scale + offy)

img = Image.new("RGBA", (SIZE, SIZE), (13, 17, 23, 255))
dr = ImageDraw.Draw(img)

# painter's algorithm: oldest (back) first, newest (front) last
for t in range(T - 1):
    for m in range(M - 1):
        a = screen(t, m); b = screen(t, m + 1); c = screen(t + 1, m + 1); d = screen(t + 1, m)
        avg = (grid[t][m] + grid[t][m + 1] + grid[t + 1][m + 1] + grid[t + 1][m]) / 4
        col = ramp(avg)
        dr.polygon([a, b, c, d], fill=col + (255,),
                   outline=(min(col[0] + 16, 255), min(col[1] + 16, 255), min(col[2] + 16, 255), 80))

img = img.resize((360, 360), Image.LANCZOS)
img.save(OUT)
print("wrote", OUT, "T=", T, "LO=", round(LO, 2), "HI=", round(HI, 2))
