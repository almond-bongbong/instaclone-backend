import { protectedResolver } from '../user.util';
import client from '../../client';
import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Mutation: {
    unfollowUser: protectedResolver(async (_, { username }, { loggedInUser }) => {
      const findUser = await client.user.findUnique({ where: { username } });
      if (!findUser) {
        return {
          ok: false,
          error: "Can't unfollow user.",
        };
      }

      await client.user.update({
        where: { id: loggedInUser.id },
        data: {
          following: {
            disconnect: {
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

export default resolvers;
