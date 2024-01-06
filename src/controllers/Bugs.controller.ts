import { inject, injectable } from "inversify";
import { IBugsService } from "../interfaces/IBugsService";
import { IBugsController } from "../interfaces/IBugsController";
import TYPES from "../types";
import { isPositive, validate } from "class-validator";
import { BugDTO } from "../dtos/Bug.dto";
import { IBug } from "../interfaces/IBug";
import { InvalidParameterError } from "../common/errors";
import { plainToClass } from "class-transformer";

@injectable()
export class BugsController implements IBugsController {
  @inject(TYPES.IBugsService)
  private readonly bugsService: IBugsService;

  public getBugs = async (): Promise<IBug[]> => this.bugsService.getBugs();

  public getBugById = async (id: number): Promise<IBug> => {
    this.validateId(id);

    const bug = await this.bugsService.getBugById(id);

    return bug;
  };

  public createBug = async (bugDTO: BugDTO): Promise<IBug> => {
    bugDTO = plainToClass(BugDTO, bugDTO);

    const errors = await validate(bugDTO);
    if (errors.length) throw new InvalidParameterError(errors[0].property);

    const bug = await this.bugsService.createBug(bugDTO);

    return bug;
  };

  public updateBug = async (id: number, bugDTO: BugDTO): Promise<IBug> => {
    this.validateId(id);

    bugDTO = plainToClass(BugDTO, bugDTO);

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
