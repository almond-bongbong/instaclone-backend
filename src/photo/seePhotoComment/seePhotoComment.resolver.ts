import { Prisma } from '.prisma/client';
import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    seePhotoComment: (_, { id }, { client }) =>
      client.comment.findMany({
        where: {
          photoId: id,
        },
        orderBy: {
          createdAt: Prisma.SortOrder.desc,
        },
      }),
  },
};

export default resolvers;
