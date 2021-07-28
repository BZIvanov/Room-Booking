import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import { getRoom, updateRoom, deleteRoom } from '../../../controllers/rooms';
import onError from '../../../middlewares/global-error';

const handler = nc({ onError });

dbConnect();

handler.get(getRoom);
handler.put(updateRoom);
handler.delete(deleteRoom);

export default handler;
