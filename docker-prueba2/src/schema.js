const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
    genre: String!
    year: Int!
  }

  type Query {
    getBooks: [Book]
    getBook(id: ID!): Book
  }

  type Mutation {
    addBook(title: String!, author: String!, genre: String!, year: Int!): Book
    updateBook(id: ID!, title: String, author: String, genre: String, year: Int): Book
    deleteBook(id: ID!): Book
  }
`;

module.exports = typeDefs;
