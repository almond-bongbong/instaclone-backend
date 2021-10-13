import { Hashtag } from '.prisma/client';
import { Resolvers } from '../../types';

const LIMIT = 10;

const resolvers: Resolvers = {
  Query: {
    seeHashtag: (_, { hashtag }, { client }) =>
      client.hashtag.findUnique({
        where: { hashtag },
      }),
  },
  Hashtag: {
    photos: (parent: Hashtag, { page }, { client }) =>
      client.hashtag
        .findUnique({
          where: {
            id: parent.id,
          },
        })
        .photos({
          take: LIMIT,
          skip: (page - 1) * LIMIT,
        }),
    totalPhotos: (parent: Hashtag, _, { client }) =>
      client.photo.count({
        where: {
          hashtags: {
            some: { id: parent.id },
          },
        },
      }),
  },
};

export default resolvers;
