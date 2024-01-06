import { ProjectDTO } from "../dtos/Project.dto";
import { Project } from "../entities/Project.entity";
import { IProject } from "./IProject";

export interface IProjectService {
  getProjects(): Promise<IProject[]>;
  getProjectById(id: number): Promise<IProject>;
  createProject(projectDTO: ProjectDTO): Promise<IProject>;
  updateProject(id: number, projectDTO: ProjectDTO): Promise<IProject>;
  deleteProject(id: number): Promise<boolean>;
}
