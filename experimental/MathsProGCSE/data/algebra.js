window.appData = window.appData || {};

window.appData.algebra = {
  "topic": "Algebra",
  "subtopics": [
    {
      "id": "algebra-notation",
      "name": "Notation & Manipulation",
      "learn": "<h3>Algebraic Notation</h3><p>In algebra, letters are used to represent unknown values. The basic rules are:</p><ul><li><b>ab</b> means a × b</li><li><b>3y</b> means 3 × y</li><li><b>x/y</b> means x ÷ y</li><li><b>x²</b> means x × x</li></ul><h3>Expanding Brackets</h3><p>To expand a single bracket, multiply the term outside the bracket by each term inside. For example: <b>3(x + 4) = 3x + 12</b>.</p><p>To expand double brackets, multiply each term in the first bracket by each term in the second. A common method is <b>FOIL</b> (First, Outer, Inner, Last). For example: <b>(x + 2)(x + 3) = x² + 3x + 2x + 6 = x² + 5x + 6</b>.</p><h3>Factorising</h3><p>Factorising is the reverse of expanding. You look for the highest common factor in all terms and place it outside the bracket. For example: <b>4x + 12 = 4(x + 3)</b>.</p><p>To factorise a quadratic expression like <b>x² + bx + c</b>, look for two numbers that multiply to make <i>c</i> and add to make <i>b</i>.</p>",
      "practice": [
        { "q": "Simplify 3a + 4b - 2a + b", "a": "a + 5b", "hint": "Group the 'a' terms and the 'b' terms together." },
        { "q": "Expand 4(2x - 3)", "a": "8x - 12", "hint": "Multiply the 4 by both the 2x and the -3." },
        { "q": "Factorise 10y + 15", "a": "5(2y + 3)", "hint": "Find the highest common factor of 10 and 15." },
        { "q": "Expand and simplify (x+3)(x+4)", "a": "x^2 + 7x + 12", "hint": "Use the FOIL method." },
        { "q": "Make x the subject of the formula: y = 2x - 5", "a": "x = (y + 5) / 2", "hint": "Add 5 to both sides, then divide by 2." }
      ],
      "exam": [
        { "q": "Factorise fully 18x^2 y - 12xy^2", "a": "6xy(3x - 2y)", "hint": "Find the HCF for the numbers, and the highest power of x and y that divides both terms." },
        { "q": "Expand and simplify (2x + 1)(x - 3)(x + 2)", "a": "2x^3 + x^2 - 13x - 6", "hint": "Expand two brackets first, simplify, then multiply the result by the third bracket." },
        { "q": "Make r the subject of the formula: V = (4/3)πr^3", "a": "r = cuberoot(3V / 4π)", "hint": "Multiply by 3, divide by 4π, then take the cube root." }
      ]
    },
    {
      "id": "algebra-graphs",
      "name": "Graphs",
      "learn": "<h3>Linear Graphs</h3><p>Linear graphs are straight lines. Their equation is usually given in the form <b>y = mx + c</b>, where <b>m</b> is the gradient (steepness) and <b>c</b> is the y-intercept (where the line crosses the y-axis).</p><p>Gradient = Change in y / Change in x.</p><h3>Quadratic Graphs</h3><p>Quadratic graphs have equations with an <b>x²</b> term (e.g., <b>y = x² + 2x - 3</b>). They form a curve called a parabola. They have a turning point (vertex) and a line of symmetry.</p><h3>Other Graphs</h3><ul><li><b>Cubic Graphs:</b> Have an <b>x³</b> term. They usually curve twice.</li><li><b>Reciprocal Graphs:</b> Have an equation like <b>y = a/x</b>. The graph forms two distinct curves (hyperbolas) and never touches the axes.</li></ul>",
      "practice": [
        { "q": "Find the gradient of the line connecting (1, 2) and (4, 11).", "a": "3", "hint": "Change in y / Change in x" },
        { "q": "What is the y-intercept of the line y = -2x + 7?", "a": "7", "hint": "Substitute x = 0." },
        { "q": "Write the equation of a line parallel to y = 5x - 2 passing through (0, 4).", "a": "y = 5x + 4", "hint": "Parallel lines have the same gradient." },
        { "q": "What is the general shape of a quadratic graph?", "a": "Parabola (U-curve)", "hint": "It has an x^2 term." },
        { "q": "Does a reciprocal graph (y=1/x) cross the y-axis?", "a": "No", "hint": "What happens when you divide by zero?" }
      ],
      "exam": [
        { "q": "Find the equation of the line passing through (-2, 5) and (4, -7).", "a": "y = -2x + 1", "hint": "First calculate the gradient m. Then use y = mx + c with one coordinate pair to find c." },
        { "q": "Find the coordinates of the turning point of the curve y = x^2 - 6x + 5 by completing the square.", "a": "(3, -4)", "hint": "Write in the form (x+a)^2 + b. The turning point is (-a, b)." },
        { "q": "The lines y = 3x - 1 and 2y - 6x + k = 0 do not intersect. What can you deduce about k?", "a": "k is not equal to 2", "hint": "Rearrange the second equation to y = mx + c. If they don't intersect, they are parallel, so gradients are equal. If k=2, they are the same line." }
      ]
    },
    {
      "id": "algebra-equations",
      "name": "Equations & Inequalities",
      "learn": "<h3>Solving Linear Equations</h3><p>The goal is to get the unknown variable (e.g., x) on its own on one side of the equals sign. Remember to do the same operation to both sides to keep the equation balanced.</p><h3>Solving Quadratic Equations</h3><p>Quadratic equations have the form <b>ax² + bx + c = 0</b>. They can be solved by:</p><ol><li><b>Factorising:</b> Putting into two brackets (x + p)(x + q) = 0. Then x = -p or x = -q.</li><li><b>Using the Quadratic Formula:</b> For ax² + bx + c = 0, x = [-b ± √(b² - 4ac)] / 2a.</li><li><b>Completing the Square.</b></li></ol><h3>Simultaneous Equations</h3><p>These involve finding the values of two variables (e.g., x and y) that satisfy two equations at the same time. Common methods are Elimination (adding/subtracting equations to remove a variable) and Substitution.</p>",
      "practice": [
        { "q": "Solve 3x + 5 = 17", "a": "x = 4", "hint": "Subtract 5, then divide by 3." },
        { "q": "Solve x/4 = 3", "a": "x = 12", "hint": "Multiply both sides by 4." },
        { "q": "Solve x^2 - 9 = 0", "a": "x = 3, x = -3", "hint": "Add 9, then take the square root (remember positive and negative)." },
        { "q": "Solve the inequality: 2x - 1 > 7", "a": "x > 4", "hint": "Solve it like a normal equation." },
        { "q": "Solve the simultaneous equations: x+y=5 and x-y=1", "a": "x=3, y=2", "hint": "Add the two equations together." }
      ],
      "exam": [
        { "q": "Solve x^2 - 5x - 14 = 0", "a": "x = 7, x = -2", "hint": "Factorise into two brackets. Look for numbers that multiply to -14 and add to -5." },
        { "q": "Solve the simultaneous equations: 3x + 2y = 18 and 2x - y = 5", "a": "x = 4, y = 3", "hint": "Multiply the second equation by 2, then add to the first equation." },
        { "q": "Find the range of values of x for which both 3x - 2 < x + 6 and x^2 - 9 > 0 are true.", "a": "3 < x < 4", "hint": "Solve each inequality separately first. For the quadratic, sketch the graph to see where it's above 0." }
      ]
    },
    {
      "id": "algebra-sequences",
      "name": "Sequences",
      "learn": "<h3>Arithmetic Sequences</h3><p>In an arithmetic (or linear) sequence, the difference between consecutive terms is constant. The rule is given by the <b>nth term</b> formula: <b>dn + c</b>, where <i>d</i> is the common difference and <i>c</i> is the 0th term (first term minus the difference).</p><h3>Geometric Sequences</h3><p>In a geometric sequence, each term is found by multiplying the previous term by a constant value called the common ratio.</p><h3>Quadratic Sequences</h3><p>These sequences have a constant second difference. The nth term formula contains an <b>n²</b> term (e.g., an² + bn + c). Half the second difference gives the value of 'a'.</p>",
      "practice": [
        { "q": "Find the nth term of the sequence: 5, 8, 11, 14...", "a": "3n + 2", "hint": "The difference is 3. What is the 0th term?" },
        { "q": "What is the 10th term of the sequence with nth term 4n - 1?", "a": "39", "hint": "Substitute n=10." },
        { "q": "Find the next term in the geometric sequence: 2, 6, 18, 54...", "a": "162", "hint": "Find what you multiply by each time to get the next term." },
        { "q": "Is 50 a term in the sequence 3n + 2?", "a": "Yes (n=16)", "hint": "Set 3n+2 = 50 and solve. Is n an integer?" },
        { "q": "Write down the first 3 terms of the sequence n^2 + 1.", "a": "2, 5, 10", "hint": "Substitute n=1, n=2, n=3." }
      ],
      "exam": [
        { "q": "Find the nth term of the quadratic sequence: 3, 8, 15, 24, 35...", "a": "n^2 + 2n", "hint": "Find the first and second differences. 2a = second diff." },
        { "q": "A sequence is defined by the Fibonacci rule. The first two terms are a and b. Write down the 5th term in terms of a and b.", "a": "2a + 3b", "hint": "Add the two previous terms to get the next term." },
        { "q": "The sum of the first two terms of a geometric sequence is 15. The sum to infinity is 16. Find the possible values of the common ratio.", "a": "1/4 or -1/4", "hint": "Use formulas S2 = a(1-r^2)/(1-r) = a(1+r) and Sinf = a/(1-r)." }
      ]
    }
  ]
};
