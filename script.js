const GameBoard = (() => {
  const gameboard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  function setPlay(player, position) {
    const index = position.split("");
    gameboard[index[0]][index[1]] = player.symbol;
    return determineResult(player.symbol);
  }
  function determineResult(symbol) {
    for (let row of gameboard) {
      let isRowMatch = true;
      for (let cell of row) {
        if (cell !== symbol || cell === "") {
          isRowMatch = false;
        }
      }
      if (isRowMatch) {
        return symbol;
      }
    }
    for (let col = 0; col < gameboard.length; col++) {
      let isColmatch = true;
      for (let row = 0; row < gameboard.length; row++) {
        let currentCell = gameboard[row][col];
        if (currentCell !== symbol || currentCell === "") {
          isColmatch = false;
        }
      }
      if (isColmatch) {
        return symbol;
      }
    }
    let isDiagMatch1 = true;
    for (let diagStart = 0; diagStart < gameboard.length; diagStart++) {
      let currentCell = gameboard[diagStart][diagStart];
      if (currentCell !== symbol || currentCell === "") {
        isDiagMatch1 = false;
      }
    }
    if (isDiagMatch1) {
      return symbol;
    }
    let isDiagMatch2 = true;
    for (
      let diagStart = 0, diagStart2 = 2;
      diagStart < gameboard.length;
      diagStart++, diagStart2--
    ) {
      let currentCell = gameboard[diagStart][diagStart2];
      if (currentCell !== symbol || currentCell === "") {
        isDiagMatch2 = false;
      }
    }
    if (isDiagMatch2) {
      return symbol;
    }
    return false;
  }

  function getBoard() {
    return gameboard;
  }
  return { setPlay, getBoard };
})();
const DOMgameBoard = (() => {
  function renderBoard(gameboardArr) {
    const boardContainer = document.querySelector(".board-container");
    boardContainer.innerHTML = "";
    const gameboard = document.createElement("div");
    gameboard.classList.add("board");

    boardContainer.appendChild(gameboard);

    gameboardArr.forEach((element) => {
      element.forEach((element) => {
        const cell = document.createElement("div");
        cell.innerHTML = element;
        gameboard.appendChild(cell);
      });
    });
  }
  return { renderBoard };
})();
const Player = function (symbol) {
  return {
    symbol,
  };
};
const player1 = Player("x");
const player2 = Player("o");

GameBoard.setPlay(player1, "00");
GameBoard.setPlay(player2, "01");
GameBoard.setPlay(player1, "02");
const winner = document.querySelector(".winner");
winner.innerHTML = "hafafas";
DOMgameBoard.renderBoard(GameBoard.getBoard());
