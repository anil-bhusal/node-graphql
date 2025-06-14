import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { userSchema } from './userSchema';
import { userResolver } from '../resolver/userResolver';
import { itemSchema } from './itemSchemas';
import { itemResolvers } from '../resolver/itemResolvers';

// Combine type definitions
const typeDefs = mergeTypeDefs([userSchema, itemSchema]);


// Create executable schema
export const schema = makeExecutableSchema({
  typeDefs,
});
