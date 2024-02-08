
const words = ["apple", "banana", "orange", "grape", "kiwi", "kriti", "priya", "happy", "always", "reena", "world", "sneha", "cabbage", "flower", "rose", "almirah", "interaction", "behavior", "laptop", "computer", "enjoy", "life", "sharma", "ground"];
let currentWord;
let shuffledWord;
let chances = 3;
let score = 0;
let playerName;

function startGame() {
    playerName = prompt("Enter your name:");
    document.getElementById("welcome-message").innerText = `Welcome ${playerName}, Let's start your Game.`;
    showGameContainer();
    newRound();
}

function showGameContainer() {
    document.getElementById("game-container").style.display = "block";
  
}

function newRound() {
    currentWord = getRandomWord();
    shuffledWord = shuffleWord(currentWord);
    document.getElementById("jumbled-word").innerText = shuffledWord;
    document.getElementById("user-input").value = "";
    document.getElementById("result").innerText = "";
}

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function shuffleWord(word) {
    return word.split("").sort(() => Math.random() - 0.5).join("");
}

function checkAnswer() {
    const userInput = document.getElementById("user-input").value.toLowerCase();
    if (userInput === currentWord) {
        if (chances === 3) {
            updateScore(100, "⭐", "Excellent!");
        } else if (chances === 2) {
            updateScore(70, "😊", "Good job!");
        } else if (chances === 1) {
            updateScore(40, "😢", "Nice try!");
        }
        newRound();
    } else {
        chances--;
        document.getElementById("result").innerText = `Wrong answer! Chances left: ${Math.max(chances, 0)}`;

        if (chances === 0) {
            endGame();
        }
    }
}

function updateScore(points, emoji, message) {
    score = points;
    document.getElementById("score").innerText = `Score: ${score} ${emoji} - ${message}`;
    document.getElementById("result").innerText = message;
}

function endGame() {
    document.getElementById("result").innerText = "Sorry, game over! 😭";
    document.getElementById("jumbled-word").innerText = "Game Over!";
    document.getElementById("user-input").disabled = true;
    document.getElementById("submit").disabled = true;
}

function playAgain() {
    chances = 3;
    score = 0;
    updateScore(0, "");
    newRound();
    document.getElementById("user-input").disabled = false;
    document.getElementById("submit").disabled = false;
}

startGame();
