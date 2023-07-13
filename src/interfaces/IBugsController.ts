import { IBugsService } from "./IBugsService";
import { Bug } from "../entities/Bug.entity";

export interface IBugsController {
  getBugs: () => Promise<Bug[]>;
  getBugById: (id: number) => Promise<Bug>;
  createBug: (bugDTO: Omit<Bug, "id" | "dateCreated">) => Promise<Bug>;
  updateBug: (
    id: number,
    bugDTO: Omit<Bug, "id" | "dateCreated">
  ) => Promise<Bug>;
  deleteBug: (id: number) => Promise<Bug>;
}
