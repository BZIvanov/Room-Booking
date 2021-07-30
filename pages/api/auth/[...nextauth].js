import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import User from '../../../models/user';
import dbConnect from '../../../config/dbConnect';

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        dbConnect();

        const { email, password } = credentials;
        if (!email || !password) {
          throw new Error('Please provide email and password');
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
          throw new Error('Invalid email or password');
        }

        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
          throw new Error('Invalid email or password');
        }

        return Promise.resolve(user);
      },
    }),
  ],
  callbacks: {
    // this function is called only when jwt token is created
    jwt: async (token, user) => {
      user && (token.user = user);
      return Promise.resolve(token);
    },
    session: async (session, token) => {
      session.user = token.user;
      return Promise.resolve(session);
    },
  },
});
