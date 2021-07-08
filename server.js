const { ApolloServer, gql } = require('apollo-server');

const typeDef = gql`
  type Query {
    hello: String
  }
`;

const resolver = {
  Query: {
    hello: () => {
      return 'baby';
    },
  },
};

const server = new ApolloServer({
  typeDefs: typeDef,
  resolvers: resolver,
});

server
  .listen()
  .then(() => console.log('Server is running on http://localhost:4000/'));
