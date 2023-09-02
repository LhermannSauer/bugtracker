import {
  IsDateString,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from "class-validator";

import { ProjectDTO } from "./Project.dto";
import { PriorityDTO } from "./Priority.dto";
import { StatusDTO } from "./Status.dto";
import { User } from "../entities/User.entity";
import { UserDTO } from "./User.dto";

/**
 * @swagger
 * components:
 *   schemas:
 *     Bug:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           minLength: 10
 *           maxLength: 255
 *           example: DB connection lost
 *         description:
 *           type: string
 *           minLength: 10
 *           maxLength: 5000
 *           example: App does not connect to database
 *         dueDate:
 *           type: string
 *           format: date
 *         dateCompleted:
 *           type: string
 *           format: date
 *         priority:
 *           $ref: '#/components/schemas/Priority'
 *         status:
 *           $ref: '#/components/schemas/Status'
 *         project:
 *           $ref: '#/components/schemas/Project'
 *         assignedDeveloper:
 *           type: string
 *           minLength: 3
 *           maxLength: 255
 *           example: Mary Jane
 *         tester:
 *           type: string
 *           minLength: 3
 *           maxLength: 255
 *           example: Joe Doe
 *
 *
 */
export class BugDTO {
  @IsNotEmpty()
  @Length(10, 255)
  title: string;

  @IsNotEmpty()
  @Length(10, 5000)
  description: string;

  @IsOptional()
  @IsDateString()
  dueDate?: Date;

  @IsOptional()
  @IsDateString()
  dateCompleted?: Date;

  @IsNotEmpty()
  @IsObject()
  priority: PriorityDTO;

  @IsNotEmpty()
  @ValidateNested()
  status: StatusDTO;

  @IsNotEmpty()
  @ValidateNested()
  project: ProjectDTO;

  @IsOptional()
  @IsString()
  @Length(3, 255)
  assignedDeveloper?: UserDTO;

  @IsOptional()
  @IsString()
  @Length(3, 255)
  tester?: UserDTO;
}
