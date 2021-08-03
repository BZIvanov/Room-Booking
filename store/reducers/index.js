import { combineReducers } from 'redux';
import { auth, user, loadUser, forgotPassword } from './users';
import {
  rooms,
  roomDetails,
  createReview,
  reviewEligible,
  createRoom,
} from './rooms';
import { checkBooking, bookedDates, myBookings, booking } from './bookings';

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
});

export default reducers;
