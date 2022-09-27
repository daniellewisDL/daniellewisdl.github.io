
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
for (let i = 0; i<10; i++) {defaultSC.append("text").text(lorem).attr("x", 0).attr("y", 15 + i*10).attr("font-size", "8pt")}

const extractColumn = (arr, column) => arr.map(x=>x[column]);

var sunburstRadius = 0.9*Math.min(primaryContainerWidth, primaryContainerHeight) / 2

var radius = 5
var originalRadius = radius

const cabinClassColor = d3.scaleOrdinal().range(["#f7c47e", "#7e5547", "#d69568", "#4f3933"])
const ageSexColor = d3.scaleOrdinal().range(["#986c55", "#945b45", "#c9a876"])
const survivedColor = d3.scaleOrdinal().range(["#6c4438", "#c4b184"])

let passengerData = []

let gs1Legend = primaryContainer.append("g").attr("id", "gs1LegendGroup")

let headlinesEtc = primaryContainer.append("g").attr("id", "headlinesEtc")

let subHeadline = d3.select("#headlinesEtc").append("text")
            .text("THERE ARE 1,309 KNOWN PASSENGERS ABOARD THE RMS TITANIC ...")
            .attr("x", 10)
            .attr("y", primaryContainerHeight-32)
            .style("font-style", "italic")
            .style("font-size", "24px")

let oneOfN = d3.select("#headlinesEtc").append("text")
            .text(" 1 / 12 ")
            .attr("x", 10)
            .attr("y", primaryContainerHeight-10)
            .style("font-style", "italic")
            .style("font-size", "12px")

let clickForMore = d3.select("#headlinesEtc").append("text")
            .text("... hover for details ... ... click for more")
            .attr("x", primaryContainerWidth-250)
            .attr("y", primaryContainerHeight-10)
            .style("font-style", "italic")
            .style("font-size", "12px")

let sunburstGroup = primaryContainer
            .append('g')
            .attr('id', 'sunburstGroup')
            .attr('transform', 'translate(' + primaryContainerWidth / 2 + ',' + ((primaryContainerHeight)-65) + ') scale(1.65,1.75) rotate(-90)')

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
    // console.log(d.x0, d.x1, angle)
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
                textValues += ": " + sequenceArray[0].value
            } else if (sequenceArray.length == 2) {
                textValues += ", " + sequenceArray[1].data[0] + ": " + sequenceArray[1].value
            } else if (sequenceArray.length == 3) {
                if (newRoot=="ageSex" || newRoot =="cabinClass") {textValues += ", " + sequenceArray[1].data[0] + ", " + sequenceArray[2].data.survived + ": " + sequenceArray[2].value}
                else if (newRoot=="survived") {textValues += ", " + sequenceArray[1].data[0] + ", " + sequenceArray[2].data.cabinClass + ": " + sequenceArray[2].value}
            }

            // output in some way....
            console.log(textValues)

            slice.selectAll("path")
                .style("opacity", 0.5)


            slice.selectAll("path")
                .filter(function(node) {
                    return (sequenceArray.indexOf(node) >= 0);
                })
                .style("opacity", 1)
            })
        .on("click", (e,d)=>{
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
            slice.selectAll("path")
                .style("opacity", 1)
            })
}


