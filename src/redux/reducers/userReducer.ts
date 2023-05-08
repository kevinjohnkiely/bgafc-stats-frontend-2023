import { User } from '../../models/user';
import { ActionType } from '../actionTypes';
import { UserAction } from './actions/user';

interface CurrentUserState {
  loading: boolean;
  error: string | null;
  user: User | {};
}

const initState = {
  loading: false,
  error: null,
  user: {},
};

const reducer = (
  state: CurrentUserState = initState,
  action: UserAction
): CurrentUserState => {
  switch (action.type) {
    case ActionType.GET_LOGGED_IN_USER_INIT:
      return { loading: true, error: null, user: {} };
    case ActionType.GET_LOGGED_IN_USER_SUCCESS:
      return { loading: false, error: null, user: action.payload };
    case ActionType.GET_LOGGED_IN_USER_ERROR:
      return { loading: false, error: action.payload, user: {} };
    default:
      return state;
  }
};

export default reducer;
