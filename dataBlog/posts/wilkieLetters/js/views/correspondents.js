import { state, catColor, CAT_COLORS, fmtInt } from '../data.js';
import { showTip, hideTip, moveTip, openLetter } from '../letter.js';

let sortBy = 'first', topN = 44;

export function renderCorrespondents(el) {
  el.innerHTML = `
    <div class="view-head"><div class="section-orn">❦</div><h2>Correspondents</h2>
    <p>Each lane spans a person's first letter to their last; every tick is a letter. Hover · click to read.</p></div>
    <div class="controls">
      <label>Order by</label>
      <span class="seg" id="cp-sort">
        <button data-s="first" class="on">First appearance</button>
        <button data-s="vol">Letters received</button>
        <button data-s="span">Length of acquaintance</button>
      </span>
      <label>Show top</label>
      <span class="seg" id="cp-n">
        <button data-n="44" class="on">44</button><button data-n="70">70</button><button data-n="120">120</button>
      </span>
    </div>
    <div class="panel" style="display:flex;flex-direction:column"><div id="cp-chart" class="chart-fill" style="flex:1"></div><div class="legend" id="cp-leg"></div></div>`;
  el.querySelector('#cp-sort').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return; sortBy = b.dataset.s;
    el.querySelectorAll('#cp-sort button').forEach(x => x.classList.toggle('on', x === b));
    draw(el.querySelector('#cp-chart'));
  });
  el.querySelector('#cp-n').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return; topN = +b.dataset.n;
    el.querySelectorAll('#cp-n button').forEach(x => x.classList.toggle('on', x === b));
    draw(el.querySelector('#cp-chart'));
  });
  draw(el.querySelector('#cp-chart'));
  const cats = [...new Set(state.letters.map(d => d.cat))].filter(c => CAT_COLORS[c] && c !== 'Unidentified' && c !== 'Other');
  el.querySelector('#cp-leg').innerHTML = cats.map(c =>
    `<span><i style="background:${catColor(c)}"></i>${c}</span>`).join('');
}

const frac = d => d.iso.length >= 7
  ? d.y + (+d.iso.slice(5, 7) - 1) / 12 + (d.iso.length === 10 ? (+d.iso.slice(8, 10) - 1) / 365 : 0)
  : (d.y || 0) + 0.5;

function draw(host) {
  host.innerHTML = '';
  const groups = d3.rollups(
    state.letters.filter(d => d.to && !/Unidentified|Unknown/.test(d.to)),
    v => {
      const dated = v.filter(d => d.y);
      return { n: v.length, cat: v[0].cat, dated,
        first: d3.min(dated, d => d.y), last: d3.max(dated, d => d.y) };
    }, d => d.to)
    .map(([name, o]) => ({ name, ...o }))
    .filter(g => g.first != null);

  const cmp = { first: (a, b) => a.first - b.first || b.n - a.n,
    vol: (a, b) => b.n - a.n, span: (a, b) => (b.last - b.first) - (a.last - a.first) || b.n - a.n };
  const top = groups.sort((a, b) => b.n - a.n).slice(0, topN).sort(cmp[sortBy]);

  const W = host.clientWidth || 1100, m = { t: 24, r: 64, b: 26, l: 188 };
  const avail = Math.max(330, host.clientHeight || 800);
  const laneH = 35
  // const laneH = Math.min(40, Math.max(10.5, (avail - m.t - m.b) / top.length));
  const H = m.t + top.length * laneH + m.b;
  const x = d3.scaleLinear().domain([1831, 1890]).range([m.l, W - m.r]);
  const svg = d3.select(host).append('svg').attr('viewBox', `0 0 ${W} ${H}`).attr('width', '100%');

  // period backdrop
  [[1851,1859],[1870,1879]].forEach(p => svg.append('rect')
    .attr('x', x(p[0])).attr('width', x(p[1]+1) - x(p[0])).attr('y', m.t - 6)
    .attr('height', H - m.t - m.b + 12).attr('fill', '#8c5f33').attr('opacity', .05));
  // year axes
  [m.t - 6, H - m.b + 6].forEach(yy => svg.append('g').attr('class', 'axis').attr('transform', `translate(0,${yy})`)
    .call(d3.axisBottom(x).tickValues(d3.range(1835, 1890, 5)).tickFormat(d3.format('d')).tickSize(yy < H / 2 ? -4 : 4)));

  const lane = svg.append('g').selectAll('g').data(top).join('g')
    .attr('transform', (d, i) => `translate(0,${m.t + i * laneH + laneH / 2})`);

  // gridline + name
  lane.append('line').attr('x1', m.l).attr('x2', W - m.r).attr('stroke', 'var(--rule-soft)').attr('stroke-width', .4);
  lane.append('text').attr('x', m.l - 10).attr('y', 4).attr('text-anchor', 'end')
    .attr('font-size', 12.5).attr('font-family', 'var(--display)').attr('fill', 'var(--ink)')
    .style('cursor', 'pointer').text(d => d.name.length > 26 ? d.name.slice(0, 25) + '…' : d.name)
    .on('click', (e, d) => { window.__rrFilter && window.__rrFilter({ recipient: d.name }); location.hash = 'reading'; })
    .append('title').text(d => d.name);
  // span bar
  lane.append('rect').attr('x', d => x(d.first)).attr('width', d => Math.max(2, x(d.last + 0.9) - x(d.first)))
    .attr('y', -2.5).attr('height', 5).attr('rx', 2.5).attr('fill', d => catColor(d.cat)).attr('opacity', .22);
  // letter ticks
  lane.each(function (d) {
    d3.select(this).selectAll('line.tk').data(d.dated).join('line').attr('class', 'tk')
      .attr('x1', t => x(frac(t))).attr('x2', t => x(frac(t))).attr('y1', -6).attr('y2', 6)
      .attr('stroke', catColor(d.cat)).attr('stroke-width', 1.4).attr('opacity', .55)
      .style('cursor', 'pointer')
      .on('mousemove', (ev, t) => { showTip(t, ev); d3.select(ev.currentTarget).attr('opacity', 1).attr('stroke-width', 2.4); })
      .on('mouseleave', (ev) => { hideTip(); d3.select(ev.currentTarget).attr('opacity', .55).attr('stroke-width', 1.4); })
      .on('click', (ev, t) => openLetter(t.id));
  });
  // count at right
  lane.append('text').attr('x', W - m.r + 8).attr('y', 4).attr('font-size', 11.5)
    .attr('fill', 'var(--ink-faint)').attr('font-style', 'italic').text(d => d.n);
}
