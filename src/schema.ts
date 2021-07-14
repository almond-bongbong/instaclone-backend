import {
  loadFilesSync,
  makeExecutableSchema,
  mergeResolvers,
  mergeTypeDefs,
} from 'graphql-tools';

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDef.ts`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.{query,mutation}.ts`);

const typeDefs = mergeTypeDefs(loadedTypes);
const resolvers = mergeResolvers(loadedResolvers);
const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
