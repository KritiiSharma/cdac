const words = ["apple", "banana", "orange", "grape", "kiwi", "kriti", "priya", "happy", "always", "reena", "world", "sneha", "cabbage", "flower", "rose", "almirah", "interaction", "behavior", "laptop", "computer", "enjoy", "life", "sharma", "ground"];
let userName;
let currentWord;
let attempts = 0;
let score = 0;

function startGame() {
    userName = document.getElementById("userName").value.trim();
    if (userName === "") {
        alert("Please enter your name.");
        return;
    }

    document.getElementById("welcome-container").style.display = "none";
    document.getElementById("game-container").style.display = "block";

    document.getElementById("greeting").innerText = `Welcome, ${userName}`;
    // document.getElementById("finalMessages").innerText = `${userName}`;

    startRound();
}

function startRound() {
    currentWord = getRandomWord();
    displayWord();
    document.getElementById("userGuess").value = "";
    document.getElementById("result").innerText = "";
    attempts = 0;
}

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function displayWord() {
    const jumbledWord = shuffleWord(currentWord);
    document.getElementById("word-container").innerText = jumbledWord;
}

function shuffleWord(word) {
    return word.split('').sort(() => Math.random() - 0.5).join('');
}




function checkGuess() {
    const userGuess = document.getElementById("userGuess").value.toLowerCase();

    // Hide the box and inline text before displaying the result
    document.getElementById("word-container").style.display = "none";

    if (userGuess === currentWord) {
        calculateScore();
    } else {
        attempts++;
        if (attempts < 3) {
            showResult(`Incorrect! Try again. (Attempts left: ${3 - attempts})`, "red");
        } else {
            showResult("Sorry, Game over! 😭", "red");
            document.getElementById("word-container").innerText = `The correct word was: ${currentWord}`;
            document.getElementById("userGuess").disabled = true;

            // Change color of submit button
            document.getElementById("submitGuessBtn").classList.add("game-over");
        }
    }

    // Show the box and inline text after displaying the result
    document.getElementById("word-container").style.display = "block";
}








function showResult(message, color) {
    document.getElementById("result").innerText = message;
    document.getElementById("result").style.color = color;
}

function calculateScore() {
    if (attempts === 0) {
        score = 100;
        showResult("Correct! 🌟", "green");
    } else if (attempts === 1) {
        score = 70;
        showResult("Correct! 😊", "green");
    } else if(attempts === 2) {
        score = 40;
        showResult("Correct! 😢", "green");
    }

    showFinalMarksAndMessage(score);
}

function showFinalMarksAndMessage(finalScore) {


        const finalMessage = getFinalMessage(finalScore);
        const userFinalMessage = `${finalMessage} ${userName}!`;
    
        document.getElementById("finalMarks").innerHTML = `Your marks: ${finalScore} ${getEmoji(finalScore)}`;
        document.getElementById("finalMessage").innerHTML = userFinalMessage;
    }
    

function getEmoji(score) {
    if (score === 100) return "⭐";
    if (score === 70) return "😊";
    if (score === 40) return "😢";
}

function getFinalMessage(score) {
    if (score === 100) return "Excellent , ";
    if (score === 70) return "Good job ,";
    if (score === 40) return "Nice try,  ";
}


function playAgain() {
    document.getElementById("userGuess").disabled = false;
    document.getElementById("finalMarks").innerText = "";
    document.getElementById("finalMessage").innerText = "";
    startRound();

    // Remove the "game-over" class from the submit button
    document.getElementById("submitGuessBtn").classList.remove("game-over");
}

