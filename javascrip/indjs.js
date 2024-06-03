let correctWordObject;
let correctWord;
let correctHint;
let correctTranslate;
let hintElement;

let scoreBtn;
let startBtn;
let currentRow = 0;
let currentLetter = 0;
let score = 0;
let totalWordsGuessed = 0;
let usedWords = new Set();

document.querySelectorAll("[data-key]").forEach((button) => {
  button.addEventListener("click", function () {
    const key = this.getAttribute("data-key");
    handleKeyPress(key);
  });
});

document.addEventListener("keydown", function (event) {
  const key = event.key.toLowerCase();
  if (key === "backspace" || key === "delete") {
    event.preventDefault();
    handleKeyPress("del");
  } else if (key === "enter") {
    handleKeyPress("enter");
  } else {
    handleKeyPress(key);
  }
});

function gameOver() {
  if (score >= 2) {
    document.getElementById("results").textContent =
      "GAME OVER" +
      "Here's your score: " +
      score +
      ". Next time you'll do better ;-)";
  } else {
    document.getElementById("results").textContent =
      "GAME OVER" + "Here's your score: " + score + ". WELL DONE ;-)";
  }
}

function handleKeyPress(key) {
  const rows = document.querySelectorAll("#game-container .row");
  const currentRowElement = rows[currentRow];
  if (!currentRowElement) return;
  const letters = currentRowElement.querySelectorAll(".letter");

  if (key === "enter") {
    if (currentLetter === letters.length) {
      checkGuess();
    }
  } else if (key === "del" || key === "backspace") {
    deleteLastLetter();
  } else if (/^[a-z]$/.test(key) && currentLetter < letters.length) {
    letters[currentLetter].textContent = key.toUpperCase();
    currentLetter++;
  }
}

function deleteLastLetter() {
  if (currentLetter > 0) {
    currentLetter--;
    const rows = document.querySelectorAll("#game-container .row");
    const currentRowElement = rows[currentRow];
    const letters = currentRowElement.querySelectorAll(".letter");
    letters[currentLetter].textContent = "";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  initializeGame(); // Call the initializeGame function correctly here.
});

function initializeGame() {
  hintElement = document.getElementById("hint");
  startBtn = document.querySelector("#start");
  startBtn.addEventListener("click", startGame, { once: true });
  resetGameBoard();
  pickNewWord();
  console.log("Game initialized. Ready to start.");
}

function startGame() {
  resetGameBoard();
  pickNewWord();
  currentRow = 0;
  currentLetter = 0;
  score = 0;

  startBtn.disabled = true;

  console.log("New game started. The word to guess:", correctWord);
}

function resetGameBoard() {
  const letterCells = document.querySelectorAll("#game-container .letter");
  letterCells.forEach((cell) => {
    cell.textContent = ""; // Clear text content of each cell
    cell.classList.remove(
      "correct-position",
      "wrong-position",
      "incorrect",
      "completed"
    );
  });
}

function checkGuess() {
  const rows = document.querySelectorAll("#game-container .row");
  if (currentRow >= rows.length) {
    console.error("No more rows.");
    return;
  }
  const currentRowElement = rows[currentRow];
  const currentRowLetters = currentRowElement.querySelectorAll(".letter");
  let enteredWord = Array.from(currentRowLetters)
    .map((cell) => cell.textContent.toLowerCase())
    .join("");

  currentRowLetters.forEach((cell, index) => {
    if (correctWord.length > index) {
      if (enteredWord[index] === correctWord[index]) {
        cell.classList.add("correct-position");
      } else if (correctWord.includes(enteredWord[index])) {
        cell.classList.add("wrong-position");
      } else {
        cell.classList.add("incorrect");
      }
    }
  });
  markRowCompleted(currentRowElement);
  if (enteredWord === correctWord) {
    handleWin();
  } else if (currentRow === rows.length - 1) {
    handleLose();
  } else {
    currentRow++;
    currentLetter = 0;
  }
}

function markRowCompleted(currentRowElement) {
  currentRowElement.classList.add("finish");
}

function handleWin() {
  const letterCells = document.querySelectorAll("#game-container .letter");
  letterCells.forEach((cell) => {
    cell.classList.add("finish");
  });
  document.getElementById("results").textContent =
    "Here's the translation: " +
    correctTranslate.toUpperCase() +
    ". Well done! +1 ;-)";
  score++;
  document.getElementById("score").textContent = score;
  totalWordsGuessed++;
  if (totalWordsGuessed === 4) {
    gameOver();
  } else {
    nextWord();
  }
}

function handleLose() {
  console.log("You lose...");

  document.getElementById("results").textContent =
    "Here's the word: '" +
    correctWord.toUpperCase() +
    "' and its translation: " +
    correctTranslate.toUpperCase() +
    ". Now you know!";
  totalWordsGuessed++;
  if (totalWordsGuessed === 4) {
    gameOver();
  } else {
    nextWord();
  }
}

function nextRow() {
  const rows = document.querySelectorAll("#game-container .row");

  if (currentRow < rows.length - 1) {
    currentRow++;
    currentLetter = 0;
    console.log(rows.length);
  } else {
    console.log("All rows completed. Game over or next word.");
    nextWord();
  }
}

function nextWord() {
  document.querySelectorAll(".row").forEach((row) => {
    row.querySelectorAll(".letter").forEach((cell) => {
      cell.textContent = "";
      cell.classList.remove(
        "correct-position",
        "wrong-position",
        "incorrect",
        "finish"
      );
    });
    row.classList.remove("finish");
  });
  resetGameBoard();
  document.getElementById("results").textContent = "";
  currentRow = 0;
  currentLetter = 0;
  pickNewWord();
}

function pickNewWord() {
  do {
    correctWordObject = words[Math.floor(Math.random() * words.length)];
    correctWord = correctWordObject.name.toLowerCase();
  } while (usedWords.has(correctWord));
  correctTranslate = correctWordObject.translation.toLowerCase();
  correctHint = correctWordObject.hint.toLowerCase();
  usedWords.add(correctWord);
  if (hintElement) {
    hintElement.textContent = `Hint: ${correctHint}`;
  }
}
