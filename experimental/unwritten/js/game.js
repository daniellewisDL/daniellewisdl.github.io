// UNWRITTEN — scenes, world, rendering
'use strict';

(function () {
  const T = UW.TILE, TS = 16, VW = 320, VH = 180;

  // ======================= WORLD (one level in play) =======================
  UW.World = class {
    constructor(lv) {
      this.lv = lv;
      this.pal = UW.palFor(lv);
      this.gen = UW.genLevel(lv);
      this.player = new UW.Player(3 * TS, (this.gen.groundY[3]) * TS);
      this.cam = { x: 0, y: 0 };
      this.t = 0;
      this.letters = this.gen.letters.map(l => ({ x: l.x * TS + 8, y: l.y * TS + 8, got: false, t: Math.random() * 6 }));
      this.got = 0;
      this.checkpoint = { x: this.player.x, y: this.player.y };
      this.enemies = this.gen.spawns.map(s => new UW.Enemy(s.kind, s.x, s.y, this));
      this.crumbled = {}; this.crumbleTimers = {};
      this.groundTrail = [];
      this.trail = []; // for the Ghost of the Unfinished
      this.done = false; this.exitOpen = false;
      this.tilt = 0;
      this.particles = [];
      this.scroll = 0; // autoscroll camera x
      this._buildBackdrop();
      UW.audio.play(lv.music);
    }

    crumbleTouch(i, j) {
      const key = j * this.gen.W + i;
      if (this.crumbleTimers[key] === undefined) this.crumbleTimers[key] = 0.6;
    }
    respawn() {
      const p = this.player;
      // return to solid footing a few steps back (never a Game Over — just a stumble)
      let spot = this.lastGround || this.checkpoint;
      const gt = this.groundTrail;
      for (let i = gt.length - 1; i >= 0; i--) {
        if (Math.abs(gt[i].x - spot.x) >= 40) { spot = gt[i]; break; }
      }
      p.x = spot.x; p.y = spot.y - 2;
      p.vx = 0; p.vy = 0; p.dim = 1.2; p.slow = 0; p.hold = 0; p.kbx = 0;
      UW.audio.sfx('bump');
    }

    update(dt) {
      this.t += dt;
      const p = this.player, lv = this.lv;
      // ship tilt: gravity leans
      if (lv.tilt) {
        this.tilt = Math.sin(this.t * 0.7) * 0.07;
        p.vx += Math.sin(this.t * 0.7) * 46 * dt;
      }
      p.update(dt, this);
      this.trail.push({ x: p.x, y: p.y });
      if (this.trail.length > 320) this.trail.shift();

      for (const e of this.enemies) e.update(dt, p);

      // crumbling boards
      for (const k in this.crumbleTimers) {
        this.crumbleTimers[k] -= dt;
        if (this.crumbleTimers[k] <= 0 && !this.crumbled[k]) { this.crumbled[k] = true; UW.audio.sfx('bump'); }
      }

      // letters
      for (const L of this.letters) {
        L.t += dt;
        if (!L.got && Math.abs(p.x - L.x) < 10 && Math.abs((p.y - 9) - L.y) < 14) {
          L.got = true; this.got++; UW.audio.sfx('letter');
          if (this.got >= this.letters.length) { this.exitOpen = true; UW.audio.sfx('gate'); }
        }
      }
      // On the auto-scrolling crash you cannot go back — save what you can, the gate opens.
      if (!this.exitOpen && (this.got >= this.letters.length || lv.autoscroll)) this.exitOpen = true;

      // checkpoints
      for (const c of this.gen.checkpoints) {
        const cx = c.x * TS + 8, cy = c.y * TS;
        if (!c.hit && Math.abs(p.x - cx) < 10 && Math.abs(p.y - cy) < 20) {
          c.hit = true; this.checkpoint = { x: cx, y: cy }; UW.audio.sfx('checkpoint');
        }
      }

      // exit
      const ex = this.gen.exit.x * TS + 8, ey = this.gen.exit.y * TS;
      if (this.exitOpen && Math.abs(p.x - ex) < 10 && Math.abs(p.y - ey) < 22) this.done = true;

      // camera
      if (lv.autoscroll) {
        this.scroll = Math.min(this.scroll + lv.autoscroll * dt, this.gen.W * TS - VW);
        this.cam.x = this.scroll;
        // nudge the player along, never punish
        if (p.x < this.cam.x + 14) { p.x = this.cam.x + 14; p.vx = Math.max(p.vx, 30); }
        if (this.cam.x > this.gen.W * TS - VW) this.cam.x = this.gen.W * TS - VW;
      } else {
        this.cam.x = UW.clamp(p.x - VW / 2, 0, this.gen.W * TS - VW);
      }
      this.cam.y = UW.clamp(p.y - VH * 0.62, 0, this.gen.H * TS - VH);

      // ambient particles
      this._particles(dt);
    }

    _particles(dt) {
      const lv = this.lv, P = this.particles;
      const want = lv.snow ? (lv.snow === 2 ? 90 : 50) : lv.embers ? 40 : 0;
      while (P.length < want) {
        P.push({ x: this.cam.x + Math.random() * VW, y: this.cam.y + Math.random() * VH, v: 10 + Math.random() * 20, ph: Math.random() * 7 });
      }
      for (const q of P) {
        if (lv.embers) { q.y -= q.v * dt; q.x += Math.sin(this.t * 2 + q.ph) * 12 * dt; }
        else { q.y += q.v * dt; q.x += Math.sin(this.t + q.ph) * 8 * dt; }
        if (q.y > this.cam.y + VH) q.y = this.cam.y - 4;
        if (q.y < this.cam.y - 8) q.y = this.cam.y + VH;
        if (q.x < this.cam.x - 8) q.x += VW + 16; if (q.x > this.cam.x + VW + 8) q.x -= VW + 16;
      }
    }

    // ---------- rendering --------------------------------------------------
    _buildBackdrop() {
      const lv = this.lv, pal = this.pal, rnd = UW.rng(lv.n * 331 + 7);
      // far layer: sky gradient + celestial + distant skyline (static)
      const far = document.createElement('canvas'); far.width = VW; far.height = VH;
      const f = far.getContext('2d');
      const g = f.createLinearGradient(0, 0, 0, VH);
      if (lv.sunset) { g.addColorStop(0, '#332b3e'); g.addColorStop(0.55, '#7a4a48'); g.addColorStop(1, '#c8825c'); }
      else if (lv.redmoon) { g.addColorStop(0, '#1c1216'); g.addColorStop(1, '#4a2a28'); }
      else { g.addColorStop(0, pal.skyA); g.addColorStop(1, pal.skyB); }
      f.fillStyle = g; f.fillRect(0, 0, VW, VH);
      if (!lv.indoor) {
        // moon / sun
        f.fillStyle = lv.redmoon ? '#b84438' : (lv.sunset ? '#e8b070' : '#d8d2bc');
        f.beginPath(); f.arc(252, 38, lv.redmoon ? 14 : 10, 0, 7); f.fill();
        if (!lv.sunset) { f.fillStyle = g; } // keep it simple
        // distant skyline
        f.fillStyle = 'rgba(20,18,20,0.55)';
        let x = 0;
        while (x < VW) {
          const w = 14 + rnd() * 26, h = 30 + rnd() * 50;
          f.fillRect(x, VH - 60 - h * 0.5, w, h + 60);
          if (rnd() < 0.4) f.fillRect(x + w * 0.3, VH - 66 - h * 0.5, 3, 8); // chimney/spire
          x += w + rnd() * 10;
        }
      } else {
        // indoor: vast wall with arches / shelves hinted, softly candle-lit
        f.fillStyle = 'rgba(255,235,190,0.05)';
        for (let i = 0; i < 8; i++) f.fillRect(20 + i * 40, 20, 22, VH);
        const warm = f.createRadialGradient(VW / 2, VH * 0.55, 30, VW / 2, VH * 0.55, 190);
        warm.addColorStop(0, 'rgba(255,220,150,0.07)'); warm.addColorStop(1, 'rgba(0,0,0,0)');
        f.fillStyle = warm; f.fillRect(0, 0, VW, VH);
      }
      this.far = far;

      // mid layer: repeating strip, parallax 0.4
      const mid = document.createElement('canvas'); mid.width = 640; mid.height = VH;
      const m = mid.getContext('2d');
      m.fillStyle = 'rgba(12,10,12,0.7)';
      let x2 = 0;
      const kind = lv.theme;
      while (x2 < 640) {
        const w = 24 + rnd() * 40, h = 40 + rnd() * 60;
        m.fillRect(x2, VH - h, w, h);
        // windows glow
        if (!lv.indoor && rnd() < 0.8) {
          m.fillStyle = 'rgba(220,180,90,0.5)';
          for (let wy = VH - h + 6; wy < VH - 12; wy += 12)
            for (let wx = x2 + 4; wx < x2 + w - 6; wx += 10)
              if (rnd() < 0.3) m.fillRect(wx, wy, 3, 4);
          m.fillStyle = 'rgba(12,10,12,0.7)';
        }
        if (kind === 'rooftops' || kind === 'xmas') { m.fillRect(x2 + w * 0.4, VH - h - 10, 5, 10); }
        x2 += w + 6 + rnd() * 20;
      }
      this.mid = mid;
    }

    draw(ctx) {
      const lv = this.lv, pal = this.pal, cam = this.cam, gen = this.gen;
      ctx.save();
      if (lv.tilt) { ctx.translate(VW / 2, VH / 2); ctx.rotate(this.tilt); ctx.translate(-VW / 2, -VH / 2); }

      ctx.drawImage(this.far, 0, 0);
      // mid parallax
      const mx = -Math.floor((cam.x * 0.4) % 640);
      ctx.drawImage(this.mid, mx, 0); ctx.drawImage(this.mid, mx + 640, 0);

      // tiles
      const i0 = Math.floor(cam.x / TS), i1 = Math.min(gen.W - 1, i0 + VW / TS + 1);
      const j0 = Math.floor(cam.y / TS), j1 = Math.min(gen.H - 1, j0 + VH / TS + 1);
      for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) {
        const t = gen.map[j][i];
        if (!t) continue;
        const X = i * TS - Math.round(cam.x), Y = j * TS - Math.round(cam.y);
        if (t === T.SOLID) {
          const top = j === 0 || gen.map[j - 1][i] === T.AIR || gen.map[j - 1][i] === T.WATER;
          ctx.fillStyle = pal.ground; ctx.fillRect(X, Y, TS, TS);
          if (top) { ctx.fillStyle = pal.ground2; ctx.fillRect(X, Y, TS, 3); }
          if ((i * 7 + j * 13) % 5 === 0) { ctx.fillStyle = 'rgba(0,0,0,0.15)'; ctx.fillRect(X + 3, Y + 6, 6, 3); } // brick hint
        } else if (t === T.PLAT) {
          ctx.fillStyle = pal.plat; ctx.fillRect(X, Y, TS, 4);
          ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.fillRect(X, Y + 3, TS, 1);
        } else if (t === T.WATER) {
          ctx.fillStyle = pal.water; ctx.fillRect(X, Y, TS, TS);
          ctx.fillStyle = 'rgba(255,255,255,0.12)';
          ctx.fillRect(X + ((this.t * 20 + i * 5) % 16) - 4, Y + 1, 5, 1);
        } else if (t === T.CRUMBLE) {
          const key = j * gen.W + i;
          if (this.crumbled[key]) continue;
          const shake = this.crumbleTimers[key] !== undefined ? Math.sin(this.t * 40) * 1 : 0;
          ctx.fillStyle = '#5a4630'; ctx.fillRect(X + shake, Y, TS, 5);
          ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.fillRect(X + shake, Y + 4, TS, 1);
        }
      }

      // props (behind actors)
      for (const pr of gen.props) this._drawProp(ctx, pr);

      // checkpoints: gas lamps
      for (const c of gen.checkpoints) {
        const X = Math.round(c.x * TS + 8 - cam.x), Y = Math.round(c.y * TS - cam.y);
        ctx.fillStyle = '#1c1a18'; ctx.fillRect(X - 1, Y - 26, 2, 26);
        ctx.fillStyle = c.hit ? '#ffd870' : '#8a8060';
        ctx.fillRect(X - 3, Y - 31, 6, 6);
        if (c.hit) {
          const gl = ctx.createRadialGradient(X, Y - 28, 1, X, Y - 28, 18);
          gl.addColorStop(0, 'rgba(255,216,112,0.35)'); gl.addColorStop(1, 'rgba(255,216,112,0)');
          ctx.fillStyle = gl; ctx.fillRect(X - 18, Y - 46, 36, 36);
        }
      }

      // exit gate
      {
        const ex = gen.exit, X = Math.round(ex.x * TS + 8 - cam.x), Y = Math.round(ex.y * TS - cam.y);
        ctx.fillStyle = '#241e18'; ctx.fillRect(X - 8, Y - 26, 16, 26);
        ctx.fillStyle = this.exitOpen ? '#e8c357' : '#3c342a';
        ctx.fillRect(X - 6, Y - 24, 12, 22);
        if (this.exitOpen) {
          const gl = ctx.createRadialGradient(X, Y - 12, 2, X, Y - 12, 26);
          gl.addColorStop(0, 'rgba(232,195,87,0.4)'); gl.addColorStop(1, 'rgba(232,195,87,0)');
          ctx.fillStyle = gl; ctx.fillRect(X - 26, Y - 38, 52, 52);
        } else {
          ctx.fillStyle = '#241e18';
          ctx.fillRect(X - 6, Y - 16, 12, 2); ctx.fillRect(X - 1, Y - 24, 2, 22);
          if (Math.abs(this.player.x - (ex.x * TS + 8)) < 48) {
            ctx.textAlign = 'center'; ctx.font = '7px Georgia, serif';
            ctx.fillStyle = 'rgba(207,197,165,0.8)';
            ctx.fillText('the satchel is not yet full', X, Y - 34);
          }
        }
      }

      // letters
      for (const L of this.letters) {
        if (L.got) continue;
        const X = Math.round(L.x - cam.x), Y = Math.round(L.y - cam.y + Math.sin(L.t * 2) * 2);
        const gl = ctx.createRadialGradient(X, Y, 1, X, Y, 14);
        gl.addColorStop(0, 'rgba(232,195,87,0.4)'); gl.addColorStop(1, 'rgba(232,195,87,0)');
        ctx.fillStyle = gl; ctx.fillRect(X - 14, Y - 14, 28, 28);
        ctx.drawImage(UW.sprites.letter, X - 6, Y - 4);
      }

      for (const e of this.enemies) e.draw(ctx, cam);
      this.player.draw(ctx, cam);

      // particles (snow / embers)
      if (this.particles.length) {
        ctx.fillStyle = lv.embers ? 'rgba(240,140,60,0.8)' : 'rgba(235,235,240,0.8)';
        for (const q of this.particles) ctx.fillRect(Math.round(q.x - cam.x), Math.round(q.y - cam.y), lv.snow === 2 ? 2 : 1, lv.snow === 2 ? 2 : 1);
      }

      ctx.restore();

      this._overlays(ctx);
      this._hud(ctx);
    }

    _drawProp(ctx, pr) {
      const cam = this.cam;
      const X = Math.round(pr.x * TS + 8 - cam.x), Y = Math.round((pr.y + 1) * TS - cam.y);
      if (X < -30 || X > VW + 30) return;
      const S = UW.sprites;
      switch (pr.kind) {
        case 'barrel': ctx.drawImage(S.barrel, X - 6, Y - 10); break;
        case 'crate': ctx.drawImage(S.crate, X - 6, Y - 10); break;
        case 'candle': {
          ctx.fillStyle = '#c9b98a'; ctx.fillRect(X - 1, Y - 8, 2, 8);
          ctx.fillStyle = '#ffd870'; ctx.fillRect(X - 1, Y - 10 + Math.sin(this.t * 9 + X) * 0.8, 2, 2);
          break;
        }
        case 'books': {
          ctx.fillStyle = '#5a3a28'; ctx.fillRect(X - 7, Y - 4, 14, 4);
          ctx.fillStyle = '#7a5238'; ctx.fillRect(X - 5, Y - 8, 10, 4);
          ctx.fillStyle = '#46422e'; ctx.fillRect(X - 3, Y - 11, 7, 3);
          break;
        }
        case 'chimney': { ctx.fillStyle = '#3a2e28'; ctx.fillRect(X - 4, Y - 14, 8, 14); ctx.fillStyle = '#241c18'; ctx.fillRect(X - 5, Y - 16, 10, 3); break; }
        case 'lamp': {
          ctx.fillStyle = '#1c1a18'; ctx.fillRect(X - 1, Y - 22, 2, 22);
          ctx.fillStyle = '#ffd870'; ctx.fillRect(X - 3, Y - 26, 6, 5);
          break;
        }
        case 'clock': {
          ctx.fillStyle = '#4a3424'; ctx.fillRect(X - 4, Y - 22, 8, 22);
          ctx.fillStyle = '#c8b888'; ctx.beginPath(); ctx.arc(X, Y - 17, 3, 0, 7); ctx.fill();
          break;
        }
        case 'cage': { ctx.strokeStyle = '#6a5a40'; ctx.strokeRect(X - 3, Y - 26, 6, 8); ctx.beginPath(); ctx.moveTo(X, Y - 26); ctx.lineTo(X, Y - 30); ctx.stroke(); break; }
        case 'bench': { ctx.fillStyle = '#4a3a28'; ctx.fillRect(X - 8, Y - 5, 16, 2); ctx.fillRect(X - 7, Y - 3, 2, 3); ctx.fillRect(X + 5, Y - 3, 2, 3); break; }
        case 'bars': { ctx.fillStyle = '#26242a'; for (let i = -6; i <= 6; i += 4) ctx.fillRect(X + i, Y - 24, 2, 24); break; }
        case 'bones': { ctx.fillStyle = '#b8ab8a'; ctx.fillRect(X - 6, Y - 3, 12, 3); ctx.fillRect(X - 4, Y - 6, 8, 3); ctx.fillRect(X - 2, Y - 8, 4, 2); break; }
        case 'pillar': { ctx.fillStyle = '#8a8078'; ctx.fillRect(X - 3, Y - 30, 6, 30); ctx.fillRect(X - 5, Y - 32, 10, 3); break; }
        case 'gondola': { ctx.fillStyle = '#1a1614'; ctx.beginPath(); ctx.moveTo(X - 10, Y - 3); ctx.quadraticCurveTo(X, Y + 2, X + 10, Y - 3); ctx.lineTo(X + 7, Y); ctx.lineTo(X - 7, Y); ctx.fill(); break; }
        case 'furnace': {
          ctx.fillStyle = '#3a3230'; ctx.fillRect(X - 7, Y - 14, 14, 14);
          ctx.fillStyle = '#e07830'; ctx.fillRect(X - 4, Y - 9 + Math.sin(this.t * 6) * 0.5, 8, 6);
          break;
        }
        case 'gear': {
          ctx.fillStyle = '#50565e'; ctx.beginPath(); ctx.arc(X, Y - 8, 6, 0, 7); ctx.fill();
          ctx.fillStyle = this.pal.ground; ctx.beginPath(); ctx.arc(X, Y - 8, 2, 0, 7); ctx.fill();
          break;
        }
        case 'grate': { ctx.fillStyle = '#1a1a1e'; ctx.fillRect(X - 5, Y - 10, 10, 10); ctx.fillStyle = '#000'; for (let i = -3; i <= 3; i += 3) ctx.fillRect(X + i, Y - 9, 1, 8); break; }
        case 'reeds': { ctx.strokeStyle = '#4a4a2e'; for (let i = -4; i <= 4; i += 2) { ctx.beginPath(); ctx.moveTo(X + i, Y); ctx.lineTo(X + i + Math.sin(this.t + i) * 2, Y - 8 - (i % 3) * 2); ctx.stroke(); } break; }
        case 'post': { ctx.fillStyle = '#3a3228'; ctx.fillRect(X - 1, Y - 12, 3, 12); break; }
        case 'wheel': { ctx.strokeStyle = '#3a3a40'; ctx.beginPath(); ctx.arc(X, Y - 5, 5, 0, 7); ctx.stroke(); break; }
        case 'debris': { ctx.fillStyle = '#46423c'; ctx.fillRect(X - 6, Y - 3, 12, 3); ctx.fillRect(X - 2, Y - 6, 6, 3); break; }
        case 'mast': { ctx.fillStyle = '#4a3a28'; ctx.fillRect(X - 1, Y - 40, 3, 40); ctx.fillStyle = '#c8beA8'; ctx.fillRect(X + 2, Y - 38, 12, 8); break; }
        case 'cake': {
          ctx.fillStyle = '#cfc5a5'; ctx.fillRect(X - 8, Y - 6, 16, 6); ctx.fillRect(X - 5, Y - 10, 10, 4); ctx.fillRect(X - 3, Y - 13, 6, 3);
          ctx.fillStyle = 'rgba(180,170,150,0.5)'; ctx.fillRect(X - 8, Y - 14, 3, 14); // cobweb drape
          break;
        }
        case 'cobweb': { ctx.strokeStyle = 'rgba(220,220,220,0.25)'; ctx.beginPath(); ctx.moveTo(X - 6, Y - 26); ctx.lineTo(X + 2, Y - 18); ctx.moveTo(X + 2, Y - 26); ctx.lineTo(X - 3, Y - 19); ctx.stroke(); break; }
        case 'wreath': { ctx.strokeStyle = '#3a5a2e'; ctx.beginPath(); ctx.arc(X, Y - 18, 4, 0, 7); ctx.stroke(); ctx.fillStyle = '#a03030'; ctx.fillRect(X - 1, Y - 15, 2, 2); break; }
        case 'bowl': { ctx.fillStyle = '#8a8078'; ctx.fillRect(X - 3, Y - 2, 6, 2); ctx.fillStyle = '#b0a583'; ctx.fillRect(X - 2, Y - 3, 4, 1); break; }
        case 'press': { ctx.fillStyle = '#2e2c33'; ctx.fillRect(X - 8, Y - 16, 16, 16); ctx.fillStyle = '#50565e'; ctx.fillRect(X - 6, Y - 12, 12, 3); break; }
        case 'ladder': { ctx.strokeStyle = '#6a5a40'; ctx.beginPath(); ctx.moveTo(X - 3, Y); ctx.lineTo(X - 3, Y - 28); ctx.moveTo(X + 3, Y); ctx.lineTo(X + 3, Y - 28); for (let yy = Y - 4; yy > Y - 28; yy -= 5) { ctx.moveTo(X - 3, yy); ctx.lineTo(X + 3, yy); } ctx.stroke(); break; }
        case 'bollard': { ctx.fillStyle = '#2e2c30'; ctx.fillRect(X - 2, Y - 7, 5, 7); ctx.fillRect(X - 3, Y - 8, 7, 2); break; }
        case 'desk': { ctx.fillStyle = '#4a3424'; ctx.fillRect(X - 8, Y - 8, 16, 2); ctx.fillRect(X - 7, Y - 6, 2, 6); ctx.fillRect(X + 5, Y - 6, 2, 6); ctx.fillStyle = '#cfc5a5'; ctx.fillRect(X - 3, Y - 10, 6, 2); break; }
        case 'chair': { ctx.fillStyle = '#4a3424'; ctx.fillRect(X - 3, Y - 6, 7, 2); ctx.fillRect(X - 3, Y - 12, 2, 8); ctx.fillRect(X + 3, Y - 4, 2, 4); break; }
      }
    }

    _overlays(ctx) {
      const lv = this.lv, p = this.player;
      // fog banks
      if (lv.fog) {
        const fx = (this.t * 12) % (VW * 2);
        ctx.fillStyle = 'rgba(' + UW.hex2rgb(this.pal.fog).join(',') + ',0.22)';
        for (let i = -1; i < 3; i++) {
          const bx = i * 220 - fx * 0.5, by = 60 + Math.sin(this.t * 0.4 + i * 2) * 18;
          ctx.beginPath(); ctx.ellipse(bx + 160, by + 60, 150, 34, 0, 0, 7); ctx.fill();
        }
      }
      // darkness + lantern
      const dark = lv.dark === true ? 1 : (lv.dark || 0);
      if (dark) {
        const px = p.x - this.cam.x, py = p.y - 10 - this.cam.y;
        const r = 55 + Math.sin(this.t * 9) * 3 + Math.sin(this.t * 23) * 2;
        const g = ctx.createRadialGradient(px, py, r * 0.35, px, py, r);
        g.addColorStop(0, 'rgba(6,5,8,0)');
        g.addColorStop(1, 'rgba(6,5,8,' + (0.94 * dark) + ')');
        ctx.fillStyle = g; ctx.fillRect(0, 0, VW, VH);
      }
      // phantom dimming: drain colour and light
      if (p.dim > 0) {
        ctx.fillStyle = 'rgba(10,10,14,' + Math.min(0.55, p.dim * 0.35) + ')';
        ctx.fillRect(0, 0, VW, VH);
      }
      // red tape / paper flutter obscuring
      if (p.obscure > 0) {
        ctx.fillStyle = 'rgba(216,207,174,0.9)';
        for (let i = 0; i < 26; i++) {
          const a = this.t * 4 + i * 1.7;
          ctx.fillRect((Math.sin(a) * 0.5 + 0.5) * VW, ((a * 37) % VH), 10, 6);
        }
      }
      // slow-time tint
      if (p.timeSlow > 0) { ctx.fillStyle = 'rgba(160,150,110,0.12)'; ctx.fillRect(0, 0, VW, VH); }
      // gentle vignette always
      const v = ctx.createRadialGradient(VW / 2, VH / 2, 70, VW / 2, VH / 2, 200);
      v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,0.22)');
      ctx.fillStyle = v; ctx.fillRect(0, 0, VW, VH);
    }

    _hud(ctx) {
      ctx.fillStyle = 'rgba(10,8,8,0.55)';
      ctx.fillRect(0, 0, VW, 12);
      ctx.fillStyle = '#cfc5a5';
      ctx.font = '7px monospace'; ctx.textBaseline = 'middle';
      ctx.textAlign = 'left';
      ctx.fillText((this.lv.n < 10 ? '0' : '') + this.lv.n + '  ' + this.lv.name.toUpperCase(), 4, 7);
      // letters
      ctx.textAlign = 'right';
      ctx.fillText('LETTERS ' + this.got + '/' + this.letters.length, VW - 4, 7);
      ctx.textAlign = 'left';
      if (!this.exitOpen && this.got === this.letters.length - 1) {
        // hint sparkle omitted; keep clean
      }
    }
  };

  // ======================= SCENES ==========================================
  const game = UW.game = { scene: null, ctx: null, t: 0 };

  function serif(ctx, size) { ctx.font = size + 'px Georgia, serif'; }
  function mono(ctx, size) { ctx.font = size + 'px monospace'; }

  // ---- Title ----
  game.title = {
    enter() { UW.audio.play('title'); this.t = 0; },
    update(dt) {
      this.t += dt;
      if (UW.input.confirm()) { UW.audio.sfx('page'); game.go(game.select); }
    },
    draw(ctx) {
      const g = ctx.createLinearGradient(0, 0, 0, VH);
      g.addColorStop(0, '#17130f'); g.addColorStop(1, '#2e2620');
      ctx.fillStyle = g; ctx.fillRect(0, 0, VW, VH);
      // drifting fog
      ctx.fillStyle = 'rgba(120,112,96,0.08)';
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.ellipse(((this.t * 8 + i * 130) % (VW + 200)) - 100, 120 + i * 18, 130, 26, 0, 0, 7);
        ctx.fill();
      }
      // candle
      ctx.fillStyle = '#c9b98a'; ctx.fillRect(VW / 2 - 1, 118, 3, 10);
      ctx.fillStyle = '#ffd870'; ctx.fillRect(VW / 2 - 1, 114 + Math.sin(this.t * 8) * 1, 3, 4);
      const gl = ctx.createRadialGradient(VW / 2, 116, 2, VW / 2, 116, 40);
      gl.addColorStop(0, 'rgba(255,216,112,0.25)'); gl.addColorStop(1, 'rgba(255,216,112,0)');
      ctx.fillStyle = gl; ctx.fillRect(VW / 2 - 40, 76, 80, 80);

      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillStyle = '#e6ddc6'; serif(ctx, 30);
      ctx.fillText('UNWRITTEN', VW / 2, 56);
      ctx.fillStyle = '#8a8270'; serif(ctx, 9);
      ctx.fillText('a novelist, a satchel of letters, a bonfire', VW / 2, 78);
      if (Math.floor(this.t * 1.5) % 2 === 0) {
        ctx.fillStyle = '#cfc5a5'; mono(ctx, 8);
        ctx.fillText('PRESS ENTER', VW / 2, 150);
      }
      ctx.fillStyle = '#5a5248'; mono(ctx, 7);
      ctx.fillText('London, 1860', VW / 2, 168);
    }
  };

  // ---- Level select: the four Acts as chapters ----
  const ACT_NAMES = ['I · The Grimy Heart of London', 'II · Institutions & Ghosts', 'III · The Novelist Abroad', 'IV · The Return & The Reckoning'];
  game.select = {
    enter() { this.sel = UW.save.data.unlocked; this.sel = Math.min(this.sel, 20); UW.audio.play('title'); },
    update(dt) {
      const I = UW.input;
      if (I.pressed['ArrowLeft'] || I.pressed['a']) this.sel = Math.max(1, this.sel - 1);
      if (I.pressed['ArrowRight'] || I.pressed['d']) this.sel = Math.min(20, this.sel + 1);
      if (I.pressed['ArrowUp'] || I.pressed['w']) this.sel = Math.max(1, this.sel - 5);
      if (I.pressed['ArrowDown'] || I.pressed['s']) this.sel = Math.min(20, this.sel + 5);
      if (I.confirm()) {
        if (this.sel <= UW.save.data.unlocked) {
          UW.audio.sfx('page');
          game.play.start(this.sel); game.go(game.play);
        } else UW.audio.sfx('bump');
      }
      if (I.back()) game.go(game.title);
    },
    draw(ctx) {
      ctx.fillStyle = '#1a1611'; ctx.fillRect(0, 0, VW, VH);
      // parchment page
      ctx.fillStyle = '#2a241c'; ctx.fillRect(8, 6, VW - 16, VH - 12);
      ctx.strokeStyle = '#463c2c'; ctx.strokeRect(8.5, 6.5, VW - 17, VH - 13);
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillStyle = '#cfc5a5'; serif(ctx, 12);
      ctx.fillText('— Table of Contents —', VW / 2, 17);
      const total = UW.save.totalLetters();
      mono(ctx, 7); ctx.fillStyle = '#8a8270';
      ctx.fillText(total + ' of 95 letters recovered', VW / 2, 28);

      for (let a = 0; a < 4; a++) {
        const y0 = 40 + a * 33;
        ctx.textAlign = 'left';
        serif(ctx, 8); ctx.fillStyle = '#9a8f74';
        ctx.fillText('Act ' + ACT_NAMES[a], 16, y0);
        for (let k = 0; k < 5; k++) {
          const n = a * 5 + k + 1;
          const lv = UW.LEVELS[n - 1];
          const x = 16 + k * 58, y = y0 + 13;
          const unlocked = n <= UW.save.data.unlocked;
          const seld = n === this.sel;
          ctx.fillStyle = seld ? '#3c3222' : '#241f17';
          ctx.fillRect(x, y - 6, 54, 15);
          if (seld) { ctx.strokeStyle = '#e8c357'; ctx.strokeRect(x + 0.5, y - 5.5, 53, 14); }
          mono(ctx, 6);
          ctx.fillStyle = unlocked ? (seld ? '#e6ddc6' : '#a89c80') : '#4c443a';
          const nm = lv.name.length > 15 ? lv.name.slice(0, 14) + '…' : lv.name;
          ctx.fillText((n < 10 ? '0' : '') + n + ' ' + (unlocked ? nm : '· · ·'), x + 3, y + 1);
          if (UW.save.data.done[n]) { ctx.fillStyle = '#9e2b25'; ctx.beginPath(); ctx.arc(x + 49, y - 1, 2.5, 0, 7); ctx.fill(); }
        }
      }
      ctx.textAlign = 'center'; mono(ctx, 7); ctx.fillStyle = '#5a5248';
      ctx.fillText('arrows: choose · enter: begin · esc: title', VW / 2, VH - 10);
    }
  };

  // ---- Play ----
  game.play = {
    start(n) { this.n = n; this.world = new UW.World(UW.LEVELS[n - 1]); },
    update(dt) {
      this.world.update(dt);
      if (UW.input.back()) { UW.audio.play('title'); game.go(game.select); return; }
      if (this.world.done) {
        UW.save.complete(this.n, this.world.got);
        if (this.n === 20) { game.finale.start(); game.go(game.finale); }
        else { game.letter.start(this.n); game.go(game.letter); }
      }
    },
    draw(ctx) { this.world.draw(ctx); }
  };

  // ---- Letter cutscene ----
  game.letter = {
    start(n) {
      this.n = n; this.t = 0; this.chars = 0;
      this.L = UW.LETTERS[n];
      UW.audio.sfx('page');
      this.lines = this._wrap(this.L.text, 52);
    },
    _wrap(text, w) {
      const words = text.split(' '), lines = []; let cur = '';
      for (const wd of words) {
        if ((cur + ' ' + wd).trim().length > w) { lines.push(cur.trim()); cur = wd; }
        else cur += ' ' + wd;
      }
      if (cur.trim()) lines.push(cur.trim());
      return lines;
    },
    update(dt) {
      this.t += dt; this.chars += dt * 60;
      const totalChars = this.L.text.length;
      if (UW.input.confirm()) {
        if (this.chars < totalChars) this.chars = totalChars;
        else {
          const next = this.n + 1;
          if (next <= 20 && next <= UW.save.data.unlocked) { game.play.start(next); game.go(game.play); }
          else game.go(game.select);
        }
      }
    },
    draw(ctx) {
      ctx.fillStyle = '#141110'; ctx.fillRect(0, 0, VW, VH);
      // parchment
      ctx.fillStyle = '#cfc5a5'; ctx.fillRect(22, 12, VW - 44, VH - 26);
      ctx.fillStyle = '#b8ab8a';
      ctx.fillRect(22, 12, VW - 44, 2); ctx.fillRect(22, VH - 16, VW - 44, 2);
      ctx.fillStyle = '#9e2b25'; ctx.beginPath(); ctx.arc(VW - 34, 22, 4, 0, 7); ctx.fill();
      ctx.textAlign = 'left'; ctx.textBaseline = 'top';
      ctx.fillStyle = '#4a3a26'; serif(ctx, 8);
      ctx.fillText(this.L.to, 30, 20);
      mono(ctx, 6.5);
      let shown = Math.floor(this.chars), y = 34;
      for (const line of this.lines) {
        if (shown <= 0) break;
        ctx.fillText(line.slice(0, shown), 30, y);
        shown -= line.length; y += 9;
        if (y > VH - 30) break;
      }
      if (this.chars >= this.L.text.length && Math.floor(this.t * 2) % 2 === 0) {
        ctx.textAlign = 'center'; mono(ctx, 7); ctx.fillStyle = '#4a3a26';
        ctx.fillText('· enter ·', VW / 2, VH - 24);
      }
    }
  };

  // ---- Finale: the bonfire at Gad's Hill ----
  game.finale = {
    start() {
      this.t = 0; this.line = 0; this.phase = 0; this.embers = [];
      this.flyers = []; this.credits = -VH;
      UW.audio.play('finale');
      setTimeout(() => UW.audio.fire(true), 1500);
      const total = Math.max(UW.save.totalLetters(), 20);
      for (let i = 0; i < Math.min(total, 60); i++) {
        this.flyers.push({ x: -20 - Math.random() * 400, y: 30 + Math.random() * 80, s: 40 + Math.random() * 40, done: false });
      }
    },
    update(dt) {
      this.t += dt;
      // letters fly into the fire
      for (const f of this.flyers) {
        if (f.done) continue;
        const dx = 200 - f.x, dy = 118 - f.y;
        const d = Math.hypot(dx, dy);
        if (d < 6) { f.done = true; continue; }
        f.x += (dx / d) * f.s * dt; f.y += (dy / d) * f.s * dt + Math.sin(this.t * 3 + f.x) * 6 * dt;
      }
      // embers
      if (this.embers.length < 60) this.embers.push({ x: 196 + Math.random() * 12, y: 118, vy: 14 + Math.random() * 26, t: 0 });
      for (const e of this.embers) { e.t += dt; e.y -= e.vy * dt; e.x += Math.sin(e.t * 4 + e.vy) * 8 * dt; if (e.y < 8) { e.y = 118; e.x = 196 + Math.random() * 12; e.t = 0; } }

      if (this.phase === 0) {
        if (UW.input.confirm() || this.t > 5 + this.line * 5.5) {
          this.line++; this.t = this.phase === 0 && this.line === 1 ? this.t : this.t;
          UW.audio.sfx('page');
          if (this.line >= UW.FINALE.length) { this.phase = 1; this.credits = VH + 10; }
        }
      } else {
        this.credits -= dt * 10;
        if (this.credits < -UW.CREDITS.length * 12 - 40 || UW.input.back()) {
          UW.audio.fire(false); UW.audio.play('title'); game.go(game.title);
        }
      }
    },
    draw(ctx) {
      // night field behind Gad's Hill
      const g = ctx.createLinearGradient(0, 0, 0, VH);
      g.addColorStop(0, '#0d0d16'); g.addColorStop(0.7, '#1c1a22'); g.addColorStop(1, '#26221c');
      ctx.fillStyle = g; ctx.fillRect(0, 0, VW, VH);
      // stars
      const rnd = UW.rng(99);
      ctx.fillStyle = 'rgba(220,220,235,0.7)';
      for (let i = 0; i < 40; i++) ctx.fillRect(Math.floor(rnd() * VW), Math.floor(rnd() * 70), 1, 1);
      // house silhouette (Gad's Hill Place)
      ctx.fillStyle = '#12100e';
      ctx.fillRect(20, 62, 90, 58); ctx.fillRect(36, 46, 58, 20);
      ctx.beginPath(); ctx.moveTo(30, 62); ctx.lineTo(65, 34); ctx.lineTo(100, 62); ctx.fill();
      ctx.fillRect(60, 26, 8, 22); // bell tower
      // one lit window
      ctx.fillStyle = 'rgba(220,180,90,0.6)'; ctx.fillRect(48, 78, 6, 8);
      // ground
      ctx.fillStyle = '#26221c'; ctx.fillRect(0, 120, VW, VH - 120);
      // the fire
      const fx = 200, fy = 118;
      for (let i = 0; i < 8; i++) {
        const ph = this.t * 6 + i;
        const h = 16 + Math.sin(ph) * 6 + i;
        ctx.fillStyle = i < 3 ? '#e8c357' : (i < 6 ? '#e07830' : '#a03020');
        ctx.beginPath();
        ctx.moveTo(fx - 10 + i * 2.5, fy);
        ctx.quadraticCurveTo(fx - 10 + i * 2.5 + Math.sin(ph) * 4, fy - h, fx - 6 + i * 2.5, fy);
        ctx.fill();
      }
      ctx.fillStyle = '#141210'; ctx.fillRect(fx - 16, fy, 32, 4); // ash pile
      // the onion, buried in the ashes
      ctx.fillStyle = '#c8b070'; ctx.beginPath(); ctx.arc(fx + 10, fy + 2, 2.5, 0, 7); ctx.fill();
      // glow
      const gl = ctx.createRadialGradient(fx, fy - 8, 4, fx, fy - 8, 70);
      gl.addColorStop(0, 'rgba(232,150,60,0.35)'); gl.addColorStop(1, 'rgba(232,150,60,0)');
      ctx.fillStyle = gl; ctx.fillRect(fx - 70, fy - 78, 140, 140);
      // the novelist, watching
      ctx.drawImage(UW.sprites.novelist.idle[Math.floor(this.t * 2) % 2], 158, 102);
      // flying letters
      for (const f of this.flyers) {
        if (f.done) continue;
        ctx.drawImage(UW.sprites.letter, Math.round(f.x), Math.round(f.y));
      }
      // embers
      for (const e of this.embers) {
        ctx.fillStyle = 'rgba(240,150,60,' + Math.max(0, 0.9 - e.t * 0.3) + ')';
        ctx.fillRect(Math.round(e.x), Math.round(e.y), 1, 1);
      }
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      if (this.phase === 0) {
        ctx.fillStyle = 'rgba(10,8,8,0.5)'; ctx.fillRect(0, VH - 44, VW, 44);
        ctx.fillStyle = '#cfc5a5'; serif(ctx, 8);
        const line = UW.FINALE[Math.min(this.line, UW.FINALE.length - 1)];
        ctx.fillText(line, VW / 2, VH - 26);
        mono(ctx, 6); ctx.fillStyle = '#5a5248';
        ctx.fillText('enter', VW / 2, VH - 8);
      } else {
        let y = this.credits;
        for (const line of UW.CREDITS) {
          if (y > -10 && y < VH + 10) {
            ctx.fillStyle = line === 'UNWRITTEN' || line === 'CHARLES DICKENS' ? '#e6ddc6' : '#9a8f74';
            serif(ctx, line === 'UNWRITTEN' ? 16 : 8);
            ctx.fillText(line, VW / 2, y);
          }
          y += 12;
        }
      }
    }
  };

  game.go = function (scene) { this.scene = scene; if (scene.enter) scene.enter(); };
})();
