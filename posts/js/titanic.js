const width = 1400
const height = 2050
const primaryContainerWidth = 1000
const primaryContainerHeight = 480
const secondaryContainerWidth = 1400-80
const secondaryContainerHeight = 360
const passengerDetailContainerWidth = 310
const passengerDetailContainerHeight = 380
const temperatureContainerHeight = 260
const depthContainerHeight = 640
const tertiaryContainerWidth = primaryContainerWidth
const tertiaryContainerHeight = 500
const lifeboatsContainerWidth = primaryContainerWidth
const lifeboatsContainerHeight = 400
const creditsContainerHeight = 90
const scaleFactor = window.innerWidth/width
const yTranslateMe = (scaleFactor*height - height)/2
const xTranslateMe = (scaleFactor*width - width)/2
const bottomOfPrimaryContainer = (110 + primaryContainerHeight)*scaleFactor+yTranslateMe

const svgFrontPage = d3.select("#viz-div").append("svg").attr("width", width).attr("height", height).style("opacity", 1)
svgFrontPage.attr("viewBox", `0 0 ${width} ${height}`).attr("preserveAspectRatio", "xMidYMid meet")

const masthead = svgFrontPage.append("g").attr("id", "masthead")

const newspaperName = "The New York Gazette."
const mainHero = masthead.append("g").attr("id", "mainHero").attr("transform", "translate(" + width/2 + ",44)")
mainHero.append("text").attr("x", 0).attr("y", 0).text(newspaperName).attr("text-anchor", "middle").attr("font-family", "chomsky").attr("font-size", "42pt")

const fitsThePrint = masthead.append("g").attr("id", "fitsThePrint").attr("transform", "translate(50,7)")
fitsThePrint.append("rect").attr("class", "mastheadRect").attr("x", 0).attr("y", 0).attr("width", 150).attr("height", 45).attr("stroke", "black").attr("fill", "none")
fitsThePrint.append("text").attr("x", 75).attr("y", 20).text('"All the News That').attr("text-anchor", "middle").attr("font-size", "10pt").style("font-family", "Castoro, serif").style("font-weight", "bold")
fitsThePrint.append("text").attr("x", 75).attr("y", 35).text('Fits the Print"').attr("text-anchor", "middle").attr("font-size", "10pt").style("font-family", "Castoro, serif").style("font-weight", "bold")

const theWeather = masthead.append("g").attr("id", "theWeather").attr("transform", `translate(${width-200},7)`)
theWeather.append("rect").attr("class", "mastheadRect").attr("x", 0).attr("y", 0).attr("width", 150).attr("height", 45).attr("stroke", "black").attr("fill", "none")
theWeather.append("text").attr("x", 75).attr("y", 13).text("THE WEATHER").attr("text-anchor", "middle").attr("font-size", "6pt").attr("font-weight", "bold").style("font-family", "'Roboto', sans-serif")
theWeather.append("line").attr("x1", 35).attr("x2", 115).attr("y1", 16).attr("y2", 16).attr("stroke", "black")
theWeather.append("text").attr("x", 75).attr("y", 23).text("Unsettled Tuesday; Wednesday,").attr("text-anchor", "middle").attr("font-size", "4.5pt")
theWeather.append("text").attr("x", 75).attr("y", 29).text("fair, cooler; moderate southerly").attr("text-anchor", "middle").attr("font-size", "4.5pt")
theWeather.append("text").attr("x", 75).attr("y", 35).text("winds, becoming variable.").attr("text-anchor", "middle").attr("font-size", "4.5pt")
theWeather.append("text").attr("x", 75).attr("y", 40).text("For full weather report see Page 21.").attr("text-anchor", "middle").attr("font-size", "3pt")

const dateLine = masthead.append("g").attr("id", "dateLine").attr("transform", "translate(40,58)")
dateLine.append("line").attr("x1", 0).attr("x2", width-80).attr("y1", 0).attr("y2", 0).attr("stroke", "black")
dateLine.append("line").attr("x1", 0).attr("x2", width-80).attr("y1", 2).attr("y2", 2).attr("stroke", "black")
dateLine.append("line").attr("x1", 0).attr("x2", width-80).attr("y1", 14).attr("y2", 14).attr("stroke", "black")
dateLine.append("line").attr("x1", 0).attr("x2", width-80).attr("y1", 16).attr("y2", 16).attr("stroke", "black")
dateLine.append("text").attr("x", 10).attr("y", 11).text("VOL. LXI . NO. 15,806").attr("text-anchor", "left").attr("font-size", "6pt").attr("font-weight", "bold")
dateLine.append("text").attr("x", width/2-40).attr("y", 11).text("NEW YORK, TUESDAY, APRIL 16, 1912. - TWENTY-FOUR PAGES,").attr("text-anchor", "middle").attr("font-size", "6pt").attr("font-weight", "bold")
dateLine.append("text").attr("x", width-250).attr("y", 11).text("ONE CENT").attr("font-size", "6pt").attr("font-weight", "bold")
dateLine.append("text").attr("x", width-165).attr("y", 7.5).text("In Greater New York,").attr("text-anchor", "middle").attr("font-size", "4pt")
dateLine.append("text").attr("x", width-165).attr("y", 12).text("Jersey City, and Newark.").attr("text-anchor", "middle").attr("font-size", "4pt")
dateLine.append("line").attr("x1", width-125).attr("x2", width-125).attr("y1", 5).attr("y2", 12).attr("stroke", "black").style("stroke-width", 0.5)
dateLine.append("text").attr("x", width-105).attr("y", 7).text("Elsewhere").attr("text-anchor", "middle").attr("font-size", "3pt")
dateLine.append("text").attr("x", width-105).attr("y", 11.5).text("TWO CENTS").attr("text-anchor", "middle").attr("font-size", "3pt")

const mainHeadline = masthead.append("g").attr("id", "mainHeadline").attr("transform", `translate( ${width/2-160} ,110)`)
mainHeadline.append("text").attr("x", 0).attr("y", 0).attr("id", "mainHeadlineText").text("TITANIC SINKS AFTER HITTING ICEBERG; 1,500 SOULS LOST").attr("text-anchor", "middle").attr("font-size", "24pt").attr("font-family", "Castoro Titling").style("font-weight", "bold")

const primaryContainer = svgFrontPage.append("g").attr("id", "primaryContainer").attr("transform", "translate(40,125) scale(1,1)")
primaryContainer.append("rect").attr("class", "primaryContainerRect").attr("x", 0).attr("y", 0).attr("width", primaryContainerWidth).attr("height", primaryContainerHeight).attr("stroke", "black").attr("fill", "none")
// primaryContainer.append("line").attr("class", "primaryContainerRect").attr("x1", 0).attr("y1", 0).attr("x2", primaryContainerWidth).attr("y2", 0).attr("stroke", "black").attr("fill", "none")
// primaryContainer.append("line").attr("class", "primaryContainerRect").attr("x1", 0).attr("y1", primaryContainerHeight).attr("x2", primaryContainerWidth).attr("y2", primaryContainerHeight).attr("stroke", "black").attr("fill", "none")

const secondaryContainer = svgFrontPage.append("g").attr("id", "secondaryContainer").attr("transform", "translate(40,615)")
secondaryContainer.append("rect").attr("class", "secondaryContainerRect").attr("x", 0).attr("y", 0).attr("width", secondaryContainerWidth).attr("height", secondaryContainerHeight).attr("stroke", "black").attr("fill", "none")
// secondaryContainer.append("line").attr("class", "secondaryContainerRect").attr("x1", 0).attr("y2", 0).attr("x2", secondaryContainerWidth).attr("y2", 0).attr("stroke", "black").attr("fill", "none")
// secondaryContainer.append("line").attr("class", "secondaryContainerRect").attr("x1", 0).attr("y1", secondaryContainerHeight).attr("x2", secondaryContainerWidth).attr("y2", secondaryContainerHeight).attr("stroke", "black").attr("fill", "none")

const passengerDetailContainer = svgFrontPage.append("g").attr("id", "passengerDetailContainer").attr("transform", `translate(${width-350},225)`)
passengerDetailContainer.append("rect").attr("class", "passengerDetailContainerRect").attr("x", 0).attr("y", 0).attr("width", passengerDetailContainerWidth).attr("height", passengerDetailContainerHeight).attr("stroke", "black").attr("fill", "none")
// passengerDetailContainer.append("line").attr("class", "passengerDetailContainerRect").attr("x1", 0).attr("y2", 0).attr("x2", 0).attr("y2", passengerDetailContainerHeight).attr("stroke", "black").attr("fill", "none")
// passengerDetailContainer.append("line").attr("class", "passengerDetailContainerRect").attr("x1", passengerDetailContainerWidth).attr("y2", 0).attr("x2", passengerDetailContainerWidth).attr("y2", passengerDetailContainerHeight).attr("stroke", "black").attr("fill", "none")

const temperatureContainer = svgFrontPage.append("g").attr("id", "temperatureContainer").attr("transform", `translate(${width-350},${615+secondaryContainerHeight+10})`)
temperatureContainer.append("rect").attr("class", "temperatureContainerRect").attr("x", 0).attr("y", 0).attr("width", passengerDetailContainerWidth).attr("height", temperatureContainerHeight).attr("stroke", "black").attr("fill", "none")
// temperatureContainer.append("line").attr("class", "temperatureContainerRect").attr("x1", passengerDetailContainerWidth).attr("y1", 0).attr("x2", passengerDetailContainerWidth).attr("y2", temperatureContainerHeight+10+depthContainerHeight).attr("stroke", "black").attr("fill", "none")
// temperatureContainer.append("line").attr("class", "temperatureContainerRect").attr("x1", 0).attr("y1", 0).attr("x2", 0).attr("y2", temperatureContainerHeight+10+depthContainerHeight).attr("stroke", "black").attr("fill", "none")
// temperatureContainer.append("line").attr("class", "temperatureContainerRect").attr("x1", 10).attr("y1", temperatureContainerHeight).attr("x2", passengerDetailContainerWidth-10).attr("y2", temperatureContainerHeight).attr("stroke", "black").attr("fill", "none")

const depthContainer = svgFrontPage.append("g").attr("id", "depthContainer").attr("transform", `translate(${width-350},${615+secondaryContainerHeight+10+temperatureContainerHeight+10})`)
// depthContainer.append("line").attr("class", "depthContainerRect").attr("x1", passengerDetailContainerWidth).attr("y1", 0).attr("x2", passengerDetailContainerWidth).attr("y2", depthContainerHeight).attr("stroke", "black").attr("fill", "none")
depthContainer.append("rect").attr("class", "depthContainerRect").attr("x", 0).attr("y", 0).attr("width", passengerDetailContainerWidth).attr("height", depthContainerHeight).attr("stroke", "black").attr("fill", "none")

const tertiaryContainer = svgFrontPage.append("g").attr("id", "tertiaryContainer").attr("transform", `translate(40,${615+secondaryContainerHeight+lifeboatsContainerHeight+10+10})`)
tertiaryContainer.append("rect").attr("x", 0).attr("y", 0).attr("width", tertiaryContainerWidth).attr("height", tertiaryContainerHeight).attr("stroke", "black").attr("fill", "none")
// tertiaryContainer.append("line").attr("class", "tertiaryContainerRect").attr("x1", 10).attr("y1", 0).attr("x2", tertiaryContainerWidth).attr("y2", 0).attr("stroke", "black").attr("fill", "none")

const lifeboatsContainer = svgFrontPage.append("g").attr("id", "lifeboatsContainer").attr("transform", `translate(${40},${615+secondaryContainerHeight+10})`)
lifeboatsContainer.append("rect").attr("class", "lifeboatsContainerrRect").attr("x", 0).attr("y", 0).attr("width", primaryContainerWidth).attr("height", lifeboatsContainerHeight).attr("stroke", "black").attr("fill", "none")
// lifeboatsContainer.append("line").attr("class", "lifeboatsContainerRect").attr("x1", 0).attr("y1", 0).attr("x2", 0).attr("y2", depthContainerHeight+10+temperatureContainerHeight).attr("stroke", "black").attr("fill", "none")
// lifeboatsContainer.append("line").attr("class", "lifeboatsContainerRect").attr("x1", lifeboatsContainerWidth).attr("y1", 0).attr("x2", lifeboatsContainerWidth).attr("y2", temperatureContainerHeight+10+depthContainerHeight).attr("stroke", "black").attr("fill", "none")

const creditsGap = 220
const creditsStart0 = 160
const creditsStart1 = creditsStart0+175
const creditsStart2 = creditsStart1+200
const creditsStart3 = creditsStart2+215
const creditsStart4 = creditsStart3+205
const creditsStartY = 20
const creditsGapY = 15
const creditsContainer = svgFrontPage.append("g").attr("id", "creditsContainer").attr("transform", `translate(${40},${615+secondaryContainerHeight+10+temperatureContainerHeight+10+depthContainerHeight+10})`)
creditsContainer.append("rect").attr("x", 0).attr("y", 0).attr("width", width-80).attr("height", creditsContainerHeight).attr("stroke", "black").attr("fill", "none")
// creditsContainer.append("line").attr("x1", 0).attr("y1", 0).attr("x2", width-80).attr("y2", 0).attr("stroke", "black").attr("fill", "none")
// creditsContainer.append("line").attr("x1", 0).attr("y1", creditsContainerHeight).attr("x2", width-80).attr("y2", creditsContainerHeight).attr("stroke", "black").attr("fill", "none")
creditsContainer.append("text").attr("x", 15).attr("y", creditsStartY).text("Sources of data").attr("font-size", "8pt").attr("font-weight", "bold")
creditsContainer.append("text").attr("x", 15).attr("y", creditsStartY+creditsGapY*1).text("and inspiration:").attr("font-size", "8pt").attr("font-weight", "bold")

creditsContainer.append("a").attr("href", "https://www.lva.virginia.gov/exhibits/titanic/index.php").attr("target", "_blank")
    .append("text").attr("x", creditsStart0).attr("y", creditsStartY).text("Titanic: Black and White").attr("font-size", "8pt").attr("font-weight", "bold").style("text-decoration", "underline")
creditsContainer.append("a").attr("href", "http://www.titanicology.com/").attr("target", "_blank")
    .append("text").attr("x", creditsStart1).attr("y", creditsStartY).text("Titanicology").attr("font-size", "8pt").attr("font-weight", "bold").style("text-decoration", "underline")
creditsContainer.append("a").attr("href", "http://www.paullee.com/titanic/index.php").attr("target", "_blank")
    .append("text").attr("x", creditsStart2).attr("y", creditsStartY).text("Paul Lee's Titanic Pages").attr("font-size", "8pt").attr("font-weight", "bold").style("text-decoration", "underline")
creditsContainer.append("a").attr("href", "https://api.openml.org/d/40945").attr("target", "_blank")
    .append("text").attr("x", creditsStart3).attr("y", creditsStartY).text("Titanic Open ML dataset").attr("font-size", "8pt").attr("font-weight", "bold").style("text-decoration", "underline")
creditsContainer.append("a").attr("href", "https://www.kaggle.com/competitions/titanic").attr("target", "_blank")
    .append("text").attr("x", creditsStart4).attr("y", creditsStartY).text("Kaggle - Titanic Machine Learning").attr("font-size", "8pt").attr("font-weight", "bold").style("text-decoration", "underline")

creditsContainer.append("a").attr("href", "https://www.encyclopedia-titanica.org/").attr("target", "_blank")
    .append("text").attr("x", creditsStart0).attr("y", creditsStartY+creditsGapY*1).text("Encyclopedia Titanica").attr("font-size", "8pt").attr("font-weight", "bold").style("text-decoration", "underline")
creditsContainer.append("a").attr("href", "https://www.titanicinquiry.org/").attr("target", "_blank")
    .append("text").attr("x", creditsStart1).attr("y", creditsStartY+creditsGapY*1).text("Titanic Inquiry Project").attr("font-size", "8pt").attr("font-weight", "bold").style("text-decoration", "underline")
creditsContainer.append("a").attr("href", "https://www.datavis.ca/papers/titanic/").attr("target", "_blank")
    .append("text").attr("x", creditsStart2).attr("y", creditsStartY+creditsGapY*1).text("100+ Years of Titanic Graphs").attr("font-size", "8pt").attr("font-weight", "bold").style("text-decoration", "underline")
creditsContainer.append("a").attr("href", "https://www.ggarchives.com/OceanTravel/Titanic/index.html").attr("target", "_blank")
    .append("text").attr("x", creditsStart3).attr("y", creditsStartY+creditsGapY*1).text("GG Archives Titanic Pages").attr("font-size", "8pt").attr("font-weight", "bold").style("text-decoration", "underline")
creditsContainer.append("a").attr("href", "https://archive.org/details/wrecksinkingofti00ever/page/n9/mode/2up").attr("target", "_blank")
    .append("text").attr("x", creditsStart4).attr("y", creditsStartY+creditsGapY*1).text("Wrecking and Sinking of the Titanic").attr("font-size", "8pt").attr("font-weight", "bold").style("text-decoration", "underline")

creditsContainer.append("a").attr("href", "https://en.wikipedia.org/wiki/Titanic").attr("target", "_blank")
    .append("text").attr("x", creditsStart0).attr("y", creditsStartY+creditsGapY*2).text("Wikipedia - Titanic").attr("font-size", "8pt").attr("font-weight", "bold").style("text-decoration", "underline")
creditsContainer.append("a").attr("href", "https://www.youtube.com/watch?v=GYLPq6m7jhk").attr("target", "_blank")
    .append("text").attr("x", creditsStart1).attr("y", creditsStartY+creditsGapY*2).text("A Night To Remember (audio)").attr("font-size", "8pt").attr("font-weight", "bold").style("text-decoration", "underline")
creditsContainer.append("a").attr("href", "https://visual.ly/tag/titanic").attr("target", "_blank")
    .append("text").attr("x", creditsStart2).attr("y", creditsStartY+creditsGapY*2).text("Titanic Infographics: Visual.ly").attr("font-size", "8pt").attr("font-weight", "bold").style("text-decoration", "underline")
creditsContainer.append("a").attr("href", "https://www.youtube.com/watch?v=f-SA_DcRORU").attr("target", "_blank")
    .append("text").attr("x", creditsStart3).attr("y", creditsStartY+creditsGapY*2).text("A Night To Remember (video)").attr("font-size", "8pt").attr("font-weight", "bold").style("text-decoration", "underline")
creditsContainer.append("a").attr("href", "https://earthlymission.com/5-amazing-titanic-infographics/").attr("target", "_blank")
    .append("text").attr("x", creditsStart4).attr("y", creditsStartY+creditsGapY*2).text("Earthly Mission: Infographics").attr("font-size", "8pt").attr("font-weight", "bold").style("text-decoration", "underline")

creditsContainer.append("a").attr("href", "https://www.britannica.com/topic/Titanic").attr("target", "_blank")
    .append("text").attr("x", creditsStart0).attr("y", creditsStartY+creditsGapY*3).text("Britannica - Titanic").attr("font-size", "8pt").attr("font-weight", "bold").style("text-decoration", "underline")
creditsContainer.append("a").attr("href", "https://www.history.com/topics/early-20th-century-us/titanic").attr("target", "_blank")
    .append("text").attr("x", creditsStart1).attr("y", creditsStartY+creditsGapY*3).text("The History Channel: Titanic").attr("font-size", "8pt").attr("font-weight", "bold").style("text-decoration", "underline")
creditsContainer.append("a").attr("href", "https://www.nationalgeographic.org/education/titanic/").attr("target", "_blank")
    .append("text").attr("x", creditsStart2).attr("y", creditsStartY+creditsGapY*3).text("National Geographic").attr("font-size", "8pt").attr("font-weight", "bold").style("text-decoration", "underline")
creditsContainer.append("a").attr("href", "https://www.imdb.com/title/tt0120338/").attr("target", "_blank")
    .append("text").attr("x", creditsStart3).attr("y", creditsStartY+creditsGapY*3).text("Titanic (1997 movie)").attr("font-size", "8pt").attr("font-weight", "bold").style("text-decoration", "underline")
creditsContainer.append("a").attr("href", "https://www.titanicbelfast.com/").attr("target", "_blank")
    .append("text").attr("x", creditsStart4).attr("y", creditsStartY+creditsGapY*3).text("Titanic Belfast Museum").attr("font-size", "8pt").attr("font-weight", "bold").style("text-decoration", "underline")

creditsContainer.append("a").attr("href", "https://www.linerdesigns.com/titanic").attr("target", "_blank")
    .append("text").attr("x", creditsStart0).attr("y", creditsStartY+creditsGapY*4).text("Oceanliner Designs").attr("font-size", "8pt").attr("font-weight", "bold").style("text-decoration", "underline")
creditsContainer.append("a").attr("href", "https://www.titanichg.com/").attr("target", "_blank")
    .append("text").attr("x", creditsStart1).attr("y", creditsStartY+creditsGapY*4).text("Titanic: Honor and Glory").attr("font-size", "8pt").attr("font-weight", "bold").style("text-decoration", "underline")
creditsContainer.append("a").attr("href", "https://www.reddit.com/r/titanic/").attr("target", "_blank")
    .append("text").attr("x", creditsStart2).attr("y", creditsStartY+creditsGapY*4).text("Reddit r/titanic").attr("font-size", "8pt").attr("font-weight", "bold").style("text-decoration", "underline")
creditsContainer.append("a").attr("href", "https://www.thehistorypress.co.uk/titanic/").attr("target", "_blank")
    .append("text").attr("x", creditsStart3).attr("y", creditsStartY+creditsGapY*4).text("History Press").attr("font-size", "8pt").attr("font-weight", "bold").style("text-decoration", "underline")
creditsContainer.append("a").attr("href", "https://www.youtube.com/watch?v=HLrBUwNSEo0").attr("target", "_blank")
    .append("text").attr("x", creditsStart4).attr("y", creditsStartY+creditsGapY*4).text("Jared Owen Animations").attr("font-size", "8pt").attr("font-weight", "bold").style("text-decoration", "underline")


const lostTitanicImageList = [
    "Launching_of_Titanic.jpg",
    "lost-titanic.jpg",
    "Smith_Titanic_bridge.jpg",
    "Grand_Staircase.jpg",
    "Cafe_verandah_titanic.png",
    "Titanic_iceberg.jpg",
    "Titanic_lifeboat.jpg",
    "Carpathia_Deck.jpg",
  ]
const lostTitanicTextList = [
   "Launching of Titanic in Belfast in May 1911.",
   "RMS Titanic departing Southampton on April 10, 1912.",
   "Capt. Smith, on Titanic's bridge. He went down with his ship.",
   "Entrance Hall and Grand Staircase of the RMS Titanic",
   "Titanic Starboard side Cafe Verandah",
   "The iceberg that the Titanic struck on April 14, 1912.",
   "Titanic lifeboat with survivors from the Titanic.",
   "Recovered lifeboats on the Carpathia the next morning.",
  ]

const lostTitanic = svgFrontPage.append("g").attr("id", "lostTitanic").attr("transform", `translate(${width-350+15},90) scale(.95,.95)`)
const lostTitanicImage = lostTitanic.append("image").attr("x", 0).attr("y", 0).attr("width", 185).attr("height", 120).attr("xlink:href", "./src/titanicImages/" + lostTitanicImageList[0]).style("opacity", 0.6).style("filter", "sepia(100%) brightness(80%)")
lostTitanic.append("rect").attr("x", 0).attr("y", 0).attr("width", 185).attr("height", 120).attr("stroke", "black").style("stroke-width", 1).attr("fill", "none")
const lostTitanicText = lostTitanic.append("text").attr("x", 92.5).attr("y", 127).text(lostTitanicTextList[0]).attr("text-anchor", "middle").attr("font-size", "5pt").attr("font-weight", "bold").style("font-family", "'Castoro', serif")
lostTitanic.append("line").attr("x1", 0).attr("y1", 130).attr("x2", 185).attr("y2", 130).attr("stroke", "black").style("stroke-width", 0.5)



const firstLeftHeadlines = lostTitanic.append("g").attr("transform", "translate(250,15) scale (1.5,1.8)")
firstLeftHeadlines.append("line").attr("x1", -10).attr("x2", 10).attr("y1", -8).attr("y2", -8).attr("stroke", "black").style("stroke-width", 0.5)
firstLeftHeadlines.append("text").text("Col. Astor and Bride,").attr("x", 0).attr("y",0).attr("text-anchor", "middle").attr("font-size", "4pt").attr("font-weight", "normal").style("font-family", "'Roboto', sans-serif")
firstLeftHeadlines.append("text").text("Isidor Straus and Wife,").attr("x", 0).attr("y",7).attr("text-anchor", "middle").attr("font-size", "4pt").attr("font-weight", "normal").style("font-family", "'Roboto', sans-serif")
firstLeftHeadlines.append("text").text("and Maj. Butt Aboard.").attr("x", 0).attr("y",14).attr("text-anchor", "middle").attr("font-size", "4pt").attr("font-weight", "normal").style("font-family", "'Roboto', sans-serif")
firstLeftHeadlines.append("line").attr("x1", -10).attr("x2", 10).attr("y1", 19).attr("y2", 19).attr("stroke", "black").style("stroke-width", 0.5)
firstLeftHeadlines.append("text").text('"RULE OF SEA" FOLLOWED').attr("x", 0).attr("y",29).attr("text-anchor", "middle").attr("font-size", "4pt").attr("font-weight", "normal").style("font-family", "'Roboto', sans-serif").attr("transform", "scale(0.8,1)")
firstLeftHeadlines.append("line").attr("x1", -10).attr("x2", 10).attr("y1", 34).attr("y2", 34).attr("stroke", "black").style("stroke-width", 0.5)
firstLeftHeadlines.append("text").text("Women and Children Put Over").attr("x", 0).attr("y",43).attr("text-anchor", "middle").attr("font-size", "3pt").attr("font-weight", "normal").style("font-family", "'Roboto', sans-serif")
firstLeftHeadlines.append("text").text("in Lifeboats and Are Supposed").attr("x", 0).attr("y",49).attr("text-anchor", "middle").attr("font-size", "3pt").attr("font-weight", "normal").style("font-family", "'Roboto', sans-serif")
firstLeftHeadlines.append("text").text("to be Safe on Carpathia.").attr("x", 0).attr("y",55).attr("text-anchor", "middle").attr("font-size", "3pt").attr("font-weight", "normal").style("font-family", "'Roboto', sans-serif")
firstLeftHeadlines.append("line").attr("x1", -10).attr("x2", 10).attr("y1", 61).attr("y2", 61).attr("stroke", "black").style("stroke-width", 0.5)


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// END OF MAIN LAYOUT
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

const countriesCentroids = [{name: "Argentina", lat: -40, long: -128},
  {name: "Australia", lat: -50, long: 115},
  {name: "Austria", lat: 25, long: 10},
  {name: "Belarus", lat: 30, long: 67},
  {name: "Belgium", lat: 45, long: -14},
  {name: "Bosnia", lat: -10, long: 33},
  {name: "Bulgaria", lat: -30, long: 33},
  {name: "Canada", lat: 73, long: -148},
  {name: "Channel Islands", lat: -40, long: -65},
  {name: "China", lat: 35, long: 105},
  {name: "Croatia", lat: 28, long: 38},
  {name: "Cuba", lat: -15, long: -115},
  {name: "Denmark", lat: 55, long: 5},
  {name: "Egypt", lat: -40, long: 67},
  {name: "England", lat: 48, long: -65},
  {name: "Estonia", lat: 50, long: 57},
  {name: "Finland", lat: 75, long: 38},
  {name: "France", lat: 20, long: -14},
  {name: "Germany", lat: 38, long: 10},
  {name: "Greece", lat: -38, long: 10},
  {name: "India", lat: 15, long: 105},
  {name: "Ireland", lat: 42, long: -92},
  {name: "Italy", lat: -22, long: 10},
  {name: "Japan", lat: 70, long: 105},
  {name: "Lebanon", lat: -10, long: 67},
  {name: "Lithuania", lat: 40, long: 57},
  {name: "Macedonia", lat: -20, long: 33},
  {name: "Mexico", lat: -20, long: -148},
  {name: "Norway", lat: 75, long: -65},
  {name: "Peru", lat: -40, long: -148},
  {name: "Poland", lat: 50, long: 33},
  {name: "Portugal", lat: -38, long: -14},
  {name: "Russia", lat: 55, long: 105},
  {name: "Scotland", lat: 70, long: -92},
  {name: "Thailand", lat: -10, long: 113},
  {name: "Slovenia", lat: 12, long: 10},
  {name: "South Africa", lat: -50, long: 65},
  {name: "Spain", lat: -15, long: -14},
  {name: "Sweden", lat: 80, long: -38},
  {name: "Switzerland", lat: 0, long: 10},
  {name: "Syria", lat: 5, long: 67},
  {name: "The Netherlands", lat: 55, long: -40},
  {name: "Turkey", lat: 16, long: 67},
  {name: "Unknown", lat:-50, long: -92},
  {name: "Uruguay", lat: -28, long: -128},
  {name: "USA", lat: 55, long: -148},
  {name: "Wales", lat: 55, long: -92}
]

