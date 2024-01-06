import { inject, injectable } from "inversify";
import { Repository } from "typeorm";

import { IBugsService } from "../interfaces/IBugsService";
import { IBug } from "../interfaces/IBug";

import TYPES from "../types";
import { NotFoundError } from "../common/errors";
import { BugDTO } from "../dtos/Bug.dto";

@injectable()
export class BugService implements IBugsService {
  private bugRepository: Repository<IBug>;
  constructor(@inject(TYPES.BugRepository) bugRepository: Repository<IBug>) {
    this.bugRepository = bugRepository;
  }

  public getBugs = async (): Promise<IBug[]> => {
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

    if (!bug) throw new NotFoundError("Bug");

    return bug;
  };

  public createBug = async (bugDTO: BugDTO): Promise<IBug> => {
    const bug = this.bugRepository.create(bugDTO);

    return this.bugRepository.save(bug);
  };

  public updateBug = async (id: number, bugDTO: BugDTO): Promise<IBug> => {
    let bug = await this.getBugById(id);

    this.bugRepository.merge(bug, bugDTO);

    return this.bugRepository.save(bug);
  };

  public deleteBug = async (id: number) => {
    const result = await this.bugRepository.delete({ id: id });

    return result.affected ? result.affected > 0 : false;
  };
}
