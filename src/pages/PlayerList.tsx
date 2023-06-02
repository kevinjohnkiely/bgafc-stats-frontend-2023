import { Player } from '../models/player';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import styles from './../styles/PlayerList.module.css';
import Loader from '../components/common/Loader';
import Notification from '../components/common/Notification';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { TiDelete } from 'react-icons/ti';
import { Row, Col, Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
import { User } from '../models/user';
import { useNavigate } from 'react-router-dom';

interface PlayerListProps {
  players: Player[];
  onPlayerEditClicked: (player: Player) => void;
  onDeletePlayerClicked: (slug: string) => void;
  onClearEditPlayer: () => void;
  error: string;
  loading: boolean;
  loggedInUser: User | null;
}

const PlayerList = ({
  players,
  error,
  loading,
  onDeletePlayerClicked,
  onPlayerEditClicked,
  onClearEditPlayer,
  loggedInUser,
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
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deleting Player</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this?</Modal.Body>
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
