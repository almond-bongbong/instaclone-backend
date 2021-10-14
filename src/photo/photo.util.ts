import { Prisma } from '.prisma/client';

export const processHashtag = (
  caption: string
): Prisma.HashtagCreateOrConnectWithoutPhotosInput[] => {
  const hashtags = caption && caption.match(/#[\w]+/g);
  return Array.isArray(hashtags)
    ? hashtags.map((hashtag) => ({
        where: { hashtag },
        create: { hashtag },
      }))
    : [];
};
