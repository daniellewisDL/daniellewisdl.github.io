// UNWRITTEN — pixel-art sprites, defined as text maps (style of the ideation asset sheets)
'use strict';

UW.PAL = {
  '.': null,
  'h': '#14110d', // hat / near black
  'H': '#332c22', // hat band highlight
  'k': '#231d17', // coat dark
  'K': '#3a3128', // coat highlight
  'f': '#d8a678', // skin
  'F': '#b07d55', // skin shade
  'e': '#4d3826', // hair / beard brown
  'w': '#e6ddc6', // collar white
  'b': '#63452a', // satchel
  'B': '#8a6238', // satchel light
  's': '#0e0c0a', // shoes
  'g': '#cfc5a5', // parchment
  'G': '#b0a583', // parchment shade
  'r': '#9e2b25', // wax seal
  'y': '#e8c357', // glow gold
  'u': '#5a636e', // steel blue (police)
  'U': '#39424d',
  't': '#6e6e6e', // grey
  'T': '#4a4a4a',
  'v': '#dcd8d2', // ghost white
  'V': '#b8b4ae',
  'o': '#7a5533', // wood
  'O': '#9a7245',
  'n': '#54452f', // wood dark
  'm': '#7d7468', // stone
  'i': '#c9b98a'  // candle warm
};

(function () {
  // Build a canvas from rows of palette chars. `sub` remaps chars (recolouring).
  function make(rows, sub) {
    const w = rows[0].length, h = rows.length;
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const x = c.getContext('2d');
    for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
      let ch = rows[j][i];
      if (sub && sub[ch] !== undefined) ch = sub[ch];
      const col = UW.PAL[ch];
      if (col) { x.fillStyle = col; x.fillRect(i, j, 1, 1); }
    }
    return c;
  }
  function flip(cv) {
    const c = document.createElement('canvas'); c.width = cv.width; c.height = cv.height;
    const x = c.getContext('2d');
    x.translate(cv.width, 0); x.scale(-1, 1); x.drawImage(cv, 0, 0);
    return c;
  }

  // ---- The Novelist (12 x 18) --------------------------------------------
  const BODY = [
    '....hhhh....',
    '...hhhhhh...',
    '...hhhhhh...',
    '...hHHHHh...',
    '..hhhhhhhh..',
    '...ffffff...',
    '...feffef...',
    '...fFeeFf...',
    '...wkkkkw...',
    '..kkkkkkkk..',
    '..kKkkkkKk..',
    '.bkkkkkkkkk.',
    '.bBkkkkkkkk.',
    '..bbkkkkkk..'
  ];
  const LEGS = {
    stand: ['...kk..kk...', '...kk..kk...', '...kk..kk...', '..ss....ss..'],
    walkA: ['...kk..kk...', '..kk....kk..', '.kk......kk.', '.ss......ss.'],
    pass:  ['....kkkk....', '....kkkk....', '....kk.kk...', '...ss..ss...'],
    walkB: ['...kk..kk...', '...kk...kk..', '..kk.....kk.', '..ss.....ss.'],
    jump:  ['...kk..kk...', '..kk....kk..', '..k......k..', '..s......s..']
  };
  function figure(legs, sub) { return make(BODY.concat(LEGS[legs]), sub); }

  const S = UW.sprites = {};
  S.novelist = {
    idle: [figure('stand'), figure('stand')],
    walk: [figure('walkA'), figure('pass'), figure('walkB'), figure('pass')],
    jump: figure('jump'),
  };
  // pre-flip everything
  S.novelistL = {
    idle: S.novelist.idle.map(flip),
    walk: S.novelist.walk.map(flip),
    jump: flip(S.novelist.jump),
  };

  // Recolours: the Beadle/bobby (blue coat, no satchel), the Convict (grey, no hat brim change),
  // the Spectral Bride (all pale), academics (brown coat).
  const noSatchel = { b: 'k', B: 'k' };
  const police = Object.assign({ k: 'u', K: 'U', h: 'u', H: 'U', w: 'w' }, noSatchel);
  const convict = Object.assign({ k: 't', K: 'T', h: 't', H: 'T', w: 't' }, noSatchel);
  const bride = Object.assign({ k: 'v', K: 'V', h: 'v', H: 'V', f: 'v', F: 'V', e: 'V', w: 'v', s: 'V' }, noSatchel);
  const academic = Object.assign({ k: 'n', K: 'o' }, noSatchel);
  function figSet(sub) {
    const r = { walk: [figure('walkA', sub), figure('pass', sub), figure('walkB', sub), figure('pass', sub)], idle: [figure('stand', sub)] };
    r.walkL = r.walk.map(flip); r.idleL = r.idle.map(flip);
    return r;
  }
  S.beadle = figSet(police);
  S.convict = figSet(convict);
  S.bride = figSet(bride);
  S.academic = figSet(academic);

  // ---- Rat (10 x 6) -------------------------------------------------------
  const RAT = [
    '..........',
    '.....tt...',
    '..ttttttt.',
    '.tttttttts',
    'T.tt..tt..',
    '..........'
  ];
  S.rat = [make(RAT), make(RAT.map((r, i) => i === 4 ? 'T..tt..tt.' : r))];
  S.ratL = S.rat.map(flip);

  // ---- Letter envelope (12 x 9), cream with red wax seal ------------------
  const ENV = [
    'GGGGGGGGGGGG',
    'GggggggggggG',
    'GgGggggggGgG',
    'GggGggggGggG',
    'GgggGrrGgggG',
    'Gggggrrggggg',
    'Gggggggggggg',
    'GggggggggggG',
    'GGGGGGGGGGGG'
  ];
  S.letter = make(ENV);

  // ---- Props ---------------------------------------------------------------
  S.barrel = make([
    '.oOOOOOOOOo.',
    'onooooooonno',
    'oooooooooooo',
    'nnnnnnnnnnnn',
    'oooooooooooo',
    'oooooooooooo',
    'nnnnnnnnnnnn',
    'oooooooooooo',
    'onooooooonno',
    '.oOOOOOOOOo.'
  ]);
  S.crate = make([
    'nnnnnnnnnnnn',
    'noOOOOOOOOon',
    'noOooooooOon',
    'noOoOOOOoOon',
    'noOooooooOon',
    'noOoOOOOoOon',
    'noOooooooOon',
    'noOOOOOOOOon',
    'nnnnnnnnnnnn',
    'n..........n'
  ].map(r => r.replace(/ /g, '.')));

  S.make = make; S.flip = flip;
})();
