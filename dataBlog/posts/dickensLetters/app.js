// --- APP STATE ---
let dashboardData = null;
let lettersLight = null;
let lettersEnriched = null;
let lettersMentions = null;

// Filtering & Search state
let recipientDominantTheme = {};
let activeYearMin = 1820;
let activeYearMax = 1870;
let activeTheme = "all";
let activeRecipient = "all";
let activeLocation = "all";
let searchQuery = "";
let sortField = "date-asc";

// Coords dictionary & Travel state
let locationCoords = {};
let travelStops = [];
let travelTimer = null;
let travelActiveIndex = 0;
let travelSpeed = 5;
let travelPathPolyline = null;
let travelMarker = null;

// Pagination state
let currentPage = 1;
const ITEMS_PER_PAGE = 50;

// Theme Colors Map
const THEME_COLORS = {
    "Literature/Writing": "#8a1a1a", // Deep Crimson
    "Family/Personal": "#b23b68",     // Deep Rose/Plum
    "Theatre/Readings": "#c84b31",    // Terracotta
    "Travel/Places": "#1e5a8a",       // Deep Steel Blue
    "Social Reform/Philanthropy": "#1c6838", // Deep Forest Green
    "Business/Finance": "#54308a",    // Deep Indigo
    "Mixed/Other": "#5c5446"          // Ink Charcoal
};

// Map instances
let map = null;
let sentMarkerGroup = null;
let mentionedMarkerGroup = null;

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
    initTabs();
    loadDashboardData();
    initModal();
});

// Tab Routing
function initTabs() {
    const navButtons = document.querySelectorAll(".nav-btn");
    const panes = document.querySelectorAll(".tab-pane");
    
    navButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetTab = btn.getAttribute("data-tab");
            
            navButtons.forEach(b => b.classList.remove("active"));
            panes.forEach(p => p.classList.remove("active"));
            
            btn.classList.add("active");
            document.getElementById(targetTab).classList.add("active");
            
            // Map redraw fix
            if (targetTab === "map-tab") {
                setTimeout(() => {
                    if (!map) {
                        initMap();
                    } else {
                        map.invalidateSize();
                    }
                }, 100);
            }

            // Pivot table draw
            if (targetTab === "pivot-tab") {
                setTimeout(() => {
                    generatePivotTable();
                }, 100);
            }
        });
    });
}

// --- DATA LOADERS ---
async function loadDashboardData() {
    const progressEl = document.getElementById("loader-progress");
    try {
        progressEl.textContent = "Fetching dashboard aggregates...";
        const response = await fetch("dashboard_data.json");
        dashboardData = await response.json();
        
        // Build coordinates dictionary
        dashboardData.sent_locations.forEach(loc => {
            locationCoords[loc.name] = [loc.latitude, loc.longitude];
        });
        dashboardData.mentioned_locations.forEach(loc => {
            locationCoords[loc.name] = [loc.latitude, loc.longitude];
        });
        
        // Render stats & charts
        populateStats(dashboardData.stats);
        renderTimeline();
        renderThemesDonut(dashboardData.themes);
        renderCorrespondents();
        
        // Hide loader overlay
        document.getElementById("app-loader").style.opacity = "0";
        setTimeout(() => {
            document.getElementById("app-loader").style.display = "none";
        }, 400);
        
        // Load search index
        loadLettersLight();
    } catch (err) {
        console.error("Error loading dashboard data:", err);
        progressEl.textContent = "Failed to load dashboard data. Retrying...";
    }
}

async function loadLettersLight() {
    const statusEl = document.getElementById("full-load-status");
    try {
        const response = await fetch("letters_light.json");
        lettersLight = await response.json();
        
        // Render timeline now that letters index is available
        renderTimeline();
        
        // Populate dropdown options
        populateDropdowns(lettersLight);
        
        // Init search event listeners
        initSearchControls();
        
        // Init pivot controls
        initPivotControls();
        
        // Initial search rendering
        updateSearchResults();
        
        // Compute dominant themes for correspondents
        computeRecipientDominantThemes();
        
        // Render word analytics (average word count + outliers list)
        renderWordAnalytics();
        
        // Render barcode timeline
        renderCorrespondentsTimeline();

        // Initialize travel player
        initTravelPlayer();

        statusEl.innerHTML = '<i class="fa-solid fa-circle-check" style="color: var(--gold-accent);"></i> Search Engine Ready';

        // Load the small mentioned-locations sidecar (used by modal + stats)
        loadLettersMentions();

        // Async load the full content in the background for detailed reader
        loadLettersEnriched();
    } catch (err) {
        console.error("Error loading lightweight index:", err);
        statusEl.textContent = "Search engine initialization failed.";
    }
}

async function loadLettersMentions() {
    try {
        const response = await fetch("letters_mentions.json");
        lettersMentions = await response.json();
        // Refresh the mentioned-locations stat now that data is available
        if (lettersLight) updateSearchResults();
    } catch (err) {
        console.error("Error loading mentions sidecar:", err);
    }
}

async function loadLettersEnriched() {
    try {
        const response = await fetch("dickens_letters_enriched.json");
        lettersEnriched = await response.json();
        console.log("Full enriched letters loaded in background.");
        
        // Recalculate search results/stats now that enriched data is ready
        if (lettersLight) {
            updateSearchResults();
        }
    } catch (err) {
        console.error("Error loading full enriched letters:", err);
    }
}

// --- DASHBOARD FUNCTIONS ---
function populateStats(stats) {
    const sub = document.getElementById("app-subtitle");
    if (sub && stats.start_year && stats.end_year) {
        sub.textContent = `An Interactive Journey through ${stats.total_letters.toLocaleString()} Letters (${stats.start_year}–${stats.end_year})`;
    }
    document.getElementById("stat-total-letters").textContent = stats.total_letters.toLocaleString();
    document.getElementById("stat-total-words").textContent = stats.total_words.toLocaleString();
    document.getElementById("stat-avg-words").textContent = stats.avg_word_count + " words";
    document.getElementById("stat-sent-locs").textContent = dashboardData.sent_locations.length;
    document.getElementById("stat-ment-locs").textContent = dashboardData.mentioned_locations.length;
}

function computeRecipientDominantThemes() {
    const recThemes = {};
    lettersLight.forEach(l => {
        const r = l.r;
        if (!r) return;
        if (!recThemes[r]) recThemes[r] = {};
        l.t.forEach(theme => {
            recThemes[r][theme] = (recThemes[r][theme] || 0) + 1;
        });
    });
    
    Object.keys(recThemes).forEach(r => {
        let maxCount = 0;
        let bestTheme = "Mixed/Other";
        Object.keys(recThemes[r]).forEach(t => {
            if (recThemes[r][t] > maxCount) {
                maxCount = recThemes[r][t];
                bestTheme = t;
            }
        });
        recipientDominantTheme[r] = bestTheme;
    });
}

function renderTimeline() {
    renderTimelineVolume();
}

function getYearAndMonth(dStr) {
    if (!dStr) return null;
    const yearMatch = dStr.match(/\b(18\d{2})\b/);
    if (!yearMatch) return null;
    const year = parseInt(yearMatch[1]);
    
    // Try to parse month
    let month = 0; // default to Jan
    const lower = dStr.toLowerCase();
    
    const isoMatch = dStr.match(/\b18\d{2}-(\d{2})-\d{2}\b/);
    if (isoMatch) {
        month = parseInt(isoMatch[1]) - 1;
        return { year, month };
    }
    
    const monthNames = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
    for (let i = 0; i < 12; i++) {
        if (lower.includes(monthNames[i])) return { year, month: i };
    }
    const shortMonthNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    for (let i = 0; i < 12; i++) {
        if (lower.includes(shortMonthNames[i])) return { year, month: i };
    }
    
    return { year, month: 0 };
}

