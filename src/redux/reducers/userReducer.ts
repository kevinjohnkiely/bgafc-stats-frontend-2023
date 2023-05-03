import { User } from '../../models/user';

interface CurrentUserState {
  loading: boolean;
  error: string | null;
  data: User | null;
}

interface Action {
  type: string;
  payload?: any;
}

const reducer = (state: CurrentUserState, action: Action): CurrentUserState => {
  switch (action.type) {
    case 'GET_LOGGED_IN_USER_INIT':
      return { loading: true, error: null, data: null };
    case 'GET_LOGGED_IN_USER_SUCCESS':
      return { loading: false, error: null, data: action.payload };
    case 'GET_LOGGED_IN_USER_ERROR':
      return { loading: false, error: action.payload, data: null };
    default:
      return state;
  }
};

export default reducer;
