window.appData = window.appData || {};

window.appData.statistics = {
  "topic": "Statistics",
  "subtopics": [
    {
      "id": "statistics-collection",
      "name": "Data Collection",
      "learn": "<h3>Types of Data</h3><ul><li><b>Qualitative (Categorical):</b> Describes qualities or categories (e.g. eye colour, car model).</li><li><b>Quantitative (Numerical):</b> Deals with numbers. Can be:<ul><li><b>Discrete:</b> Can only take specific, separate values (usually counted, like number of siblings).</li><li><b>Continuous:</b> Can take any value within a range (usually measured, like height or weight).</li></ul></li></ul><h3>Sampling</h3><p>Taking data from a small group to make inferences about a larger population.</p><ul><li><b>Random Sample:</b> Every member of the population has an equal chance of being selected. Helps avoid bias.</li><li><b>Stratified Sample:</b> The population is divided into groups (strata), and a proportional sample is taken from each.</li></ul><p><b>Number needed in sample = (Number in group / Total population) × Sample size.</b></p>",
      "practice": [
        { "q": "Is 'Shoe Size' discrete or continuous data?", "a": "Discrete", "hint": "Shoe sizes come in specific jumps (e.g., 6, 6.5, 7)." },
        { "q": "Is 'Time taken to run 100m' discrete or continuous?", "a": "Continuous", "hint": "Time is measured and can take any value." },
        { "q": "Name a method to select a random sample.", "a": "Pull names from a hat / random number generator", "hint": "Everyone needs an equal chance." },
        { "q": "What type of sample keeps the proportions of different groups the same as the population?", "a": "Stratified", "hint": "Layers or strata." },
        { "q": "Is 'Eye colour' qualitative or quantitative data?", "a": "Qualitative", "hint": "It describes a quality, not a number." }
      ],
      "exam": [
        { "q": "A school has 1000 students. 200 are in Year 7. A stratified sample of 50 students is needed. How many Year 7 students should be selected?", "a": "10", "hint": "Fraction of Year 7s = 200/1000. Multiply this by 50." },
        { "q": "Give one reason why a survey asking 'Don't you agree that homework is a waste of time?' is biased.", "a": "It is a leading question.", "hint": "It prompts the user towards a specific answer." },
        { "q": "A factory produces 5000 lightbulbs a day. It is too expensive to test them all. Suggest a suitable sampling method to check quality.", "a": "Systematic sampling (e.g. test every 100th bulb)", "hint": "Needs to be spread out evenly over the day." }
      ]
    },
    {
      "id": "statistics-representing",
      "name": "Representing Data",
      "learn": "<h3>Pie Charts</h3><p>Shows data as proportions of a whole (360°).</p><p>Angle for each sector = (Frequency / Total Frequency) × 360°.</p><h3>Histograms</h3><p>Used for continuous data with grouped class intervals, which might be unequal widths. There are no gaps between bars.</p><p><b>Area of bar represents frequency.</b> Height of bar = Frequency Density.</p><p>Frequency Density = Frequency / Class Width.</p><h3>Cumulative Frequency Graphs</h3><p>Plots a running total of frequencies. Always plot the cumulative frequency against the <b>upper class boundary</b>. Forms an S-shaped curve. Used to estimate the Median and Quartiles.</p><h3>Box Plots</h3><p>Visualises the spread of data using 5 key values: Minimum, Lower Quartile (LQ), Median, Upper Quartile (UQ), Maximum.</p>",
      "practice": [
        { "q": "What chart is best for showing proportions out of a total?", "a": "Pie Chart", "hint": "A circle divided into slices." },
        { "q": "In a scatter graph, what describes the relationship between data points?", "a": "Correlation", "hint": "Can be positive, negative, or none." },
        { "q": "What type of frequency is plotted to draw a frequency polygon?", "a": "Midpoint", "hint": "Plotted at the middle of the class interval." },
        { "q": "What does the area of a bar in a histogram represent?", "a": "Frequency", "hint": "Frequency Density * Class Width." },
        { "q": "What graph plots cumulative frequency against upper class boundaries?", "a": "Cumulative Frequency Graph", "hint": "Used to find median and quartiles." }
      ],
      "exam": [
        { "q": "In a pie chart, 90° represents 45 people. How many people are represented by the whole chart?", "a": "180", "hint": "90 degrees is a quarter of the circle." },
        { "q": "A histogram is drawn. A bar for 10 ≤ x < 20 has a frequency density of 2.5. What is the frequency?", "a": "25", "hint": "Frequency = Frequency Density * Class Width. Width = 10." },
        { "q": "Draw a box plot: Min=2, LQ=5, Median=8, UQ=12, Max=15. (What is the IQR?)", "a": "7", "hint": "IQR = UQ - LQ" }
      ]
    },
    {
      "id": "statistics-analysis",
      "name": "Analysis",
      "learn": "<h3>Averages</h3><ul><li><b>Mean:</b> Add all values and divide by the total number. Useful, but affected by extreme values (outliers).</li><li><b>Median:</b> The middle value when data is ordered. Good for data with outliers. (n+1)/2 th position.</li><li><b>Mode:</b> The most frequent value. Can have more than one mode, or no mode.</li></ul><h3>Measures of Spread</h3><ul><li><b>Range:</b> Largest value minus smallest value. Easily affected by outliers.</li><li><b>Interquartile Range (IQR):</b> Upper Quartile - Lower Quartile. Shows the spread of the middle 50% of the data. Not affected by extreme outliers.</li></ul><h3>Estimating the Mean from Grouped Data</h3><ol><li>Find the midpoint of each class interval.</li><li>Multiply the midpoint by the frequency for that row.</li><li>Sum these values.</li><li>Divide by the total frequency.</li></ol>",
      "practice": [
        { "q": "Find the median of: 3, 7, 2, 8, 5", "a": "5", "hint": "Order them first." },
        { "q": "Calculate the mean of 10, 15, 20", "a": "15", "hint": "Add them up and divide by the count." },
        { "q": "Find the range: 12, 4, 18, 5", "a": "14", "hint": "Largest minus smallest." },
        { "q": "What is the mode of: 2, 3, 3, 4, 5, 5, 5", "a": "5", "hint": "The most frequent value." },
        { "q": "Does an outlier heavily affect the median or the mean?", "a": "Mean", "hint": "The mean uses all values, including extremes." }
      ],
      "exam": [
        { "q": "The mean of 5 numbers is 12. A sixth number is added, and the new mean is 14. What is the sixth number?", "a": "24", "hint": "Total of first 5 numbers = 5 * 12 = 60. New total = 6 * 14 = 84." },
        { "q": "Estimate the mean from a grouped frequency table where sum of (midpoint * frequency) = 450, and total frequency = 50.", "a": "9", "hint": "Mean = Sum of (midpoint * frequency) / Sum of frequency." },
        { "q": "Find the interquartile range of: 2, 5, 7, 10, 12, 15, 18", "a": "10", "hint": "Find median first. Then LQ is median of lower half. UQ is median of upper half. UQ(15) - LQ(5)." }
      ]
    }
  ]
};
