import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Project {
    projectName: String
    projectDescription: String
    projectLink: String
    repoLink: String
    dateCreated: String
    projectPic: String
  }

  type User {
    fullName: String!
    Email: String
    GitHub: String
    Facebook: String
    Twitter: String
    LinkedIn: String
    biography: String
    profilePic: String
    projects: [Project]
    resume: String
    userID: ID
  }
  # read
  type Query {
    users: User!
  }
`;
