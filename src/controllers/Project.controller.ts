import { inject, injectable } from "inversify";
import { isPositive, validate } from "class-validator";
import _ from "lodash";

import TYPES from "../types";

import { IProject } from "../interfaces/IProject";
import { ProjectDTO } from "../dtos/Project.dto";
import { IProjectController } from "../interfaces/IProjecController";
import { IProjectService } from "../interfaces/IProjectService";
import { InvalidParameterError } from "../common/errors";

@injectable()
export class ProjectController implements IProjectController {
  @inject(TYPES.IProjectsService)
  private readonly projectService: IProjectService;

  getProjects = async () => {
    const projects = await this.projectService.getProjects();

    return projects;
  };

  getProjectById = async (id: number) => {
    this.validateId(id);

    const project = this.projectService.getProjectById(id);

    return project;
  };

  createProject = async (projectDTO: ProjectDTO): Promise<IProject> => {
    const errors = await validate(projectDTO);
    if (errors.length) throw new InvalidParameterError(errors[0].property);

    const project = await this.projectService.createProject(projectDTO);

    return project;
  };

  updateProject = async (id: number, projectDTO: ProjectDTO) => {
    const project = await this.getProjectById(id);

    _.assign(project, projectDTO);

    const errors = await validate(project);
    if (errors.length) throw new InvalidParameterError(errors[0].property);

    await this.projectService.updateProject(id, project);

    return project;
  };

  deleteProject = async (id: number) => {
    this.validateId(id);

    const result = await this.projectService.deleteProject(id);

    return result;
  };

  private validateId = (id: number) => {
    if (!isPositive(id)) throw new InvalidParameterError("ID");
  };
}
