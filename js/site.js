/* ===========================================================================
   daniellewisDL — shared site behaviour
   - theme toggle (persisted, system-aware)
   - hero grid + crosshair animation (p5, theme-aware, responsive)
   Used by the homepage and every blog index page.
   =========================================================================== */
(function () {
  "use strict";

  /* ---- Theme toggle ------------------------------------------------------ */
  function initThemeToggle() {
    var root = document.documentElement;
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  /* ---- Hero animation ---------------------------------------------------- */
  function cssVar(name, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
  }

  function initHero() {
    var host = document.getElementById("hero-canvas");
    if (typeof p5 === "undefined" || !host) return;

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    new p5(function (p) {
      var w, h;

      function dims() {
        w = host.clientWidth;
        h = host.clientHeight;
      }

      p.setup = function () {
        dims();
        var c = p.createCanvas(w, h);
        c.parent(host);
        p.noFill();
        if (reduceMotion) p.noLoop();
      };

      p.windowResized = function () {
        dims();
        p.resizeCanvas(w, h);
        if (reduceMotion) p.redraw();
      };

      p.draw = function () {
        p.clear();

        var gap = 28;
        p.strokeWeight(1);
        p.stroke(cssVar("--grid-line", "rgba(34,211,238,0.16)"));
        for (var x = 0; x <= w; x += gap) p.line(x, 0, x, h);
        p.stroke(cssVar("--grid-line-2", "rgba(167,139,250,0.10)"));
        for (var y = 0; y <= h; y += gap) p.line(0, y, w, y);

        if (reduceMotion) return;

        var inside = p.mouseX >= 0 && p.mouseX <= w && p.mouseY >= 0 && p.mouseY <= h;
        var mx = inside ? p.mouseX : w / 2;
        var my = inside ? p.mouseY : h / 2;

        p.stroke(cssVar("--accent", "#22d3ee"));
        p.strokeWeight(1);
        p.line(0, my, w, my);
        p.line(mx, 0, mx, h);
        p.strokeWeight(1.5);
        p.circle(mx, my, 14);
      };
    }, host);
  }

  window.addEventListener("DOMContentLoaded", function () {
    initThemeToggle();
    initHero();
  });
})();
