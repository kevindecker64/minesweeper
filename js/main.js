/*-- Constants --*/
const grid = document.querySelector(".grid");

/*-- Variables --*/
let squares = [];
let width = 10;
let bombCount = 20;

/*-- Cached Elements --*/

/*-- Event Listeners --*/

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
      console.log(squares[i]);
    }
  }
}

createBoard();
