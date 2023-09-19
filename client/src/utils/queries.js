import { gql } from "@apollo/client";

export const GET_ME = gql`
{
  me {
    _id
    bookCount
    email
    savedBooks {
      authors
      description
      bookId
      image
      link
      title
    }
}
}
`;
