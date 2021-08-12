import { Resolvers } from '../../type';

const resolvers: Resolvers = {
  Query: {
    seeProfile: (_, { username }, { client }) => {
      console.log(username);

      return client.user.findUnique({
        where: { username },
      });
    },
  },
};

export default resolvers;
