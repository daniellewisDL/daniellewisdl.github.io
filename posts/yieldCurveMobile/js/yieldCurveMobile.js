

const width = 780
const height = 1400

const formatNumber = d3.format(",.1f")

const scaleFactor = Math.min(780, window.innerHeight-20) / height
const yTranslateMe = (scaleFactor*height - height) / 2
const xTranslateMe = (scaleFactor*width - width) / 2

// mint green: #98d2a2
const accentColor = "#98d2a2"

const transitionDuration = 500

const svg = d3.select("#viz").append("svg").attr("width", width).attr("height", height)
    .attr("transform", `translate(${xTranslateMe}, ${yTranslateMe}) scale(${scaleFactor})`)

const borderRect = svg.append("rect").attr("x", 0).attr("y", 0).attr("width", width).attr("height", height).attr("fill", "none").attr("stroke", "black").attr("stroke-width", 1)

const bannerGroup = svg.append("g").attr("id", "bannerGroup").attr("transform", `translate(0, 0)`)
const bannerGroupRect = bannerGroup.append("rect").attr("x", 0).attr("y", 0).attr("width", width).attr("height", 50).attr("fill", "black")
const bannerGroupText = bannerGroup.append("text").attr("x", 80).attr("y", 35).attr("fill", "white").text("UST Yield Curve, 2021-2024").attr("font-size", 25)

const colorCategorical = d3.scaleOrdinal(d3.schemeCategory10)
const colorSequential = d3.scaleSequential(d3.interpolateBlues)

const dlPath = 
    "M 0 -10 " +
    "L 8.66 5 " +
    "L -8.66 5 " +
    "L 0 -10" +
    "M 0 -5 " +
    "L 4.33 2.5 " +
    "L -4.33 2.5 " +
    "L 0 -5" +
    "M 0 0 " +
    "L 0 -10 " +
    "M 0 0 " +
    "L 8.66 5 " +
    "M 0 0 " +
    "L -8.66 5 "


const dl = bannerGroup.append("path").attr("d", dlPath).attr("fill", "none").attr("stroke", "white").attr("stroke-width", 0.5).attr("transform", `translate(${45}, ${30}) scale(2.5)`)


// Create dasherContainer

const dasherContainer = svg.append("g").attr("id", "dasherContainer").attr("transform", `translate(10, 50)`)
const dasherContainerRect = dasherContainer.append("rect").attr("x", 0).attr("y", 0).attr("width", width-20).attr("height", height-10-50).attr("fill", "#3d4c58")

const chartAreaWidth = width-50
const chartAreaHeight = 900
const chartAreaLoc = {x: 15, y: 15}
const chartAreaGroup = dasherContainer.append("g").attr("id", "chartAreaGroup").attr("transform", `translate(${chartAreaLoc.x}, ${chartAreaLoc.y})`)
const chartAreaRect = chartAreaGroup.append("rect").attr("x", 0).attr("y", 0).attr("width", chartAreaWidth).attr("height", chartAreaHeight).attr("fill", "#2b3a44")

