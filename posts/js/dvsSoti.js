
window.onresize = () => location.reload()

const dropDownVariableNames =
    ["None",
    'YearsDataVisExp',
    'YearsWorkExp',
    'Pay',
    // 'PayCcy',
    'Location',
    'Education',
    'Gender',
    'DVSMembership'
    ]

const currencyData = 
    [
        {currency: 'ARS', country: 'Argentina', long: -58.38, lat: -34.6, ccyname: 'Argentina Peso'},
        {currency: 'AUD', country: 'Australia', long: 149.13, lat: -35.28, ccyname: 'Australia Dollar'},
        {currency: 'BAM', country: 'Bosnia and Herzegovina', long: 17.97, lat: 43.92, ccyname: 'Bosnia and Herzegovina Convertible Mark'},
        {currency: 'BDT', country: 'Bangladesh', long: 90.42, lat: 23.72, ccyname: 'Bangladesh Taka'},
        {currency: 'BRL', country: 'Brazil', long: -49.26, lat: -15.78, ccyname: 'Brazil Real'},
        {currency: 'BYN', country: 'Belarus', long: 27.57, lat: 53.95, ccyname: 'Belarus Ruble'},
        {currency: 'CAD', country: 'Canada', long: -79.42, lat: 45.42, ccyname: 'Canada Dollar'},
        {currency: 'CHF', country: 'Switzerland', long: 8.58, lat: 47.17, ccyname: 'Switzerland Franc'},
        {currency: 'CLP', country: 'Chile', long: -70.67, lat: -33.5, ccyname: 'Chile Peso'},
        {currency: 'CNY', country: 'China', long: 116.4, lat: 39.91, ccyname: 'China Yuan Renminbi'},
        {currency: 'COP', country: 'Colombia', long: -74.08, lat: 4.58, ccyname: 'Colombia Peso'},
        {currency: 'CZK', country: 'Czech Republic', long: 15.47, lat: 50.08, ccyname: 'Czech Republic Koruna'},
        {currency: 'DKK', country: 'Denmark', long: 9.5, lat: 55.67, ccyname: 'Denmark Krone'},
        {currency: 'ETB', country: 'Ethiopia', long: 38.75, lat: 9.08, ccyname: 'Ethiopia Birr'},
        {currency: 'EUR', country: 'European Union', long: 13.42, lat: 47.17, ccyname: 'Euro Member Countries'},
        {currency: 'GBP', country: 'United Kingdom', long: -0.13, lat: 51.5, ccyname: 'United Kingdom Pound'},
        {currency: 'GHS', country: 'Ghana', long: -2.08, lat: 5.58, ccyname: 'Ghana Cedi'},
        {currency: 'HKD', country: 'Hong Kong', long: 114.17, lat: 22.25, ccyname: 'Hong Kong Dollar'},
        {currency: 'HRK', country: 'Croatia', long: 15.92, lat: 45.83, ccyname: 'Croatia Kuna'},
        {currency: 'HUF', country: 'Hungary', long: 19.08, lat: 47.17, ccyname: 'Hungary Forint'},
        {currency: 'IDR', country: 'Indonesia', long: 115.21, lat: -6.17, ccyname: 'Indonesia Rupiah'},
        {currency: 'ILS', country: 'Israel', long: 34.83, lat: 31.5, ccyname: 'Israel Shekel'},
        {currency: 'INR', country: 'India', long: 77.22, lat: 28.67, ccyname: 'India Rupee'},
        {currency: 'JPY', country: 'Japan', long: 139.69, lat: 35.69, ccyname: 'Japan Yen'},
        {currency: 'KES', country: 'Kenya', long: 34.83, lat: -1.25, ccyname: 'Kenya Shilling'},
        {currency: 'KRW', country: 'South Korea', long: 127.08, lat: 37.5, ccyname: 'Korea (South) Won'},
        {currency: 'KZT', country: 'Kazakhstan', long: 66.92, lat: 48.67, ccyname: 'Kazakhstan Tenge'},
        {currency: 'LKR', country: 'Sri Lanka', long: 80.75, lat: 6.92, ccyname: 'Sri Lanka Rupee'},
        {currency: 'MNT', country: 'Mongolia', long: 106.92, lat: 47.92, ccyname: 'Mongolia Tughrik'},
        {currency: 'MUR', country: 'Mauritius', long: 57.55, lat: -20.35, ccyname: 'Mauritius Rupee'},
        {currency: 'MXN', country: 'Mexico', long: -99.17, lat: 19.44, ccyname: 'Mexico Peso'},
        {currency: 'MYR', country: 'Malaysia', long: 101.75, lat: 2.5, ccyname: 'Malaysia Ringgit'},
        {currency: 'NGN', country: 'Nigeria', long: 7.5, lat: 9.08, ccyname: 'Nigeria Naira'},
        {currency: 'NOK', country: 'Norway', long: 10.75, lat: 60.33, ccyname: 'Norway Krone'},
        {currency: 'NPR', country: 'Nepal', long: 85.31, lat: 27.72, ccyname: 'Nepal Rupee'},
        {currency: 'NZD', country: 'New Zealand', long: 174.75, lat: -41.25, ccyname: 'New Zealand Dollar'},
        {currency: 'PEN', country: 'Peru', long: -75, lat: -10, ccyname: 'Peru Sol'},
        {currency: 'PHP', country: 'Philippines', long: 122.5, lat: 15, ccyname: 'Philippines Peso'},
        {currency: 'PKR', country: 'Pakistan', long: 73.08, lat: 30.31, ccyname: 'Pakistan Rupee'},
        {currency: 'PLN', country: 'Poland', long: 21, lat: 52, ccyname: 'Poland Zloty'},
        {currency: 'RON', country: 'Romania', long: 25.67, lat: 45, ccyname: 'Romania Leu'},
        {currency: 'RUB', country: 'Russia', long: 37.62, lat: 55.75, ccyname: 'Russia Ruble'},
        {currency: 'SAR', country: 'Saudi Arabia', long: 44.67, lat: 24.67, ccyname: 'Saudi Arabia Riyal'},
        {currency: 'SEK', country: 'Sweden', long: 18, lat: 60.17, ccyname: 'Sweden Krona'},
        {currency: 'SGD', country: 'Singapore', long: 103.83, lat: 1.33, ccyname: 'Singapore Dollar'},
        {currency: 'THB', country: 'Thailand', long: 100.5, lat: 15, ccyname: 'Thailand Baht'},
        {currency: 'TZS', country: 'Tanzania', long: 39.17, lat: -6.33, ccyname: 'Tanzania Shilling'},
        {currency: 'UGX', country: 'Uganda', long: 32.25, lat: 0.33, ccyname: 'Uganda Shilling'},
        {currency: 'USD', country: 'United States', long: -96.83, lat: 37, ccyname: 'United States Dollar'},
        {currency: 'ZAR', country: 'South Africa', long: 27.83, lat: -25.67, ccyname: 'South Africa Rand'},
        {currency: 'Unknown', country: 'Unknown', long: 0, lat: 0, ccyname: 'Unknown'}
        ]

