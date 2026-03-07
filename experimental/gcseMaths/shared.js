/* ===== GCSE Maths — Shared JavaScript Module ===== */

// ======================== NAVIGATION ========================
function buildSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  const navLinks = [
    { href: 'index.html', icon: '🏠', label: 'Home' },
    { section: 'Topics' },
    { href: 'number.html', icon: '🔢', label: '1. Number', color: 'var(--color-number)' },
    { href: 'algebra.html', icon: '📐', label: '2. Algebra', color: 'var(--color-algebra)' },
    { href: 'ratio.html', icon: '⚖️', label: '3. Ratio & Proportion', color: 'var(--color-ratio)' },
    { href: 'geometry.html', icon: '📏', label: '4. Geometry & Measures', color: 'var(--color-geometry)' },
    { href: 'probability.html', icon: '🎲', label: '5. Probability', color: 'var(--color-probability)' },
    { href: 'statistics.html', icon: '📊', label: '6. Statistics', color: 'var(--color-statistics)' },
    { section: 'Progress' },
    { href: '#progress', icon: '🏆', label: 'My Badges', action: 'showBadges' },
  ];

  const nav = sidebar.querySelector('nav');
  if (!nav) return;
  nav.innerHTML = '';

  navLinks.forEach(link => {
    if (link.section) {
      const label = document.createElement('div');
      label.className = 'nav-section-label';
      label.textContent = link.section;
      nav.appendChild(label);
    } else {
      const a = document.createElement('a');
      a.href = link.href;
      a.innerHTML = `<span>${link.icon}</span> ${link.label}`;
      if (link.href === currentPage) a.classList.add('active');
      if (link.action === 'showBadges') {
        a.addEventListener('click', (e) => { e.preventDefault(); showBadgeModal(); });
      }
      nav.appendChild(a);
    }
  });

  // XP display in sidebar
  const xpDiv = document.createElement('div');
  xpDiv.style.cssText = 'margin-top:auto;padding-top:1.5rem;border-top:1px solid var(--border-glass);margin-top:1.5rem;';
  xpDiv.innerHTML = `<div class="xp-display" id="sidebar-xp">⭐ <span>${getXP()}</span> XP</div>`;
  sidebar.appendChild(xpDiv);

  // Mobile toggle
  const toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => sidebar.classList.toggle('open'));
    document.addEventListener('click', (e) => {
      if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
        sidebar.classList.remove('open');
      }
    });
  }
}

// ======================== PROGRESS & XP ========================
const STORAGE_KEY = 'gcse_maths_progress';

function getProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { xp: 0, badges: [], quizScores: {}, sectionsComplete: {} };
  } catch { return { xp: 0, badges: [], quizScores: {}, sectionsComplete: {} }; }
}

function saveProgress(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getXP() { return getProgress().xp; }

function addXP(amount, x, y) {
  const progress = getProgress();
  progress.xp = (progress.xp || 0) + amount;
  saveProgress(progress);
  updateXPDisplays();
  showXPFloat(amount, x, y);
  checkBadges();
}

function updateXPDisplays() {
  const xp = getXP();
  document.querySelectorAll('#sidebar-xp span, .xp-value').forEach(el => el.textContent = xp);
  // Update homepage stat if present
  const homeXP = document.getElementById('home-xp');
  if (homeXP) homeXP.textContent = xp;
}

function showXPFloat(amount, x, y) {
  const el = document.createElement('div');
  el.className = 'xp-float';
  el.textContent = `+${amount} XP`;
  el.style.left = (x || window.innerWidth / 2) + 'px';
  el.style.top = (y || 100) + 'px';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1000);
}

function markSectionComplete(topicId, sectionId) {
  const progress = getProgress();
  if (!progress.sectionsComplete[topicId]) progress.sectionsComplete[topicId] = [];
  if (!progress.sectionsComplete[topicId].includes(sectionId)) {
    progress.sectionsComplete[topicId].push(sectionId);
  }
  saveProgress(progress);
}

function getSectionProgress(topicId) {
  const progress = getProgress();
  return progress.sectionsComplete[topicId] || [];
}

function getTopicProgress(topicId, totalSections) {
  const completed = getSectionProgress(topicId).length;
  return Math.round((completed / totalSections) * 100);
}

