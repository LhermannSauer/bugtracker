import { inject, injectable } from "inversify";
import { Repository } from "typeorm";

import TYPES from "../types";
import { NotFoundError } from "../common/errors";
import { IProjectService } from "../interfaces/IProjectService";
import { IProject } from "../interfaces/IProject";
import { ProjectDTO } from "../dtos/Project.dto";

@injectable()
export class ProjectService implements IProjectService {
  constructor(
    @inject(TYPES.ProjectRepository)
    private readonly projectRepo: Repository<IProject>
  ) {}

  getProjects = async (): Promise<IProject[]> => {
    const projects = await this.projectRepo.find();
    return projects;
  };

  getProjectById = async (id: number): Promise<IProject> => {
    const project = await this.projectRepo.findOne({
      where: { id: id },
      relations: { bugs: true },
    });

    if (!project) throw new NotFoundError("Project");

    return project;
  };

  createProject = async (projectDTO: ProjectDTO): Promise<IProject> => {
    const project = this.projectRepo.create(projectDTO);

    return this.projectRepo.save(project);
  };

  updateProject = async (
    id: number,
    projecDTO: ProjectDTO
  ): Promise<IProject> => {
    let project = await this.getProjectById(id);

    this.projectRepo.merge(project, projecDTO);

    return this.projectRepo.save(project);
  };

  deleteProject = async (id: number): Promise<boolean> => {
    const result = await this.projectRepo.delete({ id: id });

    return result.affected ? result.affected > 0 : false;
  };
}
