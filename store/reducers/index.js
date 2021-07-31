import { combineReducers } from 'redux';
import { auth } from './users';
import { rooms, roomDetails } from './rooms';

const reducers = combineReducers({ auth, rooms, roomDetails });

export default reducers;