// ======================== BADGES ========================
const BADGES = [
  { id: 'first_quiz', name: 'First Steps', icon: '🌟', desc: 'Complete your first quiz', check: (p) => Object.keys(p.quizScores).length >= 1 },
  { id: 'xp_100', name: 'Century', icon: '💯', desc: 'Earn 100 XP', check: (p) => p.xp >= 100 },
  { id: 'xp_500', name: 'High Achiever', icon: '🏅', desc: 'Earn 500 XP', check: (p) => p.xp >= 500 },
  { id: 'xp_1000', name: 'Math Champion', icon: '🏆', desc: 'Earn 1000 XP', check: (p) => p.xp >= 1000 },
  { id: 'perfect_quiz', name: 'Perfect Score', icon: '💎', desc: 'Score 100% on a quiz', check: (p) => Object.values(p.quizScores).some(s => s.score === s.total) },
  { id: 'five_quizzes', name: 'Quiz Master', icon: '📚', desc: 'Complete 5 quizzes', check: (p) => Object.keys(p.quizScores).length >= 5 },
  { id: 'ten_quizzes', name: 'Dedicated Learner', icon: '🎓', desc: 'Complete 10 quizzes', check: (p) => Object.keys(p.quizScores).length >= 10 },
  { id: 'number_master', name: 'Number Cruncher', icon: '🔢', desc: 'Complete all Number quizzes', check: (p) => (p.sectionsComplete['number'] || []).length >= 5 },
  { id: 'algebra_master', name: 'Algebra Ace', icon: '📐', desc: 'Complete all Algebra quizzes', check: (p) => (p.sectionsComplete['algebra'] || []).length >= 5 },
  { id: 'geometry_master', name: 'Shape Shifter', icon: '📏', desc: 'Complete all Geometry quizzes', check: (p) => (p.sectionsComplete['geometry'] || []).length >= 5 },
];

function checkBadges() {
  const progress = getProgress();
  let newBadge = null;
  BADGES.forEach(badge => {
    if (!progress.badges.includes(badge.id) && badge.check(progress)) {
      progress.badges.push(badge.id);
      newBadge = badge;
    }
  });
  if (newBadge) {
    saveProgress(progress);
    showReward(newBadge);
  }
}

function showReward(badge) {
  let overlay = document.querySelector('.reward-overlay');
  let popup = document.querySelector('.reward-popup');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'reward-overlay';
    document.body.appendChild(overlay);
  }
  if (!popup) {
    popup = document.createElement('div');
    popup.className = 'reward-popup';
    document.body.appendChild(popup);
  }
  popup.innerHTML = `
    <div class="reward-icon">${badge.icon}</div>
    <h3>Badge Unlocked!</h3>
    <p><strong>${badge.name}</strong></p>
    <p>${badge.desc}</p>
    <button class="btn-primary" style="margin-top:1.5rem" onclick="closeReward()">Awesome! 🎉</button>
  `;
  setTimeout(() => {
    overlay.classList.add('show');
    popup.classList.add('show');
  }, 300);
}

function closeReward() {
  document.querySelector('.reward-overlay')?.classList.remove('show');
  document.querySelector('.reward-popup')?.classList.remove('show');
}

function showBadgeModal() {
  const progress = getProgress();
  let overlay = document.querySelector('.reward-overlay');
  let popup = document.querySelector('.reward-popup');
  if (!overlay) { overlay = document.createElement('div'); overlay.className = 'reward-overlay'; document.body.appendChild(overlay); }
  if (!popup) { popup = document.createElement('div'); popup.className = 'reward-popup'; document.body.appendChild(popup); }
  const badgeHTML = BADGES.map(b => {
    const earned = progress.badges.includes(b.id);
    return `<div class="badge ${earned ? 'earned' : ''}" title="${b.desc}">${b.icon} ${b.name}</div>`;
  }).join('');
  popup.innerHTML = `
    <h3>🏆 My Badges</h3>
    <div class="badge-container" style="margin-top:1.5rem;justify-content:center;">${badgeHTML}</div>
    <p style="margin-top:1rem;font-size:.82rem;">${progress.badges.length}/${BADGES.length} earned</p>
    <button class="btn-secondary" style="margin-top:1.5rem" onclick="closeReward()">Close</button>
  `;
  overlay.classList.add('show');
  popup.classList.add('show');
  overlay.onclick = closeReward;
}

