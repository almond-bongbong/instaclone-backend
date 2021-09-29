import { Resolvers } from '../../type';
import client from '../../client';

const LIMIT = 5;

const resolvers: Resolvers = {
  Query: {
    seeFollower: async (_, { username, page }) => {
      console.log(page);
      const followers = await client.user.findUnique({ where: { username } }).followers({
        skip: (page - 1) * LIMIT,
        take: LIMIT,
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

      console.log(followers);
      // console.log('B ==== ', bFollowers);

      return {
        ok: true,
      };
    },
  },
};

export default resolvers;
