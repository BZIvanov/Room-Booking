import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { Carousel } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import { checkBooking, getBookedDates } from '../../store/actions/bookings';
import { clearErrors } from '../../store/actions/rooms';
import { CHECK_BOOKING_RESET } from '../../store/constants/bookings';
import RoomFeatures from './RoomFeatures';
import getStripe from '../../utils/stripe';
import CreateReview from '../reviews/CreateReview';
import ListReviews from '../reviews/ListReviews';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const RoomDetails = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  const [daysOfStay, setDaysOfStay] = useState(0);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const { user } = useSelector((state) => state.loadUser);
  const { room, error } = useSelector((state) => state.roomDetails);
  const { available, loading: bookingLoading } = useSelector(
    (state) => state.checkBooking
  );
  const { dates } = useSelector((state) => state.bookedDates);

  const bookRoom = async (id, pricePerNight) => {
    setPaymentLoading(true);

    const amount = pricePerNight * daysOfStay;

    try {
      let url = `/api/checkout-session/${id}?`;
      url += `checkInDate=${checkInDate.toISOString()}&`;
      url += `checkOutDate=${checkOutDate.toISOString()}&`;
      url += `daysOfStay=${daysOfStay}`;

      const { data } = await axios.get(url, { params: { amount } });
      const stripe = await getStripe();

      stripe.redirectToCheckout({ sessionId: data.session.id });
      setPaymentLoading(false);
    } catch (error) {
      setPaymentLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    dispatch(getBookedDates(router.query.id));
    toast.error(error);
    dispatch(clearErrors());

    return () => {
      dispatch({ type: CHECK_BOOKING_RESET });
    };
  }, [dispatch, router.query.id]);

  const handleDateChange = (dates) => {
    const [start, end] = dates;

    setCheckInDate(start);
    setCheckOutDate(end);

    if (start && end) {
      const days = Math.floor((new Date(end) - new Date(start)) / 86400000) + 1;
      setDaysOfStay(days);

      dispatch(
        checkBooking(router.query.id, start.toISOString(), end.toISOString())
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

      const { data } = await axios.post('/api/bookings', bookingData, config);
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
                excludeDates={dates.map((date) => new Date(date))}
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
                  onClick={() => bookRoom(room._id, room.pricePerNight)}
                  disabled={bookingLoading || paymentLoading}
                >
                  Pay - {daysOfStay * room.pricePerNight} lv.
                </button>
              )}
            </div>
          </div>
        </div>

        <CreateReview />

        {room.reviews && room.reviews.length > 0 ? (
          <ListReviews reviews={room.reviews} />
        ) : (
          <p>
            <b>No reviews for this room.</b>
          </p>
        )}
      </div>
    </>
  );
};

export default RoomDetails;