function renderTimelineVolume() {
    const container = document.getElementById("timeline-chart-container");
    container.innerHTML = "";
    
    if (!lettersLight) {
        container.innerHTML = '<div style="text-align: center; padding-top: 100px; font-family: var(--font-serif); color: var(--text-secondary);"><span class="spinner-small"></span> Aligning calendar stops...</div>';
        return;
    }
    
    // Determine bounds
    const startYear = 1835;
    const endYear = 1870;
    
    // Generate monthly bins
    const bins = [];
    for (let y = startYear; y <= endYear; y++) {
        for (let m = 0; m < 12; m++) {
            bins.push({
                year: y,
                month: m,
                key: `${y}-${String(m+1).padStart(2, '0')}`,
                count: 0
            });
        }
    }
    
    // Fill bins
    lettersLight.forEach(l => {
        const ym = getYearAndMonth(l.d);
        if (ym) {
            const idx = (ym.year - startYear) * 12 + ym.month;
            if (idx >= 0 && idx < bins.length) {
                bins[idx].count++;
            }
        }
    });
    
    const margin = { top: 20, right: 20, bottom: 40, left: 50 };
    const width = container.clientWidth - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
    
    const svg = d3.select("#timeline-chart-container")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
        
    const x = d3.scaleBand()
        .domain(bins.map(b => b.key))
        .range([0, width])
        .padding(0.1);
        
    const y = d3.scaleLinear()
        .domain([0, d3.max(bins, d => d.count) * 1.05 || 10])
        .range([height, 0]);
        
    // X Axis - tick marks every 5 years for readability
    const tickValues = bins.filter(b => b.month === 0 && b.year % 5 === 0).map(b => b.key);
    
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x)
            .tickValues(tickValues)
            .tickFormat(k => k.split("-")[0])
        )
        .attr("class", "axis-label")
        .selectAll("text")
        .attr("font-family", "var(--font-sans)")
        .attr("fill", "var(--text-secondary)");
        
    svg.append("g")
        .call(d3.axisLeft(y).ticks(5))
        .attr("class", "axis-label")
        .selectAll("text")
        .attr("font-family", "var(--font-sans)")
        .attr("fill", "var(--text-secondary)");
        
    svg.append("g")
        .attr("class", "grid")
        .call(d3.axisLeft(y).tickSize(-width).tickFormat("").ticks(5))
        .selectAll("line")
        .attr("class", "grid-line");
        
    // Draw Bars
    const monthNamesShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    svg.selectAll(".timeline-bar")
        .data(bins)
        .enter()
        .append("rect")
        .attr("class", "timeline-bar")
        .attr("x", d => x(d.key))
        .attr("y", d => y(d.count))
        .attr("width", x.bandwidth() || 1.2)
        .attr("height", d => height - y(d.count))
        .attr("fill", "var(--gold-accent)")
        .attr("opacity", 0.75)
        .on("mouseover", (event, d) => {
            d3.select(event.currentTarget).attr("opacity", 1).attr("fill", "var(--gold-hover)");
            showTooltip(event, `<strong>${monthNamesShort[d.month]} ${d.year}</strong><br/>Letters: ${d.count.toLocaleString()}`);
        })
        .on("mousemove", (event) => {
            showTooltip(event, globalTooltip.html());
        })
        .on("mouseout", (event) => {
            d3.select(event.currentTarget).attr("opacity", 0.75).attr("fill", "var(--gold-accent)");
            hideTooltip();
        });
}

function renderThemesDonut(data) {
    const container = document.getElementById("themes-chart-container");
    container.innerHTML = "";
    
    const width = container.clientWidth;
    const height = 300;
    const radius = Math.min(width, height) / 2 - 35; // slightly smaller radius to leave space for labels
    
    const svg = d3.select("#themes-chart-container")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);
        
    const pie = d3.pie().value(d => d.count).sort(null);
    const arc = d3.arc().innerRadius(radius * 0.45).outerRadius(radius * 0.8);
    const arcHover = d3.arc().innerRadius(radius * 0.45).outerRadius(radius * 0.9);
    
    const outerArc = d3.arc().innerRadius(radius * 0.85).outerRadius(radius * 0.85);
        
    svg.selectAll("path")
        .data(pie(data))
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", d => THEME_COLORS[d.data.theme] || THEME_COLORS["Mixed/Other"])
        .attr("class", "donut-slice")
        .style("opacity", 0.8)
        .on("mouseover", function(event, d) {
            d3.select(this).transition().duration(200).attr("d", arcHover).style("opacity", 1);
            showTooltip(event, `<strong>${d.data.theme}</strong><br/>Letters: ${d.data.count.toLocaleString()}`);
        })
        .on("mouseout", function() {
            d3.select(this).transition().duration(200).attr("d", arc).style("opacity", 0.8);
            hideTooltip();
        })
        .on("click", (event, d) => {
            const themeSelect = document.getElementById("filter-theme");
            themeSelect.value = d.data.theme;
            themeSelect.dispatchEvent(new Event("change"));
            document.querySelector('[data-tab="explorer-tab"]').click();
        });
        
    // 1. Text Labels
    svg.selectAll("text.donut-name-label")
        .data(pie(data))
        .enter()
        .append("text")
        .attr("class", "donut-name-label")
        .attr("transform", d => {
            const pos = outerArc.centroid(d);
            pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1); // push to left/right bounds
            return `translate(${pos})`;
        })
        .attr("text-anchor", d => midAngle(d) < Math.PI ? "start" : "end")
        .attr("dy", "0.35em")
        .attr("font-size", "0.7rem")
        .attr("font-family", "var(--font-serif)")
        .attr("fill", "var(--text-primary)")
        .text(d => {
            const total = d3.sum(data, d => d.count);
            const pct = ((d.data.count / total) * 100).toFixed(1);
            if (parseFloat(pct) > 3) {
                // Shorten labels slightly
                const name = d.data.theme.split("/")[0];
                return `${name} (${pct}%)`;
            }
            return "";
        });
        
    // 2. Pointer Lines
    svg.selectAll("polyline")
        .data(pie(data))
        .enter()
        .append("polyline")
        .attr("stroke", "var(--text-secondary)")
        .attr("stroke-width", "0.6px")
        .attr("fill", "none")
        .attr("points", d => {
            const total = d3.sum(data, d => d.count);
            const pct = ((d.data.count / total) * 100).toFixed(1);
            if (parseFloat(pct) > 3) {
                const posA = arc.centroid(d); // slice center
                const posB = outerArc.centroid(d); // corner position
                const posC = outerArc.centroid(d); // text pointer end
                posC[0] = radius * 0.92 * (midAngle(d) < Math.PI ? 1 : -1);
                return [posA, posB, posC];
            }
            return [];
        })
        .style("opacity", 0.3);
        
    function midAngle(d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }
}

function renderCorrespondents() {
    renderRecipientsBar(dashboardData.recipients);
}

