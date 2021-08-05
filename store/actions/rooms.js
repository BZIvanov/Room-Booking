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
  CREATE_ROOM_REQUEST,
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_FAIL,
  UPDATE_ROOM_REQUEST,
  UPDATE_ROOM_SUCCESS,
  UPDATE_ROOM_FAIL,
  DELETE_ROOM_REQUEST,
  DELETE_ROOM_SUCCESS,
  DELETE_ROOM_FAIL,
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAIL,
  REMOVE_REVIEW_REQUEST,
  REMOVE_REVIEW_SUCCESS,
  REMOVE_REVIEW_FAIL,
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

export const createRoomAction = (roomData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ROOM_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const { data } = await axios.post('/api/rooms', roomData, config);
    dispatch({
      type: CREATE_ROOM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ROOM_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateRoomAction = (id, roomData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ROOM_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const { data } = await axios.put(`/api/rooms/${id}`, roomData, config);
    dispatch({
      type: UPDATE_ROOM_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ROOM_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteRoomAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ROOM_REQUEST });

    const { data } = await axios.delete(`/api/rooms/${id}`);
    dispatch({
      type: DELETE_ROOM_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ROOM_FAIL,
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

export const getRoomReviewsAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_REVIEWS_REQUEST });

    const { data } = await axios.get(`/api/reviews?id=${id}`);
    dispatch({
      type: GET_REVIEWS_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: GET_REVIEWS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const removeReviewAction = (id, roomId) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `/api/reviews?id=${id}&roomId=${roomId}`
    );
    dispatch({
      type: REMOVE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: REMOVE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
