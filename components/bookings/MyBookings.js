import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import easyinvoice from 'easyinvoice';
import { toast } from 'react-toastify';
import { clearErrors } from '../../store/actions/bookings';

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
