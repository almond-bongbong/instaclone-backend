import bcrypt from 'bcrypt';
import client from '../../client';
import { PASSWORD_HASH_ROUND } from '../../common/constant';

export default {
  Mutation: {
    editProfile: async (
      _,
      { firstName, lastName, username, email, password },
      { loggedInUser }
    ) => {
      try {
        if (!loggedInUser) {
          return {
            ok: false,
            error: 'Could not update profile.',
          };
        }

        await client.user.update({
          where: { id: loggedInUser.id },
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
