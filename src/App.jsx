import Players from "./components/Players";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

// An array of array. Each element subarray conatains 3 co-ordinates in which the game can be won
const WINNING_COMBINATIONS = [
  [
    { row: 0, col: 0 },
    { row: 0, col: 1 },
    { row: 0, col: 2 },
  ],
  [
    { row: 1, col: 0 },
    { row: 1, col: 1 },
    { row: 1, col: 2 },
  ],
  [
    { row: 2, col: 0 },
    { row: 2, col: 1 },
    { row: 2, col: 2 },
  ],
  [
    { row: 0, col: 0 },
    { row: 1, col: 0 },
    { row: 2, col: 0 },
  ],
  [
    { row: 0, col: 1 },
    { row: 1, col: 1 },
    { row: 2, col: 1 },
  ],
  [
    { row: 0, col: 2 },
    { row: 1, col: 2 },
    { row: 2, col: 2 },
  ],
  [
    { row: 0, col: 0 },
    { row: 1, col: 1 },
    { row: 2, col: 2 },
  ],
  [
    { row: 0, col: 2 },
    { row: 1, col: 1 },
    { row: 2, col: 0 },
  ],
];

// the first element of the gameTurns array will contain the last player that played the move
function getCurrentPlayer(gameTurns) {
  // By default, X starts the game
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") currentPlayer = "O";

  return currentPlayer;
}

// helper function to create the gameBoard from the gameTurns array
function getGameBoard(gameTurns) {
  const gameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  // Traverse the gameTurns array and update the gameBoard
  for (const turn of gameTurns) {
    gameBoard[turn.rowIndex][turn.colIndex] = turn.player;
  }

  return gameBoard;
}

// Function to check that a winner has been decided
function getWinner(gameBoard) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    // Get the elements at the 3 positions
    const firstPosition = gameBoard[combination[0].row][combination[0].col];
    const secondPosition = gameBoard[combination[1].row][combination[1].col];
    const thirdPosition = gameBoard[combination[2].row][combination[2].col];

    // Check not null and all positions equal. If so, then there is a winner
    if (
      firstPosition !== null &&
      firstPosition === secondPosition &&
      firstPosition === thirdPosition
    ) {
      winner = firstPosition;
    }
  }

  return winner;
}

// Check if game is drawn (no winner and all 9 places filled)
function checkGameDrawn(gameTurns) {
  let gameDrawn;
  if (!winner && gameTurns.length === 9) gameDrawn = true;

  return gameDrawn;
}

function App() {
  // the gameBoard and Logs will be derived from this array only
  const [gameTurns, setGameTurns] = useState([]);
  // Here the name of the player is managed along with the symbol attached to the player. Name changes are updated as well
  const [gamePlayers, setGamePlayers] = useState({
    X: "Player 1",
    O: "Player 2",
  });

  const handleGamePlayerNameChange = (symbol, newName) => {
    setGamePlayers((prevState) => {
      return {
        ...prevState,
        [symbol]: newName,
      };
    });
  };

  const handleMoves = (rowIndex, colIndex) => {
    const currentPlayer = getCurrentPlayer(gameTurns);
    const updatedGameTurns = [
      { rowIndex, colIndex, player: currentPlayer },
      ...gameTurns,
    ];
    setGameTurns(updatedGameTurns);
  };

  // Get the current player from the gameTurns array
  const currentPlayer = getCurrentPlayer(gameTurns);

  // Create the gameBoard from the gameTurns array
  const gameBoard = getGameBoard(gameTurns);

  // Check if any of the winning combinations are present on the game board
  const winner = getWinner(gameBoard);

  // Check if the game is drawn
  let gameDrawn = checkGameDrawn(gameTurns);

  // Restart the game by resetting the gameTurns into an empty array
  const handleRestart = () => {
    setGameTurns([]);
  };

  return (
    <main>
      <div id="game-container">
        <Players
          player={currentPlayer}
          onNameChange={handleGamePlayerNameChange}
        />
        {(winner || gameDrawn) && (
          <GameOver winner={gamePlayers[winner]} onRestart={handleRestart} />
        )}
        <GameBoard onPlay={handleMoves} gameBoard={gameBoard} />
      </div>
      <Log gameTurns={gameTurns} />
    </main>
  );
}

export default App;
