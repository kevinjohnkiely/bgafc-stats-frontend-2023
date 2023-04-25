import { Card } from 'react-bootstrap';
import { Player as PlayerModel } from '../models/player';

interface PlayerProps {
  player: PlayerModel;
}

const Player = ({ player }: PlayerProps) => {
  const { firstName, lastName } = player;
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          {firstName} {lastName}
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

export default Player;
