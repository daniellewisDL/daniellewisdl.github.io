/**
 * Math Skills Pro - Main Application Logic
 */

// DOM Elements
const setSelect = document.getElementById('set-select');
const categorySelect = document.getElementById('category-select');
const loadBtn = document.getElementById('load-btn');
const randomBtn = document.getElementById('random-btn');

const resultsHeader = document.getElementById('results-header');
const currentSelectionTitle = document.getElementById('current-selection-title');
const questionCountBadge = document.getElementById('question-count-badge');
const questionsList = document.getElementById('questions-list');
const spinner = document.getElementById('loading-spinner');

// State
let selectedSet = null;
let selectedCategory = null;
let filteredQuestions = [];

// Initialize Application
function init() {
    // Note: questionsData is loaded globally from data.js
    if (typeof questionsData === 'undefined' || !questionsData || questionsData.length === 0) {
        showError("Data not loaded Properly. Please ensure data.js is generated and linked.");
        return;
    }
    
    populateSets();
    setupEventListeners();
    console.log(`App initialized with ${questionsData.length} questions`);
}

// Populate Set Dropdown
function populateSets() {
    // Extract unique Set_IDs
    const uniqueSets = [...new Set(questionsData.map(q => q.Set_ID))].sort((a, b) => a - b);
    
    // Create fragments for performance
    const fragment = document.createDocumentFragment();
    
    // Keep placeholder
    fragment.appendChild(setSelect.options[0].cloneNode(true));
    
    uniqueSets.forEach(setId => {
        const option = document.createElement('option');
        option.value = setId;
        option.textContent = `Question Set ${setId}`;
        fragment.appendChild(option);
    });
    
    setSelect.innerHTML = '';
    setSelect.appendChild(fragment);
}

// Populate Category Dropdown based on Set ID
function populateCategories(setId) {
    if (!setId) {
        // Reset category select
        categorySelect.innerHTML = '<option value="">Select a set first</option>';
        categorySelect.disabled = true;
        loadBtn.disabled = true;
        return;
    }
    
    // Get unique categories for this set
    const setQuestions = questionsData.filter(q => q.Set_ID === parseInt(setId));
    const uniqueCategories = [...new Set(setQuestions.map(q => q.Category))].sort();
    
    const fragment = document.createDocumentFragment();
    
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'All Categories (or choose one)';
    fragment.appendChild(defaultOption);
    
    uniqueCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        fragment.appendChild(option);
    });
    
    categorySelect.innerHTML = '';
    categorySelect.appendChild(fragment);
    categorySelect.disabled = false;
    loadBtn.disabled = false;
}

// Event Listeners
function setupEventListeners() {
    setSelect.addEventListener('change', (e) => {
        selectedSet = e.target.value;
        populateCategories(selectedSet);
        selectedCategory = ''; // Reset category
        
        // Auto-load if set changes and random wasn't used
        if (selectedSet) {
            loadQuestions();
        }
    });
    
    categorySelect.addEventListener('change', (e) => {
        selectedCategory = e.target.value;
        loadQuestions();
    });
    
    loadBtn.addEventListener('click', loadQuestions);
    
    randomBtn.addEventListener('click', loadRandomChallenge);
}

// Action: Load defined questions
function loadQuestions() {
    if (!selectedSet) return;
    
    showSpinner();
    
    // Use timeout to allow UI update before heavy filtering
    setTimeout(() => {
        // Filter logic
        filteredQuestions = questionsData.filter(q => {
            const matchSet = q.Set_ID === parseInt(selectedSet);
            const matchCategory = selectedCategory ? q.Category === selectedCategory : true;
            return matchSet && matchCategory;
        });
        
        // Sort by Question Number
        filteredQuestions.sort((a, b) => a.Question_No - b.Question_No);
        
        // Update Title
        const categoryText = selectedCategory ? ` - ${selectedCategory}` : ' (All)';
        currentSelectionTitle.textContent = `Set ${selectedSet}${categoryText}`;
        questionCountBadge.textContent = `${filteredQuestions.length} questions`;
        
        renderQuestions();
    }, 100);
}

// Action: View Random Challenge
function loadRandomChallenge() {
    showSpinner();
    
    setTimeout(() => {
        // Find maximum Set ID
        const maxSetId = Math.max(...questionsData.map(q => q.Set_ID));
        
        // Pick random set 1 to max
        const randomSetId = Math.floor(Math.random() * maxSetId) + 1;
        
        // Get all categories in that set
        const setQuestions = questionsData.filter(q => q.Set_ID === randomSetId);
        const categories = [...new Set(setQuestions.map(q => q.Category))];
        
        // Pick random category
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        
        // Update Selects reflecting random choices
        setSelect.value = randomSetId;
        selectedSet = randomSetId;
        
        populateCategories(randomSetId);
        categorySelect.value = randomCategory;
        selectedCategory = randomCategory;
        
        // Update variables and load
        loadQuestions();
        
        // Scroll to top for UX
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300); // Slight delay for dramatic effect
}

// Render DOM
function renderQuestions() {
    questionsList.innerHTML = '';
    
    if (filteredQuestions.length === 0) {
        questionsList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon"><i class="fa-solid fa-ghost"></i></div>
                <h3>No questions found</h3>
                <p>Try selecting a different set or category.</p>
            </div>
        `;
        hideSpinner();
        resultsHeader.classList.remove('hidden');
        return;
    }
    
    const fragment = document.createDocumentFragment();
    
    filteredQuestions.forEach((q, index) => {
        // Staggered animation delay
        const delay = (index % 10) * 0.05; 
        
        const card = document.createElement('div');
        card.className = 'question-card';
        card.style.animationDelay = `${delay}s`;
        
        // Convert markdown/math symbols nicely if needed. 
        // Example handles box character replacement if desired, or leaves as is
        const questionText = q.Question;
        
        card.innerHTML = `
            <div class="question-content">
                <div class="question-number"><i class="fa-solid fa-hashtag" style="font-size:0.7em"></i> Q${q.Question_No} &bull; ${q.Category}</div>
                <div class="question-text">${questionText}</div>
            </div>
            <div class="answer-container" id="ans-${q.Set_ID}-${q.Question_No}">
                <div class="answer-fader">
                    <button class="reveal-btn" aria-label="Reveal answer">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                    <div class="answer-text">
                        <span>${q.Answer}</span>
                    </div>
                </div>
            </div>
        `;
        
        // Attach event listener directly to button wrapper
        const answerContainer = card.querySelector('.answer-container');
        const revealBtn = card.querySelector('.reveal-btn');
        
        revealBtn.addEventListener('click', () => {
            answerContainer.classList.add('revealed');
            
            // Add sound effect or haptic feedback if applicable
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
        });
        
        fragment.appendChild(card);
    });
    
    questionsList.appendChild(fragment);
    
    hideSpinner();
    resultsHeader.classList.remove('hidden');
}

// UI Helpers
function showSpinner() {
    questionsList.innerHTML = '';
    resultsHeader.classList.add('hidden');
    spinner.classList.remove('hidden');
}

function hideSpinner() {
    spinner.classList.add('hidden');
}

function showError(msg) {
    questionsList.innerHTML = `
        <div class="empty-state" style="color: #ef4444;">
            <div class="empty-icon"><i class="fa-solid fa-triangle-exclamation"></i></div>
            <h3>Error loading data</h3>
            <p>${msg}</p>
        </div>
    `;
}

// Boot
document.addEventListener('DOMContentLoaded', init);
