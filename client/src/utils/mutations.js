import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(
        email: $email
        password: $password
        ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!, 
    $email: String!, 
    $password: String!
    ){
    addUser(
        username: $username
        email: $email
        password: $password
        ) {
      token
      user {
        _id
      }
    }
  }
`;

export const SAVE_BOOK = gql`
mutation saveBook($savedBooks: bookInput){
    saveBook(savedBooks: $savedBooks){
      savedBooks{
        $savedBooks
      }
    }
  }`

  export const REMOVE_BOOK = gql`
  mutation removeBook($savedBooks: bookId){
    removeBook(savedBooks: $savedBooks){
      savedBooks{$savedBooks}
    }
  }`