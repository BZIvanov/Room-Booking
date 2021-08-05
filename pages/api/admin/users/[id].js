import nc from 'next-connect';
import dbConnect from '../../../../config/dbConnect';
import { getUser, updateUser, removeUser } from '../../../../controllers/users';
import { isAuthenticated, authorizeRoles } from '../../../../middlewares/auth';
import onError from '../../../../middlewares/global-error';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticated, authorizeRoles('admin')).get(getUser);
handler.use(isAuthenticated, authorizeRoles('admin')).put(updateUser);
handler.use(isAuthenticated, authorizeRoles('admin')).delete(removeUser);

export default handler;
