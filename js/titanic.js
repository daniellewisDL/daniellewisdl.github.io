function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

var tabularData = [
                    {cabinClass: 'Crew', ageSex: 'Women', survived: 'Survived', number: 20},
                    {cabinClass: 'Crew', ageSex: 'Women', survived: 'Perished', number: 3},
                    {cabinClass: 'Crew', ageSex: 'Men', survived: 'Survived', number: 192},
                    {cabinClass: 'Crew', ageSex: 'Men', survived: 'Perished', number: 693},
                    {cabinClass: 'First Class', ageSex: 'Children', survived: 'Survived', number: 5},
                    {cabinClass: 'First Class', ageSex: 'Children', survived: 'Perished', number: 1},
                    {cabinClass: 'First Class', ageSex: 'Women', survived: 'Survived', number: 140},
                    {cabinClass: 'First Class', ageSex: 'Women', survived: 'Perished', number: 4},
                    {cabinClass: 'First Class', ageSex: 'Men', survived: 'Survived', number: 57},
                    {cabinClass: 'First Class', ageSex: 'Men', survived: 'Perished', number: 118},
                    {cabinClass: 'Second Class', ageSex: 'Children', survived: 'Survived', number: 24},
                    {cabinClass: 'Second Class', ageSex: 'Children', survived: 'Perished', number: 0},
                    {cabinClass: 'Second Class', ageSex: 'Women', survived: 'Survived', number: 80},
                    {cabinClass: 'Second Class', ageSex: 'Women', survived: 'Perished', number: 13},
                    {cabinClass: 'Second Class', ageSex: 'Men', survived: 'Survived', number: 14},
                    {cabinClass: 'Second Class', ageSex: 'Men', survived: 'Perished', number: 154},
                    {cabinClass: 'Third Class', ageSex: 'Children', survived: 'Survived', number: 27},
                    {cabinClass: 'Third Class', ageSex: 'Children', survived: 'Perished', number: 52},
                    {cabinClass: 'Third Class', ageSex: 'Women', survived: 'Survived', number: 76},
                    {cabinClass: 'Third Class', ageSex: 'Women', survived: 'Perished', number: 89},
                    {cabinClass: 'Third Class', ageSex: 'Men', survived: 'Survived', number: 75},
                    {cabinClass: 'Third Class', ageSex: 'Men', survived: 'Perished', number: 387}
                    ]

let group = d3.group(tabularData, d=>d.cabinClass, d=> d.ageSex)

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dictum tempor mauris, ac hendrerit tortor dignissim in. Integer ut tempor elit, sed malesuada dui."

let globalState = 1
let t = 1309 *2

var defaultSC = secondaryContainer.append("g").attr("id", "defaultSC")
var defaultPD = passengerDetailContainer.append("g").attr("id", "defaultPD")

let linerPath = "M 0 0 L -2 0 C -4 0 -5 -7 -5 -20 C -5 -52 -6 -38 -6 -65 C -6 -90 0 -100 0 -100 C 0 -100 6 -90 6 -65 C 6 -38 5 -52 5 -20 C 5 -7 4 0 2 0 Z"
let linersList = [{className: 'celtic', name: 'Celtic', length: 681, beam: 75.0, depth: 44, tonnage: 20904, horsePower: 12600, avSpeed: 17, yearBuilt: 1901, screw: "Twin Screw"},
                    {className: 'oceanic', name: 'Oceanic', length: 685, beam: 68.5, depth: 44.5, tonnage: 17274, horsePower: 28000, avSpeed: 21, yearBuilt: 1899, screw: "Twin Screw"},
                    {className: 'baltic', name: 'Baltic', length: 708, beam: 75, depth: 44, tonnage: 23876, horsePower: 14000, avSpeed: 16.5, yearBuilt: 1904, screw: "Twin Screw"},
                    {className: 'adriatic', name: 'Adriatic', length: 709, beam: 75.5, depth: 52, tonnage: 24541, horsePower: 16000, avSpeed: 17, yearBuilt: 1907, screw: "Twin Screw"},
                    {className: 'titanic', name: 'Titanic / Olympic', length: 850, beam: 92, depth: 52, tonnage: 46329, horsePower: 46000, avSpeed: 21, yearBuilt: 1910, screw: "Triple Screw"}]

let whiteStarFlagPath = "M 0 0 C 0 0 0 0 0 0 C 1 -1 3 0 4 -1 C 5 -2 6 -1 8 -1 C 9 -1 10 -2 14 -2 C 12 -3 12 -3 9 -4 C 12 -5 11 -5 13 -6 C 10 -7 9 -6 7 -7 C 4 -9 4 -7 3 -8 C 2 -9 0 -9 -2 -9 C 0 -6 -1 -3 0 0 Z"
let starPath = "M 25 1 L 31 18 H 49 L 35 29 L 40 46 L 25 36 L 10 46 L 15 29 L 1 18 H 19 Z"

let linerScale = d3.scaleLinear().domain([0,850]).range([0,1.4])

let titanicTimeline = [
    {time: 0.979166666666667, realtime: '11:30pm', time2: 23.5, name: 'event1', narrative: 'Lookouts notice a haze', key: 'non-key'},
    {time: 0.986111111111111, realtime: '11:40pm', time2: 23.6666666666667, name: 'event2', narrative: 'Titanic hits iceberg', key: 'key'},
    {time: 0.00347222222222222, realtime: '12:05am', time2: 0.0833333333333333, name: 'event3', narrative: 'Capt. issues distress call CQD', key: 'key'},
    {time: 0.0104166666666667, realtime: '12:15am', time2: 0.25, name: 'event4', narrative: 'Stewards order lifebelts', key: 'non-key'},
    {time: 0.0138888888888889, realtime: '12:20am', time2: 0.333333333333333, name: 'event5', narrative: 'Lifeboat loading begins', key: 'non-key'},
    {time: 0.0173611111111111, realtime: '12:25am', time2: 0.416666666666667, name: 'event6', narrative: 'Capt. Admits ship will sink', key: 'non-key'},
    {time: 0.03125, realtime: '12:45am', time2: 0.75, name: 'event7', narrative: 'First lifeboat rowed away', key: 'key'},
    {time: 0.0381944444444444, realtime: '12:55am', time2: 0.916666666666667, name: 'event8', narrative: 'Lifeboat No 6 lowered', key: 'non-key'},
    {time: 0.0555555555555556, realtime: '1:20am', time2: 1.33333333333333, name: 'event9', narrative: 'Boiler room No 4 floods', key: 'non-key'},
    {time: 0.0625, realtime: '1:30am', time2: 1.5, name: 'event10', narrative: 'Sinking rate ten degrees', key: 'non-key'},
    {time: 0.0590277777777778, realtime: '1:25am', time2: 1.41666666666667, name: 'event11', narrative: 'CQ: Loading lifeboats', key: 'non-key'},
    {time: 0.0659722222222222, realtime: '1:35am', time2: 1.58333333333333, name: 'event12', narrative: 'CQ: Engine room flooded', key: 'non-key'},
    {time: 0.0694444444444444, realtime: '1:40am', time2: 1.66666666666667, name: 'event13', narrative: 'Collapsible 3 launched', key: 'non-key'},
    {time: 0.0729166666666667, realtime: '1:45am', time2: 1.75, name: 'event14', narrative: 'Last radio transmission', key: 'key'},
    {time: 0.0798611111111111, realtime: '1:55am', time2: 1.91666666666667, name: 'event15', narrative: 'Lifeboat No 4 launched', key: 'non-key'},
    {time: 0.0868055555555556, realtime: '2:05am', time2: 2.08333333333333, name: 'event16', narrative: 'Collapsible D launched', key: 'non-key'},
    {time: 0.0902777777777778, realtime: '2:10am', time2: 2.16666666666667, name: 'event17', narrative: 'Ship lights go out', key: 'non-key'},
    {time: 0.0951388888888889, realtime: '2:17am', time2: 2.28333333333333, name: 'event18', narrative: 'Titanic breaks in two', key: 'non-key'},
    {time: 0.0965277777777778, realtime: '2:19am', time2: 2.31666666666667, name: 'event19', narrative: 'Bow begins to sink', key: 'non-key'},
    {time: 0.0972222222222222, realtime: '2:20am', time2: 2.33333333333333, name: 'event20', narrative: 'Titanic fully under waves', key: 'key'},
    {time: 0.1, realtime: '2:24am', time2: 2.4, name: 'event21', narrative: 'Titanic at ocean bottom', key: 'non-key'},
    {time: 0.145833333333333, realtime: '3:30am', time2: 3.5, name: 'event22', narrative: 'Survivors see Carpathia', key: 'non-key'},
    {time: 0.166666666666667, realtime: '4:00am', time2: 4, name: 'event23', narrative: 'Carpathia rescue begins', key: 'non-key'},
    {time: 0.220833333333333, realtime: '5:18am', time2: 5.3, name: 'event24', narrative: 'Sunrise on Carpathia', key: 'non-key'},
    {time: 0.375, realtime: '9:00am', time2: 9, name: 'event25', narrative: 'Final survivors on Carptathia', key: 'non-key'},
    {time: 0.385416666666667, realtime: '9:15am', time2: 9.25, name: 'event26', narrative: 'Californian arrives, too late', key: 'non-key'}
    
    ]

