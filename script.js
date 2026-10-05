const GameBoard = (() => {
  let gameboard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  let isOver = false;
  function getStatus() {
    return isOver;
  }
  function resetGame() {
    gameboard = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];

    Game.start();
    isOver = false;
  }
  function setPlay(player, position, isOver) {
    if (isOver) {
      return;
    }

    const index = position.split("");
    if (gameboard[index[0]][index[1]] !== "") {
      return;
    }
    gameboard[index[0]][index[1]] = player.symbol;

    Game.changeTurns();
    DOMgameBoard.renderBoard(gameboard);
    return determineResult(player.symbol);
  }
  function determineResult(symbol) {
    let tie = "Tie";
    let isGameboardFull = true;
    for (row of gameboard) {
      for (cell of row) {
        if (cell === "") {
          isGameboardFull = false;
        }
      }
    }
    for (let row of gameboard) {
      let isRowMatch = true;
      for (let cell of row) {
        if (cell !== symbol || cell === "") {
          isRowMatch = false;
        }
      }
      if (isRowMatch) {
        isOver = true;
        return alert(symbol + " wins");
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
        isOver = true;
        return alert(symbol + " wins");
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
      isOver = true;
      return alert(symbol + " wins");
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
      isOver = true;
      return alert(symbol + " wins");
    }
    if (isGameboardFull) {
      isOver = true;
      return alert("Its a tie");
    }
    return "";
  }

  function getBoard() {
    return gameboard;
  }
  return { setPlay, getBoard, getStatus, resetGame };
})();
const DOMgameBoard = (() => {
  function renderBoard(gameboardArr) {
    const handler = document.createElement("div");
    handler.classList.add("handler");
    const turn = document.createElement("p");
    const winner = document.createElement("p");
    turn.classList.add("turn");
    winner.classList.add("winner");
    const controlContainer = document.createElement("div");

    const resetBtn = document.createElement("button");
    resetBtn.innerHTML = "Reset";

    const boardContainer = document.querySelector(".board-container");
    boardContainer.innerHTML = "";
    const gameboard = document.createElement("div");
    gameboard.classList.add("board");
    handler.appendChild(turn);
    handler.appendChild(resetBtn);
    boardContainer.appendChild(gameboard);

    boardContainer.appendChild(handler);
    turn.innerHTML = "It's " + Game.getCurrentPlayer().symbol + "'s turn!";
    boardContainer.appendChild(controlContainer);

    resetBtn.addEventListener("click", () => {
      GameBoard.resetGame();
    });

    gameboardArr.forEach((element, rindex) => {
      element.forEach((element, cindex) => {
        const cell = document.createElement("div");
        cell.id = `cell-${rindex}${cindex}`;
        cell.innerHTML = element;
        gameboard.appendChild(cell);
        cell.addEventListener("click", () => {
          const coordinates = cell.id.split("-");
          GameBoard.setPlay(
            Game.getCurrentPlayer(),
            coordinates[1],
            GameBoard.getStatus(),
          );
        });
      });
    });
  }
  return { renderBoard };
})();
const Player = function (symbol, turn) {
  return {
    symbol,
    turn,
  };
};
const Game = (() => {
  let turn = 1;
  const player1 = Player("x", 1);
  const player2 = Player("o", 2);
  function start() {
    turn = 1;
    DOMgameBoard.renderBoard(GameBoard.getBoard());
  }
  function getCurrentPlayer() {
    if (turn === 1) {
      return player1;
    } else {
      return player2;
    }
  }
  function changeTurns() {
    if (turn === 1) {
      turn = 2;
    } else {
      turn = 1;
    }
    return turn;
  }

  return { start, changeTurns, getCurrentPlayer };
})();

Game.start();
