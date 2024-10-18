const width = 1400
const height = 700

const formatNumber = d3.format(",.1f")

const scaleFactor = Math.min(2800, window.innerWidth-20) / width
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
const bannerGroupText = bannerGroup.append("text").attr("x", 80).attr("y", 35).attr("fill", "white").text("D3 Dasher").attr("font-size", 25)

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


const sideBarWidth = 380
const sideBarHeight = 580
const sideBarLoc = {x: 985, y: 45}
const sideBarGroup = dasherContainer.append("g").attr("id", "sideBarGroup").attr("transform", `translate(${sideBarLoc.x}, ${sideBarLoc.y})`)
const sideBarRect = sideBarGroup.append("rect").attr("x", 0).attr("y", 0).attr("width", sideBarWidth).attr("height", sideBarHeight).attr("fill", "#2b3a44")

const chartAreaWidth = 960
const chartAreaHeight = 580
const chartAreaLoc = {x: 15, y: 45}
const chartAreaGroup = dasherContainer.append("g").attr("id", "chartAreaGroup").attr("transform", `translate(${chartAreaLoc.x}, ${chartAreaLoc.y})`)
const chartAreaRect = chartAreaGroup.append("rect").attr("x", 0).attr("y", 0).attr("width", chartAreaWidth).attr("height", chartAreaHeight).attr("fill", "#2b3a44")


// Create ui group

const uiGroup = svg.append("g").attr("id", "uiGroup").attr("transform", `translate(25, 55)`)
const uiGroupTitle = uiGroup.append("text").attr("x", 10).attr("y", 28).attr("fill", "white").text("Analysis").attr("font-size", 16)

const foreigner1 = uiGroup.append("foreignObject").attr("x", 100).attr("y", 13).attr("width", 150).attr("height", 20)
const dropdown1 = foreigner1.append("xhtml:select").attr("type", "select").attr("id", "dropdown1").attr("name", "dropdown1").attr("class", "form-select")
                    .style("inline", "true").style("font-size", "10px").style("width", "100%").style("height", "100%").style("border-radius", "5px")
                    .style("border", "1px solid black").style("padding", "2px").style("background-color", "#3d4c58").style("color", "white")
                    .style("outline", "none").style("cursor", "pointer")

const dropdown1Options = ["Penguins"]
dropdown1Options.forEach((option, i) => {
    dropdown1.append("xhtml:option").attr("value", option).text(option)
})
d3.select("#dropdown1").node().value = "Penguins"

const foreigner2 = uiGroup.append("foreignObject").attr("x", 260).attr("y", 13).attr("width", 150).attr("height", 20)
const dropdown2 = foreigner2.append("xhtml:select").attr("type", "select").attr("id", "dropdown2").attr("name", "dropdown2").attr("class", "form-select")
                    .style("inline", "true").style("font-size", "10px").style("width", "100%").style("height", "100%").style("border-radius", "5px")
                    .style("border", "1px solid black").style("padding", "2px").style("background-color", "#3d4c58").style("color", "white")
                    .style("outline", "none").style("cursor", "pointer")

const dropdown2Options = ["None", "species2", "island", "sex", "region", "yearEgg", "bodyMass", "culmenLength", "culmenDepth", "flipperLength"]
dropdown2Options.forEach((option, i) => {
    dropdown2.append("xhtml:option").attr("value", option).text(option)
})
d3.select("#dropdown2").node().value = "None"

const foreigner3 = uiGroup.append("foreignObject").attr("x", 420).attr("y", 13).attr("width", 150).attr("height", 20)
const dropdown3 = foreigner3.append("xhtml:select").attr("type", "select").attr("id", "dropdown3").attr("name", "dropdown3").attr("class", "form-select")
                    .style("inline", "true").style("font-size", "10px").style("width", "100%").style("height", "100%").style("border-radius", "5px")
                    .style("border", "1px solid black").style("padding", "2px").style("background-color", "#3d4c58").style("color", "white")
                    .style("outline", "none").style("cursor", "pointer")

const dropdown3Options = ["None", "species2", "island", "sex", "region", "yearEgg", "bodyMass", "culmenLength", "culmenDepth", "flipperLength"]
dropdown3Options.forEach((option, i) => {
    dropdown3.append("xhtml:option").attr("value", option).text(option)
})
d3.select("#dropdown3").node().value = "None"

