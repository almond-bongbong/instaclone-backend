import jwt, { JwtPayload } from 'jsonwebtoken';
import client from '../client';

export const getUser = async (token) => {
  try {
    if (!token) return null;
    const verifiedToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY || '') as JwtPayload;
    const user = await client.user.findUnique({ where: { id: verifiedToken.id } });
    return user || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
