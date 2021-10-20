import { Comment } from '.prisma/client';
import { Resolvers } from '../types';

const resolvers: Resolvers = {
  Comment: {
    isMine: (parent: Comment, _, { loggedInUser }) => parent.userId === loggedInUser?.id,
  },
};

export default resolvers;
