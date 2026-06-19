/* =============================================================================
   VC Term Sheet Explorer — D3 application
   ========================================================================== */
(function () {
"use strict";
const D = DATA;
const YEARS = D.meta.years;
const STAGES = D.meta.stages;
const YCOL = D.meta.yearColors;                     // 2021..2025
const css = v => getComputedStyle(document.documentElement).getPropertyValue(v).trim();
const INK = "#e8edff", SOFT = "#aab4d4", DIM = "#6c769a", LINE = "#26304f";
const ACC = "#5ad1ff", ACC2 = "#b98bff", UP = "#4ade80", DOWN = "#ff6b81", GOLD = "#ffd166";
const stageColor = d3.scaleOrdinal().domain(STAGES)
  .range(["#5ad1ff", "#4ade80", "#b98bff", "#ff8fb0"]);

/* ---- tooltip ------------------------------------------------------------ */
const tip = d3.select("#tooltip");
function showTip(html, ev) {
  tip.html(html).style("opacity", 1);
  moveTip(ev);
}
function moveTip(ev) {
  const pad = 16, w = tip.node().offsetWidth, h = tip.node().offsetHeight;
  let x = ev.clientX + pad, y = ev.clientY + pad;
  if (x + w > innerWidth) x = ev.clientX - w - pad;
  if (y + h > innerHeight) y = ev.clientY - h - pad;
  tip.style("left", x + "px").style("top", y + "px");
}
function hideTip() { tip.style("opacity", 0); }
const fmt = {
  m: v => "£" + (v % 1 ? v.toFixed(1) : v) + "m",
  bn: v => "£" + v.toFixed(1) + "bn",
  pct: v => v + "%",
  pp: v => (v > 0 ? "+" : "") + v + "pp",
  ch: v => (v > 0 ? "+" : "") + v + "%"
};

/* ---- svg scaffold ------------------------------------------------------- */
function scaffold(id, height, margin) {
  const el = document.getElementById(id);
  el.innerHTML = "";
  const width = Math.max(el.clientWidth || el.parentNode.clientWidth, 280);
  const m = Object.assign({ t: 16, r: 16, b: 28, l: 40 }, margin || {});
  const svg = d3.select(el).append("svg")
    .attr("class", "chart")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("width", "100%").attr("height", height);
  const g = svg.append("g").attr("transform", `translate(${m.l},${m.t})`);
  return { svg, g, width, height, iw: width - m.l - m.r, ih: height - m.t - m.b, m };
}

/* ---- legend builder ----------------------------------------------------- */
function legend(id, items) { // items: [{label,color}]
  const el = d3.select("#" + id).html("");
  items.forEach(it => {
    const span = el.append("span").attr("class", "item");
    span.append("span").attr("class", "swatch").style("background", it.color);
    span.append("span").text(it.label);
  });
}

/* ---- controls ----------------------------------------------------------- */
function seg(id, options, initial, onChange, violet) {
  const el = document.getElementById(id);
  el.innerHTML = "";
  const wrap = document.createElement("div"); wrap.className = "seg";
  options.forEach(o => {
    const b = document.createElement("button");
    b.textContent = o.label; b.dataset.val = o.val;
    if (o.val === initial) b.className = "active" + (violet ? " violet" : "");
    b.onclick = () => {
      [...wrap.children].forEach(c => c.className = "");
      b.className = "active" + (violet ? " violet" : "");
      onChange(o.val);
    };
    wrap.appendChild(b);
  });
  el.appendChild(wrap);
}
function dropdown(id, label, options, initial, onChange) {
  const el = document.getElementById(id); el.innerHTML = "";
  if (label) { const l = document.createElement("span"); l.className = "ctl-label"; l.textContent = label; el.appendChild(l); }
  const s = document.createElement("select"); s.className = "dropdown";
  options.forEach(o => { const op = document.createElement("option"); op.value = o.val; op.textContent = o.label; if (o.val === initial) op.selected = true; s.appendChild(op); });
  s.onchange = () => onChange(s.value);
  el.appendChild(s);
}

/* ---- axis helpers ------------------------------------------------------- */
function gridY(g, scale, iw, ticks) {
  g.append("g").attr("class", "grid")
    .call(d3.axisLeft(scale).ticks(ticks || 5).tickSize(-iw).tickFormat(""));
}
function axisLeft(g, scale, fmtFn, ticks) {
  g.append("g").attr("class", "axis")
    .call(d3.axisLeft(scale).ticks(ticks || 5).tickFormat(fmtFn || (d => d)));
}
function axisBottom(g, scale, ih, fmtFn) {
  g.append("g").attr("class", "axis").attr("transform", `translate(0,${ih})`)
    .call(d3.axisBottom(scale).tickFormat(fmtFn || (d => d)).tickSizeOuter(0));
}

/* ====================================================================== *
 *  CHART REGISTRY                                                         *
 * ====================================================================== */
const CHARTS = [];
const reg = fn => CHARTS.push(fn);

/* ---------- HERO STAT BAR ---------- */
reg(function statbar() {
  const h = D.meta.headline;
  const stats = [
    { v: h.termSheets, l: "signed term sheets", c: "cyan" },
    { v: h.ukTermSheets, l: "UK-HQ'd companies", c: "violet" },
    { v: h.dataPoints.toLocaleString(), l: "data points", c: "gold" },
    { v: "£" + h.aggregateValueBn + "bn", l: "aggregate value", c: "green" },
    { v: h.lawFirms, l: "leading law firms", c: "cyan" },
    { v: h.coverageByValuePct + "%", l: "of UK market value", c: "violet" }
  ];
  const el = document.getElementById("statbar"); el.innerHTML = "";
  stats.forEach(s => {
    const d = document.createElement("div"); d.className = "stat";
    d.innerHTML = `<div class="v ${s.c}">${s.v}</div><div class="l">${s.l}</div>`;
    el.appendChild(d);
  });
});

/* ---------- SURVEY GROWTH (area + line) ---------- */
reg(function survey() {
  const { g, iw, ih } = scaffold("c-survey", 300, { l: 44, r: 16, t: 14, b: 30 });
  const data = D.surveyGrowth;
  const x = d3.scalePoint().domain(YEARS).range([0, iw]).padding(0.5);
  const y = d3.scaleLinear().domain([0, 760]).range([ih, 0]).nice();
  gridY(g, y, iw); axisLeft(g, y); axisBottom(g, x, ih);
  const area = d3.area().x(d => x(d.year)).y0(ih).y1(d => y(d.total)).curve(d3.curveMonotoneX);
  const lineT = d3.line().x(d => x(d.year)).y(d => y(d.total)).curve(d3.curveMonotoneX);
  const lineU = d3.line().x(d => x(d.year)).y(d => y(d.uk)).curve(d3.curveMonotoneX);
  const grad = g.append("defs").append("linearGradient").attr("id", "gSurvey").attr("x1", 0).attr("y1", 0).attr("x2", 0).attr("y2", 1);
  grad.append("stop").attr("offset", "0%").attr("stop-color", ACC).attr("stop-opacity", .35);
  grad.append("stop").attr("offset", "100%").attr("stop-color", ACC).attr("stop-opacity", 0);
  g.append("path").datum(data).attr("d", area).attr("fill", "url(#gSurvey)");
  [["total", ACC], ["uk", ACC2]].forEach(([k, c]) => {
    g.append("path").datum(data).attr("fill", "none").attr("stroke", c).attr("stroke-width", 2.5)
      .attr("d", k === "total" ? lineT : lineU);
    g.selectAll(".pt-" + k).data(data).join("circle").attr("r", 4)
      .attr("cx", d => x(d.year)).attr("cy", d => y(d[k])).attr("fill", c).attr("stroke", "#0a0e1a").attr("stroke-width", 1.5)
      .on("mouseover", (e, d) => showTip(`<div class="tt-title">${d.year}</div>
        <div class="tt-row"><span><span class="tt-sw" style="background:${ACC}"></span>Total</span><b>${d.total}</b></div>
        <div class="tt-row"><span><span class="tt-sw" style="background:${ACC2}"></span>UK-HQ'd</span><b>${d.uk}</b></div>`, e))
      .on("mousemove", moveTip).on("mouseout", hideTip);
  });
  g.selectAll(".lbl").data(data).join("text").attr("class", "val-label").attr("text-anchor", "middle")
    .attr("x", d => x(d.year)).attr("y", d => y(d.total) - 12).text(d => d.total);
  legend("l-survey", [{ label: "Total term sheets", color: ACC }, { label: "UK-headquartered", color: ACC2 }]);
});

/* ---------- 2025 STAGE DONUT ---------- */
reg(function donut() {
  const { svg, width } = scaffold("c-donut", 300, { l: 0, r: 0, t: 0, b: 0 });
  const data = D.stageDonut2025;
  const R = Math.min(width, 300) / 2 - 6, r = R * 0.6;
  const g = svg.append("g").attr("transform", `translate(${width / 2},150)`);
  const pie = d3.pie().sort(null).value(d => d.pct);
  const arc = d3.arc().innerRadius(r).outerRadius(R).padAngle(.02).cornerRadius(3);
  const arcs = pie(data);
  g.selectAll("path").data(arcs).join("path").attr("d", arc)
    .attr("fill", d => stageColor(d.data.stage))
    .on("mouseover", function (e, d) {
      d3.select(this).attr("opacity", .8);
      showTip(`<div class="tt-title">${d.data.stage} <span style="color:${DIM}">${d.data.band}</span></div>
        <div class="tt-row"><span>Term sheets</span><b>${d.data.count}</b></div>
        <div class="tt-row"><span>Share</span><b>${d.data.pct}%</b></div>`, e);
    }).on("mousemove", moveTip).on("mouseout", function () { d3.select(this).attr("opacity", 1); hideTip(); });
  g.append("text").attr("text-anchor", "middle").attr("y", -6).attr("fill", INK).style("font-size", "30px").style("font-weight", 800).style("font-family", "var(--mono)").text("711");
  g.append("text").attr("text-anchor", "middle").attr("y", 16).attr("fill", DIM).style("font-size", "12px").text("term sheets · 2025");
  g.selectAll(".dl").data(arcs).join("text").attr("transform", d => `translate(${arc.centroid(d)})`)
    .attr("text-anchor", "middle").attr("fill", "#06121a").style("font-size", "11px").style("font-weight", 700)
    .text(d => d.data.pct + "%");
  // outer labels
  g.selectAll(".ol").data(arcs).join("text")
    .attr("transform", d => { const c = arc.centroid(d); const ang = (d.startAngle + d.endAngle) / 2; const rr = R + 18; return `translate(${Math.sin(ang) * rr},${-Math.cos(ang) * rr})`; })
    .attr("text-anchor", d => { const ang = (d.startAngle + d.endAngle) / 2; return ang > Math.PI ? "end" : "start"; })
    .attr("fill", SOFT).style("font-size", "11px").text(d => d.data.stage);
});

/* ---------- UK VC INVESTMENT (bars) ---------- */
reg(function ukvc() {
  const { g, iw, ih } = scaffold("c-ukvc", 300, { l: 40, r: 14, t: 22, b: 28 });
  const data = D.ukVcInvestment;
  const x = d3.scaleBand().domain(data.map(d => d.year)).range([0, iw]).padding(0.28);
  const y = d3.scaleLinear().domain([0, 30]).range([ih, 0]).nice();
  gridY(g, y, iw); axisLeft(g, y, d => "£" + d + "bn"); axisBottom(g, x, ih);
  g.selectAll("rect").data(data).join("rect")
    .attr("x", d => x(d.year)).attr("width", x.bandwidth()).attr("y", ih).attr("height", 0)
    .attr("rx", 4).attr("fill", (d, i) => d.year === 2025 ? ACC : "#2c3a63")
    .on("mouseover", (e, d) => showTip(`<div class="tt-title">${d.year}</div><div class="tt-row"><span>UK VC invested</span><b>${fmt.bn(d.value)}</b></div>`, e))
    .on("mousemove", moveTip).on("mouseout", hideTip)
    .transition().duration(700).delay((d, i) => i * 60)
    .attr("y", d => y(d.value)).attr("height", d => ih - y(d.value));
  g.selectAll(".bl").data(data).join("text").attr("class", "bar-label").attr("text-anchor", "middle")
    .attr("x", d => x(d.year) + x.bandwidth() / 2).attr("y", d => y(d.value) - 6).attr("opacity", 0)
    .text(d => fmt.bn(d.value)).transition().delay((d, i) => 500 + i * 60).attr("opacity", 1);
});

/* ---------- DEAL CONCENTRATION (stacked bars by stage) ---------- */
reg(function concentration() {
  const { g, iw, ih } = scaffold("c-concentration", 300, { l: 40, r: 14, t: 14, b: 28 });
  const C = D.ukVcConcentration;
  const data = C.years.map((yr, i) => { const o = { year: yr }; STAGES.forEach(s => o[s] = C[s][i]); return o; });
  const x = d3.scaleBand().domain(C.years).range([0, iw]).padding(0.3);
  const y = d3.scaleLinear().domain([0, 21]).range([ih, 0]).nice();
  gridY(g, y, iw); axisLeft(g, y, d => "£" + d + "bn"); axisBottom(g, x, ih);
  const stack = d3.stack().keys(STAGES)(data);
  g.selectAll("g.layer").data(stack).join("g").attr("fill", d => stageColor(d.key))
    .selectAll("rect").data(d => d.map(p => (p.key = d.key, p))).join("rect")
    .attr("x", d => x(d.data.year)).attr("width", x.bandwidth())
    .attr("y", d => y(d[1])).attr("height", d => y(d[0]) - y(d[1])).attr("rx", 2)
    .on("mouseover", (e, d) => showTip(`<div class="tt-title">${d.data.year} · ${d.key}</div><div class="tt-row"><span>Invested</span><b>${fmt.bn(d.data[d.key])}</b></div>`, e))
    .on("mousemove", moveTip).on("mouseout", hideTip);
  legend("l-concentration", STAGES.map(s => ({ label: s, color: stageColor(s) })));
});

/* ---------- GLOBAL MARKETS (bar + change colour) ---------- */
reg(function global() {
  const data = D.globalMarkets;
  const { g, iw, ih } = scaffold("c-global", 360, { l: 110, r: 70, t: 8, b: 24 });
  const x = d3.scaleLog().domain([3, 260]).range([0, iw]);
  const y = d3.scaleBand().domain(data.map(d => d.country)).range([0, ih]).padding(0.22);
  const col = d3.scaleSequential().domain([-50, 60]).interpolator(t => d3.interpolateRgb(DOWN, UP)(t));
  g.append("g").attr("class", "axis").call(d3.axisLeft(y).tickSize(0)).select(".domain").remove();
  g.selectAll("rect").data(data).join("rect")
    .attr("x", 0).attr("y", d => y(d.country)).attr("height", y.bandwidth())
    .attr("width", 0).attr("rx", 4)
    .attr("fill", d => d.country === "United Kingdom" ? ACC : col(d.change))
    .attr("opacity", d => d.country === "United Kingdom" ? 1 : .85)
    .on("mouseover", (e, d) => showTip(`<div class="tt-title">${d.country}</div>
      <div class="tt-row"><span>VC investment 2025</span><b>${fmt.bn(d.value)}</b></div>
      <div class="tt-row"><span>Change vs 2024</span><b class="${d.change >= 0 ? 'up' : 'down'}">${fmt.ch(d.change)}</b></div>`, e))
    .on("mousemove", moveTip).on("mouseout", hideTip)
    .transition().duration(800).delay((d, i) => i * 40).attr("width", d => x(d.value));
  g.selectAll(".vlbl").data(data).join("text").attr("class", "val-label")
    .attr("x", d => x(d.value) + 8).attr("y", d => y(d.country) + y.bandwidth() / 2 + 4).attr("opacity", 0)
    .text(d => fmt.bn(d.value)).transition().delay((d, i) => 600 + i * 40).attr("opacity", 1);
  g.selectAll(".clbl").data(data).join("text")
    .attr("x", iw + 8).attr("y", d => y(d.country) + y.bandwidth() / 2 + 4).attr("text-anchor", "start")
    .style("font-size", "11px").style("font-weight", 700)
    .attr("fill", d => d.change >= 0 ? UP : DOWN).text(d => fmt.ch(d.change));
  g.selectAll(".uklab").data(data.filter(d => d.country === "United Kingdom")).join("text")
    .attr("x", d => x(d.value) + 8).attr("y", d => y(d.country) - 4).attr("fill", ACC).style("font-size", "9.5px").style("font-weight", 700).text("#3 globally");
});

/* ---------- DRY POWDER (area) ---------- */
reg(function powder() {
  const { g, iw, ih } = scaffold("c-powder", 300, { l: 44, r: 16, t: 14, b: 28 });
  const P = D.dryPowder;
  const data = P.years.map((yr, i) => ({ year: yr, global: P.global[i], european: P.european[i] }));
  const x = d3.scaleLinear().domain([2015, 2025]).range([0, iw]);
  const y = d3.scaleLinear().domain([0, 600]).range([ih, 0]).nice();
  gridY(g, y, iw, 4); axisLeft(g, y, d => "£" + d + "bn", 4);
  g.append("g").attr("class", "axis").attr("transform", `translate(0,${ih})`)
    .call(d3.axisBottom(x).ticks(5).tickFormat(d3.format("d")).tickSizeOuter(0));
  [["global", ACC, "gGl"], ["european", ACC2, "gEu"]].forEach(([k, c, id]) => {
    const grad = g.append("defs").append("linearGradient").attr("id", id).attr("x1", 0).attr("y1", 0).attr("x2", 0).attr("y2", 1);
    grad.append("stop").attr("offset", "0%").attr("stop-color", c).attr("stop-opacity", .4);
    grad.append("stop").attr("offset", "100%").attr("stop-color", c).attr("stop-opacity", .02);
    const area = d3.area().x(d => x(d.year)).y0(ih).y1(d => y(d[k])).curve(d3.curveMonotoneX);
    const line = d3.line().x(d => x(d.year)).y(d => y(d[k])).curve(d3.curveMonotoneX);
    g.append("path").datum(data).attr("d", area).attr("fill", `url(#${id})`);
    g.append("path").datum(data).attr("d", line).attr("fill", "none").attr("stroke", c).attr("stroke-width", 2.5);
  });
  // endpoint labels
  g.append("text").attr("x", x(2025)).attr("y", y(525) - 8).attr("text-anchor", "end").attr("fill", ACC).style("font-weight", 700).style("font-size", "12px").text("£525bn");
  g.append("text").attr("x", x(2025)).attr("y", y(58) - 8).attr("text-anchor", "end").attr("fill", ACC2).style("font-weight", 700).style("font-size", "12px").text("£58bn");
  // invisible hover layer
  const focus = g.append("g").style("display", "none");
  focus.append("line").attr("y1", 0).attr("y2", ih).attr("stroke", LINE);
  g.append("rect").attr("width", iw).attr("height", ih).attr("fill", "transparent")
    .on("mousemove", function (e) {
      const yr = Math.round(x.invert(d3.pointer(e, this)[0]));
      const d = data.find(p => p.year === yr); if (!d) return;
      focus.style("display", null).select("line").attr("transform", `translate(${x(d.year)},0)`);
      showTip(`<div class="tt-title">${d.year}</div>
        <div class="tt-row"><span><span class="tt-sw" style="background:${ACC}"></span>Global</span><b>£${d.global}bn</b></div>
        <div class="tt-row"><span><span class="tt-sw" style="background:${ACC2}"></span>European</span><b>£${d.european}bn</b></div>`, e);
    }).on("mouseout", () => { focus.style("display", "none"); hideTip(); });
  legend("l-powder", [{ label: "Global VC/PE", color: ACC }, { label: "European VC", color: ACC2 }]);
});

/* ---------- EXITS (grouped bars) ---------- */
reg(function exits() {
  const { g, iw, ih } = scaffold("c-exits", 230, { l: 60, r: 16, t: 16, b: 28 });
  const data = D.exits;
  const x = d3.scaleBand().domain(data.map(d => d.period)).range([0, iw]).padding(0.25);
  const xi = d3.scaleBand().domain(["ipo", "ma"]).range([0, x.bandwidth()]).padding(0.18);
  const y = d3.scaleLinear().domain([0, 140]).range([ih, 0]).nice();
  gridY(g, y, iw, 4); axisLeft(g, y, null, 4); axisBottom(g, x, ih);
  const col = { ipo: GOLD, ma: ACC2 };
  data.forEach(d => {
    ["ipo", "ma"].forEach(k => {
      g.append("rect").attr("x", x(d.period) + xi(k)).attr("width", xi.bandwidth())
        .attr("y", y(d[k])).attr("height", ih - y(d[k])).attr("rx", 3).attr("fill", col[k])
        .on("mouseover", (e) => showTip(`<div class="tt-title">${d.period}</div><div class="tt-row"><span>${k === 'ipo' ? 'IPO' : 'M&A'} deals</span><b>${d[k]}</b></div>`, e))
        .on("mousemove", moveTip).on("mouseout", hideTip);
      g.append("text").attr("class", "bar-label").attr("text-anchor", "middle")
        .attr("x", x(d.period) + xi(k) + xi.bandwidth() / 2).attr("y", y(d[k]) - 5).text(d[k]);
    });
  });
  d3.select("#c-exits").append("div").attr("class", "legend").html(
    `<span class="item"><span class="swatch" style="background:${GOLD}"></span>IPO deals</span>
     <span class="item"><span class="swatch" style="background:${ACC2}"></span>M&amp;A deals</span>`);
});

/* ---------- POST-MONEY BY STAGE (line, log/linear toggle) ---------- */
let pmScale = "log";
reg(function postmoney() {
  seg("ctl-postmoney", [{ label: "Log scale", val: "log" }, { label: "Linear", val: "linear" }], pmScale,
    v => { pmScale = v; postmoney(); });
  const { g, iw, ih } = scaffold("c-postmoney", 320, { l: 52, r: 64, t: 16, b: 28 });
  const x = d3.scalePoint().domain(YEARS).range([0, iw]).padding(0.3);
  const y = (pmScale === "log" ? d3.scaleLog().domain([2.5, 300]) : d3.scaleLinear().domain([0, 270])).range([ih, 0]).nice();
  gridY(g, y, iw, 5);
  g.append("g").attr("class", "axis").call(d3.axisLeft(y).ticks(5, "~s").tickFormat(d => "£" + d + "m"));
  axisBottom(g, x, ih);
  const line = d3.line().x((d, i) => x(YEARS[i])).y(d => y(d)).curve(d3.curveMonotoneX);
  STAGES.forEach(s => {
    const rec = D.postMoneyByStage[s];
    g.append("path").datum(rec.values).attr("fill", "none").attr("stroke", stageColor(s)).attr("stroke-width", 2.5).attr("d", line);
    g.selectAll(".p" + s.replace(/\W/g, "")).data(rec.values).join("circle").attr("r", 3.5)
      .attr("cx", (d, i) => x(YEARS[i])).attr("cy", d => y(d)).attr("fill", stageColor(s)).attr("stroke", "#0a0e1a")
      .on("mouseover", (e, d, i) => { const idx = rec.values.indexOf(d); showTip(`<div class="tt-title">${s} · ${YEARS[idx]}</div><div class="tt-row"><span>Median post-money</span><b>${fmt.m(d)}</b></div><div class="tt-row"><span>Avg cheque</span><b>${fmt.m(D.investmentSizeByStage[s].values[idx])}</b></div>`, e); })
      .on("mousemove", moveTip).on("mouseout", hideTip);
    g.append("text").attr("x", iw + 6).attr("y", y(rec.values[4]) + 4).attr("fill", stageColor(s)).style("font-size", "11px").style("font-weight", 700).text(s.replace("Series ", ""));
  });
});

/* ---------- 2025 MOMENTUM (diverging) ---------- */
reg(function momentum() {
  const { g, iw, ih } = scaffold("c-momentum", 320, { l: 70, r: 40, t: 16, b: 28 });
  const data = STAGES.map(s => ({ stage: s, change: D.postMoneyByStage[s].change }));
  const y = d3.scaleBand().domain(STAGES).range([0, ih]).padding(0.3);
  const x = d3.scaleLinear().domain([-10, 40]).range([0, iw]);
  g.append("line").attr("x1", x(0)).attr("x2", x(0)).attr("y1", 0).attr("y2", ih).attr("stroke", LINE);
  g.append("g").attr("class", "axis").call(d3.axisLeft(y).tickSize(0)).select(".domain").remove();
  g.selectAll("rect").data(data).join("rect").attr("y", d => y(d.stage)).attr("height", y.bandwidth())
    .attr("x", d => x(Math.min(0, d.change))).attr("width", d => Math.abs(x(d.change) - x(0))).attr("rx", 4)
    .attr("fill", d => d.change >= 0 ? UP : DOWN).attr("opacity", .9);
  g.selectAll(".ml").data(data).join("text").attr("class", "val-label")
    .attr("x", d => x(d.change) + (d.change >= 0 ? 6 : -6)).attr("text-anchor", d => d.change >= 0 ? "start" : "end")
    .attr("y", d => y(d.stage) + y.bandwidth() / 2 + 4).attr("fill", d => d.change >= 0 ? UP : DOWN).text(d => fmt.ch(d.change));
});

/* ---------- VALUATION BANDS (100% stacked, per stage) ---------- */
reg(function bands() {
  const { g, iw, ih } = scaffold("c-bands", 300, { l: 70, r: 14, t: 10, b: 28 });
  const B = D.valuationBands;
  const data = STAGES.map(s => { const o = { stage: s }; B.bands.forEach((b, i) => o[b] = B[s][i]); return o; });
  const y = d3.scaleBand().domain(STAGES).range([0, ih]).padding(0.28);
  const x = d3.scaleLinear().domain([0, 100]).range([0, iw]);
  const col = d3.scaleOrdinal().domain(B.bands).range([ACC, "#4ade80", GOLD, ACC2, DOWN]);
  g.append("g").attr("class", "axis").call(d3.axisLeft(y).tickSize(0)).select(".domain").remove();
  axisBottom(g, x, ih, d => d + "%");
  const stack = d3.stack().keys(B.bands)(data);
  g.selectAll("g.layer").data(stack).join("g").attr("fill", d => col(d.key))
    .selectAll("rect").data(d => d.map(p => (p.key = d.key, p))).join("rect")
    .attr("y", d => y(d.data.stage)).attr("height", y.bandwidth())
    .attr("x", d => x(d[0])).attr("width", d => x(d[1]) - x(d[0]))
    .on("mouseover", (e, d) => showTip(`<div class="tt-title">${d.data.stage}</div><div class="tt-row"><span>${d.key} pre-money</span><b>${d.data[d.key]}%</b></div>`, e))
    .on("mousemove", moveTip).on("mouseout", hideTip);
  legend("l-bands", B.bands.map(b => ({ label: b, color: col(b) })));
});

/* ---------- SERIES A BIG DEALS (dual) ---------- */
reg(function bigA() {
  const { g, iw, ih } = scaffold("c-bigA", 300, { l: 40, r: 44, t: 18, b: 28 });
  const S = D.seriesABigDeals;
  const x = d3.scaleBand().domain(S.years).range([0, iw]).padding(0.4);
  const yL = d3.scaleLinear().domain([0, 16]).range([ih, 0]);
  const yR = d3.scaleLinear().domain([0, 180]).range([ih, 0]);
  axisLeft(g, yL, d => d + "%", 4); axisBottom(g, x, ih);
  g.append("g").attr("class", "axis").attr("transform", `translate(${iw},0)`).call(d3.axisRight(yR).ticks(4).tickFormat(d => "£" + d + "m"));
  g.selectAll("rect").data(S.years).join("rect").attr("x", (d, i) => x(d)).attr("width", x.bandwidth())
    .attr("y", (d, i) => yL(S.sharePct[i])).attr("height", (d, i) => ih - yL(S.sharePct[i])).attr("rx", 4).attr("fill", "#2c3a63")
    .on("mouseover", (e, d, ) => { const i = S.years.indexOf(d); showTip(`<div class="tt-title">${d}</div><div class="tt-row"><span>Share &gt;£50m</span><b>${S.sharePct[i]}%</b></div><div class="tt-row"><span>Avg valuation</span><b>£${S.avgValuationM[i]}m</b></div>`, e); })
    .on("mousemove", moveTip).on("mouseout", hideTip);
  const line = d3.line().x((d, i) => x(S.years[i]) + x.bandwidth() / 2).y(d => yR(d)).curve(d3.curveMonotoneX);
  g.append("path").datum(S.avgValuationM).attr("fill", "none").attr("stroke", GOLD).attr("stroke-width", 2.5).attr("d", line);
  g.selectAll(".av").data(S.avgValuationM).join("circle").attr("r", 4).attr("cx", (d, i) => x(S.years[i]) + x.bandwidth() / 2).attr("cy", d => yR(d)).attr("fill", GOLD).attr("stroke", "#0a0e1a");
  g.selectAll(".avl").data(S.avgValuationM).join("text").attr("class", "val-label").attr("fill", GOLD).attr("text-anchor", "middle")
    .attr("x", (d, i) => x(S.years[i]) + x.bandwidth() / 2).attr("y", d => yR(d) - 9).text(d => "£" + d + "m");
});

/* ---------- VOLUME MIX (stacked area / streamgraph-ish) ---------- */
reg(function volmix() {
  const { g, iw, ih } = scaffold("c-volmix", 300, { l: 36, r: 14, t: 14, b: 28 });
  const data = D.volumeMixByStage;
  const x = d3.scalePoint().domain(YEARS).range([0, iw]).padding(0);
  const y = d3.scaleLinear().domain([0, 100]).range([ih, 0]);
  axisLeft(g, y, d => d + "%", 5); axisBottom(g, x, ih);
  const stack = d3.stack().keys(STAGES).order(d3.stackOrderNone)(data);
  const area = d3.area().x((d, i) => x(YEARS[i])).y0(d => y(d[0])).y1(d => y(d[1])).curve(d3.curveBasis);
  g.selectAll("path.area").data(stack).join("path").attr("class", "area").attr("d", area).attr("fill", d => stageColor(d.key)).attr("opacity", .9)
    .on("mouseover", function (e, d) {
      d3.select(this).attr("opacity", 1);
      const rows = data.map(r => `<div class="tt-row"><span>${r.year}</span><b>${r[d.key]}%</b></div>`).join("");
      showTip(`<div class="tt-title">${d.key}</div>${rows}`, e);
    }).on("mousemove", moveTip).on("mouseout", function () { d3.select(this).attr("opacity", .9); hideTip(); });
  legend("l-volmix", STAGES.map(s => ({ label: s, color: stageColor(s) })));
});

/* ---------- 2025 vs 2024 COMPARE (slope by stage) ---------- */
let cmpMetric = "valuation";
reg(function compare() {
  seg("ctl-compare", [{ label: "Valuation", val: "valuation" }, { label: "Participating", val: "participating" }, { label: "Dividend", val: "dividend" }], cmpMetric, v => { cmpMetric = v; compare(); });
  const { g, iw, ih } = scaffold("c-compare", 300, { l: 30, r: 30, t: 24, b: 28 });
  const isVal = cmpMetric === "valuation";
  const vals = STAGES.flatMap(s => D.compare2024v2025[s][cmpMetric]);
  const y = d3.scaleLinear().domain([0, d3.max(vals) * 1.1]).range([ih, 0]).nice();
  const x = d3.scalePoint().domain(["2024", "2025"]).range([0, iw]).padding(0.5);
  axisBottom(g, x, ih);
  g.append("text").attr("x", 0).attr("y", -8).attr("fill", DIM).style("font-size", "10px").text(isVal ? "£m" : "% participating/dividend");
  STAGES.forEach(s => {
    const d = D.compare2024v2025[s][cmpMetric];
    g.append("line").attr("x1", x("2024")).attr("x2", x("2025")).attr("y1", y(d[0])).attr("y2", y(d[1]))
      .attr("stroke", stageColor(s)).attr("stroke-width", 2.5).attr("opacity", .9);
    [["2024", d[0]], ["2025", d[1]]].forEach(([yr, v]) => {
      g.append("circle").attr("cx", x(yr)).attr("cy", y(v)).attr("r", 4).attr("fill", stageColor(s)).attr("stroke", "#0a0e1a")
        .on("mouseover", e => showTip(`<div class="tt-title">${s} · ${yr}</div><div class="tt-row"><span>${cmpMetric}</span><b>${isVal ? fmt.m(v) : v + "%"}</b></div>`, e))
        .on("mousemove", moveTip).on("mouseout", hideTip);
    });
    g.append("text").attr("x", x("2025") + 7).attr("y", y(d[1]) + 4).attr("fill", stageColor(s)).style("font-size", "10.5px").style("font-weight", 700).text(s.replace("Series ", ""));
    g.append("text").attr("x", x("2024") - 7).attr("y", y(d[0]) + 4).attr("text-anchor", "end").attr("fill", SOFT).style("font-size", "10px").text(isVal ? d[0] : d[0] + "%");
  });
});

/* ---------- SECTOR SHARE LINES ---------- */
reg(function sectorlines() {
  const { g, iw, ih } = scaffold("c-sectorlines", 340, { l: 36, r: 120, t: 14, b: 28 });
  const S = D.sectorShare;
  const x = d3.scalePoint().domain(S.years).range([0, iw]).padding(0.15);
  const y = d3.scaleLinear().domain([0, 18]).range([ih, 0]).nice();
  gridY(g, y, iw); axisLeft(g, y, d => d + "%"); axisBottom(g, x, ih);
  const color = d3.scaleOrdinal(d3.schemeTableau10).domain(S.rows.map(r => r.sector));
  const line = d3.line().x((d, i) => x(S.years[i])).y(d => y(d)).curve(d3.curveMonotoneX);
  const paths = g.selectAll(".sl").data(S.rows).join("path").attr("class", "sl")
    .attr("fill", "none").attr("stroke", d => color(d.sector)).attr("stroke-width", d => d.sector === "AI" ? 3 : 1.6)
    .attr("opacity", d => d.sector === "AI" ? 1 : .55).attr("d", d => line(d.values));
  g.selectAll(".sll").data(S.rows).join("text").attr("x", iw + 6).attr("y", d => y(d.values[3]) + 3)
    .attr("fill", d => color(d.sector)).style("font-size", "10px").style("font-weight", d => d.sector === "AI" ? 700 : 500)
    .text(d => d.sector.length > 16 ? d.sector.slice(0, 15) + "…" : d.sector);
  g.selectAll(".slh").data(S.rows).join("path").attr("fill", "none").attr("stroke", "transparent").attr("stroke-width", 12).attr("d", d => line(d.values))
    .on("mouseover", function (e, d) {
      paths.attr("opacity", .12); d3.select(paths.nodes()[S.rows.indexOf(d)]).attr("opacity", 1).attr("stroke-width", 3);
      const rows = S.years.map((yr, i) => `<div class="tt-row"><span>${yr}</span><b>${d.values[i]}%</b></div>`).join("");
      showTip(`<div class="tt-title">${d.sector} ${d.deepTech ? '◆' : ''}</div>${rows}<div class="tt-row"><span>'24→'25</span><b class="${d.ppt >= 0 ? 'up' : 'down'}">${fmt.pp(d.ppt)}</b></div>`, e);
    }).on("mousemove", moveTip)
    .on("mouseout", function () { paths.attr("opacity", d => d.sector === "AI" ? 1 : .55).attr("stroke-width", d => d.sector === "AI" ? 3 : 1.6); hideTip(); });
});

/* ---------- DEEPTECH DUAL LINE ---------- */
reg(function deeptech() {
  const { g, iw, ih } = scaffold("c-deeptech", 320, { l: 36, r: 16, t: 16, b: 28 });
  const DT = D.deepTech;
  const x = d3.scalePoint().domain(DT.years).range([0, iw]).padding(0.3);
  const y = d3.scaleLinear().domain([0, 50]).range([ih, 0]).nice();
  gridY(g, y, iw, 5); axisLeft(g, y, d => d + "%", 5); axisBottom(g, x, ih);
  const line = d3.line().x((d, i) => x(DT.years[i])).y(d => y(d)).curve(d3.curveMonotoneX);
  [["volume", ACC], ["value", ACC2]].forEach(([k, c]) => {
    g.append("path").datum(DT[k]).attr("fill", "none").attr("stroke", c).attr("stroke-width", 2.8).attr("d", line);
    g.selectAll(".d" + k).data(DT[k]).join("circle").attr("r", 4).attr("cx", (d, i) => x(DT.years[i])).attr("cy", d => y(d)).attr("fill", c).attr("stroke", "#0a0e1a")
      .on("mouseover", (e, d) => { const i = DT[k].indexOf(d); showTip(`<div class="tt-title">DeepTech ${DT.years[i]}</div><div class="tt-row"><span>By ${k}</span><b>${d}%</b></div>`, e); })
      .on("mousemove", moveTip).on("mouseout", hideTip);
    g.append("text").attr("x", x(2025)).attr("y", y(DT[k][4]) - 10).attr("text-anchor", "end").attr("fill", c).style("font-weight", 700).style("font-size", "12px").text(DT[k][4] + "%");
  });
  legend("l-deeptech", [{ label: "Share by volume", color: ACC }, { label: "Share by value", color: ACC2 }]);
});

/* ---------- SECTOR BUBBLE (valuation × ticket × deepTech) ---------- */
reg(function sectorbubble() {
  const { g, iw, ih } = scaffold("c-sectorbubble", 420, { l: 52, r: 24, t: 16, b: 40 });
  const data = D.sectorValuation;
  const x = d3.scaleLinear().domain([30, 250]).range([0, iw]).nice();
  const y = d3.scaleLinear().domain([0, 45]).range([ih, 0]).nice();
  gridY(g, y, iw); axisLeft(g, y, d => "£" + d + "m");
  g.append("g").attr("class", "axis").attr("transform", `translate(0,${ih})`).call(d3.axisBottom(x).tickFormat(d => "£" + d + "m").tickSizeOuter(0));
  g.append("text").attr("x", iw / 2).attr("y", ih + 34).attr("text-anchor", "middle").attr("class", "axis-label").text("Average post-money valuation →");
  g.append("text").attr("transform", "rotate(-90)").attr("x", -ih / 2).attr("y", -40).attr("text-anchor", "middle").attr("class", "axis-label").text("Average cheque size →");
  const sim = data.map(d => Object.assign({}, d, { px: x(d.valuation), py: y(d.investment) }));
  g.selectAll("circle").data(sim).join("circle")
    .attr("cx", d => d.px).attr("cy", d => d.py).attr("r", 0)
    .attr("fill", d => d.deepTech ? ACC : ACC2).attr("opacity", .55).attr("stroke", d => d.deepTech ? ACC : ACC2).attr("stroke-width", 1.5)
    .on("mouseover", function (e, d) { d3.select(this).attr("opacity", .85); showTip(`<div class="tt-title">${d.sector} ${d.deepTech ? '◆ DeepTech' : ''}</div><div class="tt-row"><span>Avg valuation</span><b>£${d.valuation}m</b></div><div class="tt-row"><span>Avg cheque</span><b>£${d.investment}m</b></div>`, e); })
    .on("mousemove", moveTip).on("mouseout", function () { d3.select(this).attr("opacity", .55); hideTip(); })
    .transition().duration(700).attr("r", 13);
  g.selectAll(".bl").data(sim).join("text").attr("x", d => d.px).attr("y", d => d.py - 17).attr("text-anchor", "middle")
    .attr("fill", SOFT).style("font-size", "9.5px").text(d => d.sector.replace(" – Enterprise", "").replace("Life Sciences", "Life Sci"));
  d3.select("#c-sectorbubble").append("div").attr("class", "legend").html(
    `<span class="item"><span class="swatch" style="background:${ACC}"></span>DeepTech ◆</span>
     <span class="item"><span class="swatch" style="background:${ACC2}"></span>Other sectors</span>`);
});

/* ---------- LEAD INVESTOR HQ (stacked, by stage selector) ---------- */
let geoStage = "overall";
reg(function geo() {
  const opts = [{ label: "All stages", val: "overall" }].concat(STAGES.map(s => ({ label: s, val: s })));
  seg("ctl-geo", opts, geoStage, v => { geoStage = v; geo(); });
  const { g, iw, ih } = scaffold("c-geo", 300, { l: 36, r: 16, t: 14, b: 28 });
  const G = D.leadInvestorHQ; const rec = G[geoStage]; const locs = ["UK", "Europe", "US", "Other"];
  const data = G.years.map((yr, i) => { const o = { year: yr }; locs.forEach(l => o[l] = rec[l][i]); o.n = rec.n[i]; return o; });
  const x = d3.scaleBand().domain(G.years).range([0, iw]).padding(0.4);
  const y = d3.scaleLinear().domain([0, 100]).range([ih, 0]);
  const col = d3.scaleOrdinal().domain(locs).range(["#2f7d4f", "#5ad1ff", "#0B6E84", "#C9A9D6"]);
  axisLeft(g, y, d => d + "%", 5); axisBottom(g, x, ih);
  const stack = d3.stack().keys(locs)(data);
  g.selectAll("g.layer").data(stack).join("g").attr("fill", d => col(d.key))
    .selectAll("rect").data(d => d.map(p => (p.key = d.key, p))).join("rect")
    .attr("x", d => x(d.data.year)).attr("width", x.bandwidth())
    .attr("y", d => y(d[1])).attr("height", d => y(d[0]) - y(d[1])).attr("rx", 1)
    .on("mouseover", (e, d) => showTip(`<div class="tt-title">${d.data.year} · ${d.key} lead</div><div class="tt-row"><span>Share</span><b>${d.data[d.key]}%</b></div><div class="tt-row"><span>Deals in stage</span><b>${d.data.n}</b></div>`, e))
    .on("mousemove", moveTip).on("mouseout", hideTip);
  g.selectAll(".nl").data(data).join("text").attr("class", "bar-label").attr("text-anchor", "middle")
    .attr("x", d => x(d.year) + x.bandwidth() / 2).attr("y", -2).attr("fill", DIM).style("font-size", "9.5px").text(d => "n=" + d.n);
  legend("l-geo", locs.map(l => ({ label: l, color: col(l) })));
});

/* ---------- INVESTOR TYPE MIX (lines, vol/val toggle) ---------- */
let invMode = "volume";
reg(function invtype() {
  seg("ctl-invtype", [{ label: "By volume", val: "volume" }, { label: "By value", val: "value" }], invMode, v => { invMode = v; invtype(); });
  const { g, iw, ih } = scaffold("c-invtype", 320, { l: 36, r: 90, t: 14, b: 28 });
  const M = D.investorTypeMix; const types = Object.keys(M[invMode]);
  const x = d3.scalePoint().domain(M.years).range([0, iw]).padding(0.2);
  const y = d3.scaleLinear().domain([0, 80]).range([ih, 0]).nice();
  const col = d3.scaleOrdinal().domain(types).range([ACC, GOLD, UP, ACC2]);
  gridY(g, y, iw); axisLeft(g, y, d => d + "%"); axisBottom(g, x, ih);
  const line = d3.line().x((d, i) => x(M.years[i])).y(d => y(d)).curve(d3.curveMonotoneX);
  types.forEach(t => {
    g.append("path").datum(M[invMode][t]).attr("fill", "none").attr("stroke", col(t)).attr("stroke-width", 2.4).attr("d", line);
    g.selectAll(".iv" + t.replace(/\W/g, "")).data(M[invMode][t]).join("circle").attr("r", 3.5)
      .attr("cx", (d, i) => x(M.years[i])).attr("cy", d => y(d)).attr("fill", col(t)).attr("stroke", "#0a0e1a")
      .on("mouseover", (e, d) => { const i = M[invMode][t].indexOf(d); showTip(`<div class="tt-title">${t} · ${M.years[i]}</div><div class="tt-row"><span>Share by ${invMode}</span><b>${d}%</b></div>`, e); })
      .on("mousemove", moveTip).on("mouseout", hideTip);
    g.append("text").attr("x", iw + 6).attr("y", y(M[invMode][t][4]) + 3).attr("fill", col(t)).style("font-size", "10px").style("font-weight", 600).text(t.replace(" (LP fund)", ""));
  });
  legend("l-invtype", [{ label: "Syndicated deals can feature multiple investor types — shares need not sum to 100%.", color: "transparent" }]);
});

/* ---------- CVC BY STAGE (two donuts) ---------- */
reg(function cvcstage() {
  const { svg, width } = scaffold("c-cvcstage", 300, { l: 0, r: 0, t: 0, b: 0 });
  const sets = [{ key: "volume", label: "Deal volume", cx: width * 0.28 }, { key: "value", label: "Capital", cx: width * 0.72 }];
  const R = Math.min(width / 2 - 20, 90), r = R * 0.58;
  sets.forEach(set => {
    const data = STAGES.map(s => ({ stage: s, v: D.cvcByStage[set.key][s] }));
    const g = svg.append("g").attr("transform", `translate(${set.cx},135)`);
    const pie = d3.pie().sort(null).value(d => d.v);
    const arc = d3.arc().innerRadius(r).outerRadius(R).padAngle(.02).cornerRadius(2);
    g.selectAll("path").data(pie(data)).join("path").attr("d", arc).attr("fill", d => stageColor(d.data.stage))
      .on("mouseover", (e, d) => showTip(`<div class="tt-title">CVC · ${set.label}</div><div class="tt-row"><span>${d.data.stage}</span><b>${d.data.v}%</b></div>`, e))
      .on("mousemove", moveTip).on("mouseout", hideTip);
    g.append("text").attr("text-anchor", "middle").attr("y", 4).attr("fill", SOFT).style("font-size", "11px").text(set.label);
    g.append("text").attr("text-anchor", "middle").attr("y", R + 22).attr("fill", DIM).style("font-size", "11px")
      .text(set.key === "value" ? "C+ = 79%" : "A = 41%");
  });
  svg.append("g").append("text").attr("x", width / 2).attr("y", 270).attr("text-anchor", "middle").attr("fill", DIM).style("font-size", "10.5px")
    .text("Series A drives volume; Series C+ captures the capital");
});

/* ---------- CVC SECTOR ROTATION (dumbbell) ---------- */
reg(function cvcsector() {
  const data = D.cvcBySector.rows;
  const { g, iw, ih } = scaffold("c-cvcsector", 360, { l: 80, r: 30, t: 14, b: 24 });
  const y = d3.scaleBand().domain(data.map(d => d.sector)).range([0, ih]).padding(0.4);
  const x = d3.scaleLinear().domain([0, 30]).range([0, iw]).nice();
  gridY(g, x, ih, 5); // vertical-ish guide via bottom axis instead:
  g.selectAll(".grid").remove();
  g.append("g").attr("class", "axis").attr("transform", `translate(0,${ih})`).call(d3.axisBottom(x).ticks(5).tickFormat(d => d + "%").tickSizeOuter(0));
  g.append("g").attr("class", "axis").call(d3.axisLeft(y).tickSize(0)).select(".domain").remove();
  data.forEach(d => {
    const y0 = y(d.sector) + y.bandwidth() / 2;
    const up = d.values[1] >= d.values[0];
    g.append("line").attr("x1", x(d.values[0])).attr("x2", x(d.values[1])).attr("y1", y0).attr("y2", y0).attr("stroke", up ? UP : DOWN).attr("stroke-width", 2).attr("opacity", .6);
    g.append("circle").attr("cx", x(d.values[0])).attr("cy", y0).attr("r", 4).attr("fill", DIM)
      .on("mouseover", e => showTip(`<div class="tt-title">${d.sector} · 2024</div><div class="tt-row"><span>CVC share</span><b>${d.values[0]}%</b></div>`, e)).on("mousemove", moveTip).on("mouseout", hideTip);
    g.append("circle").attr("cx", x(d.values[1])).attr("cy", y0).attr("r", 4.5).attr("fill", up ? UP : DOWN)
      .on("mouseover", e => showTip(`<div class="tt-title">${d.sector} · 2025</div><div class="tt-row"><span>CVC share</span><b>${d.values[1]}%</b></div>`, e)).on("mousemove", moveTip).on("mouseout", hideTip);
  });
  d3.select("#c-cvcsector").append("div").attr("class", "legend").html(
    `<span class="item"><span class="swatch" style="background:${DIM}"></span>2024</span>
     <span class="item"><span class="swatch" style="background:${UP}"></span>2025 (↑)</span>
     <span class="item"><span class="swatch" style="background:${DOWN}"></span>2025 (↓)</span>`);
});

/* ---------- INVESTOR TICKET (bubble) ---------- */
reg(function invticket() {
  const data = D.investorTypes;
  const { g, iw, ih } = scaffold("c-invticket", 300, { l: 40, r: 20, t: 16, b: 40 });
  const x = d3.scaleBand().domain(data.map(d => d.type)).range([0, iw]).padding(0.3);
  const y = d3.scaleLinear().domain([0, 20]).range([ih, 0]).nice();
  const rScale = d3.scaleSqrt().domain([0, d3.max(data, d => d.n)]).range([4, 28]);
  gridY(g, y, iw, 4); axisLeft(g, y, d => "£" + d + "m", 4);
  g.append("g").attr("class", "axis").attr("transform", `translate(0,${ih})`).call(d3.axisBottom(x).tickSize(0)).selectAll("text").style("font-size", "10px").attr("transform", "rotate(-18)").style("text-anchor", "end");
  g.selectAll("circle").data(data).join("circle").attr("cx", d => x(d.type) + x.bandwidth() / 2).attr("cy", d => y(d.ticket)).attr("r", d => rScale(d.n))
    .attr("fill", ACC2).attr("opacity", .5).attr("stroke", ACC2)
    .on("mouseover", (e, d) => showTip(`<div class="tt-title">${d.type}</div><div class="tt-row"><span>Avg cheque</span><b>£${d.ticket}m</b></div><div class="tt-row"><span>Term sheets</span><b>${d.n}</b></div>`, e))
    .on("mousemove", moveTip).on("mouseout", hideTip);
  g.selectAll(".tl").data(data).join("text").attr("class", "val-label").attr("text-anchor", "middle").attr("x", d => x(d.type) + x.bandwidth() / 2).attr("y", d => y(d.ticket) + 4).text(d => "£" + d.ticket + "m");
});

/* ---------- TERM TIME SERIES (multi-line, family selector) ---------- */
let tsFamily = "Control";
reg(function termts() {
  seg("ctl-termts", D.termFamilies.map(f => ({ label: f, val: f })), tsFamily, v => { tsFamily = v; termts(); }, true);
  const { g, iw, ih } = scaffold("c-termts", 340, { l: 36, r: 150, t: 14, b: 28 });
  const block = D.termsTimeSeries[tsFamily]; const terms = Object.keys(block);
  const x = d3.scalePoint().domain(D.termsTimeSeries.years).range([0, iw]).padding(0.1);
  const y = d3.scaleLinear().domain([0, 100]).range([ih, 0]);
  const col = d3.scaleOrdinal(d3.schemeSet2).domain(terms);
  gridY(g, y, iw, 5); axisLeft(g, y, d => d + "%", 5); axisBottom(g, x, ih);
  const line = d3.line().x((d, i) => x(D.termsTimeSeries.years[i])).y(d => y(d)).curve(d3.curveMonotoneX);
  const paths = [];
  terms.forEach(t => {
    const p = g.append("path").datum(block[t].values).attr("fill", "none").attr("stroke", col(t)).attr("stroke-width", 2).attr("opacity", .8).attr("d", line);
    paths.push(p);
    g.append("text").attr("x", iw + 6).attr("y", y(block[t].values[4]) + 3).attr("fill", col(t)).style("font-size", "9.5px").style("font-weight", 600).text(t.length > 20 ? t.slice(0, 19) + "…" : t);
    g.append("path").attr("fill", "none").attr("stroke", "transparent").attr("stroke-width", 12).attr("d", line(block[t].values))
      .on("mouseover", e => { const rows = D.termsTimeSeries.years.map((yr, i) => `<div class="tt-row"><span>${yr}</span><b>${block[t].values[i]}%</b></div>`).join(""); showTip(`<div class="tt-title">${t}</div>${rows}<div class="tt-row"><span>'24→'25</span><b class="${block[t].ppt >= 0 ? 'up' : 'down'}">${fmt.pp(block[t].ppt)}</b></div>`, e); })
      .on("mousemove", moveTip).on("mouseout", hideTip);
  });
});

/* ---------- LIQUIDATION TYPE (stacked area) ---------- */
reg(function liqtype() {
  const { g, iw, ih } = scaffold("c-liqtype", 320, { l: 36, r: 16, t: 14, b: 28 });
  const L = D.liquidationType; const keys = ["Non-Participating", "Participating", "Participation Cap"];
  const data = L.years.map((yr, i) => { const o = { year: yr }; keys.forEach(k => o[k] = L[k][i]); return o; });
  const x = d3.scalePoint().domain(L.years).range([0, iw]).padding(0);
  const y = d3.scaleLinear().domain([0, 100]).range([ih, 0]);
  const col = d3.scaleOrdinal().domain(keys).range([ACC2, ACC, GOLD]);
  axisLeft(g, y, d => d + "%", 5); axisBottom(g, x, ih);
  const stack = d3.stack().keys(keys)(data);
  const area = d3.area().x((d, i) => x(L.years[i])).y0(d => y(d[0])).y1(d => y(d[1])).curve(d3.curveMonotoneX);
  g.selectAll("path.area").data(stack).join("path").attr("class", "area").attr("d", area).attr("fill", d => col(d.key)).attr("opacity", .9)
    .on("mouseover", (e, d) => { const rows = data.map(r => `<div class="tt-row"><span>${r.year}</span><b>${r[d.key]}%</b></div>`).join(""); showTip(`<div class="tt-title">${d.key}</div>${rows}`, e); })
    .on("mousemove", moveTip).on("mouseout", hideTip);
  legend("l-liqtype", keys.map(k => ({ label: k, color: col(k) })));
});

/* ---------- TERM GRADIENT ACROSS STAGES (heatmap) ---------- */
let stageYear = "2025";
reg(function termstage() {
  seg("ctl-termstage", [{ label: "2025", val: "2025" }, { label: "2024", val: "2024" }], stageYear, v => { stageYear = v; termstage(); });
  const terms = D.allInvestorTerms.map(t => t.term)
    .filter(t => DATA_termInStage(t)); // only terms present in termsByStage
  const list = [];
  D.termFamilies.forEach(fam => Object.keys(D.termsByStage[fam]).forEach(t => list.push({ fam, term: t })));
  const { g, iw, ih, width } = scaffold("c-termstage", 30 + list.length * 26, { l: 220, r: 16, t: 24, b: 10 });
  const yi = stageYear === "2025" ? 0 : 1;
  const x = d3.scaleBand().domain(STAGES).range([0, iw]).padding(0.06);
  const y = d3.scaleBand().domain(list.map(d => d.term)).range([0, ih]).padding(0.12);
  const col = d3.scaleSequential().domain([0, 100]).interpolator(d3.interpolateRgb("#16203c", ACC));
  g.selectAll(".colh").data(STAGES).join("text").attr("x", d => x(d) + x.bandwidth() / 2).attr("y", -8).attr("text-anchor", "middle").attr("fill", SOFT).style("font-size", "11px").style("font-weight", 600).text(d => d);
  list.forEach(row => {
    g.append("text").attr("x", -10).attr("y", y(row.term) + y.bandwidth() / 2 + 4).attr("text-anchor", "end").attr("fill", SOFT).style("font-size", "11px").text(row.term);
    STAGES.forEach(s => {
      const v = D.termsByStage[row.fam][row.term][s][yi];
      g.append("rect").attr("class", "hm-cell").attr("x", x(s)).attr("y", y(row.term)).attr("width", x.bandwidth()).attr("height", y.bandwidth()).attr("rx", 3).attr("fill", col(v))
        .on("mouseover", e => showTip(`<div class="tt-title">${row.term}</div><div class="tt-row"><span>${s} · ${stageYear}</span><b>${v}%</b></div>`, e)).on("mousemove", moveTip).on("mouseout", hideTip);
      g.append("text").attr("class", "hm-value").attr("x", x(s) + x.bandwidth() / 2).attr("y", y(row.term) + y.bandwidth() / 2 + 4).attr("text-anchor", "middle").attr("fill", v > 55 ? "#06121a" : SOFT).text(v + "%");
    });
  });
  function DATA_termInStage() { return true; }
});

/* ---------- FLAGSHIP MATRIX (investor × term heatmap) ---------- */
let matrixYear = "2025", matrixMode = "abs";
reg(function matrix() {
  const ctl = document.getElementById("ctl-matrix"); ctl.innerHTML = "";
  const wrap = document.createElement("div"); wrap.style.display = "flex"; wrap.style.gap = "10px"; wrap.style.flexWrap = "wrap";
  const s1 = document.createElement("div"); s1.id = "mx-y"; const s2 = document.createElement("div"); s2.id = "mx-m";
  wrap.appendChild(s1); wrap.appendChild(s2); ctl.appendChild(wrap);
  seg("mx-y", [{ label: "2025", val: "2025" }, { label: "2024", val: "2024" }], matrixYear, v => { matrixYear = v; matrix(); });
  seg("mx-m", [{ label: "Prevalence", val: "abs" }, { label: "vs market avg", val: "rel" }], matrixMode, v => { matrixMode = v; matrix(); }, true);

  const types = D.investorTypes.map(t => t.type);
  const rows = [];
  D.termFamilies.forEach(fam => Object.keys(D.investorMatrix[fam]).forEach(t => rows.push({ fam, term: t })));
  const yi = matrixYear === "2025" ? 0 : 1;
  const { g, iw, ih } = scaffold("c-matrix", 60 + rows.length * 24, { l: 210, r: 16, t: 56, b: 12 });
  const x = d3.scaleBand().domain(types).range([0, iw]).padding(0.06);
  const y = d3.scaleBand().domain(rows.map(d => d.term)).range([0, ih]).padding(0.1);
  // market avg per term (mean across types) for rel mode
  const colAbs = d3.scaleSequential().domain([0, 100]).interpolator(d3.interpolateRgb("#16203c", ACC2));
  const colRel = d3.scaleDiverging().domain([-40, 0, 40]).interpolator(t => d3.interpolateRgb.gamma(1)(DOWN, UP)(t));
  // column headers with ticket + n
  D.investorTypes.forEach(t => {
    const cx = x(t.type) + x.bandwidth() / 2;
    g.append("text").attr("x", cx).attr("y", -36).attr("text-anchor", "middle").attr("fill", INK).style("font-size", "12px").style("font-weight", 700).text(t.type);
    g.append("text").attr("x", cx).attr("y", -22).attr("text-anchor", "middle").attr("fill", DIM).style("font-size", "10px").text("£" + t.ticket + "m · n=" + t.n);
  });
  let curFam = "";
  rows.forEach(row => {
    const vals = types.map(tp => D.investorMatrix[row.fam][row.term][tp][yi]);
    const avg = d3.mean(vals);
    if (row.fam !== curFam) { curFam = row.fam;
      g.append("text").attr("x", -200).attr("y", y(row.term) - 2).attr("fill", ACC).style("font-size", "9.5px").style("font-weight", 700).style("letter-spacing", ".1em").text(row.fam.toUpperCase()); }
    g.append("text").attr("x", -10).attr("y", y(row.term) + y.bandwidth() / 2 + 4).attr("text-anchor", "end").attr("fill", SOFT).style("font-size", "11px").text(row.term);
    types.forEach((tp, i) => {
      const v = vals[i]; const rel = v - avg;
      g.append("rect").attr("class", "hm-cell").attr("x", x(tp)).attr("y", y(row.term)).attr("width", x.bandwidth()).attr("height", y.bandwidth()).attr("rx", 3)
        .attr("fill", matrixMode === "abs" ? colAbs(v) : colRel(rel))
        .on("mouseover", e => showTip(`<div class="tt-title">${row.term}</div><div class="tt-row"><span>${tp} · ${matrixYear}</span><b>${v}%</b></div><div class="tt-row"><span>vs market avg</span><b class="${rel >= 0 ? 'up' : 'down'}">${fmt.pp(Math.round(rel))}</b></div>`, e))
        .on("mousemove", moveTip).on("mouseout", hideTip);
      g.append("text").attr("class", "hm-value").attr("x", x(tp) + x.bandwidth() / 2).attr("y", y(row.term) + y.bandwidth() / 2 + 4).attr("text-anchor", "middle")
        .attr("fill", (matrixMode === "abs" ? v > 55 : Math.abs(rel) > 22) ? "#06121a" : SOFT).style("font-size", "10px").style("font-weight", 700).text(v + "%");
    });
  });
});

/* ---------- ESG / DEI BY STAGE (grouped bars) ---------- */
function stageYearBars(id, legendId, dataObj, baseColor) {
  const { g, iw, ih } = scaffold(id, 320, { l: 36, r: 14, t: 16, b: 40 });
  const groups = Object.keys(dataObj).filter(k => k !== "years");
  const years = dataObj.years;
  const x0 = d3.scaleBand().domain(groups).range([0, iw]).padding(0.18);
  const x1 = d3.scaleBand().domain(years).range([0, x0.bandwidth()]).padding(0.08);
  const y = d3.scaleLinear().domain([0, 35]).range([ih, 0]).nice();
  const yc = d3.scaleOrdinal().domain(years).range(["#0B6E84", "#C9A9D6", "#9E6BA6", "#6A3A78"]);
  gridY(g, y, iw, 5); axisLeft(g, y, d => d + "%", 5);
  g.append("g").attr("class", "axis").attr("transform", `translate(0,${ih})`).call(d3.axisBottom(x0).tickSize(0)).selectAll("text").style("font-size", "10px").attr("transform", "rotate(-12)").style("text-anchor", "end");
  groups.forEach(grp => {
    years.forEach((yr, i) => {
      const v = dataObj[grp][i];
      g.append("rect").attr("x", x0(grp) + x1(yr)).attr("width", x1.bandwidth()).attr("y", y(v)).attr("height", ih - y(v)).attr("rx", 1.5).attr("fill", yc(yr))
        .on("mouseover", e => showTip(`<div class="tt-title">${grp} · ${yr}</div><div class="tt-row"><span>Share</span><b>${v}%</b></div>`, e)).on("mousemove", moveTip).on("mouseout", hideTip);
    });
  });
  legend(legendId, years.map(yr => ({ label: yr, color: yc(yr) })));
}
reg(function esg() { stageYearBars("c-esg", "l-esg", D.esgByStage); });
reg(function dei() { stageYearBars("c-dei", "l-dei", D.deiByStage); });

/* ---------- REMIX 1: FOUNDER-FRIENDLINESS INDEX (radar) ---------- */
reg(function ffi() {
  // founder-favourable terms (higher=better for founder) vs investor-favourable (higher=worse)
  // Build a composite 0-100 per stage from 2025 termsByStage.
  const investorFav = [
    ["Economic", "Anti-dilution ratchet"], ["Economic", "% Pref. shares non-participating", true /*invert: nonpart is founder-friendly*/],
    ["Control", "Founder vesting"], ["Control", "Founder leaver provision"], ["Control", "Investor consent rights"],
    ["Other", "Founder Warranties"], ["Other", "Monitoring fees"], ["Other", "Arrangement fees"]
  ];
  const score = STAGES.map(s => {
    let sum = 0, n = 0;
    investorFav.forEach(([fam, term, founderFriendly]) => {
      const v = D.termsByStage[fam][term][s][0];
      sum += founderFriendly ? v : (100 - v); n++;
    });
    return { stage: s, score: Math.round(sum / n) };
  });
  const { svg, width } = scaffold("c-ffi", 320, { l: 0, r: 0, t: 0, b: 0 });
  const cx = width / 2, cy = 150, R = 110;
  const g = svg.append("g").attr("transform", `translate(${cx},${cy})`);
  const ang = s => (STAGES.indexOf(s) / STAGES.length) * 2 * Math.PI; // evenly spaced, no endpoint overlap
  const rad = d3.scaleLinear().domain([0, 100]).range([0, R]);
  [25, 50, 75, 100].forEach(t => g.append("circle").attr("r", rad(t)).attr("fill", "none").attr("stroke", LINE).attr("stroke-opacity", .6));
  STAGES.forEach(s => {
    const a = ang(s) - Math.PI / 2;
    g.append("line").attr("x1", 0).attr("y1", 0).attr("x2", Math.cos(a) * R).attr("y2", Math.sin(a) * R).attr("stroke", LINE);
    g.append("text").attr("x", Math.cos(a) * (R + 18)).attr("y", Math.sin(a) * (R + 18) + 4).attr("text-anchor", "middle").attr("fill", SOFT).style("font-size", "11px").text(s.replace("Series ", "Ser "));
  });
  const pts = score.map(d => { const a = ang(d.stage) - Math.PI / 2; return [Math.cos(a) * rad(d.score), Math.sin(a) * rad(d.score), d]; });
  g.append("path").attr("d", d3.line().curve(d3.curveLinearClosed)(pts)).attr("fill", ACC).attr("fill-opacity", .18).attr("stroke", ACC).attr("stroke-width", 2);
  g.selectAll("circle.pt").data(pts).join("circle").attr("cx", d => d[0]).attr("cy", d => d[1]).attr("r", 5).attr("fill", ACC).attr("stroke", "#0a0e1a")
    .on("mouseover", (e, d) => showTip(`<div class="tt-title">${d[2].stage}</div><div class="tt-row"><span>Founder-friendliness</span><b>${d[2].score}/100</b></div>`, e)).on("mousemove", moveTip).on("mouseout", hideTip);
  g.selectAll("text.sc").data(pts).join("text").attr("x", d => d[0]).attr("y", d => d[1] - 10).attr("text-anchor", "middle").attr("fill", ACC).style("font-size", "11px").style("font-weight", 700).text(d => d[2].score);
  svg.append("text").attr("x", width / 2).attr("y", 300).attr("text-anchor", "middle").attr("fill", DIM).style("font-size", "10.5px").text("Higher = terms tilt more founder-favourable");
});

/* ---------- REMIX 2: TERM JOURNEY across funnel ---------- */
let journeyTerm = "Founder vesting";
reg(function journey() {
  const all = []; D.termFamilies.forEach(f => Object.keys(D.termsByStage[f]).forEach(t => all.push({ val: t, label: t })));
  dropdown("ctl-journey", "Term", all, journeyTerm, v => { journeyTerm = v; journey(); });
  const fam = D.termFamilies.find(f => D.termsByStage[f][journeyTerm]);
  const rec = D.termsByStage[fam][journeyTerm];
  const { g, iw, ih } = scaffold("c-journey", 300, { l: 40, r: 50, t: 18, b: 28 });
  const x = d3.scalePoint().domain(STAGES).range([0, iw]).padding(0.4);
  const y = d3.scaleLinear().domain([0, 100]).range([ih, 0]);
  gridY(g, y, iw, 5); axisLeft(g, y, d => d + "%", 5); axisBottom(g, x, ih);
  [["2024", 1, DIM], ["2025", 0, ACC]].forEach(([lab, idx, c]) => {
    const series = STAGES.map(s => rec[s][idx]);
    const line = d3.line().x((d, i) => x(STAGES[i])).y(d => y(d)).curve(d3.curveMonotoneX);
    g.append("path").datum(series).attr("fill", "none").attr("stroke", c).attr("stroke-width", lab === "2025" ? 3 : 1.8).attr("stroke-dasharray", lab === "2024" ? "4 4" : null).attr("d", line);
    g.selectAll(".j" + lab).data(series).join("circle").attr("r", 4).attr("cx", (d, i) => x(STAGES[i])).attr("cy", d => y(d)).attr("fill", c).attr("stroke", "#0a0e1a")
      .on("mouseover", (e, d) => { const i = series.indexOf(d); showTip(`<div class="tt-title">${journeyTerm}</div><div class="tt-row"><span>${STAGES[i]} · ${lab}</span><b>${d}%</b></div>`, e); }).on("mousemove", moveTip).on("mouseout", hideTip);
    if (lab === "2025") g.selectAll(".jl").data(series).join("text").attr("class", "val-label").attr("text-anchor", "middle").attr("x", (d, i) => x(STAGES[i])).attr("y", d => y(d) - 9).text(d => d + "%");
  });
  d3.select("#c-journey").append("div").attr("class", "legend").html(`<span class="item"><span class="swatch" style="background:${ACC}"></span>2025</span><span class="item"><span class="swatch" style="background:${DIM}"></span>2024</span>`);
});

/* ---------- REMIX 3: 2024→2025 DRIFT (diverging lollipop) ---------- */
reg(function drift() {
  const rows = [];
  D.termFamilies.forEach(fam => Object.entries(D.termsTimeSeries[fam]).forEach(([t, o]) => rows.push({ term: t, ppt: o.ppt, fam })));
  rows.push({ term: "Convertibles", ppt: D.convertSecondary.convertibles.ppt, fam: "Economic" });
  rows.push({ term: "Secondaries", ppt: D.convertSecondary.secondaries.ppt, fam: "Economic" });
  rows.sort((a, b) => b.ppt - a.ppt);
  const { g, iw, ih } = scaffold("c-drift", 40 + rows.length * 24, { l: 200, r: 40, t: 10, b: 24 });
  const y = d3.scaleBand().domain(rows.map(d => d.term)).range([0, ih]).padding(0.35);
  const x = d3.scaleLinear().domain([-6, 10]).range([0, iw]);
  g.append("line").attr("x1", x(0)).attr("x2", x(0)).attr("y1", 0).attr("y2", ih).attr("stroke", LINE);
  g.append("g").attr("class", "axis").attr("transform", `translate(0,${ih})`).call(d3.axisBottom(x).tickFormat(d => (d > 0 ? "+" : "") + d).tickSizeOuter(0));
  rows.forEach(d => {
    const yy = y(d.term) + y.bandwidth() / 2; const c = d.ppt > 0 ? UP : d.ppt < 0 ? DOWN : DIM;
    g.append("text").attr("x", -10).attr("y", yy + 4).attr("text-anchor", "end").attr("fill", SOFT).style("font-size", "11px").text(d.term);
    g.append("line").attr("x1", x(0)).attr("x2", x(d.ppt)).attr("y1", yy).attr("y2", yy).attr("stroke", c).attr("stroke-width", 2);
    g.append("circle").attr("cx", x(d.ppt)).attr("cy", yy).attr("r", 5).attr("fill", c)
      .on("mouseover", e => showTip(`<div class="tt-title">${d.term}</div><div class="tt-row"><span>'24 → '25</span><b class="${d.ppt >= 0 ? 'up' : 'down'}">${fmt.pp(d.ppt)}</b></div>`, e)).on("mousemove", moveTip).on("mouseout", hideTip);
    g.append("text").attr("x", x(d.ppt) + (d.ppt >= 0 ? 9 : -9)).attr("y", yy + 4).attr("text-anchor", d.ppt >= 0 ? "start" : "end").attr("fill", c).style("font-size", "10.5px").style("font-weight", 700).text(fmt.pp(d.ppt));
  });
});

/* ---------- REMIX 4: SECTOR MOMENTUM QUADRANT ---------- */
reg(function quadrant() {
  const rows = D.sectorShare.rows.map(r => ({ sector: r.sector, share: r.values[3], ppt: r.ppt, deepTech: r.deepTech }));
  const { g, iw, ih } = scaffold("c-quadrant", 380, { l: 44, r: 24, t: 16, b: 40 });
  const x = d3.scaleLinear().domain([0, 19]).range([0, iw]).nice();
  const y = d3.scaleLinear().domain([-2.2, 3.6]).range([ih, 0]).nice();
  const r = d3.scaleSqrt().domain([0, 18]).range([5, 30]);
  const medShare = d3.median(rows, d => d.share);
  // quadrant shading
  g.append("rect").attr("x", x(medShare)).attr("y", 0).attr("width", iw - x(medShare)).attr("height", y(0)).attr("fill", UP).attr("opacity", .05);
  gridY(g, y, iw, 6);
  g.append("line").attr("x1", x(medShare)).attr("x2", x(medShare)).attr("y1", 0).attr("y2", ih).attr("stroke", LINE).attr("stroke-dasharray", "3 3");
  g.append("line").attr("x1", 0).attr("x2", iw).attr("y1", y(0)).attr("y2", y(0)).attr("stroke", LINE).attr("stroke-dasharray", "3 3");
  axisLeft(g, y, d => fmt.pp(d), 6);
  g.append("g").attr("class", "axis").attr("transform", `translate(0,${ih})`).call(d3.axisBottom(x).ticks(6).tickFormat(d => d + "%").tickSizeOuter(0));
  g.append("text").attr("x", iw / 2).attr("y", ih + 34).attr("text-anchor", "middle").attr("class", "axis-label").text("Share of 2025 term sheets →");
  g.append("text").attr("transform", "rotate(-90)").attr("x", -ih / 2).attr("y", -34).attr("text-anchor", "middle").attr("class", "axis-label").text("2024 → 2025 shift");
  // corner hints
  g.append("text").attr("x", iw - 4).attr("y", 14).attr("text-anchor", "end").attr("fill", UP).attr("opacity", .7).style("font-size", "10px").style("font-weight", 700).text("SCALING STARS");
  g.append("text").attr("x", iw - 4).attr("y", ih - 6).attr("text-anchor", "end").attr("fill", DOWN).attr("opacity", .6).style("font-size", "10px").style("font-weight", 700).text("FADING GIANTS");
  g.selectAll("circle").data(rows).join("circle").attr("cx", d => x(d.share)).attr("cy", d => y(d.ppt)).attr("r", 0)
    .attr("fill", d => d.ppt >= 0 ? UP : DOWN).attr("opacity", .5).attr("stroke", d => d.ppt >= 0 ? UP : DOWN).attr("stroke-width", 1.4)
    .on("mouseover", function (e, d) { d3.select(this).attr("opacity", .8); showTip(`<div class="tt-title">${d.sector} ${d.deepTech ? '◆' : ''}</div><div class="tt-row"><span>2025 share</span><b>${d.share}%</b></div><div class="tt-row"><span>'24→'25</span><b class="${d.ppt >= 0 ? 'up' : 'down'}">${fmt.pp(d.ppt)}</b></div>`, e); })
    .on("mousemove", moveTip).on("mouseout", function () { d3.select(this).attr("opacity", .5); hideTip(); })
    .transition().duration(700).attr("r", d => r(d.share));
  g.selectAll(".ql").data(rows).join("text").attr("x", d => x(d.share)).attr("y", d => y(d.ppt) - r(d.share) - 4).attr("text-anchor", "middle")
    .attr("fill", SOFT).style("font-size", "9.5px").text(d => d.sector.length > 14 ? d.sector.split(" ")[0] : d.sector);
});

/* ---------- REMIX 5: VALUATION LADDER (log steps) ---------- */
reg(function ladder() {
  const data = STAGES.map(s => ({ stage: s, band: D.meta.stageBands[s], pm: D.postMoneyByStage[s].values[4], cheque: D.investmentSizeByStage[s].values[4] }));
  const { g, iw, ih } = scaffold("c-ladder", 360, { l: 20, r: 20, t: 30, b: 20 });
  const y = d3.scalePoint().domain(STAGES).range([ih, 0]).padding(0.6);
  const x = d3.scaleLog().domain([3, 300]).range([0, iw]);
  // connecting path
  const line = d3.line().x(d => x(d.pm)).y(d => y(d.stage)).curve(d3.curveMonotoneX);
  g.append("path").datum(data).attr("d", line).attr("fill", "none").attr("stroke", LINE).attr("stroke-width", 2);
  data.forEach((d, i) => {
    const cy = y(d.stage), cx = x(d.pm);
    g.append("circle").attr("cx", cx).attr("cy", cy).attr("r", 9).attr("fill", stageColor(d.stage)).attr("stroke", "#0a0e1a").attr("stroke-width", 2)
      .on("mouseover", e => showTip(`<div class="tt-title">${d.stage} <span style="color:${DIM}">${d.band}</span></div><div class="tt-row"><span>Median post-money</span><b>£${d.pm}m</b></div><div class="tt-row"><span>Avg cheque</span><b>£${d.cheque}m</b></div>`, e))
      .on("mousemove", moveTip).on("mouseout", hideTip);
    g.append("text").attr("x", cx).attr("y", cy - 16).attr("text-anchor", "middle").attr("fill", INK).style("font-size", "13px").style("font-weight", 800).style("font-family", "var(--mono)").text("£" + d.pm + "m");
    g.append("text").attr("x", cx).attr("y", cy + 24).attr("text-anchor", "middle").attr("fill", SOFT).style("font-size", "11px").style("font-weight", 600).text(d.stage);
    g.append("text").attr("x", cx).attr("y", cy + 38).attr("text-anchor", "middle").attr("fill", DIM).style("font-size", "9.5px").text("cheque £" + d.cheque + "m");
    if (i > 0) {
      const prev = data[i - 1], mult = (d.pm / prev.pm);
      const mx = (x(prev.pm) + x(d.pm)) / 2, my = (y(prev.stage) + y(d.stage)) / 2;
      g.append("text").attr("x", mx + 14).attr("y", my + 4).attr("fill", GOLD).style("font-size", "11px").style("font-weight", 700).text("×" + mult.toFixed(1));
    }
  });
  g.append("text").attr("x", 0).attr("y", -16).attr("fill", DIM).style("font-size", "10px").text("log scale →");
});

/* ---------- REMIX 6: DEALS vs CAPITAL (slope) ---------- */
reg(function dealsvalue() {
  const mix2025 = D.volumeMixByStage[4]; // {Seed,Series A,...}
  const cap = D.ukVcConcentration; const ci = cap.years.indexOf(2025);
  const capTotal = STAGES.reduce((a, s) => a + cap[s][ci], 0);
  const data = STAGES.map(s => ({ stage: s, vol: mix2025[s], val: +(cap[s][ci] / capTotal * 100).toFixed(1) }));
  const { g, iw, ih } = scaffold("c-dealsvalue", 340, { l: 16, r: 16, t: 26, b: 28 });
  const x = d3.scalePoint().domain(["Deals", "Capital"]).range([0, iw]).padding(0.6);
  const y = d3.scaleLinear().domain([0, 65]).range([ih, 0]).nice();
  g.append("text").attr("x", x("Deals")).attr("y", -10).attr("text-anchor", "middle").attr("fill", SOFT).style("font-size", "12px").style("font-weight", 700).text("% of deals");
  g.append("text").attr("x", x("Capital")).attr("y", -10).attr("text-anchor", "middle").attr("fill", SOFT).style("font-size", "12px").style("font-weight", 700).text("% of capital");
  axisBottom(g, x, ih);
  data.forEach(d => {
    const c = stageColor(d.stage);
    g.append("line").attr("x1", x("Deals")).attr("x2", x("Capital")).attr("y1", y(d.vol)).attr("y2", y(d.val)).attr("stroke", c).attr("stroke-width", 2.5).attr("opacity", .85)
      .on("mouseover", e => showTip(`<div class="tt-title">${d.stage}</div><div class="tt-row"><span>Share of deals</span><b>${d.vol}%</b></div><div class="tt-row"><span>Share of capital</span><b>${d.val}%</b></div>`, e))
      .on("mousemove", moveTip).on("mouseout", hideTip);
    g.append("circle").attr("cx", x("Deals")).attr("cy", y(d.vol)).attr("r", 5).attr("fill", c).attr("stroke", "#0a0e1a");
    g.append("circle").attr("cx", x("Capital")).attr("cy", y(d.val)).attr("r", 5).attr("fill", c).attr("stroke", "#0a0e1a");
    g.append("text").attr("x", x("Deals") - 10).attr("y", y(d.vol) + 4).attr("text-anchor", "end").attr("fill", c).style("font-size", "10.5px").style("font-weight", 700).text(d.stage.replace("Series ", "") + " " + d.vol + "%");
    g.append("text").attr("x", x("Capital") + 10).attr("y", y(d.val) + 4).attr("fill", c).style("font-size", "10.5px").style("font-weight", 700).text(d.val + "%");
  });
});

/* ---------- REMIX 7: INVESTOR PERSONALITIES (parallel coords) ---------- */
reg(function parallel() {
  const dims = [
    ["Economic", "Liquidation preferences", "Liq. pref"],
    ["Economic", "Anti-dilution ratchet", "Anti-dilution"],
    ["Control", "Board appointments", "Board seat"],
    ["Control", "Founder leaver provision", "Leaver"],
    ["Control", "Drag-along provision", "Drag-along"],
    ["Other", "Arrangement fees", "Arr. fees"],
    ["Other", "DEI clause", "DEI"]
  ];
  const types = D.investorTypes.map(t => t.type);
  const col = d3.scaleOrdinal().domain(types).range([ACC, GOLD, UP, ACC2, "#ff9e64", "#ff6b81"]);
  const { g, iw, ih } = scaffold("c-parallel", 360, { l: 24, r: 24, t: 26, b: 44 });
  const x = d3.scalePoint().domain(dims.map(d => d[2])).range([0, iw]).padding(0.04);
  const y = d3.scaleLinear().domain([0, 100]).range([ih, 0]);
  dims.forEach(d => {
    const ax = x(d[2]);
    g.append("line").attr("x1", ax).attr("x2", ax).attr("y1", 0).attr("y2", ih).attr("stroke", LINE);
    [0, 50, 100].forEach(t => g.append("text").attr("x", ax - 5).attr("y", y(t) + 3).attr("text-anchor", "end").attr("fill", DIM).style("font-size", "8.5px").text(t));
    g.append("text").attr("x", ax).attr("y", ih + 16).attr("text-anchor", "middle").attr("fill", SOFT).style("font-size", "10px").style("font-weight", 600).text(d[2]);
  });
  const line = d3.line().x((d, i) => x(dims[i][2])).y(d => y(d)).curve(d3.curveMonotoneX);
  const paths = [];
  types.forEach(tp => {
    const series = dims.map(([fam, term]) => D.investorMatrix[fam][term][tp][0]);
    const p = g.append("path").datum(series).attr("fill", "none").attr("stroke", col(tp)).attr("stroke-width", 2.2).attr("opacity", .75).attr("d", line);
    paths.push({ p, tp });
    g.selectAll(".pp" + tp.replace(/\W/g, "")).data(series).join("circle").attr("r", 3).attr("cx", (d, i) => x(dims[i][2])).attr("cy", d => y(d)).attr("fill", col(tp));
  });
  // hover interaction via legend
  legend("l-parallel", types.map(t => ({ label: t, color: col(t) })));
  d3.selectAll("#l-parallel .item").style("cursor", "pointer")
    .on("mouseover", function (e, _) {
      const lbl = d3.select(this).select("span:last-child").text();
      paths.forEach(o => o.p.attr("opacity", o.tp === lbl ? 1 : .08).attr("stroke-width", o.tp === lbl ? 3.2 : 2.2));
    })
    .on("mouseout", () => paths.forEach(o => o.p.attr("opacity", .75).attr("stroke-width", 2.2)));
});

/* ---------- REMIX 8: SANKEY — year → investor location → round ---------- */
reg(function sankey() {
  const host = document.getElementById("c-sankey");
  if (!d3.sankey) { host.innerHTML = '<p style="color:var(--ink-dim);font-size:13px">Sankey library unavailable.</p>'; return; }
  const G = D.leadInvestorHQ, yrs = G.years, locs = ["UK", "Europe", "US", "Other"];
  const locColor = { UK: "#2f7d4f", Europe: "#5ad1ff", US: "#0B6E84", Other: "#C9A9D6" };
  const count = (y, l, s) => { const rec = G[s], yi = yrs.indexOf(y); return Math.round(rec.n[yi] * rec[l][yi] / 100); };

  // nodes
  const names = [];
  yrs.forEach(y => names.push("Y:" + y));
  locs.forEach(l => names.push("L:" + l));
  STAGES.forEach(s => names.push("S:" + s));
  const idx = Object.fromEntries(names.map((n, i) => [n, i]));
  const nodes = names.map(n => ({ name: n }));

  // links (marginal flows; conserved at each location node)
  const links = [];
  yrs.forEach(y => locs.forEach(l => { let v = 0; STAGES.forEach(s => v += count(y, l, s)); if (v > 0) links.push({ source: idx["Y:" + y], target: idx["L:" + l], value: v, loc: l }); }));
  locs.forEach(l => STAGES.forEach(s => { let v = 0; yrs.forEach(y => v += count(y, l, s)); if (v > 0) links.push({ source: idx["L:" + l], target: idx["S:" + s], value: v, loc: l }); }));

  const { svg, iw, ih } = scaffold("c-sankey", 440, { l: 8, r: 8, t: 8, b: 8 });
  const defs = svg.append("defs");
  const sk = d3.sankey().nodeWidth(16).nodePadding(16).nodeSort(null).extent([[60, 8], [iw - 60, ih - 8]]);
  const graph = sk({ nodes: nodes.map(d => Object.assign({}, d)), links: links.map(d => Object.assign({}, d)) });
  const g = svg.append("g");

  const disp = x => { const s = typeof x === "string" ? x : x.name; return s.replace(/^[YLS]:/, ""); };
  const nodeFill = n => n.name[0] === "Y" ? "#3a456b" : n.name[0] === "L" ? locColor[disp(n)] : stageColor(disp(n));

  // gradient per link (source colour → target colour feel): use location colour
  g.append("g").attr("fill", "none").selectAll("path").data(graph.links).join("path")
    .attr("d", d3.sankeyLinkHorizontal())
    .attr("stroke", d => locColor[d.loc]).attr("stroke-opacity", .32)
    .attr("stroke-width", d => Math.max(1, d.width))
    .on("mouseover", function (e, d) {
      d3.select(this).attr("stroke-opacity", .6);
      showTip(`<div class="tt-title">${disp(d.source)} → ${disp(d.target)}</div><div class="tt-row"><span>Term sheets</span><b>${d.value}</b></div>`, e);
    }).on("mousemove", moveTip).on("mouseout", function () { d3.select(this).attr("stroke-opacity", .32); hideTip(); });

  // nodes
  const nodeG = g.append("g").selectAll("g").data(graph.nodes).join("g");
  nodeG.append("rect").attr("x", d => d.x0).attr("y", d => d.y0).attr("height", d => Math.max(1, d.y1 - d.y0)).attr("width", d => d.x1 - d.x0)
    .attr("rx", 3).attr("fill", d => nodeFill(d)).attr("stroke", "#0a0e1a")
    .on("mouseover", (e, d) => showTip(`<div class="tt-title">${disp(d)}</div><div class="tt-row"><span>${d.name[0] === 'S' ? 'Deals into round' : d.name[0] === 'L' ? 'Deals led from here' : 'Deals this year'}</span><b>${d.value}</b></div>`, e))
    .on("mousemove", moveTip).on("mouseout", hideTip);
  nodeG.append("text").attr("x", d => d.x0 < iw / 2 ? d.x1 + 7 : d.x0 - 7).attr("y", d => (d.y0 + d.y1) / 2)
    .attr("dy", "0.35em").attr("text-anchor", d => d.x0 < iw / 2 ? "start" : "end")
    .attr("fill", INK).style("font-size", "11.5px").style("font-weight", 600)
    .text(d => disp(d) + (d.name[0] !== "Y" ? "  " + d.value : ""));

  // column captions
  [["Survey year", 60 + 8], ["Lead-investor HQ", iw / 2], ["Round", iw - 60 - 8]].forEach(([t, xx], i) =>
    g.append("text").attr("x", xx).attr("y", ih + 4).attr("text-anchor", i === 0 ? "start" : i === 2 ? "end" : "middle").attr("fill", DIM).style("font-size", "10px").style("letter-spacing", ".1em").style("text-transform", "uppercase").text(t));

  legend("l-sankey", locs.map(l => ({ label: l + " lead", color: locColor[l] })));
});

/* ====================================================================== *
 *  RENDER + NAV + RESIZE                                                  *
 * ====================================================================== */
function renderAll() { CHARTS.forEach(fn => { try { fn(); } catch (e) { console.error("chart err", fn.name, e); } }); }

// nav scrollspy + click
const navLinks = [...document.querySelectorAll("#nav a")];
navLinks.forEach(a => a.addEventListener("click", () => {
  const el = document.getElementById(a.dataset.target);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}));
const sections = navLinks.map(a => document.getElementById(a.dataset.target)).filter(Boolean);
const spy = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) {
    navLinks.forEach(a => a.classList.toggle("active", a.dataset.target === en.target.id));
  }});
}, { rootMargin: "-45% 0px -50% 0px" });
sections.forEach(s => spy.observe(s));

// reveal cards
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); revealObs.unobserve(en.target); } });
}, { rootMargin: "0px 0px -8% 0px" });
document.querySelectorAll(".card").forEach(c => revealObs.observe(c));

// resize (debounced) — re-render to keep responsive widths crisp
let rt;
window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(renderAll, 250); });

renderAll();
})();
