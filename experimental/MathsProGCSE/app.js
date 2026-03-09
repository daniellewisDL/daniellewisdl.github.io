// App Data is now loaded synchronously via <script> tags into window.appData
const appData = window.appData || {};

let appState = {
    selectedTopic: 'algebra',
    selectedSubtopic: null,
    selectedSubtopicName: '',
    questionType: 'practice', // 'practice' or 'exam'
    
    // Session State
    sessionQuestions: [],
    currentQuestionIndex: 0,
    score: 0,
    view: 'start' // 'start', 'session', 'results'
};

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

async function initApp() {
    // 1. Setup UI Listeners
    setupToggleListeners();
    setupDropdownListeners();
    setupButtonListeners();
    
    // 2. Initial Render
    renderSubtopics('algebra');
}

function setupToggleListeners() {
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            toggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            appState.questionType = btn.dataset.type;
        });
    });

    const settingsToggles = document.querySelectorAll('.toggle-switch');
    settingsToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
        });
    });
}

function setupDropdownListeners() {
    const dropdownHeader = document.querySelector('.dropdown-header');
    const dropdownBody = document.querySelector('.dropdown-body');
    
    // For this design, we'll keep the dropdown body visible and use the accordion
    // Usually a dropdown toggles visibility, but the UI shows it open.

    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', (e) => {
            const item = header.closest('.accordion-item');
            const topicKey = item.dataset.topic;

            // Toggle active state
            const wasActive = item.classList.contains('active');
            
            // Close all
            document.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('active');
                const chevron = i.querySelector('.chevron');
                if(chevron) chevron.setAttribute('name', 'chevron-down-outline');
            });

            if (!wasActive) {
                item.classList.add('active');
                header.querySelector('.chevron').setAttribute('name', 'chevron-up-outline');
                appState.selectedTopic = topicKey;
                
                // Render subtopics from pre-loaded data
                renderSubtopics(topicKey, item.querySelector('.subtopic-list'));
            }
        });
    });
}

function renderSubtopics(topicKey, listContainer = null) {
    if (!listContainer) {
        // Find the active container
        const activeItem = document.querySelector(`.accordion-item[data-topic="${topicKey}"]`);
        if (activeItem) {
            listContainer = activeItem.querySelector('.subtopic-list');
        }
    }

    if (!listContainer || !appData[topicKey]) return;

    listContainer.innerHTML = '';
    const subtopics = appData[topicKey].subtopics;

    subtopics.forEach((sub, index) => {
        const li = document.createElement('li');
        li.textContent = sub.name;
        li.dataset.id = sub.id;
        li.dataset.name = sub.name;
        
        // Select first by default if none selected
        if (appState.selectedTopic === topicKey && !appState.selectedSubtopic && index === 0) {
            appState.selectedSubtopic = sub.id;
            appState.selectedSubtopicName = sub.name;
            li.classList.add('selected');
            li.textContent = `${sub.name} (Selected)`;
        } else if (appState.selectedSubtopic === sub.id) {
            li.classList.add('selected');
            li.textContent = `${sub.name} (Selected)`;
        }

        li.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // If they clicked the Learn button, we handle it natively inline, otherwise standard selection
            if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;

            // Deselect all
            listContainer.querySelectorAll('li').forEach(item => {
                item.classList.remove('selected');
                // We recreate the inner HTML for deselected items to maintain the learn button structure
                const itemName = item.dataset.name;
                const itemId = item.dataset.id;
                item.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                        <span>${itemName}</span>
                        <button class="ghost-btn text-primary" style="padding:0; font-size:0.8rem;" onclick="appState.selectedTopic='${topicKey}'; appState.selectedSubtopic='${itemId}'; switchView('learn'); renderLearnView('${topicKey}', '${itemId}');">Learn</button>
                    </div>
                `;
            });
            
            // Select this
            li.classList.add('selected');
            li.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                    <span>${sub.name} (Selected)</span>
                    <button class="ghost-btn text-primary" style="padding:0; font-size:0.8rem;" onclick="appState.selectedTopic='${topicKey}'; appState.selectedSubtopic='${sub.id}'; switchView('learn'); renderLearnView('${topicKey}', '${sub.id}');">Learn</button>
                </div>
            `;
            
            appState.selectedSubtopic = sub.id;
            appState.selectedSubtopicName = sub.name;
        });

        // Initialize content layout
        li.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                <span>${sub.name}</span>
                <button class="ghost-btn text-primary" style="padding:0; font-size:0.8rem;" onclick="appState.selectedTopic='${topicKey}'; appState.selectedSubtopic='${sub.id}'; switchView('learn'); renderLearnView('${topicKey}', '${sub.id}');">Learn</button>
            </div>
        `;
        
        // Finalize initial state if selected
        if (li.classList.contains('selected')) {
            li.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                    <span>${sub.name} (Selected)</span>
                    <button class="ghost-btn text-primary" style="padding:0; font-size:0.8rem;" onclick="appState.selectedTopic='${topicKey}'; appState.selectedSubtopic='${sub.id}'; switchView('learn'); renderLearnView('${topicKey}', '${sub.id}');">Learn</button>
                </div>
            `;
        }

        listContainer.appendChild(li);
    });
}

