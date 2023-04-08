import { buildSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';
import {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/prods.graphql.controller.js';

const schema = buildSchema(
  `
  type Product {
    id: ID!
    name: String!
    price: Int!
    description: String!
    thumbnail: String!
  }
  
  input dataNewProduct{
    name: String!
    price: Int!
    description: String!
    thumbnail: String!
  }

  input dataUpdateProduct{
    name: String
    price: Int
    description: String
    thumbnail: String
  }

  type Query {
    getProducts: [Product]
    getProduct(id: ID!): Product
  }

  type Mutation{
    createProduct(data: dataNewProduct!): Product
    updateProduct(id: ID!, data: dataUpdateProduct!): Product
    deleteProduct(id: ID!): Product
  } `
);


export const graphqlMiddleware = graphqlHTTP({
  schema,
  rootValue: {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
  },
  graphiql: true
});
