import { Resolvers } from '../../types';
import { protectedResolver } from '../../user/user.util';

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: protectedResolver(async (_, { file, caption }, { loggedInUser }) => {
      if (caption) {
        // parse caption
        // get or create hashtags
      }

      // save the photo with the parsed hashtags
      // add the photo to the hashtags
    }),
  },
};

export default resolvers;
