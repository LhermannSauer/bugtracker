import { BugDTO } from "../dtos/Bug.dto";
import { Bug } from "../entities/Bug.entity";

export interface IBugsController {
  getBugs: () => Promise<Bug[]>;
  getBugById: (id: number) => Promise<Bug>;
  createBug: (bugDTO: BugDTO) => Promise<Bug>;
  updateBug: (id: number, bugDTO: BugDTO) => Promise<Bug>;
  deleteBug: (id: number) => Promise<boolean>;
}
