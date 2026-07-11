# UNWRITTEN

*A 1990s-style browser platformer. A Victorian novelist spends his last years collecting every
letter he ever sent — to burn them all in the field behind Gad's Hill Place.*

Ten levels through Dickens's London, his institutions, his travels, and his reckoning; a
recovered letter fragment after every level; a chiptune soundtrack that thins act by act until only
footsteps and fire remain. Renders at 640×360 and accepts optional generated art in `assets/`
(see `ASSETS.md`) — the game falls back to its code-drawn pixel art for anything missing.

## Play

Any static file server works — no build step, no dependencies:

```
python -m http.server 8371
# then open http://localhost:8371
```

**Controls:** ← → / A D move · Space / ↑ / W jump · Enter confirm · M mute · Esc back to the map.

Hazards never kill — the manifestations of his fiction (Defarge's needles, the Debtors' Shadows,
the Mudfog Phantoms, the Ghost of the Unfinished…) only slow, grab, dim, or obscure. Falling
just stumbles you back to your last footing. Collect all five letters in a level to open the gate.
Progress saves automatically (localStorage).

## Layout

- `index.html` — entry point
- `js/util.js` — RNG, input, save
- `js/assets.js` — optional external art loader (chroma-keys magenta, silent fallback)
- `js/sprites.js` — code-drawn pixel art fallbacks, defined as text maps
- `js/audio.js` — WebAudio chiptune sequencer (a theme per act) + SFX
- `js/letters.js` — the nine letter fragments, the finale narration, credits
- `js/levels.js` — 10 level configs + deterministic level generator
- `js/entities.js` — the Novelist + every hazard
- `js/game.js` — world, rendering, scenes (title, contents, play, letter, bonfire)
- `assets/` — game-ready art (backgrounds, UI, character frames, tiles, props);
  `assets/src/` holds the raw generated originals
- `tools/` — the asset pipeline (Python + Pillow): downscale/crop, magenta-keyed
  sheet slicing, watermark patching. Re-run when regenerating art (see `ASSETS.md`)
- `design/GAME_DESIGN.md` — the refined design document
- `ideation/` — original outline and concept art the game was built from
