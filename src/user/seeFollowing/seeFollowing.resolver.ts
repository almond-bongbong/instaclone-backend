import { Resolvers } from '../../types';
import client from '../../client';

const LIMIT = 5;

const resolvers: Resolvers = {
  Query: {
    seeFollowing: async (_, { username, lastId }) => {
      const findUser = await client.user.findUnique({ select: { id: true }, where: { username } });
      if (!findUser) {
        return {
          ok: false,
          error: 'User not found',
        };
      }

      const following = await client.user.findUnique({ where: { username } }).following({
        take: LIMIT,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      });

      return {
        ok: true,
        following,
      };
    },
  },
};

export default resolvers;
