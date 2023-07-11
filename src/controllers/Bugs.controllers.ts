import { inject, injectable } from "inversify";
import { Bug } from "../entities/Bug.entity";
import { BugsService } from "../services/Bugs.service";

@injectable()
export class BugsController {
  @inject("BugsService")
  private readonly bugsService: BugsService;

  public getBugs = async (): Promise<Bug[]> => {
    const bugs = await this.bugsService.getBugsService();

    return bugs;
  };

  public getBugById = async (id: number): Promise<Bug> => {
    const bug = await this.bugsService.getBugByIdService(id);

    if (!bug) throw new Error("Not found: Bug");

    return bug;
  };

  public createBug = async (
    bugDTO: Omit<Bug, "id" | "dateCreated">
  ): Promise<Bug> => {
    const bug = await this.bugsService.createBugService(bugDTO);

    return bug;
  };

  public updateBug = async (
    id: number,
    bugDTO: Omit<Bug, "id" | "dateCreated">
  ): Promise<Bug> => {
    let bug = await this.bugsService.updateBugService(id, bugDTO);

    return bug;
  };

  public deleteBug = async (id: number) => {
    const bug = await this.bugsService.getBugByIdService(id);

    const result = await this.bugsService.deleteBugService(id);

    return result;
  };
}