function renderRecipientsBar(data) {
    const container = document.getElementById("recipients-chart-container");
    container.innerHTML = "";
    
    const margin = { top: 10, right: 30, bottom: 20, left: 145 };
    const width = container.clientWidth - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
    
    const svg = d3.select("#recipients-chart-container")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
        
    const top15 = data.slice(0, 15);
    const y = d3.scaleBand().domain(top15.map(d => d.recipient)).range([0, height]).padding(0.25);
    const x = d3.scaleLinear().domain([0, d3.max(top15, d => d.count)]).range([0, width]);
        
    svg.append("g")
        .call(d3.axisLeft(y).tickSize(0))
        .attr("class", "axis-label")
        .selectAll("text")
        .attr("font-family", "var(--font-serif)")
        .attr("font-size", "0.72rem")
        .attr("fill", "var(--text-primary)");
        
    svg.selectAll(".bar")
        .data(top15)
        .enter()
        .append("rect")
        .attr("class", "d3-bar")
        .attr("y", d => y(d.recipient))
        .attr("x", 0)
        .attr("height", y.bandwidth())
        .attr("width", d => x(d.count))
        .attr("rx", 3)
        .attr("fill", "var(--gold-accent)")
        .attr("opacity", 0.8)
        .on("mouseover", (event, d) => {
            d3.select(event.currentTarget).attr("opacity", 1).attr("fill", "var(--gold-hover)");
            showTooltip(event, `Correspondent: ${d.recipient}<br/>Letters: ${d.count}`);
        })
        .on("mouseout", (event) => {
            d3.select(event.currentTarget).attr("opacity", 0.8).attr("fill", "var(--gold-accent)");
            hideTooltip();
        })
        .on("click", (event, d) => {
            const recipientSelect = document.getElementById("filter-recipient");
            recipientSelect.value = d.recipient;
            recipientSelect.dispatchEvent(new Event("change"));
            document.querySelector('[data-tab="explorer-tab"]').click();
        });
}

function renderLengthHistogram() {
    const container = document.getElementById("histogram-chart-container");
    container.innerHTML = "";
    if (!lettersLight) return;
    
    const bins = [
        { label: "0-50", min: 0, max: 50, count: 0 },
        { label: "50-100", min: 51, max: 100, count: 0 },
        { label: "100-200", min: 101, max: 200, count: 0 },
        { label: "200-500", min: 201, max: 500, count: 0 },
        { label: "500-1000", min: 501, max: 1000, count: 0 },
        { label: "1000+", min: 1001, max: Infinity, count: 0 }
    ];
    
    lettersLight.forEach(l => {
        const w = l.w || 0;
        for (let b of bins) {
            if (w >= b.min && w <= b.max) {
                b.count++;
                break;
            }
        }
    });
    
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = container.clientWidth - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
    
    const svg = d3.select("#histogram-chart-container")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
        
    const x = d3.scaleBand().domain(bins.map(b => b.label)).range([0, width]).padding(0.2);
    const y = d3.scaleLinear().domain([0, d3.max(bins, b => b.count) * 1.05]).range([height, 0]);
        
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .attr("class", "axis-label")
        .selectAll("text")
        .attr("font-family", "var(--font-heading)")
        .attr("font-size", "0.8rem")
        .attr("fill", "var(--text-secondary)");
        
    svg.append("g")
        .call(d3.axisLeft(y).ticks(5))
        .attr("class", "axis-label");
        
    svg.append("g")
        .attr("class", "grid")
        .call(d3.axisLeft(y).tickSize(-width).tickFormat("").ticks(5))
        .selectAll("line")
        .attr("class", "grid-line");
        
    svg.selectAll(".bar")
        .data(bins)
        .enter()
        .append("rect")
        .attr("class", "histogram-bar")
        .attr("x", d => x(d.label))
        .attr("y", d => y(d.count))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.count))
        .attr("rx", 4)
        .on("mouseover", (event, d) => {
            const pct = ((d.count / lettersLight.length) * 100).toFixed(1);
            showTooltip(event, `Length: ${d.label} words<br/>Letters: ${d.count.toLocaleString()} (${pct}%)`);
        })
        .on("mousemove", (event) => {
            showTooltip(event, globalTooltip.html());
        })
        .on("mouseout", hideTooltip);
        
    const avgLen = dashboardData.stats.avg_word_count;
    svg.append("text")
        .attr("x", width - 10)
        .attr("y", 15)
        .attr("text-anchor", "end")
        .attr("font-family", "var(--font-heading)")
        .attr("font-size", "0.8rem")
        .attr("fill", "var(--gold-accent)")
        .attr("font-weight", "600")
        .text(`Overall Average Letter Length: ${avgLen} words`);
}

// Tooltip Helpers
let globalTooltip = null;
function showTooltip(event, content) {
    if (!globalTooltip) {
        globalTooltip = d3.select("body").append("div").attr("class", "d3-tooltip");
    }
    globalTooltip.style("display", "block")
        .style("left", (event.pageX + 15) + "px")
        .style("top", (event.pageY - 28) + "px")
        .html(content);
}
function hideTooltip() {
    if (globalTooltip) globalTooltip.style("display", "none");
}

function updateDashboardFilters() {
    // Dynamic subtitle update to show active range
    document.querySelector(".subtitle").textContent = 
        `An Interactive Journey through 13,738 Letters (${activeYearMin}–${activeYearMax})`;
}

// --- MAP TAB FUNCTIONS ---
function initMap() {
    // Center of UK/Europe coordinates
    map = L.map('map', {
        zoomControl: false
    }).setView([51.5074, -0.1278], 6);
    
    L.control.zoom({
        position: 'topright'
    }).addTo(map);

    // Clean, label-less tiles with darker ocean bathymetry (Esri World Ocean Base)
    L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, National Geographic, and others',
        maxZoom: 16
    }).addTo(map);
    
    sentMarkerGroup = L.layerGroup().addTo(map);
    mentionedMarkerGroup = L.layerGroup().addTo(map);
    
    // Checkbox toggles
    document.getElementById("show-sent-locations").addEventListener("change", toggleMapLayers);
    document.getElementById("show-mentioned-locations").addEventListener("change", toggleMapLayers);
    
    renderMapMarkers();
}

function toggleMapLayers() {
    const showSent = document.getElementById("show-sent-locations").checked;
    const showMentioned = document.getElementById("show-mentioned-locations").checked;
    
    if (showSent) map.addLayer(sentMarkerGroup);
    else map.removeLayer(sentMarkerGroup);
    
    if (showMentioned) map.addLayer(mentionedMarkerGroup);
    else map.removeLayer(mentionedMarkerGroup);
}

function renderMapMarkers() {
    sentMarkerGroup.clearLayers();
    mentionedMarkerGroup.clearLayers();
    
    // Sentinel nodes counts
    let sentCount = 0;
    let mentionedCount = 0;
    
    // Scale marker sizes
    const rScaleSent = d3.scaleLog().domain([1, 2300]).range([3, 20]);
    const rScaleMent = d3.scaleLog().domain([1, 1000]).range([3, 15]);
    
    // Plot Sent Locations
    dashboardData.sent_locations.forEach(loc => {
        sentCount++;
        const radius = rScaleSent(loc.count);
        const marker = L.circleMarker([loc.latitude, loc.longitude], {
            radius: radius,
            fillColor: THEME_COLORS["Literature/Writing"], // Gold
            color: "#fff",
            weight: 0.5,
            opacity: 0.8,
            fillOpacity: 0.6
        });
        
        marker.bindPopup(`
            <div class="map-popup">
                <h4>${loc.name}</h4>
                <p>Sent: <span class="popup-stat">${loc.count.toLocaleString()} letters</span></p>
                <p>Coordinates: ${loc.latitude.toFixed(4)}, ${loc.longitude.toFixed(4)}</p>
            </div>
        `);
        
        marker.on("click", () => showLocationDetails(loc, "sent"));
        marker.addTo(sentMarkerGroup);
    });
    
    // Plot Mentioned Locations
    dashboardData.mentioned_locations.forEach(loc => {
        mentionedCount++;
        const radius = rScaleMent(loc.count);
        const marker = L.circleMarker([loc.latitude, loc.longitude], {
            radius: radius,
            fillColor: THEME_COLORS["Travel/Places"], // Blue
            color: "#fff",
            weight: 0.5,
            opacity: 0.8,
            fillOpacity: 0.6
        });
        
        marker.bindPopup(`
            <div class="map-popup">
                <h4>${loc.name}</h4>
                <p>Mentioned: <span class="popup-stat">${loc.count.toLocaleString()} times</span></p>
                <p>Coordinates: ${loc.latitude.toFixed(4)}, ${loc.longitude.toFixed(4)}</p>
            </div>
        `);
        
        marker.on("click", () => showLocationDetails(loc, "mentioned"));
        marker.addTo(mentionedMarkerGroup);
    });
    
    document.getElementById("count-sent-nodes").textContent = sentCount;
    document.getElementById("count-mentioned-nodes").textContent = mentionedCount;
}

