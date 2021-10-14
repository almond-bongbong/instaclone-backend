import { Resolvers } from '../../types';
import { protectedResolver } from '../../user/user.util';

const resolvers: Resolvers = {
  Mutation: {
    editPhoto: protectedResolver(async (_, { id, caption }, { loggedInUser, client }) => {
      const findPhoto = await client.photo.findFirst({ where: { id, userId: loggedInUser.id } });

      if (!findPhoto) {
        return {
          ok: false,
          error: 'Photo not found.',
        };
      }

      await client.photo.update({
        data: { caption },
        where: { id: findPhoto.id },
      });

      return {
        ok: true,
      };
    }),
  },
};

export default resolvers;