function setupButtonListeners() {
    document.getElementById('btn-generate').addEventListener('click', startSession);
    
    // Safety check for action buttons that might not exist in the start view
    const checkBtn = document.getElementById('btn-check-answer');
    if (checkBtn) checkBtn.addEventListener('click', checkAnswer);
    
    const nextBtn = document.getElementById('btn-next-question');
    if (nextBtn) nextBtn.addEventListener('click', nextQuestion);
    
    const hintBtn = document.getElementById('btn-hint');
    if (hintBtn) hintBtn.addEventListener('click', showHint);
    
    const finishBtn = document.getElementById('btn-finish-early');
    if (finishBtn) finishBtn.addEventListener('click', finishSession);
    
    const returnHomeBtn = document.getElementById('btn-return-home');
    if (returnHomeBtn) {
        returnHomeBtn.addEventListener('click', () => {
            document.querySelector('.nav-item[data-view="home"]').click();
        });
    }
    
    // Allow 'Enter' key to check answer
    const answerInput = document.getElementById('answer-input');
    if (answerInput) {
        answerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const checkBtn = document.getElementById('btn-check-answer');
                const nextBtn = document.getElementById('btn-next-question');
                if (checkBtn && checkBtn.style.display !== 'none') {
                    checkAnswer();
                } else if (nextBtn && nextBtn.style.display !== 'none') {
                    nextQuestion();
                }
            }
        });
    }

    // Bottom Nav
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach((item) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            const targetView = item.dataset.view;
            if (targetView) {
                switchView(targetView);
                if (targetView === 'topics') {
                    renderTopicsLibrary();
                }
            }
        });
    });
}

function renderTopicsLibrary() {
    const grid = document.getElementById('topics-library-grid');
    if (!grid) return;
    
    grid.innerHTML = '';

    const icons = {
        number: 'calculator-outline',
        algebra: 'code-working-outline',
        ratio: 'pie-chart-outline',
        geometry: 'shapes-outline',
        probability: 'dice-outline',
        statistics: 'bar-chart-outline'
    };

    for (const [key, data] of Object.entries(appData)) {
        const card = document.createElement('div');
        card.className = 'library-card';
        card.innerHTML = `
            <ion-icon name="${icons[key] || 'book-outline'}"></ion-icon>
            <h3>${data.topic}</h3>
        `;
        card.addEventListener('click', () => {
            appState.selectedTopic = key;
            // Switch to Practice Start view but pre-select this topic in accordion
            const startNav = document.querySelector('.nav-item[data-view="start"]');
            if (startNav) startNav.click();
            
            // Open the specific accordion
            const accordionItem = document.querySelector(`.accordion-item[data-topic="${key}"]`);
            if (accordionItem && !accordionItem.classList.contains('active')) {
                const header = accordionItem.querySelector('.accordion-header');
                if (header) header.click();
            }
        });
        grid.appendChild(card);
    }
}

// Global Learn renderer
window.renderLearnView = function(topicKey, subtopicId) {
    const data = appData[topicKey];
    if (!data) return;

    const subtopic = data.subtopics.find(s => s.id === subtopicId);
    if (!subtopic) return;

    const titleEl = document.getElementById('learn-title');
    if (titleEl) titleEl.innerText = subtopic.name;
    
    const contentEl = document.getElementById('learn-content-html');
    if (contentEl) contentEl.innerHTML = subtopic.learn || "<p>Content coming soon...</p>";
};

/* --- Session Logic --- */

function startSession() {
    const topicData = appData[appState.selectedTopic];
    if (!topicData) return alert("Please wait for data to load.");

    const subtopic = topicData.subtopics.find(s => s.id === appState.selectedSubtopic);
    if (!subtopic) return alert("Please select a subtopic.");

    const questions = subtopic[appState.questionType];
    if (!questions || questions.length === 0) return alert("No questions available for this selection.");

    // Setup state
    appState.sessionQuestions = scrambleArray([...questions]);
    appState.currentQuestionIndex = 0;
    appState.score = 0;
    
    // Update UI
    document.getElementById('session-title-subtopic').textContent = appState.selectedSubtopicName;
    
    switchView('session');
    renderCurrentQuestion();
}

