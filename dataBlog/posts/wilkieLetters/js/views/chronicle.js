import { state, catColor, periodColor, PERIODS, PERIOD_COLORS, TOPIC_COLORS, fmtInt } from '../data.js';
import { showTip, hideTip, moveTip } from '../letter.js';

const DIMS = {
  cat: { label: 'Recipient', key: d => d.cat, color: catColor },
  tprim: { label: 'Subject', key: d => d.tprim || 'unstated', color: t => TOPIC_COLORS[t] || '#b8a98c' },
  per: { label: 'Life-period', key: d => d.pern || 0, color: n => periodColor(n) },
};
let dim = 'cat';

export function renderChronicle(el) {
  el.innerHTML = `
    <div class="view-head">
      <div class="section-orn">❦</div><h2>Chronicle</h2>
      <p>Letters per year, banded by life-chapter; lower dots are life-events. Click a column to read it.</p>
    </div>
    <div class="controls">
      <label>Stack by</label>
      <span class="seg" id="ch-dim">
        <button data-d="cat" class="on">Recipient</button>
        <button data-d="tprim">Subject</button>
        <button data-d="per">Life-period</button>
      </span>
    </div>
    <div class="panel" style="display:flex;flex-direction:column"><div id="ch-chart" class="chart-fill" style="flex:1"></div><div class="legend" id="ch-leg"></div></div>`;
  el.querySelector('#ch-dim').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    dim = b.dataset.d;
    el.querySelectorAll('#ch-dim button').forEach(x => x.classList.toggle('on', x === b));
    draw(el.querySelector('#ch-chart'));
  });
  draw(el.querySelector('#ch-chart'));
}

