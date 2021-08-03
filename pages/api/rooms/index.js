import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import { getAllRooms, createRoom } from '../../../controllers/rooms';
import { isAuthenticated, authorizeRoles } from '../../../middlewares/auth';
import onError from '../../../middlewares/global-error';

const handler = nc({ onError });

dbConnect();

handler.get(getAllRooms);
handler.use(isAuthenticated, authorizeRoles('admin')).post(createRoom);

export default handler;
