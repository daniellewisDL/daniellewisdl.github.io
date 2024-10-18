
window.onresize = () => location.reload()

const dropDownVariableNames =
    ['Total exposures indicator', 
    'Intra-financial system assets indicator', 
    'Intra-financial system liabilities indicator', 
    'Securities outstanding indicator', 
    'Total payments indicator', 
    'Assets under custody indicator', 
    'Underwriting activity indicator', 
    'Notional amount of OTC derivatives indicator', 
    'Trading and AFS securities indicator', 
    'Level 3 assets indicator', 
    'Cross-jurisdictional claims indicator', 
    'Cross-jurisdictional liabilities indicator', 
    ]
const shortCodes = ['tei', 'isai', 'isli', 'soi', 'tpi', 'auci', 'uai', 'notcd', 'tasi', 'l3ai', 'cjci', 'cjli']

const variableMap = [{longCode: 'Total exposures indicator', shortCode: 'tei'},
                    {longCode: 'Intra-financial system assets indicator', shortCode: 'isai'},
                    {longCode: 'Intra-financial system liabilities indicator', shortCode: 'isli'},
                    {longCode: 'Securities outstanding indicator', shortCode: 'soi'},
                    {longCode: 'Total payments indicator', shortCode: 'tpi'},
                    {longCode: 'Assets under custody indicator', shortCode: 'auci'},
                    {longCode: 'Underwriting activity indicator', shortCode: 'uai'},
                    {longCode: 'Notional amount of OTC derivatives indicator', shortCode: 'notcd'},
                    {longCode: 'Trading and AFS securities indicator', shortCode: 'tasi'},
                    {longCode: 'Level 3 assets indicator', shortCode: 'l3ai'},
                    {longCode: 'Cross-jurisdictional claims indicator', shortCode: 'cjci'},
                    {longCode: 'Cross-jurisdictional liabilities indicator', shortCode: 'cjli'},
                    ]

const countryList = ['All countries', 'Australia', 'Brazil', 'Canada', 'China', 'Denmark', 'Finland', 'France', 'Germany', 
                     'India', 'Italy', 'Japan', 'Korea', 'Netherlands', 'Norway', 'Russia', 'Singapore', 
                     'Spain', 'Sweden', 'Switzerland', 'United Kingdom', 'USA']

let dropDown1 = d3.select("#dropdown_1")
let options1 = dropDown1.selectAll("option").data(dropDownVariableNames).enter().append("option")
options1.text(d => d).attr("value", d => d)

let dropDown2 = d3.select("#dropdown_2")
let options2 = dropDown2.selectAll("option").data([4,8,12,16,24,32,64]).enter().append("option")
options2.text(d => d).attr("value", d => d)
d3.select("#dropdown_2").node().value = 16

const formatNumber = d3.format(",.2f")
const formatSmallNumber = d3.format(".1n")
const formatDate = d3.utcFormat("%Y-%m")

const width = 1800
const height = 800
const scaleFactor = (Math.min(2200, window.innerWidth-50) / width)
const yTranslateMe = (scaleFactor*height - height) / 2
const xTranslateMe = (scaleFactor*width - width) / 2

// Color schemes from: https://observablehq.com/@jotasolano/paul-tol-schemes

const tol_bright = ["#4477AA","#EE6677","#228833","#CCBB44","#66CCEE","#AA3377"]
const tol_highContrast = ["#004488","#DDAA33","#BB5566"]
const tol_vibrant = ["#EE7733","#0077BB","#33BBEE","#EE3377","#CC3311","#009988"]
const tol_muted = ["#CC6677","#332288","#DDCC77","#117733","#88CCEE","#882255","#44AA99","#999933","#AA4499"]
const tol_light = ["#77AADD","#EE8866","#EEDD88","#FFAABB","#99DDFF","#44BB99","#BBCC33","#AAAA00"]

let tols = shuffle(tol_bright.concat(tol_highContrast, tol_vibrant, tol_muted, tol_light))

function shuffle(list) {
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = list[i];
      list[i] = list[j];
      list[j] = temp;
    }
    return list;
  }

let colorCountries = d3.scaleOrdinal(tols)

