import { Resolvers } from '../../types';
import { protectedResolver } from '../../user/user.util';

const resolvers: Resolvers = {
  Mutation: {
    deleteComment: protectedResolver(async (_, { id }, { client, loggedInUser }) => {
      const findComment = await client.comment.findUnique({
        where: { id },
        select: {
          userId: true,
        },
      });

      if (!findComment) {
        return {
          ok: false,
          error: 'Comment not found',
        };
      }

      if (findComment.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: 'Not authorized',
        };
      }

      await client.comment.delete({
        where: { id },
      });

      return {
        ok: true,
      };
    }),
  },
};

export default resolvers;
