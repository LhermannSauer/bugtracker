import { inject, injectable } from "inversify";
import { IBugsService } from "../interfaces/IBugsService";
import { IBugsController } from "../interfaces/IBugsController";
import TYPES from "../types";
import { isPositive, validate } from "class-validator";
import { BugDTO } from "../dtos/Bug.dto";
import { IBug } from "../interfaces/IBug";
import _ from "lodash";

@injectable()
export class BugsController implements IBugsController {
  @inject(TYPES.IBugsService)
  private readonly bugsService: IBugsService;

  public getBugs = async (): Promise<IBug[]> => {
    const bugs = await this.bugsService.getBugs();

    return bugs;
  };

  public getBugById = async (id: number): Promise<IBug> => {
    const bug = await this.bugsService.getBugById(id);

    if (!bug) throw new Error("Not found: Bug");

    return bug;
  };

  public createBug = async (data: BugDTO): Promise<IBug> => {
    let bugDTO: BugDTO = new BugDTO();
    _.assign(bugDTO, data);

    const errors = await validate(bugDTO);
    if (errors.length)
      throw new Error("Validation Error: Invalid request" + errors);

    const bug = await this.bugsService.createBug(bugDTO);

    return bug;
  };

  public updateBug = async (id: number, data: BugDTO): Promise<IBug> => {
    this.validateId(id);

    let bugDTO: BugDTO = new BugDTO();
    _.assign(bugDTO, data);

    const errors = await validate(bugDTO);
    if (errors.length)
      throw new Error("Validation Error: Invalid request" + errors);

    let bug = await this.bugsService.updateBug(id, bugDTO);

    return bug;
  };

  public deleteBug = async (id: number) => {
    this.validateId(id);

    const result = await this.bugsService.deleteBug(id);

    return result;
  };

  private validateId = (id: number) => {
    if (!isPositive(id)) throw new Error("Invalid ID"); // to be replaces with invalid request bug
  };
}
