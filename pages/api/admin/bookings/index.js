import nc from 'next-connect';
import dbConnect from '../../../../config/dbConnect';
import { getAllBookings } from '../../../../controllers/booking';
import { isAuthenticated, authorizeRoles } from '../../../../middlewares/auth';
import onError from '../../../../middlewares/global-error';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticated, authorizeRoles('admin')).get(getAllBookings);

export default handler;
