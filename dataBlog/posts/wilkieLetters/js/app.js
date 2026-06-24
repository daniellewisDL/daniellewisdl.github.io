import { loadAll, state, fmtInt } from './data.js';
import { moveTip } from './letter.js';
import { renderFrontispiece } from './views/frontispiece.js';
import { renderChronicle } from './views/chronicle.js';
import { renderAtlas } from './views/atlas.js';
import { renderCorrespondents } from './views/correspondents.js';
import { renderLedger } from './views/ledger.js';
import { renderReading } from './views/reading.js';

const VIEWS = {
  frontispiece: renderFrontispiece, chronicle: renderChronicle, atlas: renderAtlas,
  correspondents: renderCorrespondents, ledger: renderLedger, reading: renderReading,
};
const built = new Set();

function show(name) {
  if (!VIEWS[name]) name = 'frontispiece';
  document.querySelectorAll('.view').forEach(v => v.hidden = v.id !== name);
  document.querySelectorAll('#nav button').forEach(b =>
    b.classList.toggle('active', b.dataset.view === name));
  if (!built.has(name)) {
    VIEWS[name](document.getElementById(name));
    built.add(name);
  }
  document.getElementById('main').scrollIntoView({ block: 'start' });
}

function route() { show((location.hash || '#frontispiece').slice(1)); }

document.getElementById('nav').addEventListener('click', e => {
  const b = e.target.closest('button'); if (b) location.hash = b.dataset.view;
});
window.addEventListener('hashchange', route);
// redraw the current view when the window resizes (charts read container size)
let resizeT;
addEventListener('resize', () => {
  clearTimeout(resizeT);
  resizeT = setTimeout(() => {
    const cur = (location.hash || '#frontispiece').slice(1);
    if (VIEWS[cur]) VIEWS[cur](document.getElementById(cur));
  }, 250);
});
// keep tooltip following the cursor globally
addEventListener('mousemove', e => { const t = document.getElementById('tip'); if (!t.hidden) moveTip(e); });

(async function init() {
  await loadAll();
  document.getElementById('hdr-count').textContent = fmtInt(state.letters.length);
  route();
  const ld = document.getElementById('loader');
  ld.classList.add('gone'); setTimeout(() => ld.remove(), 600);
})();