const svg = d3.select("#chart").append("svg").attr("width", width).attr("height", height)
svg.append("rect").attr("x", 0).attr("y", 0).attr("width", width).attr("height", height).attr("fill", "none").attr("stroke", "grey").attr("stroke-width", 2)
svg.attr("transform", `translate(${xTranslateMe}, ${yTranslateMe}) scale(${scaleFactor})`)

let gsibsData = []

function go() {
    d3.csv("./data/gsibs.csv").then(data => {

        resetGsibsData()
        
        function processData(item) {
            item.name = item.name
            item.countryCode = item.countryCode
            item.countryName = item.countryName
            item.year = +item.year
            item.tei = +item.tei
            item.isai = +item.isai
            item.isli = +item.isli
            item.soi = +item.soi
            item.tpi = +item.tpi
            item.auci = +item.auci
            item.uai = +item.uai
            item.notcd = +item.notcd
            item.tasi = +item.tasi
            item.l3ai = +item.l3ai
            item.cjci = +item.cjci
            item.cjli = +item.cjli

            return item
        }

        let setOfNames = new Set(gsibsData.map(d => d.name))
        

        const sidebarTopWidth = 400
        // const sidebarTopHeight = 500
        const sidebarTopMargin = 20
        // const sidebarTop = svg.append("g").attr("id", "sidebar").style("opacity", 1).attr("transform", `translate(${width - sidebarTopMargin - sidebarTopWidth}, ${sidebarTopMargin})`)
        // sidebarTop.append("rect").attr("x", 0).attr("y", 0).attr("width", sidebarTopWidth).attr("height", sidebarTopHeight).attr("fill", "none").attr("stroke", "grey").attr("stroke-width", 1)

        // const sidebarBottomWidth = 400
        // const sidebarBottomHeight = 240
        // const sidebarBottom = svg.append("g").attr("id", "key").style("opacity", 1).attr("transform", `translate(${width - sidebarTopMargin - sidebarBottomWidth}, ${sidebarTopMargin + sidebarTopHeight + sidebarTopMargin})`)
        // sidebarBottom.append("rect").attr("x", 0).attr("y", 0).attr("width", sidebarBottomWidth).attr("height", sidebarBottomHeight).attr("fill", "none").attr("stroke", "grey").attr("stroke-width", 1)

        const mainChartAreaWidth = width - sidebarTopMargin - sidebarTopMargin
        const mainChartAreaHeight = height - sidebarTopMargin - sidebarTopMargin
        const mainChartArea = svg.append("g").attr("id", "mainChartArea").style("opacity", 1).attr("transform", `translate(${sidebarTopMargin}, ${sidebarTopMargin})`)
        mainChartArea.append("rect").attr("x", 0).attr("y", 0).attr("width", mainChartAreaWidth).attr("height", mainChartAreaHeight).attr("fill", "none").attr("stroke", "grey").attr("stroke-width", 1)

        let selectedIndicator = d3.select("#dropdown_1").node().value
        let selectedIndicatorShort = variableMap.filter(d => d.longCode == selectedIndicator)[0].shortCode

        let selectedNumberOfRacers = d3.select("#dropdown_2").node().value

        const numberOfKeyframes = 100
        let numberOfRacers = 16
        const transitionDuration = 10
        const barPadding = 5

        let barSize = (mainChartAreaHeight-sidebarTopMargin*2 - barPadding) / (numberOfRacers)

        const x = d3.scaleLinear().range([50, mainChartAreaWidth - 100])
        let y = d3.scaleBand().domain(d3.range(numberOfRacers))
                    .rangeRound([sidebarTopMargin, sidebarTopMargin + barSize*(numberOfRacers+0.1) ]).padding(0.1)

        d3.select("#dropdown_1").on("change", restartRace)
        d3.select("#dropdown_2").on("change", restartRace)
        d3.select("#replay_button").on("click", restartRace)

        function populateSidebarTop(d) {
            const header = sidebar.append("g").attr("id", "header").attr("transform", `translate(20, 50)`)
            header.append("text").text("GSIBs").attr("font-size", 40).attr("font-weight", "bold").attr("fill", "grey")
        }

        function populateSidebarBottom(d) {
            const header = sidebar.append("g").attr("id", "header").attr("transform", `translate(20, 50)`)
            header.append("text").text("GSIBs").attr("font-size", 40).attr("font-weight", "bold").attr("fill", "grey")
        }

        function resetGsibsData() {
            gsibsData = []
            data.forEach(row=>{
                gsibsData.push(processData(row))
            })
        }

        async function restartRace() {
            resetGsibsData()
            console.log(gsibsData)
            numberOfRacers = d3.select("#dropdown_2").node().value

            barSize = (mainChartAreaHeight-sidebarTopMargin*2 - barPadding) / (numberOfRacers)
            y = d3.scaleBand().domain(d3.range(numberOfRacers+1))
              .range([sidebarTopMargin, sidebarTopMargin + barSize*(numberOfRacers+0.1) ]).padding(0.1)

            tols = shuffle(tol_bright.concat(tol_highContrast, tol_vibrant, tol_muted, tol_light))
            colorCountries = d3.scaleOrdinal(tols)

            mainChartArea.selectAll("g").remove()
            mainChartArea.selectAll("text").remove()

            selectedIndicator = d3.select("#dropdown_1").node().value
            selectedIndicatorShort = variableMap.filter(d => d.longCode == selectedIndicator)[0].shortCode
            let columnsToDrop = shortCodes.filter(item => item !== selectedIndicatorShort)
            let filteredData = dropColumns(gsibsData, columnsToDrop)
            
            filteredData = renameColumn(filteredData, selectedIndicatorShort, "value")
            dateValues = Array.from(d3.rollup(filteredData, ([d]) => +d.value, d => +d.year, d => d.name))
                                .map(([year, gsibsData]) => [new Date(year, 11, 31), gsibsData])
                                .sort(([a], [b]) => d3.ascending(a, b))

            let keyframes0 = keyframes()

            let nameframes = d3.groups(keyframes0.flatMap(([, dateValues]) => dateValues), d => d.name)
            let prev = new Map(nameframes.flatMap(([, dateValues]) => d3.pairs(dateValues, (a, b) => [b, a])))
            let next = new Map(nameframes.flatMap(([, dateValues]) => d3.pairs(dateValues)))
            

            function keyframes() {
                const keyframes = []
                let ka, a, kb, b
                for ([[ka, a], [kb, b]] of d3.pairs(dateValues)) {
                    for (let i = 0; i < numberOfKeyframes; ++i) {
                        const t = i / numberOfKeyframes
                        keyframes.push([
                            new Date(ka * (1 - t) + kb * t),
                            rank(name => (a.get(name) || 0) * (1 - t) + (b.get(name) || 0) * t)
                        ])
                    }
                }
                keyframes.push([new Date(kb), rank(name => b.get(name) || 0)])
                return keyframes
            }

            let dataForSVGElements = generateList(numberOfRacers)

            let myBarsGroup = mainChartArea.append("g").attr("id", "myBars")
            let myBars = myBarsGroup.selectAll("rect").data(dataForSVGElements).enter()
                            .append("rect").attr("x", x(0)).attr("y", d=>y(d))
                            .attr("width", 10).attr("height", barSize*.9).attr("fill", "grey").style("opacity", .6)
            
            const myAxis = mainChartArea.append("g").attr("id", "myAxis").attr("transform", `translate(0, ${20})`)
            let myAxisX = d3.axisTop(x).ticks((mainChartAreaWidth-sidebarTopMargin*2) / 200).tickSizeOuter(0).tickSizeInner(-mainChartAreaHeight-sidebarTopMargin*3)

            let myLabelsGroup = mainChartArea.append("g").attr("id", "myLabels")
            let myLabels = myLabelsGroup.selectAll("text").data(dataForSVGElements).enter()
                            .append("text").attr("x", 10).attr("y", d=>y(d)+barSize/2-8)
                            .text(d=>d).attr("font-size", 16).attr("fill", "black").attr("font-weight", "normal").attr("text-anchor", "end")
            let myValuesGroup = mainChartArea.append("g").attr("id", "myValues")
            let myValues = myValuesGroup.selectAll("text").data(dataForSVGElements).enter()
                            .append("text").attr("x", 10).attr("y", d=>(y(d)+barSize/2+10))
                            .text(d=>d).attr("font-size", 12).attr("fill", "black").attr("font-weight", "normal").attr("text-anchor", "end")
            
            let myTickerGroup = mainChartArea.append("g").attr("id", "myTicker").attr("transform", `translate(${mainChartAreaWidth-50}, ${mainChartAreaHeight-50})`)
            let myTickerText = myTickerGroup.append("text").attr("font-size", 90).attr("font-weight", "bold").attr("fill", "grey").attr("text-anchor", "end").text("2013-01")

            for (const keyframe of keyframes0) {
                const transition = svg.transition().duration(transitionDuration).ease(d3.easeLinear)

                x.domain([0, keyframe[1][0].value])

                myBars.attr("fill", d=>colorCountries(keyframe[1][d].name.slice(keyframe[1][d].name.indexOf("(") + 1, keyframe[1][d].name.indexOf(")"))))
                myBars.transition(transition).attr("width", d=>x(keyframe[1][d].value)-x(0))
                        .attr("y", d=>{
                            // console.log(keyframe[1][d].name)
                            return y(d)
                        })

                myAxis.transition(transition).call(myAxisX)
                myAxis.selectAll(".tick line").attr("stroke", "white")
                myAxis.selectAll(".tick").style("font-family", "'Courier New', Courier, monospace;")
                myAxis.select(".domain").remove()

                myLabels.transition(transition)
                        .text(d=>{
                            let valueLabel = "EUR " + ((keyframe[1][d].value > 1000000000000) ? (formatNumber((keyframe[1][d].value)/1000000000000) + " tn") : (formatNumber((keyframe[1][d].value)/1000000000) + " bn") )
                            if (numberOfRacers > 20) {return keyframe[1][d].name + " " + valueLabel}
                            return keyframe[1][d].name
                        })
                        .attr("x", d=>{
                            return (x(keyframe[1][d].value)<400) ? x(keyframe[1][d].value)+5 : x(keyframe[1][d].value)-5
                        })
                        .attr("y", d=>(numberOfRacers>20)?y(d)+barSize/2+2.5:y(d)+barSize/2-4)
                        .attr("text-anchor", d=>{
                            return (x(keyframe[1][d].value)<400) ? "start" : "end"
                        })
                        .attr("font-size", ()=>(numberOfRacers>20)?10:16)

                myValues.transition(transition)
                        .text(d=> {
                          if (numberOfRacers > 20) {return ""}
                          else if (keyframe[1][d].value > 1000000000000) {return "EUR " + formatNumber((keyframe[1][d].value)/1000000000000) + " tn"}
                          else {return "EUR " + formatNumber((keyframe[1][d].value)/1000000000) + " bn"}
                        })
                        .attr("x", d=>{
                          return (x(keyframe[1][d].value)<400) ? x(keyframe[1][d].value)+10 : x(keyframe[1][d].value)-15
                        })
                        .attr("y", d=>{
                          return (y(d)+barSize/2+10)
                        })
                        .attr("text-anchor", d=>{
                          return (x(keyframe[1][d].value)<400) ? "start" : "end"
                        })


                
                myTickerText.transition(transition).text(formatDate(keyframe[0]))

                await transition.end()

            }

        }

        function rank(value) {
            const data = Array.from(setOfNames, name => ({name, value: value(name)}))
            data.sort((a, b) => d3.descending(a.value, b.value))
            for (let i = 0; i < data.length; ++i) data[i].rank = Math.min(setOfNames.size, i)
            return data
        }


        function generateList(n) {
            const list = [];
            for (let i = 0; i < n; i++) {
              list.push(i);
            }
            return list;
          }

        function getUniqueValues(jsonList, fieldName) {
            const uniqueValues = new Set();
            for (const jsonObject of jsonList) {
              uniqueValues.add(jsonObject[fieldName]);
            }
            return [...uniqueValues].sort();
          }
        
        function dropColumns(objects, columns) {
            return objects.map(obj => {
              let newObj = {};
              for (let key in obj) {
                if (!columns.includes(key)) {
                  newObj[key] = obj[key];
                }
              }
              return newObj;
            });
        }
        
        function renameColumn(objects, oldColumnName, newColumnName) {
            return objects.map(obj => {
              if (obj.hasOwnProperty(oldColumnName)) {
                obj[newColumnName] = obj[oldColumnName];
                delete obj[oldColumnName];
              }
              return obj;
            });
        }

        restartRace()

    })
        

}

go()
