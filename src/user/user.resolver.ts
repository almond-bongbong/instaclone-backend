import { User } from '.prisma/client';
import { Resolvers } from '../types';

const resolvers: Resolvers = {
  User: {
    isMe: (parent: User, _, { loggedInUser }) => parent.id === loggedInUser?.id,
    totalFollowing: (parent: User, _, { client }) =>
      client.user.count({
        where: {
          followers: {
            some: { id: parent.id },
          },
        },
      }),
    totalFollowers: (parent: User, _, { client }) =>
      client.user.count({
        where: {
          following: {
            some: { id: parent.id },
          },
        },
      }),
    isFollowing: async (parent, _, { client, loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }

      // const following = await client.user
      //   .findUnique({ where: { id: loggedInUser.id } })
      //   .following({ where: { id: parent.id } });

      //   return following.length > 0;

      const exists = await client.user.count({
        where: {
          id: loggedInUser.id,
          following: {
            some: {
              id: parent.id,
            },
          },
        },
      });

      return exists > 0;
    },
    photos: (parent: User, _, { client }) =>
      client.user
        .findUnique({
          where: { id: parent.id },
        })
        .photos(),
  },
};

export default resolvers;