function showLocationDetails(loc, type) {
    const detailsContainer = document.getElementById("map-location-details");
    detailsContainer.innerHTML = `
        <div class="location-detail-card">
            <h5>${loc.name}</h5>
            <span class="coord">${loc.latitude.toFixed(5)}, ${loc.longitude.toFixed(5)}</span>
            <div class="location-stat-row">
                <span class="lbl">Location Type:</span>
                <span class="val" style="color: ${type === 'sent' ? 'var(--sent-color)' : 'var(--mentioned-color)'}">
                    ${type === 'sent' ? 'Sent From' : 'Mentioned In Text'}
                </span>
            </div>
            <div class="location-stat-row">
                <span class="lbl">${type === 'sent' ? 'Letters Sent:' : 'Occurrences:'}</span>
                <span class="val">${loc.count.toLocaleString()}</span>
            </div>
            <button class="btn-small" style="margin-top: 15px; width: 100%;" onclick="filterByLocationName('${loc.name}', '${type}')">
                Filter Explorer for this place
            </button>
        </div>
    `;
}

// Global filter helper for location clicking on map
window.filterByLocationName = function(name, type) {
    if (type === 'sent') {
        const select = document.getElementById("filter-location");
        select.value = name;
        select.dispatchEvent(new Event("change"));
    } else {
        // Search text for the mentioned place
        const searchInput = document.getElementById("search-input");
        searchInput.value = name;
        searchInput.dispatchEvent(new Event("input"));
    }
    document.querySelector('[data-tab="explorer-tab"]').click();
};

// --- EXPLORER TAB FUNCTIONS ---
function populateDropdowns(data) {
    const recipients = new Set();
    const locations = new Set();
    
    data.forEach(l => {
        if (l.r) recipients.add(l.r);
        if (l.l) locations.add(l.l);
    });
    
    const recSelect = document.getElementById("filter-recipient");
    Array.from(recipients).sort().forEach(r => {
        const opt = document.createElement("option");
        opt.value = r;
        opt.textContent = r;
        recSelect.appendChild(opt);
    });
    
    const locSelect = document.getElementById("filter-location");
    Array.from(locations).sort().forEach(loc => {
        const opt = document.createElement("option");
        opt.value = loc;
        opt.textContent = loc;
        locSelect.appendChild(opt);
    });
}

function initSearchControls() {
    const searchInput = document.getElementById("search-input");
    const themeSelect = document.getElementById("filter-theme");
    const recSelect = document.getElementById("filter-recipient");
    const locSelect = document.getElementById("filter-location");
    const sortSelect = document.getElementById("sort-select");
    
    const yearMinInput = document.getElementById("filter-year-min");
    const yearMaxInput = document.getElementById("filter-year-max");
    
    // Search queries
    searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value.toLowerCase();
        currentPage = 1;
        updateSearchResults();
    });
    
    themeSelect.addEventListener("change", (e) => {
        activeTheme = e.target.value;
        currentPage = 1;
        updateSearchResults();
    });
    
    recSelect.addEventListener("change", (e) => {
        activeRecipient = e.target.value;
        currentPage = 1;
        updateSearchResults();
    });
    
    locSelect.addEventListener("change", (e) => {
        activeLocation = e.target.value;
        currentPage = 1;
        updateSearchResults();
    });
    
    sortSelect.addEventListener("change", (e) => {
        sortField = e.target.value;
        updateSearchResults();
    });
    
    yearMinInput.addEventListener("input", (e) => {
        activeYearMin = e.target.value ? parseInt(e.target.value) : 1820;
        currentPage = 1;
        updateSearchResults();
    });
    
    yearMaxInput.addEventListener("input", (e) => {
        activeYearMax = e.target.value ? parseInt(e.target.value) : 1870;
        currentPage = 1;
        updateSearchResults();
    });
    
    // Reset filters
    document.getElementById("clear-search-filters").addEventListener("click", () => {
        searchInput.value = "";
        themeSelect.value = "all";
        recSelect.value = "all";
        locSelect.value = "all";
        sortSelect.value = "date-asc";
        yearMinInput.value = "";
        yearMaxInput.value = "";
        
        searchQuery = "";
        activeTheme = "all";
        activeRecipient = "all";
        activeLocation = "all";
        sortField = "date-asc";
        activeYearMin = 1820;
        activeYearMax = 1870;
        
        currentPage = 1;
        updateSearchResults();
    });
}

function updateSearchResults() {
    if (!lettersLight) return;
    
    // 1. Filter
    let filtered = lettersLight.filter(l => {
        // Date year bounds
        let year = null;
        const yearMatch = l.d.match(/\b(18\d{2})\b/);
        if (yearMatch) year = parseInt(yearMatch[1]);
        
        if (year && (year < activeYearMin || year > activeYearMax)) return false;
        
        // Theme
        if (activeTheme !== "all" && !l.t.includes(activeTheme)) return false;
        
        // Recipient
        if (activeRecipient !== "all" && l.r !== activeRecipient) return false;
        
        // Location
        if (activeLocation !== "all" && l.l !== activeLocation) return false;
        
        // Text Search query
        if (searchQuery) {
            const matchesRecipient = l.r.toLowerCase().includes(searchQuery);
            const matchesLocation = l.l.toLowerCase().includes(searchQuery);
            const matchesSnippet = l.s.toLowerCase().includes(searchQuery);
            const matchesDate = l.d.toLowerCase().includes(searchQuery);
            
            if (!matchesRecipient && !matchesLocation && !matchesSnippet && !matchesDate) return false;
        }
        
        return true;
    });
    
    // Dynamic KPI stats update
    updateFilteredStats(filtered);
    
    // 2. Sort
    filtered.sort((a, b) => {
        if (sortField === "date-asc" || sortField === "date-desc") {
            const valA = a.d || "";
            const valB = b.d || "";
            return sortField === "date-asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
        } else if (sortField === "word-desc") {
            return b.w - a.w;
        } else if (sortField === "word-asc") {
            return a.w - b.w;
        }
        return 0;
    });
    
    // 3. Paginate
    const totalItems = filtered.length;
    document.getElementById("results-count").textContent = `Showing ${totalItems.toLocaleString()} letters`;
    
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginated = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    
    renderLettersList(paginated);
    renderPagination(totalItems);
}

