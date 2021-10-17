import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    seePhotoLikes: async (_, { id }, { client }) => {
      const likes = await client.like.findMany({
        where: {
          photoId: id,
        },
        select: {
          user: true,
        },
      });

      return likes.map((l) => l.user);
    },
  },
};

export default resolvers;
