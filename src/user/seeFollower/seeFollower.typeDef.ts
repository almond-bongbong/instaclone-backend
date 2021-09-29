import { gql } from 'apollo-server';

export default gql`
  type SeeFollowerResult {
    ok: Boolean!
    error: String
    followers: [User]
    totalPages: Int
  }

  type Query {
    seeFollower(username: String!, page: Int!): SeeFollowerResult!
  }
`;
