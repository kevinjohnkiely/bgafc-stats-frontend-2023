import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Loader from '../components/common/Loader';
import Alert from '../components/common/Alert';
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

  const { slug } = useParams();

  useEffect(() => {
    const fetchPlayer = async () => {
      setLoading(true);
      const data = await fetch(`/api/v1/players/${slug}`);
      const json = await data.json();
      console.log(json.message)
      setLoading(false);
      // console.log(json.data.player);
      setPlayer(json.data.player);
      return json;
    };
    fetchPlayer().catch((e) => {
      setLoading(false);
      console.log(e.message);
      // alert(e);
    });
  }, [slug]);

  return (
    <Container fluid style={{ padding: '0 5rem 0 5rem' }}>
      {loading ? (
        <Loader />
      ) : (
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
