import { combineReducers } from 'redux';
import { auth, user, loadUser, forgotPassword } from './users';
import { rooms, roomDetails, createReview } from './rooms';
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
});

export default reducers;
