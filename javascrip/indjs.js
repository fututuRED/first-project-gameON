let correctWordObject;
let correctWord;
hintText = document.querySelectorAll(".hint");
let timeBtn;
let scoreBtn;
let startBtn;
let currentRow = 0;
let currentLetter = 0;
let timer;
let score = 0;
const rows = document.querySelectorAll("#game-container .row");
const letters = rows[currentRow].querySelectorAll(".letter");
let enteredWord = "";

document.querySelectorAll("[data-key]").forEach((button) => {
  button.addEventListener("click", function () {
    const key = this.getAttribute("data-key");
    handleKeyPress(key);
  });
});

document.addEventListener("keydown", function (event) {
  const key = event.key; // Ensuring case-insensitivity
  if (key === "backspace" || key === "delete") {
    event.preventDefault();
    handleKeyPress("del");
  } else if (key === "Enter") {
    handleKeyPress("enter");
  } else {
    handleKeyPress(event.key.toLowerCase());
  }
});

document.getElementById("enter").addEventListener("click", function () {
  checkGuess();
  nextRow();
});

function handleKeyPress(key) {
  const rows = document.querySelectorAll("#game-container .row");
  const letters = rows[currentRow].querySelectorAll(".letter");

  if (key === "enter") {
    checkGuess();
    nextRow();
  } else if (key === "del" || key === "backspace") {
    deleteLastLetter();
  } else {
    if (
      currentLetter < letters.length &&
      !letters[currentLetter].hasAttribute("data-completed")
    ) {
      letters[currentLetter].textContent = key.toUpperCase();
      currentLetter++;
    }
  }
}

//   if (currentLetter === letters.length) {
//     checkGuess();
//     nextRow();
//   }
// } else if (/^[a-zA-Z]$/.test(key) && currentLetter < 4) {
//   // const rows = document.querySelectorAll("#game-container .row");
//   // const letters = rows[currentRow].querySelectorAll(".letter");

// }

function deleteLastLetter() {
  if (currentLetter > 0) {
    const rows = document.querySelectorAll("#game-container .row");
    const letters = rows[currentRow - 1].querySelectorAll(".letter");
    currentLetter--; // Move back one letter
    letters[currentLetter].textContent = "";
  }
}
//     currentLetter--;
//   } else if (currentRow > 0) {
//     currentRow--;

//     const previousRowLetters = document
//       .querySelectorAll(".row")
//       [currentRow].querySelectorAll(".letter");
//     currentLetter = previousRowLetters.length - 1;
//   }
//   if (currentRow >= 0 && currentLetter >= 0) {
//     const targetCell = document
//       .querySelectorAll(".row")
//       [currentRow].querySelectorAll(".letter")[currentLetter];
//     targetCell.textContent = "";
//   }
// }

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

function resetGameBoard() {
  const letterCells = document.querySelectorAll("#game-container .letter");
  letterCells.forEach((cell) => {
    cell.textContent = ""; // Clear text content of each cell
    cell.classList.remove("correct-position", "wrong-position", "incorrect"); // Remove any styling from previous game
  });
}
function enableStartButton() {
  const startBtn = document.getElementById("start");
  if (startBtn) {
    startBtn.disabled = false;
  }
}

function checkGuess() {
  if (currentRow < 1 || !correctWord) return;
  const rows = document.querySelectorAll("#game-container .row");
  const currentRowLetters = rows[currentRow - 1].querySelectorAll(".letter");

  let enteredWord = Array.from(currentRowLetters)
    .map((cell) => cell.textContent.toLowerCase())
    .join("");

  currentRowLetters.forEach((cell, index) => {
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

function markRowCompleted(rowIndex) {
  const rows = document.querySelectorAll("#game-container .row");
  if (rows.length > rowIndex) {
    const rowCells = rows[rowIndex].querySelectorAll(".letter");
    rowCells.forEach((cell) => {
      cell.classList.add("completed");
      cell.setAttribute("data-completed", "true");
    });
  }
}

function nextRow() {
  const maxRows = document.querySelectorAll("#game-container .row").length;
  if (currentRow < maxRows) {
    currentRow++;
    currentLetter = 0;
    checkGuess();
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
