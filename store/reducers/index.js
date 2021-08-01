import { combineReducers } from 'redux';
import { auth, user, forgotPassword } from './users';
import { rooms, roomDetails } from './rooms';

const reducers = combineReducers({
  auth,
  user,
  rooms,
  roomDetails,
  forgotPassword,
});

export default reducers;
