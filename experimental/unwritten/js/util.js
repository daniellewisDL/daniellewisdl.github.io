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

// Touch controls (mobile) -----------------------------------------
// Left half of the screen: floating stick (drag from where you touch).
// Right half: jump / confirm. Top-right corner: back to the map (Esc).
UW.touch = {
  active: false, stick: null, jumpId: null,
  init(canvas) {
    if (!('ontouchstart' in window)) return;
    const I = UW.input, self = this;
    const pos = t => {
      const r = canvas.getBoundingClientRect();
      return { x: (t.clientX - r.left) / r.width * 320, y: (t.clientY - r.top) / r.height * 180 };
    };
    canvas.addEventListener('touchstart', e => {
      e.preventDefault();
      self.active = true;
      const hint = document.getElementById('hint');
      if (hint) hint.style.display = 'none';
      if (UW.audio) UW.audio.unlock();
      for (const t of e.changedTouches) {
        const p = pos(t);
        if (p.x > 292 && p.y < 36) { I.pressed['Escape'] = true; continue; }
        if (p.x < 160) self.stick = { id: t.identifier, ox: p.x, oy: p.y, x: p.x, y: p.y, dx: 0, dy: 0 };
        else { self.jumpId = t.identifier; I.keys[' '] = true; I.pressed[' '] = true; }
      }
    }, { passive: false });
    canvas.addEventListener('touchmove', e => {
      e.preventDefault();
      for (const t of e.changedTouches) {
        const s = self.stick;
        if (!s || t.identifier !== s.id) continue;
        const p = pos(t);
        s.x = p.x; s.y = p.y;
        const ndx = p.x - s.ox > 7 ? 1 : p.x - s.ox < -7 ? -1 : 0;
        const ndy = p.y - s.oy > 14 ? 1 : p.y - s.oy < -14 ? -1 : 0;
        // edge-triggered presses drive the menus; held keys drive the platforming
        if (ndx !== s.dx) {
          if (ndx === 1) I.pressed['ArrowRight'] = true;
          if (ndx === -1) I.pressed['ArrowLeft'] = true;
        }
        if (ndy !== s.dy) {
          if (ndy === 1) I.pressed['ArrowDown'] = true;
          if (ndy === -1) I.pressed['ArrowUp'] = true;
        }
        s.dx = ndx; s.dy = ndy;
        I.keys['ArrowLeft'] = ndx === -1;
        I.keys['ArrowRight'] = ndx === 1;
      }
    }, { passive: false });
    const end = e => {
      for (const t of e.changedTouches) {
        if (self.stick && t.identifier === self.stick.id) {
          self.stick = null;
          I.keys['ArrowLeft'] = I.keys['ArrowRight'] = false;
        }
        if (t.identifier === self.jumpId) { self.jumpId = null; I.keys[' '] = false; }
      }
    };
    canvas.addEventListener('touchend', end);
    canvas.addEventListener('touchcancel', end);
  },
  // faint on-screen hints, drawn over every scene once a touch has happened
  draw(ctx) {
    if (!this.active) return;
    ctx.lineWidth = 1;
    if (this.stick) {
      ctx.strokeStyle = 'rgba(230,221,198,0.35)';
      ctx.beginPath(); ctx.arc(this.stick.ox, this.stick.oy, 15, 0, 7); ctx.stroke();
      ctx.fillStyle = 'rgba(230,221,198,0.4)';
      const cx = UW.clamp(this.stick.x, this.stick.ox - 12, this.stick.ox + 12);
      const cy = UW.clamp(this.stick.y, this.stick.oy - 12, this.stick.oy + 12);
      ctx.beginPath(); ctx.arc(cx, cy, 6, 0, 7); ctx.fill();
    } else {
      ctx.strokeStyle = 'rgba(230,221,198,0.14)';
      ctx.beginPath(); ctx.arc(38, 144, 14, 0, 7); ctx.stroke();
    }
    const jHeld = this.jumpId !== null && this.jumpId !== undefined;
    ctx.strokeStyle = 'rgba(230,221,198,' + (jHeld ? 0.4 : 0.14) + ')';
    ctx.beginPath(); ctx.arc(284, 144, 14, 0, 7); ctx.stroke();
    ctx.fillStyle = 'rgba(230,221,198,' + (jHeld ? 0.5 : 0.2) + ')';
    ctx.font = '8px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('↑', 284, 144);
    ctx.fillText('☰', 306, 20); // top-right: back to the map
  }
};

// Save -----------------------------------------------------------
UW.save = {
  data: { unlocked: 1, letters: {}, done: {} },
  load() {
    try {
      // v2: the 10-level edition — old 20-level saves are left untouched
      const raw = localStorage.getItem('unwritten.save.v2');
      if (raw) this.data = Object.assign(this.data, JSON.parse(raw));
    } catch (e) { /* private browsing etc. */ }
  },
  write() {
    try { localStorage.setItem('unwritten.save.v2', JSON.stringify(this.data)); } catch (e) {}
  },
  complete(level, letters) {
    this.data.done[level] = true;
    this.data.letters[level] = Math.max(this.data.letters[level] || 0, letters);
    if (level + 1 > this.data.unlocked) this.data.unlocked = Math.min(level + 1, UW.LEVELS.length);
    this.write();
  },
  totalLetters() {
    let n = 0; for (const k in this.data.letters) n += this.data.letters[k];
    return n;
  }
};
