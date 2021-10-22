import { Resolvers } from '../../types';
import { protectedResolver } from '../../user/user.util';

const resolvers: Resolvers = {
  Mutation: {
    deletePhoto: protectedResolver(async (_, { id }, { client, loggedInUser }) => {
      const findPhoto = await client.photo.findUnique({
        where: {
          id,
        },
        select: {
          userId: true,
        },
      });

      if (!findPhoto) {
        return {
          ok: false,
          error: 'Photo not found',
        };
      }

      if (findPhoto.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: 'Not authorized',
        };
      }

      await client.photo.delete({
        where: { id },
      });

      return {
        ok: true,
      };
    }),
  },
};

export default resolvers;
