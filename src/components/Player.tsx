import { Player as PlayerModel } from '../models/player';

interface PlayerProps {
  player: PlayerModel;
}

const Player = ({ player }: PlayerProps) => {
  return <div>Player</div>;
};

export default Player;
