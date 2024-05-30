let correctWordObject;
let correctWord = "";
hintText = document.querySelectorAll(".hint");
let timeBtn;
let scoreBtn;
let startBtn;
let currentRow;
let currentLetter;
let timer;
let score = 0;
const wordText = document.querySelectorAll(".words.name");
let enteredWord = "";
  // const rows = document.querySelector(".row:not(.finish)");
  // const letters = rows.querySelectorAll(".letter");
  // const enteredWord = [...letters].map((x) => x.textContent);
document.querySelectorAll("[data-key]").forEach((button) => {
  button.addEventListener("click", function () {
    const key = this.getAttribute("data-key");
    handleKeyPress(key);
  });
});

document.addEventListener("keydown", function (event) {
  const rows = document.querySelector(".row:not(.finish)");
  const letters = rows.querySelectorAll(".letter");
  const key = event.key;
  if (key === "backspace" || key === "delete") {
    event.preventDefault();
    handleKeyPress("del");
  } else if (key === "Enter") {
    handleKeyPress("enter");
    checkGuess(rows, letters);
  } else {
    handleKeyPress(event.key.toLowerCase());
  }
});

function handleKeyPress(key) {
  const rows = document.querySelector(".row:not(.finish)");
  const letters = rows.querySelectorAll(".letter");
  console.log("key pressed:", key);
  if (key === "enter") {
    console.log("executing checkGuess.");
    checkGuess(rows, letters);
  } else if (key === "del" || key === "backspace") {
    deleteLastLetter(letters);
  } else {
    if (
      currentLetter < letters.length &&
      !letters[currentLetter].hasAttribute("data-completed")
    ) {
      letters[currentLetter].textContent = key.toUpperCase();
      currentLetter++;
    }
    else if(/^[a-zA-Z]$/.test(key)){ 
      const rows = document.querySelector(".row:not(.finish)");
      const letters = rows.querySelectorAll(".letter");
      if (currentLetter < letters.length) {
        letters[currentLetter].textContent = key.toUpperCase(); // Assuming you want uppercase letters displayed
        currentLetter++;
      }
    }
    
  }
}


// } else if (/^[a-zA-Z]$/.test(key) && currentLetter < 4) {


function deleteLastLetter(letters) {
  if (currentLetter > 0) {
    currentLetter--;
    letters[currentLetter].textContent = "";
  }
}

function initializeGame() {
  correctWordObject = words[Math.floor(Math.random() * words.length)];
  correctWord = correctWordObject.name.toLowerCase();
  currentRow = 1;
  currentLetter = 0;
  score = 0;
  startBtn = document.querySelector("#start");
  startBtn.addEventListener("click", startGame, { once: true });

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
  document.getElementById("start").classList.add("hidden")
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

function checkGuess(rows, letters) {
  let enteredWord = Array.from(letters)
    .map((cell) => cell.textContent.toLowerCase())
    .join("");
  letters.forEach((cell, index) => {
    console.log("checkGuess is in the making.");
    if (enteredWord[index] === correctWord[index]) {
      cell.classList.add("correct-position");
    } else if (correctWord.includes(enteredWord[index])) {
      cell.classList.add("wrong-position");
    } else {
      cell.classList.add("incorrect");
    }
  });
  if(enteredWord ===correctWord )
    {
      document.getElementById("keyboard-container").classList.add("hidden")
      document.getElementByClassName("keyboard-row").classList.add("hidden");
  
rows.textContent =""
    }
  markRowCompleted(rows);

  nextRow();
}

function markRowCompleted(currentRow) {
  //  if (!currentRow == document.querySelector(".row:not(.finish)"))
  currentRow.classList.add("finish");
  // currentRow ++;
}

function nextRow() {
  // currentRow++;
  currentLetter = 0;
  // const rows = document.querySelectorAll(".row:not(.finish)");
  // handleKeyPress()
  // resetGameBoard ()
  // nextWord()
}

function nextWord() {}
// //END GAME

// /**
//  * const winGame =() =>{
//  * cleanInterval (timer);
//  * WHATTO DISPLAY
//  * }
//  */

// const start = () =>{
//   //WHAT TO DISPLAY ??

// // MOST IMPORTANT SECTION
// const initGame = () => {
//   initTimer (30);
// let randomWord= words[Math.floor(Math.random()*words.length)];
// let wordArray=randomWord.word.split("")}