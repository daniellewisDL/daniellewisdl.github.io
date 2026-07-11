// UNWRITTEN — player + surreal manifestations (all non-lethal: they slow, dim, hold, obscure)
'use strict';

(function () {
  const T = UW.TILE, TS = 16;

  // ---------------- Player -------------------------------------------------
  UW.Player = class {
    constructor(x, y) {
      this.x = x; this.y = y; this.vx = 0; this.vy = 0;
      this.w = 9; this.h = 17;
      this.face = 1; this.onGround = false; this.anim = 0;
      this.coyote = 0; this.jbuf = 0;
      this.slow = 0; this.hold = 0; this.dim = 0; this.obscure = 0; this.timeSlow = 0;
      this.kbx = 0; this.walkT = 0;
    }
    rect() { return { x: this.x - this.w / 2, y: this.y - this.h, w: this.w, h: this.h }; }
    update(dt, world) {
      const inp = UW.input;
      const ice = world.lv.ice || 0;
      const ts = this.timeSlow > 0 ? 0.55 : 1;
      dt *= ts;
      this.slow = Math.max(0, this.slow - dt); this.hold = Math.max(0, this.hold - dt);
      this.dim = Math.max(0, this.dim - dt); this.obscure = Math.max(0, this.obscure - dt);
      this.timeSlow = Math.max(0, this.timeSlow - dt);

      let speed = 100 * (this.slow > 0 ? 0.5 : 1);
      if (this.hold > 0) speed = 0;
      let ax = 0;
      if (inp.left()) { ax = -1; this.face = -1; }
      if (inp.right()) { ax = 1; this.face = 1; }
      const accel = ice ? 420 * (1 - ice * 0.55) : 900;
      const fric = ice ? 60 + (1 - ice) * 500 : 700;
      if (ax !== 0) this.vx = UW.clamp(this.vx + ax * accel * dt, -speed, speed);
      else {
        const s = Math.sign(this.vx);
        this.vx -= s * fric * dt;
        if (Math.sign(this.vx) !== s) this.vx = 0;
      }
      this.vx += this.kbx; this.kbx *= 0.8; if (Math.abs(this.kbx) < 1) this.kbx = 0;

      // jumping: coyote + buffer + variable height
      this.coyote -= dt; this.jbuf -= dt;
      if (inp.jumpPressed()) this.jbuf = 0.12;
      if (this.jbuf > 0 && this.coyote > 0) {
        this.vy = -272; this.coyote = 0; this.jbuf = 0; this.onGround = false;
        this.hold = 0; // a jump wrenches you free of grasping hands
        UW.audio.sfx('jump');
      }
      if (!inp.jumpHeld() && this.vy < -90) this.vy = -90;
      this.vy = Math.min(this.vy + 760 * dt, 320);

      this._move(dt, world);
      // animation
      if (Math.abs(this.vx) > 5 && this.onGround) this.walkT += dt * Math.abs(this.vx) / 10;
      this.anim += dt;
    }
    _move(dt, world) {
      const map = world.gen.map, W = world.gen.W, H = world.gen.H;
      const solidAt = (px, py) => {
        const i = Math.floor(px / TS), j = Math.floor(py / TS);
        if (i < 0 || i >= W) return true;
        if (j < 0 || j >= H) return false;
        const t = map[j][i];
        return t === T.SOLID || (t === T.CRUMBLE && !world.crumbled[j * W + i]);
      };
      // horizontal
      this.x += this.vx * dt;
      const r = this.rect();
      for (const py of [r.y + 2, r.y + r.h / 2, r.y + r.h - 2]) {
        if (this.vx > 0 && solidAt(r.x + r.w, py)) { this.x = Math.floor((r.x + r.w) / TS) * TS - this.w / 2 - 0.01; this.vx = 0; }
        else if (this.vx < 0 && solidAt(r.x, py)) { this.x = (Math.floor(r.x / TS) + 1) * TS + this.w / 2 + 0.01; this.vx = 0; }
      }
      // vertical
      const wasGround = this.onGround;
      this.y += this.vy * dt;
      this.onGround = false;
      const r2 = this.rect();
      if (this.vy >= 0) {
        // feet: solids, one-way platforms and crumble boards
        const fy = r2.y + r2.h;
        const j = Math.floor(fy / TS);
        for (const px of [r2.x + 1, r2.x + r2.w - 1]) {
          const i = Math.floor(px / TS);
          if (i < 0 || i >= W || j < 0 || j >= H) continue;
          const t = map[j][i];
          const solid = t === T.SOLID || (t === T.CRUMBLE && !world.crumbled[j * W + i]);
          const plat = t === T.PLAT && (fy - this.vy * dt) <= j * TS + 4;
          if (solid || plat) {
            this.y = j * TS - 0.01; this.vy = 0; this.onGround = true; this.coyote = 0.1;
            // gentle respawn points: remember recent footing, newest last
            world.lastGround = { x: this.x, y: this.y };
            const gt = world.groundTrail;
            if (!gt.length || Math.abs(gt[gt.length - 1].x - this.x) > 8) {
              gt.push({ x: this.x, y: this.y });
              if (gt.length > 200) gt.shift();
            }
            if (!wasGround) UW.audio.sfx('land');
            if (t === T.CRUMBLE) world.crumbleTouch(i, j);
            break;
          }
        }
      } else {
        const hy = r2.y;
        for (const px of [r2.x + 1, r2.x + r2.w - 1]) {
          if (solidAt(px, hy)) { this.y = (Math.floor(hy / TS) + 1) * TS + this.h; this.vy = 0; break; }
        }
      }
      if (this.onGround) this.coyote = 0.1;
      this.x = UW.clamp(this.x, 6, W * TS - 6);
      // fell into water / off the map → gentle respawn
      if (this.y > H * TS - 20) world.respawn();
      else {
        const i = Math.floor(this.x / TS), j = Math.floor((this.y - 4) / TS);
        if (j >= 0 && j < H && map[j][i] === T.WATER) world.respawn();
      }
    }
    draw(ctx, cam) {
      // external art (right-facing frames, 2x device px) with code-sprite fallback
      let key;
      if (!this.onGround) key = 'nov_jump';
      else if (Math.abs(this.vx) > 5) key = 'nov_walk' + (Math.floor(this.walkT) % 4 + 1);
      else key = 'nov_idle' + (Math.floor(this.anim * 2) % 2 + 1);
      const ext = UW.assets.get(key);
      if (ext) {
        const dh = 18, dw = dh * ext.width / ext.height;
        const dx = Math.round(this.x - dw / 2 - cam.x), dy = Math.round(this.y - dh - cam.y);
        if (this.face > 0) ctx.drawImage(ext, dx, dy, dw, dh);
        else {
          ctx.save();
          ctx.translate(dx + dw / 2, 0); ctx.scale(-1, 1); ctx.translate(-(dx + dw / 2), 0);
          ctx.drawImage(ext, dx, dy, dw, dh);
          ctx.restore();
        }
      } else {
        const S = this.face > 0 ? UW.sprites.novelist : UW.sprites.novelistL;
        let img;
        if (!this.onGround) img = S.jump;
        else if (Math.abs(this.vx) > 5) img = S.walk[Math.floor(this.walkT) % 4];
        else img = S.idle[Math.floor(this.anim * 2) % 2];
        ctx.drawImage(img, Math.round(this.x - 6 - cam.x), Math.round(this.y - 18 - cam.y));
      }
      if (this.hold > 0) { // grasping hands effect
        ctx.fillStyle = 'rgba(20,18,24,0.8)';
        ctx.fillRect(Math.round(this.x - 5 - cam.x), Math.round(this.y - 4 - cam.y), 3, 4);
        ctx.fillRect(Math.round(this.x + 2 - cam.x), Math.round(this.y - 5 - cam.y), 3, 5);
      }
    }
  };

  // ---------------- Enemies / hazards --------------------------------------
  UW.Enemy = class {
    constructor(kind, x, y, world) {
      this.kind = kind; this.world = world;
      this.x = x * TS + 8; this.y = (y + 1) * TS; // stand position (y = standY row)
      this.x0 = this.x; this.t = Math.random() * 10; this.dir = Math.random() < 0.5 ? -1 : 1;
      this.state = 0; this.fallY = this.y - 140;
      // walkers patrol only the ground section they spawned on — never off a ledge
      if (kind === 'rat' || kind === 'beadle') {
        const gen = world.gen, j = y + 1;
        const walkable = c => c >= 0 && c < gen.W && j < gen.H &&
          (gen.map[j][c] === T.SOLID || gen.map[j][c] === T.CRUMBLE) && gen.map[y][c] === T.AIR;
        let L = x, R = x;
        while (walkable(L - 1)) L--;
        while (walkable(R + 1)) R++;
        this.minX = L * TS + 5; this.maxX = R * TS + 11;
      }
    }
    // clamp a patroller to its ground section (and its habit range); flips dir at edges
    _patrol(speed, range, dt) {
      let lo = this.x0 - range, hi = this.x0 + range;
      if (this.minX !== undefined) { lo = Math.max(lo, this.minX); hi = Math.min(hi, this.maxX); }
      if (hi - lo < 4) return; // spawned on a sliver — stand still
      this.x += this.dir * speed * dt;
      if (this.x <= lo) { this.x = lo; this.dir = 1; }
      else if (this.x >= hi) { this.x = hi; this.dir = -1; }
    }
    update(dt, p) {
      this.t += dt;
      const k = this.kind, dx = p.x - this.x, dy = (p.y - 8) - (this.y - 8);
      const near = (rx, ry) => Math.abs(dx) < rx && Math.abs(dy) < ry;
      switch (k) {
        case 'rat':
          this._patrol(22, 40, dt);
          if (near(8, 10)) { p.slow = Math.max(p.slow, 0.6); }
          break;
        case 'beadle':
          this._patrol(18, 56, dt);
          if (near(12, 16)) p.slow = Math.max(p.slow, 0.8);
          break;
        case 'pickpocket':
          if (near(60, 30)) this.x += Math.sign(-dx) * -60 * dt * -1; // flees
          break;
        case 'trap':
          // grabs once, then must recover — never a permanent hold
          this.cool = Math.max(0, (this.cool || 0) - dt);
          if (near(8, 10) && p.onGround && this.cool <= 0) { p.hold = 0.7; this.cool = 2.4; UW.audio.sfx('bump'); }
          break;
        case 'shadow': {
          const up = (Math.sin(this.t * 1.2) + 1) / 2; // rises and sinks
          this.rise = up;
          this.cool = Math.max(0, (this.cool || 0) - dt);
          if (up > 0.6 && near(9, 14) && this.cool <= 0) { p.hold = 0.7; this.cool = 2.8; }
          break;
        }
        case 'coffin': case 'collapse': {
          // falls when player passes beneath, then resets
          if (this.state === 0 && Math.abs(dx) < 14 && p.y > this.fallY) { this.state = 1; this.fy = this.fallY; }
          if (this.state === 1) {
            this.fy += 240 * dt;
            if (Math.abs(p.x - this.x) < 9 && Math.abs(this.fy - (p.y - 9)) < 10) { p.kbx = (Math.random() < 0.5 ? -1 : 1) * 10; p.slow = 1; UW.audio.sfx('bump'); }
            if (this.fy >= this.y - 8) { this.state = 2; this.t = 0; }
          }
          if (this.state === 2 && this.t > 2.5) this.state = 0;
          break;
        }
        case 'clockface':
          this.ring = (this.t % 3) / 3;
          if (Math.abs(dx) < this.ring * 70 + 8 && Math.abs(dx) > this.ring * 70 - 8 && Math.abs(dy) < 40) p.timeSlow = Math.max(p.timeSlow, 0.8);
          break;
        case 'bride': case 'apparition':
          this.fy2 = Math.sin(this.t * 1.4) * 8;
          this.x += this.dir * 10 * dt;
          if (Math.abs(this.x - this.x0) > 50) this.dir *= -1;
          if (near(12, 20)) p.slow = Math.max(p.slow, 0.8);
          break;
        case 'wave':
          this.x += this.dir * 60 * dt;
          if (this.x < 40) { this.x = 40; this.dir = 1; }
          if (this.x > this.world.gen.W * TS - 40) this.dir = -1;
          if (near(10, 14)) { p.slow = Math.max(p.slow, 1); p.kbx = this.dir * 8; }
          break;
        case 'convict': {
          // paces at fixed distance behind the player, dragging the chain
          const delta = (p.x - 70) - this.x;
          this.x += UW.clamp(delta, -1, 1) * 30 * dt;
          if (delta > 1) this.dir = 1; else if (delta < -1) this.dir = -1;
          if (this.t > 3) { UW.audio.sfx('chain'); this.t = 0; }
          if (near(10, 16)) p.slow = Math.max(p.slow, 1);
          break;
        }
        case 'stalker': {
          // mimics the player's position on a 5 s delay
          const trail = this.world.trail;
          const idx = Math.max(0, trail.length - 300);
          if (trail.length > 30) { const q = trail[idx]; this.x = q.x; this.sy = q.y; }
          if (this.sy !== undefined && Math.abs(dx) < 8 && Math.abs(p.y - this.sy) < 16) p.slow = Math.max(p.slow, 0.8);
          break;
        }
      }
    }
    draw(ctx, cam) {
      const k = this.kind, X = Math.round(this.x - cam.x), Y = Math.round(this.y - cam.y);
      const S = UW.sprites;
      const walkFrame = set => (this.dir > 0 ? set.walk : set.walkL)[Math.floor(this.t * 6) % 4];
      // external frame, bottom-centre anchored; sheet art faces left, so flip when dir > 0
      const drawE = (img, dh, dy = 0, alpha = 1, flip = this.dir > 0) => {
        const dw = dh * img.width / img.height;
        const dx = Math.round(this.x - dw / 2 - cam.x), dyy = Math.round(this.y - dh - cam.y + dy);
        if (alpha !== 1) ctx.globalAlpha = alpha;
        if (!flip) ctx.drawImage(img, dx, dyy, Math.round(dw), dh);
        else {
          ctx.save();
          ctx.translate(dx + dw / 2, 0); ctx.scale(-1, 1); ctx.translate(-(dx + dw / 2), 0);
          ctx.drawImage(img, dx, dyy, Math.round(dw), dh);
          ctx.restore();
        }
        if (alpha !== 1) ctx.globalAlpha = 1;
      };
      const AF = (n, c) => UW.assets.frames(n, c);
      switch (k) {
        case 'rat': {
          // frames share one canvas (body 2/3 of its height), so 8 world px ≈ a 5px-tall rat
          const fr = AF('rat', 2);
          if (fr) drawE(fr[Math.floor(this.t * 8) % 2], 8);
          else ctx.drawImage((this.dir > 0 ? S.rat : S.ratL)[Math.floor(this.t * 8) % 2], X - 5, Y - 6);
          break;
        }
        case 'beadle': {
          // a turnkey inside the Marshalsea, a bobby everywhere else
          const fr = this.world.lv.theme === 'prison' ? AF('turnkey', 4) : AF('bobby', 4);
          if (fr) drawE(fr[Math.floor(this.t * 6) % 4], 18);
          else ctx.drawImage(walkFrame(S.beadle), X - 6, Y - 18);
          break;
        }
        case 'pickpocket':
          ctx.drawImage(walkFrame(S.academic), X - 6, Y - 18); break;
        case 'convict': {
          const fr = AF('convict', 6);
          if (fr) drawE(fr[Math.floor(this.t * 5) % 6], 18);
          else {
            ctx.drawImage(walkFrame(S.convict), X - 6, Y - 18);
            ctx.strokeStyle = '#555'; ctx.beginPath(); ctx.moveTo(X - 2, Y - 2); ctx.lineTo(X - 14, Y - 1); ctx.stroke();
          }
          break;
        }
        case 'bride': case 'apparition': {
          const fr = k === 'bride' ? AF('bride', 4) : AF('ghost', 4);
          const alpha = 0.55 + Math.sin(this.t * 3) * 0.15;
          if (fr) drawE(fr[Math.floor(this.t * 4) % 4], 20, (this.fy2 || 0) - 6, alpha, false);
          else {
            ctx.globalAlpha = alpha;
            ctx.drawImage((this.dir > 0 ? S.bride.walk : S.bride.walkL)[Math.floor(this.t * 4) % 4], X - 6, Y - 18 + (this.fy2 || 0) - 6);
            ctx.globalAlpha = 1;
          }
          break;
        }
        case 'trap': {
          ctx.fillStyle = '#3a3f45';
          ctx.fillRect(X - 6, Y - 3, 12, 3);
          ctx.beginPath(); ctx.moveTo(X - 6, Y - 3); ctx.lineTo(X - 3, Y - 9); ctx.lineTo(X, Y - 3);
          ctx.moveTo(X, Y - 3); ctx.lineTo(X + 3, Y - 9); ctx.lineTo(X + 6, Y - 3); ctx.fill();
          break;
        }
        case 'shadow': {
          const rise = this.rise || 0;
          const fr = AF('shadow', 4);
          if (fr && rise > 0.05) {
            // the debtor's shadow surfaces from the floor: top of the figure first
            const img = fr[Math.floor(this.t * 3) % 4];
            const dh = Math.round(22 * rise), dw = Math.round(22 * img.width / img.height);
            const sh = Math.max(1, Math.round(img.height * rise));
            ctx.globalAlpha = 0.9;
            ctx.drawImage(img, 0, 0, img.width, sh, Math.round(X - dw / 2), Y - dh, dw, dh);
            ctx.globalAlpha = 1;
          } else if (!fr) {
            const h = 20 * rise;
            const g = ctx.createLinearGradient(0, Y - h, 0, Y);
            g.addColorStop(0, 'rgba(10,8,14,0)'); g.addColorStop(1, 'rgba(10,8,14,0.9)');
            ctx.fillStyle = g;
            ctx.fillRect(X - 5, Y - h, 10, h);
            if (rise > 0.5) { ctx.fillStyle = 'rgba(10,8,14,0.9)'; ctx.fillRect(X - 7, Y - h, 3, 4); ctx.fillRect(X + 4, Y - h + 2, 3, 4); }
          }
          break;
        }
        case 'coffin': case 'collapse': {
          const fy = this.state === 1 ? this.fy : (this.state === 2 ? this.y - 8 : this.fallY);
          const FY = Math.round(fy - cam.y);
          if (k === 'coffin') {
            ctx.fillStyle = '#4a3a2a'; ctx.fillRect(X - 5, FY - 8, 10, 16);
            ctx.strokeStyle = '#2e2418'; ctx.strokeRect(X - 5.5, FY - 8.5, 11, 17);
          } else { ctx.fillStyle = '#6b6258'; ctx.fillRect(X - 6, FY - 5, 12, 9); }
          break;
        }
        case 'clockface': {
          const CY = Y - 30;
          ctx.fillStyle = 'rgba(200,190,150,0.85)'; ctx.beginPath(); ctx.arc(X, CY, 8, 0, 7); ctx.fill();
          ctx.strokeStyle = '#2e2418'; ctx.beginPath();
          ctx.moveTo(X, CY); ctx.lineTo(X - 4, CY - 3); // 8:40 hands
          ctx.moveTo(X, CY); ctx.lineTo(X - 5, CY + 3); ctx.stroke();
          const rr = (this.ring || 0) * 70;
          if (rr > 2) { ctx.strokeStyle = 'rgba(200,190,150,' + (0.5 - this.ring * 0.5) + ')'; ctx.beginPath(); ctx.arc(X, CY, rr, 0, 7); ctx.stroke(); }
          break;
        }
        case 'wave': {
          ctx.fillStyle = 'rgba(90,130,150,0.7)';
          ctx.beginPath(); ctx.moveTo(X - 10, Y);
          ctx.quadraticCurveTo(X, Y - 14, X + 10, Y); ctx.fill();
          break;
        }
        case 'stalker': {
          if (this.sy === undefined) break;
          const SY = Math.round(this.sy - cam.y);
          ctx.globalAlpha = 0.6;
          ctx.fillStyle = '#d8cfae';
          ctx.fillRect(X - 5, SY - 10, 10, 10); // bottom half only — the unfinished
          ctx.fillStyle = 'rgba(216,207,174,0.35)';
          for (let i = 0; i < 4; i++) ctx.fillRect(X - 6 + Math.sin(this.t * 5 + i * 2) * 4, SY - 14 - i * 3, 4, 2);
          ctx.globalAlpha = 1;
          break;
        }
      }
    }
  };
})();
