import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import { createBooking } from '../../../controllers/booking';
import { isAuthenticated } from '../../../middlewares/auth';
import onError from '../../../middlewares/global-error';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticated).post(createBooking);

export default handler;
