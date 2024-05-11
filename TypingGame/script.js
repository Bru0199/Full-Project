// DOM Elements
const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');
const startBtn = document.getElementById('start-btn');

// Variables
let words;
let randomWord;
let score = 0;
let time = 10;
// let difficulty = localStorage.getItem('difficulty') || 'medium';
// Set difficulty to value in ls or medium
let difficulty =
    localStorage.getItem('difficulty') !== null
        ? localStorage.getItem('difficulty')
        : 'medium';

// Set difficulty select value
difficultySelect.value =
    localStorage.getItem('difficulty') !== null
        ? localStorage.getItem('difficulty')
        : 'medium';

let timeInterval;

// Initialize game
function init() {
    updateWordList();
    text.focus();

}

// Generate random word
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDOM() {
    randomWord = getRandomWord();
    word.textContent = randomWord;
}

// Update score
function updateScore() {
    score++;
    scoreEl.textContent = score;
}

// Update time
function updateTime() {
    time--;
    timeEl.textContent = `${time}s`;
    console.log(time);
    if (time === 0) {
        clearInterval(timeInterval);

        //end game
        gameOver();
    }
}

// Start timer
function startTimer() {
    timeInterval = setInterval(() => {
        updateTime();
    }, 1000);
    return timeInterval;
}

// Game Over
function gameOver() {
    clearInterval(timeInterval);
    endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Restart</button>
    `;

    endgameEl.style.display = 'flex';

}

// Update words array based on difficulty
function updateWordList() {
    switch (difficulty) {
        case 'easy':
            words = ["simple", "easy", "quick", "basic", "light"];
            break;
        case 'medium':
            words = ["marvelous", "beautiful", "laborious", "spacious", "anonymous", "delicious", "fascinate", "wonderful", "symphony", "fantastic", "mysterious", "gorgeous", "luxurious", "spontaneous", "enthusiasm", "adventure", "knowledge", "happiness", "potential", "resourceful", "community", "reflection", "celebrate", "magnificent", "experience"];
            break;
        case 'hard':
            words = ["challenging", "difficult", "complex", "demanding", "intricate"];
            break;
        default:
            break;
    }
}

function stopGame() {
    clearInterval(timeInterval); // Stop the timer
    time = 10; // Set timer to 0
    timeEl.textContent = `${time}s`; // Update timer display
    word.textContent = ''; // Clear the word display
    score = 0;
    scoreEl.textContent = score;
}

// Event Listeners
settingsBtn.addEventListener('click', () => {
    settings.classList.toggle('hide');
});

settingsForm.addEventListener('change', (e) => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
    updateWordList();
});

text.addEventListener('input', (e) => {
    const insertedText = e.target.value.trim();

    if (insertedText === randomWord) {
        addWordToDOM();
        updateScore();
        e.target.value = '';

        if (difficulty === 'hard') time += 3;
        else if (difficulty === 'medium') time += 4;
        else time += 6;

        updateTime();
    }
});

startBtn.addEventListener('click', () => {
    // Toggle between "Start" and "Stop" functionality
    if (startBtn.textContent === 'Start') {
        // Start button functionality
        startBtn.textContent = 'Stop';
        startBtn.classList.remove('start-btn');
        startBtn.classList.add('stop-btn');
        startGame(); // Start the game
    } else {
        // Stop button functionality
        startBtn.textContent = 'Start';
        startBtn.classList.remove('stop-btn');
        startBtn.classList.add('start-btn');
        stopGame(); // Stop the game
    }

});


// Start Game
function startGame() {
    init();
    startTimer();
    addWordToDOM();
}
// Initialize game on page load
init();