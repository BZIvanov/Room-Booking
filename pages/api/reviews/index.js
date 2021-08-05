import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import {
  roomReviews,
  createReview,
  removeReview,
} from '../../../controllers/rooms';
import { isAuthenticated } from '../../../middlewares/auth';
import onError from '../../../middlewares/global-error';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticated).get(roomReviews);
handler.use(isAuthenticated).put(createReview);
handler.use(isAuthenticated).delete(removeReview);

export default handler;
