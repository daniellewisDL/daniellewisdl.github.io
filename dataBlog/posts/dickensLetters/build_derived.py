#!/usr/bin/env python3
"""
Regenerate the derived summary files from dickens_letters_enriched.json.

The enriched JSON holds only the RAW letters (no themes / word counts / coordinates /
date precision / mentioned places). This script rebuilds the three derived files the
web app depends on:

    letters_light.json     per-letter search index  {id,r,d,p,l,t,w,s}
    dashboard_data.json    aggregates for the dashboard + map
    letters_mentions.json  per-letter mappable place mentions (modal sidecar)

INVARIANT: light/mentions records are emitted in enriched-array order, so
`id == index into the enriched array` (the app's modal does lettersEnriched[id]).

It is INCREMENTAL and IDEMPOTENT: it seeds from the EXISTING committed derived files,
so unchanged letters keep their exact themes/precision/mentions, and only genuinely new
or changed letters get re-derived (themes via a Naive-Bayes classifier trained on the
seed labels, precision parsed from date_on_page, mentions via a gazetteer scan).
Coordinates come from geo_coords.json + a small hardcoded table of Dickens's residences.

Usage:  python build_derived.py        (run from this directory)
"""
import json, os, re, math, collections

HERE = os.path.dirname(os.path.abspath(__file__))
def P(name): return os.path.join(HERE, name)

THEMES = ["Literature/Writing", "Family/Personal", "Theatre/Readings",
          "Business/Finance", "Travel/Places", "Social Reform/Philanthropy"]

def load(name, default=None):
    p = P(name)
    if os.path.exists(p):
        with open(p, encoding="utf-8") as f:
            return json.load(f)
    return default

def norm(s):  return re.sub(r"\s+", " ", re.sub(r"[^a-z0-9]+", " ", (s or "").lower())).strip()
def nnorm(s): return re.sub(r"\s+", " ", re.sub(r"[^a-z0-9' ]+", " ", (s or "").lower())).strip()
def wc(text): return len((text or "").split())
def jkey(recip, text, w): return (norm(recip), norm(text)[:80], w)  # word count = exact discriminator

# --------------------------------------------------------------------------- load inputs
new = load("dickens_letters_enriched.json")
if new is None:
    raise SystemExit("dickens_letters_enriched.json not found next to this script")
seed_light    = load("letters_light.json", []) or []
seed_mentions = load("letters_mentions.json", []) or []
GEO           = {k: tuple(v) for k, v in (load("geo_coords.json", {}) or {}).items()}
N = len(new)
print(f"enriched: {N} letters | seed light: {len(seed_light)} | gazetteer: {len(GEO)} places")

# Index seed for carry-over of themes / precision / mentions.
# Primary key = enriched uid (stable, exact). Fallback = content key for older seeds without uid.
seed_by_uid, seed_by_key = {}, {}
for l in seed_light:
    if l.get("uid") is not None:
        seed_by_uid[str(l["uid"])] = l
    seed_by_key[jkey(l.get("r"), l.get("s"), l.get("w"))] = l   # r==recipient, s==snippet, w==word count

def seed_for(rec):
    s = seed_by_uid.get(str(rec.get("uid")))
    if s is not None: return s
    return seed_by_key.get(jkey(rec.get("addressee"), rec.get("text"), wc(rec.get("text"))))

def seed_mention(seed_id):
    return seed_mentions[seed_id] if (seed_id is not None and 0 <= seed_id < len(seed_mentions)) else []

# --------------------------------------------------------------------------- geocoding
HARD = [  # Dickens's principal residences / offices — more precise than auto-geocoding
    (r"devonshire terrace", (51.5246, -0.1556)), (r"tavistock (house|square)", (51.5246, -0.1280)),
    (r"gad'?s hill", (51.3892, 0.4561)), (r"all the year round|\bayr\b", (51.5117, -0.1196)),
    (r"household words", (51.5119, -0.1190)), (r"doughty street", (51.5237, -0.1180)),
    (r"furnival'?s inn", (51.5180, -0.1100)), (r"broadstairs", (51.3590, 1.4380)),
    (r"boulogne", (50.7264, 1.6147)), (r"\bparis\b", (48.8566, 2.3522)), (r"brighton", (50.8225, -0.1372)),
    (r"hyde park (place|gate)", (51.5145, -0.1632)),
]
HARD_CITY = [  # coarse fallback by city/region token
    (r"\blondon\b", (51.5074, -0.1278)), (r"\bkent\b", (51.2787, 0.5217)),
    (r"new york", (40.7128, -74.0060)), (r"boston", (42.3601, -71.0589)),
    (r"liverpool", (53.4084, -2.9916)), (r"edinburgh", (55.9533, -3.1883)),
]
_coord_memo = {}
def coords_for(name):
    if not name: return None
    if name in _coord_memo: return _coord_memo[name]
    res = GEO.get(name.strip().lower())
    if res is None:
        n = nnorm(name)
        for pat, co in HARD:
            if re.search(pat, n): res = co; break
    if res is None:
        n = nnorm(name)
        for pat, co in HARD_CITY:
            if re.search(pat, n): res = co; break
    _coord_memo[name] = res
    return res

