import axios from 'axios';
import absoluteUrl from 'next-absolute-url';
import {
  ALL_ROOMS_SUCCESS,
  ALL_ROOMS_FAIL,
  ROOM_DETAILS_SUCCESS,
  ROOM_DETAILS_FAIL,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAIL,
  ELIGIBLE_REVIEWER_REQUEST,
  ELIGIBLE_REVIEWER_SUCCESS,
  ELIGIBLE_REVIEWER_FAIL,
  ADMIN_ROOM_REQUEST,
  ADMIN_ROOM_SUCCESS,
  ADMIN_ROOM_FAIL,
  CLEAR_ERRORS,
} from '../constants/rooms';

export const getRooms =
  (req, page = 1, location = '', guests, category) =>
  async (dispatch) => {
    try {
      const { origin } = absoluteUrl(req);

      let url = `${origin}/api/rooms?page=${page}&location=${location}`;
      if (guests) url = url.concat(`&guestsCapacity=${guests}`);
      if (category) url = url.concat(`&category=${category}`);

      const { data } = await axios.get(url);
      dispatch({
        type: ALL_ROOMS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_ROOMS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getRoom = (req, id) => async (dispatch) => {
  try {
    const { origin } = absoluteUrl(req);

    const { data } = await axios.get(`${origin}/api/rooms/${id}`);
    dispatch({
      type: ROOM_DETAILS_SUCCESS,
      payload: data.room,
    });
  } catch (error) {
    dispatch({
      type: ROOM_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAdminRooms = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_ROOM_REQUEST });

    const { data } = await axios.get('/api/admin/rooms');
    dispatch({
      type: ADMIN_ROOM_SUCCESS,
      payload: data.rooms,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_ROOM_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const createReviewAction = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_REVIEW_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const { data } = await axios.put('/api/reviews', reviewData, config);
    dispatch({
      type: CREATE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: CREATE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const reviewEligibleAction = (roomId) => async (dispatch) => {
  try {
    dispatch({ type: ELIGIBLE_REVIEWER_REQUEST });

    const { data } = await axios.get(
      `/api/reviews/eligible-reviewer?roomId=${roomId}`
    );
    dispatch({
      type: ELIGIBLE_REVIEWER_SUCCESS,
      payload: data.isEligibleReviewer,
    });
  } catch (error) {
    dispatch({
      type: ELIGIBLE_REVIEWER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
