import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import client from '../client';

export default {
  Mutation: {
    createAccount: async (_, { firstName, lastName, username, email, password }) => {
      const existingUser = await client.user.findFirst({
        where: {
          OR: [{ username }, { email }],
        },
      });

      if (existingUser) {
        throw new Error('This username/email is already taken.');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      return client.user.create({
        data: {
          email,
          username,
          firstName,
          lastName,
          password: hashedPassword,
        },
      });
    },

    login: async (_, { username, password }) => {
      const findUser = await client.user.findUnique({ where: { username } });
      if (!findUser) {
        return {
          ok: false,
          error: 'User not found',
        };
      }

      const passwordOk = await bcrypt.compare(password, findUser.password);
      if (!passwordOk) {
        return {
          ok: false,
          error: 'Incorrect password',
        };
      }

      const token = jwt.sign({ id: findUser.id }, process.env.TOKEN_SECRET_KEY || '');
      return {
        ok: true,
        token,
      };
    },
  },
};
