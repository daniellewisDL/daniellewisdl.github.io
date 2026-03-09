window.appData = window.appData || {};

window.appData.geometry = {
  "topic": "Geometry & Measures",
  "subtopics": [
    {
      "id": "geometry-properties",
      "name": "Properties & Constructions",
      "learn": "<h3>Angles</h3><ul><li>Angles on a straight line add to 180°.</li><li>Angles around a point add to 360°.</li><li>Vertically opposite angles are equal.</li><li>Angles in a triangle add to 180°.</li></ul><h3>Angles in Parallel Lines</h3><ul><li><b>Alternate angles:</b> Are equal (Z shape).</li><li><b>Corresponding angles:</b> Are equal (F shape).</li><li><b>Co-interior angles:</b> Add to 180° (C or U shape).</li></ul><h3>Polygons</h3><ul><li>Sum of interior angles = (n - 2) × 180°</li><li>Sum of exterior angles = 360° always.</li><li>For a regular polygon, exterior angle = 360 / n.</li></ul><h3>Circle Theorems</h3><ul><li>Angle in a semicircle is a right angle.</li><li>Angle at the centre is twice the angle at the circumference.</li><li>Angles in the same segment are equal.</li><li>Opposite angles in a cyclic quadrilateral add up to 180°.</li><li>The angle between a tangent and radius is 90°.</li><li>Alternate segment theorem.</li></ul>",
      "practice": [
        { "q": "What is the sum of angles in a triangle?", "a": "180°", "hint": "A straight line is 180°." },
        { "q": "Find the missing angle in a triangle with angles 45° and 60°.", "a": "75°", "hint": "Subtract the given angles from 180." },
        { "q": "What is the sum of exterior angles of any polygon?", "a": "360°", "hint": "Imagine walking once around the shape." },
        { "q": "Calculate the interior angle of a regular pentagon.", "a": "108°", "hint": "Sum of interior angles = (n-2) * 180." },
        { "q": "Are alternate angles equal or supplementary?", "a": "Equal", "hint": "Look for the 'Z' shape on parallel lines." }
      ],
      "exam": [
        { "q": "A regular polygon has an exterior angle of 24°. How many sides does it have?", "a": "15 sides", "hint": "Number of sides = 360 / exterior angle." },
        { "q": "In an isosceles triangle, one angle is 110°. What are the other two angles?", "a": "35°, 35°", "hint": "Base angles of an isosceles triangle are equal." },
        { "q": "A cyclic quadrilateral ABCD sits inside a circle. Angle DAB = 80°. Find angle BCD.", "a": "100°", "hint": "Opposite angles in a cyclic quad add to 180°." }
      ]
    },
    {
      "id": "geometry-mensuration",
      "name": "Mensuration",
      "learn": "<h3>Perimeter and Area</h3><ul><li><b>Rectangle Area:</b> length × width</li><li><b>Triangle Area:</b> ½ × base × height</li><li><b>Parallelogram Area:</b> base × perpendicular height</li><li><b>Trapezium Area:</b> ½(a + b)h</li></ul><h3>Circles</h3><ul><li><b>Circumference:</b> πd or 2πr</li><li><b>Area:</b> πr²</li></ul><h3>3D Shapes (Volume and Surface Area)</h3><ul><li><b>Volume of a Prism:</b> Area of cross-section × length</li><li><b>Volume of a Cylinder:</b> πr²h</li><li><b>Volume of Sphere:</b> (4/3)πr³</li><li><b>Volume of Cone:</b> (1/3)πr²h</li></ul>",
      "practice": [
        { "q": "Formula for the area of a circle?", "a": "πr^2", "hint": "Pi times radius squared." },
        { "q": "Area of a trapezium with parallel sides 4cm and 6cm, and height 5cm.", "a": "25 cm^2", "hint": "1/2 * (a+b) * h" },
        { "q": "Volume of a cylinder with radius 3cm and height 10cm (in terms of π).", "a": "90π cm^3", "hint": "Volume = cross-sectional area * length = πr^2 * h." },
        { "q": "Formula for the circumference of a circle?", "a": "2πr or πd", "hint": "Pi times diameter." },
        { "q": "Find the volume of a cube with side length 4cm.", "a": "64 cm^3", "hint": "Side cubed." }
      ],
      "exam": [
        { "q": "A sphere has a volume of 288π cm^3. Find its radius.", "a": "6 cm", "hint": "Volume = 4/3 * π * r^3." },
        { "q": "The surface area of a cone is 60π cm^2. Its radius is 4cm. Find the slant height l.", "a": "11 cm", "hint": "Surface Area = πr^2 + πrl." },
        { "q": "Two similar shapes have areas of 16cm^2 and 25cm^2. If the smaller has length 8cm, what is the length of the larger?", "a": "10 cm", "hint": "Area ratio is 16:25. Length factor is sqrt(16/25) = 4/5." }
      ]
    },
    {
      "id": "geometry-transformations",
      "name": "Transformations",
      "learn": "<h3>Types of Transformation</h3><ol><li><b>Translation:</b> Sliding a shape. Described by a column vector (top number is horizontal movement, bottom is vertical).</li><li><b>Reflection:</b> Flipping a shape. Described by the line of reflection (e.g. y = x, x = 2).</li><li><b>Rotation:</b> Turning a shape. Described by a centre of rotation, an angle, and a direction (clockwise/anti-clockwise).</li><li><b>Enlargement:</b> Changing the size. Described by a centre of enlargement and a scale factor. (Important: A fractional scale factor makes it smaller. A negative scale factor flips it across the centre).</li></ol>",
      "practice": [
        { "q": "What three things do you need to describe a rotation?", "a": "Centre, angle, direction", "hint": "Where is it turning, by how much, and which way?" },
        { "q": "What does a translation vector (3, -2) mean?", "a": "3 right, 2 down", "hint": "Top is x (left/right), bottom is y (up/down)." },
        { "q": "If a shape is enlarged by a scale factor of 1/2, what happens to it?", "a": "It gets smaller (dimensions are halved)", "hint": "A fractional scale factor reduces the size." },
        { "q": "What line is the x-axis?", "a": "y = 0", "hint": "All points on the x-axis have a y-coordinate of 0." },
        { "q": "Does a reflection change the size of a shape?", "a": "No", "hint": "It only changes its orientation (flipped)." }
      ],
      "exam": [
        { "q": "Triangle A is mapped onto Triangle B by a translation vector (-4, 5). Write the vector to map B back to A.", "a": "(4, -5)", "hint": "Reverse the sign of both numbers." },
        { "q": "A shape has area 10cm^2. It is enlarged by a scale factor of 3. What is the area of the new shape?", "a": "90 cm^2", "hint": "Area Scale Factor = (Length Scale Factor)^2. So ASF is 3^2 = 9." },
        { "q": "Describe the single transformation that is equivalent to a reflection in the x-axis followed by a reflection in the y-axis.", "a": "Rotation of 180° about the origin (0,0)", "hint": "Sketch it out or think about the coordinates (x,y) -> (x,-y) -> (-x,-y)." }
      ]
    },
    {
      "id": "geometry-trig",
      "name": "Trigonometry & Pythagoras",
      "learn": "<h3>Pythagoras' Theorem</h3><p>For right-angled triangles: <b>a² + b² = c²</b>, where c is the hypotenuse (the longest side opposite the right angle).</p><h3>Right-Angled Trigonometry (SOH CAH TOA)</h3><ul><li><b>Sin(θ)</b> = Opposite / Hypotenuse</li><li><b>Cos(θ)</b> = Adjacent / Hypotenuse</li><li><b>Tan(θ)</b> = Opposite / Adjacent</li></ul><h3>Non-Right Angled Triangles</h3><ul><li><b>Sine Rule:</b> a/sinA = b/sinB = c/sinC (Use when finding a side). Or sinA/a = sinB/b (Use when finding an angle). Need a matching 'side-angle pair'.</li><li><b>Cosine Rule:</b> a² = b² + c² - 2bcCosA (Use to find a third side when you have two sides and enclosed angle). Or CosA = (b²+c²-a²) / 2bc (Use to find an angle when you have all three sides).</li><li><b>Area of Triangle:</b> ½abSinC</li></ul>",
      "practice": [
        { "q": "State Pythagoras' theorem.", "a": "a^2 + b^2 = c^2", "hint": "c is the hypotenuse." },
        { "q": "A right-angled triangle has sides 3cm and 4cm. Find the hypotenuse.", "a": "5cm", "hint": "Square both numbers, add them, and find the square root." },
        { "q": "Which trig ratio is Opposite / Adjacent?", "a": "tan", "hint": "SOH CAH TOA" },
        { "q": "Calculate the missing side if hypotenuse = 13 and one side = 5.", "a": "12", "hint": "Use Pythagoras: 13^2 - 5^2." },
        { "q": "What is sin(30°)?", "a": "0.5 or 1/2", "hint": "Use exact trigonometric values." }
      ],
      "exam": [
        { "q": "A ladder is 6m long. It leans against a wall. The foot of the ladder is 2m away from the wall. Calculate the angle the ladder makes with the ground.", "a": "70.5°", "hint": "Use SOH CAH TOA. You have the adjacent and hypotenuse." },
        { "q": "Use the sine rule to find x in a triangle where a=5cm, A=40°, b=x cm, B=80°.", "a": "x = 7.66cm", "hint": "a/sinA = b/sinB." },
        { "q": "Find the area of a triangle with sides 5cm and 8cm, and an included angle of 30°.", "a": "10 cm^2", "hint": "Area = 1/2 * a * b * sin(C)." }
      ]
    }
  ]
};
