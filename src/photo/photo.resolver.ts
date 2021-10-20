import { Photo } from '.prisma/client';
import { Resolvers } from '../types';

const resolvers: Resolvers = {
  Photo: {
    user: (parent: Photo, _, { client }) =>
      client.user.findUnique({
        where: { id: parent.userId },
      }),
    hashtags: (parent: Photo, _, { client }) =>
      client.hashtag.findMany({
        where: {
          photos: { some: { id: parent.id } },
        },
      }),
    likeCount: (parent: Photo, _, { client }) =>
      client.like.count({ where: { photoId: parent.id } }),
    commentCount: (parent: Photo, _, { client }) =>
      client.comment.count({ where: { photoId: parent.id } }),
    isMine: (parent: Photo, _, { loggedInUser }) => parent.userId === loggedInUser?.id,
  },
};

export default resolvers;