function go() {

    const promises = [d3.csv("./data/us_treasury_yields_daily.csv")]
    Promise.all(promises).then(results=>{
        
        // const yearsToInclude = ["2019", "2020", "2021", "2022", "2023", "2024"]
        const yearsToInclude = ["2021", "2022", "2023", "2024"]
        let yearsMonthsToInclude = yearsToInclude.map(year=>[year+"-01", year+"-02", year+"-03", year+"-04", year+"-05", year+"-06", year+"-07", year+"-08", year+"-09", year+"-10", year+"-11", year+"-12"]).flat()
        yearsMonthsToInclude = yearsMonthsToInclude.slice(0, yearsMonthsToInclude.length-6)

        // Get data
        const ycData = results[0].filter(item=>yearsToInclude.includes(item.date.slice(0, 4))).filter(item=>item.US1M!="")
        const columns = results[0].columns.filter(item=>item!="date")

        // Find min and max of all yields

        const allYields = ycData.map(item=>columns.map(col=>+item[col])).flat()
        const minYield = Math.min(0,d3.min(allYields))
        const maxYield = d3.max(allYields)

        // Set y scale

        const yScale = d3.scaleLinear().domain([minYield, maxYield]).range([chartAreaHeight-50, 30])

        // Set x scale

        const xScale = d3.scaleBand().domain(columns).range([30, chartAreaWidth+25])

        
        const yieldCurveGroup = chartAreaGroup.append("g").attr("id", "yieldCurveGroup").attr("transform", `translate(10, 0)`)

        // const yieldCurveChartsGroups = yieldCurveGroup.selectAll("g").data(ycData).enter().append("g").attr("id", (d,i)=>"ycChartGroup"+i).attr("transform", (d, i)=>`translate(0, 0)`)
        const yieldCurveCharts = yieldCurveGroup.selectAll("path").data(ycData).enter().append("path")
            .attr("id", (d,i)=>"ycChart"+i).attr("class", (d,i)=>"ycChart "+"ycChart"+d.date.slice(0, 7))
            .attr("stroke", (d,i)=>d3.interpolateSpectral(i/ycData.length )).attr("stroke-width", 0.5).attr("fill", "none")
            .attr("d", (d,i)=>d3.line()(columns.map(col=>[xScale(col), yScale(+d[col])])))
            .style("opacity", 0.1)
        
        const interactiveLabelsGroup = chartAreaGroup.append("g").attr("id", "interactiveLabels").attr("transform", `translate(${chartAreaWidth/2}, ${chartAreaHeight+250})`)
        const interactiveLabelsGroupTitleGroup = interactiveLabelsGroup.append("g").attr("id", "interactiveLabelsGroupTitleGroup").attr("transform", `translate(0, -190)`)
        const interactiveLabelsGroupTitle1 = interactiveLabelsGroupTitleGroup.append("text").attr("x", 0).attr("y", 0).attr("dy", "0.35em").attr("fill", "white").text("Select Year-Month").attr("font-size", 28).attr("text-anchor", "middle")
        const interactiveLabelsGroupTitle2 = interactiveLabelsGroupTitleGroup.append("text").attr("x", 0).attr("y", 30).attr("dy", "0.35em").attr("fill", "white").text("").attr("font-size", 18).attr("text-anchor", "middle")

        const interactiveLabelsGroupLabelsGroup = interactiveLabelsGroup.append("g").attr("id", "interactiveLabels").attr("transform", `translate(0, 0)`)
        const interactiveLabels = interactiveLabelsGroupLabelsGroup.selectAll("text").data(yearsMonthsToInclude).enter().append("text")
            .attr("id", (d,i)=>"interactiveLabel"+i).attr("class", "interactiveLabel").attr("text-anchor", "middle")
            .attr("transform", (d, i)=>{
                const angle = 2*Math.PI*i/yearsMonthsToInclude.length
                const x = 100*Math.cos(angle)
                const y = 100*Math.sin(angle)
                let rotation = (angle>=2*Math.PI*0.75) ? 180*angle/Math.PI :
                               (angle>=2*Math.PI*0.25) ? 180*(angle-Math.PI)/Math.PI : 180*angle/Math.PI
               return `translate(${x}, ${y}) rotate(${rotation})`
                
            })
            .attr("x", 0).attr("y", 0).attr("dy", "0.35em").attr("fill", (d,i)=>d3.interpolateSpectral(i/yearsMonthsToInclude.length)).text(d=>d).attr("font-size", 10)
        interactiveLabels.on("mouseover", (e, d) => {
            d3.selectAll(".ycChart").style("opacity", 0.1)
            d3.selectAll(".ycChart"+d).style("opacity", 1).attr("stroke-width", 2)
            d3.selectAll(".interactiveLabel").attr("font-weight", "normal").attr("fill", "gray")
            d3.select("#interactiveLabel"+yearsMonthsToInclude.indexOf(d)).attr("font-weight", "bold").attr("fill", d3.interpolateSpectral(yearsMonthsToInclude.indexOf(d)/yearsMonthsToInclude.length))
            interactiveLabelsGroupTitle2.text(d).attr("fill", d3.interpolateSpectral(yearsMonthsToInclude.indexOf(d)/yearsMonthsToInclude.length))
        })
        .on("mouseout", (e, d ) => {
            d3.selectAll(".ycChart").style("opacity", 0.1).attr("stroke-width", 0.5)
            d3.selectAll(".interactiveLabel").attr("font-weight", "normal").attr("fill", (d,i)=>d3.interpolateSpectral(i/yearsMonthsToInclude.length))
            interactiveLabelsGroupTitle2.text("").attr("fill", "white")
        })

        const playCircleGroup = interactiveLabelsGroup.append("g").attr("id", "playCircleGroup").attr("transform", `translate(0, 0)`)
        const playCircle = playCircleGroup.append("circle").attr("r", 50).attr("fill", "none").attr("stroke", "white").attr("stroke-width", 0.5)
        const playCirclePath = playCircleGroup.append("path").attr("d", dlPath).attr("fill", "white").attr("stroke", "none").attr("transform", `translate(-3,0) scale(2.3) rotate(90)`)
        const playCircleText = playCircleGroup.append("text").attr("x", 0).attr("y", 28).attr("dy", "0.35em").attr("fill", "white").text("Play").attr("font-size", 10).attr("text-anchor", "middle")
        const playCircleOverlay = playCircleGroup.append("circle").attr("r", 50).attr("fill", "white").attr("stroke", "none").attr("opacity", 0.1)
        playCircleOverlay.on("mouseover", (e, d) => {
            playCircleOverlay.attr("opacity", 0.3)
            interactiveLabelsGroupTitle2.transition().ease(d3.easeLinear).duration(transitionDuration*10)
                .textTween(() => {
                    const i = d3.interpolate(0, yearsMonthsToInclude.length)
                    return t => {
                        const index = Math.floor(i(t))
                        const d = yearsMonthsToInclude[index]
                        d3.selectAll(".ycChart").style("opacity", 0.1)
                        d3.selectAll(".ycChart"+d).style("opacity", 1).attr("stroke-width", 2)
                        d3.selectAll(".interactiveLabel").attr("font-weight", "normal").attr("fill", "gray")
                        d3.select("#interactiveLabel"+yearsMonthsToInclude.indexOf(d)).attr("font-weight", "bold").attr("fill", d3.interpolateSpectral(yearsMonthsToInclude.indexOf(d)/yearsMonthsToInclude.length))
                        return d
                    }
                })
        })
        .on("mouseout", (e, d ) => {
            playCircleOverlay.attr("opacity", 0.1)
            // interrupt transition
            interactiveLabelsGroupTitle2.transition().duration(0)
            
            // reset
            d3.selectAll(".ycChart").style("opacity", 0.1).attr("stroke-width", 0.5)
            d3.selectAll(".interactiveLabel").attr("font-weight", "normal").attr("fill", (d,i)=>d3.interpolateSpectral(i/yearsMonthsToInclude.length))
            interactiveLabelsGroupTitle2.text("").attr("fill", "white")

        })

        const xAxis = d3.axisBottom(xScale)
        const yAxis = d3.axisLeft(yScale).tickFormat(d=>formatNumber(d)+"%")
        const xAxisGroup = chartAreaGroup.append("g").attr("id", "xAxisGroup").attr("transform", `translate(${10-xScale.bandwidth()/2}, ${chartAreaHeight-50})`).call(xAxis)
        xAxisGroup.select(".domain").remove()
        xAxisGroup.selectAll("line").remove()
        xAxisGroup.selectAll("text").attr("fill", accentColor).attr("font-size", 10)
        const yAxisGroup = chartAreaGroup.append("g").attr("id", "yAxisGroup").attr("transform", `translate(38, 0)`).call(yAxis)
        yAxisGroup.select(".domain").remove()
        yAxisGroup.selectAll("line").remove()
        yAxisGroup.selectAll("text").attr("fill", accentColor).attr("font-size", 10)



    })
}

go()