function renderLettersList(letters) {
    const listContainer = document.getElementById("letters-list");
    listContainer.innerHTML = "";
    
    if (letters.length === 0) {
        listContainer.innerHTML = `
            <div class="details-placeholder">
                No letters matched your active filter criteria. Try resetting filters.
            </div>
        `;
        return;
    }
    
    letters.forEach(l => {
        const card = document.createElement("div");
        card.className = "letter-card";
        card.setAttribute("data-id", l.id);
        
        // Render badges
        const badgesHtml = l.t.map(theme => {
            let className = "tag-badge";
            if (theme.includes("Writing") || theme.includes("Literature")) className += " writing";
            if (theme.includes("Theatre")) className += " theatre";
            return `<span class="${className}">${theme}</span>`;
        }).join(" ");
        
        card.innerHTML = `
            <div class="card-row-top">
                <span class="recipient-name">To ${l.r}</span>
                <span class="letter-date">${l.d}</span>
            </div>
            <div class="card-row-mid">
                <span><i class="fa-solid fa-location-dot"></i> ${l.l || 'Unknown Writing Place'}</span>
                <span><i class="fa-solid fa-quote-left"></i> ${l.w} words</span>
                <div class="card-badges">${badgesHtml}</div>
            </div>
            <p class="letter-snippet">${highlightQuery(l.s, searchQuery)}</p>
        `;
        
        card.addEventListener("click", () => openLetterModal(l.id));
        listContainer.appendChild(card);
    });
}

