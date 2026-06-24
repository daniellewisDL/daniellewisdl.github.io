import { state, periodColor, PERIODS, fmtInt } from '../data.js';
import { hideTip, moveTip, openLetter } from '../letter.js';

let world = null, period = 0;   // 0 = all

export async function renderAtlas(el) {
  el.innerHTML = `
    <div class="view-head"><div class="section-orn">❦</div><h2>Atlas</h2>
    <p>Where each letter was written — by town. The inset opens up London. Hover to glimpse · click to read.</p></div>
    <div class="controls">
      <label>Chapter</label>
      <span class="seg" id="at-per">
        <button data-p="0" class="on">All</button>
        ${PERIODS.map((p,i)=>`<button data-p="${i+1}" title="${p}">${i+1}</button>`).join('')}
      </span>
      <span class="muted" id="at-cap" style="font-style:italic"></span>
    </div>
    <div class="panel" style="position:relative;padding:6px"><div id="at-map" class="atlas-map"></div>
      <div style="position:absolute;left:12px;bottom:8px;font-style:italic;color:var(--ink-faint);font-size:11px">drag · scroll to zoom deep</div></div>
    <div style="display:grid;grid-template-columns:1.3fr 1fr;gap:14px;margin-top:12px;align-items:start" id="at-lower">
      <div class="panel"><h3 style="text-align:center;font-weight:500;font-size:16px;margin:0 0 2px">His London addresses <span class="muted" style="font-size:12px;font-style:italic">· by life-chapter</span></h3>
        <div id="at-london" class="atlas-low"></div></div>
      <div class="panel"><h3 style="text-align:center;font-weight:500;font-size:16px;margin:0 0 4px">Principal datelines</h3>
        <div id="at-top" class="atlas-low scrollx"></div></div>
    </div>`;

  el.querySelector('#at-per').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    period = +b.dataset.p;
    el.querySelectorAll('#at-per button').forEach(x => x.classList.toggle('on', x === b));
    update();
  });

  if (!world) world = await fetch('data/world-50m.json').then(r => r.json());
  build(el.querySelector('#at-map'));
  buildLondon(el.querySelector('#at-london'));
  update();
}

// city centroids (mean of member coords)
function cityData(letters) {
  return d3.rollups(letters, v => ({
    n: v.length, country: v[0].country,
    lat: d3.mean(v, d => +d.lat), lon: d3.mean(v, d => +d.lon),
    rep: v.slice().sort((a, b) => (b.iso > a.iso ? 1 : -1))[0]
  }), d => d.city || d.place).map(([city, o]) => ({ city, ...o }));
}

let proj, gDots, capEl, topEl;
const rad = n => Math.min(26, 2.5 + 2.5 * Math.log(n + 1));   // stronger tail-off
function build(host) {
  host.innerHTML = '';
  const cities = cityData(state.letters.filter(d => d.lat != null));
  const fc = { type: 'MultiPoint', coordinates: cities.map(d => [d.lon, d.lat]) };
  const W = host.clientWidth || 960, H = host.clientHeight || 540;
  proj = d3.geoMercator().fitExtent([[30, 30], [W - 30, H - 30]], fc);
  const path = d3.geoPath(proj);
  const svg = d3.select(host).append('svg').attr('viewBox', `0 0 ${W} ${H}`).attr('width', '100%')
    .style('background', 'linear-gradient(180deg,#dfe7e6,#e9e0c8)');
  const root = svg.append('g');
  root.append('path').datum(d3.geoGraticule10()).attr('d', path)
    .attr('fill', 'none').attr('stroke', '#b9c4bf').attr('stroke-width', .4).attr('opacity', .5);
  const land = topojson.feature(world, world.objects.countries);
  root.append('g').selectAll('path').data(land.features).join('path').attr('d', path)
    .attr('fill', '#e7d8b0').attr('stroke', '#9a7c5a').attr('stroke-width', .5).attr('stroke-linejoin', 'round');
  gDots = root.append('g');
  svg.call(d3.zoom().scaleExtent([1, 80]).on('zoom', e => {
    root.attr('transform', e.transform);
    gDots.selectAll('circle').attr('r', d => rad(d.n) / Math.sqrt(e.transform.k))
      .attr('stroke-width', 1 / e.transform.k);
  }));
  capEl = document.getElementById('at-cap');
  topEl = document.getElementById('at-top');
}

