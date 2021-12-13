import { WithId } from "mongodb";

type Project = {
  projectName: String;
  projectDescription: String;
  projectLink: String;
  repoLink: String;
  dateCreated: String;
  projectPic: String;
};

export interface User {
  // _id: WithId<Document>;
  fullName: string;
  Email: string;
  GitHub: string;
  Facebook: string;
  Twitter: string;
  LinkedIn: string;
  biography: string;
  profilePic: string;
  projects: Project[];
  resume: string;
  userID: number;
}
