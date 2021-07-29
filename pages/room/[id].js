import RoomDetails from '../../components/rooms/RoomDetails';
import Layout from '../../components/layout/Layout';
import { wrapper } from '../../store';
import { getRoom } from '../../store/actions/rooms';

export default function RoomDetailsPage() {
  return (
    <Layout>
      <RoomDetails title='Room Details' />
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      await store.dispatch(getRoom(req, params.id));
    }
);
