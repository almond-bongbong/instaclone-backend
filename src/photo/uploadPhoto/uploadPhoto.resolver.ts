import { Resolvers } from '../../types';
import { protectedResolver } from '../../user/user.util';

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: protectedResolver(async (_, { file, caption }, { client, loggedInUser }) => {
      const hashtags = caption && caption.match(/#[\w]+/g);

      console.log('hi!', hashtags);

      await client.photo.create({
        data: {
          user: {
            connect: {
              id: loggedInUser.id,
            },
          },
          file,
          caption,
          hashtag: hashtags && {
            connectOrCreate: hashtags.map((hashtag) => ({
              where: { hashtag },
              create: { hashtag },
            })),
          },
        },
      });
      // save the photo with the parsed hashtags
      // add the photo to the hashtags
    }),
  },
};

export default resolvers;
