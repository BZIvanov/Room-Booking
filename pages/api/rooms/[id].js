import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import { getRoom, updateRoom, deleteRoom } from '../../../controllers/rooms';

const handler = nc();

dbConnect();

handler.get(getRoom);
handler.put(updateRoom);
handler.delete(deleteRoom);

export default handler;
