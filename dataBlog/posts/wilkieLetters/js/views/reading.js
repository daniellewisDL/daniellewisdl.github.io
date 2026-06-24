import { state, CAT_COLORS, PERIODS, prettyDate, debounce } from '../data.js';
import { showTip, hideTip, openLetter } from '../letter.js';

let elRef = null, pending = null;
let filter = { text: '', cat: '', period: '', sort: 'asc', extra: {} };
const MAX = 280;

// --- global hooks (defined at import time so other views can drill in) ---
window.__rrFilter = (f) => {
  filter = { text: f.text || '', cat: f.cat || '', period: '', sort: 'asc', extra: {} };
  for (const [k, v] of Object.entries(f)) {
    if (['text', 'cat'].includes(k)) continue;
    if (k === 'period') filter.period = v;
    else if (k === 'recipient') filter.extra.recipient = v;
    else filter.extra[k] = v;
  }
  if (elRef) { syncControls(); render(); }
};
window.__rrSearch = (t) => window.__rrFilter({ text: t });

export function renderReading(el) {
  elRef = el;
  const cats = ['', ...Object.keys(CAT_COLORS)];
  el.innerHTML = `
    <div class="view-head"><div class="section-orn">❦</div><h2>Reading Room</h2>
    <p>Search by word, recipient, place, or person named within. Click a line to read it whole.</p></div>
    <div class="controls">
      <input type="search" id="rr-q" placeholder="search text, recipient, place…" style="min-width:230px">
      <select id="rr-cat">${cats.map(c => `<option value="${c}">${c || 'All recipients'}</option>`).join('')}</select>
      <select id="rr-per"><option value="">All periods</option>${PERIODS.map((p, i) => `<option value="${i + 1}">${p}</option>`).join('')}</select>
      <span class="seg" id="rr-sort"><button data-s="asc" class="on">Earliest first</button><button data-s="desc">Latest first</button></span>
      <button id="rr-clear" class="btn ghost">Clear ✕</button>
    </div>
    <div id="rr-chips" class="center" style="margin:-6px 0 8px"></div>
    <div class="rr-count" id="rr-count"></div>
    <div class="panel"><div id="rr-list" class="rr-wrap"></div></div>`;

  el.querySelector('#rr-q').addEventListener('input', debounce(e => { filter.text = e.target.value.trim(); render(); }, 160));
  el.querySelector('#rr-cat').onchange = e => { filter.cat = e.target.value; render(); };
  el.querySelector('#rr-per').onchange = e => { filter.period = e.target.value; render(); };
  el.querySelector('#rr-sort').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return; filter.sort = b.dataset.s;
    el.querySelectorAll('#rr-sort button').forEach(x => x.classList.toggle('on', x === b)); render();
  });
  el.querySelector('#rr-clear').onclick = () => { filter = { text: '', cat: '', period: '', sort: filter.sort, extra: {} }; syncControls(); render(); };

  if (pending) pending = null;
  syncControls(); render();
}

function syncControls() {
  if (!elRef) return;
  elRef.querySelector('#rr-q').value = filter.text;
  elRef.querySelector('#rr-cat').value = filter.cat;
  elRef.querySelector('#rr-per').value = filter.period && !isNaN(+filter.period) ? filter.period : '';
}

const EXTRA_LABEL = { place: 'from', city: 'town', dec: 'decade', atype: 'manuscript', country: 'country',
  lang: 'language', band: 'length', wd: 'weekday', topic: 'subject', year: 'year', recipient: 'to' };

function matches(d) {
  if (filter.cat && d.cat !== filter.cat) return false;
  if (filter.period) { const p = filter.period;
    if (!isNaN(+p)) { if (d.pern !== +p) return false; } else if (d.per !== p) return false; }
  for (const [k, v] of Object.entries(filter.extra)) {
    if (k === 'recipient') { if (d.to !== v) return false; }
    else if (k === 'place') { if (d.place !== v) return false; }
    else if (k === 'city') { if ((d.city || d.place) !== v) return false; }
    else if (k === 'year') { if (d.y !== +v) return false; }
    else if (k === 'dec') { if (d.dec !== v) return false; }
    else if (k === 'atype') { if ((d.atype || '(none)') !== v) return false; }
    else if (k === 'country') { if ((d.country || '(unknown)') !== v) return false; }
    else if (k === 'lang') { if (d.lang !== v) return false; }
    else if (k === 'band') { if ((d.band || '(none)') !== v) return false; }
    else if (k === 'wd') { if ((d.wd || '(undated)') !== v) return false; }
    else if (k === 'topic') { const tv = (v === '(unstated)' || v === '') ? '' : v;
      if (tv ? (d.tprim !== tv) : d.tprim) return false; }
  }
  if (filter.text) {
    const q = filter.text.toLowerCase();
    const hay = (d.to + ' ' + d.body + ' ' + d.place + ' ' + (d.people || []).join(' ')).toLowerCase();
    if (!hay.includes(q)) return false;
  }
  return true;
}

function render() {
  const list = elRef.querySelector('#rr-list'), countEl = elRef.querySelector('#rr-count');
  let res = state.letters.filter(matches);
  // known full dates first (chronological), then partial dates, then undated — always last
  const rank = d => d.iso.length === 10 ? 0 : (d.y ? 1 : 2);
  res.sort((a, b) => {
    const ra = rank(a), rb = rank(b);
    if (ra !== rb) return ra - rb;
    if (ra === 2) return a.id < b.id ? -1 : 1;
    const cmp = a.iso < b.iso ? -1 : a.iso > b.iso ? 1 : 0;
    return filter.sort === 'asc' ? cmp : -cmp;
  });
  const chips = [];
  if (filter.period && isNaN(+filter.period)) chips.push(['period', filter.period]);
  for (const [k, v] of Object.entries(filter.extra)) chips.push([EXTRA_LABEL[k] || k, v]);
  elRef.querySelector('#rr-chips').innerHTML = chips.map(([k, v]) =>
    `<span class="tag" style="cursor:pointer" data-chip="${k}">${k}: ${escp(v)} ✕</span>`).join(' ');
  elRef.querySelectorAll('[data-chip]').forEach(c => c.onclick = () => {
    const key = c.dataset.chip;
    if (key === 'period') filter.period = '';
    else { const rk = Object.keys(EXTRA_LABEL).find(x => EXTRA_LABEL[x] === key) || key; delete filter.extra[rk]; }
    syncControls(); render();
  });

  countEl.textContent = res.length
    ? `${res.length.toLocaleString()} letter${res.length !== 1 ? 's' : ''}${res.length > MAX ? ' — showing first ' + MAX : ''}`
    : 'No letters match — loosen the search.';

  const frag = document.createDocumentFragment();
  res.slice(0, MAX).forEach(d => {
    const row = document.createElement('div'); row.className = 'rr-row';
    row.innerHTML = `<div class="rr-date">${prettyDate(d)}</div>
      <div><span class="rr-to">${escp(d.to)}</span> <span class="rr-prev">— ${escp(d.preview.slice(0, 110))}</span></div>
      <div class="rr-place">${escp(d.place || d.city || '')}</div>`;
    row.onmousemove = ev => showTip(d, ev);
    row.onmouseleave = hideTip;
    row.onclick = () => openLetter(d.id);
    frag.appendChild(row);
  });
  list.innerHTML = ''; list.appendChild(frag);
}
function escp(s){return String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
