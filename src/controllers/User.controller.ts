import { inject, injectable } from "inversify";
import { LoginDTO } from "../dtos/Login.dto";
import { UserDTO } from "../dtos/User.dto";
import { User } from "../entities/User.entity";
import { IUserController } from "../interfaces/IUserController";
import TYPES from "../types";
import { IUserService } from "../interfaces/IUserService";
import { isPositive, isUUID, validate } from "class-validator";
import { InvalidParameterError } from "../common/errors";
import { plainToClass } from "class-transformer";
import bcrypt from 'bcrypt'

const salt = process.env.HASHSALTS || 10
@injectable()
export class UserController implements IUserController {
  @inject(TYPES.IUserService)
  private readonly userService: IUserService;

  getUsers = (): Promise<User[]> => this.userService.getUsers()

  getUser = async(id: string):Promise<User> =>{
    this.validateId(id)

    const user = this.userService.getUserById(id)

    return user
  }

  createUser = async (userDTO: UserDTO):Promise<User> =>{
    userDTO = plainToClass(UserDTO, userDTO)

    const errors = await validate(userDTO)
    if (errors) throw new InvalidParameterError(errors[0].property)

    bcrypt.hash(userDTO.password, salt, (err, hash) =>{
      userDTO.password = hash
    } )

    const user = await this.userService.createUser(userDTO)

    return user
  };


  updateUser = async (id: string, userDTO: UserDTO): Promise<User> =>{
    this.validateId(id)

    userDTO = plainToClass(UserDTO, userDTO)

    const errors = await validate(userDTO)
    if (errors) throw new InvalidParameterError(errors[0].property)

    bcrypt.hash(userDTO.password, salt, (err, hash) =>{
      userDTO.password = hash
    } )

    const user = await this.userService.updateUser(id, userDTO)

    return user
  };

  deleteUser = async (id: string): Promise<boolean> =>{
    this.validateId(id);

    const result = await this.userService.deleteUser(id);

    return result;
  };


  login = async(loginDTO: LoginDTO) =>{

    const user = await this.userService.logIn(loginDTO)

    const passwordMatch = bcrypt.compare(loginDTO.password, user.password)

    if (!passwordMatch) throw new Error("The username or password is incorrect")

  };

  private validateId = (id: string) => {
    if (!isUUID(id)) throw new InvalidParameterError("ID");
  };
}
