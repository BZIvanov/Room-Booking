import React from 'react';
import { getSession } from 'next-auth/client';
import { wrapper } from '../../../store';
import { getBooking } from '../../../store/actions/bookings';
import Booking from '../../../components/bookings/Booking';
import Layout from '../../../components/layout/Layout';

const BookingPage = () => {
  return (
    <Layout title='Booking Details'>
      <Booking />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      const session = await getSession({ req });
      if (!session) {
        return {
          redirect: {
            destination: '/login',
            permanent: false,
          },
        };
      }

      await store.dispatch(getBooking(req.headers.cookie, req, params.id));
    }
);

export default BookingPage;
