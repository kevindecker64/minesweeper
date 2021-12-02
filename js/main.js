/*-- Variables --*/
let playable = true;
let squares = [];
let width = 10;
let bombCount = 20;
let flagCount = 0;

/*-- Cached Elements --*/
const grid = document.querySelector(".grid");

/*-- Functions --*/
function createBoard() {
  const bombsArray = Array(bombCount).fill("bomb");
  const emptyArray = Array(width * width - bombCount).fill("valid");
  const gameArray = emptyArray.concat(bombsArray);
  const shuffledArray = gameArray.sort(() => Math.random() - 0.5);
  // fills board with bombs
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement("div");
    square.setAttribute("id", i);
    square.classList.add(shuffledArray[i]);
    grid.appendChild(square);
    squares.push(square);
    // adds event listeners for left/right clicks
    square.addEventListener("click", function (e) {
      click(square);
    });
    square.addEventListener("contextmenu", function (e) {
      e.preventDefault();
      placeFlag(square);
    });
  }
  // checks for bombs next to empty squares
  for (let i = 0; i < squares.length; i++) {
    const leftEdge = i % width === 0;
    const rightEdge = i % width === width - 1;
    const topEdge = i < width;
    const bottomEdge = i > width * width - (width + 1);
    let total = 0;
    if (squares[i].classList.contains("valid")) {
      // check Left
      if (!leftEdge && squares[i - 1].classList.contains("bomb")) {
        total++;
      }
      // check UpLeft
      if (
        !topEdge &&
        !leftEdge &&
        squares[i - 1 - width].classList.contains("bomb")
      ) {
        total++;
      }
      // check Up
      if (!topEdge && squares[i - width].classList.contains("bomb")) {
        total++;
      }
      // check UpRight
      if (
        !topEdge &&
        !rightEdge &&
        squares[i + 1 - width].classList.contains("bomb")
      ) {
        total++;
      }
      // check Right
      if (!rightEdge && squares[i + 1].classList.contains("bomb")) {
        total++;
      }
      // check DownRight
      if (
        !bottomEdge &&
        !rightEdge &&
        squares[i + 1 + width].classList.contains("bomb")
      ) {
        total++;
      }
      // check Down
      if (!bottomEdge && squares[i + width].classList.contains("bomb")) {
        total++;
      }
      // check DownLeft
      if (
        !bottomEdge &&
        !leftEdge &&
        squares[i - 1 + width].classList.contains("bomb")
      ) {
        total++;
      }
      // add total adjacent bombs to square
      squares[i].setAttribute("data", total);
    }
  }
}

function click(square) {
  let currentId = parseInt(square.id);
  console.log(currentId);
  if (!playable) return;
  if (
    square.classList.contains("checked") ||
    square.classList.contains("flag")
  ) {
    return;
  }
  if (square.classList.contains("bomb")) {
    gameOver(square);
    return;
  } else {
    let total = square.getAttribute("data");
    if (total != 0) {
      square.classList.add("checked");
      square.innerHTML = total;
      return;
    }
    checkSquare(currentId);
  }
  square.classList.add("checked");
}

function checkSquare(currentId) {
  const leftEdge = currentId % width === 0;
  const rightEdge = currentId % width === width - 1;
  const topEdge = currentId < width;
  const bottomEdge = currentId > width * width - (width + 1);
  setTimeout(() => {
    // check Left
    if (!leftEdge) {
      const newId = currentId - 1;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
    // check UpLeft
    if (!topEdge && !leftEdge) {
      const newId = currentId - 1 - width;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
    // check Up
    if (!topEdge) {
      const newId = currentId - width;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
    // check UpRight
    if (!topEdge && !rightEdge) {
      const newId = currentId + 1 - width;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
    // check Right
    if (!rightEdge) {
      const newId = currentId + 1;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
    // check DownRight
    if (!bottomEdge && !rightEdge) {
      const newId = currentId + 1 + width;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
    // check Down
    if (!bottomEdge) {
      const newId = currentId + width;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
    // check DownLeft
    if (!bottomEdge && !leftEdge) {
      const newId = currentId - 1 + width;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
  }, 10);
}

function placeFlag(square) {
  if (!playable) return;
  if (!square.classList.contains("checked")) {
    if (!square.classList.contains("flag") && flagCount < bombCount) {
      square.classList.add("flag");
      square.innerHTML = "🚩";
      flagCount++;
    } else if (square.classList.contains("flag")) {
      square.classList.remove("flag");
      square.innerHTML = "";
      flagCount--;
    }
  }
  console.log(flagCount);
  checkWin();
}

function gameOver(square) {
  console.log("Game Over!");
  playable = false;
  for (square of squares) {
    if (square.classList.contains("bomb")) {
      square.innerHTML = "💣";
    }
  }
}

function checkWin() {
  correctFlags = 0;
  for (square of squares) {
    if (
      square.classList.contains("flag") &&
      square.classList.contains("bomb")
    ) {
      correctFlags++;
    }
    if (correctFlags === bombCount) {
      console.log("YOU WIN!");
      playable = false;
    }
  }
}

createBoard();
