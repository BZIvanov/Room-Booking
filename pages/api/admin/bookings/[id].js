import nc from 'next-connect';
import dbConnect from '../../../../config/dbConnect';
import { removeBooking } from '../../../../controllers/booking';
import { isAuthenticated, authorizeRoles } from '../../../../middlewares/auth';
import onError from '../../../../middlewares/global-error';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticated, authorizeRoles('admin')).delete(removeBooking);

export default handler;
