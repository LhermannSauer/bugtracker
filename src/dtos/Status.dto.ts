import { IsNotEmpty, IsString, Length } from "class-validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     Status:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 50
 *           example: Assigned
 *
 */
export class StatusDTO {
  id: number;

  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  name: string;
}
