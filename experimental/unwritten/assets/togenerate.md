4. External assets — what I need you to generate
All pixel-art style matching your concept sheets. Two practical notes: no text, no frames/borders in any image, and since Gemini can't do transparency reliably, put anything that needs cutting out on a solid flat magenta (#FF00FF) background — I'll chroma-key it at load time.


CHarles Dickens sideways scrolling videogame
You are a master 2000s game designer, and are tasked with making a high impact visual pixelart style background for a level. 1280*360. VERY ULTRA WIDE
horizon in the upper third, empty-ish lower third where gameplay sits. Muted Victorian palette per act:

Gad's Hill house exterior at twilight, garden field


A. Backgrounds — the highest-impact items. One per kept level, 10 total. Each 1280×360-ish landscape (I'll crop/tile), horizon in the upper third, empty-ish lower third where gameplay sits. Muted Victorian palette per act:

Attic interior — rafters, dusty light shafts, browns
London rooftops at night, chimneys, blood-red moon
Prison yard interior — stone, iron bars, candle amber
Decayed Victorian mansion interior — cobwebs, stopped clocks, spectral teal
Ship deck / sea horizon, masts, grey-blue swell
Catacombs — bone walls, near-black with lantern warmth
Snowy London street at night, glowing windows
Flat Kent marshes at cold dawn, mist, distant hulks
Railway cutting / broken viaduct, overturned carriages, dawn
Gad's Hill house exterior at dusk, garden field
B. Character sheets (each frame on a labeled grid, magenta bg):

The Novelist: top hat, black coat, satchel — idle (2 frames), walk (4), jump (1), at 24×36 px per frame. This is the hardest for image models to keep consistent; if the frames come out inconsistent I'll clean them up or fall back to upscaling the code sprite.
Enemies, ~32×32 each: rat (2 frames), debtor's shadow, spectral bride, ghostly apparition, the Convict with chain, turnkey/beadle.
C. Tiles/props, one sheet per act on magenta: 32×32 ground-top + ground-fill + one-way platform textures, plus themed props (crates, barrels, candles, clocks, bones, reeds, wreaths, lamp posts) at ~32–64 px.

D. UI art: title screen painting (1280×720, novelist silhouette before a small fire, space for the title text I'll render), parchment letter background (~1280×720), and a book/table-of-contents spread for level select.

E. Optional but cheap wins: wax seal icon, envelope sprite, exit gate, gas lamp checkpoint.

Suggested order
I do the engine work first (level cut, shortening, 640×360 + 32px tiles, asset loader with fallbacks) — the game will immediately run at 2× with upscaled code art, so nothing blocks on you.
You generate assets starting with A (backgrounds) and D (title/parchment) — biggest visual payoff, most forgiving of AI-generation quirks.
B and C last; I'll slice, key, and integrate each batch as it arrives, keeping fallbacks for anything that doesn't land.