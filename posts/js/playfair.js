
window.onresize = () => location.reload()

const formatNumber = d3.format(",.2f")
const formatSmallNumber = d3.format(".1n")
const formatDate = d3.utcFormat("%Y-%m")

const width = 1200
const height = 800
const scaleFactor = (Math.min(1800, window.innerWidth-100) / width)
const xTranslateMe = (scaleFactor*width - width) / 2
const yTranslateMe = (scaleFactor*height - height) / 2


const svg = d3.select("#chart").append("svg").attr("width", width).attr("height", height)
svg.append("rect").attr("x", 0).attr("y", 0).attr("width", width).attr("height", height).attr("fill", "none").attr("stroke", "grey").attr("stroke-width", 2)
svg.attr("transform", `translate(${xTranslateMe}, ${yTranslateMe}) scale(${scaleFactor})`)

// Data thanks to https://gist.github.com/borgar
// wheatWages.csv
// https://gist.githubusercontent.com/borgar/0549b917908d83873c68/raw/6c69c5fcbe1cc1cb82f194c03b8a9d09c8ed7907/wheat_and_wages.csv
// monarchs.csv
// https://gist.githubusercontent.com/borgar/0549b917908d83873c68/raw/6c69c5fcbe1cc1cb82f194c03b8a9d09c8ed7907/monarchs.csv


