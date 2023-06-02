import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Loader from '../components/common/Loader';
import Notification from '../components/common/Notification';
import blank from '../assets/images/blank.jpg';
import styles from './../styles/PlayerSingle.module.css';
import { useNavigate } from 'react-router-dom';

import { Player as PlayerModel } from '../models/player';
import {
  Container,
  Row,
  Col,
  Image,
  Table,
  Button,
  Modal,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { User } from '../models/user';
import { BiEdit } from 'react-icons/bi';
import { TiDelete } from 'react-icons/ti';
import { Season } from '../models/season';

interface PlayerSingleProps {
  loggedInUser: User | null;
  onSeasonEditClicked: (season: Season) => void;
  onClearEditSeason: () => void;
}

const PlayerSingle = ({
  loggedInUser,
  onSeasonEditClicked,
  onClearEditSeason,
}: PlayerSingleProps) => {
  const [player, setPlayer] = useState<PlayerModel>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [seasonToDelete, setSeasonToDelete] = useState('');
  const navigate = useNavigate();

  const { slug } = useParams();

  useEffect(() => {
    const fetchPlayer = async () => {
      console.log('USE EFFECT RUNS in player single');
      setLoading(true);
      const data = await fetch(`/api/v1/players/${slug}`);
      if (data.status === 500) {
        setError('Server Error: Please try again soon.');
        setLoading(false);
      }
      const json = await data.json();
      if (json.message) {
        console.log(json.message);
        setError(json.message);
      } else {
        setPlayer(json.data.player);
      }
      setLoading(false);

      // return json;
    };
    fetchPlayer();
  }, [slug]);

  const deleteSeason = async (seasonId: string) => {
    await fetch(`/api/v1/seasons/${seasonId}`, {
      method: 'DELETE',
    });
    console.log(seasonId);
    // navigate(`/players/${slug}`);
    navigate(0);
  };

  return (
    <Container fluid style={{ padding: '0 5rem 0 5rem' }}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Notification message={error} />
      ) : (
        <>
          <Row>
            <h3 className={styles.playerHeading}>
              {player?.firstName} {player?.lastName}
            </h3>
          </Row>

          <Row>
            <Col lg={2} md={4}>
              <Image src={blank} />
            </Col>
            <Col lg={10} md={8}>
              <span className={styles.greenBold}>
                Appearances: {player?.totalApps} Goals: {player?.totalGoals}
              </span>
              <br />
              Date of Birth: {player?.dateOfBirth}
              <br />
              Position: {player?.position}
              <br />
              Debut: {player?.debut}
              <br />
              First Goal: {player?.firstGoal}
            </Col>
          </Row>
          <Row>
            <Col className={styles.honoursPanel}>
              Honours: {player?.honours}
            </Col>
          </Row>
          <Row>
            <Col className={styles.appsPanel}>
              Appearances (Goals in brackets)
            </Col>
          </Row>
          <Row>
            <Table bordered hover className={styles.statsTable}>
              <thead>
                <tr>
                  <th>Season</th>
                  <th>Team</th>
                  <th>Div</th>
                  <th>Lge</th>
                  <th>FAI</th>
                  <th>MJC</th>
                  <th>MSC</th>
                  <th>Des C</th>
                  <th>Lge C</th>
                  <th>Reidy C</th>
                  <th>Hogan C</th>
                  <th>Total</th>
                  <th>Career</th>
                </tr>
              </thead>
              <tbody>
                {player?.seasons.map((season) => (
                  <tr key={season._id}>
                    <td>
                      {season.season}{' '}
                      {loggedInUser && (
                        <>
                          <BiEdit
                            size={24}
                            color='#339900'
                            onClick={() => {
                              onSeasonEditClicked(season);
                              navigate(
                                `/addseason/${player?._id}/${player?.slug}`
                              );
                            }}
                          />{' '}
                          <TiDelete
                            size={24}
                            color='red'
                            onClick={() => {
                              handleShow();
                              setSeasonToDelete(season._id);
                            }}
                          />
                        </>
                      )}
                    </td>
                    <td>{season.team}</td>
                    <td>{season.division}</td>
                    <td>
                      {season.lge_apps} ({season.lge_goals})
                    </td>
                    <td>
                      {season.fai_apps} ({season.fai_goals})
                    </td>
                    <td>
                      {season.mjc_apps} ({season.mjc_goals})
                    </td>
                    <td>
                      {season.msc_apps} ({season.msc_goals})
                    </td>
                    <td>
                      {season.desc_apps} ({season.desc_goals})
                    </td>
                    <td>
                      {season.lgec_apps} ({season.lgec_goals})
                    </td>
                    <td>
                      {season.reidyc_apps} ({season.reidyc_goals})
                    </td>
                    <td>
                      {season.hoganc_apps} ({season.hoganc_goals})
                    </td>
                    <td>
                      {season.team === 'A'
                        ? `${season.seasonTotalAppsA} (${season.seasonTotalGoalsA})`
                        : `${season.seasonTotalAppsB} (${season.seasonTotalGoalsB})`}
                    </td>
                    <td>
                      {/* {season.hoganc_apps} ({season.hoganc_goals}) */}
                    </td>
                  </tr>
                ))}
                {loggedInUser && (
                  <tr>
                    <td colSpan={13}>
                      <Link to={`/addseason/${player?._id}/${player?.slug}`}>
                        <Button variant='success' onClick={onClearEditSeason}>
                          Add Season Stats
                        </Button>
                      </Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Row>
          
        </>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deleting Season</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this season data?
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            No
          </Button>
          <Button
            variant='danger'
            onClick={(e) => {
              // onDeletePlayerClicked(player.slug);
              deleteSeason(seasonToDelete);
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

export default PlayerSingle;