const countryData = [{fullname: "Argentina",shortCode: "ARG",lat: -38,long: -70},
    {fullname: "Australia",shortCode: "AUS",lat: -28,long: 95},
    {fullname: "Austria",shortCode: "AUT",lat: 39,long: 53},
    {fullname: "Bangladesh",shortCode: "BGD",lat: 7,long: 102},
    {fullname: "Belarus",shortCode: "BLR",lat: 54.6,long: 95},
    {fullname: "Belgium",shortCode: "BEL",lat: 54,long: 8},
    {fullname: "Bosnia and Herzegovina",shortCode: "BIH",lat: 20,long: 60},
    {fullname: "Brazil",shortCode: "BRA",lat: -25,long: -80},
    {fullname: "Bulgaria",shortCode: "BGR",lat: 25,long: 65},
    {fullname: "Canada",shortCode: "CAN",lat: 55.75583,long: -97.00278},
    {fullname: "Chile",shortCode: "CHL",lat: -30,long: -95},
    {fullname: "China",shortCode: "CHN",lat: 35.86139,long: 124},
    {fullname: "Colombia",shortCode: "COL",lat: -15,long: -75},
    {fullname: "Croatia",shortCode: "CRO",lat: 25,long: 58},
    {fullname: "Czech Republic (Czechia)",shortCode: "CZE",lat: 39,long: 35},
    {fullname: "Denmark",shortCode: "DNK",lat: 59,long: 17},
    {fullname: "Ecuador",shortCode: "ECU",lat: -20,long: -80},
    {fullname: "Estonia",shortCode: "EST",lat: 63,long: 85},
    {fullname: "Ethiopia",shortCode: "ETH",lat: 0,long: 39},
    {fullname: "Finland",shortCode: "FIN",lat: 63,long: 27},
    {fullname: "France",shortCode: "FRA",lat: 30,long: -10},
    {fullname: "Germany",shortCode: "DEU",lat: 35,long: 13.07806},
    {fullname: "Ghana",shortCode: "GHA",lat: -2,long: 5},
    {fullname: "Greece",shortCode: "GRC",lat: 15,long: 40},
    {fullname: "Hungary",shortCode: "HUN",lat: 39,long: 78},
    {fullname: "India",shortCode: "IND",lat: 15,long: 90},
    {fullname: "Indonesia",shortCode: "IDN",lat: -15,long: 140},
    {fullname: "Iran",shortCode: "IRN",lat: 10,long: 75},
    {fullname: "Ireland",shortCode: "IRL",lat: 59,long: -8.61750},
    {fullname: "Israel",shortCode: "ISR",lat: 10,long: 55},
    {fullname: "Italy",shortCode: "ITA",lat: 25,long: 5},
    {fullname: "Japan",shortCode: "JPN",lat: 35.68950,long: 160},
    {fullname: "Kazakhstan",shortCode: "KAZ",lat: 50,long: 110},
    {fullname: "Kenya",shortCode: "KEN",lat: -12,long: 37},
    {fullname: "Latvia",shortCode: "LVA",lat: 59,long: 85},
    {fullname: "Libya",shortCode: "LBY",lat: 5,long: 20},
    {fullname: "Lithuania",shortCode: "LIT",lat: 54.6,long: 85},
    {fullname: "Madagascar",shortCode: "MAD",lat: -19,long: 50},
    {fullname: "Malaysia",shortCode: "MYS",lat: -5,long: 115},
    {fullname: "Malta",shortCode: "MLT",lat: 10,long: 14.38889},
    {fullname: "Mauritius",shortCode: "MUS",lat: -21,long: 60},
    {fullname: "Mexico",shortCode: "MEX",lat: -10,long: -97},
    {fullname: "Mongolia",shortCode: "MNG",lat: 45,long: 125},
    {fullname: "Montenegro",shortCode: "MNE",lat: 20,long: 73},
    {fullname: "Nepal",shortCode: "NPL",lat: 22,long: 105},
    {fullname: "Netherlands",shortCode: "NLD",lat: 54,long: 23},
    {fullname: "New Zealand",shortCode: "NZL",lat: -40,long: 130},
    {fullname: "Nigeria",shortCode: "NGA",lat: -2,long: 14},
    {fullname: "Norway",shortCode: "NOR",lat: 63,long: 0},
    {fullname: "Pakistan",shortCode: "PAK",lat: 22,long: 85},
    {fullname: "Panama",shortCode: "PAN",lat: -15,long: -85},
    {fullname: "Peru",shortCode: "PER",lat: -20,long: -97},
    {fullname: "Philippines",shortCode: "PHL",lat: 0,long: 130},
    {fullname: "Poland",shortCode: "POL",lat: 45,long: 75},
    {fullname: "Portugal",shortCode: "PRT",lat: 15,long: -8},
    {fullname: "Romania",shortCode: "ROM",lat: 30,long: 78},
    {fullname: "Russia",shortCode: "RUS",lat: 55,long: 110},
    {fullname: "Saudi Arabia",shortCode: "SAU",lat: 5,long: 65},
    {fullname: "Serbia",shortCode: "SRB",lat: 20,long: 67},
    {fullname: "Singapore",shortCode: "SGP",lat: -11,long: 115},
    {fullname: "Slovakia",shortCode: "SVK",lat: 39,long: 45},
    {fullname: "Slovenia",shortCode: "SLO",lat: 30,long: 66},
    {fullname: "South Africa",shortCode: "ZAF",lat: -27,long: 35},
    {fullname: "South Korea",shortCode: "KOR",lat: 37,long: 142},
    {fullname: "Spain",shortCode: "ESP",lat: 20,long: -4},
    {fullname: "Sri Lanka",shortCode: "LKA",lat: 7,long: 90},
    {fullname: "Sweden",shortCode: "SWE",lat: 63,long: 58},
    {fullname: "Switzerland",shortCode: "CHE",lat: 39,long: 0},
    {fullname: "Taiwan",shortCode: "TWN",lat: 25,long: 141},
    {fullname: "Tanzania",shortCode: "TZA",lat: -18,long: 40},
    {fullname: "Thailand",shortCode: "THA",lat: 5,long: 115},
    {fullname: "Turkey",shortCode: "TUR",lat: 15,long: 55},
    {fullname: "Uganda",shortCode: "UGA",lat: -6,long: 33},
    {fullname: "Ukraine",shortCode: "UKR",lat: 49.00000,long: 95},
    {fullname: "United Kingdom",shortCode: "GBR",lat: 50,long: -10},
    {fullname: "United States",shortCode: "USA",lat: 45,long: -97},
    {fullname: "Uruguay",shortCode: "URY",lat: -33.00000,long: -56.00000},
    {fullname: "Unknown",shortCode: "Unknown",lat: -38.00000,long: 0}
    ]
    


const colorVariableNames = ["Random","Gender", "Education", "DVSMembership"]

const dvsColors = ["#ddb32b", "#a05e9c", "#2db2a5"]

let dropDown1 = d3.select("#dropdown_1")
let options1 = dropDown1.selectAll("option").data(dropDownVariableNames).enter().append("option")
options1.text(d => d).attr("value", d => d)

let dropDown2 = d3.select("#dropdown_2")
let options2 = dropDown2.selectAll("option").data(dropDownVariableNames).enter().append("option")
options2.text(d => d).attr("value", d => d)

let dropDown3 = d3.select("#dropdown_3")
let options3 = dropDown3.selectAll("option").data(colorVariableNames).enter().append("option")
options3.text(d => d).attr("value", d => d)

const formatNumber = d3.format(",d")
const formatSmallNumber = d3.format(".1n")

const width = 1800
const height = 800
const scaleFactor = (Math.min(2200, window.innerWidth-50) / width)
const yTranslateMe = (scaleFactor*height - height) / 2
const xTranslateMe = (scaleFactor*width - width) / 2

const palette0 = ["#A6CEE3","#1F78B4","#B2DF8A","#33A02C","#FB9A99","#E31A1C","#FDBB86","#FF7F00","#CAB2D6","#6A3D9A","#FFFF99","#B15928","#F48024","#24F480","#8024F4","#2480F4"]
const palette1 = ["#0000FF", "#00BFFF", "#40E0D0", "#87CEFA", "#B2DF8A", "#D2B48C", "#FCC09E", "#FFA07A", "#FF69B4", "#FF00FF", "#F48024", "#FFFF00", "#FFFFC0", "#FAFAD2", "#F5DEB3", "#F0E68C"]
const palette2 = ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5"]
const palette3 = ["#000000", "#FFFFFF", "#999999", "#666666", "#333333", "#000088", "#0000CC", "#0000FF", "#008800", "#00CC00", "#00FF00", "#880000", "#CC0000", "#FF0000", "#880088", "#CC00CC"]
const color = d3.scaleOrdinal(palette2)

const silhouette = "M0,0 L0,25 A25,25 0 0 1 25,50 L75,50 A25,25 0 0 1 100,25 L100,0 Z M25,50 A12.5,12.5 0 0 1 37.5,62.5 L62.5,62.5 A12.5,12.5 0 0 1 75,50 Z"
const circlepath = "M 0,0 A 50,50 0 0 1 0,50 A 50,50 0 0 1 0,0 Z"
const underlinepath = "M 19 2 C 2 -1 -8 2 -7 4 C -5 7 -6 0 16 3 Z"


