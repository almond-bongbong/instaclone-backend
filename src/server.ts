import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv';
import client from './client';
import { resolvers, typeDefs } from './schema';
import { getUser } from './user/user.util';
dotenv.config();

const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: async ({ req }) => {
    const token = req.headers.authorization?.split(' ')[1];
    const user = await getUser(token);

    return {
      loggedInUser: user,
      client,
    };
  },
});

const PORT = process.env.PORT;

server
  .listen(PORT)
  .then(() => console.log(`🚀 Server is running on http://localhost:${PORT}/ ✅`))
  .catch(console.error);
