import { PrismaClient, User } from '@prisma/client';
import { GraphQLScalarType } from 'graphql';

interface Context {
  loggedInUser?: User;
  client: PrismaClient;
}

interface LoggedInContext extends Context {
  loggedInUser: User;
}

export type Resolver = (root: any, args: any, context: Context, info: any) => any;
export type ProtectedResolver = (root: any, args: any, context: LoggedInContext, info: any) => any;

export type Resolvers =
  | {
      [key: string]: {
        [key: string]: Resolver;
      };
    }
  | {
      Upload: GraphQLScalarType;
    };
