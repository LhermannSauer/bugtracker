import { IPriority } from "./IPriority";
import { IProject } from "./IProject";
import { IStatus } from "./IStatus";
import { IUser } from "./IUser";

export interface IBug {
  id: number;
  title: string;
  description: string;
  dateCreated: Date;
  dueDate?: Date;
  dateCompleted?: Date;
  priority: IPriority;
  status: IStatus;
  project: IProject;
  assignedDeveloper?: IUser;
  tester?: IUser;
}
