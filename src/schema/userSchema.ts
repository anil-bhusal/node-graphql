import { buildSchema } from 'graphql';

// Define the schema
export const userSchema = buildSchema(`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User]
    usersById(id: ID!): User
    usersByIds(ids: [ID!]!): [User!]!
  }

  type Mutation {
    addUser(name: String!, email: String!): User
  }
`);