const tabularData = [
                    {cabinClass: 'Crew', ageSex: 'Women', survived: 'Survived', number: 20},
                    {cabinClass: 'Crew', ageSex: 'Women', survived: 'Lost', number: 3},
                    {cabinClass: 'Crew', ageSex: 'Men', survived: 'Survived', number: 192},
                    {cabinClass: 'Crew', ageSex: 'Men', survived: 'Lost', number: 693},
                    {cabinClass: 'First Class', ageSex: 'Children', survived: 'Survived', number: 5},
                    {cabinClass: 'First Class', ageSex: 'Children', survived: 'Lost', number: 1},
                    {cabinClass: 'First Class', ageSex: 'Women', survived: 'Survived', number: 140},
                    {cabinClass: 'First Class', ageSex: 'Women', survived: 'Lost', number: 4},
                    {cabinClass: 'First Class', ageSex: 'Men', survived: 'Survived', number: 57},
                    {cabinClass: 'First Class', ageSex: 'Men', survived: 'Lost', number: 118},
                    {cabinClass: 'Second Class', ageSex: 'Children', survived: 'Survived', number: 24},
                    {cabinClass: 'Second Class', ageSex: 'Children', survived: 'Lost', number: 0},
                    {cabinClass: 'Second Class', ageSex: 'Women', survived: 'Survived', number: 80},
                    {cabinClass: 'Second Class', ageSex: 'Women', survived: 'Lost', number: 13},
                    {cabinClass: 'Second Class', ageSex: 'Men', survived: 'Survived', number: 14},
                    {cabinClass: 'Second Class', ageSex: 'Men', survived: 'Lost', number: 154},
                    {cabinClass: 'Third Class', ageSex: 'Children', survived: 'Survived', number: 27},
                    {cabinClass: 'Third Class', ageSex: 'Children', survived: 'Lost', number: 52},
                    {cabinClass: 'Third Class', ageSex: 'Women', survived: 'Survived', number: 76},
                    {cabinClass: 'Third Class', ageSex: 'Women', survived: 'Lost', number: 89},
                    {cabinClass: 'Third Class', ageSex: 'Men', survived: 'Survived', number: 75},
                    {cabinClass: 'Third Class', ageSex: 'Men', survived: 'Lost', number: 387}
                    ]

let group = d3.group(tabularData, d=>d.cabinClass, d=> d.ageSex)

let globalState = 1
const globalTotalStates = 8

let t = 1309 *2

let defaultSC = secondaryContainer.append("g").attr("id", "defaultSC")
let defaultPD = passengerDetailContainer.append("g").attr("id", "defaultPD")

let linerPath = "M 0 0 L -2 0 C -4 0 -5 -7 -5 -20 C -5 -52 -6 -38 -6 -65 C -6 -90 0 -100 0 -100 C 0 -100 6 -90 6 -65 C 6 -38 5 -52 5 -20 C 5 -7 4 0 2 0 Z"
let lifeboatPath = "M 16.8 0 C 16.8 0 16.8 0 16.8 0 C 9.8 -4.2 4.2 -4.2 0 -4.2 C -4.2 -4.2 -9.8 -4.2 -16.8 0 C -9.8 4.2 -4.2 4.2 0 4.2 C 4.2 4.2 9.8 4.2 16.8 0 Z"
const titanicPath = "M -37.8 -3 L -50.6 -3 L -43.9 9.2 L -1.2 9.1 L 43.9 9.1 L 47 5.5 L 46.4 -0 L 48.8 -3.1 L 38.4 -3.1 L 37.2 -2.4 L 31.7 -2.4 L 27.4 -6.7 L 17.7 -6.7 L 18.9 -12.8 L 15.9 -12.8 L 14.6 -6.7 L 4.3 -6.7 L 5.5 -12.8 L 2.4 -12.8 L 1.2 -6.7 L -8.5 -6.7 L -7.3 -12.8 L -10.4 -12.8 L -11.6 -6.7 L -22 -6.7 L -20.7 -12.8 L -23.8 -12.8 L -25 -6.7 L -28.1 -6.7 L -31.7 -2.4 L -36.6 -2.4 Z"
const manPath = "M -0.029 0.002 L -0.041 0.057 L -0.026 0.107 L 0.023 0.121 L 0.04 0.041 L 0.043 0.127 L 0.023 0.238 L 0.016 0.4 L -0.029 0.659 L -0.013 0.676 L -0.019 0.727 L -0.055 0.762 L -0.057 0.788 L 0.023 0.785 L 0.057 0.762 L 0.052 0.698 L 0.087 0.684 L 0.118 0.436 L 0.217 0.111 L 0.238 0.33 L 0.25 0.454 L 0.227 0.68 L 0.25 0.693 L 0.231 0.762 L 0.375 0.776 L 0.431 0.765 L 0.429 0.751 L 0.367 0.726 L 0.336 0.685 L 0.373 0.11 L 0.384 0.032 L 0.411 0.018 L 0.419 -0.057 L 0.436 0.016 L 0.462 0.021 L 0.487 0.06 L 0.467 0.091 L 0.525 0.096 L 0.546 0.035 L 0.512 -0.004 L 0.521 -0.009 L 0.443 -0.506 L 0.341 -0.568 L 0.314 -0.618 L 0.336 -0.641 L 0.328 -0.673 L 0.33 -0.705 L 0.32 -0.749 L 0.339 -0.783 L 0.314 -0.808 L 0.224 -0.802 L 0.155 -0.744 L 0.13 -0.67 L 0.141 -0.638 L 0.177 -0.64 L 0.199 -0.613 L 0.193 -0.585 L 0.186 -0.59 L 0.054 -0.515 L 0.004 -0.381 L -0.029 -0.183 Z"

// {className: 'celtic', line: 'whiteStar', name: 'Celtic', length: 681, beam: 75.0, depth: 44, tonnage: 20904, horsePower: 12600, avSpeed: 17, yearBuilt: 1901, screw: "Twin Screw"},
                // {className: 'oceanic', line: 'whiteStar', name: 'Oceanic', length: 685, beam: 68.5, depth: 44.5, tonnage: 17274, horsePower: 28000, avSpeed: 21, yearBuilt: 1899, screw: "Twin Screw"},
                    
let linersList = [
                    {className: 'baltic', line: 'whiteStar', name: 'Baltic', length: 708, beam: 75, depth: 44, tonnage: 23876, horsePower: 14000, avSpeed: 16.5, yearBuilt: 1904, screw: "Twin Screw"},
                    {className: 'adriatic', line: 'whiteStar', name: 'Adriatic', length: 709, beam: 75.5, depth: 52, tonnage: 24541, horsePower: 16000, avSpeed: 17, yearBuilt: 1907, screw: "Twin Screw"},
                    {className: 'lusitania', line: 'cunard', name: 'Lusitania', length: 787, beam: 87, depth: 34, tonnage: 31550, horsePower: 76000, avSpeed: 24, yearBuilt: 1906, screw: "Twin Screw"},
                    {className: 'mauretania', line: 'cunard', name: 'Mauretania', length: 790, beam: 88, depth: 34, tonnage: 31938, horsePower: 76000, avSpeed: 29, yearBuilt: 1906, screw: "Twin Screw"},
                    {className: 'titanic', line: 'whiteStar', name: 'Titanic / Olympic', length: 850, beam: 92, depth: 52, tonnage: 46329, horsePower: 46000, avSpeed: 21, yearBuilt: 1910, screw: "Triple Screw"}]

const whiteStarFlagPath = "M 0 0 C 0 0 0 0 0 0 C 1 -1 3 0 4 -1 C 5 -2 6 -1 8 -1 C 9 -1 10 -2 14 -2 C 12 -3 12 -3 9 -4 C 12 -5 11 -5 13 -6 C 10 -7 9 -6 7 -7 C 4 -9 4 -7 3 -8 C 2 -9 0 -9 -2 -9 C 0 -6 -1 -3 0 0 Z"
const starPath = "M 25 1 L 31 18 H 49 L 35 29 L 40 46 L 25 36 L 10 46 L 15 29 L 1 18 H 19 Z"

const cunardFlagPath = "M -45 -30 C -39 -16 -37 4 -39 24 C -17 14 8 18 45 14 C 25 -10 39 -13 35 -37 C 0 -39 -20 -21 -45 -30"
const cunardLionPath = "M -23.029 33.425 L 18.254 32.489 L 18.083 30.106 L 10.508 30.191 L 10.253 19.976 L 7.273 18.189 L 7.188 12.571 L 14.508 9.507 L 13.061 -10.836 L 15.87 -10.496 L 16.636 -4.197 L 19.956 -13.049 L 14.253 -16.369 L 10.848 -10.921 L 11.019 8.656 L 6.848 6.272 L 2.677 -0.877 L 3.954 -1.218 L 3.954 -2.92 L 5.401 -3.261 L 4.89 -6.07 L 5.826 -7.517 L 6.252 -6.751 L 8.38 -12.028 L 10.253 -12.283 L 9.912 -18.412 L 9.316 -21.476 L 10.338 -23.264 L 9.572 -23.519 L 12.381 -24.2 L 9.742 -29.647 L 9.912 -33.137 L 6.848 -30.584 L 1.4 -30.413 L 1.826 -27.009 L 1.06 -27.434 L 0.464 -25.477 L -1.664 -25.392 L -1.579 -24.285 L -5.494 -23.349 L -4.728 -21.817 L -7.452 -20.54 L -7.452 -20.54 L -6.005 -18.837 L -7.026 -18.327 L -9.154 -23.093 L -13.495 -26.668 L -15.283 -25.136 L -22.773 -21.306 L -21.667 -12.794 L -22.177 -10.326 L -18.092 -6.325 L -9.75 -2.495 L -8.388 4.825 L -7.537 3.208 L -3.451 7.805 L -5.835 10.869 L -6.516 14.954 L -10.772 16.231 L -11.963 14.018 L -14.602 15.125 L -13.495 18.104 L -10.176 18.87 L -4.132 17.848 L -3.366 15.125 L -0.132 14.444 L 3.018 19.551 L 7.699 23.637 L 7.954 25.935 L 5.231 29.68 L -22.773 30.786 Z"

let linerScale = d3.scaleLinear().domain([0,850]).range([0,1.4])

let titanicTimeline = [
    {time: 0.979166666666667, realtime: '11:30pm', time2: 23.5, name: 'event1', narrative: 'Lookouts notice a haze', key: 'non-key'},
    {time: 0.986111111111111, realtime: '11:40pm', time2: 23.6666666666667, name: 'event2', narrative: 'Titanic hits iceberg', key: 'key'},
    {time: 0.00347222222222222, realtime: '12:05am', time2: 0.0833333333333333, name: 'event3', narrative: 'Distress call CQD sent', key: 'key'},
    {time: 0.0104166666666667, realtime: '12:15am', time2: 0.25, name: 'event4', narrative: 'Stewards order lifebelts', key: 'non-key'},
    {time: 0.0138888888888889, realtime: '12:20am', time2: 0.333333333333333, name: 'event5', narrative: 'Lifeboat loading begins', key: 'non-key'},
    {time: 0.0173611111111111, realtime: '12:25am', time2: 0.416666666666667, name: 'event6', narrative: 'Capt. admits ship will sink', key: 'non-key'},
    {time: 0.02777, realtime: '12:40am', time2: 0.75, name: 'event7', narrative: 'First lifeboat rowed away', key: 'key'},
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
    // {time: 0.0951388888888889, realtime: '2:17am', time2: 2.28333333333333, name: 'event18', narrative: 'Titanic breaks in two', key: 'non-key'},
    {time: 0.0965277777777778, realtime: '2:19am', time2: 2.31666666666667, name: 'event19', narrative: 'Bow begins to sink', key: 'non-key'},
    {time: 0.0972222222222222, realtime: '2:20am', time2: 2.33333333333333, name: 'event20', narrative: 'Titanic fully submerged', key: 'key'},
    {time: 0.1, realtime: '2:24am', time2: 2.4, name: 'event21', narrative: 'Titanic at ocean bottom', key: 'non-key'},
    {time: 0.145833333333333, realtime: '3:30am', time2: 3.5, name: 'event22', narrative: 'Survivors see Carpathia', key: 'key'},
    {time: 0.166666666666667, realtime: '4:00am', time2: 4, name: 'event23', narrative: 'Carpathia rescue begins', key: 'non-key'},
    {time: 0.220833333333333, realtime: '5:18am', time2: 5.3, name: 'event24', narrative: 'Sunrise on Carpathia', key: 'non-key'},
    {time: 0.375, realtime: '9:00am', time2: 9, name: 'event25', narrative: 'Final survivors on Carptathia', key: 'non-key'},
    {time: 0.385416666666667, realtime: '9:15am', time2: 9.25, name: 'event26', narrative: 'Californian arrives, too late', key: 'non-key'}
    
    ]


let lifeboatData = [
    {boat: '1', kaggleSurvivors: 5, launched: "1:05", wikiSurvivors: 12, capacity: 40, type: "Emergency", startingPos: {x: 670, y: 50}, endingPos: {x: 655, y: 80}, order: 5},
    {boat: '2', kaggleSurvivors: 14, launched: "1:45", wikiSurvivors: 18, capacity: 40, type: "Emergency", startingPos: {x: 670, y: -50}, endingPos: {x: 655, y: -130}, order: 14},
    {boat: '3', kaggleSurvivors: 26, launched: "1:00", wikiSurvivors: 38, capacity: 65, type: "Standard", startingPos: {x: 635, y: 40}, endingPos: {x: 570, y: 80}, order: 3},
    {boat: '4', kaggleSurvivors: 31, launched: "1:50", wikiSurvivors: 42, capacity: 65, type: "Standard", startingPos: {x: 635, y: -40}, endingPos: {x: 570, y: -130}, order: 15},
    {boat: '5', kaggleSurvivors: 29, launched: "12:43", wikiSurvivors: 36, capacity: 65, type: "Standard", startingPos: {x: 600, y: 40}, endingPos: {x: 485, y: 80}, order: 2},
    {boat: '6', kaggleSurvivors: 21, launched: "1:10", wikiSurvivors: 29, capacity: 65, type: "Standard", startingPos: {x: 600, y: -40}, endingPos: {x: 485, y: -130}, order: 6},
    {boat: '7', kaggleSurvivors: 22, launched: "12:40", wikiSurvivors: 28, capacity: 65, type: "Standard", startingPos: {x: 565, y: 40}, endingPos: {x: 400, y: 80}, order: 1},
    {boat: '8', kaggleSurvivors: 24, launched: "1:00", wikiSurvivors: 28, capacity: 65, type: "Standard", startingPos: {x: 565, y: -40}, endingPos: {x: 400, y: -130}, order: 4},
    {boat: '9', kaggleSurvivors: 26, launched: "1:30", wikiSurvivors: 56, capacity: 65, type: "Standard", startingPos: {x: 345, y: 35}, endingPos: {x: 345-70, y: 75}, order: 10},
    {boat: '10', kaggleSurvivors: 28, launched: "1:50", wikiSurvivors: 35, capacity: 65, type: "Standard", startingPos: {x: 345, y: -35}, endingPos: {x: 345-70, y: -125}, order: 16},
    {boat: '11', kaggleSurvivors: 26, launched: "1:35", wikiSurvivors: 70, capacity: 65, type: "Standard", startingPos: {x: 310, y: 35}, endingPos: {x: 310-120, y: 75}, order: 11},
    {boat: '12', kaggleSurvivors: 18, launched: "1:30", wikiSurvivors: 30, capacity: 65, type: "Standard", startingPos: {x: 310, y: -35}, endingPos: {x: 310-120, y: -125}, order: 9},
    {boat: '13', kaggleSurvivors: 42, launched: "1:40", wikiSurvivors: 65, capacity: 65, type: "Standard", startingPos: {x: 275, y: 35}, endingPos: {x: 275-170, y: 75}, order: 12},
    {boat: '14', kaggleSurvivors: 33, launched: "1:30", wikiSurvivors: 58, capacity: 65, type: "Standard", startingPos: {x: 275, y: -35}, endingPos: {x: 275-170, y: -125}, order: 8},
    {boat: '15', kaggleSurvivors: 38, launched: "1:41", wikiSurvivors: 65, capacity: 65, type: "Standard", startingPos: {x: 240, y: 35}, endingPos: {x: 240-220, y: 75}, order: 13},
    {boat: '16', kaggleSurvivors: 23, launched: "1:20", wikiSurvivors: 40, capacity: 65, type: "Standard", startingPos: {x: 240, y: -35}, endingPos: {x: 240-220, y: -125}, order: 7},
    {boat: 'A', kaggleSurvivors: 8, launched: "2:12", wikiSurvivors: 13, capacity: 47, type: "Collapsible", startingPos: {x: 670, y: 40}, endingPos: {x: 670+100, y: 70}, order: 20},
    {boat: 'B', kaggleSurvivors: 9, launched: "2:12", wikiSurvivors: 30, capacity: 47, type: "Collapsible", startingPos: {x: 670, y: -40}, endingPos: {x: 670+100, y: -120}, order: 19},
    {boat: 'C', kaggleSurvivors: 41, launched: "2:00", wikiSurvivors: 44, capacity: 47, type: "Collapsible", startingPos: {x: 650, y: 15}, endingPos: {x: 650+200, y: 50}, order: 17},
    {boat: 'D', kaggleSurvivors: 18, launched: "2:05", wikiSurvivors: 25, capacity: 47, type: "Collapsible", startingPos: {x: 650, y: -15}, endingPos: {x: 650+200, y: -100}, order: 18}

]

/*

Stern                   Bow
15 13 11 9       7  5  3  1
                        C A 
                        D B
16 14 12 10      8 6  4  2

*/


let temperatureContainerState = 1
const totalTemperatureContainerStates = 7

const clickForMoreTemp = temperatureContainer.append("g").attr("id", "clickForMoreTemp").attr("transform", `translate(${passengerDetailContainerWidth-30}, ${temperatureContainerHeight-30})`).style("opacity", 1)
// const clickForMoreTempText = clickForMoreTemp.append("text").attr("id", "clickForMoreTempText").attr("x", 0).attr("y", 0).text("Click for more").attr("font-size", "14pt").attr("text-anchor", "middle").attr("font-weight", "normal").attr("font-style", "normal").style("font-family", "'Roboto', sans-serif").style("opacity", 1)
const clickForMoreTempArrow = clickForMoreTemp.append("path").attr("id", "clickForMoreTempArrow").attr("d", "M 5 0 L -5 -5 L -5 5 Z").attr("fill", "black").attr("stroke", "none").attr("transform", "translate(2, 1) scale(2)").style("opacity", 1)
const clickForMoreTempRect = clickForMoreTemp.append("rect").attr("id", "clickForMoreTempRect").attr("x", -20).attr("y", -20).attr("rx", 10).attr("ry", 10).attr("width", 40).attr("height", 40).attr("fill", "black").attr("stroke", "none").style("opacity", .2)
let oneOfNTemp = temperatureContainer.append("text").text(" 1 / "+ totalTemperatureContainerStates).attr("x", 10).attr("y", temperatureContainerHeight-10).style("font-style", "normal").style("font-size", "12px").attr("pointer-events", "none")

setTemperatureContainer()

