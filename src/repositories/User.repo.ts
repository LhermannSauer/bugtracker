import { User } from "../entities/User.entity";
import { AppDataSource } from "../typeorm.config";

export const userRepository = AppDataSource.getRepository(User);
