import { buildSchema } from 'graphql';

export const itemSchema = buildSchema(`
  type Item {
    id: ID!
    name: String!
    description: String!
    price: Float!
  }

  type Query {
    items: [Item]
    itemById(id: ID!): Item
  }

  type Mutation {
    addItem(name: String!, description: String!, price: Float!): Item
    updateItem(id: ID!, name: String, description: String, price: Float): Item
    deleteItem(id: ID!): Boolean
  }
`);
