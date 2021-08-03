import React from 'react';
import { getSession } from 'next-auth/client';
import CreateRoom from '../../../components/admin/CreateRoom';
import Layout from '../../../components/layout/Layout';

const CreateRoomPage = () => {
  return (
    <Layout title='Create room'>
      <CreateRoom />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session || session.user.role !== 'admin') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return { props: {} };
}

export default CreateRoomPage;