function highlightQuery(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
    return text.replace(regex, '<mark style="background: var(--gold-accent); color: var(--bg-dark); border-radius: 2px;">$1</mark>');
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function renderPagination(totalItems) {
    const container = document.getElementById("pagination");
    container.innerHTML = "";
    
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    if (totalPages <= 1) return;
    
    const prevBtn = document.createElement("button");
    prevBtn.className = "pagination-btn";
    prevBtn.innerHTML = '<i class="fa-solid fa-angle-left"></i>';
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener("click", () => {
        currentPage--;
        updateSearchResults();
        document.getElementById("letters-list").scrollTop = 0;
    });
    container.appendChild(prevBtn);
    
    // Render sliding pages (up to 5 pages shown)
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage < maxVisible - 1) {
        startPage = Math.max(1, endPage - maxVisible + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement("button");
        pageBtn.className = `pagination-btn ${i === currentPage ? 'active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.addEventListener("click", () => {
            currentPage = i;
            updateSearchResults();
            document.getElementById("letters-list").scrollTop = 0;
        });
        container.appendChild(pageBtn);
    }
    
    const nextBtn = document.createElement("button");
    nextBtn.className = "pagination-btn";
    nextBtn.innerHTML = '<i class="fa-solid fa-angle-right"></i>';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener("click", () => {
        currentPage++;
        updateSearchResults();
        document.getElementById("letters-list").scrollTop = 0;
    });
    container.appendChild(nextBtn);
}

// --- MODAL FUNCTIONS ---
function initModal() {
    const modal = document.getElementById("letter-modal");
    const closeBtn = document.getElementById("close-modal");
    
    closeBtn.addEventListener("click", () => {
        modal.classList.remove("active");
    });
    
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });
}

function openLetterModal(id) {
    const modal = document.getElementById("letter-modal");
    modal.classList.add("active");
    
    // Set loading indicator
    document.getElementById("modal-letter-id").textContent = `Letter #${id + 1}`;
    document.getElementById("modal-themes-tags").innerHTML = "";
    document.getElementById("modal-letterhead").innerHTML = "Loading letter content...";
    document.getElementById("modal-salutation").innerHTML = "";
    document.getElementById("modal-body").innerHTML = '<div style="text-align: center; padding: 50px;"><span class="spinner-small"></span> Resolving historical envelope...</div>';
    document.getElementById("modal-signoff").innerHTML = "";
    document.getElementById("modal-signature").innerHTML = "";
    document.getElementById("modal-postscript").style.display = "none";
    document.getElementById("modal-metadata").innerHTML = "";
    
    // Fetch from background loaded complete JSON
    if (lettersEnriched) {
        renderFullLetter(lettersEnriched[id], id);
    } else {
        // Fallback: poll or pull light info
        const timer = setInterval(() => {
            if (lettersEnriched) {
                clearInterval(timer);
                renderFullLetter(lettersEnriched[id], id);
            }
        }, 100);
    }
}

function renderFullLetter(letter, id) {
    document.getElementById("modal-letter-id").textContent = `Letter #${id + 1}`;

    // Derived analytics live in the lightweight index + mentions sidecar (id-aligned by array index)
    const lite = (lettersLight && lettersLight[id]) ? lettersLight[id] : {};
    const mentioned = (lettersMentions && lettersMentions[id]) ? lettersMentions[id] : [];

    // Themes tags
    const themesTags = document.getElementById("modal-themes-tags");
    themesTags.innerHTML = (lite.t || []).map(t => `<span class="tag-badge">${t}</span>`).join(" ");

    // Address & Date
    const letterhead = document.getElementById("modal-letterhead");
    let letterheadText = "";
    if (letter.location_sent_from) {
        letterheadText += `${letter.location_sent_from}\n`;
    } else if (letter.address_panel) {
        // Extract address portion
        const firstLine = letter.address_panel.split('\n')[0];
        if (firstLine.length < 50) letterheadText += `${firstLine}\n`;
    }
    letterheadText += `<span style="font-weight: 600;">${lite.d || letter.date_on_page || ""}</span>`;
    letterhead.innerHTML = letterheadText;
    
    // Salutation
    document.getElementById("modal-salutation").innerHTML = letter.salutation || "Dear Correspondent,";
    
    // Body paragraphs
    const bodyContainer = document.getElementById("modal-body");
    bodyContainer.innerHTML = "";
    if (letter.text) {
        // Split by newlines (handles single and double newlines)
        const rawLines = letter.text.split(/\n+/);
        const paragraphs = [];
        let currentParagraph = "";
        
        rawLines.forEach(line => {
            const trimmed = line.trim();
            if (trimmed === "") return;
            
            // Clean up any double spaces or footnote remnants if needed
            const cleaned = trimmed.replace(/\s+/g, " ");
            
            if (currentParagraph === "") {
                currentParagraph = cleaned;
            } else {
                const prev = currentParagraph.trim();
                
                // Heuristics to decide if we should join this line with the previous one:
                // 1. Previous line is very short (salutation, short paragraph, signature)
                // 2. Previous line ends in sentence punctuation (. ! ?) and is relatively short (< 80 chars)
                // 3. Previous line ends in clause punctuation (, : ;) and is short (< 50 chars)
                // 4. Current line starts with signature/valediction indicators
                const isPrevShort = prev.length < 35;
                const endsWithSentencePunct = /[.!?}"”]$/.test(prev);
                const endsWithClausePunct = /[,:;]$/.test(prev);
                
                let shouldJoin = true;
                
                if (isPrevShort) {
                    shouldJoin = false;
                } else if (endsWithSentencePunct && prev.length < 80) {
                    shouldJoin = false;
                } else if (endsWithClausePunct && prev.length < 50) {
                    shouldJoin = false;
                } else if (cleaned.startsWith("―") || cleaned.startsWith("-") || cleaned.startsWith("—")) {
                    shouldJoin = false;
                } else if (/^(yours|ever yours|yours truly|yours affectionately|affectionately|charles dickens|i remain|believe me|with compliments)/i.test(cleaned)) {
                    shouldJoin = false;
                }
                
                if (shouldJoin) {
                    currentParagraph += " " + cleaned;
                } else {
                    paragraphs.push(currentParagraph);
                    currentParagraph = cleaned;
                }
            }
        });
        
        if (currentParagraph !== "") {
            paragraphs.push(currentParagraph);
        }
        
        paragraphs.forEach(para => {
            const p = document.createElement("p");
            p.textContent = para;
            bodyContainer.appendChild(p);
        });
    } else {
        bodyContainer.innerHTML = '<p style="font-style: italic;">(This entry represents a mention or metadata summary rather than a full transcription.)</p>';
    }
    
    // Sign off & Signature
    document.getElementById("modal-signoff").innerHTML = letter.valediction || "";
    document.getElementById("modal-signature").innerHTML = letter.signature || "Charles Dickens";
    
    // Postscript
    const psBox = document.getElementById("modal-postscript");
    if (letter.postscript) {
        psBox.style.display = "block";
        document.getElementById("modal-postscript-text").textContent = letter.postscript;
    } else {
        psBox.style.display = "none";
    }
    
    // Editorial Notes
    document.getElementById("modal-metadata").innerHTML = letter.source_note || "No editor footnotes recorded.";
    document.getElementById("modal-date-precision").textContent = (lite.p || "unknown").replace(/_/g, " ");
    document.getElementById("modal-word-count").textContent = `${lite.w || 0} words`;

    // Locations mentioned row
    const mentionedRow = document.getElementById("modal-mentioned-row");
    const locationsList = document.getElementById("modal-mentioned-locations");
    if (mentioned && mentioned.length > 0) {
        mentionedRow.style.display = "block";
        locationsList.textContent = mentioned.join(", ");
    } else {
        mentionedRow.style.display = "none";
    }
}

// --- PIVOT ANALYZER LOGIC ---
let top25Recipients = new Set();
let top25Locations = new Set();

function initPivotControls() {
    // Compute top 25 recipients and locations once
    const recCounts = {};
    const locCounts = {};
    lettersLight.forEach(l => {
        if (l.r) recCounts[l.r] = (recCounts[l.r] || 0) + 1;
        if (l.l) locCounts[l.l] = (locCounts[l.l] || 0) + 1;
    });
    
    Object.keys(recCounts).sort((a, b) => recCounts[b] - recCounts[a]).slice(0, 25).forEach(r => top25Recipients.add(r));
    Object.keys(locCounts).sort((a, b) => locCounts[b] - locCounts[a]).slice(0, 25).forEach(loc => top25Locations.add(loc));
    
    // Add change listeners to pivot controls
    const rowSelect = document.getElementById("pivot-row");
    const colSelect = document.getElementById("pivot-col");
    const metricSelect = document.getElementById("pivot-metric");
    
    [rowSelect, colSelect, metricSelect].forEach(select => {
        select.addEventListener("change", () => {
            generatePivotTable();
        });
    });
}

function getPivotDimValues(l, dim) {
    if (dim === "theme") {
        return l.t && l.t.length > 0 ? l.t : ["Mixed/Other"];
    }
    if (dim === "year") {
        const match = l.d.match(/\b(18\d{2})\b/);
        return match ? [match[1]] : ["Unknown"];
    }
    if (dim === "precision") {
        return [l.p ? l.p.replace("_", " ").toUpperCase() : "UNKNOWN"];
    }
    if (dim === "recipient") {
        return [top25Recipients.has(l.r) ? l.r : "Other Correspondents"];
    }
    if (dim === "location") {
        return [top25Locations.has(l.l) ? l.l : "Other Locations"];
    }
    return ["none"];
}

function generatePivotTable() {
    if (!lettersLight) return;
    
    const rowDim = document.getElementById("pivot-row").value;
    const colDim = document.getElementById("pivot-col").value;
    const metric = document.getElementById("pivot-metric").value;
    
    const tableContainer = document.getElementById("pivot-table-container");
    tableContainer.innerHTML = '<div style="text-align: center; padding: 50px;"><span class="spinner-small"></span> Pivoting letters...</div>';
    
    // Accumulators
    const dataMap = {}; // row -> { col -> { count: 0, sum: 0 } }
    const rowTotals = {}; // row -> { count: 0, sum: 0 }
    const colTotals = {}; // col -> { count: 0, sum: 0 }
    const grandTotal = { count: 0, sum: 0 };
    
    const uniqueRows = new Set();
    const uniqueCols = new Set();
    
    lettersLight.forEach(l => {
        const rVals = getPivotDimValues(l, rowDim);
        const cVals = getPivotDimValues(l, colDim);
        
        rVals.forEach(rv => {
            uniqueRows.add(rv);
            if (!dataMap[rv]) dataMap[rv] = {};
            if (!rowTotals[rv]) rowTotals[rv] = { count: 0, sum: 0 };
            
            cVals.forEach(cv => {
                uniqueCols.add(cv);
                if (!dataMap[rv][cv]) dataMap[rv][cv] = { count: 0, sum: 0 };
                if (!colTotals[cv]) colTotals[cv] = { count: 0, sum: 0 };
                
                const val = l.w || 0;
                
                dataMap[rv][cv].count++;
                dataMap[rv][cv].sum += val;
                
                rowTotals[rv].count++;
                rowTotals[rv].sum += val;
                
                colTotals[cv].count++;
                colTotals[cv].sum += val;
                
                grandTotal.count++;
                grandTotal.sum += val;
            });
        });
    });
    
    // Sort rows and cols
    const rowsList = Array.from(uniqueRows).sort((a, b) => a.localeCompare(b));
    const colsList = colDim === "none" ? [] : Array.from(uniqueCols).sort((a, b) => a.localeCompare(b));
    
    function getMetricVal(cell) {
        if (!cell || cell.count === 0) return 0;
        if (metric === "count") return cell.count;
        if (metric === "total_words") return cell.sum;
        if (metric === "avg_words") return Math.round(cell.sum / cell.count);
        return 0;
    }
    
    // Find maximum cell value (for heatmap scale)
    let maxVal = 0;
    rowsList.forEach(r => {
        if (colDim !== "none") {
            colsList.forEach(c => {
                const val = getMetricVal(dataMap[r][c]);
                if (val > maxVal) maxVal = val;
            });
        } else {
            const val = getMetricVal(rowTotals[r]);
            if (val > maxVal) maxVal = val;
        }
    });
    
    function formatValue(v) {
        if (v === 0) return "-";
        return v.toLocaleString();
    }
    
    // Build table HTML
    let html = '<table class="pivot-table">';
    
    // Header Row
    html += '<thead><tr>';
    html += `<th>${rowDim.toUpperCase()}</th>`;
    colsList.forEach(c => {
        html += `<th>${c}</th>`;
    });
    if (colDim !== "none") {
        html += '<th>TOTAL</th>';
    }
    html += '</tr></thead>';
    
    // Body Rows
    html += '<tbody>';
    rowsList.forEach(r => {
        html += '<tr>';
        html += `<td>${r}</td>`;
        
        colsList.forEach(c => {
            const cell = dataMap[r][c];
            const val = getMetricVal(cell);
            const ratio = maxVal > 0 ? val / maxVal : 0;
            const bgStyle = val > 0 ? `style="background-color: rgba(212, 175, 55, ${ratio * 0.45});"` : '';
            html += `<td class="heatmap-cell" ${bgStyle}>${formatValue(val)}</td>`;
        });
        
        if (colDim !== "none") {
            const rowT = getMetricVal(rowTotals[r]);
            html += `<td class="row-total">${formatValue(rowT)}</td>`;
        }
        html += '</tr>';
    });
    html += '</tbody>';
    
    // Footer Row (Totals)
    html += '<tfoot>';
    html += '<tr class="col-total">';
    html += '<td>TOTAL</td>';
    colsList.forEach(c => {
        const colT = getMetricVal(colTotals[c]);
        html += `<td>${formatValue(colT)}</td>`;
    });
    if (colDim !== "none") {
        const grandT = getMetricVal(grandTotal);
        html += `<td>${formatValue(grandT)}</td>`;
    }
    html += '</tr>';
    html += '</tfoot>';
    
    html += '</table>';
    
    tableContainer.innerHTML = html;
}

// --- BOLD & IMAGINATIVE VISUALIZATION EXTENSIONS ---

// 1. Theme Selector & CSS classes
function initThemeSelector() {
    const themeSelect = document.getElementById("theme-select");
    themeSelect.addEventListener("change", (e) => {
        const theme = e.target.value;
        document.body.className = ""; // Reset themes
        if (theme !== "midnight") {
            document.body.classList.add(`theme-${theme}`);
        }
        // Force redraw on Leaflet and D3 containers
        if (map) {
            setTimeout(() => {
                map.invalidateSize();
            }, 100);
        }
    });
}

// 2. Dynamic KPI metrics recalculator
function updateFilteredStats(filtered) {
    const totalLetters = filtered.length;
    let totalWords = 0;
    const sentLocs = new Set();
    const mentLocs = new Set();
    let maxWordCount = 0;
    let exactDates = 0;
    let geocodedLetters = 0;
    
    filtered.forEach(l => {
        const w = l.w || 0;
        totalWords += w;
        if (w > maxWordCount) maxWordCount = w;
        if (l.l) {
            sentLocs.add(l.l);
            if (locationCoords[l.l]) geocodedLetters++;
        }
        if (l.p === "exact") exactDates++;
    });
    
    const avgWords = totalLetters > 0 ? Math.round(totalWords / totalLetters) : 0;
    const precisionRatio = totalLetters > 0 ? ((exactDates / totalLetters) * 100).toFixed(1) : "0.0";
    const geocodedRatio = totalLetters > 0 ? ((geocodedLetters / totalLetters) * 100).toFixed(1) : "0.0";
    
    document.getElementById("stat-total-letters").textContent = totalLetters.toLocaleString();
    document.getElementById("stat-total-words").textContent = totalWords.toLocaleString();
    document.getElementById("stat-avg-words").textContent = avgWords.toLocaleString() + " words";
    document.getElementById("stat-longest-letter").textContent = maxWordCount.toLocaleString();
    document.getElementById("stat-sent-locs").textContent = sentLocs.size.toLocaleString();
    document.getElementById("stat-precision").textContent = precisionRatio + "%";
    document.getElementById("stat-geocoded").textContent = geocodedRatio + "%";
    
    if (lettersMentions) {
        filtered.forEach(f => {
            const m = lettersMentions[f.id];
            if (m) m.forEach(x => mentLocs.add(x));
        });
        document.getElementById("stat-ment-locs").textContent = mentLocs.size.toLocaleString();
    } else {
        // Fallback to total dashboard count if unfiltered, else show "..."
        if (lettersLight && filtered.length === lettersLight.length && dashboardData) {
            document.getElementById("stat-ment-locs").textContent = dashboardData.mentioned_locations.length.toLocaleString();
        } else {
            document.getElementById("stat-ment-locs").textContent = "...";
        }
    }
}

// 3. D3 Barcode Timeline
function renderCorrespondentsTimeline() {
    const container = document.getElementById("barcode-timeline-container");
    container.innerHTML = "";
    if (!lettersLight) return;
    
    // Get Top 15 correspondents
    const top15 = dashboardData.recipients.slice(0, 15).map(d => d.recipient);
    
    const margin = { top: 20, right: 30, bottom: 40, left: 160 };
    const width = container.clientWidth - margin.left - margin.right;
    const height = 350 - margin.top - margin.bottom;
    
    const svg = d3.select("#barcode-timeline-container")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
        
    const startYear = 1835;
    const endYear = 1870;
    
    const xScale = d3.scaleLinear().domain([startYear, endYear]).range([0, width]);
    const yScale = d3.scaleBand().domain(top15).range([0, height]).padding(0.1);
    
    // Draw guide lines & background lanes
    top15.forEach(rec => {
        const yPos = yScale(rec);
        const yHeight = yScale.bandwidth();
        
        svg.append("rect")
            .attr("x", 0)
            .attr("y", yPos)
            .attr("width", width)
            .attr("height", yHeight)
            .attr("class", "barcode-lane-bg");
            
        svg.append("line")
            .attr("x1", 0)
            .attr("x2", width)
            .attr("y1", yPos + yHeight / 2)
            .attr("y2", yPos + yHeight / 2)
            .attr("class", "barcode-lane-line");
    });
    
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScale).tickFormat(d3.format("d")).ticks(10))
        .attr("class", "axis-label")
        .selectAll("text")
        .attr("font-family", "var(--font-sans)")
        .attr("fill", "var(--text-secondary)");
        
    svg.append("g")
        .call(d3.axisLeft(yScale).tickSize(0))
        .attr("class", "axis-label")
        .selectAll("text")
        .attr("class", "barcode-lane-label")
        .attr("font-family", "var(--font-serif)")
        .attr("font-size", "0.78rem")
        .attr("fill", "var(--text-primary)");
        
    // Draw notches
    lettersLight.forEach(l => {
        if (!top15.includes(l.r)) return;
        
        const ym = getYearAndMonth(l.d);
        if (!ym) return;
        const xVal = ym.year + (ym.month / 12);
        
        if (xVal < startYear || xVal > endYear) return;
        
        const yVal = yScale(l.r);
        const yHeight = yScale.bandwidth();
        
        const theme = l.t[0] || "Mixed/Other";
        const tickColor = THEME_COLORS[theme] || THEME_COLORS["Mixed/Other"];
        
        svg.append("line")
            .attr("x1", xScale(xVal))
            .attr("x2", xScale(xVal))
            .attr("y1", yVal + 3)
            .attr("y2", yVal + yHeight - 3)
            .attr("class", "barcode-tick")
            .attr("stroke", tickColor)
            .on("mouseover", (event) => {
                showTooltip(event, `<strong>To: ${l.r}</strong><br/>Date: ${l.d}<br/>Word Count: ${l.w.toLocaleString()} words<br/>Theme: ${theme}`);
            })
            .on("mousemove", (event) => {
                showTooltip(event, globalTooltip.html());
            })
            .on("mouseout", hideTooltip)
            .on("click", () => {
                openLetterModal(l.id);
            });
    });
}