// ======================== QUIZ ENGINE ========================
class QuizEngine {
  constructor(containerId, questions, options = {}) {
    this.container = document.getElementById(containerId);
    this.questions = this.shuffleArray([...questions]);
    this.current = 0;
    this.score = 0;
    this.quizId = options.quizId || containerId;
    this.topicId = options.topicId || '';
    this.sectionId = options.sectionId || '';
    this.xpPerQuestion = options.xpPerQuestion || 10;
    this.onComplete = options.onComplete || null;
    this.answered = false;
    this.render();
  }

  shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  render() {
    if (this.current >= this.questions.length) {
      this.showResults();
      return;
    }
    const q = this.questions[this.current];
    this.answered = false;
    let html = `
      <h4>📝 Practice Quiz</h4>
      <div class="quiz-progress">Question ${this.current + 1} of ${this.questions.length} · Score: ${this.score}/${this.current}</div>
      <div class="question-text">${q.question}</div>
    `;

    if (q.type === 'multiple') {
      const shuffledOptions = this.shuffleArray([...q.options]);
      html += `<div class="options">`;
      shuffledOptions.forEach((opt, i) => {
        html += `<button class="option-btn" data-answer="${opt}" onclick="window.__quizzes['${this.quizId}'].checkAnswer(this, '${this.escapeStr(opt)}', '${this.escapeStr(q.answer)}')">${opt}</button>`;
      });
      html += `</div>`;
    } else if (q.type === 'fill') {
      html += `
        <div style="display:flex;gap:.5rem;align-items:center;flex-wrap:wrap;">
          <input class="fill-input" type="text" placeholder="Your answer..." id="${this.quizId}-input" onkeydown="if(event.key==='Enter')window.__quizzes['${this.quizId}'].checkFill()">
          <button class="btn-primary" onclick="window.__quizzes['${this.quizId}'].checkFill()">Check</button>
        </div>
      `;
    }
    html += `<div class="quiz-feedback" id="${this.quizId}-feedback"></div>`;
    this.container.innerHTML = html;
  }

  escapeStr(s) {
    return String(s).replace(/'/g, "\\'").replace(/"/g, '&quot;');
  }

  checkAnswer(btn, selected, correct) {
    if (this.answered) return;
    this.answered = true;
    const buttons = this.container.querySelectorAll('.option-btn');
    buttons.forEach(b => {
      b.disabled = true;
      if (b.dataset.answer === correct) b.classList.add('correct');
    });
    const isCorrect = selected === correct;
    if (!isCorrect) btn.classList.add('wrong');
    if (isCorrect) {
      this.score++;
      const rect = btn.getBoundingClientRect();
      addXP(this.xpPerQuestion, rect.left + rect.width / 2, rect.top);
    }
    this.showFeedback(isCorrect, this.questions[this.current].explanation);
    setTimeout(() => { this.current++; this.render(); }, 2000);
  }

  checkFill() {
    if (this.answered) return;
    this.answered = true;
    const input = document.getElementById(`${this.quizId}-input`);
    const q = this.questions[this.current];
    const userAnswer = input.value.trim().toLowerCase().replace(/\s+/g, '');
    const acceptedAnswers = Array.isArray(q.answer) ? q.answer : [q.answer];
    const isCorrect = acceptedAnswers.some(a => String(a).toLowerCase().replace(/\s+/g, '') === userAnswer);
    if (isCorrect) {
      this.score++;
      const rect = input.getBoundingClientRect();
      addXP(this.xpPerQuestion, rect.left + rect.width / 2, rect.top);
      input.style.borderColor = 'var(--color-correct)';
    } else {
      input.style.borderColor = 'var(--color-wrong)';
    }
    this.showFeedback(isCorrect, q.explanation || `The correct answer is: ${acceptedAnswers[0]}`);
    setTimeout(() => { this.current++; this.render(); }, 2500);
  }

  showFeedback(isCorrect, explanation) {
    const fb = document.getElementById(`${this.quizId}-feedback`);
    fb.className = `quiz-feedback show ${isCorrect ? 'correct' : 'wrong'}`;
    fb.innerHTML = `
      <strong>${isCorrect ? '✅ Correct!' : '❌ Not quite!'}</strong>
      ${explanation ? `<div class="explanation">${explanation}</div>` : ''}
    `;
  }

