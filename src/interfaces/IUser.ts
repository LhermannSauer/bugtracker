import { IBug } from "./IBug";
import { IProject } from "./IProject";

export interface IUser {
  id: string;
  username: string;
  password: string;
  name: string;
  profilePictureUrl?: string;
  role: string;
  bugsAssigned: IBug[];
  bugsToTest: IBug[];
  project?: IProject;
}
