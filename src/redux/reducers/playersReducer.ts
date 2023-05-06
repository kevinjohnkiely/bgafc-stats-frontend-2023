import { Player } from '../../models/player';
import { ActionType } from '../actionTypes';
import { PlayersAction } from './actions/players';

interface CurrentPlayersState {
  loading: boolean;
  error: string | null;
  players: Player[];
}

const initState = {
  loading: false,
  error: null,
  players: [],
};

const reducer = (
  state: CurrentPlayersState = initState,
  action: PlayersAction
): CurrentPlayersState => {
  switch (action.type) {
    case ActionType.GET_PLAYERS_INIT:
      return { loading: true, error: null, players: [] };
    case ActionType.GET_PLAYERS_SUCCESS:
      return { loading: false, error: null, players: action.payload };
    case ActionType.GET_PLAYERS_ERROR:
      return { loading: false, error: action.payload, players: [] };
    default:
      return state;
  }
};

export default reducer;
