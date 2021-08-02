import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import { getBooking } from '../../../controllers/booking';
import { isAuthenticated } from '../../../middlewares/auth';
import onError from '../../../middlewares/global-error';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticated).get(getBooking);

export default handler;
