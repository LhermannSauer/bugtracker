import { LoginDTO } from "../dtos/Login.dts";
import { UserDTO } from "../dtos/User.dto";
import { User } from "../entities/User.entity";
import { IUserController } from "../interfaces/IUserController";

export class UserController implements IUserController {
  getUsers: () => Promise<User[]>;
  getUser: (id: string) => Promise<User>;
  createUser: (userDTO: UserDTO) => Promise<User>;
  updateUser: (id: string, userDTO: UserDTO) => Promise<User>;
  deleteUser: (id: string) => Promise<boolean>;
  login: (loginDTO: LoginDTO) => void;
}
