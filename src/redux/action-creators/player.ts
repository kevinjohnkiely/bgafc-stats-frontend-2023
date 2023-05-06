import { Dispatch } from 'redux';
import { ActionType } from '../actionTypes';
import { PlayerAction } from '../reducers/actions/player';

export const getPlayer = (slug: string) => {
  return async (dispatch: Dispatch<PlayerAction>) => {
    dispatch({
      type: ActionType.GET_PLAYER_INIT,
    });

    const data = await fetch(`/api/v1/players/${slug}`);

    if (data.status === 500) {
      dispatch({
        type: ActionType.GET_PLAYER_ERROR,
        payload: 'Server Error: Please try again soon.',
      });
    }

    const json = await data.json();
    if (json.message) {
      dispatch({
        type: ActionType.GET_PLAYER_ERROR,
        payload: json.message,
      });
    } else {
      dispatch({
        type: ActionType.GET_PLAYER_SUCCESS,
        payload: json.data.player,
      });
    }
  };
};
