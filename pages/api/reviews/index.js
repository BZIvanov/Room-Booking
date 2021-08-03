import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import { createReview } from '../../../controllers/rooms';
import { isAuthenticated } from '../../../middlewares/auth';
import onError from '../../../middlewares/global-error';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticated).put(createReview);

export default handler;
