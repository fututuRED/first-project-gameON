document.querySelectorAll("[data-key]").forEach((button) => {
  button.addEventListener("click", function () {
    const key = this.getAttribute("data-key");
    handleKeyPress(key);
  });
});

document.addEventListener("keydown", function (event) {
  const key = event.key.toLowerCase(); // Ensuring case-insensitivity
  if (key === "backspace" || key === "delete") {
    event.preventDefault();
    handleKeyPress("del");
  } else {
    handleKeyPress(key);
  }
});

let currentRow = 0;
let currentLetter = 0;
function handleKeyPress(key) {
  if (key === "enter") {
    console.log("Enter pressed");
  } else if (key === "del") {
    deleteLastLetter();
  } else {
    const rows = document.querySelectorAll("#game-container .row");
    const letters = rows[currentRow].querySelectorAll(".letter");

    if (currentLetter < letters.length) {
      letters[currentLetter].textContent = key;
      currentLetter++;
    }
  }

  // Additional logic, e.g., for when the row is complete or checks are needed
}

function advancingRow() {
  currentRow++;
  currentLetter = 0;
}

function deleteLastLetter() {
  if (currentLetter > 0) {
    currentLetter--;
  } else if (currentRow > 0) {
    currentRow--;

    const previousRowLetters = document
      .querySelectorAll(".row")
      [currentRow].querySelectorAll(".letter");
    currentLetter = previousRowLetters.length - 1;
  }
  if (currentRow >= 0 && currentLetter >= 0) {
    const targetCell = document
      .querySelectorAll(".row")
      [currentRow].querySelectorAll(".letter")[currentLetter];
    targetCell.textContent = "";
  }
}
