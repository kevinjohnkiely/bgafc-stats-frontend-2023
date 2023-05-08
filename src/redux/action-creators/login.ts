import { Dispatch } from 'redux';
import { ActionType } from '../actionTypes';
import { LoginAction } from '../reducers/actions/login';

export interface LoginCredentials {
  username: string;
  password: string;
}

export const loginUser = (loginCredentials: LoginCredentials) => {
  return async (dispatch: Dispatch<LoginAction>) => {
    dispatch({
      type: ActionType.LOGIN_USER_INIT,
    });

    const response = await fetch('/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginCredentials),
    });

    if (response.status === 500) {
      dispatch({
        type: ActionType.LOGIN_USER_ERROR,
        payload: 'Server Error: Please try again soon.',
      });
    }

    const user = await response.json();
    console.log('//////');
    console.log(user);

    if (user.message) {
      dispatch({
        type: ActionType.LOGIN_USER_ERROR,
        payload: user.message,
      });
    } else {
      dispatch({
        type: ActionType.LOGIN_USER_SUCCESS,
        payload: user.data.user?.username,
      });
    }
  };
};
