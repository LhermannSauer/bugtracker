import { LoginDTO } from "../dtos/Login.dto";
import { UserDTO } from "../dtos/User.dto";
import { User } from "../entities/User.entity";
import { IUser } from "./IUser";

export interface IUserController {
  getUsers: () => Promise<IUser[]>;
  getUser: (id: string) => Promise<IUser>;
  createUser: (userDTO: UserDTO) => Promise<IUser>;
  updateUser: (id: string, userDTO: UserDTO) => Promise<IUser>;
  deleteUser: (id: string) => Promise<boolean>;
  login: (loginDTO: LoginDTO) => Promise<IUser>;
}
