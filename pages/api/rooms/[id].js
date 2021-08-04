import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import { getRoom, updateRoom, deleteRoom } from '../../../controllers/rooms';
import { isAuthenticated, authorizeRoles } from '../../../middlewares/auth';
import onError from '../../../middlewares/global-error';

const handler = nc({ onError });

dbConnect();

handler.get(getRoom);
handler.use(isAuthenticated, authorizeRoles('admin')).put(updateRoom);
handler.use(isAuthenticated, authorizeRoles('admin')).delete(deleteRoom);

export default handler;
