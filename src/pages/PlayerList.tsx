import React, { useState, useEffect } from 'react';
import { Player as PlayerModel } from '../models/player';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import styles from './../styles/PlayerList.module.css';
import Loader from '../components/common/Loader';
import { Link } from 'react-router-dom';

const PlayerList = () => {
  const [players, setPlayers] = useState<PlayerModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
      const data = await fetch('/api/v1/players');
      const json = await data.json();
      setLoading(false);
      setPlayers(json.data.players);
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
        <Table bordered hover>
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
              <tr key={player._id}>
                <td>
                  <Link to={`/players/${player.slug}`}>
                    <strong>{player.lastName.toUpperCase()}</strong>,{' '}
                    {player.firstName}
                  </Link>
                </td>
                <td>{player.aTeamApps}</td>
                <td>{player.aTeamGoals}</td>
                <td>{player.bTeamApps}</td>
                <td>{player.bTeamGoals}</td>
                <td>
                  <strong>{player.totalApps}</strong>
                </td>
                <td>
                  <strong>{player.totalGoals}</strong>
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
