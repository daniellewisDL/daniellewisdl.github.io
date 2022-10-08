
const imageFileList = ['aaron-willer-and-family-H.jpg']

var tabularData = [
                    {cabinClass: 'Crew', ageSex: 'Women', survived: 'Survived', number: 20},
                    {cabinClass: 'Crew', ageSex: 'Women', survived: 'Died', number: 3},
                    {cabinClass: 'Crew', ageSex: 'Men', survived: 'Survived', number: 192},
                    {cabinClass: 'Crew', ageSex: 'Men', survived: 'Died', number: 693},
                    {cabinClass: 'First Class', ageSex: 'Children', survived: 'Survived', number: 5},
                    {cabinClass: 'First Class', ageSex: 'Children', survived: 'Died', number: 1},
                    {cabinClass: 'First Class', ageSex: 'Women', survived: 'Survived', number: 140},
                    {cabinClass: 'First Class', ageSex: 'Women', survived: 'Died', number: 4},
                    {cabinClass: 'First Class', ageSex: 'Men', survived: 'Survived', number: 57},
                    {cabinClass: 'First Class', ageSex: 'Men', survived: 'Died', number: 118},
                    {cabinClass: 'Second Class', ageSex: 'Children', survived: 'Survived', number: 24},
                    {cabinClass: 'Second Class', ageSex: 'Children', survived: 'Died', number: 0},
                    {cabinClass: 'Second Class', ageSex: 'Women', survived: 'Survived', number: 80},
                    {cabinClass: 'Second Class', ageSex: 'Women', survived: 'Died', number: 13},
                    {cabinClass: 'Second Class', ageSex: 'Men', survived: 'Survived', number: 14},
                    {cabinClass: 'Second Class', ageSex: 'Men', survived: 'Died', number: 154},
                    {cabinClass: 'Third Class', ageSex: 'Children', survived: 'Survived', number: 27},
                    {cabinClass: 'Third Class', ageSex: 'Children', survived: 'Died', number: 52},
                    {cabinClass: 'Third Class', ageSex: 'Women', survived: 'Survived', number: 76},
                    {cabinClass: 'Third Class', ageSex: 'Women', survived: 'Died', number: 89},
                    {cabinClass: 'Third Class', ageSex: 'Men', survived: 'Survived', number: 75},
                    {cabinClass: 'Third Class', ageSex: 'Men', survived: 'Died', number: 387}
                    ]

let group = d3.group(tabularData, d=>d.cabinClass, d=> d.ageSex)

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dictum tempor mauris, ac hendrerit tortor dignissim in. Integer ut tempor elit, sed malesuada dui."

let globalState = 1
let t = 1309 *2

var defaultSC = secondaryContainer.append("g").attr("id", "defaultSC")

setDefaultSC()

function setDefaultSC() {
    iconsList = ["icons8-temperature-64.png",
    "icons8-clock-80.png",
    "icons8-boat-leaving-port-50.png",
    "icons8-titanic-48.png",
    "icons8-globe-100.png"]
    var spacing = secondaryContainerWidth / 5
    var iconSize = 64
    var xFirst = spacing/2 - iconSize/2
    var yIcon = secondaryContainerHeight/2 - iconSize/2
    for (let i=0;i<iconsList.length;i++) {
        defaultSC.append("image").attr("class", "icon").attr("x", xFirst + spacing*(i)).attr("y", yIcon).attr("width", iconSize).attr("height", iconSize).attr("xlink:href", "./src/"+iconsList[i])
    }
}

const extractColumn = (arr, column) => arr.map(x=>x[column]);

var sunburstRadius = 0.9*Math.min(primaryContainerWidth, primaryContainerHeight) / 2

var radius = 6.5
let cornerRadius = 10
var originalRadius = radius

const palette1 = ["#3b3122", "#8a7350", "#66553b"]
const palette2 = ["#a87242", "#704214", "#8c5a2b" ]
const ageSexColor = d3.scaleOrdinal().range(palette2)

let passengerData = []

let gs1Legend = primaryContainer.append("g").attr("id", "gs1LegendGroup")

