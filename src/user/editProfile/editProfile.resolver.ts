import client from '../../client';
import bcrypt from 'bcrypt';
import { PASSWORD_HASH_ROUND } from '../../common/constant';

export default {
  Mutation: {
    editProfile: async (_, { firstName, lastName, username, email, password }) => {
      try {
        await client.user.update({
          where: { id: 1 },
          data: {
            firstName,
            lastName,
            username,
            email,
            password: password && (await bcrypt.hash(password, PASSWORD_HASH_ROUND)),
          },
        });

        return {
          ok: true,
        };
      } catch (error) {
        console.error(error);

        return {
          ok: false,
          error: 'Could not update profile.',
        };
      }
    },
  },
};
