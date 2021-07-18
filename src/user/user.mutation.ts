import client from '../client';

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      const existUser = await client.user.findFirst({
        where: {
          OR: [{ username }, { email }],
        },
      });

      if (existUser) throw new Error('Already exist username or email');
    },
  },
};
