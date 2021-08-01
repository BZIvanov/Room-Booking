import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { Carousel } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import { checkBooking } from '../../store/actions/bookings';
import { clearErrors } from '../../store/actions/rooms';
import { CHECK_BOOKING_REQUEST } from '../../store/constants/bookings';
import RoomFeatures from './RoomFeatures';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const RoomDetails = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  const [daysOfStay, setDaysOfStay] = useState(0);

  const { user } = useSelector((state) => state.loadUser);
  const { room, error } = useSelector((state) => state.roomDetails);
  const { available, loading: bookingLoading } = useSelector(
    (state) => state.checkBooking
  );

  useEffect(() => {
    toast.error(error);
    dispatch(clearErrors);
  }, []);

  const handleDateChange = (dates) => {
    const [start, end] = dates;

    setCheckInDate(start);
    setCheckOutDate(end);

    if (checkInDate && checkOutDate) {
      const days = Math.floor((new Date(end) - new Date(start)) / 86400000) + 1;
      setDaysOfStay(days);

      dispatch(
        checkBooking(
          router.query.id,
          checkInDate.toISOString(),
          checkOutDate.toISOString()
        )
      );
    }
  };

  const createBooking = async () => {
    const bookingData = {
      roomId: router.query.id,
      checkInDate,
      checkOutDate,
      daysOfStay,
      amountPaid: 50,
      paymentInfo: {
        id: 'stripe payment id',
        status: 'payment status',
      },
    };

    try {
      const config = { headers: { 'Content-Type': 'application/json' } };

      const { data } = await axios.post('/api/booking', bookingData, config);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>{room.name}</title>
      </Head>
      <div className='container container-fluid'>
        <h2 className='mt-5'>{room.name}</h2>
        <p>{room.address}</p>

        <div className='ratings mt-auto mb-3'>
          <div className='rating-outer'>
            <div
              className='rating-inner'
              style={{ width: `${(room.rating / 5) * 100}%` }}
            ></div>
          </div>
          <span id='no_of_reviews'>({room.reviewsNumber} Reviews)</span>
        </div>

        <Carousel hover='pause'>
          {room.images &&
            room.images.map((image) => (
              <Carousel.Item key={image.publicId}>
                <div style={{ width: '100%', height: '440px' }}>
                  <Image
                    className='d-block m-auto'
                    src={image.url}
                    alt={room.name}
                    layout='fill'
                  />
                </div>
              </Carousel.Item>
            ))}
        </Carousel>

        <div className='row my-5'>
          <div className='col-12 col-md-6 col-lg-8'>
            <h3>Description</h3>
            <p>{room.description}</p>
            <RoomFeatures room={room} />
          </div>

          <div className='col-12 col-md-6 col-lg-4'>
            <div className='booking-card shadow-lg p-4'>
              <p className='price-per-night'>
                <b>${room.pricePerNight}</b> / night
              </p>

              <hr />

              <p className='mt-5 mb-3'>Pick CheckIn and CheckOut dates</p>
              <DatePicker
                className='w-100'
                selected={checkInDate}
                onChange={handleDateChange}
                startDate={checkInDate}
                endDate={checkOutDate}
                minDate={new Date()}
                selectsRange
                inline
              />

              {available && checkOutDate && (
                <div className='alert alert-success my-3 font-weight-bold'>
                  Room is available to book
                </div>
              )}

              {!available && checkOutDate && (
                <div className='alert alert-danger my-3 font-weight-bold'>
                  Room not available, try different dates
                </div>
              )}

              {available && !user && (
                <div className='alert alert-danger my-3 font-weight-bold'>
                  Login to book a room
                </div>
              )}

              {available && user && (
                <button
                  className='btn btn-block py-3 booking-btn'
                  onClick={createBooking}
                >
                  Pay
                </button>
              )}
            </div>
          </div>
        </div>

        <div className='reviews w-75'>
          <h3>Reviews:</h3>
          <hr />
          <div className='review-card my-3'>
            <div className='rating-outer'>
              <div className='rating-inner'></div>
            </div>
            <p className='review_user'>by John</p>
            <p className='review_comment'>Good Quality</p>

            <hr />
          </div>

          <div className='review-card my-3'>
            <div className='rating-outer'>
              <div className='rating-inner'></div>
            </div>
            <p className='review_user'>by John</p>
            <p className='review_comment'>Good Quality</p>

            <hr />
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomDetails;
