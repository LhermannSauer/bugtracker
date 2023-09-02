import { ProjectDTO } from "../dtos/Project.dto";
import { Project } from "../entities/Project.entity";
import { IProjectService } from "../interfaces/IProjectService";
import { Repository } from "typeorm";
import { inject, injectable } from "inversify";
import TYPES from "../types";
import { NotFoundError } from "../common/errors";

@injectable()
export class ProjectService implements IProjectService {
  constructor(
    @inject(TYPES.ProjectRepository)
    private readonly projectRepo: Repository<Project>
  ) {}

  getProjects = async (): Promise<Project[]> => {
    const projects = await this.projectRepo.find();
    return projects;
  };

  getProjectById = async (id: number): Promise<Project> => {
    const project = await this.projectRepo.findOne({
      where: { id: id },
      relations: { bugs: true },
    });

    if (!project) throw new NotFoundError("Project");

    return project;
  };

  createProject = async (projectDTO: ProjectDTO): Promise<Project> => {
    const project = this.projectRepo.create(projectDTO);

    return this.projectRepo.save(project);
  };

  updateProject = async (
    id: number,
    projecDTO: ProjectDTO
  ): Promise<Project> => {
    let project = await this.getProjectById(id);

    this.projectRepo.merge(project, projecDTO);

    return this.projectRepo.save(project);
  };

  deleteProject = async (id: number): Promise<boolean> => {
    const result = await this.projectRepo.delete({ id: id });

    return result.affected ? result.affected > 0 : false;
  };
}
