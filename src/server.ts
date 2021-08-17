import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { graphqlUploadExpress } from 'graphql-upload';
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

async function startServer() {
  await server.start();
  const app = express();
  app.use(graphqlUploadExpress());
  server.applyMiddleware({ app });
  await new Promise((resolve) => app.listen({ port: PORT }, () => resolve(null)));

  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
}

startServer();
