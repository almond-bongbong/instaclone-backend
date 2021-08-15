import { loadFilesSync, mergeResolvers, mergeTypeDefs } from 'graphql-tools';

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDef.ts`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolver.ts`);

export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers = mergeResolvers(loadedResolvers);
