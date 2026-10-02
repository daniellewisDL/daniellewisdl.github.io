/* Term Sheet Atlas — datasets.
   Source: HSBC Innovation Banking / UKBAA Term Sheet Guide 2026 Vol. 1 (main), plus the 2025 and 2024 editions.
   Figures were read from slide graphics; "derived" values are calculated in the apps.
   Three data objects: ATLAS_DATA (index.html), BENCH_DATA (benchmark.html), DILUTION_DATA (dilution.html). */

/*@@SHARED*/
/* ==========================================================================
   SHARED — negotiation advice text used by the atlas and the benchmark tool
   ========================================================================== */
const ADVICE_TEXT = {
  pref: "Ask whether a straight equity round is possible; if preference shares stay, cap at 1× non-participating.",
  nonpart: "Participating prefs let the investor take their money back AND share in the rest — push for 1× non-participating, or a hard cap (≤2–3×).",
  pool: "Size the pool to the hiring plan; create it pre-money only to the extent it will be used in 18–24 months.",
  antidil: "Prefer broad-based weighted-average over full ratchet; ask that it falls away at the next priced round.",
  conv: "Set a valuation cap and a discount, and a maturity of ≥18 months.",
  sec: "Direct secondaries help staff retention — ask for 10–20% at Series B+.",
  coinv: "Ask the lead to name syndicate partners up-front; check pro-rata and information rights.",
  board: "Agree board composition (founders ≥ investors, one independent) and a path for observers.",
  vest: "Ask for credit for time served (25–50% already vested) and double-trigger acceleration on exit.",
  leaver: "Negotiate good/bad-leaver definitions; ensure a no-fault departure is a good leaver.",
  drag: "Set the drag threshold at a majority of investors AND founders, with a minimum price floor.",
  consent: "Limit consent rights to a short list of fundamental matters; add a de-minimis threshold.",
  fwarr: "Cap founder warranties (fraud, title, capacity) and push company-level warranties instead.",
  cwarr: "Make warranties disclosure-letter qualified; cap liability at the purchase price.",
  arrfee: "Ask the lead to waive the arrangement fee or net it against the investment (≤1–2%).",
  monfee: "Monitoring fees drain a young company — ask to remove or cap them.",
  excl: "Negotiate 30 days or less, with automatic release if terms change or the investor delays.",
  sust: "Accept light ESG reporting; avoid hard KPIs tied to price or control.",
  dei: "Convert a DEI rider into a time-bound plan rather than a covenant."
};
/*@@END*/

/*@@ATLAS*/
/* ==========================================================================
   ATLAS_DATA — everything the main atlas (index.html) needs: 2026 guide + 2025/2024 editions
   ========================================================================== */
