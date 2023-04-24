import React, { useState, useEffect } from 'react';
import './App.css';
import { Player } from './models/player';

function App() {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const data = await fetch('/api/v1/players');
      const json = await data.json();
      console.log(json.data)
      setPlayers(json.data);
      return json;
    };
    fetchPlayers().catch(console.error);
  }, []);

  return (
    <div className='App'>
      <h1>Players:</h1>
      <p>{JSON.stringify(players)}</p>
    </div>
  );
}

export default App;
