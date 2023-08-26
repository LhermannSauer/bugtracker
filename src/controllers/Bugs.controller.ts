import { inject, injectable } from "inversify";
import { IBugsService } from "../interfaces/IBugsService";
import { IBugsController } from "../interfaces/IBugsController";
import TYPES from "../types";
import { isPositive, validate } from "class-validator";
import { BugDTO } from "../dtos/Bug.dto";
import { IBug } from "../interfaces/IBug";
import _ from "lodash";
import { InvalidParameterError, NotFoundError } from "../common/errors";

@injectable()
export class BugsController implements IBugsController {
  @inject(TYPES.IBugsService)
  private readonly bugsService: IBugsService;

  public getBugs = async (): Promise<IBug[]> => {
    const bugs = await this.bugsService.getBugs();

    return bugs;
  };

  public getBugById = async (id: number): Promise<IBug> => {
    this.validateId(id);

    const bug = await this.bugsService.getBugById(+id);

    return bug;
  };

  public createBug = async (data: BugDTO): Promise<IBug> => {
    let bugDTO: BugDTO = new BugDTO();
    _.assign(bugDTO, data);

    const errors = await validate(bugDTO);
    if (errors.length) throw new InvalidParameterError(errors[0].toString());

    const bug = await this.bugsService.createBug(bugDTO);

    return bug;
  };

  public updateBug = async (id: number, data: BugDTO): Promise<IBug> => {
    this.validateId(id);

    let bugDTO: BugDTO = new BugDTO();
    _.assign(bugDTO, data);

    const errors = await validate(bugDTO);
    if (errors.length) throw new InvalidParameterError(errors[0].toString());

    let bug = await this.bugsService.updateBug(id, bugDTO);

    return bug;
  };

  public deleteBug = async (id: number) => {
    this.validateId(id);

    const result = await this.bugsService.deleteBug(id);

    return result;
  };

  private validateId = (id: number) => {
    if (!isPositive(id)) throw new InvalidParameterError("ID");
  };
}