let clockScale = d3.scaleLinear().domain([0,1]).range([-180,540])

setDefaultSC()

function setDefaultSC() {


    // CLOCK INFOGRAPHIC

    let clockTimeLine = defaultSC.append("g").attr("id", "clockTimeLine").attr("transform", "translate(40,150)")

    let clockArcGenerator = d3.arc()

    let arcData = []
    for (let i=-4;i<15;i++) {
        arcData.push({startAngle: i*Math.PI/24, endAngle: (i+1)*Math.PI/24, fill: i%2 ? 'none' : 'none', innerRadius: 100, outerRadius: 105})
    }
    arcData.push({startAngle: 0, endAngle: Math.PI*2, fill: 'none', innerRadius: 57, outerRadius: 60})
    arcData.push({startAngle: 0, endAngle: Math.PI*2, fill: 'none', innerRadius: 3, outerRadius: 5})

    clockTimeLine.append("clipPath").attr("id", "clockClip").append("rect").attr("x", -40).attr("y", -150).attr("width", 180).attr("height", 180)
    clockTimeLine.append("text").text("KEY").attr("x", 145).attr("y", 5).attr("text-anchor", "middle").attr("font-size", "12pt").attr("font-weight", "bold").attr("font-style", "italic")
    clockTimeLine.append("text").text("EVENTS").attr("x", 145).attr("y", 20).attr("text-anchor", "middle").attr("font-size", "12pt").attr("font-weight", "bold").attr("font-style", "italic")

    let clockFace = clockTimeLine.append("g").attr("id", "clockFace")

    clockFace
        .selectAll('path')
        .data(arcData)
        .enter()
        .append('path')
        .attr('d', clockArcGenerator)
        .attr("clip-path", "url(#clockClip)")
        .attr('fill', d=>d.fill)
        .attr('stroke', 'black')

    let numeralFontSize = "20pt"
    let numeralStartY = -70
    let clockTimeLineLabels = clockFace.append("g").attr("id", "clockTimeLineLabels").attr("clip-path", "url(#clockClip)")
    clockTimeLineLabels.append("text").text("XI").attr("x", 0).attr("y", numeralStartY).attr("text-anchor", "middle").attr("font-size", numeralFontSize).attr("transform", `translate(0,0) rotate(-30)`)
    clockTimeLineLabels.append("text").text("XII").attr("x", 0).attr("y", numeralStartY).attr("text-anchor", "middle").attr("font-size", numeralFontSize).attr("transform", `translate(0,0) rotate(0)`)
    clockTimeLineLabels.append("text").text("I").attr("x", 0).attr("y", numeralStartY).attr("text-anchor", "middle").attr("font-size", numeralFontSize).attr("transform", `translate(0,0) rotate(30)`)
    clockTimeLineLabels.append("text").text("II").attr("x", 0).attr("y", numeralStartY).attr("text-anchor", "middle").attr("font-size", numeralFontSize).attr("transform", `translate(0,0) rotate(60)`)
    clockTimeLineLabels.append("text").text("III").attr("x", 0).attr("y", numeralStartY).attr("text-anchor", "middle").attr("font-size", numeralFontSize).attr("transform", `translate(0,0) rotate(90)`)
    clockTimeLineLabels.append("text").text("IIII").attr("x", 0).attr("y", numeralStartY).attr("text-anchor", "middle").attr("font-size", numeralFontSize).attr("transform", `translate(0,0) rotate(120)`)

    clockEvents = clockTimeLine.append("g").attr("id", "clockEvents").attr("clip-path", "url(#clockClip)")
    clockEvents.selectAll("g")
        // .data(titanicTimeline.filter(item=>item.key=="key"))
        .data(titanicTimeline)
        .enter().append("g").attr("id", (d)=>{return d.name}).attr("transform", (d)=>{return "translate(0,0) rotate("+clockScale(d.time)+")"})
        .on("mouseover", (e,d)=>{

            // reduce opacity of all event rods
            clockEvents.selectAll("circle").style("opacity", (d)=>(d.key=="key"?0.3:0.1))
            clockEvents.selectAll("line").style("opacity", (d)=>(d.key=="key"?0.3:0.1))
            clockEventsKeyLabels.selectAll("text").style("opacity", 0)

            // raise opacity of hovered event rod
            d3.select("#"+d.name).selectAll("circle").attr("fill", "red").style("opacity", 1)
            d3.select("#"+d.name).selectAll("line").attr("stroke", "red").style("opacity", 1)
            d3.select("#nonKeyEventTime").text(d.realtime).style("opacity", 1)
            d3.select("#nonKeyEventlabel").text(d.narrative).style("opacity", 1)
            
        })
        .on("mouseleave", (e,d)=>{

            // reset opacity of alll event rods
            clockEvents.selectAll("circle").attr("fill", "black").style("opacity", (d)=>(d.key=="key"?0.8:0.3))
            clockEvents.selectAll("line").attr("stroke", "black").style("opacity", (d)=>(d.key=="key"?0.8:0.3))
            clockEventsKeyLabels.selectAll("text").style("opacity", 1)
            d3.select("#nonKeyEventTime").style("opacity", 0)
            d3.select("#nonKeyEventlabel").style("opacity", 0)
        })
        
    clockEvents.selectAll("g").append("line").attr("x1", 0).attr("y1", 6).attr("x2", 0).attr("y2", (d)=>(d.key=="key"?125:110)).attr("stroke-width", (d)=>(d.key=="key"?4:3)).attr("stroke", "black").style("opacity", (d)=>(d.key=="key"?0.8:0.3)).attr("stroke", "black")
    clockEvents.selectAll("g").append("circle").attr("cx", 0).attr("cy", (d)=>(d.key=="key"?129:113)).attr("r", (d)=>(d.key=="key"?4:3)).attr("fill", "black").style("opacity", (d)=>(d.key=="key"?0.8:0.3))

    let clockEventsKeyLabels = clockTimeLine.append("g").attr("id", "clockEventsKeyLabels")
    let clockEventsKeyLabelsFontSize = "6pt"
    clockEventsKeyLabels.append("text").attr("id", "event2label").text("Hits iceberg").attr("x", -38).attr("y", -140).attr("font-size", clockEventsKeyLabelsFontSize)
    clockEventsKeyLabels.append("text").attr("id", "event3label").text("1st distress call sent").attr("x", 12).attr("y", -128).attr("font-size", clockEventsKeyLabelsFontSize)
    clockEventsKeyLabels.append("text").attr("id", "event7label").text("1st lifeboat rowed away").attr("x", 55).attr("y", -117).attr("font-size", clockEventsKeyLabelsFontSize)
    clockEventsKeyLabels.append("text").attr("id", "event14label").text("Last radio transmission").attr("x", 84).attr("y", -85).attr("font-size", clockEventsKeyLabelsFontSize)
    clockEventsKeyLabels.append("text").attr("id", "event20label").text("Fully submerged").attr("x", 115).attr("y", -30).attr("font-size", clockEventsKeyLabelsFontSize)
    clockEventsKeyLabels.append("text").attr("id", "nonKeyEventTime").text("1:23am").attr("x", 70).attr("y", -130).attr("font-size", "10pt").attr("font-weight", "bold").style("opacity", 0)
    clockEventsKeyLabels.append("text").attr("id", "nonKeyEventlabel").text("1:23am, TEST").attr("x", 70).attr("y", -115).attr("font-size", "10pt").style("opacity", 0)


    // MAP INFOGRAPHIC
    let titanicChart = defaultSC.append("g").attr("id", "titanicChart").attr("transform", "translate(260,0)")
    titanicChart.append("text").text("TITANIC'S FATEFUL PATH").attr("x", 115).attr("y", 170).attr("text-anchor", "middle").attr("font-size", "12pt").attr("font-weight", "bold").attr("font-style", "italic")
    titanicChart.append("clipPath").attr("id", "chartClip").append("path").attr("d", "M -50 0 L 280 0 L 230 150 L 0 150 Z")
    zoomRect = titanicChart.append("rect").attr("x", 0).attr("y", 0).attr("width", 230).attr("height", 180).attr("fill", "red").style("opacity", 0.02).attr("clip-path", "url(#chartClip)")

    let topojsonData = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json"
    d3.json(topojsonData).then(
        res => {
            const countriesToInclude = ["Sweden", "France", "Germany", "United States of America", "Greenland", "Canada", "Ireland", "Spain", "United Kingdom",
                                        "Belgium", "Netherlands", "Luxembourg", "Austria", "Czechia", "Denmark", "Finland", "Norway", "Italy", 
                                            ]
            const { countries } = res.objects
            const geojsonData = topojson.feature(res, countries).features.filter(item=>countriesToInclude.includes(item.properties.name))

            // const projection = d3.geoOrthographic()
            const projection = d3.geoMercator()
                .scale(280)
                .rotate([30, -45])
                .translate([150,100])

            const path = d3.geoPath(projection)

            const graticulePaths = titanicChart.append("g").attr("id", "graticulePaths")
            
            graticulePaths
                .append("path")
                .attr("clip-path", "url(#chartClip)")
                .attr("d", path(d3.geoGraticule().step([5,5])()))
                .style("stroke", "grey")
                .style("stroke-width", 0.6)
                .attr("fill", "none")

            const countryPaths = titanicChart.append("g").attr("id", "countryPaths")
            
            countryPaths
                .selectAll("path").data(geojsonData).enter()
                .append("path")
                .attr("clip-path", "url(#chartClip)")
                .attr("fill", "red")
                .style("opacity", 0.7)
                .attr("d", (d)=>{ return path(d)})
                .style("stroke", "none")
            
            const keyLocations = titanicChart.append("g").attr("id", "keyLocations")

            const keyLocationsData = [{name: "Southampton", lat: 50.9105, long: -1.4049},
                                      {name: "Cherbourg", lat: 49.6339, long: -1.6222},
                                      {name: "Queenstown", lat: 51.8503, long: -8.2943},
                                      {name: "Disaster", lat: 41.7666, long: -50.2333},
                                      {name: "New York", lat: 40.7128, long: -74.0060} ]


            keyLocations
                .selectAll("circle").data(keyLocationsData).enter()
                .append("circle")
                .attr("clip-path", "url(#chartClip)")
                .attr("cx", (d)=>{ return projection([d.long,d.lat])[0] })
                .attr("cy", (d)=>{ return projection([d.long,d.lat])[1] })
                .attr("r", 2)
                .attr("fill", "blue")
                .style("opacity", 1)
            
            const keyGeoPaths = titanicChart.append("g").attr("id", "keyGeoPaths")

            const keyGeoPathsData = [path({type: 'Feature', geometry: {type: 'LineString', coordinates: [[-1.4049,50.9105], [-1.6222,49.6339]]}}),
                                        path({type: 'Feature', geometry: {type: 'LineString', coordinates: [[-1.6222,49.6339], [-8.2943,51.8503]]}}),
                                        path({type: 'Feature', geometry: {type: 'LineString', coordinates: [[-8.2943,51.8503], [-50.2333,41.7666,]]}})]

            keyGeoPaths
                .selectAll("path").data(keyGeoPathsData).enter()
                .append("path")
                // .attr("clip-path", "url(#chartClip)")
                .attr("d", d=>d)
                .attr("stroke", "green")
                .style("opacity", 1)

        })
        

    // LINER INFOGRAPHIC

    let liners = defaultSC.append("g").attr("id", "linersInfographic").attr("transform", "translate(600,150)")
    liners.append("text").text("GREATEST LINERS").attr("x", 15).attr("y", -130).attr("text-anchor", "middle").attr("font-size", "12pt").attr("font-weight", "bold").attr("font-style", "italic")

    liners.selectAll("path").data(linersList).enter()
        .append("path")
        .attr("id", "linerPath")
        .attr("class", d=>d.className)
        .attr("d", linerPath)
        .attr("transform", (d,i) => `translate (${25*i},0) scale(${linerScale(d.length)})`)
        .style("opacity", 0.5)
    let linerText1Default = "Along with the Olympic, Titanic"
    let linerText2Default = "was the biggest liner in the world."
    linerText1 = liners.append("text").attr("id", "linerText1").text(linerText1Default).attr("x", 50).attr("y", 10).attr("text-anchor", "middle").attr("font-size", "6pt").attr("font-style", "italic")
    linerText2 = liners.append("text").attr("id", "linerText2").text(linerText2Default).attr("x", 50).attr("y", 20).attr("text-anchor", "middle").attr("font-size", "6pt").attr("font-style", "italic")

    let linerDeetsStartY = -80
    let linerDeetsSpacingY = 11
    let linerDeetsStartX = -15
    let linerDeetsFontSize = "7pt"

    linerDeets0 = liners.append("path").attr("id", "linerDeets0").attr("d", whiteStarFlagPath).attr("fill", "red").style("opacity", 0).attr("transform", `translate(${linerDeetsStartX-41},${linerDeetsStartY-15}) scale(3,3)`)
    linerDeets00 = liners.append("path").attr("id", "linerDeets0").attr("d", starPath).attr("fill", "white").style("opacity", 0).attr("transform", `translate(${linerDeetsStartX-37},${linerDeetsStartY-35}) scale(.25,.25) rotate(-5)`)
    linerDeets1 = liners.append("text").attr("id", "linerDeets1").text("").attr("x", linerDeetsStartX).attr("y", linerDeetsStartY).attr("font-size", linerDeetsFontSize).style("font-family", "sans-serif").attr("text-anchor", "end")
    linerDeets2 = liners.append("text").attr("id", "linerDeets2").text("").attr("x", linerDeetsStartX).attr("y", linerDeetsStartY+linerDeetsSpacingY).attr("font-size", linerDeetsFontSize).style("font-family", "sans-serif").attr("text-anchor", "end")
    linerDeets3 = liners.append("text").attr("id", "linerDeets3").text("").attr("x", linerDeetsStartX).attr("y", linerDeetsStartY+linerDeetsSpacingY*2).attr("font-size", linerDeetsFontSize).style("font-family", "sans-serif").attr("text-anchor", "end")
    linerDeets4 = liners.append("text").attr("id", "linerDeets4").text("").attr("x", linerDeetsStartX).attr("y", linerDeetsStartY+linerDeetsSpacingY*3).attr("font-size", linerDeetsFontSize).style("font-family", "sans-serif").attr("text-anchor", "end")
    linerDeets5 = liners.append("text").attr("id", "linerDeets5").text("").attr("x", linerDeetsStartX).attr("y", linerDeetsStartY+linerDeetsSpacingY*4).attr("font-size", linerDeetsFontSize).style("font-family", "sans-serif").attr("text-anchor", "end")
    linerDeets6 = liners.append("text").attr("id", "linerDeets6").text("").attr("x", linerDeetsStartX).attr("y", linerDeetsStartY+linerDeetsSpacingY*5).attr("font-size", linerDeetsFontSize).style("font-family", "sans-serif").attr("text-anchor", "end")
    linerDeets7 = liners.append("text").attr("id", "linerDeets7").text("").attr("x", linerDeetsStartX).attr("y", linerDeetsStartY+linerDeetsSpacingY*6).attr("font-size", linerDeetsFontSize).style("font-family", "sans-serif").attr("text-anchor", "end")
    linerDeets8 = liners.append("text").attr("id", "linerDeets7").text("").attr("x", linerDeetsStartX).attr("y", linerDeetsStartY+linerDeetsSpacingY*7).attr("font-size", linerDeetsFontSize).style("font-family", "sans-serif").attr("text-anchor", "end")

    d3.selectAll("#linerPath")
        .on("mouseover", (e, d) => {
            linerText1.text(d.name).attr("font-size", "12pt").attr("y", 18).style("font-weight", "bold")
            linerText2.text("")
            d3.select("."+d.className).attr("fill", "red")
            linerDeets0.style("opacity", 0.8)
            linerDeets00.style("opacity", 0.8)
            linerDeets1.text("Length: "+d.length+" ft")
            linerDeets2.text("Beam: "+d.beam+" ft")
            linerDeets3.text("Depth: "+d.depth+" ft")
            linerDeets4.text("Tonnage: "+d3.format(",")(d.tonnage))
            linerDeets5.text("Hp: "+d3.format(",")(d.horsePower))
            linerDeets6.text("Av speed: "+d.avSpeed+" Kn.")
            linerDeets7.text("Built: "+d.yearBuilt)
            linerDeets8.text(d.screw)
        })
        .on("mouseout", (e, d)=> {
            linerText1.text(linerText1Default).attr("font-size", "6pt").attr("y", 10).style("font-weight", "normal")
            linerText2.text(linerText2Default)
            d3.select("."+d.className).attr("fill", "black")
            linerDeets0.style("opacity", 0)
            linerDeets00.style("opacity", 0)
            linerDeets1.text("")
            linerDeets2.text("")
            linerDeets3.text("")
            linerDeets4.text("")
            linerDeets5.text("")
            linerDeets6.text("")
            linerDeets7.text("")
            linerDeets8.text("")
        })

}


