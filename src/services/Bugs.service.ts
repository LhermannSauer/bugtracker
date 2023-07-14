import { validate } from "class-validator";

import { inject, injectable } from "inversify";
import { IBugsService } from "../interfaces/IBugsService";

import { bugsRepository } from "../repositories/Bugs.repo";
import { Bug } from "../entities/Bug.entity";
import TYPES from "../types";

@injectable()
export class BugsService implements IBugsService {
  @inject(TYPES.BugsRepository)
  private readonly bugRepository: typeof bugsRepository;

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

  public getBugById = async (id: number): Promise<Bug> => {
    this.validateId(id);

    const bug = await this.bugRepository.findOne({
      where: { id: id },
      relations: { project: true, priority: true, status: true },
    });

    if (!bug) throw new Error("Not found: Bug"); // to be replaced with not found error

    return bug;
  };

  public createBug = async (
    bugDTO: Omit<Bug, "id" | "dateCreated">
  ): Promise<Bug> => {
    const bug = this.bugRepository.create(bugDTO);

    const errors = await validate(bug);
    if (errors.length)
      throw new Error("Validation Error: Invalid request" + errors);

    return await this.bugRepository.save(bug);
  };

  public updateBug = async (
    id: number,
    bugDTO: Omit<Bug, "id" | "dateCreated">
  ): Promise<Bug> => {
    this.validateId(id);

    let bug = await this.getBugById(id);
    if (!bug) throw new Error("Bug not found");

    this.bugRepository.merge(bug, bugDTO);

    const errors = await validate(bug);
    if (errors.length)
      throw new Error("Validation Error: Invalid request" + errors);

    return this.bugRepository.save(bug);
  };

  public deleteBug = async (id: number) => {
    this.validateId(id);

    const bug = await this.getBugById(id);

    const result = await this.bugRepository.remove(bug);

    return result;
  };

  private validateId = (id: number) => {
    if (id <= 0 || Number.isNaN(id)) throw new Error("Invalid ID"); // to be replaces with invalid request bug
  };
}
