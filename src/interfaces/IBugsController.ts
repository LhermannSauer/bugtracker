import { BugDTO } from "../dtos/Bug.dto";
import { Bug } from "../entities/Bug.entity";
import { IBug } from "./IBug";

export interface IBugsController {
  getBugs: () => Promise<IBug[]>;
  getBugById: (id: number) => Promise<IBug>;
  createBug: (bugDTO: BugDTO) => Promise<IBug>;
  updateBug: (id: number, bugDTO: BugDTO) => Promise<IBug>;
  deleteBug: (id: number) => Promise<boolean>;
}