const extractColumn = (arr, column) => arr.map(x=>x[column]);

var sunburstRadius = 0.9*Math.min(primaryContainerWidth, primaryContainerHeight) / 2

var radius = 6.5
let cornerRadius = 0
var originalRadius = radius

const palette1 = ["#3b3122", "#8a7350", "#66553b"]
const palette2 = ["#a87242", "#704214", "#8c5a2b" ]
const ageSexColor = d3.scaleOrdinal().range(palette2)

let passengerData = []

let gs1Legend = primaryContainer.append("g").attr("id", "gs1LegendGroup")

let headlinesEtc = primaryContainer.append("g").attr("id", "headlinesEtc")

let subHeadlines = ["OVER 1,300 PASSENGERS WERE KNOWN ON RMS TITANIC",
                    "MALE PASSENGERS OUTNUMBERED FEMALES BY 2:1",        // 466 female, 843 male
                    "HALF OF KNOWN PASSENGERS WERE UNDER 30 YRS OLD",
                    "ONE QUARTER OF PASSENGERS WERE IN FIRST CLASS",     // 1st CLASS, 326 - 2nd CLASS, 272 - 3rd CLASS, 706"
                    "NEWS FROM RMS OLYMPIC: IDENTITY OF THE SURVIVORS",
                    "RMS CARPATHIA: MORE NEWS ON SURVIVORS INCL. CREW"
                    ]
            
            

