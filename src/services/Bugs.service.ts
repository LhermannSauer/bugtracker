import { validate } from "class-validator";

import { Bug } from "../entities/Bug.entity";
import { bugsRepository } from "../repositories/Bugs.repo";
import { inject, injectable } from "inversify";

@injectable()
export class BugsService {
  @inject("BugsRepository")
  private readonly bugRepository: typeof bugsRepository;

  public getBugsService = async (): Promise<Bug[]> => {
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

  public getBugByIdService = async (id: number): Promise<Bug> => {
    this.validateId(id);

    const bug = await this.bugRepository.findOne({
      where: { id: id },
      relations: { project: true, priority: true, status: true },
    });

    if (!bug) throw new Error("Not found: Bug"); // to be replaced with not found error

    return bug;
  };

  public createBugService = async (
    bugDTO: Omit<Bug, "id" | "dateCreated">
  ): Promise<Bug> => {
    const bug = this.bugRepository.create(bugDTO);

    const errors = await validate(bug);
    if (errors.length) throw new Error("Validation Error: Invalid request");

    return await this.bugRepository.save(bug);
  };

  public updateBugService = async (
    id: number,
    bugDTO: Omit<Bug, "id" | "dateCreated">
  ): Promise<Bug> => {
    this.validateId(id);

    let bug = await this.bugRepository.preload({ ...bugDTO, id: id });
    if (!bug) throw new Error("Bug not found");

    const errors = await validate(bug);
    if (errors.length) throw new Error("Validation Error: Invalid request");

    return await this.bugRepository.save(bug);
  };

  public deleteBugService = async (id: number) => {
    this.validateId(id);

    const bug = await this.getBugByIdService(id);

    const result = await this.bugRepository.remove(bug);

    return result;
  };

  private validateId = (id: number) => {
    if (id <= 0 || Number.isNaN(id)) throw new Error("Invalid ID"); // to be replaces with invalid request bug
  };
}