  showResults() {
    const pct = Math.round((this.score / this.questions.length) * 100);
    const progress = getProgress();
    progress.quizScores[this.quizId] = { score: this.score, total: this.questions.length, pct };
    saveProgress(progress);
    if (this.topicId && this.sectionId) markSectionComplete(this.topicId, this.sectionId);
    checkBadges();

    let message = '';
    let emoji = '';
    if (pct === 100) { message = 'Perfect score! Outstanding!'; emoji = '🏆'; }
    else if (pct >= 80) { message = 'Excellent work! Nearly perfect!'; emoji = '🌟'; }
    else if (pct >= 60) { message = 'Good job! Keep practising!'; emoji = '👍'; }
    else if (pct >= 40) { message = 'Getting there! Review and try again.'; emoji = '💪'; }
    else { message = 'Keep studying! You\'ll get there!'; emoji = '📖'; }

    this.container.innerHTML = `
      <div class="quiz-score-summary">
        <div class="score-circle" style="border-color:${pct >= 60 ? 'var(--color-correct)' : 'var(--color-wrong)'}">
          ${pct}%
          <span>${this.score}/${this.questions.length}</span>
        </div>
        <div style="font-size:2rem;margin:.5rem 0">${emoji}</div>
        <h3>${message}</h3>
        <p style="margin-top:.5rem">You earned <strong>${this.score * this.xpPerQuestion} XP</strong> from this quiz!</p>
        <button class="btn-primary" style="margin-top:1.5rem" onclick="window.__quizzes['${this.quizId}'].restart()">🔄 Try Again</button>
      </div>
    `;
    if (this.onComplete) this.onComplete(this.score, this.questions.length);
  }

  restart() {
    this.current = 0;
    this.score = 0;
    this.questions = this.shuffleArray([...this.questions]);
    this.render();
  }
}

// Global quiz registry
window.__quizzes = {};
function createQuiz(containerId, questions, options) {
  const quiz = new QuizEngine(containerId, questions, options);
  window.__quizzes[options?.quizId || containerId] = quiz;
  return quiz;
}

// ======================== WORKED EXAMPLE REVEAL ========================
function initWorkedExamples() {
  document.querySelectorAll('.worked-example .step.hidden-step').forEach(step => {
    step.addEventListener('click', () => {
      step.classList.remove('hidden-step');
      step.classList.add('revealed');
    });
  });
}

// ======================== EXPLANATION TABS ========================
function initExplanationTabs() {
  document.querySelectorAll('.explanation-tabs').forEach(tabGroup => {
    const buttons = tabGroup.querySelectorAll('button');
    const parentSection = tabGroup.parentElement;
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const target = btn.dataset.tab;
        parentSection.querySelectorAll('.explanation-panel').forEach(panel => {
          panel.classList.toggle('active', panel.dataset.panel === target);
        });
      });
    });
  });
}

