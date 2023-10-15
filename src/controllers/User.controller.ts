import { inject, injectable } from "inversify";
import { LoginDTO } from "../dtos/Login.dto";
import { UserDTO } from "../dtos/User.dto";
import { User } from "../entities/User.entity";
import { IUserController } from "../interfaces/IUserController";
import TYPES from "../types";
import { IUserService } from "../interfaces/IUserService";
import { isUUID, validate } from "class-validator";
import { InvalidParameterError } from "../common/errors";
import { plainToClass } from "class-transformer";
import bcrypt from "bcrypt";

const saltRounds = process.env.HASHSALTS || 10;
@injectable()
export class UserController implements IUserController {
  @inject(TYPES.IUserService)
  private readonly userService: IUserService;

  getUsers = (): Promise<User[]> => this.userService.getUsers();

  getUser = async (id: string): Promise<User> => {
    this.validateId(id);

    const user = this.userService.getUserById(id);

    return user;
  };

  createUser = async (userDTO: UserDTO): Promise<User> => {
    userDTO = plainToClass(UserDTO, userDTO);

    const errors = await validate(userDTO);
    if (errors.length) throw new InvalidParameterError(errors[0].property); // to be updated with a proper error message

    userDTO.password = await bcrypt.hash(userDTO.password, saltRounds);

    const user = this.userService.createUser(userDTO);
    return user;
  };

  updateUser = async (id: string, userDTO: UserDTO): Promise<User> => {
    this.validateId(id);

    userDTO = plainToClass(UserDTO, userDTO);

    const errors = await validate(userDTO);
    if (errors) throw new InvalidParameterError(errors[0].toString());

    bcrypt.hash(userDTO.password, saltRounds, (err, hash) => {
      userDTO.password = hash;
    });

    const user = await this.userService.updateUser(id, userDTO);

    return user;
  };

  deleteUser = async (id: string): Promise<boolean> => {
    this.validateId(id);

    const result = await this.userService.deleteUser(id);

    return result;
  };

  login = async (loginDTO: LoginDTO) => {
    const { username, password } = loginDTO;

    const user = await this.userService.getUserByUsername(username);

    console.log(`input: ${password}, realpassword: ${user.password}`);
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch)
      throw new Error("The username or password is incorrect");

    return user;
  };

  private validateId = (id: string) => {
    if (!isUUID(id)) throw new InvalidParameterError("ID");
  };
}
