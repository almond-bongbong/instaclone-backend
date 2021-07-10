import { PrismaClient } from '@prisma/client';
import { ApolloServer, gql } from 'apollo-server';

const client = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

const typeDefs = gql`
  type Movie {
    id: Int!
    title: String!
    year: Int!
    genre: Int
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    movies: [Movie]
    movie(id: Int): Movie
    count: Int
  }

  type Mutation {
    createMovie(title: String!, year: Int!, genre: String): Movie
    deleteMovie(title: String!): Boolean!
  }
`;

const resolvers = {
  Query: {
    movies: () => {
      return client.movie.findMany();
    },
    movie: (_, { id }: { id: number }) =>
      client.movie.findUnique({
        where: {
          id,
        },
      }),
    count: () => client.movie.count(),
  },
  Mutation: {
    createMovie: async (_, { title, year, genre }) =>
      client.movie.create({
        data: {
          title,
          year,
          genre,
        },
      }),
    deleteMovie: (_, args) => {
      console.log(args);
      return true;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen()
  .then(() => console.log('Server is running on http://localhost:4000/'))
  .catch(console.error);
