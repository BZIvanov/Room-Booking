import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import { eligibleReviewer } from '../../../controllers/rooms';
import { isAuthenticated } from '../../../middlewares/auth';
import onError from '../../../middlewares/global-error';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticated).get(eligibleReviewer);

export default handler;
