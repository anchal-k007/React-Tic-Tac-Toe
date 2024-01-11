import { useState } from "react";

const Player = (props) => {
  const [edit, setEdit] = useState(false);
  const [playerName, setPlayerName] = useState(props.name);

  const handleButtonClick = () => {
    setEdit((prevState) => !prevState);
  };

  const handleNameEdit = (event) => {
    setPlayerName(event.target.value);
    if (edit) {
      props.onNameChange(props.symbol, event.target.value);
    }
  };

  let playerNameContent = <span className="player-name">{playerName}</span>;

  if (edit) {
    playerNameContent = (
      <input value={playerName} name="playerName" onChange={handleNameEdit} />
    );
  }

  return (
    <li className={props.highlight ? "active" : ""}>
      <span className="player">
        {playerNameContent}
        <span className="player-Symbol">{props.symbol}</span>
      </span>
      <button onClick={handleButtonClick}>{edit ? "Save" : "Edit"}</button>
    </li>
  );
};

export default Player;
