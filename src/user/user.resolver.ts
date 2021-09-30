import { User } from '.prisma/client';
import { Resolvers } from '../types';

const resolvers: Resolvers = {
  User: {
    totalFollowing: (parent: User, _, { client }) => {
      console.log(parent);
      // const totalFollowing = await client.user.
      return 0;
    },
    totalFollowers: () => 666,
    isFollowing: () => true,
  },
};

export default resolvers;
