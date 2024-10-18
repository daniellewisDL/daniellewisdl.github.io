
window.onresize = () => location.reload()

const formatNumber = d3.format(",.2f")
const formatSmallNumber = d3.format(".1n")
const formatDate = d3.utcFormat("%Y-%m")

const playfairWikiLink = "https://commons.wikimedia.org/wiki/File:Chart_Showing_at_One_View_the_Price_of_the_Quarter_of_Wheat,_and_Wages_of_Labour_by_the_Week,_from_1565_to_1821.png"

const width = 1200
const height = 800
const scaleFactor = Math.min((window.innerWidth-50)/width, (window.innerHeight-50)/height)
const xTranslateMe = (scaleFactor*width - width) / 2
const yTranslateMe = (scaleFactor*height - height) / 2

const svg = d3.select("#chart").append("svg").attr("width", width).attr("height", height)
    .attr("transform", `translate(${xTranslateMe}, ${yTranslateMe}) scale(${scaleFactor}, ${scaleFactor})`)
svg.append("rect").attr("x", 0).attr("y", 0).attr("width", width).attr("height", height).attr("fill", "none").attr("stroke", "grey").attr("stroke-width", 2)


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

        wheatWages.forEach(d=>{
            d.year = +d.year
            d.wheat = +d.wheat
            d.wheatStop = +d.wheatStop
            d.wages = +d.wages
            d.weeks = (+d.wages==0) ? 0 : +d.wheat / +d.wages
        })

        const margin = {top: 120, right: 80, bottom: 80, left: 80}
        const maxWheat = d3.max(wheatWages, d=>d.wheat)
        const maxWages = d3.max(wheatWages, d=>d.wages)
        const maxWeeks = d3.max(wheatWages, d=>d.weeks)

        const xScale = d3.scaleLinear().domain([1565, 1830]).range([0 + margin.left, width - margin.right])
        const inverseXScale = d3.scaleLinear().domain(xScale.range()).range(xScale.domain())
        const yScale = d3.scaleLinear().domain([0, 100]).range([height - margin.bottom, 0 + margin.top])

        const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d")).tickSize(0).tickPadding(10)
        const yAxis = d3.axisLeft(yScale).tickFormat(d3.format("d")).tickSize(0).tickPadding(10)
        const yAxis2 = d3.axisRight(yScale).tickFormat(d3.format("d")).tickSize(0).tickPadding(10)

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
        svg.append("g").attr("class", "yAxis2").attr("transform", `translate(${width - margin.right}, 0)`).call(yAxis2).style("font-size", "12px").style("font-family", "Georgia, serif")

        svg.append("text").attr("class", "xAxisLabel").attr("x", width/2).attr("y", height - margin.bottom/2).attr("text-anchor", "middle").text("Year").style("font-size", "12px").style("font-family", "Georgia, serif")
        svg.append("text").attr("class", "yAxisLabel").attr("x", -height/2).attr("y", width - margin.right + 50).attr("text-anchor", "middle").attr("transform", "rotate(-90)").text("Price of The Quarter of Wheat in Shillings").style("font-size", "18px").style("font-family", "Georgia, serif").style("font-weight", "bold").style("font-style", "italic")

        const barsGroup = svg.append("g").attr("class", "barsGroup")
        const backBarsGroup = barsGroup.append("g").attr("class", "backBarsGroup")
        const backBars = backBarsGroup.selectAll("rect").data(wheatWages).enter().append("rect")
        backBars
            .attr("x", d=>xScale(d.year))
            .attr("y", d=>yScale(d.wheat))
            .attr("width", d=>(d.year!=1820)?xScale(1605)-xScale(1600):xScale(1601)-xScale(1600))
            .attr("height", d=>  - yScale(d.wheat) + yScale(d.wheatStop) + 0)
            .attr("fill", "#202020")
        backBars.on("mouseover", function(e,d) {
            d3.select(e.currentTarget).attr("fill", "DarkRed")
            showTooltip(e, d)
        })
        backBars.on("mousemove", function(e,d) {
            showTooltip(e, d)
        })
        backBars.on("mouseout", function(e,d) {
            d3.select(e.currentTarget).attr("fill", "#202020")
            hideTooltip()
        })

        const fadedBarsAreaGroup = barsGroup.append("g").attr("class", "fadedBarsAreaGroup")
        for (let i = 0; i < 100; i++) {
            fadedBarsAreaGroup.append("path").datum(wheatWages.concat([{year: 1830, wheat: 54, wheatStop: 44, wages: ''}])).attr("d", d3.line().x(d=>xScale(d.year))
                .y(d=>yScale(d.wheatStop)+i/5)
                .curve(d3.curveCatmullRom))
                .attr("fill", "none").attr("stroke", "white").attr("stroke-width", 40).style("opacity", ()=>0.05)
        }
               
        
        const areaChartGroup = svg.append("g").attr("class", "areaChartGroup")
        const areaChart = areaChartGroup.append("path").datum(wheatWages.slice(0,wheatWages.length-2)).attr("d", d3.area().x(d=>xScale(d.year)).y0(height - margin.bottom).y1(d=>yScale(d.wages)).curve(d3.curveCatmullRom)).attr("fill", "LightBlue").style("opacity", 1)
        areaChart.on("mouseover", function(e,d) {
            d3.select(e.currentTarget).attr("fill", "DodgerBlue")
            showTooltip(e, d)
        })
        
        areaChart.on("mousemove", function(e,d) {
            showTooltip(e, d)
        })
        
        areaChart.on("mouseout", function(e,d) {
            d3.select(e.currentTarget).attr("fill", "LightBlue")
            hideTooltip()
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
            
        
        svg.append("rect").attr("x", margin.left).attr("y", margin.top).attr("width", width - margin.left - margin.right).attr("height", height - margin.top - margin.bottom).attr("fill", "none").attr("stroke", "black").attr("stroke-width", 3)

        const gridYears = wheatWages.map(d=>d.year).concat([1825, 1830])
        const mainYears = [1565,1600,1650,1700,1750,1800,1830]
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
        centuryLabelsGroup.append("text").attr("x", xScale(1565)).attr("y", margin.top-10).attr("text-anchor", "start").text("16th Century").attr("font-weight", "bold").attr("font-size", fontSize).attr("dx", 5)
        centuryLabelsGroup.append("text").attr("x", xScale(1650)).attr("y", margin.top-10).attr("text-anchor", "middle").text("17th Century").attr("font-weight", "bold").attr("font-size", fontSize)
        centuryLabelsGroup.append("text").attr("x", xScale(1750)).attr("y", margin.top-10).attr("text-anchor", "middle").text("18th Century").attr("font-weight", "bold").attr("font-size", fontSize)
        centuryLabelsGroup.append("text").attr("x", xScale(1830)).attr("y", margin.top-10).attr("text-anchor", "end").text("19th Century").attr("font-weight", "bold").attr("font-size", fontSize).attr("dx", -5)
        const centuryCurvesGroup = centuryGroup.append("g").attr("class", "centuryCurvesGroup")
        const centuryCurves = centuryCurvesGroup.append("path").attr("fill", "none").attr("stroke", "black").attr("stroke-width", 3).attr("transform", `translate(${margin.left}, ${margin.top})`)
            .attr("d", `M 0 0 L 0 -50 Q 80 -50 137 0 L 137 0 Q 333 -100 530 0 L 530 0 Q 728 -100 925 0 L 925 0 Q 980 -50 ${width - margin.left - margin.right} -50 L ${width - margin.left - margin.right} 0`  )

        const monarchGroup = svg.append("g").attr("class", "monarchGroup")
        const monarchBarsGroup = monarchGroup.append("g").attr("class", "monarchBarsGroup")
        const monarchBars = monarchBarsGroup.selectAll("rect").data(monarchs).enter().append("rect")
            .attr("x", d=>xScale(d.start)).attr("y", (d,i)=>margin.top+20+12*(i%2)).attr("width", d=>xScale(d.end) - xScale(d.start))
            .attr("height", 10).attr("fill", "black")
            .on("mouseover", (e,d) => {
                e.currentTarget.style.fill = "red"
                showTooltip(e, d)
            })
            .on("mousemove", (e,d) => {
                showTooltip(e, d)
            })
            .on("mouseout", (e,d) => {
                e.currentTarget.style.fill = "black"
                hideTooltip()
            })
        const monarchBarLabels = monarchBarsGroup.selectAll("text").data(monarchs).enter().append("text")
            .attr("x", d=>(d.name == "George IV") ? xScale(d.start)-20 : xScale(d.start)-3)
            .attr("y", (d,i)=>margin.top+20+15*(i%2)-24*((i+1)%2)).attr("text-anchor", "start").text(d=>d.name).attr("font-size", "10px").attr("dx", 5).attr("dy", 19).attr("font-weight", "bold").attr("fill", "black")


        const toolTipGroup = svg.append("g").attr("class", "toolTipGroup").attr("transform", `translate(${margin.left + 550}, ${margin.top + 100})`).style("opacity", 0)
        const toolTipLine = toolTipGroup.append("line").attr("x1", -550).attr("y1", -99).attr("x2", -550).attr("y2", -99-margin.top+height-margin.bottom).attr("stroke", "red").attr("stroke-width", 1).attr("stroke-dasharray", "5,5").style("pointer-events", "none")
        const toolTipRect = toolTipGroup.append("rect").attr("x", 0).attr("y", 0).attr("width", 300).attr("height", 170).attr("fill", "white").attr("stroke", "black").attr("stroke-width", 2)
        
        function showTooltip(e, d) {
            
            const mouseX = Math.min(d3.pointer(e)[0],width-margin.right-20)

            const mouseXwithinGraph = mouseX - margin.left - 550
            const yearRaw = Math.floor(inverseXScale(mouseX))
            const yearRoundedDown = (yearRaw%10) < 5 ? yearRaw - (yearRaw%10) : yearRaw - (yearRaw%10) + 5

            const thiswheatWages = wheatWages.filter(d=>d.year === yearRoundedDown)[0]
            const theMonarchStart = monarchs.filter(d=>d.start <= yearRoundedDown && d.end >= yearRoundedDown)[0]
            const theMonarchEnd = monarchs.filter(d=>d.start <= yearRoundedDown+5 && d.end >= yearRoundedDown+5)[0]
            const theMonarch = (theMonarchEnd.name == "W&M" && theMonarchStart.name == "Charles II") ? "Charles II, James II, W&M" :
                                theMonarchStart.name === theMonarchEnd.name ? theMonarchStart.name : theMonarchStart.name + ", " + theMonarchEnd.name

            const weeksToWork = thiswheatWages.wheat/thiswheatWages.wages
            const weeksToWorkRounded = Math.round(weeksToWork*10)/10

            toolTipGroup.style("opacity", 1)
            toolTipGroup.selectAll("g").remove()
            
            const toolTipText = toolTipGroup.append("g").attr("class", "toolTipText")

            const yearsGroup = toolTipText.append("g").attr("class", "yearsGroup")
            yearsGroup.append("text").attr("x", 90).attr("y", 35).attr("font-weight", "bold").attr("font-size", "36px").attr("fill", "black").attr("text-anchor", "middle").text(yearRoundedDown)
            yearsGroup.append("text").attr("x", 150).attr("y", 35).attr("font-weight", "bold").attr("font-size", "15px").attr("fill", "black").attr("text-anchor", "middle").text("to")
            yearsGroup.append("text").attr("x", 210).attr("y", 35).attr("font-weight", "bold").attr("font-size", "36px").attr("fill", "black").attr("text-anchor", "middle").text(yearRoundedDown+5)

            const monarchGroup = toolTipText.append("g").attr("class", "monarchGroup")
            monarchGroup.append("text").attr("x", 150).attr("y", 60).attr("font-weight", "bold").attr("font-size", "14px").attr("fill", "DarkRed").attr("text-anchor", "middle").text(theMonarch)

            const wheatGroup = toolTipText.append("g").attr("class", "wheatGroup").attr("transform", `translate(10, 75)`)

            wheatGroup.append("rect").attr("x", 0).attr("y", 42).attr("width", 80).attr("height", 15).attr("fill", "LightGrey")
            wheatGroup.append("rect").attr("x", 0).attr("y", 42).attr("width", 80 * thiswheatWages.wheat / maxWheat).attr("height", 15).attr("fill", "#303030").attr("stroke", "black").attr("stroke-width", 1)
            wheatGroup.append("rect").attr("x", 0).attr("y", 42).attr("width", 80).attr("height", 15).attr("fill", "none").attr("stroke", "black").attr("stroke-width", 1)

            wheatGroup.append("text").attr("x", 55).attr("y", 30).attr("font-weight", "bold").attr("font-size", "36px").attr("fill", "black").attr("text-anchor", "end").text(Math.floor(thiswheatWages.wheat))
            const penniesToAdd = (Math.floor((thiswheatWages.wheat - Math.floor(thiswheatWages.wheat))*12) == 0) ? "" : Math.floor((thiswheatWages.wheat - Math.floor(thiswheatWages.wheat))*12)
            wheatGroup.append("text").attr("x", 55).attr("y", 22).attr("font-weight", "bold").attr("font-size", "15px").attr("fill", "black").attr("text-anchor", "start").text("/" + penniesToAdd)
            wheatGroup.append("text").attr("x", 40).attr("y", 70).attr("font-weight", "bold").attr("font-size", "10px").attr("fill", "black").attr("text-anchor", "middle").text("Wheat price")
            

            if (yearRoundedDown < 1810) {
                const wagesGroup = toolTipText.append("g").attr("class", "wagesGroup").attr("transform", `translate(110, 75)`)

                wagesGroup.append("rect").attr("x", 0).attr("y", 42).attr("width", 80).attr("height", 15).attr("fill", "LightGrey")
                wagesGroup.append("rect").attr("x", 0).attr("y", 42).attr("width", 80 * thiswheatWages.wages / maxWages).attr("height", 15).attr("fill", "LightBlue").attr("stroke", "black").attr("stroke-width", 1)
                wagesGroup.append("rect").attr("x", 0).attr("y", 42).attr("width", 80).attr("height", 15).attr("fill", "none").attr("stroke", "black").attr("stroke-width", 1)

                wagesGroup.append("text").attr("x", 45).attr("y", 30).attr("font-weight", "bold").attr("font-size", "36px").attr("fill", "black").attr("text-anchor", "end").text(Math.floor(thiswheatWages.wages))
                const penniesToAdd = (Math.floor((thiswheatWages.wages - Math.floor(thiswheatWages.wages))*12) == 0) ? "" : Math.floor((thiswheatWages.wages - Math.floor(thiswheatWages.wages))*12)
                wagesGroup.append("text").attr("x", 45).attr("y", 22).attr("font-weight", "bold").attr("font-size", "15px").attr("fill", "black").attr("text-anchor", "start").text("/" + penniesToAdd)
                wagesGroup.append("text").attr("x", 40).attr("y", 70).attr("font-weight", "bold").attr("font-size", "10px").attr("fill", "black").attr("text-anchor", "middle").text("Wages")

                const timeGroup = toolTipText.append("g").attr("class", "timeGroup").attr("transform", `translate(210, 75)`)

                timeGroup.append("rect").attr("x", 0).attr("y", 42).attr("width", 80).attr("height", 15).attr("fill", "LightGrey")
                timeGroup.append("rect").attr("x", 0).attr("y", 42).attr("width", 80 * weeksToWorkRounded / maxWeeks).attr("height", 15).attr("fill", "DarkRed").attr("stroke", "black").attr("stroke-width", 1)
                timeGroup.append("rect").attr("x", 0).attr("y", 42).attr("width", 80).attr("height", 15).attr("fill", "none").attr("stroke", "black").attr("stroke-width", 1)

                timeGroup.append("text").attr("x", 40).attr("y", 30).attr("font-weight", "bold").attr("font-size", "36px").attr("fill", "black").attr("text-anchor", "middle").text(weeksToWorkRounded)
                timeGroup.append("text").attr("x", 40).attr("y", 70).attr("font-weight", "bold").attr("font-size", "10px").attr("fill", "black").attr("text-anchor", "middle").text("Weeks' work")
                timeGroup.append("text").attr("x", 40).attr("y", 80).attr("font-weight", "bold").attr("font-size", "10px").attr("fill", "black").attr("text-anchor", "middle").text("for ¼ of Wheat")
            }

            toolTipLine.attr("x1", mouseXwithinGraph).attr("x2", mouseXwithinGraph)
            

        }

        function hideTooltip() {
            toolTipGroup.style("opacity", 0)
        }
    
        const whiffle = "M 10 -5 C 17 -6 19 -3 2 0 C 2 0 2 0 2 0 C 3 1 26 -5 10 -6 Z"
        const mainLabelGroup = svg.append("g").attr("class", "mainLabelGroup")
        mainLabelGroup.append("ellipse").attr("cx", xScale(1650)).attr("cy", yScale(69)).attr("rx", 160).attr("ry", 85).attr("fill", "white").attr("stroke", "black").attr("stroke-width", 2)
        const chartLink = mainLabelGroup.append("a").attr("href", playfairWikiLink).attr("target", "_blank")
        chartLink.append("text").attr("x", xScale(1650)).attr("y", yScale(77)).attr("text-anchor", "middle").text("CHART").attr("font-weight", "bold").attr("font-size", "28px").attr("fill", "DarkBlue")
        mainLabelGroup.append("path").attr("d", whiffle).attr("transform", `translate(${xScale(1650)}, ${yScale(76)}) scale(7,2)`).attr("fill", "DarkBlue")
        mainLabelGroup.append("path").attr("d", whiffle).attr("transform", `translate(${xScale(1650)}, ${yScale(76)}) scale(-7,2)`).attr("fill", "DarkBlue")
        mainLabelGroup.append("path").attr("d", whiffle).attr("transform", `translate(${xScale(1650)}, ${yScale(76)}) scale(6,3)`).attr("fill", "DarkBlue")
        mainLabelGroup.append("path").attr("d", whiffle).attr("transform", `translate(${xScale(1650)}, ${yScale(76)}) scale(-6,3)`).attr("fill", "DarkBlue")
        mainLabelGroup.append("text").attr("x", xScale(1650)).attr("y", yScale(73)).attr("text-anchor", "middle").text("Shewing at one view").attr("font-weight", "bold").attr("font-size", "18px").attr("fill", "black").attr("font-style", "italic")
        mainLabelGroup.append("text").attr("x", xScale(1650)).attr("y", yScale(70)).attr("text-anchor", "middle").text("The Price of The Quarter of Wheat").attr("font-weight", "bold").attr("font-size", "15px").attr("fill", "black").attr("font-style", "italic")
        mainLabelGroup.append("text").attr("x", xScale(1650)).attr("y", yScale(67)).attr("text-anchor", "middle").text("& the Wages of Labour by the Week").attr("font-weight", "bold").attr("font-size", "15px").attr("fill", "black").attr("font-style", "italic")
        mainLabelGroup.append("text").attr("x", xScale(1650)).attr("y", yScale(64.5)).attr("text-anchor", "middle").text("from").attr("font-weight", "bold").attr("font-size", "10px").attr("fill", "black").attr("font-style", "italic")
        mainLabelGroup.append("text").attr("x", xScale(1650)).attr("y", yScale(62)).attr("text-anchor", "middle").text("the Year 1565 to 1821").attr("font-weight", "bold").attr("font-size", "15px").attr("fill", "black").attr("font-style", "italic")
        mainLabelGroup.append("text").attr("x", xScale(1650)).attr("y", yScale(59.5)).attr("text-anchor", "middle").text("by").attr("font-weight", "bold").attr("font-size", "10px").attr("fill", "black").attr("font-style", "italic")
        const playfairLink = mainLabelGroup.append("a").attr("href", "https://en.wikipedia.org/wiki/William_Playfair").attr("target", "_blank")
        playfairLink.append("text").attr("x", xScale(1650)).attr("y", yScale(57)).attr("text-anchor", "middle").text("WILLIAM PLAYFAIR").attr("font-weight", "bold").attr("font-size", "12px").attr("fill", "blue").attr("font-style", "normal").style("underline", "true")


    })

}

go()
