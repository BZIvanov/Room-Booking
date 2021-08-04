import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors } from '../../store/actions/bookings';

const Booking = () => {
  const dispatch = useDispatch();

  const { booking, error } = useSelector((state) => state.booking);
  const { user } = useSelector((state) => state.loadUser);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch]);

  const isPaid = booking && booking.paymentInfo.status === 'paid';

  return (
    <div className='container'>
      <div className='row d-flex justify-content-between'>
        <div className='col-12 col-lg-8 mt-5 booking-details'>
          {booking && booking.room && booking.user && (
            <>
              <h2 className='my-5'>Booking #{booking._id}</h2>
              <h4 className='mb-4'>User Info</h4>
              <p>
                <b>Name:</b> {booking.user && booking.user.name}
              </p>
              <p>
                <b>Email:</b> {booking.user && booking.user.email}
              </p>
              <p>
                <b>Amount:</b> {booking.amountPaid} lv.
              </p>
              <hr />

              <h4 className='mb-4'>Booking Info</h4>
              <p>
                <b>Check In:</b>{' '}
                {new Date(booking.checkInDate).toLocaleString('bg-BG')}
              </p>
              <p>
                <b>Check Out:</b>{' '}
                {new Date(booking.checkOutDate).toLocaleString('bg-BG')}
              </p>
              <p>
                <b>Days of Stay:</b> {booking.daysOfStay}
              </p>
              <hr />

              <h4 className='my-4'>Payment Status</h4>
              <p className={isPaid ? 'greenColor' : 'redColor'}>
                <b>{isPaid ? 'Paid' : 'Not Paid'}</b>
              </p>
              {user && user.role === 'admin' && (
                <>
                  <h4 className='my-4'>Stripe Payment ID</h4>
                  <p className='redColor'>
                    <b>{booking.paymentInfo.id}</b>
                  </p>
                </>
              )}
              <hr />

              <h4 className='mt-5 mb-4'>Booked Room:</h4>
              <div className='cart-item my-1'>
                <div className='row my-5'>
                  <div className='col-4 col-lg-2'>
                    <Image
                      src={booking.room.images[0].url}
                      alt={booking.room.name}
                      width={65}
                      height={45}
                    />
                  </div>

                  <div className='col-5 col-lg-5'>
                    <Link href={`/room/${booking.room._id}`}>
                      {booking.room.name}
                    </Link>
                  </div>

                  <div className='col-4 col-lg-2 mt-4 mt-lg-0'>
                    <p>{booking.room.pricePerNight} lv.</p>
                  </div>

                  <div className='col-4 col-lg-3 mt-4 mt-lg-0'>
                    <p>{booking.daysOfStay} Day(s)</p>
                  </div>
                </div>
              </div>
              <hr />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;
