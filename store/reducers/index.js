import { combineReducers } from 'redux';
import { auth, user, loadUser, forgotPassword } from './users';
import { rooms, roomDetails } from './rooms';

const reducers = combineReducers({
  auth,
  user,
  loadUser,
  rooms,
  roomDetails,
  forgotPassword,
});

export default reducers;
