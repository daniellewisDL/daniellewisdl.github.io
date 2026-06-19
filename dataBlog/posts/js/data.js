/* =============================================================================
   VC TERM SHEET GUIDE 2026 — STRUCTURED DATASET
   Source: HSBC Innovation Banking "Venture Capital Term Sheet Guide 2026,
   Volume 1". Every figure below was transcribed by visual OCR from the
   image-based source deck (45 pages). Page references noted per block.
   All values are percentages unless a unit (£m, £bn, days, count) is given.
   ========================================================================== */

const DATA = {

  meta: {
    title: "Venture Capital Term Sheet Guide 2026",
    subtitle: "Volume 1 — HSBC Innovation Banking",
    headline: {
      termSheets: 711,
      ukTermSheets: 643,
      dataPoints: 50000,
      lawFirms: 29,
      aggregateValueBn: 11.2,
      ukMarketValueBn: 19.1,
      coverageByValuePct: 46,
      coverageByVolumePct: 42
    },
    years: [2021, 2022, 2023, 2024, 2025],
    stages: ["Seed", "Series A", "Series B", "Series C+"],
    stageBands: {
      "Seed": "<£2m",
      "Series A": "£2m–£10m",
      "Series B": "£10m–£30m",
      "Series C+": ">£30m"
    },
    // shared sequential palette for the 5 survey years (deck's own colours)
    yearColors: ["#3E9BC0", "#0B6E84", "#D9C2DD", "#9E6BA6", "#42234D"]
  },

  /* --- p9: Survey scale over time ------------------------------------- */
  surveyGrowth: [
    { year: 2021, total: 110, uk: 103 },
    { year: 2022, total: 245, uk: 225 },
    { year: 2023, total: 426, uk: 403 },
    { year: 2024, total: 588, uk: 532 },
    { year: 2025, total: 711, uk: 643 }
  ],

  /* --- p9: 2025 term sheets by stage (donut) -------------------------- */
  stageDonut2025: [
    { stage: "Seed",      band: "<£2m",      count: 85,  pct: 12 },
    { stage: "Series A",  band: "£2m–£10m",  count: 135, pct: 19 },
    { stage: "Series B",  band: "£10m–£30m", count: 192, pct: 27 },
    { stage: "Series C+", band: ">£30m",     count: 299, pct: 42 }
  ],

  /* --- p13: Term-sheet volume mix by stage over time (% of year) ------ */
  // each year sums to 100 across the four stages
  volumeMixByStage: [
    { year: 2021, "Seed": 14, "Series A": 44, "Series B": 32, "Series C+": 10 },
    { year: 2022, "Seed": 24, "Series A": 45, "Series B": 20, "Series C+": 11 },
    { year: 2023, "Seed": 29, "Series A": 44, "Series B": 20, "Series C+": 7  },
    { year: 2024, "Seed": 32, "Series A": 42, "Series B": 15, "Series C+": 11 },
    { year: 2025, "Seed": 27, "Series A": 42, "Series B": 19, "Series C+": 12 }
  ],

  /* --- p22: Median post-money valuation by stage (£m) ----------------- */
  postMoneyByStage: {
    "Seed":      { unit: "£m", change: 8,  values: [3.2, 3.8, 4.0, 3.9, 4.2] },
    "Series A":  { unit: "£m", change: -5, values: [16.7, 16.0, 16.7, 17.9, 17.1] },
    "Series B":  { unit: "£m", change: 2,  values: [57.8, 60.0, 55.2, 56.9, 58.2] },
    "Series C+": { unit: "£m", change: 35, values: [261.5, 249.0, 211.0, 191.3, 258.4] }
  },

  /* --- p22: Average investment (deal) size by stage (£m) -------------- */
  investmentSizeByStage: {
    "Seed":      { unit: "£m", values: [0.58, 0.59, 0.63, 0.65, 0.59] },
    "Series A":  { unit: "£m", values: [4.3, 4.4, 4.4, 4.6, 4.6] },
    "Series B":  { unit: "£m", values: [17.3, 17.5, 17.2, 16.9, 17.7] },
    "Series C+": { unit: "£m", values: [91.2, 88.6, 83.0, 93.4, 110.0] }
  },

  /* --- p13: 2024 vs 2025 select terms by stage ------------------------ */
  // valuation in £m; participating & dividend in %
  compare2024v2025: {
    "Seed":      { valuation: [3.9, 4.2],     participating: [7, 13],  dividend: [6, 8]  },
    "Series A":  { valuation: [17.9, 17.1],   participating: [12, 9],  dividend: [10, 11]},
    "Series B":  { valuation: [56.9, 58.2],   participating: [17, 10], dividend: [20, 21]},
    "Series C+": { valuation: [191.3, 258.4], participating: [15, 6],  dividend: [32, 30]}
  },

  /* --- p32: UK VC investment value (£bn) ------------------------------ */
  ukVcInvestment: [
    { year: 2020, value: 16.8 },
    { year: 2021, value: 27.0 },
    { year: 2022, value: 25.1 },
    { year: 2023, value: 16.9 },
    { year: 2024, value: 18.5 },
    { year: 2025, value: 19.1 }
  ],

  /* --- p32: UK VC value by deal concentration (£bn) ------------------- */
  ukVcConcentration: {
    years: [2023, 2024, 2025],
    "Seed":      [1.4, 1.3, 1.0],
    "Series A":  [3.8, 3.8, 2.9],
    "Series B":  [3.3, 3.1, 3.1],
    "Series C+": [8.4, 10.3, 12.1]
  },

  /* --- p32: Top-10 global venture markets, 2025 (£bn) + YoY % --------- */
  globalMarkets: [
    { country: "United States", value: 243.7, change: 42 },
    { country: "China",         value: 39.9,  change: -3 },
    { country: "United Kingdom",value: 19.1,  change: 5  },
    { country: "India",         value: 13.9,  change: 12 },
    { country: "Germany",       value: 7.4,   change: 2  },
    { country: "France",        value: 7.2,   change: 1  },
    { country: "Canada",        value: 6.3,   change: 12 },
    { country: "Israel",        value: 4.8,   change: 59 },
    { country: "Japan",         value: 4.6,   change: -48 },
    { country: "Singapore",     value: 3.4,   change: -33 }
  ],

  /* --- p32: UK VC-backed exits (deal count) --------------------------- */
  exits: [
    { period: "2024 H1", ipo: 2, ma: 121 },
    { period: "2024 H2", ipo: 0, ma: 119 },
    { period: "2025 H1", ipo: 1, ma: 132 },
    { period: "2025 H2", ipo: 1, ma: 123 }
  ],

  /* --- p32: VC dry powder (£bn), endpoints labelled ------------------- */
  dryPowder: {
    note: "Global growth 3.1×, European growth 2.5× (2015→2025)",
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
    // intermediate points interpolated along the deck's smooth curve; endpoints exact
    global:   [169, 200, 245, 290, 330, 360, 410, 460, 520, 505, 525],
    european: [23, 26, 30, 33, 36, 40, 44, 48, 53, 56, 58]
  },

  /* --- p16: Top-10 sectors, share of term sheets over time (%) -------- */
  sectorShare: {
    years: [2022, 2023, 2024, 2025],
    rows: [
      { sector: "AI",                      values: [4.5, 8.9, 14.3, 17.4], ppt: 3.1,  deepTech: true },
      { sector: "FinTech",                 values: [15.1, 10.1, 12.4, 11.8], ppt: -0.6, deepTech: false },
      { sector: "Life Sciences & BioTech", values: [9.8, 6.1, 12.2, 10.5], ppt: -1.7, deepTech: false },
      { sector: "Health / MedTech",        values: [11.8, 12.2, 9.5, 8.9], ppt: -0.6, deepTech: false },
      { sector: "Software – Enterprise",   values: [9.4, 8.0, 7.5, 8.2], ppt: 0.7,  deepTech: false },
      { sector: "Retail & Consumer",       values: [5.7, 5.6, 6.8, 6.2], ppt: -0.6, deepTech: false },
      { sector: "CleanTech",               values: [3.7, 6.1, 4.9, 5.2], ppt: 0.3,  deepTech: true },
      { sector: "Cyber",                   values: [4.1, 3.5, 2.0, 4.1], ppt: 2.1,  deepTech: true },
      { sector: "Energy",                  values: [2.0, 4.2, 2.7, 3.8], ppt: 1.1,  deepTech: true },
      { sector: "Hardware",                values: [0.8, 1.9, 1.7, 2.1], ppt: 0.3,  deepTech: true }
    ],
    top10Total: [67, 67, 74, 78],
    otherTotal: [33, 32, 26, 22]
  },

  /* --- p17: DeepTech share of VC over time (%) ------------------------ */
  deepTech: {
    years: [2021, 2022, 2023, 2024, 2025],
    volume: [15, 15, 27, 28, 35],
    value:  [14, 22, 31, 30, 45]
  },

  /* --- p23: Average post-money valuation & investment size by sector -- */
  // 2025 cross-section, £m. deepTech flag from deck colouring.
  sectorValuation: [
    { sector: "Hardware",            valuation: 235, investment: 42.0, deepTech: true },
    { sector: "AI",                  valuation: 192, investment: 20.7, deepTech: true },
    { sector: "Transport",           valuation: 177, investment: 41.3, deepTech: false },
    { sector: "Robotics",            valuation: 170, investment: 41.4, deepTech: true },
    { sector: "FinTech",             valuation: 146, investment: 14.3, deepTech: false },
    { sector: "Energy",              valuation: 136, investment: 20.2, deepTech: false },
    { sector: "Cyber",               valuation: 73,  investment: 16.9, deepTech: true },
    { sector: "BioTech",             valuation: 66,  investment: 16.2, deepTech: false },
    { sector: "Life Sciences",       valuation: 66,  investment: 20.0, deepTech: false },
    { sector: "Health / MedTech",    valuation: 57,  investment: 9.6,  deepTech: false },
    { sector: "Esports / Gaming",    valuation: 57,  investment: 10.3, deepTech: false },
    { sector: "CleanTech",           valuation: 52,  investment: 10.2, deepTech: true },
    { sector: "Software – Enterprise", valuation: 50, investment: 8.5, deepTech: false },
    { sector: "Retail & Consumer",   valuation: 44,  investment: 6.5,  deepTech: false },
    { sector: "SpaceTech",           valuation: 44,  investment: 36.7, deepTech: true }
  ],

  /* --- p14: Lead investor HQ location by stage over time (%) ---------- */
  // each {stage}.{location} = [2023, 2024, 2025]
  leadInvestorHQ: {
    years: [2023, 2024, 2025],
    overall: { n: [403, 532, 643], UK: [58, 54, 53], Europe: [22, 25, 22], US: [15, 15, 20], Other: [5, 6, 5] },
    "Seed":      { n: [115, 167, 180], UK: [70, 69, 72], Europe: [21, 18, 18], US: [3, 9, 7],  Other: [6, 4, 3] },
    "Series A":  { n: [179, 230, 269], UK: [59, 58, 54], Europe: [26, 26, 23], US: [12, 12, 18],Other: [3, 4, 5] },
    "Series B":  { n: [80, 84, 121],   UK: [41, 36, 37], Europe: [19, 26, 23], US: [35, 29, 36],Other: [5, 9, 4] },
    "Series C+": { n: [29, 51, 63],    UK: [49, 20, 24], Europe: [21, 43, 27], US: [23, 27, 37],Other: [7, 10, 12] }
  },

  /* --- p25: Investor type mix by volume & value over time (%) --------- */
  // syndicated deals -> a single deal can feature multiple types (sums >100)
  investorTypeMix: {
    years: [2021, 2022, 2023, 2024, 2025],
    volume: {
      "VC (LP fund)": [65, 61, 63, 68, 66],
      "VCT fund":     [5, 15, 13, 9, 14],
      "EIS fund":     [8, 7, 5, 4, 6],
      "CVC":          [21, 16, 14, 12, 9]
    },
    value: {
      "VC (LP fund)": [74, 68, 60, 73, 71],
      "VCT fund":     [1, 17, 8, 6, 9],
      "EIS fund":     [1, 1, 1, 0, 1],
      "CVC":          [23, 14, 29, 18, 15]
    }
  },

  /* --- p25: CVC investment by stage, 2025 ----------------------------- */
  cvcByStage: {
    volume: { "Seed": 16, "Series A": 41, "Series B": 20, "Series C+": 23 },
    value:  { "Seed": 1,  "Series A": 8,  "Series B": 12, "Series C+": 79 }
  },

  /* --- p25: CVC sector investment, term-sheet volume share (%) -------- */
  cvcBySector: {
    years: [2024, 2025],
    rows: [
      { sector: "FinTech",   values: [18, 20] },
      { sector: "AI",        values: [11, 18] },
      { sector: "Retail",    values: [7, 10] },
      { sector: "HealthTech",values: [7, 8] },
      { sector: "Energy",    values: [1, 8] },
      { sector: "Software",  values: [13, 7] },
      { sector: "CleanTech", values: [8, 5] },
      { sector: "Cyber",     values: [1, 3] },
      { sector: "Media",     values: [3, 3] },
      { sector: "Hardware",  values: [3, 3] },
      { sector: "Other",     values: [28, 15] }
    ]
  },

  /* --- p24: Pre-money valuation distribution by stage (%) ------------- */
  // each stage distributes across the 5 valuation bands (sums ~100)
  valuationBands: {
    bands: ["<£20m", "£20–50m", "£50–100m", "£100–500m", ">£500m"],
    "Seed":      [90, 8, 2, 0, 0],
    "Series A":  [54, 35, 7, 3, 0],
    "Series B":  [7, 22, 42, 25, 4],
    "Series C+": [3, 3, 9, 50, 35]
  },

  /* --- p24: Series A >£50m pre-money deals ---------------------------- */
  seriesABigDeals: {
    years: [2023, 2024, 2025],
    sharePct: [8, 12, 10],
    avgValuationM: [95, 130, 160]
  },

  /* =====================================================================
     TERMS — three families. Two complementary views are provided:
       (a) byStage2024v2025  : 19 terms × 4 stages × {2025,2024}  (p12)
       (b) timeSeries        : key terms × 2021–2025               (p26-28)
     ================================================================== */

  termFamilies: ["Economic", "Control", "Other"],

  // (a) p12 — % "Yes" by stage; each value is [2025, 2024]
  termsByStage: {
    "Economic": {
      "Preference shares":              { "Seed": [74, 67], "Series A": [89, 88], "Series B": [96, 95], "Series C+": [100, 98] },
      "% Pref. shares non-participating":{ "Seed": [86, 93], "Series A": [91, 87], "Series B": [90, 83], "Series C+": [93, 84] },
      "New option pool":                { "Seed": [68, 67], "Series A": [76, 70], "Series B": [69, 75], "Series C+": [69, 79] },
      "Anti-dilution ratchet":          { "Seed": [39, 38], "Series A": [66, 60], "Series B": [79, 76], "Series C+": [86, 90] },
      "Convertibles":                   { "Seed": [19, 22], "Series A": [34, 31], "Series B": [42, 37], "Series C+": [38, 37] },
      "Secondaries":                    { "Seed": [7, 6],   "Series A": [14, 18], "Series B": [37, 38], "Series C+": [36, 41] },
      "Co-investor (syndicate) deals":  { "Seed": [31, 26], "Series A": [39, 35], "Series B": [40, 40], "Series C+": [49, 38] }
    },
    "Control": {
      "Board representation":           { "Seed": [80, 77], "Series A": [85, 92], "Series B": [88, 91], "Series C+": [83, 92] },
      "Founder vesting":                { "Seed": [65, 64], "Series A": [63, 59], "Series B": [56, 52], "Series C+": [32, 43] },
      "Founder leaver provision":       { "Seed": [67, 59], "Series A": [51, 62], "Series B": [40, 40], "Series C+": [15, 25] },
      "Drag-along provision":           { "Seed": [84, 81], "Series A": [86, 86], "Series B": [87, 77], "Series C+": [75, 86] },
      "Investor consent rights":        { "Seed": [85, 76], "Series A": [84, 81], "Series B": [80, 67], "Series C+": [78, 70] }
    },
    "Other": {
      "Founder Warranties":             { "Seed": [46, 62], "Series A": [42, 49], "Series B": [29, 32], "Series C+": [15, 13] },
      "Company Warranties":             { "Seed": [87, 73], "Series A": [81, 89], "Series B": [79, 85], "Series C+": [63, 79] },
      "Arrangement fees":               { "Seed": [22, 12], "Series A": [14, 18], "Series B": [4, 0],   "Series C+": [0, 0] },
      "Monitoring fees":                { "Seed": [21, 14], "Series A": [17, 19], "Series B": [5, 2],   "Series C+": [0, 0] },
      "Exclusivity period":             { "Seed": [61, 57], "Series A": [78, 69], "Series B": [82, 63], "Series C+": [74, 73] },
      "Sustainability":                 { "Seed": [28, 21], "Series A": [32, 29], "Series B": [22, 27], "Series C+": [12, 33] },
      "DEI clause":                     { "Seed": [9, 11],  "Series A": [11, 11], "Series B": [10, 12], "Series C+": [5, 8] }
    }
  },

  // (b) p26-28 — % "Yes" time series 2021–2025, with 2024→2025 ppt change
  termsTimeSeries: {
    years: [2021, 2022, 2023, 2024, 2025],
    "Economic": {
      "Preference shares (any)":  { values: [84, 77, 83, 84, 87], ppt: 3 },
      "Option pool / Share opts": { values: [62, 68, 72, 71, 71], ppt: 0 },
      "Anti-dilution":            { values: [65, 60, 56, 58, 63], ppt: 5 },
      "Co-investors (syndication)":{ values: [49, 35, 42, 33, 38], ppt: 5 }
    },
    "Control": {
      "Board Representation":     { values: [94, 91, 86, 87, 91], ppt: 4 },
      "Founder Vesting":          { values: [56, 53, 61, 58, 58], ppt: 0 },
      "Founder Leaver Provision": { values: [47, 55, 50, 54, 49], ppt: -5 },
      "Drag Along":               { values: [92, 92, 82, 83, 84], ppt: 1 },
      "Tag Along":                { values: [83, 75, 66, 66, 70], ppt: 4 },
      "Investor Consents":        { values: [80, 78, 78, 76, 83], ppt: 7 }
    },
    "Other": {
      "Founder Warranties":       { values: [75, 69, 44, 42, 42], ppt: 0 },
      "Company Warranties":       { values: [93, 90, 81, 84, 80], ppt: -4 },
      "Arrangement fees":         { values: [8, 14, 9, 12, 13], ppt: 1 },
      "Monitoring fees":          { values: [10, 20, 11, 13, 14], ppt: 1 },
      "Exclusivity Period":       { values: [83, 75, 66, 65, 74], ppt: 9 },
      "Diversity Rider (DE&I)":   { values: [1, 8, 11, 11, 10], ppt: -1 },
      "ESG / Sustainability":     { values: [16, 16, 22, 26, 27], ppt: 1 }
    }
  },

  // convertibles & secondaries (3-year survey result), p26
  convertSecondary: {
    years: [2023, 2024, 2025],
    convertibles: { values: [31, 29, 32], ppt: 3 },
    secondaries:  { values: [17, 20, 19], ppt: -1 }
  },

  // exclusivity duration, p28
  exclusivityDays: { 2024: 34, 2025: 48 },

  /* --- p26: Liquidation preference structure over time (%) ------------ */
  liquidationType: {
    years: [2021, 2022, 2023, 2024, 2025],
    "Non-Participating": [88, 86, 89, 87, 90],
    "Participating":     [7, 12, 10, 12, 10],
    "Participation Cap": [5, 2, 1, 1, 0]
  },

  /* --- p29: ESG & DEI clause inclusion by stage over time (%) --------- */
  esgByStage: {
    years: [2022, 2023, 2024, 2025],
    "All Stages": [16, 22, 26, 27],
    "Seed":       [5, 17, 21, 28],
    "Series A":   [16, 24, 29, 32],
    "Series B":   [20, 21, 27, 22],
    "Series C+":  [30, 23, 33, 12]
  },
  deiByStage: {
    years: [2022, 2023, 2024, 2025],
    "All Stages": [8, 11, 11, 10],
    "Seed":       [3, 9, 11, 9],
    "Series A":   [5, 11, 11, 11],
    "Series B":   [12, 13, 12, 10],
    "Series C+":  [19, 10, 8, 5]
  },

  /* =====================================================================
     p30 — FLAGSHIP MATRIX: terms × investor type × {2025, 2024} (% Yes)
     ================================================================== */
  investorTypes: [
    { type: "VC",            n: 466, ticket: 13.1 },
    { type: "VCT",           n: 98,  ticket: 8.3 },
    { type: "EIS",           n: 41,  ticket: 2.4 },
    { type: "CVC",           n: 61,  ticket: 18.3 },
    { type: "Family Office", n: 25,  ticket: 13.8 },
    { type: "Angel",         n: 20,  ticket: 6.2 }
  ],

  // matrix[term] = { "VC": [2025,2024], "VCT": [...], ... }
  investorMatrix: {
    "Economic": {
      "Liquidation preferences":       { VC: [93, 89], VCT: [86, 72], EIS: [68, 67], CVC: [89, 87], "Family Office": [64, 71], Angel: [36, 37] },
      "Non-part. preference shares":   { VC: [92, 89], VCT: [88, 76], EIS: [79, 71], CVC: [83, 89], "Family Office": [81, 80], Angel: [100, 80] },
      "New option pool":               { VC: [75, 75], VCT: [71, 60], EIS: [78, 67], CVC: [61, 62], "Family Office": [44, 57], Angel: [40, 63] },
      "Anti-dilution ratchet":         { VC: [70, 65], VCT: [60, 43], EIS: [0, 0],   CVC: [69, 58], "Family Office": [52, 50], Angel: [15, 19] },
      "Convertibles":                  { VC: [33, 30], VCT: [36, 30], EIS: [12, 14], CVC: [26, 31], "Family Office": [28, 29], Angel: [35, 26] },
      "Secondaries":                   { VC: [18, 22], VCT: [20, 13], EIS: [5, 0],   CVC: [28, 24], "Family Office": [36, 14], Angel: [0, 19] },
      "Co-investor (syndicate) deals": { VC: [39, 33], VCT: [42, 32], EIS: [24, 29], CVC: [44, 27], "Family Office": [28, 36], Angel: [30, 52] }
    },
    "Control": {
      "Board appointments":            { VC: [83, 87], VCT: [93, 91], EIS: [84, 61], CVC: [78, 92], "Family Office": [76, 83], Angel: [77, 83] },
      "Founder vesting":               { VC: [62, 63], VCT: [63, 40], EIS: [71, 71], CVC: [30, 51], "Family Office": [40, 36], Angel: [30, 37] },
      "Founder leaver provision":      { VC: [48, 55], VCT: [60, 64], EIS: [78, 67], CVC: [34, 42], "Family Office": [32, 29], Angel: [30, 44] },
      "Drag-along provision":          { VC: [85, 84], VCT: [93, 81], EIS: [85, 86], CVC: [80, 79], "Family Office": [72, 64], Angel: [65, 89] },
      "Investor consent rights":       { VC: [83, 77], VCT: [81, 75], EIS: [90, 71], CVC: [85, 70], "Family Office": [72, 71], Angel: [90, 78] }
    },
    "Other": {
      "Founder Warranties":            { VC: [38, 42], VCT: [56, 60], EIS: [61, 62], CVC: [39, 30], "Family Office": [36, 21], Angel: [40, 30] },
      "Company Warranties":            { VC: [79, 85], VCT: [87, 89], EIS: [88, 86], CVC: [79, 82], "Family Office": [84, 71], Angel: [80, 78] },
      "Arrangement fees":              { VC: [6, 7],   VCT: [30, 47], EIS: [51, 33], CVC: [7, 4],   "Family Office": [12, 0],  Angel: [15, 11] },
      "Monitoring fees":               { VC: [9, 8],   VCT: [32, 43], EIS: [41, 43], CVC: [5, 6],   "Family Office": [8, 0],   Angel: [20, 19] },
      "Exclusivity period":            { VC: [80, 70], VCT: [76, 58], EIS: [61, 62], CVC: [54, 58], "Family Office": [44, 36], Angel: [35, 33] },
      "Sustainability":                { VC: [27, 31], VCT: [32, 28], EIS: [24, 14], CVC: [30, 13], "Family Office": [4, 7],   Angel: [15, 15] },
      "DEI clause":                    { VC: [11, 13], VCT: [11, 6],  EIS: [0, 10],  CVC: [15, 6],  "Family Office": [0, 0],   Angel: [0, 7] }
    }
  }
};

// Convenience: flat list of all term names across families
DATA.allInvestorTerms = (() => {
  const out = [];
  DATA.termFamilies.forEach(fam => {
    const block = DATA.investorMatrix[fam];
    if (block) Object.keys(block).forEach(t => out.push({ family: fam, term: t }));
  });
  return out;
})();
