import nc from 'next-connect';
import dbConnect from '../../config/dbConnect';
import { getMe } from '../../controllers/auth';
import { isAuthenticated } from '../../middlewares/auth';
import onError from '../../middlewares/global-error';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticated).get(getMe);

export default handler;
