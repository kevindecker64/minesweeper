/*-- Constants --*/
const grid = document.querySelector(".grid");

/*-- Variables --*/
let width = 10;
let squares = [];

/*-- Cached Elements --*/

/*-- Event Listeners --*/

/*-- Functions --*/
function createBoard() {
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement("div");
    square.setAttribute("id", i);
    grid.appendChild(square);
    squares.push(square);
  }
}

createBoard();
