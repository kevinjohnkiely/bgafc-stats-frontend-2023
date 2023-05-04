import { Player } from '../../models/player';
import { ActionType } from '../actionTypes';
import { PlayersAction } from './actions/players';

interface CurrentPlayersState {
  loading: boolean;
  error: string | null;
  data: Player[];
}

const initState = {
  loading: false,
  error: null,
  data: [],
};

const reducer = (
  state: CurrentPlayersState = initState,
  action: PlayersAction
): CurrentPlayersState => {
  switch (action.type) {
    case ActionType.GET_PLAYERS_INIT:
      return { loading: true, error: null, data: [] };
    case ActionType.GET_PLAYERS_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case ActionType.GET_PLAYERS_ERROR:
      return { loading: false, error: action.payload, data: [] };
    default:
      return state;
  }
};

export default reducer;
