const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
let selectedWord = '';
const correctLetters = [];
const wrongLetters = [];


// Prints the message when all the words mispelled 

const positiveMessages = [
    "Believe you can and you're halfway there!",
    "You are capable of amazing things!",
    "Every day is a new opportunity to shine!",
    "You're on the right track! Keep going!",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "You're stronger than you think!",
    "Dream big and dare to fail!",
    "You have the power to create your own success story!",
    "Embrace the journey and trust the process!",
    "You are braver than you believe, stronger than you seem, and smarter than you think!",
    "Your positive action combined with positive thinking results in success!",
    "Difficult roads often lead to beautiful destinations!",
    "Every accomplishment starts with the decision to try!",
    "Keep your face always toward the sunshine, and shadows will fall behind you!",
    "You're unstoppable!",
    "You're amazing just the way you are!",
    "Your potential is endless!",
    "Today is your opportunity to build the tomorrow you want!",
    "Challenges are what make life interesting and overcoming them is what makes life meaningful!",
    "You're capable of achieving anything you set your mind to!",
];

//fetch words from API and data and get the selected word
function datafetch() {

    fetch('https://random-word-api.herokuapp.com/word')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Assign the random word to selectedWord
            selectedWord = data[0];
            console.log(selectedWord);

            displayWord();
            // Now you can use selectedWord in your application
        })
        .catch(error => {
            // Handle any errors that occur during the fetch operation
            console.error('Error fetching random words:', error);
        });
}


// the parts will be displayed when we enter the wrong letter
const figureParts = document.querySelectorAll('.figure-part');

// The constant no of words will be added in the const variable and selectedWord
// const words = ['application', 'programming', 'interface', 'wizard'];
// selectedWord = words[Math.floor(Math.random() * words.length)];
// The displayWord function will be called as per the definde number of words
// show hidden Word()
// function displayWord() {
//     wordEl.innerHTML = `
//     ${selectedWord
//             .split('')
//             .map(letter => `
//         <span class="letter">
//         ${correctLetters.includes(letter) ? letter : ''}
//         </span>
//         `)
//             .join('')
//         }`;



function displayWord() {
    wordEl.innerHTML = selectedWord
        .split('')
        .map(letter => `
            <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
            </span>`)
        .join('');

    const innerWord = wordEl.innerText.replace(/\n/g, '');

    if (innerWord === selectedWord) {
        finalMessage.innerHTML = 'Congragulations! You won! 😃';
        popup.style.display = 'flex';
    }

}

//Update 
function updateWrongLettersEl() {
    //Display wrong letters
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)
        }
    `;

    //Display parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if (index < errors) {
            part.style.display = 'block';
        }
        else {
            part.style.display = 'none';
        }
    });

    const randomIndex = Math.floor(Math.random() * positiveMessages.length);
    const randomMessage = positiveMessages[randomIndex];

    //Check if lost 
    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = randomMessage;
        popup.style.display = 'flex';
    }

}

//Show notification
function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}


// Keydown letter press
window.addEventListener('keydown', e => {
    const letter = e.key;
    if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
            correctLetters.push(letter);

            displayWord();
        }
        else {
            showNotification();
        }
    }
    else {
        if (!wrongLetters.includes(letter)) {
            wrongLetters.push(letter);

            updateWrongLettersEl();
        }
        else {
            showNotification();
        }
    }
});

// Restart game and play again 
playAgainBtn.addEventListener('click', () => {
    //Empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);
    //uncomment the below line if using the const defined no of words
    // selectedWord = words[Math.floor(Math.random() * words.length)];
    datafetch();
    displayWord();
    updateWrongLettersEl();
    popup.style.display = 'none';
});

datafetch();

