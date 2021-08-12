import dotenv from 'dotenv';
dotenv.config();
import { ApolloServer } from 'apollo-server';
import schema from './schema';
import { getUser } from './user/user.util';
import client from './client';

const server = new ApolloServer({
  schema,
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
