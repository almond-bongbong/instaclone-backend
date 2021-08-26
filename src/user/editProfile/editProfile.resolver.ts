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
        const { filename, createReadStream }: FileUpload = await avatar;
        const readStream = createReadStream();
        const writeStream = fs.createWriteStream(`${process.cwd()}/${UPLOAD_PATH}/${filename}`);
        readStream.pipe(writeStream);

        try {
          await client.user.update({
            where: { id: loggedInUser.id },
            data: {
              firstName,
              lastName,
              username,
              email,
              bio,
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
