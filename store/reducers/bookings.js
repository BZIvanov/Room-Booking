import {
  CHECK_BOOKING_REQUEST,
  CHECK_BOOKING_SUCCESS,
  CHECK_BOOKING_RESET,
  CHECK_BOOKING_FAIL,
  BOOKED_DATES_SUCCESS,
  BOOKED_DATES_FAIL,
  MY_BOOKINGS_SUCCESS,
  MY_BOOKINGS_FAIL,
  BOOKING_SUCCESS,
  BOOKING_FAIL,
  ALL_BOOKINGS_REQUEST,
  ALL_BOOKINGS_SUCCESS,
  ALL_BOOKINGS_FAIL,
  REMOVE_BOOKING_REQUEST,
  REMOVE_BOOKING_SUCCESS,
  REMOVE_BOOKING_RESET,
  REMOVE_BOOKING_FAIL,
  CLEAR_ERRORS,
} from '../constants/bookings';

export const checkBooking = (state = { available: null }, action) => {
  switch (action.type) {
    case CHECK_BOOKING_REQUEST:
      return {
        loading: true,
      };
    case CHECK_BOOKING_SUCCESS:
      return {
        loading: false,
        available: action.payload,
      };
    case CHECK_BOOKING_RESET:
      return {
        loading: false,
        available: null,
      };
    case CHECK_BOOKING_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const bookedDates = (state = { dates: [] }, action) => {
  switch (action.type) {
    case BOOKED_DATES_SUCCESS:
      return {
        loading: false,
        dates: action.payload,
      };
    case BOOKED_DATES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const myBookings = (state = { bookings: [] }, action) => {
  switch (action.type) {
    case ALL_BOOKINGS_REQUEST:
      return {
        loading: true,
      };
    case MY_BOOKINGS_SUCCESS:
    case ALL_BOOKINGS_SUCCESS:
      return {
        loading: false,
        bookings: action.payload,
      };
    case MY_BOOKINGS_FAIL:
    case ALL_BOOKINGS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const booking = (state = { booking: {} }, action) => {
  switch (action.type) {
    case BOOKING_SUCCESS:
      return {
        loading: false,
        booking: action.payload,
      };
    case BOOKING_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const removeBooking = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_BOOKING_REQUEST:
      return {
        loading: true,
      };
    case REMOVE_BOOKING_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };
    case REMOVE_BOOKING_RESET:
      return {
        loading: false,
        isDeleted: false,
      };
    case REMOVE_BOOKING_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