// ======================== SCROLL ANIMATIONS ========================
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ======================== INTERACTIVE GRAPH PLOTTER ========================
class GraphPlotter {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.width = options.width || 500;
    this.height = options.height || 400;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.xMin = options.xMin ?? -10;
    this.xMax = options.xMax ?? 10;
    this.yMin = options.yMin ?? -10;
    this.yMax = options.yMax ?? 10;
    this.gridColor = options.gridColor || 'rgba(255,255,255,0.06)';
    this.axisColor = options.axisColor || 'rgba(255,255,255,0.3)';
    this.functions = [];
  }

  toScreenX(x) { return ((x - this.xMin) / (this.xMax - this.xMin)) * this.width; }
  toScreenY(y) { return this.height - ((y - this.yMin) / (this.yMax - this.yMin)) * this.height; }

  drawGrid() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillRect(0, 0, this.width, this.height);

    // Grid lines
    ctx.strokeStyle = this.gridColor;
    ctx.lineWidth = 1;
    for (let x = Math.ceil(this.xMin); x <= this.xMax; x++) {
      ctx.beginPath();
      ctx.moveTo(this.toScreenX(x), 0);
      ctx.lineTo(this.toScreenX(x), this.height);
      ctx.stroke();
    }
    for (let y = Math.ceil(this.yMin); y <= this.yMax; y++) {
      ctx.beginPath();
      ctx.moveTo(0, this.toScreenY(y));
      ctx.lineTo(this.width, this.toScreenY(y));
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = this.axisColor;
    ctx.lineWidth = 2;
    // x-axis
    ctx.beginPath();
    ctx.moveTo(0, this.toScreenY(0));
    ctx.lineTo(this.width, this.toScreenY(0));
    ctx.stroke();
    // y-axis
    ctx.beginPath();
    ctx.moveTo(this.toScreenX(0), 0);
    ctx.lineTo(this.toScreenX(0), this.height);
    ctx.stroke();

    // Labels
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'center';
    for (let x = Math.ceil(this.xMin); x <= this.xMax; x++) {
      if (x === 0) continue;
      ctx.fillText(x, this.toScreenX(x), this.toScreenY(0) + 14);
    }
    ctx.textAlign = 'right';
    for (let y = Math.ceil(this.yMin); y <= this.yMax; y++) {
      if (y === 0) continue;
      ctx.fillText(y, this.toScreenX(0) - 6, this.toScreenY(y) + 4);
    }
  }

  plotFunction(fn, color = '#3b82f6', lineWidth = 2.5) {
    this.functions.push({ fn, color, lineWidth });
    this.redraw();
  }

  clearFunctions() {
    this.functions = [];
    this.redraw();
  }

  redraw() {
    this.drawGrid();
    this.functions.forEach(({ fn, color, lineWidth }) => {
      const ctx = this.ctx;
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      let started = false;
      const step = (this.xMax - this.xMin) / this.width;
      for (let x = this.xMin; x <= this.xMax; x += step) {
        const y = fn(x);
        if (isNaN(y) || !isFinite(y) || y < this.yMin - 5 || y > this.yMax + 5) {
          started = false;
          continue;
        }
        const sx = this.toScreenX(x);
        const sy = this.toScreenY(y);
        if (!started) { ctx.moveTo(sx, sy); started = true; }
        else ctx.lineTo(sx, sy);
      }
      ctx.stroke();
    });
  }
}

// ======================== NUMBER LINE WIDGET ========================
function drawNumberLine(canvasId, min, max, points = [], options = {}) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width = options.width || 500;
  const h = canvas.height = options.height || 80;
  const pad = 40;

  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.fillRect(0, 0, w, h);

  // Line
  const y = h / 2;
  ctx.strokeStyle = 'rgba(255,255,255,0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(pad, y);
  ctx.lineTo(w - pad, y);
  ctx.stroke();

  // Ticks and labels
  const range = max - min;
  const tickStep = options.tickStep || 1;
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.font = '11px Inter, sans-serif';
  ctx.textAlign = 'center';
  for (let v = min; v <= max; v += tickStep) {
    const x = pad + ((v - min) / range) * (w - 2 * pad);
    ctx.beginPath();
    ctx.moveTo(x, y - 6);
    ctx.lineTo(x, y + 6);
    ctx.stroke();
    ctx.fillText(v, x, y + 20);
  }

  // Points
  points.forEach(p => {
    const x = pad + ((p.value - min) / range) * (w - 2 * pad);
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fillStyle = p.color || '#3b82f6';
    ctx.fill();
    if (p.label) {
      ctx.fillStyle = p.color || '#3b82f6';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.fillText(p.label, x, y - 14);
    }
  });
}

// ======================== SHAPE DRAWING HELPERS ========================
function drawTriangle(ctx, x1, y1, x2, y2, x3, y3, fill, stroke) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.closePath();
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 2; ctx.stroke(); }
}

function drawCircleShape(ctx, cx, cy, r, fill, stroke) {
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 2; ctx.stroke(); }
}

// ======================== PROBABILITY SIMULATOR ========================
class DiceSimulator {
  constructor(canvasId, resultsId) {
    this.canvas = document.getElementById(canvasId);
    this.resultsEl = document.getElementById(resultsId);
    this.results = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    this.totalRolls = 0;
  }

  roll(times = 1) {
    for (let i = 0; i < times; i++) {
      const result = Math.floor(Math.random() * 6) + 1;
      this.results[result]++;
      this.totalRolls++;
    }
    this.draw();
  }

  reset() {
    this.results = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    this.totalRolls = 0;
    this.draw();
  }