function setTemperatureContainer() {

    const temperatureContainerTitleGroup = temperatureContainer.append("g").attr("id", "temperatureContainerTitleGroup").attr("transform", `translate(${passengerDetailContainerWidth/2},20)`)
    const temperatureContainerTitle = temperatureContainerTitleGroup.append("text").attr("id", "temperatureContainerTitle").attr("x", 0).attr("y", 0).text(" - Key details - ").attr("font-size", "9pt").attr("font-weight", "normal").attr("font-style", "normal").attr("text-anchor", "middle")
    const temperatureContainerContentGroup = temperatureContainer.append("g").attr("id", "temperatureContainerContentGroup").attr("transform", `translate(${passengerDetailContainerWidth/2},${temperatureContainerHeight/2})`)
    
    function setWaterTempGroup() {

        const thermoGroup = temperatureContainerContentGroup.append("g").attr("id", "thermoGroup").attr("transform", "translate(0,0)").style("opacity", 0)
        const thermoGroupTitle = thermoGroup.append("text").attr("id", "temperatureContainerSubTitle").attr("x", 0).attr("y", -85).text("Ice cold seas").attr("font-size", "18pt").attr("text-anchor", "middle").attr("font-weight", "bold").attr("font-style", "normal")
        const thermoGroupTextGroup = thermoGroup.append("g").attr("id", "thermoGroupTextGroup").attr("transform", "translate(-135, 45)")
        const thermoTextList1 = ["The night's water temperature would have been", "below freezing and so if in the water, survival", "beyond 30 minutes was, alas, unlikely."]
        thermoTextList1.forEach((d,i)=> {
            thermoGroupTextGroup.append("text").text(d).attr("x", 0).attr("y", 15*i).attr("font-size", "10pt").attr("font-family", "'Castoro', serif")
        })

        const thermoPath = "M 0 13 C 0 13 2 13 2 11 C 2 9 1 9 1 9 L 1 -8 C 1 -9 -1 -9 -1 -8 L -1 9 C -1 9 -2 9 -2 11 C -2 13 0 13 0 13 Z"
        const thermoGroupThermo = thermoGroup.append("g").attr("id", "thermoGroupThermo").attr("transform", "translate(0, 0)")
        thermoGroupThermo.append("path").attr("d", thermoPath).attr("fill", "none").attr("stroke", "black").attr("stroke-width", 0.5).attr("transform", "translate(0,-28) scale(3.7)")
        thermoGroupThermo.append("path").attr("d", thermoPath).attr("fill", "red").attr("stroke", "none").attr("stroke-width", 0.5).attr("transform", "translate(0,-10) scale(2)")
        thermoGroupThermo.append("rect").attr("x", -16).attr("y", -65).attr("width", 32).attr("height", 90).attr("fill", "none").attr("stroke", "black").attr("stroke-width", 0.5*3.7)
        for (let i=0;i<11;i++) {
            thermoGroupThermo.append("line").attr("x1", -8).attr("y1", -50+i*5).attr("x2", -3).attr("y2", -50+i*5).attr("stroke", "black").attr("stroke-width", 0.5*3.7/2)
            thermoGroupThermo.append("line").attr("x1", 3).attr("y1", -50+i*5).attr("x2", 8).attr("y2", -50+i*5).attr("stroke", "black").attr("stroke-width", 0.5*3.7/2)
        }
        thermoGroupThermo.append("text").text("-2 °C").attr("x", -120).attr("y", -10).attr("font-size", "26pt").attr("font-family", "'Castoro', serif").attr("font-weight", "bold")
        thermoGroupThermo.append("text").text("28 °F").attr("x", 35).attr("y", -10).attr("font-size", "26pt").attr("font-family", "'Castoro', serif").attr("font-weight", "bold")

    }

    function setContructionGroup() {
        const constructionGroup = temperatureContainerContentGroup.append("g").attr("id", "constructionGroup").attr("transform", "translate(0,0)").style("opacity", 1)
        const constructionGroupTitle = constructionGroup.append("text").attr("id", "temperatureContainerSubTitle").attr("x", 0).attr("y", -85).text("Construction").attr("font-size", "18pt").attr("text-anchor", "middle").attr("font-weight", "bold").attr("font-style", "normal")
        const constructionGroupTextGroup = constructionGroup.append("g").attr("id", "constructionGroupTextGroup").attr("transform", "translate(-135, 45)")
        const constructionTextList1 = ["Built in Belfast, Ireland, the Titanic took 3", "years to build, cost $7.5m, and was the", "largest ship ever built."]
        constructionTextList1.forEach((d,i)=> {
            constructionGroupTextGroup.append("text").text(d).attr("x", 0).attr("y", 15*i).attr("font-size", "10pt").attr("font-family", "'Castoro', serif")
        })
        constructionGroup.append("text").text("3").attr("x", -110).attr("y", -25).attr("font-size", "40pt").attr("font-weight", "bold").attr("text-anchor", "middle").attr("font-family", "'Roboto', sans-serif")
        constructionGroup.append("text").text("million").attr("x", -93).attr("y", -52).attr("font-size", "10pt").attr("font-weight", "bold").attr("text-anchor", "start").attr("font-family", "'Roboto', sans-serif")
        constructionGroup.append("text").text("rivets").attr("x", -93).attr("y", -37).attr("font-size", "10pt").attr("font-weight", "bold").attr("text-anchor", "start").attr("font-family", "'Roboto', sans-serif")
        const rivetPath = "M 4 -4 C 4 -4 4 -4 4 -4 C 6 -2 4 1 2 -1 L -2 3 C -3 4 -4 3 -3 2 L 1 -2 C -1 -4 2 -6 4 -4 C 4 -4 4 -4 4 -4 Z"
        constructionGroup.append("path").attr("d", rivetPath).attr("fill", "red").attr("transform", "translate(-45,-45) scale(3)")
        constructionGroup.append("text").text("24,000").attr("x", 120).attr("y",-40).attr("font-size", "22pt").attr("font-weight", "bold").attr("text-anchor", "end").attr("font-family", "'Roboto', sans-serif")
        constructionGroup.append("text").text("tonnes of steel").attr("x", 120).attr("y", -26).attr("font-size", "8pt").attr("font-weight", "bold").attr("text-anchor", "end").attr("font-family", "'Roboto', sans-serif")
        const tonneWeightPath = "M 0 0 L -2 0 L -1 -1 L 1 -1 L 2 0 Z"
        constructionGroup.append("path").attr("d", tonneWeightPath).attr("fill", "red").attr("stroke", "none").attr("transform", "translate(10, -30) scale(10,20)")
        constructionGroup.append("text").text("3,000").attr("x", -65).attr("y", 5).attr("font-size", "18pt").attr("font-weight", "bold").attr("text-anchor", "start").attr("font-family", "'Roboto', sans-serif")
        constructionGroup.append("text").text("Harland & Wolff workers").attr("x", -65).attr("y", 20).attr("font-size", "10pt").attr("font-weight", "bold").attr("text-anchor", "start").attr("font-family", "'Roboto', sans-serif")
        constructionGroup.append("path").attr("d", manPath).attr("fill", "red").attr("stroke", "none").attr("transform", "translate(-83, 0) scale(25)")
    }

    function setFunnelGroup() {
        const funnelGroup = temperatureContainerContentGroup.append("g").attr("id", "funnelGroup").attr("transform", "translate(0,0)").style("opacity", 0)
        const funnelGroupTitle = funnelGroup.append("text").attr("id", "temperatureContainerSubTitle").attr("x", 0).attr("y", -85).text("Funnels").attr("font-size", "18pt").attr("text-anchor", "middle").attr("font-weight", "bold").attr("font-style", "normal")
        const funnelGroupTextGroup = funnelGroup.append("g").attr("id", "funnelGroupTextGroup").attr("transform", "translate(-135, 45)")
        const funnelTextList1 = ["The Titanic had four funnels, but only three", "were functional. The fourth was added for", "aesthetic and venitlation purposes."]
        funnelTextList1.forEach((d,i)=> {
            funnelGroupTextGroup.append("text").text(d).attr("x", 0).attr("y", 15*i).attr("font-size", "10pt").attr("font-family", "'Castoro', serif")
        })
        const titanicFunnels = funnelGroup.append("path").attr("d", titanicPath).attr("fill", "black").attr("transform", "translate(0,-5) scale(2, 2.3)").style("opacity", 0.5)
        const smokePath = "M -0.0422 0.3677 C -0.5661 -0.0696 0.5118 0.3459 -0.0389 -0.2443 C -0.1834 -0.4276 0.287 -0.527 0.7539 -0.3556 C 0.908 -0.2819 0.0586 -0.3261 0.1833 -0.1446 C 0.3326 0.0994 -0.1461 0.1779 -0.001 0.2408 C 0.135 0.2929 -0.0461 0.2971 -0.0422 0.3677 Z"
        const titanicSmoke1 = funnelGroup.append("path").attr("d", smokePath).attr("fill", "black").attr("transform", "translate(-41,-48) scale(25)").style("opacity", 0.5)
        const titanicSmoke2 = funnelGroup.append("path").attr("d", smokePath).attr("fill", "black").attr("transform", "translate(-15,-48) scale(25)").style("opacity", 0.5)
        const titanicSmoke3 = funnelGroup.append("path").attr("d", smokePath).attr("fill", "black").attr("transform", "translate(12,-48) scale(25)").style("opacity", 0.5)
    }

    function setIcebergGroup() {
        const icebergGroup = temperatureContainerContentGroup.append("g").attr("id", "icebergGroup").attr("transform", "translate(0,0)").style("opacity", 0)
        const icebergGroupTitle = icebergGroup.append("text").attr("id", "temperatureContainerSubTitle").attr("x", 0).attr("y", -85).text("Iceberg").attr("font-size", "18pt").attr("text-anchor", "middle").attr("font-weight", "bold").attr("font-style", "normal")
        const icebergGroupTextGroup = icebergGroup.append("g").attr("id", "icebergGroupTextGroup").attr("transform", "translate(-135, 45)")
        const icebergTextList1 = ["9/10ths of the iceberg would have been below", "the waves, but it also rose above A Deck, and", "men played football with ice on deck."]
        icebergTextList1.forEach((d,i)=> {
            icebergGroupTextGroup.append("text").text(d).attr("x", 0).attr("y", 15*i).attr("font-size", "10pt").attr("font-family", "'Castoro', serif")
        })
        const oceanPath = "M 0 0 C 0.1833 0 0.24 0.17 0.48 0 C 0.7 0 0.78 0.17 1 0 C 1.17 0 1.25 0.17 1.51 0 C 1.6733 0 1.77 0.19 2 0 C 2.1667 0 2.24 0.23 2.5 0 C 2.6667 0 2.71 0.22 3 0 C 3.18 0 3.29 0.22 3.54 0 C 3.6933 0 3.73 0.23 4 0 L 4 3 L 0 3 Z"
        const icebergPath = "M 0 0 L 0.05 -0.07 L 0.14 -0.13 L 0.16 -0.19 L 0.21 -0.23 L 0.27 -0.19 L 0.3 -0.19 L 0.39 -0.23 L 0.43 -0.23 L 0.52 -0.38 L 0.55 -0.42 L 0.58 -0.52 L 0.6 -0.53 L 0.65 -0.51 L 0.73 -0.4 L 0.78 -0.3 L 0.86 -0.25 L 0.88 -0.23 L 1.05 -0.17 L 1.15 -0.18 L 1.18 -0.21 L 1.2 -0.21 L 1.23 -0.25 L 1.28 -0.23 L 1.31 -0.13 L 1.31 0 L 1.41 0.21 L 1.46 0.42 L 1.65 0.59 L 1.56 0.88 L 1.64 0.98 L 1.65 1.04 L 1.62 1.11 L 1.66 1.24 L 1.7 1.38 L 1.67 1.44 L 1.67 1.52 L 1.63 1.63 L 1.66 1.79 L 1.57 1.86 L 1.61 2 L 1.57 2.12 L 1.61 2.27 L 1.57 2.37 L 1.46 2.47 L 1.48 2.56 L 1.53 2.64 L 1.49 2.7 L 1.5 2.85 L 1.44 2.92 L 1.46 3.03 L 1.38 3.12 L 1.41 3.17 L 1.39 3.33 L 1.35 3.41 L 1.35 3.52 L 1.3 3.67 L 1.3 3.76 L 1.27 3.88 L 1.31 3.98 L 1.4 4.04 L 1.37 4.17 L 1.32 4.31 L 1.36 4.49 L 1.34 4.63 L 1.27 4.84 L 1.26 5.03 L 1.21 5.29 L 1.27 5.46 L 1.16 5.57 L 1.02 5.53 L 0.98 5.46 L 0.93 5.51 L 0.87 5.46 L 0.72 5.51 L 0.61 5.55 L 0.51 5.41 L 0.36 5.34 L 0.27 5.19 L 0.34 5.04 L 0.36 4.94 L 0.42 4.82 L 0.38 4.75 L 0.27 4.66 L 0.31 4.52 L 0.2 4.44 L 0.1 4.35 L 0.02 4.22 L -0.12 4.11 L -0.07 4.05 L -0.1 3.99 L -0.15 3.95 L -0.12 3.86 L -0.19 3.82 L -0.26 3.71 L -0.19 3.58 L -0.26 3.47 L -0.31 3.39 L -0.24 3.27 L -0.26 3.04 L -0.41 2.95 L -0.4 2.82 L -0.37 2.78 L -0.28 2.66 L -0.33 2.52 L -0.36 2.35 L -0.38 2.27 L -0.54 2.07 L -0.49 1.86 L -0.37 1.78 L -0.32 1.64 L -0.35 1.52 L -0.37 1.36 L -0.42 1.14 L -0.36 0.98 L -0.35 0.97 L -0.24 0.72 L -0.28 0.68 L -0.28 0.54 L -0.28 0.38 L -0.22 0.25 L -0.17 0.08 L -0.1 0.06 Z"
        const titanicHeadOnPath = "M 0 0 C 0 0.17 0 0.17 0.24 0.17 C 0.48 0.17 0.48 0.17 0.48 0 L 0.48 -0.26 L 0.49 -0.26 L 0.49 -0.31 L 0.54 -0.34 L 0.49 -0.34 L 0.52 -0.39 L 0.48 -0.37 L 0.44 -0.37 L 0.44 -0.39 L 0.37 -0.39 L 0.37 -0.41 L 0.33 -0.41 L 0.33 -0.43 L 0.3 -0.43 L 0.3 -0.67 L 0.2 -0.67 L 0.2 -0.43 L 0.17 -0.43 L 0.17 -0.41 L 0.13 -0.41 L 0.13 -0.39 L 0.06 -0.39 L 0.06 -0.37 L 0.02 -0.37 L -0.03 -0.39 L 0 -0.35 L -0.06 -0.35 L -0.01 -0.32 L -0.01 -0.27 L 0 -0.27 L 0 -0.25 Z"
        icebergGroup.append("path").attr("d", oceanPath).attr("fill", "red").attr("stroke", "none").attr("transform", "translate(-100, -50) scale(50,25)").style("opacity", 0.5)
        icebergGroup.append("path").attr("d", icebergPath).attr("fill", "black").attr("stroke", "none").attr("transform", "translate(-20, -50) scale(12)").style("opacity", 0.5)
        icebergGroup.append("path").attr("d", titanicHeadOnPath).attr("fill", "black").attr("stroke", "none").attr("transform", "translate(0, -48) scale(15)").style("opacity", 0.8)
    }

    function setCQDGroup() {
        const cqGroup = temperatureContainerContentGroup.append("g").attr("id", "cqGroup").attr("transform", "translate(0,0)").style("opacity", 0)
        const cqGroupTitle = cqGroup.append("text").attr("id", "temperatureContainerSubTitle").attr("x", 0).attr("y", -85).text("Distress calls").attr("font-size", "18pt").attr("text-anchor", "middle").attr("font-weight", "bold").attr("font-style", "normal")
        const cqGroupTextGroup = cqGroup.append("g").attr("id", "cqGroupTextGroup").attr("transform", "translate(-135, 45)")
        const cqTextList1 = ["Titanic alternated betweeen the Morse Code",
                             "distress calls CQD and the newer SOS. 'CQ'",
                             "comes from the French 'sécurité'."]
        cqTextList1.forEach((d,i)=> {
            cqGroupTextGroup.append("text").text(d).attr("x", 0).attr("y", 15*i).attr("font-size", "10pt").attr("font-family", "'Castoro', serif")
        })

        const cqMorseGroup = cqGroup.append("g").attr("id", "cqMorseGroup").attr("transform", "translate(0, 0) scale(0.8)")
        const textColor = "red"
        const morseColor = "black"
        cqMorseGroup.append("text").text("C Q D").attr("x", -80).attr("y", -25).attr("font-size", "28pt").attr("font-weight", "bold").attr("text-anchor", "middle").attr("fill", textColor)
        cqMorseGroup.append("text").text("S O S").attr("x", 80).attr("y", -25).attr("font-size", "28pt").attr("font-weight", "bold").attr("text-anchor", "middle").attr("fill", textColor)
        for(let i=0;i<3;i++) {
            cqMorseGroup.append("circle").attr("cx", 30+i*10).attr("cy", 0).attr("r", 4).attr("fill", morseColor)
            cqMorseGroup.append("rect").attr("x", 66+i*10).attr("y", 0).attr("width", 8).attr("height", 4).attr("fill", morseColor)
            cqMorseGroup.append("circle").attr("cx", 110+i*10).attr("cy", 0).attr("r", 4).attr("fill", morseColor)
        }
        // C:  -.-.
        const cStart = -145
        cqMorseGroup.append("rect").attr("x", cStart).attr("y", 0).attr("width", 8).attr("height", 4).attr("fill", morseColor)
        cqMorseGroup.append("circle").attr("cx", cStart+10+4).attr("cy", 0).attr("r", 4).attr("fill", morseColor)
        cqMorseGroup.append("rect").attr("x", cStart+10+10).attr("y", 0).attr("width", 8).attr("height", 4).attr("fill", morseColor)
        cqMorseGroup.append("circle").attr("cx", cStart+10+10+10+4).attr("cy", 0).attr("r", 4).attr("fill", morseColor)
        // Q: --.-
        const qStart = -97
        cqMorseGroup.append("rect").attr("x", qStart).attr("y", 0).attr("width", 8).attr("height", 4).attr("fill", morseColor)
        cqMorseGroup.append("rect").attr("x", qStart+10).attr("y", 0).attr("width", 8).attr("height", 4).attr("fill", morseColor)
        cqMorseGroup.append("circle").attr("cx", qStart+10+10+4).attr("cy", 0).attr("r", 4).attr("fill", morseColor)
        cqMorseGroup.append("rect").attr("x", qStart+10+10+10).attr("y", 0).attr("width", 8).attr("height", 4).attr("fill", morseColor)
        
        // D: -..
        const dStart = -50
        cqMorseGroup.append("rect").attr("x", dStart).attr("y", 0).attr("width", 8).attr("height", 4).attr("fill", morseColor)
        cqMorseGroup.append("circle").attr("cx", dStart+10+4).attr("cy", 0).attr("r", 4).attr("fill", morseColor)
        cqMorseGroup.append("circle").attr("cx", dStart+10+10+4).attr("cy", 0).attr("r", 4).attr("fill", morseColor)


    }
    
    function setCoalAndAshGroup() {
        const coalAndAshGroup = temperatureContainerContentGroup.append("g").attr("id", "coalAndAshGroup").attr("transform", "translate(0,0)").style("opacity", 0)
        const coalAndAshGroupTitle = coalAndAshGroup.append("text").attr("id", "temperatureContainerSubTitle").attr("x", 0).attr("y", -85).text("Coal and ash").attr("font-size", "18pt").attr("text-anchor", "middle").attr("font-weight", "bold").attr("font-style", "normal")
        const coalAndAshGroupTextGroup = coalAndAshGroup.append("g").attr("id", "coalAndAshGroupTextGroup").attr("transform", "translate(-135, 45)")
        const coalAndAshTextList1 = ["Titanic burned 600 tonnes of coal each day,", "creating 100 tonnes of ash which the Engine", "Room men had to eject into the sea."]
        coalAndAshTextList1.forEach((d,i)=> {
            coalAndAshGroupTextGroup.append("text").text(d).attr("x", 0).attr("y", 15*i).attr("font-size", "10pt").attr("font-family", "'Castoro', serif")
        })
        const coalPath = "M 0 0 M -20 0 L -19 -1 L -17 -4 L -15 -9 L -5 -20 L 5 -19 L 10 0 L 15 10 L 10 15 L 0 18 L -5 15 L -10 15 L -15 12 Z"
        const smallArrowPath = "M 0 0 M -20 0 L -20 -5 L 10 -5 L 10 -10 L 20 0 L 10 10 L 10 5 L -20 5 Z"
        const ashPath = "M 0 0 C 0.09 -0.14 0.16 -0.18 0.22 -0.2 C 0.31 -0.15 0.32 -0.07 0.43 0 Z"
        const oceanPath = "M 0 0 C 0.1833 0 0.24 0.17 0.48 0 C 0.7 0 0.78 0.17 1 0 C 1.17 0 1.25 0.17 1.51 0 C 1.6733 0 1.77 0.19 2 0 C 2.1667 0 2.24 0.23 2.5 0 C 2.6667 0 2.71 0.22 3 0 C 3.18 0 3.29 0.22 3.54 0 C 3.6933 0 3.73 0.23 4 0 L 4 3 L 0 3 Z"
        const coalStartX = -95
        const coalStartY = -20
        coalAndAshGroup.append("path").attr("d", coalPath).attr("fill", "black").attr("transform", `translate(${coalStartX},${coalStartY}) scale(2.2)`).style("opacity", 0.5)
        coalAndAshGroup.append("path").attr("d", coalPath).attr("fill", "black").attr("transform", `translate(${coalStartX},${coalStartY}) scale(2.1)`).style("opacity", 0.5)
        coalAndAshGroup.append("path").attr("d", coalPath).attr("fill", "black").attr("transform", `translate(${coalStartX},${coalStartY}) scale(2.0)`).style("opacity", 1)
        coalAndAshGroup.append("text").text("600").attr("fill", "darkgray").attr("font-size", "20px").attr("text-anchor", "middle").attr("font-weight", "bold").attr("font-style", "normal").style("font-family", "'Roboto', sans-serif").attr("transform", `translate(${coalStartX-5},${coalStartY}) scale(1)`).style("opacity", 0.9)
        coalAndAshGroup.append("text").text("tonnes / day").attr("fill", "DarkGrey").attr("font-size", "10px").attr("text-anchor", "middle").attr("font-weight", "bold").attr("font-style", "normal").style("font-family", "'Roboto', sans-serif").attr("transform", `translate(${coalStartX-5},${coalStartY+15}) scale(1)`).style("opacity", 0.9)
        coalAndAshGroup.append("path").attr("d", smallArrowPath).attr("fill", "red").style("opacity", 0.5).attr("transform", "translate(-45,-20) scale(0.7,1)")
        coalAndAshGroup.append("path").attr("d", ashPath).attr("fill", "gray").style("opacity", 0.8).attr("transform", "translate(-25,5) scale(150,280)")
        coalAndAshGroup.append("path").attr("d", ashPath).attr("fill", "gray").style("opacity", 0.6).attr("transform", "translate(-32,5) scale(180,310)")
        coalAndAshGroup.append("text").text("100t").attr("fill", "black").attr("font-size", "20px").attr("text-anchor", "middle").attr("font-weight", "bold").attr("font-style", "normal").style("font-family", "'Roboto', sans-serif").attr("transform", `translate(${5},${coalStartY+15}) scale(1)`).style("opacity", 0.9)
        coalAndAshGroup.append("path").attr("d", smallArrowPath).attr("fill", "red").style("opacity", 0.5).attr("transform", "translate(50,-20) scale(0.7,1)")
        coalAndAshGroup.append("path").attr("d", oceanPath).attr("fill", "red").attr("stroke", "none").attr("transform", "translate(80, -40) scale(10,15)").style("opacity", 0.5)
    }

    function setTitanicAnchorGroup() {
        const titanicAnchorGroup = temperatureContainerContentGroup.append("g").attr("id", "titanicAnchorGroup").attr("transform", "translate(0,0)").style("opacity", 0)
        const titanicAnchorGroupTitle = titanicAnchorGroup.append("text").attr("id", "temperatureContainerSubTitle").attr("x", 0).attr("y", -85).text("Anchors & chains").attr("font-size", "18pt").attr("text-anchor", "middle").attr("font-weight", "bold").attr("font-style", "normal")
        const titanicAnchorGroupTextGroup = titanicAnchorGroup.append("g").attr("id", "titanicAnchorGroupTextGroup").attr("transform", "translate(-135, 45)")
        const titanicAnchorTextList1 = ["The Titanic had five anchors: the main, centre", "anchor weighed 15 tonnes and was 18ft long.", "1,200ft of chain serviced the five anchors."]
        titanicAnchorTextList1.forEach((d,i)=> {
            titanicAnchorGroupTextGroup.append("text").text(d).attr("x", 0).attr("y", 15*i).attr("font-size", "10pt").attr("font-family", "'Castoro', serif")
        })
        const anchorPath = "M 0 0 L 0.1 -0.01 C 0.11 -0.11 0.19 -0.09 0.26 -0.11 L 0.26 -0.13 C 0.2267 -0.14 0.1933 -0.15 0.16 -0.16 C 0.16 -0.22 0.22 -0.27 0.22 -0.34 L 0.25 -0.34 C 0.25 -0.41 0.21 -0.46 0.18 -0.48 C 0.15 -0.46 0.11 -0.41 0.11 -0.34 L 0.14 -0.34 C 0.14 -0.27 0.09 -0.2 0.03 -0.2 L 0.03 -0.82 L 0.05 -0.82 L 0.05 -1 L -0.05 -1 L -0.05 -0.82 L -0.03 -0.82 L -0.03 -0.2 C -0.09 -0.2 -0.14 -0.27 -0.14 -0.34 L -0.11 -0.34 C -0.11 -0.41 -0.15 -0.46 -0.18 -0.48 C -0.21 -0.46 -0.25 -0.41 -0.25 -0.34 L -0.22 -0.34 C -0.22 -0.27 -0.16 -0.22 -0.16 -0.16 C -0.1933 -0.15 -0.2267 -0.14 -0.26 -0.13 L -0.26 -0.11 C -0.19 -0.09 -0.11 -0.11 -0.1 -0.01 Z"
        titanicAnchorGroup.append("path").attr("d", anchorPath).attr("fill", "black").attr("stroke", "none").attr("transform", "translate(-80, 25) scale(100)").style("opacity", 0.5)
        titanicAnchorGroup.append("path").attr("d", manPath).attr("fill", "red").attr("stroke", "none").attr("transform", "translate(-120, 10) scale(20)").style("opacity", 0.5)
        // Add the 1200 feet of chains
        const chainFlatPath = "M 0 0 C 0 -0.37 1 -0.37 1 0 C 1 0.37 0 0.37 0 0 M 0.43 0 L 0.43 -0.18 C 0.3 -0.18 0.12 -0.12 0.12 0 C 0.12 0.12 0.3 0.18 0.43 0.18 Z M 0.55 0 L 0.55 0.18 C 0.69 0.18 0.88 0.12 0.88 0 C 0.88 -0.12 0.69 -0.18 0.55 -0.18 Z"
        const chainEdgePath = "M 0 0 C 0 -0.08 0 -0.08 0.5 -0.08 C 1 -0.08 1 -0.08 1 0 C 1 0.08 1 0.08 0.5 0.08 C 0 0.08 0 0.08 0 0 Z"
        const chainStartX = -80
        const chainStartY = -67
        const chainXGap = 10
        const chainYGap = 7
        const chainOpacity = 0.5
        const chainData = Array.apply(null, Array(654)).map(function (y, i) { return i; });
        const chainGroup = titanicAnchorGroup.append("g").attr("id", "chainGroup").attr("transform", "translate(0,0)")
        const chainLinks = chainGroup.selectAll("g").data(chainData).enter().append("g").attr("transform", `translate(${chainStartX},${chainStartY})`)
        chainLinks.append("path").attr("d", (d,i)=>i%2==1?chainFlatPath:chainEdgePath).attr("fill", "black").style("opacity", chainOpacity).attr("transform", `scale(15)`)

    }

    setWaterTempGroup()
    setContructionGroup()
    setFunnelGroup()
    setIcebergGroup()
    setCQDGroup()
    setCoalAndAshGroup()
    setTitanicAnchorGroup()

    clickForMoreTemp.on("mouseover", () => {clickForMoreTempRect.transition().duration(300).style("opacity", 0.6)})
    clickForMoreTemp.on("mouseout", () => {clickForMoreTempRect.transition().duration(300).style("opacity", 0.2)})
    clickForMoreTemp.on("click", () => {
        
        oneOfNTemp.text((temperatureContainerState+1) + " / " + totalTemperatureContainerStates)

        if (temperatureContainerState == 0) {
            d3.select("#thermoGroup").transition().duration(1000).style("opacity", 0).attr("transform", "scale(0.01)").transition().duration(1).attr("transform", "scale(1)")
            d3.select("#constructionGroup").transition().duration(1000).style("opacity", 1)
            // d3.select("#constructionGroup").style("opacity", 1)
            temperatureContainerState = 1
        }
        else if (temperatureContainerState == 1) {
            d3.select("#constructionGroup").transition().duration(1000).style("opacity", 0).attr("transform", "scale(0.01)").transition().duration(1).attr("transform", "scale(1)")
            d3.select("#funnelGroup").transition().duration(1000).style("opacity", 1)
            // d3.select("#funnelGroup").style("opacity", 1)
            temperatureContainerState = 2
        }
        else if (temperatureContainerState == 2) {
            d3.select("#funnelGroup").transition().duration(1000).style("opacity", 0).attr("transform", "scale(0.01)").transition().duration(1).attr("transform", "scale(1)")
            d3.select("#coalAndAshGroup").transition().duration(1000).style("opacity", 1)
            // d3.select("#coalAndAshGroup").style("opacity", 1)
            temperatureContainerState = 3
        }
        else if (temperatureContainerState == 3) {
            d3.select("#coalAndAshGroup").transition().duration(1000).style("opacity", 0).attr("transform", "scale(0.01)").transition().duration(1).attr("transform", "scale(1)")
            d3.select("#chainGroup").selectAll("g").style("opacity", 1)
            d3.select("#titanicAnchorGroup").transition().duration(1000).style("opacity", 1)
            const chainStartX = -80
            const chainStartY = -67
            const chainXGap = 10
            const chainYGap = 7
            d3.select("#chainGroup").selectAll("g").transition().duration((d,i)=>i*5).ease(d3.easeBounce)
                .attr("transform", (d,i)=>{
                    if (i<20) {
                        return `translate(${chainStartX+i*chainXGap},${chainStartY})`
                    }
                    else if (i==20) {
                        return `translate(${chainStartX+20*chainXGap},${chainStartY}) rotate(45)`
                    }
                    else if (i==21) {
                        return `translate(${chainStartX+20*chainXGap+1},${chainStartY+chainYGap*2+2}) rotate(-45)`
                    }
                    else if (i<38) {
                        return `translate(${chainStartX+(41-i)*chainXGap},${chainStartY+chainYGap*2})`
                    }
                    else if (i==38) {
                        return `translate(${chainStartX+3*chainXGap+4},${chainStartY+chainYGap*3+2}) rotate(-45)`
                    }
                    else if (i==39) {
                        return `translate(${chainStartX+3*chainXGap+3},${chainStartY+chainYGap*3-1}) rotate(45)`
                    }
                    else if (i<56) {
                        return `translate(${chainStartX+(4+i-40)*chainXGap},${chainStartY+chainYGap*4})`
                    }
                    else if (i==56) {
                        return `translate(${chainStartX+20*chainXGap},${chainStartY+chainYGap*4}) rotate(45)`
                    }
                    else if (i==57) {
                        return `translate(${chainStartX+20*chainXGap+1},${chainStartY+chainYGap*6+2}) rotate(-45)`
                    }
                    else if (i<74) {
                        return `translate(${chainStartX+(77-i)*chainXGap},${chainStartY+chainYGap*6})`
                    }
                    else if (i==74) {
                        return `translate(${chainStartX+3*chainXGap+4},${chainStartY+chainYGap*7+2}) rotate(-45)`
                    }
                    else if (i==75) {
                        return `translate(${chainStartX+3*chainXGap+3},${chainStartY+chainYGap*7-1}) rotate(45)`
                    }
                    else if (i<92) {
                        return `translate(${chainStartX+(4+i-76)*chainXGap},${chainStartY+chainYGap*8})`
                    }
                    else if (i==92) {
                        return `translate(${chainStartX+20*chainXGap},${chainStartY+chainYGap*8}) rotate(45)`
                    }
                    else if (i==93) {
                        return `translate(${chainStartX+20*chainXGap+1},${chainStartY+chainYGap*10+2}) rotate(-45)`
                    }
                    else if (i<110) {
                        return `translate(${chainStartX+(113-i)*chainXGap},${chainStartY+chainYGap*10})`
                    }
                    else if (i==110) {
                        return `translate(${chainStartX+3*chainXGap+4},${chainStartY+chainYGap*11+2}) rotate(-45)`
                    }
                    else if (i==111) {
                        return `translate(${chainStartX+3*chainXGap+3},${chainStartY+chainYGap*11-1}) rotate(45)`
                    }
                    else if (i<132) {
                        return `translate(${chainStartX+(4+i-112)*chainXGap},${chainStartY+chainYGap*12})`
                    }
                    else if (i==132) {
                        return `translate(${chainStartX+24*chainXGap-1},${chainStartY+chainYGap*12}) rotate(-45)`
                    }
                    else if (i==133) {
                        return `translate(${chainStartX+25*chainXGap-2},${chainStartY+chainYGap*9+1}) rotate(90)`
                    }
                    else if (i<242) {
                        return `translate(${chainStartX+25*chainXGap-2},${chainStartY+chainYGap*9+1-(i-133)*chainXGap}) rotate(90)`
                    }
                    else if (i==242) {
                        return `translate(${chainStartX+25*chainXGap-3},${chainStartY+chainYGap*9+1-(i-134)*chainXGap+4}) rotate(-45)`
                    }
                    else if (i==243) {
                        return `translate(${chainStartX+26*chainXGap-7},${chainStartY+chainYGap*9+1-(i-134)*chainXGap+3}) rotate(45)`
                    }
                    else if (i<440) {
                        return `translate(${chainStartX+27*chainXGap-9},${(chainStartY+chainYGap*9+1)-(110*chainXGap)+chainXGap*(i-242)}) rotate(90)`
                    }
                    else if (i==440) {
                        return `translate(${chainStartX+26*chainXGap-9},${(chainStartY+chainYGap*9+1)-(110*chainXGap)+chainXGap*(199)+1}) rotate(-45)`
                    }
                    else if (i==441) {
                        return `translate(${chainStartX+26*chainXGap-16},${(chainStartY+chainYGap*9+1)-(110*chainXGap)+chainXGap*(199)+8}) rotate(-45)`
                    }
                    else if (i==442) {
                        return `translate(${chainStartX+26*chainXGap-23},${(chainStartY+chainYGap*9+1)-(110*chainXGap)+chainXGap*(199)+15}) rotate(-45)`
                    }
                    else if (i<573) {
                        return `translate(${(chainStartX+23*chainXGap-4)-(i-443)*chainXGap},${(chainStartY+chainYGap*9+1)-(110*chainXGap)+chainXGap*(199)+14})`
                    }
                    else if (i==573) {
                        return `translate(${(chainStartX+23*chainXGap-4)-((573-443)*chainXGap-4)},${(chainStartY+chainYGap*9+1)-(110*chainXGap)+chainXGap*(201)+2}) rotate(-45)`
                    }
                    else if (i==574) {
                        return `translate(${(chainStartX+23*chainXGap-4)-((573-443)*chainXGap-6)},${(chainStartY+chainYGap*9+1)-(110*chainXGap)+chainXGap*(201)-1}) rotate(45)`
                    }
                    else if (i<653) {
                        return `translate(${(chainStartX+23*chainXGap-4)-((572-443)*chainXGap-2)+((i-575)*chainXGap)},${(chainStartY+chainYGap*9+1)-(110*chainXGap)+chainXGap*(202)-1})`
                    }
                    else if (i==653) {
                        return `translate(${(chainStartX+23*chainXGap-4)-((572-443)*chainXGap-2)+((i-575)*chainXGap)},${(chainStartY+chainYGap*9+1)-(110*chainXGap)+chainXGap*(202)-4}) rotate(45)`
                    }

                })
            temperatureContainerState = 4
        }
        else if (temperatureContainerState == 4) {

            d3.interrupt(d3.select("#chainGroup").node())
            d3.select("#chainGroup").selectAll("g").attr("transform", "translate(-80,-67)").style("opacity", 0)
            d3.select("#titanicAnchorGroup").transition().duration(1000).style("opacity", 0).attr("transform", "scale(0.01)").transition().duration(1).attr("transform", "scale(1)")

            d3.select("#icebergGroup").transition().duration(1000).style("opacity", 1)
            temperatureContainerState = 5
        }
        else if (temperatureContainerState == 5) {
            d3.select("#icebergGroup").transition().duration(1000).style("opacity", 0).attr("transform", "scale(0.01)").transition().duration(1).attr("transform", "scale(1)")
            d3.select("#cqGroup").transition().duration(1000).style("opacity", 1)
            temperatureContainerState = 6
        }
        else if (temperatureContainerState == 6) {
            d3.select("#cqGroup").transition().duration(1000).style("opacity", 0).attr("transform", "scale(0.01)").transition().duration(1).attr("transform", "scale(1)")
            d3.select("#thermoGroup").transition().duration(1000).style("opacity", 1)
            temperatureContainerState = 0
        }

    })

}


setLifeboatContainer()

