import { Dispatch } from 'redux';
import { ActionType } from '../actionTypes';
import { PlayerAction } from '../reducers/actions/player';
import { CreatePlayerAction } from '../reducers/actions/createPlayer';
import { Player } from '../../models/player';

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

export const createPlayer = (player: Player) => {
  return async (dispatch: Dispatch<CreatePlayerAction>) => {
    dispatch({
      type: ActionType.CREATE_PLAYER_INIT,
    });

    const response = await fetch('/api/v1/players', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(player),
    });

    if (response.status === 500) {
      dispatch({
        type: ActionType.CREATE_PLAYER_ERROR,
        payload: 'Server Error: Please try again soon.',
      });
    }

    const playerData = await response.json();

    if (playerData.message) {
      dispatch({
        type: ActionType.CREATE_PLAYER_ERROR,
        payload: playerData.message,
      });
    } else {
      dispatch({
        type: ActionType.CREATE_PLAYER_SUCCESS,
        payload: playerData.data.player
        
      });
    }
  }
}