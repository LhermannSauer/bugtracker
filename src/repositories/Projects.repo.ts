import { Project } from "../entities/Project.entity";
import { AppDataSource } from "../typeorm.config";

export const projectRepository = AppDataSource.getRepository(Project)