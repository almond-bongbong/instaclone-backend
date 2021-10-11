import { Resolvers } from '../../types';
import { protectedResolver } from '../../user/user.util';

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
              connectOrCreate: hashtags.map((hashtag) => ({
                where: { hashtag },
                create: { hashtag },
              })),
            },
          }),
        },
      });
    }),
  },
};

export default resolvers;
