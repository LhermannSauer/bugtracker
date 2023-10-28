import { UserDTO } from "../dtos/User.dto";
import { User } from "../entities/User.entity";

export interface IUserService {
  getUsers(): Promise<User[]>;
  getUserById(id: string): Promise<User>;
  createUser(userDTO: UserDTO): Promise<User>;
  getUserByUsername(username: string): Promise<User>;
  updateUser(id: string, userDTO: UserDTO): Promise<User>;
  deleteUser(id: string): Promise<boolean>;
}
