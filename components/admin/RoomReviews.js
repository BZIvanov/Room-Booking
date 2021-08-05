import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import { toast } from 'react-toastify';
import {
  getRoomReviewsAction,
  removeReviewAction,
  clearErrors,
} from '../../store/actions/rooms';
import { REMOVE_REVIEW_RESET } from '../../store/constants/rooms';

const RoomReviews = () => {
  const dispatch = useDispatch();

  const [roomId, setRoomId] = useState('');

  const { reviews, error } = useSelector((state) => state.roomReviews);
  const { isDeleted, error: removeError } = useSelector(
    (state) => state.removeReview
  );

  useEffect(() => {
    if (roomId !== '') {
      dispatch(getRoomReviewsAction(roomId));
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (removeError) {
      toast.error(removeError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success('Review removed');
      dispatch({ type: REMOVE_REVIEW_RESET });
    }
  }, [dispatch, isDeleted, roomId, error, removeError]);

  const setReviews = () => {
    const data = {
      columns: [
        {
          label: 'Review ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Rating',
          field: 'rating',
          sort: 'asc',
        },
        {
          label: 'Comment',
          field: 'comment',
          sort: 'asc',
        },
        {
          label: 'User',
          field: 'user',
          sort: 'asc',
        },
        {
          label: 'Actions',
          field: 'actions',
          sort: 'asc',
        },
      ],
      rows: [],
    };

    reviews &&
      reviews.forEach((review) => {
        data.rows.push({
          id: review._id,
          rating: review.rating,
          comment: review.comment,
          user: review.name,
          actions: (
            <button
              className='btn btn-danger mx-2'
              onClick={() => handleRemove(review._id)}
            >
              <i className='fa fa-trash'></i>
            </button>
          ),
        });
      });

    return data;
  };

  const handleRemove = (id) => {
    dispatch(removeReviewAction(id, roomId));
  };

  return (
    <div className='container container-fluid'>
      <div className='row justify-content-center mt-5'>
        <div className='col-5'>
          <form>
            <div className='form-group'>
              <label htmlFor='room_id_field'>Enter Room ID</label>
              <input
                type='text'
                id='room_id_field'
                className='form-control'
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
              />
            </div>
          </form>
        </div>

        {reviews && reviews.length > 0 ? (
          <MDBDataTable
            data={setReviews()}
            className='px-3'
            bordered
            striped
            hover
          />
        ) : (
          <div className='alert alert-danger mt-5 text-center'>No Reviews</div>
        )}
      </div>
    </div>
  );
};

export default RoomReviews;
