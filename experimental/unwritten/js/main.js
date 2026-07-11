// UNWRITTEN — boot & main loop
'use strict';

(function () {
  // Logical resolution stays 320x180 (all game coordinates); the canvas is
  // 640x360 device pixels with a fixed 2x transform, so external art and text
  // render at double the detail. 640x360 integer-scales to 720p and 1080p.
  const VW = 320, VH = 180, PX = 2;
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');

  function fit() {
    // integer upscale on desktop; fractional downscale so phones fit the whole game
    let s = Math.min(innerWidth / (VW * PX), (innerHeight - 24) / (VH * PX));
    s = s >= 1 ? Math.floor(s) : s;
    canvas.style.width = (VW * PX * s) + 'px';
    canvas.style.height = (VH * PX * s) + 'px';
  }
  addEventListener('resize', fit); fit();

  UW.input.init();
  UW.touch.init(canvas);
  UW.save.load();
  UW.game.go(UW.game.title);

  let last = performance.now();
  function frame(now) {
    let dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    const sc = UW.game.scene;
    if (sc) {
      sc.update(dt);
      ctx.setTransform(PX, 0, 0, PX, 0, 0);
      ctx.imageSmoothingEnabled = false;
      // scene may have changed inside update
      UW.game.scene.draw(ctx);
      UW.touch.draw(ctx);
    }
    UW.input.endFrame();
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
