import axios from 'axios';
import absoluteUrl from 'next-absolute-url';
import {
  ALL_ROOMS_SUCCESS,
  ALL_ROOMS_FAIL,
  ROOM_DETAILS_SUCCESS,
  ROOM_DETAILS_FAIL,
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

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
