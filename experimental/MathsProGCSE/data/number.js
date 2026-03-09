window.appData = window.appData || {};

window.appData.number = {
  "topic": "Number",
  "subtopics": [
    {
      "id": "number-structure",
      "name": "Structure & Calculation",
      "learn": "<h3>Types of numbers</h3><ul><li><b>Integers:</b> Whole numbers (e.g. -3, 0, 4).</li><li><b>Rational numbers:</b> Can be written as a fraction (a/b) where a and b are integers. Includes terminating decimals (0.25) and recurring decimals (0.333...).</li><li><b>Irrational numbers:</b> Cannot be written as a simple fraction. The decimal goes on forever without repeating (e.g. π, √2).</li></ul><h3>Surds</h3><p>A surd is an expression containing an irrational root. Rules for simplifying surds:</p><ul><li>√(ab) = √a × √b</li><li>√(a/b) = √a / √b</li></ul><p><b>Rationalising the denominator:</b> This means getting rid of a surd on the bottom of a fraction. Multiply the top and bottom by the surd on the bottom (or its conjugate).</p><h3>Index Laws</h3><ul><li>a^m × a^n = a^(m+n)</li><li>a^m ÷ a^n = a^(m-n)</li><li>(a^m)^n = a^(mn)</li><li>a^0 = 1</li><li>a^(-m) = 1 / a^m</li><li>a^(1/n) = n-th root of a</li></ul>",
      "practice": [
        { "q": "Calculate -5 - (-3)", "a": "-2", "hint": "Subtracting a negative is the same as adding." },
        { "q": "Simplify √20", "a": "2√5", "hint": "Find the largest square number that divides into 20 (it's 4)." },
        { "q": "Evaluate 16^(1/2)", "a": "4", "hint": "A power of 1/2 means the square root." },
        { "q": "Is √9 a rational or irrational number?", "a": "Rational", "hint": "Evaluate √9 first." },
        { "q": "Write 2^(-3) as a fraction.", "a": "1/8", "hint": "A negative index means taking the reciprocal (1 over the positive power)." }
      ],
      "exam": [
        { "q": "Expand and simplify (2 + √3)(4 - √3)", "a": "5 + 2√3", "hint": "Use FOIL. Remember √3 * -√3 = -3." },
        { "q": "Rationalise the denominator and simplify: 15 / √5", "a": "3√5", "hint": "Multiply top and bottom by √5." },
        { "q": "Evaluate 27^(-2/3)", "a": "1/9", "hint": "Cube root of 27 is 3. Square that to get 9. Negative power means 1/9." }
      ]
    },
    {
      "id": "number-fractions",
      "name": "Fractions, Decimals & Percentages",
      "learn": "<h3>Adding & Subtracting Fractions</h3><p>You must find a <b>common denominator</b> before adding or subtracting the numerators. The denominator stays the same in the answer.</p><h3>Multiplying & Dividing Fractions</h3><ul><li><b>Multiplying:</b> Multiply the numerators together, and the denominators together.</li><li><b>Dividing:</b> \"Keep, Change, Flip\". Keep the first fraction, change ÷ to ×, flip the second fraction.</li></ul><h3>Percentages</h3><p>Percentage means \"out of 100\".</p><ul><li><b>Find a % of an amount:</b> Convert the % to a decimal or fraction and multiply. (e.g. 15% of 80 = 0.15 × 80).</li><li><b>Percentage change:</b> (Change / Original) × 100</li><li><b>Reverse percentages:</b> If a price is increased by 20% to £60, then £60 represents 120%. Find 1% by dividing by 120, then multiply by 100.</li></ul>",
      "practice": [
        { "q": "Convert 3/8 to a decimal.", "a": "0.375", "hint": "Divide 3 by 8." },
        { "q": "Write 45% as a fraction in its simplest form.", "a": "9/20", "hint": "Write as 45/100 and simplify." },
        { "q": "Calculate 2/5 + 1/3.", "a": "11/15", "hint": "Find a common denominator." },
        { "q": "What is 15% of 80?", "a": "12", "hint": "Find 10% then 5%, or multiply 80 by 0.15." },
        { "q": "Convert 0.28 to a simplified fraction.", "a": "7/25", "hint": "Write as 28/100 and divide by 4." }
      ],
      "exam": [
        { "q": "A dress costs £45. It is reduced by 20% in a sale. What is the new price?", "a": "£36", "hint": "Find 20% and subtract it, or calculate 80%." },
        { "q": "Convert the recurring decimal 0.1363636... to a fraction.", "a": "3/22", "hint": "Let x = 0.136..., multiply by 10 and 1000, then subtract to remove the recurring part." },
        { "q": "A car's value depreciates by 15% each year. If it is bought for £20,000, what is its value after 3 years?", "a": "£12282.50", "hint": "Use the multiplier method: 20000 * (0.85)^3." }
      ]
    },
    {
      "id": "number-measures",
      "name": "Measures & Accuracy",
      "learn": "<h3>Standard Form</h3><p>Used to write very large or very small numbers compactly. The format is <b>A × 10ⁿ</b>, where 1 ≤ A < 10, and n is an integer.</p><p>For example, 4,500 = 4.5 × 10³ and 0.0032 = 3.2 × 10⁻³.</p><h3>Rounding and Estimation</h3><ul><li><b>Decimal places (d.p.):</b> Count places after the decimal point.</li><li><b>Significant figures (s.f.):</b> Start counting from the first non-zero digit.</li><li><b>Estimation:</b> Round all numbers in a calculation to 1 significant figure first to find a rough answer.</li></ul><h3>Upper and Lower Bounds</h3><p>When a measurement is rounded, the actual value could be slightly higher or lower. The boundary in the middle of two rounded values gives the bounds.</p><p>If length is 5cm (to nearest cm), Lower Bound = 4.5cm, Upper Bound = 5.5cm. So, 4.5 ≤ length < 5.5.</p>",
      "practice": [
        { "q": "Write 45000 in standard form.", "a": "4.5 * 10^4", "hint": "A number between 1 and 10, times a power of 10." },
        { "q": "Round 3.14159 to 2 decimal places.", "a": "3.14", "hint": "Look at the 3rd decimal place to decide whether to round up." },
        { "q": "Round 4056 to 2 significant figures.", "a": "4100", "hint": "The first sig fig is 4. The second is 0. Look at the 5 to decide." },
        { "q": "A length is measured as 12cm to the nearest cm. Write down the upper bound.", "a": "12.5cm", "hint": "Halfway to the next measuring unit (13cm)." },
        { "q": "Estimate the value of (4.1 × 19.8) / 0.52", "a": "160", "hint": "Round to 1 sig fig: (4 × 20) / 0.5" }
      ],
      "exam": [
        { "q": "Work out (3.5 * 10^5) + (4.2 * 10^4). Give your answer in standard form.", "a": "3.92 * 10^5", "hint": "Convert both to the same power of 10 before adding." },
        { "q": "The mass of a planet is 5.97 * 10^24 kg. The mass of its moon is 7.35 * 10^22 kg. Calculate the difference in their masses in standard form.", "a": "5.8965 * 10^24", "hint": "Convert the moo's mass to * 10^24, then subtract." },
        { "q": "A rectangle has length 4.5cm and width 3.2cm, both measured to 1 decimal place. Calculate the upper bound of its area.", "a": "14.7875 cm^2", "hint": "Area = length * width. To find max area, use upper bounds for both length (4.55) and width (3.25)." }
      ]
    }
  ]
};
