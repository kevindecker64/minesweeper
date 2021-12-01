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


  for (let i = 0; i < width * width; i++) {
    const square = document.createElement("div");
    square.setAttribute("id", i);
    square.classList.add(shuffledArray[i])
    grid.appendChild(square);
    squares.push(square);
  }
}

createBoard();
