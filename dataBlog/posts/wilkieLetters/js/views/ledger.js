import { state, fmtInt } from '../data.js';
import { hideTip, moveTip } from '../letter.js';

const DIMS = {
  cat:    { label: 'Recipient class', get: d => d.cat },
  dec:    { label: 'Decade', get: d => d.dec, order: ['1830s','1840s','1850-54','1855-59','1860-64','1865-69','1870-74','1875-79','1880-84','1885-89'] },
  pern:   { label: 'Life-period', get: d => d.per || '(undated)' },
  tprim:  { label: 'Subject', get: d => d.tprim || '(unstated)' },
  atype:  { label: 'Manuscript', get: d => d.atype || '(none)' },
  country:{ label: 'Country', get: d => d.country || '(unknown)' },
  lang:   { label: 'Language', get: d => d.lang },
  band:   { label: 'Length', get: d => d.band || '(none)', order: ['short','medium','long'] },
  wd:     { label: 'Weekday', get: d => d.wd || '(undated)', order: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday','(undated)'] },
};
let rowD = 'cat', colD = 'dec', measure = 'count';

export function renderLedger(el) {
  const opts = Object.entries(DIMS).map(([k, v]) => `<option value="${k}">${v.label}</option>`).join('');
  el.innerHTML = `
    <div class="view-head"><div class="section-orn">❦</div><h2>Ledger</h2>
    <p>Cross-tabulate any two dimensions; darker cells hold more letters. Click a cell to read it.</p></div>
    <div class="controls">
      <label>Rows</label><select id="lg-row">${opts}</select>
      <label>Columns</label><select id="lg-col">${opts}</select>
      <label>Show</label><span class="seg" id="lg-meas"><button data-m="count" class="on">Letter counts</button><button data-m="avgwc">Avg. length</button></span>
    </div>
    <div class="panel scrollx"><div id="lg-table" class="center"></div></div>`;
  el.querySelector('#lg-row').value = rowD; el.querySelector('#lg-col').value = colD;
  el.querySelector('#lg-row').onchange = e => { rowD = e.target.value; draw(); };
  el.querySelector('#lg-col').onchange = e => { colD = e.target.value; draw(); };
  el.querySelector('#lg-meas').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return; measure = b.dataset.m;
    el.querySelectorAll('#lg-meas button').forEach(x => x.classList.toggle('on', x === b)); draw();
  });
  draw();
}

function order(dim, keys) {
  const o = DIMS[dim].order;
  if (o) return o.filter(k => keys.includes(k));
  return keys.sort((a, b) => d3.descending(catTotal(dim, a), catTotal(dim, b)));
}
let _cache;
function catTotal(dim, k) { return (_cache && _cache.get(k)) || 0; }

function draw() {
  const host = document.getElementById('lg-table');
  const L = state.letters;
  const R = DIMS[rowD].get, C = DIMS[colD].get;
  const rowsAll = d3.rollup(L, v => v.length, R);
  _cache = rowsAll;
  const rowKeys = order(rowD, [...rowsAll.keys()]);
  const colTot = d3.rollup(L, v => v.length, C); _cache = colTot;
  const colKeys = order(colD, [...colTot.keys()]);
  _cache = null;

  const cell = d3.rollup(L, v => ({ n: v.length, avg: Math.round(d3.mean(v, d => d.wc)) }), R, C);
  const val = (r, c) => { const o = cell.get(r)?.get(c); return o ? (measure === 'count' ? o.n : o.avg) : 0; };
  const maxV = d3.max(rowKeys, r => d3.max(colKeys, c => val(r, c))) || 1;
  const color = d3.scaleSequential(d3.interpolateRgb('#f3e9d2', '#5a2020')).domain([0, maxV]);

  let html = `<table class="pivot"><tr><th class="rowh">${DIMS[rowD].label} ╲ ${DIMS[colD].label}</th>`;
  colKeys.forEach(c => html += `<th>${escp(c)}</th>`);
  html += `<th class="tot">∑</th></tr>`;
  rowKeys.forEach(r => {
    html += `<tr><th class="rowh">${escp(r)}</th>`;
    let rt = 0;
    colKeys.forEach(c => {
      const v = val(r, c); const n = cell.get(r)?.get(c)?.n || 0; rt += (measure==='count'?v:n);
      const bg = v ? color(v) : 'transparent';
      const fg = v > maxV * 0.55 ? '#f3e9d2' : 'var(--ink)';
      html += `<td class="cell" data-r="${escp(r)}" data-c="${escp(c)}" data-n="${n}" data-v="${v}"
        style="background:${bg};color:${fg}">${v || ''}</td>`;
    });
    html += `<td class="tot">${fmtInt(rt)}</td></tr>`;
  });
  html += `<tr><th class="rowh tot">∑</th>`;
  colKeys.forEach(c => html += `<td class="tot">${fmtInt(colTot.get(c) || 0)}</td>`);
  html += `<td class="tot">${fmtInt(L.length)}</td></tr></table>`;
  host.innerHTML = html;

  host.querySelectorAll('td.cell').forEach(td => {
    td.onmousemove = ev => {
      const t = document.getElementById('tip');
      t.innerHTML = `<div class="t-to">${escp(td.dataset.r)} · ${escp(td.dataset.c)}</div>
        <div class="t-prev">${fmtInt(td.dataset.n)} letters${measure==='avgwc'&&+td.dataset.v?' · avg '+td.dataset.v+' words':''}</div>
        <div class="t-hint">${+td.dataset.n?'click to read them ❧':''}</div>`;
      t.hidden = false; moveTip(ev);
    };
    td.onmouseleave = hideTip;
    td.onclick = () => { if (!+td.dataset.n) return;
      const f = {}; f[mapKey(rowD)] = td.dataset.r; f[mapKey(colD)] = td.dataset.c;
      window.__rrFilter && window.__rrFilter(f); location.hash = 'reading'; };
  });
}
const mapKey = d => ({ cat:'cat', dec:'dec', pern:'period', tprim:'topic', atype:'atype',
  country:'country', lang:'lang', band:'band', wd:'wd' }[d]);
function escp(s){return String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
