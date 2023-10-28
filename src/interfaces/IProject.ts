import { User } from "../entities/User.entity";
import { IBug } from "./IBug";
import { IUser } from "./IUser";

export interface IProject {
  id: number;
  name: string;
  description: string;
  manager: IUser;
  bugs: IBug[];
}
