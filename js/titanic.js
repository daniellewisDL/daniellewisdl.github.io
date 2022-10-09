

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
    // .attr("d", `M ${primaryContainerWidth-20} ${primaryContainerHeight-20} L ${primaryContainerWidth-10} ${primaryContainerHeight-15} L ${primaryContainerWidth-20} ${primaryContainerHeight-10} Z`)
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
    
    passengerData = res

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


    passengers.selectAll("rect")
            .on("mouseover", (e,d)=>{
                setPD(d)
            })
            .on("mouseout", (e,d)=>{
                setPD(passengerData.find(item=>(item.openmlid==11)))
            })

    setPD(passengerData.find(item=>(item.openmlid==11)))

    function setPD(passenger) {
        defaultPD.selectAll("g").remove()
        
        let passengerDetailTitle = defaultPD.append("g").attr("id", "passengerDetailTitle").attr("transform", "translate(0,0) scale(0.8,1)")
        passengerDetailTitle.append("text").text("PASSENGER PROFILE").attr("x", 5).attr("y", 15).style("font-weight", "bold").style("font-size", "12px").style("font-family", "sans-serif")

        let passengerTitleName = passenger.derivedTitle + " " + passenger.derivedSurname
        let passengerFirstColumn = defaultPD.append("g").attr("id", "passengerFirstColumn").attr("transform", `translate(0,20) scale(1,1)`)
        passengerFirstColumn.append("text").text(passenger.openmlname).attr("x", 5).attr("y", 35).style("font-weight", "bold").style("font-size", "18px")
        passengerFirstColumn.append("text").text(passenger.kSex + ", age " + ((passenger.kAge=="?")?"unknown":d3.format(".0f")(passenger.kAge))).attr("x", 5).attr("y", 50).style("font-size", "12px")
        passengerFirstColumn.append("text").text("Boarded at " + passenger.kBoarded).attr("x", 5).attr("y", 65).style("font-size", "12px")
        passengerFirstColumn.append("text").text("Destination was " + passenger.kDestination).attr("x", 5).attr("y", 80).style("font-size", "12px")
        passengerFirstColumn.append("text").text("Hometown was " + passenger.kHometown).attr("x", 5).attr("y", 95).style("font-size", "12px")
        passengerFirstColumn.append("text").text("Cabin class was " + passenger.kPclass).attr("x", 5).attr("y", 110).style("font-size", "12px")
        passengerFirstColumn.append("text").text("Cabin was " + passenger.kCabin).attr("x", 5).attr("y", 125).style("font-size", "12px")
        passengerFirstColumn.append("text").text("Fare was " + passenger.kFare).attr("x", 5).attr("y", 140).style("font-size", "12px")
        passengerFirstColumn.append("text").text((passenger.openmlsurvived==1)?"Survived":"Perished").attr("x", 5).attr("y", 155).style("font-size", "18px").style("font-weight", "bold")

        // let imageFile = (passenger.openmlid==11) ? "John_Jacob_Astor_1909.jpg" : "blank.jpg"
        // pdImage = defaultPD.append("g").attr("id", "pdImage")
        // pdImage.append("image").attr("x", 100).attr("y", 10).attr("width", 120).attr("height", 100).attr("xlink:href", `./data/images/${imageFile}`)


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
