import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import { toast } from 'react-toastify';
import { clearErrors } from '../../store/actions/bookings';

const MyBookings = () => {
  const dispatch = useDispatch();

  const { bookings, error } = useSelector((state) => state.myBookings);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch]);

  const setBookings = () => {
    const data = {
      columns: [
        {
          label: 'Booking ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Check in',
          field: 'checkIn',
          sort: 'asc',
        },
        {
          label: 'Check out',
          field: 'checkOut',
          sort: 'asc',
        },
        {
          label: 'Amount paid',
          field: 'amount',
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

    bookings &&
      bookings.forEach((booking) => {
        data.rows.push({
          id: booking._id,
          checkIn: new Date(booking.checkInDate).toLocaleDateString('en-BG'),
          checkOut: new Date(booking.checkOutDate).toLocaleDateString('en-BG'),
          amount: `${booking.amountPaid} lv.`,
          actions: (
            <>
              <Link href={`/bookings/${booking._id}`}>
                <a className='btn btn-primary'>
                  <i className='fa fa-eye'></i>
                </a>
              </Link>
              <button className='btn btn-success mx-2'>
                <i className='fa fa-download'></i>
              </button>
            </>
          ),
        });
      });

    return data;
  };

  return (
    <div className='container container-fluid'>
      <h1 className='my-5'>My Bookings</h1>

      <MDBDataTable
        data={setBookings()}
        className='px-3'
        bordered
        striped
        hover
      />
    </div>
  );
};

export default MyBookings;
