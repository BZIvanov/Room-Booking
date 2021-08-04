import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import easyinvoice from 'easyinvoice';
import { toast } from 'react-toastify';
import {
  getAllBookings,
  removeBookingAction,
  clearErrors,
} from '../../store/actions/bookings';
import { REMOVE_BOOKING_RESET } from '../../store/constants/bookings';
import Loader from '../layout/Loader';

const downloadInvoice = async (booking) => {
  const data = {
    documentTitle: 'Booking invoice',
    locale: 'bg-BG',
    currency: 'BGN',
    taxNotation: 'vat',
    marginTop: 25,
    marginRight: 25,
    marginLeft: 25,
    marginBottom: 25,
    logo: 'https://public.easyinvoice.cloud/img/logo_en_original.png',
    background: 'https://public.easyinvoice.cloud/img/watermark-draft.jpg',
    sender: {
      company: 'Book it',
      address: 'Sofia Street 123',
      zip: '1234',
      city: 'Sofia',
      country: 'Bulgaria',
    },
    client: {
      company: booking.user.name,
      address: booking.user.email,
      zip: '4567',
      city: 'Sofia',
      country: 'Bulgaria',
    },
    invoiceNumber: booking._id,
    invoiceDate: new Date(Date.now()).toLocaleString('bg-BG'),
    products: [
      {
        quantity: booking.daysOfStay,
        description: booking.room.name,
        tax: 0,
        price: booking.room.pricePerNight,
      },
    ],
    bottomNotice: 'Auto generated invoice.',
    translate: {
      price: 'Цена',
      total: 'Всичко',
    },
  };

  const invoiceSetup = await easyinvoice.createInvoice(data);
  easyinvoice.download(`invoice-${booking._id}.pdf`, invoiceSetup.pdf);
};

const AllBookings = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { bookings, loading, error } = useSelector((state) => state.myBookings);
  const { isDeleted, error: deleteError } = useSelector(
    (state) => state.removeBooking
  );

  useEffect(() => {
    dispatch(getAllBookings());

    if (isDeleted) {
      router.push('/admin/bookings');
      dispatch({ type: REMOVE_BOOKING_RESET });
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }
  }, [dispatch, isDeleted, error, deleteError]);

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
          checkIn: new Date(booking.checkInDate).toLocaleDateString('bg-BG'),
          checkOut: new Date(booking.checkOutDate).toLocaleDateString('bg-BG'),
          amount: `${booking.amountPaid} lv.`,
          actions: (
            <>
              <Link href={`/bookings/${booking._id}`}>
                <a className='btn btn-primary'>
                  <i className='fa fa-eye'></i>
                </a>
              </Link>

              <button
                className='btn btn-success mx-2'
                onClick={() => downloadInvoice(booking)}
              >
                <i className='fa fa-download'></i>
              </button>

              <button
                className='btn btn-danger mx-2'
                onClick={() => handleDelete(booking._id)}
              >
                <i className='fa fa-trash'></i>
              </button>
            </>
          ),
        });
      });

    return data;
  };

  const handleDelete = (id) => {
    dispatch(removeBookingAction(id));
  };

  return (
    <div className='container container-fluid'>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className='my-5'>{`${bookings && bookings.length} Bookings`}</h1>

          <MDBDataTable
            data={setBookings()}
            className='px-3'
            bordered
            striped
            hover
          />
        </>
      )}
    </div>
  );
};

export default AllBookings;
