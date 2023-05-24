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

interface PlayerListProps {
  players: Player[];
  onPlayerClicked: (player: Player) => void;
  onDeletePlayerClicked: (slug: string) => void;
  error: string;
  loading: boolean;
}

const PlayerList = ({
  players,
  error,
  loading,
  onDeletePlayerClicked,
  onPlayerClicked,
}: PlayerListProps) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (slug: string) => setShow(true);

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
                      <BiEdit
                        size={24}
                        color='#339900'
                        onClick={() => onPlayerClicked(player)}
                      />{' '}
                      <TiDelete
                        size={24}
                        color='red'
                        onClick={(e) => {
                          handleShow(player.slug);
                          e.stopPropagation();
                        }}
                      />
                    </Col>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Deleting Player</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        Are you sure you want to delete this player?
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant='secondary' onClick={handleClose}>
                          No
                        </Button>
                        <Button
                          variant='danger'
                          onClick={(e) => {
                            onDeletePlayerClicked(player.slug);
                            handleClose();
                          }}
                        >
                          Yes!
                        </Button>
                      </Modal.Footer>
                    </Modal>
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