  draw() {
    if (!this.canvas) return;
    const ctx = this.canvas.getContext('2d');
    const w = this.canvas.width = 500;
    const h = this.canvas.height = 250;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillRect(0, 0, w, h);

    const maxCount = Math.max(...Object.values(this.results), 1);
    const barW = 50;
    const gap = 20;
    const startX = (w - (6 * barW + 5 * gap)) / 2;
    const barAreaH = h - 60;

    for (let i = 1; i <= 6; i++) {
      const x = startX + (i - 1) * (barW + gap);
      const barH = (this.results[i] / maxCount) * barAreaH;
      const y = h - 30 - barH;

      // Bar
      const grad = ctx.createLinearGradient(x, y, x, h - 30);
      grad.addColorStop(0, '#3b82f6');
      grad.addColorStop(1, '#8b5cf6');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(x, y, barW, barH, [4, 4, 0, 0]);
      ctx.fill();

      // Label
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.font = 'bold 14px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(i, x + barW / 2, h - 12);

      // Count
      if (this.results[i] > 0) {
        ctx.fillStyle = '#fff';
        ctx.font = '11px Inter';
        ctx.fillText(this.results[i], x + barW / 2, y - 6);
      }
    }

    // Theoretical line
    if (this.totalRolls > 0) {
      const expected = this.totalRolls / 6;
      const expectedH = (expected / maxCount) * barAreaH;
      const ey = h - 30 - expectedH;
      ctx.strokeStyle = 'rgba(250,204,21,0.5)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.moveTo(startX - 10, ey);
      ctx.lineTo(startX + 6 * (barW + gap), ey);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(250,204,21,0.7)';
      ctx.font = '10px Inter';
      ctx.textAlign = 'left';
      ctx.fillText(`Expected: ${expected.toFixed(1)}`, startX + 6 * (barW + gap) - 90, ey - 5);
    }

    if (this.resultsEl) {
      this.resultsEl.textContent = `Total rolls: ${this.totalRolls}`;
    }
  }
}

// ======================== PIE/BAR CHART HELPER ========================
function drawBarChart(canvasId, data, options = {}) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width = options.width || 500;
  const h = canvas.height = options.height || 300;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.fillRect(0, 0, w, h);

  const pad = { top: 30, right: 20, bottom: 40, left: 50 };
  const maxVal = Math.max(...data.map(d => d.value));
  const barW = Math.min(50, (w - pad.left - pad.right) / data.length - 10);
  const gap = ((w - pad.left - pad.right) - barW * data.length) / (data.length + 1);
  const colors = options.colors || ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#ef4444'];

  data.forEach((d, i) => {
    const x = pad.left + gap + i * (barW + gap);
    const barH = (d.value / maxVal) * (h - pad.top - pad.bottom);
    const y = h - pad.bottom - barH;
    ctx.fillStyle = colors[i % colors.length];
    ctx.beginPath();
    ctx.roundRect(x, y, barW, barH, [4, 4, 0, 0]);
    ctx.fill();

    // Value
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 11px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(d.value, x + barW / 2, y - 6);

    // Label
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font = '10px Inter';
    ctx.fillText(d.label, x + barW / 2, h - pad.bottom + 16);
  });

  // Y axis
  ctx.strokeStyle = 'rgba(255,255,255,0.15)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad.left, pad.top);
  ctx.lineTo(pad.left, h - pad.bottom);
  ctx.lineTo(w - pad.right, h - pad.bottom);
  ctx.stroke();
}

function drawPieChart(canvasId, data, options = {}) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width = options.width || 300;
  const h = canvas.height = options.height || 300;
  ctx.clearRect(0, 0, w, h);

  const total = data.reduce((s, d) => s + d.value, 0);
  const cx = w / 2, cy = h / 2, r = Math.min(w, h) / 2 - 20;
  const colors = options.colors || ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#ef4444'];

  let angle = -Math.PI / 2;
  data.forEach((d, i) => {
    const sliceAngle = (d.value / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, angle, angle + sliceAngle);
    ctx.closePath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Label
    const midAngle = angle + sliceAngle / 2;
    const lx = cx + Math.cos(midAngle) * r * 0.65;
    const ly = cy + Math.sin(midAngle) * r * 0.65;
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px Inter';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if (d.value / total > 0.05) {
      ctx.fillText(`${d.label}`, lx, ly - 7);
      ctx.font = '10px Inter';
      ctx.fillText(`${Math.round(d.value / total * 100)}%`, lx, ly + 8);
    }
    angle += sliceAngle;
  });
}

// ======================== INITIALIZATION ========================
document.addEventListener('DOMContentLoaded', () => {
  buildSidebar();
  initWorkedExamples();
  initExplanationTabs();
  initScrollAnimations();
  updateXPDisplays();
});
