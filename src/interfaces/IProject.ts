import { User } from "../entities/User.entity";
import { IBug } from "./IBug";

export interface IProject {
  id: number;
  name: string;
  description: string;
  manager: User;
  bugs: IBug[];
}
