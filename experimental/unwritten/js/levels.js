// UNWRITTEN — 20 level definitions + deterministic level generator
'use strict';

// Tile codes: 0 air, 1 solid, 2 one-way platform, 3 water/liquid (soft hazard), 4 crumbling board
UW.TILE = { AIR: 0, SOLID: 1, PLAT: 2, WATER: 3, CRUMBLE: 4 };

// Act palettes (sky gradient, ground fill, platform, accent/glow, fog tint)
const ACT_PAL = {
  1: { skyA: '#2a2620', skyB: '#4d453a', ground: '#2b241d', ground2: '#3a3128', plat: '#4a3c2c', accent: '#9fae62', fog: '#8a8270', water: '#39434a' },
  2: { skyA: '#1c1c22', skyB: '#3b3a45', ground: '#2e2c33', ground2: '#3d3a44', plat: '#545060', accent: '#d8b465', fog: '#6e6a80', water: '#2c3440' },
  3: { skyA: '#25303e', skyB: '#7a5a52', ground: '#3a3630', ground2: '#4c463c', plat: '#5c5244', accent: '#e0a05c', fog: '#8090a0', water: '#2e4a5c' },
  4: { skyA: '#15141a', skyB: '#33313a', ground: '#26242a', ground2: '#343138', plat: '#46424c', accent: '#e07830', fog: '#9aa2ac', water: '#26333c' }
};

UW.LEVELS = [
  { n: 1,  name: "Pip's Attic",                theme: 'attic',    act: 1, len: 130, music: 'act1', hazards: { rat: 6 }, crumble: true, indoor: true, amp: 5, gaps: 0.05 },
  { n: 2,  name: 'The Thames Docks',           theme: 'docks',    act: 1, len: 160, music: 'act1', hazards: { rat: 3, coffin: 2 }, fog: true, water: true, amp: 4, gaps: 0.16, props: 'barrels' },
  { n: 3,  name: "Oliver's Workhouse",         theme: 'workhouse',act: 1, len: 160, music: 'act1', hazards: { beadle: 4, hands: 5 }, indoor: true, amp: 4, gaps: 0.06 },
  { n: 4,  name: 'The Old Curiosity Shop',     theme: 'shop',     act: 1, len: 140, music: 'act1', hazards: { clockfall: 5, rat: 2 }, indoor: true, amp: 9, gaps: 0.04, platforms: 0.5 },
  { n: 5,  name: "Fagin's Rooftops",           theme: 'rooftops', act: 1, len: 180, music: 'act1', hazards: { pickpocket: 4, rat: 2 }, redmoon: true, amp: 7, gaps: 0.2 },
  { n: 6,  name: "Marshalsea Debtors' Prison", theme: 'prison',   act: 2, len: 160, music: 'act2', hazards: { shadow: 6, beadle: 2 }, indoor: true, amp: 4, gaps: 0.05 },
  { n: 7,  name: 'The Court of Chancery',      theme: 'court',    act: 2, len: 170, music: 'act2', hazards: { gavel: 5, redtape: 3 }, fog: true, indoor: true, amp: 7, gaps: 0.1, platforms: 0.45 },
  { n: 8,  name: 'Fleet Street Printery',      theme: 'printery', act: 2, len: 170, music: 'act2', hazards: { press: 7, ink: 0 }, indoor: true, ice: 0.4, amp: 3, gaps: 0.08, inkpools: true },
  { n: 9,  name: 'The British Museum Reading Room', theme: 'library', act: 2, len: 170, music: 'act2', hazards: { academic: 4, pagefloat: 0 }, indoor: true, amp: 8, gaps: 0.07, platforms: 0.5 },
  { n: 10, name: 'Satis House',                theme: 'satis',    act: 2, len: 170, music: 'act2', hazards: { clockface: 5, bride: 2 }, indoor: true, amp: 5, gaps: 0.06, cobwebs: true },
  { n: 11, name: 'The Calais Packet Boat',     theme: 'ship',     act: 3, len: 150, music: 'act3', hazards: { wave: 4, coffin: 0 }, tilt: true, water: true, amp: 3, gaps: 0.12 },
  { n: 12, name: 'The Paris Catacombs',        theme: 'catacomb', act: 3, len: 160, music: 'act3', hazards: { collapse: 5, shadow: 3 }, dark: true, indoor: true, amp: 5, gaps: 0.07 },
  { n: 13, name: 'A Venice Palazzo',           theme: 'venice',   act: 3, len: 160, music: 'act3', hazards: { gondola: 0, bride: 1 }, water: true, sunset: true, amp: 5, gaps: 0.2 },
  { n: 14, name: 'Five Points, New York',      theme: 'nyc',      act: 3, len: 170, music: 'act3', hazards: { brawler: 5, dog: 3 }, snow: true, ice: 0.85, amp: 4, gaps: 0.08 },
  { n: 15, name: 'The Trans-Atlantic Steamer', theme: 'steamer',  act: 3, len: 160, music: 'act3', hazards: { steam: 6, press: 2 }, indoor: true, embers: true, amp: 6, gaps: 0.09 },
  { n: 16, name: 'The London Sewers',          theme: 'sewer',    act: 4, len: 170, music: 'act4', hazards: { rat: 8, stalker: 1 }, indoor: true, water: true, dark: 0.5, amp: 4, gaps: 0.14 },
  { n: 17, name: 'A Snowy Christmas Eve',      theme: 'xmas',     act: 4, len: 170, music: 'act4', hazards: { apparition: 3, stalker: 1 }, snow: 2, ice: 0.6, amp: 6, gaps: 0.12 },
  { n: 18, name: 'The Marshes at Dawn',        theme: 'marsh',    act: 4, len: 190, music: 'act4', hazards: { convict: 1, trap: 6, bog: 0 }, fog: true, amp: 2, gaps: 0.05, bogs: true },
  { n: 19, name: 'The Railway Crash',          theme: 'railway',  act: 4, len: 200, music: 'act4', hazards: { stalker: 1, coffin: 3 }, autoscroll: 34, amp: 6, gaps: 0.22 },
  { n: 20, name: "Gad's Hill Place",           theme: 'gadshill', act: 4, len: 110, music: 'finale', hazards: {}, amp: 2, gaps: 0, finale: true }
];

