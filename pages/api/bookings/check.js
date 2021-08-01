import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import { checkRoomAvailability } from '../../../controllers/booking';
import onError from '../../../middlewares/global-error';

const handler = nc({ onError });

dbConnect();

handler.get(checkRoomAvailability);

export default handler;
