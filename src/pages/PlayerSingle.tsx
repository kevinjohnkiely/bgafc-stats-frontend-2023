import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Loader from '../components/common/Loader';
import Notification from '../components/common/Notification';
import blank from '../assets/images/blank.jpg';

import { Player as PlayerModel } from '../models/player';
import { Container, Row, Col, Image } from 'react-bootstrap';

// interface PlayerProps {
// player: PlayerModel;
// playerSlug: string
// }

const PlayerSingle = () => {
  const [player, setPlayer] = useState<PlayerModel>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const { slug } = useParams();

  useEffect(() => {
    const fetchPlayer = async () => {
      setLoading(true);
      const data = await fetch(`/api/v1/players/${slug}`);
      if (data.status === 500) {
        setError('Server Error: Please try again soon.')
        setLoading(false)
      }
      const json = await data.json();
      if (json.message) {
        console.log(json.message);
        setError(json.message)
      } else {
        setPlayer(json.data.player);
      }
      setLoading(false);
      
      // return json;
    };
    // fetchPlayer();
    fetchPlayer().catch((e) => {
      setLoading(false);
      console.log(e.message);
    });
  }, [slug]);

  return (
    <Container fluid style={{ padding: '0 5rem 0 5rem' }}>
      {loading ? (
        <Loader />
      ) : error ? (<Notification message={error} />) : (
        <>
          <Row>
            <h3>
              {player?.firstName} {player?.lastName}
            </h3>
          </Row>
          <hr />
          <Row>
            <Col lg={2}>
              <Image src={blank} />
            </Col>
            <Col lg={10}>
              Appearances: {player?.totalApps} Goals: {player?.totalGoals}
            </Col>
          </Row>
          <Row>table here</Row>
        </>
      )}
    </Container>
  );
};

export default PlayerSingle;
