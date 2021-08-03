import {
  ALL_ROOMS_SUCCESS,
  ALL_ROOMS_FAIL,
  ROOM_DETAILS_SUCCESS,
  ROOM_DETAILS_FAIL,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_RESET,
  CREATE_REVIEW_FAIL,
  ELIGIBLE_REVIEWER_REQUEST,
  ELIGIBLE_REVIEWER_SUCCESS,
  ELIGIBLE_REVIEWER_FAIL,
  CLEAR_ERRORS,
} from '../constants/rooms';

export const rooms = (state = { rooms: [] }, action) => {
  switch (action.type) {
    case ALL_ROOMS_SUCCESS:
      return {
        totalCount: action.payload.totalCount,
        filteredCount: action.payload.filteredCount,
        perPage: action.payload.perPage,
        rooms: action.payload.rooms,
      };
    case ALL_ROOMS_FAIL:
      return {
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

export const roomDetails = (state = { room: {} }, action) => {
  switch (action.type) {
    case ROOM_DETAILS_SUCCESS:
      return {
        room: action.payload,
      };
    case ROOM_DETAILS_FAIL:
      return {
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

export const createReview = (state = {}, action) => {
  switch (action.type) {
    case CREATE_REVIEW_REQUEST:
      return {
        loading: true,
      };
    case CREATE_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case CREATE_REVIEW_RESET:
      return {
        success: false,
      };
    case CREATE_REVIEW_FAIL:
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

export const reviewEligible = (state = { eligible: null }, action) => {
  switch (action.type) {
    case ELIGIBLE_REVIEWER_REQUEST:
      return {
        loading: true,
      };
    case ELIGIBLE_REVIEWER_SUCCESS:
      return {
        loading: false,
        eligible: action.payload,
      };
    case ELIGIBLE_REVIEWER_FAIL:
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
