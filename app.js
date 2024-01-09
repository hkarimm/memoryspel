let flippadeKort = [];
let antalSpelare = 1;
let matcher = 0;
let p1Score = 0;
let p2Score = 0;
let completedCards = 0;

const winnerText = document.getElementById("winnerText")

function flipCard(card) {
    if (flippadeKort.length < 2 && matcher !== 2) {
        card.style.transform = 'rotateY(180deg)';
        flippadeKort.push(card);
        if (flippadeKort.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippadeKort;
    const img1 = card1.querySelector('.baksida img').src;
    const img2 = card2.querySelector('.baksida img').src;
    if (img1 === img2) {
        completedCards += 2;
        updateScore();
        flippadeKort = [];
        matcher++;
        if (matcher === 2) {
            matcher = 0;
        }
    } else {
        card1.style.transform = 'rotateY(0deg)';
        card2.style.transform = 'rotateY(0deg)';
        flippadeKort = [];
        switchPlayer();
        matcher = 0;
    }
    document.getElementById('antalSpelareText').innerText = `Spelare ${antalSpelare} `;
}

function updateScore() {
    const scoreElement = document.getElementById(`spelare-${antalSpelare}`);
    let score = parseInt(scoreElement.innerText);
    score++;
    if (antalSpelare == 1) {
        p1Score++;
    } else if (antalSpelare == 2) {
        p2Score++;
    }
    scoreElement.innerText = score;
    if ((p1Score > p2Score) && completedCards == 24) {
        winnerText.innerHTML = "Spelare 1 vinner!"
    } else if ((p2Score > p1Score) && completedCards == 24) {
        winnerText.innerHTML = "Spelare 2 vinner!"
    } else if ((p1Score == p2Score) && completedCards == 24) {
        winnerText.innerHTML = "Det blev oavgjort"
    }
}

function switchPlayer() {
    antalSpelare = antalSpelare === 1 ? 2 : 1;
    document.getElementById('antalSpelareText').innerText = `Spelare ${antalSpelare} `;
}

function shuffleCards() {
    let cards = document.querySelectorAll('.kort');
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * cards.length);
        card.style.order = randomPos;
    });
}

function resetGame() {
    flippadeKort = [];
    antalSpelare = 1;
    document.getElementById('spelare-1').innerText = '0';
    document.getElementById('spelare-2').innerText = '0';
    let cards = document.querySelectorAll('.kort');
        cards.forEach(card => {
        card.style.transform = 'rotateY(0deg)';
    });
    shuffleCards();
    document.getElementById('antalSpelare').innerText = `Spelare ${antalSpelare} `;
}
document.addEventListener("DOMContentLoaded", shuffleCards());