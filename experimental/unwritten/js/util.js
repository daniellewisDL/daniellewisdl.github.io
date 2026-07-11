// UNWRITTEN — utilities
'use strict';
window.UW = window.UW || {};

// Deterministic RNG (mulberry32) so each level generates identically every play.
UW.rng = function (seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

UW.clamp = (v, a, b) => v < a ? a : (v > b ? b : v);
UW.lerp = (a, b, t) => a + (b - a) * t;

// Tiny helpers for colour math (hex <-> rgb, mix).
UW.hex2rgb = function (h) {
  h = h.replace('#', '');
  return [parseInt(h.substr(0, 2), 16), parseInt(h.substr(2, 2), 16), parseInt(h.substr(4, 2), 16)];
};
UW.mix = function (h1, h2, t) {
  const a = UW.hex2rgb(h1), b = UW.hex2rgb(h2);
  const c = a.map((v, i) => Math.round(UW.lerp(v, b[i], t)));
  return 'rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')';
};

// Input ----------------------------------------------------------
UW.input = {
  keys: {}, pressed: {},
  // Normalize: prefer e.key, fall back to e.code (some drivers/automation send key="").
  _norm(e) {
    if (e.key && e.key !== 'Unidentified') return e.key;
    const c = e.code || '';
    if (c === 'Space') return ' ';
    if (c.startsWith('Key')) return c.slice(3).toLowerCase();
    return c; // 'Enter', 'ArrowLeft', 'Escape', ...
  },
  init() {
    addEventListener('keydown', e => {
      const k = this._norm(e);
      if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown',' '].includes(k)) e.preventDefault();
      if (!this.keys[k]) this.pressed[k] = true;
      this.keys[k] = true;
      if (UW.audio) UW.audio.unlock();
      if ((k === 'm' || k === 'M') && UW.audio) UW.audio.toggleMute();
    });
    addEventListener('keyup', e => { this.keys[this._norm(e)] = false; });
  },
  left()  { return this.keys['ArrowLeft'] || this.keys['a'] || this.keys['A']; },
  right() { return this.keys['ArrowRight'] || this.keys['d'] || this.keys['D']; },
  jumpHeld() { return this.keys[' '] || this.keys['ArrowUp'] || this.keys['w'] || this.keys['W'] || this.keys['z'] || this.keys['Z']; },
  jumpPressed() { return this.pressed[' '] || this.pressed['ArrowUp'] || this.pressed['w'] || this.pressed['W'] || this.pressed['z'] || this.pressed['Z']; },
  confirm() { return this.pressed['Enter'] || this.pressed[' ']; },
  back() { return this.pressed['Escape']; },
  endFrame() { this.pressed = {}; }
};

// Save -----------------------------------------------------------
UW.save = {
  data: { unlocked: 1, letters: {}, done: {} },
  load() {
    try {
      const raw = localStorage.getItem('unwritten.save');
      if (raw) this.data = Object.assign(this.data, JSON.parse(raw));
    } catch (e) { /* private browsing etc. */ }
  },
  write() {
    try { localStorage.setItem('unwritten.save', JSON.stringify(this.data)); } catch (e) {}
  },
  complete(level, letters) {
    this.data.done[level] = true;
    this.data.letters[level] = Math.max(this.data.letters[level] || 0, letters);
    if (level + 1 > this.data.unlocked) this.data.unlocked = Math.min(level + 1, 20);
    this.write();
  },
  totalLetters() {
    let n = 0; for (const k in this.data.letters) n += this.data.letters[k];
    return n;
  }
};
