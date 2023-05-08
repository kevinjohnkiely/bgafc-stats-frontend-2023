import { ActionType } from '../actionTypes';
import { LoginAction } from './actions/login';

interface CurrentLoginState {
  loading: boolean;
  error: string | null;
  user: string;
}

const initState = {
  loading: false,
  error: null,
  user: '',
};

const reducer = (
  state: CurrentLoginState = initState,
  action: LoginAction
): CurrentLoginState => {
  switch (action.type) {
    case ActionType.LOGIN_USER_INIT:
      return { loading: true, error: null, user: '' };
    case ActionType.LOGIN_USER_SUCCESS:
      return { loading: false, error: null, user: action.payload };
    case ActionType.LOGIN_USER_ERROR:
      return { loading: false, error: action.payload, user: '' };
    default:
      return state;
  }
};

export default reducer;
