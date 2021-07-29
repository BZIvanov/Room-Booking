import Home from '../components/Home';
import Layout from '../components/layout/Layout';
import { wrapper } from '../store';
import { getRooms } from '../store/actions/rooms';

export default function Index() {
  return (
    <Layout>
      <Home />
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      await store.dispatch(getRooms(req));
    }
);
