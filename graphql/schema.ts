import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type User {
    id: string
    name: string
  }
# read
  type Query {
    users: [User]!
  }
# create, update, or delete
  type Mutation{

  }
`;