function setLifeboatContainer() {

    const transitionDuration = 500
    
    const lifeboatsContainerTitleGroup = lifeboatsContainer.append("g").attr("id", "lifeboatsContainerTitleGroup").attr("transform", "translate(950,0)")
    const lifeboatsContainerTitle = lifeboatsContainerTitleGroup.append("text").attr("id", "lifeboatsContainerTitle").attr("x", 0).attr("y", lifeboatsContainerHeight-50).text("LIFEBOATS OF THE TITANIC").attr("font-size", "18pt").attr("text-anchor", "end").attr("font-weight", "bold").attr("font-style", "normal")
    const lifeboatsContainerSubTitle = lifeboatsContainerTitleGroup.append("text").attr("id", "lifeboatsContainerTitle").attr("x", 0).attr("y", lifeboatsContainerHeight-25).text("Many were saved, but lifeboat capacity was insufficient, and not all capacity was used").attr("font-size", "14pt").attr("text-anchor", "end").style("font-weight", "bold").style("font-family", "Castoro, serif")

    // Add liner path

    const soulsAboardNumber = 2224
    const sumOfAllSurvivors = lifeboatData.reduce((accumulator, currentValue) => accumulator + currentValue.wikiSurvivors, 0)
    let finalSoulsAboardNumber = 2224-sumOfAllSurvivors
    finalSoulsAboardNumber = 1514
    const linerBackgroundGroup = lifeboatsContainer.append("g").attr("id", "linerBackground").attr("transform", "translate(50,150) rotate(90) scale(8, 9)")
    const linerBackgroundpath = linerBackgroundGroup.append("path").attr("id", "linerBackgroundpath").attr("d", linerPath).attr("fill", "black").attr("stroke", "none").style("opacity", 0.3)
    const soulsAboard = linerBackgroundGroup.append("text").attr("id", "soulsAboard").attr("x", 0).attr("y", 0).text("Souls remaining on Titanic:").attr("font-size", "2.5px").attr("text-anchor", "start").attr("font-weight", "normal").attr("font-style", "normal").style("font-family", "'Roboto', sans-serif").style("opacity", 0).attr("transform", "translate(1, -21) rotate(-90)")
    const soulsAboardNumberText = linerBackgroundGroup.append("text").attr("id", "soulsAboardNumberText").attr("x", 0).attr("y", 0).text(d3.format(",")(soulsAboardNumber)).attr("font-size", "6px").attr("text-anchor", "end").attr("font-weight", "bold").attr("font-style", "normal").style("font-family", "'Roboto', sans-serif").style("opacity", 0).attr("transform", "translate(2, -67) rotate(-90)")
    const timeOfNight = linerBackgroundGroup.append("text").attr("id", "timeOfNight").attr("x", 0).attr("y", 0).text("12:40am").attr("font-size", "3px").attr("text-anchor", "end").attr("font-weight", "normal").attr("font-style", "normal").style("font-family", "'Roboto Mono', monospace").style("opacity", 0).attr("transform", "translate(1, -18) rotate(-90)")

    // Add lifeboats

    const lifeboatsGroup = lifeboatsContainer.append("g").attr("id", "lifeboatsGroup").attr("transform", `translate(50,150)`)
    const lifeboats = lifeboatsGroup.selectAll("g").data(lifeboatData).enter().append("g").attr("id", d => `lifeboat${d.boat}`).attr("transform", d => `translate(${d.startingPos.x},${d.startingPos.y})`)
    lifeboats.append("path").attr("d", lifeboatPath)
            .attr("fill", d=>d.type=="Standard"?"black":d.type=="Collapsible"?"LightGray":"gray")
            .attr("stroke", "black")
    const lifeboatsTextGroups = lifeboats.append("g").attr("id", "lifeboatsTextGroups").attr("transform", "translate(0,0)").style("opacity", 0)
    lifeboatsTextGroups.append("text").attr("id", "lifeboatsText").attr("x", 0).attr("y", 11).text(d => "Lifeboat " + d.boat).attr("font-size", "6px").attr("text-anchor", "middle").attr("font-weight", "bold").attr("font-style", "normal").style("font-family", "'Roboto', sans-serif")
    lifeboatsTextGroups.append("rect").attr("x", -15).attr("y", 14).attr("width", 30).attr("height", 5).attr("fill", "white").attr("stroke", "black").attr("stroke-width", 0.5).attr("rx", 1).attr("ry", 1).style("opacity", 0.5)
    lifeboatsTextGroups.append("rect").attr("x", -15).attr("y", 14).attr("width", d=>30*d.wikiSurvivors/d.capacity).attr("height", 5).attr("fill", "red").attr("stroke", "black").attr("stroke-width", 0.5).attr("rx", 1).attr("ry", 1).style("opacity", 0.5)
    lifeboatsTextGroups.append("text").attr("id", "lifeboatsText").attr("x", 0).attr("y", 25).text(d => "Aboard: " + d.wikiSurvivors).attr("font-size", "5px").attr("text-anchor", "middle").attr("font-weight", "bold").attr("font-style", "normal").style("font-family", "'Roboto', sans-serif")
    lifeboatsTextGroups.append("text").attr("id", "lifeboatsText").attr("x", 0).attr("y", 31).text(d => "Capacity: " + d.capacity).attr("font-size", "5px").attr("text-anchor", "middle").attr("font-weight", "bold").attr("font-style", "normal").style("font-family", "'Roboto', sans-serif")
    
    // Add lifeboat capacity chart
    const capacityNumber = lifeboatData.reduce((accumulator, item) => accumulator + item.capacity, 0)
    const savedNumber = lifeboatData.reduce((accumulator, item) => accumulator + item.wikiSurvivors, 0)
    const lcData = [{cat: "Total souls aboard Titanic", value: soulsAboardNumber}, {cat: "Lifeboat capacity", value: capacityNumber}, {cat: "Saved", value: savedNumber}]
    const lifeboatCapacityScale = d3.scaleLinear().domain([0,soulsAboardNumber]).range([0,600])
    const lifeboatsCapacityChart = lifeboatsContainer.append("g").attr("id", "lifeboatsCapacityChart").attr("transform", `translate(170,230)`).style("pointer-events", "none")
    const lccGroups = lifeboatsCapacityChart.selectAll("g").data(lcData).enter().append("g").attr("transform", (d,i)=>`translate(0, ${i*30})`)
    lccGroups.append("rect").attr("x", d=>0).attr("y", 0).attr("height", 25).attr("width", d=>lifeboatCapacityScale(d.value))
        .attr("fill", "black").style("opacity", 0.7)
    lccGroups.append("text").attr("x", 0).attr("y", 0).attr("dx", 5).attr("dy", 18).text(d=>d.cat).attr("fill", "white").attr("text-anchor", "start")
    lccGroups.append("text").attr("x", d=>lifeboatCapacityScale(d.value)).attr("y", 0).attr("dx", -5).attr("dy", 18).text(d=>d3.format(",")(d.value)).attr("fill", "white").attr("text-anchor", "end")
    lccGroups.append("line").attr("x1", -5).attr("y1", -5).attr("x2", -5).attr("y2", 30).attr("stroke", "gray").attr("stroke-width", 8)

    // Add lifeboat overview widgets
    const lifeboatOverviewGroup = lifeboatsContainer.append("g").attr("id", "lifeboatOverviewGroup").attr("transform", `translate(180,20)`)
    const clinkerGroup = lifeboatOverviewGroup.append("g").attr("id", "clinkerGroup").attr("transform", `translate (0,0)`)
    clinkerGroup.append("path").attr("d", lifeboatPath).attr("fill", "black").attr("stroke", "black").attr("transform", `translate(40,20) scale(2)`)
    clinkerGroup.append("text").attr("x", 80).attr("y", 25).text("Wooden lifeboats").attr("font-size", "14px").attr("font-family", "'Castoro', sans-serif").attr("font-weight", "bold")
    clinkerGroup.append("text").attr("x", 80).attr("y", 45).text("Passenger capacity: 65").attr("font-size", "10px").attr("font-family", "'Castoro', sans-serif").attr("font-weight", "bold")
    clinkerGroup.append("text").attr("x", 24).attr("y", 50).text("x 14").attr("font-size", "20px").attr("font-family", "'Castoro', sans-serif").attr("font-weight", "bold")
    const cutterGroup = lifeboatOverviewGroup.append("g").attr("id", "cutterGroup").attr("transform", `translate (220,0)`)
    cutterGroup.append("path").attr("d", lifeboatPath).attr("fill", "gray").attr("stroke", "black").attr("stroke-width", "1").attr("transform", `translate(40,20) scale(2)`)
    cutterGroup.append("text").attr("x", 80).attr("y", 25).text("Emergency cutters").attr("font-size", "14px").attr("font-family", "'Castoro', sans-serif").attr("font-weight", "bold")
    cutterGroup.append("text").attr("x", 80).attr("y", 45).text("Passenger capacity: 40").attr("font-size", "10px").attr("font-family", "'Castoro', sans-serif").attr("font-weight", "bold")
    cutterGroup.append("text").attr("x", 24).attr("y", 50).text("x 2").attr("font-size", "20px").attr("font-family", "'Castoro', sans-serif").attr("font-weight", "bold")
    const collapsibleGroup = lifeboatOverviewGroup.append("g").attr("id", "collapsibleGroup").attr("transform", `translate (440,0)`)
    collapsibleGroup.append("path").attr("d", lifeboatPath).attr("fill", "black").attr("fill", "LightGray").attr("stroke", "black").attr("stroke-width", "1").attr("transform", `translate(40,20) scale(2)`)
    collapsibleGroup.append("text").attr("x", 80).attr("y", 25).text("Collapsible Engelhardts").attr("font-size", "14px").attr("font-family", "'Castoro', sans-serif").attr("font-weight", "bold")
    collapsibleGroup.append("text").attr("x", 80).attr("y", 45).text("Passenger capacity: 47").attr("font-size", "10px").attr("font-family", "'Castoro', sans-serif").attr("font-weight", "bold")
    collapsibleGroup.append("text").attr("x", 24).attr("y", 50).text("x 4").attr("font-size", "20px").attr("font-family", "'Castoro', sans-serif").attr("font-weight", "bold")
    

    // Add a 'hoveroverrect' and on hover, reduce opacity of static items and run lifeboat sequence

    const lifeboatsHoverRect = lifeboatsContainer.append("rect").attr("id", "lifeboatsHoverRect").attr("x", 10).attr("y", 10).attr("width", lifeboatsContainerWidth-20).attr("height", lifeboatsContainerHeight-20).attr("fill", "red").style("opacity", 0).attr("stroke", "none").style("pointer-events", "all")
        .on("mouseover", function() {
            lifeboatsHoverRect.style("opacity", 0.1)
            lifeboats.transition().delay((d,i)=>(d.order-1)*transitionDuration).duration(1000).attr("transform", d => {
              return `translate(${d.endingPos.x},${d.endingPos.y}) scale(2)`
            })
            lifeboatsTextGroups.transition().delay((d,i)=>(d.order-1)*transitionDuration).duration(1000).style("opacity", 1)
            soulsAboardNumberText.style("opacity", 0.5)
            soulsAboard.style("opacity", 0.5)
            timeOfNight.style("opacity", 0.8)
            soulsAboardNumberText.transition().ease(d3.easeLinear).duration(transitionDuration*20)
                    .textTween(()=>{
                        const i = d3.interpolate(soulsAboardNumber, finalSoulsAboardNumber)
                        return function(t) {
                            return d3.format(",")(Math.round(i(t)))
                        }
                    })
            timeOfNight.transition().ease(d3.easeLinear).duration(transitionDuration*20)
                    .textTween(()=>{
                        const i = d3.interpolate(40,140)
                        return t=>{
                            let hour = (i(t)<60)? "12" : 
                                       (i(t)<120)? "1" : "2"
                            let minute = Math.floor(i(t)) % 60
                            let myColon = (minute<10) ? ":0" : ":"
                            return hour + myColon + minute + "am"
                        }
                    })
                    .on("end", ()=>linerBackgroundpath.transition().duration(transitionDuration*5).style("opacity", 0))
            lifeboatsCapacityChart.transition().duration(transitionDuration).style("opacity", 0)
            lifeboatOverviewGroup.transition().duration(transitionDuration).style("opacity", 0)
        })
        .on("mouseout", function() {
            lifeboatsHoverRect.style("opacity", 0)
            lifeboats.transition().duration(transitionDuration).attr("transform", d => `translate(${d.startingPos.x},${d.startingPos.y}) scale(1)`)
            lifeboatsTextGroups.transition().duration(transitionDuration).style("opacity", 0)
            d3.interrupt(d3.select("#soulsAboardNumberText").node())
            soulsAboardNumberText.text(d3.format(",")(soulsAboardNumber))
            d3.interrupt(d3.select("#timeOfNight").node())
            timeOfNight.text("12:40am")
            d3.interrupt(d3.select("#linerBackgroundpath").node())
            linerBackgroundpath.style("opacity", 0.3)
            soulsAboardNumberText.style("opacity", 0)
            soulsAboard.style("opacity", 0)
            timeOfNight.style("opacity", 0)
            lifeboatsCapacityChart.transition().duration(transitionDuration).style("opacity", 1)
            lifeboatOverviewGroup.transition().duration(transitionDuration).style("opacity", 1)
        })
    

}

setTertiaryContainer()

