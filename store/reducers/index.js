import { combineReducers } from 'redux';
import {
  auth,
  user,
  loadUser,
  forgotPassword,
  allUsers,
  updateUser,
} from './users';
import {
  rooms,
  roomDetails,
  createReview,
  reviewEligible,
  createRoom,
  updateRoom,
} from './rooms';
import {
  checkBooking,
  bookedDates,
  myBookings,
  booking,
  removeBooking,
} from './bookings';

const reducers = combineReducers({
  auth,
  user,
  loadUser,
  rooms,
  roomDetails,
  forgotPassword,
  checkBooking,
  bookedDates,
  myBookings,
  booking,
  createReview,
  reviewEligible,
  createRoom,
  updateRoom,
  removeBooking,
  allUsers,
  updateUser,
});

export default reducers;