let headlinesEtc = primaryContainer.append("g").attr("id", "headlinesEtc")

let subHeadline = d3.select("#headlinesEtc").append("text")
            .text("THERE ARE 1,309 KNOWN PASSENGERS ABOARD THE RMS TITANIC ...")
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
            .attr("y", primaryContainerHeight-25)
            .attr("width", 165)
            .attr("height", 20)
            .style("opacity", 0.1)

clickForMore
    .append("path")
    .attr("d", `M ${primaryContainerWidth-20} ${primaryContainerHeight-20} L ${primaryContainerWidth-10} ${primaryContainerHeight-15} L ${primaryContainerWidth-20} ${primaryContainerHeight-10} Z`)
    .style("opacity", 0.4)


clickForMore.append("text")
            .text("Click here for more details ...")
            .attr("x", primaryContainerWidth-165)
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
                // textValues += ": " + sequenceArray[0].value
                bigNumber.text(d3.format(",")(sequenceArray[0].value))
            } else if (sequenceArray.length == 2) {
                // textValues += ", " + sequenceArray[1].data[0] + ": " + sequenceArray[1].value
                textValues += ", " + sequenceArray[1].data[0]
                bigNumber.text(d3.format(",")(sequenceArray[1].value))
                clickToRedrawText.style("opacity", 1)
                clickToRedrawValue.style("opacity", 1).text(
                    (sequenceArray[1].data[0]=="Men" || sequenceArray[1].data[0]=="Women" || sequenceArray[1].data[0]=="Children") ? "Sex" :
                        (sequenceArray[1].data[0]=="Died" || sequenceArray[1].data[0]=="Survived") ? "Survivorship" : "Cabin class"
                    )
            } else if (sequenceArray.length == 3) {
                clickToRedrawText.style("opacity", 1)
                clickToRedrawValue.style("opacity", 1)
                if (newRoot=="ageSex" || newRoot =="cabinClass") {
                    // textValues += ", " + sequenceArray[1].data[0] + ", " + sequenceArray[2].data.survived + ": " + sequenceArray[2].value
                    textValues += ", " + sequenceArray[1].data[0] + ", " + sequenceArray[2].data.survived
                    bigNumber.text(d3.format(",")(sequenceArray[2].value))
                    clickToRedrawValue.text("Survivorship")
                }
                else if (newRoot=="survived") {
                    // textValues += ", " + sequenceArray[1].data[0] + ", " + sequenceArray[2].data.cabinClass + ": " + sequenceArray[2].value
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
    // console.log(res)
    passengerData = res

    passengerData.forEach((item)=>{
        // replace all ? with 100 to treat as special case
        if (item.kAge == "?") { item.kAge = 85}
    })

    let passengerGroup = primaryContainer.append("g").attr("id", "passengerGroup")

    let passengers = passengerGroup.selectAll("g")
        .data(passengerData)
        .enter()
        .append("g")
        .attr("class", "passenger")
        .attr("transform", "translate(0, 0)")

    passengers
        .transition()
            .duration((d,i)=>i)
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


    var xSex = d3.scaleBand()
        .range([ 0, primaryContainerWidth ])
        .domain(["male", "female"])

    var yAge = d3.scaleLinear()
        .range([ primaryContainerHeight*0.9, primaryContainerHeight*0.1 ])
        .domain([d3.min(extractColumn(passengerData,"kAge")), 85])


    clickForMore.on("mouseover", ()=>{clickForMoreRect.transition().duration(300).style("opacity", 0.3)})
    clickForMore.on("mouseout", ()=>{clickForMoreRect.transition().duration(300).style("opacity", 0.1)})

    clickForMore.on("click", ()=>{

        oneOfN.text((globalState+1) + " / 6")

        if (globalState == 0) {
            sunburstGroup.selectAll("g").remove()

            radius = originalRadius
            subHeadlineTransition("THERE ARE 1,309 KNOWN PASSENGERS ABOARD THE RMS TITANIC")
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
            radius = 5
            let midBuffer = 35
            let topBuffer = 0.05 * primaryContainerHeight
            let unitSize = radius*2 + 1
            let bottomBuffer = 0.8 * primaryContainerHeight
            let numUnitsHigh = Math.floor((bottomBuffer-topBuffer)/unitSize)


            gs1Legend.append("text")
                        .attr("id", "gs1LegendMale")
                        .text("Male")
                        .attr("x", -100)
                        .attr("y", 0.8*primaryContainerHeight+15)
                        .style("font-style", "italic")
                        .style("font-size", "16px")
                        .attr("text-anchor", "end")
            
            gs1Legend.append("text")
                        .attr("id", "gs1LegendFemale")
                        .text("Female")
                        .attr("x", primaryContainerWidth+100)
                        .attr("y", 0.8*primaryContainerHeight+15)
                        .style("font-style", "italic")
                        .style("font-size", "16px")

            d3.select("#gs1LegendMale")
                .transition()
                .duration(t)
                .attr("x", primaryContainerWidth/2-midBuffer)
            
            d3.select("#gs1LegendFemale")
                .transition()
                .duration(t)
                .attr("x", primaryContainerWidth/2+midBuffer)

            subHeadlineTransition("MALE PASSENGERS OUTNUMBER FEMALE PASSENGERS BY 2:1")
            // 466 female, 843 male
            
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
        
            radius = 3.5
            let midBuffer = 50
            let ageBucketBuffer = 5
            let topBuffer = 0.05 * primaryContainerHeight
            let unitSize = radius*2 + 1
            let bottomBuffer = 0.8 * primaryContainerHeight
            let ageBucketHeight = (bottomBuffer-topBuffer)/8
            let numUnitsHigh = Math.floor((ageBucketHeight-ageBucketBuffer)/unitSize)
            let xOffset = 30

            gs1Legend.append("text").attr("id", "gs1LegendUnknown").text("Unknown")
                        .attr("x", primaryContainerWidth/2 + xOffset).attr("y", -100)
                        .style("font-style", "italic").style("font-size", "12px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1Legend.append("text").attr("id", "gs1Legend60").text("60 yrs +")
                        .attr("x", primaryContainerWidth/2 + xOffset).attr("y", -100)
                        .style("font-style", "italic").style("font-size", "12px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1Legend.append("text").attr("id", "gs1Legend40").text("40 - 59 yrs")
                        .attr("x", primaryContainerWidth/2 + xOffset).attr("y", -100)
                        .style("font-style", "italic").style("font-size", "12px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1Legend.append("text").attr("id", "gs1Legend30").text("30 - 39 yrs")
                        .attr("x", primaryContainerWidth/2 + xOffset).attr("y", -100)
                        .style("font-style", "italic").style("font-size", "12px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1Legend.append("text").attr("id", "gs1Legend25").text("25 - 29 yrs")
                        .attr("x", primaryContainerWidth/2 + xOffset).attr("y", -100)
                        .style("font-style", "italic").style("font-size", "12px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1Legend.append("text").attr("id", "gs1Legend20").text("20 - 24 yrs")
                        .attr("x", primaryContainerWidth/2 + xOffset).attr("y", -100)
                        .style("font-style", "italic").style("font-size", "12px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1Legend.append("text").attr("id", "gs1Legend10").text("10 - 19 yrs")
                        .attr("x", primaryContainerWidth/2 + xOffset).attr("y", -100)
                        .style("font-style", "italic").style("font-size", "12px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1Legend.append("text").attr("id", "gs1Legend0").text("0 - 9 yrs")
                        .attr("x", primaryContainerWidth/2 + xOffset).attr("y", -100)
                        .style("font-style", "italic").style("font-size", "12px").style("text-anchor", "middle").style("vertical-align", "middle")

            d3.select("#gs1LegendUnknown").transition().duration(t).attr("y", topBuffer+ageBucketHeight*0.5)
            d3.select("#gs1Legend60").transition().duration(t).attr("y", topBuffer+ageBucketHeight*1.5)
            d3.select("#gs1Legend40").transition().duration(t).attr("y", topBuffer+ageBucketHeight*2.5)
            d3.select("#gs1Legend30").transition().duration(t).attr("y", topBuffer+ageBucketHeight*3.5)
            d3.select("#gs1Legend25").transition().duration(t).attr("y", topBuffer+ageBucketHeight*4.5)
            d3.select("#gs1Legend20").transition().duration(t).attr("y", topBuffer+ageBucketHeight*5.5)
            d3.select("#gs1Legend10").transition().duration(t).attr("y", topBuffer+ageBucketHeight*6.5)
            d3.select("#gs1Legend0").transition().duration(t).attr("y", topBuffer+ageBucketHeight*7.5)


            d3.select("#gs1LegendMale")
                .transition()
                .duration(t)
                .attr("x", primaryContainerWidth/2-midBuffer+xOffset)
            
            d3.select("#gs1LegendFemale")
                .transition()
                .duration(t)
                .attr("x", primaryContainerWidth/2+midBuffer+xOffset)

            subHeadlineTransition("HALF OF THE KNOWN PASSENGERS ARE UNDER 30 YRS OLD")
            
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

                        // let initialY = yOffset + topBuffer + ( i_prime % numUnitsHigh) * unitSize
                        // let initialX
                        // if (d.kSex == "female") { initialX = 407 + midBuffer + Math.floor( i_prime / numUnitsHigh ) * unitSize }
                        // else                   { initialX = 407 - midBuffer - unitSize - Math.floor( (i_prime) / numUnitsHigh ) * unitSize }

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

            gs1Legend.append("text")
                        .attr("id", "gs1Legend1st")
                        .text("First Class")
                        .attr("x", primaryContainerWidth/2 + xOffset)
                        .attr("y", -100)
                        .style("font-style", "italic")
                        .style("font-size", "12px")
                        .style("text-anchor", "middle")
                        .style("vertical-align", "middle")
            gs1Legend.append("text")
                        .attr("id", "gs1Legend2nd")
                        .text("Second Class")
                        .attr("x", primaryContainerWidth/2 + xOffset)
                        .attr("y", -100)
                        .style("font-style", "italic")
                        .style("font-size", "12px")
                        .style("text-anchor", "middle")
                        .style("vertical-align", "middle")
            gs1Legend.append("text")
                        .attr("id", "gs1Legend3rd")
                        .text("Third Class")
                        .attr("x", primaryContainerWidth/2 + xOffset)
                        .attr("y", -100)
                        .style("font-style", "italic")
                        .style("font-size", "12px")
                        .style("text-anchor", "middle")
                        .style("vertical-align", "middle")

            d3.select("#gs1Legend1st")
                .transition()
                .duration(t)
                .attr("y", topBuffer+classHeight*0.5)
            d3.select("#gs1Legend2nd")
                .transition()
                .duration(t)
                .attr("y", topBuffer+classHeight*1.5)
            d3.select("#gs1Legend3rd")
                .transition()
                .duration(t)
                .attr("y", topBuffer+classHeight*2.5)

            d3.select("#gs1LegendMale")
                .transition()
                .duration(t)
                .attr("x", primaryContainerWidth/2-midBuffer+xOffset)
            
            d3.select("#gs1LegendFemale")
                .transition()
                .duration(t)
                .attr("x", primaryContainerWidth/2+midBuffer+xOffset)

            // subHeadlineTransition("1st CLASS, 326 - 2nd CLASS, 272 - 3rd CLASS, 706")
            subHeadlineTransition("AROUND A QUARTER OF PASSENGERS ARE IN FIRST CLASS")
            
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

                        // let initialY = yOffset + topBuffer + ( i_prime % numUnitsHigh) * unitSize
                        // let initialX
                        // if (d.kSex == "female") { initialX = 407 + midBuffer + Math.floor( i_prime / numUnitsHigh ) * unitSize }
                        // else                   { initialX = 407 - midBuffer - unitSize - Math.floor( (i_prime) / numUnitsHigh ) * unitSize }

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

            subHeadlineTransition("WORD JUST IN FROM THE OLYMPIC - SURVIVORS HAVE BEEN IDENTIFIED ...")

            survivorKey = primaryContainer.append("g").attr("id", "survivorKey").attr("transform", "translate(100,100)")

            survivorKey.append("text").text("Survived").attr("x", 0).attr("y", 0).style("font-style", "italic").style("font-size", "12px")
                        .style("vertical-align", "middle")
            survivorKey.append("text").text("Did not survive").attr("x", 0).attr("y", 20).style("font-style", "italic").style("font-size", "12px")
                        .style("vertical-align", "middle")
            survivorKey.append("rect").attr("x", -5-radius*2).attr("y", -radius*2).attr("width", radius*2).attr("height", radius*2).style("opacity", 1).style("fill", "#4b371c")
            survivorKey.append("rect").attr("x", -5-radius*2).attr("y", 20-radius*2).attr("width", radius*2).attr("height", radius*2).style("opacity", 0.2).style("fill", "#4b371c")

            passengers.selectAll("rect")
                .transition().duration(t)
                .style("opacity", (d)=>(d.openmlsurvived == 1 ? 1 : 0.2))

            globalState += 1
        }
        else if (globalState == 5) {

            d3.select("#survivorKey").remove()
            gs1Legend.selectAll("text").remove()

            subHeadlineTransition("CARPATHIA CAPTAIN: MORE NEWS ON SURVIVORS INCLUDING CREW ...")
            
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


    passengers.selectAll("rect")
            .on("mouseover", (e,d)=>{
                console.log(d)
                let imageURL = (d.imagePresent == "Y") ? ("https://encyclopedia-titanica.org" + d.imageURL) : "./src/lost-titanic.jpg"
                defaultSC.selectAll(".icon").transition().duration(250).attr("x", -500)
                defaultSC
                    .append("image").attr("class", "portrait")
                    .attr("x", secondaryContainerWidth/2 - 64).attr("y", secondaryContainerHeight/2 - 64)
                    .attr("width", 128).attr("height", 128).attr("xlink:href", imageURL)
            })
            .on("mouseout", (e,d)=>{
                defaultSC.selectAll(".portrait").remove()
                defaultSC.selectAll(".icon").transition().duration(250).attr("x", (d,i)=>{
                    var spacing = secondaryContainerWidth / 5
                    var iconSize = 64
                    var xFirst = spacing/2 - iconSize/2
                    return ( xFirst + spacing*(i))
                    
                    })})


    function getHTML(passenger) {
        var imageFile = imageFileList[Math.floor(Math.random()*imageFileList.length)]

        htmlToReturn = 
                    "<img src='./data/images/" + imageFile +"' height=300 class='imgPaper'>" + 
                    "<p><b>" + passenger.derivedName + "</b>, is " + ((passenger.kAge==85) ? "of unknown age " : (passenger.kAge + " years old, ")) +
                    "and is believed to have boarded at " + passenger.kBoarded + ", travelling in class " + passenger.kPclass + ".</p>" +
                    "<p>" + ((passenger.kSex == "male") ? "His" : "Her") + " hometown is " + passenger.kHometown + " and " + ((passenger.kSex == "male") ? "his" : "her") +
                    " destination was believed to be " + passenger.kDestination + ". " + ((passenger.kSex == "male") ? "His" : "Her") + " ticket number is reported to be " + passenger.kTicket +
                    ", " + ((passenger.kSex == "male") ? "his" : "her") + " fare was $ " + passenger.kFare + ", and " + ((passenger.kSex == "male") ? "his" : "her") + " cabin is believed to be " +
                    passenger.kCabin + ". " + ((passenger.kSex == "male") ? "He" : "She") + " is believed to have " + passenger.kSibSp + " siblings or spouses on board, as well as " + passenger.kParch +
                    " parents or children. At this point, " +
                    ((passenger.kSurvived == 1) ? ("it is believed that " + passenger.derivedName + " has managed to board a lifeboat.") : ("we are very sorry to report that " + passenger.derivedName + " is not believed to have been able to board a lifeboat.")) +
                    "</p>"
                    
        return htmlToReturn
    }

    }
)