function setTertiaryContainer() {


    const tertiaryContainerTitleGroup = tertiaryContainer.append("g").attr("id", "tertiaryContainerTitleGroup").attr("transform", "translate(20,450)")
    const tertiaryContainerTitle = tertiaryContainerTitleGroup.append("text").attr("id", "tertiaryContainerTitle").attr("x", 0).attr("y", 0).text("POWERING THE TITANIC").attr("font-size", "18pt").attr("text-anchor", "start").attr("font-weight", "bold").attr("font-style", "normal")
    const tertiaryContainerSubTitle = tertiaryContainerTitleGroup.append("text").attr("id", "tertiaryContainerSubTitle").attr("x", 0).attr("y", 25).text("Three vast propellors were commanded by the Officer in Charge using Engine-Order Telegraphs").attr("font-size", "14pt").attr("text-anchor", "start").style("font-weight", "bold").style("font-family", "Castoro, serif")


    /////////////////////////////////////////////////
    //// PROPELLOR DEVICE
    /////////////////////////////////////////////////

    // wing props 23 ft 6
    // centre prop 17 ft

    let centrePropsX = 680
    let centrePropsY = 280
    let centrePropsScale = 0.2
    let sidePropsOffset = 90
    let leftPropsX = - sidePropsOffset
    let leftPropsY = 0
    let rightPropsX = + sidePropsOffset
    let rightPropsY = 0
    let sidePropsScale = 23.5/17 * centrePropsScale

    const propScale = 1.4

    const propellorBladeGroup = tertiaryContainer.append("g").attr("id", "propellorBladeGroup").attr("transform", `translate(${centrePropsX},${centrePropsY}) scale(${propScale})`)

    let currentRotation = 0
    // const propellorBladePath2 = "M 0 0 M 0 -15 C -50 -30 -50 -180 0 -180 C 50 -180 50 -30 0 -15 Z"
    const backgroundTitanicPath = "M 0 0 M 0 120 L -100 120 C -400 120 -400 120 -400 -200 L 400 -200 C 400 120 400 120 100 120 Z"
    const propellorBladePath = "M 0 0 M 0 -15 C -62 -34 -54 -29 -92 -60 C -116 -84 -130 -121 -87 -148 C -37 -176 18 -154 24 -77 C 25 -61 22 -46 0 -15 Z"
    const backgroundTitanicFill = propellorBladeGroup.append("path").attr("id", "backgroundTitanicFill").attr("d", backgroundTitanicPath).attr("fill", "gray").attr("stroke", "none").style("opacity", 0.4).attr("pointer-events", "all")
            .attr("transform", `translate(${0},${20}) scale(${0.5}, ${0.4})`)

    const propellorGroupCentre = propellorBladeGroup.append("g").attr("id", "propellorGroupCentre").attr("transform", `translate(${0},${0}) scale(${centrePropsScale})`)
    propellorGroupCentre.append("circle").attr("cx", 0).attr("cy", 0).attr("r", 40).attr("fill", "black").attr("stroke", "none")
    propellorGroupCentre.append("path").attr("d", propellorBladePath).attr("fill", "black").attr("stroke", "none")
    propellorGroupCentre.append("path").attr("d", propellorBladePath).attr("fill", "black").attr("stroke", "none").attr("transform", "rotate(120)")
    propellorGroupCentre.append("path").attr("d", propellorBladePath).attr("fill", "black").attr("stroke", "none").attr("transform", "rotate(240)")

    const propellorGroupLeft = propellorBladeGroup.append("g").attr("id", "propellorGroupLeft").attr("transform", `translate(${leftPropsX},${leftPropsY}) scale(${sidePropsScale})`)
    propellorGroupLeft.append("circle").attr("cx", 0).attr("cy", 0).attr("r", 40).attr("fill", "black").attr("stroke", "none")
    propellorGroupLeft.append("path").attr("d", propellorBladePath).attr("fill", "black").attr("stroke", "none").attr("transform", "scale(-1,1)")
    propellorGroupLeft.append("path").attr("d", propellorBladePath).attr("fill", "black").attr("stroke", "none").attr("transform", "rotate(120) scale(-1,1)")
    propellorGroupLeft.append("path").attr("d", propellorBladePath).attr("fill", "black").attr("stroke", "none").attr("transform", "rotate(240) scale(-1,1)")

    const propellorGroupRight = propellorBladeGroup.append("g").attr("id", "propellorGroupRight").attr("transform", `translate(${rightPropsX},${rightPropsY}) scale(${sidePropsScale})`)
    propellorGroupRight.append("circle").attr("cx", 0).attr("cy", 0).attr("r", 40).attr("fill", "black").attr("stroke", "none")
    propellorGroupRight.append("path").attr("d", propellorBladePath).attr("fill", "black").attr("stroke", "none")
    propellorGroupRight.append("path").attr("d", propellorBladePath).attr("fill", "black").attr("stroke", "none").attr("transform", "rotate(120)")
    propellorGroupRight.append("path").attr("d", propellorBladePath).attr("fill", "black").attr("stroke", "none").attr("transform", "rotate(240)")

    const manGroupToScale = propellorBladeGroup.append("g").attr("id", "manGroupToScale").attr("transform", `translate(${-180},${47}) scale(${20})`)
    const manPath2 = "M -1.8 -37.8 c -2.9 0.5 -5.4 2.2 -7 4.6 c -1.3 2 -1.9 4.3 -1.7 6.8 c 0.3 3.9 3 7.4 6.6 8.9 c 1.4 0.6 2.1 0.7 3.9 0.7 c 1.7 0 2.1 -0.1 3.4 -0.5 c 2.6 -0.8 5.2 -3.1 6.3 -5.6 c 1.2 -2.7 1.3 -5.8 0.1 -8.6 c -0.7 -1.7 -2.3 -3.7 -3.8 -4.7 c -2.3 -1.5 -5.2 -2.2 -7.8 -1.7 Z M -12.9 -14.4 c -0.1 0 -0.5 0.1 -0.9 0.1 c -1.1 0.2 -2.7 0.7 -3.7 1.3 c -3.9 2 -6.5 5.7 -7.3 10.2 c -0.1 0.6 -0.1 4.5 -0.1 18.1 l 0 17.4 l 0.2 0.7 c 0.7 2.2 3.1 3.5 5.5 3 c 1.6 -0.4 2.7 -1.3 3.3 -2.8 l 0.2 -0.6 l 0 -15.5 l 0 -15.5 l 1.1 0 l 1.1 0 l 0 41.5 l 0 41.5 l 0.2 0.6 c 0.6 1.7 1.5 2.8 2.9 3.5 c 1.9 0.9 3.9 0.9 5.9 0 c 1.5 -0.7 2.7 -2.2 3.1 -3.9 c 0.1 -0.4 0.1 -5.4 0.2 -24.7 l 0 -24.2 l 1.1 0 l 1.1 0 l 0 24.1 c 0 20.8 0 24.2 0.1 24.8 c 0.6 2.9 3.4 4.9 6.6 4.7 c 2.6 -0.2 4.6 -1.7 5.4 -4 l 0.3 -0.8 l 0 -41.5 l 0 -41.5 l 1.1 0 l 1.1 0 l 0.1 15.5 c 0 11 0.1 15.6 0.2 15.8 c 0.8 2 2.3 3.1 4.5 3.1 c 2.3 0 4.1 -1.6 4.5 -4 c 0.1 -0.6 0.1 -5.4 0.1 -17.7 c 0 -15.9 -0.1 -17 -0.2 -17.9 c -1.1 -5.7 -5 -9.9 -10.5 -11.3 l -1.1 -0.3 l -12.9 0 c -7.1 0 -13 0 -13 0 Z"
    const propToManScale = 6 * 180 / 17
    manGroupToScale.append("path").attr("d", manPath).attr("fill", "red").attr("stroke", "none").style("opacity", 1)
    manGroupToScale.append("text").attr("x", -0.5).attr("y", 0).text("Dry dock worker").attr("fill", "red").attr("stroke", "none").attr("font-size", 0.3).attr("text-anchor", "end").attr("font-family", "'Roboto Mono', monospace").style("opacity", 1)
    manGroupToScale.append("text").attr("x", -0.5).attr("y", 0.5).text("for scale").attr("fill", "red").attr("stroke", "none").attr("font-size", 0.3).attr("text-anchor", "end").attr("font-family", "'Roboto Mono', monospace").style("opacity", 1)

    const propDataLeftX =  20
    const propDataRightX = -150
    const propellorGroupDataGroup = propellorBladeGroup.append("g").attr("id", "propellorGroupDataGroup").attr("transform", `translate(${0},${80}) scale(${1})`)
    
    propellorGroupDataGroup.append("text").text("Speed:").attr("transform", `translate(${propDataLeftX},${0})`).attr("fill", "black").attr("stroke", "none").attr("font-size", 10).attr("text-anchor", "start").attr("font-family", "'Roboto Mono', monospace")
    const knotsIndicator = propellorGroupDataGroup.append("text").text("0 knots").attr("transform", `translate(${propDataLeftX+40},${0})`).attr("fill", "black").attr("stroke", "none").attr("font-size", 10).attr("text-anchor", "start").attr("font-family", "'Roboto Mono', monospace").attr("font-weight", "bold")
    
    propellorGroupDataGroup.append("text").text("Turbine:").attr("transform", `translate(${propDataRightX},${0})`).attr("fill", "black").attr("stroke", "none").attr("font-size", 10).attr("text-anchor", "start").attr("font-family", "'Roboto Mono', monospace")
    const turbineIndicator = propellorGroupDataGroup.append("text").text("Disengaged").attr("transform", `translate(${propDataRightX+55},${0})`).attr("fill", "black").attr("stroke", "none").attr("font-size", 10).attr("text-anchor", "start").attr("font-family", "'Roboto Mono', monospace").attr("font-weight", "bold")
    
    propellorGroupDataGroup.append("text").text("RPM:").attr("transform", `translate(${propDataLeftX},${15})`).attr("fill", "black").attr("stroke", "none").attr("font-size", 10).attr("text-anchor", "start").attr("font-family", "'Roboto Mono', monospace")
    const rpmIndicator = propellorGroupDataGroup.append("text").text("0").attr("transform", `translate(${propDataLeftX+40},${15})`).attr("fill", "black").attr("stroke", "none").attr("font-size", 10).attr("text-anchor", "start").attr("font-family", "'Roboto Mono', monospace").attr("font-weight", "bold")
    
    propellorGroupDataGroup.append("text").text("Order:").attr("transform", `translate(${propDataRightX},${15})`).attr("fill", "black").attr("stroke", "none").attr("font-size", 10).attr("text-anchor", "start").attr("font-family", "'Roboto Mono', monospace")
    const orderIndicator = propellorGroupDataGroup.append("text").text("Stop").attr("transform", `translate(${propDataRightX+55},${15})`).attr("fill", "black").attr("stroke", "none").attr("font-size", 10).attr("text-anchor", "start").attr("font-family", "'Roboto Mono', monospace").attr("font-weight", "bold")
    
    

    const backgroundTitanic = propellorBladeGroup.append("path").attr("id", "backgroundTitanic").attr("d", backgroundTitanicPath).attr("fill", "none").attr("stroke", "none").style("opacity", 0.5).attr("pointer-events", "all")
        .attr("transform", `translate(${0},${0}) scale(${0.1})`)
        // .on("mouseover", function() {
        //     centrePropAngleIncrement = 0.8
        //     sidePropAngleIncrement = 0.8
        // })
        // .on("mouseout", function() {
        //     centrePropAngleIncrement = 0.1
        //     sidePropAngleIncrement = 0.1
        // })


    let sidePropAngle = 0
    let centrePropAngle = 0
    let sidePropAngleIncrement = 0
    let centrePropAngleIncrement = 0
    const propellorDuration = 10

    function rotatePropellor() {
        sidePropAngle += sidePropAngleIncrement
        centrePropAngle += centrePropAngleIncrement
        propellorGroupCentre.transition().ease(d3.easeLinear).duration(propellorDuration).attr("transform", `translate(${0},${0}) rotate(${centrePropAngle}) scale(${centrePropsScale})`)
        .on("end", rotatePropellor2)
        propellorGroupLeft.transition().ease(d3.easeLinear).duration(propellorDuration).attr("transform", `translate(${leftPropsX},${leftPropsY}) rotate(${-sidePropAngle}) scale(${sidePropsScale})`)
        .on("end", rotatePropellor2)
        propellorGroupRight.transition().ease(d3.easeLinear).duration(propellorDuration).attr("transform", `translate(${rightPropsX},${rightPropsY}) rotate(${sidePropAngle}) scale(${sidePropsScale})`)
        .on("end", rotatePropellor2)
    }

    function rotatePropellor2() {
        sidePropAngle += sidePropAngleIncrement
        centrePropAngle += centrePropAngleIncrement
        propellorGroupCentre.transition().ease(d3.easeLinear).duration(propellorDuration).attr("transform", `translate(${0},${0}) rotate(${centrePropAngle}) scale(${centrePropsScale})`)
        .on("end", rotatePropellor)
        propellorGroupLeft.transition().ease(d3.easeLinear).duration(propellorDuration).attr("transform", `translate(${leftPropsX},${leftPropsY}) rotate(${-sidePropAngle}) scale(${sidePropsScale})`)
        .on("end", rotatePropellor)
        propellorGroupRight.transition().ease(d3.easeLinear).duration(propellorDuration).attr("transform", `translate(${rightPropsX},${rightPropsY}) rotate(${sidePropAngle}) scale(${sidePropsScale})`)
        .on("end", rotatePropellor)
    }

    rotatePropellor()

    ///////////////////////////////////
    // ENGINE ORDER TELEGRAPH
    ///////////////////////////////////

    const telegraphX = 160
    const telegraphY = 210
    const telegraphScale = 1.4

    const telegraphGroup = tertiaryContainer.append("g").attr("id", "telegraphGroup").attr("transform", `translate(${telegraphX},${telegraphY}) scale(${telegraphScale})`)

    telegraphGroup.append("circle").attr("id", "telegraphBackground").attr("cx", 0).attr("cy", 0).attr("r", 100).attr("fill", "red").attr("stroke", "black").attr("stroke-width", 2).style("opacity", 0.5)
    telegraphGroup.append("circle").attr("id", "telegraphBackground").attr("cx", 0).attr("cy", 0).attr("r", 93).attr("fill", "black").attr("stroke", "gray").attr("stroke-width", 2)
    telegraphGroup.append("text").text("Titanic had Engine-Order Telegraphs on the").attr("x", -80).attr("y", 115).attr("fill", "black").attr("stroke", "none").attr("font-size", 8).attr("text-anchor", "start").style("font-weight", "normal").style("font-family", "Castoro, serif")
    telegraphGroup.append("text").text("main bridge and the aft docking bridge.").attr("x", -80).attr("y", 125).attr("fill", "black").attr("stroke", "none").attr("font-size", 8).attr("text-anchor", "start").style("font-weight", "normal").style("font-family", "Castoro, serif")
    // telegraphGroup.append("text").text(" - one on the aft docking bridge").attr("x", -70).attr("y", 135).attr("fill", "black").attr("stroke", "none").attr("font-size", 8).attr("text-anchor", "start").style("font-weight", "normal").style("font-family", "Castoro, serif")

    const telegraphStates = [{name: "FULL", fullName: "Full Astern", direction: "Astern", speed: 1, sidePropAngleIncrement: -4, centrePropAngleIncrement: 0, knots: 18, rpm: 75, turbine: "Disengaged"},
                             {name: "HALF", fullName: "Half Astern", direction: "Astern", speed: 0.5, sidePropAngleIncrement: -2, centrePropAngleIncrement: 0, knots: 13.4, rpm: 50, turbine: "Disengaged"},
                             {name: "SLOW", fullName: "Slow Astern", direction: "Astern", speed: 0.25, sidePropAngleIncrement: -1, centrePropAngleIncrement: 0, knots: 8.7, rpm: 30, turbine: "Disengaged"},
                             {name: "DEAD", fullName: "Dead Slow Astern", direction: "Astern", speed: 0.1, sidePropAngleIncrement: -0.5, centrePropAngleIncrement: 0, knots: 6.2, rpm: 20, turbine: "Disengaged"},
                             {name: "STAND", fullName: "Stand By Astern", direction: "Stop", speed: 0, sidePropAngleIncrement: 0, centrePropAngleIncrement: 0, knots: 0, rpm: 0, turbine: "Disengaged"},
                             {name: "STOP", fullName: "Stop", direction: "Stop", speed: 0, sidePropAngleIncrement: 0, centrePropAngleIncrement: 0, knots: 0, rpm: 0, turbine: "Disengaged"},
                             {name: "STAND", fullName: "Stand By Ahead", direction: "Stop", speed: 0, sidePropAngleIncrement: 0, centrePropAngleIncrement: 0, knots: 0, rpm: 0, turbine: "Disengaged"},
                             {name: "DEAD", fullName: "Dead Slow Ahead", direction: "Ahead", speed: 0.1, sidePropAngleIncrement: 0.5, centrePropAngleIncrement: 0, knots: 6.2, rpm: 20, turbine: "Disengaged"},
                             {name: "SLOW", fullName: "Slow Ahead", direction: "Ahead", speed: 0.25, sidePropAngleIncrement: 1, centrePropAngleIncrement: 0, knots: 8.7, rpm: 30, turbine: "Disengaged"},
                             {name: "HALF", fullName: "Half Ahead", direction: "Ahead", speed: 0.5, sidePropAngleIncrement: 2, centrePropAngleIncrement: 4, knots: 15.5, rpm: 50, turbine: "Engaged"},
                             {name: "FULL", fullName: "Full Ahead", direction: "Ahead", speed: 1, sidePropAngleIncrement: 4, centrePropAngleIncrement: 8, knots: 22.5, rpm: 75, turbine: "Engaged"}]

    const telegraphStateGroup = telegraphGroup.append("g").attr("id", "telegraphStateGroup").attr("transform", `translate(${0},${0})`)
    const telegraphStateItems = telegraphStateGroup.selectAll("g").data(telegraphStates).enter().append("g").attr("id", (d,i) => `telegraphStateItem${i}`).attr("transform", `translate(${0},${0})`)
    const telgraphArc = d3.arc().innerRadius(50).outerRadius(90)
            .startAngle((d,i) => -Math.PI*0.8 + i*Math.PI*0.145)
            .endAngle((d,i) => -Math.PI*0.8 + (i+1)*Math.PI*0.145)
    telegraphStateItems.append("path").attr("d", telgraphArc).attr("fill", "black").attr("stroke", "white").style("opacity", 0.5)
        .on("mouseover", function(e, d) {
            // d3.select(e.currentTarget).style("opacity", 1).attr("fill", "gray")
            // if (d.direction=="Ahead") {aheadGroup.select("path").style("opacity", 1).attr("fill", "gray")}
            // else if (d.direction=="Astern") {asternGroup.select("path").style("opacity", 1).attr("fill", "gray")}
            sidePropAngleIncrement = d.sidePropAngleIncrement
            centrePropAngleIncrement = d.centrePropAngleIncrement
            let index = telegraphStates.findIndex((element) => element.fullName==d.fullName)
            eotSelectorGroup.attr("transform", ()=>{ if (d.fullName=="Stop") return `rotate(0)`;
            return `rotate(${(-Math.PI*0.8 + (index+0.5)*Math.PI*0.145)*180/Math.PI})`})
            orderIndicator.text(d.fullName)
            knotsIndicator.text(d.knots + " knots")
            rpmIndicator.text(d.rpm)
            turbineIndicator.text(d.turbine)
            if (index<4||index>6) {
                boilersIconGroup.selectAll("rect").transition().duration(1000).attr("fill", "red")
                boilersIconGroup.selectAll("circle").transition().duration(1000).attr("fill", "red")
                boilersIconGroup.selectAll("path").transition().duration(1000).attr("fill", "red")
            }
            // camLine1.transition().duration(1000).attr("y2", 105)
            // camLine2.transition().duration(1000).attr("y2", 105)
        })
        .on("mouseout", function(e, d) {
            // d3.select(e.currentTarget).style("opacity", 1).attr("fill", "black")
            // aheadGroup.select("path").style("opacity", 1).attr("fill", "black")
            // asternGroup.select("path").style("opacity", 1).attr("fill", "black")
            sidePropAngleIncrement = 0
            centrePropAngleIncrement = 0
            eotSelectorGroup.attr("transform", `rotate(0)`)
            orderIndicator.text("Stop")
            knotsIndicator.text("0 knots")
            rpmIndicator.text("0")
            turbineIndicator.text("Disengaged")
            boilersIconGroup.selectAll("rect").transition().duration(1000).attr("fill", "black")
            boilersIconGroup.selectAll("circle").transition().duration(1000).attr("fill", "black")
            boilersIconGroup.selectAll("path").transition().duration(1000).attr("fill", "black")
            // camLine1.transition().duration(1000).attr("y2", 125)
            // camLine2.transition().duration(1000).attr("y2", 125)
        })
    const telegraphStateItemsTextGroups = telegraphStateItems.append("g").attr("id", (d,i) => `telegraphStateItemTextGroup${i}`)
        .attr("transform", (d,i) => {
            let xPos = 70*Math.cos(-Math.PI/2-Math.PI*0.8 + (i+0.5)*Math.PI*0.145)
            let yPos = 70*Math.sin(-Math.PI/2-Math.PI*0.8 + (i+0.5)*Math.PI*0.145)
            let rot = 0
            if (i<4) rot = (Math.PI/2-Math.PI*0.8 + (i+0.5)*Math.PI*0.145) * 180/Math.PI;
            else if (i>6) rot = (-Math.PI/2-Math.PI*0.8 + (i+0.5)*Math.PI*0.145) * 180/Math.PI;
            else if (i==4 || i==6) rot = (-Math.PI*0.8 + (i+0.5)*Math.PI*0.145) * 180/Math.PI;

            return `translate(${xPos},${yPos}) rotate(${rot})`
        })
    telegraphStateItemsTextGroups.append("text").attr("id", (d,i) => `telegraphStateItemText${i}`)
        .attr("x", 0)
        .attr("y", (d,i)=>{
                if (i==3||i==7) return -5;
                else if (i==4||i==6) return -5;
                else return 1;
            })
        .attr("text-anchor", "middle").attr("alignment-baseline", "middle")
        .text(d => d.name).style("font-size", "9px").attr("font-family", "Roboto").style("fill", "white").attr("pointer-events", "none")
        .attr("font-weight", "normal")

    d3.select("#telegraphStateItemTextGroup3").append("text").attr("id", "telegraphStateItemText3a")
        .attr("x", 0).attr("y", 5).attr("text-anchor", "middle").attr("alignment-baseline", "middle")
        .text("SLOW").style("font-size", "9px").attr("font-family", "Roboto").style("fill", "white").attr("pointer-events", "none")        
    d3.select("#telegraphStateItemTextGroup7").append("text").attr("id", "telegraphStateItemText7a")
        .attr("x", 0).attr("y", 5).attr("text-anchor", "middle").attr("alignment-baseline", "middle")
        .text("SLOW").style("font-size", "9px").attr("font-family", "Roboto").style("fill", "white").attr("pointer-events", "none")        

    d3.select("#telegraphStateItemTextGroup4").append("text").attr("id", "telegraphStateItemText4a")
        .attr("x", 0).attr("y", 5).attr("text-anchor", "middle").attr("alignment-baseline", "middle")
        .text("BY").style("font-size", "9px").attr("font-family", "Roboto").style("fill", "white").attr("pointer-events", "none")        

    d3.select("#telegraphStateItemTextGroup6").append("text").attr("id", "telegraphStateItemText6a")
        .attr("x", 0).attr("y", 5).attr("text-anchor", "middle").attr("alignment-baseline", "middle")
        .text("BY").style("font-size", "9px").attr("font-family", "Roboto").style("fill", "white").attr("pointer-events", "none")        

    
    const asternGroup = telegraphGroup.append("g").attr("id", "asternGroup").attr("transform", `translate(${0},${0})`)
    asternGroup.append("path").attr("d", d3.arc().innerRadius(30).outerRadius(50).startAngle(-Math.PI*0.8).endAngle(-Math.PI*0.8 + 4*Math.PI*0.145)).attr("fill", "black").attr("stroke", "white").style("opacity", 0.5)
    asternGroup.append("path").attr("d", d3.arc().innerRadius(40).outerRadius(40).startAngle(-Math.PI*0.8).endAngle(-Math.PI*0.8 + 4*Math.PI*0.145))
        .attr("fill", "none").attr("stroke", "none").style("opacity", 0.5)
        .attr("id", "telegraphAsternTextArc").attr("class", "telegraphAsternTextArc")
    asternGroup.append("text")
        .attr("transform", "translate(2, 0) scale(1,1)")
        .append("textPath")
        .attr("startOffset", "25%")
        .attr("xlink:href", "#telegraphAsternTextArc")
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("font-size", "12px")
        .attr("font-family", "Roboto")
        .attr("fill", "white")
        .text("ASTERN")
        .style("pointer-events", "none")    

    const aheadGroup = telegraphGroup.append("g").attr("id", "aheadGroup").attr("transform", `translate(${0},${0})`)
    aheadGroup.append("path").attr("d", d3.arc().innerRadius(30).outerRadius(50).startAngle(-Math.PI*0.8 + 7*Math.PI*0.145).endAngle(-Math.PI*0.8 + 11*Math.PI*0.145)).attr("fill", "black").attr("stroke", "white").style("opacity", 0.5)
    aheadGroup.append("path").attr("d", d3.arc().innerRadius(40).outerRadius(40).startAngle(-Math.PI*0.8 + 7*Math.PI*0.145).endAngle(-Math.PI*0.8 + 11*Math.PI*0.145))
        .attr("fill", "none").attr("stroke", "none").style("opacity", 0.5)
        .attr("id", "telegraphAheadTextArc").attr("class", "telegraphAheadTextArc")
    aheadGroup.append("text")
        .attr("transform", "translate(-2, 0) scale(1,1)")
        .append("textPath")
        .attr("startOffset", "25%")
        .attr("xlink:href", "#telegraphAheadTextArc")
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("font-size", "12px")
        .attr("font-family", "Roboto")
        .attr("fill", "white")
        .text("AHEAD")
        .style("pointer-events", "none")

    const eotSelectorGroup = telegraphGroup.append("g").attr("id", "eotSelectorGroup").attr("transform", `translate(${0},${0})`)
    eotSelectorGroup.append("path").attr("fill", "white").attr("stroke", "none").style("opacity", 0.2).attr("pointer-events", "none")
            .attr("d", "M 0 10 L 10 0 L 5 -43 L -5 -43 L -10 0 Z")
    eotSelectorGroup.append("path").attr("fill", "none").attr("stroke", "white").attr("stroke-width", 10).style("opacity", 0.4).attr("pointer-events", "none")
            .attr("d", d3.arc().innerRadius(48).outerRadius(95).startAngle(-Math.PI*0.8 + 5*Math.PI*0.145).endAngle(-Math.PI*0.8 + 6*Math.PI*0.145))
    eotSelectorGroup.append("rect").attr("fill", "gray").attr("stroke", "black").style("opacity", 0.7).attr("pointer-events", "none")
            .attr("x", -5).attr("y", -130).attr("width", 10).attr("height", 30)
    eotSelectorGroup.append("rect").attr("fill", "gray").attr("stroke", "black").style("opacity", 0.7).attr("pointer-events", "none")
            .attr("x", -10).attr("y", -140).attr("width", 20).attr("height", 10)

    ///////////////////////////////////
    // BOILERS, ENGINES and MEN
    ///////////////////////////////////

    const boilersX = 340
    const boilersY = 30
    const boilersScale = 1

    const smallArrowPath = "M 0 0 M -20 0 L -20 -5 L 10 -5 L 10 -10 L 20 0 L 10 10 L 10 5 L -20 5 Z"

    const boilersGroup = tertiaryContainer.append("g").attr("id", "boilersGroup").attr("transform", `translate(${boilersX},${boilersY}) scale(${boilersScale})`)
    boilersGroup.append("path").attr("d", smallArrowPath).attr("fill", "red").style("opacity", 0.5).attr("transform", "translate(0,85) scale(0.7,1)")

    // boilersGroup.append("rect").attr("width", 550).attr("height", 150).attr("fill", "red").style("opacity", 0.5)
    
    // Order received in Engine Room by Chief Engineer, Senior Engineers x2 and Junior Engineers x3
    const engineersGroup = boilersGroup.append("g").attr("id", "engineersGroup").attr("transform", `translate(${35},${0})`)
    engineersGroup.append("text").attr("x", 30).attr("y", 0).text("Engineers in").attr("font-size", "10pt").attr("text-anchor", "middle").style("font-weight", "normal").style("font-family", "Castoro, serif")
    engineersGroup.append("text").attr("x", 30).attr("y", 13).text("Engine Room").attr("font-size", "10pt").attr("text-anchor", "middle").style("font-weight", "normal").style("font-family", "Castoro, serif")
    engineersGroup.append("text").attr("x", 30).attr("y", 26).text("receive orders").attr("font-size", "10pt").attr("text-anchor", "middle").style("font-weight", "normal").style("font-family", "Castoro, serif")
    // engineersGroup.append("text").attr("x", 30).attr("y", 39).text("and give to men").attr("font-size", "10pt").attr("text-anchor", "middle").style("font-weight", "normal").style("font-family", "Castoro, serif")
    engineersGroup.append("path").attr("d", smallArrowPath).attr("fill", "red").style("opacity", 0.5).attr("transform", "translate(90,85) scale(0.7,1)")
    
    // engineersGroup.append("rect").attr("x", 0).attr("y", 55).attr("width", 60).attr("height", 60).attr("fill", "red").style("opacity", 0.5)
    const engineerSize = 8
    const engineerRadius = engineerSize / 3
    const startPicY = 60
    for (let i=0; i<3; i++) {
        for (let j=0; j<i+1; j++) {
            engineersGroup.append("rect").attr("x", 0 + j * (engineerSize+1)).attr("y", startPicY+3 + i * (engineerSize+14)).attr("width", engineerSize).attr("height", engineerSize).attr("rx", engineerRadius).attr("ry", engineerRadius).attr("fill", "#4b371c").style("opacity", 1)
        }
        engineersGroup.append("text").attr("x", 0).attr("y", startPicY + i * (engineerSize+14)).text(()=>i==0?"Chief Engineer":i==1?"Senior Eng.":"Junior Eng.").attr("font-size", "10px").attr("text-anchor", "start").style("font-weight", "normal").style("font-family", "Castoro, serif")
    }

    // Who in turn relay orders to the 48 firemen, 20 trimmers, and 5 leading fireman on duty each 4hr shift
    const firemenGroup = boilersGroup.append("g").attr("id", "firemenGroup").attr("transform", `translate(${155},${0})`)
    firemenGroup.append("text").attr("x", 30).attr("y", 0).text("73 men on duty").attr("font-size", "10pt").attr("text-anchor", "middle").style("font-weight", "normal").style("font-family", "Castoro, serif")
    firemenGroup.append("text").attr("x", 30).attr("y", 13).text("each 4hr watch").attr("font-size", "10pt").attr("text-anchor", "middle").style("font-weight", "normal").style("font-family", "Castoro, serif")
    firemenGroup.append("text").attr("x", 30).attr("y", 26).text("to work boilers").attr("font-size", "10pt").attr("text-anchor", "middle").style("font-weight", "normal").style("font-family", "Castoro, serif")
    // firemenGroup.append("text").attr("x", 30).attr("y", 39).text("firemen on duty").attr("font-size", "10pt").attr("text-anchor", "middle").style("font-weight", "normal").style("font-family", "Castoro, serif")
    firemenGroup.append("path").attr("d", smallArrowPath).attr("fill", "red").style("opacity", 0.5).attr("transform", "translate(90,85) scale(0.7,1)")
    
    // firemenGroup.append("rect").attr("x", 0).attr("y", 55).attr("width", 60).attr("height", 60).attr("fill", "red").style("opacity", 0.5)
    const firemanSize = (60 / 12) - 1
    const firemanRadius = firemanSize / 3
    const startPicYF = startPicY - 7
    
    // draw firemen
    firemenGroup.append("text").attr("x", 0).attr("y", startPicYF).text("Firemen").attr("font-size", "10px").attr("text-anchor", "start").style("font-weight", "normal").style("font-family", "Castoro, serif")
    for (let i=0; i<4; i++) {
        for (let j=0; j<12; j++) {
            firemenGroup.append("rect").attr("x", 0 + j * (firemanSize+1)).attr("y", startPicYF+3 + i * (firemanSize+1)).attr("width", firemanSize).attr("height", firemanSize).attr("rx", firemanRadius).attr("ry", firemanRadius).attr("fill", "#4b371c").style("opacity", 1)
        }
    }
    // draw trimmers
    const trimmerYOffset = startPicYF + 3 + 6.5*(firemanSize+1)
    firemenGroup.append("text").attr("x", 0).attr("y", trimmerYOffset).text("Trimmers").attr("font-size", "10px").attr("text-anchor", "start").style("font-weight", "normal").style("font-family", "Castoro, serif")
    for (let i=0; i<2; i++) {
        for (let j=0; j<12; j++) {
            firemenGroup.append("rect").attr("x", 0 + j * (firemanSize+1)).attr("y", trimmerYOffset + 3 + i * (firemanSize+1)).attr("width", firemanSize).attr("height", firemanSize).attr("rx", firemanRadius).attr("ry", firemanRadius).attr("fill", "#4b371c").style("opacity", 1)
            if (i==1&&j==7) break;
        }
    }
    // draw leading firemen
    const leadingFiremanYOffset = startPicYF + 3 + 12*(firemanSize+1)
    firemenGroup.append("text").attr("x", 0).attr("y", leadingFiremanYOffset).text("Lead Firemen").attr("font-size", "10px").attr("text-anchor", "start").style("font-weight", "normal").style("font-family", "Castoro, serif")
    for (let i=0; i<5; i++) {
        firemenGroup.append("rect").attr("x", 0 + i * (firemanSize+1)).attr("y", 3+ leadingFiremanYOffset).attr("width", firemanSize).attr("height", firemanSize).attr("rx", firemanRadius).attr("ry", firemanRadius).attr("fill", "#4b371c").style("opacity", 1)
    }
    
    
    // They do this by shovelling c.620 tonnes of coal per day, removing 100 tonnes of ash per day
    const coalIconGroup = boilersGroup.append("g").attr("id", "coalIconGroup").attr("transform", `translate(${275},${0})`)
    coalIconGroup.append("text").attr("x", 30).attr("y", 0).text("Shovelling over").attr("font-size", "10pt").attr("text-anchor", "middle").style("font-weight", "normal").style("font-family", "Castoro, serif")
    coalIconGroup.append("text").attr("x", 30).attr("y", 13).text("600 tonnes of").attr("font-size", "10pt").attr("text-anchor", "middle").style("font-weight", "normal").style("font-family", "Castoro, serif")
    coalIconGroup.append("text").attr("x", 30).attr("y", 26).text("coal per day").attr("font-size", "10pt").attr("text-anchor", "middle").style("font-weight", "normal").style("font-family", "Castoro, serif")
    // coalIconGroup.append("text").attr("x", 30).attr("y", 39).text("per day").attr("font-size", "10pt").attr("text-anchor", "middle").style("font-weight", "normal").style("font-family", "Castoro, serif")
    coalIconGroup.append("path").attr("d", smallArrowPath).attr("fill", "red").style("opacity", 0.5).attr("transform", "translate(90,85) scale(0.7,1)")
    const coalPath = "M 0 0 M -20 0 L -19 -1 L -17 -4 L -15 -9 L -5 -20 L 5 -19 L 10 0 L 15 10 L 10 15 L 0 18 L -5 15 L -10 15 L -15 12 Z"
    // coalIconGroup.append("rect").attr("x", 0).attr("y", 55).attr("width", 60).attr("height", 60).attr("fill", "red").style("opacity", 0.5)
    coalIconGroup.append("path").attr("d", coalPath).attr("fill", "black").attr("transform", "translate(35,85) scale(2.2)").style("opacity", 0.5)
    coalIconGroup.append("path").attr("d", coalPath).attr("fill", "black").attr("transform", "translate(35,85) scale(2.1)").style("opacity", 0.5)
    coalIconGroup.append("path").attr("d", coalPath).attr("fill", "black").attr("transform", "translate(35,85) scale(2.0)").style("opacity", 1)
    coalIconGroup.append("text").text("600").attr("fill", "darkgray").attr("font-size", "20px").attr("text-anchor", "middle").attr("font-weight", "bold").attr("font-style", "normal").style("font-family", "'Roboto', sans-serif").attr("transform", "translate(30,85) scale(1)").style("opacity", 0.9)
    coalIconGroup.append("text").text("tonnes / day").attr("fill", "DarkGrey").attr("font-size", "10px").attr("text-anchor", "middle").attr("font-weight", "bold").attr("font-style", "normal").style("font-family", "'Roboto', sans-serif").attr("transform", "translate(30,100) scale(1)").style("opacity", 0.9)
    coalIconGroup.append("path").attr("d", smallArrowPath).attr("fill", "red").style("opacity", 0.5).attr("transform", "translate(208,85) scale(0.7,1)")
    


    // These men power the 29 boilers (5 single-enders and 24 double-enders 5,5,5,5,4) just above the tank top

    
    
    const boilersIconGroup = boilersGroup.append("g").attr("id", "boilersIconGroup").attr("transform", `translate(${395},${0})`)
    boilersIconGroup.append("clipPath").attr("id", "boilerClip").append("rect").attr("x", -2).attr("y", 0).attr("width", 65).attr("height", 110)
    boilersIconGroup.append("text").attr("x", 30).attr("y", 0).text("29 boilers made").attr("font-size", "10pt").attr("text-anchor", "middle").style("font-weight", "normal").style("font-family", "Castoro, serif")
    boilersIconGroup.append("text").attr("x", 30).attr("y", 13).text("steam for engines").attr("font-size", "10pt").attr("text-anchor", "middle").style("font-weight", "normal").style("font-family", "Castoro, serif")
    boilersIconGroup.append("text").attr("x", 30).attr("y", 26).text("and electricity").attr("font-size", "10pt").attr("text-anchor", "middle").style("font-weight", "normal").style("font-family", "Castoro, serif")
    const boilerSize = 10
    for (let i=0; i<6; i++) {
        for (let j=0; j<5; j++) {
            let cxToUse = 0 + (i)*(boilerSize+1)
            let cyToUse = (i<5) ? 55 + (j+0.5)*(boilerSize+1) : 55 + (j+1)*(boilerSize+1)
            if (i==5&&j==4) break;
            boilersIconGroup.append("rect").attr("x", cxToUse-boilerSize/2).attr("y", cyToUse-boilerSize/2).attr("width", boilerSize).attr("height", boilerSize).attr("rx", boilerSize/2).attr("ry", boilerSize/5).attr("fill", "black").attr("clip-path", "url(#boilerClip)")
        }
    }

    // These 29 boilers power two reciprocating and one turbine engine, which drive the mighty propellors
    const enginesIconGroup = boilersGroup.append("g").attr("id", "enginesIconGroup").attr("transform", `translate(${515},${0})`)
    enginesIconGroup.append("text").attr("x", 30).attr("y", 0).text("Powering the").attr("font-size", "10pt").attr("text-anchor", "middle").style("font-weight", "normal").style("font-family", "Castoro, serif")
    enginesIconGroup.append("text").attr("x", 30).attr("y", 13).text("engines that moved").attr("font-size", "10pt").attr("text-anchor", "middle").style("font-weight", "normal").style("font-family", "Castoro, serif")
    enginesIconGroup.append("text").attr("x", 30).attr("y", 26).text("RMS Titanic").attr("font-size", "10pt").attr("text-anchor", "middle").style("font-weight", "normal").style("font-family", "Castoro, serif")
    // enginesIconGroup.append("text").attr("x", 30).attr("y", 39).text("engines that move").attr("font-size", "10pt").attr("text-anchor", "middle").style("font-weight", "normal").style("font-family", "Castoro, serif")
    // enginesIconGroup.append("text").attr("x", 30).attr("y", 52).text("RMS Titanic").attr("font-size", "10pt").attr("text-anchor", "middle").style("font-weight", "normal").style("font-family", "Castoro, serif")
    // enginesIconGroup.append("rect").attr("x", 0).attr("y", 55).attr("width", 60).attr("height", 60).attr("fill", "red").style("opacity", 0.1)
    const enginePath = "M -10 20 L -5 20 L -3 0 L -1 0 L -1 18 L 1 18 L 1 0 L 3 0 L 5 20 L 10 20 L 8 -6 L 6 -6 L 6 -20 L -6 -20 L -6 -6 L -8 -6 Z"
    const enginePath2 = "M -10 20 L -5 20 L -3 0 L 3 0 L 5 20 L 10 20 L 8 -6 L 6 -6 L 6 -20 L -6 -20 L -6 -6 L -8 -6 Z"
    enginesIconGroup.append("path").attr("d", enginePath2).attr("fill", "black").attr("transform", "translate(5,85) scale(1,1.5)")
    const camLine1 = enginesIconGroup.append("line").attr("x1", 5).attr("y1", 85).attr("x2", 5).attr("y2", 120).attr("stroke", "black").attr("stroke-width", 2)
    enginesIconGroup.append("path").attr("d", enginePath2).attr("fill", "black").attr("transform", "translate(50,85) scale(1,1.5)")
    const camLine2 = enginesIconGroup.append("line").attr("x1", 50).attr("y1", 85).attr("x2", 50).attr("y2", 120).attr("stroke", "black").attr("stroke-width", 2)
    const turbineStartY = 95
    for (let i=0; i<10;i++){
        enginesIconGroup.append("circle").attr("cx", 27.5).attr("cy", turbineStartY+i*2).attr("r", 10).attr("fill", "gray").attr("stroke", "black").style("opacity",0.3)
        enginesIconGroup.append("circle").attr("cx", 27.5).attr("cy", turbineStartY+i*2).attr("r", 10).attr("fill", "none").attr("stroke", "black").style("opacity", 1)
    }
    const camLine3 = enginesIconGroup.append("line").attr("x1", 27.5).attr("y1", turbineStartY+15).attr("x2", 27.5).attr("y2", turbineStartY+35).attr("stroke", "black").attr("stroke-width", 2)

    enginesIconGroup.append("rect").attr("x", 70).attr("y", 80).attr("width", 25).attr("height", 10).attr("fill", "red").style("opacity", 0.5)
    enginesIconGroup.append("path").attr("d", smallArrowPath).attr("fill", "red").style("opacity", 0.5).attr("transform", "translate(90,110) rotate(90)")

}


setDefaultSC()