function renderCurrentQuestion() {
    const q = appState.sessionQuestions[appState.currentQuestionIndex];
    const total = appState.sessionQuestions.length;
    const currentNum = appState.currentQuestionIndex + 1;
    
    // Reset UI elements
    document.getElementById('answer-input').value = '';
    document.getElementById('answer-input').disabled = false;
    document.getElementById('answer-input').focus();
    
    document.getElementById('hint-container').style.display = 'none';
    document.getElementById('feedback-container').style.display = 'none';
    
    document.getElementById('btn-check-answer').style.display = 'flex';
    document.getElementById('btn-next-question').style.display = 'none';
    document.getElementById('btn-hint').style.display = 'block';

    // Populate data
    document.getElementById('session-counter').textContent = `Question ${currentNum} of ${total}`;
    
    const percent = Math.round((appState.currentQuestionIndex / total) * 100);
    document.getElementById('session-percent').textContent = `${percent}%`;
    document.getElementById('session-progress-fill').style.width = `${percent}%`;

    document.getElementById('question-text').textContent = `Q${currentNum}: ${q.q}`;
    document.getElementById('hint-text').textContent = q.hint;
}

function checkAnswer() {
    const inputEl = document.getElementById('answer-input');
    let userAns = inputEl.value.trim().toLowerCase();
    
    if (userAns === '') return; // Don't check empty

    const q = appState.sessionQuestions[appState.currentQuestionIndex];
    // Very rudimentary check. In a real math app, we'd need a math parser (like math.js) to compare expressions.
    // For this prototype, we do string matching or basic numeric comparison.
    let correctAnsOrig = q.a.toLowerCase();
    
    // Remove spaces for comparison (e.g., '3x + 2' vs '3x+2')
    let cleanUserAns = userAns.replace(/\s+/g, '');
    let cleanCorrectAns = correctAnsOrig.replace(/\s+/g, '');

    const isCorrect = (cleanUserAns === cleanCorrectAns);

    const feedbackEl = document.getElementById('feedback-container');
    feedbackEl.style.display = 'block';
    feedbackEl.className = 'feedback-container'; // reset

    inputEl.disabled = true;

    if (isCorrect) {
        appState.score++;
        feedbackEl.classList.add('success');
        feedbackEl.innerHTML = `<ion-icon name="checkmark-circle"></ion-icon> Correct!`;
    } else {
        feedbackEl.classList.add('error');
        feedbackEl.innerHTML = `<ion-icon name="close-circle"></ion-icon> Incorrect. The answer is: <strong>${q.a}</strong>`;
    }

    document.getElementById('btn-check-answer').style.display = 'none';
    document.getElementById('btn-next-question').style.display = 'flex';
    document.getElementById('btn-hint').style.display = 'none';
    
    // Change "Next Question" to "Finish" if it's the last one
    if (appState.currentQuestionIndex === appState.sessionQuestions.length - 1) {
        document.getElementById('btn-next-question').textContent = 'Finish Session';
    } else {
        document.getElementById('btn-next-question').textContent = 'Next Question';
    }
}

function showHint() {
    document.getElementById('hint-container').style.display = 'flex';
    document.getElementById('btn-hint').style.display = 'none';
}

function nextQuestion() {
    appState.currentQuestionIndex++;
    if (appState.currentQuestionIndex >= appState.sessionQuestions.length) {
        finishSession();
    } else {
        renderCurrentQuestion();
    }
}

function finishSession() {
    const total = appState.sessionQuestions.length;
    document.getElementById('final-score').textContent = `${appState.score}/${total}`;
    
    let msg = "Great job!";
    const percent = (appState.score / total);
    if (percent === 1) msg = "Perfect score! Outstanding!";
    else if (percent >= 0.7) msg = "Well done! Keep practicing.";
    else if (percent >= 0.4) msg = "Good effort. Try a few more times.";
    else msg = "Keep studying this topic. You'll get there!";
    
    document.getElementById('results-message').textContent = msg;
    
    switchView('results');
}

function returnHome() {
    switchView('start');
}

function switchView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.style.display = 'none');
    document.getElementById(`view-${viewId}`).style.display = 'block';
    
    // Ensure scroll to top
    document.querySelector('.main-content').scrollTop = 0;
}

// Utility: Fisher-Yates shuffle
function scrambleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Add a spin animation to CSS programmatically for loading
const style = document.createElement('style');
style.textContent = `
    @keyframes spin { 100% { transform: rotate(360deg); } }
    .spin { animation: spin 1s linear infinite; }
`;
document.head.appendChild(style);
