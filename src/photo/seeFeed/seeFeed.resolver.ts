import { Prisma } from '.prisma/client';
import { Resolvers } from '../../types';
import { protectedResolver } from '../../user/user.util';

const resolvers: Resolvers = {
  Query: {
    seeFeed: protectedResolver(async (_, __, { client, loggedInUser }) =>
      client.photo.findMany({
        where: {
          OR: [
            {
              user: {
                followers: {
                  some: {
                    id: loggedInUser.id,
                  },
                },
              },
            },
            {
              userId: loggedInUser.id,
            },
          ],
        },
        orderBy: {
          createdAt: Prisma.SortOrder.desc,
        },
      })
    ),
  },
};

export default resolvers;
