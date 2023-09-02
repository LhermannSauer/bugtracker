import { ProjectDTO } from "../dtos/Project.dto";
import { Project } from "../entities/Project.entity";

export interface IProjectService {
  getProjects(): Promise<Project[]>;
  getProjectById(id: number): Promise<Project>;
  createProject(projectDTO: ProjectDTO): Promise<Project>;
  updateProject(id: number, projectDTO: ProjectDTO): Promise<Project>;
  deleteProject(id: number): Promise<boolean>;
}
