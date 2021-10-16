import { Resolvers } from '../../types';
import { protectedResolver } from '../../user/user.util';

const resolvers: Resolvers = {
  Mutation: {
    toggleLike: protectedResolver(async (_, { id }, { client, loggedInUser }) => {
      const ok = await client.photo.findFirst({
        where: { id, userId: loggedInUser.id },
      });
      if (!ok) {
        return {
          ok: false,
          error: 'Photo not found',
        };
      }

      return {
        ok: true,
      };
    }),
  },
};

export default resolvers;