const ATLAS_DATA = {
  years: [2021,2022,2023,2024,2025],
  stages: ["Seed","Series A","Series B","Series C+"],
  stageDef: ["<£2m","£2–10m","£10–30m",">£30m"],
  terms: [
    { k:"pref", l:"Preference shares", c:"Economic" },
    { k:"nonpart", l:"% prefs non-participating", c:"Economic" },
    { k:"pool", l:"New option pool", c:"Economic" },
    { k:"antidil", l:"Anti-dilution ratchet", c:"Economic" },
    { k:"conv", l:"Convertibles", c:"Economic" },
    { k:"sec", l:"Secondaries", c:"Economic" },
    { k:"coinv", l:"Co-investor / syndicate", c:"Economic" },
    { k:"board", l:"Board representation", c:"Control" },
    { k:"vest", l:"Founder vesting", c:"Control" },
    { k:"leaver", l:"Founder leaver provision", c:"Control" },
    { k:"drag", l:"Drag-along", c:"Control" },
    { k:"consent", l:"Investor consent rights", c:"Control" },
    { k:"fwarr", l:"Founder warranties", c:"Other" },
    { k:"cwarr", l:"Company warranties", c:"Other" },
    { k:"arrfee", l:"Arrangement fees", c:"Other" },
    { k:"monfee", l:"Monitoring fees", c:"Other" },
    { k:"excl", l:"Exclusivity period", c:"Other" },
    { k:"sust", l:"Sustainability / ESG", c:"Other" },
    { k:"dei", l:"DEI clause", c:"Other" }
  ],
  byStage: {
    y2025: {
      pref: [74,89,96,100],
      nonpart: [86,91,90,93],
      pool: [68,76,69,69],
      antidil: [39,66,79,86],
      conv: [19,34,42,38],
      sec: [7,14,37,36],
      coinv: [31,39,40,49],
      board: [80,85,88,83],
      vest: [65,63,56,32],
      leaver: [67,51,40,15],
      drag: [84,86,87,75],
      consent: [85,84,80,78],
      fwarr: [62,42,29,15],
      cwarr: [87,81,79,63],
      arrfee: [22,14,4,0],
      monfee: [21,17,5,0],
      excl: [61,78,82,74],
      sust: [28,32,22,12],
      dei: [9,11,10,5]
    },
    y2024: {
      pref: [67,88,95,98],
      nonpart: [93,87,83,84],
      pool: [67,70,75,79],
      antidil: [36,60,76,90],
      conv: [22,31,37,37],
      sec: [6,18,38,41],
      coinv: [26,35,40,38],
      board: [77,92,91,92],
      vest: [64,59,52,43],
      leaver: [59,62,40,25],
      drag: [81,86,77,86],
      consent: [76,81,67,70],
      fwarr: [46,49,32,13],
      cwarr: [79,89,85,79],
      arrfee: [12,18,0,0],
      monfee: [14,19,2,0],
      excl: [57,69,63,73],
      sust: [21,29,27,33],
      dei: [11,11,12,8]
    },
    y2023: {
      pref: [65,87,97,97],
      nonpart: [85,89,93,93],
      pool: [67,74,63,63],
      antidil: [27,64,73,73],
      conv: [28,35,40,40],
      sec: [4,15,40,40],
      coinv: [41,42,53,53],
      board: [81,88,90,90],
      vest: [75,59,30,30],
      leaver: [59,56,13,13],
      drag: [83,85,77,77],
      consent: [83,79,70,70],
      fwarr: [60,44,13,13],
      cwarr: [87,84,67,67],
      arrfee: [13,11,0,0],
      monfee: [15,11,7,7],
      excl: [59,67,70,70],
      sust: [17,24,23,23],
      dei: [9,11,10,10]
    }
  },
  sectorCohorts: ["AI (pure)","DeepTech (ex-AI)","Life Sci & BioTech"],
  bySector: {
    y2025: {
      pref: [87,89,89],
      nonpart: [97,83,85],
      pool: [79,76,72],
      antidil: [64,67,57],
      conv: [36,39,36],
      sec: [20,15,4],
      coinv: [31,42,45],
      board: [81,83,89],
      vest: [69,61,53],
      leaver: [46,56,47],
      drag: [85,84,85],
      consent: [74,86,79],
      fwarr: [37,48,39],
      cwarr: [76,82,77],
      arrfee: [6,16,8],
      monfee: [8,20,15],
      excl: [80,70,77],
      sust: [30,39,21],
      dei: [18,10,4]
    },
    y2024: {
      pref: [88,84,88],
      nonpart: [95,91,78],
      pool: [79,71,82],
      antidil: [68,57,63],
      conv: [35,30,40],
      sec: [15,15,17],
      coinv: [30,39,50],
      board: [74,76,88],
      vest: [74,62,49],
      leaver: [63,65,36],
      drag: [85,90,83],
      consent: [71,78,68],
      fwarr: [38,47,39],
      cwarr: [85,85,86],
      arrfee: [17,11,3],
      monfee: [15,14,8],
      excl: [73,66,75],
      sust: [18,39,40],
      dei: [8,18,10]
    }
  },
  investorTypes: ["VC (LP fund)","VCT","EIS fund","CVC","Family office","Angel"],
  investorMeta: [
    { n:466, avg:13.1 },
    { n:98, avg:8.3 },
    { n:41, avg:2.4 },
    { n:61, avg:18.3 },
    { n:25, avg:13.8 },
    { n:20, avg:6.2 }
  ],
  byInvestor: {
    y2025: {
      pref: [93,86,68,89,64,35],
      nonpart: [92,88,79,83,81,100],
      pool: [75,71,78,61,44,40],
      antidil: [70,60,0,69,52,15],
      conv: [33,36,12,26,28,35],
      sec: [18,20,5,28,36,0],
      coinv: [39,42,24,44,28,30],
      board: [83,93,84,78,76,77],
      vest: [62,63,71,30,40,30],
      leaver: [48,60,78,34,32,30],
      drag: [85,93,85,80,72,65],
      consent: [83,81,90,85,72,90],
      fwarr: [38,56,61,39,36,40],
      cwarr: [79,87,88,79,84,80],
      arrfee: [6,30,51,7,12,15],
      monfee: [9,32,41,5,8,20],
      excl: [80,76,61,54,44,35],
      sust: [27,32,24,30,4,15],
      dei: [11,11,0,15,0,0]
    },
    y2024: {
      pref: [89,72,67,87,71,37],
      nonpart: [89,76,71,89,80,80],
      pool: [75,60,67,62,57,63],
      antidil: [65,43,0,58,50,19],
      conv: [30,30,14,31,29,26],
      sec: [22,13,0,24,14,19],
      coinv: [33,32,29,27,36,52],
      board: [87,91,61,92,83,83],
      vest: [63,40,71,51,36,37],
      leaver: [55,64,67,42,29,44],
      drag: [84,81,86,79,64,89],
      consent: [77,75,71,70,71,78],
      fwarr: [42,60,62,30,21,30],
      cwarr: [86,89,86,82,71,78],
      arrfee: [7,47,33,4,0,11],
      monfee: [8,43,43,6,0,19],
      excl: [70,58,62,58,36,33],
      sust: [31,28,14,13,7,15],
      dei: [13,6,10,6,0,7]
    },
    y2023: {
      pref: [91,79,52,86,60,12],
      nonpart: [90,78,100,88,100,100],
      pool: [74,68,57,71,40,0],
      antidil: [63,54,0,63,40,6],
      conv: [34,28,29,29,20,18],
      sec: [18,12,0,25,20,6],
      coinv: [45,49,52,20,0,59],
      board: [87,84,90,86,80,71],
      vest: [66,58,57,44,0,71],
      leaver: [48,63,57,46,0,65],
      drag: [84,74,76,83,60,100],
      consent: [78,79,71,80,80,88],
      fwarr: [40,51,71,39,60,53],
      cwarr: [78,84,90,85,80,82],
      arrfee: [4,32,38,3,0,6],
      monfee: [5,26,38,8,20,18],
      excl: [70,72,62,61,40,18],
      sust: [22,28,19,22,0,6],
      dei: [12,14,0,8,0,0]
    }
  },
  termSeries: {
    pref: [84,77,83,84,87],
    pool: [62,68,72,71,71],
    antidil: [65,60,56,58,63],
    coinv: [49,35,42,33,38],
    conv: [null,null,31,29,32],
    sec: [null,null,17,20,19],
    board: [94,91,86,87,91],
    vest: [56,53,61,58,58],
    leaver: [47,55,50,54,49],
    drag: [92,92,82,83,84],
    tag: [83,75,66,66,70],
    consent: [80,78,78,76,83],
    fwarr: [75,69,44,42,42],
    cwarr: [93,90,81,84,80],
    arrfee: [8,14,9,12,13],
    monfee: [10,20,11,13,14],
    excl: [83,75,66,65,74],
    dei: [1,8,11,11,10],
    sust: [16,16,22,26,27],
    tranche: [22,19,17,24,null],
    cosale: [67,67,63,63,null],
    restrict: [49,39,32,36,null],
    prefdiv: [12,20,9,12,null],
    growth: [5,9,3,4,null],
    dno: [null,null,30,27,null],
    keyman: [null,null,18,17,null],
    persguar: [8,1,3,null,null]
  },
  termSeriesLabels: {
    pref: "Preference shares",
    pool: "New option pool",
    antidil: "Anti-dilution",
    coinv: "Co-investors",
    conv: "Convertibles",
    sec: "Secondaries",
    board: "Board representation",
    vest: "Founder vesting",
    leaver: "Founder leaver",
    drag: "Drag-along",
    tag: "Tag-along",
    consent: "Investor consents",
    fwarr: "Founder warranties",
    cwarr: "Company warranties",
    arrfee: "Arrangement fees",
    monfee: "Monitoring fees",
    excl: "Exclusivity",
    dei: "DEI rider",
    sust: "ESG / sustainability",
    tranche: "Tranched investment",
    cosale: "Co-sale",
    restrict: "Restrictive covenants",
    prefdiv: "Preference dividend",
    growth: "Growth shares",
    dno: "D&O insurance",
    keyman: "Key-person insurance",
    persguar: "Personal guarantee"
  },
  liqType: { nonpart:[93,86,89,87,90], part:[7,12,10,12,10], partcap:[0,2,1,1,0] },
  exclusivityDays: { y2024:34, y2025:48 },
  esg: {
    years: [2022,2023,2024,2025],
    All: [16,22,26,27],
    Seed: [5,17,21,28],
    "Series A": [16,24,29,32],
    "Series B": [20,21,27,22],
    "Series C+": [30,23,33,12]
  },
  dei: {
    years: [2022,2023,2024,2025],
    All: [8,11,11,10],
    Seed: [3,9,11,9],
    "Series A": [5,11,11,11],
    "Series B": [12,13,12,10],
    "Series C+": [19,10,8,5]
  },
  sample: {
    total: [110,245,426,588,711],
    ukhq: [103,225,403,532,643],
    stageN2025: [192,299,135,85],
    ukMarketDeals: 1518,
    ukMarketValue: 19.1,
    coverVol: 42,
    coverVal: 46,
    valueCovered: 8.8,
    valueSampled: 11.2
  },
  stageMix: { Seed:[14,24,29,32,27], "Series A":[44,45,44,42,42], "Series B":[32,20,20,15,19], "Series C+":[10,11,7,11,12] },
  valuation: {
    Seed: [3.2,3.8,4,3.9,4.2],
    "Series A": [16.7,16,16.7,17.9,17.1],
    "Series B": [57.8,60,55.2,56.9,58.2],
    "Series C+": [261.5,249,211,191.3,258.4]
  },
  avgInv: {
    Seed: [0.58,0.59,0.63,0.65,0.59],
    "Series A": [4.3,4.4,4.4,4.6,4.6],
    "Series B": [17.3,17.5,17.2,16.9,17.7],
    "Series C+": [91.2,88.6,83,93.4,110]
  },
  partPref: { Seed:[7,13], "Series A":[12,9], "Series B":[17,10], "Series C+":[15,6] },
  prefDiv: { Seed:[6,8], "Series A":[10,11], "Series B":[20,21], "Series C+":[32,30] },
  leadVol: {
    all: { n:[403,532,643], UK:[58,54,53], Europe:[22,25,22], US:[15,15,20], Other:[5,6,5] },
    Seed: { n:[115,167,180], UK:[70,69,72], Europe:[21,18,18], US:[3,9,7], Other:[6,4,3] },
    "Series A": { n:[179,230,269], UK:[59,58,54], Europe:[26,26,23], US:[12,12,18], Other:[3,4,5] },
    "Series B": { n:[80,84,121], UK:[41,36,37], Europe:[19,26,23], US:[35,29,36], Other:[5,9,4] },
    "Series C+": { n:[29,51,63], UK:[49,20,24], Europe:[21,43,27], US:[23,27,37], Other:[7,10,12] }
  },
  leadVal: {
    totalBn: 8.8,
    ukBn: 2.9,
    inboundBn: 5.9,
    originBn2025: { US:3.1, Europe:2, Other:0.8 },
    originShare2025: { US:52, Europe:34, Other:14 },
    originShare2024: { US:36, Europe:48, Other:16 },
    originBn2024: { US:1.5, Europe:2.1, Other:0.7 },
    stageBn: [0.1,0.7,1.3,3.8],
    stageShare: { US:[26,40,59,53], Europe:[65,49,36,30], Other:[9,11,5,17] }
  },
  sectors: [
    { n:"AI", s:[4.5,8.9,14.3,17.4] },
    { n:"FinTech", s:[15.1,10.1,12.4,11.8] },
    { n:"Life Sci & BioTech", s:[9.8,6.1,12.2,10.5] },
    { n:"Health/MedTech", s:[11.8,12.2,9.5,8.9] },
    { n:"Software – Enterprise", s:[9.4,8,7.5,8.2] },
    { n:"Retail & Consumer", s:[5.7,5.6,6.8,6.2] },
    { n:"CleanTech", s:[3.7,6.1,4.9,5.2] },
    { n:"Cyber", s:[4.1,3.5,2,4.1] },
    { n:"Energy", s:[2,4.2,2.7,3.8] },
    { n:"Hardware", s:[0.8,1.9,1.7,2.1] }
  ],
  sectorYears: [2022,2023,2024,2025],
  top10Share: [67,67,74,78],
  deepTech: { vol:[15,15,27,28,35], val:[14,22,31,30,45] },
  sectorVal: [
    { n:"Hardware", v:235, i:42, dt:1 },
    { n:"AI", v:192, i:20.7, dt:1 },
    { n:"Transport", v:177, i:41.3, dt:0 },
    { n:"Robotics", v:170, i:41.4, dt:1 },
    { n:"FinTech", v:146, i:14.3, dt:0 },
    { n:"Energy", v:136, i:20.2, dt:1 },
    { n:"Cyber", v:73, i:16.9, dt:1 },
    { n:"BioTech", v:66, i:16.2, dt:0 },
    { n:"Life Sciences", v:66, i:20, dt:0 },
    { n:"Health/MedTech", v:57, i:9.6, dt:0 },
    { n:"Esports/Gaming", v:57, i:10.3, dt:0 },
    { n:"CleanTech", v:52, i:10.2, dt:1 },
    { n:"Software – Ent.", v:50, i:8.5, dt:0 },
    { n:"Retail & Consumer", v:44, i:6.5, dt:0 },
    { n:"SpaceTech", v:44, i:36.7, dt:1 }
  ],
  geoStage: [
    { n:"Seed", ts:181, lon:49, valM:228, lonV:53 },
    { n:"Series A", ts:274, lon:71, valM:1457, lonV:71 },
    { n:"Series B", ts:124, lon:77, valM:2249, lonV:76 },
    { n:"Series C+", ts:64, lon:72, valM:3423, lonV:75 }
  ],
  geoSector: [
    { n:"AI", ts:112, lon:74, valM:1492, lonV:80 },
    { n:"FinTech", ts:77, lon:90, valM:1103, lonV:94 },
    { n:"Life Sci & BioTech", ts:63, lon:40, valM:400, lonV:22 },
    { n:"Health/MedTech", ts:57, lon:54, valM:547, lonV:70 },
    { n:"Software – Ent.", ts:52, lon:71, valM:467, lonV:91 },
    { n:"Retail & Consumer", ts:43, lon:63, valM:281, lonV:80 },
    { n:"CleanTech", ts:36, lon:39, valM:376, lonV:41 },
    { n:"Cyber", ts:23, lon:74, valM:194, lonV:90 },
    { n:"Energy", ts:25, lon:44, valM:334, lonV:36 },
    { n:"Hardware", ts:14, lon:43, valM:230, lonV:63 }
  ],
  geoOverall: { lon:66, reg:34, regionsDeals:45 },
  investorMix: ["VC (LP fund)","VCT","EIS","CVC","Family office","Angel"],
  regions: [
    {
      n: "London",
      ts: 418,
      avg: 15.1,
      pref: 89,
      nonpart: 93,
      liq: 1,
      pool: 75,
      vest: 64,
      mix: [71,13,4,6,3,2]
    },
    {
      n: "South East",
      ts: 57,
      avg: 15.9,
      pref: 83,
      nonpart: 81,
      liq: 1.1,
      pool: 62,
      vest: 52,
      mix: [59,10,9,14,5,3]
    },
    {
      n: "South West",
      ts: 43,
      avg: 11.3,
      pref: 74,
      nonpart: 91,
      liq: 1,
      pool: 74,
      vest: 51,
      mix: [65,14,5,9,0,7]
    },
    {
      n: "Scotland",
      ts: 40,
      avg: 5.7,
      pref: 79,
      nonpart: 82,
      liq: 1.1,
      pool: 72,
      vest: 51,
      mix: [56,9,9,9,7,9]
    },
    {
      n: "East of England",
      ts: 28,
      avg: 11,
      pref: 86,
      nonpart: 92,
      liq: 1.4,
      pool: 54,
      vest: 54,
      mix: [61,11,11,18,0,0]
    },
    {
      n: "North of England",
      ts: 27,
      avg: 10.9,
      pref: 81,
      nonpart: 77,
      liq: 1.1,
      pool: 59,
      vest: 52,
      mix: [37,33,7,11,11,0]
    },
    {
      n: "Midlands",
      ts: 18,
      avg: 5,
      pref: 83,
      nonpart: 73,
      liq: 1.1,
      pool: 72,
      vest: 72,
      mix: [33,28,28,6,6,0]
    },
    {
      n: "Northern Ireland",
      ts: 7,
      avg: 3.5,
      pref: 100,
      nonpart: 100,
      liq: 1.5,
      pool: 50,
      vest: 50,
      mix: [50,50,0,0,0,0]
    },
    {
      n: "Wales",
      ts: 5,
      avg: 0.5,
      pref: 100,
      nonpart: 20,
      liq: 1,
      pool: 100,
      vest: null,
      mix: [100,0,0,0,0,0]
    }
  ],
  spinouts: {
    n: 58,
    stage: { Seed:24, "Series A":36, "Series B":23, "Series C+":17 },
    sector: {
      "Life Sci & BioTech": 31,
      HealthTech: 17,
      AI: 10,
      CleanTech: 10,
      Energy: 9,
      Hardware: 5,
      SpaceTech: 2,
      Cyber: 2,
      Other: 14
    },
    terms: [
      ["Participating pref",10,13],
      ["Anti-dilution",63,50],
      ["Convertibles",32,19],
      ["Co-investors",38,48],
      ["Board appointments",81,79],
      ["Founder warranties",42,55],
      ["Company warranties",80,86],
      ["Secondaries",19,5],
      ["Investor consents",83,86],
      ["Founder vesting",55,58]
    ],
    unis: [
      ["Oxford",225],
      ["Cambridge",175],
      ["Imperial",132],
      ["Manchester",114],
      ["UCL",99],
      ["Bristol",81],
      ["Royal College of Art",72],
      ["Edinburgh",71],
      ["Swansea",58],
      ["Queen’s Belfast",57]
    ]
  },
  bigA: {
    shareOfA: [8,12,10],
    avgPre: [95,130,160],
    count: { y2024:31, y2025:27 },
    rows: [
      ["AI",1000,1000,"CVC","Y","N","1.25x"],
      ["AI",650,699,"CVC","Y","N","1x"],
      ["FinTech",350,399,"CVC","Y","N","n/a"],
      ["FinTech",250,299,"VC","Mixed","N","n/a"],
      ["EdTech",200,249,"VC","Y","N","1x"],
      ["Media",150,199,"VC","Y","N","1x"],
      ["Life sciences",150,199,"CVC","Y","Y","1x"],
      ["Health/MedTech",100,149,"VC","Y","N","1x"],
      ["Blockchain",100,149,"VC","Y","N","1x"],
      ["Software – Ent.",70,79.9,"VC","Y","N","n/a"],
      ["Health/MedTech",70,79.9,"CVC","Y","N","1x"],
      ["AI",70,79.9,"VC","Y","N","1x"],
      ["Digital",60,69.9,"VCT","Y","N","1x"],
      ["AI",60,69.9,"VC","Y","N","1x"],
      ["Retail & Consumer",60,69.9,"VCT","Y","N","1x"]
    ]
  },
  invVol: { VC:[65,61,63,68,66], VCT:[5,15,13,9,14], EIS:[8,7,5,4,6], CVC:[21,16,14,12,9] },
  invVal: { VC:[74,68,60,73,71], VCT:[1,17,8,6,9], EIS:[1,1,1,0,1], CVC:[23,14,29,18,15] },
  cvcSector: [
    ["FinTech",18,20],
    ["AI",11,18],
    ["Retail",7,10],
    ["CleanTech",7,8],
    ["Energy",1,8],
    ["Health/MedTech",13,7],
    ["Life Sci & Bio",8,5],
    ["Cyber",1,3],
    ["Media",3,3],
    ["Hardware",3,3],
    ["Other",28,15]
  ],
  cvcStage: {
    vol: { Seed:16, "Series A":41, "Series B":20, "Series C+":23 },
    val: { Seed:1, "Series A":8, "Series B":12, "Series C+":79 }
  },
  macro: {
    ukVC: { years:[2020,2021,2022,2023,2024,2025], bn:[16.8,27,25.1,16.9,18.5,19.1] },
    conc: {
      years: [2023,2024,2025],
      Seed: [1.4,1.3,1],
      "Series A": [3.8,3.8,2.9],
      "Series B": [3.3,3.1,3.1],
      "Series C+": [8.4,10.3,12.1]
    },
    countries: [
      ["United States",243.7,42],
      ["China",39.9,-3],
      ["United Kingdom",19.1,5],
      ["India",13.9,12],
      ["Germany",7.4,2],
      ["France",7.2,1],
      ["Canada",6.3,12],
      ["Israel",4.8,59],
      ["Japan",4.6,-48],
      ["Singapore",3.4,-33]
    ],
    exits: {
      "2024 H1": { ipo:2, ma:121 },
      "2024 H2": { ipo:0, ma:119 },
      "2025 H1": { ipo:1, ma:132 },
      "2025 H2": { ipo:1, ma:123 }
    },
    dryPowder: {
      global: [169,525],
      europe: [23,58],
      mult: { global:3.1, europe:2.5 },
      from: 2015,
      to: 2025
    }
  },
  pulse: {
    outlook: [
      ["Extremely positive",3,18],
      ["Somewhat positive",60,53],
      ["Neither",25,25],
      ["Somewhat negative",10,5],
      ["Extremely negative",2,0]
    ],
    deals: [
      ["Much less",2,3],
      ["Somewhat less",4,5],
      ["About the same",42,43],
      ["Somewhat more",46,40],
      ["Much more",6,10]
    ],
    focus: [
      ["Current portfolio",15,3],
      ["Equal split",65,56],
      ["New investments",20,41]
    ],
    sectors: [
      ["AI",55,78],
      ["DeepTech",41,71],
      ["Enterprise software",45,56],
      ["FinTech",43,49],
      ["HealthTech",31,46],
      ["ClimateTech",27,32],
      ["BioTech",20,17],
      ["Other",18,12]
    ],
    founderVal: [
      ["Much more aggressive",3,8],
      ["A little more aggressive",34,47],
      ["About the same",56,29],
      ["A little less aggressive",5,16],
      ["Much less aggressive",2,0]
    ],
    structure: [
      ["Much more aggressive",4,3],
      ["A little more aggressive",30,18],
      ["About the same",60,71],
      ["A little less aggressive",6,8],
      ["Much less aggressive",0,0]
    ]
  },
  kpi: {
    bc: [31,26,27],
    seedPart: [14,7,15],
    usC: [37,27,23],
    aiDeep: [35,28,27],
    regions: 45,
    spin: 9,
    cvc: [9,12,14],
    secC: [36,41,40],
    esgC: [12,33,23],
    newDeals: [41,21]
  },
  bcPooled2023: true,
  termCat: {
    pref: "Economic",
    pool: "Economic",
    antidil: "Economic",
    coinv: "Economic",
    conv: "Economic",
    sec: "Economic",
    tranche: "Economic",
    prefdiv: "Economic",
    growth: "Economic",
    board: "Control",
    vest: "Control",
    leaver: "Control",
    drag: "Control",
    tag: "Control",
    cosale: "Control",
    consent: "Control",
    restrict: "Control",
    fwarr: "Other",
    cwarr: "Other",
    arrfee: "Other",
    monfee: "Other",
    excl: "Other",
    dei: "Other",
    sust: "Other",
    dno: "Other",
    keyman: "Other",
    persguar: "Other"
  },
  seedPart: { years:[2023,2024,2025], v:[15,7,13] },
  cplusCycle: {
    years: [2023,2024,2025],
    val: [211,192.9,258.4],
    part: [7,15,6],
    div: [20,32,30],
    tranche: [27,46,null],
    vest: [30,43,32],
    leaver: [13,25,15]
  },
  aiVal: {
    years: [2021,2022,2023,2024],
    Seed: { ai:[3.3,4.1,4,4.3], ex:[3.2,3.8,3.9,4] },
    "Series A": { ai:[17.4,18.2,16.7,17], ex:[16.4,15.7,16.5,18.1] },
    "Series B": { ai:[57.8,66.8,52.5,62.3], ex:[55.7,59.6,57.3,54] },
    "Series C+": { ai:[227.1,234.1,255.3,201.7], ex:[265.4,249,179.2,191.2] }
  },
  sectorVal24: [
    { n:"eSports & Gaming", pre:108, i:18.4 },
    { n:"FinTech", pre:101, i:12 },
    { n:"Cyber", pre:101, i:13.6 },
    { n:"AI", pre:93, i:18.1 },
    { n:"Life Sci & BioTech", pre:63, i:29.8 },
    { n:"HealthTech", pre:53, i:13.9 },
    { n:"Software – Enterprise", pre:46, i:16.2 },
    { n:"Retail & Consumer", pre:39, i:7.4 },
    { n:"CleanTech & Energy", pre:38, i:8 },
    { n:"Hardware", pre:30, i:11.4 },
    { n:"Transport", pre:29, i:5.3 },
    { n:"Media", pre:26, i:7.7 },
    { n:"FoodTech", pre:25, i:6.3 },
    { n:"Data analytics", pre:20, i:3.6 },
    { n:"Digital", pre:20, i:6.3 }
  ],
  sectorStage: {
    y2023: {
      n: [123,189,84,30],
      total: 426,
      rows: {
        "HealthTech & Life Sci": [18,23,13,3],
        "CleanTech & Energy": [7,25,8,4],
        FinTech: [10,17,13,3],
        AI: [14,12,9,3],
        "Software – Enterprise": [15,16,3,0],
        "Retail & Consumer": [6,13,2,3],
        "Data analytics": [4,10,4,1],
        Digital: [4,7,6,1],
        Cyber: [3,5,5,2]
      }
    },
    y2024: {
      n: [185,249,91,63],
      total: 588,
      rows: {
        AI: [26,40,8,10],
        FinTech: [17,33,17,6],
        "Life Sci & BioTech": [16,19,16,21],
        HealthTech: [14,26,8,8],
        "CleanTech & Energy": [14,25,4,2],
        "Software – Enterprise": [14,16,9,5],
        "Retail & Consumer": [12,21,4,3],
        "Data analytics": [15,7,2,0],
        FoodTech: [4,8,2,0],
        Cyber: [4,5,1,2]
      }
    }
  },
  sectorShareEd: [
    { n:"AI", s:[3,9,14,17.4] },
    { n:"FinTech", s:[15,10,12,11.8] },
    { n:"Life Sci & BioTech", s:[10,6,12,10.5] },
    { n:"HealthTech", s:[12,12,10,8.9] },
    { n:"CleanTech & Energy", s:[6,10,8,9] },
    { n:"Software – Enterprise", s:[9,8,7,8.2] },
    { n:"Retail & Consumer", s:[6,6,7,6.2] }
  ],
  cvcSeedShare: { y2022:8, y2023:17 },
  editions: [
    {
      ed: "2023",
      cover: "2022 deals",
      n: 245,
      note: "SVB UK inaugural guide (not downloaded — third-party mirror only)"
    },
    { ed:"2024", cover:"2023 deals", n:426, lawFirms:21 },
    { ed:"2025", cover:"2024 deals", n:588, lawFirms:27 },
    { ed:"2026", cover:"2025 deals", n:711 }
  ],
  advice: ADVICE_TEXT
};
/*@@END*/

