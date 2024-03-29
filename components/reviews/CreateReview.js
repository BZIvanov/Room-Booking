import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  createReviewAction,
  reviewEligibleAction,
  clearErrors,
} from '../../store/actions/rooms';
import { CREATE_REVIEW_RESET } from '../../store/constants/rooms';

const CreateReview = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const { success, error } = useSelector((state) => state.createReview);
  const { eligible } = useSelector((state) => state.reviewEligible);

  const roomId = router.query.id;

  useEffect(() => {
    if (roomId) {
      dispatch(reviewEligibleAction(roomId));
    }

    if (success) {
      toast.success('Review submitted');
      dispatch({ type: CREATE_REVIEW_RESET });
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [success, error, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const reviewData = { rating, comment, roomId };
    dispatch(createReviewAction(reviewData));
  };

  const setStarsRating = () => {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
      star.starValue = index + 1;

      ['click', 'mouseover', 'mouseout'].forEach((e) => {
        star.addEventListener(e, showRatings);
      });
    });

    function showRatings(e) {
      stars.forEach((star, index) => {
        if (e.type === 'click') {
          if (index < this.starValue) {
            star.classList.add('red');

            setRating(this.starValue);
          } else {
            star.classList.remove('red');
          }
        }

        if (e.type === 'mouseover') {
          if (index < this.starValue) {
            star.classList.add('light-red');
          } else {
            star.classList.remove('light-red');
          }
        }

        if (e.type === 'mouseout') {
          star.classList.remove('light-red');
        }
      });
    }
  };

  return (
    <>
      {eligible && (
        <button
          id='review_btn'
          type='button'
          className='btn btn-primary mt-4 mb-5'
          data-toggle='modal'
          data-target='#ratingModal'
          onClick={setStarsRating}
        >
          Submit Your Review
        </button>
      )}

      <div
        className='modal fade'
        id='ratingModal'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='ratingModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='ratingModalLabel'>
                Submit Review
              </h5>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <ul className='stars'>
                <li className='star'>
                  <i className='fa fa-star'></i>
                </li>
                <li className='star'>
                  <i className='fa fa-star'></i>
                </li>
                <li className='star'>
                  <i className='fa fa-star'></i>
                </li>
                <li className='star'>
                  <i className='fa fa-star'></i>
                </li>
                <li className='star'>
                  <i className='fa fa-star'></i>
                </li>
              </ul>

              <textarea
                name='review'
                id='review'
                className='form-control mt-3'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>

              <button
                className='btn my-3 float-right review-btn px-4 text-white'
                data-dismiss='modal'
                aria-label='Close'
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateReview;
