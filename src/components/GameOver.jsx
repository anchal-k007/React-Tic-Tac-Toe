const GameOver = ({ winner, onRestart }) => {
  let diplayStatement = "Game Drawn";
  if (winner) {
    diplayStatement = `${winner} won`;
  }

  return (
    <div id="game-over">
      <h2>Game Over</h2>
      <p>{diplayStatement}</p>
      <button onClick={onRestart}>Replay</button>
    </div>
  );
};

export default GameOver;