function update() {
  const all = state.letters.filter(d => d.lat != null && (period === 0 || d.pern === period));
  const cities = cityData(all).sort((a, b) => b.n - a.n);
  capEl.textContent = `${fmtInt(all.length)} located letters · ${cities.length} towns`
    + (period ? ' · ' + PERIODS[period - 1] : '');

  const t = d3.transition().duration(500);
  gDots.selectAll('circle').data(cities, d => d.city).join(
    enter => enter.append('circle').attr('class', 'dot')
      .attr('cx', d => proj([d.lon, d.lat])[0]).attr('cy', d => proj([d.lon, d.lat])[1])
      .attr('fill', d => period ? periodColor(period) : '#7b2e2e').attr('fill-opacity', .62)
      .attr('stroke', '#fbf4e3').attr('stroke-width', 1).attr('r', d => rad(d.n)).style('cursor', 'pointer')
      .on('mousemove', (ev, d) => tipCity(ev, d)).on('mouseleave', hideTip)
      .on('click', (ev, d) => { window.__rrFilter && window.__rrFilter({ city: d.city }); location.hash = 'reading'; }),
    upd => upd.call(u => u.transition(t).attr('r', d => rad(d.n))
      .attr('fill', d => period ? periodColor(period) : '#7b2e2e')),
    exit => exit.call(ex => ex.transition(t).attr('r', 0).remove())
  );
  gDots.selectAll('circle').sort((a, b) => b.n - a.n);

  // building-level datelines table (his specific desks)
  const places = d3.rollups(all, v => v.length, d => d.place).sort((a, b) => b[1] - a[1]);
  topEl.innerHTML = `<table class="pivot" style="width:100%;font-size:14px"><tr><th class="rowh">address</th><th>letters</th></tr>` +
    places.slice(0, 12).map(([p, n]) => `<tr data-place="${escp(p)}"><td class="rowh">${escp(p)}</td><td>${n}</td></tr>`).join('') + `</table>`;
  topEl.querySelectorAll('tr[data-place]').forEach(tr => tr.onclick = () => {
    window.__rrFilter && window.__rrFilter({ place: tr.dataset.place }); location.hash = 'reading';
  });

  updateLondon();
}

// ---- London inset: a schematic central-London street map + his addresses ----
const LONDON = {
  river: [[-0.188,51.487],[-0.170,51.484],[-0.158,51.486],[-0.147,51.485],[-0.137,51.491],
    [-0.128,51.498],[-0.122,51.501],[-0.113,51.506],[-0.104,51.509],[-0.096,51.510],
    [-0.088,51.508],[-0.080,51.506],[-0.075,51.502]],
  parks: [
    { name: "Regent's Park", ring: [[-0.167,51.526],[-0.153,51.524],[-0.146,51.530],[-0.149,51.538],[-0.161,51.540],[-0.168,51.534],[-0.167,51.526]] },
    { name: 'Hyde Park', ring: [[-0.179,51.501],[-0.151,51.502],[-0.150,51.513],[-0.176,51.512],[-0.179,51.501]] },
  ],
  roads: [
    { n: 'Marylebone Rd', l: [[-0.166,51.522],[-0.150,51.5225],[-0.134,51.5235],[-0.124,51.524]] },
    { n: 'Oxford St', l: [[-0.163,51.514],[-0.145,51.5145],[-0.131,51.516]] },
    { n: 'Edgware Rd', l: [[-0.170,51.521],[-0.164,51.512],[-0.158,51.503]] },
    { n: 'Baker St', l: [[-0.158,51.523],[-0.156,51.514]] },
    { n: 'Regent St', l: [[-0.145,51.524],[-0.142,51.516],[-0.139,51.510]] },
    { n: 'The Strand', l: [[-0.122,51.510],[-0.110,51.512],[-0.099,51.513]] },
    { n: 'City Rd', l: [[-0.122,51.529],[-0.108,51.533],[-0.097,51.535]] },
  ],
};

