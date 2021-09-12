import { protectedResolver } from '../user.util';
import client from '../../client';

export default {
  Mutation: {
    followUser: protectedResolver(async (_, { username }, { loggedInUser }) => {
      const findTargetUser = await client.user.findUnique({
        where: { username },
      });

      if (!findTargetUser) {
        return {
          ok: false,
          error: 'That user does not exist.',
        };
      }

      await client.user.update({
        where: { id: loggedInUser.id },
        data: {
          following: {
            connect: {
              username,
            },
          },
        },
      });

      return {
        ok: true,
      };
    }),
  },
};
