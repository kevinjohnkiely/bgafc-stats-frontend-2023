import { combineReducers } from 'redux';
import userReducer from './userReducer';
import playerReducer from './playersReducer';

const reducers = combineReducers({
  user: userReducer,
  players: playerReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
