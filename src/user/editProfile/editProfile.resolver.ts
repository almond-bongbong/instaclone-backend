import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import client from '../../client';
import { PASSWORD_HASH_ROUND } from '../../common/constant';

export default {
  Mutation: {
    editProfile: async (_, { firstName, lastName, username, email, password }, context) => {
      try {
        console.log(context);
        const verifiedToken = jwt.verify(
          context.token,
          process.env.TOKEN_SECRET_KEY || ''
        ) as JwtPayload;

        if (!verifiedToken.id) {
          return {
            ok: false,
            error: 'Could not update profile.',
          };
        }

        await client.user.update({
          where: { id: verifiedToken.id },
          data: {
            firstName,
            lastName,
            username,
            email,
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
    },
  },
};