UW.palFor = lv => ACT_PAL[lv.act];

// ---------------- Generator ------------------------------------------------
UW.genLevel = function (lv) {
  const T = UW.TILE;
  const W = lv.len, H = 34;
  const rnd = UW.rng(lv.n * 7919 + 13);
  const map = [];
  for (let j = 0; j < H; j++) map.push(new Uint8Array(W));

  // ground height random walk
  const groundY = new Int16Array(W);
  let gy = H - 6;
  let x = 0;
  while (x < W) {
    const seg = 3 + Math.floor(rnd() * 5);
    for (let i = 0; i < seg && x < W; i++, x++) groundY[x] = gy;
    // Relaxed terrain: never more than a 1-tile rise at a time (easy walkthrough);
    // descents may be up to 2 tiles.
    const r = rnd();
    const step = r < 0.38 ? -1 : (r < 0.76 ? 1 : 2); // negative = up
    const amp = lv.amp || 4;
    gy = UW.clamp(gy + step, H - 6 - amp, H - 5);
  }
  // flatten start & end
  for (let i = 0; i < 10; i++) groundY[i] = H - 6;
  for (let i = W - 12; i < W; i++) groundY[i] = H - 6;
  // guarantee: walking right never faces more than a 1-tile rise
  for (let i = 0; i < W - 1; i++) {
    if (groundY[i + 1] < groundY[i] - 1) groundY[i + 1] = groundY[i] - 1;
  }

  // carve gaps (never near start/end); cap width 4
  const gapAt = new Uint8Array(W);
  for (let i = 14; i < W - 16; i++) {
    if (rnd() < (lv.gaps === undefined ? 0.08 : lv.gaps)) {
      const wgap = 2 + Math.floor(rnd() * 2); // 2-3 tiles: comfortable jumps only
      for (let k = 0; k < wgap && i < W - 16; k++, i++) gapAt[i] = 1;
      i += 4; // breathing room
    }
  }

  // relaxed jumps: flat 3-tile runway before every gap, and the far bank
  // never sits more than 1 tile above the take-off
  for (let i = 1; i < W; i++) {
    if (gapAt[i] && !gapAt[i - 1]) {           // i-1 = take-off column
      // drop the take-off to the lowest of the 3 approach tiles (never raise anything)
      let lo = groundY[i - 1];
      for (let k = 1; k <= 3; k++) if (i - 1 - k >= 0) lo = Math.max(lo, groundY[i - 1 - k]);
      groundY[i - 1] = lo;
      if (i - 2 >= 0 && groundY[i - 2] < lo) groundY[i - 2] = lo;
      let e = i; while (e < W && gapAt[e]) e++;  // e = landing column
      if (e < W && groundY[e] < lo - 1) groundY[e] = lo - 1;
      // re-smooth rightwards from the landing so no new >1 rises appear
      for (let k = e; k < W - 1; k++) {
        if (groundY[k + 1] < groundY[k] - 1) groundY[k + 1] = groundY[k] - 1; else break;
      }
    }
  }

  // fill tiles
  for (let i = 0; i < W; i++) {
    if (gapAt[i]) {
      if (lv.water || lv.bogs || lv.inkpools) {
        map[H - 2][i] = T.WATER; map[H - 1][i] = T.WATER;
      }
      continue;
    }
    for (let j = groundY[i]; j < H; j++) map[j][i] = T.SOLID;
    if (lv.crumble && rnd() < 0.06 && !gapAt[i]) map[groundY[i]][i] = T.CRUMBLE;
  }

  // one-way platforms above ground (reachable: 3-5 above ground level)
  const platDensity = lv.platforms || 0.22;
  const plats = [];
  for (let i = 8; i < W - 14; i += 4 + Math.floor(rnd() * 5)) {
    if (rnd() > platDensity) continue;
    const py = groundY[i] - (2 + Math.floor(rnd() * 2)); // 2-3 up: always jumpable
    if (py < 6) continue;
    const pl = 3 + Math.floor(rnd() * 3);
    // never span or end near a gap — a platform that drops you into a pit is a lie
    let overGap = false;
    for (let k = -1; k <= pl + 1; k++) if (gapAt[UW.clamp(i + k, 0, W - 1)]) { overGap = true; break; }
    if (overGap) continue;
    for (let k = 0; k < pl && i + k < W - 8; k++) map[py][i + k] = T.PLAT;
    plats.push({ x: i, y: py, w: pl });
  }
  // bridge gaps that are too wide for comfort with a platform in the middle
  let run = 0;
  for (let i = 0; i < W; i++) {
    if (gapAt[i]) run++;
    else {
      if (run >= 4) {
        const cx = i - Math.floor(run / 2) - 1;
        const py = Math.min(groundY[i], groundY[i - run - 1]) - 1;
        map[py][cx] = T.PLAT; if (cx + 1 < W) map[py][cx + 1] = T.PLAT;
      }
      run = 0;
    }
  }

  // find a standable y at column x
  function standY(cx) {
    for (let j = 0; j < H - 1; j++) {
      if ((map[j + 1][cx] === T.SOLID || map[j + 1][cx] === T.PLAT || map[j + 1][cx] === T.CRUMBLE) && map[j][cx] === T.AIR) return j;
    }
    return H - 7;
  }

  // 5 letters spread along the path
  const letters = [];
  const fracs = [0.16, 0.33, 0.5, 0.67, 0.84];
  for (const f of fracs) {
    let cx = Math.floor(W * f);
    while (gapAt[cx] && cx < W - 10) cx++;
    letters.push({ x: cx, y: standY(cx) - 1 });
  }

  // checkpoints (gas lamps) every ~45 tiles
  const checkpoints = [];
  for (let cx = 30; cx < W - 20; cx += 45) {
    let c = cx; while (gapAt[c] && c < W - 20) c++;
    checkpoints.push({ x: c, y: standY(c) });
  }

  // exit gate near the end
  let ex = W - 7; while (gapAt[ex]) ex--;
  const exit = { x: ex, y: standY(ex) };

  // enemy spawns from hazard table
  const spawns = [];
  const nearGap = (cx, r) => {
    for (let d = -r; d <= r; d++) if (gapAt[UW.clamp(cx + d, 0, W - 1)]) return true;
    return false;
  };
  // Hazards that punish where you stand never spawn beside a pit; drifting
  // ambience (fog brides, clock faces, the stalker...) may go anywhere.
  const AMBIENT = ['wave', 'convict', 'stalker', 'apparition', 'bride', 'clockface', 'redtape', 'pickpocket'];
  const PATROL = ['rat', 'dog', 'beadle', 'academic', 'brawler'];
  for (const kind in (lv.hazards || {})) {
    const count = lv.hazards[kind];
    const radius = AMBIENT.includes(kind) ? 0 : 4;
    for (let k = 0; k < count; k++) {
      let cx = 20 + Math.floor(rnd() * (W - 40));
      while ((gapAt[cx] || (radius && nearGap(cx, radius))) && cx < W - 20) cx++;
      spawns.push({ kind, x: cx, y: standY(cx) });
    }
  }

  // decorative props
  const props = [];
  const propKinds = {
    attic: ['crate', 'crate', 'cobweb', 'candle'], docks: ['barrel', 'barrel', 'crate', 'bollard'],
    workhouse: ['bench', 'candle', 'bowl'], shop: ['clock', 'cage', 'crate', 'books'],
    rooftops: ['chimney', 'chimney'], prison: ['bars', 'bench', 'candle'],
    court: ['books', 'books', 'candle'], printery: ['press', 'books', 'barrel'],
    library: ['books', 'books', 'ladder', 'candle'], satis: ['cake', 'clock', 'candle', 'cobweb'],
    ship: ['barrel', 'crate', 'mast'], catacomb: ['bones', 'bones', 'candle'],
    venice: ['pillar', 'gondola'], nyc: ['barrel', 'crate', 'lamp'],
    steamer: ['furnace', 'barrel', 'gear'], sewer: ['grate', 'barrel'],
    xmas: ['lamp', 'wreath', 'chimney'], marsh: ['reeds', 'reeds', 'post'],
    railway: ['wheel', 'crate', 'debris'], gadshill: ['books', 'candle', 'desk', 'chair']
  };
  const pk = propKinds[lv.theme] || ['crate'];
  for (let i = 12; i < W - 12; i += 5 + Math.floor(rnd() * 8)) {
    if (gapAt[i]) continue;
    props.push({ kind: pk[Math.floor(rnd() * pk.length)], x: i, y: standY(i) });
  }

  return { map, W, H, groundY, letters, checkpoints, exit, spawns, props, gapAt };
};
