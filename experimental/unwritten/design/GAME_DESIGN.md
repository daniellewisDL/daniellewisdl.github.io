# UNWRITTEN — Refined Game Design

*A 1990s-style browser platformer about the last secret of a great Victorian novelist: the day he burned his letters.*

Based on `ideation/unwrittenOutline.txt` and the eight Gemini concept sheets. This document is the
build spec — everything here is implemented in the game.

---

## 1. Pillars

- **Evasion over combat.** Hazards slow, dim, or obscure — they never kill. There is no Game Over.
  Falling into water/pits gently returns you to the last checkpoint with a sigh, not a death jingle.
- **Easy walkthrough.** Every letter sits on or near the main path. Max gap = 4 tiles, max jump
  needed = 2.5 tiles. A literary-minded adult who hasn't held a gamepad since 1996 finishes every level.
- **Collect letters, then burn them.** 5 letters per level (45 total + the final scattered pages at
  Gad's Hill). After each of levels 1–9, a letter cutscene shows a fragment written by the Novelist.
- **Believable Dickens.** Every level, hazard, NPC and letter references a real place in Dickens's
  life or a work: the blacking-warehouse shame, the Marshalsea, Staplehurst, Ellen Ternan, the real
  1860 bonfire at Gad's Hill — where, famously, onions were roasted in the ashes.

## 2. Controls

- **← / →** (or A/D) walk · **Space / ↑ / W / Z** jump · **Enter** advance dialogue · **M** mute · **Esc** pause/map
- Coyote time (0.1 s) + jump buffering (0.12 s). Variable jump height (release early = shorter).

## 3. The 10 Levels

Canvas 640×360 (logical 320×180 at a fixed 2× transform so external art and text render at double
detail), 16 px tiles, levels ~80–120 tiles long (~90 s each). Each level = seeded generator
+ hand-tuned config (palette, skyline, props, hazard set, special mechanic, music).

### Act I — The Grimy Heart of London *(browns, greys, gaslamp green)*
| # | Level | Mechanic / hazards |
|---|-------|--------------------|
| 1 | Pip's Attic | Tutorial. Rafters, rotting boards (crumble), rats. |
| 2 | Fagin's Rooftops | Faster pace, slick slates, chimney gaps, blood-red moon, pickpockets. |

### Act II — Institutions, Injustice & Ghosts *(stone grey, candle amber, spectral teal)*
| 3 | Marshalsea Debtors' Prison | Debtors' Shadows rise from floor and grab (slow); iron gates. |
| 4 | Satis House | Frozen clocks (8:40) emit time-slow shockwaves; rotten wedding cake; spectral bride. |

### Act III — The Novelist Abroad *(sea blue, bone white, lantern gold)*
| 5 | The Calais Packet Boat | The whole level tilts — gravity leans with the swell; masts, waves. |
| 6 | The Paris Catacombs | Darkness + flickering lantern circle; bone platforms; collapsing ceilings. |

### Act IV — The Return & The Reckoning *(soot black, snow white, ember orange)*
| 7 | A Snowy Christmas Eve | Heavy snow veils the screen; ice; three ghostly apparitions drift past (Carol). |
| 8 | The Marshes at Dawn | Flat & bleak; sinking peat bogs; man-traps; the Convict paces behind you dragging a chain. |
| 9 | The Railway Crash | Auto-scroll; teetering carriages over the gorge at Staplehurst; save the last satchel. |
| 10 | Gad's Hill Place | Quiet. No hazards. Walk your own house, pick up the final pages, step into the garden. **Bonfire cutscene → credits.** |

*(Cut from the 20-level draft: Thames Docks, Oliver's Workhouse, The Old Curiosity Shop, Chancery,
Fleet Street Printery, the Reading Room, Venice, Five Points, the Steamer, the Sewers — their
mechanics all survive in the kept set.)*

## 4. Enemies & Hazards (all non-lethal)

| Manifestation | Source | Effect on touch |
|---|---|---|
| Rats | London | Brief stumble (0.5 s slow) |
| Turnkeys (the Beadle) | Twist, Dorrit | Walk-speed halved while in their gaze |
| Debtors' Shadows | Marshalsea trauma | Grab ankles — hold you 1 s |
| Ticking Faces (8:40) | Satis House | Shockwave rings slow time/jump physics |
| The Spectral Bride / apparitions | Great Expectations, Carol | Drain colour & light near you |
| Crushing Coffins / collapses | Twist / catacombs | Falling blocks; knock you down |
| Waves | the Channel | Sweep the deck; slow + push |
| Man-traps | the marshes | Snap shut — hold you briefly |
| The Ghost of the Unfinished | Edwin Drood | Half-formed parchment figure mimics you on 5 s delay (levels 7–9) |
| The Convict | Great Expectations | Paces the marshes; chain-drag audio cue |

## 5. The Letters (end-of-level fragments)

One per level 1–9, read in a typewriter cutscene over parchment. Full text lives in
`js/letters.js`. Recipients: John Forster, Wilkie Collins, Angela Burdett-Coutts,
Georgina Hogarth, W. H. Wills, and his son Charley — each fragment ties the level just played to a
real biographical fact and a fictional haunting.

Level 10 has no letter: instead the **bonfire cutscene** — the collected count of letters cascades
into the fire, embers rise, an onion roasts in the ashes (the real detail his children remembered),
and the credits roll over the fading fire. Final line: *"He burned every letter he ever received.
The rest, he left unwritten."*

## 6. Soundscape (WebAudio chiptune, "16-bit MIDI" feel)

- **Title:** solitary music-box waltz in A minor, slightly detuned.
- **Act I:** plucked cello bass + bassoon square lead, clock-tick percussion, Big Ben chime accents.
- **Act II:** reverbed organ pads, harpsichord arpeggios, hollow choir pad. Satis House variant: warped music box.
- **Act III:** accordion/mandolin leads, brighter but with the solitary piano ostinato underneath.
- **Act IV:** solo piano + wind noise. Level 20: music thins bar by bar and **falls silent**; only footsteps, then fire crackle (filtered noise) under the credits.
- SFX: jump blip, letter chime (wax-seal sparkle), checkpoint quill scratch, gate creak, fog whoosh, chain clank.

## 7. Structure & Tech

- Vanilla JS + Canvas 2D, no build step; runs from any static server. `index.html` + `js/*.js`.
- 640×360 canvas (logical 320×180 under a fixed 2× transform), integer-scaled, `image-rendering: pixelated`.
- External art is optional and loaded from `assets/` per `ASSETS.md`; every hook falls back to
  code-defined pixel-map sprites in the palette of the Gemini sheets.
- Progress in `localStorage` (`unwritten.save.v2`): furthest level, letters per level.
- Level select = the four Acts as chapters of a book; completed levels marked with a wax seal.
