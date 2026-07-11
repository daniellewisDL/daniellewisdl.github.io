// UNWRITTEN — optional external art. Every entry is a hook: if the PNG exists
// in assets/ it is used; otherwise the game falls back to its code-drawn art.
// See ASSETS.md for the generation spec (sizes, palettes, filenames).
'use strict';

(function () {
  // key: [path, chromaKey]  — chromaKey knocks out flat magenta (#FF00FF) backgrounds.
  // Character frames and tile cells are pre-keyed by the asset pipeline (alpha
  // already transparent), so they load without keying.
  const MANIFEST = {
    title:     ['assets/ui/title.png', false],
    parchment: ['assets/ui/parchment.png', false],
    book:      ['assets/ui/book.png', false],
    finale:    ['assets/bg/finale.png', false]
  };
  for (let n = 1; n <= 10; n++) MANIFEST['bg' + n] = ['assets/bg/' + (n < 10 ? '0' : '') + n + '.png', false];
  for (const f of ['idle1', 'idle2', 'walk1', 'walk2', 'walk3', 'walk4', 'jump'])
    MANIFEST['nov_' + f] = ['assets/chars/' + f + '.png', false];
  for (let a = 1; a <= 4; a++)
    for (const k of ['ground', 'fill', 'plat', 'water'])
      MANIFEST['tiles' + a + '_' + k] = ['assets/tiles/act' + a + '_' + k + '.png', false];
  for (const k of ['crate', 'barrel', 'candle', 'clock', 'lamp', 'wreath', 'bones', 'reeds'])
    MANIFEST['prop_' + k] = ['assets/props/' + k + '.png', false];

  const A = UW.assets = {
    img: {},
    get(k) { return this.img[k] || null; }
  };

  function chromaKey(img) {
    const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
    const x = c.getContext('2d'); x.drawImage(img, 0, 0);
    try {
      const d = x.getImageData(0, 0, c.width, c.height), p = d.data;
      for (let i = 0; i < p.length; i += 4) {
        if (p[i] > 200 && p[i + 2] > 200 && p[i + 1] < 80) p[i + 3] = 0;
      }
      x.putImageData(d, 0, 0);
    } catch (e) { /* canvas tainted (file://) — use as-is */ }
    return c;
  }

  for (const k in MANIFEST) {
    const src = MANIFEST[k][0], keyed = MANIFEST[k][1];
    const img = new Image();
    img.onload = () => { A.img[k] = keyed ? chromaKey(img) : img; };
    img.onerror = () => { /* not generated yet — code-drawn art covers it */ };
    img.src = src;
  }
})();
