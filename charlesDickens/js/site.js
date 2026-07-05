/* The Inimitable — shared machinery. Conducted, like everything here, by Charles Dickens. */

// For readers who open the coffee-room window from the wrong side.
console.log(
  "%cMarley was dead: to begin with. There is no doubt whatever about that.",
  "font-family: Georgia, serif; font-size: 14px; font-style: italic;"
);
console.log("You have opened the developer's tools. Mr Venus would approve — he too articulates bones for a living.");

// ---------- navigation ----------
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("nav.primary");
if (toggle && nav) {
  toggle.addEventListener("click", () => nav.classList.toggle("open"));
}

// mark the current page in the nav
const here = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll("nav.primary a").forEach((a) => {
  if (a.getAttribute("href") === here) a.classList.add("active");
});

// ---------- reveal on scroll ----------
const observer = new IntersectionObserver(
  (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// ---------- the Micawber Principle, computed ----------
// "Annual income twenty pounds, annual expenditure nineteen nineteen and six, result happiness.
//  Annual income twenty pounds, annual expenditure twenty pounds ought and six, result misery."
const micawber = document.querySelector("#micawber");
if (micawber) {
  const income = micawber.querySelector("#mic-income");
  const spend = micawber.querySelector("#mic-spend");
  const verdict = micawber.querySelector("#mic-verdict");
  const judge = () => {
    const i = parseFloat(income.value);
    const s = parseFloat(spend.value);
    if (isNaN(i) || isNaN(s)) {
      verdict.textContent = "Something will turn up.";
      verdict.className = "verdict";
      return;
    }
    if (s <= i) {
      verdict.textContent = "Result: happiness. The blossom is blighted no longer!";
      verdict.className = "verdict happy";
    } else {
      verdict.textContent = "Result: misery. In short — you are for ever floored. As I am!";
      verdict.className = "verdict misery";
    }
  };
  income.addEventListener("input", judge);
  spend.addEventListener("input", judge);
}

// ---------- the Circumlocution Office ----------
// Its one great principle: HOW NOT TO DO IT.
const circum = document.querySelector("#circum-form");
if (circum) {
  const status = document.querySelector("#circum-status");
  const excuses = [
    "Your enquiry has been minuted, memorandumed, and referred to the Barnacle who refers such things to the Barnacle who is out. Kindly begin again with Form B, which cannot be issued until you have completed Form A, which has been discontinued.",
    "The Office is not in a position to say. The Office may, upon application, be in a position to say that it is not in a position to say. Half a dozen boards will need to sit upon it first.",
    "Upon careful review, the Department finds that your matter falls under the purview of another Department, which has been abolished. You are advised to want to know, you know — and to come back Tuesday. Not this Tuesday.",
    "Your submission has been received and will be attended to with all the promptness for which this Office is renowned. Mr Tite Barnacle begs to inform you that this means never.",
  ];
  let attempts = 0;
  circum.addEventListener("submit", (e) => {
    e.preventDefault();
    status.textContent = excuses[Math.min(attempts, excuses.length - 1)];
    status.classList.add("visible");
    attempts++;
    if (attempts >= excuses.length) {
      status.textContent =
        "Remarkable persistence. You are hereby certified a Doyce among Clennams. In recognition, the Office grants your request the only way it knows how: it has been forwarded to the author directly, who answers his correspondence, all fourteen thousand of it, himself.";
    }
  });
}

// ---------- "Please, sir, I want some more." ----------
const moreBtn = document.querySelector("#want-more");
if (moreBtn) {
  const hidden = document.querySelectorAll(".more-item");
  moreBtn.addEventListener("click", () => {
    hidden.forEach((el) => (el.style.display = ""));
    moreBtn.textContent = "MORE?! (The board is astonished. But here it is.)";
    moreBtn.disabled = true;
    setTimeout(() => (moreBtn.style.display = "none"), 2600);
  });
}

// ---------- newsletter (Household Words) ----------
const newsForm = document.querySelector("#household-words");
if (newsForm) {
  newsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const out = newsForm.querySelector(".fine");
    out.textContent = "Barkis is willin' — and so, it seems, are you. Your first number arrives with the next mail packet, weather on the Atlantic permitting.";
  });
}

// ---------- quote of the day (rotates on the landing page) ----------
const qod = document.querySelector("#quote-rotator");
if (qod) {
  const quotes = [
    { q: "Have a heart that never hardens, and a temper that never tires, and a touch that never hurts.", w: "Our Mutual Friend" },
    { q: "No one is useless in this world who lightens the burdens of another.", w: "Doctor Marigold" },
    { q: "There is nothing in the world so irresistibly contagious as laughter and good humour.", w: "A Christmas Carol" },
    { q: "The sum of the whole is this: walk and be happy; walk and be healthy.", w: "The Uncommercial Traveller (in spirit)" },
    { q: "Whatever I have tried to do in life, I have tried with all my heart to do well.", w: "David Copperfield" },
    { q: "Reflect upon your present blessings, of which every man has many — not on your past misfortunes, of which all men have some.", w: "Sketches by Boz" },
  ];
  const pick = quotes[new Date().getDate() % quotes.length];
  qod.querySelector("blockquote").textContent = pick.q;
  qod.querySelector("cite").textContent = "— " + pick.w;
}
