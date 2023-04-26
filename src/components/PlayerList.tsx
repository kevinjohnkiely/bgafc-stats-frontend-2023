import React, { useState, useEffect } from 'react';
import { Player } from './../models/player';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import styles from './../styles/PlayerList.module.css';
import Loader from './common/Loader';

const PlayerList = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
      const data = await fetch('/api/v1/players');
      const json = await data.json();
      setPlayers(json.data.players);
      setLoading(false);
      return json;
    };
    fetchPlayers().catch((e) => {
      setLoading(false);
      alert(e);
    });
  }, []);

  return (
    <Container fluid className={styles.playerListLayout}>
      <h3>All-Time Player Statistics 1984 – present</h3>
      {loading ? (
        <Loader />
      ) : (
        <Table bordered hover className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: '50%', lineHeight: '2.2rem' }}>
                Player (Sort A-Z)
              </th>
              <th>A Team Apps</th>
              <th>A Team Goals</th>
              <th>B Team Apps</th>
              <th>B Team Goals</th>
              <th>Total Apps</th>
              <th>Total Goals</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr>
                <td>
                  <strong>{player.lastName.toUpperCase()}</strong>,{' '}
                  {player.firstName}
                </td>
                <td>{player.aTeamApps}</td>
                <td>{player.aTeamGoals}</td>
                <td>{player.bTeamApps}</td>
                <td>{player.bTeamGoals}</td>
                <td>
                  <strong>{player.aTeamApps + player.bTeamApps}</strong>
                </td>
                <td>
                  <strong>{player.aTeamGoals + player.bTeamGoals}</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default PlayerList;