function setDefaultSC() {
    
    
    // CLOCK INFOGRAPHIC
    
    let clockTimeLine = defaultSC.append("g").attr("id", "clockTimeLine").attr("transform", "translate(90,295) scale(2)")
    let clockScale = d3.scaleLinear().domain([0,1]).range([-180,540])

    let clockArcGenerator = d3.arc()

    let arcData = []
    for (let i=-6;i<15;i++) {
        arcData.push({startAngle: i*Math.PI/24, endAngle: (i+1)*Math.PI/24, fill: i%2 ? 'none' : 'none', innerRadius: 67, outerRadius: 72})
    }
    arcData.push({startAngle: 0, endAngle: Math.PI*2, fill: 'none', innerRadius: 42, outerRadius: 45})
    arcData.push({startAngle: 0, endAngle: Math.PI*2, fill: 'none', innerRadius: 3, outerRadius: 5})

    clockTimeLine.append("clipPath").attr("id", "clockClip").append("rect").attr("x", -40).attr("y", -150).attr("width", 180).attr("height", 178)
    let clockTimeLineHeader = clockTimeLine.append("g").attr("id", "clockTimeLineHeader")
    clockTimeLineHeader.append("text").text("KEY").attr("x", 110).attr("y", -130).attr("text-anchor", "middle").attr("font-size", "10pt").attr("font-weight", "bold").attr("font-style", "normal")
    clockTimeLineHeader.append("text").text("EVENTS").attr("x", 110).attr("y", -115).attr("text-anchor", "middle").attr("font-size", "10pt").attr("font-weight", "bold").attr("font-style", "normal")

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
    
    const clockArrow = clockFace.append("g").attr("id", "clockArrow").attr("clip-path", "url(#clockClip)")
    clockArrow.selectAll("path").data([{startAngle: -0.7, endAngle: 4.2, innerRadius: 15, outerRadius: 20}]).enter().append("path").attr("d", clockArcGenerator).attr("fill", "red")
    clockArrow.append("path").attr("d", "M -15 9 L -9 5 L -17 6 L -20 12 Z").attr("fill", "red")


    let numeralFontSize = "12pt"
    let numeralStartY = -50
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
            clockEvents.selectAll("path").style("opacity", (d)=>(d.key=="key"?0.3:0.1))
            clockEventsKeyLabels.selectAll("text").style("opacity", 0)

            // raise opacity of hovered event rod
            d3.select("#"+d.name).selectAll("path").attr("fill", "red").style("opacity", 1)
            d3.select("#nonKeyEventTime").text(d.realtime).style("opacity", 1)
            d3.select("#nonKeyEventlabel").text(d.narrative).style("opacity", 1)
            d3.select("#nonKeyEventline").style("opacity", 1)

            clockTimeLineHeader.style("opacity", 0)
            
        })
        .on("mouseleave", (e,d)=>{

            // reset opacity of alll event rods
            clockEvents.selectAll("path").attr("fill", "black").style("opacity", (d)=>(d.key=="key"?0.8:0.3))
            clockEventsKeyLabels.selectAll("text").style("opacity", 1)
            d3.select("#nonKeyEventTime").style("opacity", 0)
            d3.select("#nonKeyEventlabel").style("opacity", 0)
            d3.select("#nonKeyEventline").style("opacity", 0)
            clockTimeLineHeader.style("opacity", 1)
        })

    clockEvents.selectAll("g").append("path")
                    .attr("d", d=>{
                        return d.key=="key" ?
                             "M 0 0 L -2 0 L -2 100 C -5 102.5 -5 102.5 0 105 C 5 102.5 5 102.5 2 100 L 2 0 L 0 0 Z" : 
                             "M 0 0 L -2 0 L -2 90 C -5 92.5 -5 92.5 0 95 C 5 92.5 5 92.5 2 90 L 2 0 L 0 0 Z"
                        })
                    .style("opacity", (d)=>(d.key=="key"?0.8:0.3)).attr("fill", "black").attr("stroke", "none")

    let clockEventsKeyLabels = clockTimeLine.append("g").attr("id", "clockEventsKeyLabels")
    let clockEventsKeyLabelsFontSize = "5pt"

    clockEventsKeyLabels.append("text").attr("id", "event2label").text("11:40pm").attr("x", -42).attr("y", -122).attr("font-size", clockEventsKeyLabelsFontSize).style("font-family", "'Roboto Mono', monospace").attr("font-weight", "bold")
    clockEventsKeyLabels.append("text").attr("id", "event2label").text("Hits").attr("x", -42).attr("y", -114).attr("font-size", clockEventsKeyLabelsFontSize).style("font-family", "'Roboto Mono', monospace")
    clockEventsKeyLabels.append("text").attr("id", "event2label").text("iceberg").attr("x", -42).attr("y", -106).attr("font-size", clockEventsKeyLabelsFontSize).style("font-family", "'Roboto Mono', monospace")

    clockEventsKeyLabels.append("text").attr("id", "event3label").text("12:05am").attr("x", 0).attr("y", -122).attr("font-size", clockEventsKeyLabelsFontSize).style("font-family", "'Roboto Mono', monospace").attr("font-weight", "bold")
    clockEventsKeyLabels.append("text").attr("id", "event3label").text("1st distress").attr("x", 0).attr("y", -114).attr("font-size", clockEventsKeyLabelsFontSize).style("font-family", "'Roboto Mono', monospace")
    clockEventsKeyLabels.append("text").attr("id", "event3label").text("call sent").attr("x", 0).attr("y", -106).attr("font-size", clockEventsKeyLabelsFontSize).style("font-family", "'Roboto Mono', monospace")

    clockEventsKeyLabels.append("text").attr("id", "event7label").text("12:40am").attr("x", 41).attr("y", -98).attr("font-size", clockEventsKeyLabelsFontSize).style("font-family", "'Roboto Mono', monospace").attr("font-weight", "bold")
    clockEventsKeyLabels.append("text").attr("id", "event7label").text("1st lifeboat rowed away").attr("x", 41).attr("y", -91).attr("font-size", clockEventsKeyLabelsFontSize).style("font-family", "'Roboto Mono', monospace")
    
    clockEventsKeyLabels.append("text").attr("id", "event14label").text("1:45am").attr("x", 88).attr("y", -65).attr("font-size", clockEventsKeyLabelsFontSize).style("font-family", "'Roboto Mono', monospace").attr("font-weight", "bold")
    clockEventsKeyLabels.append("text").attr("id", "event14label").text("Last radio signal").attr("x", 88).attr("y", -58).attr("font-size", clockEventsKeyLabelsFontSize).style("font-family", "'Roboto Mono', monospace")
    
    clockEventsKeyLabels.append("text").attr("id", "event20label").text("2:20am").attr("x", 103).attr("y", -35).attr("font-size", clockEventsKeyLabelsFontSize).style("font-family", "'Roboto Mono', monospace").attr("font-weight", "bold")
    clockEventsKeyLabels.append("text").attr("id", "event20label").text("Fully submerged").attr("x", 103).attr("y", -27).attr("font-size", clockEventsKeyLabelsFontSize).style("font-family", "'Roboto Mono', monospace")

    clockEventsKeyLabels.append("text").attr("id", "event22label").text("3:30am").attr("x", 83).attr("y", 10).attr("font-size", clockEventsKeyLabelsFontSize).style("font-family", "'Roboto Mono', monospace").attr("font-weight", "bold")
    clockEventsKeyLabels.append("text").attr("id", "event22label").text("Survivors see Carpathia").attr("x", 83).attr("y", 18).attr("font-size", clockEventsKeyLabelsFontSize).style("font-family", "'Roboto Mono', monospace")

    clockEventsKeyLabels.append("text").attr("id", "nonKeyEventTime").text("1:23am").attr("x", -40).attr("y", -130).attr("font-size", "8pt").attr("font-weight", "bold").style("opacity", 0).style("font-family", "'Roboto Mono', monospace")
    clockEventsKeyLabels.append("text").attr("id", "nonKeyEventlabel").text("1:23am, TEST").attr("x", -40).attr("y", -120).attr("font-size", "8pt").style("opacity", 0).style("font-family", "'Roboto Mono', monospace")
    clockEventsKeyLabels.append("line").attr("id", "nonKeyEventline").attr("x1", -40).attr("y1", -115).attr("x2", 120).attr("y2", -115).attr("stroke", "red").style("stroke-width", 3).style("opacity", 0).style("font-family", "'Roboto Mono', monospace")
    // clockEventsKeyLabels.append("line").attr("id", "nonKeyEventline2").attr("x1", -40).attr("y1", -115).attr("x2", 40).attr("y2", -115).attr("stroke", "red").style("stroke-width", 1).style("opacity", 0).style("font-family", "'Roboto Mono', monospace")


    // MAP INFOGRAPHIC


    let mapInfographicHeadline = defaultSC
        .append("text").text("TITANIC'S FATEFUL PATH").attr("x", 685).attr("y", 340).attr("text-anchor", "middle").attr("font-size", "20pt").attr("font-weight", "bold").attr("font-style", "normal")
    
    let outerTitanicChart = defaultSC.append("g").attr("id", "outerTitanicChart").attr("transform", "translate(480,10) scale(1.8,2)").attr("clip-path", "url(#chartClipInner)")
    outerTitanicChart.append("clipPath").attr("id", "chartClipInner").append("path").attr("d", "M -50 0 L 280 0 L 230 150 L 0 150 Z")
    outerTitanicChart.append("clipPath").attr("id", "chartClip").append("path").attr("d", "M -100 -100 L 330 -100 L 280 150 L -50 150 Z")

    let titanicChart = outerTitanicChart.append("g").attr("id", "titanicChart").attr("transform", "translate(0,0) scale(1,1)").attr("clip-path", "url(#chartClip)")
    
    let zoom = d3.zoom().interpolate(d3.interpolate).on("zoom", handleZoom)
    const transformIn = d3.zoomIdentity.scale(2.7).translate(-10, -75) 
    const transformOut = d3.zoomIdentity.translate(0, 0).scale(1)

    function handleZoom(e) {titanicChart.attr('transform', e.transform)}

    function zoomIn() {
        titanicChart.transition().duration(1000).call(zoom.transform, transformIn)
        d3.select("#otherVessels").transition().duration(1000).style("opacity", 1)
        mapInfographicHeadline.transition().duration(500).style("opacity", 0).transition().duration(500).style("opacity", 1).text("NEARBY VESSELS")
        }

    function zoomOut() {
        titanicChart.transition().duration(1000).call(zoom.transform, transformOut)
        d3.select("#otherVessels").transition().duration(1000).style("opacity", 0.5)
        mapInfographicHeadline.transition().duration(500).style("opacity", 0).transition().duration(500).style("opacity", 1).text("TITANIC'S FATEFUL PATH")
    }

    let topojsonData = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json"
    let topojsonDataResult

    d3.json(topojsonData).then(
        res => {
            topojsonDataResult = res
            renderWorld(topojsonDataResult)
        })
    
    function renderWorld(topojsonInput) {
            titanicChart.selectAll("g").remove()

            const countriesToInclude = ["Sweden", "France", "Germany", "United States of America", "Greenland", "Canada", "Ireland", "Spain", "United Kingdom",
                                        "Belgium", "Netherlands", "Luxembourg", "Austria", "Czechia", "Denmark", "Norway"]
            const { countries } = topojsonInput.objects
            const geojsonData = topojson.feature(topojsonInput, countries).features.filter(item=>countriesToInclude.includes(item.properties.name))

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
                .attr("d", path(d3.geoGraticule().step([10,10])()))
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

            const alternativeGeoPathsData = [
                        {source: {"lat": 54.5973, "lon": -5.9301}, destination: {"lat": 50.0000, "lon": -6.5000}, rx: 5, ry: 5},  // Belfast to control point (to Soton)
                        {source: {"lat": 50.0000, "lon": -6.5000}, destination: {"lat": 50.9105, "lon": -1.4049}, rx: 5, ry: 5},  // control point (to Soton) to Soton
                        {source: {"lat": 50.9105, "lon": -1.4049}, destination: {"lat": 49.6339, "lon": -1.6222}, rx: 0, ry: 0},  // Soton to Cherbourg  
                        {source: {"lat": 49.6339, "lon": -1.6222}, destination: {"lat": 49.5000, "lon": -6.9000}, rx: -5, ry: 8},  // Cherbourg to control point (to Queenstown)
                        {source: {"lat": 49.5000, "lon": -6.9000}, destination: {"lat": 51.8503, "lon": -8.2943}, rx: -8, ry: -6},  // control point (to Queenstown) to Queenstown
                        {source: {"lat": 51.8503, "lon": -8.2943}, destination: {"lat": 41.7250, "lon": -49.9467}, rx: -50, ry: 30}] // Queenstown to Titanic wreck

            const alternativeGeoPaths = titanicChart.append("g").attr("id", "alternativeGeoPaths")
                alternativeGeoPaths.selectAll("path").data(alternativeGeoPathsData).enter()
                    .append("path")
                    .attr("d", d=>{
                        let pathToReturn = "M "
                        pathToReturn += projection([d.source.lon,d.source.lat])[0] + " " + projection([d.source.lon,d.source.lat])[1] + " "
                        pathToReturn += "Q "
                        pathToReturn += (+projection([d.source.lon,d.source.lat])[0]+d.rx) + " " + (+projection([d.source.lon,d.source.lat])[1]+d.ry) + " "
                        pathToReturn += projection([d.destination.lon,d.destination.lat])[0] + " " + projection([d.destination.lon,d.destination.lat])[1] + " "
                        return pathToReturn
                    })
                    .attr("fill", "none")
                    .style("stroke", "red")
                    .style("stroke-width", 1)
                    .style("line-cap", "round")


            // Paths for sea ice extent - one for "April maximum ice limit" and one for "April extreme ice limit"

            // April maximum ice limit
            const seaIceExtentAprilMaxData = [
                                                {source: {"lat": 46.5, "lon": -53}, destination: {"lat": 45.5, "lon": -49}, rx: -3, ry: 5},
                                                {source: {"lat": 45.5, "lon": -49}, destination: {"lat": 48.5, "lon": -44}, rx: 15, ry: 5},
                                                {source: {"lat": 48.5, "lon": -44}, destination: {"lat": 54.5, "lon": -48}, rx: 5, ry: -15},
                                                {source: {"lat": 54.5, "lon": -48}, destination: {"lat": 59.5, "lon": -56}, rx: -15, ry: -15},
                                             ]

            const seaIceExtentAprilMax = titanicChart.append("g").attr("id", "seaIceExtentAprilMax")
            seaIceExtentAprilMax.selectAll("path").data(seaIceExtentAprilMaxData).enter()
                .append("path")
                .attr("d", d=>{
                    let pathToReturn = "M "
                    pathToReturn += projection([d.source.lon,d.source.lat])[0] + " " + projection([d.source.lon,d.source.lat])[1] + " "
                    pathToReturn += "Q "
                    pathToReturn += (+projection([d.source.lon,d.source.lat])[0]+d.rx) + " " + (+projection([d.source.lon,d.source.lat])[1]+d.ry) + " "
                    pathToReturn += projection([d.destination.lon,d.destination.lat])[0] + " " + projection([d.destination.lon,d.destination.lat])[1] + " "
                    return pathToReturn
                })
                .attr("fill", "none")
                .style("stroke", "gray")
                .style("stroke-width", 1)
                .style("stroke-dasharray", "1,2")
                .style("line-cap", "round")
            
            seaIceExtentAprilMax.append("text")
                    .attr("x", projection([-41,56])[0])
                    .attr("y", projection([-41,56])[1])
                    .attr("dy", -5)
                    .attr("text-anchor", "middle")
                    .attr("font-size", "5px")
                    .attr("fill", "black")
                    .text("April maximum ice limit")
                    .style("font-weight", "bold")
                    .style("font-family", "'Roboto', sans-serif")

            // April extreme ice limit
            const seaIceExtentAprilExtremeData = [
                {source: {"lat": 40.5, "lon": -50.2}, destination: {"lat": 41.5, "lon": -43}, rx: 15, ry: 10},
                {source: {"lat": 41.5, "lon": -43}, destination: {"lat": 48, "lon": -41}, rx: 15, ry: -10},
                {source: {"lat": 48, "lon": -41}, destination: {"lat": 52, "lon": -41}, rx: 0, ry: 0},
             ]

            const seaIceExtentAprilExtreme = titanicChart.append("g").attr("id", "seaIceExtentAprilMax")
            seaIceExtentAprilExtreme.selectAll("path").data(seaIceExtentAprilExtremeData).enter()
                .append("path")
                .attr("d", d=>{
                    let pathToReturn = "M "
                    pathToReturn += projection([d.source.lon,d.source.lat])[0] + " " + projection([d.source.lon,d.source.lat])[1] + " "
                    pathToReturn += "Q "
                    pathToReturn += (+projection([d.source.lon,d.source.lat])[0]+d.rx) + " " + (+projection([d.source.lon,d.source.lat])[1]+d.ry) + " "
                    pathToReturn += projection([d.destination.lon,d.destination.lat])[0] + " " + projection([d.destination.lon,d.destination.lat])[1] + " "
                    return pathToReturn
                })
                .attr("fill", "none")
                .style("stroke", "gray")
                .style("stroke-width", 1)
                .style("stroke-dasharray", "1,2")
                .style("line-cap", "round")


            seaIceExtentAprilExtreme.append("text")
                .attr("x", projection([-35,50.5])[0])
                .attr("y", projection([-35,50.5])[1])
                .attr("dy", -5)
                .attr("text-anchor", "middle")
                .attr("font-size", "5px")
                .attr("fill", "black")
                .text("April extreme")
                .style("font-weight", "bold")
                .style("font-family", "'Roboto', sans-serif")

            seaIceExtentAprilExtreme.append("text")
                .attr("x", projection([-35,49.5])[0])
                .attr("y", projection([-35,49.5])[1])
                .attr("dy", -5)
                .attr("text-anchor", "middle")
                .attr("font-size", "5px")
                .attr("fill", "black")
                .text("iceberg limit")
                .style("font-weight", "bold")
                .style("font-family", "'Roboto', sans-serif")
                
            const keyLocations = titanicChart.append("g").attr("id", "keyLocations")

            const keyLocationsData = [{name: "Belfast", lat: 54.5973, long: -5.9301},
                                      {name: "Southampton", lat: 50.9105, long: -1.4049},
                                      {name: "Cherbourg", lat: 49.6339, long: -1.6222},
                                      {name: "Queenstown", lat: 51.8503, long: -8.2943},
                                      {name: "New York", lat: 40.7128, long: -74.0060} ]

            keyLocationsGroups = keyLocations.selectAll("g").data(keyLocationsData).enter()
                .append("g")
                .attr("transform", d=>`translate(${projection([d.long,d.lat])[0]},${projection([d.long,d.lat])[1]})`)

            keyLocationsGroups
                .append("rect")
                .attr("clip-path", "url(#chartClip)")
                .attr("x", -2)
                .attr("y", -2)
                .attr("width", 3)
                .attr("height", 3)
                .attr("fill", "black")
                .style("opacity", 1)

            keyLocationsGroups
                .append("text")
                .attr("x", 0)
                .attr("y", 0)
                .attr("dx", d=>d.name=="Cherbourg"?6:d.name=="Southampton"?-11:0)
                .attr("dy", d=>d.name=="Cherbourg"?9:-3)
                .attr("font-size", d=>d.name=="Cherbourg"?5:6)
                .attr("fill", "black")
                .attr("font-weight", "bold")
                .attr("font-family", "'Roboto', sans-serif")
                .text(d=>d.name)
                .attr("text-anchor", d=>((d.name=="Queenstown"||d.name=="Belfast")?"end":(d.name=="New York"||d.name=="Southampton")?"start":"middle"))

            const otherVessels = titanicChart.append("g").attr("id", "otherVessels").style("opacity", 0.5)

            const otherVesselsData = [  {vessel: "Titanic", lat: 41.7250, long: -49.9467},
                                        {vessel: 'Virginian', lat: 42.5, long: -53.75},
                                        // {vessel: 'Baltic', lat: 42, long: -45},
                                        {vessel: 'Carpathia', lat: 41.2, long: -49.1},
                                        // {vessel: 'Antilian', lat: 40.9, long: -49.5},
                                        // {vessel: 'Parisian', lat: 41.4, long: -51.1},
                                        {vessel: 'Mt Temple', lat: 41.4, long: -51.3},
                                        {vessel: 'Birma', lat: 40.8, long: -52.2},
                                        {vessel: 'Frankfurt', lat: 39.8, long: -52.2},
                                        {vessel: 'Ypiranga', lat: 38.2, long: -49.5},
                                        {vessel: 'Cincinnati', lat: 37.6, long: -54.8},
                                        {vessel: 'Asian', lat: 41.2, long: -56.2},
                                        {vessel: 'Olympic', lat: 40.5, long: -61.2},
                                        {vessel: 'Californian', lat: 42.0833, long: -50.1167} ]

            const otherVesselsGroups = otherVessels
                .selectAll("g").data(otherVesselsData).enter()
                .append("g")
                .attr("transform", (d)=>(`translate(${projection([d.long,d.lat])[0]},${projection([d.long,d.lat])[1]})`))
            
            otherVesselsGroups
                .append("circle")
                .attr("cx", 0)
                .attr("cy", 0)
                .attr("r", (d)=>((d.vessel=="Titanic")?1:0.5))
                .attr("fill", "black")

            otherVesselsGroups.append("text")
                .attr("x", (d)=>(d.long>-49.95?1:-1))
                .attr("y", 0.5)
                .text(d=>d.vessel)
                .attr("dx", d=>d.vessel=="Titanic"?2:0)
                .attr("dy", d=>d.vessel=="Titanic"?0:1)
                .attr("text-anchor", (d)=>(d.long>-49.95?"start":"end"))
                .attr("font-size", d=>d.vessel=="Titanic"?"3px":"2.5px")
                .style("font-weight", d=>d.vessel=="Titanic"?"bold":"normal")
                .attr("transform", "rotate(15)")

        }

    zoomRect = outerTitanicChart.append("path").attr("d", "M -50 0 L 280 0 L 230 150 L 0 150 Z").attr("fill", "red").style("opacity", 0.2).attr("clip-path", "url(#chartClip)").style("z-index", 10000)
        .on("mouseover", ()=>{zoomIn()})
        .on("mouseleave", ()=>{zoomOut()})

    // LINER INFOGRAPHIC

    let liners = defaultSC.append("g").attr("id", "linersInfographic").attr("transform", "translate(1100,300) scale(1.8)")
    liners.append("text").text("GREATEST LINERS").attr("x", 30).attr("y", -145).attr("text-anchor", "middle").attr("font-size", "10pt").attr("font-weight", "bold").attr("font-style", "normal")
    liners.append("text").text("IN THE WORLD").attr("x", 30).attr("y", -130).attr("text-anchor", "middle").attr("font-size", "8pt").attr("font-weight", "bold").attr("font-style", "normal")

    let linerPaths = liners.selectAll("path").data(linersList).enter()
        .append("path")
        .attr("id", "linerPath")
        .attr("class", d=>d.className)
        .attr("d", linerPath)
        .attr("transform", (d,i) => `translate (${25*i},5) scale(${linerScale(d.length)})`)
        .style("opacity", 0.5)
        .attr("fill", (d,i)=>(i==4?"red":"black"))
    let linerText1Default = "TITANIC / OLYMPIC"
    linerText1 = liners.append("text").attr("id", "linerText1").text(linerText1Default).attr("x", 45).attr("y", 22).attr("text-anchor", "middle").attr("font-size", "8pt").attr("font-style", "normal")
    
    let linerDeetsStartY = -80
    let linerDeetsSpacingY = 11
    let linerDeetsStartX = -15
    let linerDeetsFontSize = "5pt"

    linerDeets0 = liners.append("path").attr("id", "linerDeets0").attr("d", whiteStarFlagPath).attr("fill", "red").style("opacity", 0.8).attr("transform", `translate(${linerDeetsStartX-41},${linerDeetsStartY-26}) scale(3,3)`)
    linerDeets00 = liners.append("path").attr("id", "linerDeets00").attr("d", starPath).attr("fill", "white").style("opacity", 0.8).attr("transform", `translate(${linerDeetsStartX-37},${linerDeetsStartY-45}) scale(.25,.25) rotate(-5)`)
    linerDeets000 = liners.append("text").attr("id", "linerDeets000").text("White Star").attr("x", linerDeetsStartX).attr("y", linerDeetsStartY-linerDeetsSpacingY).attr("font-size", linerDeetsFontSize).style("font-family", "'Roboto Mono', monospace").attr("text-anchor", "end").style("font-weight", "bold")
    linerDeets1 = liners.append("text").attr("id", "linerDeets1").text("Length: "+linersList[4].length+" ft").attr("x", linerDeetsStartX).attr("y", linerDeetsStartY).attr("font-size", linerDeetsFontSize).style("font-family", "'Roboto Mono', monospace").attr("text-anchor", "end")
    linerDeets2 = liners.append("text").attr("id", "linerDeets2").text("Beam: "+linersList[4].beam+" ft").attr("x", linerDeetsStartX).attr("y", linerDeetsStartY+linerDeetsSpacingY).attr("font-size", linerDeetsFontSize).style("font-family", "'Roboto Mono', monospace").attr("text-anchor", "end")
    linerDeets3 = liners.append("text").attr("id", "linerDeets3").text("Depth: "+linersList[4].depth+" ft").attr("x", linerDeetsStartX).attr("y", linerDeetsStartY+linerDeetsSpacingY*2).attr("font-size", linerDeetsFontSize).style("font-family", "'Roboto Mono', monospace").attr("text-anchor", "end")
    linerDeets4 = liners.append("text").attr("id", "linerDeets4").text("Tonnage: "+d3.format(",")(linersList[4].tonnage)).attr("x", linerDeetsStartX).attr("y", linerDeetsStartY+linerDeetsSpacingY*3).attr("font-size", linerDeetsFontSize).style("font-family", "'Roboto Mono', monospace").attr("text-anchor", "end")
    linerDeets5 = liners.append("text").attr("id", "linerDeets5").text("Hp: "+d3.format(",")(linersList[4].horsePower)).attr("x", linerDeetsStartX).attr("y", linerDeetsStartY+linerDeetsSpacingY*4).attr("font-size", linerDeetsFontSize).style("font-family", "'Roboto Mono', monospace").attr("text-anchor", "end")
    linerDeets6 = liners.append("text").attr("id", "linerDeets6").text("Av speed: "+linersList[4].avSpeed+" Kn.").attr("x", linerDeetsStartX).attr("y", linerDeetsStartY+linerDeetsSpacingY*5).attr("font-size", linerDeetsFontSize).style("font-family", "'Roboto Mono', monospace").attr("text-anchor", "end")
    linerDeets7 = liners.append("text").attr("id", "linerDeets7").text("Built: "+linersList[4].yearBuilt).attr("x", linerDeetsStartX).attr("y", linerDeetsStartY+linerDeetsSpacingY*6).attr("font-size", linerDeetsFontSize).style("font-family", "'Roboto Mono', monospace").attr("text-anchor", "end")
    linerDeets8 = liners.append("text").attr("id", "linerDeets7").text(linersList[4].screw).attr("x", linerDeetsStartX).attr("y", linerDeetsStartY+linerDeetsSpacingY*7).attr("font-size", linerDeetsFontSize).style("font-family", "'Roboto Mono', monospace").attr("text-anchor", "end")


    d3.selectAll("#linerPath")
        .on("mouseover", (e, d) => {
            linerText1.text(d.name)
            linerPaths.attr("fill", "black")
            d3.select("."+d.className).attr("fill", "red")
            linerDeets0.style("opacity", 0.8).attr("d", (d.line=="cunard"?cunardFlagPath:whiteStarFlagPath))
                .attr("transform", (d.line=="cunard"?`translate(${linerDeetsStartX-25},${linerDeetsStartY-35}) scale(0.5,0.5)`:`translate(${linerDeetsStartX-41},${linerDeetsStartY-26}) scale(3,3)`))
            linerDeets00.style("opacity", 0.8).attr("d", (d.line=="cunard"?cunardLionPath:starPath)).attr("fill", (d.line=="cunard"?"white":"white"))
                .attr("transform", (d.line=="cunard"?`translate(${linerDeetsStartX-26},${linerDeetsStartY-40}) scale(.25,.25) rotate(-5)`:`translate(${linerDeetsStartX-37},${linerDeetsStartY-45}) scale(.25,.25) rotate(-5)`))
            linerDeets000.text((d.line=="cunard"?"Cunard":"White Star"))
            linerDeets1.text("Length: "+d.length+" ft")
            linerDeets2.text("Beam: "+d.beam+" ft")
            linerDeets3.text("Depth: "+d.depth+" ft")
            linerDeets4.text("Tonnage: "+d3.format(",")(d.tonnage))
            linerDeets5.text("Hp: "+d3.format(",")(d.horsePower))
            linerDeets6.text("Av speed: "+d.avSpeed+" Kn.")
            linerDeets7.text("Built: "+d.yearBuilt)
            linerDeets8.text(d.screw)
        })
        // .on("mouseout", (e, d)=> {
        //     linerText1.text(linerText1Default).attr("font-size", "6pt").attr("y", 10).style("font-weight", "normal")
        //     d3.select("."+d.className).attr("fill", "black")
        //     d3.select("."+linersList[4].className).attr("fill", "red")
        //     linerDeets0.attr("d", whiteStarFlagPath).attr("fill", "red").attr("transform", `translate(${linerDeetsStartX-41},${linerDeetsStartY-26}) scale(3,3)`)
        //     linerDeets00.attr("d", starPath).attr("fill", "white").attr("transform", `translate(${linerDeetsStartX-37},${linerDeetsStartY-45}) scale(.25,.25) rotate(-5)`)
        //     linerDeets000.text("")
        //     linerDeets1.text("")
        //     linerDeets2.text("")
        //     linerDeets3.text("")
        //     linerDeets4.text("")
        //     linerDeets5.text("")
        //     linerDeets6.text("")
        //     linerDeets7.text("")
        //     linerDeets8.text("")
        // })

}

setDefaultDepthContainer()

function setDefaultDepthContainer() {
    const depthContainerTitleGroup = depthContainer.append("g").attr("id", "depthContainerTitleGroup")
    const depthContainerTitle = depthContainerTitleGroup.append("text").attr("id", "depthContainerTitle").text("COUP DE GRACE").attr("x", passengerDetailContainerWidth/2).attr("y", 40).attr("font-size", "18pt").attr("text-anchor", "middle").attr("font-weight", "bold").attr("font-style", "normal")
    const depthContainerSubTitle = depthContainerTitleGroup.append("text").attr("id", "depthContainerTitle").text("Her fall to the ocean floor").attr("x", passengerDetailContainerWidth/2).attr("y", 60).attr("font-size", "10pt").attr("text-anchor", "middle").attr("font-weight", "bold").attr("font-style", "normal")

    const depthScale = d3.scaleLinear().domain([0, 13000]).range([0, 500])

    const waterwidth = passengerDetailContainerWidth/3
    const depthContainerWaterGroup = depthContainer.append("g").attr("id", "depthContainerWaterGroup").attr("transform", `translate(${passengerDetailContainerWidth/5}, 100)`)
    const depthContainerWater = depthContainerWaterGroup.append("rect").attr("id", "depthContainerWater").attr("x", 0).attr("y", 0).attr("width", waterwidth).attr("height", depthScale(12600)+2).attr("fill", "red").attr("opacity", 0.5)
    const depthContainerOceanBed = depthContainerWaterGroup.append("rect").attr("id", "depthContainerOceanBed").attr("x", 0).attr("y", depthScale(12500)).attr("width", waterwidth).attr("height", depthScale(400)).attr("fill", "brown")

    const depthContainerWaterGroupAxis = depthContainerWaterGroup.append("g").attr("id", "depthContainerWaterGroupAxis").attr("transform", `translate(${-0}, 0)`)
    
    const depthContainerWaterGroupAxisY = depthContainerWaterGroupAxis.append("g").attr("id", "depthContainerWaterGroupAxisY").attr("transform", `translate(${0}, 0)`)
    const depthContainerWaterGroupAxisYAxis = d3.axisLeft(depthScale).tickFormat(d=>(d==0)?"0":d3.format(",")(d)+" ft").tickValues([0, 2000, 4000, 6000, 8000, 10000, 12000, 12500])
    const depthAxis = depthContainerWaterGroupAxisY.call(depthContainerWaterGroupAxisYAxis).attr("font-family", "Roboto")
    depthAxis.select(".domain").remove()

    let depthTransitionLength = 4*60*1000/60

    const depthContainerWaterGroupTextGroup = depthContainerWaterGroup.append("g").attr("id", "depthContainerWaterGroupTextGroup").attr("transform", `translate(${110}, 10)`)
    const depthTextSeries1 = ["RMS Titanic is", "estimated to have", "taken four minutes", "to sink from the", "surface to the", "ocean floor."]
    depthTextSeries1.forEach((d,i)=> {
        depthContainerWaterGroupTextGroup.append("text").text(d).attr("x", 0).attr("y", 15*i).attr("font-size", "10pt").attr("font-family", "'Castoro', serif")
    })

    const radioGroup = depthContainerWaterGroup.append("foreignObject").attr("x", 110).attr("y", 100).attr("width", 20).attr("height", 100)
    const radioGroupActualOptionRealTime = radioGroup.append("xhtml:input").attr("type", "radio").attr("id", "realTime").attr("name", "fallSpeed").attr("value", "realTime").style("accent-color", "red").on("click", ()=>depthTransitionLength=4*60*1000)
    const radioGroupActualOptio5x = radioGroup.append("xhtml:input").attr("type", "radio").attr("id", "twentyX").attr("name", "fallSpeed").attr("value", "twentyX").style("accent-color", "red").on("click", ()=>depthTransitionLength=4*60*1000/20)
    const radioGroupActualOptio10x = radioGroup.append("xhtml:input").attr("type", "radio").attr("id", "sixtyX").attr("name", "fallSpeed").attr("value", "sixtyX").style("accent-color", "red").on("click", ()=>depthTransitionLength=4*60*1000/60)
    d3.select('#sixtyX').property('checked', true)

    const radioGroupTextLabels = depthContainerWaterGroup.append("g").attr("id", "radioGroupTextLabels").attr("transform", `translate(${130}, 112)`)

    radioGroupTextLabels.append("text").text("Real Time").attr("x", 0).attr("y", 0).attr("font-size", "10pt").attr("font-family", "'Castoro', serif")
    radioGroupTextLabels.append("text").text("20x").attr("x", 0).attr("y", 21).attr("font-size", "10pt").attr("font-family", "'Castoro', serif")
    radioGroupTextLabels.append("text").text("60x").attr("x", 0).attr("y", 42).attr("font-size", "10pt").attr("font-family", "'Castoro', serif")
    radioGroupTextLabels.append("text").text("Choose speed then click water").attr("x", -20).attr("y", 60).attr("font-size", "6pt").attr("font-style", "italic").attr("font-family", "'Castoro', serif")
    
    const depthTextSeries2 = ["RMS Titanic was", "850ft long, and", "the ocean floor", "was 12,500ft (2.4", "miles) below the", "surface. She fell", "around 15 times", "her own length."]
    depthTextSeries2.forEach((d,i)=> {
        depthContainerWaterGroupTextGroup.append("text").text(d).attr("x", 0).attr("y", 190+15*i).attr("font-size", "10pt").attr("font-family", "'Castoro', serif")
    })

    const depthTextSeries3 = ["Witnesses report", "the hull split at", "the surface."]
    depthTextSeries3.forEach((d,i)=> {
        depthContainerWaterGroupTextGroup.append("text").text(d).attr("x", 0).attr("y", 320+15*i).attr("font-size", "10pt").attr("font-family", "'Castoro', serif")
    })

    const depthTextSeries4 = ["The pressure at", "the ocean floor", "is 6,000 pounds", "per square inch,", "or 400 times", "greater than at", "the surface."]
    depthTextSeries4.forEach((d,i)=> {
        depthContainerWaterGroupTextGroup.append("text").text(d).attr("x", 0).attr("y", 375+15*i).attr("font-size", "10pt").attr("font-family", "'Castoro', serif")
    })


    const titanicGroup = depthContainerWaterGroup.append("g").attr("id", "titanicGroup").attr("transform", `translate(${waterwidth/2}, ${0})`)
    
    // const eiffelPath = "M 0 0 L 0 0 L 17 0 C 22 -19 46 -19 51 0 L 67 0 C 39 -32 40 -53 36 -99 L 37 -100 L 37 -103 L 34 -106 L 32 -106 L 29 -103 L 29 -100 L 30 -99 C 27 -54 29 -32 0 0 Z"
    titanicGroup.append("path").attr("d", titanicPath).attr("fill", "black").attr("transform", `translate(${0}, ${0}) scale(${depthScale(850)/100}, ${depthScale(850)/100})`)

    const sinkingTextGroup = depthContainerWaterGroup.append("g").attr("id", "sinkingTextGroup").attr("transform", `translate(${100}, ${20})`)
    const sinkingText = sinkingTextGroup.append("text").attr("id", "sinkingText").text("0 ft").attr("font-size", "16pt").attr("font-family", "'Roboto', sans-serif").attr("transform", `translate(${0}, ${0})`).attr("text-anchor", "end")
                .attr("fill", "DarkRed").attr("font-weight", "bold").attr("opacity", 0.8)

    const sinkingLine = depthContainerWaterGroup.append("line").attr("id", "sinkingLine").attr("x1", 0).attr("y1", 0).attr("x2", 20).attr("y2", 0).attr("stroke", "red").attr("stroke-width", 1).attr("stroke-dasharray", "1, 1")

    const sinkingTimeGroup = sinkingTextGroup.append("g").attr("id", "sinkingTimeGroup").attr("transform", `translate(${0}, ${15})`)
    const sinkingTime = sinkingTimeGroup.append("text").attr("id", "sinkingTime").text("2:20:00 am").attr("font-size", "8pt").attr("font-family", "'Roboto mono', monospace").attr("transform", `translate(${0}, ${0})`).attr("text-anchor", "end").attr("fill", "#333333").attr("opacity", 0.8)
    

    depthContainerWaterGroup
        .append("rect").attr("id", "depthContainerWaterGroupRect").attr("x", 0).attr("y", 0).attr("width", waterwidth).attr("height", depthScale(13000)).attr("fill", "transparent")
        .on("mouseover", (e, d)=> {
            titanicGroup.attr("transform", `translate(${waterwidth/2}, ${0})`).transition().ease(d3.easeLinear).duration(depthTransitionLength)
                .attrTween("transform", ()=>{
                return function(t) {
                    let attrToReturn = "translate(" + waterwidth/2 + ", " + t*depthScale(12500) + ") rotate("
                    if (t<0.5) {
                        attrToReturn += "-" + t*180 + ")"
                    } else {
                        attrToReturn += "-" + (1-t)*180 + ")"
                    }
                    return attrToReturn
                    }

                })
            sinkingTextGroup.transition().ease(d3.easeLinear).duration(depthTransitionLength)
                .attrTween("transform", ()=>{
                // const i = d3.interpolate(depthScale(0), depthScale(12500))
                return function(t) {
                    let attrToReturn = "translate(" + 100 + ", " + (Math.max(20,Math.floor(t*depthScale(12500)-40))) + ")"
                    return attrToReturn
                    }
                })

            sinkingText.transition().ease(d3.easeLinear).duration(depthTransitionLength)
                .textTween(()=>{
                    const i = d3.interpolate(0, 12500)
                    return function(t) {
                        return d3.format(",")(Math.round(i(t))) + " ft"
                    }
                })
            
            sinkingTime.transition().ease(d3.easeLinear).duration(depthTransitionLength)
                .textTween(()=>{
                    const i = d3.interpolate(0, 60*4) // 4 minutes sinking time
                    return function(t) {
                        let minutes = Math.floor(i(t)/60)
                        let seconds = Math.floor(i(t)%60)
                        if (seconds<10) {
                            seconds = "0" + seconds
                        }
                        return "2:2" + minutes + ":" + seconds + " am"
                    }
                })

            sinkingLine.transition().ease(d3.easeLinear).duration(depthTransitionLength)
                .attrTween("transform", ()=>{
                    return function(t) {
                        let attrToReturn = "translate(" + 0 + ", " + (t*depthScale(12500)) + ")"
                        return attrToReturn
                        }
                    })
          })
        .on("mouseout", (e, d)=> {
            d3.interrupt(d3.select("#titanicGroup").node())
            titanicGroup.attr("transform", `translate(${waterwidth/2}, ${0})`)
            d3.interrupt(d3.select("#sinkingText").node())
            sinkingText.text("0 ft")
            d3.interrupt(d3.select("#sinkingTextGroup").node())
            d3.interrupt(d3.select("#sinkingTime").node())
            sinkingTime.text("2:20:00 am")
            sinkingTextGroup.attr("transform", `translate(${100}, ${20})`)
            d3.interrupt(d3.select("#sinkingLine").node())
            sinkingLine.attr("transform", `translate(${0}, ${0})`)
            
        })

}

