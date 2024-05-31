let correctWordObject;
let correctWord = "";
let correctTranslate = "";
let correctHint = "";
let timeBtn;
let scoreBtn;
let currentRow = 0;
let currentLetter = 0;
let score = 0;
let wordMax = 4;
let usedWords = new Set();
let hintElement;
let startElement;
let resetElement;
let countElement;
let counter = 200;
let IntervalId;
let totalWordsGuessed = 0;

document.addEventListener("DOMContentLoaded", function () {
  startElement = document.getElementById("start");
  resetElement = document.getElementById("reset");
  countElement = document.getElementById("count");
  hintElement = document.getElementById("hint");

  initializeGame();

  document.querySelectorAll("[data-key]").forEach((button) => {
    button.addEventListener("click", function () {
      const key = this.getAttribute("data-key");
      handleKeyPress(key);
    });
  });
  if (startElement) {
    startElement.addEventListener("click", startCountDown);
  }
  if (resetElement) {
    resetElement.addEventListener("click", () => {
      startElement.disabled = false;
      clearInterval(IntervalId);
      counter = 300; // Resetting the counter to its initial value
      countElement.textContent = counter; // Assuming countElement is also defined inside or globally accessible
      // Include any additional reset actions here
    });
  }

  document.addEventListener("keydown", function (event) {
    const rows = document.querySelector(".row");
    const letters = rows.querySelectorAll(".letter");
    const key = event.key;
    if (key === "backspace" || key === "delete") {
      event.preventDefault();
      handleKeyPress("del");
    } else if (key === "enter") {
      checkGuess(letters);
    } else {
      handleKeyPress(event.key.toLowerCase());
    }
  });
});

function startCountDown() {
  startElement.disabled = true;
  clearInterval(IntervalId);
  countElement.textContent = counter;
  IntervalId = setInterval(() => {
    counter--;
    countElement.textContent = counter;
    if (counter <= 0) {
      clearInterval(IntervalId);
      console.log("Time's UP!");
    }
  }, 1000);
}

function handleKeyPress(key) {
  const letterRegex = /^[a-z]$/i;
  if (
    !letterRegex.test(key) &&
    key !== "enter" &&
    key !== "del" &&
    key !== "backspace"
  ) {
    return;
  }
  const currentRowElement = document.querySelector(
    "#game-container .row:not(.finish)"
  );
  if (!currentRowElement) return;
}

const letters = currentRowElement.querySelectorAll(".letter");
if (key === "enter") {
  if (Array.from(letters).every((letter) => letter.textContent.trim() !== "")) {
    checkGuess(currentRowElement);
    currentLetter = 0;
    nextRow();
  }
} else if (key === "del" || key === "backspace") {
  deleteLastLetter();
} else if (
  currentLetter < letters.length &&
  !letters[currentLetter].hasAttribute("data-completed")
) {
  letters[currentLetter].textContent = key.toUpperCase();
  currentLetter++;
}

function deleteLastLetter() {
  const currentRowElement = document.querySelector(
    "#game-container .row:not(.finish)"
  );
  if (!currentRowElement || currentLetter <= 0) return;
  const letters = currentRowElement.querySelectorAll(".letter");
  currentLetter--;
  if (letters[currentLetter]) {
    letters[currentLetter].textContent = "";
  }
}

function initializeGame() {
  pickNewWord();
  hintElement.textContent = `Hint: ${correctHint}`;
}

function checkGuess(currentRowElement) {
  const letters = currentRowElement.querySelectorAll(".letter");
  let enteredWord = Array.from(letters)
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
  markRowCompleted(currentRowElement);
  if (enteredWord === correctWord) {
    handleWin();
  } else if (currentRow < wordMax - 1) {
    currentLetter = 0;
  } else {
    handleLose();
  }
}

function handleWin() {
  const letterCells = document.querySelectorAll("#game-container .letter");
  letterCells.forEach((cell) => {
    cell.classList.add("finish");
  });

  score++;
  document.getElementById("score").textContent = score;
  totalWordsGuessed++;

  document.getElementById("results").textContent =
    "Here's the translation:" +
    correctTranslate.toUpperCase() +
    ". Well done +1 ;-";
  nextWord();
}

function handleLose() {
  totalWordsGuessed++;

  document.getElementById("word").textContent = word + "/" + wordMax;
  document.getElementById("score").textContent = score;
  document.getElementById("enter").classList.add("hidden");

  console.log("you lose...");

  document.getElementById("results").textContent =
    "Here's the word:'" +
    correctWord.toUpperCase() +
    "' and its translation:" +
    correctTranslate.toUpperCase() +
    ". Now you know!";
  nextWord();
}

function markRowCompleted(currentRowElement) {
  currentRowElement.classList.add("finish");
  nextRow();
}

function nextRow() {
  const rows = document.querySelectorAll("#game-container .row");
  if (currentRow < rows.length - 1) {
    currentRow++;
    currentLetter = 0;
  } else {
    console.log("All rows completed. Game over or next word.");
    nextWord();
  }
}

function nextWord() {
  document.querySelectorAll(".row").forEach((row) => {
    row.classList.remove("finish");
  });
  resetGameBoard();
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

function resetGameBoard() {
  const letterCells = document.querySelectorAll("#game-container .letter");

  letterCells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("correct-position", "wrong-position", "incorrect");
  });
  currentRow = 0;
  currentLetter = 0;
}

function gameOver(isWin) {
  clearInterval(IntervalId);

  document.getElementById("keyboard-container").classList.add("hidden");
  document.getElementById("enter").classList.add("hidden");

  const message = isWin
    ? "Congratulations! You've won!"
    : "Game Over! Better luck next time!";

  document.getElementById("results").textContent = message;

  resetGameBoard();
  resetGameVariables();

  startElement.disabled = false;
}

function resetGameBoard() {
  const letterCells = document.querySelectorAll("#game-container .letter");
  letterTiles.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove(
      "correct-position",
      "wrong-position",
      "incorrect",
      "finish"
    );
  });
}

function resetGameVariables() {
  correctWordObject = null;
  correctWord = "";
  correctTranslate = "";
  correctHint = "";
  currentRow = 0;
  currentLetter = 0;
  score = 0;
  word = 0;
  usedWords.clear();
  counter = 200;
  countElement.textContent = counter;
}
