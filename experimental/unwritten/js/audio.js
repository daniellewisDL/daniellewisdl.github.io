// UNWRITTEN — 16-bit style WebAudio soundtrack + SFX
'use strict';

(function () {
  const NOTE = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  function midi(name) { // "A#3" -> midi number, "-" -> rest
    if (name === '-') return -1;
    let s = 0, i = 1;
    if (name[1] === '#') { s = 1; i = 2; } else if (name[1] === 'b') { s = -1; i = 2; }
    return NOTE[name[0]] + s + 12 * (parseInt(name.slice(i)) + 1);
  }
  function freq(m) { return 440 * Math.pow(2, (m - 69) / 12); }
  // "A3:2 C4:1 -:1" -> [[midi,steps],...]
  function pat(str) {
    return str.trim().split(/\s+/).map(tok => {
      const [n, d] = tok.split(':');
      return [midi(n), parseInt(d || '1')];
    });
  }

  // ---------------- Songs -------------------------------------------------
  // Each song: { tempo (steps/min ~ 16ths), tracks: [{wave, vol, decay, patterns}] }
  const SONGS = {
    title: { tempo: 300, tracks: [
      { wave: 'sine', vol: 0.20, decay: 0.9, detune: 4, pat: pat(
        'A4:2 -:1 C5:2 -:1 E5:3 -:3 E5:2 D5:1 C5:2 B4:1 A4:3 -:3 ' +
        'G4:2 -:1 B4:2 -:1 E5:3 -:3 D5:2 C5:1 B4:2 C5:1 A4:6') },
      { wave: 'triangle', vol: 0.16, decay: 1.2, pat: pat(
        'A2:3 E3:3 A2:3 E3:3 A2:3 E3:3 A2:3 E3:3 E2:3 B2:3 E2:3 B2:3 A2:3 E3:3 A2:6') }
    ]},
    act1: { tempo: 340, tracks: [
      { wave: 'square', vol: 0.10, decay: 0.35, pat: pat(
        'D4:2 F4:2 A4:2 F4:2 D4:2 F4:2 G4:2 F4:2 E4:2 G4:2 A#4:2 G4:2 A4:4 -:4 ' +
        'D4:2 F4:2 A4:2 C5:2 A#4:2 A4:2 G4:2 F4:2 E4:4 C#4:4 D4:6 -:2') },
      { wave: 'triangle', vol: 0.22, decay: 0.25, pat: pat(
        'D2:4 D2:4 A#1:4 A#1:4 C2:4 C2:4 A1:4 A1:4 D2:4 D2:4 G1:4 G1:4 A1:4 A1:4 D2:8') },
      { wave: 'noise', vol: 0.05, decay: 0.05, pat: pat('C5:4 C5:4 C5:4 C5:4'.repeat(1)) }
    ]},
    act2: { tempo: 280, tracks: [
      { wave: 'sawtooth', vol: 0.07, decay: 2.4, pat: pat(
        'E3:8 C3:8 D3:8 B2:8 E3:8 G3:8 F#3:8 B2:8') },
      { wave: 'square', vol: 0.07, decay: 0.3, pat: pat(
        'E4:1 G4:1 B4:1 G4:1 E4:1 G4:1 B4:1 G4:1 C4:1 E4:1 G4:1 E4:1 C4:1 E4:1 G4:1 E4:1 ' +
        'D4:1 F#4:1 A4:1 F#4:1 D4:1 F#4:1 A4:1 F#4:1 B3:1 D#4:1 F#4:1 D#4:1 B3:1 D#4:1 F#4:1 D#4:1') },
      { wave: 'triangle', vol: 0.15, decay: 1.5, pat: pat('E2:8 C2:8 D2:8 B1:8') }
    ]},
    act3: { tempo: 380, tracks: [
      { wave: 'square', vol: 0.10, decay: 0.5, vibrato: 6, pat: pat(
        'E4:2 G4:2 B4:2 E5:2 D5:2 B4:2 G4:2 E4:2 C4:2 E4:2 G4:2 C5:2 B4:2 G4:2 F#4:2 D4:2 ' +
        'G4:2 B4:2 D5:2 G5:2 F#5:2 D5:2 B4:2 G4:2 A4:2 C5:2 B4:2 A4:2 G4:4 -:4') },
      { wave: 'triangle', vol: 0.20, decay: 0.3, pat: pat(
        'E2:4 B2:4 C2:4 G2:4 D2:4 A2:4 G2:4 B2:4 E2:4 B2:4 C2:4 G2:4 A2:4 D2:4 G2:8') },
      { wave: 'sine', vol: 0.09, decay: 0.6, pat: pat(
        'E3:4 E3:4 E3:4 E3:4 E3:4 E3:4 D3:4 D3:4 E3:4 E3:4 E3:4 E3:4 D3:4 D3:4 G3:8') }
    ]},
    act4: { tempo: 240, tracks: [
      { wave: 'triangle', vol: 0.18, decay: 1.6, pat: pat(
        'A3:4 C4:4 E4:4 C4:4 A3:4 D4:4 F4:4 D4:4 A3:4 C4:4 E4:8 -:4 ' +
        'G3:4 B3:4 E4:4 B3:4 A3:4 C4:4 E4:4 A4:4 G4:4 F4:4 E4:8 -:4') },
      { wave: 'sine', vol: 0.10, decay: 2.2, pat: pat('A2:16 F2:16 A2:16 E2:16') }
    ]},
    finale: { tempo: 200, tracks: [
      { wave: 'triangle', vol: 0.12, decay: 2.5, pat: pat('A3:8 -:8 E4:8 -:8 C4:8 -:8 A3:8 -:24') }
    ]}
  };

  const A = UW.audio = {
    ctx: null, muted: false, songName: null, timer: null,
    step: 0, nextTime: 0, master: null, musicGain: null, noiseBuf: null,
    crackle: null, windNode: null,

    unlock() {
      if (this.ctx) { if (this.ctx.state === 'suspended') this.ctx.resume(); return; }
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      this.ctx = new AC();
      this.master = this.ctx.createGain(); this.master.gain.value = this.muted ? 0 : 1;
      this.master.connect(this.ctx.destination);
      this.musicGain = this.ctx.createGain(); this.musicGain.gain.value = 0.9;
      this.musicGain.connect(this.master);
      // shared noise buffer
      const len = this.ctx.sampleRate * 1;
      this.noiseBuf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
      const d = this.noiseBuf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      if (this.songName) this._start(this.songName);
    },
    toggleMute() {
      this.muted = !this.muted;
      if (this.master) this.master.gain.value = this.muted ? 0 : 1;
    },

    play(name) {
      if (this.songName === name) return;
      this.songName = name;
      if (this.ctx) this._start(name);
    },
    stop() { this.songName = null; if (this.timer) { clearInterval(this.timer); this.timer = null; } this._stopAmbience(); },

    _start(name) {
      if (this.timer) { clearInterval(this.timer); this.timer = null; }
      this._stopAmbience();
      if (!name || !SONGS[name]) return;
      const song = SONGS[name];
      // per-track step counters
      song.tracks.forEach(t => { t._i = 0; t._until = 0; });
      this.step = 0; this.nextTime = this.ctx.currentTime + 0.1;
      const stepDur = 60 / song.tempo;
      this.timer = setInterval(() => {
        if (!this.ctx) return;
        while (this.nextTime < this.ctx.currentTime + 0.2) {
          this._scheduleStep(song, this.nextTime, stepDur);
          this.nextTime += stepDur; this.step++;
        }
      }, 40);
    },
    _scheduleStep(song, t, stepDur) {
      for (const tr of song.tracks) {
        if (this.step < tr._until) continue;
        const ev = tr.pat[tr._i % tr.pat.length]; tr._i++;
        tr._until = this.step + ev[1];
        if (ev[0] < 0) continue;
        const dur = ev[1] * stepDur;
        if (tr.wave === 'noise') this._noiseHit(t, tr.vol, tr.decay);
        else this._tone(freq(ev[0]), t, Math.min(dur * 0.95, tr.decay), tr);
      }
    },
    _tone(f, t, dur, tr) {
      const ctx = this.ctx;
      const o = ctx.createOscillator(); o.type = tr.wave; o.frequency.value = f;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(tr.vol, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, t + dur + 0.05);
      if (tr.detune) { o.detune.value = tr.detune; }
      if (tr.vibrato) {
        const lfo = ctx.createOscillator(); lfo.frequency.value = tr.vibrato;
        const lg = ctx.createGain(); lg.gain.value = 6;
        lfo.connect(lg); lg.connect(o.frequency); lfo.start(t); lfo.stop(t + dur + 0.1);
      }
      o.connect(g); g.connect(this.musicGain);
      o.start(t); o.stop(t + dur + 0.1);
    },
    _noiseHit(t, vol, decay) {
      const ctx = this.ctx;
      const src = ctx.createBufferSource(); src.buffer = this.noiseBuf;
      const g = ctx.createGain();
      g.gain.setValueAtTime(vol, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + Math.max(decay, 0.03));
      const f = ctx.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = 4000;
      src.connect(f); f.connect(g); g.connect(this.musicGain);
      src.start(t); src.stop(t + 0.2);
    },

    // Looping fire crackle for the bonfire scene; wind for Act IV.
    fire(on) {
      if (!this.ctx) return;
      if (on && !this.crackle) {
        const src = this.ctx.createBufferSource(); src.buffer = this.noiseBuf; src.loop = true;
        const f = this.ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 900;
        const g = this.ctx.createGain(); g.gain.value = 0.15;
        src.connect(f); f.connect(g); g.connect(this.master);
        src.start();
        this.crackle = { src, g };
      } else if (!on && this.crackle) { try { this.crackle.src.stop(); } catch (e) {} this.crackle = null; }
    },
    _stopAmbience() { this.fire(false); },

    // ---- SFX ----
    sfx(kind) {
      if (!this.ctx || this.muted) return;
      const t = this.ctx.currentTime;
      const blip = (f0, f1, dur, vol, wave) => {
        const o = this.ctx.createOscillator(); o.type = wave || 'square';
        o.frequency.setValueAtTime(f0, t);
        o.frequency.exponentialRampToValueAtTime(Math.max(f1, 1), t + dur);
        const g = this.ctx.createGain();
        g.gain.setValueAtTime(vol, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + dur);
        o.connect(g); g.connect(this.master); o.start(t); o.stop(t + dur + 0.02);
      };
      switch (kind) {
        case 'jump': blip(220, 440, 0.12, 0.08); break;
        case 'land': blip(140, 70, 0.08, 0.05, 'triangle'); break;
        case 'letter': blip(880, 1320, 0.15, 0.07, 'sine'); blip(1320, 1760, 0.25, 0.05, 'sine'); break;
        case 'checkpoint': blip(660, 880, 0.2, 0.06, 'triangle'); break;
        case 'gate': blip(110, 55, 0.5, 0.08, 'sawtooth'); break;
        case 'page': blip(2000, 600, 0.15, 0.04, 'triangle'); break;
        case 'bump': blip(200, 90, 0.15, 0.06, 'triangle'); break;
        case 'chain': blip(300, 90, 0.3, 0.05, 'sawtooth'); break;
      }
    }
  };
})();
