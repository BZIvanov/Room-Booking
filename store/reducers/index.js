import { combineReducers } from 'redux';
import { auth, user } from './users';
import { rooms, roomDetails } from './rooms';

const reducers = combineReducers({ auth, user, rooms, roomDetails });

export default reducers;
