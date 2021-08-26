import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { graphqlUploadExpress } from 'graphql-upload';
import dotenv from 'dotenv';
import client from './client';
import { resolvers, typeDefs } from './schema';
import logger from 'morgan';
import { getUser } from './user/user.util';
import { UPLOAD_PATH } from './common/constant';
dotenv.config();

const apollo = new ApolloServer({
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
  await apollo.start();
  const app = express();

  app.use(logger('tiny'));
  app.use('/static', express.static(UPLOAD_PATH));
  app.use(graphqlUploadExpress());

  apollo.applyMiddleware({ app });
  await new Promise((resolve) => app.listen({ port: PORT }, () => resolve(null)));

  console.log(`🚀 Server ready at http://localhost:${PORT}${apollo.graphqlPath}`);
}

startServer();
