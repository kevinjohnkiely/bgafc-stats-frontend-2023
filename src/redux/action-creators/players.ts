import { Dispatch } from 'redux';
import { ActionType } from '../actionTypes';
import { PlayersAction } from '../reducers/actions/players';

export const getPlayers = () => {
  return async (dispatch: Dispatch<PlayersAction>) => {
    dispatch({
      type: ActionType.GET_PLAYERS_INIT,
    });

    const data = await fetch('/api/v1/players');

    if (data.status === 500) {
      dispatch({
        type: ActionType.GET_PLAYERS_ERROR,
        payload: 'Server Error: Please try again soon.',
      });
    }

    const json = await data.json();
    if (json.message) {
      dispatch({
        type: ActionType.GET_PLAYERS_ERROR,
        payload: json.message,
      });
    } else {
      dispatch({
        type: ActionType.GET_PLAYERS_SUCCESS,
        payload: json.data.players,
      });
    }
  };
};
