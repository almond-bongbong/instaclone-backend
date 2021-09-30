import { Resolvers } from '../../type';
import client from '../../client';

const LIMIT = 5;

const resolvers: Resolvers = {
  Query: {
    seeFollower: async (_, { username, page }) => {
      const findUser = await client.user.findUnique({ select: { id: true }, where: { username } });
      if (!findUser) {
        return {
          ok: false,
          error: 'User not found',
        };
      }

      const followers = await client.user.findUnique({ where: { username } }).followers({
        take: LIMIT,
        skip: (page - 1) * LIMIT,
      });
      const totalFollowers = await client.user.count({
        where: {
          following: { some: { username } },
        },
      });
      // const bFollowers = await client.user.findMany({
      //   where: {
      //     following: {
      //       some: {
      //         username,
      //       },
      //     },
      //   },
      // });

      return {
        ok: true,
        followers,
        totalPages: Math.ceil(totalFollowers / LIMIT),
      };
    },
  },
};

export default resolvers;