# --------------------------------------------------------------------------- date precision
MONTHS  = r"(january|february|march|april|may|june|july|august|september|october|november|december)"
SEASONS = r"(spring|summer|autumn|winter)"
def parse_precision(rec):
    raw = rec.get("date_on_page") or rec.get("pdf_date") or ""
    s = raw.replace("�", "-").replace("–", "-").replace("—", "-")
    s = re.sub(r"[\[\]]", " ", s); s = re.sub(r"\s+", " ", s).strip().lower()
    if not s or s in ("-", "n d", "nd", "no date", "undated"): return "unknown"
    if not re.search(r"\b18\d{2}\b", s): return "unknown"
    if re.search(r"\b\d{1,2}\s+" + MONTHS + r"\b", s) or re.search(MONTHS + r"\s+\d{1,2}\b", s):
        return "exact"
    if re.search(r"\b18\d{2}\s*-\s*\d{1,4}\b", s): return "range_precision"
    if re.search(SEASONS, s): return "season_precision"
    if re.search(MONTHS, s):  return "month_precision"
    return "year_precision"

def display_date(rec, precision):
    if precision == "exact" and rec.get("date_sort"):
        return rec["date_sort"]
    raw = rec.get("date_on_page") or rec.get("pdf_date") or rec.get("date_sort") or ""
    s = raw.replace("�", "-").replace("–", "-").replace("—", "-")
    s = re.sub(r"[\[\]]", "", s); s = re.sub(r"\s+", " ", s).strip()
    return s or (rec.get("date_sort") or "Unknown")

# --------------------------------------------------------------------------- recipient canon
def recip_norm(a):
    a = re.sub(r"^to\s+", "", (a or "").strip(), flags=re.I)
    return re.sub(r"\s+", " ", a).strip()
key_forms = collections.defaultdict(collections.Counter)
for r in new:
    a = recip_norm(r.get("addressee"))
    if a: key_forms[norm(a)][a] += 1
canon_recip = {k: c.most_common(1)[0][0] for k, c in key_forms.items()}

# --------------------------------------------------------------------------- carry-over pass
STOP = set("""a an the of to and in on for with at by from as is was be been being are were am
he she it they we you i him her them his hers their our your my me us this that these those which who whom
will would shall should can could may might must do does did have has had not no nor so if then than but or
yours dear sir madam mr mrs miss dickens charles ever very most much more such some any all one two
am pm st said say says letter date text page note mss ms vol pp""".split())
def toks(s): return [w for w in re.findall(r"[a-z]{3,}", (s or "").lower()) if w not in STOP]

carried_themes, carried_prec, carried_ment = {}, {}, {}
train_docs = []   # (tokens, theme set) from carried letters -> classifier training data
for i, rec in enumerate(new):
    s = seed_for(rec)
    if s is not None:
        carried_themes[i] = list(s.get("t") or [])
        carried_prec[i]   = s.get("p")
        carried_ment[i]   = seed_mention(s.get("id")) if s.get("id") is not None else []
        tk = toks(rec.get("text"))
        if tk: train_docs.append((tk, set(carried_themes[i])))
print(f"carried over from seed: {len(carried_themes)} / {N}")

# --------------------------------------------------------------------------- theme classifier
need_classify = [i for i in range(N) if i not in carried_themes]
thresholds = {t: 0.0 for t in THEMES}
theme_llr = {t: {} for t in THEMES}
if need_classify and train_docs:
    print(f"training classifier on {len(train_docs)} labelled docs for {len(need_classify)} new letters...")
    theme_tok = {t: collections.Counter() for t in THEMES}; theme_n = {t: 0 for t in THEMES}
    bg_tok = collections.Counter(); bg_n = 0
    for tk, labels in train_docs:
        bg_tok.update(tk); bg_n += len(tk)
        for t in labels:
            if t in theme_tok: theme_tok[t].update(tk); theme_n[t] += len(tk)
    V = len(bg_tok) or 1
    for t in THEMES:
        tt, tn = theme_tok[t], theme_n[t]
        theme_llr[t] = {w: math.log(((tt[w]+1)/(tn+V)) / ((bg_tok[w]+1)/(bg_n+V))) for w in tt}
    # per-theme threshold tuning on a holdout (every 5th training doc)
    val = []
    for j, (tk, labels) in enumerate(train_docs):
        if j % 5: continue
        sc = {t: sum(theme_llr[t].get(w, 0.0) for w in tk)/len(tk) for t in THEMES}
        val.append((sc, labels))
    for t in THEMES:
        best = None
        for th in [x/100 for x in range(-15, 60, 1)]:
            tp = fp = fn = 0
            for sc, labels in val:
                pred = sc[t] >= th; g = t in labels
                if pred and g: tp += 1
                elif pred:     fp += 1
                elif g:        fn += 1
            Pr = tp/(tp+fp) if tp+fp else 0; Rc = tp/(tp+fn) if tp+fn else 0
            F = 2*Pr*Rc/(Pr+Rc) if Pr+Rc else 0
            if best is None or F > best[0]: best = (F, th)
        thresholds[t] = best[1]

