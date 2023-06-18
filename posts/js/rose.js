
window.onresize = () => location.reload()

const formatNumber = d3.format(",.2f")
const formatSmallNumber = d3.format(".1n")
const formatDate = d3.utcFormat("%Y-%m")

const width = 1200
const height = 800
const scaleFactor = (Math.min(800, window.innerHeight-50) / height)
const yTranslateMe = (scaleFactor*height - height) / 2
const xTranslateMe = (scaleFactor*width - width) / 2

const tols = ["#4477AA","#EE6677","#228833","#CCBB44","#66CCEE","#AA3377"]

let colorCountries = d3.scaleOrdinal(tols)

function getMonthName(monthNumber) {
  const date = new Date()
  date.setMonth(monthNumber)

  return date.toLocaleString('en-US', { month: 'long' })
}

const svg = d3.select("#chart").append("svg").attr("width", width).attr("height", height)
svg.append("rect").attr("x", 0).attr("y", 0).attr("width", width).attr("height", height).attr("fill", "none").attr("stroke", "grey").attr("stroke-width", 2)
svg.attr("transform", `translate(${xTranslateMe}, ${yTranslateMe}) scale(${scaleFactor})`)

// const roseCols = [date,strength,deathsZymotic,deathsWounds,deathsOther,rateZymotic,rateWounds,rateOther]
// https://curiosity.lib.harvard.edu/contagion/catalog/36-990101646750203941

