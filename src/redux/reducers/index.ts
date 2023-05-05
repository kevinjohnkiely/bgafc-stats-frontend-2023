import { combineReducers } from 'redux';
import userReducer from './userReducer';
import playersReducer from './playersReducer';

const reducers = combineReducers({
  user: userReducer,
  players: playersReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
