import { useState, useRef } from "react";

export default function Player() {
  const [enterPlyaerName, setEnterPlayerName] = useState(null);
  const playerName = useRef();

  function handleClick() {
    setEnterPlayerName(playerName.current.value);
     
  }
  return (
    <section id="player">
      <h2>Welcome {enterPlyaerName ?? 'unknown entity'}</h2>
      <p>
        <input ref={playerName} type="text"   />
        <button onClick={handleClick}> Set Name</button>
      </p>
    </section>
  );

}