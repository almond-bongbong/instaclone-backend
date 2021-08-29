import bcrypt from 'bcrypt';
import fs from 'fs';
import { FileUpload } from 'graphql-upload';
import client from '../../client';
import { PASSWORD_HASH_ROUND, UPLOAD_PATH } from '../../common/constant';
import { protectedResolver } from '../user.util';

export default {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        { firstName, lastName, username, email, password, bio, avatar },
        { loggedInUser }
      ) => {
        let newAvatarUrl;

        if (avatar) {
          const { filename, createReadStream }: FileUpload = await avatar;
          const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
          const readStream = createReadStream();
          const writeStream = fs.createWriteStream(
            `${process.cwd()}/${UPLOAD_PATH}/${newFilename}`
          );
          readStream.pipe(writeStream);
          newAvatarUrl = `http://localhost:4003/static/${newFilename}`;
        }

        try {
          await client.user.update({
            where: { id: loggedInUser.id },
            data: {
              firstName,
              lastName,
              username,
              email,
              bio,
              avatar: newAvatarUrl,
              password: password && (await bcrypt.hash(password, PASSWORD_HASH_ROUND)),
            },
          });

          return {
            ok: true,
          };
        } catch (error) {
          console.error(error);

          return {
            ok: false,
            error: 'Could not update profile.',
          };
        }
      }
    ),
  },
};
