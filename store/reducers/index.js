import { combineReducers } from 'redux';
import { auth, user, loadUser, forgotPassword } from './users';
import { rooms, roomDetails } from './rooms';
import { checkBooking, bookedDates, myBookings } from './bookings';

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
});

export default reducers;
