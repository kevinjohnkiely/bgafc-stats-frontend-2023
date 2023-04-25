import React, { useState, useEffect } from 'react';
import { Player } from './../models/player';

const PlayerList = () => {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const data = await fetch('/api/v1/players');
      const json = await data.json();
      console.log(json.data.players);
      setPlayers(json.data.players);
      return json;
    };
    fetchPlayers().catch(console.error);
  }, []);
  return (
    <div style={{backgroundColor: 'white'}}>
      <h1>Players:</h1>
      {players.map(player => <p>{player.firstName} {player.lastName}</p>)}
    </div>
  );
};

export default PlayerList;
