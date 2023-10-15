import { Repository } from "typeorm";
import { inject, injectable } from "inversify";

import { ExistingUserError, NotFoundError } from "../common/errors";
import { IUserService } from "../interfaces/IUserService";
import { LoginDTO } from "../dtos/Login.dto";
import { UserDTO } from "../dtos/User.dto";
import { User } from "../entities/User.entity";
import TYPES from "../types";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepo: Repository<User>
  ) {}

  getUsers = async (): Promise<User[]> => {
    const users = await this.userRepo.find();
    return users;
  };

  getUserById = async (id: string): Promise<User> => {
    const user = await this.userRepo.findOne({ where: { id: id } });

    if (!user) throw new NotFoundError("User");

    return user;
  };

  getUserByUsername = async (username: string): Promise<User> => {
    const user = await this.userRepo.findOne({ where: { username: username } });

    if (!user) throw new NotFoundError("User");

    return user;
  };

  createUser = async (userDTO: UserDTO): Promise<User> => {
    const existingUser = await this.userRepo.findOne({
      where: { username: userDTO.username },
    });
    if (existingUser) throw new ExistingUserError();

    const user = await this.userRepo.create(userDTO);

    return this.userRepo.save(user);
  };

  logIn = async (loginDTO: LoginDTO): Promise<User> => {
    const user = await this.userRepo.findOne({
      where: { username: loginDTO.username, password: loginDTO.password },
    });

    if (!user) throw new NotFoundError("user");

    return user;
  };

  updateUser = async (id: string, userDTO: UserDTO): Promise<User> => {
    let user = await this.getUserById(id);

    this.userRepo.merge(user, userDTO);

    return this.userRepo.save(user);
  };

  deleteUser = async (id: string): Promise<boolean> => {
    const result = await this.userRepo.delete({ id: id });

    return result.affected ? result.affected > 0 : false;
  };
}
