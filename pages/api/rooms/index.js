import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import { getAllRooms, createRoom } from '../../../controllers/rooms';
import onError from '../../../middlewares/global-error';

const handler = nc({ onError });

dbConnect();

handler.get(getAllRooms);
handler.post(createRoom);

export default handler;
