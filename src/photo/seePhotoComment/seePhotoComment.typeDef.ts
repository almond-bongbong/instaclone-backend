import { gql } from 'apollo-server-core';

export default gql`
  type Query {
    seePhotoComment(id: Int!): [Comment]
  }
`;
