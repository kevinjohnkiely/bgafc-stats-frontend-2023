import { combineReducers } from 'redux';
import userReducer from './userReducer';
import playersReducer from './playersReducer';
import playerReducer from './playerReducer';
import loginReducer from './loginReducer';

const reducers = combineReducers({
  user: userReducer,
  players: playersReducer,
  player: playerReducer,
  loginUser: loginReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
