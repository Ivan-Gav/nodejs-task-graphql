import { GraphQLSchema } from 'graphql';
import { RootQuery } from './RootQuery.js';
import { Mutation } from './Mutation.js';

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