// 4. Word Analytics Controller
function renderWordAnalytics() {
    renderAvgWordCountChart();
    renderLongestLettersLedger();
}

// 5. Word Analytics Average Chart
function renderAvgWordCountChart() {
    const container = document.getElementById("avg-word-chart-container");
    container.innerHTML = "";
    if (!lettersLight) return;
    
    const top15 = dashboardData.recipients.slice(0, 15).map(d => d.recipient);
    const recipientWordCounts = {};
    top15.forEach(r => {
        recipientWordCounts[r] = { totalWords: 0, letterCount: 0 };
    });
    
    lettersLight.forEach(l => {
        if (recipientWordCounts[l.r]) {
            recipientWordCounts[l.r].totalWords += l.w || 0;
            recipientWordCounts[l.r].letterCount++;
        }
    });
    
    const chartData = top15.map(r => {
        const stats = recipientWordCounts[r];
        const avg = stats.letterCount > 0 ? Math.round(stats.totalWords / stats.letterCount) : 0;
        return { recipient: r, avgWords: avg };
    });
    
    const margin = { top: 10, right: 30, bottom: 20, left: 145 };
    const width = container.clientWidth - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
    
    const svg = d3.select("#avg-word-chart-container")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
        
    const y = d3.scaleBand().domain(top15).range([0, height]).padding(0.25);
    const x = d3.scaleLinear().domain([0, d3.max(chartData, d => d.avgWords) * 1.05 || 100]).range([0, width]);
    
    svg.append("g")
        .call(d3.axisLeft(y).tickSize(0))
        .attr("class", "axis-label")
        .selectAll("text")
        .attr("font-family", "var(--font-serif)")
        .attr("font-size", "0.72rem")
        .attr("fill", "var(--text-primary)");
        
    svg.selectAll(".bar")
        .data(chartData)
        .enter()
        .append("rect")
        .attr("class", "d3-bar")
        .attr("y", d => y(d.recipient))
        .attr("x", 0)
        .attr("height", y.bandwidth())
        .attr("width", d => x(d.avgWords))
        .attr("rx", 3)
        .attr("fill", "var(--gold-accent)")
        .attr("opacity", 0.8)
        .on("mouseover", (event, d) => {
            d3.select(event.currentTarget).attr("opacity", 1).attr("fill", "var(--gold-hover)");
            showTooltip(event, `Correspondent: ${d.recipient}<br/>Avg. Length: ${d.avgWords.toLocaleString()} words`);
        })
        .on("mouseout", (event) => {
            d3.select(event.currentTarget).attr("opacity", 0.8).attr("fill", "var(--gold-accent)");
            hideTooltip();
        })
        .on("click", (event, d) => {
            const recipientSelect = document.getElementById("filter-recipient");
            recipientSelect.value = d.recipient;
            recipientSelect.dispatchEvent(new Event("change"));
            document.querySelector('[data-tab="explorer-tab"]').click();
        });
}

