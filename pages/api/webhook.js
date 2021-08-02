import nc from 'next-connect';
import dbConnect from '../../config/dbConnect';
import { webhookCheckout } from '../../controllers/payments';
import onError from '../../middlewares/global-error';

const handler = nc({ onError });

dbConnect();

// we will disable the body-parser, because the webhook needs the raw body data
export const config = {
  api: { bodyParser: false },
};

handler.post(webhookCheckout);

export default handler;
