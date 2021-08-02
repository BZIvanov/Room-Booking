import React from 'react';
import { getSession } from 'next-auth/client';
import { wrapper } from '../../store';
import { getMyBookings } from '../../store/actions/bookings';
import MyBookings from '../../components/bookings/MyBookings';
import Layout from '../../components/layout/Layout';

const MyBookingsPage = () => {
  return (
    <Layout title='My Bookings'>
      <MyBookings />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const session = await getSession({ req });
      if (!session) {
        return {
          redirect: {
            destination: '/login',
            permanent: false,
          },
        };
      }

      await store.dispatch(getMyBookings(req.headers.cookie, req));
    }
);

// export const getServerSideProps = wrapper.getServerSideProps(
//   async ({ req, store }) => {
//     const session = await getSession({ req });
//     if (!session) {
//       return {
//         redirect: {
//           destination: '/login',
//           permanent: false,
//         },
//       };
//     }

//     await store.dispatch(getMyBookings(req.headers.cookie, req));
//   }
// );

export default MyBookingsPage;