let subHeadline = d3.select("#headlinesEtc").append("text")
            .text(subHeadlines[0])
            .attr("x", 10)
            .attr("y", primaryContainerHeight-42)
            .style("font-style", "italic")
            .style("font-size", "20px")


function subHeadlineTransition(textToTransition) {
    subHeadline
        .transition().duration(1000)
            .attr("x", primaryContainerWidth)
            .style("opacity", 0)

        .transition().duration(0)
            .text(textToTransition)
            .attr("x", -primaryContainerWidth)

        .transition().duration(1000)
            .attr("x", 10)
            .style("opacity", 1)
}

let oneOfN = d3.select("#headlinesEtc").append("text")
            .text(" 1 / 6 ")
            .attr("x", 10)
            .attr("y", primaryContainerHeight-10)
            .style("font-style", "italic")
            .style("font-size", "12px")

let clickForMore = d3.select("#headlinesEtc").append("g").attr("id", "clickForMore")

clickForMoreRect = clickForMore.append("rect")
            .attr("id", "clickForMoreRect")
            .attr("x", primaryContainerWidth-170)
            .attr("y", primaryContainerHeight-65)
            .attr("width", 165)
            .attr("height", 60)
            .style("opacity", 0.1)

clickForMore
    .append("path")
    .attr("d", `M ${primaryContainerWidth-87.5-15} ${primaryContainerHeight-35-20} L ${primaryContainerWidth-87.5+15} ${primaryContainerHeight-35-5} L ${primaryContainerWidth-87.5-15} ${primaryContainerHeight-35+10} Z`)
    .style("opacity", 0.4)

clickForMore.append("text")
            .text("Click here for more details ...")
            .attr("x", primaryContainerWidth-155)
            .attr("y", primaryContainerHeight-10)
            .style("font-style", "italic")
            .style("font-size", "12px")
            .style("pointer-events", "none")

let sunburstGroup = primaryContainer
            .append('g')
            .attr('id', 'sunburstGroup')
            .attr('transform', 'translate(' + primaryContainerWidth / 2 + ',' + ((primaryContainerHeight)-85) + ') scale(1.65,1.65) rotate(-90)')

var partition = d3.partition().size([Math.PI, sunburstRadius])
var root = d3.hierarchy(group).sum(function (d) { return d.number})
partition(root)

arc = d3.arc()
            .startAngle(d => {d.x0s = 0; return d.x0})
            .endAngle(d => {d.x1s = 0; return d.x1})
            .innerRadius(d =>{ return d.y0 })
            .outerRadius(d => { return d.y1 })

function computeTextRotation(d) {
    var angle = (d.x0 + d.x1) / Math.PI * 90
    return (angle < 90) ? angle + 90 : angle - 90
    }

function arcTweenPath(a, i) {
    var oi = d3.interpolate({ x0: a.x0s, x1: a.x1s }, a)
    function tween(t) {
        var b = oi(t)
        // a.x0s = b.x0
        // a.x1s = b.x1
        return arc(b)
        }
    return tween;
    }

function arcTweenText(a, i) {
    var oi = d3.interpolate({ x0: a.x0s, x1: a.x1s }, a)
    function tween(t) {
        var b = oi(t)
        return "translate(" + arc.centroid(b) + ")rotate(" + computeTextRotation(b) + ")"
        }
    return tween
    }

