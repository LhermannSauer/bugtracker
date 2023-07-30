import { IsNotEmpty, IsString, Length } from "class-validator";

export class StatusDTO {
  id: number;

  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  name: string;
}