const extractColumn = (arr, column) => arr.map(x=>x[column]);

let sunburstRadius = 0.9*Math.min(primaryContainerWidth, primaryContainerHeight) / 2

let radius = 6
let cornerRadius = radius
let originalRadius = radius


const palette1 = ["#3b3122", "#8a7350", "#66553b"]
const palette2 = ["#a87242", "#704214", "#8c5a2b" ]
const ageSexColor = d3.scaleOrdinal().range(palette2)

let passengerData = []

let gs1Legend = primaryContainer.append("g").attr("id", "gs1LegendGroup")

let headlinesEtc = primaryContainer.append("g").attr("id", "headlinesEtc")

let subHeadlines = ["There were over 1,300 passengers on RMS Titanic",
                    "Passengers came from all over the globe",
                    "Most passengers boarded at Southampton",
                    "Male passengers outnumbered females by 2:1",        // 466 female, 843 male
                    "Half of all passengers were under 30 years old",
                    "One quarter of passengers were in 1st class",     // 1st CLASS, 326 - 2nd CLASS, 272 - 3rd CLASS, 706"
                    "Survivors were mostly female and 1st class",
                    "Including Crew, there were 2,224 people on board",
                    // "SCALE OF TRAGEDY SHOWN BY 'SANKEY' CHART"
                    ]
            
            

let subHeadline = d3.select("#headlinesEtc").append("text")
            .text(subHeadlines[0])
            .attr("x", 10)
            .attr("y", primaryContainerHeight-32)
            // .style("font-style", "normal")
            .style("font-size", "25px")
            .style("font-weight", "bold")
            .style("font-family", "Castoro, serif")


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
            .text(" 1 / "+globalTotalStates)
            .attr("x", 10)
            .attr("y", primaryContainerHeight-10)
            .style("font-style", "normal")
            .style("font-size", "12px")

let clickForMore = d3.select("#headlinesEtc").append("g").attr("id", "clickForMore")

clickForMoreRect = clickForMore.append("rect")
            .attr("id", "clickForMoreRect")
            .attr("x", primaryContainerWidth-170)
            .attr("y", primaryContainerHeight-65)
            .attr("rx", 10)
            .attr("ry", 10)
            .attr("width", 165)
            .attr("height", 60)
            .style("opacity", 0.1)

clickForMore
    .append("path")
    .attr("d", `M ${primaryContainerWidth-87.5-15} ${primaryContainerHeight-35-20} L ${primaryContainerWidth-87.5+15} ${primaryContainerHeight-35-5} L ${primaryContainerWidth-87.5-15} ${primaryContainerHeight-35+10} Z`)
    .style("opacity", 0.7)


clickForMore.append("text")
            .text("Click here for more details ...")
            .attr("x", primaryContainerWidth-170+165/2)
            .attr("y", primaryContainerHeight-10)
            .style("font-style", "normal")
            .style("font-size", "12px")
            .style("pointer-events", "none")
            .attr("text-anchor", "middle")
            .style("font-family", "Castoro, serif")

const searchBoxGroup = primaryContainer.append("g").attr("id", "searchBoxGroup").attr("transform", "translate(630,435)").style("pointer-events", "none").style("opacity", 0)

let sunburstGroup = primaryContainer
            .append('g')
            .attr('id', 'sunburstGroup')
            .attr('transform', 'translate(' + primaryContainerWidth / 2 + ',' + ((primaryContainerHeight)-85) + ') scale(1.8,1.8) rotate(-90)')

let partition = d3.partition().size([Math.PI, sunburstRadius])
let root = d3.hierarchy(group).sum(function (d) { return d.number})
partition(root)

arc = d3.arc()
            .startAngle(d => {d.x0s = 0; return d.x0})
            .endAngle(d => {d.x1s = 0; return d.x1})
            .innerRadius(d =>{ return d.y0 })
            .outerRadius(d => { return d.y1 })

function computeTextRotation(d) {
    let angle = (d.x0 + d.x1) / Math.PI * 90
    return (angle < 90) ? angle + 90 : angle - 90
    }

function arcTweenPath(a, i) {
    let oi = d3.interpolate({ x0: a.x0s, x1: a.x1s }, a)
    function tween(t) {
        let b = oi(t)
        // a.x0s = b.x0
        // a.x1s = b.x1
        return arc(b)
        }
    return tween;
    }

