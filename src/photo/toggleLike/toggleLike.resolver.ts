import { Resolvers } from '../../types';
import { protectedResolver } from '../../user/user.util';

const resolvers: Resolvers = {
  Mutation: {
    toggleLike: protectedResolver(async (_, { id }, { client, loggedInUser }) => {
      const existPhoto = await client.photo.findFirst({
        where: { id },
      });
      if (!existPhoto) {
        return {
          ok: false,
          error: 'Photo not found',
        };
      }

      const findLike = await client.like.findUnique({
        where: {
          photoId_userId: {
            photoId: existPhoto.id,
            userId: loggedInUser.id,
          },
        },
      });

      if (findLike) {
        await client.like.delete({
          where: {
            photoId_userId: {
              photoId: existPhoto.id,
              userId: loggedInUser.id,
            },
          },
        });
      } else {
        await client.like.create({
          data: {
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            photo: {
              connect: {
                id: existPhoto.id,
              },
            },
          },
        });
      }

      return {
        ok: true,
      };
    }),
  },
};

export default resolvers;
