window.appData = window.appData || {};

window.appData.ratio = {
  "topic": "Ratio",
  "subtopics": [
    {
      "id": "ratio-ratio",
      "name": "Ratio",
      "learn": "<h3>Understanding Ratio</h3><p>Ratios show the relative sizes of two or more values. They are written with a colon (e.g. 2:3).</p><h3>Simplifying Ratios</h3><p>Just like fractions, ratios can be simplified by dividing all parts by their highest common factor. 15:20 simplifies to 3:4.</p><h3>Sharing in a Ratio</h3><p>To divide an amount into a given ratio:</p><ol><li>Add up the parts of the ratio to find the total number of parts.</li><li>Divide the total amount by the number of parts to find the value of 1 part.</li><li>Multiply the value of 1 part by each number in the ratio.</li></ol>",
      "practice": [
        { "q": "Simplify the ratio 15:25", "a": "3:5", "hint": "Divide both sides by the HCF (5)." },
        { "q": "Divide £40 in the ratio 3:5", "a": "£15 and £25", "hint": "Find the total number of parts, divide the amount by this, then multiply." },
        { "q": "The ratio of boys to girls is 4:5. If there are 20 boys, how many girls are there?", "a": "25", "hint": "If 4 parts = 20, find 1 part." },
        { "q": "Write the ratio 2m : 50cm in its simplest form.", "a": "4:1", "hint": "Convert to the same units first." },
        { "q": "Simplify 1/2 : 1/3", "a": "3:2", "hint": "Multiply both sides by the lowest common multiple of the denominators (6)." }
      ],
      "exam": [
        { "q": "A, B and C share money in the ratio 2:3:5. C gets £24 more than A. What is the total amount shared?", "a": "£80", "hint": "The difference between C's shares and A's shares is 3 shares. 3 shares = £24." },
        { "q": "In a school, the ratio of teachers to students is 1:15. If 4 new teachers join and no new students, the ratio becomes 1:12. How many students are there?", "a": "240", "hint": "Let original teachers be x. Students = 15x. (x+4)/15x = 1/12." },
        { "q": "Given a:b = 2:3 and b:c = 4:5, find the ratio a:b:c.", "a": "8:12:15", "hint": "Find a common multiple for the 'b' part." }
      ]
    },
    {
      "id": "ratio-proportion",
      "name": "Proportion",
      "learn": "<h3>Direct Proportion</h3><p>Two quantities are in direct proportion if one increases at the same rate as the other. Their ratio stays constant. The graph is a straight line through the origin.</p><p>Formula: <b>y = kx</b> (where k is the constant of proportionality).</p><h3>Inverse Proportion</h3><p>Two quantities are in inverse proportion if one increases as the other decreases at the same rate. Their product stays constant.</p><p>Formula: <b>y = k/x</b>.</p><h3>Solving Proportion Problems</h3><ol><li>Write down the proportionality statement (e.g. y ∝ x²).</li><li>Convert to an equation with k (e.g. y = kx²).</li><li>Substitute the given values to find k.</li><li>Rewrite the equation with the value of k.</li><li>Use the equation to find the unknown value.</li></ol>",
      "practice": [
        { "q": "If 3 pens cost £4.50, how much do 5 pens cost?", "a": "£7.50", "hint": "Find the cost of 1 pen first." },
        { "q": "It takes 4 men 6 days to build a wall. How long would it take 3 men?", "a": "8 days", "hint": "This is inverse proportion. 1 man would take 24 days." },
        { "q": "y is directly proportional to x. When x=4, y=12. Find the constant equation.", "a": "y = 3x", "hint": "y = kx. So 12 = k(4)." },
        { "q": "Which formula represents inverse proportion?", "a": "y = k/x", "hint": "One goes up, the other goes down." },
        { "q": "If y is directly proportional to x. When x=2, y=10. Find y when x=5.", "a": "25", "hint": "Find k first. y = 5x." }
      ],
      "exam": [
        { "q": "y is directly proportional to the square of x. When x=3, y=36. Find y when x=5.", "a": "100", "hint": "Find the constant of proportionality k using y = k(x^2)." },
        { "q": "p is inversely proportional to the square root of q. When q=25, p=2. Find p when q=100.", "a": "1", "hint": "p = k / sqrt(q). Find k first." },
        { "q": "The force F between two magnets is inversely proportional to the square of the distance d between them. If the distance is halved, what happens to the force?", "a": "It is multiplied by 4.", "hint": "F = k / d^2. Substitute (d/2) for d." }
      ]
    },
    {
      "id": "ratio-compound",
      "name": "Compound Units",
      "learn": "<h3>Speed, Distance, Time</h3><p>Formulas can be remembered using a formula triangle:</p><ul><li><b>Speed = Distance ÷ Time</b></li><li><b>Distance = Speed × Time</b></li><li><b>Time = Distance ÷ Speed</b></li></ul><h3>Density, Mass, Volume</h3><ul><li><b>Density = Mass ÷ Volume</b></li></ul><p>Units for density are usually g/cm³ or kg/m³.</p><h3>Pressure, Force, Area</h3><ul><li><b>Pressure = Force ÷ Area</b></li></ul><p>Pressure is measured in N/m² (Pascals) or N/cm².</p>",
      "practice": [
        { "q": "A car travels 120 miles in 2.5 hours. What is its average speed?", "a": "48 mph", "hint": "Speed = Distance / Time." },
        { "q": "A piece of metal has a mass of 45g and a volume of 5cm^3. What is its density?", "a": "9 g/cm^3", "hint": "Density = Mass / Volume." },
        { "q": "A force of 60N is applied to an area of 4m^2. Calculate the pressure.", "a": "15 N/m^2", "hint": "Pressure = Force / Area." },
        { "q": "Convert 3 hours 15 minutes into a decimal number of hours.", "a": "3.25 hours", "hint": "15 mins is a quarter of an hour." },
        { "q": "A train travels at 80 km/h for 45 minutes. How far does it go?", "a": "60 km", "hint": "Convert minutes to hours first (45/60)." }
      ],
      "exam": [
        { "q": "A block of wood has a density of 0.6 g/cm^3. Its volume is 150 cm^3. Find its mass.", "a": "90g", "hint": "Mass = Density * Volume." },
        { "q": "A runner completes a 10km race. The first 4km take 20 minutes. The rest of the race is run at an average speed of 15 km/h. What is the total time taken in minutes?", "a": "44 minutes", "hint": "Calculate the time for the remaining 6km using Time = Distance / Speed, then add to 20 mins." },
        { "q": "Liquid A has density 1.2 g/cm^3. Liquid B has density 0.8 g/cm^3. 200cm^3 of A is mixed with 300cm^3 of B. Calculate the density of the mixture.", "a": "0.96 g/cm^3", "hint": "Find the total mass in the mixture, then divide by the total volume." }
      ]
    }
  ]
};
