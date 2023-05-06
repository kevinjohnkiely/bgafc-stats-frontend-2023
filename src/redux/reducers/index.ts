import { combineReducers } from 'redux';
import userReducer from './userReducer';
import playersReducer from './playersReducer';
import playerReducer from './playerReducer';

const reducers = combineReducers({
  user: userReducer,
  players: playersReducer,
  player: playerReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