function draw(host) {
  host.innerHTML = '';
  const cfg = DIMS[dim];
  const L = state.letters.filter(d => d.y && d.y >= 1831 && d.y <= 1889);
  const years = d3.range(1831, 1890);
  const keys = [...new Set(L.map(cfg.key))].sort((a, b) => (a > b ? 1 : -1));
  const byYear = new Map(d3.rollup(L, v => d3.rollup(v, x => x.length, cfg.key), d => d.y));
  const rows = years.map(y => {
    const o = { y }; keys.forEach(k => o[k] = (byYear.get(y)?.get(k)) || 0); return o;
  });
  const stack = d3.stack().keys(keys)(rows);
  const W = host.clientWidth || 960, H = Math.max(680, host.clientHeight || 1120), m = { t: 18, r: 16, b: 104, l: 52 };
  const x = d3.scaleBand().domain(years).range([m.l, W - m.r]).padding(0.12);
  const y = d3.scaleLinear().domain([0, d3.max(rows, r => d3.sum(keys, k => r[k]))]).nice().range([H - m.b, m.t]);
  const svg = d3.select(host).append('svg').attr('viewBox', `0 0 ${W} ${H}`).attr('width', '100%');

  // biographical-period backdrop
  const periods = [[1831,1840,1],[1841,1850,2],[1851,1859,3],[1860,1869,4],[1870,1879,5],[1880,1889,6]];
  svg.append('g').selectAll('rect.per').data(periods).join('rect')
    .attr('x', d => x(d[0]) - x.bandwidth()*0.1).attr('width', d => x(d[1]) - x(d[0]) + x.bandwidth()*1.1)
    .attr('y', m.t).attr('height', H - m.b - m.t).attr('fill', d => periodColor(d[2])).attr('opacity', 0.07);
  const SHORT = ['Childhood','Apprenticeship','Dickens circle','Sensation novels','Illness & mission','Final decade'];
  svg.append('g').selectAll('line.perdiv').data(periods.slice(1)).join('line').attr('class','perdiv')
    .attr('x1', d => x(d[0]) - x.bandwidth()*0.1).attr('x2', d => x(d[0]) - x.bandwidth()*0.1)
    .attr('y1', m.t).attr('y2', H - m.b).attr('stroke','var(--rule)').attr('stroke-dasharray','2 4').attr('opacity',.5);
  svg.selectAll('text.perlab').data(periods.filter(d => x(d[1]) - x(d[0]) > 70)).join('text').attr('class','perlab')
    .attr('x', d => (x(d[0]) + x(d[1]))/2 + x.bandwidth()/2).attr('y', m.t + 11)
    .attr('text-anchor','middle').attr('font-size',10.5).attr('font-style','italic')
    .attr('fill','var(--ink-faint)').attr('opacity',.75)
    .text(d => SHORT[d[2]-1]);

  // axes
  svg.append('g').attr('class','axis').attr('transform',`translate(0,${H-m.b})`)
    .call(d3.axisBottom(x).tickValues(years.filter(d=>d%5===0)).tickFormat(d3.format('d')));
  svg.append('g').attr('class','axis').attr('transform',`translate(${m.l},0)`).call(d3.axisLeft(y).ticks(6));

  // stacked columns
  const g = svg.append('g');
  g.selectAll('g.layer').data(stack).join('g').attr('class','layer')
    .attr('fill', s => cfg.color(s.key))
    .selectAll('rect').data(s => s.map(p => ({ p, key: s.key }))).join('rect')
    .attr('class','bar')
    .attr('x', d => x(d.p.data.y)).attr('width', x.bandwidth())
    .attr('y', d => y(d.p[1])).attr('height', d => Math.max(0, y(d.p[0]) - y(d.p[1])))
    .style('cursor','pointer')
    .on('mousemove', (ev, d) => { tipAgg(ev, d.p.data.y, d.key, d.p[1]-d.p[0]); })
    .on('mouseleave', hideTip)
    .on('click', (ev, d) => drill(d.p.data.y, d.key));

  // events track
  const ev = state.chronology.filter(e => +e.year >= 1831 && +e.year <= 1889);
  const ty = H - m.b + 34;
  svg.append('text').attr('x', m.l).attr('y', ty - 12).attr('font-size',11).attr('font-style','italic')
    .attr('fill','var(--gold)').text('— events of his life (○ life · ● publication & performance) —');
  const jitter = {};
  svg.append('g').selectAll('circle.ev').data(ev).join('circle').attr('class','ev')
    .attr('cx', e => x(+e.year) + x.bandwidth()/2)
    .attr('cy', e => { const k=e.year; jitter[k]=(jitter[k]||0)+1; return ty + ((jitter[k]%4))*9; })
    .attr('r', 3.2).attr('fill', e => e.category==='publication' ? 'var(--oxblood)' : 'none')
    .attr('stroke', e => e.category==='publication' ? 'none' : 'var(--ink-soft)')
    .style('cursor','help')
    .on('mousemove', (event, e) => tipEvent(event, e)).on('mouseleave', hideTip);

  document.getElementById('ch-leg').innerHTML = keys.map(k =>
    `<span><i style="background:${cfg.color(k)}"></i>${dim==='per'?(PERIODS[k-1]?.split(' (')[0]||'undated'):k}</span>`).join('');
}

function tipAgg(ev, year, key, n) {
  const t = document.getElementById('tip');
  t.innerHTML = `<div class="t-to">${year}</div><div class="t-meta">${labelFor(key)}</div>
    <div class="t-prev">${fmtInt(n)} letter${n!==1?'s':''}</div><div class="t-hint">click to read them ❧</div>`;
  t.hidden = false; moveTip(ev);
}
function tipEvent(ev, e) {
  const t = document.getElementById('tip');
  t.innerHTML = `<div class="t-to">${e.year}${e.date_detail?' · '+e.date_detail:''}</div>
    <div class="t-meta">${e.category==='publication'?'publication / performance':'life event'}</div>
    <div class="t-prev">${escp(e.event)}</div>`;
  t.hidden = false; moveTip(ev);
}
function labelFor(key){ return dim==='per' ? (PERIODS[key-1]||'undated') : key; }
function drill(year, key) {
  const f = { year };
  if (dim === 'cat') f.cat = key; else if (dim === 'tprim') f.topic = key === 'unstated' ? '' : key;
  else f.period = key;
  window.__rrFilter && window.__rrFilter(f);
  location.hash = 'reading';
}
function escp(s){return String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
