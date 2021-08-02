import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import { getMyBookings } from '../../../controllers/booking';
import { isAuthenticated } from '../../../middlewares/auth';
import onError from '../../../middlewares/global-error';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticated).get(getMyBookings);

export default handler;
