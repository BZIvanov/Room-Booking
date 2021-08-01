import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import { checkRoomBookedDates } from '../../../controllers/booking';
import onError from '../../../middlewares/global-error';

const handler = nc({ onError });

dbConnect();

handler.get(checkRoomBookedDates);

export default handler;