const svg = d3.select("body").append("svg").attr("width", width).attr("height", height)
svg.append("rect").attr("x", 0).attr("y", 0).attr("width", width).attr("height", height).attr("fill", "none").attr("stroke", "grey").attr("stroke-width", 2)
svg.attr("transform", `translate(${xTranslateMe}, ${yTranslateMe}) scale(${scaleFactor})`)

let globalSurveyData

function go() {
    d3.csv("./data/data2022munged.csv").then(data => {
        globalSurveyData = data        
        
        const transitionDuration = 2500

        const responsesGroup = svg.append("g").attr("id", "responses")
        
        const sidebarWidth = 400
        const sidebarHeight = 500
        const sidebarMargin = 20
        const sidebar = svg.append("g").attr("id", "sidebar").style("opacity", 0).attr("transform", `translate(${width - sidebarMargin - sidebarWidth}, ${sidebarMargin})`)
        sidebar.append("rect").attr("x", 0).attr("y", 0).attr("width", sidebarWidth).attr("height", sidebarHeight).attr("fill", "none").attr("stroke", "grey").attr("stroke-width", 1)
        
        const mainChartAreaWidth = width - sidebarMargin - sidebarWidth - sidebarMargin - sidebarMargin
        const mainChartAreaHeight = height - sidebarMargin - sidebarMargin
        const mainChartArea = svg.append("g").attr("id", "mainChartArea").style("opacity", 1).attr("transform", `translate(${sidebarMargin}, ${sidebarMargin})`)
        mainChartArea.append("rect").attr("x", 0).attr("y", 0).attr("width", mainChartAreaWidth).attr("height", mainChartAreaHeight).attr("fill", "none").attr("stroke", "grey").attr("stroke-width", 1)
        
        const geoScaleXCcy = d3.scaleLinear().domain([-100, 180]).range([20, mainChartAreaWidth])
        const geoScaleYCcy = d3.scaleLinear().domain([-50, 70]).range([mainChartAreaHeight, 0])

        const keyWidth = 400
        const keyHeight = 240
        const keyArea = svg.append("g").attr("id", "key").style("opacity", 1).attr("transform", `translate(${width - sidebarMargin - keyWidth}, ${sidebarMargin + sidebarHeight + sidebarMargin})`)
        keyArea.append("rect").attr("x", 0).attr("y", 0).attr("width", keyWidth).attr("height", keyHeight).attr("fill", "none").attr("stroke", "grey").attr("stroke-width", 1)

        const chartPadding = 0.2
        const chartYAxisStart = 20
        const chartYDataStart = 30

        const initialResponseSize = 22
        const initialNumWide = 55

        let selectedVariable1current = d3.select("#dropdown_1").node().value
        let selectedVariable2current = d3.select("#dropdown_2").node().value
        let selectedVariable3current = d3.select("#dropdown_3").node().value

        let selectedVariable1previous = selectedVariable1current
        let selectedVariable2previous = selectedVariable2current
        let selectedVariable3previous = selectedVariable3current


        const responses = responsesGroup.selectAll("rect").data(globalSurveyData).enter().append("rect")
                .attr("x", (d,i)=>60+(i%initialNumWide)*(initialResponseSize+1))
                .attr("y", (d,i)=>-100-i)
                .attr("width", initialResponseSize)
                .attr("height", initialResponseSize)
                .attr("fill", ()=>dvsColors[Math.floor(Math.random()*3)]).attr("opacity", 1)
        
        resetResponsePositions()
        
        
        responses.on("mouseover", function(e, d) {
            sidebar.style("opacity", 1)
            sidebar.selectAll("g").remove()
            populateSidebar(d)
           
        })

        responses.on("mouseout", ()=> sidebar.style("opacity", 1))

        renderKey("Random", ["Just", "Random", "Colors"], dvsColors)

        d3.select("#dropdown_1").on("change", updateData)
        d3.select("#dropdown_2").on("change", updateData)
        d3.select("#dropdown_3").on("change", updateData)


        function populateSidebar(d) {
            

            // Header contains name, underscore swoosh, country

            const header = sidebar.append("g").attr("id", "header").attr("transform", `translate(20, 50)`)
            header.append("text").text(d.DataVizRole).attr("font-size", 40).attr("font-weight", "bold").attr("fill", "grey")
            const icon = header.append("g").attr("id", "icon").attr("transform", `scale(7) translate(7, 1)`)
            icon.append("path").attr("d", underlinepath).attr("fill", "grey").attr("stroke", "none").attr("stroke-width", 0)
            if (d.Loc1Country != "[^not answered]" && d.Loc1Country != "[\\unfinished]") {
                header.append("text").text(d.Loc1Country).attr("font-size", 20).attr("font-weight", "bold").attr("fill", "grey").attr("transform", `translate(25, 50)`)
            }
            header.append("text").text(". . . RESPONDENT PROFILE . . .").attr("font-size", 12).attr("font-weight", "bold").attr("fill", "green").attr("transform", `translate(0, -37)`).style("font-family", "fixed-width")

            // Work style indicators device

            const workPrefGroup = sidebar.append("g").attr("id", "workPrefGroup").attr("transform", `translate(250, 30)`)
            workPrefGroup.append("text").text("Work style").attr("font-size", 16).attr("font-weight", "bold").attr("fill", "grey")
            workPrefGroup.append("text").text("Actual").attr("font-size", 10).attr("font-weight", "bold").attr("fill", "red").attr("transform", `translate(90, -8)`)
            workPrefGroup.append("text").text("Preferred").attr("font-size", 10).attr("font-weight", "bold").attr("fill", "blue").attr("transform", `translate(90, 1)`)

            const workIndicators = workPrefGroup.append("g").attr("id", "workIndicators").attr("transform", `translate(0, 5)`)
            workIndicators.append("rect").attr("x", 0).attr("y", 0).attr("width", 67.5).attr("height", 29.5).attr("fill", "grey").style("opacity", 0.1)
            workIndicators.append("text").text("Remote").attr("font-size", 14).attr("fill", "black").attr("transform", `translate(${67.5/2}, ${29.5/2})`).attr("text-anchor", "middle").attr("alignment-baseline", "middle").attr("font-weight", "bold")
                .style("opacity", ()=>(d.WorkSitu=="Remote"||d.WorkSituPref=="Remote")?1:0.1)
            workIndicators.append("rect").attr("x", 13).attr("y", 23).attr("width", 20).attr("height", 4).attr("fill", "red").style("opacity", ()=>(d.WorkSitu=="Remote")?1:0)
            workIndicators.append("rect").attr("x", 36).attr("y", 23).attr("width", 20).attr("height", 4).attr("fill", "blue").style("opacity", ()=>(d.WorkSituPref=="Remote")?1:0)

            workIndicators.append("rect").attr("x", 68.5).attr("y", 0).attr("width", 67.5).attr("height", 29.5).attr("fill", "grey").style("opacity", 0.1)
            workIndicators.append("text").text("Hybrid").attr("font-size", 14).attr("fill", "black").attr("transform", `translate(${68.5+67.5/2}, ${29.5/2})`).attr("text-anchor", "middle").attr("alignment-baseline", "middle").attr("font-weight", "bold")
                .style("opacity", ()=>(d.WorkSitu=="Hybrid"||d.WorkSituPref=="Hybrid")?1:0.1)
            workIndicators.append("rect").attr("x", 81.5).attr("y", 23).attr("width", 20).attr("height", 4).attr("fill", "red").style("opacity", ()=>(d.WorkSitu=="Hybrid")?1:0)
            workIndicators.append("rect").attr("x", 104.5).attr("y", 23).attr("width", 20).attr("height", 4).attr("fill", "blue").style("opacity", ()=>(d.WorkSituPref=="Hybrid")?1:0)

            workIndicators.append("rect").attr("x", 0).attr("y", 30.5).attr("width", 67.5).attr("height", 29.5).attr("fill", "grey").style("opacity", 0.1)
            workIndicators.append("text").text("On site").attr("font-size", 14).attr("fill", "black").attr("transform", `translate(${67.5/2}, ${30.5+29.5/2})`).attr("text-anchor", "middle").attr("alignment-baseline", "middle").attr("font-weight", "bold")
                .style("opacity", ()=>(d.WorkSitu=="On site"||d.WorkSituPref=="On site")?1:0.1)
            workIndicators.append("rect").attr("x", 13).attr("y", 53.5).attr("width", 20).attr("height", 4).attr("fill", "red").style("opacity", ()=>(d.WorkSitu=="On site")?1:0)
            workIndicators.append("rect").attr("x", 36).attr("y", 53.5).attr("width", 20).attr("height", 4).attr("fill", "blue").style("opacity", ()=>(d.WorkSituPref=="On site")?1:0)

            workIndicators.append("rect").attr("x", 68.5).attr("y", 30.5).attr("width", 67.5).attr("height", 29.5).attr("fill", "grey").style("opacity", 0.1)
            workIndicators.append("text").text("Other").attr("font-size", 14).attr("fill", "black").attr("transform", `translate(${68.5+67.5/2}, ${30.5+29.5/2})`).attr("text-anchor", "middle").attr("alignment-baseline", "middle").attr("font-weight", "bold")
                .style("opacity", ()=>(d.WorkSitu=="Other"||d.WorkSituPref=="Other")?1:0.1)
            workIndicators.append("rect").attr("x", 81.5).attr("y", 53.5).attr("width", 20).attr("height", 4).attr("fill", "red").style("opacity", ()=>(d.WorkSitu=="Other")?1:0)
            workIndicators.append("rect").attr("x", 104.5).attr("y", 53.5).attr("width", 20).attr("height", 4).attr("fill", "blue").style("opacity", ()=>(d.WorkSituPref=="Other")?1:0)
            

            // Num years DV Experience Donut

            let numYearsDVExp = +d.ydveDial
            const numYearsDVExpDonut = sidebar.append("g").attr("id", "numYearsDVExpDonut").attr("transform", `translate(80, 170)`)
            numYearsDVExpDonut.append("text").attr("x", 0).attr("y", -15).style("font-size", 24).attr("fill", "grey").attr("text-anchor", "middle").attr("alignment-baseline", "middle").attr("font-weight", "bold")
                .text(()=>(numYearsDVExp==32) ? "?" : 
                          (numYearsDVExp==0) ? "<1" :
                          (numYearsDVExp==31) ? ">30" : numYearsDVExp)

            numYearsDVExpDonut.append("text").attr("x", 0).attr("y", 0).text("Years'").style("font-size", 10).attr("fill", "grey").attr("text-anchor", "middle").attr("alignment-baseline", "middle").attr("font-weight", "bold")
            numYearsDVExpDonut.append("path").attr("d", d3.arc().innerRadius(30).outerRadius(50).startAngle(0).endAngle(Math.PI)).attr("fill", "#aaaaaa").style("opacity", 1).attr("transform", `rotate(-90)`)
            if (numYearsDVExp!=32) {numYearsDVExpDonut.append("path").attr("d", d3.arc().innerRadius(30).outerRadius(50).startAngle(0).endAngle(Math.PI*numYearsDVExp/31)).attr("fill", "orange").style("opacity", 1).attr("transform", `rotate(-90)`)}
            numYearsDVExpDonut.append("text").attr("x", 0).attr("y", 10).text("Data Viz Experience").style("font-size", 10).attr("fill", "grey").attr("text-anchor", "middle").attr("alignment-baseline", "middle").attr("font-weight", "bold")

            let numYearsWkExp = +d.yweDial
            const numYearsWkExpDonut = sidebar.append("g").attr("id", "numYearsDVExpDonut").attr("transform", `translate(200, 170)`)
            numYearsWkExpDonut.append("text").attr("x", 0).attr("y", -15).style("font-size", 24).attr("fill", "grey").attr("text-anchor", "middle").attr("alignment-baseline", "middle").attr("font-weight", "bold")
                .text(()=>(numYearsWkExp==32) ? "?" : 
                          (numYearsWkExp==0) ? "<1" :
                          (numYearsWkExp==31) ? ">30" : numYearsWkExp)
            numYearsWkExpDonut.append("text").attr("x", 0).attr("y", 0).text("Years'").style("font-size", 10).attr("fill", "grey").attr("text-anchor", "middle").attr("alignment-baseline", "middle").attr("font-weight", "bold")
            numYearsWkExpDonut.append("path").attr("d", d3.arc().innerRadius(30).outerRadius(50).startAngle(0).endAngle(Math.PI)).attr("fill", "#aaaaaa").style("opacity", 1).attr("transform", `rotate(-90)`)
            if (numYearsWkExp!=32) {numYearsWkExpDonut.append("path").attr("d", d3.arc().innerRadius(30).outerRadius(50).startAngle(0).endAngle(Math.PI*numYearsWkExp/31)).attr("fill", "green").style("opacity", 1).attr("transform", `rotate(-90)`)}
            numYearsWkExpDonut.append("text").attr("x", 0).attr("y", 10).text("Work Experience").style("font-size", 10).attr("fill", "grey").attr("text-anchor", "middle").attr("alignment-baseline", "middle").attr("font-weight", "bold")

            let payBand = +d.PayDial
            const payDonut = sidebar.append("g").attr("id", "numYearsDVExpDonut").attr("transform", `translate(320, 170)`)
            payDonut.append("text").attr("x", 0).attr("y", -10).style("font-size", 15).attr("fill", "grey").attr("text-anchor", "middle").attr("alignment-baseline", "middle").attr("font-weight", "bold")
                .text(()=>(payBand==0) ? "?" :
                          (payBand==5) ? ("<$10k") :
                          (payBand==245) ? ("$240k+") : ("$"+payBand+"k"))
            payDonut.append("path").attr("d", d3.arc().innerRadius(30).outerRadius(50).startAngle(0).endAngle(Math.PI)).attr("fill", "#aaaaaa").style("opacity", 1).attr("transform", `rotate(-90)`)
            if (payBand!=0) {payDonut.append("path").attr("d", d3.arc().innerRadius(30).outerRadius(50).startAngle(0).endAngle(Math.PI*payBand/245)).attr("fill", "purple").style("opacity", 1).attr("transform", `rotate(-90)`)}
            payDonut.append("text").attr("x", 0).attr("y", 10).text("~ yearly pay (USD)").style("font-size", 10).attr("fill", "grey").attr("text-anchor", "middle").attr("alignment-baseline", "middle").attr("font-weight", "bold")


            // Quadrant group

            const quadGroup = sidebar.append("g").attr("id", "quadGroup").attr("transform", `translate(20, 200)`)
            // quadGroup.append("rect").attr("x", 0).attr("y", 0).attr("width", 360).attr("height", 160).attr("fill", "none").attr("stroke", "grey").attr("stroke-width", 1)


            let myTools = getTools(d)
            if (myTools.length > 0) {
                const toolsCloud = quadGroup.append("g").attr("id", "toolsCloud").attr("transform", `translate(0, 10)`)
                toolsCloud.append("clipPath").attr("id", "toolsClip").append("rect").attr("x", 0).attr("y", -12).attr("width", 88).attr("height", 160)
                const toolsCloudClipped = toolsCloud.append("g").attr("id", "toolsCloudClipped").attr("clip-path", "url(#toolsClip)")
                toolsCloudClipped.append("text").text("Tools").attr("font-size", 12).attr("font-weight", "bold").attr("fill", "blue")
                const toolsCloudList = toolsCloudClipped.append("g").attr("id", "toolsCloudList")
                toolsCloudList.selectAll("text").data(myTools).enter().append("text").text(d=>d).attr("font-size", 10).attr("fill", "grey")
                    .attr("transform", (d,i)=>`translate(${0}, ${14+i*10})`)
                
            }

            let myCharts = getCharts(d)
            if (myCharts.length > 0) {
                const chartsCloud = quadGroup.append("g").attr("id", "chartsCloud").attr("transform", `translate(90, 10)`)
                chartsCloud.append("clipPath").attr("id", "chartsClip").append("rect").attr("x", 0).attr("y", -12).attr("width", 88).attr("height", 160)
                const chartsCloudClipped = chartsCloud.append("g").attr("id", "chartsCloudClipped").attr("clip-path", "url(#chartsClip)")
                chartsCloudClipped.append("text").text("Charts").attr("font-size", 12).attr("font-weight", "bold").attr("fill", "green")
                const chartsCloudList = chartsCloudClipped.append("g").attr("id", "chartsCloudList")
                chartsCloudList.selectAll("text").data(myCharts).enter().append("text").text(d=>d).attr("font-size", 10).attr("fill", "grey")
                    .attr("transform", (d,i)=>`translate(${0}, ${14+i*10})`)
            }

            let myChannels = getChannels(d)
            if (myChannels.length > 0) {
                const channelsCloud = quadGroup.append("g").attr("id", "channelsCloud").attr("transform", `translate(180, 10)`)
                channelsCloud.append("clipPath").attr("id", "channelsClip").append("rect").attr("x", 0).attr("y", -12).attr("width", 88).attr("height", 160)
                const channelsCloudClipped = channelsCloud.append("g").attr("id", "channelsCloudClipped").attr("clip-path", "url(#channelsClip)")
                channelsCloudClipped.append("text").text("Channels").attr("font-size", 12).attr("font-weight", "bold").attr("fill", "red")
                const channelsCloudList = channelsCloudClipped.append("g").attr("id", "channelsCloudList")
                channelsCloudList.selectAll("text").data(myChannels).enter().append("text").text(d=>d).attr("font-size", 10).attr("fill", "grey")
                    .attr("transform", (d,i)=>`translate(${0}, ${14+i*10})`)
            }

            let myChallenges = getChallenges(d)
            if (myChallenges.length > 0) {
                const challengesCloud = quadGroup.append("g").attr("id", "challengesCloud").attr("transform", `translate(270, 10)`)
                challengesCloud.append("clipPath").attr("id", "challengesClip").append("rect").attr("x", 0).attr("y", -12).attr("width", 88).attr("height", 160)
                const challengesCloudClipped = challengesCloud.append("g").attr("id", "challengesCloudClipped").attr("clip-path", "url(#challengesClip)")
                challengesCloudClipped.append("text").text("Challenges").attr("font-size", 12).attr("font-weight", "bold").attr("fill", "orange")
                const challengesCloudList = challengesCloudClipped.append("g").attr("id", "challengesCloudList")
                challengesCloudList.selectAll("text").data(myChallenges).enter().append("text").text(d=>d).attr("font-size", 10).attr("fill", "grey")
                    .attr("transform", (d,i)=>`translate(${0}, ${14+i*10})`)
            }
            



            // Goto group

            const gotoGroup = sidebar.append("g").attr("id", "gotoGroup").attr("transform", `translate(20, 370)`)
            gotoGroup.append("clipPath").attr("id", "gotoClip").append("rect").attr("x", 0).attr("y", 0).attr("width", 360).attr("height", 40)

            let myGotoPersons = d.DataVizGoTo_Persons__
            let myGotoResources = d.DataVizGoTo_Resources__
            gotoGroup.append("text").text("GO TO").attr("font-size", 12).attr("font-weight", "bold").attr("fill", "DarkBlue").attr("transform", `translate(0, 10)`)
                .style("opacity", ()=>((myGotoPersons != "-" && myGotoPersons != "[^not answered]" && myGotoPersons != "[\\unfinished]")||(myGotoResources != "-" && myGotoResources != "[^not answered]" && myGotoResources != "[\\unfinished]"))?1:0)
            let gotoOffset = 0

            const gotoClipGroup = gotoGroup.append("g").attr("clip-path", "url(#gotoClip)")

            if (myGotoPersons != "-" && myGotoPersons != "[^not answered]" && myGotoPersons != "[\\unfinished]") {
                gotoClipGroup.append("text").text("People: " + myGotoPersons).attr("font-size", 12).attr("font-weight", "normal").attr("fill", "black").attr("transform", `translate(0, 24)`)
                gotoOffset += 14
            }

            if (myGotoResources != "-" && myGotoResources != "[^not answered]" && myGotoResources != "[\\unfinished]") {
                gotoClipGroup.append("text").text("Resources: " + myGotoResources).attr("font-size", 12).attr("font-weight", "normal").attr("fill", "black").attr("transform", `translate(0, ${24+gotoOffset})`)
            }

            // Education device

            const eduGroup = sidebar.append("g").attr("id", "eduGroup").attr("transform", `translate(75, 450)`)
            const highSchoolLabel = eduGroup.append("text").text("High school").attr("x", 0).attr("y", -10).attr("font-size", 15).attr("text-anchor", "middle").attr("alignment-baseline", "middle").attr("font-weight", "bold").attr("transform", `rotate(-10)`)
                    .attr("fill", ()=>(d.Education=="1. High school diploma")?"red":"grey").style("opacity", ()=>(d.Education=="1. High school diploma"?1:0.1))
            const collegeLabel = eduGroup.append("text").text("Some college").attr("x", 0).attr("y", -7).attr("font-size", 15).attr("text-anchor", "middle").attr("alignment-baseline", "middle").attr("font-weight", "bold").attr("transform", `rotate(10)`)
                    .attr("fill", ()=>(d.Education=="2. Some college")?"red":"grey").style("opacity", ()=>(d.Education=="2. Some college"?1:0.1))
            const technicalSchoolLabel = eduGroup.append("text").text("Technical school").attr("x", 0).attr("y", -4).attr("font-size", 15).attr("text-anchor", "middle").attr("alignment-baseline", "middle").attr("font-weight", "bold").attr("transform", `rotate(-15)`)
                    .attr("fill", ()=>(d.Education=="3. Technical school")?"red":"grey").style("opacity", ()=>(d.Education=="3. Technical school"?1:0.1))
            const associateDegreeLabel = eduGroup.append("text").text("Associate degree").attr("x", 0).attr("y", -1).attr("font-size", 15).attr("text-anchor", "middle").attr("alignment-baseline", "middle").attr("font-weight", "bold").attr("transform", `rotate(15)`)
                    .attr("fill", ()=>(d.Education=="4. Associate degree")?"red":"grey").style("opacity", ()=>(d.Education=="4. Associate degree"?1:0.1))
            const bachelorDegreeLabel = eduGroup.append("text").text("Bachelor's degree").attr("x", 0).attr("y", 2).attr("font-size", 15).attr("text-anchor", "middle").attr("alignment-baseline", "middle").attr("font-weight", "bold").attr("transform", `rotate(-5)`)
                    .attr("fill", ()=>(d.Education=="5. Bachelors degree")?"red":"grey").style("opacity", ()=>(d.Education=="5. Bachelors degree"?1:0.1))
            const mastersDegreeLabel = eduGroup.append("text").text("Master's degree").attr("x", 3).attr("y", 9).attr("font-size", 15).attr("text-anchor", "middle").attr("alignment-baseline", "middle").attr("font-weight", "bold").attr("transform", `rotate(5)`)
                    .attr("fill", ()=>(d.Education=="6. Masters degree")?"red":"grey").style("opacity", ()=>(d.Education=="6. Masters degree"?1:0.1))
            const doctorateLabel = eduGroup.append("text").text("Doctorate").attr("x", 0).attr("y", 12).attr("font-size", 15).attr("text-anchor", "middle").attr("alignment-baseline", "middle").attr("font-weight", "bold").attr("transform", `rotate(-12)`)
                    .attr("fill", ()=>(d.Education=="7. Doctorate")?"red":"grey").style("opacity", ()=>(d.Education=="7. Doctorate"?1:0.1))
            const unknownLabel = eduGroup.append("text").text("Unknown").attr("x", 0).attr("y", 15).attr("font-size", 15).attr("text-anchor", "middle").attr("alignment-baseline", "middle").attr("font-weight", "bold").attr("transform", `rotate(12)`)
                    .attr("fill", ()=>(d.Education=="Unknown")?"grey":"grey").style("opacity", ()=>(d.Education=="Unknown"?0.1:0.1))



            // Gender device

            const genderStroke = 4
            const genderGroup = sidebar.append("g").attr("id", "genderGroup").attr("transform", `translate(155, 420)`)
            genderGroup.append("text").attr("x", 10).attr("y", 40).text("♀").style("stroke-width", genderStroke).attr("font-size", "40px").attr("font-weight", "bold")
                    .attr("stroke", ()=>(d.Gender=="Woman")?"pink":"#cccccc").style("opacity", ()=>(d.Gender=="Woman")?1:0.2)
            genderGroup.append("text").attr("x", 43).attr("y", 43).text("?").style("stroke-width", 1).attr("font-size", "40px").attr("font-weight", "bold")
                    .attr("stroke", ()=>(d.Gender=="Undisclosed")?"black":"#cccccc").style("opacity", ()=>(d.Gender=="Undisclosed")?1:0.2)
            genderGroup.append("text").attr("x", 70).attr("y", 40).text("\u2642").style("stroke-width", genderStroke).attr("font-size", "40px").attr("font-weight", "bold")
                    .attr("stroke", ()=>(d.Gender=="Man")?"blue":"#cccccc").style("opacity", ()=>(d.Gender=="Man")?1:0.2)

            // DVS device

            const dvsGroup = sidebar.append("g").attr("id", "dvsGroup").attr("transform", `translate(280, 425)`)
            dvsGroup.append("text").attr("x", 0).attr("y", 10).text("Member").attr("font-size", "10px").attr("font-weight", "bold").attr("fill", "black")
                .style("opacity", ()=>(d.DVSMembership=="Yes")?1:0)
            dvsGroup.append("text").attr("x", 0).attr("y", 10).text("Non-member / unknown").attr("font-size", "8px").attr("font-weight", "bold").attr("fill", "black")
                .style("opacity", ()=>(d.DVSMembership=="Yes")?0:0.8)
            dvsGroup.append("svg:image").attr("xlink:href", "./src/dvs.png").attr("transform", `scale(0.06) translate(0, 200)`)
                .style("opacity", ()=>(d.DVSMembership=="Yes")?1:0.2)




        }


        function updateData() {
            
            selectedVariable1previous = selectedVariable1current
            selectedVariable2previous = selectedVariable2current
            selectedVariable3previous = selectedVariable3current

            selectedVariable1current = d3.select("#dropdown_1").node().value
            selectedVariable2current = d3.select("#dropdown_2").node().value
            selectedVariable3current = d3.select("#dropdown_3").node().value

            // If user chooses a 'geo' variable, then the other variable must be 'None'

            if (selectedVariable1current!=selectedVariable1previous) {
                if (selectedVariable1current=="PayCcy" || selectedVariable1current=="Location") {
                    selectedVariable2previous="None"
                    selectedVariable2current="None"
                    d3.select("#dropdown_2").node().value="None"
                } else if (selectedVariable2current=="PayCcy" || selectedVariable2current=="Location") {
                    selectedVariable2previous="None"
                    selectedVariable2current="None"
                    d3.select("#dropdown_2").node().value="None"
                }
            } else if (selectedVariable2current!=selectedVariable2previous) {
                if (selectedVariable2current=="PayCcy" || selectedVariable2current=="Location") {
                    selectedVariable1previous="None"
                    selectedVariable1current="None"
                    d3.select("#dropdown_1").node().value="None"
                } else if (selectedVariable1current=="PayCcy" || selectedVariable1current=="Location") {
                    selectedVariable1previous="None"
                    selectedVariable1current="None"
                    d3.select("#dropdown_1").node().value="None"
                }

            }

            rerender()
        }

        function rerender() {

            if (selectedVariable1current!=selectedVariable1previous) {
                if (selectedVariable1current=="None" && selectedVariable2current=="None") {resetResponsePositions()}
                else if (selectedVariable1current=="PayCcy") {setResponsesCcy()}
                else if (selectedVariable1current=="Location") {setResponsesLoc()}
                else if (selectedVariable1current=="None") {xPivot()}
                else if (selectedVariable2current=="None") {yPivot()}
                else {crossPivot()}
            } else if (selectedVariable2current!=selectedVariable2previous) {
                if (selectedVariable1current=="None" && selectedVariable2current=="None") {resetResponsePositions()}
                else if (selectedVariable2current=="PayCcy") {setResponsesCcy()}
                else if (selectedVariable2current=="Location") {setResponsesLoc()}
                else if (selectedVariable1current=="None") {xPivot()}
                else if (selectedVariable2current=="None") {yPivot()}
                else {crossPivot()}
            } else if (selectedVariable3current!=selectedVariable3previous) {setResponsesColors()}
                
        }

        function crossPivot() {
            mainChartArea.selectAll("#yAxis").remove()
            mainChartArea.selectAll("#xAxis").remove()
            mainChartArea.selectAll("#locAxis").remove()
            mainChartArea.selectAll("#ccyAxis").remove()

            let xScaleCross = d3.scaleBand().domain(getUniqueValues(globalSurveyData, selectedVariable2current)).range([150, mainChartAreaWidth]).padding(chartPadding)
            let yScaleCross = d3.scaleBand().domain(getUniqueValues(globalSurveyData, selectedVariable1current)).range([chartYDataStart, mainChartAreaHeight]).padding(chartPadding)
            let responseSizeCross = 5
            let numWideCrossPivot = Math.floor(xScaleCross.bandwidth()/responseSizeCross)

            responses.transition().duration(transitionDuration)
                .attr("x", (d,i)=>{
                    let i_prime = globalSurveyData.filter(item => (item[selectedVariable2current] == d[selectedVariable2current] && item[selectedVariable1current] == d[selectedVariable1current])).findIndex(e => {return e.refID == d.refID})
                    return xScaleCross(d[selectedVariable2current])+(i_prime%numWideCrossPivot)*(responseSizeCross+1)
                })
                .attr("y", (d,i)=>{
                    let filteredData = globalSurveyData.filter(item => (item[selectedVariable2current] == d[selectedVariable2current] && item[selectedVariable1current] == d[selectedVariable1current]))
                    let i_prime = filteredData.findIndex(e => {return e.refID == d.refID})
                    return yScaleCross(d[selectedVariable1current])+(Math.floor(i_prime/numWideCrossPivot))*(responseSizeCross+1)
                }
                )
                .attr("width", responseSizeCross)
                .attr("height", responseSizeCross)

            let xAxisCross = mainChartArea.append("g").attr("id", "xAxis")
            let xAxisLabelsCross = xAxisCross.selectAll("text").data(getUniqueValues(globalSurveyData, selectedVariable2current)).enter().append("text")
                .text(d=>d).attr("x", ()=>Math.random()*mainChartAreaWidth).attr("y", -100).attr("text-anchor", "start").attr("font-size", 10).attr("fill", "black")
            xAxisLabelsCross.transition().duration(transitionDuration).attr("x", d=>xScaleCross(d)-20).attr("y", chartYAxisStart)

            let yAxisCross = mainChartArea.append("g").attr("id", "yAxis")
            let yAxisLabelsCross = yAxisCross.selectAll("text").data(getUniqueValues(globalSurveyData, selectedVariable1current)).enter().append("text")
                .text(d=>d).attr("x", -100).attr("y", ()=>Math.random()*mainChartAreaHeight).attr("text-anchor", "end").attr("font-size", 10).attr("fill", "black")
            yAxisLabelsCross.transition().duration(transitionDuration).attr("x", 120).attr("y", d=>yScaleCross(d)-20+10)
            }


        function xPivot() {
            mainChartArea.selectAll("#yAxis").remove()
            mainChartArea.selectAll("#xAxis").remove()
            mainChartArea.selectAll("#locAxis").remove()
            mainChartArea.selectAll("#ccyAxis").remove()

            
            let xScaleX = d3.scaleBand().domain(getUniqueValues(globalSurveyData, selectedVariable2current)).range([150, mainChartAreaWidth]).padding(chartPadding)
            let responseSizeXPivot = 10
            let numWideXPivot = Math.floor(xScaleX.bandwidth()/responseSizeXPivot)

            responses.transition().duration(transitionDuration)
                .attr("x", (d,i)=>{
                    let i_prime = globalSurveyData.filter(item => item[selectedVariable2current] == d[selectedVariable2current]).findIndex(e => {return e.refID == d.refID})
                    return xScaleX(d[selectedVariable2current])+(i_prime%numWideXPivot)*(responseSizeXPivot+1)
                })
                .attr("y", (d,i)=>{
                    let filteredData = globalSurveyData.filter(item => item[selectedVariable2current] == d[selectedVariable2current])
                    let i_prime = filteredData.findIndex(e => {return e.refID == d.refID})
                    return chartYDataStart+15+Math.floor(i_prime/numWideXPivot)*(responseSizeXPivot+1)
                })
                .attr("width", responseSizeXPivot)
                .attr("height", responseSizeXPivot)
            
            let xAxisX = mainChartArea.append("g").attr("id", "xAxis")
            let xAxisLabels = xAxisX.selectAll("text").data(getUniqueValues(globalSurveyData, selectedVariable2current)).enter().append("text")
                .text(d=>d).attr("x", ()=>Math.random()*mainChartAreaWidth).attr("y", -100).attr("text-anchor", "start").attr("font-size", 10).attr("fill", "black")
            xAxisLabels.transition().duration(transitionDuration).attr("x", d=>xScaleX(d)-20).attr("y", chartYAxisStart)
                    
        }

        function yPivot() {
            mainChartArea.selectAll("#yAxis").remove()
            mainChartArea.selectAll("#xAxis").remove()
            mainChartArea.selectAll("#locAxis").remove()
            mainChartArea.selectAll("#ccyAxis").remove()


            let yScaleY = d3.scaleBand().domain(getUniqueValues(globalSurveyData, selectedVariable1current)).range([chartYDataStart, mainChartAreaHeight]).padding(chartPadding)
            let responseSizeYPivot = 9.5
            let numTallYPivot = Math.floor(yScaleY.bandwidth()/responseSizeYPivot)

            responses.transition().duration(transitionDuration)
                .attr("x", (d,i)=>{
                    let i_prime = globalSurveyData.filter(item => item[selectedVariable1current] == d[selectedVariable1current]).findIndex(e => {return e.refID == d.refID})
                    return 150+Math.floor(i_prime/numTallYPivot)*(responseSizeYPivot+1)
                })
                .attr("y", (d,i)=>{
                    let filteredData = globalSurveyData.filter(item => item[selectedVariable1current] == d[selectedVariable1current])
                    let i_prime = filteredData.findIndex(e => {return e.refID == d.refID})
                    return yScaleY(d[selectedVariable1current]) + (i_prime%numTallYPivot)*(responseSizeYPivot+1)
                })
                .attr("width", responseSizeYPivot)
                .attr("height", responseSizeYPivot)
            
            let yAxisY = mainChartArea.append("g").attr("id", "yAxis")
            let yAxisLabels = yAxisY.selectAll("text").data(getUniqueValues(globalSurveyData, selectedVariable1current)).enter().append("text")
                .text(d=>d).attr("x", -100).attr("y", ()=>Math.random()*mainChartAreaHeight).attr("text-anchor", "end").attr("font-size", 10).attr("fill", "black")
            yAxisLabels.transition().duration(transitionDuration).attr("x", 120).attr("y", d=>yScaleY(d)-20+10)
        }

        function setResponsesLoc() {
            mainChartArea.selectAll("#yAxis").remove()
            mainChartArea.selectAll("#xAxis").remove()
            mainChartArea.selectAll("#locAxis").remove()
            mainChartArea.selectAll("#ccyAxis").remove()


            let locSize = 12
            let numLocWide = 30

            responses.transition().duration(transitionDuration)
                .attr("x", (d,i)=>{
                    let i_prime = globalSurveyData.filter(item => item.Location == d.Location).findIndex(e => {return e.refID == d.refID})
                    countryDataX = countryData.filter(e=>e.shortCode==d.Location)[0].long
                    return geoScaleXCcy(countryDataX) + (i_prime%numLocWide)*(locSize+1)
                })
                .attr("y", (d,i)=>{
                    let i_prime = globalSurveyData.filter(item => item.Location == d.Location).findIndex(e => {return e.refID == d.refID})
                    countryDataY = countryData.filter(e=>e.shortCode==d.Location)[0].lat
                    return geoScaleYCcy(countryDataY) + Math.floor(i_prime/numLocWide)*(locSize+1)
                }
                )
                .attr("width", locSize)
                .attr("height", locSize)
            
            let locAxis = mainChartArea.append("g").attr("id", "locAxis")
            let locLabels = locAxis.selectAll("text").data(getUniqueValues(globalSurveyData, "Location")).enter().append("text")
                .text(d=>d)
                .attr("x", (d)=>Math.random()*mainChartAreaWidth)
                .attr("y", (d)=>Math.random()>0.5?-100:height+100)
                .attr("text-anchor", "middle").attr("font-size", 10).attr("fill", "black")

            locLabels.transition().duration(transitionDuration)
                .attr("x", d=>geoScaleXCcy(countryData.filter(e=>e.shortCode==d)[0].long)-10)
                .attr("y", d=>geoScaleYCcy(countryData.filter(e=>e.shortCode==d)[0].lat)-22)

        }


        function setResponsesCcy() {
            mainChartArea.selectAll("#yAxis").remove()
            mainChartArea.selectAll("#xAxis").remove()
            mainChartArea.selectAll("#locAxis").remove()
            mainChartArea.selectAll("#ccyAxis").remove()


            let ccySize = 12
            let numCcyWide = 15

            responses.transition().duration(transitionDuration)
                .attr("x", (d,i)=>{
                    let i_prime = globalSurveyData.filter(item => item.PayCcy == d.PayCcy).findIndex(e => {return e.refID == d.refID})
                    currencyDataX = currencyData.filter(e=>e.currency==d.PayCcy)[0].long
                    return geoScaleXCcy(currencyDataX) + (i_prime%numCcyWide)*(ccySize+1)
                })
                .attr("y", (d,i)=>{
                    let i_prime = globalSurveyData.filter(item => item.PayCcy == d.PayCcy).findIndex(e => {return e.refID == d.refID})
                    currencyDataY = currencyData.filter(e=>e.currency==d.PayCcy)[0].lat
                    return geoScaleYCcy(currencyDataY) + Math.floor(i_prime/numCcyWide)*(ccySize+1)
                }
                )
                .attr("width", ccySize)
                .attr("height", ccySize)
        }

        function resetResponsePositions() {
            mainChartArea.selectAll("#yAxis").remove()
            mainChartArea.selectAll("#xAxis").remove()
            mainChartArea.selectAll("#locAxis").remove()
            mainChartArea.selectAll("#ccyAxis").remove()

            responses.transition().duration(transitionDuration)
                .attr("x", (d,i)=>60+(i%initialNumWide)*(initialResponseSize+1))
                .attr("y", (d,i)=>height-40-initialResponseSize-Math.floor(i/initialNumWide)*(initialResponseSize+1))
                .attr("width", initialResponseSize)
                .attr("height", initialResponseSize)
        }

        function setResponsesRandomly() {
            responses.transition().duration(transitionDuration)
            .attr("x", (d,i)=>width/8+Math.random()*width/2)
            .attr("y", (d,i)=>height/8+Math.random()*height/2)
            .attr("width", 5)
            .attr("height", 5)
        }
        
        function setResponsesColors() {
            
            // Transition the responses to the new colors if the category has changed

            responses.transition().duration(transitionDuration)
                .attr("fill", d=>{
                    if (selectedVariable3current=="Random") {return dvsColors[Math.floor(Math.random()*3)]}
                    if (selectedVariable3current=="Gender") {return color(d.Gender)}
                    if (selectedVariable3current=="Education") {return color(d.Education)}
                    if (selectedVariable3current=="DVSMembership") {return color(d.DVSMembership)}
                })

            // Render key

            let uniqueValues = getUniqueValues(globalSurveyData, selectedVariable3current)
            let uniqueColors = getColors(uniqueValues)
            if (selectedVariable3current=="Random") {
                uniqueValues = ["Just", "Random", "Colors"]
                uniqueColors = dvsColors
            }

            renderKey(selectedVariable3current, uniqueValues, uniqueColors)

            // Sort the data by the selected variable
            // globalSurveyData.sort((a,b)=>{
            //     if (a[selectedVariable3current] < b[selectedVariable3current]) {return -1}
            //     if (a[selectedVariable3current] > b[selectedVariable3current]) {return 1}
            //     return 0
            // })

            // selectedVariable3previous = selectedVariable3current
            // selectedVariable1previous = ""
            // rerender()
            // selectedVariable2previous = ""
            // rerender()
        }

        function renderKey(keyTitle, keyCategories, keyColors) {
            keyArea.selectAll("g").remove()
            const keyTitleGroup = keyArea.append("g").attr("id", "keyTitle").attr("transform", `translate(20, 40)`)
            keyTitleGroup.append("text").text("Key: " + keyTitle).attr("font-size", 20).attr("font-weight", "bold").attr("fill", "grey")
            const keyGroup = keyArea.append("g").attr("id", "keyGroup").attr("transform", `translate(20, 50)`)
            const keyItems = keyGroup.selectAll("g").data(keyCategories).enter().append("g").attr("transform", (d,i)=>`translate(0, ${i*20})`)
            keyItems.append("rect").attr("x", 0).attr("y", 0).attr("width", 14).attr("height", 14).attr("fill", (d,i)=>keyColors[i])
            keyItems.append("text").text(d=>d).attr("x", 30).attr("y", 15).attr("font-size", 14).attr("fill", "grey")
            if (keyTitle=="Random") {
                keyGroup.append("text").text("Hint: Use the dropdown to change color meaning").attr("x", 140).attr("y", -35).attr("font-size", 10).attr("fill", "red").attr("font-weight", "bold")
            }
        }

        function getUniqueValues(jsonList, fieldName) {
            const uniqueValues = new Set();
            for (const jsonObject of jsonList) {
              uniqueValues.add(jsonObject[fieldName]);
            }
            return [...uniqueValues].sort();
          }

        function getColors(uniqueValues) {
            const colors = []
            for (let i=0; i<uniqueValues.length; i++) {
                colors.push(color(uniqueValues[i]))
            }
            return colors
        }

        function getTools(element) {
            let toolsToReturn = []
            const toolsList = ['ToolsForDataViz_ArcGIS',
            'ToolsForDataViz_Canvas',
            'ToolsForDataViz_D3',
            'ToolsForDataViz_Datawrapper',
            'ToolsForDataViz_Excel',
            'ToolsForDataViz_Figma',
            'ToolsForDataViz_Flourish',
            'ToolsForDataViz_ggplot2',
            'ToolsForDataViz_Gephi',
            'ToolsForDataViz_GoogleDataStudio',
            'ToolsForDataViz_GoogleSheets',
            'ToolsForDataViz_Highcharts',
            'ToolsForDataViz_Illustrator',
            'ToolsForDataViz_Leaflet',
            'ToolsForDataViz_Looker',
            'ToolsForDataViz_Mapbox',
            'ToolsForDataViz_Observable',
            'ToolsForDataViz_P5orProcessing',
            'ToolsForDataViz_PenPaper',
            'ToolsForDataViz_PhysicalMaterials',
            'ToolsForDataViz_Plotly',
            'ToolsForDataViz_PowerBI',
            'ToolsForDataViz_PowerPoint',
            'ToolsForDataViz_Python',
            'ToolsForDataViz_QGIS',
            'ToolsForDataViz_Qlik',
            'ToolsForDataViz_R',
            'ToolsForDataViz_RAWGraphs',
            'ToolsForDataViz_React',
            'ToolsForDataViz_Svelte',
            'ToolsForDataViz_Tableau',
            'ToolsForDataViz_Vega',
            'ToolsForDataViz_Vue',
            'ToolsForDataViz_WebComponents',
            'ToolsForDataViz_WebGL',
            'ToolsForDataViz_Other__',
            ]
            for (let i=0; i<toolsList.length; i++) {
                if ((element[toolsList[i]]!="[^not chosen]")&&(element[toolsList[i]]!="[\\unfinished]")&&(element[toolsList[i]]!="[^not answered]")) {
                    toolsToReturn.push(element[toolsList[i]])
                }
            }
            return toolsToReturn

        }

        function getCharts(element) {
            let chartsToReturn = []
            const chartsList = ['ChartsUsed_Line',
            'ChartsUsed_Bar',
            'ChartsUsed_PieOrDonut',
            'ChartsUsed_Scatterplot',
            'ChartsUsed_Histogram',
            'ChartsUsed_Boxplot',
            'ChartsUsed_DotPlot',
            'ChartsUsed_Hexbin',
            'ChartsUsed_Heatmap',
            'ChartsUsed_Infographic',
            'ChartsUsed_Pictorial',
            'ChartsUsed_Treemap',
            'ChartsUsed_Dendrogram',
            'ChartsUsed_Network',
            'ChartsUsed_ChoroplethMap',
            'ChartsUsed_OtherGeospatialMap',
            'ChartsUsed_Waffle',
            'ChartsUsed_Flow',
            'ChartsUsed_3D',
            'ChartsUsed_VRorAR',
            'ChartsUsed_BeeSwarm',
            'ChartsUsed_ForceDirected',
            'ChartsUsed_Other__'
            ]
            for (let i=0; i<chartsList.length; i++) {
                if ((element[chartsList[i]]!="[^not chosen]")&&(element[chartsList[i]]!="[\\unfinished]")&&(element[chartsList[i]]!="[^not answered]")) {
                    chartsToReturn.push(element[chartsList[i]])
                }
            }
            return chartsToReturn
        }

        function getChannels(element) {
            let channelsToReturn = []
            const channelsList = ['DataVizSharingChannels_EmbeddedInTool',
            'DataVizSharingChannels_Dashboard',
            'DataVizSharingChannels_Scrollytelling',
            'DataVizSharingChannels_StaticWebPage',
            'DataVizSharingChannels_InteractiveNotebook',
            'DataVizSharingChannels_DocumentOrReport',
            'DataVizSharingChannels_Presentations',
            'DataVizSharingChannels_Email',
            'DataVizSharingChannels_NewspaperorMagazine',
            'DataVizSharingChannels_PeerReviewedJournal',
            'DataVizSharingChannels_PrintedOnPaper',
            'DataVizSharingChannels_OtherPhysicalMedium',
            'DataVizSharingChannels_VRorAR',
            'DataVizSharingChannels_Installation',
            'DataVizSharingChannels_App',
            'DataVizSharingChannels_Video',
            'DataVizSharingChannels_SocialMedia',
            'DataVizSharingChannels_Other__'            
            ]
            for (let i=0; i<channelsList.length; i++) {
                if ((element[channelsList[i]]!="[^not chosen]")&&(element[channelsList[i]]!="[\\unfinished]")&&(element[channelsList[i]]!="[^not answered]")) {
                    channelsToReturn.push(element[channelsList[i]])
                }
            }
            return channelsToReturn
        }

        function getChallenges(element) {
            let challengesToReturn = []
            const challengesList = ['ChallengesForDataViz_LackTime',
            'ChallengesForDataViz_LackDesignExpertise',
            'ChallengesForDataViz_LackTechSkill',
            'ChallengesForDataViz_LearningNewToolsEtc',
            'ChallengesForDataViz_AccessingData',
            'ChallengesForDataViz_InfoOverload',
            'ChallengesForDataViz_LackCollaboration',
            'ChallengesForDataViz_LackMentorship',
            'ChallengesForDataViz_LowDataLiteracy',
            'ChallengesForDataViz_DataVizNotRespected',
            'ChallengesForDataViz_ToolsTechLimits',
            'ChallengesForDataViz_NonVizActivity',
            'ChallengesForDataViz_DataVolume',
            'ChallengesForDataViz_Other__'            
            ]
            for (let i=0; i<challengesList.length; i++) {
                if ((element[challengesList[i]]!="[^not chosen]")&&(element[challengesList[i]]!="[\\unfinished]")&&(element[challengesList[i]]!="[^not answered]")) {
                    challengesToReturn.push(element[challengesList[i]])
                }
            }
            return challengesToReturn
        }
    
    })
        

}

go()