const foreigner4 = uiGroup.append("foreignObject").attr("x", 580).attr("y", 13).attr("width", 150).attr("height", 20)
const dropdown4 = foreigner4.append("xhtml:select").attr("type", "select").attr("id", "dropdown4").attr("name", "dropdown4").attr("class", "form-select")
                    .style("inline", "true").style("font-size", "10px").style("width", "100%").style("height", "100%").style("border-radius", "5px")
                    .style("border", "1px solid black").style("padding", "2px").style("background-color", "#3d4c58").style("color", "white")
                    .style("outline", "none").style("cursor", "pointer")

const dropdown4Options = ["None", "species2", "island", "sex", "region", "yearEgg"]
dropdown4Options.forEach((option, i) => {
    dropdown4.append("xhtml:option").attr("value", option).text(option)
})
d3.select("#dropdown4").node().value = "None"

// foreigner5 should be a search box
const foreigner5 = uiGroup.append("foreignObject").attr("x", 740).attr("y", 13).attr("width", 150).attr("height", 20)
const searchBox = foreigner5.append("xhtml:input").attr("type", "text").attr("id", "searchBox").attr("name", "searchBox").attr("class", "form-select")
                    .style("inline", "true").style("font-size", "8px").style("width", "80%").style("height", "80%").style("border-radius", "5px")
                    .style("border", "1px solid black").style("padding", "1px").style("background-color", "#3d4c58").style("color", "white")
                    .style("outline", "none").style("cursor", "pointer").attr("placeholder", "Search...")
                    .attr("autocomplete", "off")

const uiGroupDropdownLabels = uiGroup.append("g").attr("id", "uiGroupDropdownLabels").attr("transform", `translate(103, 10)`)
const uiGroupDropdownLabel1 = uiGroupDropdownLabels.append("text").attr("x", 0).attr("y", 0).attr("fill", accentColor).text("Dataset").attr("font-size", 12)
const uiGroupDropdownLabel2 = uiGroupDropdownLabels.append("text").attr("x", 160).attr("y", 0).attr("fill", accentColor).text("Pivot X").attr("font-size", 12)
const uiGroupDropdownLabel3 = uiGroupDropdownLabels.append("text").attr("x", 320).attr("y", 0).attr("fill", accentColor).text("Pivot Y").attr("font-size", 12)
const uiGroupDropdownLabel4 = uiGroupDropdownLabels.append("text").attr("x", 480).attr("y", 0).attr("fill", accentColor).text("Color").attr("font-size", 12)
const uiGroupDropdownLabel5 = uiGroupDropdownLabels.append("text").attr("x", 640).attr("y", 0).attr("fill", accentColor).text("Search").attr("font-size", 12)

