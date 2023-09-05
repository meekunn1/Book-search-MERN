const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    savedBooks: [Book]
  }
  type Book {
    bookId: String
    authors: [String]
    description: String
    image: String
    link: String
    title: String
  }
  type Auth {
    token: ID!
    user: User
  }
input bookInput {
  bookId: String
  authors: [String]
  description: String
  image: String
  link: String
  title: String
}

  type Query {
    me(userId: ID!): User
  }
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(savedBooks: bookInput): User
    removeBook(savedBooks: bookId): User
  }
`;

module.exports = typeDefs;
