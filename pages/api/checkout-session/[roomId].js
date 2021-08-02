import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import { stripeCheckoutSession } from '../../../controllers/payments';
import { isAuthenticated } from '../../../middlewares/auth';
import onError from '../../../middlewares/global-error';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticated).get(stripeCheckoutSession);

export default handler;