/*@@BENCH*/
/* ==========================================================================
   BENCH_DATA — benchmarking tool: term prevalence by stage / investor type / sector, plus medians for the round check
   ========================================================================== */
const BENCH_DATA = {
  _about: "Data for benchmark.html (term-sheet benchmarking + negotiation points)",
  terms: [
    { k:"pref", l:"Preference shares", c:"Economic" },
    { k:"nonpart", l:"% prefs non-participating", c:"Economic" },
    { k:"pool", l:"New option pool", c:"Economic" },
    { k:"antidil", l:"Anti-dilution ratchet", c:"Economic" },
    { k:"conv", l:"Convertibles", c:"Economic" },
    { k:"sec", l:"Secondaries", c:"Economic" },
    { k:"coinv", l:"Co-investor / syndicate", c:"Economic" },
    { k:"board", l:"Board representation", c:"Control" },
    { k:"vest", l:"Founder vesting", c:"Control" },
    { k:"leaver", l:"Founder leaver provision", c:"Control" },
    { k:"drag", l:"Drag-along", c:"Control" },
    { k:"consent", l:"Investor consent rights", c:"Control" },
    { k:"fwarr", l:"Founder warranties", c:"Other" },
    { k:"cwarr", l:"Company warranties", c:"Other" },
    { k:"arrfee", l:"Arrangement fees", c:"Other" },
    { k:"monfee", l:"Monitoring fees", c:"Other" },
    { k:"excl", l:"Exclusivity period", c:"Other" },
    { k:"sust", l:"Sustainability / ESG", c:"Other" },
    { k:"dei", l:"DEI clause", c:"Other" }
  ],
  stages: ["Seed","Series A","Series B","Series C+"],
  stageDef: ["<£2m","£2–10m","£10–30m",">£30m"],
  investorTypes: ["VC (LP fund)","VCT","EIS fund","CVC","Family office","Angel"],
  investorMeta: [
    { n:466, avg:13.1 },
    { n:98, avg:8.3 },
    { n:41, avg:2.4 },
    { n:61, avg:18.3 },
    { n:25, avg:13.8 },
    { n:20, avg:6.2 }
  ],
  sectorCohorts: ["AI (pure)","DeepTech (ex-AI)","Life Sci & BioTech"],
  byStage: {
    y2025: {
      pref: [74,89,96,100],
      nonpart: [86,91,90,93],
      pool: [68,76,69,69],
      antidil: [39,66,79,86],
      conv: [19,34,42,38],
      sec: [7,14,37,36],
      coinv: [31,39,40,49],
      board: [80,85,88,83],
      vest: [65,63,56,32],
      leaver: [67,51,40,15],
      drag: [84,86,87,75],
      consent: [85,84,80,78],
      fwarr: [62,42,29,15],
      cwarr: [87,81,79,63],
      arrfee: [22,14,4,0],
      monfee: [21,17,5,0],
      excl: [61,78,82,74],
      sust: [28,32,22,12],
      dei: [9,11,10,5]
    },
    y2024: {
      pref: [67,88,95,98],
      nonpart: [93,87,83,84],
      pool: [67,70,75,79],
      antidil: [36,60,76,90],
      conv: [22,31,37,37],
      sec: [6,18,38,41],
      coinv: [26,35,40,38],
      board: [77,92,91,92],
      vest: [64,59,52,43],
      leaver: [59,62,40,25],
      drag: [81,86,77,86],
      consent: [76,81,67,70],
      fwarr: [46,49,32,13],
      cwarr: [79,89,85,79],
      arrfee: [12,18,0,0],
      monfee: [14,19,2,0],
      excl: [57,69,63,73],
      sust: [21,29,27,33],
      dei: [11,11,12,8]
    },
    y2023: {
      pref: [65,87,97,97],
      nonpart: [85,89,93,93],
      pool: [67,74,63,63],
      antidil: [27,64,73,73],
      conv: [28,35,40,40],
      sec: [4,15,40,40],
      coinv: [41,42,53,53],
      board: [81,88,90,90],
      vest: [75,59,30,30],
      leaver: [59,56,13,13],
      drag: [83,85,77,77],
      consent: [83,79,70,70],
      fwarr: [60,44,13,13],
      cwarr: [87,84,67,67],
      arrfee: [13,11,0,0],
      monfee: [15,11,7,7],
      excl: [59,67,70,70],
      sust: [17,24,23,23],
      dei: [9,11,10,10]
    }
  },
  byInvestor: {
    y2025: {
      pref: [93,86,68,89,64,35],
      nonpart: [92,88,79,83,81,100],
      pool: [75,71,78,61,44,40],
      antidil: [70,60,0,69,52,15],
      conv: [33,36,12,26,28,35],
      sec: [18,20,5,28,36,0],
      coinv: [39,42,24,44,28,30],
      board: [83,93,84,78,76,77],
      vest: [62,63,71,30,40,30],
      leaver: [48,60,78,34,32,30],
      drag: [85,93,85,80,72,65],
      consent: [83,81,90,85,72,90],
      fwarr: [38,56,61,39,36,40],
      cwarr: [79,87,88,79,84,80],
      arrfee: [6,30,51,7,12,15],
      monfee: [9,32,41,5,8,20],
      excl: [80,76,61,54,44,35],
      sust: [27,32,24,30,4,15],
      dei: [11,11,0,15,0,0]
    },
    y2024: {
      pref: [89,72,67,87,71,37],
      nonpart: [89,76,71,89,80,80],
      pool: [75,60,67,62,57,63],
      antidil: [65,43,0,58,50,19],
      conv: [30,30,14,31,29,26],
      sec: [22,13,0,24,14,19],
      coinv: [33,32,29,27,36,52],
      board: [87,91,61,92,83,83],
      vest: [63,40,71,51,36,37],
      leaver: [55,64,67,42,29,44],
      drag: [84,81,86,79,64,89],
      consent: [77,75,71,70,71,78],
      fwarr: [42,60,62,30,21,30],
      cwarr: [86,89,86,82,71,78],
      arrfee: [7,47,33,4,0,11],
      monfee: [8,43,43,6,0,19],
      excl: [70,58,62,58,36,33],
      sust: [31,28,14,13,7,15],
      dei: [13,6,10,6,0,7]
    },
    y2023: {
      pref: [91,79,52,86,60,12],
      nonpart: [90,78,100,88,100,100],
      pool: [74,68,57,71,40,0],
      antidil: [63,54,0,63,40,6],
      conv: [34,28,29,29,20,18],
      sec: [18,12,0,25,20,6],
      coinv: [45,49,52,20,0,59],
      board: [87,84,90,86,80,71],
      vest: [66,58,57,44,0,71],
      leaver: [48,63,57,46,0,65],
      drag: [84,74,76,83,60,100],
      consent: [78,79,71,80,80,88],
      fwarr: [40,51,71,39,60,53],
      cwarr: [78,84,90,85,80,82],
      arrfee: [4,32,38,3,0,6],
      monfee: [5,26,38,8,20,18],
      excl: [70,72,62,61,40,18],
      sust: [22,28,19,22,0,6],
      dei: [12,14,0,8,0,0]
    }
  },
  bySector: {
    y2025: {
      pref: [87,89,89],
      nonpart: [97,83,85],
      pool: [79,76,72],
      antidil: [64,67,57],
      conv: [36,39,36],
      sec: [20,15,4],
      coinv: [31,42,45],
      board: [81,83,89],
      vest: [69,61,53],
      leaver: [46,56,47],
      drag: [85,84,85],
      consent: [74,86,79],
      fwarr: [37,48,39],
      cwarr: [76,82,77],
      arrfee: [6,16,8],
      monfee: [8,20,15],
      excl: [80,70,77],
      sust: [30,39,21],
      dei: [18,10,4]
    },
    y2024: {
      pref: [88,84,88],
      nonpart: [95,91,78],
      pool: [79,71,82],
      antidil: [68,57,63],
      conv: [35,30,40],
      sec: [15,15,17],
      coinv: [30,39,50],
      board: [74,76,88],
      vest: [74,62,49],
      leaver: [63,65,36],
      drag: [85,90,83],
      consent: [71,78,68],
      fwarr: [38,47,39],
      cwarr: [85,85,86],
      arrfee: [17,11,3],
      monfee: [15,14,8],
      excl: [73,66,75],
      sust: [18,39,40],
      dei: [8,18,10]
    }
  },
  valuation: {
    Seed: [3.2,3.8,4,3.9,4.2],
    "Series A": [16.7,16,16.7,17.9,17.1],
    "Series B": [57.8,60,55.2,56.9,58.2],
    "Series C+": [261.5,249,211,191.3,258.4]
  },
  avgInv: {
    Seed: [0.58,0.59,0.63,0.65,0.59],
    "Series A": [4.3,4.4,4.4,4.6,4.6],
    "Series B": [17.3,17.5,17.2,16.9,17.7],
    "Series C+": [91.2,88.6,83,93.4,110]
  },
  bcPooled2023: true,
  advice: ADVICE_TEXT
};
/*@@END*/

