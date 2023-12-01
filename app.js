let flippadeKort = [];
let antalSpelare = 1;
let matcher = 0;

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
scoreElement.innerText = score;
if (score === 6) {
console.log(`${antalSpelare} vinner!!`);
} else {
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
