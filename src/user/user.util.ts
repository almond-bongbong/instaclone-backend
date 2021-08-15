import jwt, { JwtPayload } from 'jsonwebtoken';
import client from '../client';
import { ProtectedResolver } from '../type';

export const getUser = async (token) => {
  try {
    if (!token) return null;
    const verifiedToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY || '') as JwtPayload;
    const user = await client.user.findUnique({ where: { id: verifiedToken.id } });
    return user || null;
  } catch (error) {
    console.error('invalid token');
    return null;
  }
};

export const protectedResolver = (resolver: ProtectedResolver) => (root, args, context, info) => {
  if (!context.loggedInUser) {
    return {
      ok: false,
      error: 'Please log in to perform this action.',
    };
  }

  return resolver(root, args, context, info);
};