function redraw(newRoot) {
    if (newRoot=="ageSex") {group = d3.group(tabularData, d=> d.ageSex, d=>d.cabinClass)}
    else if (newRoot=="cabinClass") {group = d3.group(tabularData, d=>d.cabinClass, d=> d.ageSex)}
    else if (newRoot=="survived") {group = d3.group(tabularData, d=>d.survived, d=> d.ageSex)}
    root = d3.hierarchy(group)
        .sum(function (d) { return d.number})
    partition(root)

    sunburstGroup.selectAll("g").remove()

    slice = sunburstGroup.selectAll('g')
        .data(root.descendants())
        .enter().append('g').attr("class", "node")

    bigNumberGroup = sunburstGroup.append("g").attr("id", "bigNumberGroup")
    bigNumber = bigNumberGroup.append("text").text("2,224").attr("transform", "translate(20,0) rotate(90)")
        .style("font-size", "28px").style("text-anchor", "middle").style("vertical-align", "middle")
    bigNumberSubtitle = bigNumberGroup.append("text").text("All passengers and crew").attr("transform", "translate(5,0) rotate(90)")
        .style("font-style", "italic").style("font-size", "8px").style("text-anchor", "middle").style("vertical-align", "middle")

    clickToRedraw = sunburstGroup.append("g").attr("id", "clickToRedraw")
    clickToRedrawText = clickToRedraw.append("text").text("Click to redraw by").attr("transform", "translate(220,170) rotate(90)")
        .style("font-style", "italic").style("font-size", "8px").style("text-anchor", "middle").style("vertical-align", "middle").style("opacity", 0)
    clickToRedrawValue = clickToRedraw.append("text").text("").attr("transform", "translate(205,170) rotate(90)")
        .style("font-style", "italic").style("font-size", "14px").style("text-anchor", "middle").style("vertical-align", "middle").style("opacity", 0)

    slice
        .append('path')
        .attr("display", function (d) { return d.depth ? null : "none"; })
        .attr("d", arc)
        .style('stroke', '#fff')
        .style("stroke-width", 0.1)
        .style("fill", function (d) {
            return ageSexColor(d.depth) })


    var text = slice
        .append("text")
        .attr('display', d => (d.x1-d.x0>0.05) ? null : 'none')
        .attr("transform", function(d) {
            return "translate(" + arc.centroid(d) + ") rotate(" + computeTextRotation(d) + ")"; })
        .attr("text-anchor", "middle")
        .attr("dy", ".3em")
        .attr("fill", "white")
        .attr("font-size", "6pt")
        .style("pointer-events", "none")
        .text(function(d) { return (d.depth==3) ? ((newRoot=="ageSex" || newRoot =="cabinClass") ? (d.data.survived) : d.data.cabinClass) :
                                    d.parent    ? d.data[0] : "" })

    slice.selectAll("path").transition().duration(750).attrTween("d", arcTweenPath)
    slice.selectAll("text").transition().duration(750).attrTween("transform", arcTweenText)

    sunburstGroup.selectAll('path')
        .on("mouseover", (e,d)=>{
            var sequenceArray = d.ancestors().reverse()
            sequenceArray.shift()
            var textValues = sequenceArray[0].data[0]
            if (sequenceArray.length == 1) {
                bigNumber.text(d3.format(",")(sequenceArray[0].value))
            } else if (sequenceArray.length == 2) {
                textValues += ", " + sequenceArray[1].data[0]
                bigNumber.text(d3.format(",")(sequenceArray[1].value))
                clickToRedrawText.style("opacity", 1)
                clickToRedrawValue.style("opacity", 1).text(
                    (sequenceArray[1].data[0]=="Men" || sequenceArray[1].data[0]=="Women" || sequenceArray[1].data[0]=="Children") ? "Sex" :
                        (sequenceArray[1].data[0]=="Perished" || sequenceArray[1].data[0]=="Survived") ? "Survivorship" : "Cabin class"
                    )
            } else if (sequenceArray.length == 3) {
                clickToRedrawText.style("opacity", 1)
                clickToRedrawValue.style("opacity", 1)
                if (newRoot=="ageSex" || newRoot =="cabinClass") {
                    textValues += ", " + sequenceArray[1].data[0] + ", " + sequenceArray[2].data.survived
                    bigNumber.text(d3.format(",")(sequenceArray[2].value))
                    clickToRedrawValue.text("Survivorship")
                }
                else if (newRoot=="survived") {
                    textValues += ", " + sequenceArray[1].data[0] + ", " + sequenceArray[2].data.cabinClass
                    bigNumber.text(d3.format(",")(sequenceArray[2].value))
                    clickToRedrawValue.text("Cabin class")
                }
            }

            bigNumberSubtitle.text(textValues)


            
            slice.selectAll("path")
                .style("opacity", 0.5)

            slice.selectAll("path")
                .filter(function(node) {
                    return (sequenceArray.indexOf(node) >= 0);
                })
                .style("opacity", 1)
            })
        .on("click", (e,d)=>{
            clickToRedrawText.style("opacity", 0)
            clickToRedrawValue.style("opacity", 0)
            var sequenceArray = d.ancestors().reverse()
            sequenceArray.shift()
            if (sequenceArray.length == 3 && (newRoot=="cabinClass" || newRoot =="ageSex")) {
                redraw("survived")
            }
            else if (sequenceArray.length == 2 && (newRoot=="cabinClass" || newRoot =="survived")) {
                redraw("ageSex")
            }
            else if ((sequenceArray.length == 2 && newRoot=="ageSex") || (sequenceArray.length == 3 && newRoot =="survived")) {
                redraw("cabinClass")
            }
            })
        .on("mouseleave", ()=>{
            slice.selectAll("path").style("opacity", 1)
            bigNumber.text("2,224")
            bigNumberSubtitle.text("All passengers and crew")
            clickToRedrawText.style("opacity", 0)
            clickToRedrawValue.style("opacity", 0)
            })
}


