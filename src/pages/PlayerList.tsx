import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { BiEdit } from 'react-icons/bi';
import { TiDelete } from 'react-icons/ti';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../components/common/Loader';
import Notification from '../components/common/Notification';
import { Player as PlayerModel } from '../models/player';
import { playersActionCreators } from '../redux';
import { useTypedSelector } from '../redux/redux-hooks/useTypedSelector';
import styles from './../styles/PlayerList.module.css';

const PlayerList = () => {
  console.log('rendering');
  const dispatch = useDispatch();
  const { players, error, loading } = useTypedSelector((state) => state.players);

  useEffect(() => {
    console.log('use effect running');
    dispatch(playersActionCreators.getPlayers() as any);
  }, [dispatch]);

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
            {players.map((player: PlayerModel) => (
              <tr key={player._id}>
                <td style={{ textAlign: 'left' }}>
                  <Row className='justify-content-between'>
                    <Col>
                      <Link to={`/players/${player.slug}`}>
                        <strong>{player.lastName.toUpperCase()}</strong>,{' '}
                        {player.firstName}
                      </Link>
                    </Col>

                    <Col lg={3}>
                      <BiEdit size={24} color='#339900' />{' '}
                      <TiDelete size={24} color='red' />
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
