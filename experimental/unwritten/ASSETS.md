# UNWRITTEN — External Asset Spec

Drop generated PNGs into `assets/` with the exact filenames below. Every asset is
optional — the game detects each file and falls back to its code-drawn art if it
is missing, so you can add them one at a time and just reload the page.

## Global rules (all images)

- **Pixel-art style** matching the concept sheets in `ideation/` — chunky pixels,
  muted Victorian palette, gaslight glow accents.
- **No text, no frames, no borders, no UI chrome** in the image. Titles and HUD
  are rendered by the game on top.
- **PNG format.**
- Anything that must be cut out (characters, tiles, props) goes on a **solid flat
  magenta background (#FF00FF)** — the game chroma-keys it out at load time.
  Backgrounds and full-screen art do NOT need magenta; they fill the frame.

## 1. Level backgrounds — `assets/bg/01.png` … `10.png` (highest impact)

- **Size: 1280 × 360** (two screens wide; the game parallax-scrolls and wraps it
  horizontally, so the **left and right edges must tile seamlessly**).
- Composition: horizon/detail in the upper two-thirds; the **bottom third fairly
  calm/dark** (gameplay terrain is drawn over it).
- No characters, no foreground objects that read as platforms.

| File | Scene | Palette / mood |
|---|---|---|
| 01.png | Attic interior — rafters, dusty shafts of light, cobwebs | browns, dim amber |
| 02.png | London rooftops at night — chimneys, church spires, smoke | soot black, blood-red moon |
| 03.png | Debtors' prison interior — high stone walls, barred windows | stone grey, candle amber |
| 04.png | Decayed Victorian mansion interior — stopped clocks, drapes, cobwebs | dusty grey, spectral teal |
| 05.png | Ship deck view — masts, rigging, grey-blue Channel swell | sea blue, bone white |
| 06.png | Paris catacombs — walls of stacked bones, lantern pools | near-black, warm lantern gold |
| 07.png | Snowy London street at night — glowing shop windows, heavy snowfall | deep blue night, brandy-warm windows |
| 08.png | Flat Kent marshes at cold dawn — mist, reeds, distant prison hulks | pale grey-green, cold rose dawn |
| 09.png | Railway cutting at Staplehurst — broken viaduct, overturned carriages, smoke | iron grey, ember orange, dawn |
| 10.png | Gad's Hill Place at dusk — the house, garden field, first stars | dusk blue, one lit window |

## 2. Full-screen UI art — `assets/ui/` and the finale

All **1280 × 720** (game downscales to fit; keep detail readable at half size).

TODAY YOU ARE MAKING:
 Night field behind Gad's Hill: house silhouette left, open ground right. Keep the **lower-right quarter clear** — the game draws the bonfire, the novelist and the flying letters there (around 62% across, 65% down). 


| File | Content |
|---|---|
| `ui/title.png` | Title screen painting: a top-hatted novelist silhouette seen from behind, facing a small bonfire in a dark field, satchel at his side. Leave the **upper third quiet/dark** — the title text renders there. |
| `ui/parchment.png` | Aged parchment letter sheet filling the frame, subtle ink stains, a red wax seal in the top-right corner. Keep the centre **plain and light** — letter text renders on it (dark ink colour). |
| `ui/book.png` | An open Victorian book / table-of-contents spread, dark leather margins. Keep the page area **plain** — chapter list renders on it. |
| `bg/finale.png` | Night field behind Gad's Hill: house silhouette left, open ground right. Keep the **lower-right quarter clear** — the game draws the bonfire, the novelist and the flying letters there (around 62% across, 65% down). |

## 3. Character sheet — `assets/chars/novelist.png` (later pass)



- Grid of frames, each **24 × 36 px**, on **flat magenta #FF00FF**, laid out in one
  row, left-facing order: idle-1, idle-2, walk-1, walk-2, walk-3, walk-4, jump.
- Top hat, black Victorian coat, brown satchel on the left hip, small beard.
- Consistent silhouette across frames matters more than detail.

## 4. Tilesets — `assets/tiles/act1.png` … `act4.png` (later pass)

- One row of **32 × 32 px** cells on magenta: ground-top, ground-fill, one-way
  platform, water, plus 2–4 themed props (crate/barrel/candle/bones/etc.) at
  32 × 32 or 32 × 64.

Act 4 = snow, marsh peat, railway iron.
- Act 1 = grimy London brick/timber; Act 2 = prison stone / decayed manor;  Act 3 = ship timber / catacomb bone; 

## Suggested generation order

1. `bg/01–10` and `ui/title.png` — biggest visual payoff.
2. `ui/parchment.png`, `ui/book.png`, `bg/finale.png`.
3. Character sheet and tilesets (these need the most cleanup; game integrates
   them in a later code pass).
