# VC Term Sheet Explorer 2026

An interactive D3.js data-visualisation explorer of the **HSBC Innovation Banking — Venture Capital Term Sheet Guide 2026, Volume 1**.

Every quantitative figure in the source deck (711 signed UK term sheets, ~50,000 data points, 45 pages — fully image-based, transcribed by visual OCR) is captured in [`js/data.js`](js/data.js) and rebuilt as ~30 interactive charts, plus original "remix" views the PDF never drew.

## Run locally

```bash
python -m http.server 8099 --directory vc-term-sheet-explorer
# then open http://localhost:8099
```

Or, from the repo root, it is published at `/<repo>/vc-term-sheet-explorer/`.

## Structure

| File | Purpose |
|------|---------|
| `index.html` | Layout, sidebar navigation, chart containers |
| `css/styles.css` | Dark "techy" theme, responsive grid, tooltips |
| `js/data.js` | The complete structured dataset (time series, by stage / sector / region / investor type / term) |
| `js/app.js` | All D3 chart renderers, controls, tooltips, scrollspy |

## What's inside

- **The market** — survey growth, 2025 stage donut, UK VC investment, deal concentration, global top-10 markets, dry powder, exits
- **Valuations** — median post-money & cheque size by stage, momentum, pre-money distribution, the Series A barbell
- **Stage dynamics** — volume-mix streamgraph, 2024 vs 2025 slope comparison
- **Sectors & DeepTech** — sector-share lines, DeepTech dual line, valuation × cheque-size bubble map
- **Geography** — lead-investor HQ by stage over time
- **Investors & CVC** — investor-type participation, CVC by stage / sector, average cheque bubbles
- **Terms** — prevalence over time, liquidation-preference structure, term-gradient heatmap by stage
- **Flagship matrix** — every term × six investor archetypes, year + colour-mode toggles
- **ESG & diversity** — ESG / DE&I clause inclusion by stage
- **Remix** — Founder-Friendliness Index (radar), a term's journey across the funnel, the 2024→2025 drift

*Independent visualisation — not affiliated with or endorsed by HSBC Innovation Banking. Source data © HSBC Innovation Banking / Pitchbook.*
