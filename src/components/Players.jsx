import Player from "./Player";
const Players = ({ player, onNameChange }) => {
  return (
    <ol id="players" className="highlight-player">
      <Player
        name="Player 1"
        symbol="X"
        onNameChange={onNameChange}
        highlight={player === "X" ? true : false}
      />
      <Player
        name="Player 2"
        symbol="O"
        onNameChange={onNameChange}
        highlight={player === "O" ? true : false}
      />
    </ol>
  );
};

export default Players;
