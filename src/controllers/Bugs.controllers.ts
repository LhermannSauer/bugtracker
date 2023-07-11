import { inject, injectable } from "inversify";
import { Bug } from "../entities/Bug.entity";
import { IBugsService } from "../interfaces/Bugs.service";

@injectable()
export class BugsController {
  @inject("BugsService")
  private readonly bugsService: IBugsService;

  public getBugs = async (): Promise<Bug[]> => {
    const bugs = await this.bugsService.getBugs();

    return bugs;
  };

  public getBugById = async (id: number): Promise<Bug> => {
    const bug = await this.bugsService.getBugById(id);

    if (!bug) throw new Error("Not found: Bug");

    return bug;
  };

  public createBug = async (
    bugDTO: Omit<Bug, "id" | "dateCreated">
  ): Promise<Bug> => {
    const bug = await this.bugsService.createBug(bugDTO);

    return bug;
  };

  public updateBug = async (
    id: number,
    bugDTO: Omit<Bug, "id" | "dateCreated">
  ): Promise<Bug> => {
    let bug = await this.bugsService.updateBug(id, bugDTO);

    return bug;
  };

  public deleteBug = async (id: number) => {
    const bug = await this.bugsService.getBugById(id);

    const result = await this.bugsService.deleteBug(id);

    return result;
  };
}
