const numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];
let flippedCards = [];
let matchedCards = [];
let moveCount = 0;
let canFlip = true;

const gameBoard = document.querySelector('.game-board');
const moveCounter = document.getElementById('move-counter');
const restartButton = document.getElementById('restart');

// Initialize game
function initGame() {
    moveCount = 0;
    moveCounter.textContent = moveCount;
    gameBoard.innerHTML = '';
    flippedCards = [];
    matchedCards = [];
    shuffleCards(numbers).forEach((number) => {
        const card = createCard(number);
        gameBoard.appendChild(card);
    });
}

// Shuffle cards array
function shuffleCards(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Create card element
function createCard(number) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.number = number;
    card.textContent = '?'; // Hidden by default
    card.addEventListener('click', flipCard);
    return card;
}

// Flip a card
function flipCard() {
    if (!canFlip || flippedCards.length >= 2 || this.classList.contains('flipped') || matchedCards.includes(this)) {
        return;
    }

    this.classList.add('flipped');
    this.textContent = this.dataset.number;
    flippedCards.push(this);
    moveCount++;
    moveCounter.textContent = moveCount;

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

// Check for matching cards
function checkMatch() {
    canFlip = false;
    const [card1, card2] = flippedCards;

    setTimeout(() => {
        if (card1.dataset.number === card2.dataset.number) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedCards.push(card1, card2);

            if (matchedCards.length === numbers.length) {
                alert('Congratulations! You matched all cards!');
            }
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '?';
            card2.textContent = '?';
        }

        flippedCards = [];
        canFlip = true;
    }, 1000);
}

// Restart game
restartButton.addEventListener('click', initGame);

// Start game on load
initGame();
