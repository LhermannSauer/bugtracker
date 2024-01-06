import { IsNotEmpty, IsString, Length } from "class-validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     Priority:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 50
 *           example: Critical
 *
 */
export class PriorityDTO {
  id: number;

  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  name: string;
}
