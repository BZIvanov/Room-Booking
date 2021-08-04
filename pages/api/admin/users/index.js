import nc from 'next-connect';
import dbConnect from '../../../../config/dbConnect';
import { getAllUsers } from '../../../../controllers/users';
import { isAuthenticated, authorizeRoles } from '../../../../middlewares/auth';
import onError from '../../../../middlewares/global-error';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticated, authorizeRoles('admin')).get(getAllUsers);

export default handler;