def classify(text):
    tk = toks(text)
    if not tk: return []
    out = []
    for t in THEMES:
        s = sum(theme_llr[t].get(w, 0.0) for w in tk)/len(tk)
        if s >= thresholds[t]: out.append((s, t))
    out.sort(reverse=True)
    return [t for _, t in out][:3]

# --------------------------------------------------------------------------- mention scan (new letters)
PLACE_KEYS = sorted((k for k in GEO if len(k) >= 4), key=len, reverse=True)
def scan_mentions(text):
    if not text: return []
    low = " " + nnorm(text) + " "
    seen, out = set(), []
    for k in PLACE_KEYS:
        if " " + k + " " in low and k not in seen:
            seen.add(k); out.append(k.title())
            if len(out) >= 12: break
    return out

# --------------------------------------------------------------------------- build records
light, mentions = [], []
for i, rec in enumerate(new):
    text = rec.get("text") or ""
    a = recip_norm(rec.get("addressee"))
    recip = canon_recip.get(norm(a), a)
    precision = carried_prec.get(i) or parse_precision(rec)
    d = display_date(rec, precision)
    themes = carried_themes[i] if i in carried_themes else classify(text)
    loc = (rec.get("location_sent_from") or "").strip()
    snip = re.sub(r"\s+", " ", text).strip()
    if len(snip) > 120: snip = snip[:120] + "..."
    light.append({"id": i, "uid": rec.get("uid"), "r": recip, "d": d, "p": precision, "l": loc,
                  "t": themes, "w": wc(text), "s": snip})
    cand = carried_ment[i] if i in carried_ment else scan_mentions(text)
    seen, keep = set(), []
    for nm in cand:
        if nm and nm not in seen and coords_for(nm):
            seen.add(nm); keep.append(nm)
    mentions.append(keep)

# --------------------------------------------------------------------------- aggregates
total_words = sum(l["w"] for l in light)
years = [int(m.group(1)) for l in light if (m := re.search(r"\b(18\d{2})\b", l["d"]))]
stats = {"total_letters": N, "total_words": total_words,
         "avg_word_count": round(total_words / N, 1) if N else 0,
         "start_year": min(years) if years else None, "end_year": max(years) if years else None}

tl = {}
for l in light:
    m = re.search(r"\b(18\d{2})\b", l["d"])
    if not m: continue
    y = int(m.group(1))
    tl.setdefault(y, {"year": y, "count": 0, "themes": {t: 0 for t in THEMES}})
    tl[y]["count"] += 1
    for t in l["t"]:
        if t in tl[y]["themes"]: tl[y]["themes"][t] += 1
timeline = [tl[y] for y in sorted(tl)]

theme_counts = collections.Counter(t for l in light for t in l["t"])
themes_agg = sorted(({"theme": t, "count": theme_counts[t]} for t in THEMES), key=lambda x: -x["count"])
recipients = [{"recipient": r, "count": c}
              for r, c in collections.Counter(l["r"] for l in light if l["r"]).most_common(50)]

def loc_layer(counter):
    out = []
    for name, c in counter.most_common():
        co = coords_for(name)
        if co: out.append({"name": name, "latitude": co[0], "longitude": co[1], "count": c})
    return out
sent_locations = loc_layer(collections.Counter(l["l"] for l in light if l["l"]))
mentioned_locations = loc_layer(collections.Counter(nm for ml in mentions for nm in ml))

dashboard = {"stats": stats, "timeline": timeline, "themes": themes_agg, "recipients": recipients,
             "sent_locations": sent_locations, "mentioned_locations": mentioned_locations}

# --------------------------------------------------------------------------- write
json.dump(light, open(P("letters_light.json"), "w", encoding="utf-8"), ensure_ascii=False)
json.dump(dashboard, open(P("dashboard_data.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
json.dump(mentions, open(P("letters_mentions.json"), "w", encoding="utf-8"), ensure_ascii=False)

print(f"stats: {stats}")
print(f"themes: {[(t['theme'], t['count']) for t in themes_agg]}")
print(f"sent_locations w/coords: {len(sent_locations)} | mentioned: {len(mentioned_locations)}")
print(f"precision: {collections.Counter(l['p'] for l in light).most_common()}")
print("Done.")
