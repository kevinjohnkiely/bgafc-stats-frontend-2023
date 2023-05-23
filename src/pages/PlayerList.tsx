import React, { useState, useEffect } from 'react';
import { Player, Player as PlayerModel } from '../models/player';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import styles from './../styles/PlayerList.module.css';
import Loader from '../components/common/Loader';
import Notification from '../components/common/Notification';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { TiDelete } from 'react-icons/ti';
import { Row, Col } from 'react-bootstrap';
import { User } from '../models/user';

interface PlayerListProps {
  players: Player[];
  onDeletePlayerClicked: (slug: string) => void;
  error: string;
  loading: boolean;
}

const PlayerList = ({
  players,
  error,
  loading,
  onDeletePlayerClicked,
}: PlayerListProps) => {
  // const [players, setPlayers] = useState<PlayerModel[]>([]);
  // const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string>('');

  // useEffect(() => {
  //   const fetchPlayers = async () => {
  //     setLoading(true);
  //     const data = await fetch('/api/v1/players');
  //     if (data.status === 500) {
  //       setError('Server Error: Please try again soon.');
  //       setLoading(false);
  //     }
  //     const json = await data.json();
  //     if (json.message) {
  //       setError(json.message);
  //     } else {
  //       setPlayers(json.data.players);
  //     }
  //     setLoading(false);
  //   };
  //   fetchPlayers();
  // }, []);

  

  return (
    <Container fluid className={styles.playerListLayout}>
      <h3>All-Time Player Statistics 1984 – present</h3>
      {loading ? (
        <Loader />
      ) : error ? (
        <Notification message={error} />
      ) : (
        <Table bordered hover className={styles.playerTable}>
          <thead>
            <tr>
              <th
                style={{
                  width: '50%',
                  lineHeight: '2.2rem',
                  textAlign: 'left',
                }}
              >
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
                <td style={{ textAlign: 'left' }}>
                  <Row className='justify-content-between'>
                    <Col>
                      <Link to={`/players/${player.slug}`}>
                        <strong>{player.lastName?.toUpperCase()}</strong>,{' '}
                        {player.firstName}
                      </Link>
                    </Col>

                    <Col lg={3}>
                      <BiEdit size={24} color='#339900' />{' '}
                      <TiDelete
                        size={24}
                        color='red'
                        onClick={(e) => {
                          onDeletePlayerClicked(player.slug);
                          e.stopPropagation();
                        }}
                      />
                    </Col>
                  </Row>
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
