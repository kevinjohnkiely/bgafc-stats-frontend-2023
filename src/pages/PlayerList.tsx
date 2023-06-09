import { useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { BiEdit } from 'react-icons/bi';
import { FaSort } from 'react-icons/fa';
import { TiDelete } from 'react-icons/ti';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/common/Loader';
import Notification from '../components/common/Notification';
import { Player } from '../models/player';
import { User } from '../models/user';
import styles from './../styles/PlayerList.module.css';

interface PlayerListProps {
  players: Player[];
  onPlayerEditClicked: (player: Player) => void;
  onDeletePlayerClicked: (slug: string) => void;
  onSetQueryString: (str: string) => void;
  onClearEditPlayer: () => void;
  error: string;
  loading: boolean;
  loggedInUser: User | null;
  loggedOutMsg: boolean;
}

const PlayerList = ({
  players,
  error,
  loading,
  onDeletePlayerClicked,
  onPlayerEditClicked,
  onClearEditPlayer,
  onSetQueryString,
  loggedInUser,
  loggedOutMsg,
}: PlayerListProps) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [playerToDelete, setPlayerToDelete] = useState('');

  return (
    <Container fluid className={styles.playerListLayout}>
      <h3>All-Time Player Statistics 1984 – present</h3>
      {loading ? (
        <Loader />
      ) : error ? (
        <Notification message={error} />
      ) : (
        <>
          {loggedOutMsg && <Notification message='You are now logged out' />}
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
                  Player
                  <FaSort
                    size={16}
                    color='white'
                    onClick={() => onSetQueryString('lastName')}
                  />
                </th>
                <th>
                  A Team Apps
                  <FaSort
                    size={16}
                    color='white'
                    onClick={() => onSetQueryString('-aTeamApps')}
                  />
                </th>
                <th>
                  A Team Goals
                  <FaSort
                    size={16}
                    color='white'
                    onClick={() => onSetQueryString('-aTeamGoals')}
                  />
                </th>
                <th>
                  B Team Apps
                  <FaSort
                    size={16}
                    color='white'
                    onClick={() => onSetQueryString('-bTeamApps')}
                  />
                </th>
                <th>
                  B Team Goals
                  <FaSort
                    size={16}
                    color='white'
                    onClick={() => onSetQueryString('-bTeamGoals')}
                  />
                </th>
                <th>
                  Total Apps
                  <FaSort
                    size={16}
                    color='white'
                    onClick={() => onSetQueryString('-totalApps')}
                  />
                </th>
                <th>
                  Total Goals
                  <FaSort
                    size={16}
                    color='white'
                    onClick={() => onSetQueryString('-totalGoals')}
                  />
                </th>
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
                      {loggedInUser && (
                        <Col lg={3}>
                          <BiEdit
                            size={24}
                            color='#339900'
                            onClick={() => {
                              onPlayerEditClicked(player);
                              navigate('/addplayer');
                            }}
                          />{' '}
                          <TiDelete
                            size={24}
                            color='red'
                            onClick={(e) => {
                              handleShow();
                              setPlayerToDelete(player.slug);
                              e.stopPropagation();
                            }}
                          />
                        </Col>
                      )}
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
              {loggedInUser && (
                <tr>
                  <td colSpan={7}>
                    <Link to={'/addplayer'}>
                      <Button
                        variant='success'
                        onClick={() => {
                          onClearEditPlayer();
                          // onPlayerCreatedClicked();
                        }}
                      >
                        Add Player
                      </Button>
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deleting Player</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this player?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            No
          </Button>
          <Button
            variant='danger'
            onClick={(e) => {
              onDeletePlayerClicked(playerToDelete);
              handleClose();
            }}
          >
            Yes!
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PlayerList;
