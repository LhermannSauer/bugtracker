import { IBug } from "./IBug";

export interface IProject {
  id: number;
  name: string;
  description: string;
  manager?: string;
  bugs: IBug[];
}
