// UNWRITTEN — boot & main loop
'use strict';

(function () {
  const VW = 320, VH = 180;
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  function fit() {
    const s = Math.max(1, Math.floor(Math.min(innerWidth / VW, (innerHeight - 24) / VH)));
    canvas.style.width = (VW * s) + 'px';
    canvas.style.height = (VH * s) + 'px';
  }
  addEventListener('resize', fit); fit();

  UW.input.init();
  UW.save.load();
  UW.game.go(UW.game.title);

  let last = performance.now();
  function frame(now) {
    let dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    const sc = UW.game.scene;
    if (sc) {
      sc.update(dt);
      // scene may have changed inside update
      UW.game.scene.draw(ctx);
    }
    UW.input.endFrame();
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
