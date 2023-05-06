import { Player } from '../../models/player';
import { ActionType } from '../actionTypes';
import { PlayerAction } from './actions/player';

interface CurrentPlayerState {
  loading: boolean;
  error: string | null;
  player: Player | null;
}

const initState = {
  loading: false,
  error: null,
  player: null,
};

const reducer = (
  state: CurrentPlayerState = initState,
  action: PlayerAction
): CurrentPlayerState => {
  switch (action.type) {
    case ActionType.GET_PLAYER_INIT:
      return { loading: true, error: null, player: null };
    case ActionType.GET_PLAYER_SUCCESS:
      return { loading: false, error: null, player: action.payload };
    case ActionType.GET_PLAYER_ERROR:
      return { loading: false, error: action.payload, player: null };
    default:
      return state;
  }
};

export default reducer;
