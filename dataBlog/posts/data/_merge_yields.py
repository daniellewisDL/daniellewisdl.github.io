import csv, os, glob

DATA_DIR = os.path.dirname(os.path.abspath(__file__))
EXISTING = os.path.join(DATA_DIR, "us_treasury_yields_daily.csv")

# Target schema (order matters)
COLS = ["date","US1M","US3M","US6M","US1Y","US2Y","US3Y","US5Y","US7Y","US10Y","US20Y","US30Y"]

# Map Treasury CSV headers -> our schema (extra tenors 1.5M/2M/4M dropped)
TMAP = {
    "1 Mo":"US1M", "3 Mo":"US3M", "6 Mo":"US6M", "1 Yr":"US1Y", "2 Yr":"US2Y",
    "3 Yr":"US3Y", "5 Yr":"US5Y", "7 Yr":"US7Y", "10 Yr":"US10Y",
    "20 Yr":"US20Y", "30 Yr":"US30Y",
}

# 1. Read existing rows, find last date
existing_rows = []
with open(EXISTING, newline="") as f:
    r = csv.DictReader(f)
    assert r.fieldnames == COLS, r.fieldnames
    for row in r:
        existing_rows.append(row)
last_date = max(row["date"] for row in existing_rows)
print("existing rows:", len(existing_rows), "last date:", last_date)

# 2. Parse Treasury files
new_by_date = {}
for path in sorted(glob.glob(os.path.join(DATA_DIR, "_tr_*.csv"))):
    with open(path, newline="") as f:
        r = csv.DictReader(f)
        for row in r:
            mm, dd, yyyy = row["Date"].split("/")
            iso = f"{yyyy}-{int(mm):02d}-{int(dd):02d}"
            if iso <= last_date:
                continue
            out = {c: "" for c in COLS}
            out["date"] = iso
            for tcol, ocol in TMAP.items():
                v = row.get(tcol, "")
                out[ocol] = v.strip() if v else ""
            new_by_date[iso] = out

new_rows = [new_by_date[d] for d in sorted(new_by_date)]
print("new rows:", len(new_rows))
if new_rows:
    print("range:", new_rows[0]["date"], "->", new_rows[-1]["date"])

# 3. Append and write back
with open(EXISTING, "w", newline="") as f:
    w = csv.DictWriter(f, fieldnames=COLS)
    w.writeheader()
    w.writerows(existing_rows)
    w.writerows(new_rows)
print("total rows now:", len(existing_rows) + len(new_rows))
