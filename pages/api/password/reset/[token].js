import nc from 'next-connect';
import dbConnect from '../../../../config/dbConnect';
import { resetPassword } from '../../../../controllers/auth';
import onError from '../../../../middlewares/global-error';

const handler = nc({ onError });

dbConnect();

handler.put(resetPassword);

export default handler;