// 6. Word Outliers Ledger
function renderLongestLettersLedger() {
    const container = document.getElementById("longest-letters-ledger");
    container.innerHTML = "";
    if (!lettersLight) return;
    
    const sorted = [...lettersLight].sort((a, b) => (b.w || 0) - (a.w || 0));
    const top10 = sorted.slice(0, 10);
    
    top10.forEach((l, idx) => {
        const item = document.createElement("div");
        item.className = "ledger-card-item";
        
        const theme = l.t[0] || "Mixed/Other";
        
        item.innerHTML = `
            <div class="ledger-card-left">
                <div class="ledger-card-recipient">#${idx+1}. To ${l.r}</div>
                <div class="ledger-card-meta">
                    <span><i class="fa-solid fa-calendar-days"></i> ${l.d}</span>
                    <span><i class="fa-solid fa-tags"></i> ${theme}</span>
                </div>
            </div>
            <div class="ledger-card-words">${l.w.toLocaleString()} words</div>
        `;
        
        item.addEventListener("click", () => {
            openLetterModal(l.id);
        });
        
        container.appendChild(item);
    });
}

// 7. Travel Path Player Initializer
function initTravelPlayer() {
    const lettersWithCoords = lettersLight.filter(l => {
        const coords = locationCoords[l.l];
        return coords && l.d && l.d !== "Unknown";
    });
    
    lettersWithCoords.sort((a, b) => a.d.localeCompare(b.d));
    
    // Collapse duplicates to sequence of stops
    travelStops = [];
    let lastLoc = null;
    lettersWithCoords.forEach(l => {
        const coords = locationCoords[l.l];
        if (l.l !== lastLoc) {
            travelStops.push({
                locationName: l.l,
                latitude: coords[0],
                longitude: coords[1],
                date: l.d,
                recipient: l.r,
                id: l.id
            });
            lastLoc = l.l;
        }
    });
    
    document.getElementById("travel-play-btn").addEventListener("click", playTravel);
    document.getElementById("travel-pause-btn").addEventListener("click", pauseTravel);
    document.getElementById("travel-stop-btn").addEventListener("click", stopTravel);
    document.getElementById("travel-speed").addEventListener("change", (e) => {
        travelSpeed = parseInt(e.target.value);
        if (travelTimer) {
            pauseTravel();
            playTravel();
        }
    });
}

// 8. Travel Loop
function playTravel() {
    if (travelStops.length === 0) return;
    
    document.getElementById("travel-play-btn").disabled = true;
    document.getElementById("travel-pause-btn").disabled = false;
    document.getElementById("travel-stop-btn").disabled = false;
    document.getElementById("travel-status-text").textContent = "Traveling...";
    
    const ledger = document.getElementById("travel-ledger-container");
    if (travelActiveIndex === 0) {
        ledger.innerHTML = "";
        if (travelPathPolyline) map.removeLayer(travelPathPolyline);
        if (travelMarker) map.removeLayer(travelMarker);
        
        travelPathPolyline = L.polyline([], {
            color: "var(--gold-accent)",
            weight: 3.5,
            opacity: 0.8,
            dashArray: "1, 5"
        }).addTo(map);
        
        travelMarker = L.circleMarker([travelStops[0].latitude, travelStops[0].longitude], {
            radius: 8,
            fillColor: "#fff",
            color: "var(--gold-accent)",
            weight: 2,
            fillOpacity: 1
        }).addTo(map);
    }
    
    const stepDuration = 2500 / travelSpeed;
    
    travelTimer = setInterval(() => {
        if (travelActiveIndex >= travelStops.length) {
            stopTravel();
            document.getElementById("travel-status-text").textContent = "Journey completed";
            return;
        }
        
        const stop = travelStops[travelActiveIndex];
        const latlng = [stop.latitude, stop.longitude];
        
        travelMarker.setLatLng(latlng);
        travelPathPolyline.addLatLng(latlng);
        
        map.panTo(latlng);
        
        const yearMatch = stop.date.match(/\b(18\d{2})\b/);
        const year = yearMatch ? yearMatch[1] : "1800";
        document.getElementById("travel-current-year").textContent = year;
        document.getElementById("travel-status-text").textContent = `At ${stop.locationName}`;
        
        const pct = ((travelActiveIndex / (travelStops.length - 1)) * 100).toFixed(1);
        document.getElementById("travel-progress-fill").style.width = `${pct}%`;
        
        // Ledger entry
        const div = document.createElement("div");
        div.className = "ledger-item";
        div.innerHTML = `<span class="year">${year}</span><span class="action">Wrote to ${stop.recipient} from</span> <span class="loc">${stop.locationName}</span>`;
        ledger.appendChild(div);
        ledger.scrollTop = ledger.scrollHeight;
        
        travelActiveIndex++;
    }, stepDuration);
}

// 9. Pause Travel
function pauseTravel() {
    clearInterval(travelTimer);
    travelTimer = null;
    document.getElementById("travel-play-btn").disabled = false;
    document.getElementById("travel-pause-btn").disabled = true;
    document.getElementById("travel-status-text").textContent = "Paused";
}

// 10. Stop Travel
function stopTravel() {
    clearInterval(travelTimer);
    travelTimer = null;
    travelActiveIndex = 0;
    
    document.getElementById("travel-play-btn").disabled = false;
    document.getElementById("travel-pause-btn").disabled = true;
    document.getElementById("travel-stop-btn").disabled = true;
    document.getElementById("travel-status-text").textContent = "Stopped";
    document.getElementById("travel-progress-fill").style.width = "0%";
    
    if (travelMarker) {
        map.removeLayer(travelMarker);
        travelMarker = null;
    }
    if (travelPathPolyline) {
        map.removeLayer(travelPathPolyline);
        travelPathPolyline = null;
    }
    
    const ledger = document.getElementById("travel-ledger-container");
    ledger.innerHTML = '<div class="ledger-empty">Start the travel player to record Dickens\'s route...</div>';
}
