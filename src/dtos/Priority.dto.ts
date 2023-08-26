import { IsNotEmpty, IsString, Length } from "class-validator";

export class PriorityDTO {
  id: number;

  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  name: string;
}