d3.csv('./data/titanic.csv').then(
    res => {

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
                    let numUnitsWide = 10 * Math.floor(Math.floor(( primaryContainerWidth-(leftRightBuffer*2) ) / unitSize)/10)
                    let initialX = leftRightBuffer + radius + (i % numUnitsWide ) * unitSize + ( Math.floor((i%numUnitsWide)/10))
                    let initialY = topBuffer + Math.floor( i/numUnitsWide ) * unitSize + Math.floor((Math.floor(i/numUnitsWide))/10)
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
            .attr("rx", 0)
            .attr("ry", 0)
            .style("fill", "#4b371c")
            .style("opacity", 0.5)


    var xSex = d3.scaleBand()
        .range([ 0, primaryContainerWidth ])
        .domain(["male", "female"])

    var yAge = d3.scaleLinear()
        .range([ primaryContainerHeight*0.9, primaryContainerHeight*0.1 ])
        .domain([d3.min(extractColumn(passengerData,"kAge")), 85])


    clickForMore.on("click", ()=>{

        oneOfN.text((globalState+1) + " / 12")

        if (globalState == 0) {
            sunburstGroup.selectAll("g").remove()

            radius = originalRadius
            subHeadline.text("THERE ARE 1,309 KNOWN PASSENGERS ABOARD THE RMS TITANIC ...")
            passengers
                .transition()
                .duration((d,i)=>(i))
                .attr("transform", (d, i) => {
                    let leftRightBuffer = 15
                    let topBuffer = (radius*2+1)
                    let unitSize = (radius*2+1)
                    let numUnitsWide = 10 * Math.floor(Math.floor(( primaryContainerWidth-(leftRightBuffer*2) ) / unitSize)/10)
                    let initialX = leftRightBuffer + radius + (i % numUnitsWide ) * unitSize + ( Math.floor((i%numUnitsWide)/10))
                    let initialY = topBuffer + Math.floor( i/numUnitsWide ) * unitSize + Math.floor((Math.floor(i/numUnitsWide))/10)
                    return "translate(" +
                            initialX + "," +
                            initialY + ")"
                })
            passengers.selectAll("rect")
                .style("fill", "#4b371c")
                .style("opacity", 0.5)

            passengers.selectAll("rect")
                .transition().duration(t)
                    .attr("rx", 0)
                    .attr("ry", 0)
                    .attr("width", radius*2)
                    .attr("height", radius*2)

            globalState += 1
        }
        else if (globalState == 1) {
            radius = 4
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
                .attr("x", primaryContainerWidth/2-85)
            
            d3.select("#gs1LegendFemale")
                .transition()
                .duration(t)
                .attr("x", primaryContainerWidth/2+50)

            subHeadline.transition().duration(t/3).attr("x", primaryContainerWidth)
                .transition().duration(0)
                    .text("THERE ARE 843 MALE PASSENGERS, AND 466 FEMALE PASSENGERS ...")
                    .attr("x", -primaryContainerWidth)
                .transition().duration(t/3).attr("x", 10)
            
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
                        if (d.kSex == "female") { initialX = 407 + midBuffer + Math.floor( i_prime / numUnitsHigh ) * unitSize }
                        else                   { initialX = 407 - midBuffer - unitSize - Math.floor( (i_prime) / numUnitsHigh ) * unitSize }

                        return "translate(" +
                                initialX + "," +
                                initialY + ")"
                    })

            globalState += 1
        }
        else if (globalState == 2) {
        
            radius = 4
            let midBuffer = 50
            let classBuffer = 10
            let topBuffer = 0.05 * primaryContainerHeight
            let unitSize = radius*2 + 1
            let bottomBuffer = 0.8 * primaryContainerHeight
            let classHeight = (bottomBuffer-topBuffer)/3
            let numUnitsHigh = Math.floor((classHeight-classBuffer)/unitSize)

            gs1Legend.append("text")
                        .attr("id", "gs1Legend1st")
                        .text("First Class")
                        .attr("x", 407)
                        .attr("y", -100)
                        .style("font-style", "italic")
                        .style("font-size", "12px")
                        .style("text-anchor", "middle")
                        .style("vertical-align", "middle")
            gs1Legend.append("text")
                        .attr("id", "gs1Legend2nd")
                        .text("Second Class")
                        .attr("x", 407)
                        .attr("y", -100)
                        .style("font-style", "italic")
                        .style("font-size", "12px")
                        .style("text-anchor", "middle")
                        .style("vertical-align", "middle")
            gs1Legend.append("text")
                        .attr("id", "gs1Legend3rd")
                        .text("Third Class")
                        .attr("x", 407)
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


            subHeadline.transition().duration(t/3).attr("x", primaryContainerWidth)
                .transition().duration(0)
                    .text("326 IN FIRST CLASS, 272 IN SECOND CLASS, AND 706 IN THIRD CLASS ...")
                    .attr("x", -primaryContainerWidth)
                .transition().duration(t/3).attr("x", 10)
            
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
                        if (d.kSex == "female") { initialX = 407 + midBuffer + Math.floor( i_prime / numUnitsHigh ) * unitSize }
                        else                   { initialX = 407 - midBuffer - unitSize - Math.floor( (i_prime) / numUnitsHigh ) * unitSize }

                        return "translate(" +
                                initialX + "," +
                                initialY + ")"
                    })

            globalState += 1
        }
        else if (globalState == 3) {

            subHeadline.transition().duration(t/3).attr("x", primaryContainerWidth)
                .transition().duration(0)
                    .text("BREAKING NEWS - SURVIVORS HAVE BEEN IDENTIFIED ... ")
                    .attr("x", -primaryContainerWidth)
                .transition().duration(t/3).attr("x", 10)

            passengers.selectAll("rect")
                .transition().duration(t)
                .style("opacity", (d)=>(d.openmlsurvived == 1 ? 1 : 0.2))

            globalState += 1
        }
        else if (globalState == 4) {

            gs1Legend.selectAll("text").remove()

            subHeadline.transition().duration(t/3).attr("x", primaryContainerWidth)
                .transition().duration(0)
                    .text("BREAKING - NEWS FROM CARPATHIA ON SURVIVORS INCLUDING CREW ...")
                    .attr("x", -primaryContainerWidth)
                .transition().duration(t/3).attr("x", 10)

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
        else if (globalState == 5) {

            subHeadline.transition().duration(t/3).attr("x", primaryContainerWidth)
                .transition().duration(0)
                    .text("globalState == 5")
                    .attr("x", -primaryContainerWidth)
                .transition().duration(t/3).attr("x", 10)


            globalState = 0
        }
        else {

            subHeadline.transition().duration(t/3).attr("x", primaryContainerWidth)
                .transition().duration(0)
                    .text("globalState == 6")
                    .attr("x", -primaryContainerWidth)
                .transition().duration(t/3).attr("x", 10)


            passengers
                .transition()
                .duration((d,i)=>(i*2))
                .attr("transform", (d,i) => {
                    return "translate(" +
                            Math.floor(Math.random()*primaryContainerWidth) + "," +
                            Math.floor(Math.random()*primaryContainerHeight) + ")"
            })
            globalState = 0
        }

        })


    d3.selectAll("rect")
            .on("mouseover", (e,d)=>{
                defaultSC.selectAll("text").remove()
                defaultSC.append("text").text(getHTML(d))
            })
            .on("mouseout", (e,d)=>{
                defaultSC.selectAll("text").remove()
                for (let i = 0; i<10; i++) {defaultSC.append("text").text(lorem).attr("x", 0).attr("y", 15 + i*10).attr("font-size", "8pt")}
            })

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