let lproj, lsvg, lW, lH;
function buildLondon(host) {
  host.innerHTML = '';
  lW = host.clientWidth || 520; lH = host.clientHeight || 360;
  // fixed central-London frame so streets, river and addresses align
  const bounds = { type: 'MultiPoint', coordinates: [[-0.190, 51.487], [-0.073, 51.560]] };
  lproj = d3.geoMercator().fitExtent([[14, 12], [lW - 14, lH - 12]], bounds);
  const path = d3.geoPath(lproj);
  lsvg = d3.select(host).append('svg').attr('viewBox', `0 0 ${lW} ${lH}`).attr('width', '100%').attr('height', '100%')
    .style('background', '#efe6cf');
  // parks
  lsvg.append('g').selectAll('path').data(LONDON.parks).join('path')
    .attr('d', d => path({ type: 'Polygon', coordinates: [d.ring] }))
    .attr('fill', '#cdd9b0').attr('opacity', .6).attr('stroke', '#a9b884').attr('stroke-width', .5);
  lsvg.selectAll('text.pk').data(LONDON.parks).join('text').attr('class', 'pk')
    .attr('x', d => lproj(d3.polygonCentroid(d.ring))[0]).attr('y', d => lproj(d3.polygonCentroid(d.ring))[1])
    .attr('text-anchor', 'middle').attr('font-size', 9).attr('fill', '#6f7d4e').attr('font-style', 'italic').text(d => d.name);
  // roads
  lsvg.append('g').selectAll('path').data(LONDON.roads).join('path')
    .attr('d', d => path({ type: 'LineString', coordinates: d.l }))
    .attr('fill', 'none').attr('stroke', '#c9b896').attr('stroke-width', 1.6).attr('opacity', .8);
  lsvg.selectAll('text.rd').data(LONDON.roads).join('text').attr('class', 'rd')
    .attr('x', d => lproj(d.l[Math.floor(d.l.length/2)])[0]).attr('y', d => lproj(d.l[Math.floor(d.l.length/2)])[1] - 3)
    .attr('text-anchor', 'middle').attr('font-size', 8).attr('fill', '#9a875f').text(d => d.n);
  // river
  lsvg.append('path').attr('d', path({ type: 'LineString', coordinates: LONDON.river }))
    .attr('fill', 'none').attr('stroke', '#9db9c4').attr('stroke-width', 6).attr('opacity', .85).attr('stroke-linecap', 'round');
  lsvg.append('text').attr('x', lproj([-0.115, 51.505])[0]).attr('y', lproj([-0.115, 51.505])[1] + 13)
    .attr('font-size', 9).attr('fill', '#5f7d8a').attr('font-style', 'italic').text('R. Thames');
  lsvg.append('g').attr('class', 'lnodes');
  lsvg.append('g').attr('class', 'llabels');
}
const lrad = n => Math.min(18, 3 + 2.0 * Math.log(n + 1));
function updateLondon() {
  const sel = state.letters.filter(d => d.city === 'London' && d.lat != null
    && (period === 0 || d.pern === period));
  const nodes = d3.rollups(sel, v => ({
    n: v.length, per: d3.mode(v, d => d.pern) || 1,
    lat: +v[0].lat, lon: +v[0].lon,
    rep: v.slice().sort((a, b) => (b.iso > a.iso ? 1 : -1))[0]
  }), d => d.place).map(([place, o]) => {
    const [x0, y0] = lproj([o.lon, o.lat]);
    return { place, ...o, x: x0, y: y0, x0, y0 };
  });
  const sim = d3.forceSimulation(nodes)
    .force('x', d3.forceX(d => d.x0).strength(.25))
    .force('y', d3.forceY(d => d.y0).strength(.25))
    .force('collide', d3.forceCollide(d => lrad(d.n) + 1.5))
    .stop();
  for (let i = 0; i < 160; i++) sim.tick();

  const g = lsvg.select('.lnodes');
  g.selectAll('circle').data(nodes, d => d.place).join(
    enter => enter.append('circle').attr('stroke', '#fbf4e3').attr('stroke-width', 1)
      .style('cursor', 'pointer')
      .on('mousemove', (ev, d) => tipPlace(ev, d)).on('mouseleave', hideTip)
      .on('click', (ev, d) => { window.__rrFilter && window.__rrFilter({ place: d.place }); location.hash = 'reading'; }),
    u => u, e => e.remove())
    .attr('cx', d => d.x).attr('cy', d => d.y)
    .attr('r', d => lrad(d.n)).attr('fill', d => periodColor(d.per)).attr('fill-opacity', .7);

  lsvg.select('.llabels').selectAll('text').data(nodes.filter(d => d.n >= 25), d => d.place).join(
    enter => enter.append('text').attr('font-size', 10).attr('fill', 'var(--ink)')
      .attr('text-anchor', 'middle').attr('pointer-events', 'none'),
    u => u, e => e.remove())
    .attr('x', d => d.x).attr('y', d => d.y + lrad(d.n) + 9)
    .text(d => d.place.replace(/,.*$/, '').replace(/^\d+[.,]?\s*/, ''));
}

function tipCity(ev, d) {
  const t = document.getElementById('tip');
  t.innerHTML = `<div class="t-to">${escp(d.city)}</div>
    <div class="t-meta">${fmtInt(d.n)} letter${d.n!==1?'s':''}${d.country?' · '+escp(d.country):''}</div>
    <div class="t-prev">“${escp(d.rep.preview)}”<br><span style="font-style:italic">— to ${escp(d.rep.to)}, ${d.rep.y}</span></div>
    <div class="t-hint">click for all letters from here ❦</div>`;
  t.hidden = false; moveTip(ev);
}
function tipPlace(ev, d) {
  const t = document.getElementById('tip');
  t.innerHTML = `<div class="t-to">${escp(d.place)}</div>
    <div class="t-meta">${fmtInt(d.n)} letter${d.n!==1?'s':''}</div>
    <div class="t-prev">“${escp(d.rep.preview)}”<br><span style="font-style:italic">— to ${escp(d.rep.to)}, ${d.rep.y}</span></div>
    <div class="t-hint">click to read them ❦</div>`;
  t.hidden = false; moveTip(ev);
}
function escp(s){return String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
