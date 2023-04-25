import React, { useState, useEffect } from 'react';
import { Player } from './../models/player';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import styles from './../styles/PlayerList.module.css';

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
    <Container fluid className={styles.playerListLayout}>
      <h3>All-Time Player Statistics 1984 – present</h3>
      <Table
        striped
        bordered
        hover
        style={{ width: '88%', margin: 'auto', textAlign: 'center' }}
      >
        <thead
          style={{ background: '#339900', color: 'white', fontSize: '13px' }}
        >
          <tr>
            <th style={{ width: '50%' }}>Player (Sort A-Z)</th>
            <th>A Team Apps</th>
            <th>A Team Goals</th>
            <th>B Team Apps</th>
            <th>B Team Goals</th>
            <th>Total Apps</th>
            <th>Total Goals</th>
          </tr>
        </thead>
        <tbody>
          {players.map(player => (
            <tr>
              <td><strong>{player.lastName.toUpperCase()}</strong>, {player.firstName}</td>
              <td>{player.aTeamApps}</td>
              <td>{player.aTeamGoals}</td>
              <td>{player.bTeamApps}</td>
              <td>{player.bTeamGoals}</td>
              <td>{player.aTeamApps + player.bTeamApps}</td>
              <td>{player.aTeamGoals + player.bTeamGoals}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default PlayerList;