function go() {
    const promises = [
        d3.csv("./data/wheatWages.csv"),
        d3.csv("./data/monarchs.csv")
    ]

    Promise.all(promises).then(results=>{
        const wheatWages = results[0]
        const monarchs = results[1]
        console.log(wheatWages, monarchs)

        const margin = {top: 120, right: 80, bottom: 80, left: 80}


        const xScale = d3.scaleLinear().domain([1565, 1830]).range([0 + margin.left, width - margin.right])
        const yScale = d3.scaleLinear().domain([0, 100]).range([height - margin.bottom, 0 + margin.top])

        const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d")).tickSize(0).tickPadding(10)
        const yAxis = d3.axisLeft(yScale).tickFormat(d3.format("d")).tickSize(0).tickPadding(10)

        const gradient = svg.append("defs")
            .append("linearGradient")
            .attr("id", "myGradient")
            .attr("gradientTransform", "rotate(90)") // Adjust the angle of the gradient if needed
      
        gradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "#101010") // Start color of the gradient
      
        gradient.append("stop")
            .attr("offset", "70%")
            .attr("stop-color", "#101010") // Mid color of the gradient
      
        gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "#404040") // End color of the gradient

        svg.append("g").attr("class", "xAxisLeft").attr("transform", `translate(0, ${height - margin.bottom})`).call(xAxis).style("font-size", "12px").style("font-family", "Georgia, serif")
        svg.append("g").attr("class", "yAxis").attr("transform", `translate(${margin.left}, 0)`).call(yAxis).style("font-size", "12px").style("font-family", "Georgia, serif")

        svg.append("text").attr("class", "xAxisLabel").attr("x", width/2).attr("y", height - margin.bottom/2).attr("text-anchor", "middle").text("Year").style("font-size", "12px").style("font-family", "Georgia, serif")
        svg.append("text").attr("class", "yAxisLabel").attr("x", -height/2).attr("y", margin.left/2).attr("text-anchor", "middle").attr("transform", "rotate(-90)").text("Price of the quarter of wheat in shillings").style("font-size", "14px").style("font-family", "Georgia, serif").style("font-weight", "normal")   

        const barsGroup = svg.append("g").attr("class", "barsGroup")
        const backBarsGroup = barsGroup.append("g").attr("class", "backBarsGroup")
        const backBars = backBarsGroup.selectAll("rect").data(wheatWages).enter().append("rect")
        backBars
            .attr("x", d=>xScale(d.year))
            .attr("y", d=>yScale(d.wheat))
            .attr("width", d=>(d.year!='1820')?xScale('1605')-xScale('1600'):xScale('1601')-xScale('1600'))
            .attr("height", d=>  - yScale(d.wheat) + yScale(d.wheatStop) + 0)
            .attr("fill", "#202020")
        backBars.on("mouseover", function(e,d) {
            d3.select(e.currentTarget).attr("fill", "DarkRed")
        })
        backBars.on("mouseout", function(e,d) {
            d3.select(e.currentTarget).attr("fill", "#202020")
        })

        const fadedBarsAreaGroup = barsGroup.append("g").attr("class", "fadedBarsAreaGroup")
        for (let i = 0; i < 100; i++) {
            fadedBarsAreaGroup.append("path").datum(wheatWages.concat([{year: '1830', wheat: '54', wheatStop: '44', wages: ''}])).attr("d", d3.line().x(d=>xScale(d.year))
                .y(d=>yScale(d.wheatStop)+i/5)
                .curve(d3.curveCatmullRom))
                .attr("fill", "none").attr("stroke", "white").attr("stroke-width", 40).style("opacity", ()=>0.05)
        }
               
        svg.append("rect").attr("x", margin.left).attr("y", margin.top).attr("width", width - margin.left - margin.right).attr("height", height - margin.top - margin.bottom).attr("fill", "none").attr("stroke", "black").attr("stroke-width", 3)

        const areaChartGroup = svg.append("g").attr("class", "areaChartGroup")
        const areaChart = areaChartGroup.append("path").datum(wheatWages.slice(0,wheatWages.length-2)).attr("d", d3.area().x(d=>xScale(d.year)).y0(height - margin.bottom).y1(d=>yScale(d.wages)).curve(d3.curveCatmullRom)).attr("fill", "LightBlue").style("opacity", 1)
        areaChart.on("mouseover", function(e,d) {
            d3.select(e.currentTarget).attr("fill", "DodgerBlue")
        })
        areaChart.on("mouseout", function(e,d) {
            d3.select(e.currentTarget).attr("fill", "LightBlue")
        })

        const lineChart = areaChartGroup.append("path").datum(wheatWages.slice(0,wheatWages.length-2)).attr("d", d3.line().x(d=>xScale(d.year)).y(d=>yScale(d.wages)+2).curve(d3.curveCatmullRom)).attr("fill", "none").attr("stroke", "black").attr("stroke-width", 2)
        const lineChart2 = areaChartGroup.append("path").datum(wheatWages.slice(0,wheatWages.length-2)).attr("d", d3.line().x(d=>xScale(d.year)).y(d=>yScale(d.wages)).curve(d3.curveCatmullRom)).attr("fill", "none").attr("stroke", "red").attr("stroke-width", 2)
            .attr("id", "lineChart2").attr("class", "lineChart2")

        const labelLineChart = areaChartGroup.append("text")
            .attr("transform", "translate(0, -5)")
            .append("textPath")
            .attr("xlink:href", "#lineChart2")
            .attr("startOffset", "50%")
            .attr("transform", "translate(0, -10)")
            .attr("text-anchor", "middle")
            .attr("font-size", "16px")
            .attr("font-weight", "bold")
            .text("Weekly Wages of a Good Mechanic")
            .style("pointer-events", "none")
            .attr("fill", "black")
            // .attr("stroke", "white")
            // .attr("stroke-width", 0.5)


        const gridYears = wheatWages.map(d=>d.year).concat(['1825', '1830'])
        const mainYears = ['1565','1600', '1650', '1700', '1750', '1800', '1830']
        const gridGroupVertical = svg.append("g").attr("class", "gridGroupVertical")
        const gridLinesVertical = gridGroupVertical.selectAll("line").data(gridYears).enter().append("line")
        gridLinesVertical.attr("x1", d=>xScale(d)).attr("y1", margin.top).attr("x2", d=>xScale(d)).attr("y2", height - margin.bottom).attr("stroke", d=> mainYears.includes(d) ? "black" : "black").attr("stroke-width", d=> mainYears.includes(d) ? 1 : 0.1).style("pointer-events", "none")
        const gridShillings = [0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100]
        const mainShillings = [0,10,20,30,40,50,60,70,80,90,100]
        const gridGroupHorizontal = svg.append("g").attr("class", "gridGroupHorizontal")
        const gridLinesHorizontal = gridGroupHorizontal.selectAll("line").data(gridShillings).enter().append("line")
        gridLinesHorizontal.attr("x1", margin.left).attr("y1", d=>yScale(d)).attr("x2", width - margin.right).attr("y2", d=>yScale(d)).attr("stroke",  d=> mainShillings.includes(d) ? "black" : "black").attr("stroke-width", d=> mainShillings.includes(d) ? 1 : 0.1).style("pointer-events", "none")


        const centuryGroup = svg.append("g").attr("class", "centuryGroup")
        const centuryLabelsGroup = centuryGroup.append("g").attr("class", "centuryGroupLabels")
        const fontSize = "12px"
        centuryLabelsGroup.append("text").attr("x", xScale('1565')).attr("y", margin.top-10).attr("text-anchor", "start").text("16th Century").attr("font-weight", "bold").attr("font-size", fontSize).attr("dx", 5)
        centuryLabelsGroup.append("text").attr("x", xScale('1650')).attr("y", margin.top-10).attr("text-anchor", "middle").text("17th Century").attr("font-weight", "bold").attr("font-size", fontSize)
        centuryLabelsGroup.append("text").attr("x", xScale('1750')).attr("y", margin.top-10).attr("text-anchor", "middle").text("18th Century").attr("font-weight", "bold").attr("font-size", fontSize)
        centuryLabelsGroup.append("text").attr("x", xScale('1830')).attr("y", margin.top-10).attr("text-anchor", "end").text("19th Century").attr("font-weight", "bold").attr("font-size", fontSize).attr("dx", -5)
        const centuryCurvesGroup = centuryGroup.append("g").attr("class", "centuryCurvesGroup")
        const centuryCurves = centuryCurvesGroup.append("path").attr("fill", "none").attr("stroke", "black").attr("stroke-width", 3).attr("transform", `translate(${margin.left}, ${margin.top})`)
            .attr("d", `M 0 0 L 0 -50 Q 80 -50 137 0 L 137 0 Q 300 -100 530 0 L 530 0 Q 700 -100 925 0 L 925 0 Q 980 -50 ${width - margin.left - margin.right} -50 L ${width - margin.left - margin.right} 0`  )

        const monarchGroup = svg.append("g").attr("class", "monarchGroup")
        const monarchBarsGroup = monarchGroup.append("g").attr("class", "monarchBarsGroup")
        const monarchBars = monarchBarsGroup.selectAll("rect").data(monarchs).enter().append("rect")
            .attr("x", d=>xScale(d.start)).attr("y", (d,i)=>margin.top+10+12*(i%2)).attr("width", d=>xScale(d.end) - xScale(d.start))
            .attr("height", 10).attr("fill", "black")
        const monarchBarLabels = monarchBarsGroup.selectAll("text").data(monarchs).enter().append("text")
            .attr("x", d=>xScale(d.start)).attr("y", (d,i)=>margin.top+10+12*(i%2)).attr("text-anchor", "start").text(d=>d.name).attr("font-size", "10px").attr("dx", 5).attr("dy", 19).attr("font-weight", "bold").attr("fill", "black")


        const mainLabelGroup = svg.append("g").attr("class", "mainLabelGroup")
        const mainLabelEllipse = mainLabelGroup.append("ellipse").attr("cx", xScale('1650')).attr("cy", yScale(69)).attr("rx", 160).attr("ry", 85).attr("fill", "white").attr("stroke", "black").attr("stroke-width", 2)
        const mainLabel = mainLabelGroup.append("text").attr("x", xScale('1650')).attr("y", yScale(78)).attr("text-anchor", "middle").text("CHART").attr("font-weight", "bold").attr("font-size", "28px").attr("fill", "black")
        const mainLabel2 = mainLabelGroup.append("text").attr("x", xScale('1650')).attr("y", yScale(73)).attr("text-anchor", "middle").text("Shewing at one view").attr("font-weight", "bold").attr("font-size", "18px").attr("fill", "black").attr("font-style", "italic")
        const mainLabel3 = mainLabelGroup.append("text").attr("x", xScale('1650')).attr("y", yScale(70)).attr("text-anchor", "middle").text("The Price of The Quarter of Wheat").attr("font-weight", "bold").attr("font-size", "15px").attr("fill", "black").attr("font-style", "italic")
        const mainLabel4 = mainLabelGroup.append("text").attr("x", xScale('1650')).attr("y", yScale(67)).attr("text-anchor", "middle").text("& the Wages of Labour by the Week").attr("font-weight", "bold").attr("font-size", "15px").attr("fill", "black").attr("font-style", "italic")
        const mainLabel5 = mainLabelGroup.append("text").attr("x", xScale('1650')).attr("y", yScale(64.5)).attr("text-anchor", "middle").text("from").attr("font-weight", "bold").attr("font-size", "10px").attr("fill", "black").attr("font-style", "italic")
        const mainLabel6 = mainLabelGroup.append("text").attr("x", xScale('1650')).attr("y", yScale(62)).attr("text-anchor", "middle").text("the Year 1565 to 1821").attr("font-weight", "bold").attr("font-size", "15px").attr("fill", "black").attr("font-style", "italic")
        const mainLabel7 = mainLabelGroup.append("text").attr("x", xScale('1650')).attr("y", yScale(59.5)).attr("text-anchor", "middle").text("by").attr("font-weight", "bold").attr("font-size", "10px").attr("fill", "black").attr("font-style", "italic")
        const mainLabel8 = mainLabelGroup.append("text").attr("x", xScale('1650')).attr("y", yScale(57)).attr("text-anchor", "middle").text("WILLIAM PLAYFAIR").attr("font-weight", "bold").attr("font-size", "12px").attr("fill", "black").attr("font-style", "normal")


    })

}

go()
