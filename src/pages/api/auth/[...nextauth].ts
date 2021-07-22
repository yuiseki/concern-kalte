import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { UserModel } from '~/models/UserModel';
import { dbConnect } from '~/lib/dbConnect';

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Email',
      credentials: {
        email: {
          label: 'メールアドレス',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: {
          label: 'パスワード',
          type: 'password',
          placeholder: '********',
        },
      },
      async authorize(credentials) {
        try {
          await dbConnect();
          const user = await UserModel.findOne({
            email: credentials.email,
          });
          if (user) {
            if (user.comparePassword(credentials.password)) {
              return user;
            } else {
              null;
            }
          } else {
            const newUser = new UserModel({
              email: credentials.email,
              password: credentials.password,
            });
            await newUser.save();
            return newUser;
          }
          return null;
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }),
  ],
});