function go() {
  d3.csv("./data/rose.csv").then(data => {
    data.forEach(d => {
      d.date = new Date(d.date)
      d.strength = +d.strength
      d.deathsZymotic = +d.deathsZymotic
      d.deathsWounds = +d.deathsWounds
      d.deathsOther = +d.deathsOther
      d.rateZymotic = +d.rateZymotic
      d.rateWounds = +d.rateWounds
      d.rateOther = +d.rateOther
    })

    // Split data into two halves

    const dataFirstHalf = data.filter(d => d.date < new Date("1855-04-01"))
    const dataSecondHalf = data.filter(d => d.date >= new Date("1855-04-01"))

    const title = svg.append("g").attr("transform", `translate(${width/2}, ${height/2 - height/2 * 0.9})`)
    title.append("text").text("Diagram of the Causes of Mortality in the Army in the East").attr("text-anchor", "middle").attr("font-size", 30).attr("font-weight", "bold")

    const nightingaleLink = svg.append("g").attr("transform", `translate(${width/2}, ${height/2 - height/2 * 0.9 + 30})`)
    const nightingaleLinkLink = nightingaleLink.append("a").attr("href", "https://www.florence-nightingale.co.uk/coxcomb-diagram-1858/")
    nightingaleLinkLink.append("text").text("by Florence Nightingale").attr("text-anchor", "middle").attr("font-size", 24).attr("font-weight", "normal").attr("font-style", "italic").attr("fill", "blue")

    const titleOffsetPercentage = 0.63
    
    const rightRoseTitle = svg.append("g").attr("transform", `translate(${width/2 + height/2 * 0.7}, ${height/2})`)
    rightRoseTitle.append("text").text("1. April 1854 to March 1855").attr("text-anchor", "middle").attr("font-size", 20).attr("font-weight", "bold").attr("dy", -height/2 * titleOffsetPercentage - 20)

    const leftRoseTitle = svg.append("g").attr("transform", `translate(${width/2 - height/2 * 0.7}, ${height/2})`)
    leftRoseTitle.append("text").text("2. April 1855 to March 1856").attr("text-anchor", "middle").attr("font-size", 20).attr("font-weight", "bold").attr("dy", -height/2 * titleOffsetPercentage - 20)

    const deathsScale = d3.scaleSqrt().domain([0, 2761]).range([0, height/2 * 0.9])
    const deathsScaleLinear = d3.scaleLinear().domain([0, 2761]).range([0, 380])

    let arcRose = (d,i,deaths) => d3.arc()
          .innerRadius(0)
          .outerRadius(deathsScale(deaths))
          .startAngle((2*Math.PI/12)*i-2*Math.PI/4)
          .endAngle((2*Math.PI/12)*(i+1)-2*Math.PI/4)(d)

    const roseRight = svg.append("g").attr("transform", `translate(${width/2 + height/2 * 0.7}, ${height/2 - height/2 * 0.05})`)
    const roseLeft = svg.append("g").attr("transform", `translate(${width/2 - height/2 * 0.7}, ${height/2 - height/2 * 0.05})`)
            
    roseRight.selectAll(".rightRoseZymotic")
          .data(dataFirstHalf)
          .enter()
          .append("path")
          .attr("class", "rightRoseZymotic")
          .attr("d", (d,i)=>arcRose(d,i,d.deathsZymotic))
          .attr("fill","LightBlue")
          .attr("stroke","black")
          .on("mouseover", (e,d)=>showToolTip(d))
          .on("mousemove", (e,d)=>showToolTip(d))
          .on("mouseout", (e,d)=>hideToolTip(d))
    
    roseRight.selectAll(".rightRoseOther")
          .data(dataFirstHalf)
          .enter()
          .append("path")
          .attr("class", "rightRoseOther")
          .attr("d", (d,i)=>arcRose(d,i,d.deathsOther))
          .attr("fill","grey")
          .attr("stroke","black")
          .style("opacity", 0.5)
          .on("mouseover", (e,d)=>showToolTip(d))
          .on("mousemove", (e,d)=>showToolTip(d))
          .on("mouseout", (e,d)=>hideToolTip(d))

    roseRight.selectAll(".rightRoseWounds")
          .data(dataFirstHalf)
          .enter()
          .append("path")
          .attr("class", "rightRoseWounds")
          .attr("d", (d,i)=>arcRose(d,i,d.deathsWounds))
          .attr("fill","pink")
          .attr("stroke","black")
          .style("opacity", 0.5)
          .on("mouseover", (e,d)=>showToolTip(d))
          .on("mousemove", (e,d)=>showToolTip(d))
          .on("mouseout", (e,d)=>hideToolTip(d))

    roseRight.selectAll(".rightRoseDateLabelYearPaths")
          .data(dataFirstHalf)
          .enter()
          .append("path")
          .attr("class", "rightRoseDateLabelYearPaths")
          .attr("id", (d,i)=>`rightRoseDateLabelYearPath${i}`)
          .attr("d", (d,i)=>{
            // M start-x, start-y A radius-x, radius-y, x-axis-rotation, large-arc-flag, sweep-flag, end-x, end-y
            // M 0,300 A 200,200 0 0,1 400,300

            let startX = (10+deathsScale(Math.max(d.deathsOther, d.deathsWounds, d.deathsZymotic,150)))*Math.cos((2*Math.PI/12)*i-Math.PI)
            let startY = (10+deathsScale(Math.max(d.deathsOther, d.deathsWounds, d.deathsZymotic,150)))*Math.sin((2*Math.PI/12)*i-Math.PI)
            let endX =   (10+deathsScale(Math.max(d.deathsOther, d.deathsWounds, d.deathsZymotic,150)))*Math.cos((2*Math.PI/12)*(i+1)-Math.PI)
            let endY =   (10+deathsScale(Math.max(d.deathsOther, d.deathsWounds, d.deathsZymotic,150)))*Math.sin((2*Math.PI/12)*(i+1)-Math.PI)
            let radiusX = 10+deathsScale(Math.max(d.deathsOther, d.deathsWounds, d.deathsZymotic,150))
            let radiusY = 10+deathsScale(Math.max(d.deathsOther, d.deathsWounds, d.deathsZymotic,150))
            return `M ${startX},${startY} A ${radiusX},${radiusY} 0 0,1 ${endX},${endY}`
          })
          .attr("fill","none")
          .attr("stroke","none")
    
    roseRight.selectAll(".rightRoseDateYearLabels")
          .data(dataFirstHalf)
          .enter()
          .append("text")
          .attr("class", "rightRoseDateYearLabels")
          .append("textPath")
          .attr("xlink:href", (d,i)=>`#rightRoseDateLabelYearPath${i}`)
          .attr("startOffset", "50%")
          .attr("text-anchor", "middle")
          .attr("font-size", 14)
          .attr("font-weight", "bold")
          .attr("dy", 5)
          .text((d,i) => d.date.getFullYear())
          .style("pointer-events", "none")

      roseRight.selectAll(".rightRoseDateLabelMonthPaths")
          .data(dataFirstHalf)
          .enter()
          .append("path")
          .attr("class", "rightRoseDateLabelMonthPaths")
          .attr("id", (d,i)=>`rightRoseDateLabelMonthPath${i}`)
          .attr("d", (d,i)=>{
            // M start-x, start-y A radius-x, radius-y, x-axis-rotation, large-arc-flag, sweep-flag, end-x, end-y
            // M 0,300 A 200,200 0 0,1 400,300

            let startX = (25+deathsScale(Math.max(d.deathsOther, d.deathsWounds, d.deathsZymotic,150)))*Math.cos((2*Math.PI/12)*i-Math.PI)
            let startY = (25+deathsScale(Math.max(d.deathsOther, d.deathsWounds, d.deathsZymotic,150)))*Math.sin((2*Math.PI/12)*i-Math.PI)
            let endX =   (25+deathsScale(Math.max(d.deathsOther, d.deathsWounds, d.deathsZymotic,150)))*Math.cos((2*Math.PI/12)*(i+1)-Math.PI)
            let endY =   (25+deathsScale(Math.max(d.deathsOther, d.deathsWounds, d.deathsZymotic,150)))*Math.sin((2*Math.PI/12)*(i+1)-Math.PI)
            let radiusX = 25+deathsScale(Math.max(d.deathsOther, d.deathsWounds, d.deathsZymotic,150))
            let radiusY = 25+deathsScale(Math.max(d.deathsOther, d.deathsWounds, d.deathsZymotic,150))
            return `M ${startX},${startY} A ${radiusX},${radiusY} 0 0,1 ${endX},${endY}`
          })
          .attr("fill","none")
          .attr("stroke","none")
    
    roseRight.selectAll(".rightRoseDateMonthLabels")
          .data(dataFirstHalf)
          .enter()
          .append("text")
          .attr("class", "rightRoseDateMonthLabels")
          .append("textPath")
          .attr("xlink:href", (d,i)=>`#rightRoseDateLabelMonthPath${i}`)
          .attr("startOffset", "50%")
          .attr("text-anchor", "middle")
          .attr("font-size", 14)
          .attr("font-weight", "bold")
          .attr("dy", 5)
          .text((d,i) => getMonthName(d.date.getMonth()).slice(0,3))
          .style("pointer-events", "none")
          
    roseRight.append("text").text("Bulgaria").attr("x", 0).attr("y", 0).attr("font-size", 12).attr("font-weight", "bold").attr("text-anchor", "middle")
        .attr("fill", "grey")
        .attr("transform", "translate(-8 -150) rotate(-90)")

    roseRight.append("text").text("Crimea").attr("x", 0).attr("y", 0).attr("font-size", 12).attr("font-weight", "bold").attr("text-anchor", "middle")
        .attr("fill", "grey")
        .attr("transform", "translate(200 15)")

    roseRight.append("line").attr("x1", ()=>-deathsScale(1205)).attr("y1", 0).attr("x2", -500).attr("y2", 150).attr("stroke", "grey").attr("stroke-width", 1).style("stroke-dasharray", ("3, 3"))
    roseRight.append("line").attr("x1", -500).attr("y1", 150).attr("x2", -height/2 * 1.4 - deathsScale(477)).attr("y2", 0).attr("stroke", "grey").attr("stroke-width", 1).style("stroke-dasharray", ("3, 3"))

    roseLeft.selectAll(".leftRoseZymotic")
          .data(dataSecondHalf)
          .enter()
          .append("path")
          .attr("class", "leftRoseZymotic")
          .attr("d", (d,i)=>arcRose(d,i,d.deathsZymotic))
          .attr("fill","LightBlue")
          .attr("stroke","black")
          .on("mouseover", (e,d)=>showToolTip(d))
          .on("mousemove", (e,d)=>showToolTip(d))
          .on("mouseout", (e,d)=>hideToolTip(d))

    roseLeft.selectAll(".leftRoseOther")
          .data(dataSecondHalf)
          .enter()
          .append("path")
          .attr("class", "leftRoseOther")
          .attr("d", (d,i)=>arcRose(d,i,d.deathsOther))
          .attr("fill","grey")
          .attr("stroke","black")
          .style("opacity", 0.5)
          .on("mouseover", (e,d)=>showToolTip(d))
          .on("mousemove", (e,d)=>showToolTip(d))
          .on("mouseout", (e,d)=>hideToolTip(d))

    roseLeft.selectAll(".leftRoseWounds")
          .data(dataSecondHalf)
          .enter()
          .append("path")
          .attr("class", "leftRoseWounds")
          .attr("d", (d,i)=>arcRose(d,i,d.deathsWounds))
          .attr("fill","pink")
          .attr("stroke","black")
          .style("opacity", 0.5)
          .on("mouseover", (e,d)=>showToolTip(d))
          .on("mousemove", (e,d)=>showToolTip(d))
          .on("mouseout", (e,d)=>hideToolTip(d))

    roseLeft.selectAll(".leftRoseDateLabelYearPaths")
          .data(dataSecondHalf)
          .enter()
          .append("path")
          .attr("class", "leftRoseDateLabelYearPaths")
          .attr("id", (d,i)=>`leftRoseDateLabelYearPath${i}`)
          .attr("d", (d,i)=>{
            // M start-x, start-y A radius-x, radius-y, x-axis-rotation, large-arc-flag, sweep-flag, end-x, end-y
            // M 0,300 A 200,200 0 0,1 400,300

            let startX = (10+deathsScale(Math.max(d.deathsOther, d.deathsWounds, d.deathsZymotic,150)))*Math.cos((2*Math.PI/12)*i-Math.PI)
            let startY = (10+deathsScale(Math.max(d.deathsOther, d.deathsWounds, d.deathsZymotic,150)))*Math.sin((2*Math.PI/12)*i-Math.PI)
            let endX =   (10+deathsScale(Math.max(d.deathsOther, d.deathsWounds, d.deathsZymotic,150)))*Math.cos((2*Math.PI/12)*(i+1)-Math.PI)
            let endY =   (10+deathsScale(Math.max(d.deathsOther, d.deathsWounds, d.deathsZymotic,150)))*Math.sin((2*Math.PI/12)*(i+1)-Math.PI)
            let radiusX = 10+deathsScale(Math.max(d.deathsOther, d.deathsWounds, d.deathsZymotic,150))
            let radiusY = 10+deathsScale(Math.max(d.deathsOther, d.deathsWounds, d.deathsZymotic,150))
            return `M ${startX},${startY} A ${radiusX},${radiusY} 0 0,1 ${endX},${endY}`
          })
          .attr("fill","none")
          .attr("stroke","none")
    
    roseLeft.selectAll(".leftRoseDateYearLabels")
          .data(dataSecondHalf)
          .enter()
          .append("text")
          .attr("class", "leftRoseDateYearLabels")
          .append("textPath")
          .attr("xlink:href", (d,i)=>`#leftRoseDateLabelYearPath${i}`)
          .attr("startOffset", "50%")
          .attr("text-anchor", "middle")
          .attr("font-size", 14)
          .attr("font-weight", "bold")
          .attr("dy", 5)
          .text((d,i) => d.date.getFullYear())
          .style("pointer-events", "none")
          
      roseLeft.selectAll(".leftRoseDateLabelMonthPaths")
          .data(dataSecondHalf)
          .enter()
          .append("path")
          .attr("class", "leftRoseDateLabelMonthPaths")
          .attr("id", (d,i)=>`leftRoseDateLabelMonthPath${i}`)
          .attr("d", (d,i)=>{
            // M start-x, start-y A radius-x, radius-y, x-axis-rotation, large-arc-flag, sweep-flag, end-x, end-y
            // M 0,300 A 200,200 0 0,1 400,300

            let startX = (25+deathsScale(Math.max(d.deathsOther, d.deathsWounds, d.deathsZymotic,150)))*Math.cos((2*Math.PI/12)*i-Math.PI)
            let startY = (25+deathsScale(Math.max(d.deathsOther, d.deathsWounds, d.deathsZymotic,150)))*Math.sin((2*Math.PI/12)*i-Math.PI)
            let endX =   (25+deathsScale(Math.max(d.deathsOther, d.deathsWounds, d.deathsZymotic,150)))*Math.cos((2*Math.PI/12)*(i+1)-Math.PI)
            let endY =   (25+deathsScale(Math.max(d.deathsOther, d.deathsWounds, d.deathsZymotic,150)))*Math.sin((2*Math.PI/12)*(i+1)-Math.PI)
            let radiusX = 25+deathsScale(Math.max(d.deathsOther, d.deathsWounds, d.deathsZymotic,150))
            let radiusY = 25+deathsScale(Math.max(d.deathsOther, d.deathsWounds, d.deathsZymotic,150))
            return `M ${startX},${startY} A ${radiusX},${radiusY} 0 0,1 ${endX},${endY}`
          })
          .attr("fill","none")
          .attr("stroke","none")
    
    roseLeft.selectAll(".leftRoseDateMonthLabels")
          .data(dataSecondHalf)
          .enter()
          .append("text")
          .attr("class", "leftRoseDateMonthLabels")
          .append("textPath")
          .attr("xlink:href", (d,i)=>`#leftRoseDateLabelMonthPath${i}`)
          .attr("startOffset", "50%")
          .attr("text-anchor", "middle")
          .attr("font-size", 14)
          .attr("font-weight", "bold")
          .attr("dy", 5)
          .text((d,i) => getMonthName(d.date.getMonth()).slice(0,3))
          .style("pointer-events", "none")

    const roseLegend = svg.append("g").attr("class", "roseLegend").attr("transform", `translate(${40},${550})`)
    roseLegend.append("rect").attr("x", 0).attr("y", 0).attr("width", 500).attr("height", 210).attr("fill", "none").attr("stroke", "grey")
    const legendTitle = roseLegend.append("text").attr("x", 250).attr("y", 30).attr("text-anchor", "middle").attr("font-size", 20).attr("font-weight", "bold")
        .text("Deaths by Cause")

    const wedgePath = d3.arc()
        .innerRadius(0)
        .outerRadius(30)
        .startAngle(0)
        .endAngle(2*Math.PI/6)

    const deathCausesList = ["Zymotic preventable", "Wounds & Injuries", "Other Causes"]
    const roseColorScale = d3.scaleOrdinal().domain(deathCausesList).range(["LightBlue", "pink", "grey"])
    const roseLegendYScale = d3.scaleBand().domain(deathCausesList).range([70, 240]).padding(0.1)
    
    const roseLegendWedges = roseLegend.selectAll(".roseLegendWedges").data(deathCausesList).enter()
            .append("path").attr("class", "roseLegendWedges").attr("d", wedgePath).attr("fill", (d,i) => roseColorScale(i)).attr("stroke", "black")
            .attr("transform", (d,i) => `translate(${20},${roseLegendYScale(d)})`)
    
    const roseLegendLabels = roseLegend.selectAll(".roseLegendLabels").data(deathCausesList).enter()
            .append("text").attr("class", "roseLegendLabels").attr("x", 40).attr("y", (d,i) => roseLegendYScale(d)+5)
            .attr("font-size", 14).attr("font-weight", "bold").text(d => d)
    
    const roseLegendBarsGroup = roseLegend.append("g").attr("class", "roseLegendBarsGroup").attr("transform", `translate(${60},${-25})`)
    const roseLegendDonut = roseLegend.append("g").attr("class", "roseLegendDonut").attr("transform", `translate(${400},${150})`)

    const arcDonut = d => d3.arc()
        .innerRadius(20)
        .outerRadius(40)
        .startAngle(d=>d.startAngle)
        .endAngle(d=>d.endAngle)(d)
    
    const pieDonut = d3.pie()

    function showToolTip(item) {

        const roseLegendBars = roseLegendBarsGroup.selectAll(".roseLegendBars").data(deathCausesList).enter().append("g").attr("class", "roseLegendBars")
        roseLegendBars.append("rect")
            .attr("x", 0)
            .attr("y", (d,i) => roseLegendYScale(d))
            .attr("width", d=>{
                if (d==="Zymotic preventable") {
                    return deathsScaleLinear(item.deathsZymotic)
                } else if (d==="Wounds & Injuries") {
                    return deathsScaleLinear(item.deathsWounds)
                } else {
                    return deathsScaleLinear(item.deathsOther)
                }
            })
            .attr("height", roseLegendYScale.bandwidth()/3)
            .attr("fill", (d,i) => roseColorScale(i))
            .attr("stroke", "black")
        roseLegendBars.append("text")
            .attr("x", d=>{
                if (d==="Zymotic preventable") {
                    return deathsScaleLinear(item.deathsZymotic)+5
                } else if (d==="Wounds & Injuries") {
                    return deathsScaleLinear(item.deathsWounds)+5
                } else {
                    return deathsScaleLinear(item.deathsOther)+5
                }
            })
            .attr("dy", 5)
            .attr("y", (d,i) => roseLegendYScale(d)+roseLegendYScale.bandwidth()/6)
            .attr("font-size", 14)
            .attr("font-weight", "bold")
            .text(d=>{
                if (d==="Zymotic preventable") {
                    return item.deathsZymotic
                } else if (d==="Wounds & Injuries") {
                    return item.deathsWounds
                } else {
                    return item.deathsOther
                }
            })

        legendTitle.text(`Deaths by Cause - ${getMonthName(item.date.getMonth()).slice(0,3)} ${item.date.getFullYear()}`)

        const deathsData = [item.deathsZymotic, item.deathsWounds, item.deathsOther]
        const roseLegendDonutArcs = roseLegendDonut.selectAll(".roseLegendDonutArcs").data(pieDonut(deathsData)).enter().append("g")
        roseLegendDonutArcs.append("path")
            .attr("class", "roseLegendDonutArcs")
            .attr("d", d=>arcDonut(d))
            .attr("fill", (d,i)=>roseColorScale(i))
            .attr("stroke", "black")


    }

     function hideToolTip(item) {
        roseLegendBarsGroup.selectAll("g").remove()
        roseLegendDonut.selectAll("g").remove()
        legendTitle.text(`Deaths by Cause`)
     }



  })
}

go()
