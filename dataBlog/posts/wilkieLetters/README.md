# The Letters of Wilkie Collins — a visual cartulary

A multi-page, Victorian-styled exploration of the 3,363 surviving letters.

## Run it

From the project root (`wilkieLetters/`):

```
python -m http.server 8000 --directory app
```

Then open **http://localhost:8000** in a browser. (A local server is needed so
the browser may load the data files; opening `index.html` directly will not work.)

## The six rooms

| Tab | What it shows |
|-----|---------------|
| **Frontispiece** | Overview — key figures, the arc of letters across his life |
| **The Chronicle** | Letters per year, stacked by recipient / subject / life-period, with a life-events track |
| **The Atlas** | Hand-drawn sepia map of where each letter was written; filter by life-chapter |
| **Correspondents** | Force-directed network of his circle, joined by who is named alongside whom |
| **The Ledger** | An interactive pivot table — cross-tabulate any two dimensions |
| **Reading Room** | Search and read every letter in full |

Hover almost anything to glimpse a letter; click to read it whole. Clicking a
bar, cell, dot, or node drills into the Reading Room filtered to that subset.

## Files

- `index.html`, `css/`, `js/` — the application (vanilla JS + D3, no build step)
- `data/letters.json` — every letter with its enriched fields and full text
- `data/network.json` — correspondent nodes + co-mention edges
- `data/chronology.json` — 318 dated life events
- `data/world-50m.json` — coastline topology for the map (bundled, offline)
- `js/lib/` — D3 and topojson (bundled, offline)

Fonts load from Google Fonts when online; the app degrades gracefully to system
serifs offline.
