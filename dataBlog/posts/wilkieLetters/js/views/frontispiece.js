import { state, fmtInt, periodColor, PERIODS, PERIOD_COLORS } from '../data.js';
import { openLetter, showTip, hideTip } from '../letter.js';

export function renderFrontispiece(el) {
  const L = state.letters;
  const corr = new Set(L.filter(d => !/Unidentified/.test(d.to)).map(d => d.to_id)).size;
  const places = new Set(L.filter(d => d.lat != null).map(d => d.place)).size;
  const archives = new Set(L.filter(d => d.arch).map(d => d.arch)).size;
  const words = d3.sum(L, d => d.wc);
  const countries = new Set(L.filter(d => d.country).map(d => d.country)).size;

  el.innerHTML = `
    <div class="fp-head">
      <h2>“I am to be done good to in spite of myself.”</h2>
      <p>The surviving correspondence of Wilkie Collins — novelist of sensation, friend of Dickens —
      across time, place, and company. Hover to glimpse a letter; click to read it whole.</p>
    </div>
    <div class="stat-grid">
      ${stat(L.length, 'letters')}
      ${stat(corr, 'correspondents')}
      ${stat('1831–1889', 'years spanned')}
      ${stat(places, 'places written from')}
      ${stat(countries, 'countries')}
      ${stat(archives, 'archives holding originals')}
      ${stat(Math.round(words/1000) + 'k', 'words penned')}
      ${stat('706', 'people in his circle')}
    </div>
    <div class="panel">
      <h3 style="text-align:center;font-weight:500">The arc of a correspondence</h3>
      <p class="center muted" style="font-style:italic;margin:2px 0 6px">
        Letters surviving from each year, shaded by the chapter of his life</p>
      <div id="fp-arc"></div>
      <div class="legend" id="fp-leg"></div>
    </div>
    <div class="panel" style="margin-top:18px">
      <h3 style="text-align:center;font-weight:500">A letter, taken at random</h3>
      <div id="fp-feat" class="center"></div>
    </div>`;

  drawArc(document.getElementById('fp-arc'));
  document.getElementById('fp-leg').innerHTML = PERIODS.map((p, i) =>
    `<span><i style="background:${PERIOD_COLORS[i]}"></i>${p}</span>`).join('');
  feature();
}

const stat = (n, l) => `<div class="stat"><div class="num">${typeof n==='number'?fmtInt(n):n}</div><div class="lab">${l}</div></div>`;

function drawArc(host) {
  const L = state.letters.filter(d => d.y && d.y <= 1895);
  const byYear = d3.rollups(L, v => ({ n: v.length, p: d3.mode(v, d => d.pern) || 1 }),
    d => d.y).sort((a, b) => a[0] - b[0]);
  const W = host.clientWidth || 900, H = 230, m = { t: 10, r: 14, b: 26, l: 38 };
  const x = d3.scaleLinear().domain([1831, 1889]).range([m.l, W - m.r]);
  const y = d3.scaleLinear().domain([0, d3.max(byYear, d => d[1].n)]).nice().range([H - m.b, m.t]);
  const svg = d3.select(host).append('svg').attr('viewBox', `0 0 ${W} ${H}`).attr('width', '100%');
  svg.append('g').attr('class', 'axis').attr('transform', `translate(0,${H - m.b})`)
    .call(d3.axisBottom(x).ticks(8).tickFormat(d3.format('d')));
  svg.append('g').attr('class', 'axis').attr('transform', `translate(${m.l},0)`)
    .call(d3.axisLeft(y).ticks(4));
  const bw = (x(1889) - x(1831)) / (1889 - 1831) - 1.5;
  svg.selectAll('rect.bar').data(byYear).join('rect').attr('class', 'bar')
    .attr('x', d => x(d[0]) - bw / 2).attr('width', bw)
    .attr('y', d => y(d[1].n)).attr('height', d => y(0) - y(d[1].n))
    .attr('fill', d => periodColor(d[1].p))
    .append('title').text(d => `${d[0]}: ${d[1].n} letters`);
}

function feature() {
  const host = document.getElementById('fp-feat');
  const pool = state.letters.filter(d => d.wc > 60 && d.wc < 400 && d.y);
  const draw = () => {
    const l = pool[Math.floor(Math.random() * pool.length)];
    host.innerHTML = `
      <blockquote style="font-family:var(--fell);font-size:19px;line-height:1.7;max-width:620px;margin:8px auto;color:var(--ink)">
        “${esc(l.preview)}”
      </blockquote>
      <div style="font-style:italic;color:var(--oxblood)">— to ${esc(l.to)}, ${l.y}</div>
      <div class="btn-row">
        <button id="fp-read" class="btn">Read this letter ❦</button>
        <button id="fp-another" class="btn ghost">Another ↻</button>
      </div>`;
    document.getElementById('fp-read').onclick = () => openLetter(l.id);
    document.getElementById('fp-another').onclick = draw;
  };
  draw();
}
function esc(s){return String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
