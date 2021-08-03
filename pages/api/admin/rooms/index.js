import nc from 'next-connect';
import dbConnect from '../../../../config/dbConnect';
import { allAdminRooms } from '../../../../controllers/rooms';
import { isAuthenticated, authorizeRoles } from '../../../../middlewares/auth';
import onError from '../../../../middlewares/global-error';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticated, authorizeRoles('admin')).get(allAdminRooms);

export default handler;