/*@@DILUTION*/
/* ==========================================================================
   DILUTION_DATA — dilution & exit waterfall: round presets, defaults, colours
   ========================================================================== */
const DILUTION_DATA = {
  _about: "Data for dilution.html (founder dilution + exit waterfall). Round defaults are the 2025 UK medians: average cheque and Pitchbook median post-money (£m), 2026 guide slide 22.",
  medians2025: {
    Seed: { invest:0.59, postMoney:4.2 },
    "Series A": { invest:4.6, postMoney:17.1 },
    "Series B": { invest:17.7, postMoney:58.2 },
    "Series C+": { invest:110, postMoney:258.4 }
  },
  defaults: {
    optionPoolPct: 10,
    seniority: "std",
    exitValueM: 60,
    chartMaxM: 500,
    chartMaxOptions: [250,500,1000],
    participatingCapMultiple: 3
  },
  prefTypes: { np:"Non-participating", p:"Participating", pc:"Participating, capped" },
  presets: {
    market: {
      label: "Market median",
      rounds: [
        { name:"Seed", invest:0.59, postMoney:4.2, pref:"np", multiple:1, included:true },
        { name:"Series A", invest:4.6, postMoney:17.1, pref:"np", multiple:1, included:true },
        { name:"Series B", invest:17.7, postMoney:58.2, pref:"np", multiple:1, included:true },
        { name:"Series C+", invest:110, postMoney:258.4, pref:"np", multiple:1, included:false }
      ]
    },
    seedpart: {
      label: "Participating Seed",
      rounds: [
        { name:"Seed", invest:0.59, postMoney:4.2, pref:"p", multiple:1, included:true },
        { name:"Series A", invest:4.6, postMoney:17.1, pref:"np", multiple:1, included:true },
        { name:"Series B", invest:17.7, postMoney:58.2, pref:"np", multiple:1, included:true },
        { name:"Series C+", invest:110, postMoney:258.4, pref:"np", multiple:1, included:false }
      ]
    },
    heavy: {
      label: "Heavy structure",
      rounds: [
        { name:"Seed", invest:0.59, postMoney:4.2, pref:"p", multiple:1, included:true },
        { name:"Series A", invest:4.6, postMoney:17.1, pref:"pc", multiple:1.5, included:true },
        { name:"Series B", invest:17.7, postMoney:58.2, pref:"p", multiple:1, included:true },
        { name:"Series C+", invest:110, postMoney:258.4, pref:"pc", multiple:1, included:true }
      ]
    }
  },
  colours: {
    founders: "#0f6e6e",
    optionPool: "#9db6c7",
    Seed: "#d9a024",
    "Series A": "#2a8a86",
    "Series B": "#3a5aa8",
    "Series C+": "#7a3b6e"
  }
};
/*@@END*/