function go() {

    const promises = [d3.csv("./data/penguins2.csv")]
    Promise.all(promises).then(results=>{
        
        // Get data
        const penguinData = results[0]
        
        // Get dropdown1 value, reset others
        const dropdown1Value = d3.select("#dropdown1").node().value
        d3.select("#dropdown2").node().value = "None"
        d3.select("#dropdown3").node().value = "None"
        d3.select("#dropdown4").node().value = "None"
        d3.select("#searchBox").node().value = ""

        // Obtain dropdown values, will be defaults at this point
        let dropdown2Value = d3.select("#dropdown2").node().value
        let dropdown3Value = d3.select("#dropdown3").node().value
        let dropdown4Value = d3.select("#dropdown4").node().value

        // Reset previous dropdowns
        let dropdown2ValuePrevious = dropdown2Value
        let dropdown3ValuePrevious = dropdown3Value
        let dropdown4ValuePrevious = dropdown4Value


        /////////////////////////////////////////////
        // Create core objects
        /////////////////////////////////////////////

        const coreObjectsBuffer = 1
        const coreObjectsSpace = {x: chartAreaWidth-30, y: chartAreaHeight-100}
        const numCoreObjects = penguinData.length
        let coreObjectSize = getObjectSize(numCoreObjects, coreObjectsSpace, coreObjectsBuffer, 1)

        function getObjectSize(numObjects, space, buffer, startSize) {
            const stepSize = 0.4
            let sizeToReturn = startSize
            while (true) {
                let numObjectsWide = Math.floor(space.x / (sizeToReturn + buffer))
                let numObjectsHigh = Math.floor(space.y / (sizeToReturn + buffer))
                if (numObjectsWide * numObjectsHigh > numObjects) {
                    sizeToReturn+=stepSize
                }
                else {
                    sizeToReturn-=stepSize
                    break
                }
            }
            return sizeToReturn
        }

        const numObjectsWide = Math.floor(coreObjectsSpace.x / (coreObjectSize + coreObjectsBuffer))

        const coreObjectsGroup = chartAreaGroup.append("g").attr("id", "coreObjectsGroup").attr("transform", `translate(20, 20)`)
        const coreObjects = coreObjectsGroup.selectAll(".coreObject").data(penguinData).enter().append("g")
            .attr("class", "coreObject")
            .attr("transform", (d, i) => {
                let x = (i % numObjectsWide) * (coreObjectSize + coreObjectsBuffer)
                let y = Math.floor(i / numObjectsWide) * (coreObjectSize + coreObjectsBuffer)
                return `translate(${x}, ${y})`
            })
            .on("mouseover", (event, d) => {
                updateSideBar(d)
            })
        const coreObjectsRects = coreObjects.append("rect").attr("x", 0).attr("y", 0).attr("width", coreObjectSize).attr("height", coreObjectSize)
                    // .attr("fill", d=>colorCategorical(d['Species']))
                    .attr("fill", "Gray")


        // Event listeners on dropdowns and searchbox
        d3.select("#dropdown2").on("change", updateData)
        d3.select("#dropdown3").on("change", updateData)
        d3.select("#dropdown4").on("change", updateData)
        d3.select("#searchBox").on("keyup", handleSearch)

        function updateData() {

            dropdown2ValuePrevious = dropdown2Value
            dropdown3ValuePrevious = dropdown3Value
            dropdown4ValuePrevious = dropdown4Value

            dropdown2Value = d3.select("#dropdown2").node().value
            dropdown3Value = d3.select("#dropdown3").node().value
            dropdown4Value = d3.select("#dropdown4").node().value

            rerender()

        }

        function rerender() {
            if (dropdown2Value != dropdown2ValuePrevious) {
                if (dropdown2Value == "None" && dropdown3Value == "None") resetCoreObjectsPositions();
                else if (dropdown2Value != "None" && dropdown3Value == "None") pivotXCoreObjects();
                else if (dropdown2Value == "None" && dropdown3Value != "None") pivotYCoreObjects();
                else if (dropdown2Value != "None" && dropdown3Value != "None") pivotXYCoreObjects();
            }
            else if (dropdown3Value != dropdown3ValuePrevious) {
                if (dropdown2Value == "None" && dropdown3Value == "None") resetCoreObjectsPositions();
                else if (dropdown2Value != "None" && dropdown3Value == "None") pivotXCoreObjects();
                else if (dropdown2Value == "None" && dropdown3Value != "None") pivotYCoreObjects();
                else if (dropdown2Value != "None" && dropdown3Value != "None") pivotXYCoreObjects();
            }
            else if (dropdown4Value != dropdown4ValuePrevious) {
                colorCoreObjects();
            }
        }

        function resetCoreObjectsPositions() {

            chartAreaGroup.selectAll("#xAxis").remove()
            chartAreaGroup.selectAll("#yAxis").remove()
            chartAreaGroup.selectAll("#locAxis").remove()

            let uniqueValuesColors = []
            if (dropdown4Value!="None") uniqueValuesColors = Array.from(new Set(penguinData.map(d=>d[dropdown4Value])));
            let offsetList = []
            for (let i=0; i<uniqueValuesColors.length; i++) {
                if (i==0) offsetList.push(0); 
                else offsetList.push(offsetList[i-1] + penguinData.filter(item=>item[dropdown4Value]==uniqueValuesColors[i-1]).length);
            }

            coreObjects.transition().duration(transitionDuration).attr("transform", (d, i) => {
                let filteredData = penguinData.filter(item=>item[dropdown4Value] == d[dropdown4Value])
                let iPrime = filteredData.findIndex(e=>e.uniqueID==d.uniqueID)  // index of d within filteredData
                let iPrimePrime = (dropdown4Value == "None") ? i : iPrime + offsetList[uniqueValuesColors.indexOf(d[dropdown4Value])]
                let x = (iPrimePrime % numObjectsWide) * (coreObjectSize + coreObjectsBuffer)
                let y = Math.floor(iPrimePrime / numObjectsWide) * (coreObjectSize + coreObjectsBuffer)
                return `translate(${x}, ${y})`
            })
            coreObjectsRects.transition().duration(transitionDuration)
                .attr("width", coreObjectSize)
                .attr("height", coreObjectSize)
        }

        function pivotXCoreObjects(resetAxesFlag=true) {
            const pivotValues = Array.from(new Set(penguinData.map(d=>d[dropdown2Value]))).sort()
            
            let xScaleX = d3.scaleBand().domain(pivotValues).range([0, coreObjectsSpace.x]).padding(0.1)

            const objectsSpaceX = {x: xScaleX.bandwidth(), y: 450}
            let objecttSizeXPivot = 40
            pivotValues.forEach((value, i) => {
                const numObjXThisValue = penguinData.filter(d=>d[dropdown2Value]==value).length
                const thisValueObjSize = getObjectSize(numObjXThisValue, objectsSpaceX, coreObjectsBuffer, 1)
                objecttSizeXPivot = (thisValueObjSize < objecttSizeXPivot) ? thisValueObjSize : objecttSizeXPivot
            })
            let numObjectsWidePivot = Math.floor(xScaleX.bandwidth() / (objecttSizeXPivot + coreObjectsBuffer))

            if (resetAxesFlag) {
                chartAreaGroup.selectAll("#xAxis").remove()
                chartAreaGroup.selectAll("#yAxis").remove()
                chartAreaGroup.selectAll("#locAxis").remove()

                const xAxisX = chartAreaGroup.append("g").attr("id", "xAxis").attr("transform", `translate(20, 20)`)
                const xAxisLabels = xAxisX.selectAll("text").data(pivotValues).enter().append("text")
                    .text(d=>d).attr("x", ()=>Math.random()*chartAreaWidth).attr("y", -100).attr("text-anchor", "start").attr("fill", "white").attr("font-size", 12)
                    .attr("display", (d,i)=>(pivotValues.length>10 && i%Math.floor(pivotValues.length/7)!=0) ? "none" : "block")
                xAxisLabels.transition().duration(transitionDuration).attr("y", 0).attr("x", d=>xScaleX(d))
            }
            
            const colorValues = Array.from(new Set(penguinData.map(d=>d[dropdown4Value])))

            let offsetObjects = []
            pivotValues.forEach((value, i) => {
                let offsetList = []
                for (let j=0; j<colorValues.length; j++) {
                    if (j==0) offsetList.push(0);
                    else offsetList.push(offsetList[j-1] + penguinData.filter(item=>item[dropdown4Value]==colorValues[j-1] && item[dropdown2Value]==value).length)
                }
                offsetObjects.push({category: value, offsets: offsetList})
            })

            coreObjects.transition().duration(transitionDuration)
                .attr("transform", (d, i) => {
                    let filteredData = penguinData.filter(item=>item[dropdown2Value] == d[dropdown2Value] && item[dropdown4Value] == d[dropdown4Value])
                    let iPrime = filteredData.findIndex(e=>e.uniqueID==d.uniqueID)  // index of d within filteredData
                    let iPrimePrime = (dropdown4Value == "None") ? iPrime : iPrime + offsetObjects.find(e=>e.category==d[dropdown2Value]).offsets[colorValues.indexOf(d[dropdown4Value])]
                    let x = xScaleX(d[dropdown2Value]) + (iPrimePrime % numObjectsWidePivot) * (objecttSizeXPivot + coreObjectsBuffer)
                    let y = Math.floor(iPrimePrime / numObjectsWidePivot) * (objecttSizeXPivot + coreObjectsBuffer)
                    return `translate(${x}, ${10+y})`
                })

            coreObjectsRects.transition().duration(transitionDuration)
                .attr("width", objecttSizeXPivot)
                .attr("height", objecttSizeXPivot)
        }

        function pivotYCoreObjects(resetAxesFlag=true) {
            const pivotValues = Array.from(new Set(penguinData.map(d=>d[dropdown3Value]))).sort()
            let yScaleY = d3.scaleBand().domain(pivotValues).range([0, coreObjectsSpace.y]).padding(0.1)

            const objectsSpaceY = {x: 800, y: yScaleY.bandwidth()}
            let objecttSizeYPivot = 40
            pivotValues.forEach((value, i) => {
                const numObjYThisValue = penguinData.filter(d=>d[dropdown3Value]==value).length
                const thisValueObjSize = getObjectSize(numObjYThisValue, objectsSpaceY, coreObjectsBuffer, 1)
                objecttSizeYPivot = (thisValueObjSize < objecttSizeYPivot) ? thisValueObjSize : objecttSizeYPivot
            })
            let numObjectsHighPivot = Math.floor(yScaleY.bandwidth() / (objecttSizeYPivot + coreObjectsBuffer))

            if (resetAxesFlag) {
                chartAreaGroup.selectAll("#xAxis").remove()
                chartAreaGroup.selectAll("#yAxis").remove()
                chartAreaGroup.selectAll("#locAxis").remove()
                
                const yAxisY = chartAreaGroup.append("g").attr("id", "yAxis").attr("transform", `translate(20, 20)`)
                const yAxisLabels = yAxisY.selectAll("text").data(pivotValues).enter().append("text")
                    .text(d=>d).attr("y", ()=>Math.random()*chartAreaHeight).attr("x", -100).attr("text-anchor", "end").attr("fill", "white").attr("font-size", 12)
                    .attr("display", (d,i)=>(pivotValues.length>10 && i%Math.floor(pivotValues.length/7)!=0) ? "none" : "block")
                yAxisLabels.transition().duration(transitionDuration).attr("x", 60).attr("y", d=>12+yScaleY(d))

            }

            const colorValues = Array.from(new Set(penguinData.map(d=>d[dropdown4Value])))

            let offsetObjects = []
            pivotValues.forEach((value, i) => {
                let offsetList = []
                for (let j=0; j<colorValues.length; j++) {
                    if (j==0) offsetList.push(0);
                    else offsetList.push(offsetList[j-1] + penguinData.filter(item=>item[dropdown4Value]==colorValues[j-1] && item[dropdown3Value]==value).length)
                }
                offsetObjects.push({category: value, offsets: offsetList})
            })

            coreObjects.transition().duration(transitionDuration)
                .attr("transform", (d, i) => {
                    let filteredData = penguinData.filter(item=>item[dropdown3Value] == d[dropdown3Value] && item[dropdown4Value] == d[dropdown4Value])
                    let iPrime = filteredData.findIndex(e=>e.uniqueID==d.uniqueID)  // index of d within filteredData
                    let iPrimePrime = (dropdown4Value == "None") ? iPrime : iPrime + offsetObjects.find(e=>e.category==d[dropdown3Value]).offsets[colorValues.indexOf(d[dropdown4Value])]
                    let x = Math.floor(iPrimePrime / numObjectsHighPivot) * (objecttSizeYPivot + coreObjectsBuffer)
                    let y = yScaleY(d[dropdown3Value]) + (iPrimePrime % numObjectsHighPivot) * (objecttSizeYPivot + coreObjectsBuffer)
                    return `translate(${x+70}, ${y})`
                })

            coreObjectsRects.transition().duration(transitionDuration)
                .attr("width", objecttSizeYPivot)
                .attr("height", objecttSizeYPivot)

        }

        function pivotXYCoreObjects(resetAxesFlag=true) {
            const pivotValuesX = Array.from(new Set(penguinData.map(d=>d[dropdown2Value]))).sort()
            const pivotValuesY = Array.from(new Set(penguinData.map(d=>d[dropdown3Value]))).sort()

            let xScaleCross = d3.scaleBand().domain(pivotValuesX).range([20, 800]).padding(0.1)
            let yScaleCross = d3.scaleBand().domain(pivotValuesY).range([0, 500]).padding(0.1)
            
            const objectsSpaceCross = {x: xScaleCross.bandwidth(), y: yScaleCross.bandwidth()}
            let objectSizeCrossPivot = 45
            pivotValuesX.forEach((value, i) => {
                pivotValuesY.forEach((value2, j) => {
                    const numObjCrossThisValue = penguinData.filter(d=>d[dropdown2Value]==value && d[dropdown3Value]==value2).length
                    const thisValueObjSize = getObjectSize(numObjCrossThisValue, objectsSpaceCross, coreObjectsBuffer, 1)
                    objectSizeCrossPivot = (thisValueObjSize < objectSizeCrossPivot) ? thisValueObjSize : objectSizeCrossPivot
                })
            })
            let numObjectsWidePivot = Math.floor(xScaleCross.bandwidth() / (objectSizeCrossPivot + coreObjectsBuffer))
            const continuousList = ["bodyMass", "culmenLength", "culmenDepth", "flipperLength"]
            let opacityToUse = 1
            if (continuousList.includes(dropdown2Value) && continuousList.includes(dropdown3Value)) {
                objectSizeCrossPivot = 10
                numObjectsWidePivot = 1
                opacityToUse = 0.8
            }
            
            if (resetAxesFlag) {
                chartAreaGroup.selectAll("#xAxis").remove()
                chartAreaGroup.selectAll("#yAxis").remove()
                chartAreaGroup.selectAll("#locAxis").remove()

                const xAxisX = chartAreaGroup.append("g").attr("id", "xAxis").attr("transform", `translate(20, 20)`)
                const xAxisLabels = xAxisX.selectAll("text").data(pivotValuesX).enter().append("text")
                    .text(d=>d).attr("x", ()=>Math.random()*chartAreaWidth).attr("y", -100).attr("text-anchor", "start").attr("fill", "white").attr("font-size", 12)
                    .attr("display", (d,i)=>(pivotValuesX.length>10 && i%Math.floor(pivotValuesX.length/7)!=0) ? "none" : "block")
                xAxisLabels.transition().duration(transitionDuration).attr("y", 0).attr("x", d=>40+xScaleCross(d))

                const yAxisY = chartAreaGroup.append("g").attr("id", "yAxis").attr("transform", `translate(20, 20)`)
                const yAxisLabels = yAxisY.selectAll("text").data(pivotValuesY).enter().append("text")
                    .text(d=>d).attr("y", ()=>Math.random()*chartAreaHeight).attr("x", -100).attr("text-anchor", "end").attr("fill", "white").attr("font-size", 12)
                    .attr("display", (d,i)=>(pivotValuesY.length>10 && i%Math.floor(pivotValuesY.length/7)!=0) ? "none" : "block")
                yAxisLabels.transition().duration(transitionDuration).attr("x", 60).attr("y", d=>12+yScaleCross(d))
            }

            const colorValues = Array.from(new Set(penguinData.map(d=>d[dropdown4Value])))
            let offsetObjects = []

            pivotValuesX.forEach((valueX, i) => {
                pivotValuesY.forEach((valueY, j) => {
                    let offsetList = []
                    for (let k=0; k<colorValues.length; k++) {
                        if (k==0) offsetList.push(0);
                        else offsetList.push(offsetList[k-1] + penguinData.filter(item=>item[dropdown4Value]==colorValues[k-1] && item[dropdown2Value]==valueX && item[dropdown3Value]==valueY).length)
                    }
                    offsetObjects.push({categoryX: valueX, categoryY: valueY, offsets: offsetList})
                })
            })

            coreObjects.transition().duration(transitionDuration)
                .attr("transform", (d, i) => {
                    let filteredData = penguinData.filter(item=>item[dropdown2Value] == d[dropdown2Value] && item[dropdown3Value] == d[dropdown3Value] && item[dropdown4Value] == d[dropdown4Value])
                    let iPrime = filteredData.findIndex(e=>e.uniqueID==d.uniqueID)  // index of d within filteredData
                    let iPrimePrime = (dropdown4Value == "None") ? iPrime : iPrime + offsetObjects.find(e=>e.categoryX==d[dropdown2Value] && e.categoryY==d[dropdown3Value]).offsets[colorValues.indexOf(d[dropdown4Value])]
                    let x = xScaleCross(d[dropdown2Value]) + (iPrimePrime % numObjectsWidePivot) * (objectSizeCrossPivot + coreObjectsBuffer)
                    let y = yScaleCross(d[dropdown3Value]) + Math.floor(iPrimePrime / numObjectsWidePivot) * (objectSizeCrossPivot + coreObjectsBuffer)
                    return `translate(${40+x}, ${y})`
                })
                .style("opacity", opacityToUse)

            coreObjectsRects.transition().duration(transitionDuration)
                .attr("width", objectSizeCrossPivot)
                .attr("height", objectSizeCrossPivot)



        }

        function renderKey() {
            // Render key

            let uniqueValuesForKey = [...new Set(penguinData.map(item=>item[dropdown4Value]))].sort()
            if (dropdown4Value == "None") uniqueValuesForKey = ["None"]
            console.log(uniqueValuesForKey)

            d3.select("#keyGroup").remove()

            const keyGroup = chartAreaGroup.append("g").attr("id", "keyGroup").attr("transform", `translate(${chartAreaWidth-600}, ${chartAreaHeight-40})`)
            const keyGroupRect = keyGroup.append("rect").attr("x", 0).attr("y", 0).attr("width", 600).attr("height", 40).attr("fill", "#000")//.attr("fill", "#3d4c58")
            const keyGroupTitle = keyGroup.append("text").attr("x", 10).attr("y", 25).attr("fill", accentColor).text("Key").attr("font-size", 16)
            const keyGroupItems = keyGroup.selectAll(".keyGroupItem").data(uniqueValuesForKey).enter().append("g")
                .attr("class", "keyGroupItem")
                .attr("transform", (d, i) => {
                    let lengthRemaining = 600-20
                    let numItems = uniqueValuesForKey.length
                    let widthItem = lengthRemaining / numItems
                    return `translate(${20+(i+0.5)*widthItem}, ${5})`
                })
            const keyGroupItemRects = keyGroupItems.append("rect").attr("x", 0).attr("y", 0).attr("width", 15).attr("height", 15).attr("fill", d=>(d=="None"?"Gray":colorCategorical(d)))
            const keyGroupItemTexts = keyGroupItems.append("text").attr("x", 15/2).attr("y", 30).attr("fill", "white").text(d=>d).attr("font-size", 12).attr("text-anchor", "middle")

        }

        async function colorCoreObjects() {

            renderKey()

            // Color core objects

            if (dropdown4Value == "None") {
                await coreObjectsRects.transition().duration(transitionDuration).attr("fill", "Gray")
            }
            else {
                const pivotValues = Array.from(new Set(penguinData.map(d=>d[dropdown4Value])))
                const pivotValuesDict = {}
                pivotValues.forEach((value, i) => {
                    pivotValuesDict[value] = i
                })
                await coreObjectsRects.transition().duration(transitionDuration).attr("fill", d=>colorCategorical(d[dropdown4Value])).end()
            }

            if (dropdown4Value != "None") {
                if (dropdown2Value == "None" && dropdown3Value == "None") resetCoreObjectsPositions();
                else if (dropdown2Value != "None" && dropdown3Value == "None") pivotXCoreObjects(false);
                else if (dropdown2Value == "None" && dropdown3Value != "None") pivotYCoreObjects(false);
                else if (dropdown2Value != "None" && dropdown3Value != "None") pivotXYCoreObjects(false);
            }
        }


        function updateSideBar(data) {

            sideBarGroup.selectAll("g").remove()

            const sideBarTitle = sideBarGroup.append("text").attr("x", 10).attr("y", 28).attr("fill", "white").text("Details").attr("font-size", 16)

            const sideBarDetailsGroup = sideBarGroup.append("g").attr("id", "sideBarDetailsGroup").attr("transform", `translate(10, 50)`)
            const sideBarDetails = sideBarDetailsGroup.selectAll(".sideBarDetail").data(Object.keys(data)).enter().append("g")
                .attr("class", "sideBarDetail")
                .attr("transform", (d, i) => {
                    return `translate(0, ${i*20})`
                })
            const sideBarDetailsText = sideBarDetails.append("text").attr("x", 0).attr("y", 0).attr("fill", "white").text((d, i) => {
                return `${d}: ${data[d]}`
            }).attr("font-size", 12)

            
        }

        function handleSearch() {
            const searchTerm = d3.select("#searchBox").node().value.toLowerCase()
            d3.selectAll(".coreObject").style("opacity", d=>{
                let opacityToReturn = 1
                let textToSearch = d.island.toLowerCase() + " " + d.species.toLowerCase()
                if (!textToSearch.includes(searchTerm)) opacityToReturn = 0.1
                return opacityToReturn
            })
        }

        colorCoreObjects()


    })




}

go()