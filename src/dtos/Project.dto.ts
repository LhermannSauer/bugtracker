import { IsNotEmpty, IsString, Length, ValidateNested } from "class-validator";
import { BugDTO } from "./Bug.dto";
import { UserDTO } from "./User.dto";

/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 255
 *           example: bugtracker
 *         description:
 *           type: string
 *           minLength: 10
 *           maxLength: 5000
 *           example: A simple bug tracking application
 *         manager:
 *           type: string
 *           minLength: 3
 *           maxLength: 255
 *           example: John Doe
 *         bugs:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Bug'
 */

export class ProjectDTO {
  id: number;

  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 5000)
  description: string;

  @IsNotEmpty()
  @ValidateNested()
  manager?: UserDTO; // to be switched to User class when implemented

  @ValidateNested()
  bugs: BugDTO[];
}
