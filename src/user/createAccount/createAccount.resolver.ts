import bcrypt from 'bcrypt';
import { PASSWORD_HASH_ROUND } from '../../common/constant';
import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (_, { firstName, lastName, username, email, password }, { client }) => {
      const existingUser = await client.user.findFirst({
        where: {
          OR: [{ username }, { email }],
        },
      });

      if (existingUser) {
        throw new Error('This username/email is already taken.');
      }

      const hashedPassword = await bcrypt.hash(password, PASSWORD_HASH_ROUND);
      await client.user.create({
        data: {
          email,
          username,
          firstName,
          lastName,
          password: hashedPassword,
        },
      });

      return {
        ok: true,
      };
    },
  },
};

export default resolvers;
