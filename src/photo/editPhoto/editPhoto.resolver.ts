import { Resolvers } from '../../types';
import { protectedResolver } from '../../user/user.util';
import { processHashtag } from '../photo.util';

const resolvers: Resolvers = {
  Mutation: {
    editPhoto: protectedResolver(async (_, { id, caption }, { loggedInUser, client }) => {
      const findPhoto = await client.photo.findFirst({
        where: { id, userId: loggedInUser.id },
        include: { hashtags: true },
      });

      if (!findPhoto) {
        return {
          ok: false,
          error: 'Photo not found.',
        };
      }

      await client.photo.update({
        where: { id: findPhoto.id },
        data: {
          caption,
          hashtags: {
            disconnect: findPhoto.hashtags.map((h) => ({
              hashtag: h.hashtag,
            })),
            connectOrCreate: processHashtag(caption),
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
