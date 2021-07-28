import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import { getAllRooms } from '../../../controllers/rooms';

const handler = nc();

dbConnect();

handler.get(getAllRooms);

export default handler;
