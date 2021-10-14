import { Resolvers } from '../../types';
import { protectedResolver } from '../../user/user.util';
import { processHashtag } from '../photo.util';

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: protectedResolver((_, { file, caption }, { client, loggedInUser }) => {
      const hashtags = caption && caption.match(/#[\w]+/g);

      return client.photo.create({
        data: {
          user: {
            connect: {
              id: loggedInUser.id,
            },
          },
          file,
          caption,
          ...(hashtags?.length > 0 && {
            hashtags: {
              connectOrCreate: processHashtag(caption),
            },
          }),
        },
      });
    }),
  },
};

export default resolvers;
