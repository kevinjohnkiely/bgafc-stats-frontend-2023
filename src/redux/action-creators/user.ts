import { Dispatch } from 'redux';
import { ActionType } from '../actionTypes';
import { UserAction } from '../reducers/actions/user';

export const getLoggedInUser = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    dispatch({
      type: ActionType.GET_LOGGED_IN_USER_INIT,
    });

    const data = await fetch('/api/v1/users/getuser');
    
    if (data.status === 500) {
      dispatch({
        type: ActionType.GET_LOGGED_IN_USER_ERROR,
        payload: 'Server Error: Please try again soon.',
      });
    }

    const json = await data.json();
    // console.log('data returned in getlogged in user action creator' + json.data.user.username);
    if (json.message) {
      dispatch({
        type: ActionType.GET_LOGGED_IN_USER_ERROR,
        payload: json.message,
      });
    } else {
      dispatch({
        type: ActionType.GET_LOGGED_IN_USER_SUCCESS,
        payload: json.data.user?.username,
      });
    }
  };
};
