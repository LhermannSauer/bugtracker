import { Project } from "../entities/Project.entity";
import { Status } from "../entities/Status.entity";
import { IPriority } from "./IPriority";

export interface IBug {
  id: number;
  title: string;
  description: string;
  dateCreated: Date;
  dueDate?: Date;
  dateCompleted?: Date;
  priority: IPriority;
  status: Status;
  project: Project;
  assignedDeveloper?: string;
  tester?: string;
}