function arcTweenText(a, i) {
    let oi = d3.interpolate({ x0: a.x0s, x1: a.x1s }, a)
    function tween(t) {
        let b = oi(t)
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
        .style("font-style", "normal").style("font-size", "8px").style("text-anchor", "middle").style("vertical-align", "middle").style("font-family", "Castoro, serif")

    clickToRedraw = sunburstGroup.append("g").attr("id", "clickToRedraw")
    const clickToRedrawRect = clickToRedraw.append("rect").attr("x", -50).attr("y", -10).attr("width", 100).attr("height", 30).attr("transform", "translate(200,200) rotate(90)").attr("fill", "white").style("opacity", 0)
    const clickToRedrawText = clickToRedraw.append("text").text("Click to redraw by").attr("transform", "translate(200,200) rotate(90)")
        .style("font-style", "normal").style("font-size", "8px").style("text-anchor", "middle").style("vertical-align", "middle").style("opacity", 0).style("font-family", "Castoro, serif")
    const clickToRedrawValue = clickToRedraw.append("text").text("").attr("transform", "translate(185,200) rotate(90)")
        .style("font-style", "normal").style("font-size", "14px").style("text-anchor", "middle").style("vertical-align", "middle").style("opacity", 0).style("font-family", "Castoro, serif")

    slice
        .append('path')
        .attr("display", function (d) { return d.depth ? null : "none"; })
        .attr("d", arc)
        .style('stroke', '#fff')
        .style("stroke-width", 0.1)
        .style("fill", function (d) {
            return ageSexColor(d.depth) })


    let text = slice
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
        .style("font-family", "Castoro, serif")

    slice.selectAll("path").transition().duration(750).attrTween("d", arcTweenPath)
    slice.selectAll("text").transition().duration(750).attrTween("transform", arcTweenText)

    sunburstGroup.selectAll('path')
        .on("mouseover", (e,d)=>{
            let sequenceArray = d.ancestors().reverse()
            sequenceArray.shift()
            let textValues = sequenceArray[0].data[0]
            if (sequenceArray.length == 1) {
                bigNumber.text(d3.format(",")(sequenceArray[0].value))
            } else if (sequenceArray.length == 2) {
                textValues += ", " + sequenceArray[1].data[0]
                bigNumber.text(d3.format(",")(sequenceArray[1].value))
                clickToRedrawRect.style("opacity", 0.3)
                clickToRedrawText.style("opacity", 1)
                clickToRedrawValue.style("opacity", 1).text(
                    (sequenceArray[1].data[0]=="Men" || sequenceArray[1].data[0]=="Women" || sequenceArray[1].data[0]=="Children") ? "Sex" :
                        (sequenceArray[1].data[0]=="Lost" || sequenceArray[1].data[0]=="Saved") ? "Survivorship" : "Cabin class"
                    )
            } else if (sequenceArray.length == 3) {
                clickToRedrawRect.style("opacity", 0.3)
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
            clickToRedrawRect.style("opacity", 0)
            clickToRedrawText.style("opacity", 0)
            clickToRedrawValue.style("opacity", 0)
            let sequenceArray = d.ancestors().reverse()
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
            clickToRedrawRect.style("opacity", 0)
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
        .style("opacity", 1)

    passengers
        .transition()
            .duration((d,i)=>i*2)
            .attr("transform", (d, i) => {
                    let leftRightBuffer = 120
                    let topBuffer = 50
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
            // .style("opacity", 0.5)
    
    searchBoxGroup.style("pointer-events", "auto").style("opacity", 1)
    const searchBoxTitleGroup = searchBoxGroup.append("g").attr("id", "searchBoxTitleGroup")
    searchBoxTitleGroup.append("text").text("Search:").attr("x", 0).attr("y", -4).style("font-size", "14px").style("font-family", "Castoro Titling")
    const searchBoxSearchGroup = searchBoxGroup.append("g").attr("id", "searchBoxSearchGroup").attr("transform", "translate(0,0)")
    const searchBox = searchBoxSearchGroup.append("foreignObject").attr("x", 0).attr("y", 0).attr("width", 190).attr("height", 20)
    const clearSearchButton = searchBoxSearchGroup.append("foreignObject").attr("x", 0).attr("y", 15).attr("width", 190).attr("height", 20)
    const clearSearchButtonActual = clearSearchButton.append("xhtml:button").attr("id", "clearSearchButtonActual").text("Clear search").style("font-size", "8px").on("click", ()=>{
        d3.select("#searchBoxActual").node().value = ""
        passengers.selectAll("rect").style("opacity", 1)
    })
    const searchBoxActual = searchBox.append("xhtml:input").attr("x", 40).attr("id", "searchBoxActual").attr("type", "text").attr("placeholder", "Ohio, Straus, Hong Kong ...")
                .on("keyup", ()=>{
                        let textSearchTerm = d3.select("#searchBoxActual").node().value.toLowerCase()
                        passengers.selectAll("rect").style("opacity", d=>{
                            let textToSearch = "".concat(d.openmlname," ",d.derivedTitle," ",d.derivedfName," ",d.derivedSurname," ",d.derivedPassengerTitleName," ",d.derivedName," ",d.openmlhomedest," ",d.kName," ",d.kCabin," ",d.kName_wiki," ",d.kHometown," ",d.kBoarded," ",d.kDestination)
                                                 .replace("undefined","")
                                                 .replace(",","")
                                                 .replace(".","")
                                                 .replace("(","")
                                                 .replace(")","")
                                                 .toLowerCase()
                            return textToSearch.includes(textSearchTerm) ? 1 : 0.3
                        })
                    })


    clickForMore.on("mouseover", ()=>{clickForMoreRect.transition().duration(300).style("opacity", 0.3)})
    clickForMore.on("mouseout", ()=>{clickForMoreRect.transition().duration(300).style("opacity", 0.1)})
    clickForMore.on("click", ()=>{

        oneOfN.text((globalState+1) + " / " + globalTotalStates)

        if (globalState == 0) {
            sunburstGroup.selectAll("g").remove()

            searchBoxGroup.style("pointer-events", "auto").style("opacity", 1)

            radius = originalRadius
            subHeadlineTransition(subHeadlines[globalState])
            passengers
                .transition()
                .duration((d,i)=>(i))
                .attr("transform", (d, i) => {
                    let leftRightBuffer = 120
                    let topBuffer = 50
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
                    .style("opacity", 1)
                    .attr("rx", cornerRadius)
                    .attr("ry", cornerRadius)
                    .attr("width", radius*2)
                    .attr("height", radius*2)

            lostTitanicImage.attr("xlink:href", "./src/titanicImages/" + lostTitanicImageList[globalState])
            lostTitanicText.text(lostTitanicTextList[globalState])
                    
            globalState += 1
        }
        else if (globalState == 1) {
            
            subHeadlineTransition(subHeadlines[globalState])

            const globalScaleLong = d3.scaleLinear().domain([-180,180]).range([30,primaryContainerWidth+30])
            const globalScaleLat = d3.scaleLinear().domain([-90,90]).range([primaryContainerHeight,0])
            radius = 4
            let unitSize = radius*2
            
            passengers
                .transition()
                .duration(1500)
                    .attr("transform", (d,i) => {
                        let i_prime = passengerData.filter(item => item.kHometownCountry == d.kHometownCountry).findIndex(e => {return e.openmlid == d.openmlid})
                        
                        let initialX = globalScaleLong(countriesCentroids.filter(item=>item.name==d.kHometownCountry)[0].long)
                        
                        let initialY = globalScaleLat(countriesCentroids.filter(item=>item.name==d.kHometownCountry)[0].lat)
                        let numUnitsWide = (d.kHometownCountry=="Ireland")?7:
                                           (d.kHometownCountry=="Norway")?6:
                                           (d.kHometownCountry=="Sweden")?22:
                                           (d.kHometownCountry=="Finland")?14:
                                           (d.kHometownCountry=="Lebanon")?12:
                                           (d.kHometownCountry=="Canada")?16:
                                           (d.kHometownCountry=="USA")?16:
                                           (d.kHometownCountry=="England")?14:
                                           (d.kHometownCountry=="Russia")?4:
                                           (d.kHometownCountry=="China")?4:
                                           (d.kHometownCountry=="India")?4:
                                           (d.kHometownCountry=="Bulgaria")?6:
                                           (d.kHometownCountry=="France")?5:
                                           (d.kHometownCountry=="Belgium")?5:
                                           (d.kHometownCountry=="Spain")?5:
                                           (d.kHometownCountry=="Switzerland")?5:
                                           (d.kHometownCountry=="Croatia")?7:
                                           (d.kHometownCountry=="Syria")?10:20
                        
                        initialX += (i_prime % numUnitsWide ) * (unitSize+1)
                        initialY += Math.floor( i_prime/numUnitsWide ) * (unitSize+1)

                        return "translate(" +
                                initialX + "," +
                                initialY + ")"
                        })
            
            gs1Legend.style("opacity", 0)
            const gs1LengendsCountries = gs1Legend.selectAll("g").data(countriesCentroids).enter().append("g").attr("id", (d,i)=>"countriesLegends"+i)
            gs1LengendsCountries.append("text").attr("x", d=>globalScaleLong(d.long)).attr("y", d=>globalScaleLat(d.lat)).text(d=>d.name).attr("dy", -5).attr("font-size", "8pt").style("font-weight", "bold")

            gs1Legend.transition().duration(2000).style("opacity", 1)

            passengers.selectAll("rect")
                .transition().duration(t/4)
                .attr("rx", 2)
                .attr("ry", 2)
                .attr("width", radius*2)
                .attr("height", radius*2)

            lostTitanicImage.attr("xlink:href", "./src/titanicImages/" + lostTitanicImageList[globalState])
            lostTitanicText.text(lostTitanicTextList[globalState])
            
            globalState +=  1
        }
        
        else if (globalState == 2) {

            subHeadlineTransition(subHeadlines[globalState])
            gs1Legend.selectAll("g").remove()
            gs1Legend.style("opacity", 0)

            const belfastCentroid = [350,50]
            const southamptonCentroid = [770,210]
            const cherbourgCentroid = [460,320]
            const queenstownCentroid = [220,200]
            const unknownCentroid = [100,40]
            const belfastJoined = passengerData.filter(item => item.kBoarded == "Belfast").length
            const southamptonJoined = passengerData.filter(item => item.kBoarded == "Southampton").length
            const cherbourgJoined = passengerData.filter(item => item.kBoarded == "Cherbourg").length
            const queenstownJoined = passengerData.filter(item => item.kBoarded == "Queenstown").length
            const unknownJoined = passengerData.filter(item => item.kBoarded == "").length
            const arrowPath = "M 0 0 C 0 0 0 0 0 0 C 10 7 15 10 30 10 L 30 8 L 33 11 L 30 14 L 30 12 C 25 12 12 12 0 0 Z"
            
            radius = 3.5
            let unitSize = (radius*2)

            gs1Legend.style("opacity", 0)

            gs1LegendBelfast = gs1Legend.append("g").attr("id", "gs1LegendBelfast").attr("transform", `translate(${belfastCentroid[0]},${belfastCentroid[1]})`)
            gs1LegendBelfast.append("text").text("Belfast, Ireland").attr("x", 18).attr("y", -30).attr("font-size", "10pt").style("font-weight", "bold")
            gs1LegendBelfast.append("text").text("Departed 9 April 1912").attr("x", 18).attr("y", -18).attr("font-size", "8pt")
            gs1LegendBelfast.append("text").text(belfastJoined + " passengers boarded").attr("x", 18).attr("y", -8).attr("font-size", "6pt")
            gs1LegendBelfast.append("path").attr("d", arrowPath).attr("transform", "translate(35,15) scale(7.2,6)").style("opacity", 0.6)
            gs1LegendSouthampton = gs1Legend.append("g").attr("id", "gs1LegendSouthampton").attr("transform", `translate(${southamptonCentroid[0]},${southamptonCentroid[1]})`)
            gs1LegendSouthampton.append("text").text("Southampton, England").attr("x", 18).attr("y", -170).attr("font-size", "10pt").style("font-weight", "bold")
            gs1LegendSouthampton.append("text").text("Departed 12:00pm, 10 April 1912").attr("x", 18).attr("y", -158).attr("font-size", "8pt")
            gs1LegendSouthampton.append("text").text(southamptonJoined + " passengers boarded").attr("x", 18).attr("y", -148).attr("font-size", "6pt")
            gs1LegendSouthampton.append("path").attr("d", arrowPath).attr("transform", "translate(-155,-10) scale(-2.8,-4) rotate(-40)").style("opacity", 0.6)
            gs1LegendCherbourg = gs1Legend.append("g").attr("id", "gs1LegendCherbourg").attr("transform", `translate(${cherbourgCentroid[0]},${cherbourgCentroid[1]})`)
            gs1LegendCherbourg.append("text").text("Cherbourg, France").attr("x", 70).attr("y", 60).attr("font-size", "10pt").style("font-weight", "bold")
            gs1LegendCherbourg.append("text").text("Departed 8:10pm, 10 April 1912").attr("x", 70).attr("y", 72).attr("font-size", "8pt")
            gs1LegendCherbourg.append("text").text(cherbourgJoined + " passengers boarded").attr("x", 70).attr("y", 82).attr("font-size", "6pt")
            gs1LegendCherbourg.append("path").attr("d", arrowPath).attr("transform", "translate(-60,-75) scale(-3.0,-3.8)").style("opacity", 0.6)
            gs1LegendQueenstown = gs1Legend.append("g").attr("id", "gs1LegendQueenstown").attr("transform", `translate(${queenstownCentroid[0]},${queenstownCentroid[1]})`)
            gs1LegendQueenstown.append("text").text("Queenstown, Ireland").attr("x", -85).attr("y", -75).attr("font-size", "10pt").style("font-weight", "bold")
            gs1LegendQueenstown.append("text").text("Departed 1:30pm, 11 April 1912").attr("x", -85).attr("y", -63).attr("font-size", "8pt")
            gs1LegendQueenstown.append("text").text(queenstownJoined + " passengers boarded").attr("x", -85).attr("y", -53).attr("font-size", "6pt")
            gs1LegendQueenstown.append("path").attr("d", arrowPath).attr("transform", "translate(-30,65) scale(-3,3)").style("opacity", 0.6)
            gs1LegendQueenstown.append("text").text("... to New York, United States").attr("x", -165).attr("y", 135).attr("font-size", "10pt").style("font-weight", "bold").style("font-style", "normal")
            gs1LegendUnknown = gs1Legend.append("g").attr("id", "gs1LegendUnknown").attr("transform", `translate(${unknownCentroid[0]},${unknownCentroid[1]})`)
            gs1LegendUnknown.append("text").text("Unknown").attr("x", 18).attr("y", -10).attr("font-size", "8pt").style("font-weight", "bold")
            gs1LegendUnknown.append("text").text(unknownJoined + " passengers").attr("x", 18).attr("y", 2).attr("font-size", "6pt")

            gs1Legend.transition().duration(2000).style("opacity", 1)

            passengers
                .transition()
                .duration((d,i)=>(i*2))
                    .attr("transform", (d,i) => {
                        let i_prime = passengerData.filter(item => item.kBoarded == d.kBoarded).findIndex(e => {return e.openmlid == d.openmlid})
                        let spiralRadius = 1.21
                        let theta = 2*Math.PI*Math.sqrt(2*spiralRadius*i_prime/unitSize)
                        let initialX = (i_prime==0) ? 1 : spiralRadius * theta * Math.cos(theta)
                        let initialY = (i_prime==0) ? 2 : spiralRadius * theta * Math.sin(theta)
                        if      (d.kBoarded == "Belfast")     { initialX += belfastCentroid[0] ; initialY += belfastCentroid[1] }
                        else if (d.kBoarded == "Southampton") { initialX += southamptonCentroid[0] ; initialY += southamptonCentroid[1] }
                        else if (d.kBoarded == "Cherbourg")   { initialX += cherbourgCentroid[0] ; initialY += cherbourgCentroid[1] }
                        else if (d.kBoarded == "Queenstown")  { initialX += queenstownCentroid[0] ; initialY += queenstownCentroid[1] }
                        else                                  { initialX += unknownCentroid[0]; initialY += unknownCentroid[1]}

                        return "translate(" +
                                initialX + "," +
                                initialY + ")"
                        })
            

            passengers.selectAll("rect")
                .transition().duration(t/4)
                    .attr("rx", cornerRadius)
                    .attr("ry", cornerRadius)
                    .attr("width", radius*2)
                    .attr("height", radius*2)
                    // .style("opacity", 0.7)

            lostTitanicImage.attr("xlink:href", "./src/titanicImages/" + lostTitanicImageList[globalState])
            lostTitanicText.text(lostTitanicTextList[globalState])
            
            globalState += 1
        }
        else if (globalState == 3) {

            d3.select("#gs1LegendBelfast").remove()
            d3.select("#gs1LegendSouthampton").remove()
            d3.select("#gs1LegendCherbourg").remove()
            d3.select("#gs1LegendQueenstown").remove()
            d3.select("#gs1LegendUnknown").remove()

            subHeadlineTransition(subHeadlines[globalState])
            // d3.select("#searchBoxInput").node().value = ""
            // passengers.style("opacity",1)

            radius = 5
            let midBuffer = 35
            let topBuffer = 0.05 * primaryContainerHeight
            let radiusMult = 2.6
            let unitSize = radius*radiusMult + 1
            let bottomBuffer = 0.8 * primaryContainerHeight
            let numUnitsHigh = Math.floor((bottomBuffer-topBuffer)/unitSize)
            let xOffset = 50


            gs1LegendMale = gs1Legend.append("g")
                        .attr("id", "gs1LegendMale")
                        .attr("transform", `translate(${-100},${0.8*primaryContainerHeight+15})`)
            
            gs1LegendMale.append("text").text("Male").attr("x", 0).attr("y", 0).style("font-style", "normal").style("font-size", "16px").attr("text-anchor", "end")
            gs1LegendMale.append("text").text("843").attr("x", 0).attr("y", 10).style("font-style", "normal").style("font-size", "10px").attr("text-anchor", "end")
            
            gs1LegendFemale = gs1Legend.append("g")
                        .attr("id", "gs1LegendFemale")
                        .attr("transform", `translate(${primaryContainerWidth+100},${0.8*primaryContainerHeight+15})`)
            
            gs1LegendFemale.append("text").text("Female").attr("x", 0).attr("y", 0).style("font-style", "normal").style("font-size", "16px")
            gs1LegendFemale.append("text").text("466").attr("x", 0).attr("y", 10).style("font-style", "normal").style("font-size", "10px")

            gs1LegendMale.transition().duration(t)
                .attr("transform", `translate(${primaryContainerWidth/2-midBuffer+xOffset},${0.8*primaryContainerHeight+15})`)
            
            gs1LegendFemale.transition().duration(t)
                .attr("transform", `translate(${primaryContainerWidth/2+midBuffer+xOffset},${0.8*primaryContainerHeight+15})`)

            passengers.selectAll("rect")
                .transition().duration(t/4)
                    .attr("rx", 2)
                    .attr("ry", 2)
                    .attr("width", radius*radiusMult)
                    .attr("height", radius*radiusMult)
                    .style("fill", (d) => (d.kSex == "male" ? "#4b371c" : "#4b371c"))
                    // .style("opacity", 0.9)

            passengers
                .transition()
                .duration((d,i)=>(i*2))
                    .attr("transform", (d,i) => {
                        let i_prime = passengerData.filter(item => item.kSex == d.kSex).findIndex(e => {return e.openmlid == d.openmlid})
                        let initialY = topBuffer + ( i_prime % numUnitsHigh) * unitSize
                        let initialX
                        if (d.kSex == "female") { initialX = primaryContainerWidth/2 + xOffset + midBuffer + Math.floor( i_prime / numUnitsHigh ) * unitSize }
                        else                   { initialX = primaryContainerWidth/2 + xOffset - midBuffer - unitSize - Math.floor( (i_prime) / numUnitsHigh ) * unitSize }

                        return "translate(" +
                                initialX + "," +
                                initialY + ")"
                    })

            lostTitanicImage.attr("xlink:href", "./src/titanicImages/" + lostTitanicImageList[globalState])
            lostTitanicText.text(lostTitanicTextList[globalState])
        
            globalState += 1
        }
        else if (globalState == 4) {

            subHeadlineTransition(subHeadlines[globalState])
            // d3.select("#searchBoxInput").node().value = ""
            // passengers.style("opacity",1)

            radius = 3.5
            let radiusMult = 2.4
            let midBuffer = 50
            let ageBucketBuffer = 5
            let topBuffer = 0.05 * primaryContainerHeight
            let unitSize = radius*radiusMult + 1
            let bottomBuffer = 0.8 * primaryContainerHeight
            let ageBucketHeight = (bottomBuffer-topBuffer)/8
            let numUnitsHigh = Math.floor((ageBucketHeight-ageBucketBuffer)/unitSize)
            let xOffset = 60

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
            gs1LegendUnk.append("text").text("Unknown").attr("x", 0).attr("y", 0).style("font-style", "normal").style("font-size", "12px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1LegendUnk.append("text").text("263").attr("x", 0).attr("y", 11).style("font-style", "normal").style("font-size", "10px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1Legend60 = gs1Legend.append("g").attr("id", "gs1Legend60").attr("transform", `translate (${primaryContainerWidth/2 + xOffset},${0})`).style("opacity", 0)
            gs1Legend60.append("text").text("60 yrs +").attr("x", 0).attr("y", 0).style("font-style", "normal").style("font-size", "12px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1Legend60.append("text").text("40").attr("x", 0).attr("y", 11).style("font-style", "normal").style("font-size", "10px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1Legend40 = gs1Legend.append("g").attr("id", "gs1Legend40").attr("transform", `translate (${primaryContainerWidth/2 + xOffset},${0})`).style("opacity", 0)
            gs1Legend40.append("text").text("40 - 59 yrs").attr("x", 0).attr("y", 0).style("font-style", "normal").style("font-size", "12px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1Legend40.append("text").text("205").attr("x", 0).attr("y", 11).style("font-style", "normal").style("font-size", "10px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1Legend30 = gs1Legend.append("g").attr("id", "gs1Legend30").attr("transform", `translate (${primaryContainerWidth/2 + xOffset},${0})`).style("opacity", 0)
            gs1Legend30.append("text").text("30 - 39 yrs").attr("x", 0).attr("y", 0).style("font-style", "normal").style("font-size", "12px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1Legend30.append("text").text("232").attr("x", 0).attr("y", 11).style("font-style", "normal").style("font-size", "10px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1Legend25 = gs1Legend.append("g").attr("id", "gs1Legend25").attr("transform", `translate (${primaryContainerWidth/2 + xOffset},${0})`).style("opacity", 0)
            gs1Legend25.append("text").text("25 - 29 yrs").attr("x", 0).attr("y", 0).style("font-style", "normal").style("font-size", "12px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1Legend25.append("text").text("160").attr("x", 0).attr("y", 11).style("font-style", "normal").style("font-size", "10px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1Legend20 = gs1Legend.append("g").attr("id", "gs1Legend20").attr("transform", `translate (${primaryContainerWidth/2 + xOffset},${0})`).style("opacity", 0)
            gs1Legend20.append("text").text("20 - 24 yrs").attr("x", 0).attr("y", 0).style("font-style", "normal").style("font-size", "12px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1Legend20.append("text").text("184").attr("x", 0).attr("y", 11).style("font-style", "normal").style("font-size", "10px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1Legend10 = gs1Legend.append("g").attr("id", "gs1Legend10").attr("transform", `translate (${primaryContainerWidth/2 + xOffset},${0})`).style("opacity", 0)
            gs1Legend10.append("text").text("10 - 19 yrs").attr("x", 0).attr("y", 0).style("font-style", "normal").style("font-size", "12px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1Legend10.append("text").text("143").attr("x", 0).attr("y", 11).style("font-style", "normal").style("font-size", "10px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1Legend0 = gs1Legend.append("g").attr("id", "gs1Legend0").attr("transform", `translate (${primaryContainerWidth/2 + xOffset},${0})`).style("opacity", 0)
            gs1Legend0.append("text").text("0 - 9 yrs").attr("x", 0).attr("y", 0).style("font-style", "normal").style("font-size", "12px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1Legend0.append("text").text("82").attr("x", 0).attr("y", 11).style("font-style", "normal").style("font-size", "10px").style("text-anchor", "middle").style("vertical-align", "middle")

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
                    .attr("rx", 2)
                    .attr("ry", 2)
                    .attr("width", radius*radiusMult)
                    .attr("height", radius*radiusMult)
                    .style("fill", (d) => (d.kSex == "male" ? "#4b371c" : "#4b371c"))
                    // .style("opacity", 0.9)

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

            lostTitanicImage.attr("xlink:href", "./src/titanicImages/" + lostTitanicImageList[globalState])
            lostTitanicText.text(lostTitanicTextList[globalState])

            globalState += 1
        }
        else if (globalState == 5) {

            subHeadlineTransition(subHeadlines[globalState])
            // d3.select("#searchBoxInput").node().value = ""
            // passengers.style("opacity",1)

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
            gs1Legend1st.append("text").text("First Class").attr("x", 0).attr("y", 0).style("font-style", "normal").style("font-size", "12px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1Legend1st.append("text").text("323").attr("x", 0).attr("y", 11).style("font-style", "normal").style("font-size", "10px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1Legend2nd = gs1Legend.append("g").attr("id", "gs1Legend2nd").attr("transform", `translate (${primaryContainerWidth/2 + xOffset},${0})`).style("opacity", 0)
            gs1Legend2nd.append("text").text("Second Class").attr("x", 0).attr("y", 0).style("font-style", "normal").style("font-size", "12px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1Legend2nd.append("text").text("277").attr("x", 0).attr("y", 11).style("font-style", "normal").style("font-size", "10px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1Legend3rd = gs1Legend.append("g").attr("id", "gs1Legend3rd").attr("transform", `translate (${primaryContainerWidth/2 + xOffset},${0})`).style("opacity", 0)
            gs1Legend3rd.append("text").text("Third Class").attr("x", 0).attr("y", 0).style("font-style", "normal").style("font-size", "12px").style("text-anchor", "middle").style("vertical-align", "middle")
            gs1Legend3rd.append("text").text("709").attr("x", 0).attr("y", 11).style("font-style", "normal").style("font-size", "10px").style("text-anchor", "middle").style("vertical-align", "middle")

            d3.select("#gs1Legend1st").transition().duration(t).attr("transform", `translate (${primaryContainerWidth/2 + xOffset},${topBuffer+classHeight*0.5})`).style("opacity", 1)
            d3.select("#gs1Legend2nd").transition().duration(t).attr("transform", `translate (${primaryContainerWidth/2 + xOffset},${topBuffer+classHeight*1.5})`).style("opacity", 1)
            d3.select("#gs1Legend3rd").transition().duration(t).attr("transform", `translate (${primaryContainerWidth/2 + xOffset},${topBuffer+classHeight*2.5})`).style("opacity", 1)

            gs1LegendMale.transition().duration(t).attr("transform", `translate(${primaryContainerWidth/2-midBuffer+xOffset},${0.8*primaryContainerHeight+15})`)
            gs1LegendFemale.transition().duration(t).attr("transform", `translate(${primaryContainerWidth/2+midBuffer+xOffset},${0.8*primaryContainerHeight+15})`)

            passengers.selectAll("rect")
                .transition().duration(t/4)
                    .attr("rx", 2)
                    .attr("ry", 2)
                    .attr("width", radius*2)
                    .attr("height", radius*2)
                    .style("fill", (d) => (d.kSex == "male" ? "#4b371c" : "#4b371c"))
                    // .style("opacity", 0.9)

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

            lostTitanicImage.attr("xlink:href", "./src/titanicImages/" + lostTitanicImageList[globalState])
            lostTitanicText.text(lostTitanicTextList[globalState])
            
            globalState += 1
        }
        else if (globalState == 6) {

            subHeadlineTransition(subHeadlines[globalState])

            d3.select("#searchBoxActual").node().value = ""
            searchBoxGroup.style("pointer-events", "none").style("opacity", 0)
            

            survivorKey = primaryContainer.append("g").attr("id", "survivorKey").attr("transform", "translate(-300, 100)")

            let survivorKeyRadiusMult = 10
            survivorKey.append("text").text("Saved").attr("x", 0).attr("y", 0).attr("dy", -radius*survivorKeyRadiusMult/2).style("font-size", "14px").style("alignment-baseline", "middle").style("font-style", "normal")
                        .style("vertical-align", "middle")
            survivorKey.append("text").text("Lost").attr("x", 0).attr("y", 5).attr("dy", radius*survivorKeyRadiusMult/2).style("font-size", "14px").style("alignment-baseline", "middle").style("font-style", "normal")
                        .style("vertical-align", "middle")

            survivorKey.append("rect").attr("x", -5-radius*survivorKeyRadiusMult).attr("y", -radius*survivorKeyRadiusMult).attr("width", radius*survivorKeyRadiusMult).attr("height", radius*survivorKeyRadiusMult).style("opacity", 1).style("fill", "#4b371c")
            survivorKey.append("rect").attr("x", -5-radius*survivorKeyRadiusMult).attr("y", 5).attr("width", radius*survivorKeyRadiusMult).attr("height", radius*survivorKeyRadiusMult).style("opacity", 0.3).style("fill", "#4b371c")

            survivorKey.transition().duration(t).attr("transform", "translate(250,100)")

            passengers.selectAll("rect")
                .transition().duration(t)
                .style("opacity", (d)=>(d.openmlsurvived == 1 ? 1 : 0.2))

            lostTitanicImage.attr("xlink:href", "./src/titanicImages/" + lostTitanicImageList[globalState])
            lostTitanicText.text(lostTitanicTextList[globalState])
            globalState += 1
        }
        else if (globalState == 7) {

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


            lostTitanicImage.attr("xlink:href", "./src/titanicImages/" + lostTitanicImageList[globalState])
            lostTitanicText.text(lostTitanicTextList[globalState])

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
                // defaultPD.style("opacity", 0.9)
            })

    setPD(passengerData.find(item=>(item.openmlid==11)))

    function formatFare(fare) {
        // Fare is in Pre-1970 British Pounds. Conversion Factors: 1 = 12s = 240d and 1s = 20d
        // Will come in a decimal e.g. 7.66645

        if (fare == 0 || fare == "?") return "Unknown";

        let poundsFare = Math.floor(fare)
        let fractionFare = fare - poundsFare
        let penceFareInitial = Math.floor(fractionFare * 120)
        let shillingsFare = Math.floor(penceFareInitial/12)
        let penceFareFinal = penceFareInitial % 12
        let fareToReturn = '\u00A3'+ poundsFare + " " + shillingsFare + "s. " + penceFareFinal + "d."
        fareToReturn = '\u00A3'+ poundsFare + " "
        if (shillingsFare>0) {
            fareToReturn += shillingsFare + "/"
            if (penceFareFinal>0) {
                fareToReturn += penceFareFinal
            }
        }
        
        
        return fareToReturn
    }

    function setPD(passenger) {

        // let passengerDetailContainerWidth = 215
        // let passengerDetailContainerHeight = 200

        defaultPD.selectAll("g").remove()

        const innerColumnWidth = 310 - 10

        const passengerProfileTitle = defaultPD.append("g").attr("id", "passengerProfileTitle").attr("transform", "translate(0,0)")
        passengerProfileTitle.append("text").attr("id", "mainPassengerSubTitle").text("- PASSENGER PROFILE -").attr("x", passengerDetailContainerWidth/2).attr("y", 15).attr("font-size", "9pt").attr("font-weight", "normal").attr("font-style", "normal").attr("text-anchor", "middle")

        let passengerDetailTitle = defaultPD.append("g").attr("id", "passengerDetailTitle").attr("transform", "translate(155,45)")
        passengerDetailTitle.append("text").attr("id", "mainPassengerName").text(passenger.derivedPassengerTitleName).attr("x", 0).attr("y", 0).attr("font-size", "28px").attr("font-weight", "bold").attr("font-style", "normal").attr("text-anchor", "middle")
        
        const computedTextLength = (d3.select("#mainPassengerName")._groups[0][0].getComputedTextLength())
        if (computedTextLength > 0.95 * passengerDetailContainerWidth) {
            const mainPassengerTitleRequiredWidth = 0.95*passengerDetailContainerWidth/computedTextLength
            passengerDetailTitle.attr("transform", `translate(155,45) scale(${mainPassengerTitleRequiredWidth},1) `)
        }


        /////////////////////////////
        // FIRST COLUMN 
        /////////////////////////////

        const passengerFirstColumn = defaultPD.append("g").attr("id", "passengerFirstColumn").attr("transform", `translate(5,42)`)
        
        // AGE WIDGET
        const passengerAgeScaleMax = 70
        const passengerAgeScaleXOff = 40
        const passengerAgeScaleYOff = -5
        const passengerAgeScale = d3.scaleLinear().domain([0,85]).range([0,passengerAgeScaleMax])
        let passengerAgeGroup = passengerFirstColumn.append("g").attr("id", "passengerAgeGroup").attr("transform", `translate(0,35)`)
        passengerAgeGroup.append("text").text("Age").attr("x", 0).attr("y", 0).style("font-size", "16px")
        passengerAgeGroup.append("rect").attr("x", passengerAgeScaleXOff).attr("y", passengerAgeScaleYOff-1.5).attr("width", passengerAgeScaleXOff+passengerAgeScaleMax).attr("height", 2).attr("fill", "gray").style("opacity", 0.7)
        passengerAgeGroup.append("rect").attr("x", (passenger.kAge=="?") ? passengerAgeScaleXOff : passengerAgeScaleXOff+passengerAgeScale(passenger.kAge)-1).attr("y", passengerAgeScaleYOff-4).attr("width", (passenger.kAge=="?") ? 0 : 3).attr("height", 8).attr("fill", "red")
        passengerAgeGroup.append("text").text(((passenger.kAge=="?")?"Age unknown":d3.format(".0f")(passenger.kAge)+" yrs")).attr("x", (passenger.kAge=="?") ? passengerAgeScaleXOff : passengerAgeScaleXOff+passengerAgeScale(passenger.kAge)-1).attr("y", passengerAgeScaleYOff+12).style("font-size", "8px").attr("text-anchor", ((passenger.kAge=="?")||passenger.kAge<10) ? "left" :"middle")
        
        // BOARDING LOCATION WIDGET        
        let passengerBoardedGroup = passengerFirstColumn.append("g").attr("id", "passengerBoardedGroup").attr("transform", "translate(0,67)")
        const boardedBoxWidth = (innerColumnWidth-1)/4
        const boardedBoxHeight = 21
        passengerBoardedGroup.append("text").text("Boarded").attr("x", 0).attr("y", 0).style("font-size", "16px")
        passengerBoardedGroup.append("rect").attr("x", 0).attr("y", 3).attr("width", boardedBoxWidth).attr("height", boardedBoxHeight).attr("id", "belfastBox").attr("fill", "brown").style("opacity", passenger.kBoarded=="Belfast"?1:0.5)
        passengerBoardedGroup.append("text").attr("x", boardedBoxWidth/2).attr("y", 18).attr("text-anchor", "middle").text("Belfast").style("font-size", "11px").attr("fill", "white").style("opacity", passenger.kBoarded=="Belfast"?1:0.5).style("font-family", "'Castoro', serif")
        passengerBoardedGroup.append("rect").attr("x", 1+boardedBoxWidth).attr("y", 3).attr("width", boardedBoxWidth).attr("height", boardedBoxHeight).attr("id", "southamptonBox").attr("fill", "brown").style("opacity", passenger.kBoarded=="Southampton"?1:0.5)
        passengerBoardedGroup.append("text").attr("x", 1+boardedBoxWidth+boardedBoxWidth/2).attr("y", 18).attr("text-anchor", "middle").text("Southampton").style("font-size", "11px").attr("fill", "white").style("opacity", passenger.kBoarded=="Southampton"?1:0.5).style("font-family", "'Castoro', serif")
        passengerBoardedGroup.append("rect").attr("x", 0).attr("y", 1+3+boardedBoxHeight).attr("width", boardedBoxWidth).attr("height", boardedBoxHeight).attr("id", "cherbourgBox").attr("fill", "brown").style("opacity", passenger.kBoarded=="Cherbourg"?1:0.5)
        passengerBoardedGroup.append("text").attr("x", boardedBoxWidth/2).attr("y", 39).attr("text-anchor", "middle").text("Cherbourg").style("font-size", "11px").attr("fill", "white").style("opacity", passenger.kBoarded=="Cherbourg"?1:0.5).style("font-family", "'Castoro', serif")
        passengerBoardedGroup.append("rect").attr("x", 1+boardedBoxWidth).attr("y", 1+3+boardedBoxHeight).attr("width", boardedBoxWidth).attr("height", boardedBoxHeight).attr("id", "queenstownBox").attr("fill", "brown").style("opacity", passenger.kBoarded=="Queenstown"?1:0.5)
        passengerBoardedGroup.append("text").attr("x", 1+boardedBoxWidth+boardedBoxWidth/2).attr("y", 39).attr("text-anchor", "middle").text("Queenstown").style("font-size", "11px").attr("fill", "white").style("opacity", passenger.kBoarded=="Queenstown"?1:0.5).style("font-family", "'Castoro', serif")
        
        // PASSENGER CLASS WIDGET
        let passengerClassGroup = passengerFirstColumn.append("g").attr("id", "passengerClassGroup").attr("transform", `translate(0,139)`)
        const classBoxSize = ((innerColumnWidth-10)/2) / 3 - 5
        const classCorners = 4
        const yStart = 5
        passengerClassGroup.append("text").text("Class").attr("x", 0).attr("y", 0).style("font-size", "16px")
        passengerClassGroup.append("rect").attr("x", 5)             .attr("y", yStart).attr("width", classBoxSize).attr("height", classBoxSize/2).attr("id", "firstBox").attr("fill", "red").style("opacity", passenger.kPclass=="1"?1:0.5).attr("rx", classCorners).attr("ry", classCorners)
        passengerClassGroup.append("text").attr("x", 5+classBoxSize/2).attr("y", yStart+16).attr("text-anchor", "middle").text("1st").style("font-size", "16px").attr("fill", "white").style("opacity", passenger.kPclass=="1"?1:0.5).style("font-family", "'Castoro', serif")
        passengerClassGroup.append("rect").attr("x", 10+classBoxSize+1)  .attr("y", yStart).attr("width", classBoxSize).attr("height", classBoxSize/2).attr("id", "secondBox").attr("fill", "red").style("opacity", passenger.kPclass=="2"?1:0.5).attr("rx", classCorners).attr("ry", classCorners)
        passengerClassGroup.append("text").attr("x", 10+classBoxSize+1+classBoxSize/2).attr("y", yStart+16).attr("text-anchor", "middle").text("2nd").style("font-size", "16px").attr("fill", "white").style("opacity", passenger.kPclass=="2"?1:0.5).style("font-family", "'Castoro', serif")
        passengerClassGroup.append("rect").attr("x", 15+classBoxSize*2+2)             .attr("y", yStart).attr("width", classBoxSize).attr("height", classBoxSize/2).attr("id", "thirdBox").attr("fill", "red").style("opacity", passenger.kPclass=="3"?1:0.5).attr("rx", classCorners).attr("ry", classCorners)
        passengerClassGroup.append("text").attr("x", 15+classBoxSize*2+2+classBoxSize/2).attr("y", yStart+16).attr("text-anchor", "middle").text("3rd").style("font-size", "16px").attr("fill", "white").style("opacity", passenger.kPclass=="3"?1:0.5).style("font-family", "'Castoro', serif")

        // PASSENGER HOMETOWN WIDGET
        let passengerHomeGroup = passengerFirstColumn.append("g").attr("id", "passengerHomeGroup").attr("transform", `translate(0,195)`)
        const passengerHomeWidth = 130
        passengerHomeGroup.append("text").text("Hometown").attr("x", 0).attr("y", 0).style("font-size", "16px")
        passengerHomeGroup.append("rect").attr("x", 0).attr("y", 4).attr("width", passengerHomeWidth).attr("height", 22).attr("fill", "grey")
        
        passengerHomeGroupTextGroup = passengerHomeGroup.append("g").attr("id", "passengerHomeGroupTextGroup").attr("transform", `translate(65,20)`)
        passengerHome = passengerHomeGroupTextGroup.append("text").attr("id", "passengerHometown").attr("x", 0).attr("y", 0).attr("text-anchor", "middle").text(passenger.kHometown).style("font-size", "16px").attr("fill", "white").style("font-family", "'Castoro', serif").style("font-weight", "light")
        
        const computedTextLengthHomeTown = (d3.select("#passengerHometown")._groups[0][0].getComputedTextLength())
        
        if (computedTextLengthHomeTown > 0.95 * passengerHomeWidth) {
            const passengerHomeRequiredWidth = 0.95*passengerHomeWidth/computedTextLengthHomeTown
            passengerHomeGroupTextGroup.attr("transform", `translate(65,20) scale(${passengerHomeRequiredWidth},1) `)
        }


        /////////////////////////////////////////////////////
        // SECOND COLUMN
        /////////////////////////////////////////////////////

        let passengerSecondColumn = defaultPD.append("g").attr("id", "passengerSecondColumn").attr("transform", "translate(158,42)")

        // PASSENGER SURVIVED INDICATOR
        let passengerSurvivedGroup = passengerSecondColumn.append("g").attr("id", "passengerSurvivedGroup").attr("transform", `translate(72,38)`)
        passengerSurvivedGroup.append("rect").attr("x", -60).attr("y", -20).attr("width", 120).attr("height", 25).attr("fill", (passenger.openmlsurvived==1)?"gray":"gray").attr("rx", 10).attr("ry", 10)
        passengerSurvivedGroup.append("text").text((passenger.openmlsurvived==1)?"SAVED":"LOST").attr("text-anchor", "middle").attr("x", 0).attr("y", 0).style("font-size", "20px").style("font-weight", "normal").attr("fill", (passenger.openmlsurvived==1)?"white":"white").style("font-family", "'Roboto', sans-serif")
        
        // PASSENGER PORTRAIT WIDGET
        let passengerPortraitGroup = passengerSecondColumn.append("g").attr("id", "passengerPortraitGroup").attr("transform", `translate(40,55) scale(0.8)`)
        passengerPortraitGroup.append("clipPath").attr("id", "portraitClip").append("ellipse").attr("cx", 40).attr("cy", 60).attr("rx", 40).attr("ry", 60)
        passengerPortraitGroup.append("ellipse").attr("cx", 40).attr("cy", 60).attr("rx", 40).attr("ry", 60).attr("fill", "grey").attr("stroke", "black").style("stroke-width", 1).style("opacity", 0.5)
        passengerPortraitGroup.append("ellipse").attr("cx", 40).attr("cy", 60).attr("rx", 42).attr("ry", 62).attr("fill", "none").attr("stroke", "black").style("stroke-width", 1).style("opacity", 0.5)
        passengerPortraitGroup.append("image").attr("class", "portraitImage").attr("x", 0).attr("y", 0).attr("width", 80).attr("height", 120).style("opacity", 0.6).style("filter", "blur(1px)").attr("clip-path", "url(#portraitClip)")
                .attr("xlink:href", ()=>(passenger.imagePresent=="Y")?"https://www.encyclopedia-titanica.org"+passenger.imageURL:"./src/blank.jpg")
        
        // PASSENGER FAMILY WIDGET
        let passengerFamilyGroup = passengerSecondColumn.append("g").attr("id", "passengerFamilyGroup").attr("transform", `translate(72,170)`)
        passengerFamilyGroup.append("text").text("Family Aboard: "+passenger.derivedFamily).attr("x", 0).attr("y", 0).style("font-size", "10px").attr("text-anchor", "middle")

        // PASSENGER DESTINATION WIDGET
        let passengerDestGroup = passengerSecondColumn.append("g").attr("id", "passengerDestGroup").attr("transform", `translate(5,195)`)
        const passengerDestWidth = 130
        passengerDestGroup.append("text").text("Destination").attr("x", 0).attr("y", 0).style("font-size", "16px")
        passengerDestGroup.append("rect").attr("x", 0).attr("y", 4).attr("width", passengerDestWidth).attr("height", 20).attr("fill", "grey")

        passengerDestGroupTextGroup = passengerDestGroup.append("g").attr("id", "passengerDestGroupTextGroup").attr("transform", `translate(65,20)`)
        passengerDestination = passengerDestGroupTextGroup.append("text").attr("id", "passengerDestination").attr("x", 0).attr("y", 0).attr("text-anchor", "middle").text(passenger.kDestination).style("font-size", "16px").attr("fill", "white").style("font-family", "'Castoro', serif")
        
        const computedTextLengthDestination = (d3.select("#passengerDestination")._groups[0][0].getComputedTextLength())

        if (computedTextLengthDestination > 0.95 * passengerDestWidth) {
            const passengerDestRequiredWidth = 0.95*passengerDestWidth/computedTextLengthDestination
            passengerDestGroupTextGroup.attr("transform", `translate(65,20) scale(${passengerDestRequiredWidth},1) `)
        }
        
                
        // PASSENGER TICKET WIDGET
        let passengerTicketGroup = passengerFirstColumn.append("g").attr("id", "passengerTicketGroup").attr("transform", "translate(0,250)")
        const ticketBoxHeight = 80
        const ticketBoxWidth = 144
        passengerTicketGroup.append("text").text("Fare details").attr("x", 0).attr("y", -6).style("font-size", "12px")
        passengerTicketGroup.append("rect").attr("x", 0).attr("y", 1).attr("width", ticketBoxWidth).attr("height", ticketBoxHeight).attr("id", "ticketBox").attr("fill", "white").style("opacity", .5)
        passengerTicketGroup.append("rect").attr("x", 1).attr("y", 2).attr("width", ticketBoxWidth-2).attr("height", ticketBoxHeight-2).attr("id", "ticketBox").attr("fill", "none").style("opacity", .5).attr("stroke", "black").attr("stroke-width", 0.5)
        passengerTicketGroup.append("rect").attr("x", 2).attr("y", 3).attr("width", ticketBoxWidth-4).attr("height", ticketBoxHeight-4).attr("id", "ticketBox").attr("fill", "none").style("opacity", .5).attr("stroke", "black").attr("stroke-width", 0.5)
        passengerTicketGroup.append("path").attr("id", "ticketFlag").attr("d", whiteStarFlagPath).attr("fill", "red").style("opacity", .5)
            .attr("transform", `translate(${15},${30}) scale(2.3)`)
        passengerTicketGroup.append("path").attr("id", "ticketStar").attr("d", starPath).attr("fill", "white").style("opacity", 1)
            .attr("transform", `translate(${20},${15}) scale(0.18) rotate(-5)`)
        passengerTicketGroup.append("text").attr("x", 8).attr("y", 44).attr("text-anchor", "start").text("Tkt: " + passenger.openmlticket).style("font-size", ()=>(passenger.openmlticket.length>13?"10px":"10px")).attr("fill", "black").style("opacity", 1).attr("font-style", "normal").style("font-family", "'Roboto Mono', monospace")
        passengerTicketGroup.append("text").attr("x", 8).attr("y", 53).attr("text-anchor", "start").text("Fare: " + formatFare(passenger.openmlfare)).style("font-size", "10px").attr("fill", "black").style("opacity", 1).attr("font-style", "normal").style("font-family", "'Roboto Mono', monospace")
        passengerTicketGroup.append("text").attr("x", 8).attr("y", 62).attr("text-anchor", "start").text("Cabin: " + (passenger.openmlcabin=="?"?"Unknown":passenger.openmlcabin)).style("font-size", ()=>(passenger.openmlcabin.length>12?"10px":"10px")).attr("fill", "black").style("opacity", 1).attr("font-style", "normal").style("font-family", "'Roboto Mono', monospace")
    
        // PASSENGER LIFEBOAT WIDGET
        let passengerLifeboatGroup = passengerSecondColumn.append("g").attr("id", "passengerLifeboatGroup").attr("transform", "translate(5,250)")
        passengerLifeboatGroup.append("text").text("Lifeboat boarded").attr("x", 0).attr("y", -6).style("font-size", "12px")
        passengerLifeboatGroup.append("rect").attr("x", 0).attr("y", 3).attr("width", ticketBoxWidth-3).attr("height", ticketBoxHeight-4).attr("fill", "none").attr("stroke", "grey")
        const lifeboatRadius = 7
        lifeboatsMain = passengerLifeboatGroup.append("g").attr("id", "lifeboatsMain").attr("transform", "translate(0,10)")
        const lifeboatSpaceY = 15
        lifeboatsMain
            .selectAll("circle").data(lifeboatData).enter().append("circle")
            .attr("cx", (d,i)=>(130-(Math.floor((i%16)/2)*2*lifeboatRadius)-((i>7&&i<16)?20:0)))
            .attr("cy", (d,i)=>(i < 16 ? (i%2?8:8+lifeboatSpaceY*3) : (i%2?8+lifeboatSpaceY:8+lifeboatSpaceY*2) ))
            .attr("r", lifeboatRadius)
            .attr("fill", d=>(d.boat==passenger.processedLifeboat?"red":"grey"))
            .attr("opacity", d=>(d.boat==passenger.processedLifeboat?1:0.5))

        let lifeboatLine1Text = ""
        let lifeboatLine2Text = ""
        let lifeboatLine3Text = ""

        if (passenger.processedLifeboat.length == 0 ) { lifeboatLine2Text = "Did not board"}
        else if (passenger.processedLifeboat == "?") { lifeboatLine2Text = "Unknown"}
        else { lifeboatLine1Text = ((passenger.processedLifeboat.match("[ABCD]")===null)?"Lifeboat No. ":"Collapsible ")+passenger.processedLifeboat
               lifeboatLine2Text = "Launch: " + lifeboatData.find(item => item.boat == passenger.processedLifeboat).launched
               lifeboatLine3Text = "Aboard: " + lifeboatData.find(item => item.boat == passenger.processedLifeboat).wikiSurvivors + " souls"
        }

        lifeboatLine1 = lifeboatsMain.append("text").attr("x", 4).attr("y", 25).attr("text-anchor", "start").text(lifeboatLine1Text).style("font-size", "10px").attr("fill", "black").style("opacity", 1).attr("font-style", "normal").style("font-family", "'Roboto Mono', monospace")
        lifeboatLine2 = lifeboatsMain.append("text").attr("x", 4).attr("y", 34).attr("text-anchor", "start").text(lifeboatLine2Text).style("font-size", "10px").attr("fill", "black").style("opacity", 1).attr("font-style", "normal").style("font-family", "'Roboto Mono', monospace")
        lifeboatLine3 = lifeboatsMain.append("text").attr("x", 4).attr("y", 43).attr("text-anchor", "start").text(lifeboatLine3Text).style("font-size", "10px").attr("fill", "black").style("opacity", 1).attr("font-style", "normal").style("font-family", "'Roboto Mono', monospace")
        
        return
    }

    }
)
