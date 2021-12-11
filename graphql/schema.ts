import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type User {
    id: String
    name: String
  }
  # read
  type Query {
    users: [User]!
  }
`;
