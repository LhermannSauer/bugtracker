import { Bug } from "../entities/Bug.entity";
import { AppDataSource } from "../typeorm.config";

export const bugsRepository = AppDataSource.getRepository(Bug);
