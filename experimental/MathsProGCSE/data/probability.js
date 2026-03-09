window.appData = window.appData || {};

window.appData.probability = {
  "topic": "Probability",
  "subtopics": [
    {
      "id": "probability-theoretical",
      "name": "Theoretical & Experimental",
      "learn": "<h3>The Probability Scale</h3><p>Probability is a measure of how likely an event is to happen. It is always a number between 0 (impossible) and 1 (certain). It can be written as a fraction, decimal, or percentage.</p><h3>Calculating Theoretical Probability</h3><p>P(Event) = (Number of successful outcomes) / (Total number of possible outcomes).</p><p>For example, rolling a 4 on a fair 6-sided die: 1/6.</p><h3>Experimental Probability (Relative Frequency)</h3><p>This is calculated by performing an experiment multiple times.</p><p>Relative Frequency = (Number of times event happened) / (Total number of trials).</p><p>As the number of trials increases, the experimental probability gets closer to the theoretical probability.</p><h3>Expected Frequency</h3><p>To predict how many times an event will happen in a given number of trials:</p><p>Expected Frequency = Probability × Total number of trials.</p>",
      "practice": [
        { "q": "What is the probability of rolling a 4 on a fair 6-sided die?", "a": "1/6", "hint": "There is one 4 out of six possible outcomes." },
        { "q": "If P(Winning) = 0.3, what is P(Not Winning)?", "a": "0.7", "hint": "Probabilities add up to 1." },
        { "q": "A bag has 3 red and 5 blue marbles. P(Red)?", "a": "3/8", "hint": "Favourable outcomes / Total outcomes." },
        { "q": "If you flip a coin and roll a die, how many total possible outcomes are there?", "a": "12", "hint": "Multiply the number of outcomes for each event (2 * 6)." },
        { "q": "Is throwing a biased coin mutually exclusive?", "a": "Yes", "hint": "You cannot get heads and tails at the same time." }
      ],
      "exam": [
        { "q": "A biased die is thrown. The probability of getting a 1 is 0.2. What is the expected number of 1s in 50 throws?", "a": "10", "hint": "Expected value = Probability * Number of trials." },
        { "q": "A spinner has 4 sections. P(Red) = 0.4, P(Blue) = 0.2, P(Green) = 0.1. What is P(Yellow)?", "a": "0.3", "hint": "All probabilities must add up to 1." },
        { "q": "The probability that a seed germinates is 0.85. If I plant 400 seeds, how many would you expect NOT to germinate?", "a": "60", "hint": "Find P(not germinate) first, then multiply by 400." }
      ]
    },
    {
      "id": "probability-sets",
      "name": "Sets",
      "learn": "<h3>Venn Diagrams</h3><p>Venn diagrams use overlapping circles to show relationships between different sets of items.</p><ul><li><b>Intersection (A ∩ B):</b> The overlapping part. Items that belong to both set A AND set B. P(A ∩ B).</li><li><b>Union (A ∪ B):</b> Everything in both circles. Items that belong to set A OR set B (or both). P(A ∪ B) = P(A) + P(B) - P(A ∩ B).</li><li><b>Complement (A'):</b> Everything outside the circle for set A. Items that do not belong to set A. P(A') = 1 - P(A).</li></ul><h3>Conditional Probability</h3><p>The probability of an event happening, given that another event has already happened. This changes the denominator (the total number of possible outcomes) because the sample space is restricted.</p><p>P(A|B) = P(A ∩ B) / P(B) (The probability of A given B).</p>",
      "practice": [
        { "q": "What symbol means 'Intersection' (AND)?", "a": "∩", "hint": "looks like an 'n'." },
        { "q": "What symbol means 'Union' (OR)?", "a": "∪", "hint": "looks like a 'U'." },
        { "q": "What does P(A') mean?", "a": "Probability of Not A", "hint": "The complement." },
        { "q": "If 10 out of 50 students play tennis, what is P(Tennis)?", "a": "10/50 or 1/5", "hint": "Favourable / Total." },
        { "q": "In a Venn diagram, where do you put the people who don't fit either category?", "a": "Outside all circles in the rectangle", "hint": "The universal set box." }
      ],
      "exam": [
        { "q": "In a class of 30, 20 study French, 15 study German, and 5 study neither. Find the probability that a randomly chosen student studies both.", "a": "1/3 or 10/30", "hint": "Total inside circles = 30-5=25. 20+15=35. Overlap = 35-25 = 10." },
        { "q": "Using the data from the previous question, given that a student studies French, what is the probability they also study German?", "a": "1/2 or 10/20", "hint": "The denominator is now only the students who study French (20). How many of those also study German? (10)." },
        { "q": "ξ = {integers 1 to 10}. A={primes}, B={odd numbers}. Find P(A ∩ B).", "a": "3/10", "hint": "A={2,3,5,7}, B={1,3,5,7,9}. Intersection = {3,5,7} (3 numbers)." }
      ]
    },
    {
      "id": "probability-trees",
      "name": "Trees & Grids",
      "learn": "<h3>Tree Diagrams</h3><p>Used to find the probability of multiple events happening one after another.</p><ul><li><b>Along the branches (AND):</b> Multiply the probabilities.</li><li><b>Between different end outcomes (OR):</b> Add the probabilities.</li></ul><p>The probabilities on the branches originating from the same point must add up to 1.</p><h3>Independent vs Dependent Events</h3><p><b>Independent events:</b> The outcome of the first event does not affect the probability of the second. (e.g. flipping a coin twice or picking a counter with replacement).</p><p><b>Dependent events:</b> The outcome of the first event DOES affect the probability of the second. (e.g. picking a counter without replacement. The denominator for the second pick will be smaller).</p>",
      "practice": [
        { "q": "If you flip two fair coins, P(Two Heads) =", "a": "1/4", "hint": "Multiply P(Head) * P(Head) along the branches." },
        { "q": "When picking without replacement, does the denominator change?", "a": "Yes", "hint": "Because there is one less item in total." },
        { "q": "P(A) = 0.6, P(B) = 0.4. If independent, what is P(A and B)?", "a": "0.24", "hint": "Multiply the probabilities together." },
        { "q": "Do you add or multiply probabilities along branches of a tree diagram?", "a": "Multiply", "hint": "AND means multiply." },
        { "q": "Do you add or multiply probabilities between different end outcomes?", "a": "Add", "hint": "OR means add." }
      ],
      "exam": [
        { "q": "A bag contains 5 red and 3 yellow balls. Two are picked without replacement. What is P(Red, then Yellow)?", "a": "15/56", "hint": "(5/8) * (3/7)." },
        { "q": "In a hospital, 5% of people have a disease. A test is 90% accurate (positive if you have it, negative if you don't). What is the probability of a false positive?", "a": "0.095 or 9.5%", "hint": "P(No Disease AND Positive Test) = 0.95 * 0.10." },
        { "q": "A box has 4 green and 6 blue pens. 2 pens are taken without replacement. Find the probability they are the same colour.", "a": "7/15 or 42/90", "hint": "Find P(Green, Green) + P(Blue, Blue)." }
      ]
    }
  ]
};