d3.csv('./data/titanic.csv').then(
    res => {
    
    passengerData = shuffle(res)

    let passengerGroup = primaryContainer.append("g").attr("id", "passengerGroup")

    let passengers = passengerGroup.selectAll("g")
        .data(passengerData)
        .enter()
        .append("g")
        .attr("class", "passenger")
        .attr("transform", "translate(0, 0)")

    passengers
        .transition()
            .duration((d,i)=>i*2)
            .attr("transform", (d, i) => {
                    let leftRightBuffer = 15
                    let topBuffer = (radius*2+1)
                    let unitSize = (radius*2+1)
                    let numUnitsWide = 1 * Math.floor(Math.floor(( primaryContainerWidth-(leftRightBuffer*2) ) / unitSize))
                    let initialX = leftRightBuffer + radius + (i % numUnitsWide ) * unitSize
                    let initialY = topBuffer + Math.floor( i/numUnitsWide ) * unitSize
                    return "translate(" +
                            initialX + "," +
                            initialY + ")"
                })

    passengers
            .append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", radius*2)
            .attr("height", radius*2)
            .attr("rx", cornerRadius)
            .attr("ry", cornerRadius)
            .style("fill", "#4b371c")
            .style("opacity", 0.5)

    clickForMore.on("mouseover", ()=>{clickForMoreRect.transition().duration(300).style("opacity", 0.3)})
    clickForMore.on("mouseout", ()=>{clickForMoreRect.transition().duration(300).style("opacity", 0.1)})

    clickForMore.on("click", ()=>{

        oneOfN.text((globalState+1) + " / 6")

        if (globalState == 0) {
            sunburstGroup.selectAll("g").remove()

            radius = originalRadius
            subHeadlineTransition(subHeadlines[globalState])
            passengers
                .transition()
                .duration((d,i)=>(i))
                .attr("transform", (d, i) => {
                    let leftRightBuffer = 15
                    let topBuffer = (radius*2+1)
                    let unitSize = (radius*2+1)
                    let numUnitsWide = 1 * Math.floor(Math.floor(( primaryContainerWidth-(leftRightBuffer*2) ) / unitSize))
                    let initialX = leftRightBuffer + radius + (i % numUnitsWide ) * unitSize
                    let initialY = topBuffer + Math.floor( i/numUnitsWide ) * unitSize
                    return "translate(" +
                            initialX + "," +
                            initialY + ")"
                })

            passengers.selectAll("rect")
                .transition().duration(t)
                    .style("fill", "#4b371c")
                    .style("opacity", 0.5)
                    .attr("rx", cornerRadius)
                    .attr("ry", cornerRadius)
                    .attr("width", radius*2)
                    .attr("height", radius*2)

            globalState += 1
        }
        else if (globalState == 1) {

            subHeadlineTransition(subHeadlines[globalState])

            radius = 5
            let midBuffer = 35
            let topBuffer = 0.05 * primaryContainerHeight
            let unitSize = radius*2 + 1
            let bottomBuffer = 0.8 * primaryContainerHeight
            let numUnitsHigh = Math.floor((bottomBuffer-topBuffer)/unitSize)


            gs1LegendMale = gs1Legend.append("g")
                        .attr("id", "gs1LegendMale")
                        .attr("transform", `translate(${-100},${0.8*primaryContainerHeight+15})`)
            
            gs1LegendMale.append("text").text("Male").attr("x", 0).attr("y", 0).style("font-style", "italic").style("font-size", "16px").attr("text-anchor", "end")
            gs1LegendMale.append("text").text("843").attr("x", 0).attr("y", 10).style("font-style", "italic").style("font-size", "10px").attr("text-anchor", "end")
            
            gs1LegendFemale = gs1Legend.append("g")
                        .attr("id", "gs1LegendFemale")
                        .attr("transform", `translate(${primaryContainerWidth+100},${0.8*primaryContainerHeight+15})`)
            
            gs1LegendFemale.append("text").text("Female").attr("x", 0).attr("y", 0).style("font-style", "italic").style("font-size", "16px")
            gs1LegendFemale.append("text").text("466").attr("x", 0).attr("y", 10).style("font-style", "italic").style("font-size", "10px")

            gs1LegendMale.transition().duration(t)
                .attr("transform", `translate(${primaryContainerWidth/2-midBuffer},${0.8*primaryContainerHeight+15})`)
            
            gs1LegendFemale.transition().duration(t)
                .attr("transform", `translate(${primaryContainerWidth/2+midBuffer},${0.8*primaryContainerHeight+15})`)

            passengers.selectAll("rect")
                .transition().duration(t/4)
                    .attr("rx", 0)
                    .attr("ry", 0)
                    .attr("width", radius*2)
                    .attr("height", radius*2)
                    .style("fill", (d) => (d.kSex == "male" ? "#4b371c" : "#9a7b4f"))
                    .style("opacity", 0.9)

            passengers
                .transition()
                .duration((d,i)=>(i*2))
                    .attr("transform", (d,i) => {
                        let i_prime = passengerData.filter(item => item.kSex == d.kSex).findIndex(e => {return e.openmlid == d.openmlid})
                        let initialY = topBuffer + ( i_prime % numUnitsHigh) * unitSize
                        let initialX
                        if (d.kSex == "female") { initialX = primaryContainerWidth/2 + midBuffer + Math.floor( i_prime / numUnitsHigh ) * unitSize }
                        else                   { initialX = primaryContainerWidth/2 - midBuffer - unitSize - Math.floor( (i_prime) / numUnitsHigh ) * unitSize }

                        return "translate(" +
                                initialX + "," +
                                initialY + ")"
                    })

            globalState += 1
        }
        else if (globalState == 2) {

            subHeadlineTransition(subHeadlines[globalState])

            radius = 3.5
            let midBuffer = 50
            let ageBucketBuffer = 5
            let topBuffer = 0.05 * primaryContainerHeight
            let unitSize = radius*2 + 1
            let bottomBuffer = 0.8 * primaryContainerHeight
            let ageBucketHeight = (bottomBuffer-topBuffer)/8
            let numUnitsHigh = Math.floor((ageBucketHeight-ageBucketBuffer)/unitSize)
            let xOffset = 30

            //              female	male	total
            // ?        	78	    185 	263
            // 0 - 10 yrs	39	    43  	82
            // 10 - 20 yrs	64  	79  	143
            // 20 - 25 yrs	69  	115 	184
            // 25 - 30 yrs	46  	114 	160
            // 30 - 40 yrs	86  	146 	232
            // 40 - 60 yrs	73  	132 	205
            // 60 yrs + 	11  	29  	40
            // Grand Total	466 	843 	1309


            gs1LegendUnk = gs1Legend.append("g").attr("id", "gs1LegendUnknown").attr("transform", `translate (${primaryContainerWidth/2 + xOffset},${0})`).style("opacity", 0)
            gs1LegendUnk.append("text").text("Unknown").attr("x", 0).attr("y", 0).style("font-style", "italic").style("font-size", "12px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1LegendUnk.append("text").text("263").attr("x", 0).attr("y", 11).style("font-style", "italic").style("font-size", "10px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1Legend60 = gs1Legend.append("g").attr("id", "gs1Legend60").attr("transform", `translate (${primaryContainerWidth/2 + xOffset},${0})`).style("opacity", 0)
            gs1Legend60.append("text").text("60 yrs +").attr("x", 0).attr("y", 0).style("font-style", "italic").style("font-size", "12px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1Legend60.append("text").text("40").attr("x", 0).attr("y", 11).style("font-style", "italic").style("font-size", "10px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1Legend40 = gs1Legend.append("g").attr("id", "gs1Legend40").attr("transform", `translate (${primaryContainerWidth/2 + xOffset},${0})`).style("opacity", 0)
            gs1Legend40.append("text").text("40 - 59 yrs").attr("x", 0).attr("y", 0).style("font-style", "italic").style("font-size", "12px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1Legend40.append("text").text("205").attr("x", 0).attr("y", 11).style("font-style", "italic").style("font-size", "10px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1Legend30 = gs1Legend.append("g").attr("id", "gs1Legend30").attr("transform", `translate (${primaryContainerWidth/2 + xOffset},${0})`).style("opacity", 0)
            gs1Legend30.append("text").text("30 - 39 yrs").attr("x", 0).attr("y", 0).style("font-style", "italic").style("font-size", "12px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1Legend30.append("text").text("232").attr("x", 0).attr("y", 11).style("font-style", "italic").style("font-size", "10px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1Legend25 = gs1Legend.append("g").attr("id", "gs1Legend25").attr("transform", `translate (${primaryContainerWidth/2 + xOffset},${0})`).style("opacity", 0)
            gs1Legend25.append("text").text("25 - 29 yrs").attr("x", 0).attr("y", 0).style("font-style", "italic").style("font-size", "12px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1Legend25.append("text").text("160").attr("x", 0).attr("y", 11).style("font-style", "italic").style("font-size", "10px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1Legend20 = gs1Legend.append("g").attr("id", "gs1Legend20").attr("transform", `translate (${primaryContainerWidth/2 + xOffset},${0})`).style("opacity", 0)
            gs1Legend20.append("text").text("20 - 24 yrs").attr("x", 0).attr("y", 0).style("font-style", "italic").style("font-size", "12px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1Legend20.append("text").text("184").attr("x", 0).attr("y", 11).style("font-style", "italic").style("font-size", "10px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1Legend10 = gs1Legend.append("g").attr("id", "gs1Legend10").attr("transform", `translate (${primaryContainerWidth/2 + xOffset},${0})`).style("opacity", 0)
            gs1Legend10.append("text").text("10 - 19 yrs").attr("x", 0).attr("y", 0).style("font-style", "italic").style("font-size", "12px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1Legend10.append("text").text("143").attr("x", 0).attr("y", 11).style("font-style", "italic").style("font-size", "10px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1Legend0 = gs1Legend.append("g").attr("id", "gs1Legend0").attr("transform", `translate (${primaryContainerWidth/2 + xOffset},${0})`).style("opacity", 0)
            gs1Legend0.append("text").text("0 - 9 yrs").attr("x", 0).attr("y", 0).style("font-style", "italic").style("font-size", "12px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1Legend0.append("text").text("82").attr("x", 0).attr("y", 11).style("font-style", "italic").style("font-size", "10px").style("text-anchor", "middle").style("vertical-align", "middle")

            gs1LegendUnk.transition().duration(t).attr("transform", `translate (${primaryContainerWidth/2 + xOffset},${topBuffer+ageBucketHeight*0.5})`).style("opacity", 1)
            gs1Legend60.transition().duration(t).attr("transform", `translate (${primaryContainerWidth/2 + xOffset},${topBuffer+ageBucketHeight*1.5})`).style("opacity", 1)
            gs1Legend40.transition().duration(t).attr("transform", `translate (${primaryContainerWidth/2 + xOffset},${topBuffer+ageBucketHeight*2.5})`).style("opacity", 1)
            gs1Legend30.transition().duration(t).attr("transform", `translate (${primaryContainerWidth/2 + xOffset},${topBuffer+ageBucketHeight*3.5})`).style("opacity", 1)
            gs1Legend25.transition().duration(t).attr("transform", `translate (${primaryContainerWidth/2 + xOffset},${topBuffer+ageBucketHeight*4.5})`).style("opacity", 1)
            gs1Legend20.transition().duration(t).attr("transform", `translate (${primaryContainerWidth/2 + xOffset},${topBuffer+ageBucketHeight*5.5})`).style("opacity", 1)
            gs1Legend10.transition().duration(t).attr("transform", `translate (${primaryContainerWidth/2 + xOffset},${topBuffer+ageBucketHeight*6.5})`).style("opacity", 1)
            gs1Legend0.transition().duration(t).attr("transform", `translate (${primaryContainerWidth/2 + xOffset},${topBuffer+ageBucketHeight*7.5})`).style("opacity", 1)

            gs1LegendMale.transition().duration(t)
                .attr("transform", `translate(${primaryContainerWidth/2-midBuffer+xOffset},${0.8*primaryContainerHeight+15})`)
            
            gs1LegendFemale.transition().duration(t)
                .attr("transform", `translate(${primaryContainerWidth/2+midBuffer+xOffset},${0.8*primaryContainerHeight+15})`)

            passengers.selectAll("rect")
                .transition().duration(t/4)
                    .attr("rx", cornerRadius)
                    .attr("ry", cornerRadius)
                    .attr("width", radius*2)
                    .attr("height", radius*2)
                    .style("fill", (d) => (d.kSex == "male" ? "#4b371c" : "#9a7b4f"))
                    .style("opacity", 0.9)

            passengers
                .transition()
                .duration((d,i)=>(i))
                    .attr("transform", (d,i) => {
                        let i_prime = passengerData.filter(item => (item.kSex == d.kSex && item.ageBucket == d.ageBucket)).findIndex(e => {return e.openmlid == d.openmlid})
                        let yOffset = 0
                        if (d.ageBucket == "60 yrs + ") {yOffset = ageBucketHeight}
                        else if (d.ageBucket == "40 - 60 yrs") {yOffset = ageBucketHeight * 2}
                        else if (d.ageBucket == "30 - 40 yrs") {yOffset = ageBucketHeight * 3}
                        else if (d.ageBucket == "25 - 30 yrs") {yOffset = ageBucketHeight * 4}
                        else if (d.ageBucket == "20 - 25 yrs") {yOffset = ageBucketHeight * 5}
                        else if (d.ageBucket == "10 - 20 yrs") {yOffset = ageBucketHeight * 6}
                        else if (d.ageBucket == "0 - 10 yrs") {yOffset = ageBucketHeight * 7}

                        let initialY = yOffset + topBuffer + ( i_prime % numUnitsHigh) * unitSize
                        let initialX
                        if (d.kSex == "female") { initialX = primaryContainerWidth/2 + xOffset + midBuffer + Math.floor( i_prime / numUnitsHigh ) * unitSize }
                        else                   { initialX =  primaryContainerWidth/2 + xOffset - midBuffer - unitSize - Math.floor( (i_prime) / numUnitsHigh ) * unitSize }

                        return "translate(" +
                                initialX + "," +
                                initialY + ")"
                    })

            globalState += 1
        }
        else if (globalState == 3) {

            subHeadlineTransition(subHeadlines[globalState])

            d3.select("#gs1LegendUnknown").remove()
            d3.select("#gs1Legend60").remove()
            d3.select("#gs1Legend40").remove()
            d3.select("#gs1Legend30").remove()
            d3.select("#gs1Legend25").remove()
            d3.select("#gs1Legend20").remove()
            d3.select("#gs1Legend10").remove()
            d3.select("#gs1Legend0").remove()

            radius = 4
            let midBuffer = 50
            let classBuffer = 10
            let topBuffer = 0.05 * primaryContainerHeight
            let unitSize = radius*2 + 1
            let bottomBuffer = 0.8 * primaryContainerHeight
            let classHeight = (bottomBuffer-topBuffer)/3
            let numUnitsHigh = Math.floor((classHeight-classBuffer)/unitSize)
            let xOffset = 100

            //  	male	female	Total
            // 1	179	    144 	323
            // 2	171 	106 	277
            // 3	493 	216 	709
            // Tot	843 	466 	1309

            gs1Legend1st = gs1Legend.append("g").attr("id", "gs1Legend1st").attr("transform", `translate (${primaryContainerWidth/2 + xOffset},${0})`).style("opacity", 0)
            gs1Legend1st.append("text").text("First Class").attr("x", 0).attr("y", 0).style("font-style", "italic").style("font-size", "12px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1Legend1st.append("text").text("323").attr("x", 0).attr("y", 11).style("font-style", "italic").style("font-size", "10px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1Legend2nd = gs1Legend.append("g").attr("id", "gs1Legend2nd").attr("transform", `translate (${primaryContainerWidth/2 + xOffset},${0})`).style("opacity", 0)
            gs1Legend2nd.append("text").text("Second Class").attr("x", 0).attr("y", 0).style("font-style", "italic").style("font-size", "12px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1Legend2nd.append("text").text("277").attr("x", 0).attr("y", 11).style("font-style", "italic").style("font-size", "10px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1Legend3rd = gs1Legend.append("g").attr("id", "gs1Legend3rd").attr("transform", `translate (${primaryContainerWidth/2 + xOffset},${0})`).style("opacity", 0)
            gs1Legend3rd.append("text").text("Third Class").attr("x", 0).attr("y", 0).style("font-style", "italic").style("font-size", "12px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1Legend3rd.append("text").text("709").attr("x", 0).attr("y", 11).style("font-style", "italic").style("font-size", "10px").style("text-anchor", "middle").style("vertical-align", "middle")

            d3.select("#gs1Legend1st").transition().duration(t).attr("transform", `translate (${primaryContainerWidth/2 + xOffset},${topBuffer+classHeight*0.5})`).style("opacity", 1)
            d3.select("#gs1Legend2nd").transition().duration(t).attr("transform", `translate (${primaryContainerWidth/2 + xOffset},${topBuffer+classHeight*1.5})`).style("opacity", 1)
            d3.select("#gs1Legend3rd").transition().duration(t).attr("transform", `translate (${primaryContainerWidth/2 + xOffset},${topBuffer+classHeight*2.5})`).style("opacity", 1)

            gs1LegendMale.transition().duration(t).attr("transform", `translate(${primaryContainerWidth/2-midBuffer+xOffset},${0.8*primaryContainerHeight+15})`)
            gs1LegendFemale.transition().duration(t).attr("transform", `translate(${primaryContainerWidth/2+midBuffer+xOffset},${0.8*primaryContainerHeight+15})`)

            passengers.selectAll("rect")
                .transition().duration(t/4)
                    .attr("rx", 0)
                    .attr("ry", 0)
                    .attr("width", radius*2)
                    .attr("height", radius*2)
                    .style("fill", (d) => (d.kSex == "male" ? "#4b371c" : "#9a7b4f"))
                    .style("opacity", 0.9)

            passengers
                .transition()
                .duration((d,i)=>(i))
                    .attr("transform", (d,i) => {
                        let i_prime = passengerData.filter(item => (item.kSex == d.kSex && item.kPclass == d.kPclass)).findIndex(e => {return e.openmlid == d.openmlid})
                        let yOffset = 0
                        if (d.kPclass == 2) {yOffset = classHeight}
                        else if (d.kPclass == 3) {yOffset = classHeight * 2}

                        let initialY = yOffset + topBuffer + ( i_prime % numUnitsHigh) * unitSize
                        let initialX
                        if (d.kSex == "female") { initialX = primaryContainerWidth/2 + xOffset + midBuffer + Math.floor( i_prime / numUnitsHigh ) * unitSize }
                        else                   { initialX =  primaryContainerWidth/2 + xOffset - midBuffer - unitSize - Math.floor( (i_prime) / numUnitsHigh ) * unitSize }

                        return "translate(" +
                                initialX + "," +
                                initialY + ")"
                    })

            globalState += 1
        }
        else if (globalState == 4) {

            subHeadlineTransition(subHeadlines[globalState])

            survivorKey = primaryContainer.append("g").attr("id", "survivorKey").attr("transform", "translate(-300, 100)")

            survivorKey.append("text").text("Survived").attr("x", 0).attr("y", 0).style("font-size", "12px") //.style("font-style", "italic")
                        .style("vertical-align", "middle")
            survivorKey.append("text").text("Perished").attr("x", 0).attr("y", 20).style("font-size", "12px") //.style("font-style", "italic")
                        .style("vertical-align", "middle")
            survivorKey.append("rect").attr("x", -5-radius*2).attr("y", -radius*2).attr("width", radius*2).attr("height", radius*2).style("opacity", 1).style("fill", "#4b371c")
            survivorKey.append("rect").attr("x", -5-radius*2).attr("y", 20-radius*2).attr("width", radius*2).attr("height", radius*2).style("opacity", 0.2).style("fill", "#4b371c")

            survivorKey.transition().duration(t).attr("transform", "translate(100,100)")

            passengers.selectAll("rect")
                .transition().duration(t)
                .style("opacity", (d)=>(d.openmlsurvived == 1 ? 1 : 0.2))

            globalState += 1
        }
        else if (globalState == 5) {

            subHeadlineTransition(subHeadlines[globalState])

            d3.select("#survivorKey").remove()
            gs1Legend.selectAll("g").remove()
            // gs1Legend.selectAll("text").remove()

            passengers
                .transition()
                .duration((d,i)=>(i*2))
                .attr("transform", "translate(0,0)")
            passengers.selectAll("rect")
                .transition()
                .duration(t)
                .style("opacity", 0)

            redraw("cabinClass")


            globalState = 0
        }
        })

    setPD(passengerData.find(item=>(item.openmlid==11)))
    
    passengers.selectAll("rect")
            .on("mouseover", (e,d)=>{
                defaultPD.style("opacity", 1)
                setPD(d)
            })
            .on("mouseout", (e,d)=>{
                // defaultPD.style("opacity", 0.5)
            })

    setPD(passengerData.find(item=>(item.openmlid==11)))

    function setPD(passenger) {

        // let passengerDetailContainerWidth = 215
        // let passengerDetailContainerHeight = 200

        defaultPD.selectAll("g").remove()
        
        let passengerDetailTitle = defaultPD.append("g").attr("id", "passengerDetailTitle").attr("transform", "translate(0,0) scale(1,1)")
        mainPassengerTitle = passengerDetailTitle.append("g").attr("id", "mainPassengerTitle")
        mainPassengerTitle
            .append("text").attr("id", "mainPassengerName").text(passenger.derivedPassengerTitleName).attr("x", 5).attr("y", 20).attr("font-size", "14pt").attr("font-weight", "bold") //.attr("font-style", "italic")
        passengerDetailTitle.append("text").attr("id", "mainPassengerSubTitle").text("PASSENGER PROFILE").attr("x", 5).attr("y", 35).attr("font-size", "11pt").attr("font-weight", "bold") //.attr("font-style", "italic")
        const mainPassengerTitleRequiredWidth = 0.9*(passengerDetailContainerWidth/((d3.select("#mainPassengerName")._groups[0][0].getComputedTextLength())))

        mainPassengerTitle.attr("transform", `scale(${mainPassengerTitleRequiredWidth},1)`)

        const passengerAgeScale = d3.scaleLinear().domain([0,85]).range([0,120])

        let passengerFirstColumn = defaultPD.append("g").attr("id", "passengerFirstColumn").attr("transform", `translate(5,45) scale(1,1)`)
        passengerFirstColumn.append("rect").attr("x", 0).attr("y", 5).attr("width", 120).attr("height", 1)
        passengerFirstColumn.append("rect").attr("x", (passenger.kAge=="?") ? 0 : passengerAgeScale(passenger.kAge)-1).attr("y", 0).attr("width", (passenger.kAge=="?") ? 0 : 3).attr("height", 11).attr("fill", "red")
        passengerFirstColumn.append("text").text(((passenger.kAge=="?")?"Age unknown":d3.format(".0f")(passenger.kAge)+" yrs")).attr("x", (passenger.kAge=="?") ? 0 : passengerAgeScale(passenger.kAge)-1).attr("y", 18).style("font-size", "8px").attr("text-anchor", ((passenger.kAge=="?")||passenger.kAge<10) ? "left" :"middle")
        
        passengerBoardedGroup = passengerFirstColumn.append("g").attr("id", "passengerBoardedGroup")
        passengerBoardedGroup.append("text").text("Boarded").attr("x", 0).attr("y", 32).style("font-size", "8px")
        passengerBoardedGroup.append("rect").attr("x", 0).attr("y", 35).attr("width", 59).attr("height", 10).attr("id", "belfastBox").attr("fill", "brown").style("opacity", passenger.kBoarded=="Belfast"?1:0.5)
        passengerBoardedGroup.append("text").attr("x", 30).attr("y", 43).attr("text-anchor", "middle").text("Belfast").style("font-size", "8px").attr("fill", "white").style("opacity", passenger.kBoarded=="Belfast"?1:0.5)
        passengerBoardedGroup.append("rect").attr("x", 61).attr("y", 35).attr("width", 59).attr("height", 10).attr("id", "southamptonBox").attr("fill", "brown").style("opacity", passenger.kBoarded=="Southampton"?1:0.5)
        passengerBoardedGroup.append("text").attr("x", 91).attr("y", 43).attr("text-anchor", "middle").text("Southampton").style("font-size", "8px").attr("fill", "white").style("opacity", passenger.kBoarded=="Southampton"?1:0.5)
        passengerBoardedGroup.append("rect").attr("x", 0).attr("y", 46).attr("width", 59).attr("height", 10).attr("id", "cherbourgBox").attr("fill", "brown").style("opacity", passenger.kBoarded=="Cherbourg"?1:0.5)
        passengerBoardedGroup.append("text").attr("x", 30).attr("y", 54).attr("text-anchor", "middle").text("Cherbourg").style("font-size", "8px").attr("fill", "white").style("opacity", passenger.kBoarded=="Cherbourg"?1:0.5)
        passengerBoardedGroup.append("rect").attr("x", 61).attr("y", 46).attr("width", 59).attr("height", 10).attr("id", "queenstownBox").attr("fill", "brown").style("opacity", passenger.kBoarded=="Queenstown"?1:0.5)
        passengerBoardedGroup.append("text").attr("x", 91).attr("y", 54).attr("text-anchor", "middle").text("Queenstown").style("font-size", "8px").attr("fill", "white").style("opacity", passenger.kBoarded=="Queenstown"?1:0.5)
        
        passengerClassGroup = passengerFirstColumn.append("g").attr("id", "passengerClassGroup")
        passengerClassGroup.append("text").text("Class").attr("x", 0).attr("y", 67).style("font-size", "8px")
        passengerClassGroup.append("rect").attr("x", 0).attr("y", 70).attr("width", 39).attr("height", 10).attr("id", "firstBox").attr("fill", "brown").style("opacity", passenger.kPclass=="1"?1:0.5)
        passengerClassGroup.append("text").attr("x", 20).attr("y", 78).attr("text-anchor", "middle").text("First").style("font-size", "8px").attr("fill", "white").style("opacity", passenger.kPclass=="1"?1:0.5)
        passengerClassGroup.append("rect").attr("x", 40).attr("y", 70).attr("width", 39).attr("height", 10).attr("id", "secondBox").attr("fill", "brown").style("opacity", passenger.kPclass=="2"?1:0.5)
        passengerClassGroup.append("text").attr("x", 60).attr("y", 78).attr("text-anchor", "middle").text("Second").style("font-size", "8px").attr("fill", "white").style("opacity", passenger.kPclass=="2"?1:0.5)
        passengerClassGroup.append("rect").attr("x", 80).attr("y", 70).attr("width", 39).attr("height", 10).attr("id", "thirdBox").attr("fill", "brown").style("opacity", passenger.kPclass=="3"?1:0.5)
        passengerClassGroup.append("text").attr("x", 100).attr("y", 78).attr("text-anchor", "middle").text("Third").style("font-size", "8px").attr("fill", "white").style("opacity", passenger.kPclass=="3"?1:0.5)
        
        passengerDestGroup = passengerFirstColumn.append("g").attr("id", "passengerDestGroup")
        passengerDestGroup.append("text").text("Destination").attr("x", 0).attr("y", 91).style("font-size", "8px")
        passengerDestGroup.append("rect").attr("x", 0).attr("y", 94).attr("width", 120).attr("height", 10).attr("fill", "grey")
        passengerDestination = passengerDestGroup.append("text").attr("id", "passengerDestination").attr("x", 2).attr("y", 102).attr("text-anchor", "left").text(passenger.kDestination).style("font-size", "8px").attr("fill", "white")
        const passengerDestRequiredWidth = 0.90*((Math.min(1,120/d3.select("#passengerDestination")._groups[0][0].getComputedTextLength())))
        passengerDestination.attr("transform", `scale(${passengerDestRequiredWidth},1)`)//.attr("x", 60*passengerDestRequiredWidth)

        passengerHomeGroup = passengerFirstColumn.append("g").attr("id", "passengerHomeGroup")
        passengerHomeGroup.append("text").text("Hometown").attr("x", 0).attr("y", 115).style("font-size", "8px")
        passengerHomeGroup.append("rect").attr("x", 0).attr("y", 118).attr("width", 120).attr("height", 10).attr("fill", "grey")
        passengerHome = passengerHomeGroup.append("text").attr("id", "passengerHometown").attr("x", 2).attr("y", 126).attr("text-anchor", "left").text(passenger.kHometown).style("font-size", "8px").attr("fill", "white")
        const passengerHomeRequiredWidth = 0.90*((Math.min(1,120/d3.select("#passengerHometown")._groups[0][0].getComputedTextLength())))
        passengerHome.attr("transform", `scale(${passengerHomeRequiredWidth},1)`)//.attr("x", 60*passengerDestRequiredWidth)

        let passengerSecondColumn = defaultPD.append("g").attr("id", "passengerSecondColumn").attr("transform", "translate(130,45) scale(1,1)")
        passengerSecondColumn.append("image").attr("class", "portraitImage").attr("x", 0).attr("y", 0).attr("width", 80).attr("height", 120).attr("xlink:href", ()=>(passenger.imagePresent=="Y")?"https://www.encyclopedia-titanica.org"+passenger.imageURL:"./data/images/_blank.jpg").style("opacity", 0.6)
        passengerSecondColumn.append("text").text((passenger.openmlsurvived==1)?"Survived":"Perished").attr("text-anchor", "middle").attr("x", 40).attr("y", 140).style("font-size", "18px").style("font-weight", "bold")

        // IMAGE FILE
        // passenger.derivedName  passenger.kAge
        // passenger.kBoarded     passenger.kPclass
        // passenger.kSex         passenger.kHometown
        // passenger.kDestination passenger.kTicket
        // passenger.kFare        passenger.kCabin
        // passenger.kSibSp       passenger.kParch
        // passenger.kSurvived 
                    
        return
    }

    }
)
