import { validate } from "class-validator";

import { inject, injectable } from "inversify";
import { IBugsService } from "../interfaces/IBugsService";

import { Bug } from "../entities/Bug.entity";

import { AppDataSource } from "../typeorm.config";
import { BugDTO } from "../dtos/Bug.dto";
import { IBug } from "../interfaces/IBug";
import { NotFoundError } from "../common/errors";

@injectable()
export class BugsService implements IBugsService {
  private readonly bugRepository = AppDataSource.getRepository(Bug);

  public getBugs = async (): Promise<Bug[]> => {
    const bugs = await this.bugRepository.find({
      relations: { project: true, priority: true, status: true },
      order: {
        priority: {
          id: "ASC",
        },
        dueDate: "ASC",
      },
    });

    return bugs;
  };

  public getBugById = async (id: number): Promise<IBug> => {
    const bug = await this.bugRepository.findOne({
      where: { id: id },
      relations: { project: true, priority: true, status: true },
    });

    if (!bug) throw new NotFoundError("Bug"); // to be replaced with not found error

    return bug;
  };

  public createBug = async (bugDTO: BugDTO): Promise<IBug> => {
    const errors = await validate(bugDTO);
    if (errors.length)
      throw new Error("Validation Error: Invalid request" + errors);

    const bug = this.bugRepository.create(bugDTO);

    return await this.bugRepository.save(bug);
  };

  public updateBug = async (id: number, bugDTO: BugDTO): Promise<IBug> => {
    let bug = await this.getBugById(id);
    if (!bug) throw new Error("Bug not found");

    this.bugRepository.merge(bug, bugDTO);

    const errors = await validate(bug);
    if (errors.length)
      throw new Error("Validation Error: Invalid request" + errors);

    return this.bugRepository.save(bug);
  };

  public deleteBug = async (id: number) => {
    const result = await this.bugRepository.delete({ id: id });

    return result.affected ? result.affected > 0 : false;
  };
}
