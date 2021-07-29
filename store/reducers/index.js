import { combineReducers } from 'redux';
import { rooms, roomDetails } from './rooms';

const reducers = combineReducers({ rooms, roomDetails });

export default reducers;
