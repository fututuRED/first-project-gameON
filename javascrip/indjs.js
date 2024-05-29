let correctWordObject;
let correctWord;
let hintText = document.querySelectorAll(".hint");
let timeBtn;
let scoreBtn;
let startBtn;
let currentRow = 0;
let currentLetter = 0;
let timer;
let score = 0;

const rows = document.querySelector(".row:not(.finish)");
const letters = rows.querySelectorAll(".letter");
let enteredWord = "";

document.querySelectorAll("[data-key]").forEach((button) => {
  button.addEventListener("click", function () {
    const key = this.getAttribute("data-key");
    handleKeyPress(key);
  });
});

document.addEventListener("keydown", function (event) {
  const key = event.key;
  if (key === "backspace" || key === "delete") {
    event.preventDefault();
    handleKeyPress("del");
  } else if (key === "Enter") {
    handleKeyPress("enter");
  } else {
    handleKeyPress(event.key.toLowerCase());
  }
});

function handleKeyPress(key) {
  const rows = document.querySelector(".row:not(.finish)");
  if (!rows) return;
  const letters = rows.querySelectorAll(".letter");
  if (key === "enter") {
    checkGuess();
    nextRow();
  } else if (key === "del" || key === "backspace") {
    deleteLastLetter();
  } else {
    if (/^[a-zA-Z]$/.test(key) && letters < 4) {
      letters[currentLetter].textContent = key.toUpperCase();
      currentLetter++;
    }
  }
}

function deleteLastLetter() {
  if (currentLetter > 0) {
    currentLetter--;
    const rows = document.querySelector(".row:not(.finish)");
    const letters = rows.querySelectorAll(".letter");
    letters[currentLetter].textContent = "";
  }
}

function initializeGame() {
  correctWordObject = words[Math.floor(Math.random() * words.length)];
  correctWord = correctWordObject.name.toLowerCase();
  currentRow = 0;
  currentLetter = 0;
  score = 0;
  startBtn = document.querySelector("#start");
  startBtn.addEventListener("click", startGame, { once: true });

  resetGameBoard();

  currentRow = 1;
  currentLetter = 0;

  console.log("Game initialized. Ready to start.");

  startBtn.disabled = false;
}

document.addEventListener("DOMContentLoaded", initializeGame);

function startGame() {
  resetGameBoard();
  correctWordObject = words[Math.floor(Math.random() * words.length)];
  correctWord = correctWordObject.name.toLowerCase();

  currentRow = 0;
  currentLetter = 0;
  score = 0;

  startBtn.disabled = true;

  console.log("New game started.", "The word to guess:", correctWord);
}

function enableStartButton() {
  const startBtn = document.getElementById("start");
  if (startBtn) {
    startBtn.disabled = false;
  }
}

function resetGameBoard() {
  const letterCells = document.querySelectorAll("#game-container .letter");
  letterCells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("correct-position", "wrong-position", "incorrect"); // Remove any styling from previous game
  });
}

function checkGuess() {
  const rows = document.querySelector(".row: not(.finish)");
  const letters = rows.querySelector(".letter");

  let enteredWord = Array.from(rows)
    .map((cell) => cell.textContent.toLowerCase())
    .join("");

  letters.forEach((cell, index) => {
    if (enteredWord[index] === correctWord[index]) {
      cell.classList.add("correct-position");
    } else if (correctWord.includes(enteredWord[index])) {
      cell.classList.add("wrong-position");
    } else {
      cell.classList.add("incorrect");
    }
  });

  markRowCompleted(currentRow - 1);
  nextRow();
}

function markRowCompleted(rows) {
  rows.classList.add(".finish");
}

function nextRow() {
  const maxRows = document.querySelector(".row:not(.finish)").length;
  if (rows < maxRows) {
    rows++;
  } else {
    console.log("Game Over");
  }
}

// //END GAME

// /**
//  * const winGame =() =>{
//  * cleanInterval (timer);
//  * WHATTO DISPLAY
//  * }
//  */

// // const start = () =>{
// //   //WHAT TO DISPLAY ??
// // initGame();
// // }
// //MOST IMPORTANT SECTION

// // const initGame = () => {
// //   initTimer (30);
// // let randomWord= words[Math.floor(Math.random()*words.length)];
// // let wordArray=randomWord.word.split("");{{{[[{{}}]]}}}
