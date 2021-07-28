import bcrypt from 'bcrypt';
import client from '../../client';

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
  },
};
